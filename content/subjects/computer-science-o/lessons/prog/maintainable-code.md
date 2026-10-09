---
{
  "key": "prog.maintainable-code",
  "title": "Writing maintainable programs",
  "summary": "Techniques that make a program easy to read, test and update: meaningful identifiers, comments, indentation and white space, constants instead of unexplained values, subroutines, and a clear program structure.",
  "concepts": ["comp.prog.maintainable-code"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

Two years ago a Form 4 learner wrote a program for the school tuck shop in Bulawayo. It works, but the learner has left, the prices have changed and the shop now wants a weekly report. The new programmer opens the code and finds variables called `a`, `b` and `x2`, numbers such as `0.1` and `40` scattered through it with no explanation, and not a single comment. Changing one price means hunting through the whole program and hoping nothing breaks.

Programs are read and changed far more often than they are written. A **maintainable** program is one that another programmer (or you, six months later) can understand, test and update quickly and safely. Cambridge 0478 asks you to create maintainable programs and to *explain* how particular features help; ZIMSEC asks you to understand the structure of a program and to document it. Examiners also expect your own answers to use these habits.

## Key definitions

:::definition{term="Maintainable program"}
A program written so that it is easy for other programmers to read, understand, correct and update.
:::

:::definition{term="Meaningful identifier"}
A name for a variable, constant, array, procedure or function that describes what it holds or does, such as `TotalSales` or `CalculateGrade`.
:::

:::definition{term="Comment"}
Text in a program that explains the code to a human reader and is ignored by the computer; in pseudocode it starts with `//`.
:::

## Meaningful identifiers

Compare `t ← p * q` with `TotalCost ← UnitPrice * Quantity`. Both work, but only the second explains itself. A good identifier:

- describes the data or the task (`NumberOfLearners`, `PrintReceipt`, `IsValidMark`);
- follows the same style throughout (PascalCase in 0478 pseudocode);
- is not so long that it becomes hard to type and read;
- is not a keyword and does not mislead (a variable called `Total` should hold a total).

Single letters are acceptable only where they are a well-known convention, such as `i` and `j` for array indexes in short loops, or `X` and `Y` for coordinates. Functions that return TRUE or FALSE are often named as questions: `IsLeapYear`, `HasPaid`.

## Comments

A comment explains **why** code does something or **what** a section is for, in language a reader understands. Useful places for comments:

- at the top of the program: its purpose, author and date;
- before each subroutine: what it does, its parameters and what it returns;
- before a difficult section: the method being used.

```
// Calculates the commission earned by a salesperson this week.
// Only sales above the threshold earn commission.
```

A comment that only repeats the code, such as `Count ← Count + 1 // add 1 to Count`, adds nothing. A comment that is out of date is worse than none, so update comments when you change code.

## Layout: indentation and white space

Indentation shows which statements belong inside a loop, an IF or a subroutine. In 0478 pseudocode each level is indented by four spaces. Blank lines between sections (declarations, subroutines, the main program) let a reader see the structure at a glance. Badly indented code can hide errors, such as a statement that looks as if it is inside a loop but is not.

## Constants instead of unexplained values

A number typed directly into code, such as `0.1` or `40`, is sometimes called a "magic number": the reader cannot tell what it means, and if it appears in several places, every copy must be found and changed. Declaring it once as a constant, `CONSTANT CommissionRate ← 0.1`, gives it a name and a single place to update.

## Subroutines and structure

Splitting a program into procedures and functions, each with one clear task and a meaningful name, makes the main program read almost like a plan:

```
CALL ShowMenu
Choice ← GetValidChoice()
CALL ProcessChoice(Choice)
```

Each subroutine can be tested on its own, and a change to one task is made in one place. A well-structured program usually has the same order: comments describing the program, constants, global declarations, subroutine definitions, then the main program.

:::worked-solution[Improving a poorly written algorithm]
This algorithm works out a salesperson's commission on five sales: 10% of every sale over 40 dollars.

```
a ← 0
FOR b ← 1 TO 5
INPUT c
IF c > 40
THEN
a ← a + c * 0.1
ENDIF
NEXT b
OUTPUT a
```

The same algorithm, rewritten to be maintainable:

```
// Commission on a week's sales: CommissionRate of each sale over Threshold
CONSTANT Threshold ← 40
CONSTANT CommissionRate ← 0.1
CONSTANT NumberOfSales ← 5
DECLARE Commission : REAL
DECLARE SaleValue : REAL
DECLARE SaleNumber : INTEGER

Commission ← 0
FOR SaleNumber ← 1 TO NumberOfSales
    OUTPUT "Enter value of sale ", SaleNumber
    INPUT SaleValue
    IF SaleValue > Threshold
        THEN
            Commission ← Commission + SaleValue * CommissionRate
    ENDIF
NEXT SaleNumber
OUTPUT "Commission earned: ", Commission
```

1. **Identifiers**: `a`, `b` and `c` became `Commission`, `SaleNumber` and `SaleValue`.
2. **Constants**: 40, 0.1 and 5 are named, so a new rate or threshold is a one-line change.
3. **Comments and prompts**: the purpose is stated, and the user is told what to type.
4. **Indentation**: the body of the loop and of the IF are clearly visible.
5. **Same behaviour**: with sales of 60, 30, 120, 50 and 40, both versions output 23. Only 60, 120 and 50 are over 40 (40 itself is not), giving 6 + 12 + 5. Improving maintainability must never change what the program does.
:::

:::example{title="Explaining a feature in an exam answer"}
Question: *Explain how the use of a constant for the VAT rate makes this program easier to maintain.*

A strong answer links the feature to a maintenance task: "The rate is stored in one place, so if the government changes it, the programmer edits only the constant declaration and every calculation that uses it is updated. The name also tells a reader what the value means, and it cannot be changed by mistake while the program runs."
:::

## Common mistakes

:::mistake{title="Comments that repeat the code"}
`Total ← Total + Price // adds Price to Total` explains nothing new. Comment on purpose and method instead.
:::

:::mistake{title="Single-letter and misleading names"}
`x`, `temp2` or `data` tell the reader nothing; a variable called `Average` that holds a total actively misleads.
:::

:::mistake{title="Repeating the same value or code"}
The same number typed in five places, or the same ten lines copied three times, means five or three edits for every change. Use a constant or a subroutine.
:::

## Exam tips

:::exam-tip
"Explain how the program has been made easier to maintain" usually earns marks for **naming the feature and saying how it helps**: meaningful identifiers (code is self-explanatory), comments (purpose is explained), constants (one place to change), subroutines (reuse and separate testing), indentation (structure is visible).
:::

:::exam-tip
Use meaningful names in every algorithm you write, even short ones. In the 15-mark scenario question, clear identifiers and comments help the examiner follow your logic and find the creditworthy steps.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge 0478 objective 8.1.8 asks for maintainable programs with meaningful identifiers, comments, procedures and functions. ZIMSEC Form 1 covers the structure of a program and its syntax and semantics, and ZIMSEC projects are expected to include documented, readable code.
:::

## Summary

:::summary
- Maintainable programs are easy for others to read, test and update.
- Use meaningful identifiers for variables, constants, arrays, procedures and functions.
- Comment the purpose of the program, each subroutine and any difficult method, not the obvious.
- Indent consistently and use blank lines to show structure.
- Replace unexplained values with named constants and repeated code with subroutines; behaviour must stay the same.
:::
