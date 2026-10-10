import { table, dpStr } from "../lib.mjs";
const tt=[0,10,20,30,40,60,80,100], v=[0,4.2,7.6,10.2,12.0,14.0,14.8,15.0];
console.log(table(["Time / s", ...tt.map(String)], [["Volume of oxygen / cm³", ...v.map(x=>dpStr(x,1))]]));
console.log("tangent rate", 9.0/20, "first chord", 4.2/10, "mean rate over 100 s", 15/100);
