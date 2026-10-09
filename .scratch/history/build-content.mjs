// Writes history-o questions and flashcards from the slice modules in ./slices. Lessons are authored directly as
// Markdown. Run from the repo root: node .scratch/history/build-content.mjs [slice-prefix ...]
// A filter selects slice files whose name STARTS with it, so a writer's prefix with a trailing dash ("w1a-") never
// picks up another writer's files ("xw1a-..."). With no filter every slice is built.
import { mkdirSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { allModules } from "./lib.mjs";
import { rebalanceQuestions } from "../tools/rebalance-mcq.mjs";

const SLICES_DIR = fileURLToPath(new URL("./slices/", import.meta.url));
const only = process.argv.slice(2);
const files = existsSync(SLICES_DIR)
  ? readdirSync(SLICES_DIR).filter((f) => f.endsWith(".mjs") && (only.length === 0 || only.some((o) => f.startsWith(o)))).sort()
  : [];
if (only.length && files.length === 0) console.warn(`No slice file starts with ${only.join(" or ")}.`);
for (const f of files) await import(pathToFileURL(join(SLICES_DIR, f)).href);

const ROOT = "content/subjects/history-o";
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
