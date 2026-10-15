import { chk, fmt, table, prices, deflator, pctChange, round } from "../lib.mjs";
const items = [ {name:"Food",weight:40,p0:5,p1:5.6}, {name:"Housing and utilities",weight:25,p0:120,p1:132}, {name:"Transport",weight:20,p0:2,p1:2.5}, {name:"Clothing",weight:15,p0:30,p1:33} ];
const w = prices.weightedTable(items, {dp:1}); console.log(w.md, w.index);
console.log("inflation", prices.inflationRate(108, w.index));
console.log("real", prices.realValue(640, w.index), prices.realValue(600,108), pctChange(prices.realValue(600,108), prices.realValue(640,w.index)));
console.log("nominal wage growth", pctChange(600,640));
console.log("deflator", deflator.index(6300, 5250), "real from nominal", deflator.real(6300, 120));
// growth
const nom0=5100, nom1=6300, def0=100, def1=120; console.log("nominal growth", pctChange(nom0,nom1), "real0", nom0/def0*100, "real1", nom1/def1*100, "real growth", pctChange(nom0, 5250));
