import { chk, fmt, table, labourMarket, pctChange } from "../lib.mjs";
const m = labourMarket({ m: 12, n: 0.01, s: 2, k: 0.01, minimumWage: 8 });
console.log(JSON.stringify(m));
const bill0 = 7*500, bill1 = 8*400; console.log(bill0, bill1, bill1-bill0);
console.log("ped", pctChange(500,400)/pctChange(7,8));
// monopsony
console.log(JSON.stringify(labourMarket({ m: 12, n: 0.01, s: 2, k: 0.01 })));
// min wage 5 in monopsony: employment? 
// incomes policy: wage guideline 6% inflation 12 -> real wage change
const real = (1.06/1.12 -1)*100; console.log("real wage change", real, 6-12);
// land table
const before = { farms: 10, ha: 500, yield: 6 };
const tot0 = before.farms*before.ha*before.yield; console.log(tot0, before.farms*before.ha);
const plots = 5000/20; console.log(plots, plots*20*4, plots*20*5.5, 20*4, 20*5.5);
console.log(pctChange(30000, 20000), pctChange(30000, 27500), 30000/10, 20000/250, 27500/250);
console.log(table(["Stage (fictional district)", "Holdings", "Land (hectares)", "Yield (tonnes per hectare)", "Output (tonnes)", "Output per holding (tonnes)"], [["Before reform", 10, 5000, 6, 30000, 3000], ["Year 2 after reform", 250, 5000, 4, 20000, 80], ["Year 8 after reform", 250, 5000, 5.5, 27500, 110]]));
console.log("--- monopsony");
for (const mw of [undefined, 5.5, 7]) console.log(mw, JSON.stringify(labourMarket({ m: 12, n: 0.01, s: 3, k: 0.005, minimumWage: mw })));
