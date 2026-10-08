/**
 * Pedagogical content blocks (§8): the container directives authors can use in lessons, question explanations and
 * worked solutions, e.g.
 *
 * ```md
 * :::definition{term="Photosynthesis"}
 * The process by which green plants make glucose from carbon dioxide and water using light energy.
 * :::
 * ```
 *
 * Isomorphic: the server renderer (`src/server/content/render.ts`) and client-side authoring UI (CMS toolbar,
 * syntax cheat-sheet) share this single list, so a new block type is added in exactly one place.
 */

export const CONTENT_BLOCK_TYPES = [
  "definition",
  "keyfact",
  "example",
  "worked-solution",
  "mistake",
  "exam-tip",
  "note",
  "formula",
  "summary",
] as const;

export type ContentBlockType = (typeof CONTENT_BLOCK_TYPES)[number];

const BLOCK_TYPE_SET: ReadonlySet<string> = new Set(CONTENT_BLOCK_TYPES);

/** Type guard for directive names coming from authored markdown. Names are case-sensitive (`:::note`, not `:::Note`). */
export function isContentBlockType(name: string): name is ContentBlockType {
  return BLOCK_TYPE_SET.has(name);
}

/** Visible (and screen-reader) label rendered as the block's heading. UI copy, not content. */
export const CONTENT_BLOCK_LABELS: Readonly<Record<ContentBlockType, string>> = {
  definition: "Definition",
  keyfact: "Key fact",
  example: "Example",
  "worked-solution": "Worked solution",
  mistake: "Common mistake",
  "exam-tip": "Exam tip",
  note: "Note",
  formula: "Formula",
  summary: "Summary",
};

/**
 * The single directive attribute each block accepts as its title, e.g. `:::definition{term="Osmosis"}`,
 * `:::formula{name="Quadratic formula"}`, `:::example{title="Simultaneous equations"}`. Any other attribute is
 * ignored (and reported as an authoring warning). A directive label (`:::example[Title with $math$]`) can be used
 * instead and takes precedence because it supports inline formatting and math.
 */
export const CONTENT_BLOCK_TITLE_ATTRIBUTE: Readonly<Record<ContentBlockType, "term" | "name" | "title">> = {
  definition: "term",
  keyfact: "title",
  example: "title",
  "worked-solution": "title",
  mistake: "title",
  "exam-tip": "title",
  note: "title",
  formula: "name",
  summary: "title",
};
