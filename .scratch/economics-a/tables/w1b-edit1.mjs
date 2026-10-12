import fs from "node:fs";
const p = ".scratch/economics-a/slices/w1b-equilibrium.mjs";
let s = fs.readFileSync(p, "utf8");
s = s.replace("New Qd = 110, 90, 70, 50, 30; at US\\$8, Qd = 50 + 20 = 70 = Qs.", "New Qd = 130, 110, 90, 70, 50; at US\\$8, Qd = 30 + 40 = 70 = Qs.");
// drop the fill-in-the-blank and the first true/false
s = s.replace(/  b\.fib\(\{[\s\S]*?\}\);\n\n/, "");
s = s.replace(/  b\.tf\(\{ d: 1, skill: "RECALL", stem: "A shortage[\s\S]*?\}\);\n/, "");
fs.writeFileSync(p, s);
