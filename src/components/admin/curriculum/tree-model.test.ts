import { describe, expect, it } from "vitest";
import { ancestorsOf, expandableIds, siblingsOf, subtreeIds, treeKeyEffect, visibleRows, type EditorNode } from "./tree-model";

function node(id: string, parentId: string | null, children: EditorNode[] = []): EditorNode {
  return {
    id,
    parentId,
    kind: parentId ? "SUBTOPIC" : "TOPIC",
    depth: 0,
    sortOrder: 0,
    code: null,
    name: id,
    slug: id,
    description: null,
    publicSummary: null,
    metaTitle: null,
    metaDescription: null,
    isPublic: true,
    isOptional: false,
    optionGroup: null,
    examYearFrom: null,
    examYearTo: null,
    estimatedStudyMinutes: null,
    originSlug: null,
    componentIds: [],
    objectives: [],
    tags: { questions: 0, lessons: 0, flashcards: 0 },
    children,
  };
}

const tree = [node("a", null, [node("a1", "a"), node("a2", "a", [node("a2x", "a2")])]), node("b", null)];

describe("tree model", () => {
  it("lists visible rows with ARIA level and position", () => {
    expect(visibleRows(tree, new Set()).map((row) => row.node.id)).toEqual(["a", "b"]);
    const rows = visibleRows(tree, new Set(["a", "a2"]));
    expect(rows.map((row) => `${row.node.id}:${row.level}:${row.posInSet}/${row.setSize}`)).toEqual(["a:1:1/2", "a1:2:1/2", "a2:2:2/2", "a2x:3:1/1", "b:1:2/2"]);
  });

  it("follows the WAI-ARIA tree keyboard model", () => {
    const expanded = new Set(["a"]);
    const rows = visibleRows(tree, expanded);
    expect(treeKeyEffect(rows, "a", "ArrowDown", expanded)).toEqual({ kind: "focus", id: "a1" });
    expect(treeKeyEffect(rows, "a1", "ArrowUp", expanded)).toEqual({ kind: "focus", id: "a" });
    expect(treeKeyEffect(rows, "a", "ArrowRight", expanded)).toEqual({ kind: "focus", id: "a1" });
    expect(treeKeyEffect(rows, "a2", "ArrowRight", expanded)).toEqual({ kind: "expand", id: "a2" });
    expect(treeKeyEffect(rows, "a", "ArrowLeft", expanded)).toEqual({ kind: "collapse", id: "a" });
    expect(treeKeyEffect(rows, "a1", "ArrowLeft", expanded)).toEqual({ kind: "focus", id: "a" });
    expect(treeKeyEffect(rows, "b", "ArrowLeft", expanded)).toEqual({ kind: "none" });
    expect(treeKeyEffect(rows, "a2", "Home", expanded)).toEqual({ kind: "focus", id: "a" });
    expect(treeKeyEffect(rows, "a", "End", expanded)).toEqual({ kind: "focus", id: "b" });
    expect(treeKeyEffect(rows, "b", "ArrowDown", expanded)).toEqual({ kind: "none" });
    expect(treeKeyEffect(rows, "missing", "ArrowDown", expanded)).toEqual({ kind: "focus", id: "a" });
  });

  it("finds ancestors, siblings, subtrees and expandable nodes", () => {
    expect(ancestorsOf(tree, "a2x").map((n) => n.id)).toEqual(["a", "a2"]);
    expect(siblingsOf(tree, "a2").map((n) => n.id)).toEqual(["a1", "a2"]);
    expect(siblingsOf(tree, "b").map((n) => n.id)).toEqual(["a", "b"]);
    expect([...subtreeIds(tree[0]!)].sort()).toEqual(["a", "a1", "a2", "a2x"]);
    expect(expandableIds(tree)).toEqual(["a", "a2"]);
  });
});
