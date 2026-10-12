import { describe, expect, it } from "vitest";
import {
  buildCourseOutline,
  examFocus,
  isExamYear,
  monthsUntil,
  nextInCourse,
  pickContinueCourse,
  pickNextLesson,
  type CourseLessonTag,
  type CourseTopicRow,
  type NextLessonCandidate,
} from "./course-core";

function topic(id: string, parent: CourseTopicRow | null, kind: CourseTopicRow["kind"], sortOrder: number, name = id): CourseTopicRow {
  return {
    id,
    parentId: parent?.id ?? null,
    kind,
    depth: parent ? parent.depth + 1 : 0,
    path: parent ? `${parent.path}/${id}` : id,
    sortOrder,
    code: null,
    name,
    isOptional: false,
  };
}

function tag(lessonId: string, topicId: string, sortOrder = 0, extra: Partial<CourseLessonTag> = {}): CourseLessonTag {
  return { lessonId, topicId, isPrimary: false, sortOrder, title: `Lesson ${lessonId}`, kind: "LESSON", estimatedMinutes: 10, accessTier: "PREMIUM", ...extra };
}

// Section A (sort 0) > Topic T1 (sort 1) > Subtopics S1b (sort 1), S1a (sort 0); Topic T2 at root (sort 2, no section).
const sectionA = topic("secA", null, "SECTION", 0, "Section A");
const t1 = topic("t1", sectionA, "TOPIC", 1, "Algebra");
const s1a = topic("s1a", t1, "SUBTOPIC", 0);
const s1b = topic("s1b", t1, "SUBTOPIC", 1);
const t2 = topic("t2", null, "TOPIC", 2, "Geometry");
const t3 = topic("t3", null, "TOPIC", 3, "Statistics");
const TOPICS = [t2, s1b, t1, s1a, sectionA, t3];

describe("buildCourseOutline", () => {
  it("lists course topics in syllabus order with their section, and lessons in syllabus then tag order", () => {
    const outline = buildCourseOutline(TOPICS, [tag("L3", "t2"), tag("L2", "s1b"), tag("L1b", "s1a", 1), tag("L1a", "s1a", 0)], []);
    expect(outline.units.map((u) => u.id)).toEqual(["t1", "t2", "t3"]);
    expect(outline.units[0]?.section).toEqual({ id: "secA", name: "Section A", code: null });
    expect(outline.units[1]?.section).toBeNull();
    expect(outline.lessons.map((l) => l.id)).toEqual(["L1a", "L1b", "L2", "L3"]);
    expect(outline.units[0]?.lessons.map((l) => l.id)).toEqual(["L1a", "L1b", "L2"]);
    expect(outline.units[0]?.lessons[0]).toMatchObject({ topicId: "s1a", unitId: "t1", state: "NOT_STARTED", locked: false });
    // A topic without published lessons is still listed (honest "no lessons yet").
    expect(outline.units[2]).toMatchObject({ id: "t3", total: 0, completed: 0, lessons: [] });
    expect(outline).toMatchObject({ total: 4, completed: 0, lastActivityAt: null });
  });

  it("places a lesson tagged twice once: the primary tag, else the earliest in syllabus order; ignores other versions", () => {
    const outline = buildCourseOutline(
      TOPICS,
      [tag("L1", "t2"), tag("L1", "s1b"), tag("L2", "s1a"), tag("L2", "t2", 0, { isPrimary: true }), tag("L9", "other-version-node")],
      [],
    );
    expect(outline.lessons.map((l) => [l.id, l.unitId])).toEqual([
      ["L1", "t1"],
      ["L2", "t2"],
    ]);
  });

  it("gives a lesson tagged to a section that section as its course topic", () => {
    const outline = buildCourseOutline(TOPICS, [tag("L1", "secA")], []);
    expect(outline.units.map((u) => u.id)).toEqual(["secA", "t1", "t2", "t3"]);
    expect(outline.units[0]).toMatchObject({ kind: "SECTION", section: null, total: 1 });
  });

  it("applies progress, lock state and the latest activity", () => {
    const viewed = new Date("2026-10-01T10:00:00Z");
    const later = new Date("2026-10-05T10:00:00Z");
    const outline = buildCourseOutline(
      TOPICS,
      [tag("L1", "s1a"), tag("L2", "s1b", 0, { accessTier: "FREE" }), tag("L3", "t2")],
      [
        { lessonId: "L1", status: "COMPLETED", lastViewedAt: viewed, completedAt: viewed },
        { lessonId: "L2", status: "IN_PROGRESS", lastViewedAt: later, completedAt: null },
        { lessonId: "unrelated", status: "COMPLETED", lastViewedAt: new Date("2027-01-01T00:00:00Z"), completedAt: null },
      ],
      (tier) => tier !== "PREMIUM",
    );
    expect(outline.lessons.map((l) => [l.id, l.state, l.locked])).toEqual([
      ["L1", "COMPLETED", true],
      ["L2", "IN_PROGRESS", false],
      ["L3", "NOT_STARTED", true],
    ]);
    expect(outline.units[0]).toMatchObject({ completed: 1, total: 2 });
    expect(outline).toMatchObject({ completed: 1, total: 3, lastActivityAt: later });
  });

  it("returns an empty outline without topics", () => {
    expect(buildCourseOutline([], [tag("L1", "t1")], [])).toEqual({ units: [], lessons: [], completed: 0, total: 0, lastActivityAt: null });
  });
});

function lesson(id: string, state: NextLessonCandidate["state"], options: { at?: string; done?: string; locked?: boolean } = {}): NextLessonCandidate {
  return {
    id,
    state,
    locked: options.locked ?? false,
    lastViewedAt: options.at ? new Date(options.at) : null,
    completedAt: options.done ? new Date(options.done) : null,
  };
}

describe("pickNextLesson", () => {
  it("starts with the first lesson, and returns null for an empty or finished course", () => {
    expect(pickNextLesson([])).toBeNull();
    expect(pickNextLesson([lesson("a", "NOT_STARTED"), lesson("b", "NOT_STARTED")])).toMatchObject({ lesson: { id: "a" }, reason: "START" });
    expect(pickNextLesson([lesson("a", "COMPLETED", { done: "2026-10-01" })])).toBeNull();
  });

  it("resumes the most recently opened unfinished lesson when it is the latest activity", () => {
    const pick = pickNextLesson([
      lesson("a", "COMPLETED", { at: "2026-10-01", done: "2026-10-01" }),
      lesson("b", "IN_PROGRESS", { at: "2026-10-03" }),
      lesson("c", "IN_PROGRESS", { at: "2026-10-02" }),
    ]);
    expect(pick).toMatchObject({ lesson: { id: "b" }, reason: "RESUME" });
  });

  it("moves on after the most recently completed lesson, wrapping to the first unfinished one", () => {
    const lessons = [
      lesson("a", "NOT_STARTED"),
      lesson("b", "IN_PROGRESS", { at: "2026-10-01" }),
      lesson("c", "COMPLETED", { at: "2026-10-04", done: "2026-10-04" }),
      lesson("d", "NOT_STARTED"),
    ];
    expect(pickNextLesson(lessons)).toMatchObject({ lesson: { id: "d" }, reason: "NEXT" });
    const atEnd = [lesson("a", "NOT_STARTED"), lesson("b", "COMPLETED", { done: "2026-10-04" })];
    expect(pickNextLesson(atEnd)).toMatchObject({ lesson: { id: "a" }, reason: "NEXT" });
  });

  it("prefers open lessons and offers a locked one only when nothing open is left", () => {
    expect(pickNextLesson([lesson("a", "NOT_STARTED", { locked: true }), lesson("b", "NOT_STARTED")])).toMatchObject({ lesson: { id: "b" }, reason: "START" });
    const lockedNext = [lesson("a", "COMPLETED", { done: "2026-10-04" }), lesson("b", "NOT_STARTED", { locked: true }), lesson("c", "NOT_STARTED")];
    expect(pickNextLesson(lockedNext)).toMatchObject({ lesson: { id: "c" } });
    const allLocked = [lesson("a", "COMPLETED", { done: "2026-10-04" }), lesson("b", "NOT_STARTED", { locked: true })];
    expect(pickNextLesson(allLocked)).toMatchObject({ lesson: { id: "b" }, reason: "NEXT" });
  });
});

describe("nextInCourse", () => {
  it("returns the following lesson across course topics", () => {
    const list = [{ id: "a" }, { id: "b" }];
    expect(nextInCourse(list, "a")).toEqual({ id: "b" });
    expect(nextInCourse(list, "b")).toBeNull();
    expect(nextInCourse(list, "z")).toBeNull();
  });
});

describe("pickContinueCourse", () => {
  it("picks the most recently studied course that still has a lesson, else the first with one", () => {
    const courses = [
      { subjectId: "maths", lastActivityAt: null, hasNext: true },
      { subjectId: "bio", lastActivityAt: new Date("2026-10-02"), hasNext: true },
      { subjectId: "chem", lastActivityAt: new Date("2026-10-05"), hasNext: false },
      { subjectId: "phys", lastActivityAt: new Date("2026-10-01"), hasNext: true },
    ];
    expect(pickContinueCourse(courses)?.subjectId).toBe("bio");
    expect(pickContinueCourse(courses.map((c) => ({ ...c, lastActivityAt: null })))?.subjectId).toBe("maths");
    expect(pickContinueCourse(courses.map((c) => ({ ...c, hasNext: false })))).toBeNull();
  });
});

describe("exam focus", () => {
  const groups = [
    { id: "f3", ordinal: 3, typicalLevelId: "o" },
    { id: "f4", ordinal: 4, typicalLevelId: "o" },
    { id: "l6", ordinal: 5, typicalLevelId: "a" },
    { id: "u6", ordinal: 6, typicalLevelId: "a" },
  ];

  it("recognises the final year of each level from the data", () => {
    expect(isExamYear(groups[1] ?? null, groups)).toBe(true);
    expect(isExamYear(groups[3] ?? null, groups)).toBe(true);
    expect(isExamYear(groups[0] ?? null, groups)).toBe(false);
    expect(isExamYear(groups[2] ?? null, groups)).toBe(false);
    expect(isExamYear(null, groups)).toBe(false);
    expect(isExamYear({ id: "x", ordinal: 9, typicalLevelId: null }, groups)).toBe(false);
  });

  it("leads with exam preparation inside ten months or in the exam year, otherwise a light line", () => {
    expect(examFocus({ daysUntil: 120, examYear: false })).toBe("PREPARE");
    expect(examFocus({ daysUntil: -2, examYear: false })).toBe("PREPARE");
    expect(examFocus({ daysUntil: 304, examYear: false })).toBe("PREPARE");
    expect(examFocus({ daysUntil: 305, examYear: false })).toBe("LIGHT");
    expect(examFocus({ daysUntil: 500, examYear: true })).toBe("PREPARE");
    expect(examFocus({ daysUntil: null, examYear: true })).toBe("PREPARE");
    expect(examFocus({ daysUntil: null, examYear: false })).toBe("NONE");
  });

  it("counts whole months", () => {
    expect(monthsUntil(0)).toBe(0);
    expect(monthsUntil(10)).toBe(1);
    expect(monthsUntil(400)).toBe(13);
  });
});
