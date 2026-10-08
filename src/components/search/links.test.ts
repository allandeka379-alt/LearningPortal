import { describe, expect, it } from "vitest";
import { isSafeInternalPath, resultHref, searchHref } from "./links";

const ID = "0f8fad5b-d9cb-469f-a165-70867728950e";

describe("isSafeInternalPath", () => {
  it("accepts app-relative paths only", () => {
    expect(isSafeInternalPath("/zimsec/o-level/mathematics")).toBe(true);
    expect(isSafeInternalPath("/app/lessons/x?topic=y")).toBe(true);
    for (const bad of ["//evil.example", "/\\evil.example", "https://evil.example", "javascript:alert(1)", "", "relative", "/a\nb", null, 3]) {
      expect(isSafeInternalPath(bad)).toBe(false);
    }
    expect(isSafeInternalPath(`/${"a".repeat(600)}`)).toBe(false);
  });
});

describe("resultHref", () => {
  it("keeps in-app paths for questions, flashcards, tests and app lessons", () => {
    expect(resultHref({ entityType: "QUESTION", entityId: ID, path: `/app/practice?questionId=${ID}` })).toBe(`/app/practice?questionId=${ID}`);
    expect(resultHref({ entityType: "FLASHCARD", entityId: ID, path: `/app/flashcards?cardId=${ID}` })).toBe(`/app/flashcards?cardId=${ID}`);
    expect(resultHref({ entityType: "ASSESSMENT", entityId: ID, path: `/app/exams/${ID}` })).toBe(`/app/exams/${ID}`);
    expect(resultHref({ entityType: "LESSON", entityId: ID, path: `/app/lessons/${ID}` })).toBe(`/app/lessons/${ID}`);
    expect(resultHref({ entityType: "STUDY_PACK", entityId: ID, path: "/app/study-packs/o-level-maths" })).toBe("/app/study-packs/o-level-maths");
    // A document indexed before the landing page moved into the app still lands on it.
    expect(resultHref({ entityType: "STUDY_PACK", entityId: ID, path: "/study-packs/o-level-maths" })).toBe("/app/study-packs/o-level-maths");
  });

  it("opens topics, subjects and public guide lessons through the in-app resolver with the public path as fallback", () => {
    const topic = new URL(resultHref({ entityType: "TOPIC", entityId: ID, path: "/zimsec/o-level/maths/algebra" }), "http://x");
    expect(topic.pathname).toBe("/app/search/open");
    expect(Object.fromEntries(topic.searchParams)).toEqual({ type: "TOPIC", id: ID, fallback: "/zimsec/o-level/maths/algebra" });
    const guide = new URL(resultHref({ entityType: "LESSON", entityId: ID, path: "/guides/how-to-revise" }), "http://x");
    expect(guide.searchParams.get("type")).toBe("LESSON");
    expect(guide.searchParams.get("fallback")).toBe("/guides/how-to-revise");
    // An unsafe indexed path is never carried as a fallback.
    const subject = new URL(resultHref({ entityType: "SUBJECT", entityId: ID, path: "//evil.example" }), "http://x");
    expect(subject.searchParams.has("fallback")).toBe(false);
  });
});

describe("searchHref", () => {
  it("omits defaults and keeps the state that matters", () => {
    expect(searchHref({})).toBe("/app/search");
    expect(searchHref({ q: "  quadratics " })).toBe("/app/search?q=quadratics");
    expect(searchHref({ q: "o level maths", type: "lessons", subjectId: ID, detect: false, cursor: "abc" })).toBe(
      `/app/search?q=o+level+maths&type=lessons&subjectId=${ID}&detect=0&cursor=abc`,
    );
    expect(searchHref({ q: "x".repeat(300) }).length).toBeLessThan(220);
  });
});
