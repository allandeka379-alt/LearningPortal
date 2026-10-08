// Tables for lessons/firms/multinationals.md (W4b).
import { table, fmt, check } from "../lib.mjs";
const rev = 500; const items = [["Wages paid to local workers", 60], ["Purchases from local suppliers", 90], ["Imported equipment and inputs", 120], ["Taxes and royalties paid to the host government", 70]];
const cost = items.reduce((s, x) => s + x[1], 0), profit = rev - cost; check("profit", profit, 160);
const reinv = 40, abroad = profit - reinv;
console.log(table(["Item", "US\$ million"], [["Sales revenue (exports)", rev], ...items, ["Profit", profit], ["of which reinvested in the host country", reinv], ["of which sent to shareholders abroad", abroad]]));
const stays = 60 + 90 + 70 + reinv; console.log("stays", stays, (stays / rev) * 100);
