// W1a: hexadecimal conversions (denary, binary) and uses.
import { concept, P, toBase, fromBase, group } from "../lib.mjs";

const nib = (h) => [...h].map((c) => toBase(fromBase(c, 16), 2, 4)).join(" ");

concept("comp.data.hexadecimal", { file: "data/hexadecimal", keyPrefix: "data.hexadecimal" }, (b) => {
  b.bits({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: "Convert the denary number **93** to hexadecimal.",
    value: 93, base: 16, wrong: ["513", "D5"],
    explanation: `$93 \\div 16 = 5$ remainder 13, and 13 is D, so 93 = ${toBase(93, 16)}. Writing 513 puts the remainder in denary; D5 has the digits the wrong way round.`,
  });
  b.bits({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "Convert the denary number **250** to hexadecimal.",
    value: 250, base: 16, wrong: ["AF", "1510"],
    hints: ["How many 16s are in 250?", "Both digits are letters."],
    explanation: `$250 \\div 16 = 15$ remainder 10: 15 = F and 10 = A, so 250 = ${toBase(250, 16)}.`,
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: "Convert the hexadecimal number **4E** to denary.",
    value: fromBase("4E", 16), wrong: [414, 54],
    explanation: `$4 \\times 16 + 14 = 64 + 14 = ${fromBase("4E", 16)}$.`,
    workedSolution: `1. E = 14.\n2. $4 \\times 16 = 64$.\n3. $64 + 14 = ${fromBase("4E", 16)}$.`,
  });
  b.calc({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: "Convert the hexadecimal number **2C0** to denary.",
    value: fromBase("2C0", 16), wrong: [2 * 16 + 12, 2120],
    hints: ["Three hex digits: the place values are 256, 16 and 1.", "C = 12."],
    explanation: `$2 \\times 256 + 12 \\times 16 + 0 = 512 + 192 = ${fromBase("2C0", 16)}$.`,
  });
  b.bits({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "Convert the hexadecimal number **B7** to an 8-bit binary number.",
    value: fromBase("B7", 16), width: 8, wrong: ["1011111", "01111011"],
    explanation: `B = 1011 and 7 = 0111, so B7 = ${nib("B7")}. Each hex digit must become exactly four bits.`,
  });
  b.bits({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "Convert the hexadecimal number **A05E** to a 16-bit binary number.",
    value: fromBase("A05E", 16), width: 16,
    hints: ["Convert each digit to its own 4-bit nibble.", "0 becomes 0000."],
    explanation: `A → 1010, 0 → 0000, 5 → 0101, E → 1110: ${nib("A05E")}.`,
  });
  b.bits({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: "Convert the binary number **10011101** to hexadecimal.",
    value: fromBase("10011101", 2), base: 16, wrong: ["913", "D9"],
    explanation: `1001 = 9 and 1101 = 13 = D, so the answer is ${toBase(fromBase("10011101", 2), 16)}.`,
  });
  b.bits({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: "Convert the binary number **1110010011** to hexadecimal.",
    value: fromBase("1110010011", 2), base: 16, wrong: ["E4C", "E43"],
    hints: ["Group the bits in fours starting from the right.", "The leftmost group has only two bits: pad it with zeros."],
    explanation: `From the right: 11 1001 0011 → 0011 1001 0011 → 3, 9, 3 = ${toBase(fromBase("1110010011", 2), 16)}. Grouping from the left gives 1110 0100 11, which is wrong.`,
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "How many bits does **one** hexadecimal digit represent?",
    options: [
      ["4", "Correct: one hex digit has 16 values, and 4 bits give $2^4 = 16$ patterns."],
      ["8", "8 bits (a byte) need two hex digits."],
      ["16", "16 is the base, not the number of bits per digit."],
      ["2", "2 bits only give 4 patterns."],
    ],
    answer: "A",
    explanation: "$2^4 = 16$, so each hex digit stands for exactly one nibble (4 bits).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which statement gives a reason why hexadecimal is used by programmers?",
    options: [
      ["It is shorter than binary and so easier to read without errors", "Correct: one hex digit replaces four bits, so values are shorter and fewer mistakes are made."],
      ["It allows data to be stored in fewer bits inside memory", "The computer still stores the value in binary with the same number of bits."],
      ["It is the number system the processor uses for its arithmetic", "The processor works only in binary."],
      ["It can represent negative numbers while binary cannot", "Binary can represent negative numbers (for example two's complement); this is not why hex is used."],
    ],
    answer: "A",
    explanation: "Hexadecimal is a human-friendly shorthand for binary: shorter, easier to read, remember and type, and quick to convert digit by digit.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which of these is normally written in hexadecimal?",
    options: [
      ["A MAC address", "Correct: a MAC address is 48 bits shown as 12 hex digits, often in pairs."],
      ["A person's age in a database", "Ages are entered and displayed in denary."],
      ["The price of an item at a till", "Prices are shown in denary for customers."],
      ["A telephone number", "Telephone numbers are denary digits, not binary values."],
    ],
    answer: "A",
    explanation: "Hexadecimal is used for values that are really binary and are read by technicians or programmers: MAC addresses, colour codes, memory dumps, error codes and assembly code.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: "A web designer uses the colour code **#00C0FF**. Each pair of hex digits gives the intensity of red, green and blue. What is the denary value of the **green** component?",
    options: [
      ["192", "Correct: green is C0, and $12 \\times 16 + 0 = 192$."],
      ["255", "255 is FF, the blue component."],
      ["120", "This reads C0 as 12 followed by 0 in denary."],
      ["12", "This takes only the C and ignores its place value of 16."],
    ],
    answer: "A",
    hints: ["The pairs are in the order red, green, blue.", "C = 12, and the left digit of a pair is worth 16s."],
    explanation: "Red 00 = 0, green C0 = 192, blue FF = 255: a light sky blue.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "What is the largest denary value that can be written with **two** hexadecimal digits?",
    options: [
      ["255", "Correct: FF = $15 \\times 16 + 15 = 255$."],
      ["99", "99 is the largest two-digit denary number."],
      ["256", "256 is the number of different values (0 to 255)."],
      ["1515", "This writes the denary values of F and F side by side."],
    ],
    answer: "A",
    hints: ["Which hex digit is the largest?"],
    explanation: "FF = 1111 1111 = 255: two hex digits hold exactly one byte.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "What is the hexadecimal number **1C** in binary?",
    options: [
      ["00011100", "Correct: 1 → 0001 and C (12) → 1100."],
      ["00010110", "This turns C into 0110 (6) instead of 1100 (12)."],
      ["11100001", "The two nibbles are in the wrong order and reversed."],
      ["00001112", "Binary uses only 0 and 1; C must become the nibble 1100."],
    ],
    answer: "A",
    explanation: "Each hex digit becomes four bits: 1 → 0001, C → 1100, so 1C = 0001 1100 (denary 28).",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: "Which hexadecimal number has the **largest** value?",
    options: [
      ["1FF", "Correct: 1FF has three hex digits, so it is at least 256; its value is 511."],
      ["A0", "A0 = $10 \\times 16 = 160$: the letter makes it look large, but it has only two digits."],
      ["9F", "9F = $9 \\times 16 + 15 = 159$."],
      ["FE", "FE = $15 \\times 16 + 14 = 254$, still less than 256."],
    ],
    answer: "A",
    hints: ["Compare the number of digits first.", "A three-digit hex number is at least 256."],
    explanation: "1FF = $256 + 15 \\times 16 + 15 = 511$; FE = 254, A0 = 160, 9F = 159. A number with more hex digits (and no leading zeros) is always larger.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "When converting binary to hexadecimal, the bits are grouped in fours starting from the left.",
    answer: false,
    explanation: "False. Group from the **right** (the least significant end) and pad the leftmost group with zeros if needed.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each use of hexadecimal with the example.",
    pairs: [
      ["HTML colour code", "#3A7D44"],
      ["MAC address", "00-1B-63-84-45-E6"],
      ["Error code", "0x0000001E"],
      ["Memory dump", "0010: 48 65 6C 6C 6F"],
    ],
    explanation: "A colour code has 6 hex digits after #; a MAC address has 12 hex digits in pairs; error codes are often shown with a 0x prefix; a memory dump lists an address then the bytes stored there.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the table of hexadecimal digits.",
    template: "Denary 10 = hex {{blank:a}}; denary 12 = hex {{blank:b}}; denary 15 = hex {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["A"], wrong: "10" },
      { id: "b", accepted: ["C"], wrong: "B" },
      { id: "c", accepted: ["F"], wrong: "E" },
    ],
    explanation: "A = 10, B = 11, C = 12, D = 13, E = 14, F = 15.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain **two** reasons why a technician would prefer a memory dump displayed in hexadecimal rather than in binary.",
    points: [
      "Hexadecimal is shorter: one hex digit represents four bits (a byte is two hex digits).",
      "So it is easier for humans to read / understand / remember / spot values.",
      "Fewer errors are made when reading or copying it; it is still easy to convert back to binary digit by digit.",
    ],
    modelAnswer: "Hexadecimal is much shorter than binary because each hex digit stands for four bits, so a byte is just two characters. This makes the dump quicker and easier for the technician to read, and fewer mistakes are made copying or comparing values. Each digit converts straight back to four bits when the exact binary is needed.",
    hints: ["Compare the length of a byte in binary and in hex.", "Think about errors when reading long strings of 0s and 1s."],
    explanation: "The point is human readability: hex is compact and maps exactly onto binary, but the computer still stores binary.",
  });
  {
    const mac = "B4-2E-99-0F-7A-13";
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: false, secs: 540,
      stem: `The network card in Chipo's laptop has the MAC address **${mac}**.`,
      parts: [
        P.short({ label: "(a)", marks: 1, stem: "State the number system used to write this MAC address.", accepted: ["hexadecimal", "hex", "base 16"], wrong: ["binary"], explanation: "The digits include letters A-F: it is hexadecimal." }),
        P.num({ type: "CALCULATION", label: "(b)", marks: 1, stem: "State how many bits the full MAC address contains.", value: 48, wrong: [12], explanation: "12 hex digits × 4 bits = 48 bits." }),
        P.bits({ label: "(c)", marks: 2, stem: "Convert the first pair, B4, to 8-bit binary.", value: fromBase("B4", 16), width: 8, explanation: `B → 1011, 4 → 0100: ${nib("B4")}.` }),
        P.num({ type: "CALCULATION", label: "(d)", marks: 2, stem: "Convert the second pair, 2E, to denary.", value: fromBase("2E", 16), wrong: [214], explanation: "$2 \\times 16 + 14 = 46$." }),
      ],
      hints: ["Each hex digit is 4 bits.", "Each pair of hex digits is one byte."],
      explanation: `(a) Hexadecimal. (b) 48 bits. (c) ${nib("B4")}. (d) ${fromBase("2E", 16)}.`,
    });
  }
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: false, secs: 600,
    stem: "A program stores the score of a quiz in a 16-bit register. After one round the register holds **0000 0011 1110 1000**.",
    parts: [
      P.bits({ label: "(a)", marks: 2, stem: "Write the contents of the register in hexadecimal.", value: fromBase("0000001111101000", 2), base: 16, width: 4, acceptUnpadded: true, wrong: ["03E9"], explanation: `0000 = 0, 0011 = 3, 1110 = E, 1000 = 8 → ${toBase(1000, 16, 4)}.` }),
      P.num({ type: "CALCULATION", label: "(b)", marks: 2, stem: "Convert the contents of the register to denary.", value: fromBase("0000001111101000", 2), wrong: [1001], explanation: "$512 + 256 + 128 + 64 + 32 + 8 = 1000$ (or $3 \\times 256 + 14 \\times 16 + 8 = 1000$)." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why a programmer debugging the quiz would read the register in hexadecimal rather than binary.", points: ["Hexadecimal is shorter: 4 digits instead of 16 bits.", "Easier to read / fewer errors in reading or copying; converts directly to binary (one digit per nibble)."], modelAnswer: "The 16 bits become only 4 hex digits, which are much quicker to read, and the programmer is less likely to misread or miscopy them. Each digit still converts straight back to 4 bits." }),
    ],
    hints: ["Split the bits into four nibbles.", "For (b), use either the binary place values or 256, 16, 1."],
    explanation: `(a) ${toBase(1000, 16, 4)} (03E8 or 3E8). (b) 1000.`,
  });

  b.card("DEFINITION", "Hexadecimal", "Base 16: digits 0-9 and A-F (A = 10 … F = 15); place values 1, 16, 256, 4096.");
  b.card("CONCEPT", "Hex → binary", "Replace each hex digit with its **4-bit nibble** (keep the zeros: 3 → 0011).");
  b.card("CONCEPT", "Binary → hex", "Group bits in fours **from the right**, pad the left group with zeros, convert each group.");
  b.card("CONCEPT", "Denary → hex (up to 255)", "Divide by 16: the quotient is the left digit, the remainder the right digit (10-15 become A-F).");
  b.card("CONCEPT", "Hex → denary", "Multiply each digit by its place value (… 256, 16, 1) and add.");
  b.card("CONCEPT", "Why is hexadecimal used?", "Shorter than binary (1 digit = 4 bits), easier for humans to read and type, fewer errors, easy to convert to binary. It does **not** save memory.");
  b.card("FACT", "Uses of hexadecimal", "MAC addresses, HTML colour codes, memory dumps, error codes, assembly code and memory addresses.");
  b.card("FACT", "HTML colour code", "#RRGGBB: one byte (two hex digits) each for red, green and blue; FF = 255 is full intensity.");
  b.card("FACT", "Largest values in hex", "FF = 255 (one byte); FFFF = 65535 (16 bits).");
});
