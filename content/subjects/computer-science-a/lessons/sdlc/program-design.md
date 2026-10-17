---
{
  "key": "sdlc.program-design",
  "title": "Program design: structure charts and state-transition diagrams",
  "summary": "Breaking a problem into modules with a structure chart that shows the parameters passed between them, turning a structure chart into pseudocode procedures and functions, and documenting the behaviour of a system with a state-transition table.",
  "concepts": ["acs.sdlc.program-design"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

A teacher in Bulawayo wants a program that reads five test marks, finds the average and the highest mark and prints them. This is small enough to write in one go. Imagine instead a program with 50 000 lines for a bank. Nobody can write that without first breaking it into small parts that can be written, tested and understood one at a time.

This process, called **top-down design** or **stepwise refinement**, is the heart of the design stage of the program development life cycle. This lesson shows two ways of documenting a design: a **structure chart**, which shows the modules of a program and the data passed between them, and a **state-transition diagram** (here written as a table), which shows how a system moves between states.

You should know how to write procedures and functions with parameters in pseudocode (the programming topic covers this in detail) and what a trace table is.

## Key definitions

:::definition{term="Module"}
A self-contained part of a program that does one task, written as a procedure or a function.
:::

:::definition{term="Structure chart"}
A diagram that shows how a program is divided into modules, which module calls which, and the parameters passed between them.
:::

:::definition{term="State-transition diagram"}
A diagram or table that shows the states a system can be in, the inputs or events that cause it to move from one state to another, and any output.
:::

## Top-down design and structure charts

In **top-down design** the problem is first stated as one task, which is then broken into sub-tasks, and each sub-task is broken further until each piece is simple enough to code directly. The result is drawn as a **structure chart**.

In a structure chart:

- each **module** is a rectangle with its name, and the top rectangle is the main program;
- a line joins a module to each module it **calls**, and the modules are read from top to bottom and, at the same level, from left to right as the order of calls;
- an arrow with a label beside a line shows a **parameter**: an arrow pointing **down** shows data passed **into** the called module; an arrow pointing **up** shows data **returned** by it;
- a diamond on a line shows **selection** (the module is called only if a condition is true), and a curved arrow around a line shows **iteration** (the module is called repeatedly).

The chart is described in this course as a table, one row for each module.

| Module | Calls | Data passed to the module | Data returned |
|:-:|:-:|:-:|:-:|
| Main | InputMarks, FindAverage, FindHighest, OutputResults | none | none |
| InputMarks | none | none | Marks |
| FindAverage | none | Marks | Average |
| FindHighest | none | Marks | Highest |
| OutputResults | none | Average, Highest | none |

Reading the table: the main program calls four modules. `InputMarks` is passed nothing and returns the array of five marks. `FindAverage` and `FindHighest` are each passed the array and return a single value. `OutputResults` is passed the two results and returns nothing.

Why use a structure chart?

- Each module has a clear job and can be given to a different programmer.
- Modules can be tested separately.
- The same module can be reused.
- The data each module needs, and what it gives back, is visible before any code is written.

## From structure chart to pseudocode

Each module becomes a **procedure** (it does something, with no value returned) or a **function** (it returns one value). A parameter passed into a module is a `BYVAL` parameter, or an input to a function; a value returned by a procedure is passed `BYREF`. The main program calls the modules in order.

```
DECLARE ClassMarks : ARRAY[1:5] OF INTEGER
DECLARE Average, Highest : REAL

PROCEDURE InputMarks(BYREF Marks : ARRAY[1:5] OF INTEGER)
    DECLARE Index : INTEGER
    FOR Index ← 1 TO 5
        INPUT Marks[Index]
    NEXT Index
ENDPROCEDURE

FUNCTION FindAverage(Marks : ARRAY[1:5] OF INTEGER) RETURNS REAL
    DECLARE Total : INTEGER
    DECLARE Index : INTEGER
    Total ← 0
    FOR Index ← 1 TO 5
        Total ← Total + Marks[Index]
    NEXT Index
    RETURN Total / 5
ENDFUNCTION

FUNCTION FindHighest(Marks : ARRAY[1:5] OF INTEGER) RETURNS INTEGER
    DECLARE Best : INTEGER
    DECLARE Index : INTEGER
    Best ← Marks[1]
    FOR Index ← 2 TO 5
        IF Marks[Index] > Best THEN
            Best ← Marks[Index]
        ENDIF
    NEXT Index
    RETURN Best
ENDFUNCTION

PROCEDURE OutputResults(Average : REAL, Highest : INTEGER)
    OUTPUT "Average mark: ", Average
    OUTPUT "Highest mark: ", Highest
ENDPROCEDURE

// main program
CALL InputMarks(ClassMarks)
Average ← FindAverage(ClassMarks)
Highest ← FindHighest(ClassMarks)
CALL OutputResults(Average, Highest)
```

The same algorithm is translated to Python, and run with the marks 54, 71, 38, 90 and 65.

```python
marks = [54, 71, 38, 90, 65]

def find_average(marks):
    total = 0
    for m in marks:
        total = total + m
    return total / 5

def find_highest(marks):
    best = marks[0]
    for m in marks[1:]:
        if m > best:
            best = m
    return best

print("Average mark:", find_average(marks))
print("Highest mark:", find_highest(marks))
```

```
Average mark: 63.6
Highest mark: 90
```

:::worked-solution{title="Checking the result by hand"}
1. The total of the marks is 54 + 71 + 38 + 90 + 65 = 318.
2. The average is 318 ÷ 5 = 63.6, as printed.
3. `FindHighest` starts with 54, replaces it with 71, keeps 71 against 38, replaces it with 90, and keeps 90 against 65. The highest mark is 90, as printed.
:::

## State-transition diagrams and tables

Some systems depend on what has happened before. A mobile money wallet that blocks the account after three wrong PINs has to remember how many wrong attempts there have been. This memory is the **state**. A state-transition diagram shows each state as a circle, each transition as an arrow labelled with the input (and any output) that causes it. A **state-transition table** gives the same information in rows.

| Current state | Input: correct PIN | Input: wrong PIN |
|:-:|:-:|:-:|
| Start | Menu | OneWrong |
| OneWrong | Menu | TwoWrong |
| TwoWrong | Menu | Blocked |
| Blocked | Blocked | Blocked |
| Menu | Menu | Menu |

In the table, `Start` is the state before any attempt. The state `Menu` is where the user has entered the correct PIN, and `Blocked` is the state after three wrong PINs. Both end states stay in the same state whatever is entered next.

![State-transition diagram for a wallet PIN: from Start, OneWrong and TwoWrong a wrong PIN moves to the next state and three wrong PINs reach Blocked; a correct PIN from any of those three states goes to Menu; Blocked and Menu stay in the same state for any input](media:diagrams/sdlc-state-transition-pin.png "Figure: states and transitions for the three-wrong-PINs rule")

:::worked-solution{title="Tracing two sequences of inputs"}
Sequence 1: wrong, wrong, correct.

| Step | State before | Input | State after |
|:-:|:-:|:-:|:-:|
| 1 | Start | wrong | OneWrong |
| 2 | OneWrong | wrong | TwoWrong |
| 3 | TwoWrong | correct | Menu |

The final state is Menu: the third attempt was correct, so the user reaches the menu.

Sequence 2: wrong, wrong, wrong.

| Step | State before | Input | State after |
|:-:|:-:|:-:|:-:|
| 1 | Start | wrong | OneWrong |
| 2 | OneWrong | wrong | TwoWrong |
| 3 | TwoWrong | wrong | Blocked |

The final state is Blocked: after three wrong PINs the account is blocked.
:::

A state-transition table can be turned into code: a variable holds the current state, and a `CASE` statement or nested `IF` chooses the next state from the current state and the input.

:::keyfact{title="Cambridge only"}
This lesson is Cambridge only (AS Level, topic 12). Structure charts with parameters, deriving pseudocode from a structure chart, and state-transition diagrams or tables are examined in Paper 2 and Paper 1. ZIMSEC uses flowcharts and pseudocode for program design but does not set structure charts or state-transition diagrams.
:::

## Common mistakes

:::mistake{title="Putting loops and decisions in a structure chart as if it were a flowchart"}
A structure chart shows which modules exist and the data passed, not the order of every step. The detail of the algorithm is in each module.
:::

:::mistake{title="Reversing the parameter arrows"}
Data passed **into** a module goes down; data **returned** goes up. Read the label and the direction together.
:::

:::mistake{title="Missing a state in a transition table"}
Every state needs a next state for **every** possible input. A row with a missing entry is an incomplete design.
:::

:::mistake{title="Making a module do several jobs"}
If a module is named "InputAndAverage" it is doing two tasks. Split it so each module has a single clear purpose.
:::

## Exam tips

:::exam-tip
Appears in Cambridge Paper 1 and Paper 2. "**Complete** the structure chart" asks for the module names and the parameters on each line. "**Write** pseudocode for the structure chart" needs one procedure or function for each module with the parameters shown. A "**state-transition**" question is answered by following the inputs one at a time and writing the state after each.
:::

:::exam-tip
In a trace of a state machine, write the state before, the input, and the state after, in a table. This avoids slips in the long sequences.
:::

## Summary

:::summary
- Top-down design breaks a problem into modules; a structure chart shows the modules, what calls what and the parameters passed.
- Arrows down show data passed in; arrows up show data returned; a diamond is selection and a curved arrow is iteration.
- Each module becomes a procedure (no value) or a function (one value) with the parameters shown on the structure chart.
- A state-transition table lists each state and the next state for every input; trace by following the inputs.
- Modules can be written, tested and reused separately.
:::
