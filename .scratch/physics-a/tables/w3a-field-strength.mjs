import { DATA, sfStr, sciTex, dpStr, table, gField } from "../lib.mjs";
const G = DATA.G;
const ME = 5.97e24, RE = 6.37e6;
console.log("g surface", gField(ME, RE));
const h = 4.0e5; console.log("g ISS", gField(ME, RE + h), "ratio", gField(ME, RE + h) / gField(ME, RE));
const MM = 6.42e23, RM = 3.39e6; console.log("Mars g", gField(MM, RM));
// planet mass from g and R
const gp = 8.87, Rp = 6.05e6; console.log("Venus-like M", sciTex(gp * Rp * Rp / G));
// table g vs r/R
console.log(table(["$r/R_E$", "$r\,/\,10^{6}\ \text{m}$", "$g\,/\,\text{N kg}^{-1}$"], [1, 1.5, 2, 3, 4, 6.6].map((k) => [dpStr(k, 1), sfStr(k * RE / 1e6, 3), sfStr(gField(ME, k * RE), 3)])));
// 1 km height change
console.log("1 km", gField(ME, RE + 1000), "pct change", (1 - gField(ME, RE + 1000) / gField(ME, RE)) * 100);
// Earth-Moon neutral point
const Mm = 7.35e22, d = 3.84e8; const x = d / (1 + Math.sqrt(Mm / ME)); console.log("neutral from Earth", x, x / d);
