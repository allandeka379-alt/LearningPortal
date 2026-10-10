// Lesson numbers for inheritance/dihybrid: Punnett enumeration and expected numbers.
import { chk, expectedFromRatio } from "../lib.mjs";
const g = ["PS", "Ps", "pS", "ps"];
const counts = {};
for (const a of g) for (const b of g) {
  const ph = (a[0] === "P" || b[0] === "P" ? "purple" : "yellow") + " " + (a[1] === "S" || b[1] === "S" ? "smooth" : "wrinkled");
  counts[ph] = (counts[ph] ?? 0) + 1;
}
console.log(counts);
chk(counts["purple smooth"], 9); chk(counts["yellow wrinkled"], 1);
const e = expectedFromRatio(528, [9, 3, 3, 1]); console.log(e); chk(e[0], 297);
chk(400 * (1 / 4) * (1 / 2), 50);
// roan x horns
const col = { red: 1, roan: 2, white: 1 }, horn = { hornless: 3, horned: 1 };
for (const c in col) for (const h in horn) console.log(c, h, col[c] * horn[h]);
