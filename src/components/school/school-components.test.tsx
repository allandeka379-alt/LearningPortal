/** @vitest-environment jsdom */
import { act, cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import type { AdminActionState } from "@/components/admin/form-state";
import { ToastProvider } from "@/components/ui/Toast";
import type { CredentialSlip, RosterOutcome } from "@/server/schools/core";
import { CredentialSlips } from "./CredentialSlips";
import { schoolMenuNav, schoolNav, schoolTabs } from "./nav";
import { PasswordResetPanel } from "./PasswordResetPanel";
import { RosterImport, type RosterChunkView, type RosterCommitInput, type RosterDryRunView } from "./RosterImport";
import { StudentPickerForm } from "./StudentPickerForm";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }), usePathname: () => "/school" }));

beforeAll(() => {
  // jsdom has no modal dialog implementation; emulate the bits the shared modal hook uses.
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
  vi.unstubAllGlobals();
});

function withToasts(node: ReactNode) {
  return <ToastProvider>{node}</ToastProvider>;
}

function slip(index: number): CredentialSlip {
  return { userId: `00000000-0000-4000-8000-${String(index).padStart(12, "0")}`, name: `Student ${index}`, className: "3B", username: `hhs.s${index}`, temporaryPassword: `abcd-efgh-jk${index % 10}m` };
}

describe("school navigation", () => {
  it("puts five destinations in the tab bar, the rest in the menu, and badges join requests", () => {
    const nav = schoolNav(3);
    expect(schoolTabs(nav).map((item) => item.href)).toEqual(["/school", "/school/students", "/school/teachers", "/school/classes", "/school/reports"]);
    expect(schoolMenuNav(nav).map((item) => item.href)).toEqual(["/school/subjects", "/school/billing"]);
    expect(nav.find((item) => item.href === "/school/students")?.badge).toBe(3);
    expect(schoolNav(0).find((item) => item.href === "/school/students")?.badge).toBeUndefined();
  });
});

describe("CredentialSlips", () => {
  it("shows each slip once with a print button and a shown-once warning", () => {
    const print = vi.fn();
    vi.stubGlobal("print", print);
    render(<CredentialSlips slips={[slip(1), slip(2)]} schoolName="Harare High" signInUrl="https://example.test/login" />);
    const list = screen.getByRole("list", { name: "Credential slips" });
    expect(within(list).getAllByRole("listitem")).toHaveLength(2);
    expect(within(list).getByText("hhs.s1")).toBeTruthy();
    expect(within(list).getByText("abcd-efgh-jk1m")).toBeTruthy();
    expect(screen.getByText(/not saved anywhere/)).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Print slips" }));
    expect(print).toHaveBeenCalled();
  });

  it("renders nothing without slips", () => {
    const { container } = render(<CredentialSlips slips={[]} schoolName="X" signInUrl="https://example.test/login" />);
    expect(container.innerHTML).toBe("");
  });
});

describe("PasswordResetPanel", () => {
  it("confirms, resets in batches of 50 and shows the new slips and skipped notes", async () => {
    const ids = Array.from({ length: 120 }, (_, i) => slip(i).userId);
    const action = vi.fn(async ({ userIds }: { userIds: string[] }) => ({
      ok: true as const,
      data: { slips: userIds.slice(0, 1).map((id, i) => ({ ...slip(i), userId: id })), skipped: [{ userId: userIds[1]!, reason: "Signs in with their own email." }] },
    }));
    render(<PasswordResetPanel action={action} userIds={ids} triggerLabel="Reset 120 passwords" schoolName="Harare High" signInUrl="https://example.test/login" />);
    fireEvent.click(screen.getByRole("button", { name: "Reset 120 passwords" }));
    expect(screen.getByRole("alertdialog")).toBeTruthy();
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Reset and show slips" }));
    });
    await waitFor(() => expect(action).toHaveBeenCalledTimes(3));
    expect(action.mock.calls.map(([input]) => input.userIds.length)).toEqual([50, 50, 20]);
    expect(await screen.findByRole("list", { name: "Credential slips" })).toBeTruthy();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(screen.getByText("3 not reset")).toBeTruthy();
  });

  it("shows the error and stops", async () => {
    const action = vi.fn(async () => ({ ok: false as const, error: { code: "RATE_LIMITED", message: "You have reset many passwords." } }));
    render(<PasswordResetPanel action={action} userIds={[slip(1).userId]} triggerLabel="Reset password" schoolName="X" signInUrl="https://example.test/login" />);
    fireEvent.click(screen.getByRole("button", { name: "Reset password" }));
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Reset and show slips" }));
    });
    expect(await screen.findByText("You have reset many passwords.")).toBeTruthy();
    expect(screen.queryByRole("list", { name: "Credential slips" })).toBeNull();
  });
});

function dryRun(rowCount: number): RosterDryRunView {
  const rows = Array.from({ length: rowCount }, (_, i) => ({
    row: i + 2,
    firstName: `First${i}`,
    lastName: `Last${i}`,
    form: null,
    className: "3B",
    email: null,
    phone: null,
    parentPhone: null,
    studentNumber: null,
    subjects: [],
    outcome: (i === 0 ? "error" : "create") as RosterOutcome,
    issues: i === 0 ? [{ row: 2, field: "parentPhone" as const, severity: "error" as const, message: "Parent phone \"12\" is not a valid phone number." }] : [],
    newClass: true,
  }));
  return {
    importId: "11111111-1111-4111-8111-111111111111",
    format: "CSV",
    fileIssues: [],
    totals: { create: rowCount - 1, invite: 0, existing: 0, skip: 0, error: 1 },
    rows,
    newClasses: ["3B"],
  };
}

function chunkResult(input: RosterCommitInput): RosterChunkView {
  return {
    chunkIndex: input.chunkIndex,
    results: input.rows.map((row) => ({ row: row.row, outcome: "create" as const, message: null })),
    slips: input.rows.map((row, i) => ({ ...slip(row.row), name: `${row.firstName} ${row.lastName}`, userId: `${input.chunkIndex}-${i}` })),
    invitationsSent: 0,
    invitationsUndelivered: 0,
    classesCreated: input.chunkIndex === 0 ? ["3B"] : [],
  };
}

describe("RosterImport", () => {
  async function upload(validateAction: (formData: FormData) => Promise<unknown>) {
    const file = new File(["First name,Last name\nA,B\n"], "roster.csv", { type: "text/csv" });
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file] } });
    await act(async () => {
      fireEvent.submit(input.form!);
    });
    await waitFor(() => expect(validateAction).toHaveBeenCalled());
  }

  it("checks the file first, explains problem rows, then imports in chunks and shows the slips", async () => {
    const validateAction = vi.fn(async (formData: FormData) => {
      expect(formData.get("file")).toBeInstanceOf(File);
      return { ok: true as const, data: dryRun(61) };
    });
    const commitAction = vi.fn(async (input: RosterCommitInput) => ({ ok: true as const, data: chunkResult(input) }));
    render(
      withToasts(
        <RosterImport
          validateAction={validateAction}
          commitAction={commitAction}
          schoolName="Harare High"
          signInUrl="https://example.test/login"
          defaultAcademicYear="2026"
          templateHref="/school/students/import/template"
          maxFileBytes={2 * 1024 * 1024}
        />,
      ),
    );
    expect(screen.getByRole("link", { name: "Download the template (CSV)" }).getAttribute("href")).toBe("/school/students/import/template");
    await upload(validateAction);
    expect((validateAction.mock.calls[0]![0] as FormData).get("file")).toBeInstanceOf(File);

    expect(await screen.findByText("Check before importing")).toBeTruthy();
    expect(screen.getByText("New account: 60")).toBeTruthy();
    expect(screen.getByText('Parent phone "12" is not a valid phone number.')).toBeTruthy();
    expect(screen.getByText(/3B will be created/)).toBeTruthy();

    fireEvent.click(screen.getByRole("checkbox", { name: /collected parent or guardian consent/ }));
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Import 60 students" }));
    });
    await waitFor(() => expect(commitAction).toHaveBeenCalledTimes(2));
    const first = commitAction.mock.calls[0]![0];
    expect(first).toMatchObject({ importId: "11111111-1111-4111-8111-111111111111", chunkIndex: 0, guardianConsentCollected: true, createMissingClasses: true, academicYear: "2026" });
    expect(first.rows).toHaveLength(50);
    expect(Object.keys(first.rows[0]!)).not.toContain("outcome");
    expect(Object.keys(first.rows[0]!)).not.toContain("issues");
    expect(commitAction.mock.calls[1]![0].rows).toHaveLength(10);

    expect(await screen.findByText("Import finished")).toBeTruthy();
    expect(screen.getByText(/60 new accounts/)).toBeTruthy();
    expect(within(screen.getByRole("list", { name: "Credential slips" })).getAllByRole("listitem")).toHaveLength(60);
  });

  it("stops on a failed chunk and continues from it", async () => {
    const validateAction = vi.fn(async () => ({ ok: true as const, data: dryRun(61) }));
    let failOnce = true;
    const commitAction = vi.fn(async (input: RosterCommitInput) => {
      if (input.chunkIndex === 1 && failOnce) {
        failOnce = false;
        return { ok: false as const, error: { code: "INTERNAL", message: "Something went wrong." } };
      }
      return { ok: true as const, data: chunkResult(input) };
    });
    render(
      withToasts(
        <RosterImport validateAction={validateAction} commitAction={commitAction} schoolName="X" signInUrl="https://example.test/login" defaultAcademicYear="2026" templateHref="/t" maxFileBytes={1000} />,
      ),
    );
    await upload(validateAction);
    await act(async () => {
      fireEvent.click(await screen.findByRole("button", { name: "Import 60 students" }));
    });
    expect(await screen.findByText("The import stopped")).toBeTruthy();
    expect(within(screen.getByRole("list", { name: "Credential slips" })).getAllByRole("listitem")).toHaveLength(50);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    });
    expect(await screen.findByText("Import finished")).toBeTruthy();
    expect(commitAction.mock.calls.map(([input]) => input.chunkIndex)).toEqual([0, 1, 1]);
    expect(within(screen.getByRole("list", { name: "Credential slips" })).getAllByRole("listitem")).toHaveLength(60);
  });

  it("refuses an oversized file before uploading", async () => {
    const validateAction = vi.fn();
    render(<RosterImport validateAction={validateAction} commitAction={vi.fn()} schoolName="X" signInUrl="u" defaultAcademicYear="2026" templateHref="/t" maxFileBytes={5} />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [new File(["0123456789"], "big.csv")] } });
    await act(async () => {
      fireEvent.submit(input.form!);
    });
    expect(screen.getByText(/larger than 2 MB/)).toBeTruthy();
    expect(validateAction).not.toHaveBeenCalled();
  });
});

describe("StudentPickerForm", () => {
  const students = [
    { userId: "00000000-0000-4000-8000-000000000001", name: "Anesu Dube", studentNumber: "A1" },
    { userId: "00000000-0000-4000-8000-000000000002", name: "Blessing Phiri", studentNumber: null },
    { userId: "00000000-0000-4000-8000-000000000003", name: "Chiedza Sithole", studentNumber: "C3" },
  ];

  it("filters, selects all shown and submits the chosen ids", async () => {
    const calls: FormData[] = [];
    const action = async (_state: AdminActionState, formData: FormData): Promise<AdminActionState> => {
      calls.push(formData);
      return { ok: true, data: null, message: "2 students added." };
    };
    render(withToasts(<StudentPickerForm action={action} students={students} fields={{ classId: "c1" }} submitLabel="Add to class" legend="Students" emptyMessage="None" />));
    fireEvent.change(screen.getByRole("searchbox", { name: /Find students/ }), { target: { value: "i" } });
    expect(screen.getAllByRole("checkbox")).toHaveLength(2);
    fireEvent.change(screen.getByRole("searchbox", { name: /Find students/ }), { target: { value: "c3" } });
    expect(screen.getAllByRole("checkbox")).toHaveLength(1);
    fireEvent.click(screen.getByRole("button", { name: "Select all shown (1)" }));
    fireEvent.change(screen.getByRole("searchbox", { name: /Find students/ }), { target: { value: "" } });
    fireEvent.click(screen.getByRole("checkbox", { name: /Anesu Dube/ }));
    expect(screen.getByText("2 selected")).toBeTruthy();
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Add to class" }));
    });
    await waitFor(() => expect(calls).toHaveLength(1));
    expect(calls[0]!.getAll("userIds").sort()).toEqual([students[0]!.userId, students[2]!.userId].sort());
    expect(calls[0]!.get("classId")).toBe("c1");
    expect(await screen.findByText("0 selected")).toBeTruthy();
  });

  it("shows the empty message without students", () => {
    render(withToasts(<StudentPickerForm action={async () => null} students={[]} submitLabel="Add" legend="Students" emptyMessage="Everyone is already in this class." />));
    expect(screen.getByText("Everyone is already in this class.")).toBeTruthy();
  });
});
