import { describe, expect, it } from "vitest";
import {
  descendsFrom,
  mapTopicLineage,
  newerCurrentVersion,
  pickTargetRoute,
  planChoiceCarryOver,
  planMasteryCarryOver,
  versionCoversDate,
  type SourceMastery,
  type TargetTopic,
  type VersionFacts,
} from "./version-move-core";

const v = (id: string, status: VersionFacts["status"], effectiveFrom: string, supersedesId: string | null = null, effectiveTo: string | null = null): VersionFacts => ({
  id,
  status,
  effectiveFrom,
  effectiveTo,
  supersedesId,
});

describe("newerCurrentVersion", () => {
  it("offers the CURRENT version that descends from the pinned one, through intermediate versions", () => {
    const v1 = v("v1", "SUPERSEDED", "2020-01-01");
    const v2 = v("v2", "SUPERSEDED", "2023-01-01", "v1");
    const v3 = v("v3", "CURRENT", "2026-01-01", "v2");
    expect(newerCurrentVersion(v1, [v1, v2, v3])?.id).toBe("v3");
    expect(newerCurrentVersion(v2, [v1, v2, v3])?.id).toBe("v3");
    expect(descendsFrom(v3, "v1", new Map([v1, v2, v3].map((x) => [x.id, x])))).toBe(true);
  });

  it("offers an archived pin too, but never a CURRENT, UPCOMING or DRAFT pin", () => {
    const old = v("old", "ARCHIVED", "2020-01-01");
    const current = v("cur", "CURRENT", "2026-01-01", "old");
    expect(newerCurrentVersion(old, [old, current])?.id).toBe("cur");
    expect(newerCurrentVersion(current, [old, current])).toBeNull();
    expect(newerCurrentVersion(v("up", "UPCOMING", "2028-01-01", "cur"), [old, current])).toBeNull();
    expect(newerCurrentVersion(v("d", "DRAFT", "2028-01-01"), [current])).toBeNull();
  });

  it("never offers a rollback (an older version made current again)", () => {
    const v1 = v("v1", "CURRENT", "2020-01-01");
    const v2 = v("v2", "SUPERSEDED", "2026-01-01", "v1");
    expect(newerCurrentVersion(v2, [v1, v2])).toBeNull();
  });

  it("falls back to effective dates for versions created without lineage", () => {
    const pinned = v("a", "SUPERSEDED", "2020-01-01");
    expect(newerCurrentVersion(pinned, [pinned, v("b", "CURRENT", "2026-01-01")])?.id).toBe("b");
    expect(newerCurrentVersion(pinned, [pinned, v("c", "CURRENT", "2020-01-01")])).toBeNull();
    expect(newerCurrentVersion(pinned, [pinned])).toBeNull();
  });

  it("checks effective ranges inclusively", () => {
    expect(versionCoversDate({ effectiveFrom: "2026-01-01", effectiveTo: null }, "2026-01-01")).toBe(true);
    expect(versionCoversDate({ effectiveFrom: "2026-01-01", effectiveTo: "2027-12-31" }, "2027-12-31")).toBe(true);
    expect(versionCoversDate({ effectiveFrom: "2026-01-01", effectiveTo: "2027-12-31" }, "2028-06-01")).toBe(false);
    expect(versionCoversDate({ effectiveFrom: "2026-01-01", effectiveTo: null }, "2025-11-01")).toBe(false);
  });
});

describe("mapTopicLineage", () => {
  const topics = [
    { id: "a1", syllabusId: "v1", originTopicId: null },
    { id: "b1", syllabusId: "v1", originTopicId: null },
    { id: "a2", syllabusId: "v2", originTopicId: "a1" },
    { id: "b2", syllabusId: "v2", originTopicId: "b1" },
    { id: "a3", syllabusId: "v3", originTopicId: "a2" },
    { id: "n3", syllabusId: "v3", originTopicId: null },
    { id: "x3", syllabusId: "v3", originTopicId: "gone" },
    { id: "other", syllabusId: "other", originTopicId: "a1" },
  ];

  it("follows originTopicId through intermediate versions to the source version", () => {
    expect(mapTopicLineage("v3", "v1", topics)).toEqual(new Map([["a3", "a1"]]));
    expect(mapTopicLineage("v3", "v2", topics)).toEqual(new Map([["a3", "a2"]]));
    expect(mapTopicLineage("v2", "v1", topics)).toEqual(new Map([["a2", "a1"], ["b2", "b1"]]));
  });

  it("stops on cycles", () => {
    const cyclic = [
      { id: "p", syllabusId: "v2", originTopicId: "q" },
      { id: "q", syllabusId: "vx", originTopicId: "r" },
      { id: "r", syllabusId: "vy", originTopicId: "q" },
    ];
    expect(mapTopicLineage("v2", "v1", cyclic, 10)).toEqual(new Map());
  });
});

function row(topicId: string, overrides: Partial<SourceMastery> = {}): SourceMastery {
  return {
    topicId,
    isLeaf: true,
    score: 62.5,
    recentAccuracy: 0.6,
    questionsAttempted: 8,
    questionsCorrect: 5,
    marksAwarded: 10,
    marksAvailable: 16,
    currentDifficulty: 3,
    consecutiveCorrect: 1,
    consecutiveIncorrect: 0,
    algorithmVersion: 1,
    firstPracticedAt: new Date("2026-02-01T08:00:00Z"),
    lastPracticedAt: new Date("2026-09-01T08:00:00Z"),
    nextReviewAt: new Date("2026-09-10T08:00:00Z"),
    remediationStartedAt: null,
    seededByDiagnostic: false,
    ...overrides,
  };
}

const leaf = (id: string, extra: Partial<TargetTopic> = {}): TargetTopic => ({ id, kind: "SUBTOPIC", depth: 1, isLeaf: true, isOptional: false, ...extra });

describe("planMasteryCarryOver", () => {
  it("copies practised evidence onto descendant leaves of the new version, re-deriving the band", () => {
    const carried = planMasteryCarryOver({
      lineage: new Map([["n1", "o1"], ["n2", "o2"], ["n3", "o3"], ["parent", "o4"], ["n5", "o5"]]),
      sourceRows: [row("o1"), row("o2", { questionsAttempted: 0, questionsCorrect: 0, marksAwarded: 0, marksAvailable: 0 }), row("o4"), row("o5", { isLeaf: false, score: 91 })],
      targetTopics: [leaf("n1"), leaf("n2"), leaf("n3"), { ...leaf("parent"), isLeaf: false, kind: "TOPIC", depth: 0 }, leaf("n5"), leaf("fresh")],
      existingTargetTopicIds: new Set(),
    });
    expect(carried.map((c) => [c.topicId, c.fromTopicId, c.band])).toEqual([
      ["n1", "o1", "COMPETENT"],
      ["n5", "o5", "MASTERED"],
    ]);
    expect(carried[0]).toMatchObject({ topicKind: "SUBTOPIC", topicDepth: 1, isLeaf: true, score: 62.5, questionsAttempted: 8, marksAvailable: 16 });
  });

  it("never overwrites evidence the student already has in the new version", () => {
    expect(
      planMasteryCarryOver({
        lineage: new Map([["n1", "o1"]]),
        sourceRows: [row("o1")],
        targetTopics: [leaf("n1")],
        existingTargetTopicIds: new Set(["n1"]),
      }),
    ).toEqual([]);
  });

  it("clamps values the database CHECKs would refuse", () => {
    const [carried] = planMasteryCarryOver({
      lineage: new Map([["n1", "o1"]]),
      sourceRows: [row("o1", { score: 100.0000001, questionsCorrect: 9, marksAwarded: 20, currentDifficulty: 7 })],
      targetTopics: [leaf("n1")],
      existingTargetTopicIds: new Set(),
    });
    expect(carried).toMatchObject({ score: 100, band: "MASTERED", questionsCorrect: 8, marksAwarded: 16, currentDifficulty: 5 });
  });
});

describe("planChoiceCarryOver and pickTargetRoute", () => {
  it("re-makes choices whose topic is still optional and reports the others", () => {
    const result = planChoiceCarryOver({
      lineage: new Map([["n1", "o1"], ["n2", "o2"]]),
      chosenSourceTopicIds: ["o1", "o2", "o3"],
      targetTopics: [leaf("n1", { isOptional: true }), leaf("n2", { isOptional: false })],
    });
    expect(result).toEqual({ carried: ["n1"], dropped: ["o2", "o3"] });
  });

  it("keeps the award route by code, else the default route, else none", () => {
    const routes = [
      { id: "core", code: "CORE", isDefault: true },
      { id: "ext", code: "EXTENDED", isDefault: false },
    ];
    expect(pickTargetRoute("EXTENDED", routes)).toBe("ext");
    expect(pickTargetRoute("AS", routes)).toBe("core");
    expect(pickTargetRoute(null, routes)).toBe("core");
    expect(pickTargetRoute("EXTENDED", [])).toBeNull();
  });
});
