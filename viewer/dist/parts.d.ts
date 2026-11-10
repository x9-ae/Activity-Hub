import type { ReactNode } from "react";
import type { ActivityEvent, ApiCall, Row } from "./types";
export declare const cx: (...names: (string | false | null | undefined)[]) => string;
export declare const actorOf: (row: Row) => string;
export declare const actorLabelOf: (row: Row, actorTypes?: Record<string, string>) => string;
export declare function When({ value, seal }: {
    value: string;
    seal?: "sealed" | "waiting" | null;
}): import("react/jsx-runtime").JSX.Element;
export declare const sealText: (seal: "sealed" | "waiting" | null) => string;
/** A value in a row that narrows the log to itself; the row's own click still opens its details. */
export declare function FocusLink({ onClick, title, children }: {
    onClick?: () => void;
    title: string;
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function Who({ row, actorTypes, onFocus }: {
    row: Row;
    actorTypes?: Record<string, string>;
    onFocus?: () => void;
}): import("react/jsx-runtime").JSX.Element;
export declare function Where({ row }: {
    row: Row;
}): import("react/jsx-runtime").JSX.Element;
export declare function OutcomeTag({ outcome }: {
    outcome: string;
}): import("react/jsx-runtime").JSX.Element | null;
export declare const StatusTag: ({ status }: {
    status: number;
}) => import("react/jsx-runtime").JSX.Element;
export declare const MethodTag: ({ method }: {
    method: string;
}) => import("react/jsx-runtime").JSX.Element;
/** What happened, in one sentence, with what is worth seeing next to it. */
export declare function EventLine({ row }: {
    row: ActivityEvent;
}): import("react/jsx-runtime").JSX.Element;
export declare function CallLine({ row }: {
    row: ApiCall;
}): import("react/jsx-runtime").JSX.Element;
export declare function Message({ tone, children, action }: {
    tone?: "plain" | "bad";
    children: ReactNode;
    action?: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function Skeleton({ rows }: {
    rows?: number;
}): import("react/jsx-runtime").JSX.Element;
