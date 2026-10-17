---
{
  "key": "algorithms.flowcharts",
  "title": "Flowcharts: symbols, selection and loops",
  "summary": "The standard flowchart symbols (terminator, process, input/output, decision, subroutine and flow line); how sequence, selection and loops appear in a flowchart; following a flowchart with test data; and converting between flowcharts and pseudocode.",
  "concepts": ["comp.algorithms.flowcharts"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

At the gate of a game park near Hwange, a ranger decides the entry fee by following a short routine: ask the visitor's age; if under 12, charge the child rate; otherwise, if 60 or over, charge the senior rate; otherwise charge the adult rate. Written as boxes joined by arrows, that routine is a **flowchart**.

A flowchart shows an algorithm as a diagram: each step sits in a box whose **shape** tells you what kind of step it is, and arrows show the order. Flowcharts make the flow of control, especially decisions and loops, easy to see. Both boards expect you to interpret flowcharts, complete or correct them, and convert between flowcharts and pseudocode. Cambridge sets the symbols you must use.

On this platform, flowcharts are written as **numbered tables**: each row is one box, with its shape, its text and where its arrows go. Read them exactly as you would read the drawn version.

## Key definitions

:::definition{term="Flowchart"}
A diagram that represents an algorithm using standard shapes for each type of step, joined by flow lines that show the order in which the steps are carried out.
:::

:::definition{term="Flow line"}
An arrow joining two shapes, showing that control passes from one step to the next in the direction of the arrow.
:::

:::definition{term="Decision"}
A step that asks a question with two possible answers (Yes/No or True/False), with one flow line leaving for each answer.
:::

## The standard symbols

| Symbol | Shape | Used for |
|:--|:--|:--|
| Terminator | A rectangle with fully rounded ends (a stadium or oval shape) | `START` and `STOP`; every flowchart has one start and at least one stop |
| Process | A rectangle | Something being done: an assignment or calculation such as `Total ← Total + Price` |
| Input/Output | A parallelogram (a rectangle leaning to one side) | `INPUT` or `OUTPUT` of data |
| Decision | A diamond | A question such as `Age < 12?`, with two exits labelled Yes and No (or True and False) |
| Subroutine | A rectangle with an extra vertical line just inside each side | Calling a procedure or function that has its own separate flowchart |
| Flow line | An arrow | Control passing from one shape to the next |

## Sequence, selection and loops in a flowchart

- **Sequence**: boxes joined one after another by single arrows.
- **Selection**: a decision box whose Yes and No arrows lead to different boxes; the two paths join up again later.
- **Iteration (a loop)**: a decision box with one exit leading **back** to an earlier box, so the boxes in between repeat. If the decision comes before the repeated boxes, it behaves like a `WHILE` loop; if it comes after them, it behaves like `REPEAT … UNTIL`.

![Flowchart for the game park fee: input Age; if Age < 12 the fee is 2; otherwise if Age >= 60 the fee is 3; otherwise the fee is 5; then output the fee. Ages 9, 35 and 60 give 2, 5 and 3](media:diagrams/flowchart-park-fee-selection.png "Figure: the game park fee flowchart with two decision boxes")

:::worked-solution[Following a flowchart with selection]
The game-park flowchart, with the rates in dollars:

| Box | Shape | Text | Next |
|:-:|:--|:--|:--|
| 1 | Terminator | START | 2 |
| 2 | Input/Output | INPUT Age | 3 |
| 3 | Decision | Age < 12? | Yes → 4, No → 5 |
| 4 | Process | Fee ← 2 | 8 |
| 5 | Decision | Age >= 60? | Yes → 6, No → 7 |
| 6 | Process | Fee ← 3 | 8 |
| 7 | Process | Fee ← 5 | 8 |
| 8 | Input/Output | OUTPUT Fee | 9 |
| 9 | Terminator | STOP | |

Find the output for the ages 9, 35 and 60.

1. Age 9: box 3, `9 < 12` is Yes → box 4, `Fee ← 2` → output **2**.
2. Age 35: box 3 is No → box 5, `35 >= 60` is No → box 7 → output **5**.
3. Age 60: box 3 is No → box 5, `60 >= 60` is Yes → box 6 → output **3**. Watch the boundary: `>=` includes 60.

The same algorithm in pseudocode is a nested `IF`:

```
INPUT Age
IF Age < 12
    THEN
        Fee ← 2
    ELSE
        IF Age >= 60
            THEN
                Fee ← 3
            ELSE
                Fee ← 5
        ENDIF
ENDIF
OUTPUT Fee
```
:::

## Following a loop

When a flowchart contains a loop, keep track of every variable as you go round, exactly as in a trace table.

![Flowchart of a loop that adds numbers until the rogue value -1: the decision Number = -1 comes straight after each input, so -1 is never added; with inputs 6, 9, 4, -1 the output is 19 3](media:diagrams/flowchart-loop-rogue-value.png "Figure: a flowchart loop that totals numbers until the rogue value -1 is entered")

:::worked-solution[A loop with a rogue value]
This flowchart adds up numbers until the rogue value -1 is entered.

| Box | Shape | Text | Next |
|:-:|:--|:--|:--|
| 1 | Terminator | START | 2 |
| 2 | Process | Total ← 0, Count ← 0 | 3 |
| 3 | Input/Output | INPUT Number | 4 |
| 4 | Decision | Number = -1? | Yes → 6, No → 5 |
| 5 | Process | Total ← Total + Number, Count ← Count + 1 | 3 |
| 6 | Input/Output | OUTPUT Total, " ", Count | 7 |
| 7 | Terminator | STOP | |

Trace it with the inputs 6, 9, 4, -1.

| Number | Total | Count | OUTPUT |
|:-:|:-:|:-:|:-:|
|  | 0 | 0 |  |
| 6 |  |  |  |
|  | 6 | 1 |  |
| 9 |  |  |  |
|  | 15 | 2 |  |
| 4 |  |  |  |
|  | 19 | 3 |  |
| -1 |  |  |  |
|  |  |  | 19 3 |

1. Box 5's arrow returns to box 3, so boxes 3, 4 and 5 form the loop.
2. The decision is tested straight after each input, before the number is added, so -1 is never added to the total.
3. Because the test comes before the processing, this is a pre-condition loop. In pseudocode:

```
Total ← 0
Count ← 0
INPUT Number
WHILE Number <> -1 DO
    Total ← Total + Number
    Count ← Count + 1
    INPUT Number
ENDWHILE
OUTPUT Total, " ", Count
```

Notice how the flowchart's single `INPUT` box becomes **two** `INPUT` statements in the `WHILE` version: one before the loop and one at the end of the loop body.
:::

## Converting between flowcharts and pseudocode

| Flowchart | Pseudocode |
|:--|:--|
| Terminator START / STOP | Beginning and end of the algorithm (nothing needs to be written) |
| Process box | Assignment with `←` |
| Input/Output box | `INPUT` or `OUTPUT` |
| Decision with two paths that join again | `IF … THEN … ELSE … ENDIF` (or `CASE` for several values) |
| Decision before the repeated boxes, with a flow line back up | `WHILE … DO … ENDWHILE` |
| Decision after the repeated boxes, with a flow line back up | `REPEAT … UNTIL` |
| Subroutine box | `CALL` a procedure, or use a function in an expression |

When going from pseudocode to a flowchart, take each statement in turn, choose its shape, and number the boxes. For a `FOR` loop, use a process box to set the counter, a decision box to test it, and a process box to add 1 to it before the arrow loops back.

:::example{title="A count-controlled loop as a flowchart"}
The pseudocode `FOR Row ← 1 TO 4` … `OUTPUT Row * 5` … `NEXT Row` becomes:

| Box | Shape | Text | Next |
|:-:|:--|:--|:--|
| 1 | Terminator | START | 2 |
| 2 | Process | Row ← 1 | 3 |
| 3 | Decision | Row > 4? | Yes → 6, No → 4 |
| 4 | Input/Output | OUTPUT Row * 5 | 5 |
| 5 | Process | Row ← Row + 1 | 3 |
| 6 | Terminator | STOP | |

It outputs 5, 10, 15 and 20, then stops when `Row` reaches 5.
:::

## Common mistakes

:::mistake{title="Using a process box for input or output"}
`INPUT` and `OUTPUT` always go in the parallelogram (input/output) shape; the rectangle is for calculations and assignments. Mixing them up loses marks when you name or describe the shapes.
:::

:::mistake{title="Unlabelled decision exits"}
Every decision has exactly two exits, and each must be labelled Yes or No (True or False). An unlabelled exit makes the flowchart ambiguous.
:::

:::mistake{title="Looping back to the wrong box"}
In a loop that inputs values, the arrow must go back to the `INPUT` box, not to the box that sets the total to 0, or the total is reset each time round.
:::

## Exam tips

:::exam-tip
When asked to follow a flowchart, write down each box number as you pass through it and keep a trace table of the variables. Check every comparison carefully at its boundary (`<` versus `<=`).
:::

:::exam-tip
When converting a flowchart to pseudocode, first look for flow lines that go **back up**: they mark the loops. Then look for decision boxes whose paths rejoin: they mark the `IF` statements.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards use the same basic shapes. Cambridge 0478 lists exactly six symbols: flow line, process, subroutine, input/output, decision and terminator. ZIMSEC also asks for system flowcharts in systems analysis, which use extra symbols for files and documents; those belong to the system design lesson.
:::

## Summary

:::summary
- A flowchart shows an algorithm with standard shapes joined by flow lines.
- Terminator: start/stop. Process: calculation or assignment. Input/Output: parallelogram. Decision: diamond with Yes and No exits. Subroutine: rectangle with double side lines.
- Selection: a decision whose two paths rejoin. Loop: a flow line back to an earlier box; test before the body is like `WHILE`, after is like `REPEAT … UNTIL`.
- Follow a flowchart box by box, recording variables in a trace table.
- Convert by matching each shape to its pseudocode statement.
:::
