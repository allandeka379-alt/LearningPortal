import { CONTENT_BLOCK_LABELS, CONTENT_BLOCK_TITLE_ATTRIBUTE, CONTENT_BLOCK_TYPES, type ContentBlockType } from "@/lib/content/blocks";

/**
 * Pure text-editing helpers behind the markdown toolbar (docs/CONTENT_AUTHORING.md): wrap the selection in a content
 * block, inline formatting or maths, or insert a snippet on its own lines. Isomorphic and unit tested; the editor only
 * applies the returned value and selection.
 */

export interface TextEdit {
  value: string;
  /** Selection to restore after the edit (selects the placeholder when one was inserted). */
  selectionStart: number;
  selectionEnd: number;
}

function clamp(value: string, start: number, end: number): [number, number] {
  const s = Math.max(0, Math.min(start, value.length));
  const e = Math.max(s, Math.min(end, value.length));
  return [s, e];
}

/** Text needed before `index` so the insertion starts on a fresh line separated by a blank line. */
function blockPrefix(value: string, index: number): string {
  const before = value.slice(0, index);
  if (before === "") return "";
  if (before.endsWith("\n\n")) return "";
  return before.endsWith("\n") ? "\n" : "\n\n";
}

/** Text needed after the insertion so following content starts after a blank line. */
function blockSuffix(value: string, index: number): string {
  const after = value.slice(index);
  if (after === "") return "\n";
  if (after.startsWith("\n\n")) return "";
  return after.startsWith("\n") ? "\n" : "\n\n";
}

/** Inserts `snippet` as its own block (blank lines around it); selects `select` within the snippet when given. */
export function insertBlockSnippet(value: string, start: number, end: number, snippet: string, select?: { from: number; to: number }): TextEdit {
  const [s, e] = clamp(value, start, end);
  const prefix = blockPrefix(value, s);
  const suffix = blockSuffix(value, e);
  const next = `${value.slice(0, s)}${prefix}${snippet}${suffix}${value.slice(e)}`;
  const base = s + prefix.length;
  return select
    ? { value: next, selectionStart: base + select.from, selectionEnd: base + select.to }
    : { value: next, selectionStart: base + snippet.length, selectionEnd: base + snippet.length };
}

/** The default title placeholder shown for a block's title attribute. */
const TITLE_PLACEHOLDERS: Readonly<Record<ContentBlockType, string>> = {
  definition: "Term",
  keyfact: "",
  example: "Title",
  "worked-solution": "",
  mistake: "",
  "exam-tip": "",
  note: "",
  formula: "Name of the formula",
  summary: "",
};

const BODY_PLACEHOLDERS: Readonly<Record<ContentBlockType, string>> = {
  definition: "Meaning of the term.",
  keyfact: "A fact to memorise.",
  example: "An illustrative example.",
  "worked-solution": "1. First step.\n2. Second step.\n3. Answer.",
  mistake: "The common mistake, and the correct way.",
  "exam-tip": "Exam technique advice.",
  note: "A side note.",
  formula: "$$\nA = \\pi r^2\n$$",
  summary: "- Key point one.\n- Key point two.",
};

/**
 * Wraps the selection (or a placeholder) in a content block: `:::definition{term="Term"}` … `:::`. The selection is
 * placed on the block's body; with no selection the body placeholder is selected for typing over.
 */
export function insertContentBlock(value: string, start: number, end: number, type: ContentBlockType): TextEdit {
  const [s, e] = clamp(value, start, end);
  const selected = value.slice(s, e).replace(/^\n+|\n+$/g, "");
  const attribute = CONTENT_BLOCK_TITLE_ATTRIBUTE[type];
  const titlePlaceholder = TITLE_PLACEHOLDERS[type];
  const head = titlePlaceholder ? `:::${type}{${attribute}="${titlePlaceholder}"}` : `:::${type}`;
  const body = selected !== "" ? selected : BODY_PLACEHOLDERS[type];
  const snippet = `${head}\n${body}\n:::`;
  const from = head.length + 1;
  return insertBlockSnippet(value, s, e, snippet, selected !== "" ? { from: snippet.length, to: snippet.length } : { from, to: from + body.length });
}

/** Wraps the selection in `before` / `after` (bold, italic, inline maths, code); selects the placeholder if empty. */
export function wrapSelection(value: string, start: number, end: number, before: string, after: string, placeholder: string): TextEdit {
  const [s, e] = clamp(value, start, end);
  const selected = value.slice(s, e);
  const inner = selected === "" ? placeholder : selected;
  const next = `${value.slice(0, s)}${before}${inner}${after}${value.slice(e)}`;
  const innerStart = s + before.length;
  return selected === ""
    ? { value: next, selectionStart: innerStart, selectionEnd: innerStart + inner.length }
    : { value: next, selectionStart: innerStart + inner.length + after.length, selectionEnd: innerStart + inner.length + after.length };
}

/** Display maths block (`$$` on their own lines) around the selection or a placeholder formula. */
export function insertDisplayMath(value: string, start: number, end: number): TextEdit {
  const [s, e] = clamp(value, start, end);
  const selected = value.slice(s, e).trim();
  const formula = selected !== "" ? selected : "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}";
  const snippet = `$$\n${formula}\n$$`;
  return insertBlockSnippet(value, s, e, snippet, selected !== "" ? undefined : { from: 3, to: 3 + formula.length });
}

/** A 2×2 GFM table skeleton. */
export function insertTable(value: string, start: number, end: number): TextEdit {
  const snippet = "| Quantity | Symbol | Unit |\n| -------- | :----: | ---: |\n| Force    | $F$    | N    |";
  return insertBlockSnippet(value, start, end, snippet, { from: 2, to: 10 });
}

/** A section heading (`## `) on its own line. */
export function insertHeading(value: string, start: number, end: number, level: 2 | 3 = 2): TextEdit {
  const [s, e] = clamp(value, start, end);
  const selected = value.slice(s, e).replace(/\n+/g, " ").trim();
  const text = selected !== "" ? selected : "Section title";
  const hashes = "#".repeat(level);
  return insertBlockSnippet(value, s, e, `${hashes} ${text}`, selected !== "" ? undefined : { from: level + 1, to: level + 1 + text.length });
}

/** Bulleted list from the selected lines (or a two-item placeholder). */
export function insertList(value: string, start: number, end: number, ordered = false): TextEdit {
  const [s, e] = clamp(value, start, end);
  const lines = value.slice(s, e).split("\n").map((line) => line.trim()).filter(Boolean);
  const items = lines.length > 0 ? lines : ["First point", "Second point"];
  const snippet = items.map((item, index) => `${ordered ? `${index + 1}.` : "-"} ${item.replace(/^([-*]|\d+\.)\s+/, "")}`).join("\n");
  return insertBlockSnippet(value, s, e, snippet);
}

/** `snippet` (e.g. an image reference) inserted as its own paragraph. */
export function insertParagraph(value: string, start: number, end: number, snippet: string): TextEdit {
  return insertBlockSnippet(value, start, end, snippet);
}

/** Toolbar entries for the content blocks, in the authoring guide's order. */
export const BLOCK_TOOLBAR: readonly { type: ContentBlockType; label: string }[] = CONTENT_BLOCK_TYPES.map((type) => ({ type, label: CONTENT_BLOCK_LABELS[type] }));

/** Character offset of the start of 1-based `line` in `value` (for "jump to warning"). */
export function offsetOfLine(value: string, line: number): number {
  if (line <= 1) return 0;
  let offset = 0;
  for (let current = 1; current < line; current += 1) {
    const next = value.indexOf("\n", offset);
    if (next === -1) return value.length;
    offset = next + 1;
  }
  return offset;
}
