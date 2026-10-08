import "server-only";
import { Prisma, type ContentStatus } from "@/generated/prisma/client";
import { validateQuestionDefinition, type QuestionDefinitionInput } from "@/lib/questions";
import { AUDIT_ACTIONS, auditActorFields, auditInTx, type AuditAction, type InfraActor } from "@/server/lib/audit";
import { sha256Hex } from "@/server/lib/crypto";
import { setContentPublishContext, type Tx } from "@/server/lib/db-context";
import { AppError, type FieldErrors } from "@/server/lib/errors";
import { recordRevisionSnapshot } from "@/server/questions/revisions";
import {
  buildQuestionSnapshot,
  canonicalJson,
  QUESTION_SNAPSHOT_SCHEMA_VERSION,
  toJsonValue,
  type JsonValue,
  type SnapshotQuestionRow,
} from "@/server/questions/snapshot";
import { renderContent, renderInline } from "./render";

/**
 * THE shared content workflow + publish helper (§25, §26, §41, §42; CLAUDE.md "Database rules"; ARCHITECTURE §4.4).
 * Used by the seed, the admin CMS, the teacher test builder and AI-draft approval. Never hand-roll these steps: the
 * database (C1.5 triggers and CHECKs in the init migration) refuses anything else.
 *
 * Workflow (platform content): DRAFT → IN_REVIEW ({@link submitForReview}) → APPROVED ({@link approve}, a human
 * approver; four-eyes when `app.four_eyes = 'on'`) → PUBLISHED ({@link publish}) → ARCHIVED ({@link archive}).
 * {@link requestChanges} sends IN_REVIEW / APPROVED back to DRAFT; {@link reopenArchived} restores ARCHIVED content to
 * DRAFT (revision + 1) so it can go through review again. School- and tutor-owned questions and assessments
 * follow their owner's lighter workflow: they may be published from any unpublished status (still revisioned).
 *
 * Editing published content: {@link createDraftCopyForEdit} makes a sibling DRAFT row (`draftOfId = live.id`,
 * revision = live + 1) with copies of its children; students keep the live row. Publishing the approved copy runs the
 * PUBLISH MERGE in the caller's transaction:
 *   1. `setContentPublishContext(tx, liveId)` unlocks the live row's children (content_child_guard);
 *   2. the draft's fields are copied onto the live row, `revision + 1` (only when something changed; an identical
 *      copy is simply discarded), `aiGenerated := live OR draft`, approver / approval time from the draft;
 *   3. children are merged: question options by `key`, structured parts by their own `draftOfId` (removed parts are
 *      archived), lesson practice questions / assessment sections, items and rules / study-pack scopes / plan-template
 *      items replaced; topic and objective TAGS are replaced per syllabus version present in the draft (tags the live
 *      row gained for other versions meanwhile are kept);
 *   4. the immutable ContentRevision snapshot of the merged aggregate is inserted (checked at COMMIT by the deferred
 *      `<T>_revision_snapshot` trigger); 5. the draft copy is deleted; 6. an AuditLog entry is written.
 * Ids seen by students never change, so attempts, mastery, stats and flags stay attached.
 *
 * Every function takes the caller's transaction (`db.$transaction(tx => publish(tx, ...))`) so a CMS action can do
 * its own writes (render caches, ContentMediaUsage, search jobs) atomically with the workflow change.
 */

// =====================================================================================================================
// Types
// =====================================================================================================================

/** Content tables with the editorial workflow (Lesson, Question, Flashcard, Assessment, StudyPack, StudyPlanTemplate). */
export const WORKFLOW_ENTITY_TYPES = ["LESSON", "QUESTION", "FLASHCARD", "ASSESSMENT", "STUDY_PACK", "STUDY_PLAN_TEMPLATE"] as const;
export type WorkflowEntityType = (typeof WORKFLOW_ENTITY_TYPES)[number];

/** Who performs a workflow step. `Actor` from `@/server/auth/actor` is structurally compatible. */
export type ContentActor = InfraActor;

/** Version of the snapshot documents written by {@link buildSnapshot} (ContentRevision.schemaVersion). */
export const CONTENT_SNAPSHOT_SCHEMA_VERSION = 1;

const TABLES: Readonly<Record<WorkflowEntityType, string>> = {
  LESSON: "Lesson",
  QUESTION: "Question",
  FLASHCARD: "Flashcard",
  ASSESSMENT: "Assessment",
  STUDY_PACK: "StudyPack",
  STUDY_PLAN_TEMPLATE: "StudyPlanTemplate",
};

/** Render caches: regenerable, editable on published rows, never part of snapshots or change detection. */
const CACHE_COLUMNS: ReadonlySet<string> = new Set(["bodyHtml", "renderVersion", "contentHash", "renderedHtml"]);

type Row = Record<string, unknown>;

export interface WorkflowResult {
  id: string;
  status: ContentStatus;
  revision: number;
}

export interface PublishResult {
  /** The LIVE row (students' id). */
  id: string;
  revision: number;
  /** False when a draft copy was identical to the live row: nothing was republished and the copy was discarded. */
  changed: boolean;
  /** The ContentRevision written (null when unchanged). */
  revisionId: string | null;
  contentHash: string | null;
  /** The draft copy that was merged (and deleted), if any. */
  mergedDraftId: string | null;
}

export interface DraftCopy {
  id: string;
  draftOfId: string;
  revision: number;
  /** False when an existing draft copy was returned. */
  created: boolean;
}

export interface BuiltSnapshot {
  snapshot: { [key: string]: JsonValue };
  /** Hex SHA-256 of the canonical JSON (ContentRevision_values_chk). */
  contentHash: string;
  schemaVersion: number;
}

export interface TopicTag {
  topicId: string;
  isPrimary: boolean;
  sortOrder: number;
}

/** Full aggregates per entity type, as loaded by {@link loadContentAggregate} and snapshotted by {@link buildSnapshot}. */
export interface ContentAggregates {
  LESSON: { lesson: Row; topics: TopicTag[]; objectives: string[]; questions: { questionId: string; sortOrder: number }[] };
  QUESTION: {
    question: SnapshotQuestionRow;
    topics: { topicId: string; syllabusId: string; isPrimary: boolean }[];
    objectives: string[];
  };
  FLASHCARD: { flashcard: Row; topics: TopicTag[] };
  ASSESSMENT: { assessment: Row; sections: (Row & { items: Row[]; rules: Row[] })[]; topics: string[] };
  STUDY_PACK: { studyPack: Row; scopes: Row[] };
  STUDY_PLAN_TEMPLATE: { template: Row; items: Row[] };
}

// =====================================================================================================================
// Field lists (what a draft copy carries and what the publish merge copies back)
// =====================================================================================================================

const PROVENANCE = ["sourceId", "author", "copyrightStatus", "licenceCode", "attribution", "sourceUrl", "publicationDate", "isDemo"] as const;

const LESSON_FIELDS = [
  "subjectId", "qualificationId", "examBoardId", "kind", "title", "slug", "summary", "body", "languageCode",
  "estimatedMinutes", "accessTier", "metaTitle", "metaDescription", ...PROVENANCE,
] as const;
const LESSON_CACHES = ["bodyHtml", "renderVersion", "contentHash"] as const;

const QUESTION_FIELDS = [
  "subjectId", "type", "markingMode", "stem", "payload", "answerSpec", "explanation", "workedSolution", "hints",
  "conceptSummary", "relatedLessonId", "difficulty", "marks", "estimatedSeconds", "year", "paperLabel", "cognitiveSkill",
  "isExamStyle", "isDailyEligible", "calculatorAllowed", "accessTier", "languageCode", ...PROVENANCE,
] as const;
const PART_FIELDS = [...QUESTION_FIELDS, "partLabel", "partOrder"] as const;
const QUESTION_CACHES = ["renderedHtml", "renderVersion"] as const;
const OPTION_FIELDS = ["key", "content", "isCorrect", "rationale", "mediaAssetId", "sortOrder"] as const;

const FLASHCARD_FIELDS = ["subjectId", "cardType", "front", "back", "notes", "languageCode", "accessTier", ...PROVENANCE] as const;
const FLASHCARD_CACHES = ["renderedHtml", "renderVersion"] as const;

const ASSESSMENT_FIELDS = [
  "kind", "assembly", "subjectId", "syllabusId", "routeId", "title", "description", "instructions", "timeLimitSeconds",
  "totalMarks", "gradeSchemeId", "feedbackTiming", "shuffleQuestions", "shuffleOptions", "allowNavigation", "maxAttempts",
  "accessTier", ...PROVENANCE,
] as const;
const SECTION_FIELDS = ["componentId", "title", "instructions", "sortOrder", "timeLimitSeconds", "answerCount", "marks"] as const;
const ITEM_FIELDS = ["questionId", "sortOrder", "label", "marks"] as const;
const RULE_FIELDS = [
  "topicId", "objectiveId", "includeSubtopics", "questionType", "cognitiveSkill", "difficultyMin", "difficultyMax",
  "questionCount", "marksPerQuestion", "examStyleOnly", "sortOrder",
] as const;

const STUDY_PACK_FIELDS = [
  "slug", "title", "subtitle", "description", "coverImageId", "entitlements", "allowPdfExport", "isFeatured", "sortOrder",
  "metaTitle", "metaDescription", "isDemo",
] as const;
const SCOPE_FIELDS = ["qualificationId", "subjectId", "syllabusId"] as const;

const TEMPLATE_FIELDS = ["subjectId", "syllabusId", "routeId", "title", "slug", "description", "durationWeeks", "weeklyMinutes", "accessTier", "isDemo"] as const;
const TEMPLATE_ITEM_FIELDS = [
  "weekNumber", "dayOfWeek", "sortOrder", "activityType", "topicId", "lessonId", "assessmentId", "targetMinutes",
  "targetQuestions", "note",
] as const;

/** Nullable Json columns: a JS null must be written as `Prisma.DbNull`. */
const JSON_COLUMNS: ReadonlySet<string> = new Set(["payload", "answerSpec", "renderedHtml", "entitlements"]);

function pick(row: Row, fields: readonly string[]): Row {
  const out: Row = {};
  for (const field of fields) out[field] = row[field];
  return out;
}

/** Copies of `fields` ready for a Prisma write (JSON nulls → DbNull). */
function writable(row: Row, fields: readonly string[]): Row {
  const out: Row = {};
  for (const field of fields) {
    const value = row[field];
    out[field] = value === null && JSON_COLUMNS.has(field) ? Prisma.DbNull : value;
  }
  return out;
}

// =====================================================================================================================
// Snapshots (pure)
// =====================================================================================================================

function compareStrings(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

/** Scalar columns of a row as JSON (render caches dropped, Dates as ISO strings). */
function columns(row: Row): { [key: string]: JsonValue } {
  const out: { [key: string]: JsonValue } = {};
  for (const [key, value] of Object.entries(row)) {
    if (CACHE_COLUMNS.has(key) || value === undefined) continue;
    if (Array.isArray(value) && key !== "hints" && key !== "highlights") continue; // relation arrays are handled explicitly
    out[key] = toJsonValue(value);
  }
  return out;
}

function sortedTags(tags: readonly TopicTag[]): JsonValue[] {
  return [...tags]
    .sort((a, b) => compareStrings(a.topicId, b.topicId))
    .map((t) => ({ topicId: t.topicId, isPrimary: t.isPrimary, sortOrder: t.sortOrder }));
}

function bySortOrder(a: Row, b: Row): number {
  return Number(a.sortOrder ?? 0) - Number(b.sortOrder ?? 0) || compareStrings(String(a.id ?? ""), String(b.id ?? ""));
}

/**
 * Builds the immutable snapshot document of a content aggregate (ContentRevision.snapshot shapes in the schema doc):
 * deterministic order, render caches excluded, Dates as ISO strings; `contentHash` is the SHA-256 of the canonical JSON
 * (keys sorted at every level), so equal aggregates always hash equally. QUESTION delegates to the question bank's
 * `buildQuestionSnapshot` (one snapshot format for every writer).
 */
export function buildSnapshot<T extends WorkflowEntityType>(entityType: T, aggregate: ContentAggregates[T]): BuiltSnapshot {
  let snapshot: { [key: string]: JsonValue };
  let schemaVersion = CONTENT_SNAPSHOT_SCHEMA_VERSION;
  switch (entityType) {
    case "QUESTION": {
      const a = aggregate as ContentAggregates["QUESTION"];
      snapshot = buildQuestionSnapshot({ question: a.question, topics: a.topics, objectives: a.objectives });
      schemaVersion = QUESTION_SNAPSHOT_SCHEMA_VERSION;
      break;
    }
    case "LESSON": {
      const a = aggregate as ContentAggregates["LESSON"];
      snapshot = {
        lesson: columns(a.lesson),
        topics: sortedTags(a.topics),
        objectives: [...a.objectives].sort(compareStrings),
        questions: [...a.questions]
          .sort((x, y) => x.sortOrder - y.sortOrder || compareStrings(x.questionId, y.questionId))
          .map((q) => ({ questionId: q.questionId, sortOrder: q.sortOrder })),
      };
      break;
    }
    case "FLASHCARD": {
      const a = aggregate as ContentAggregates["FLASHCARD"];
      snapshot = { flashcard: columns(a.flashcard), topics: sortedTags(a.topics) };
      break;
    }
    case "ASSESSMENT": {
      const a = aggregate as ContentAggregates["ASSESSMENT"];
      snapshot = {
        assessment: columns(a.assessment),
        sections: [...a.sections].sort(bySortOrder).map((section) => ({
          ...columns(section),
          items: [...section.items].sort(bySortOrder).map(columns),
          rules: [...section.rules].sort(bySortOrder).map(columns),
        })),
        topics: [...a.topics].sort(compareStrings),
      };
      break;
    }
    case "STUDY_PACK": {
      const a = aggregate as ContentAggregates["STUDY_PACK"];
      snapshot = { studyPack: columns(a.studyPack), scopes: [...a.scopes].sort(bySortOrder).map(columns) };
      break;
    }
    case "STUDY_PLAN_TEMPLATE": {
      const a = aggregate as ContentAggregates["STUDY_PLAN_TEMPLATE"];
      snapshot = {
        template: columns(a.template),
        items: [...a.items]
          .sort((x, y) => Number(x.weekNumber) - Number(y.weekNumber) || bySortOrder(x, y))
          .map(columns),
      };
      break;
    }
    default:
      throw new AppError("BAD_REQUEST", "Unsupported content type.");
  }
  return { snapshot, contentHash: sha256Hex(canonicalJson(snapshot)), schemaVersion };
}

/**
 * Content projection used to decide whether a draft copy changes anything: the copyable fields and children WITHOUT
 * ids, workflow columns or timestamps (draft and live rows have different ids). Pure.
 */
export function contentProjection<T extends WorkflowEntityType>(entityType: T, aggregate: ContentAggregates[T]): string {
  const json = (row: Row, fields: readonly string[]): JsonValue => toJsonValue(pick(row, fields));
  let value: JsonValue;
  switch (entityType) {
    case "QUESTION": {
      const a = aggregate as ContentAggregates["QUESTION"];
      const options = (row: SnapshotQuestionRow): JsonValue[] =>
        [...row.options].sort((x, y) => compareStrings(x.key, y.key)).map((o) => json(o, OPTION_FIELDS));
      const parts = (row: SnapshotQuestionRow): JsonValue[] =>
        [...(row.parts ?? [])]
          .sort((x, y) => x.partOrder - y.partOrder || compareStrings(String(x.partLabel ?? ""), String(y.partLabel ?? "")))
          .map((p) => ({ fields: json(p, PART_FIELDS), options: options(p), parts: parts(p) }));
      value = {
        fields: json(a.question, QUESTION_FIELDS),
        options: options(a.question),
        parts: parts(a.question),
        topics: [...a.topics]
          .sort((x, y) => compareStrings(x.syllabusId, y.syllabusId) || compareStrings(x.topicId, y.topicId))
          .map((t) => ({ topicId: t.topicId, syllabusId: t.syllabusId, isPrimary: t.isPrimary })),
        objectives: [...a.objectives].sort(compareStrings),
      };
      break;
    }
    case "LESSON": {
      const a = aggregate as ContentAggregates["LESSON"];
      value = {
        fields: json(a.lesson, LESSON_FIELDS),
        topics: sortedTags(a.topics),
        objectives: [...a.objectives].sort(compareStrings),
        questions: [...a.questions]
          .sort((x, y) => x.sortOrder - y.sortOrder || compareStrings(x.questionId, y.questionId))
          .map((q) => ({ questionId: q.questionId, sortOrder: q.sortOrder })),
      };
      break;
    }
    case "FLASHCARD": {
      const a = aggregate as ContentAggregates["FLASHCARD"];
      value = { fields: json(a.flashcard, FLASHCARD_FIELDS), topics: sortedTags(a.topics) };
      break;
    }
    case "ASSESSMENT": {
      const a = aggregate as ContentAggregates["ASSESSMENT"];
      value = {
        fields: json(a.assessment, ASSESSMENT_FIELDS),
        sections: [...a.sections].sort(bySortOrder).map((s) => ({
          fields: json(s, SECTION_FIELDS),
          items: [...s.items].sort(bySortOrder).map((i) => json(i, ITEM_FIELDS)),
          rules: [...s.rules].sort(bySortOrder).map((r) => json(r, RULE_FIELDS)),
        })),
        topics: [...a.topics].sort(compareStrings),
      };
      break;
    }
    case "STUDY_PACK": {
      const a = aggregate as ContentAggregates["STUDY_PACK"];
      value = {
        fields: json(a.studyPack, STUDY_PACK_FIELDS),
        scopes: a.scopes.map((s) => canonicalJson(json(s, SCOPE_FIELDS))).sort(compareStrings),
      };
      break;
    }
    case "STUDY_PLAN_TEMPLATE": {
      const a = aggregate as ContentAggregates["STUDY_PLAN_TEMPLATE"];
      value = {
        fields: json(a.template, TEMPLATE_FIELDS),
        items: a.items.map((i) => canonicalJson(json(i, TEMPLATE_ITEM_FIELDS))).sort(compareStrings),
      };
      break;
    }
    default:
      throw new AppError("BAD_REQUEST", "Unsupported content type.");
  }
  return canonicalJson(value);
}

// =====================================================================================================================
// Content checks (block review / publish)
// =====================================================================================================================

/** Renderer warnings that block review and publishing (ARCHITECTURE §3.10: invalid LaTeX, unknown blocks). */
const BLOCKING_WARNINGS: ReadonlySet<string> = new Set(["math-error", "unknown-directive"]);

function markdownIssues(errors: FieldErrors, field: string, source: unknown, inline = false): void {
  if (typeof source !== "string" || source.trim() === "") return;
  const rendered = inline ? renderInline(source) : renderContent(source);
  for (const warning of rendered.warnings) {
    if (!BLOCKING_WARNINGS.has(warning.code)) continue;
    (errors[field] ??= []).push(warning.line === undefined ? warning.message : `Line ${warning.line}: ${warning.message}`);
  }
}

function questionDefinition(row: SnapshotQuestionRow): QuestionDefinitionInput {
  return {
    type: row.type as QuestionDefinitionInput["type"],
    markingMode: row.markingMode as QuestionDefinitionInput["markingMode"],
    marks: Number(row.marks),
    payload: row.payload ?? null,
    answerSpec: row.answerSpec ?? null,
    partLabel: (row.partLabel as string | null | undefined) ?? null,
    options: row.options.map((o) => ({ key: o.key, isCorrect: Boolean(o.isCorrect) })),
    parts: (row.parts ?? []).map(questionDefinition),
  };
}

function questionMarkdownIssues(errors: FieldErrors, row: SnapshotQuestionRow, prefix: string): void {
  for (const field of ["stem", "explanation", "workedSolution", "conceptSummary"]) markdownIssues(errors, `${prefix}${field}`, row[field]);
  (Array.isArray(row.hints) ? (row.hints as unknown[]) : []).forEach((hint, i) => markdownIssues(errors, `${prefix}hints.${i}`, hint));
  row.options.forEach((option, i) => markdownIssues(errors, `${prefix}options.${i}.content`, option.content, true));
  (row.parts ?? []).forEach((part, i) => questionMarkdownIssues(errors, part, `${prefix}parts.${i}.`));
}

/**
 * Authoring problems that must be fixed before review or publishing (empty object = none): question definitions that
 * cannot be marked (`validateQuestionDefinition` errors), invalid LaTeX and unknown content blocks. Pure (renders in
 * memory). Assessment-level checks that need the database run inside {@link submitForReview} / {@link publish}.
 */
export function collectContentIssues<T extends WorkflowEntityType>(entityType: T, aggregate: ContentAggregates[T]): FieldErrors {
  const errors: FieldErrors = {};
  switch (entityType) {
    case "QUESTION": {
      const { question } = aggregate as ContentAggregates["QUESTION"];
      for (const issue of validateQuestionDefinition(questionDefinition(question)).issues) {
        if (issue.severity !== "error") continue;
        (errors[issue.path.length > 0 ? issue.path.join(".") : "_form"] ??= []).push(issue.message);
      }
      questionMarkdownIssues(errors, question, "");
      break;
    }
    case "LESSON": {
      const { lesson } = aggregate as ContentAggregates["LESSON"];
      if (typeof lesson.title !== "string" || lesson.title.trim() === "") (errors.title ??= []).push("Give the lesson a title.");
      markdownIssues(errors, "body", lesson.body);
      markdownIssues(errors, "summary", lesson.summary);
      break;
    }
    case "FLASHCARD": {
      const { flashcard } = aggregate as ContentAggregates["FLASHCARD"];
      markdownIssues(errors, "front", flashcard.front);
      markdownIssues(errors, "back", flashcard.back);
      markdownIssues(errors, "notes", flashcard.notes);
      break;
    }
    case "ASSESSMENT": {
      const { assessment, sections } = aggregate as ContentAggregates["ASSESSMENT"];
      markdownIssues(errors, "instructions", assessment.instructions);
      if (sections.length === 0) (errors.sections ??= []).push("Add at least one section.");
      if (assessment.assembly === "FIXED" && sections.every((s) => s.items.length === 0)) {
        (errors.sections ??= []).push("A fixed assessment needs at least one question.");
      }
      if (assessment.assembly !== "FIXED" && sections.every((s) => s.rules.length === 0 && s.items.length === 0)) {
        (errors.sections ??= []).push("Add blueprint rules or fixed questions.");
      }
      break;
    }
    default:
      break;
  }
  return errors;
}

/** Assessment checks that need the database: items are PUBLISHED live root questions; FIXED totals add up. */
async function assessmentIssues(tx: Tx, aggregate: ContentAggregates["ASSESSMENT"], errors: FieldErrors): Promise<void> {
  const questionIds = [...new Set(aggregate.sections.flatMap((s) => s.items.map((i) => String(i.questionId))))];
  if (questionIds.length === 0) return;
  const questions = await tx.question.findMany({
    where: { id: { in: questionIds } },
    select: { id: true, status: true, parentId: true, draftOfId: true, marks: true },
  });
  const byId = new Map(questions.map((q) => [q.id, q]));
  for (const id of questionIds) {
    const q = byId.get(id);
    if (!q || q.parentId !== null || q.draftOfId !== null) (errors.sections ??= []).push(`Question ${id} is not a question that can be set.`);
    else if (q.status !== "PUBLISHED") (errors.sections ??= []).push(`Question ${id} is not published.`);
  }
  if (aggregate.assessment.assembly !== "FIXED") return;
  let expected = 0;
  for (const section of aggregate.sections) {
    if (section.answerCount !== null && section.answerCount !== undefined) {
      expected += Number(section.marks ?? 0);
      continue;
    }
    for (const item of section.items) expected += item.marks !== null && item.marks !== undefined ? Number(item.marks) : (byId.get(String(item.questionId))?.marks ?? 0);
  }
  if (expected !== Number(aggregate.assessment.totalMarks)) {
    (errors.totalMarks ??= []).push(`The questions add up to ${expected} marks but the assessment says ${String(aggregate.assessment.totalMarks)}.`);
  }
}

async function assertNoIssues<T extends WorkflowEntityType>(tx: Tx, entityType: T, aggregate: ContentAggregates[T]): Promise<void> {
  const errors = collectContentIssues(entityType, aggregate);
  if (entityType === "ASSESSMENT") await assessmentIssues(tx, aggregate as ContentAggregates["ASSESSMENT"], errors);
  if (Object.keys(errors).length > 0) throw AppError.validation(errors, "Fix the highlighted problems before continuing.");
}

// =====================================================================================================================
// Loading
// =====================================================================================================================

const OPTION_ORDER = [{ sortOrder: "asc" }, { key: "asc" }] satisfies Prisma.QuestionOptionOrderByWithRelationInput[];
const PART_ORDER = [{ partOrder: "asc" }, { id: "asc" }] satisfies Prisma.QuestionOrderByWithRelationInput[];
const LIVE_PARTS = { status: { not: "ARCHIVED" } } satisfies Prisma.QuestionWhereInput;

const QUESTION_INCLUDE = {
  options: { orderBy: OPTION_ORDER },
  parts: {
    where: LIVE_PARTS,
    orderBy: PART_ORDER,
    include: { options: { orderBy: OPTION_ORDER }, parts: { where: LIVE_PARTS, orderBy: PART_ORDER, include: { options: { orderBy: OPTION_ORDER } } } },
  },
  topics: { select: { topicId: true, syllabusId: true, isPrimary: true } },
  objectives: { select: { objectiveId: true } },
} satisfies Prisma.QuestionInclude;

/**
 * Loads the full aggregate of a content row (root columns + children + tags). Null when the row does not exist.
 * Question parts that were archived (removed in an earlier revision) are not part of the aggregate.
 */
export async function loadContentAggregate<T extends WorkflowEntityType>(tx: Tx, entityType: T, id: string): Promise<ContentAggregates[T] | null> {
  switch (entityType) {
    case "LESSON": {
      const row = await tx.lesson.findUnique({
        where: { id },
        include: {
          topics: { select: { topicId: true, isPrimary: true, sortOrder: true } },
          objectives: { select: { objectiveId: true } },
          practiceLinks: { select: { questionId: true, sortOrder: true } },
        },
      });
      if (!row) return null;
      const { topics, objectives, practiceLinks, ...lesson } = row;
      return { lesson, topics, objectives: objectives.map((o) => o.objectiveId), questions: practiceLinks } as unknown as ContentAggregates[T];
    }
    case "QUESTION": {
      const row = await tx.question.findUnique({ where: { id }, include: QUESTION_INCLUDE });
      if (!row) return null;
      const { topics, objectives, ...question } = row;
      return {
        question: question as unknown as SnapshotQuestionRow,
        topics,
        objectives: objectives.map((o) => o.objectiveId),
      } as ContentAggregates[T];
    }
    case "FLASHCARD": {
      const row = await tx.flashcard.findUnique({ where: { id }, include: { topics: { select: { topicId: true, isPrimary: true, sortOrder: true } } } });
      if (!row) return null;
      const { topics, ...flashcard } = row;
      return { flashcard, topics } as unknown as ContentAggregates[T];
    }
    case "ASSESSMENT": {
      const row = await tx.assessment.findUnique({
        where: { id },
        include: {
          sections: {
            orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
            include: { items: { orderBy: [{ sortOrder: "asc" }, { id: "asc" }] }, rules: { orderBy: [{ sortOrder: "asc" }, { id: "asc" }] } },
          },
          topics: { select: { topicId: true } },
        },
      });
      if (!row) return null;
      const { sections, topics, ...assessment } = row;
      return { assessment, sections, topics: topics.map((t) => t.topicId) } as unknown as ContentAggregates[T];
    }
    case "STUDY_PACK": {
      const row = await tx.studyPack.findUnique({ where: { id }, include: { scopes: true } });
      if (!row) return null;
      const { scopes, ...studyPack } = row;
      return { studyPack, scopes } as unknown as ContentAggregates[T];
    }
    case "STUDY_PLAN_TEMPLATE": {
      const row = await tx.studyPlanTemplate.findUnique({
        where: { id },
        include: { items: { orderBy: [{ weekNumber: "asc" }, { sortOrder: "asc" }] } },
      });
      if (!row) return null;
      const { items, ...template } = row;
      return { template, items } as unknown as ContentAggregates[T];
    }
    default:
      throw new AppError("BAD_REQUEST", "Unsupported content type.");
  }
}

function aggregateRoot<T extends WorkflowEntityType>(entityType: T, aggregate: ContentAggregates[T]): Row {
  switch (entityType) {
    case "LESSON":
      return (aggregate as ContentAggregates["LESSON"]).lesson;
    case "QUESTION":
      return (aggregate as ContentAggregates["QUESTION"]).question;
    case "FLASHCARD":
      return (aggregate as ContentAggregates["FLASHCARD"]).flashcard;
    case "ASSESSMENT":
      return (aggregate as ContentAggregates["ASSESSMENT"]).assessment;
    case "STUDY_PACK":
      return (aggregate as ContentAggregates["STUDY_PACK"]).studyPack;
    default:
      return (aggregate as ContentAggregates["STUDY_PLAN_TEMPLATE"]).template;
  }
}

// =====================================================================================================================
// Workflow row access
// =====================================================================================================================

interface WorkflowRow {
  id: string;
  status: ContentStatus;
  revision: number;
  draftOfId: string | null;
  createdById: string | null;
  approvedById: string | null;
  aiGenerated: boolean;
  schoolId: string | null;
  ownerUserId: string | null;
  parentId: string | null;
}

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function assertEntityType(entityType: string): asserts entityType is WorkflowEntityType {
  if (!(WORKFLOW_ENTITY_TYPES as readonly string[]).includes(entityType)) throw new AppError("BAD_REQUEST", "Unsupported content type.");
}

/** Reads and row-locks (FOR UPDATE) the workflow columns of a content row. */
async function lockRow(tx: Tx, entityType: WorkflowEntityType, id: string): Promise<WorkflowRow> {
  assertEntityType(entityType);
  if (!UUID_PATTERN.test(id)) throw AppError.notFound("Content not found.", { entityType, id });
  // The table identifier comes from a closed constant map (never user input); values are bound parameters.
  const table = Prisma.raw(`"${TABLES[entityType]}"`);
  const rows = await tx.$queryRaw<{ row: Row }[]>`SELECT to_jsonb(t) AS "row" FROM ${table} t WHERE t."id" = ${id}::uuid FOR UPDATE`;
  const row = rows[0]?.row;
  if (!row) throw AppError.notFound("Content not found.", { entityType, id });
  const str = (key: string): string | null => (typeof row[key] === "string" ? (row[key] as string) : null);
  return {
    id: String(row.id),
    status: row.status as ContentStatus,
    revision: Number(row.revision),
    draftOfId: str("draftOfId"),
    createdById: str("createdById"),
    approvedById: str("approvedById"),
    aiGenerated: row.aiGenerated === true,
    schoolId: str("schoolId"),
    ownerUserId: str("ownerUserId"),
    parentId: str("parentId"),
  };
}

/** Platform content follows the full editorial workflow (content_is_platform in the migration). */
function isPlatform(row: WorkflowRow): boolean {
  return row.schoolId === null && row.ownerUserId === null;
}

function assertWorkflowRow(entityType: WorkflowEntityType, row: WorkflowRow): void {
  if (entityType === "FLASHCARD" && row.ownerUserId !== null) {
    throw new AppError("BAD_REQUEST", "Personal flashcards have no editorial workflow.");
  }
  if (entityType === "QUESTION" && row.parentId !== null) {
    throw new AppError("BAD_REQUEST", "Question parts follow their root question; act on the root.");
  }
}

interface WorkflowPatch {
  status?: ContentStatus;
  revision?: number;
  createdById?: string | null;
  reviewedById?: string | null;
  reviewedAt?: Date | null;
  reviewNotes?: string | null;
  approvedById?: string | null;
  approvedAt?: Date | null;
  publishedAt?: Date | null;
  archivedAt?: Date | null;
}

async function updateRoot(tx: Tx, entityType: WorkflowEntityType, id: string, data: Row): Promise<void> {
  const where = { id };
  switch (entityType) {
    case "LESSON":
      await tx.lesson.update({ where, data: data as Prisma.LessonUncheckedUpdateInput });
      return;
    case "QUESTION":
      await tx.question.update({ where, data: data as Prisma.QuestionUncheckedUpdateInput });
      return;
    case "FLASHCARD":
      await tx.flashcard.update({ where, data: data as Prisma.FlashcardUncheckedUpdateInput });
      return;
    case "ASSESSMENT":
      await tx.assessment.update({ where, data: data as Prisma.AssessmentUncheckedUpdateInput });
      return;
    case "STUDY_PACK":
      await tx.studyPack.update({ where, data: data as Prisma.StudyPackUncheckedUpdateInput });
      return;
    case "STUDY_PLAN_TEMPLATE":
      await tx.studyPlanTemplate.update({ where, data: data as Prisma.StudyPlanTemplateUncheckedUpdateInput });
      return;
  }
}

async function deleteRoot(tx: Tx, entityType: WorkflowEntityType, id: string): Promise<void> {
  const where = { id };
  switch (entityType) {
    case "LESSON":
      await tx.lesson.delete({ where });
      return;
    case "QUESTION":
      await tx.question.delete({ where });
      return;
    case "FLASHCARD":
      await tx.flashcard.delete({ where });
      return;
    case "ASSESSMENT":
      await tx.assessment.delete({ where });
      return;
    case "STUDY_PACK":
      await tx.studyPack.delete({ where });
      return;
    case "STUDY_PLAN_TEMPLATE":
      await tx.studyPlanTemplate.delete({ where });
      return;
  }
}

/** Ids of a question's live (non-archived) parts and sub-parts. */
async function livePartIds(tx: Tx, rootId: string): Promise<string[]> {
  const level1 = await tx.question.findMany({ where: { parentId: rootId, status: { not: "ARCHIVED" } }, select: { id: true } });
  const ids = level1.map((p) => p.id);
  if (ids.length === 0) return [];
  const level2 = await tx.question.findMany({ where: { parentId: { in: ids }, status: { not: "ARCHIVED" } }, select: { id: true } });
  return [...ids, ...level2.map((p) => p.id)];
}

const FORWARD: readonly ContentStatus[] = ["DRAFT", "IN_REVIEW", "APPROVED", "PUBLISHED"];

/**
 * Moves question parts to the root's status through legal workflow steps (parts are platform rows for the
 * content_workflow_guard too, so DRAFT → APPROVED must pass IN_REVIEW).
 */
async function mirrorParts(tx: Tx, rootId: string, target: ContentStatus, now: Date): Promise<void> {
  const ids = await livePartIds(tx, rootId);
  if (ids.length === 0) return;
  if (target === "DRAFT") {
    await tx.question.updateMany({ where: { id: { in: ids }, status: { in: ["IN_REVIEW", "APPROVED"] } }, data: { status: "DRAFT" } });
    return;
  }
  if (target === "ARCHIVED") {
    await tx.question.updateMany({ where: { id: { in: ids }, status: "PUBLISHED" }, data: { status: "ARCHIVED", archivedAt: now } });
    return;
  }
  const end = FORWARD.indexOf(target);
  for (let step = 1; step <= end; step += 1) {
    const from = FORWARD[step - 1] as ContentStatus;
    const to = FORWARD[step] as ContentStatus;
    await tx.question.updateMany({
      where: { id: { in: ids }, status: from },
      data: to === "PUBLISHED" ? { status: to, publishedAt: now } : { status: to },
    });
  }
}

async function fourEyesOn(tx: Tx): Promise<boolean> {
  const rows = await tx.$queryRaw<{ v: string | null }[]>`SELECT current_setting('app.four_eyes', true) AS "v"`;
  return rows[0]?.v === "on";
}

async function writeAudit(tx: Tx, actor: ContentActor, action: AuditAction, entityType: WorkflowEntityType, id: string, metadata: Record<string, unknown>): Promise<void> {
  await auditInTx(tx, { ...auditActorFields(actor), action, entityType: TABLES[entityType], entityId: id, metadata });
}

function actorUserId(actor: ContentActor): string | null {
  return actor.kind === "user" ? actor.userId : null;
}

function isUniqueViolation(error: unknown): boolean {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002";
}

// =====================================================================================================================
// Workflow transitions
// =====================================================================================================================

/**
 * DRAFT → IN_REVIEW (live rows or draft copies). Runs the authoring checks first ({@link collectContentIssues}):
 * AppError VALIDATION lists what to fix. AppError CONFLICT when the row is not a DRAFT.
 */
export async function submitForReview(tx: Tx, entityType: WorkflowEntityType, id: string, actor: ContentActor): Promise<WorkflowResult> {
  const row = await lockRow(tx, entityType, id);
  assertWorkflowRow(entityType, row);
  if (row.status !== "DRAFT") throw AppError.conflict("Only drafts can be submitted for review.", { entityType, id, status: row.status });
  const aggregate = await loadContentAggregate(tx, entityType, id);
  if (!aggregate) throw AppError.notFound("Content not found.");
  await assertNoIssues(tx, entityType, aggregate);
  await updateRoot(tx, entityType, id, { status: "IN_REVIEW", reviewNotes: null } satisfies WorkflowPatch);
  if (entityType === "QUESTION") await mirrorParts(tx, id, "IN_REVIEW", new Date());
  void actor;
  return { id, status: "IN_REVIEW", revision: row.revision };
}

/**
 * IN_REVIEW or APPROVED → DRAFT with reviewer notes (the reviewer asks for changes). Clears the approval.
 */
export async function requestChanges(tx: Tx, entityType: WorkflowEntityType, id: string, actor: ContentActor, notes: string): Promise<WorkflowResult> {
  const row = await lockRow(tx, entityType, id);
  assertWorkflowRow(entityType, row);
  if (row.status !== "IN_REVIEW" && row.status !== "APPROVED") {
    throw AppError.conflict("Only content in review or approved can be sent back.", { entityType, id, status: row.status });
  }
  const now = new Date();
  await updateRoot(tx, entityType, id, {
    status: "DRAFT",
    reviewNotes: notes.trim() === "" ? null : notes.trim().slice(0, 5_000),
    reviewedById: actorUserId(actor),
    reviewedAt: now,
    approvedById: null,
    approvedAt: null,
  } satisfies WorkflowPatch);
  if (entityType === "QUESTION") await mirrorParts(tx, id, "DRAFT", now);
  return { id, status: "DRAFT", revision: row.revision };
}

export interface ApproveOptions {
  /** Reviewer feedback kept on the row (`reviewNotes`). */
  notes?: string | null;
}

/**
 * IN_REVIEW → APPROVED by a PERSON (§41: AI drafts are never published without a human approver). Records
 * `approvedById` / `approvedAt` (and the review). With `app.four_eyes = 'on'` (production default) the approver must
 * differ from the author of this revision (`createdById`) for platform content.
 *
 * @throws AppError FORBIDDEN (system actor, four-eyes), CONFLICT (not in review), VALIDATION (authoring problems)
 */
export async function approve(tx: Tx, entityType: WorkflowEntityType, id: string, actor: ContentActor, options: ApproveOptions = {}): Promise<WorkflowResult> {
  if (actor.kind !== "user") throw AppError.forbidden("Content must be approved by a person.");
  const row = await lockRow(tx, entityType, id);
  assertWorkflowRow(entityType, row);
  if (row.status !== "IN_REVIEW") throw AppError.conflict("Only content in review can be approved.", { entityType, id, status: row.status });
  if (isPlatform(row) && row.createdById !== null && row.createdById === actor.userId && (await fourEyesOn(tx))) {
    throw AppError.forbidden("Another editor must approve this: authors cannot approve their own work.");
  }
  const aggregate = await loadContentAggregate(tx, entityType, id);
  if (!aggregate) throw AppError.notFound("Content not found.");
  await assertNoIssues(tx, entityType, aggregate);
  const now = new Date();
  await updateRoot(tx, entityType, id, {
    status: "APPROVED",
    approvedById: actor.userId,
    approvedAt: now,
    reviewedById: actor.userId,
    reviewedAt: now,
    ...(options.notes !== undefined ? { reviewNotes: options.notes } : {}),
  } satisfies WorkflowPatch);
  if (entityType === "QUESTION") await mirrorParts(tx, id, "APPROVED", now);
  await writeAudit(tx, actor, AUDIT_ACTIONS.CONTENT_APPROVE, entityType, id, { revision: row.revision, aiGenerated: row.aiGenerated });
  return { id, status: "APPROVED", revision: row.revision };
}

export interface PublishOptions {
  /** Shown in the revision history. */
  changeNote?: string | null;
}

/**
 * Publishes content (see the module header).
 *
 * `id` may be: an APPROVED live row (first publication, or re-publication after re-opening); an APPROVED draft copy
 * (publish merge into its live row); or a PUBLISHED live row whose draft copy is APPROVED. School / tutor content may
 * be published from any unpublished status. AI-generated content needs a human approver (CHECK `*_ai_approval_chk`).
 *
 * @throws AppError CONFLICT (wrong status, live row not published, slug clash), FORBIDDEN (AI content without a human
 *         approver), VALIDATION (authoring problems), NOT_FOUND
 */
export async function publish(tx: Tx, entityType: WorkflowEntityType, id: string, actor: ContentActor, options: PublishOptions = {}): Promise<PublishResult> {
  let row = await lockRow(tx, entityType, id);
  assertWorkflowRow(entityType, row);
  if (row.draftOfId === null && row.status === "PUBLISHED") {
    const draft = await findDraftCopyId(tx, entityType, row.id);
    if (!draft) throw AppError.conflict("This content is already published.", { entityType, id });
    row = await lockRow(tx, entityType, draft);
  }
  const allowed: readonly ContentStatus[] = isPlatform(row) ? ["APPROVED"] : ["DRAFT", "IN_REVIEW", "APPROVED"];
  if (!allowed.includes(row.status)) {
    throw AppError.conflict(isPlatform(row) ? "Content must be approved before it is published." : "This content cannot be published now.", {
      entityType,
      id: row.id,
      status: row.status,
    });
  }
  if (row.aiGenerated && row.approvedById === null) throw AppError.forbidden("AI-generated content must be approved by a person before it is published.");

  try {
    return row.draftOfId === null ? await publishLive(tx, entityType, row, actor, options) : await publishMerge(tx, entityType, row, actor, options);
  } catch (error) {
    if (isUniqueViolation(error)) throw AppError.conflict("Another live item already uses this slug or reference.", { entityType, id: row.id });
    throw error;
  }
}

async function findDraftCopyId(tx: Tx, entityType: WorkflowEntityType, liveId: string): Promise<string | null> {
  const where = { draftOfId: liveId };
  const select = { id: true } as const;
  switch (entityType) {
    case "LESSON":
      return (await tx.lesson.findUnique({ where, select }))?.id ?? null;
    case "QUESTION":
      return (await tx.question.findUnique({ where, select }))?.id ?? null;
    case "FLASHCARD":
      return (await tx.flashcard.findUnique({ where, select }))?.id ?? null;
    case "ASSESSMENT":
      return (await tx.assessment.findUnique({ where, select }))?.id ?? null;
    case "STUDY_PACK":
      return (await tx.studyPack.findUnique({ where, select }))?.id ?? null;
    case "STUDY_PLAN_TEMPLATE":
      return (await tx.studyPlanTemplate.findUnique({ where, select }))?.id ?? null;
  }
}

/** First publication of a live row (or re-publication after it was re-opened). */
async function publishLive(tx: Tx, entityType: WorkflowEntityType, row: WorkflowRow, actor: ContentActor, options: PublishOptions): Promise<PublishResult> {
  const aggregate = await loadContentAggregate(tx, entityType, row.id);
  if (!aggregate) throw AppError.notFound("Content not found.");
  await assertNoIssues(tx, entityType, aggregate);
  const now = new Date();
  await setContentPublishContext(tx, row.id);
  await updateRoot(tx, entityType, row.id, { status: "PUBLISHED", publishedAt: now } satisfies WorkflowPatch);
  if (entityType === "QUESTION") await mirrorParts(tx, row.id, "PUBLISHED", now);
  const revision = await recordSnapshot(tx, entityType, row.id, row.createdById ?? actorUserId(actor), options.changeNote ?? null);
  await writeAudit(tx, actor, AUDIT_ACTIONS.CONTENT_PUBLISH, entityType, row.id, { revision: row.revision, firstPublication: true });
  return { id: row.id, revision: row.revision, changed: true, revisionId: revision.id, contentHash: revision.contentHash, mergedDraftId: null };
}

/** The publish merge of an approved draft copy into its PUBLISHED live row. */
async function publishMerge(tx: Tx, entityType: WorkflowEntityType, draftRow: WorkflowRow, actor: ContentActor, options: PublishOptions): Promise<PublishResult> {
  const liveId = draftRow.draftOfId as string;
  const live = await lockRow(tx, entityType, liveId);
  if (live.status !== "PUBLISHED") throw AppError.conflict("The live version is no longer published; discard this draft copy.", { entityType, liveId });

  const draft = await loadContentAggregate(tx, entityType, draftRow.id);
  const current = await loadContentAggregate(tx, entityType, liveId);
  if (!draft || !current) throw AppError.notFound("Content not found.");
  await assertNoIssues(tx, entityType, draft);

  await setContentPublishContext(tx, liveId);
  if (contentProjection(entityType, draft) === contentProjection(entityType, current)) {
    await deleteRoot(tx, entityType, draftRow.id);
    return { id: liveId, revision: live.revision, changed: false, revisionId: null, contentHash: null, mergedDraftId: draftRow.id };
  }

  const now = new Date();
  const draftRoot = aggregateRoot(entityType, draft);
  const revision = live.revision + 1;
  const fields = entityFields(entityType);
  await updateRoot(tx, entityType, liveId, {
    ...writable(draftRoot, [...fields.copy, ...fields.caches]),
    revision,
    aiGenerated: live.aiGenerated || draftRow.aiGenerated,
    ...(draftRoot.generationJobId ? { generationJobId: draftRoot.generationJobId } : {}),
    approvedById: draftRoot.approvedById ?? null,
    approvedAt: draftRoot.approvedAt ?? null,
    reviewedById: draftRoot.reviewedById ?? null,
    reviewedAt: draftRoot.reviewedAt ?? null,
    reviewNotes: draftRoot.reviewNotes ?? null,
    publishedAt: now,
  });
  await mergeChildren(tx, entityType, liveId, draft, current, now);
  await deleteRoot(tx, entityType, draftRow.id);
  const snapshot = await recordSnapshot(tx, entityType, liveId, draftRow.createdById ?? actorUserId(actor), options.changeNote ?? null);
  await writeAudit(tx, actor, AUDIT_ACTIONS.CONTENT_PUBLISH, entityType, liveId, { revision, mergedDraftId: draftRow.id });
  return { id: liveId, revision, changed: true, revisionId: snapshot.id, contentHash: snapshot.contentHash, mergedDraftId: draftRow.id };
}

/**
 * PUBLISHED → ARCHIVED (no content change). Students stop seeing the item; history keeps rendering from snapshots.
 * Refused while a draft copy is pending (publish or {@link discardDraftCopy} it first).
 */
export async function archive(tx: Tx, entityType: WorkflowEntityType, id: string, actor: ContentActor): Promise<WorkflowResult> {
  const row = await lockRow(tx, entityType, id);
  assertWorkflowRow(entityType, row);
  if (row.draftOfId !== null) throw new AppError("BAD_REQUEST", "Draft copies are discarded, not archived.");
  if (row.status !== "PUBLISHED") throw AppError.conflict("Only published content can be archived.", { entityType, id, status: row.status });
  if (await findDraftCopyId(tx, entityType, id)) throw AppError.conflict("Publish or discard the pending draft copy before archiving.");
  const now = new Date();
  await updateRoot(tx, entityType, id, { status: "ARCHIVED", archivedAt: now } satisfies WorkflowPatch);
  if (entityType === "QUESTION") await mirrorParts(tx, id, "ARCHIVED", now);
  await writeAudit(tx, actor, AUDIT_ACTIONS.CONTENT_ARCHIVE, entityType, id, { revision: row.revision });
  return { id, status: "ARCHIVED", revision: row.revision };
}

/**
 * ARCHIVED → DRAFT ("Restore to draft"): the row is edited directly again (it is not live, so no draft copy) and starts
 * revision + 1 (C1.5 `content_published_immutable`: re-opening archived content must start a new revision, so the
 * snapshot students saw at the old revision stays exact). The actor becomes the author of the new revision
 * (`createdById`, for four-eyes) and the previous approval and review are cleared: it must be reviewed, approved and
 * published again. Question parts archived TOGETHER with the root (same `archivedAt`, see {@link archive}) are reopened
 * the same way; parts an earlier publish merge archived (removed from the question) stay archived.
 *
 * Search index / media usage / caches are the caller's (the item is not PUBLISHED, so it has no search document).
 *
 * @throws AppError CONFLICT (not archived), BAD_REQUEST (a draft copy, a part, a personal flashcard), NOT_FOUND
 */
export async function reopenArchived(tx: Tx, entityType: WorkflowEntityType, id: string, actor: ContentActor): Promise<WorkflowResult> {
  const row = await lockRow(tx, entityType, id);
  assertWorkflowRow(entityType, row);
  if (row.draftOfId !== null) throw new AppError("BAD_REQUEST", "Draft copies are discarded, not archived.");
  if (row.status !== "ARCHIVED") throw AppError.conflict("Only archived content can be restored to draft.", { entityType, id, status: row.status });
  const revision = row.revision + 1;
  // Read before the root update clears it: parts archived with the root share its archivedAt (archive() uses one `now`).
  const archivedAt = entityType === "QUESTION" ? ((await tx.question.findUnique({ where: { id }, select: { archivedAt: true } }))?.archivedAt ?? null) : null;
  await updateRoot(tx, entityType, id, {
    status: "DRAFT",
    revision,
    archivedAt: null,
    createdById: actorUserId(actor),
    reviewedById: null,
    reviewedAt: null,
    reviewNotes: null,
    approvedById: null,
    approvedAt: null,
  } satisfies WorkflowPatch);
  if (entityType === "QUESTION") await reopenArchivedParts(tx, id, archivedAt);
  await writeAudit(tx, actor, AUDIT_ACTIONS.CONTENT_REOPEN, entityType, id, { fromRevision: row.revision, revision });
  return { id, status: "DRAFT", revision };
}

/** Parts (and sub-parts) archived together with their root at `archivedAt` → DRAFT, each at its own revision + 1. */
async function reopenArchivedParts(tx: Tx, rootId: string, archivedAt: Date | null): Promise<void> {
  const level1 = await tx.question.findMany({ where: { parentId: rootId, status: "ARCHIVED", archivedAt }, select: { id: true } });
  if (level1.length === 0) return;
  const level1Ids = level1.map((p) => p.id);
  const level2 = await tx.question.findMany({ where: { parentId: { in: level1Ids }, status: "ARCHIVED", archivedAt }, select: { id: true } });
  await tx.question.updateMany({
    where: { id: { in: [...level1Ids, ...level2.map((p) => p.id)] }, status: "ARCHIVED" },
    data: { status: "DRAFT", revision: { increment: 1 }, archivedAt: null },
  });
}

/** Deletes an unpublished draft copy (the live row is untouched). */
export async function discardDraftCopy(tx: Tx, entityType: WorkflowEntityType, draftId: string, actor: ContentActor): Promise<void> {
  const row = await lockRow(tx, entityType, draftId);
  if (row.draftOfId === null) throw new AppError("BAD_REQUEST", "Only draft copies can be discarded.");
  await deleteRoot(tx, entityType, draftId);
  void actor;
}

// =====================================================================================================================
// Snapshots (DB)
// =====================================================================================================================

/** Inserts (idempotently) the ContentRevision snapshot of a live PUBLISHED row at its current revision. */
async function recordSnapshot(tx: Tx, entityType: WorkflowEntityType, id: string, authorId: string | null, note: string | null): Promise<{ id: string; contentHash: string }> {
  if (entityType === "QUESTION") {
    const recorded = await recordRevisionSnapshot(tx, id, authorId, note);
    return { id: recorded.id, contentHash: recorded.contentHash };
  }
  const aggregate = await loadContentAggregate(tx, entityType, id);
  if (!aggregate) throw AppError.notFound("Content not found.");
  const root = aggregateRoot(entityType, aggregate);
  const built = buildSnapshot(entityType, aggregate);
  const revision = Number(root.revision);
  const existing = await tx.contentRevision.findUnique({
    where: { entityType_entityId_revision: { entityType, entityId: id, revision } },
    select: { id: true, contentHash: true },
  });
  if (existing) {
    if (existing.contentHash === built.contentHash) return existing;
    throw AppError.conflict("This revision was already published with different content. Publish a new revision instead.", { entityType, id, revision });
  }
  return tx.contentRevision.create({
    data: {
      entityType,
      entityId: id,
      revision,
      schemaVersion: built.schemaVersion,
      snapshot: built.snapshot as Prisma.InputJsonObject,
      contentHash: built.contentHash,
      authorId,
      approvedById: typeof root.approvedById === "string" ? root.approvedById : null,
      changeNote: note,
      aiGenerated: root.aiGenerated === true,
    },
    select: { id: true, contentHash: true },
  });
}

// =====================================================================================================================
// Draft copies
// =====================================================================================================================

function entityFields(entityType: WorkflowEntityType): { copy: readonly string[]; caches: readonly string[] } {
  switch (entityType) {
    case "LESSON":
      return { copy: LESSON_FIELDS, caches: LESSON_CACHES };
    case "QUESTION":
      return { copy: QUESTION_FIELDS, caches: QUESTION_CACHES };
    case "FLASHCARD":
      return { copy: FLASHCARD_FIELDS, caches: FLASHCARD_CACHES };
    case "ASSESSMENT":
      return { copy: ASSESSMENT_FIELDS, caches: [] };
    case "STUDY_PACK":
      return { copy: STUDY_PACK_FIELDS, caches: [] };
    case "STUDY_PLAN_TEMPLATE":
      return { copy: TEMPLATE_FIELDS, caches: [] };
  }
}

/**
 * Starts editing PUBLISHED content: creates (or returns the existing) sibling DRAFT row with `draftOfId = live.id`,
 * `revision = live.revision + 1`, the editor as `createdById` (the author of the new revision, for four-eyes) and
 * copies of the live row's children and tags. Students keep seeing the live row until {@link publish} merges it.
 *
 * @throws AppError CONFLICT (not published), BAD_REQUEST (a draft copy, a part, a personal flashcard)
 */
export async function createDraftCopyForEdit(tx: Tx, entityType: WorkflowEntityType, liveId: string, actor: ContentActor): Promise<DraftCopy> {
  const live = await lockRow(tx, entityType, liveId);
  assertWorkflowRow(entityType, live);
  if (live.draftOfId !== null) throw new AppError("BAD_REQUEST", "This is already a draft copy.");
  if (live.status !== "PUBLISHED") throw AppError.conflict("Only published content is edited through a draft copy; edit the draft directly.", { entityType, liveId });
  const existing = await findDraftCopyId(tx, entityType, liveId);
  if (existing) return { id: existing, draftOfId: liveId, revision: live.revision + 1, created: false };

  const aggregate = await loadContentAggregate(tx, entityType, liveId);
  if (!aggregate) throw AppError.notFound("Content not found.");
  const root = aggregateRoot(entityType, aggregate);
  const fields = entityFields(entityType);
  const base: Row = {
    ...writable(root, [...fields.copy, ...fields.caches]),
    status: "DRAFT",
    revision: live.revision + 1,
    draftOfId: liveId,
    createdById: actorUserId(actor),
    aiGenerated: live.aiGenerated,
    generationJobId: root.generationJobId ?? null,
  };
  const id = await insertDraftRoot(tx, entityType, base, root);
  await copyChildren(tx, entityType, aggregate, id);
  return { id, draftOfId: liveId, revision: live.revision + 1, created: true };
}

async function insertDraftRoot(tx: Tx, entityType: WorkflowEntityType, base: Row, root: Row): Promise<string> {
  const select = { id: true } as const;
  switch (entityType) {
    case "LESSON":
      return (await tx.lesson.create({ data: base as Prisma.LessonUncheckedCreateInput, select })).id;
    case "QUESTION":
      return (
        await tx.question.create({
          data: { ...base, schoolId: root.schoolId ?? null, ownerUserId: root.ownerUserId ?? null } as Prisma.QuestionUncheckedCreateInput,
          select,
        })
      ).id;
    case "FLASHCARD":
      return (await tx.flashcard.create({ data: base as Prisma.FlashcardUncheckedCreateInput, select })).id;
    case "ASSESSMENT":
      return (
        await tx.assessment.create({
          data: { ...base, schoolId: root.schoolId ?? null, ownerUserId: root.ownerUserId ?? null } as Prisma.AssessmentUncheckedCreateInput,
          select,
        })
      ).id;
    case "STUDY_PACK":
      return (await tx.studyPack.create({ data: base as Prisma.StudyPackUncheckedCreateInput, select })).id;
    case "STUDY_PLAN_TEMPLATE":
      return (await tx.studyPlanTemplate.create({ data: base as Prisma.StudyPlanTemplateUncheckedCreateInput, select })).id;
  }
}

/** Inserts question parts (recursively) under `parentId`; `draftOf` links each new part to the part it copies. */
async function insertParts(
  tx: Tx,
  parts: readonly SnapshotQuestionRow[],
  parentId: string,
  base: { status: ContentStatus; asDraftCopy: boolean; publishedAt: Date | null; schoolId: string | null; ownerUserId: string | null },
): Promise<void> {
  for (const part of parts) {
    const created = await tx.question.create({
      data: {
        ...writable(part, [...PART_FIELDS, ...QUESTION_CACHES]),
        parentId,
        status: base.status,
        revision: base.asDraftCopy ? Number(part.revision) + 1 : 1,
        draftOfId: base.asDraftCopy ? part.id : null,
        publishedAt: base.publishedAt,
        schoolId: base.schoolId,
        ownerUserId: base.ownerUserId,
        aiGenerated: part.aiGenerated === true,
      } as Prisma.QuestionUncheckedCreateInput,
      select: { id: true },
    });
    if (part.options.length > 0) {
      await tx.questionOption.createMany({ data: part.options.map((o) => ({ ...pick(o, OPTION_FIELDS), questionId: created.id }) as Prisma.QuestionOptionCreateManyInput) });
    }
    if (part.parts && part.parts.length > 0) await insertParts(tx, part.parts, created.id, base);
  }
}

async function copyChildren<T extends WorkflowEntityType>(tx: Tx, entityType: T, aggregate: ContentAggregates[T], newId: string): Promise<void> {
  switch (entityType) {
    case "LESSON": {
      const a = aggregate as ContentAggregates["LESSON"];
      if (a.topics.length > 0) await tx.lessonTopic.createMany({ data: a.topics.map((t) => ({ ...t, lessonId: newId })) });
      if (a.objectives.length > 0) await tx.lessonObjective.createMany({ data: a.objectives.map((objectiveId) => ({ lessonId: newId, objectiveId })) });
      if (a.questions.length > 0) await tx.lessonQuestion.createMany({ data: a.questions.map((q) => ({ ...q, lessonId: newId })) });
      return;
    }
    case "QUESTION": {
      const a = aggregate as ContentAggregates["QUESTION"];
      const root = a.question;
      if (root.options.length > 0) {
        await tx.questionOption.createMany({ data: root.options.map((o) => ({ ...pick(o, OPTION_FIELDS), questionId: newId }) as Prisma.QuestionOptionCreateManyInput) });
      }
      await insertParts(tx, root.parts ?? [], newId, {
        status: "DRAFT",
        asDraftCopy: true,
        publishedAt: null,
        schoolId: (root.schoolId as string | null) ?? null,
        ownerUserId: (root.ownerUserId as string | null) ?? null,
      });
      const subjectId = String(root.subjectId);
      if (a.topics.length > 0) {
        const subjects = await syllabusSubjects(tx, a.topics.map((t) => t.syllabusId));
        await tx.questionTopic.createMany({
          data: a.topics.map((t) => ({ questionId: newId, topicId: t.topicId, syllabusId: t.syllabusId, subjectId: subjects.get(t.syllabusId) ?? subjectId, isPrimary: t.isPrimary })),
        });
      }
      if (a.objectives.length > 0) await tx.questionObjective.createMany({ data: a.objectives.map((objectiveId) => ({ questionId: newId, objectiveId })) });
      return;
    }
    case "FLASHCARD": {
      const a = aggregate as ContentAggregates["FLASHCARD"];
      if (a.topics.length > 0) await tx.flashcardTopic.createMany({ data: a.topics.map((t) => ({ ...t, flashcardId: newId })) });
      return;
    }
    case "ASSESSMENT": {
      const a = aggregate as ContentAggregates["ASSESSMENT"];
      await insertSections(tx, newId, a.sections);
      if (a.topics.length > 0) await tx.assessmentTopic.createMany({ data: a.topics.map((topicId) => ({ assessmentId: newId, topicId })) });
      return;
    }
    case "STUDY_PACK": {
      const a = aggregate as ContentAggregates["STUDY_PACK"];
      if (a.scopes.length > 0) {
        await tx.studyPackScope.createMany({ data: a.scopes.map((s) => ({ ...pick(s, SCOPE_FIELDS), studyPackId: newId }) as Prisma.StudyPackScopeCreateManyInput) });
      }
      return;
    }
    case "STUDY_PLAN_TEMPLATE": {
      const a = aggregate as ContentAggregates["STUDY_PLAN_TEMPLATE"];
      if (a.items.length > 0) {
        await tx.studyPlanTemplateItem.createMany({
          data: a.items.map((i) => ({ ...pick(i, TEMPLATE_ITEM_FIELDS), templateId: newId }) as Prisma.StudyPlanTemplateItemCreateManyInput),
        });
      }
      return;
    }
  }
}

async function insertSections(tx: Tx, assessmentId: string, sections: ContentAggregates["ASSESSMENT"]["sections"]): Promise<void> {
  for (const section of sections) {
    const created = await tx.assessmentSection.create({
      data: { ...pick(section, SECTION_FIELDS), assessmentId } as Prisma.AssessmentSectionUncheckedCreateInput,
      select: { id: true },
    });
    if (section.items.length > 0) {
      await tx.assessmentItem.createMany({ data: section.items.map((i) => ({ ...pick(i, ITEM_FIELDS), sectionId: created.id }) as Prisma.AssessmentItemCreateManyInput) });
    }
    if (section.rules.length > 0) {
      await tx.assessmentBlueprintRule.createMany({
        data: section.rules.map((r) => ({ ...pick(r, RULE_FIELDS), sectionId: created.id }) as Prisma.AssessmentBlueprintRuleCreateManyInput),
      });
    }
  }
}

async function syllabusSubjects(tx: Tx, syllabusIds: readonly string[]): Promise<Map<string, string>> {
  const rows = await tx.syllabus.findMany({ where: { id: { in: [...new Set(syllabusIds)] } }, select: { id: true, subjectId: true } });
  return new Map(rows.map((r) => [r.id, r.subjectId]));
}

// =====================================================================================================================
// Publish merge of children
// =====================================================================================================================

async function topicSyllabi(tx: Tx, topicIds: readonly string[]): Promise<Map<string, string>> {
  if (topicIds.length === 0) return new Map();
  const rows = await tx.topic.findMany({ where: { id: { in: [...new Set(topicIds)] } }, select: { id: true, syllabusId: true } });
  return new Map(rows.map((r) => [r.id, r.syllabusId]));
}

async function objectiveSyllabi(tx: Tx, objectiveIds: readonly string[]): Promise<Map<string, string>> {
  if (objectiveIds.length === 0) return new Map();
  const rows = await tx.learningObjective.findMany({
    where: { id: { in: [...new Set(objectiveIds)] } },
    select: { id: true, topic: { select: { syllabusId: true } } },
  });
  return new Map(rows.map((r) => [r.id, r.topic.syllabusId]));
}

/**
 * Tag merge rule: the draft's tags replace the live tags of every syllabus version that appears in the draft; live
 * tags of other versions (e.g. added by a syllabus-version clone while the copy was in review) are kept.
 */
function tagPlan<T>(live: readonly T[], draft: readonly T[], syllabusOf: (tag: T) => string | undefined): { remove: T[]; keep: T[] } {
  const replaced = new Set(draft.map(syllabusOf).filter((s): s is string => s !== undefined));
  const remove: T[] = [];
  const keep: T[] = [];
  for (const tag of live) (replaced.has(syllabusOf(tag) ?? "") ? remove : keep).push(tag);
  return { remove, keep };
}

async function mergeChildren<T extends WorkflowEntityType>(
  tx: Tx,
  entityType: T,
  liveId: string,
  draft: ContentAggregates[T],
  live: ContentAggregates[T],
  now: Date,
): Promise<void> {
  switch (entityType) {
    case "LESSON": {
      const d = draft as ContentAggregates["LESSON"];
      const l = live as ContentAggregates["LESSON"];
      await tx.lessonQuestion.deleteMany({ where: { lessonId: liveId } });
      if (d.questions.length > 0) await tx.lessonQuestion.createMany({ data: d.questions.map((q) => ({ ...q, lessonId: liveId })) });
      const syllabi = await topicSyllabi(tx, [...d.topics, ...l.topics].map((t) => t.topicId));
      const topics = tagPlan(l.topics, d.topics, (t) => syllabi.get(t.topicId));
      await tx.lessonTopic.deleteMany({ where: { lessonId: liveId, topicId: { in: topics.remove.map((t) => t.topicId) } } });
      if (d.topics.some((t) => t.isPrimary)) await tx.lessonTopic.updateMany({ where: { lessonId: liveId, isPrimary: true }, data: { isPrimary: false } });
      if (d.topics.length > 0) await tx.lessonTopic.createMany({ data: d.topics.map((t) => ({ ...t, lessonId: liveId })), skipDuplicates: true });
      const objSyllabi = await objectiveSyllabi(tx, [...d.objectives, ...l.objectives]);
      const objectives = tagPlan(l.objectives, d.objectives, (o) => objSyllabi.get(o));
      await tx.lessonObjective.deleteMany({ where: { lessonId: liveId, objectiveId: { in: objectives.remove } } });
      if (d.objectives.length > 0) {
        await tx.lessonObjective.createMany({ data: d.objectives.map((objectiveId) => ({ lessonId: liveId, objectiveId })), skipDuplicates: true });
      }
      return;
    }
    case "QUESTION": {
      const d = draft as ContentAggregates["QUESTION"];
      const l = live as ContentAggregates["QUESTION"];
      await mergeOptions(tx, liveId, d.question.options, l.question.options);
      await mergeParts(tx, liveId, d.question.parts ?? [], l.question.parts ?? [], now, {
        schoolId: (l.question.schoolId as string | null) ?? null,
        ownerUserId: (l.question.ownerUserId as string | null) ?? null,
      });
      const topics = tagPlan(l.topics, d.topics, (t) => t.syllabusId);
      for (const tag of topics.remove) await tx.questionTopic.delete({ where: { questionId_topicId: { questionId: liveId, topicId: tag.topicId } } });
      if (d.topics.length > 0) {
        const subjects = await syllabusSubjects(tx, d.topics.map((t) => t.syllabusId));
        await tx.questionTopic.createMany({
          data: d.topics.map((t) => ({
            questionId: liveId,
            topicId: t.topicId,
            syllabusId: t.syllabusId,
            subjectId: subjects.get(t.syllabusId) ?? String(d.question.subjectId),
            isPrimary: t.isPrimary,
          })),
          skipDuplicates: true,
        });
      }
      const objSyllabi = await objectiveSyllabi(tx, [...d.objectives, ...l.objectives]);
      const objectives = tagPlan(l.objectives, d.objectives, (o) => objSyllabi.get(o));
      await tx.questionObjective.deleteMany({ where: { questionId: liveId, objectiveId: { in: objectives.remove } } });
      if (d.objectives.length > 0) {
        await tx.questionObjective.createMany({ data: d.objectives.map((objectiveId) => ({ questionId: liveId, objectiveId })), skipDuplicates: true });
      }
      return;
    }
    case "FLASHCARD": {
      const d = draft as ContentAggregates["FLASHCARD"];
      const l = live as ContentAggregates["FLASHCARD"];
      const syllabi = await topicSyllabi(tx, [...d.topics, ...l.topics].map((t) => t.topicId));
      const topics = tagPlan(l.topics, d.topics, (t) => syllabi.get(t.topicId));
      await tx.flashcardTopic.deleteMany({ where: { flashcardId: liveId, topicId: { in: topics.remove.map((t) => t.topicId) } } });
      if (d.topics.some((t) => t.isPrimary)) await tx.flashcardTopic.updateMany({ where: { flashcardId: liveId, isPrimary: true }, data: { isPrimary: false } });
      if (d.topics.length > 0) await tx.flashcardTopic.createMany({ data: d.topics.map((t) => ({ ...t, flashcardId: liveId })), skipDuplicates: true });
      return;
    }
    case "ASSESSMENT": {
      const d = draft as ContentAggregates["ASSESSMENT"];
      const l = live as ContentAggregates["ASSESSMENT"];
      await tx.assessmentSection.deleteMany({ where: { assessmentId: liveId } });
      await insertSections(tx, liveId, d.sections);
      const syllabi = await topicSyllabi(tx, [...d.topics, ...l.topics]);
      const topics = tagPlan(l.topics, d.topics, (t) => syllabi.get(t));
      await tx.assessmentTopic.deleteMany({ where: { assessmentId: liveId, topicId: { in: topics.remove } } });
      if (d.topics.length > 0) {
        await tx.assessmentTopic.createMany({ data: d.topics.map((topicId) => ({ assessmentId: liveId, topicId })), skipDuplicates: true });
      }
      return;
    }
    case "STUDY_PACK": {
      const d = draft as ContentAggregates["STUDY_PACK"];
      await tx.studyPackScope.deleteMany({ where: { studyPackId: liveId } });
      if (d.scopes.length > 0) {
        await tx.studyPackScope.createMany({ data: d.scopes.map((s) => ({ ...pick(s, SCOPE_FIELDS), studyPackId: liveId }) as Prisma.StudyPackScopeCreateManyInput) });
      }
      return;
    }
    case "STUDY_PLAN_TEMPLATE": {
      const d = draft as ContentAggregates["STUDY_PLAN_TEMPLATE"];
      await tx.studyPlanTemplateItem.deleteMany({ where: { templateId: liveId } });
      if (d.items.length > 0) {
        await tx.studyPlanTemplateItem.createMany({
          data: d.items.map((i) => ({ ...pick(i, TEMPLATE_ITEM_FIELDS), templateId: liveId }) as Prisma.StudyPlanTemplateItemCreateManyInput),
        });
      }
      return;
    }
  }
}

/** Options are matched by their stable `key` (responses store keys): update in place, insert new, delete removed. */
async function mergeOptions(tx: Tx, questionId: string, draft: SnapshotQuestionRow["options"], live: SnapshotQuestionRow["options"]): Promise<void> {
  const liveByKey = new Map(live.map((o) => [o.key, o]));
  const draftKeys = new Set(draft.map((o) => o.key));
  const removed = live.filter((o) => !draftKeys.has(o.key)).map((o) => o.key);
  if (removed.length > 0) await tx.questionOption.deleteMany({ where: { questionId, key: { in: removed } } });
  for (const option of draft) {
    const data = pick(option, OPTION_FIELDS);
    const existing = liveByKey.get(option.key);
    if (!existing) {
      await tx.questionOption.create({ data: { ...data, questionId } as Prisma.QuestionOptionUncheckedCreateInput });
    } else if (canonicalJson(toJsonValue(data)) !== canonicalJson(toJsonValue(pick(existing, OPTION_FIELDS)))) {
      await tx.questionOption.update({ where: { questionId_key: { questionId, key: option.key } }, data: data as Prisma.QuestionOptionUncheckedUpdateInput });
    }
  }
}

function partProjection(part: SnapshotQuestionRow): string {
  return canonicalJson(toJsonValue(pick(part, PART_FIELDS)));
}

/**
 * Structured parts are matched by their own `draftOfId` (the live part each draft part copies). A changed part gets
 * `revision + 1` (content_published_immutable applies to every PUBLISHED row); new parts are inserted PUBLISHED; live
 * parts no longer in the draft are ARCHIVED (never deleted: old attempts' feedback names them).
 */
async function mergeParts(
  tx: Tx,
  parentId: string,
  draftParts: readonly SnapshotQuestionRow[],
  liveParts: readonly SnapshotQuestionRow[],
  now: Date,
  tenant: { schoolId: string | null; ownerUserId: string | null },
): Promise<void> {
  const liveById = new Map(liveParts.map((p) => [p.id, p]));
  const kept = new Set<string>();
  for (const part of draftParts) {
    const target = typeof part.draftOfId === "string" ? liveById.get(part.draftOfId) : undefined;
    if (!target) {
      await insertParts(tx, [part], parentId, { status: "PUBLISHED", asDraftCopy: false, publishedAt: now, ...tenant });
      continue;
    }
    kept.add(target.id);
    if (partProjection(part) !== partProjection(target)) {
      await tx.question.update({
        where: { id: target.id },
        data: {
          ...writable(part, [...PART_FIELDS, ...QUESTION_CACHES]),
          revision: Number(target.revision) + 1,
          aiGenerated: target.aiGenerated === true || part.aiGenerated === true,
        } as Prisma.QuestionUncheckedUpdateInput,
      });
    }
    await mergeOptions(tx, target.id, part.options, target.options);
    await mergeParts(tx, target.id, part.parts ?? [], target.parts ?? [], now, tenant);
  }
  const removed = liveParts.filter((p) => !kept.has(p.id));
  for (const part of removed) {
    const ids = [part.id, ...(part.parts ?? []).map((p) => p.id)];
    await tx.question.updateMany({ where: { id: { in: ids }, status: "PUBLISHED" }, data: { status: "ARCHIVED", archivedAt: now } });
  }
}
