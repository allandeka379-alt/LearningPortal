// Slice w4a: binary trees and their algorithms (acs.ds.binary-tree-algorithms, both boards).
import { concept, P, chk, same, mdTable, codeBlock, bstFrom, bstDelete, inorder, preorder, postorder, bstHeight, bstTable } from "../lib.mjs";
import { mc, pm } from "../tables/w4a-q.mjs";
import { clone, searchPath, nodeTable } from "../tables/w4a-binary-tree-algorithms.mjs";

concept("acs.ds.binary-tree-algorithms", { file: "ds/binary-tree-algorithms", keyPrefix: "ds.binary-tree-algorithms" }, (b) => {
  const keys = [38, 21, 54, 12, 30, 47, 66, 59];
  const t = bstFrom(keys);
  same(inorder(t), [12, 21, 30, 38, 47, 54, 59, 66]); same(preorder(t), [38, 21, 12, 30, 54, 47, 66, 59]); same(postorder(t), [12, 30, 21, 47, 59, 66, 54, 38]); chk(bstHeight(t), 4);
  const p59 = searchPath(t, 59), p33 = searchPath(t, 33), p47 = searchPath(t, 47);
  same(p59.path, [38, 54, 66, 59]); same(p33.path, [38, 21, 30]); same(p47.path, [38, 54, 47]);
  const d12 = bstDelete(clone(t), 12), d66 = bstDelete(clone(t), 66), d54 = bstDelete(clone(t), 54), d38 = bstDelete(clone(t), 38);
  same(preorder(d12), [38, 21, 30, 54, 47, 66, 59]); same(preorder(d66), [38, 21, 12, 30, 54, 47, 59]); same(preorder(d54), [38, 21, 12, 30, 59, 47, 66]); chk(d38.key, 47);
  same(preorder(d38), [47, 21, 12, 30, 54, 66, 59]);
  const arr = bstTable(keys);
  const arrTable = mdTable(["Index", "Left pointer", "Key", "Right pointer"], arr.map((r) => [r.index, r.left, r.key, r.right]));
  const deg = bstFrom([12, 21, 30, 38, 47, 54, 59, 66]); chk(bstHeight(deg), 8);
  // second tree for the structured items: marks 33 18 47 25 60 11
  const k2 = [33, 18, 47, 25, 60, 11];
  const t2 = bstFrom(k2);
  same(inorder(t2), [11, 18, 25, 33, 47, 60]); same(preorder(t2), [33, 18, 11, 25, 47, 60]); same(postorder(t2), [11, 25, 18, 60, 47, 33]); chk(bstHeight(t2), 3);
  const p25 = searchPath(t2, 25); same(p25.path, [33, 18, 25]);
  const e47 = bstDelete(clone(t2), 47); same(preorder(e47), [33, 18, 11, 25, 60]);
  const e18 = bstDelete(clone(t2), 18); same(preorder(e18), [33, 25, 11, 47, 60]);
  const bt7 = (2 ** 3) - 1; chk(bt7, 7);

  // ---- multiple choice
  mc(b, 1, "RECALL", "What is the first key inserted into a binary search tree called?",
    ["The root", "Correct."],
    [["A leaf", "A leaf is a node with no children."], ["The parent of all leaves", "That is not a term used for the first key."], ["The sub-tree", "A sub-tree is a node with the nodes below it."]],
    "The first key becomes the root node.");
  mc(b, 2, "UNDERSTANDING", "Which rule is true for every node of a binary search tree?",
    ["Smaller keys on the left, larger keys on the right", "Correct: this holds at every node."],
    [["Keys in the left sub-tree are larger than the node's own key", "That is the wrong way round."], ["Both children must be present for every node", "A node may have one child or none."], ["All keys are the same", "Keys are placed by comparison."]],
    "The rule is applied at every node, not only at the root.", { daily: true });
  mc(b, 2, "RECALL", "Which traversal of a binary search tree outputs the keys in ascending order?",
    ["In-order", "Correct: left, node, right."],
    [["Pre-order", "Pre-order visits the node before its sub-trees."], ["Post-order", "Post-order visits the node after its sub-trees."], ["Reverse order", "That is not a standard traversal."]],
    "In-order visits the smaller keys first.", { daily: true });
  mc(b, 3, "UNDERSTANDING", "What is a leaf of a binary tree?",
    ["A node with no children", "Correct."],
    [["The first node of the tree", "That is the root."], ["A node with two children", "That is an internal node."], ["The smallest key in the tree", "A leaf is defined by its children, not its key."]],
    "Leaves are at the bottom of the tree.", { hints: ["Which nodes have both pointers empty?"] });
  mc(b, 3, "APPLICATION", "A leaf is deleted from a binary search tree. What is the only change needed?",
    ["The parent's pointer is set to empty", "Correct."],
    [["Every key below it is moved up one level", "The other nodes do not move."], ["The root is replaced", "The root is not affected."], ["The tree is rebuilt again from the beginning", "A leaf is removed with one pointer change."]],
    "A leaf has no sub-trees to keep.", { hints: ["Does the leaf have any children to look after?"] });
  mc(b, 3, "ANALYSIS", "In which order should the keys 5, 10, 15, 20, 25 be inserted to make a degenerate binary search tree?",
    ["5, 10, 15, 20, 25", "Correct: each key goes to the right of the last."],
    [["15, 5, 25, 10, 20", "This gives a tree with some branching."], ["15, 10, 20, 5, 25", "This gives a balanced tree."], ["10, 5, 20, 15, 25", "This also branches on both sides."]],
    "Keys in order give a chain.", { hints: ["Where does each larger key go?"] });
  mc(b, 3, "UNDERSTANDING", "A binary tree is stored in arrays. What does a left pointer of 0 for a node mean?",
    ["The node has no left child", "Correct."],
    [["The node is the root", "The root is held in the root pointer."], ["The node has been deleted", "A deleted node is not shown by a left pointer."], ["The left child is the first key in the array", "0 is not an index of a node."]],
    "0 is the null pointer.", { hints: ["What value represents no node?"] });
  mc(b, 4, "EVALUATION", "Why is a balanced binary search tree searched faster than a degenerate one?",
    ["Its height is about log₂ n", "Correct: fewer nodes lie on a path."],
    [["It contains fewer keys than the other tree", "Both hold the same keys."], ["It never needs any comparisons at all", "Every step is a comparison."], ["It stores all of its keys in an array", "The storage method does not change the path length."]],
    "Searching follows a path no longer than the height.", { hints: ["What decides how many nodes there are on the longest path?"] });

  // ---- true / false, matching, fill in the blank
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "In a binary tree each node has at most two children.", answer: true,
    explanation: "True. That is why it is called a binary tree: a left child and a right child." });
  b.tf({ d: 3, skill: "UNDERSTANDING", hints: ["Think about the keys 1, 2, 3, 4, 5 inserted in that order."], stem: "The shape of a binary search tree does not depend on the order in which the keys are inserted.", answer: false,
    explanation: "False. The same keys give different trees for different orders: sorted order gives a chain." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each traversal to the order in which it visits the nodes.",
    pairs: [["Pre-order", "Node, then left sub-tree, then right sub-tree"], ["In-order", "Left sub-tree, then node, then right sub-tree"], ["Post-order", "Left sub-tree, then right sub-tree, then node"]],
    explanation: "The name shows where the node itself is visited." });
  b.fib({ d: 3, skill: "APPLICATION", hints: ["Insert 29 first; each later key is compared with the nodes on its path."],
    stem: "The keys 29, 15, 41, 22, 50, 8 are inserted into an empty binary search tree in that order. State the children.",
    template: "Left child of 29: {{blank:a}}\n\nRight child of 29: {{blank:b}}\n\nRight child of 15: {{blank:c}}",
    blanks: [{ id: "a", accepted: ["15"], input: "number" }, { id: "b", accepted: ["41"], input: "number" }, { id: "c", accepted: ["22"], input: "number" }], wrong: [["41", "15", "8"]],
    explanation: "15 < 29 goes left, 41 > 29 goes right, 22 goes left of 29, then right of 15." });

  // ---- numerical
  b.num({ d: 2, skill: "APPLICATION", calculator: false, stem: "The keys 52, 31, 70, 24, 45 are inserted in that order into an empty binary search tree. State the key at the root.", value: 52, wrong: [45, 70], workedSolution: "The first key inserted is the root.", explanation: "38." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Find the path from the root: compare with each node."],
    stem: "In the tree built from 38, 21, 54, 12, 30, 47, 66, 59, how many comparisons are made to find the key 59?", value: p59.path.length, wrong: [3, 8], workedSolution: "The path is 38, 54, 66, 59: four comparisons.", explanation: "4 comparisons." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["A leaf has no children; count them in the tree."],
    stem: "How many leaves does the tree built by inserting 26, 14, 35, 9, 20, 41, 30 in that order have?", value: 4, wrong: [3, 5], workedSolution: "The leaves are 9, 20, 30 and 41.", explanation: "4 leaves." });
  b.num({ d: 4, skill: "APPLICATION", calculator: false, hints: ["A binary tree with all places filled has 1 + 2 + 4 nodes."],
    stem: "What is the greatest number of nodes in a binary tree of height 3 (three levels)?", value: 7, wrong: [6, 9], workedSolution: "1 + 2 + 4 = 7 nodes.", explanation: "7 nodes." });
  // ---- self-marked
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Describe the comparison made at each node."],
    stem: "Describe how a new key is inserted into a binary search tree. [3]",
    points: ["Start at the root and compare the new key with the key at the node", "Go left if it is smaller, right if it is larger (or equal)", "Repeat until an empty place is found and attach the new node there"],
    modelAnswer: "Compare the new key with the root. If it is smaller go left, otherwise go right, and repeat at each node reached. When an empty place is found, attach the new node there.", explanation: "Compare, move, attach." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Use the idea that each comparison discards part of the tree."],
    stem: "Explain how a binary search tree can be used to put keys into ascending order. [3]",
    points: ["The keys are inserted into the tree one at a time", "An in-order traversal visits the left sub-tree, the node and the right sub-tree", "So the keys are visited from smallest to largest"],
    modelAnswer: "Insert each key into the tree, then perform an in-order traversal. It visits the left sub-tree, then the node, then the right sub-tree, so the keys come out from smallest to largest.", explanation: "Insert then in-order." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4, hints: ["Cover the three cases: leaf, one child, two children."],
    stem: "Describe how a node is deleted from a binary search tree in each of three cases: a leaf, a node with one child and a node with two children. [4]",
    points: ["Leaf: the pointer in its parent is set to empty", "One child: the parent's pointer is changed to point to the node's child", "Two children: the node's key is replaced by the next key in order (the smallest in the right sub-tree)", "That replacement node is then deleted from the right sub-tree"],
    modelAnswer: "A leaf is removed by emptying its parent's pointer. A node with one child is replaced by that child by changing the parent's pointer. A node with two children takes the smallest key of its right sub-tree, and that node is then deleted from where it was.", explanation: "Three cases." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 3, hints: ["Think about the height of the tree."],
    stem: "Explain why the order in which keys are inserted affects the time taken to search a binary search tree. [3]",
    points: ["The order decides the shape of the tree and its height", "Keys inserted in sorted order form a degenerate tree like a list, so a search may need n comparisons", "A balanced tree has a height of about log₂ n, so a search needs far fewer comparisons"],
    modelAnswer: "The order decides the shape and height of the tree. Sorted keys give a degenerate tree like a list, needing up to n comparisons, whereas a balanced tree has a height of about log₂ n, so a search needs far fewer.", explanation: "Shape decides height." });

  // ---- structured practice
  b.struct({ d: 5, skill: "APPLICATION", examStyle: true, hints: ["Insert the keys one at a time, comparing with each node on the path.", "In-order is left, node, right."],
    explanation: "Building a binary search tree and traversing it.",
    stem: "The marks 33, 18, 47, 25, 60 and 11 are inserted, in that order, into an empty binary search tree.",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "State the key at the root.", value: 33, wrong: [11, 60], workedSolution: "The first key inserted is the root.", explanation: "33." }),
      P.num({ label: "(b)", marks: 1, stem: "State the number of leaves.", value: 3, wrong: [2, 4], workedSolution: "The leaves are 11, 25 and 60.", explanation: "3 leaves." }),
      P.fib({ label: "(c)", marks: 2, stem: "State the order in which the keys are visited by an in-order traversal.", template: "{{blank:a}}, {{blank:b}}, {{blank:c}}, {{blank:d}}, {{blank:e}}, {{blank:f}}", blanks: inorder(t2).map((v, i) => ({ id: "abcdef"[i], accepted: [String(v)], input: "number" })), wrong: [["33", "18", "47", "25", "60", "11"]], explanation: "Ascending order: 11, 18, 25, 33, 47, 60." }),
      P.fib({ label: "(d)", marks: 2, stem: "State the order in which the first three keys are visited by a pre-order traversal.", template: "{{blank:a}}, {{blank:b}}, {{blank:c}}", blanks: preorder(t2).slice(0, 3).map((v, i) => ({ id: "abc"[i], accepted: [String(v)], input: "number" })), wrong: [["11", "18", "25"]], explanation: "Pre-order: 33, 18, 11, 25, 47, 60." }),
      P.num({ label: "(e)", marks: 1, stem: "State the number of comparisons made to find the key 25.", value: p25.path.length, wrong: [2, 6], workedSolution: "The path is 33, 18, 25.", explanation: "3 comparisons." }),
      P.manual({ label: "(f)", marks: 2, stem: "State the order of insertion of the same keys that would give a degenerate tree, and explain why it is a disadvantage.", points: ["The keys in ascending (or descending) order, for example 11, 18, 25, 33, 47, 60", "Every key goes on one side, so the tree is a chain and searches take up to n comparisons"], modelAnswer: "Insert them in ascending order: 11, 18, 25, 33, 47, 60. Each key goes to the right of the last, so the tree is a chain and a search may need up to 6 comparisons, as slow as a linear search.", explanation: "Sorted insertion gives a chain." }),
    ] });
  const k3 = [44, 27, 58, 19, 33, 63];
  const t3 = bstFrom(k3);
  const f19 = bstDelete(clone(t3), 19), f58 = bstDelete(clone(t3), 58), f27 = bstDelete(clone(t3), 27);
  same(preorder(f19), [44, 27, 33, 58, 63]); same(preorder(f58), [44, 27, 19, 33, 63]); same(preorder(f27), [44, 33, 19, 58, 63]);
  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, hints: ["Use the table of children.", "A node with two children is replaced by the smallest key of its right sub-tree."],
    explanation: "Deleting nodes from a binary search tree.",
    stem: "A binary search tree is shown as a table of children.\n\n" + nodeTable(t3) + "\n\nThree different deletions are considered, each starting from this original tree.",
    parts: [
      pm("(a)", "Which change is made when the leaf 19 is deleted?", ["The left pointer of 27 is set to empty", "Correct."], [["The right pointer of 27 is set to empty", "19 is the left child of 27."], ["The root pointer is changed", "The root is not affected."], ["The key 33 moves up to replace 19", "No other node moves."]], "A leaf is removed by emptying its parent's pointer."),
      P.fib({ label: "(b)", marks: 2, stem: "The node 58 (which has one child, 63) is deleted. State the right child of 44 after the deletion.", template: "Right child of 44: {{blank:a}}", blanks: [{ id: "a", accepted: ["63"], input: "number" }], wrong: [["58"]], explanation: "The only child 63 takes the place of 58." }),
      P.num({ label: "(c)", marks: 1, stem: "The node 27 (which has two children, 19 and 33) is deleted, using the smallest key of its right sub-tree as the replacement. State the key that replaces it.", value: 33, wrong: [19, 44], workedSolution: "The right sub-tree of 27 is just 33, so 33 replaces 27.", explanation: "33." }),
      P.manual({ label: "(d)", marks: 2, stem: "Give the pre-order list after 27 has been deleted as described in part (c).", points: ["44, 33, 19, 58, 63", "33 now has 19 as its left child (and no right child)"], modelAnswer: "44, 33, 19, 58, 63.", explanation: "33 takes the place of 27 and keeps 19 as its left child." }),
    ] });

  // ---- flashcards
  b.card("DEFINITION", "Binary tree", "Nodes with at most two children (left and right); the first node is the root and a node with no children is a leaf.");
  b.card("DEFINITION", "Binary search tree", "For every node, keys in the left sub-tree are smaller and keys in the right sub-tree are larger.");
  b.card("CONCEPT", "Inserting a key", "Compare with the root, go left if smaller and right otherwise, and repeat until an empty place is found; attach the new node there.");
  b.card("CONCEPT", "Array representation", "Key, LeftPointer and RightPointer arrays plus RootPointer; 0 means no child.");
  b.card("FACT", "Traversals", "Pre-order: node, left, right. In-order: left, node, right (sorted order). Post-order: left, right, node.");
  b.card("CONCEPT", "Deleting a leaf or a node with one child", "A leaf: empty the parent's pointer. One child: the parent points to that child instead.");
  b.card("CONCEPT", "Deleting a node with two children", "Replace its key with the smallest key of its right sub-tree, then delete that node.");
  b.card("FACT", "Tree performance", "Balanced tree: height about log₂ n, so O(log n) comparisons. Degenerate tree (sorted insertion): height n, so O(n).");
  b.card("CONCEPT", "Uses of traversals", "In-order sorts the keys; pre-order copies a tree; post-order deletes a tree or evaluates an expression tree.");
});
