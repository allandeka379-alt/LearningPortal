// Escapes bare "US$" in display text of a slice source file (NOT unit keys such as unit: "US$") so it reaches the JSON as "US\$" (a literal dollar, not inline math).
// In the JS source that is written US\\$; template placeholders (${...}) are left alone.
// Usage: node .scratch/tools/escape-usd.mjs <slice.mjs> [...]
import fs from "node:fs";

const BARE = /(?<!\\)US\$(?!\{)/g;
for (const file of process.argv.slice(2)) {
  const src = fs.readFileSync(file, "utf8");
  const count = (src.match(BARE) ?? []).length;
  fs.writeFileSync(file, src.replace(BARE, () => "US\\\\$"));
  console.log(`${file}: ${count} escaped`);
}
