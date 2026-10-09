// Tables for lessons/logic/gates.md, truth-tables.md and circuits-expressions.md (w1b).
import { truthTableMd, truthRows, L } from "../lib.mjs";
const h = (s) => console.log(`\n### ${s}`);
h("NOT"); console.log(truthTableMd(["A"], [["X", L.not]]));
for (const g of ["and", "or", "nand", "nor", "xor"]) { h(g.toUpperCase()); console.log(truthTableMd(["A", "B"], [["X", L[g]]])); }
h("gates WE1: NAND via AND then NOT"); console.log(truthTableMd(["A", "B"], [["A AND B", L.and], ["X = NOT (A AND B)", (a, b) => L.not(L.and(a, b))]]));
h("gates WE2 mystery output column for identification"); console.log(truthRows(["A","B"], L.xor).map(r=>r.out).join(""));
h("TT WE1: X = (A OR B) AND NOT C");
console.log(truthTableMd(["A", "B", "C"], [["P = A OR B", (a, b) => L.or(a, b)], ["Q = NOT C", (a, b, c) => L.not(c)], ["X", (a, b, c) => L.and(L.or(a, b), L.not(c))]]));
h("TT WE2: P = A NAND B; Q = B XOR C; X = P AND Q");
console.log(truthTableMd(["A", "B", "C"], [["P = A NAND B", (a, b) => L.nand(a, b)], ["Q = B XOR C", (a, b, c) => L.xor(b, c)], ["X", (a, b, c) => L.and(L.nand(a, b), L.xor(b, c))]]));
h("TT check: A=1,B=0,C=1 in WE2"); console.log(L.and(L.nand(1,0), L.xor(0,1)));
h("CE WE1 alarm X = (A AND B) OR C");
console.log(truthTableMd(["A", "B", "C"], [["A AND B", (a, b) => L.and(a, b)], ["X", (a, b, c) => L.or(L.and(a, b), c)]]));
h("CE WE2 truth table to expression: outputs");
const f2 = (a, b, c) => (a === 0 && b === 1 && c === 1) || (a === 1 && b === 1 && c === 0);
console.log(truthTableMd(["A", "B", "C"], [["X", f2]]));
console.log("check expr", truthRows(["A","B","C"], (a,b,c)=>L.or(L.and(L.and(L.not(a),b),c), L.and(L.and(a,b),L.not(c)))).map(r=>r.out).join(""), truthRows(["A","B","C"], f2).map(r=>r.out).join(""));
h("CE WE3 circuit: NOT A, AND with B -> P; B NOR C -> Q; P OR Q -> X");
console.log(truthTableMd(["A", "B", "C"], [["P = (NOT A) AND B", (a, b) => L.and(L.not(a), b)], ["Q = B NOR C", (a, b, c) => L.nor(b, c)], ["X", (a, b, c) => L.or(L.and(L.not(a), b), L.nor(b, c))]]));
