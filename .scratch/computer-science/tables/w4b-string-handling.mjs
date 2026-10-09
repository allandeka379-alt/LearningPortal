// Tables for lessons/prog/string-handling.md, computed.
import { LENGTH, SUBSTRING, UCASE, LCASE, charsMd, mdTable, recordTrace } from "../slices/w4b-0-kit.mjs";
const P = "Victoria Falls";
console.log(charsMd(P) + "\n");
const ex = [
  ["`LENGTH(Place)`", LENGTH(P)],
  ["`SUBSTRING(Place, 1, 8)`", `"${SUBSTRING(P, 1, 8)}"`],
  ["`SUBSTRING(Place, 10, 5)`", `"${SUBSTRING(P, 10, 5)}"`],
  ["`UCASE(Place)`", `"${UCASE(P)}"`],
  ["`LCASE(SUBSTRING(Place, 10, 1))`", `"${LCASE(SUBSTRING(P, 10, 1))}"`],
  ["`SUBSTRING(Place, LENGTH(Place) - 2, 3)`", `"${SUBSTRING(P, LENGTH(P) - 2, 3)}"`],
];
console.log(mdTable(["Expression", "Result"], ex.map((r) => [r[0], String(r[1])])) + "\n");
// WE2: count letter a (either case) in "Banana Tree"? use "Kariba Dam"
const W = "Kariba Dam";
const t = recordTrace(["Position", "Letter", "Count", "OUTPUT"], (rec) => {
  const s = { Count: 0 }; rec(s);
  for (let i = 1; i <= LENGTH(W); i++) {
    s.Position = i; s.Letter = SUBSTRING(W, i, 1);
    if (LCASE(s.Letter) === "a") s.Count++;
    rec(s);
  }
  s.OUTPUT = String(s.Count); rec(s);
});
console.log(charsMd(W));
console.log(t.md);
