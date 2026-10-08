import { validateQuestionDefinition, type DefinitionIssue, type QuestionDefinitionInput } from "@/lib/questions";
import type { FieldErrors } from "@/server/lib/errors";
import type { QuestionEditorData } from "./schemas";

/**
 * Pure rules of question authoring (§9, §27, §42). No I/O: unit tested in core.test.ts; the service wraps them with
 * database reads and writes.
 */

type EditorPart = QuestionEditorData["parts"][number];
type EditorSubPart = EditorPart["parts"][number];
type DefinitionSource = Pick<QuestionEditorData, "type" | "markingMode" | "marks" | "payload" | "answerSpec" | "options"> & {
  partLabel?: string | null;
  parts?: readonly (EditorPart | EditorSubPart)[];
};

/** The `validateQuestionDefinition` input of an editor document (recursively for parts). */
export function toDefinition(source: DefinitionSource): QuestionDefinitionInput {
  return {
    type: source.type,
    markingMode: source.markingMode,
    marks: source.marks,
    payload: source.payload ?? null,
    answerSpec: source.answerSpec ?? null,
    partLabel: source.partLabel ?? null,
    options: source.options.map((o) => ({ key: o.key, isCorrect: o.isCorrect })),
    parts: (source.parts ?? []).map((part) => toDefinition(part as DefinitionSource)),
  };
}

function sumMarks(parts: readonly { marks: number }[]): number {
  return parts.reduce((total, part) => total + part.marks, 0);
}

/**
 * Applies the structural rules the service maintains: a STRUCTURED question (and a STRUCTURED part) is worth the sum
 * of its parts and has no answer spec, payload or options; only STRUCTURED questions keep parts; only MCQs keep options.
 */
export function normaliseEditorDocument(input: QuestionEditorData): QuestionEditorData {
  // Sub-parts cannot be STRUCTURED themselves (validation reports it), so they only lose stray options.
  const normaliseSubPart = (part: EditorSubPart): EditorSubPart => ({ ...part, options: part.type === "MULTIPLE_CHOICE" ? part.options : [] });
  const normalisePart = (part: EditorPart): EditorPart => {
    const structured = part.type === "STRUCTURED";
    const children = structured ? part.parts.map(normaliseSubPart) : [];
    return {
      ...part,
      parts: children,
      options: part.type === "MULTIPLE_CHOICE" ? part.options : [],
      payload: structured ? null : part.payload,
      answerSpec: structured ? null : part.answerSpec,
      marks: structured && children.length > 0 ? sumMarks(children) : part.marks,
    };
  };
  const structured = input.type === "STRUCTURED";
  const parts = structured ? input.parts.map(normalisePart) : [];
  return {
    ...input,
    parts,
    options: input.type === "MULTIPLE_CHOICE" ? input.options : [],
    payload: structured ? null : input.payload,
    answerSpec: structured ? null : input.answerSpec,
    marks: structured && parts.length > 0 ? sumMarks(parts) : input.marks,
  };
}

/** Definition issues of an editor document, split by severity. */
export function definitionReport(input: QuestionEditorData): { errors: DefinitionIssue[]; warnings: DefinitionIssue[] } {
  const { issues } = validateQuestionDefinition(toDefinition(input));
  return { errors: issues.filter((i) => i.severity === "error"), warnings: issues.filter((i) => i.severity === "warning") };
}

/** Definition issues as dot-joined field errors (`answerSpec.accepted.0.value`, `_form` for whole-question ones). */
export function issuesToFieldErrors(issues: readonly DefinitionIssue[]): FieldErrors {
  const errors: FieldErrors = {};
  for (const issue of issues) {
    const key = issue.path.length > 0 ? issue.path.join(".") : "_form";
    const list = (errors[key] ??= []);
    if (!list.includes(issue.message)) list.push(issue.message);
  }
  return errors;
}

/**
 * Topic tags with exactly one primary tag per syllabus version (the topic a question's mastery counts towards): the
 * requested primary when there is one, else the first tag of that version. Duplicates are dropped (first wins).
 */
export function normaliseTopicTags(
  tags: readonly { topicId: string; isPrimary: boolean }[],
  syllabusOf: (topicId: string) => string | undefined,
): { topicId: string; syllabusId: string; isPrimary: boolean }[] {
  const seen = new Set<string>();
  const out: { topicId: string; syllabusId: string; isPrimary: boolean }[] = [];
  for (const tag of tags) {
    const topicId = tag.topicId.toLowerCase();
    const syllabusId = syllabusOf(topicId);
    if (seen.has(topicId) || syllabusId === undefined) continue;
    seen.add(topicId);
    out.push({ topicId, syllabusId, isPrimary: tag.isPrimary });
  }
  const bySyllabus = new Map<string, typeof out>();
  for (const tag of out) bySyllabus.set(tag.syllabusId, [...(bySyllabus.get(tag.syllabusId) ?? []), tag]);
  for (const group of bySyllabus.values()) {
    const primary = group.find((tag) => tag.isPrimary) ?? group[0];
    for (const tag of group) tag.isPrimary = tag === primary;
  }
  return out;
}

/** Re-exported from the zod-free module the browser-side editor imports directly. */
export { nextOptionKey } from "./option-keys";

/** One-line excerpt of authored text for lists (markdown symbols and maths delimiters trimmed, not rendered). */
export function plainExcerpt(source: string, max = 140): string {
  const text = source
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "\u0001")
    .replace(/\{\{blank:[^}]+\}\}/g, "\u0002")
    .replace(/[#*_`>~]|:::[a-z-]*(\{[^}]*\})?|\[|\]\([^)]*\)/g, "")
    .replace(/\u0001/g, "[image]")
    .replace(/\u0002/g, "___")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

export interface ProvenanceShape {
  copyrightStatus: string;
  sourceId: string | null;
  author: string | null;
}

/** Licensing problems that block review (§27): a cleared copyright status, and a source or author naming the origin. */
export function provenanceProblems(item: ProvenanceShape): FieldErrors {
  const errors: FieldErrors = {};
  if (item.copyrightStatus === "UNVERIFIED") {
    (errors.copyrightStatus ??= []).push("Clear the copyright status (original, licensed, public domain or open licence) before review.");
  }
  if (!item.sourceId && !(item.author && item.author.trim() !== "")) {
    (errors.sourceId ??= []).push("Name the content source or the author so reviewers can verify where this came from.");
  }
  return errors;
}

/** Merges field errors (pure). */
export function mergeFieldErrors(...parts: readonly FieldErrors[]): FieldErrors {
  const out: FieldErrors = {};
  for (const part of parts) {
    for (const [field, messages] of Object.entries(part)) {
      const list = (out[field] ??= []);
      for (const message of messages) if (!list.includes(message)) list.push(message);
    }
  }
  return out;
}
