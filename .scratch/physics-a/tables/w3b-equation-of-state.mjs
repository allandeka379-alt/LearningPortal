import { DATA, toK, sciTex, table, dpStr } from "../lib.mjs";
const n = 1.2e6 * 0.020 / (DATA.R * toK(15)); console.log("n", n, "N", sciTex(n * DATA.NA), "mass O2? 0.032", n * 0.032);
console.log("tyre p2", 2.2e5 * toK(45) / toK(18));
console.log("k", DATA.R / DATA.NA);
// Boyle data table (illustrative): pV=const 1.00e5*30 cm3
const V = [30.0, 25.0, 20.0, 15.0, 12.0, 10.0]; const nz = [0, 0.01, -0.01, 0.02, -0.01, 0.01];
const p = V.map((v, i) => Math.round((3000 / v / 100 + nz[i]) * 100) / 100);
console.log(table(["$V\,/\,\text{cm}^3$", "$p\,/\,10^{5}\ \text{Pa}$", "$pV\,/\,10^{5}\ \text{Pa cm}^3$", "$\dfrac{1}{V}\,/\,\text{cm}^{-3}$"], V.map((v, i) => [dpStr(v, 1), dpStr(p[i], 2), dpStr(p[i] * v, 1), dpStr(1 / v, 4)])));
