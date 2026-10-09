// Tables for lessons/prog/iteration.md, computed from JS mirrors.
import { recordTrace } from "../slices/w4b-0-kit.mjs";
// WE1: FOR with negative STEP.
{
  const t = recordTrace(["Count", "OUTPUT"], (rec) => {
    const s = {};
    for (let c = 20; c >= 2; c -= 6) { s.Count = c; s.OUTPUT = undefined; rec(s); s.OUTPUT = String(c); rec(s); }
  });
  console.log(t.md + "\n");
}
// WE2: WHILE tripling.
{
  const t = recordTrace(["Number", "Steps", "OUTPUT"], (rec) => {
    const s = { Number: 1, Steps: 0 }; rec(s);
    while (s.Number < 100) { s.Number *= 3; s.Steps += 1; rec(s); }
    s.OUTPUT = `${s.Steps} steps`; rec(s);
  });
  console.log(t.md + "\n");
}
// Nested loop output.
{
  const lines = [];
  for (let r = 1; r <= 3; r++) { let line = ""; for (let c = 1; c <= 4; c++) line += String(r * c) + " "; lines.push(line.trim()); }
  console.log(lines.join("\n"));
}
