// Tables for lessons/data/hexadecimal.md
import { toBase, fromBase, group } from "../lib.mjs";
console.log("| Denary | Binary | Hex |\n|:-:|:-:|:-:|");
for (let i=0;i<16;i++) console.log(`| ${i} | ${toBase(i,2,4)} | ${toBase(i,16)} |`);
// WE1 denary 188 -> hex
console.log(188, Math.floor(188/16), 188%16, toBase(188,16));
// WE2 hex 1A7 -> denary
console.log("1A7", 1*256+10*16+7, fromBase("1A7",16));
// WE3 hex 3F9C -> binary
console.log("3F9C", [..."3F9C"].map(c=>toBase(fromBase(c,16),2,4)).join(" "), toBase(fromBase("3F9C",16),2,16));
// WE4 binary 110101101011 -> hex
const b="110101101011"; console.log(group(b), [...group(b).split(" ")].map(n=>toBase(fromBase(n,2),16)).join(""), toBase(fromBase(b,2),16));
// odd length: 1011100 -> pad
const b2="1011100"; console.log(b2, toBase(fromBase(b2,2),2,8), toBase(fromBase(b2,2),16));
// colour example
console.log("FF8000", [255,128,0].map(x=>toBase(x,16,2)).join(""));
console.log(toBase(fromBase("FF",16),2,8), fromBase("80",16));
