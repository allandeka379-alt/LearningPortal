// Slice w4b: practical programming in Python (acs.skills.python-practical, both boards).
import { concept, P, chk, same, mdTable, codeBlock, py } from "../lib.mjs";
import { mc, pm } from "../tables/w4b-q.mjs";

concept("acs.skills.python-practical", { file: "skills/python-practical", keyPrefix: "skills.python-practical" }, (b) => {
  // ---- library fines program
  const fineDef = `def fine(days_late):
    if days_late <= 0:
        return 0
    amount = days_late * 0.2
    if amount > 10:
        amount = 10
    return round(amount, 2)`;
  const fineOf = (d) => Number(py(`${fineDef}\nprint(fine(${d}))`));
  const fines = { 3: fineOf(3), 10: fineOf(10), 24: fineOf(24), 50: fineOf(50), 60: fineOf(60), 0: fineOf(0), "-4": fineOf(-4) };
  same([fines[3], fines[10], fines[24], fines[50], fines[60], fines[0], fines["-4"]], [0.6, 2, 4.8, 10, 10, 0, 0]);
  const fineMain = `${fineDef}

def read_days():
    try:
        return int(input())
    except ValueError:
        return None

days = read_days()
if days is None:
    print("Enter a whole number of days")
else:
    print("Fine:", fine(days))`;
  const runF = (s) => py(fineMain, s);
  same(runF("24"), "Fine: 4.8");
  same(runF("abc"), "Enter a whole number of days");

  // ---- debugging: average
  const buggy = `def average(values):
    total = 0
    for i in range(1, len(values)):
        total = total + values[i]
    return total / len(values)

print(average([6, 9, 12]))`;
  const buggyOut = py(buggy);
  same(buggyOut, "7.0");
  const fixedOut = py(buggy.replace("range(1, len(values))", "range(len(values))"));
  same(fixedOut, "9.0");
  const emptyErr = py(`def average(values):
    return sum(values) / len(values)
try:
    average([])
except ZeroDivisionError as e:
    print(type(e).__name__)`);
  same(emptyErr, "ZeroDivisionError");

  // ---- safe input function (model)
  const safe = `def read_whole_number(low, high):
    while True:
        try:
            value = int(input())
        except ValueError:
            print("Enter a whole number")
            continue
        if low <= value <= high:
            return value
        print("Enter a number from", low, "to", high)

print(read_whole_number(1, 12))`;
  same(py(safe, "x\n13\n7"), "Enter a whole number\nEnter a number from 1 to 12\n7");

  // ---- multiple choice
  mc(b, 2, "RECALL", "What should a programmer do first when given a practical task described as a scenario?",
    ["List the inputs, processing and outputs", "A plan shows what the program must do."],
    [["Write the whole program at once without making a plan", "Without a plan requirements are missed."], ["Run the program on test data", "There is no program to run yet."], ["Take screenshots of the finished program", "Evidence comes at the end."]],
    "Plan first: inputs, processing, outputs and possible problems.", { daily: true });
  mc(b, 2, "RECALL", "Which exception does Python raise for `int(\"abc\")`?",
    ["ValueError", "The text cannot be converted to an integer."],
    [["TypeError", "TypeError is for an operation on the wrong type."], ["NameError", "NameError is for a variable that is not defined."], ["IndexError", "IndexError is for a list index that is out of range."]],
    "A failed conversion raises ValueError.", { daily: true });
  mc(b, 2, "APPLICATION", "A program accepts an age from 11 to 18. Which age is abnormal test data?",
    ["30", "It is outside the valid range and should be rejected."],
    [["11", "11 is a boundary value that is valid."], ["15", "15 is normal data."], ["18", "18 is a boundary value that is valid."]],
    "Abnormal data should be rejected.", { daily: true });
  mc(b, 3, "ANALYSIS", "Why should the expected result of a test be worked out before the program is run?",
    ["The output might be accepted without a check", "The expected result comes from the specification."],
    [["Because the program cannot be run unless it is written down", "The program runs whatever the plan says."], ["Because it makes the program faster when it is run", "It has no effect on speed."], ["Because the computer needs it as an input to the test", "The computer does not need it."]],
    "Expected results come from the specification, not from the output.", { hints: ["What would you be comparing the output with if you decided it afterwards?"] });
  mc(b, 3, "APPLICATION", "A function returns a wrong total. Which action is the most useful first step in debugging?",
    ["Trace the values of the variables to find the first wrong one", "It locates the line where the fault starts."],
    [["Delete the function and start writing it again", "That throws away working parts as well."], ["Add more comments to the lines of the function", "Comments do not locate a fault."], ["Run the program again several times with the same data", "The same fault will appear."]],
    "Tracing values shows where the fault begins.", { hints: ["How do you find the first statement that gives a wrong value?"] });
  mc(b, 2, "UNDERSTANDING", "Which of these is evidence that a practical program works?",
    ["A screenshot of a test run with its input and output", "It shows the program doing what the test plan expects."],
    [["A statement from the programmer that the program works", "A claim without proof does not count as evidence."], ["The name of the programmer who wrote the program", "That does not show that it works."], ["The time that the program took to write and test", "That is not evidence of correct output."]],
    "Screenshots of runs and a completed test plan are evidence.");
  mc(b, 2, "UNDERSTANDING", "Why is a function better than repeating the same code in several places?",
    ["The code is written and tested once and can be reused", "A change is made in one place."],
    [["Functions make the computer run faster in every program", "Speed does not usually change."], ["Python cannot run repeated code", "Python can run repeated code."], ["Functions remove the need to test", "Every function still needs testing."]],
    "Functions reduce repetition and make testing easier.");

  // ---- true / false
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "In Python, `input()` returns a string, so text such as \"24\" must be converted before it is used in a calculation.", answer: true,
    explanation: "True. Convert with int() or float(), inside a try block if the input may be invalid." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "If a program gives the right answers for normal data, no further testing is needed.", answer: false,
    explanation: "False. Boundary data, extreme cases and abnormal data find faults that normal data does not." });

  // ---- fib, num, short, match
  b.fib({ d: 3, skill: "APPLICATION", hints: ["Valid values are accepted; values outside the range are abnormal; values at the edge of the range are boundary data."],
    stem: "A program accepts a whole number of kilograms of maize from 1 to 50. Classify each test value as normal, boundary or abnormal data.",
    template: "25: {{blank:a}}\n\n50: {{blank:b}}\n\n0: {{blank:c}}\n\nabc: {{blank:d}}",
    blanks: [{ id: "a", accepted: ["normal"], choices: ["normal", "boundary", "abnormal"] }, { id: "b", accepted: ["boundary"], choices: ["normal", "boundary", "abnormal"] }, { id: "c", accepted: ["abnormal"], choices: ["normal", "boundary", "abnormal"] }, { id: "d", accepted: ["abnormal"], choices: ["normal", "boundary", "abnormal"] }],
    explanation: "25 is typical, 50 is the largest valid value, and 0 and abc should be rejected." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Multiply the days by the daily rate, then compare with the maximum."],
    stem: "A library program charges 0.2 dollars for each day a book is late, up to a maximum of 10 dollars. It uses this function.\n\n" + codeBlock(fineDef, "python") + "\nState the value returned by `fine(24)`.",
    value: 4.8, wrong: [10, 24], workedSolution: "24 × 0.2 = 4.8, which is less than the maximum of 10.", explanation: "The fine for 24 days is 4.8." });
  b.short({ d: 2, skill: "RECALL", stem: "Name the type of test data that is at the limit of what is valid, such as the largest allowed value.", accepted: ["boundary", "boundary data", "extreme", "extreme data"], wrong: ["normal"], explanation: "Boundary (extreme) data." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each step of the practical routine to its activity.",
    pairs: [["Plan", "List the inputs, processing, outputs and possible problems"], ["Design", "Write the algorithm in pseudocode with subroutines"], ["Test", "Run the program with chosen data and compare with expected results"], ["Debug", "Find and correct the cause of a wrong result"]],
    explanation: "The steps follow one another and may be repeated." });

  // ---- self-marked
  b.manualShort({ d: 4, skill: "CREATION", marks: 4, hints: ["A loop, try/except, and a range test."],
    stem: "Write a Python function `read_whole_number(low, high)` that keeps asking for input until the user types a whole number from `low` to `high` (inclusive), and then returns it. [4]",
    points: ["A loop that repeats until a valid value is entered", "Converts the input with int() inside a try block", "Handles ValueError by showing a message and asking again", "Tests low <= value <= high and returns the value; otherwise shows a message"],
    modelAnswer: codeBlock(safe.split("\n\nprint")[0], "python"), explanation: "Validate both the type and the range." });
  b.manualShort({ d: 4, skill: "CREATION", marks: 4, hints: ["Use the specification: 0.2 dollars per day, maximum 10."],
    stem: "A program uses `fine(days_late)` to charge 0.2 dollars per day late with a maximum of 10 dollars. Complete a test plan with four tests, giving a purpose, the input and the expected output for each. [4]",
    points: ["A normal test, e.g. 10 days with expected 2.0", "A boundary test at the maximum, e.g. 50 days with expected 10.0 (or 51 days, expected 10)", "An extreme or boundary test at the lowest value, e.g. 0 days with expected 0", "An abnormal test, e.g. -4 days (expected 0) or text such as abc (expected a message)"],
    modelAnswer: mdTable(["Test", "Purpose", "Input", "Expected"], [["1", "Normal", "10", "2.0"], ["2", "Boundary: the maximum is just reached", "50", "10.0"], ["3", "Boundary: nothing late", "0", "0"], ["4", "Abnormal: negative days", "-4", "0"]]), explanation: "Expected results come from the specification." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Compare actual and expected, locate, correct, re-test."],
    stem: "Describe how a programmer finds and corrects a logic error in a program. [3]",
    points: ["Run tests and compare the actual result with the expected result to find which test fails", "Locate the fault by tracing the code or printing the values of variables to see where they first go wrong", "Correct the code and run all the tests again to check the fault is fixed and nothing else has failed"],
    modelAnswer: "Run the tests and compare actual with expected results to find which test fails. Locate the fault by tracing the code or printing variables to see where they first go wrong. Correct the code and run all the tests again.", explanation: "Test, locate, fix, re-test." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Think about what an examiner can check."],
    stem: "State three items of evidence a learner should keep for a practical programming task. [3]",
    points: ["The program listing, readable and commented", "Screenshots of the program running with the test data", "The completed test plan with expected and actual results (and any changes made after faults were found)"],
    modelAnswer: "The program listing with comments, screenshots of the program running with the test data, and the completed test plan with expected and actual results.", explanation: "Listing, screenshots and test plan." });

  // ---- structured practice
  b.struct({ d: 4, skill: "APPLICATION", examStyle: true, calculator: false, hints: ["Calculate with 0.2 per day and compare with 10.", "A boundary value is at the limit of the valid range."],
    explanation: "Testing a library fine program.",
    stem: `A library in Gokwe charges 0.2 dollars for each day a book is late, up to a maximum fine of 10 dollars. A learner writes this Python program.\n\n${codeBlock(fineMain, "python")}`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: "State the fine printed after \`Fine:\` when the number of days typed is 3, 10 and 60.", template: "3 days: {{blank:a}}\n\n10 days: {{blank:b}}\n\n60 days: {{blank:c}}", blanks: [{ id: "a", input: "number", accepted: ["0.6"] }, { id: "b", input: "number", accepted: ["2", "2.0"] }, { id: "c", input: "number", accepted: ["10", "10.0"] }], wrong: [["3", "10", "60"]], explanation: "3 × 0.2 = 0.6; 10 × 0.2 = 2.0; 60 × 0.2 = 12.0 is above the maximum, so the fine is 10." }),
      P.fib({ label: "(b)", marks: 3, stem: "Classify each test input as normal, boundary or abnormal data for the number of days late.", template: "12: {{blank:a}}\n\n0: {{blank:b}}\n\nabc: {{blank:c}}", blanks: [{ id: "a", accepted: ["normal"], choices: ["normal", "boundary", "abnormal"] }, { id: "b", accepted: ["boundary"], choices: ["normal", "boundary", "abnormal"] }, { id: "c", accepted: ["abnormal"], choices: ["normal", "boundary", "abnormal"] }], explanation: "12 is typical, 0 is the lowest meaningful number of days late, and abc is not a number." }),
      P.manual({ label: "(c)", marks: 2, stem: "State the output of the program when the user types `abc`, and explain how the program produces it.", points: ["The output is Enter a whole number of days", "int(\"abc\") raises a ValueError, which read_days catches and returns None, so the program prints the message"], modelAnswer: "The output is \"Enter a whole number of days\". int(\"abc\") raises a ValueError, which is caught in read_days; the function returns None, so the program prints the message.", explanation: "The exception is handled instead of stopping the program." }),
    ] });
  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, calculator: false, hints: ["Check where the loop starts.", "Dry run the loop for [6, 9, 12]."],
    explanation: "Finding and correcting a logic error in a Python function.",
    stem: `A learner writes a function to find the average of a list, and tests it with the list 6, 9 and 12, for which the correct average is 9.0.\n\n${codeBlock(buggy, "python")}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "State the value printed by the program.", value: 7, wrong: [9, 10], workedSolution: "The loop starts at index 1, so it adds 9 and 12 only (21), and 21 ÷ 3 = 7.0.", explanation: "The program prints 7.0." }),
      pm("(b)", "Which line contains the error?", ["`for i in range(1, len(values)):`", "The loop starts at index 1 and skips the first value."], [["`total = 0`", "The total must start at zero."], ["`total = total + values[i]`", "This line adds each value correctly."], ["`return total / len(values)`", "The average is the total divided by the number of values."]], "range(1, ...) skips index 0, so the first value is never added."),
      P.manual({ label: "(c)", marks: 2, stem: "Write the corrected line.", points: ["for i in range(len(values)): (or range(0, len(values)))", "The loop must start at index 0 so all values are added"], modelAnswer: "`for i in range(len(values)):`", explanation: "The first index of a Python list is 0." }),
      P.short({ label: "(d)", marks: 1, stem: "State the type of error in the function.", accepted: ["logic error", "logical error", "a logic error"], explanation: "The program runs but gives a wrong result: a logic error." }),
      P.manual({ label: "(e)", marks: 1, stem: "State the exception that the corrected function would raise for an empty list, and why.", points: ["ZeroDivisionError, because len(values) is 0 and the total is divided by 0"], modelAnswer: "ZeroDivisionError, because the total is divided by len(values), which is 0.", explanation: "An empty list needs a test or a handler." }),
    ] });

  // ---- flashcards
  b.card("CONCEPT", "Practical routine", "Plan (inputs, processing, outputs, problems), design (pseudocode), code (functions), test, debug, keep evidence.");
  b.card("FACT", "Safe numeric input", "Convert with int() or float() inside try; handle ValueError by a message and asking again.");
  b.card("DEFINITION", "Test plan", "A table of tests: purpose, input, expected result (worked out first), actual result and outcome.");
  b.card("CONCEPT", "Types of test data", "Normal (valid, typical), boundary or extreme (at the limits), abnormal (should be rejected).");
  b.card("CONCEPT", "Debugging", "Compare actual and expected results, trace or print variables to find where they go wrong, fix, then re-run all tests.");
  b.card("FACT", "Evidence", "Commented listing, screenshots of test runs, completed test plan with expected and actual results.");
  b.card("CONCEPT", "Good practice", "Meaningful names, one job per function, comments saying why, no global variables, test the case with no data.");
  b.card("FACT", "Python errors", "ValueError (bad conversion), ZeroDivisionError, IndexError (list index out of range), NameError (undefined variable).");
});
