import { Mr, sfStr } from "../lib.mjs";
// WE: 0.500 g impure NaBr gives 0.846 g AgBr. % NaBr
const mAgBr = 0.846; const n = mAgBr / Mr("AgBr");
console.log("AgBr Mr", Mr("AgBr"), "n", n, "NaBr Mr", Mr("NaBr"), "mass NaBr", n * Mr("NaBr"), "pct", n * Mr("NaBr") / 0.5 * 100);
