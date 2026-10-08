/** @vitest-environment jsdom */
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it } from "vitest";
import type { FormAction, FormActionState } from "@/components/student/action-state";
import { ToastProvider } from "@/components/ui/Toast";
import { AddSubjectButton } from "./AddSubjectButton";
import { RemoveSubjectButton } from "./RemoveSubjectButton";
import { SubjectTargetsForm } from "./SubjectTargetsForm";

afterEach(cleanup);

function recordingAction(result: FormActionState) {
  const calls: FormData[] = [];
  const action: FormAction = async (_state, formData) => {
    calls.push(formData);
    return result;
  };
  return { action, calls };
}

const withToasts = (node: ReactNode) => render(<ToastProvider>{node}</ToastProvider>);

describe("AddSubjectButton", () => {
  it("submits the subject and announces success", async () => {
    const { action, calls } = recordingAction({ ok: true, data: { message: "Chemistry added to your subjects." } });
    withToasts(<AddSubjectButton subjectId="s-1" subjectName="Chemistry" action={action} />);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Add Chemistry" }));
    });
    await waitFor(() => expect(calls).toHaveLength(1));
    expect(calls[0]?.get("subjectId")).toBe("s-1");
    expect(await screen.findByText("Chemistry added to your subjects.")).toBeTruthy();
  });

  it("keeps errors next to the button", async () => {
    const { action } = recordingAction({ ok: false, error: { code: "VALIDATION", message: "Chemistry is not available yet." } });
    withToasts(<AddSubjectButton subjectId="s-1" subjectName="Chemistry" action={action} label="Add back" />);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Add back Chemistry" }));
    });
    expect(await screen.findByText("Chemistry is not available yet.")).toBeTruthy();
  });
});

describe("RemoveSubjectButton", () => {
  it("asks for confirmation, explains progress is kept, and cancels back to the button", () => {
    const { action, calls } = recordingAction(null);
    withToasts(<RemoveSubjectButton subjectId="s-2" subjectName="Physics" action={action} />);
    fireEvent.click(screen.getByRole("button", { name: "Remove Physics" }));
    const group = screen.getByRole("group", { name: /Remove Physics from your subjects\? Your progress is kept/ });
    expect(group).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    const trigger = screen.getByRole("button", { name: "Remove Physics" });
    expect(document.activeElement).toBe(trigger);
    expect(calls).toHaveLength(0);
  });

  it("removes after confirmation", async () => {
    const { action, calls } = recordingAction({ ok: true, data: { message: "Physics removed from your subjects." } });
    withToasts(<RemoveSubjectButton subjectId="s-2" subjectName="Physics" action={action} />);
    fireEvent.click(screen.getByRole("button", { name: "Remove Physics" }));
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Remove subject" }));
    });
    await waitFor(() => expect(calls).toHaveLength(1));
    expect(calls[0]?.get("subjectId")).toBe("s-2");
    expect(await screen.findByText("Physics removed from your subjects.")).toBeTruthy();
  });
});

describe("SubjectTargetsForm", () => {
  it("offers the qualification's sessions and grades with 'Not set'", async () => {
    const { action, calls } = recordingAction({ ok: true, data: { message: "Targets saved." } });
    render(
      <SubjectTargetsForm
        subjectId="s-3"
        subjectName="Mathematics"
        sessions={[{ value: "ses-1", label: "November 2026 (provisional) · starts 02 Nov, 2026" }]}
        grades={["A", "B", "C"]}
        current={{ targetExamSessionId: null, targetGrade: "B" }}
        action={action}
      />,
    );
    const session = screen.getByLabelText("Target examination") as HTMLSelectElement;
    expect(session.value).toBe("");
    expect((screen.getByLabelText(/Target grade/) as HTMLSelectElement).value).toBe("B");
    fireEvent.change(session, { target: { value: "ses-1" } });
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Save targets" }));
    });
    await waitFor(() => expect(calls).toHaveLength(1));
    expect(calls[0]?.get("targetExamSessionId")).toBe("ses-1");
    expect(calls[0]?.get("targetGrade")).toBe("B");
    expect(await screen.findByText("Targets saved.")).toBeTruthy();
  });

  it("explains when no sessions are published", () => {
    const { action } = recordingAction(null);
    render(<SubjectTargetsForm subjectId="s-3" subjectName="Mathematics" sessions={[]} grades={[]} current={{ targetExamSessionId: null, targetGrade: null }} action={action} />);
    expect(screen.getByText("No examination sessions are published for this qualification yet.")).toBeTruthy();
    expect(screen.queryByLabelText(/Target grade/)).toBeNull();
  });
});
