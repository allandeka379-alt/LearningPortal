// Slice w4b: selection with IF and CASE (comp.prog.selection).
import { concept, P } from "../lib.mjs";
import { fence } from "./w4b-0-kit.mjs";

// Two separate IFs on X.
let X = 12;
if (X > 10) X = X - 4;
if (X > 10) X = X * 2;
const xOut = X;
// Nested temperature advice.
const advice = (t) => (t > 33 ? "Very hot" : t > 24 ? "Warm" : "Cool");
const tIn = 28;
// Wrong-order grades: tests >= 40 then >= 65.
const right = (m) => (m >= 65 ? "Merit" : m >= 40 ? "Pass" : "Fail");
const wrongO = (m) => (m >= 40 ? "Pass" : m >= 65 ? "Merit" : "Fail");
const wrongInputs = [72, 53, 38, 40].filter((m) => right(m) !== wrongO(m));
if (wrongInputs.length !== 1 || wrongInputs[0] !== 72) throw new Error("wrong-order item");
// Separate IFs message count for 80.
const msgs = (m) => [m >= 40, m >= 65, m >= 80].filter(Boolean).length;
const msg80 = msgs(80);
// Courier charge: Weight, Express.
const courier = (w, express) => {
  let c;
  if (w <= 2) c = 6;
  else if (w <= 10) c = 9;
  else c = 15;
  if (express) c = c + 4;
  return c;
};
const cw = courier(7, true);
// Water bands struct.
const water = (u) => (u <= 10 ? u * 1 : u <= 30 ? 10 + (u - 10) * 2 : 10 + 40 + (u - 30) * 3);
const w1 = water(24);
const w2 = water(35);
const nestedTrace = (d) => ({ 1: "Monday", 2: "Tuesday" })[d];
void nestedTrace;
// Calculator CASE struct.
const calc = (a, op, b) => {
  switch (op) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/": return a / b;
    default: return null;
  }
};
const c1 = calc(14, "*", 3);
const c2 = calc(27, "/", 6);

const codeWater = `INPUT Units
IF Units <= 10
    THEN
        Bill ← Units * 1
    ELSE
        IF Units <= 30
            THEN
                Bill ← 10 + (Units - 10) * 2
            ELSE
                Bill ← 50 + (Units - 30) * 3
        ENDIF
ENDIF
OUTPUT "Bill: ", Bill`;
if (water(35) !== 50 + 5 * 3) throw new Error("water band");

const codeCalc = `INPUT FirstNumber
INPUT Operator
INPUT SecondNumber
CASE OF Operator
    '+' : Answer ← FirstNumber + SecondNumber
    '-' : Answer ← FirstNumber - SecondNumber
    '*' : Answer ← FirstNumber * SecondNumber
    '/' : Answer ← FirstNumber / SecondNumber
    OTHERWISE OUTPUT "Unknown operator"
ENDCASE`;

concept("comp.prog.selection", { file: "prog/selection", keyPrefix: "prog.selection" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In an `IF … THEN … ELSE … ENDIF` statement, when are the statements after ELSE executed?",
    options: [
      ["When the condition is FALSE", "Correct: ELSE is the branch for a FALSE condition."],
      ["When the condition is TRUE", "The THEN branch runs when the condition is TRUE."],
      ["Every time, after the THEN branch", "Exactly one of the two branches runs."],
      ["Only when there is no ENDIF", "ENDIF is always needed and does not decide which branch runs."],
    ],
    answer: "A",
    explanation: "With ELSE, one branch always runs: THEN for TRUE, ELSE for FALSE.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which keyword must be the last clause inside a CASE statement when it is used?",
    options: [
      ["OTHERWISE", "Correct: OTHERWISE catches every value not listed and must come last."],
      ["ELSE", "ELSE belongs to an IF statement."],
      ["ENDIF", "ENDIF closes an IF statement."],
      ["DEFAULT", "DEFAULT is used in some languages but not in 0478 pseudocode."],
    ],
    answer: "A",
    explanation: "`OTHERWISE <statement>` is the final clause before ENDCASE.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: `What is output by this algorithm?\n\n${fence("X ← 12\nIF X > 10\n    THEN\n        X ← X - 4\nENDIF\nIF X > 10\n    THEN\n        X ← X * 2\nENDIF\nOUTPUT X")}`,
    value: xOut,
    wrong: [16],
    explanation: `12 > 10, so X becomes 8. The second IF tests the new value: 8 > 10 is FALSE, so X stays ${xOut}.`,
    workedSolution: `1. 12 > 10 is TRUE: X = 12 − 4 = 8.\n2. 8 > 10 is FALSE: X unchanged.\n3. Output ${xOut}.`,
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Test the conditions in order; stop at the first TRUE one."],
    stem: `The input is ${tIn}. What is output?\n\n${fence('INPUT Temperature\nIF Temperature > 33\n    THEN\n        OUTPUT "Very hot"\n    ELSE\n        IF Temperature > 24\n            THEN\n                OUTPUT "Warm"\n            ELSE\n                OUTPUT "Cool"\n        ENDIF\nENDIF')}`,
    options: [
      [advice(tIn), "Correct: 28 > 33 is FALSE, then 28 > 24 is TRUE."],
      ["Very hot", "28 is not greater than 33."],
      ["Cool", "The inner condition 28 > 24 is TRUE, so ELSE is not reached."],
      ["Warm and Cool", "Only one branch of an IF … ELSE can run."],
    ],
    answer: "A",
    explanation: `The first condition is FALSE, so the inner IF is tested; 28 > 24, so "${advice(tIn)}" is output.`,
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    hints: ["Which branch is reached first by a high mark?"],
    stem: `This algorithm should output "Merit" for 65 or more, "Pass" for 40 to 64 and "Fail" below 40.\n\n${fence('IF Mark >= 40\n    THEN\n        OUTPUT "Pass"\n    ELSE\n        IF Mark >= 65\n            THEN\n                OUTPUT "Merit"\n            ELSE\n                OUTPUT "Fail"\n        ENDIF\nENDIF')}\n\nFor which input does it give the **wrong** output?`,
    options: [
      ["72", `Correct: 72 >= 40 is TRUE, so "Pass" is output instead of "Merit".`],
      ["53", "53 should be Pass, and Pass is output."],
      ["38", "38 should be Fail; both conditions are FALSE, so Fail is output."],
      ["40", "40 should be Pass, and 40 >= 40 is TRUE."],
    ],
    answer: "A",
    explanation: "The lower boundary is tested first, so no mark can ever reach the Merit branch. Test `Mark >= 65` first.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In a CASE statement, once a matching case has run, the remaining cases are still checked.",
    answer: false,
    explanation: "False. The first matching case runs and control passes to the statement after ENDCASE.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "An IF statement without an ELSE clause may run none of its statements.",
    answer: true,
    explanation: "True. If the condition is FALSE and there is no ELSE, nothing in the IF statement runs.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each task to the more suitable selection statement.",
    pairs: [
      "Run a different action for menu keys 1, 2, 3 and 4",
      "Award a bonus when sales are over 5000",
      "Give a discount when the customer is a member and spends over 200",
      "Output the name of a month from its number, 1 to 12",
    ],
    right: ["CASE", "IF"],
    rightIndex: [0, 1, 1, 0],
    explanation: "Lists of single values suit CASE; ranges and conditions on several variables need IF.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    hints: ["Which keywords open, catch the rest and close a CASE?"],
    stem: "Complete the CASE statement, which outputs the name of a shift from its code.\n\n```\n[1] ShiftCode\n    'M' : OUTPUT \"Morning\"\n    'A' : OUTPUT \"Afternoon\"\n    'N' : OUTPUT \"Night\"\n    [2] OUTPUT \"Unknown shift\"\n[3]\n```",
    template: "[1] {{blank:a}} [2] {{blank:b}} [3] {{blank:c}}",
    blanks: [
      { id: "a", accepted: ["CASE OF"], choices: ["CASE OF", "IF", "SELECT", "SWITCH"] },
      { id: "b", accepted: ["OTHERWISE"], choices: ["OTHERWISE", "ELSE", "DEFAULT", "THEN"] },
      { id: "c", accepted: ["ENDCASE"], choices: ["ENDCASE", "ENDIF", "END", "NEXT"] },
    ],
    explanation: "`CASE OF ShiftCode … OTHERWISE … ENDCASE`.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Are 'S' and 's' the same character?"],
    stem: `A user types \`'s'\` (lower case). What is output?\n\n${fence("CASE OF Choice\n    'B' : OUTPUT \"Balance\"\n    'S' : OUTPUT \"Send\"\n    OTHERWISE OUTPUT \"Try again\"\nENDCASE")}`,
    options: [
      ["Try again", "Correct: 's' does not equal 'S', so no case matches."],
      ["Send", "Comparisons are exact; lower case 's' is a different character."],
      ["Nothing is output", "OTHERWISE runs when no case matches."],
      ["Balance", "The first case is 'B', which does not match."],
    ],
    answer: "A",
    explanation: "Convert the input first, `Choice ← UCASE(Choice)`, if both cases should be accepted.",
  });
  b.num({
    d: 3, skill: "ANALYSIS", calculator: false,
    hints: ["The IFs are separate, so every one is tested."],
    stem: `How many lines are output when the input is 80?\n\n${fence('INPUT Mark\nIF Mark >= 40\n    THEN\n        OUTPUT "Pass"\nENDIF\nIF Mark >= 65\n    THEN\n        OUTPUT "Merit"\nENDIF\nIF Mark >= 80\n    THEN\n        OUTPUT "Distinction"\nENDIF')}`,
    value: msg80,
    wrong: [1],
    explanation: `80 satisfies all three separate conditions, so ${msg80} lines are output. Nested IFs with ELSE would output only one.`,
    workedSolution: `1. 80 >= 40: "Pass".\n2. 80 >= 65: "Merit".\n3. 80 >= 80: "Distinction".\n4. ${msg80} lines.`,
  });
  b.num({
    d: 4, skill: "APPLICATION", calculator: false,
    hints: ["Find the weight band first, then apply the express rule."],
    stem: `A courier in Masvingo uses this algorithm. What is output when \`Weight\` is 7 and \`Express\` is TRUE?\n\n${fence('IF Weight <= 2\n    THEN\n        Charge ← 6\n    ELSE\n        IF Weight <= 10\n            THEN\n                Charge ← 9\n            ELSE\n                Charge ← 15\n        ENDIF\nENDIF\nIF Express\n    THEN\n        Charge ← Charge + 4\nENDIF\nOUTPUT Charge')}`,
    value: cw,
    wrong: [9],
    explanation: `7 is over 2 but at most 10, so Charge = 9; Express adds 4, giving ${cw}.`,
    workedSolution: `1. 7 <= 2 is FALSE; 7 <= 10 is TRUE: Charge = 9.\n2. Express is TRUE: Charge = 9 + 4 = ${cw}.\n3. Output ${cw}.`,
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A grade A is awarded for marks from 70 to 100 inclusive. Which condition is correct?",
    options: [
      ["`Mark >= 70 AND Mark <= 100`", "Correct: both limits are included."],
      ["`Mark > 70 AND Mark < 100`", "This misses 70 and 100."],
      ["`Mark >= 70 OR Mark <= 100`", "Every mark satisfies one side, so all marks get an A."],
      ["`Mark = 70 AND Mark = 100`", "A mark cannot equal both values."],
    ],
    answer: "A",
    explanation: "Inclusive range: >= the lower limit AND <= the upper limit.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    hints: ["Think about how many values are compared and against what."],
    stem: "A program offers a menu with options 1 to 6. Explain why a CASE statement is more suitable than nested IF statements for processing the choice.",
    points: [
      "One variable is compared with a list of single values, which is exactly what CASE does / it is shorter and easier to read than six nested IFs",
      "OTHERWISE handles any invalid choice in one clause",
    ],
    explanation: "CASE suits a single variable with discrete values.",
    modelAnswer: "The choice is one variable compared with six single values, so a CASE statement lists them clearly without six levels of nesting, and the OTHERWISE clause catches any invalid choice with one error message.",
  });
  b.manualShort({
    d: 4, skill: "CREATION", marks: 5,
    hints: ["Reject negative ages first.", "Test the age bands in an order that cannot overlap."],
    stem: "A museum in Bulawayo charges 3 dollars for visitors under 12, 5 dollars for visitors aged 12 to 59, and 2 dollars for visitors aged 60 or over. Write pseudocode that inputs a visitor's age and outputs the price, or an error message if the age is negative.",
    points: [
      "Prompts for and inputs the age",
      "Checks for a negative age and outputs an error message",
      "Correct condition and price for under 12",
      "Correct condition and price for 12 to 59",
      "Correct price for 60 or over, using ELSE or a correct condition, with matching ENDIFs",
    ],
    explanation: "Four outcomes, so nested IFs (or IF with full ranges).",
    modelAnswer: "```\nOUTPUT \"Enter age\"\nINPUT Age\nIF Age < 0\n    THEN\n        OUTPUT \"Age cannot be negative\"\n    ELSE\n        IF Age < 12\n            THEN\n                OUTPUT \"Price: 3 dollars\"\n            ELSE\n                IF Age <= 59\n                    THEN\n                        OUTPUT \"Price: 5 dollars\"\n                    ELSE\n                        OUTPUT \"Price: 2 dollars\"\n                ENDIF\n        ENDIF\nENDIF\n```",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, marks: 6, secs: 540, calculator: false,
    hints: ["Find the band first.", "The 50 in the last band is the bill for the first 30 units."],
    stem: `A town council bills water use in bands.\n\n${fence(codeWater)}`,
    parts: [
      P.num({ label: "(a)", stem: "State the bill output when the input is 24.", value: w1, wrong: [24 * 2], explanation: `24 is in the middle band: 10 + (24 − 10) × 2 = ${w1}.`, workedSolution: `1. 24 <= 10 is FALSE; 24 <= 30 is TRUE.\n2. 10 + 14 × 2 = ${w1}.` }),
      P.num({ label: "(b)", stem: "State the bill output when the input is 35.", value: w2, wrong: [35 * 3], explanation: `35 is over 30: 50 + (35 − 30) × 3 = ${w2}.`, workedSolution: `1. Both conditions are FALSE.\n2. 50 + 5 × 3 = ${w2}.` }),
      P.mcq({
        label: "(c)", stem: "Which set of inputs best tests every boundary of this algorithm?",
        options: [["10, 11, 30, 31", "Correct: each boundary and the value just above it."], ["5, 20, 40, 60", "These test each band but none of the boundaries."], ["0, 50, 100, 150", "These miss the boundaries at 10 and 30."], ["10, 20, 30, 40", "These miss the values just past each boundary."]],
        answer: "A", explanation: "Boundary testing uses the last value in a band and the first value of the next.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "The council wants a message \"High use\" output, as well as the bill, whenever more than 40 units are used. Write the pseudocode and say where it goes.",
        points: ["A separate IF placed after the bill is calculated (not inside the ELSE branches)", "Condition Units > 40", "OUTPUT \"High use\" with ENDIF"],
        modelAnswer: "After the nested IF (before or after the bill is output):\n\n```\nIF Units > 40\n    THEN\n        OUTPUT \"High use\"\nENDIF\n```",
      }),
    ],
    explanation: `Bills ${w1} and ${w2}; boundaries 10/11 and 30/31; a separate IF for the message.`,
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, marks: 8, secs: 720, calculator: false,
    hints: ["Find the case that matches the operator.", "/ gives a real result."],
    stem: `Sipho writes a simple calculator.\n\n${fence(codeCalc)}`,
    parts: [
      P.num({ label: "(a)", stem: "State the value of `Answer` for the inputs 14, `'*'`, 3.", value: c1, wrong: [14 + 3], explanation: `14 × 3 = ${c1}.`, workedSolution: `1. '*' matches the third case.\n2. 14 × 3 = ${c1}.` }),
      P.num({ label: "(b)", stem: "State the value of `Answer` for the inputs 27, `'/'`, 6.", value: c2, wrong: [Math.floor(c2)], explanation: `27 / 6 = ${c2}; / gives a real result.`, workedSolution: `1. '/' matches the fourth case.\n2. 27 ÷ 6 = ${c2}.` }),
      P.mcq({
        label: "(c)", stem: "The inputs are 9, `'x'`, 2. What happens?",
        options: [["\"Unknown operator\" is output", "Correct: 'x' matches no case, so OTHERWISE runs."], ["Answer is set to 18", "'x' is not the '*' character."], ["The program stops with an error", "OTHERWISE handles every unlisted value."], ["Answer is set to 11", "No case matches 'x'."]],
        answer: "A", explanation: "Any operator not listed reaches OTHERWISE.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Identify a run-time problem with the `'/'` case and describe how to prevent it.",
        points: ["Dividing by zero when SecondNumber is 0 causes a run-time error", "Check IF SecondNumber = 0 (output a message) before dividing / ELSE divide"],
        modelAnswer: "If SecondNumber is 0 the division fails at run time. Inside the '/' case, test `IF SecondNumber = 0` and output \"Cannot divide by zero\"; otherwise do the division.",
      }),
      P.manual({
        label: "(e)", marks: 3, stem: "Rewrite the first two cases (`'+'` and `'-'`) and the OTHERWISE clause using IF statements instead of CASE.",
        points: ["IF Operator = '+' THEN Answer ← FirstNumber + SecondNumber", "Nested in ELSE: IF Operator = '-' THEN Answer ← FirstNumber - SecondNumber", "Final ELSE outputs \"Unknown operator\", with two ENDIFs"],
        modelAnswer: "```\nIF Operator = '+'\n    THEN\n        Answer ← FirstNumber + SecondNumber\n    ELSE\n        IF Operator = '-'\n            THEN\n                Answer ← FirstNumber - SecondNumber\n            ELSE\n                OUTPUT \"Unknown operator\"\n        ENDIF\nENDIF\n```",
      }),
    ],
    explanation: `(a) ${c1}; (b) ${c2}; (c) OTHERWISE runs; (d) guard against division by zero.`,
  });

  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which keyword closes an IF statement in pseudocode?",
    accepted: ["ENDIF"],
    rejected: ["ENDCASE"],
    wrong: ["END"],
    explanation: "Every IF is closed by ENDIF; a CASE statement is closed by ENDCASE.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "An IF statement nested inside the ELSE branch of another IF statement needs its own ENDIF, so the pair needs two ENDIFs in total.",
    answer: true,
    explanation: "True. Each IF is closed by its own ENDIF; the inner one is closed first.",
  });

  b.card("DEFINITION", "Selection", "A construct where a condition (TRUE or FALSE) decides which statements run next.");
  b.card("FORMULA", "IF with ELSE", "IF condition\n    THEN\n        statements\n    ELSE\n        statements\nENDIF");
  b.card("FORMULA", "CASE", "CASE OF Variable\n    value1 : statement\n    value2 : statement\n    OTHERWISE statement\nENDCASE");
  b.card("CONCEPT", "Nested IF order", "With >= tests, check the highest boundary first; otherwise high values stop at a lower branch.");
  b.card("CONCEPT", "IF or CASE?", "CASE: one variable against single values (menus). IF: ranges, several variables, AND/OR conditions.");
  b.card("FACT", "CASE runs one branch", "Cases are tested in order; the first match runs and control passes to after ENDCASE.");
  b.card("CONCEPT", "Separate IFs vs ELSE", "Separate IFs are all tested, so several can run. Use ELSE / nesting when only one outcome may apply.");
  b.card("FACT", "Boundary test values", "Test on and either side of each boundary (e.g. 49, 50, 74, 75) to catch > / >= errors.");
});
