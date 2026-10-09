// W1a: logical binary shifts on positive 8-bit integers (Cambridge only).
import { concept, P, toBase, fromBase, shift } from "../lib.mjs";

const d = (s) => fromBase(s, 2);
const lost = (s, p) => (p > 0 ? s.slice(0, p) : s.slice(s.length + p));

concept("comp.data.logical-shifts", { file: "data/logical-shifts", keyPrefix: "data.logical-shifts" }, (b) => {
  const items = [
    ["00100101", 1, 2, true],
    ["00010011", 3, 3, false],
    ["11010000", -4, 3, false],
    ["01101110", -1, 2, false],
  ];
  for (const [s, p, dd, daily] of items) {
    const r = shift(s, p);
    const dir = p > 0 ? "left" : "right";
    const n = Math.abs(p);
    b.bits({
      d: dd, skill: "APPLICATION", daily: daily || undefined, calculator: false,
      stem: `Carry out a logical ${dir} shift of **${n} place${n > 1 ? "s" : ""}** on the 8-bit number **${s}**. Give the 8-bit result.`,
      value: d(r), width: 8,
      wrong: [p > 0 ? shift(s, -n) : shift(s, n)],
      hints: dd >= 3 ? [`Move every bit ${n} places ${dir}.`, `Fill the ${n} empty place${n > 1 ? "s" : ""} on the ${p > 0 ? "right" : "left"} with 0s.`] : undefined,
      explanation: `Every bit moves ${n} place${n > 1 ? "s" : ""} ${dir}; ${lost(s, p)} falls off the ${p > 0 ? "left" : "right"} end and 0s fill in: ${r}. Value ${d(s)} → ${d(r)} (${p > 0 ? `× ${2 ** n}` : `÷ ${2 ** n}`}${p < 0 && d(s) % 2 ** n ? ", remainder lost" : ""}).`,
    });
  }
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the effect of a logical **left** shift of **one** place on a positive binary integer (if no 1s are lost)?",
    options: [
      ["It multiplies the value by 2", "Correct: every bit moves to a place worth twice as much."],
      ["It divides the value by 2", "Dividing by 2 is a right shift."],
      ["It adds 1 to the value", "Shifting moves bits; it does not add 1."],
      ["It multiplies the value by 10", "That is the effect of moving digits in denary, not binary."],
    ],
    answer: "A",
    explanation: "Place values double from right to left, so moving every bit one place left doubles the number.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In a logical shift, what fills the empty places left behind?",
    options: [
      ["0s", "Correct: logical shifts always fill with zeros."],
      ["1s", "The empty places are never filled with 1s in a logical shift."],
      ["The bits that fell off the other end", "That would be a rotation, which is not a logical shift."],
      ["A copy of the most significant bit", "Copying the sign bit is an arithmetic shift, not in this syllabus."],
    ],
    answer: "A",
    explanation: "Bits that leave the register are lost, and zeros are shifted in at the other end.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true, calculator: false,
    stem: "A positive 8-bit integer is shifted **3 places to the right**. What is the effect on its value?",
    options: [
      ["It is divided by 8", "Correct: each place right divides by 2, so 3 places divide by $2^3 = 8$."],
      ["It is divided by 3", "The factor is a power of 2, not the number of places."],
      ["It is divided by 6", "This multiplies 3 by 2; the factor is 2 × 2 × 2."],
      ["It is multiplied by 8", "A left shift multiplies; a right shift divides."],
    ],
    answer: "A",
    explanation: "A right shift of $n$ places divides by $2^n$ (integer division, remainders lost).",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: "Which 8-bit number gives an **incorrect** result when shifted 2 places to the left to multiply by 4?",
    options: [
      ["01000110", "Correct: the 1 in the 64s place is shifted out, because $70 \\times 4 = 280$ is more than 255."],
      ["00110011", "$51 \\times 4 = 204$ fits; only 0s are lost."],
      ["00111111", "$63 \\times 4 = 252$ fits in 8 bits."],
      ["00001010", "$10 \\times 4 = 40$ fits easily."],
    ],
    answer: "A",
    hints: ["Look at the two leftmost bits of each number.", "If either of them is 1, it will be lost."],
    explanation: "A left shift of 2 is only correct if the two leftmost bits are 0. In 01000110 the second bit is 1, so it is lost and the result (00011000 = 24) is wrong.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: "The 8-bit number **00101101** is shifted 1 place to the right. Which statement is true?",
    options: [
      ["The result is 22 because the remainder is lost", "Correct: $45 \\div 2 = 22.5$; the 1 shifted out of the LSB was the remainder."],
      ["The result is 22.5 because the shift is exact", "Integers cannot hold 0.5; the 1 that falls off is lost."],
      ["The result is 90 because a right shift doubles", "A right shift halves; a left shift doubles."],
      ["The result is 23 because the value is rounded up", "Shifting always rounds down: bits are simply discarded."],
    ],
    answer: "A",
    hints: ["What is the value before the shift?", "What happens to the bit that leaves the right-hand end?"],
    explanation: `00101101 = 45 → ${shift("00101101", -1)} = ${d(shift("00101101", -1))}.`,
  });
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "Which logical shift multiplies a positive integer by **16** (when no 1s are lost)?",
    options: [
      ["Left 4 places", "Correct: $2^4 = 16$."],
      ["Left 16 places", "16 places would empty an 8-bit register; the factor is $2^n$."],
      ["Left 8 places", "8 places would multiply by 256 (and empty an 8-bit register)."],
      ["Right 4 places", "A right shift divides."],
    ],
    answer: "A",
    explanation: "Left $n$ places multiplies by $2^n$, and $2^4 = 16$.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A logical left shift always gives the correct product, however many places the bits are moved.",
    answer: false,
    explanation: "False. If a 1 is shifted out of the left end, the true result is too big for 8 bits and the register holds a wrong value.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Shifting an 8-bit number 8 places to the right in an 8-bit register always gives 00000000.",
    answer: true,
    explanation: "True. Every original bit is shifted out and all eight places are filled with 0s.",
  });
  {
    const s = "00111001";
    const r = shift(s, -2);
    b.fib({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: `The 8-bit number **${s}** is shifted 2 places to the right. Complete the sentences.`,
      template: `The result is {{blank:a}}. The bits lost are {{blank:b}}. The denary value changes from ${d(s)} to {{blank:c}}.`,
      blanks: [
        { id: "a", accepted: [r], normalise: ["trim", "remove_whitespace"], wrong: shift(s, 2) },
        { id: "b", accepted: [lost(s, -2)], normalise: ["trim", "remove_whitespace"], wrong: "00" },
        { id: "c", accepted: [String(d(r))], wrong: String(d(s) / 4) },
      ],
      hints: ["Move every bit two places right and fill the left with 0s.", "The two rightmost bits fall off."],
      explanation: `${s} (${d(s)}) → ${r} (${d(r)}); the lost bits ${lost(s, -2)} were the remainder: $${d(s)} \\div 4 = ${d(s) / 4}$ → ${d(r)}.`,
    });
  }
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each logical shift with its effect on a positive 8-bit integer (assuming no 1s are lost).",
    pairs: [["Left 1 place", "× 2"], ["Left 3 places", "× 8"], ["Right 1 place", "÷ 2"], ["Right 2 places", "÷ 4"]],
    explanation: "Left $n$: × $2^n$. Right $n$: ÷ $2^n$ (integer division).",
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: `The 8-bit number **${"00000111"}** is shifted left 5 places. What is the denary value of the result?`,
    value: d(shift("00000111", 5)), wrong: [35, 7 * 64],
    hints: ["A left shift of 5 multiplies by 32.", "Check whether any 1s are shifted out."],
    explanation: `$7 \\times 32 = 224$ and no 1s are lost: ${shift("00000111", 5)} = ${d(shift("00000111", 5))}.`,
    workedSolution: `1. 00000111 = 7.\n2. Shift left 5: ${shift("00000111", 5)}.\n3. $128 + 64 + 32 = ${d(shift("00000111", 5))}$ ($7 \\times 2^5$).`,
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "The 8-bit number **10010100** is shifted 1 place to the left. Explain why the result is not double the original value.",
    points: [
      "The MSB is 1, and it is shifted out of the register / lost.",
      "Double the value (148 × 2 = 296) is greater than 255, so it cannot be stored in 8 bits; the result (00101000 = 40) is wrong.",
    ],
    modelAnswer: "The leftmost bit is a 1, and a left shift pushes it out of the 8-bit register. The true answer, 296, is larger than 255, so it cannot fit and the register holds 00101000 (40) instead.",
    hints: ["Look at the most significant bit."],
    explanation: `10010100 = 148; shifted left 1 gives ${shift("10010100", 1)} = ${d(shift("10010100", 1))}, not 296.`,
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 3,
    stem: "Describe the effect of a logical right shift of 2 places on the 8-bit number **01111011**, and explain whether the result is exact.",
    points: [
      `The bits move 2 places right, the two rightmost bits are lost and 0s fill the left: result ${shift("01111011", -2)}.`,
      `The value is divided by 4: ${d("01111011")} becomes ${d(shift("01111011", -2))}.`,
      `The result is not exact: the lost bits (11) were 1s / the remainder 3 is lost ($${d("01111011")} \\div 4 = ${d("01111011") / 4}$).`,
    ],
    modelAnswer: `Every bit moves two places to the right, so the result is ${shift("01111011", -2)}. This divides the value by 4, from ${d("01111011")} to ${d(shift("01111011", -2))}. It is not exact, because the two bits shifted out were both 1, so the remainder of 3 is lost (the true answer is ${d("01111011") / 4}).`,
    hints: ["Work out the result and both denary values.", "Look at the bits that were shifted out."],
    explanation: "Describe: direction, places, new bits, factor; then judge exactness from the lost bits.",
  });
  {
    const s = "00110110";
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, marks: 8, calculator: false, secs: 720,
      stem: `A processor stores the positive integer **${s}** in an 8-bit register.`,
      parts: [
        P.num({ type: "CALCULATION", label: "(a)", marks: 1, stem: "Convert the register's contents to denary.", value: d(s), wrong: [d(s) + 1], explanation: `$32 + 16 + 4 + 2 = ${d(s)}$.` }),
        P.bits({ label: "(b)", marks: 2, stem: "Give the contents of the register after a logical left shift of 3 places.", value: d(shift(s, 3)), width: 8, explanation: `${s} → ${shift(s, 3)}; lost bits ${lost(s, 3)}.` }),
        P.manual({ label: "(c)", marks: 2, stem: "Describe the effect of the shift in (b) on the value, and state whether the result is correct.", points: [`It multiplies the value by 8 ($2^3$).`, `The result is not correct: a 1 is shifted out of the left end, so ${d(s)} × 8 = ${d(s) * 8} does not fit in 8 bits (the register holds ${d(shift(s, 3))}).`], modelAnswer: `A left shift of 3 multiplies by 8, but the leading 1 is lost, so the register holds ${d(shift(s, 3))} instead of ${d(s) * 8}.` }),
        P.bits({ label: "(d)", marks: 2, stem: `The original value ${s} is instead shifted 2 places to the right. Give the result.`, value: d(shift(s, -2)), width: 8, explanation: `${s} → ${shift(s, -2)} (${d(shift(s, -2))}).` }),
        P.num({ type: "CALCULATION", label: "(e)", marks: 1, stem: "Give the denary value of your answer to (d).", value: d(shift(s, -2)), wrong: [d(s) / 4], explanation: `$${d(s)} \\div 4 = ${d(s) / 4}$; the remainder is lost, giving ${d(shift(s, -2))}.` }),
      ],
      hints: ["For (b), check which bits fall off the left end.", "A right shift of 2 divides by 4 and discards the remainder."],
      explanation: `(a) ${d(s)}. (b) ${shift(s, 3)}. (c) × 8, but a 1 is lost so it is wrong. (d) ${shift(s, -2)}. (e) ${d(shift(s, -2))}.`,
    });
  }
  {
    const s = "00001100";
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, marks: 6, calculator: false, secs: 540,
      stem: `A games program stores the number of coins a player has, **${s}**, in an 8-bit register. A bonus round multiplies the coins by 16 using a logical shift.`,
      parts: [
        P.mcq({ label: "(a)", stem: "Which shift should the program use?", options: [["Left 4 places", "Correct: $2^4 = 16$."], ["Left 16 places", "The factor is $2^n$, not $n$."], ["Right 4 places", "A right shift divides by 16."], ["Left 2 places", "That multiplies by 4."]], answer: "A", explanation: "Left 4 places multiplies by 16." }),
        P.bits({ label: "(b)", marks: 2, stem: "Give the contents of the register after the bonus.", value: d(shift(s, 4)), width: 8, explanation: `${s} → ${shift(s, 4)}.` }),
        P.manual({ label: "(c)", marks: 3, stem: "The player had 12 coins. Explain whether the bonus gives the correct number of coins and suggest a change to the program.", points: ["12 × 16 = 192, which is at most 255 / no 1s are shifted out.", `So the result ${shift(s, 4)} (192) is correct.`, "Suggestion: check the leftmost 4 bits are 0 before shifting / use a 16-bit register for players with 16 or more coins, because larger values would lose 1s and overflow."], modelAnswer: `12 × 16 = 192, which fits in 8 bits, and the four bits shifted out were all 0, so ${shift(s, 4)} = 192 is correct. A player with 16 or more coins would lose a 1, so the program should check the top four bits first or store coins in a 16-bit register.` }),
      ],
      hints: ["Which power of 2 is 16?", "Look at the four bits that fall off."],
      explanation: `${s} (12) shifted left 4 = ${shift(s, 4)} (192), correct because only 0s were lost.`,
    });
  }

  b.card("DEFINITION", "Logical shift", "Moving every bit left or right; bits leaving the register are lost and **0s** fill the empty places.");
  b.card("FORMULA", "Left shift of $n$ places", "Multiplies by $2^n$ (if no 1s are shifted out).");
  b.card("FORMULA", "Right shift of $n$ places", "Divides by $2^n$; the remainder (bits shifted out) is lost.");
  b.card("CONCEPT", "When is a left shift wrong?", "When a **1** is shifted out of the MSB: the true result is greater than 255 and does not fit in 8 bits.");
  b.card("CONCEPT", "When is a right shift inexact?", "When a **1** is shifted out of the LSB: the remainder is lost, so the result is rounded down.");
  b.card("FACT", "Example", "00000101 (5) left 2 → 00010100 (20): × 4.");
  b.card("CONCEPT", "Why use shifts?", "Shifting is much faster for the processor than a full multiplication or division by a power of 2.");
  b.card("FACT", "Which board examines logical shifts?", "Cambridge 0478 (positive 8-bit integers only).");
});
