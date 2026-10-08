import { describe, expect, it } from "vitest";
import { buildQuestionSnapshot, canonicalJson, toJsonValue } from "./snapshot";

describe("canonicalJson", () => {
  it("sorts keys recursively and keeps array order", () => {
    expect(canonicalJson({ b: 1, a: { d: [3, 1], c: null } })).toBe('{"a":{"c":null,"d":[3,1]},"b":1}');
  });

  it("is independent of property insertion order", () => {
    expect(canonicalJson({ x: 1, y: { p: true, q: "s" } })).toBe(canonicalJson({ y: { q: "s", p: true }, x: 1 }));
  });

  it("escapes strings like JSON", () => {
    expect(canonicalJson({ 'k"': 'v\n"' })).toBe('{"k\\"":"v\\n\\""}');
  });
});

describe("toJsonValue", () => {
  it("converts dates, bigints and non-finite numbers; drops undefined members", () => {
    expect(toJsonValue({ at: new Date("2026-10-05T00:00:00Z"), big: 12n, nan: Number.NaN, gone: undefined, list: [undefined, 1] })).toEqual({
      at: "2026-10-05T00:00:00.000Z",
      big: "12",
      nan: null,
      list: [null, 1],
    });
  });

  it("refuses functions", () => {
    expect(() => toJsonValue({ f: () => 1 })).toThrow(TypeError);
  });
});

describe("buildQuestionSnapshot", () => {
  const aggregate = {
    question: {
      id: "q",
      partOrder: 0,
      stem: "Root",
      renderedHtml: { stem: "<p>Root</p>" },
      renderVersion: 1,
      options: [
        { key: "B", sortOrder: 1, content: "b" },
        { key: "A", sortOrder: 1, content: "a" },
        { key: "C", sortOrder: 0, content: "c" },
      ],
      parts: [
        { id: "p2", partOrder: 1, stem: "(b)", options: [], parts: [] },
        { id: "p1", partOrder: 0, stem: "(a)", options: [], renderedHtml: { stem: "x" } },
      ],
    },
    topics: [
      { topicId: "t2", syllabusId: "s1", isPrimary: false },
      { topicId: "t1", syllabusId: "s1", isPrimary: true },
    ],
    objectives: ["o2", "o1"],
  };

  it("orders children deterministically and drops render caches", () => {
    const snapshot = buildQuestionSnapshot(aggregate) as Record<string, unknown>;
    expect(snapshot.question).toEqual({ id: "q", partOrder: 0, stem: "Root" });
    expect((snapshot.options as { key: string }[]).map((o) => o.key)).toEqual(["C", "A", "B"]);
    expect(snapshot.parts).toEqual([
      { id: "p1", partOrder: 0, stem: "(a)", options: [], parts: [] },
      { id: "p2", partOrder: 1, stem: "(b)", options: [], parts: [] },
    ]);
    expect((snapshot.topics as { topicId: string }[]).map((t) => t.topicId)).toEqual(["t1", "t2"]);
    expect(snapshot.objectives).toEqual(["o1", "o2"]);
  });

  it("hashes equally for equal aggregates in any order", () => {
    const reversed = {
      ...aggregate,
      question: { ...aggregate.question, options: [...aggregate.question.options].reverse(), parts: [...aggregate.question.parts].reverse() },
      topics: [...aggregate.topics].reverse(),
      objectives: [...aggregate.objectives].reverse(),
    };
    expect(canonicalJson(buildQuestionSnapshot(reversed))).toBe(canonicalJson(buildQuestionSnapshot(aggregate)));
  });
});
