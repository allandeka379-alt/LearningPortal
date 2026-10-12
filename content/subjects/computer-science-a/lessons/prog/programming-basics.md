---
{
  "key": "prog.programming-basics",
  "title": "Programming basics: variables, constants, expressions and input-output",
  "summary": "Declaring variables and constants, the basic data types, assignment, arithmetic, relational and logical operators with precedence, DIV and MOD, input and output, string and numeric built-in functions and scope, in 9618-style pseudocode and Python.",
  "concepts": [
    "acs.prog.programming-basics"
  ],
  "estimatedMinutes": 55,
  "level": "core"
}
---
## Introduction

Every program you will write, from a school-fees calculator in Gweru to the software that runs a mobile-money menu, starts with the same basic tools: places to keep data, rules for combining it, and ways to read it in and write it out. If these basics are shaky, everything built on them (loops, procedures, files and objects) is shaky too.

This lesson covers variables, constants, data types, assignment, expressions, input and output, built-in functions and scope. Programs are shown first in 9618-style **pseudocode**, then in **Python**, the practical language for both boards, and every output shown was produced by running the program. You should already know what an algorithm is and what a program is.

## Key definitions

:::definition{term="Variable"}
A named memory location that holds a value which can change while the program runs. It has an identifier (its name) and a data type.
:::

:::definition{term="Constant"}
A named value that is set once, before the program runs, and cannot be changed while it runs. Using a constant means a value such as a price or a tax rate is written in one place only.
:::

:::definition{term="Data type"}
The kind of value a variable can hold, which decides how much memory it uses and which operations are allowed. The basic types are INTEGER (whole numbers), REAL (numbers with a fractional part), CHAR (one character), STRING (zero or more characters), BOOLEAN (TRUE or FALSE) and DATE.
:::

:::definition{term="Assignment"}
A statement that stores the value of an expression in a variable. In pseudocode the arrow is used, for example `Total ← Price * Quantity`; in Python the equals sign is used, `total = price * quantity`.
:::

:::definition{term="Expression"}
A combination of values, variables, operators and function calls that the computer evaluates to a single value.
:::

## Variables, constants and data types

In 9618-style pseudocode a variable is declared before it is used, giving its identifier and type, and a constant is given its value once:

```
DECLARE Quantity : INTEGER
DECLARE Price : REAL
DECLARE Initial : CHAR
DECLARE Name : STRING
DECLARE Paid : BOOLEAN
CONSTANT RollPrice ← 0.75
```

Python does not need a declaration. A variable is created by its first assignment and takes the type of the value, so `quantity = 4` makes an `int` and `price = 0.75` makes a `float`. Python has no CHAR type (a single character is a `str` of length 1) and no true constants, so by convention a constant is written in capital letters, `ROLL_PRICE = 0.75`. Choose identifiers that describe the data (`NumberOfPlayers`, not `n`), and use the type that fits the data: a telephone number is a STRING, because you never calculate with it and it may begin with a zero.

## Expressions and operators

Arithmetic operators, with the result of each for the values 7 and 2 (computed by running Python):

| Operation | Pseudocode | Python | Result for 7 and 2 |
|:-:|:-:|:-:|:-:|
| Addition | `+` | `+` | 9 |
| Subtraction | `-` | `-` | 5 |
| Multiplication | `*` | `*` | 14 |
| Division (real result) | `/` | `/` | 3.5 |
| Whole-number quotient | `DIV(7, 2)` | `//` | 3 |
| Remainder | `MOD(7, 2)` | `%` | 1 |
| Power | `^` | `**` | 49 |

The pseudocode `/` always gives a REAL result, and `DIV` and `MOD` work on whole numbers. In the pseudocode guide they are written as functions, `DIV(7, 2)`; Python uses `//` and `%`. The relational operators are `=`, `<`, `<=`, `>`, `>=` and `<>` (not equal to); Python uses `==` for "equal to" and `!=` for "not equal to". The logical operators `AND`, `OR` and `NOT` combine Boolean values, and `&` joins strings.

Operators have an order of precedence: brackets first, then powers, then multiplication and division (including DIV and MOD), then addition and subtraction; operators of equal precedence are worked from left to right (except powers in Python, which are worked from right to left).

:::worked-solution{title="Evaluating expressions"}
Each expression is evaluated by the rules above. The values were checked by running them in Python (in Python the power is written `**`).

| Expression | Value |
|:-:|:-:|
| `2 + 3 * 4` | 14 |
| `(2 + 3) * 4` | 20 |
| `2 ^ 3 ^ 2` | 512 |
| `17 MOD 5 + 17 DIV 5` | 5 |
| `20 / 4 * 2` | 10.0 |

For `2 + 3 * 4` the multiplication is done first (12) and then 2 is added. Brackets change the order in `(2 + 3) * 4`. For `17 MOD 5 + 17 DIV 5` the remainder is 2 and the quotient is 3, giving 5. For `20 / 4 * 2` the operators have equal precedence, so they are worked left to right: 20 / 4 is 5.0, then 5.0 * 2 is 10.0. Note that `/` gives a real result even when the division is exact.
:::

## Input and output

The pseudocode statements are `INPUT` and `OUTPUT`:

```
OUTPUT "How many rolls?"
INPUT Quantity
OUTPUT "Total is ", Quantity * RollPrice
```

In Python, `input()` always returns a **string**, so a number must be converted with `int()` or `float()` before it is used in a calculation; `print()` writes its arguments separated by spaces. Forgetting the conversion is one of the most common errors in practical work: `"4" * 0.75` is a type error, and `"4" + "5"` is the string `"45"`, not 9.

:::worked-solution{title="A tuck-shop program"}
A tuck shop in Mutare sells bread rolls at a fixed price. The program reads the number of rolls and the amount paid, then outputs the total and the change. Pseudocode first:

```
CONSTANT RollPrice ← 0.75
DECLARE Quantity : INTEGER
DECLARE Paid, Total, Change : REAL
OUTPUT "Rolls bought?"
INPUT Quantity
OUTPUT "Amount paid?"
INPUT Paid
Total ← Quantity * RollPrice
Change ← Paid - Total
OUTPUT "Total: ", Total
OUTPUT "Change: ", Change
```

The Python version, run with the inputs 4 and 5:

```python
ROLL_PRICE = 0.75
print("Rolls bought?")
quantity = int(input())
print("Amount paid?")
paid = float(input())
total = quantity * ROLL_PRICE
change = paid - total
print("Total:", total)
print("Change:", change)
```

Output:

```
Rolls bought?
Amount paid?
Total: 3.0
Change: 2.0
```

The total is 4 × 0.75 = 3.0 and the change is 5 - 3.0 = 2.0. The price is held in a constant, so if it changes only one line is edited. Notice that Python shows `3.0`, a float, because one operand was a float.
:::

## Built-in functions and library routines

Programming languages supply ready-made routines. The pseudocode guide gives string functions (the real paper tells you what a function does, but you should know the common ones), and Python has equivalents. Python counts positions from 0 and the pseudocode functions count from 1, which is why `MID(Word, 4, 3)` becomes `word[3:6]`.

| Pseudocode | Python | Result when Word is "Zimbabwe" |
|:-:|:-:|:-:|
| `LENGTH(Word)` | `len(word)` | `8` |
| `LEFT(Word, 3)` | `word[:3]` | `'Zim'` |
| `RIGHT(Word, 3)` | `word[-3:]` | `'bwe'` |
| `MID(Word, 4, 3)` | `word[3:6]` | `'bab'` |
| `TO_UPPER(Word)` | `word.upper()` | `'ZIMBABWE'` |
| `ASC("A")` | `ord("A")` | `65` |
| `CHR(100)` | `chr(100)` | `'d'` |

For numbers, `INT(x)` removes the fractional part of a real number and `ROUND(x, n)` rounds to `n` decimal places; `RAND()` gives a random number and is used to simulate dice and draws. In Python, `int(7.86)` gives 7 (it cuts off, it does not round), `round(7.86, 1)` gives 7.9, and random numbers come from the `random` module. A real run of these built-in functions:

```python
price = 7.86
print(int(price))
print(round(price, 1))
print(round(2.347, 2))
```

Output:

```
7
7.9
2.35
```

## Scope

The **scope** of a variable is the part of a program where it can be used. A variable created inside a procedure or function is **local**: it exists only while that routine runs and cannot be seen outside it. A variable created in the main program, outside any routine, is **global** and can be read anywhere. ZIMSEC describes this with block structure: a variable is visible inside the block where it is declared. Local variables are preferred because they stop routines from changing each other's data by accident.

:::worked-solution{title="Local and global variables"}
```python
total = 100

def add_bonus(mark):
    bonus = 5
    return mark + bonus

result = add_bonus(60)
print(result)
print(total)
try:
    print(bonus)
except NameError:
    print("bonus does not exist here")
```

Output:

```
65
100
bonus does not exist here
```

`bonus` is local to `add_bonus`, so using it in the main program causes a `NameError`, which the program catches and reports. `total` is global and is still 100 at the end.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards expect declarations, the five basic data types, assignment, the arithmetic, relational and logical operators, `DIV` and `MOD`, input and output, and string handling in 9618-style pseudocode (ZIMSEC Form 5; Cambridge AS Level, Papers 1 and 2). ZIMSEC words scope as the block structure of a program. The DATE type and the exact names of library functions are given in the paper if they are needed.
:::

## Common mistakes

:::mistake{title="Using = for assignment in pseudocode"}
In pseudocode assignment is the arrow, `Total ← 0`. In a condition, `=` tests for equality. In Python the two are different again: `=` assigns and `==` compares.
:::

:::mistake{title="Forgetting that input() returns a string"}
Reading `age = input()` and then using `age + 1` fails in Python. Convert with `int(input())` or `float(input())`.
:::

:::mistake{title="Confusing DIV and /"}
`7 / 2` is 3.5, but `DIV(7, 2)` is 3. Use `DIV` for whole-number division and `MOD` for the remainder.
:::

:::mistake{title="Off-by-one with string positions"}
Pseudocode strings start at position 1 but Python strings start at index 0, so `MID(Word, 4, 3)` is `word[3:6]`, not `word[4:7]`.
:::

## Exam tips

:::exam-tip
ZIMSEC Paper 1 and Cambridge Paper 2 ask you to **state** the data type for a given item (choose the most suitable: money is REAL, a count is INTEGER, a code with leading zeros is STRING), to **evaluate** an expression, to **trace** a short program and to **write** a short program or part of one. Declare variables, use assignment correctly and give the exact output including spaces.
:::

:::exam-tip
ZIMSEC Paper 2 and Cambridge Paper 4 are practical: use meaningful names, convert input before calculating, and output a message that says what the value is, for example `Total: 3.0`, not just `3.0`.
:::

## Summary

:::summary
- A variable holds data that can change, a constant holds a value set once; both have an identifier and a data type (INTEGER, REAL, CHAR, STRING, BOOLEAN, DATE).
- Assignment stores the value of an expression in a variable (`←` in pseudocode, `=` in Python).
- Operators are worked in order of precedence; `/` gives a real result, `DIV` the whole-number quotient and `MOD` the remainder.
- `input()` in Python returns a string, so convert it before calculating.
- String functions count from 1 in pseudocode and from 0 in Python.
- A local variable exists only inside its routine; a global variable can be used anywhere.
:::
