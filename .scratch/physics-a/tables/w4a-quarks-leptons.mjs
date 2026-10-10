import { DATA, sciTex } from "../lib.mjs";
const q = { u: 2 / 3, d: -1 / 3, s: -1 / 3, c: 2 / 3, t: 2 / 3, b: -1 / 3 };
const ch = (s) => [...s].reduce((a, k) => a + (k === k.toUpperCase() ? -q[k.toLowerCase()] : q[k]), 0); // capital = antiquark
for (const s of ["uud", "udd", "uD", "dU", "uud", "sss", "cD"]) console.log(s, ch(s));
console.log("proton charge C", sciTex(ch("uud") * DATA.e));
