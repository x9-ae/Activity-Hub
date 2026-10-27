import pytest
from sqlalchemy import JSON, Column, ForeignKey, Integer, String, create_engine
from sqlalchemy.orm import Session, declarative_base, sessionmaker
from activity_hub.sqlalchemy import track_changes

Base = declarative_base()


class Symbol(Base):
    __tablename__ = "symbols"
    id = Column(Integer, primary_key=True)
    name = Column(String(20))
    digits = Column(Integer)
    api_password = Column(String(50))
    config = Column(JSON)


class Tick(Base):
    __tablename__ = "ticks"
    id = Column(Integer, primary_key=True)


class FakeHub:
    def __init__(self):
        self.events = []
        self.fail = False

    def record_event(self, action, **fields):
        if self.fail:
            raise RuntimeError("database down")
        self.events.append((action, fields))


class TrackedSession(Session):
    pass


hub = FakeHub()
track_changes(hub, exclude_tables=("ticks",), session_class=TrackedSession)
track_changes(hub, session_class=TrackedSession)  # a second call adds nothing


@pytest.fixture
def db():
    engine = create_engine("sqlite://")
    Base.metadata.create_all(engine)
    session = sessionmaker(bind=engine, class_=TrackedSession)()
    hub.events.clear()
    hub.fail = False
    yield session
    session.close()


def test_create_update_and_delete_are_recorded_with_before_after_and_secrets_masked(db):
    symbol = Symbol(name="EURUSD", digits=5, api_password="p", config={"host": "h", "secret_key": "s"})
    db.add(symbol)
    db.commit()
    symbol = db.query(Symbol).filter_by(name="EURUSD").one()  # loaded, as a request would
    symbol.digits = 3
    symbol.name = "EURUSD"  # unchanged value: not a change
    db.commit()
    db.delete(symbol)
    db.commit()

    actions = [action for action, _ in hub.events]
    assert actions == ["data.created", "data.updated", "data.deleted"]
    created, updated, deleted = (fields for _, fields in hub.events)
    assert created["target_type"] == "symbols" and created["target_id"] == "1"
    assert created["changes"]["after"]["api_password"] == "[masked]"
    assert created["changes"]["after"]["config"] == {"host": "h", "secret_key": "[masked]"}
    assert updated["changes"] == {"before": {"digits": 5}, "after": {"digits": 3}}
    assert deleted["changes"]["before"]["name"] == "EURUSD"


def test_rolled_back_and_excluded_changes_are_never_recorded(db):
    db.add(Symbol(name="GBPUSD", digits=5))
    db.flush()
    db.rollback()
    db.add(Tick())
    db.commit()
    assert hub.events == []


def test_a_failing_hub_never_breaks_the_commit(db):
    hub.fail = True
    db.add(Symbol(name="XAUUSD", digits=2))
    db.commit()
    assert db.query(Symbol).filter_by(name="XAUUSD").count() == 1



class Position(Base):
    __tablename__ = "positions"
    id = Column(Integer, primary_key=True)
    account_number = Column(String(20))
    ticket_number = Column(Integer)
    stop_loss = Column(String(20))


class RelatedSession(Session):
    pass


related_hub = FakeHub()
track_changes(related_hub, session_class=RelatedSession,
              related_columns={"account_number": "account", "ticket_number": "ticket"})


def test_a_row_naming_an_entity_is_related_to_it():
    engine = create_engine("sqlite://")
    Base.metadata.create_all(engine)
    session = sessionmaker(bind=engine, class_=RelatedSession)()
    session.add(Position(account_number="100234", ticket_number=11450))
    session.add(Position(account_number="", ticket_number=None))   # nothing to relate
    session.commit()
    position = session.query(Position).filter_by(ticket_number=11450).one()
    position.stop_loss = "1.07"
    session.commit()
    created, unrelated, updated = related_hub.events
    assert created[1]["related"] == [("account", "100234"), ("ticket", "11450")]
    assert "related" not in unrelated[1]
    assert updated[0] == "data.updated" and updated[1]["related"] == [("account", "100234"), ("ticket", "11450")]
    session.close()


def test_snapshot_reads_the_values_in_memory_only():
    from activity_hub.sqlalchemy import snapshot
    symbol = Symbol(id=7, name="EURUSD", digits=5)
    assert snapshot(symbol, "name", "digits") == {"name": "EURUSD", "digits": 5}
    assert snapshot(symbol)["id"] == 7


def test_a_savepoint_keeps_its_changes_until_the_outer_commit_and_a_rolled_back_one_drops_only_its_own(db):
    db.add(Symbol(id=1, name="EURUSD", digits=5))
    db.flush()
    savepoint = db.begin_nested()
    db.add(Symbol(id=2, name="GBPUSD", digits=5))
    db.flush()
    savepoint.rollback()
    savepoint = db.begin_nested()
    db.add(Symbol(id=3, name="XAUUSD", digits=2))
    db.flush()
    savepoint.commit()
    assert hub.events == [], "a released savepoint is not the commit"
    db.commit()
    assert sorted(fields["target_id"] for _, fields in hub.events) == ["1", "3"]

    hub.events.clear()
    savepoint = db.begin_nested()
    db.add(Symbol(id=4, name="USDJPY", digits=3))
    db.flush()
    savepoint.commit()
    db.rollback()
    assert hub.events == [], "a released savepoint inside a rolled-back transaction never happened"


def test_a_before_value_never_loaded_is_marked_not_loaded(db):
    symbol = Symbol(name="EURUSD", digits=5)
    db.add(symbol)
    db.commit()
    symbol.digits = 3   # expired by the commit and written without being read
    db.commit()
    assert hub.events[-1][1]["changes"] == {"before": {"digits": "[not loaded]"}, "after": {"digits": 3}}


class Instrument(Base):
    __tablename__ = "instruments"
    id = Column(Integer, primary_key=True)
    kind = Column(String(10))
    __mapper_args__ = {"polymorphic_on": kind, "polymorphic_identity": "instrument"}


class Future(Instrument):
    __tablename__ = "futures"
    id = Column(Integer, ForeignKey("instruments.id"), primary_key=True)
    expiry = Column(String(10))
    __mapper_args__ = {"polymorphic_identity": "future"}


def test_a_joined_table_subclass_is_recorded_under_its_own_table(db):
    Base.metadata.create_all(db.get_bind())
    db.add(Future(expiry="2026-12"))
    db.commit()
    assert hub.events[-1][1]["target_type"] == "futures"


class Deal(Base):
    __tablename__ = "deals"
    id = Column(Integer, primary_key=True)
    ticket_number = Column(Integer)
    position_ticket_number = Column(Integer)


class DealSession(Session):
    pass


deal_hub = FakeHub()
track_changes(deal_hub, session_class=DealSession,
              related_columns={"ticket_number": "ticket", "position_ticket_number": "ticket",
                               "deals.ticket_number": None})


def test_a_table_can_say_its_column_names_no_entity():
    engine = create_engine("sqlite://")
    Base.metadata.create_all(engine)
    session = sessionmaker(bind=engine, class_=DealSession)()
    session.add(Deal(ticket_number=10500, position_ticket_number=11450))
    session.commit()
    assert deal_hub.events[0][1]["related"] == [("ticket", "11450")], "the deal number is not a position ticket"
    session.close()
