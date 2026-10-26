-- Groups everything done within one sign-in.
ALTER TABLE events ADD COLUMN IF NOT EXISTS session_id String AFTER request_id;
ALTER TABLE access_logs ADD COLUMN IF NOT EXISTS session_id String AFTER request_id;

-- received_at is stamped by the ClickHouse server, one clock for every writer; seals use it.
ALTER TABLE events MODIFY COLUMN received_at DateTime64(3, 'UTC') DEFAULT now64(3);
ALTER TABLE access_logs MODIFY COLUMN received_at DateTime64(3, 'UTC') DEFAULT now64(3);
