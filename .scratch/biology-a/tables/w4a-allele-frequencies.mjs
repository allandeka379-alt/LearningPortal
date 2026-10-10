// Lesson numbers for evolution/allele-frequencies.
import { hardyWeinberg } from "../lib.mjs";
const a = hardyWeinberg({ q2: 256 / 6400 });
console.log("snails", a, "het count", a.twoPQ * 6400, "AA count", a.p2 * 6400);
const c = hardyWeinberg({ counts: { AA: 196, Aa: 168, aa: 36 } });
console.log("cattle", c, "expected", c.p2 * 400, c.twoPQ * 400, c.q2 * 400);
