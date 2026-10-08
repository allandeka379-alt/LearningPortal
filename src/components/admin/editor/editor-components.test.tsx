/** @vitest-environment jsdom */
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ToastProvider } from "@/components/ui/Toast";
import type { SanitizedHtml } from "@/lib/content/types";
import { BulkFlashcardForm } from "./BulkFlashcardForm";
import { MarkdownEditor } from "./MarkdownEditor";
import { QuestionPicker } from "./QuestionPicker";
import { TopicTagPicker } from "./TopicTagPicker";
import type { LoadTopicsAction, PreviewAction, QuestionChoice, QuestionSearchAction } from "./types";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }), usePathname: () => "/admin/lessons" }));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

function hiddenValues(container: HTMLElement, name: string): string[] {
  return [...container.querySelectorAll<HTMLInputElement>(`input[type="hidden"][name="${name}"]`)].map((input) => input.value);
}

describe("MarkdownEditor", () => {
  it("renders the server preview with warnings, inserts formatting and blocks, and jumps to a warning's line", async () => {
    const user = userEvent.setup();
    const previewAction = vi.fn<PreviewAction>(async (source) => ({
      ok: true,
      data: {
        html: `<p>${source.length} chars</p>` as SanitizedHtml,
        warnings: [{ code: "image-missing-alt", message: "An image has no description.", line: 2 }],
        headings: [],
        hasMath: false,
      },
    }));
    render(<MarkdownEditor name="body" label="Lesson body" defaultValue={"Line one\nLine two\nLine three"} previewAction={previewAction} />);

    await waitFor(() => expect(previewAction).toHaveBeenCalledWith("Line one\nLine two\nLine three", "lesson"), { timeout: 2_000 });
    expect(await screen.findByText("28 chars")).toBeTruthy();
    expect(screen.getAllByText("Image without description").length).toBeGreaterThan(0);
    expect(screen.getByText("Must fix")).toBeTruthy();

    const textarea = screen.getByLabelText("Lesson body") as HTMLTextAreaElement;
    await user.click(screen.getByRole("button", { name: "Line 2" }));
    await waitFor(() => expect(textarea.selectionStart).toBe("Line one\n".length));
    expect(textarea.selectionEnd).toBe("Line one\nLine two".length);

    textarea.setSelectionRange(0, 4);
    await user.click(screen.getByTitle("Bold (Ctrl+B)"));
    expect(textarea.value.startsWith("**Line** one")).toBe(true);

    textarea.setSelectionRange(textarea.value.length, textarea.value.length);
    fireEvent.change(screen.getByLabelText("Insert a content block"), { target: { value: "definition" } });
    expect(textarea.value).toContain(':::definition{term="Term"}\nMeaning of the term.\n:::');
    await waitFor(() => expect(previewAction).toHaveBeenLastCalledWith(textarea.value, "lesson"), { timeout: 2_000 });
  });

  it("shows the server's error instead of a stale preview", async () => {
    const previewAction = vi.fn<PreviewAction>(async () => ({ ok: false, error: { code: "FORBIDDEN", message: "You don't have permission to do that." } }));
    render(<MarkdownEditor name="front" label="Front" defaultValue="$x$" previewAction={previewAction} mode="card" blocks={false} />);
    expect(await screen.findByText("You don't have permission to do that.", {}, { timeout: 2_000 })).toBeTruthy();
    expect(screen.queryByLabelText("Insert a content block")).toBeNull();
  });
});

describe("TopicTagPicker", () => {
  it("adds tags from a syllabus, keeps one primary, and submits objectives of the tagged topics", async () => {
    const user = userEvent.setup();
    const loadTopicsAction = vi.fn<LoadTopicsAction>(async (syllabusId) => ({
      ok: true,
      data: {
        syllabusId,
        topics: [
          { id: "t1", label: "1 Algebra", depth: 0, kind: "TOPIC", path: "t1" },
          { id: "t2", label: "1.1 Equations", depth: 1, kind: "SUBTOPIC", path: "t1/t2" },
          { id: "t3", label: "2 Geometry", depth: 0, kind: "TOPIC", path: "t3" },
        ],
        objectives: [
          { id: "o1", topicId: "t2", topicPath: "t1/t2", label: "Solve linear equations" },
          { id: "o2", topicId: "t3", topicPath: "t3", label: "Find angles" },
        ],
      },
    }));
    const { container } = render(
      <form>
        <TopicTagPicker syllabusOptions={[{ value: "s1", label: "Maths 2026" }]} initialTopics={[]} loadTopicsAction={loadTopicsAction} withObjectives />
      </form>,
    );

    await user.selectOptions(screen.getByLabelText("Syllabus version"), "s1");
    await waitFor(() => expect(loadTopicsAction).toHaveBeenCalledWith("s1"));
    const topicSelect = screen.getByLabelText("Topic") as HTMLSelectElement;
    await waitFor(() => expect(topicSelect.disabled).toBe(false));
    await user.selectOptions(topicSelect, "t1");
    await user.click(screen.getByRole("button", { name: "Add tag" }));
    await user.selectOptions(topicSelect, "t3");
    await user.click(screen.getByRole("button", { name: "Add tag" }));

    expect(hiddenValues(container, "topicIds")).toEqual(["t1", "t3"]);
    expect(hiddenValues(container, "primaryTopicId")).toEqual(["t1"]);

    const radios = screen.getAllByRole("radio", { name: "Primary" });
    await user.click(radios[1] as HTMLElement);
    expect(hiddenValues(container, "primaryTopicId")).toEqual(["t3"]);

    // Objectives under t1 (via its subtopic t2) and t3 are offered.
    await user.click(screen.getByLabelText("Solve linear equations"));
    expect(hiddenValues(container, "objectiveIds")).toEqual(["o1"]);

    await user.click(screen.getByRole("button", { name: "Remove 2 Geometry" }));
    expect(hiddenValues(container, "topicIds")).toEqual(["t1"]);
    expect(hiddenValues(container, "primaryTopicId")).toEqual(["t1"]);
    expect(screen.queryByLabelText("Find angles")).toBeNull();
  });
});

describe("QuestionPicker", () => {
  const q = (id: string, excerpt: string): QuestionChoice => ({ id, excerpt, type: "MULTIPLE_CHOICE", difficulty: 2, marks: 1, subject: "Maths", status: "PUBLISHED" });

  it("reorders, removes and adds published questions in order", async () => {
    const user = userEvent.setup();
    const searchAction = vi.fn<QuestionSearchAction>(async () => ({ ok: true, data: [q("q3", "Solve 3x = 9"), q("q1", "Solve 2x = 4")] }));
    const { container } = render(
      <form>
        <QuestionPicker initial={[q("q1", "Solve 2x = 4"), q("q2", "Solve x + 1 = 3")]} searchAction={searchAction} subjectId="sub" />
      </form>,
    );
    expect(hiddenValues(container, "questionIds")).toEqual(["q1", "q2"]);
    await user.click(screen.getByRole("button", { name: "Move question 1 down" }));
    expect(hiddenValues(container, "questionIds")).toEqual(["q2", "q1"]);

    await user.type(screen.getByLabelText("Find a published question"), "solve");
    await waitFor(() => expect(searchAction).toHaveBeenCalledWith("solve", "sub"), { timeout: 2_000 });
    // q1 is already attached, so only q3 can be added.
    const add = await screen.findAllByRole("button", { name: "Add" });
    expect(add).toHaveLength(1);
    await user.click(add[0] as HTMLElement);
    expect(screen.getAllByRole("button", { name: "Added" })).toHaveLength(2);
    expect(hiddenValues(container, "questionIds")).toEqual(["q2", "q1", "q3"]);

    await user.click(screen.getByRole("button", { name: "Remove question 1" }));
    expect(hiddenValues(container, "questionIds")).toEqual(["q1", "q3"]);
  });
});

describe("BulkFlashcardForm", () => {
  it("checks the paste without losing it, then shows previews and row problems", async () => {
    const user = userEvent.setup();
    const calls: FormData[] = [];
    const action = vi.fn(async (_state: unknown, formData: FormData) => {
      calls.push(formData);
      return {
        ok: true as const,
        data: {
          intent: "preview",
          total: 1,
          problems: [{ row: 2, message: "Only one column found." }],
          cards: [{ row: 1, front: "<p>Osmosis</p>" as SanitizedHtml, back: "<p>Water moves</p>" as SanitizedHtml, notes: null, warnings: [] }],
        },
        message: "Fix the problems listed below.",
        // As bulkFlashcardsAction does: echo the submitted fields so React's post-action reset keeps them filled.
        values: Object.fromEntries([...formData.entries()].filter(([, v]) => typeof v === "string")) as Record<string, string>,
      };
    });
    const loadTopicsAction = vi.fn<LoadTopicsAction>(async (syllabusId) => ({ ok: true, data: { syllabusId, topics: [], objectives: [] } }));
    render(
      <ToastProvider>
        <BulkFlashcardForm action={action} subjects={[{ value: "s1", label: "Biology" }]} sources={[]} syllabi={[]} loadTopicsAction={loadTopicsAction} />
      </ToastProvider>,
    );
    await user.selectOptions(screen.getByLabelText(/^Subject/), "s1");
    const paste = screen.getByLabelText(/^Cards/) as HTMLTextAreaElement;
    fireEvent.change(paste, { target: { value: "Osmosis\tWater moves\nOnly one" } });
    await user.click(screen.getByRole("button", { name: "Check paste" }));

    expect(await screen.findByText("Row 2: Only one column found.")).toBeTruthy();
    expect(screen.getByText("Osmosis")).toBeTruthy();
    expect(calls[0]?.get("intent")).toBeNull();
    expect(calls[0]?.get("text")).toBe("Osmosis\tWater moves\nOnly one");
    expect((screen.getByLabelText(/^Cards/) as HTMLTextAreaElement).value).toBe("Osmosis\tWater moves\nOnly one");

    await user.click(screen.getByRole("button", { name: "Create drafts" }));
    await waitFor(() => expect(calls).toHaveLength(2));
    expect(calls[1]?.get("intent")).toBe("create");
  });
});
