// Tables for lessons/data/binary-denary.md
import { toBase, fromBase, group } from "../lib.mjs";
const pv8 = [128,64,32,16,8,4,2,1];
function placeRow(n, width=8){ const s=toBase(n,2,width); const pv=Array.from({length:width},(_,i)=>2**(width-1-i)); return `| ${pv.join(" | ")} |\n|${pv.map(()=>":-:").join("|")}|\n| ${s.split("").join(" | ")} |`; }
function subtractSteps(n){ let r=n; const steps=[]; for(const p of pv8){ if(p<=r){ steps.push(`${p} fits into ${r}: write 1, ${r} − ${p} = ${r-p}`); r-=p;} else steps.push(`${p} does not fit into ${r}: write 0`);} return steps; }
// WE1: 157 -> binary by place values
console.log("157:", toBase(157,2,8)); console.log(placeRow(157)); console.log(subtractSteps(157).join("\n"));
// WE2: 89 by division
function divTable(n){ const rows=[]; let q=n; while(q>0){ rows.push(`| ${q} ÷ 2 | ${Math.floor(q/2)} | ${q%2} |`); q=Math.floor(q/2);} return "| Division | Quotient | Remainder |\n|:-:|:-:|:-:|\n"+rows.join("\n"); }
console.log(divTable(89)); console.log("89 =", toBase(89,2), toBase(89,2,8));
// WE3: binary 11010110 -> denary
const b="11010110"; console.log(b, fromBase(b,2), [...b].map((c,i)=>c==="1"?2**(7-i):0).filter(Boolean).join(" + "));
// WE4: 16-bit: 0000 0101 1101 1100
const v16 = 1500; const s16=toBase(v16,2,16); console.log(v16, group(s16), [...s16].map((c,i)=>c==="1"?2**(15-i):0).filter(Boolean).join(" + "));
console.log(placeRow(v16,16));
