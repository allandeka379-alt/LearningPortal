// Tables for lessons/prog/variables-data-types.md, computed from JS mirrors.
import { recordTrace, ROUND } from "../slices/w4b-0-kit.mjs";

// WE1: swapping two values with a temporary variable (and the wrong way).
{
  const t = recordTrace(["First", "Second", "Temp", "OUTPUT"], (rec) => {
    const s = {};
    s.First = 18; rec(s);
    s.Second = 31; rec(s);
    s.Temp = s.First; rec(s);
    s.First = s.Second; rec(s);
    s.Second = s.Temp; rec(s);
    s.OUTPUT = `${s.First} ${s.Second}`; rec(s);
  });
  console.log(t.md + "\n");
  const w = recordTrace(["First", "Second", "OUTPUT"], (rec) => {
    const s = {};
    s.First = 18; rec(s);
    s.Second = 31; rec(s);
    s.First = s.Second; rec(s);
    s.Second = s.First; rec(s);
    s.OUTPUT = `${s.First} ${s.Second}`; rec(s);
  });
  console.log(w.md + "\n");
}
// WE2: data bundle cost program with a constant.
{
  const BundlePrice = 2.75;
  const Bundles = 6;
  const Paid = 20.0;
  const Cost = Bundles * BundlePrice;
  const Change = Paid - Cost;
  console.log({ Cost, Change, r: ROUND(Change, 2) });
  const t = recordTrace(["Bundles", "Paid", "Cost", "Change", "OUTPUT"], (rec) => {
    const s = {};
    s.Bundles = Bundles; rec(s);
    s.Paid = Paid.toFixed(1); rec(s);
    s.Cost = Cost.toFixed(2); rec(s);
    s.Change = Change.toFixed(2); rec(s);
    s.OUTPUT = `Cost: ${Cost.toFixed(2)} Change: ${Change.toFixed(2)}`; rec(s);
  });
  console.log(t.md);
}
