/** @vitest-environment jsdom */
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { AdminActionState, AdminFormAction } from "@/components/admin/form-state";
import { ToastProvider } from "@/components/ui/Toast";
import type { SaveQuestionResult } from "@/server/cms/questions/service";
import type { QuestionEditorInput } from "@/server/cms/questions/schemas";
import { newDocument } from "./model";
import { QuestionEditor, type QuestionEditorProps } from "./QuestionEditor";

const router = { push: vi.fn(), refresh: vi.fn(), replace: vi.fn(), back: vi.fn(), forward: vi.fn(), prefetch: vi.fn() };
vi.mock("next/navigation", () => ({ useRouter: () => router, usePathname: () => "/admin/questions" }));

const SUBJECT = "0199a2b4-0000-7000-8000-000000000001";
const ASSET = "0199a2b4-0000-7000-8000-0000000000aa";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

function setup(initial: QuestionEditorInput, responses: AdminActionState<SaveQuestionResult>[] = [], extra: Partial<QuestionEditorProps> = {}) {
  const calls: Record<string, unknown>[] = [];
  const saveAction: AdminFormAction<SaveQuestionResult> = async (_state, formData) => {
    calls.push(JSON.parse(String(formData.get("document"))) as Record<string, unknown>);
    return responses.shift() ?? { ok: true, data: { id: "q-1", version: "v2", errors: [], warnings: [] } };
  };
  render(
    <ToastProvider>
      <QuestionEditor
        mode="update"
        questionId="q-1"
        version="v1"
        initial={initial}
        subjects={[]}
        content={{ syllabi: [], topics: [], objectives: [], lessons: [] }}
        sources={[]}
        media={[{ value: ASSET, label: "Plant cell", src: "/api/media/cell.png", width: 400, height: 200, altText: "A plant cell" }]}
        saveAction={saveAction}
        previewAction={async () => ({ ok: true, data: { html: "" as never, warnings: [] } })}
        loadSubjectAction={async () => ({ ok: true, data: { syllabi: [], topics: [], objectives: [], lessons: [] } })}
        {...extra}
      />
    </ToastProvider>,
  );
  return { calls };
}

describe("QuestionEditor", () => {
  it("edits MCQ options (new keys never re-use reserved ones, one correct answer) and posts the document", async () => {
    const user = userEvent.setup();
    const { calls } = setup(newDocument("MULTIPLE_CHOICE", SUBJECT, { stem: "Pick one." }), [], { reservedOptionKeys: ["E"] });
    await user.click(screen.getByRole("button", { name: "Add option" }));
    expect(screen.getByText("Option F")).toBeTruthy();
    const optionB = screen.getByText("Option B").closest("li") as HTMLElement;
    await user.click(within(optionB).getByRole("radio"));
    await user.type(within(optionB).getByLabelText("Option B text"), "$x = 2$");
    await user.click(screen.getByRole("button", { name: "Save draft" }));

    await waitFor(() => expect(calls).toHaveLength(1), { timeout: 5_000 });
    const options = calls[0]?.options as { key: string; content: string; isCorrect: boolean }[];
    expect(options.map((o) => o.key)).toEqual(["A", "B", "C", "D", "F"]);
    expect(options.filter((o) => o.isCorrect).map((o) => o.key)).toEqual(["B"]);
    expect(options[1]?.content).toBe("$x = 2$");
    await waitFor(() => expect(router.refresh).toHaveBeenCalled(), { timeout: 5_000 });
  });

  it("shows the server's field errors next to the fields and in a summary", async () => {
    const user = userEvent.setup();
    setup(newDocument("SHORT_ANSWER", SUBJECT), [
      { ok: false, error: { code: "VALIDATION", message: "Please check the highlighted fields.", fieldErrors: { "answerSpec.accepted.0.value": ["Must not be blank."], difficulty: ["Choose a difficulty from 1 to 5."] } } },
    ]);
    await user.click(screen.getByRole("button", { name: "Save draft" }));
    expect(await screen.findByText("The draft was not saved", undefined, { timeout: 5_000 })).toBeTruthy();
    const answer = screen.getByLabelText("Answer");
    expect(answer.getAttribute("aria-invalid")).toBe("true");
    expect(screen.getAllByText("Must not be blank.").length).toBeGreaterThan(0);
  });

  it("places diagram hotspots by clicking on the image (or at the centre from the keyboard)", async () => {
    const user = userEvent.setup();
    const { calls } = setup(newDocument("DIAGRAM_LABELLING", SUBJECT, { stem: "Label the cell." }));
    await user.selectOptions(screen.getByLabelText("Diagram"), ASSET);
    const placer = screen.getByRole("button", { name: /Add a hotspot/ });
    const image = placer.querySelector("img") as HTMLImageElement;
    image.getBoundingClientRect = () => ({ left: 100, top: 0, width: 200, height: 100, right: 300, bottom: 100, x: 100, y: 0, toJSON: () => ({}) });
    fireEvent.click(placer, { clientX: 150, clientY: 50, detail: 1 });
    fireEvent.click(placer, { detail: 0 });
    await user.click(screen.getByRole("button", { name: "Save draft" }));

    await waitFor(() => expect(calls).toHaveLength(1), { timeout: 5_000 });
    const payload = calls[0]?.payload as { mediaAssetId: string; hotspots: { id: string; x: number; y: number }[] };
    expect(payload.mediaAssetId).toBe(ASSET);
    expect(payload.hotspots).toEqual([
      { id: "h1", x: 25, y: 50 },
      { id: "h2", x: 50, y: 50 },
    ]);
    const spec = calls[0]?.answerSpec as { hotspots: { hotspotId: string; labelId?: string }[] };
    expect(spec.hotspots.map((h) => h.hotspotId)).toEqual(["h1", "h2"]);
  });

  it("adds structured parts and keeps the question worth the sum of its parts", async () => {
    const user = userEvent.setup();
    const { calls } = setup(newDocument("STRUCTURED", SUBJECT, { stem: "Context." }));
    expect(screen.getByText(/Worth/).textContent).toContain("2");
    await user.selectOptions(screen.getByLabelText("New part type"), "TRUE_FALSE");
    await user.click(screen.getByRole("button", { name: "Add part" }));
    expect(screen.getByText("Part (c)")).toBeTruthy();
    expect(screen.getByText(/Worth/).textContent).toContain("3");
    await user.click(screen.getByRole("button", { name: "Save draft" }));
    await waitFor(() => expect(calls).toHaveLength(1), { timeout: 5_000 });
    const parts = calls[0]?.parts as { partLabel: string; type: string }[];
    expect(parts.map((p) => [p.partLabel, p.type])).toEqual([
      ["(a)", "SHORT_ANSWER"],
      ["(b)", "NUMERICAL"],
      ["(c)", "TRUE_FALSE"],
    ]);
    expect(calls[0]?.marks).toBe(3);
    // The structured editor renders ~1,000 nodes; each jsdom role/label query costs ~3 s on its own, so under a full
    // parallel run this test needs more than the 20 s default. Assertions are unchanged.
  }, 60_000);

  it("is read-only outside Draft", () => {
    setup(newDocument("TRUE_FALSE", SUBJECT, { stem: "Every square is a rectangle." }), [], { readOnly: true });
    expect(screen.queryByRole("button", { name: "Save draft" })).toBeNull();
    expect((screen.getByLabelText("Question text") as HTMLTextAreaElement).closest("fieldset")?.disabled).toBe(true);
  });
});
