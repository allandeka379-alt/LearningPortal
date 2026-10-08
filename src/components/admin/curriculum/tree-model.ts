/**
 * Pure helpers of the topic tree editor (isomorphic, no React): the node shape the page passes in, the flattened list
 * of VISIBLE rows (what keyboard navigation walks), and the WAI-ARIA tree keyboard model
 * (https://www.w3.org/WAI/ARIA/apg/patterns/treeview/): ↑/↓ previous/next visible row, → expand or go to the first
 * child, ← collapse or go to the parent, Home/End first/last row.
 */

export interface EditorObjective {
  id: string;
  code: string | null;
  statement: string;
  cognitiveSkill: string | null;
  sortOrder: number;
}

export interface EditorNode {
  id: string;
  parentId: string | null;
  kind: string;
  depth: number;
  sortOrder: number;
  code: string | null;
  name: string;
  slug: string;
  description: string | null;
  publicSummary: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  isPublic: boolean;
  isOptional: boolean;
  optionGroup: string | null;
  examYearFrom: number | null;
  examYearTo: number | null;
  estimatedStudyMinutes: number | null;
  originSlug: string | null;
  componentIds: string[];
  objectives: EditorObjective[];
  tags: { questions: number; lessons: number; flashcards: number };
  children: EditorNode[];
}

export interface VisibleRow {
  node: EditorNode;
  /** 1-based (aria-level). */
  level: number;
  parentId: string | null;
  /** 1-based position among siblings (aria-posinset) and sibling count (aria-setsize). */
  posInSet: number;
  setSize: number;
}

/** Rows in display order, descending only into expanded nodes. */
export function visibleRows(roots: readonly EditorNode[], expanded: ReadonlySet<string>): VisibleRow[] {
  const rows: VisibleRow[] = [];
  const walk = (nodes: readonly EditorNode[], level: number, parentId: string | null): void => {
    nodes.forEach((node, index) => {
      rows.push({ node, level, parentId, posInSet: index + 1, setSize: nodes.length });
      if (node.children.length > 0 && expanded.has(node.id)) walk(node.children, level + 1, node.id);
    });
  };
  walk(roots, 1, null);
  return rows;
}

/** Every node, depth-first. */
export function allNodes(roots: readonly EditorNode[]): EditorNode[] {
  const out: EditorNode[] = [];
  const walk = (nodes: readonly EditorNode[]): void => {
    for (const node of nodes) {
      out.push(node);
      walk(node.children);
    }
  };
  walk(roots);
  return out;
}

export function findNode(roots: readonly EditorNode[], id: string | null): EditorNode | null {
  if (id === null) return null;
  return allNodes(roots).find((node) => node.id === id) ?? null;
}

/** Ancestors of `id`, root first (excluding the node). */
export function ancestorsOf(roots: readonly EditorNode[], id: string): EditorNode[] {
  const byId = new Map(allNodes(roots).map((node) => [node.id, node]));
  const chain: EditorNode[] = [];
  let current = byId.get(id)?.parentId ?? null;
  while (current !== null) {
    const parent = byId.get(current);
    if (!parent) break;
    chain.unshift(parent);
    current = parent.parentId;
  }
  return chain;
}

/** Siblings of `id` (including itself) in order. */
export function siblingsOf(roots: readonly EditorNode[], id: string): EditorNode[] {
  const node = findNode(roots, id);
  if (!node) return [];
  return node.parentId === null ? [...roots] : (findNode(roots, node.parentId)?.children ?? []);
}

/** Ids of `node` and everything below it (a node can never move into this set). */
export function subtreeIds(node: EditorNode): Set<string> {
  const ids = new Set<string>();
  const walk = (current: EditorNode): void => {
    ids.add(current.id);
    for (const child of current.children) walk(child);
  };
  walk(node);
  return ids;
}

export type TreeKeyEffect =
  | { kind: "focus"; id: string }
  | { kind: "expand"; id: string }
  | { kind: "collapse"; id: string }
  | { kind: "none" };

/** What a navigation key does on the focused row (structure-changing shortcuts are handled by the editor). */
export function treeKeyEffect(rows: readonly VisibleRow[], focusedId: string, key: string, expanded: ReadonlySet<string>): TreeKeyEffect {
  const index = rows.findIndex((row) => row.node.id === focusedId);
  if (index < 0) return rows[0] ? { kind: "focus", id: rows[0].node.id } : { kind: "none" };
  const row = rows[index] as VisibleRow;
  const hasChildren = row.node.children.length > 0;
  switch (key) {
    case "ArrowDown": {
      const next = rows[index + 1];
      return next ? { kind: "focus", id: next.node.id } : { kind: "none" };
    }
    case "ArrowUp": {
      const previous = rows[index - 1];
      return previous ? { kind: "focus", id: previous.node.id } : { kind: "none" };
    }
    case "ArrowRight":
      if (!hasChildren) return { kind: "none" };
      if (!expanded.has(row.node.id)) return { kind: "expand", id: row.node.id };
      return { kind: "focus", id: (row.node.children[0] as EditorNode).id };
    case "ArrowLeft":
      if (hasChildren && expanded.has(row.node.id)) return { kind: "collapse", id: row.node.id };
      return row.parentId ? { kind: "focus", id: row.parentId } : { kind: "none" };
    case "Home":
      return rows[0] ? { kind: "focus", id: rows[0].node.id } : { kind: "none" };
    case "End": {
      const last = rows[rows.length - 1];
      return last ? { kind: "focus", id: last.node.id } : { kind: "none" };
    }
    default:
      return { kind: "none" };
  }
}

/** Ids of every node with children (for "Expand all"). */
export function expandableIds(roots: readonly EditorNode[]): string[] {
  return allNodes(roots)
    .filter((node) => node.children.length > 0)
    .map((node) => node.id);
}
