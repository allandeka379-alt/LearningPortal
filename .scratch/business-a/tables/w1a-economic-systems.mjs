import { chk, r2, table } from "../lib.mjs";
const shares = 8_000_000, soldPct = 40, price = 1.75;
const sold = shares * soldPct / 100;
const proceeds = sold * price;
chk(sold, 3_200_000, 0); chk(proceeds, 5_600_000, 0.01);
const retained = shares - sold; chk(retained, 4_800_000, 0);
console.log(sold, proceeds, retained, retained * price);
// commercialisation example: loss turnaround
const rev = 2_400_000, costBefore = 2_760_000, costAfter = 2_280_000;
console.log(rev - costBefore, rev - costAfter);
