import { elasticity, pctChange, table, chk, r2 } from "../lib.mjs";
// Ex 1: PED
const p0=2,p1=2.2,q0=5000,q1=4000;
const ped=elasticity.price(p0,p1,q0,q1); chk(ped,-2,1e-9);
const r0=p0*q0, r1=p1*q1; console.log(pctChange(p0,p1),pctChange(q0,q1),ped,r0,r1,r1-r0);
// price cut alt: 2.00->1.90 : price -5%, quantity +10%  (assuming PED -2)
const p2=1.9,q2=q0*(1+ -2*pctChange(p0,p2)/100); console.log(q2,p2*q2);
// Ex 2: YED, promo
const y=elasticity.income(500,540,1000,1120); console.log("YED",pctChange(500,540),pctChange(1000,1120),y);
const a=elasticity.promotional(2000,2500,800,880); console.log("PromoE",pctChange(2000,2500),pctChange(800,880),a);
const priceU=5, unitVar=3; const extraQ=80; console.log("extra revenue",extraQ*priceU,"extra contribution",extraQ*(priceU-unitVar),"extra spend",500);
