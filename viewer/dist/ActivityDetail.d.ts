import type { ActivityRequest, Focus, Row } from "./types";
/** Where the panel opens: the page's body, or a shadow root when the viewer runs inside an element. */
export declare const PanelHost: import("react").Context<Element | null>;
type DetailProps = {
    request: ActivityRequest;
    row: Row | null;
    onClose: () => void;
    /** narrows the log to a person or an entity; left out where that cannot apply */
    onFocus?: (focus: Focus) => void;
    actorTypes?: Record<string, string>;
    entities?: Record<string, string>;
    /** whether the record's minute is sealed yet */
    seal?: "sealed" | "waiting" | null;
};
/** The side panel for one record: what happened in full, and everything around it. */
export declare function ActivityDetail({ request, row, onClose, onFocus, actorTypes, entities, seal }: DetailProps): import("react").ReactPortal | null;
export {};
