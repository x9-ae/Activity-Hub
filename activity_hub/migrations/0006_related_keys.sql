-- Every entity an event concerns, its target and the related ones, as "type:id" keys with their own
-- index, so a timeline (an account's, a ticket's) reads only the granules that hold its key.
-- ClickHouse does not use an index built on a lambda expression, as idx_related was, so every
-- timeline read the whole table; that index is dropped.
ALTER TABLE events ADD COLUMN IF NOT EXISTS related_keys Array(String)
    MATERIALIZED arrayConcat([concat(target_type, ':', target_id)],
                             arrayMap(r -> concat(tupleElement(r, 1), ':', tupleElement(r, 2)), related));
ALTER TABLE events ADD INDEX IF NOT EXISTS idx_related_keys related_keys TYPE bloom_filter(0.01) GRANULARITY 1;
ALTER TABLE events MATERIALIZE COLUMN related_keys;
ALTER TABLE events MATERIALIZE INDEX idx_related_keys;
ALTER TABLE events DROP INDEX IF EXISTS idx_related;
