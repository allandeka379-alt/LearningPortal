/** @vitest-environment jsdom */
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import type { FormAction, FormActionState } from "@/components/student/action-state";
import { ToastProvider } from "@/components/ui/Toast";
import { SyllabusUpgradeNotice, type SyllabusUpgradeNoticeProps } from "./SyllabusUpgradeNotice";

afterEach(cleanup);

function recordingAction(result: FormActionState) {
  const calls: FormData[] = [];
  const action: FormAction = async (_state, formData) => {
    calls.push(formData);
    return result;
  };
  return { action, calls };
}

function renderNotice(overrides: Partial<SyllabusUpgradeNoticeProps>, action: FormAction) {
  const props: SyllabusUpgradeNoticeProps = {
    subjectId: "subject-1",
    fromSyllabusId: "v1",
    toSyllabusId: "v3",
    pinnedLabel: "2019-2022",
    currentLabel: "2026-2029",
    currentTitle: "Mathematics 4004",
    currentFrom: "1 January 2026",
    practisedTopics: 3,
    carriedTopics: 2,
    droppedChoices: 1,
    examWarning: null,
    action,
    ...overrides,
  };
  return render(
    <ToastProvider>
      <SyllabusUpgradeNotice {...props} />
    </ToastProvider>,
  );
}

describe("SyllabusUpgradeNotice (§26)", () => {
  it("explains the newer version and what carries over, and confirms before moving", async () => {
    const { action, calls } = recordingAction({ ok: true, data: { message: "You are now on syllabus version 2026-2029." } });
    renderNotice({}, action);
    expect(screen.getByText("A newer syllabus is available")).toBeTruthy();
    expect(screen.getByText(/Your progress in 2 topics carries over/)).toBeTruthy();
    expect(screen.getByText(/One optional topic you chose is not part of the new/)).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Move to the new version" }));
    expect(screen.getByRole("group", { name: /Move to version 2026-2029\? You can.t move back to version 2019-2022/ })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "Move to the new version" }));
    expect(calls).toHaveLength(0);

    fireEvent.click(screen.getByRole("button", { name: "Move to the new version" }));
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Move to version 2026-2029" }));
    });
    await waitFor(() => expect(calls).toHaveLength(1));
    expect([calls[0]?.get("subjectId"), calls[0]?.get("fromSyllabusId"), calls[0]?.get("toSyllabusId")]).toEqual(["subject-1", "v1", "v3"]);
    expect(await screen.findByText("You are now on syllabus version 2026-2029.")).toBeTruthy();
  });

  it("warns when the target exam is not examined on the new version, and shows refusals inline", async () => {
    const { action } = recordingAction({ ok: false, error: { code: "CONFLICT", message: "Your syllabus version changed. Reload the page." } });
    renderNotice({ practisedTopics: 0, carriedTopics: 0, droppedChoices: 0, examWarning: { sessionName: "November 2025", startsOn: "2 November 2025", coveredByPinned: true } }, action);
    expect(screen.getByText(/You have not practised this subject yet/)).toBeTruthy();
    expect(screen.getByText(/Your target exam, November 2025 \(2 November 2025\), is examined on your current version/)).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Move to the new version" }));
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Move to version 2026-2029" }));
    });
    expect(await screen.findByText("Your syllabus version changed. Reload the page.")).toBeTruthy();
  });
});
