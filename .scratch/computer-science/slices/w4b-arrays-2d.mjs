// Slice w4b: two-dimensional arrays (comp.prog.arrays-2d, Cambridge only).
import { concept, P } from "../lib.mjs";
import { fence, array2Md, sum } from "./w4b-0-kit.mjs";

// Small values (all <= 12) so several items can share the grid without repeating distinctive numbers.
const G = [
  [7, 2, 9],
  [4, 11, 5],
  [3, 8, 6],
];
const g = (r, c) => G[r - 1][c - 1];
const row2 = sum(G[1]);
const col3 = sum(G.map((r) => r[2]));
const over5 = G.flat().filter((x) => x > 5).length;
const diag = g(1, 1) + g(2, 2) + g(3, 3);
// Struct: test marks for 4 learners x 3 tests.
const Marks = [
  [56, 61, 70],
  [82, 77, 90],
  [45, 52, 48],
  [68, 73, 64],
];
const learnerTotals = Marks.map((r) => sum(r));
const bestLearner = learnerTotals.indexOf(Math.max(...learnerTotals)) + 1;
const test2Avg = sum(Marks.map((r) => r[1])) / Marks.length;
// Struct 2: noughts and crosses.
const Board = [
  ["X", "O", "X"],
  ["O", "X", "O"],
  ["O", "X", "X"],
];
const countX = Board.flat().filter((c) => c === "X").length;
const diagWin = Board[0][0] === Board[1][1] && Board[1][1] === Board[2][2];

concept("comp.prog.arrays-2d", { file: "prog/arrays-2d", keyPrefix: "prog.arrays-2d" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "How is one element of a two-dimensional array identified?",
    options: [
      ["By a row index and a column index", "Correct: two indexes, row first in 0478 pseudocode."],
      ["By its value alone", "Several elements can hold the same value."],
      ["By a single index counting every element", "That describes a 1D array."],
      ["By the name of the array alone", "The name refers to the whole array."],
    ],
    answer: "A",
    explanation: "Each element is written `Name[Row, Column]`.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: "How many elements does `DECLARE Seats : ARRAY[1:6, 1:8] OF BOOLEAN` contain?",
    value: 6 * 8,
    wrong: [6 + 8],
    explanation: "6 rows × 8 columns = 48 elements.",
    workedSolution: "1. Rows: 6; columns: 8.\n2. 6 × 8 = 48.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Marks for 25 learners in 9 subjects must be stored as whole numbers, one row per learner. Which declaration is correct?",
    options: [
      ["`DECLARE Marks : ARRAY[1:25, 1:9] OF INTEGER`", "Correct: 25 rows (learners) and 9 columns (subjects)."],
      ["`DECLARE Marks : ARRAY[1:9, 1:25] OF INTEGER`", "This gives one row per subject, not per learner."],
      ["`DECLARE Marks : ARRAY[1:225] OF INTEGER`", "A 1D array loses the learner/subject structure."],
      ["`DECLARE Marks : ARRAY[25, 9] OF INTEGER`", "0478 pseudocode states lower and upper bounds."],
    ],
    answer: "A",
    explanation: "Rows first: `ARRAY[1:25, 1:9]`.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: `The array \`Grid\` holds:\n\n${array2Md("Grid", G)}\n\nWhat is the value of \`Grid[2, 3]\`?`,
    value: g(2, 3),
    wrong: [g(3, 2)],
    explanation: `Row 2, column 3 holds ${g(2, 3)}. (Grid[3, 2] would be ${g(3, 2)}.)`,
    workedSolution: `1. Go to row 2: ${G[1].join(", ")}.\n2. Column 3: ${g(2, 3)}.`,
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In nested loops over a 2D array, the inner loop runs completely for every pass of the outer loop.",
    answer: true,
    explanation: "True. For a 3 × 4 array, the inner loop runs 4 times on each of the 3 outer passes.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In 0478 pseudocode, `Table[4, 2]` means column 4, row 2.",
    answer: false,
    explanation: "False. The first index is the row and the second the column: row 4, column 2.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    hints: ["Row first, then column."],
    stem: `The array \`Grid\` holds:\n\n${array2Md("Grid", G)}\n\nMatch each expression to its value.`,
    pairs: [
      ["`Grid[1, 3]`", String(g(1, 3))],
      ["`Grid[3, 1]`", String(g(3, 1))],
      ["`Grid[2, 2]`", String(g(2, 2))],
      ["`Grid[3, 2] + Grid[1, 2]`", String(g(3, 2) + g(1, 2))],
    ],
    explanation: `Grid[1, 3] = ${g(1, 3)}; Grid[3, 1] = ${g(3, 1)}; Grid[2, 2] = ${g(2, 2)}; ${g(3, 2)} + ${g(1, 2)} = ${g(3, 2) + g(1, 2)}.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    hints: ["Only the column index changes."],
    stem: `Using the array \`Grid\` shown, what is output?\n\n${array2Md("Grid", G)}\n\n${fence("Total ← 0\nFOR Col ← 1 TO 3\n    Total ← Total + Grid[2, Col]\nNEXT Col\nOUTPUT Total")}`,
    value: row2,
    wrong: [sum(G[0])],
    explanation: `Row 2: ${G[1].join(" + ")} = ${row2}.`,
    workedSolution: `1. The row index is fixed at 2.\n2. ${G[1].join(" + ")} = ${row2}.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    hints: ["Here the row index changes and the column index is fixed."],
    stem: `Using the array \`Grid\` shown, what is output?\n\n${array2Md("Grid", G)}\n\n${fence("Total ← 0\nFOR Row ← 1 TO 3\n    Total ← Total + Grid[Row, 3]\nNEXT Row\nOUTPUT Total")}`,
    value: col3,
    wrong: [sum(G[2])],
    explanation: `Column 3: ${G.map((r) => r[2]).join(" + ")} = ${col3}.`,
    workedSolution: `1. The column index is fixed at 3.\n2. ${G.map((r) => r[2]).join(" + ")} = ${col3}.`,
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    hints: ["Rows in the outer loop, columns in the inner loop."],
    stem: "Complete the algorithm, which sets every element of `Board : ARRAY[1:3, 1:3] OF CHAR` to `'-'`.\n\n```\nFOR Row ← 1 TO 3\n    FOR Column ← 1 TO 3\n        [1] ← '-'\n    NEXT [2]\nNEXT [3]\n```",
    template: "[1] {{blank:a}} [2] {{blank:b}} [3] {{blank:c}}",
    blanks: [
      { id: "a", accepted: ["Board[Row, Column]"], choices: ["Board[Row, Column]", "Board[Column, Row]", "Board[3, 3]", "Board"] },
      { id: "b", accepted: ["Column"], choices: ["Row", "Column"] },
      { id: "c", accepted: ["Row"], choices: ["Row", "Column"] },
    ],
    explanation: "Assign `Board[Row, Column]`; the inner loop closes first (`NEXT Column`), then the outer (`NEXT Row`). For a square array `Board[Column, Row]` would also reach every element, but it does not follow the row-column convention of the loops.",
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    hints: ["Check all nine elements."],
    stem: `Using the array \`Grid\` shown, what is output?\n\n${array2Md("Grid", G)}\n\n${fence("Count ← 0\nFOR Row ← 1 TO 3\n    FOR Col ← 1 TO 3\n        IF Grid[Row, Col] > 5\n            THEN\n                Count ← Count + 1\n        ENDIF\n    NEXT Col\nNEXT Row\nOUTPUT Count")}`,
    value: over5,
    wrong: [G.flat().filter((x) => x >= 5).length],
    explanation: `Values over 5: ${G.flat().filter((x) => x > 5).join(", ")}: ${over5}.`,
    workedSolution: `1. Row 1: ${G[0].filter((x) => x > 5).join(", ")}; row 2: ${G[1].filter((x) => x > 5).join(", ")}; row 3: ${G[2].filter((x) => x > 5).join(", ")}.\n2. Count = ${over5}.`,
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    hints: ["Each row needs its own total."],
    stem: `An algorithm should output the total of **each row** of \`Data : ARRAY[1:4, 1:5] OF INTEGER\`.\n\n${fence("// position P\nFOR Row ← 1 TO 4\n    // position Q\n    FOR Col ← 1 TO 5\n        // position R\n        RowTotal ← RowTotal + Data[Row, Col]\n    NEXT Col\n    OUTPUT RowTotal\nNEXT Row")}\n\nWhere should \`RowTotal ← 0\` go?`,
    options: [
      ["Position Q", "Correct: once per row, before that row's values are added."],
      ["Position P", "The total would never reset, giving running totals."],
      ["Position R", "The total would be reset before every addition."],
      ["After `OUTPUT RowTotal`, with no other reset", "Row 1 would start without a value."],
    ],
    answer: "A",
    explanation: "Reset inside the outer loop, before the inner loop.",
  });
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    hints: ["Both indexes are the same variable, so only elements [1,1], [2,2] and [3,3] are used."],
    stem: `Using the array \`Grid\` shown, what is output?\n\n${array2Md("Grid", G)}\n\n${fence("Total ← 0\nFOR Index ← 1 TO 3\n    Total ← Total + Grid[Index, Index]\nNEXT Index\nOUTPUT Total")}`,
    value: diag,
    wrong: [sum(G[0])],
    explanation: `The diagonal: ${g(1, 1)} + ${g(2, 2)} + ${g(3, 3)} = ${diag}.`,
    workedSolution: `1. Grid[1, 1] = ${g(1, 1)}, Grid[2, 2] = ${g(2, 2)}, Grid[3, 3] = ${g(3, 3)}.\n2. Total = ${diag}.`,
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    hints: ["What is the largest row index used?"],
    stem: `\`Readings\` is declared as \`ARRAY[1:2, 1:5] OF REAL\`. Why does this cause a run-time error?\n\n${fence("FOR Row ← 1 TO 5\n    FOR Col ← 1 TO 2\n        OUTPUT Readings[Row, Col]\n    NEXT Col\nNEXT Row")}`,
    options: [
      ["It uses row indexes up to 5, but there are only 2 rows", "Correct: the loop bounds are the wrong way round for the indexes."],
      ["REAL values cannot be output", "Any element can be output."],
      ["The inner loop should be the row loop, not the column loop", "Either order is allowed if the bounds match the indexes."],
      ["2D arrays cannot be processed with FOR loops", "Nested FOR loops are the usual method."],
    ],
    answer: "A",
    explanation: "Readings[3, 1] does not exist. Use rows 1 to 2 and columns 1 to 5, or swap the indexes inside the brackets.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "How many times is the statement inside the inner loop executed?\n\n```\nFOR Row ← 1 TO 3\n    FOR Col ← 1 TO 4\n        Total ← Total + Table[Row, Col]\n    NEXT Col\nNEXT Row\n```",
    options: [
      [String(3 * 4), "Correct: 4 inner passes for each of 3 rows."],
      [String(3 + 4), "The counts are multiplied, not added."],
      ["4", "The inner loop runs 4 times on each of the 3 outer passes."],
      ["3", "That is only the number of outer passes."],
    ],
    answer: "A",
    explanation: "3 × 4 = 12 executions.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Which index stays the same, and which is at its upper bound?"],
    stem: "`Data` is declared as `ARRAY[1:5, 1:8] OF INTEGER`. Which expression gives the element in the **last column** of row `R`?",
    options: [
      ["`Data[R, 8]`", "Correct: row R, column 8 (the upper bound of the columns)."],
      ["`Data[8, R]`", "This is row 8, which does not exist."],
      ["`Data[R, 5]`", "5 is the number of rows, not the last column."],
      ["`Data[5, 8]`", "This is the last column of row 5 only."],
    ],
    answer: "A",
    explanation: "Keep the row index R and use the column upper bound, 8.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    hints: ["Think about keeping data for several weeks and several shops together."],
    stem: "A shop records daily sales for 4 tills over 7 days. Explain why a 2D array is more suitable than four separate 1D arrays.",
    points: [
      "One identifier holds the whole table / the till number becomes an index",
      "Nested loops can process all the data (e.g. totals per till or per day) without repeating code for each array",
    ],
    explanation: "A 2D array keeps the table's shape under one name.",
    modelAnswer: "With `Sales : ARRAY[1:4, 1:7]` the till is the row index, so one pair of nested loops can total each till or each day. Four 1D arrays would need four copies of every loop.",
  });
  b.manualShort({
    d: 4, skill: "CREATION", marks: 6,
    hints: ["Average per day: reset a day total inside the outer loop.", "The overall highest can start at Temps[1, 1]."],
    stem: "The array `Temps[1:7, 1:3]` already holds three temperature readings (columns) for each of the 7 days of a week (rows). Write pseudocode that outputs the average temperature for each day and then the highest reading of the week.",
    points: [
      "Outer loop for the 7 days and inner loop for the 3 readings",
      "Day total reset to 0 inside the outer loop before the inner loop",
      "Adds Temps[Day, Reading] to the day total in the inner loop",
      "Outputs the day total / 3 with the day number after the inner loop",
      "Highest initialised (e.g. to Temps[1, 1]) before the loops and updated when Temps[Day, Reading] is greater",
      "Outputs the highest after both loops",
    ],
    explanation: "Row averages and an overall maximum in one nested loop.",
    modelAnswer: "```\nHighest ← Temps[1, 1]\nFOR Day ← 1 TO 7\n    DayTotal ← 0\n    FOR Reading ← 1 TO 3\n        DayTotal ← DayTotal + Temps[Day, Reading]\n        IF Temps[Day, Reading] > Highest\n            THEN\n                Highest ← Temps[Day, Reading]\n        ENDIF\n    NEXT Reading\n    OUTPUT \"Day \", Day, \" average: \", DayTotal / 3\nNEXT Day\nOUTPUT \"Highest reading: \", Highest\n```",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, marks: 8, secs: 720, calculator: false,
    hints: ["Each row is a learner; each column is a test.", "A column average divides by the number of learners."],
    stem: `A teacher in Mutare stores the marks of 4 learners (rows) in 3 tests (columns) in \`Marks : ARRAY[1:4, 1:3] OF INTEGER\`.\n\n${array2Md("Marks", Marks)}`,
    parts: [
      P.num({ label: "(a)", stem: "State the value of `Marks[3, 2]`.", value: Marks[2][1], wrong: [Marks[1][2]], explanation: `Row 3, column 2: ${Marks[2][1]}.`, workedSolution: `1. Row 3: ${Marks[2].join(", ")}.\n2. Column 2: ${Marks[2][1]}.` }),
      P.num({ label: "(b)", stem: "State the total of row 2.", value: learnerTotals[1], wrong: [sum(Marks.map((r) => r[1]))], explanation: `${Marks[1].join(" + ")} = ${learnerTotals[1]}.`, workedSolution: `1. Row 2: ${Marks[1].join(", ")}.\n2. Total ${learnerTotals[1]}.` }),
      P.num({ label: "(c)", stem: "State the average mark in test 2 (column 2).", value: test2Avg, wrong: [learnerTotals[1] / 3], explanation: `(${Marks.map((r) => r[1]).join(" + ")}) / 4 = ${test2Avg}.`, workedSolution: `1. Column 2: ${Marks.map((r) => r[1]).join(" + ")} = ${sum(Marks.map((r) => r[1]))}.\n2. ÷ 4 = ${test2Avg}.` }),
      P.mcq({
        label: "(d)", stem: "Which loop structure visits the elements in the order [1,1], [2,1], [3,1], [4,1], [1,2], …?",
        options: [["Outer loop over columns, inner loop over rows", "Correct: the row index changes fastest."], ["Outer loop over rows, inner loop over columns", "That order is [1,1], [1,2], [1,3], [2,1] …"], ["A single loop from 1 to 12", "A single counter cannot give both indexes directly."], ["Two separate loops, one after the other", "Separate loops do not visit pairs of indexes."]],
        answer: "A", explanation: "The inner loop's counter changes fastest.",
      }),
      P.manual({
        label: "(e)", marks: 4, stem: "Write pseudocode that outputs the number (row index) of the learner with the highest total over the three tests.",
        points: ["Outer loop over the 4 learners with the total reset to 0 for each learner", "Inner loop (or three additions) adding Marks[Learner, Test] to the total", "Compares each total with the best so far and stores the total and the row index", "Outputs the stored row index after the loops"],
        modelAnswer: "```\nBestTotal ← -1\nBestLearner ← 0\nFOR Learner ← 1 TO 4\n    Total ← 0\n    FOR Test ← 1 TO 3\n        Total ← Total + Marks[Learner, Test]\n    NEXT Test\n    IF Total > BestTotal\n        THEN\n            BestTotal ← Total\n            BestLearner ← Learner\n    ENDIF\nNEXT Learner\nOUTPUT \"Best learner: \", BestLearner\n```",
      }),
    ],
    explanation: `(a) ${Marks[2][1]}; (b) ${learnerTotals[1]}; (c) ${test2Avg}; best learner is row ${bestLearner}.`,
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, marks: 9, secs: 810,
    hints: ["Count every 'X' in all nine cells.", "A diagonal uses Board[1,1], Board[2,2], Board[3,3]."],
    stem: `A noughts and crosses game stores the board in \`Board : ARRAY[1:3, 1:3] OF CHAR\`.\n\n${array2Md("Board", Board.map((r) => r.map((c) => `'${c}'`)))}`,
    parts: [
      P.num({ label: "(a)", stem: "How many elements hold `'X'`?", value: countX, wrong: [countX - 1], explanation: `Rows: ${Board.map((r) => r.filter((c) => c === "X").length).join(" + ")} = ${countX}.`, workedSolution: `1. Count X in each row: ${Board.map((r) => r.filter((c) => c === "X").length).join(", ")}.\n2. Total ${countX}.` }),
      P.short({ label: "(b)", stem: "State the value of `Board[3, 1]`.", accepted: ["O", "'O'"], normalise: ["trim", "strip_punctuation", "lowercase"], wrong: ["X"], explanation: `Row 3, column 1 holds '${Board[2][0]}'.` }),
      P.tf({ label: "(c)", stem: "The condition `Board[1, 1] = Board[2, 2] AND Board[2, 2] = Board[3, 3]` is TRUE for this board.", answer: diagWin, explanation: `Board[1, 1], Board[2, 2] and Board[3, 3] are all '${Board[0][0]}', so the condition is ${diagWin ? "TRUE" : "FALSE"}: X has won on the diagonal.` }),
      P.manual({
        label: "(d)", marks: 6, stem: "Write a function `RowWin(Symbol : CHAR) RETURNS BOOLEAN` that returns TRUE if any row of `Board` holds `Symbol` in all three columns.",
        points: [
          "Function header with the parameter, RETURNS BOOLEAN and ENDFUNCTION",
          "Loop over the 3 rows",
          "Checks all three columns of the row against Symbol (inner loop with a counter or a three-part AND)",
          "Uses Board[Row, Column] with the correct index order",
          "Returns TRUE when a complete row is found",
          "Returns FALSE when no row matches (after the loop)",
        ],
        modelAnswer: "```\nFUNCTION RowWin(Symbol : CHAR) RETURNS BOOLEAN\n    DECLARE Row : INTEGER\n    DECLARE Found : BOOLEAN\n    Found ← FALSE\n    FOR Row ← 1 TO 3\n        IF Board[Row, 1] = Symbol AND Board[Row, 2] = Symbol AND Board[Row, 3] = Symbol\n            THEN\n                Found ← TRUE\n        ENDIF\n    NEXT Row\n    RETURN Found\nENDFUNCTION\n```",
      }),
    ],
    explanation: `${countX} X symbols; Board[3, 1] = '${Board[2][0]}'; the diagonal condition is ${diagWin}.`,
  });

  b.card("DEFINITION", "2D array", "An array of rows and columns, each element identified by a row index and a column index.");
  b.card("FORMULA", "2D declaration", "DECLARE Sales : ARRAY[1:3, 1:4] OF INTEGER (3 rows, 4 columns, 12 elements).");
  b.card("FACT", "Index order", "Name[Row, Column]: the row index comes first.");
  b.card("CONCEPT", "Nested loops", "Outer loop over rows, inner over columns; the inner loop runs fully for each row.");
  b.card("CONCEPT", "Row totals", "Reset the total inside the outer loop, before the inner loop; output it after the inner loop.");
  b.card("CONCEPT", "Column totals", "Swap the loops (columns outer, rows inner) but keep Name[Row, Column] inside the brackets.");
  b.card("FORMULA", "Number of elements", "rows × columns, e.g. ARRAY[1:6, 1:8] has 48.");
  b.card("CONCEPT", "Diagonal", "FOR i ← 1 TO n … Grid[i, i] visits the top-left to bottom-right diagonal of a square array.");
});
