/** @vitest-environment jsdom */
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { ActionForm } from "@/components/admin/ActionForm";
import type { AdminActionState, AdminFormAction } from "@/components/admin/form-state";
import { ToastProvider } from "@/components/ui/Toast";
import { GradeBandsEditor } from "./GradeBandsEditor";
import type { TopicCommand } from "./topic-commands";
import { TopicTreeEditor } from "./TopicTreeEditor";
import type { EditorNode } from "./tree-model";

const router = { push: vi.fn(), refresh: vi.fn(), replace: vi.fn(), back: vi.fn(), forward: vi.fn(), prefetch: vi.fn() };
vi.mock("next/navigation", () => ({ useRouter: () => router, usePathname: () => "/admin/syllabuses" }));

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

function node(id: string, name: string, parentId: string | null, children: EditorNode[] = [], extra: Partial<EditorNode> = {}): EditorNode {
  return {
    id,
    parentId,
    kind: parentId ? "SUBTOPIC" : "TOPIC",
    depth: parentId ? 1 : 0,
    sortOrder: 0,
    code: null,
    name,
    slug: name.toLowerCase().replace(/\s+/g, "-"),
    description: null,
    publicSummary: null,
    metaTitle: null,
    metaDescription: null,
    isPublic: true,
    isOptional: false,
    optionGroup: null,
    examYearFrom: null,
    examYearTo: null,
    estimatedStudyMinutes: null,
    originSlug: null,
    componentIds: [],
    objectives: [],
    tags: { questions: 0, lessons: 0, flashcards: 0 },
    children,
    ...extra,
  };
}

const SYLLABUS = "0192a7c0-0000-7000-8000-000000000001";

function tree(): EditorNode[] {
  return [
    node("t1", "Number", null, [node("s1", "Integers", "t1", [], { sortOrder: 0 }), node("s2", "Fractions", "t1", [], { sortOrder: 1, originSlug: "fractions-old" })], {
      code: "1",
    }),
    node("t2", "Algebra", null, [], { code: "2", sortOrder: 1 }),
  ];
}

function renderEditor(options: { editable?: boolean; canCorrect?: boolean; responses?: AdminActionState[] } = {}) {
  const calls: TopicCommand[] = [];
  const responses = [...(options.responses ?? [])];
  const runCommand = vi.fn(async (command: TopicCommand): Promise<AdminActionState> => {
    calls.push(command);
    return responses.shift() ?? { ok: true, data: null };
  });
  render(
    <TopicTreeEditor
      syllabusId={SYLLABUS}
      versionLabel="2028-2030"
      editable={options.editable ?? true}
      canCorrect={options.canCorrect ?? false}
      roots={tree()}
      components={[{ id: "p1", code: "1", name: "Paper 1" }]}
      sources={[{ value: "src", label: "Board syllabus" }]}
      runCommand={runCommand}
    />,
  );
  return { calls, runCommand };
}

describe("TopicTreeEditor", () => {
  it("renders an ARIA tree with levels, positions and one tab stop", () => {
    renderEditor();
    const treeEl = screen.getByRole("tree", { name: "Topics of 2028-2030" });
    const items = within(treeEl).getAllByRole("treeitem");
    expect(items.map((item) => item.getAttribute("aria-level"))).toEqual(["1", "2", "2", "1"]);
    expect(items[0]?.getAttribute("aria-expanded")).toBe("true");
    expect(items[3]?.getAttribute("aria-expanded")).toBeNull();
    expect(items[1]?.getAttribute("aria-posinset")).toBe("1");
    expect(items[1]?.getAttribute("aria-setsize")).toBe("2");
    expect(items.filter((item) => item.tabIndex === 0)).toHaveLength(1);
    expect(items[0]?.getAttribute("aria-selected")).toBe("true");
  });

  it("navigates with the keyboard and opens the focused node with Enter", async () => {
    renderEditor();
    const items = screen.getAllByRole("treeitem");
    items[0]!.focus();
    fireEvent.keyDown(items[0]!, { key: "ArrowDown" });
    await waitFor(() => expect(document.activeElement).toBe(screen.getAllByRole("treeitem")[1]));
    fireEvent.keyDown(document.activeElement!, { key: "End" });
    await waitFor(() => expect(document.activeElement?.textContent).toContain("Algebra"));
    fireEvent.keyDown(document.activeElement!, { key: "Enter" });
    await waitFor(() => expect(screen.getByRole("heading", { level: 2, name: /Algebra/ })).toBeTruthy());
    // Collapse the first topic from its first child: ← goes to the parent, ← again collapses it.
    fireEvent.keyDown(document.activeElement!, { key: "Home" });
    fireEvent.keyDown(document.activeElement!, { key: "ArrowLeft" });
    await waitFor(() => expect(screen.getAllByRole("treeitem")).toHaveLength(2));
    fireEvent.keyDown(document.activeElement!, { key: "ArrowRight" });
    await waitFor(() => expect(screen.getAllByRole("treeitem")).toHaveLength(4));
  });

  it("moves the focused node with Alt + arrows and with the touch-friendly buttons", async () => {
    const user = userEvent.setup();
    const { calls } = renderEditor({ responses: [{ ok: true, data: { moved: true } }, { ok: true, data: { moved: true, kindChanges: 0 } }] });
    const items = screen.getAllByRole("treeitem");
    items[0]!.focus();
    fireEvent.keyDown(items[0]!, { key: "ArrowDown", altKey: true });
    await waitFor(() => expect(calls[0]).toEqual({ type: "move", syllabusId: SYLLABUS, input: { id: "t1", direction: "down" } }));

    await user.click(screen.getByText("Fractions"));
    const panel = screen.getByRole("region", { name: "Selected topic" });
    expect(within(panel).getByRole("button", { name: "Move down" })).toHaveProperty("disabled", true);
    await user.click(within(panel).getByRole("button", { name: "Outdent" }));
    await waitFor(() => expect(calls[1]).toEqual({ type: "shift", syllabusId: SYLLABUS, input: { id: "s2", operation: "outdent" } }));
    // The slug hint warns that the public URL differs from the previous version.
    expect(within(panel).getByText(/previous version used "fractions-old"/)).toBeTruthy();
  });

  it("adds children, shows server field errors and announces results", async () => {
    const user = userEvent.setup();
    const { calls } = renderEditor({
      responses: [
        { ok: false, error: { code: "VALIDATION", message: "Please check the highlighted fields and try again.", fieldErrors: { name: ["Name is required."] } } },
        { ok: true, data: { id: "s3" }, message: "Topic added." },
      ],
    });
    const panel = screen.getByRole("region", { name: "Selected topic" });
    const form = within(panel).getByRole("form", { name: "Add a child of Number" });
    await user.type(within(form).getByLabelText("New child name"), "x");
    await user.click(within(form).getByRole("button", { name: "Add child" }));
    await waitFor(() => expect(within(form).getByText("Name is required.")).toBeTruthy());
    expect(calls[0]).toMatchObject({ type: "add", input: { syllabusId: SYLLABUS, parentId: "t1", name: "x" } });
    await waitFor(() => expect(within(form).getByRole("button", { name: "Add child" })).toHaveProperty("disabled", false));
    expect((within(form).getByLabelText("New child name") as HTMLInputElement).value).toBe("x");
    await user.click(within(form).getByRole("button", { name: "Add child" }));
    await waitFor(() => expect(calls).toHaveLength(2));
    await waitFor(() => expect(screen.getAllByText("Topic added.").length).toBeGreaterThan(0));
  });

  it("asks before deleting and sends the delete command", async () => {
    const user = userEvent.setup();
    const { calls } = renderEditor({ responses: [{ ok: true, data: { deleted: 3 }, message: "Topic deleted." }] });
    const panel = screen.getByRole("region", { name: "Selected topic" });
    await user.click(within(panel).getByRole("button", { name: "Delete" }));
    const dialog = await screen.findByRole("alertdialog", { name: 'Delete "Number"?' });
    expect(calls).toHaveLength(0);
    await user.click(within(dialog).getByRole("button", { name: "Delete" }));
    await waitFor(() => expect(calls[0]).toEqual({ type: "delete", syllabusId: SYLLABUS, input: { id: "t1" } }));
  });

  it("is read-only for published versions, with wording corrections for admins", async () => {
    renderEditor({ editable: false, canCorrect: true });
    const panel = screen.getByRole("region", { name: "Selected topic" });
    expect(within(panel).queryByRole("button", { name: "Move up" })).toBeNull();
    expect(within(panel).getByRole("form", { name: "Correct the wording of Number" })).toBeTruthy();
    expect(screen.queryByText("Paste an outline (bulk add)")).toBeNull();
    cleanup();
    renderEditor({ editable: false, canCorrect: false });
    expect(screen.queryByRole("form", { name: /Correct the wording/ })).toBeNull();
    expect(screen.getByText("Slug")).toBeTruthy();
  });
});

describe("GradeBandsEditor", () => {
  it("edits, reorders and removes bands, posts them as indexed fields and shows per-row errors", async () => {
    const user = userEvent.setup();
    const posted: FormData[] = [];
    const action: AdminFormAction<unknown> = async (_state, formData) => {
      posted.push(formData);
      return { ok: false, error: { code: "VALIDATION", message: "Fix the bands.", fieldErrors: { "bands.1.minPercent": ["Each band must start below the band above it (best grade first)."], bands: ["Mark at least one band as a pass."] } } };
    };
    render(
      <ToastProvider>
        <ActionForm action={action} submitLabel="Save scheme">
          <GradeBandsEditor
            frozen
            initial={[
              { label: "A", minPercent: "70", isPass: true, description: "" },
              { label: "U", minPercent: "0", isPass: false, description: "" },
            ]}
          />
        </ActionForm>
      </ToastProvider>,
    );
    expect(screen.getByText(/creates a new version of the scheme/)).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Add band" }));
    const grades = screen.getAllByLabelText("Grade");
    await user.type(grades[2]!, "B");
    await user.click(screen.getByRole("button", { name: "Move grade B up" }));
    await user.click(screen.getByRole("button", { name: "Remove grade U" }));
    await user.click(screen.getByRole("button", { name: "Save scheme" }));
    await waitFor(() => expect(posted).toHaveLength(1));
    const data = posted[0]!;
    expect([data.get("bands.0.label"), data.get("bands.1.label"), data.get("bands.2.label")]).toEqual(["A", "B", null]);
    expect(data.get("bands.0.isPass")).toBe("on");
    expect(data.get("bands.1.isPass")).toBeNull();
    await waitFor(() => expect(screen.getByText("Each band must start below the band above it (best grade first).")).toBeTruthy());
    expect(screen.getByText("Mark at least one band as a pass.")).toBeTruthy();
    expect(screen.getAllByLabelText("From (%)")[1]?.getAttribute("aria-invalid")).toBe("true");
  });
});
