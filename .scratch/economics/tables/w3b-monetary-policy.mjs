// Figures for lessons/monetary/monetary-policy.md (W3b).
import { table, forex, pctChange, check, fmt, pct } from "../lib.mjs";
// WE1: interest on a loan and on savings at 8% and 12% / 4% and 7%.
const loan = 10000, save = 5000;
const rows = [[8, 4], [12, 7]].map(([rl, rs]) => [`${rl}% / ${rs}%`, (loan * rl) / 100, (save * rs) / 100]);
console.log(table(["Interest rate on loans / on deposits", "Yearly interest on a US\\$10,000 loan (US\\$)", "Yearly interest on US\\$5,000 of savings (US\\$)"], rows));
// WE2: kora depreciation from K20 to K25 per US$1.
const r0 = 20, r1 = 25, imp = 400, exp = 50000;
const impK = [forex.convert(imp, r0), forex.convert(imp, r1)];
const expUsd = [exp / r0, exp / r1];
check("impK", impK[1], 10000); check("expUsd", expUsd[1], 2000);
console.log(table(["", "K20 = US\\$1", "K25 = US\\$1"], [["Price in kora of a US\\$400 import", `K${fmt(impK[0])}`, `K${fmt(impK[1])}`], ["Price in US\\$ of a K50,000 export", `US\\$${fmt(expUsd[0])}`, `US\\$${fmt(expUsd[1])}`]]));
console.log({ impChange: pct(pctChange(impK[0], impK[1]), 1), expChange: pct(pctChange(expUsd[0], expUsd[1]), 1), koraValueChange: pct(pctChange(1 / r0, 1 / r1), 1) });
