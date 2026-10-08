import { afterAll, describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { enrolInSubjects } from "@/server/enrollment";
import { getExamCatalogue, startExam } from "@/server/exams/service";
import { getDueQueue } from "@/server/flashcards/service";
import { getLessonForStudent, getTopicPageForStudent } from "@/server/lessons";
import { startPracticeSession } from "@/server/practice/service";
import { reindexEntity } from "@/server/search/indexer";
import { search } from "@/server/search/query";
import { createCurriculumChain, createLearner, createUser, uniqueSuffix } from "../../../tests/factories";
import { importContent } from "./import";
import { publishContentFromPipeline } from "./publisher";
import { fixtureFiles, removeTree, tempRoot, writeTree } from "./testing";

/**
 * End to end: content written ONCE per family reaches students of TWO boards. The fixture family is imported and
 * published for two subjects of different boards (one syllabus file each, both covering the same concepts), then one
 * full-access student per board enrols through the real enrolment service and must see the same lesson, flashcards,
 * practice questions and topic test through the student services, and find the lesson by search.
 */

const roots: string[] = [];
afterAll(() => roots.forEach(removeTree));

describe("content pipeline → students of every board", () => {
  it("shows the shared lesson, flashcards, practice questions and topic test to a student of each board", async () => {
    const chains = [
      await createCurriculumChain({ topicCount: 1, subtopicsPerTopic: 0, lessonsPerTopic: 0 }),
      await createCurriculumChain({ topicCount: 1, subtopicsPerTopic: 0, lessonsPerTopic: 0 }),
    ];
    const family = `v${uniqueSuffix()}-o`;
    const root = tempRoot("visibility");
    roots.push(root);
    writeTree(root, fixtureFiles({ family, subjects: chains.map((chain) => ({ board: chain.examBoard.slug, qualification: chain.qualification.slug, subject: chain.subject.slug })) }));
    const author = await createUser({ roles: ["CONTENT_EDITOR"] });
    const authorEmail = author.user.emailNormalized as string;
    const admin = await createUser({ roles: ["ADMIN"] });
    const imported = await importContent({ repoRoot: root, families: [family], authorEmail, cacheDir: null });
    expect(imported.items.filter((i) => i.outcome === "error")).toEqual([]);
    const published = await publishContentFromPipeline({ repoRoot: root, approverEmail: admin.user.emailNormalized as string, families: [family], authorEmail, catalogue: false });
    expect(published.items.filter((i) => i.outcome !== "published")).toEqual([]);
    expect(published.syllabi.map((s) => s.outcome)).toEqual(["published", "published"]);

    const ref = `content:${family}:`;
    const lesson = await db.lesson.findFirstOrThrow({ where: { externalRef: `${ref}linear.solving` }, select: { id: true, title: true } });
    await reindexEntity("LESSON", lesson.id); // the worker's job, run inline here

    for (const chain of chains) {
      const learner = await createLearner();
      await enrolInSubjects(learner.actor, { subjectIds: [chain.subject.id] });
      const pin = await db.subjectEnrollment.findFirstOrThrow({ where: { userId: learner.userId, subjectId: chain.subject.id }, select: { syllabus: { select: { id: true, versionLabel: true, status: true } } } });
      expect(pin.syllabus).toMatchObject({ versionLabel: "2030-2032", status: "CURRENT" });
      const topic = await db.topic.findFirstOrThrow({ where: { syllabusId: pin.syllabus.id, contentKey: "algebra.linear" }, select: { id: true } });

      const page = await getTopicPageForStudent(learner.actor, chain.subject.id, topic.id);
      expect(page.lessons.map((l) => [l.id, l.locked])).toEqual([[lesson.id, false]]);
      const opened = await getLessonForStudent(learner.actor, lesson.id, { topicId: topic.id });
      expect(JSON.stringify(opened)).toContain("katex");

      const queue = await getDueQueue(learner.actor, { subjectId: chain.subject.id, topicId: topic.id, limit: 20 });
      const cards = await db.flashcard.findMany({ where: { id: { in: queue.cards.map((c) => c.flashcardId) } }, select: { externalRef: true } });
      expect(cards.map((c) => c.externalRef)).toEqual([`${ref}linear.card.equation`]);

      const practice = await startPracticeSession(learner.actor, { subjectId: chain.subject.id, topicIds: [topic.id], count: 3 });
      const drawn = await db.questionAttempt.findMany({ where: { attemptId: practice.attemptId }, select: { question: { select: { externalRef: true } } } });
      expect(drawn.map((d) => d.question.externalRef).sort()).toEqual([`${ref}linear.q01`, `${ref}linear.q02`, `${ref}linear.q03`]);

      const catalogue = await getExamCatalogue(learner.actor, { subjectId: chain.subject.id, topicId: topic.id });
      const test = catalogue.groups.flatMap((g) => g.items).find((item) => item.title === "Linear equations: topic test");
      expect(test).toBeDefined();
      const exam = await startExam(learner.actor, { assessmentId: (test as { id: string }).id });
      const examQuestions = await db.questionAttempt.findMany({ where: { attemptId: exam.attemptId }, select: { question: { select: { externalRef: true } } } });
      expect(examQuestions).toHaveLength(2);
      expect(examQuestions.every((q) => q.question.externalRef?.startsWith(ref))).toBe(true);

      const found = await search({ q: "solving linear equations", filters: { subjectId: chain.subject.id }, limit: 10 }, { signedIn: true, canViewPremium: () => true, boostSubjectIds: [chain.subject.id] });
      expect(found.items.map((item) => item.entityId)).toContain(lesson.id);
    }
  }, 300_000);
});
