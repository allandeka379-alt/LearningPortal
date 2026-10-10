// W4b: aphys.electronics.logic-systems (ZIMSEC only) — design from a specification, Boolean expressions, sensors as
// inputs, the half adder, the bistable latch (extension). All truth tables are computed below.
import { concept, P, t, same } from "../lib.mjs";

const NOT = (a) => 1 - a;
const rows3 = [];
for (let a = 0; a < 2; a++) for (let b = 0; b < 2; b++) for (let c = 0; c < 2; c++) rows3.push([a, b, c]);
// NOR latch: Q = NOR(R, Qbar), Qbar = NOR(S, Q), iterated to a steady state.
function latch(S, R, q0) {
  let q = q0;
  let qb = 1 - q0;
  for (let i = 0; i < 8; i++) {
    const nq = NOT(R | qb);
    const nqb = NOT(S | nq);
    q = nq;
    qb = nqb;
  }
  return q;
}

concept("aphys.electronics.logic-systems", { file: "electronics/logic-systems", keyPrefix: "electronics.logic-systems" }, (b) => {
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A kombi's warning buzzer W must sound when the engine is running (E = 1) and the driver's seat belt is not fastened. The belt sensor gives B = 1 when the belt is fastened. Which expression gives W?",
    options: [
      [t`$W = E \cdot \overline{B}$`, "Correct: engine running AND belt NOT fastened."],
      [t`$W = E \cdot B$`, "This sounds the buzzer when the belt IS fastened."],
      [t`$W = E + \overline{B}$`, "OR would sound the buzzer whenever the engine runs, even with the belt on."],
      [t`$W = \overline{E \cdot B}$`, "This NAND is 1 whenever the engine is off, so the buzzer would sound in a parked kombi."],
    ],
    answer: "A",
    explanation: "'And' → AND; 'not fastened' → NOT B: W = E·B̄.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A half adder has inputs A = 1 and B = 1. What are its outputs?",
    options: [
      ["Sum 0, carry 1", "Correct: 1 + 1 = 10 in binary."],
      ["Sum 1, carry 1", "That would represent three; 1 + 1 is two."],
      ["Sum 1, carry 0", "That is one; it misses the carry."],
      ["Sum 0, carry 0", "That is zero."],
    ],
    answer: "A",
    explanation: "S = A ⊕ B = 0; C = A·B = 1; CS = 10 (binary two).",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which gate gives the sum bit S of a half adder?",
    options: [
      ["EXOR", "Correct: S = 1 when exactly one input is 1."],
      ["OR", "OR gives 1 for 1 + 1, but the sum bit must then be 0."],
      ["AND", "AND gives the carry bit."],
      ["NAND", "NAND gives 1 for 0 + 0, but the sum bit must be 0."],
    ],
    answer: "A",
    explanation: "S = A ⊕ B; C = A·B.",
  });
  {
    const q = [[0, 0], [0, 1], [1, 0], [1, 1]].map(([, bb]) => bb);
    same(q, [0, 1, 0, 1]);
    b.mcq({
      d: 3, skill: "ANALYSIS",
      stem: "A system with inputs A and B gives Q = 1 only for AB = 01 and AB = 11. Which is the simplest expression for Q?",
      options: [
        [t`$Q = B$`, "Correct: Q = Ā·B + A·B = B (A makes no difference)."],
        [t`$Q = \overline{A} \cdot B$`, "This misses the row 11, where Q is also 1."],
        [t`$Q = A + B$`, "This gives 1 for AB = 10, where Q is 0."],
        [t`$Q = A \cdot B$`, "This misses the row 01."],
      ],
      answer: "A",
      explanation: "Q follows B in every row, so A is irrelevant: Q = B.",
      hints: ["Compare the Q column with each input column."],
    });
  }
  {
    same([latch(0, 0, 0), latch(0, 0, 1)], [0, 1]);
    b.mcq({
      d: 3, skill: "UNDERSTANDING",
      stem: "A bistable latch made of two NOR gates has its set and reset inputs both at 0. What is its output Q?",
      options: [
        ["Whatever it was last set or reset to", "Correct: S = R = 0 is the hold (memory) state."],
        ["Always 0", "Q = 0 is forced only by R = 1."],
        ["Always 1", "Q = 1 is forced only by S = 1."],
        ["It switches rapidly between 0 and 1", "With S = R = 0 the cross-coupled gates hold a stable state."],
      ],
      answer: "A",
      explanation: "The feedback between the gates keeps the last state: a one-bit memory.",
      hints: ["Which inputs force Q to 1 or to 0?"],
    });
  }
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A greenhouse fan F must run when it is hot (H = 1), or when it is humid (U = 1) during the day (D = 1). Which expression is correct?",
    options: [
      [t`$F = H + U \cdot D$`, "Correct: hot, OR (humid AND day)."],
      [t`$F = (H + U) \cdot D$`, "This stops the fan on a hot night, when H = 1 but D = 0."],
      [t`$F = H \cdot U \cdot D$`, "This needs all three conditions together."],
      [t`$F = H + U + D$`, "This would run the fan every day even when it is cool and dry."],
    ],
    answer: "A",
    explanation: "The specification groups 'humid during the day' as one condition: U·D, ORed with H.",
    hints: ["Which conditions must happen together?"],
  });
  {
    const f = ([a, bb, c]) => (a | bb) & NOT(c);
    same(f([0, 1, 0]), 1);
    same([[1, 1, 1], [0, 0, 0], [1, 0, 1]].map(f), [0, 0, 0]);
    b.mcq({
      d: 4, skill: "ANALYSIS",
      stem: t`For which input combination is $Q = (A + B) \cdot \overline{C}$ equal to 1?`,
      options: [
        ["A = 0, B = 1, C = 0", "Correct: A + B = 1 and C̄ = 1."],
        ["A = 1, B = 1, C = 1", "C = 1 makes C̄ = 0, so Q = 0."],
        ["A = 0, B = 0, C = 0", "A + B = 0, so Q = 0."],
        ["A = 1, B = 0, C = 1", "C = 1 makes Q = 0."],
      ],
      answer: "A",
      explanation: "Q = 1 needs at least one of A, B to be 1 AND C to be 0.",
      hints: ["Both brackets must be 1."],
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A light sensor stage gives logic 1 in daylight. A security lamp must come on only at night. How should the sensor signal be used?",
    options: [
      ["Pass it through a NOT gate before it enters the rest of the logic.", "Correct: 'dark' is the inverse of the daylight signal."],
      ["Connect it directly to the lamp.", "The lamp would then be lit in daylight."],
      ["Connect it to both inputs of an AND gate.", "AND with joined inputs leaves the signal unchanged."],
      ["Pass it through an OR gate with a 0 on the other input.", "OR with 0 leaves the signal unchanged."],
    ],
    answer: "A",
    explanation: "Inverting the daylight signal gives a signal that is 1 when dark.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A half adder can add two binary digits and a carry from a previous column.",
    answer: false,
    explanation: "False. A half adder has only two inputs; accepting a carry as well needs a full adder.",
  });
  b.tf({
    d: 2, skill: "RECALL", daily: true,
    stem: "The output of a combinational logic circuit depends only on the present states of its inputs.",
    answer: true,
    explanation: "True. That is what 'combinational' means; a bistable, which remembers earlier inputs, is not combinational.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each phrase in a written specification with the gate it usually needs.",
    pairs: [
      ["'… and …' (both conditions needed)", "AND"],
      ["'… or …' (either condition is enough)", "OR"],
      ["'… unless …' / '… never when …'", "NOT (feeding an AND)"],
      ["'… one or the other, but not both'", "EXOR"],
    ],
    explanation: "Words translate directly into gates.",
  });
  b.fib({
    d: 2, skill: "APPLICATION",
    stem: "Complete the half-adder outputs for A = 0 and B = 1.",
    template: "Sum S = {{blank:s}}; carry C = {{blank:c}}.",
    blanks: [
      { id: "s", accepted: [String(0 ^ 1)], choices: ["0", "1"] },
      { id: "c", accepted: [String(0 & 1)], choices: ["0", "1"] },
    ],
    explanation: "0 + 1 = 1: S = 0 ⊕ 1 = 1, C = 0·1 = 0.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the circuit, made from two cross-coupled NOR (or NAND) gates, that stores one bit of information.",
    accepted: ["bistable", "latch", "bistable latch", "SR latch", "flip-flop", "flip flop", "a bistable", "a latch"],
    explanation: "A bistable (latch) holds its last state when both inputs are inactive.",
  });
  {
    const n = rows3.filter(([a, bb, c]) => ((a | bb) & NOT(c)) === 1).length;
    same(n, 3);
    b.num({
      d: 3, skill: "ANALYSIS",
      stem: t`For $Q = (A + B) \cdot \overline{C}$, how many of the eight input combinations give Q = 1?`,
      value: n, wrong: [4, 6],
      explanation: "C must be 0 (4 rows) and A + B must be 1, which excludes only A = B = 0: 4 − 1 = 3 rows (010, 100, 110).",
      hints: ["Count the rows with C = 0 first."],
    });
  }
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "A security lamp at a school gate must come on when it is dark and either a movement sensor detects someone or a test switch is pressed. Design the logic: define the inputs, give a Boolean expression and describe the gates.",
    points: [
      "Inputs defined: D = 1 when dark (or L = 1 in daylight, inverted), M = 1 when movement is detected, T = 1 when the test switch is pressed; output Q = 1 lamp on.",
      t`Expression: $Q = D \cdot (M + T)$ (or $Q = \overline{L} \cdot (M + T)$).`,
      "M and T go to an OR gate (L through a NOT gate if the sensor gives 1 in daylight).",
      "The OR output and D go to an AND gate whose output switches the lamp through a relay.",
    ],
    modelAnswer: "Let D = 1 when it is dark (from an LDR divider and comparator, inverted if it gives 1 in daylight), M = 1 when movement is detected and T = 1 when the test switch is pressed; Q = 1 means the lamp is on. Then Q = D·(M + T). M and T go into an OR gate, and its output and D go into an AND gate, whose output drives the lamp through a relay.",
    explanation: "Define inputs, translate the words, then gates.",
    hints: ["Which two inputs are joined by 'or'?"],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how a bistable latch lets a burglar alarm keep sounding after an intruder has closed the door again.",
    points: [
      "Opening the door gives a brief S = 1, which sets the latch: Q = 1 and the siren sounds.",
      "When the door is closed, S returns to 0 with R = 0: the hold state, so Q stays at 1 (memory).",
      "The siren stops only when R = 1 is applied (key switch), resetting Q to 0.",
    ],
    modelAnswer: "The door sensor gives S = 1 while the door is open, setting the latch so that Q = 1 and the siren sounds. When the door is shut, S goes back to 0, but with R also 0 the latch is in its hold state and Q stays at 1, so the siren continues. Only a reset signal, R = 1 from the owner's key switch, makes Q = 0 again.",
    explanation: "Set, hold, reset.",
    hints: ["What happens when S goes back to 0?"],
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Explain how a thermistor can provide a logic input that is 1 when a tank of water is hot and 0 when it is cool.",
    points: [
      "Thermistor in a potential divider with a fixed resistor: the divider voltage changes with temperature (NTC resistance falls as it warms).",
      "The divider output goes to a comparator with a reference voltage set for the chosen temperature.",
      "The comparator output switches high when hot; it is limited to the logic levels (e.g. 0 V and +5 V) to give 1 and 0.",
    ],
    modelAnswer: "Place the NTC thermistor in a potential divider with a fixed resistor so that the divider voltage rises as the water warms. Feed this to a comparator whose reference is set at the voltage for the chosen temperature; when the water is hotter than this, the comparator output switches high. Its output is then limited to the logic levels, 0 V and +5 V, so it gives logic 1 when hot and 0 when cool.",
    explanation: "Divider → comparator → logic level.",
    hints: ["Start with a potential divider."],
  });

  // Practice structured: a solar geyser back-up heater (12 marks)
  {
    // C = 1 when the water is cold; N = 1 at night (no sun); V = 1 override switch on. Heater on when cold AND (night OR override).
    const q = rows3.map(([c, n, v]) => c & (n | v));
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: false,
      stem: "A solar geyser in Bulawayo has an electric back-up element. The element E must switch on only when the water is cold, and then only at night or when an override switch is on. Sensor stages give C = 1 when the water is cold and N = 1 at night; the override gives V = 1 when on.",
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "Write a Boolean expression for E and explain how it follows from the specification.", points: [
          t`$E = C \cdot (N + V)$.`,
          "'Only when cold' → C must be 1 (AND); 'at night or when the override is on' → N OR V.",
        ], modelAnswer: t`$E = C \cdot (N + V)$: the water must be cold (C AND …), and then either it is night or the override is on (N OR V).` }),
        P.fib({
          label: "(b)", stem: "Complete the output E for each input combination CNV.",
          template: rows3.map(([c, n, v], i) => `CNV = ${c}${n}${v}: E = {{blank:r${i}}}`).join("; ") + ".",
          blanks: q.map((x, i) => ({ id: `r${i}`, accepted: [String(x)], choices: ["0", "1"] })),
          explanation: `E = 1 only when C = 1 and at least one of N, V is 1: ${q.join(", ")}.`,
        }),
        P.manual({ label: "(c)", marks: 2, stem: "Describe the gates needed and how the output can switch the 2 kW element.", points: [
          "N and V into an OR gate; its output and C into an AND gate.",
          "The AND output drives a relay (with protective diode) whose contacts switch the mains element.",
        ], modelAnswer: "Feed N and V into an OR gate, and feed its output with C into an AND gate. The AND gate's output operates a relay, with a diode across its coil, whose contacts switch the mains supply to the element." }),
      ],
      explanation: "E = C·(N + V): two gates and a relay.",
      hints: ["The heater needs cold water in every 'on' row."],
    });
    same(q.filter((x) => x === 1).length, 3);
  }
  // Practice structured: half adder and latch (8 marks)
  {
    const s10 = 1 ^ 0, c10 = 1 & 0, s11 = 1 ^ 1, c11 = 1 & 1;
    let q = 0;
    q = latch(1, 0, q); // set
    const afterSet = q;
    q = latch(0, 0, q); // hold
    const afterHold = q;
    q = latch(0, 1, q); // reset
    q = latch(0, 0, q);
    const afterReset = q;
    same([afterSet, afterHold, afterReset], [1, 1, 0]);
    b.struct({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: "Part 1 concerns a half adder made from an EXOR gate and an AND gate, both fed with inputs A and B. Part 2 concerns a NOR-gate bistable with set input S and reset input R, which starts with Q = 0.",
      parts: [
        P.fib({
          label: "(a)", stem: "Complete the half-adder outputs.",
          template: "A = 1, B = 0: S = {{blank:a}}, C = {{blank:b}}. A = 1, B = 1: S = {{blank:c}}, C = {{blank:d}}.",
          blanks: [
            { id: "a", accepted: [String(s10)], choices: ["0", "1"] },
            { id: "b", accepted: [String(c10)], choices: ["0", "1"] },
            { id: "c", accepted: [String(s11)], choices: ["0", "1"] },
            { id: "d", accepted: [String(c11)], choices: ["0", "1"] },
          ],
          explanation: "1 + 0 = 01; 1 + 1 = 10.",
        }),
        P.manual({ label: "(b)", marks: 2, stem: "Explain why two half adders alone cannot add two 2-bit binary numbers.", points: [
          "The second column must add its two bits and the carry from the first column: three inputs.",
          "A half adder has only two inputs, so a full adder (two half adders and an OR gate) is needed.",
        ], modelAnswer: "In the second column the circuit has to add two bits plus the carry from the first column, three inputs in all. A half adder accepts only two, so a full adder, made from two half adders and an OR gate, is needed." }),
        P.mcq({ label: "(c)", marks: 1, stem: "S is pulsed to 1 and then returned to 0, with R = 0 throughout. What is Q now?", options: [
          [String(afterHold), "Correct: the pulse set Q = 1 and S = R = 0 holds it."],
          [String(1 - afterHold), "Q returns to 0 only when R = 1."],
          ["It is undefined.", "Only S = R = 1 is the forbidden state."],
          ["It alternates between 0 and 1.", "The latch is stable in either state."],
        ], answer: "A", explanation: "Set, then hold: Q = 1." }),
        P.mcq({ label: "(d)", marks: 1, stem: "R is then pulsed to 1 and returned to 0, with S = 0. What is Q now?", options: [
          [String(afterReset), "Correct: R = 1 resets Q to 0, and S = R = 0 then holds it."],
          [String(1 - afterReset), "The reset pulse has cleared the stored 1."],
          ["It is undefined.", "S = R = 1 never occurred."],
          ["It alternates between 0 and 1.", "The latch is stable in either state."],
        ], answer: "A", explanation: "Reset, then hold: Q = 0." }),
      ],
      explanation: "Half adder: S = A ⊕ B, C = A·B. Latch: set, hold, reset.",
      hints: ["1 + 1 in binary is 10."],
    });
  }

  b.card("DEFINITION", "**Combinational logic**", "A circuit whose output depends only on the present inputs (no memory).");
  b.card("CONCEPT", "Design procedure", "Define inputs and output (what 1 means) → truth table → Boolean expression → gates → check rows.");
  b.card("CONCEPT", "Words to gates", "'and' → AND; 'or' → OR; 'not', 'unless', 'never when' → NOT; 'one but not both' → EXOR.");
  b.card("FORMULA", "Half adder", t`$S = A \oplus B$ (EXOR); $C = A \cdot B$ (AND)`);
  b.card("FACT", "Binary 1 + 1", "1 + 1 = 10: sum 0, carry 1.");
  b.card("DEFINITION", "**Bistable (latch)**", "Two cross-coupled gates with two stable states; it holds the last state set: a one-bit memory.");
  b.card("FACT", "NOR latch truth table", "S = 1, R = 0: Q = 1 (set). S = 0, R = 1: Q = 0 (reset). S = R = 0: hold. S = R = 1: avoided.");
  b.card("CONCEPT", "Sensors as logic inputs", "Sensor divider → comparator → output limited to logic levels gives 1 or 0 for 'hot', 'dark', etc.");
});
