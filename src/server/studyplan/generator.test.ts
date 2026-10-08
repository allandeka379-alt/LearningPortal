import { describe, expect, it } from "vitest";
import { addDays, daysBetween, type LocalDate } from "@/lib/dates";
import { createRng } from "@/server/adaptive/core";
import {
  adaptPlan,
  dailyTarget,
  generatePlan,
  plannedMinutesOn,
  weekdayKey,
  type ExistingPlanItem,
  type PlanInput,
  type PlanItem,
  type PlanSubject,
  type PlanTopic,
  type WeeklyAvailability,
} from "./generator";

const TODAY = "2026-10-05"; // Monday
const TZ = "Africa/Harare";
const EVERY_DAY = (minutes: number): WeeklyAvailability => ({ mon: minutes, tue: minutes, wed: minutes, thu: minutes, fri: minutes, sat: minutes, sun: minutes });
const WEEK: WeeklyAvailability = { mon: 45, tue: 75, wed: 45, thu: 60, fri: 30, sat: 120, sun: 0 };

const lessons = (prefix: string, n: number, minutes = 25) => Array.from({ length: n }, (_, i) => ({ lessonId: `${prefix}-L${i + 1}`, minutes }));
const topic = (topicId: string, mastery: number | null, lessonCount = 0, overrides: Partial<PlanTopic> = {}): PlanTopic => ({
  topicId,
  mastery,
  lessonsRemaining: lessons(topicId, lessonCount),
  estimatedPracticeMinutes: 20,
  ...overrides,
});

const MATHS: PlanSubject = {
  subjectId: "maths",
  hasFlashcards: true,
  topics: [topic("algebra", 82), topic("stats", 41, 1), topic("calc", 32, 2), topic("vectors", null, 2)],
};
const PHYSICS: PlanSubject = { subjectId: "physics", topics: [topic("mech", 70, 1), topic("waves", null, 2)] };
const CHEM: PlanSubject = { subjectId: "chem", topics: [topic("organic", null, 3)] };

function plan(overrides: Partial<PlanInput> = {}) {
  return generatePlan({ today: TODAY, examDate: "2026-11-30", timeZone: TZ, availability: WEEK, subjects: [MATHS, PHYSICS, CHEM], seed: 7, ...overrides });
}

function byDate(items: readonly PlanItem[]): Map<LocalDate, PlanItem[]> {
  const map = new Map<LocalDate, PlanItem[]>();
  for (const item of items) map.set(item.date, [...(map.get(item.date) ?? []), item]);
  return map;
}

function assertBudgets(items: readonly PlanItem[], availability: WeeklyAvailability, reserved: Map<LocalDate, number> = new Map()) {
  for (const [date, dayItems] of byDate(items)) {
    const used = dayItems.reduce((sum, i) => sum + i.targetMinutes, 0);
    expect(used).toBeLessThanOrEqual(dailyTarget(availability, date) - (reserved.get(date) ?? 0));
  }
}

describe("helpers", () => {
  it("maps dates to weekday keys and daily targets", () => {
    expect(weekdayKey("2026-10-05")).toBe("mon");
    expect(weekdayKey("2026-10-11")).toBe("sun");
    expect(dailyTarget(WEEK, "2026-10-06")).toBe(75);
    expect(dailyTarget(WEEK, "2026-10-11")).toBe(0);
    expect(dailyTarget({ ...WEEK, mon: 45.9 }, TODAY)).toBe(45);
    expect(() => dailyTarget({ ...WEEK, mon: -1 }, TODAY)).toThrow(RangeError);
  });

  it("sums planned minutes for a day", () => {
    const p = plan();
    expect(plannedMinutesOn(p.items, TODAY)).toBe(p.items.filter((i) => i.date === TODAY).reduce((s, i) => s + i.targetMinutes, 0));
    expect(plannedMinutesOn([], TODAY)).toBe(0);
  });
});

describe("generatePlan — empty and edge inputs", () => {
  it("returns an empty plan without subjects or topics", () => {
    expect(plan({ subjects: [] }).items).toEqual([]);
    expect(plan({ subjects: [{ subjectId: "x", topics: [] }] }).items).toEqual([]);
  });

  it("returns an empty plan with no available time", () => {
    const p = plan({ availability: EVERY_DAY(0) });
    expect(p.items).toEqual([]);
    expect(p.totalMinutes).toBe(0);
  });

  it("validates inputs", () => {
    expect(() => plan({ today: "2026-02-30" })).toThrow(RangeError);
    expect(() => plan({ timeZone: "Nowhere/Land" })).toThrow(RangeError);
    expect(() => plan({ availability: { ...WEEK, tue: Number.NaN } })).toThrow(RangeError);
    expect(() => plan({ examDate: "2026-13-01" })).toThrow(RangeError);
  });

  it("stops the day before the exam and reports the countdown", () => {
    const p = plan({ examDate: "2026-10-12" });
    expect(p.mode).toBe("EXAM_PREP");
    expect(p.daysUntilExam).toBe(7);
    expect(p.endDate).toBe("2026-10-11");
    expect(p.items.every((i) => daysBetween(i.date, "2026-10-12") >= 1)).toBe(true);
  });

  it("produces a maintenance plan without mocks when the exam is missing, today or past", () => {
    for (const examDate of [null, TODAY, "2026-09-01"]) {
      const p = plan({ examDate });
      expect(p.mode).toBe("MAINTENANCE");
      expect(p.endDate).toBe(addDays(TODAY, 13));
      expect(p.items.length).toBeGreaterThan(0);
      expect(p.items.some((i) => i.activityType === "MOCK_EXAM")).toBe(false);
    }
    expect(plan({ examDate: null }).daysUntilExam).toBeNull();
    expect(plan({ examDate: "2026-09-01" }).daysUntilExam).toBe(-34);
  });

  it("clamps the horizon", () => {
    expect(plan({ examDate: null, horizonDays: 0 }).endDate).toBe(TODAY);
    expect(plan({ examDate: null, horizonDays: 1000 }).endDate).toBe(addDays(TODAY, 91));
  });
});

describe("generatePlan — daily budgets", () => {
  it("never exceeds the day's available minutes (randomised inputs)", () => {
    for (let seed = 0; seed < 60; seed++) {
      const rng = createRng(`budget-${seed}`);
      const int = (max: number) => Math.floor(rng() * (max + 1));
      const availability: WeeklyAvailability = { mon: int(180), tue: int(180), wed: int(90), thu: int(60), fri: int(45), sat: int(240), sun: int(20) };
      const subjects: PlanSubject[] = Array.from({ length: 1 + int(4) }, (_, s) => ({
        subjectId: `s${s}`,
        hasFlashcards: rng() < 0.5,
        priorityWeight: rng() < 0.2 ? 2 : 1,
        topics: Array.from({ length: 1 + int(6) }, (_, t) =>
          topic(`s${s}t${t}`, rng() < 0.3 ? null : int(100), int(3), { estimatedPracticeMinutes: int(40), lessonsRemaining: lessons(`s${s}t${t}`, int(3), 5 + int(70)) }),
        ),
      }));
      const examDate = rng() < 0.7 ? addDays(TODAY, 1 + int(120)) : null;
      const p = generatePlan({ today: TODAY, examDate, timeZone: TZ, availability, subjects, seed, horizonDays: 7 + int(30) });
      assertBudgets(p.items, availability);
      for (const item of p.items) {
        expect(item.targetMinutes).toBeGreaterThan(0);
        expect(Number.isInteger(item.targetMinutes)).toBe(true);
        if (examDate) expect(daysBetween(item.date, examDate)).toBeGreaterThanOrEqual(1);
      }
      for (const dayItems of byDate(p.items).values()) expect(dayItems.map((i) => i.order)).toEqual(dayItems.map((_, i) => i));
      expect(p.totalMinutes).toBe(p.items.reduce((sum, i) => sum + i.targetMinutes, 0));
    }
  });

  it("uses the available time when there is work to do", () => {
    const p = plan({ examDate: null });
    for (const [date, dayItems] of byDate(p.items)) {
      expect(dayItems.reduce((s, i) => s + i.targetMinutes, 0)).toBeGreaterThanOrEqual(dailyTarget(WEEK, date) - 9);
    }
  });

  it("splits a 75-minute day into two subject blocks and a 45-minute day into one", () => {
    const p = plan({ examDate: null, subjects: [PHYSICS, CHEM, { ...MATHS, hasFlashcards: false }] });
    const days = byDate(p.items);
    const subjectsOn = (date: LocalDate) => new Set((days.get(date) ?? []).map((i) => i.subjectId)).size;
    expect(subjectsOn("2026-10-06")).toBe(2); // Tuesday, 75 min
    expect(subjectsOn("2026-10-07")).toBe(1); // Wednesday, 45 min
  });
});

describe("generatePlan — interleaving", () => {
  const equal = (id: string): PlanSubject => ({ subjectId: id, topics: [topic(`${id}-a`, 50, 3), topic(`${id}-b`, null, 3)] });

  it("never schedules a subject more than 2 days in a row while others need time", () => {
    for (const seed of [1, 2, 3, "x"]) {
      const p = generatePlan({ today: TODAY, examDate: null, timeZone: TZ, availability: EVERY_DAY(30), subjects: [equal("a"), equal("b"), equal("c")], seed, horizonDays: 28 });
      const days = [...byDate(p.items).entries()];
      expect(days).toHaveLength(28);
      for (let i = 2; i < days.length; i++) {
        const today = new Set((days[i]?.[1] ?? []).map((x) => x.subjectId));
        const prev1 = new Set((days[i - 1]?.[1] ?? []).map((x) => x.subjectId));
        const prev2 = new Set((days[i - 2]?.[1] ?? []).map((x) => x.subjectId));
        for (const s of today) expect(prev1.has(s) && prev2.has(s)).toBe(false);
      }
      // Equal need → roughly equal time.
      const minutes = Object.values(p.minutesBySubject);
      expect(Math.max(...minutes) - Math.min(...minutes)).toBeLessThanOrEqual(60);
    }
  });

  it("allows consecutive days when only one subject exists", () => {
    const p = generatePlan({ today: TODAY, examDate: null, timeZone: TZ, availability: EVERY_DAY(30), subjects: [equal("solo")], seed: 1, horizonDays: 5 });
    expect(byDate(p.items).size).toBe(5);
  });

  it("takes recent sessions into account for interleaving and fair share", () => {
    const recentSessions = [-2, -1].map((d) => ({ subjectId: "a", activityType: "LESSON" as const, startedAt: new Date(`${addDays(TODAY, d)}T08:00:00Z`), minutes: 60 }));
    const p = generatePlan({ today: TODAY, examDate: null, timeZone: TZ, availability: EVERY_DAY(30), subjects: [equal("a"), equal("b")], seed: 1, horizonDays: 3, recentSessions });
    expect(p.items.filter((i) => i.date === TODAY).every((i) => i.subjectId === "b")).toBe(true);
  });
});

describe("generatePlan — need-based allocation (§16)", () => {
  it("gives more time to subjects with weak or uncovered topics", () => {
    const weak: PlanSubject = { subjectId: "weak", topics: [topic("w1", 20), topic("w2", 35, 2), topic("w3", null, 2)] };
    const strong: PlanSubject = { subjectId: "strong", topics: [topic("s1", 92), topic("s2", 88), topic("s3", 95)] };
    const p = generatePlan({ today: TODAY, examDate: null, timeZone: TZ, availability: EVERY_DAY(60), subjects: [weak, strong], seed: 3, horizonDays: 14 });
    expect(p.minutesBySubject.weak ?? 0).toBeGreaterThan((p.minutesBySubject.strong ?? 0) * 2);
    expect(p.minutesBySubject.strong ?? 0).toBeGreaterThan(0); // strong subjects keep a maintenance share
  });

  it("prioritises the weakest topic and follows it with a spaced review", () => {
    const subject: PlanSubject = { subjectId: "maths", topics: [topic("ok", 70), topic("weaker", 45), topic("weakest", 20)] };
    const p = generatePlan({ today: TODAY, examDate: null, timeZone: TZ, availability: EVERY_DAY(30), subjects: [subject], seed: 1, horizonDays: 7 });
    expect(p.items[0]).toMatchObject({ topicId: "weakest", activityType: "PRACTICE", reason: "WEAK_TOPIC_PRACTICE", targetQuestions: 10 });
    expect(p.items.find((i) => i.topicId === "weakest" && i.activityType === "REVIEW")).toMatchObject({ date: addDays(TODAY, 2), reason: "SPACED_REVIEW" });
    const weakestPractice = p.items.filter((i) => i.topicId === "weakest" && i.reason === "WEAK_TOPIC_PRACTICE").map((i) => i.date);
    expect(weakestPractice).toEqual([TODAY, addDays(TODAY, 5)]); // re-practice after 5 days
  });

  it("still schedules topics whose practice estimate is shorter than an item", () => {
    const subject: PlanSubject = { subjectId: "eng", topics: [topic("comprehension", 30, 0, { estimatedPracticeMinutes: 5 })] };
    const p = generatePlan({ today: TODAY, examDate: null, timeZone: TZ, availability: EVERY_DAY(20), subjects: [subject], seed: 1, horizonDays: 1 });
    expect(p.items[0]).toMatchObject({ topicId: "comprehension", activityType: "PRACTICE", targetMinutes: 20 });
  });

  it("respects a target score and priority weight", () => {
    const a: PlanSubject = { subjectId: "a", topics: [topic("a1", 70), topic("a2", 70)] };
    const b: PlanSubject = { subjectId: "b", topics: [topic("b1", 70), topic("b2", 70)] };
    const base = { today: TODAY, examDate: null, timeZone: TZ, availability: EVERY_DAY(30), seed: 1, horizonDays: 14 } as const;
    const ambitious = generatePlan({ ...base, subjects: [{ ...a, targetScore: 95 }, b] });
    expect(ambitious.minutesBySubject.a ?? 0).toBeGreaterThan(ambitious.minutesBySubject.b ?? 0);
    const emphasised = generatePlan({ ...base, subjects: [a, { ...b, priorityWeight: 3 }] });
    expect(emphasised.minutesBySubject.b ?? 0).toBeGreaterThan(emphasised.minutesBySubject.a ?? 0);
  });
});

describe("generatePlan — lessons, diagnostics and flashcards", () => {
  it("new topics go lesson → practice", () => {
    const subject: PlanSubject = { subjectId: "bio", topics: [topic("cells", null, 1), topic("genes", 60)] };
    const p = generatePlan({ today: TODAY, examDate: null, timeZone: TZ, availability: EVERY_DAY(45), subjects: [subject], seed: 1, horizonDays: 3 });
    const cells = p.items.filter((i) => i.topicId === "cells");
    expect(cells[0]).toMatchObject({ activityType: "LESSON", lessonId: "cells-L1", reason: "NEW_TOPIC_LESSON" });
    expect(cells[1]).toMatchObject({ activityType: "PRACTICE", reason: "PRACTICE_AFTER_LESSON" });
  });

  it("splits long lessons without leaving tiny remainders", () => {
    const subject: PlanSubject = { subjectId: "hist", topics: [topic("t1", 50, 0, { lessonsRemaining: [{ lessonId: "long", minutes: 70 }] })] };
    const p = generatePlan({ today: TODAY, examDate: null, timeZone: TZ, availability: EVERY_DAY(30), subjects: [subject], seed: 1, horizonDays: 10 });
    const chunks = p.items.filter((i) => i.lessonId === "long");
    expect(chunks.reduce((s, i) => s + i.targetMinutes, 0)).toBe(70);
    expect(chunks.every((c) => c.targetMinutes >= 10)).toBe(true);
    expect(chunks.slice(1).every((c) => c.reason === "CONTINUE_LESSON")).toBe(true);
  });

  it("schedules a diagnostic before any lesson in an unassessed subject (§52)", () => {
    const p = plan({ examDate: null, subjects: [CHEM, PHYSICS] });
    const chem = p.items.filter((i) => i.subjectId === "chem");
    expect(chem[0]).toMatchObject({ activityType: "DIAGNOSTIC", reason: "DIAGNOSTIC_BASELINE", targetMinutes: 30, date: TODAY });
    expect(chem.filter((i) => i.activityType === "DIAGNOSTIC")).toHaveLength(1);
  });

  it("skips the diagnostic once one has been taken", () => {
    const recentSessions = [{ subjectId: "chem", activityType: "DIAGNOSTIC" as const, startedAt: new Date("2026-10-03T08:00:00Z"), minutes: 30 }];
    const p = plan({ examDate: null, subjects: [CHEM], recentSessions });
    expect(p.items.some((i) => i.activityType === "DIAGNOSTIC")).toBe(false);
  });

  it("adds short daily flashcard slots only for subjects with flashcards", () => {
    const p = plan({ examDate: null });
    const cards = p.items.filter((i) => i.activityType === "FLASHCARDS");
    expect(cards.length).toBeGreaterThan(5);
    expect(cards.every((i) => i.subjectId === "maths" && i.targetMinutes === 10 && i.order === 0)).toBe(true);
    expect(cards.every((i) => dailyTarget(WEEK, i.date) >= 25)).toBe(true);
    const none = plan({ examDate: null, subjects: [PHYSICS, CHEM] });
    expect(none.items.some((i) => i.activityType === "FLASHCARDS")).toBe(false);
  });
});

describe("generatePlan — mock exam cadence", () => {
  const mocks = (items: readonly PlanItem[]) => items.filter((i) => i.activityType === "MOCK_EXAM").map((i) => i.date);
  const gaps = (dates: readonly LocalDate[]) => dates.slice(1).map((d, i) => daysBetween(dates[i] as LocalDate, d));
  const roomy = EVERY_DAY(120);

  it("schedules no mocks more than 12 weeks out", () => {
    expect(mocks(plan({ examDate: addDays(TODAY, 120), availability: roomy, horizonDays: 30 }).items)).toEqual([]);
  });

  it("schedules monthly mocks 12–6 weeks out", () => {
    const m = mocks(plan({ examDate: addDays(TODAY, 84), availability: roomy, horizonDays: 42 }).items);
    expect(m.length).toBeGreaterThanOrEqual(2);
    expect(gaps(m).every((g) => g >= 28)).toBe(true);
  });

  it("schedules fortnightly mocks 6–2 weeks out and weekly in the final 2 weeks", () => {
    const exam = addDays(TODAY, 42);
    const p = plan({ examDate: exam, availability: roomy, horizonDays: 42 });
    const m = mocks(p.items);
    const early = m.filter((d) => daysBetween(d, exam) > 14);
    const late = m.filter((d) => daysBetween(d, exam) <= 14);
    expect(gaps(early).every((g) => g >= 14)).toBe(true);
    expect(late.length).toBeGreaterThanOrEqual(2);
    expect(gaps(late).every((g) => g >= 7 && g <= 13)).toBe(true);
    // A mock day holds only the mock (here it fills the whole 120 minutes)...
    expect(p.items.filter((i) => i.date === m[0]).map((i) => i.activityType)).toEqual(["MOCK_EXAM"]);
    // ...plus flashcards when time remains.
    const longer = plan({ examDate: exam, availability: EVERY_DAY(135), horizonDays: 42 });
    const first = mocks(longer.items)[0];
    expect(longer.items.filter((i) => i.date === first).map((i) => i.activityType)).toEqual(["FLASHCARDS", "MOCK_EXAM"]);
  });

  it("puts mocks on the roomiest day and only where they fit", () => {
    const p = plan({ examDate: addDays(TODAY, 10), availability: WEEK });
    const m = mocks(p.items);
    expect(m).toContain("2026-10-10"); // Saturday, 120 min
    for (const date of m) expect(dailyTarget(WEEK, date)).toBeGreaterThanOrEqual(60);
    expect(mocks(plan({ examDate: addDays(TODAY, 10), availability: EVERY_DAY(45) }).items)).toEqual([]);
  });

  it("rotates subjects and respects a recent mock", () => {
    const exam = addDays(TODAY, 28);
    const p = plan({ examDate: exam, availability: roomy, horizonDays: 28 });
    const subjects = p.items.filter((i) => i.activityType === "MOCK_EXAM").map((i) => i.subjectId);
    expect(new Set(subjects).size).toBe(Math.min(3, subjects.length));
    const recentSessions = [{ subjectId: "maths", activityType: "MOCK_EXAM" as const, startedAt: new Date("2026-10-04T08:00:00Z"), minutes: 120 }];
    const after = plan({ examDate: exam, availability: roomy, horizonDays: 28, recentSessions });
    const first = mocks(after.items)[0] as LocalDate;
    expect(daysBetween("2026-10-04", first)).toBeGreaterThanOrEqual(14);
  });

  it("accepts custom cadence thresholds", () => {
    const p = plan({ examDate: addDays(TODAY, 20), availability: roomy, horizonDays: 14, config: { mockCadence: [{ withinDays: 30, everyDays: 3 }] } });
    const m = mocks(p.items);
    expect(m.length).toBeGreaterThanOrEqual(4);
    expect(gaps(m).every((g) => g >= 3)).toBe(true);
  });
});

describe("generatePlan — revision phase", () => {
  const subject: PlanSubject = { subjectId: "geo", topics: [topic("maps", 65), topic("climate", null, 2)] };
  const firstDay = (examOffset: number) =>
    generatePlan({ today: TODAY, examDate: addDays(TODAY, examOffset), timeZone: TZ, availability: EVERY_DAY(45), subjects: [subject], seed: 1, horizonDays: 3 }).items.filter(
      (i) => i.date === TODAY,
    );

  it("puts practice before new lessons in the final two weeks", () => {
    expect(firstDay(10).map((i) => i.reason)[0]).toBe("REVISION_PRACTICE");
    expect(firstDay(60).map((i) => i.reason)[0]).toBe("NEW_TOPIC_LESSON");
  });
});

describe("generatePlan — determinism", () => {
  it("is identical for the same seed", () => {
    expect(plan({ seed: "abc" })).toEqual(plan({ seed: "abc" }));
  });

  it("uses the seed only for tie-breaks", () => {
    const tie = (id: string): PlanSubject => ({ subjectId: id, topics: [topic(`${id}-t`, 50, 2)] });
    const firsts = new Set(
      Array.from({ length: 8 }, (_, seed) =>
        generatePlan({ today: TODAY, examDate: null, timeZone: TZ, availability: EVERY_DAY(30), subjects: [tie("a"), tie("b"), tie("c")], seed, horizonDays: 1 }).items[0]?.subjectId,
      ),
    );
    expect(firsts.size).toBeGreaterThan(1);
  });
});

describe("adaptPlan", () => {
  const input: PlanInput = { today: TODAY, examDate: "2026-11-30", timeZone: TZ, availability: WEEK, subjects: [MATHS, PHYSICS, CHEM], seed: 7 };
  const original = generatePlan({ ...input, today: "2026-10-03" }).items.map(
    (item, i): ExistingPlanItem => ({ ...item, id: `item-${i}`, status: "PENDING" }),
  );

  it("keeps completed and past items, discards pending future ones", () => {
    const existing = original.map((item) =>
      item.date === "2026-10-03" || (item.date === TODAY && item.order === 0) ? { ...item, status: "COMPLETED" as const } : item,
    );
    const result = adaptPlan(existing, input);
    const pastPending = existing.filter((i) => i.date === "2026-10-04");
    expect(result.keep).toEqual(expect.arrayContaining([...existing.filter((i) => i.status === "COMPLETED"), ...pastPending]));
    expect(result.discard.every((i) => i.status !== "COMPLETED" && daysBetween(TODAY, i.date) >= 0)).toBe(true);
    expect(result.keep.length + result.discard.length).toBe(existing.length);
    expect(result.add).toBe(result.plan.items);
  });

  it("charges completed work against today's budget and continues the day's order", () => {
    const completedToday: ExistingPlanItem = {
      id: "done-1",
      status: "COMPLETED",
      date: TODAY,
      order: 0,
      subjectId: "physics",
      topicId: "mech",
      lessonId: "mech-L1",
      activityType: "LESSON",
      targetMinutes: 25,
      reason: "NEXT_LESSON",
    };
    const result = adaptPlan([completedToday], input);
    const todayItems = result.add.filter((i) => i.date === TODAY);
    expect(todayItems.reduce((s, i) => s + i.targetMinutes, 0)).toBeLessThanOrEqual(45 - 25);
    expect(todayItems.every((i) => i.order >= 1)).toBe(true);
    expect(todayItems.some((i) => i.subjectId === "physics")).toBe(false);
    expect(result.add.some((i) => i.lessonId === "mech-L1")).toBe(false); // never re-planned
    assertBudgets(result.add, WEEK, new Map([[TODAY, 25]]));
  });

  it("with nothing completed equals a fresh plan", () => {
    expect(adaptPlan([], input).plan).toEqual(generatePlan(input));
  });
});
