import { describe, expect, it } from "vitest";
import { addDays } from "@/lib/dates";
import {
  chooseDailyQuestion,
  dailyScopeKey,
  DAILY_REUSE_WINDOW_DAYS,
  excludedQuestionIds,
  isDailyDifficulty,
  isRecentlyScheduled,
  rootTopicKey,
  stableHash,
  topicDistance,
  type DailyCandidate,
  type DailyHistoryEntry,
} from "./core";

const DAY = "2026-10-08";

function candidate(id: string, topicKeys: string[], difficulty = 2): DailyCandidate {
  return { id, difficulty, topicKeys };
}

function scheduled(offset: number, questionId: string, topicKeys: string[]): DailyHistoryEntry {
  return { date: addDays(DAY, offset), questionId, topicKeys };
}

describe("daily question selection (pure)", () => {
  it("keeps only the 2-3 difficulty band", () => {
    expect([1, 2, 3, 4, 2.5].map(isDailyDifficulty)).toEqual([false, true, true, false, false]);
    const pick = chooseDailyQuestion({ date: DAY, scopeKey: "subject:s", candidates: [candidate("easy", ["t1"], 1), candidate("hard", ["t2"], 5)], history: [] });
    expect(pick).toBeNull();
  });

  it("never repeats a question within the reuse window, either side of the date", () => {
    const history = [scheduled(-DAILY_REUSE_WINDOW_DAYS, "q-old", []), scheduled(3, "q-future", [])];
    expect(isRecentlyScheduled("q-old", DAY, history)).toBe(true);
    expect(isRecentlyScheduled("q-future", DAY, history)).toBe(true);
    expect(isRecentlyScheduled("q-old", addDays(DAY, 1), history)).toBe(false);
    expect(excludedQuestionIds(DAY, history).sort()).toEqual(["q-future", "q-old"]);
    expect(excludedQuestionIds(addDays(DAY, 70), history)).toEqual([]);

    const pick = chooseDailyQuestion({ date: DAY, scopeKey: "subject:s", candidates: [candidate("q-old", []), candidate("q-future", [])], history });
    expect(pick).toBeNull();
  });

  it("prefers the topic used longest ago (or never), so days rotate through the syllabus", () => {
    const history = [scheduled(-1, "a", ["algebra"]), scheduled(-5, "b", ["geometry"])];
    const candidates = [candidate("q-algebra", ["algebra"]), candidate("q-geometry", ["geometry"]), candidate("q-stats", ["statistics"])];
    expect(topicDistance(candidates[0] as DailyCandidate, DAY, history)).toBe(1);
    expect(topicDistance(candidates[1] as DailyCandidate, DAY, history)).toBe(5);
    expect(topicDistance(candidates[2] as DailyCandidate, DAY, history)).toBe(Number.POSITIVE_INFINITY);
    expect(chooseDailyQuestion({ date: DAY, scopeKey: "subject:s", candidates, history })?.id).toBe("q-stats");

    // With statistics gone, geometry (5 days ago) beats algebra (yesterday).
    expect(chooseDailyQuestion({ date: DAY, scopeKey: "subject:s", candidates: candidates.slice(0, 2), history })?.id).toBe("q-geometry");
    // A topic scheduled in the coming days counts too.
    const withFuture = [...history, scheduled(2, "c", ["geometry"])];
    expect(chooseDailyQuestion({ date: DAY, scopeKey: "subject:s", candidates: candidates.slice(0, 2), history: withFuture })?.id).toBe("q-geometry");
    expect(topicDistance(candidates[1] as DailyCandidate, DAY, withFuture)).toBe(2);
  });

  it("breaks ties deterministically (same pool, same day, same pick), and varies across days", () => {
    const candidates = Array.from({ length: 12 }, (_, i) => candidate(`q${i}`, [`topic-${i}`]));
    const first = chooseDailyQuestion({ date: DAY, scopeKey: "subject:s", candidates, history: [] });
    const again = chooseDailyQuestion({ date: DAY, scopeKey: "subject:s", candidates: [...candidates].reverse(), history: [] });
    expect(first?.id).toBeDefined();
    expect(again?.id).toBe(first?.id);
    const picks = new Set(Array.from({ length: 10 }, (_, i) => chooseDailyQuestion({ date: addDays(DAY, i), scopeKey: "subject:s", candidates, history: [] })?.id));
    expect(picks.size).toBeGreaterThan(1);
  });

  it("builds stable hashes, root topic keys and scope keys", () => {
    expect(stableHash("abc")).toBe(stableHash("abc"));
    expect(stableHash("abc")).not.toBe(stableHash("abd"));
    expect(stableHash("")).toBe(0x811c9dc5);
    expect(rootTopicKey("root-id/child-id/leaf")).toBe("root-id");
    expect(rootTopicKey("root-only")).toBe("root-only");
    expect(rootTopicKey("")).toBeNull();
    expect(dailyScopeKey({ qualificationId: "q", subjectId: "s" })).toBe("subject:s");
    expect(dailyScopeKey({ qualificationId: "q", subjectId: null })).toBe("qualification:q");
  });
});
