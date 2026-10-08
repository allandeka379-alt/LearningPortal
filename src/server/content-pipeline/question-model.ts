import type { MarkingMode, QuestionType } from "@/generated/prisma/enums";
import type { QuestionDefinitionInput } from "@/lib/questions";
import type { MarkingInput, MarkingPartInput } from "@/server/marking/types";
import { stableUuid } from "./keys";
import type { QuestionPart, QuestionSource } from "./schemas";

/**
 * Conversions of a SOURCE question (content/subjects/<family>/questions/*.json) into the platform's own shapes:
 * the definition checked by `validateQuestionDefinition`, the marking-engine input (`@/server/marking`) and the
 * question-editor document the CMS service stores. Pure: the validator and the importer share it, so what is validated
 * is exactly what is imported.
 *
 * Media: Markdown may reference family images as `![alt](media:<file>)` and DIAGRAM_LABELLING payloads name them as
 * `"media": "<file>"`; `resolveMedia` maps a file to a MediaAsset id (the importer: the uploaded asset; the validator:
 * a stable placeholder id).
 */

export type MediaIdResolver = (file: string) => string | null;

/** Essays / extended responses are marked against the mark scheme by a person (AI marking is switched off). */
export function defaultMarkingMode(type: QuestionType): MarkingMode {
  return type === "ESSAY" || type === "EXTENDED_RESPONSE" ? "MANUAL" : "AUTO";
}

const MEDIA_LINK = /\]\(media:([a-z0-9][a-z0-9._/-]*)/g;

/** Media files referenced by `![alt](media:<file>)` in a Markdown source. */
export function mediaReferences(markdown: string | null | undefined): string[] {
  if (!markdown) return [];
  return [...markdown.matchAll(MEDIA_LINK)].map((match) => match[1] as string);
}

/** Rewrites `media:<file>` image references to `asset:<id>` (unknown files are left as they are). */
export function rewriteMedia(markdown: string, resolve: MediaIdResolver): string {
  return markdown.replace(MEDIA_LINK, (whole, file: string) => {
    const id = resolve(file);
    return id ? `](asset:${id}` : whole;
  });
}

function rewriteOptional(markdown: string | null | undefined, resolve: MediaIdResolver): string | null {
  return markdown === undefined || markdown === null ? null : rewriteMedia(markdown, resolve);
}

/** DIAGRAM_LABELLING: `{ media: "<file>", ... }` → `{ mediaAssetId: "<id>", ... }`. Other payloads unchanged. */
export function resolvePayload(type: QuestionType, payload: Record<string, unknown> | null | undefined, resolve: MediaIdResolver): Record<string, unknown> | null {
  if (payload === undefined || payload === null) return null;
  if (type !== "DIAGRAM_LABELLING" || typeof payload.media !== "string") return payload;
  const { media, ...rest } = payload;
  const id = resolve(media as string);
  return { ...rest, mediaAssetId: id ?? "" };
}

/** Every media file a question references (Markdown images and diagram payloads), with the field it sits in. */
export function questionMediaFiles(question: QuestionSource): { file: string; field: string }[] {
  const out: { file: string; field: string }[] = [];
  const scan = (field: string, value: string | null | undefined) => {
    for (const file of mediaReferences(value)) out.push({ file, field });
  };
  const visit = (node: QuestionSource | QuestionPart, prefix: string) => {
    scan(`${prefix}stem`, node.stem);
    scan(`${prefix}explanation`, node.explanation);
    scan(`${prefix}workedSolution`, node.workedSolution);
    node.hints.forEach((hint, i) => scan(`${prefix}hints.${i}`, hint));
    node.options.forEach((option) => {
      scan(`${prefix}options.${option.key}.content`, option.content);
      scan(`${prefix}options.${option.key}.rationale`, option.rationale);
    });
    if (node.type === "DIAGRAM_LABELLING" && node.payload && typeof node.payload.media === "string") out.push({ file: node.payload.media, field: `${prefix}payload.media` });
    node.parts.forEach((part) => visit(part, `${prefix}parts.${part.label}.`));
  };
  visit(question, "");
  if ("conceptSummary" in question) scan("conceptSummary", question.conceptSummary);
  return out;
}

// ---------------------------------------------------------------------------------------------------------------------
// Definition (validateQuestionDefinition)
// ---------------------------------------------------------------------------------------------------------------------

function partDefinition(part: QuestionPart, resolve: MediaIdResolver): QuestionDefinitionInput {
  const structured = part.type === "STRUCTURED";
  return {
    type: part.type,
    markingMode: part.markingMode ?? defaultMarkingMode(part.type),
    marks: part.marks,
    payload: structured ? null : resolvePayload(part.type, part.payload, resolve),
    answerSpec: structured ? null : (part.answerSpec ?? null),
    partLabel: part.label,
    options: part.options.map((o) => ({ key: o.key, isCorrect: o.correct })),
    parts: part.parts.map((p) => partDefinition(p, resolve)),
  };
}

export function questionDefinition(question: QuestionSource, resolve: MediaIdResolver): QuestionDefinitionInput {
  const structured = question.type === "STRUCTURED";
  return {
    type: question.type,
    markingMode: question.markingMode ?? defaultMarkingMode(question.type),
    marks: question.marks,
    payload: structured ? null : resolvePayload(question.type, question.payload, resolve),
    answerSpec: structured ? null : (question.answerSpec ?? null),
    partLabel: null,
    options: question.options.map((o) => ({ key: o.key, isCorrect: o.correct })),
    parts: question.parts.map((p) => partDefinition(p, resolve)),
  };
}

// ---------------------------------------------------------------------------------------------------------------------
// Marking engine input and responses
// ---------------------------------------------------------------------------------------------------------------------

/** Stable placeholder id of a structured part (validation only: database parts have their own ids). */
export function partPlaceholderId(questionKey: string, labelPath: string): string {
  return stableUuid(`part:${questionKey}#${labelPath}`);
}

export interface LeafPart {
  /** Concatenated labels from the root, e.g. "(b)(i)". */
  labelPath: string;
  part: QuestionPart;
  markingMode: MarkingMode;
}

/** Leaf parts (the ones a student answers) in order. */
export function leafParts(question: QuestionSource): LeafPart[] {
  const out: LeafPart[] = [];
  const visit = (parts: readonly QuestionPart[], prefix: string) => {
    for (const part of parts) {
      const labelPath = `${prefix}${part.label}`;
      if (part.type === "STRUCTURED") visit(part.parts, labelPath);
      else out.push({ labelPath, part, markingMode: part.markingMode ?? defaultMarkingMode(part.type) });
    }
  };
  visit(question.parts, "");
  return out;
}

function partInput(questionKey: string, part: QuestionPart, prefix: string, resolve: MediaIdResolver): MarkingPartInput {
  const labelPath = `${prefix}${part.label}`;
  const structured = part.type === "STRUCTURED";
  return {
    id: partPlaceholderId(questionKey, labelPath),
    type: part.type,
    marks: part.marks,
    markingMode: part.markingMode ?? defaultMarkingMode(part.type),
    partLabel: part.label,
    payload: structured ? null : resolvePayload(part.type, part.payload, resolve),
    answerSpec: structured ? null : (part.answerSpec ?? null),
    options: part.options.map((o, i) => ({ key: o.key, isCorrect: o.correct, content: o.content, sortOrder: i })),
    parts: part.parts.map((p) => partInput(questionKey, p, labelPath, resolve)),
  };
}

/**
 * Converts an authored response to the engine's response shape. Everything is passed through unchanged except
 * STRUCTURED, which is authored by part label (`{ "type": "STRUCTURED", "parts": { "(a)": <response>, "(b)(i)": … } }`)
 * and stored by part id (`{ type, parts: [{ partId, response }] }`). Returns a problem message for malformed input.
 */
export function toEngineResponse(question: QuestionSource, authored: unknown): { response: unknown; problem: string | null } {
  if (question.type !== "STRUCTURED") return { response: authored, problem: null };
  if (typeof authored !== "object" || authored === null || (authored as { type?: unknown }).type !== "STRUCTURED") {
    return { response: authored, problem: 'A structured response is { "type": "STRUCTURED", "parts": { "(a)": <response>, … } }.' };
  }
  const parts = (authored as { parts?: unknown }).parts;
  if (typeof parts !== "object" || parts === null || Array.isArray(parts)) {
    return { response: authored, problem: 'Give "parts" as an object keyed by part label, e.g. { "(a)": { … } }.' };
  }
  const leaves = new Map(leafParts(question).map((leaf) => [leaf.labelPath, leaf]));
  const entries: { partId: string; response: unknown }[] = [];
  for (const [label, response] of Object.entries(parts as Record<string, unknown>)) {
    if (!leaves.has(label)) return { response: authored, problem: `"${label}" is not a part to answer (answerable parts: ${[...leaves.keys()].join(", ")}).` };
    entries.push({ partId: partPlaceholderId(question.key, label), response });
  }
  return { response: { type: "STRUCTURED", parts: entries }, problem: null };
}

/** Marking-engine input of a source question (placeholder part ids, media resolved). */
export function markingInput(question: QuestionSource, response: unknown, resolve: MediaIdResolver): MarkingInput {
  const structured = question.type === "STRUCTURED";
  return {
    type: question.type,
    marks: question.marks,
    markingMode: question.markingMode ?? defaultMarkingMode(question.type),
    payload: structured ? null : resolvePayload(question.type, question.payload, resolve),
    answerSpec: structured ? null : (question.answerSpec ?? null),
    response,
    options: question.options.map((o, i) => ({ key: o.key, isCorrect: o.correct, content: o.content, sortOrder: i })),
    parts: question.parts.map((p) => partInput(question.key, p, "", resolve)),
  };
}

// ---------------------------------------------------------------------------------------------------------------------
// Question-editor document (what the CMS question service stores)
// ---------------------------------------------------------------------------------------------------------------------

export interface EditorDocumentContext {
  subjectId: string;
  topics: { topicId: string; isPrimary: boolean }[];
  objectiveIds: string[];
  provenance: { sourceId: string; author: string; licenceCode: string };
  resolveMedia: MediaIdResolver;
  /** Existing part row ids by label path (draft copies keep the link to the live parts they edit). */
  partIds?: ReadonlyMap<string, string>;
}

/** Default access: daily-eligible questions are FREE (the daily question is open to every student), others PREMIUM. */
export function questionAccessTier(question: QuestionSource): "PUBLIC" | "FREE" | "PREMIUM" {
  return question.access ?? (question.dailyEligible ? "FREE" : "PREMIUM");
}

function editorPart(part: QuestionPart, prefix: string, ctx: EditorDocumentContext): Record<string, unknown> {
  const labelPath = `${prefix}${part.label}`;
  const structured = part.type === "STRUCTURED";
  const id = ctx.partIds?.get(labelPath);
  return {
    ...(id ? { id } : {}),
    partLabel: part.label,
    type: part.type,
    markingMode: part.markingMode ?? defaultMarkingMode(part.type),
    stem: rewriteMedia(part.stem, ctx.resolveMedia),
    payload: structured ? null : resolvePayload(part.type, part.payload, ctx.resolveMedia),
    answerSpec: structured ? null : (part.answerSpec ?? null),
    marks: part.marks,
    options: part.options.map((o) => ({
      key: o.key,
      content: rewriteMedia(o.content, ctx.resolveMedia),
      isCorrect: o.correct,
      rationale: rewriteOptional(o.rationale, ctx.resolveMedia),
    })),
    explanation: rewriteOptional(part.explanation, ctx.resolveMedia),
    workedSolution: rewriteOptional(part.workedSolution, ctx.resolveMedia),
    hints: part.hints.map((h) => rewriteMedia(h, ctx.resolveMedia)),
    parts: part.parts.map((p) => editorPart(p, labelPath, ctx)),
  };
}

/** The question-editor document (input of `createQuestion` / `updateQuestion`, src/server/cms/questions). */
export function toEditorDocument(question: QuestionSource, ctx: EditorDocumentContext): Record<string, unknown> {
  const structured = question.type === "STRUCTURED";
  return {
    subjectId: ctx.subjectId,
    type: question.type,
    markingMode: question.markingMode ?? defaultMarkingMode(question.type),
    stem: rewriteMedia(question.stem, ctx.resolveMedia),
    payload: structured ? null : resolvePayload(question.type, question.payload, ctx.resolveMedia),
    answerSpec: structured ? null : (question.answerSpec ?? null),
    marks: question.marks,
    options: question.options.map((o) => ({
      key: o.key,
      content: rewriteMedia(o.content, ctx.resolveMedia),
      isCorrect: o.correct,
      rationale: rewriteOptional(o.rationale, ctx.resolveMedia),
    })),
    parts: question.parts.map((p) => editorPart(p, "", ctx)),
    explanation: rewriteMedia(question.explanation, ctx.resolveMedia),
    workedSolution: rewriteOptional(question.workedSolution, ctx.resolveMedia),
    conceptSummary: rewriteOptional(question.conceptSummary, ctx.resolveMedia),
    hints: question.hints.map((h) => rewriteMedia(h, ctx.resolveMedia)),
    relatedLessonId: null,
    difficulty: question.difficulty,
    estimatedSeconds: question.estimatedSeconds,
    year: null,
    paperLabel: question.paper ?? null,
    cognitiveSkill: question.skill,
    isExamStyle: question.examStyle,
    isDailyEligible: question.dailyEligible,
    calculatorAllowed: question.calculator,
    accessTier: questionAccessTier(question),
    languageCode: "en",
    topics: ctx.topics,
    objectiveIds: ctx.objectiveIds,
    sourceId: ctx.provenance.sourceId,
    author: ctx.provenance.author,
    copyrightStatus: "OWNED",
    licenceCode: ctx.provenance.licenceCode,
    attribution: null,
    sourceUrl: null,
    publicationDate: null,
  };
}
