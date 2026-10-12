// Lesson writer for W1a: writes content/subjects/computer-science-a/lessons/<key as path>.md and checks the word count
// (code blocks, tables and directive markers excluded).
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../../../content/subjects/computer-science-a/lessons/", import.meta.url));

export function writeLesson({ key, title, summary, concept, minutes, free = false }, body) {
  const front = { key, title, summary, concepts: [concept], estimatedMinutes: minutes, level: "core" };
  if (free) front.freePreview = true;
  const text = `---\n${JSON.stringify(front, null, 2)}\n---\n${body.trim()}\n`;
  const prose = body
    .replace(/```[\s\S]*?```/g, " ")
    .split("\n")
    .filter((l) => !l.trim().startsWith("|") && !/^:::/.test(l.trim()))
    .join(" ");
  const words = prose.split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length;
  const path = join(ROOT, `${key.replace(".", "/")}.md`);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, text);
  console.log(`${key}: ${words} words -> ${path}`);
  if (words < 900 || words > 1600) console.log(`  WARNING: ${words} words outside 900-1600`);
  return words;
}
