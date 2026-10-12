// Slice w4a: linear search and bubble sort (acs.algo.linear-search-bubble-sort, both boards).
import { concept, P, chk, same, mdTable, codeBlock, bubbleSort, linearSearch } from "../lib.mjs";
import { mc, pm } from "../tables/w4a-q.mjs";
import { arrayMd } from "../tables/w4a-util.mjs";

concept("acs.algo.linear-search-bubble-sort", { file: "algo/linear-search-bubble-sort", keyPrefix: "algo.linear-search-bubble-sort" }, (b) => {
  const rain = [7, 3, 9, 1, 5];
  const bs = bubbleSort(rain);
  const p1 = bs.passes[0];
  same(p1.state, [3, 7, 1, 5, 9]);
  chk(p1.swaps, 3); chk(bs.passes.length, 4); chk(bs.comparisons, 10); chk(bs.swaps, 6);
  chk(bubbleSort([1, 2, 3, 4, 5, 6, 7, 8], { improved: false }).comparisons, 28);
  const pupils = [15, 8, 22, 4, 19, 30, 11];
  chk(linearSearch(pupils, 19).comparisons, 5); chk(linearSearch(pupils, 6).comparisons, 7);
  const sevenWorst = bubbleSort([8, 7, 6, 5, 4, 3, 2, 1]); chk(sevenWorst.swaps, 28);
  const names = ["Tendai", "Rudo", "Farai", "Rudo", "Chipo"];
  let position = 0; names.forEach((n, i) => { if (n === "Rudo") position = i + 1; });
  chk(position, 4);

  // ---- multiple choice
  mc(b, 1, "RECALL", "What is a linear search?",
    ["Checking each item in turn until the target is found", "Correct: the search ends at the last item if the target is absent."],
    [["Splitting a sorted list in half again and again until the target is found", "That is a binary search."], ["Swapping neighbouring items until a whole list is in order", "That is a bubble sort."], ["Comparing every item with every other item in the list", "A linear search compares each item only with the target."]],
    "A linear search examines items one at a time.");
  mc(b, 2, "UNDERSTANDING", "Which statement about a linear search is correct?",
    ["It can be used on a list that is not in order", "Correct."],
    [["It can only be used on a list that is in order", "That is true of a binary search, not a linear search."], ["It always examines every item", "It stops when the item is found."], ["It needs a temporary variable to swap items", "Searching does not swap items."]],
    "Order does not matter to a linear search.", { daily: true });
  mc(b, 2, "RECALL", "What is the worst case for a linear search of a list of 50 items when the item is in the list?",
    ["The item is the last one in the list", "Correct: 50 comparisons are needed."],
    [["The item is the first one in the list", "That is the best case, with 1 comparison."], ["The item is in the middle of the list", "That is about the average case."], ["The list is already sorted", "Order does not change a linear search."]],
    "The last item needs the most comparisons.");
  mc(b, 2, "UNDERSTANDING", "Why does swapping two array elements in a bubble sort need a temporary variable?",
    ["One value would be overwritten before it is copied", "Correct."],
    [["It makes the sort run in fewer passes than before", "The temporary variable does not change the number of passes."], ["It stores the number of swaps made", "A temporary variable holds a value, not a count."], ["It stops the loop at the end of the whole array", "The loop limit does that."]],
    "Temp holds the first value while the second is copied over it.", { daily: true });
  mc(b, 3, "UNDERSTANDING", "What is the purpose of the `Swapped` flag in an improved bubble sort?",
    ["To stop the sort after a pass with no swaps", "Correct: the list is then in order."],
    [["To count the number of passes that have been made so far", "A separate counter does that."], ["To mark which of the items in the list have been found", "That is the job of a flag in a search."], ["To make the sort work on data that is not in order", "The sort works on any data."]],
    "No swaps in a pass means the list is sorted.", { hints: ["What does a pass without a swap tell you?"] });
  mc(b, 3, "ANALYSIS", "A bubble sort with a `Swapped` flag is given a list that is already in order. How many passes does it make?",
    ["1", "Correct: no swap is made, so it stops."],
    [["0", "The first pass is needed to discover there is nothing to swap."], ["n − 1, where n is the number of items", "That is the worst case."], ["n", "It never makes more than n − 1 passes."]],
    "One pass with no swaps is enough.", { hints: ["How does the sort know it is finished?"] });
  mc(b, 3, "APPLICATION", "The array `Data` holds 6, 2, 8, 4. After the first pass of a bubble sort into ascending order, which values are in `Data`?",
    ["2, 6, 4, 8", "Correct: 6 is swapped with 2, 6 is kept against 8, then 8 is swapped with 4."],
    [["2, 4, 6, 8", "That is the sorted array, which needs two passes."], ["2, 6, 8, 4", "The last pair 8 and 4 is also swapped in the first pass."], ["6, 2, 4, 8", "The first pair 6 and 2 is also swapped in the first pass."]],
    "Pass 1: (6,2) swap, (6,8) no, (8,4) swap.", { hints: ["Compare the neighbouring pairs left to right."] });
  mc(b, 4, "ANALYSIS", "A programmer says that a bubble sort of 8 items without a flag always makes the same number of comparisons whatever the order. How many comparisons is that?",
    ["28", "Correct: 7 + 6 + 5 + 4 + 3 + 2 + 1."],
    [["56", "That is 8 × 7, which counts each pair twice."], ["64", "That is 8 × 8."], ["8", "That is the number of items."]],
    "Each pass has one comparison fewer than the one before.", { hints: ["Add the comparisons of each pass: 7, 6, 5, ..."] });

  // ---- true / false, matching, fill in the blank
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "In a bubble sort into ascending order, the largest unsorted item is in its final place at the end of each pass.", answer: true,
    explanation: "True. The largest value is carried along by the swaps to the end of the unsorted part." });
  b.tf({ d: 3, skill: "UNDERSTANDING", hints: ["Think about which order of data makes a bubble sort do the most work."], stem: "A bubble sort takes the longest when the data is already in the correct order.", answer: false,
    explanation: "False. Sorted data is the best case (one pass with no swaps). Reverse-ordered data is the worst case." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term to its meaning.",
    pairs: [["Pass", "One run through the items being compared"], ["Found flag", "A Boolean that records that the item was found"], ["Early exit", "Stopping a search as soon as the item is found"], ["Temporary variable", "Holds one value while two items are swapped"], ["Worst case", "The data that needs the most work"]],
    explanation: "Terms used for searching and sorting." });
  b.fib({ d: 3, skill: "APPLICATION", hints: ["Compare 7 and 3 first, then the new neighbour."],
    stem: "A bubble sort into ascending order is applied to `Data` = 7, 3, 9, 1, 5. State the array after the first pass.",
    template: "Data[1] = {{blank:a}}, Data[2] = {{blank:b}}, Data[3] = {{blank:c}}, Data[4] = {{blank:d}}, Data[5] = {{blank:e}}",
    blanks: p1.state.map((v, i) => ({ id: "abcde"[i], accepted: [String(v)], input: "number" })), wrong: [["7", "3", "9", "1", "5"]],
    explanation: "Pass 1 swaps (7,3), keeps 7 and 9, swaps (9,1) and swaps (9,5): 3, 7, 1, 5, 9." });

  // ---- numerical
  b.num({ d: 2, skill: "APPLICATION", calculator: false, hints: ["Count the items checked up to and including 19."],
    stem: "A linear search looks for 19 in the array below.\n\n" + arrayMd(pupils, { name: "Data" }) + "\n\nHow many comparisons are made?",
    value: 5, wrong: [4, 7], workedSolution: "The items 15, 8, 22, 4 and 19 are checked; 19 is the fifth.", explanation: "5 comparisons." });
  b.num({ d: 2, skill: "APPLICATION", calculator: false,
    stem: "The same array has 7 items. How many comparisons does a linear search make for the target 6, which is not in the array?",
    value: 7, wrong: [6, 1], workedSolution: "Every item must be checked before it is certain that 6 is missing.", explanation: "7 comparisons." });
  b.num({ d: 4, skill: "APPLICATION", calculator: false, hints: ["In the worst case every comparison leads to a swap.", "Add the comparisons of each pass."],
    stem: "An array holds the 8 values 8, 7, 6, 5, 4, 3, 2, 1 and is sorted into ascending order by a bubble sort. How many swaps are made altogether?",
    value: 28, wrong: [7, 56], workedSolution: "In reverse order every comparison causes a swap: 7 + 6 + 5 + 4 + 3 + 2 + 1 = 28.", explanation: "28 swaps." });
  b.short({ d: 2, skill: "RECALL", stem: "State the name of the variable type used for a flag that records whether an item has been found.", accepted: ["boolean", "bool"], wrong: ["integer", "string"], explanation: "A flag is a BOOLEAN." });

  // ---- self-marked
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Compare the best and worst cases."],
    stem: "Describe the best case and the worst case for a linear search of a list of 100 items. [3]",
    points: ["Best case: the item is the first in the list", "Only 1 comparison is needed", "Worst case: the item is last or not in the list, needing 100 comparisons"],
    modelAnswer: "The best case is that the item is the first one, which needs 1 comparison. The worst case is that it is the last item or not in the list, which needs 100 comparisons.", explanation: "Best 1, worst n." });
  b.manualShort({ d: 3, skill: "CREATION", marks: 3, hints: ["Use a temporary variable."],
    stem: "The array `Data` has two neighbouring elements `Data[Index]` and `Data[Index + 1]` that are in the wrong order. Write the pseudocode to swap them. [3]",
    points: ["Copies Data[Index] into a temporary variable", "Copies Data[Index + 1] into Data[Index]", "Copies the temporary variable into Data[Index + 1]"],
    modelAnswer: codeBlock(`Temp ← Data[Index]
Data[Index] ← Data[Index + 1]
Data[Index + 1] ← Temp`), explanation: "Three assignments using Temp." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4, hints: ["Mention the flag, the shorter passes and the effect on sorted data."],
    stem: "Explain two ways in which an improved bubble sort is more efficient than the simple version. [4]",
    points: ["It uses a flag that records whether any swap was made in a pass", "It stops when a pass makes no swap, so a list that is already (nearly) in order needs few passes", "Each pass compares one pair fewer, because the largest items have already reached the end", "So fewer comparisons are made altogether"],
    modelAnswer: "It uses a flag to record whether a swap was made and stops after a pass with no swaps, so lists that are nearly in order need few passes. It also makes each pass one comparison shorter, because the largest items are already in place, so fewer comparisons are made.", explanation: "A swap flag and shorter passes." });
  b.manualShort({ d: 5, skill: "CREATION", marks: 5, hints: ["Use a Found flag and stop the loop early.", "Handle the not found case after the loop."],
    stem: "The array `Name` holds 20 names. Write pseudocode that inputs a name and outputs the position of its first occurrence in `Name`, or the message \"Not found\". [5]",
    points: ["Inputs the target name", "Sets a found flag to FALSE and the index to 1 before the loop", "Loop runs while not found and the index is not past 20", "Compares Name[Index] with the target, setting the flag when equal and otherwise adding 1 to the index", "Outputs the position if found and \"Not found\" otherwise"],
    modelAnswer: codeBlock(`INPUT Target
Found ← FALSE
Index ← 1
WHILE Found = FALSE AND Index <= 20 DO
    IF Name[Index] = Target THEN
        Found ← TRUE
    ELSE
        Index ← Index + 1
    ENDIF
ENDWHILE
IF Found = TRUE THEN
    OUTPUT Index
ELSE
    OUTPUT "Not found"
ENDIF`), explanation: "A WHILE loop with a found flag." });

  // ---- structured practice
  b.struct({ d: 5, skill: "APPLICATION", examStyle: true, hints: ["Write the array after each comparison of the first pass.", "The improved sort stops after a pass with no swaps."],
    explanation: "A bubble sort of five rainfall readings.",
    stem: "A weather station in Kariba stores five daily rainfall readings (in mm) in the array `Rain`: " + rain.join(", ") + ". They are sorted into ascending order by an improved bubble sort that stops when a pass makes no swap.",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "State the value in `Rain[5]` after the first pass.", value: p1.state[4], wrong: [5, 7], workedSolution: "The largest value, 9, is carried to the end in pass 1.", explanation: "9." }),
      P.num({ label: "(b)", marks: 1, stem: "State the number of swaps made in the first pass.", value: p1.swaps, wrong: [4, 2], workedSolution: "The pairs (7,3), (9,1) and (9,5) are swapped; (7,9) is not.", explanation: "3 swaps." }),
      P.num({ label: "(c)", marks: 1, stem: "State the number of passes the sort makes altogether, including the last pass in which no swap occurs.", value: bs.passes.length, wrong: [3, 5], workedSolution: "Pass 1: " + p1.state.join(", ") + ". Pass 2: " + bs.passes[1].state.join(", ") + ". Pass 3: " + bs.passes[2].state.join(", ") + ". Pass 4: " + bs.passes[3].state.join(", ") + " with no swaps, so the sort stops.", explanation: "4 passes." }),
      P.num({ label: "(d)", marks: 1, stem: "State the total number of comparisons made altogether.", value: bs.comparisons, wrong: [9, 12], workedSolution: "Pass 1 has 4 comparisons, pass 2 has 3, pass 3 has 2 and pass 4 has 1: 4 + 3 + 2 + 1.", explanation: "10 comparisons." }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain why a temporary variable is needed when two readings are swapped.", points: ["Assigning one value to the other location overwrites it", "The temporary variable keeps the first value so that it can be copied into the second location afterwards"], modelAnswer: "If one reading is copied over the other, the overwritten value is lost. The temporary variable holds the first value so that it can then be copied into the second place.", explanation: "Avoids losing a value." }),
      P.manual({ label: "(f)", marks: 3, stem: "Write the pseudocode IF statement, with the swap, that compares `Rain[Index]` with `Rain[Index + 1]` and swaps them if they are in the wrong order, setting the flag `Swapped` to TRUE.", points: ["Correct condition Rain[Index] > Rain[Index + 1]", "Swaps using a temporary variable (three assignments)", "Sets Swapped to TRUE inside the IF and closes with ENDIF"], modelAnswer: codeBlock(`IF Rain[Index] > Rain[Index + 1] THEN
    Temp ← Rain[Index]
    Rain[Index] ← Rain[Index + 1]
    Rain[Index + 1] ← Temp
    Swapped ← TRUE
ENDIF`), explanation: "Compare, swap with Temp and set the flag." }),
    ] });
  b.struct({ d: 3, skill: "ANALYSIS", examStyle: true, hints: ["The loop does not stop when it finds a match.", "Position is replaced each time a match is found."],
    explanation: "Finding the fault in a search that always scans the whole array.",
    stem: "The array `Name` holds Tendai, Rudo, Farai, Rudo, Chipo. An algorithm should output the position of the first occurrence of the name in `Target`.\n\n" + codeBlock(`Position ← 0
FOR Index ← 1 TO 5
    IF Name[Index] = Target THEN
        Position ← Index
    ENDIF
NEXT Index
OUTPUT Position`),
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "State the value output when `Target` is \"Rudo\".", value: 4, wrong: [2, 1], workedSolution: "Position is set to 2 and later replaced by 4.", explanation: "4, the last match." }),
      pm("(b)", "Why does the algorithm not output the first position of \"Rudo\"?", ["The loop carries on after a match and replaces `Position`", "Correct."], [["The comparison uses the wrong operator to test the names", "The comparison with = is correct."], ["`Position` is set to 0 before the loop starts running", "Setting it to 0 is correct as a not found value."], ["The loop starts at the wrong index of the array", "Starting at 1 is correct."]], "There is no early exit."),
      P.num({ label: "(c)", marks: 1, stem: "State the value output when `Target` is \"Sipho\".", value: 0, wrong: [5, 1], workedSolution: "There is no match, so Position stays 0.", explanation: "0 means not found." }),
      P.num({ label: "(d)", marks: 1, stem: "State the number of comparisons made whatever the value of `Target`.", value: 5, wrong: [1, 4], workedSolution: "The FOR loop always runs 5 times.", explanation: "5 comparisons." }),
      P.manual({ label: "(e)", marks: 2, stem: "Rewrite the algorithm so that it stops at the first match.", points: ["Uses a loop that ends when a match is found or the end of the array is reached (for example WHILE Position = 0 AND Index <= 5)", "Increases the index each pass and outputs Position after the loop"], modelAnswer: codeBlock(`Position ← 0
Index ← 1
WHILE Position = 0 AND Index <= 5 DO
    IF Name[Index] = Target THEN
        Position ← Index
    ENDIF
    Index ← Index + 1
ENDWHILE
OUTPUT Position`), explanation: "An early exit with a conditional loop." }),
    ] });

  // ---- flashcards
  b.card("DEFINITION", "Linear search", "Checking each item in turn from the first until the target is found or the end is reached.");
  b.card("CONCEPT", "Linear search performance", "Best case: first item (1 comparison). Worst case: last item or missing (n comparisons). Works on unsorted data.");
  b.card("DEFINITION", "Bubble sort", "Repeated passes comparing neighbouring items and swapping them if out of order.");
  b.card("CONCEPT", "Swapping two values", "Temp ← A; A ← B; B ← Temp. Without Temp one value is lost.");
  b.card("CONCEPT", "Improved bubble sort", "A Swapped flag stops the sort after a pass with no swaps; each pass can stop one place earlier.");
  b.card("FACT", "Bubble sort best case", "Data already in order: one pass, n − 1 comparisons, no swaps.");
  b.card("FACT", "Bubble sort worst case", "Reverse order: n(n − 1)/2 comparisons and swaps (28 for 8 items).");
  b.card("FACT", "After each pass", "The largest unsorted item has reached the end of the unsorted part.");
  b.card("CONCEPT", "Not found case", "After the search loop, test the found flag; output a message if the item was never found.");
});
