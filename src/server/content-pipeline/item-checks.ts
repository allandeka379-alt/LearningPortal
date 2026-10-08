import { BLANK_PLACEHOLDER, OPEN_RESPONSE_TYPES, validateQuestionDefinition } from "@/lib/questions";
import { markResponse } from "@/server/marking/mark";
import type { MarkingResult, PartMarking } from "@/server/marking/types";
import { renderContent, type AssetResolver, type RenderOptions } from "@/server/content/render";
import type { RenderedContent } from "@/lib/content/types";
import type { Issue } from "./issues";
import {
  defaultMarkingMode,
  leafParts,
  markingInput,
  questionDefinition,
  rewriteMedia,
  toEngineResponse,
  type MediaIdResolver,
} from "./question-model";
import type { FlashcardSource, LessonFrontMatter, QuestionPart, QuestionSource } from "./schemas";

/**
 * The EXPENSIVE per-item checks of the validator (render every Markdown field with the real content pipeline, mark
 * the model / wrong responses with the real marking engine). Pure apart from the renderer's in-process cache, so the
 * validator can cache their results on disk per item hash. Each returns item-relative issues (no file).
 */

export type ItemIssue = Omit<Issue, "file">;

/** Must equal LESSON_RENDER_OPTIONS in src/server/content/service.ts (that module needs a database client). */
export const LESSON_OPTIONS: RenderOptions = { mode: "block", baseHeadingLevel: 2 };
/** Question fields and flashcard sides (renderQuestionHtml / renderFlashcardHtml). */
export const FIELD_OPTIONS: RenderOptions = { mode: "block", baseHeadingLevel: 3 };
export const INLINE_OPTIONS: RenderOptions = { mode: "inline" };

export interface CheckContext {
  key: string;
  resolveMedia: MediaIdResolver;
  resolveAsset: AssetResolver;
}

function render(source: string, options: RenderOptions, ctx: CheckContext): RenderedContent {
  return renderContent(rewriteMedia(source, ctx.resolveMedia), { ...options, resolveAsset: ctx.resolveAsset });
}

/** Every renderer warning is an error in source content (§43 alt text, unknown blocks, raw HTML, LaTeX errors…). */
export function renderProblems(source: string | null | undefined, field: string, options: RenderOptions, ctx: CheckContext, lineOffset = 0): ItemIssue[] {
  if (source === null || source === undefined || source.trim() === "") return [];
  const rendered = render(source, options, ctx);
  const out: ItemIssue[] = rendered.warnings.map((warning) => ({
    key: ctx.key,
    field,
    ...(warning.line !== undefined && lineOffset > 0 ? { line: warning.line + lineOffset } : {}),
    severity: "error",
    code: `render:${warning.code}`,
    message: warning.line !== undefined && lineOffset === 0 ? `Line ${warning.line}: ${warning.message}` : warning.message,
  }));
  if (rendered.html.includes("katex-error") && !rendered.warnings.some((w) => w.code === "math-error")) {
    out.push({ key: ctx.key, field, severity: "error", code: "render:math-error", message: "KaTeX could not render an expression (katex-error in the output)." });
  }
  return out;
}

// =====================================================================================================================
// Lessons
// =====================================================================================================================

const MIN_LESSON_WORDS = 250;

function wordCount(text: string): number {
  return text.split(/\s+/).filter((word) => /[A-Za-z0-9]/.test(word)).length;
}

export function lessonChecks(front: LessonFrontMatter, body: string, bodyLine: number, ctx: CheckContext): ItemIssue[] {
  const issues: ItemIssue[] = [];
  const offset = bodyLine - 1;
  if (/^::question\b/m.test(body)) {
    issues.push({ key: ctx.key, field: "body", severity: "error", code: "lesson-embed", message: "::question embeds are not supported in source lessons (question ids do not exist yet)." });
  }
  const rendered = render(body, LESSON_OPTIONS, ctx);
  for (const warning of rendered.warnings) {
    issues.push({
      key: ctx.key,
      field: "body",
      ...(warning.line !== undefined ? { line: warning.line + offset } : {}),
      severity: "error",
      code: `render:${warning.code}`,
      message: warning.message,
    });
  }
  if (rendered.html.includes("katex-error") && !rendered.warnings.some((w) => w.code === "math-error")) {
    issues.push({ key: ctx.key, field: "body", severity: "error", code: "render:math-error", message: "KaTeX could not render an expression (katex-error in the output)." });
  }
  issues.push(...renderProblems(front.summary, "summary", INLINE_OPTIONS, ctx));

  // Structure of the lesson template (docs/CONTENT_PIPELINE.md "Lesson template"): advisory.
  const lines = body.split("\n");
  const h1 = lines.findIndex((line) => /^#\s/.test(line));
  if (h1 !== -1) {
    issues.push({ key: ctx.key, field: "body", line: h1 + 1 + offset, severity: "warning", code: "lesson-heading", message: "Start headings at ## (the page shows the title as the main heading)." });
  }
  const blocks = new Set(rendered.blocks);
  const want: [string, boolean][] = [
    ["a :::definition block (key definitions)", blocks.has("definition")],
    ["a :::worked-solution or :::example block (worked examples)", blocks.has("worked-solution") || blocks.has("example")],
    ["a :::mistake block (common mistakes)", blocks.has("mistake")],
    ["an :::exam-tip block (exam tips)", blocks.has("exam-tip")],
    ["a :::summary block (summary)", blocks.has("summary")],
  ];
  const missing = want.filter(([, present]) => !present).map(([label]) => label);
  if (missing.length > 0) {
    issues.push({ key: ctx.key, field: "body", severity: "warning", code: "lesson-structure", message: `The lesson template expects ${missing.join(", ")}.` });
  }
  const words = wordCount(rendered.plainText);
  if (words < MIN_LESSON_WORDS) {
    issues.push({ key: ctx.key, field: "body", severity: "warning", code: "lesson-length", message: `Only ${words} words: a complete lesson is usually 600-1,600 words.` });
  }
  const perMinute = words / front.estimatedMinutes;
  if (perMinute > 250 || perMinute < 20) {
    issues.push({ key: ctx.key, field: "estimatedMinutes", severity: "warning", code: "lesson-time", message: `${front.estimatedMinutes} minutes for ${words} words looks wrong (study pace is about 60-150 words a minute including the examples).` });
  }
  return issues;
}

// =====================================================================================================================
// Flashcards
// =====================================================================================================================

function normaliseText(text: string): string {
  return text.replace(/\s+/g, " ").trim().toLowerCase();
}

export function flashcardChecks(card: FlashcardSource, ctx: CheckContext): ItemIssue[] {
  const issues: ItemIssue[] = [
    ...renderProblems(card.front, "front", FIELD_OPTIONS, ctx),
    ...renderProblems(card.back, "back", FIELD_OPTIONS, ctx),
    ...renderProblems(card.notes, "notes", FIELD_OPTIONS, ctx),
  ];
  if (normaliseText(card.front) === normaliseText(card.back)) {
    issues.push({ key: ctx.key, field: "back", severity: "error", code: "flashcard-same", message: "The front and back of the card are the same." });
  }
  if (card.front.length > 400) issues.push({ key: ctx.key, field: "front", severity: "warning", code: "flashcard-long", message: "Keep the front short (one prompt that fits a phone screen)." });
  return issues;
}

// =====================================================================================================================
// Questions
// =====================================================================================================================

function markdownFields(node: QuestionSource | QuestionPart, prefix: string): [string, string | null | undefined, RenderOptions][] {
  const out: [string, string | null | undefined, RenderOptions][] = [
    [`${prefix}stem`, node.stem, FIELD_OPTIONS],
    [`${prefix}explanation`, node.explanation, FIELD_OPTIONS],
    [`${prefix}workedSolution`, node.workedSolution, FIELD_OPTIONS],
    ...node.hints.map((hint, i): [string, string, RenderOptions] => [`${prefix}hints.${i}`, hint, FIELD_OPTIONS]),
    ...node.options.flatMap((option): [string, string | undefined, RenderOptions][] => [
      [`${prefix}options.${option.key}.content`, option.content, INLINE_OPTIONS],
      [`${prefix}options.${option.key}.rationale`, option.rationale, FIELD_OPTIONS],
    ]),
  ];
  const payload = node.payload ?? {};
  const spec = node.answerSpec ?? {};
  const list = (value: unknown): Record<string, unknown>[] => (Array.isArray(value) ? value.filter((v): v is Record<string, unknown> => typeof v === "object" && v !== null) : []);
  const text = (value: unknown): string | null => (typeof value === "string" ? value : null);
  if (node.type === "MATCHING") {
    for (const side of ["left", "right"] as const) {
      for (const item of list(payload[side])) out.push([`${prefix}payload.${side}.${String(item.id)}`, text(item.content), INLINE_OPTIONS]);
    }
  }
  if (node.type === "DIAGRAM_LABELLING") {
    for (const label of list(payload.labels)) out.push([`${prefix}payload.labels.${String(label.id)}`, text(label.text), INLINE_OPTIONS]);
  }
  if (node.type === "TRUE_FALSE") {
    out.push([`${prefix}answerSpec.feedbackTrue`, text(spec.feedbackTrue), FIELD_OPTIONS], [`${prefix}answerSpec.feedbackFalse`, text(spec.feedbackFalse), FIELD_OPTIONS]);
  }
  out.push([`${prefix}answerSpec.modelAnswer`, text(spec.modelAnswer), FIELD_OPTIONS], [`${prefix}answerSpec.markingNotes`, text(spec.markingNotes), FIELD_OPTIONS]);
  const scheme = typeof spec.markScheme === "object" && spec.markScheme !== null ? (spec.markScheme as Record<string, unknown>) : {};
  for (const point of list(scheme.points)) out.push([`${prefix}answerSpec.markScheme.points.${String(point.id)}`, text(point.description), INLINE_OPTIONS]);
  for (const point of list(spec.methodMarks)) out.push([`${prefix}answerSpec.methodMarks.${String(point.id)}`, text(point.description), INLINE_OPTIONS]);
  return out;
}

/** FILL_IN_THE_BLANK templates are shown as inline-rendered pieces between the blanks (src/server/practice/present.ts). */
function templateProblems(node: QuestionSource | QuestionPart, prefix: string, ctx: CheckContext): ItemIssue[] {
  if (node.type !== "FILL_IN_THE_BLANK" || typeof node.payload?.template !== "string") return [];
  const issues: ItemIssue[] = [];
  const template = node.payload.template;
  for (const paragraph of template.split(/\n[ \t]*\n/)) {
    const pieces = paragraph.split(new RegExp(BLANK_PLACEHOLDER.source, "g")).filter((_, i) => i % 2 === 0);
    for (const piece of pieces) {
      if ((piece.match(/(?<!\\)\$/g)?.length ?? 0) % 2 === 1) {
        issues.push({ key: ctx.key, field: `${prefix}payload.template`, severity: "error", code: "blank-in-math", message: "A blank sits inside maths or the $ signs are unbalanced: keep {{blank:id}} in plain prose." });
      }
      issues.push(...renderProblems(piece.trim(), `${prefix}payload.template`, INLINE_OPTIONS, ctx));
    }
  }
  return issues;
}

function describe(result: MarkingResult): string {
  return `${result.marksAwarded}/${result.maxMarks} (${result.status}${result.feedback.flags.length > 0 ? `: ${result.feedback.flags.join(", ")}` : ""})`;
}

/** Leaf part results of a structured result, keyed by label path. */
function leafResults(perPart: readonly PartMarking[] | undefined, prefix = ""): Map<string, MarkingResult> {
  const out = new Map<string, MarkingResult>();
  for (const part of perPart ?? []) {
    const label = `${prefix}${part.partLabel ?? ""}`;
    if (part.type === "STRUCTURED") for (const [k, v] of leafResults(part.result.feedback.perPart, label)) out.set(k, v);
    else out.set(label, part.result);
  }
  return out;
}

function isAuto(markingMode: string, type: string): boolean {
  return markingMode === "AUTO" && !OPEN_RESPONSE_TYPES.has(type as never);
}

/** Model and wrong responses, marked by the real engine. */
function responseProblems(question: QuestionSource, ctx: CheckContext): ItemIssue[] {
  const issues: ItemIssue[] = [];
  const mode = question.markingMode ?? defaultMarkingMode(question.type);
  const structured = question.type === "STRUCTURED";
  const leaves = structured ? leafParts(question) : [];
  const autoLeaves = leaves.filter((leaf) => isAuto(leaf.markingMode, leaf.part.type));
  const autoMarked = structured ? autoLeaves.length > 0 : isAuto(mode, question.type);
  const add = (field: string, code: string, message: string, severity: "error" | "warning" = "error") => issues.push({ key: ctx.key, field, severity, code, message });

  if (question.modelResponse === undefined) {
    if (autoMarked) add("modelResponse", "model-response-missing", "Give a modelResponse: a response that scores full marks (it proves the answer key).");
  } else if (autoMarked) {
    const converted = toEngineResponse(question, question.modelResponse);
    if (converted.problem) add("modelResponse", "model-response-shape", converted.problem);
    else {
      const result = markResponse(markingInput(question, converted.response, ctx.resolveMedia));
      if (!structured) {
        if (result.status !== "MARKED" || result.marksAwarded !== question.marks) {
          add("modelResponse", "model-response-score", `The modelResponse scores ${describe(result)}; it must score full marks (${question.marks}) when marked automatically.`);
        }
      } else {
        const results = leafResults(result.feedback.perPart);
        for (const leaf of autoLeaves) {
          const part = results.get(leaf.labelPath);
          if (!part || part.status !== "MARKED" || part.marksAwarded !== leaf.part.marks) {
            add(`modelResponse.parts.${leaf.labelPath}`, "model-response-score", `Part ${leaf.labelPath} of the modelResponse scores ${part ? describe(part) : "nothing (not answered)"}; it must score full marks (${leaf.part.marks}).`);
          }
        }
      }
    }
  } else {
    add("modelResponse", "model-response-unused", "This question is marked by a person (MANUAL), so the modelResponse is not checked: put the exemplar in answerSpec.modelAnswer.", "warning");
  }

  question.wrongResponses.forEach((wrong, index) => {
    const field = `wrongResponses.${index}`;
    if (!autoMarked) {
      add(field, "wrong-response-unused", "Wrong responses are only checked for automatically marked questions.", "warning");
      return;
    }
    const converted = toEngineResponse(question, wrong);
    if (converted.problem) {
      add(field, "wrong-response-shape", converted.problem);
      return;
    }
    const result = markResponse(markingInput(question, converted.response, ctx.resolveMedia));
    if (!structured) {
      if (result.feedback.flags.includes("RESPONSE_INVALID") || result.feedback.flags.includes("RESPONSE_TYPE_MISMATCH")) {
        add(field, "wrong-response-shape", `Not a valid ${question.type} response (${result.feedback.flags.join(", ")}).`);
      } else if (result.status !== "MARKED" && result.status !== "UNANSWERED") {
        add(field, "wrong-response-score", `Wrong response ${index + 1} cannot be marked automatically: ${describe(result)}.`);
      } else if (result.marksAwarded >= question.marks) {
        add(field, "wrong-response-score", `Wrong response ${index + 1} scores full marks (${describe(result)}): the marking spec accepts it.`);
      }
    } else {
      const results = leafResults(result.feedback.perPart);
      let awarded = 0;
      let max = 0;
      for (const leaf of autoLeaves) {
        max += leaf.part.marks;
        awarded += results.get(leaf.labelPath)?.marksAwarded ?? 0;
      }
      if (awarded >= max) add(field, "wrong-response-score", `Wrong response ${index + 1} scores full marks on the automatically marked parts (${awarded}/${max}).`);
    }
  });
  return issues;
}

function typeRules(question: QuestionSource, ctx: CheckContext): ItemIssue[] {
  const issues: ItemIssue[] = [];
  const add = (field: string, code: string, message: string, severity: "error" | "warning" = "error") => issues.push({ key: ctx.key, field, severity, code, message });
  const visit = (node: QuestionSource | QuestionPart, prefix: string) => {
    const mode = node.markingMode ?? defaultMarkingMode(node.type);
    if (mode === "AI_ASSISTED") add(`${prefix}markingMode`, "marking-mode", "AI marking is switched off: use AUTO (rule-marked) or MANUAL (marked against the mark scheme by a person).");
    if (node.type === "MULTIPLE_CHOICE") {
      const keys = node.options.map((o) => o.key);
      const expected = keys.map((_, i) => String.fromCharCode(65 + i));
      if (keys.join() !== expected.join()) add(`${prefix}options`, "mcq-keys", `Option keys must run A, B, C… in order (found ${keys.join(", ")}).`);
      const correct = node.options.filter((o) => o.correct);
      const distractors = node.options.length - correct.length;
      const multiple = node.payload?.selectMode === "multiple";
      if (!multiple && correct.length !== 1) add(`${prefix}options`, "mcq-correct", `A single-answer MCQ has exactly one correct option (found ${correct.length}).`);
      if (multiple && correct.length < 2) add(`${prefix}options`, "mcq-correct", "A multi-select MCQ (selectMode multiple) has at least two correct options.");
      if (distractors < 3) add(`${prefix}options`, "mcq-distractors", `Give at least 3 plausible distractors (found ${distractors}).`);
      const texts = new Set<string>();
      for (const option of node.options) {
        const text = normaliseText(option.content);
        if (texts.has(text)) add(`${prefix}options.${option.key}`, "mcq-duplicate", `Option ${option.key} repeats another option.`);
        texts.add(text);
        if (!option.correct && !option.rationale) add(`${prefix}options.${option.key}.rationale`, "mcq-rationale", `Explain the misconception behind distractor ${option.key} (rationale).`, "warning");
      }
      if (/\b(all|none) of the above\b/i.test(node.options.map((o) => o.content).join(" "))) {
        add(`${prefix}options`, "mcq-above", "Avoid “all/none of the above”: options are shuffled.", "warning");
      }
    } else if (node.options.length > 0) {
      add(`${prefix}options`, "options", "Only MULTIPLE_CHOICE questions have options.");
    }
    if (node.type === "TRUE_FALSE" && node.marks !== 1) add(`${prefix}marks`, "marks", "True/false questions are worth 1 mark.", "warning");
    if (node.type === "MULTIPLE_CHOICE" && node.marks > 2) add(`${prefix}marks`, "marks", "Single MCQs are worth 1-2 marks.", "warning");
    if (OPEN_RESPONSE_TYPES.has(node.type)) {
      if (mode !== "MANUAL") add(`${prefix}markingMode`, "marking-mode", "Essays and extended responses are MANUAL (marked against the mark scheme).");
      const spec = node.answerSpec ?? {};
      const scheme = (spec.markScheme as { points?: { marks?: unknown }[] } | undefined)?.points ?? [];
      const total = scheme.reduce((sum, point) => sum + (typeof point.marks === "number" ? point.marks : 0), 0);
      if (total < node.marks) add(`${prefix}answerSpec.markScheme`, "mark-scheme", `The mark-scheme points total ${total}; they must cover the ${node.marks} marks available.`);
      if (typeof spec.modelAnswer !== "string") add(`${prefix}answerSpec.modelAnswer`, "model-answer", "Give a model answer (answerSpec.modelAnswer) for students to compare with after marking.", "warning");
    }
    if (node.type === "SHORT_ANSWER" && mode === "AUTO") {
      const spec = node.answerSpec ?? {};
      const accepted = Array.isArray(spec.accepted) ? spec.accepted.length : 0;
      if (accepted === 0 && !spec.patterns && !spec.keywords && !spec.rubric) {
        add(`${prefix}answerSpec`, "short-answer-rule", "An AUTO short answer needs accepted answers, patterns, keywords or a rubric (a mark scheme alone needs a person: MANUAL).");
      }
    }
    if ((node.type === "CALCULATION" || node.type === "NUMERICAL") && !node.workedSolution && !question.workedSolution) {
      add(`${prefix}workedSolution`, "worked-solution", "Give a worked solution for calculations.", "warning");
    }
    if (node.type === "DIAGRAM_LABELLING") {
      if (node.payload && "mediaAssetId" in node.payload) add(`${prefix}payload.mediaAssetId`, "media", 'Name the diagram with "media": "<file>" (a file listed in media/media.json), not a database id.');
      if (!node.payload || typeof node.payload.media !== "string") add(`${prefix}payload.media`, "media", 'DIAGRAM_LABELLING needs "media": "<file>" naming the diagram.');
    }
    node.parts.forEach((part) => visit(part, `${prefix}parts.${part.label}.`));
  };
  visit(question, "");
  if (question.type !== "STRUCTURED" && question.parts.length > 0) add("parts", "parts", "Only STRUCTURED questions have parts.");
  if (question.type === "STRUCTURED") {
    const sum = question.parts.reduce((total, part) => total + part.marks, 0);
    if (sum !== question.marks) add("marks", "structured-marks", `The parts are worth ${sum} marks; the question says ${question.marks}.`);
    for (const part of question.parts) {
      if (part.type === "STRUCTURED") {
        const inner = part.parts.reduce((total, sub) => total + sub.marks, 0);
        if (inner !== part.marks) add(`parts.${part.label}.marks`, "structured-marks", `The sub-parts of ${part.label} are worth ${inner} marks; the part says ${part.marks}.`);
      }
    }
  }
  if (question.hints.length === 0 && question.difficulty >= 3) add("hints", "hints", "Give at least one hint for harder questions.", "warning");
  return issues;
}

/** Plausible time: 15 s to 10 min per mark (exam pace is roughly 1-1.5 min per mark). */
function timeRules(question: QuestionSource, ctx: CheckContext): ItemIssue[] {
  const perMark = question.estimatedSeconds / question.marks;
  if (perMark < 15 || perMark > 600) {
    return [{ key: ctx.key, field: "estimatedSeconds", severity: "warning", code: "time", message: `${question.estimatedSeconds} s for ${question.marks} mark(s) is outside 15 s-10 min per mark.` }];
  }
  return [];
}

export function questionChecks(question: QuestionSource, ctx: CheckContext): ItemIssue[] {
  const issues: ItemIssue[] = [];
  const definition = validateQuestionDefinition(questionDefinition(question, ctx.resolveMedia));
  for (const issue of definition.issues) {
    issues.push({
      key: ctx.key,
      field: issue.path.join(".") || "question",
      severity: issue.severity,
      code: "definition",
      message: issue.message,
    });
  }
  issues.push(...typeRules(question, ctx), ...timeRules(question, ctx));
  const visit = (node: QuestionSource | QuestionPart, prefix: string) => {
    for (const [field, source, options] of markdownFields(node, prefix)) issues.push(...renderProblems(source, field, options, ctx));
    issues.push(...templateProblems(node, prefix, ctx));
    node.parts.forEach((part) => visit(part, `${prefix}parts.${part.label}.`));
  };
  visit(question, "");
  issues.push(...renderProblems(question.conceptSummary, "conceptSummary", FIELD_OPTIONS, ctx));
  if (definition.valid) issues.push(...responseProblems(question, ctx));
  return issues;
}
