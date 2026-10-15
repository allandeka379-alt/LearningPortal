import { tradeWeightedIndex, realExchangeIndex, pctChange, table, fmt, chk } from "../lib.mjs";
const items=[{n:"Partner A",weight:50,index:110},{n:"Partner B",weight:30,index:95},{n:"Partner C",weight:20,index:80}];
console.log(table(["Trading partner","Share of trade (%)","Currency index (base year = 100)","Weight × index"],items.map(i=>[i.n,i.weight,i.index,fmt(i.weight*i.index/100,1)])));
console.log(tradeWeightedIndex(items));
console.log(realExchangeIndex({nominal:105,homePrices:120,foreignPrices:110}));
console.log(250*0.32, pctChange(1/10,1/12), 12/10, 50*10, 50*12);
