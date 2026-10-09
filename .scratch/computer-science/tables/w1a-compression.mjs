// Tables for lessons/data/compression.md
import { rle } from "../lib.mjs";
const s = "WWWWWWBBBWWWWRRRRRRRR";
const r = rle(s); console.log(s, s.length, r.map(([n, c]) => `${n}${c}`).join(" "), r.length * 2);
// image rows: 1-bit 12 pixel rows
const rows = ["000000111111", "000011110000", "010101010101"];
for (const row of rows) { const e = rle(row); console.log(row, e.map(([n, c]) => `(${n}, ${c})`).join(" "), "pairs", e.length, "values", e.length * 2, "orig", row.length); }
// bad case
const bad = "ABCDEF"; console.log(bad, rle(bad).map(([n, c]) => `${n}${c}`).join(""));
// text RLE for a word
console.log(rle("aaabbbbbbcd"));
