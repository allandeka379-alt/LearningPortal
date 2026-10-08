/** @vitest-environment jsdom */
import { act, cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import type { FormAction, FormActionState } from "@/components/student/action-state";
import { buildWeek } from "@/server/studyplan/service";
import type { PlanItemView, PlanSummary, TodayPlan } from "@/server/studyplan/service";
import { AdaptPlanButton } from "./AdaptPlanButton";
import { PlanItemActions } from "./PlanItemActions";
import { PlanOverview } from "./PlanOverview";
import { PlanReasons } from "./PlanReasons";
import { PlanSetupForm } from "./PlanSetupForm";
import { TodayPlanCard } from "./TodayPlanCard";
import { WeekDays, type WeekDayTab } from "./WeekDays";
import { WeekPlanSection } from "./WeekPlanSection";

afterEach(() => cleanup());

/** A Server Action stand-in that records the submitted form and answers with `result`. */
function recordingAction(result: FormActionState) {
  const calls: FormData[] = [];
  const action: FormAction = async (_state, formData) => {
    calls.push(formData);
    return result;
  };
  return { action, calls };
}

const DATES = ["2026-10-05", "2026-10-06", "2026-10-07", "2026-10-08", "2026-10-09", "2026-10-10", "2026-10-11"];
const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function weekTabs(todayIndex: number): WeekDayTab[] {
  return DATES.map((date, i) => ({
    date,
    day: DAY_NAMES[i] as string,
    dayNumber: String(5 + i),
    label: `Day ${date}${i === todayIndex ? ", today" : ""}`,
    minutesText: i === 2 ? "Rest" : "45 min",
    isToday: i === todayIndex,
    isPast: i < todayIndex,
    complete: i === 0,
  }));
}

describe("WeekDays (day selector)", () => {
  it("opens on today and shows only that day's panel", () => {
    render(<WeekDays days={weekTabs(3)} panels={Object.fromEntries(DATES.map((d) => [d, <p key={d}>Sessions on {d}</p>]))} initialDate="2026-10-08" />);
    const tabs = screen.getAllByRole("tab");
    expect(tabs).toHaveLength(7);
    const today = screen.getByRole("tab", { name: "Day 2026-10-08, today" });
    expect(today.getAttribute("aria-selected")).toBe("true");
    expect(today.tabIndex).toBe(0);
    expect(tabs.filter((t) => t.tabIndex === 0)).toHaveLength(1);
    expect(screen.getByRole("tabpanel").textContent).toBe("Sessions on 2026-10-08");
    expect(within(today).getByText("Today")).toBeTruthy();
  });

  it("moves with the arrow keys, Home and End (roving focus) and selects on click", () => {
    render(<WeekDays days={weekTabs(0)} panels={Object.fromEntries(DATES.map((d) => [d, <p key={d}>Sessions on {d}</p>]))} initialDate="2026-10-05" />);
    const list = screen.getByRole("tablist", { name: "Days of this week" });
    fireEvent.keyDown(list, { key: "ArrowRight" });
    expect(document.activeElement?.getAttribute("data-date")).toBe("2026-10-06");
    expect(screen.getByRole("tabpanel").textContent).toBe("Sessions on 2026-10-06");
    fireEvent.keyDown(list, { key: "End" });
    expect(screen.getByRole("tabpanel").textContent).toBe("Sessions on 2026-10-11");
    fireEvent.keyDown(list, { key: "ArrowRight" });
    expect(screen.getByRole("tabpanel").textContent).toBe("Sessions on 2026-10-05");
    fireEvent.keyDown(list, { key: "ArrowLeft" });
    expect(screen.getByRole("tabpanel").textContent).toBe("Sessions on 2026-10-11");
    fireEvent.keyDown(list, { key: "Home" });
    expect(screen.getByRole("tabpanel").textContent).toBe("Sessions on 2026-10-05");
    fireEvent.click(screen.getByRole("tab", { name: "Day 2026-10-09" }));
    expect(screen.getByRole("tabpanel").textContent).toBe("Sessions on 2026-10-09");
  });
});

describe("PlanSetupForm", () => {
  const props = {
    mode: "create" as const,
    subjects: [
      { subjectId: "s-maths", name: "Mathematics", detail: "O-Level" },
      { subjectId: "s-chem", name: "Chemistry" },
    ],
    selectedSubjectIds: ["s-maths", "s-chem"],
    examDate: "2026-11-02",
    examHint: "From your target examination: November 2026 (provisional date).",
    minExamDate: "2026-10-06",
    maxExamDate: "2029-10-05",
    availability: { mon: 60, tue: 60, wed: 60, thu: 60, fri: 45, sat: 90, sun: 45 },
    maxDailyMinutes: 600,
  };

  it("prefills subjects, the exam date and availability, and totals the week", () => {
    const { action } = recordingAction(null);
    render(<PlanSetupForm {...props} action={action} />);
    expect((screen.getByRole("checkbox", { name: /Mathematics/ }) as HTMLInputElement).checked).toBe(true);
    expect((screen.getByLabelText(/Exam date/) as HTMLInputElement).value).toBe("2026-11-02");
    expect(screen.getByText("From your target examination: November 2026 (provisional date).")).toBeTruthy();
    expect((screen.getByLabelText("Monday (minutes)") as HTMLInputElement).value).toBe("60");
    expect(screen.getByText(/Total:/).textContent).toBe("Total: 7 hours a week");
  });

  it("steps minutes with the − / + buttons within 0 and the daily maximum", () => {
    const { action } = recordingAction(null);
    render(<PlanSetupForm {...props} availability={{ ...props.availability, sun: 0, sat: 600 }} action={action} />);
    fireEvent.click(screen.getByRole("button", { name: "More time on Monday" }));
    expect((screen.getByLabelText("Monday (minutes)") as HTMLInputElement).value).toBe("75");
    fireEvent.click(screen.getByRole("button", { name: "Less time on Friday" }));
    expect((screen.getByLabelText("Friday (minutes)") as HTMLInputElement).value).toBe("30");
    expect((screen.getByRole("button", { name: "Less time on Sunday" }) as HTMLButtonElement).disabled).toBe(true);
    expect((screen.getByRole("button", { name: "More time on Saturday" }) as HTMLButtonElement).disabled).toBe(true);
    fireEvent.change(screen.getByLabelText("Tuesday (minutes)"), { target: { value: "" } });
    expect(screen.getByText(/Total:/).textContent).toBe("Total: 13 hours 45 minutes a week");
  });

  it("submits the chosen subjects, exam date and minutes, then shows field errors and keeps the input", async () => {
    const { action, calls } = recordingAction({
      ok: false,
      error: { code: "VALIDATION", message: "Please check the highlighted fields and try again.", fieldErrors: { "availability.mon": ["At most 600 minutes a day."] } },
    });
    render(<PlanSetupForm {...props} action={action} />);
    fireEvent.click(screen.getByRole("checkbox", { name: /Chemistry/ }));
    fireEvent.change(screen.getByLabelText("Monday (minutes)"), { target: { value: "700" } });
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Create my study plan" }));
    });
    await waitFor(() => expect(calls).toHaveLength(1));
    const sent = calls[0] as FormData;
    expect(sent.getAll("subjectId")).toEqual(["s-maths"]);
    expect(sent.get("examDate")).toBe("2026-11-02");
    expect(sent.get("availability.mon")).toBe("700");
    expect(sent.get("availability.sat")).toBe("90");
    expect(sent.get("mode")).toBe("create");
    expect(await screen.findByText("At most 600 minutes a day.")).toBeTruthy();
    expect(screen.getByLabelText("Monday (minutes)").getAttribute("aria-invalid")).toBe("true");
    expect((screen.getByLabelText("Monday (minutes)") as HTMLInputElement).value).toBe("700");
    expect((screen.getByRole("checkbox", { name: /Chemistry/ }) as HTMLInputElement).checked).toBe(false);
  });
});

describe("PlanItemActions", () => {
  it("offers Done and Skip for an open item and sends the tick", async () => {
    const { action, calls } = recordingAction({ ok: true, data: { message: "Marked as done." } });
    render(<PlanItemActions itemId="item-1" status="PENDING" itemTitle="Algebra" action={action} />);
    expect(screen.queryByRole("button", { name: /Undo/ })).toBeNull();
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Mark Algebra as done" }));
    });
    await waitFor(() => expect(calls).toHaveLength(1));
    expect(calls[0]?.get("itemId")).toBe("item-1");
    expect(calls[0]?.get("status")).toBe("DONE");
    expect((await screen.findByRole("status")).textContent).toBe("Marked as done.");
  });

  it("offers Undo for a done or skipped item and shows errors", async () => {
    const { action, calls } = recordingAction({ ok: false, error: { code: "NOT_FOUND", message: "That plan item doesn't exist." } });
    render(<PlanItemActions itemId="item-2" status="SKIPPED" itemTitle="Geometry" action={action} />);
    expect(screen.queryByRole("button", { name: /Skip/ })).toBeNull();
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Undo: put Geometry back in your plan" }));
    });
    await waitFor(() => expect(calls[0]?.get("status")).toBe("PENDING"));
    expect(await screen.findByText("That plan item doesn't exist.")).toBeTruthy();
  });
});

describe("AdaptPlanButton", () => {
  it("announces the result of updating the plan", async () => {
    const { action, calls } = recordingAction({ ok: true, data: { message: "Your plan was updated from your latest results." } });
    render(<AdaptPlanButton action={action} />);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Update my plan" }));
    });
    expect(calls).toHaveLength(1);
    expect(await screen.findByText("Your plan was updated from your latest results.")).toBeTruthy();
  });
});

describe("TodayPlanCard", () => {
  const view = (overrides: Partial<PlanItemView> = {}): PlanItemView => ({
    id: "i1",
    date: "2026-10-05",
    sortOrder: 0,
    subjectId: "0199a1d2-0000-7000-8000-000000000001",
    subjectName: "Mathematics",
    topicId: "0199a1d2-0000-7000-8000-000000000002",
    topicName: "Algebra",
    lessonId: null,
    lessonTitle: null,
    assessmentId: null,
    assessmentTitle: null,
    activityType: "PRACTICE",
    reason: "WEAK_TOPIC",
    plannerReason: "WEAK_TOPIC_PRACTICE",
    masteryScore: 35,
    daysToExam: null,
    targetMinutes: 20,
    targetQuestions: 10,
    completedQuestions: 0,
    status: "PENDING",
    completedAt: null,
    ...overrides,
  });

  it("lists today's sessions with why, size, a start link and the minutes done", () => {
    const today: TodayPlan = {
      date: "2026-10-05",
      items: [view(), view({ id: "i2", sortOrder: 1, status: "DONE", activityType: "LESSON", lessonId: "l1", lessonTitle: "Algebra: lesson 1", plannerReason: "NEW_TOPIC_LESSON", targetQuestions: null })],
      availableMinutes: 60,
      plannedMinutes: 40,
      doneMinutes: 20,
    };
    const { action } = recordingAction(null);
    render(<TodayPlanCard today={today} itemAction={action} />);
    expect(screen.getByRole("heading", { name: "Today" })).toBeTruthy();
    expect(screen.getByText("Weak topic: Algebra (35% mastery).")).toBeTruthy();
    expect(screen.getByText("20 min · 10 questions")).toBeTruthy();
    const start = screen.getByRole("link", { name: "Start: Algebra" });
    expect(start.getAttribute("href")).toContain("/app/practice?");
    const rows = screen.getAllByRole("listitem");
    expect(within(rows[1] as HTMLElement).getByText("Done")).toBeTruthy();
    expect(within(rows[0] as HTMLElement).getByRole("button", { name: "Mark Algebra as done" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Undo: put Algebra: lesson 1 back in your plan" })).toBeTruthy();
    expect(screen.getByRole("progressbar").getAttribute("aria-valuenow")).toBe("20");
  });

  it("says so honestly on a rest day", () => {
    const { action } = recordingAction(null);
    render(<TodayPlanCard today={{ date: "2026-10-07", items: [], availableMinutes: 0, plannedMinutes: 0, doneMinutes: 0 }} itemAction={action} />);
    expect(screen.getByText(/No study time on Wednesdays/)).toBeTruthy();
    expect(screen.queryByRole("progressbar")).toBeNull();
  });
});

describe("WeekPlanSection, PlanOverview and PlanReasons", () => {
  const item = (overrides: Partial<PlanItemView>): PlanItemView => ({
    id: "w1",
    date: "2026-10-07",
    sortOrder: 0,
    subjectId: "0199a1d2-0000-7000-8000-000000000001",
    subjectName: "Mathematics",
    topicId: "0199a1d2-0000-7000-8000-000000000002",
    topicName: "Calculus",
    lessonId: null,
    lessonTitle: null,
    assessmentId: null,
    assessmentTitle: null,
    activityType: "PRACTICE",
    reason: "WEAK_TOPIC",
    plannerReason: "WEAK_TOPIC_PRACTICE",
    masteryScore: 32,
    daysToExam: 40,
    targetMinutes: 30,
    targetQuestions: 15,
    completedQuestions: 0,
    status: "PENDING",
    completedAt: null,
    ...overrides,
  });
  const availability = { mon: 60, tue: 45, wed: 60, thu: 0, fri: 30, sat: 90, sun: 30 };
  const items = [item({}), item({ id: "w2", date: "2026-10-09", topicName: "Algebra", plannerReason: "NEW_TOPIC_LESSON", activityType: "LESSON", lessonId: "l1", lessonTitle: "Algebra: lesson 1", masteryScore: null, targetQuestions: null })];
  const plan: PlanSummary = {
    id: "p1",
    startsOn: "2026-10-07",
    endsOn: "2026-11-03",
    examDate: "2026-11-16",
    examDateSource: "TARGET_SESSION",
    exam: { name: "November 2026", isProvisional: true, isDemo: false },
    daysUntilExam: 40,
    mode: "EXAM_PREP",
    availability,
    dailyTargetMinutes: 45,
    weeklyTargetMinutes: 315,
    generatedAt: new Date("2026-10-07T06:00:00.000Z"),
    lastAdaptedAt: null,
    subjects: [{ subjectId: "0199a1d2-0000-7000-8000-000000000001", name: "Mathematics" }],
  };

  it("shows the week with today read-only (ticked in Today) and other days interactive", () => {
    const week = buildWeek({ weekStart: "2026-10-05", today: "2026-10-07", items, availability, planStart: "2026-10-07", planEnd: "2026-11-03" });
    const { action } = recordingAction(null);
    render(<WeekPlanSection week={week} planStart={plan.startsOn} planEnd={plan.endsOn} itemAction={action} />);
    expect(screen.getByRole("heading", { name: "Week of 5 October 2026" })).toBeTruthy();
    expect(screen.getAllByRole("tab")).toHaveLength(7);
    const todayPanel = screen.getByRole("tabpanel");
    expect(within(todayPanel).getByText("Calculus")).toBeTruthy();
    expect(within(todayPanel).queryByRole("button", { name: /as done/ })).toBeNull();
    expect(within(todayPanel).getByRole("link", { name: /Start or tick today/ }).getAttribute("href")).toBe("#today");
    expect(screen.queryByRole("link", { name: "Previous week" })).toBeNull();
    expect(screen.getByRole("link", { name: "Next week" }).getAttribute("href")).toBe("/app/plan?week=2026-10-12");
    expect(screen.queryByRole("link", { name: "This week" })).toBeNull();

    fireEvent.click(screen.getByRole("tab", { name: /9 October/ }));
    const friday = screen.getByRole("tabpanel");
    expect(within(friday).getByRole("button", { name: "Mark Algebra: lesson 1 as done" })).toBeTruthy();
    expect(within(friday).getByRole("link", { name: "Start: Algebra: lesson 1" }).getAttribute("href")).toBe("/app/lessons/l1");

    fireEvent.click(screen.getByRole("tab", { name: /5 October/ }));
    expect(screen.getByRole("tabpanel").textContent).toContain("Your plan starts on");
    fireEvent.click(screen.getByRole("tab", { name: /8 October/ }));
    expect(screen.getByRole("tabpanel").textContent).toContain("A rest day");
  });

  it("summarises the plan with real values and explains it from the items", () => {
    const week = buildWeek({ weekStart: "2026-10-05", today: "2026-10-07", items, availability, planStart: "2026-10-07", planEnd: "2026-11-03" });
    render(
      <>
        <PlanOverview plan={plan} week={week} />
        <PlanReasons plan={plan} upcoming={items} timeZone="Africa/Harare" />
      </>,
    );
    expect(screen.getByText("40")).toBeTruthy();
    expect(screen.getByText("16 November 2026 (provisional date)")).toBeTruthy();
    expect(screen.getByText("This week")).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Why this plan" })).toBeTruthy();
    expect(screen.getByText(/5 hours 15 minutes a week/)).toBeTruthy();
    expect(screen.getByText("Focused practice where your mastery is lowest: Calculus (32%).")).toBeTruthy();
    expect(screen.getByText("Lessons in syllabus order, then practice: Algebra.")).toBeTruthy();
  });

  it("never shows a countdown without an exam date", () => {
    const week = buildWeek({ weekStart: "2026-10-05", today: "2026-10-07", items: [], availability, planStart: "2026-10-07", planEnd: "2026-11-03" });
    render(<PlanOverview plan={{ ...plan, examDate: null, examDateSource: "NONE", exam: null, daysUntilExam: null, mode: "MAINTENANCE" }} week={week} />);
    expect(screen.getByText("None")).toBeTruthy();
    expect(screen.getByText("Rolling four-week plan")).toBeTruthy();
  });
});
