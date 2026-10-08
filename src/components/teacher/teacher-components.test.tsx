/** @vitest-environment jsdom */
import { cleanup, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { AdminActionState, AdminFormAction } from "@/components/admin/form-state";
import { ToastProvider } from "@/components/ui/Toast";
import type { AddStudentOutcome } from "@/server/teaching/invitations";
import { AddStudentsForm } from "./AddStudentsForm";
import { AssignmentForm, type AssignmentFormOptionsView } from "./AssignmentForm";
import { MarkAnswerForm } from "./MarkAnswerForm";
import { TestBuilder, type BuilderItem, type TestBuilderProps } from "./TestBuilder";

const router = { push: vi.fn(), refresh: vi.fn(), replace: vi.fn(), back: vi.fn(), forward: vi.fn(), prefetch: vi.fn() };
vi.mock("next/navigation", () => ({ useRouter: () => router, usePathname: () => "/teacher" }));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

/** A Server Action stand-in that records the submitted forms and answers with the queued results. */
function recordingAction<T = unknown>(results: AdminActionState<T>[] = []) {
  const calls: FormData[] = [];
  const action: AdminFormAction<T> = async (_state, formData) => {
    calls.push(formData);
    return results.shift() ?? ({ ok: true, data: null as T, message: "Done." } as AdminActionState<T>);
  };
  return { action, calls };
}

const T1 = "0199a2b4-0000-7000-8000-000000000001";
const T2 = "0199a2b4-0000-7000-8000-000000000002";
const S1 = "0199a2b4-0000-7000-8000-0000000000a1";
const S2 = "0199a2b4-0000-7000-8000-0000000000a2";

const OPTIONS: AssignmentFormOptionsView = {
  classId: "0199a2b4-0000-7000-8000-0000000000c1",
  classSubject: { id: "0199a2b4-0000-7000-8000-0000000000b1", name: "Mathematics" },
  subjects: [],
  subjectId: null,
  lessons: [{ id: "0199a2b4-0000-7000-8000-0000000000d1", title: "Factorising", estimatedMinutes: 12 }],
  assessments: [
    { id: "0199a2b4-0000-7000-8000-0000000000e1", title: "Platform quiz", kind: "QUIZ", totalMarks: 10, timeLimitMinutes: null, owner: "platform" },
    { id: "0199a2b4-0000-7000-8000-0000000000e2", title: "Our school test", kind: "TOPIC_TEST", totalMarks: 20, timeLimitMinutes: 30, owner: "school" },
  ],
  topics: [
    { id: T1, name: "Algebra", code: "1", depth: 0 },
    { id: T2, name: "Quadratics", code: "1.1", depth: 1 },
  ],
  students: [
    { userId: S1, name: "Ann" },
    { userId: S2, name: "Ben" },
  ],
};

describe("AssignmentForm (§22 set work)", () => {
  function setup(results: AdminActionState[] = []) {
    const { action, calls } = recordingAction(results);
    render(
      <ToastProvider>
        <AssignmentForm options={OPTIONS} defaults={{ dueAt: "2026-10-12T09:00" }} basePath="/teacher/classes/c/assignments/new" action={action} />
      </ToastProvider>,
    );
    return { calls };
  }

  it("sets practice on chosen topics for chosen students", async () => {
    const user = userEvent.setup();
    const { calls } = setup();
    await user.type(screen.getByLabelText(/^Title/), "Quadratics practice");
    await user.click(screen.getByLabelText("1.1 Quadratics"));
    const count = screen.getByLabelText(/^Questions/);
    await user.clear(count);
    await user.type(count, "15");
    await user.click(screen.getByLabelText(/Only for some students/));
    await user.click(screen.getByLabelText("Ben"));
    await user.click(screen.getByRole("button", { name: "Set work" }));
    await waitFor(() => expect(calls).toHaveLength(1));
    const form = calls[0]!;
    expect(form.get("type")).toBe("PRACTICE");
    expect(form.getAll("topicIds")).toEqual([T2]);
    expect(form.get("questionCount")).toBe("15");
    expect(form.getAll("studentIds")).toEqual([S2]);
    expect(form.get("dueAt")).toBe("2026-10-12T09:00");
    expect(form.get("publish")).toBe("now");
    expect(form.get("classId")).toBe(OPTIONS.classId);
  });

  it("switches to tests (grouped by owner) and lessons", async () => {
    const user = userEvent.setup();
    setup();
    await user.click(screen.getByLabelText(/^Test/));
    const select = screen.getByRole("combobox", { name: /^Test/ });
    expect(within(select).getByRole("group", { name: "Your school's tests" })).toBeTruthy();
    expect(within(select).getByRole("group", { name: "Platform tests" })).toBeTruthy();
    expect(screen.queryByLabelText("Algebra")).toBeNull();
    await user.click(screen.getByLabelText(/^Lesson/));
    expect(screen.getByRole("option", { name: "Factorising (12 min)" })).toBeTruthy();
    expect(screen.queryByLabelText(/Attempts allowed/)).toBeNull();
  });

  it("shows the server's field errors and the schedule field", async () => {
    const user = userEvent.setup();
    setup([{ ok: false, error: { code: "VALIDATION", message: "Please fix the highlighted fields", fieldErrors: { topicIds: ["Choose at least one topic."] } }, values: { type: "PRACTICE" } }]);
    await user.click(screen.getByLabelText("Schedule"));
    expect(screen.getByLabelText(/^Publish at/)).toBeTruthy();
    await user.type(screen.getByLabelText(/^Title/), "x");
    await user.type(screen.getByLabelText(/^Publish at/), "2026-10-20T08:00");
    await user.click(screen.getByRole("button", { name: "Set work" }));
    expect(await screen.findByText("Choose at least one topic.")).toBeTruthy();
  });
});

describe("MarkAnswerForm (§22 marking)", () => {
  it("awards marks with a comment and refreshes the page", async () => {
    const user = userEvent.setup();
    const { action, calls } = recordingAction<unknown>([{ ok: true, data: null, message: "Mark saved. All answers are marked: 80%." }]);
    render(
      <ToastProvider>
        <MarkAnswerForm attemptId="a1" position={2} marksAvailable={4} suggestedMarks={2} isFinal={false} currentComment={null} action={action} />
      </ToastProvider>,
    );
    const marks = screen.getByLabelText(/Marks \(out of 4\)/) as HTMLInputElement;
    expect(marks.value).toBe("2");
    expect(marks.max).toBe("4");
    expect(screen.queryByLabelText(/Reason for changing/)).toBeNull();
    await user.clear(marks);
    await user.type(marks, "3");
    await user.type(screen.getByLabelText(/Comment for the student/), "Good start.");
    await user.click(screen.getByRole("button", { name: "Save mark" }));
    await waitFor(() => expect(calls).toHaveLength(1));
    expect(Object.fromEntries(calls[0]!.entries())).toMatchObject({ attemptId: "a1", position: "2", marksAwarded: "3", comment: "Good start." });
    await waitFor(() => expect(router.refresh).toHaveBeenCalled());
    expect((await screen.findAllByText("Mark saved. All answers are marked: 80%.")).length).toBeGreaterThan(0);
  });

  it("asks for a reason when changing a final mark and shows field errors", async () => {
    const user = userEvent.setup();
    const { action } = recordingAction<unknown>([{ ok: false, error: { code: "VALIDATION", message: "Invalid", fieldErrors: { marksAwarded: ["Award at most 4 marks."] } }, values: { marksAwarded: "9" } }]);
    render(
      <ToastProvider>
        <MarkAnswerForm attemptId="a1" position={1} marksAvailable={4} suggestedMarks={4} isFinal currentComment="Earlier" action={action} />
      </ToastProvider>,
    );
    expect(screen.getByLabelText(/Reason for changing the mark/)).toBeTruthy();
    await user.type(screen.getByLabelText(/Reason for changing the mark/), "Re-checked");
    await user.click(screen.getByRole("button", { name: "Change mark" }));
    expect(await screen.findByText("Award at most 4 marks.")).toBeTruthy();
    expect(router.refresh).not.toHaveBeenCalled();
  });
});

describe("AddStudentsForm", () => {
  it("lists the outcome for every identifier", async () => {
    const user = userEvent.setup();
    const results: AddStudentOutcome[] = [
      { identifier: "ann.m", outcome: "added", name: "Ann" },
      { identifier: "ben@example.test", outcome: "invited", sentTo: "be***@example.test", delivered: true, notSentReason: null, inviteLink: "http://localhost:3000/app/classes/invite/t1", joinCode: "ABC234" },
      {
        identifier: "+263771234567",
        outcome: "invited",
        sentTo: "+26377***67",
        delivered: false,
        notSentReason: "sms_switched_off",
        inviteLink: "http://localhost:3000/app/classes/invite/t2",
        joinCode: "ABC234",
      },
      { identifier: "zzz", outcome: "rejected", message: "No student with this username at your school." },
    ];
    const { action, calls } = recordingAction<{ results: AddStudentOutcome[] }>([{ ok: true, data: { results }, message: "1 added, 1 invited." }]);
    render(<AddStudentsForm classId="c1" schoolClass action={action} />);
    await user.type(screen.getByLabelText(/Emails, phone numbers or usernames/), "ann.m\nben@example.test\nzzz");
    await user.click(screen.getByRole("button", { name: "Add or invite" }));
    await waitFor(() => expect(calls).toHaveLength(1));
    expect(calls[0]!.get("classId")).toBe("c1");
    expect(await screen.findByText(/Ann added to the class/)).toBeTruthy();
    expect(screen.getByText(/invitation sent to be\*\*\*@example.test/)).toBeTruthy();
    // SMS is switched off: nothing was texted to the phone number, so the teacher gets the link (and the class code).
    expect(screen.getByText(/We don't send text messages/)).toBeTruthy();
    expect((screen.getByLabelText("Invitation link for +263771234567") as HTMLInputElement).value).toBe("http://localhost:3000/app/classes/invite/t2");
    expect(screen.getByText(/class code ABC 234/)).toBeTruthy();
    expect(screen.queryByLabelText("Invitation link for ben@example.test")).toBeNull();
    expect(screen.getByText(/No student with this username/)).toBeTruthy();
    expect(router.refresh).toHaveBeenCalled();
  });
});

describe("TestBuilder (§22 create tests)", () => {
  const ITEMS: BuilderItem[] = [
    { id: "q1", type: "MULTIPLE_CHOICE", excerpt: "First question", marks: 1, topic: "Algebra", source: "bank", itemMarks: null },
    { id: "q2", type: "ESSAY", excerpt: "Second question", marks: 4, topic: null, source: "own", itemMarks: null },
  ];

  function setup(extra: Partial<TestBuilderProps> = {}) {
    const save = vi.fn(async () => ({ ok: true as const, data: { id: "t1" } }));
    const search = vi.fn(async () => ({
      ok: true as const,
      data: [{ id: "q3", type: "TRUE_FALSE" as const, excerpt: "Third question", marks: 2, topic: "Quadratics", source: "bank" as const }],
    }));
    render(
      <TestBuilder
        assessmentId="t1"
        owner={{ kind: "school", schoolId: "s1" }}
        ownerName="Test High"
        subjectId="sub1"
        editable
        topics={[{ id: T1, name: "Algebra", depth: 0 }]}
        initialDetails={{ title: "Week 3", description: "", instructions: "", kind: "QUIZ", timeLimitMinutes: "", feedbackTiming: "AFTER_SUBMIT" }}
        initialItems={ITEMS}
        actions={{ save, search, createQuestion: vi.fn(), preview: vi.fn() }}
        {...extra}
      />,
    );
    return { save, search };
  }

  it("reorders, re-weights, adds from the bank and saves the whole draft", async () => {
    const user = userEvent.setup();
    const { save, search } = setup();
    expect(screen.getByText("Total: 5 marks")).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Move question 1 down" }));
    const marks = screen.getByLabelText("Marks for question 1");
    await user.clear(marks);
    await user.type(marks, "6");
    await user.click(screen.getByRole("button", { name: "Search" }));
    await waitFor(() => expect(search).toHaveBeenCalledWith(expect.objectContaining({ subjectId: "sub1", source: "bank", excludeIds: ["q2", "q1"] })));
    await user.click(await screen.findByRole("button", { name: "Add" }));
    expect(screen.getByText("Total: 9 marks")).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Save test" }));
    await waitFor(() => expect(save).toHaveBeenCalledTimes(1));
    expect(save).toHaveBeenCalledWith(
      expect.objectContaining({
        assessmentId: "t1",
        title: "Week 3",
        timeLimitMinutes: null,
        items: [
          { questionId: "q2", marks: 6 },
          { questionId: "q1", marks: null },
          { questionId: "q3", marks: null },
        ],
      }),
    );
    expect(await screen.findByText("Test saved.")).toBeTruthy();
  });

  it("loads the question composer only when the teacher asks for it", async () => {
    const user = userEvent.setup();
    setup();
    expect(screen.queryByLabelText("Question type")).toBeNull();
    await user.click(screen.getByRole("button", { name: "Write one" }));
    expect(await screen.findByLabelText("Question type")).toBeTruthy();
    expect(screen.queryByText("Loading the question editor…")).toBeNull();
  });

  it("is read-only for published tests", () => {
    setup({ editable: false });
    expect(screen.getByText(/First question/)).toBeTruthy();
    expect(screen.queryByRole("button", { name: "Save test" })).toBeNull();
    expect(screen.queryByRole("button", { name: /Move question/ })).toBeNull();
    expect(screen.queryByRole("button", { name: "Search" })).toBeNull();
  });
});
