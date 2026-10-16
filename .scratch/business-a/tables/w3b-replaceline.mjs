// Usage: node w3b-replaceline.mjs <file> <lineNo> <replacementFile>   (replaces one line; replacementFile content is used verbatim, trailing newline trimmed)
import fs from "node:fs";
const [f, n, r] = process.argv.slice(2);
const lines = fs.readFileSync(f, "utf8").split("\n");
const rep = fs.readFileSync(r, "utf8").replace(/\n+$/, "");
lines.splice(Number(n) - 1, 1, rep);
fs.writeFileSync(f, lines.join("\n"));
console.log("replaced line", n);
