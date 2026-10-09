// Tables for lessons/data/number-systems.md
import { toBase, fromBase } from "../lib.mjs";
// Denary 4072 place values
const d = 4072; const ds = String(d);
console.log("| 1000 | 100 | 10 | 1 |\n|:-:|:-:|:-:|:-:|\n| " + ds.split("").join(" | ") + " |");
console.log("check", 4*1000+0*100+7*10+2, d);
// Binary 8-bit place values row
console.log("| " + [7,6,5,4,3,2,1,0].map(p=>2**p).join(" | ") + " |");
// Worked example 1: binary 10110011 -> denary
const b = "10110011"; const v = fromBase(b,2);
console.log("| 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |\n|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|\n| " + b.split("").join(" | ") + " |", v);
console.log([...b].map((c,i)=>c==="1"?2**(7-i):null).filter(Boolean).join(" + "), "=", v);
// Hex 2E place value
const h = "2E"; console.log(h, fromBase(h,16), "2*16 + 14 =", 2*16+14);
// Hex digits table
console.log("| Denary | " + Array.from({length:16},(_,i)=>i).join(" | ") + " |");
console.log("| Hex | " + Array.from({length:16},(_,i)=>toBase(i,16)).join(" | ") + " |");
console.log("| Binary | " + Array.from({length:16},(_,i)=>toBase(i,2,4)).join(" | ") + " |");
// Number of values with n bits
for (const n of [1,2,3,4,8,16]) console.log(n, 2**n, 2**n-1);
// 3 switches
for (let i=0;i<8;i++) console.log(toBase(i,2,3), i);
