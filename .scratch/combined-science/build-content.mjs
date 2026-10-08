// Writes combined-science-o questions and flashcards from the slice modules. Lessons are authored directly as Markdown.
// Run from the repo root: node .scratch/combined-science/build-content.mjs [slice-name ...]
import { mkdirSync, writeFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { allModules } from "./lib.mjs";

const SLICES_DIR = fileURLToPath(new URL("./slices/", import.meta.url));
const only = process.argv.slice(2);
const files = readdirSync(SLICES_DIR).filter((f) => f.endsWith(".mjs") && (only.length === 0 || only.some((o) => f.includes(o)))).sort();
for (const f of files) await import(pathToFileURL(join(SLICES_DIR, f)).href);

const ROOT = "content/subjects/combined-science-o";
let qCount = 0;
let cCount = 0;
const seenKeys = new Set();
for (const m of allModules()) {
  for (const item of [...m.questions, ...m.cards]) {
    if (seenKeys.has(item.key)) throw new Error(`duplicate key ${item.key}`);
    seenKeys.add(item.key);
  }
  if (m.questions.length) {
    const path = join(ROOT, "questions", `${m.file}.json`);
    mkdirSync(dirname(path), { recursive: true });
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
console.log(`\n${files.length} slice file(s): ${qCount} questions, ${cCount} flashcards.`);
