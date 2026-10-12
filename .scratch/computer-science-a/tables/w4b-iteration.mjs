import { run, writeLesson, mdTable, codeBlock, py, same, chk } from "./w4b-q.mjs";
import { Trace } from "./w4a-util.mjs";

// ---- FOR with STEP
const forVals = py("print(list(range(1, 11, 3)))");
same(forVals, "[1, 4, 7, 10]");
const downVals = py("print(list(range(20, 0, -5)))");
same(downVals, "[20, 15, 10, 5]");

// ---- sentinel loop with trace table (WHILE)
const data = [12, 7, 20, 5, -1];
const tr = new Trace(["Number", "Total", "Count", "OUTPUT"]);
let total = 0, count = 0, i = 0;
tr.row({ Total: 0, Count: 0 });
let number = data[i++];
tr.row({ Number: number });
while (number !== -1) {
  total += number; count++;
  tr.row({ Total: total, Count: count });
  number = data[i++];
  tr.row({ Number: number });
}
tr.row({ OUTPUT: total / count });
same([total, count, total / count], [44, 4, 11]);
const sentinel = run(`total = 0
count = 0
number = int(input())
while number != -1:
    total = total + number
    count = count + 1
    number = int(input())
print("Total:", total)
print("Average:", total / count)`, data.join("\n"));
same(sentinel.out, "Total: 44\nAverage: 11.0");

// ---- three loops, same task: pass counts
const passes = py(`count_for = 0
for n in range(1, 6):
    count_for += 1
count_while = 0
n = 1
while n <= 5:
    count_while += 1
    n += 1
count_repeat = 0
n = 1
while True:
    count_repeat += 1
    n += 1
    if n > 5:
        break
print(count_for, count_while, count_repeat)
count_while0 = 0
n = 9
while n <= 5:
    count_while0 += 1
    n += 1
count_repeat0 = 0
n = 9
while True:
    count_repeat0 += 1
    n += 1
    if n > 5:
        break
print(count_while0, count_repeat0)`);
same(passes, "5 5 5\n0 1");

// ---- validation with REPEAT UNTIL in Python
const valid = run(`mark = -1
while mark < 0 or mark > 100:
    print("Enter a mark from 0 to 100")
    mark = int(input())
    if mark < 0 or mark > 100:
        print("Invalid")
print("Accepted:", mark)`, "150\n-5\n42");
same(valid.out, "Enter a mark from 0 to 100\nInvalid\nEnter a mark from 0 to 100\nInvalid\nEnter a mark from 0 to 100\nAccepted: 42");

// ---- nested loops: three levels
const nested = py(`count = 0
for a in range(1, 3):
    for b in range(1, 4):
        for c in range(1, 3):
            count += 1
print(count)`);
same(nested, "12");
const pairs = py(`for row in range(1, 4):
    line = ""
    for col in range(1, 5):
        line = line + str(row * col) + " "
    print(line.rstrip())`);
same(pairs, "1 2 3 4\n2 4 6 8\n3 6 9 12");

const loopTable = mdTable(["Loop", "Condition tested", "Runs at least once?", "Use when"], [
  ["`FOR ... TO ... NEXT`", "Count is checked before each pass", "No, if the start is already past the end", "the number of passes is known"],
  ["`WHILE ... DO ... ENDWHILE`", "Before each pass (pre-condition)", "No: it may run zero times", "the number of passes is not known and may be zero"],
  ["`REPEAT ... UNTIL`", "After each pass (post-condition)", "Yes: always at least once", "the body must run once, e.g. input validation"],
]);

const body = `
## Introduction

A teacher in Mutare has 40 learners' marks to add up. Writing 40 separate statements would be tedious and would break as soon as there were 41 learners. **Iteration** lets a program repeat a block of statements as many times as needed, whether the count is known in advance (40 learners), depends on the data (until a mark of -1 is typed) or depends on a condition (until a valid mark is entered).

This lesson covers the three loop constructs of 9618-style pseudocode (\`FOR\`, \`WHILE\` and \`REPEAT\`), their Python versions, nested loops up to three levels, loops that build totals and counters, validation loops and tracing the output of loops. You should know selection and expressions from the previous lessons.

## Key definitions

:::definition{term="Iteration"}
The repetition of a block of statements. Each execution of the block is called a pass or an iteration.
:::

:::definition{term="Count-controlled loop"}
A loop that repeats a fixed number of times, controlled by a loop variable that counts from a start value to an end value. It is written with \`FOR\` in pseudocode and Python.
:::

:::definition{term="Pre-condition loop"}
A loop in which the condition is tested before the body is run, so the body may not run at all. \`WHILE\` is a pre-condition loop.
:::

:::definition{term="Post-condition loop"}
A loop in which the condition is tested after the body has run, so the body always runs at least once. \`REPEAT ... UNTIL\` is a post-condition loop, and it ends when the condition becomes true.
:::

## The three loops

${loopTable}

The \`FOR\` loop in pseudocode can have a \`STEP\`. \`FOR Count ← 1 TO 10 STEP 3\` gives the values ${forVals.replace(/[\[\]]/g, "")} (the loop stops when the next value would be past 10), and a negative step counts down. Python uses \`range(start, stop, step)\`, where the stop value is **not** included, so the same loop is \`for count in range(1, 11, 3)\`, and counting down from 20 in steps of 5 is \`range(20, 0, -5)\`, giving ${downVals.replace(/[\[\]]/g, "")}.

${codeBlock(`FOR Count ← 1 TO 10 STEP 3
    OUTPUT Count
NEXT Count

Number ← 1
WHILE Number <= 5 DO
    OUTPUT Number
    Number ← Number + 1
ENDWHILE

REPEAT
    INPUT Mark
UNTIL Mark >= 0 AND Mark <= 100`)}

Python has no post-condition loop. A \`REPEAT ... UNTIL condition\` is written as \`while True:\` with an \`if condition: break\` at the end, or by setting the variable so that the \`while\` test is true at first. The difference in behaviour is shown by running the same count with a start value that is already past the limit: the \`WHILE\` form ran its body ${passes.split("\n")[1].split(" ")[0]} times and the \`REPEAT\` form ran its body ${passes.split("\n")[1].split(" ")[1]} time.

## Totals, counters and flags

Most loops have a **total** (add each value), a **counter** (add 1 each time) or a **flag** (a Boolean that records whether something has happened). The rule is: set the total and counter to 0 *before* the loop, update them *inside*, and use them *after*. A loop that ends when a special value, called a **sentinel**, is entered needs the first input before the loop and the next input at the end of each pass.

:::worked-solution{title="Total and average with a sentinel"}
A program reads marks until -1 is entered and then outputs the total and the average. The sentinel -1 is not a mark and must not be added. Pseudocode:

${codeBlock(`Total ← 0
Count ← 0
INPUT Number
WHILE Number <> -1 DO
    Total ← Total + Number
    Count ← Count + 1
    INPUT Number
ENDWHILE
OUTPUT "Total: ", Total
OUTPUT "Average: ", Total / Count`)}

The marks 12, 7, 20, 5 and -1 are entered. The trace table (blank cells did not change):

${tr.md()}

Python version run with the same input:

${sentinel.code}

Output:

${sentinel.outBlock}

The loop body ran 4 times and the sentinel was never added. If the first value entered were -1, \`Count\` would be 0 and \`Total / Count\` would be a division by zero, so a careful program tests \`Count > 0\` before dividing.
:::

## Validation loops

A **validation loop** repeats an input until the value is acceptable. Because the user must be asked at least once, a post-condition loop is the natural choice in pseudocode.

${codeBlock(`REPEAT
    OUTPUT "Enter a mark from 0 to 100"
    INPUT Mark
    IF Mark < 0 OR Mark > 100 THEN
        OUTPUT "Invalid"
    ENDIF
UNTIL Mark >= 0 AND Mark <= 100`)}

:::worked-solution{title="Input validation in Python"}
The Python version starts with an invalid value so that the loop body runs at least once. It was run with the inputs 150, -5 and 42:

${valid.code}

Output:

${valid.outBlock}

Two invalid values were rejected, each with a message, and the third was accepted. Note that the condition to *continue* in a \`while\` loop is the opposite of the \`UNTIL\` condition used to *stop* in a \`REPEAT\` loop: \`UNTIL Mark >= 0 AND Mark <= 100\` becomes \`while mark < 0 or mark > 100\`.
:::

## Nested loops

A loop inside a loop runs completely for every pass of the outer loop. The total number of passes of the innermost statement is the product of the numbers of passes of each level when the limits are fixed. Three levels of nesting are the most you will be asked to trace or write.

:::worked-solution{title="Counting passes and printing a table"}
This Python code counts the passes of three nested loops (the outer loop runs 2 times, the middle 3 times and the inner 2 times):

${codeBlock(`count = 0
for a in range(1, 3):
    for b in range(1, 4):
        for c in range(1, 3):
            count += 1
print(count)`, "python")}

The output is ${nested}, because 2 × 3 × 2 = 12. A nested loop is also used to print a table. In this program the outer loop controls the rows and the inner loop the columns:

${codeBlock(`for row in range(1, 4):
    line = ""
    for col in range(1, 5):
        line = line + str(row * col) + " "
    print(line.rstrip())`, "python")}

Output:

${codeBlock(pairs)}
:::

## Choosing a loop and avoiding infinite loops

Use \`FOR\` when you know how many times to repeat, \`WHILE\` when the loop may need to run zero times or the end depends on data, and \`REPEAT\` when the body must run at least once. A loop runs forever (an **infinite loop**) when nothing in the body can make the condition change, for example when the line \`Number ← Number + 1\` is forgotten, or when the condition can never become true. In a \`FOR\` loop you must not change the loop variable inside the body.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards expect \`FOR\` with \`STEP\`, \`WHILE\` and \`REPEAT\` in 9618-style pseudocode and their Python equivalents (ZIMSEC Form 5; Cambridge AS Level, Papers 1 and 2). ZIMSEC states that nested loops up to three levels are examined. Cambridge's pseudocode guide has no loop-control statements such as \`break\`, so in pseudocode write the condition of the loop instead; \`break\` is a Python feature.
:::

## Common mistakes

:::mistake{title="Putting the total initialisation inside the loop"}
\`Total ← 0\` inside the loop resets the total on every pass, so only the last value remains. Initialise before the loop.
:::

:::mistake{title="Off-by-one in range()"}
\`range(1, 10)\` stops at 9. To include 10 use \`range(1, 11)\`. In pseudocode \`FOR Count ← 1 TO 10\` does include 10.
:::

:::mistake{title="Adding the sentinel"}
Updating the total after reading the sentinel -1 adds -1 to the total. Read, test, process, read again.
:::

:::mistake{title="Using the wrong sense of the condition"}
\`WHILE\` continues while its condition is true; \`UNTIL\` stops when its condition is true. Converting one to the other needs the opposite condition.
:::

## Exam tips

:::exam-tip
ZIMSEC Paper 1 and Cambridge Paper 2 ask you to **trace** a loop with a trace table, **state the number of times** a statement runs, **complete** a loop with the missing condition, **explain** why one loop is more suitable than another and **write** an algorithm with a loop. For a trace, write one row per pass and check the final output. To **justify** a loop choice, refer to whether the number of passes is known and whether the body must run at least once.
:::

:::exam-tip
In the practical papers, always initialise totals and counters before the loop, and guard against dividing by a count of zero.
:::

## Summary

:::summary
- \`FOR\` repeats a known number of times (with optional \`STEP\`); \`WHILE\` tests first and may run zero times; \`REPEAT ... UNTIL\` tests last and runs at least once.
- Python has \`for ... in range(start, stop, step)\` (the stop value is excluded) and \`while\`; a post-condition loop uses \`while True\` with \`break\`.
- Totals and counters are set to 0 before the loop and updated inside it; a sentinel ends input and is never processed.
- Validation loops repeat the input until the data is acceptable.
- Nested loops multiply: the innermost body runs outer × middle × inner times when the limits are fixed.
- An infinite loop has no way for its condition to change.
:::
`;
writeLesson({ key: "prog.iteration", title: "Iteration: FOR, WHILE and REPEAT loops", summary: "Count-controlled, pre-condition and post-condition loops in pseudocode and Python, loops with totals, counters, sentinels and flags, validation loops, nested loops to three levels, choosing the right loop and tracing loop output.", concept: "acs.prog.iteration", minutes: 55 }, body);
