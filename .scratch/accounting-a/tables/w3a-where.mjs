// usage: node w3a-where.mjs <number> <file>  -> prints lines containing the number token (after comma normalisation)
import fs from "node:fs";
const [n, f] = process.argv.slice(2);
const t = fs.readFileSync(f, "utf8");
t.split("\n").forEach((l, i) => {
  const c = l.replace(/(\d)[ ,](\d{3})(?!\d)/g, "$1$2");
  if ((c.match(/\d+(?:\.\d+)?/g) ?? []).includes(n)) console.log(i + 1, l.slice(0, 160));
});
