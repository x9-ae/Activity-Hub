import type { ActivityRequest, Kind, Row, Search } from "./types";
export declare const EXPORT_MAX_ROWS = 100000;
export declare const EVENT_COLUMNS: readonly ["occurred_at", "title", "summary", "action", "outcome", "reason", "importance", "actor_type", "actor_id", "actor_name", "target_type", "target_id", "origin", "ip", "country", "device", "service", "tenant_id", "request_id", "session_id", "changes", "metadata", "id"];
export declare const REQUEST_COLUMNS: readonly ["occurred_at", "method", "route", "path", "status", "duration_ms", "actor_type", "actor_id", "actor_name", "origin", "ip", "country", "service", "tenant_id", "request_id", "session_id", "request_body", "id"];
/** Every row of the search, newest first, page by page up to EXPORT_MAX_ROWS; progress gets the count
 * so far. more: rows were left out (narrow the dates). */
export declare function fetchExport(request: ActivityRequest, search: Search, progress: (rows: number) => void): Promise<{
    rows: Row[];
    more: boolean;
}>;
export declare function toCsv(kind: Kind, rows: Row[]): string;
/** One JSON record per line, as stored and as read, for loading into another tool. */
export declare const toJsonLines: (rows: Row[]) => string;
export declare function download(text: string, filename: string, type: string): void;
