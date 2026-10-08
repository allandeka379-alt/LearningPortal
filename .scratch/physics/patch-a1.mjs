import { readFileSync, writeFileSync } from "node:fs";
const file = new URL("./slices/a1-measurement.mjs", import.meta.url);
let s = readFileSync(file, "utf8");
const rep = (a, b) => {
  if (!s.includes(a)) throw new Error("missing: " + a.slice(0, 90));
  s = s.replace(a, b);
};
rep(`["gravitational field strength", "Vector."]],
    answer: ["A", "C", "E"],`, `["gravitational field strength", "Vector."], ["speed", "Scalar: speed has no direction."]],
    answer: ["A", "C", "E"],`);
rep(`q.tf({ d: 1, skill: "UNDERSTANDING", daily: true,
    stem: "Weight is a scalar`, `q.tf({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Weight is a scalar`);
rep(`q.tf({ d: 1, skill: "RECALL", daily: true,
    stem: "The gram is the SI base unit of mass.",`, `q.tf({ d: 2, skill: "RECALL", daily: true,
    stem: "The gram is the SI base unit of mass.",`);

const hint = (anchor, hints) => rep(anchor, anchor + "\n    hints: " + JSON.stringify(hints) + ",");
hint(String.raw`stem: t${"`"}Petrol has a density of $750\ \text{kg/m}^3$. What volume, in $\text{m}^3$, does $3.0\ \text{kg}$ of petrol occupy?${"`"},`, ["Rearrange ρ = m/V to V = m/ρ."]);
hint(`stem: "Paraffin (800 kg/m³), water (1000 kg/m³) and glycerol (1260 kg/m³) do not mix. They are poured into one tall jar. In what order do they settle, from top to bottom?",`, ["The least dense liquid rises to the top."]);
hint(String.raw`stem: t${"`"}A trader sells a ring that he says is pure gold (density $19.3\ \text{g/cm}^3$). The ring has a mass of $9.5\ \text{g}$ and a volume of $0.50\ \text{cm}^3$.${"`"},`, ["Density = mass ÷ volume.", "Compare your answer with 19.3 g/cm³."]);
hint(`stem: "A ship is made of steel (7800 kg/m³), yet it floats. Why?",`, ["Think about what fills most of the inside of the hull."]);
hint(String.raw`stem: t${"`"}A learner finds the density of an irregular piece of granite from a quarry near Mutoko.${"`"},`, ["The volume of the granite is the rise in the water level.", "Density = mass ÷ volume."]);
hint(String.raw`stem: t${"`"}A force of $5.0\ \text{N}$ acts due east and a force of $12\ \text{N}$ acts due north on the same object. Calculate the angle between the resultant and due east.${"`"},`, ["Use tan θ = opposite ÷ adjacent, with east as the adjacent side."]);
hint(`stem: "A girl walks 30 m north and then 30 m south along the same path. What is her displacement from the start?",`, ["Displacement compares where she finishes with where she started."]);
hint(String.raw`stem: t${"`"}Two ropes pull a log: one with $40\ \text{N}$ due east and the other with $30\ \text{N}$ due north. A learner finds the resultant by scale drawing.${"`"},`, ["Draw the arrows nose to tail.", "Check your drawing with Pythagoras."]);
hint(`stem: "A swimmer aims straight across a river, swimming at 1.2 m/s relative to the water. The river flows at 0.50 m/s. What is her speed relative to the bank?",`, ["The two velocities are at right angles: use Pythagoras."]);
hint(`stem: "Pressure is force per unit area. Which combination of base units is equivalent to the pascal?",`, ["Write the newton in base units first, then divide by m²."]);
hint(`stem: "Which equation has the same units on both sides?",`, ["Write the units of each side of each equation."]);
hint(String.raw`stem: t${"`"}A human hair is about $80\ \mu\text{m}$ thick. What is this in metres?${"`"},`, ["Micro means × 10⁻⁶."]);
writeFileSync(file, s);

// lib: refuse missing hints / bad daily difficulty
const libFile = new URL("./lib.mjs", import.meta.url);
let l = readFileSync(libFile, "utf8");
const anchor = "    if (!q.explanation) throw new Error(`${q.key}: explanation required`);";
if (!l.includes(anchor)) throw new Error("lib anchor");
if (!l.includes("needs hints")) {
  l = l.replace(anchor, anchor + "\n    if (d >= 3 && !q.hints) throw new Error(`${q.key}: difficulty ${d} needs hints`);\n    if (daily && (d < 2 || d > 3)) throw new Error(`${q.key}: daily questions need difficulty 2-3`);");
  writeFileSync(libFile, l);
}
console.log("patched");
