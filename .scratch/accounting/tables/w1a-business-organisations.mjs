// Tables for lessons/fundamentals/business-organisations.md (W1a).
import { statement, sum, check } from "../lib.mjs";
const assetsSold = [["Inventory", 9800], ["Delivery truck", 6300], ["Shop fittings", 1450], ["Bank", 1050]];
const liab = [["Trade payables", 9450], ["Bank loan", 14000]];
const A = sum(assetsSold.map((x) => x[1])), L = sum(liab.map((x) => x[1]));
const short = L - A;
check("short", A + short, L);
console.log(statement("Tendai Hardware: position on closure", [
  ["Cash raised from selling the business assets", null, null],
  ...assetsSold.map(([a, v]) => [a, v, null]),
  ["", null, A],
  ["Less business debts", null, null],
  ...liab.map(([a, v]) => [a, v, null]),
  ["", null, -L],
  ["**Shortfall to be paid from Tendai's own assets**", null, -short],
], { checks: [["A", A, 18600], ["L", L, 23450], ["short", short, 4850]] }));
console.log({ A, L, short });
