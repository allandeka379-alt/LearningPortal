import { DATA, sfStr, sciTex, table, dpStr } from "../lib.mjs";
const { h, c, e } = DATA;
const E = (n) => -13.6 / n ** 2;
console.log(table(["n", "E / eV", "E / J"], [1, 2, 3, 4, 5].map((n) => [n, dpStr(E(n), 2), sciTex(E(n) * e, 3)])));
const lam = (dE) => (h * c) / (dE * e);
// using rounded level values as given in table
const L = { 1: -13.6, 2: -3.40, 3: -1.51, 4: -0.85, 5: -0.54 };
for (const [a, b] of [[3, 2], [4, 2], [5, 2], [2, 1], [3, 1], [4, 3]]) { const d = L[a] - L[b]; console.log(`${a}->${b}`, dpStr(d, 2), "eV", sfStr(lam(d) * 1e9, 3), "nm"); }
console.log("ion", sfStr(lam(13.6) * 1e9, 3));
