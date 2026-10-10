import { sfStr, dopplerSource } from "../lib.mjs";
const v = 340;
console.log("approach", dopplerSource(900, v, 25, true), "recede", dopplerSource(900, v, 25, false));
console.log("lambda ahead", (v - 25) / 900, "behind", (v + 25) / 900, "stationary", v / 900);
const f1 = 520, f2 = 460;
const vs = (v * (f1 - f2)) / (f1 + f2); const fs = (f1 * (v - vs)) / v;
console.log("vs", vs, sfStr(vs, 3), "fs", fs, sfStr(fs, 3), "check recede", dopplerSource(fs, v, vs, false));
