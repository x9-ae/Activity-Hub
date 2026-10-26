-- One row per table and minute of received_at, covering every application's rows of that minute.
-- Each hash covers the previous one, so a row changed or removed after sealing breaks every later
-- seal. columns records the exact column list hashed, so columns added later never change how an
-- old minute is checked.
CREATE TABLE IF NOT EXISTS seals
(
    table_name LowCardinality(String),
    window_start DateTime('UTC'),
    row_count UInt64,
    rows_hash String,
    prev_hash String,
    hash String,
    columns String,
    sealed_at DateTime64(3, 'UTC') DEFAULT now64(3)
)
ENGINE = MergeTree
ORDER BY (table_name, window_start);
