/** @vitest-environment jsdom */
import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import type { FormActionState } from "@/components/student/action-state";
import { AchievementGrid, type AchievementGridItem } from "./AchievementGrid";
import { WeeklyGoalCard } from "./WeeklyGoalCard";
import { WeeklyGoalForm } from "./WeeklyGoalForm";

afterEach(() => cleanup());

const earned: AchievementGridItem = {
  achievementId: "a1",
  name: "Three in a row",
  description: "Met your daily goal three days running.",
  tier: 1,
  iconKey: "flame",
  xpReward: 30,
  earned: true,
  unlockedAt: new Date("2026-10-05T08:00:00Z"),
  criteria: "Meet your daily goal 3 days in a row.",
  progress: null,
};

const locked: AchievementGridItem = {
  achievementId: "a2",
  name: "Century",
  description: "Answered 100 practice questions.",
  tier: 2,
  iconKey: "target",
  xpReward: 50,
  earned: false,
  unlockedAt: null,
  criteria: "Answer 100 questions.",
  progress: { current: 40, target: 100, unit: "questions" },
};

describe("AchievementGrid", () => {
  it("shows earned badges with their date and locked badges with the rule and real progress", () => {
    render(<AchievementGrid items={[earned, locked]} timeZone="Africa/Harare" emptyTitle="None" emptyDescription="None yet" action={(item) => (item.earned ? <button type="button">Share {item.name}</button> : null)} />);
    const items = screen.getAllByRole("listitem");
    expect(within(items[0]!).getByText("Earned 5 October 2026")).toBeTruthy();
    expect(within(items[0]!).getByRole("button", { name: "Share Three in a row" })).toBeTruthy();
    expect(within(items[1]!).getByText("Locked")).toBeTruthy();
    expect(within(items[1]!).getByText("Answer 100 questions.")).toBeTruthy();
    expect(within(items[1]!).getByText("Worth 50 XP")).toBeTruthy();
    const bar = within(items[1]!).getByRole("progressbar");
    expect(bar.getAttribute("aria-valuetext")).toBe("40 of 100 questions");
    expect(within(items[1]!).queryByRole("button")).toBeNull();
  });

  it("has an honest empty state", () => {
    render(<AchievementGrid items={[]} timeZone="Africa/Harare" emptyTitle="No badges yet" emptyDescription="Badges come from real study." />);
    expect(screen.getByText("No badges yet")).toBeTruthy();
    expect(screen.queryByRole("list")).toBeNull();
  });
});

describe("WeeklyGoalCard", () => {
  const goal = {
    weekStart: "2026-10-05",
    daysMet: 2,
    goalDays: 5,
    achieved: false,
    daysLeft: 6,
    stillPossible: true,
    minutes: { target: 225, source: "DAILY_GOAL" as const, done: 90 },
    xp: { target: null, done: 120 },
  };

  it("shows days, study time and XP against the targets", () => {
    render(<WeeklyGoalCard goal={goal} />);
    const bars = screen.getAllByRole("progressbar");
    expect(bars.map((bar) => bar.getAttribute("aria-valuetext"))).toEqual(["2 of 5 days", "1 h 30 min of 3 h 45 min"]);
    expect(screen.getByText("3 more days to go, with 6 days left this week.")).toBeTruthy();
    expect(screen.getByText(/120 XP earned this week/)).toBeTruthy();
  });

  it("celebrates quietly when the goal is met and shows the XP target when set", () => {
    render(<WeeklyGoalCard goal={{ ...goal, daysMet: 5, achieved: true, xp: { target: 300, done: 120 } }} form={<p>form here</p>} />);
    expect(screen.getByText("Weekly goal met for this week.")).toBeTruthy();
    expect(screen.getAllByRole("progressbar")[2]?.getAttribute("aria-valuetext")).toBe("120 of 300 XP");
    expect(screen.getByText("Change weekly targets")).toBeTruthy();
  });
});

describe("WeeklyGoalForm", () => {
  it("submits both targets and announces the result", async () => {
    const calls: FormData[] = [];
    const action = async (_state: FormActionState, formData: FormData): Promise<FormActionState> => {
      calls.push(formData);
      return { ok: true, data: { message: "Weekly goal saved." } };
    };
    const limits = { minutes: { min: 30, max: 3000 }, xp: { min: 50, max: 20000 } };
    render(<WeeklyGoalForm weeklyGoalMinutes={null} defaultMinutes={225} weeklyGoalXp={500} limits={limits} action={action} />);
    const minutes = screen.getByLabelText(/Weekly study time/) as HTMLInputElement;
    expect(minutes.placeholder).toBe("225");
    expect((screen.getByLabelText(/Weekly XP target/) as HTMLInputElement).value).toBe("500");
    fireEvent.change(minutes, { target: { value: "300" } });
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Save weekly goal" }));
    });
    expect(calls).toHaveLength(1);
    expect(calls[0]?.get("weeklyGoalMinutes")).toBe("300");
    expect(calls[0]?.get("weeklyGoalXp")).toBe("500");
    expect(await screen.findByText("Weekly goal saved.")).toBeTruthy();
  });

  it("shows field errors from the server", async () => {
    const action = async (): Promise<FormActionState> => ({
      ok: false,
      error: { code: "VALIDATION", message: "Please check the highlighted fields.", fieldErrors: { weeklyGoalMinutes: ["Your weekly study time must be at least 30."] } },
    });
    const limits = { minutes: { min: 30, max: 3000 }, xp: { min: 50, max: 20000 } };
    render(<WeeklyGoalForm weeklyGoalMinutes={null} defaultMinutes={225} weeklyGoalXp={null} limits={limits} action={action} />);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Save weekly goal" }));
    });
    expect(await screen.findByText("Your weekly study time must be at least 30.")).toBeTruthy();
  });
});
