// W4a exam-format item for ZIMSEC Paper 2 section B: one ZIM_P2_PROG practical (40 marks) on algorithm design with quick sort and binary search.
import { concept, P, EXAM, checkExam, ZIM, chk, same, mdTable, codeBlock, py, quickSort, binarySearch } from "../lib.mjs";
import { pm } from "../tables/w4a-q.mjs";
import { arrayMd } from "../tables/w4a-util.mjs";

const C = (k) => `acs.${k}`;

concept(C("algo.quick-sort"), { file: "exam/w4a-zimsec", keyPrefix: "exam.w4a-zimsec", applies: ZIM }, (b) => {
  const marks = [42, 86, 68, 98, 53, 37, 93, 75];
  const total = marks.reduce((a, c) => a + c, 0); chk(total, 552); chk(total / 8, 69);
  const q = quickSort(marks);
  same(q.sorted, [37, 42, 53, 68, 75, 86, 93, 98]);
  same(q.steps[0].result, [42, 68, 53, 37, 75, 98, 93, 86]); chk(q.steps[0].pivot, 75); chk(q.steps[0].pivotIndex + 1, 5); chk(q.steps.length, 6); chk(q.comparisons, 16);
  const sortPy = `def partition(marks, low, high):
    pivot = marks[high]
    boundary = low
    for index in range(low, high):
        if marks[index] < pivot:
            marks[index], marks[boundary] = marks[boundary], marks[index]
            boundary = boundary + 1
    marks[boundary], marks[high] = marks[high], marks[boundary]
    return boundary

def quick_sort(marks, low, high):
    if low < high:
        p = partition(marks, low, high)
        quick_sort(marks, low, p - 1)
        quick_sort(marks, p + 1, high)

marks = [42, 86, 68, 98, 53, 37, 93, 75]
quick_sort(marks, 0, len(marks) - 1)
print(marks)`;
  same(py(sortPy), "[37, 42, 53, 68, 75, 86, 93, 98]");
  const searchPy = `def binary_search(items, target):
    low = 0
    high = len(items) - 1
    while low <= high:
        mid = (low + high) // 2
        if items[mid] == target:
            return mid
        if items[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1

sorted_marks = [37, 42, 53, 68, 75, 86, 93, 98]`;
  const r = py(searchPy + "\nprint(binary_search(sorted_marks, 93))\nprint(binary_search(sorted_marks, 100))\nprint(binary_search(sorted_marks, 37))\nprint(binary_search(sorted_marks, 98))").split("\n");
  same(r, ["6", "-1", "0", "7"]);
  chk(binarySearch(q.sorted, 93).comparisons, 3);
  const searchUi = `mark = int(input("Enter a mark: "))
position = binary_search(sorted_marks, mark)
if position != -1:
    print("Found at position", position + 1)
else:
    print("Not found")`;
  same(py(searchPy + "\n" + searchUi, "93\n"), "Enter a mark: Found at position 7");
  same(py(searchPy + "\n" + searchUi, "50\n"), "Enter a mark: Not found");

  b.struct({
    skill: EXAM.ZIM_P2_PROG.skill, secs: EXAM.ZIM_P2_PROG.secs, examStyle: true, applies: ZIM, d: 4, paper: "ZIMSEC Paper 2",
    concepts: [C("algo.quick-sort"), C("algo.binary-search-insertion-sort"), C("algo.algorithm-design"), C("ds.arrays")],
    stem: "A school in Gweru wants a program to rank the marks of eight candidates in a Computer Science test. The marks are stored in the array `Marks`, indexes 1 to 8.\n\n" + arrayMd(marks, { name: "Marks" }) + "\n\nThe program will calculate the average and the highest mark, sort the marks into ascending order with a quick sort and then let a teacher search for a mark with a binary search.",
    parts: checkExam(EXAM.ZIM_P2_PROG, [
      P.manual({ label: "(a)", marks: 4, stem: "Complete an identifier table for the first part of the program, listing four identifiers with a data type and purpose for each: the array, a loop counter, the running total and the average.", points: ["Marks: ARRAY of INTEGER, holds the eight marks", "Index (or Count): INTEGER, the loop counter used as the array index", "Total: INTEGER, the running total of the marks", "Average: REAL, the total divided by 8 (it can have a fractional part)"], modelAnswer: mdTable(["Identifier", "Data type", "Purpose"], [["Marks", "ARRAY[1:8] OF INTEGER", "the eight marks"], ["Index", "INTEGER", "loop counter and array index"], ["Total", "INTEGER", "running total of the marks"], ["Average", "REAL", "Total divided by 8"]]), explanation: "One mark for each identifier with a suitable type and purpose." }),
      P.manual({ label: "(b)", marks: 6, stem: "Write pseudocode that calculates and outputs the average of the eight marks and the highest mark.", points: ["Sets Total to 0 before the loop", "Sets the highest mark to Marks[1] (or a very low value) before the loop", "A loop from 1 to 8 using Index as the array index", "Adds each mark to the total inside the loop", "Compares each mark with the highest so far and updates it when larger", "Calculates the average as Total / 8 and outputs the average and the highest mark after the loop"], modelAnswer: codeBlock(`Total ← 0
Highest ← Marks[1]
FOR Index ← 1 TO 8
    Total ← Total + Marks[Index]
    IF Marks[Index] > Highest THEN
        Highest ← Marks[Index]
    ENDIF
NEXT Index
Average ← Total / 8
OUTPUT "Average: ", Average
OUTPUT "Highest: ", Highest`) + "\n\nFor the data given, the total is 552, the average is 69 and the highest mark is 91.", explanation: "A total, a maximum and the average in one loop." }),
      P.group({ label: "(c)", stem: "The marks are sorted into ascending order using a quick sort. The pivot of each partition is the last item of the sub-list being sorted, and items smaller than the pivot are moved before it.", parts: [
        P.num({ label: "(i)", marks: 1, stem: "State the pivot used in the first partition.", value: 75, wrong: [42, 98], workedSolution: "The last item of the whole list is 67.", explanation: "67." }),
        P.num({ label: "(ii)", marks: 1, stem: "State the position (1 to 8) of the pivot in the list after the first partition.", value: 5, wrong: [4, 8], workedSolution: "Four marks (42, 68, 53 and 37) are smaller than 75, so the pivot is fifth.", explanation: "Position 5." }),
        P.fib({ label: "(iii)", marks: 2, stem: "State the first two marks in the list after the first partition, in the order produced by the algorithm.", template: "{{blank:a}}, {{blank:b}}", blanks: [{ id: "a", accepted: ["42"], input: "number" }, { id: "b", accepted: ["68"], input: "number" }], wrong: [["86", "68"]], explanation: "After the first partition the list is 42, 68, 53, 37, 75, 98, 93, 78." }),
        P.num({ label: "(iv)", marks: 1, stem: "State the total number of partitions made to sort all eight marks (a sub-list of one item needs none).", value: 6, wrong: [8, 4], workedSolution: "Sub-lists partitioned: the whole list, 42 68 53 37, 68 53 42, 53 68, 98 93 86 and 93 91.", explanation: "6 partitions." }),
        P.num({ label: "(v)", marks: 1, stem: "State the total number of comparisons made with a pivot.", value: 16, wrong: [28, 8], workedSolution: "7 + 3 + 2 + 1 + 2 + 1 = 16.", explanation: "16 comparisons." }),
      ] }),
      P.manual({ label: "(d)", marks: 8, stem: "Write a Python program that sorts the list `marks = [42, 86, 68, 98, 53, 37, 93, 75]` into ascending order using a quick sort, with a function `partition` and a recursive function `quick_sort`, and then prints the list.", points: ["partition takes the list and the low and high positions and sets the pivot to the last item", "Sets a boundary to low", "A loop from low to high - 1 comparing each item with the pivot", "Swaps an item smaller than the pivot with the item at the boundary and adds 1 to the boundary", "After the loop swaps the pivot into the boundary position and returns the boundary", "quick_sort only works when low < high (the base case)", "quick_sort calls partition and then calls itself on the items before the pivot and on the items after it (leaving out the pivot)", "Calls quick_sort for the whole list and prints the sorted list"], modelAnswer: codeBlock(sortPy, "python") + "\n\nThe output of this program, when run, is:\n\n" + codeBlock("[37, 42, 53, 68, 75, 86, 93, 98]"), explanation: "Partition around the last item, then sort the two parts recursively." }),
      P.group({ label: "(e)", stem: "The sorted list is searched using the Python function below.\n\n" + codeBlock(searchPy, "python"), parts: [
        P.num({ label: "(i)", marks: 1, stem: "State the value returned by `binary_search(sorted_marks, 93)`.", value: 6, wrong: [7, 3], workedSolution: "93 is at index 6 of the list (counting from 0).", explanation: "6." }),
        P.num({ label: "(ii)", marks: 1, stem: "State the number of times the body of the `while` loop is executed in the search for 84.", value: 3, wrong: [1, 6], workedSolution: "mid = 3 (68), then mid = 5 (86), then mid = 6 (93).", explanation: "3 times." }),
        P.num({ label: "(iii)", marks: 1, stem: "State the value returned by `binary_search(sorted_marks, 100)`.", value: -1, wrong: [0, 8], workedSolution: "100 is larger than every mark, so the loop ends with low > high and -1 is returned.", explanation: "-1." }),
        pm("(iv)", "Which condition makes the loop stop when the mark is not in the list?", ["`low <= high` becomes false", "Correct."], [["`items[mid] == target` becomes true", "That stops the loop when the item is found."], ["`mid` becomes zero", "mid is not used as a stop condition."], ["`target` becomes -1", "The target does not change."]], "When low is greater than high no items remain."),
      ] }),
      P.manual({ label: "(f)", marks: 4, stem: "Write Python statements that ask the teacher to enter a mark, search for it with `binary_search` and output either its position in the list (counting the first item as position 1) or the message \"Not found\".", points: ["Inputs the mark and converts it to an integer", "Calls binary_search with the sorted list and the mark and stores the result", "Tests whether the result is not -1 and outputs the position as result + 1", "Outputs \"Not found\" otherwise"], modelAnswer: codeBlock(searchUi, "python") + "\n\nEntering 93 gives `Found at position 7`; entering 50 gives `Not found`.", explanation: "Position = index + 1." }),
      P.group({ label: "(g)", stem: "A tester checks `binary_search(sorted_marks, target)` with three values of `target`. State the value the function should return for each.", parts: [
        P.num({ label: "(i)", marks: 1, stem: "The smallest mark in the list, 38.", value: 0, wrong: [1, -1], workedSolution: "37 is the first item, index 0.", explanation: "0." }),
        P.num({ label: "(ii)", marks: 1, stem: "The largest mark in the list, 91.", value: 7, wrong: [8, 6], workedSolution: "98 is the last of eight items, index 7.", explanation: "7." }),
        P.num({ label: "(iii)", marks: 1, stem: "A mark that is not in the list, 50.", value: -1, wrong: [0, 3], workedSolution: "50 is not in the list.", explanation: "-1." }),
      ] }),
      P.manual({ label: "(h)", marks: 5, stem: "The school later wants to use the program for 10 000 marks. Discuss whether a quick sort or a bubble sort should be used, and whether a linear search or a binary search should be used.", points: ["A quick sort is much faster than a bubble sort for a long list in a random order", "A bubble sort makes about n squared ÷ 2 comparisons (about fifty million for 10 000 marks), whereas a quick sort makes about n × log₂ n (about 130 000)", "A bubble sort is simpler to write, but that is outweighed by its slowness for a large list", "A binary search needs at most about 14 comparisons for 10 000 sorted marks, whereas a linear search may need 10 000", "The binary search can be used because the list has been sorted first, and the saving is large if many searches are made"], modelAnswer: "A quick sort should be used, because it makes about n × log₂ n comparisons (about 130 000) whereas a bubble sort makes about n²/2 (about 50 million) for 10 000 marks, although the bubble sort is simpler to write. A binary search should be used because the marks are sorted, and it needs at most about 14 comparisons instead of up to 10 000, which matters when many searches are made.", explanation: "Compare the growth of the work." }),
    ]),
    hints: ["The pivot is the last item of each sub-list.", "A binary search starts at the middle of the sorted list."],
    explanation: "Total 552, average 69, highest 98; the first partition has pivot 75 and gives 42, 68, 53, 37, 75, 98, 93, 86; the sort makes 6 partitions and 16 comparisons; binary_search returns 6, -1, 0 and 7.",
  });
});
