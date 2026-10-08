/** @vitest-environment jsdom */
import { cleanup, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import type { AdminFormAction } from "@/components/admin/form-state";
import { ToastProvider } from "@/components/ui/Toast";
import type { Totals } from "@/server/cms/assessments/core";
import type { BlueprintReport } from "@/server/cms/assessments/service";
import { AssessmentBuilder, type AssessmentBuilderProps } from "./AssessmentBuilder";

const router = { push: vi.fn(), refresh: vi.fn(), replace: vi.fn(), back: vi.fn(), forward: vi.fn(), prefetch: vi.fn() };
vi.mock("next/navigation", () => ({ useRouter: () => router, usePathname: () => "/admin/exams" }));

const Q1 = "0199a2b4-0000-7000-8000-0000000000b1";
const Q2 = "0199a2b4-0000-7000-8000-0000000000b2";
const TOPIC = "0199a2b4-0000-7000-8000-0000000000c1";

beforeAll(() => {
  const proto = HTMLDialogElement.prototype as HTMLDialogElement & { showModal: () => void; close: () => void };
  proto.showModal = function showModal(this: HTMLDialogElement) {
    this.setAttribute("open", "");
  };
  proto.close = function close(this: HTMLDialogElement) {
    if (!this.hasAttribute("open")) return;
    this.removeAttribute("open");
    this.dispatchEvent(new Event("close"));
  };
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

function setup(extra: Partial<AssessmentBuilderProps> = {}) {
  const saved: unknown[] = [];
  const saveAction: AdminFormAction<{ id: string; version: string; totals: Totals }> = async (_state, formData) => {
    saved.push(JSON.parse(String(formData.get("structure"))));
    return { ok: true, data: { id: "a-1", version: "v2", totals: { total: 0, exact: true, sections: [] } } };
  };
  const report: BlueprintReport = {
    audience: "students on free access",
    forAudience: { possible: false, guaranteed: false, assignable: 3, required: 5, rules: [{ required: 5, available: 3, capped: false, guaranteed: false }] },
    forPremium: { possible: true, guaranteed: true, assignable: 5, required: 5, rules: [{ required: 5, available: 9, capped: false, guaranteed: true }] },
    positions: [{ section: 0, rule: 0 }],
  };
  const checkAction = vi.fn(async () => ({ ok: true as const, data: { totals: { total: 5, exact: false, sections: [] }, blueprint: report } }));
  const searchAction = vi.fn(async () => ({
    ok: true as const,
    data: [
      { id: Q1, type: "MULTIPLE_CHOICE" as const, excerpt: "Solve 2x = 6", marks: 2, difficulty: 2, topic: "Algebra", year: null, paperLabel: null, isExamStyle: false },
      { id: Q2, type: "NUMERICAL" as const, excerpt: "Find the area", marks: 3, difficulty: 3, topic: null, year: null, paperLabel: null, isExamStyle: true },
    ],
  }));
  render(
    <ToastProvider>
      <AssessmentBuilder
        assessmentId="a-1"
        version="v1"
        editable
        usesRules
        subjectId="s-1"
        syllabusId="syl-1"
        initialSections={[{ title: "Section A", items: [], rules: [] }]}
        questionInfo={{}}
        components={[{ value: "p-1", label: "1 · Paper 1", durationMinutes: 90, maxMarks: 80 }]}
        topics={[{ value: TOPIC, label: "Algebra", syllabusId: "syl-1", depth: 0, kind: "TOPIC", path: TOPIC }]}
        objectives={[]}
        savedBlueprint={null}
        saveAction={saveAction}
        checkAction={checkAction}
        searchAction={searchAction}
        {...extra}
      />
    </ToastProvider>,
  );
  return { saved, checkAction, searchAction };
}

describe("AssessmentBuilder", () => {
  it("adds published questions from the picker, totals their marks and saves the structure", async () => {
    const user = userEvent.setup();
    const { saved, searchAction } = setup();
    await user.click(screen.getByRole("button", { name: "Add questions" }));
    await waitFor(() => expect(searchAction).toHaveBeenCalled(), { timeout: 5_000 });
    const dialog = screen.getByRole("dialog");
    const addButtons = await within(dialog).findAllByRole("button", { name: "Add" }, { timeout: 5_000 });
    await user.click(addButtons[0] as HTMLElement);
    await user.click(within(dialog).getAllByRole("button", { name: "Add" })[0] as HTMLElement);
    expect(screen.getByText("Solve 2x = 6")).toBeTruthy();
    expect(screen.getByText("Find the area")).toBeTruthy();
    expect(screen.getByText("5", { selector: "strong" })).toBeTruthy();

    await user.click(screen.getByRole("button", { name: "Add a section per syllabus paper" }));
    expect(screen.getAllByDisplayValue("1 · Paper 1").length).toBeGreaterThan(0);
    await user.click(screen.getByRole("button", { name: "Save structure" }));
    await waitFor(() => expect(saved).toHaveLength(1), { timeout: 5_000 });
    expect(saved[0]).toMatchObject([
      { title: "Section A", items: [{ questionId: Q1 }, { questionId: Q2 }] },
      { title: "1 · Paper 1", componentId: "p-1", timeLimitMinutes: 90, items: [] },
    ]);
  });

  it("adds blueprint rules and shows whether the published bank can fill them", async () => {
    const user = userEvent.setup();
    const { checkAction } = setup();
    await user.click(screen.getByRole("button", { name: "Add rule" }));
    await user.selectOptions(screen.getByLabelText("Topic"), TOPIC);
    await user.click(screen.getByRole("button", { name: "Check now" }));
    await waitFor(() => expect(checkAction).toHaveBeenCalledTimes(1), { timeout: 5_000 });
    const call = checkAction.mock.calls[0] as unknown as [{ sections: { rules: { topicId: string; questionCount: number }[] }[] }];
    expect(call[0].sections[0]?.rules[0]).toMatchObject({ topicId: TOPIC, questionCount: 5 });
    expect(await screen.findByText(/Not enough questions: 3 of 5/, undefined, { timeout: 5_000 })).toBeTruthy();
    expect(screen.getByText(/For premium students/)).toBeTruthy();
    expect(screen.getByText("Too few")).toBeTruthy();
  });
});
