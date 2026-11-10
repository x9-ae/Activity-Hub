-- A request's events are read together: its row changes fold under the event that caused them, so
-- the reader looks them up by request id.
ALTER TABLE events ADD INDEX IF NOT EXISTS idx_request request_id TYPE bloom_filter(0.01) GRANULARITY 4;
ALTER TABLE events MATERIALIZE INDEX idx_request;
