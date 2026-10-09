// Slice w4a: trace tables and dry runs (comp.algorithms.trace-tables). Every trace comes from a JS mirror.
import { concept, P, CAM } from "../lib.mjs";
import { fence, recordTrace, arrayMd } from "./w4a-0-kit.mjs";

const DIV = (a, b) => Math.floor(a / b);

// A: WHILE with multiplication.
const codeA = `X ← 1
Y ← 0
WHILE X < 20 DO
    Y ← Y + X
    X ← X * 3
ENDWHILE
OUTPUT Y`;
const trA = recordTrace(["X", "Y", "OUTPUT"], (rec) => {
  const s = { X: 1, Y: 0 };
  rec(s);
  while (s.X < 20) {
    s.Y += s.X;
    s.X *= 3;
    rec(s);
  }
  s.OUTPUT = String(s.Y);
  rec(s);
});
const finA = trA.snaps[trA.snaps.length - 1];
const passesA = trA.snaps.length - 2;
const ysA = trA.snaps.slice(1, -1).map((s) => s.Y);
const xsA = trA.snaps.slice(1, -1).map((s) => s.X);

// B: REPEAT summing multiples of 3 until 0.
const codeB = `Total ← 0
REPEAT
    OUTPUT "Enter a number, 0 to stop"
    INPUT Number
    IF MOD(Number, 3) = 0
        THEN
            Total ← Total + Number
    ENDIF
UNTIL Number = 0
OUTPUT Total`;
const runB = (ins) => {
  let t = 0;
  let k = 0;
  let n;
  let prompts = 0;
  do {
    prompts++;
    n = ins[k++];
    if (n % 3 === 0) t += n;
  } while (n !== 0);
  return { total: t, prompts };
};
const inB = [6, 4, 9, 0];
const rB = runB(inB);
const inB2 = [12, 5, 7, 15, 0];
const rB2 = runB(inB2);

// D: digit reversal.
const codeD = `INPUT Number
Reverse ← 0
WHILE Number > 0 DO
    Digit ← MOD(Number, 10)
    Reverse ← Reverse * 10 + Digit
    Number ← DIV(Number, 10)
ENDWHILE
OUTPUT Reverse`;
const traceD = (input) =>
  recordTrace(["Number", "Digit", "Reverse", "OUTPUT"], (rec) => {
    const s = { Number: input, Reverse: 0 };
    rec(s);
    while (s.Number > 0) {
      s.Digit = s.Number % 10;
      s.Reverse = s.Reverse * 10 + s.Digit;
      s.Number = DIV(s.Number, 10);
      rec(s);
    }
    s.OUTPUT = String(s.Reverse);
    rec(s);
  });
const inD1 = 352;
const trD1 = traceD(inD1);
const outD1 = trD1.snaps.at(-1).Reverse;
const inD2 = 4096;
const trD2 = traceD(inD2);
const passD2 = trD2.snaps.slice(1, -1);
const outD2 = trD2.snaps.at(-1).Reverse;

// E: FOR with negative STEP.
const outE = [];
for (let i = 10; i >= 1; i -= 3) outE.push(i);

// F: count a letter (Cambridge string handling).
const word = "banana";
const countA = [...word].filter((c) => c === "a").length;

// G: array largest with index (trace to purpose).
const valsG = [15, 22, 8, 22, 19];
const codeG = `Best ← Scores[1]
Where ← 1
FOR Index ← 2 TO 5
    IF Scores[Index] > Best
        THEN
            Best ← Scores[Index]
            Where ← Index
    ENDIF
NEXT Index
OUTPUT Where`;
let bestG = valsG[0];
let whereG = 1;
let changesG = 0;
for (let i = 2; i <= 5; i++)
  if (valsG[i - 1] > bestG) {
    bestG = valsG[i - 1];
    whereG = i;
    changesG++;
  }

// H: nested IF with three inputs (struct).
const codeH = `Total ← 0
Count ← 0
FOR Day ← 1 TO 4
    OUTPUT "Enter rainfall in mm"
    INPUT Rain
    IF Rain > 0
        THEN
            Total ← Total + Rain
            Count ← Count + 1
    ENDIF
NEXT Day
OUTPUT Count, " wet days, total ", Total`;
const inH = [12, 0, 7, 20];
const trH = recordTrace(["Day", "Rain", "Total", "Count", "OUTPUT"], (rec) => {
  const s = { Total: 0, Count: 0 };
  rec(s);
  for (let d = 1; d <= 4; d++) {
    s.Day = d;
    s.OUTPUT = "Enter rainfall in mm";
    rec(s);
    s.OUTPUT = undefined;
    s.Rain = inH[d - 1];
    if (s.Rain > 0) {
      s.Total += s.Rain;
      s.Count += 1;
    }
    rec(s);
  }
  s.OUTPUT = `${s.Count} wet days, total ${s.Total}`;
  rec(s);
});
const finH = trH.snaps.at(-1);
const promptsH = trH.snaps.filter((s) => s.OUTPUT === "Enter rainfall in mm").length;

concept("comp.algorithms.trace-tables", { file: "algorithms/trace-tables", keyPrefix: "algorithms.trace-tables" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **dry run** of an algorithm?",
    options: [
      ["Working through it by hand with test data, one step at a time", "Correct: no computer is used."],
      ["Running the program for the first time on a computer", "A dry run is done without a computer."],
      ["Translating the algorithm into machine code", "That is the job of a translator."],
      ["Checking the spelling of every keyword in the algorithm", "That would only find syntax errors."],
    ],
    answer: "A",
    explanation: "A dry run follows the algorithm by hand with chosen data, recording the values in a trace table.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which columns should a trace table have?",
    options: [
      ["One for each variable and one for the output", "Correct: every change and every output is recorded."],
      ["One for each line number of the algorithm", "Lines are not columns; variables are."],
      ["Only one column, for the final output", "Every variable's changes must be recorded."],
      ["One for each input and one for the line number", "Inputs are stored in variables, which get the columns."],
    ],
    answer: "A",
    explanation: "A trace table has a column for each variable plus OUTPUT; prompts are written in the OUTPUT column.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In a trace table, a prompt such as \"Enter a number\" is recorded in the OUTPUT column.",
    answer: true,
    explanation: "True. A prompt is displayed on screen, so it is an output; Cambridge expects prompts to appear in the trace.",
  });
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: `What is output by this algorithm?\n\n${fence(codeA)}`,
    value: finA.Y,
    wrong: [finA.X],
    explanation: `X takes the values 1, ${xsA.join(", ")}; Y becomes ${ysA.join(", ")}. The loop stops when X = ${finA.X}, so ${finA.Y} is output.`,
    workedSolution: trA.md,
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    hints: ["Count the passes: the condition is tested before each one."],
    stem: `How many times is the body of the \`WHILE\` loop carried out?\n\n${fence(codeA)}`,
    value: passesA,
    wrong: [passesA + 1],
    explanation: `The body runs with X = 1, 3 and 9; when X = ${finA.X} the test X < 20 is false, so there are ${passesA} passes.`,
    workedSolution: `1. Passes start with X = ${[1, ...xsA.slice(0, -1)].join(", ")}.\n2. X = ${finA.X} fails the test.\n3. ${passesA} passes.`,
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    hints: ["Only multiples of 3 are added.", "0 is a multiple of 3 but adds nothing."],
    stem: `Dry-run this algorithm with the inputs ${inB.join(", ")}.\n\n${fence(codeB)}`,
    template: "The value output is {{blank:a}}. The prompt is displayed {{blank:b}} times.",
    blanks: [
      { id: "a", accepted: [String(rB.total)], input: "number", wrong: String(inB.reduce((s, x) => s + x, 0)) },
      { id: "b", accepted: [String(rB.prompts)], input: "number", wrong: String(rB.prompts - 1) },
    ],
    explanation: `${inB.filter((n) => n % 3 === 0 && n).join(" + ")} = ${rB.total}. The REPEAT loop runs once per input, including the 0, so the prompt appears ${rB.prompts} times.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    hints: ["Check each input with MOD(Number, 3)."],
    stem: `What is output by this algorithm when the inputs are ${inB2.join(", ")}?\n\n${fence(codeB)}`,
    value: rB2.total,
    wrong: [inB2.reduce((s, x) => s + x, 0)],
    explanation: `Only ${inB2.filter((n) => n % 3 === 0 && n).join(" and ")} are multiples of 3: ${rB2.total}.`,
    workedSolution: `1. MOD(n, 3) = 0 for ${inB2.filter((n) => n % 3 === 0).join(", ")}.\n2. Total = ${inB2.filter((n) => n % 3 === 0).join(" + ")} = ${rB2.total}.`,
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    hints: ["Each pass takes the last digit with MOD and removes it with DIV."],
    stem: `Complete the trace of this algorithm for the input ${inD1}, giving the values at the end of each pass of the loop.\n\n${fence(codeD)}`,
    template: trD1.snaps.slice(1, -1).map((s, i) => `Pass ${i + 1}: Digit = {{blank:d${i}}}, Reverse = {{blank:r${i}}}`).join("\n\n"),
    blanks: trD1.snaps.slice(1, -1).flatMap((s, i) => [
      { id: `d${i}`, accepted: [String(s.Digit)], input: "number", wrong: String(s.Digit + 1) },
      { id: `r${i}`, accepted: [String(s.Reverse)], input: "number", wrong: String(s.Reverse + 1) },
    ]),
    explanation: `Trace:\n\n${trD1.md}`,
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: [`Compare the input ${inD1} with the output ${outD1}.`],
    stem: `State the purpose of this algorithm.\n\n${fence(codeD)}`,
    options: [
      ["To output the digits of a whole number in reverse order", `Correct: ${inD1} gives ${outD1}.`],
      ["To add up the digits of a whole number", `Adding the digits of ${inD1} would give ${[...String(inD1)].reduce((s, c) => s + Number(c), 0)}.`],
      ["To count how many digits a whole number has", "Reverse is built from the digits, not counted."],
      ["To check whether a whole number is a palindrome", "Nothing is compared; the reversed number is just output."],
    ],
    answer: "A",
    explanation: "Each pass removes the last digit and appends it to Reverse, so the digits come out in reverse order.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: `What is output by this algorithm?\n\n${fence(`FOR Index ← 10 TO 1 STEP -3\n    OUTPUT Index\nNEXT Index`)}`,
    options: [
      [outE.join(", "), "Correct: it counts down in threes and 1 is still within the range."],
      [outE.slice(0, -1).join(", "), "1 is not below the end value, so it is output too."],
      ["10, 7, 4, 1, -2", "-2 is below the end value 1, so the loop has stopped."],
      ["1, 4, 7, 10", "The loop starts at 10 and counts down."],
    ],
    answer: "A",
    explanation: `Index takes ${outE.join(", ")}; the next value, ${outE.at(-1) - 3}, is past the end value, so the loop stops.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", applies: CAM,
    hints: ["SUBSTRING(Word, Position, 1) is one character."],
    stem: `What is output by this algorithm?\n\n${fence(`Word ← "${word}"\nCount ← 0\nFOR Position ← 1 TO LENGTH(Word)\n    IF SUBSTRING(Word, Position, 1) = "a"\n        THEN\n            Count ← Count + 1\n    ENDIF\nNEXT Position\nOUTPUT Count`)}`,
    value: countA,
    wrong: [word.length],
    explanation: `The loop checks each of the ${word.length} characters; "a" appears ${countA} times.`,
    workedSolution: `1. Characters: ${[...word].join(", ")}.\n2. Count the "a"s: ${countA}.`,
  });
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    hints: ["The test uses > not >=: does an equal value replace Best?"],
    stem: `The array \`Scores\` holds:\n\n${arrayMd("Scores", valsG)}\n\n${fence(codeG)}\n\nWhat is output?`,
    value: whereG,
    wrong: [valsG.lastIndexOf(bestG) + 1],
    explanation: `Best becomes ${bestG} at position ${whereG}; the later ${bestG} is equal, not greater, so Where stays ${whereG}.`,
    workedSolution: `1. Start: Best = ${valsG[0]}, Where = 1.\n2. Index 2: ${valsG[1]} > ${valsG[0]}, so Best = ${valsG[1]}, Where = 2.\n3. Index 3: ${valsG[2]} is not greater.\n4. Index 4: ${valsG[3]} is equal, not greater.\n5. Index 5: ${valsG[4]} is not greater.\n6. Output ${whereG}.`,
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    hints: ["Use the trace of the Scores array.", "What is output: a value or a position?"],
    stem: `State the purpose of this algorithm.\n\n${fence(codeG)}`,
    options: [
      ["To output the position of the first largest score", "Correct: Where records the index of the highest score."],
      ["To output the largest score in the array", "Best holds the score, but Where (a position) is output."],
      ["To output the position of the last largest score", "Equal scores do not replace Best because the test uses >."],
      ["To sort the scores into descending order", "No values are moved."],
    ],
    answer: "A",
    explanation: "The algorithm keeps the highest score so far in Best and its index in Where, and outputs Where; with > the first occurrence is kept.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each loop to how it is traced.",
    pairs: [
      ["`FOR Count ← 1 TO 4`", "Runs exactly four times, including Count = 4"],
      ["`WHILE … DO`", "Tests the condition before each pass and may run zero times"],
      ["`REPEAT … UNTIL`", "Tests after each pass and stops when the condition is true"],
    ],
    explanation: "FOR includes the end value; WHILE pre-tests; REPEAT post-tests and runs at least once.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 2,
    hints: ["Compare the trace's output with the total that was expected."],
    stem: "An algorithm should output the total of the numbers 1 to 4, but a trace shows it outputs 6:\n\n```\nTotal ← 0\nNumber ← 1\nWHILE Number < 4 DO\n    Total ← Total + Number\n    Number ← Number + 1\nENDWHILE\nOUTPUT Total\n```\n\nExplain the error shown by the trace and give the correction.",
    points: [
      "The loop stops when Number = 4 (4 < 4 is false), so 4 is never added: 1 + 2 + 3 = 6 instead of 10",
      "Correction: WHILE Number <= 4 DO (or Number < 5)",
    ],
    explanation: "The trace shows the last value is not processed: an off-by-one logic error in the condition.",
    modelAnswer: "The trace shows Total becomes 1, 3, 6 and then Number is 4, so the test 4 < 4 is false and 4 is not added. The condition should be WHILE Number <= 4 DO.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, marks: 8, secs: 720, calculator: false,
    hints: ["One row per pass of the loop.", "Digit is the remainder after dividing by 10."],
    stem: `Rudo writes this algorithm.\n\n${fence(codeD)}`,
    parts: [
      P.fib({
        label: "(a)", marks: 4, stem: `Complete the trace for the input ${inD2}, giving the values at the end of each pass of the loop.`,
        template: passD2.map((s, i) => `Pass ${i + 1}: Number = {{blank:n${i}}}, Digit = {{blank:d${i}}}, Reverse = {{blank:r${i}}}`).join("\n\n"),
        blanks: passD2.flatMap((s, i) => [
          { id: `n${i}`, accepted: [String(s.Number)], input: "number", wrong: String(s.Number + 1) },
          { id: `d${i}`, accepted: [String(s.Digit)], input: "number", wrong: String(s.Digit + 1) },
          { id: `r${i}`, accepted: [String(s.Reverse)], input: "number", wrong: String(s.Reverse + 1) },
        ]),
        explanation: `Trace:\n\n${trD2.md}`,
      }),
      P.num({
        label: "(b)", stem: "State the value output.", value: outD2, wrong: [inD2],
        explanation: `${inD2} reversed is ${outD2}.`,
        workedSolution: `1. Digits taken from the right: ${passD2.map((s) => s.Digit).join(", ")}.\n2. Reverse = ${outD2}.`,
      }),
      P.manual({
        label: "(c)", marks: 1, stem: "State the purpose of the algorithm.",
        points: ["To reverse the digits of a (positive whole) number and output the result"],
        modelAnswer: "It outputs the digits of the number in reverse order.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain what is output when the input is 0, and why.",
        points: ["0 is output", "because the WHILE condition Number > 0 is false at the start, so the loop body never runs and Reverse keeps its starting value 0"],
        modelAnswer: "0. The WHILE test 0 > 0 is false before the first pass, so the loop never runs and Reverse is still 0.",
      }),
    ],
    explanation: `(b) ${outD2}.`,
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, marks: 6, secs: 540, calculator: false,
    hints: ["The prompt is output once per day.", "Only rainfall greater than 0 is counted."],
    stem: `A school weather club in Masvingo uses this algorithm.\n\n${fence(codeH)}`,
    parts: [
      P.fib({
        label: "(a)", marks: 3, stem: `The inputs are ${inH.join(", ")}. Complete the statements.`,
        template: "The final value of Total is {{blank:t}}. The final value of Count is {{blank:c}}. The prompt is output {{blank:p}} times.",
        blanks: [
          { id: "t", accepted: [String(finH.Total)], input: "number", wrong: String(finH.Total + 1) },
          { id: "c", accepted: [String(finH.Count)], input: "number", wrong: "4" },
          { id: "p", accepted: [String(promptsH)], input: "number", wrong: "3" },
        ],
        explanation: `Trace:\n\n${trH.md}`,
      }),
      P.short({
        label: "(b)", stem: "Write exactly what is output by the last line.",
        accepted: [`${finH.Count} wet days, total ${finH.Total}`, `${finH.Count} wet days total ${finH.Total}`],
        wrong: [`4 wet days, total ${finH.Total}`],
        explanation: `The values are joined with the text: ${finH.Count} wet days, total ${finH.Total}.`,
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Describe what the algorithm does.",
        points: ["Inputs the rainfall for four days", "Counts the days with rain (more than 0 mm) and totals their rainfall, then outputs the count and the total"],
        modelAnswer: "It inputs four daily rainfall readings, counts how many days had some rain and adds up the rainfall on those days, then outputs the number of wet days and the total.",
      }),
    ],
    explanation: `Count ${finH.Count}, total ${finH.Total}.`,
  });

  b.card("DEFINITION", "Dry run", "Working through an algorithm by hand, line by line, with test data, without a computer.");
  b.card("DEFINITION", "Trace table", "A table recording a dry run: one column per variable plus OUTPUT, a value written each time it changes.");
  b.card("CONCEPT", "What goes in the OUTPUT column", "Everything displayed, exactly: prompts before inputs and results with their text.");
  b.card("CONCEPT", "Blank cells", "Leave a cell blank when the value did not change; start a new row when the loop goes round again.");
  b.card("CONCEPT", "Tracing FOR loops", "FOR Index ← 2 TO 5 runs with 2, 3, 4 and 5: the end value is included.");
  b.card("CONCEPT", "WHILE vs REPEAT in a trace", "WHILE tests before each pass (may run zero times); REPEAT … UNTIL tests after (at least once) and stops when the condition is true.");
  b.card("CONCEPT", "Finding the purpose", "Trace with simple data, compare input with output, and describe the job done (e.g. 'finds the position of the smallest value').");
  b.card("CONCEPT", "Finding an error with a trace", "If the trace's result differs from the expected result, find the first line where the values go wrong; off-by-one conditions are common.");
});
