import { market, chk, pctChange, table, r2 } from "../lib.mjs";
const mk=1500000, cur=180000;
const share0=market.share(cur,mk); chk(share0,12,1e-9);
const target=0.15*mk; chk(target,225000,1e-6);
const rise=pctChange(cur,target); chk(rise,25,1e-9);
console.log(table(["Item","Calculation","Result"],[["Current share","180,000 ÷ 1,500,000 × 100",share0+"%"],["Target sales","15% × 1,500,000",target],["Extra sales",`${target} − ${cur}`,target-cur],["Percentage rise","45,000 ÷ 180,000 × 100",rise+"%"]],["l","l","r"]));
const stay=150, spend=30*12, margin=0.25, cost=6000;
const gp=stay*spend*margin; chk(gp,13500,1e-6); console.log(spend, gp, gp-cost);
