import { schedule, pctChange, chk } from "../lib.mjs";
const prices=[20,24,28,32,36], qd=[900,800,700,600,500], qs=[400,550,700,850,1000], qs2=qs.map(v=>v+250);
console.log(schedule({prices,qd,qs,requireEquilibrium:true,extra:[{header:"Supply after",values:qs2}]}).md);
console.log(schedule({prices,qd,qs:qs2,requireEquilibrium:true}).equilibrium, pctChange(28,24));
console.log(pctChange(20,16), pctChange(1/20,1/16), pctChange(1/20,1/25), 3000/20, 3000/25, 12000*20, 12000*25);
