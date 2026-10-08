/** @vitest-environment jsdom */
import { cleanup, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import type { AdminActionState, AdminFormAction } from "@/components/admin/form-state";
import { ToastProvider } from "@/components/ui/Toast";
import { diffEntitlementValues, displayEntitlementValue, groupFields, type EntitlementFieldView } from "../_lib/entitlements-diff";
import { EntitlementsEditor } from "./EntitlementsEditor";

const router = { push: vi.fn(), refresh: vi.fn(), replace: vi.fn(), back: vi.fn(), forward: vi.fn(), prefetch: vi.fn() };
vi.mock("next/navigation", () => ({ useRouter: () => router, usePathname: () => "/admin/plans/p-1" }));
vi.mock("@/components/admin/step-up-actions", () => ({ confirmPasswordAction: vi.fn(async () => ({ ok: true, data: null })) }));

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

const FIELDS: EntitlementFieldView[] = [
  { key: "lessonAccess", label: "Lesson access", description: "Which lessons.", group: "Lessons and practice", kind: "choice", options: [{ value: "FREE_ONLY", label: "Free previews" }, { value: "ALL", label: "All lessons" }] },
  { key: "mockExams", label: "Mock exams", description: "Timed mocks.", group: "Exams", kind: "boolean" },
  { key: "aiMessagesPerDay", label: "AI tutor messages", description: "Per day.", group: "AI", kind: "limit", min: 0, unit: "per day" },
];
const INITIAL = { lessonAccess: "FREE_ONLY", mockExams: false, aiMessagesPerDay: 5 };

describe("entitlements diff helpers", () => {
  it("formats values and lists changes in field order", () => {
    const limit = FIELDS[2] as EntitlementFieldView;
    expect(displayEntitlementValue(limit, null)).toBe("Unlimited");
    expect(displayEntitlementValue(limit, 0)).toBe("None");
    expect(displayEntitlementValue(limit, 40)).toBe("40 per day");
    expect(displayEntitlementValue(FIELDS[1] as EntitlementFieldView, true)).toBe("On");
    expect(displayEntitlementValue(FIELDS[0] as EntitlementFieldView, "ALL")).toBe("All lessons");
    expect(diffEntitlementValues(FIELDS, INITIAL, { ...INITIAL, aiMessagesPerDay: null, lessonAccess: "ALL" })).toEqual([
      { key: "lessonAccess", label: "Lesson access", group: "Lessons and practice", before: "Free previews", after: "All lessons" },
      { key: "aiMessagesPerDay", label: "AI tutor messages", group: "AI", before: "5 per day", after: "Unlimited" },
    ]);
    expect(groupFields(FIELDS).map((group) => group.group)).toEqual(["Lessons and practice", "Exams", "AI"]);
  });
});

describe("EntitlementsEditor", () => {
  it("tracks changes, blocks invalid limits, previews the diff and submits the complete document", async () => {
    const user = userEvent.setup();
    const calls: FormData[] = [];
    const action: AdminFormAction<unknown> = async (_state: AdminActionState, formData: FormData) => {
      calls.push(formData);
      return { ok: true, data: null, message: "Entitlements saved (2 changes)." };
    };
    render(
      <ToastProvider>
        <EntitlementsEditor planId="p-1" expectedUpdatedAt="2026-10-05T10:00:00.000Z" fields={FIELDS} initial={INITIAL} action={action} liveSubscriptions={12} />
      </ToastProvider>,
    );

    const save = screen.getByRole("button", { name: "Review and save" });
    expect(save).toHaveProperty("disabled", true);
    expect(screen.getByText("No unsaved changes.")).toBeTruthy();

    await user.click(screen.getByRole("switch", { name: /Mock exams/ }));
    expect(screen.getByText("1 unsaved change.")).toBeTruthy();

    const limit = screen.getByRole("textbox", { name: /AI tutor messages/ });
    await user.clear(limit);
    await user.type(limit, "lots");
    expect(screen.getByRole("alert").textContent).toMatch(/whole number/);
    expect(save).toHaveProperty("disabled", true);
    await user.clear(limit);
    await user.type(limit, "40");
    expect(screen.getByText("2 unsaved changes.")).toBeTruthy();

    await user.click(screen.getByRole("checkbox", { name: "Unlimited" }));
    expect(limit).toHaveProperty("disabled", true);

    await user.click(save);
    const dialog = await screen.findByRole("dialog", { name: "Save these entitlement changes?" });
    const rows = within(dialog).getAllByRole("row").slice(1).map((row) => row.textContent);
    expect(rows).toEqual(["Mock examsExamsOffOn", "AI tutor messagesAI5 per dayUnlimited"]);
    expect(within(dialog).getByText(/12 live subscriptions use this plan/)).toBeTruthy();

    await user.click(within(dialog).getByRole("button", { name: "Save changes" }));
    await waitFor(() => expect(calls).toHaveLength(1));
    const submitted = calls[0] as FormData;
    expect(submitted.get("planId")).toBe("p-1");
    expect(submitted.get("expectedUpdatedAt")).toBe("2026-10-05T10:00:00.000Z");
    expect(JSON.parse(String(submitted.get("entitlements")))).toEqual({ lessonAccess: "FREE_ONLY", mockExams: true, aiMessagesPerDay: null });
    await waitFor(() => expect(router.refresh).toHaveBeenCalled());
  });

  it("discards unsaved changes", async () => {
    const user = userEvent.setup();
    const action: AdminFormAction<unknown> = vi.fn(async () => null);
    render(
      <ToastProvider>
        <EntitlementsEditor planId="p-1" expectedUpdatedAt="t" fields={FIELDS} initial={INITIAL} action={action} liveSubscriptions={0} />
      </ToastProvider>,
    );
    await user.selectOptions(screen.getByRole("combobox", { name: /Lesson access/ }), "ALL");
    expect(screen.getByText("1 unsaved change.")).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Discard changes" }));
    expect(screen.getByText("No unsaved changes.")).toBeTruthy();
    expect((screen.getByRole("combobox", { name: /Lesson access/ }) as HTMLSelectElement).value).toBe("FREE_ONLY");
  });
});
