// Checks the worked examples of lessons/data/diagrams.md.
import { chk, same, quartiles, median, sorted, sum } from "../lib.mjs";
// Ex1 walking times (15 values)
const w = [8, 12, 15, 15, 17, 21, 22, 24, 26, 28, 31, 33, 35, 40, 47];
const q = quartiles(w);
console.log("Ex1", q, "n", w.length, "fences", q.q1 - 1.5 * q.iqr, q.q3 + 1.5 * q.iqr);
same([q.q1, q.q2, q.q3, q.iqr], [15, 24, 33, 18]);
// Ex2 back-to-back: Form 5A and 5B marks (11 each)
const A = [34, 41, 45, 48, 52, 53, 57, 61, 64, 68, 75];
const B = [29, 38, 44, 47, 49, 50, 51, 55, 58, 66, 83];
console.log("Ex2 A", quartiles(A), "B", quartiles(B));
// Ex3 box plot with outlier: rainfall days
const r = [3, 5, 6, 6, 7, 8, 9, 10, 11, 12, 29];
const qr = quartiles(r);
console.log("Ex3", qr, "upper fence", qr.q3 + 1.5 * qr.iqr, "lower", qr.q1 - 1.5 * qr.iqr);
// Ex4 pie chart: household spending categories (US$)
const sp = { Food: 180, Rent: 150, Transport: 60, School: 90, Other: 60 };
const tot = sum(Object.values(sp));
console.log("Ex4 total", tot, Object.entries(sp).map(([k, v]) => [k, (v / tot) * 360]));
