// Adds figure Markdown to question stems in the geography slices (idempotent). Run after maps2.mjs.
import fs from "node:fs";
const snips = JSON.parse(fs.readFileSync(new URL("./md-snippets.json", import.meta.url), "utf8"));
const SLICES = ".scratch/geography/slices/";
function patch(file, anchor, name) {
  const p = SLICES + file;
  let t = fs.readFileSync(p, "utf8");
  if (t.includes(`media:diagrams/${name}.png`)) return console.log("already", name);
  const i = t.indexOf(anchor);
  if (i < 0) throw new Error(`${file}: ${anchor}`);
  const at = i + anchor.length;
  t = t.slice(0, at) + "\\n\\n" + JSON.stringify(snips[name]).slice(1, -1) + t.slice(at);
  fs.writeFileSync(p, t);
  console.log("patched", name);
}
patch("g4b-exam-zim-p2c.mjs", "On the map, the distance by road from the clustered village to the main road junction measures 4.6 cm.", "settlement-extract-zimsec-p2c");
patch("g3a-map-basics.mjs", "It has no north arrow and no scale.", "chipo-village-sketch-map");
