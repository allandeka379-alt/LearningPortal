// Slice w4a: ZIMSEC Paper 2 exam-format items (STRUCTURED, 10 marks, ANALYSIS, ZIMSEC only).
import { concept, P, ZIM } from "../lib.mjs";
import { fence, mdTable, recordTrace, C } from "./w4a-0-kit.mjs";

// ---- Q1: algorithm and flowchart (library fines) ----------------------------------------------------------------
const chart = mdTable(["Box", "Shape", "Text", "Next"], [
  ["1", "Terminator", "START", "2"],
  ["2", "Process", "TotalFines ← 0, Count ← 0", "3"],
  ["3", "Input/Output", "INPUT DaysLate", "4"],
  ["4", "Decision", "DaysLate = -1?", "Yes → 9, No → 5"],
  ["5", "Decision", "DaysLate > 7?", "Yes → 6, No → 7"],
  ["6", "Process", "Fine ← 7 + (DaysLate - 7) * 2", "8"],
  ["7", "Process", "Fine ← DaysLate", "8"],
  ["8", "Process", "TotalFines ← TotalFines + Fine, Count ← Count + 1", "3"],
  ["9", "Input/Output", "OUTPUT TotalFines, \" \", Count", "10"],
  ["10", "Terminator", "STOP", ""],
]);
const fine = (d) => (d > 7 ? 7 + (d - 7) * 2 : d);
const insF = [3, 10, 0, -1];
const usedF = insF.slice(0, insF.indexOf(-1));
const totalF = usedF.reduce((s, d) => s + fine(d), 0);
const countF = usedF.length;
const fine7 = fine(7);
const fine12 = fine(12);

// ---- Q2: trace table (pass count and highest mark) -------------------------------------------------------------
const codeT = `Count ← 0
Highest ← 0
FOR Learner ← 1 TO 5
    INPUT Mark
    IF Mark >= 50
        THEN
            Count ← Count + 1
    ENDIF
    IF Mark > Highest
        THEN
            Highest ← Mark
    ENDIF
NEXT Learner
OUTPUT Count, " ", Highest`;
const insT = [45, 72, 50, 38, 66];
const trT = recordTrace(["Learner", "Mark", "Count", "Highest", "OUTPUT"], (rec) => {
  const s = { Count: 0, Highest: 0 };
  rec(s);
  for (let l = 1; l <= 5; l++) {
    s.Learner = l;
    s.Mark = insT[l - 1];
    if (s.Mark >= 50) s.Count++;
    if (s.Mark > s.Highest) s.Highest = s.Mark;
    rec(s);
  }
  s.OUTPUT = `${s.Count} ${s.Highest}`;
  rec(s);
});
const passT = trT.snaps.slice(1, -1);
const finT = trT.snaps.at(-1);

concept(C("algorithms.flowcharts"), { file: "exam/w4a-zimsec", keyPrefix: "exam.w4a-zimsec", applies: ZIM }, (b) => {
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", secs: 900, calculator: false,
    concepts: [C("algorithms.flowcharts"), C("algorithms.algorithm-basics"), C("algorithms.trace-tables")],
    hints: ["Follow the boxes in order for each input, keeping a running total.", "The arrow from box 8 back to box 3 is the loop."],
    stem: `A school library in Kadoma charges fines on late books. The librarian uses this flowchart, which repeats until -1 is entered:\n\n${chart}`,
    parts: [
      P.manual({
        label: "(a)", marks: 1, stem: "Define the term *algorithm*.",
        points: ["A finite sequence of precise / ordered steps to solve a problem or carry out a task"],
        modelAnswer: "A set of precise steps, in order, that solves a problem and comes to an end.",
      }),
      P.mcq({
        label: "(b)", stem: "Name the flowchart symbol used for box 5.",
        options: [["Decision", "Correct: it asks a Yes/No question."], ["Process", "Process boxes do calculations."], ["Input/Output", "That is used for INPUT and OUTPUT."], ["Terminator", "Terminators are START and STOP."]],
        answer: "A", explanation: "Box 5 asks DaysLate > 7?, so it is a decision (diamond).",
      }),
      P.num({
        label: "(c)", stem: "State the fine for a book that is exactly 7 days late.", value: fine7, wrong: [7 + 0 * 2 + 2],
        explanation: `7 > 7 is No, so box 7 gives Fine = ${fine7}.`,
        workedSolution: `1. Box 5: 7 > 7? No → box 7.\n2. Fine ← 7 = ${fine7}.`,
      }),
      P.fib({
        label: "(d)", marks: 2, stem: `The inputs are ${insF.join(", ")}. Complete the values output.`,
        template: "TotalFines: {{blank:t}}\n\nCount: {{blank:c}}",
        blanks: [
          { id: "t", accepted: [String(totalF)], input: "number", wrong: String(insF.slice(0, -1).reduce((s, x) => s + x, 0)) },
          { id: "c", accepted: [String(countF)], input: "number", wrong: String(countF - 1) },
        ],
        explanation: `${usedF.map((d) => `${d} days → ${fine(d)}`).join("; ")}. TotalFines = ${totalF}; Count = ${countF} (the 0 still counts as a book).`,
      }),
      P.manual({
        label: "(e)", marks: 1, stem: "State the purpose of the flowchart.",
        points: ["To calculate the fine for each late book and output the total of the fines and the number of books (until -1 is entered)"],
        modelAnswer: "It works out the fine for each late book, then outputs the total fines and how many books were entered.",
      }),
      P.manual({
        label: "(f)", marks: 4, stem: "Write pseudocode for the flowchart.",
        points: [
          "Initialises TotalFines and Count to 0, then INPUT DaysLate before the loop",
          "WHILE DaysLate <> -1 DO … ENDWHILE loop, with INPUT DaysLate again at the end of the loop body",
          "IF DaysLate > 7 THEN Fine ← 7 + (DaysLate - 7) * 2 ELSE Fine ← DaysLate ENDIF",
          "Adds Fine to TotalFines and 1 to Count inside the loop; OUTPUT TotalFines and Count after the loop",
        ],
        modelAnswer: "```\nTotalFines ← 0\nCount ← 0\nINPUT DaysLate\nWHILE DaysLate <> -1 DO\n    IF DaysLate > 7\n        THEN\n            Fine ← 7 + (DaysLate - 7) * 2\n        ELSE\n            Fine ← DaysLate\n    ENDIF\n    TotalFines ← TotalFines + Fine\n    Count ← Count + 1\n    INPUT DaysLate\nENDWHILE\nOUTPUT TotalFines, \" \", Count\n```",
      }),
    ],
    explanation: `(c) ${fine7}. (d) ${totalF} and ${countF}. A book 12 days late would be fined ${fine12}.`,
  });

  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", secs: 900, calculator: false,
    concepts: [C("algorithms.trace-tables"), C("algorithms.totalling-counting")],
    hints: ["One row per learner: write the new Count and Highest after each mark.", ">= 50 includes 50."],
    stem: `A teacher in Chinhoyi dry-runs this algorithm.\n\n${fence(codeT)}`,
    parts: [
      P.mcq({
        label: "(a)", stem: "What is a dry run?",
        options: [["Working through an algorithm by hand with test data", "Correct."], ["Running a program for the first time on a computer", "A dry run uses no computer."], ["Removing all the errors from a program", "That is debugging."], ["Translating pseudocode into a programming language", "That is coding."]],
        answer: "A", explanation: "A dry run follows the algorithm by hand, recording values in a trace table.",
      }),
      P.fib({
        label: "(b)", marks: 4, stem: `Complete the trace for the inputs ${insT.join(", ")}, giving Count and Highest after each learner.`,
        template: passT.map((s, i) => `Learner ${i + 1} (Mark ${s.Mark}): Count = {{blank:c${i}}}, Highest = {{blank:h${i}}}`).join("\n\n"),
        blanks: passT.flatMap((s, i) => [
          { id: `c${i}`, accepted: [String(s.Count)], input: "number", wrong: String(s.Count + 1) },
          { id: `h${i}`, accepted: [String(s.Highest)], input: "number", wrong: String(s.Highest + 1) },
        ]),
        explanation: `Trace:\n\n${trT.md}`,
      }),
      P.short({
        label: "(c)", stem: "Write exactly what is output.",
        accepted: [`${finT.Count} ${finT.Highest}`],
        normalise: ["trim", "collapse_whitespace"], wrong: [`${finT.Count - 1} ${finT.Highest}`],
        explanation: `Count = ${finT.Count} and Highest = ${finT.Highest}, separated by a space.`,
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "State the purpose of the algorithm.",
        points: ["Counts how many of the five marks are 50 or more (passes)", "Finds the highest mark and outputs both"],
        modelAnswer: "It inputs five marks, counts how many are passes (50 or more), finds the highest mark, and outputs the number of passes and the highest mark.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain why starting `Highest` at 0 works for these marks, and describe a situation in which it would not work.",
        points: ["Marks are never below 0, so the first mark is always at least as large and replaces / equals it", "It would fail if all the values could be negative (e.g. temperatures below zero): 0 would be output instead of the real highest value"],
        modelAnswer: "Marks cannot be negative, so any real mark is at least 0 and becomes the highest. If the data could all be negative, such as winter temperatures, no value would beat 0 and the output would wrongly be 0.",
      }),
    ],
    explanation: `Output ${finT.Count} ${finT.Highest}.`,
  });
});
