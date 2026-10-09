// Slice w4b: ZIMSEC Paper 2 exam-format items (STRUCTURED, 10 marks, ANALYSIS, ZIM): selection and loops; subroutines and testing.
import { concept, P, ZIM } from "../lib.mjs";
import { fence, C } from "./w4b-0-kit.mjs";

// Item 1: electricity token algorithm (selection inside a loop).
const codeTokens = `Total ← 0
Count ← 0
INPUT Units
WHILE Units <> 0 DO
    IF Units <= 50
        THEN
            Cost ← Units * 2
        ELSE
            Cost ← 100 + (Units - 50) * 3
    ENDIF
    OUTPUT Cost
    Total ← Total + Cost
    Count ← Count + 1
    INPUT Units
ENDWHILE
OUTPUT Total, " ", Count`;
const units = [30, 80, 50, 0];
const tokenCost = (u) => (u <= 50 ? u * 2 : 100 + (u - 50) * 3);
const costs = units.slice(0, -1).map(tokenCost);
const tTotal = costs.reduce((s, x) => s + x, 0);
const tCount = costs.length;

// Item 2: grade function with test data.
const codeGrade = `FUNCTION Grade(Mark : INTEGER) RETURNS CHAR
    DECLARE Result : CHAR
    IF Mark >= 70
        THEN
            Result ← 'A'
        ELSE
            IF Mark >= 55
                THEN
                    Result ← 'B'
                ELSE
                    Result ← 'C'
            ENDIF
    ENDIF
    RETURN Result
ENDFUNCTION`;
const grade = (m) => (m >= 70 ? "A" : m >= 55 ? "B" : "C");
const gMarks = [83, 55, 54];
const gRes = gMarks.map(grade);
if (gRes.join("") !== "ABC") throw new Error("grades");
const testRows = [
  [62, "normal"],
  [70, "boundary"],
  [-8, "abnormal"],
];

concept(C("prog.selection"), { file: "exam/w4b-zimsec", keyPrefix: "exam.w4b-zimsec", applies: ZIM }, (b) => {
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", secs: 900, calculator: false,
    concepts: [C("prog.selection"), C("prog.iteration")],
    hints: ["The loop stops when 0 is input; 0 is not processed.", "50 units exactly uses the first branch."],
    stem: `A power utility sells prepaid electricity tokens. A clerk in Bulawayo uses this algorithm to work out the cost of each customer's units; an input of 0 ends the day.\n\n${fence(codeTokens)}`,
    parts: [
      P.mcq({
        label: "(a)", stem: "State the type of loop used in the algorithm.",
        options: [["Pre-condition loop", "Correct: WHILE tests its condition before each pass."], ["Post-condition loop", "That is REPEAT … UNTIL, which tests at the end."], ["Count-controlled loop", "The number of passes is not fixed in advance."], ["Nested loop", "There is only one loop."]],
        answer: "A", explanation: "WHILE … DO … ENDWHILE is a pre-condition loop.",
      }),
      P.fib({
        label: "(b)", marks: 3, stem: `The inputs are ${units.join(", ")}. Complete the values of \`Cost\` that are output.`,
        template: units.slice(0, -1).map((u, i) => `Units = ${u}: Cost = {{blank:c${i}}}`).join("\n\n"),
        blanks: costs.map((c, i) => ({ id: `c${i}`, accepted: [String(c)], input: "number" })),
        wrong: [costs.map((c, i) => String(i === 1 ? units[1] * 3 : c + 1))],
        explanation: `${units[0]} × 2 = ${costs[0]}; 100 + (${units[1]} − 50) × 3 = ${costs[1]}; ${units[2]} is not over 50, so ${units[2]} × 2 = ${costs[2]}.`,
      }),
      P.num({
        label: "(c)", marks: 2, stem: "State the value of `Total` that is output at the end.",
        value: tTotal, wrong: [tTotal + tokenCost(0)],
        explanation: `${costs.join(" + ")} = ${tTotal}.`,
        workedSolution: `1. Costs: ${costs.join(", ")}.\n2. Total = ${tTotal}; Count = ${tCount} (the final 0 is not counted).`,
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain why a WHILE loop is more suitable here than a FOR loop.",
        points: ["The number of customers in a day is not known in advance", "The loop must stop when the rogue value 0 is input / it may not run at all if 0 is input first"],
        modelAnswer: "The clerk does not know how many customers will come, so a count-controlled FOR loop cannot be set up. A WHILE loop keeps going until the rogue value 0 is entered, and does not run at all if 0 is entered first.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Customers who buy more than 200 units pay a fixed 500 instead. Write the pseudocode needed and state where it goes.",
        points: ["IF Units > 200 THEN Cost ← 500 (an extra condition)", "Placed so that it is tested before (or overrides) the other branches, e.g. as the first test of a nested IF, before OUTPUT Cost"],
        modelAnswer: "Add before `OUTPUT Cost` (after the existing IF):\n\n```\nIF Units > 200\n    THEN\n        Cost ← 500\nENDIF\n```",
      }),
    ],
    explanation: `Costs ${costs.join(", ")}; Total ${tTotal}; Count ${tCount}.`,
  });

  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", secs: 900, calculator: false,
    concepts: [C("prog.subroutines"), C("prog.selection")],
    hints: ["Test the conditions in order.", "Boundary data is on the edge of a range; abnormal data should be rejected."],
    stem: `A school in Masvingo uses this function in its report program.\n\n${fence(codeGrade)}`,
    parts: [
      P.mcq({
        label: "(a)", stem: "Why is `Grade` written as a function rather than a procedure?",
        options: [["It sends one value back to where it is called", "Correct: the grade is sent back with RETURN."], ["It has a parameter called Mark", "Procedures can have parameters too."], ["It contains a nested IF statement", "Procedures can contain IF statements."], ["It can only be called once in a program", "Functions can be called many times."]],
        answer: "A", explanation: "A function returns one value and is used in an expression.",
      }),
      P.fib({
        label: "(b)", marks: 3, stem: "State the value returned by each call.",
        template: gMarks.map((m, i) => `\`Grade(${m})\`: {{blank:g${i}}}`).join("\n\n"),
        blanks: gMarks.map((m, i) => ({ id: `g${i}`, accepted: [gRes[i]], choices: ["A", "B", "C"] })),
        explanation: `${gMarks[0]} >= 70 gives A; ${gMarks[1]} >= 55 gives B; ${gMarks[2]} is below 55, giving C.`,
      }),
      P.fib({
        label: "(c)", marks: 2, stem: "Marks must be from 0 to 100. Classify each test value.",
        template: testRows.slice(1).map(([v], i) => `${v}: {{blank:t${i}}}`).join("\n\n"),
        blanks: testRows.slice(1).map(([, type], i) => ({ id: `t${i}`, accepted: [type], choices: ["normal", "boundary", "abnormal"] })),
        explanation: "70 is on the edge of the A band (boundary); -8 is outside 0 to 100 and should be rejected (abnormal).",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "`Result` is a local variable. Explain what this means and why it is good practice.",
        points: ["It is declared inside the function and can only be used there / exists only while the function runs", "The function cannot accidentally change data elsewhere / can be tested and reused on its own"],
        modelAnswer: "Result is declared inside Grade, so it exists only while the function runs and the main program cannot see it. This means the function cannot interfere with other variables and can be tested and reused independently.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Write one statement that outputs the grade for the mark stored in `TestMark`, using the function.",
        points: ["Calls Grade(TestMark) inside an OUTPUT (no CALL keyword)", "Includes a suitable message"],
        modelAnswer: "`OUTPUT \"Grade: \", Grade(TestMark)`",
      }),
    ],
    explanation: `Grades ${gRes.join(", ")}; 70 is boundary data and -8 abnormal.`,
  });
});
