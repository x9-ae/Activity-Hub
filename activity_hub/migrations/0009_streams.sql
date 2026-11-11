-- Streams: the log delivered, as it grows, to a destination its owner runs (an HTTPS endpoint, an
-- S3-compatible bucket). Settings, not records: a newer version replaces a stream and a removed one
-- is marked removed; the secret is kept encrypted with the application's key. Not sealed.
CREATE TABLE IF NOT EXISTS streams
(
    id UUID,
    tenant_id String,
    name String,
    kind LowCardinality(String),
    query String,
    destination LowCardinality(String),
    target String,
    secret String,
    enabled UInt8,
    removed UInt8,
    created_by String,
    updated_at DateTime64(3, 'UTC')
)
ENGINE = ReplacingMergeTree(updated_at)
ORDER BY (tenant_id, id);

-- Where each stream has got to in each table: records up to (cursor_at, cursor_id), by arrival, are
-- delivered. A failure keeps the cursor and waits until next_try_at.
CREATE TABLE IF NOT EXISTS stream_progress
(
    stream_id UUID,
    table_name LowCardinality(String),
    cursor_at DateTime64(3, 'UTC'),
    cursor_id UUID,
    delivered UInt64,
    last_ok_at DateTime64(3, 'UTC'),
    last_error String,
    failures UInt32,
    next_try_at DateTime64(3, 'UTC'),
    updated_at DateTime64(3, 'UTC')
)
ENGINE = ReplacingMergeTree(updated_at)
ORDER BY (stream_id, table_name);
