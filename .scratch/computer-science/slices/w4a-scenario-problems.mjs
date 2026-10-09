// Slice w4a: writing algorithms for scenarios (comp.algorithms.scenario-problems). Values come from JS mirrors.
import { concept, P, CAM, ZIM } from "../lib.mjs";
import { fence, mdTable, sum } from "./w4a-0-kit.mjs";

// 2D array: column totals (days) for a small stock table.
const stock = [
  [4, 7, 2, 5],
  [6, 1, 8, 3],
  [9, 5, 4, 0],
];
const stockMd = mdTable(["Item", "Day 1", "Day 2", "Day 3", "Day 4"], stock.map((r, i) => [String(i + 1), ...r.map(String)]));
const colTotal = (c) => sum(stock.map((r) => r[c]));
const rowTotals = stock.map(sum);
const bestRow = rowTotals.indexOf(Math.max(...rowTotals)) + 1;
const day3 = colTotal(2);
const cell = stock[1][2];

// Mini scenario struct: canteen meals.
const meals = [
  [12, 15, 9],
  [20, 18, 22],
  [7, 11, 10],
  [14, 14, 16],
];
const classes = ["1A", "1B", "2A", "2B"];
const mealTotals = meals.map(sum);
const busiest = classes[mealTotals.indexOf(Math.max(...mealTotals))];
const grand = sum(mealTotals);
const over40 = mealTotals.filter((t) => t > 40).length;
const mealsMd = mdTable(["Class", "Mon", "Tue", "Wed"], meals.map((r, i) => [classes[i], ...r.map(String)]));

const nestedCode = `FOR Item ← 1 TO 3
    ItemTotal ← 0
    FOR Day ← 1 TO 4
        ItemTotal ← ItemTotal + Sold[Item, Day]
    NEXT Day
    OUTPUT "Item ", Item, ": ", ItemTotal
NEXT Item`;

concept("comp.algorithms.scenario-problems", { file: "algorithms/scenario-problems", keyPrefix: "algorithms.scenario-problems" }, (b) => {
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A scenario must store the names of 30 learners and their marks in 4 tests. Which data structures are most suitable?",
    options: [
      ["A 1D array of 30 names and a 2D array of 30 × 4 marks", "Correct: the same index links a learner's name to their row of marks."],
      ["A single variable for the names and one for the marks", "A variable holds only one value at a time."],
      ["A 2D array of 4 × 30 names and a 1D array of 4 marks", "The names need one dimension; the marks need two."],
      ["Four separate 1D arrays of 30 names each", "The names only need storing once."],
    ],
    answer: "A",
    explanation: "Parallel arrays: `Names[1:30]` and `Marks[1:30, 1:4]`, linked by the learner's index.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: "How many elements does the array `DECLARE Sales : ARRAY[1:12, 1:5] OF INTEGER` have?",
    value: 12 * 5,
    wrong: [12 + 5],
    explanation: "12 rows × 5 columns = 60 elements.",
    workedSolution: "1. Rows: 12; columns: 5.\n2. 12 × 5 = 60.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A scenario says \"All inputs must be validated\". What does this require?",
    options: [
      ["Each input repeats until it meets the stated rules, with an error message", "Correct: a validation loop for every input."],
      ["Each input is entered twice and the two compared", "That is double entry, a verification check."],
      ["The arrays are checked to be full before the program starts", "Validation applies to the inputs."],
      ["The output is checked by the user at the end", "That is not input validation."],
    ],
    answer: "A",
    explanation: "Every INPUT needs a loop (REPEAT … UNTIL or WHILE) that rejects values outside the rules and asks again.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which loop is most suitable for processing every element of an array of known size?",
    options: [
      ["A `FOR` loop", "Correct: count-controlled, from the first index to the last."],
      ["A `REPEAT … UNTIL` loop", "Better for repeating until a condition, such as a valid input."],
      ["A `WHILE` loop with a flag", "Better for stopping early, such as in a search."],
      ["An `IF` statement", "IF does not repeat."],
    ],
    answer: "A",
    explanation: "When the number of repetitions is known (the array size), use a count-controlled FOR loop.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Each item needs its own total."],
    stem: `Where should \`ItemTotal ← 0\` go in this algorithm?\n\n${fence(nestedCode.replace("    ItemTotal ← 0\n", ""))}`,
    options: [
      ["Inside the outer loop, just before the inner loop", "Correct: each item's total starts again at 0."],
      ["Before the outer loop", "Then each item's total would include all the earlier items."],
      ["Inside the inner loop, before the addition", "The total would be reset every day."],
      ["After the outer loop", "The totals have already been used by then."],
    ],
    answer: "A",
    explanation: "A per-item total is reset at the start of each item, before its values are added.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    hints: ["The row index comes first, then the column index."],
    stem: "Complete the algorithm, which outputs the total sold of each of 3 items over 4 days from `Sold[1:3, 1:4]`.\n\n```\nFOR Item ← 1 TO [1]\n    ItemTotal ← 0\n    FOR Day ← 1 TO [2]\n        ItemTotal ← ItemTotal + Sold[[3]]\n    NEXT Day\n    OUTPUT \"Item \", Item, \": \", ItemTotal\nNEXT Item\n```",
    template: "[1] {{blank:a}} [2] {{blank:b}} [3] {{blank:c}}",
    blanks: [
      { id: "a", accepted: ["3"], choices: ["3", "4", "12", "Day"] },
      { id: "b", accepted: ["4"], choices: ["4", "3", "12", "Item"] },
      { id: "c", accepted: ["Item, Day"], choices: ["Item, Day", "Day, Item", "Item", "Day"] },
    ],
    explanation: "The outer loop covers the 3 items (rows), the inner loop the 4 days (columns), and each element is Sold[Item, Day].",
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    hints: ["Trace the inner loop for one item at a time."],
    stem: `\`Sold\` holds:\n\n${stockMd}\n\n${fence(nestedCode)}\n\nWhat total is output for item 2?`,
    value: rowTotals[1],
    wrong: [day3],
    explanation: `Item 2: ${stock[1].join(" + ")} = ${rowTotals[1]}.`,
    workedSolution: `1. ItemTotal ← 0 for item 2.\n2. Add Sold[2, 1] to Sold[2, 4]: ${stock[1].join(", ")}.\n3. Total ${rowTotals[1]}.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    hints: ["Fix the column (Day 3) and add down the rows."],
    stem: `Using the same \`Sold\` array:\n\n${stockMd}\n\nWhat is the total of all items sold on **day 3**?`,
    value: day3,
    wrong: [rowTotals[2]],
    explanation: `Day 3 is column 3: ${stock.map((r) => r[2]).join(" + ")} = ${day3}.`,
    workedSolution: `1. Sold[1, 3], Sold[2, 3], Sold[3, 3] = ${stock.map((r) => r[2]).join(", ")}.\n2. Total ${day3}.`,
  });
  b.short({
    d: 2, skill: "APPLICATION",
    stem: `Using the same \`Sold\` array:\n\n${stockMd}\n\nState the value of \`Sold[2, 3]\`.`,
    accepted: [String(cell)],
    rejected: [String(stock[2][1])],
    wrong: [String(stock[2][1])],
    explanation: `Row 2 (item 2), column 3 (day 3): ${cell}. Sold[3, 2] would be ${stock[2][1]}.`,
  });
  b.tf({
    d: 2, skill: "RECALL", applies: CAM,
    stem: "In Cambridge 0478 Paper 2, the 15-mark scenario question may be answered in Python, Visual Basic or Java instead of pseudocode.",
    answer: true,
    explanation: "True. The scenario question may be answered in pseudocode or one of those three languages; the rest of Paper 2 uses pseudocode.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In a scenario answer, the arrays given in the question should be renamed to shorter names to save time.",
    answer: false,
    explanation: "False. Use the given array names and sizes exactly; marks are awarded for using the given data structures.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    hints: ["Which standard method does each requirement need?"],
    stem: "Match each requirement in a scenario to the technique it needs.",
    pairs: [
      ["\"Each mark must be between 0 and 50\"", "A validation loop around the input"],
      ["\"Output the number of learners who passed\"", "A counter increased inside an IF"],
      ["\"Output the name of the top learner\"", "Comparing with the highest so far and storing the index or name"],
      ["\"Output each learner's total\"", "A total reset for each learner and added to in an inner loop"],
    ],
    explanation: "Validation loop; conditional counting; maximum with its position; per-item totalling.",
  });
  b.manualShort({
    d: 3, skill: "CREATION", marks: 3,
    hints: ["What totals, counters and maximum or minimum are needed?"],
    stem: "A scenario stores 25 product names in `Products[1:25]` and their stock levels in `Stock[1:25]`. The program must output the total stock, the number of products with a stock level below 10, and the name of the product with the most stock. Write the declarations and initial values needed before the main loop.",
    points: [
      "Declares (with types) and initialises a total to 0 and a counter to 0",
      "Declares and initialises a variable for the highest stock (to the first value or a value below any possible stock) and one for its name or index",
      "Declares the loop counter as INTEGER (no redeclaration of the given arrays)",
    ],
    explanation: "Plan the data first: every total, counter and maximum needs a starting value.",
    modelAnswer: "```\nDECLARE Index : INTEGER\nDECLARE TotalStock : INTEGER\nDECLARE LowCount : INTEGER\nDECLARE MostStock : INTEGER\nDECLARE MostName : STRING\nTotalStock ← 0\nLowCount ← 0\nMostStock ← -1\nMostName ← \"\"\n```",
  });
  b.manualShort({
    d: 4, skill: "CREATION", marks: 5,
    hints: ["Use the same index for both arrays.", "Initialise before the loop; output after."],
    stem: "Continue the scenario above: write the main loop and the output that use `Products[1:25]` and `Stock[1:25]` to output the total stock, the number of products with stock below 10, and the name of the product with the most stock.",
    points: [
      "FOR loop from 1 to 25 over both arrays using the same index",
      "Adds Stock[Index] to the total inside the loop",
      "IF Stock[Index] < 10 THEN increases the counter by 1",
      "IF Stock[Index] > MostStock THEN stores the new highest stock and Products[Index]",
      "After the loop, outputs the total, the count and the name, each with a message",
    ],
    explanation: "One loop can apply three standard methods to parallel arrays.",
    modelAnswer: "```\nFOR Index ← 1 TO 25\n    TotalStock ← TotalStock + Stock[Index]\n    IF Stock[Index] < 10\n        THEN\n            LowCount ← LowCount + 1\n    ENDIF\n    IF Stock[Index] > MostStock\n        THEN\n            MostStock ← Stock[Index]\n            MostName ← Products[Index]\n    ENDIF\nNEXT Index\nOUTPUT \"Total stock: \", TotalStock\nOUTPUT \"Products with low stock: \", LowCount\nOUTPUT \"Most stock: \", MostName\n```",
  });
  b.manualShort({
    d: 3, skill: "CREATION", marks: 4, applies: ZIM,
    hints: ["Use CASE OF to choose an action; repeat the menu until the user quits."],
    stem: "Farai's Form 4 project needs a menu: 1 to add a record, 2 to search, 3 to print a report, 4 to quit. Write pseudocode that displays the menu, inputs a choice, calls a procedure for options 1 to 3 (`AddRecord`, `SearchRecords`, `PrintReport`), gives a message for an invalid choice, and repeats until 4 is chosen.",
    points: [
      "Outputs the menu options and inputs the choice inside a loop",
      "Uses CASE OF Choice (or IF … ELSE IF) with CALL for options 1, 2 and 3",
      "OTHERWISE / ELSE outputs an error message for an invalid choice (4 handled without an error)",
      "The loop repeats until the choice is 4",
    ],
    explanation: "A menu is a loop around an input and a CASE statement; the loop ends on the quit option.",
    modelAnswer: "```\nREPEAT\n    OUTPUT \"1 Add record  2 Search  3 Report  4 Quit\"\n    INPUT Choice\n    CASE OF Choice\n        1 : CALL AddRecord\n        2 : CALL SearchRecords\n        3 : CALL PrintReport\n        4 : OUTPUT \"Goodbye\"\n        OTHERWISE OUTPUT \"Invalid choice\"\n    ENDCASE\nUNTIL Choice = 4\n```",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, marks: 9, secs: 810, calculator: false,
    hints: ["Each class's total is the sum of its row.", "The busiest class has the largest row total."],
    stem: `A school canteen in Harare records the number of meals sold to each of four classes over three days. The class names are in \`Classes[1:4]\` and the meals in \`Meals[1:4, 1:3]\`:\n\n${mealsMd}`,
    parts: [
      P.num({
        label: "(a)", stem: "State the total meals sold to class 1B over the three days.", value: mealTotals[1], wrong: [sum(meals.map((r) => r[1]))],
        explanation: `${meals[1].join(" + ")} = ${mealTotals[1]}.`,
        workedSolution: `1. Row 2: ${meals[1].join(", ")}.\n2. Total ${mealTotals[1]}.`,
      }),
      P.num({
        label: "(b)", stem: "State the total meals sold to all four classes.", value: grand, wrong: [grand - mealTotals[3]],
        explanation: `Class totals ${mealTotals.join(" + ")} = ${grand}.`,
        workedSolution: `1. Class totals: ${mealTotals.join(", ")}.\n2. Grand total ${grand}.`,
      }),
      P.num({
        label: "(c)", stem: "State how many classes bought more than 40 meals in total.", value: over40, wrong: [over40 + 1],
        explanation: `Totals over 40: ${mealTotals.filter((t) => t > 40).join(", ")}.`,
        workedSolution: `1. Class totals: ${mealTotals.join(", ")}.\n2. Over 40: ${over40}.`,
      }),
      P.short({
        label: "(d)", stem: "State the name of the class that bought the most meals.", accepted: [busiest], wrong: [classes[0]],
        explanation: `${busiest} has the highest total, ${Math.max(...mealTotals)}.`,
      }),
      P.manual({
        label: "(e)", marks: 5,
        stem: "Write pseudocode that uses the two arrays to output each class's name and total, then the name of the class that bought the most meals.",
        points: [
          "Outer FOR loop over the 4 classes",
          "Class total reset to 0 inside the outer loop, before an inner FOR loop over the 3 days",
          "Adds Meals[Class, Day] to the class total inside the inner loop",
          "Outputs Classes[Class] with its total after the inner loop",
          "Keeps the highest total and the class name (initialised before the loops, updated with >) and outputs the name after the loops",
        ],
        modelAnswer: "```\nMost ← -1\nFOR Class ← 1 TO 4\n    ClassTotal ← 0\n    FOR Day ← 1 TO 3\n        ClassTotal ← ClassTotal + Meals[Class, Day]\n    NEXT Day\n    OUTPUT Classes[Class], \": \", ClassTotal\n    IF ClassTotal > Most\n        THEN\n            Most ← ClassTotal\n            MostClass ← Classes[Class]\n    ENDIF\nNEXT Class\nOUTPUT \"Most meals: \", MostClass\n```",
      }),
    ],
    explanation: `Class totals ${mealTotals.join(", ")}; total ${grand}; busiest ${busiest}.`,
  });
  b.struct({
    d: 3, skill: "UNDERSTANDING", examStyle: true, marks: 5, secs: 450,
    hints: ["Which word asks for a check on the input?"],
    stem: "A scenario reads: \"The heights of 40 seedlings in millimetres are input. Each height must be from 1 to 500. Output the average height and the number of seedlings taller than 300 mm.\"",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which statement validates each height?",
        options: [["`REPEAT INPUT Height UNTIL Height >= 1 AND Height <= 500`", "Correct: repeats until valid."], ["`INPUT Height` then `IF Height < 1 OR Height > 500 THEN OUTPUT \"Error\"`", "This rejects one bad value but does not ask again."], ["`REPEAT INPUT Height UNTIL Height < 1 OR Height > 500`", "This repeats until the value is invalid."], ["`WHILE Height >= 1 AND Height <= 500 DO INPUT Height`", "This keeps asking while the value is valid."]],
        answer: "A", explanation: "The loop must end when the value is valid.",
      }),
      P.mcq({
        label: "(b)", stem: "After the loop, which statement calculates the average?",
        options: [["`Average ← Total / 40`", "Correct."], ["`Average ← Total / 500`", "500 is the largest allowed height."], ["`Average ← Tall / 40`", "Tall is the count of seedlings over 300 mm."], ["`Average ← Height / 40`", "Height holds only the last value."]],
        answer: "A", explanation: "Average = total of the 40 heights ÷ 40.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "List the variables you would declare, with their data types and starting values, and say what each is for.",
        points: ["Total (INTEGER or REAL) starting at 0, for the sum of the heights", "Tall (INTEGER) starting at 0, to count heights over 300", "Height (INTEGER/REAL) for each input and Seedling (INTEGER) as the loop counter; Average (REAL) for the result"],
        modelAnswer: "Total : INTEGER, starts at 0, adds up the heights. Tall : INTEGER, starts at 0, counts heights over 300. Height : INTEGER for each input. Seedling : INTEGER loop counter. Average : REAL for the result.",
      }),
    ],
    explanation: "Validation loop; average = Total / 40; Total and Tall start at 0.",
  });

  b.card("CONCEPT", "Scenario method", "List the requirements; plan the data; build: initialise, loop, input + validate, calculate, compare, output; check each requirement.");
  b.card("DEFINITION", "Parallel arrays", "Arrays whose elements at the same index belong to the same item, e.g. Names[i] and Marks[i, 1].");
  b.card("CONCEPT", "2D array loops", "Outer loop over rows (items), inner loop over columns (days, tests): Data[Row, Column].");
  b.card("CONCEPT", "Per-item total", "Reset inside the outer loop, before the inner loop; add in the inner loop; use after the inner loop.");
  b.card("CONCEPT", "All inputs must be validated", "Every INPUT inside a REPEAT … UNTIL (or WHILE) loop with the stated limits and an error message.");
  b.card("FACT", "Use the given arrays", "Use the scenario's array names and sizes exactly; do not redeclare or rename them.");
  b.card("FACT", "Cambridge scenario", "Last question of Paper 2: 15 marks, about 30 minutes; pseudocode, Python, Visual Basic or Java.", undefined, { applies: CAM });
  b.card("CONCEPT", "Output format", "Follow the stated format: ROUND(value, 2) for two decimal places; output names, not indexes, when names are asked for.");
});
