import type { ActivityRequest } from "./types";
export type Status = {
    sealed_until?: Record<string, string>;
    recording?: boolean;
    stats?: {
        queued?: number;
        spooled?: number;
        write_errors?: number;
    };
    last_daily?: {
        day: string;
        ok: boolean | null;
        problems?: number;
    } | null;
    /** whether this person may run the checks: they cover every record */
    checks?: boolean;
};
/** Whether a record is in a sealed minute: sealing covers whole minutes of when records arrived. */
export declare function sealState(receivedAt: string, table: "events" | "access_logs", status?: Status): "sealed" | "waiting" | null;
/** How the record stands: whether it records, what waits to be written, until when it is sealed and
 * the last daily check; and, for those allowed, a check of any day against its seals, the day's proof
 * to keep, and a check of a kept proof against the database (which catches a rewrite of records and
 * seals together). */
export declare function IntegrityStatus({ request, status }: {
    request: ActivityRequest;
    status?: Status;
}): import("react/jsx-runtime").JSX.Element | null;
