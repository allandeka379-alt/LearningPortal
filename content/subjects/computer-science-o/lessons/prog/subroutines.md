---
{
  "key": "prog.subroutines",
  "title": "Procedures, functions, parameters and scope",
  "summary": "Why programs are split into subroutines; defining and calling procedures and functions with and without parameters; returning a value from a function; and the difference between local and global variables.",
  "concepts": ["comp.prog.subroutines"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

The results program at a secondary school in Mutare has to work out a learner's grade from a mark in four places: on the report card, on the class list, on the parents' summary and on the end-of-year certificate. If the grade calculation were copied into all four places and the grade boundaries changed, someone would have to find and edit every copy, and missing one would put the wrong grade on a certificate.

The solution is to write the calculation **once**, give it a name, and use that name wherever it is needed. A named block of code like this is a **subroutine**. Subroutines are how real programs are built: every library routine you use, such as `ROUND` or `LENGTH`, is a subroutine someone else wrote. Both boards expect you to define and call your own procedures and functions, pass values to them through parameters, and explain the difference between local and global variables.

## Key definitions

:::definition{term="Subroutine"}
A named, self-contained block of code that performs a specific task and can be called from other parts of a program whenever it is needed.
:::

:::definition{term="Procedure"}
A subroutine that carries out a task but does not return a value to the point where it was called; it is run with a CALL statement.
:::

:::definition{term="Function"}
A subroutine that returns a single value to the point where it was called, so it is used as part of an expression.
:::

:::definition{term="Parameter"}
A variable listed in a subroutine's definition that receives a value passed to the subroutine when it is called.
:::

:::definition{term="Local variable"}
A variable declared inside a subroutine; it can only be used inside that subroutine and exists only while it runs.
:::

:::definition{term="Global variable"}
A variable declared in the main program, outside any subroutine, that can be used anywhere in the program.
:::

## Procedures

A procedure is defined once, before it is used, and run with `CALL`:

```
PROCEDURE ShowLine
    OUTPUT "------------------------------"
ENDPROCEDURE

PROCEDURE Greet(LearnerName : STRING, Form : INTEGER)
    OUTPUT "Welcome, ", LearnerName
    OUTPUT "You are in Form ", Form
ENDPROCEDURE

CALL ShowLine
CALL Greet("Chipo", 3)
CALL ShowLine
```

When `CALL Greet("Chipo", 3)` runs, control jumps to the procedure, `LearnerName` receives `"Chipo"` and `Form` receives 3, the statements run, and control returns to the line after the call. The values in the call (sometimes called **arguments**) must match the parameters in number, order and data type. In 0478 pseudocode a subroutine has at most three parameters.

## Functions

A function's header states the data type of the value it returns, and its body contains a `RETURN` statement:

```
FUNCTION Area(Length : REAL, Width : REAL) RETURNS REAL
    RETURN Length * Width
ENDFUNCTION
```

A function call is **not** a complete statement. It stands for a value, so it is used inside an expression, an assignment or an output, and it is never preceded by `CALL`:

```
RoomArea ← Area(6, 3.5)
OUTPUT "Total floor area: ", Area(6, 3.5) + Area(2.5, 4)
```

:::worked-solution[Evaluating function calls]
Using the function `Area` above, what does the OUTPUT statement display?

1. `Area(6, 3.5)`: `Length` receives 6, `Width` receives 3.5; the function returns 6 × 3.5 = 21.
2. `Area(2.5, 4)`: the function returns 2.5 × 4 = 10.
3. Each returned value replaces its call in the expression: 21 + 10 = 31.
4. The output is `Total floor area: 31`.
:::

| | Procedure | Function |
|:--|:--|:--|
| Returns a value? | No | Yes, exactly one |
| Header | `PROCEDURE Name(…)` | `FUNCTION Name(…) RETURNS type` |
| Called by | `CALL Name(…)` as a statement | using `Name(…)` inside an expression |
| Typical use | output a report, draw a menu, update a file | calculate a value, check a condition (return TRUE or FALSE) |

## Local and global variables

The **scope** of a variable is the part of the program where it can be used. A variable declared inside a subroutine is **local**: it is created when the subroutine starts and lost when it ends, and the main program cannot see it. A variable declared in the main program is **global** and can be used everywhere, including inside subroutines.

:::worked-solution[Tracing a procedure with local and global variables]
```
DECLARE Count : INTEGER
PROCEDURE ShowStars(Number : INTEGER)
    DECLARE Index : INTEGER
    FOR Index ← 1 TO Number
        OUTPUT "*"
    NEXT Index
    Count ← Count + Number
ENDPROCEDURE

Count ← 0
CALL ShowStars(3)
CALL ShowStars(2)
OUTPUT Count
```

| Count | Number | Index | OUTPUT |
|:-:|:-:|:-:|:-:|
| 0 |  |  |  |
|  | 3 |  |  |
|  |  | 1 | * |
|  |  | 2 | * |
|  |  | 3 | * |
| 3 |  |  |  |
|  | 2 |  |  |
|  |  | 1 | * |
|  |  | 2 | * |
| 5 |  |  |  |
|  |  |  | 5 |

1. `Count` is global, so the procedure can update it and the main program sees the new value.
2. `Index` and the parameter `Number` are local: they exist only during each call. `Index` restarts from 1 on the second call.
3. Five stars are output, then 5.
:::

Using global variables inside subroutines is allowed, but it makes programs harder to test and reuse: a subroutine that changes a global can have effects far away from where it is called. Good practice is to pass data in through parameters, return results from functions, and keep working variables local. Then each subroutine can be tested on its own and moved to another program without changes.

## Why use subroutines?

- **Reuse**: code written once can be called many times, so programs are shorter.
- **Maintenance**: a change, such as new grade boundaries, is made in one place.
- **Decomposition**: a big problem is split into small, named tasks that are easier to understand.
- **Testing**: each subroutine can be tested separately before the parts are joined.
- **Teamwork**: different programmers can write different subroutines at the same time.

:::example{title="A validation function inside a loop"}
Rudo writes a function that checks a mark, then uses it to validate input.

```
FUNCTION IsValidMark(Mark : INTEGER) RETURNS BOOLEAN
    IF Mark >= 0 AND Mark <= 100
        THEN
            RETURN TRUE
        ELSE
            RETURN FALSE
    ENDIF
ENDFUNCTION

REPEAT
    OUTPUT "Enter a mark (0 to 100)"
    INPUT TestMark
UNTIL IsValidMark(TestMark)
```

Because the function returns a BOOLEAN, its call can be used directly as the UNTIL condition. The same function can check marks in any other part of the program.
:::

## Common mistakes

:::mistake{title="Using CALL with a function"}
`CALL Area(6, 3.5)` throws the returned value away. A function is used in an expression: `Result ← Area(6, 3.5)` or `OUTPUT Area(6, 3.5)`.
:::

:::mistake{title="Outputting instead of returning"}
A function that should calculate a value must `RETURN` it. A function that only outputs the answer cannot be used in a further calculation.
:::

:::mistake{title="Using a local variable outside its subroutine"}
A variable declared inside a procedure does not exist in the main program. Return the value from a function, or pass it back another way.
:::

:::mistake{title="Arguments in the wrong order"}
`CALL Greet(3, "Chipo")` passes 3 to `LearnerName` and `"Chipo"` to `Form`. Arguments are matched to parameters by position.
:::

## Exam tips

:::exam-tip
When asked to *explain* the difference between a procedure and a function, the key point is that a function **returns a value** to the calling expression and a procedure does not. Add how each is called for a second mark.
:::

:::exam-tip
In a written answer, put subroutine definitions before the main program, give every parameter a data type, and give each function a RETURNS type and a RETURN statement.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC Form 2 asks learners to develop programs using functions, and Form 3 to declare functions in interface design; in Visual Basic these are `Sub` and `Function`, and in Python both are written with `def`, a function using `return`. Cambridge 0478 uses PROCEDURE and FUNCTION in pseudocode, with up to three parameters, and asks about local and global variables.
:::

## Summary

:::summary
- A subroutine is a named block of code that can be called whenever it is needed.
- A procedure performs a task and is run with `CALL`; a function returns one value and is used inside an expression.
- Parameters receive values passed in the call, matched by position and data type (at most three in 0478).
- Local variables exist only inside their subroutine; global variables can be used anywhere.
- Subroutines make programs shorter, easier to read, test and maintain, and let teams share the work.
:::
