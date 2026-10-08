import { randomUUID } from "node:crypto";
import { Prisma, type PrismaClient } from "@/generated/prisma/client";
import { addDays, dateColumnFromLocalDate } from "@/lib/dates";
import { validateQuestionDefinition, type QuestionDefinitionInput } from "@/lib/questions";
import { approve, publish, submitForReview, type ContentActor, type WorkflowEntityType } from "@/server/content/publish";
import { getRenderedLesson, PIPELINE_VERSION, renderFlashcardHtml, renderQuestionHtml, toRenderedJson } from "@/server/content/service";
import type { Tx } from "@/server/lib/db-context";
import type { CatalogueIds } from "../catalogue";
import { DEMO_AUTHOR, type DemoPart, type DemoQuestion, type DemoQuestionCore, type DemoSubjectContent } from "../data/demo/types";
import { ensureDemoDiagram } from "./media";
import type { SeedLog, SeedTally } from "../util";

/**
 * DEV ONLY: writes one subject's demo content (syllabus version + topic tree, diagrams, questions, lessons, flashcards,
 * assessments, daily questions) through the SAME workflow the CMS uses: rows are inserted as DRAFT by the demo editor,
 * submitted, approved by a different person (the demo admin, so four-eyes holds) and published with the shared publish
 * helper, which writes the ContentRevision snapshots the database requires.
 *
 * Idempotent: natural keys are `externalRef` (questions, lessons, flashcards), the syllabus `versionLabel`, topic
 * slugs and assessment titles; existing rows are left untouched (published content is immutable — change it through a
 * draft copy in the CMS, or reset the dev database to re-seed changed demo data). Drift between the data files and
 * existing rows is reported as a warning.
 */

export interface DemoActors {
  editor: ContentActor & { kind: "user" };
  approver: ContentActor & { kind: "user" };
}

export interface SubjectDemoResult {
  subjectId: string;
  qualificationId: string;
  syllabusId: string;
  topicIds: Map<string, string>;
  questionIds: Map<string, string>;
  dailyQuestionRefs: string[];
}

const TX_OPTIONS = { maxWait: 10_000, timeout: 60_000 } as const;
const DIAGRAM_PREFIX = "$diagram:";

/** Replaces `"$diagram:<key>"` placeholders in a payload with MediaAsset ids. */
function resolvePayload(payload: unknown, diagrams: ReadonlyMap<string, string>): unknown {
  if (typeof payload !== "object" || payload === null) return payload ?? null;
  const record = payload as Record<string, unknown>;
  const mediaAssetId = record.mediaAssetId;
  if (typeof mediaAssetId === "string" && mediaAssetId.startsWith(DIAGRAM_PREFIX)) {
    const id = diagrams.get(mediaAssetId.slice(DIAGRAM_PREFIX.length));
    if (!id) throw new Error(`demo content: unknown diagram ${mediaAssetId}`);
    return { ...record, mediaAssetId: id };
  }
  return payload;
}

function definitionOf(q: DemoQuestionCore & { parts?: DemoPart[]; partLabel?: string }, diagrams: ReadonlyMap<string, string>): QuestionDefinitionInput {
  return {
    type: q.type,
    markingMode: q.markingMode ?? "AUTO",
    marks: q.marks,
    payload: resolvePayload(q.payload, diagrams),
    answerSpec: q.answerSpec ?? null,
    partLabel: q.partLabel ?? null,
    options: (q.options ?? []).map((o) => ({ key: o.key, isCorrect: o.isCorrect })),
    parts: (q.parts ?? []).map((part) => definitionOf(part, diagrams)),
  };
}

/** Throws when any demo question is not a valid, markable definition (checked before anything is written). */
export function validateDemoQuestions(data: DemoSubjectContent, log: SeedLog): void {
  const placeholderDiagrams = new Map(data.diagrams.map((d) => [d.key, randomUUID()]));
  const refs = new Set<string>();
  const problems: string[] = [];
  for (const q of data.questions) {
    if (refs.has(q.ref)) problems.push(`${q.ref}: duplicate ref`);
    refs.add(q.ref);
    const result = validateQuestionDefinition(definitionOf(q, placeholderDiagrams));
    for (const issue of result.issues) {
      const line = `${data.refPrefix}/${q.ref} ${issue.path.join(".")}: ${issue.message}`;
      if (issue.severity === "error") problems.push(line);
      else log.warn(line);
    }
  }
  if (problems.length > 0) throw new Error(`demo content has invalid questions:\n${problems.join("\n")}`);
}

async function runWorkflow(tx: Tx, entityType: WorkflowEntityType, id: string, actors: DemoActors): Promise<void> {
  await submitForReview(tx, entityType, id, actors.editor);
  await approve(tx, entityType, id, actors.approver);
  await publish(tx, entityType, id, actors.approver, { changeNote: "Development demo content" });
}

// =====================================================================================================================
// Syllabus version + topic tree
// =====================================================================================================================

async function ensureSyllabus(
  db: PrismaClient,
  data: DemoSubjectContent,
  subjectId: string,
  sourceId: string,
  actors: DemoActors,
  tally: SeedTally,
): Promise<{ syllabusId: string; topicIds: Map<string, string>; objectiveIds: Map<string, string[]>; componentIds: Map<string, string> }> {
  const existing = await db.syllabus.findUnique({
    where: { subjectId_versionLabel: { subjectId, versionLabel: data.syllabus.versionLabel } },
    select: { id: true, status: true, effectiveFrom: true },
  });
  tally.add("Syllabus", !existing);
  const effectiveFrom = dateColumnFromLocalDate(data.syllabus.effectiveFrom);
  if (existing && existing.effectiveFrom.getTime() !== effectiveFrom.getTime()) {
    // Databases seeded before DEMO_EFFECTIVE_FROM: re-date the demo version so real (pipeline) versions count as newer.
    await db.syllabus.update({ where: { id: existing.id }, data: { effectiveFrom } });
  }
  const syllabus =
    existing ??
    (await db.syllabus.create({
      data: {
        subjectId,
        title: data.syllabus.title,
        versionLabel: data.syllabus.versionLabel,
        status: "DRAFT",
        effectiveFrom,
        overview: data.syllabus.overview,
        assessmentOverview: data.syllabus.assessmentOverview,
        sourceId,
        copyrightStatus: "OWNED",
        sourceNotes: "Demo structure written for development. It is not taken from, and does not represent, any official syllabus.",
        isDemo: true,
        createdById: actors.editor.userId,
      },
      select: { id: true, status: true },
    }));

  if (syllabus.status === "DRAFT") {
    // Structure can only be written while the version is a DRAFT (published versions are frozen by trigger).
    for (const [index, component] of data.syllabus.components.entries()) {
      const found = await db.syllabusComponent.findUnique({ where: { syllabusId_code: { syllabusId: syllabus.id, code: component.code } }, select: { id: true } });
      if (!found) {
        await db.syllabusComponent.create({
          data: {
            syllabusId: syllabus.id,
            code: component.code,
            name: component.name,
            kind: component.kind,
            description: component.description,
            durationMinutes: component.durationMinutes,
            calculatorAllowed: component.calculatorAllowed,
            sortOrder: index + 1,
          },
        });
      }
      tally.add("SyllabusComponent", !found);
    }
    for (const [topicIndex, topic] of data.topics.entries()) {
      let topicRow = await db.topic.findUnique({ where: { syllabusId_slug: { syllabusId: syllabus.id, slug: topic.slug } }, select: { id: true } });
      if (!topicRow) {
        const id = randomUUID();
        topicRow = await db.topic.create({
          data: {
            id,
            syllabusId: syllabus.id,
            kind: "TOPIC",
            depth: 0,
            path: id,
            sortOrder: topicIndex + 1,
            code: topic.code,
            name: topic.name,
            slug: topic.slug,
            description: topic.description,
            publicSummary: topic.publicSummary ?? null,
            estimatedStudyMinutes: topic.estimatedStudyMinutes ?? null,
          },
          select: { id: true },
        });
        tally.add("Topic", true);
      }
      for (const [subIndex, sub] of topic.subtopics.entries()) {
        const found = await db.topic.findUnique({ where: { syllabusId_slug: { syllabusId: syllabus.id, slug: sub.slug } }, select: { id: true } });
        if (found) continue;
        const id = randomUUID();
        await db.topic.create({
          data: {
            id,
            syllabusId: syllabus.id,
            parentId: topicRow.id,
            kind: "SUBTOPIC",
            depth: 1,
            path: `${topicRow.id}/${id}`,
            sortOrder: subIndex + 1,
            code: sub.code,
            name: sub.name,
            slug: sub.slug,
            description: sub.description ?? null,
            estimatedStudyMinutes: sub.estimatedStudyMinutes ?? null,
            objectives: {
              create: sub.objectives.map((objective, order) => ({
                code: objective.code ?? `${sub.code}.${order + 1}`,
                statement: objective.statement,
                cognitiveSkill: objective.skill,
                sortOrder: order + 1,
              })),
            },
          },
        });
        tally.add("Topic", true);
      }
    }
    // Publish the version: CURRENT unless the subject already has a CURRENT version (exactly one per subject).
    const current = await db.syllabus.findFirst({ where: { subjectId, status: "CURRENT", id: { not: syllabus.id } }, select: { id: true } });
    await db.syllabus.update({
      where: { id: syllabus.id },
      data: { status: current ? "UPCOMING" : "CURRENT", publishedAt: new Date(), publishedById: actors.approver.userId },
    });
  }

  const topics = await db.topic.findMany({
    where: { syllabusId: syllabus.id },
    select: { id: true, slug: true, objectives: { select: { id: true }, orderBy: { sortOrder: "asc" } } },
  });
  const components = await db.syllabusComponent.findMany({ where: { syllabusId: syllabus.id }, select: { id: true, code: true } });
  return {
    syllabusId: syllabus.id,
    topicIds: new Map(topics.map((t) => [t.slug, t.id])),
    objectiveIds: new Map(topics.map((t) => [t.slug, t.objectives.map((o) => o.id)])),
    componentIds: new Map(components.map((c) => [c.code, c.id])),
  };
}

// =====================================================================================================================
// Questions
// =====================================================================================================================

interface QuestionWriteContext {
  subjectId: string;
  sourceId: string;
  createdById: string;
  diagrams: ReadonlyMap<string, string>;
}

async function insertQuestionRow(
  tx: Tx,
  q: DemoQuestionCore & { parts?: DemoPart[] },
  ctx: QuestionWriteContext,
  root: { externalRef: string; accessTier: DemoQuestion["accessTier"]; isExamStyle: boolean; daily: boolean; paperLabel?: string } | null,
  parent: { id: string; partLabel: string; partOrder: number; accessTier: DemoQuestion["accessTier"] } | null,
): Promise<string> {
  const payload = resolvePayload(q.payload, ctx.diagrams);
  const created = await tx.question.create({
    data: {
      subjectId: ctx.subjectId,
      type: q.type,
      markingMode: q.markingMode ?? "AUTO",
      stem: q.stem,
      payload: payload === null ? Prisma.DbNull : (payload as Prisma.InputJsonValue),
      answerSpec: q.answerSpec === undefined || q.answerSpec === null ? Prisma.DbNull : (q.answerSpec as Prisma.InputJsonValue),
      explanation: q.explanation ?? null,
      workedSolution: q.workedSolution ?? null,
      hints: q.hints ?? [],
      conceptSummary: q.conceptSummary ?? null,
      difficulty: q.difficulty,
      marks: q.marks,
      estimatedSeconds: q.estimatedSeconds ?? null,
      cognitiveSkill: q.cognitiveSkill ?? null,
      calculatorAllowed: q.calculatorAllowed ?? null,
      accessTier: (root ? root.accessTier : parent?.accessTier) ?? "FREE",
      isExamStyle: root?.isExamStyle ?? false,
      isDailyEligible: root?.daily ?? false,
      paperLabel: root?.paperLabel ?? null,
      languageCode: "en",
      status: "DRAFT",
      createdById: ctx.createdById,
      copyrightStatus: "OWNED",
      sourceId: ctx.sourceId,
      author: DEMO_AUTHOR,
      isDemo: true,
      externalRef: root?.externalRef ?? null,
      ...(parent ? { parentId: parent.id, partLabel: parent.partLabel, partOrder: parent.partOrder } : {}),
    },
    select: { id: true },
  });
  if (q.options && q.options.length > 0) {
    await tx.questionOption.createMany({
      data: q.options.map((o, sortOrder) => ({ questionId: created.id, key: o.key, content: o.content, isCorrect: o.isCorrect, rationale: o.rationale ?? null, sortOrder })),
    });
  }
  const rendered = renderQuestionHtml({
    id: created.id,
    type: q.type,
    stem: q.stem,
    explanation: q.explanation ?? null,
    workedSolution: q.workedSolution ?? null,
    conceptSummary: q.conceptSummary ?? null,
    hints: q.hints ?? [],
    payload,
    options: q.options ?? [],
  });
  await tx.question.update({ where: { id: created.id }, data: { renderedHtml: toRenderedJson(rendered), renderVersion: PIPELINE_VERSION } });
  for (const [partOrder, part] of (q.parts ?? []).entries()) {
    await insertQuestionRow(tx, part, ctx, null, { id: created.id, partLabel: part.partLabel, partOrder, accessTier: (root ? root.accessTier : parent?.accessTier) ?? "FREE" });
  }
  return created.id;
}

async function seedQuestions(
  db: PrismaClient,
  data: DemoSubjectContent,
  ctx: QuestionWriteContext & { syllabusId: string; topicIds: Map<string, string>; objectiveIds: Map<string, string[]> },
  actors: DemoActors,
  tally: SeedTally,
  log: SeedLog,
): Promise<Map<string, string>> {
  const ids = new Map<string, string>();
  for (const q of data.questions) {
    const externalRef = `${data.refPrefix}:question:${q.ref}`;
    const existing = await db.question.findUnique({ where: { externalRef }, select: { id: true, stem: true } });
    tally.add("Question", !existing);
    if (existing) {
      if (existing.stem !== q.stem) log.warn(`${externalRef} differs from the data file; published content is not re-seeded (reset the dev database to pick it up)`);
      ids.set(q.ref, existing.id);
      continue;
    }
    const topicId = ctx.topicIds.get(q.topic);
    if (!topicId) throw new Error(`${externalRef}: unknown topic "${q.topic}"`);
    const id = await db.$transaction(async (tx) => {
      const questionId = await insertQuestionRow(tx, q, ctx, { externalRef, accessTier: q.accessTier ?? "FREE", isExamStyle: q.isExamStyle ?? false, daily: q.daily ?? false, ...(q.paperLabel ? { paperLabel: q.paperLabel } : {}) }, null);
      await tx.questionTopic.create({ data: { questionId, topicId, syllabusId: ctx.syllabusId, subjectId: ctx.subjectId, isPrimary: true } });
      const objectives = ctx.objectiveIds.get(q.topic) ?? [];
      if (objectives.length > 0) await tx.questionObjective.createMany({ data: objectives.map((objectiveId) => ({ questionId, objectiveId })) });
      const payload = resolvePayload(q.payload, ctx.diagrams) as { mediaAssetId?: unknown } | null;
      if (payload && typeof payload.mediaAssetId === "string") {
        await tx.contentMediaUsage.create({ data: { entityType: "QUESTION", entityId: questionId, mediaAssetId: payload.mediaAssetId, field: "payload" } });
      }
      await runWorkflow(tx, "QUESTION", questionId, actors);
      return questionId;
    }, TX_OPTIONS);
    ids.set(q.ref, id);
  }
  return ids;
}

// =====================================================================================================================
// Lessons, flashcards, assessments, daily questions
// =====================================================================================================================

async function seedLessons(
  db: PrismaClient,
  data: DemoSubjectContent,
  ctx: { subjectId: string; sourceId: string; topicIds: Map<string, string>; objectiveIds: Map<string, string[]>; questionIds: Map<string, string> },
  actors: DemoActors,
  tally: SeedTally,
  log: SeedLog,
): Promise<void> {
  for (const lesson of data.lessons) {
    const externalRef = `${data.refPrefix}:lesson:${lesson.ref}`;
    const existing = await db.lesson.findUnique({ where: { externalRef }, select: { id: true, body: true } });
    tally.add("Lesson", !existing);
    if (existing) {
      if (existing.body !== lesson.body) log.warn(`${externalRef} differs from the data file; published content is not re-seeded`);
      continue;
    }
    const topicSlugs = [lesson.topic, ...(lesson.extraTopics ?? [])];
    const topics = topicSlugs.map((slug, sortOrder) => {
      const topicId = ctx.topicIds.get(slug);
      if (!topicId) throw new Error(`${externalRef}: unknown topic "${slug}"`);
      return { topicId, isPrimary: sortOrder === 0, sortOrder: 0 };
    });
    const practice = (lesson.practice ?? []).map((ref, sortOrder) => {
      const questionId = ctx.questionIds.get(ref);
      if (!questionId) throw new Error(`${externalRef}: unknown practice question "${ref}"`);
      return { questionId, sortOrder };
    });
    const id = await db.$transaction(async (tx) => {
      const created = await tx.lesson.create({
        data: {
          subjectId: ctx.subjectId,
          kind: lesson.kind,
          title: lesson.title,
          slug: lesson.slug,
          summary: lesson.summary,
          body: lesson.body,
          estimatedMinutes: lesson.estimatedMinutes,
          accessTier: lesson.accessTier,
          metaDescription: lesson.summary,
          languageCode: "en",
          status: "DRAFT",
          createdById: actors.editor.userId,
          copyrightStatus: "OWNED",
          sourceId: ctx.sourceId,
          author: DEMO_AUTHOR,
          isDemo: true,
          externalRef,
          topics: { create: topics },
          objectives: { create: (ctx.objectiveIds.get(lesson.topic) ?? []).map((objectiveId) => ({ objectiveId })) },
          practiceLinks: { create: practice },
        },
        select: { id: true },
      });
      await runWorkflow(tx, "LESSON", created.id, actors);
      return created.id;
    }, TX_OPTIONS);
    // Write-time render cache (bodyHtml + renderVersion + contentHash), editable on the published row.
    const row = await db.lesson.findUniqueOrThrow({ where: { id }, select: { id: true, body: true, bodyHtml: true, renderVersion: true, contentHash: true } });
    await getRenderedLesson(row, { client: db });
  }
}

async function seedFlashcards(
  db: PrismaClient,
  data: DemoSubjectContent,
  ctx: { subjectId: string; sourceId: string; topicIds: Map<string, string> },
  actors: DemoActors,
  tally: SeedTally,
): Promise<void> {
  for (const card of data.flashcards) {
    const externalRef = `${data.refPrefix}:flashcard:${card.ref}`;
    const existing = await db.flashcard.findUnique({ where: { externalRef }, select: { id: true } });
    tally.add("Flashcard", !existing);
    if (existing) continue;
    const topicId = ctx.topicIds.get(card.topic);
    if (!topicId) throw new Error(`${externalRef}: unknown topic "${card.topic}"`);
    await db.$transaction(async (tx) => {
      const created = await tx.flashcard.create({
        data: {
          subjectId: ctx.subjectId,
          cardType: card.cardType,
          front: card.front,
          back: card.back,
          notes: card.notes ?? null,
          accessTier: card.accessTier ?? "FREE",
          languageCode: "en",
          status: "DRAFT",
          createdById: actors.editor.userId,
          copyrightStatus: "OWNED",
          sourceId: ctx.sourceId,
          author: DEMO_AUTHOR,
          isDemo: true,
          externalRef,
          topics: { create: { topicId, isPrimary: true } },
        },
        select: { id: true },
      });
      const rendered = renderFlashcardHtml({ id: created.id, front: card.front, back: card.back, notes: card.notes ?? null });
      await tx.flashcard.update({ where: { id: created.id }, data: { renderedHtml: toRenderedJson(rendered), renderVersion: PIPELINE_VERSION } });
      await runWorkflow(tx, "FLASHCARD", created.id, actors);
    }, TX_OPTIONS);
  }
}

async function seedAssessments(
  db: PrismaClient,
  data: DemoSubjectContent,
  ctx: { subjectId: string; syllabusId: string; sourceId: string; topicIds: Map<string, string>; componentIds: Map<string, string>; questionIds: Map<string, string> },
  actors: DemoActors,
  tally: SeedTally,
): Promise<void> {
  const questionRefs = [...new Set(data.assessments.flatMap((a) => a.sections.flatMap((s) => s.questions)))];
  const questionIds = questionRefs.map((ref) => {
    const id = ctx.questionIds.get(ref);
    if (!id) throw new Error(`${data.refPrefix}: assessment uses unknown question "${ref}"`);
    return id;
  });
  const marks = new Map((await db.question.findMany({ where: { id: { in: questionIds } }, select: { id: true, marks: true } })).map((q) => [q.id, q.marks]));

  for (const assessment of data.assessments) {
    const existing = await db.assessment.findFirst({ where: { subjectId: ctx.subjectId, title: assessment.title, isDemo: true, draftOfId: null }, select: { id: true } });
    tally.add("Assessment", !existing);
    if (existing) continue;
    let number = 0;
    const sections = assessment.sections.map((section, sortOrder) => {
      const items = section.questions.map((ref, itemOrder) => {
        number += 1;
        return { questionId: ctx.questionIds.get(ref) as string, sortOrder: itemOrder, label: String(number) };
      });
      const sectionMarks = items.reduce((sum, item) => sum + (marks.get(item.questionId) ?? 0), 0);
      return {
        title: section.title,
        instructions: section.instructions ?? null,
        sortOrder,
        componentId: section.componentCode ? (ctx.componentIds.get(section.componentCode) ?? null) : null,
        timeLimitSeconds: section.timeLimitSeconds ?? null,
        marks: sectionMarks,
        items: { create: items },
      };
    });
    const totalMarks = sections.reduce((sum, s) => sum + s.marks, 0);
    const topicIds = (assessment.topics ?? []).map((slug) => {
      const topicId = ctx.topicIds.get(slug);
      if (!topicId) throw new Error(`${assessment.title}: unknown topic "${slug}"`);
      return { topicId };
    });
    await db.$transaction(async (tx) => {
      const created = await tx.assessment.create({
        data: {
          kind: assessment.kind,
          assembly: "FIXED",
          subjectId: ctx.subjectId,
          syllabusId: ctx.syllabusId,
          title: assessment.title,
          description: assessment.description,
          instructions: assessment.instructions,
          timeLimitSeconds: assessment.timeLimitSeconds ?? null,
          totalMarks,
          feedbackTiming: "AFTER_SUBMIT",
          allowNavigation: true,
          accessTier: assessment.accessTier,
          status: "DRAFT",
          createdById: actors.editor.userId,
          copyrightStatus: "OWNED",
          sourceId: ctx.sourceId,
          author: DEMO_AUTHOR,
          isDemo: true,
          sections: { create: sections },
          topics: { create: topicIds },
        },
        select: { id: true },
      });
      await runWorkflow(tx, "ASSESSMENT", created.id, actors);
    }, TX_OPTIONS);
  }
}

/** The daily question for each of the next `days` days (country calendar days), cycling through daily-eligible items. */
async function seedDailyQuestions(
  db: PrismaClient,
  data: DemoSubjectContent,
  ctx: { subjectId: string; qualificationId: string; questionIds: Map<string, string> },
  today: string,
  days: number,
  tally: SeedTally,
): Promise<string[]> {
  const eligible = data.questions.filter((q) => q.daily).map((q) => q.ref);
  if (eligible.length === 0) return [];
  const scheduled: string[] = [];
  for (let offset = 0; offset < days; offset += 1) {
    const ref = eligible[offset % eligible.length] as string;
    const questionId = ctx.questionIds.get(ref);
    if (!questionId) continue;
    const date = dateColumnFromLocalDate(addDays(today, offset));
    const existing = await db.dailyQuestion.findUnique({
      where: { date_qualificationId_subjectId: { date, qualificationId: ctx.qualificationId, subjectId: ctx.subjectId } },
      select: { id: true },
    });
    if (!existing) {
      await db.dailyQuestion.create({ data: { date, qualificationId: ctx.qualificationId, subjectId: ctx.subjectId, questionId, isAutoSelected: false } });
    }
    tally.add("DailyQuestion", !existing);
    scheduled.push(ref);
  }
  return scheduled;
}

// =====================================================================================================================
// Entry point
// =====================================================================================================================

export interface SeedDemoSubjectInput {
  data: DemoSubjectContent;
  catalogue: CatalogueIds;
  demoSourceId: string;
  actors: DemoActors;
  /** Today's calendar date in the country's time zone (`YYYY-MM-DD`). */
  today: string;
  dailyDays: number;
}

/** Seeds one subject's demo content end to end (see the module header). */
export async function seedDemoSubject(db: PrismaClient, input: SeedDemoSubjectInput, tally: SeedTally, log: SeedLog): Promise<SubjectDemoResult> {
  const { data, actors } = input;
  validateDemoQuestions(data, log);
  const qualificationKey = `${data.boardSlug}/${data.qualificationSlug}`;
  const subjectId = input.catalogue.subjects.get(`${qualificationKey}/${data.subjectSlug}`);
  const qualificationId = input.catalogue.qualifications.get(qualificationKey);
  if (!subjectId || !qualificationId) throw new Error(`demo: subject ${qualificationKey}/${data.subjectSlug} is not in the catalogue`);

  // Development only: make the demo subject (and its qualification) usable so the student flows can be exercised.
  await db.subject.update({ where: { id: subjectId }, data: { catalogueStatus: "AVAILABLE" } });
  await db.qualification.update({ where: { id: qualificationId }, data: { catalogueStatus: "AVAILABLE" } });

  const syllabus = await ensureSyllabus(db, data, subjectId, input.demoSourceId, actors, tally);
  const diagrams = new Map<string, string>();
  for (const diagram of data.diagrams) {
    diagrams.set(diagram.key, await ensureDemoDiagram(db, diagram, { sourceId: input.demoSourceId, uploadedById: actors.editor.userId, namespace: data.refPrefix }, tally));
  }
  const questionIds = await seedQuestions(
    db,
    data,
    { subjectId, sourceId: input.demoSourceId, createdById: actors.editor.userId, diagrams, syllabusId: syllabus.syllabusId, topicIds: syllabus.topicIds, objectiveIds: syllabus.objectiveIds },
    actors,
    tally,
    log,
  );
  await seedLessons(db, data, { subjectId, sourceId: input.demoSourceId, topicIds: syllabus.topicIds, objectiveIds: syllabus.objectiveIds, questionIds }, actors, tally, log);
  await seedFlashcards(db, data, { subjectId, sourceId: input.demoSourceId, topicIds: syllabus.topicIds }, actors, tally);
  await seedAssessments(
    db,
    data,
    { subjectId, syllabusId: syllabus.syllabusId, sourceId: input.demoSourceId, topicIds: syllabus.topicIds, componentIds: syllabus.componentIds, questionIds },
    actors,
    tally,
  );
  const dailyQuestionRefs = await seedDailyQuestions(db, data, { subjectId, qualificationId, questionIds }, input.today, input.dailyDays, tally);
  log.info(
    `demo: ${qualificationKey}/${data.subjectSlug}: ${syllabus.topicIds.size} topics, ${questionIds.size} questions, ${data.lessons.length} lessons, ${data.flashcards.length} flashcards, ${data.assessments.length} assessments`,
  );
  return { subjectId, qualificationId, syllabusId: syllabus.syllabusId, topicIds: syllabus.topicIds, questionIds, dailyQuestionRefs };
}
