import { randomInt, randomUUID } from "node:crypto";
import type { Topic } from "@/generated/prisma/client";
import { beforeAll, describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { answerPublicDailyQuestion } from "@/server/marketing/daily";
import { createCurriculumChain, type CurriculumChain } from "../../../tests/factories/curriculum";
import { correctResponse, wrongResponse } from "../../../tests/factories/index";
import { createQuestion, type CreatedQuestion } from "../../../tests/factories/questions";
import { answerSampleQuestion, loadPracticeSamples, loadSampleQuestions } from "./samples";

/** A unique client IP per test, so parallel tests never share an anonymous rate-limit bucket. */
function testIp(): string {
  return `10.${randomInt(0, 255)}.${randomInt(0, 255)}.${randomInt(1, 254)}`;
}

/**
 * Topic-page practice samples (§44, §46): PUBLIC first, else FREE, never PREMIUM; answer-free on the page; marked
 * anonymously through the daily question's shared, rate-limited, nothing-stored path.
 */
describe("practice samples (integration)", () => {
  let chain: CurriculumChain;
  let topics: { both: Topic; freeOnly: Topic; premiumOnly: Topic };
  let questions: { public: CreatedQuestion; freeExamStyle: CreatedQuestion; freeOnly: CreatedQuestion; premium: CreatedQuestion; draft: CreatedQuestion };

  beforeAll(async () => {
    chain = await createCurriculumChain({ topicCount: 3, subtopicsPerTopic: 0, lessonsPerTopic: 0 });
    const [both, freeOnly, premiumOnly] = chain.topics;
    if (!both || !freeOnly || !premiumOnly) throw new Error("fixture needs three topics");
    topics = { both, freeOnly, premiumOnly };
    const context = { subjectId: chain.subject.id, syllabusId: chain.syllabus.id, topicIds: chain.topics.map((topic) => topic.id) };
    questions = {
      public: await createQuestion("MULTIPLE_CHOICE", { context, topicId: both.id, accessTier: "PUBLIC", isExamStyle: false }),
      // Exam style ranks first within a tier, but PUBLIC beats FREE.
      freeExamStyle: await createQuestion("MULTIPLE_CHOICE", { context, topicId: both.id, accessTier: "FREE", isExamStyle: true }),
      freeOnly: await createQuestion("TRUE_FALSE", { context, topicId: freeOnly.id, accessTier: "FREE" }),
      premium: await createQuestion("MULTIPLE_CHOICE", { context, topicId: premiumOnly.id, accessTier: "PREMIUM" }),
      draft: await createQuestion("MULTIPLE_CHOICE", { context, topicId: premiumOnly.id, accessTier: "FREE", status: "DRAFT" }),
    };
  });

  const scope = (topic: Topic) => ({ syllabusId: chain.syllabus.id, topicIds: [topic.id], limit: 1 });

  it("prefers PUBLIC, falls back to FREE and never offers PREMIUM or drafts", async () => {
    const [onBoth] = await loadPracticeSamples(scope(topics.both));
    expect(onBoth?.question.id).toBe(questions.public.id);
    const [onFreeOnly] = await loadPracticeSamples(scope(topics.freeOnly));
    expect(onFreeOnly?.question.id).toBe(questions.freeOnly.id);
    expect(onFreeOnly?.question.type).toBe("TRUE_FALSE");
    expect(await loadPracticeSamples(scope(topics.premiumOnly))).toEqual([]);
  });

  it("puts no answer data on the page", async () => {
    const samples = await loadPracticeSamples({ syllabusId: chain.syllabus.id, limit: 3 });
    expect(samples.map((sample) => sample.question.id)).toEqual([questions.public.id, questions.freeExamStyle.id, questions.freeOnly.id]);
    expect(JSON.stringify(samples)).not.toMatch(/isCorrect|answerSpec|explanation|workedSolution|reveal/i);
  });

  it("keeps the static (answer-revealing) samples PUBLIC-only", async () => {
    const samples = await loadSampleQuestions({ syllabusId: chain.syllabus.id, limit: 3 });
    expect(samples.map((sample) => sample.question.id)).toEqual([questions.public.id]);
  });

  it("marks a FREE sample anonymously, reveals the worked answer and stores nothing", async () => {
    const question = questions.freeOnly;
    const feedback = await answerSampleQuestion({ questionId: question.id, response: correctResponse(question.definition) }, { ip: testIp() });
    expect(feedback).toMatchObject({ status: "AUTO_MARKED", outcome: "correct", marksAwarded: question.definition.marks, attemptCompleted: true });
    expect(feedback.reveal?.questionId).toBe(question.id);
    const wrong = await answerSampleQuestion({ questionId: question.id, response: wrongResponse(question.definition) }, { ip: testIp() });
    expect(wrong).toMatchObject({ outcome: "incorrect", marksAwarded: 0 });
    expect(await db.questionAttempt.count({ where: { questionId: question.id } })).toBe(0);
  });

  it("refuses PREMIUM, drafts, unknown and malformed input", async () => {
    const ip = testIp();
    await expect(answerSampleQuestion({ questionId: questions.premium.id, response: correctResponse(questions.premium.definition) }, { ip })).rejects.toMatchObject({
      code: "NOT_FOUND",
    });
    await expect(answerSampleQuestion({ questionId: questions.draft.id, response: correctResponse(questions.draft.definition) }, { ip })).rejects.toMatchObject({
      code: "NOT_FOUND",
    });
    await expect(answerSampleQuestion({ questionId: randomUUID(), response: { type: "MULTIPLE_CHOICE", optionKeys: ["A"] } }, { ip })).rejects.toMatchObject({
      code: "NOT_FOUND",
    });
    await expect(answerSampleQuestion({ questionId: "not-a-uuid", response: null }, { ip })).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(answerSampleQuestion({ questionId: questions.public.id, response: null }, { ip })).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(answerSampleQuestion({ questionId: questions.public.id, response: { type: "TRUE_FALSE", value: true } }, { ip })).rejects.toMatchObject({
      code: "VALIDATION",
    });
    await expect(answerSampleQuestion({ questionId: questions.public.id, response: { type: "SHORT_ANSWER", text: "x".repeat(25_000) } }, { ip })).rejects.toMatchObject({
      code: "VALIDATION",
    });
  });

  it("refuses questions of a subject that is not public", async () => {
    const hidden = await createCurriculumChain({ topicCount: 1, subtopicsPerTopic: 0, lessonsPerTopic: 0 });
    const topic = hidden.topics[0];
    if (!topic) throw new Error("fixture");
    const context = { subjectId: hidden.subject.id, syllabusId: hidden.syllabus.id, topicIds: [topic.id] };
    const question = await createQuestion("MULTIPLE_CHOICE", { context, topicId: topic.id, accessTier: "FREE" });
    const input = { questionId: question.id, response: correctResponse(question.definition) };
    expect(await answerSampleQuestion(input, { ip: testIp() })).toMatchObject({ outcome: "correct" });
    await db.subject.update({ where: { id: hidden.subject.id }, data: { isPublic: false } });
    await expect(answerSampleQuestion(input, { ip: testIp() })).rejects.toMatchObject({ code: "NOT_FOUND" });
  });

  it("shares one anonymous per-IP budget with the public daily question", async () => {
    const ip = testIp();
    const input = { questionId: randomUUID(), response: { type: "MULTIPLE_CHOICE", optionKeys: ["A"] } };
    for (let i = 0; i < 30; i += 1) {
      await expect(answerSampleQuestion(input, { ip })).rejects.toMatchObject({ code: "NOT_FOUND" });
    }
    await expect(answerSampleQuestion(input, { ip })).rejects.toMatchObject({ code: "RATE_LIMITED" });
    await expect(answerPublicDailyQuestion({ dailyQuestionId: randomUUID(), response: input.response }, { ip })).rejects.toMatchObject({ code: "RATE_LIMITED" });
  });
});
