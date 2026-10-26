-- Layer A: what was done, by whom, to what. Never updated or deleted.
CREATE TABLE IF NOT EXISTS events
(
    id UUID,
    occurred_at DateTime64(3, 'UTC'),
    received_at DateTime64(3, 'UTC'),
    app LowCardinality(String),
    environment LowCardinality(String),
    service LowCardinality(String),
    tenant_id String,
    action LowCardinality(String),
    category LowCardinality(String),
    outcome LowCardinality(String),
    reason String,
    actor_type LowCardinality(String),
    actor_id String,
    actor_name String,
    target_type LowCardinality(String),
    target_id String,
    target_name String,
    related Array(Tuple(type String, id String)),
    origin LowCardinality(String),
    ip String,
    country LowCardinality(String),
    user_agent String,
    request_id String,
    changes String,
    metadata String,
    imported UInt8,
    INDEX idx_id id TYPE bloom_filter GRANULARITY 4,
    INDEX idx_actor actor_id TYPE bloom_filter GRANULARITY 4,
    INDEX idx_action action TYPE set(1000) GRANULARITY 4,
    INDEX idx_related arrayMap(r -> concat(tupleElement(r, 1), ':', tupleElement(r, 2)), related) TYPE bloom_filter GRANULARITY 4,
    INDEX idx_received received_at TYPE minmax GRANULARITY 1
)
ENGINE = MergeTree
PARTITION BY toYYYYMM(occurred_at)
ORDER BY (app, target_type, target_id, occurred_at, id);

-- Layer B: one row per API request. Query strings and bodies are never stored.
CREATE TABLE IF NOT EXISTS access_logs
(
    id UUID,
    occurred_at DateTime64(3, 'UTC'),
    received_at DateTime64(3, 'UTC'),
    app LowCardinality(String),
    environment LowCardinality(String),
    service LowCardinality(String),
    tenant_id String,
    actor_type LowCardinality(String),
    actor_id String,
    origin LowCardinality(String),
    method LowCardinality(String),
    route String,
    path String,
    status UInt16,
    duration_ms UInt32,
    ip String,
    country LowCardinality(String),
    user_agent String,
    request_id String,
    INDEX idx_id id TYPE bloom_filter GRANULARITY 4,
    INDEX idx_actor actor_id TYPE bloom_filter GRANULARITY 4,
    INDEX idx_received received_at TYPE minmax GRANULARITY 1
)
ENGINE = MergeTree
PARTITION BY toYYYYMM(occurred_at)
ORDER BY (app, service, occurred_at, id);
