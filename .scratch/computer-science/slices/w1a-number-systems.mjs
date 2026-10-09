// W1a: number systems, why computers use binary, place value in bases 10, 2 and 16.
import { concept, P, toBase, fromBase, ZIM } from "../lib.mjs";

concept("comp.data.number-systems", { file: "data/number-systems", keyPrefix: "data.number-systems" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Why do computers store and process all data in binary?",
    options: [
      ["Their circuits are made of switches that have two states", "Correct: each switch is on or off, which maps exactly onto the two binary digits 1 and 0."],
      ["Binary numbers take up less memory than denary numbers", "Binary numbers need more digits than denary for the same value; memory saving is not the reason."],
      ["Binary arithmetic is easier for programmers to read", "People find binary hard to read; that is why hexadecimal is used as a shorthand."],
      ["Binary was chosen by international law for all devices", "No law sets this; it follows from how the hardware works."],
    ],
    answer: "A",
    explanation: "Transistors, logic gates, registers and storage cells each have two states (on/off, high/low voltage, magnetised one way or the other). Binary has exactly two digits, so each state stores one bit.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **bit**?",
    options: [
      ["A single binary digit, 0 or 1", "Correct: bit is short for binary digit."],
      ["A group of eight binary digits", "Eight bits make a byte."],
      ["A group of four binary digits", "Four bits make a nibble."],
      ["One character typed on a keyboard", "A character is usually stored in one or more bytes, not one bit."],
    ],
    answer: "A",
    explanation: "A **bit** (binary digit) is one 0 or 1, the smallest unit of data. 4 bits = 1 nibble; 8 bits = 1 byte.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How many different bit patterns can be made with **5 bits**?",
    options: [
      ["32", "Correct: each extra bit doubles the patterns, so 5 bits give 2 × 2 × 2 × 2 × 2 = 32."],
      ["10", "This multiplies 5 by 2 instead of raising 2 to the power 5."],
      ["31", "31 is the largest value 5 bits can hold; the count of patterns includes zero as well."],
      ["25", "This is 5 squared; the rule is 2 to the power of the number of bits."],
    ],
    answer: "A", calculator: false,
    explanation: "$n$ bits give $2^n$ patterns: $2^5 = 32$. The largest unsigned value is $2^5 - 1 = 31$.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which digits are used in the **hexadecimal** number system?",
    options: [
      ["0 to 9 and A to F", "Correct: sixteen symbols, with A to F standing for 10 to 15."],
      ["0 to 9 only", "These are the ten denary digits."],
      ["0 to 7 only", "These are the eight octal digits."],
      ["0 to 9 and A to G", "That would be seventeen symbols; base 16 needs exactly sixteen."],
    ],
    answer: "A",
    explanation: "A base-$b$ number system has $b$ digits, from 0 to $b - 1$. Hexadecimal (base 16) uses 0-9 and A (10), B (11), C (12), D (13), E (14), F (15).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In an 8-bit binary number, what is the place value of the **most significant bit**?",
    options: [
      ["128", "Correct: the places from the right are 1, 2, 4, 8, 16, 32, 64, 128."],
      ["256", "256 would be the ninth place; 8 bits stop at 128."],
      ["1", "1 is the place value of the least significant (rightmost) bit."],
      ["8", "8 is the number of bits, not the value of the leftmost place."],
    ],
    answer: "A",
    explanation: "The MSB is the leftmost bit. With 8 bits it is worth $2^7 = 128$; the LSB is worth $2^0 = 1$.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A sensor sends its reading to a computer as a **6-bit** unsigned binary number. What is the largest reading it can send?",
    options: [
      ["63", "Correct: 6 bits give 64 patterns, from 0 to 63."],
      ["64", "64 is the number of patterns; one of them is used for zero."],
      ["32", "32 is the place value of the most significant bit, not the largest total."],
      ["127", "127 is the largest value for 7 bits."],
    ],
    answer: "A", calculator: false,
    hints: ["How many patterns do 6 bits give?", "One pattern must represent zero."],
    explanation: "Largest value = $2^6 - 1 = 63$ (binary 111111 = 32 + 16 + 8 + 4 + 2 + 1).",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is binary storage **reliable**?",
    options: [
      ["A circuit only has to tell a high voltage from a low one", "Correct: two well-separated states are hard to confuse, even with some electrical noise."],
      ["Binary data is always checked twice by the processor", "Checking is done by error-detection methods, not by binary itself."],
      ["Each bit is stored in two places at the same time", "That describes some backup schemes, not binary representation."],
      ["Binary numbers can never be too large for a register", "Overflow can happen in binary just as in any fixed-size register."],
    ],
    answer: "A",
    hints: ["Think about how many different voltage levels each circuit must recognise."],
    explanation: "With two states the gap between 'high' and 'low' is large, so small changes in voltage do not change the value. A ten-level (denary) circuit would be far more error-prone and complex.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Images, sound and program instructions are all stored in a computer as binary.",
    answer: true,
    explanation: "True. All data and instructions must be converted to binary before the computer can store or process them.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The processor carries out its calculations in hexadecimal because hexadecimal is shorter than binary.",
    answer: false,
    explanation: "False. The processor only works in binary. Hexadecimal is a shorthand that makes binary easier for **people** to read and write.",
  });
  b.match({
    d: 2, skill: "RECALL", applies: ZIM,
    stem: "Match each number system with its base.",
    pairs: [["Binary", "2"], ["Denary", "10"], ["Hexadecimal", "16"], ["Octal", "8"]],
    explanation: "Binary is base 2 (digits 0-1), octal base 8 (0-7), denary base 10 (0-9) and hexadecimal base 16 (0-9, A-F).",
  });
  {
    const bitsStr = "01101001";
    const v = fromBase(bitsStr, 2);
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: false,
      stem: `Find the denary value of the binary number **${bitsStr}**.`,
      value: v, wrong: [v + 1, 150],
      explanation: `The 1s are under 64, 32, 8 and 1: $64 + 32 + 8 + 1 = ${v}$.`,
      workedSolution: `1. Write the place values above the bits.
2. The 1s are under 64, 32, 8 and 1.
3. $64 + 32 + 8 + 1 = ${v}$.`,
    });
  }
  {
    const h = "3B";
    const v = fromBase(h, 16);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: `The hexadecimal place values are 16 and 1. Find the denary value of **${h}**.`,
      value: v, wrong: [3 * 16 + 1, 311],
      hints: ["B stands for 11.", "Multiply the left digit by 16."],
      explanation: `$3 \\times 16 = 48$ and B = 11, so $48 + 11 = ${v}$.`,
    });
  }
  b.calc({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "What is the largest denary value that can be stored in **10 bits** (unsigned)?",
    value: 2 ** 10 - 1, wrong: [1024, 20],
    explanation: "$2^{10} = 1024$ patterns, so the largest value is $1024 - 1 = 1023$.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "Inside a computer each switch can be in one of {{blank:a}} states. A single 0 or 1 is called a {{blank:b}}. In binary, each place value is {{blank:c}} times the place to its right.",
    blanks: [
      { id: "a", accepted: ["two", "2"], wrong: "ten" },
      { id: "b", accepted: ["bit", "binary digit"], wrong: "byte" },
      { id: "c", accepted: ["two", "2"], wrong: "ten" },
    ],
    explanation: "Two-state switches store **bits**; binary place values double: 1, 2, 4, 8, …",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Which hexadecimal digit stands for the denary value **13**?",
    accepted: ["D"], wrong: ["C", "13"], maxLength: 4,
    explanation: "A = 10, B = 11, C = 12, **D = 13**, E = 14, F = 15.",
  });
  b.bits({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "Write the **largest** number that can be held in 4 bits, in binary.",
    value: 15, width: 4,
    wrong: ["10000", "1110"],
    hints: ["Which pattern has every place counting?"],
    explanation: "Every bit set: 1111 = 8 + 4 + 2 + 1 = 15. 10000 needs five bits.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why computers use binary to represent data.",
    points: [
      "Computers are made of switches / transistors / logic gates (or circuits) that have only two states.",
      "The two states (on/off, high/low voltage) represent the two binary digits 1 and 0 (each state is one bit).",
      "Any one valid extra point: two states are reliable / easy to distinguish with noise; all data must be converted to binary to be processed and stored; registers and memory hold bits.",
    ],
    modelAnswer: "A computer's processor and memory are built from switches (transistors) that can only be on or off. Binary has only two digits, so on can stand for 1 and off for 0, one bit per switch. Two states are easy to tell apart, so data is stored and processed reliably.",
    hints: ["Start with what the hardware is made of.", "Link the two states to the two digits."],
    explanation: "Credit goes to a linked chain: hardware → two states → two binary digits → reliable. 'Computers only understand 1 and 0' on its own is not an explanation.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "A friend says hexadecimal is used because it lets the computer store numbers in fewer bits. Explain why this is wrong.",
    points: [
      "Data is always stored and processed in binary, using the same number of bits; hexadecimal does not change storage.",
      "Hexadecimal is a shorthand for humans: one hex digit represents four bits, so it is shorter and easier to read/write.",
    ],
    modelAnswer: "The computer still stores the value in binary, so the number of bits does not change. Hexadecimal is only a way of displaying binary for people: each hex digit stands for 4 bits, so it is shorter and easier to read with fewer errors.",
    hints: ["What does the hardware actually store?"],
    explanation: "Hexadecimal makes binary readable for programmers and technicians; it saves no memory.",
  });
  {
    const pat = "10010110";
    const v = fromBase(pat, 2);
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, marks: 6, calculator: false, secs: 480,
      stem: `A school's attendance system in Masvingo stores the number of learners present in a class in an **8-bit** register. One morning the register holds **${pat}**.`,
      parts: [
        P.short({ label: "(a)", marks: 1, stem: "State the place value of the most significant bit of the register.", accepted: ["128"], wrong: ["256"], explanation: "The leftmost of 8 bits is worth $2^7 = 128$." }),
        P.num({ type: "CALCULATION", label: "(b)", marks: 2, stem: "Calculate the denary value held in the register.", value: v, wrong: [v - 1], explanation: `$128 + 16 + 4 + 2 = ${v}$.` }),
        P.num({ type: "CALCULATION", label: "(c)", marks: 1, stem: "State the largest number of learners the register could hold.", value: 255, wrong: [256], explanation: "$2^8 - 1 = 255$." }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain why the register stores the value in binary and not in denary.", points: ["The register is made of switches/circuits (flip-flops) with two states.", "Each two-state element stores one binary digit, 1 or 0; denary would need ten distinguishable states."], modelAnswer: "Each cell of the register is an electronic switch that is either on or off, so it can store one bit; it cannot store the ten different states a denary digit would need." }),
      ],
      hints: ["Write the place values 128 to 1 above the bits.", "Eight bits give 256 patterns including zero."],
      explanation: `The value is ${v}; an 8-bit register holds 0 to 255 because it has only two-state storage elements.`,
    });
  }
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 5, calculator: false, secs: 420,
    stem: "Nyasha is designing a code for the 40 products sold in her family's shop in Bulawayo. Each product will have its own unsigned binary code, and every code must use the same number of bits.",
    parts: [
      P.num({ type: "CALCULATION", label: "(a)", marks: 1, stem: "How many different codes can 5 bits make?", value: 32, wrong: [10], explanation: "$2^5 = 32$." }),
      P.num({ type: "CALCULATION", label: "(b)", marks: 1, stem: "State the smallest number of bits Nyasha needs so that every one of the 40 products has its own code.", value: 6, wrong: [5], explanation: "5 bits give only 32 codes; 6 bits give $2^6 = 64$, enough for 40." }),
      P.num({ type: "CALCULATION", label: "(c)", marks: 1, stem: "How many spare codes will there be with the number of bits from (b)?", value: 64 - 40, wrong: [25], explanation: "$64 - 40 = 24$ spare codes." }),
      P.manual({ label: "(d)", marks: 2, stem: "The shop expects to sell 100 products next year. Explain whether Nyasha's code length will still be enough.", points: ["States it will not be enough: 6 bits give only 64 codes, fewer than 100.", "States that 7 bits are needed, because $2^7 = 128 \\geq 100$."], modelAnswer: "No. Six bits give only 64 different codes, which is fewer than 100 products. She would need 7 bits, which give 128 codes." }),
    ],
    hints: ["Double the number of codes for each extra bit: 2, 4, 8, 16, 32, 64, 128.", "Find the first power of 2 that is at least 40."],
    explanation: "Codes needed ≤ $2^n$. 40 products need 6 bits (64 codes, 24 spare); 100 products need 7 bits (128 codes).",
  });

  b.card("DEFINITION", "Bit", "A **binary digit**: a single 0 or 1, the smallest unit of data.");
  b.card("DEFINITION", "Binary", "The base 2 number system: digits 0 and 1, place values 1, 2, 4, 8, 16, … from the right.");
  b.card("DEFINITION", "Hexadecimal", "The base 16 number system: digits 0-9 and A-F (A = 10 … F = 15); place values 1, 16, 256, …");
  b.card("CONCEPT", "Why do computers use binary?", "Their switches, logic gates, registers and storage have **two states** (on/off). Each state stores one bit, and two states are reliable to tell apart.");
  b.card("FORMULA", "Number of patterns with $n$ bits", "$2^n$ patterns; largest unsigned value $2^n - 1$ (8 bits: 256 patterns, 0 to 255).");
  b.card("FACT", "8-bit place values", "128, 64, 32, 16, 8, 4, 2, 1 (MSB on the left, LSB on the right).");
  b.card("CONCEPT", "Why is hexadecimal used if computers work in binary?", "It is a **shorthand for people**: one hex digit = 4 bits, so values are shorter, easier to read and less error-prone. It does not save memory.");
  b.card("DEFINITION", "Most significant bit (MSB)", "The leftmost bit of a binary number, with the largest place value (128 in an 8-bit number).");
  b.card("FACT", "Hex letters", "A = 10, B = 11, C = 12, D = 13, E = 14, F = 15.");
});
