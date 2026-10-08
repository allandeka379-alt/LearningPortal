// Tables for lessons/production/location-of-industry.md (W2b). Fictional sugar-mill siting example.
import { table, check } from "../lib.mjs";
// 100 tonnes of cane make 10 tonnes of sugar (weight-losing). Distance cane fields -> town market = 200 km.
// Transport cost US$0.50 per tonne-km for cane and sugar alike.
const rate = 0.5, cane = 100, sugar = 10, dist = 200;
const nearFields = { cane: 0, sugar: sugar * dist * rate };
const nearMarket = { cane: cane * dist * rate, sugar: 0 };
const tot = (x) => x.cane + x.sugar;
check("a", tot(nearFields), 1000);
check("b", tot(nearMarket), 10000);
console.log(table(["Site of the mill", "Cost of carrying cane (US\\$)", "Cost of carrying sugar (US\\$)", "Total transport cost (US\\$)"], [["Next to the cane fields", nearFields.cane, nearFields.sugar, tot(nearFields)], ["Next to the town market", nearMarket.cane, nearMarket.sugar, tot(nearMarket)]]));
