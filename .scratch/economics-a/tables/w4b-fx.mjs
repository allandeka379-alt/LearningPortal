import { schedule, pctChange, forex, chk } from "../lib.mjs";
const prices=[5.0,5.5,6.0,6.5,7.0];
const qd=[500,450,400,350,300], qs=[250,325,400,475,550], qd2=qd.map(v=>v+125);
const s1=schedule({prices,qd,qs,priceHeader:"Price of R1 (US cents)",qdHeader:"Demand for rand before (R million)",qsHeader:"Supply of rand (R million)",requireEquilibrium:true,extra:[{header:"Demand for rand after (R million)",values:qd2}]});
console.log(s1.md, s1.equilibrium);
const s2=schedule({prices,qd:qd2,qs,requireEquilibrium:true}); console.log(s2.equilibrium);
console.log(pctChange(0.06,0.065));
// conversions
console.log(1/18, 1/16.2, pctChange(1/18,1/16.2), pctChange(18,16.2));
console.log(250*18, 1800/18, 450*0.8);
