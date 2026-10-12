---
{
  "key": "translation.bnf-syntax-diagrams",
  "title": "Syntax diagrams and Backus-Naur Form",
  "summary": "Expressing the grammar of a language with Backus-Naur Form and syntax diagrams: terminals and non-terminals, alternatives and recursion, writing rules for identifiers, numbers and expressions, converting between a diagram and BNF, and checking that a string is valid by deriving it.",
  "concepts": ["acs.translation.bnf-syntax-diagrams"],
  "estimatedMinutes": 55,
  "level": "core"
}
---
## Introduction

How does a compiler know that `Total ← Price * Qty` is a valid statement but `Total ← * Price` is not? Someone has to describe, exactly and without ambiguity, which strings belong to the language. That description is called the **grammar** (or **syntax**) of the language. Two notations are used to write a grammar: **Backus-Naur Form (BNF)**, which is text, and **syntax diagrams**, which show the same rules as paths.

This lesson shows how to read and write BNF rules, how recursion lets a short rule describe strings of any length, how to turn a rule into a syntax diagram and back, and how to check whether a string is valid by **deriving** it. All the validity checks and derivations were produced by code.

You should already know the stages of compilation (the syntax analyser checks the grammar) and the idea of recursion.

## Key definitions

:::definition{term="Syntax"}
The set of rules that decide which sequences of symbols form valid statements in a language. It says nothing about what a statement means.
:::

:::definition{term="Backus-Naur Form (BNF)"}
A notation for writing the syntax of a language as a set of rules. Each rule has a non-terminal on the left, the symbol `::=` (is defined as), and on the right one or more alternatives separated by `|`.
:::

:::definition{term="Terminal and non-terminal"}
A terminal is a symbol that appears in the language itself, such as `+` or `7`. A non-terminal is the name of a rule, written between angle brackets such as `<digit>`, which must be replaced by one of its definitions.
:::

:::definition{term="Syntax diagram"}
A diagram that shows a rule as a path from an entry to an exit. Terminals are drawn in rounded boxes (or circles) and non-terminals in rectangles; alternatives are separate paths and repetition is a path that loops back.
:::

## BNF rules

The rules for an integer (a whole number made of one or more digits) are:

```
<digit> ::= 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
<integer> ::= <digit> | <integer> <digit>
```

- `<digit>` has ten alternatives, each a single terminal.
- `<integer>` is either a single `<digit>`, **or** an `<integer>` followed by a `<digit>`. The second alternative uses the rule's own name on the right: this is **recursion**, and it is what allows an integer to have any number of digits.
- Writing symbols side by side means "followed by".

A rule that is defined in terms of itself is **recursive**. The first alternative is the non-recursive case that ends the repetition, like the base case of a recursive subroutine.

### Checking a string

| String | Valid? |
|:-:|:-:|
| `4071` | valid |
| `7` | valid |
| `40a1` | not valid |
| `` | not valid |

An empty string is not valid because every alternative of `<integer>` contains at least one `<digit>`, and `a` is not a digit.

## Deriving a string

To show that a string is valid, start from the non-terminal and keep replacing the leftmost non-terminal by one of its alternatives until only terminals remain. This is a **derivation**.

:::worked-solution{title="Deriving 407 as an integer"}
| Step | Sentential form |
|:-:|:-:|
| 0 | `<integer>` |
| 1 | `<integer> <digit>` |
| 2 | `<integer> <digit> <digit>` |
| 3 | `<digit> <digit> <digit>` |
| 4 | `4 <digit> <digit>` |
| 5 | `4 0 <digit>` |
| 6 | `4 0 7` |

1. Step 1 uses the recursive alternative `<integer> <digit>`; step 2 uses it again.
2. Step 3 uses the non-recursive alternative, so the recursion stops after two repeats.
3. Steps 4 to 6 replace each `<digit>` by a terminal: 4, 0, 7.
4. The string is valid because every symbol is a terminal and the result is 407. It takes 6 steps.
:::

## Rules for expressions

Recursion also lets a grammar describe brackets and precedence. These rules use `<integer>` as above:

```
<expression> ::= <term> | <expression> + <term>
<term> ::= <factor> | <term> * <factor>
<factor> ::= <integer> | ( <expression> )
```

A `<term>` is made of factors joined by `*`, and an `<expression>` is made of terms joined by `+`, so the multiplications are grouped together lower in the structure. This is why `*` is carried out before `+`. A `<factor>` can be a bracketed `<expression>`, which brings the rules back to the start.

| String | Valid? |
|:-:|:-:|
| `2+3*4` | valid |
| `(2+3)*4` | valid |
| `2+*3` | not valid |
| `(2+3` | not valid |

:::worked-solution{title="Deriving 2+3*4 as an expression"}
| Step | Sentential form |
|:-:|:-:|
| 0 | `<expression>` |
| 1 | `<expression> + <term>` |
| 2 | `<term> + <term>` |
| 3 | `<factor> + <term>` |
| 4 | `<integer> + <term>` |
| 5 | `<digit> + <term>` |
| 6 | `2 + <term>` |
| 7 | `2 + <term> * <factor>` |
| 8 | `2 + <factor> * <factor>` |
| 9 | `2 + <integer> * <factor>` |
| 10 | `2 + <digit> * <factor>` |
| 11 | `2 + 3 * <factor>` |
| 12 | `2 + 3 * <integer>` |
| 13 | `2 + 3 * <digit>` |
| 14 | `2 + 3 * 4` |

1. The first step uses the recursive alternative to separate the final `+ <term>`.
2. The `<term>` on the right is expanded as `<term> * <factor>`, so `3 * 4` is grouped as a single term.
3. This takes 14 steps, and shows that multiplication binds more tightly than addition.
:::

## Syntax diagrams

A syntax diagram is another way of showing the same rules. For `<integer>`:

- The path **enters**, passes through a rectangle labelled `digit`, and **exits**.
- A second path leaves after the rectangle and **loops back** to the entry of the rectangle, so the digit can be repeated. Each time round the loop another digit is added.

For `<schoolcode>` below, the diagram is one path with no loops: a province, then three digits.

| BNF feature | Syntax diagram feature |
|---|---|
| Terminal such as `+` or `BU` | Rounded box (or circle) containing the symbol |
| Non-terminal such as `<digit>` | Rectangle containing the name |
| Symbols side by side | Boxes joined one after another along a path |
| Alternatives separated by a vertical bar | Parallel paths that split and join again |
| Recursion (a rule that uses its own name) | A path that loops back to an earlier point |

Converting from BNF to a diagram follows this table row by row, and converting from a diagram to BNF reads each path from the entry to the exit, writing `|` between the alternative paths.

### A rule from a context in Zimbabwe

An exam centre uses codes made of a province code and three digits. The rules, with invented province codes, are:

```
<digit> ::= 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
<province> ::= HA | BU | MA | MS
<schoolcode> ::= <province> <digit> <digit> <digit>
```

| String | Valid? |
|:-:|:-:|
| `BU204` | valid |
| `MS007` | valid |
| `HA20` | not valid |
| `XY123` | not valid |

:::worked-solution{title="Deriving BU204 as a school code"}
| Step | Sentential form |
|:-:|:-:|
| 0 | `<schoolcode>` |
| 1 | `<province> <digit> <digit> <digit>` |
| 2 | `BU <digit> <digit> <digit>` |
| 3 | `BU 2 <digit> <digit>` |
| 4 | `BU 2 0 <digit>` |
| 5 | `BU 2 0 4` |

1. `<schoolcode>` has only one alternative, so it is replaced by `<province> <digit> <digit> <digit>`.
2. `<province>` is replaced by `BU`, and each `<digit>` by a digit in turn.
3. `HA20` fails because it has only two digits, and `XY123` fails because `XY` is not one of the alternatives of `<province>`.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Syntax diagrams and BNF are Cambridge A Level content (topic 16.2). ZIMSEC does not examine them.
:::

## Common mistakes

:::mistake{title="Using a non-terminal on the right without a way to stop"}
A recursive rule needs a non-recursive alternative, such as `<digit>` alone in `<integer>`. Without it, a string could never be completed.
:::

:::mistake{title="Putting terminals in angle brackets"}
Angle brackets are for non-terminals only. A terminal is written as it appears in the language.
:::

:::mistake{title="Confusing syntax with meaning"}
A string can be valid by the grammar and still make no sense, such as dividing by zero. The grammar describes form only.
:::

:::mistake{title="Replacing several non-terminals in one step of a derivation"}
Replace one non-terminal at a time, normally the leftmost, and write the new string each time.
:::

## Exam tips

:::exam-tip
Cambridge **Paper 3** asks you to **write** BNF rules for a described language, **complete** a rule with a missing part, **state** whether a string is valid by showing a derivation or the failing point, and **draw or describe** a syntax diagram for a rule. Show the derivation one non-terminal at a time.
:::

:::exam-tip
"**Explain** how the rule for an integer allows any number of digits": the rule is recursive, so `<integer> <digit>` can be used repeatedly, and `<digit>` alone ends the recursion.
:::

## Summary

:::summary
- Syntax is the set of rules for valid statements; BNF writes them as rules `<name> ::= alternatives`.
- Terminals appear in the language; non-terminals are names in angle brackets that are replaced using their rules.
- Recursion in a rule allows repetition, and a non-recursive alternative ends it.
- A syntax diagram shows alternatives as separate paths and repetition as a loop.
- A string is valid if it can be derived by replacing non-terminals until only terminals remain.
:::
