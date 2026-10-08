import { createHash, randomUUID } from "node:crypto";
import type { Lesson, LessonKind, Prisma, Subject, Topic } from "@/generated/prisma/client";
import { db } from "@/server/db";
import { createCurriculumChain, createLessonForTopic, type CurriculumChain } from "../../../tests/factories/curriculum";
import { createExamSession } from "../../../tests/factories/learning";
import { createQuestion, type CreatedQuestion } from "../../../tests/factories/questions";
import { uniqueSlug, uniqueSuffix } from "../../../tests/factories/util";

/**
 * Fixtures for the public SEO page tests (integration tests only; never imported by app code). Every row is unique
 * (tests/README.md: parallel files share one never-truncated database). Content that must NEVER reach a public page
 * carries a marker listed in `secrets`, so a test can assert none of them appears in rendered HTML.
 */

export interface SeoFixture {
  chain: CurriculumChain;
  marker: string;
  slugs: { board: string; qualification: string; subject: string; topic: string; subtopic: string };
  /** TOPIC root carrying the lessons and questions below. */
  topic: Topic;
  /** First SUBTOPIC of `topic` (the PUBLIC sample question is tagged here: it must surface on the topic page). */
  subtopic: Topic;
  lessons: { public: Lesson; free: Lesson; premium: Lesson };
  questions: { public: CreatedQuestion; free: CreatedQuestion; premium: CreatedQuestion };
  /** Texts of FREE / PREMIUM content: never allowed in public HTML. */
  secrets: string[];
  /** Texts of PUBLIC content that the public pages should show. */
  publicTexts: { lessonBody: string; questionStem: string; questionExplanation: string };
  examSessionName: string;
  /** A second subject whose CURRENT version has a non-public topic (with a public child) next to a public one. */
  hiddenTopics: { subject: Subject; publicSlug: string; hiddenSlug: string; hiddenChildSlug: string };
  /** Listed, public subject that has only a DRAFT syllabus version (honest "being prepared" page, noindex). */
  draftOnlySubject: Subject;
  /** Catalogue-HIDDEN and non-public subjects: both 404. */
  hiddenSubject: Subject;
  nonPublicSubject: Subject;
  /** PUBLIC guides scoped to the board and to the qualification (subject-less). */
  boardGuide: Lesson;
  qualificationGuide: Lesson;
}

function sha256Hex(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

/**
 * A PUBLISHED, subject-less PUBLIC guide (STUDY_GUIDE) scoped to a board or a qualification, or general (`{}`: no
 * scope at all, served at `/guides/[slug]`), with its snapshot.
 */
export async function createScopedGuide(
  scope: { examBoardId: string } | { qualificationId: string } | Record<string, never>,
  title: string,
  body: string,
  kind: LessonKind = "STUDY_GUIDE",
): Promise<Lesson> {
  const now = new Date();
  return db.$transaction(async (tx) => {
    const lesson = await tx.lesson.create({
      data: {
        ...scope,
        kind,
        title,
        slug: uniqueSlug("guide"),
        summary: `Guide summary ${title}`,
        body,
        accessTier: "PUBLIC",
        status: "PUBLISHED",
        revision: 1,
        copyrightStatus: "OWNED",
        approvedAt: now,
        publishedAt: now,
      },
    });
    const snapshot = { lesson: { id: lesson.id, title, slug: lesson.slug, body, kind, accessTier: "PUBLIC", revision: 1 }, topics: [], objectives: [], questions: [] };
    await tx.contentRevision.create({
      data: { entityType: "LESSON", entityId: lesson.id, revision: 1, snapshot, contentHash: sha256Hex(JSON.stringify(snapshot)), changeNote: "Test fixture" },
    });
    return lesson;
  });
}

async function createSubjectWithHiddenTopic(chain: CurriculumChain, marker: string): Promise<SeoFixture["hiddenTopics"]> {
  const subject = await db.subject.create({
    data: {
      qualificationId: chain.qualification.id,
      categoryId: chain.category.id,
      slug: uniqueSlug("hidden-topics"),
      name: `Hidden topics subject ${marker}`,
      catalogueStatus: "AVAILABLE",
      sourceId: chain.source.id,
    },
  });
  const draft = await db.syllabus.create({
    data: {
      subjectId: subject.id,
      title: `Hidden topics syllabus ${marker}`,
      versionLabel: "2026-2028",
      effectiveFrom: new Date("2026-01-01T00:00:00.000Z"),
      sourceId: chain.source.id,
      copyrightStatus: "OWNED",
    },
  });
  const publicId = randomUUID();
  const hiddenId = randomUUID();
  const childId = randomUUID();
  const publicSlug = uniqueSlug("open-topic");
  const hiddenSlug = uniqueSlug("closed-topic");
  const hiddenChildSlug = uniqueSlug("closed-child");
  const roots: Prisma.TopicCreateManyInput[] = [
    { id: publicId, syllabusId: draft.id, kind: "TOPIC", depth: 0, path: publicId, sortOrder: 0, name: `Open topic ${marker}`, slug: publicSlug },
    { id: hiddenId, syllabusId: draft.id, kind: "TOPIC", depth: 0, path: hiddenId, sortOrder: 1, name: `Closed topic ${marker}`, slug: hiddenSlug, isPublic: false },
  ];
  await db.topic.createMany({ data: roots });
  await db.topic.create({
    data: {
      id: childId,
      syllabusId: draft.id,
      parentId: hiddenId,
      kind: "SUBTOPIC",
      depth: 1,
      path: `${hiddenId}/${childId}`,
      name: `Closed child ${marker}`,
      slug: hiddenChildSlug,
    },
  });
  await db.syllabus.update({ where: { id: draft.id }, data: { status: "CURRENT", publishedAt: new Date() } });
  return { subject, publicSlug, hiddenSlug, hiddenChildSlug };
}

/** Builds the full public-page fixture: one listed chain with PUBLIC / FREE / PREMIUM content side by side. */
export async function createSeoFixture(): Promise<SeoFixture> {
  const marker = uniqueSuffix();
  const chain = await createCurriculumChain({ topicCount: 2, subtopicsPerTopic: 2, objectivesPerSubtopic: 1, lessonsPerTopic: 0 });
  const topic = chain.topics[0] as Topic;
  const subtopic = chain.subtopics[0] as Topic;

  const publicBody = `PUBLIC-BODY-${marker} explains how to factorise $x^2 + 5x + 6$.`;
  const [publicLesson, freeLesson, premiumLesson] = [
    await createLessonForTopic({ subjectId: chain.subject.id, topicId: topic.id, title: `Free guide ${marker}`, body: `## Start\n\n${publicBody}`, accessTier: "PUBLIC", sortOrder: 0 }),
    await createLessonForTopic({ subjectId: chain.subject.id, topicId: topic.id, title: `Account lesson ${marker}`, body: `FREE-SECRET-BODY-${marker}`, accessTier: "FREE", sortOrder: 1 }),
    await createLessonForTopic({ subjectId: chain.subject.id, topicId: topic.id, title: `Premium lesson ${marker}`, body: `PREMIUM-SECRET-BODY-${marker}`, accessTier: "PREMIUM", sortOrder: 2 }),
  ].map((created) => created.lesson) as [Lesson, Lesson, Lesson];

  const context = { subjectId: chain.subject.id, syllabusId: chain.syllabus.id, topicIds: chain.topics.map((t) => t.id) };
  const publicStem = `PUBLIC-STEM-${marker}: which value of $x$ satisfies $x^2 - 5x + 6 = 0$ and is even?`;
  const publicExplanation = `PUBLIC-EXPLANATION-${marker}: factorise to $(x-2)(x-3)$.`;
  const questions = {
    public: await createQuestion("MULTIPLE_CHOICE", { context, topicId: subtopic.id, accessTier: "PUBLIC", stem: publicStem, explanation: publicExplanation, isExamStyle: true }),
    free: await createQuestion("TRUE_FALSE", {
      context,
      topicId: topic.id,
      accessTier: "FREE",
      stem: `FREE-SECRET-STEM-${marker}`,
      explanation: `FREE-SECRET-EXPLANATION-${marker}`,
    }),
    premium: await createQuestion("SHORT_ANSWER", {
      context,
      topicId: topic.id,
      accessTier: "PREMIUM",
      stem: `PREMIUM-SECRET-STEM-${marker}`,
      explanation: `PREMIUM-SECRET-EXPLANATION-${marker}`,
    }),
  };

  const examSessionName = `November 2027 ${marker}`;
  await createExamSession(chain.qualification.id, { startsOn: "2027-11-03", isProvisional: true, name: examSessionName });

  const hiddenTopics = await createSubjectWithHiddenTopic(chain, marker);
  const baseSubject = { qualificationId: chain.qualification.id, categoryId: chain.category.id, sourceId: chain.source.id } as const;
  const draftOnlySubject = await db.subject.create({
    data: { ...baseSubject, slug: uniqueSlug("draft-only"), name: `Draft only subject ${marker}`, catalogueStatus: "COMING_SOON" },
  });
  await db.syllabus.create({
    data: {
      subjectId: draftOnlySubject.id,
      title: `Draft syllabus ${marker}`,
      versionLabel: "2027-2029",
      effectiveFrom: new Date("2027-01-01T00:00:00.000Z"),
      sourceId: chain.source.id,
      copyrightStatus: "OWNED",
    },
  });
  const hiddenSubject = await db.subject.create({
    data: { ...baseSubject, slug: uniqueSlug("hidden-subject"), name: `Hidden subject ${marker}`, catalogueStatus: "HIDDEN" },
  });
  const nonPublicSubject = await db.subject.create({
    data: { ...baseSubject, slug: uniqueSlug("private-subject"), name: `Private subject ${marker}`, catalogueStatus: "AVAILABLE", isPublic: false },
  });

  const boardGuide = await createScopedGuide({ examBoardId: chain.examBoard.id }, `Board guide ${marker}`, `BOARD-GUIDE-BODY-${marker}`, "ARTICLE");
  const qualificationGuide = await createScopedGuide({ qualificationId: chain.qualification.id }, `Qualification guide ${marker}`, `QUALIFICATION-GUIDE-BODY-${marker}`);

  return {
    chain,
    marker,
    slugs: { board: chain.examBoard.slug, qualification: chain.qualification.slug, subject: chain.subject.slug, topic: topic.slug, subtopic: subtopic.slug },
    topic,
    subtopic,
    lessons: { public: publicLesson, free: freeLesson, premium: premiumLesson },
    questions,
    secrets: [
      `FREE-SECRET-BODY-${marker}`,
      `PREMIUM-SECRET-BODY-${marker}`,
      `Summary of Account lesson ${marker}`,
      `Summary of Premium lesson ${marker}`,
      `FREE-SECRET-STEM-${marker}`,
      `FREE-SECRET-EXPLANATION-${marker}`,
      `PREMIUM-SECRET-STEM-${marker}`,
      `PREMIUM-SECRET-EXPLANATION-${marker}`,
    ],
    publicTexts: { lessonBody: `PUBLIC-BODY-${marker}`, questionStem: `PUBLIC-STEM-${marker}`, questionExplanation: `PUBLIC-EXPLANATION-${marker}` },
    examSessionName,
    hiddenTopics,
    draftOnlySubject,
    hiddenSubject,
    nonPublicSubject,
    boardGuide,
    qualificationGuide,
  };
}
