import { beforeAll, describe, expect, it } from "vitest";
import type { QuestionType, Role } from "@/generated/prisma/client";
import { addDays, dateColumnFromLocalDate, localDateFromDateColumn, localDateString } from "@/lib/dates";
import { db } from "@/server/db";
import { createCurriculumChain, createQuestion, createUser, type CurriculumChain, type QuestionContext } from "../../../../tests/factories/index";
import type { CmsActor } from "../users/access";
import {
  autoPickDailyQuestion,
  clearDailyQuestion,
  fillDailyQuestions,
  getDailyQuestionCalendar,
  listDailyQuestionCandidates,
  scheduleDailyQuestion,
} from "./service";

/**
 * Daily-question scheduling against Postgres (NULLS NOT DISTINCT unique index, tenant guard, FK from attempts). Every
 * fill call is scoped to this file's own qualifications (`qualificationIds`), because test files share one database.
 */

const NOW = new Date();
const TODAY = localDateString(NOW, "Africa/Harare");
const TOMORROW = addDays(TODAY, 1);

async function actorWith(roles: Exclude<Role, "SCHOOL_ADMIN">[]): Promise<CmsActor> {
  const { user } = await createUser({ roles });
  return { kind: "user", userId: user.id, roles };
}

function contextOf(chain: CurriculumChain): QuestionContext {
  return { subjectId: chain.subject.id, syllabusId: chain.syllabus.id, topicIds: chain.topics.map((t) => t.id) };
}

async function dailyQuestion(context: QuestionContext, topicId: string, overrides: { type?: QuestionType; difficulty?: number; accessTier?: "PUBLIC" | "FREE" | "PREMIUM"; isDailyEligible?: boolean } = {}) {
  return createQuestion(overrides.type ?? "MULTIPLE_CHOICE", {
    context,
    topicId,
    difficulty: overrides.difficulty ?? 2,
    accessTier: overrides.accessTier ?? "FREE",
    isDailyEligible: overrides.isDailyEligible ?? true,
  });
}

async function rowsOf(qualificationId: string) {
  const rows = await db.dailyQuestion.findMany({ where: { qualificationId }, select: { id: true, date: true, subjectId: true, questionId: true, isAutoSelected: true } });
  return rows.map((row) => ({ ...row, date: localDateFromDateColumn(row.date) }));
}

describe("dailyQuestion.fill (integration)", () => {
  let chain: CurriculumChain;
  let eligibleIds: string[];
  let ineligibleIds: string[];

  beforeAll(async () => {
    chain = await createCurriculumChain({ topicCount: 3, subtopicsPerTopic: 0, lessonsPerTopic: 0 });
    const context = contextOf(chain);
    const [t1, t2, t3] = chain.topics.map((t) => t.id) as [string, string, string];
    const eligible = await Promise.all([dailyQuestion(context, t1), dailyQuestion(context, t2, { type: "TRUE_FALSE", difficulty: 3 }), dailyQuestion(context, t3, { type: "NUMERICAL" })]);
    const ineligible = await Promise.all([
      dailyQuestion(context, t1, { isDailyEligible: false }),
      dailyQuestion(context, t2, { difficulty: 5 }),
      dailyQuestion(context, t3, { accessTier: "PREMIUM" }),
      dailyQuestion(context, t1, { type: "ESSAY", isDailyEligible: false }),
    ]);
    eligibleIds = eligible.map((q) => q.id);
    ineligibleIds = ineligible.map((q) => q.id);
  });

  it("fills today and tomorrow per active subject from the eligible pool only, with varied topics, and is idempotent", async () => {
    const first = await fillDailyQuestions({ now: NOW, qualificationIds: [chain.qualification.id] });
    expect(first).toMatchObject({ dates: [TODAY, TOMORROW], scopes: 1, created: 2, alreadyScheduled: 0, exhausted: 0 });
    const rows = await rowsOf(chain.qualification.id);
    expect(rows).toHaveLength(2);
    for (const row of rows) {
      expect(row.subjectId).toBe(chain.subject.id);
      expect(row.isAutoSelected).toBe(true);
      expect(eligibleIds).toContain(row.questionId);
      expect(ineligibleIds).not.toContain(row.questionId);
    }
    expect(new Set(rows.map((row) => row.questionId)).size).toBe(2);

    const again = await fillDailyQuestions({ now: NOW, qualificationIds: [chain.qualification.id] });
    expect(again).toMatchObject({ created: 0, alreadyScheduled: 2 });
    expect(await rowsOf(chain.qualification.id)).toHaveLength(2);

    // One more day uses the third question; a fourth day finds the pool exhausted (60-day reuse window).
    const later = await fillDailyQuestions({ now: NOW, dates: [addDays(TODAY, 2), addDays(TODAY, 3)], qualificationIds: [chain.qualification.id] });
    expect(later).toMatchObject({ created: 1, exhausted: 1 });
    expect(later.exhaustedScopes).toEqual([{ date: addDays(TODAY, 3), qualificationId: chain.qualification.id, subjectId: chain.subject.id }]);
    const all = await rowsOf(chain.qualification.id);
    expect(new Set(all.map((row) => row.questionId))).toEqual(new Set(eligibleIds));
  });

  it("skips hidden subjects and qualifications without an eligible pool", async () => {
    const hidden = await createCurriculumChain({ topicCount: 1, subtopicsPerTopic: 0, lessonsPerTopic: 0 });
    await dailyQuestion(contextOf(hidden), hidden.topics[0]?.id as string);
    await db.subject.update({ where: { id: hidden.subject.id }, data: { catalogueStatus: "HIDDEN" } });
    const empty = await createCurriculumChain({ topicCount: 1, subtopicsPerTopic: 0, lessonsPerTopic: 0 });
    const result = await fillDailyQuestions({ now: NOW, qualificationIds: [hidden.qualification.id, empty.qualification.id] });
    expect(result).toMatchObject({ scopes: 0, created: 0 });
    expect(await rowsOf(hidden.qualification.id)).toEqual([]);
    expect(await fillDailyQuestions({ now: NOW, qualificationIds: [] })).toMatchObject({ scopes: 0, created: 0 });
    await expect(fillDailyQuestions({ now: NOW, dates: ["2026-02-30"], qualificationIds: [empty.qualification.id] })).rejects.toThrow(RangeError);
  });
});

describe("admin daily-question calendar (integration)", () => {
  let chain: CurriculumChain;
  let editor: CmsActor;
  let questionIds: string[];
  let manualOnlyId: string;

  beforeAll(async () => {
    chain = await createCurriculumChain({ topicCount: 2, subtopicsPerTopic: 0, lessonsPerTopic: 0 });
    editor = await actorWith(["CONTENT_EDITOR"]);
    const context = contextOf(chain);
    const created = await Promise.all(chain.topics.map((topic) => dailyQuestion(context, topic.id)));
    questionIds = created.map((q) => q.id);
    // Not flagged: an editor may still choose it by hand (hard rules only).
    manualOnlyId = (await dailyQuestion(context, chain.topics[0]?.id as string, { isDailyEligible: false, difficulty: 4 })).id;
  });

  it("refuses staff without content.publish and students", async () => {
    const teacher = await actorWith(["TEACHER"]);
    await expect(getDailyQuestionCalendar(teacher, { qualificationId: chain.qualification.id })).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(scheduleDailyQuestion(teacher, { date: TOMORROW, qualificationId: chain.qualification.id, subjectId: chain.subject.id, questionId: manualOnlyId })).rejects.toMatchObject({
      code: "FORBIDDEN",
    });
  });

  it("shows 14 days per scope with pool sizes, overrides a day (audited) and keeps the override through the nightly fill", async () => {
    const before = await getDailyQuestionCalendar(editor, { qualificationId: chain.qualification.id, subjectId: chain.subject.id }, NOW);
    expect(before.qualification?.id).toBe(chain.qualification.id);
    expect(before.days).toHaveLength(14);
    expect(before.days[0]).toMatchObject({ date: TODAY, isToday: true, entry: null, canChange: true });
    expect(before.scopes.map((s) => s.subjectId)).toEqual([null, chain.subject.id]);
    expect(before.scope).toMatchObject({ subjectId: chain.subject.id, autoPoolSize: 2, filledAutomatically: true, scheduledDays: 0 });

    const page = await listDailyQuestionCandidates(editor, { date: TOMORROW, qualificationId: chain.qualification.id, subjectId: chain.subject.id, autoOnly: false }, NOW);
    expect(page.items.map((item) => item.id).sort()).toEqual([...questionIds, manualOnlyId].sort());
    expect(page.items.find((item) => item.id === manualOnlyId)).toMatchObject({ inAutoPool: false, lastScheduledOn: null });
    const autoOnly = await listDailyQuestionCandidates(editor, { date: TOMORROW, qualificationId: chain.qualification.id, subjectId: chain.subject.id }, NOW);
    expect(autoOnly.items.map((item) => item.id).sort()).toEqual([...questionIds].sort());

    const scheduled = await scheduleDailyQuestion(
      editor,
      { date: TOMORROW, qualificationId: chain.qualification.id, subjectId: chain.subject.id, questionId: manualOnlyId, reason: "Exam week" },
      null,
      NOW,
    );
    expect(scheduled).toMatchObject({ date: TOMORROW, questionId: manualOnlyId, replaced: false });
    const audit = await db.auditLog.findFirstOrThrow({ where: { entityType: "DailyQuestion", entityId: scheduled.id } });
    expect(audit).toMatchObject({ action: "daily_question.schedule", actorUserId: editor.userId, reason: "Exam week" });
    expect(audit.metadata).toMatchObject({ operation: "override", date: TOMORROW });

    const filled = await fillDailyQuestions({ now: NOW, qualificationIds: [chain.qualification.id] });
    expect(filled).toMatchObject({ created: 1, alreadyScheduled: 1 });
    const rows = await rowsOf(chain.qualification.id);
    expect(rows.find((row) => row.date === TOMORROW)).toMatchObject({ questionId: manualOnlyId, isAutoSelected: false });
    expect(rows.find((row) => row.date === TODAY)?.isAutoSelected).toBe(true);

    // Replacing an editor's choice keeps the row (same id) and records the previous question.
    const replaced = await scheduleDailyQuestion(editor, { date: TOMORROW, qualificationId: chain.qualification.id, subjectId: chain.subject.id, questionId: questionIds[1] }, null, NOW);
    expect(replaced).toMatchObject({ id: scheduled.id, replaced: true });
    const audits = await db.auditLog.findMany({ where: { entityType: "DailyQuestion", entityId: scheduled.id }, select: { before: true } });
    expect(audits).toHaveLength(2);
    expect(audits.map((entry) => entry.before)).toContainEqual({ questionId: manualOnlyId, isAutoSelected: false });

    const after = await getDailyQuestionCalendar(editor, { qualificationId: chain.qualification.id, subjectId: chain.subject.id }, NOW);
    expect(after.scope?.scheduledDays).toBe(2);
    expect(after.days[1]?.entry).toMatchObject({ isAutoSelected: false, attemptCount: 0, question: { id: questionIds[1], difficulty: 2 } });
  });

  it("validates days, scope and question rules", async () => {
    const base = { qualificationId: chain.qualification.id, subjectId: chain.subject.id };
    await expect(scheduleDailyQuestion(editor, { ...base, date: addDays(TODAY, -1), questionId: questionIds[0] }, null, NOW)).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(scheduleDailyQuestion(editor, { ...base, date: addDays(TODAY, 120), questionId: questionIds[0] }, null, NOW)).rejects.toMatchObject({ code: "VALIDATION" });
    const premium = await dailyQuestion(contextOf(chain), chain.topics[0]?.id as string, { accessTier: "PREMIUM" });
    await expect(scheduleDailyQuestion(editor, { ...base, date: addDays(TODAY, 5), questionId: premium.id }, null, NOW)).rejects.toMatchObject({
      code: "VALIDATION",
      fieldErrors: { questionId: expect.any(Array) },
    });
    const other = await createCurriculumChain({ topicCount: 1, subtopicsPerTopic: 0, lessonsPerTopic: 0 });
    const foreign = await dailyQuestion(contextOf(other), other.topics[0]?.id as string);
    await expect(scheduleDailyQuestion(editor, { ...base, date: addDays(TODAY, 5), questionId: foreign.id }, null, NOW)).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(scheduleDailyQuestion(editor, { ...base, subjectId: other.subject.id, date: addDays(TODAY, 5), questionId: foreign.id }, null, NOW)).rejects.toMatchObject({
      code: "NOT_FOUND",
    });
  });

  it("auto-picks an empty day (qualification-wide too), refuses a filled one, and clears a day", async () => {
    const day = addDays(TODAY, 6);
    const wide = await autoPickDailyQuestion(editor, { date: day, qualificationId: chain.qualification.id, subjectId: null }, null, NOW);
    expect(questionIds).toContain(wide.questionId);
    const wideRow = await db.dailyQuestion.findUniqueOrThrow({ where: { id: wide.id } });
    expect(wideRow).toMatchObject({ subjectId: null, isAutoSelected: true });
    await expect(autoPickDailyQuestion(editor, { date: day, qualificationId: chain.qualification.id, subjectId: null }, null, NOW)).rejects.toMatchObject({ code: "CONFLICT" });

    const cleared = await clearDailyQuestion(editor, { dailyQuestionId: wide.id, reason: "Wrong focus" }, null, NOW);
    expect(cleared).toEqual({ date: day, qualificationId: chain.qualification.id, subjectId: null });
    expect(await db.dailyQuestion.findUnique({ where: { id: wide.id } })).toBeNull();
    expect(await db.auditLog.count({ where: { entityType: "DailyQuestion", entityId: wide.id, action: "daily_question.clear" } })).toBe(1);
    await expect(clearDailyQuestion(editor, { dailyQuestionId: wide.id }, null, NOW)).rejects.toMatchObject({ code: "NOT_FOUND" });
  });

  it("freezes a day once a student has answered it, and never changes past days", async () => {
    const day = addDays(TODAY, 8);
    const picked = await scheduleDailyQuestion(editor, { date: day, qualificationId: chain.qualification.id, subjectId: chain.subject.id, questionId: questionIds[0] }, null, NOW);
    const { user: student } = await createUser({ roles: ["STUDENT"] });
    await db.assessmentAttempt.create({
      data: { userId: student.id, mode: "DAILY_QUESTION", subjectId: chain.subject.id, dailyQuestionId: picked.id, status: "IN_PROGRESS", config: {} },
    });
    await expect(
      scheduleDailyQuestion(editor, { date: day, qualificationId: chain.qualification.id, subjectId: chain.subject.id, questionId: questionIds[1] }, null, NOW),
    ).rejects.toMatchObject({ code: "CONFLICT" });
    await expect(clearDailyQuestion(editor, { dailyQuestionId: picked.id }, null, NOW)).rejects.toMatchObject({ code: "CONFLICT" });
    const calendar = await getDailyQuestionCalendar(editor, { qualificationId: chain.qualification.id, subjectId: chain.subject.id }, NOW);
    expect(calendar.days[8]).toMatchObject({ canChange: false, entry: { attemptCount: 1 } });

    const past = await db.dailyQuestion.create({
      data: { date: dateColumnFromLocalDate(addDays(TODAY, -2)), qualificationId: chain.qualification.id, subjectId: chain.subject.id, questionId: questionIds[1] as string },
    });
    await expect(clearDailyQuestion(editor, { dailyQuestionId: past.id }, null, NOW)).rejects.toMatchObject({ code: "CONFLICT" });
  });
});
