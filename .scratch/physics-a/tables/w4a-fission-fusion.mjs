import { DATA, sfStr, sciTex, table, dpStr } from "../lib.mjs";
const { u, c, e, NA } = DATA;
const mn = 1.008665;
const before = 235.04393 + mn, after = 140.914411 + 91.926156 + 3 * mn;
const dm = before - after; console.log("fission dm", dm.toFixed(6), "MeV", sfStr(dm * 931.5, 4), "J", sciTex(dm * u * c * c));
const perkg = (dm * u * c * c) * NA / 0.235; console.log("per kg", sciTex(perkg), "ratio coal 3.0e7", sciTex(perkg / 3.0e7, 2));
const dmf = 2.014102 + 3.016049 - 4.002602 - mn; console.log("DT dm", dmf.toFixed(6), "MeV", sfStr(dmf * 931.5, 3), "J", sciTex(dmf * u * c * c));
const gens = [0, 1, 2, 5, 10, 20];
console.log(table(["generation", "k = 0.95", "k = 1.00", "k = 1.05"], gens.map((g) => [g, sfStr(1000 * 0.95 ** g, 3), 1000, sfStr(1000 * 1.05 ** g, 3)])));
