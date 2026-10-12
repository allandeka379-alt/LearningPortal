import { L, truthTableMd, truthRows, equivalent, minimise, minterms, toBase, mdTable, chk, same } from "../lib.mjs";
import { writeLesson } from "./w1a-lib.mjs";

const GRAY = ["00", "01", "11", "10"];
// K-map as markdown; cell values: 1, 0 or X (don't care)
function kmap(inputs, ones, dcs = []) {
  const n = inputs.length;
  const rowBits = n === 4 ? 2 : n - 1 === 1 ? 1 : 1;
  const colBits = n - rowBits;
  const rowLabels = rowBits === 2 ? GRAY : ["0", "1"];
  const colLabels = colBits === 2 ? GRAY : ["0", "1"];
  const rows = rowLabels.map((rl) => [rl, ...colLabels.map((cl) => {
    const m = parseInt(rl + cl, 2);
    return ones.includes(m) ? 1 : dcs.includes(m) ? "X" : 0;
  })]);
  return mdTable([`${inputs.slice(0, rowBits).join("")} ↓ / ${inputs.slice(rowBits).join("")} →`, ...colLabels], rows);
}
function termCells(inputs, term, universe) {
  const lits = term.replace(/[()]/g, "").split(" AND ").map((t) => t.trim());
  return universe.filter((m) => {
    const bits = toBase(m, 2, inputs.length);
    return lits.every((lit) => {
      const neg = lit.startsWith("NOT ");
      const v = lit.replace("NOT ", "");
      const bit = bits[inputs.indexOf(v)] === "1";
      return neg ? !bit : bit;
    });
  });
}
const abc = ["A", "B", "C"];
const abcd = ["A", "B", "C", "D"];

// Example 1: 3 variables, minterms 0,2,4,6,7
const ones1 = [0, 2, 4, 6, 7];
const f1 = (...v) => (ones1.includes(parseInt(v.join(""), 2)) ? 1 : 0);
const tt1 = truthTableMd(abc, [["X", f1]]);
const km1 = kmap(abc, ones1);
const min1 = minimise(abc, ones1);
same(min1.terms.slice().sort(), ["A AND B", "NOT C"], "ex1");
const cells1 = min1.terms.map((t) => termCells(abc, t, ones1));
// Example 2: 4 variables, corners and centre
const ones2 = [0, 2, 8, 10, 5, 7, 13, 15];
const f2 = (...v) => (ones2.includes(parseInt(v.join(""), 2)) ? 1 : 0);
const km2 = kmap(abcd, ones2);
const min2 = minimise(abcd, ones2);
same(min2.terms.slice().sort(), ["B AND D", "NOT B AND NOT D"], "ex2");
// Example 3: dont cares - BCD digit is 5 or more
const ones3 = [5, 6, 7, 8, 9];
const dc3 = [10, 11, 12, 13, 14, 15];
const km3 = kmap(abcd, ones3, dc3);
const min3 = minimise(abcd, ones3, dc3);
const min3n = minimise(abcd, ones3);
same(min3.terms.slice().sort(), ["A", "B AND C", "B AND D"], "ex3");
const lit = (t) => t.split(" AND ").length;
chk(min3.terms.reduce((s, t) => s + lit(t), 0), 5);
chk(min3n.terms.reduce((s, t) => s + lit(t), 0), 9);
// check the expression equals ones on valid inputs
const f3 = (a, b, c, d) => L.or(L.or(a, L.and(b, c)), L.and(b, d));
for (let m = 0; m < 10; m++) chk(f3(...toBase(m, 2, 4).split("").map(Number)), ones3.includes(m) ? 1 : 0);

const body = `
## Introduction

An engineer at a cement works near Bulawayo has a truth table for a control circuit with four inputs. Writing the expression from the table gives eight product terms, and simplifying them with Boolean algebra is slow and easy to get wrong. A **Karnaugh map** (K-map) is a grid that shows the truth table in a way that lets you see the simplification: adjacent cells that differ in one variable can be merged. It is a quick, visual method for expressions of two to four variables.

You should be able to complete truth tables and use the Boolean laws from the previous lesson. As in that lesson, the symbols \`·\` (AND), \`+\` (OR) and an overbar (NOT) are explained when used.

## Key definitions

:::definition{term="Karnaugh map"}
A grid with one cell for each combination of the inputs of a logic expression, arranged in Gray-code order so that neighbouring cells differ in exactly one input. Each cell holds the output for that combination.
:::

:::definition{term="Gray code"}
A sequence of binary values in which each value differs from the next in exactly one bit, for example 00, 01, 11, 10.
:::

:::definition{term="Sum-of-products expression"}
An expression made of AND terms joined by OR, for example $A \\cdot B + \\overline{C}$.
:::

:::definition{term="Don't care condition"}
An input combination that can never occur, or whose output does not matter. It is marked X in the map and may be treated as 0 or 1, whichever helps to make bigger groups.
:::

## Drawing the map

A map has 2^n cells for n variables: 4 cells for two variables, 8 for three and 16 for four. The cells are labelled with the input values in **Gray code** (00, 01, 11, 10), not in binary order, so that moving from one cell to the next changes one variable only. Each cell gets the output of the truth table row it represents.

Here the rows are labelled with the first variable (or the first two) and the columns with the others.

:::worked-solution{title="Draw the K-map for X with the truth table below"}
1. Truth table (inputs A, B, C):

${tt1}

2. The rows with X = 1 are ${ones1.map((m) => toBase(m, 2, 3)).join(", ")}.
3. Write them in the map, with rows for A and columns for BC in Gray order:

${km1}
:::

## Grouping the 1s

Rules for grouping:

1. Groups contain 1, 2, 4, 8 or 16 cells (a power of 2), and are rectangles of adjacent cells.
2. Cells at opposite edges are adjacent, so groups can **wrap around** the left and right edges, the top and bottom edges, and all four corners.
3. Every 1 must be in at least one group; groups may overlap.
4. Make each group as large as possible and use as few groups as possible.

For each group, the term has the variables whose value is the same for every cell in the group; a variable that changes inside the group is left out. A variable that is 1 appears as itself and a variable that is 0 appears inverted. The expression is the OR of the terms of all the groups.

:::worked-solution{title="Simplify the function in the map above (3 variables)"}
1. Group 1: the four cells ${cells1[min1.terms.indexOf("NOT C")].map((m) => toBase(m, 2, 3)).join(", ")}. They are in the first and last columns, joined by wrap-around. C is 0 in every cell, and A and B change, so the term is **NOT C**.
2. Group 2: the pair ${cells1[min1.terms.indexOf("A AND B")].map((m) => toBase(m, 2, 3)).join(" and ")}. A = 1 and B = 1 in both, and C changes, so the term is **A AND B**.
3. The 1 in cell 110 is in both groups; overlapping is allowed.
4. X = **(A AND B) OR (NOT C)**.
5. Check with the original table: for 110, A AND B = 1 so X = 1; for 001, both terms are 0 so X = 0.
:::

:::worked-solution{title="A four-variable map with corner and middle groups"}
1. The 1s are in cells ${ones2.slice().sort((x, y) => x - y).map((m) => toBase(m, 2, 4)).join(", ")}:

${km2}

2. The four corner cells (${[0, 2, 8, 10].map((m) => toBase(m, 2, 4)).join(", ")}) form one group by wrap-around. B = 0 and D = 0 in every cell, so the term is **NOT B AND NOT D**.
3. The four cells in rows 01 and 11 and columns 01 and 11 (${[5, 7, 13, 15].map((m) => toBase(m, 2, 4)).join(", ")}) form a second group. B = 1 and D = 1, so the term is **B AND D**.
4. X = **(B AND D) OR (NOT B AND NOT D)**: X is 1 when B and D are equal, which is an XNOR of B and D.
:::

## Don't care conditions

Sometimes some input combinations never happen. The output for those cells does not matter, and they are marked X. In the grouping you may include an X in a group when it helps to make the group bigger, and you ignore any X that is not needed.

:::worked-solution{title="A display circuit receives a BCD digit (0 to 9) as inputs A B C D (A is the most significant bit). X must be 1 when the digit is 5 or more"}
1. The digits 5, 6, 7, 8, 9 must give X = 1. The patterns 1010 to 1111 (10 to 15) never occur in BCD, so they are don't cares:

${km3}

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
`;
writeLesson({ key: "logic.karnaugh-maps", title: "Karnaugh maps", summary: "Draw Karnaugh maps for two to four variables using Gray code, group the 1s including wrap-around and don't care cells, and write the simplified sum-of-products expression.", concept: "acs.logic.karnaugh-maps", minutes: 50 }, body);
