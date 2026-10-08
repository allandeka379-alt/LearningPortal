/** @vitest-environment jsdom */
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { formatBoardValue, leaderboardHref } from "./labels";
import { LeaderboardTable } from "./LeaderboardTable";
import { LeaderboardTabs } from "./LeaderboardTabs";

afterEach(() => cleanup());

describe("labels", () => {
  it("formats values per metric and builds board links", () => {
    expect(formatBoardValue("WEEKLY_XP", 1240)).toBe("1,240 XP");
    expect(formatBoardValue("WEEKLY_QUESTIONS", 1)).toBe("1 question");
    expect(formatBoardValue("STREAK", 12)).toBe("12 days");
    expect(formatBoardValue("MOCK_AVERAGE", 74.5)).toBe("74.5%");
    expect(leaderboardHref({ metric: "STREAK" })).toBe("/app/leaderboard?metric=STREAK");
    expect(leaderboardHref({ metric: "WEEKLY_XP", scope: "CLASS", scopeId: "c1" })).toBe("/app/leaderboard?metric=WEEKLY_XP&scope=CLASS&scopeId=c1");
  });
});

describe("LeaderboardTabs", () => {
  it("marks the current metric and scope and only offers the student's own scopes", () => {
    render(
      <LeaderboardTabs
        metric="WEEKLY_XP"
        metrics={["WEEKLY_XP", "STREAK"]}
        scope={{ scope: "CLASS", scopeId: "c1" }}
        scopes={[
          { scope: "GLOBAL", scopeId: null, label: "Everyone" },
          { scope: "CLASS", scopeId: "c1", label: "Form 4A Maths" },
        ]}
      />,
    );
    const measures = within(screen.getByRole("navigation", { name: "Leaderboard measure" }));
    expect(measures.getByRole("link", { name: "XP this week" }).getAttribute("aria-current")).toBe("page");
    expect(measures.getByRole("link", { name: "Study streak" }).getAttribute("aria-current")).toBeNull();
    const scopes = within(screen.getByRole("navigation", { name: "Who you're compared with" }));
    expect(scopes.getAllByRole("link")).toHaveLength(2);
    const current = scopes.getByRole("link", { name: /Form 4A Maths/ });
    expect(current.getAttribute("aria-current")).toBe("page");
    expect(current.getAttribute("href")).toBe("/app/leaderboard?metric=WEEKLY_XP&scope=CLASS&scopeId=c1");
  });
});

describe("LeaderboardTable", () => {
  const rows = [
    { rank: 1, name: "Tendai M.", value: 300, isMe: false },
    { rank: 1, name: "Student #4821", value: 300, isMe: false },
    { rank: 2, name: "swiftkudu482", value: 120, isMe: false },
  ];

  it("shows dense ranks and the student's own position outside the top", () => {
    render(
      <LeaderboardTable
        metric="WEEKLY_XP"
        rows={rows}
        me={{ rank: 7, value: 40, inTop: false, lastWeekRank: 9 }}
        myName="Rudo C."
        total={25}
        emptyTitle="Empty"
        emptyDescription="Empty"
      />,
    );
    const top = within(screen.getByRole("list", { name: "Top 3 of 25" }));
    expect(top.getAllByRole("listitem").map((li) => li.textContent)).toEqual(["#1Tendai M.300 XP", "#1Student #4821300 XP", "#2swiftkudu482120 XP"]);
    const mine = within(screen.getByRole("list", { name: "Your position" }));
    const row = mine.getByRole("listitem");
    expect(row.getAttribute("aria-current")).toBe("true");
    expect(row.textContent).toContain("#7");
    expect(row.textContent).toContain("Rudo C.(you)");
    expect(screen.getByText("Last week #9")).toBeTruthy();
  });

  it("highlights the student inside the top without repeating them", () => {
    render(
      <LeaderboardTable
        metric="STREAK"
        rows={[{ rank: 1, name: "Rudo C.", value: 12, isMe: true }]}
        me={{ rank: 1, value: 12, inTop: true, lastWeekRank: null }}
        myName="Rudo C."
        total={1}
        emptyTitle="Empty"
        emptyDescription="Empty"
      />,
    );
    expect(screen.queryByRole("list", { name: "Your position" })).toBeNull();
    expect(screen.getByRole("listitem").getAttribute("aria-current")).toBe("true");
    expect(screen.getByText("12 days")).toBeTruthy();
  });

  it("has an honest empty state", () => {
    render(<LeaderboardTable metric="MOCK_AVERAGE" rows={[]} me={null} myName="x" total={0} emptyTitle="No scores on this board yet" emptyDescription="Two mocks needed." />);
    expect(screen.getByText("No scores on this board yet")).toBeTruthy();
  });
});
