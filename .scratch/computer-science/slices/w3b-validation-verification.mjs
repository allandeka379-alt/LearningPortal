// Slice w3b: validation and verification (comp.algorithms.validation-verification, both boards).
import { concept, P, CAM } from "../lib.mjs";

const fence = (s) => "```\n" + s + "\n```";
function isbn13(d12) {
  const w = [...d12].map((c, i) => Number(c) * (i % 2 === 0 ? 1 : 3));
  const sum = w.reduce((a, b) => a + b, 0);
  return { w, sum, check: (10 - (sum % 10)) % 10 };
}
// Check digit to calculate.
const isbnA = "979107745523";
const rA = isbn13(isbnA);
// Validity check of a full ISBN (one digit mistyped).
const isbnB12 = "979186314027";
const rB = isbn13(isbnB12);
const typedB = isbnB12.slice(0, 7) + "9" + isbnB12.slice(8); // 8th digit changed from 4 to 9
const rBt = isbn13(typedB);
if (rBt.check === rB.check) throw new Error("typedB should fail");

// Trace: WHILE length check with inputs.
const lenCode = `OUTPUT "Enter a username of 5 to 12 characters"
INPUT UserName
WHILE LENGTH(UserName) < 5 OR LENGTH(UserName) > 12 DO
    OUTPUT "Invalid length"
    INPUT UserName
ENDWHILE
OUTPUT "Welcome ", UserName`;
const lenInputs = ["Rudo", "TendaiMoyo2008x", "Farai"];
const lenTrace = [];
{
  let k = 0;
  let u = lenInputs[k++];
  let count = 0;
  while (u.length < 5 || u.length > 12) {
    count++;
    lenTrace.push(u.length);
    u = lenInputs[k++];
  }
  lenTrace.push(u.length);
  var lenErrors = count;
  var lenAccepted = u;
}
if (lenErrors !== 2 || lenAccepted !== "Farai") throw new Error("len trace");

// Range check boundaries for age 13..19 inclusive.
const ageCode = `REPEAT
    OUTPUT "Enter age"
    INPUT Age
UNTIL Age >= 13 AND Age <= 19`;
const ageTests = [12, 13, 19, 20];
const ageAccepted = ageTests.map((a) => a >= 13 && a <= 19);

concept("comp.algorithms.validation-verification", { file: "algorithms/validation-verification", keyPrefix: "algorithms.validation-verification" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the purpose of **validation**?",
    options: [
      ["To check automatically that input data is reasonable and follows set rules", "Correct: validation checks data is sensible and allowed."],
      ["To check that data has been copied exactly from the source document", "That is verification."],
      ["To guarantee that every item of data entered is correct", "Validation cannot prove data is correct, only that it is sensible."],
      ["To make a second copy of the data in case it is lost", "That is a backup."],
    ],
    answer: "A",
    explanation: "Validation is an automatic check that data is reasonable and meets rules. A sensible but wrong value still passes.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A program accepts a percentage only if it is between 0 and 100 inclusive. Which validation check is this?",
    options: [
      ["Range check", "Correct: it checks the value lies between two limits."],
      ["Length check", "A length check counts characters."],
      ["Presence check", "A presence check only checks something was entered."],
      ["Format check", "A format check tests a pattern of characters."],
    ],
    answer: "A",
    explanation: "A range check tests that a value lies between a lower and an upper limit.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A website asks a user to type a new password twice and compares the two entries. What is this?",
    options: [
      ["Double entry verification", "Correct: the two entries are compared to verify the data."],
      ["A length check on the password", "A length check counts characters; it does not compare two entries."],
      ["A presence check on the password", "A presence check only checks the field is not empty."],
      ["A visual check by the user", "In a visual check the user reads the data back; here two entries are compared."],
    ],
    answer: "A",
    explanation: "Entering data twice and comparing the entries is double entry, a verification check.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which check is **most** suitable for a school's student code, which is always two letters followed by four digits (for example `MT0457`)?",
    options: [
      ["Format check", "Correct: it checks the pattern of letters and digits."],
      ["Range check", "A code is not a number between two limits."],
      ["Type check", "A type check alone cannot test the letter-then-digit pattern."],
      ["Check digit", "The code has no check digit described."],
    ],
    answer: "A",
    explanation: "A format check tests that each character matches the required pattern.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Which error leaves the value inside the allowed range?"],
    stem: "A range check accepts ages from 11 to 20. Which error will it **fail** to detect?",
    options: [
      ["Typing 14 instead of 15", "Correct: 14 is inside the range, so it passes even though it is wrong."],
      ["Typing 150 instead of 15", "150 is outside the range and is rejected."],
      ["Typing 1 instead of 15", "1 is below 11 and is rejected."],
      ["Typing 51 instead of 15", "51 is above 20 and is rejected."],
    ],
    answer: "A",
    explanation: "Validation only checks that a value is sensible. A wrong value inside the range is accepted; verification is needed to catch it.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    hints: ["Which kind of loop always runs its body at least once?"],
    stem: "Why is a `REPEAT … UNTIL` loop often used to validate input?",
    options: [
      ["The input is always taken at least once and repeated until valid", "Correct: the condition is tested after the body."],
      ["It runs the input a fixed number of times, such as three", "That describes a count-controlled FOR loop."],
      ["It never needs a condition to stop the loop", "It stops when the UNTIL condition is true."],
      ["It checks the data only once and then continues", "That describes an IF statement."],
    ],
    answer: "A",
    explanation: "A post-condition loop runs at least once, so the user is always asked, and repeats until the condition for valid data is true.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    hints: ["What happens to the check digit when two digits are swapped?"],
    stem: "How does a check digit help when a product number is typed in?",
    options: [
      ["The digit is recalculated from the others and compared with the one entered", "Correct: a mismatch shows the number was entered wrongly."],
      ["It is compared with a list of every product number ever sold", "That would be a lookup, not a check digit."],
      ["It makes sure the number that was typed contains the right number of characters", "That is a length check."],
      ["The number is entered twice and the two copies compared", "That is double entry."],
    ],
    answer: "A",
    explanation: "On input the check digit is recalculated from the other digits; if it differs from the one entered, the number is rejected.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS", applies: CAM,
    hints: ["Check each boundary: is 14 accepted? is 18 accepted?"],
    stem: `This algorithm should accept ages from 14 to 18 inclusive.\n\n${fence(`REPEAT
    OUTPUT "Enter age"
    INPUT Age
UNTIL Age > 14 AND Age < 18`)}\n\nWhat is wrong with it?`,
    options: [
      ["It rejects the boundary values 14 and 18", "Correct: > and < exclude the limits; it should use >= and <=."],
      ["It accepts the boundary values 13 and 19", "13 and 19 fail both versions of the condition."],
      ["It accepts every age that is entered", "Ages such as 25 are still rejected."],
      ["It stops after the first age entered", "It repeats until the condition is true."],
    ],
    answer: "A",
    explanation: "The condition should be `Age >= 14 AND Age <= 18`; with `>` and `<` the valid boundary values are rejected.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Double entry and visual checks are both types of verification.",
    answer: true,
    explanation: "True. Both compare the data with the original; range, length, type, presence, format and check digit are validation.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "If data passes every validation check, it must be correct.",
    answer: false,
    explanation: "False. Validation only shows data is reasonable; a wrong value can still be within the rules.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each field to the most suitable validation check.",
    pairs: [
      ["Number of children in a family, 0 to 15", "Range check"],
      ["A surname that must be entered", "Presence check"],
      ["A PIN that must have exactly 4 characters", "Length check"],
      ["The ISBN of a library book", "Check digit"],
    ],
    explanation: "Limits: range. Must be filled in: presence. Exact number of characters: length. ISBN: check digit.",
  });
  b.match({
    d: 3, skill: "ANALYSIS",
    hints: ["Does the check compare with the original, or test a rule?"],
    stem: "Classify each check.",
    pairs: ["The program displays the order and asks the clerk to confirm it", "Quantity must be a whole number", "Two clerks key in the same batch and the entries are compared", "A date must be written as DD/MM/YYYY"],
    right: ["Validation", "Verification"],
    rightIndex: [1, 0, 1, 0],
    explanation: "Confirming on screen and double keying are verification; type and format checks are validation.",
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    hints: ["Multiply the digits by 1, 3, 1, 3, … and add.", "Find what must be added to reach a multiple of 10."],
    stem: `Check digits for thirteen-digit ISBNs are calculated by multiplying the first 12 digits alternately by 1 and 3, adding the products, and finding the digit that makes the total a multiple of 10. Calculate the check digit for **${isbnA.slice(0, 3)}-${isbnA.slice(3, 4)}-${isbnA.slice(4, 8)}-${isbnA.slice(8)}-?**`,
    value: rA.check,
    wrong: [rA.sum % 10],
    explanation: `Products total ${rA.sum}; ${rA.sum} MOD 10 = ${rA.sum % 10}; check digit = ${rA.check}.`,
    workedSolution: `1. Products: ${rA.w.join(" + ")} = ${rA.sum}.\n2. ${rA.sum} MOD 10 = ${rA.sum % 10}.\n3. Check digit = (10 − ${rA.sum % 10}) MOD 10 = ${rA.check}.`,
  });
  b.mcq({
    d: 4, skill: "APPLICATION", calculator: false,
    hints: ["Recalculate the check digit from the first 12 digits typed.", "Compare it with the last digit typed."],
    stem: `The ISBN ${isbnB12}${rB.check} is printed on a book. A librarian types **${typedB}${rB.check}**. Using the ISBN rule (weights 1, 3, 1, 3, …), what does the computer find?`,
    options: [
      [`The check digit should be ${rBt.check}, so the number is rejected`, `Correct: the products total ${rBt.sum}, giving ${rBt.check}, not ${rB.check}.`],
      [`The check digit ${rB.check} matches, so the number is accepted`, "Recalculate from the digits as typed, not the printed ones."],
      ["The number is rejected because it has the wrong length", "It still has 13 digits."],
      ["The number is accepted because the check digit cannot detect one wrong digit", "Check digits detect any single wrong digit with these weights."],
    ],
    answer: "A",
    explanation: `For the typed digits the products total ${rBt.sum}, so the check digit should be ${rBt.check}. It does not match ${rB.check}, so the entry is rejected.`,
  });
  b.fib({
    d: 3, skill: "APPLICATION", applies: CAM,
    hints: ["Each invalid input produces one error message.", "Count the characters in each name."],
    stem: `Trace this algorithm when the inputs are ${lenInputs.map((x) => `\`${x}\``).join(", ")}.\n\n${fence(lenCode)}`,
    template: `The message "Invalid length" is output {{blank:a}} times. The name in the final output is {{blank:b}}.`,
    blanks: [
      { id: "a", accepted: [String(lenErrors)], input: "number" },
      { id: "b", accepted: [lenAccepted] },
    ],
    explanation: `${lenInputs.map((x) => `${x} has ${x.length} characters`).join("; ")}. Only ${lenAccepted} is 5 to 12 characters, so the error is shown ${lenErrors} times and "Welcome ${lenAccepted}" is output.`,
  });
  b.fib({
    d: 2, skill: "APPLICATION", applies: CAM,
    stem: "Complete the presence check.\n\n```\nINPUT Surname\nWHILE Surname [1] \"\" DO\n    OUTPUT \"Surname must not be blank\"\n    [2] Surname\nENDWHILE\n```",
    template: "[1] {{blank:a}} [2] {{blank:b}}",
    blanks: [
      { id: "a", accepted: ["="], choices: ["=", "<>", ">", "<="] },
      { id: "b", accepted: ["INPUT"], choices: ["INPUT", "OUTPUT", "RETURN", "CALL"] },
    ],
    explanation: "The loop repeats while the surname is empty (`= \"\"`), asking for it again with `INPUT`.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    hints: ["Is it sensible? Is it the same as the original?"],
    stem: "Explain why both validation **and** verification are needed when entering data.",
    points: [
      "Validation checks that data is reasonable / within rules but cannot detect a wrong value that is still sensible",
      "Verification checks the data matches the original source, catching copying or typing errors that pass validation",
    ],
    explanation: "Each check catches errors the other misses.",
    modelAnswer: "Validation rejects data that breaks the rules, such as a mark of 150, but would accept 64 typed instead of 46. Verification compares the entry with the original, so it can catch that typing error.",
  });
  b.manualShort({
    d: 4, skill: "CREATION", marks: 5, applies: CAM,
    hints: ["Use a loop so the input repeats until it is valid.", "Check both the length and the presence."],
    stem: "Write an algorithm in pseudocode that asks a user to enter a phone number as a string, and repeats the input until it is **exactly 10 characters** long. Then use a **visual check**: output the number and ask the user to confirm it with Y or N; if the answer is N, the whole input must be repeated.",
    points: [
      "Prompt and INPUT of the phone number",
      "Loop that repeats the input while/until the LENGTH is not / is 10",
      "Error message when the length is wrong",
      "Outputs the number and asks for confirmation (Y/N)",
      "Outer loop repeats everything until the answer is Y",
    ],
    explanation: "A nested loop: the inner loop validates the length; the outer loop repeats until the user confirms.",
    modelAnswer: "```\nREPEAT\n    OUTPUT \"Enter phone number\"\n    INPUT Phone\n    WHILE LENGTH(Phone) <> 10 DO\n        OUTPUT \"Must be 10 characters, enter again\"\n        INPUT Phone\n    ENDWHILE\n    OUTPUT \"You entered \", Phone, \". Correct? (Y/N)\"\n    INPUT Answer\nUNTIL Answer = \"Y\"\n```",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, marks: 6, applies: CAM, calculator: false,
    hints: ["Boundary data sits exactly on the limits.", "Use >= and <= for inclusive limits."],
    stem: `A program for a Gweru netball club accepts a player's age from 13 to 19 inclusive.\n\n${fence(ageCode)}`,
    parts: [
      P.fib({
        label: "(a)", stem: "State whether each test value is accepted.",
        template: ageTests.map((a, i) => `${a}: {{blank:t${i}}}`).join("\n\n"),
        blanks: ageTests.map((a, i) => ({ id: `t${i}`, accepted: [ageAccepted[i] ? "accepted" : "rejected"], choices: ["accepted", "rejected"] })),
        explanation: `${ageTests.map((a, i) => `${a}: ${ageAccepted[i] ? "accepted" : "rejected"}`).join("; ")}.`,
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "The algorithm gives no message when an invalid age is entered. Rewrite it so that an error message is output for each invalid age.",
        points: ["Adds an IF inside the loop with the invalid condition (Age < 13 OR Age > 19)", "Outputs a suitable error message inside the IF, keeping the loop and UNTIL condition correct"],
        modelAnswer: "```\nREPEAT\n    OUTPUT \"Enter age\"\n    INPUT Age\n    IF Age < 13 OR Age > 19\n        THEN\n            OUTPUT \"Age must be 13 to 19\"\n    ENDIF\nUNTIL Age >= 13 AND Age <= 19\n```",
      }),
    ],
    explanation: `(a) ${ageTests.map((a, i) => `${a} ${ageAccepted[i] ? "accepted" : "rejected"}`).join(", ")}.`,
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, marks: 6,
    hints: ["Match the field to the check.", "Verification compares with the original."],
    stem: "Thandeka designs an online application form for a college in Masvingo. It has these fields: *Full name*, *Date of birth* (DD/MM/YYYY), *Number of O-Level passes* (0 to 15) and *Email address* (entered twice).",
    parts: [
      P.match({
        label: "(a)", stem: "Match each field to a suitable check.",
        pairs: ["Full name", "Date of birth", "Number of O-Level passes"],
        right: ["Presence check", "Format check", "Range check", "Check digit"],
        rightIndex: [0, 1, 2],
        explanation: "Name: presence. Date: format. Passes: range.",
      }),
      P.mcq({
        label: "(b)", stem: "Entering the email address twice is an example of:",
        options: [["Double entry verification", "Correct."], ["A length check", "No characters are counted."], ["A visual check", "Two entries are compared by the computer."], ["A format check", "No pattern is tested."]],
        answer: "A", explanation: "Comparing two entries is double entry.",
      }),
      P.manual({
        label: "(c)", marks: 2,
        stem: "Explain why the email address is verified rather than only validated.",
        points: ["A mistyped email can still be in a valid format, so validation would accept it", "The college could not contact the applicant; double entry catches typing errors by comparing the two entries"],
        modelAnswer: "A mistyped address such as one letter wrong still looks like a valid email, so a format check would accept it and the college could not reach the applicant. Entering it twice catches such typing errors.",
      }),
    ],
    explanation: "(a) Presence, format, range. (b) Double entry.",
  });

  b.card("DEFINITION", "Validation", "An automatic check that input data is reasonable and follows set rules; it cannot prove the data is correct.");
  b.card("DEFINITION", "Verification", "A check that data has been entered or copied accurately, matching the original (visual check, double entry).");
  b.card("CONCEPT", "Range, length, type, presence, format", "Range: between limits. Length: number of characters. Type: correct data type. Presence: not blank. Format: pattern of characters.");
  b.card("DEFINITION", "Check digit", "An extra digit calculated from the other digits; recalculated on input to detect mistyped or swapped digits (ISBNs, bar codes).");
  b.card("FORMULA", "ISBN-13 check digit", "Multiply the first 12 digits by 1, 3, 1, 3, …; add; check digit = (10 − total MOD 10) MOD 10.");
  b.card("CONCEPT", "Double entry", "Data is entered twice and the two entries are compared; accepted only if they match. Used for new passwords.");
  b.card("CONCEPT", "Visual check", "The user compares the data on screen with the source, or confirms data the program displays.");
  b.card("CONCEPT", "Validation loop pattern", "Prompt, INPUT, then REPEAT … UNTIL valid (or WHILE invalid DO) with an error message and re-input inside the loop.", "Use >= and <= for inclusive limits.");
  b.card("FACT", "Limit of validation", "A wrong value that is still sensible (e.g. 46 typed as 64) passes validation; verification is needed to catch it.");
});
