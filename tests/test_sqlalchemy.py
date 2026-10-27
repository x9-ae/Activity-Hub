import pytest
from sqlalchemy import JSON, Column, Integer, String, create_engine
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
