import { labourMarket } from "../lib.mjs";
for (const mw of [5.5, 7, 4]) console.log(mw, JSON.stringify(labourMarket({ m:14,n:0.02,s:2,k:0.01,minimumWage:mw })));
