import { describe, expect, it } from "vitest";
import {
  buildAttribution,
  creditableSeconds,
  isFreePreview,
  isLessonOpen,
  lessonListCounts,
  lessonNeighbours,
  lessonState,
  MAX_CREDIT_PER_BEAT_SECONDS,
  pickContextTag,
  sessionIdleCutoff,
  type AttributionInput,
} from "./core";

describe("lesson access (§31)", () => {
  it("opens lessons only with full access or a sponsored assignment, free-preview lessons included (no free tier)", () => {
    expect(isFreePreview("PUBLIC")).toBe(true);
    expect(isFreePreview("FREE")).toBe(true);
    expect(isFreePreview("PREMIUM")).toBe(false);
    expect(isLessonOpen("FREE", "FREE_ONLY")).toBe(false);
    expect(isLessonOpen("PUBLIC", "FREE_ONLY")).toBe(false);
    expect(isLessonOpen("PREMIUM", "FREE_ONLY")).toBe(false);
    expect(isLessonOpen("FREE", "ALL")).toBe(true);
    expect(isLessonOpen("PREMIUM", "ALL")).toBe(true);
    expect(isLessonOpen("PREMIUM", "FREE_ONLY", true)).toBe(true);
    expect(isLessonOpen("FREE", "FREE_ONLY", true)).toBe(true);
  });
});

describe("pickContextTag", () => {
  const tags = [
    { topicId: "b", isPrimary: false, sortOrder: 1 },
    { topicId: "a", isPrimary: true, sortOrder: 5 },
    { topicId: "c", isPrimary: false, sortOrder: 0 },
  ];

  it("prefers the requested topic when the lesson is tagged there", () => {
    expect(pickContextTag(tags, "b")?.topicId).toBe("b");
  });

  it("falls back to the primary tag, then to the first by position", () => {
    expect(pickContextTag(tags, "zzz")?.topicId).toBe("a");
    expect(pickContextTag(tags.filter((t) => !t.isPrimary))?.topicId).toBe("c");
    expect(pickContextTag([])).toBeNull();
  });

  it("breaks ties by topic id so the choice is stable", () => {
    expect(pickContextTag([{ topicId: "y", isPrimary: false, sortOrder: 0 }, { topicId: "x", isPrimary: false, sortOrder: 0 }])?.topicId).toBe("x");
  });
});

describe("lessonNeighbours", () => {
  const list = [{ id: "1" }, { id: "2" }, { id: "3" }];

  it("returns the 1-based position and the neighbours", () => {
    expect(lessonNeighbours(list, "2")).toEqual({ position: 2, total: 3, previous: { id: "1" }, next: { id: "3" } });
    expect(lessonNeighbours(list, "1")).toMatchObject({ position: 1, previous: null, next: { id: "2" } });
    expect(lessonNeighbours(list, "3")).toMatchObject({ position: 3, previous: { id: "2" }, next: null });
  });

  it("has no position for a lesson outside the list", () => {
    expect(lessonNeighbours(list, "9")).toEqual({ position: null, total: 3, previous: null, next: null });
  });
});

describe("lessonState", () => {
  it("maps progress rows to what the student sees", () => {
    expect(lessonState(null)).toBe("NOT_STARTED");
    expect(lessonState(undefined)).toBe("NOT_STARTED");
    expect(lessonState({ status: "IN_PROGRESS" })).toBe("IN_PROGRESS");
    expect(lessonState({ status: "COMPLETED" })).toBe("COMPLETED");
  });
});

describe("creditableSeconds (server-clock cap on heartbeats)", () => {
  const now = new Date("2026-10-05T10:00:00.000Z");
  const secondsAgo = (s: number) => new Date(now.getTime() - s * 1000);

  it("credits the claim when the server clock allows it", () => {
    expect(creditableSeconds({ claimedSeconds: 30, previousActivityAt: secondsAgo(31), now })).toBe(30);
  });

  it("never credits more than the time since the previous write plus a small tolerance", () => {
    expect(creditableSeconds({ claimedSeconds: 30, previousActivityAt: secondsAgo(10), now })).toBe(15);
    // A replayed / duplicated heartbeat right after the first one adds (almost) nothing.
    expect(creditableSeconds({ claimedSeconds: 30, previousActivityAt: now, now })).toBe(5);
    expect(creditableSeconds({ claimedSeconds: 30, previousActivityAt: now, now, toleranceSeconds: 0 })).toBe(0);
  });

  it("caps one beat and the first write without a previous one", () => {
    expect(creditableSeconds({ claimedSeconds: 10_000, previousActivityAt: secondsAgo(86_400), now })).toBe(MAX_CREDIT_PER_BEAT_SECONDS);
    expect(creditableSeconds({ claimedSeconds: 45, previousActivityAt: null, now })).toBe(45);
    expect(creditableSeconds({ claimedSeconds: 500, previousActivityAt: null, now })).toBe(MAX_CREDIT_PER_BEAT_SECONDS);
  });

  it("rejects nonsense claims and clocks that went backwards", () => {
    expect(creditableSeconds({ claimedSeconds: -5, previousActivityAt: null, now })).toBe(0);
    expect(creditableSeconds({ claimedSeconds: Number.NaN, previousActivityAt: null, now })).toBe(0);
    expect(creditableSeconds({ claimedSeconds: 12.9, previousActivityAt: null, now })).toBe(12);
    expect(creditableSeconds({ claimedSeconds: 30, previousActivityAt: new Date(now.getTime() + 60_000), now })).toBe(0);
  });

  it("puts the session idle cut-off the configured minutes back", () => {
    expect(sessionIdleCutoff(now, 30).toISOString()).toBe("2026-10-05T09:30:00.000Z");
  });
});

describe("buildAttribution (§27)", () => {
  const base: AttributionInput = {
    copyrightStatus: "OWNED",
    author: "  A. Moyo ",
    attribution: null,
    licenceCode: null,
    sourceUrl: null,
    publicationDate: null,
    source: null,
  };

  it("labels original platform content with the configured brand", () => {
    expect(buildAttribution(base, "BvunzoHub")).toEqual({
      statement: "Original content by BvunzoHub.",
      author: "A. Moyo",
      attribution: null,
      source: null,
      licence: null,
      originalUrl: null,
      publicationDate: null,
    });
  });

  it("names the source, licence, required attribution and publication date of licensed content", () => {
    const result = buildAttribution(
      {
        ...base,
        copyrightStatus: "OPEN_LICENSE",
        licenceCode: null,
        sourceUrl: "https://example.org/item/1",
        publicationDate: new Date("2025-03-01T00:00:00.000Z"),
        source: {
          name: "Open Maths Project",
          type: "OPEN_LICENSE",
          publisher: "OMP Trust",
          url: "https://example.org",
          licenceCode: "CC-BY-4.0",
          licenceUrl: "https://creativecommons.org/licenses/by/4.0/",
          attributionText: "From the Open Maths Project, CC BY 4.0",
          requiresAttribution: true,
        },
      },
      "BvunzoHub",
    );
    expect(result).toEqual({
      statement: "Shared under the CC-BY-4.0 licence.",
      author: "A. Moyo",
      attribution: "From the Open Maths Project, CC BY 4.0",
      source: { name: "Open Maths Project", publisher: "OMP Trust", url: "https://example.org" },
      licence: { code: "CC-BY-4.0", url: "https://creativecommons.org/licenses/by/4.0/" },
      originalUrl: "https://example.org/item/1",
      publicationDate: "2025-03-01",
    });
  });

  it("keeps only http(s) links and hides proprietary licence codes and the platform's own source", () => {
    const result = buildAttribution(
      {
        ...base,
        copyrightStatus: "LICENSED",
        licenceCode: "PROPRIETARY",
        sourceUrl: "javascript:alert(1)",
        source: { name: "Partner Press", type: "LICENSED", publisher: null, url: "ftp://x", licenceCode: null, licenceUrl: "javascript:x", attributionText: "Used with permission", requiresAttribution: false },
      },
      "BvunzoHub",
    );
    expect(result.statement).toBe("Used under licence from Partner Press.");
    expect(result.licence).toBeNull();
    expect(result.originalUrl).toBeNull();
    expect(result.source).toEqual({ name: "Partner Press", publisher: null, url: null });
    // Attribution text is shown when the item carries it or the source requires it.
    expect(result.attribution).toBeNull();

    const ownSource = { name: "Original content", type: "ORIGINAL" as const, url: null, publisher: null, licenceCode: null, licenceUrl: null, attributionText: null, requiresAttribution: false };
    expect(buildAttribution({ ...base, source: ownSource }, "BvunzoHub").source).toBeNull();
  });

  it("words public-domain content", () => {
    expect(buildAttribution({ ...base, copyrightStatus: "PUBLIC_DOMAIN" }, "BvunzoHub").statement).toBe("This content is in the public domain.");
  });
});

describe("lessonListCounts", () => {
  it("counts completed and locked lessons", () => {
    expect(
      lessonListCounts([
        { state: "COMPLETED", locked: false },
        { state: "IN_PROGRESS", locked: false },
        { state: "NOT_STARTED", locked: true },
      ]),
    ).toEqual({ total: 3, completed: 1, locked: 1 });
    expect(lessonListCounts([])).toEqual({ total: 0, completed: 0, locked: 0 });
  });
});
