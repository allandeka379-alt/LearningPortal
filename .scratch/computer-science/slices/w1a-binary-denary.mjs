// W1a: converting between binary and denary (positive integers, up to 16 bits).
import { concept, P, toBase, fromBase, group } from "../lib.mjs";

const ones = (s) => [...s].map((c, i) => (c === "1" ? 2 ** (s.length - 1 - i) : 0)).filter(Boolean);
const sumText = (s) => `${ones(s).join(" + ")} = ${fromBase(s, 2)}`;

concept("comp.data.binary-denary", { file: "data/binary-denary", keyPrefix: "data.binary-denary" }, (b) => {
  // Binary -> denary
  for (const [s, d, daily, wrong] of [["00101101", 2, true, [44, 180]], ["11100011", 3, false, [226, 199]]]) {
    const v = fromBase(s, 2);
    b.num({
      d, skill: "APPLICATION", daily: daily || undefined, calculator: false,
      stem: `Convert the binary number **${s}** to denary.`,
      value: v, wrong,
      explanation: `Add the place values under the 1s: $${ones(s).join(" + ")} = ${v}$.`,
      workedSolution: `1. Place values: 128, 64, 32, 16, 8, 4, 2, 1.\n2. The 1s are under ${ones(s).join(", ")}.\n3. ${sumText(s)}.`,
      hints: d >= 3 ? ["Write 128 64 32 16 8 4 2 1 over the bits.", "Only the places with a 1 count."] : undefined,
    });
  }
  // Denary -> 8-bit binary
  b.bits({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: "Convert the denary number **75** to an **8-bit** binary number.",
    value: 75, width: 8, wrong: ["1001011", "11010010"],
    explanation: `$64 + 8 + 2 + 1 = 75$, so the answer is ${toBase(75, 2, 8)}. As an 8-bit number it needs the leading zero; ${toBase(75, 2)} has only 7 bits, and 11010010 is the bits in reverse order.`,
  });
  b.bits({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "Convert the denary number **232** to an **8-bit** binary number.",
    value: 232, width: 8,
    hints: ["Start with 128: does it fit into 232?", "Subtract each place value that fits and carry on with what is left."],
    explanation: `232 − 128 = 104; 104 − 64 = 40; 40 − 32 = 8; 8 − 8 = 0. The 1s go under 128, 64, 32 and 8: ${toBase(232, 2, 8)}.`,
  });
  b.bits({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "Convert the denary number **46** to binary.",
    value: 46, acceptUnpadded: true,
    hints: ["Find the largest place value that fits into 46."],
    explanation: `$32 + 8 + 4 + 2 = 46$, so 46 is ${toBase(46, 2)} (or ${toBase(46, 2, 8)} as an 8-bit number).`,
  });
  // 16-bit
  {
    const v = 2 ** 10 + 2 ** 9 + 2 ** 3; // 1544
    const s = toBase(v, 2, 16);
    b.num({
      d: 4, skill: "APPLICATION", calculator: false,
      stem: `Convert the 16-bit binary number **${group(s)}** to denary.`,
      value: v, wrong: [v - 2 ** 3 + 2 ** 4, 776],
      hints: ["The place values of the left group of 8 run from 32768 down to 256.", "Only three bits are 1."],
      explanation: `The 1s are under 1024, 512 and 8: $1024 + 512 + 8 = ${v}$.`,
      workedSolution: `1. Split into bytes: ${group(s.slice(0, 8))} | ${group(s.slice(8))}.\n2. Left byte: 1s under 1024 and 512.\n3. Right byte: a 1 under 8.\n4. $1024 + 512 + 8 = ${v}$.`,
    });
  }
  b.bits({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: "Convert the denary number **770** to a **16-bit** binary number.",
    value: 770, width: 16,
    hints: ["The place value 512 fits into 770; what is left?", "Write all 16 bits, with leading zeros."],
    explanation: `$770 = 512 + 256 + 2$, so the 16-bit number is ${group(toBase(770, 2, 16))}.`,
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "When converting denary to binary by repeated division by 2, how are the remainders read?",
    options: [
      ["From the last remainder to the first", "Correct: the last remainder is the most significant bit, so read from the bottom up."],
      ["From the first remainder to the last", "That writes the number backwards: the first remainder is the least significant bit."],
      ["Only the remainders that are 1 are written", "Every remainder, 0 or 1, is one bit of the answer."],
      ["The quotients are read instead of the remainders", "The quotients are what you divide next; the bits are the remainders."],
    ],
    answer: "A",
    explanation: "The first division gives the 1s bit (LSB); the last gives the MSB. Reading the remainders bottom-up gives the bits from left to right.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of these binary numbers represents an **odd** denary number?",
    options: [
      ["10010011", "Correct: it ends in 1, so the 1s place counts and the number is odd (147)."],
      ["10010010", "It ends in 0, so the value (146) is even."],
      ["11111110", "It ends in 0, so the value (254) is even."],
      ["01101000", "It ends in 0, so the value (104) is even."],
    ],
    answer: "A",
    explanation: "Every place value except the rightmost is even, so a binary number is odd exactly when its least significant bit is 1.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: "What is the denary value of the binary number **01000001**?",
    options: [
      ["65", "Correct: 64 + 1 = 65."],
      ["130", "This reads the bits in reverse order (128 + 2)."],
      ["2", "This counts the number of 1s, not their place values."],
      ["11", "This treats the bits as the denary digits 1 and 1."],
    ],
    answer: "A",
    explanation: "The 1s are under 64 and 1: $64 + 1 = 65$.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: "Which denary number **cannot** be stored as an unsigned 8-bit binary number?",
    options: [
      ["256", "Correct: the largest 8-bit value is 255; 256 needs a ninth bit (100000000)."],
      ["255", "255 = 11111111 fits exactly in 8 bits."],
      ["128", "128 = 10000000 fits in 8 bits."],
      ["0", "0 = 00000000 fits in 8 bits."],
    ],
    answer: "A",
    hints: ["What is the largest value when all 8 bits are 1?"],
    explanation: "8 bits hold 0 to $2^8 - 1 = 255$.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: "Tendai converted 52 to binary by repeated division and wrote **001011**. What mistake did he make?",
    options: [
      ["He read the remainders from top to bottom", "Correct: 52 is 110100; his answer is the same bits written backwards."],
      ["He divided by 10 instead of by 2", "Dividing by 10 would give the digits 2 and 5, not this pattern."],
      ["He added extra leading zeros", "Leading zeros never change a value; the bits themselves are in the wrong order."],
      ["He left out the last remainder", "All six remainders are there, but in reverse order."],
    ],
    answer: "A",
    hints: ["Convert 52 yourself and compare the two answers.", "Is 001011 even or odd? Is 52?"],
    explanation: `52 ÷ 2 = 26 r 0, 26 ÷ 2 = 13 r 0, 13 ÷ 2 = 6 r 1, 6 ÷ 2 = 3 r 0, 3 ÷ 2 = 1 r 1, 1 ÷ 2 = 0 r 1. Bottom up: ${toBase(52, 2)}. Tendai's answer ends in 1 (odd), but 52 is even.`,
  });
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "Which binary number is the denary value **100**?",
    options: [
      [toBase(100, 2, 8), "Correct: 64 + 32 + 4 = 100."],
      [toBase(100 - 4 + 2, 2, 8), "This is 64 + 32 + 2 = 98: the 4 was placed in the 2s column."],
      [toBase(52, 2, 8), "This is 32 + 16 + 4 = 52: the 64 was placed in the 16s column."],
      [toBase(38, 2, 8), "This is the correct bits written in reverse order (value 38)."],
    ],
    answer: "A",
    explanation: `$100 - 64 = 36$, $36 - 32 = 4$, $4 - 4 = 0$: the 1s go under 64, 32 and 4 → ${toBase(100, 2, 8)}.`,
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "What is the denary value of the 8-bit binary number **11111111**?",
    options: [
      ["255", "Correct: 128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = 255."],
      ["256", "256 is the number of different 8-bit patterns, not the largest value."],
      ["8", "This counts the bits instead of adding their place values."],
      ["128", "128 is only the value of the leftmost bit."],
    ],
    answer: "A",
    explanation: "All eight places count: the total is $2^8 - 1 = 255$, the largest unsigned 8-bit value.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The binary numbers 110 and 00000110 have the same denary value.",
    answer: true,
    explanation: "True. Leading zeros add nothing: both are $4 + 2 = 6$.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The largest number that can be stored in 16 bits is 65536.",
    answer: false,
    explanation: "False. 16 bits give $2^{16} = 65536$ patterns, but one of them is 0, so the largest value is 65535.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Rudo converts 37 to 8-bit binary with the place-value method. Complete her working.",
    template: "Place values that fit: 32, then {{blank:a}}, then 1. So 37 in 8-bit binary is {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["4"], wrong: "8" },
      { id: "b", accepted: [toBase(37, 2, 8)], normalise: ["trim", "remove_whitespace"], wrong: toBase(37, 2) },
    ],
    hints: ["After 32, 5 is left. Which place value fits into 5?"],
    explanation: `37 − 32 = 5; 5 − 4 = 1; 1 − 1 = 0. The 1s go under 32, 4 and 1: ${toBase(37, 2, 8)}.`,
  });
  b.match({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "Match each binary number with its denary value.",
    pairs: [["00001111", String(fromBase("00001111", 2))], ["00010000", String(fromBase("00010000", 2))], ["10000001", String(fromBase("10000001", 2))], ["11110000", String(fromBase("11110000", 2))]],
    explanation: "00001111 = 8 + 4 + 2 + 1 = 15; 00010000 = 16; 10000001 = 128 + 1 = 129; 11110000 = 128 + 64 + 32 + 16 = 240.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Describe how to convert a denary number to binary using **repeated division by 2**.",
    points: [
      "Divide the number by 2 repeatedly (each time dividing the quotient), writing down the remainder (0 or 1) each time, until the quotient is 0.",
      "Read the remainders in reverse order (last remainder is the most significant bit) to give the binary number.",
    ],
    modelAnswer: "Divide the denary number by 2 and write down the remainder. Keep dividing each quotient by 2 and recording the remainders until the quotient is 0. The binary number is the remainders read from the last to the first.",
    hints: ["Two things: what you do repeatedly, and how you read the answer."],
    explanation: "Each remainder is one bit; the first is the least significant bit, so the remainders are read bottom-up.",
  });
  {
    const reading = 181;
    const s = toBase(reading, 2, 8);
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: false, secs: 480,
      stem: "A weather station at a school in Gweru stores each temperature reading, in tenths of a degree above 0 °C, as an 8-bit unsigned binary number.",
      parts: [
        P.bits({ label: "(a)", marks: 2, stem: `One reading is the denary value ${reading}. Write it as an 8-bit binary number.`, value: reading, width: 8, explanation: `$128 + 32 + 16 + 4 + 1 = ${reading}$ → ${s}.` }),
        P.num({ type: "CALCULATION", label: "(b)", marks: 2, stem: "Another reading is stored as 01111010. Convert it to denary.", value: fromBase("01111010", 2), wrong: [fromBase("01011110", 2)], explanation: `$64 + 32 + 16 + 8 + 2 = ${fromBase("01111010", 2)}$.` }),
        P.manual({ label: "(c)", marks: 2, stem: "A reading of 312 tenths of a degree must be stored. Explain why the 8-bit format cannot store it and state how many bits are needed.", points: ["8 bits store at most 255, and 312 is larger than 255.", "9 bits are needed ($2^9 = 512$ values, 0 to 511)."], modelAnswer: "The largest 8-bit unsigned value is 255 and 312 is bigger, so it does not fit. Nine bits are needed, because 9 bits hold values up to 511." }),
      ],
      hints: ["Write the place values 128 to 1 for (a) and (b).", "What is the largest 8-bit value?"],
      explanation: `(a) ${s}. (b) ${fromBase("01111010", 2)}. (c) 312 > 255, so a ninth bit is needed.`,
    });
  }
  {
    const port = 3000;
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: false, secs: 540,
      stem: "Network software in a Bulawayo office stores port numbers as 16-bit unsigned binary integers.",
      parts: [
        P.bits({ label: "(a)", marks: 2, stem: `Convert the port number ${port} to a 16-bit binary number.`, value: port, width: 16, explanation: `$${port} = ${ones(toBase(port, 2)).join(" + ")}$ → ${group(toBase(port, 2, 16))}.` }),
        P.num({ type: "CALCULATION", label: "(b)", marks: 2, stem: "Convert the stored value 0001 0000 0000 0001 to denary.", value: fromBase("0001000000000001", 2), wrong: [4097 - 1], explanation: "The 1s are under 4096 and 1: $4096 + 1 = 4097$." }),
        P.num({ type: "CALCULATION", label: "(c)", marks: 1, stem: "State the largest port number that can be stored.", value: 65535, wrong: [65536], explanation: "$2^{16} - 1 = 65535$." }),
      ],
      hints: ["The 16-bit place values go up to 32768.", "For 3000: 2048 fits; what is left?"],
      explanation: `(a) ${group(toBase(port, 2, 16))}. (b) 4097. (c) 65535.`,
    });
  }

  b.card("CONCEPT", "Binary → denary", "Write the place values (128 … 1) over the bits and **add** the place values where the bit is 1.");
  b.card("CONCEPT", "Denary → binary (place-value method)", "From the largest place value down: if it fits into what is left, write 1 and subtract; otherwise write 0.");
  b.card("CONCEPT", "Denary → binary (division method)", "Divide by 2 repeatedly, recording each remainder; read the remainders from the **last to the first**.");
  b.card("FACT", "Range of an 8-bit unsigned number", "0 to 255 (00000000 to 11111111).");
  b.card("FACT", "Range of a 16-bit unsigned number", "0 to 65535.");
  b.card("DEFINITION", "Leading zeros", "Zeros on the left that fill a fixed number of bits; they never change the value (101 = 00000101 = 5).");
  b.card("FACT", "Odd or even in binary", "A binary number is odd if its rightmost bit (LSB) is 1, even if it is 0.");
  b.card("FACT", "Place values from 256 to 32768", "256, 512, 1024, 2048, 4096, 8192, 16384, 32768 (the left byte of a 16-bit number).");
  b.card("CONCEPT", "How to check a conversion", "Convert your answer back. Binary → denary should give the number you started with.");
});
