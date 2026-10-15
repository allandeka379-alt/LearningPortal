import { chk } from "../lib.mjs";
const rentV = (d) => 200 - 10 * d, rentM = (d) => 140 - 4 * d;
for (const d of [0,5,10,15,20,25,30,35]) console.log(d, rentV(d), rentM(d));
console.log("margin veg", 200/10, "margin maize", 140/4, "cross", 60/6);
console.log(chk(320-180,140), chk(600-400,200));
