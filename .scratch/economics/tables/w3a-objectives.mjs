// Tables for lessons/firms/objectives.md (W3a).
import { table, check, pctChange, fmt } from "../lib.mjs";
// WE: a fictional juice firm choosing between two prices (profit versus growth).
const opts = [["Plan A: higher price", 10, 5000, 7], ["Plan B: lower price", 8, 8000, 6.5]];
const rows = opts.map(([n, p, q, atc]) => [n, p, q, atc, p * q, atc * q, p * q - atc * q]);
console.log(table(["Plan", "Price (US\\$)", "Bottles sold per month", "ATC (US\\$)", "TR (US\\$)", "TC (US\\$)", "Profit (US\\$)"], rows));
check("profitA", rows[0][6], 15000); check("profitB", rows[1][6], 12000);
// Market share: market of 40,000 bottles a month.
const mkt = 40000;
console.log("shares", (5000 / mkt) * 100, (8000 / mkt) * 100, fmt(pctChange(5000, 8000), 1));
