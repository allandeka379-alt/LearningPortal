// Tables for lessons/prog/subroutines.md, computed from JS mirrors.
import { recordTrace } from "../slices/w4b-0-kit.mjs";
const Area = (l, w) => l * w;
console.log("Area(6, 3.5) =", Area(6, 3.5), "Area(2.5, 4) =", Area(2.5, 4), "sum", Area(6, 3.5) + Area(2.5, 4));
const t = recordTrace(["Count", "Number", "Index", "OUTPUT"], (rec) => {
  const s = { Count: 0 }; rec(s);
  for (const n of [3, 2]) {
    s.Number = n; s.Index = undefined; rec(s);
    for (let i = 1; i <= n; i++) { s.Index = i; s.OUTPUT = "*"; rec(s); s.OUTPUT = undefined; }
    s.Count += n; rec(s);
  }
  s.Number = undefined; s.Index = undefined; s.OUTPUT = String(s.Count); rec(s);
});
console.log(t.md);
