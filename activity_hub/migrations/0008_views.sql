-- Saved views of the log: a name and the search a person saved, kept for them or shared with their
-- tenant. Settings, not records: a newer version of a view replaces it and a removed one is marked
-- removed (so an insert-only login can manage them); they are not sealed.
CREATE TABLE IF NOT EXISTS views
(
    id UUID,
    tenant_id String,
    owner_id String,
    owner_name String,
    name String,
    search String,
    shared UInt8,
    removed UInt8,
    updated_at DateTime64(3, 'UTC')
)
ENGINE = ReplacingMergeTree(updated_at)
ORDER BY (tenant_id, id);
