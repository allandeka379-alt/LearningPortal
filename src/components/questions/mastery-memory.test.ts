/** @vitest-environment jsdom */
import { afterEach, describe, expect, it, vi } from "vitest";
import { foldMasteryChange, masteryMemoryKey, parseMasteryMemory, readMasteryMemory, rememberMasteryChange } from "./mastery-memory";

afterEach(() => {
  window.sessionStorage.clear();
  vi.restoreAllMocks();
});

describe("mastery memory", () => {
  it("keeps the band before the first answer and the latest band after", () => {
    let memory = foldMasteryChange({}, { topicId: "t1", topicName: "Algebra", before: "WEAK", after: "WEAK" });
    memory = foldMasteryChange(memory, { topicId: "t1", topicName: "Algebra", before: "WEAK", after: "DEVELOPING" });
    memory = foldMasteryChange(memory, { topicId: "t2", topicName: "Sets", before: null, after: "DEVELOPING" });
    expect(memory).toEqual({
      t1: { topicId: "t1", topicName: "Algebra", before: "WEAK", after: "DEVELOPING" },
      t2: { topicId: "t2", topicName: "Sets", before: null, after: "DEVELOPING" },
    });
  });

  it("drops malformed stored entries", () => {
    expect(parseMasteryMemory("not json")).toEqual({});
    expect(parseMasteryMemory(JSON.stringify([1, 2]))).toEqual({});
    const raw = JSON.stringify({
      ok: { topicId: "ok", topicName: "Fine", before: "COMPETENT", after: "STRONG" },
      badBand: { topicId: "badBand", topicName: "X", before: null, after: "GREAT" },
      mismatch: { topicId: "other", topicName: "X", before: null, after: "WEAK" },
    });
    expect(Object.keys(parseMasteryMemory(raw))).toEqual(["ok"]);
  });

  it("round-trips through sessionStorage per attempt", () => {
    rememberMasteryChange("a1", { topicId: "t1", topicName: "Algebra", before: "WEAK", after: "DEVELOPING" });
    expect(readMasteryMemory("a1").t1?.after).toBe("DEVELOPING");
    expect(readMasteryMemory("a2")).toEqual({});
    expect(window.sessionStorage.getItem(masteryMemoryKey("a1"))).toContain("Algebra");
  });

  it("never throws when storage is unavailable", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("QuotaExceededError");
    });
    expect(() => rememberMasteryChange("a1", { topicId: "t1", topicName: "Algebra", before: null, after: "WEAK" })).not.toThrow();
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("SecurityError");
    });
    expect(readMasteryMemory("a1")).toEqual({});
  });
});
