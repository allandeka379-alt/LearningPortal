import { describe, expect, it } from "vitest";
import type { TopicKind } from "@/generated/prisma/client";
import {
  assignLessonsToUnits,
  buildWeek,
  createPlanSchema,
  defaultExamDate,
  itemReason,
  matchPlanProgress,
  planningUnits,
  readAvailability,
  resolveWeekStart,
  type MatchableItem,
  type PlanItemView,
  type ProgressEvidence,
  type UnitTopic,
} from "./service";

/** Pure parts of the study-plan service (CLAUDE.md rule 2). The database paths are in service.integration.test.ts. */

function topic(id: string, kind: TopicKind, parent: UnitTopic | null): UnitTopic {
  return { id, kind, parentId: parent?.id ?? null, path: parent ? `${parent.path}/${id}` : id };
}

describe("planningUnits", () => {
  const algebra = topic("algebra", "TOPIC", null);
  const linear = topic("linear", "SUBTOPIC", algebra);
  const quadratics = topic("quadratics", "SUBTOPIC", algebra);
  const geometry = topic("geometry", "TOPIC", null);
  const circles = topic("circles", "SUBTOPIC", geometry);
  const tree = [algebra, linear, quadratics, geometry, circles];

  it("plans TOPIC-kind nodes that hold an in-scope leaf, in tree order", () => {
    const units = planningUnits(tree, new Set(["linear", "circles"]));
    expect(units.unitIds).toEqual(["algebra", "geometry"]);
    expect(units.unitOf.get("quadratics")).toBe("algebra");
    expect(units.unitOf.get("geometry")).toBe("geometry");
  });

  it("leaves out topics whose leaves are all out of scope (route, optional choice, exam year)", () => {
    expect(planningUnits(tree, new Set(["circles"])).unitIds).toEqual(["geometry"]);
    expect(planningUnits(tree, new Set()).unitIds).toEqual([]);
  });

  it("maps sections above topic level to no unit, and plans roots in a tree without TOPIC nodes", () => {
    const paper = topic("paper1", "SECTION", null);
    const number = topic("number", "TOPIC", paper);
    const fractions = topic("fractions", "SUBTOPIC", number);
    const loose = topic("loose", "SUBTOPIC", paper);
    const units = planningUnits([paper, number, fractions, loose], new Set(["fractions", "loose"]));
    expect(units.unitIds).toEqual(["number", "loose"]);
    expect(units.unitOf.has("paper1")).toBe(false);

    const rootA = topic("a", "SECTION", null);
    const leafA = topic("a1", "SUBTOPIC", rootA);
    const rootB = topic("b", "SECTION", null);
    expect(planningUnits([rootA, leafA, rootB], new Set(["a1", "b"])).unitIds).toEqual(["a", "b"]);
  });
});

describe("assignLessonsToUnits", () => {
  const paper = topic("paper", "SECTION", null);
  const algebra = topic("algebra", "TOPIC", paper);
  const linear = topic("linear", "SUBTOPIC", algebra);
  const geometry = topic("geometry", "TOPIC", paper);
  const tree = [paper, algebra, linear, geometry];
  const units = planningUnits(tree, new Set(["linear", "geometry"]));

  it("orders lessons by unit, then topic, then lesson order, and plans each lesson once", () => {
    const lessons = assignLessonsToUnits(tree, units, [
      { topicId: "geometry", lessonId: "g1", sortOrder: 0, minutes: 15 },
      { topicId: "linear", lessonId: "l2", sortOrder: 1, minutes: 10 },
      { topicId: "algebra", lessonId: "a1", sortOrder: 0, minutes: 20 },
      { topicId: "linear", lessonId: "l1", sortOrder: 0, minutes: 10 },
      { topicId: "geometry", lessonId: "l1", sortOrder: 2, minutes: 10 },
    ]);
    expect(lessons.get("algebra")?.map((l) => l.lessonId)).toEqual(["a1", "l1", "l2"]);
    expect(lessons.get("geometry")).toEqual([{ lessonId: "g1", minutes: 15 }]);
  });

  it("gives a lesson tagged at section level to the first unit under that section", () => {
    const lessons = assignLessonsToUnits(tree, units, [{ topicId: "paper", lessonId: "intro", sortOrder: 0, minutes: 5 }]);
    expect(lessons.get("algebra")).toEqual([{ lessonId: "intro", minutes: 5 }]);
  });
});

describe("itemReason", () => {
  it("maps planner reasons to the stored reason with the facts behind them", () => {
    expect(itemReason({ reason: "WEAK_TOPIC_PRACTICE", date: "2026-10-05" }, 32.04, "2026-11-04")).toEqual({
      reason: "WEAK_TOPIC",
      reasonData: { plannerReason: "WEAK_TOPIC_PRACTICE", masteryScore: 32, band: "WEAK", daysToExam: 30 },
    });
    expect(itemReason({ reason: "MOCK_EXAM_CADENCE", date: "2026-10-05" }, null, null)).toEqual({
      reason: "EXAM_PREPARATION",
      reasonData: { plannerReason: "MOCK_EXAM_CADENCE" },
    });
    expect(itemReason({ reason: "NEXT_LESSON", date: "2026-10-05" }, 80, null).reason).toBe("NEW_TOPIC");
  });

  it("calls extra practice on a weak topic weak-topic work, otherwise maintenance", () => {
    expect(itemReason({ reason: "EXTRA_PRACTICE", date: "2026-10-05" }, 45, null).reason).toBe("WEAK_TOPIC");
    expect(itemReason({ reason: "EXTRA_PRACTICE", date: "2026-10-05" }, 82, null).reason).toBe("MAINTENANCE");
  });
});

describe("matchPlanProgress", () => {
  const planned = new Date("2026-10-05T05:00:00.000Z");
  const now = new Date("2026-10-05T16:00:00.000Z");
  const base: Omit<MatchableItem, "id" | "activityType"> = {
    date: "2026-10-05",
    sortOrder: 0,
    subjectId: "maths",
    topicId: "algebra",
    lessonId: null,
    status: "PENDING",
    targetQuestions: 4,
    completedQuestions: 0,
    createdAt: planned,
  };
  const none: ProgressEvidence = { questions: [], attempts: [], lessons: [], flashcardDates: new Set() };
  const answer = (minute: number, overrides: Partial<ProgressEvidence["questions"][number]> = {}) => ({
    subjectId: "maths",
    date: "2026-10-05",
    at: new Date(planned.getTime() + minute * 60_000),
    kind: "PRACTICE" as const,
    topicIds: ["algebra", "linear"],
    ...overrides,
  });
  const options = { questionDates: new Set(["2026-10-05"]), now };

  it("credits practice answered that day in the item's topic: PARTIAL below the target, DONE at it", () => {
    const item: MatchableItem = { ...base, id: "p1", activityType: "PRACTICE" };
    expect(matchPlanProgress([item], { ...none, questions: [answer(1), answer(2)] }, options)).toEqual([
      { id: "p1", status: "PARTIAL", completedQuestions: 2, completedAt: null },
    ]);
    const done = matchPlanProgress([item], { ...none, questions: [answer(1), answer(2), answer(3), answer(9)] }, options);
    expect(done).toEqual([{ id: "p1", status: "DONE", completedQuestions: 4, completedAt: new Date(planned.getTime() + 9 * 60_000) }]);
  });

  it("ignores answers from another topic, subject or day, and answers given before the item was planned", () => {
    const item: MatchableItem = { ...base, id: "p1", activityType: "PRACTICE" };
    const evidence = {
      ...none,
      questions: [
        answer(1, { topicIds: ["geometry"] }),
        answer(2, { subjectId: "physics" }),
        answer(3, { date: "2026-10-04" }),
        answer(-30),
      ],
    };
    expect(matchPlanProgress([item], evidence, options)).toEqual([]);
  });

  it("counts each answer once, re-test answers going to review items first", () => {
    const review: MatchableItem = { ...base, id: "r1", activityType: "REVIEW", targetQuestions: 2 };
    const practice: MatchableItem = { ...base, id: "p1", activityType: "PRACTICE", sortOrder: 1, targetQuestions: 2 };
    const evidence = { ...none, questions: [answer(1), answer(2, { kind: "REVIEW" }), answer(3, { kind: "REVIEW" }), answer(4)] };
    const updates = matchPlanProgress([practice, review], evidence, options);
    expect(updates).toEqual([
      { id: "r1", status: "DONE", completedQuestions: 2, completedAt: new Date(planned.getTime() + 3 * 60_000) },
      { id: "p1", status: "DONE", completedQuestions: 2, completedAt: new Date(planned.getTime() + 4 * 60_000) },
    ]);
  });

  it("never touches skipped items and never moves a done item back", () => {
    const skipped: MatchableItem = { ...base, id: "s1", activityType: "PRACTICE", status: "SKIPPED" };
    const done: MatchableItem = { ...base, id: "d1", activityType: "PRACTICE", status: "DONE", completedQuestions: 4 };
    expect(matchPlanProgress([skipped, done], { ...none, questions: [answer(1)] }, options)).toEqual([]);
  });

  it("completes lesson items when the lesson is completed (even ahead of its day), PARTIAL when opened that day", () => {
    const ahead: MatchableItem = { ...base, id: "l1", activityType: "LESSON", lessonId: "lesson-1", date: "2026-10-08", targetQuestions: null };
    const today: MatchableItem = { ...base, id: "l2", activityType: "LESSON", lessonId: "lesson-2", targetQuestions: null };
    const completedAt = new Date("2026-10-05T10:00:00.000Z");
    const updates = matchPlanProgress(
      [ahead, today],
      {
        ...none,
        lessons: [
          { lessonId: "lesson-1", completedAt, viewedOn: "2026-10-05" },
          { lessonId: "lesson-2", completedAt: null, viewedOn: "2026-10-05" },
        ],
      },
      options,
    );
    expect(updates).toEqual([
      { id: "l2", status: "PARTIAL", completedQuestions: 0, completedAt: null },
      { id: "l1", status: "DONE", completedQuestions: 0, completedAt },
    ]);
  });

  it("gives each submitted mock to one item (done items consume first) and marks an open mock PARTIAL", () => {
    const mockBase = { ...base, activityType: "MOCK_EXAM" as const, topicId: null, targetQuestions: null, createdAt: new Date("2026-10-01T00:00:00.000Z") };
    const earlier: MatchableItem = { ...mockBase, id: "m1", date: "2026-10-03", status: "DONE" };
    const later: MatchableItem = { ...mockBase, id: "m2", date: "2026-10-10" };
    const submittedAt = new Date("2026-10-03T12:00:00.000Z");
    const attempt = { id: "a1", subjectId: "maths", mode: "MOCK_EXAM" as const, closed: true, at: submittedAt, date: "2026-10-03" };
    expect(matchPlanProgress([earlier, later], { ...none, attempts: [attempt] }, options)).toEqual([]);

    const second = { ...attempt, id: "a2", at: new Date("2026-10-05T09:00:00.000Z"), date: "2026-10-05" };
    expect(matchPlanProgress([earlier, later], { ...none, attempts: [attempt, second] }, options)).toEqual([
      { id: "m2", status: "DONE", completedQuestions: 0, completedAt: second.at },
    ]);

    const todayMock: MatchableItem = { ...mockBase, id: "m3" };
    const open = { ...second, id: "a3", closed: false };
    expect(matchPlanProgress([todayMock], { ...none, attempts: [open] }, options)).toEqual([
      { id: "m3", status: "PARTIAL", completedQuestions: 0, completedAt: null },
    ]);
  });

  it("completes a missed diagnostic done late but before its day ended, and flashcards on a day with reviews", () => {
    const diagnostic: MatchableItem = { ...base, id: "dg", activityType: "DIAGNOSTIC", topicId: null, status: "MISSED", targetQuestions: null };
    const cards: MatchableItem = { ...base, id: "fc", activityType: "FLASHCARDS", topicId: null, targetQuestions: null, sortOrder: 1 };
    const at = new Date("2026-10-05T20:00:00.000Z");
    const updates = matchPlanProgress(
      [diagnostic, cards],
      { ...none, attempts: [{ id: "x", subjectId: "maths", mode: "DIAGNOSTIC", closed: true, at, date: "2026-10-05" }], flashcardDates: new Set(["2026-10-05"]) },
      options,
    );
    expect(updates).toEqual([
      { id: "dg", status: "DONE", completedQuestions: 0, completedAt: at },
      { id: "fc", status: "DONE", completedQuestions: 0, completedAt: now },
    ]);
  });

  it("is idempotent: matching again with the same evidence changes nothing", () => {
    const item: MatchableItem = { ...base, id: "p1", activityType: "PRACTICE" };
    const evidence = { ...none, questions: [answer(1), answer(2)] };
    const [first] = matchPlanProgress([item], evidence, options);
    expect(first?.status).toBe("PARTIAL");
    const after: MatchableItem = { ...item, status: "PARTIAL", completedQuestions: first?.completedQuestions ?? 0 };
    expect(matchPlanProgress([after], evidence, options)).toEqual([]);
  });
});

describe("defaultExamDate", () => {
  const session = (id: string, startsOn: string) => ({ id, name: `Session ${id}`, startsOn: new Date(`${startsOn}T00:00:00.000Z`), isProvisional: true, isDemo: false });

  it("picks the earliest upcoming target session of the subjects, else the onboarding target", () => {
    const today = "2026-10-05";
    expect(defaultExamDate([session("b", "2027-06-01"), session("a", "2026-11-02"), null], null, today)).toMatchObject({
      date: "2026-11-02",
      source: "TARGET_SESSION",
      session: { id: "a" },
    });
    expect(defaultExamDate([session("old", "2026-10-05")], session("s", "2027-11-01"), today)).toMatchObject({ date: "2027-11-01", source: "STUDENT_TARGET" });
    expect(defaultExamDate([session("old", "2026-09-01")], session("past", "2026-10-01"), today)).toBeNull();
  });
});

describe("week helpers", () => {
  it("resolves any day to its Monday and falls back to this week", () => {
    expect(resolveWeekStart("2026-10-08", "2026-10-05")).toBe("2026-10-05");
    expect(resolveWeekStart("not-a-date", "2026-10-07")).toBe("2026-10-05");
    expect(resolveWeekStart(undefined, "2026-10-11")).toBe("2026-10-05");
  });

  it("builds seven days with planned / done minutes and week navigation inside the plan", () => {
    const item = (id: string, date: string, minutes: number, status: PlanItemView["status"]): PlanItemView => ({
      id,
      date,
      sortOrder: 0,
      subjectId: "s",
      subjectName: "Mathematics",
      topicId: null,
      topicName: null,
      lessonId: null,
      lessonTitle: null,
      assessmentId: null,
      assessmentTitle: null,
      activityType: "PRACTICE",
      reason: "WEAK_TOPIC",
      plannerReason: "WEAK_TOPIC_PRACTICE",
      masteryScore: 30,
      daysToExam: null,
      targetMinutes: minutes,
      targetQuestions: 10,
      completedQuestions: 0,
      status,
      completedAt: null,
    });
    const availability = { mon: 60, tue: 45, wed: 0, thu: 30, fri: 30, sat: 90, sun: 30 };
    const week = buildWeek({
      weekStart: "2026-10-07",
      today: "2026-10-07",
      items: [item("a", "2026-10-07", 20, "DONE"), item("b", "2026-10-07", 25, "PENDING"), item("c", "2026-10-13", 30, "PENDING")],
      availability,
      planStart: "2026-10-07",
      planEnd: "2026-11-03",
    });
    expect(week.weekStart).toBe("2026-10-05");
    expect(week.days.map((d) => d.date)).toEqual(["2026-10-05", "2026-10-06", "2026-10-07", "2026-10-08", "2026-10-09", "2026-10-10", "2026-10-11"]);
    expect(week.days[2]).toMatchObject({ isToday: true, isPast: false, inPlan: true, availableMinutes: 0, plannedMinutes: 45, doneMinutes: 20 });
    expect(week.days[0]).toMatchObject({ isPast: true, inPlan: false, availableMinutes: 60, plannedMinutes: 0 });
    expect(week.previousWeekStart).toBeNull();
    expect(week.nextWeekStart).toBe("2026-10-12");
  });
});

describe("input validation", () => {
  const availability = { mon: 30, tue: 30, wed: 30, thu: 30, fri: 30, sat: 60, sun: 0 };

  it("accepts whole minutes per weekday within the daily cap", () => {
    expect(createPlanSchema.safeParse({ availability }).success).toBe(true);
    expect(createPlanSchema.safeParse({ availability, examDate: "2027-11-01", subjectIds: ["0199a1d2-0000-7000-8000-000000000001"] }).success).toBe(true);
  });

  it("rejects a week without study time, negative or fractional minutes, too many minutes and bad dates", () => {
    const zero = createPlanSchema.safeParse({ availability: { ...availability, mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0 } });
    expect(zero.success).toBe(false);
    expect(zero.error?.issues[0]?.path).toEqual(["availability"]);
    expect(createPlanSchema.safeParse({ availability: { ...availability, mon: -5 } }).success).toBe(false);
    expect(createPlanSchema.safeParse({ availability: { ...availability, mon: 12.5 } }).success).toBe(false);
    expect(createPlanSchema.safeParse({ availability: { ...availability, mon: 601 } }).success).toBe(false);
    expect(createPlanSchema.safeParse({ availability, examDate: "2027-02-30" }).success).toBe(false);
    expect(createPlanSchema.safeParse({ availability, subjectIds: [] }).success).toBe(false);
  });

  it("reads stored availability defensively", () => {
    expect(readAvailability({ mon: 45, tue: "x", wed: 30.4, thu: -1, fri: 999, sat: 60 })).toEqual({
      mon: 45,
      tue: 0,
      wed: 30,
      thu: 0,
      fri: 600,
      sat: 60,
      sun: 0,
    });
    expect(readAvailability(null).mon).toBe(0);
  });
});
