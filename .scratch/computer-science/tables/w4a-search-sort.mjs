// Tables for lessons/algorithms/search-sort.md, computed from JS mirrors.
import { recordTrace, bubble, linear, arrayMd, mdTable } from "../slices/w4a-0-kit.mjs";

// WE1: linear search.
const Codes = [418, 205, 377, 960, 122, 543, 381, 709];
console.log(arrayMd("Codes", Codes) + "\n");
for (const target of [122, 300]) {
  const t = recordTrace(["Index", "Found", "OUTPUT"], (rec) => {
    const s = { Found: "FALSE", Index: 1 };
    rec(s);
    while (s.Found === "FALSE" && s.Index <= 8) {
      if (Codes[s.Index - 1] === target) s.Found = "TRUE";
      else s.Index += 1;
      rec(s);
    }
    s.OUTPUT = s.Found === "TRUE" ? `Found at position ${s.Index}` : "Not found";
    rec(s);
  });
  console.log(target, linear(Codes, target));
  console.log(t.md + "\n");
}
// WE2: bubble sort, pass 1 in detail then all passes.
const Data = [27, 12, 35, 8, 19];
const a = [...Data];
const rows = [];
for (let j = 0; j < a.length - 1; j++) {
  const before = `${a[j]} and ${a[j + 1]}`;
  let swapped = "No";
  if (a[j] > a[j + 1]) { [a[j], a[j + 1]] = [a[j + 1], a[j]]; swapped = "Yes"; }
  rows.push([String(j + 1), before, swapped, a.join(", ")]);
}
console.log(mdTable(["Comparison", "Values compared", "Swap?", "Array after"], rows) + "\n");
const passes = bubble(Data);
console.log(mdTable(["Pass", "Array after the pass", "Comparisons", "Swaps"], passes.map((p, i) => [String(i + 1), p.after.join(", "), String(p.comparisons), String(p.swaps)])));
