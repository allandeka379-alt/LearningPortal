// node _unplace.mjs <lesson.md> <figure-name>: removes the figure paragraph (so the script can re-insert it elsewhere)
import fs from "node:fs";
const [,, f, name] = process.argv;
let s = fs.readFileSync(f, "utf8");
const lines = s.split("\n");
const i = lines.findIndex((l) => l.includes(`media:diagrams/${name}.png`));
if (i < 0) { console.log("not found"); process.exit(0); }
lines.splice(i, 1);
fs.writeFileSync(f, lines.join("\n").replace(/\n{3,}/g, "\n\n"));
console.log("removed");
