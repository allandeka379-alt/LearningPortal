import { describe, expect, it } from "vitest";
import { isWithinTaggedTopics, lessonStructureIssues, nextFreeSlug, normaliseTopicTags, slugify } from "./core";

describe("slugify / nextFreeSlug", () => {
  it("makes ASCII hyphenated slugs and finds a free one", () => {
    expect(slugify("Solving Quadratics: Part 2!")).toBe("solving-quadratics-part-2");
    expect(slugify("Électricité — Ohm's law")).toBe("electricite-ohm-s-law");
    expect(slugify("!!!")).toBe("lesson");
    expect(slugify("x".repeat(200))).toHaveLength(80);
    expect(nextFreeSlug("ohm", new Set())).toBe("ohm");
    expect(nextFreeSlug("ohm", new Set(["ohm", "ohm-2"]))).toBe("ohm-3");
    expect(nextFreeSlug("a".repeat(80), new Set(["a".repeat(80)]))).toBe(`${"a".repeat(78)}-2`);
  });
});

describe("normaliseTopicTags", () => {
  it("de-duplicates and keeps exactly one primary", () => {
    const a = "AAAAAAAA-0000-4000-8000-000000000000";
    const b = "bbbbbbbb-0000-4000-8000-000000000000";
    expect(normaliseTopicTags([a, b, a.toLowerCase()], b)).toEqual([
      { topicId: a.toLowerCase(), isPrimary: false, sortOrder: 0 },
      { topicId: b, isPrimary: true, sortOrder: 0 },
    ]);
    expect(normaliseTopicTags([a, b], null).map((t) => t.isPrimary)).toEqual([true, false]);
    expect(normaliseTopicTags([], a)).toEqual([]);
  });
});

describe("lessonStructureIssues", () => {
  it("requires title, body, a subject (except articles) and a primary topic for topic-bound kinds", () => {
    expect(lessonStructureIssues({ kind: "LESSON", title: "", body: " ", subjectId: null, topicCount: 0, hasPrimaryTopic: false })).toEqual({
      title: [expect.any(String)],
      body: [expect.any(String)],
      subjectId: [expect.any(String)],
      topicIds: [expect.any(String)],
    });
    expect(lessonStructureIssues({ kind: "ARTICLE", title: "How grading works", body: "Text", subjectId: null, topicCount: 0, hasPrimaryTopic: false })).toEqual({});
  });
});

describe("isWithinTaggedTopics", () => {
  it("accepts the tagged topic and its descendants only", () => {
    expect(isWithinTaggedTopics("a/b", ["a"])).toBe(true);
    expect(isWithinTaggedTopics("a", ["a"])).toBe(true);
    expect(isWithinTaggedTopics("ab/c", ["a"])).toBe(false);
    expect(isWithinTaggedTopics("x/y", ["a", "x/y"])).toBe(true);
  });
});
