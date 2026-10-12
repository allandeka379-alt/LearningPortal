// W1a: logic gates and truth tables. Both boards; XNOR is ZIMSEC detail.
import { concept, P, ZIM, L, truthRows, truthTableMd, equivalent, mdTable, chk, same } from "../lib.mjs";

concept("acs.logic.gates-truth-tables", { file: "logic/gates-truth-tables", keyPrefix: "logic.gates-truth-tables" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the output of an AND gate when input A is 1 and input B is 0?",
    options: [
      ["0", "Correct: an AND gate gives 1 only when both inputs are 1."],
      ["1", "That would be the output of an OR gate."],
      ["10", "A gate output is a single bit."],
      ["It depends on the order of the inputs", "The inputs of an AND gate are interchangeable."],
    ],
    answer: "A",
    explanation: "AND is 1 only when both inputs are 1, so 1 AND 0 = 0.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which gate produces an output of 1 only when both of its inputs are 0?",
    options: [
      ["NOR", "Correct: NOR is OR followed by NOT, so it is 1 only for inputs 00."],
      ["NAND", "NAND gives 0 only when both inputs are 1."],
      ["XOR", "XOR gives 0 when both inputs are 0."],
      ["OR", "OR gives 0 when both inputs are 0."],
    ],
    answer: "A",
    explanation: "OR gives 0 only for 00; inverting it gives NOR, which is 1 only for 00.",
  });
  b.truth({
    d: 2, skill: "APPLICATION",
    stem: "Complete the truth table for an XOR gate with inputs A and B and output X.",
    inputs: ["A", "B"], fn: L.xor,
    explanation: "XOR gives 1 when the two inputs are different (01 and 10), and 0 when they are the same.",
  });
  b.truth({
    d: 2, skill: "APPLICATION",
    stem: "Complete the truth table for a NAND gate with inputs A and B and output X.",
    inputs: ["A", "B"], fn: L.nand,
    explanation: "NAND is the opposite of AND: it gives 0 only when both inputs are 1.",
  });
  {
    const f = (a, bb) => L.or(L.nor(a, bb), L.and(a, bb));
    chk(equivalent(["A", "B"], f, L.xnor) ? 1 : 0, 1);
    b.truth({
      d: 3, skill: "APPLICATION",
      stem: "A circuit has two inputs, A and B. A NOR gate and an AND gate each receive both A and B. Their outputs go into an OR gate whose output is X. This is `X = (A NOR B) OR (A AND B)`. Complete the truth table.",
      inputs: ["A", "B"], fn: f,
      hints: ["Work out the output of the NOR gate and of the AND gate for each row first.", "X is 1 if either of them is 1."],
      explanation: "The NOR gate is 1 for 00 and the AND gate is 1 for 11, so X is 1 for 00 and 11, i.e. when the inputs are the same (an XNOR).",
    });
  }
  b.truth({
    d: 2, skill: "APPLICATION", applies: ZIM,
    stem: "Complete the truth table for an XNOR gate with inputs A and B and output X.",
    inputs: ["A", "B"], fn: L.xnor,
    explanation: "XNOR is XOR followed by NOT: it gives 1 when the two inputs are the same.",
  });
  {
    const unk = L.nand;
    const table = truthTableMd(["A", "B"], [["X", unk]]);
    b.mcq({
      d: 3, skill: "ANALYSIS",
      stem: `A gate has this truth table:\n\n${table}\n\nWhich gate is it?`,
      options: [["NAND", "Correct: the output is 0 only when both inputs are 1."], ["AND", "AND is 1 only for 11, the opposite of this table."], ["OR", "OR is 0 only for 00."], ["XOR", "XOR is 0 for both 00 and 11."]],
      answer: "A",
      hints: ["Find the row in which the output differs from the other three."],
      explanation: "Three 1s with a single 0 in the row 11 is the pattern of a NAND gate.",
    });
  }
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A NOT gate has two inputs.",
    answer: false,
    feedbackTrue: "A NOT gate (inverter) has only one input.",
    feedbackFalse: "Correct: a NOT gate has one input and one output.",
    explanation: "NOT inverts its single input, so its truth table has two rows.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: "A logic circuit has three inputs. How many rows are there in its complete truth table?",
    value: 8,
    workedSolution: "1. Each input can be 0 or 1.\n2. Rows = 2 × 2 × 2 = 2^3 = 8.",
    explanation: "A truth table has 2^n rows for n inputs: 2^3 = 8.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which gate gives an output of 1 only when its two inputs are different?",
    options: [
      ["XOR", "Correct: exclusive OR is 1 for 01 and 10 only."],
      ["OR", "OR also gives 1 when both inputs are 1."],
      ["AND", "AND is 1 only when both inputs are 1."],
      ["NOR", "NOR is 1 only when both inputs are 0."],
    ],
    answer: "A",
    explanation: "XOR means one or the other but not both.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each gate to its output rule.",
    pairs: [
      ["AND", "1 only when both inputs are 1"],
      ["OR", "1 when at least one input is 1"],
      ["NOR", "1 only when both inputs are 0"],
      ["NAND", "0 only when both inputs are 1"],
    ],
    extraRight: ["1 only when the inputs are different"],
    explanation: "NOR and NAND are the inverses of OR and AND. The unused option describes XOR.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Both inputs of a NAND gate are connected to the same signal A. What does the gate now do?",
    options: [
      ["It acts as a NOT gate", "Correct: A NAND A is 0 when A is 1 and 1 when A is 0."],
      ["It acts as an AND gate", "AND of a signal with itself would just repeat A."],
      ["It always outputs 0", "The output depends on A."],
      ["It always outputs 1", "The output is 0 when A is 1."],
    ],
    answer: "A",
    hints: ["Write the NAND truth table and keep only the rows where the two inputs are equal."],
    explanation: "For A = 0 the inputs are 00 so the output is 1; for A = 1 the inputs are 11 so the output is 0. That is NOT A.",
  });
  {
    const vals = [1, 0, 1];
    const [a, bb, c] = vals;
    const x = L.or(L.and(a, bb), c);
    b.num({
      d: 2, skill: "APPLICATION", calculator: false,
      stem: `A circuit is described by \`X = (A AND B) OR C\`. Find the value of X when A = ${a}, B = ${bb} and C = ${c}.`,
      value: x,
      workedSolution: `1. A AND B = ${a} AND ${bb} = ${L.and(a, bb)}.\n2. (A AND B) OR C = ${L.and(a, bb)} OR ${c} = ${x}.`,
      explanation: `${a} AND ${bb} = ${L.and(a, bb)}, then ${L.and(a, bb)} OR ${c} = ${x}.`,
    });
  }
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Choose the gate that gives the behaviour described.",
    template: "A buzzer sounds only when a door is open AND the system is armed: use an {{blank:g1}} gate. A lamp must be on when at least one of two switches is pressed: use an {{blank:g2}} gate. A light must go off when a sensor is on: use a {{blank:g3}} gate.",
    blanks: [
      { id: "g1", choices: ["AND", "OR", "NOT", "XOR"], accepted: ["AND"] },
      { id: "g2", choices: ["AND", "OR", "NOT", "XOR"], accepted: ["OR"] },
      { id: "g3", choices: ["AND", "OR", "NOT", "XOR"], accepted: ["NOT"] },
    ],
    hints: ["Which gate needs both inputs? Which needs at least one? Which reverses a signal?"],
    explanation: "Both conditions needed: AND. At least one of two: OR. Reverse the sensor signal: NOT.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the gate whose output is the opposite of an OR gate for every combination of inputs.",
    accepted: ["NOR", "NOR gate"],
    wrong: ["NAND"],
    explanation: "NOR is OR followed by NOT, so its output is always the opposite of OR.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why NAND is called a universal gate.",
    points: [
      "Any other logic gate (NOT, AND, OR, and so on) can be built using only NAND gates.",
      "For example, joining both inputs of a NAND gate gives a NOT gate.",
      "A circuit can therefore be manufactured from one kind of gate only.",
    ],
    modelAnswer: "A NAND gate can be used to make every other gate. For example, with both inputs joined it behaves as a NOT gate, and a NAND followed by a NOT gives AND. So a whole circuit can be built using only NAND gates.",
    hints: ["Give an example of how one gate is built from NAND gates."],
    explanation: "The universal property makes manufacturing simpler.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "State the difference between the outputs of an OR gate and an XOR gate, using the inputs 1 and 1 as part of your answer.",
    points: [
      "An OR gate gives 1 if either input, or both, is 1.",
      "An XOR gate gives 1 only if exactly one input is 1 (the inputs differ).",
      "For inputs 1 and 1, OR gives 1 but XOR gives 0.",
    ],
    modelAnswer: "OR gives 1 when at least one input is 1. XOR gives 1 only when the inputs are different. For 1 and 1, OR outputs 1 but XOR outputs 0.",
    hints: ["Say what happens to each gate when both inputs are 1."],
    explanation: "The row 11 is the one place where OR and XOR differ.",
  });
  b.manualShort({
    d: 2, skill: "APPLICATION", marks: 2,
    stem: "A pump at a borehole in Hwange must run only when the tank is low (A = 1) and the power is on (B = 1). State the gate to use and justify it.",
    points: ["An AND gate.", "The output is 1 (pump runs) only when both inputs are 1."],
    modelAnswer: "An AND gate, because the pump should run only when both conditions are true, and an AND gate outputs 1 only when both inputs are 1.",
    explanation: "Both conditions must hold, which is the AND rule.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Show how an OR gate can be made from three NAND gates. Describe how they are connected.",
    points: [
      "Input A goes to both inputs of the first NAND gate (giving NOT A).",
      "Input B goes to both inputs of the second NAND gate (giving NOT B).",
      "The outputs of these two gates go into the third NAND gate, whose output is A OR B.",
    ],
    modelAnswer: "Join both inputs of one NAND gate to A and both inputs of a second NAND gate to B; these give NOT A and NOT B. Connect those two outputs to the two inputs of a third NAND gate; its output is (NOT A) NAND (NOT B) = A OR B.",
    hints: ["Invert each input first, then combine them."],
    explanation: "By De Morgan's laws, NOT(NOT A AND NOT B) = A OR B.",
  });
  {
    b.struct({
      d: 3, skill: "APPLICATION", examStyle: true, secs: 480,
      stem: "A security light in Kariba is controlled by two sensors, A (daylight sensor, 1 = bright) and B (movement sensor, 1 = movement detected). The light output X must be 1 only when it is dark (A = 0) and there is movement (B = 1).",
      parts: [
        P.mcq({ label: "(a)", marks: 1, stem: "What is the logic expression for X?", options: [["X = (NOT A) AND B", "Correct: dark means NOT A, and movement is B, and both are needed."], ["X = A AND B", "This would switch the light on in daylight."], ["X = A OR B", "This would switch it on if either condition is true."], ["X = NOT (A AND B)", "This is 1 for most input combinations, not only for the dark-with-movement case."]], answer: "A", explanation: "Both conditions must hold: dark (NOT A) AND movement (B)." }),
        P.truth({ label: "(b)", marks: 4, stem: "Complete the truth table for X.", inputs: ["A", "B"], fn: (a, bb) => L.and(L.not(a), bb), explanation: "X is 1 only in the row A = 0, B = 1." }),
        P.manual({ label: "(c)", marks: 1, stem: "Name the two kinds of gate needed.", points: ["A NOT gate and an AND gate."], modelAnswer: "A NOT gate (to invert A) and an AND gate." }),
      ],
      hints: ["Dark means the daylight sensor is 0.", "Write the expression before the table."],
      explanation: "X = (NOT A) AND B is 1 only when A = 0 and B = 1.",
    });
  }
  {
    const f = (a, bb) => L.and(L.or(a, bb), L.nand(a, bb));
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, secs: 600,
      stem: "A circuit has two inputs, A and B. Input A and input B go into an OR gate (output P) and also into a NAND gate (output Q). The outputs P and Q go into an AND gate whose output is X.",
      parts: [
        P.mcq({ label: "(a)", marks: 1, stem: "Which expression describes X?", options: [["X = (A OR B) AND (A NAND B)", "Correct: P = A OR B, Q = A NAND B and X = P AND Q."], ["X = (A AND B) OR (A NOR B)", "This swaps the gates."], ["X = (A OR B) NAND (A AND B)", "The second gate is NAND with A and B, not with P."], ["X = NOT (A OR B)", "This ignores the second gate."]], answer: "A", explanation: "Follow each gate from the inputs to the output." }),
        P.truth({ label: "(b)", marks: 4, stem: "Complete the truth table for X.", inputs: ["A", "B"], fn: f, explanation: "P = A OR B, Q = A NAND B; X = P AND Q is 1 when the inputs differ." }),
        P.short({ label: "(c)", marks: 1, stem: "Which single gate behaves in the same way as this circuit?", accepted: ["XOR", "XOR gate", "exclusive OR"], explanation: "The table shows 1 only when the inputs are different, which is XOR." }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain how you know that the circuit and your answer to part (c) behave in the same way.", points: ["Their truth tables are compared.", "The output column of the circuit is identical to the output column of a single XOR gate in every row."], modelAnswer: "Write the truth table of an XOR gate and compare it with the table in part (b): the outputs are the same for every combination of inputs." }),
      ],
      hints: ["Find P and Q for each row, then X.", "Which gate is 1 only for 01 and 10?"],
      explanation: "The circuit gives 1 only when exactly one input is 1, so it is equivalent to XOR.",
    });
  }

  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "The two inputs of a NOR gate are both 0. What is the output?",
    options: [
      ["1", "Correct: NOR is 1 only when both inputs are 0."],
      ["0", "That would be the output of an OR gate for these inputs."],
      ["Undefined", "A gate with valid inputs always gives a defined output."],
      ["It depends on the previous output", "A gate has no memory; only flip-flops do."],
    ],
    answer: "A",
    explanation: "OR of 0 and 0 is 0, and NOR inverts it to 1.",
  });

  b.card("DEFINITION", "Truth table", "A table of all combinations of inputs of a gate or circuit with the output for each; n inputs give 2^n rows.");
  b.card("FACT", "AND gate", "Output 1 only when both inputs are 1.");
  b.card("FACT", "OR gate", "Output 1 when at least one input is 1 (0 only for 00).");
  b.card("FACT", "NAND gate and NOR gate", "NAND is AND followed by NOT (0 only for 11). NOR is OR followed by NOT (1 only for 00).");
  b.card("FACT", "XOR gate", "Output 1 when the two inputs are different (01 and 10).");
  b.card("FACT", "XNOR gate (ZIMSEC)", "XOR followed by NOT: output 1 when the two inputs are the same.", undefined, { applies: ZIM });
  b.card("DEFINITION", "Universal gate", "A gate that can build every other gate. NAND and NOR are universal.");
  b.card("CONCEPT", "NOT gate from a NAND gate", "Join both inputs together: A NAND A = NOT A.");
  b.card("CONCEPT", "How to complete the truth table of a circuit", "Add a column for the output of each gate, from the inputs towards the final output, and fill it in column by column.");
});
