import { type ReactNode } from "react";
import type { ActivityEvent, ActivityRequest } from "./types";
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
    /** shown above the steps, from the same events: e.g. a summary of the ticket as it stands */
    header?: (events: ActivityEvent[], partial: boolean) => ReactNode;
    /** shown under the last step when older steps were left out, e.g. a link to the full log */
    more?: ReactNode;
    className?: string;
};
/** One entity's story: each step with who did it, from where and its key values, its changes and
 * the record changes behind it one click away, and its full detail on its title. */
export declare function ActivityTimeline({ request, entity, view, action, newestFirst, header, more, className }: ActivityTimelineProps): import("react/jsx-runtime").JSX.Element;
