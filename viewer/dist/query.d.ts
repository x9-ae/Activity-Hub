import type { Catalog, Kind } from "./types";
/** A term of the search language (activity_hub.query): `field:value`, `-field:value`, a word or "words". */
export type Term = {
    field: string | null;
    value: string;
    negated: boolean;
    text: string;
};
export declare function terms(query: string): Term[];
/** The query without one of its terms. */
export declare const without: (query: string, term: Term) => string;
/** A value as a term: quoted when it holds a space. */
export declare const quote: (value: string) => string;
type FieldHelp = {
    field: string;
    label: string;
    hint: string;
    kinds: Kind[];
};
export declare const FIELDS: FieldHelp[];
export declare const fieldsOf: (kind: Kind) => FieldHelp[];
/** Every field the server searches for a kind: those offered, and their other names. */
export declare const searchableFields: (kind: Kind) => string[];
export declare const fieldLabel: (field: string) => string;
export type Suggestion = {
    insert: string;
    label: string;
    hint?: string;
};
/** What can follow what is typed: field names, then a field's known values. facets: values seen in
 * the log, with their counts. */
export declare function suggest(token: string, kind: Kind, catalog?: Catalog, facets?: Record<string, {
    value: string;
    count: number;
}[]>): Suggestion[];
export {};
