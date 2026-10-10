// Lesson numbers for coordination/muscle-contraction.
import { chk, actualSize, sfStr, rnd } from "../lib.mjs";
const s = actualSize(48, "mm", 20000); chk(s, 2.4); console.log("sarcomere relaxed µm", s);
const c = actualSize(38, "mm", 20000); chk(c, 1.9); console.log("contracted µm", c);
const pct = ((2.4 - 1.9) / 2.4) * 100; console.log("% shortening", sfStr(pct, 3));
// band table: A band 1.6 constant; I band = sarcomere - A band; H zone = A band - overlap... use simple: H = sarcomere - 2*actin(1.0)
for (const L of [2.4, 2.2, 2.0]) console.log(L, "I", rnd(L - 1.6, 1), "H", rnd(L - 2.0, 1));
