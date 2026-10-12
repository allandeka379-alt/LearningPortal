// Slice w4a: binary search and insertion sort (acs.algo.binary-search-insertion-sort; binary search both boards, insertion sort Cambridge detail).
import { concept, P, chk, same, mdTable, codeBlock, insertionSort, CAM } from "../lib.mjs";
import { mc, pm } from "../tables/w4a-q.mjs";
import { arrayMd, bsearch1 } from "../tables/w4a-util.mjs";

concept("acs.algo.binary-search-insertion-sort", { file: "algo/binary-search-insertion-sort", keyPrefix: "algo.binary-search-insertion-sort" }, (b) => {
  const acct = [3, 8, 13, 21, 34, 40, 55, 62, 79, 90];
  const acct2 = [6, 17, 24, 29, 35, 48, 57, 63, 74, 92]; const acct3 = [2, 10, 16, 25, 33, 41, 49, 58, 67, 85];
  const t9 = bsearch1(acct3, 10); same(t9.steps.map((s) => s.mid), [5, 2]); const t47 = bsearch1(acct2, 57); same([t47.steps[0].mid, t47.steps[1].low, t47.steps[1].high], [5, 6, 10]);
  const s79 = bsearch1(acct, 79), s50 = bsearch1(acct, 50), s8 = bsearch1(acct, 8), s62 = bsearch1(acct, 62);
  chk(s79.comparisons, 3); chk(s79.steps[0].mid, 5); chk(s50.comparisons, 4); same(s50.found, false);
  same(s8.steps.map((s) => s.mid), [5, 2]); chk(s62.comparisons, 2);
  chk(s79.steps[1].low, 6);
  const worst = (n) => { let c = 0, lo = 1, hi = n; while (lo <= hi) { const m = Math.floor((lo + hi) / 2); c++; lo = m + 1; } return c; };
  chk(worst(255), 8); chk(worst(1023), 10); chk(worst(1024), 11);
  const ins = insertionSort([6, 2, 9, 4, 7]);
  chk(ins.comparisons, 7); chk(ins.shifts, 4); chk(ins.passes[2].state[2], 6);
  same(ins.sorted, [2, 4, 6, 7, 9]);
  chk(insertionSort([1, 2, 3, 4, 5, 6, 7, 8]).comparisons, 7);

  // ---- multiple choice
  mc(b, 2, "RECALL", "What must be true of a list before a binary search can be used on it?",
    ["The items must be in order", "Correct."],
    [["The items must all be different lengths", "Length of items does not matter to the method."], ["The list must contain at least a thousand items", "A binary search works on a list of any size."], ["The list must be stored in a file", "A binary search can be used on an array in memory."]],
    "The method discards half of the list by comparing with the middle item, so the list must be sorted.", { daily: true });
  mc(b, 3, "UNDERSTANDING", "In a binary search of an ascending list, `Data[Mid]` is less than the target. What is done next?",
    ["`Low` is set to `Mid + 1`", "Correct: the target can only be in the upper half."],
    [["`High` is set to `Mid - 1`", "That discards the upper half, where the target must be."], ["`Low` is set to `Mid - 1`", "That would search items already rejected."], ["The search stops and outputs \"Not found\"", "One comparison cannot show that an item is missing."]],
    "A smaller middle value means the target lies above Mid.", { hints: ["In which half can a larger value be?"] });
  mc(b, 3, "UNDERSTANDING", "How does a binary search discover that the target is not in the list?",
    ["`Low` becomes greater than `High`", "Correct: no items remain to be searched."],
    [["`Mid` becomes 0", "Mid is not set to 0 by the algorithm."], ["The first comparison is not equal", "A single comparison cannot prove the item is missing."], ["`Found` becomes TRUE", "That means the item was found."]],
    "When Low > High the part left to search is empty.", { hints: ["What does it mean when the low end passes the high end?"] });
  mc(b, 2, "APPLICATION", "A programmer must search an unsorted list of 20 names once. Which method is more suitable?",
    ["A linear search", "Correct: it works without sorting."],
    [["A binary search, because it is always faster", "It needs a sorted list; sorting 20 names first would cost more than one linear search."], ["A binary search after a bubble sort of the names", "The sort costs more than searching once."], ["No search is possible without sorting", "A linear search works on any order."]],
    "For a short unsorted list used once, a linear search is simplest.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What does an insertion sort do with each item?",
    ["Inserts it into its place among the earlier items, which are already in order", "Correct."],
    [["Swaps it with the item next to it in every pass", "That describes a bubble sort."], ["Splits the list in half and searches the half that may contain it", "That describes a binary search."], ["Compares it with the largest item and moves it to the end", "That describes one pass of a bubble sort."]],
    "Items before the key are kept sorted and the key is slotted in.", { applies: CAM });
  mc(b, 3, "ANALYSIS", "Which starting order gives an insertion sort the least work?",
    ["Data already in ascending order", "Correct: each key needs one comparison and no shift."],
    [["Data in descending order", "Every key is shifted past all earlier items: the worst case."], ["Data in a random order", "The work is between the best and the worst."], ["Data with the smallest item last", "That item is shifted past every other item."]],
    "Sorted data needs n − 1 comparisons and no shifts.", { applies: CAM, hints: ["When is no item ever shifted?"] });
  mc(b, 3, "UNDERSTANDING", "Why is the key copied into a variable at the start of each pass of an insertion sort?",
    ["The first shift would overwrite it", "Correct: its place is taken by the item shifted right."],
    [["It makes the sort stop earlier", "The key does not change how many passes are made."], ["It counts the number of comparisons", "A separate counter would do that."], ["It marks the end of the sorted part", "The index marks that."]],
    "Shifting an item into the key's position loses the key unless it is saved.", { applies: CAM, hints: ["Which array place does the first shifted item move into?"] });
  mc(b, 4, "ANALYSIS", "A list of 1 000 000 sorted items is searched by a binary search. Which is the best estimate of the greatest number of comparisons needed?",
    ["20", "Correct: 2 to the power 20 is just over a million."],
    [["1 000", "That is about the square root of a million."], ["500 000", "That is about half of the items, as in a linear search."], ["1 000 000", "That is the worst case for a linear search."]],
    "Each comparison halves the list: ⌊log₂ 1 000 000⌋ + 1 = 20.", { hints: ["How many times can a million be halved before one is left?"] });

  // ---- true / false, matching, fill in the blank
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "A binary search can be used on a list whose items are in no particular order.", answer: false,
    explanation: "False. The list must be sorted so that half of it can be discarded after each comparison." });
  b.tf({ d: 3, skill: "UNDERSTANDING", hints: ["Which data needs every key to be moved past all earlier items?"], applies: CAM, stem: "An insertion sort does the most work when the data is in reverse order.", answer: true,
    explanation: "True. Each key is smaller than every earlier item, so all of them are shifted: n(n − 1)/2 comparisons and shifts." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term to its meaning.",
    pairs: [["Low", "The position of the first item still being searched"], ["High", "The position of the last item still being searched"], ["Mid", "The position of the item compared with the target"], ["Shift", "Moving an item one place along to make room"], ["Key", "The item being inserted in an insertion sort"]],
    explanation: "Terms from the two algorithms." });
  b.fib({ d: 3, skill: "APPLICATION", hints: ["The first Mid is 5; compare Data[5] with 57."],
    stem: "A binary search looks for 57 in this array of ten values (positions 1 to 10).\n\n" + arrayMd(acct2, { name: "Data" }),
    template: "First value of Mid = {{blank:a}}. After the first comparison, Low = {{blank:b}} and High = {{blank:c}}.",
    blanks: [{ id: "a", accepted: ["5"], input: "number" }, { id: "b", accepted: ["6"], input: "number" }, { id: "c", accepted: ["10"], input: "number" }], wrong: [["1", "1", "1"]],
    explanation: "Mid = DIV(1 + 10, 2) = 5. Data[5] = 35 is less than 57, so Low becomes 6; High stays 10." });

  // ---- numerical
  b.num({ d: 2, skill: "APPLICATION", calculator: false, hints: ["Add Low and High and use whole-number division by 2."],
    stem: "In a binary search, `Low` is 1 and `High` is 10. State the value of `Mid ← DIV(Low + High, 2)`.", value: 5, wrong: [5.5, 6], workedSolution: "(1 + 10) = 11, and DIV(11, 2) = 5.", explanation: "Mid = 5." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Mid is 5 first, then work with the half that remains."],
    stem: "The array below holds ten values in ascending order.\n\n" + arrayMd(acct3, { name: "Data" }) + "\n\nHow many comparisons does a binary search make to find 10?",
    value: t9.comparisons, wrong: [1, 3], workedSolution: "Mid = 5 (value 33, too large) so High = 4; Mid = DIV(1 + 4, 2) = 2 (value 10): found.", explanation: "2 comparisons." });
  b.num({ d: 4, skill: "APPLICATION", calculator: false, hints: ["Halve the number of items remaining: 255, 127, 63, ..."],
    stem: "State the greatest number of comparisons a binary search needs for a sorted list of 255 items.", value: worst(255), wrong: [7, 255], workedSolution: "Each comparison leaves at most half the items: 255, 127, 63, 31, 15, 7, 3, 1, so 8 comparisons.", explanation: "8 comparisons." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, applies: CAM, hints: ["Count the items shifted right in each pass."],
    stem: "An insertion sort is applied to `Data` = 6, 2, 9, 4, 7. State the total number of shifts made.", value: ins.shifts, wrong: [3, 7], workedSolution: "Pass 1 shifts 1 (the 6), pass 2 none, pass 3 shifts 2 (9 and 6), pass 4 shifts 1 (9).", explanation: "4 shifts." });
  // ---- self-marked
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Use the idea of halving."],
    stem: "Describe how a binary search finds a target in a sorted array. [3]",
    points: ["Finds the middle item and compares it with the target", "If it is not equal, discards the half that cannot contain the target (lower half if the target is smaller, upper half if larger)", "Repeats on the remaining half until the item is found or no items remain"],
    modelAnswer: "Compare the target with the middle item. If they are not equal, discard the half that cannot contain the target, then repeat on the remaining half until the item is found or no items are left.", explanation: "Compare, discard half, repeat." });
  b.manualShort({ d: 3, skill: "EVALUATION", marks: 3, hints: ["Think about sorting cost and the number of searches."],
    stem: "A school keeps 5 000 student numbers in ascending order. Explain why a binary search is more suitable than a linear search for finding a number. [3]",
    points: ["The list is already sorted so a binary search can be used", "A binary search needs at most about 13 comparisons, whereas a linear search may need 5 000", "The saving is large when many searches are made"],
    modelAnswer: "The list is sorted, so a binary search can be used. It needs at most about 13 comparisons for 5 000 items, whereas a linear search may need 5 000, which matters when many searches are made.", explanation: "Sorted data and many fewer comparisons." });
  b.manualShort({ d: 4, skill: "CREATION", marks: 4, applies: CAM, hints: ["Save the key, shift while larger, then insert."],
    stem: "Write pseudocode for the inner part of an insertion sort that inserts `Data[Index]` into the items `Data[1]` to `Data[Index - 1]`, which are already in ascending order. [4]",
    points: ["Copies Data[Index] into Key and sets Position to Index - 1", "A WHILE loop that continues while Position >= 1 AND Data[Position] > Key", "Shifts Data[Position] to Data[Position + 1] and reduces Position by 1 inside the loop", "Writes Key into Data[Position + 1] after the loop"],
    modelAnswer: codeBlock(`Key ← Data[Index]
Position ← Index - 1
WHILE Position >= 1 AND Data[Position] > Key DO
    Data[Position + 1] ← Data[Position]
    Position ← Position - 1
ENDWHILE
Data[Position + 1] ← Key`), explanation: "Save, shift, insert." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 3, applies: CAM, hints: ["Compare how each sort treats data that is nearly in order."],
    stem: "A list is almost in order, with just two items out of place. Explain why an insertion sort is a better choice than the simple bubble sort without a flag. [3]",
    points: ["An insertion sort needs only one comparison for each item that is already in place", "Only the two misplaced items are shifted", "The simple bubble sort always makes every pass and every comparison, however well ordered the data is"],
    modelAnswer: "Items already in place need only one comparison each and only the two misplaced items are shifted. The simple bubble sort always makes the full set of passes and comparisons.", explanation: "Insertion sort is quick on nearly sorted data." });

  // ---- structured practice
  b.struct({ d: 5, skill: "APPLICATION", examStyle: true, hints: ["Mid ← DIV(Low + High, 2).", "A smaller middle value means Low ← Mid + 1."],
    explanation: "Binary search on ten sorted account numbers.",
    stem: "A Harare bank keeps ten account numbers in ascending order in the array `Account`.\n\n" + arrayMd(acct, { name: "Account" }) + "\n\nA binary search uses `Low`, `High` and `Mid ← DIV(Low + High, 2)`. It is used to look for 79 and, separately, for 50.",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "State the first value of `Mid` when searching for 79.", value: 5, wrong: [10, 6], workedSolution: "DIV(1 + 10, 2) = 5.", explanation: "Mid = 5." }),
      P.num({ label: "(b)", marks: 1, stem: "State the value of `Low` after the first comparison when searching for 79.", value: 6, wrong: [5, 1], workedSolution: "Account[5] = 34 is less than 79, so Low ← Mid + 1 = 6.", explanation: "Low = 6." }),
      P.num({ label: "(c)", marks: 1, stem: "State the number of comparisons needed to find 79.", value: s79.comparisons, wrong: [2, 9], workedSolution: "Mid is 5 (34), then 8 (62), then 9 (79).", explanation: "3 comparisons." }),
      P.num({ label: "(d)", marks: 1, stem: "50 is not in the array. State the number of comparisons made before the algorithm decides this.", value: s50.comparisons, wrong: [3, 10], workedSolution: "Mid is 5 (34), 8 (62), 6 (40), 7 (55); then Low = 7 and High = 6, so the loop ends.", explanation: "4 comparisons." }),
      pm("(e)", "Which condition makes the loop end when the target is not in the array?", ["`Low > High`", "Correct."], [["`Mid = 0`", "Mid is never set to 0."], ["`Account[Mid] > Target`", "That decides which half to discard."], ["`High = 10`", "High starts at 10."]], "When Low exceeds High there are no items left to search."),
      P.manual({ label: "(f)", marks: 3, stem: "Explain why a binary search is faster than a linear search when the bank has 10 000 account numbers in order.", points: ["A binary search halves the number of items left after every comparison", "So it needs at most about 14 comparisons for 10 000 items", "A linear search may have to compare with all 10 000 items"], modelAnswer: "Each comparison halves the number of items left, so at most about 14 comparisons are needed for 10 000 items, whereas a linear search may need to examine all 10 000.", explanation: "Halving against one by one." }),
    ] });
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, applies: CAM, hints: ["Write the array after each pass.", "Count the items moved right in each pass."],
    explanation: "An insertion sort of five values.",
    stem: "The array `Data` holds 6, 2, 9, 4, 7 and is sorted into ascending order by an insertion sort. The first item is treated as a sorted list of one, and the passes start with the second item.",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "State the value of `Data[3]` after the third pass.", value: 6, wrong: [9, 4], workedSolution: "After pass 3 the array is " + ins.passes[2].state.join(", ") + ".", explanation: "Data[3] = 6." }),
      P.num({ label: "(b)", marks: 1, stem: "State the total number of shifts made.", value: ins.shifts, wrong: [3, 7], workedSolution: "1 + 0 + 2 + 1 = 4.", explanation: "4 shifts." }),
      P.num({ label: "(c)", marks: 1, stem: "State the total number of comparisons of `Data[Position]` with `Key`.", value: ins.comparisons, wrong: [4, 10], workedSolution: "1 + 1 + 3 + 2 = 7.", explanation: "7 comparisons." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why the value of `Data[Index]` is first copied into the variable `Key`.", points: ["The first shift writes over the position that Data[Index] occupies", "So the value would be lost unless it is saved, to be written into the gap at the end"], modelAnswer: "The first shift overwrites the position of `Data[Index]`, so its value is saved in `Key` and written into the gap after the shifts.", explanation: "Avoid losing the key." }),
      pm("(e)", "Which list of 5 values would be sorted with the fewest comparisons?", ["2, 4, 6, 7, 9", "Correct: it needs one comparison per item."], [["9, 7, 6, 4, 2", "Reverse order is the worst case."], ["6, 2, 9, 4, 7", "This needs more comparisons than a sorted list."], ["7, 9, 2, 6, 4", "A random order needs more than a sorted list."]], "Sorted data is the best case."),
    ] });

  // ---- flashcards
  b.card("DEFINITION", "Binary search", "Compares the target with the middle item of a sorted list and discards the half that cannot contain it; repeats until found or Low > High.");
  b.card("FORMULA", "Middle position", "Mid ← DIV(Low + High, 2). If Data[Mid] < Target then Low ← Mid + 1, else High ← Mid - 1.");
  b.card("CONCEPT", "Binary search condition", "The list must be sorted; the loop ends when the item is found or Low > High (not found).");
  b.card("FACT", "Binary search worst case", "⌊log₂ n⌋ + 1 comparisons: 4 for 12 items, 10 for 1 000, 20 for 1 000 000.");
  b.card("DEFINITION", "Insertion sort", "Takes each item in turn and inserts it into its place among the earlier, sorted items by shifting larger items right.", undefined, { applies: CAM });
  b.card("CONCEPT", "Key in insertion sort", "The item being inserted is saved in Key because the first shift overwrites its place.", undefined, { applies: CAM });
  b.card("FACT", "Insertion sort best and worst case", "Best: already sorted, n − 1 comparisons, no shifts. Worst: reverse order, n(n − 1)/2 comparisons and shifts.", undefined, { applies: CAM });
  b.card("CONCEPT", "Choosing a search", "Linear: unsorted, short or one-off. Binary: sorted, long or searched many times, with direct access to items.");
  b.card("CONCEPT", "Not found in a binary search", "Low becomes greater than High, so no items remain; Found is still FALSE.");
});
