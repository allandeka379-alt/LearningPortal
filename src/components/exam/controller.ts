/**
 * The exam room's client-side controller: wires the countdown ({@link ExamClockStore}) and the local-first answers
 * ({@link ExamAnswerStore}) to the exam Server Actions. Framework-free, so the React island stays a thin view and the
 * flows (autosave, clock re-sync, papers, submit) are testable on their own.
 *
 * The server stays authoritative throughout: the clock only re-syncs to server snapshots, a TIME_UP submit is
 * accepted only when the server agrees, and answers the server refuses (time up, submitted) are dropped and reported.
 */
import type { ActionResult } from "@/server/lib/errors";
import { createOutboxStorage, ExamAnswerStore, type OutboxEntry, type OutboxStorage, type SendOutcome } from "./autosave";
import { ExamClockStore } from "./exam-clock";
import type {
  ExamClock,
  ExamRoomData,
  ExamSectionInput,
  ExamSubmitReason,
  SaveExamInput,
  SaveExamResult,
  SubmitExamInput,
  SubmitExamResult,
} from "./types";

/** The exam Server Actions the room calls (passed in as props from the page). */
export interface ExamActions {
  save: (input: SaveExamInput) => Promise<ActionResult<SaveExamResult>>;
  syncClock: (attemptId: string) => Promise<ActionResult<ExamClock>>;
  startSection: (input: ExamSectionInput) => Promise<ActionResult<ExamClock>>;
  finishSection: (input: ExamSectionInput) => Promise<ActionResult<ExamClock>>;
  submit: (input: SubmitExamInput) => Promise<ActionResult<SubmitExamResult>>;
}

type ActionError = Extract<ActionResult<never>, { ok: false }>["error"];

/** Server refusals that retrying cannot fix: the change is dropped and the message shown. */
const PERMANENT_CODES: ReadonlySet<string> = new Set([
  "CONFLICT",
  "VALIDATION",
  "NOT_FOUND",
  "FORBIDDEN",
  "BAD_REQUEST",
  "ENTITLEMENT_REQUIRED",
  "QUOTA_EXCEEDED",
]);

/** How a failed save is handled: dropped (permanent) or kept and retried (connection, server hiccup, signed out). */
export function classifySaveFailure(error: ActionError): SendOutcome {
  if (PERMANENT_CODES.has(error.code)) return { kind: "rejected", code: error.code, message: error.message };
  if (error.code === "UNAUTHENTICATED") {
    return { kind: "retry", message: "You've been signed out. Sign in again in another tab; your answers are kept on this device." };
  }
  return { kind: "retry", message: "Couldn't reach the server. Your answers are kept on this device and will be saved automatically." };
}

/** The request sent for one outbox entry. */
export function saveInputFor(attemptId: string, entry: OutboxEntry): SaveExamInput {
  return {
    attemptId,
    position: entry.position,
    ...("response" in entry ? { response: entry.response ?? null, ...(entry.responseVersion !== undefined ? { responseVersion: entry.responseVersion } : {}) } : {}),
    ...(entry.flagged !== undefined ? { flagged: entry.flagged } : {}),
    clientSavedAtMs: Math.round(entry.clientSavedAtMs),
    ...(entry.timeSpentSeconds ? { timeSpentSeconds: entry.timeSpentSeconds } : {}),
  };
}

export type ClockSyncOutcome = "OPEN" | "CLOSED" | "FAILED" | "SKIPPED";

export type SubmitOutcome =
  | { kind: "DONE"; href: string }
  /** The server says time is not up yet (TIME_UP from a clock that ran ahead): keep going. */
  | { kind: "NOT_DUE" }
  /** Some answers could not be saved first (offline). Nothing was submitted. */
  | { kind: "UNSAVED" }
  | { kind: "ERROR"; code: string; message: string };

export interface ExamControllerOptions {
  /** Outbox storage (default: localStorage for this attempt). */
  storage?: OutboxStorage | null;
  /** Minimum gap between automatic clock re-syncs (focus + visibility often fire together). */
  syncThrottleMs?: number;
  deviceNow?: () => number;
}

export class ExamController {
  readonly attemptId: string;
  readonly clock: ExamClockStore;
  readonly answers: ExamAnswerStore;
  private readonly actions: ExamActions;
  private readonly deviceNow: () => number;
  private readonly syncThrottleMs: number;
  private lastSyncAtMs = Number.NEGATIVE_INFINITY;

  constructor(data: ExamRoomData, actions: ExamActions, options: ExamControllerOptions = {}) {
    this.attemptId = data.attemptId;
    this.actions = actions;
    this.deviceNow = options.deviceNow ?? (() => Date.now());
    this.syncThrottleMs = options.syncThrottleMs ?? 2_000;
    const titles: Record<number, string> = {};
    for (const section of data.sections) titles[section.sectionNumber] = section.title;
    this.clock = new ExamClockStore(data.clock, { sectionTitles: titles, deviceNow: this.deviceNow });
    this.answers = new ExamAnswerStore({
      initial: data.questions.map((q) => ({ position: q.position, response: q.response, flagged: q.flagged, responseVersion: q.responseVersion })),
      storage: options.storage === undefined ? createOutboxStorage(data.attemptId) : options.storage,
      serverNow: () => this.clock.serverNow(),
      deviceNow: this.deviceNow,
      send: (entry) => this.sendEntry(entry),
    });
  }

  private async sendEntry(entry: OutboxEntry): Promise<SendOutcome> {
    const sentAtMs = this.deviceNow();
    const result = await this.actions.save(saveInputFor(this.attemptId, entry));
    if (!result.ok) return classifySaveFailure(result.error);
    this.clock.syncDeadline(result.data.serverNowMs, result.data.deadlineMs, { sentAtMs, receivedAtMs: this.deviceNow() });
    return { kind: "saved", result: result.data };
  }

  /** Re-syncs the countdown with the server (throttled unless forced). `CLOSED`: the attempt was submitted / closed. */
  async syncClock(options: { force?: boolean } = {}): Promise<ClockSyncOutcome> {
    const now = this.deviceNow();
    if (!options.force && now - this.lastSyncAtMs < this.syncThrottleMs) return "SKIPPED";
    this.lastSyncAtMs = now;
    try {
      const result = await this.actions.syncClock(this.attemptId);
      if (!result.ok) return "FAILED";
      if (!result.data.open) return "CLOSED";
      this.clock.sync(result.data, { sentAtMs: now, receivedAtMs: this.deviceNow() });
      return "OPEN";
    } catch {
      return "FAILED";
    }
  }

  /** Starts a timed paper (its clock is the server's). */
  async startSection(sectionNumber: number): Promise<ActionResult<ExamClock>> {
    return this.sectionAction(this.actions.startSection, sectionNumber);
  }

  /** Finishes the running paper early (saves its answers first). */
  async finishSection(sectionNumber: number): Promise<ActionResult<ExamClock>> {
    await this.answers.drain();
    return this.sectionAction(this.actions.finishSection, sectionNumber);
  }

  private async sectionAction(
    action: (input: ExamSectionInput) => Promise<ActionResult<ExamClock>>,
    sectionNumber: number,
  ): Promise<ActionResult<ExamClock>> {
    const sentAtMs = this.deviceNow();
    let result: ActionResult<ExamClock>;
    try {
      result = await action({ attemptId: this.attemptId, sectionNumber });
    } catch {
      return { ok: false, error: { code: "INTERNAL", message: "Couldn't reach the server. Check your connection and try again." } };
    }
    if (result.ok) this.clock.sync(result.data, { sentAtMs, receivedAtMs: this.deviceNow() });
    return result;
  }

  /**
   * Saves everything still queued, then submits. A student submit with unsaved answers (offline) does nothing, so no
   * answer is lost; the student is asked to reconnect. On success the stored outbox is cleared.
   */
  async submit(reason: ExamSubmitReason): Promise<SubmitOutcome> {
    const saved = await this.answers.drain();
    if (!saved) return { kind: "UNSAVED" };
    let result: ActionResult<SubmitExamResult>;
    try {
      result = await this.actions.submit({ attemptId: this.attemptId, reason });
    } catch {
      return { kind: "UNSAVED" };
    }
    if (!result.ok) return { kind: "ERROR", code: result.error.code, message: result.error.message };
    if (!result.data.submitted) {
      this.clock.sync(result.data.clock);
      return { kind: "NOT_DUE" };
    }
    this.answers.stop();
    this.answers.clearStorage();
    return { kind: "DONE", href: result.data.resultsHref };
  }
}
