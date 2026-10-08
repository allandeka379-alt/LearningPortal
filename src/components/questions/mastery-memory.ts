/**
 * Per-session memory of topic mastery changes during a practice session (§11 "mastery band changes" on the summary).
 *
 * Each marked answer reports the topic's band before and after it; the session page runs one question per page load,
 * so the changes are accumulated in `sessionStorage` (this tab only, cleared with the tab, never sent anywhere) and
 * read back by the summary. Storage can be missing or throw (private mode, blocked site data): every access is
 * guarded and the summary falls back to the current mastery from the server.
 */
import { isMasteryBand, type MasteryBand } from "@/lib/mastery-band";

export interface TopicMasteryChange {
  topicId: string;
  topicName: string;
  /** Band before the FIRST answer of the session in this topic (null = not started). */
  before: MasteryBand | null;
  /** Band after the LATEST answer. */
  after: MasteryBand;
}

export type MasteryMemory = Record<string, TopicMasteryChange>;

const PREFIX = "dz:practice-mastery:";

export function masteryMemoryKey(attemptId: string): string {
  return `${PREFIX}${attemptId}`;
}

/** Folds one answer's change into the memory (pure). */
export function foldMasteryChange(
  memory: MasteryMemory,
  change: { topicId: string; topicName: string; before: MasteryBand | null; after: MasteryBand },
): MasteryMemory {
  const existing = memory[change.topicId];
  return {
    ...memory,
    [change.topicId]: {
      topicId: change.topicId,
      topicName: change.topicName,
      before: existing ? existing.before : change.before,
      after: change.after,
    },
  };
}

/** Parses stored JSON defensively (anything malformed is dropped). Pure. */
export function parseMasteryMemory(raw: string | null): MasteryMemory {
  if (!raw) return {};
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return {};
  }
  if (typeof value !== "object" || value === null || Array.isArray(value)) return {};
  const out: MasteryMemory = {};
  for (const [key, entry] of Object.entries(value as Record<string, unknown>)) {
    if (typeof entry !== "object" || entry === null) continue;
    const e = entry as Record<string, unknown>;
    if (typeof e.topicId !== "string" || e.topicId !== key || typeof e.topicName !== "string" || !isMasteryBand(e.after)) continue;
    if (e.before !== null && !isMasteryBand(e.before)) continue;
    out[key] = { topicId: e.topicId, topicName: e.topicName, before: (e.before as MasteryBand | null) ?? null, after: e.after };
  }
  return out;
}

function storage(): Storage | null {
  try {
    return typeof window === "undefined" ? null : window.sessionStorage;
  } catch {
    return null;
  }
}

/** The stored JSON (a primitive, so it is a stable `useSyncExternalStore` snapshot), or null. */
export function readMasteryMemoryRaw(attemptId: string): string | null {
  try {
    return storage()?.getItem(masteryMemoryKey(attemptId)) ?? null;
  } catch {
    return null;
  }
}

export function readMasteryMemory(attemptId: string): MasteryMemory {
  return parseMasteryMemory(readMasteryMemoryRaw(attemptId));
}

export function rememberMasteryChange(attemptId: string, change: Parameters<typeof foldMasteryChange>[1]): void {
  try {
    const store = storage();
    if (!store) return;
    const next = foldMasteryChange(readMasteryMemory(attemptId), change);
    store.setItem(masteryMemoryKey(attemptId), JSON.stringify(next));
  } catch {
    // Storage full or blocked: the summary falls back to the server's current mastery.
  }
}
