// Shared helper for the W1a lesson scripts: writes a lesson file with JSON front matter and prints a word count.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const ROOT = fileURLToPath(new URL("../../../content/subjects/geography-a/lessons/", import.meta.url));
export function writeLesson(area, name, fm, body) {
  const front = { key: `${area}.${name}`, title: fm.title, summary: fm.summary, concepts: [`ageo.${area}.${name}`], estimatedMinutes: fm.minutes, ...(fm.free ? { freePreview: true } : {}), level: "core" };
  const text = `---\n${JSON.stringify(front, null, 2)}\n---\n${body.trim()}\n`;
  const path = join(ROOT, area, `${name}.md`);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, text);
  const words = body.split("\n").filter((l) => !l.startsWith("|") && !l.startsWith(":::")).join(" ").replace(/\$[^$]*\$/g, " x ").split(/\s+/).filter(Boolean).length;
  console.log(`${area}/${name}: ${words} words (excl. tables)`);
}
