import "server-only";
import { z } from "zod";
import type { ContentStatus, Prisma, QuestionType, SyllabusStatus, TopicKind } from "@/generated/prisma/client";
import type { SanitizedHtml } from "@/lib/content/types";
import { BLANK_PLACEHOLDER, formatCorrectAnswer, safeParseAnswerSpec, safeParseQuestionPayload } from "@/lib/questions";
import { renderContent, renderInline, type AssetResolver } from "@/server/content/render";
import { LESSON_RENDER_OPTIONS, loadAssetResolver } from "@/server/content/service";
import type { WorkflowEntityType } from "@/server/content/publish";
import { db } from "@/server/db";
import { AUDIT_ACTIONS, auditInTx } from "@/server/lib/audit";
import { AppError } from "@/server/lib/errors";
import type { CmsActor } from "@/server/cms/users/access";
import { FLASHCARD_PREVIEW_OPTIONS } from "./checks";
import { assertCanPublish, assertCanReview, isFourEyesEnforced, parseInput, PERSON_SELECT, staffName } from "./context";
import { approveContent, publishContent } from "./workflow";

/**
 * Review BY TOPIC (/admin/review/topics, `content.review`): a reviewer picks a syllabus version, sees its topic tree
 * with the number of items waiting (IN_REVIEW or APPROVED) under each node, and opens a topic to read EVERYTHING
 * waiting in its subtree on one page — lessons fully rendered, questions with their answers, explanations and marking
 * specification, flashcards and test blueprints — then approves or sends back items one by one, or approves and
 * publishes all the items they have just read (four-eyes, audited). Designed for the bulk content pipeline
 * (docs/CONTENT_PIPELINE.md), but it shows every platform item tagged to the topic.
 */

const WAITING: readonly ContentStatus[] = ["IN_REVIEW", "APPROVED"];
/** Upper bound of items rendered on one topic page (a topic with more is reviewed subtopic by subtopic). */
export const TOPIC_PAGE_LIMIT = 400;
const ENTITY_ORDER: readonly ReviewableEntity[] = ["QUESTION", "FLASHCARD", "LESSON", "ASSESSMENT"];

export type ReviewableEntity = Extract<WorkflowEntityType, "LESSON" | "QUESTION" | "FLASHCARD" | "ASSESSMENT">;

// =====================================================================================================================
// Syllabus picker
// =====================================================================================================================

export interface ReviewSyllabusRow {
  id: string;
  title: string;
  versionLabel: string;
  status: SyllabusStatus;
  subject: string;
  qualification: string;
  board: string;
  /** Distinct items waiting for review or publication tagged anywhere in this version. */
  waiting: number;
}

const SYLLABUS_SELECT = {
  id: true,
  title: true,
  versionLabel: true,
  status: true,
  subject: { select: { name: true, qualification: { select: { shortName: true, examBoard: { select: { shortName: true } } } } } },
} as const;
const SYLLABUS_ORDER = [{ subject: { qualification: { examBoard: { sortOrder: "asc" } } } }, { subject: { name: "asc" } }, { effectiveFrom: "desc" }] satisfies Prisma.SyllabusOrderByWithRelationInput[];
/** Versions with nothing waiting listed after the ones with work (the picker stays short on a large catalogue). */
const IDLE_LIMIT = 200;

function syllabusRow(s: Prisma.SyllabusGetPayload<{ select: typeof SYLLABUS_SELECT }>, waiting: number): ReviewSyllabusRow {
  return {
    id: s.id,
    title: s.title,
    versionLabel: s.versionLabel,
    status: s.status,
    subject: s.subject.name,
    qualification: s.subject.qualification.shortName,
    board: s.subject.qualification.examBoard.shortName,
    waiting,
  };
}

/** Syllabus versions to review: every version with waiting items first, then (some of) the others. */
export async function listReviewSyllabi(actor: CmsActor): Promise<ReviewSyllabusRow[]> {
  assertCanReview(actor);
  const counts = await db.$queryRaw<{ syllabusId: string; n: number }[]>`
    SELECT x."syllabusId", count(*)::int AS "n" FROM (
      SELECT DISTINCT qt."syllabusId", q."id" FROM "QuestionTopic" qt JOIN "Question" q ON q."id" = qt."questionId"
       WHERE q."status" IN ('IN_REVIEW', 'APPROVED') AND q."parentId" IS NULL AND q."schoolId" IS NULL AND q."ownerUserId" IS NULL
      UNION ALL
      SELECT DISTINCT t."syllabusId", l."id" FROM "LessonTopic" lt JOIN "Lesson" l ON l."id" = lt."lessonId" JOIN "Topic" t ON t."id" = lt."topicId"
       WHERE l."status" IN ('IN_REVIEW', 'APPROVED')
      UNION ALL
      SELECT DISTINCT t."syllabusId", f."id" FROM "FlashcardTopic" ft JOIN "Flashcard" f ON f."id" = ft."flashcardId" JOIN "Topic" t ON t."id" = ft."topicId"
       WHERE f."status" IN ('IN_REVIEW', 'APPROVED') AND f."ownerUserId" IS NULL
      UNION ALL
      SELECT a."syllabusId", a."id" FROM "Assessment" a
       WHERE a."status" IN ('IN_REVIEW', 'APPROVED') AND a."syllabusId" IS NOT NULL AND a."schoolId" IS NULL AND a."ownerUserId" IS NULL
    ) x GROUP BY x."syllabusId"`;
  const waiting = new Map(counts.map((row) => [row.syllabusId, row.n]));
  const ids = [...waiting.keys()];
  const busy = ids.length > 0 ? await db.syllabus.findMany({ where: { id: { in: ids } }, select: SYLLABUS_SELECT, orderBy: SYLLABUS_ORDER }) : [];
  const idle = await db.syllabus.findMany({ where: { status: { not: "ARCHIVED" }, id: { notIn: ids } }, select: SYLLABUS_SELECT, orderBy: SYLLABUS_ORDER, take: IDLE_LIMIT });
  return [...busy, ...idle].map((s) => syllabusRow(s, waiting.get(s.id) ?? 0));
}

// =====================================================================================================================
// Topic tree with counts
// =====================================================================================================================

export interface ReviewTopicRow {
  id: string;
  parentId: string | null;
  depth: number;
  code: string | null;
  name: string;
  kind: TopicKind;
  /** Items tagged to this node itself. */
  direct: number;
  /** Distinct items tagged anywhere in its subtree. */
  total: number;
}

export interface ReviewTopicTree {
  syllabus: ReviewSyllabusRow;
  topics: ReviewTopicRow[];
}

/** Topic ids tagged by every waiting item of a version: `itemKey → topic ids`. */
async function waitingTags(syllabusId: string): Promise<Map<string, Set<string>>> {
  const rows = await db.$queryRaw<{ item: string; topicId: string }[]>`
    SELECT 'Q:' || q."id" AS "item", qt."topicId" FROM "QuestionTopic" qt JOIN "Question" q ON q."id" = qt."questionId"
     WHERE qt."syllabusId" = ${syllabusId}::uuid AND q."status" IN ('IN_REVIEW', 'APPROVED') AND q."parentId" IS NULL AND q."schoolId" IS NULL AND q."ownerUserId" IS NULL
    UNION ALL
    SELECT 'L:' || l."id", lt."topicId" FROM "LessonTopic" lt JOIN "Lesson" l ON l."id" = lt."lessonId" JOIN "Topic" t ON t."id" = lt."topicId"
     WHERE t."syllabusId" = ${syllabusId}::uuid AND l."status" IN ('IN_REVIEW', 'APPROVED')
    UNION ALL
    SELECT 'F:' || f."id", ft."topicId" FROM "FlashcardTopic" ft JOIN "Flashcard" f ON f."id" = ft."flashcardId" JOIN "Topic" t ON t."id" = ft."topicId"
     WHERE t."syllabusId" = ${syllabusId}::uuid AND f."status" IN ('IN_REVIEW', 'APPROVED') AND f."ownerUserId" IS NULL
    UNION ALL
    SELECT 'A:' || a."id", at."topicId" FROM "AssessmentTopic" at JOIN "Assessment" a ON a."id" = at."assessmentId"
     WHERE a."syllabusId" = ${syllabusId}::uuid AND a."status" IN ('IN_REVIEW', 'APPROVED')
    UNION ALL
    SELECT 'A:' || a."id", r."topicId" FROM "AssessmentBlueprintRule" r JOIN "AssessmentSection" s ON s."id" = r."sectionId" JOIN "Assessment" a ON a."id" = s."assessmentId"
     WHERE a."syllabusId" = ${syllabusId}::uuid AND a."status" IN ('IN_REVIEW', 'APPROVED') AND r."topicId" IS NOT NULL`;
  const tags = new Map<string, Set<string>>();
  for (const row of rows) {
    const set = tags.get(row.item) ?? new Set<string>();
    set.add(row.topicId);
    tags.set(row.item, set);
  }
  return tags;
}

export async function getReviewTopicTree(actor: CmsActor, syllabusId: string): Promise<ReviewTopicTree> {
  assertCanReview(actor);
  const id = parseInput(z.uuid("Choose a syllabus version."), syllabusId);
  const row = await db.syllabus.findUnique({ where: { id }, select: SYLLABUS_SELECT });
  if (!row) throw AppError.notFound("Syllabus version not found.");
  const topics = await db.topic.findMany({
    where: { syllabusId: id },
    select: { id: true, parentId: true, depth: true, code: true, name: true, kind: true, path: true, sortOrder: true },
  });
  const tags = await waitingTags(id);
  const syllabus = syllabusRow(row, tags.size);
  const pathOf = new Map(topics.map((t) => [t.id, t.path]));
  const direct = new Map<string, number>();
  const subtree = new Map<string, Set<string>>();
  for (const [item, topicIds] of tags) {
    for (const topicId of topicIds) {
      direct.set(topicId, (direct.get(topicId) ?? 0) + 1);
      for (const ancestor of (pathOf.get(topicId) ?? "").split("/")) {
        if (!ancestor) continue;
        const set = subtree.get(ancestor) ?? new Set<string>();
        set.add(item);
        subtree.set(ancestor, set);
      }
    }
  }
  // Pre-order (parents before children, siblings by sortOrder).
  const children = new Map<string | null, typeof topics>();
  for (const t of topics) children.set(t.parentId, [...(children.get(t.parentId) ?? []), t]);
  for (const list of children.values()) list.sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name));
  const ordered: ReviewTopicRow[] = [];
  const visit = (parentId: string | null) => {
    for (const t of children.get(parentId) ?? []) {
      ordered.push({ id: t.id, parentId: t.parentId, depth: t.depth, code: t.code, name: t.name, kind: t.kind, direct: direct.get(t.id) ?? 0, total: subtree.get(t.id)?.size ?? 0 });
      visit(t.id);
    }
  };
  visit(null);
  return { syllabus, topics: ordered };
}

// =====================================================================================================================
// One topic: everything waiting in its subtree, rendered
// =====================================================================================================================

export interface ReviewOptionView {
  key: string;
  html: SanitizedHtml;
  isCorrect: boolean;
  rationaleHtml: SanitizedHtml | null;
}

export interface ReviewQuestionView {
  label: string | null;
  type: QuestionType;
  markingMode: string;
  marks: number;
  stemHtml: SanitizedHtml;
  options: ReviewOptionView[];
  /** MATCHING: correct pairs as rendered fragments. */
  pairs: { leftHtml: SanitizedHtml; rightHtml: SanitizedHtml }[];
  /** FILL_IN_THE_BLANK: the template with numbered gaps, and the accepted answers per gap. */
  blanks: { templateHtml: SanitizedHtml; answers: { number: number; accepted: string[] }[] } | null;
  /** The answer as the student will be shown it (inline-rendered). */
  correctAnswerHtml: SanitizedHtml | null;
  markScheme: { id: string; descriptionHtml: SanitizedHtml; marks: number }[];
  modelAnswerHtml: SanitizedHtml | null;
  /** The stored marking specification, pretty-printed (accepted answers, tolerances, units…). */
  specJson: string | null;
  explanationHtml: SanitizedHtml | null;
  workedSolutionHtml: SanitizedHtml | null;
  hintsHtml: SanitizedHtml[];
  parts: ReviewQuestionView[];
}

export interface ReviewItemBase {
  entityType: ReviewableEntity;
  id: string;
  status: ContentStatus;
  revision: number;
  draftOfId: string | null;
  aiGenerated: boolean;
  isOwnWork: boolean;
  author: string | null;
  title: string;
  externalRef: string | null;
}

export type TopicReviewItem =
  | (ReviewItemBase & { entityType: "LESSON"; summaryHtml: SanitizedHtml | null; bodyHtml: SanitizedHtml; estimatedMinutes: number; accessTier: string })
  | (ReviewItemBase & {
      entityType: "QUESTION";
      difficulty: number;
      estimatedSeconds: number | null;
      skill: string | null;
      isExamStyle: boolean;
      isDailyEligible: boolean;
      accessTier: string;
      question: ReviewQuestionView;
    })
  | (ReviewItemBase & { entityType: "FLASHCARD"; cardType: string; frontHtml: SanitizedHtml; backHtml: SanitizedHtml; notesHtml: SanitizedHtml | null })
  | (ReviewItemBase & {
      entityType: "ASSESSMENT";
      kind: string;
      assembly: string;
      totalMarks: number;
      timeLimitMinutes: number | null;
      accessTier: string;
      descriptionHtml: SanitizedHtml | null;
      instructionsHtml: SanitizedHtml | null;
      sections: { title: string; lines: string[] }[];
    });

export interface TopicReview {
  topic: { id: string; name: string; code: string | null; kind: TopicKind; syllabusId: string; syllabusTitle: string; versionLabel: string };
  breadcrumbs: { id: string; name: string; code: string | null }[];
  fourEyes: boolean;
  items: TopicReviewItem[];
  /** True when more than {@link TOPIC_PAGE_LIMIT} items wait here (open a subtopic instead). */
  truncated: boolean;
}

const WORKFLOW_SELECT = {
  id: true,
  status: true,
  revision: true,
  draftOfId: true,
  aiGenerated: true,
  createdById: true,
  externalRef: true,
  createdBy: { select: PERSON_SELECT },
} as const;

async function subtreeTopicIds(topicId: string): Promise<{ topic: { id: string; name: string; code: string | null; kind: TopicKind; path: string; syllabusId: string; syllabus: { title: string; versionLabel: string } }; ids: string[] }> {
  const topic = await db.topic.findUnique({
    where: { id: topicId },
    select: { id: true, name: true, code: true, kind: true, path: true, syllabusId: true, syllabus: { select: { title: true, versionLabel: true } } },
  });
  if (!topic) throw AppError.notFound("Topic not found.");
  const rows = await db.topic.findMany({ where: { syllabusId: topic.syllabusId, OR: [{ id: topic.id }, { path: { startsWith: `${topic.path}/` } }] }, select: { id: true } });
  return { topic, ids: rows.map((r) => r.id) };
}

function html(source: string | null | undefined, resolveAsset: AssetResolver, inline = false): SanitizedHtml | null {
  if (!source || source.trim() === "") return null;
  return inline ? renderInline(source, { resolveAsset }).html : renderContent(source, { ...FLASHCARD_PREVIEW_OPTIONS, resolveAsset }).html;
}

const OPTION_ORDER = [{ sortOrder: "asc" }, { key: "asc" }] satisfies Prisma.QuestionOptionOrderByWithRelationInput[];
const PART_ORDER = [{ partOrder: "asc" }, { id: "asc" }] satisfies Prisma.QuestionOrderByWithRelationInput[];
const QUESTION_NODE = {
  type: true,
  markingMode: true,
  marks: true,
  stem: true,
  payload: true,
  answerSpec: true,
  explanation: true,
  workedSolution: true,
  hints: true,
  partLabel: true,
  options: { orderBy: OPTION_ORDER, select: { key: true, content: true, isCorrect: true, rationale: true, sortOrder: true } },
} as const;
type QuestionNodeRow = Prisma.QuestionGetPayload<{ select: typeof QUESTION_NODE }> & { parts?: QuestionNodeRow[] };

function questionView(node: QuestionNodeRow, resolveAsset: AssetResolver): ReviewQuestionView {
  const payload = safeParseQuestionPayload(node.type, node.payload);
  const spec = safeParseAnswerSpec(node.type, node.answerSpec);
  const options = node.options.map((o) => ({ ...o, rationale: o.rationale ?? null }));
  const correct =
    payload.success && spec.success && node.type !== "STRUCTURED" ? formatCorrectAnswer(node.type, payload.data, spec.data, options) : null;
  const pairs: ReviewQuestionView["pairs"] = [];
  let blanks: ReviewQuestionView["blanks"] = null;
  if (payload.success && spec.success && node.type === "MATCHING") {
    const p = payload.data as { left: { id: string; content: string }[]; right: { id: string; content: string }[] };
    const s = spec.data as { pairs: { leftId: string; rightId: string }[] };
    for (const pair of s.pairs) {
      const left = p.left.find((l) => l.id === pair.leftId);
      const right = p.right.find((r) => r.id === pair.rightId);
      if (left && right) pairs.push({ leftHtml: renderInline(left.content, { resolveAsset }).html, rightHtml: renderInline(right.content, { resolveAsset }).html });
    }
  }
  if (payload.success && spec.success && node.type === "FILL_IN_THE_BLANK") {
    const p = payload.data as { template: string; blanks: { id: string }[] };
    const s = spec.data as { blanks: { id: string; accepted: string[] }[] };
    const numbers = new Map(p.blanks.map((b, i) => [b.id, i + 1]));
    const template = p.template.replace(new RegExp(BLANK_PLACEHOLDER.source, "g"), (_, id: string) => `**[gap ${numbers.get(id) ?? "?"}]**`);
    blanks = {
      templateHtml: renderContent(template, { ...FLASHCARD_PREVIEW_OPTIONS, resolveAsset }).html,
      answers: s.blanks.map((b) => ({ number: numbers.get(b.id) ?? 0, accepted: b.accepted })).sort((a, b) => a.number - b.number),
    };
  }
  const scheme = spec.success && typeof spec.data === "object" && spec.data !== null && "markScheme" in spec.data ? (spec.data as { markScheme?: { points: { id: string; description: string; marks: number }[] } }).markScheme : undefined;
  const modelAnswer = spec.success && typeof spec.data === "object" && spec.data !== null && "modelAnswer" in spec.data ? (spec.data as { modelAnswer?: string }).modelAnswer : undefined;
  return {
    label: node.partLabel,
    type: node.type,
    markingMode: node.markingMode,
    marks: node.marks,
    stemHtml: renderContent(node.stem, { ...FLASHCARD_PREVIEW_OPTIONS, resolveAsset }).html,
    options: options.map((o) => ({ key: o.key, html: renderInline(o.content, { resolveAsset }).html, isCorrect: o.isCorrect, rationaleHtml: html(o.rationale, resolveAsset) })),
    pairs,
    blanks,
    correctAnswerHtml: correct ? renderInline(correct, { resolveAsset }).html : null,
    markScheme: (scheme?.points ?? []).map((p) => ({ id: p.id, descriptionHtml: renderInline(p.description, { resolveAsset }).html, marks: p.marks })),
    modelAnswerHtml: html(modelAnswer, resolveAsset),
    specJson: node.answerSpec === null ? null : JSON.stringify(node.answerSpec, null, 2),
    explanationHtml: html(node.explanation, resolveAsset),
    workedSolutionHtml: html(node.workedSolution, resolveAsset),
    hintsHtml: node.hints.map((h) => html(h, resolveAsset)).filter((h): h is SanitizedHtml => h !== null),
    parts: (node.parts ?? []).map((part) => questionView(part, resolveAsset)),
  };
}

function excerpt(text: string, max = 90): string {
  const flat = text.replace(/\s+/g, " ").trim();
  return flat.length > max ? `${flat.slice(0, max - 1)}…` : flat;
}

export async function getTopicReview(actor: CmsActor, topicId: string): Promise<TopicReview> {
  assertCanReview(actor);
  const id = parseInput(z.uuid("Choose a topic."), topicId);
  const { topic, ids } = await subtreeTopicIds(id);
  const ancestors = topic.path.split("/").filter((x) => x && x !== topic.id);
  const crumbs = ancestors.length ? await db.topic.findMany({ where: { id: { in: ancestors } }, select: { id: true, name: true, code: true, depth: true } }) : [];
  const fourEyes = await isFourEyesEnforced();
  const tagged = { some: { topicId: { in: ids } } };
  const take = TOPIC_PAGE_LIMIT + 1;

  const [lessons, questions, cards, assessments] = [
    await db.lesson.findMany({
      where: { status: { in: [...WAITING] }, topics: tagged },
      select: { ...WORKFLOW_SELECT, title: true, summary: true, body: true, estimatedMinutes: true, accessTier: true },
      orderBy: [{ title: "asc" }],
      take,
    }),
    await db.question.findMany({
      where: { status: { in: [...WAITING] }, parentId: null, schoolId: null, ownerUserId: null, topics: tagged },
      select: {
        ...WORKFLOW_SELECT,
        ...QUESTION_NODE,
        difficulty: true,
        estimatedSeconds: true,
        cognitiveSkill: true,
        isExamStyle: true,
        isDailyEligible: true,
        accessTier: true,
        parts: { where: { status: { not: "ARCHIVED" } }, orderBy: PART_ORDER, select: { ...QUESTION_NODE, parts: { where: { status: { not: "ARCHIVED" } }, orderBy: PART_ORDER, select: QUESTION_NODE } } },
      },
      orderBy: [{ difficulty: "asc" }, { externalRef: "asc" }, { id: "asc" }],
      take,
    }),
    await db.flashcard.findMany({
      where: { status: { in: [...WAITING] }, ownerUserId: null, topics: tagged },
      select: { ...WORKFLOW_SELECT, cardType: true, front: true, back: true, notes: true },
      orderBy: [{ externalRef: "asc" }, { id: "asc" }],
      take,
    }),
    await db.assessment.findMany({
      where: {
        status: { in: [...WAITING] },
        schoolId: null,
        ownerUserId: null,
        OR: [{ topics: tagged }, { sections: { some: { rules: { some: { topicId: { in: ids } } } } } }],
      },
      select: {
        ...WORKFLOW_SELECT,
        title: true,
        kind: true,
        assembly: true,
        totalMarks: true,
        timeLimitSeconds: true,
        accessTier: true,
        description: true,
        instructions: true,
        sections: {
          orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
          select: {
            title: true,
            answerCount: true,
            marks: true,
            component: { select: { code: true, name: true } },
            items: { orderBy: [{ sortOrder: "asc" }, { id: "asc" }], select: { label: true, marks: true, question: { select: { stem: true, marks: true } } } },
            rules: {
              orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
              select: { questionCount: true, difficultyMin: true, difficultyMax: true, questionType: true, cognitiveSkill: true, marksPerQuestion: true, examStyleOnly: true, includeSubtopics: true, topic: { select: { name: true, code: true } } },
            },
          },
        },
      },
      orderBy: [{ title: "asc" }],
      take,
    }),
  ];
  const truncated = lessons.length + questions.length + cards.length + assessments.length > TOPIC_PAGE_LIMIT;

  const sources = [
    ...lessons.flatMap((l) => [l.body, l.summary]),
    ...questions.flatMap((q) => [q.stem, q.explanation, q.workedSolution, ...q.parts.map((p) => p.stem)]),
    ...cards.flatMap((c) => [c.front, c.back, c.notes]),
  ];
  const resolveAsset = await loadAssetResolver(sources);
  const base = (row: { id: string; status: ContentStatus; revision: number; draftOfId: string | null; aiGenerated: boolean; createdById: string | null; externalRef: string | null; createdBy: Parameters<typeof staffName>[0] }, entityType: ReviewableEntity, title: string): ReviewItemBase => ({
    entityType,
    id: row.id,
    status: row.status,
    revision: row.revision,
    draftOfId: row.draftOfId,
    aiGenerated: row.aiGenerated,
    isOwnWork: row.createdById !== null && row.createdById === actor.userId,
    author: staffName(row.createdBy),
    title,
    externalRef: row.externalRef,
  });

  const items: TopicReviewItem[] = [
    ...questions.map(
      (q): TopicReviewItem => ({
        ...base(q, "QUESTION", excerpt(q.stem)),
        entityType: "QUESTION",
        difficulty: q.difficulty,
        estimatedSeconds: q.estimatedSeconds,
        skill: q.cognitiveSkill,
        isExamStyle: q.isExamStyle,
        isDailyEligible: q.isDailyEligible,
        accessTier: q.accessTier,
        question: questionView(q as unknown as QuestionNodeRow, resolveAsset),
      }),
    ),
    ...cards.map(
      (c): TopicReviewItem => ({
        ...base(c, "FLASHCARD", excerpt(c.front)),
        entityType: "FLASHCARD",
        cardType: c.cardType,
        frontHtml: renderContent(c.front, { ...FLASHCARD_PREVIEW_OPTIONS, resolveAsset }).html,
        backHtml: renderContent(c.back, { ...FLASHCARD_PREVIEW_OPTIONS, resolveAsset }).html,
        notesHtml: html(c.notes, resolveAsset),
      }),
    ),
    ...lessons.map(
      (l): TopicReviewItem => ({
        ...base(l, "LESSON", l.title),
        entityType: "LESSON",
        summaryHtml: html(l.summary, resolveAsset, true),
        // Headings start at h3 here: the page's item titles are the h2s.
        bodyHtml: renderContent(l.body, { ...LESSON_RENDER_OPTIONS, baseHeadingLevel: 3, idPrefix: `l-${l.id.slice(0, 8)}-`, resolveAsset }).html,
        estimatedMinutes: l.estimatedMinutes,
        accessTier: l.accessTier,
      }),
    ),
    ...assessments.map(
      (a): TopicReviewItem => ({
        ...base(a, "ASSESSMENT", a.title),
        entityType: "ASSESSMENT",
        kind: a.kind,
        assembly: a.assembly,
        totalMarks: a.totalMarks,
        timeLimitMinutes: a.timeLimitSeconds === null ? null : Math.round(a.timeLimitSeconds / 60),
        accessTier: a.accessTier,
        descriptionHtml: html(a.description, resolveAsset),
        instructionsHtml: html(a.instructions, resolveAsset),
        sections: a.sections.map((s) => ({
          title: `${s.title}${s.component ? ` (paper ${s.component.code}: ${s.component.name})` : ""}${s.answerCount ? `, answer any ${s.answerCount} (${s.marks ?? "?"} marks)` : ""}`,
          lines: [
            ...s.rules.map(
              (r) =>
                `Draw ${r.questionCount} question${r.questionCount === 1 ? "" : "s"} from ${r.topic ? `${r.topic.code ? `${r.topic.code} ` : ""}${r.topic.name}${r.includeSubtopics ? " and its subtopics" : " only"}` : "the whole scope"}, difficulty ${r.difficultyMin}-${r.difficultyMax}` +
                `${r.marksPerQuestion ? `, ${r.marksPerQuestion} mark${r.marksPerQuestion === 1 ? "" : "s"} each` : ""}${r.questionType ? `, type ${r.questionType.toLowerCase().replace(/_/g, " ")}` : ""}` +
                `${r.cognitiveSkill ? `, skill ${r.cognitiveSkill.toLowerCase()}` : ""}${r.examStyleOnly ? ", exam-style only" : ""}.`,
            ),
            ...s.items.map((i) => `${i.label ? `${i.label}. ` : ""}${excerpt(i.question.stem, 120)} [${i.marks ?? i.question.marks}]`),
          ],
        })),
      }),
    ),
  ];

  const depthById = new Map(crumbs.map((c) => [c.id, c.depth]));
  return {
    topic: { id: topic.id, name: topic.name, code: topic.code, kind: topic.kind, syllabusId: topic.syllabusId, syllabusTitle: topic.syllabus.title, versionLabel: topic.syllabus.versionLabel },
    breadcrumbs: [...crumbs].sort((a, b) => (depthById.get(a.id) ?? 0) - (depthById.get(b.id) ?? 0)).map((c) => ({ id: c.id, name: c.name, code: c.code })),
    fourEyes,
    items: items.slice(0, TOPIC_PAGE_LIMIT),
    truncated,
  };
}

// =====================================================================================================================
// Approve and publish everything the reviewer has read
// =====================================================================================================================

export const publishTopicSchema = z.object({
  topicId: z.uuid("Choose a topic."),
  items: z
    .array(z.object({ entityType: z.enum(["LESSON", "QUESTION", "FLASHCARD", "ASSESSMENT"]), id: z.uuid() }))
    .min(1, "There is nothing to publish.")
    .max(TOPIC_PAGE_LIMIT),
  notes: z.preprocess(
    (value) => (typeof value === "string" ? value.trim() : value),
    z.string().min(10, "Describe what you checked (answers, facts, notation, originality): it is recorded with every approval.").max(2_000),
  ),
  confirmed: z.literal(true, { error: "Confirm that you have read every item on this page." }),
});

export interface TopicPublishResult {
  published: number;
  skipped: { id: string; title: string; reason: string }[];
  failed: { id: string; title: string; message: string }[];
}

/**
 * Approves (when IN_REVIEW) and publishes, one item per transaction, the items the reviewer had on screen
 * (`items`, so nothing added after the page loaded is published unread). Items that are no longer waiting in this
 * topic are skipped, and so is the reviewer's own work when four-eyes applies. Each approval and publication is
 * audited by the publish helper; one summary entry records the attestation.
 */
export async function approveAndPublishTopic(actor: CmsActor, raw: unknown): Promise<TopicPublishResult> {
  assertCanReview(actor);
  assertCanPublish(actor);
  const input = parseInput(publishTopicSchema, raw);
  const review = await getTopicReview(actor, input.topicId);
  const waiting = new Map(review.items.map((item) => [`${item.entityType}:${item.id}`, item]));
  const result: TopicPublishResult = { published: 0, skipped: [], failed: [] };
  const requested = [...input.items].sort((a, b) => ENTITY_ORDER.indexOf(a.entityType) - ENTITY_ORDER.indexOf(b.entityType));
  for (const ref of requested) {
    const item = waiting.get(`${ref.entityType}:${ref.id}`);
    if (!item) {
      result.skipped.push({ id: ref.id, title: ref.id, reason: "no longer waiting in this topic (changed since the page was loaded)" });
      continue;
    }
    if (item.isOwnWork && review.fourEyes) {
      result.skipped.push({ id: item.id, title: item.title, reason: "your own work: another editor must approve it" });
      continue;
    }
    try {
      await db.$transaction(
        async (tx) => {
          if (item.status === "IN_REVIEW") await approveContent(actor, { entityType: item.entityType, id: item.id, notes: input.notes }, { client: tx });
          await publishContent(actor, { entityType: item.entityType, id: item.id, changeNote: "Published from topic review." }, { client: tx });
        },
        { timeout: 60_000, maxWait: 15_000 },
      );
      result.published += 1;
    } catch (error) {
      result.failed.push({ id: item.id, title: item.title, message: error instanceof AppError ? error.message : "Could not be published." });
    }
  }
  await auditInTx(db, {
    actorUserId: actor.userId,
    actorRoles: actor.roles,
    action: AUDIT_ACTIONS.CONTENT_PUBLISH,
    entityType: "Topic",
    entityId: input.topicId,
    metadata: {
      operation: "content.review.topic_publish_all",
      attestation: input.notes,
      requested: input.items.length,
      published: result.published,
      skipped: result.skipped.length,
      failed: result.failed.length,
    },
  });
  return result;
}

