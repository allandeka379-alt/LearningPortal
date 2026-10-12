// Slice w4b: iteration (acs.prog.iteration, both boards).
import { concept, P, chk, same, mdTable, codeBlock, py } from "../lib.mjs";
import { mc, pm } from "../tables/w4b-q.mjs";

concept("acs.prog.iteration", { file: "prog/iteration", keyPrefix: "prog.iteration" }, (b) => {
  // ---- computed values
  const rangeList = py("print(list(range(2, 11, 4)))");
  same(rangeList, "[2, 6, 10]");
  const evenSum = Number(py("print(sum(n for n in range(1, 11) if n % 2 == 0))"));
  chk(evenSum, 30);
  const tri = Number(py("c = 0\nfor r in range(3):\n    for k in range(r + 1):\n        c += 1\nprint(c)"));
  chk(tri, 6);
  const nestedPasses = 4 * 3 * 2;
  chk(Number(py("c = 0\nfor a in range(4):\n    for b in range(3):\n        for d in range(2):\n            c += 1\nprint(c)")), nestedPasses);
  const forStep = py("print(list(range(3, 13, 3)))");
  same(forStep, "[3, 6, 9, 12]");
  chk(3 + 6 + 9 + 12, 30);
  const halving = py("n = 100\nc = 0\nvals = []\nwhile n > 5:\n    n = n // 2\n    c += 1\n    vals.append(n)\nprint(c, vals)");
  same(halving, "5 [50, 25, 12, 6, 3]");
  const sales = [18, 32, 40, 0];
  const salesTotal = sales.reduce((a, c) => a + c, 0);
  chk(salesTotal, 90); chk(salesTotal / 3, 30);
  const nestedLines = py(`for row in range(1, 4):
    line = ""
    for col in range(row, 4):
        line = line + str(row + col) + " "
    print(line.rstrip())`).split("\n");
  same(nestedLines, ["2 3 4", "4 5", "6"]);
  const innerRuns = 3 + 2 + 1;

  // ---- multiple choice
  mc(b, 2, "RECALL", "Which loop construct always runs its body at least once?",
    ["`REPEAT ... UNTIL`", "The condition is tested after the body."],
    [["`WHILE ... ENDWHILE`", "The condition is tested before the body, so it may never run."], ["`FOR ... NEXT` with a start value larger than the end value", "The loop body is skipped."], ["`CASE OF ... ENDCASE`", "That is selection, not iteration."]],
    "A post-condition loop tests at the end, so the body runs once before the first test.", { daily: true });
  mc(b, 2, "APPLICATION", "Which list of values does the Python loop `for n in range(2, 11, 4):` produce for `n`?",
    [rangeList.replace(/[\[\]]/g, ""), "Start at 2, add 4 each time, and stop before 11."],
    [["2, 6, 10, 14", "The stop value 11 is not reached by 14."], ["2, 3, 4, 5, 6, 7, 8, 9, 10", "The step is 4, not 1."], ["6, 10", "The loop starts at 2."]],
    "range(start, stop, step) excludes the stop value.", { calculator: false });
  mc(b, 2, "UNDERSTANDING", "A `REPEAT ... UNTIL Answer = \"Y\"` loop stops when which of these is true?",
    ["`Answer` has the value \"Y\"", "UNTIL stops the loop when its condition becomes true."],
    [["`Answer` has any value other than \"Y\"", "That is when the loop continues."], ["`Answer` has been entered at least twice", "The number of passes does not decide it."], ["`Answer` is empty", "An empty answer does not satisfy the condition."]],
    "A REPEAT loop ends when the UNTIL condition is true.", { daily: true });
  mc(b, 3, "ANALYSIS", "This pseudocode never ends. Which is the reason?\n\n" + codeBlock(`Number ← 1
WHILE Number <= 10 DO
    OUTPUT Number * 2
ENDWHILE`),
    ["`Number` is never changed in the loop", "The condition stays true for ever."],
    [["`Number` is declared as an integer variable and so cannot change", "The type of the variable does not cause a loop to repeat."], ["The `OUTPUT` statement is placed inside the loop body", "Output statements do not stop or start a loop."], ["`WHILE` loops always run for ever", "A WHILE loop stops when its condition is false."]],
    "A loop needs a statement that changes the variable in the condition, for example `Number ← Number + 1`.", { hints: ["What would make `Number <= 10` become false?"] });
  mc(b, 2, "APPLICATION", "A program asks for a password and repeats until the correct password is typed. The first request must always be made. Which loop is the most suitable?",
    ["`REPEAT ... UNTIL`", "The password must be requested before it can be tested."],
    [["`FOR` loop from 1 to 3", "That limits the attempts and does not wait for a correct answer."], ["`CASE OF`", "That is not a loop."], ["`WHILE` loop that tests a variable not yet set", "That relies on a trick to run once; REPEAT does this directly."]],
    "A post-condition loop gives at least one pass.", { daily: true });
  mc(b, 3, "APPLICATION", "What is output by this Python code?\n\n" + codeBlock(`total = 0
for n in range(1, 11):
    if n % 2 == 0:
        total = total + n
print(total)`, "python"),
    [String(evenSum), "2 + 4 + 6 + 8 + 10."],
    [["55", "That adds every number from 1 to 10."], ["25", "That adds the odd numbers."], ["10", "That is the last even number."]],
    "Only the even values of n are added.", { calculator: false, hints: ["Which values of n pass the test n % 2 == 0?"] });
  mc(b, 3, "APPLICATION", "How many times is `c ← c + 1` executed?\n\n" + codeBlock(`c ← 0
FOR Row ← 1 TO 3
    FOR Col ← 1 TO Row
        c ← c + 1
    NEXT Col
NEXT Row`),
    [String(tri), "1 + 2 + 3 passes."],
    [["9", "That is 3 × 3; the inner limit is Row, not 3."], ["3", "That is the outer loop only."], ["4", "That counts 1 + 3."]],
    "The inner loop runs Row times for each value of Row.", { calculator: false, hints: ["How many passes does the inner loop make when Row is 1, 2 and 3?"] });

  // ---- true / false
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "The value `-1`, typed to show that there is no more data, is called a sentinel and must not be added to the total.", answer: true,
    explanation: "True. A sentinel is a special value that ends the input and is not part of the data." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "In Python, `range(1, 6)` includes the number 6.", answer: false,
    explanation: "False. The stop value of range() is not included, so range(1, 6) gives 1, 2, 3, 4, 5." });

  // ---- fill in the blank, numerical, short, match
  b.fib({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Halve the value with DIV 2 on every pass and count the passes."],
    stem: "Dry run this algorithm.\n\n" + codeBlock(`N ← 100
Passes ← 0
WHILE N > 5 DO
    N ← DIV(N, 2)
    Passes ← Passes + 1
ENDWHILE`) + "\nState the values of `N` after the 3rd pass and of `Passes` at the end.",
    template: "N after the 3rd pass = {{blank:a}}\n\nPasses at the end = {{blank:b}}",
    blanks: [{ id: "a", input: "number", accepted: ["12"] }, { id: "b", input: "number", accepted: ["5"] }], wrong: [["25", "4"]],
    explanation: "N becomes 50, 25, 12, 6, 3. After the 3rd pass N is 12 and the loop ends after 5 passes, when N is 3." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["List the values of the loop variable, then add them."],
    stem: "State the value of `Total` after this algorithm has run.\n\n" + codeBlock(`Total ← 0
FOR K ← 3 TO 12 STEP 3
    Total ← Total + K
NEXT K`),
    value: 30, wrong: [18, 78], workedSolution: "K takes the values 3, 6, 9 and 12, and 3 + 6 + 9 + 12 = 30.", explanation: "Total is 30." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Multiply the number of passes of the three loops."],
    stem: "A program has three nested loops. The outer loop runs 4 times, the middle loop 3 times and the inner loop 2 times. How many times does the innermost statement run?",
    value: nestedPasses, wrong: [9, 12], workedSolution: "4 × 3 × 2 = 24.", explanation: "Passes multiply: 24." });
  b.short({ d: 2, skill: "RECALL", stem: "Name the type of loop that tests its condition before the body is run and may therefore not run at all.", accepted: ["pre-condition loop", "pre condition loop", "precondition loop", "while loop", "WHILE", "a pre-condition loop"], wrong: ["post-condition loop"], explanation: "A pre-condition loop such as WHILE." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each loop to the situation for which it is the most suitable.",
    pairs: [["`FOR`", "Output the 12 monthly totals of a year"], ["`WHILE`", "Add numbers until -1 is entered, where the first number may already be -1"], ["`REPEAT ... UNTIL`", "Ask for a PIN and repeat until it is valid"]],
    extraRight: ["Choose between 5 menu options"],
    explanation: "FOR for a known count, WHILE when the loop may run zero times and REPEAT when it must run once." });

  // ---- self-marked
  b.manualShort({ d: 3, skill: "CREATION", marks: 4, hints: ["Use a counter that starts at 0 and a FOR loop for 30 inputs."],
    stem: "Write pseudocode that inputs 30 marks and outputs how many of them are 50 or more. [4]",
    points: ["A counter set to 0 before the loop", "A FOR loop that repeats 30 times with an INPUT inside it", "A selection testing Mark >= 50 that adds 1 to the counter", "Outputs the counter after the loop"],
    modelAnswer: codeBlock(`Passes ← 0
FOR Learner ← 1 TO 30
    INPUT Mark
    IF Mark >= 50 THEN
        Passes ← Passes + 1
    ENDIF
NEXT Learner
OUTPUT "Number of passes: ", Passes`), explanation: "A counter, a loop and a selection." });
  b.manualShort({ d: 3, skill: "CREATION", marks: 4, hints: ["Use while True and break, or a flag."],
    stem: "Write a Python program that keeps asking for a whole-number age until the user enters a value from 5 to 18, and then outputs the age. [4]",
    points: ["A loop that repeats until a valid value is entered", "Reads input and converts it to an integer inside the loop", "A correct range test (5 to 18, both limits)", "Outputs the accepted age after the loop"],
    modelAnswer: codeBlock(`age = 0
while age < 5 or age > 18:
    age = int(input("Enter your age (5 to 18): "))
print("Age accepted:", age)`, "python"), explanation: "The loop continues while the age is outside the range." });
  b.manualShort({ d: 3, skill: "EVALUATION", marks: 3, hints: ["Think about when each condition is tested."],
    stem: "Explain the difference between a pre-condition loop and a post-condition loop and give an example of a use for the post-condition loop. [3]",
    points: ["A pre-condition loop tests the condition before the body, so it may run zero times", "A post-condition loop tests the condition after the body, so it always runs at least once", "Example: validating an input where the user must be asked at least once"],
    modelAnswer: "A pre-condition loop tests before the body and may not run at all; a post-condition loop tests after the body and runs at least once, for example when validating an input.", explanation: "The position of the test decides the minimum number of passes." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 3, hints: ["Dry run with the data 5, 8 and -1."],
    stem: "This algorithm should output the average of numbers entered, ending with -1.\n\n" + codeBlock(`Total ← 0
Count ← 0
REPEAT
    INPUT Number
    Total ← Total + Number
    Count ← Count + 1
UNTIL Number = -1
OUTPUT Total / Count`) + "\nIdentify the error and write a corrected version of the loop. [3]",
    points: ["The sentinel -1 is added to Total and counted before the test", "So the output is wrong (for 5, 8, -1 it gives 4 / 3 instead of 6.5)", "Correct: only add and count when Number <> -1 (or read first and use a WHILE loop)"],
    modelAnswer: codeBlock(`INPUT Number
WHILE Number <> -1 DO
    Total ← Total + Number
    Count ← Count + 1
    INPUT Number
ENDWHILE`), explanation: "The sentinel must be tested before it is processed." });

  // ---- structured practice
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: false, hints: ["Sales of 0 ends the input and is not counted.", "Average = Total / Count."],
    explanation: "A post-condition loop with a total, a counter and a selection.",
    stem: `A vegetable seller at a market in Gweru enters her sales (in USD) at the end of each day, and enters 0 when there are no more sales.\n\n${codeBlock(`Total ← 0
Count ← 0
REPEAT
    INPUT Sales
    IF Sales > 0 THEN
        Total ← Total + Sales
        Count ← Count + 1
    ENDIF
UNTIL Sales = 0
OUTPUT Total / Count`)}\n\nThe values entered are 18, 32, 40 and 0.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: "State the final values of `Total` and `Count`.", template: "Total = {{blank:a}}\n\nCount = {{blank:b}}", blanks: [{ id: "a", input: "number", accepted: ["90"] }, { id: "b", input: "number", accepted: ["3"] }], wrong: [["90", "4"]], explanation: "18 + 32 + 40 = 90 and three sales were counted." }),
      P.num({ label: "(b)", marks: 1, stem: "State the value output.", value: 30, wrong: [22.5, 90], workedSolution: "90 / 3 = 30.", explanation: "The average sale is 30." }),
      pm("(c)", "Why is a `REPEAT ... UNTIL` loop suitable here?", ["One value must be entered before the test", "The body runs once before the test."], [["It runs a fixed number of times, whatever is entered", "The number of sales is not known."], ["It does not need a condition to decide when to stop", "Every loop needs a condition to end."], ["It can only be used when the data is whole numbers", "Any data type can be used."]], "The input is requested before the sentinel can be tested."),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why the test `IF Sales > 0` is needed inside the loop.", points: ["The final value 0 is the sentinel and is not a sale", "Without the test Count would be one too high, giving a wrong average"], modelAnswer: "The 0 that ends the input is not a sale. Without the test it would be counted and the average would be divided by too large a number.", explanation: "The sentinel must not be counted." }),
    ] });
  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, calculator: false, hints: ["The inner loop starts at Row.", "Count the passes of the inner loop for each value of Row."],
    explanation: "Tracing nested loops with a changing inner start value.",
    stem: `This pseudocode uses \`&\` to join strings and \`NUM_TO_STR\` to convert a number into a string.\n\n${codeBlock(`FOR Row ← 1 TO 3
    Line ← ""
    FOR Col ← Row TO 3
        Line ← Line & NUM_TO_STR(Row + Col) & " "
    NEXT Col
    OUTPUT Line
NEXT Row`)}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "State how many times the statement inside the inner loop is executed.", value: innerRuns, wrong: [9, 3], workedSolution: "The inner loop runs 3, 2 and 1 times: 3 + 2 + 1 = 6.", explanation: "Six passes in total." }),
      P.short({ label: "(b)", marks: 1, stem: "State the first line output, with the numbers separated by single spaces.", accepted: [nestedLines[0]], normalise: ["trim", "collapse_whitespace"], explanation: "For Row = 1, Col = 1, 2, 3 gives 2, 3, 4." }),
      P.short({ label: "(c)", marks: 1, stem: "State the second line output, with the numbers separated by single spaces.", accepted: [nestedLines[1]], normalise: ["trim", "collapse_whitespace"], explanation: "For Row = 2, Col = 2 and 3 gives 4 and 5." }),
      P.num({ label: "(d)", marks: 1, stem: "State the number output on the third line.", value: Number(nestedLines[2]), wrong: [5, 9], workedSolution: "For Row = 3 the inner loop runs once, with Col = 3: 3 + 3 = 6.", explanation: "The last line is 6." }),
      P.manual({ label: "(e)", marks: 2, stem: "Describe the change needed to the inner loop so that every line has three numbers.", points: ["Change the start of the inner loop from Row to 1", "So that Col runs from 1 to 3 for every value of Row"], modelAnswer: "Change `FOR Col ← Row TO 3` to `FOR Col ← 1 TO 3`.", explanation: "The inner loop must start at 1." }),
      P.manual({ label: "(f)", marks: 2, stem: "State two reasons why the variable `Line` is set to the empty string inside the outer loop but before the inner loop.", points: ["So that each line starts empty and the previous line is not repeated", "So that the line is built up by the inner loop and then output once per row"], modelAnswer: "Each row must start with an empty string so the previous row is not repeated, and the inner loop then builds the row to be output once.", explanation: "Initialise at the right level of the nest." }),
    ] });

  // ---- flashcards
  b.card("DEFINITION", "Iteration", "The repetition of a block of statements; each execution of the block is a pass.");
  b.card("FACT", "FOR loop", "FOR Count ← 1 TO 10 STEP 2 ... NEXT Count. Python: for count in range(1, 11, 2): (the stop value is excluded).");
  b.card("FACT", "WHILE loop", "WHILE condition DO ... ENDWHILE. Pre-condition loop: may run zero times; continues while the condition is true.");
  b.card("FACT", "REPEAT loop", "REPEAT ... UNTIL condition. Post-condition loop: runs at least once; stops when the condition is true. Python: while True with break.");
  b.card("CONCEPT", "Totals and counters", "Set to 0 before the loop, update inside it, use after it. Guard against a count of zero before dividing.");
  b.card("DEFINITION", "Sentinel", "A special value that ends the input (such as -1) and is not processed as data.");
  b.card("CONCEPT", "Validation loop", "Repeat the input until the value is acceptable; a post-condition loop asks at least once.");
  b.card("FACT", "Nested loop passes", "The inner loop runs completely for each pass of the outer loop: 4 × 3 × 2 = 24 passes of the innermost body.");
  b.card("CONCEPT", "Infinite loop", "A loop whose condition can never change to stop it, often because the variable in the condition is not updated in the body.");
});
