import type { ActivityRequest, Kind } from "./types";
type StreamKind = "events" | "requests" | "both";
export type Stream = {
    id: string;
    name: string;
    kind: StreamKind;
    query: string;
    destination: "webhook" | "s3";
    target: {
        url?: string;
        headers?: Record<string, string>;
        bucket?: string;
        prefix?: string;
        region?: string;
        endpoint?: string;
    };
    enabled: boolean;
    state: "active" | "failing" | "paused";
    error: string;
    delivered: number;
    last_delivered_at: string | null;
    delivered_through: string | null;
};
export type StreamList = {
    enabled: boolean;
    streams: Stream[];
};
/** Where the log is sent as it is written: each stream's destination, how its delivery stands, and a
 * form to add or change one. Records reach a stream once they are sealed, a few minutes after. */
export declare function Streams({ request, kinds, list, refresh }: {
    request: ActivityRequest;
    kinds: Kind[];
    list: StreamList;
    refresh: () => void;
}): import("react/jsx-runtime").JSX.Element;
export {};
