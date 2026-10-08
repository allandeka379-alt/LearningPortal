import "server-only";
import { Prisma, type AssessmentFeedbackTiming, type AssessmentKind, type ContentStatus, type QuestionType } from "@/generated/prisma/client";
import type { ContentWarning, SanitizedHtml } from "@/lib/content/types";
import { validateQuestionDefinition, type QuestionDefinitionInput } from "@/lib/questions";
import { issuesToFieldErrors } from "@/server/cms/questions/core";
import { refreshQuestionDerived } from "@/server/cms/questions/service";
import { archive, publish, type ContentActor } from "@/server/content/publish";
import { renderContent, renderInline, toExcerpt } from "@/server/content/render";
import { buildTopicTree, flattenTopicTree, PUBLISHED_SYLLABUS_STATUSES } from "@/server/curriculum/core";
import { db, type DbClient } from "@/server/db";
import type { Tx } from "@/server/lib/db-context";
import { AppError } from "@/server/lib/errors";
import { assertTeacher, canUseTenantContent, isUuid, listTeachingSchools, resolveContentTenant, type ContentTenant, type TeachingActor } from "./access";
import { listSubjectOptions, type SubjectOption } from "./classes";
import { rosterName } from "./core";
import {
  questionSearchSchema,
  teacherQuestionSchema,
  teacherTestSchema,
  updateTeacherTestSchema,
  type TeacherQuestionData,
} from "./schemas";
import { parseWith } from "./validation";

/**
 * The teacher test builder (§22 "create tests"; ARCHITECTURE §4.4 tenancy). Tests and questions a teacher writes
 * belong to a SCHOOL (shared with that school's teachers, set to its classes) or to the teacher as an INDEPENDENT
 * TUTOR (their own school-less classes). They follow the owner's lighter workflow allowed by the schema: drafted, then
 * published by the owner without editorial review — still through the shared publish helper (validated, revisioned,
 * snapshotted, audited). Private items never enter the platform bank, search or daily questions (database guards).
 *
 * - Questions: written with the per-type forms (all types except diagram labelling, which needs the media library),
 *   tagged to one topic of the subject (mastery and reports count answers there), recorded as the owner's original
 *   work (the teacher confirms they may use it), published immediately.
 * - Tests: FIXED papers mixing PUBLISHED platform questions and the owner's own questions (the tenant guard refuses
 *   anything else), with per-item mark weighting; drafts are edited freely, then published; published tests are
 *   archived rather than edited (classes keep working on the revision they started).
 * - Using a tenant's content needs membership: any ACTIVE teacher of the school (or the tutor); changing it needs the
 *   author or a school admin of that school.
 */

function contentActor(actor: TeachingActor): ContentActor {
  return { kind: "user", userId: actor.userId, roles: actor.roles };
}

// =====================================================================================================================
// Options and question search
// =====================================================================================================================

export interface TestOwnerOption {
  key: string;
  label: string;
  owner: { kind: "school"; schoolId: string } | { kind: "tutor" };
}

export interface TestBuilderOptions {
  owners: TestOwnerOption[];
  subjects: SubjectOption[];
}

/** Who the actor can create tests for (each school they teach at, and themselves as a tutor) and the subjects. */
export async function getTestBuilderOptions(actor: TeachingActor): Promise<TestBuilderOptions> {
  assertTeacher(actor);
  const [schools, subjects] = await Promise.all([listTeachingSchools(actor), listSubjectOptions()]);
  return {
    owners: [
      ...schools.map((s) => ({ key: `school:${s.id}`, label: s.name, owner: { kind: "school" as const, schoolId: s.id } })),
      { key: "tutor", label: "My own classes (independent tutor)", owner: { kind: "tutor" as const } },
    ],
    subjects,
  };
}

export interface BuilderQuestion {
  id: string;
  type: QuestionType;
  excerpt: string;
  marks: number;
  difficulty: number;
  topic: string | null;
  source: "bank" | "own";
}

function tenantWhere(tenant: ContentTenant): Prisma.QuestionWhereInput {
  return tenant.schoolId ? { schoolId: tenant.schoolId } : { ownerUserId: tenant.ownerUserId };
}

/**
 * Published questions for the builder's picker: the platform bank of the subject, or the owner's own questions.
 * Excerpts only (no answers).
 */
export async function searchBuilderQuestions(actor: TeachingActor, input: unknown): Promise<BuilderQuestion[]> {
  const f = parseWith(questionSearchSchema, input);
  const tenant = await resolveContentTenant(actor, f.owner);
  const where: Prisma.QuestionWhereInput[] = [
    { status: "PUBLISHED", parentId: null, draftOfId: null },
    f.source === "bank" ? { schoolId: null, ownerUserId: null } : tenantWhere(tenant),
    { OR: [{ subjectId: f.subjectId }, { topics: { some: { subjectId: f.subjectId } } }] },
  ];
  if (f.topicId) {
    const subtree = await db.topic.findMany({ where: { path: { contains: f.topicId } }, select: { id: true }, take: 500 });
    where.push({ topics: { some: { topicId: { in: subtree.map((t) => t.id) } } } });
  }
  if (f.type) where.push({ type: f.type });
  if (f.difficulty) where.push({ difficulty: f.difficulty });
  if (f.q) where.push({ stem: { contains: f.q, mode: "insensitive" } });
  if (f.excludeIds.length > 0) where.push({ id: { notIn: f.excludeIds } });
  const rows = await db.question.findMany({
    where: { AND: where },
    orderBy: [{ updatedAt: "desc" }, { id: "desc" }],
    take: f.limit,
    select: {
      id: true,
      type: true,
      stem: true,
      marks: true,
      difficulty: true,
      schoolId: true,
      ownerUserId: true,
      topics: { where: { isPrimary: true }, select: { topic: { select: { name: true } } }, take: 1 },
    },
  });
  return rows.map((row) => ({
    id: row.id,
    type: row.type,
    excerpt: toExcerpt(row.stem, 160),
    marks: row.marks,
    difficulty: row.difficulty,
    topic: row.topics[0]?.topic.name ?? null,
    source: row.schoolId === null && row.ownerUserId === null ? "bank" : "own",
  }));
}

/** Server-rendered preview of authored markdown for the builder's fields (teachers have no media library: no images). */
export async function previewTeacherMarkdown(actor: TeachingActor, input: { source: string; inline: boolean }): Promise<{ html: SanitizedHtml; warnings: ContentWarning[] }> {
  assertTeacher(actor);
  const source = typeof input.source === "string" ? input.source.slice(0, 20_000) : "";
  const rendered = input.inline ? renderInline(source, { idPrefix: "tpv-" }) : renderContent(source, { idPrefix: "tpv-", baseHeadingLevel: 3 });
  return { html: rendered.html, warnings: [...rendered.warnings] };
}

// =====================================================================================================================
// Questions
// =====================================================================================================================

type Part = TeacherQuestionData["parts"][number];
type SubPart = Part["parts"][number];

function definitionOf(source: { type: QuestionType; markingMode: TeacherQuestionData["markingMode"]; marks: number; payload: unknown; answerSpec: unknown; options: { key: string; isCorrect: boolean }[]; partLabel?: string; parts?: readonly (Part | SubPart)[] }): QuestionDefinitionInput {
  return {
    type: source.type,
    markingMode: source.markingMode,
    marks: source.marks,
    payload: source.payload ?? null,
    answerSpec: source.answerSpec ?? null,
    partLabel: source.partLabel ?? null,
    options: source.options.map((o) => ({ key: o.key, isCorrect: o.isCorrect })),
    parts: (source.parts ?? []).map((p) => definitionOf(p as Part)),
  };
}

/** Structural rules the CMS applies too: STRUCTURED marks = sum of parts; only MCQs keep options; only STRUCTURED parts. */
function normalise(data: TeacherQuestionData): TeacherQuestionData {
  const structured = data.type === "STRUCTURED";
  const parts = structured
    ? data.parts.map((part) => {
        const nested = part.type === "STRUCTURED";
        const children = nested ? part.parts.map((sub) => ({ ...sub, options: sub.type === "MULTIPLE_CHOICE" ? sub.options : [] })) : [];
        return {
          ...part,
          parts: children,
          options: part.type === "MULTIPLE_CHOICE" ? part.options : [],
          payload: nested ? null : part.payload,
          answerSpec: nested ? null : part.answerSpec,
          marks: nested && children.length > 0 ? children.reduce((sum, c) => sum + c.marks, 0) : part.marks,
        };
      })
    : [];
  return {
    ...data,
    parts,
    options: data.type === "MULTIPLE_CHOICE" ? data.options : [],
    payload: structured ? null : data.payload,
    answerSpec: structured ? null : data.answerSpec,
    marks: structured && parts.length > 0 ? parts.reduce((sum, p) => sum + p.marks, 0) : data.marks,
  };
}

const json = (value: unknown): Prisma.InputJsonValue | typeof Prisma.DbNull => (value === null || value === undefined ? Prisma.DbNull : (value as Prisma.InputJsonValue));

async function insertTree(
  tx: Tx,
  node: { type: QuestionType; markingMode: TeacherQuestionData["markingMode"]; stem: string; payload: unknown; answerSpec: unknown; marks: number; options: TeacherQuestionData["options"]; explanation: string | null; workedSolution: string | null; hints: string[]; parts?: readonly (Part | SubPart)[] },
  common: { subjectId: string; difficulty: number; schoolId: string | null; ownerUserId: string | null; createdById: string },
  parent: { id: string; partLabel: string; partOrder: number } | null,
): Promise<string> {
  const created = await tx.question.create({
    data: {
      ...common,
      type: node.type,
      markingMode: node.markingMode,
      stem: node.stem,
      payload: json(node.payload),
      answerSpec: json(node.answerSpec),
      marks: node.marks,
      explanation: node.explanation,
      workedSolution: node.workedSolution,
      hints: node.hints,
      accessTier: "FREE",
      copyrightStatus: "OWNED",
      status: "DRAFT",
      ...(parent ? { parentId: parent.id, partLabel: parent.partLabel, partOrder: parent.partOrder } : {}),
    },
    select: { id: true },
  });
  if (node.options.length > 0) {
    await tx.questionOption.createMany({
      data: node.options.map((o, index) => ({ questionId: created.id, key: o.key, content: o.content, isCorrect: o.isCorrect, rationale: o.rationale, sortOrder: index })),
    });
  }
  for (const [index, part] of (node.parts ?? []).entries()) {
    await insertTree(tx, { ...part, parts: "parts" in part ? part.parts : [] }, common, { id: created.id, partLabel: part.partLabel, partOrder: index });
  }
  return created.id;
}

/**
 * Writes and publishes a question in the owner's private bank (one transaction). Definition problems (e.g. no correct
 * option, an empty mark scheme) are returned as field errors and nothing is saved.
 */
export async function createTeacherQuestion(actor: TeachingActor, input: unknown): Promise<{ id: string; marks: number }> {
  const data = normalise(parseWith(teacherQuestionSchema, input));
  const tenant = await resolveContentTenant(actor, data.owner);
  const issues = validateQuestionDefinition(definitionOf(data)).issues.filter((i) => i.severity === "error");
  if (data.stem.trim() === "" && data.type !== "STRUCTURED") issues.push({ severity: "error", path: ["stem"], message: "Write the question." });
  if (issues.length > 0) throw AppError.validation(issuesToFieldErrors(issues), "Fix the highlighted problems before saving.");
  const topic = await db.topic.findFirst({
    where: { id: data.topicId, syllabus: { subjectId: data.subjectId, status: { in: [...PUBLISHED_SYLLABUS_STATUSES] } } },
    select: { id: true, syllabusId: true },
  });
  if (!topic) throw AppError.validation({ topicId: ["Choose a topic of this subject."] });
  return db.$transaction(
    async (tx) => {
      const id = await insertTree(
        tx,
        data,
        { subjectId: data.subjectId, difficulty: data.difficulty, schoolId: tenant.schoolId, ownerUserId: tenant.ownerUserId, createdById: actor.userId },
        null,
      );
      await tx.questionTopic.create({ data: { questionId: id, topicId: topic.id, syllabusId: topic.syllabusId, subjectId: data.subjectId, isPrimary: true } });
      await refreshQuestionDerived(tx, id);
      await publish(tx, "QUESTION", id, contentActor(actor), { changeNote: "Teacher question" });
      return { id, marks: data.marks };
    },
    { timeout: 30_000, maxWait: 10_000 },
  );
}

// =====================================================================================================================
// Tests
// =====================================================================================================================

export interface TeacherTestSummary {
  id: string;
  title: string;
  kind: AssessmentKind;
  status: ContentStatus;
  subjectName: string;
  owner: "school" | "tutor";
  ownerName: string;
  totalMarks: number;
  questionCount: number;
  author: string | null;
  isMine: boolean;
  updatedAt: Date;
}

/** Tests of the schools the actor teaches at and the actor's own tutor tests (newest first). */
export async function listTeacherTests(actor: TeachingActor): Promise<TeacherTestSummary[]> {
  assertTeacher(actor);
  const schools = await listTeachingSchools(actor);
  const rows = await db.assessment.findMany({
    where: {
      draftOfId: null,
      status: { not: "ARCHIVED" },
      OR: [...(schools.length ? [{ schoolId: { in: schools.map((s) => s.id) } }] : []), { ownerUserId: actor.userId }],
    },
    select: {
      id: true,
      title: true,
      kind: true,
      status: true,
      totalMarks: true,
      schoolId: true,
      createdById: true,
      updatedAt: true,
      subject: { select: { name: true } },
      school: { select: { name: true } },
      createdBy: { select: { profile: { select: { displayName: true, firstName: true, lastName: true } } } },
      sections: { select: { _count: { select: { items: true } } } },
    },
    orderBy: [{ updatedAt: "desc" }, { id: "desc" }],
    take: 200,
  });
  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    kind: row.kind,
    status: row.status,
    subjectName: row.subject.name,
    owner: row.schoolId ? "school" : "tutor",
    ownerName: row.school?.name ?? "My own classes",
    totalMarks: row.totalMarks,
    questionCount: row.sections.reduce((sum, s) => sum + s._count.items, 0),
    author: row.createdBy ? rosterName(row.createdBy.profile) : null,
    isMine: row.createdById === actor.userId,
    updatedAt: row.updatedAt,
  }));
}

interface LoadedTest {
  id: string;
  status: ContentStatus;
  subjectId: string;
  schoolId: string | null;
  ownerUserId: string | null;
  createdById: string | null;
  publishedAt: Date | null;
  revision: number;
  canEdit: boolean;
}

async function loadTest(actor: TeachingActor, assessmentId: string, options: { edit?: boolean; client?: DbClient } = {}): Promise<LoadedTest> {
  assertTeacher(actor);
  if (!isUuid(assessmentId)) throw AppError.notFound("Test not found.");
  const client = options.client ?? db;
  const row = await client.assessment.findUnique({
    where: { id: assessmentId },
    select: { id: true, status: true, subjectId: true, schoolId: true, ownerUserId: true, createdById: true, draftOfId: true, publishedAt: true, revision: true },
  });
  // Platform tests are not edited here; another tenant's test does not exist for this teacher.
  if (!row || row.draftOfId !== null || (row.schoolId === null && row.ownerUserId === null)) throw AppError.notFound("Test not found.");
  if (!(await canUseTenantContent(actor, { schoolId: row.schoolId, ownerUserId: row.ownerUserId }, client))) throw AppError.notFound("Test not found.");
  let canEdit = row.createdById === actor.userId || row.ownerUserId === actor.userId;
  if (!canEdit && row.schoolId) {
    canEdit = (await client.schoolMember.count({ where: { schoolId: row.schoolId, userId: actor.userId, role: "SCHOOL_ADMIN", status: "ACTIVE" } })) > 0;
  }
  if (options.edit && !canEdit) throw AppError.forbidden("Only the test's author or a school admin can change it.");
  return { ...row, canEdit };
}

async function resolveItems(
  client: DbClient,
  tenant: ContentTenant,
  subjectId: string,
  items: readonly { questionId: string; marks: number | null }[],
): Promise<{ questionId: string; marks: number | null; questionMarks: number }[]> {
  const ids = [...new Set(items.map((i) => i.questionId))];
  if (ids.length !== items.length) throw AppError.validation({ items: ["A question appears twice in this test."] });
  if (ids.length === 0) return [];
  const questions = await client.question.findMany({
    where: {
      id: { in: ids },
      status: "PUBLISHED",
      parentId: null,
      draftOfId: null,
      OR: [{ schoolId: null, ownerUserId: null }, tenantWhere(tenant)],
      AND: [{ OR: [{ subjectId }, { topics: { some: { subjectId } } }] }],
    },
    select: { id: true, marks: true },
  });
  const marks = new Map(questions.map((q) => [q.id, q.marks]));
  if (marks.size !== ids.length) throw AppError.validation({ items: ["Some questions can't be used in this test (unpublished, another subject, or another school's)."] });
  return items.map((item) => ({ questionId: item.questionId, marks: item.marks, questionMarks: marks.get(item.questionId) as number }));
}

function totalOf(items: readonly { marks: number | null; questionMarks: number }[]): number {
  return items.reduce((sum, item) => sum + (item.marks ?? item.questionMarks), 0);
}

async function writeSection(tx: Tx, assessmentId: string, items: readonly { questionId: string; marks: number | null }[]): Promise<void> {
  await tx.assessmentSection.deleteMany({ where: { assessmentId } });
  const section = await tx.assessmentSection.create({ data: { assessmentId, title: "Questions", sortOrder: 0 }, select: { id: true } });
  if (items.length > 0) {
    await tx.assessmentItem.createMany({ data: items.map((item, index) => ({ sectionId: section.id, questionId: item.questionId, sortOrder: index, marks: item.marks })) });
  }
}

/** Creates a DRAFT test for a school or for the actor's tutor classes. */
export async function createTeacherTest(actor: TeachingActor, input: unknown): Promise<{ id: string }> {
  const data = parseWith(teacherTestSchema, input);
  const tenant = await resolveContentTenant(actor, data.owner);
  const subject = await db.subject.findUnique({ where: { id: data.subjectId }, select: { catalogueStatus: true } });
  if (!subject || subject.catalogueStatus !== "AVAILABLE") throw AppError.validation({ subjectId: ["Choose a subject from the list."] });
  const items = await resolveItems(db, tenant, data.subjectId, data.items);
  return db.$transaction(async (tx) => {
    const created = await tx.assessment.create({
      data: {
        kind: data.kind,
        assembly: "FIXED",
        subjectId: data.subjectId,
        title: data.title,
        description: data.description,
        instructions: data.instructions,
        timeLimitSeconds: data.timeLimitMinutes === null ? null : data.timeLimitMinutes * 60,
        totalMarks: Math.max(1, totalOf(items)),
        feedbackTiming: data.feedbackTiming as AssessmentFeedbackTiming,
        accessTier: "FREE",
        schoolId: tenant.schoolId,
        ownerUserId: tenant.ownerUserId,
        createdById: actor.userId,
        copyrightStatus: "OWNED",
        status: "DRAFT",
      },
      select: { id: true },
    });
    await writeSection(tx, created.id, items);
    return { id: created.id };
  });
}

/** Saves a DRAFT test (details and the ordered question list). Published tests are archived, not edited. */
export async function updateTeacherTest(actor: TeachingActor, input: unknown): Promise<{ id: string }> {
  const data = parseWith(updateTeacherTestSchema, input);
  const test = await loadTest(actor, data.assessmentId, { edit: true });
  if (test.status !== "DRAFT") throw AppError.conflict("Published tests can't be changed. Archive it and create a new one.");
  const items = await resolveItems(db, test, test.subjectId, data.items);
  await db.$transaction(async (tx) => {
    await tx.assessment.update({
      where: { id: test.id },
      data: {
        kind: data.kind,
        title: data.title,
        description: data.description,
        instructions: data.instructions,
        timeLimitSeconds: data.timeLimitMinutes === null ? null : data.timeLimitMinutes * 60,
        totalMarks: Math.max(1, totalOf(items)),
        feedbackTiming: data.feedbackTiming as AssessmentFeedbackTiming,
      },
      select: { id: true },
    });
    await writeSection(tx, test.id, items);
  });
  return { id: test.id };
}

/** Publishes a draft test (owner workflow: no editorial review; validated, snapshotted and audited by the helper). */
export async function publishTeacherTest(actor: TeachingActor, input: { assessmentId: string }): Promise<{ id: string; revision: number }> {
  const test = await loadTest(actor, input.assessmentId, { edit: true });
  if (test.status !== "DRAFT") throw AppError.conflict("Only draft tests can be published.");
  return db.$transaction(async (tx) => {
    const result = await publish(tx, "ASSESSMENT", test.id, contentActor(actor), { changeNote: "Teacher test" });
    return { id: result.id, revision: result.revision };
  });
}

/** Archives a published test (new attempts stop; results stay) or deletes a never-published, unused draft. */
export async function archiveTeacherTest(actor: TeachingActor, input: { assessmentId: string }): Promise<{ deleted: boolean }> {
  const test = await loadTest(actor, input.assessmentId, { edit: true });
  if (test.status === "PUBLISHED") {
    await db.$transaction((tx) => archive(tx, "ASSESSMENT", test.id, contentActor(actor)));
    return { deleted: false };
  }
  const used = await db.assignment.count({ where: { assessmentId: test.id } });
  if (test.publishedAt !== null || test.revision > 1 || used > 0) throw AppError.conflict("This test has been used, so it can't be deleted.");
  await db.assessment.delete({ where: { id: test.id } });
  return { deleted: true };
}

export interface TeacherTestDetail {
  id: string;
  title: string;
  description: string | null;
  instructions: string | null;
  kind: AssessmentKind;
  status: ContentStatus;
  subjectId: string;
  subjectName: string;
  owner: { kind: "school"; schoolId: string } | { kind: "tutor" };
  ownerName: string;
  timeLimitMinutes: number | null;
  feedbackTiming: AssessmentFeedbackTiming;
  totalMarks: number;
  /** The draft can be edited now (author / school admin, still DRAFT). */
  canEdit: boolean;
  /** The actor may publish / archive it (author or a school admin). */
  canManage: boolean;
  items: (BuilderQuestion & { itemMarks: number | null })[];
}

/** A test with its questions (excerpts) for the builder page. */
export async function getTeacherTest(actor: TeachingActor, assessmentId: string): Promise<TeacherTestDetail> {
  const test = await loadTest(actor, assessmentId);
  const row = await db.assessment.findUniqueOrThrow({
    where: { id: test.id },
    select: {
      title: true,
      description: true,
      instructions: true,
      kind: true,
      timeLimitSeconds: true,
      feedbackTiming: true,
      totalMarks: true,
      subject: { select: { name: true } },
      school: { select: { name: true } },
      sections: {
        orderBy: { sortOrder: "asc" },
        select: {
          items: {
            orderBy: { sortOrder: "asc" },
            select: {
              marks: true,
              question: {
                select: {
                  id: true,
                  type: true,
                  stem: true,
                  marks: true,
                  difficulty: true,
                  schoolId: true,
                  ownerUserId: true,
                  topics: { where: { isPrimary: true }, select: { topic: { select: { name: true } } }, take: 1 },
                },
              },
            },
          },
        },
      },
    },
  });
  return {
    id: test.id,
    title: row.title,
    description: row.description,
    instructions: row.instructions,
    kind: row.kind,
    status: test.status,
    subjectId: test.subjectId,
    subjectName: row.subject.name,
    owner: test.schoolId ? { kind: "school", schoolId: test.schoolId } : { kind: "tutor" },
    ownerName: row.school?.name ?? "My own classes",
    timeLimitMinutes: row.timeLimitSeconds === null ? null : Math.round(row.timeLimitSeconds / 60),
    feedbackTiming: row.feedbackTiming,
    totalMarks: row.totalMarks,
    canEdit: test.canEdit && test.status === "DRAFT",
    canManage: test.canEdit,
    items: row.sections.flatMap((section) =>
      section.items.map((item) => ({
        id: item.question.id,
        type: item.question.type,
        excerpt: toExcerpt(item.question.stem, 160),
        marks: item.question.marks,
        difficulty: item.question.difficulty,
        topic: item.question.topics[0]?.topic.name ?? null,
        source: item.question.schoolId === null && item.question.ownerUserId === null ? ("bank" as const) : ("own" as const),
        itemMarks: item.marks,
      })),
    ),
  };
}

/** Topics of a subject's current syllabus (for tagging teacher questions and filtering the picker). */
export async function listSubjectTopics(actor: TeachingActor, subjectId: string): Promise<{ id: string; name: string; depth: number }[]> {
  assertTeacher(actor);
  if (!isUuid(subjectId)) return [];
  const syllabus = await db.syllabus.findFirst({ where: { subjectId, status: "CURRENT" }, select: { id: true } });
  if (!syllabus) return [];
  const rows = await db.topic.findMany({
    where: { syllabusId: syllabus.id },
    select: { id: true, parentId: true, kind: true, depth: true, path: true, sortOrder: true, code: true, name: true },
    take: 1_000,
  });
  return flattenTopicTree(buildTopicTree(rows))
    .filter((t) => t.kind !== "SECTION")
    .map((t) => ({ id: t.id, name: t.code ? `${t.code} ${t.name}` : t.name, depth: t.depth }));
}
