import { type ReactNode } from "react";
import type { ActivityRequest } from "./types";
export type ActivityTimelineProps = {
    request: ActivityRequest;
    /** the entity whose story this is, e.g. {type: "ticket", id: "32101"} */
    entity: {
        type: string;
        id: string;
    };
    /** "all" keeps every step; "important" leaves out the details */
    view?: "all" | "important";
    /** only these actions: "user.signed_in", or "user." for every user action */
    action?: string;
    /** newest first, for a feed such as sign-ins; a story reads oldest first */
    newestFirst?: boolean;
    /** shown under the last step when older steps were left out, e.g. a link to the full log */
    more?: ReactNode;
    className?: string;
};
/** One entity's story, oldest first: each step as a sentence, its row changes inside it, and the
 * detail of any step one click away. */
export declare function ActivityTimeline({ request, entity, view, action, newestFirst, more, className }: ActivityTimelineProps): import("react/jsx-runtime").JSX.Element;
