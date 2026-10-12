import { mdTable, codeBlock, pyBlock, chk, same, bstFrom, bstInsert, bstDelete, inorder, preorder, postorder, bstHeight, bstTable } from "../lib.mjs";

export const keys = [45, 28, 63, 17, 36, 52, 71, 40];
export const tree = () => bstFrom(keys);
/** Parent / left / right table of a tree (computed from the tree object). */
export function nodeTable(root) {
  const rows = [];
  const walk = (n) => { if (!n) return; rows.push([n.key, n.left ? n.left.key : "none", n.right ? n.right.key : "none"]); walk(n.left); walk(n.right); };
  walk(root);
  return mdTable(["Node", "Left child", "Right child"], rows);
}
export const clone = (n) => (n ? { key: n.key, left: clone(n.left), right: clone(n.right) } : null);
/** Search path for a key. */
export function searchPath(root, target) {
  const path = []; let c = root;
  while (c) { path.push(c.key); if (c.key === target) return { path, found: true }; c = target < c.key ? c.left : c.right; }
  return { path, found: false };
}

const t = tree();
const tbl = bstTable(keys);
const arrayTable = mdTable(["Index", "Left pointer", "Key", "Right pointer"], tbl.map((r) => [r.index, r.left, r.key, r.right]));
same(inorder(t), [...keys].sort((a, b) => a - b));
same(preorder(t), [45, 28, 17, 36, 40, 63, 52, 71]);
same(postorder(t), [17, 40, 36, 28, 52, 71, 63, 45]);
chk(bstHeight(t), 4);
const s52 = searchPath(t, 52), s38 = searchPath(t, 38);
same(s52.path, [45, 63, 52]); same(s38.path, [45, 28, 36, 40]); chk(s38.found ? 1 : 0, 0);
// deletions
const t1 = bstDelete(clone(t), 17);       // leaf
same(preorder(t1), [45, 28, 36, 40, 63, 52, 71]);
const t2 = bstDelete(clone(t1), 36);      // one child (right child 40)
same(preorder(t2), [45, 28, 40, 63, 52, 71]);
const t3 = bstDelete(clone(t2), 63);      // two children: replaced by smallest of right sub-tree (71)
same(preorder(t3), [45, 28, 40, 71, 52]);
same(inorder(t3), [28, 40, 45, 52, 71]);
// root deletion for exercise: 45 replaced by 52
const t4 = bstDelete(clone(t), 45); chk(t4.key, 52);
// performance
const bal = [45, 28, 63, 17, 36, 52, 71]; const deg = [17, 28, 36, 45, 52, 63, 71];
const hb = bstHeight(bstFrom(bal)), hd = bstHeight(bstFrom(deg));
chk(hb, 3); chk(hd, 7);
const perf = mdTable(["Order of insertion", "Shape of the tree", "Height", "Most comparisons to find an item"], [[bal.join(", "), "balanced", hb, hb], [deg.join(", "), "degenerate (a list leaning to the right)", hd, hd]]);

const pseudo = `DECLARE Key : ARRAY[1:8] OF INTEGER
DECLARE LeftPointer : ARRAY[1:8] OF INTEGER
DECLARE RightPointer : ARRAY[1:8] OF INTEGER
DECLARE RootPointer, NodeCount : INTEGER

PROCEDURE InsertNode(NewKey : INTEGER)
    DECLARE Current, Previous : INTEGER
    NodeCount ← NodeCount + 1
    Key[NodeCount] ← NewKey
    LeftPointer[NodeCount] ← 0
    RightPointer[NodeCount] ← 0
    IF RootPointer = 0 THEN
        RootPointer ← NodeCount
    ELSE
        Current ← RootPointer
        WHILE Current <> 0 DO
            Previous ← Current
            IF NewKey < Key[Current] THEN
                Current ← LeftPointer[Current]
            ELSE
                Current ← RightPointer[Current]
            ENDIF
        ENDWHILE
        IF NewKey < Key[Previous] THEN
            LeftPointer[Previous] ← NodeCount
        ELSE
            RightPointer[Previous] ← NodeCount
        ENDIF
    ENDIF
ENDPROCEDURE`;
const searchPseudo = `FUNCTION Search(Target : INTEGER) RETURNS INTEGER
    DECLARE Current : INTEGER
    Current ← RootPointer
    WHILE Current <> 0 AND Key[Current] <> Target DO
        IF Target < Key[Current] THEN
            Current ← LeftPointer[Current]
        ELSE
            Current ← RightPointer[Current]
        ENDIF
    ENDWHILE
    RETURN Current        // 0 if the key is not in the tree
ENDFUNCTION`;
const travPseudo = `PROCEDURE InOrder(Node : INTEGER)
    IF Node <> 0 THEN
        CALL InOrder(LeftPointer[Node])
        OUTPUT Key[Node]
        CALL InOrder(RightPointer[Node])
    ENDIF
ENDPROCEDURE

CALL InOrder(RootPointer)`;
const pyCode = `class Node:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None

def insert(root, key):
    if root is None:
        return Node(key)
    if key < root.key:
        root.left = insert(root.left, key)
    else:
        root.right = insert(root.right, key)
    return root

def in_order(node):
    if node is not None:
        in_order(node.left)
        print(node.key, end=" ")
        in_order(node.right)

def pre_order(node):
    if node is not None:
        print(node.key, end=" ")
        pre_order(node.left)
        pre_order(node.right)

def post_order(node):
    if node is not None:
        post_order(node.left)
        post_order(node.right)
        print(node.key, end=" ")

root = None
for key in (45, 28, 63, 17, 36, 52, 71, 40):
    root = insert(root, key)
in_order(root)
print()
pre_order(root)
print()
post_order(root)
print()`;
const run = pyBlock(pyCode);
same(run.text.split("\n").map((l) => l.trim()), [inorder(t).join(" "), preorder(t).join(" "), postorder(t).join(" ")]);

export const snips = {
  keysList: keys.join(", "), arrayTable, nodeTable: nodeTable(t), pseudo: codeBlock(pseudo), searchPseudo: codeBlock(searchPseudo), travPseudo: codeBlock(travPseudo),
  inorder: inorder(t).join(", "), preorder: preorder(t).join(", "), postorder: postorder(t).join(", "), height: bstHeight(t),
  path52: s52.path.join(" → "), path38: s38.path.join(" → "),
  nodeTable1: nodeTable(t1), pre1: preorder(t1).join(", "), nodeTable2: nodeTable(t2), pre2: preorder(t2).join(", "), nodeTable3: nodeTable(t3), pre3: preorder(t3).join(", "), in3: inorder(t3).join(", "),
  perf, py: run.code, out: run.output,
};
if (process.argv[1].endsWith("w4a-binary-tree-algorithms.mjs")) console.log(Object.values(snips).join("\n\n"));
