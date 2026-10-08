import { randomInt, randomUUID } from "node:crypto";
import { beforeAll, describe, expect, it } from "vitest";
import { addDays, dateColumnFromLocalDate, localDateString } from "@/lib/dates";
import { db } from "@/server/db";
import { correctResponse, createLearningSetup, wrongResponse, type LearningSetup } from "../../../tests/factories/index";
import { answerPublicDailyQuestion, getDailyIndex, getPublicDailyPage, listDailyQualificationParams } from "./daily";

/** A unique client IP per test, so parallel tests never share an anonymous rate-limit bucket. */
function testIp(): string {
  return `10.${randomInt(0, 255)}.${randomInt(0, 255)}.${randomInt(1, 254)}`;
}

const TODAY = localDateString(new Date(), "Africa/Harare");

describe("public daily question (integration)", () => {
  let setup: LearningSetup;
  let wideId: string;
  let subjectDailyId: string;
  let expiredId: string;

  beforeAll(async () => {
    setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 3, type: "MULTIPLE_CHOICE" });
    const [q1, q2, q3] = setup.questions;
    if (!q1 || !q2 || !q3) throw new Error("fixture: questions missing");
    const wide = await db.dailyQuestion.create({
      data: { date: dateColumnFromLocalDate(TODAY), qualificationId: setup.qualificationId, subjectId: null, questionId: q1.id },
    });
    const bySubject = await db.dailyQuestion.create({
      data: { date: dateColumnFromLocalDate(TODAY), qualificationId: setup.qualificationId, subjectId: setup.subjectId, questionId: q2.id },
    });
    const expired = await db.dailyQuestion.create({
      data: { date: dateColumnFromLocalDate(addDays(TODAY, -3)), qualificationId: setup.qualificationId, subjectId: setup.subjectId, questionId: q3.id },
    });
    wideId = wide.id;
    subjectDailyId = bySubject.id;
    expiredId = expired.id;
  });

  it("lists today's questions of a qualification, qualification-wide first, without answer data", async () => {
    const page = await getPublicDailyPage(setup.chain.examBoard.slug, setup.chain.qualification.slug);
    expect(page).not.toBeNull();
    expect(page?.date).toBe(TODAY);
    expect(page?.qualification.label).toBe("TEB T-Level");
    expect(page?.items.map((item) => item.dailyQuestionId)).toEqual([wideId, subjectDailyId]);
    expect(page?.items[0]?.subjectName).toBeNull();
    expect(page?.items[1]?.subjectName).toBe(setup.chain.subject.name);
    const question = page?.items[0]?.question;
    expect(question?.type).toBe("MULTIPLE_CHOICE");
    expect(question?.stemHtml.length).toBeGreaterThan(0);
    // Never any answer data before marking.
    expect(JSON.stringify(page)).not.toMatch(/isCorrect|answerSpec/);
  });

  it("returns null for unknown or malformed slugs", async () => {
    expect(await getPublicDailyPage(setup.chain.examBoard.slug, "no-such-qualification")).toBeNull();
    expect(await getPublicDailyPage("Not A Slug", setup.chain.qualification.slug)).toBeNull();
  });

  it("counts today's questions per qualification in the selector and the static params", async () => {
    const index = await getDailyIndex(new Date(), { examBoardIds: [setup.chain.examBoard.id] });
    expect(index.options).toHaveLength(1);
    const option = index.options.find((o) => o.qualificationId === setup.qualificationId);
    expect(option).toMatchObject({ questionCount: 2, subjects: [setup.chain.subject.name], href: `/daily/${setup.chain.examBoard.slug}/${setup.chain.qualification.slug}` });
    const params = await listDailyQualificationParams({ examBoardIds: [setup.chain.examBoard.id] });
    expect(params).toContainEqual({ board: setup.chain.examBoard.slug, qualification: setup.chain.qualification.slug });
  });

  it("marks a correct answer, reveals the explanation and stores no attempt", async () => {
    const question = setup.questions[0];
    if (!question) throw new Error("fixture");
    const feedback = await answerPublicDailyQuestion({ dailyQuestionId: wideId, response: correctResponse(question.definition) }, { ip: testIp() });
    expect(feedback).toMatchObject({ status: "AUTO_MARKED", outcome: "correct", marksAwarded: question.definition.marks, attemptCompleted: true });
    expect(feedback.reveal?.questionId).toBe(question.id);
    expect(feedback.reveal?.options.some((option) => option.isCorrect)).toBe(true);
    expect(await db.assessmentAttempt.count({ where: { dailyQuestionId: wideId } })).toBe(0);
    expect(await db.questionAttempt.count({ where: { questionId: question.id } })).toBe(0);
  });

  it("marks a wrong answer", async () => {
    const question = setup.questions[1];
    if (!question) throw new Error("fixture");
    const feedback = await answerPublicDailyQuestion({ dailyQuestionId: subjectDailyId, response: wrongResponse(question.definition) }, { ip: testIp() });
    expect(feedback).toMatchObject({ outcome: "incorrect", marksAwarded: 0 });
  });

  it("refuses missing answers, unknown ids and questions older than the grace day", async () => {
    await expect(answerPublicDailyQuestion({ dailyQuestionId: wideId, response: null }, { ip: testIp() })).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(answerPublicDailyQuestion({ dailyQuestionId: wideId, response: { type: "TRUE_FALSE", value: true } }, { ip: testIp() })).rejects.toMatchObject({
      code: "VALIDATION",
    });
    await expect(answerPublicDailyQuestion({ dailyQuestionId: "not-a-uuid", response: null }, { ip: testIp() })).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(answerPublicDailyQuestion({ dailyQuestionId: randomUUID(), response: { type: "MULTIPLE_CHOICE", optionKeys: ["A"] } }, { ip: testIp() })).rejects.toMatchObject({
      code: "NOT_FOUND",
    });
    const old = setup.questions[2];
    if (!old) throw new Error("fixture");
    await expect(answerPublicDailyQuestion({ dailyQuestionId: expiredId, response: correctResponse(old.definition) }, { ip: testIp() })).rejects.toMatchObject({
      code: "NOT_FOUND",
    });
  });

  it("rate-limits anonymous answers per IP", async () => {
    const ip = testIp();
    const input = { dailyQuestionId: randomUUID(), response: { type: "MULTIPLE_CHOICE", optionKeys: ["A"] } };
    for (let i = 0; i < 30; i += 1) {
      await expect(answerPublicDailyQuestion(input, { ip })).rejects.toMatchObject({ code: "NOT_FOUND" });
    }
    await expect(answerPublicDailyQuestion(input, { ip })).rejects.toMatchObject({ code: "RATE_LIMITED" });
  });
});

describe("public daily question visibility (integration)", () => {
  it("never shows a PREMIUM question publicly", async () => {
    const premium = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 1, accessTier: "PREMIUM", lessonsPerTopic: 0 });
    const question = premium.questions[0];
    if (!question) throw new Error("fixture");
    const daily = await db.dailyQuestion.create({
      data: { date: dateColumnFromLocalDate(TODAY), qualificationId: premium.qualificationId, subjectId: premium.subjectId, questionId: question.id },
    });
    const page = await getPublicDailyPage(premium.chain.examBoard.slug, premium.chain.qualification.slug);
    expect(page?.items).toEqual([]);
    await expect(answerPublicDailyQuestion({ dailyQuestionId: daily.id, response: correctResponse(question.definition) }, { ip: testIp() })).rejects.toMatchObject({
      code: "NOT_FOUND",
    });
  });

  it("hides qualifications that are not listed", async () => {
    const hidden = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 1, lessonsPerTopic: 0 });
    await db.qualification.update({ where: { id: hidden.qualificationId }, data: { catalogueStatus: "HIDDEN" } });
    expect(await getPublicDailyPage(hidden.chain.examBoard.slug, hidden.chain.qualification.slug)).toBeNull();
    expect((await getDailyIndex(new Date(), { examBoardIds: [hidden.chain.examBoard.id] })).options).toEqual([]);
  });
});
