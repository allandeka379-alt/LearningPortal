---
{
  "key": "algorithms.algorithm-basics",
  "title": "Algorithms and the sequence construct",
  "summary": "What an algorithm is and why programmers write algorithms before code; the sequence construct; input, output, assignment and arithmetic in pseudocode; and how to state the purpose of a given algorithm and describe its processes.",
  "concepts": ["comp.algorithms.algorithm-basics"],
  "estimatedMinutes": 40,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

When you give a visitor directions to your house in Masvingo, you list steps in order: "Take the Beitbridge road, turn left at the service station, go past the clinic, the house with the green gate is on the right." If you swap two steps or leave one out, the visitor gets lost. A computer is like a visitor who follows instructions exactly and has no common sense, so its instructions must be complete, precise and in the right order.

A set of instructions like this is called an **algorithm**. Every program starts as an algorithm. Both ZIMSEC and Cambridge expect you to define an algorithm, to write simple algorithms in pseudocode, to dry-run them, and (in Cambridge Paper 2) to **state the purpose** of an algorithm you are given and **describe its processes**.

## Key definitions

:::definition{term="Algorithm"}
A finite sequence of precise, ordered steps that solves a problem or carries out a task.
:::

:::definition{term="Sequence"}
The programming construct in which statements are carried out one after another, in the order in which they are written.
:::

:::definition{term="Pseudocode"}
A structured, language-independent way of writing an algorithm using keywords such as `INPUT`, `OUTPUT`, `IF` and `WHILE`; it cannot be run directly by a computer.
:::

:::definition{term="Variable"}
A named storage location in memory whose value can change while the program runs.
:::

## What makes a good algorithm

A good algorithm:

- has a clear **start** and **end** (it is finite: it always finishes);
- has steps that are **precise** and **unambiguous**, so there is only one way to understand each one;
- has steps in the **correct order**;
- states its **inputs** and produces the required **outputs**.

"Add a little salt" is not a precise step; "add 5 g of salt" is. In the same way, Cambridge requires precise conditions: `Mark > 50` is acceptable but "mark is more than fifty" is not.

## Why write algorithms first?

Programmers design an algorithm before coding because:

- it lets them concentrate on the **logic** of the solution without worrying about the rules of one programming language;
- it can be **checked by dry-running** with test data, finding logic errors before any code exists;
- it can be **shared**: another programmer can code it in Python, Visual Basic or Java;
- it documents how the program works for anyone who maintains it later.

Algorithms can be written as **pseudocode**, drawn as **flowcharts**, or shown at a higher level as **structure diagrams**. All three are design tools.

## The sequence construct

Every algorithm is built from three constructs: **sequence**, **selection** (making decisions with `IF` and `CASE`) and **iteration** (repeating with loops). Sequence is the simplest: the computer carries out each statement once, from top to bottom.

The basic statements in a sequence are:

| Statement | Pseudocode | Meaning |
|:--|:--|:--|
| Input | `INPUT Age` | Take a value from the user and store it in `Age` |
| Output | `OUTPUT "Your age is ", Age` | Display text and values; commas join the items |
| Assignment | `Total ← Price * Quantity` | Work out the right-hand side and store it in `Total` |
| Declaration | `DECLARE Age : INTEGER` | Name a variable and its data type |
| Constant | `CONSTANT VatRate ← 0.15` | A named value that cannot change while the program runs |

The arithmetic operators are `+`, `-`, `*`, `/` and `^` (power). Two library routines are very useful for whole numbers: `DIV(a, b)` gives the whole-number part of `a ÷ b`, and `MOD(a, b)` gives the remainder. For example, `DIV(17, 5)` is 3 and `MOD(17, 5)` is 2.

Because the statements run in order, **the order matters**. A value must be input or assigned before it is used, and a result can only be output after it has been calculated.

:::worked-solution[Dry-running a sequence algorithm]
A kombi company wants journey times shown in hours and minutes.

```
OUTPUT "Enter the journey time in minutes"
INPUT TotalMinutes
Hours ← DIV(TotalMinutes, 60)
Minutes ← MOD(TotalMinutes, 60)
OUTPUT TotalMinutes, " minutes is ", Hours, " hours and ", Minutes, " minutes"
```

Dry-run it with the input 195.

| TotalMinutes | Hours | Minutes | OUTPUT |
|:-:|:-:|:-:|:-:|
|  |  |  | Enter the journey time in minutes |
| 195 |  |  |  |
|  | 3 |  |  |
|  |  | 15 |  |
|  |  |  | 195 minutes is 3 hours and 15 minutes |

1. The prompt is output first (prompts belong in the OUTPUT column).
2. 195 is stored in `TotalMinutes`.
3. `DIV(195, 60)` = 3, because 3 × 60 = 180 is the largest multiple of 60 not above 195.
4. `MOD(195, 60)` = 195 − 180 = 15.
5. The final output joins the text and the three values.
:::

## Stating the purpose and describing the processes

Cambridge often gives you an algorithm and asks two different things:

- **State the purpose**: what the algorithm is for, in one sentence ("to convert a journey time in minutes into hours and minutes").
- **Describe the processes**: what it does step by step ("it inputs the time in minutes, divides by 60 to find the whole hours, finds the remainder to give the minutes left over, and outputs both").

A good method is to dry-run the algorithm with simple values and look at what comes out.

:::worked-solution[Finding the purpose of an algorithm]
State the purpose of this algorithm.

```
INPUT First
INPUT Second
Temp ← First
First ← Second
Second ← Temp
OUTPUT First, " ", Second
```

Dry-run it with the inputs 8 and 3.

| First | Second | Temp | OUTPUT |
|:-:|:-:|:-:|:-:|
| 8 |  |  |  |
|  | 3 |  |  |
|  |  | 8 |  |
| 3 |  |  |  |
|  | 8 |  |  |
|  |  |  | 3 8 |

1. The values went in as 8 and 3 and came out as 3 and 8.
2. Purpose: to **swap** the values of two variables (and output them).
3. The processes: the first value is copied into `Temp` so it is not lost; `First` takes the second value; `Second` takes the saved value from `Temp`.
4. Without `Temp`, `First ← Second` would overwrite the 8 before it was saved, and both variables would end up as 3.
:::

## Writing a sequence algorithm

When you write an algorithm, follow the order **input, process, output**, and include a prompt before each input.

:::example{title="Average of three test marks"}
Nyasha wants to input three test marks and output their average to one decimal place.

```
DECLARE Mark1 : INTEGER
DECLARE Mark2 : INTEGER
DECLARE Mark3 : INTEGER
DECLARE Average : REAL
OUTPUT "Enter the first mark"
INPUT Mark1
OUTPUT "Enter the second mark"
INPUT Mark2
OUTPUT "Enter the third mark"
INPUT Mark3
Average ← ROUND((Mark1 + Mark2 + Mark3) / 3, 1)
OUTPUT "The average mark is ", Average
```

With the marks 64, 71 and 58 the total is 193 and the output is "The average mark is 64.3". Note the brackets: `Mark1 + Mark2 + Mark3 / 3` would divide only `Mark3` by 3.
:::

## Common mistakes

:::mistake{title="Using a value before it has been input"}
If `Area ← Length * Width` comes before `INPUT Width`, the calculation uses a value that does not exist yet. In a sequence, every value must be set before the line that uses it.
:::

:::mistake{title="Writing = for assignment"}
In pseudocode, assignment uses the arrow: `Total ← Total + Price`. The `=` sign is used only to compare values, as in `IF Answer = "Y"`.
:::

:::mistake{title="Restating the code as the purpose"}
"It inputs two numbers and does Temp ← First" is a description of lines, not a purpose. The purpose is the job it does: "it swaps two values".
:::

## Exam tips

:::exam-tip
For "state the purpose", give the job in one sentence. For "describe the processes", give each step in order, in words, and mention inputs and outputs.
:::

:::exam-tip
In an algorithm you write, include a meaningful prompt before each `INPUT` and a message with each result you `OUTPUT`. Use meaningful variable names such as `TotalMinutes`, not `x`.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC introduces algorithms and the sequence construct in Form 1, including dry-running a sequence. Cambridge expects the same, using the 0478 pseudocode conventions (`←` for assignment, `DIV` and `MOD` written as functions), which this course uses for both boards.
:::

## Summary

:::summary
- An algorithm is a finite sequence of precise, ordered steps that solves a problem.
- Algorithms are designed before coding so the logic can be checked and shared; they are written as pseudocode, flowcharts or structure diagrams.
- Sequence: statements run once each, in order; the order matters.
- Basic statements: `INPUT`, `OUTPUT`, assignment `←`, `DECLARE`, `CONSTANT`; `DIV` gives the whole-number quotient and `MOD` the remainder.
- The purpose is the job an algorithm does; the processes are the steps it takes. Dry-run with simple values to find both.
:::
