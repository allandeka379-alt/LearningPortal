import fs from "node:fs";
const p = ".scratch/economics-a/slices/w1b-cambridge.mjs";
let s = fs.readFileSync(p, "utf8");
s = s.replace('P.manual({ label: "(e)", marks: 5,', 'P.manual({ label: "(e)", marks: 4,');
s = s.replace('"Consumer surplus falls; poorer households and businesses using petrol are affected most.", ', '');
s = s.replace('P.manual({ label: "(f)", marks: 5,', 'P.manual({ label: "(f)", marks: 6,');
s = s.replace('"Judgement: effective as a revenue raiser, limited in reducing consumption."]', '"Other measures (public transport, regulation) may be needed to cut use further.", "Judgement: effective as a revenue raiser, limited in reducing consumption."]');
fs.writeFileSync(p, s);
