// usage: node w2a-_fix.mjs <slice file> <pairs module (default export array of [from,to])>
import fs from "node:fs";
import { pathToFileURL } from "node:url";
import path from "node:path";
const [file, mod] = process.argv.slice(2);
const pairs = (await import(pathToFileURL(path.resolve(mod)).href)).default;
let s = fs.readFileSync(file, "utf8");
for (const [a, b] of pairs) {
  const n = s.split(a).length - 1;
  if (n !== 1) { console.error(`MATCH COUNT ${n}: ${a.slice(0, 90)}`); process.exit(1); }
  s = s.replace(a, () => b);
}
fs.writeFileSync(file, s);
console.log("applied", pairs.length);
