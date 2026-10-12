import fs from "node:fs";
import path from "node:path";
const root = "content/subjects/geography-a";
const files = [];
const walk = (d) => { for (const n of fs.readdirSync(d)) { const p = path.join(d, n); fs.statSync(p).isDirectory() ? walk(p) : files.push(p); } };
walk(`${root}/questions`);
const mine = ["atmos/energy-budget","atmos/global-transfers","atmos/moisture-precipitation","atmos/air-masses-pressure-systems","atmos/microclimates","atmos/climate-evidence-causes","climate/projections-environments","climate/tipping-points","climate/impacts-vulnerability","climate/mitigation-adaptation-governance","hazard/weather-climatic","skills/extended-writing","agri/threats-responses"];
const auto = (p) => p.markingMode !== "MANUAL" && !["EXTENDED_RESPONSE"].includes(p.type) && p.type !== "STRUCTURED";
function autoMarks(q) { if (q.type === "STRUCTURED") return (q.parts ?? []).reduce((s, p) => s + (p.type === "STRUCTURED" ? (p.parts ?? []).reduce((a, c) => a + (c.markingMode === "MANUAL" ? 0 : c.marks), 0) : (p.markingMode === "MANUAL" ? 0 : p.marks)), 0); return q.markingMode === "MANUAL" ? 0 : q.marks; }
for (const m of mine) {
  const q = JSON.parse(fs.readFileSync(`${root}/questions/${m}.json`, "utf8"));
  const types = {}; let daily = 0; const ds = [0,0,0,0,0,0]; let calc = 0;
  for (const x of q) { types[x.type] = (types[x.type] ?? 0) + 1; if (x.dailyEligible) daily++; ds[x.difficulty]++; if (x.type === "STRUCTURED" && ![6,8,12,14,16].includes(x.marks)) console.log("  BAD struct marks", x.key, x.marks); if (x.type==="EXTENDED_RESPONSE" && [10,15,20,25].includes(x.marks)) console.log("  BAD ext marks", x.key); }
  const mcq = types.MULTIPLE_CHOICE ?? 0;
  const lesson = fs.readFileSync(`${root}/lessons/${m}.md`, "utf8");
  const body = lesson.split("---").slice(2).join("---");
  const words = body.split("\n").filter((l) => !l.startsWith("|") && !l.startsWith(":::")).join(" ").replace(/\$[^$]*\$/g, " x ").split(/\s+/).filter(Boolean).length;
  console.log(m.padEnd(42), "q", q.length, "mcq%", Math.round(mcq / q.length * 100), "daily", daily, "d", ds.slice(1).join("/"), "words", words, JSON.stringify(types));
  const dq = q.filter((x) => x.dailyEligible); 
}
for (const f of ["exam/w1b-zimsec", "exam/w1b-cambridge"]) {
  const q = JSON.parse(fs.readFileSync(`${root}/questions/${f}.json`, "utf8"));
  for (const x of q) {
    const lbl = (x.parts ?? []).map((p) => `${p.label}:${p.marks}${p.type === "EXTENDED_RESPONSE" ? "E" : ""}`).join(" ");
    console.log(f, x.key, x.type, x.marks, "d" + x.difficulty, x.skill, x.paper, JSON.stringify(x.applies), "auto", autoMarks(x), lbl, x.type === "EXTENDED_RESPONSE" ? "pts " + x.answerSpec.markScheme.points.length + " words " + x.answerSpec.modelAnswer.split(/\s+/).length : "");
  }
}
