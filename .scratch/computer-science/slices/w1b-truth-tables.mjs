// Slice w1b: truth tables (comp.logic.truth-tables).
import { concept, P, L, truthRows, truthTableMd } from "../lib.mjs";

const ABC = ["A", "B", "C"];
const col = (inputs, f) => truthRows(inputs, f).map((r) => r.out).join("");
const ones = (inputs, f) => truthRows(inputs, f).filter((r) => r.out).length;

// Functions used below (all different from the lesson's worked examples).
const f1 = (a, b) => L.not(L.or(a, b)); // NOT (A OR B)
const f2 = (a, b, c) => L.and(L.xor(a, b), c); // (A XOR B) AND C
const f3 = (a, b, c) => L.or(L.and(a, L.not(b)), c); // (A AND NOT B) OR C
const f4 = (a, b, c) => L.or(L.nor(a, b), L.and(b, c)); // (A NOR B) OR (B AND C)
const f5 = (a, b, c) => L.or(L.and(a, c), L.not(b)); // (A AND C) OR (NOT B)
const f6 = (a, b, c) => L.and(L.or(a, b), c); // (A OR B) AND C
const f7 = (a, b, c) => L.xor(L.nand(a, b), c); // (A NAND B) XOR C
const f8 = (a, b, c) => L.nor(L.and(a, b), L.xor(b, c)); // (A AND B) NOR (B XOR C)

concept("comp.logic.truth-tables", { file: "logic/truth-tables", keyPrefix: "logic.truth-tables" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "How many rows does a truth table need for a circuit with three inputs?",
    options: [["8", "Correct: $2^3 = 8$ combinations, 000 to 111."], ["6", "Three inputs give 2 × 2 × 2 combinations, not 2 × 3."], ["9", "Each input has 2 values, not 3: use $2^3$, not $3^2$."], ["4", "Four rows are needed for two inputs."]],
    answer: "A",
    explanation: "Each input can be 0 or 1, so the number of combinations is $2^n$; for three inputs $2^3 = 8$.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In a three-input truth table written in binary order, what are the values of A, B and C in the **sixth** row?",
    options: [["A = 1, B = 0, C = 1", "Correct: the sixth row is the binary number 5, which is 101."], ["A = 1, B = 1, C = 0", "That is 110, the binary number 6, which is the seventh row."], ["A = 0, B = 1, C = 1", "That is 011, the binary number 3, the fourth row."], ["A = 1, B = 0, C = 0", "That is 100, the binary number 4, the fifth row."]],
    answer: "A",
    explanation: "Rows count from 000 (row 1) upwards, so row 6 is the binary form of 5: 101.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "What is the output of `X = (A XOR B) AND C` when A = 1, B = 1 and C = 1?",
    options: [[String(f2(1, 1, 1)), `Correct: 1 XOR 1 = ${L.xor(1, 1)}, and ${L.xor(1, 1)} AND 1 = ${f2(1, 1, 1)}.`], [String(1 - f2(1, 1, 1)), "This treats 1 XOR 1 as 1, as if XOR were OR."], ["It cannot be worked out without the circuit", "The expression gives all the information needed."], ["It depends on the order of A and B", "XOR gives the same result whichever input is first."]],
    answer: "A",
    explanation: `Work inside the bracket first: 1 XOR 1 = ${L.xor(1, 1)} (the inputs are the same). Then ${L.xor(1, 1)} AND 1 = ${f2(1, 1, 1)}.`,
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "For which inputs is the output of `X = (A AND NOT B) OR C` equal to **0**?",
    options: [["A = 1, B = 1, C = 0", `Correct: NOT B = 0, so A AND NOT B = 0; with C = 0 the OR gives ${f3(1, 1, 0)}.`], ["A = 1, B = 0, C = 0", `A AND NOT B = 1 AND 1 = 1, so X = ${f3(1, 0, 0)}.`], ["A = 0, B = 1, C = 1", `C = 1, so the OR gives X = ${f3(0, 1, 1)}.`], ["A = 1, B = 1, C = 1", `C = 1, so X = ${f3(1, 1, 1)}.`]],
    answer: "A",
    hints: ["X is 1 whenever C = 1, so look at rows with C = 0.", "Then A AND NOT B must also be 0."],
    explanation: `X = 0 needs both parts of the OR to be 0: C = 0 and (A AND NOT B) = 0. Among the options only A = 1, B = 1, C = 0 does this. Output column: ${col(ABC, f3)}.`,
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which expression gives this output column X (rows 000 to 111 in binary order)?\n\n" + truthTableMd(ABC, [["X", f6]]),
    options: [["`X = (A OR B) AND C`", `Correct: the column is ${col(ABC, f6)}: C must be 1 and at least one of A and B must be 1.`], ["`X = (A AND B) OR C`", `This gives ${col(ABC, (a, b, c) => L.or(L.and(a, b), c))}: row 001 would be 1.`], ["`X = (A OR B) OR C`", `This gives ${col(ABC, (a, b, c) => L.or(L.or(a, b), c))}: every row except 000 would be 1.`], ["`X = (A XOR B) AND C`", `This gives ${col(ABC, f2)}: row 111 would be 0.`]],
    answer: "A",
    hints: ["Find the rows where X = 1. What do they have in common?", "Test each option on row 111 and row 001."],
    explanation: `X is 1 in rows 011, 101 and 111: C is always 1 and A or B (or both) is 1, so X = (A OR B) AND C.`,
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "For which inputs is the output of `X = (NOT A) OR B` equal to 0?",
    options: [["A = 1, B = 0", `Correct: NOT A = 0 and B = 0, so X = ${L.or(L.not(1), 0)}.`], ["A = 0, B = 0", `NOT A = 1, so X = ${L.or(L.not(0), 0)}.`], ["A = 1, B = 1", `B = 1, so X = ${L.or(L.not(1), 1)}.`], ["A = 0, B = 1", `Both parts are 1, so X = ${L.or(L.not(0), 1)}.`]],
    answer: "A",
    explanation: "An OR output is 0 only when both of its inputs are 0: NOT A = 0 (so A = 1) and B = 0.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: (() => { const good = col(ABC, (a, b, c) => L.xor(L.and(a, b), c)); const bad = good.slice(0, 6) + (1 - Number(good[6])) + good[7]; return "Tatenda completed the truth table for `X = (A AND B) XOR C`. Reading the X column from row 000 to row 111, he wrote " + bad.split("").join(", ") + ". In which row did he make a mistake?"; })(),
    options: [["A = 1, B = 1, C = 0", `Correct: A AND B = 1 and C = 0, so X = 1 XOR 0 = ${L.xor(1, 0)}; he wrote the opposite.`], ["A = 1, B = 1, C = 1", `A AND B = 1 and C = 1, so X = 1 XOR 1 = ${L.xor(1, 1)}, which he wrote correctly.`], ["A = 0, B = 1, C = 1", `A AND B = 0, so X = 0 XOR 1 = ${L.xor(0, 1)}, which he wrote correctly.`], ["A = 1, B = 0, C = 0", `A AND B = 0 and C = 0, so X = ${L.xor(0, 0)}, which he wrote correctly.`]],
    answer: "A",
    hints: ["Work out A AND B for each row, then XOR it with C.", "Compare your column with his, row by row."],
    explanation: `The correct column is ${col(ABC, (a, b, c) => L.xor(L.and(a, b), c))}. Only row 110 differs.`,
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "`NOT (A AND B)` and `(NOT A) AND B` give the same truth table.",
    answer: false,
    explanation: `False. NOT (A AND B) is NAND: ${col(["A", "B"], (a, b) => L.not(L.and(a, b)))}. (NOT A) AND B gives ${col(["A", "B"], (a, b) => L.and(L.not(a), b))}. The position of NOT and the brackets matter.`,
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In a three-input truth table in binary order, input C changes value on every row.",
    answer: true,
    explanation: "True. C is the least significant bit, so it alternates 0, 1, 0, 1, …; B changes every two rows and A every four.",
  });
  b.truth({
    d: 2, skill: "APPLICATION",
    stem: "Complete the truth table for `X = NOT (A OR B)`.",
    inputs: ["A", "B"], fn: f1,
    explanation: `A OR B gives ${col(["A", "B"], L.or)}; inverting gives ${col(["A", "B"], f1)}. (This is the NOR pattern.)`,
  });
  b.truth({
    d: 3, skill: "APPLICATION",
    stem: "Complete the truth table for `X = (A XOR B) AND C`.",
    inputs: ABC, fn: f2,
    hints: ["Make a working column for A XOR B first.", "X can only be 1 in rows where C = 1."],
    explanation: `A XOR B: ${col(ABC, (a, b) => L.xor(a, b))}. AND with C keeps a 1 only where C = 1: X = ${col(ABC, f2)}.`,
  });
  b.truth({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Complete the truth table for `X = (A NOR B) OR (B AND C)`.",
    inputs: ABC, fn: f4,
    hints: ["Use two working columns: P = A NOR B and Q = B AND C.", "X is 1 if P or Q is 1."],
    explanation: `P = A NOR B: ${col(ABC, (a, b) => L.nor(a, b))}. Q = B AND C: ${col(ABC, (a, b, c) => L.and(b, c))}. X = P OR Q: ${col(ABC, f4)}.\n\n${truthTableMd(ABC, [["P", (a, b) => L.nor(a, b)], ["Q", (a, b, c) => L.and(b, c)], ["X", f4]])}`,
  });
  b.truth({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "A circuit is described as follows. Inputs A and C go into an AND gate. Input B goes into a NOT gate. The outputs of the AND gate and the NOT gate go into an OR gate, whose output is X.\n\nComplete the truth table for this circuit.",
    inputs: ABC, fn: f5,
    hints: ["Write the expression first: X = (A AND C) OR (NOT B).", "Every row with B = 0 gives X = 1."],
    explanation: `The circuit is X = (A AND C) OR (NOT B). NOT B makes rows 000, 001, 100 and 101 equal to 1; A AND C adds row 111. X = ${col(ABC, f5)}.\n\n${truthTableMd(ABC, [["A AND C", (a, b, c) => L.and(a, c)], ["NOT B", (a, b) => L.not(b)], ["X", f5]])}`,
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "In the complete truth table for `X = (A NAND B) XOR C`, in how many of the eight rows is X equal to 1?",
    value: ones(ABC, f7),
    wrong: [8 - ones(ABC, f7) + 1],
    workedSolution: `1. A NAND B for rows 000 to 111: ${col(ABC, (a, b) => L.nand(a, b))}.
2. C: ${col(ABC, (a, b, c) => c)}.
3. XOR the two columns: ${col(ABC, f7)}.
4. Count the 1s: ${ones(ABC, f7)}.`,
    hints: ["A NAND B is 0 only in rows 110 and 111.", "XOR with C gives 1 where the NAND output and C differ."],
    explanation: `A NAND B: ${col(ABC, (a, b) => L.nand(a, b))}; C: ${col(ABC, (a, b, c) => c)}; XOR: ${col(ABC, f7)}, which contains ${ones(ABC, f7)} ones.`,
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "A circuit has the expression `X = (A AND B) NOR (B XOR C)`. Choose the values for the row A = 0, B = 1, C = 0.",
    template: "A AND B = {{blank:p}}\n\nB XOR C = {{blank:q}}\n\nX = {{blank:x}}",
    blanks: [
      { id: "p", accepted: [String(L.and(0, 1))], choices: ["0", "1"] },
      { id: "q", accepted: [String(L.xor(1, 0))], choices: ["0", "1"] },
      { id: "x", accepted: [String(f8(0, 1, 0))], choices: ["0", "1"] },
    ],
    hints: ["NOR gives 1 only when both of its inputs are 0."],
    explanation: `A AND B = 0 AND 1 = ${L.and(0, 1)}; B XOR C = 1 XOR 0 = ${L.xor(1, 0)}; X = ${L.and(0, 1)} NOR ${L.xor(1, 0)} = ${f8(0, 1, 0)}.`,
  });
  b.short({
    d: 2, skill: "APPLICATION",
    stem: "State the output of `X = (A OR B) AND C` when A = 0, B = 1 and C = 0.",
    accepted: [String(f6(0, 1, 0))],
    wrong: [String(1 - f6(0, 1, 0))],
    explanation: `A OR B = ${L.or(0, 1)}, but C = 0, so X = ${L.or(0, 1)} AND 0 = ${f6(0, 1, 0)}.`,
  });
  b.match({
    d: 3, skill: "APPLICATION",
    stem: "Match each expression to its output column for the inputs A, B = 00, 01, 10, 11.",
    pairs: [
      ["`(NOT A) AND B`", col(["A", "B"], (a, b) => L.and(L.not(a), b))],
      ["`A OR (NOT B)`", col(["A", "B"], (a, b) => L.or(a, L.not(b)))],
      ["`NOT (A XOR B)`", col(["A", "B"], (a, b) => L.not(L.xor(a, b)))],
      ["`(NOT A) OR (NOT B)`", col(["A", "B"], (a, b) => L.or(L.not(a), L.not(b)))],
    ],
    hints: ["Write a NOT column for each inverted input first."],
    explanation: "Work out each expression row by row. Note that `(NOT A) OR (NOT B)` gives the same column as NAND.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    hints: ["Think about what an intermediate column records."],
    stem: "Explain why it is good practice to include intermediate (working) columns when completing a truth table for a circuit with several gates. [2]",
    points: ["Each column records the output of one gate, so only one rule is applied at a time", "Reduces errors / makes it easy to check a row (and working can still earn credit)"],
    modelAnswer: "Each working column holds the output of one gate, so you apply one gate's rule at a time instead of the whole expression at once. This reduces mistakes and makes each row easy to check.",
    explanation: "Intermediate columns break a complex expression into simple steps.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true,
    hints: ["Write the expression from the description first.", "Use working columns for each gate before the final one."],
    stem: "A water pump at a farm near Masvingo is controlled by a circuit with three inputs: A (1 = tank full), B (1 = water in the borehole) and C (1 = manual override switch on).\n\nThe circuit: input A goes into a NOT gate. The output of the NOT gate and input B go into an AND gate. The output of the AND gate and input C go into an OR gate, whose output X switches the pump on (X = 1).",
    parts: [
      P.mcq({ label: "(a)", stem: "Which logic expression describes this circuit?", options: [["`X = ((NOT A) AND B) OR C`", "Correct: A is inverted first, then ANDed with B, then ORed with C."], ["`X = (NOT (A AND B)) OR C`", "This inverts the AND result; in the circuit only A is inverted."], ["`X = (NOT A) AND (B OR C)`", "This joins B and C first; in the circuit C enters only the final OR gate."], ["`X = NOT ((A AND B) OR C)`", "This inverts the whole output; the NOT gate is on input A only."]], answer: "A", explanation: "Follow the signals: NOT A, then AND with B, then OR with C." }),
      P.truth({ label: "(b)", marks: 4, stem: "Complete the truth table for X.", inputs: ABC, fn: (a, b, c) => L.or(L.and(L.not(a), b), c), explanation: `X = ${col(ABC, (a, b, c) => L.or(L.and(L.not(a), b), c))}.` }),
      P.manual({ label: "(c)", marks: 1, stem: "Describe, in words, when the pump runs.", points: ["When the override is on, or when the tank is not full and there is water in the borehole"], modelAnswer: "The pump runs whenever the override switch is on, or when the tank is not full and the borehole has water." }),
    ],
    explanation: `X = ((NOT A) AND B) OR C, output ${col(ABC, (a, b, c) => L.or(L.and(L.not(a), b), c))}.`,
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true,
    hints: ["P = A XOR C and Q = NOT B are the working columns.", "The final gate is NAND: it is 0 only when both of its inputs are 1."],
    stem: "A logic circuit is described as follows. Inputs A and C go into an XOR gate (output P). Input B goes into a NOT gate (output Q). P and Q go into a NAND gate, whose output is X.",
    parts: [
      P.truth({ label: "(a)", marks: 2, stem: "Complete the working column P = A XOR C.", inputs: ABC, out: "P", fn: (a, b, c) => L.xor(a, c), explanation: `P = ${col(ABC, (a, b, c) => L.xor(a, c))}.` }),
      P.truth({ label: "(b)", marks: 4, stem: "Complete the output column X.", inputs: ABC, fn: (a, b, c) => L.nand(L.xor(a, c), L.not(b)), explanation: `Q = NOT B = ${col(ABC, (a, b) => L.not(b))}; X = P NAND Q = ${col(ABC, (a, b, c) => L.nand(L.xor(a, c), L.not(b)))}.` }),
      P.num({ label: "(c)", stem: "State how many rows of the table give X = 0.", value: 8 - ones(ABC, (a, b, c) => L.nand(L.xor(a, c), L.not(b))), explanation: "X = 0 only where P = 1 and Q = 1.", workedSolution: `1. X column: ${col(ABC, (a, b, c) => L.nand(L.xor(a, c), L.not(b)))}.
2. Count the 0s: ${8 - ones(ABC, (a, b, c) => L.nand(L.xor(a, c), L.not(b)))}.` }),
      P.manual({ label: "(d)", marks: 1, stem: "Describe the input conditions that make X = 0.", points: ["B is 0 and A and C are different (exactly one of A and C is 1)"], modelAnswer: "X is 0 only when B = 0 and exactly one of A and C is 1." }),
    ],
    explanation: `X = (A XOR C) NAND (NOT B): ${col(ABC, (a, b, c) => L.nand(L.xor(a, c), L.not(b)))}.`,
  });

  b.card("DEFINITION", "What is a **truth table**?", "A table showing the output of a logic circuit or expression for every possible combination of its inputs.");
  b.card("FORMULA", "Rows needed for three inputs", "$2^3 = 8$ rows, from 000 to 111.");
  b.card("FACT", "Pattern of columns A, B, C in binary order", "C alternates every row (0101…), B every two rows (0011…), A every four rows (00001111).");
  b.card("CONCEPT", "Why use intermediate columns?", "Each column holds one gate's output, so you apply one rule at a time and can check rows easily.");
  b.card("CONCEPT", "`NOT (A AND B)` versus `(NOT A) AND B`", "The first inverts the AND result (NAND: 1110). The second inverts only A before the AND (0100).");
  b.card("CONCEPT", "How do you check one row of a completed table?", "Trace that row's input values through each gate of the circuit in turn and compare the final value with X.");
  b.card("FACT", "What is the value of 1 OR 1?", "1. Only XOR gives 0 when both inputs are 1.");
  b.card("CONCEPT", "Order of working for an expression with brackets", "Work out the brackets (and any NOT applied to a single input) first, then the outer gate.");
});
