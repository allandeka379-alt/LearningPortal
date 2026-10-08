import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { isAppError } from "@/server/lib/errors";
import { importContent } from "@/server/content-pipeline/import";
import { fixtureFiles, removeTree, tempRoot, writeTree } from "@/server/content-pipeline/testing";
import { createCurriculumChain, createUser, uniqueSuffix } from "../../../../tests/factories";
import type { CmsActor } from "@/server/cms/users/access";
import { staffActor, studentActor, teacherActor } from "./testing";
import { approveAndPublishTopic, getReviewTopicTree, getTopicReview, listReviewSyllabi } from "./topics";

/**
 * Integration tests of review by topic (/admin/review/topics): authorization at the service boundary, the per-topic
 * counts, the full rendering of everything waiting in a topic subtree (answers included) and "approve and publish all"
 * (only the listed items, attestation required, audited).
 */

let root: string;
let family: string;
let syllabusId: string;
let algebraId: string;
let linearId: string;
let geometryId: string;

async function expectCode(promise: Promise<unknown>, code: string): Promise<void> {
  try {
    await promise;
    expect.unreachable(`expected ${code}`);
  } catch (error) {
    expect(isAppError(error) ? error.code : error).toBe(code);
  }
}

beforeAll(async () => {
  const chain = await createCurriculumChain({ topicCount: 1, subtopicsPerTopic: 0, lessonsPerTopic: 0 });
  family = `r${uniqueSuffix()}-o`;
  root = tempRoot("review-topics");
  writeTree(root, fixtureFiles({ family, subjects: [{ board: chain.examBoard.slug, qualification: chain.qualification.slug, subject: chain.subject.slug }] }));
  const author = await createUser({ roles: ["CONTENT_EDITOR"] });
  const report = await importContent({ repoRoot: root, families: [family], authorEmail: author.user.emailNormalized as string, cacheDir: null });
  expect(report.items.filter((i) => i.outcome === "error")).toEqual([]);
  const version = await db.syllabus.findFirstOrThrow({ where: { subjectId: chain.subject.id, versionLabel: "2030-2032" }, select: { id: true } });
  syllabusId = version.id;
  const topics = await db.topic.findMany({ where: { syllabusId }, select: { id: true, contentKey: true } });
  const idOf = (key: string) => topics.find((t) => t.contentKey === key)?.id as string;
  algebraId = idOf("algebra");
  linearId = idOf("algebra.linear");
  geometryId = idOf("geometry");
}, 180_000);

afterAll(() => removeTree(root));

describe("review by topic — authorization", () => {
  it("refuses students and teachers (content.review is staff-only)", async () => {
    for (const actor of [await studentActor(), await teacherActor()]) {
      await expectCode(listReviewSyllabi(actor), "FORBIDDEN");
      await expectCode(getReviewTopicTree(actor, syllabusId), "FORBIDDEN");
      await expectCode(getTopicReview(actor, algebraId), "FORBIDDEN");
      await expectCode(approveAndPublishTopic(actor, { topicId: algebraId, items: [], notes: "x", confirmed: true }), "FORBIDDEN");
    }
  });
});

describe("review by topic — reading", () => {
  let reviewer: CmsActor;
  beforeAll(async () => {
    reviewer = await staffActor("CONTENT_EDITOR");
  });

  it("lists syllabus versions with the number of waiting items", async () => {
    const row = (await listReviewSyllabi(reviewer)).find((s) => s.id === syllabusId);
    // 4 questions + 2 flashcards + 1 lesson + 1 topic test.
    expect(row?.waiting).toBe(8);
  });

  it("counts waiting items per topic and per subtree", async () => {
    const tree = await getReviewTopicTree(reviewer, syllabusId);
    const byId = new Map(tree.topics.map((t) => [t.id, t]));
    expect(tree.topics[0]?.id).toBe(algebraId);
    // Linear: 3 questions, 1 card, 1 lesson, 1 test; quadratic: 1 question, 1 card.
    expect(byId.get(linearId)).toMatchObject({ direct: 6, total: 6 });
    expect(byId.get(algebraId)).toMatchObject({ direct: 0, total: 8 });
    expect(byId.get(geometryId)).toMatchObject({ direct: 0, total: 0 });
  });

  it("renders everything waiting in the subtree, answers included", async () => {
    const review = await getTopicReview(reviewer, algebraId);
    expect(review.items.map((i) => i.entityType).sort()).toEqual(["ASSESSMENT", "FLASHCARD", "FLASHCARD", "LESSON", "QUESTION", "QUESTION", "QUESTION", "QUESTION"]);
    const mcq = review.items.find((i) => i.entityType === "QUESTION" && i.externalRef?.endsWith("linear.q01"));
    if (mcq?.entityType !== "QUESTION") throw new Error("MCQ missing");
    expect(mcq.question.options.filter((o) => o.isCorrect).map((o) => o.key)).toEqual(["A"]);
    expect(mcq.question.correctAnswerHtml).toBeTruthy();
    expect(mcq.question.options[1]?.rationaleHtml).toContain("Added 3");
    const structured = review.items.find((i) => i.entityType === "QUESTION" && i.externalRef?.endsWith("quadratic.q01"));
    if (structured?.entityType !== "QUESTION") throw new Error("structured question missing");
    expect(structured.question.parts.map((p) => p.label)).toEqual(["(a)", "(b)"]);
    expect(structured.question.parts[0]?.specJson).toContain("(x-4)(x+3)");
    const lesson = review.items.find((i) => i.entityType === "LESSON");
    if (lesson?.entityType !== "LESSON") throw new Error("lesson missing");
    expect(lesson.bodyHtml).toContain("Worked solution");
    const test = review.items.find((i) => i.entityType === "ASSESSMENT");
    if (test?.entityType !== "ASSESSMENT") throw new Error("test missing");
    expect(test.sections[0]?.lines[0]).toMatch(/^Draw 2 questions from 1\.1 Linear equations/);
    expect(review.breadcrumbs).toEqual([]);
    expect((await getTopicReview(reviewer, linearId)).breadcrumbs.map((c) => c.id)).toEqual([algebraId]);
  });
});

describe("review by topic — approve and publish all", () => {
  it("requires an attestation note and the confirmation", async () => {
    const reviewer = await staffActor("ADMIN");
    await expectCode(approveAndPublishTopic(reviewer, { topicId: linearId, items: [{ entityType: "LESSON", id: linearId }], notes: "ok", confirmed: true }), "VALIDATION");
    await expectCode(approveAndPublishTopic(reviewer, { topicId: linearId, items: [{ entityType: "LESSON", id: linearId }], notes: "I checked every answer carefully.", confirmed: false }), "VALIDATION");
  });

  it("publishes exactly the listed items that wait in the topic, and audits the attestation", async () => {
    const reviewer = await staffActor("ADMIN");
    const review = await getTopicReview(reviewer, linearId);
    const questions = review.items.filter((i) => i.entityType === "QUESTION").map((i) => ({ entityType: i.entityType, id: i.id }));
    const elsewhere = (await getTopicReview(reviewer, algebraId)).items.find((i) => i.externalRef?.endsWith("quadratic.q01"));
    const notes = "Solved each question myself; answers, notation and originality checked.";
    const result = await approveAndPublishTopic(reviewer, {
      topicId: linearId,
      items: [...questions, { entityType: "QUESTION", id: elsewhere?.id as string }],
      notes,
      confirmed: true,
    });
    expect(result.published).toBe(3);
    expect(result.failed).toEqual([]);
    expect(result.skipped.map((s) => s.id)).toEqual([elsewhere?.id]);

    const rows = await db.question.findMany({ where: { id: { in: questions.map((q) => q.id) } }, select: { status: true, approvedById: true, reviewNotes: true } });
    expect(rows.every((r) => r.status === "PUBLISHED" && r.approvedById === reviewer.userId && r.reviewNotes === notes)).toBe(true);
    const untouched = await db.question.findUniqueOrThrow({ where: { id: elsewhere?.id as string }, select: { status: true } });
    expect(untouched.status).toBe("IN_REVIEW");
    const summary = await db.auditLog.findFirstOrThrow({ where: { action: "content.publish", entityType: "Topic", entityId: linearId, actorUserId: reviewer.userId }, select: { metadata: true } });
    expect(summary.metadata).toMatchObject({ operation: "content.review.topic_publish_all", attestation: notes, requested: 4, published: 3, skipped: 1, failed: 0 });

    const after = await getTopicReview(reviewer, linearId);
    expect(after.items.some((i) => i.entityType === "QUESTION")).toBe(false);
  }, 120_000);
});
