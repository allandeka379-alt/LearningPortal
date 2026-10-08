// Tables for lessons/trade/terms-of-trade.md (W4b).
import { termsOfTrade, table, fmt, pctChange, check } from "../lib.mjs";
const t1 = termsOfTrade(132, 110); check("t1", t1, 120); console.log("WE1", t1);
const yrs = ["2023", "2024", "2025", "2026"], X = [100, 104, 98, 112], M = [100, 108, 112, 105];
const tot = X.map((x, i) => termsOfTrade(x, M[i]));
console.log(table(["Year", "Export price index", "Import price index", "Terms of trade"], yrs.map((y, i) => [y, X[i], M[i], fmt(tot[i], 1)]), { }));
console.log(tot.map((v, i) => i ? fmt(pctChange(tot[i - 1], v), 1) : "-"));
// Volume example: 1,000 tonnes of exports buys how many units of imports
