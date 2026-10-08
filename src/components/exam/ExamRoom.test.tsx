/** @vitest-environment jsdom */
import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

const router = vi.hoisted(() => ({ refresh: vi.fn(), push: vi.fn(), replace: vi.fn() }));
vi.mock("next/navigation", () => ({ useRouter: () => router }));

import { mcqSingle, shortAnswerQuestion, trueFalseQuestion } from "@/components/questions/testing";
import type { ActionResult } from "@/server/lib/errors";
import { outboxStorageKey } from "./autosave";
import type { ExamActions } from "./controller";
import { ExamRoom } from "./ExamRoom";
import type { ExamClock, ExamRoomData, SaveExamInput, SaveExamResult, SubmitExamInput, SubmitExamResult } from "./types";

const ATTEMPT = "0199a1b2-0000-7000-8000-eeeeeeeeeeee";
const SERVER_T0 = Date.UTC(2026, 9, 5, 8, 0, 0);

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
  window.matchMedia ??= ((query: string) => ({ matches: false, media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
});

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(SERVER_T0);
  window.localStorage.clear();
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.clearAllMocks();
});

function roomData(clock: Partial<ExamClock> = {}): ExamRoomData {
  return {
    attemptId: ATTEMPT,
    title: "Algebra topic test",
    kindLabel: "Topic test",
    subject: { id: "0199a1b2-0000-7000-8000-000000000001", name: "Mathematics" },
    allowNavigation: true,
    clock: { attemptId: ATTEMPT, open: true, serverNowMs: SERVER_T0, deadlineMs: SERVER_T0 + 30 * 60_000, sections: [], ...clock },
    sections: [],
    questions: [
      { position: 1, sectionNumber: null, marks: 1, flagged: false, response: null, responseVersion: 0, question: mcqSingle() },
      { position: 2, sectionNumber: null, marks: 1, flagged: false, response: null, responseVersion: 0, question: shortAnswerQuestion() },
      { position: 3, sectionNumber: null, marks: 1, flagged: false, response: null, responseVersion: 0, question: trueFalseQuestion() },
    ],
    startPosition: 1,
    totalMarks: 3,
    extraTimePercent: null,
  };
}

function savedResult(input: SaveExamInput, deadlineMs: number | null): SaveExamResult {
  return {
    position: input.position,
    saved: true,
    stale: false,
    lateSync: false,
    flagged: input.flagged ?? false,
    answered: input.response !== undefined && input.response !== null,
    responseVersion: input.responseVersion ?? 0,
    serverNowMs: Date.now(),
    deadlineMs,
  };
}

function makeActions(overrides: Partial<ExamActions> = {}, deadlineMs: number | null = SERVER_T0 + 30 * 60_000) {
  const save = vi.fn(async (input: SaveExamInput): Promise<ActionResult<SaveExamResult>> => ({ ok: true, data: savedResult(input, deadlineMs) }));
  const submit = vi.fn(
    async (input: SubmitExamInput): Promise<ActionResult<SubmitExamResult>> => ({ ok: true, data: { submitted: true, resultsHref: `/app/exams/attempt/${input.attemptId}/results` } }),
  );
  const actions: ExamActions = {
    save,
    submit,
    syncClock: vi.fn(async () => ({ ok: true as const, data: roomData().clock })),
    startSection: vi.fn(),
    finishSection: vi.fn(),
    ...overrides,
  };
  return { actions, save, submit };
}

async function advance(ms: number) {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(ms);
  });
}

function option(text: string): HTMLInputElement {
  return screen.getByRole("radio", { name: new RegExp(text + "$") }) as HTMLInputElement;
}

function press(key: string, target: Element = document.body) {
  fireEvent.keyDown(target, { key });
}

describe("ExamRoom autosave", () => {
  it("shows the answer at once and saves it once, after the debounce", async () => {
    const { actions, save } = makeActions();
    render(<ExamRoom data={roomData()} actions={actions} exitHref="/app/exams" />);
    const title = screen.getByRole("heading", { level: 1, name: "Algebra topic test" });
    // At the largest text size the title wraps in a growing header instead of being cut off (§43 resize text).
    expect(title.className.split(/\s+/)).not.toContain("truncate");
    expect(title.closest("header")?.querySelector(".h-16")).toBeNull();
    expect(screen.getByText("Question 1 of 3")).toBeTruthy();
    fireEvent.click(option("x = 2"));
    expect((option("x = 2") as HTMLInputElement).checked).toBe(true);
    await advance(1_999);
    expect(save).not.toHaveBeenCalled();
    await advance(1);
    expect(save).toHaveBeenCalledTimes(1);
    expect(save.mock.calls[0]?.[0]).toMatchObject({
      attemptId: ATTEMPT,
      position: 1,
      response: { type: "MULTIPLE_CHOICE", optionKeys: ["A"] },
      responseVersion: 1,
      clientSavedAtMs: SERVER_T0,
    });
    expect(screen.getByText("All answers saved")).toBeTruthy();
  });

  it("keeps a failed save on this device, retries with backoff and recovers", async () => {
    let online = false;
    const { actions, save } = makeActions();
    const flaky = vi.fn(async (input: SaveExamInput): Promise<ActionResult<SaveExamResult>> => {
      if (!online) throw new TypeError("Failed to fetch");
      return save(input);
    });
    render(<ExamRoom data={roomData()} actions={{ ...actions, save: flaky }} exitHref="/app/exams" />);
    fireEvent.click(option("x = 2"));
    await advance(2_000);
    expect(flaky).toHaveBeenCalledTimes(1);
    expect(screen.getAllByText("Not saved yet. Trying again…").length).toBeGreaterThan(0);
    expect(window.localStorage.getItem(outboxStorageKey(ATTEMPT))).toContain("MULTIPLE_CHOICE");
    online = true;
    await advance(2_000);
    expect(flaky).toHaveBeenCalledTimes(2);
    expect(screen.getByText("All answers saved")).toBeTruthy();
    expect(window.localStorage.getItem(outboxStorageKey(ATTEMPT))).toBeNull();
  });

  it("restores answers that were not sent before a reload", async () => {
    window.localStorage.setItem(
      outboxStorageKey(ATTEMPT),
      JSON.stringify({ v: 1, entries: [{ position: 1, response: { type: "MULTIPLE_CHOICE", optionKeys: ["C"] }, responseVersion: 1, clientSavedAtMs: SERVER_T0 - 5_000 }] }),
    );
    const { actions, save } = makeActions();
    render(<ExamRoom data={roomData()} actions={actions} exitHref="/app/exams" />);
    await advance(0);
    expect((option("x = 3") as HTMLInputElement).checked).toBe(true);
    expect(save).toHaveBeenCalledWith(expect.objectContaining({ position: 1, response: { type: "MULTIPLE_CHOICE", optionKeys: ["C"] }, clientSavedAtMs: SERVER_T0 - 5_000 }));
  });
});

describe("ExamRoom navigation, flags and keyboard", () => {
  it("flags at once and supports N / P / F / R without hijacking typing", async () => {
    const { actions, save } = makeActions();
    render(<ExamRoom data={roomData()} actions={actions} exitHref="/app/exams" />);
    press("f");
    await advance(0);
    expect(save).toHaveBeenCalledWith(expect.objectContaining({ position: 1, flagged: true }));
    expect(screen.getByRole("button", { name: "Flagged" }).getAttribute("aria-pressed")).toBe("true");

    press("n");
    expect(screen.getByText("Question 2 of 3")).toBeTruthy();
    expect(document.activeElement?.textContent).toContain("Question 2");
    const box = screen.getByLabelText("Your answer");
    fireEvent.keyDown(box, { key: "n" });
    fireEvent.keyDown(box, { key: "p" });
    expect(screen.getByText("Question 2 of 3")).toBeTruthy();
    press("p");
    expect(screen.getByText("Question 1 of 3")).toBeTruthy();
    press("r");
    expect(screen.getByRole("heading", { name: "Review your answers" })).toBeTruthy();
  });

  it("Q moves focus into the question grid (desktop) and the grid is operable with the keyboard alone", async () => {
    const previous = window.matchMedia;
    window.matchMedia = ((query: string) => ({ matches: query.includes("64rem"), media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
    try {
      const { actions } = makeActions();
      render(<ExamRoom data={roomData()} actions={actions} exitHref="/app/exams" />);
      const grid = screen.getByRole("complementary", { name: "Questions" });
      press("q");
      const current = within(grid).getByRole("button", { name: "Question 1, not answered, current question" });
      expect(document.activeElement).toBe(current);
      expect(current.getAttribute("aria-current")).toBe("step");

      // Native buttons: Enter / Space activate them; the new question's heading then takes focus.
      const second = within(grid).getByRole("button", { name: /^Question 2,/ });
      second.focus();
      fireEvent.click(second); // what Enter / Space do on a focused <button>
      expect(screen.getByText("Question 2 of 3")).toBeTruthy();
      expect(document.activeElement?.tagName).toBe("H2");
      expect(document.activeElement?.textContent).toContain("Question 2");
      expect(within(grid).getByRole("button", { name: "Question 2, not answered, current question" })).toBeTruthy();
    } finally {
      window.matchMedia = previous;
    }
  });

  it("lists unanswered and flagged questions on the review screen and submits after confirmation", async () => {
    const { actions, submit } = makeActions();
    render(<ExamRoom data={roomData()} actions={actions} exitHref="/app/exams" />);
    fireEvent.click(option("x = 2"));
    fireEvent.click(screen.getAllByRole("button", { name: /^Question 3,/ })[0] as HTMLElement);
    expect(screen.getByText("Question 3 of 3")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Flag" }));
    fireEvent.click(screen.getByRole("button", { name: /Review your answers$/ }));

    const unanswered = screen.getByRole("region", { name: "Not answered (2)" });
    expect(within(unanswered).getByRole("button", { name: "Question 2" })).toBeTruthy();
    expect(within(unanswered).getByRole("button", { name: "Question 3" })).toBeTruthy();
    expect(within(screen.getByRole("region", { name: "Flagged for review (1)" })).getByRole("button", { name: "Question 3" })).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Submit exam" }));
    const dialog = screen.getByRole("alertdialog", { name: "Submit your exam?" });
    expect(within(dialog).getByText("You've answered 1 of 3 questions.")).toBeTruthy();
    expect(within(dialog).getByText("2 questions not answered: 2, 3.")).toBeTruthy();
    expect(within(dialog).getByText("Flagged for review: 3.")).toBeTruthy();
    fireEvent.click(within(dialog).getByRole("button", { name: "Submit exam" }));
    await advance(0);
    expect(submit).toHaveBeenCalledWith({ attemptId: ATTEMPT, reason: "STUDENT" });
    expect(router.replace).toHaveBeenCalledWith(`/app/exams/attempt/${ATTEMPT}/results`);
  });
});

describe("ExamRoom papers", () => {
  function paperData(): ExamRoomData {
    const base = roomData({ deadlineMs: null });
    const notStarted = { startedAtMs: null, deadlineMs: null, finishedAtMs: null };
    return {
      ...base,
      title: "Mock exam",
      clock: {
        ...base.clock,
        sections: [
          { sectionNumber: 1, timeLimitSeconds: 600, ...notStarted },
          { sectionNumber: 2, timeLimitSeconds: 900, ...notStarted },
        ],
      },
      sections: [
        { sectionNumber: 1, title: "Paper 1", answerCount: null, marks: 2, positions: [1, 2], timeLimitSeconds: 600, ...notStarted },
        { sectionNumber: 2, title: "Paper 2", answerCount: null, marks: 1, positions: [3], timeLimitSeconds: 900, ...notStarted },
      ],
      questions: base.questions.map((q) => ({ ...q, sectionNumber: q.position < 3 ? 1 : 2 })),
    };
  }

  it("starts one paper at a time and finishes the running paper before the next", async () => {
    const running1: ExamClock = {
      attemptId: ATTEMPT,
      open: true,
      serverNowMs: SERVER_T0,
      deadlineMs: null,
      sections: [
        { sectionNumber: 1, timeLimitSeconds: 600, startedAtMs: SERVER_T0, deadlineMs: SERVER_T0 + 600_000, finishedAtMs: null },
        { sectionNumber: 2, timeLimitSeconds: 900, startedAtMs: null, deadlineMs: null, finishedAtMs: null },
      ],
    };
    const finished1: ExamClock = {
      ...running1,
      serverNowMs: SERVER_T0 + 1_000,
      sections: [{ ...(running1.sections[0] as ExamClock["sections"][number]), finishedAtMs: SERVER_T0 + 1_000 }, running1.sections[1] as ExamClock["sections"][number]],
    };
    const startSection = vi.fn(async () => ({ ok: true as const, data: running1 }));
    const finishSection = vi.fn(async () => ({ ok: true as const, data: finished1 }));
    const { actions } = makeActions({ startSection, finishSection }, null);
    render(<ExamRoom data={paperData()} actions={actions} exitHref="/app/exams" />);

    expect(screen.getByText("No paper running")).toBeTruthy();
    expect(screen.queryByRole("radio")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Start Paper 1" }));
    await advance(0);
    expect(startSection).toHaveBeenCalledWith({ attemptId: ATTEMPT, sectionNumber: 1 });
    expect(screen.getByRole("timer").getAttribute("aria-label")).toBe("Paper 1: time left");
    expect(option("x = 2").disabled).toBe(false);

    // Paper 2 is blocked while Paper 1 runs; finishing Paper 1 from there asks for confirmation.
    fireEvent.click(screen.getAllByRole("button", { name: /^Question 3,/ })[0] as HTMLElement);
    expect(screen.getByText("Paper 1 is still running")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Finish Paper 1" }));
    const dialog = screen.getByRole("alertdialog", { name: "Finish Paper 1?" });
    fireEvent.click(within(dialog).getByRole("button", { name: "Finish paper" }));
    await advance(0);
    expect(finishSection).toHaveBeenCalledWith({ attemptId: ATTEMPT, sectionNumber: 1 });
    expect(screen.getByRole("button", { name: "Start Paper 2" })).toBeTruthy();

    // Paper 1's answers are now locked.
    fireEvent.click(screen.getAllByRole("button", { name: /^Question 1,/ })[0] as HTMLElement);
    expect(screen.getByText("You finished Paper 1")).toBeTruthy();
    expect(option("x = 2").disabled).toBe(true);
  });
});

describe("ExamRoom time-up", () => {
  it("saves and submits automatically when the server deadline is reached", async () => {
    const { actions, save, submit } = makeActions({}, SERVER_T0 + 5_000);
    render(<ExamRoom data={roomData({ deadlineMs: SERVER_T0 + 5_000 })} actions={actions} exitHref="/app/exams" />);
    fireEvent.click(option("x = 3"));
    await advance(4_000);
    expect(submit).not.toHaveBeenCalled();
    await advance(1_500);
    expect(save).toHaveBeenCalledWith(expect.objectContaining({ position: 1, response: { type: "MULTIPLE_CHOICE", optionKeys: ["C"] } }));
    expect(submit).toHaveBeenCalledWith({ attemptId: ATTEMPT, reason: "TIME_UP" });
    expect(router.replace).toHaveBeenCalledWith(`/app/exams/attempt/${ATTEMPT}/results`);
  });

  it("keeps going when the server says time is not up yet, and locks answers once it is", async () => {
    const later: ExamClock = { attemptId: ATTEMPT, open: true, serverNowMs: SERVER_T0 + 3_000, deadlineMs: SERVER_T0 + 60_000, sections: [] };
    const { actions } = makeActions();
    const submit = vi.fn(async (): Promise<ActionResult<SubmitExamResult>> => ({ ok: true, data: { submitted: false, clock: later } }));
    render(<ExamRoom data={roomData({ deadlineMs: SERVER_T0 + 2_000 })} actions={{ ...actions, submit }} exitHref="/app/exams" />);
    await advance(3_000);
    expect(submit).toHaveBeenCalledTimes(1);
    expect(router.replace).not.toHaveBeenCalled();
    expect((option("x = 2") as HTMLInputElement).disabled).toBe(false);
  });
});

describe("ExamRoom wording and destination", () => {
  const REPORT = `/app/diagnostic/${ATTEMPT}/report`;

  it("names what is submitted and opens the given results page after submitting", async () => {
    const { actions } = makeActions({
      submit: vi.fn(async (): Promise<ActionResult<SubmitExamResult>> => ({ ok: true, data: { submitted: true, resultsHref: REPORT } })),
    });
    render(<ExamRoom data={roomData()} actions={actions} exitHref="/app/diagnostic" resultsHref={REPORT} noun="diagnostic" />);
    press("r");
    fireEvent.click(screen.getByRole("button", { name: "Submit diagnostic" }));
    const dialog = screen.getByRole("alertdialog", { name: "Submit your diagnostic?" });
    fireEvent.click(within(dialog).getByRole("button", { name: "Submit diagnostic" }));
    await advance(0);
    expect(router.replace).toHaveBeenCalledWith(REPORT);
  });

  it("goes to the given results page when the attempt was closed elsewhere", async () => {
    const closed: ExamClock = { ...roomData().clock, open: false };
    const { actions } = makeActions({ syncClock: vi.fn(async () => ({ ok: true as const, data: closed })) });
    render(<ExamRoom data={roomData()} actions={actions} exitHref="/app/diagnostic" resultsHref={REPORT} noun="diagnostic" />);
    await advance(61_000);
    expect(router.replace).toHaveBeenCalledWith(REPORT);
    expect(router.replace).not.toHaveBeenCalledWith(`/app/exams/attempt/${ATTEMPT}/results`);
  });
});
