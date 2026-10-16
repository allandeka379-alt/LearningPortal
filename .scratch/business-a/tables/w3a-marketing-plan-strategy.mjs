import { table, chk, pctChange } from "../lib.mjs";
const items=[["Market research",4000],["Promotion (radio, social media, in-store)",18000],["Product improvement and packaging",6000],["Distribution (two new delivery vans)",8000]];
const tot=items.reduce((s,x)=>s+x[1],0); chk(tot,36000,1e-9);
console.log(table(["Budget item","US\$"],[...items,["**Total marketing budget**",tot]]));
const cur=300000, tgt=360000; console.log(pctChange(cur,tgt), tgt-cur, tot/tgt*100, tot/(tgt-cur)*100);
const gm=0.40; console.log("extra gp",(tgt-cur)*gm, (tgt-cur)*gm - tot);
// repeat purchase: 40% of the extra customers' revenue repeats next year
console.log("year-2 extra gp if 70% retained", (tgt-cur)*0.7*gm);
