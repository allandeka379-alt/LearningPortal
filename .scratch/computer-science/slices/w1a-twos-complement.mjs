// W1a: 8-bit two's complement (Cambridge only).
import { concept, P, toBase, twos, fromTwos } from "../lib.mjs";

const inv = (s) => s.replace(/[01]/g, (c) => (c === "0" ? "1" : "0"));
const pvSum = (s) => [...s].map((c, k) => (c === "1" ? (k === 0 ? -128 : 2 ** (7 - k)) : 0)).filter(Boolean).join(" + ");
const steps = (n) => `+${-n} = ${toBase(-n, 2, 8)}; inverted ${inv(toBase(-n, 2, 8))}; add 1 → ${twos(n)}`;

concept("comp.data.twos-complement", { file: "data/twos-complement", keyPrefix: "data.twos-complement" }, (b) => {
  for (const [n, dd, daily] of [[-1 * 12, 2, true], [-73, 3, false], [-115, 4, false]]) {
    b.bits({
      d: dd, skill: "APPLICATION", daily: daily || undefined, calculator: false,
      stem: `Convert the denary number **${n}** to 8-bit two's complement.`,
      value: n, width: 8, twosComplement: true,
      wrong: [inv(toBase(-n, 2, 8)), toBase(-n, 2, 8)],
      hints: dd >= 3 ? ["Write the positive number in 8 bits first.", "Invert every bit, then add 1."] : undefined,
      explanation: `${steps(n)}. Check: $${pvSum(twos(n))} = ${n}$.`,
    });
  }
  b.bits({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "Convert the denary number **+58** to 8-bit two's complement.",
    value: 58, width: 8, twosComplement: true, wrong: [inv(toBase(58, 2, 8)), twos(-58)],
    explanation: `Positive numbers are written as ordinary 8-bit binary with MSB 0: $32 + 16 + 8 + 2 = 58$ → ${twos(58)}.`,
  });
  for (const [s, dd, daily] of [["11110110", 2, true], ["10101001", 3, false], ["01110001", 2, false], ["10000011", 4, false]]) {
    const v = fromTwos(s);
    b.num({
      d: dd, skill: "APPLICATION", daily: daily || undefined, calculator: false,
      stem: `The 8-bit two's complement number **${s}** is stored in a register. What is its denary value?`,
      value: v, wrong: [parseInt(s, 2), -v].filter((w) => w !== v),
      hints: dd >= 3 ? ["The MSB is worth −128.", "Add the place values of all the 1s."] : undefined,
      explanation: `Place values −128, 64, …, 1: $${pvSum(s)} = ${v}$.`,
      workedSolution: `1. Write −128, 64, 32, 16, 8, 4, 2, 1 over the bits.\n2. The 1s give $${pvSum(s)}$.\n3. The value is ${v}.`,
    });
  }
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the place value of the most significant bit in 8-bit two's complement?",
    options: [
      ["−128", "Correct: the MSB has a negative place value."],
      ["128", "+128 is the MSB value in ordinary unsigned binary."],
      ["−1", "−1 is the value of 11111111, not of the MSB alone."],
      ["−127", "−127 is the value of 10000001."],
    ],
    answer: "A",
    explanation: "8-bit two's complement place values: −128, 64, 32, 16, 8, 4, 2, 1.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What is the range of integers that can be stored in 8-bit two's complement?",
    options: [
      ["−128 to +127", "Correct: 10000000 to 01111111."],
      ["−127 to +127", "This leaves out 10000000, which is −128."],
      ["−128 to +128", "+128 would need a ninth bit; 01111111 (127) is the largest."],
      ["0 to 255", "That is the range of unsigned 8-bit binary."],
    ],
    answer: "A",
    explanation: "256 patterns: 128 negative values (−128 to −1), zero and 127 positive values.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In 8-bit two's complement, what does an MSB of **1** tell you about a number?",
    options: [
      ["The number is negative", "Correct: the −128 place is used, and the other bits add at most 127."],
      ["The number is odd", "Whether a number is odd depends on the LSB, not the MSB."],
      ["The number is at least 128", "In two's complement the MSB is worth −128, not +128."],
      ["An overflow has occurred", "MSB 1 is normal for any negative number."],
    ],
    answer: "A",
    explanation: "With MSB 1 the value is −128 plus at most 127, so it is between −128 and −1.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: "Which 8-bit two's complement number represents **−1**?",
    options: [
      ["11111111", "Correct: $-128 + 127 = -1$."],
      ["10000001", "This is $-128 + 1 = -127$."],
      ["00000001", "This is +1."],
      ["11111110", "This is −2."],
    ],
    answer: "A",
    hints: ["Start with +1 = 00000001, invert and add 1."],
    explanation: "+1 = 00000001 → inverted 11111110 → add 1 → 11111111.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: "Rudo converts −36 to two's complement. She writes +36 as 00100100 and inverts it to get **11011011**. What should she do next?",
    options: [
      ["Add 1 to get 11011100", "Correct: invert then add 1; check: −128 + 64 + 16 + 8 + 4 = −36."],
      ["Stop: 11011011 is the answer", "Inverting alone gives −37, one less than −36."],
      ["Subtract 1 to get 11011010", "Subtracting 1 gives −38."],
      ["Change the MSB back to 0", "The MSB must be 1 for a negative number."],
    ],
    answer: "A",
    hints: ["Remember the full method: positive, invert, ..."],
    explanation: `${steps(-36)}.`,
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: "Why can **+128** not be stored in 8-bit two's complement?",
    options: [
      ["It would need the MSB, which is reserved for −128", "Correct: positive numbers need MSB 0, so the largest is 01111111 = 127."],
      ["Two's complement cannot store numbers above 100", "The limit is 127, set by the 7 bits below the MSB."],
      ["128 is not a power of 2", "128 is $2^7$; the issue is the negative MSB."],
      ["Only negative numbers can be stored in two's complement", "Positive numbers from 0 to 127 are stored too."],
    ],
    answer: "A",
    hints: ["What must the MSB be for a positive number?"],
    explanation: "Positive values use only the seven bits worth 64 to 1, giving at most 127. 10000000 already means −128.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In two's complement, a positive number is written in exactly the same way as in ordinary 8-bit binary.",
    answer: true,
    explanation: "True, for 0 to 127: the MSB is 0 so the −128 place is not used.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "To make a number negative in two's complement, you only need to change the MSB to 1.",
    answer: false,
    explanation: "False. Changing only the MSB subtracts 128. For example 00000101 (+5) becomes 10000101 (−123), not −5 (11111011). Use invert-and-add-1.",
  });
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "Complete the conversion of **−90** to 8-bit two's complement.",
    template: "+90 in 8 bits: {{blank:a}}. Inverted: {{blank:b}}. After adding 1: {{blank:c}}.",
    blanks: [
      { id: "a", accepted: [toBase(90, 2, 8)], normalise: ["trim", "remove_whitespace"], wrong: toBase(90, 2) },
      { id: "b", accepted: [inv(toBase(90, 2, 8))], normalise: ["trim", "remove_whitespace"], wrong: toBase(90, 2, 8) },
      { id: "c", accepted: [twos(-90)], normalise: ["trim", "remove_whitespace"], wrong: inv(toBase(90, 2, 8)) },
    ],
    hints: ["$90 = 64 + 16 + 8 + 2$.", "Invert means swap every 0 and 1."],
    explanation: `${steps(-90)}. Check: $${pvSum(twos(-90))} = -90$.`,
  });
  b.match({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "Match each 8-bit two's complement number with its denary value.",
    pairs: [["01111111", String(fromTwos("01111111"))], ["10000000", String(fromTwos("10000000"))], ["11111110", String(fromTwos("11111110"))], ["00000000", String(fromTwos("00000000"))]],
    explanation: "01111111 = 127 (largest); 10000000 = −128 (smallest); 11111110 = −128 + 126 = −2; 00000000 = 0.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain how to tell from its bits whether an 8-bit two's complement number is positive or negative, and why this works.",
    points: [
      "Look at the MSB: 1 means negative, 0 means positive (or zero).",
      "The MSB has place value −128 and the other seven bits add up to at most 127, so whenever the MSB is 1 the total is negative.",
    ],
    modelAnswer: "If the most significant bit is 1 the number is negative; if it is 0 the number is positive or zero. This works because the MSB is worth −128, and the remaining bits can add at most 127, so the total is always below zero when the MSB is set.",
    hints: ["Compare −128 with the largest total of the other seven bits."],
    explanation: "−128 + 127 = −1, so any number with MSB 1 is negative.",
  });
  {
    const temps = [-18, 23];
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, marks: 8, calculator: false, secs: 720,
      stem: "A cold-storage warehouse in Harare records temperatures in °C as 8-bit two's complement integers.",
      parts: [
        P.bits({ label: "(a)", marks: 2, stem: `Convert the temperature ${temps[0]} °C to 8-bit two's complement.`, value: temps[0], width: 8, twosComplement: true, wrong: [inv(toBase(18, 2, 8))], explanation: `${steps(temps[0])}.` }),
        P.bits({ label: "(b)", marks: 1, stem: `Convert the temperature +${temps[1]} °C to 8-bit two's complement.`, value: temps[1], width: 8, twosComplement: true, explanation: `$16 + 4 + 2 + 1 = 23$ → ${twos(23)}.` }),
        P.num({ type: "CALCULATION", label: "(c)", marks: 2, stem: "A reading is stored as 11100111. Convert it to denary.", value: fromTwos("11100111"), wrong: [parseInt("11100111", 2)], explanation: `$${pvSum("11100111")} = ${fromTwos("11100111")}$.` }),
        P.num({ type: "CALCULATION", label: "(d)", marks: 1, stem: "State the lowest temperature the system can record.", value: -128, wrong: [-127], explanation: "10000000 = −128." }),
        P.manual({ label: "(e)", marks: 2, stem: "An engineer suggests storing the temperatures as unsigned 8-bit binary instead. Explain why this would not work for this warehouse.", points: ["Unsigned binary can only store values from 0 to 255 / no negative numbers.", "The warehouse records temperatures below 0 °C (such as −18 °C), which need a negative representation such as two's complement."], modelAnswer: "Unsigned binary stores only 0 to 255, so it has no way to show negative numbers. The cold store works below freezing, for example −18 °C, so it needs two's complement where the MSB is worth −128." }),
      ],
      hints: ["For a negative number: positive in 8 bits, invert, add 1.", "The MSB is worth −128."],
      explanation: `(a) ${twos(-18)}. (b) ${twos(23)}. (c) ${fromTwos("11100111")}. (d) −128.`,
    });
  }
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, marks: 5, calculator: false, secs: 450,
    stem: "Tendai says that the 8-bit two's complement number **10010110** has the denary value 150. He worked it out by adding the place values of the 1s as he would in ordinary binary.",
    parts: [
      P.num({ type: "CALCULATION", label: "(a)", marks: 2, stem: "Give the correct denary value of 10010110 in two's complement.", value: fromTwos("10010110"), wrong: [150], explanation: `$${pvSum("10010110")} = ${fromTwos("10010110")}$.` }),
      P.manual({ label: "(b)", marks: 1, stem: "Explain Tendai's mistake.", points: ["He used +128 for the MSB (unsigned binary) instead of −128."], modelAnswer: "He treated the MSB as +128, as in unsigned binary, but in two's complement it is worth −128." }),
      P.bits({ label: "(c)", marks: 2, stem: "Write the two's complement representation of the positive number with the same size (the opposite sign).", value: -fromTwos("10010110"), width: 8, twosComplement: true, explanation: `+${-fromTwos("10010110")} = ${twos(-fromTwos("10010110"))} (invert 10010110 → 01101001, add 1 → ${twos(-fromTwos("10010110"))}).` }),
    ],
    hints: ["The MSB is −128 in two's complement.", "Invert-and-add-1 also turns a negative number into its positive."],
    explanation: `10010110 = ${fromTwos("10010110")}; its opposite +${-fromTwos("10010110")} = ${twos(-fromTwos("10010110"))}.`,
  });

  b.card("DEFINITION", "Two's complement", "A binary representation of signed integers in which the MSB has a **negative** place value (−128 in 8 bits).");
  b.card("FACT", "8-bit two's complement place values", "−128, 64, 32, 16, 8, 4, 2, 1.");
  b.card("FACT", "Range of 8-bit two's complement", "−128 (10000000) to +127 (01111111).");
  b.card("CONCEPT", "Negative denary → two's complement", "Write the positive in 8 bits, **invert** every bit, then **add 1**.");
  b.card("CONCEPT", "Two's complement → denary", "Add the place values of the 1s, using −128 for the MSB.");
  b.card("CONCEPT", "Meaning of the MSB", "1 = negative, 0 = zero or positive (because −128 outweighs the other bits' total of at most 127).");
  b.card("FACT", "−1 in 8-bit two's complement", "11111111 ($-128 + 127$).");
  b.card("CONCEPT", "Why use two's complement?", "One pattern for zero and the same adder circuit works for positive and negative numbers.");
});
