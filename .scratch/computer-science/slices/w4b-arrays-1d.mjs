// Slice w4b: one-dimensional arrays (comp.prog.arrays-1d, Cambridge only).
import { concept, P } from "../lib.mjs";
import { fence, arrayMd, sum } from "./w4b-0-kit.mjs";

const Stock = [14, 9, 31, 22, 6, 17];
const at = (a, i) => a[i - 1];
const over15 = Stock.filter((x) => x > 15).length;
const evenIdx = [2, 4, 6];
const Sales = [5, 13, 8, 21, 16, 11];
const evenSum = sum(evenIdx.map((i) => at(Sales, i)));
const Codes = [4, 6, 1, 3, 2, 5];
const nested = at(Codes, at(Codes, 5));
const Ages = [16, 19, 15, 18, 17];
let comps = 0;
for (const v of Ages) {
  comps++;
  if (v === 18) break;
}
const A = [3, 8, 1, 9, 4];
const shifted = [...A];
for (let i = 1; i <= 4; i++) shifted[i - 1] = shifted[i];
const Towns = ["Harare", "Bulawayo", "Gweru", "Mutare", "Masvingo"];
// Struct: parallel arrays.
const Items = ["Bread", "Milk", "Sugar", "Rice", "Salt"];
const Prices = [1.2, 0.9, 2.5, 3.0, 0.6];
const Qty = [4, 6, 2, 1, 5];
const fmt = (n) => Number(n.toFixed(2));
const lineTotals = Prices.map((p, i) => fmt(p * Qty[i]));
const bill = fmt(sum(lineTotals));
const dearest = Items[Prices.indexOf(Math.max(...Prices))];
// Struct 2: smallest and position.
const Times = [48, 52, 45, 51, 45, 47];
let best = Times[0];
let bestPos = 1;
for (let i = 2; i <= Times.length; i++)
  if (Times[i - 1] < best) {
    best = Times[i - 1];
    bestPos = i;
  }
const under50 = Times.filter((t) => t < 50).length;

concept("comp.prog.arrays-1d", { file: "prog/arrays-1d", keyPrefix: "prog.arrays-1d" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which description best fits an array?",
    options: [
      ["A fixed number of values of the same data type under one identifier", "Correct: elements share a name and type and are reached by index."],
      ["A single variable that can hold a value of any data type", "An array holds many values, all of one type."],
      ["A list of values of different data types stored together under one name", "0478 arrays hold one data type."],
      ["A file of records stored on a disk", "Arrays are held in memory while the program runs."],
    ],
    answer: "A",
    explanation: "An array groups values of one type under one identifier with an index for each.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: "How many elements are in an array declared as `DECLARE Readings : ARRAY[0:24] OF REAL`?",
    value: 24 - 0 + 1,
    wrong: [24],
    explanation: "Indexes 0 to 24 inclusive: 24 − 0 + 1 = 25 elements.",
    workedSolution: "1. Number of elements = upper − lower + 1.\n2. 24 − 0 + 1 = 25.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which statement declares an array to hold the monthly rainfall, in millimetres to one decimal place, for the 12 months of a year?",
    options: [
      ["`DECLARE Rainfall : ARRAY[1:12] OF REAL`", "Correct: twelve elements, each a real number."],
      ["`DECLARE Rainfall : ARRAY[1:12] OF INTEGER`", "Values with one decimal place need REAL."],
      ["`DECLARE Rainfall : ARRAY[12] OF REAL`", "0478 pseudocode states both bounds."],
      ["`DECLARE Rainfall[1:12] : REAL`", "The keyword ARRAY and the OF clause are missing."],
    ],
    answer: "A",
    explanation: "Format: `DECLARE <identifier> : ARRAY[<lower>:<upper>] OF <type>`.",
  });
  b.short({
    d: 2, skill: "APPLICATION", daily: true,
    stem: `The array \`Towns\` holds:\n\n${arrayMd("Towns", Towns)}\n\nWhat is the value of \`Towns[3]\`?`,
    accepted: [at(Towns, 3)],
    wrong: [Towns[3]],
    explanation: `Index 3 holds "${at(Towns, 3)}"; indexes start at 1.`,
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Which statement stores `\"Kariba\"` in the fourth element of the array `Towns`?",
    options: [
      ["`Towns[4] ← \"Kariba\"`", "Correct: the index goes in square brackets after the array name."],
      ["`Towns ← \"Kariba\"`", "Without an index, no single element is chosen."],
      ["`Towns[\"Kariba\"] ← 4`", "The index must be a whole number, and the value goes on the right."],
      ["`4[Towns] ← \"Kariba\"`", "The array name comes before the brackets."],
    ],
    answer: "A",
    explanation: "An element is used like a variable: `ArrayName[Index] ← value`.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["The same index links the two arrays."],
    stem: "`Names[1:30]` and `Marks[1:30]` are parallel arrays. A search has found a learner's name at index `Position`. Which statement outputs that learner's mark?",
    options: [
      ["`OUTPUT Marks[Position]`", "Correct: the same index gives the matching mark."],
      ["`OUTPUT Names[Marks]`", "An array cannot be used as an index."],
      ["`OUTPUT Marks[30]`", "This is the mark of the 30th learner only."],
      ["`OUTPUT Position`", "This outputs the index, not the mark."],
    ],
    answer: "A",
    explanation: "In parallel arrays, element i of every array belongs to the same record.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Every element of a 0478 array has the same data type.",
    answer: true,
    explanation: "True. The data type is given once in the declaration and applies to every element.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Using an index outside the bounds of an array, such as `Marks[31]` for `ARRAY[1:30]`, simply returns 0.",
    answer: false,
    explanation: "False. The element does not exist, so a run-time error occurs.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term to its meaning for `DECLARE Scores : ARRAY[1:20] OF INTEGER`.",
    pairs: [
      ["Element", "One of the 20 integers stored"],
      ["Index", "The position number used to reach one element"],
      ["Lower bound", "The first index, 1"],
      ["Upper bound", "The last index, 20"],
    ],
    explanation: "Elements are the values; the index picks one; the bounds are the first and last indexes.",
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    hints: ["Check each element against the condition."],
    stem: `The array \`Stock\` holds:\n\n${arrayMd("Stock", Stock)}\n\n${fence("Count ← 0\nFOR Index ← 1 TO 6\n    IF Stock[Index] > 15\n        THEN\n            Count ← Count + 1\n    ENDIF\nNEXT Index\nOUTPUT Count")}\n\nWhat is output?`,
    value: over15,
    wrong: [Stock.filter((x) => x >= 14).length],
    explanation: `Values over 15: ${Stock.filter((x) => x > 15).join(", ")}: ${over15}.`,
    workedSolution: `1. Compare each value with 15.\n2. ${Stock.filter((x) => x > 15).join(", ")} pass: Count = ${over15}.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    hints: ["Which indexes does the loop visit?"],
    stem: `The array \`Sales\` holds:\n\n${arrayMd("Sales", Sales)}\n\nWhat is output?\n\n${fence("Total ← 0\nFOR Index ← 2 TO 6 STEP 2\n    Total ← Total + Sales[Index]\nNEXT Index\nOUTPUT Total")}`,
    value: evenSum,
    wrong: [sum(Sales)],
    explanation: `Indexes ${evenIdx.join(", ")} hold ${evenIdx.map((i) => at(Sales, i)).join(", ")}; total ${evenSum}.`,
    workedSolution: `1. Index = ${evenIdx.join(", ")}.\n2. ${evenIdx.map((i) => at(Sales, i)).join(" + ")} = ${evenSum}.`,
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    hints: ["The loop counter is used as the index."],
    stem: "Complete the algorithm, which inputs 20 temperatures into the array `Temps`.\n\n```\nFOR Day ← 1 TO [1]\n    OUTPUT \"Enter temperature for day \", Day\n    INPUT [2]\nNEXT [3]\n```",
    template: "[1] {{blank:a}} [2] {{blank:b}} [3] {{blank:c}}",
    blanks: [
      { id: "a", accepted: ["20"], choices: ["19", "20", "21"] },
      { id: "b", accepted: ["Temps[Day]"], choices: ["Temps[Day]", "Temps", "Temps[20]", "Day[Temps]"] },
      { id: "c", accepted: ["Day"], choices: ["Day", "Temps", "Index"] },
    ],
    explanation: "Loop 1 to 20, input into `Temps[Day]`, close with `NEXT Day`.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["What is the largest index the loop uses?"],
    stem: "`Marks` is declared as `ARRAY[1:30] OF INTEGER`. Why does `FOR Index ← 1 TO 30  OUTPUT Marks[Index + 1]  NEXT Index` cause a run-time error?",
    options: [
      ["The last pass uses Marks[31], which does not exist", "Correct: Index + 1 goes past the upper bound."],
      ["Index + 1 is not allowed as an array index", "An expression can be an index if it stays within the bounds."],
      ["The loop counter should start at 0, not at 1", "Starting at 0 would still reach Marks[31] on the last pass."],
      ["OUTPUT cannot be used to display array elements", "Elements can be output like variables."],
    ],
    answer: "A",
    explanation: "When Index is 30, Index + 1 is 31: out of bounds.",
  });
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    hints: ["Work from the inside out: find Codes[5] first."],
    stem: `The array \`Codes\` holds:\n\n${arrayMd("Codes", Codes)}\n\nWhat is the value of \`Codes[Codes[5]]\`?`,
    value: nested,
    wrong: [at(Codes, 5)],
    explanation: `Codes[5] is ${at(Codes, 5)}, so Codes[Codes[5]] is Codes[${at(Codes, 5)}] = ${nested}.`,
    workedSolution: `1. Inner: Codes[5] = ${at(Codes, 5)}.\n2. Outer: Codes[${at(Codes, 5)}] = ${nested}.`,
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    hints: ["Each element is replaced by the one to its right; the last element is never changed."],
    stem: `The array \`A\` holds:\n\n${arrayMd("A", A)}\n\n${fence("FOR Index ← 1 TO 4\n    A[Index] ← A[Index + 1]\nNEXT Index")}\n\nWhat does \`A\` hold afterwards (indexes 1 to 5)?`,
    options: [
      [shifted.join(", "), "Correct: every element moves one place left and the last value is duplicated."],
      [[...A.slice(1), A[0]].join(", "), "The first value is not moved to the end; it is overwritten."],
      [[A[0], ...A.slice(0, 4)].join(", "), "Elements move left, not right."],
      [A.join(", "), "Each assignment changes an element."],
    ],
    answer: "A",
    explanation: `A[1] ← A[2], A[2] ← A[3], A[3] ← A[4], A[4] ← A[5]: ${shifted.join(", ")}.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    hints: ["The search stops when the value is found."],
    stem: `The array \`Ages\` holds:\n\n${arrayMd("Ages", Ages)}\n\nA linear search that stops as soon as it finds the value looks for 18, starting at index 1. How many elements does it compare with 18?`,
    value: comps,
    wrong: [Ages.length],
    explanation: `18 is at index ${comps}, so ${comps} comparisons are made.`,
    workedSolution: `1. Compare ${Ages.slice(0, comps).join(", ")} in turn.\n2. Found at index ${comps}: ${comps} comparisons.`,
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    hints: ["Compare with 40 separate variables."],
    stem: "A program stores the names of 40 club members. Explain **two** reasons for using an array rather than separate variables.",
    points: [
      "One identifier for all 40 names instead of 40 separate variables, so the code is shorter / clearer",
      "A loop with a variable index can input, output, search or sort every name",
    ],
    explanation: "Arrays group data and make loops possible.",
    modelAnswer: "An array stores all 40 names under one identifier, so there is no need for Name1 to Name40. Because the index can be a variable, one FOR loop can input, output or search all the names.",
  });
  b.manualShort({
    d: 4, skill: "CREATION", marks: 5,
    hints: ["The average is needed before you can count the scores above it, so use two loops."],
    stem: "The array `Scores[1:30]` already holds the scores of 30 players. Write pseudocode that outputs the average score and the number of scores that are above the average.",
    points: [
      "Initialises a total (and counter) to 0",
      "First loop 1 to 30 adds Scores[Index] to the total",
      "Calculates the average as total / 30 after the first loop",
      "Second loop compares each Scores[Index] with the average and counts those greater",
      "Outputs the average and the count with messages",
    ],
    explanation: "Two passes: one to find the average, one to compare with it.",
    modelAnswer: "```\nTotal ← 0\nFOR Index ← 1 TO 30\n    Total ← Total + Scores[Index]\nNEXT Index\nAverage ← Total / 30\nAboveCount ← 0\nFOR Index ← 1 TO 30\n    IF Scores[Index] > Average\n        THEN\n            AboveCount ← AboveCount + 1\n    ENDIF\nNEXT Index\nOUTPUT \"Average score: \", Average\nOUTPUT \"Scores above average: \", AboveCount\n```",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, marks: 8, secs: 720, calculator: false,
    hints: ["The same index links the three arrays.", "Line total = price × quantity."],
    stem: `A grocery shop in Gweru stores an order in three parallel arrays.\n\n| Index | 1 | 2 | 3 | 4 | 5 |\n|:-:|:-:|:-:|:-:|:-:|:-:|\n| Items | ${Items.join(" | ")} |\n| Prices | ${Prices.map((p) => p.toFixed(2)).join(" | ")} |\n| Quantity | ${Qty.join(" | ")} |\n\n${fence("Bill ← 0\nFOR Index ← 1 TO 5\n    Bill ← Bill + Prices[Index] * Quantity[Index]\nNEXT Index\nOUTPUT \"Total: \", Bill")}`,
    parts: [
      P.short({ label: "(a)", stem: "State the value of `Items[4]`.", accepted: [at(Items, 4)], wrong: [Items[4]], explanation: `Index 4 holds "${at(Items, 4)}".` }),
      P.num({ label: "(b)", stem: "State the value of `Prices[2] * Quantity[2]`.", value: lineTotals[1], wrong: [fmt(Prices[1] + Qty[1])], explanation: `${Prices[1]} × ${Qty[1]} = ${lineTotals[1]}.`, workedSolution: `1. Prices[2] = ${Prices[1]}, Quantity[2] = ${Qty[1]}.\n2. ${Prices[1]} × ${Qty[1]} = ${lineTotals[1]}.` }),
      P.num({ label: "(c)", stem: "State the total output.", value: bill, wrong: [fmt(sum(Prices))], explanation: `Line totals ${lineTotals.join(" + ")} = ${bill}.`, workedSolution: `1. Line totals: ${lineTotals.join(", ")}.\n2. Sum: ${bill}.` }),
      P.mcq({
        label: "(d)", stem: "Why are three separate arrays used instead of one?",
        options: [["Each 0478 array holds only one data type", "Correct: names are STRING, prices REAL and quantities INTEGER."], ["An array can hold at most five elements", "Arrays can be much larger."], ["Loops can only process arrays of strings", "Loops can process any array."], ["Arrays cannot be multiplied", "Elements can be used in calculations."]],
        answer: "A", explanation: "Parallel arrays store different data types for the same record, linked by the index.",
      }),
      P.manual({
        label: "(e)", marks: 4, stem: "Write pseudocode that outputs the name of the most expensive item.",
        points: ["Initialises the highest price to Prices[1] and its position to 1", "Loop over the remaining indexes (2 to 5, or 1 to 5)", "IF Prices[Index] > Highest, stores the new price and its index", "Outputs Items[position] after the loop"],
        modelAnswer: "```\nHighest ← Prices[1]\nWhere ← 1\nFOR Index ← 2 TO 5\n    IF Prices[Index] > Highest\n        THEN\n            Highest ← Prices[Index]\n            Where ← Index\n    ENDIF\nNEXT Index\nOUTPUT \"Most expensive: \", Items[Where]\n```",
      }),
    ],
    explanation: `(a) ${at(Items, 4)}; (b) ${lineTotals[1]}; (c) ${bill}; most expensive item: ${dearest}.`,
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, marks: 9, secs: 810, calculator: false,
    hints: ["Only a time that is smaller (not equal) replaces Best.", "Count the times below 50."],
    stem: `The array \`Times\` holds the times, in seconds, of six runners in a 400 m heat at an athletics meeting in Bulawayo.\n\n${arrayMd("Times", Times)}\n\n${fence("Best ← Times[1]\nBestRunner ← 1\nUnder ← 0\nFOR Runner ← 1 TO 6\n    IF Times[Runner] < Best\n        THEN\n            Best ← Times[Runner]\n            BestRunner ← Runner\n    ENDIF\n    IF Times[Runner] < 50\n        THEN\n            Under ← Under + 1\n    ENDIF\nNEXT Runner\nOUTPUT Best, \" \", BestRunner, \" \", Under")}`,
    parts: [
      P.fib({
        label: "(a)", marks: 3, stem: "Complete the output.",
        template: "Best: {{blank:a}}, BestRunner: {{blank:b}}, Under: {{blank:c}}",
        blanks: [
          { id: "a", accepted: [String(best)], input: "number" },
          { id: "b", accepted: [String(bestPos)], input: "number" },
          { id: "c", accepted: [String(under50)], input: "number" },
        ],
        wrong: [[String(best), String(Times.lastIndexOf(best) + 1), String(under50 + 1)]],
        explanation: `The fastest time ${best} first occurs at index ${bestPos}; the second ${best} is not smaller, so BestRunner stays ${bestPos}. Times under 50: ${Times.filter((t) => t < 50).join(", ")} (${under50}).`,
      }),
      P.mcq({
        label: "(b)", stem: "Two runners share the fastest time. Which change makes `BestRunner` hold the **last** of them?",
        options: [["Use `<=` instead of `<` when comparing with Best", "Correct: an equal time now replaces the stored runner."], ["Start the FOR loop at 2 instead of 1", "This only skips comparing element 1 with itself."], ["Initialise Best to 0 instead of Times[1]", "No time is less than 0, so Best would never change."], ["Change `< 50` to `<= 50`", "That affects the count, not the best runner."]],
        answer: "A", explanation: "With <=, a later equal time overwrites the earlier one.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why `Best` is initialised to `Times[1]` rather than to 0.",
        points: ["Starting at 0 means no time is smaller, so Best would stay 0 / the wrong answer", "Times[1] is a real time, so the minimum is always one of the actual values"],
        modelAnswer: "No race time is less than 0, so Best would never change and 0 would be output. Starting with Times[1] guarantees the answer is one of the real times.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "The array `Names[1:6]` holds the runners' names in the same order. Write pseudocode that outputs the names of all runners with a time under 50 seconds.",
        points: ["Loop 1 to 6 over the runners", "IF Times[Index] < 50", "OUTPUT Names[Index] using the same index"],
        modelAnswer: "```\nFOR Runner ← 1 TO 6\n    IF Times[Runner] < 50\n        THEN\n            OUTPUT Names[Runner]\n    ENDIF\nNEXT Runner\n```",
      }),
    ],
    explanation: `Best ${best}, runner ${bestPos}, ${under50} under 50.`,
  });

  b.card("DEFINITION", "Array", "A fixed number of values of one data type under one identifier, each reached by an index.");
  b.card("DEFINITION", "Index", "The position number of an element; in 0478 pseudocode usually starting at 1.");
  b.card("FORMULA", "1D declaration", "DECLARE Names : ARRAY[1:30] OF STRING\nElements = upper − lower + 1.");
  b.card("CONCEPT", "Looping over an array", "FOR Index ← 1 TO n … Array[Index] … NEXT Index visits every element once.");
  b.card("CONCEPT", "Parallel arrays", "Arrays of the same size whose elements at the same index belong to one record, e.g. Names[i] and Marks[i].");
  b.card("FACT", "Out of bounds", "Using an index below the lower or above the upper bound causes a run-time error.");
  b.card("CONCEPT", "Why arrays?", "One identifier for many values; a loop with a variable index processes them all; easy to search and sort.");
  b.card("CONCEPT", "Position of the maximum", "Store the index with the value: IF A[i] > Max THEN Max ← A[i], Where ← i.");
  b.card("FACT", "Index vs value", "In Rainfall[4] = 25, 4 is the index (position) and 25 is the element (value).");
});
