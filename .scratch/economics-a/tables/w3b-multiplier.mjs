import { table, fmt, keynes, roundTo } from "../lib.mjs";
// rounds: injection 100, mpc .8 closed
let inc=100, cum=0; const rows=[];
for(let r=1;r<=6;r++){ cum+=inc; rows.push([r,fmt(roundTo(inc,2),2),fmt(roundTo(inc*0.8,2),2),fmt(roundTo(cum,2),2)]); inc*=0.8; }
console.log(table(["Round","Extra income (US$ million)","Of which spent (MPC = 0.8)","Cumulative rise in income"],rows));
console.log(keynes.multiplier({mpc:0.8}), keynes.change({delta:100,mpc:0.8}));
const k=keynes.multiplier({mpc:0.8,mrt:0.25,mpm:0.1}); console.log(k, keynes.multiplierFromWithdrawals({mps:0.2*0.75,mpt:0.25,mpm:0.1}), 100*k);
console.log("rounds open:"); let i2=100,c2=0; const spendHome=0.8*0.75-0.1; for(let r=1;r<=5;r++){c2+=i2;console.log(r,i2,c2);i2*=spendHome;} console.log(spendHome);
