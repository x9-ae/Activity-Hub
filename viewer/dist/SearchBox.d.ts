import { type RefObject } from "react";
import type { Suggestion } from "./query";
type Props = {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
    /** what can follow the word being typed */
    suggestions: (token: string) => Suggestion[];
    placeholder?: string;
    inputRef?: RefObject<HTMLInputElement | null>;
};
/** One box for the whole search, as the audit logs of GitHub and Pangea have it: fields and their
 * values are offered while typing; Enter searches. */
export declare function SearchBox({ value, onChange, onSubmit, suggestions, placeholder, inputRef }: Props): import("react/jsx-runtime").JSX.Element;
export {};
