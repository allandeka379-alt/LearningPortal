// Tables for lessons/data/octal.md
import { toBase, fromBase } from "../lib.mjs";
console.log("| Denary | Octal | Binary (3 bits) |\n|:-:|:-:|:-:|");
for (let i=0;i<8;i++) console.log(`| ${i} | ${toBase(i,8)} | ${toBase(i,2,3)} |`);
console.log("345 oct =", fromBase("345",8), 3*64+4*8+5);
let q=500; const rows=[]; while(q>0){rows.push(`| ${q} ÷ 8 | ${Math.floor(q/8)} | ${q%8} |`); q=Math.floor(q/8);} console.log("| Division | Quotient | Remainder |\n|:-:|:-:|:-:|\n"+rows.join("\n")); console.log("500 =", toBase(500,8));
console.log("627 oct ->", [..."627"].map(c=>toBase(+c,2,3)).join(" "), toBase(fromBase("627",8),2));
console.log("10111010 ->", toBase(fromBase("10111010",2),8));
const v=fromBase("10111010",2); console.log(v, toBase(v,16), toBase(v,8));
console.log("1777 oct", fromBase("1777",8));
