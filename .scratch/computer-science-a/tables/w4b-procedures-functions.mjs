import { run, writeLesson, mdTable, codeBlock, py, same } from "./w4b-q.mjs";
import { Trace } from "./w4a-util.mjs";

// ---- function and procedure program (ticket machine)
const ticket = run(`def ticket_price(age):
    if age < 12:
        return 1.50
    elif age >= 60:
        return 1.50
    else:
        return 3.00

def print_ticket(name, price):
    print("Ticket for", name)
    print("Price:", price)

passenger = input()
age = int(input())
cost = ticket_price(age)
print_ticket(passenger, cost)`, "Rudo\n9");
same(ticket.out, "Ticket for Rudo\nPrice: 1.5");

// ---- BYVAL / BYREF trace in pseudocode, mirrored in JS
const tr = new Trace(["X", "Y", "A"]);
let X = 5, Y = 5;
tr.row({ X, Y });
let A = X, B = null; // B is a reference to Y
tr.row({ A });
A = A + 10;
tr.row({ A });
Y = Y + 10; // B refers to Y
tr.row({ Y });
same([X, Y], [5, 15]);
const byref = run(`def change(a, b_list):
    a = a + 10
    b_list[0] = b_list[0] + 10

x = 5
y = [5]
change(x, y)
print(x, y[0])`);
same(byref.out, "5 15");

// ---- function returning a value, with a call table
const avgDef = `def average(total, count):
    if count == 0:
        return 0
    return total / count
`;
const calls = [[90, 4], [50, 5], [0, 0], [7, 2]];
const callOut = py(`${avgDef}\nfor t, c in ${JSON.stringify(calls)}:\n    print(average(t, c))`).split("\n");
same(callOut, ["22.5", "10.0", "0", "3.5"]);
const callTable = mdTable(["Call", "total", "count", "Value returned"], calls.map(([t, c], i) => [`\`Average(${t}, ${c})\``, t, c, callOut[i]]));

// ---- recursion not here. Local/global with a counter
const scope = run(`visits = 0

def record_visit():
    global visits
    visits = visits + 1

record_visit()
record_visit()
record_visit()
print(visits)`);
same(scope.out, "3");

const body = `
## Introduction

When Tendai writes a program for a school tuck shop, the program needs to do many jobs: read the order, work out the price, print a receipt and update the stock. Writing everything as one long block makes the program hard to read, hard to test and impossible to reuse. Programmers break a problem into small named parts, called **subroutines**, each doing one job. In 9618-style pseudocode a subroutine is a **procedure** or a **function**.

This lesson covers defining and calling procedures and functions, parameters and arguments, the return value, passing by value and by reference, local and global variables, and when to use each kind of routine, in pseudocode and Python. You should know selection, iteration and scope from the previous lessons.

## Key definitions

:::definition{term="Procedure"}
A named block of statements that performs a task when it is called. A procedure does not return a value to the statement that calls it.
:::

:::definition{term="Function"}
A named block of statements that calculates and returns a single value to the place where it is called, so it can be used inside an expression. It ends by returning the value.
:::

:::definition{term="Parameter and argument"}
A parameter is a variable named in the header of a routine to receive data (also called a formal parameter). An argument is the actual value or variable supplied in the call (the actual parameter).
:::

:::definition{term="Pass by value"}
The routine receives a copy of the argument. Changing the parameter inside the routine does not change the original variable.
:::

:::definition{term="Pass by reference"}
The routine receives a reference to the original variable, so changing the parameter changes the original variable.
:::

## Defining and calling routines

The **header** (or interface) of a routine gives its name, its parameters with their types and, for a function, the type of the value it returns. The statements below it are the body.

${codeBlock(`PROCEDURE PrintTicket(Name : STRING, Price : REAL)
    OUTPUT "Ticket for ", Name
    OUTPUT "Price: ", Price
ENDPROCEDURE

FUNCTION TicketPrice(Age : INTEGER) RETURNS REAL
    IF Age < 12 OR Age >= 60 THEN
        RETURN 1.50
    ELSE
        RETURN 3.00
    ENDIF
ENDFUNCTION

CALL PrintTicket("Rudo", TicketPrice(9))`)}

A procedure is called with the keyword \`CALL\`; a function is called by using its name inside an expression, such as \`Cost ← TicketPrice(Age)\`, because it produces a value. In Python both are written with \`def\`; a function uses \`return\`, and a procedure is simply a \`def\` without a returned value.

:::worked-solution{title="A ticket program built from routines"}
The Python version of the ticket program was run with the inputs \`Rudo\` and \`9\`.

${ticket.code}

Output:

${ticket.outBlock}

The main program reads the data, calls the function \`ticket_price\` with the age as the argument and stores the value it returns in \`cost\`, then calls the procedure \`print_ticket\` with two arguments. The function does not output anything, and the procedure does not return anything: each routine has one job. The same function can be tested on its own and reused in another program.
:::

## Parameters and return values

The arguments in a call are matched to the parameters **by position**: the first argument goes to the first parameter. The number, order and types must match the header. A function returns exactly one value, and the type after \`RETURNS\` says what type. In the 9618 pseudocode guide the parameters of a function are passed by value, and \`BYREF\` is used with procedures when a routine must give results back through its parameters.

Here is a function called four times. Each row is a separate call and the values returned were computed by running the Python version:

${callTable}

The function guards against a count of 0 to avoid a division by zero. Designing a function so that it works for every valid input, including the extremes, is part of writing efficient code.

## Passing by value and by reference

By default a parameter is passed by value, which can be stated with \`BYVAL\`. A parameter passed by reference is marked \`BYREF\`.

${codeBlock(`PROCEDURE Change(BYVAL A : INTEGER, BYREF B : INTEGER)
    A ← A + 10
    B ← B + 10
ENDPROCEDURE

X ← 5
Y ← 5
CALL Change(X, Y)
OUTPUT X, " ", Y`)}

:::worked-solution{title="Tracing BYVAL and BYREF"}
In the call \`CALL Change(X, Y)\`, \`A\` receives a copy of \`X\`, while \`B\` is another name for \`Y\`. The trace table shows what happens (blank cells did not change):

${tr.md()}

When the procedure ends, \`A\` disappears with its change, so \`X\` is still 5. The change to \`B\` was made to \`Y\` itself, which is now 15. The output is **5 15**.

Python does not have BYREF for simple values: numbers and strings are immutable, so a routine cannot change the caller's variable. To give a result back, either return it, or pass a mutable object such as a list. The code below does the second, and was run to produce the output shown:

${byref.code}

Output:

${byref.outBlock}
:::

## Local and global variables in routines

A variable declared inside a routine is local and exists only while the routine runs; its name can be reused in another routine without any clash. Parameters are local to the routine. A global variable is available everywhere, but a routine that changes a global variable can cause errors that are hard to find, because any other part of the program might have changed it too. In Python, a routine that must change a global variable has to say so with the keyword \`global\`, as in this program that counts calls:

${scope.code}

Output:

${scope.outBlock}

Passing data through parameters and returning results is safer and makes a routine easier to test, so globals should be avoided where possible.

## Choosing a procedure or a function

Use a **function** when the routine's job is to produce one value, for example a price, an average or a Boolean test such as \`IsValid\`. Use a **procedure** when the job is an action: output a report, update a record, or produce several results through \`BYREF\` parameters. Good routines have one clear job, a name that says what it does, few parameters and no unexpected effects on other parts of the program. Breaking a program into routines makes it easier to share between programmers, to test one part at a time and to reuse code.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards expect procedures and functions with parameters in pseudocode and a high-level language (ZIMSEC Form 5; Cambridge AS Level, Papers 1 and 2). ZIMSEC words the topic as parameter passing by value and by reference and the use of local and global variables; Cambridge uses \`BYVAL\` and \`BYREF\` and the header/interface wording. The pseudocode forms are \`PROCEDURE Name(...)\` ... \`ENDPROCEDURE\`, \`FUNCTION Name(...) RETURNS Type\` ... \`ENDFUNCTION\` and \`CALL Name(...)\`.
:::

## Common mistakes

:::mistake{title="Forgetting to use the returned value"}
Calling \`ticket_price(9)\` on its own line calculates a value and throws it away. Store it in a variable or use it in an expression or output.
:::

:::mistake{title="Mixing up the order of arguments"}
Arguments are matched by position. \`PrintTicket(9, "Rudo")\` gives the age as the name and the name as the price.
:::

:::mistake{title="Expecting a BYVAL parameter to change the original"}
A routine that changes a value parameter changes only its own copy. Use \`BYREF\` (or return the value) to give a result back.
:::

:::mistake{title="Outputting inside a function instead of returning"}
A function that uses \`OUTPUT\` instead of \`RETURN\` gives no value to the calling expression. Return the value and let the caller decide what to do with it.
:::

## Exam tips

:::exam-tip
In ZIMSEC Paper 1 and Cambridge Paper 2, **state** the purpose of a routine from its header, **write** the header and body of a procedure or function, **trace** a call with BYVAL and BYREF parameters, and **explain** the benefits of using routines (reuse, easier testing and maintenance, teamwork). Write the complete header with the types, the matching end keyword, and \`RETURN\` in a function.
:::

:::exam-tip
When asked to **explain the difference between a procedure and a function**, say that a function returns a value and is used in an expression, while a procedure is called as a statement and does not return a value.
:::

## Summary

:::summary
- A procedure carries out a task; a function calculates and returns one value; both have a header with a name and typed parameters.
- Arguments are matched to parameters by position; a procedure is called with \`CALL\`, a function inside an expression.
- \`BYVAL\` passes a copy (the original is unchanged); \`BYREF\` passes a reference (the original can be changed).
- Local variables exist only inside the routine; globals should be used sparingly.
- Routines make code reusable, easier to test and easier to share between programmers.
:::
`;
writeLesson({ key: "prog.procedures-functions", title: "Procedures, functions and parameters", summary: "Defining and calling procedures and functions, headers and interfaces, parameters and arguments, return values, passing by value and by reference, local and global variables and modular program design, in 9618-style pseudocode and Python.", concept: "acs.prog.procedures-functions", minutes: 55 }, body);
