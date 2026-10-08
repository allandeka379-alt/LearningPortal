import { financialPosition, TERMS, r2, sum } from "./w3b-lib.mjs";
const nca=[["Premises",60000,null],["Fixtures and fittings",14000,5600],["Motor van",22000,8800]];
const ca=[["Inventory",8900],["Trade receivables",6450],["Bank",3215],["Cash",410]]; const cl=[["Trade payables",7240]]; const ncl=[["Bank loan (repayable 2030)",15000]];
const net=r2(sum(nca.map(x=>x[1]-(x[2]??0)))+sum(ca.map(x=>x[1]))-7240-15000); const open=r2(net-18785+9600);
const e1=financialPosition({name:"Tendai's Hardware",terms:TERMS.BOTH,nca,ca,cl,ncl,openCap:open,profit:18785,drawings:9600}); console.log(e1.md); console.log(open, JSON.stringify({...e1,md:0}));
const nca2=[["Goodwill",5000,null],["Shop equipment",9600,3840],["Delivery motorcycle",4800,1200]]; const ca2=[["Inventory",5340],["Trade receivables",1870],["Cash",260]]; const cl2=[["Trade payables",4115],["Bank overdraft",1385],["Other payables (accrued expenses)",240]];
const draw=r2(7200+650+400); const net2=r2(sum(nca2.map(x=>x[1]-(x[2]??0)))+sum(ca2.map(x=>x[1]))-sum(cl2.map(x=>x[1]))); const open2=r2(net2-2000-12390+draw);
const e2=financialPosition({name:"Farai's Grocery",terms:TERMS.BOTH,nca:nca2,ca:ca2,cl:cl2,openCap:open2,capIn:2000,profit:12390,drawings:draw}); console.log(e2.md); console.log(open2, draw, JSON.stringify({...e2,md:0}));
