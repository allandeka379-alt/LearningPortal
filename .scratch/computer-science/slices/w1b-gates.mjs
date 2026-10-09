// Slice w1b: logic gates (comp.logic.gates).
import { concept, P, L, truthRows } from "../lib.mjs";

const pattern = (f) => truthRows(["A", "B"], f).map((r) => r.out).join("");

concept("comp.logic.gates", { file: "logic/gates", keyPrefix: "logic.gates" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which logic gate has only **one** input?",
    options: [
      ["NOT", "Correct: NOT (the inverter) takes a single input and outputs its opposite."],
      ["NOR", "NOR has two inputs: it is OR followed by NOT."],
      ["NAND", "NAND has two inputs: it is AND followed by NOT."],
      ["XOR", "XOR compares two inputs, so it needs two."],
    ],
    answer: "A",
    explanation: "NOT is the only single-input gate. AND, OR, NAND, NOR and XOR each have two inputs in the examination.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "A logic gate symbol is a \"D\" shape with a flat back and a rounded front, with a small circle at the output. Which gate is it?",
    options: [
      ["NAND", "Correct: the D shape is AND, and the small circle (bubble) inverts the output, giving NAND."],
      ["AND", "Plain AND has no bubble at its output."],
      ["NOR", "NOR uses the curved OR shape, not the D shape, with a bubble."],
      ["NOT", "NOT is a triangle with a bubble at its tip, not a D shape."],
    ],
    answer: "A",
    explanation: "The D shape is the AND gate. A bubble at the output means the result is inverted, so the symbol is NAND = NOT (A AND B).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How does the XOR symbol differ from the OR symbol?",
    options: [
      ["It has an extra curved line behind the back of the OR shape", "Correct: the separate curved line across the inputs marks exclusive OR."],
      ["It has a small circle at the output of the OR shape", "A circle at the output makes NOR, not XOR."],
      ["It has a flat back instead of a curved back", "A flat back with a rounded front is the AND (D) shape."],
      ["It is a triangle with a small circle at its point", "That describes the NOT gate."],
    ],
    answer: "A",
    explanation: "XOR is drawn as the OR shape with an extra curved line just behind its back. A bubble at the output belongs to NAND and NOR.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A two-input gate gives the outputs 1, 0, 0, 0 for the inputs 00, 01, 10, 11 (in that order). Which gate is it?",
    options: [
      ["NOR", `Correct: NOR's pattern is ${pattern(L.nor)}; the output is 1 only when both inputs are 0.`],
      ["NAND", `NAND's pattern is ${pattern(L.nand)}: it is 0 only when both inputs are 1.`],
      ["AND", `AND's pattern is ${pattern(L.and)}: it is 1 only when both inputs are 1.`],
      ["XOR", `XOR's pattern is ${pattern(L.xor)}: it is 1 when the inputs differ.`],
    ],
    answer: "A",
    explanation: `Compare with the patterns: AND ${pattern(L.and)}, OR ${pattern(L.or)}, NAND ${pattern(L.nand)}, NOR ${pattern(L.nor)}, XOR ${pattern(L.xor)}. The pattern 1000 is NOR.`,
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "For which pair of inputs do an OR gate and an XOR gate give **different** outputs?",
    options: [
      ["A = 1, B = 1", `Correct: OR gives ${L.or(1, 1)} but XOR gives ${L.xor(1, 1)} when both inputs are 1.`],
      ["A = 0, B = 0", `Both gates give ${L.or(0, 0)} when both inputs are 0.`],
      ["A = 0, B = 1", `Both gates give ${L.or(0, 1)} when exactly one input is 1.`],
      ["A = 1, B = 0", `Both gates give ${L.or(1, 0)} when exactly one input is 1.`],
    ],
    answer: "A",
    explanation: "OR and XOR agree in every row except the last: OR is 1 when both inputs are 1 (inclusive), XOR is 0 there because the inputs are the same (exclusive).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which statement describes the function of a NAND gate?",
    options: [
      ["The output is 0 only when both inputs are 1", "Correct: NAND is NOT AND, so it inverts the single 1 of AND."],
      ["The output is 1 only when both inputs are 1", "That describes AND, not NAND."],
      ["The output is 1 only when both inputs are 0", "That describes NOR."],
      ["The output is 1 only when the inputs differ", "That describes XOR."],
    ],
    answer: "A",
    explanation: `NAND = NOT (A AND B). AND is 1 only for inputs 11, so NAND is 0 only for 11 and 1 otherwise (pattern ${pattern(L.nand)}).`,
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A security light at a shop in Mutare must come on when it is dark (A = 1) **or** movement is detected (B = 1), but a test showed it was wired so that it came on only when **exactly one** of these was true. Which gate was wrongly used, and which gate should replace it?",
    options: [
      ["XOR was used; it should be OR", "Correct: \"exactly one\" is XOR; \"either or both\" is OR."],
      ["OR was used; it should be XOR", "This is the wrong way round: the faulty behaviour (exactly one) is XOR."],
      ["AND was used; it should be OR", "AND would light only when both are true, not when exactly one is true."],
      ["NOR was used; it should be OR", "NOR would light only when neither condition is true."],
    ],
    answer: "A",
    hints: ["Which gate outputs 1 when exactly one input is 1?", "Which gate also outputs 1 when both inputs are 1?"],
    explanation: "Lighting when exactly one input is 1 is the XOR rule. The requirement \"dark or movement (or both)\" is the OR rule, so the XOR gate must be replaced by an OR gate.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Input A is connected to both inputs of a two-input NAND gate (the two inputs are joined together). Which single gate behaves in the same way?",
    options: [
      ["NOT", `Correct: with both inputs equal to A, the output is NOT (A AND A) = NOT A. For A = 0 the output is ${L.nand(0, 0)}; for A = 1 it is ${L.nand(1, 1)}.`],
      ["AND", "AND with both inputs equal to A simply outputs A; the NAND's inversion is ignored here."],
      ["NAND", "NAND needs two independent inputs; with one signal it behaves as a simpler gate."],
      ["OR", "OR with both inputs equal to A outputs A, not its opposite."],
    ],
    answer: "A",
    hints: ["Only the rows 00 and 11 of the NAND truth table can happen.", "Read the NAND output for those two rows."],
    explanation: `Only the rows A = B = 0 (output ${L.nand(0, 0)}) and A = B = 1 (output ${L.nand(1, 1)}) are possible, so the output is always the opposite of A: a NOT gate. This is why any gate can be built from NAND gates alone.`,
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "An OR gate outputs 1 when both of its inputs are 1.",
    answer: true,
    explanation: `True. OR gives 1 when at least one input is 1, including when both are (1 OR 1 = ${L.or(1, 1)}). The gate that gives 0 when both inputs are 1 is XOR.`,
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A NOR gate gives the same outputs as an OR gate followed by a NOT gate.", daily: true,
    answer: true,
    explanation: "True. NOR means NOT OR: `A NOR B` = `NOT (A OR B)`. Each output of OR is inverted.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A truth table for a gate with three inputs needs six rows.",
    answer: false,
    explanation: "False. Each extra input doubles the number of combinations: three inputs give $2^3 = 8$ rows (000 to 111).",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each gate to its output pattern for the inputs 00, 01, 10, 11 (in that order).",
    pairs: [["AND", pattern(L.and)], ["OR", pattern(L.or)], ["NAND", pattern(L.nand)], ["NOR", pattern(L.nor)], ["XOR", pattern(L.xor)]],
    explanation: `AND ${pattern(L.and)}, OR ${pattern(L.or)}, NAND ${pattern(L.nand)} (opposite of AND), NOR ${pattern(L.nor)} (opposite of OR), XOR ${pattern(L.xor)} (1 when the inputs differ).`,
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each symbol description to its gate.",
    pairs: [
      ["Triangle with a small circle at its point", "NOT"],
      ["D shape with a flat back, no circle", "AND"],
      ["Curved shield shape with a circle at the output", "NOR"],
      ["Curved shield shape with an extra curved line behind it", "XOR"],
    ],
    explanation: "NOT is a triangle with a bubble; AND is the D shape; the OR shield with a bubble is NOR; the OR shield with an extra curved line at the back is XOR.",
  });
  b.truth({
    d: 2, skill: "APPLICATION",
    stem: "Complete the truth table for a NOR gate, `X = A NOR B`.",
    inputs: ["A", "B"],
    fn: L.nor,
    explanation: `NOR is the opposite of OR: OR gives ${pattern(L.or)}, so NOR gives ${pattern(L.nor)}. The output is 1 only when both inputs are 0.`,
  });
  b.truth({
    d: 2, skill: "APPLICATION",
    stem: "Complete the truth table for an XOR gate, `X = A XOR B`.",
    inputs: ["A", "B"],
    fn: L.xor,
    explanation: `XOR outputs 1 when the inputs are different: ${pattern(L.xor)}.`,
  });
  b.fib({
    d: 2, skill: "APPLICATION",
    stem: "Choose the output of each gate.",
    template: "1 AND 0 = {{blank:a}}\n\n1 NAND 0 = {{blank:b}}\n\n0 NOR 0 = {{blank:c}}\n\n1 XOR 1 = {{blank:d}}",
    blanks: [
      { id: "a", accepted: [String(L.and(1, 0))], choices: ["0", "1"] },
      { id: "b", accepted: [String(L.nand(1, 0))], choices: ["0", "1"] },
      { id: "c", accepted: [String(L.nor(0, 0))], choices: ["0", "1"] },
      { id: "d", accepted: [String(L.xor(1, 1))], choices: ["0", "1"] },
    ],
    explanation: `AND needs both inputs 1, so 1 AND 0 = ${L.and(1, 0)}; NAND inverts that, ${L.nand(1, 0)}; NOR is 1 only when both inputs are 0, so 0 NOR 0 = ${L.nor(0, 0)}; XOR is 0 when the inputs are the same, so 1 XOR 1 = ${L.xor(1, 1)}.`,
  });
  b.short({
    d: 2, skill: "APPLICATION",
    stem: "A two-input gate outputs 1 in exactly three of the four rows of its truth table, and outputs 0 when both inputs are 1. Name the gate.",
    accepted: ["NAND", "NAND gate", "a NAND gate"],
    wrong: ["OR", "XOR"],
    explanation: `NAND (pattern ${pattern(L.nand)}) is 1 in three rows and 0 only for 11. OR (${pattern(L.or)}) is also 1 in three rows but is 0 for 00, not 11.`,
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    hints: ["Say when the output is 1.", "Compare it with OR."],
    stem: "Describe the function of an XOR gate. [2]",
    points: ["The output is 1 when exactly one input is 1 / when the inputs are different", "The output is 0 when both inputs are the same (both 0 or both 1)"],
    modelAnswer: "An XOR gate has two inputs. Its output is 1 when the inputs are different (one is 0 and the other is 1) and 0 when they are the same.",
    explanation: "XOR is exclusive OR: it differs from OR only when both inputs are 1, where XOR gives 0.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true,
    hints: ["Write the four input rows in binary order: 00, 01, 10, 11.", "A bubble on a symbol inverts the output."],
    stem: "A school laboratory has a box of gates. Gate P is drawn as an OR shape with a small circle at its output. Gate Q is drawn as an OR shape with an extra curved line behind its back.",
    parts: [
      P.short({ label: "(a)", stem: "Name gate P.", accepted: ["NOR", "NOR gate"], wrong: ["OR"], explanation: "The OR shape with a bubble is NOR." }),
      P.short({ label: "(b)", stem: "Name gate Q.", accepted: ["XOR", "EOR", "XOR gate", "EOR gate", "exclusive OR", "exclusive OR gate"], wrong: ["OR"], explanation: "The extra curved line marks exclusive OR (XOR, also written EOR)." }),
      P.truth({ label: "(c)", marks: 2, stem: "Complete the truth table for gate Q.", inputs: ["A", "B"], fn: L.xor, explanation: `XOR: ${pattern(L.xor)}.` }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain how the output of gate P is related to the output of an OR gate with the same inputs.", points: ["NOR output is the inverse / opposite of the OR output for every input combination", "So NOR is 1 only when both inputs are 0 (where OR is 0)"], modelAnswer: "Gate P (NOR) always gives the opposite of an OR gate: when OR gives 1, NOR gives 0. NOR is 1 only for inputs 0 and 0." }),
    ],
    explanation: "A bubble at the output inverts the gate; an extra curved line at the back of the OR shape makes XOR.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    hints: ["Work out which inputs give an output of 1 for each gate.", "\"Both buttons\" is AND; \"neither\" is NOR."],
    stem: "A printing machine at a factory in Bulawayo has two safety buttons, A and B (1 = pressed). An engineer is choosing single gates for three different signals.",
    parts: [
      P.mcq({ label: "(a)", stem: "The machine may start only when both buttons are pressed. Which gate is needed?", options: [["AND", "Correct: output 1 only for 11."], ["OR", "OR would start the machine with one button."], ["XOR", "XOR is 0 when both are pressed."], ["NAND", "NAND is 0 when both are pressed."]], answer: "A", explanation: "Both inputs must be 1: AND." }),
      P.mcq({ label: "(b)", stem: "A green \"ready\" lamp must be on only when neither button is pressed. Which gate is needed?", options: [["NOR", "Correct: output 1 only for 00."], ["NAND", "NAND is 1 in three rows."], ["NOT", "NOT has only one input."], ["AND", "AND is 1 only for 11."]], answer: "A", explanation: "Output 1 only when both inputs are 0: NOR." }),
      P.mcq({ label: "(c)", stem: "A fault lamp must be on when exactly one button is pressed (a sign that an operator is reaching into the machine). Which gate is needed?", options: [["XOR", "Correct: output 1 when the inputs differ."], ["OR", "OR would also light when both are pressed."], ["NOR", "NOR lights when neither is pressed."], ["AND", "AND lights only when both are pressed."]], answer: "A", explanation: "Exactly one input is 1: XOR." }),
      P.truth({ label: "(d)", marks: 2, stem: "Complete the truth table for the gate chosen in (b).", inputs: ["A", "B"], fn: L.nor, explanation: `NOR: ${pattern(L.nor)}.` }),
      P.manual({ label: "(e)", marks: 3, stem: "Explain why an OR gate would be unsafe for the start signal in (a).", points: ["OR outputs 1 when only one button is pressed", "so the machine could start while the operator's other hand is free / near the machine", "AND needs both buttons pressed, so both hands are away from the moving parts (the two-hand safety purpose)"], modelAnswer: "An OR gate gives 1 when either button is pressed, so the machine could start with one hand still free to be caught; AND needs both hands on the buttons." }),
    ],
    explanation: "Translate the words: \"both\" → AND, \"neither\" → NOR, \"exactly one\" → XOR, \"either or both\" → OR.",
  });

  b.card("DEFINITION", "What is a **logic gate**?", "An electronic component that applies one logical rule to one or two binary inputs and gives a single binary output.");
  b.card("FACT", "Which gate has only one input?", "NOT (the inverter): its output is the opposite of its input.");
  b.card("CONCEPT", "AND gate: when is the output 1?", "Only when both inputs are 1 (pattern 0001 for 00, 01, 10, 11).");
  b.card("CONCEPT", "OR gate: when is the output 1?", "When at least one input is 1, including both (pattern 0111).");
  b.card("CONCEPT", "XOR gate: when is the output 1?", "When the inputs are different (pattern 0110). It is 0 when both are 1.");
  b.card("CONCEPT", "NAND and NOR in one line each", "NAND = NOT (A AND B), pattern 1110. NOR = NOT (A OR B), pattern 1000.");
  b.card("FACT", "What does a small circle (bubble) at a gate's output mean?", "The output is inverted: AND + bubble = NAND, OR + bubble = NOR, triangle + bubble = NOT.");
  b.card("FACT", "How is the XOR symbol drawn?", "The OR (shield) shape with an extra curved line just behind its back, across the inputs.");
  b.card("FORMULA", "Number of rows in a truth table with *n* inputs", "$2^n$: 2, 4 or 8 rows for 1, 2 or 3 inputs, listed in binary order.");
});
