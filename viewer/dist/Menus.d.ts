import { type ReactNode } from "react";
import type { ActivityRequest } from "./types";
import { Icon } from "./icons";
/** A button that opens a small panel under it; a click elsewhere or Escape closes it. */
export declare function Popover({ label, icon, children, open, setOpen, badge, disabled }: {
    label: string;
    icon: Parameters<typeof Icon>[0]["name"];
    children: ReactNode;
    open: boolean;
    setOpen: (open: boolean) => void;
    badge?: string;
    disabled?: boolean;
}): import("react/jsx-runtime").JSX.Element;
export type Column = {
    key: string;
    label: string;
};
/** Which of the optional columns the list shows. */
export declare function ColumnsMenu({ columns, shown, onChange }: {
    columns: Column[];
    shown: string[];
    onChange: (shown: string[]) => void;
}): import("react/jsx-runtime").JSX.Element;
/** Saved views: one's own and those shared in the company, kept by the Hub. Opening one applies its
 * search; the current search can be saved, and one's own views updated or removed. */
export declare function ViewsMenu({ request, current, onOpen }: {
    request: ActivityRequest;
    current: string;
    onOpen: (search: string) => void;
}): import("react/jsx-runtime").JSX.Element | null;
