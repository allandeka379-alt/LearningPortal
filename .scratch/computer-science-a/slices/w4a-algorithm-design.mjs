// Slice w4a: computational thinking and designing algorithms (acs.algo.algorithm-design, both boards).
import { concept, P, chk, same, mdTable, codeBlock, truthRows, L } from "../lib.mjs";
import { mc, pm } from "../tables/w4a-q.mjs";

concept("acs.algo.algorithm-design", { file: "algo/algorithm-design", keyPrefix: "algo.algorithm-design" }, (b) => {
  // computed values
  let total = 0;
  for (let c = 1; c <= 6; c++) if (c % 2 === 0) total += c;
  chk(total, 12);
  let n = 40, steps = 0;
  do { n = Math.floor(n / 2); steps++; } while (!(n < 3));
  chk(steps, 4); chk(n, 2);
  // shop struct: prices 3, 8, 5, 12, 2, 0
  const prices = [3, 8, 5, 12, 2, 0];
  let items = 0, shopTotal = 0;
  for (const p of prices) { if (p === 0) break; if (p >= 5) { shopTotal += p; items++; } }
  chk(items, 3); chk(shopTotal, 25);
  const shopCode = `Total ← 0
Items ← 0
INPUT Price
WHILE Price <> 0 DO
    IF Price >= 5 THEN
        Total ← Total + Price
        Items ← Items + 1
    ENDIF
    INPUT Price
ENDWHILE
OUTPUT Items, Total`;
  // attendance logic: Present AND NOT Late
  const rows = truthRows(["Present", "Late"], (p, l) => L.and(p, L.not(l)));
  same(rows.map((r) => r.out), [0, 0, 1, 0]);

  // ---- multiple choice
  mc(b, 2, "RECALL", "What is an algorithm?",
    ["A finite, ordered set of clear steps that solves a problem", "Correct."],
    [["A program written in a high-level language", "A program is one way of expressing an algorithm, but an algorithm is independent of the language."], ["A diagram that shows how the devices of a network are connected", "That is a network diagram."], ["A list of the errors found when testing a program and how they were fixed", "That is a test report."]],
    "An algorithm is a step-by-step method that ends and is unambiguous.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which statement describes abstraction?",
    ["Removing the details that are not needed for the solution", "Correct."],
    [["Splitting a problem into smaller sub-problems that are solved separately", "That is decomposition."], ["Repeating a set of statements a number of times until a condition is met", "That is iteration."], ["Converting pseudocode into machine code", "That is translation."]],
    "Abstraction filters out unnecessary detail.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "A programmer splits a clinic appointment system into modules for booking, reminders and reports. What is this called?",
    ["Decomposition", "Correct: one big problem is split into parts."],
    [["Abstraction", "Abstraction removes detail rather than splitting the problem."], ["Iteration", "Iteration repeats statements."], ["Validation", "Validation checks that data is reasonable."]],
    "Splitting a problem into modules is decomposition.");
  mc(b, 1, "RECALL", "Which three constructs are used to build every algorithm?",
    ["Sequence, selection and iteration", "Correct."],
    [["Input, process and output", "These describe the parts of a program, not the constructs."], ["Declaration, assignment and comment", "These are types of statement, not the three constructs."], ["Variable, constant and array", "These are data items."]],
    "Sequence, selection and iteration.");
  mc(b, 2, "RECALL", "Which pseudocode loop always executes its body at least once?",
    ["`REPEAT … UNTIL`", "Correct: the condition is tested after the body."],
    [["`WHILE … ENDWHILE`", "The condition is tested first, so the body may never run."], ["`FOR … NEXT` with a start value greater than the end value", "Such a loop does not run at all."], ["`CASE OF … ENDCASE`", "This is a selection, not a loop."]],
    "A post-condition loop runs the body once before testing.", {});
  mc(b, 2, "RECALL", "In a flowchart, which shape is used for a decision?",
    ["A diamond", "Correct."],
    [["A rectangle", "A rectangle is a process."], ["A parallelogram", "A parallelogram is input or output."], ["An oval", "An oval is the start or the end."]],
    "A diamond holds a condition with two exits.");
  mc(b, 3, "APPLICATION", "A program stores the average mark of a class, which can be 63.4. Which data type should the identifier `ClassAverage` have?",
    ["REAL", "Correct: it holds a number with a fractional part."],
    [["INTEGER", "An integer cannot store the 0.4."], ["STRING", "A string would hold text, not a number to calculate with."], ["BOOLEAN", "A Boolean holds only TRUE or FALSE."]],
    "Values with fractional parts need REAL.", { hints: ["Does the value have a fractional part?"] });
  mc(b, 3, "ANALYSIS", "A team is designing a program that finds the cheapest bus fare between two towns. Which detail can be removed by abstraction?",
    ["The colour of each bus", "Correct: it does not affect the fare."],
    [["The fare between each pair of towns", "The fares are needed to find the cheapest."], ["The names of the two towns", "The towns identify the journey."], ["The towns joined by each route", "The routes are needed to find the journeys."]],
    "Keep what affects the result; remove the rest.", { hints: ["Which detail has no effect on the answer?"] });

  // ---- true / false, matching, fill in the blank
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "A `WHILE` loop can finish without ever executing its body.", answer: true,
    explanation: "True. The condition is tested before the first pass; if it is false at the start the body is skipped." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Stepwise refinement starts with the detailed program code and works back to general steps.", answer: false,
    explanation: "False. It starts with a few general steps and replaces each with more detailed steps." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term to its meaning.",
    pairs: [["Abstraction", "Removing details that are not needed"], ["Decomposition", "Splitting a problem into sub-problems"], ["Selection", "A condition decides which statements run"], ["Iteration", "Statements are repeated"], ["Identifier table", "Lists each variable with its type and purpose"]],
    explanation: "Each term has one clear meaning in algorithm design." });
  b.fib({ d: 3, skill: "UNDERSTANDING", hints: ["Think about which construct decides between two paths and which repeats."],
    stem: "Complete the sentences about the three constructs.",
    template: "Statements that run one after another are a {{blank:a}}. An IF statement is an example of {{blank:b}}. A FOR loop is an example of {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["sequence"], choices: ["sequence", "selection", "iteration", "recursion"] },
      { id: "b", accepted: ["selection"], choices: ["sequence", "selection", "iteration", "assignment"] },
      { id: "c", accepted: ["iteration"], choices: ["sequence", "selection", "iteration", "declaration"] },
    ], explanation: "Sequence, selection, iteration." });

  // ---- numerical
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Only even values of Count are added."],
    stem: "Trace this algorithm and state the value output.\n\n" + codeBlock(`Total ← 0
FOR Count ← 1 TO 6
    IF MOD(Count, 2) = 0 THEN
        Total ← Total + Count
    ENDIF
NEXT Count
OUTPUT Total`),
    value: total, wrong: [21, 6], workedSolution: "Count is 2, 4 and 6 when it is even, so Total = 2 + 4 + 6.", explanation: "The even numbers 2, 4 and 6 are added: 12." });
  b.num({ d: 4, skill: "APPLICATION", calculator: false, hints: ["Write N and Steps after each pass of the loop.", "The loop stops when N is less than 3."],
    stem: "State how many times the loop body is executed.\n\n" + codeBlock(`N ← 40
Steps ← 0
REPEAT
    N ← DIV(N, 2)
    Steps ← Steps + 1
UNTIL N < 3`),
    value: steps, wrong: [3, 5], workedSolution: "N becomes 20, 10, 5, 2 after passes 1 to 4. After pass 4, N = 2 which is less than 3, so the loop ends.", explanation: "The body runs 4 times." });
  b.short({ d: 2, skill: "RECALL", stem: "Name the process of replacing general steps by more detailed steps until the algorithm can be coded.", accepted: ["stepwise refinement", "refinement", "top-down design", "step-wise refinement"], wrong: ["abstraction", "decomposition"], explanation: "Stepwise refinement." });
  b.truth({ d: 3, skill: "APPLICATION", hints: ["The expression is true only when Present is 1 and Late is 0."],
    stem: "A school marks a pupil as on time when the statement `Present AND NOT Late` is true. Complete the truth table.",
    inputs: ["Present", "Late"], fn: (p, l) => L.and(p, L.not(l)), out: "OnTime", explanation: "Only when Present = 1 and Late = 0 is OnTime 1." });

  // ---- self-marked
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 2, stem: "Explain what is meant by abstraction, using an example. [2]",
    points: ["Abstraction means keeping only the details needed to solve the problem and removing the others", "A suitable example, such as a bus route map showing stops and distances but not buildings"],
    modelAnswer: "Abstraction is keeping only the details that matter for the solution and leaving out the rest, for example a route map that shows stops and distances but not the buildings.", explanation: "Definition plus example." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Think about testing, teamwork and reuse."],
    stem: "State three benefits of decomposing a program into modules. [3]",
    points: ["Each module can be tested separately", "Different programmers can write different modules at the same time", "A module can be reused in other programs or changed without affecting the rest"],
    modelAnswer: "Each module can be tested on its own, different programmers can work on different modules at the same time, and a module can be reused or changed without affecting the others.", explanation: "Testing, teamwork, reuse and maintenance." });
  b.manualShort({ d: 4, skill: "CREATION", marks: 4, hints: ["Declare the identifiers, then use a loop and a selection."],
    stem: "Write pseudocode for an algorithm that inputs the heights of 8 pupils in centimetres and outputs how many are taller than 150 cm. [4]",
    points: ["Initialises the counter to 0 before the loop", "Uses a loop that runs exactly 8 times with an input inside it", "Uses a selection that tests whether the height is greater than 150", "Adds 1 to the counter when true and outputs the counter after the loop"],
    modelAnswer: codeBlock(`Tall ← 0
FOR Pupil ← 1 TO 8
    INPUT Height
    IF Height > 150 THEN
        Tall ← Tall + 1
    ENDIF
NEXT Pupil
OUTPUT Tall`), explanation: "A counter with a loop and a selection." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Compare when the condition is tested."],
    stem: "Describe the difference between a `WHILE` loop and a `REPEAT … UNTIL` loop. [3]",
    points: ["A WHILE loop tests its condition before the body", "A REPEAT loop tests its condition after the body, so the body always runs at least once", "A WHILE loop repeats while the condition is true, a REPEAT loop repeats until the condition becomes true"],
    modelAnswer: "A WHILE loop tests the condition before the body, so the body may never run. A REPEAT loop tests after the body, so it always runs at least once. WHILE continues while its condition is true, whereas REPEAT continues until its condition becomes true.", explanation: "Pre-condition against post-condition loops." });

  // ---- structured practice
  b.struct({ d: 4, skill: "APPLICATION", examStyle: true, hints: ["Only prices of 5 or more are counted.", "The loop stops when the price entered is 0."],
    explanation: "A trace of a WHILE loop with a sentinel value.",
    stem: "A shop in Mutare uses this algorithm to add up the prices of the larger items bought by a customer. The prices entered are 3, 8, 5, 12, 2 and then 0 (the stop value).\n\n" + codeBlock(shopCode),
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "State the value of `Items` output.", value: items, wrong: [5, 4], workedSolution: "The prices 8, 5 and 12 are at least 5.", explanation: "3 prices are counted." }),
      P.num({ label: "(b)", marks: 1, stem: "State the value of `Total` output.", value: shopTotal, wrong: [30, 8], workedSolution: "8 + 5 + 12 = 25.", explanation: "Total = 25." }),
      pm("(c)", "What is the purpose of the algorithm?", ["To count and total the prices that are 5 or more", "Correct."], [["To count all the prices entered by the customer", "Prices below 5 are not counted."], ["To find the largest price entered by the customer", "No comparison of prices is made."], ["To find the average of all the prices", "No division takes place."]], "It counts and totals only the prices at or above 5."),
      P.fib({ label: "(d)", marks: 2, stem: "The first price entered is 0. State the values output.", template: "Items = {{blank:i}}, Total = {{blank:t}}", blanks: [{ id: "i", accepted: ["0"], input: "number" }, { id: "t", accepted: ["0"], input: "number" }], wrong: [["1", "1"]], explanation: "The WHILE condition is false at once, so the body never runs." }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain why a `WHILE` loop is a better choice than a `REPEAT … UNTIL` loop for this algorithm.", points: ["A WHILE loop tests the price before it is processed", "So when the first price is 0 the stop value is not added or counted, whereas REPEAT would process it once"], modelAnswer: "A WHILE loop tests the price before the body runs, so if the first price is 0 nothing is processed. A REPEAT loop would run the body once before testing.", explanation: "Pre-condition loops suit a stop value." }),
      pm("(f)", "Which data type is most suitable for `Price`?", ["REAL", "Correct: prices can have cents."], [["BOOLEAN", "A Boolean holds only TRUE or FALSE."], ["CHAR", "A CHAR holds a single character."], ["STRING", "A string holds text, not a number to add."]], "Prices can have cents, so a number with a fractional part is needed."),
    ] });
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Abstraction removes detail; decomposition splits into modules.", "The statement is true only when Present is 1 and Late is 0."],
    explanation: "Abstraction, decomposition and a logic statement for an attendance register.",
    stem: "A school in Masvingo is planning a program to record attendance. For each pupil the program will receive a Present value and a Late value, each 1 for yes and 0 for no.",
    parts: [
      pm("(a)", "Which detail about a pupil can be left out of the attendance program by abstraction?", ["The pupil's favourite sport", "Correct: it has no effect on attendance."], [["The pupil's name", "The name identifies the pupil."], ["Whether the pupil is present", "Presence is what the program records."], ["Whether the pupil is late", "Lateness is part of the statement in part (c)."]], "The favourite sport has no effect on attendance."),
      P.manual({ label: "(b)", marks: 2, stem: "Describe how the problem could be decomposed.", points: ["Split into separate modules such as capturing attendance and reporting", "Each module has one job and is written and tested separately"], modelAnswer: "Split it into modules such as capturing the attendance, calculating totals and printing reports, each written and tested separately.", explanation: "Modules with one job each." }),
      P.truth({ label: "(c)", marks: 4, stem: "A pupil counts as on time when `Present AND NOT Late` is true. Complete the truth table.", inputs: ["Present", "Late"], fn: (p, l) => L.and(p, L.not(l)), out: "OnTime", explanation: "True only for Present = 1 and Late = 0." }),
      P.manual({ label: "(d)", marks: 2, stem: "Write pseudocode that outputs \"On time\" when the statement in part (c) is true.", points: ["An IF statement with the correct condition Present = 1 AND Late = 0 (or Present AND NOT Late)", "Outputs \"On time\" in the true branch and closes the structure with ENDIF"], modelAnswer: codeBlock(`IF Present = 1 AND Late = 0 THEN
    OUTPUT "On time"
ENDIF`), explanation: "A selection with the combined condition." }),
    ] });

  // ---- flashcards
  b.card("DEFINITION", "Abstraction", "Keeping only the details needed to solve a problem and removing those that do not matter.");
  b.card("DEFINITION", "Decomposition", "Breaking a problem into smaller sub-problems, each solved as a separate module.");
  b.card("DEFINITION", "Algorithm", "A finite, ordered set of unambiguous steps that solves a problem.");
  b.card("CONCEPT", "The three constructs", "Sequence (in order), selection (a condition chooses) and iteration (repetition).");
  b.card("DEFINITION", "Identifier table", "A table of every variable, constant and array with its data type and purpose.");
  b.card("DEFINITION", "Stepwise refinement", "Starting with a few general steps and replacing each with more detailed steps until they can be coded.");
  b.card("FACT", "Flowchart shapes", "Oval: start or end. Rectangle: process. Parallelogram: input or output. Diamond: decision.");
  b.card("FACT", "WHILE against REPEAT", "WHILE tests first and may never run. REPEAT … UNTIL tests last and runs at least once.");
  b.card("FACT", "Pseudocode style", "Keywords in capitals, mixed-case identifiers, four-space indentation, ← for assignment, // for comments.");
});
