-- What a request that changes something sent (JSON, secrets masked), so every change on the
-- platform is on record whether or not the application records an event for it.
ALTER TABLE access_logs ADD COLUMN IF NOT EXISTS request_body String AFTER duration_ms;
