// usage: node w3a-swapdata.mjs <file> <startMarker> <endMarker> <newTextFile> : replaces text from startMarker up to (not including) endMarker
import fs from "node:fs";
const [file, start, end, newFile] = process.argv.slice(2);
let s = fs.readFileSync(file, "utf8");
const i = s.indexOf(start);
const j = s.indexOf(end, i);
if (i < 0 || j < 0) { console.log("marker missing", i, j); process.exit(1); }
s = s.slice(0, i) + fs.readFileSync(newFile, "utf8").replace(/\n$/, "") + "\n  " + s.slice(j);
fs.writeFileSync(file, s);
console.log("replaced", j - i, "chars");
