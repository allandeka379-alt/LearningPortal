import { describe, expect, it } from "vitest";
import {
  ancestorIdsFromPath,
  buildTopicTree,
  flattenTopicTree,
  isAllowedBoardSlug,
  isEnrollableCatalogueStatus,
  isListedCatalogueStatus,
  isPublishedSyllabusStatus,
  isValidCurriculumSlug,
  selectSyllabusVersion,
  type SyllabusVersionCandidate,
  type TopicRowLike,
} from "./core";

function topic(id: string, path: string, overrides: Partial<TopicRowLike> = {}): TopicRowLike {
  const segments = path.split("/");
  return {
    id,
    parentId: segments.length > 1 ? (segments[segments.length - 2] ?? null) : null,
    kind: segments.length > 1 ? "SUBTOPIC" : "TOPIC",
    depth: segments.length - 1,
    path,
    sortOrder: 0,
    code: null,
    name: id,
    ...overrides,
  };
}

describe("catalogue visibility", () => {
  it("lists AVAILABLE and COMING_SOON only, and only AVAILABLE is enrollable", () => {
    expect(["HIDDEN", "COMING_SOON", "AVAILABLE", "RETIRED"].filter((s) => isListedCatalogueStatus(s as never))).toEqual(["COMING_SOON", "AVAILABLE"]);
    expect(isEnrollableCatalogueStatus("AVAILABLE")).toBe(true);
    expect(isEnrollableCatalogueStatus("COMING_SOON")).toBe(false);
  });
});

describe("selectSyllabusVersion", () => {
  const v1: SyllabusVersionCandidate = { id: "v1", status: "SUPERSEDED", effectiveFrom: "2024-01-01", effectiveTo: "2026-12-31" };
  const v2: SyllabusVersionCandidate = { id: "v2", status: "CURRENT", effectiveFrom: "2027-01-01", effectiveTo: null };
  const v3: SyllabusVersionCandidate = { id: "v3", status: "UPCOMING", effectiveFrom: "2029-01-01", effectiveTo: null };
  const draft: SyllabusVersionCandidate = { id: "d", status: "DRAFT", effectiveFrom: "2020-01-01", effectiveTo: null };
  const archived: SyllabusVersionCandidate = { id: "a", status: "ARCHIVED", effectiveFrom: "2010-01-01", effectiveTo: null };

  it("returns the CURRENT version without a date", () => {
    expect(selectSyllabusVersion([v1, v2, v3, draft])?.id).toBe("v2");
    expect(selectSyllabusVersion([v1, draft])).toBeNull();
  });

  it("picks the version whose effective range contains the exam date", () => {
    expect(selectSyllabusVersion([v1, v2, v3], "2026-11-01")?.id).toBe("v1");
    expect(selectSyllabusVersion([v1, v2, v3], "2027-06-01")?.id).toBe("v2");
  });

  it("prefers CURRENT over UPCOMING when ranges overlap, and never picks DRAFT or ARCHIVED", () => {
    expect(selectSyllabusVersion([v1, v2, v3], "2029-11-01")?.id).toBe("v2");
    expect(selectSyllabusVersion([v3], "2029-11-01")?.id).toBe("v3");
    expect(selectSyllabusVersion([draft, archived, v2], "2015-05-01")?.id).toBe("v2");
  });

  it("falls back to CURRENT when no version covers the date", () => {
    expect(selectSyllabusVersion([v1, v2], "2001-01-01")?.id).toBe("v2");
  });

  it("knows which statuses are published", () => {
    expect(isPublishedSyllabusStatus("DRAFT")).toBe(false);
    expect(isPublishedSyllabusStatus("ARCHIVED")).toBe(true);
  });
});

describe("buildTopicTree", () => {
  it("nests rows by materialised path and orders siblings by sortOrder, then numeric-aware code", () => {
    const rows = [
      topic("s2", "t1/s2", { sortOrder: 1, code: "1.10" }),
      topic("t2", "t2", { sortOrder: 2 }),
      topic("s1", "t1/s1", { sortOrder: 1, code: "1.2" }),
      topic("t1", "t1", { sortOrder: 1 }),
      topic("ss1", "t1/s1/ss1"),
    ];
    const tree = buildTopicTree(rows);
    expect(tree.map((n) => n.id)).toEqual(["t1", "t2"]);
    expect(tree[0]?.children.map((n) => n.id)).toEqual(["s1", "s2"]);
    expect(tree[0]?.children[0]?.children.map((n) => n.id)).toEqual(["ss1"]);
    expect(flattenTopicTree(tree).map((n) => n.id)).toEqual(["t1", "s1", "ss1", "s2", "t2"]);
  });

  it("drops a subtree whose parent was filtered out instead of promoting it", () => {
    const tree = buildTopicTree([topic("t1", "t1"), topic("s1", "hidden/s1"), topic("ss1", "hidden/s1/ss1")]);
    expect(flattenTopicTree(tree).map((n) => n.id)).toEqual(["t1"]);
  });

  it("returns ancestor ids from a path", () => {
    expect(ancestorIdsFromPath("a/b/c")).toEqual(["a", "b"]);
    expect(ancestorIdsFromPath("a")).toEqual([]);
  });
});

describe("curriculum slugs", () => {
  it("validates slugs and refuses board slugs that collide with app routes", () => {
    expect(isValidCurriculumSlug("o-level")).toBe(true);
    expect(isValidCurriculumSlug("O-Level")).toBe(false);
    expect(isValidCurriculumSlug("a--b")).toBe(false);
    expect(isAllowedBoardSlug("zimsec")).toBe(true);
    expect(isAllowedBoardSlug("admin")).toBe(false);
    expect(isAllowedBoardSlug("pricing")).toBe(false);
  });
});
