// Figures for lessons/population/labour-force.md (W4a).
import { table, fmt, check } from "../lib.mjs";
// WE1: fictional Country X (thousands).
const pop = 15600, wap = 8700, employed = 5220, unemployed = 870;
const lf = employed + unemployed, part = (lf / wap) * 100, inactive = wap - lf, lfShare = (lf / pop) * 100;
console.log(table(["Group", "People (thousands)"], [["Total population", pop], ["Working-age population", wap], ["Employed", employed], ["Unemployed (seeking work)", unemployed], ["Economically inactive of working age", inactive]]));
console.log({ lf, part, inactive, lfShare });
check("part", part, 70);
// WE2: policy changes.
const lf0 = 6090, stayInSchool = 120, laterRetire = 45, womenJoin = 96;
const lf1 = lf0 - stayInSchool + laterRetire + womenJoin;
console.log({ lf1, change: lf1 - lf0, pct: ((lf1 - lf0) / lf0) * 100 });
check("lf1", lf1, 6111);
