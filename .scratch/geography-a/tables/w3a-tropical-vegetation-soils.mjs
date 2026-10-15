import { rnd, chk, table } from "../lib.mjs";
// Lesson worked examples (illustrative nitrogen stores, kg/ha)
const rf = { biomass: 1700, litter: 70, soil: 530 };
const sv = { biomass: 320, litter: 40, soil: 1240 };
for (const [n, o] of [["rainforest", rf], ["savanna", sv]]) {
  const tot = o.biomass + o.litter + o.soil;
  console.log(n, tot, ["biomass", "litter", "soil"].map((k) => (o[k] / tot * 100).toFixed(2)));
}
// litter turnover: store / input
console.log("RF turnover yr", 0.9 / 10, "days", 0.9 / 10 * 365);
console.log("SV turnover yr", 3.0 / 4, "days", 3.0 / 4 * 365);
