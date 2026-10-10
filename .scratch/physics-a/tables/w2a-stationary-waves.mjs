import { sfStr, sciTex, DATA } from "../lib.mjs";
const L = 0.8, v = 120; console.log("string f1", v / (2 * L), "f3", 3 * v / (2 * L), "lambda1", 2 * L);
const Lp = 0.33, vs = 340; console.log("closed f1", sfStr(vs / (4 * Lp), 3), "3f1", sfStr(3 * vs / (4 * Lp), 3), "open f1", sfStr(vs / (2 * Lp), 3));
const span = 7.0e-2, gaps = 5; const sp = span / gaps; console.log("node spacing", sp, "lambda", 2 * sp, "f", sciTex(DATA.c / (2 * sp)));
