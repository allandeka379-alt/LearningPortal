/** @vitest-environment jsdom */
import { act, cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { DiagnosticStartForm } from "./DiagnosticStartForm";
import { FinishForm } from "./FinishForm";
import type { OnboardingFormAction, OnboardingFormState } from "./form-state";
import { StepForm } from "./StepForm";
import { SubjectPicker } from "./SubjectPicker";

afterEach(() => cleanup());

/** A Server Action stand-in that records each submitted form and answers with `result`. */
function recordingAction(result: OnboardingFormState) {
  const calls: FormData[] = [];
  const action: OnboardingFormAction = async (_state, formData) => {
    calls.push(formData);
    return result;
  };
  return { action, calls };
}

const GROUPS = [
  {
    categoryId: "c-maths",
    categoryName: "Mathematics",
    subjects: [
      { id: "s-maths", name: "Mathematics", code: "4004" },
      { id: "s-addmaths", name: "Additional Mathematics", code: "4037" },
    ],
  },
  { categoryId: "c-sci", categoryName: "Sciences", subjects: [{ id: "s-chem", name: "Chemistry", code: null }] },
];

describe("SubjectPicker (§5 subjects)", () => {
  it("groups subjects by category with their codes, searches by name or code and keeps hidden choices selected", () => {
    render(
      <form>
        <SubjectPicker groups={GROUPS} comingSoon={[{ id: "s-music", name: "Music", code: null }]} defaultSelected={["s-chem"]} max={20} />
      </form>,
    );
    expect(screen.getByRole("group", { name: "Mathematics" })).toBeTruthy();
    expect(screen.getByText("Syllabus 4037")).toBeTruthy();
    expect(screen.getByText("1 subject chosen.")).toBeTruthy();
    expect((screen.getByRole("checkbox", { name: /Chemistry/ }) as HTMLInputElement).checked).toBe(true);
    // Coming-soon subjects are listed but never selectable.
    expect(screen.getByText("Coming soon (1)")).toBeTruthy();
    expect(screen.queryByRole("checkbox", { name: /Music/ })).toBeNull();

    fireEvent.click(screen.getByRole("checkbox", { name: /^Mathematics/ }));
    expect(screen.getByText("2 subjects chosen.")).toBeTruthy();

    fireEvent.change(screen.getByRole("searchbox", { name: "Search subjects" }), { target: { value: "4037" } });
    expect(screen.getByText(/1 subject match your search/)).toBeTruthy();
    const chemistry = screen.getByRole("checkbox", { name: /Chemistry/, hidden: true }) as HTMLInputElement;
    expect(chemistry.closest("li")?.hidden).toBe(true);
    expect(chemistry.checked).toBe(true);
    expect(chemistry.closest("fieldset")?.hidden).toBe(true);

    const form = chemistry.closest("form") as HTMLFormElement;
    expect(new FormData(form).getAll("subjectIds").sort()).toEqual(["s-chem", "s-maths"]);

    fireEvent.change(screen.getByRole("searchbox", { name: "Search subjects" }), { target: { value: "latin" } });
    expect(screen.getByText(/No subjects match/)).toBeTruthy();
  });

  it("stops at the maximum number of subjects", () => {
    render(<SubjectPicker groups={GROUPS} comingSoon={[]} defaultSelected={["s-maths"]} max={1} />);
    expect(screen.getByText(/most you can choose/)).toBeTruthy();
    expect((screen.getByRole("checkbox", { name: /Chemistry/ }) as HTMLInputElement).disabled).toBe(true);
    fireEvent.click(screen.getByRole("checkbox", { name: /^Mathematics/ }));
    expect((screen.getByRole("checkbox", { name: /Chemistry/ }) as HTMLInputElement).disabled).toBe(false);
  });
});

describe("StepForm", () => {
  it("posts the step with its controls and shows what to fix", async () => {
    const { action, calls } = recordingAction({
      ok: false,
      error: { code: "VALIDATION", message: "Please check the highlighted fields and try again.", fieldErrors: { countryId: ["Choose your country."] } },
    });
    render(
      <StepForm step="country" action={action} backHref={null} errorId="err">
        <input type="radio" name="countryId" value="zw" defaultChecked aria-label="Zimbabwe" />
      </StepForm>,
    );
    expect(screen.queryByRole("link", { name: "Back" })).toBeNull();
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    });
    await waitFor(() => expect(calls).toHaveLength(1));
    expect(calls[0]?.get("step")).toBe("country");
    expect(calls[0]?.get("countryId")).toBe("zw");
    const alert = await screen.findByRole("alert");
    expect(within(alert).getByText("Choose your country.")).toBeTruthy();
    expect(within(alert).queryByText(/highlighted fields/)).toBeNull();
    expect(document.getElementById("err")?.contains(alert)).toBe(true);
  });

  it("offers Back as a plain link to the previous screen", () => {
    const { action } = recordingAction(null);
    render(
      <StepForm step="board" action={action} backHref="/onboarding/country" errorId="err">
        <span />
      </StepForm>,
    );
    expect(screen.getByRole("link", { name: "Back" }).getAttribute("href")).toBe("/onboarding/country");
  });
});

describe("FinishForm (§52 diagnostic offer)", () => {
  it("posts the pressed choice", async () => {
    const { action, calls } = recordingAction(null);
    render(<FinishForm action={action} diagnosticIncluded subjectsHref="/onboarding/subjects" />);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Start the diagnostic" }));
    });
    await waitFor(() => expect(calls).toHaveLength(1));
    expect(calls[0]?.get("choice")).toBe("diagnostic");
  });

  it("only offers the dashboard when the plan has no diagnostic, and links back to subjects on a subject problem", async () => {
    const { action, calls } = recordingAction({
      ok: false,
      error: { code: "VALIDATION", message: "Some of your choices can't be saved.", fieldErrors: { subjectIds: ["Chemistry has no published syllabus yet."] } },
    });
    render(<FinishForm action={action} diagnosticIncluded={false} subjectsHref="/onboarding/subjects" />);
    expect(screen.queryByRole("button", { name: "Start the diagnostic" })).toBeNull();
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Go to my dashboard" }));
    });
    await waitFor(() => expect(calls).toHaveLength(1));
    expect(calls[0]?.get("choice")).toBe("dashboard");
    expect(await screen.findByText("Chemistry has no published syllabus yet.")).toBeTruthy();
    expect(screen.getByRole("link", { name: "Change subjects" }).getAttribute("href")).toBe("/onboarding/subjects");
  });
});

describe("DiagnosticStartForm (§52 choose subjects)", () => {
  const subjects = [
    { subjectId: "s1", name: "Mathematics", detail: "O-Level · 12 questions · about 10 minutes", statusText: "Not taken yet", available: true, defaultChecked: true },
    { subjectId: "s2", name: "Chemistry", detail: "O-Level", statusText: "Not available yet", available: false, defaultChecked: true },
    { subjectId: "s3", name: "Biology", detail: "O-Level", statusText: "Taken 3 Oct 2026 · 64%", available: true, defaultChecked: false },
  ];

  it("pre-selects subjects without a diagnostic, never unavailable ones, and posts the choice with its key", async () => {
    const { action, calls } = recordingAction(null);
    render(<DiagnosticStartForm subjects={subjects} idempotencyKey="key12345" fromOnboarding action={action} upgradeHref="/pricing" />);
    expect((screen.getByRole("checkbox", { name: /Mathematics/ }) as HTMLInputElement).checked).toBe(true);
    const chemistry = screen.getByRole("checkbox", { name: /Chemistry/ }) as HTMLInputElement;
    expect(chemistry.checked).toBe(false);
    expect(chemistry.disabled).toBe(true);
    fireEvent.click(screen.getByRole("checkbox", { name: /Biology/ }));
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Start (2 subjects)" }));
    });
    await waitFor(() => expect(calls).toHaveLength(1));
    expect(calls[0]?.getAll("subjectIds")).toEqual(["s1", "s3"]);
    expect(calls[0]?.get("idempotencyKey")).toBe("key12345");
    expect(calls[0]?.get("from")).toBe("onboarding");
  });

  it("shows the way to the plans when the diagnostic is not included", async () => {
    const { action } = recordingAction({ ok: false, error: { code: "ENTITLEMENT_REQUIRED", message: "Your plan doesn't include the diagnostic test." } });
    render(<DiagnosticStartForm subjects={subjects} idempotencyKey="key12345" fromOnboarding={false} action={action} upgradeHref="/pricing" />);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Start the diagnostic" }));
    });
    expect(await screen.findByText("Not included in your plan")).toBeTruthy();
    expect(screen.getByRole("link", { name: "See plans" }).getAttribute("href")).toBe("/pricing");
  });
});
