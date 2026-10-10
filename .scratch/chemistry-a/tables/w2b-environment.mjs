import { Mr, AR, sfStr } from "../lib.mjs";
const mS = 1000 * 0.02; const n = mS / AR.S;
console.log("S g", mS, "n", n, "SO2 g", n * Mr("SO2"), "H2SO4 g", n * Mr("H2SO4"));
