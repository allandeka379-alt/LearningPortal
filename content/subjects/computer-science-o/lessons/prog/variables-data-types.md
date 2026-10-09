---
{
  "key": "prog.variables-data-types",
  "title": "Variables, constants, data types, input and output",
  "summary": "How a program stores data in variables and constants, the five data types integer, real, char, string and Boolean, declaring and assigning values, using INPUT and OUTPUT, and the structure of a simple program.",
  "concepts": ["comp.prog.variables-data-types"],
  "estimatedMinutes": 45,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

The tuck shop at Kopje High School in Gweru keeps a simple program on an old laptop. For every sale it needs to remember the name of the item, how many were bought, the price of one item, whether the customer is a staff member and the total to pay. Each of these values is a different **kind** of data, and the program has to store each one somewhere while it works out the total.

That "somewhere" is a **variable** or a **constant**. Every program you write in Computer Science, from a three-line exercise to the 15-mark Cambridge scenario question, begins by deciding what data it needs, what to call each item and what type of data each item is. Examiners regularly ask you to *state* the most suitable data type for an item, to *write* declarations and to *explain* why a constant was used. This lesson gives you the vocabulary and the habits that the rest of the programming topic depends on.

## Key definitions

:::definition{term="Variable"}
A named location in memory that holds a value which can change while the program is running.
:::

:::definition{term="Constant"}
A named value that is set once, when it is declared, and cannot be changed while the program is running.
:::

:::definition{term="Data type"}
The kind of data a variable or constant holds, such as a whole number or text; it decides how the value is stored and which operations can be carried out on it.
:::

:::definition{term="Identifier"}
The name given to a variable, constant, array, procedure or function so that the program can refer to it.
:::

:::definition{term="Assignment"}
Giving a value to a variable; in pseudocode the arrow `←` is used, for example `Total ← 0`.
:::

## The five data types

| Data type | What it holds | Example values | Example use |
|:--|:--|:--|:--|
| INTEGER | a whole number, positive, negative or zero | `25`, `-3`, `0` | number of learners, goals scored |
| REAL | a number that can have a fractional part | `4.75`, `-0.5`, `12.0` | price, height in metres, average |
| CHAR | exactly one character | `'Y'`, `'7'`, `'#'` | a grade letter, a one-key menu choice |
| STRING | a sequence of zero or more characters | `"Rudo"`, `"0771 234 567"`, `""` | names, addresses, phone numbers |
| BOOLEAN | one of two values: TRUE or FALSE | `TRUE`, `FALSE` | has paid, is a member, found |

Three rules about how values are written in pseudocode are worth learning now:

- a REAL value always has at least one digit on each side of the decimal point, so twelve is written `12.0` and a half is `0.5`;
- a CHAR is written in single quotes, `'A'`, and a STRING in double quotes, `"Harare"`; the empty string is `""`;
- TRUE and FALSE are written without quotes, because they are Boolean values, not text.

### Choosing the right data type

Choose the type from what the data **is** and what the program will **do** with it. Ask two questions: is it a number you will do arithmetic with? If it is a number, can it have a fractional part?

A phone number such as `0712 345 678` looks like a number, but it should be a STRING. Nobody adds or multiplies phone numbers, and storing it as an integer would lose the leading zero. The same goes for national ID numbers, bank account numbers and postcodes. On the other hand, the number of items in a basket is an INTEGER, because it is a count, and the price of one item is a REAL, because it can include cents.

:::worked-solution[Choosing data types for a library record]
The library at a school in Bulawayo stores these items for each borrower. Choose the most suitable data type for each.

| Data item | Example | Data type | Reason |
|:--|:--|:--|:--|
| Borrower's surname | `"Ncube"` | STRING | text made of several characters |
| Form (1 to 4) | `3` | INTEGER | a whole number |
| House initial | `'K'` | CHAR | always exactly one character |
| Fine owed in dollars | `1.25` | REAL | can include cents |
| Has overdue books | `FALSE` | BOOLEAN | only two possible values |
| Guardian's phone number | `"0783 112 409"` | STRING | starts with zero; no arithmetic is done on it |

1. Decide whether each item is text, a whole number, a number with a fractional part, a single character or a yes/no value.
2. Check whether any number needs arithmetic; if not, and especially if it can begin with zero, store it as a string.
:::

## Declaring variables and constants

A **declaration** tells the computer the identifier and the data type before the value is used. In 0478 pseudocode:

```
DECLARE NumberOfItems : INTEGER
DECLARE ItemPrice : REAL
DECLARE CustomerName : STRING
DECLARE IsStaff : BOOLEAN
CONSTANT Discount ← 0.1
CONSTANT ShopName ← "Kopje Tuck Shop"
```

A constant is given its value when it is declared, and only a literal value can be used: `CONSTANT Discount ← 0.1` is correct, but `CONSTANT Discount ← Rate * 2` is not, because the value is an expression.

Why use a constant at all? If the discount changes, the programmer edits **one** line and every calculation that uses `Discount` is updated. The name also tells a reader what `0.1` means, and the value cannot be changed by mistake while the program runs.

Good identifiers describe their contents (`ItemPrice`, not `x`). In 0478 pseudocode they use PascalCase (each word starts with a capital), contain only letters and digits, start with a letter, and are never keywords such as `INPUT` or `FOR`.

## Assignment

In an assignment the expression on the **right** of the arrow is worked out first, and the result is stored in the variable on the **left**, replacing what was there before.

```
Count ← 0
Count ← Count + 1
Total ← Price * Quantity
```

`Count ← Count + 1` reads "take the value in Count, add 1, and store the result back in Count". It is not an equation. This is why pseudocode uses `←` for assignment and keeps `=` for comparing two values.

:::worked-solution[Swapping two values]
A program must swap the values in `First` and `Second`. A third variable, `Temp`, is needed.

```
First ← 18
Second ← 31
Temp ← First
First ← Second
Second ← Temp
OUTPUT First, " ", Second
```

| First | Second | Temp | OUTPUT |
|:-:|:-:|:-:|:-:|
| 18 |  |  |  |
|  | 31 |  |  |
|  |  | 18 |  |
| 31 |  |  |  |
|  | 18 |  |  |
|  |  |  | 31 18 |

1. `Temp` keeps a copy of 18 before `First` is overwritten.
2. Without `Temp`, the lines `First ← Second` and `Second ← First` would leave **both** variables holding 31: the first assignment destroys the only copy of 18.

| First | Second | OUTPUT |
|:-:|:-:|:-:|
| 18 |  |  |
|  | 31 |  |
| 31 |  |  |
|  | 31 |  |
|  |  | 31 31 |
:::

## Input and output

`INPUT` takes a value from the user (usually the keyboard) and stores it in a variable. `OUTPUT` displays values on the screen. Several values can be output in one statement, separated by commas; text in quotes is printed exactly, and an identifier without quotes is replaced by its value.

```
OUTPUT "Enter your name"
INPUT CustomerName
OUTPUT "Thank you, ", CustomerName
```

Always **prompt** before an input so the user knows what to type. If `CustomerName` holds `"Farai"`, the last line outputs `Thank you, Farai`. Writing `OUTPUT "CustomerName"` would print the word *CustomerName* itself.

## The structure of a simple program

Most short programs follow the same order: declarations and constants first, then input, then processing, then output. The words **syntax** and **semantics** describe two different ways a program can be right or wrong. Syntax is the set of grammar rules of the language: spelling of keywords, punctuation, the order of the parts of a statement. Semantics is the meaning: what the statement actually does when it runs. `Total ← Price + Quantity` is correct syntax, but its meaning is wrong for working out a bill.

:::example{title="A complete program for buying data bundles"}
Nyasha buys mobile data bundles that cost 2.75 dollars each. The program works out the cost of the bundles and the change from the amount paid.

```
DECLARE Bundles : INTEGER
DECLARE Paid : REAL
DECLARE Cost : REAL
DECLARE Change : REAL
CONSTANT BundlePrice ← 2.75
OUTPUT "How many bundles?"
INPUT Bundles
OUTPUT "Amount paid?"
INPUT Paid
Cost ← Bundles * BundlePrice
Change ← Paid - Cost
OUTPUT "Cost: ", Cost, " Change: ", Change
```

With inputs 6 and 20.0 the cost is 6 × 2.75 = 16.5 and the change is 20.0 − 16.5 = 3.5. The price is a constant because it is fixed for the whole run, and every money value is REAL.
:::

## Common mistakes

:::mistake{title="Storing phone and ID numbers as integers"}
Phone numbers, ID numbers and account numbers are identifiers, not quantities. They are never used in arithmetic and may start with zero or contain spaces and letters, so they are strings.
:::

:::mistake{title="Using = for assignment"}
In pseudocode `=` compares two values and `←` assigns one. Write `Total ← 0`, not `Total = 0`. (Some programming languages, such as Python, do use `=` for assignment, but your pseudocode must use the arrow.)
:::

:::mistake{title="Confusing CHAR and STRING"}
A CHAR holds exactly one character in single quotes. Anything longer, such as `"Yes"` or a name, is a STRING in double quotes.
:::

:::mistake{title="Putting identifiers in quotes"}
`OUTPUT "Total"` prints the word Total. To print the value, leave the quotes off: `OUTPUT "Total is ", Total`.
:::

## Exam tips

:::exam-tip
When asked to *state* a data type, give the type name only (INTEGER, REAL, CHAR, STRING or BOOLEAN). When asked to *justify* it, refer to the data: "REAL, because the price includes cents".
:::

:::exam-tip
In a scenario answer, declare your variables and constants at the start with meaningful names. Examiners often give a mark for sensible declarations, and good names make the rest of your algorithm easier to follow.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC Form 1 names the integer, character, string and Boolean types and asks learners to explain the syntax and semantics of a language and the structure of a program; programs that need fractional values use a real (floating-point) type, as in Visual Basic or Python. Cambridge 0478 lists five types (INTEGER, REAL, CHAR, STRING, BOOLEAN) and the exact declaration style shown here.
:::

## Summary

:::summary
- A variable holds a value that can change; a constant is set once and cannot change while the program runs.
- The data types are INTEGER (whole numbers), REAL (numbers with a fractional part), CHAR (one character), STRING (text) and BOOLEAN (TRUE or FALSE).
- Store numbers that are never used in arithmetic, such as phone numbers, as strings.
- Declare with `DECLARE Name : TYPE` and `CONSTANT Name ← value`; assign with `←`, right side first.
- Prompt before every `INPUT`; separate items in an `OUTPUT` with commas and put only literal text in quotes.
:::
