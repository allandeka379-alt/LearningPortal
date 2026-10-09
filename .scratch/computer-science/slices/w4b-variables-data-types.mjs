// Slice w4b: variables, constants, data types, input and output (comp.prog.variables-data-types).
import { concept, P, ZIM, CAM } from "../lib.mjs";
import { fence, recordTrace } from "./w4b-0-kit.mjs";

// Sequence trace: X ← 4, Y ← X * 3, X ← Y - X, Y ← Y + X.
let X = 4;
let Y = X * 3;
X = Y - X;
Y = Y + X;
const seq1 = { X, Y };
// Copy then change: A ← 5, B ← A, A ← 9.
const copyB = 5;
// Struct trace: Mangoes.
const mTrace = recordTrace(["Boxes", "PerBox", "Total", "OUTPUT"], (rec) => {
  const s = {};
  s.Boxes = 7; rec(s);
  s.PerBox = 24; rec(s);
  s.Total = s.Boxes * s.PerBox; rec(s);
  s.Boxes = s.Boxes - 2; rec(s);
  s.Total = s.Total - 2 * s.PerBox; rec(s);
  s.OUTPUT = `${s.Boxes} boxes, ${s.Total} mangoes`; rec(s);
});
const mFinal = mTrace.snaps.at(-1);
// Rectangle program values (model answer only; no stem numbers).

const codeM = `Boxes ← 7
PerBox ← 24
Total ← Boxes * PerBox
Boxes ← Boxes - 2
Total ← Total - 2 * PerBox
OUTPUT Boxes, " boxes, ", Total, " mangoes"`;

concept("comp.prog.variables-data-types", { file: "prog/variables-data-types", keyPrefix: "prog.variables-data-types" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which data type is most suitable for storing the number of learners in a class?",
    options: [
      ["INTEGER", "Correct: a count of learners is always a whole number."],
      ["REAL", "A class cannot have a fractional number of learners."],
      ["STRING", "The value is a number that may be used in calculations, such as a total."],
      ["BOOLEAN", "A Boolean holds only TRUE or FALSE."],
    ],
    answer: "A",
    explanation: "Counts are whole numbers, so INTEGER is the most suitable type.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A program stores a customer's mobile number, such as `0773 508 216`. Which data type is most suitable?",
    options: [
      ["STRING", "Correct: no arithmetic is done on it, and the leading zero and spaces must be kept."],
      ["INTEGER", "An integer would drop the leading zero and cannot hold spaces."],
      ["REAL", "A phone number has no fractional part and is never used in calculations."],
      ["CHAR", "A CHAR holds only one character."],
    ],
    answer: "A",
    explanation: "Phone numbers are identifiers, not quantities: store them as strings.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which of these is a correctly written CHAR value in 0478 pseudocode?",
    options: [
      ["`'Y'`", "Correct: one character in single quotes."],
      ["`\"Yes\"`", "Three characters in double quotes form a STRING."],
      ["`'Yes'`", "A CHAR holds exactly one character."],
      ["`Y`", "Without quotes, Y would be read as an identifier."],
    ],
    answer: "A",
    explanation: "A CHAR literal is a single character in single quotes.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why would a programmer declare the hourly pay rate as a constant rather than a variable?",
    options: [
      ["The rate is fixed for the whole run and only one line changes if it is updated", "Correct: one edit updates every use, and it cannot be changed by mistake."],
      ["Constants use less memory than variables of the same data type", "Memory saving is not the reason given in either syllabus."],
      ["A constant can be changed by the user with an INPUT statement while the program runs", "A constant cannot be changed while the program runs."],
      ["Only constants can hold REAL values in pseudocode", "Variables can hold REAL values too."],
    ],
    answer: "A",
    explanation: "Constants make programs easier to read and update, and protect values that must not change.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each data item to its most suitable data type.",
    pairs: [
      ["Price of a loaf of bread", "REAL"],
      ["Goals scored in a match", "INTEGER"],
      ["First letter of a surname", "CHAR"],
      ["Name of a town", "STRING"],
      ["Whether a fee has been paid", "BOOLEAN"],
    ],
    explanation: "Prices can include cents (REAL); goals are counted (INTEGER); one letter is a CHAR; a town name is text (STRING); paid or not is TRUE/FALSE (BOOLEAN).",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The value of a constant can be changed by an assignment statement while the program is running.",
    answer: false,
    explanation: "False. A constant is given its value when it is declared and cannot be changed while the program runs.",
  });
  b.tf({
    d: 2, skill: "RECALL", applies: CAM,
    stem: "In 0478 pseudocode, the REAL value eight is written `8.0`, with a digit on each side of the decimal point.",
    answer: true,
    explanation: "True. REAL literals always have at least one digit on each side of the point, for example `8.0` and `0.5`.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: `What is output by this algorithm?\n\n${fence("X ← 4\nY ← X * 3\nX ← Y - X\nY ← Y + X\nOUTPUT Y")}`,
    value: seq1.Y,
    wrong: [12],
    explanation: `Y becomes 12, then X becomes 12 − 4 = ${seq1.X}, then Y becomes 12 + ${seq1.X} = ${seq1.Y}.`,
    workedSolution: `1. X = 4.\n2. Y = 4 × 3 = 12.\n3. X = 12 − 4 = ${seq1.X}.\n4. Y = 12 + ${seq1.X} = ${seq1.Y}; output ${seq1.Y}.`,
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Assignment copies a value at that moment; it does not link two variables."],
    stem: `What is output by this algorithm?\n\n${fence("A ← 5\nB ← A\nA ← 9\nOUTPUT B")}`,
    options: [
      [String(copyB), "Correct: B received a copy of 5; changing A later does not affect B."],
      ["9", "B is not updated when A changes."],
      ["14", "Nothing is added."],
      ["A", "The value of B is output, not a name."],
    ],
    answer: "A",
    explanation: "`B ← A` copies the value 5 into B. The later assignment to A changes A only.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    hints: ["Save one value before it is overwritten."],
    stem: "Complete the algorithm so that it swaps the values held in `Left` and `Right`.\n\n```\nTemp ← [1]\nLeft ← [2]\nRight ← [3]\n```",
    template: "[1] {{blank:a}} [2] {{blank:b}} [3] {{blank:c}}",
    blanks: [
      { id: "a", accepted: ["Left"], choices: ["Left", "Right", "Temp", "0"] },
      { id: "b", accepted: ["Right"], choices: ["Left", "Right", "Temp", "0"] },
      { id: "c", accepted: ["Temp"], choices: ["Left", "Right", "Temp", "0"] },
    ],
    explanation: "Copy Left into Temp, copy Right into Left, then put the saved value from Temp into Right.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: `\`Town\` holds \`"Mutare"\`. What is output by \`OUTPUT "Welcome to ", Town\`?`,
    options: [
      ["Welcome to Mutare", "Correct: the literal text is output, then the value of Town."],
      ["Welcome to Town", "Town has no quotes, so its value is output, not its name."],
      ["\"Welcome to \" Mutare", "The quotes mark the literal; they are not output."],
      ["Welcome toMutare", "The literal already ends in a space."],
    ],
    answer: "A",
    explanation: "Text in quotes is output exactly; an identifier is replaced by the value it holds.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which pseudocode keyword declares a named value that cannot change while the program runs?",
    accepted: ["CONSTANT"],
    wrong: ["DECLARE"],
    explanation: "`CONSTANT Name ← value` declares a constant; `DECLARE` is used for variables.",
  });
  b.fib({
    d: 2, skill: "APPLICATION",
    stem: "Complete the declarations for a program that records a runner's name, finishing time in seconds (such as 64.8) and whether the runner finished.",
    template: "`DECLARE RunnerName : {{blank:a}}`\n\n`DECLARE FinishTime : {{blank:b}}`\n\n`DECLARE Finished : {{blank:c}}`",
    blanks: [
      { id: "a", accepted: ["STRING"], choices: ["STRING", "CHAR", "INTEGER", "REAL", "BOOLEAN"] },
      { id: "b", accepted: ["REAL"], choices: ["STRING", "CHAR", "INTEGER", "REAL", "BOOLEAN"] },
      { id: "c", accepted: ["BOOLEAN"], choices: ["STRING", "CHAR", "INTEGER", "REAL", "BOOLEAN"] },
    ],
    explanation: "A name is text (STRING), a time with tenths of a second is REAL, and finished or not is BOOLEAN.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["What may appear after the arrow in a CONSTANT declaration?"],
    stem: "Why is `CONSTANT Deposit ← Price * 0.2` not allowed in 0478 pseudocode?",
    options: [
      ["A constant can only be given a literal value, not an expression", "Correct: only literals such as 0.2 or \"N/A\" may be used."],
      ["Constants must always be written in upper case letters", "Identifiers use PascalCase, including constants."],
      ["A constant cannot hold a REAL value", "Constants can hold any of the basic data types."],
      ["The arrow cannot be used in a constant declaration", "The arrow is exactly how a constant is given its value."],
    ],
    answer: "A",
    explanation: "Write `CONSTANT DepositRate ← 0.2` and calculate `Deposit ← Price * DepositRate` in the program.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", applies: ZIM,
    stem: "A learner types `OUTPT \"Hello\"` instead of `OUTPUT \"Hello\"`. Which rules of the language has the learner broken?",
    options: [
      ["Its syntax", "Correct: syntax is the grammar of the language, including the spelling of keywords."],
      ["Its semantics", "Semantics is the meaning of a statement; this statement cannot even be read."],
      ["Its data types", "No data type is involved in the mistake."],
      ["Its constants", "No constant is declared or used."],
    ],
    explanation: "A misspelt keyword is a syntax error. A statement that is grammatically correct but does the wrong thing has a semantic (logic) problem.",
    answer: "A",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "`Count ← Count + 1` is impossible because no number can equal itself plus one.",
    answer: false,
    explanation: "False. The arrow is assignment, not equality: the right side is worked out using the current value of Count, and the result is stored back in Count.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    hints: ["Think about when each one can change."],
    stem: "Explain the difference between a variable and a constant.",
    points: [
      "A variable is a named memory location whose value can change while the program runs",
      "A constant's value is set when it is declared and cannot change while the program runs",
    ],
    explanation: "Both are named stores; only the variable can be assigned a new value during the run.",
    modelAnswer: "A variable holds a value that can be changed by the program while it runs, such as a running total. A constant is given a value once, when declared, and that value stays the same for the whole run, such as a fixed discount rate.",
  });
  b.manualShort({
    d: 4, skill: "CREATION", marks: 5,
    hints: ["Declare, prompt and input, calculate, output.", "Lengths in metres can have fractional parts."],
    stem: "A farmer in Masvingo wants a program that inputs the length and width of a rectangular field in metres and outputs its area and its perimeter. Write the pseudocode, including declarations.",
    points: [
      "Declares variables for length, width, area and perimeter with a suitable numeric type (REAL)",
      "Prompts for and inputs the length",
      "Prompts for and inputs the width",
      "Calculates area as length * width and perimeter as 2 * (length + width)",
      "Outputs the area and perimeter with suitable messages",
    ],
    explanation: "Sequence only: declare, input, process, output.",
    modelAnswer: "```\nDECLARE FieldLength : REAL\nDECLARE FieldWidth : REAL\nDECLARE Area : REAL\nDECLARE Perimeter : REAL\nOUTPUT \"Enter the length in metres\"\nINPUT FieldLength\nOUTPUT \"Enter the width in metres\"\nINPUT FieldWidth\nArea ← FieldLength * FieldWidth\nPerimeter ← 2 * (FieldLength + FieldWidth)\nOUTPUT \"Area: \", Area, \" square metres\"\nOUTPUT \"Perimeter: \", Perimeter, \" metres\"\n```",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, marks: 6, secs: 540,
    hints: ["Ask whether arithmetic is ever done on the value.", "One character in single quotes is a CHAR."],
    stem: "Mbare Hardware keeps a record for each customer account: the account holder's name, the account number (for example `\"004219\"`), the credit limit in dollars (for example 250.00), the number of purchases this month, a one-letter account category (`'C'` for cash or `'A'` for account) and whether the account is blocked.",
    parts: [
      P.fib({
        label: "(a)", marks: 4, stem: "State the most suitable data type for each item.",
        template: "Account number: {{blank:a}}\n\nCredit limit: {{blank:b}}\n\nNumber of purchases: {{blank:c}}\n\nAccount category: {{blank:d}}",
        blanks: [
          { id: "a", accepted: ["STRING"], choices: ["STRING", "CHAR", "INTEGER", "REAL", "BOOLEAN"] },
          { id: "b", accepted: ["REAL"], choices: ["STRING", "CHAR", "INTEGER", "REAL", "BOOLEAN"] },
          { id: "c", accepted: ["INTEGER"], choices: ["STRING", "CHAR", "INTEGER", "REAL", "BOOLEAN"] },
          { id: "d", accepted: ["CHAR"], choices: ["STRING", "CHAR", "INTEGER", "REAL", "BOOLEAN"] },
        ],
        explanation: "The account number keeps its leading zeros (STRING); money is REAL; a count is INTEGER; one letter is CHAR.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Write a declaration for the variable that records whether the account is blocked, and a statement that sets it to show the account is **not** blocked.",
        points: ["`DECLARE` with a meaningful identifier and the type BOOLEAN", "Assigns FALSE with the arrow (no quotes)"],
        modelAnswer: "```\nDECLARE IsBlocked : BOOLEAN\nIsBlocked ← FALSE\n```",
      }),
    ],
    explanation: "STRING, REAL, INTEGER, CHAR; a BOOLEAN set to FALSE.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, marks: 5, secs: 450, calculator: false,
    hints: ["Work through the lines in order, using the latest value of each variable."],
    stem: `A fruit seller in Mutare uses this algorithm to count mangoes.\n\n${fence(codeM)}`,
    parts: [
      P.num({ label: "(a)", stem: "State the value of `Total` straight after `Total ← Boxes * PerBox` is executed.", value: 7 * 24, wrong: [31], explanation: `7 × 24 = ${7 * 24}.`, workedSolution: `1. Boxes = 7, PerBox = 24.\n2. Total = 7 × 24 = ${7 * 24}.` }),
      P.num({ label: "(b)", stem: "State the final value of `Boxes`.", value: mFinal.Boxes, wrong: [7], explanation: `7 − 2 = ${mFinal.Boxes}.`, workedSolution: `1. Boxes starts at 7.
2. Boxes ← 7 − 2 = ${mFinal.Boxes}.` }),
      P.num({ label: "(c)", stem: "State the final value of `Total`.", value: mFinal.Total, wrong: [7 * 24 - 2], explanation: `${7 * 24} − 2 × 24 = ${mFinal.Total}.`, workedSolution: `1. 2 × 24 = 48.\n2. ${7 * 24} − 48 = ${mFinal.Total}.` }),
      P.manual({
        label: "(d)", marks: 2, stem: "The number of mangoes in a box never changes. Explain how `PerBox` should be declared and give **one** benefit.",
        points: ["Declare it as a constant, e.g. `CONSTANT PerBox ← 24`", "Benefit: value cannot be changed by mistake / only one line to edit if the box size changes / the name explains the number"],
        modelAnswer: "`CONSTANT PerBox ← 24`. If the boxes change size, only this one line needs editing, and the program cannot change the value by accident.",
      }),
    ],
    explanation: `Total ${7 * 24} after line 3; finally Boxes = ${mFinal.Boxes} and Total = ${mFinal.Total}; output "${mFinal.OUTPUT}".`,
  });

  b.card("DEFINITION", "Variable", "A named memory location holding a value that can change while the program runs.");
  b.card("DEFINITION", "Constant", "A named value set when declared that cannot change while the program runs, e.g. CONSTANT Discount ← 0.1.");
  b.card("DEFINITION", "Data type", "The kind of data held (INTEGER, REAL, CHAR, STRING, BOOLEAN); it decides storage and allowed operations.");
  b.card("FACT", "INTEGER vs REAL", "INTEGER: whole numbers (25, -3). REAL: numbers with a fractional part, always written with a digit each side of the point (12.0, 0.5).");
  b.card("FACT", "CHAR vs STRING", "CHAR: exactly one character in single quotes ('Y'). STRING: zero or more characters in double quotes (\"Harare\", \"\").");
  b.card("CONCEPT", "Phone numbers are strings", "They are never used in arithmetic and may start with 0 or contain spaces, so store them as STRING.");
  b.card("FORMULA", "Declarations", "DECLARE Total : INTEGER\nCONSTANT Rate ← 0.15 (literal values only)");
  b.card("CONCEPT", "Assignment", "Total ← Total + Price: the right side is worked out first and stored in the variable on the left. = is only for comparing.");
  b.card("CONCEPT", "Swapping two variables", "Use a third variable: Temp ← A, A ← B, B ← Temp. Without Temp both end up with the same value.");
  b.card("DEFINITION", "Syntax and semantics", "Syntax: the grammar rules of a language. Semantics: the meaning, what a correct statement actually does.", undefined, { applies: ZIM });
});
