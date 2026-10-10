// W4b: aphys.electronics.logic-gates (ZIMSEC only) — digital signals, NOT/AND/OR/NAND/NOR/EXOR, truth tables of
// combinations, NAND and NOR as universal gates. Every truth table is computed below.
import { concept, P, t, same, table } from "../lib.mjs";

const NOT = (a) => 1 - a;
const AND = (a, b) => a & b;
const OR = (a, b) => a | b;
const NAND = (a, b) => NOT(a & b);
const NOR = (a, b) => NOT(a | b);
const XOR = (a, b) => a ^ b;
const rows2 = [[0, 0], [0, 1], [1, 0], [1, 1]];
const rows3 = [];
for (let a = 0; a < 2; a++) for (let b = 0; b < 2; b++) for (let c = 0; c < 2; c++) rows3.push([a, b, c]);
const col = (f) => rows2.map(([a, b]) => f(a, b)).join(" ");

concept("aphys.electronics.logic-gates", { file: "electronics/logic-gates", keyPrefix: "electronics.logic-gates" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which two-input gate gives an output of 1 only when both inputs are 1?",
    options: [
      ["AND", "Correct: all inputs must be 1."],
      ["OR", "OR gives 1 when at least one input is 1."],
      ["NAND", "NAND gives 0 only when both inputs are 1: the opposite of AND."],
      ["EXOR", "EXOR gives 1 only when the inputs differ, so it gives 0 for 1, 1."],
    ],
    answer: "A",
    explanation: "AND: Q = 1 only for A = B = 1.",
  });
  {
    same(col(NOR), "1 0 0 0");
    b.mcq({
      d: 2, skill: "UNDERSTANDING",
      stem: "For the inputs AB = 00, 01, 10, 11 in that order, a gate gives the outputs 1, 0, 0, 0. Which gate is it?",
      options: [
        ["NOR", "Correct: the output is 1 only when no input is 1."],
        ["NAND", "NAND gives 1, 1, 1, 0."],
        ["AND", "AND gives 0, 0, 0, 1."],
        ["NOT", "NOT has only one input."],
      ],
      answer: "A",
      explanation: "NOR = OR inverted: OR gives 0, 1, 1, 1, so NOR gives 1, 0, 0, 0.",
    });
  }
  {
    same(col(XOR), "0 1 1 0");
    b.mcq({
      d: 2, skill: "UNDERSTANDING",
      stem: "For the inputs AB = 00, 01, 10, 11 in that order, a gate gives the outputs 0, 1, 1, 0. Which gate is it?",
      options: [
        ["EXOR", "Correct: the output is 1 when the inputs are different."],
        ["OR", "OR gives 1 for 11 as well: 0, 1, 1, 1."],
        ["NAND", "NAND gives 1 for 00: 1, 1, 1, 0."],
        ["NOR", "NOR gives 1, 0, 0, 0."],
      ],
      answer: "A",
      explanation: "EXOR (exclusive OR): 1 when exactly one input is 1.",
    });
  }
  {
    same(NOR(0, 1), 0);
    b.mcq({
      d: 2, skill: "APPLICATION", daily: true,
      stem: "A two-input NOR gate has input A = 0 and input B = 1. What is its output?",
      options: [
        ["0", "Correct: one input is 1, so OR would give 1 and NOR gives 0."],
        ["1", "NOR gives 1 only when both inputs are 0."],
        ["It depends on the previous output.", "A logic gate's output depends only on its present inputs."],
        ["Half of the logic 1 voltage", "Gate outputs are digital: only 0 or 1."],
      ],
      answer: "A",
      explanation: "NOR(0, 1) = NOT(0 OR 1) = NOT 1 = 0.",
    });
  }
  {
    same(rows2.filter(([a, b]) => a === b).map(([a]) => NAND(a, a)), [1, 0]);
    b.mcq({
      d: 3, skill: "UNDERSTANDING",
      stem: "The two inputs of a NAND gate are joined together and used as a single input. How does the gate now behave?",
      options: [
        ["As a NOT gate", "Correct: inputs 0, 0 give 1 and inputs 1, 1 give 0."],
        ["As an AND gate", "With the inputs always equal, the output is always the inverse of the input, not equal to it."],
        ["As a buffer: the output equals the input", "NAND inverts: 1, 1 gives 0."],
        ["Its output is always 1", "For 1, 1 a NAND gate gives 0."],
      ],
      answer: "A",
      explanation: "Joined inputs are always equal: NAND(0,0) = 1, NAND(1,1) = 0, so it inverts.",
      hints: ["Only the rows 00 and 11 can now occur."],
    });
  }
  {
    same(col((a, c) => NOT(AND(a, c))), col(NAND));
    b.mcq({
      d: 3, skill: "UNDERSTANDING",
      stem: "An AND gate is followed by a NOT gate. Which single gate is this combination equivalent to?",
      options: [
        ["NAND", "Correct: NOT(A AND B) is NAND by definition."],
        ["NOR", "NOR is NOT(A OR B); the outputs differ for AB = 01 and 10."],
        ["OR", "OR gives 0 for 00, but this combination gives 1 for 00."],
        ["EXOR", "EXOR gives 0 for 00, but this combination gives 1."],
      ],
      answer: "A",
      explanation: "The truth tables are identical: 1, 1, 1, 0.",
      hints: ["Invert the AND column."],
    });
  }
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "How many rows does the truth table of a logic circuit with four inputs need?",
    options: [
      ["16", "Correct: 2⁴ = 16 combinations."],
      ["8", "8 = 2³ is for three inputs."],
      ["4", "4 rows covers only two inputs."],
      ["32", "32 = 2⁵ is for five inputs."],
    ],
    answer: "A",
    explanation: "Each input has two states, so n inputs give 2ⁿ combinations: 2⁴ = 16.",
    hints: ["Each input doubles the number of combinations."],
  });
  {
    const q = rows2.map(([a, bb]) => AND(OR(a, bb), a));
    same(q, rows2.map(([a]) => a));
    b.mcq({
      d: 4, skill: "ANALYSIS",
      stem: "Inputs A and B go to an OR gate with output P. P and A go to an AND gate with output Q. Which statement about Q is correct?",
      options: [
        ["Q is always equal to B.", "For AB = 01, P = 1 but A = 0, so Q = 0 while B = 1."],
        ["Q = A OR B", "For AB = 01, A OR B = 1 but Q = 0."],
        ["Q is always equal to A.", "Correct: Q = A·(A + B) gives 0, 0, 1, 1 for AB = 00, 01, 10, 11."],
        ["Q = A AND B", "For AB = 10, P = 1 and A = 1, so Q = 1 while A AND B = 0."],
      ],
      answer: "C",
      explanation: "Truth table: P = 0, 1, 1, 1; Q = AND(P, A) = 0, 0, 1, 1, the same as the A column.",
      hints: ["Write a column for P first."],
    });
  }
  {
    same(rows2.map(([a, bb]) => AND(NOT(a), NOT(bb))), rows2.map(([a, bb]) => NOR(a, bb)));
    b.mcq({
      d: 4, skill: "ANALYSIS",
      stem: t`Which Boolean expression has the same truth table as a NOR gate with inputs A and B?`,
      options: [
        [t`$\overline{A} \cdot \overline{B}$`, "Correct: 1 only when both A and B are 0 (De Morgan's theorem)."],
        [t`$\overline{A} + \overline{B}$`, "This equals NAND: it is 1 for AB = 01."],
        [t`$\overline{A \cdot B}$`, "This is NAND, which is 1 for 01 and 10."],
        [t`$A \oplus B$`, "This is EXOR, which is 0 for 00."],
      ],
      answer: "A",
      explanation: t`De Morgan: $\overline{A + B} = \overline{A} \cdot \overline{B}$; both give 1, 0, 0, 0.`,
      hints: ["Test each expression with the row AB = 01."],
    });
  }
  b.tf({
    d: 2, skill: "RECALL",
    stem: "An OR gate gives an output of 0 when both of its inputs are 1.",
    answer: false,
    explanation: "False. OR gives 1 when at least one input is 1, including when both are. The gate that gives 0 for 1, 1 (and 1 for 01, 10) is EXOR.",
  });
  {
    same([0, 1].map((a) => NOT(NOT(a))), [0, 1]);
    b.tf({
      d: 2, skill: "UNDERSTANDING", daily: true,
      stem: "Two NOT gates connected one after the other give an output that is always the same as the input.",
      answer: true,
      explanation: "True. Inverting twice restores the original state: 0 → 1 → 0 and 1 → 0 → 1.",
    });
  }
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each gate with its output column for the inputs AB = 00, 01, 10, 11.",
    pairs: [
      ["AND", col(AND)],
      ["OR", col(OR)],
      ["NAND", col(NAND)],
      ["EXOR", col(XOR)],
    ],
    explanation: "AND 0 0 0 1; OR 0 1 1 1; NAND 1 1 1 0; EXOR 0 1 1 0.",
  });
  {
    const q = rows2.map(([a, bb]) => NOR(NOT(a), bb));
    same(q, [0, 0, 1, 0]);
    b.fib({
      d: 3, skill: "APPLICATION",
      stem: "Input A passes through a NOT gate to give P. P and input B are the inputs of a NOR gate with output Q. Complete the output column.",
      template: `AB = 00: Q = {{blank:a}}; AB = 01: Q = {{blank:b}}; AB = 10: Q = {{blank:c}}; AB = 11: Q = {{blank:d}}.`,
      blanks: ["a", "b", "c", "d"].map((id, i) => ({ id, accepted: [String(q[i])], choices: ["0", "1"] })),
      explanation: "P = NOT A = 1, 1, 0, 0. Q = NOR(P, B) is 1 only when P = 0 and B = 0, which happens only for AB = 10. So Q = 0, 0, 1, 0 (Q = A AND NOT B).",
      hints: ["Write the P column first."],
    });
  }
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the two-input gate whose output is 1 only when its two inputs are different.",
    accepted: ["EXOR", "exclusive OR", "XOR", "exclusive-OR", "EOR", "EX-OR"],
    explanation: "The exclusive-OR (EXOR) gate.",
  });
  b.num({
    d: 2, skill: "RECALL",
    stem: "What is the smallest number of two-input NAND gates needed to make an OR gate?",
    value: 3, wrong: [2, 4],
    explanation: "Two NAND gates with joined inputs invert A and B; a third NAND gate combines them: NAND(Ā, B̄) = A + B.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 3,
    stem: "Describe how three NOR gates can be connected to make an AND gate, and justify your answer with a truth table described in words.",
    points: [
      "Two NOR gates with their inputs joined act as NOT gates, giving Ā and B̄.",
      "Ā and B̄ are fed into a third NOR gate.",
      "Its output NOR(Ā, B̄) is 1 only when Ā = B̄ = 0, that is when A = B = 1: the AND truth table (0, 0, 0, 1).",
    ],
    modelAnswer: "Join the inputs of one NOR gate and feed it A, and do the same with a second NOR gate fed B: each acts as a NOT gate, giving Ā and B̄. Feed Ā and B̄ into a third NOR gate. Its output is 1 only when both Ā and B̄ are 0, which happens only when A = 1 and B = 1; for AB = 00, 01, 10, 11 the outputs are 0, 0, 0, 1, which is the AND truth table.",
    explanation: "NOR with joined inputs = NOT; NOR of inverted inputs = AND (De Morgan).",
    hints: ["First make a NOT gate from a NOR gate."],
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Describe how you would check the truth table of a two-input logic gate on an integrated circuit in the laboratory.",
    points: [
      "Connect the chip to its 5 V supply; each input through a switch to +5 V (logic 1) or 0 V (logic 0) (with a pull-down resistor).",
      "Connect an LED in series with a resistor (or a logic probe/voltmeter) at the output to show 1 or 0.",
      "Set each of the four input combinations in turn and record the output state in a table.",
    ],
    modelAnswer: "Power the chip from its 5 V supply. Connect each input through a switch so it can be set to +5 V (logic 1) or 0 V (logic 0), with a pull-down resistor so an open switch gives a definite 0. Show the output with an LED and series resistor, or a logic probe. Set the inputs to 00, 01, 10 and 11 in turn and record whether the output is high or low.",
    explanation: "Set every input combination and record the output.",
    hints: ["How will you set a 0 and a 1, and how will you see the output?"],
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Distinguish between an analogue signal and a digital signal, giving an example of each.",
    points: [
      "Analogue: varies continuously and can take any value in a range, e.g. the output of a microphone or thermistor divider.",
      "Digital: takes only discrete values, in logic two states (high/low, 1/0), e.g. the output of a logic gate.",
    ],
    modelAnswer: "An analogue signal varies continuously and can have any value within its range, such as the voltage from a microphone. A digital signal has only a set of separate values, in logic circuits just high (1) and low (0), such as the output of a logic gate.",
    explanation: "Continuous versus discrete.",
  });

  // Practice structured: a three-input circuit (12 marks)
  {
    const q = rows3.map(([a, bb, c]) => OR(NOR(a, bb), AND(bb, c)));
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: false,
      stem: "In a logic circuit, inputs A and B go to a NOR gate with output P. Inputs B and C go to an AND gate with output R. P and R go to an OR gate with output Q.",
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "State the number of rows needed in the truth table.", value: 8, wrong: [6], explanation: "Three inputs: 2³ = 8 rows." }),
        P.fib({
          label: "(b)", stem: "Complete the output Q for each input combination ABC.",
          template: rows3.map(([a, bb, c], i) => `ABC = ${a}${bb}${c}: Q = {{blank:r${i}}}`).join("; ") + ".",
          blanks: q.map((v, i) => ({ id: `r${i}`, accepted: [String(v)], choices: ["0", "1"] })),
          explanation: `P = NOR(A, B) is 1 only when A = B = 0 (rows 000, 001). R = AND(B, C) is 1 only when B = C = 1 (rows 011, 111). Q = P OR R: ${q.join(", ")}.`,
        }),
        P.manual({ label: "(c)", marks: 3, stem: "Write a Boolean expression for Q and describe in words when Q = 1.", points: [
          t`$Q = \overline{A + B} + B \cdot C$.`,
          "Q = 1 when A and B are both 0 (whatever C is) …",
          "… or when B and C are both 1 (whatever A is).",
        ], modelAnswer: t`$Q = \overline{A + B} + B \cdot C$: the output is 1 when A and B are both 0, whatever C is, or when B and C are both 1, whatever A is; otherwise it is 0.` }),
      ],
      explanation: "Work gate by gate with a column for P and R.",
      hints: ["Add columns for P and R before Q."],
    });
    same(q.filter((x) => x === 1).length, 4);
  }
  // Practice structured: four NAND gates (8 marks)
  {
    const q = rows2.map(([a, bb]) => {
      const p = NAND(a, bb);
      return NAND(NAND(a, p), NAND(bb, p));
    });
    same(q, rows2.map(([a, bb]) => XOR(a, bb)));
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: false,
      stem: "Inputs A and B go to NAND gate 1 with output P. A and P go to NAND gate 2 with output R; B and P go to NAND gate 3 with output S. R and S go to NAND gate 4 with output Q.",
      parts: [
        P.fib({
          label: "(a)", stem: "Complete the output Q for each input combination AB.",
          template: rows2.map(([a, bb], i) => `AB = ${a}${bb}: Q = {{blank:r${i}}}`).join("; ") + ".",
          blanks: q.map((v, i) => ({ id: `r${i}`, accepted: [String(v)], choices: ["0", "1"] })),
          explanation: `P = 1, 1, 1, 0; R = NAND(A, P) = 1, 1, 0, 1; S = NAND(B, P) = 1, 0, 1, 1; Q = NAND(R, S) = ${q.join(", ")}.`,
        }),
        P.short({ label: "(b)", marks: 1, stem: "Name the single gate to which this circuit is equivalent.", accepted: ["EXOR", "exclusive OR", "XOR", "exclusive-OR", "EX-OR"], explanation: "Q = 0, 1, 1, 0: an exclusive-OR gate." }),
        P.manual({ label: "(c)", marks: 3, stem: "Suggest why circuits are often built from NAND gates only, and describe how one NAND gate can act as a NOT gate.", points: [
          "NAND is universal: any logic function can be made from NAND gates alone.",
          "One chip type is cheaper to make/stock and simplifies manufacture (spare gates on a chip can be used).",
          "Joining the two inputs: 00 gives 1 and 11 gives 0, so the gate inverts.",
        ], modelAnswer: "NAND is a universal gate, so any function can be built from it alone; using one chip type is cheaper to produce and stock, and spare gates on a chip can be used elsewhere. A NAND gate with its two inputs joined acts as a NOT gate, because 0, 0 gives 1 and 1, 1 gives 0." }),
      ],
      explanation: "Four NAND gates in this arrangement form an exclusive-OR gate.",
      hints: ["Find P first, then R and S."],
    });
  }

  b.card("DEFINITION", "**Logic gate**", "A circuit whose digital output depends only on the present states of its inputs according to a fixed rule.");
  b.card("DEFINITION", "**Truth table**", "A list of every input combination (2ⁿ rows for n inputs) with the output for each.");
  b.card("FACT", "Two-input gate outputs (AB = 00, 01, 10, 11)", `AND ${col(AND)}; OR ${col(OR)}; NAND ${col(NAND)}; NOR ${col(NOR)}; EXOR ${col(XOR)}.`);
  b.card("FORMULA", "Boolean notation", t`NOT $\overline{A}$; AND $A \cdot B$; OR $A + B$; NAND $\overline{A \cdot B}$; NOR $\overline{A + B}$; EXOR $A \oplus B$.`);
  b.card("CONCEPT", "Analysing a combination", "Label each gate output, add a column for each, work from inputs to output.");
  b.card("CONCEPT", "NOT from NAND or NOR", "Join the two inputs: the gate inverts.");
  b.card("CONCEPT", "OR from NAND", "Invert A and B with two NAND-as-NOT gates, then NAND them: NAND(Ā, B̄) = A + B (3 gates).");
  b.card("FORMULA", "De Morgan's theorem", t`$\overline{A \cdot B} = \overline{A} + \overline{B}$ and $\overline{A + B} = \overline{A} \cdot \overline{B}$`);
  b.card("DEFINITION", "**Universal gate**", "A gate type from which every other logic function can be built: NAND and NOR.");
});
