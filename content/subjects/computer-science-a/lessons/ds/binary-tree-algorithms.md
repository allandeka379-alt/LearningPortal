---
{
  "key": "ds.binary-tree-algorithms",
  "title": "Binary trees and their algorithms",
  "summary": "A binary tree held with left and right pointers (arrays or objects), building a binary search tree by insertion, searching, deleting a leaf and a node with children, pre-order, in-order and post-order traversals, and the performance of a balanced against a degenerate tree.",
  "concepts": ["acs.ds.binary-tree-algorithms"],
  "estimatedMinutes": 65,
  "level": "core"
}
---
## Introduction

A binary search finds a value in a sorted array quickly, but inserting a new value means shifting many items. A linked list allows quick insertion but can only be searched from the start. A **binary tree** gives most of the benefit of both: values are arranged so that each comparison discards about half of what remains, and a new value can be added without moving any others.

Each item of a binary tree is a **node** with at most two children, a left one and a right one. In a **binary search tree** the nodes are placed by a rule that makes searching fast and gives a way of sorting. This lesson shows how to build a binary search tree, search it, delete from it and visit its nodes in three orders. The trees, tables and outputs were produced by code. You should already know recursion, arrays and linked lists.

## Key definitions

:::definition{term="Binary tree"}
A data structure of nodes in which each node has at most two children, called the left child and the right child. The first node is the root, and a node with no children is a leaf.
:::

:::definition{term="Binary search tree"}
A binary tree in which, for every node, all the keys in its left sub-tree are smaller than the node's key and all the keys in its right sub-tree are larger (or equal).
:::

:::definition{term="Sub-tree"}
A node together with all the nodes below it. The left sub-tree of the root is the tree whose root is the root's left child.
:::

:::definition{term="Traversal"}
Visiting every node of a tree once in a defined order. The three depth-first orders are pre-order (node, left, right), in-order (left, node, right) and post-order (left, right, node).
:::

## Representing a tree

A tree can be stored in arrays: `Key` holds the keys and two pointer arrays hold the **index** of the left child and of the right child, with 0 meaning no child, plus a `RootPointer`. In a language with objects each node is an object with `left` and `right` references. The nodes are numbered in the order they are inserted, so the array order is not the tree order.

## Building a binary search tree

To insert a key, start at the root. If the key is smaller than the current node's key go left, otherwise go right. When the place to go is empty, the new node is attached there. The first key becomes the root.

```
DECLARE Key : ARRAY[1:8] OF INTEGER
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
ENDPROCEDURE
```

:::worked-solution{title="Building a tree from a list of keys"}
The keys are inserted in this order: 45, 28, 63, 17, 36, 52, 71, 40.

45 becomes the root. 28 is smaller than 45, so it is the left child of 45. 63 is larger, so it is the right child. 17 goes left of 45, left of 28. 36 goes left of 45, right of 28. 52 goes right of 45, left of 63. 71 goes right of 45, right of 63. 40 goes left of 45, right of 28, then right of 36.

The array representation (index = order of insertion; 0 = no child):

| Index | Left pointer | Key | Right pointer |
|:-:|:-:|:-:|:-:|
| 1 | 2 | 45 | 3 |
| 2 | 4 | 28 | 5 |
| 3 | 6 | 63 | 7 |
| 4 | 0 | 17 | 0 |
| 5 | 0 | 36 | 8 |
| 6 | 0 | 52 | 0 |
| 7 | 0 | 71 | 0 |
| 8 | 0 | 40 | 0 |

The same tree as a table of children:

| Node | Left child | Right child |
|:-:|:-:|:-:|
| 45 | 28 | 63 |
| 28 | 17 | 36 |
| 17 | none | none |
| 36 | none | 40 |
| 40 | none | none |
| 63 | 52 | 71 |
| 52 | none | none |
| 71 | none | none |

The root, 45, has the left sub-tree 28, 17, 36, 40 and the right sub-tree 63, 52, 71. The height of the tree (the number of nodes on the longest path from the root to a leaf) is 4.
:::

## Searching

Searching uses the same rule: compare the target with the node, go left if smaller, right if larger, and stop when the key is found or an empty place is reached.

```
FUNCTION Search(Target : INTEGER) RETURNS INTEGER
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
ENDFUNCTION
```

For the tree above, a search for 52 follows the path 45 → 63 → 52: three comparisons, and the key is found. A search for 38 follows the path 45 → 28 → 36 → 40; 38 is larger than 36 (go right to 40) and smaller than 40 (go left), where there is no node, so the key is **not in the tree** after four comparisons.

## Deleting a node

There are three cases, shown on the same tree:

:::worked-solution{title="Deleting a leaf, a node with one child and a node with two children"}
**Delete a leaf (17).** The leaf has no children, so it is simply removed: the left pointer of its parent, 28, becomes empty.

| Node | Left child | Right child |
|:-:|:-:|:-:|
| 45 | 28 | 63 |
| 28 | none | 36 |
| 36 | none | 40 |
| 40 | none | none |
| 63 | 52 | 71 |
| 52 | none | none |
| 71 | none | none |

The pre-order list is now 45, 28, 36, 40, 63, 52, 71.

**Delete a node with one child (36).** Its only child, 40, takes its place: the right pointer of 28 is changed from 36 to 40.

| Node | Left child | Right child |
|:-:|:-:|:-:|
| 45 | 28 | 63 |
| 28 | none | 40 |
| 40 | none | none |
| 63 | 52 | 71 |
| 52 | none | none |
| 71 | none | none |

The pre-order list is now 45, 28, 40, 63, 52, 71.

**Delete a node with two children (63).** Neither child can simply take its place. The node is replaced by the smallest key in its right sub-tree, 71 (the next key in order), which is then removed from where it was.

| Node | Left child | Right child |
|:-:|:-:|:-:|
| 45 | 28 | 71 |
| 28 | none | 40 |
| 40 | none | none |
| 71 | 52 | none |
| 52 | none | none |

The pre-order list is now 45, 28, 40, 71, 52, and the in-order list is 28, 40, 45, 52, 71, still in ascending order, so the search tree rule still holds.
:::

## Traversals

The three orders are defined recursively. For the tree above (before any deletion):

- **Pre-order** (node, left, right): 45, 28, 17, 36, 40, 63, 52, 71. Used to copy a tree, because the root comes before its sub-trees.
- **In-order** (left, node, right): 17, 28, 36, 40, 45, 52, 63, 71. This gives the keys **in ascending order**, so a binary search tree sorts its keys.
- **Post-order** (left, right, node): 17, 40, 36, 28, 52, 71, 63, 45. Used to delete a tree, or to evaluate an expression tree, because the children come before their parent.

```
PROCEDURE InOrder(Node : INTEGER)
    IF Node <> 0 THEN
        CALL InOrder(LeftPointer[Node])
        OUTPUT Key[Node]
        CALL InOrder(RightPointer[Node])
    ENDIF
ENDPROCEDURE

CALL InOrder(RootPointer)
```

The Python program inserts the same keys into a tree of node objects and prints the three traversals (a real run):

```python
class Node:
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
print()
```

```
17 28 36 40 45 52 63 71 
45 28 17 36 40 63 52 71 
17 40 36 28 52 71 63 45 
```

## Performance

Searching follows one path from the root, so the number of comparisons is at most the height of the tree. The shape depends on the order of insertion:

| Order of insertion | Shape of the tree | Height | Most comparisons to find an item |
|:-:|:-:|:-:|:-:|
| 45, 28, 63, 17, 36, 52, 71 | balanced | 3 | 3 |
| 17, 28, 36, 45, 52, 63, 71 | degenerate (a list leaning to the right) | 7 | 7 |

A **balanced** tree of n nodes has a height of about log₂ n, so searching, inserting and deleting take O(log n) comparisons, like a binary search. A **degenerate** tree (keys inserted in order) is a chain with a height of n, so the operations take O(n) comparisons, no better than a linear search.

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC (Form 6) examines the binary tree for sorting, deletion, insertion and searching; Cambridge A Level (topic 19.1) examines tree implementation, traversals and the algorithms in Papers 3 and 4. In both, the order of insertion decides the shape of the tree, and an in-order traversal gives a sorted list. The rule used here for a node with two children (the smallest key of the right sub-tree) is one standard choice; a question states the rule it expects.
:::

## Common mistakes

:::mistake{title="Putting keys on the wrong side"}
Smaller keys go left, larger (or equal) keys go right, at every node from the root downwards. Compare with each node on the path, not just the root.
:::

:::mistake{title="Mixing up the traversal orders"}
The name tells where the node is visited: pre-order visits the node first, in-order between its sub-trees, post-order last.
:::

:::mistake{title="Deleting a node with two children by removing its sub-trees"}
Removing a node with two children must not lose its descendants. Replace its key with the next key in order (or the largest in the left sub-tree) and delete that node instead.
:::

:::mistake{title="Assuming a binary tree is always fast"}
Keys inserted in sorted order give a degenerate tree with the performance of a list.
:::

## Exam tips

:::exam-tip
Cambridge Papers 3 and 4 and ZIMSEC Paper 1 ask you to **draw or describe** the tree built from a list of keys (here, as a table of left and right children), to **state** a traversal, to **trace** a search, and to **show** the effect of a deletion. Work down the list inserting one key at a time and compare the key with each node on its path.
:::

:::exam-tip
"**State** the order in which a binary search tree outputs its keys for an in-order traversal": ascending order. "**Explain** why the shape of the tree matters": a balanced tree is searched in about log₂ n comparisons, a degenerate tree in about n.
:::

## Summary

:::summary
- A binary tree has a root and nodes with at most two children; in a binary search tree smaller keys are in the left sub-tree and larger keys in the right.
- A tree is stored with left and right pointer arrays (0 = none) or with node objects; keys are inserted by comparing down from the root.
- Searching follows one path, so it takes at most as many comparisons as the height.
- Deleting a leaf removes it; a node with one child is replaced by that child; a node with two children takes the next key in order.
- Pre-order, in-order and post-order traversals visit node-left-right, left-node-right and left-right-node; in-order gives sorted keys.
- A balanced tree takes about log₂ n comparisons, a degenerate tree about n.
:::
