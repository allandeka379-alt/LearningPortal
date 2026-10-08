import { randomUUID } from "node:crypto";
import { beforeAll, describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { markQuestion } from "@/server/marking";
import { selectQuestions } from "@/server/adaptive/core";
import { toStudentView } from "@/lib/questions";
import { uniqueEmail } from "../../../tests/factories";
import { createQuestion, createQuestionContext, type CreatedQuestion, type QuestionContext } from "../../../tests/factories/questions";
import { candidatePool, getQuestionsForAttempt } from "./repository";

/** A minimal account (User_contact_required_chk: an email, a phone or a username with a password). */
async function createUser(): Promise<string> {
  return (await db.user.create({ data: { emailNormalized: uniqueEmail("questions") }, select: { id: true } })).id;
}

describe("getQuestionsForAttempt (integration)", () => {
  let context: QuestionContext;
  let mcq: CreatedQuestion;
  let structured: CreatedQuestion;
  let draft: CreatedQuestion;

  beforeAll(async () => {
    context = await createQuestionContext();
    mcq = await createQuestion("MULTIPLE_CHOICE", { context });
    structured = await createQuestion("STRUCTURED", { context, topicId: context.topicIds[1] });
    draft = await createQuestion("NUMERICAL", { context, status: "DRAFT" });
  });

  it("loads published roots in the requested order with options, parts and revision", async () => {
    const [first, second] = await getQuestionsForAttempt([structured.id, mcq.id], { syllabusId: context.syllabusId });
    expect(first).toMatchObject({ id: structured.id, type: "STRUCTURED", revision: 1, marks: 3, primaryTopicId: context.topicIds[1] });
    expect(first?.parts.map((p) => [p.partLabel, p.type, p.marks])).toEqual([
      ["(a)", "SHORT_ANSWER", 1],
      ["(b)", "NUMERICAL", 2],
    ]);
    expect(second).toMatchObject({ id: mcq.id, subjectId: context.subjectId, accessTier: "FREE", primaryTopicId: context.topicIds[0] });
    expect(second?.options.map((o) => [o.key, o.isCorrect])).toEqual([
      ["A", true],
      ["B", false],
      ["C", false],
      ["D", false],
    ]);
  });

  it("returns rows that the marker and the student view consume directly", async () => {
    const [q] = await getQuestionsForAttempt([structured.id]);
    if (!q) throw new Error("missing question");
    const result = markQuestion(q, {
      type: "STRUCTURED",
      parts: [
        { partId: structured.partIds[0], text: "x(x+3)" },
        { partId: structured.partIds[1], value: "5" },
      ],
    });
    expect(result).toMatchObject({ status: "MARKED", marksAwarded: 3 });
    expect(JSON.stringify(toStudentView(q))).not.toContain("answerSpec");
  });

  it("omits drafts, parts, unknown ids and duplicates", async () => {
    const rows = await getQuestionsForAttempt([draft.id, structured.partIds[0]!, randomUUID(), mcq.id, mcq.id]);
    expect(rows.map((r) => r.id)).toEqual([mcq.id]);
    expect(await getQuestionsForAttempt([])).toEqual([]);
  });

  it("resolves the most recent primary tag without a syllabus", async () => {
    const [q] = await getQuestionsForAttempt([mcq.id]);
    expect(q?.primaryTopicId).toBe(context.topicIds[0]);
  });

  it("keeps private questions out unless the caller's tenancy includes them", async () => {
    const tutor = await createUser();
    const own = await createQuestion("TRUE_FALSE", { context, ownerUserId: tutor });
    expect(await getQuestionsForAttempt([own.id])).toEqual([]);
    expect(await getQuestionsForAttempt([own.id], { tenancy: { ownerUserIds: [randomUUID()] } })).toEqual([]);
    expect((await getQuestionsForAttempt([own.id], { tenancy: { ownerUserIds: [tutor] } })).map((r) => r.id)).toEqual([own.id]);
  });

  it("validates its input", async () => {
    await expect(getQuestionsForAttempt(["not-a-uuid"])).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(getQuestionsForAttempt(Array.from({ length: 501 }, () => randomUUID()))).rejects.toMatchObject({ code: "VALIDATION" });
  });
});

describe("candidatePool (integration)", () => {
  let context: QuestionContext;
  const ids: Record<string, string> = {};

  beforeAll(async () => {
    context = await createQuestionContext({ topics: 3 });
    const [t1, t2] = context.topicIds as [string, string, string];
    ids.easy = (await createQuestion("MULTIPLE_CHOICE", { context, topicId: t1, difficulty: 1, accessTier: "PUBLIC" })).id;
    ids.medium = (await createQuestion("NUMERICAL", { context, topicId: t1, difficulty: 3, isExamStyle: true })).id;
    ids.hard = (await createQuestion("SHORT_ANSWER", { context, topicId: t2, difficulty: 5, accessTier: "PREMIUM" })).id;
    ids.draft = (await createQuestion("TRUE_FALSE", { context, topicId: t1, status: "DRAFT" })).id;
    // A question tagged to two topics appears once, under its primary tag.
    const multi = await createQuestion("MATCHING", { context, topicId: t2, difficulty: 2 });
    ids.multi = multi.id;
    await db.questionTopic.create({ data: { questionId: multi.id, topicId: t1, syllabusId: context.syllabusId, subjectId: context.subjectId, isPrimary: false } });
  });

  const pool = (extra: Partial<Parameters<typeof candidatePool>[0]> = {}) =>
    candidatePool({ subjectId: context.subjectId, syllabusId: context.syllabusId, limit: 100, seed: "s", ...extra });

  it("returns published root questions of the subject once each, in the adaptive engine's shape", async () => {
    const rows = await pool();
    expect(rows.map((r) => r.id).sort()).toEqual([ids.easy, ids.medium, ids.hard, ids.multi].sort());
    const medium = rows.find((r) => r.id === ids.medium);
    expect(medium).toEqual({ id: ids.medium, topicId: context.topicIds[0], difficulty: 3, marks: 1, type: "NUMERICAL", isExamLevel: true, timesSeen: 0, lastSeenAt: null });
    expect(rows.find((r) => r.id === ids.multi)?.topicId).toBe(context.topicIds[1]);
  });

  it("filters by topics, difficulty, types, access tier and exclusions", async () => {
    const [t1] = context.topicIds as [string];
    expect((await pool({ topicIds: [t1] })).map((r) => r.id).sort()).toEqual([ids.easy, ids.medium, ids.multi].sort());
    // Restricted to a topic, a multi-tagged question is filed under the topic that qualifies.
    expect((await pool({ topicIds: [t1] })).find((r) => r.id === ids.multi)?.topicId).toBe(t1);
    expect((await pool({ difficultyRange: { min: 2, max: 4 } })).map((r) => r.id).sort()).toEqual([ids.medium, ids.multi].sort());
    expect((await pool({ types: ["SHORT_ANSWER", "NUMERICAL"] })).map((r) => r.id).sort()).toEqual([ids.medium, ids.hard].sort());
    expect((await pool({ accessTier: "PUBLIC" })).map((r) => r.id)).toEqual([ids.easy]);
    expect((await pool({ accessTier: "FREE" })).map((r) => r.id).sort()).toEqual([ids.easy, ids.medium, ids.multi].sort());
    expect((await pool({ excludeIds: [ids.easy!, ids.medium!] })).map((r) => r.id).sort()).toEqual([ids.hard, ids.multi].sort());
    expect(await pool({ topicIds: [] })).toEqual([]);
    expect(await pool({ types: [] })).toEqual([]);
  });

  it("samples deterministically per seed when the pool exceeds the limit", async () => {
    const a = await pool({ limit: 2, seed: "alpha" });
    expect(a).toHaveLength(2);
    expect(await pool({ limit: 2, seed: "alpha" })).toEqual(a);
  });

  it("never returns another tenant's questions unless asked", async () => {
    const tutor = await createUser();
    const own = await createQuestion("TRUE_FALSE", { context, ownerUserId: tutor });
    expect((await pool()).some((r) => r.id === own.id)).toBe(false);
    expect((await pool({ tenancy: { ownerUserIds: [tutor] } })).some((r) => r.id === own.id)).toBe(true);
  });

  it("fills timesSeen / lastSeenAt from the student's own attempts", async () => {
    const userId = await createUser();
    const attempt = await db.assessmentAttempt.create({ data: { userId, subjectId: context.subjectId, mode: "PRACTICE", config: {} }, select: { id: true } });
    const seenAt = new Date("2026-10-01T08:00:00Z");
    for (const [position, createdAt] of [
      [1, new Date("2026-09-30T08:00:00Z")],
      [2, seenAt],
    ] as const) {
      await db.questionAttempt.create({
        data: {
          attemptId: attempt.id,
          userId,
          subjectId: context.subjectId,
          topicId: context.topicIds[0]!,
          questionId: ids.medium!,
          questionRevision: 1,
          position,
          difficulty: 3,
          marksAvailable: 1,
          createdAt,
        },
      });
    }
    const rows = await pool({ userId });
    expect(rows.find((r) => r.id === ids.medium)).toMatchObject({ timesSeen: 2, lastSeenAt: seenAt });
    expect(rows.find((r) => r.id === ids.easy)).toMatchObject({ timesSeen: 0, lastSeenAt: null });
    // The other student's history is not visible.
    expect((await pool({ userId: await createUser() })).find((r) => r.id === ids.medium)?.timesSeen).toBe(0);
  });

  it("feeds selectQuestions directly", async () => {
    const rows = await pool();
    const selection = selectQuestions({ pool: rows, mastery: new Map(), request: { count: 3, difficulty: "adaptive" }, seed: 1, now: new Date("2026-10-05T10:00:00Z") });
    expect(selection.items.length).toBeGreaterThan(0);
    expect(selection.items.every((i) => rows.some((r) => r.id === i.questionId))).toBe(true);
  });

  it("validates its input", async () => {
    await expect(candidatePool({ subjectId: "x", limit: 10 })).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(pool({ limit: 0 })).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(pool({ limit: 5_000 })).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(pool({ difficultyRange: { min: 4, max: 2 } })).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(pool({ types: ["ESSAYS" as never] })).rejects.toMatchObject({ code: "VALIDATION" });
  });
});
