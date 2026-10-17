import fs from "node:fs";
const snips = JSON.parse(fs.readFileSync(new URL("./md-snippets.json", import.meta.url), "utf8"));
for (const [f, n] of [["g4b-exam-zim-p2c.mjs", "settlement-extract-zimsec-p2c"], ["g3a-map-basics.mjs", "chipo-village-sketch-map"]]) {
  const p = ".scratch/geography/slices/" + f;
  let t = fs.readFileSync(p, "utf8");
  const raw = snips[n];
  if (!t.includes(raw)) throw new Error("raw missing " + n);
  t = t.split(raw).join(JSON.stringify(raw).slice(1, -1));
  fs.writeFileSync(p, t);
}
