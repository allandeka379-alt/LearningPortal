import "server-only";
import { Prisma, type AssessmentAssembly, type AssessmentKind, type ContentAccessTier, type ContentStatus } from "@/generated/prisma/client";
import type { PresentedQuestion } from "@/components/questions/types";
import type { SanitizedHtml } from "@/lib/content/types";
import { createRng, shuffled } from "@/server/adaptive/core";
import type { DraftCopy, PublishResult, WorkflowResult } from "@/server/content/publish";
import { renderContent } from "@/server/content/render";
import { loadAssetResolver } from "@/server/content/service";
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
} from "@/server/cms/questions/context";
import { mergeFieldErrors, plainExcerpt, provenanceProblems } from "@/server/cms/questions/core";
import { clearMediaUsage, syncMediaUsageFromAggregate } from "@/server/cms/media/usage";
import { loadQuestionRecords, presentRecords } from "@/server/cms/questions/preview";
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
} from "@/server/cms/questions/workflow";
import { blueprintFeasibility, computeTotals, tiersUpTo, type Feasibility, type RuleDemand, type Totals } from "./core";
import {
  assessmentCreateSchema,
  assessmentFilterSchema,
  assessmentUpdateSchema,
  blueprintCheckSchema,
  structureSchema,
  type AssessmentMetaData,
  type AssessmentMetaInput,
  type BlueprintRuleData,
  type SectionData,
  type SectionInput,
} from "./schemas";

/**
 * The assessment builder (§12 mock exams, §13 exam mode, §46 free topic tests / diagnostic; ARCHITECTURE §4.4):
 * topic / chapter / subject tests, timed exams and mocks with sections ("Paper 1", "Section B: answer any two"), fixed
 * questions and blueprint rules drawn from the PUBLISHED bank. Totals are service-maintained; the live blueprint
 * check mirrors how the attempt engine fills rules (src/server/attempts/selection.ts). Workflow through the shared
 * publish helper; platform assessments only (school and tutor tests belong to the teacher area).
 */

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const PLATFORM = { schoolId: null, ownerUserId: null } satisfies Prisma.AssessmentWhereInput;

// =====================================================================================================================
// List
// =====================================================================================================================

export interface AssessmentListRow {
  id: string;
  title: string;
  kind: AssessmentKind;
  assembly: AssessmentAssembly;
  status: ContentStatus;
  revision: number;
  draftOfId: string | null;
  pendingDraft: { id: string; status: ContentStatus } | null;
  aiGenerated: boolean;
  isDemo: boolean;
  subject: string;
  board: string;
  qualification: string;
  totalMarks: number;
  timeLimitMinutes: number | null;
  accessTier: ContentAccessTier;
  sectionCount: number;
  author: string | null;
  updatedAt: Date;
}

export async function listAssessments(actor: CmsActor, raw: unknown, context: CmsContext = {}): Promise<{ items: AssessmentListRow[]; nextCursor: string | null }> {
  assertCanDraft(actor);
  const f = parseInput(assessmentFilterSchema, raw);
  const client = readClient(context);
  const where: Prisma.AssessmentWhereInput[] = [PLATFORM];
  if (f.q) where.push(UUID.test(f.q) ? { OR: [{ id: f.q.toLowerCase() }, { draftOfId: f.q.toLowerCase() }] } : { title: { contains: f.q, mode: "insensitive" } });
  if (f.kind) where.push({ kind: f.kind });
  if (f.assembly) where.push({ assembly: f.assembly });
  if (f.status) where.push({ status: f.status });
  if (f.subjectId) where.push({ subjectId: f.subjectId });
  const rows = await client.assessment.findMany({
    where: { AND: [...where, afterUpdatedCursor(decodeUpdatedCursor(f.cursor))] },
    orderBy: [{ updatedAt: "desc" }, { id: "desc" }],
    take: PAGE_SIZE + 1,
    select: {
      id: true,
      title: true,
      kind: true,
      assembly: true,
      status: true,
      revision: true,
      draftOfId: true,
      aiGenerated: true,
      isDemo: true,
      totalMarks: true,
      timeLimitSeconds: true,
      accessTier: true,
      updatedAt: true,
      pendingDraft: { select: { id: true, status: true } },
      subject: { select: { name: true, qualification: { select: { shortName: true, examBoard: { select: { shortName: true } } } } } },
      createdBy: PERSON_SELECT,
      _count: { select: { sections: true } },
    },
  });
  const page = updatedPage(rows, PAGE_SIZE);
  return {
    items: page.items.map((row) => ({
      id: row.id,
      title: row.title,
      kind: row.kind,
      assembly: row.assembly,
      status: row.status,
      revision: row.revision,
      draftOfId: row.draftOfId,
      pendingDraft: row.pendingDraft,
      aiGenerated: row.aiGenerated,
      isDemo: row.isDemo,
      subject: row.subject.name,
      board: row.subject.qualification.examBoard.shortName,
      qualification: row.subject.qualification.shortName,
      totalMarks: row.totalMarks,
      timeLimitMinutes: row.timeLimitSeconds === null ? null : Math.round(row.timeLimitSeconds / 60),
      accessTier: row.accessTier,
      sectionCount: row._count.sections,
      author: personName(row.createdBy),
      updatedAt: row.updatedAt,
    })),
    nextCursor: page.nextCursor,
  };
}

// =====================================================================================================================
// Blueprint candidates (mirrors candidatePool + planAssessment, stricter where the rule says more)
// =====================================================================================================================

/** Candidate cap per rule: beyond this a rule is "plentiful" (no rule may ask for more than 200). */
const CANDIDATE_CAP = 1_000;

interface BlueprintContext {
  subjectId: string;
  syllabusId: string | null;
  /** Assessment topic scope (rules without a topic draw from it), already expanded to subtrees. */
  scopeTopicIds: string[];
}

async function expandSubtrees(client: DbClient, syllabusId: string, topicIds: readonly string[]): Promise<string[]> {
  if (topicIds.length === 0) return [];
  const roots = await client.topic.findMany({ where: { id: { in: [...new Set(topicIds)] }, syllabusId }, select: { id: true, path: true } });
  if (roots.length === 0) return [];
  const descendants = await client.topic.findMany({ where: { syllabusId, OR: roots.map((r) => ({ path: { startsWith: `${r.path}/` } })) }, select: { id: true } });
  return [...new Set([...roots.map((r) => r.id), ...descendants.map((d) => d.id)])];
}

async function ruleCandidates(
  client: DbClient,
  ctx: BlueprintContext,
  rule: BlueprintRuleData,
  tiers: readonly ContentAccessTier[],
  excludeIds: readonly string[],
): Promise<{ ids: string[]; capped: boolean }> {
  if (!ctx.syllabusId) return { ids: [], capped: false };
  let topicIds = ctx.scopeTopicIds;
  if (rule.topicId) topicIds = rule.includeSubtopics ? await expandSubtrees(client, ctx.syllabusId, [rule.topicId]) : [rule.topicId];
  const rows = await client.question.findMany({
    where: {
      status: "PUBLISHED",
      parentId: null,
      draftOfId: null,
      schoolId: null,
      ownerUserId: null,
      difficulty: { gte: rule.difficultyMin, lte: rule.difficultyMax },
      accessTier: { in: [...tiers] },
      ...(rule.questionType ? { type: rule.questionType } : {}),
      ...(rule.cognitiveSkill ? { cognitiveSkill: rule.cognitiveSkill } : {}),
      ...(rule.marksPerQuestion ? { marks: rule.marksPerQuestion } : {}),
      ...(rule.examStyleOnly ? { isExamStyle: true } : {}),
      ...(rule.objectiveId ? { objectives: { some: { objectiveId: rule.objectiveId } } } : {}),
      topics: { some: { syllabusId: ctx.syllabusId, subjectId: ctx.subjectId, ...(topicIds.length > 0 ? { topicId: { in: topicIds } } : {}) } },
      ...(excludeIds.length > 0 ? { id: { notIn: [...excludeIds] } } : {}),
    },
    select: { id: true },
    orderBy: { id: "asc" },
    take: CANDIDATE_CAP,
  });
  return { ids: rows.map((r) => r.id), capped: rows.length >= CANDIDATE_CAP };
}

export interface BlueprintReport {
  /** Who the audience check is for, e.g. "students on free access". */
  audience: string;
  /** Filled from the questions the assessment's audience may be given (its access tier and below). */
  forAudience: Feasibility;
  /** Filled from every tier (what premium students get); null when the assessment is premium already. */
  forPremium: Feasibility | null;
  /** Section / rule position of each entry in `forAudience.rules`. */
  positions: { section: number; rule: number }[];
}

const AUDIENCE: Record<ContentAccessTier, string> = {
  PUBLIC: "everyone, including visitors",
  FREE: "students on free access",
  PREMIUM: "premium students",
};

async function blueprintReport(client: DbClient, ctx: BlueprintContext & { accessTier: ContentAccessTier }, sections: readonly SectionData[]): Promise<BlueprintReport | null> {
  const positions: { section: number; rule: number }[] = [];
  sections.forEach((section, s) => section.rules.forEach((_, r) => positions.push({ section: s, rule: r })));
  if (positions.length === 0) return null;
  const fixed = sections.flatMap((s) => s.items.map((i) => i.questionId));
  const demands = async (tiers: readonly ContentAccessTier[]): Promise<RuleDemand[]> =>
    Promise.all(
      positions.map(async ({ section, rule }) => {
        const spec = (sections[section] as SectionData).rules[rule] as BlueprintRuleData;
        const found = await ruleCandidates(client, ctx, spec, tiers, fixed);
        return { required: spec.questionCount, candidates: found.ids, capped: found.capped };
      }),
    );
  const audienceTiers = tiersUpTo(ctx.accessTier);
  const forAudience = blueprintFeasibility(await demands(audienceTiers));
  const forPremium = ctx.accessTier === "PREMIUM" ? null : blueprintFeasibility(await demands(tiersUpTo("PREMIUM")));
  return { audience: AUDIENCE[ctx.accessTier], forAudience, forPremium, positions };
}

// =====================================================================================================================
// Loading
// =====================================================================================================================

const STRUCTURE_SELECT = {
  orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
  select: {
    id: true,
    title: true,
    instructions: true,
    componentId: true,
    timeLimitSeconds: true,
    answerCount: true,
    marks: true,
    items: { orderBy: [{ sortOrder: "asc" }, { id: "asc" }], select: { questionId: true, label: true, marks: true } },
    rules: {
      orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
      select: {
        topicId: true,
        objectiveId: true,
        includeSubtopics: true,
        questionType: true,
        cognitiveSkill: true,
        difficultyMin: true,
        difficultyMax: true,
        questionCount: true,
        marksPerQuestion: true,
        examStyleOnly: true,
      },
    },
  },
} satisfies Prisma.Assessment$sectionsArgs;

type SectionRow = Prisma.AssessmentSectionGetPayload<{ select: (typeof STRUCTURE_SELECT)["select"] }>;

function sectionData(section: SectionRow): SectionData {
  return {
    title: section.title,
    instructions: section.instructions,
    componentId: section.componentId,
    timeLimitMinutes: section.timeLimitSeconds === null ? null : Math.round(section.timeLimitSeconds / 60),
    answerCount: section.answerCount,
    marks: section.marks,
    items: section.items.map((i) => ({ questionId: i.questionId, label: i.label, marks: i.marks })),
    rules: section.rules.map((r) => ({ ...r })),
  };
}

async function questionMarks(client: DbClient, sections: readonly SectionData[]): Promise<Map<string, number>> {
  const ids = [...new Set(sections.flatMap((s) => s.items.map((i) => i.questionId)))];
  if (ids.length === 0) return new Map();
  const rows = await client.question.findMany({ where: { id: { in: ids } }, select: { id: true, marks: true } });
  return new Map(rows.map((r) => [r.id, r.marks]));
}

// =====================================================================================================================
// Readiness checks
// =====================================================================================================================

export interface AssessmentChecks {
  errors: FieldErrors;
  warnings: FieldErrors;
  totals: Totals;
  blueprint: BlueprintReport | null;
}

const BLOCKING_WARNINGS: ReadonlySet<string> = new Set(["image-missing-alt", "image-unresolved", "image-external", "math-error", "unknown-directive"]);

/** What blocks review / approval / publication of an assessment (and advisory warnings), with totals and blueprint. */
export async function assessmentChecks(client: DbClient, id: string): Promise<AssessmentChecks> {
  const row = await client.assessment.findUnique({
    where: { id },
    select: {
      kind: true,
      assembly: true,
      subjectId: true,
      syllabusId: true,
      accessTier: true,
      totalMarks: true,
      instructions: true,
      description: true,
      copyrightStatus: true,
      sourceId: true,
      author: true,
      syllabus: { select: { status: true } },
      topics: { select: { topicId: true } },
      sections: STRUCTURE_SELECT,
    },
  });
  if (!row) throw AppError.notFound("Assessment not found.");
  const sections = row.sections.map(sectionData);
  const errors: FieldErrors = {};
  const warnings: FieldErrors = {};
  const add = (bucket: FieldErrors, field: string, message: string) => {
    const list = (bucket[field] ??= []);
    if (!list.includes(message)) list.push(message);
  };

  const totals = computeTotals(sections, await questionMarks(client, sections));
  if (sections.length === 0) add(errors, "sections", "Add at least one section.");
  if (row.assembly === "FIXED") {
    if (sections.every((s) => s.items.length === 0)) add(errors, "sections", "Add at least one question.");
    if (sections.some((s) => s.rules.length > 0)) add(errors, "sections", "A fixed assessment uses fixed questions only: remove the blueprint rules or switch to blueprint assembly.");
  } else if (sections.every((s) => s.rules.length === 0 && s.items.length === 0)) {
    add(errors, "sections", "Add blueprint rules or fixed questions.");
  }
  if (Math.max(1, totals.total) !== row.totalMarks) add(errors, "totalMarks", "The total marks are out of date (a question's marks changed). Save the structure again to update them.");
  if (row.syllabus?.status === "DRAFT") add(errors, "syllabusId", "The syllabus version is still a draft. Publish it before this assessment.");
  if (row.kind === "MOCK_EXAM" && !sections.some((s) => s.componentId)) add(warnings, "sections", "Link each section to the paper it simulates so results map onto the real exam.");

  const itemIds = [...new Set(sections.flatMap((s) => s.items.map((i) => i.questionId)))];
  if (itemIds.length > 0) {
    const questions = await client.question.findMany({ where: { id: { in: itemIds } }, select: { id: true, status: true, parentId: true, draftOfId: true, schoolId: true, ownerUserId: true } });
    const byId = new Map(questions.map((q) => [q.id, q]));
    sections.forEach((section, s) =>
      section.items.forEach((item, i) => {
        const q = byId.get(item.questionId);
        if (!q || q.parentId !== null || q.draftOfId !== null || q.schoolId !== null || q.ownerUserId !== null) add(errors, `sections.${s}.items.${i}`, "This question can no longer be used. Remove it.");
        else if (q.status !== "PUBLISHED") add(errors, `sections.${s}.items.${i}`, `Question ${s + 1}.${i + 1} is not published (it is ${q.status.toLowerCase().replace("_", " ")}).`);
      }),
    );
  }

  const blueprint =
    row.assembly === "FIXED"
      ? null
      : await blueprintReport(
          client,
          { subjectId: row.subjectId, syllabusId: row.syllabusId, scopeTopicIds: row.syllabusId ? await expandSubtrees(client, row.syllabusId, row.topics.map((t) => t.topicId)) : [], accessTier: row.accessTier },
          sections,
        );
  if (blueprint) {
    if (!blueprint.forAudience.possible) {
      add(errors, "rules", `The published bank cannot fill these rules for ${blueprint.audience}: ${blueprint.forAudience.assignable} of ${blueprint.forAudience.required} questions can be drawn.`);
    } else if (!blueprint.forAudience.guaranteed) {
      add(warnings, "rules", "Overlapping rules may leave some attempts short of questions. Narrow the rules or add questions to the bank.");
    }
  }

  const sources = [row.instructions, row.description, ...sections.map((s) => s.instructions)];
  const resolveAsset = await loadAssetResolver(sources, client);
  const fields: [string, string | null][] = [["instructions", row.instructions], ["description", row.description], ...sections.map((s, i): [string, string | null] => [`sections.${i}.instructions`, s.instructions])];
  for (const [field, source] of fields) {
    if (!source) continue;
    for (const warning of renderContent(source, { baseHeadingLevel: 3, resolveAsset }).warnings) {
      add(BLOCKING_WARNINGS.has(warning.code) ? errors : warnings, field, warning.line === undefined ? warning.message : `Line ${warning.line}: ${warning.message}`);
    }
  }
  return { errors: mergeFieldErrors(errors, provenanceProblems(row)), warnings, totals, blueprint };
}

// =====================================================================================================================
// Editor view
// =====================================================================================================================

export interface AssessmentQuestionInfo {
  excerpt: string;
  type: string;
  marks: number;
  difficulty: number;
  status: ContentStatus;
  topic: string | null;
}

export interface AssessmentEditorView {
  id: string;
  status: ContentStatus;
  revision: number;
  version: string;
  editable: boolean;
  aiGenerated: boolean;
  isDemo: boolean;
  draftOf: { id: string; status: ContentStatus; revision: number } | null;
  pendingDraft: { id: string; status: ContentStatus; revision: number; author: string | null } | null;
  meta: AssessmentMetaInput;
  subject: { id: string; name: string; qualificationId: string; label: string };
  sections: SectionInput[];
  questionInfo: Record<string, AssessmentQuestionInfo>;
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
  checks: AssessmentChecks;
  revisions: { revision: number; createdAt: Date; changeNote: string | null; author: string | null; approvedBy: string | null }[];
  attemptCount: number;
}

async function questionInfo(client: DbClient, ids: readonly string[]): Promise<Record<string, AssessmentQuestionInfo>> {
  if (ids.length === 0) return {};
  const rows = await client.question.findMany({
    where: { id: { in: [...new Set(ids)] } },
    select: {
      id: true,
      stem: true,
      type: true,
      marks: true,
      difficulty: true,
      status: true,
      topics: { where: { isPrimary: true }, select: { topic: { select: { name: true, code: true } } }, take: 1 },
    },
  });
  return Object.fromEntries(
    rows.map((r) => {
      const topic = r.topics[0]?.topic;
      return [r.id, { excerpt: plainExcerpt(r.stem), type: r.type, marks: r.marks, difficulty: r.difficulty, status: r.status, topic: topic ? `${topic.code ? `${topic.code} ` : ""}${topic.name}` : null }];
    }),
  );
}

export async function getAssessmentEditor(actor: CmsActor, id: string, context: CmsContext = {}): Promise<AssessmentEditorView> {
  assertCanDraft(actor);
  if (!UUID.test(id)) throw AppError.notFound("Assessment not found.");
  const client = readClient(context);
  const row = await client.assessment.findUnique({
    where: { id },
    select: {
      id: true,
      kind: true,
      assembly: true,
      subjectId: true,
      syllabusId: true,
      routeId: true,
      title: true,
      description: true,
      instructions: true,
      timeLimitSeconds: true,
      maxAttempts: true,
      gradeSchemeId: true,
      feedbackTiming: true,
      shuffleQuestions: true,
      shuffleOptions: true,
      allowNavigation: true,
      accessTier: true,
      schoolId: true,
      ownerUserId: true,
      status: true,
      revision: true,
      draftOfId: true,
      createdById: true,
      reviewedAt: true,
      reviewNotes: true,
      approvedAt: true,
      publishedAt: true,
      archivedAt: true,
      aiGenerated: true,
      isDemo: true,
      sourceId: true,
      author: true,
      copyrightStatus: true,
      licenceCode: true,
      attribution: true,
      sourceUrl: true,
      publicationDate: true,
      createdAt: true,
      updatedAt: true,
      createdBy: PERSON_SELECT,
      reviewedBy: PERSON_SELECT,
      approvedBy: PERSON_SELECT,
      topics: { select: { topicId: true } },
      sections: STRUCTURE_SELECT,
      subject: { select: { id: true, name: true, qualificationId: true, qualification: { select: { shortName: true, examBoard: { select: { shortName: true } } } } } },
      draftOf: { select: { id: true, status: true, revision: true } },
      pendingDraft: { select: { id: true, status: true, revision: true, createdBy: PERSON_SELECT } },
    },
  });
  if (!row || row.schoolId !== null || row.ownerUserId !== null) throw AppError.notFound("Assessment not found.");
  const liveId = row.draftOfId ?? row.id;
  const sections = row.sections.map(sectionData);
  const [checks, info, revisions, attemptCount] = await Promise.all([
    assessmentChecks(client, id),
    questionInfo(client, sections.flatMap((s) => s.items.map((i) => i.questionId))),
    client.contentRevision.findMany({
      where: { entityType: "ASSESSMENT", entityId: liveId },
      orderBy: { revision: "desc" },
      take: 20,
      select: { revision: true, createdAt: true, changeNote: true, author: PERSON_SELECT, approvedBy: PERSON_SELECT },
    }),
    client.assessmentAttempt.count({ where: { assessmentId: liveId } }),
  ]);
  return {
    id: row.id,
    status: row.status,
    revision: row.revision,
    version: row.updatedAt.toISOString(),
    editable: row.status === "DRAFT",
    aiGenerated: row.aiGenerated,
    isDemo: row.isDemo,
    draftOf: row.draftOf,
    pendingDraft: row.pendingDraft
      ? { id: row.pendingDraft.id, status: row.pendingDraft.status, revision: row.pendingDraft.revision, author: personName(row.pendingDraft.createdBy) }
      : null,
    meta: {
      kind: row.kind,
      assembly: row.assembly,
      subjectId: row.subjectId,
      syllabusId: row.syllabusId,
      routeId: row.routeId,
      title: row.title,
      description: row.description,
      instructions: row.instructions,
      timeLimitMinutes: row.timeLimitSeconds === null ? null : Math.round(row.timeLimitSeconds / 60),
      maxAttempts: row.maxAttempts,
      gradeSchemeId: row.gradeSchemeId,
      feedbackTiming: row.feedbackTiming,
      shuffleQuestions: row.shuffleQuestions,
      shuffleOptions: row.shuffleOptions,
      allowNavigation: row.allowNavigation,
      accessTier: row.accessTier,
      topicIds: row.topics.map((t) => t.topicId),
      sourceId: row.sourceId,
      author: row.author,
      copyrightStatus: row.copyrightStatus,
      licenceCode: row.licenceCode,
      attribution: row.attribution,
      sourceUrl: row.sourceUrl,
      publicationDate: row.publicationDate ? row.publicationDate.toISOString().slice(0, 10) : null,
    },
    subject: {
      id: row.subject.id,
      name: row.subject.name,
      qualificationId: row.subject.qualificationId,
      label: `${row.subject.name} (${row.subject.qualification.examBoard.shortName} ${row.subject.qualification.shortName})`,
    },
    sections,
    questionInfo: info,
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
    checks,
    revisions: revisions.map((r) => ({ revision: r.revision, createdAt: r.createdAt, changeNote: r.changeNote, author: personName(r.author), approvedBy: personName(r.approvedBy) })),
    attemptCount,
  };
}

/** Option lists of the builder that depend on the subject / syllabus version. */
export interface AssessmentBuilderOptions {
  routes: { value: string; label: string; syllabusId: string }[];
  components: { value: string; label: string; syllabusId: string; durationMinutes: number | null; maxMarks: number | null }[];
  gradeSchemes: { value: string; label: string }[];
}

export async function getAssessmentBuilderOptions(actor: CmsActor, input: { qualificationId: string; syllabusIds: readonly string[] }, context: CmsContext = {}): Promise<AssessmentBuilderOptions> {
  assertCanDraft(actor);
  const client = readClient(context);
  const syllabusIds = [...new Set(input.syllabusIds)].filter((id) => UUID.test(id));
  const [routes, components, schemes] = await Promise.all([
    syllabusIds.length ? client.syllabusRoute.findMany({ where: { syllabusId: { in: syllabusIds } }, select: { id: true, name: true, code: true, syllabusId: true }, orderBy: { sortOrder: "asc" } }) : [],
    syllabusIds.length
      ? client.syllabusComponent.findMany({
          where: { syllabusId: { in: syllabusIds } },
          select: { id: true, code: true, name: true, syllabusId: true, durationMinutes: true, maxMarks: true },
          orderBy: { sortOrder: "asc" },
        })
      : [],
    client.gradeScheme.findMany({ where: { qualificationId: input.qualificationId, isActive: true }, select: { id: true, name: true, version: true }, orderBy: { name: "asc" } }),
  ]);
  return {
    routes: routes.map((r) => ({ value: r.id, label: `${r.name} (${r.code})`, syllabusId: r.syllabusId })),
    components: components.map((c) => ({ value: c.id, label: `${c.code} · ${c.name}`, syllabusId: c.syllabusId, durationMinutes: c.durationMinutes, maxMarks: c.maxMarks })),
    gradeSchemes: schemes.map((s) => ({ value: s.id, label: s.version > 1 ? `${s.name} (v${s.version})` : s.name })),
  };
}

// =====================================================================================================================
// Create / update
// =====================================================================================================================

function metaColumns(meta: AssessmentMetaData) {
  return {
    kind: meta.kind,
    assembly: meta.assembly,
    subjectId: meta.subjectId,
    syllabusId: meta.syllabusId,
    routeId: meta.routeId,
    title: meta.title,
    description: meta.description,
    instructions: meta.instructions,
    timeLimitSeconds: meta.timeLimitMinutes === null ? null : meta.timeLimitMinutes * 60,
    maxAttempts: meta.maxAttempts,
    gradeSchemeId: meta.gradeSchemeId,
    feedbackTiming: meta.feedbackTiming,
    shuffleQuestions: meta.shuffleQuestions,
    shuffleOptions: meta.shuffleOptions,
    allowNavigation: meta.assembly === "ADAPTIVE" ? false : meta.allowNavigation,
    accessTier: meta.accessTier,
    sourceId: meta.sourceId,
    author: meta.author,
    copyrightStatus: meta.copyrightStatus,
    licenceCode: meta.licenceCode,
    attribution: meta.attribution,
    sourceUrl: meta.sourceUrl,
    publicationDate: meta.publicationDate ? new Date(`${meta.publicationDate}T00:00:00Z`) : null,
  };
}

/** Checks that the subject, version, route, grade scheme, source and scope topics exist and belong together. */
async function assertMetaReferences(client: DbClient, meta: AssessmentMetaData): Promise<void> {
  const errors: FieldErrors = {};
  const [subject, syllabus, route, scheme, source, topics] = await Promise.all([
    client.subject.findUnique({ where: { id: meta.subjectId }, select: { qualificationId: true } }),
    meta.syllabusId ? client.syllabus.findUnique({ where: { id: meta.syllabusId }, select: { subjectId: true } }) : null,
    meta.routeId ? client.syllabusRoute.findUnique({ where: { id: meta.routeId }, select: { syllabusId: true } }) : null,
    meta.gradeSchemeId ? client.gradeScheme.findUnique({ where: { id: meta.gradeSchemeId }, select: { qualificationId: true } }) : null,
    meta.sourceId ? client.contentSource.findUnique({ where: { id: meta.sourceId }, select: { id: true } }) : null,
    meta.topicIds.length ? client.topic.findMany({ where: { id: { in: meta.topicIds } }, select: { syllabusId: true } }) : [],
  ]);
  if (!subject) (errors.subjectId ??= []).push("Choose a subject.");
  if (meta.syllabusId && (!syllabus || syllabus.subjectId !== meta.subjectId)) (errors.syllabusId ??= []).push("Choose a syllabus version of this subject.");
  if (meta.routeId && (!route || route.syllabusId !== meta.syllabusId)) (errors.routeId ??= []).push("Choose a route of the selected syllabus version.");
  if (meta.gradeSchemeId && (!scheme || scheme.qualificationId !== subject?.qualificationId)) (errors.gradeSchemeId ??= []).push("Choose a grade scheme of this qualification.");
  if (meta.sourceId && !source) (errors.sourceId ??= []).push("Choose a content source from the list.");
  if (topics.length !== new Set(meta.topicIds).size || (meta.syllabusId && topics.some((t) => t.syllabusId !== meta.syllabusId))) {
    (errors.topicIds ??= []).push(meta.syllabusId ? "Choose topics of the selected syllabus version." : "Choose a syllabus version before limiting the topics.");
  }
  if (Object.keys(errors).length > 0) throw AppError.validation(errors, "Some choices do not fit together.");
}

/** Creates a DRAFT assessment with one empty section (`content.draft`). */
export async function createAssessment(actor: CmsActor, raw: unknown, context: CmsContext = {}): Promise<{ id: string }> {
  assertCanDraft(actor);
  const meta = parseInput(assessmentCreateSchema, raw);
  return inTransaction(context, async (tx) => {
    await assertMetaReferences(tx, meta);
    const created = await tx.assessment.create({
      data: { ...metaColumns(meta), totalMarks: 1, status: "DRAFT", createdById: actor.userId, sections: { create: { title: "Section A", sortOrder: 0 } } },
      select: { id: true },
    });
    if (meta.topicIds.length > 0) await tx.assessmentTopic.createMany({ data: [...new Set(meta.topicIds)].map((topicId) => ({ assessmentId: created.id, topicId })) });
    await refreshAssessmentDerived(tx, created.id);
    await auditCms(tx, actor, context, {
      action: CMS_CONTENT_AUDIT.CREATE,
      operation: CMS_CONTENT_OPERATIONS.create,
      entityType: "Assessment",
      entityId: created.id,
      after: { kind: meta.kind, assembly: meta.assembly, subjectId: meta.subjectId, title: meta.title },
    });
    return created;
  });
}

async function lockDraft(tx: Tx, id: string, version: string | undefined): Promise<void> {
  await tx.$queryRaw`SELECT "id" FROM "Assessment" WHERE "id" = ${id}::uuid FOR UPDATE`;
  const row = await findPlatformRow(tx, "ASSESSMENT", id);
  if (row.status !== "DRAFT") {
    throw AppError.conflict(row.status === "PUBLISHED" ? "Published assessments are edited through a draft copy. Choose “Edit” first." : "Only drafts can be edited. Send it back to draft first.");
  }
  const current = await tx.assessment.findUniqueOrThrow({ where: { id }, select: { updatedAt: true } });
  if (version && current.updatedAt.toISOString() !== version) {
    throw AppError.conflict("Someone else saved this assessment after you opened it. Reload to see their changes, then edit again.");
  }
}

/** Saves the settings of a DRAFT assessment (`content.draft`). The structure is saved separately. */
export async function updateAssessmentMeta(actor: CmsActor, raw: unknown, context: CmsContext = {}): Promise<{ id: string; version: string }> {
  assertCanDraft(actor);
  const input = parseInput(assessmentUpdateSchema, raw);
  const { id, version, ...meta } = input;
  return inTransaction(context, async (tx) => {
    await lockDraft(tx, id, version);
    await assertMetaReferences(tx, meta);
    const before = await tx.assessment.findUniqueOrThrow({ where: { id }, select: { kind: true, assembly: true, syllabusId: true, accessTier: true, title: true } });
    if (before.syllabusId !== meta.syllabusId) {
      // Sections name papers and rules name topics of the old version: they cannot carry over.
      const stale = await tx.assessmentSection.count({
        where: { assessmentId: id, OR: [{ componentId: { not: null } }, { rules: { some: { OR: [{ topicId: { not: null } }, { objectiveId: { not: null } }] } } }] },
      });
      if (stale > 0) throw AppError.validation({ syllabusId: ["Sections or rules still refer to papers or topics of the current version. Remove those links first."] });
    }
    await tx.assessment.update({ where: { id }, data: { ...metaColumns(meta), createdById: actor.userId } });
    await tx.assessmentTopic.deleteMany({ where: { assessmentId: id } });
    if (meta.topicIds.length > 0) await tx.assessmentTopic.createMany({ data: [...new Set(meta.topicIds)].map((topicId) => ({ assessmentId: id, topicId })) });
    await refreshAssessmentDerived(tx, id);
    const saved = await tx.assessment.findUniqueOrThrow({ where: { id }, select: { updatedAt: true } });
    await auditCms(tx, actor, context, {
      action: CMS_CONTENT_AUDIT.UPDATE,
      operation: CMS_CONTENT_OPERATIONS.update,
      entityType: "Assessment",
      entityId: id,
      before,
      after: { kind: meta.kind, assembly: meta.assembly, syllabusId: meta.syllabusId, accessTier: meta.accessTier, title: meta.title },
      metadata: { part: "settings" },
    });
    return { id, version: saved.updatedAt.toISOString() };
  });
}

/** Validates the questions, papers, topics and objectives a structure names against the assessment. */
async function assertStructureReferences(client: DbClient, assessment: { assembly: AssessmentAssembly; syllabusId: string | null }, sections: readonly SectionData[]): Promise<void> {
  const errors: FieldErrors = {};
  const itemIds = [...new Set(sections.flatMap((s) => s.items.map((i) => i.questionId)))];
  const componentIds = [...new Set(sections.map((s) => s.componentId).filter((id): id is string => id !== null))];
  const topicIds = [...new Set(sections.flatMap((s) => s.rules.map((r) => r.topicId)).filter((id): id is string => id !== null))];
  const objectiveIds = [...new Set(sections.flatMap((s) => s.rules.map((r) => r.objectiveId)).filter((id): id is string => id !== null))];
  const [questions, components, topics, objectives] = await Promise.all([
    itemIds.length ? client.question.findMany({ where: { id: { in: itemIds } }, select: { id: true, parentId: true, draftOfId: true, schoolId: true, ownerUserId: true } }) : [],
    componentIds.length ? client.syllabusComponent.findMany({ where: { id: { in: componentIds } }, select: { id: true, syllabusId: true } }) : [],
    topicIds.length ? client.topic.findMany({ where: { id: { in: topicIds } }, select: { id: true, syllabusId: true } }) : [],
    objectiveIds.length ? client.learningObjective.findMany({ where: { id: { in: objectiveIds } }, select: { id: true, topic: { select: { syllabusId: true } } } }) : [],
  ]);
  const usable = new Set(questions.filter((q) => q.parentId === null && q.draftOfId === null && q.schoolId === null && q.ownerUserId === null).map((q) => q.id));
  const componentOk = new Set(components.filter((c) => c.syllabusId === assessment.syllabusId).map((c) => c.id));
  const topicOk = new Set(topics.filter((t) => t.syllabusId === assessment.syllabusId).map((t) => t.id));
  const objectiveOk = new Set(objectives.filter((o) => o.topic.syllabusId === assessment.syllabusId).map((o) => o.id));
  sections.forEach((section, s) => {
    if (section.componentId && !componentOk.has(section.componentId)) (errors[`sections.${s}.componentId`] ??= []).push("Choose a paper of the assessment's syllabus version.");
    section.items.forEach((item, i) => {
      if (!usable.has(item.questionId)) (errors[`sections.${s}.items.${i}.questionId`] ??= []).push("This question cannot be used here (a part, a draft copy or a school's own question).");
    });
    if (assessment.assembly === "FIXED" && section.rules.length > 0) {
      (errors[`sections.${s}.rules`] ??= []).push("Fixed assessments use fixed questions only. Switch to blueprint assembly in the settings to draw questions by rule.");
    }
    section.rules.forEach((rule, r) => {
      if (rule.topicId && !topicOk.has(rule.topicId)) (errors[`sections.${s}.rules.${r}.topicId`] ??= []).push("Choose a topic of the assessment's syllabus version.");
      if (rule.objectiveId && !objectiveOk.has(rule.objectiveId)) (errors[`sections.${s}.rules.${r}.objectiveId`] ??= []).push("Choose a learning objective of the assessment's syllabus version.");
    });
  });
  if (Object.keys(errors).length > 0) throw AppError.validation(errors, "Some questions, papers or topics do not belong to this assessment.");
}

/**
 * Replaces the sections, fixed items and blueprint rules of a DRAFT assessment (`content.draft`) and recomputes
 * `totalMarks`. Returns the totals and the blueprint check of what was saved.
 */
export async function saveAssessmentStructure(actor: CmsActor, raw: unknown, context: CmsContext = {}): Promise<{ id: string; version: string; totals: Totals }> {
  assertCanDraft(actor);
  const input = parseInput(structureSchema, raw);
  return inTransaction(context, async (tx) => {
    await lockDraft(tx, input.id, input.version);
    const assessment = await tx.assessment.findUniqueOrThrow({ where: { id: input.id }, select: { assembly: true, syllabusId: true, totalMarks: true } });
    const sections = input.sections;
    await assertStructureReferences(tx, assessment, sections);
    const totals = computeTotals(sections, await questionMarks(tx, sections));
    await tx.assessmentSection.deleteMany({ where: { assessmentId: input.id } });
    for (const [index, section] of sections.entries()) {
      await tx.assessmentSection.create({
        data: {
          assessmentId: input.id,
          title: section.title,
          instructions: section.instructions,
          componentId: section.componentId,
          sortOrder: index,
          timeLimitSeconds: section.timeLimitMinutes === null ? null : section.timeLimitMinutes * 60,
          answerCount: section.answerCount,
          marks: section.answerCount !== null ? section.marks : (totals.sections[index]?.exact ? (totals.sections[index]?.total ?? null) : null),
          items: { create: section.items.map((item, i) => ({ questionId: item.questionId, label: item.label, marks: item.marks, sortOrder: i })) },
          rules: { create: section.rules.map((rule, r) => ({ ...rule, sortOrder: r })) },
        },
      });
    }
    await tx.assessment.update({ where: { id: input.id }, data: { totalMarks: Math.max(1, totals.total), createdById: actor.userId } });
    await refreshAssessmentDerived(tx, input.id);
    const saved = await tx.assessment.findUniqueOrThrow({ where: { id: input.id }, select: { updatedAt: true } });
    await auditCms(tx, actor, context, {
      action: CMS_CONTENT_AUDIT.UPDATE,
      operation: CMS_CONTENT_OPERATIONS.update,
      entityType: "Assessment",
      entityId: input.id,
      before: { totalMarks: assessment.totalMarks },
      after: {
        totalMarks: Math.max(1, totals.total),
        sections: sections.length,
        items: sections.reduce((n, s) => n + s.items.length, 0),
        rules: sections.reduce((n, s) => n + s.rules.length, 0),
      },
      metadata: { part: "structure" },
    });
    return { id: input.id, version: saved.updatedAt.toISOString(), totals };
  });
}

/**
 * Deletes a draft that was never published and is used nowhere (`content.draft`). Draft copies are discarded instead;
 * published assessments are archived, never deleted (attempts reference them).
 */
export async function deleteDraftAssessment(actor: CmsActor, raw: unknown, context: CmsContext = {}): Promise<{ id: string }> {
  assertCanDraft(actor);
  const { id } = parseInput(blueprintCheckSchema.pick({ id: true }), raw);
  return inTransaction(context, async (tx) => {
    const row = await findPlatformRow(tx, "ASSESSMENT", id);
    if (row.draftOfId !== null) throw new AppError("BAD_REQUEST", "This is an edit of a published assessment: discard the draft copy instead.");
    const extra = await tx.assessment.findUniqueOrThrow({
      where: { id },
      select: { publishedAt: true, title: true, _count: { select: { attempts: true, assignments: true, studyPlanTemplateItems: true, studyPlanItems: true } } },
    });
    if (row.status !== "DRAFT" || extra.publishedAt !== null || row.revision > 1) throw AppError.conflict("Only drafts that were never published can be deleted. Archive published assessments instead.");
    const uses = extra._count.attempts + extra._count.assignments + extra._count.studyPlanTemplateItems + extra._count.studyPlanItems;
    if (uses > 0) throw AppError.conflict("This draft is used by attempts, assignments or study plans. It cannot be deleted.");
    await clearMediaUsage(tx, "ASSESSMENT", id);
    await tx.assessment.delete({ where: { id } });
    await auditCms(tx, actor, context, { action: CMS_CONTENT_AUDIT.DELETE, operation: CMS_CONTENT_OPERATIONS.delete, entityType: "Assessment", entityId: id, before: { title: extra.title } });
    return { id };
  });
}

/** Live check of the rules being edited (not yet saved): can the published bank fill them? (`content.draft`) */
export async function checkBlueprint(actor: CmsActor, raw: unknown, context: CmsContext = {}): Promise<{ totals: Totals; blueprint: BlueprintReport | null }> {
  assertCanDraft(actor);
  const input = parseInput(blueprintCheckSchema, raw);
  const client = readClient(context);
  await findPlatformRow(client, "ASSESSMENT", input.id);
  const row = await client.assessment.findUniqueOrThrow({
    where: { id: input.id },
    select: { subjectId: true, syllabusId: true, accessTier: true, topics: { select: { topicId: true } } },
  });
  const scope = row.syllabusId ? await expandSubtrees(client, row.syllabusId, row.topics.map((t) => t.topicId)) : [];
  const totals = computeTotals(input.sections, await questionMarks(client, input.sections));
  const blueprint = await blueprintReport(client, { subjectId: row.subjectId, syllabusId: row.syllabusId, scopeTopicIds: scope, accessTier: row.accessTier }, input.sections);
  return { totals, blueprint };
}

/**
 * Media usage of the assessment's markdown (instructions, description, section instructions), through the media
 * library's one mapping (src/server/cms/media/usage.ts) shared with publish merges and draft copies.
 */
async function refreshAssessmentDerived(tx: Tx, id: string): Promise<void> {
  await syncMediaUsageFromAggregate(tx, "ASSESSMENT", id);
}

// =====================================================================================================================
// Student preview
// =====================================================================================================================

export interface AssessmentPreviewQuestion {
  number: number;
  label: string | null;
  marks: number;
  /** Null when the question cannot be shown (incomplete definition). */
  question: PresentedQuestion | null;
  /** Drawn by a blueprint rule (a sample: real attempts draw their own). */
  drawn: boolean;
}

export interface AssessmentPreview {
  title: string;
  kind: AssessmentKind;
  assembly: AssessmentAssembly;
  status: ContentStatus;
  instructionsHtml: SanitizedHtml | null;
  timeLimitMinutes: number | null;
  totals: Totals;
  sections: {
    title: string;
    instructionsHtml: SanitizedHtml | null;
    timeLimitMinutes: number | null;
    answerCount: number | null;
    marks: number | null;
    questions: AssessmentPreviewQuestion[];
    /** Questions the rules could not draw for this sample. */
    shortfall: number;
  }[];
}

/**
 * The assessment as a student would see it (§13 exam mode, read-only): instructions, sections and questions. For
 * blueprint assessments the rules draw a seeded SAMPLE from the questions the assessment's audience may be given.
 */
export async function getAssessmentPreview(actor: CmsActor, id: string, seed: string, context: CmsContext = {}): Promise<AssessmentPreview> {
  assertCanDraft(actor);
  const client = readClient(context);
  await findPlatformRow(client, "ASSESSMENT", id);
  const row = await client.assessment.findUniqueOrThrow({
    where: { id },
    select: {
      title: true,
      kind: true,
      assembly: true,
      status: true,
      subjectId: true,
      syllabusId: true,
      accessTier: true,
      instructions: true,
      timeLimitSeconds: true,
      shuffleQuestions: true,
      topics: { select: { topicId: true } },
      sections: STRUCTURE_SELECT,
    },
  });
  const sections = row.sections.map(sectionData);
  const scope = row.syllabusId ? await expandSubtrees(client, row.syllabusId, row.topics.map((t) => t.topicId)) : [];
  const random = createRng(`preview:${id}:${seed}`);
  const chosen = new Set(sections.flatMap((s) => s.items.map((i) => i.questionId)));
  const plan: { items: { questionId: string; label: string | null; marks: number | null; drawn: boolean }[]; shortfall: number }[] = [];
  for (const section of sections) {
    const items = section.items.map((item) => ({ questionId: item.questionId, label: item.label, marks: item.marks, drawn: false }));
    let shortfall = 0;
    if (row.assembly !== "FIXED") {
      for (const rule of section.rules) {
        const { ids } = await ruleCandidates(client, { subjectId: row.subjectId, syllabusId: row.syllabusId, scopeTopicIds: scope }, rule, tiersUpTo(row.accessTier), [...chosen]);
        const picks = shuffled(ids, random).slice(0, rule.questionCount);
        shortfall += rule.questionCount - picks.length;
        for (const pick of picks) {
          chosen.add(pick);
          items.push({ questionId: pick, label: null, marks: null, drawn: true });
        }
      }
    }
    plan.push({ items: row.shuffleQuestions ? shuffled(items, random) : items, shortfall });
  }
  const records = await loadQuestionRecords(client, [...chosen]);
  const presented = await presentRecords([...records.values()], `preview:${id}:${seed}`);
  const resolveAsset = await loadAssetResolver([row.instructions, ...sections.map((s) => s.instructions)], client);
  const html = (source: string | null) => (source ? renderContent(source, { baseHeadingLevel: 3, idPrefix: "a-", resolveAsset }).html : null);
  let number = 0;
  return {
    title: row.title,
    kind: row.kind,
    assembly: row.assembly,
    status: row.status,
    instructionsHtml: html(row.instructions),
    timeLimitMinutes: row.timeLimitSeconds === null ? null : Math.round(row.timeLimitSeconds / 60),
    totals: computeTotals(sections, await questionMarks(client, sections)),
    sections: sections.map((section, s) => ({
      title: section.title,
      instructionsHtml: html(section.instructions),
      timeLimitMinutes: section.timeLimitMinutes,
      answerCount: section.answerCount,
      marks: section.marks,
      shortfall: plan[s]?.shortfall ?? 0,
      questions: (plan[s]?.items ?? []).map((item) => {
        number += 1;
        const record = records.get(item.questionId);
        return { number, label: item.label, marks: item.marks ?? record?.marks ?? 0, question: presented.get(item.questionId) ?? null, drawn: item.drawn };
      }),
    })),
  };
}

// =====================================================================================================================
// Workflow
// =====================================================================================================================

export const ASSESSMENT_WORKFLOW_HOOKS: WorkflowHooks = {
  readiness: async (tx, id) => (await assessmentChecks(tx, id)).errors,
  afterContentChange: refreshAssessmentDerived,
};

export const submitAssessment = (actor: CmsActor, raw: unknown, context?: CmsContext): Promise<WorkflowResult> =>
  submitItem(actor, "ASSESSMENT", raw, context, ASSESSMENT_WORKFLOW_HOOKS);
export const requestAssessmentChanges = (actor: CmsActor, raw: unknown, context?: CmsContext): Promise<WorkflowResult> =>
  requestItemChanges(actor, "ASSESSMENT", raw, context);
export const approveAssessment = (actor: CmsActor, raw: unknown, context?: CmsContext): Promise<WorkflowResult> =>
  approveItem(actor, "ASSESSMENT", raw, context, ASSESSMENT_WORKFLOW_HOOKS);
export const publishAssessment = (actor: CmsActor, raw: unknown, context?: CmsContext): Promise<PublishResult> =>
  publishItem(actor, "ASSESSMENT", raw, context, ASSESSMENT_WORKFLOW_HOOKS);
export const archiveAssessment = (actor: CmsActor, raw: unknown, context?: CmsContext): Promise<WorkflowResult> => archiveItem(actor, "ASSESSMENT", raw, context);
export const reopenAssessment = (actor: CmsActor, raw: unknown, context?: CmsContext): Promise<WorkflowResult> => reopenItem(actor, "ASSESSMENT", raw, context);
export const editPublishedAssessment = (actor: CmsActor, raw: unknown, context?: CmsContext): Promise<DraftCopy> =>
  startEditingItem(actor, "ASSESSMENT", raw, context, ASSESSMENT_WORKFLOW_HOOKS);
export const discardAssessmentDraft = (actor: CmsActor, raw: unknown, context?: CmsContext): Promise<{ liveId: string }> =>
  discardItemDraftCopy(actor, "ASSESSMENT", raw, context);
