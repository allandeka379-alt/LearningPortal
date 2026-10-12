// Slice w3b: Testing, errors and maintenance (acs.sdlc.testing-maintenance, both boards). Programs are run for real with py().
import { concept, P, chk, same, py, codeBlock, mdTable } from "../lib.mjs";
import { mc, pm } from "../tables/w3b-q.mjs";

// faulty pass counter
const passBug = `marks = [40, 66, 39, 71, 40]
passes = 0
for m in marks:
    if m > 40:
        passes = passes + 1
print("Passes:", passes)`;
const passFixed = passBug.replace("m > 40", "m >= 40");
const outBug = py(passBug);
const outFix = py(passFixed);
same(outBug, "Passes: 2");
same(outFix, "Passes: 4");
const marksPB = [40, 66, 39, 71, 40];
let c = 0;
const countAfter = marksPB.map((m) => { if (m > 40) c += 1; return c; });
same(countAfter, [0, 1, 1, 2, 2]);

const ageBug = `ages = [18, 25, 17, 40, 18]
adults = 0
for a in ages:
    if a > 18:
        adults = adults + 1
print("Adults:", adults)`;
same(py(ageBug), "Adults: 2");
same(py(ageBug.replace("a > 18", "a >= 18")), "Adults: 4");

// password rule: 8 to 12 characters inclusive
const rule = `def check(password):
    if len(password) >= 8 and len(password) <= 12:
        return "accepted"
    return "rejected"`;
const pwCases = [["Normal", "gweru2026a", 10], ["Extreme", "abcdefgh", 8], ["Extreme", "abcdefghijkl", 12], ["Abnormal", "abcdefg", 7], ["Abnormal", "abcdefghijklm", 13], ["Abnormal", "", 0]];
const pwResults = pwCases.map(([k, pw, n]) => ({ kind: k, pw, n, out: py(`${rule}\nprint(check(${JSON.stringify(pw)}))`) }));
same(pwResults.map((r) => r.out), ["accepted", "accepted", "accepted", "rejected", "rejected", "rejected"]);
for (const r of pwResults) same(r.pw.length, r.n);

// age rule 12..18 inclusive for classification fib
const ageRule = `def check(age):
    if age >= 12 and age <= 18:
        return "accepted"
    return "rejected"`;
const ages = [15, 12, 19, 18];
const ageOut = ages.map((a) => py(`${ageRule}\nprint(check(${a}))`));
same(ageOut, ["accepted", "accepted", "rejected", "accepted"]);

// run-time error
const rt = `numbers = [4, 8, 0, 5]
for n in numbers:
    print(100 / n)`;
let rtMsg = "";
try { py(rt); } catch (e) { rtMsg = String(e.message).trim().split("\n").filter(Boolean).pop(); }
same(rtMsg, "ZeroDivisionError: division by zero");
const rtPartial = py(`numbers = [4, 8]\nfor n in numbers:\n    print(100 / n)`);
same(rtPartial, "25.0\n12.5");

// boundary count for a range
const lo = 18;
const hi = 65;
const boundaryValues = [lo - 1, lo, hi, hi + 1];
same(boundaryValues, [17, 18, 65, 66]);

concept("acs.sdlc.testing-maintenance", { file: "sdlc/testing-maintenance", keyPrefix: "sdlc.testing-maintenance" }, (b) => {
  mc(b, 1, "RECALL", "A program runs without any error message but displays the wrong total. What type of error is this?",
    ["Logic error", "Correct: the algorithm is wrong."],
    [["Syntax error", "A syntax error stops the program before it runs."], ["Run-time error", "A run-time error makes the program stop while running."], ["Hardware error", "Nothing suggests a hardware fault."]],
    "A wrong result without a message is a logic error.");
  mc(b, 2, "RECALL", "A program stops at line 12 with the message `ZeroDivisionError`. What type of error is this?",
    ["Run-time error", "Correct: it occurred while the program was running."],
    [["Syntax error", "A syntax error is found before the program runs."], ["Logic error", "A logic error does not stop the program."], ["Compile error", "The program started running, so it was not a compile error."]],
    "Dividing by zero stops a program while it is running.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "A program accepts marks from 0 to 100. Which value is an example of extreme (boundary) test data?",
    ["100", "Correct: it is valid and at the edge of the range."],
    [["57", "This is normal data."], ["101", "This is abnormal data."], ["-5", "This is abnormal data."]],
    "Boundary data is valid data at the limit of the range.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which type of testing is carried out by selected real users in their own setting before the final release?",
    ["Beta testing", "Correct."],
    [["Alpha testing", "Alpha testing is done in-house by the developer's staff."], ["Stub testing", "Stub testing uses stand-ins for unfinished modules."], ["White-box testing", "White-box testing chooses tests from the code."]],
    "Beta testing is done by real users outside the development team.");
  mc(b, 3, "APPLICATION", "A tax rate changes by law and a payroll program is updated to use the new rate. What type of maintenance is this?",
    ["Adaptive", "Correct: the program is changed because its environment has changed."],
    [["Corrective", "No fault was being corrected."], ["Perfective", "The change was forced, not an improvement for its own sake."], ["Preventive", "Not one of the three types in this course."]],
    "Adaptive maintenance responds to changes in the environment such as laws or hardware.", { hints: ["Why is the change needed?"] });
  mc(b, 3, "APPLICATION", "A programmer chooses tests by reading the code so that every branch of every IF statement is executed. What type of testing is this?",
    ["White-box testing", "Correct: the tests are chosen from the code."],
    [["Black-box testing", "Black-box tests are chosen from the specification without the code."], ["Acceptance testing", "Acceptance testing is done by the customer."], ["Beta testing", "Beta testing is done by selected users."]],
    "White-box tests use knowledge of the code.", { hints: ["Is the tester looking at the code or only at the specification?"] });
  mc(b, 3, "ANALYSIS", "A program is made of modules A, B and C. Module C is not written yet. The programmer wants to test A and B. What can be used in place of C?",
    ["A stub returning a fixed value", "Correct."],
    [["A beta tester from the company", "A beta tester is a person, not a stand-in module."], ["The user guide for the program", "Documentation cannot be called by a program."], ["A syntax error in module C", "A syntax error would stop the program."]],
    "A stub is a simple stand-in for a module that has not been written.", { hints: ["What does the calling module need from C?"] });
  mc(b, 4, "ANALYSIS", "A programmer fills in the expected results of the test plan by running the finished program and copying its output. What is wrong with this?",
    ["A faulty program would still appear to pass the tests", "Correct."],
    [["Expected results should be written after the final release", "They should be written before testing."], ["The expected results should always be 'accepted'", "Some tests should expect rejection."], ["Nothing is wrong; the program's output is the expected result", "The program may be wrong."]],
    "Expected results must be worked out independently of the program being tested.", { hints: ["What if the program contains a logic error?"] });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Testing can prove that a program contains no faults.", answer: false, explanation: "False. Testing can show that faults are present but cannot prove that none remain." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each type of maintenance to an example.",
    pairs: [["Corrective", "Correct a total that is wrong when no marks are entered"], ["Adaptive", "Change a program to work with a new tax law"], ["Perfective", "Make a report print faster and add a new menu option"]],
    explanation: "Corrective fixes faults, adaptive responds to change and perfective improves." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each type of test data to the example for a rule that accepts ages 12 to 18 inclusive.",
    pairs: [["Normal", "15"], ["Extreme (boundary)", "12"], ["Abnormal", "19"]],
    extraRight: ["Not a valid age value type"],
    explanation: "15 is normal, 12 is at the boundary and 19 is invalid." });
  b.fib({ d: 3, skill: "APPLICATION", hints: ["Valid ages are 12 to 18 inclusive."],
    stem: `A program accepts ages from 12 to 18 inclusive. This function was run with each value.\n\n${codeBlock(ageRule, "python")}\n\nGive the result for each test value.`,
    template: `Age 15: {{blank:a}}\n\nAge 12: {{blank:b}}\n\nAge 19: {{blank:c}}\n\nAge 18: {{blank:d}}`,
    blanks: ages.map((a, i) => ({ id: "abcd"[i], accepted: [ageOut[i]], choices: ["accepted", "rejected"] })),
    explanation: "12 and 18 are the boundaries and are accepted; 19 is outside the range." });
  b.short({ d: 2, skill: "RECALL", stem: "Name the type of testing in which the customer tests the system against the requirements and decides whether to accept it.",
    accepted: ["acceptance testing", "acceptance", "acceptance test", "user acceptance testing"], explanation: "Acceptance testing." });
  b.num({ d: 3, skill: "ANALYSIS", calculator: false, hints: ["Check each age: is it more than 18?", "The ages equal to 18 do not count."],
    stem: `Here is a program.\n\n${codeBlock(ageBug, "python")}\n\nA person aged 18 or over is an adult, so a person aged exactly 18 should count. What number does the program print after \`Adults:\`?`,
    value: 2, wrong: [4, 3], workedSolution: "1. The ages over 18 are 25 and 40.\n2. The ages equal to 18 are not counted because the test uses >.\n3. The program prints 2.", explanation: "Only 25 and 40 are above 18, so the program prints 2." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Count the number of lines of output before the error."],
    stem: `Here is a program.\n\n${codeBlock(rt, "python")}\n\nHow many numbers are displayed before the program stops with an error?`,
    value: 2, wrong: [3, 4], workedSolution: "1. 100/4 = 25.0 and 100/8 = 12.5 are displayed.\n2. For n = 0 the division fails, so the program stops.", explanation: "Two values are shown before the division by zero." });
  b.num({ d: 4, skill: "APPLICATION", calculator: false, hints: ["List the values at the edge of the range and just outside it."],
    stem: `A program accepts an age from ${lo} to ${hi} inclusive. A tester uses boundary values: each of the two limits and the value just outside each limit. How many test values is this altogether?`,
    value: boundaryValues.length, wrong: [2, 3], workedSolution: `1. The limits are ${lo} and ${hi}.\n2. The values just outside are ${lo - 1} and ${hi + 1}.\n3. Total = 4 test values.`, explanation: `${boundaryValues.join(", ")}: four values.` });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3, hints: ["Name each error and say when it appears."],
    stem: "Describe the difference between a syntax error, a logic error and a run-time error. [3]",
    points: ["A syntax error breaks the rules of the language and is reported before the program runs", "A logic error is a mistake in the algorithm: the program runs but gives wrong results", "A run-time error occurs while the program is running and makes it stop, for example division by zero"],
    modelAnswer: "A syntax error breaks the rules of the language and is reported before the program runs. A logic error is a mistake in the algorithm, so the program runs but gives wrong results. A run-time error happens while the program runs and makes it stop, such as division by zero.",
    explanation: "Syntax: before running. Logic: wrong result. Run-time: stops during running." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Think about the most common mistake with comparison operators."],
    stem: "Explain why extreme (boundary) test data should be used when testing a validation rule for a range. [3]",
    points: ["Programmers often make mistakes at the limits of a range", "For example writing < instead of <= excludes a valid boundary value", "Testing the boundary values shows whether the limits are correctly included or excluded"],
    modelAnswer: "Mistakes are often made at the limits, such as writing < instead of <=, which would reject a valid boundary value. Testing the boundary values shows whether the limits are handled correctly.",
    explanation: "Boundary values catch comparison operator errors." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Who tests, where, and what is the purpose?"],
    stem: "Distinguish between alpha testing, beta testing and acceptance testing. [4]",
    points: ["Alpha testing is done in-house by the developer's own staff", "Beta testing is done by selected real users in their own environment, who report faults", "Acceptance testing is done by the customer to check the system against the requirements", "The customer decides whether to accept the system after acceptance testing"],
    modelAnswer: "Alpha testing is done in-house by the developer's staff. Beta testing is done by selected real users in their own environment, who report faults. Acceptance testing is done by the customer, who checks the system against the requirements and decides whether to accept it.",
    explanation: "Tester and purpose for each." });
  b.manualShort({ d: 4, skill: "CREATION", marks: 4, hints: ["Include a normal value, boundaries, and values outside the range."],
    stem: "A program accepts a password that is from 8 to 12 characters long inclusive. Give four items of test data, each of a different kind or position, and the expected result for each. [4]",
    points: ["A normal length such as 10 characters: accepted", "A boundary length of 8 or 12 characters: accepted", "A length just below the range (7 characters): rejected", "A length just above the range (13 characters) or an empty password: rejected"],
    modelAnswer: "A 10-character password: accepted. An 8-character or 12-character password: accepted. A 7-character password: rejected. A 13-character password (or an empty password): rejected.",
    explanation: "Normal, boundary and abnormal data with expected results." });
  b.struct({ d: 3, skill: "ANALYSIS", examStyle: true, hints: ["Mark 40 should count as a pass.", "Compare the number of passes the program counts with the number it should."],
    explanation: "The test m > 40 leaves out marks of exactly 40: a logic error. The correct test is m >= 40.",
    stem: `A program counts how many learners passed. A mark of 40 or more is a pass.\n\n${codeBlock(passBug, "python")}\n\nThe marks are 40, 66, 39, 71, 40.`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: "Give the value of `passes` after each mark has been processed.", template: "After 40: {{blank:a}}\n\nAfter 66: {{blank:b}}\n\nAfter 39: {{blank:c}}\n\nAfter 71: {{blank:d}}\n\nAfter 40: {{blank:e}}", blanks: countAfter.map((v, i) => ({ id: "abcde"[i], input: "number", accepted: [String(v)], wrong: "9" })), explanation: "The count after each mark is 0, 1, 1, 2, 2." }),
      P.short({ label: "(b)", marks: 1, stem: "State the type of error in the program.", accepted: ["logic error", "logic", "a logic error"], explanation: "The program runs but gives the wrong count." }),
      P.short({ label: "(c)", marks: 1, stem: "Write the corrected condition on the `if` line (the part after `if` and before the colon).", accepted: ["m >= 40"], normalise: ["trim", "lowercase", "remove_whitespace"], explanation: "A mark of 40 is a pass, so use >=." }),
      P.manual({ label: "(d)", marks: 1, stem: "Name the kind of test data that would have shown this error.", points: ["Extreme (boundary) data, such as the mark 40"], modelAnswer: "Extreme (boundary) data such as a mark of 40.", explanation: "The error occurs only at the boundary." }),
    ] });
  b.struct({ d: 4, skill: "CREATION", examStyle: true, hints: ["Test the limits 8 and 12 and the values just outside.", "The expected results come from the rule, not from the program."],
    explanation: "Lengths 10, 8 and 12 are accepted; 7, 13 and 0 are rejected.",
    stem: `A registration program accepts a password that is from 8 to 12 characters long inclusive. A tester plans these tests.\n\n${mdTable(["Test", "Password length", "Kind of data"], pwResults.map((r, i) => [i + 1, r.n, r.kind]))}`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: "Give the expected result (accepted or rejected) for tests 1 to 6.", template: "Test 1: {{blank:a}}\n\nTest 2: {{blank:b}}\n\nTest 3: {{blank:c}}\n\nTest 4: {{blank:d}}\n\nTest 5: {{blank:e}}\n\nTest 6: {{blank:f}}", blanks: pwResults.map((r, i) => ({ id: "abcdef"[i], accepted: [r.out], choices: ["accepted", "rejected"] })), explanation: "Lengths 8 to 12 are accepted; others are rejected." }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain why the expected results should be written before the tests are run.", points: ["The expected results come from the specification, independent of the program", "If they were copied from the program's output, a faulty program would appear to pass"], modelAnswer: "The expected results come from the specification. If they were copied from the program's output, a faulty program would appear to pass.", explanation: "Independence of expected results." }),
      P.manual({ label: "(c)", marks: 2, stem: "The tests show that a password with 12 characters is rejected. Describe how the programmer should find and correct the fault.", points: ["Dry run the validation code (or use a debugger) with a 12-character password to find where the length test fails", "Correct the condition (for example change < to <=) and repeat all of the tests"], modelAnswer: "Dry run the validation code with a 12-character password to find where the test fails, correct the condition (for example change < to <=) and then repeat all the tests.", explanation: "Locate, correct, retest." }),
      P.manual({ label: "(d)", marks: 1, stem: "State the type of test data used in tests 2 and 3.", points: ["Extreme (boundary) data"], modelAnswer: "Extreme (boundary) data.", explanation: "Lengths 8 and 12 are the limits." }),
    ] });
  b.card("DEFINITION", "Syntax, logic and run-time errors", "Syntax: breaks language rules, program will not run. Logic: wrong result, no message. Run-time: stops while running.");
  b.card("CONCEPT", "Dry run and walkthrough", "Dry run: follow the code by hand with a trace table. Walkthrough: explain the code to colleagues who look for errors.");
  b.card("CONCEPT", "White-box and black-box testing", "White-box: tests chosen from the code (every path). Black-box: tests chosen from the specification.");
  b.card("CONCEPT", "Alpha, beta, acceptance testing", "Alpha: developer's own staff, in-house. Beta: selected real users. Acceptance: the customer checks against the requirements.");
  b.card("CONCEPT", "Integration and stub testing", "Integration: modules tested together. Stub: a simple stand-in for a module not yet written.");
  b.card("FACT", "Types of test data", "Normal (valid), abnormal (invalid, including just outside the range) and extreme (valid, at the boundary).");
  b.card("CONCEPT", "Test plan columns", "Test number, purpose, test data, expected result (written first), actual result, pass or fail.");
  b.card("FACT", "Types of maintenance", "Corrective: fix faults. Adaptive: respond to change. Perfective: improve or add features.");
  b.card("CONCEPT", "Regression testing", "After a change repeat the earlier tests to check that nothing else has stopped working.");
});
