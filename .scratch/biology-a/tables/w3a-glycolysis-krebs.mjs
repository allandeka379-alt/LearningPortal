// W3a: per-glucose tallies for respiration/glycolysis-krebs.md (stage table)
import { table, chk } from "../lib.mjs";
const stages = {
  Glycolysis: { co2: 0, nad: 2, fad: 0, atp: 2 }, // net (4 made, 2 used)
  "Link reaction (×2)": { co2: 2 * 1, nad: 2 * 1, fad: 0, atp: 0 },
  "Krebs cycle (×2)": { co2: 2 * 2, nad: 2 * 3, fad: 2 * 1, atp: 2 * 1 },
};
const rows = Object.entries(stages).map(([k, v]) => [k, v.co2, v.nad, v.fad, v.atp]);
const tot = ["Total per glucose", ...[1, 2, 3, 4].map((i) => rows.reduce((s, r) => s + r[i], 0))];
console.log(table(["Stage", "CO₂", "Reduced NAD", "Reduced FAD", "ATP (substrate-linked)"], [...rows, tot]));
chk(tot[1], 6); chk(tot[2], 10); chk(tot[3], 2); chk(tot[4], 4);
