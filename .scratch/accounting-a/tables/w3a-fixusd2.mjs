// usage: node w3a-fixusd2.mjs file -> bare US$ followed by ${ becomes US\\$${ in JS source
import fs from "node:fs";
const BS = String.fromCharCode(92);
const p = process.argv[2];
let s = fs.readFileSync(p, "utf8");
const before = s;
s = s.split("US$" + "${").join("US" + BS + BS + "$" + "${");
fs.writeFileSync(p, s);
console.log(before === s ? "no change" : "fixed");
