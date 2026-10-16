import { table, chk, pctChange } from "../lib.mjs";
const plain=14, branded=16.8, extraCost=1.1, units=10000, campaign=6000;
const prem=pctChange(plain,branded); chk(prem,20,1e-9);
const extraUnit=branded-plain-extraCost; chk(extraUnit,1.7,1e-9);
const extraTot=extraUnit*units; chk(extraTot,17000,1e-6);
console.log(prem, extraUnit, extraTot, extraTot-campaign);
console.log(table(["Item","Unbranded","Branded"],[["Selling price per 25 kg bag (US\$)",plain,branded],["Extra cost of packaging per bag (US\$)","—",extraCost],["Extra profit per bag (US\$)","—",extraUnit]],["l","r","r"]));
