import "server-only";
import { Prisma, type ContentStatus, type QuestionType } from "@/generated/prisma/client";
import { safeParseQuestionPayload, validateQuestionDefinition, type DefinitionIssue, type QuestionDefinitionInput } from "@/lib/questions";
import type { ContentWarning } from "@/lib/content/types";
import { loadAssetResolver, PIPELINE_VERSION, renderQuestionHtml, toRenderedJson } from "@/server/content/service";
import { renderContent, renderInline, type AssetResolver } from "@/server/content/render";
import type { PublishResult, WorkflowResult, DraftCopy } from "@/server/content/publish";
import type { DbClient } from "@/server/db";
import type { Tx } from "@/server/lib/db-context";
import { AppError, type FieldErrors } from "@/server/lib/errors";
import {
  afterUpdatedCursor,
  assertCanDraft,
  auditCms,
  CMS_CONTENT_AUDIT,
  CMS_CONTENT_OPERATIONS,
  decodeUpdatedCursor,
  inTransaction,
  PAGE_SIZE,
  parseInput,
  PERSON_SELECT,
  personName,
  readClient,
  updatedPage,
  type CmsActor,
  type CmsContext,
} from "./context";
import {
  definitionReport,
  issuesToFieldErrors,
  mergeFieldErrors,
  normaliseEditorDocument,
  normaliseTopicTags,
  plainExcerpt,
  provenanceProblems,
} from "./core";
import { syncMediaUsageFromAggregate } from "@/server/cms/media/usage";
import { clearMediaUsage } from "./media";
import {
  questionEditorSchema,
  questionFilterSchema,
  questionPickerSchema,
  questionUpdateSchema,
  type QuestionEditorData,
  type QuestionEditorInput,
} from "./schemas";
import {
  approveItem,
  archiveItem,
  reopenItem,
  discardItemDraftCopy,
  findPlatformRow,
  publishItem,
  requestItemChanges,
  startEditingItem,
  submitItem,
  type WorkflowHooks,
} from "./workflow";

/**
 * The question bank CMS (§9, §10, §25, §27, §42): list with filters and counts, the per-type editor document, create /
 * update / delete of drafts, readiness checks and the editorial workflow through the shared publish helper. Published
 * questions are never edited in place: editing starts a draft copy (revision + 1) that the publish merge folds back,
 * so attempts at revision N stay interpretable. Platform bank only (school / tutor questions are not shown).
 */

// =====================================================================================================================
// List
// =====================================================================================================================

export interface QuestionListRow {
  id: string;
  type: QuestionType;
  excerpt: string;
  status: ContentStatus;
  revision: number;
  aiGenerated: boolean;
  isDemo: boolean;
  /** Set when this row is the draft copy (edit) of a published question. */
  draftOfId: string | null;
  pendingDraft: { id: string; status: ContentStatus } | null;
  subject: string;
  board: string;
  qualification: string;
  primaryTopic: string | null;
  difficulty: number;
  marks: number;
  year: number | null;
  paperLabel: string | null;
  openFlags: number;
  author: string | null;
  updatedAt: Date;
}

export interface QuestionListResult {
  items: QuestionListRow[];
  nextCursor: string | null;
  /** Counts for the current filters, per status (ignoring the status filter) and per type (ignoring the type filter). */
  facets: { status: Partial<Record<ContentStatus, number>>; type: Partial<Record<QuestionType, number>> };
}

const OPEN_FLAG_STATUSES = ["OPEN", "IN_PROGRESS"] as const;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
/** Root rows of the platform bank (live rows and draft copies). */
const PLATFORM_ROOT = { parentId: null, schoolId: null, ownerUserId: null } satisfies Prisma.QuestionWhereInput;

async function topicSubtreeWhere(client: DbClient, topicId: string): Promise<Prisma.QuestionWhereInput> {
  const topic = await client.topic.findUnique({ where: { id: topicId }, select: { path: true } });
  if (!topic) return { id: { in: [] } };
  return { topics: { some: { topic: { OR: [{ id: topicId }, { path: { startsWith: `${topic.path}/` } }] } } } };
}

async function flaggedQuestionIds(client: DbClient): Promise<string[]> {
  const rows = await client.contentFlag.findMany({
    where: { entityType: "QUESTION", status: { in: [...OPEN_FLAG_STATUSES] } },
    select: { entityId: true },
    distinct: ["entityId"],
    take: 10_000,
  });
  return rows.map((r) => r.entityId);
}

/** Questions of the platform bank for `/admin/questions` (`content.draft`), newest edits first, cursor-paginated. */
export async function listQuestions(actor: CmsActor, raw: unknown, context: CmsContext = {}): Promise<QuestionListResult> {
  assertCanDraft(actor);
  const f = parseInput(questionFilterSchema, raw);
  const client = readClient(context);
  const cursor = decodeUpdatedCursor(f.cursor);

  const common: Prisma.QuestionWhereInput[] = [PLATFORM_ROOT];
  if (f.q) {
    common.push(UUID.test(f.q) ? { OR: [{ id: f.q.toLowerCase() }, { draftOfId: f.q.toLowerCase() }] } : { OR: [{ stem: { contains: f.q, mode: "insensitive" } }, { externalRef: f.q }] });
  }
  if (f.subjectId) common.push({ subjectId: f.subjectId });
  if (f.qualificationId) common.push({ subject: { qualificationId: f.qualificationId } });
  if (f.boardId) common.push({ subject: { qualification: { examBoardId: f.boardId } } });
  if (f.syllabusId) common.push({ topics: { some: { syllabusId: f.syllabusId } } });
  if (f.topicId) common.push(await topicSubtreeWhere(client, f.topicId));
  if (f.difficulty) common.push({ difficulty: f.difficulty });
  if (f.marks) common.push({ marks: f.marks });
  if (f.year) common.push({ year: f.year });
  if (f.paper) common.push({ paperLabel: { contains: f.paper, mode: "insensitive" } });
  if (f.skill) common.push({ cognitiveSkill: f.skill });
  if (f.ai) common.push({ aiGenerated: f.ai === "yes" });
  if (f.flagged) {
    const ids = await flaggedQuestionIds(client);
    common.push(f.flagged === "yes" ? { id: { in: ids } } : { id: { notIn: ids } });
  }
  const statusWhere: Prisma.QuestionWhereInput = f.status ? { status: f.status } : {};
  const typeWhere: Prisma.QuestionWhereInput = f.type ? { type: f.type } : {};

  const [rows, statusCounts, typeCounts] = await Promise.all([
    client.question.findMany({
      where: { AND: [...common, statusWhere, typeWhere, afterUpdatedCursor(cursor)] },
      orderBy: [{ updatedAt: "desc" }, { id: "desc" }],
      take: PAGE_SIZE + 1,
      select: {
        id: true,
        type: true,
        stem: true,
        status: true,
        revision: true,
        aiGenerated: true,
        isDemo: true,
        draftOfId: true,
        difficulty: true,
        marks: true,
        year: true,
        paperLabel: true,
        updatedAt: true,
        pendingDraft: { select: { id: true, status: true } },
        subject: { select: { name: true, qualification: { select: { shortName: true, examBoard: { select: { shortName: true } } } } } },
        topics: { where: { isPrimary: true }, select: { topic: { select: { name: true, code: true } } }, orderBy: { createdAt: "desc" }, take: 1 },
        createdBy: PERSON_SELECT,
      },
    }),
    client.question.groupBy({ by: ["status"], where: { AND: [...common, typeWhere] }, _count: { _all: true } }),
    client.question.groupBy({ by: ["type"], where: { AND: [...common, statusWhere] }, _count: { _all: true } }),
  ]);

  const page = updatedPage(rows, PAGE_SIZE);
  const flagCounts = page.items.length
    ? await client.contentFlag.groupBy({
        by: ["entityId"],
        where: { entityType: "QUESTION", entityId: { in: page.items.map((r) => r.draftOfId ?? r.id) }, status: { in: [...OPEN_FLAG_STATUSES] } },
        _count: { _all: true },
      })
    : [];
  const flags = new Map(flagCounts.map((row) => [row.entityId, row._count._all]));

  return {
    items: page.items.map((row) => {
      const topic = row.topics[0]?.topic;
      return {
        id: row.id,
        type: row.type,
        excerpt: plainExcerpt(row.stem) || "(no question text yet)",
        status: row.status,
        revision: row.revision,
        aiGenerated: row.aiGenerated,
        isDemo: row.isDemo,
        draftOfId: row.draftOfId,
        pendingDraft: row.pendingDraft,
        subject: row.subject.name,
        board: row.subject.qualification.examBoard.shortName,
        qualification: row.subject.qualification.shortName,
        primaryTopic: topic ? `${topic.code ? `${topic.code} ` : ""}${topic.name}` : null,
        difficulty: row.difficulty,
        marks: row.marks,
        year: row.year,
        paperLabel: row.paperLabel,
        openFlags: flags.get(row.draftOfId ?? row.id) ?? 0,
        author: personName(row.createdBy),
        updatedAt: row.updatedAt,
      };
    }),
    nextCursor: page.nextCursor,
    facets: {
      status: Object.fromEntries(statusCounts.map((r) => [r.status, r._count._all])),
      type: Object.fromEntries(typeCounts.map((r) => [r.type, r._count._all])),
    },
  };
}

// =====================================================================================================================
// Loading a question tree
// =====================================================================================================================

const OPTION_ORDER = [{ sortOrder: "asc" }, { key: "asc" }] satisfies Prisma.QuestionOptionOrderByWithRelationInput[];
const PART_ORDER = [{ partOrder: "asc" }, { id: "asc" }] satisfies Prisma.QuestionOrderByWithRelationInput[];
const LIVE_PARTS = { status: { not: "ARCHIVED" } } satisfies Prisma.QuestionWhereInput;

const NODE_SELECT = {
  id: true,
  type: true,
  markingMode: true,
  stem: true,
  payload: true,
  answerSpec: true,
  marks: true,
  partLabel: true,
  partOrder: true,
  explanation: true,
  workedSolution: true,
  hints: true,
  conceptSummary: true,
  draftOfId: true,
  options: { orderBy: OPTION_ORDER, select: { key: true, content: true, isCorrect: true, rationale: true, mediaAssetId: true, sortOrder: true } },
} satisfies Prisma.QuestionSelect;

const TREE_SELECT = {
  ...NODE_SELECT,
  parts: { where: LIVE_PARTS, orderBy: PART_ORDER, select: { ...NODE_SELECT, parts: { where: LIVE_PARTS, orderBy: PART_ORDER, select: NODE_SELECT } } },
} satisfies Prisma.QuestionSelect;

type NodeRow = Prisma.QuestionGetPayload<{ select: typeof NODE_SELECT }>;
type TreeRow = Prisma.QuestionGetPayload<{ select: typeof TREE_SELECT }>;

function optionInputs(node: NodeRow): QuestionEditorInput["options"] {
  return node.options.map((o) => ({ key: o.key, content: o.content, isCorrect: o.isCorrect, rationale: o.rationale, mediaAssetId: o.mediaAssetId }));
}

/** The `validateQuestionDefinition` input of a stored question tree. */
function definitionOfRow(node: NodeRow & { parts?: (NodeRow & { parts?: NodeRow[] })[] }): QuestionDefinitionInput {
  return {
    type: node.type,
    markingMode: node.markingMode,
    marks: node.marks,
    payload: node.payload,
    answerSpec: node.answerSpec,
    partLabel: node.partLabel,
    options: node.options.map((o) => ({ key: o.key, isCorrect: o.isCorrect })),
    parts: (node.parts ?? []).map(definitionOfRow),
  };
}

function subPartInput(node: NodeRow) {
  return {
    id: node.id,
    partLabel: node.partLabel ?? "",
    type: node.type,
    markingMode: node.markingMode,
    stem: node.stem,
    payload: node.payload,
    answerSpec: node.answerSpec,
    marks: node.marks,
    options: optionInputs(node),
    explanation: node.explanation,
    workedSolution: node.workedSolution,
    hints: node.hints,
  };
}

// =====================================================================================================================
// Readiness checks (block review; shown in the editor)
// =====================================================================================================================

/** Renderer warnings that block review (§43 images, §3.10 LaTeX and blocks); other warnings are advisory. */
const BLOCKING_WARNINGS: ReadonlySet<string> = new Set(["image-missing-alt", "image-unresolved", "image-external", "math-error", "unknown-directive"]);

/** Question types that may be scheduled as the daily question (short, auto-marked, renders on WhatsApp). */
const DAILY_TYPES: ReadonlySet<QuestionType> = new Set<QuestionType>(["MULTIPLE_CHOICE", "TRUE_FALSE", "NUMERICAL", "SHORT_ANSWER"]);

function addWarnings(target: { errors: FieldErrors; warnings: FieldErrors }, field: string, warnings: readonly ContentWarning[]): void {
  for (const warning of warnings) {
    const bucket = BLOCKING_WARNINGS.has(warning.code) ? target.errors : target.warnings;
    const message = warning.line === undefined ? warning.message : `Line ${warning.line}: ${warning.message}`;
    const list = (bucket[field] ??= []);
    if (!list.includes(message)) list.push(message);
  }
}

function nodeSources(node: NodeRow & { parts?: NodeRow[] }): string[] {
  const sources = [node.stem, node.explanation, node.workedSolution, node.conceptSummary, ...node.hints, ...node.options.map((o) => o.content), ...node.options.map((o) => o.rationale)];
  for (const option of node.options) if (option.mediaAssetId) sources.push(`![](asset:${option.mediaAssetId})`);
  for (const part of node.parts ?? []) sources.push(...nodeSources(part));
  return sources.filter((s): s is string => typeof s === "string" && s !== "");
}

function renderChecks(target: { errors: FieldErrors; warnings: FieldErrors }, node: NodeRow & { parts?: (NodeRow & { parts?: NodeRow[] })[] }, prefix: string, resolveAsset: AssetResolver): void {
  const block = (field: string, source: string | null) => {
    if (source && source.trim() !== "") addWarnings(target, `${prefix}${field}`, renderContent(source, { baseHeadingLevel: 3, resolveAsset }).warnings);
  };
  block("stem", node.stem);
  block("explanation", node.explanation);
  block("workedSolution", node.workedSolution);
  block("conceptSummary", node.conceptSummary);
  node.hints.forEach((hint, index) => block(`hints.${index}`, hint));
  node.options.forEach((option, index) => {
    addWarnings(target, `${prefix}options.${index}.content`, renderInline(option.content, { resolveAsset }).warnings);
    if (option.rationale) block(`options.${index}.rationale`, option.rationale);
  });
  (node.parts ?? []).forEach((part, index) => renderChecks(target, part, `${prefix}parts.${index}.`, resolveAsset));
}

/** Diagram labelling questions need a READY diagram with a description (§43) that students can be served. */
async function diagramProblems(client: DbClient, tree: TreeRow): Promise<FieldErrors> {
  const errors: FieldErrors = {};
  const nodes: { node: NodeRow; prefix: string }[] = [{ node: tree, prefix: "" }];
  tree.parts.forEach((part, i) => {
    nodes.push({ node: part, prefix: `parts.${i}.` });
    part.parts.forEach((sub, j) => nodes.push({ node: sub, prefix: `parts.${i}.parts.${j}.` }));
  });
  const wanted = new Map<string, string>();
  for (const { node, prefix } of nodes) {
    if (node.type !== "DIAGRAM_LABELLING") continue;
    const parsed = safeParseQuestionPayload("DIAGRAM_LABELLING", node.payload);
    if (parsed.success) wanted.set(`${prefix}payload.mediaAssetId`, parsed.data.mediaAssetId);
  }
  if (wanted.size === 0) return errors;
  const assets = await client.mediaAsset.findMany({
    where: { id: { in: [...new Set(wanted.values())] } },
    select: { id: true, status: true, purpose: true, altText: true, visibility: true, deletedAt: true },
  });
  const byId = new Map(assets.map((a) => [a.id, a]));
  for (const [field, id] of wanted) {
    const asset = byId.get(id);
    if (!asset || asset.deletedAt !== null || asset.status !== "READY") (errors[field] ??= []).push("Choose a diagram from the media library that has finished uploading.");
    else if (asset.purpose !== "DIAGRAM" && asset.purpose !== "CONTENT_IMAGE") (errors[field] ??= []).push("Use a diagram or content image, not another kind of file.");
    else if (asset.visibility !== "PUBLIC" && asset.visibility !== "AUTHENTICATED") (errors[field] ??= []).push("This image is private and cannot be shown to students.");
    else if (!asset.altText?.trim()) (errors[field] ??= []).push("The diagram needs a description (alt text) in the media library.");
  }
  return errors;
}

export interface QuestionChecks {
  /** Block review, approval and publication. */
  errors: FieldErrors;
  /** Shown to editors and reviewers; never block. */
  warnings: FieldErrors;
}

/**
 * Everything that blocks this question from entering review (and is re-checked at approval and publication), plus
 * advisory warnings: question-definition rules, LaTeX / blocks / images in every text, licensing (§27), topic tags,
 * the diagram asset and daily-question eligibility.
 */
export async function questionChecks(client: DbClient, id: string): Promise<QuestionChecks> {
  const row = await client.question.findUnique({
    where: { id },
    select: {
      ...TREE_SELECT,
      subjectId: true,
      isDailyEligible: true,
      copyrightStatus: true,
      sourceId: true,
      author: true,
      _count: { select: { topics: true } },
      topics: { where: { isPrimary: true }, select: { topicId: true } },
    },
  });
  if (!row) throw AppError.notFound("Question not found.");
  const { issues } = validateQuestionDefinition(definitionOfRow(row));
  const target: QuestionChecks = {
    errors: issuesToFieldErrors(issues.filter((i) => i.severity === "error")),
    warnings: issuesToFieldErrors(issues.filter((i) => i.severity === "warning")),
  };

  const resolveAsset = await loadAssetResolver(nodeSources(row), client);
  renderChecks(target, row, "", resolveAsset);

  if (row.stem.trim() === "") (target.errors.stem ??= []).push("Write the question.");
  if (row._count.topics === 0 || row.topics.length === 0) (target.errors.topics ??= []).push("Tag the question to its topic so students can practise it.");
  if (row.isDailyEligible && (!DAILY_TYPES.has(row.type) || row.markingMode !== "AUTO")) {
    (target.errors.isDailyEligible ??= []).push("Only auto-marked multiple-choice, true/false, numerical and short-answer questions can be daily questions.");
  }
  target.errors = mergeFieldErrors(target.errors, provenanceProblems(row), await diagramProblems(client, row));
  return target;
}

// =====================================================================================================================
// Editor view
// =====================================================================================================================

export interface DefinitionIssueView {
  path: string;
  message: string;
}

export interface QuestionEditorView {
  id: string;
  status: ContentStatus;
  revision: number;
  /** Row `updatedAt` (ISO): sent back on save for optimistic concurrency. */
  version: string;
  aiGenerated: boolean;
  isDemo: boolean;
  /** Only DRAFT rows (new drafts and draft copies) are edited; everything else goes through the workflow. */
  editable: boolean;
  draftOf: { id: string; status: ContentStatus; revision: number } | null;
  pendingDraft: { id: string; status: ContentStatus; revision: number; author: string | null } | null;
  document: QuestionEditorInput;
  subject: { id: string; name: string; qualification: string; board: string };
  workflow: {
    author: string | null;
    createdById: string | null;
    createdAt: Date;
    updatedAt: Date;
    reviewedBy: string | null;
    reviewedAt: Date | null;
    reviewNotes: string | null;
    approvedBy: string | null;
    approvedAt: Date | null;
    publishedAt: Date | null;
    archivedAt: Date | null;
  };
  /** Labels for the stored tags (they may belong to other subjects' versions). */
  topicLabels: Record<string, { name: string; syllabus: string; syllabusId: string }>;
  objectiveLabels: Record<string, string>;
  /** Option keys ever used by the live question: never re-used for a different option. */
  reservedOptionKeys: string[];
  checks: QuestionChecks;
  revisions: { revision: number; createdAt: Date; changeNote: string | null; author: string | null; approvedBy: string | null; aiGenerated: boolean }[];
  flags: { id: string; reason: string; source: string; status: string; createdAt: Date; details: string | null; revision: number | null }[];
  usedIn: { id: string; title: string; status: ContentStatus; kind: string }[];
  stats: {
    answeredCount: number;
    facility: number | null;
    correctRate: number | null;
    discrimination: number | null;
    empiricalDifficulty: number | null;
    avgTimeSeconds: number | null;
    suspectAnswerKey: boolean;
    optionCounts: Record<string, number> | null;
  } | null;
}

function isoDate(value: Date | null): string | null {
  return value ? value.toISOString().slice(0, 10) : null;
}

/** The editor document and the review context of one question (`content.draft`). */
export async function getQuestionEditor(actor: CmsActor, id: string, context: CmsContext = {}): Promise<QuestionEditorView> {
  assertCanDraft(actor);
  const client = readClient(context);
  if (!UUID.test(id)) throw AppError.notFound("Question not found.");
  const row = await client.question.findUnique({
    where: { id },
    select: {
      ...TREE_SELECT,
      subjectId: true,
      parentId: true,
      schoolId: true,
      ownerUserId: true,
      status: true,
      revision: true,
      updatedAt: true,
      createdAt: true,
      aiGenerated: true,
      isDemo: true,
      relatedLessonId: true,
      difficulty: true,
      estimatedSeconds: true,
      year: true,
      paperLabel: true,
      cognitiveSkill: true,
      isExamStyle: true,
      isDailyEligible: true,
      calculatorAllowed: true,
      accessTier: true,
      languageCode: true,
      sourceId: true,
      author: true,
      copyrightStatus: true,
      licenceCode: true,
      attribution: true,
      sourceUrl: true,
      publicationDate: true,
      createdById: true,
      reviewedAt: true,
      reviewNotes: true,
      approvedAt: true,
      publishedAt: true,
      archivedAt: true,
      createdBy: PERSON_SELECT,
      reviewedBy: PERSON_SELECT,
      approvedBy: PERSON_SELECT,
      topics: { select: { topicId: true, syllabusId: true, isPrimary: true, topic: { select: { name: true, code: true } }, syllabus: { select: { title: true, versionLabel: true } } } },
      objectives: { select: { objectiveId: true, objective: { select: { code: true, statement: true } } } },
      subject: { select: { id: true, name: true, qualification: { select: { shortName: true, examBoard: { select: { shortName: true } } } } } },
      draftOf: { select: { id: true, status: true, revision: true, options: { select: { key: true } } } },
      pendingDraft: { select: { id: true, status: true, revision: true, createdBy: PERSON_SELECT } },
      stats: true,
    },
  });
  if (!row || row.parentId !== null || row.schoolId !== null || row.ownerUserId !== null) throw AppError.notFound("Question not found.");
  const liveId = row.draftOfId ?? row.id;

  const [checks, revisions, flags, items] = await Promise.all([
    questionChecks(client, id),
    client.contentRevision.findMany({
      where: { entityType: "QUESTION", entityId: liveId },
      orderBy: { revision: "desc" },
      take: 20,
      select: { revision: true, createdAt: true, changeNote: true, aiGenerated: true, author: PERSON_SELECT, approvedBy: PERSON_SELECT },
    }),
    client.contentFlag.findMany({
      where: { entityType: "QUESTION", entityId: liveId },
      orderBy: { createdAt: "desc" },
      take: 20,
      select: { id: true, reason: true, source: true, status: true, createdAt: true, details: true, revision: true },
    }),
    client.assessmentItem.findMany({
      where: { questionId: liveId },
      take: 20,
      select: { section: { select: { assessment: { select: { id: true, title: true, status: true, kind: true } } } } },
    }),
  ]);

  const reserved = new Set<string>(row.options.map((o) => o.key));
  for (const option of row.draftOf?.options ?? []) reserved.add(option.key);
  const stats = row.stats;

  return {
    id: row.id,
    status: row.status,
    revision: row.revision,
    version: row.updatedAt.toISOString(),
    aiGenerated: row.aiGenerated,
    isDemo: row.isDemo,
    editable: row.status === "DRAFT",
    draftOf: row.draftOf ? { id: row.draftOf.id, status: row.draftOf.status, revision: row.draftOf.revision } : null,
    pendingDraft: row.pendingDraft
      ? { id: row.pendingDraft.id, status: row.pendingDraft.status, revision: row.pendingDraft.revision, author: personName(row.pendingDraft.createdBy) }
      : null,
    document: {
      subjectId: row.subjectId,
      type: row.type,
      markingMode: row.markingMode,
      stem: row.stem,
      payload: row.payload,
      answerSpec: row.answerSpec,
      marks: row.marks,
      options: optionInputs(row),
      parts: row.parts.map((part) => ({ ...subPartInput(part), parts: part.parts.map(subPartInput) })),
      explanation: row.explanation,
      workedSolution: row.workedSolution,
      conceptSummary: row.conceptSummary,
      hints: row.hints,
      relatedLessonId: row.relatedLessonId,
      difficulty: row.difficulty,
      estimatedSeconds: row.estimatedSeconds,
      year: row.year,
      paperLabel: row.paperLabel,
      cognitiveSkill: row.cognitiveSkill,
      isExamStyle: row.isExamStyle,
      isDailyEligible: row.isDailyEligible,
      calculatorAllowed: row.calculatorAllowed,
      accessTier: row.accessTier,
      languageCode: row.languageCode,
      topics: row.topics.map((t) => ({ topicId: t.topicId, isPrimary: t.isPrimary })),
      objectiveIds: row.objectives.map((o) => o.objectiveId),
      sourceId: row.sourceId,
      author: row.author,
      copyrightStatus: row.copyrightStatus,
      licenceCode: row.licenceCode,
      attribution: row.attribution,
      sourceUrl: row.sourceUrl,
      publicationDate: isoDate(row.publicationDate),
    },
    subject: {
      id: row.subject.id,
      name: row.subject.name,
      qualification: row.subject.qualification.shortName,
      board: row.subject.qualification.examBoard.shortName,
    },
    workflow: {
      author: personName(row.createdBy),
      createdById: row.createdById,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      reviewedBy: personName(row.reviewedBy),
      reviewedAt: row.reviewedAt,
      reviewNotes: row.reviewNotes,
      approvedBy: personName(row.approvedBy),
      approvedAt: row.approvedAt,
      publishedAt: row.publishedAt,
      archivedAt: row.archivedAt,
    },
    topicLabels: Object.fromEntries(
      row.topics.map((t) => [
        t.topicId,
        { name: `${t.topic.code ? `${t.topic.code} ` : ""}${t.topic.name}`, syllabus: `${t.syllabus.title} · ${t.syllabus.versionLabel}`, syllabusId: t.syllabusId },
      ]),
    ),
    objectiveLabels: Object.fromEntries(row.objectives.map((o) => [o.objectiveId, `${o.objective.code ? `${o.objective.code} ` : ""}${o.objective.statement}`])),
    reservedOptionKeys: [...reserved].sort(),
    checks,
    revisions: revisions.map((r) => ({
      revision: r.revision,
      createdAt: r.createdAt,
      changeNote: r.changeNote,
      author: personName(r.author),
      approvedBy: personName(r.approvedBy),
      aiGenerated: r.aiGenerated,
    })),
    flags,
    usedIn: items.map((item) => item.section.assessment),
    stats: stats
      ? {
          answeredCount: stats.answeredCount,
          facility: stats.facility,
          correctRate: stats.correctRate,
          discrimination: stats.discrimination,
          empiricalDifficulty: stats.empiricalDifficulty,
          avgTimeSeconds: stats.avgTimeSeconds,
          suspectAnswerKey: stats.suspectAnswerKey,
          optionCounts:
            stats.optionCounts && typeof stats.optionCounts === "object" && !Array.isArray(stats.optionCounts)
              ? Object.fromEntries(Object.entries(stats.optionCounts as Record<string, unknown>).filter((e): e is [string, number] => typeof e[1] === "number"))
              : null,
        }
      : null,
  };
}

// =====================================================================================================================
// Create / update / delete drafts
// =====================================================================================================================

export interface SaveQuestionResult {
  id: string;
  /** New `updatedAt` (ISO) for the next save. */
  version: string;
  /** Definition problems still to fix before review (the draft was saved). */
  errors: DefinitionIssueView[];
  warnings: DefinitionIssueView[];
}

function issueViews(issues: readonly DefinitionIssue[]): DefinitionIssueView[] {
  return issues.map((issue) => ({ path: issue.path.join("."), message: issue.message }));
}

const jsonValue = (value: unknown): Prisma.InputJsonValue | typeof Prisma.DbNull =>
  value === null || value === undefined ? Prisma.DbNull : (value as Prisma.InputJsonValue);

type Data = QuestionEditorData;

/** Columns every row of a question tree carries (parts inherit the root's metadata and licensing). */
function inheritedColumns(data: Data, actorId: string) {
  return {
    subjectId: data.subjectId,
    difficulty: data.difficulty,
    accessTier: data.accessTier,
    languageCode: data.languageCode,
    sourceId: data.sourceId,
    author: data.author,
    copyrightStatus: data.copyrightStatus,
    licenceCode: data.licenceCode,
    attribution: data.attribution,
    sourceUrl: data.sourceUrl,
    publicationDate: data.publicationDate ? new Date(`${data.publicationDate}T00:00:00Z`) : null,
    createdById: actorId,
  };
}

function rootColumns(data: Data) {
  return {
    type: data.type,
    markingMode: data.markingMode,
    stem: data.stem,
    payload: jsonValue(data.payload),
    answerSpec: jsonValue(data.answerSpec),
    marks: data.marks,
    explanation: data.explanation,
    workedSolution: data.workedSolution,
    conceptSummary: data.conceptSummary,
    hints: data.hints,
    relatedLessonId: data.relatedLessonId,
    estimatedSeconds: data.estimatedSeconds,
    year: data.year,
    paperLabel: data.paperLabel,
    cognitiveSkill: data.cognitiveSkill,
    isExamStyle: data.isExamStyle,
    isDailyEligible: data.isDailyEligible,
    calculatorAllowed: data.calculatorAllowed,
  };
}

type PartData = Data["parts"][number] | Data["parts"][number]["parts"][number];

function partColumns(part: PartData, index: number) {
  return {
    type: part.type,
    markingMode: part.markingMode,
    stem: part.stem,
    payload: jsonValue(part.payload),
    answerSpec: jsonValue(part.answerSpec),
    marks: part.marks,
    partLabel: part.partLabel,
    partOrder: index,
    explanation: part.explanation,
    workedSolution: part.workedSolution,
    hints: part.hints,
  };
}

async function writeOptions(tx: Tx, questionId: string, options: Data["options"], replace: boolean): Promise<void> {
  if (replace) await tx.questionOption.deleteMany({ where: { questionId } });
  if (options.length === 0) return;
  await tx.questionOption.createMany({
    data: options.map((o, index) => ({
      questionId,
      key: o.key,
      content: o.content,
      isCorrect: o.isCorrect,
      rationale: o.rationale,
      mediaAssetId: o.mediaAssetId ?? null,
      sortOrder: index,
    })),
  });
}

/**
 * Writes the parts of `parentId` to match `parts`: existing rows (by id) are updated in place — so a draft copy's
 * part keeps its link (`draftOfId`) to the live part it edits — new parts are inserted and missing ones deleted.
 */
async function syncParts(tx: Tx, parentId: string, parts: readonly PartData[], inherited: ReturnType<typeof inheritedColumns>): Promise<void> {
  const existing = await tx.question.findMany({ where: { parentId }, select: { id: true } });
  const existingIds = new Set(existing.map((p) => p.id));
  const kept = new Set<string>();
  for (const [index, part] of parts.entries()) {
    const children = "parts" in part ? part.parts : [];
    let partId: string;
    if (part.id && existingIds.has(part.id) && !kept.has(part.id)) {
      partId = part.id;
      kept.add(partId);
      await tx.question.update({ where: { id: partId }, data: { ...partColumns(part, index), ...inherited } });
      await writeOptions(tx, partId, part.options, true);
    } else {
      const created = await tx.question.create({ data: { ...partColumns(part, index), ...inherited, parentId, status: "DRAFT" }, select: { id: true } });
      partId = created.id;
      await writeOptions(tx, partId, part.options, false);
    }
    await syncParts(tx, partId, children, inherited);
  }
  const removed = [...existingIds].filter((id) => !kept.has(id));
  if (removed.length > 0) await tx.question.deleteMany({ where: { id: { in: removed } } });
}

/** Validates every id the document references and returns the topic → syllabus / subject mapping for tags. */
async function resolveReferences(client: DbClient, data: Data): Promise<Map<string, { syllabusId: string; subjectId: string }>> {
  const errors: FieldErrors = {};
  const optionAssets = [...data.options, ...data.parts.flatMap((p) => [...p.options, ...p.parts.flatMap((s) => s.options)])]
    .map((o) => o.mediaAssetId)
    .filter((id): id is string => typeof id === "string");
  const [subject, lesson, source, topics, objectives, assets] = await Promise.all([
    client.subject.findUnique({ where: { id: data.subjectId }, select: { id: true } }),
    data.relatedLessonId ? client.lesson.findUnique({ where: { id: data.relatedLessonId }, select: { id: true, draftOfId: true } }) : null,
    data.sourceId ? client.contentSource.findUnique({ where: { id: data.sourceId }, select: { id: true } }) : null,
    data.topics.length
      ? client.topic.findMany({ where: { id: { in: data.topics.map((t) => t.topicId) } }, select: { id: true, syllabusId: true, syllabus: { select: { subjectId: true } } } })
      : [],
    data.objectiveIds.length ? client.learningObjective.findMany({ where: { id: { in: data.objectiveIds } }, select: { id: true } }) : [],
    optionAssets.length ? client.mediaAsset.findMany({ where: { id: { in: optionAssets } }, select: { id: true } }) : [],
  ]);
  if (!subject) (errors.subjectId ??= []).push("Choose the question's home subject.");
  if (data.relatedLessonId && (!lesson || lesson.draftOfId !== null)) (errors.relatedLessonId ??= []).push("Choose a lesson from the list.");
  if (data.sourceId && !source) (errors.sourceId ??= []).push("Choose a content source from the list.");
  if (topics.length !== new Set(data.topics.map((t) => t.topicId)).size) (errors.topics ??= []).push("One of the topics no longer exists. Reload and tag again.");
  if (objectives.length !== new Set(data.objectiveIds).size) (errors.objectiveIds ??= []).push("One of the learning objectives no longer exists.");
  if (assets.length !== new Set(optionAssets).size) (errors.options ??= []).push("An option image no longer exists in the media library.");
  if (Object.keys(errors).length > 0) throw AppError.validation(errors, "Some choices are no longer valid.");
  return new Map(topics.map((t) => [t.id, { syllabusId: t.syllabusId, subjectId: t.syllabus.subjectId }]));
}

async function writeTags(tx: Tx, questionId: string, data: Data, topics: Map<string, { syllabusId: string; subjectId: string }>, replace: boolean): Promise<void> {
  if (replace) {
    await tx.questionTopic.deleteMany({ where: { questionId } });
    await tx.questionObjective.deleteMany({ where: { questionId } });
  }
  const tags = normaliseTopicTags(data.topics, (topicId) => topics.get(topicId)?.syllabusId);
  if (tags.length > 0) {
    await tx.questionTopic.createMany({
      data: tags.map((tag) => ({ questionId, topicId: tag.topicId, syllabusId: tag.syllabusId, subjectId: topics.get(tag.topicId)?.subjectId ?? data.subjectId, isPrimary: tag.isPrimary })),
    });
  }
  if (data.objectiveIds.length > 0) {
    await tx.questionObjective.createMany({ data: [...new Set(data.objectiveIds)].map((objectiveId) => ({ questionId, objectiveId })), skipDuplicates: true });
  }
}

/**
 * Refreshes the derived rows of a question tree: the write-time `renderedHtml` of the root and every part (one asset
 * query) and the `ContentMediaUsage` rows of the root. Render caches stay editable on published rows, so this also
 * runs after a publish merge.
 */
export async function refreshQuestionDerived(tx: Tx, rootId: string): Promise<void> {
  const tree = await tx.question.findUnique({ where: { id: rootId }, select: TREE_SELECT });
  if (!tree) return;
  const resolveAsset = await loadAssetResolver(nodeSources(tree), tx);
  const nodes: NodeRow[] = [tree, ...tree.parts, ...tree.parts.flatMap((p) => p.parts)];
  for (const node of nodes) {
    const document = renderQuestionHtml(
      {
        id: node.id,
        type: node.type,
        stem: node.stem,
        explanation: node.explanation,
        workedSolution: node.workedSolution,
        conceptSummary: node.conceptSummary,
        hints: node.hints,
        payload: node.payload,
        options: node.options.map((o) => ({ key: o.key, content: o.content })),
      },
      resolveAsset,
    );
    await tx.question.update({ where: { id: node.id }, data: { renderedHtml: toRenderedJson(document), renderVersion: PIPELINE_VERSION } });
  }

  // The media library's one mapping (src/server/cms/media/usage.ts), shared with publish merges and draft copies.
  await syncMediaUsageFromAggregate(tx, "QUESTION", rootId);
}

function parseDocument(raw: unknown): Data {
  return normaliseEditorDocument(parseInput(questionEditorSchema, raw));
}

/** Creates a DRAFT question (`content.draft`), even when the definition is still incomplete (issues are returned). */
export async function createQuestion(actor: CmsActor, raw: unknown, context: CmsContext = {}): Promise<SaveQuestionResult> {
  assertCanDraft(actor);
  const data = parseDocument(raw);
  return inTransaction(context, async (tx) => {
    const topics = await resolveReferences(tx, data);
    const inherited = inheritedColumns(data, actor.userId);
    const root = await tx.question.create({ data: { ...rootColumns(data), ...inherited, status: "DRAFT" }, select: { id: true } });
    await writeOptions(tx, root.id, data.options, false);
    await syncParts(tx, root.id, data.parts, inherited);
    await writeTags(tx, root.id, data, topics, false);
    await refreshQuestionDerived(tx, root.id);
    const saved = await tx.question.findUniqueOrThrow({ where: { id: root.id }, select: { updatedAt: true } });
    await auditCms(tx, actor, context, {
      action: CMS_CONTENT_AUDIT.CREATE,
      operation: CMS_CONTENT_OPERATIONS.create,
      entityType: "Question",
      entityId: root.id,
      after: { type: data.type, subjectId: data.subjectId, marks: data.marks, difficulty: data.difficulty, copyrightStatus: data.copyrightStatus },
    });
    const report = definitionReport(data);
    return { id: root.id, version: saved.updatedAt.toISOString(), errors: issueViews(report.errors), warnings: issueViews(report.warnings) };
  });
}

/**
 * Saves a DRAFT question (a new draft or the draft copy of a published question) from the full editor document
 * (`content.draft`). Refused for any other status: published questions are edited through a draft copy, and items in
 * review go back to draft first. `version` guards against overwriting another editor's save.
 */
export async function updateQuestion(actor: CmsActor, raw: unknown, context: CmsContext = {}): Promise<SaveQuestionResult> {
  assertCanDraft(actor);
  const input = parseInput(questionUpdateSchema, raw);
  const data = parseDocument(input.question);
  return inTransaction(context, async (tx) => {
    await tx.$queryRaw`SELECT "id" FROM "Question" WHERE "id" = ${input.id}::uuid FOR UPDATE`;
    const row = await findPlatformRow(tx, "QUESTION", input.id);
    const current = await tx.question.findUniqueOrThrow({ where: { id: input.id }, select: { updatedAt: true, type: true, marks: true, difficulty: true, copyrightStatus: true } });
    if (row.status !== "DRAFT") {
      throw AppError.conflict(
        row.status === "PUBLISHED" ? "Published questions are edited through a draft copy. Choose “Edit” first." : "Only drafts can be edited. Send it back to draft first.",
      );
    }
    if (input.version && current.updatedAt.toISOString() !== input.version) {
      throw AppError.conflict("Someone else saved this question after you opened it. Reload to see their changes, then edit again.");
    }
    const topics = await resolveReferences(tx, data);
    const inherited = inheritedColumns(data, actor.userId);
    await tx.question.update({ where: { id: input.id }, data: { ...rootColumns(data), ...inherited } });
    await writeOptions(tx, input.id, data.options, true);
    await syncParts(tx, input.id, data.parts, inherited);
    await writeTags(tx, input.id, data, topics, true);
    await refreshQuestionDerived(tx, input.id);
    const saved = await tx.question.findUniqueOrThrow({ where: { id: input.id }, select: { updatedAt: true } });
    await auditCms(tx, actor, context, {
      action: CMS_CONTENT_AUDIT.UPDATE,
      operation: CMS_CONTENT_OPERATIONS.update,
      entityType: "Question",
      entityId: input.id,
      before: { type: current.type, marks: current.marks, difficulty: current.difficulty, copyrightStatus: current.copyrightStatus },
      after: { type: data.type, marks: data.marks, difficulty: data.difficulty, copyrightStatus: data.copyrightStatus },
      metadata: { revision: row.revision, draftOfId: row.draftOfId },
    });
    const report = definitionReport(data);
    return { id: input.id, version: saved.updatedAt.toISOString(), errors: issueViews(report.errors), warnings: issueViews(report.warnings) };
  });
}

/**
 * Deletes a draft that was never published (`content.draft`). Draft copies are discarded instead; anything that has
 * been published (or is used by an assessment or lesson) is archived, never deleted.
 */
export async function deleteDraftQuestion(actor: CmsActor, raw: unknown, context: CmsContext = {}): Promise<{ id: string }> {
  assertCanDraft(actor);
  const { id } = parseInput(questionUpdateSchema.pick({ id: true }), raw);
  return inTransaction(context, async (tx) => {
    const row = await findPlatformRow(tx, "QUESTION", id);
    if (row.draftOfId !== null) throw new AppError("BAD_REQUEST", "This is an edit of a published question: discard the draft copy instead.");
    const extra = await tx.question.findUniqueOrThrow({
      where: { id },
      select: { publishedAt: true, _count: { select: { assessmentItems: true, lessonLinks: true, attempts: true, dailyQuestions: true } } },
    });
    if (row.status !== "DRAFT" || extra.publishedAt !== null || row.revision > 1) throw AppError.conflict("Only drafts that were never published can be deleted. Archive published questions instead.");
    const uses = extra._count.assessmentItems + extra._count.lessonLinks + extra._count.attempts + extra._count.dailyQuestions;
    if (uses > 0) throw AppError.conflict("This draft is used by an assessment, lesson or attempt. Remove it there first.");
    await clearMediaUsage(tx, "QUESTION", id);
    await tx.question.delete({ where: { id } });
    await auditCms(tx, actor, context, { action: CMS_CONTENT_AUDIT.DELETE, operation: CMS_CONTENT_OPERATIONS.delete, entityType: "Question", entityId: id });
    return { id };
  });
}

// =====================================================================================================================
// Workflow (THE shared publish helper, through ./workflow)
// =====================================================================================================================

export const QUESTION_WORKFLOW_HOOKS: WorkflowHooks = {
  readiness: async (tx, id) => (await questionChecks(tx, id)).errors,
  afterContentChange: refreshQuestionDerived,
};

export const submitQuestion = (actor: CmsActor, raw: unknown, context?: CmsContext): Promise<WorkflowResult> =>
  submitItem(actor, "QUESTION", raw, context, QUESTION_WORKFLOW_HOOKS);
export const requestQuestionChanges = (actor: CmsActor, raw: unknown, context?: CmsContext): Promise<WorkflowResult> =>
  requestItemChanges(actor, "QUESTION", raw, context);
export const approveQuestion = (actor: CmsActor, raw: unknown, context?: CmsContext): Promise<WorkflowResult> =>
  approveItem(actor, "QUESTION", raw, context, QUESTION_WORKFLOW_HOOKS);
export const publishQuestion = (actor: CmsActor, raw: unknown, context?: CmsContext): Promise<PublishResult> =>
  publishItem(actor, "QUESTION", raw, context, QUESTION_WORKFLOW_HOOKS);
export const archiveQuestion = (actor: CmsActor, raw: unknown, context?: CmsContext): Promise<WorkflowResult> => archiveItem(actor, "QUESTION", raw, context);
export const reopenQuestion = (actor: CmsActor, raw: unknown, context?: CmsContext): Promise<WorkflowResult> => reopenItem(actor, "QUESTION", raw, context);
export const editPublishedQuestion = (actor: CmsActor, raw: unknown, context?: CmsContext): Promise<DraftCopy> =>
  startEditingItem(actor, "QUESTION", raw, context, QUESTION_WORKFLOW_HOOKS);
export const discardQuestionDraft = (actor: CmsActor, raw: unknown, context?: CmsContext): Promise<{ liveId: string }> =>
  discardItemDraftCopy(actor, "QUESTION", raw, context);

// =====================================================================================================================
// Picker (assessment items)
// =====================================================================================================================

export interface PickerQuestion {
  id: string;
  type: QuestionType;
  excerpt: string;
  marks: number;
  difficulty: number;
  topic: string | null;
  year: number | null;
  paperLabel: string | null;
  isExamStyle: boolean;
}

/** PUBLISHED platform questions of (or tagged in) a subject, for the assessment builder's picker (`content.draft`). */
export async function searchPublishedQuestions(actor: CmsActor, raw: unknown, context: CmsContext = {}): Promise<PickerQuestion[]> {
  assertCanDraft(actor);
  const f = parseInput(questionPickerSchema, raw);
  const client = readClient(context);
  const where: Prisma.QuestionWhereInput[] = [
    { ...PLATFORM_ROOT, draftOfId: null, status: "PUBLISHED" },
    { OR: [{ subjectId: f.subjectId }, { topics: { some: { subjectId: f.subjectId } } }] },
  ];
  if (f.syllabusId) where.push({ topics: { some: { syllabusId: f.syllabusId } } });
  if (f.topicId) where.push(await topicSubtreeWhere(client, f.topicId));
  if (f.type) where.push({ type: f.type });
  if (f.difficulty) where.push({ difficulty: f.difficulty });
  if (f.q) where.push(UUID.test(f.q) ? { id: f.q.toLowerCase() } : { stem: { contains: f.q, mode: "insensitive" } });
  if (f.excludeIds.length > 0) where.push({ id: { notIn: f.excludeIds } });
  const rows = await client.question.findMany({
    where: { AND: where },
    orderBy: [{ updatedAt: "desc" }, { id: "desc" }],
    take: f.limit,
    select: {
      id: true,
      type: true,
      stem: true,
      marks: true,
      difficulty: true,
      year: true,
      paperLabel: true,
      isExamStyle: true,
      topics: { where: { isPrimary: true }, select: { topic: { select: { name: true, code: true } } }, take: 1 },
    },
  });
  return rows.map((row) => {
    const topic = row.topics[0]?.topic;
    return {
      id: row.id,
      type: row.type,
      excerpt: plainExcerpt(row.stem),
      marks: row.marks,
      difficulty: row.difficulty,
      topic: topic ? `${topic.code ? `${topic.code} ` : ""}${topic.name}` : null,
      year: row.year,
      paperLabel: row.paperLabel,
      isExamStyle: row.isExamStyle,
    };
  });
}
