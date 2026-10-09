// Slice w4b: writing maintainable programs (comp.prog.maintainable-code).
import { concept, P } from "../lib.mjs";
import { fence, sum } from "./w4b-0-kit.mjs";

const ins = [64, 88, 72, 55];
const avg = sum(ins) / ins.length;
const over = ins.filter((x) => x > 70).length;
const poor = `p ← 0
q ← 0
FOR r ← 1 TO 4
INPUT s
p ← p + s
IF s > 70
THEN
q ← q + 1
ENDIF
NEXT r
OUTPUT p / 4, " ", q`;
// Struct: fuel cost code.
const litres = 35;
const priceL = 1.6;
const cost = Number((litres * priceL).toFixed(2));
const poorFuel = `INPUT x
y ← x * 1.6
IF y > 50
THEN
y ← y - 2
ENDIF
OUTPUT y`;
const fuelOut = cost > 50 ? Number((cost - 2).toFixed(2)) : cost;

concept("comp.prog.maintainable-code", { file: "prog/maintainable-code", keyPrefix: "prog.maintainable-code" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the purpose of a comment in a program?",
    options: [
      ["To explain the code to a human reader", "Correct: comments are ignored by the computer."],
      ["To make the program run faster", "Comments are ignored when the program runs."],
      ["To store data the program needs later", "Data is stored in variables, not comments."],
      ["To stop the program when an error occurs", "Comments have no effect on execution."],
    ],
    answer: "A",
    explanation: "A comment explains purpose or method to anyone reading the code.",
  });
  b.mcq({
    d: 1, skill: "APPLICATION",
    stem: "Which identifier is most suitable for a variable holding the number of learners absent today?",
    options: [
      ["`AbsentCount`", "Correct: it describes the data and follows PascalCase."],
      ["`x`", "A single letter says nothing about the data."],
      ["`Number`", "Too vague: the number of what?"],
      ["`TheNumberOfLearnersWhoWereAbsentFromSchoolToday`", "Descriptive, but far too long to read and type."],
    ],
    answer: "A",
    explanation: "A good identifier is descriptive but concise.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A program uses the value 0.15 in six different calculations. How does replacing it with `CONSTANT TaxRate ← 0.15` make the program easier to maintain?",
    options: [
      ["If the rate changes, only one line needs editing", "Correct: every calculation uses the single declaration."],
      ["The calculations run faster with a constant", "Speed is not the benefit."],
      ["Users can now type in a new rate while it runs", "A constant cannot be changed while the program runs."],
      ["Constants can store more decimal places than numbers", "There is no difference in precision."],
    ],
    answer: "A",
    explanation: "A named constant means one edit for a change, and its name explains what 0.15 is.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Comments in a program are executed by the computer like other statements.",
    answer: false,
    explanation: "False. Comments are ignored by the computer; they are only for human readers.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Indenting the statements inside a loop helps a reader see which statements are repeated.",
    answer: true,
    explanation: "True. Indentation shows the structure of loops, selections and subroutines.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each feature to how it helps maintenance.",
    pairs: [
      ["Meaningful identifiers", "The code explains what each item holds or does"],
      ["Comments", "The purpose of a section or method is explained in plain words"],
      ["Constants", "A fixed value is changed in one place only"],
      ["Subroutines", "A task is written once, reused and tested separately"],
    ],
    explanation: "Each feature makes code easier to read, test or change.",
  });
  b.mcq({
    d: 2, skill: "EVALUATION",
    stem: "Which comment is the most useful?",
    options: [
      ["`// Repeat until a valid month (1 to 12) is entered`", "Correct: it explains the purpose of a whole section."],
      ["`// add 1 to Count`", "It only repeats what the code already says."],
      ["`// this is a REPEAT loop with an UNTIL condition`", "It names the construct but not its purpose."],
      ["`// this bit is important`", "It does not say what the code does or why."],
    ],
    answer: "A",
    explanation: "Good comments describe purpose or method, not the obvious.",
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which two characters begin a comment in 0478 pseudocode?",
    accepted: ["//"],
    normalise: ["trim", "remove_whitespace"],
    wrong: ["#"],
    explanation: "Comments start with `//` and continue to the end of the line.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Identifiers contain only letters and digits, start with a letter and are not keywords."],
    stem: "Which identifier is **valid** in 0478 pseudocode?",
    options: [
      ["`Player2Score`", "Correct: letters and digits, starting with a letter."],
      ["`2ndPlayer`", "An identifier cannot start with a digit."],
      ["`Player_Score`", "The underscore is not allowed in 0478 identifiers."],
      ["`OUTPUT`", "Keywords cannot be used as identifiers."],
    ],
    answer: "A",
    explanation: "0478 identifiers use PascalCase with letters and digits only, start with a capital letter and are never keywords.",
  });
  b.num({
    d: 3, skill: "ANALYSIS", calculator: false,
    hints: ["Rename the variables in your head: p is a total, q a count."],
    stem: `The inputs are ${ins.join(", ")}. What is the **first** value output?\n\n${fence(poor)}`,
    value: avg,
    wrong: [sum(ins)],
    explanation: `p totals the inputs (${sum(ins)}); ${sum(ins)} / 4 = ${avg}.`,
    workedSolution: `1. p = ${ins.join(" + ")} = ${sum(ins)}.\n2. p / 4 = ${avg}.`,
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["What are p and q used for?"],
    stem: `Which set of identifiers would make the algorithm above most maintainable?`,
    options: [
      ["`TotalMark`, `HighCount`, `Learner`, `Mark`", "Correct: they describe the total, the count over 70, the loop counter and the input."],
      ["`Total1`, `Total2`, `Counter`, `Value`", "q counts marks over 70; it is not a second total."],
      ["`A`, `B`, `C`, `D`", "Single letters are no better than the originals."],
      ["`Mark`, `Total`, `Average`, `Count`", "These are given to the wrong variables: p is not a single mark."],
    ],
    answer: "A",
    explanation: "p → TotalMark, q → HighCount, r → Learner, s → Mark. Adding a constant for 70 and indenting would help further.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    hints: ["How many places must be edited if the grade boundaries change?"],
    stem: "A program has 300 lines in one block, with the same 12-line grade calculation copied in four places. Which change would most improve its maintainability?",
    options: [
      ["Put the calculation in a function called in all four places", "Correct: one copy to test and change."],
      ["Add a comment above each of the four copies of the calculation", "Comments help reading but four copies must still be changed."],
      ["Shorten every identifier to save space", "Shorter names make code harder to read."],
      ["Remove the indentation to make the program shorter", "Indentation does not affect length meaningfully and helps reading."],
    ],
    answer: "A",
    explanation: "Repeated code belongs in a subroutine.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    hints: ["Name the feature, then say how it helps."],
    stem: "Describe **three** ways a programmer can make a program easier to maintain.",
    points: [
      "Meaningful identifiers, so the purpose of each variable / subroutine is clear",
      "Comments explaining the purpose of the program, subroutines or difficult sections",
      "Constants for fixed values / subroutines for repeated tasks / consistent indentation and white space",
    ],
    explanation: "Each point needs the feature and its benefit.",
    modelAnswer: "Use meaningful identifiers such as TotalSales so the code explains itself. Add comments that state the purpose of each subroutine. Declare fixed values like a tax rate as constants so they are changed in one place.",
  });
  b.manualShort({
    d: 4, skill: "CREATION", marks: 4,
    hints: ["Name every variable after its contents.", "1.6 is the price per litre."],
    stem: `Rewrite this algorithm so that it is easier to maintain. It must work in exactly the same way.\n\n${fence(poorFuel)}`,
    points: [
      "Meaningful identifiers for the litres and the cost (e.g. Litres, Cost)",
      "Constants for the price per litre (1.6), the threshold (50) and/or the discount (2)",
      "A comment stating the purpose, and a prompt before the input",
      "Correct indentation of THEN and the body, and the same logic as the original",
    ],
    explanation: "Improve readability without changing behaviour.",
    modelAnswer: "```\n// Fuel bill: discount of 2 dollars on bills over 50 dollars\nCONSTANT PricePerLitre ← 1.6\nCONSTANT DiscountLimit ← 50\nCONSTANT Discount ← 2\nOUTPUT \"Enter litres bought\"\nINPUT Litres\nCost ← Litres * PricePerLitre\nIF Cost > DiscountLimit\n    THEN\n        Cost ← Cost - Discount\nENDIF\nOUTPUT \"Amount to pay: \", Cost\n```",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6, secs: 540, calculator: false,
    hints: ["Work out x * 1.6 first, then the IF."],
    stem: `A service station in Masvingo uses this algorithm.\n\n${fence(poorFuel)}`,
    parts: [
      P.num({ label: "(a)", stem: `State the value output when the input is ${litres}.`, value: fuelOut, wrong: [cost], explanation: `${litres} × 1.6 = ${cost}; ${cost} > 50, so 2 is taken off: ${fuelOut}.`, workedSolution: `1. y = ${litres} × 1.6 = ${cost}.\n2. ${cost} > 50, so y = ${cost} − 2 = ${fuelOut}.` }),
      P.mcq({
        label: "(b)", stem: "Which feature of this algorithm makes it hardest for another programmer to understand?",
        options: [["The identifiers x and y do not describe their data", "Correct: nothing says that x is litres and y is the cost."], ["It uses an IF statement to decide on the discount", "Selection is a normal construct."], ["It outputs the result without first storing it in a file", "Outputting a value is normal and needed."], ["It uses multiplication", "Arithmetic is a normal part of an algorithm."]],
        answer: "A", explanation: "Meaningless names, unexplained values and no indentation all hinder maintenance; the names are the biggest problem.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "The price per litre changes often. Explain how the programmer should handle the value 1.6, and state **two** other improvements.",
        points: ["Declare 1.6 as a named constant (e.g. CONSTANT PricePerLitre ← 1.6) so a change is made in one place", "Meaningful identifiers / comments", "Indentation / a prompt before INPUT / constants for 50 and 2"],
        modelAnswer: "Declare `CONSTANT PricePerLitre ← 1.6` at the top and use it in the calculation, so a price change is a single edit. Also rename x and y as Litres and Cost, and indent THEN and its statement.",
      }),
      P.tf({ label: "(d)", stem: "Rewriting the algorithm with better identifiers and constants should change the values it outputs.", answer: false, explanation: "False. Improving maintainability must keep the behaviour exactly the same." }),
    ],
    explanation: `Output ${fuelOut}. Use meaningful names, constants and indentation.`,
  });
  b.struct({
    d: 3, skill: "UNDERSTANDING", examStyle: true, marks: 5, secs: 450,
    hints: ["Think about the order of a well-structured program."],
    stem: "Nyasha is planning a program for a school library. It will have constants, global variable declarations, three subroutines and a main program.",
    parts: [
      P.fib({
        label: "(a)", marks: 3, stem: "Complete the usual order of the parts of a well-structured program.",
        template: "Comments describing the program → {{blank:a}} → global variable declarations → {{blank:b}} → {{blank:c}}",
        blanks: [
          { id: "a", accepted: ["Constants"], choices: ["Constants", "Subroutine definitions", "Main program"] },
          { id: "b", accepted: ["Subroutine definitions"], choices: ["Constants", "Subroutine definitions", "Main program"] },
          { id: "c", accepted: ["Main program"], choices: ["Constants", "Subroutine definitions", "Main program"] },
        ],
        explanation: "Comments, constants, globals, subroutines (defined before use), then the main program.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Suggest a meaningful identifier for (i) a function that checks whether a book is overdue and (ii) a procedure that prints a borrower's list of books.",
        points: ["(i) A Boolean-sounding name such as IsOverdue / CheckOverdue", "(ii) A task name such as PrintBorrowerBooks / ShowBooksOnLoan"],
        modelAnswer: "(i) `IsOverdue` (ii) `PrintBooksOnLoan`",
      }),
    ],
    explanation: "Constants, subroutine definitions, main program; descriptive subroutine names.",
  });

  b.card("DEFINITION", "Maintainable program", "A program that others can easily read, understand, correct and update.");
  b.card("DEFINITION", "Meaningful identifier", "A name that describes what a variable, constant, array or subroutine holds or does, e.g. TotalSales.");
  b.card("DEFINITION", "Comment", "Text for human readers, ignored by the computer; starts with // in pseudocode.");
  b.card("CONCEPT", "Good comments", "Explain purpose and method (why/what), not the obvious; keep them up to date.");
  b.card("CONCEPT", "Constants and maintenance", "A fixed value declared once as a constant is changed in one place and its name explains it.");
  b.card("CONCEPT", "Subroutines and maintenance", "Repeated code written once: reused, tested separately, changed in one place.");
  b.card("FACT", "0478 identifier rules", "Letters and digits only, start with a capital letter, PascalCase, no underscores, never a keyword.");
  b.card("FACT", "Program structure", "Comments, constants, global declarations, subroutine definitions, main program.");
  b.card("CONCEPT", "Refactoring rule", "Making code more maintainable must not change what it does: test with the same data before and after.");
});
