import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AUTOSAVE_POLICY } from "@/server/exams/timer";
import type { QuestionResponse } from "@/components/questions/types";
import {
  AUTOSAVE_DEBOUNCE_MS,
  AUTOSAVE_MAX_INTERVAL_MS,
  AUTOSAVE_RETRY_BACKOFF_MS,
  createOutboxStorage,
  ExamAnswerStore,
  mergeEntries,
  outboxStorageKey,
  type OutboxEntry,
  type OutboxStorage,
  type SendOutcome,
} from "./autosave";
import type { SaveExamResult } from "./types";

const mcq = (key: string): QuestionResponse => ({ type: "MULTIPLE_CHOICE", optionKeys: [key] });
const text = (value: string): QuestionResponse => ({ type: "SHORT_ANSWER", text: value });

function saved(entry: OutboxEntry): SendOutcome {
  const result: SaveExamResult = {
    position: entry.position,
    saved: true,
    stale: false,
    lateSync: false,
    flagged: entry.flagged ?? false,
    answered: entry.response !== null && entry.response !== undefined,
    responseVersion: entry.responseVersion ?? 0,
    serverNowMs: 0,
    deadlineMs: null,
  };
  return { kind: "saved", result };
}

function memoryStorage(): OutboxStorage & { entries: OutboxEntry[] | null } {
  const store = {
    entries: null as OutboxEntry[] | null,
    load: () => store.entries ?? [],
    save: (entries: readonly OutboxEntry[]) => {
      store.entries = JSON.parse(JSON.stringify(entries)) as OutboxEntry[];
    },
    clear: () => {
      store.entries = null;
    },
  };
  return store;
}

const initial = [
  { position: 1, response: null, flagged: false, responseVersion: 0 },
  { position: 2, response: mcq("B"), flagged: false, responseVersion: 3 },
  { position: 3, response: null, flagged: false, responseVersion: 0 },
];

describe("autosave policy", () => {
  it("mirrors the server's AUTOSAVE_POLICY", () => {
    expect(AUTOSAVE_DEBOUNCE_MS).toBe(AUTOSAVE_POLICY.debounceMs);
    expect(AUTOSAVE_MAX_INTERVAL_MS).toBe(AUTOSAVE_POLICY.maxIntervalMs);
    expect(AUTOSAVE_RETRY_BACKOFF_MS).toEqual(AUTOSAVE_POLICY.retryBackoffMs);
  });

  it("merges a newer change into an older one", () => {
    expect(mergeEntries({ position: 1, response: mcq("A"), responseVersion: 1, clientSavedAtMs: 1, timeSpentSeconds: 30 }, { position: 1, flagged: true, clientSavedAtMs: 2 })).toEqual({
      position: 1,
      response: mcq("A"),
      responseVersion: 1,
      flagged: true,
      clientSavedAtMs: 2,
      timeSpentSeconds: 30,
    });
    expect(mergeEntries({ position: 1, response: mcq("A"), responseVersion: 1, clientSavedAtMs: 1 }, { position: 1, response: null, responseVersion: 2, clientSavedAtMs: 3 })).toEqual({
      position: 1,
      response: null,
      responseVersion: 2,
      clientSavedAtMs: 3,
    });
  });
});

describe("ExamAnswerStore", () => {
  let now: number;
  beforeEach(() => {
    vi.useFakeTimers();
    now = 1_000_000;
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  async function advance(ms: number) {
    now += ms;
    await vi.advanceTimersByTimeAsync(ms);
  }

  it("shows edits at once and saves the latest answer once, after the debounce", async () => {
    const send = vi.fn(async (entry: OutboxEntry) => saved(entry));
    const store = new ExamAnswerStore({ initial, send, deviceNow: () => now, serverNow: () => now + 5_000 });
    store.setResponse(1, text("4"));
    await advance(500);
    store.setResponse(1, text("42"));
    await advance(1_000);
    store.setResponse(1, text("42 km"));
    expect(store.getSnapshot().answers[1]?.response).toEqual(text("42 km"));
    expect(store.getSnapshot().status.state).toBe("pending");
    await advance(AUTOSAVE_DEBOUNCE_MS - 1);
    expect(send).not.toHaveBeenCalled();
    await advance(1);
    expect(send).toHaveBeenCalledTimes(1);
    expect(send.mock.calls[0]?.[0]).toMatchObject({ position: 1, response: text("42 km"), responseVersion: 3, clientSavedAtMs: now + 5_000 - AUTOSAVE_DEBOUNCE_MS });
    expect(store.getSnapshot().status).toMatchObject({ state: "saved", unsaved: 0, message: null });
  });

  it("saves at least every max interval while the student keeps typing", async () => {
    const send = vi.fn(async (entry: OutboxEntry) => saved(entry));
    const store = new ExamAnswerStore({ initial, send, deviceNow: () => now });
    for (let elapsed = 0; elapsed < AUTOSAVE_MAX_INTERVAL_MS; elapsed += 1_000) {
      store.setResponse(3, text(`draft ${elapsed}`));
      await advance(1_000);
    }
    expect(send).toHaveBeenCalledTimes(1);
  });

  it("continues versions from the server's and saves flags at once", async () => {
    const send = vi.fn(async (entry: OutboxEntry) => saved(entry));
    const store = new ExamAnswerStore({ initial, send, deviceNow: () => now });
    store.setFlag(2, true);
    await vi.advanceTimersByTimeAsync(0);
    expect(send).toHaveBeenCalledTimes(1);
    expect(send.mock.calls[0]?.[0]).toEqual({ position: 2, flagged: true, clientSavedAtMs: now });
    store.setResponse(2, mcq("C"));
    await store.flush();
    expect(send.mock.calls[1]?.[0]).toMatchObject({ position: 2, response: mcq("C"), responseVersion: 4 });
  });

  it("keeps failed saves, retries with backoff, and reports the problem until a save succeeds", async () => {
    let online = false;
    const send = vi.fn(async (entry: OutboxEntry): Promise<SendOutcome> => {
      if (!online) throw new TypeError("Failed to fetch");
      return saved(entry);
    });
    const storage = memoryStorage();
    const store = new ExamAnswerStore({ initial, send, storage, deviceNow: () => now });
    store.setResponse(1, text("1.5"));
    await advance(AUTOSAVE_DEBOUNCE_MS);
    expect(send).toHaveBeenCalledTimes(1);
    expect(store.getSnapshot().status).toMatchObject({ state: "retrying", unsaved: 1 });
    expect(storage.entries).toHaveLength(1);
    // A new edit while retrying does not bypass the backoff; it joins the queued change.
    store.setResponse(1, text("1.50"));
    await advance(AUTOSAVE_RETRY_BACKOFF_MS[0] as number);
    expect(send).toHaveBeenCalledTimes(2);
    expect(send.mock.calls[1]?.[0]).toMatchObject({ response: text("1.50"), responseVersion: 2 });
    await advance((AUTOSAVE_RETRY_BACKOFF_MS[1] as number) - 1);
    expect(send).toHaveBeenCalledTimes(2);
    online = true;
    await advance(1);
    expect(send).toHaveBeenCalledTimes(3);
    expect(store.getSnapshot().status).toMatchObject({ state: "saved", unsaved: 0 });
    expect(storage.entries).toBeNull();
  });

  it("flushes immediately on demand (navigation, back online, submit) and drains before submitting", async () => {
    let fail = true;
    const send = vi.fn(async (entry: OutboxEntry): Promise<SendOutcome> => (fail ? { kind: "retry", message: "Offline" } : saved(entry)));
    const store = new ExamAnswerStore({ initial, send, deviceNow: () => now });
    store.setResponse(3, mcq("A"));
    expect(await store.drain()).toBe(false);
    expect(store.hasUnsaved()).toBe(true);
    fail = false;
    expect(await store.drain()).toBe(true);
    expect(send).toHaveBeenCalledTimes(2);
  });

  it("drops changes the server rejects (time is up) and reports them", async () => {
    const onRejected = vi.fn();
    const send = vi.fn(async (): Promise<SendOutcome> => ({ kind: "rejected", code: "CONFLICT", message: "Time is up: answers can no longer be changed." }));
    const store = new ExamAnswerStore({ initial, send, deviceNow: () => now });
    store.setHandlers({ onRejected });
    store.setResponse(1, text("late"));
    expect(await store.drain()).toBe(true);
    expect(onRejected).toHaveBeenCalledWith(expect.objectContaining({ position: 1 }), { code: "CONFLICT", message: "Time is up: answers can no longer be changed." });
    expect(store.getSnapshot().status).toMatchObject({ state: "error", message: "Time is up: answers can no longer be changed." });
  });

  it("sends one request at a time and sends an edit made during a save afterwards", async () => {
    const resolvers: (() => void)[] = [];
    const send = vi.fn(
      (entry: OutboxEntry) =>
        new Promise<SendOutcome>((resolve) => {
          resolvers.push(() => resolve(saved(entry)));
        }),
    );
    const store = new ExamAnswerStore({ initial, send, deviceNow: () => now });
    store.setResponse(1, text("a"));
    const first = store.flush();
    expect(store.getSnapshot().status.state).toBe("saving");
    store.setResponse(1, text("ab"));
    void store.flush();
    expect(send).toHaveBeenCalledTimes(1);
    resolvers.shift()?.();
    await first;
    await vi.advanceTimersByTimeAsync(0);
    expect(send).toHaveBeenCalledTimes(2);
    expect(send.mock.calls[1]?.[0]).toMatchObject({ response: text("ab"), responseVersion: 2 });
    resolvers.shift()?.();
    expect(await store.drain()).toBe(true);
  });

  it("restores unsent changes after a reload (newer than the server's) and syncs them", async () => {
    const storage = memoryStorage();
    storage.save([
      { position: 1, response: text("restored"), responseVersion: 1, clientSavedAtMs: 5 },
      { position: 2, response: mcq("A"), responseVersion: 2, clientSavedAtMs: 6, flagged: true },
    ]);
    const send = vi.fn(async (entry: OutboxEntry) => saved(entry));
    const store = new ExamAnswerStore({ initial, send, storage, deviceNow: () => now });
    expect(store.restore()).toBe(2);
    const answers = store.getSnapshot().answers;
    expect(answers[1]?.response).toEqual(text("restored"));
    // The server already had version 3 of question 2: its answer is kept, the flag is restored.
    expect(answers[2]).toEqual({ response: mcq("B"), flagged: true, version: 3 });
    await vi.advanceTimersByTimeAsync(0);
    expect(send).toHaveBeenCalledTimes(2);
    expect(send.mock.calls[1]?.[0]).toEqual({ position: 2, flagged: true, clientSavedAtMs: 6 });
    expect(storage.entries).toBeNull();
  });
});

describe("localStorage outbox", () => {
  it("stores the current attempt only and tolerates broken storage", () => {
    const backing = new Map<string, string>();
    const fake = {
      getItem: (key: string) => backing.get(key) ?? null,
      setItem: (key: string, value: string) => void backing.set(key, value),
      removeItem: (key: string) => void backing.delete(key),
    } as unknown as Storage;
    const storage = createOutboxStorage("attempt-1", () => fake);
    storage.save([{ position: 4, response: text("x"), responseVersion: 2, clientSavedAtMs: 9 }]);
    expect([...backing.keys()]).toEqual([outboxStorageKey("attempt-1")]);
    expect(storage.load()).toEqual([{ position: 4, response: text("x"), responseVersion: 2, clientSavedAtMs: 9 }]);
    backing.set(outboxStorageKey("attempt-1"), JSON.stringify({ v: 1, entries: [{ position: "bad" }, { position: 2, clientSavedAtMs: 1, flagged: true }] }));
    expect(storage.load()).toEqual([{ position: 2, clientSavedAtMs: 1, flagged: true }]);
    backing.set(outboxStorageKey("attempt-1"), "{not json");
    expect(storage.load()).toEqual([]);
    storage.clear();
    expect(backing.size).toBe(0);

    const throwing = createOutboxStorage("attempt-2", () => {
      throw new Error("SecurityError");
    });
    expect(() => throwing.save([])).not.toThrow();
    expect(throwing.load()).toEqual([]);
  });
});
