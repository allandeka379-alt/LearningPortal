import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { classifySaveFailure, ExamController, saveInputFor, type ExamActions } from "./controller";
import { accessSummary } from "./AssessmentCard";
import { saveStatusText } from "./SaveStatus";
import { submitSummaryLines } from "./SubmitDialog";
import type { ExamClock, ExamRoomData } from "./types";

const T0 = Date.UTC(2026, 9, 5, 8);

function data(): ExamRoomData {
  const clock: ExamClock = { attemptId: "att", open: true, serverNowMs: T0, deadlineMs: T0 + 600_000, sections: [] };
  return {
    attemptId: "att",
    title: "Test",
    kindLabel: "Topic test",
    subject: { id: "s", name: "Maths" },
    allowNavigation: true,
    clock,
    sections: [],
    questions: [{ position: 1, sectionNumber: null, marks: 1, flagged: false, response: null, responseVersion: 4, question: null }],
    startPosition: 1,
    totalMarks: 1,
    extraTimePercent: null,
  };
}

describe("save requests and failures", () => {
  it("builds the save request of an outbox entry", () => {
    expect(saveInputFor("att", { position: 2, response: null, responseVersion: 5, clientSavedAtMs: 10.4, timeSpentSeconds: 12 })).toEqual({
      attemptId: "att",
      position: 2,
      response: null,
      responseVersion: 5,
      clientSavedAtMs: 10,
      timeSpentSeconds: 12,
    });
    expect(saveInputFor("att", { position: 2, flagged: true, clientSavedAtMs: 1 })).toEqual({ attemptId: "att", position: 2, flagged: true, clientSavedAtMs: 1 });
  });

  it("drops refused saves and retries temporary failures", () => {
    expect(classifySaveFailure({ code: "CONFLICT", message: "Time is up: answers can no longer be changed." })).toEqual({
      kind: "rejected",
      code: "CONFLICT",
      message: "Time is up: answers can no longer be changed.",
    });
    expect(classifySaveFailure({ code: "VALIDATION", message: "x" }).kind).toBe("rejected");
    expect(classifySaveFailure({ code: "INTERNAL", message: "x" }).kind).toBe("retry");
    expect(classifySaveFailure({ code: "RATE_LIMITED", message: "x" }).kind).toBe("retry");
    expect(classifySaveFailure({ code: "UNAUTHENTICATED", message: "x" })).toMatchObject({ kind: "retry", message: expect.stringMatching(/signed out/) });
  });
});

describe("ExamController", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(T0);
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  function actions(overrides: Partial<ExamActions> = {}): ExamActions {
    return {
      save: vi.fn(async (input) => ({
        ok: true as const,
        data: { position: input.position, saved: true, stale: false, lateSync: false, flagged: false, answered: true, responseVersion: input.responseVersion ?? 0, serverNowMs: Date.now(), deadlineMs: T0 + 600_000 },
      })),
      syncClock: vi.fn(async () => ({ ok: true as const, data: { attemptId: "att", open: false, serverNowMs: Date.now(), deadlineMs: null, sections: [] } })),
      startSection: vi.fn(),
      finishSection: vi.fn(),
      submit: vi.fn(async () => ({ ok: true as const, data: { submitted: true as const, resultsHref: "/app/exams/attempt/att/results" } })),
      ...overrides,
    };
  }

  it("continues the server's save version and submits only after every answer is saved", async () => {
    const offline = actions({ save: vi.fn(async () => Promise.reject(new TypeError("offline"))) });
    const controller = new ExamController(data(), offline, { storage: null });
    controller.answers.setResponse(1, { type: "SHORT_ANSWER", text: "42" });
    expect(await controller.submit("STUDENT")).toEqual({ kind: "UNSAVED" });
    expect(offline.submit).not.toHaveBeenCalled();

    const online = actions();
    const second = new ExamController(data(), online, { storage: null });
    second.answers.setResponse(1, { type: "SHORT_ANSWER", text: "42" });
    expect(await second.submit("STUDENT")).toEqual({ kind: "DONE", href: "/app/exams/attempt/att/results" });
    expect(online.save).toHaveBeenCalledWith(expect.objectContaining({ responseVersion: 5 }));
    expect(online.submit).toHaveBeenCalledWith({ attemptId: "att", reason: "STUDENT" });
  });

  it("reports a closed attempt on clock sync and throttles automatic syncs", async () => {
    const a = actions();
    const controller = new ExamController(data(), a, { storage: null });
    expect(await controller.syncClock()).toBe("CLOSED");
    expect(await controller.syncClock()).toBe("SKIPPED");
    expect(await controller.syncClock({ force: true })).toBe("CLOSED");
    expect(a.syncClock).toHaveBeenCalledTimes(2);
  });
});

describe("UI copy helpers", () => {
  it("summarises autosave states", () => {
    const status = { state: "saved" as const, unsaved: 0, lastSavedAtMs: 1, message: null };
    expect(saveStatusText(status, true)).toEqual({ tone: "quiet", text: "All answers saved" });
    expect(saveStatusText({ ...status, state: "pending", unsaved: 1 }, true).text).toBe("Saving…");
    expect(saveStatusText({ ...status, state: "retrying", unsaved: 1 }, false).text).toMatch(/You're offline/);
    expect(saveStatusText({ ...status, state: "error", message: "Time is up." }, true)).toEqual({ tone: "problem", text: "Time is up." });
  });

  it("lists what is open before submitting", () => {
    expect(submitSummaryLines({ total: 4, answered: 4, unanswered: [], flagged: [] }, 0)).toEqual([
      "You've answered 4 of 4 questions.",
      "After you submit, you can't change your answers.",
    ]);
    expect(submitSummaryLines({ total: 3, answered: 0, unanswered: [1, 2, 3], flagged: [2] }, 1)).toEqual([
      "You've answered 0 of 3 questions.",
      "You haven't answered any questions, so you would score 0.",
      "Flagged for review: 2.",
      "Your latest changes will be saved first.",
      "After you submit, you can't change your answers.",
    ]);
  });

  it("summarises catalogue access", () => {
    expect(accessSummary({ status: "AVAILABLE", allowance: null })).toBeNull();
    expect(accessSummary({ status: "AVAILABLE", allowance: { limit: 2, remaining: 1, label: "mock exams left this month" } })).toEqual({
      text: "1 of 2 mock exams left this month",
      locked: false,
    });
    expect(accessSummary({ status: "UPGRADE", message: "Upgrade.", upgradeHref: "/pricing" })).toEqual({ text: "Upgrade.", locked: true });
  });
});
