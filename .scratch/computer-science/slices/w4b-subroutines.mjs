// Slice w4b: procedures, functions, parameters and scope (comp.prog.subroutines).
import { concept, P, ZIM, CAM } from "../lib.mjs";
import { fence, MOD } from "./w4b-0-kit.mjs";
import { execFileSync } from "node:child_process";

const Triple = (n) => n * 3;
const t1 = Triple(7) + 1;
const Square = (n) => n * n;
const Add = (a, b) => a + b;
const sq = Add(Square(3), Square(4));
// Global trace.
let Total = 5;
const AddPoints = (p) => {
  Total = Total + p * 2;
};
AddPoints(4);
const afterFirst = Total;
AddPoints(Total);
const gOut = Total;
// Python.
const pySrc = "def double_plus(n):\n    return n * 2 + 1\n\nprint(double_plus(4) + double_plus(1))";
const pyExpect = (4 * 2 + 1) + (1 * 2 + 1);
try {
  const out = execFileSync("python", ["-c", pySrc], { encoding: "utf8" }).trim();
  if (out !== String(pyExpect)) throw new Error("python mismatch " + out);
} catch (e) {
  if (String(e).includes("mismatch")) throw e;
}
// Struct: leap year function.
const IsLeap = (y) => (MOD(y, 400) === 0 ? true : MOD(y, 100) === 0 ? false : MOD(y, 4) === 0);
const years = [2028, 2100, 2000, 2031];
const leapRes = years.map(IsLeap);
if (leapRes.join() !== "true,false,true,false") throw new Error("leap");
// Struct: box procedure.
const boxRows = 3;
const boxCols = 6;

const codeLeap = `FUNCTION IsLeapYear(Year : INTEGER) RETURNS BOOLEAN
    IF MOD(Year, 400) = 0
        THEN
            RETURN TRUE
    ENDIF
    IF MOD(Year, 100) = 0
        THEN
            RETURN FALSE
    ENDIF
    IF MOD(Year, 4) = 0
        THEN
            RETURN TRUE
        ELSE
            RETURN FALSE
    ENDIF
ENDFUNCTION`;

const codeBox = `PROCEDURE DrawBox(Rows : INTEGER, Columns : INTEGER, Symbol : CHAR)
    DECLARE R : INTEGER
    DECLARE C : INTEGER
    FOR R ← 1 TO Rows
        FOR C ← 1 TO Columns
            OUTPUT Symbol
        NEXT C
    NEXT R
ENDPROCEDURE

CALL DrawBox(${boxRows}, ${boxCols}, '#')`;

concept("comp.prog.subroutines", { file: "prog/subroutines", keyPrefix: "prog.subroutines" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the main difference between a function and a procedure?",
    options: [
      ["A function returns a value to where it was called; a procedure does not", "Correct: that is the defining difference."],
      ["A procedure can have parameters; a function cannot", "Both can have parameters."],
      ["A function can only be called once in each program it is in", "Both can be called as many times as needed."],
      ["A procedure always runs faster than the equivalent function", "Speed is not the difference."],
    ],
    answer: "A",
    explanation: "Functions return one value and are used in expressions; procedures are called as statements.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement correctly runs the procedure `PrintReceipt`, which has no parameters?",
    options: [
      ["`CALL PrintReceipt`", "Correct: procedures are run with CALL."],
      ["`OUTPUT PrintReceipt`", "A procedure returns no value to output."],
      ["`PrintReceipt ← CALL`", "A procedure cannot be assigned."],
      ["`RETURN PrintReceipt`", "RETURN is used inside a function to send back a value."],
    ],
    answer: "A",
    explanation: "`CALL <identifier>` is a complete statement that runs a procedure.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: `What is output?\n\n${fence("FUNCTION Triple(N : INTEGER) RETURNS INTEGER\n    RETURN N * 3\nENDFUNCTION\n\nOUTPUT Triple(7) + 1")}`,
    value: t1,
    wrong: [Triple(8)],
    explanation: `Triple(7) returns 21, then 21 + 1 = ${t1}.`,
    workedSolution: `1. N = 7; the function returns 7 × 3 = 21.\n2. 21 + 1 = ${t1}.`,
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "`Larger(A : INTEGER, B : INTEGER)` is a function that returns the larger of two integers. Which statement uses it correctly?",
    options: [
      ["`Best ← Larger(Score1, Score2)`", "Correct: the returned value is stored."],
      ["`CALL Larger(Score1, Score2)`", "CALL is for procedures; the returned value would be lost."],
      ["`Larger(Score1, Score2) ← Best`", "A function call cannot be assigned to."],
      ["`Best ← Larger`", "The function needs its two arguments."],
    ],
    answer: "A",
    explanation: "A function call is used inside an expression such as an assignment.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A variable declared inside a procedure can be used by the main program after the procedure has finished.",
    answer: false,
    explanation: "False. It is local: it exists only while the procedure runs and only inside it.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A function call can be used as part of an expression, for example `Total ← Price + Tax(Price)`.",
    answer: true,
    explanation: "True. The returned value replaces the call and the expression is then evaluated.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term to its description.",
    pairs: [
      ["Parameter", "Receives a value passed to a subroutine when it is called"],
      ["Local variable", "Declared inside a subroutine and usable only there"],
      ["Global variable", "Declared in the main program and usable anywhere"],
      ["Return value", "The single value a function sends back to its call"],
    ],
    explanation: "Parameters receive data; scope is local or global; functions send back a return value.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    hints: ["A function header states the type of value it sends back."],
    stem: "Complete the function, which returns the mean of two real numbers.\n\n```\nFUNCTION Mean(A : REAL, B : REAL) [1] [2]\n    [3] (A + B) / 2\nENDFUNCTION\n```",
    template: "[1] {{blank:a}} [2] {{blank:b}} [3] {{blank:c}}",
    blanks: [
      { id: "a", accepted: ["RETURNS"], choices: ["RETURNS", "RETURN", "AS", "CALL"] },
      { id: "b", accepted: ["REAL"], choices: ["REAL", "INTEGER", "BOOLEAN", "STRING"] },
      { id: "c", accepted: ["RETURN"], choices: ["RETURNS", "RETURN", "OUTPUT", "CALL"] },
    ],
    explanation: "The header ends `RETURNS REAL`; the body sends the value back with `RETURN`.",
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    hints: ["Work out the inner calls first."],
    stem: `What is output?\n\n${fence("FUNCTION Square(N : INTEGER) RETURNS INTEGER\n    RETURN N * N\nENDFUNCTION\n\nFUNCTION Add(A : INTEGER, B : INTEGER) RETURNS INTEGER\n    RETURN A + B\nENDFUNCTION\n\nOUTPUT Add(Square(3), Square(4))")}`,
    value: sq,
    wrong: [Square(3 + 4)],
    explanation: `Square(3) = 9 and Square(4) = 16; Add(9, 16) = ${sq}.`,
    workedSolution: `1. Square(3) = 9.\n2. Square(4) = 16.\n3. Add(9, 16) = ${sq}.`,
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Arguments are matched to parameters by position."],
    stem: `What is output?\n\n${fence('PROCEDURE ShowResult(Name : STRING, Subject : STRING)\n    OUTPUT Name, " passed ", Subject\nENDPROCEDURE\n\nCALL ShowResult("Biology", "Farai")')}`,
    options: [
      ["Biology passed Farai", "Correct: the first argument goes to Name and the second to Subject."],
      ["Farai passed Biology", "That would need the arguments in the other order."],
      ["Name passed Subject", "The parameters' values are output, not their names."],
      ["Nothing, because the call causes an error", "Both arguments are strings, so the call is valid, though illogical."],
    ],
    answer: "A",
    explanation: "Parameters are filled by position, not by meaning: always pass arguments in the order of the definition.",
  });
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    hints: ["Total is global, so the procedure changes it.", "In the second call, Points receives the current value of Total."],
    stem: `What is output?\n\n${fence("DECLARE Total : INTEGER\nPROCEDURE AddPoints(Points : INTEGER)\n    Total ← Total + Points * 2\nENDPROCEDURE\n\nTotal ← 5\nCALL AddPoints(4)\nCALL AddPoints(Total)\nOUTPUT Total")}`,
    value: gOut,
    wrong: [afterFirst],
    explanation: `First call: 5 + 4 × 2 = ${afterFirst}. Second call: Points = ${afterFirst}, so ${afterFirst} + ${afterFirst} × 2 = ${gOut}.`,
    workedSolution: `1. Total = 5.\n2. AddPoints(4): Total = 5 + 8 = ${afterFirst}.\n3. AddPoints(${afterFirst}): Total = ${afterFirst} + ${afterFirst * 2} = ${gOut}.\n4. Output ${gOut}.`,
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a benefit of using subroutines?",
    options: [
      ["A change to a task is made in one place only", "Correct: the code exists only once, however often it is called."],
      ["The program no longer needs to be tested", "Subroutines still need testing, though each can be tested separately."],
      ["Variables no longer need data types", "Parameters and variables still have data types."],
      ["The program can only be written by one programmer", "Subroutines make it easier for a team to share the work."],
    ],
    answer: "A",
    explanation: "Reuse, easier maintenance, separate testing and teamwork are the usual benefits.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    hints: ["What happens to the value a function returns when CALL is used?"],
    stem: "`CalculateTax(Price : REAL) RETURNS REAL` is a function. A learner writes `CALL CalculateTax(Price)` and then `OUTPUT Tax`. Why does this not output the tax?",
    options: [
      ["The returned value is not stored, so Tax never receives it", "Correct: the call must be in an expression, e.g. Tax ← CalculateTax(Price)."],
      ["Functions cannot have REAL parameters", "Any data type may be used for a parameter."],
      ["OUTPUT cannot be used after a function call", "OUTPUT can follow any statement."],
      ["Price must be declared inside the function first", "Price is passed in as the argument."],
    ],
    answer: "A",
    explanation: "Write `Tax ← CalculateTax(Price)` (no CALL) and then output Tax.",
  });
  b.num({
    d: 3, skill: "APPLICATION", applies: ZIM, calculator: false,
    hints: ["Each call returns its own value; add the two results."],
    stem: `What does this Python program display?\n\n\`\`\`\n${pySrc}\n\`\`\``,
    value: pyExpect,
    wrong: [4 * 2 + 1],
    explanation: `double_plus(4) returns 9 and double_plus(1) returns 3; 9 + 3 = ${pyExpect}.`,
    workedSolution: `1. 4 × 2 + 1 = 9.\n2. 1 × 2 + 1 = 3.\n3. Display ${pyExpect}.`,
  });
  b.mcq({
    d: 2, skill: "RECALL", applies: CAM,
    stem: "In 0478 pseudocode, what is the largest number of parameters a procedure or function may have?",
    options: [
      ["Three", "Correct: the syllabus allows up to three parameters."],
      ["One", "More than one is allowed."],
      ["Two", "Up to three are allowed."],
      ["There is no limit", "The 0478 syllabus sets a limit of three."],
    ],
    answer: "A",
    explanation: "Procedures and functions may have no parameters or up to three.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    hints: ["Where is each declared, and where can it be used?"],
    stem: "Explain the difference between a local variable and a global variable, and give **one** reason why local variables are preferred inside subroutines.",
    points: [
      "Local: declared inside a subroutine, usable only there, exists only while it runs",
      "Global: declared in the main program, usable anywhere in the program",
      "Reason: subroutine can be tested / reused independently; avoids accidental changes to data elsewhere; names can be reused without clashes",
    ],
    explanation: "Scope decides where a variable can be used.",
    modelAnswer: "A local variable is declared inside a subroutine and can only be used there while it runs. A global variable is declared in the main program and can be used anywhere. Local variables are preferred because the subroutine then cannot accidentally change data used elsewhere, so it can be tested and reused on its own.",
  });
  b.manualShort({
    d: 4, skill: "CREATION", marks: 5,
    hints: ["A percentage of a price is Price * Percent / 100.", "The main program stores or outputs the returned value."],
    stem: "Write a function `SalePrice` that takes a price and a discount percentage and returns the price after the discount. Then write main-program statements that input a price and output its sale price with a 15 percent discount.",
    points: [
      "Function header with two parameters and data types, and RETURNS REAL",
      "Calculates Price - Price * Percent / 100 (or Price * (1 - Percent / 100))",
      "RETURN of the result and ENDFUNCTION",
      "Main program inputs the price (with a prompt)",
      "Calls the function in an expression (no CALL) with 15 and outputs the result",
    ],
    explanation: "Define once, call in an expression.",
    modelAnswer: "```\nFUNCTION SalePrice(Price : REAL, Percent : REAL) RETURNS REAL\n    RETURN Price - Price * Percent / 100\nENDFUNCTION\n\nOUTPUT \"Enter the price\"\nINPUT ItemPrice\nOUTPUT \"Sale price: \", SalePrice(ItemPrice, 15)\n```",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, marks: 6, secs: 540, calculator: false,
    hints: ["The inner loop outputs one symbol per column, for every row."],
    stem: `Consider this procedure and call.\n\n${fence(codeBox)}`,
    parts: [
      P.num({ label: "(a)", stem: "How many times is a symbol output by the call?", value: boxRows * boxCols, wrong: [boxRows + boxCols], explanation: `${boxRows} rows × ${boxCols} columns = ${boxRows * boxCols}.`, workedSolution: `1. Inner loop: ${boxCols} outputs per row.\n2. ${boxRows} rows: ${boxRows * boxCols}.` }),
      P.mcq({
        label: "(b)", stem: "Which of these are local variables of the procedure, apart from its parameters?",
        options: [["R and C", "Correct: they are declared inside the procedure."], ["Rows and Columns", "These are parameters."], ["Symbol only", "Symbol is a parameter."], ["There are none", "R and C are declared inside the procedure."]],
        answer: "A", explanation: "Variables declared inside the subroutine are local.",
      }),
      P.short({ label: "(c)", stem: "State the identifier of the parameter whose data type is CHAR.", accepted: ["Symbol"], wrong: ["Columns"], explanation: "`Symbol : CHAR`." }),
      P.manual({
        label: "(d)", marks: 3, stem: "Explain why `DrawBox` is written as a procedure and not as a function, and write a call that draws a box of 2 rows and 9 columns of `'*'`.",
        points: ["It performs a task (outputs symbols) and does not need to return a value", "CALL DrawBox(…)", "Arguments in the right order: 2, 9, '*'"],
        modelAnswer: "DrawBox only produces output; it does not calculate a value for the rest of the program, so a procedure is suitable. `CALL DrawBox(2, 9, '*')`.",
      }),
    ],
    explanation: `${boxRows * boxCols} symbols; R and C are local; Symbol is the CHAR parameter.`,
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, marks: 9, secs: 810, calculator: false,
    hints: ["Test the MOD conditions in the order written; RETURN ends the function at once.", "Divisible by 400 is tested first."],
    stem: `A calendar program for a school in Harare uses this function.\n\n${fence(codeLeap)}`,
    parts: [
      P.fib({
        label: "(a)", marks: 4, stem: "State the value returned for each call.",
        template: years.map((y, i) => `\`IsLeapYear(${y})\`: {{blank:y${i}}}`).join("\n\n"),
        blanks: years.map((y, i) => ({ id: `y${i}`, accepted: [leapRes[i] ? "TRUE" : "FALSE"], choices: ["TRUE", "FALSE"] })),
        explanation: `2028 divides by 4 (TRUE); 2100 divides by 100 but not 400 (FALSE); 2000 divides by 400 (TRUE); 2031 does not divide by 4 (FALSE).`,
      }),
      P.mcq({
        label: "(b)", stem: "Why is the return type BOOLEAN?",
        options: [["The answer is always either TRUE or FALSE", "Correct: a year is or is not a leap year."], ["Years are whole numbers", "That is the parameter's type, not the result's."], ["MOD always returns a Boolean", "MOD returns an integer remainder."], ["Functions must always return BOOLEAN", "Functions can return any data type."]],
        answer: "A", explanation: "The function answers a yes/no question.",
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Write main-program pseudocode that inputs a year and uses the function to output either \"366 days\" or \"365 days\".",
        points: ["Prompts and inputs the year", "Calls IsLeapYear(Year) inside an IF condition (no CALL)", "Outputs \"366 days\" when TRUE", "Outputs \"365 days\" in the ELSE branch, with ENDIF"],
        modelAnswer: "```\nOUTPUT \"Enter a year\"\nINPUT Year\nIF IsLeapYear(Year)\n    THEN\n        OUTPUT \"366 days\"\n    ELSE\n        OUTPUT \"365 days\"\nENDIF\n```",
      }),
    ],
    explanation: `Returns ${leapRes.map((r) => (r ? "TRUE" : "FALSE")).join(", ")}.`,
  });

  b.card("DEFINITION", "Subroutine", "A named block of code for one task that can be called whenever needed (procedure or function).");
  b.card("DEFINITION", "Procedure", "A subroutine that performs a task and returns no value; run with CALL Name(…).");
  b.card("DEFINITION", "Function", "A subroutine that returns one value; used in an expression, never with CALL.");
  b.card("FORMULA", "Function syntax", "FUNCTION Name(P : TYPE) RETURNS TYPE\n    RETURN value\nENDFUNCTION");
  b.card("DEFINITION", "Parameter", "A variable in a subroutine's header that receives a value passed in the call; matched by position.");
  b.card("DEFINITION", "Local variable", "Declared inside a subroutine; usable only there and only while it runs.");
  b.card("DEFINITION", "Global variable", "Declared in the main program; usable anywhere, including inside subroutines.");
  b.card("CONCEPT", "Why subroutines?", "Reuse, one place to change, decomposition, separate testing, teamwork.");
  b.card("FACT", "Parameter limit", "0478 pseudocode allows up to three parameters per procedure or function.", undefined, { applies: CAM });
  b.card("FACT", "Subroutines in Python and Visual Basic", "Python: def for both, with return in a function. Visual Basic: Sub (procedure) and Function.", undefined, { applies: ZIM });
});
