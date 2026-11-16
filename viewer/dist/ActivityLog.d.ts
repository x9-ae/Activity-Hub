import type { ActivityRequest, Kind, Preset } from "./types";
/** One entity's activity on its own page, e.g. an account's tab: its events, and the API requests it
 * made itself. label names it in the header. */
export type Entity = {
    type: string;
    id: string;
    label: string;
};
export type ActivityLogProps = {
    request: ActivityRequest;
    title?: string;
    description?: string;
    /** one-click views of events for this application, e.g. "Money" */
    presets?: Preset[];
    /** "requests" shows the API access log as a second tab */
    kinds?: Kind[];
    entity?: Entity;
    /** the search kept in the address: pass the page's query and a setter to keep it there */
    params?: URLSearchParams;
    onParamsChange?: (params: URLSearchParams) => void;
    canExport?: boolean;
    /** the integrity strip (recording, sealing, the daily check) under the header */
    showStatus?: boolean;
    pageSize?: number;
    liveEveryMs?: number;
    className?: string;
};
/** The activity log: what happened, who did it and from where, read as sentences, with the detail
 * behind each record one click away. */
export declare function ActivityLog({ request, title, description, presets, kinds, entity, params: given, onParamsChange, canExport, showStatus, pageSize, liveEveryMs, className, }: ActivityLogProps): import("react/jsx-runtime").JSX.Element;
