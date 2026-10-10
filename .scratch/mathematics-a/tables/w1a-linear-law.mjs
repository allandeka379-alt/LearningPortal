import { chk, sfStr } from "../lib.mjs";
const n1 = (4.8 - 2.1) / (2.0 - 0.5), c1 = 2.1 - n1 * 0.5; console.log("ex1 n", n1, "lnk", c1, "k", Math.exp(c1), sfStr(Math.exp(c1)));
const g2 = (4.4 - 3.2) / (5 - 1), c2 = 3.2 - g2; console.log("ex2 lna", g2, "a", Math.exp(g2), sfStr(Math.exp(g2)), "lnk", c2, "k", Math.exp(c2), sfStr(Math.exp(c2)));
const xs = [1, 2, 3, 4]; console.log("ex3", xs.map((x) => [x * x, 2 * x * x + 3]));
const xs4 = [2, 4, 8, 16]; const pts = xs4.map((x) => [Math.log(x), Math.log(3 * x ** 1.5)]); console.log("ex4", pts.map((p) => p.map((v) => v.toFixed(3))));
const gr = (pts[3][1] - pts[0][1]) / (pts[3][0] - pts[0][0]); const ic = pts[0][1] - gr * pts[0][0]; console.log("grad", gr, "int", ic, Math.exp(ic));
