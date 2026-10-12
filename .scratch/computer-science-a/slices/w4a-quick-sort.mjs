// Slice w4a: quick sort (acs.algo.quick-sort, ZIMSEC only).
import { concept, P, chk, same, mdTable, codeBlock, quickSort, bubbleSort, ZIM } from "../lib.mjs";
import { mc, pm } from "../tables/w4a-q.mjs";

concept("acs.algo.quick-sort", { file: "algo/quick-sort", keyPrefix: "algo.quick-sort", applies: ZIM }, (b) => {
  const a1 = [26, 9, 40, 17, 33, 21];
  const q1 = quickSort(a1);
  same(q1.steps[0].result, [9, 17, 21, 26, 33, 40]); chk(q1.steps[0].pivotIndex + 1, 3); chk(q1.comparisons, 9); chk(q1.steps.length, 4);
  const a2 = [14, 6, 22, 9, 18, 3, 11];
  const q2 = quickSort(a2);
  same(q2.steps[0].result, [6, 9, 3, 11, 18, 22, 14]); chk(q2.steps[0].pivotIndex + 1, 4); chk(q2.comparisons, 12); chk(q2.steps.length, 5);
  const a3 = [2, 4, 6, 8, 10, 12];
  const q3 = quickSort(a3); chk(q3.comparisons, 15); chk(q3.steps.length, 5);
  chk(bubbleSort(a3).comparisons, 5);
  const a4 = [8, 3, 5, 1]; const q4 = quickSort(a4); same(q4.steps[0].result, [1, 3, 5, 8]); chk(q4.steps.length, 3);

  // ---- multiple choice
  mc(b, 2, "RECALL", "What is the idea of divide and conquer?",
    ["Split a problem into smaller ones of the same kind", "Correct."],
    [["Solve the whole problem in one long sequence of steps without splitting it", "That has no splitting."], ["Repeat the same step until a condition becomes true", "That is simple iteration."], ["Store each part of the problem in a separate file", "Files are not part of the idea."]],
    "Quick sort divides the list around a pivot and sorts each part.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What is true of the pivot after a partition has been completed?",
    ["It is in its final sorted position", "Correct."],
    [["It is moved to the first place in the sub-list", "It is placed after the smaller items, not necessarily first."], ["It is swapped with the largest item", "No such swap is made."], ["It has to be sorted again in the next step", "It is never moved again."]],
    "Smaller items are before it and the others after it.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "When does the recursion in a quick sort stop for a sub-list?",
    ["When it has fewer than two items", "Correct: it is already sorted."],
    [["When the pivot is the largest item", "A sub-list with a large pivot still has to be handled."], ["When the sub-list has exactly five items", "The size five has no special meaning."], ["When all items in the sub-list are equal", "Equal items still go through the algorithm; the test is on the length."]],
    "A list of 0 or 1 items needs no sorting.");
  mc(b, 3, "ANALYSIS", "A quick sort always uses the last item as the pivot. Which data gives the slowest sort?",
    ["Data that is already in order", "Correct: the pivot is always the largest item."],
    [["Data in a random order", "A random order usually splits the list reasonably evenly."], ["Data with the smallest item in the middle", "This does not affect the choice of the last item."], ["Data in which the last item is the median", "That splits the list evenly, the best case."]],
    "A largest (or smallest) pivot leaves one part empty and the other one item shorter.", { hints: ["What happens to the split when the pivot is the largest item?"] });
  mc(b, 3, "UNDERSTANDING", "Why is quick sort usually much faster than bubble sort on a long list in random order?",
    ["Each partition roughly halves the work", "Correct: far fewer comparisons are needed."],
    [["It makes one pass through the list only, then stops", "It makes many partitions, each on a shorter sub-list."], ["It never compares the items with one another at all", "It compares every item with the pivot."], ["It needs no memory at all", "It uses the call stack for the recursive calls."]],
    "The sub-lists shrink quickly: about n log₂ n comparisons against about n²/2.", { hints: ["Compare how the problem size shrinks in each method."] });
  mc(b, 3, "APPLICATION", "The list 31, 12, 44, 8, 25, 19 is partitioned with the last item as the pivot. Which items come before the pivot?",
    ["12 and 8 only", "Correct: they are the items smaller than 19."],
    [["31 and 44 only", "These are larger than 19."], ["12, 8 and 25", "25 is larger than the pivot."], ["Every item in the list", "The larger items stay after the pivot."]],
    "Only 12 and 8 are less than 19.", { hints: ["Which items are smaller than 19?"] });
  mc(b, 2, "RECALL", "What name is given to a procedure that calls itself?",
    ["Recursive", "Correct."],
    [["Iterative", "Iteration is repetition in a loop."], ["Abstract", "That is a different idea."], ["Sequential", "Sequence means statements in order."]],
    "Quick sort calls itself on each sub-list.");
  mc(b, 4, "EVALUATION", "A programmer changes a quick sort to use the middle item as the pivot instead of the last item. What is the effect on data that is already sorted?",
    ["Two nearly equal parts, so the sort is much faster", "Correct: the list is split in halves."],
    [["There is no effect on the speed of the sort", "The choice of pivot decides how evenly the list is split."], ["The sort is slower because the middle item is harder to find", "Finding it is a single step."], ["The sort will no longer sort the list correctly", "Any item can be the pivot; the result is still sorted."]],
    "A middle pivot gives balanced halves on sorted data.", { hints: ["Where does the middle item of a sorted list fall in the order?"] });

  // ---- true / false, matching, fill in the blank
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "After a partition, the items before the pivot are all smaller than the pivot.", answer: true,
    explanation: "True. That is what partitioning achieves; the items after the pivot are not smaller." });
  b.tf({ d: 3, skill: "UNDERSTANDING", hints: ["How many comparisons does each partition of n items make?"], stem: "A quick sort that always picks the last item as the pivot is fastest on a list that is already sorted.", answer: false,
    explanation: "False. A sorted list is its worst case: each partition removes only one item." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term to its meaning.",
    pairs: [["Pivot", "The item the others are compared with in a partition"], ["Partition", "Moving smaller items before the pivot and the others after it"], ["Recursion", "A procedure calling itself on a smaller problem"], ["Divide and conquer", "Splitting a problem into smaller problems of the same kind"], ["Worst case", "The pivot is always the smallest or largest item"]],
    explanation: "Terms used in quick sort." });
  b.fib({ d: 3, skill: "APPLICATION", hints: ["Move the items smaller than 21 to the front, keeping the others behind the pivot."],
    stem: "The list 26, 9, 40, 17, 33, 21 is partitioned using the last item as the pivot. Using the algorithm in the lesson, state the list after the partition.",
    template: "{{blank:a}}, {{blank:b}}, {{blank:c}}, {{blank:d}}, {{blank:e}}, {{blank:f}}",
    blanks: q1.steps[0].result.map((v, i) => ({ id: "abcdef"[i], accepted: [String(v)], input: "number" })), wrong: [["26", "9", "40", "17", "33", "21"]],
    explanation: "The smaller items 9 and 17 go first, then the pivot 21, then 26, 33 and 40: 9, 17, 21, 26, 33, 40." });

  // ---- numerical
  b.num({ d: 2, skill: "APPLICATION", calculator: false, stem: "The list 8, 3, 5, 1 is sorted by quick sort with the last item as the pivot. State the pivot used in the first partition.", value: 1, wrong: [8, 5], workedSolution: "The last item is 1.", explanation: "Pivot 1." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Each item except the pivot is compared with the pivot once."],
    stem: "How many comparisons with the pivot are made in the first partition of a list of 7 items?", value: 6, wrong: [7, 49], workedSolution: "The 6 items other than the pivot are each compared once.", explanation: "6 comparisons." });
  b.num({ d: 4, skill: "APPLICATION", calculator: false, hints: ["Each partition makes one comparison for every item except the pivot.", "A sorted list with the last item as pivot loses one item per partition."],
    stem: "A quick sort using the last item as the pivot is applied to the sorted list 2, 4, 6, 8, 10, 12. State the total number of comparisons with a pivot.",
    value: q3.comparisons, wrong: [5, 36], workedSolution: "The partitions work on sub-lists of 6, 5, 4, 3 and 2 items, giving 5 + 4 + 3 + 2 + 1 = 15 comparisons.", explanation: "15 comparisons." });
  b.num({ d: 4, skill: "APPLICATION", calculator: false, hints: ["Count the sub-lists of two or more items that are partitioned."],
    stem: "How many partitions are made when the list 18, 5, 27, 12, 8 is sorted by quick sort using the last item as the pivot?", value: 2, wrong: [5, 3], workedSolution: "The whole list is partitioned with pivot 8 giving 5, 8, 27, 12, 18; the sub-list 5 has one item; the sub-list 27, 12, 18 is partitioned with pivot 18 giving 12, 18, 27. That is 2 partitions.", explanation: "2 partitions." });
  // ---- self-marked
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Say what is chosen, what is done and what happens next."],
    stem: "Describe how a quick sort sorts a list. [3]",
    points: ["A pivot item is chosen (for example the last item)", "The list is partitioned so that smaller items are before the pivot and the others after it, leaving the pivot in its final place", "The sub-list before the pivot and the sub-list after it are each sorted in the same way, until sub-lists have fewer than two items"],
    modelAnswer: "A pivot is chosen and the list is partitioned so that smaller items come before it and the others after it, leaving the pivot in its final place. The sub-lists on each side are then sorted in the same way, until they have fewer than two items.", explanation: "Pivot, partition, repeat on the sub-lists." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 3, hints: ["Think about the pivot and the size of the two parts."],
    stem: "Explain why a quick sort that uses the last item as the pivot is slow on a list that is already in order. [3]",
    points: ["The last item is the largest, so every other item is smaller than the pivot", "The partition leaves one empty part and one part only one item shorter", "So about n partitions are needed, each with many comparisons, which is about n²/2 comparisons altogether"],
    modelAnswer: "The last item is the largest, so every other item is smaller than the pivot. One part is empty and the other is only one item shorter, so about n partitions are needed and about n²/2 comparisons are made.", explanation: "No balanced split." });
  b.manualShort({ d: 3, skill: "EVALUATION", marks: 4, hints: ["Consider speed, memory and simplicity."],
    stem: "Compare quick sort with bubble sort. [4]",
    points: ["Quick sort is much faster than bubble sort for long lists in a random order", "Bubble sort is simpler to write and understand", "Quick sort is recursive and uses extra memory for the stack, bubble sort uses very little", "An improved bubble sort can be faster on data that is almost sorted"],
    modelAnswer: "Quick sort is much faster on long random lists, but it is harder to write and uses extra memory for the stack because it is recursive. Bubble sort is simple and uses little memory, and the improved version can be fast on almost sorted data.", explanation: "Speed against simplicity and memory." });
  b.manualShort({ d: 4, skill: "CREATION", marks: 4, hints: ["Use a boundary and swap smaller items to it."],
    stem: "Write pseudocode for a function `Partition(Low, High)` that uses `Data[High]` as the pivot, moves the smaller items before it and returns the final position of the pivot. [4]",
    points: ["Sets the pivot to Data[High] and a boundary to Low", "A loop from Low to High - 1 comparing each item with the pivot", "Swaps an item smaller than the pivot with the item at the boundary and adds 1 to the boundary", "After the loop swaps the pivot into the boundary position and returns the boundary"],
    modelAnswer: codeBlock(`FUNCTION Partition(Low : INTEGER, High : INTEGER) RETURNS INTEGER
    DECLARE Pivot, Boundary, Index, Temp : INTEGER
    Pivot ← Data[High]
    Boundary ← Low
    FOR Index ← Low TO High - 1
        IF Data[Index] < Pivot THEN
            Temp ← Data[Index]
            Data[Index] ← Data[Boundary]
            Data[Boundary] ← Temp
            Boundary ← Boundary + 1
        ENDIF
    NEXT Index
    Temp ← Data[Boundary]
    Data[Boundary] ← Data[High]
    Data[High] ← Temp
    RETURN Boundary
ENDFUNCTION`), explanation: "A boundary marks where smaller items end." });

  // ---- structured practice
  const s0 = q2.steps[0];
  b.struct({ d: 5, skill: "APPLICATION", examStyle: true, hints: ["The pivot is the last item of each sub-list.", "Smaller items go before the pivot."],
    explanation: "A quick sort of seven values.",
    stem: "The array `Data` holds " + a2.join(", ") + ". It is sorted by a quick sort that uses the last item of each sub-list as the pivot.",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "State the pivot for the first partition.", value: s0.pivot, wrong: [14, 22], workedSolution: "The last item is 11.", explanation: "Pivot 11." }),
      P.num({ label: "(b)", marks: 1, stem: "State how many comparisons with the pivot are made in the first partition.", value: 6, wrong: [7, 3], workedSolution: "The six other items are compared once each.", explanation: "6 comparisons." }),
      P.num({ label: "(c)", marks: 1, stem: "State the position (1 to 7) of the pivot in the list after the first partition.", value: s0.pivotIndex + 1, wrong: [3, 7], workedSolution: "The list is " + s0.result.join(", ") + "; three items (6, 9, 3) are smaller than 11, so the pivot is fourth.", explanation: "Position 4." }),
      P.fib({ label: "(d)", marks: 2, stem: "State the items in the sub-list to the left of the pivot after the first partition, in order.", template: "{{blank:a}}, {{blank:b}}, {{blank:c}}", blanks: s0.result.slice(0, 3).map((v, i) => ({ id: "abc"[i], accepted: [String(v)], input: "number" })), wrong: [["14", "6", "22"]], explanation: "6, 9, 3 are the items smaller than 11, in the order produced by the algorithm." }),
      P.num({ label: "(e)", marks: 1, stem: "State the total number of partitions made to sort the whole array.", value: q2.steps.length, wrong: [3, 7], workedSolution: "Each sub-list of two or more items is partitioned: 5 altogether.", explanation: "5 partitions." }),
      P.manual({ label: "(f)", marks: 3, stem: "Explain why the pivot is not included in either of the two sub-lists that are sorted next.", points: ["After the partition the pivot is in its final sorted position", "All items before it are smaller and all items after it are not smaller", "So it never needs to be moved again, and only the two sides need sorting"], modelAnswer: "After the partition the pivot is already in its final place: everything before it is smaller and everything after it is larger or equal. It never needs to move, so only the two sides are sorted.", explanation: "The pivot is in place." }),
    ] });
  b.struct({ d: 3, skill: "ANALYSIS", examStyle: true, hints: ["The last item is the largest in a sorted list.", "Each partition removes one item only."],
    explanation: "Quick sort on data already in order.",
    stem: "A quick sort that uses the last item of each sub-list as the pivot is used on the sorted array `Marks` holding " + a3.join(", ") + ".",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "State the total number of comparisons with a pivot.", value: q3.comparisons, wrong: [5, 6], workedSolution: "5 + 4 + 3 + 2 + 1 = 15.", explanation: "15 comparisons." }),
      P.num({ label: "(b)", marks: 1, stem: "State the number of partitions made.", value: q3.steps.length, wrong: [3, 6], workedSolution: "Sub-lists of 6, 5, 4, 3 and 2 items are partitioned.", explanation: "5 partitions." }),
      pm("(c)", "Why is this the worst case for the quick sort?", ["The pivot is always the largest item", "Correct: so one part is empty."], [["The pivot is always in the middle of its sub-list", "That would be the best case."], ["The list contains duplicate values", "There are no duplicates here."], ["Each partition makes no comparisons", "Each partition compares every other item with the pivot."]], "The sub-list shrinks by only one item each time."),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest a change to the choice of pivot that would make the sort faster on this data.", points: ["Choose the middle item (or the median of the first, middle and last items) as the pivot", "On sorted data this splits the list into two parts of nearly equal size"], modelAnswer: "Use the middle item as the pivot. On sorted data this splits the list into two nearly equal parts.", explanation: "A better pivot gives balanced parts." }),
      pm("(e)", "Which method would sort this array in the fewest comparisons?", ["An improved bubble sort with a swap flag", "Correct: one pass of 5 comparisons."], [["The simple bubble sort without a flag", "It makes all 15 comparisons."], ["A quick sort with the last item as pivot", "It makes 15 comparisons here."], ["A linear search", "A search does not sort."]], "The improved bubble sort stops after one pass without a swap."),
    ] });

  // ---- flashcards
  b.card("DEFINITION", "Quick sort", "Chooses a pivot, partitions the list into smaller items and the rest, then sorts each part in the same way.");
  b.card("DEFINITION", "Pivot", "The item the others are compared with in a partition (here the last item of the sub-list).");
  b.card("DEFINITION", "Partitioning", "Moving items smaller than the pivot before it and the others after it; the pivot ends in its final place.");
  b.card("CONCEPT", "Stopping condition", "A sub-list of fewer than two items is already sorted, so the recursion stops.");
  b.card("DEFINITION", "Divide and conquer", "Splitting a problem into smaller problems of the same kind, solving each and combining the results.");
  b.card("FACT", "Quick sort best and average case", "The pivot splits the list into roughly equal parts: about n × log₂ n comparisons.");
  b.card("FACT", "Quick sort worst case", "The pivot is always the smallest or largest item (sorted data with a last-item pivot): about n²/2 comparisons.");
  b.card("CONCEPT", "Quick sort against bubble sort", "Quick sort is much faster on long random lists but is recursive and harder to write; bubble sort is simple and sorts in place.");
  b.card("CONCEPT", "Recursive calls", "QuickSort(Low, P - 1) and QuickSort(P + 1, High): the pivot at P is left out of both.");
});
