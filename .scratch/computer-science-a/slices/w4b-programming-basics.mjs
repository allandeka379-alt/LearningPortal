// Slice w4b: variables, constants, expressions and input-output (acs.prog.programming-basics, both boards).
import { concept, P, chk, same, mdTable, codeBlock, py } from "../lib.mjs";
import { mc, pm } from "../tables/w4b-q.mjs";

concept("acs.prog.programming-basics", { file: "prog/programming-basics", keyPrefix: "prog.programming-basics" }, (b) => {
  // ---- computed values
  const mod23 = Number(py("print(23 % 6)"));
  chk(mod23, 5);
  const prec = Number(py("print(3 + 4 * 2 ** 2)"));
  chk(prec, 19);
  const secs = 407;
  const mins = Number(py(`print(${secs} // 60)`));
  const rest = Number(py(`print(${secs} % 60)`));
  chk(mins, 6); chk(rest, 47);
  const trace = (() => { let X = 5; const xs = [X]; let Y = X * 2 + 1; const ys = [Y]; X = Y - X; xs.push(X); return { X, Y }; })();
  chk(trace.Y, 11); chk(trace.X, 6);
  const word = "Chimanimani";
  chk(Number(py(`print(len("${word}"))`)), 11);
  const mid = py(`print("${word}"[4:8])`);
  same(mid, "anim");
  const intPart = Number(py("print(int(9.99))"));
  chk(intPart, 9);
  const area = Number(py("print(12 * 5 // 4)"));
  chk(area, 15);
  const fare = (() => { const adults = 3, kids = 2; return adults * 2.5 + kids * 1.25; })();
  chk(fare, 10);
  const div7 = py("print(18 / 4)");
  same(div7, "4.5");
  const idPy = `code = input()
province = code[:2].upper()
number = int(code[2:])
print(province)
print(number + 1)
print(len(code))`;
  const idOut = py(idPy, "mk0457").split("\n");
  same(idOut, ["MK", "458", "6"]);
  let valueError = "";
  try { py(idPy, "mk04x7"); } catch (e) { valueError = /ValueError/.test(String(e.message)) ? "ValueError" : "other"; }
  same(valueError, "ValueError");

  // ---- multiple choice
  mc(b, 2, "RECALL", "Which data type is the most suitable for a learner's phone number such as 0771234567?",
    ["STRING", "It is not used in calculations and the leading zero must be kept."],
    [["INTEGER", "An integer would drop the leading zero and invites meaningless arithmetic."], ["REAL", "A phone number has no fractional part and is not used in arithmetic."], ["BOOLEAN", "BOOLEAN holds only TRUE or FALSE."]],
    "Codes and numbers that are not calculated with are stored as STRING so that leading zeros are kept.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What is the main advantage of declaring `CONSTANT VatRate ← 0.15` instead of typing 0.15 in each calculation?",
    ["If the rate changes, only one line of the program has to be edited", "Correct: the value is defined in one place."],
    [["The program runs faster because 0.15 is stored in a smaller number of bits", "A constant does not change the speed or the storage."], ["The value of the constant can be changed by the user while the program runs", "A constant cannot change while the program runs."], ["The compiler does not need to know the data type of the value", "Every constant has a type."]],
    "Named constants make programs easier to maintain and read.", { daily: true });
  mc(b, 2, "APPLICATION", "What is the value of `MOD(23, 6)`?",
    [String(mod23), "23 = 3 × 6 + 5, so the remainder is 5."],
    [["3", "3 is the value of DIV(23, 6)."], ["4", "That is the number of times 6 is needed to pass 23."], ["17", "That is 23 - 6, one subtraction only."]],
    "MOD gives the remainder of a whole-number division.", { calculator: false, daily: true });
  mc(b, 3, "APPLICATION", "What is the value of the expression `3 + 4 * 2 ^ 2`?",
    [String(prec), "The power is done first (4), then the multiplication (16), then the addition."],
    [["28", "That adds before multiplying: (3 + 4) * 2 ^ 2."], ["196", "That treats the expression as ((3 + 4) * 2) ^ 2."], ["35", "That treats the expression as (3 + 4) * (2 ^ 2 + 1)."]],
    "Powers are evaluated first, then multiplication, then addition.", { calculator: false, hints: ["Work in the order: brackets, powers, multiplication and division, then addition and subtraction."] });
  mc(b, 2, "UNDERSTANDING", "A Python program reads `age = input()` and then evaluates `age + 1` with the input 14. What happens?",
    ["A TypeError because age is a string", "input() returns a string."],
    [["The program outputs 15 because Python converts the input to a number for the addition", "That would need age to be converted with int()."], ["The program outputs 141 because the characters 14 and 1 are joined together", "Joining digits applies to two strings, not a string and an integer."], ["The program outputs 14 because the addition is ignored when it cannot be done", "The addition is attempted and fails; it is not ignored."]],
    "input() always returns a string, so convert it with int() or float() before calculating.");
  mc(b, 2, "RECALL", "Which pseudocode statement stores the value of `Price * 2` in the variable `Total`?",
    ["`Total ← Price * 2`", "The arrow is the assignment operator."],
    [["`Price * 2 → Total`", "The arrow points the other way in pseudocode."], ["`Total = Price * 2`", "In pseudocode `=` tests for equality."], ["`Total == Price * 2`", "`==` is Python's test for equality."]],
    "In 9618-style pseudocode assignment is written with the left-pointing arrow.");
  mc(b, 3, "ANALYSIS", "A variable `Count` is declared inside a procedure. Which statement is correct?",
    ["Count is local, so the main program cannot use it", "It exists only while the procedure runs."],
    [["Count is global, so every part of the program can use it", "A variable declared inside a routine is local."], ["Count keeps its value between calls to the procedure", "A local variable is created again each time the routine runs."], ["Count can be used by any other procedure that is called from the first", "A called routine has its own scope; it only receives what is passed as parameters."]],
    "Local variables exist only inside the routine in which they are declared.", { hints: ["Where is the variable declared, and where is it visible?"] });
  mc(b, 2, "APPLICATION", "What is the value of `INT(9.99)`? INT removes the fractional part of a real number.",
    [String(intPart), "INT cuts the number off; it does not round."],
    [["10", "That would be rounding."], ["9.9", "INT removes the whole fractional part."], ["0.99", "That is the fractional part which is removed."]],
    "INT truncates: it does not round to the nearest whole number.", { calculator: false });

  // ---- true / false
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "In 9618-style pseudocode the expression `18 / 4` gives the real number 4.5, but `DIV(18, 4)` gives 4.", answer: true,
    explanation: "True. `/` always gives a real result, while DIV gives the whole-number quotient (18 = 4 × 4 + 2)." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A variable that is declared in the main program is called a local variable.", answer: false,
    explanation: "False. A variable declared in the main program, outside any routine, is global. A local variable is declared inside a procedure or function." });

  // ---- fill in the blank and numerical
  b.fib({ d: 2, skill: "APPLICATION", calculator: false,
    stem: "Dry run these statements and state the final value of each variable.\n\n" + codeBlock(`X ← 5
Y ← X * 2 + 1
X ← Y - X`),
    template: "X = {{blank:a}}\n\nY = {{blank:b}}",
    blanks: [{ id: "a", input: "number", accepted: [String(trace.X)] }, { id: "b", input: "number", accepted: [String(trace.Y)] }], wrong: [["5", "10"]],
    explanation: "Y is 5 × 2 + 1 = 11. Then X is 11 - 5 = 6." });
  b.num({ d: 2, skill: "APPLICATION", calculator: false,
    stem: `A string function \`LENGTH(s)\` returns the number of characters in \`s\`. How many characters are in the string "${word}"?`,
    value: 11, wrong: [10, 12], workedSolution: "Count the letters: C-h-i-m-a-n-i-m-a-n-i.", explanation: "Chi-ma-ni-ma-ni has 11 letters." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Multiply before you add."],
    stem: "A bus fare in Masvingo is US\\$2.50 for an adult and US\\$1.25 for a child. The expression `Adults * 2.5 + Children * 1.25` is evaluated with `Adults` = 3 and `Children` = 2. State the result in US\\$.",
    value: fare, unit: "US\$", wrong: [11.25, 17.5], workedSolution: "3 × 2.5 = 7.5 and 2 × 1.25 = 2.5; 7.5 + 2.5 = 10.", explanation: "The total fare is US\\$10." });
  b.short({ d: 1, skill: "RECALL", stem: "State the name of the data type that can hold only the values TRUE or FALSE.", accepted: ["BOOLEAN", "Boolean", "bool"], wrong: ["INTEGER"], explanation: "BOOLEAN holds TRUE or FALSE." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each item of data to the most suitable data type.",
    pairs: [["The number of learners in a class", "INTEGER"], ["The average mark of a class", "REAL"], ["A learner's initial, such as T", "CHAR"], ["A learner's surname", "STRING"], ["Whether the fees are paid", "BOOLEAN"]],
    explanation: "A count is INTEGER; an average has a fractional part (REAL); one character is CHAR; text is STRING; yes/no is BOOLEAN." });

  // ---- self-marked
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 2, stem: "Explain two reasons for using a named constant in a program. [2]",
    points: ["The value is written in one place only, so if it changes it is edited once", "The name describes the value (e.g. VatRate), which makes the program easier to read and avoids typing mistakes"],
    modelAnswer: "The value is defined once, so a change needs only one edit. The meaningful name makes the program easier to read and reduces typing errors.", explanation: "Maintenance and readability." });
  b.manualShort({ d: 3, skill: "CREATION", marks: 4, hints: ["Declare three variables, read two values, calculate, then output."],
    stem: "Write pseudocode that inputs the marks of a learner in Mathematics and Physics, calculates the average of the two marks and outputs it with a message. [4]",
    points: ["Declares or uses suitable variables (numeric types)", "Inputs both marks with suitable prompts", "Calculates the average as (Maths + Physics) / 2 with brackets", "Outputs the average with a message"],
    modelAnswer: codeBlock(`DECLARE Maths, Physics, Average : REAL
OUTPUT "Enter the Mathematics mark"
INPUT Maths
OUTPUT "Enter the Physics mark"
INPUT Physics
Average ← (Maths + Physics) / 2
OUTPUT "Average mark: ", Average`), explanation: "The brackets are essential: without them only Physics is halved." });
  b.manualShort({ d: 3, skill: "CREATION", marks: 4, hints: ["Use // for DIV and % for MOD, and int() on the input."],
    stem: "Write a Python program that reads a number of eggs from the keyboard and outputs how many full trays of 30 can be filled and how many eggs are left over. [4]",
    points: ["Reads the input and converts it with int()", "Uses integer division by 30 for the full trays", "Uses the remainder (%) for the eggs left over", "Outputs both values with suitable messages"],
    modelAnswer: codeBlock(`eggs = int(input())
trays = eggs // 30
left_over = eggs % 30
print("Full trays:", trays)
print("Eggs left over:", left_over)`, "python"), explanation: "Whole-number division and remainder together split a quantity into groups." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Think about where each kind of variable is declared and where it can be used."],
    stem: "Distinguish between a local variable and a global variable and give one advantage of using local variables. [3]",
    points: ["A local variable is declared inside a routine and can be used only in that routine", "A global variable is declared in the main program and can be used throughout the program", "Advantage of local: routines cannot change each other's data by accident (or the memory is released when the routine ends)"],
    modelAnswer: "A local variable is declared inside a procedure or function and can be used only there; a global variable is declared in the main program and can be used anywhere. Local variables stop routines changing each other's data by accident.", explanation: "Scope controls where a variable is visible." });

  // ---- structured practice
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: false, hints: ["DIV gives whole minutes; MOD gives what is left.", "Check the unit of each quantity."],
    explanation: "Converting seconds to minutes and seconds with DIV and MOD.",
    stem: `A teacher at a sports day in Chinhoyi records each runner's time in seconds. This pseudocode converts a time into minutes and seconds.\n\n${codeBlock(`DECLARE Seconds, Minutes, Rest : INTEGER
INPUT Seconds
Minutes ← DIV(Seconds, 60)
Rest ← MOD(Seconds, 60)
OUTPUT Minutes, " min ", Rest, " s"`)}`,
    parts: [
      pm("(a)", "State the most suitable data type for the variable `Seconds`, which holds whole seconds.", ["INTEGER", "Whole numbers need INTEGER."], [["REAL", "No fractional part is needed."], ["STRING", "The value is used in calculations."], ["CHAR", "CHAR holds one character."]], "Whole seconds are INTEGER."),
      P.fib({ label: "(b)", marks: 2, stem: `The input is ${secs}. State the values of \`Minutes\` and \`Rest\`.`, template: "Minutes = {{blank:a}}\n\nRest = {{blank:b}}", blanks: [{ id: "a", input: "number", accepted: [String(mins)] }, { id: "b", input: "number", accepted: [String(rest)] }], wrong: [["7", "47"]], explanation: `${secs} DIV 60 = 6 and ${secs} MOD 60 = 47 because 6 × 60 = 360 and 407 - 360 = 47.` }),
      pm("(c)", "Which expression would give the number of minutes as a real number, such as 6.78?", ["`Seconds / 60`", "The / operator gives a real result."], [["`DIV(Seconds, 60)`", "DIV gives a whole number."], ["`MOD(Seconds, 60)`", "MOD gives the remainder."], ["`Seconds * 60`", "That converts the wrong way."]], "`/` gives a REAL result; DIV gives only the whole part."),
      P.manual({ label: "(d)", marks: 2, stem: "Describe the changes needed so that the program also outputs whole hours, for example 1 h 5 min 7 s.", points: ["Hours is found with DIV(Seconds, 3600)", "Minutes is found from the remainder after hours, MOD(Seconds, 3600) divided by 60 with DIV, and Rest is MOD(Seconds, 60)"], modelAnswer: "Hours ← DIV(Seconds, 3600), Minutes ← DIV(MOD(Seconds, 3600), 60), Rest ← MOD(Seconds, 60).", explanation: "Apply DIV and MOD repeatedly for each unit." }),
    ] });
  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, hints: ["Slicing counts from 0.", "input() returns a string."],
    explanation: "A Python program that splits a code into a province and a number.",
    stem: `A district office uses codes made of two letters followed by digits. This Python program is run.\n\n${codeBlock(idPy, "python")}\n\nThe user types \`mk0457\`.`,
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "State the first line of output.", accepted: [idOut[0]], explanation: "code[:2] is the first two characters, 'mk', and upper() makes it MK." }),
      P.num({ label: "(b)", marks: 1, stem: "State the second line of output.", value: Number(idOut[1]), wrong: [457, 4571], workedSolution: "code[2:] is '0457'; int('0457') is 457; 457 + 1 is 458.", explanation: "The digits become the integer 457, and 1 is added." }),
      P.num({ label: "(c)", marks: 1, stem: "State the third line of output.", value: Number(idOut[2]), wrong: [4, 2], workedSolution: "m, k, 0, 4, 5, 7 is six characters.", explanation: "The code mk0457 has 6 characters, including the leading zero." }),
      pm("(d)", "The user types `mk04x7` instead. What happens when `int(code[2:])` is executed?", ["A ValueError is raised and the program stops", "x is not a digit."], [["The variable number is set to 0 and the program carries on", "Python does not substitute a value."], ["The variable number is set to 47 because the x is ignored", "Python does not ignore invalid characters."], ["The program outputs MK and then continues normally", "The error stops the program before anything is output."]], "Converting text that is not a valid integer raises a ValueError."),
      P.manual({ label: "(e)", marks: 2, stem: "Describe one way the program could be made more robust against the input in part (d).", points: ["Check the digits before converting, for example with code[2:].isdigit()", "If the check fails, output an error message (or ask again) instead of letting the program stop"], modelAnswer: "Test code[2:].isdigit() before converting and, if it is false, output an error message or ask for the code again.", explanation: "Validate before converting." }),
      P.manual({ label: "(f)", marks: 2, stem: "State two differences between how the pseudocode function `MID(Word, 3, 2)` and the Python slice `word[3:5]` identify characters.", points: ["MID counts positions from 1, Python from 0", "MID takes a start position and a length (2); the Python slice takes a start index and an end index that is not included"], modelAnswer: "MID starts counting at 1 and Python at 0. MID is given the start and the length, a slice is given the start and the end index, which is excluded.", explanation: "The two notations differ in start and in length/end." }),
    ] });

  // ---- flashcards
  b.card("DEFINITION", "Variable", "A named memory location that holds a value that can change while the program runs.");
  b.card("DEFINITION", "Constant", "A named value set once that cannot change while the program runs, e.g. CONSTANT VatRate ← 0.15.");
  b.card("FACT", "Basic data types", "INTEGER, REAL, CHAR, STRING, BOOLEAN, DATE. Use STRING for numbers that are not calculated with, such as phone numbers.");
  b.card("FACT", "DIV and MOD", "DIV(a, b) is the whole-number quotient and MOD(a, b) the remainder: DIV(17, 5) = 3, MOD(17, 5) = 2. Python: // and %.");
  b.card("FACT", "Operator order", "Brackets, then powers, then * / DIV MOD, then + -; equal precedence is worked left to right.");
  b.card("FACT", "Python input", "input() returns a string: convert with int() or float() before calculating.");
  b.card("CONCEPT", "Pseudocode and Python positions", "Pseudocode string positions start at 1 (MID(s, 4, 3)); Python indexes start at 0 (s[3:6]).");
  b.card("DEFINITION", "Local variable", "A variable declared inside a routine; it exists and can be used only there.");
  b.card("DEFINITION", "Global variable", "A variable declared in the main program, outside any routine; it can be used anywhere in the program.");
});
