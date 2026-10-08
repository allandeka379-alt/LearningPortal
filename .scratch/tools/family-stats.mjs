// Family statistics for a subject README (DB-free).
// Run: node .scratch/tools/family-stats.mjs <family>   e.g. chemistry-o
import fs from "node:fs";
import path from "node:path";

const family = process.argv[2];
if (!family) throw new Error("usage: family-stats.mjs <family>");
const root = path.join("content/subjects", family);
const walk = (d) =>
  fs.existsSync(d)
    ? fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]))
    : [];

const qs = walk(path.join(root, "questions")).filter((f) => f.endsWith(".json")).flatMap((f) => JSON.parse(fs.readFileSync(f, "utf8")));
const cards = walk(path.join(root, "flashcards")).filter((f) => f.endsWith(".json")).flatMap((f) => JSON.parse(fs.readFileSync(f, "utf8")));
const lessons = walk(path.join(root, "lessons"))
  .filter((f) => f.endsWith(".md"))
  .map((f) => {
    const txt = fs.readFileSync(f, "utf8").replace(/\r\n/g, "\n");
    const m = txt.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    const meta = JSON.parse(m[1]);
    const words = m[2].replace(/:::[^\n]*/g, "").split(/\s+/).filter(Boolean).length;
    return { ...meta, words };
  });

const count = (arr, fn) => arr.reduce((m, x) => ((m[fn(x)] = (m[fn(x)] ?? 0) + 1), m), {});
const boards = (applies) => (applies ? applies.join(",") : "both");

console.log(`== ${family}`);
console.log(`lessons ${lessons.length}, free ${lessons.filter((l) => l.freePreview).length}`);
const ws = lessons.map((l) => l.words).sort((a, b) => a - b);
console.log(`lesson words min ${ws[0]} median ${ws[Math.floor(ws.length / 2)]} max ${ws.at(-1)}; >1600: ${lessons.filter((l) => l.words > 1600).map((l) => `${l.key}(${l.words})`).join(" ")}`);
console.log(`questions ${qs.length}, flashcards ${cards.length}`);
console.log("types", count(qs, (q) => q.type));
console.log("multi-select MCQ", qs.filter((q) => q.type === "MULTIPLE_CHOICE" && q.payload?.selectMode === "multiple").length);
console.log("difficulty", count(qs, (q) => q.difficulty));
console.log("examStyle", qs.filter((q) => q.examStyle).length, "dailyEligible", qs.filter((q) => q.dailyEligible).length);
console.log("applies", count(qs, (q) => boards(q.applies)));
console.log("Supplement-labelled", qs.filter((q) => JSON.stringify([q.stem, q.parts?.map((p) => p.stem)]).includes("(Supplement)")).length);

// Self-marked marks: MANUAL questions, or MANUAL parts.
let total = 0, manual = 0, withManual = 0, fullyManual = 0;
for (const q of qs) {
  total += q.marks;
  let m = 0;
  if (q.markingMode === "MANUAL") m = q.marks;
  else if (q.parts) m = q.parts.filter((p) => p.markingMode === "MANUAL").reduce((s, p) => s + p.marks, 0);
  manual += m;
  if (m > 0) withManual++;
  if (m === q.marks && m > 0) fullyManual++;
}
console.log(`marks total ${total}, self-marked ${manual} (${Math.round((100 * manual) / total)}%), questions with self-marked parts ${withManual}, fully self-marked ${fullyManual}`);
console.log("fully self-marked by type", count(qs.filter((q) => q.markingMode === "MANUAL" || (q.parts && q.parts.every((p) => p.markingMode === "MANUAL"))), (q) => q.type));

// MCQ key positions (top-level single-answer MCQs).
const single = qs.filter((q) => q.type === "MULTIPLE_CHOICE" && q.payload?.selectMode !== "multiple");
const pos = {};
for (const q of single) {
  const i = q.options.findIndex((o) => o.correct);
  const letter = "ABCDEFG"[i];
  pos[letter] = (pos[letter] ?? 0) + 1;
}
console.log("single MCQ key position", pos, "of", single.length);
const multi = qs.filter((q) => q.type === "MULTIPLE_CHOICE" && q.payload?.selectMode === "multiple");
const keysFirst = multi.filter((q) => {
  const c = q.options.map((o) => !!o.correct);
  const n = c.filter(Boolean).length;
  return c.slice(0, n).every(Boolean);
}).length;
console.log(`multi-select with keys first: ${keysFirst} of ${multi.length}`);
// Longest option is the key.
const longest = single.filter((q) => {
  const lens = q.options.map((o) => o.content.length);
  const max = Math.max(...lens);
  return q.options[lens.indexOf(max)].correct && lens.filter((l) => l === max).length === 1;
}).length;
console.log(`single MCQ where the key is the unique longest option: ${longest} of ${single.length} (${Math.round((100 * longest) / single.length)}%)`);

// Assessments.
for (const f of walk(path.join(root, "assessments")).filter((f) => f.endsWith(".json"))) {
  const a = JSON.parse(fs.readFileSync(f, "utf8"));
  const list = Array.isArray(a) ? a : a.assessments ?? [a];
  console.log(`${path.relative(root, f)}: ${list.length}`);
  for (const t of list) console.log(`   ${t.key} | ${t.title} | ${t.durationMinutes ?? t.timeLimitMinutes ?? "?"} min | ${t.totalMarks ?? "?"} marks`);
}
