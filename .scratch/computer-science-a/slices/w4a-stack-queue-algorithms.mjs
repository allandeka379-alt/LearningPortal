// Slice w4a: stack and queue algorithms (acs.ds.stack-queue-algorithms, Cambridge only).
import { concept, P, chk, same, mdTable, codeBlock, py, CAM } from "../lib.mjs";
import { mc, pm } from "../tables/w4a-q.mjs";
import { stackRun, queueRun } from "../tables/w4a-adt.mjs";

concept("acs.ds.stack-queue-algorithms", { file: "ds/stack-queue-algorithms", keyPrefix: "ds.stack-queue-algorithms", applies: CAM }, (b) => {
  const sOps = [["push", 7], ["push", 12], ["push", 3], ["push", 9], ["push", 5], ["pop"], ["pop"]];
  const s = stackRun(4, sOps);
  same(s.rows.map((r) => r.top), [1, 2, 3, 4, 4, 3, 2]); same(s.rows[4].note, "stack full: not stored"); same(s.rows[5].note, "returns 9"); same(s.rows[6].note, "returns 3"); chk(s.top, 2);
  const qOps = [["enqueue", "J"], ["enqueue", "K"], ["enqueue", "L"], ["enqueue", "M"], ["enqueue", "N"], ["dequeue"], ["dequeue"], ["enqueue", "O"]];
  const q = queueRun(4, qOps);
  chk(q.rows[3].rear, 4); same(q.rows[4].note, "queue full: not stored"); chk(q.rows[4].count, 4); chk(q.rows[7].rear, 1); chk(q.rows[7].front, 3); chk(q.rows[7].count, 3);
  const opsText = (ops) => ops.map(([o, v]) => (v === undefined ? o : `${o} ${v}`)).join(", ");
  chk(((5 % 5) + 1), 1); chk(((3 % 6) + 1), 4);
  const histPy = py(`history = []
history.append("A")
history.append("B")
history.append("C")
history.pop()
history.append("D")
print(history[-1], len(history))`);
  same(histPy, "D 3");

  // ---- multiple choice
  mc(b, 2, "RECALL", "In an array implementation of a stack, what does the top pointer show?",
    ["The place of the last item pushed", "Correct: it is the top item still on the stack."],
    [["The number of places in the whole array", "That is the size of the stack."], ["The position of the first item that was pushed", "The first item is at the bottom."], ["The value of the item that will be popped last", "The pointer holds a position, not a value."]],
    "TopPointer identifies the top item.", { daily: true });
  mc(b, 3, "APPLICATION", "A stack of size 6 is stored in an array with a top pointer that is 0 when the stack is empty. Which condition shows that the stack is full?",
    ["`TopPointer = 6`", "Correct."],
    [["`TopPointer = 0`", "This shows that the stack is empty."], ["`TopPointer = 1`", "One item is in the stack."], ["`TopPointer > 6`", "The pointer must never exceed the size."]],
    "A full stack has used every place.", { hints: ["How many items are in a full stack?"], daily: true });
  mc(b, 3, "UNDERSTANDING", "In which order are the two steps of a push carried out?",
    ["Add 1 to the pointer, then store the item", "Correct."],
    [["Store the item first, then add 1 to the top pointer", "The item would be stored in the wrong place."], ["Subtract 1 from the top pointer, then store the item", "That is the pointer change for a pop."], ["Store the item twice", "An item is stored once."]],
    "The pointer moves first so that it shows the place to use.", { hints: ["Where must the new item be stored?"] });
  mc(b, 3, "UNDERSTANDING", "What happens in a pop on an empty stack?",
    ["An underflow, as no item can be returned", "Correct."],
    [["An overflow: the stack is full", "Overflow is a push on a full stack."], ["The pointer becomes negative and an item is returned", "The algorithm must test for empty first."], ["The first item is returned", "There are no items."]],
    "The empty test prevents this.", { hints: ["What is in an empty stack?"] });
  mc(b, 3, "APPLICATION", "A circular queue has 5 places. `RearPointer` is 5. Which statement gives the next value of `RearPointer` for an enqueue?",
    ["`RearPointer ← MOD(RearPointer, 5) + 1`", "Correct: it wraps to 1."],
    [["`RearPointer ← RearPointer + 1`", "This would make it 6, outside the array."], ["`RearPointer ← RearPointer - 1`", "The rear moves forward, not back."], ["`RearPointer ← 0`", "The first place is 1, not 0."]],
    "MOD(5, 5) is 0, and 0 + 1 = 1.", { hints: ["What is MOD(5, 5)?"] });
  mc(b, 4, "ANALYSIS", "Why does a circular queue keep a count of the items instead of relying on the pointers alone?",
    ["The pointers look the same when it is full or empty", "Correct."],
    [["The pointers cannot be changed once they have been set", "The pointers are changed by every operation."], ["A count makes the queue run much faster than a stack does", "Speed is not the reason."], ["The array cannot store pointers", "Pointers are ordinary integers."]],
    "In both cases the rear is just behind the front.", { hints: ["Compare the pointers of a full queue and an empty queue."] });
  mc(b, 3, "ANALYSIS", "A linear queue in an array of 6 places has `Front` = 5 and `Rear` = 6. Why is the queue unable to accept a new item?",
    ["`Rear` is at the last place but places 1 to 4 are free", "Correct: the freed places cannot be reused."],
    [["The queue is empty because Front is 5", "Two items are in the queue."], ["`Front` must always be equal to 1 in a queue", "Front moves as items leave."], ["The queue can only ever hold one item at once", "The array has six places."]],
    "A linear queue wastes the places before the front.", { hints: ["Where would the new item have to go?"] });
  // ---- true / false, matching, fill in the blank
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "In a circular queue, the rear pointer returns to the first place of the array after it reaches the last place.", answer: true,
    explanation: "True. The wrap-around (using MOD) lets the places freed at the front be reused." });
  b.tf({ d: 3, skill: "UNDERSTANDING", hints: ["Think about which pointer moves when an item leaves a queue."], stem: "A dequeue operation changes the rear pointer of the queue.", answer: false,
    explanation: "False. A dequeue returns the item at the front and moves the front pointer; an enqueue moves the rear pointer." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term to its meaning.",
    pairs: [["Overflow", "A push on a full stack"], ["Underflow", "A pop on an empty stack"], ["Top pointer", "The position of the top item of a stack"], ["Wrap-around", "A pointer moves from the last place back to the first"], ["Count", "The number of items in a circular queue"]],
    explanation: "Terms used in the implementations." });
  b.fib({ d: 3, skill: "APPLICATION", hints: ["The pointer is moved before the item is stored, and the full test comes first."],
    stem: "Complete the pseudocode for the function that pushes an item onto a stack stored in the array `Stack` with the top pointer `TopPointer` and the constant `StackSize`.",
    template: "IF TopPointer {{blank:a}} StackSize THEN\n\nRETURN FALSE\n\nELSE\n\nTopPointer ← TopPointer {{blank:b}} 1\n\nStack[{{blank:c}}] ← Item\n\nRETURN TRUE\n\nENDIF",
    blanks: [
      { id: "a", accepted: ["="], choices: ["=", "<", "<>", "+"] },
      { id: "b", accepted: ["+"], choices: ["+", "-", "*", "DIV"] },
      { id: "c", accepted: ["TopPointer"], choices: ["TopPointer", "StackSize", "Item", "1"] },
    ], explanation: "Test whether the stack is full, add 1 to the pointer, then store the item at TopPointer." });

  // ---- numerical
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Count the pushes that succeed and the pops."],
    stem: "A stack of 4 places is empty. These operations are applied: " + opsText(sOps) + ". State the value of the top pointer at the end.", value: s.top, wrong: [4, 3], workedSolution: "Four pushes give 4. The push of 5 fails because the stack is full. Two pops leave 2.", explanation: "Top = 2." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Pop returns the top item."],
    stem: "A stack of 4 places is empty. These operations are applied: " + opsText(sOps) + ". State the value returned by the first pop.", value: 9, wrong: [5, 7], workedSolution: "The top item is 9, the last item successfully pushed.", explanation: "9." });
  b.num({ d: 4, skill: "APPLICATION", calculator: false, hints: ["Work out Rear after each enqueue, wrapping with MOD(Rear, 4) + 1."],
    stem: "A circular queue of 4 places starts empty with `Front` = 1, `Rear` = 0 and `Count` = 0. These operations are applied: " + opsText(qOps) + ". State the value of `Rear` at the end.", value: q.rows[7].rear, wrong: [4, 5], workedSolution: "Rear reaches 4 after M. N is not stored. After the two dequeues, O is stored at MOD(4, 4) + 1 = 1.", explanation: "Rear = 1." });
  b.num({ d: 4, skill: "APPLICATION", calculator: false, hints: ["The failed enqueue changes nothing.", "Each successful dequeue reduces the count."],
    stem: "A circular queue of 4 places starts empty with `Front` = 1, `Rear` = 0 and `Count` = 0. These operations are applied: " + opsText(qOps) + ". State the value of `Count` at the end.", value: q.rows[7].count, wrong: [4, 2], workedSolution: "Four items were stored, two left, and O was added: 4 − 2 + 1 = 3.", explanation: "Count = 3." });
  b.short({ d: 2, skill: "RECALL", stem: "State the name given to an attempt to push an item onto a stack that is already full.", accepted: ["overflow", "stack overflow"], wrong: ["underflow", "wrap-around"], explanation: "Overflow." });

  // ---- self-marked
  b.manualShort({ d: 5, skill: "CREATION", marks: 5, hints: ["Test for empty first.", "Take the item before moving the pointer."],
    stem: "A stack is stored in the array `Stack` with the pointer `TopPointer`, which is 0 when the stack is empty. Write the function `Pop()` that returns the top item, or -1 if the stack is empty. [5]",
    points: ["Function header with RETURNS INTEGER", "Tests whether TopPointer = 0 (empty) and returns -1", "Copies Stack[TopPointer] into a local variable", "Subtracts 1 from TopPointer", "Returns the item"],
    modelAnswer: codeBlock(`FUNCTION Pop() RETURNS INTEGER
    DECLARE Item : INTEGER
    IF TopPointer = 0 THEN
        RETURN -1
    ELSE
        Item ← Stack[TopPointer]
        TopPointer ← TopPointer - 1
        RETURN Item
    ENDIF
ENDFUNCTION`), explanation: "Empty test, take the item, move the pointer, return." });
  b.manualShort({ d: 4, skill: "CREATION", marks: 5, hints: ["Use the count to test for full.", "Wrap the rear pointer with MOD."],
    stem: "A circular queue of 8 places is stored in the array `Queue` with `RearPointer`, `FrontPointer` and `Count`. Write the function `Enqueue(Item)` that stores the item and returns TRUE, or returns FALSE if the queue is full. [5]",
    points: ["Tests Count = 8 and returns FALSE", "Moves RearPointer on by 1 with wrap-around: MOD(RearPointer, 8) + 1", "Stores Item in Queue[RearPointer]", "Adds 1 to Count", "Returns TRUE"],
    modelAnswer: codeBlock(`FUNCTION Enqueue(Item : STRING) RETURNS BOOLEAN
    IF Count = 8 THEN
        RETURN FALSE
    ELSE
        RearPointer ← MOD(RearPointer, 8) + 1
        Queue[RearPointer] ← Item
        Count ← Count + 1
        RETURN TRUE
    ENDIF
ENDFUNCTION`), explanation: "Full test, wrap, store, count." });
  b.manualShort({ d: 3, skill: "EVALUATION", marks: 3, hints: ["Think about what happens to the places at the front."],
    stem: "Explain the advantage of a circular queue over a linear queue stored in an array. [3]",
    points: ["In a linear queue the places before the front pointer are never used again", "The queue can be reported full while there are free places at the start", "In a circular queue the rear wraps to the first place, so freed places are reused"],
    modelAnswer: "In a linear queue the places before the front pointer are never used again, so the queue can be full while places are free. In a circular queue the rear wraps to the start, so freed places are reused.", explanation: "No wasted places." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Consider the order in which items must leave."],
    stem: "A program stores the documents waiting to be printed. State whether a stack or a queue should be used, and justify your answer. [3]",
    points: ["A queue", "Documents must be printed in the order they were received (first in, first out)", "With a stack the most recent document would be printed first and early documents could wait for ever"],
    modelAnswer: "A queue. Documents must be printed in the order they arrive, first in first out. With a stack the newest document would be printed first and older ones could wait for ever.", explanation: "FIFO is fair." });

  // ---- structured practice
  b.struct({ d: 5, skill: "APPLICATION", examStyle: true, hints: ["The fifth push meets a full stack.", "Pop returns the top item."],
    explanation: "Tracing a stack of four places and writing push.",
    stem: "A stack of 4 places is stored in the array `Stack(1:4)` with `TopPointer` = 0 when the stack is empty. The operations are applied in this order: " + opsText(sOps) + ".",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "State the value of `TopPointer` after the fourth operation.", value: 4, wrong: [3, 0], workedSolution: "Each of the first four pushes adds 1.", explanation: "TopPointer = 4." }),
      pm("(b)", "What happens when the fifth operation (push 5) is applied?", ["The item is not stored as the stack is full", "Correct."], [["The item replaces the 9 at the top of the stack", "A push never replaces an item."], ["The pointer becomes 5 and the item is stored there", "That would be outside the array."], ["The stack is emptied", "Nothing is removed."]], "Overflow is detected by the full test."),
      P.num({ label: "(c)", marks: 1, stem: "State the value returned by the first pop.", value: 9, wrong: [5, 7], workedSolution: "The top item is 9.", explanation: "9." }),
      P.num({ label: "(d)", marks: 1, stem: "State the value returned by the second pop.", value: 3, wrong: [12, 5], workedSolution: "After the first pop the top item is 3.", explanation: "3." }),
      P.num({ label: "(e)", marks: 1, stem: "State the value of `TopPointer` at the end.", value: 2, wrong: [4, 3], workedSolution: "Two pops from 4 leave 2.", explanation: "TopPointer = 2." }),
      P.manual({ label: "(f)", marks: 4, stem: "Write the pseudocode for the function `Push(Item)` that returns TRUE if the item is stored and FALSE if the stack is full.", points: ["Function header with parameter Item and RETURNS BOOLEAN", "Tests whether TopPointer equals 4 (full) and returns FALSE", "Adds 1 to TopPointer and stores Item in Stack[TopPointer]", "Returns TRUE in the other branch"], modelAnswer: codeBlock(`FUNCTION Push(Item : INTEGER) RETURNS BOOLEAN
    IF TopPointer = 4 THEN
        RETURN FALSE
    ELSE
        TopPointer ← TopPointer + 1
        Stack[TopPointer] ← Item
        RETURN TRUE
    ENDIF
ENDFUNCTION`), explanation: "Full test, then pointer and store." }),
    ] });
  b.struct({ d: 4, skill: "APPLICATION", examStyle: true, hints: ["Rear ← MOD(Rear, 4) + 1.", "Front moves on every dequeue."],
    explanation: "Tracing a circular queue with a failed enqueue and a wrap-around.",
    stem: "A circular queue of 4 places holds the names of customers. `FrontPointer` is 1, `RearPointer` is 0 and `Count` is 0 when it is empty. The operations are: " + opsText(qOps) + ".",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "State the value of `RearPointer` after the fourth operation.", value: 4, wrong: [3, 1], workedSolution: "Each enqueue adds 1: 1, 2, 3, 4.", explanation: "RearPointer = 4." }),
      P.num({ label: "(b)", marks: 1, stem: "State the value of `Count` after the fifth operation (enqueue N).", value: 4, wrong: [5, 3], workedSolution: "N is not stored because the queue is full, so Count stays at 4.", explanation: "Count = 4." }),
      P.num({ label: "(c)", marks: 1, stem: "State the value of `RearPointer` after the last operation.", value: 1, wrong: [5, 4], workedSolution: "MOD(4, 4) + 1 = 1.", explanation: "RearPointer = 1." }),
      P.num({ label: "(d)", marks: 1, stem: "State the value of `FrontPointer` after the last operation.", value: 3, wrong: [1, 2], workedSolution: "Two dequeues move the front from 1 to 3.", explanation: "FrontPointer = 3." }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain why the name N is not stored.", points: ["Count equals 4, the size of the array, so the queue is full", "The enqueue function returns FALSE without changing the pointers or the array"], modelAnswer: "The queue is full because `Count` equals 4, the number of places, so the enqueue function returns FALSE and changes nothing.", explanation: "Overflow is detected using the count." }),
    ] });

  // ---- flashcards
  b.card("CONCEPT", "Stack push", "If the stack is full, report overflow; otherwise TopPointer ← TopPointer + 1 and store the item at Stack[TopPointer].");
  b.card("CONCEPT", "Stack pop", "If the stack is empty, report underflow; otherwise take Stack[TopPointer], then TopPointer ← TopPointer - 1.");
  b.card("DEFINITION", "Overflow and underflow", "Overflow: pushing onto a full stack. Underflow: popping from an empty stack.");
  b.card("CONCEPT", "Enqueue", "If Count = QueueSize the queue is full; otherwise RearPointer ← MOD(RearPointer, QueueSize) + 1, store the item, Count ← Count + 1.");
  b.card("CONCEPT", "Dequeue", "If Count = 0 the queue is empty; otherwise take Queue[FrontPointer], FrontPointer ← MOD(FrontPointer, QueueSize) + 1, Count ← Count - 1.");
  b.card("CONCEPT", "Circular queue", "Pointers wrap from the last place to the first, so freed places are reused; a count shows full or empty.");
  b.card("CONCEPT", "Why a count", "In a circular queue the pointers look the same when the queue is full and when it is empty.");
  b.card("FACT", "Pseudocode and Python pointers", "Pseudocode arrays here start at 1, Python lists at 0, so pointer values differ by one.");
  b.card("FACT", "Uses of stacks and queues", "Stack: undo, browser history, call stack, reversing. Queue: print jobs, buffers, waiting lines.");
});
