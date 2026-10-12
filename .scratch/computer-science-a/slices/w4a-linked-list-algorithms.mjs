// Slice w4a: linked list algorithms (acs.ds.linked-list-algorithms, Cambridge only).
import { concept, P, chk, same, mdTable, codeBlock, py, CAM } from "../lib.mjs";
import { mc, pm } from "../tables/w4a-q.mjs";
import { makeList, listMd, listOrder, freeOrder, listInsert, listDelete } from "../tables/w4a-adt.mjs";

concept("acs.ds.linked-list-algorithms", { file: "ds/linked-list-algorithms", keyPrefix: "ds.linked-list-algorithms", applies: CAM }, (b) => {
  let L = makeList(Array(5).fill(""), [2, 3, 4, 5, 0], 0, 1);
  const i1 = listInsert(L, "Mutare"); L = i1.list;
  const i2 = listInsert(L, "Gweru"); L = i2.list;
  const i3 = listInsert(L, "Kariba"); L = i3.list;
  const i4 = listInsert(L, "Hwange"); L = i4.list;
  same([i1.node, i2.node, i3.node, i4.node], [1, 2, 3, 4]);
  same(listOrder(L), ["Gweru", "Hwange", "Kariba", "Mutare"]); chk(L.start, 2); chk(L.free, 5);
  const afterFour = listMd(L);
  const d1 = listDelete(L, "Gweru"); const L2 = d1.list;
  chk(L2.start, 4); chk(L2.free, 2); chk(d1.node, 2); chk(L2.next[1], 5);
  const i5 = listInsert(L2, "Bulawayo"); const L3 = i5.list;
  chk(i5.node, 2); chk(L3.start, 2); chk(L3.next[1], 4); chk(L3.free, 5);
  same(listOrder(L3), ["Bulawayo", "Hwange", "Kariba", "Mutare"]);
  const walk = (l, item) => { const out = []; let c = l.start; while (c !== 0) { out.push(c); if (l.data[c - 1] === item) break; c = l.next[c - 1]; } return out; };
  same(walk(L3, "Kariba"), [2, 4, 3]); same([L3.next[0], L3.next[1], L3.next[2], L3.next[3]], [0, 4, 1, 3]);
  const pyOut = py(`class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

start = None
for town in ("Mutare", "Gweru"):
    node = Node(town)
    node.next = start
    start = node
current = start
count = 0
while current is not None:
    count = count + 1
    current = current.next
print(count, start.data)`);
  same(pyOut, "2 Gweru");

  // ---- multiple choice
  mc(b, 2, "RECALL", "In a linked list stored in arrays, what does a pointer value of 0 in the `Next` array mean?",
    ["There is no next node", "Correct: it is the null pointer."],
    [["The next node is node 0", "Nodes are numbered from 1."], ["The node is the start of the list", "The start is held in the start pointer."], ["The node has been erased from the array", "Its data is still there."]],
    "0 marks the end of the list (or of the free list).", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What is the purpose of the free list pointer?",
    ["It identifies the first unused node", "Correct."],
    [["It identifies the last node of the whole list", "The last node is the one whose pointer is null."], ["It counts the nodes in the list", "A separate count does that."], ["It identifies the largest item in the list so far", "The list is not ordered by size of the pointer."]],
    "A new item is stored in the node the free list pointer identifies.", { daily: true });
  mc(b, 3, "APPLICATION", "A new item is smaller than every item in an alphabetical linked list. Which pointer must change to include it?",
    ["The start pointer", "Correct: the new node becomes the first node."],
    [["The pointer of the last node", "The new item is not at the end."], ["The free list pointer only", "The free list pointer moves, but the list also needs a new start."], ["No pointer needs to change", "Without a change the new node is not in the list."]],
    "With no previous node, the start pointer is updated.", { hints: ["Which node comes before the new node?"] });
  mc(b, 3, "ANALYSIS", "When deleting a node from the middle of a linked list, which statement is correct?",
    ["The previous node's pointer skips the deleted node", "Correct."],
    [["All the later items are moved one place back in the array", "That is what an array needs; a linked list does not move items."], ["The pointers of every node in the list are changed", "Only one pointer changes."], ["The deleted node's data must be set to null first", "The data may stay; the node is just returned to the free list."]],
    "One pointer change removes the node from the list.", { hints: ["How many nodes need a new pointer?"] });
  mc(b, 3, "APPLICATION", "Why must the new node's pointer be set before the previous node's pointer is changed when inserting?",
    ["Otherwise the rest of the list is lost", "Correct: the link to it would be lost."],
    [["The order makes the list sort itself automatically", "The position is found by comparing items."], ["The previous node's pointer is not needed at all", "It must point to the new node."], ["The program would not translate", "The order does not cause a translation error."]],
    "The previous node's old pointer is the new node's next pointer.", { hints: ["What value does the previous node's pointer hold before it changes?"] });
  mc(b, 3, "EVALUATION", "A list of 10 000 names in order is searched with a binary search many times and rarely changed. Which structure is more suitable?",
    ["An array, as items can be reached by index", "Correct: a binary search needs direct access."],
    [["A linked list, because it can use a binary search easily", "A linked list cannot be accessed by index, so a binary search is not possible."], ["A linked list, because it needs no pointers", "A linked list needs a pointer for every node."], ["Either one, because they search at the same speed", "A binary search needs direct access."]],
    "A binary search needs the middle item to be reached directly.", { hints: ["How does a binary search find the middle item?"] });
  mc(b, 3, "UNDERSTANDING", "In a Python linked list, which value plays the part of the null pointer?",
    ["`None`", "Correct."],
    [["`0`", "That would be a number, which is legal data."], ["`\"\"`", "That is an empty string."], ["`False`", "That is a Boolean value."]],
    "The last node's next attribute is None.", { hints: ["What does Python use to mean no object?"] });
  mc(b, 4, "ANALYSIS", "A linked list has no free nodes (`FreePointer` = 0). What should the insert function do?",
    ["Return FALSE without changing the list", "Correct."],
    [["Overwrite the first node", "That would lose an item."], ["Set `FreePointer` to the start of the list", "That would corrupt the list."], ["Delete the last item and use its node", "Items must not be lost without being asked."]],
    "The list is full, so the item cannot be stored.", { hints: ["What does a null free list pointer show?"] });

  // ---- true / false, matching, fill in the blank
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "The order of the items in a linked list is given by the order of the nodes in the array.", answer: false,
    explanation: "False. The order is given by the pointers, starting at the start pointer." });
  b.tf({ d: 3, skill: "UNDERSTANDING", hints: ["Does a linked list let you jump to the middle?"], stem: "A binary search can be used on a linked list in the same way as on a sorted array.", answer: false,
    explanation: "False. The middle node cannot be reached directly; the pointers have to be followed from the start." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term to its meaning.",
    pairs: [["Start pointer", "The index of the first node in the list"], ["Free list pointer", "The index of the first unused node"], ["Null pointer", "A pointer that points to no node"], ["Node", "A data item together with its pointer"], ["Previous node", "The node whose pointer is changed when inserting or deleting"]],
    explanation: "Terms for the array implementation." });
  b.fib({ d: 3, skill: "APPLICATION", hints: ["The previous node must skip the deleted one and the deleted node joins the free list."],
    stem: "Complete the lines of the delete algorithm that remove the node `Current` from the list, where `Previous` is the node before it (0 if `Current` is the first node).",
    template: "IF Previous = 0 THEN\n\nStartPointer ← {{blank:a}}\n\nELSE\n\nNext[Previous] ← {{blank:b}}\n\nENDIF\n\nNext[Current] ← {{blank:c}}\n\nFreePointer ← Current",
    blanks: [
      { id: "a", accepted: ["Next[Current]"], choices: ["Next[Current]", "Current", "Previous", "FreePointer"] },
      { id: "b", accepted: ["Next[Current]"], choices: ["Next[Current]", "Current", "Previous", "StartPointer"] },
      { id: "c", accepted: ["FreePointer"], choices: ["FreePointer", "StartPointer", "0", "Previous"] },
    ], explanation: "Skip the node by copying its pointer, then link the node in front of the old free list." });

  // ---- numerical
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["The first node comes from the free list."],
    stem: "A linked list of 5 nodes is empty with `FreePointer` = 1 and the free list 1 → 2 → 3 → 4 → 5. After four items have been inserted, state the value of `FreePointer`.", value: 5, wrong: [4, 0], workedSolution: "Each insert takes the first free node: after 1, 2, 3 and 4 are used, node 5 is first on the free list.", explanation: "FreePointer = 5." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Follow the pointers from the start pointer."],
    stem: "The list below is stored in arrays.\n\n" + afterFour + "\n\nHow many comparisons does a search for Mutare make?", value: 4, wrong: [1, 5], workedSolution: "The order is Gweru (2), Hwange (4), Kariba (3), Mutare (1): four nodes are compared.", explanation: "4 comparisons." });
  b.num({ d: 4, skill: "APPLICATION", calculator: false, hints: ["The node before Gweru is none, since Gweru is first."],
    stem: "A linked list of towns in alphabetical order is stored in arrays; 0 is the null pointer. `StartPointer` = 2 and `FreePointer` = 5." + "\n\n" + afterFour + "\n\nThe town Gweru is deleted. State the new value of `StartPointer`.", value: L2.start, wrong: [2, 5], workedSolution: "Gweru is node 2 and its Next is 4, so the start pointer becomes 4.", explanation: "StartPointer = 4." });
  b.num({ d: 4, skill: "APPLICATION", calculator: false, hints: ["The deleted node goes to the front of the free list."],
    stem: "A linked list of towns in alphabetical order is stored in arrays; 0 is the null pointer. `StartPointer` = 2 and `FreePointer` = 5." + "\n\n" + afterFour + "\n\nThe town Gweru is deleted. State the new value of `FreePointer`.", value: L2.free, wrong: [5, 4], workedSolution: "The deleted node, 2, becomes the first free node, so FreePointer = 2.", explanation: "FreePointer = 2." });
  // ---- self-marked
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Think about insertion, access and memory."],
    stem: "Compare a linked list with an array. [3]",
    points: ["Insertion and deletion in a linked list only change pointers; in an array items must be shifted", "Items in an array can be reached directly by index; a linked list must be followed from the start", "A linked list needs extra memory for the pointers"],
    modelAnswer: "In a linked list insertion and deletion only change pointers, whereas an array needs items to be shifted. An array item can be reached directly by its index, but a linked list has to be followed from the start, and it also uses extra memory for the pointers.", explanation: "Insertion, access and memory." });
  b.manualShort({ d: 5, skill: "CREATION", marks: 5, hints: ["Use Current to walk the list.", "Return 0 when the pointer becomes null."],
    stem: "The linked list is stored in `Data` and `Next` with `StartPointer`. Write a function `Find(Item)` that returns the index of the node holding `Item`, or 0 if the item is not in the list. [5]",
    points: ["Function header with the Item parameter and RETURNS INTEGER", "Current is set to StartPointer", "A loop that continues while Current <> 0 and Data[Current] <> Item", "Moves on with Current ← Next[Current] inside the loop", "Returns Current after the loop"],
    modelAnswer: codeBlock(`FUNCTION Find(Item : STRING) RETURNS INTEGER
    DECLARE Current : INTEGER
    Current ← StartPointer
    WHILE Current <> 0 AND Data[Current] <> Item DO
        Current ← Next[Current]
    ENDWHILE
    RETURN Current
ENDFUNCTION`), explanation: "Follow the pointers until found or null." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4, hints: ["Four pointer or data changes are needed."],
    stem: "Describe the steps needed to insert a new item between two nodes of a linked list stored in arrays. [4]",
    points: ["Take the first node from the free list and move the free list pointer to the next free node", "Store the new item in the Data of that node", "Set the Next pointer of the new node to the node that follows it", "Change the Next pointer of the previous node to the new node"],
    modelAnswer: "Take the first free node and move the free list pointer on. Store the item in that node's data, set its Next pointer to the node that follows, then change the previous node's Next pointer to the new node.", explanation: "Take, store, link forward, link back." });
  b.manualShort({ d: 3, skill: "EVALUATION", marks: 3, hints: ["Consider which operations are common."],
    stem: "A club keeps its members' names in alphabetical order. Names are added and removed every week. Justify the use of a linked list rather than an array. [3]",
    points: ["Names are inserted and deleted often", "In a linked list this changes only pointers, so no names have to be moved", "In an array the names after the position would have to be shifted each time"],
    modelAnswer: "Names are added and removed often. In a linked list only pointers change, so no names are moved, whereas an array would need the later names shifted each time.", explanation: "Frequent changes favour pointers." });

  // ---- structured practice
  b.struct({ d: 5, skill: "APPLICATION", examStyle: true, hints: ["Follow Start, then each Next pointer.", "The deleted node goes to the front of the free list."],
    explanation: "A deletion and an insertion in a linked list of towns.",
    stem: "A linked list of towns in alphabetical order is stored in arrays. A pointer of 0 is null.\n\n" + afterFour + "\n\nThe town Gweru is deleted. Then the town Bulawayo is inserted using the first node of the free list.",
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: "State the first two towns in the list before the changes.", template: "First: {{blank:a}}, second: {{blank:b}}", blanks: [{ id: "a", accepted: ["Gweru"], choices: ["Gweru", "Hwange", "Kariba", "Mutare"] }, { id: "b", accepted: ["Hwange"], choices: ["Gweru", "Hwange", "Kariba", "Mutare"] }], wrong: [["Mutare", "Kariba"]], explanation: "Start = 2 (Gweru), whose Next is 4 (Hwange)." }),
      P.num({ label: "(b)", marks: 1, stem: "State the value of `StartPointer` after Gweru is deleted.", value: L2.start, wrong: [2, 5], workedSolution: "Gweru is first, so the start pointer takes Gweru's Next value, 4.", explanation: "StartPointer = 4." }),
      P.num({ label: "(c)", marks: 1, stem: "State the value of `FreePointer` after Gweru is deleted.", value: L2.free, wrong: [5, 4], workedSolution: "Node 2 joins the front of the free list.", explanation: "FreePointer = 2." }),
      P.num({ label: "(d)", marks: 1, stem: "State the index of the node used to store Bulawayo.", value: i5.node, wrong: [5, 1], workedSolution: "The first free node is node 2, the one freed by Gweru.", explanation: "Node 2." }),
      P.num({ label: "(e)", marks: 1, stem: "State the new value of `StartPointer` after Bulawayo is inserted.", value: L3.start, wrong: [4, 5], workedSolution: "Bulawayo comes before Hwange, so it becomes the first node: 2.", explanation: "StartPointer = 2." }),
      P.manual({ label: "(f)", marks: 3, stem: "Explain why no town has to be moved in the arrays when Gweru is deleted.", points: ["The order of the list is held in the pointers", "Only the start pointer (and the deleted node's pointer) change", "The deleted node is added to the free list"], modelAnswer: "The order is held in the pointers, so deleting only changes the start pointer and the deleted node's own pointer, and the node is added to the free list. No town needs to move.", explanation: "Pointers, not positions." }),
    ] });
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Follow the pointers from the start pointer.", "The function returns 0 when the item is not found."],
    explanation: "Searching a linked list.",
    stem: "A linked list of towns in alphabetical order holds Bulawayo, Hwange, Kariba and Mutare with `StartPointer` = 2. The nodes are: node 1 Mutare (Next 0), node 2 Bulawayo (Next 4), node 3 Kariba (Next 1) and node 4 Hwange (Next 3).",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "State the number of comparisons made by `Find(\"Kariba\")`.", value: 3, wrong: [1, 4], workedSolution: "The nodes visited are 2 (Bulawayo), 4 (Hwange) and 3 (Kariba).", explanation: "3 comparisons." }),
      P.num({ label: "(b)", marks: 1, stem: "State the value returned by `Find(\"Kariba\")`.", value: 3, wrong: [2, 4], workedSolution: "Kariba is stored in node 3.", explanation: "3." }),
      pm("(c)", "What is returned by `Find(\"Rudo\")`, which is not in the list?", ["0", "Correct: the loop ends when Current is the null pointer."], [["1", "Node 1 holds Mutare."], ["-1", "The function returns the pointer value 0."], ["4", "Node 4 holds Hwange."]], "A null Current means the end was reached."),
      P.manual({ label: "(d)", marks: 3, stem: "Write the pseudocode for the function `Find(Item)`.", points: ["Starts at StartPointer", "Loop continues while Current <> 0 AND Data[Current] <> Item, moving Current ← Next[Current]", "Returns Current"], modelAnswer: codeBlock(`FUNCTION Find(Item : STRING) RETURNS INTEGER
    DECLARE Current : INTEGER
    Current ← StartPointer
    WHILE Current <> 0 AND Data[Current] <> Item DO
        Current ← Next[Current]
    ENDWHILE
    RETURN Current
ENDFUNCTION`), explanation: "Follow the pointers." }),
    ] });

  // ---- flashcards
  b.card("DEFINITION", "Node", "A data value with a pointer to the next node; in arrays, Data[n] and Next[n].");
  b.card("DEFINITION", "Start pointer", "The index of the first node in the list; 0 (null) if the list is empty.");
  b.card("DEFINITION", "Free list pointer", "The index of the first unused node; the free nodes are linked by Next; 0 means the list is full.");
  b.card("CONCEPT", "Find", "Current ← StartPointer; loop while Current <> 0 AND Data[Current] <> Item: Current ← Next[Current]; return Current (0 if not found).");
  b.card("CONCEPT", "Insert", "Take the first free node, store the item, walk to the place, set Next[New] to Current and Next[Previous] (or StartPointer) to New.");
  b.card("CONCEPT", "Insert at front, middle and end", "Front: Previous is 0, so StartPointer changes. Middle: both pointers set. End: Current is 0, so the new node's pointer is null.");
  b.card("CONCEPT", "Delete", "Make the previous node (or StartPointer) skip the node, then Next[Current] ← FreePointer and FreePointer ← Current.");
  b.card("CONCEPT", "Linked list against array", "Linked list: insertion and deletion by pointer changes, no direct access, extra memory for pointers. Array: direct access, items shifted on insertion.");
  b.card("CONCEPT", "Python linked list", "Node objects with data and next; None is the null pointer; the interpreter manages memory (dynamic).");
});
