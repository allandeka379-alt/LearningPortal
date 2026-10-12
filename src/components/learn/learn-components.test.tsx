/** @vitest-environment jsdom */
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

import { ContinueLearningCard } from "./ContinueLearningCard";
import { CourseCard, type CourseCardData } from "./CourseCard";
import { CourseOutline, unitProgressText, type OutlineUnit } from "./CourseOutline";
import { ExamDistanceLine, ExamPrepPanel } from "./ExamPrepPanel";
import { continueVerb, examMonthsSentence, learnerLine, lessonsPercent, lessonsProgressText, qualificationLine } from "./format";
import { LessonNextSteps } from "./LessonNextSteps";
import { MasteryTabsCard } from "./MasteryTabsCard";
import { WeekPlanCard, dayHeading, groupByDay } from "./WeekPlanCard";

afterEach(cleanup);

const SUBJECT = "0190a1b2-0000-7000-8000-000000000001";
const TOPIC = "0190a1b2-0000-7000-8000-0000000000aa";
const LESSON = "0190a1b2-0000-7000-8000-0000000000b1";

const course: CourseCardData = {
  subjectId: SUBJECT,
  name: "Mathematics",
  qualificationName: "ZIMSEC Ordinary Level",
  boardName: "ZIMSEC",
  status: "ACTIVE",
  totalLessons: 12,
  completedLessons: 3,
  unitsTotal: 6,
  unitsWithLessons: 4,
  next: { id: LESSON, title: "Solving quadratic equations", topicId: TOPIC, unitName: "Algebra", estimatedMinutes: 15, locked: false, reason: "NEXT" },
};

describe("course wording", () => {
  it("formats progress, verbs and lines", () => {
    expect(lessonsProgressText(1, 1)).toBe("1 of 1 lesson completed");
    expect(lessonsProgressText(3, 12)).toBe("3 of 12 lessons completed");
    expect(lessonsPercent(3, 12)).toBe(25);
    expect(lessonsPercent(0, 0)).toBe(0);
    expect(continueVerb("START")).toBe("Start");
    expect(continueVerb("RESUME")).toBe("Resume");
    expect(continueVerb("NEXT")).toBe("Continue");
    expect(qualificationLine("ZIMSEC Ordinary Level", "ZIMSEC")).toBe("ZIMSEC Ordinary Level");
    expect(qualificationLine("IGCSE", "Cambridge")).toBe("Cambridge IGCSE");
    expect(learnerLine("Form 4", "ZIMSEC Ordinary Level")).toBe("Form 4 · ZIMSEC Ordinary Level");
    expect(learnerLine(null, "  ")).toBeNull();
    expect(examMonthsSentence(1)).toBe("Your exams are in 1 month");
    expect(unitProgressText({ completed: 0, total: 0 })).toBe("No lessons yet");
    expect(unitProgressText({ completed: 2, total: 2 })).toBe("All 2 lessons completed");
  });
});

describe("CourseCard", () => {
  it("shows real lesson progress and a Continue link to the next lesson in its topic", () => {
    render(<CourseCard course={course} />);
    expect(screen.getByRole("heading", { name: "Mathematics" })).toBeTruthy();
    expect(screen.getByText("ZIMSEC Ordinary Level")).toBeTruthy();
    expect(screen.getByRole("progressbar").getAttribute("aria-valuetext")).toBe("3 of 12 lessons completed");
    const cta = screen.getByRole("link", { name: "Continue Mathematics: Solving quadratic equations" });
    expect(cta.getAttribute("href")).toBe(`/app/lessons/${LESSON}?topic=${TOPIC}`);
    expect(screen.getByRole("link", { name: "Open the Mathematics course" }).getAttribute("href")).toBe(`/app/subjects/${SUBJECT}`);
  });

  it("says lessons are being added when the subject has none, without a Continue button", () => {
    render(<CourseCard course={{ ...course, totalLessons: 0, completedLessons: 0, next: null }} />);
    expect(screen.getByText("Lessons for this subject are being added.")).toBeTruthy();
    expect(screen.queryByRole("progressbar")).toBeNull();
    expect(screen.queryByRole("link", { name: /Continue/ })).toBeNull();
  });

  it("marks a finished course", () => {
    render(<CourseCard course={{ ...course, completedLessons: 12, next: null }} />);
    expect(screen.getByText("Every lesson completed")).toBeTruthy();
    expect(screen.getByRole("link", { name: "Open the Mathematics course" }).textContent).toBe("Review the course");
  });
});

const units: OutlineUnit[] = [
  {
    id: "u1",
    name: "Number",
    code: "1",
    kind: "TOPIC",
    isOptional: false,
    section: { id: "s1", name: "Pure", code: null },
    lessons: [{ id: "l1", title: "Fractions", kind: "LESSON", estimatedMinutes: 10, topicId: "u1", locked: false, state: "COMPLETED" }],
    completed: 1,
    total: 1,
  },
  {
    id: "u2",
    name: "Algebra",
    code: "2",
    kind: "TOPIC",
    isOptional: true,
    section: { id: "s1", name: "Pure", code: null },
    lessons: [
      { id: "l2", title: "Expressions", kind: "LESSON", estimatedMinutes: 10, topicId: "u2", locked: false, state: "IN_PROGRESS" },
      { id: "l3", title: "Worked examples", kind: "WORKED_EXAMPLES", estimatedMinutes: 20, topicId: "u2", locked: true, state: "NOT_STARTED" },
    ],
    completed: 0,
    total: 2,
  },
  { id: "u3", name: "Statistics", code: "3", kind: "TOPIC", isOptional: false, section: null, lessons: [], completed: 0, total: 0 },
];

describe("CourseOutline", () => {
  it("lists topics in order under their section, opens the topic with the next lesson and states every lesson", () => {
    const { container } = render(<CourseOutline subjectId={SUBJECT} units={units} nextLessonId="l2" />);
    expect(screen.getByRole("heading", { name: "Pure" })).toBeTruthy();
    const panels = container.querySelectorAll("details");
    expect(Array.from(panels).map((panel) => panel.getAttribute("data-unit-id"))).toEqual(["u1", "u2", "u3"]);
    expect(Array.from(panels).map((panel) => panel.open)).toEqual([false, true, false]);
    expect(screen.getByText("1 Number")).toBeTruthy();
    expect(screen.getByText("All 1 lesson completed")).toBeTruthy();
    expect(screen.getByText("Optional")).toBeTruthy();
    const next = screen.getByRole("link", { name: "Expressions" });
    expect(next.getAttribute("href")).toBe("/app/lessons/l2");
    expect(next.getAttribute("aria-describedby")).toBe("up-next-l2");
    expect(screen.getByText("Up next")).toBeTruthy();
    // State and lock in words, never colour alone.
    expect(screen.getAllByText("Locked").length).toBeGreaterThan(0);
    expect(screen.getByText("Lessons for this topic are being added. You can still practise it.")).toBeTruthy();
    expect(screen.getByRole("link", { name: /^Practise\s*Statistics$/ }).getAttribute("href")).toContain(`subjectId=${SUBJECT}`);
    expect(screen.getByRole("link", { name: "Topic overview: Statistics" }).getAttribute("href")).toBe(`/app/subjects/${SUBJECT}/topics/u3`);
  });
});

describe("ContinueLearningCard", () => {
  it("leads to the next lesson with the course's progress", () => {
    render(<ContinueLearningCard item={{ course, lesson: { ...course.next!, reason: "RESUME" } }} library={{ courses: 1, lessons: 12 }} />);
    expect(screen.getByRole("heading", { name: "Continue learning" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Resume: Solving quadratic equations" }).getAttribute("href")).toBe(`/app/lessons/${LESSON}?topic=${TOPIC}`);
    expect(screen.getByText("Mathematics · pick up where you left off")).toBeTruthy();
  });

  it("explains why there is nothing to continue", () => {
    render(<ContinueLearningCard item={null} library={{ courses: 0, lessons: 0 }} />);
    expect(screen.getByRole("link", { name: "Add subjects" })).toBeTruthy();
    cleanup();
    render(<ContinueLearningCard item={null} library={{ courses: 2, lessons: 0 }} />);
    expect(screen.getByText(/Lessons for your subjects are being added/)).toBeTruthy();
    cleanup();
    render(<ContinueLearningCard item={null} library={{ courses: 2, lessons: 30 }} />);
    expect(screen.getByRole("heading", { name: "Every lesson completed" })).toBeTruthy();
  });
});

describe("LessonNextSteps", () => {
  it("offers the quick check, practice and the next lesson with progress in the topic", () => {
    render(
      <LessonNextSteps
        check={{ status: "NOT_STARTED", questionCount: 4 }}
        practise={{ href: "/app/practice?subjectId=x", topicName: "Algebra" }}
        next={{ id: LESSON, title: "Factorising", topicId: TOPIC, locked: false, unitName: "Graphs", newUnit: true }}
        unit={{ name: "Algebra", completed: 2, total: 5 }}
        courseHref={`/app/subjects/${SUBJECT}`}
      />,
    );
    const steps = within(screen.getByRole("list")).getAllByRole("link");
    expect(steps.map((link) => link.getAttribute("href"))).toEqual(["#lesson-practice", "/app/practice?subjectId=x", `/app/lessons/${LESSON}?topic=${TOPIC}`]);
    expect(screen.getByText("4 questions on this lesson, marked instantly")).toBeTruthy();
    expect(screen.getByText("Next lesson · starts Graphs")).toBeTruthy();
    expect(screen.getByRole("progressbar", { name: "Algebra" }).getAttribute("aria-valuetext")).toBe("2 of 5 lessons completed");
  });

  it("returns to the course after the last lesson and reports a finished check", () => {
    render(
      <LessonNextSteps
        check={{ status: "COMPLETED", questionCount: 3, answeredCount: 3, percentage: 66.7 }}
        practise={{ href: "/p", topicName: "Algebra" }}
        next={null}
        unit={null}
        courseHref="/app/subjects/x"
      />,
    );
    expect(screen.getByText("Quick check done")).toBeTruthy();
    expect(screen.getByRole("link", { name: /Back to the course/ }).getAttribute("href")).toBe("/app/subjects/x");
  });
});

describe("exam panels", () => {
  const countdown = { name: "November 2026", startsOn: "2026-11-02", endsOn: "2026-12-04", daysUntil: 21, isProvisional: true, isDemo: false };

  it("shows the countdown, readiness and topics to fix, anchored for the header pill", () => {
    const { container } = render(
      <ExamPrepPanel
        countdown={countdown}
        readiness={{ progressPercent: 42, topicsCompleted: 5, topicsTotal: 12, lastMock: { subjectName: "Mathematics", percentage: 64, gradeEstimate: "B" } }}
        weakTopics={[{ topicId: "t1", name: "Vectors", subjectId: SUBJECT, subjectName: "Mathematics", score: 22 }]}
      />,
    );
    expect(container.querySelector("#exam-countdown")).not.toBeNull();
    expect(screen.getByRole("heading", { name: "Exam preparation" })).toBeTruthy();
    expect(screen.getByText("21")).toBeTruthy();
    expect(screen.getByText("Provisional date")).toBeTruthy();
    expect(screen.getByText(/estimated grade B/)).toBeTruthy();
    expect(screen.getByRole("link", { name: /^Practise\s*Vectors$/ })).toBeTruthy();
    expect(screen.getByRole("link", { name: /Mock exams/ }).getAttribute("href")).toBe("/app/exams");
  });

  it("is honest without a date, a mock or weak topics", () => {
    render(<ExamPrepPanel countdown={null} readiness={{ progressPercent: null, topicsCompleted: 0, topicsTotal: 0, lastMock: null }} weakTopics={[]} />);
    expect(screen.getByText("No examination date yet")).toBeTruthy();
    expect(screen.getByText(/No mock exam yet/)).toBeTruthy();
    expect(screen.getByRole("progressbar").getAttribute("aria-valuetext")).toBe("No data yet");
  });

  it("says how many months away a distant exam is", () => {
    const { container } = render(<ExamDistanceLine countdown={{ ...countdown, daysUntil: 400, isProvisional: false }} months={13} />);
    expect(container.querySelector("#exam-countdown")?.textContent).toContain("Your exams are in 13 months · November 2026.");
  });
});

describe("WeekPlanCard", () => {
  const today = "2026-10-12";
  const item = (id: string, date: string, status = "PENDING") => ({
    id,
    date,
    subjectId: SUBJECT,
    subjectName: "Mathematics",
    topicId: null,
    topicName: "Algebra",
    lessonId: null,
    lessonTitle: null,
    assessmentId: null,
    assessmentTitle: null,
    activityType: "PRACTICE",
    reason: "WEAK_TOPIC",
    targetMinutes: 20,
    targetQuestions: 10,
    status,
  });

  it("groups the plan by day", () => {
    expect(dayHeading(today, today)).toBe("Today");
    expect(dayHeading("2026-10-13", today)).toBe("Tomorrow");
    expect(groupByDay([item("b", "2026-10-14"), item("a", "2026-10-12"), item("c", "2026-10-14")]).map((d) => [d.date, d.items.map((i) => i.id)])).toEqual([
      ["2026-10-12", ["a"]],
      ["2026-10-14", ["b", "c"]],
    ]);
    render(<WeekPlanCard today={today} dailyTarget={{ minutes: 30, minutesStudiedToday: 10, goalMet: false }} week={{ items: [item("a", today, "DONE"), item("b", "2026-10-13")] }} />);
    expect(screen.getByRole("heading", { name: "Today" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Tomorrow" })).toBeTruthy();
    expect(screen.getByText("Done")).toBeTruthy();
    expect(screen.getAllByRole("link", { name: /^Start: Practice, Algebra/ })).toHaveLength(1);
  });

  it("invites a plan when there is none, and says when the week is empty", () => {
    render(<WeekPlanCard today={today} dailyTarget={{ minutes: 30, minutesStudiedToday: 0, goalMet: false }} week={null} />);
    expect(screen.getByRole("link", { name: "Create my study plan" })).toBeTruthy();
    cleanup();
    render(<WeekPlanCard today={today} dailyTarget={{ minutes: 30, minutesStudiedToday: 0, goalMet: false }} week={{ items: [] }} />);
    expect(screen.getByText("Nothing is scheduled in your study plan for the next seven days.")).toBeTruthy();
  });
});

describe("MasteryTabsCard", () => {
  it("shows weak and strong topics in one card with two tabs", () => {
    render(
      <MasteryTabsCard
        id="m"
        weak={[{ topicId: "w", name: "Vectors", subjectId: SUBJECT, subjectName: "Mathematics", score: 20 }]}
        strong={[]}
        weakEmpty="none weak"
        strongEmpty="none strong yet"
      />,
    );
    expect(screen.getByRole("tab", { name: "To work on" }).getAttribute("aria-selected")).toBe("true");
    expect(screen.getByRole("link", { name: /^Practise\s*Vectors$/ })).toBeTruthy();
    fireEvent.click(screen.getByRole("tab", { name: "Strongest" }));
    expect(screen.getByRole("tabpanel").textContent).toContain("none strong yet");
  });
});
