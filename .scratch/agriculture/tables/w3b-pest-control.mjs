// Lesson numbers for protection/pest-control.
import { round, money } from "../lib.mjs";
const area = 2, yieldT = 4, lossPct = 15, price = 300, sprayCostHa = 45;
const lostT = area * yieldT * lossPct / 100; const saved = lostT * price; const cost = area * sprayCostHa;
console.log({ lostT, saved, cost, net: saved - cost }, money(saved - cost));
