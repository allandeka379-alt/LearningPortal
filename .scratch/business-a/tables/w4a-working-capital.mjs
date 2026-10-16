import { table, sum, r2, rd, statement } from "../lib.mjs";
const ca = [["Inventory (stock)", 8400], ["Trade receivables (debtors)", 6100], ["Cash", 1500]];
const cl = [["Trade payables (creditors)", 5200], ["Bank overdraft", 3000], ["Tax owing", 1000]];
const tca = sum(ca.map(x=>x[1])), tcl = sum(cl.map(x=>x[1]));
console.log(statement("Working capital", [["**Current assets**"],...ca,["Total current assets",tca],null,["**Current liabilities**"],...cl,["Total current liabilities",tcl],null,["**Working capital**",tca-tcl]],{cols:["US\$"],checks:[["tca",tca,16000],["tcl",tcl,9200],["wc",tca-tcl,6800]]}));
const sales=240000, share=0.3;
const before = sales*60/365, after = sales*share*10/365 + sales*(1-share)*60/365;
const disc = sales*share*0.02; const released = before-after;
console.log(before, after, released, disc, released*0.12, released*0.18, released*0.12-disc, released*0.18-disc);
