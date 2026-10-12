// W4a exam-format items: four THEORY10 and three THEORY5 (Paper 1 / Paper 3 style) on algorithms and data structures.
import { concept, P, EXAM, checkExam, CAM, chk, same, mdTable, codeBlock, bubbleSort, linearSearch, binarySearch, bstFrom, inorder, preorder, postorder, bstHeight } from "../lib.mjs";
import { pm } from "../tables/w4a-q.mjs";
import { arrayMd } from "../tables/w4a-util.mjs";
import { queueRun, makeList, listMd, listOrder, listInsert, listDelete } from "../tables/w4a-adt.mjs";

const TH10 = { skill: EXAM.THEORY10.skill, secs: EXAM.THEORY10.secs, examStyle: true };
const TH5 = { skill: EXAM.THEORY5.skill, secs: EXAM.THEORY5.secs, examStyle: true };
const C = (k) => `acs.${k}`;

concept(C("algo.trace-tables"), { file: "exam/w4a-theory", keyPrefix: "exam.w4a-theory" }, (b) => {
  // ------------------------------------------------------------------ 1. Trace table and errors (both boards)
  {
    const temp = [24, 31, 19, 28, 35, 22];
    const total = temp.reduce((a, c) => a + c, 0), mean = total / 6;
    const hot = temp.filter((t) => t > mean).length;
    chk(total, 159); chk(mean, 26.5); chk(hot, 3);
    chk(temp.slice(0, 3).reduce((a, c) => a + c, 0), 74);
    const hot4 = temp.slice(0, 4).filter((t) => t > mean).length; chk(hot4, 2);
    const bad = temp[5] / 6; chk(Math.round(bad * 100) / 100, 3.67);
    const code = `Total ← 0
Hot ← 0
FOR Day ← 1 TO 6
    Total ← Total + Temp[Day]
NEXT Day
Mean ← Total / 6
FOR Day ← 1 TO 6
    IF Temp[Day] > Mean THEN
        Hot ← Hot + 1
    ENDIF
NEXT Day
OUTPUT Mean, Hot`;
    b.struct({
      ...TH10, d: 3, paper: "ZIMSEC P1 / Cambridge P1",
      concepts: [C("algo.trace-tables"), C("algo.algorithm-design")],
      stem: "A weather station in Kariba stores the highest temperature (in °C) of six days in the array `Temp`, indexes 1 to 6.\n\n" + arrayMd(temp, { name: "Temp" }) + "\n\nThe algorithm below processes the array.\n\n" + codeBlock(code),
      parts: checkExam(EXAM.THEORY10, [
        P.num({ label: "(a)", marks: 1, stem: "State the value of `Total` after the pass of the first loop with `Day` = 3.", value: 74, wrong: [59, 24], workedSolution: "24 + 31 + 19 = 74.", explanation: "Total = 74." }),
        P.num({ label: "(b)", marks: 1, type: "CALCULATION", stem: "State the value of `Mean` that is output.", value: mean, answer: "26.5", tol: 0.001, wrong: [159, 27], workedSolution: "Total = 159, and 159 ÷ 6 = 26.5.", explanation: "Mean = 26.5." }),
        P.num({ label: "(c)", marks: 1, stem: "State the value of `Hot` that is output.", value: hot, wrong: [2, 4], workedSolution: "31, 28 and 35 are greater than 26.5.", explanation: "Hot = 3." }),
        pm("(d)", "Which data type is most suitable for the variable `Mean`?", ["REAL", "Correct: the mean can have a fractional part."], [["INTEGER", "An integer would lose the fractional part."], ["STRING", "A string cannot be used in arithmetic."], ["BOOLEAN", "A Boolean holds only TRUE or FALSE."]], "The mean 26.5 is not a whole number."),
        P.num({ label: "(e)", marks: 1, stem: "The second loop is changed to `FOR Day ← 1 TO 4`. State the value of `Hot` that is now output.", value: hot4, wrong: [3, 4], workedSolution: "Only 24, 31, 19 and 28 are tested; 31 and 28 are greater than 26.5.", explanation: "Hot = 2." }),
        P.manual({ label: "(f)", marks: 2, stem: "State the purpose of the algorithm.", points: ["It calculates (and outputs) the mean temperature", "It counts (and outputs) the number of days on which the temperature is above the mean"], modelAnswer: "It outputs the mean of the six temperatures and the number of days hotter than the mean.", explanation: "Mean and count above the mean." }),
        P.manual({ label: "(g)", marks: 3, stem: "The statement `Total ← 0` is moved inside the first loop, as the first statement of the loop body. State the value of `Mean` now output, and explain your answer.", points: ["Total is reset to 0 on every pass of the loop", "So at the end Total holds only the last temperature, 22", "Mean = 22 ÷ 6 = 3.67 (about 3.7)"], modelAnswer: "`Total` is reset to 0 on every pass, so at the end it holds only the last temperature, 22. The mean output is 22 ÷ 6 = 3.67.", explanation: "A total must be set to zero before the loop." }),
      ]),
      hints: ["Add the temperatures one at a time for the first loop.", "Compare each temperature with the mean in the second loop."],
      explanation: "Total 159, mean 26.5, three days above the mean; the algorithm outputs the mean and the count of days above it.",
    });
  }

  // ------------------------------------------------------------------ 2. Sorting and searching with counted comparisons (both)
  {
    const sc = [46, 13, 31, 7, 39, 11, 26];
    const bs = bubbleSort(sc);
    chk(bs.passes[0].swaps, 6); chk(bs.passes[0].state[6], 46); chk(bs.passes.length, 5); chk(bs.comparisons, 20);
    chk(linearSearch(sc, 39).comparisons, 5);
    const sorted = [...sc].sort((x, y) => x - y);
    chk(binarySearch(sorted, 39).comparisons, 2);
    b.struct({
      ...TH10, d: 4, paper: "ZIMSEC P1 / Cambridge P3",
      concepts: [C("algo.linear-search-bubble-sort"), C("algo.binary-search-insertion-sort")],
      stem: "A school in Chinhoyi stores the scores of seven learners in the array `Score`.\n\n" + arrayMd(sc, { name: "Score" }) + "\n\nThe scores are sorted into ascending order using a bubble sort that stops after a pass in which no swap is made. In each pass, only the items not yet in their final place are compared. Afterwards, the sorted array is searched using a binary search, where `Mid` is the whole-number part of (Low + High) ÷ 2.",
      parts: checkExam(EXAM.THEORY10, [
        P.num({ label: "(a)", marks: 1, stem: "State the number of swaps made in the first pass.", value: 6, wrong: [3, 7], workedSolution: "Pass 1: " + bs.passes[0].state.join(", ") + " (six of the six comparisons cause a swap).", explanation: "6 swaps." }),
        P.num({ label: "(b)", marks: 1, stem: "State the value in `Score[7]` after the first pass.", value: 46, wrong: [26, 7], workedSolution: "The largest value, 46, is carried to the end in the first pass.", explanation: "46." }),
        P.num({ label: "(c)", marks: 1, stem: "State the total number of passes made, including the last pass in which no swap occurs.", value: bs.passes.length, wrong: [4, 6], workedSolution: "Passes: " + bs.passes.map((p) => p.state.join(" ")).join("; ") + ". The fifth pass has no swaps.", explanation: "5 passes." }),
        P.num({ label: "(d)", marks: 1, stem: "State the total number of comparisons made by the sort.", value: bs.comparisons, wrong: [21, 15], workedSolution: "6 + 5 + 4 + 3 + 2 = 20.", explanation: "20 comparisons." }),
        P.num({ label: "(e)", marks: 1, stem: "A linear search for the score 39 is made in the original, unsorted array. State the number of comparisons.", value: 5, wrong: [4, 7], workedSolution: "39 is the fifth item.", explanation: "5 comparisons." }),
        P.num({ label: "(f)", marks: 1, stem: "A binary search for the score 39 is made in the sorted array. State the number of comparisons.", value: 2, wrong: [1, 4], workedSolution: "The sorted array is 7, 11, 13, 26, 31, 39, 46. Mid = 4 (26), then Low = 5, Mid = 6 (39).", explanation: "2 comparisons." }),
        P.manual({ label: "(g)", marks: 2, stem: "Explain why a binary search could not be used on the original array.", points: ["A binary search needs the items to be in order", "In the original array discarding half of the items could discard the one being searched for"], modelAnswer: "A binary search only works if the items are in order. In the unsorted array, discarding half of the items after one comparison could throw away the item being searched for.", explanation: "Order is essential." }),
        P.manual({ label: "(h)", marks: 2, stem: "Give one situation in which a linear search is a better choice than sorting the array and then using a binary search.", points: ["The data is searched only once (or only a few times)", "Because sorting costs more than the saving, or the list is short"], modelAnswer: "When the array is searched only once or is short, because sorting it first takes more work than the search saves.", explanation: "Sorting has a cost." }),
      ]),
      hints: ["Write the array after each pass of the bubble sort.", "For the binary search, work out Mid for each pass."],
      explanation: "Bubble sort: 6 swaps in pass 1, 5 passes, 20 comparisons; linear search 5; binary search 2.",
    });
  }

  // ------------------------------------------------------------------ 3. Stacks, queues and linked lists (Cambridge)
  {
    const q = queueRun(5, [["enqueue", "P1"], ["enqueue", "P2"], ["enqueue", "P3"], ["enqueue", "P4"], ["dequeue"], ["dequeue"], ["enqueue", "P5"], ["enqueue", "P6"], ["enqueue", "P7"], ["enqueue", "P8"]]);
    chk(q.rows[7].rear, 1); chk(q.front, 3); chk(q.count, 5); if (q.rows[9].note !== "queue full: not stored") throw new Error("P8 should fail");
    let L = makeList(Array(5).fill(""), [2, 3, 4, 5, 0], 0, 1);
    for (const n of ["Kudzi", "Sipho", "Anesu", "Blessing"]) L = listInsert(L, n).list;
    same(listOrder(L), ["Anesu", "Blessing", "Kudzi", "Sipho"]); chk(L.start, 3); chk(L.free, 5);
    const del = listDelete(L, "Anesu"); chk(del.list.start, 4); chk(del.list.free, 3);
    b.struct({
      ...TH10, d: 4, paper: "Cambridge Paper 3", applies: CAM,
      concepts: [C("ds.adt-introduction"), C("ds.stack-queue-algorithms"), C("ds.linked-list-algorithms")],
      stem: "**Queue.** A clinic in Masvingo uses a circular queue with 5 places, numbered 1 to 5, to store the codes of waiting patients. `FrontPointer` is 1, `RearPointer` is 0 and `Count` is 0 when the queue is empty. The operations are, in order: enqueue P1, enqueue P2, enqueue P3, enqueue P4, dequeue, dequeue, enqueue P5, enqueue P6, enqueue P7, enqueue P8.\n\n**Linked list.** The clinic also keeps the names of its staff in alphabetical order in a linked list stored in arrays. A pointer of 0 is null.\n\n" + listMd(L) + "\n\nThe name Anesu is deleted from the list.",
      parts: checkExam(EXAM.THEORY10, [
        P.num({ label: "(a)", marks: 1, stem: "State the value of `RearPointer` after P6 is enqueued.", value: 1, wrong: [6, 5], workedSolution: "After P5, Rear = 5; for P6, MOD(5, 5) + 1 = 1.", explanation: "RearPointer = 1." }),
        P.num({ label: "(b)", marks: 1, stem: "State the value of `FrontPointer` after all the operations.", value: 3, wrong: [1, 5], workedSolution: "Two dequeues move the front from 1 to 3.", explanation: "FrontPointer = 3." }),
        P.num({ label: "(c)", marks: 1, stem: "State the value of `Count` after all the operations.", value: 5, wrong: [4, 8], workedSolution: "Seven items were stored, two left, and P8 was not stored: 4 + 3 - 2 = 5.", explanation: "Count = 5." }),
        pm("(d)", "Why is P8 not stored?", ["The queue is full", "Correct: Count equals the number of places."], [["The queue is empty", "Five items are in the queue."], ["P8 is not a valid code", "The code is not the problem."], ["The front pointer is at place 1", "The front pointer is at place 3."]], "Count = 5 shows that all the places are used."),
        P.num({ label: "(e)", marks: 1, stem: "State the value of `StartPointer` after Anesu is deleted.", value: 4, wrong: [3, 1], workedSolution: "Anesu is node 3, and its Next is 4 (Blessing), so the start pointer becomes 4.", explanation: "StartPointer = 4." }),
        P.num({ label: "(f)", marks: 1, stem: "State the value of `FreePointer` after Anesu is deleted.", value: 3, wrong: [5, 4], workedSolution: "The deleted node, 3, becomes the first free node.", explanation: "FreePointer = 3." }),
        P.manual({ label: "(g)", marks: 2, stem: "Explain why a circular queue is better than a linear queue in an array.", points: ["In a circular queue the rear pointer wraps to the first place after the last", "So places freed at the front can be reused and the queue is not reported full while places are free"], modelAnswer: "The rear pointer wraps round to place 1 after the last place, so places freed at the front are reused and the queue is not full while there are free places.", explanation: "Places are reused." }),
        P.manual({ label: "(h)", marks: 2, stem: "Give two reasons why a linked list is a suitable structure for the staff names.", points: ["Names are added and removed from the middle by changing pointers only, so no names are moved", "The list is kept in alphabetical order through the pointers"], modelAnswer: "Names can be added or removed by changing pointers only, so no names have to be moved, and the pointers keep the names in alphabetical order.", explanation: "Pointer changes only." }),
      ]),
      hints: ["Update Front, Rear and Count after each operation.", "Follow the Next pointers from Start."],
      explanation: "Rear wraps to 1; Front is 3; Count is 5 and P8 fails; Start becomes 4 and Free 3 after the deletion.",
    });
  }

  // ------------------------------------------------------------------ 4. Recursion and binary trees (both)
  {
    const seq = (n) => (n <= 2 ? 1 : seq(n - 1) + seq(n - 2));
    const calls = (n) => (n <= 2 ? 1 : 1 + calls(n - 1) + calls(n - 2));
    chk(seq(5), 5); chk(calls(4), 5);
    const keys = [55, 30, 70, 20, 45, 65];
    const t = bstFrom(keys);
    same(inorder(t), [20, 30, 45, 55, 65, 70]); same(postorder(t), [20, 45, 30, 65, 70, 55]); chk(t.key, 55);
    b.struct({
      ...TH10, d: 4, paper: "ZIMSEC P1 / Cambridge P3",
      concepts: [C("algo.recursion"), C("ds.binary-tree-algorithms")],
      stem: "**Recursion.** The function below is called with `Sequence(4)`.\n\n" + codeBlock(`FUNCTION Sequence(N : INTEGER) RETURNS INTEGER
    IF N <= 2 THEN
        RETURN 1
    ELSE
        RETURN Sequence(N - 1) + Sequence(N - 2)
    ENDIF
ENDFUNCTION`) + "\n**Binary tree.** The marks 55, 30, 70, 20, 45 and 65 are inserted, in that order, into an empty binary search tree.",
      parts: checkExam(EXAM.THEORY10, [
        P.num({ label: "(a)", marks: 1, stem: "State the value returned by `Sequence(5)`.", value: 5, wrong: [8, 3], workedSolution: "Sequence(1) = 1, (2) = 1, (3) = 2, (4) = 3, (5) = 5.", explanation: "5." }),
        P.num({ label: "(b)", marks: 1, stem: "State the number of calls of `Sequence` (including the first) made by `Sequence(4)`.", value: 5, wrong: [3, 7], workedSolution: "Sequence(4) calls Sequence(3) and Sequence(2); Sequence(3) calls Sequence(2) and Sequence(1): 5 calls.", explanation: "5 calls." }),
        pm("(c)", "Which condition is the base case of the function?", ["`N <= 2`", "Correct."], [["`N = 5`", "N = 5 is not tested."], ["`Sequence(N - 1)`", "That is a recursive call."], ["`N - 2`", "That is an argument of a call."]], "The recursion stops when N is 1 or 2."),
        P.manual({ label: "(d)", marks: 2, stem: "Explain why a recursive function uses more memory than a loop for the same task.", points: ["Each call places a stack frame (return address, parameters, local variables) on the call stack", "All the frames stay on the stack until the base case is reached and the calls return"], modelAnswer: "Each call places a stack frame holding its return address, parameters and local variables on the call stack, and all the frames stay there until the base case is reached.", explanation: "Memory grows with the depth of the calls." }),
        P.num({ label: "(e)", marks: 1, stem: "State the key at the root of the tree.", value: 55, wrong: [20, 70], workedSolution: "The first key inserted is the root.", explanation: "55." }),
        P.fib({ label: "(f)", marks: 3, stem: "State the first three keys output by a post-order traversal.", template: "{{blank:a}}, {{blank:b}}, {{blank:c}}", blanks: postorder(t).slice(0, 3).map((v, i) => ({ id: "abc"[i], accepted: [String(v)], input: "number" })), wrong: [["55", "30", "20"]], explanation: "Post-order visits left, right, node: 20, 45, 30, 65, 70, 55." }),
        pm("(g)", "Which traversal outputs the keys in ascending order?", ["In-order", "Correct: left sub-tree, node, right sub-tree."], [["Pre-order", "Pre-order visits the node first."], ["Post-order", "Post-order visits the node last."], ["Breadth-first", "That visits level by level, not in key order."]], "In-order gives sorted keys for a binary search tree."),
      ]),
      hints: ["Work out the values of Sequence from the base case upwards.", "For post-order: left, right, then the node."],
      explanation: "Sequence(5) = 5; Sequence(4) makes 5 calls; the root is 55 and post-order begins 20, 45, 30.",
    });
  }

  // ------------------------------------------------------------------ 5. Data types and records (both) - THEORY5
  b.struct({
    ...TH5, d: 2, paper: "ZIMSEC P1 / Cambridge P1",
    concepts: [C("ds.data-types-records")],
    stem: "A clinic in Gweru stores for each appointment the patient's name, telephone number, the fee charged (such as 12.50) and whether the patient attended. The data of each appointment is held in a record.",
    parts: checkExam(EXAM.THEORY5, [
      pm("(a)", "Which is the most suitable data type for the telephone number?", ["STRING", "Correct: it keeps the leading zero."], [["INTEGER", "The leading zero would be lost."], ["REAL", "A telephone number has no fractional part."], ["BOOLEAN", "A Boolean holds only TRUE or FALSE."]], "A telephone number is not used for arithmetic."),
      P.fib({ label: "(b)", marks: 2, stem: "State a suitable data type for each of these fields.", template: "Fee: {{blank:a}}\n\nAttended: {{blank:b}}", blanks: [{ id: "a", accepted: ["REAL"], choices: ["INTEGER", "REAL", "STRING", "BOOLEAN"] }, { id: "b", accepted: ["BOOLEAN"], choices: ["INTEGER", "REAL", "STRING", "BOOLEAN"] }], wrong: [["INTEGER", "STRING"]], explanation: "A fee has cents, and attended is yes or no." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain one benefit of storing the appointments as an array of records rather than as a separate array for each field.", points: ["All the fields of one appointment are kept together", "So they stay linked, for example when the appointments are sorted or passed to a subroutine"], modelAnswer: "The fields of one appointment are kept together, so they stay linked when the data is sorted or passed to a subroutine.", explanation: "Grouping keeps the data consistent." }),
    ]),
    hints: ["Think about whether each field is text, a number with cents or yes/no."],
    explanation: "Telephone number: STRING; fee: REAL; attended: BOOLEAN; a record keeps related fields together.",
  });

  // ------------------------------------------------------------------ 6. Arrays and text files (both) - THEORY5
  {
    const lines = [14, 0, 22, 9]; const tot = lines.reduce((a, c) => a + c, 0); chk(tot, 45);
    b.struct({
      ...TH5, d: 3, paper: "ZIMSEC P1 / Cambridge P1",
      concepts: [C("ds.text-files"), C("ds.arrays")],
      stem: "The text file `rain.txt` holds the rainfall in mm for four days, one number on each line: 14, 0, 22 and 9. The pseudocode below reads the file.\n\n" + codeBlock(`Total ← 0
OPENFILE "rain.txt" FOR READ
WHILE NOT EOF("rain.txt") DO
    READFILE "rain.txt", Line
    Total ← Total + STR_TO_NUM(Line)
ENDWHILE
CLOSEFILE "rain.txt"
OUTPUT Total`),
      parts: checkExam(EXAM.THEORY5, [
        P.num({ label: "(a)", marks: 1, stem: "State the value output.", value: tot, wrong: [4, 36], workedSolution: "14 + 0 + 22 + 9 = 45.", explanation: "45." }),
        pm("(b)", "Why is `STR_TO_NUM` used on `Line`?", ["Each line read is a string and must become a number", "Correct."], [["To make the file load faster than before", "The conversion does not change the file speed."], ["To remove the end of the file marker", "EOF is tested by the loop."], ["To store the number back in the file again", "Nothing is written to the file."]], "Strings cannot be added to a number."),
        pm("(c)", "Which statement stops the program from reading past the end of the file?", ["`WHILE NOT EOF(\"rain.txt\") DO`", "Correct."], [["`OPENFILE \"rain.txt\" FOR READ`", "That only opens the file."], ["`CLOSEFILE \"rain.txt\"`", "That is done after the loop."], ["`Total ← 0`", "That initialises the total."]], "The loop ends when the end of the file is reached."),
        P.manual({ label: "(d)", marks: 2, stem: "Give two reasons why a program stores data in a file rather than only in an array.", points: ["The data is kept after the program ends or the power is switched off", "The data can be used again later or by another program"], modelAnswer: "The data is kept after the program ends or the power is off, and it can be used again later or by another program.", explanation: "Persistence and sharing." }),
      ]),
      hints: ["Add the four numbers read from the file."],
      explanation: "The total is 45; each line is a string and is converted; the loop tests EOF; files keep data permanently.",
    });
  }

  // ------------------------------------------------------------------ 7. Big O (Cambridge) - THEORY5
  {
    chk(12 * 12, 144);
    b.struct({
      ...TH5, d: 3, paper: "Cambridge Paper 3", applies: CAM, calculator: false,
      concepts: [C("algo.complexity-big-o")],
      stem: "An algorithm compares every item of a list of n names with every other item, using a loop inside a loop. Each loop runs n times.",
      parts: checkExam(EXAM.THEORY5, [
        pm("(a)", "Which is the time complexity of the algorithm?", ["O(n²)", "Correct: n × n comparisons."], [["O(n)", "That would be one loop."], ["O(log n)", "No halving takes place."], ["O(1)", "The work grows with n."]], "Nested loops multiply."),
        P.num({ label: "(b)", marks: 1, stem: "State the number of comparisons made when n is 12.", value: 144, wrong: [24, 12], workedSolution: "12 × 12 = 144.", explanation: "144." }),
        pm("(c)", "A second algorithm for the same task is O(n log n). Which statement about the two algorithms is correct for a large value of n?", ["The O(n log n) algorithm takes fewer steps", "Correct: n log n grows more slowly than n²."], [["The O(n²) algorithm takes fewer steps", "n² grows faster than n log n."], ["Both take the same number of steps", "Their growth is different."], ["The number of steps cannot be compared", "Big O is used to compare growth."]], "For large n, n log n is far smaller than n²."),
        P.manual({ label: "(d)", marks: 2, stem: "Explain why an algorithm that takes 3n + 2 steps is described as O(n).", points: ["Big O keeps only the fastest-growing term", "The constant factor (3) and the constant 2 are ignored because they do not change the way the work grows with n"], modelAnswer: "Big O keeps only the fastest-growing term and ignores constants, so 3n + 2 becomes O(n): the work still grows in proportion to n.", explanation: "Constants are dropped." }),
      ]),
      hints: ["Multiply the number of passes of the two loops."],
      explanation: "Nested loops give O(n²); 12 × 12 = 144; O(n log n) is better for large n; constants are ignored in Big O.",
    });
  }
});
