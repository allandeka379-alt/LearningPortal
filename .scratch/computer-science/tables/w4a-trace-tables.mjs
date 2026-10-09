// Tables for lessons/algorithms/trace-tables.md, computed from JS mirrors.
import { recordTrace } from "../slices/w4a-0-kit.mjs";

// WE1: REPEAT with prompts, product of the first three positive inputs.
{
  const ins = [4, -2, 5, 3];
  let k = 0;
  const t = recordTrace(["Count", "Product", "Number", "OUTPUT"], (rec) => {
    const s = { Count: 0, Product: 1 };
    rec(s);
    do {
      s.OUTPUT = "Enter a number"; rec(s); s.OUTPUT = undefined;
      s.Number = ins[k++];
      if (s.Number > 0) {
        s.Product *= s.Number;
        s.Count += 1;
      }
      rec(s);
    } while (s.Count !== 3);
    s.OUTPUT = `Result: ${s.Product}`; rec(s);
  });
  console.log(t.md + "\n");
}
// WE2: position of the smallest value.
{
  const Values = [7, 3, 9, 2, 6];
  const t = recordTrace(["Index", "Position", "OUTPUT"], (rec) => {
    const s = { Position: 1 };
    rec(s);
    for (let i = 2; i <= 5; i++) {
      s.Index = i;
      if (Values[i - 1] < Values[s.Position - 1]) s.Position = i;
      rec(s);
    }
    s.OUTPUT = String(s.Position); rec(s);
  });
  console.log(t.md + "\n");
}
// WE3: off-by-one error.
{
  const t = recordTrace(["Counter", "Total", "OUTPUT"], (rec) => {
    const s = { Total: 0, Counter: 1 };
    rec(s);
    while (s.Counter < 5) {
      s.Total += s.Counter; s.Counter += 1; rec(s);
    }
    s.OUTPUT = String(s.Total); rec(s);
  });
  console.log(t.md);
}
