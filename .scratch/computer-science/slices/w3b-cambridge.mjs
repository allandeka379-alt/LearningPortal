// Slice w3b: Cambridge 0478 Paper 2 exam-format item (STRUCTURED, 12 marks, APPLICATION): validation and verification.
import { concept, P, CAM } from "../lib.mjs";

const C = (k) => `comp.${k}`;
const fence = (s) => "```\n" + s + "\n```";

// Validation algorithm for a temperature reading from -10 to 50 inclusive, with a counter of attempts.
const code = `Attempts ← 0
REPEAT
    OUTPUT "Enter temperature (-10 to 50)"
    INPUT Temperature
    Attempts ← Attempts + 1
    IF Temperature < -10 OR Temperature > 50
        THEN
            OUTPUT "Out of range"
    ENDIF
UNTIL Temperature >= -10 AND Temperature <= 50
OUTPUT "Accepted after ", Attempts, " attempts"`;
const inputs = [64, -11, 50];
let attempts = 0;
let errors = 0;
for (const t of inputs) {
  attempts++;
  if (t < -10 || t > 50) errors++;
  else break;
}
if (attempts !== 3 || errors !== 2) throw new Error("trace");
const accepted = (t) => t >= -10 && t <= 50;
const testRows = [
  [-10, "extreme"],
  [75, "abnormal"],
  [25, "normal"],
];
for (const [v, type] of testRows) if ((type === "abnormal") === accepted(v)) throw new Error("test data " + v);

// Check digit on a 5-digit product code: weights 6,5,4,3,2 on 4 digits? Use ISBN-13 style on a 6-digit code: weights 1,3.
function check13(d) {
  const sum = [...d].reduce((s, c, i) => s + Number(c) * (i % 2 === 0 ? 1 : 3), 0);
  return { sum, check: (10 - (sum % 10)) % 10 };
}
const code6 = "402718";
const cd = check13(code6);

concept(C("algorithms.validation-verification"), { file: "exam/w3b-cambridge", keyPrefix: "exam.w3b-cambridge", applies: CAM }, (b) => {
  b.struct({
    d: 5, skill: "APPLICATION", examStyle: true, paper: "Paper 2", secs: 1080, calculator: false,
    concepts: [C("algorithms.validation-verification")],
    hints: ["Each invalid input adds one to Attempts and produces one message.", "Boundary data sits on, or just outside, a limit.", "Multiply by 1, 3, 1, 3, … then make the total up to a multiple of 10."],
    stem: `A weather station in Masvingo records temperatures. This algorithm validates each reading.\n\n${fence(code)}`,
    parts: [
      P.mcq({
        label: "(a)", stem: "Which type of validation check does the algorithm perform?",
        options: [["Range check", "Correct: the value must lie between -10 and 50."], ["Length check", "No characters are counted."], ["Presence check", "It does not only test for an empty input."], ["Format check", "No pattern of characters is tested."]],
        answer: "A", explanation: "A range check tests a value against lower and upper limits.",
      }),
      P.fib({
        label: "(b)", marks: 2,
        stem: `The inputs are ${inputs.join(", ")}. Complete the results of a dry run.`,
        template: `Number of times "Out of range" is output: {{blank:a}}. Value of \`Attempts\` in the final output: {{blank:b}}.`,
        blanks: [
          { id: "a", accepted: [String(errors)], input: "number" },
          { id: "b", accepted: [String(attempts)], input: "number" },
        ],
        explanation: `${inputs[0]} > 50 and ${inputs[1]} < -10 are rejected (2 messages); ${inputs[2]} is accepted on attempt ${attempts}.`,
      }),
      P.fib({
        label: "(c)", marks: 3,
        stem: "Classify each item of test data for this algorithm as normal, abnormal or extreme.",
        template: testRows.map(([v], i) => `${v}: {{blank:t${i}}}`).join("\n\n"),
        blanks: testRows.map(([, type], i) => ({ id: `t${i}`, accepted: [type], choices: ["normal", "abnormal", "extreme"] })),
        explanation: "-10 is the smallest value that is accepted (extreme); 75 is outside the range and rejected (abnormal); 25 is a typical accepted value (normal).",
      }),
      P.num({
        label: "(d)", stem: `Each sensor has a product code whose final digit is a check digit, calculated like an ISBN-13 (weights 1, 3, 1, 3, …; the check digit makes the total a multiple of 10). Calculate the check digit for the code **${code6}**.`,
        value: cd.check, wrong: [cd.sum % 10],
        explanation: `Weighted total ${cd.sum}; ${cd.sum} MOD 10 = ${cd.sum % 10}; check digit ${cd.check}.`,
        workedSolution: `1. ${[...code6].map((c, i) => `${c} × ${i % 2 === 0 ? 1 : 3}`).join(" + ")} = ${cd.sum}.\n2. (10 − ${cd.sum % 10}) MOD 10 = ${cd.check}.`,
      }),
      P.manual({
        label: "(e)", marks: 2,
        stem: "Readings are also typed in from paper logs. Describe **one** verification check the clerk could use and explain why it is needed as well as validation.",
        points: ["Describes visual check (compare screen with the paper log) or double entry (type twice, computer compares)", "Validation cannot detect a wrong value that is within range (e.g. 23 typed as 32)"],
        modelAnswer: "Double entry: each reading is typed twice and the computer accepts it only if both match. This is needed because a mistyped reading such as 32 instead of 23 is still within range and would pass validation.",
      }),
      P.manual({
        label: "(f)", marks: 3,
        stem: "Write pseudocode that inputs a station code and repeats the input until it is **exactly 6 characters** long, outputting an error message each time it is not.",
        points: ["Prompt and INPUT of the station code", "Loop (REPEAT … UNTIL or WHILE) using LENGTH(code) = 6 / <> 6 correctly", "Error message and re-input for each invalid code"],
        modelAnswer: "```\nOUTPUT \"Enter station code\"\nINPUT StationCode\nWHILE LENGTH(StationCode) <> 6 DO\n    OUTPUT \"Code must be 6 characters\"\n    INPUT StationCode\nENDWHILE\n```",
      }),
    ],
    explanation: `(a) Range check. (b) ${errors}; ${attempts}. (c) extreme, abnormal, normal. (d) ${cd.check}.`,
  });
});
