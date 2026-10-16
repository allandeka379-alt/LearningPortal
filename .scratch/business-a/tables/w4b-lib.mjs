// W4b helpers for slices and lesson-writing scripts.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

/** Shorthand MCQ: ok = [content, rationale]; bad = three [content, rationale]. Key placed first (the build rebalances). */
export function mc(b, { ok, bad, ...rest }) {
  if (bad.length !== 3) throw new Error("mc needs three distractors: " + rest.stem);
  return b.mcq({ ...rest, options: [ok, ...bad], answer: "A" });
}

/** Money in Markdown / slice strings: US\$ (backslash then dollar). */
export const D = "US\\$";

const ROOT = fileURLToPath(new URL("../../../content/subjects/business-a/lessons/", import.meta.url));

/** Writes a lesson file: lesson("finance/break-even", { key, title, summary, concept, minutes, free }, bodyMarkdown). */
export function lesson(path, { key, title, summary, concept, minutes, free = false }, body) {
  const fm = { key, title, summary, concepts: [concept], estimatedMinutes: minutes, level: "core" };
  if (free) fm.freePreview = true;
  const file = `${ROOT}${path}.md`;
  mkdirSync(dirname(file), { recursive: true });
  // lib.cashFlowDirect prints a bare "US$" column heading: normalise any bare US$ to US\$
  const text = `---\n${JSON.stringify(fm, null, 2)}\n---\n${body.trim()}\n`.replace(/(?<!\\)US\$/g, () => "US\\$");
  if (/(?<!\\)\$\d/.test(text.replace(/US\\\$/g, ""))) throw new Error(`${path}: bare $ before a number`);
  writeFileSync(file, text);
  const words = body.replace(/^\|.*$/gm, "").replace(/[:#*|\-]/g, " ").split(/\s+/).filter(Boolean).length;
  console.log(`${path}: ${words} words (excluding tables)`);
}
