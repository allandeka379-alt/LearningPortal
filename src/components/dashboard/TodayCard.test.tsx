import type { ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

import { TodayCard } from "./TodayCard";

const today = "2026-10-06";

describe("TodayCard", () => {
  it("does not call the minutes target met when only the streak day is credited", () => {
    const markup = renderToStaticMarkup(
      <TodayCard today={today} dailyTarget={{ minutes: 30, source: "PLAN", minutesStudiedToday: 1, goalMet: true }} plan={{ items: [] }} />,
    );
    expect(markup).toContain("1 min of 30 min");
    expect(markup).toContain("Today counts towards your streak");
    expect(markup).not.toContain("target reached");
    expect(markup).not.toContain("Daily goal met");
  });

  it("says the target is reached once the minutes are studied", () => {
    const markup = renderToStaticMarkup(
      <TodayCard today={today} dailyTarget={{ minutes: 30, source: "GOAL", minutesStudiedToday: 32, goalMet: true }} plan={null} />,
    );
    expect(markup).toContain("Today’s target reached");
    expect(markup).toContain("Create my study plan");
  });

  it("shows neither note before any activity", () => {
    const markup = renderToStaticMarkup(
      <TodayCard today={today} dailyTarget={{ minutes: 30, source: "DEFAULT", minutesStudiedToday: 0, goalMet: false }} plan={null} />,
    );
    expect(markup).not.toContain("streak");
    expect(markup).not.toContain("target reached");
  });
});
