import { truthTableMd, truthRows, L, equivalent, mdTable, chk, same } from "../lib.mjs";
import { writeLesson } from "./w1a-lib.mjs";

const abc = ["A", "B", "C"];
// 1: circuit in words -> expression -> table
const f1 = (a, b, c) => L.or(L.and(a, b), L.not(c));
const t1 = truthTableMd(abc, [["P = A AND B", L.and], ["Q = NOT C", (a, b, c) => L.not(c)], ["X = P OR Q", f1]]);
const rows1 = truthRows(abc, f1);
const ones1 = rows1.filter((r) => r.out).length;
// 2: statement -> expression
const inputs2 = ["G", "S", "R"];
const f2 = (g, s, r) => L.and(g, L.or(s, r));
const t2 = truthTableMd(inputs2, [["P = S OR R", (g, s, r) => L.or(s, r)], ["M = G AND P", f2]]);
const ones2 = truthRows(inputs2, f2).filter((r) => r.out).length;
// 3: equivalence
const two = ["A", "B"];
const lhs = (a, b) => L.not(L.and(a, b));
const rhs = (a, b) => L.or(L.not(a), L.not(b));
chk(equivalent(two, lhs, rhs) ? 1 : 0, 1);
const t3 = truthTableMd(two, [["NOT (A AND B)", lhs], ["(NOT A) OR (NOT B)", rhs]]);
// 4: majority
const f4 = (a, b, c) => L.or(L.or(L.and(a, b), L.and(a, c)), L.and(b, c));
const t4 = truthTableMd(abc, [["A AND B", L.and], ["A AND C", (a, b, c) => L.and(a, c)], ["B AND C", (a, b, c) => L.and(b, c)], ["X", f4]]);
const ones4 = truthRows(abc, f4).filter((r) => r.out).length;
chk(ones4, 4);
// evaluate for given inputs
const ev = f1(0, 1, 1);
const gateList = mdTable(["Gate", "Type", "Inputs", "Output"], [["G1", "AND", "A, B", "P"], ["G2", "NOT", "C", "Q"], ["G3", "OR", "P, Q", "X"]]);

const body = `
## Introduction

A conveyor in a mill in Chegutu must start only when the safety guard is closed and either the local start button or the remote start is pressed. The designer needs to turn that sentence into a circuit and prove that it behaves correctly. There are three ways to describe the same logic: a **logic circuit** (gates joined together), a **logic expression** (written with AND, OR, NOT and so on) and a **truth table**. This lesson shows how to move between them and how to design a circuit for a practical task.

You should know the six logic gates and their truth tables from the previous lesson.

## Key definitions

:::definition{term="Logic circuit"}
A set of logic gates connected so that the outputs of some gates become the inputs of others, giving one or more final outputs.
:::

:::definition{term="Logic expression"}
A statement written with the gate names that gives the output of a circuit in terms of its inputs, for example \`X = (A AND B) OR (NOT C)\`.
:::

:::definition{term="Equivalent circuits"}
Circuits (or expressions) that give the same output for every combination of the inputs. Their truth tables are identical.
:::

:::keyfact{title="Order of evaluation"}
Work out brackets first, then NOT, then AND, then OR. Always use brackets in your own expressions so the order cannot be misread.
:::

Diagrams are not used here: a circuit is described in words, as a list of gates and connections, or as an expression.

## From a circuit to an expression and a truth table

To write the expression, follow the signal from each input to the output and write the gate names around the signals.

:::worked-solution{title="Circuit: A and B go into an AND gate; C goes into a NOT gate; the outputs of these two gates go into an OR gate, whose output is X"}
1. Describe the gates:

${gateList}

2. The first gate gives P = A AND B, the second Q = NOT C, and the third X = P OR Q. The expression is **X = (A AND B) OR (NOT C)**.
3. Three inputs give 2^3 = 8 rows. Add a column for each gate:

${t1}

4. X is 1 in ${ones1} of the 8 rows.
:::

To find the output for particular inputs, substitute the values and evaluate step by step. For A = 0, B = 1, C = 1: A AND B = 0, NOT C = 0, so X = 0 OR 0 = **${ev}**.

## From a statement to an expression, a circuit and a truth table

Break the sentence into simple conditions, give each an input letter, and join them with the words AND, OR and NOT.

:::worked-solution{title="The motor M runs when the guard G is closed AND (the start button S is pressed OR the remote R is pressed)"}
1. Inputs: G, S, R (1 = true).
2. The brackets show that S and R are combined first with OR, then the result is combined with G using AND: **M = G AND (S OR R)**.
3. Circuit in words: S and R go into an OR gate; its output and G go into an AND gate whose output is M.
4. Truth table:

${t2}

5. The motor runs in ${ones2} of the 8 rows: only when G = 1 and at least one of S, R is 1.
:::

## Checking whether two circuits are equivalent

Write the truth table of each circuit with the same input order and compare the output columns row by row.

:::worked-solution{title="Are NOT (A AND B) and (NOT A) OR (NOT B) equivalent?"}
1. Two inputs give four rows. Work out both expressions:

${t3}

2. The two output columns are identical in every row, so the expressions are **equivalent**. A single NAND gate can replace the AND gate and the NOT gate together.
:::

## Designing a circuit for a practical task

:::example{title="A vault door that opens when at least two of three keys are used"}
A bank in Harare has a vault door that opens when at least two of three keys, A, B and C, are turned. The condition is true if A and B are turned, or A and C, or B and C. The expression is \`X = (A AND B) OR (A AND C) OR (B AND C)\`. The truth table shows that X is 1 in ${ones4} rows:

${t4}

This design needs three AND gates and a three-input OR (or two OR gates). The truth table makes it easy to test the design: the output is 1 exactly in the rows where two or more keys are turned.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC examines circuits with up to three inputs. Cambridge may use more inputs at A Level, so build the table in binary order and add intermediate columns whatever the number of inputs. Both boards expect the expression, the truth table and the circuit description to agree.
:::

## Common mistakes

:::mistake{title="Putting the NOT on the wrong signal"}
NOT (A AND B) is not the same as (NOT A) AND (NOT B). Check where the inversion applies by completing a truth table.
:::

:::mistake{title="Missing brackets"}
\`G AND S OR R\` can be read two ways. Write \`G AND (S OR R)\` so the meaning is clear.
:::

:::mistake{title="Filling the output column without intermediate columns"}
For a circuit with three or more gates, working out the output in your head leads to slips. Add a column for each gate.
:::

:::mistake{title="Describing a circuit loosely"}
"A goes into a gate" is not enough. Name the type of each gate and state which signals go into it.
:::

## Exam tips

:::exam-tip{title="Which papers test this"}
ZIMSEC Papers 1 and 2 (the design task in Paper 2 section A) and Cambridge Papers 1 and 3 ask you to write an expression from a circuit or statement, to complete a truth table, to design a circuit for a safety or control task, and to work out the output for given inputs. For **design**, write the expression first and then the circuit. For **complete**, fill every row in binary order.
:::

:::exam-tip{title="Number the gates"}
Label each gate output (P, Q, R) and write the expression for each. Mark schemes give credit for each correct intermediate column.
:::

:::exam-tip{title="Check the number of rows"}
Count the rows: 2 inputs give 4, 3 inputs give 8, 4 inputs give 16.
:::

## Summary

:::summary
- A circuit, an expression and a truth table can each be turned into the others.
- To get an expression, follow the signals through the gates and use brackets; to get a table, add a column for each gate.
- Break a statement into conditions joined by AND, OR and NOT.
- Two circuits are equivalent if their truth tables are identical in every row.
- For a design, write the expression, then the table, then check the table against the statement.
:::
`;
writeLesson({ key: "logic.circuits-expressions", title: "Logic circuits, expressions and truth tables", summary: "Move between logic circuits, expressions and truth tables, design circuits for practical tasks, calculate outputs and check equivalence by truth table.", concept: "acs.logic.circuits-expressions", minutes: 50 }, body);
