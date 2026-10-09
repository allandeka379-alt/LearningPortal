// Tables for lessons/algorithms/flowcharts.md, computed from JS mirrors of the flowcharts.
import { recordTrace } from "../slices/w4a-0-kit.mjs";

// Worked example 1: museum ticket (selection).
const ticket = (age) => (age < 12 ? 2 : age >= 60 ? 3 : 5);
for (const a of [9, 35, 60]) console.log(a, ticket(a));

// Worked example 2: rogue-value loop, inputs 6, 9, 4, -1.
const t = recordTrace(["Number", "Total", "Count", "OUTPUT"], (rec) => {
  const s = { Total: 0, Count: 0 };
  rec(s);
  const ins = [6, 9, 4, -1];
  let k = 0;
  s.Number = ins[k++]; rec(s);
  while (s.Number !== -1) {
    s.Total += s.Number;
    s.Count += 1;
    rec(s);
    s.Number = ins[k++]; rec(s);
  }
  s.OUTPUT = `${s.Total} ${s.Count}`; rec(s);
});
console.log(t.md);
