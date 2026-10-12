// Slice w4a: dry runs, trace tables and finding errors (acs.algo.trace-tables, both boards).
import { concept, P, chk, same, mdTable, codeBlock } from "../lib.mjs";
import { mc, pm } from "../tables/w4a-q.mjs";
import { Trace, DIV, MOD } from "../tables/w4a-util.mjs";

concept("acs.algo.trace-tables", { file: "algo/trace-tables", keyPrefix: "algo.trace-tables" }, (b) => {
  // doubling loop
  let X = 5, Y = 1, passes = 0;
  while (X > 0) { Y *= 2; X -= 2; passes++; }
  chk(Y, 8); chk(passes, 3);
  // reverse digits
  let N = 4719, Rev = 0;
  while (N > 0) { Rev = Rev * 10 + MOD(N, 10); N = DIV(N, 10); }
  chk(Rev, 9174);
  // nested loop count
  let runs = 0;
  for (let A = 1; A <= 4; A++) for (let B = 1; B <= A; B++) runs++;
  chk(runs, 10);
  // squares
  const totals = []; let T = 0;
  for (let K = 1; K <= 4; K++) { T += K * K; totals.push(T); }
  same(totals, [1, 5, 14, 30]);
  chk(17 % 5, 2); chk(Math.floor(17 / 5), 3);
  // coach score algorithm
  const score = [6, 0, 9, 3, 0];
  let total = 0, count = 0; const tr = new Trace(["Index", "Total", "Count"]);
  score.forEach((s, i) => { if (s > 0) { total += s; count++; } });
  chk(total, 18); chk(count, 3); chk(total / count, 6);
  let t3 = 0; for (let i = 0; i < 3; i++) if (score[i] > 0) t3 += score[i];
  chk(t3, 15);
  const coachCode = `Total ← 0
Count ← 0
FOR Index ← 1 TO 5
    IF Score[Index] > 0 THEN
        Total ← Total + Score[Index]
        Count ← Count + 1
    ENDIF
NEXT Index
Average ← Total / Count
OUTPUT Average`;
  const starCode = `FOR Row ← 1 TO 3
    Line ← ""
    FOR Col ← 1 TO Row
        Line ← Line & "*"
    NEXT Col
    OUTPUT Line
NEXT Row`;
  let inner = 0; for (let r = 1; r <= 3; r++) for (let c = 1; c <= r; c++) inner++;
  chk(inner, 6);

  // ---- multiple choice
  mc(b, 2, "RECALL", "What is the purpose of a trace table?",
    ["To record how the variables change during a dry run", "Correct."],
    [["To show the shape of a database", "That is an entity-relationship diagram."], ["To list the errors that the compiler reports", "A compiler lists syntax errors; a trace table is made by hand."], ["To store the data that a program reads from or writes to a file", "A file stores data; a trace table records a dry run."]],
    "A trace table shows how each variable changes during a dry run.", { daily: true });
  mc(b, 1, "RECALL", "What is the value of `MOD(17, 5)`?",
    ["2", "Correct: 17 = 3 × 5 + 2."],
    [["3", "3 is the value of DIV(17, 5)."], ["3.4", "MOD gives the remainder, not the quotient."], ["12", "That is 17 − 5."]],
    "MOD gives the remainder after whole-number division.");
  mc(b, 2, "UNDERSTANDING", "Which type of test data is the number 0 for a program that accepts whole numbers from 1 to 100?",
    ["Abnormal data, because it should be rejected", "Correct."],
    [["Normal data, because it is a whole number that can be typed in", "It is outside the allowed range."], ["Boundary data at the upper limit", "The upper limit is 100."], ["Boundary data at the lower limit", "The lower limit is 1, so 0 is just outside it."]],
    "A value outside the allowed range is abnormal.", { daily: true });
  mc(b, 3, "ANALYSIS", "An algorithm should output the number of marks that are at least 50, but it always outputs 0 when the data is 50, 50, 50. Which line is the most likely cause?",
    ["`IF Mark > 50 THEN`", "Correct: the boundary value 50 is excluded."],
    [["`Count ← 0` before the loop", "Setting the counter to 0 at the start is correct."], ["`NEXT Index` at the end", "The loop end does not stop the counting."], ["`OUTPUT Count` after the loop", "Outputting after the loop is correct."]],
    "The operator `>` excludes 50; it should be `>=`.", { hints: ["Test the data 50 against each condition."] });
  mc(b, 3, "UNDERSTANDING", "A dry run of an algorithm gives the output 23 for the input 5. Which should be done next to find out whether the algorithm is correct?",
    ["Compare 23 with the expected answer for 5", "Correct."],
    [["Run the algorithm again with the same input 5", "The same input gives the same trace and output."], ["Delete the trace table and write a new one", "The trace is evidence for the comparison."], ["Change the input to 23 and run it again", "The output must be checked against the expected answer for the original input."]],
    "Expected results are worked out first, then compared with the trace.", { hints: ["How can you know what the right answer is?"] });
  mc(b, 2, "RECALL", "Which kind of error lets an algorithm run to the end but give a wrong answer?",
    ["A logic error", "Correct."],
    [["A syntax error", "A syntax error stops a translator from accepting the code."], ["A hardware error", "Hardware faults are not caused by the algorithm."], ["A transmission error", "That is an error in data sent over a network."]],
    "Logic errors do not stop the algorithm running but make the result wrong.");
  mc(b, 3, "APPLICATION", "How many times is the statement `OUTPUT Row` executed in the code below?\n\n" + codeBlock(`FOR Row ← 1 TO 3
    FOR Col ← 1 TO 4
        OUTPUT Row
    NEXT Col
NEXT Row`),
    ["12", "Correct: 3 × 4."],
    [["7", "That adds the limits instead of multiplying."], ["3", "That counts the outer loop only."], ["4", "That counts the inner loop only."]],
    "The inner loop runs completely for each of the 3 passes of the outer loop.", { hints: ["How many times does the inner loop run for one value of Row?"] });
  mc(b, 3, "ANALYSIS", "Which statement is the best description of the purpose of an algorithm that outputs 1, 4 and 9 when `Limit` is 3?",
    ["It outputs the squares of 1 up to `Limit`", "Correct."],
    [["It adds 3 to the previous output each time", "The differences are 3 and 5, not both 3."], ["It outputs the three values 1, 4 and 9 each time", "That repeats the output rather than describing a rule."], ["It outputs the odd numbers below 10", "That would include 3, 5 and 7."]],
    "The outputs are 1², 2² and 3².", { hints: ["Look at how each output relates to its position."] });

  // ---- true / false, fill in the blank
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "A dry run of an algorithm needs the algorithm to be typed into a computer first.", answer: false,
    explanation: "False. A dry run is done by hand, which is why it can be done before any program exists." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "When a trace table is written, a cell is left blank if the value of that variable has not changed in that row.", answer: true,
    explanation: "True. This is the usual mark-scheme layout; each filled cell shows a change." });
  b.fib({ d: 3, skill: "APPLICATION", hints: ["Add the next square to the previous total."],
    stem: "Dry run this algorithm.\n\n" + codeBlock(`Total ← 0
FOR K ← 1 TO 4
    Total ← Total + K * K
NEXT K`) + "\nState the value of `Total` at the end of each pass.",
    template: "K = 1: Total = {{blank:a}}\n\nK = 2: Total = {{blank:b}}\n\nK = 3: Total = {{blank:c}}\n\nK = 4: Total = {{blank:d}}",
    blanks: totals.map((v, i) => ({ id: "abcd"[i], accepted: [String(v)], input: "number" })), wrong: [["1", "2", "3", "4"]],
    explanation: "Total goes 1, 5, 14, 30 as the squares 1, 4, 9 and 16 are added." });

  // ---- numerical
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Write X and Y after each pass.", "The loop stops when X is not greater than 0."],
    stem: "Dry run this algorithm and state the value output.\n\n" + codeBlock(`X ← 5
Y ← 1
WHILE X > 0 DO
    Y ← Y * 2
    X ← X - 2
ENDWHILE
OUTPUT Y`),
    value: Y, wrong: [16, 4], workedSolution: "X is 5, 3, 1 at the start of the three passes, then -1. Y becomes 2, 4, 8.", explanation: "The loop runs 3 times and Y = 8." });
  b.num({ d: 4, skill: "APPLICATION", calculator: false, hints: ["Take the last digit with MOD 10 and remove it with DIV 10.", "Rev ← Rev * 10 + digit."],
    stem: "Dry run this algorithm and state the value of `Rev` that is output.\n\n" + codeBlock(`Number ← 4719
Rev ← 0
WHILE Number > 0 DO
    Rev ← Rev * 10 + MOD(Number, 10)
    Number ← DIV(Number, 10)
ENDWHILE
OUTPUT Rev`),
    value: Rev, wrong: [4719, 9], workedSolution: "Rev = 9, then 91, then 917, then 9174 as the digits 9, 1, 7 and 4 are taken.", explanation: "The algorithm reverses the digits: 9174." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Count the passes of the inner loop for each value of A."],
    stem: "How many times is `OUTPUT A * B` executed?\n\n" + codeBlock(`FOR A ← 1 TO 4
    FOR B ← 1 TO A
        OUTPUT A * B
    NEXT B
NEXT A`),
    value: runs, wrong: [16, 4], workedSolution: "The inner loop runs 1, 2, 3 and 4 times: 1 + 2 + 3 + 4.", explanation: "10 times." });
  b.short({ d: 2, skill: "RECALL", stem: "Name the type of error in an algorithm that gives a wrong result without stopping the program.", accepted: ["logic error", "logical error", "a logic error"], wrong: ["syntax error", "runtime error"], explanation: "A logic error." });

  // ---- self-marked
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 2, stem: "Explain why a programmer carries out a dry run before writing the program. [2]",
    points: ["To check that the algorithm gives the correct output for test data", "To find logic errors before coding, which is cheaper than finding them later"],
    modelAnswer: "A dry run shows whether the algorithm gives the correct output for test data, so logic errors can be found and corrected before the program is written.", explanation: "Dry runs find logic errors early." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Think about normal, boundary and abnormal data."],
    stem: "A program accepts a whole-number age from 11 to 18. Give three test values with a reason for each. [3]",
    points: ["A normal value, such as 15, which should be accepted", "A boundary value, such as 11 or 18 (or 10 or 19), at the edge of the range", "An abnormal value, such as 40 or -3 or a letter, which should be rejected"],
    modelAnswer: "15 is normal data and should be accepted; 18 is a boundary value, the largest allowed; 40 is abnormal data and should be rejected.", explanation: "Normal, boundary and abnormal." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 3, hints: ["Dry run with the data 8, 3, 5 and find where the output goes wrong."],
    stem: "This algorithm should output the total of three numbers entered, but it outputs the wrong value.\n\n" + codeBlock(`FOR Count ← 1 TO 3
    Total ← 0
    INPUT Number
    Total ← Total + Number
NEXT Count
OUTPUT Total`) + "\nIdentify the error and write the correction. [3]",
    points: ["Identifies that Total ← 0 is inside the loop", "So Total is reset on every pass and only the last number is kept", "Correction: move Total ← 0 to before the FOR statement"],
    modelAnswer: "`Total ← 0` is inside the loop, so it is reset on every pass and the output is only the last number. Move it before the `FOR` statement.", explanation: "A total must be initialised before the loop." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 2, hints: ["Look at the final values of the variables."],
    stem: "Describe how you would decide the purpose of an unfamiliar algorithm from its trace table. [2]",
    points: ["Dry run it with simple test data and record the outputs", "Look for the relationship between the inputs and the outputs, and state it in one sentence in terms of the problem"],
    modelAnswer: "Dry run it with simple data, then look at how the output relates to the input and state that relationship in one sentence.", explanation: "Run it, spot the pattern, state it." });

  // ---- structured practice
  b.struct({ d: 5, skill: "ANALYSIS", examStyle: true, hints: ["Only scores above 0 are added.", "Count tells you how many scores were above 0."],
    explanation: "A dry run of an average with a possible divide-by-zero error.",
    stem: "A coach in Hwange records the points scored by a netball team in five matches. A score of 0 means that the match was not played. The array `Score` holds 6, 0, 9, 3, 0 and the algorithm below calculates the average.\n\n" + codeBlock(coachCode),
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "State the value of `Total` after the pass with `Index` = 3.", value: 15, wrong: [18, 9], workedSolution: "Index 1 adds 6, index 2 adds nothing and index 3 adds 9: 15.", explanation: "Total = 15." }),
      P.num({ label: "(b)", marks: 1, stem: "State the value output.", value: 6, wrong: [3.6, 18], workedSolution: "Total = 18 and Count = 3, so the average is 18 ÷ 3 = 6.", explanation: "Average = 6." }),
      pm("(c)", "What is the purpose of the algorithm?", ["It outputs the mean of the matches played", "Correct."], [["It outputs the mean of all five scores in the array", "Zeros are not counted."], ["It outputs the highest score", "No comparison of scores is made."], ["It outputs how many matches were played by the team", "It outputs an average, not a count."]], "Only the scores above 0 are totalled and counted, so the mean is of the matches played."),
      P.manual({ label: "(d)", marks: 2, stem: "State a set of five scores for which the algorithm fails and describe what happens.", points: ["All five scores are 0 (no match played)", "Count is 0, so the division Total / Count is a division by zero and the program stops with an error"], modelAnswer: "All five scores are 0. Count stays 0 and Total / Count is a division by zero, which causes an error.", explanation: "An abnormal case that was not tested." }),
      P.manual({ label: "(e)", marks: 2, stem: "Write the lines that should replace the last two lines of the algorithm to avoid the failure in part (d).", points: ["An IF statement that tests Count > 0 (or Count <> 0)", "Calculates and outputs the average in the true branch, with a suitable message in the ELSE branch"], modelAnswer: codeBlock(`IF Count > 0 THEN
    Average ← Total / Count
    OUTPUT Average
ELSE
    OUTPUT "No matches played"
ENDIF`), explanation: "Test the divisor before dividing." }),
      P.manual({ label: "(f)", marks: 2, stem: "Give two items of test data a tester should use to check the corrected algorithm.", points: ["A normal set of scores with some zeros, such as 6, 0, 9, 3, 0 (expected average 6)", "A set of five zeros (expected message, no error)"], modelAnswer: "The scores 6, 0, 9, 3, 0 with expected output 6, and the scores 0, 0, 0, 0, 0 with the expected message and no error.", explanation: "Normal and extreme cases with expected results." }),
    ] });
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Dry run the outer loop three times.", "The limit of the inner loop is the current value of Row."],
    explanation: "A nested loop that builds lines of stars.",
    stem: "The algorithm below uses `&` to join strings and outputs a pattern of stars.\n\n" + codeBlock(starCode),
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "State how many times the statement `Line ← Line & \"*\"` is executed.", value: inner, wrong: [3, 9], workedSolution: "The inner loop runs 1, 2 and 3 times: 6.", explanation: "6 times." }),
      P.num({ label: "(b)", marks: 1, stem: "State how many stars are in the last line output.", value: 3, wrong: [6, 1], workedSolution: "For Row = 3 the inner loop runs 3 times.", explanation: "3 stars." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain how the number of stars on each line is controlled.", points: ["The inner loop runs from 1 to Row", "So the number of stars on a line equals the value of Row for that line"], modelAnswer: "The inner loop runs from 1 to Row, so each line has as many stars as its row number.", explanation: "The inner limit is the outer variable." }),
      P.manual({ label: "(d)", marks: 2, stem: "State the change needed to output four lines, the last with four stars.", points: ["Change the outer loop limit from 3 to 4", "No change is needed to the inner loop because it uses Row"], modelAnswer: "Change `FOR Row ← 1 TO 3` to `FOR Row ← 1 TO 4`; the inner loop needs no change.", explanation: "Only the outer limit changes." }),
    ] });

  // ---- flashcards
  b.card("DEFINITION", "Dry run", "Following an algorithm by hand with test data, recording the values of variables and outputs.");
  b.card("DEFINITION", "Trace table", "A table with a column for each variable and the output; a new row is written each time a value changes.");
  b.card("DEFINITION", "Logic error", "An error in the design that lets the algorithm run but produces a wrong result.");
  b.card("FACT", "DIV and MOD", "DIV(17, 5) = 3 (whole-number quotient); MOD(17, 5) = 2 (remainder).");
  b.card("CONCEPT", "Normal, boundary and abnormal data", "Normal: valid and expected. Boundary: at the edge of the allowed range. Abnormal: should be rejected.");
  b.card("CONCEPT", "Stating the purpose", "Describe the overall result in the context of the problem, not the individual steps.");
  b.card("CONCEPT", "Finding an error", "Dry run with data whose correct answer is known and find the row where the trace first goes wrong.");
  b.card("FACT", "Common logic errors", "Wrong comparison operator, total not set to 0, off-by-one loop limit, wrong variable output.");
  b.card("CONCEPT", "Nested loops", "The inner loop runs completely for each pass of the outer loop, so total passes = outer × inner (when the limits are fixed).");
});
