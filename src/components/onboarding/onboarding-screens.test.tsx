/** @vitest-environment jsdom */
import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import type { StepView } from "@/server/onboarding/service";
import { DiagnosticFindings } from "./DiagnosticFindings";
import { DiagnosticTopicResults } from "./DiagnosticTopicResults";
import type { OnboardingFormAction } from "./form-state";
import { StartingTopics } from "./StartingTopics";
import { StepScreen } from "./StepScreen";

afterEach(() => cleanup());

const noop: OnboardingFormAction = async () => null;

const option = (id: string, label: string, available = true) => ({ id, label, description: null, available });

const VIEWS: StepView[] = [
  { step: "country", countries: [option("zw", "Zimbabwe"), option("zm", "Zambia", false)], selectedId: "zw" },
  { step: "board", countryName: "Zimbabwe", boards: [option("b1", "ZIMSEC"), option("b2", "Cambridge")], selectedId: null },
  {
    step: "level",
    boardName: "Cambridge",
    groups: [
      { levelId: "l1", levelName: "O-Level", options: [option("q1", "Cambridge IGCSE"), option("q3", "Cambridge O Level", false)] },
      { levelId: "l2", levelName: "A-Level", options: [option("q2", "Cambridge International AS & A Level")] },
    ],
    selectedId: "q1",
  },
  { step: "year", qualificationName: "Cambridge IGCSE", primary: [option("y1", "Form 3"), option("y2", "Form 4")], others: [option("y5", "Lower Sixth")], selectedId: "y5", school: null },
  {
    step: "subjects",
    qualificationName: "Cambridge IGCSE",
    groups: [{ categoryId: "c1", categoryName: "Sciences", subjects: [{ id: "s1", name: "Chemistry", code: "0620" }] }],
    comingSoon: [{ id: "s9", name: "Music", code: null }],
    selectedIds: ["s1"],
    maxSubjects: 20,
  },
  {
    step: "exam",
    qualificationName: "Cambridge IGCSE",
    sessions: [{ id: "e1", name: "October/November 2027", startsOn: "2027-10-20", isProvisional: true, isDemo: false, daysUntil: 379 }],
    selectedId: null,
    answered: true,
  },
  { step: "ability", selected: "ADVANCED" },
  { step: "grade", qualificationName: "Cambridge IGCSE", grades: ["A*", "A", "B"], selected: null, answered: false },
  { step: "goal", options: [15, 30, 45, 60, 90], defaultMinutes: 45, selected: null, min: 5, max: 600 },
  {
    step: "finish",
    summary: {
      country: "Zimbabwe",
      board: "Cambridge",
      qualification: "Cambridge IGCSE",
      yearGroup: "Form 4",
      subjects: ["Chemistry", "Physics"],
      exam: { name: "October/November 2027", startsOn: "2027-10-20", isProvisional: true, isDemo: false },
      abilityLevel: "INTERMEDIATE",
      targetGrade: null,
      dailyGoalMinutes: 45,
    },
    diagnosticIncluded: true,
    fullAccess: true,
  },
];

describe("StepScreen (§5 one small screen per question)", () => {
  it.each(VIEWS.map((view) => [view.step, view] as const))("renders the %s screen with one heading, progress and its controls", (_step, view) => {
    render(<StepScreen view={view} saveAction={noop} finishAction={noop} />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("progressbar")).toBeTruthy();
    if (view.step !== "finish") {
      expect(screen.getByRole("button", { name: "Continue" })).toBeTruthy();
      expect(document.querySelector('input[type="hidden"][name="step"]')?.getAttribute("value")).toBe(view.step);
    }
  });

  it.each(VIEWS.filter((view) => view.step !== "finish" && view.step !== "subjects").map((view) => [view.step, view] as const))(
    "links every answer group of the %s screen to the screen's error region (aria-describedby)",
    (step, view) => {
      render(<StepScreen view={view} saveAction={noop} finishAction={noop} />);
      const errorId = `onboarding-${step}-error`;
      expect(document.getElementById(errorId)).not.toBeNull();
      const groups = document.querySelectorAll("fieldset");
      expect(groups.length).toBeGreaterThan(0);
      for (const group of Array.from(groups)) expect((group.getAttribute("aria-describedby") ?? "").split(" ")).toContain(errorId);
      if (step === "goal") {
        const own = screen.getByRole("spinbutton", { name: /Or enter your own/ });
        expect((own.getAttribute("aria-describedby") ?? "").split(" ")).toContain(errorId);
      }
    },
  );

  it("a refused answer is announced and becomes the description of the answer group", async () => {
    const refuse: OnboardingFormAction = async () => ({ ok: false, error: { code: "VALIDATION", message: "Check your answer.", fieldErrors: { countryId: ["Choose your country."] } } });
    render(<StepScreen view={VIEWS[0] as StepView} saveAction={refuse} finishAction={noop} />);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    });
    const alert = await screen.findByRole("alert");
    expect(alert.textContent).toContain("Choose your country.");
    const group = screen.getByRole("group", { name: /Your country/ });
    const description = (group.getAttribute("aria-describedby") ?? "")
      .split(" ")
      .map((id) => document.getElementById(id)?.textContent ?? "")
      .join(" ");
    expect(description).toContain("Choose your country.");
  });

  it("pre-selects the saved or suggested answer and keeps coming-soon options disabled", () => {
    render(<StepScreen view={VIEWS[0] as StepView} saveAction={noop} finishAction={noop} />);
    expect((screen.getByRole("radio", { name: "Zimbabwe" }) as HTMLInputElement).checked).toBe(true);
    const zambia = screen.getByRole("radio", { name: /Zambia/ }) as HTMLInputElement;
    expect(zambia.disabled).toBe(true);
    expect(screen.getByText("Coming soon")).toBeTruthy();
    expect(screen.queryByRole("link", { name: "Back" })).toBeNull();
    expect(screen.getByText("Step 1 of 10")).toBeTruthy();
  });

  it("groups qualifications by level and opens the other years when the saved year is there", () => {
    const { unmount } = render(<StepScreen view={VIEWS[2] as StepView} saveAction={noop} finishAction={noop} />);
    // Legends carry a visually hidden "(required)".
    expect(screen.getByRole("group", { name: /^O-Level/ })).toBeTruthy();
    expect(screen.getByRole("group", { name: /^A-Level/ })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Back" }).getAttribute("href")).toBe("/onboarding/board");
    unmount();
    render(<StepScreen view={VIEWS[3] as StepView} saveAction={noop} finishAction={noop} />);
    expect(document.querySelector("details")?.open).toBe(true);
    expect((screen.getByRole("radio", { name: "Lower Sixth" }) as HTMLInputElement).checked).toBe(true);
  });

  it("labels provisional exam dates and keeps 'not sure yet' as the saved answer", () => {
    render(<StepScreen view={VIEWS[5] as StepView} saveAction={noop} finishAction={noop} />);
    expect(screen.getByText(/Starts 20 October 2027 · in 379 days · Provisional date/)).toBeTruthy();
    expect((screen.getByRole("radio", { name: /I'm not sure yet/ }) as HTMLInputElement).checked).toBe(true);
  });

  it("offers grades with 'No target yet' pre-selected, and the suggested daily goal", () => {
    const { unmount } = render(<StepScreen view={VIEWS[7] as StepView} saveAction={noop} finishAction={noop} />);
    expect((screen.getByRole("radio", { name: "No target yet" }) as HTMLInputElement).checked).toBe(true);
    expect(screen.getByRole("radio", { name: "A*" })).toBeTruthy();
    unmount();
    render(<StepScreen view={VIEWS[8] as StepView} saveAction={noop} finishAction={noop} />);
    expect((screen.getByRole("radio", { name: /45 min a day/ }) as HTMLInputElement).checked).toBe(true);
    expect(screen.getByText("Suggested")).toBeTruthy();
    expect(screen.getByRole("spinbutton", { name: /Or enter your own/ })).toBeTruthy();
  });

  it("summarises the answers with change links and offers the diagnostic first", () => {
    render(<StepScreen view={VIEWS[9] as StepView} saveAction={noop} finishAction={noop} />);
    const summary = screen.getByRole("region", { name: "Your answers" });
    expect(within(summary).getByText("Chemistry, Physics")).toBeTruthy();
    expect(within(summary).getByText("No target yet")).toBeTruthy();
    expect(within(summary).getByText(/Provisional date/)).toBeTruthy();
    expect(within(summary).getByRole("link", { name: "Change subjects" }).getAttribute("href")).toBe("/onboarding/subjects");
    const buttons = screen.getAllByRole("button");
    expect(buttons[0]?.textContent).toContain("Start the diagnostic");
    expect(screen.getByRole("link", { name: "Back" }).getAttribute("href")).toBe("/onboarding/goal");
  });

  it("offers an optional school search on the year screen and keeps next on every form and link", () => {
    const school = { id: "11111111-1111-4111-8111-111111111111", name: "Hillside High School", place: "Bulawayo" };
    const other = { id: "22222222-2222-4222-8222-222222222222", name: "Hillcrest College", place: null };
    render(
      <StepScreen
        view={{
          step: "year",
          qualificationName: "ZIMSEC O Level",
          primary: [option("y1", "Form 3")],
          others: [],
          selectedId: null,
          school: { selected: school, query: "hill", results: [other], minQueryLength: 2 },
        }}
        saveAction={noop}
        finishAction={noop}
        next="/app/classes/invite/t1"
      />,
    );
    // The search is a separate GET form (forms cannot nest) that keeps the pending destination.
    const search = screen.getByRole("search", { name: "Find your school" });
    expect(search.getAttribute("method")).toBe("get");
    expect(search.getAttribute("action")).toBe("/onboarding/year");
    expect(within(search).getByLabelText("Your school (optional)").getAttribute("name")).toBe("school");
    expect(search.querySelector('input[type="hidden"][name="next"]')?.getAttribute("value")).toBe("/app/classes/invite/t1");
    // Matches are optional radio cards inside the step form, the earlier choice first and pre-selected.
    const group = screen.getByRole("group", { name: "Your school (optional)" });
    const radios = within(group).getAllByRole("radio") as HTMLInputElement[];
    expect(radios.map((radio) => radio.value)).toEqual([school.id, other.id, ""]);
    expect(radios[0]?.checked).toBe(true);
    expect(radios.every((radio) => !radio.required)).toBe(true);
    const stepForm = radios[0]!.closest("form")!;
    expect(stepForm.querySelector('input[type="hidden"][name="next"]')?.getAttribute("value")).toBe("/app/classes/invite/t1");
    expect(screen.getByRole("link", { name: "Back" }).getAttribute("href")).toBe("/onboarding/level?next=%2Fapp%2Fclasses%2Finvite%2Ft1");
  });

  it("explains an empty year list instead of asking an impossible question", () => {
    render(
      <StepScreen view={{ step: "year", qualificationName: "Test", primary: [], others: [], selectedId: null, school: null }} saveAction={noop} finishAction={noop} />,
    );
    expect(screen.getByText("No years to choose from yet")).toBeTruthy();
    expect(document.querySelector('input[type="hidden"][name="yearGroupId"]')?.getAttribute("value")).toBe("");
  });
});

describe("diagnostic report components (§52)", () => {
  const row = (topicId: string, name: string, percent: number | null, finding: "STRENGTH" | "GAP" | "MIXED" | "PENDING") => ({
    topicId,
    name,
    questionCount: 2,
    answeredCount: 2,
    pendingCount: percent === null ? 2 : 0,
    marksAwarded: percent === null ? 0 : Math.round((percent / 100) * 4),
    marksAvailable: percent === null ? 0 : 4,
    percent,
    finding,
    mastery: percent === null ? null : { score: percent / 2, band: "DEVELOPING" as const },
  });

  it("shows marks, evidence and starting mastery by topic, and the topics not covered", () => {
    render(<DiagnosticTopicResults topics={[row("t1", "Algebra", 75, "STRENGTH"), row("t2", "Geometry", null, "PENDING")]} notCovered={[{ id: "t3", name: "Statistics" }]} />);
    expect(screen.getByRole("progressbar", { name: "Algebra" }).getAttribute("aria-valuetext")).toBe("3 of 4 marks");
    expect(screen.getByRole("progressbar", { name: "Geometry" }).getAttribute("aria-valuetext")).toBe("No data yet");
    expect(screen.getByText("Based on 2 questions (2 answers still being marked)")).toBeTruthy();
    expect(screen.getByText("Developing")).toBeTruthy();
    expect(screen.getByText(/Statistics/)).toBeTruthy();
  });

  it("lists strengths and gaps, saying so honestly when there are none", () => {
    render(<DiagnosticFindings strengths={[]} gaps={[row("t2", "Geometry", 25, "GAP")]} />);
    expect(screen.getByText(/No clear strengths yet/)).toBeTruthy();
    expect(within(screen.getByRole("region", { name: "Gaps to work on" })).getByText("Geometry")).toBeTruthy();
  });

  it("links each starting topic to its lesson and a practice session", () => {
    render(
      <StartingTopics
        subjectId="sub"
        topics={[
          { topicId: "t2", name: "Geometry", reason: "GAP", percent: 25, lesson: { lessonId: "les1", title: "Angles and lines" } },
          { topicId: "t3", name: "Statistics", reason: "NOT_COVERED", percent: null, lesson: null },
        ]}
      />,
    );
    expect(screen.getByRole("link", { name: /Angles and lines/ }).getAttribute("href")).toBe("/app/lessons/les1");
    expect(screen.getByRole("link", { name: "Practise 10 questions on Geometry" }).getAttribute("href")).toBe(
      "/app/practice?subjectId=sub&topicId=t2&count=10&difficulty=ADAPTIVE&origin=RECOMMENDATION",
    );
    expect(screen.getByText(/You scored 25%/)).toBeTruthy();
    expect(screen.getByText(/didn't ask about this topic/)).toBeTruthy();
  });
});
