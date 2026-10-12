// Slice w4a: abstract data types - stack, queue and linked list (acs.ds.adt-introduction, both boards).
import { concept, P, chk, same, mdTable, codeBlock } from "../lib.mjs";
import { mc, pm } from "../tables/w4a-q.mjs";
import { stackRun, queueRun, makeList, listMd, listOrder, freeOrder, listInsert, listDelete } from "../tables/w4a-adt.mjs";

concept("acs.ds.adt-introduction", { file: "ds/adt-introduction", keyPrefix: "ds.adt-introduction" }, (b) => {
  // stack of 5 places
  const sOps = [["push", 8], ["push", 3], ["push", 15], ["push", 9], ["pop"], ["pop"], ["push", 6]];
  const s = stackRun(5, sOps);
  same(s.rows.map((r) => r.top), [1, 2, 3, 4, 3, 2, 3]); same(s.rows[4].note, "returns 9"); same(s.rows[5].note, "returns 15"); same(s.data, [8, 3, 6, "", ""]);
  // circular queue of 4 places
  const qOps = [["enqueue", "A"], ["enqueue", "B"], ["enqueue", "C"], ["dequeue"], ["enqueue", "D"], ["enqueue", "E"], ["dequeue"], ["enqueue", "F"]];
  const q = queueRun(4, qOps);
  chk(q.rows[5].rear, 1); chk(q.rows[5].count, 4); same(q.rows[6].note, "returns B"); chk(q.rows[6].front, 3);
  chk(q.rows[7].rear, 2); chk(q.rows[7].count, 4); same(q.data, ["E", "F", "C", "D"]);
  // linked list
  const L = makeList(["Mutare", "Bulawayo", "Masvingo", "Harare", "", ""], [0, 4, 1, 3, 6, 0], 2, 5);
  same(listOrder(L), ["Bulawayo", "Harare", "Masvingo", "Mutare"]);
  const ins = listInsert(L, "Gweru");
  chk(ins.node, 5); chk(ins.prev, 2); chk(ins.list.free, 6); chk(ins.list.next[1], 5); chk(ins.list.next[4], 4);
  const del = listDelete(ins.list, "Masvingo");
  chk(del.node, 3); chk(del.list.next[3], 1 === 1 ? 1 : 0); chk(del.list.free, 3); chk(del.list.next[2], 6);
  same(listOrder(del.list), ["Bulawayo", "Gweru", "Harare", "Mutare"]);
  const listBefore = listMd(L);
  const opsText = (ops) => ops.map(([o, v]) => (v === undefined ? o : `${o} ${v}`)).join(", ");

  // ---- multiple choice
  mc(b, 1, "RECALL", "Which rule does a stack follow?",
    ["Last in, first out", "Correct."],
    [["First in, first out", "That is the rule of a queue."], ["Smallest item out first", "A stack does not sort items."], ["Random item out first", "A stack always removes the top item."]],
    "The most recent item pushed is the first popped.");
  mc(b, 2, "RECALL", "Which rule does a queue follow?",
    ["First in, first out", "Correct."],
    [["Last in, first out", "That is the rule of a stack."], ["Largest item out first", "A queue does not sort items."], ["Middle item out first", "A queue removes the item at the front."]],
    "Items leave in the order they arrived.", { daily: true });
  mc(b, 2, "APPLICATION", "Which structure is most suitable for the undo feature of a drawing program?",
    ["A stack", "Correct: the latest change is undone first."],
    [["A queue", "A queue would undo the oldest change first."], ["A linear search", "That is an algorithm, not a structure."], ["A record", "A record groups fields; it does not give an order of removal."]],
    "The most recent action must be reversed first.", { daily: true });
  mc(b, 3, "UNDERSTANDING", "Why is a circular queue used instead of a simple queue in an array?",
    ["The places freed at the front can be reused", "Correct: the rear pointer wraps to the start."],
    [["Items can be removed from either end", "Items still leave only at the front."], ["The queue can hold more items than the array size", "The size of the array is still the limit."], ["The queue does not need any pointers", "It uses front and rear pointers."]],
    "Wrapping avoids wasting the places before the front.", { hints: ["What happens to the places that dequeued items leave behind?"] });
  mc(b, 3, "UNDERSTANDING", "What does a null pointer in the last node of a linked list show?",
    ["There are no more nodes in the list", "Correct."],
    [["The node is empty and has been deleted", "A deleted node is returned to the free list."], ["The list has been sorted", "A null pointer does not mean sorted."], ["The list is full", "A full list has no free nodes."]],
    "The last node points to nothing.", { hints: ["Where does the last node's pointer need to point?"] });
  mc(b, 3, "ANALYSIS", "Why is a linked list a better choice than an array for an alphabetical list in which names are often inserted and deleted?",
    ["Only pointers change, so no items have to be moved", "Correct."],
    [["It uses less memory than an array in every case", "A linked list needs extra memory for the pointers."], ["It can be searched by a binary search", "A binary search needs direct access to the middle item."], ["It keeps the names in order automatically", "The programmer must insert each name in the right place."]],
    "In an array the items after the insertion point must all be shifted.", { hints: ["What has to be done to an array when an item is inserted in the middle?"] });
  mc(b, 3, "UNDERSTANDING", "What is the purpose of the free list in a linked list stored in arrays?",
    ["To link together the nodes that are not in use", "Correct."],
    [["To hold the items that have been deleted for ever", "Deleted nodes are reused, not kept for ever."], ["To store the names in alphabetical order", "The main list does that."], ["To count the number of items in the list", "A separate count does that."]],
    "New items are stored in nodes taken from the free list.", { hints: ["Where does a new node come from?"] });
  mc(b, 4, "EVALUATION", "A print server receives jobs from many computers and prints them in the order received. Which structure and justification are correct?",
    ["A queue, because the first job to arrive must be printed first", "Correct."],
    [["A stack, because the latest job is the most important", "The latest job would be printed before earlier ones."], ["A stack, because jobs are stored in an array", "A queue can also be stored in an array."], ["A queue, because the last job must be printed first", "That describes a stack."]],
    "First come, first served is FIFO.", { hints: ["In which order should jobs leave?"] });

  // ---- true / false, matching, fill in the blank
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "In a stack, items are added and removed at the same end.", answer: true,
    explanation: "True. Both push and pop work at the top." });
  b.tf({ d: 3, skill: "UNDERSTANDING", hints: ["Think about what happens to the front pointer."], stem: "When an item is removed from a queue, all the remaining items must be moved one place along the array.", answer: false,
    explanation: "False. The front pointer moves instead; the items stay where they are." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term to its meaning.",
    pairs: [["Push", "Add an item to the top of a stack"], ["Pop", "Remove and return the top item of a stack"], ["Enqueue", "Add an item at the rear of a queue"], ["Dequeue", "Remove the item at the front of a queue"], ["Null pointer", "A pointer that points to no node"]],
    explanation: "Operations of stacks, queues and linked lists." });
  b.fib({ d: 3, skill: "APPLICATION", hints: ["Pop returns the most recently pushed item that is still on the stack."],
    stem: "These operations are applied to an empty stack: " + opsText(sOps) + ". State the values returned by the two pops.",
    template: "First pop returns {{blank:a}}\n\nSecond pop returns {{blank:b}}",
    blanks: [{ id: "a", accepted: ["9"], input: "number" }, { id: "b", accepted: ["15"], input: "number" }], wrong: [["3", "8"]],
    explanation: "After pushes 8, 3, 15 and 9 the first pop returns 9; the second returns 15." });

  // ---- numerical
  b.num({ d: 2, skill: "APPLICATION", calculator: false, stem: "These operations are applied to an empty stack: " + opsText(sOps) + ". State the value of the stack pointer (`Top`) at the end.", value: s.top, wrong: [4, 5], workedSolution: "Four pushes give 4, two pops give 2, and the last push gives 3.", explanation: "Top = 3." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["The stack holds 8, 3 and 6."],
    stem: "A stack of 5 places is empty. These operations are applied: " + opsText(sOps) + ". A peek is then performed. State the value returned.", value: 6, wrong: [8, 9], workedSolution: "The stack holds 8, 3 and 6 with 6 on top.", explanation: "6." });
  b.num({ d: 4, skill: "APPLICATION", calculator: false, hints: ["Rear ← MOD(Rear, Size) + 1.", "Work out the Rear pointer after each enqueue."],
    stem: "A circular queue has 4 places. Its pointers are `Front` = 1 and `Rear` = 0 when empty. These operations are applied: " + opsText(qOps.slice(0, 6)) + ". State the value of `Rear` at the end.", value: q.rows[5].rear, wrong: [5, 6], workedSolution: "After A, B, C: Rear = 3. After the dequeue and D: Rear = 4. E: Rear = MOD(4, 4) + 1 = 1.", explanation: "Rear = 1, after wrapping." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Count the pointers that are changed when a node is inserted."],
    stem: "A new node is inserted between two nodes of a linked list. How many existing nodes have to have their pointer changed (not counting the new node)?", value: 1, wrong: [2, 3], workedSolution: "Only the previous node's pointer changes, to point to the new node; the new node's own pointer is set to the following node.", explanation: "1." });
  // ---- self-marked
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Compare the rule, the ends used and the operations."],
    stem: "Describe the differences between a stack and a queue. [4]",
    points: ["A stack is last in, first out; a queue is first in, first out", "In a stack items are added and removed at the same end (the top)", "In a queue items are added at the rear and removed from the front", "A stack uses push and pop; a queue uses enqueue and dequeue"],
    modelAnswer: "A stack is LIFO and a queue is FIFO. A stack adds and removes items at the same end, the top, using push and pop. A queue adds items at the rear and removes them from the front, using enqueue and dequeue.", explanation: "Rule, ends and operations." });
  b.manualShort({ d: 4, skill: "UNDERSTANDING", marks: 3, hints: ["What happens when the rear reaches the last place?"],
    stem: "Explain how a circular queue makes use of an array. [3]",
    points: ["When the rear pointer reaches the last place it moves back to the first place", "So places freed at the front by dequeue can be used again", "A count (or the pointers) is used to tell whether the queue is full or empty"],
    modelAnswer: "When the rear pointer passes the last place it wraps to the first place, so places freed at the front can be used again. A count of items shows whether the queue is full or empty.", explanation: "Wrap-around reuse." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4, hints: ["Use the free list, the new node and two pointers."],
    stem: "A linked list is stored in the arrays `Data` and `Next` with the pointers `Start` and `Free`. Describe how a new item is inserted between two existing nodes. [4]",
    points: ["A node is taken from the free list and the Free pointer is moved to the next free node", "The new item is stored in the Data of that node", "The new node's Next pointer is set to the node that follows", "The previous node's Next pointer is changed to point to the new node"],
    modelAnswer: "Take the first node of the free list and move Free on. Store the item in that node, set its Next pointer to the node that follows, and change the Next pointer of the previous node to point to the new node.", explanation: "Take a node, store, link both ways." });
  b.manualShort({ d: 3, skill: "EVALUATION", marks: 3, hints: ["Match the rule to the situation."],
    stem: "A bank has customers waiting at a counter. Justify the use of a queue to store the customers' ticket numbers. [3]",
    points: ["A queue is first in, first out", "The customer who arrived first must be served first", "New customers are added at the rear and the customer at the front is removed when served"],
    modelAnswer: "A queue is first in, first out, so the customer who arrived first is served first. New ticket numbers are added at the rear and the one at the front is removed when the customer is served.", explanation: "FIFO matches the situation." });

  // ---- structured practice
  b.struct({ d: 5, skill: "APPLICATION", examStyle: true, hints: ["Rear ← MOD(Rear, 4) + 1.", "Dequeue moves Front along."],
    explanation: "Tracing a circular queue of four places.",
    stem: "A circular queue holds up to 4 ticket codes in an array with places 1 to 4. `Front` is 1, `Rear` is 0 and `Count` is 0 when it is empty. The operations are: " + opsText(qOps) + ".",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "State the value of `Rear` after the sixth operation (enqueue E).", value: q.rows[5].rear, wrong: [5, 4], workedSolution: "Rear was 4; MOD(4, 4) + 1 = 1, so E is stored in place 1.", explanation: "Rear = 1." }),
      P.num({ label: "(b)", marks: 1, stem: "State the value of `Count` after the sixth operation.", value: q.rows[5].count, wrong: [3, 5], workedSolution: "Three enqueues, one dequeue and two more enqueues leave 4 items.", explanation: "Count = 4." }),
      pm("(c)", "Which item does the seventh operation (dequeue) return?", ["B", "Correct: A has already left."], [["A", "A was removed by the first dequeue."], ["E", "E is the most recent item, not the front."], ["F", "F has not been added yet."]], "Front was at place 2, which holds B."),
      P.num({ label: "(d)", marks: 1, stem: "State the value of `Front` after the seventh operation.", value: q.rows[6].front, wrong: [2, 4], workedSolution: "Front moves from 2 to 3.", explanation: "Front = 3." }),
      P.fib({ label: "(e)", marks: 2, stem: "State the final values of `Rear` and `Count` after the eighth operation.", template: "Rear = {{blank:r}}, Count = {{blank:c}}", blanks: [{ id: "r", accepted: [String(q.rows[7].rear)], input: "number" }, { id: "c", accepted: [String(q.rows[7].count)], input: "number" }], wrong: [["1", "3"]], explanation: "F is stored in place 2, so Rear = 2, and Count rises to 4." }),
      P.manual({ label: "(f)", marks: 3, stem: "Explain how the program can tell that this queue is full.", points: ["The queue is full when Count equals the size of the array (4)", "Front and Rear alone cannot tell full from empty, because they can be next to each other in both cases", "So the count of items is kept (or an equivalent test is used)"], modelAnswer: "The queue is full when `Count` equals 4, the size of the array. Comparing `Front` and `Rear` alone is not enough, so a count of the items is kept.", explanation: "A count removes the ambiguity." }),
    ] });
  b.struct({ d: 4, skill: "APPLICATION", examStyle: true, hints: ["Follow Start, then each Next pointer.", "A deleted node goes to the front of the free list."],
    explanation: "Inserting and deleting in a linked list of towns.",
    stem: "A linked list of towns in alphabetical order is stored in arrays. A pointer of 0 is null.\n\n" + listBefore + "\n\nThe town Gweru is inserted using the first node of the free list, and then the town Masvingo is deleted.",
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: "State the first two towns in the list before the changes.", template: "First: {{blank:a}}, second: {{blank:b}}", blanks: [{ id: "a", accepted: ["Bulawayo"], choices: ["Bulawayo", "Mutare", "Harare", "Masvingo"] }, { id: "b", accepted: ["Harare"], choices: ["Bulawayo", "Mutare", "Harare", "Masvingo"] }], wrong: [["Mutare", "Masvingo"]], explanation: "Start = 2 (Bulawayo), whose Next is 4 (Harare)." }),
      P.num({ label: "(b)", marks: 1, stem: "State the index of the node used to store Gweru.", value: ins.node, wrong: [6, 2], workedSolution: "Free = 5, the first node of the free list.", explanation: "Node 5." }),
      P.num({ label: "(c)", marks: 1, stem: "State the new value of `Next[2]` after Gweru is inserted.", value: ins.list.next[1], wrong: [4, 6], workedSolution: "Bulawayo (node 2) must now point to Gweru, node 5.", explanation: "Next[2] = 5." }),
      P.num({ label: "(d)", marks: 1, stem: "State the value of `Free` after Masvingo is deleted.", value: del.list.free, wrong: [6, 5], workedSolution: "Masvingo is node 3, which becomes the first node of the free list.", explanation: "Free = 3." }),
      P.manual({ label: "(e)", marks: 1, stem: "State the order of the towns in the list after both changes.", points: ["Bulawayo, Gweru, Harare, Mutare"], modelAnswer: "Bulawayo, Gweru, Harare, Mutare.", explanation: "Gweru added, Masvingo removed." }),
    ] });

  // ---- flashcards
  b.card("DEFINITION", "Abstract data type", "Data together with the operations on it, defined without saying how it is stored.");
  b.card("DEFINITION", "Stack", "Last in, first out. Push and pop at the top; a stack pointer marks the top item; peek reads it without removing.");
  b.card("DEFINITION", "Queue", "First in, first out. Enqueue at the rear, dequeue at the front; front and rear pointers.");
  b.card("CONCEPT", "Circular queue", "The rear pointer wraps to place 1 after the last place (Rear ← MOD(Rear, Size) + 1) so freed places are reused; a count shows full or empty.");
  b.card("DEFINITION", "Linked list", "Nodes of data and pointers; a start pointer marks the first node and a null pointer ends the list.");
  b.card("CONCEPT", "Free list", "The unused nodes linked together; a new item takes the first free node and a deleted node is returned to the free list.");
  b.card("CONCEPT", "Insert in a linked list", "Take a free node, store the item, set its pointer to the next node and make the previous node point to it.");
  b.card("CONCEPT", "Delete from a linked list", "Make the previous node point to the node after the deleted one and add the deleted node to the free list.");
  b.card("CONCEPT", "Choosing an ADT", "Stack for undo or back; queue for print jobs or waiting customers; linked list for a sorted list with many insertions and deletions.");
});
