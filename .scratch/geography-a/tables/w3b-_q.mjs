// Shared shortcuts for the W3b slices: an MCQ whose first option is the key (the build rebalances key positions) and a pipe-table builder.
export const mc = (b, d, skill, stem, opts, explanation, o = {}) => b.mcq({ d, skill, stem, options: opts, answer: "A", explanation, ...o });
export { table as tbl } from "../lib.mjs";
export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const sgn = (v) => (v > 0 ? `+${v}` : v < 0 ? `−${Math.abs(v)}` : "0");
