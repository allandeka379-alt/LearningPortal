// W1a helpers shared by the W1a slices and lesson generators (not imported by the build itself except through slices).
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { E as OPTION_EDITS } from "./w1a-option-edits.mjs";
import { fileURLToPath } from "node:url";

export const ROOT = fileURLToPath(new URL("../../../content/subjects/accounting-a/", import.meta.url));

/** Shorthand MCQ: ok = [content, rationale]; bad = [[content, rationale] x3]. Key is placed first (the build rebalances). */
const EDIT_MAP = new Map(OPTION_EDITS);
const edit = ([content, rationale]) => [EDIT_MAP.get(content) ?? content, rationale];
export function mc(b, { ok, bad, ...rest }) {
  if (bad.length !== 3) throw new Error("mc needs three distractors: " + rest.stem);
  ok = edit(ok);
  bad = bad.map(edit);
  return b.mcq({ ...rest, options: [ok, ...bad], answer: "A" });
}

/** Writes a lesson file: front matter JSON + body. Counts words outside tables and blocks' syntax. */
export function writeLesson(relPath, front, body) {
  const path = ROOT + "lessons/" + relPath;
  mkdirSync(dirname(path), { recursive: true });
  const text = "---\n" + JSON.stringify(front, null, 2) + "\n---\n" + body.trim() + "\n";
  writeFileSync(path, text);
  const words = body
    .split("\n")
    .filter((l) => !l.startsWith("|") && !l.startsWith(":::"))
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  console.log(`${relPath}: ${words} words (excluding tables)`);
  return words;
}

import { tAccount, fmt } from "../lib.mjs";
/**
 * T account whose two sides are already complete (closing balance entered explicitly): shows totals and, below them,
 * the brought-down balance. bd: { side: "dr" | "cr", date, details, amount }.
 */
export function tAcct(title, dr, cr, bd) {
  const md = tAccount(title, dr, cr, { balance: "auto" });
  if (!bd) return md;
  const cells = bd.side === "dr" ? [bd.date, bd.details, fmt(bd.amount), "", "", ""] : ["", "", "", bd.date, bd.details, fmt(bd.amount)];
  return md + "\n| " + cells.join(" | ") + " |";
}
