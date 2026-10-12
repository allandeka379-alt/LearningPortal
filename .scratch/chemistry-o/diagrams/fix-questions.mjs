// Edits question JSON in place (idempotent). Run from repo root.
import fs from "node:fs";
import * as D from "../../tools/diagram-kit.mjs";
const Q = "content/subjects/chemistry-o/questions";
const edit = (file, fn) => { const p = `${Q}/${file}`; const j = JSON.parse(fs.readFileSync(p, "utf8")); fn(j); fs.writeFileSync(p, JSON.stringify(j, null, 2) + "\n"); };
edit("kinetics/factors-and-collision-theory.json", (j) => {
  const q = j.find((x) => x.key === "kinetics.factors-and-collision-theory.q16");
  const alt = "Graph of volume of hydrogen against time for two experiments with 1.3 g of zinc and excess acid: curve B (zinc powder) is steeper at the start and levels off sooner than curve A (zinc granules), but both level off at the same final volume, 480 cm³.";
  q.stem = "Two experiments are done with the same volume of the same dilute sulfuric acid, which is in excess. Experiment A uses 1.3 g of zinc granules; experiment B uses 1.3 g of zinc powder. The hydrogen given off is collected in a gas syringe. The graph shows the volume of gas collected against time for the two experiments.\n\n" + D.md("rate-zinc-granules-vs-powder", alt, "Figure: curve A is zinc granules and curve B is zinc powder");
});
edit("energetics/energy-profiles.json", (j) => {
  const q = j.find((x) => x.key === "energetics.profiles.q11");
  q.parts[0].stem = "On paper, draw and label a reaction pathway diagram for this reaction. Then compare your drawing with the mark scheme.";
  q.parts[1].stem = "Which feature of a reaction pathway diagram for this reaction shows that the reaction is exothermic?";
  const q8 = j.find((x) => x.key === "energetics.profiles.q08");
  q8.stem = "Complete the sentence about the reaction pathway diagram for an endothermic reaction (energy on the vertical axis, progress of reaction on the horizontal axis).";
});
