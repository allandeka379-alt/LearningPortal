import { randomUUID } from "node:crypto";
import type { ContentAccessTier, Lesson } from "@/generated/prisma/client";
import { db } from "@/server/db";
import { setContentPublishContext } from "@/server/lib/db-context";
import { createCurriculumChain, createLessonForTopic, type CurriculumChain } from "../../../tests/factories/curriculum";
import { createQuestion, type CreatedQuestion } from "../../../tests/factories/questions";

/**
 * Test fixtures for the lessons domain (integration tests only; never imported by app code). Every row is created
 * with unique values (tests/README.md): parallel test files share one database that is never truncated.
 */

/** A lesson body exercising headings, maths and a pedagogical block. */
export const SAMPLE_LESSON_BODY = [
  "## Introduction",
  "",
  "A quadratic equation has the form $ax^2 + bx + c = 0$.",
  "",
  ":::definition{term=\"Root\"}",
  "A value of $x$ that makes the equation true.",
  ":::",
  "",
  "## Method",
  "",
  "### Factorising",
  "",
  "Find two numbers that multiply to $c$ and add to $b$.",
  "",
  "## Summary",
  "",
  "Check every root by substituting it back.",
].join("\n");

export interface LessonFixture {
  chain: CurriculumChain;
  subjectId: string;
  syllabusId: string;
  /** TOPIC root with the lessons. */
  topicId: string;
  /** SUBTOPIC of `topicId` without lessons of its own (inherits the topic's). */
  subtopicId: string;
  /** Another TOPIC root without lessons. */
  otherTopicId: string;
  /** Lessons of `topicId` in order: FREE, PREMIUM, FREE. */
  lessons: [Lesson, Lesson, Lesson];
  /** A DRAFT lesson on the same topic (never visible to students). */
  draft: Lesson;
  /** Practice questions linked to the first lesson (LessonQuestion order). */
  questions: CreatedQuestion[];
}

async function lessonOn(chain: CurriculumChain, topicId: string, title: string, sortOrder: number, accessTier: ContentAccessTier, status: "PUBLISHED" | "DRAFT" = "PUBLISHED"): Promise<Lesson> {
  const { lesson } = await createLessonForTopic({ subjectId: chain.subject.id, topicId, title, body: SAMPLE_LESSON_BODY, sortOrder, accessTier, status });
  return lesson;
}

/**
 * A CURRENT syllabus version with two TOPIC roots (one SUBTOPIC each, two objectives per subtopic), three published
 * lessons on the first topic (FREE, PREMIUM, FREE), a draft lesson, and optionally practice questions linked to the
 * first lesson.
 */
export async function createLessonFixture(options: { questionCount?: number } = {}): Promise<LessonFixture> {
  const chain = await createCurriculumChain({ topicCount: 2, subtopicsPerTopic: 1, lessonsPerTopic: 0, objectivesPerSubtopic: 2 });
  const [topic, otherTopic] = chain.topics;
  const subtopic = chain.subtopics.find((s) => s.parentId === topic?.id);
  if (!topic || !otherTopic || !subtopic) throw new Error("createLessonFixture: unexpected curriculum shape");

  const first = await lessonOn(chain, topic.id, "Solving quadratic equations", 0, "FREE");
  const second = await lessonOn(chain, topic.id, "Completing the square", 1, "PREMIUM");
  const third = await lessonOn(chain, topic.id, "The quadratic formula", 2, "FREE");
  const draft = await lessonOn(chain, topic.id, "Draft lesson", 3, "FREE", "DRAFT");

  const questions: CreatedQuestion[] = [];
  const context = { subjectId: chain.subject.id, syllabusId: chain.syllabus.id, topicIds: [topic.id] };
  for (let i = 0; i < (options.questionCount ?? 0); i += 1) questions.push(await createQuestion("MULTIPLE_CHOICE", { context, topicId: subtopic.id }));
  if (questions.length > 0) {
    // Children of a PUBLISHED lesson change only inside its publish transaction (content_child_guard).
    await db.$transaction(async (tx) => {
      await setContentPublishContext(tx, first.id);
      await tx.lessonQuestion.createMany({ data: questions.map((q, index) => ({ lessonId: first.id, questionId: q.id, sortOrder: index })) });
    });
  }

  return {
    chain,
    subjectId: chain.subject.id,
    syllabusId: chain.syllabus.id,
    topicId: topic.id,
    subtopicId: subtopic.id,
    otherTopicId: otherTopic.id,
    lessons: [first, second, third],
    draft,
    questions,
  };
}

/** Publishes a second (UPCOMING) syllabus version of the fixture's subject with one TOPIC, and returns its ids. */
export async function createNewerVersion(fixture: LessonFixture): Promise<{ syllabusId: string; topicId: string }> {
  const draft = await db.syllabus.create({
    data: {
      subjectId: fixture.subjectId,
      title: "Test Mathematics syllabus (new version)",
      versionLabel: `2029-${fixture.subjectId.slice(-8)}`,
      effectiveFrom: new Date("2029-01-01T00:00:00.000Z"),
      sourceId: fixture.chain.source.id,
      copyrightStatus: "OWNED",
      supersedesId: fixture.syllabusId,
    },
  });
  const topicId = randomUUID();
  await db.topic.create({
    data: { id: topicId, syllabusId: draft.id, kind: "TOPIC", depth: 0, path: topicId, sortOrder: 0, code: "1", name: "Quadratics (new syllabus)", slug: `quadratics-${topicId.slice(0, 8)}` },
  });
  await db.syllabus.update({ where: { id: draft.id }, data: { status: "UPCOMING", publishedAt: new Date() } });
  return { syllabusId: draft.id, topicId };
}
