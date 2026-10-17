---
{
  "key": "algo.algorithm-design",
  "title": "Computational thinking and designing algorithms",
  "summary": "Abstraction and decomposition, what an algorithm is, the identifier table, the three constructs of sequence, selection and iteration, writing an algorithm as structured English, a flowchart or pseudocode, stepwise refinement and logic statements.",
  "concepts": ["acs.algo.algorithm-design"],
  "estimatedMinutes": 55,
  "level": "core",
  "freePreview": true
}
---
## Introduction

A school in Gweru wants a program that turns each pupil's five test marks into an average and a pass or fail result. Before anyone types a line of code, someone must decide what the program has to do, which details matter and in what order the steps happen. That planning is **computational thinking**, and the plan itself is an **algorithm**. A good algorithm can be written in structured English, drawn as a flowchart or written in pseudocode, and then turned into a program in any language.

This lesson explains abstraction and decomposition, the three constructs every algorithm is built from, the identifier table, three ways of writing an algorithm, stepwise refinement and logic statements. Every value in the worked examples was produced by running code. You should already know what a variable is and how to read simple pseudocode.

## Key definitions

:::definition{term="Abstraction"}
Reducing a problem to the details that matter and leaving out the details that do not, so that a model of the problem can be solved. A map of bus routes that shows stops and distances but not buildings is an abstraction.
:::

:::definition{term="Decomposition"}
Breaking a problem into smaller sub-problems, each of which can be solved, written and tested separately, usually as a program module (a procedure or function).
:::

:::definition{term="Algorithm"}
A finite, ordered set of unambiguous steps that solves a problem or carries out a task. It must end after a finite number of steps and give the same result for the same input.
:::

:::definition{term="Identifier table"}
A table listing every variable, constant and array used by an algorithm, with its data type and purpose.
:::

:::definition{term="Stepwise refinement"}
Writing a solution first as a few general steps and then repeatedly replacing each general step with more detailed steps until every step can be coded directly.
:::

## Abstraction and decomposition

**Abstraction** keeps only what the solution needs. A timetable program needs a pupil's name, class and subjects; it does not need the pupil's height. The benefits are a simpler problem, less data to store and a model that can be reused for similar problems. To produce an abstract model, list everything about the situation, decide which items affect the answer, and remove the rest.

**Decomposition** makes a large problem manageable. A school report system might be split into: capture marks, calculate averages, decide grades and print reports. Each module has one job, can be given to a different programmer and can be tested alone. The benefits are easier testing, easier maintenance and shared work.

## The three constructs

Every algorithm, however long, is built from three constructs:

- **Sequence**: statements executed one after another in the order written.
- **Selection**: a condition decides which statements run (`IF … THEN … ELSE … ENDIF`, `CASE OF`).
- **Iteration**: statements repeat (`FOR … NEXT`, `WHILE … ENDWHILE`, `REPEAT … UNTIL`). A `FOR` loop repeats a known number of times; `WHILE` tests first and may never run; `REPEAT … UNTIL` tests last and always runs at least once.

:::keyfact{title="Pseudocode style used in this course"}
Keywords in capitals, identifiers in mixed case (`NumberOfPupils`), four-space indentation inside constructs, assignment written `←`, comments after `//`, and a declaration such as `DECLARE Total : INTEGER` for each variable. `OUTPUT` and `INPUT` show the data that leaves and enters the algorithm.
:::

## Three ways of writing an algorithm

**Structured English** uses short plain sentences in a fixed layout ("Set Total to 0. Repeat five times: input a mark and add it to Total"). **A flowchart** uses shapes: an oval for start and end, a rectangle for a process, a parallelogram for input or output and a diamond for a decision. **Pseudocode** is code-like text that follows a standard style but is not tied to one language. Flowcharts are described here as a table of numbered boxes, because the table says exactly which box follows which.

:::worked-solution{title="From a problem statement to pseudocode by stepwise refinement"}
Problem: read five test marks for one pupil, display the average and display "Pass" if the average is at least 50, otherwise "Fail".

**Level 1** (general steps):

1. Get the marks and add them up.
2. Work out the average.
3. Decide and display the result.

**Level 2** (refine step 1 using iteration): set `Total` to 0; repeat five times: input a mark and add it to `Total`.

**Level 3** (refine steps 2 and 3): `Average` is `Total` divided by 5; selection on `Average >= 50`.

The identifier table is:

| Identifier | Data type | Purpose |
|:-:|:-:|:-:|
| Total | INTEGER | running total of the marks |
| Mark | INTEGER | the mark just entered |
| Count | INTEGER | loop counter, 1 to 5 |
| Average | REAL | total divided by 5 |

The finished pseudocode is:

```
DECLARE Total, Mark, Count : INTEGER
DECLARE Average : REAL
Total ← 0
FOR Count ← 1 TO 5
    INPUT Mark
    Total ← Total + Mark
NEXT Count
Average ← Total / 5
OUTPUT "Average is ", Average
IF Average >= 50 THEN
    OUTPUT "Pass"
ELSE
    OUTPUT "Fail"
ENDIF
```

Python version, run with the marks 62, 48, 71, 55, 39 entered one per line:

```python
total = 0
for count in range(1, 6):
    mark = int(input())
    total = total + mark
average = total / 5
print("Average is", average)
if average >= 50:
    print("Pass")
else:
    print("Fail")
```

The output of that real run is:

```
Average is 55.0
Pass
```

The total is 275, the average is 55 and the result is Pass, because 55 is at least 50. (Python prints a real number with a decimal point; the pseudocode value is 55.)
:::

## Flowcharts and converting between forms

![Flowchart that counts positive numbers: start, Count set to 0, input a number, if it is 0 output Count and end, otherwise if it is greater than 0 add 1 to Count, and loop back to the input; for 4, -2, 7, 0 the output is 2](media:diagrams/algo-flowchart-count-positive.png "Figure: the flowchart for counting the positive numbers entered before 0")

:::worked-solution{title="Converting a flowchart to pseudocode"}
The flowchart below counts how many positive numbers are entered before the number 0 (the stop value) is entered.

| Box | Shape | Text | Next box |
|:-:|:-:|:-:|:-:|
| 1 | Start | Start | 2 |
| 2 | Process | `Count ← 0` | 3 |
| 3 | Input | `INPUT Number` | 4 |
| 4 | Decision | `Number = 0`? | Yes → 7, No → 5 |
| 5 | Decision | `Number > 0`? | Yes → 6, No → 3 |
| 6 | Process | `Count ← Count + 1` | 3 |
| 7 | Output | `OUTPUT Count` | 8 |
| 8 | End | End | none |

Box 4 asks whether the number is the stop value; if not, box 5 asks whether it is positive, and box 6 adds one to the counter. All arrows from boxes 5 (No) and 6 lead back to box 3, so boxes 3 to 6 form a loop whose test comes after the input: `REPEAT … UNTIL`.

```
Count ← 0
REPEAT
    INPUT Number
    IF Number > 0 THEN
        Count ← Count + 1
    ENDIF
UNTIL Number = 0
OUTPUT Count
```

For the input 4, -2, 7, 0 the algorithm outputs 2: 4 and 7 are positive, -2 is not, and 0 ends the loop without being counted.
:::

## Logic statements

A **logic statement** is a condition that is true or false and combines simpler conditions with `AND`, `OR` and `NOT`. A school gives a bus pass to a pupil who lives far from school and is not a boarder: `Far AND NOT Boarder`. Listing every case in a table checks the statement:

| Far | Boarder | Far AND NOT Boarder |
|:-:|:-:|:-:|
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

Only the row where `Far` is 1 and `Boarder` is 0 gives 1. Algorithms use such statements as the condition of an `IF` or a loop.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine abstraction, decomposition, the three constructs, identifier tables and writing algorithms in structured English, flowchart and pseudocode form (ZIMSEC Form 5; Cambridge AS Level, Paper 2). Cambridge pseudocode follows the 9618 guide. The same style is used here for both boards.
:::

## Common mistakes

:::mistake{title="Putting detail in the first level of refinement"}
Level 1 should be a few general steps. Writing `Total ← Total + Mark` at level 1 skips the thinking that refinement is for.
:::

:::mistake{title="Confusing abstraction with decomposition"}
Abstraction removes unnecessary detail. Decomposition splits a problem into parts. A map that leaves out buildings is abstraction; splitting a report program into modules is decomposition.
:::

:::mistake{title="Forgetting to initialise a total"}
A running total must be set to 0 before the loop. Without that, the first addition starts from an unknown value.
:::

:::mistake{title="Wrong loop type"}
A `WHILE` loop may run zero times because it tests first; `REPEAT … UNTIL` always runs once. Choosing the wrong one gives an off-by-one error in the number of repeats.
:::

## Exam tips

:::exam-tip
ZIMSEC Paper 1 and Cambridge Papers 1 and 2 ask you to **write** an algorithm in pseudocode, **convert** a flowchart or structured English to pseudocode, or **complete** an identifier table. **State** the data type of each identifier, and keep to the pseudocode style: capitals for keywords, `←` for assignment, indentation inside loops and selections.
:::

:::exam-tip
"**Explain** the benefits of decomposition" needs two or three separate points (easier to test, shared between programmers, modules reused). "**Describe** abstraction" needs the idea of keeping essential detail and removing the rest, with an example from the question.
:::

## Summary

:::summary
- Abstraction keeps only the essential details; decomposition splits a problem into modules.
- An algorithm is a finite, ordered, unambiguous set of steps; it is built from sequence, selection and iteration.
- An identifier table gives the name, data type and purpose of each variable.
- Stepwise refinement turns a few general steps into detailed steps that can be coded.
- Algorithms are written as structured English, as a flowchart (here a numbered table of boxes) or in pseudocode, and logic statements use `AND`, `OR` and `NOT`.
:::
