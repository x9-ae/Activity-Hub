import type { ActivityRequest, Row, Search } from "./types";
/** One answer from the routes, refetched when key changes (and every refreshMs when given). An
 * answer that arrives after a newer request was made is dropped. A failed refresh keeps the last
 * data and stops refreshing until refresh() works again. */
export declare function useRemote<T>(key: string | null, load: () => Promise<T>, refreshMs?: number): {
    refresh: () => void;
    data?: T;
    error?: Error;
    loading: boolean;
};
export declare const MAX_PAGES = 20;
/** A search read page by page, newest first. live keeps only the newest page and reloads it. */
export declare function usePages(request: ActivityRequest, search: Search | null, pageSize: number, live: boolean, refreshMs: number): {
    rows: Row[];
    trimmed: boolean;
    hasMore: boolean;
    loading: boolean;
    refreshing: boolean;
    error: Error | undefined;
    more: {
        loading: boolean;
        error?: Error;
    };
    loadMore: () => void;
    refresh: () => void;
    pageCount: number;
};
