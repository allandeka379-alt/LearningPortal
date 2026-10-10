import { DATA } from "../lib.mjs";
const W = 2.9e-3, s = DATA.sigma;
const T = W / 5.0e-7; console.log("Tsun", T, "r", Math.sqrt(3.83e26 / (4 * Math.PI * s * T ** 4)));
// red giant: lambda 830 nm, L = 2.0e29
const T2 = W / 8.3e-7; console.log("T2", T2, "r2", Math.sqrt(2.0e29 / (4 * Math.PI * s * T2 ** 4)), "ratio", Math.sqrt(2.0e29 / (4 * Math.PI * s * T2 ** 4)) / 6.96e8);
for (const t of [3000, 6000, 12000, 24000]) console.log(t, (W / t) * 1e9);
