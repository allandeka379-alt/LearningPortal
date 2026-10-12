// W1a: half adders, full adders and flip-flops. Cambridge A Level only.
import { concept, P, L, truthRows, toBase, fromBase, chk, same } from "../lib.mjs";

const fullS = (a, b, c) => L.xor(L.xor(a, b), c);
const fullC = (a, b, c) => L.or(L.and(a, b), L.and(c, L.xor(a, b)));
function ripple(xs, ys) {
  let carry = 0;
  const rows = [];
  for (let i = xs.length - 1; i >= 0; i--) {
    const a = Number(xs[i]), b = Number(ys[i]);
    const s = fullS(a, b, carry), co = fullC(a, b, carry);
    rows.push({ pos: xs.length - 1 - i, a, b, cin: carry, s, co });
    carry = co;
  }
  return { rows, sum: rows.map((r) => r.s).reverse().join(""), carryOut: carry };
}
function srRun(seq, q0 = 0) {
  let q = q0, qb = 1 - q0;
  const out = [];
  for (const [s, r] of seq) {
    for (let i = 0; i < 6; i++) {
      const nq = L.nor(r, qb);
      const nqb = L.nor(s, nq);
      q = nq;
      qb = nqb;
    }
    out.push(q);
  }
  return out;
}

concept("acs.logic.adders-flip-flops", { file: "logic/adders-flip-flops", keyPrefix: "logic.adders-flip-flops" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which logic gate produces the sum bit of a half adder?",
    options: [
      ["XOR", "Correct: the sum of two bits is 1 only when exactly one of them is 1."],
      ["AND", "AND produces the carry bit."],
      ["OR", "OR would give a sum of 1 for 1 + 1, which should be 0 with a carry."],
      ["NOR", "NOR is 1 only when both inputs are 0."],
    ],
    answer: "A",
    explanation: "A half adder has an XOR gate for the sum and an AND gate for the carry.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which logic gate produces the carry bit of a half adder?",
    options: [
      ["AND", "Correct: a carry is generated only when both bits are 1."],
      ["XOR", "XOR produces the sum bit."],
      ["NAND", "NAND is 0 when both inputs are 1, the opposite of the carry."],
      ["OR", "OR would give a carry for 0 + 1."],
    ],
    answer: "A",
    explanation: "1 + 1 = 10 in binary: the carry bit is 1 only when both inputs are 1, which is AND.",
  });
  b.truth({
    d: 2, skill: "APPLICATION",
    stem: "Complete the truth table for the **sum** output S of a half adder with inputs A and B.",
    inputs: ["A", "B"], fn: L.xor, out: "S",
    explanation: "The sum is 1 when exactly one input is 1: S = A XOR B.",
  });
  b.truth({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A full adder has inputs A, B and Cin. Complete the truth table for the carry out, Cout.",
    inputs: ["A", "B", "Cin"], fn: fullC, out: "Cout",
    hints: ["Cout is 1 when at least two of the three inputs are 1.", "Check each row by adding the three bits."],
    explanation: "Cout is the carry of A + B + Cin: it is 1 when two or three of the inputs are 1.",
  });
  {
    const [a, bb, c] = [1, 1, 1];
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: false,
      stem: `A full adder has inputs A = ${a}, B = ${bb} and carry in = ${c}. What is the sum output S?`,
      value: fullS(a, bb, c),
      workedSolution: `1. ${a} + ${bb} + ${c} = 3, which is 11 in binary.\n2. The right-hand digit is the sum bit: S = ${fullS(a, bb, c)}, and the carry out is ${fullC(a, bb, c)}.`,
      explanation: `1 + 1 + 1 = 11 in binary. The sum bit is ${fullS(a, bb, c)}.`,
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A full adder can be built from which components?",
    options: [
      ["Two half adders and an OR gate", "Correct: the OR gate combines the carries from the two half adders."],
      ["One half adder and a NOT gate", "A half adder with a NOT gate cannot add three inputs."],
      ["Two AND gates and one NOR gate", "This does not produce a sum bit."],
      ["Two flip-flops and an AND gate", "Flip-flops store bits; they are not used to build an adder."],
    ],
    answer: "A",
    explanation: "The first half adder adds A and B, the second adds the result to Cin, and an OR gate combines the two carry outputs.",
  });
  {
    const x = "1011", y = "0110";
    const r = ripple(x, y);
    chk(fromBase(r.sum, 2) + 16 * r.carryOut, fromBase(x, 2) + fromBase(y, 2));
    b.fib({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: `A 4-bit ripple-carry adder adds **${x}** and **${y}**. The least significant stage has carry in 0. Give the 4-bit sum and the carry out of the last stage.`,
      template: "Sum: {{blank:sum}}\n\nCarry out of the last stage: {{blank:c}}",
      blanks: [{ id: "sum", accepted: [r.sum] }, { id: "c", choices: ["0", "1"], accepted: [String(r.carryOut)] }],
      hints: ["Add from the right and carry the bit to the next stage.", "A carry out of the last stage means the result needs a fifth bit."],
      explanation: `${x} = ${fromBase(x, 2)} and ${y} = ${fromBase(y, 2)}; the total ${fromBase(x, 2) + fromBase(y, 2)} = ${toBase(fromBase(x, 2) + fromBase(y, 2), 2, 5)}. The 4-bit sum is ${r.sum} with carry out ${r.carryOut}.`,
    });
  }
  {
    const seq = [[1, 0], [0, 0], [0, 1], [0, 0], [1, 0], [0, 0]];
    const qs = srRun(seq);
    b.fib({
      d: 3, skill: "APPLICATION",
      stem: "An SR flip-flop made from NOR gates starts with Q = 0. The pairs (S, R) are applied in order: (1, 0), (0, 0), (0, 1), (0, 0), (1, 0), (0, 0). Give the value of Q after the 2nd, 4th and 6th pairs.",
      template: "After the 2nd pair Q = {{blank:q2}}\n\nAfter the 4th pair Q = {{blank:q4}}\n\nAfter the 6th pair Q = {{blank:q6}}",
      blanks: [
        { id: "q2", choices: ["0", "1"], accepted: [String(qs[1])] },
        { id: "q4", choices: ["0", "1"], accepted: [String(qs[3])] },
        { id: "q6", choices: ["0", "1"], accepted: [String(qs[5])] },
      ],
      hints: ["S = 1 sets Q to 1, R = 1 resets it to 0, and (0, 0) holds the value."],
      explanation: `Q after each pair is ${qs.join(", ")}. The pair (0, 0) keeps the previous value.`,
    });
  }
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why is the input combination S = 1, R = 1 not allowed on an SR flip-flop built from NOR gates?",
    options: [
      ["Both outputs go to 0, and the state afterwards is unpredictable", "Correct: the outputs are no longer opposites, and the result depends on which gate is faster."],
      ["It makes the flip-flop toggle at each clock pulse of the circuit", "Toggling is the behaviour of a JK flip-flop with J = K = 1."],
      ["It permanently erases the stored bit from the memory chip", "The bit is not erased permanently; it is just undefined."],
      ["It sets Q to 1 and then resets it to 0 in turn", "The outputs are both 0 while the inputs are held."],
    ],
    answer: "A",
    hints: ["Work out the output of each NOR gate when one of its inputs is 1."],
    explanation: "With S = R = 1, both NOR gates output 0, so Q and NOT Q are the same. When the inputs go back to 0 the circuit settles into a state that depends on tiny timing differences.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In a JK flip-flop, the output changes to the opposite value when J = 1 and K = 1.",
    answer: true,
    feedbackTrue: "Correct: J = K = 1 makes the JK flip-flop toggle.",
    feedbackFalse: "J = K = 1 is the toggle input for a JK flip-flop; it is not an invalid input as in the SR flip-flop.",
    explanation: "The JK flip-flop uses the SR's invalid combination to toggle.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each pair of JK flip-flop inputs to its effect on Q.",
    pairs: [
      ["J = 0, K = 0", "Q is unchanged (hold)"],
      ["J = 1, K = 0", "Q becomes 1 (set)"],
      ["J = 0, K = 1", "Q becomes 0 (reset)"],
      ["J = 1, K = 1", "Q changes to the opposite value (toggle)"],
    ],
    explanation: "The JK flip-flop holds, sets, resets or toggles depending on its two inputs.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the main use of a flip-flop in a computer?",
    options: [
      ["To store one bit", "Correct: registers and static memory are made of flip-flops."],
      ["To add two binary numbers", "Adding is done by adder circuits."],
      ["To convert analogue signals to digital", "That is done by an analogue-to-digital converter."],
      ["To invert a signal", "A NOT gate inverts a signal."],
    ],
    answer: "A",
    explanation: "A flip-flop holds its output until it is changed, so it can store one bit.",
  });
  {
    const n = 12;
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: `A ${n}-bit ripple-carry adder uses a half adder for the least significant stage (no carry in) and full adders for all the other stages. How many full adders are used?`,
      value: n - 1,
      hints: ["Count the stages, then take away the stage that uses a half adder."],
      workedSolution: `1. There are ${n} stages.\n2. One uses a half adder, so ${n} − 1 = ${n - 1} use full adders.`,
      explanation: `${n} stages minus the one half adder leaves ${n - 1} full adders.`,
    });
  }
  {
    b.num({
      d: 3, skill: "APPLICATION", calculator: false, unit: undefined,
      stem: "A full adder is built from two half adders and one OR gate. Each half adder has one XOR gate and one AND gate. How many gates are in a 4-stage ripple-carry adder that uses a full adder for every stage?",
      value: 20,
      hints: ["First count the gates in one full adder."],
      workedSolution: "1. One half adder = 2 gates, so two half adders = 4 gates.\n2. Add the OR gate: 5 gates in one full adder.\n3. Four stages: 4 × 5 = 20 gates.",
      explanation: "One full adder has 2 × 2 + 1 = 5 gates, so four stages have 20 gates.",
    });
  }
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe how a full adder is built from half adders and other gates.",
    points: [
      "The first half adder adds inputs A and B, giving a sum and a carry.",
      "The second half adder adds the sum of the first to the carry in (Cin), giving the final sum S and a second carry.",
      "An OR gate combines the two carry outputs to give the carry out (Cout).",
    ],
    modelAnswer: "The first half adder adds A and B. Its sum goes into a second half adder together with Cin, and the sum output of the second half adder is S. The carry outputs of both half adders go into an OR gate, whose output is Cout.",
    hints: ["Name the inputs of the second half adder and say where the OR gate gets its inputs."],
    explanation: "Two half adders and an OR gate make a full adder.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how an SR flip-flop stores a bit when both S and R are 0.",
    points: [
      "The two gates have their outputs connected back to the inputs of each other (feedback).",
      "With S = R = 0 each gate passes on the output of the other, so the outputs stay as they were.",
      "So the value of Q set earlier is kept (stored) until S or R is made 1.",
    ],
    modelAnswer: "The output of each NOR gate is fed back to an input of the other gate. When S and R are both 0 the feedback keeps both outputs in the same state, so Q holds the last value that was set or reset until another input changes.",
    hints: ["The key idea is feedback between the two gates."],
    explanation: "Feedback keeps the circuit in its current state.",
  });
  b.manualShort({
    d: 2, skill: "EVALUATION", marks: 2,
    stem: "State one disadvantage of a ripple-carry adder and explain why it occurs.",
    points: ["It is slow for numbers with many bits.", "Each stage must wait for the carry out of the previous stage before it can produce its output."],
    modelAnswer: "It is slow because each full adder has to wait for the carry from the stage before it, so the delay grows with the number of bits.",
    explanation: "The carry has to ripple through all the stages.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 3,
    stem: "Compare an SR flip-flop with a JK flip-flop.",
    points: [
      "Both can be set (output 1), reset (output 0) or hold their value.",
      "The SR flip-flop has an invalid input (S = R = 1).",
      "In the JK flip-flop the input J = K = 1 is valid and toggles the output.",
    ],
    modelAnswer: "Both flip-flops can set, reset and hold a bit. An SR flip-flop must never be given S = 1 and R = 1 because the state is unpredictable. A JK flip-flop uses J = K = 1 to toggle its output, so it has no invalid state.",
    hints: ["Think about what happens when both inputs are 1."],
    explanation: "The JK flip-flop removes the problem of the SR flip-flop.",
  });
  {
    const [a, bb, c] = [0, 1, 1];
    b.struct({
      d: 3, skill: "APPLICATION", examStyle: true, secs: 480,
      stem: "A full adder is made from two half adders and an OR gate. The first half adder has inputs A and B and outputs S1 (sum) and C1 (carry). The second half adder has inputs S1 and the carry in Cin and outputs S (sum) and C2 (carry). The OR gate has inputs C1 and C2 and its output is Cout.",
      parts: [
        P.num({ label: "(a)", marks: 1, type: "CALCULATION", stem: `For A = ${a}, B = ${bb} and Cin = ${c}, what is S1?`, value: L.xor(a, bb), explanation: `S1 = ${a} XOR ${bb} = ${L.xor(a, bb)}.` }),
        P.num({ label: "(b)", marks: 1, type: "CALCULATION", stem: "For the same inputs, what is C1?", value: L.and(a, bb), explanation: `C1 = ${a} AND ${bb} = ${L.and(a, bb)}.` }),
        P.num({ label: "(c)", marks: 1, type: "CALCULATION", stem: "What is the final sum S?", value: fullS(a, bb, c), explanation: `S = S1 XOR Cin = ${L.xor(a, bb)} XOR ${c} = ${fullS(a, bb, c)}.` }),
        P.num({ label: "(d)", marks: 1, type: "CALCULATION", stem: "What is Cout?", value: fullC(a, bb, c), explanation: `C2 = S1 AND Cin = ${L.and(L.xor(a, bb), c)}; Cout = C1 OR C2 = ${fullC(a, bb, c)}.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Show that your answers to (c) and (d) agree with the sum of the three input bits.", points: ["0 + 1 + 1 = 2, which is 10 in binary.", "The carry is 1 and the sum bit is 0, matching Cout and S."], modelAnswer: "0 + 1 + 1 = 2 = 10 in binary, so the sum bit is 0 and the carry is 1, which agrees with S = 0 and Cout = 1." }),
      ],
      hints: ["XOR gives the sum of two bits; AND gives the carry.", "Check by adding the three bits in denary."],
      explanation: `S1 = 1, C1 = 0, S = 0, C2 = 1, so Cout = 1: 0 + 1 + 1 = 10 in binary.`,
    });
  }
  {
    const x = "0111", y = "1001";
    const r = ripple(x, y);
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, secs: 600, calculator: false,
      stem: `A 4-bit ripple-carry adder adds ${x} and ${y}. Stage 0 handles the right-hand bits and has carry in 0.`,
      parts: [
        P.group({ label: "(a)", stem: "Give the sum bit produced by each stage.", parts: r.rows.map((row) => P.num({ label: `(${["i", "ii", "iii", "iv"][row.pos]})`, marks: 1, type: "CALCULATION", stem: `Stage ${row.pos}`, value: row.s, explanation: `Stage ${row.pos}: ${row.a} + ${row.b} + ${row.cin} gives sum bit ${row.s} and carry out ${row.co}.` })) }),
        P.num({ label: "(b)", marks: 1, type: "CALCULATION", stem: "What is the carry out of the last stage (stage 3)?", value: r.carryOut, explanation: `The carry out of stage 3 is ${r.carryOut}.` }),
        P.bits({ label: "(c)", marks: 1, stem: "Write the 4-bit sum.", value: fromBase(r.sum, 2), width: 4, explanation: `Reading stage 3 down to stage 0 gives ${r.sum}.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain what the carry out of the last stage shows about the result of this addition in a 4-bit register.", points: ["The true sum needs five bits, so the 4-bit result is too small to hold it.", "This is an overflow (for unsigned numbers); the stored sum is wrong."], modelAnswer: "The carry out means the total is 16 or more and does not fit in four bits, so the 4-bit sum is incorrect: an overflow has occurred." }),
      ],
      hints: ["Use the carry out of each stage as the carry in of the next.", "Convert to denary to check."],
      explanation: `${x} + ${y} = ${fromBase(x, 2) + fromBase(y, 2)}. The adder gives ${r.sum} with carry out ${r.carryOut}.`,
    });
  }

  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "In a ripple-carry adder, what is the carry in to the least significant stage?",
    options: [
      ["0", "Correct: nothing is carried into the first column of an addition."],
      ["1", "A carry in of 1 would add an extra 1 to the sum."],
      ["The carry out of the last stage", "The carry out of the last stage is the overflow or the extra bit; it is not fed back."],
      ["It is not defined", "The first stage is given a carry in of 0 (or uses a half adder)."],
    ],
    answer: "A",
    hints: ["Think of adding the right-hand column of two binary numbers."],
    explanation: "The first stage adds only the two least significant bits, so its carry in is 0.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "How many flip-flops are needed to hold a 16-bit value in a register?",
    options: [
      ["16", "Correct: one flip-flop stores one bit."],
      ["8", "Eight flip-flops would hold only one byte."],
      ["2", "Two flip-flops store only two bits."],
      ["32", "That would hold a 32-bit value."],
    ],
    answer: "A",
    explanation: "Each flip-flop stores one bit, so a 16-bit register needs 16 flip-flops.",
  });

  b.card("DEFINITION", "Half adder", "Adds two bits: sum S = A XOR B, carry C = A AND B. It has no carry in.");
  b.card("DEFINITION", "Full adder", "Adds two bits and a carry in, giving a sum and a carry out. Built from two half adders and an OR gate.");
  b.card("CONCEPT", "Full adder construction", "Half adder 1 adds A and B. Half adder 2 adds its sum to Cin to give S. An OR gate combines the two carries to give Cout.");
  b.card("DEFINITION", "Ripple-carry adder", "A chain of full adders where the carry out of each stage is the carry in of the next; slow for many bits because carries ripple through.");
  b.card("DEFINITION", "Flip-flop", "A circuit with two stable states that stores one bit.");
  b.card("FACT", "SR flip-flop behaviour", "S = 1: set (Q = 1). R = 1: reset (Q = 0). S = R = 0: hold. S = R = 1: invalid.");
  b.card("FACT", "JK flip-flop behaviour", "J = K = 0: hold. J = 1, K = 0: set. J = 0, K = 1: reset. J = K = 1: toggle.");
  b.card("CONCEPT", "How does a NOR SR flip-flop hold a bit?", "The output of each NOR gate feeds back into the other, so with S = R = 0 the outputs keep their last state.");
  b.card("FACT", "Where are flip-flops used?", "Registers and static memory (SRAM): each flip-flop stores one bit.");
});
