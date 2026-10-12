import { truthTableMd, L, equivalent, mdTable, chk, same, minimise, minterms } from "../lib.mjs";
import { writeLesson } from "./w1a-lib.mjs";

const AND = L.and, OR = L.or, NOT = L.not, NAND = L.nand, NOR = L.nor;
// Verify a derivation: each step must be equivalent to the previous one.
function derive(inputs, steps, label) {
  for (let i = 1; i < steps.length; i++) {
    if (!equivalent(inputs, steps[0].f, steps[i].f)) throw new Error(`${label}: step ${i} is not equivalent to the start`);
  }
  return mdTable(["Step", "Expression", "Law used"], steps.map((s, i) => [i + 1, s.tex, s.law]));
}
const ab = ["A", "B"];
const abc = ["A", "B", "C"];

// Example 1: A.B + A.notB = A
const d1 = derive(ab, [
  { tex: "$A \\cdot B + A \\cdot \\overline{B}$", f: (a, b) => OR(AND(a, b), AND(a, NOT(b))), law: "Start" },
  { tex: "$A \\cdot (B + \\overline{B})$", f: (a, b) => AND(a, OR(b, NOT(b))), law: "Distributive law (factorise A)" },
  { tex: "$A \\cdot 1$", f: (a, b) => AND(a, 1), law: "Complement law: $B + \\overline{B} = 1$" },
  { tex: "$A$", f: (a) => a, law: "Identity law: $A \\cdot 1 = A$" },
], "ex1");
// Example 2: (A+B).(A+notB) = A
const d2 = derive(ab, [
  { tex: "$(A + B) \\cdot (A + \\overline{B})$", f: (a, b) => AND(OR(a, b), OR(a, NOT(b))), law: "Start" },
  { tex: "$A + (B \\cdot \\overline{B})$", f: (a, b) => OR(a, AND(b, NOT(b))), law: "Distributive law" },
  { tex: "$A + 0$", f: (a) => OR(a, 0), law: "Complement law: $B \\cdot \\overline{B} = 0$" },
  { tex: "$A$", f: (a) => a, law: "Identity law: $A + 0 = A$" },
], "ex2");
// Example 3: notA.B + A.B + A.notB = A + B
const d3 = derive(ab, [
  { tex: "$\\overline{A} \\cdot B + A \\cdot B + A \\cdot \\overline{B}$", f: (a, b) => OR(OR(AND(NOT(a), b), AND(a, b)), AND(a, NOT(b))), law: "Start" },
  { tex: "$(\\overline{A} + A) \\cdot B + A \\cdot \\overline{B}$", f: (a, b) => OR(AND(OR(NOT(a), a), b), AND(a, NOT(b))), law: "Distributive law (factorise B from the first two terms)" },
  { tex: "$1 \\cdot B + A \\cdot \\overline{B}$", f: (a, b) => OR(AND(1, b), AND(a, NOT(b))), law: "Complement law" },
  { tex: "$B + A \\cdot \\overline{B}$", f: (a, b) => OR(b, AND(a, NOT(b))), law: "Identity law" },
  { tex: "$(B + A) \\cdot (B + \\overline{B})$", f: (a, b) => AND(OR(b, a), OR(b, NOT(b))), law: "Distributive law ($X + Y \\cdot Z = (X + Y) \\cdot (X + Z)$)" },
  { tex: "$(B + A) \\cdot 1$", f: (a, b) => AND(OR(b, a), 1), law: "Complement law" },
  { tex: "$A + B$", f: (a, b) => OR(a, b), law: "Identity and commutative laws" },
], "ex3");
chk(minimise(ab, minterms(ab, (a, b) => OR(a, b))).expression === "A OR B" ? 1 : 0, 1);
// De Morgan example: NOT(A + B.C) = notA . (notB + notC)
const dm = derive(abc, [
  { tex: "$\\overline{A + B \\cdot C}$", f: (a, b, c) => NOT(OR(a, AND(b, c))), law: "Start" },
  { tex: "$\\overline{A} \\cdot \\overline{B \\cdot C}$", f: (a, b, c) => AND(NOT(a), NOT(AND(b, c))), law: "De Morgan's law: $\\overline{X + Y} = \\overline{X} \\cdot \\overline{Y}$" },
  { tex: "$\\overline{A} \\cdot (\\overline{B} + \\overline{C})$", f: (a, b, c) => AND(NOT(a), OR(NOT(b), NOT(c))), law: "De Morgan's law: $\\overline{X \\cdot Y} = \\overline{X} + \\overline{Y}$" },
], "dm");
// NAND-only: X = A.B + C
const xf = (a, b, c) => OR(AND(a, b), c);
const nandForm = (a, b, c) => NAND(NAND(a, b), NAND(c, c));
chk(equivalent(abc, xf, nandForm) ? 1 : 0, 1);
// NOR-only: X = A.B  -> (A NOR A) NOR (B NOR B)
const norForm = (a, b) => NOR(NOR(a, a), NOR(b, b));
chk(equivalent(ab, AND, norForm) ? 1 : 0, 1);
const proof = truthTableMd(ab, [["$\\overline{A \\cdot B}$", (a, b) => NOT(AND(a, b))], ["$\\overline{A} + \\overline{B}$", (a, b) => OR(NOT(a), NOT(b))], ["$\\overline{A + B}$", (a, b) => NOT(OR(a, b))], ["$\\overline{A} \\cdot \\overline{B}$", (a, b) => AND(NOT(a), NOT(b))]]);

const laws = mdTable(["Law", "AND form", "OR form"], [
  ["Commutative", "$A \\cdot B = B \\cdot A$", "$A + B = B + A$"],
  ["Associative", "$(A \\cdot B) \\cdot C = A \\cdot (B \\cdot C)$", "$(A + B) + C = A + (B + C)$"],
  ["Distributive", "$A \\cdot (B + C) = A \\cdot B + A \\cdot C$", "$A + B \\cdot C = (A + B) \\cdot (A + C)$"],
  ["Identity", "$A \\cdot 1 = A$", "$A + 0 = A$"],
  ["Null (domination)", "$A \\cdot 0 = 0$", "$A + 1 = 1$"],
  ["Idempotent", "$A \\cdot A = A$", "$A + A = A$"],
  ["Complement", "$A \\cdot \\overline{A} = 0$", "$A + \\overline{A} = 1$"],
  ["Absorption", "$A \\cdot (A + B) = A$", "$A + A \\cdot B = A$"],
  ["Double negation", "$\\overline{\\overline{A}} = A$", ""],
  ["De Morgan", "$\\overline{A \\cdot B} = \\overline{A} + \\overline{B}$", "$\\overline{A + B} = \\overline{A} \\cdot \\overline{B}$"],
]);

const body = `
## Introduction

A hardware designer at a firm in Harare has a circuit with eleven gates that does a simple job. Fewer gates mean a cheaper, faster, cooler chip. **Boolean algebra** gives the rules for rewriting a logic expression into a simpler one that behaves the same way. It is also used to show that two circuits are equivalent and to rewrite an expression using only NAND or only NOR gates.

You should be able to write expressions for circuits and complete truth tables, as in the previous lessons.

## Notation

In this lesson only (and the next, on Karnaugh maps) the usual algebra symbols are used, alongside the gate names. The symbol \`·\` means AND, \`+\` means OR, and an overbar means NOT, so $\\overline{A}$ is NOT A. The expression \`(A AND B) OR (NOT C)\` is written $A \\cdot B + \\overline{C}$. The AND is worked out before the OR, as multiplication is before addition.

## Key definitions

:::definition{term="Boolean algebra"}
A set of laws for manipulating logic expressions, in which each variable is either 0 or 1.
:::

:::definition{term="Simplifying an expression"}
Rewriting an expression using Boolean laws to give an equivalent expression with fewer terms or fewer gates.
:::

:::definition{term="De Morgan's laws"}
Two laws: NOT (A AND B) = (NOT A) OR (NOT B), and NOT (A OR B) = (NOT A) AND (NOT B). To apply them, change AND to OR (or OR to AND) and invert each term.
:::

## The laws

${laws}

Every law can be proved by a truth table, and you may be asked to do so.

## Proving De Morgan's laws

:::worked-solution{title="Use a truth table to prove De Morgan's laws"}
1. Complete the table for all four combinations of A and B:

${proof}

2. The first two columns are identical, which proves $\\overline{A \\cdot B} = \\overline{A} + \\overline{B}$.
3. The last two columns are identical, which proves $\\overline{A + B} = \\overline{A} \\cdot \\overline{B}$.
:::

## Simplifying step by step

Give the law used at each step. Each line is equivalent to the line before it.

:::worked-solution{title="Simplify (A AND B) OR (A AND NOT B)"}
${d1}

The expression simplifies to **$A$**.
:::

:::worked-solution{title="Simplify (A OR B) AND (A OR NOT B)"}
${d2}

The expression simplifies to **$A$**.
:::

:::worked-solution{title="Simplify (NOT A AND B) OR (A AND B) OR (A AND NOT B)"}
${d3}

The expression simplifies to **$A + B$**, so one OR gate replaces three AND gates, one NOT gate and two OR gates.
:::

:::worked-solution{title="Apply De Morgan's laws to NOT (A OR (B AND C))"}
${dm}

The overbar is split over the OR, then over the AND. Each time the operation changes and every term is inverted.
:::

## Why simplify?

Each AND, OR or NOT term in an expression becomes a gate in the circuit. Simplifying the expression therefore reduces the number of gates, the area of silicon used, the electricity consumed, and the time a signal takes to pass through the circuit. A circuit that a student draws from a long expression in an examination can often be replaced by one or two gates. Simplification is also a way of checking: if your simplified expression has the same truth table as the original, the circuit built from it is equivalent.

:::example{title="Counting the saving"}
The expression in the third derivation above has three product terms, so the original circuit uses three AND gates, two OR gates and two NOT gates, and several of these gates are fed by the same inputs. The simplified expression A OR B needs a single OR gate. The two circuits give the same output for every combination of the inputs, but the second is far cheaper to build and faster to switch.
:::

A useful habit is to look for three patterns before starting: a pair of terms that differ in one variable, which can be factorised and the variable and its complement removed; a term that contains another term inside it, which can be absorbed; and a bracket that can be split with De Morgan's laws.

## Using only NAND or only NOR gates

NAND and NOR are universal, so any expression can be rewritten with one of them. Use the facts that $A \\text{ NAND } A = \\overline{A}$, $\\overline{\\overline{X}} = X$ and De Morgan's laws.

:::worked-solution{title="Write X = A · B + C using only NAND gates"}
1. Double negation: $X = \\overline{\\overline{A \\cdot B + C}}$.
2. De Morgan on the inner bar: $X = \\overline{\\overline{A \\cdot B} \\cdot \\overline{C}}$.
3. Now $\\overline{A \\cdot B}$ is A NAND B, and $\\overline{C}$ is C NAND C.
4. So **X = (A NAND B) NAND (C NAND C)**, which uses three NAND gates. A truth table check shows it is equivalent to A · B + C.
:::

:::example{title="AND from NOR gates"}
$A \\cdot B$ can be made from NOR gates only as (A NOR A) NOR (B NOR B). The two NOR gates with joined inputs invert A and B, and the third NOR gate combines the inverted signals; by De Morgan's law $\\overline{\\overline{A} + \\overline{B}} = A \\cdot B$. The equivalence was checked with a truth table.
:::

:::keyfact{title="Cambridge only"}
Boolean algebra, De Morgan's laws and conversion to NAND-only or NOR-only form are A Level topics for Cambridge (Paper 3). The ZIMSEC A Level specification does not include them, so these items are tagged to Cambridge only.
:::

## Common mistakes

:::mistake{title="Applying De Morgan without changing the operation"}
$\\overline{A \\cdot B}$ is $\\overline{A} + \\overline{B}$, not $\\overline{A} \\cdot \\overline{B}$. The AND becomes OR as well as each term being inverted.
:::

:::mistake{title="Cancelling terms that are not complements"}
Only $A + \\overline{A} = 1$ and $A \\cdot \\overline{A} = 0$. Do not cancel $A$ with $B$.
:::

:::mistake{title="Not stating the law"}
Marks are given for the law used at each step. Write the name of the law next to every line.
:::

:::mistake{title="Wrong order of operations"}
$A + B \\cdot C$ means $A + (B \\cdot C)$, not $(A + B) \\cdot C$. Add brackets if in doubt.
:::

## Exam tips

:::exam-tip{title="Which paper tests this"}
Cambridge Paper 3 asks you to simplify an expression with the law named at each step, to apply De Morgan's laws, to prove two expressions equivalent, and to rewrite an expression using NAND or NOR only. For **simplify**, show every line. For **prove**, either use laws or a truth table with matching columns.
:::

:::exam-tip{title="Check with a truth table"}
Test the original and the simplified expression for two or three input combinations; a mismatch shows an error.
:::

:::exam-tip{title="Look for the pattern first"}
Common patterns are $X \\cdot Y + X \\cdot \\overline{Y} = X$ and $X + \\overline{X} \\cdot Y = X + Y$. Spotting them saves lines.
:::

## Summary

:::summary
- Boolean laws let you rewrite an expression into a simpler equivalent one, giving the law at each step.
- Key laws: identity, null, idempotent, complement, absorption, distributive and De Morgan.
- De Morgan: change the operation (AND to OR or OR to AND) and invert each term.
- Equivalence can be proved with laws or with truth tables that have identical output columns.
- Any expression can be written using only NAND or only NOR gates.
:::
`;
writeLesson({ key: "logic.boolean-algebra", title: "Boolean algebra and De Morgan's laws", summary: "Apply Boolean identities and De Morgan's laws to simplify logic expressions step by step, prove equivalence, and rewrite expressions using only NAND or NOR gates.", concept: "acs.logic.boolean-algebra", minutes: 55 }, body);
