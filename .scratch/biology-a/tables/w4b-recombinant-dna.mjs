import { complement } from "../lib.mjs";
// Example: linear fragment of 3000 bp with EcoRI sites at given positions (cut after G at position p => cut between p and p+1)
const L = 3000;
const sites = [650, 1820]; // position of G (1-based) of GAATTC; cut after it
const cuts = sites; // cut after base p
const frags = []; let prev = 0;
for (const c of cuts) { frags.push(c - prev); prev = c; }
frags.push(L - prev);
console.log("fragments", frags, frags.reduce((a, b) => a + b));
// sticky end demo
const top = "GTCGAATTCAGC";
console.log(top, complement(top));
// short sequence site search
const seq = "ATGGATCCTAGAATTCGGCTAGGATCCAAT";
const find = (s, site) => { const r = []; let i = s.indexOf(site); while (i >= 0) { r.push(i + 1); i = s.indexOf(site, i + 1); } return r; };
console.log("BamHI", find(seq, "GGATCC"), "EcoRI", find(seq, "GAATTC"), seq.length);
