import { describe, expect, it } from "vitest";
import { parseBuilderParams, sessionSizes } from "./params";

const SUBJECT = "0199a1b2-0000-7000-8000-000000000001";
const T1 = "0199a1b2-0000-7000-8000-0000000000a1";
const T2 = "0199a1b2-0000-7000-8000-0000000000a2";

describe("parseBuilderParams", () => {
  it("defaults: adaptive, 10 questions, practice from the builder", () => {
    expect(parseBuilderParams({})).toEqual({ subjectId: null, topicIds: [], count: 10, difficulty: "ADAPTIVE", mode: "PRACTICE", origin: "BUILDER" });
  });

  it("reads dashboard / results deep links", () => {
    expect(parseBuilderParams({ subjectId: SUBJECT, topicId: T1, count: "20", difficulty: "medium" })).toMatchObject({
      subjectId: SUBJECT,
      topicIds: [T1],
      count: 20,
      difficulty: "MEDIUM",
    });
    expect(parseBuilderParams({ subjectId: SUBJECT, topicId: [T1, T2], topicIds: `${T2},${T1}` }).topicIds).toEqual([T1, T2]);
    expect(parseBuilderParams({ mode: "RETEST" })).toMatchObject({ mode: "RETEST", origin: "RETEST" });
    expect(parseBuilderParams({ origin: "plan_item" }).origin).toBe("PLAN_ITEM");
  });

  it("ignores malformed values instead of failing", () => {
    expect(parseBuilderParams({ subjectId: "maths", topicId: "x", count: "1000", difficulty: "insane", mode: "exam", origin: "hack" })).toEqual({
      subjectId: null,
      topicIds: [],
      count: 10,
      difficulty: "ADAPTIVE",
      mode: "PRACTICE",
      origin: "BUILDER",
    });
    expect(parseBuilderParams({ count: "2.5" }).count).toBe(10);
  });

  it("offers a deep link's own session size next to the standard ones", () => {
    expect(sessionSizes([5, 10, 20, 30], 10)).toEqual([5, 10, 20, 30]);
    expect(sessionSizes([5, 10, 20, 30], 12)).toEqual([5, 10, 12, 20, 30]);
  });
});
