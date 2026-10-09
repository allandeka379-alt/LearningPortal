// Slice w4b: operators and library routines (comp.prog.operators).
import { concept, P, ZIM, CAM, L } from "../lib.mjs";
import { fence, DIV, MOD, ROUND } from "./w4b-0-kit.mjs";
import { execFileSync } from "node:child_process";

// Python output for the ZIMSEC item, produced by running Python (falls back to the checked value if Python is absent).
const pySrc = "print(23 // 4, 23 % 4)";
let pyOut = `${DIV(23, 4)} ${MOD(23, 4)}`;
try {
  pyOut = execFileSync("python", ["-c", pySrc], { encoding: "utf8" }).trim();
} catch {
  /* keep computed */
}
if (pyOut !== `${DIV(23, 4)} ${MOD(23, 4)}`) throw new Error("python output mismatch");

const e1 = 2 + 3 * 4 ** 2;
// Digit sum loop.
const startN = 3605;
let n = startN;
let digitTotal = 0;
const digitSteps = [];
while (n > 0) {
  digitTotal += MOD(n, 10);
  n = DIV(n, 10);
  digitSteps.push(`Total = ${digitTotal}, Number = ${n}`);
}
const tens = MOD(DIV(746, 10), 10);
const r1 = ROUND(5.678, 1);
// Parking struct.
const minutesParked = 135;
const hoursP = DIV(minutesParked, 60);
const extraP = MOD(minutesParked, 60);
const chargedHours = extraP > 0 ? hoursP + 1 : hoursP;
const rate = 2;
const fee = chargedHours * rate;

concept("comp.prog.operators", { file: "prog/operators", keyPrefix: "prog.operators" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which operator gives the remainder after one whole number is divided by another?",
    options: [
      ["`MOD`", "Correct: MOD returns the remainder."],
      ["`DIV`", "DIV returns the whole-number quotient, not the remainder."],
      ["`/`", "Ordinary division gives a real result with a fractional part."],
      ["`^`", "The caret raises a value to a power."],
    ],
    answer: "A",
    explanation: `\`MOD(${23}, 4)\` is ${MOD(23, 4)} because 4 goes into 23 five times with ${MOD(23, 4)} left over.`,
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: "What value is returned by `DIV(29, 5)`?",
    value: DIV(29, 5),
    wrong: [29 / 5],
    explanation: `5 goes into 29 ${DIV(29, 5)} whole times (5 × ${DIV(29, 5)} = ${5 * DIV(29, 5)}); DIV discards the remainder.`,
    workedSolution: `1. 5 × ${DIV(29, 5)} = ${5 * DIV(29, 5)}, and 5 × ${DIV(29, 5) + 1} = ${5 * (DIV(29, 5) + 1)} is too big.\n2. DIV(29, 5) = ${DIV(29, 5)}.`,
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: "What value is returned by `MOD(38, 7)`?",
    value: MOD(38, 7),
    wrong: [DIV(38, 7)],
    explanation: `7 × ${DIV(38, 7)} = ${7 * DIV(38, 7)}; 38 − ${7 * DIV(38, 7)} = ${MOD(38, 7)}.`,
    workedSolution: `1. 7 goes into 38 ${DIV(38, 7)} times: 7 × ${DIV(38, 7)} = ${7 * DIV(38, 7)}.\n2. Remainder 38 − ${7 * DIV(38, 7)} = ${MOD(38, 7)}.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    hints: ["Powers come before multiplication, which comes before addition."],
    stem: "Evaluate `2 + 3 * 4 ^ 2`.",
    value: e1,
    wrong: [(2 + 3) * 4 ** 2, ((2 + 3) * 4) ** 2],
    explanation: `4 ^ 2 = 16; 3 × 16 = 48; 2 + 48 = ${e1}.`,
    workedSolution: `1. Power first: 4 ^ 2 = 16.\n2. Multiply: 3 × 16 = 48.\n3. Add: 2 + 48 = ${e1}.`,
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which statement correctly stores the mean of two test marks?",
    options: [
      ["`Mean ← (Test1 + Test2) / 2`", "Correct: the brackets make the addition happen before the division."],
      ["`Mean ← Test1 + Test2 / 2`", "Division is done first, so only Test2 is halved."],
      ["`Mean ← DIV(Test1 + Test2)`", "DIV needs two values and discards any half mark."],
      ["`Mean ← Test1 + Test2 * 0.5`", "Multiplication is done first, so only Test2 is halved."],
    ],
    answer: "A",
    explanation: "Brackets force the total to be worked out before it is divided by 2.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which condition is TRUE only when `Age` is from 13 to 19 inclusive?",
    options: [
      ["`Age >= 13 AND Age <= 19`", "Correct: both limits are included and both must hold."],
      ["`Age > 13 AND Age < 19`", "This leaves out 13 and 19 themselves."],
      ["`Age >= 13 OR Age <= 19`", "Every age satisfies at least one side, so this is always TRUE."],
      ["`Age >= 13 AND <= 19`", "The right side of AND is not a complete comparison."],
    ],
    answer: "A",
    explanation: "Inclusive limits need >= and <=, joined by AND.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "`MOD(Number, 2) = 0` is TRUE when `Number` is an even whole number.",
    answer: true,
    explanation: "True. An even number leaves no remainder when divided by 2.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The `/` operator always gives a whole number when both values are integers.",
    answer: false,
    explanation: "False. `/` is ordinary division: `9 / 2` is 4.5. Use `DIV` for a whole-number quotient.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each operator to its meaning.",
    pairs: [
      ["`<>`", "not equal to"],
      ["`>=`", "greater than or equal to"],
      ["`^`", "raised to the power of"],
      ["`DIV`", "whole-number quotient"],
      ["`NOT`", "reverses a Boolean value"],
    ],
    explanation: "`<>` is not equal; `>=` includes the boundary; `^` is a power; DIV discards the remainder; NOT turns TRUE into FALSE and FALSE into TRUE.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What data type is the result of `Score > 40`?",
    options: [
      ["BOOLEAN", "Correct: a comparison is either TRUE or FALSE."],
      ["INTEGER", "The result is not a number."],
      ["REAL", "The result is not a number."],
      ["STRING", "TRUE and FALSE are Boolean values, not text."],
    ],
    answer: "A",
    explanation: "Relational operators always produce a Boolean value.",
  });
  b.truth({
    d: 3, skill: "APPLICATION", marks: 4,
    hints: ["Work out NOT B first, then OR it with A."],
    stem: "A gate at a school sports day opens (X = 1) when a learner has a ticket (A = 1) **or** is not wearing the visitor badge (B = 0). The condition is `X = A OR NOT B`. Complete the output for each row.",
    inputs: ["A", "B"],
    fn: (a, bb) => L.or(a, L.not(bb)),
    explanation: "NOT B is 1 only when B is 0, so X is 0 only when A = 0 and B = 1.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Evaluate each side of AND separately."],
    stem: "`Age` is 21 and `HasSchoolID` is TRUE. What is the value of `Age < 19 AND HasSchoolID`?",
    options: [
      ["FALSE", "Correct: Age < 19 is FALSE, and AND needs both sides TRUE."],
      ["TRUE", "HasSchoolID is TRUE, but AND needs the age condition too."],
      ["21", "A logical expression gives TRUE or FALSE, not a number."],
      ["It causes an error", "Comparing an integer and combining Booleans is valid."],
    ],
    answer: "A",
    explanation: "21 < 19 is FALSE; FALSE AND TRUE is FALSE.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    hints: ["Can a mark be below 0 and above 100 at the same time?"],
    stem: "Complete the condition that is TRUE when a mark is **outside** the range 0 to 100.",
    template: "`IF Mark {{blank:a}} 0 {{blank:b}} Mark {{blank:c}} 100`",
    blanks: [
      { id: "a", accepted: ["<"], choices: ["<", "<=", ">", ">="] },
      { id: "b", accepted: ["OR"], choices: ["AND", "OR", "NOT"] },
      { id: "c", accepted: [">"], choices: ["<", "<=", ">", ">="] },
    ],
    explanation: "Out of range means below 0 OR above 100; 0 and 100 themselves are valid, so use strict < and >.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", applies: CAM,
    hints: ["RANDOM() can return 0 and can return 1."],
    stem: "What values can `ROUND(RANDOM() * 10, 0) + 1` produce?",
    options: [
      ["Whole numbers from 1 to 11", "Correct: RANDOM() * 10 is 0 to 10; rounded and plus 1 gives 1 to 11."],
      ["Whole numbers from 1 to 10", "This forgets that RANDOM() can return 1, giving 10 + 1."],
      ["Whole numbers from 0 to 10", "The + 1 shifts the range up by one."],
      ["Real numbers from 1.0 to 11.0", "ROUND to 0 places gives whole numbers."],
    ],
    answer: "A",
    explanation: "In 0478 pseudocode RANDOM() returns a value from 0 to 1 inclusive, so the rounded product is 0 to 10, then 1 is added.",
  });
  b.num({
    d: 2, skill: "APPLICATION", applies: CAM, calculator: false,
    stem: "What value is returned by `ROUND(5.678, 1)`?",
    value: r1,
    wrong: [5.6],
    explanation: `To 1 decimal place 5.678 becomes ${r1}, because the next digit (7) is 5 or more.`,
    workedSolution: `1. Keep one decimal place: 5.6|78.\n2. The next digit is 7, so round up: ${r1}.`,
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    hints: ["Remove the units digit first, then take the remainder."],
    stem: "`Number` holds a three-digit whole number, such as 746. Which expression gives its **tens** digit?",
    options: [
      ["`MOD(DIV(Number, 10), 10)`", `Correct: DIV(746, 10) = ${DIV(746, 10)}; MOD(${DIV(746, 10)}, 10) = ${tens}.`],
      ["`DIV(MOD(Number, 10), 10)`", "MOD(746, 10) is the units digit 6; DIV(6, 10) is 0."],
      ["`DIV(Number, 100)`", "This gives the hundreds digit."],
      ["`MOD(Number, 100)`", "This gives the last two digits together."],
    ],
    answer: "A",
    explanation: `Dividing by 10 removes the units digit; the remainder after dividing by 10 is then the old tens digit, ${tens}.`,
  });
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    hints: ["Each pass adds the last digit, then removes it.", "The loop stops when Number reaches 0."],
    stem: `What is output by this algorithm?\n\n${fence(`Number ← ${startN}\nTotal ← 0\nWHILE Number > 0 DO\n    Total ← Total + MOD(Number, 10)\n    Number ← DIV(Number, 10)\nENDWHILE\nOUTPUT Total`)}`,
    value: digitTotal,
    wrong: [MOD(startN, 10)],
    explanation: `The algorithm adds the digits of ${startN}: ${String(startN).split("").join(" + ")} = ${digitTotal}.`,
    workedSolution: digitSteps.map((s, i) => `${i + 1}. ${s}.`).join("\n") + `\n${digitSteps.length + 1}. Output ${digitTotal}.`,
  });
  b.short({
    d: 3, skill: "APPLICATION", applies: ZIM,
    hints: ["In Python, // is integer division and % is the remainder."],
    stem: `What does this Python statement display?\n\n\`\`\`\n${pySrc}\n\`\`\``,
    accepted: [pyOut],
    normalise: ["trim", "collapse_whitespace"],
    wrong: ["5.75 3"],
    explanation: `23 // 4 is ${DIV(23, 4)} (whole-number division) and 23 % 4 is ${MOD(23, 4)} (remainder); print separates them with a space: \`${pyOut}\`.`,
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    hints: ["Try both on 9 and 2."],
    stem: "Explain the difference between `9 / 2` and `DIV(9, 2)`.",
    points: [
      "`/` is ordinary division giving a real result: 4.5",
      "DIV gives only the whole-number part of the quotient, discarding the remainder: 4",
    ],
    explanation: "Same division, different result types.",
    modelAnswer: "9 / 2 gives the real value 4.5. DIV(9, 2) gives the whole-number quotient 4 and throws away the remainder (which MOD(9, 2) would give as 1).",
  });
  b.manualShort({
    d: 4, skill: "CREATION", marks: 5,
    hints: ["DIV gives the full teams; MOD gives the learners left over."],
    stem: "Write pseudocode that inputs the number of learners and the team size, then outputs the number of full teams and the number of learners left over. If nobody is left over, it should also output `\"Teams are even\"`.",
    points: [
      "Prompts and inputs the number of learners and the team size",
      "Calculates full teams with DIV(learners, size)",
      "Calculates the leftover learners with MOD(learners, size)",
      "Outputs both results with messages",
      "IF leftover = 0 THEN outputs \"Teams are even\" (with ENDIF)",
    ],
    explanation: "DIV and MOD answer the two questions; a comparison with 0 decides the extra message.",
    modelAnswer: "```\nOUTPUT \"Number of learners?\"\nINPUT Learners\nOUTPUT \"Team size?\"\nINPUT TeamSize\nFullTeams ← DIV(Learners, TeamSize)\nLeftOver ← MOD(Learners, TeamSize)\nOUTPUT \"Full teams: \", FullTeams\nOUTPUT \"Left over: \", LeftOver\nIF LeftOver = 0\n    THEN\n        OUTPUT \"Teams are even\"\nENDIF\n```",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, marks: 8, secs: 720, calculator: false,
    hints: ["Any part of an hour is charged as a full hour.", "MOD tells you whether there are extra minutes."],
    stem: `A car park in Harare charges ${rate} dollars for each hour or part of an hour. This algorithm calculates the fee.\n\n${fence(`INPUT MinutesParked\nHours ← DIV(MinutesParked, 60)\nExtra ← MOD(MinutesParked, 60)\nIF Extra > 0\n    THEN\n        Hours ← Hours + 1\nENDIF\nFee ← Hours * ${rate}\nOUTPUT "Fee: ", Fee`)}`,
    parts: [
      P.num({ label: "(a)", stem: `The input is ${minutesParked}. State the value of \`Hours\` straight after \`Hours ← DIV(MinutesParked, 60)\`.`, value: hoursP, wrong: [minutesParked / 60], explanation: `60 goes into ${minutesParked} ${hoursP} whole times.`, workedSolution: `1. 60 × ${hoursP} = ${60 * hoursP}.\n2. DIV(${minutesParked}, 60) = ${hoursP}.` }),
      P.num({ label: "(b)", stem: "State the value of `Extra`.", value: extraP, wrong: [hoursP], explanation: `${minutesParked} − ${60 * hoursP} = ${extraP}.`, workedSolution: `1. ${minutesParked} − ${60 * hoursP} = ${extraP}.\n2. MOD gives ${extraP}.` }),
      P.num({ label: "(c)", stem: "State the fee that is output.", value: fee, wrong: [hoursP * rate], explanation: `Extra > 0, so Hours becomes ${chargedHours}; ${chargedHours} × ${rate} = ${fee}.`, workedSolution: `1. Extra = ${extraP} > 0, so Hours = ${chargedHours}.\n2. Fee = ${chargedHours} × ${rate} = ${fee}.` }),
      P.mcq({
        label: "(d)", stem: "Which input would give exactly the same fee as an input of 120?",
        options: [["90", "Correct: DIV gives 1, MOD gives 30, so 2 hours are charged, the same as 120."], ["121", "121 leaves 1 extra minute, so 3 hours are charged."], ["59", "59 minutes is charged as 1 hour."], ["150", "150 minutes is charged as 3 hours."]],
        answer: "A", explanation: "120 minutes is exactly 2 hours; 61 to 120 minutes all charge 2 hours.",
      }),
      P.manual({
        label: "(e)", marks: 4,
        stem: "The owner wants a maximum fee of 15 dollars and wants inputs that are negative to be rejected with a message. Write the extra pseudocode needed.",
        points: [
          "Checks the input with a condition such as MinutesParked < 0",
          "Outputs an error message (and stops / asks again) for a negative input",
          "After calculating, checks IF Fee > 15",
          "Sets Fee ← 15 when it is over the maximum",
        ],
        modelAnswer: "```\nINPUT MinutesParked\nWHILE MinutesParked < 0 DO\n    OUTPUT \"Minutes cannot be negative, re-enter\"\n    INPUT MinutesParked\nENDWHILE\n// ... fee calculated as before ...\nIF Fee > 15\n    THEN\n        Fee ← 15\nENDIF\nOUTPUT \"Fee: \", Fee\n```",
      }),
    ],
    explanation: `Hours ${hoursP}, Extra ${extraP}, fee ${fee}.`,
  });

  b.card("FORMULA", "DIV and MOD", "DIV(a, b): whole-number quotient. MOD(a, b): remainder. DIV(17, 4) = 4, MOD(17, 4) = 1.");
  b.card("FACT", "Order of operations", "Brackets, then powers (^), then * and /, then + and -, left to right within a level.");
  b.card("CONCEPT", "Even or odd", "A number is even when MOD(Number, 2) = 0.");
  b.card("FACT", "Relational operators", "= <> < <= > >=; each gives a BOOLEAN result (TRUE or FALSE).");
  b.card("CONCEPT", "AND, OR, NOT", "AND: both TRUE. OR: at least one TRUE. NOT: reverses. A range check uses AND; an out-of-range check uses OR.");
  b.card("FACT", "ROUND", "ROUND(value, places) rounds to that many decimal places: ROUND(3.14159, 2) = 3.14.", undefined, { applies: CAM });
  b.card("FACT", "RANDOM", "RANDOM() returns a real number from 0 to 1 inclusive. ROUND(RANDOM() * 5, 0) + 1 gives 1 to 6.", undefined, { applies: CAM });
  b.card("CONCEPT", "Splitting digits", "MOD(Number, 10) is the units digit; DIV(Number, 10) removes it.");
  b.card("FACT", "Python and Visual Basic", "Python: // (integer division), % (remainder), ** (power). Visual Basic: \\ and Mod.", undefined, { applies: ZIM });
});
