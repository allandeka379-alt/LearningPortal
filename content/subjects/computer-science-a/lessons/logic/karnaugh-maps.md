---
{
  "key": "logic.karnaugh-maps",
  "title": "Karnaugh maps",
  "summary": "Draw Karnaugh maps for two to four variables using Gray code, group the 1s including wrap-around and don't care cells, and write the simplified sum-of-products expression.",
  "concepts": [
    "acs.logic.karnaugh-maps"
  ],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

An engineer at a cement works near Bulawayo has a truth table for a control circuit with four inputs. Writing the expression from the table gives eight product terms, and simplifying them with Boolean algebra is slow and easy to get wrong. A **Karnaugh map** (K-map) is a grid that shows the truth table in a way that lets you see the simplification: adjacent cells that differ in one variable can be merged. It is a quick, visual method for expressions of two to four variables.

You should be able to complete truth tables and use the Boolean laws from the previous lesson. As in that lesson, the symbols `·` (AND), `+` (OR) and an overbar (NOT) are explained when used.

## Key definitions

:::definition{term="Karnaugh map"}
A grid with one cell for each combination of the inputs of a logic expression, arranged in Gray-code order so that neighbouring cells differ in exactly one input. Each cell holds the output for that combination.
:::

:::definition{term="Gray code"}
A sequence of binary values in which each value differs from the next in exactly one bit, for example 00, 01, 11, 10.
:::

:::definition{term="Sum-of-products expression"}
An expression made of AND terms joined by OR, for example $A \cdot B + \overline{C}$.
:::

:::definition{term="Don't care condition"}
An input combination that can never occur, or whose output does not matter. It is marked X in the K-map and may be treated as 0 or 1, whichever helps to make bigger groups.
:::

## Drawing the map

A map has 2^n cells for n variables: 4 cells for two variables, 8 for three and 16 for four. The cells are labelled with the input values in **Gray code** (00, 01, 11, 10), not in binary order, so that moving from one cell to the next changes one variable only. Each cell gets the output of the truth table row it represents.

Here the rows are labelled with the first variable (or the first two) and the columns with the others.

:::worked-solution{title="Draw the K-map for X with the truth table below"}
1. Truth table (inputs A, B, C):

| A | B | C | X |
|:-:|:-:|:-:|:-:|
| 0 | 0 | 0 | 1 |
| 0 | 0 | 1 | 0 |
| 0 | 1 | 0 | 1 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 0 | 1 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 1 |
| 1 | 1 | 1 | 1 |

2. The rows with X = 1 are 000, 010, 100, 110, 111.
3. Write them in the map, with rows for A and columns for BC in Gray order:

| A ↓ / BC → | 00 | 01 | 11 | 10 |
|:-:|:-:|:-:|:-:|:-:|
| 0 | 1 | 0 | 0 | 1 |
| 1 | 1 | 0 | 1 | 1 |
:::

## Grouping the 1s

Rules for grouping:

1. Groups contain 1, 2, 4, 8 or 16 cells (a power of 2), and are rectangles of adjacent cells.
2. Cells at opposite edges are adjacent, so groups can **wrap around** the left and right edges, the top and bottom edges, and all four corners.
3. Every 1 must be in at least one group; groups may overlap.
4. Make each group as large as possible and use as few groups as possible.

For each group, the term has the variables whose value is the same for every cell in the group; a variable that changes inside the group is left out. A variable that is 1 appears as itself and a variable that is 0 appears inverted. The expression is the OR of the terms of all the groups.

![Three-variable Karnaugh map with rows A and columns BC in Gray order: the four 1s in the first and last columns wrap around to give NOT C, the pair at A=1, B=1 gives A AND B, so X = (A AND B) OR (NOT C)](media:diagrams/kmap-three-variable.png "Figure: grouping the 1s on a 3-variable K-map, including a wrap-around group")

:::worked-solution{title="Simplify the 3-variable function in the K-map from the previous example"}
1. Group 1: the four cells 000, 010, 100, 110. They are in the first and last columns, joined by wrap-around. C is 0 in every cell, and A and B change, so the term is **NOT C**.
2. Group 2: the pair 110 and 111. A = 1 and B = 1 in both, and C changes, so the term is **A AND B**.
3. The 1 in cell 110 is in both groups; overlapping is allowed.
4. X = **(A AND B) OR (NOT C)**.
5. Check with the original table: for 110, A AND B = 1 so X = 1; for 001, both terms are 0 so X = 0.
:::

![Four-variable Karnaugh map: the four corner cells form one wrap-around group giving NOT B AND NOT D, and the centre four cells give B AND D, so X is 1 when B and D are equal](media:diagrams/kmap-four-variable.png "Figure: a 4-variable K-map with a corner group and a centre group")

:::worked-solution{title="A four-variable map with corner and middle groups"}
1. The 1s are in cells 0000, 0010, 0101, 0111, 1000, 1010, 1101, 1111:

| AB ↓ / CD → | 00 | 01 | 11 | 10 |
|:-:|:-:|:-:|:-:|:-:|
| 00 | 1 | 0 | 0 | 1 |
| 01 | 0 | 1 | 1 | 0 |
| 11 | 0 | 1 | 1 | 0 |
| 10 | 1 | 0 | 0 | 1 |

2. The four corner cells (0000, 0010, 1000, 1010) form one group by wrap-around. B = 0 and D = 0 in every cell, so the term is **NOT B AND NOT D**.
3. The four cells in rows 01 and 11 and columns 01 and 11 (0101, 0111, 1101, 1111) form a second group. B = 1 and D = 1, so the term is **B AND D**.
4. X = **(B AND D) OR (NOT B AND NOT D)**: X is 1 when B and D are equal, which is an XNOR of B and D.
:::

## Don't care conditions

Sometimes some input combinations never happen. The output for those cells does not matter, and they are marked X. In the grouping you may include an X in a group when it helps to make the group bigger, and you ignore any X that is not needed.

:::worked-solution{title="A display circuit receives a BCD digit (0 to 9) as inputs A B C D (A is the most significant bit). X must be 1 when the digit is 5 or more"}
1. The digits 5, 6, 7, 8, 9 must give X = 1. The patterns 1010 to 1111 (10 to 15) never occur in BCD, so they are don't cares:

| AB ↓ / CD → | 00 | 01 | 11 | 10 |
|:-:|:-:|:-:|:-:|:-:|
| 00 | 0 | 0 | 0 | 0 |
| 01 | 0 | 1 | 1 | 1 |
| 11 | X | X | X | X |
| 10 | 1 | 1 | X | X |

2. Group the whole row A = 1 (cells 1100, 1101, 1111, 1110 and 1000, 1001, 1011, 1010): the term is **A**.
3. Group the cells 0101, 0111, 1101, 1111 (B = 1, D = 1): **B AND D**.
4. Group the cells 0110, 0111, 1110, 1111 (B = 1, C = 1): **B AND C**.
5. X = **A OR (B AND C) OR (B AND D)**, with five literals in total. Without the don't cares the best expression has three terms and nine literals, so the don't cares give a much simpler circuit.
:::

## Benefits of Karnaugh maps

A K-map shows adjacent terms at a glance, whereas the algebraic method needs you to spot the pairs and name each law. Because the cells are in Gray order the simplification is systematic, and it is much less likely that a possible simplification is missed. Its limits are that it becomes hard to use above four or five variables, and that it relies on the grouping being drawn correctly.

:::keyfact{title="Cambridge only"}
Karnaugh maps for two, three or four variables and don't care conditions are A Level topics for Cambridge (Paper 3). The ZIMSEC A Level specification does not include them, so these items are tagged to Cambridge only.
:::

## Common mistakes

:::mistake{title="Using binary order for the labels"}
The labels must be in Gray order: 00, 01, 11, 10. If the order is 00, 01, 10, 11, neighbouring cells differ in two variables and the groups are wrong.
:::

:::mistake{title="Making groups of three or five cells"}
A group has 1, 2, 4, 8 or 16 cells. A group of three must be split into a group of two and another that overlaps.
:::

:::mistake{title="Forgetting the wrap-around"}
Cells on opposite edges, and the four corners, are neighbours. Missing them leaves extra terms in the answer.
:::

:::mistake{title="Writing the wrong term for a group"}
Keep the variables that do not change in the group. A variable that is 0 in the group is written inverted.
:::

## Exam tips

:::exam-tip{title="Which paper tests this"}
Cambridge Paper 3 gives a truth table or expression and asks you to complete a Karnaugh map, to draw the groups (describe them in words in the written practice here: list the cells in each group) and to write the simplified expression. For **simplify**, show the groups and the term for each. Mention don't care conditions when they are given.
:::

:::exam-tip{title="Start with the 1s that fit only one group"}
A 1 that can be in only one largest group fixes that group. Work from the isolated 1s to the 1s with many choices.
:::

:::exam-tip{title="Test the answer"}
Check your final expression against one or two rows of the truth table, including a row where X = 0.
:::

## Summary

:::summary
- A K-map lays out the truth table in Gray code so that neighbouring cells differ in one variable.
- Group 1s in rectangles of 1, 2, 4, 8 or 16 cells, as large as possible, wrapping round the edges.
- Each group gives a term of the variables that stay the same; the answer is the OR of the terms.
- Don't care cells (X) may be used in a group when they make the group bigger.
- Maps are quick and systematic for up to four variables.
:::
