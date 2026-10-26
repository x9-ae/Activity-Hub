-- Who made the request by name, as on events, so a request reads as a person and not only an id.
ALTER TABLE access_logs ADD COLUMN IF NOT EXISTS actor_name String AFTER actor_id;
