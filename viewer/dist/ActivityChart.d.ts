import type { Chart } from "./types";
export declare function bucketText(minutes: number): string;
/** Records per period over the searched range, so a spike or a gap shows before a row is read. */
export declare function ActivityChart({ chart, noun, loading }: {
    chart?: Chart;
    noun: string;
    loading: boolean;
}): import("react/jsx-runtime").JSX.Element;
