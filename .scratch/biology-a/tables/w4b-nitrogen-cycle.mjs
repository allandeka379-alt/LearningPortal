import { table, pctChange, dpStr, sfStr } from "../lib.mjs";
// Example 1: soil nitrate and ammonium after waterlogging
const days = [0, 2, 4, 6, 8, 10];
const nitrate = [24, 18, 11, 6, 4, 3];
console.log(table(["Days after flooding", ...days.map(String)], [["Nitrate / mg per kg soil", ...nitrate.map(String)]]));
console.log("pct change", dpStr(pctChange(nitrate[0], nitrate[5]), 1));
// Example 2: maize yield after rotation
const contMaize = 3.2, afterGround = 4.0;
console.log("yield pct", dpStr(pctChange(contMaize, afterGround), 1));
