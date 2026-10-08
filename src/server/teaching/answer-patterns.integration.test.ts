import { beforeAll, describe, expect, it } from "vitest";
import { checkSafePattern, MAX_QUESTION_PATTERN_PROGRAM_SIZE, MAX_SPEC_PATTERN_PROGRAM_SIZE, PATTERN_SUBJECT_LIMIT } from "@/lib/questions";
import { saveResponse, submitAttempt } from "@/server/attempts";
import { db } from "@/server/db";
import type { TeachingActor } from "./access";
import { createAssignment } from "./assignments";
import { joinClassByCode, startAssignmentWork } from "./student";
import { createTeacherQuestion, createTeacherTest, publishTeacherTest } from "./test-builder";
import { expectCode, harareLocal, makeClass, makeStudent, makeTeacher, teachingWorld, type TeachingWorld } from "./testing";

/**
 * INJ-1 regression (ReDoS through answer patterns). A self-registered tutor writes SHORT_ANSWER patterns that pass the
 * grammar; a second free account joins the tutor's class and submits a 200-character answer. Marking runs inside the
 * submit request, so patterns that backtrack for about a second each used to block the whole Node process (every
 * tenant) for seconds per pattern. Now the reported patterns are refused when written, the matching work of a question
 * is budgeted, and accepted patterns are matched in linear time.
 */

/** Reported patterns: about 1.4 s each in V8's backtracking engine on a 200-character answer. */
const REPORTED = ["^.{0,99}.{0,99}.{0,99}.{0,19}x$", "^.{0,99}.{0,99}.{0,99}.{0,19}y$", "^.{0,99}.{0,99}.{0,99}.{0,19}z$"];
/** Still accepted (482 instructions each, 4 fit one spec), and about 1 s each in a backtracking engine. */
const HEAVY = ["v", "w", "x", "y"].map((last) => `^.{0,60}.{0,60}.{0,60}.{0,60}${last}$`);

let world: TeachingWorld;

beforeAll(async () => {
  world = await teachingWorld();
});

function shortAnswer(patterns: readonly string[]) {
  return { type: "SHORT_ANSWER", markingMode: "AUTO", payload: null, answerSpec: { accepted: [{ value: "ok" }], patterns }, marks: 1, options: [] };
}

function tutorQuestion(overrides: Record<string, unknown>) {
  return {
    owner: { kind: "tutor" },
    subjectId: world.setup.subjectId,
    topicId: world.setup.topicIds[0],
    stem: "Type the answer.",
    difficulty: 1,
    rightsConfirmed: true,
    ...overrides,
  };
}

/** Publishes a one-question tutor test, assigns it to a fresh tutor class and returns a joined student's attempt. */
async function assignedAttempt(tutor: TeachingActor, questionId: string, cls: { id: string; joinCode: string }) {
  const test = await createTeacherTest(tutor, { owner: { kind: "tutor" }, subjectId: world.setup.subjectId, title: "Patterns", kind: "QUIZ", feedbackTiming: "AFTER_SUBMIT", items: [{ questionId, marks: null }] });
  await publishTeacherTest(tutor, { assessmentId: test.id });
  const assignment = await createAssignment(tutor, { classId: cls.id, type: "ASSESSMENT", title: "Pattern quiz", assessmentId: test.id, dueAt: harareLocal(new Date(Date.now() + 2 * 86_400_000)) });
  return async () => {
    const student = await makeStudent();
    await joinClassByCode(student.actor, { code: cls.joinCode });
    const { href } = await startAssignmentWork(student.actor, { assignmentId: assignment.id });
    const attemptId = href.split("/").pop() as string;
    const [slot] = await db.questionAttempt.findMany({ where: { attemptId }, select: { position: true } });
    return { student, attemptId, position: slot!.position };
  };
}

/** Runs `work` while measuring the longest gap between timer callbacks (how long the event loop was blocked). */
async function longestStall(work: () => Promise<unknown>): Promise<number> {
  let last = performance.now();
  let longest = 0;
  const timer = setInterval(() => {
    const now = performance.now();
    longest = Math.max(longest, now - last);
    last = now;
  }, 10);
  try {
    await work();
  } finally {
    clearInterval(timer);
  }
  return Math.max(longest, performance.now() - last);
}

describe("answer patterns written by self-service teachers (ReDoS)", () => {
  it("refuses the reported patterns and over-budget questions when they are written", async () => {
    const tutor = await makeTeacher();
    await expectCode(createTeacherQuestion(tutor, tutorQuestion(shortAnswer(REPORTED))), "VALIDATION");
    // Accepted one by one, but a structured question may not add up more matching work than its budget.
    expect(HEAVY.every((p) => checkSafePattern(p).ok)).toBe(true);
    const perPart = HEAVY.reduce((sum, p) => sum + (checkSafePattern(p) as { size: number }).size, 0);
    expect(perPart).toBeLessThanOrEqual(MAX_SPEC_PATTERN_PROGRAM_SIZE);
    const partCount = Math.floor(MAX_QUESTION_PATTERN_PROGRAM_SIZE / perPart) + 1;
    const parts = Array.from({ length: partCount }, (_, i) => ({ partLabel: `(${i + 1})`, stem: "Type the answer.", ...shortAnswer(HEAVY) }));
    await expectCode(createTeacherQuestion(tutor, tutorQuestion({ type: "STRUCTURED", markingMode: "AUTO", payload: null, answerSpec: null, marks: 1, options: [], parts })), "VALIDATION");
    expect(await db.question.count({ where: { ownerUserId: tutor.userId } })).toBe(0);
  });

  it("marks accepted heavy patterns on a hostile answer without blocking the process", async () => {
    const tutor = await makeTeacher();
    const { id } = await createTeacherQuestion(tutor, tutorQuestion(shortAnswer(HEAVY)));
    const cls = await makeClass({ teacher: tutor, schoolId: null, subjectId: world.setup.subjectId });
    const newAttempt = await assignedAttempt(tutor, id, cls);

    const attacker = await newAttempt();
    await saveResponse(attacker.student.actor, attacker.attemptId, attacker.position, { type: "SHORT_ANSWER", text: "a".repeat(PATTERN_SUBJECT_LIMIT) });
    const stall = await longestStall(() => submitAttempt(attacker.student.actor, attacker.attemptId));
    // Before: ~1 s of uninterruptible backtracking per pattern (≥ 4 s here). Now: milliseconds of linear matching.
    expect(stall).toBeLessThan(1_000);
    expect(await db.questionAttempt.findFirstOrThrow({ where: { attemptId: attacker.attemptId }, select: { markingStatus: true, marksAwarded: true } })).toEqual({
      markingStatus: "AUTO_MARKED",
      marksAwarded: 0,
    });

    // The same patterns still credit a matching answer (case-insensitive by default).
    const honest = await newAttempt();
    await saveResponse(honest.student.actor, honest.attemptId, honest.position, { type: "SHORT_ANSWER", text: `${"a".repeat(PATTERN_SUBJECT_LIMIT - 1)}W` });
    await submitAttempt(honest.student.actor, honest.attemptId);
    expect(await db.questionAttempt.findFirstOrThrow({ where: { attemptId: honest.attemptId }, select: { markingStatus: true, marksAwarded: true } })).toEqual({
      markingStatus: "AUTO_MARKED",
      marksAwarded: 1,
    });
  });
});
