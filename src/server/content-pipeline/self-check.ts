/**
 * Advisory self-checks for authored content (pure; `npm run content:check`). They catch the defects the independent
 * reviews of the first families found most often and the validator cannot prove wrong:
 *
 * - LESSON_REUSE: a question whose stem shares two or more distinctive numbers with one block (worked example, mistake,
 *   tip, paragraph) of a lesson on one of its concepts — practice that repeats the lesson (docs/CONTENT_PIPELINE.md
 *   §11.3; about 600 such questions were rewritten in mathematics-o).
 * - QUESTION_REUSE: two questions of the same concept whose stems share two or more distinctive numbers.
 * - UNBALANCED_MATH: a rendered field with an odd number of unescaped `$` (a missing delimiter shows students a literal
 *   dollar sign; KaTeX reports no error for it). Currency is written `US\$`.
 *
 * Findings are leads for a human or reviewer, not proof: a shared number can be a coincidence (a tax-band table
 * reused on purpose), so the CLI never fails a build unless asked to.
 */

export type SelfCheckKind = "LESSON_REUSE" | "QUESTION_REUSE" | "UNBALANCED_MATH";

export interface SelfCheckFinding {
  kind: SelfCheckKind;
  file: string;
  /** Item key (question / flashcard / assessment) or the lesson key. */
  key: string;
  detail: string;
}

export interface CheckLesson {
  file: string;
  key: string;
  concepts: readonly string[];
  body: string;
}

export interface CheckItem {
  file: string;
  key: string;
  concepts: readonly string[];
  data: unknown;
}

/**
 * Numbers too common to signal reuse: small counts, round values, angle and time constants, recent years, and physical
 * constants that questions are given as data (g, the densities of water and mercury, the speed of light).
 */
const TRIVIAL_NUMBERS = new Set([
  ...Array.from({ length: 13 }, (_, n) => String(n)),
  "15", "20", "25", "30", "40", "45", "50", "60", "75", "90", "100", "180", "270", "360", "1000", "3600", "10000",
  "100000", "1000000", "0.5", "0.1", "0.25", "2023", "2024", "2025", "2026", "2027",
  "9.8", "9.81", "13600", "273", "3.0", "4200",
]);

/** The distinctive numbers of a text (LaTeX commands and thousands separators normalised; powers of ten dropped). */
export function distinctiveNumbers(text: string): Set<string> {
  const cleaned = text
    // The exponent in "× 10^{-18}" or "10^24" gives the size of a number; it is not a data value.
    .replace(/10\s*\^\s*\{?\s*[-−+]?\s*\d+\s*\}?/g, " ")
    .replace(/\\[a-zA-Z]+/g, " ")
    .replace(/(\d)\\,(\d)/g, "$1$2")
    .replace(/(\d)[ ,](\d{3})(?!\d)/g, "$1$2");
  const found = cleaned.match(/\d+(?:\.\d+)?/g) ?? [];
  return new Set(found.map((n) => n.replace(/^0+(?=\d)/, "")).filter((n) => !TRIVIAL_NUMBERS.has(n)));
}

/**
 * Lesson blocks: split before every opening directive (`:::name`) and heading (a closing `:::` stays with its block),
 * keeping blocks with at least `min` numbers.
 */
export function lessonBlocks(body: string, min = 2): { label: string; numbers: Set<string> }[] {
  return body
    .split(/\n(?=:::[a-zA-Z]|#{2,6} )/)
    .map((block) => ({ label: block.trim().split("\n")[0]?.slice(0, 70) ?? "", numbers: distinctiveNumbers(block) }))
    .filter((block) => block.numbers.size >= min);
}

/**
 * Fields whose strings are rendered as Markdown + maths, wherever they sit (payload `template`, matching `content`,
 * true/false feedback, essay mark schemes, ...). Everything else is data: `answerPrefix` / `unitHint` are plain text,
 * accepted answers and responses are compared by the engine.
 */
const RENDERED_FIELDS = new Set([
  "stem", "content", "rationale", "explanation", "workedSolution", "conceptSummary", "hints", "front", "back", "notes",
  "title", "description", "instructions", "text", "template", "feedback", "feedbackTrue", "feedbackFalse", "modelAnswer",
  "markingNotes", "markScheme", "descriptor",
]);

/** Count of `$` not escaped by a backslash. */
export function unescapedDollarCount(text: string): number {
  let count = 0;
  for (let i = 0; i < text.length; i += 1) {
    if (text[i] !== "$") continue;
    let backslashes = 0;
    for (let j = i - 1; j >= 0 && text[j] === "\\"; j -= 1) backslashes += 1;
    if (backslashes % 2 === 0) count += 1;
  }
  return count;
}

/** Rendered strings of an item with their JSON paths (`stem`, `options[2].content`, `parts[0].hints[1]`, ...). */
export function renderedStrings(value: unknown, path = "", inRendered = false): { path: string; text: string }[] {
  if (typeof value === "string") return inRendered ? [{ path, text: value }] : [];
  if (Array.isArray(value)) return value.flatMap((entry, index) => renderedStrings(entry, `${path}[${index}]`, inRendered));
  if (value !== null && typeof value === "object") {
    return Object.entries(value as Record<string, unknown>).flatMap(([key, entry]) =>
      // Responses are data the engine compares, never shown as Markdown.
      key === "modelResponse" || key === "wrongResponses"
        ? []
        : renderedStrings(entry, path ? `${path}.${key}` : key, RENDERED_FIELDS.has(key) || (inRendered && key !== "id" && key !== "key")),
    );
  }
  return [];
}

/** Stem text of a question including every part's stem (recursively). */
function questionStems(data: unknown): string {
  if (data === null || typeof data !== "object") return "";
  const record = data as { stem?: unknown; parts?: unknown };
  const own = typeof record.stem === "string" ? record.stem : "";
  const parts = Array.isArray(record.parts) ? record.parts.map(questionStems).join(" ") : "";
  return `${own} ${parts}`;
}

function shared(a: ReadonlySet<string>, b: ReadonlySet<string>): string[] {
  return [...a].filter((n) => b.has(n));
}

export function selfCheck(input: {
  lessons: readonly CheckLesson[];
  questions: readonly CheckItem[];
  others?: readonly CheckItem[];
  minShared?: number;
}): SelfCheckFinding[] {
  const minShared = input.minShared ?? 2;
  const findings: SelfCheckFinding[] = [];

  // Lesson blocks by concept.
  const blocksByConcept = new Map<string, { lesson: CheckLesson; label: string; numbers: Set<string> }[]>();
  for (const lesson of input.lessons) {
    const blocks = lessonBlocks(lesson.body, minShared);
    for (const concept of lesson.concepts) {
      const list = blocksByConcept.get(concept) ?? [];
      list.push(...blocks.map((block) => ({ lesson, ...block })));
      blocksByConcept.set(concept, list);
    }
  }

  const stems = input.questions.map((question) => ({ question, numbers: distinctiveNumbers(questionStems(question.data)) }));
  for (const { question, numbers } of stems) {
    if (numbers.size < minShared) continue;
    const seen = new Set<string>();
    for (const concept of question.concepts) {
      for (const block of blocksByConcept.get(concept) ?? []) {
        const common = shared(numbers, block.numbers);
        const id = `${block.lesson.key}|${block.label}`;
        if (common.length >= minShared && !seen.has(id)) {
          seen.add(id);
          findings.push({
            kind: "LESSON_REUSE",
            file: question.file,
            key: question.key,
            detail: `shares ${common.join(", ")} with lesson ${block.lesson.key}: "${block.label}"`,
          });
        }
      }
    }
  }

  // Question pairs of a shared concept.
  const byConcept = new Map<string, typeof stems>();
  for (const entry of stems) {
    if (entry.numbers.size < minShared) continue;
    for (const concept of entry.question.concepts) byConcept.set(concept, [...(byConcept.get(concept) ?? []), entry]);
  }
  const reported = new Set<string>();
  for (const list of byConcept.values()) {
    for (let i = 0; i < list.length; i += 1) {
      for (let j = i + 1; j < list.length; j += 1) {
        const a = list[i]!;
        const b = list[j]!;
        const pair = [a.question.key, b.question.key].sort().join("|");
        if (reported.has(pair)) continue;
        const common = shared(a.numbers, b.numbers);
        if (common.length >= minShared) {
          reported.add(pair);
          findings.push({ kind: "QUESTION_REUSE", file: a.question.file, key: a.question.key, detail: `shares ${common.join(", ")} with ${b.question.key}` });
        }
      }
    }
  }

  // Maths delimiters.
  for (const lesson of input.lessons) {
    lesson.body.split("\n").forEach((line, index) => {
      const withoutDisplay = line.replace(/\$\$/g, "");
      if (unescapedDollarCount(withoutDisplay) % 2 === 1) {
        findings.push({ kind: "UNBALANCED_MATH", file: lesson.file, key: lesson.key, detail: `body line ${index + 1}: ${line.trim().slice(0, 90)}` });
      }
    });
  }
  for (const item of [...input.questions, ...(input.others ?? [])]) {
    for (const { path, text } of renderedStrings(item.data)) {
      if (unescapedDollarCount(text.replace(/\$\$/g, "")) % 2 === 1) {
        findings.push({ kind: "UNBALANCED_MATH", file: item.file, key: item.key, detail: `${path}: ${text.slice(0, 90)}` });
      }
    }
  }
  return findings;
}
