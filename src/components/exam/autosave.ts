/**
 * Local-first answers + autosave outbox for the exam room (§12 "save progress", §13 "flag question",
 * ARCHITECTURE §3.13 "answers autosave locally first, then sync").
 *
 * The store holds the student's current answers and flags (what the inputs show) and an OUTBOX of changes the server
 * has not confirmed yet:
 * - an answer change is sent {@link AUTOSAVE_DEBOUNCE_MS} after the last edit (at least every
 *   {@link AUTOSAVE_MAX_INTERVAL_MS} while the student keeps typing); a flag change, navigation, the page being hidden,
 *   coming back online and submitting flush at once (`flush()`);
 * - one request at a time, newest value per question (an edit made while a save is in flight is sent next);
 * - each answer change carries a client version higher than the server's, so an older replay never overwrites a newer
 *   answer, and the time it was made (server-clock estimate) so a change made before the deadline can still sync
 *   within the late-sync grace window;
 * - a failed send (offline, server error) stays queued and is retried with backoff ({@link AUTOSAVE_RETRY_BACKOFF_MS});
 *   a rejected one (time is up, attempt submitted, invalid) is dropped and reported;
 * - the outbox is mirrored to localStorage for the CURRENT attempt only (`createOutboxStorage`), so a reload or a
 *   crash keeps unsent answers; `restore()` brings them back. Storage failures (private mode, quota) are ignored.
 *
 * Framework-free (a `useSyncExternalStore` store); unit tested with fake timers in autosave.test.ts.
 */
import type { QuestionResponse } from "@/components/questions/types";
import type { SaveExamResult } from "./types";

/** Mirrors `AUTOSAVE_POLICY` in src/server/exams/timer.ts (a test keeps them in sync). */
export const AUTOSAVE_DEBOUNCE_MS = 2_000;
export const AUTOSAVE_MAX_INTERVAL_MS = 30_000;
export const AUTOSAVE_RETRY_BACKOFF_MS: readonly number[] = [2_000, 5_000, 10_000, 30_000];

/** One unsent change of one question. */
export interface OutboxEntry {
  position: number;
  /** Present when the answer changed (`null` = cleared). Absent = flag-only change. */
  response?: QuestionResponse | null;
  /** Client version of `response` (sent with it). */
  responseVersion?: number;
  flagged?: boolean;
  /** When the change was made (server-clock estimate, ms). */
  clientSavedAtMs: number;
  timeSpentSeconds?: number;
}

export type SendOutcome =
  | { kind: "saved"; result: SaveExamResult }
  /** Temporary failure (offline, server error): keep and retry. */
  | { kind: "retry"; message?: string }
  /** Permanent: the server refused this change (time up, submitted, invalid). */
  | { kind: "rejected"; code: string; message: string };

export interface AnswerEntry {
  response: QuestionResponse | null;
  flagged: boolean;
  /** Highest version known for this answer (server or local). */
  version: number;
}

export type AutosaveState = "idle" | "pending" | "saving" | "saved" | "retrying" | "error";

export interface AutosaveStatus {
  state: AutosaveState;
  /** Questions with changes the server has not confirmed. */
  unsaved: number;
  /** Device time of the last confirmed save. */
  lastSavedAtMs: number | null;
  /** The last problem in plain language (cleared by the next successful save). */
  message: string | null;
}

export interface AnswersSnapshot {
  answers: Readonly<Record<number, AnswerEntry>>;
  status: AutosaveStatus;
}

export interface OutboxStorage {
  load(): OutboxEntry[];
  save(entries: readonly OutboxEntry[]): void;
  clear(): void;
}

export interface AnswerStoreHandlers {
  onSaved?: (entry: OutboxEntry, result: SaveExamResult) => void;
  onRejected?: (entry: OutboxEntry, error: { code: string; message: string }) => void;
}

export interface ExamAnswerStoreOptions {
  initial: readonly { position: number; response: QuestionResponse | null; flagged: boolean; responseVersion: number }[];
  send: (entry: OutboxEntry) => Promise<SendOutcome>;
  storage?: OutboxStorage | null;
  /** Server-clock estimate for `clientSavedAtMs` (default: device clock). */
  serverNow?: () => number;
  /** Device clock (default `Date.now`). */
  deviceNow?: () => number;
  debounceMs?: number;
  maxIntervalMs?: number;
  backoffMs?: readonly number[];
}

/** Merges a newer change into an older one of the same question (newer values win; time spent keeps the maximum). */
export function mergeEntries(older: OutboxEntry, newer: OutboxEntry): OutboxEntry {
  const merged: OutboxEntry = { position: newer.position, clientSavedAtMs: Math.max(older.clientSavedAtMs, newer.clientSavedAtMs) };
  if ("response" in newer) {
    merged.response = newer.response ?? null;
    if (newer.responseVersion !== undefined) merged.responseVersion = newer.responseVersion;
  } else if ("response" in older) {
    merged.response = older.response ?? null;
    if (older.responseVersion !== undefined) merged.responseVersion = older.responseVersion;
  }
  const flagged = newer.flagged ?? older.flagged;
  if (flagged !== undefined) merged.flagged = flagged;
  const time = Math.max(older.timeSpentSeconds ?? 0, newer.timeSpentSeconds ?? 0);
  if (time > 0) merged.timeSpentSeconds = time;
  return merged;
}

const IDLE_STATUS: AutosaveStatus = { state: "idle", unsaved: 0, lastSavedAtMs: null, message: null };

export class ExamAnswerStore {
  private answers: Record<number, AnswerEntry>;
  private status: AutosaveStatus = IDLE_STATUS;
  private snapshot: AnswersSnapshot;
  private readonly initialSnapshot: AnswersSnapshot;
  private readonly outbox = new Map<number, OutboxEntry>();
  private inFlight: OutboxEntry | null = null;
  private running: Promise<void> | null = null;
  private flushAgain = false;
  private debounceTimer: ReturnType<typeof setTimeout> | null = null;
  private retryTimer: ReturnType<typeof setTimeout> | null = null;
  private firstQueuedAtMs: number | null = null;
  private failures = 0;
  private lastSavedAtMs: number | null = null;
  private message: string | null = null;
  private stopped = false;
  private handlers: AnswerStoreHandlers = {};
  private readonly listeners = new Set<() => void>();
  private readonly send: ExamAnswerStoreOptions["send"];
  private readonly storage: OutboxStorage | null;
  private readonly serverNow: () => number;
  private readonly deviceNow: () => number;
  private readonly debounceMs: number;
  private readonly maxIntervalMs: number;
  private readonly backoffMs: readonly number[];

  constructor(options: ExamAnswerStoreOptions) {
    this.answers = {};
    for (const item of options.initial) {
      this.answers[item.position] = { response: item.response, flagged: item.flagged, version: item.responseVersion };
    }
    this.send = options.send;
    this.storage = options.storage ?? null;
    this.deviceNow = options.deviceNow ?? (() => Date.now());
    this.serverNow = options.serverNow ?? this.deviceNow;
    this.debounceMs = options.debounceMs ?? AUTOSAVE_DEBOUNCE_MS;
    this.maxIntervalMs = options.maxIntervalMs ?? AUTOSAVE_MAX_INTERVAL_MS;
    this.backoffMs = options.backoffMs ?? AUTOSAVE_RETRY_BACKOFF_MS;
    this.snapshot = { answers: this.answers, status: this.status };
    this.initialSnapshot = this.snapshot;
  }

  // --- useSyncExternalStore -----------------------------------------------------------------------------------------

  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  getSnapshot = (): AnswersSnapshot => this.snapshot;
  getServerSnapshot = (): AnswersSnapshot => this.initialSnapshot;

  setHandlers(handlers: AnswerStoreHandlers): void {
    this.handlers = handlers;
  }

  // --- edits --------------------------------------------------------------------------------------------------------

  /** The student changed an answer: shown at once, saved after the debounce. */
  setResponse(position: number, response: QuestionResponse | null, timeSpentSeconds?: number): void {
    const current = this.answers[position] ?? { response: null, flagged: false, version: 0 };
    const version = current.version + 1;
    this.answers = { ...this.answers, [position]: { ...current, response, version } };
    this.enqueue({
      position,
      response,
      responseVersion: version,
      clientSavedAtMs: this.serverNow(),
      ...(timeSpentSeconds !== undefined && timeSpentSeconds > 0 ? { timeSpentSeconds: Math.round(timeSpentSeconds) } : {}),
    });
    this.scheduleDebounced();
    this.publish();
  }

  /** The student flagged / unflagged a question: shown and saved at once. */
  setFlag(position: number, flagged: boolean): void {
    const current = this.answers[position] ?? { response: null, flagged: false, version: 0 };
    this.answers = { ...this.answers, [position]: { ...current, flagged } };
    this.enqueue({ position, flagged, clientSavedAtMs: this.serverNow() });
    this.publish();
    void this.flush();
  }

  // --- syncing ------------------------------------------------------------------------------------------------------

  /**
   * Sends everything queued now (navigation, page hidden, back online, submit). `force: false` (the debounce timer)
   * waits for a scheduled retry instead of hammering a failing connection.
   */
  flush(options: { force?: boolean } = {}): Promise<void> {
    const force = options.force ?? true;
    if (this.stopped) return Promise.resolve();
    if (!force && this.retryTimer !== null) return Promise.resolve();
    this.clearTimer("debounce");
    if (force) this.clearTimer("retry");
    if (this.running) {
      this.flushAgain = true;
      return this.running;
    }
    if (this.outbox.size === 0) return Promise.resolve();
    this.running = this.run().finally(() => {
      this.running = null;
      if (this.flushAgain) {
        this.flushAgain = false;
        if (this.outbox.size > 0 && this.retryTimer === null) void this.flush({ force: false });
      }
    });
    return this.running;
  }

  /** Flushes and reports whether every change is now confirmed by the server (before submitting or leaving). */
  async drain(): Promise<boolean> {
    await this.flush();
    while (this.running) await this.running;
    return this.outbox.size === 0 && this.inFlight === null;
  }

  /** Changes not confirmed yet (including one in flight). */
  hasUnsaved(): boolean {
    return this.outbox.size > 0 || this.inFlight !== null;
  }

  /**
   * Brings back unsent changes from storage (after a reload or crash): answers newer than the server's version are
   * shown again, flags re-applied, and everything is queued to sync. Returns how many questions were restored.
   */
  restore(): number {
    this.stopped = false;
    const stored = this.storage?.load() ?? [];
    let restored = 0;
    for (const entry of stored) {
      const current = this.answers[entry.position];
      if (!current) continue;
      const usable: OutboxEntry = { position: entry.position, clientSavedAtMs: entry.clientSavedAtMs };
      let next = current;
      if ("response" in entry && entry.responseVersion !== undefined && entry.responseVersion > current.version) {
        usable.response = entry.response ?? null;
        usable.responseVersion = entry.responseVersion;
        next = { ...next, response: entry.response ?? null, version: entry.responseVersion };
      }
      if (entry.flagged !== undefined) {
        usable.flagged = entry.flagged;
        next = { ...next, flagged: entry.flagged };
      }
      if (entry.timeSpentSeconds) usable.timeSpentSeconds = entry.timeSpentSeconds;
      if (!("response" in usable) && usable.flagged === undefined) continue;
      this.answers = { ...this.answers, [entry.position]: next };
      const queued = this.outbox.get(entry.position);
      this.outbox.set(entry.position, queued ? mergeEntries(usable, queued) : usable);
      restored += 1;
    }
    if (restored > 0) {
      this.firstQueuedAtMs ??= this.deviceNow();
      this.persist();
      this.publish();
      void this.flush();
    }
    return restored;
  }

  /** Stops timers (unmount). Queued changes stay in storage. */
  stop(): void {
    this.stopped = true;
    this.clearTimer("debounce");
    this.clearTimer("retry");
  }

  /** Forgets stored changes (after a successful submission). */
  clearStorage(): void {
    this.storage?.clear();
  }

  // --- internals ----------------------------------------------------------------------------------------------------

  private enqueue(entry: OutboxEntry): void {
    const queued = this.outbox.get(entry.position);
    this.outbox.set(entry.position, queued ? mergeEntries(queued, entry) : entry);
    this.firstQueuedAtMs ??= this.deviceNow();
    this.persist();
  }

  private scheduleDebounced(): void {
    if (this.stopped || this.retryTimer !== null) return;
    this.clearTimer("debounce");
    const waited = this.firstQueuedAtMs === null ? 0 : this.deviceNow() - this.firstQueuedAtMs;
    const delay = Math.max(0, Math.min(this.debounceMs, this.maxIntervalMs - waited));
    this.debounceTimer = setTimeout(() => {
      this.debounceTimer = null;
      void this.flush({ force: false });
    }, delay);
  }

  private scheduleRetry(): void {
    if (this.stopped) return;
    this.clearTimer("retry");
    const delay = this.backoffMs[Math.min(this.failures, this.backoffMs.length) - 1] ?? this.backoffMs[this.backoffMs.length - 1] ?? 30_000;
    this.retryTimer = setTimeout(() => {
      this.retryTimer = null;
      void this.flush({ force: false });
    }, delay);
  }

  private clearTimer(which: "debounce" | "retry"): void {
    if (which === "debounce" && this.debounceTimer !== null) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = null;
    }
    if (which === "retry" && this.retryTimer !== null) {
      clearTimeout(this.retryTimer);
      this.retryTimer = null;
    }
  }

  private async run(): Promise<void> {
    // Positions queued when the flush started; later edits wait for their own debounce (or the next flush).
    const batch = [...this.outbox.keys()];
    this.firstQueuedAtMs = null;
    for (const position of batch) {
      if (this.stopped) return;
      const entry = this.outbox.get(position);
      if (!entry) continue;
      this.outbox.delete(position);
      this.inFlight = entry;
      this.publish();
      let outcome: SendOutcome;
      try {
        outcome = await this.send(entry);
      } catch {
        outcome = { kind: "retry" };
      }
      this.inFlight = null;
      if (outcome.kind === "retry") {
        this.failures += 1;
        const newer = this.outbox.get(position);
        this.outbox.set(position, newer ? mergeEntries(entry, newer) : entry);
        this.firstQueuedAtMs ??= this.deviceNow();
        this.message = outcome.message ?? null;
        this.persist();
        this.scheduleRetry();
        this.publish();
        return;
      }
      if (outcome.kind === "saved") {
        this.failures = 0;
        this.lastSavedAtMs = this.deviceNow();
        this.message = null;
        this.persist();
        this.publish();
        this.handlers.onSaved?.(entry, outcome.result);
      } else {
        this.message = outcome.message;
        this.persist();
        this.publish();
        this.handlers.onRejected?.(entry, { code: outcome.code, message: outcome.message });
      }
    }
    if (this.outbox.size > 0 && this.debounceTimer === null && this.retryTimer === null && !this.stopped) {
      this.firstQueuedAtMs ??= this.deviceNow();
      this.scheduleDebounced();
    }
  }

  private persist(): void {
    if (!this.storage) return;
    const entries = [...(this.inFlight ? [this.inFlight] : []), ...this.outbox.values()];
    if (entries.length === 0) this.storage.clear();
    else this.storage.save(entries);
  }

  private computeStatus(): AutosaveStatus {
    const positions = new Set(this.outbox.keys());
    if (this.inFlight) positions.add(this.inFlight.position);
    const state: AutosaveState = this.inFlight
      ? "saving"
      : this.retryTimer !== null
        ? "retrying"
        : this.outbox.size > 0
          ? "pending"
          : this.message !== null
            ? "error"
            : this.lastSavedAtMs !== null
              ? "saved"
              : "idle";
    return { state, unsaved: positions.size, lastSavedAtMs: this.lastSavedAtMs, message: this.message };
  }

  private publish(): void {
    const status = this.computeStatus();
    const same =
      status.state === this.status.state &&
      status.unsaved === this.status.unsaved &&
      status.lastSavedAtMs === this.status.lastSavedAtMs &&
      status.message === this.status.message;
    if (same && this.snapshot.answers === this.answers) return;
    if (!same) this.status = status;
    this.snapshot = { answers: this.answers, status: this.status };
    for (const listener of [...this.listeners]) listener();
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// localStorage fallback (current attempt only)
// ---------------------------------------------------------------------------------------------------------------------

const STORAGE_PREFIX = "dz-exam-outbox:";

/** The localStorage key of an attempt's unsent changes. */
export function outboxStorageKey(attemptId: string): string {
  return `${STORAGE_PREFIX}${attemptId}`;
}

function isEntry(value: unknown): value is OutboxEntry {
  if (typeof value !== "object" || value === null) return false;
  const entry = value as Record<string, unknown>;
  if (!Number.isInteger(entry.position) || (entry.position as number) < 1) return false;
  if (typeof entry.clientSavedAtMs !== "number" || !Number.isFinite(entry.clientSavedAtMs)) return false;
  if ("response" in entry && entry.response !== null && (typeof entry.response !== "object" || typeof (entry.response as { type?: unknown }).type !== "string")) {
    return false;
  }
  if ("responseVersion" in entry && entry.responseVersion !== undefined && !Number.isInteger(entry.responseVersion)) return false;
  if ("flagged" in entry && entry.flagged !== undefined && typeof entry.flagged !== "boolean") return false;
  return true;
}

/**
 * localStorage mirror of one attempt's outbox. Every access is guarded: private windows, blocked storage or a full
 * quota simply mean no fallback (the in-memory queue still retries).
 */
export function createOutboxStorage(attemptId: string, storage: () => Storage | null = defaultStorage): OutboxStorage {
  const key = outboxStorageKey(attemptId);
  return {
    load() {
      try {
        const raw = storage()?.getItem(key);
        if (!raw) return [];
        const parsed = JSON.parse(raw) as { v?: unknown; entries?: unknown };
        return parsed.v === 1 && Array.isArray(parsed.entries) ? parsed.entries.filter(isEntry) : [];
      } catch {
        return [];
      }
    },
    save(entries) {
      try {
        storage()?.setItem(key, JSON.stringify({ v: 1, entries }));
      } catch {
        // Storage full or unavailable: the in-memory outbox keeps retrying.
      }
    },
    clear() {
      try {
        storage()?.removeItem(key);
      } catch {
        // Nothing to clear.
      }
    },
  };
}

function defaultStorage(): Storage | null {
  try {
    return typeof window === "undefined" ? null : window.localStorage;
  } catch {
    return null;
  }
}

/** Removes an attempt's stored outbox (results page: the attempt is closed, nothing more can sync). */
export function clearExamOutbox(attemptId: string): void {
  createOutboxStorage(attemptId).clear();
}
