import { sfStr, sciTex, table, dpStr, reflectionCoeff, attenuate } from "../lib.mjs";
const mats = [["air", 1.29, 330], ["fat", 925, 1450], ["soft tissue", 1060, 1540], ["muscle", 1075, 1590], ["bone", 1900, 4080], ["coupling gel", 1020, 1520]];
console.log(table(["material", "ρ / kg m^-3", "c / m s^-1", "Z / kg m^-2 s^-1"], mats.map(([n, r, c]) => [n, r, c, sciTex(r * c, 3)])));
const Z = Object.fromEntries(mats.map(([n, r, c]) => [n, r * c]));
for (const [a, b] of [["air", "soft tissue"], ["coupling gel", "soft tissue"], ["fat", "muscle"], ["soft tissue", "bone"], ["muscle", "bone"]]) console.log(a, b, sfStr(reflectionCoeff(Z[a], Z[b]), 3), reflectionCoeff(Z[a], Z[b]));
console.log("depth", 1540 * 65e-6 / 2);
const mu = 48; console.log(table(["x / cm", "I/I0"], [0, 1, 2, 3, 4, 5, 6].map((x) => [x, dpStr(attenuate(1, mu, x / 100), 3)])));
// WE: transmitted fraction through 4.0 cm at mu 48, after reflection at fat-muscle
console.log("WE3", attenuate(1, mu, 0.04), attenuate(1, mu, 0.08));
