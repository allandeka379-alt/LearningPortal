// Writes additional-mathematics-o questions and flashcards from the slice modules. Lessons are authored directly as Markdown.
// Run from the repo root: node .scratch/additional-mathematics/build-content.mjs [slice-prefix ...]   (e.g. "w1a-" builds w1a-*.mjs only)
import { mkdirSync, writeFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { allModules } from "./lib.mjs";
import { rebalanceQuestions } from "../tools/rebalance-mcq.mjs";

const SLICES_DIR = fileURLToPath(new URL("./slices/", import.meta.url));
const only = process.argv.slice(2);
const files = readdirSync(SLICES_DIR).filter((f) => f.endsWith(".mjs") && (only.length === 0 || only.some((o) => f.startsWith(o)))).sort();
for (const f of files) await import(pathToFileURL(join(SLICES_DIR, f)).href);

const ROOT = fileURLToPath(new URL("../../content/subjects/additional-mathematics-o/", import.meta.url));
let qCount = 0;
let cCount = 0;
const balance = { moved: 0, reordered: 0, skipped: {}, after: {} };
const seenKeys = new Set();
const seenFiles = new Set();
for (const m of allModules()) {
  if (seenFiles.has(m.file)) throw new Error(`two concept modules write ${m.file}`);
  seenFiles.add(m.file);
  for (const item of [...m.questions, ...m.cards]) {
    if (seenKeys.has(item.key)) throw new Error(`duplicate key ${item.key}`);
    seenKeys.add(item.key);
  }
  if (m.questions.length) {
    const path = join(ROOT, "questions", `${m.file}.json`);
    mkdirSync(dirname(path), { recursive: true });
    // Balance MCQ answer positions (the player shows options in stored order).
    const r = rebalanceQuestions(m.questions, m.file);
    balance.moved += r.moved;
    balance.reordered += r.reordered;
    for (const [k, v] of Object.entries(r.skipped)) balance.skipped[k] = (balance.skipped[k] ?? 0) + v;
    for (const [k, v] of Object.entries(r.after)) balance.after[k] = (balance.after[k] ?? 0) + v;
    writeFileSync(path, JSON.stringify(m.questions, null, 1) + "\n");
    qCount += m.questions.length;
  }
  if (m.cards.length) {
    const path = join(ROOT, "flashcards", `${m.file}.json`);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, JSON.stringify(m.cards, null, 1) + "\n");
    cCount += m.cards.length;
  }
  console.log(`${m.conceptKey.padEnd(42)} ${String(m.questions.length).padStart(3)} questions ${String(m.cards.length).padStart(3)} cards  -> ${m.file}`);
}
console.log(`MCQ balance: ${balance.moved} keys moved, ${balance.reordered} reordered, skipped ${JSON.stringify(balance.skipped)}, 4-option keys ${JSON.stringify(balance.after)}`);
console.log(`\n${files.length} slice file(s): ${qCount} questions, ${cCount} flashcards.`);
