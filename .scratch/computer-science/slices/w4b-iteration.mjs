// Slice w4b: iteration with FOR, WHILE and REPEAT (comp.prog.iteration).
import { concept, P, ZIM } from "../lib.mjs";
import { fence, DIV, recordTrace } from "./w4b-0-kit.mjs";
import { execFileSync } from "node:child_process";

const forCount = (a, z, s = 1) => {
  const v = [];
  for (let i = a; s > 0 ? i <= z : i >= z; i += s) v.push(i);
  return v;
};
const f1 = forCount(3, 11);
const f2 = forCount(1, 17, 4);
const f3 = forCount(2, 12, 5);
const f3sum = f3.reduce((s, x) => s + x, 0);
// WHILE halving.
let N = 200;
let halves = 0;
const halfSteps = [];
while (N > 10) {
  N = DIV(N, 2);
  halves++;
  halfSteps.push(N);
}
// Nested counts.
const nest1 = 5 * 3;
let tri = 0;
for (let i = 1; i <= 4; i++) for (let j = 1; j <= i; j++) tri++;
// REPEAT runs once.
let Xr = 50;
do Xr += 5; while (!(Xr > 20));
// Python range.
const pySrc = "for i in range(2, 10, 3):\n    print(i)";
const pyVals = forCount(2, 9, 3);
try {
  const out = execFileSync("python", ["-c", pySrc], { encoding: "utf8" }).trim().split(/\r?\n/).map(Number);
  if (out.join(",") !== pyVals.join(",")) throw new Error("python mismatch " + out);
} catch (e) {
  if (String(e).includes("mismatch")) throw e;
}
// Struct: countdown trace.
const sTrace = recordTrace(["Count", "Total", "OUTPUT"], (rec) => {
  const s = { Total: 0 };
  rec(s);
  for (let c = 15; c >= 3; c -= 4) {
    s.Count = c;
    s.Total += c;
    rec(s);
  }
  s.OUTPUT = String(s.Total);
  rec(s);
});
const sVals = forCount(15, 3, -4);
const sTotal = sVals.reduce((s, x) => s + x, 0);
// Struct 2: savings club loop.
const target = 120;
const weekly = [35, 20, 40, 30, 25];
let saved = 0;
let weeks = 0;
for (const w of weekly) {
  if (saved >= target) break;
  saved += w;
  weeks++;
}

concept("comp.prog.iteration", { file: "prog/iteration", keyPrefix: "prog.iteration" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which type of loop always runs its statements at least once?",
    options: [
      ["REPEAT … UNTIL", "Correct: the condition is tested after the body."],
      ["WHILE … ENDWHILE", "The condition is tested first, so the body may run zero times."],
      ["FOR … NEXT", "If the start value is past the end value, the body does not run."],
      ["CASE … ENDCASE", "CASE is selection, not a loop."],
    ],
    answer: "A",
    explanation: "A post-condition loop tests its condition at the end of each pass.",
  });
  b.mcq({
    d: 1, skill: "UNDERSTANDING",
    stem: "A program must input the rainfall for each of the 31 days of a month. Which loop is most suitable?",
    options: [
      ["A FOR loop", "Correct: the number of repetitions, 31, is known in advance."],
      ["A WHILE loop", "It would work, but needs a counter written by hand; FOR is designed for a known count."],
      ["A REPEAT … UNTIL loop", "Possible with a counter, but a count-controlled loop matches the problem."],
      ["A CASE statement", "CASE chooses between options; it does not repeat."],
    ],
    answer: "A",
    explanation: "Use a count-controlled loop when the number of repetitions is known.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: "How many times is the body of `FOR K ← 3 TO 11` executed?",
    value: f1.length,
    wrong: [11 - 3],
    explanation: `K takes the values 3 to 11 inclusive: 11 − 3 + 1 = ${f1.length}.`,
    workedSolution: `1. Values: ${f1.join(", ")}.\n2. Count them: ${f1.length}.`,
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: `How many numbers are output?\n\n${fence("FOR K ← 1 TO 17 STEP 4\n    OUTPUT K\nNEXT K")}`,
    value: f2.length,
    wrong: [4],
    explanation: `K takes ${f2.join(", ")}: ${f2.length} values. The next value, ${f2.at(-1) + 4}, is past 17.`,
    workedSolution: `1. Start at 1 and add 4: ${f2.join(", ")}.\n2. ${f2.length} values are output.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    hints: ["List the values J takes before adding."],
    stem: `What is output?\n\n${fence("Total ← 0\nFOR J ← 2 TO 12 STEP 5\n    Total ← Total + J\nNEXT J\nOUTPUT Total")}`,
    value: f3sum,
    wrong: [forCount(2, 12).reduce((s, x) => s + x, 0)],
    explanation: `J takes ${f3.join(", ")}; ${f3.join(" + ")} = ${f3sum}.`,
    workedSolution: `1. J = ${f3.join(", ")}.\n2. Total = ${f3.join(" + ")} = ${f3sum}.`,
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    hints: ["Test the condition before every pass, including the first."],
    stem: `Complete the results of a dry run.\n\n${fence("N ← 200\nCount ← 0\nWHILE N > 10 DO\n    N ← DIV(N, 2)\n    Count ← Count + 1\nENDWHILE\nOUTPUT N, \" \", Count")}`,
    template: "Final value of N: {{blank:a}}\n\nFinal value of Count: {{blank:b}}",
    blanks: [
      { id: "a", accepted: [String(N)], input: "number" },
      { id: "b", accepted: [String(halves)], input: "number" },
    ],
    wrong: [[String(halfSteps.at(-2)), String(halves - 1)]],
    explanation: `N takes ${halfSteps.join(", ")}; the loop stops when N = ${N} (not > 10), after ${halves} passes.`,
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["UNTIL describes when to stop."],
    stem: "A dice game asks the player to choose a number from 1 to 6 and must keep asking until a valid number is entered. Which line completes `REPEAT  INPUT Guess  …`?",
    options: [
      ["`UNTIL Guess >= 1 AND Guess <= 6`", "Correct: the loop stops when the guess is valid."],
      ["`UNTIL Guess < 1 OR Guess > 6`", "This stops on an invalid guess and repeats on a valid one."],
      ["`UNTIL Guess >= 1 OR Guess <= 6`", "Every number satisfies one side, so any input is accepted."],
      ["`UNTIL Guess = 6`", "Only 6 would be accepted."],
    ],
    answer: "A",
    explanation: "REPEAT … UNTIL stops when its condition is TRUE, so the condition states what a valid input is.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The statements inside a WHILE loop may not be executed at all.",
    answer: true,
    explanation: "True. The condition is checked before the first pass; if it is FALSE, the body is skipped.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A REPEAT … UNTIL loop stops as soon as its condition becomes FALSE.",
    answer: false,
    explanation: "False. REPEAT … UNTIL stops when the condition becomes TRUE. It is a WHILE loop that stops when its condition is FALSE.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each task to the most suitable loop.",
    pairs: [
      "Output the 12 times table from 1 × 12 to 12 × 12",
      "Keep asking for a PIN until the correct one is entered",
      "Add up prices until the cashier enters 0 (possibly at once)",
      "Process every element of an array of 50 names",
    ],
    right: ["FOR … NEXT", "REPEAT … UNTIL", "WHILE … ENDWHILE"],
    rightIndex: [0, 1, 2, 0],
    explanation: "Known counts suit FOR; at-least-once input suits REPEAT; a rogue value that may come first suits WHILE.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    hints: ["A WHILE loop needs the counter set before it and increased inside it."],
    stem: "Complete the WHILE loop so that it does the same as `FOR Day ← 1 TO 7 … NEXT Day`.\n\n```\nDay ← [1]\nWHILE Day [2] 7 DO\n    INPUT Sales\n    Day ← [3]\nENDWHILE\n```",
    template: "[1] {{blank:a}} [2] {{blank:b}} [3] {{blank:c}}",
    blanks: [
      { id: "a", accepted: ["1"], choices: ["0", "1", "7"] },
      { id: "b", accepted: ["<="], choices: ["<", "<=", ">", "="] },
      { id: "c", accepted: ["Day + 1"], choices: ["Day + 1", "Day - 1", "7", "1"] },
    ],
    explanation: "Start at 1, repeat while Day <= 7, add 1 on each pass: seven passes, as in the FOR loop.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Does anything inside the loop change the value that is tested?"],
    stem: `What is wrong with this algorithm?\n\n${fence("INPUT Price\nWHILE Price <> 0 DO\n    Total ← Total + Price\nENDWHILE")}`,
    options: [
      ["Price never changes inside the loop, so it may never end", "Correct: no new price is input, so the condition can never change."],
      ["A WHILE loop cannot test for 0", "Any comparison can be used as a condition."],
      ["The loop body runs exactly once and then stops", "It runs forever unless the first price is 0."],
      ["ENDWHILE should be NEXT Price", "NEXT closes a FOR loop."],
    ],
    answer: "A",
    explanation: "Add `INPUT Price` at the end of the loop body. (Total should also be set to 0 first.)",
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    hints: ["The inner loop runs fully for every outer pass."],
    stem: `How many times is "*" output?\n\n${fence("FOR Outer ← 1 TO 5\n    FOR Inner ← 1 TO 3\n        OUTPUT \"*\"\n    NEXT Inner\nNEXT Outer")}`,
    value: nest1,
    wrong: [5 + 3],
    explanation: `5 outer passes × 3 inner passes = ${nest1}.`,
    workedSolution: `1. Inner loop: 3 outputs each time.\n2. It runs for each of 5 outer passes: 5 × 3 = ${nest1}.`,
  });
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    hints: ["The inner loop's end value changes with Row.", "Add up the inner passes for Row = 1, 2, 3, 4."],
    stem: `What is output?\n\n${fence("Count ← 0\nFOR Row ← 1 TO 4\n    FOR Column ← 1 TO Row\n        Count ← Count + 1\n    NEXT Column\nNEXT Row\nOUTPUT Count")}`,
    value: tri,
    wrong: [16],
    explanation: `The inner loop runs 1, 2, 3 and 4 times: 1 + 2 + 3 + 4 = ${tri}.`,
    workedSolution: `1. Row 1: 1 pass; Row 2: 2; Row 3: 3; Row 4: 4.\n2. Count = ${tri}.`,
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    hints: ["When is the condition of each loop tested?"],
    stem: `Compare the two algorithms.\n\nAlgorithm P:\n\n${fence("X ← 50\nREPEAT\n    X ← X + 5\nUNTIL X > 20\nOUTPUT X")}\n\nAlgorithm Q:\n\n${fence("X ← 50\nWHILE X <= 20 DO\n    X ← X + 5\nENDWHILE\nOUTPUT X")}\n\nWhat do they output?`,
    options: [
      [`P outputs ${Xr}; Q outputs 50`, "Correct: P runs its body once before testing; Q's condition is FALSE at the start."],
      ["Both output 50", "REPEAT always runs its body at least once."],
      [`Both output ${Xr}`, "The WHILE condition 50 <= 20 is FALSE, so Q's body never runs."],
      [`P outputs 50; Q outputs ${Xr}`, "This swaps the behaviour of the two loops."],
    ],
    answer: "A",
    explanation: "A post-condition loop runs at least once; a pre-condition loop can run zero times.",
  });
  b.num({
    d: 3, skill: "APPLICATION", applies: ZIM, calculator: false,
    hints: ["range(start, stop, step) stops before reaching stop."],
    stem: `How many numbers does this Python code display?\n\n\`\`\`\n${pySrc}\n\`\`\``,
    value: pyVals.length,
    wrong: [pyVals.length + 1],
    explanation: `It displays ${pyVals.join(", ")}: ${pyVals.length} numbers. 11 would be the next, but range stops before 10.`,
    workedSolution: `1. i starts at 2 and goes up in 3s: ${pyVals.join(", ")}.\n2. The stop value 10 is not included.\n3. ${pyVals.length} numbers.`,
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which keyword closes a WHILE loop in pseudocode?",
    accepted: ["ENDWHILE"],
    rejected: ["NEXT", "UNTIL"],
    wrong: ["NEXT"],
    explanation: "`WHILE … DO … ENDWHILE`. FOR loops end with NEXT and REPEAT loops with UNTIL.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    hints: ["Where is each condition tested?"],
    stem: "Describe **two** differences between a WHILE loop and a REPEAT … UNTIL loop, and give a task that suits REPEAT … UNTIL.",
    points: [
      "WHILE tests the condition before the body (pre-condition); REPEAT tests it after the body (post-condition)",
      "WHILE may run zero times; REPEAT always runs at least once / WHILE stops when its condition is FALSE, REPEAT stops when its condition is TRUE",
      "Suitable task, e.g. validating an input / asking for a password until correct",
    ],
    explanation: "Position of the test, minimum passes and stopping condition.",
    modelAnswer: "A WHILE loop checks its condition before each pass, so it may not run at all; a REPEAT loop checks after each pass, so it always runs at least once. WHILE repeats while its condition is TRUE, whereas REPEAT repeats until its condition becomes TRUE. REPEAT suits validating an age that must be entered at least once.",
  });
  b.manualShort({
    d: 4, skill: "CREATION", marks: 5,
    hints: ["Read one value before the loop and the next at the end of the loop body.", "MOD(Number, 2) = 0 means even."],
    stem: "Write pseudocode that inputs whole numbers until -1 is entered, then outputs how many of the numbers were even. The -1 must not be counted.",
    points: [
      "Initialises the counter to 0 before the loop",
      "Inputs the first number before a WHILE loop (or uses an equivalent structure that does not process -1)",
      "Loop condition Number <> -1",
      "Uses MOD(Number, 2) = 0 to add 1 to the counter for even numbers",
      "Inputs the next number inside the loop and outputs the count after the loop",
    ],
    explanation: "A rogue value that may come first needs a WHILE loop with a read before the loop.",
    modelAnswer: "```\nEvenCount ← 0\nOUTPUT \"Enter a number (-1 to stop)\"\nINPUT Number\nWHILE Number <> -1 DO\n    IF MOD(Number, 2) = 0\n        THEN\n            EvenCount ← EvenCount + 1\n    ENDIF\n    OUTPUT \"Enter a number (-1 to stop)\"\n    INPUT Number\nENDWHILE\nOUTPUT \"Even numbers: \", EvenCount\n```",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, marks: 6, secs: 540, calculator: false,
    hints: ["Subtract 4 each time until the counter would go below 3."],
    stem: `Consider this algorithm.\n\n${fence("Total ← 0\nFOR Count ← 15 TO 3 STEP -4\n    Total ← Total + Count\nNEXT Count\nOUTPUT Total")}`,
    parts: [
      P.fib({
        label: "(a)", marks: 3, stem: "Complete the values that `Count` takes, in order.",
        template: `First: {{blank:a}}, second: {{blank:b}}, last: {{blank:c}}`,
        blanks: [
          { id: "a", accepted: [String(sVals[0])], input: "number" },
          { id: "b", accepted: [String(sVals[1])], input: "number" },
          { id: "c", accepted: [String(sVals.at(-1))], input: "number" },
        ],
        wrong: [["15", "12", "1"]],
        explanation: `Count takes ${sVals.join(", ")}; the next value, ${sVals.at(-1) - 4}, is past 3.`,
      }),
      P.num({ label: "(b)", stem: "State the value output.", value: sTotal, wrong: [sTotal - sVals.at(-1)], explanation: `${sVals.join(" + ")} = ${sTotal}.`, workedSolution: `1. Values: ${sVals.join(", ")}.\n2. Total = ${sTotal}.` }),
      P.manual({
        label: "(c)", marks: 2, stem: "Rewrite the algorithm using a WHILE loop so that it gives the same output.",
        points: ["Count ← 15 before the loop and condition WHILE Count >= 3", "Inside the loop: Total ← Total + Count and Count ← Count - 4"],
        modelAnswer: "```\nTotal ← 0\nCount ← 15\nWHILE Count >= 3 DO\n    Total ← Total + Count\n    Count ← Count - 4\nENDWHILE\nOUTPUT Total\n```",
      }),
    ],
    explanation: `Count: ${sVals.join(", ")}; output ${sTotal}. Trace:\n\n${sTrace.md}`,
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, marks: 8, secs: 720, calculator: false,
    hints: ["Test the condition before each week.", "The loop stops as soon as Saved reaches the target."],
    stem: `A savings club in Gweru wants to reach a target of ${target} dollars. Tatenda writes this algorithm; the weekly amounts entered are ${weekly.join(", ")}.\n\n${fence(`Saved ← 0\nWeeks ← 0\nWHILE Saved < ${target} DO\n    INPUT Amount\n    Saved ← Saved + Amount\n    Weeks ← Weeks + 1\nENDWHILE\nOUTPUT "Target reached in ", Weeks, " weeks"`)}`,
    parts: [
      P.num({ label: "(a)", stem: "State the value of `Weeks` that is output.", value: weeks, wrong: [weekly.length], explanation: `After ${weeks} weeks Saved = ${saved}, which is at least ${target}.`, workedSolution: `1. Running totals: ${weekly.slice(0, weeks).map((_, i) => weekly.slice(0, i + 1).reduce((s, x) => s + x, 0)).join(", ")}.\n2. The loop stops when Saved = ${saved}: ${weeks} weeks.` }),
      P.num({ label: "(b)", stem: "State the final value of `Saved`.", value: saved, wrong: [target], explanation: `${weekly.slice(0, weeks).join(" + ")} = ${saved}.`, workedSolution: `1. Add the first ${weeks} amounts.\n2. Saved = ${saved}.` }),
      P.mcq({
        label: "(c)", stem: "Why is a WHILE loop more suitable here than a FOR loop?",
        options: [["The number of weeks needed is not known in advance", "Correct: the loop depends on the amounts entered."], ["A FOR loop cannot add numbers to a running total", "FOR loops can contain any statements."], ["A WHILE loop always runs at least once", "That describes REPEAT, and WHILE may run zero times."], ["FOR loops can only be used to process arrays", "FOR loops work with any statements."]],
        answer: "A", explanation: "Condition-controlled loops suit an unknown number of repetitions.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Amounts must be between 1 and 50 dollars. Write the pseudocode that replaces `INPUT Amount` so that each amount is validated before it is added.",
        points: ["Uses a REPEAT … UNTIL (or WHILE) loop around the input", "Correct condition Amount >= 1 AND Amount <= 50 (or its opposite for WHILE)", "Prompt / error message so the user knows to re-enter"],
        modelAnswer: "```\nREPEAT\n    OUTPUT \"Enter amount (1 to 50)\"\n    INPUT Amount\nUNTIL Amount >= 1 AND Amount <= 50\n```",
      }),
    ],
    explanation: `${weeks} weeks; Saved = ${saved}.`,
  });

  b.card("DEFINITION", "Iteration", "Repeating a set of statements a fixed number of times or until a condition is met.");
  b.card("FORMULA", "FOR loop", "FOR Counter ← Start TO End STEP n … NEXT Counter. Runs End − Start + 1 times when STEP is 1.");
  b.card("FORMULA", "WHILE loop", "WHILE condition DO … ENDWHILE. Tested before each pass; may run 0 times; stops when FALSE.");
  b.card("FORMULA", "REPEAT loop", "REPEAT … UNTIL condition. Tested after each pass; runs at least once; stops when TRUE.");
  b.card("CONCEPT", "Choosing a loop", "Known count: FOR. Might not be needed at all: WHILE. Must run at least once (validation): REPEAT.");
  b.card("CONCEPT", "Infinite loop", "A loop whose condition never changes inside it, e.g. a WHILE loop with no new INPUT.");
  b.card("CONCEPT", "Nested loops", "The inner loop runs fully on each outer pass; total passes = outer count × inner count.");
  b.card("FACT", "Negative STEP", "FOR Count ← 20 TO 2 STEP -6 gives 20, 14, 8, 2: the loop stops before passing the end value.");
  b.card("FACT", "Python range", "range(1, 11) gives 1 to 10: the stop value is not included. Python has no REPEAT … UNTIL.", undefined, { applies: ZIM });
});
