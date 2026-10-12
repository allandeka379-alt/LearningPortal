import fs from "node:fs";
const [,, file, ...pairs] = process.argv;
let s = fs.readFileSync(file, "utf8");
for (let i = 0; i < pairs.length; i += 2) { if (!s.includes(pairs[i])) { console.error("MISSING:", pairs[i]); process.exit(1); } s = s.replace(pairs[i], () => pairs[i + 1]); }
fs.writeFileSync(file, s);
