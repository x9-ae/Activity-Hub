import type { Row } from "./types";
/** Stored times are UTC, "YYYY-MM-DD HH:MM:SS.mmm". */
export declare const toMs: (value: string) => number;
export declare const words: (value: string) => string;
export declare const sentenceCase: (value: string) => string;
/** "12 sec. ago", "5 min. ago"; empty past a week, where the date says it better. */
export declare function relativeTime(value: string, now?: number): string;
export declare const dayText: (ms: number) => string;
export declare const shortDay: (ms: number) => string;
export declare const clockText: (ms: number) => string;
/** "Today", "Yesterday" or "Fri, 24 Oct 2026" for the UTC day of a stored time. */
export declare function dayLabel(value: string, now?: number): string;
/** The time of day of a stored time, to the millisecond. */
export declare const timeOfDay: (value: string) => string;
export declare function initials(name: string): string;
/** Who made an API request, as a name (events carry theirs from the catalog). */
export declare const requestActor: (row: Row) => string;
/** Whether a text is a day, "YYYY-MM-DD" (what an <input type="date"> gives). */
export declare const isDay: (day: string) => boolean;
/** "UTC start of a day" for a day, and the start of the day after it. */
export declare const dayStart: (day: string) => string;
export declare const nextDayStart: (day: string) => string;
/** "YYYY-MM-DD HH:MM:SS" this long before now, UTC. */
export declare const ago: (minutes: number, now?: number) => string;
export declare const plural: (count: number, one: string, many?: string) => string;
