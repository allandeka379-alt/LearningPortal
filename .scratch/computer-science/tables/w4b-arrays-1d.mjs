// Tables for lessons/prog/arrays-1d.md, computed from JS mirrors.
import { recordTrace, arrayMd } from "../slices/w4b-0-kit.mjs";
const Rain = [12, 0, 7, 25, 3];
console.log(arrayMd("Rainfall", Rain) + "\n");
const t = recordTrace(["Day", "Total", "Wettest", "WettestDay", "OUTPUT"], (rec) => {
  const s = { Total: 0, Wettest: Rain[0], WettestDay: 1 }; rec(s);
  for (let d = 1; d <= 5; d++) {
    s.Day = d; s.Total += Rain[d - 1];
    if (Rain[d - 1] > s.Wettest) { s.Wettest = Rain[d - 1]; s.WettestDay = d; }
    rec(s);
  }
  s.OUTPUT = `${s.Total} ${s.WettestDay}`; rec(s);
});
console.log(t.md + "\n");
const Names = ["Tendai", "Rudo", "Farai", "Chipo", "Sipho", "Nyasha"];
const Marks = [58, 73, 66, 81, 49, 70];
console.log(arrayMd("Names", Names)); console.log(arrayMd("Marks", Marks));
const target = "Chipo";
const t2 = recordTrace(["Index", "Found", "OUTPUT"], (rec) => {
  const s = { Index: 0, Found: "FALSE" }; rec(s);
  let found = false; let i = 0;
  while (!found && i < Names.length) { i++; s.Index = i; if (Names[i - 1] === target) { found = true; s.Found = "TRUE"; } rec(s); }
  s.OUTPUT = found ? `${target} scored ${Marks[i - 1]}` : "Not found"; rec(s);
});
console.log(t2.md);
