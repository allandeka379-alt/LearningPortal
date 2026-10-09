// Tables for lessons/data/text-character-sets.md
import { toBase } from "../lib.mjs";
const row = (ch) => `| ${ch === " " ? "space" : ch} | ${ch.charCodeAt(0)} | ${toBase(ch.charCodeAt(0), 2, 8)} |`;
console.log("| Character | Denary code | 8-bit binary |\n|:-:|:-:|:-:|");
for (const ch of [" ", "0", "9", "A", "B", "Z", "a", "b", "z"]) console.log(row(ch));
console.log("---"); for (const ch of "Gweru") console.log(row(ch));
console.log("Dog:", [..."Dog"].map(c => c.charCodeAt(0)));
console.log("decode", [72, 105, 33].map(n => String.fromCharCode(n)).join(""), [72,105,33].map(n=>toBase(n,2,8)).join(" "));
console.log(2**7, 2**8, 2**16, 0x10FFFF + 1);
console.log("'7'", "7".charCodeAt(0), "'a'-'A'", 97 - 65);
