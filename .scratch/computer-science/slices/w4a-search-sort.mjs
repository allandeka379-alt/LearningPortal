// Slice w4a: linear search and bubble sort (comp.algorithms.search-sort). Passes and counts come from the kit's mirrors.
import { concept, P } from "../lib.mjs";
import { fence, bubble, linear, arrayMd, list } from "./w4a-0-kit.mjs";

const names = ["Tendai", "Rudo", "Farai", "Chipo", "Sipho", "Nyasha"];
const findChipo = linear(names, "Chipo");
const findMiss = linear(names, "Thandeka");

const dataA = [42, 17, 58, 23, 9, 31];
const passesA = bubble(dataA);
const p1 = passesA[0];
const dataA2 = [36, 14, 50, 7, 28, 19];
const passesA2 = bubble(dataA2);
const p2 = passesA2[1];
const dataA3 = [11, 45, 3, 27, 60, 8];
const p3 = bubble(dataA3)[0];
const nA = dataA.length;
const totalCompMax = (nA * (nA - 1)) / 2;

const dataD = [5, 12, 3, 9];
const passD = bubble(dataD, { desc: true })[0];
const sortedS = [4, 11, 15, 20, 26];
const passesS = bubble(sortedS);
const compS = passesS.reduce((s, p) => s + p.comparisons, 0);

const towns = ["Mutare", "Harare", "Bulawayo", "Masvingo", "Gweru"];
const tp1 = (() => {
  const a = [...towns];
  for (let j = 0; j < a.length - 1; j++) if (a[j] > a[j + 1]) [a[j], a[j + 1]] = [a[j + 1], a[j]];
  return a;
})();

{
  const opts = [list(tp1), list([...towns].sort()), list([towns[1], towns[0], ...towns.slice(2)]), list([...towns].reverse())];
  if (new Set(opts).size !== 4) throw new Error("towns options collide");
  const optsD = [list(passD.after), list(bubble(dataD)[0].after), list([...dataD].sort((x, y) => y - x)), list([...dataD].reverse())];
  if (new Set(optsD).size !== 4) throw new Error("desc options collide");
}
// Struct: bubble sort code with a fixed array.
const dataS = [64, 35, 80, 12, 47];
const passesStruct = bubble(dataS);
const sortCode = `Last ← 5
REPEAT
    Swapped ← FALSE
    FOR Index ← 1 TO Last - 1
        IF Points[Index] > Points[Index + 1]
            THEN
                Temp ← Points[Index]
                Points[Index] ← Points[Index + 1]
                Points[Index + 1] ← Temp
                Swapped ← TRUE
        ENDIF
    NEXT Index
    Last ← Last - 1
UNTIL Swapped = FALSE OR Last = 1`;
const passesUsedS = passesStruct.length;
const swapsTotalS = passesStruct.reduce((s, p) => s + p.swaps, 0);

const searchCode = `OUTPUT "Enter a name"
INPUT Wanted
Found ← FALSE
Index ← 1
WHILE Found = FALSE AND Index <= 6 DO
    IF Learners[Index] = Wanted
        THEN
            Found ← TRUE
        ELSE
            Index ← Index + 1
    ENDIF
ENDWHILE`;

concept("comp.algorithms.search-sort", { file: "algorithms/search-sort", keyPrefix: "algorithms.search-sort" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "How does a **linear search** find an item in a list?",
    options: [
      ["It checks each item in turn until it finds a match or the list ends", "Correct."],
      ["It sorts the list first and then looks in the middle", "That describes a binary search on sorted data."],
      ["It compares neighbouring pairs and swaps them when needed", "That describes a bubble sort."],
      ["It jumps straight to the item using its value as a position", "A linear search must look at items one by one."],
    ],
    answer: "A",
    explanation: "A linear search looks at each item in order, stopping when the item is found or the list ends.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In a bubble sort, which items are compared with each other?",
    options: [
      ["Neighbouring items, one pair at a time", "Correct: each item is compared with the one next to it."],
      ["The first item and the last item", "Only adjacent items are compared."],
      ["Every item with the item being searched for", "That is a search, not a sort."],
      ["The largest item and the smallest item", "The sort does not know which these are until it finishes."],
    ],
    answer: "A",
    explanation: "Bubble sort compares adjacent items and swaps them if they are in the wrong order.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: `The array \`Learners\` holds:\n\n${arrayMd("Learners", names)}\n\nA linear search that stops when the item is found looks for "Chipo". How many comparisons are made?`,
    value: findChipo.comparisons,
    wrong: [names.length],
    explanation: `"Chipo" is at position ${findChipo.index}, so ${findChipo.comparisons} items are checked.`,
    workedSolution: `1. Compare with ${names.slice(0, findChipo.index).join(", ")}.\n2. Match at position ${findChipo.index}: ${findChipo.comparisons} comparisons.`,
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: `Using the same array:\n\n${arrayMd("Learners", names)}\n\nHow many comparisons does the linear search make when looking for "Thandeka"?`,
    value: findMiss.comparisons,
    wrong: [0],
    explanation: `"Thandeka" is not in the list, so all ${findMiss.comparisons} items are checked before the search reports "not found".`,
    workedSolution: `1. No item matches.\n2. Every item is compared: ${findMiss.comparisons} comparisons.`,
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    hints: ["Compare positions 1 and 2, then 2 and 3, and so on.", "The largest value ends up last."],
    stem: `The array ${list(dataA)} is sorted into ascending order with a bubble sort. Give the array after the **first** pass.`,
    template: p1.after.map((_, i) => `Position ${i + 1}: {{blank:p${i}}}`).join("\n\n"),
    blanks: p1.after.map((v, i) => ({ id: `p${i}`, accepted: [String(v)], input: "number", wrong: String(dataA[i] === v ? v + 1 : dataA[i]) })),
    explanation: `After pass 1: ${list(p1.after)}. ${Math.max(...dataA)} has bubbled to the end.`,
  });
  b.fib({
    d: 4, skill: "APPLICATION",
    hints: ["Do the first pass completely, then the second pass on its result."],
    stem: `The array ${list(dataA2)} is sorted into ascending order with a bubble sort. Give the array after the **second** pass.`,
    template: p2.after.map((_, i) => `Position ${i + 1}: {{blank:p${i}}}`).join("\n\n"),
    blanks: p2.after.map((v, i) => ({ id: `p${i}`, accepted: [String(v)], input: "number", wrong: String(v + 1) })),
    explanation: `Pass 1: ${list(passesA2[0].after)}. Pass 2: ${list(p2.after)}.`,
  });
  b.num({
    d: 3, skill: "APPLICATION",
    hints: ["Count each time a pair is out of order in pass 1."],
    stem: `How many swaps are made in the first pass of a bubble sort (ascending) of ${list(dataA3)}?`,
    value: p3.swaps,
    wrong: [p3.comparisons],
    explanation: `Pass 1 makes ${p3.comparisons} comparisons, of which ${p3.swaps} lead to a swap, giving ${list(p3.after)}.`,
    workedSolution: `1. Compare each neighbouring pair in turn, swapping when the left is larger.\n2. Swaps: ${p3.swaps}.\n3. Array: ${list(p3.after)}.`,
  });
  b.num({
    d: 3, skill: "UNDERSTANDING",
    hints: ["Each pass fixes one more item at the end."],
    stem: "What is the greatest number of passes a bubble sort needs for a list of 8 items?",
    value: 7,
    wrong: [8],
    explanation: "Each pass places one item in its final position; when 7 are placed, the 8th must be too.",
    workedSolution: "1. n items need at most n − 1 passes.\n2. 8 − 1 = 7.",
  });
  b.num({
    d: 4, skill: "ANALYSIS",
    hints: ["Each pass makes one comparison fewer than the one before."],
    stem: `A bubble sort's passes each stop one place earlier than the last. What is the greatest total number of comparisons it can make for a list of ${nA} items?`,
    value: totalCompMax,
    wrong: [(nA - 1) * (nA - 1)],
    explanation: `${Array.from({ length: nA - 1 }, (_, i) => nA - 1 - i).join(" + ")} = ${totalCompMax}.`,
    workedSolution: `1. Pass comparisons: ${Array.from({ length: nA - 1 }, (_, i) => nA - 1 - i).join(", ")}.\n2. Total ${totalCompMax}.`,
  });
  b.num({
    d: 3, skill: "APPLICATION",
    hints: ["The flag stops the sort after a pass with no swaps."],
    stem: `A bubble sort with a \`Swapped\` flag sorts the list ${list(sortedS)}, which is already in ascending order. How many comparisons does it make in total?`,
    value: compS,
    wrong: [(sortedS.length * (sortedS.length - 1)) / 2],
    explanation: `The first pass makes ${compS} comparisons and no swaps, so the flag stays FALSE and the sort stops.`,
    workedSolution: `1. Pass 1: ${sortedS.length - 1} comparisons, 0 swaps.\n2. Swapped = FALSE, so the sort ends: ${compS} comparisons.`,
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the purpose of the `Swapped` flag in a bubble sort?",
    options: [
      ["To stop the sort when a pass makes no swaps", "Correct: no swaps means the list is sorted."],
      ["To hold one value while two items are swapped", "That is the job of Temp."],
      ["To count the number of passes made", "A flag is Boolean; it does not count."],
      ["To mark the position of the largest item", "The flag only records whether a swap happened."],
    ],
    answer: "A",
    explanation: "Swapped is set to FALSE at the start of each pass and TRUE when a swap happens; if it is still FALSE at the end, the sort stops early.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Which way round must the pair be to need a swap for descending order?"],
    stem: `A bubble sort uses \`IF List[Index] < List[Index + 1]\` to decide when to swap. What is the list ${list(dataD)} after the first pass?`,
    options: [
      [list(passD.after), "Correct: with < the smaller values move to the end, sorting into descending order."],
      [list(bubble(dataD)[0].after), "That is the first pass of an ascending sort, which uses >."],
      [list([...dataD].sort((x, y) => y - x)), "That is fully sorted; one pass is not enough here."],
      [list([...dataD].reverse()), "A pass compares neighbours; it does not reverse the list."],
    ],
    answer: "A",
    explanation: `With \`<\` a pair is swapped when the left item is smaller, so the smallest value moves to the end: ${list(passD.after)}.`,
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Strings are compared alphabetically."],
    stem: `A bubble sort puts these towns into alphabetical order: ${list(towns)}. What is the list after the first pass?`,
    options: [
      [list(tp1), "Correct: Mutare moves to the end because it comes last alphabetically."],
      [list([...towns].sort()), "That is the fully sorted list."],
      [list([towns[1], towns[0], ...towns.slice(2)]), "That shows only the first comparison."],
      [list([...towns].reverse()), "The list is not simply reversed."],
    ],
    answer: "A",
    explanation: `Pass 1 compares neighbouring names and swaps when the left one comes later in the alphabet: ${list(tp1)}.`,
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["What is in List[Index] after the first line?"],
    stem: `A learner writes this swap. \`List[1]\` is 30 and \`List[2]\` is 15.\n\n${fence(`List[1] ← List[2]\nList[2] ← List[1]`)}\n\nWhat do the two elements hold afterwards?`,
    options: [
      ["Both hold 15", "Correct: 30 is overwritten before it is saved."],
      ["Both hold 30", "The first line copies 15 into List[1]."],
      ["List[1] holds 15 and List[2] holds 30", "That needs a temporary variable."],
      ["List[1] holds 30 and List[2] holds 15", "List[1] changes on the first line."],
    ],
    answer: "A",
    explanation: "Without Temp the first value is lost. Use Temp ← List[1], List[1] ← List[2], List[2] ← Temp.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A linear search only works if the list has been sorted first.",
    answer: false,
    explanation: "False. A linear search checks every item in turn, so it works on unsorted lists.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "After the first pass of a bubble sort into ascending order, the largest item is in the last position.",
    answer: true,
    explanation: "True. The largest item is carried along by every comparison it is part of, so it ends at the end of the list.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each variable to its job.",
    pairs: [
      ["`Found` in a linear search", "Becomes TRUE when the item is located, ending the loop"],
      ["`Swapped` in a bubble sort", "Records whether any swap happened during a pass"],
      ["`Temp` in a bubble sort", "Holds one value while two items change places"],
      ["`Last` in a bubble sort", "Marks the end of the part of the list still to be sorted"],
    ],
    explanation: "Two flags (Found, Swapped), a temporary store (Temp) and a boundary (Last).",
  });
  b.manualShort({
    d: 4, skill: "CREATION", marks: 5,
    hints: ["Use a flag and a WHILE loop so the search stops when the item is found.", "Output a message in both cases."],
    stem: "The array `Phones[1:50]` holds phone numbers as strings. Write an algorithm in pseudocode that inputs a phone number, uses a linear search to find it, and outputs its position, or a message if it is not in the array.",
    points: [
      "Inputs the number to find (with a prompt)",
      "Initialises a flag (Found ← FALSE) and an index (Index ← 1) before the loop",
      "Loop that continues while not found AND Index <= 50",
      "Compares Phones[Index] with the input; sets the flag if equal, otherwise adds 1 to Index",
      "After the loop outputs the position if found, or a not-found message",
    ],
    explanation: "The flag stops the search early; the IF after the loop chooses the message.",
    modelAnswer: "```\nOUTPUT \"Enter the phone number\"\nINPUT Wanted\nFound ← FALSE\nIndex ← 1\nWHILE Found = FALSE AND Index <= 50 DO\n    IF Phones[Index] = Wanted\n        THEN\n            Found ← TRUE\n        ELSE\n            Index ← Index + 1\n    ENDIF\nENDWHILE\nIF Found = TRUE\n    THEN\n        OUTPUT \"Found at position \", Index\n    ELSE\n        OUTPUT \"Number not found\"\nENDIF\n```",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    hints: ["Compare, swap, pass, stop."],
    stem: "Describe how a bubble sort puts a list of numbers into ascending order.",
    points: [
      "Neighbouring items are compared, starting with the first two",
      "If the first of the pair is larger, the two items are swapped",
      "This is repeated along the list (a pass); passes are repeated, each putting the next largest item in place",
      "The sort stops when a pass makes no swaps (a flag records this) or after n − 1 passes",
    ],
    explanation: "A full description covers comparing, swapping, repeating passes and stopping.",
    modelAnswer: "It compares the first and second items and swaps them if the first is larger, then compares the second and third, and so on to the end of the list. That pass leaves the largest item at the end. Passes are repeated over the rest of the list. A flag records whether any swap was made; when a pass makes no swaps the list is sorted and the algorithm stops.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, marks: 8, secs: 720, calculator: false,
    hints: ["Do one pass at a time.", "Count the passes until one makes no swaps or Last reaches 1."],
    stem: `A quiz club in Bulawayo stores five scores in the array \`Points\`:\n\n${arrayMd("Points", dataS)}\n\n${fence(sortCode)}`,
    parts: [
      P.fib({
        label: "(a)", marks: 3, stem: "Give the contents of `Points` after the first pass.",
        template: passesStruct[0].after.map((_, i) => `Points[${i + 1}]: {{blank:p${i}}}`).join("\n\n"),
        blanks: passesStruct[0].after.map((v, i) => ({ id: `p${i}`, accepted: [String(v)], input: "number", wrong: String(v + 1) })),
        explanation: `Pass 1: ${list(passesStruct[0].after)}.`,
      }),
      P.num({
        label: "(b)", stem: "State how many times the `REPEAT` loop runs.", value: passesUsedS, wrong: [dataS.length],
        explanation: passesStruct.map((p, i) => `Pass ${i + 1}: ${list(p.after)} (${p.swaps} swaps)`).join("; ") + ".",
        workedSolution: passesStruct.map((p, i) => `${i + 1}. Pass ${i + 1}: ${list(p.after)}, ${p.swaps} swaps.`).join("\n"),
      }),
      P.num({
        label: "(c)", stem: "State the total number of swaps made.", value: swapsTotalS, wrong: [swapsTotalS + 1],
        explanation: `Swaps per pass: ${passesStruct.map((p) => p.swaps).join(" + ")} = ${swapsTotalS}.`,
        workedSolution: `1. Swaps per pass: ${passesStruct.map((p) => p.swaps).join(", ")}.\n2. Total ${swapsTotalS}.`,
      }),
      P.mcq({
        label: "(d)", stem: "Why does the `FOR` loop go to `Last - 1` and not to `Last`?",
        options: [["Each comparison also reads Points[Index + 1]", "Correct: going to Last would read past the end."], ["The last element never needs sorting", "It does; it is reached through Index + 1."], ["To make the sort run in descending order", "Order depends on the comparison operator."], ["Because arrays in pseudocode always start at index 0", "These arrays start at 1."]],
        answer: "A", explanation: "With Index = Last − 1 the pair compared is the last two elements.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain why `Last ← Last - 1` makes the sort more efficient.",
        points: ["After each pass the largest remaining item is in its final position at the end", "so the next pass need not compare it again: fewer comparisons per pass"],
        modelAnswer: "Each pass moves the largest unsorted value into its final place at the end, so the next pass can stop one position earlier, saving one comparison per pass.",
      }),
    ],
    explanation: `Passes: ${passesStruct.map((p) => list(p.after)).join(" → ")}.`,
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, marks: 6, secs: 540,
    hints: ["The loop stops as soon as Found is TRUE.", "What is Index when the name is missing?"],
    stem: `The array \`Learners\` holds:\n\n${arrayMd("Learners", names)}\n\n${fence(searchCode)}`,
    parts: [
      P.num({
        label: "(a)", stem: "The input is \"Sipho\". State the value of `Index` when the loop ends.", value: linear(names, "Sipho").index, wrong: [names.length],
        explanation: `"Sipho" is at position ${linear(names, "Sipho").index}; Index stops there.`,
        workedSolution: `1. Indexes 1 to ${linear(names, "Sipho").index - 1} do not match.\n2. Match at ${linear(names, "Sipho").index}.`,
      }),
      P.num({
        label: "(b)", stem: "The input is \"Thandeka\". State the value of `Index` when the loop ends.", value: names.length + 1, wrong: [names.length],
        explanation: `No match: Index rises to ${names.length + 1} and the test Index <= 6 fails.`,
        workedSolution: `1. All 6 comparisons fail.\n2. Index ← 6 + 1 = ${names.length + 1}; the loop ends.`,
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Write the pseudocode to go after the loop to output a suitable message in each case.",
        points: ["IF Found = TRUE THEN OUTPUT a found message with Index", "ELSE OUTPUT a not-found message, ENDIF"],
        modelAnswer: "```\nIF Found = TRUE\n    THEN\n        OUTPUT Wanted, \" is at position \", Index\n    ELSE\n        OUTPUT Wanted, \" is not in the list\"\nENDIF\n```",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain why a `WHILE` loop with a flag is better here than a `FOR` loop from 1 to 6.",
        points: ["The WHILE loop stops as soon as the name is found", "so fewer comparisons are made / a FOR loop would always check all 6 items"],
        modelAnswer: "The WHILE loop ends as soon as Found becomes TRUE, so if the name is early in the list the remaining items are not checked; a FOR loop would always make all 6 comparisons.",
      }),
    ],
    explanation: `(a) ${linear(names, "Sipho").index}. (b) ${names.length + 1}.`,
  });

  b.card("DEFINITION", "Linear search", "Checks each item in turn from the first until the item is found or the end of the list is reached; works on unsorted data.");
  b.card("DEFINITION", "Bubble sort", "Repeated passes comparing neighbouring items and swapping them if out of order, until a pass makes no swaps.");
  b.card("FACT", "Comparisons in a linear search", "Found at position k: k comparisons. Not in a list of n items: n comparisons.");
  b.card("FACT", "Passes in a bubble sort", "At most n − 1 passes for n items; each pass puts the next largest item in its final place.");
  b.card("CONCEPT", "Swapped flag", "Set FALSE at the start of each pass, TRUE on a swap; still FALSE at the end means sorted, so stop.");
  b.card("CONCEPT", "Swapping two elements", "Temp ← List[i]; List[i] ← List[i + 1]; List[i + 1] ← Temp.");
  b.card("CONCEPT", "Found flag", "Found ← FALSE; WHILE Found = FALSE AND Index <= n … sets Found ← TRUE on a match, else Index ← Index + 1.");
  b.card("CONCEPT", "Ascending vs descending", "Swap when List[i] > List[i + 1] for ascending; use < for descending. Strings sort alphabetically.");
  b.card("FACT", "Inner loop limit", "FOR Index ← 1 TO Last − 1, because each comparison also reads List[Index + 1].");
});
