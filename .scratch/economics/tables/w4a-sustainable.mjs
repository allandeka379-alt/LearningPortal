// Figures for lessons/development/sustainable.md (W4a).
import { table, check } from "../lib.mjs";
// WE1: fictional community wildlife scheme revenue sharing.
const rev = 84000, shares = [["Households and ward projects", 55], ["Wildlife management and anti-poaching", 25], ["District council administration", 20]];
check("shares", shares.reduce((s, x) => s + x[1], 0), 100);
const rows = shares.map(([n, p]) => [n, p, (rev * p) / 100]);
console.log(table(["Use of revenue", "Share (%)", "Amount (US\\$)"], [...rows, ["**Total**", "**100**", `**${rev.toLocaleString("en-GB")}**`]]));
const wards = 6, perWard = (rev * 0.55) / wards;
console.log({ perWard });
// WE2: solar-powered irrigation project.
const cost = 18000, fuelSaving = 2400, extraCrops = 3600, annual = fuelSaving + extraCrops, payback = cost / annual;
console.log({ annual, payback, fiveYearNet: annual * 5 - cost });
check("payback", payback, 3);
