// W1a: representing text: character sets, ASCII and Unicode.
import { concept, P, toBase } from "../lib.mjs";

const code = (ch) => ch.charCodeAt(0);
const bin = (ch) => toBase(code(ch), 2, 8);

concept("comp.data.text-character-sets", { file: "data/text-character-sets", keyPrefix: "data.text-character-sets" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **character set**?",
    options: [
      ["A list of characters a computer recognises, each with a unique binary code", "Correct: both parts are needed, the list and the unique code."],
      ["The set of keys on a computer keyboard, together with the position of each key", "The keyboard layout is not the character set; many characters have no key."],
      ["A collection of fonts used to display text on the screen", "Fonts control how characters look, not their codes."],
      ["The number of characters that fit on one line of a page", "That is a layout setting, not a character set."],
    ],
    answer: "A",
    explanation: "A character set (such as ASCII or Unicode) lists the characters that can be represented and gives each one a unique binary code.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "How many bits does **standard ASCII** use for each character?",
    options: [
      ["7", "Correct: 7 bits give 128 codes."],
      ["8", "8 bits is extended ASCII (256 codes)."],
      ["16", "16 bits is used by some Unicode encodings."],
      ["4", "4 bits give only 16 codes, far too few."],
    ],
    answer: "A",
    explanation: "Standard ASCII is a 7-bit code: $2^7 = 128$ characters. Extended ASCII uses 8 bits for 256 characters.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why does Unicode use more bits per character than ASCII?",
    options: [
      ["So that it can give a unique code to many more characters", "Correct: more bits give more codes, for all languages and emojis."],
      ["So that text is stored more securely against hackers", "The number of bits has nothing to do with security."],
      ["So that each character is displayed in a larger font", "Font size is a display setting, not part of the code."],
      ["So that text files are smaller than ASCII files", "More bits per character makes files larger, not smaller."],
    ],
    answer: "A",
    explanation: "Each extra bit doubles the number of possible codes. Unicode needs over a million possible codes to cover almost every writing system and emojis.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of these **cannot** be represented in standard ASCII?",
    options: [
      ["An emoji", "Correct: emojis are only in Unicode."],
      ["The capital letter Q", "Upper-case English letters are in ASCII."],
      ["The digit 7", "Digits 0-9 are in ASCII."],
      ["A question mark", "Common punctuation is in ASCII."],
    ],
    answer: "A",
    explanation: "Standard ASCII covers English letters, digits, punctuation and control codes only. Emojis and characters from most other scripts need Unicode.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "The ASCII code for **A** is 65. What is the ASCII code for **F**?",
    options: [
      [String(code("F")), "Correct: F is five letters after A, so 65 + 5 = 70."],
      ["71", "71 is G; A is 65, so F (the sixth letter) is 65 + 5."],
      ["6", "6 is F's position in the alphabet, not its code."],
      [String(code("f")), "102 is the code for lower-case f."],
    ],
    answer: "A",
    explanation: "Letter codes are consecutive: A 65, B 66, C 67, D 68, E 69, **F 70**.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "In ASCII the code for **M** is 77. What is the code for lower-case **m**?",
    options: [
      [String(code("m")), "Correct: lower-case codes are 32 more than upper-case: 77 + 32 = 109."],
      ["78", "78 is the next capital letter, N."],
      ["45", "This subtracts 32 instead of adding it."],
      ["13", "13 is m's position in the alphabet."],
    ],
    answer: "A",
    hints: ["A is 65 and a is 97. What is the difference?"],
    explanation: "a − A = 97 − 65 = 32, so every lower-case letter is 32 more than its capital: m = 109.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A program reads the text **\"8\"** typed by a user. Why must it convert the text before adding 1 to it?",
    options: [
      ["The text 8 is stored as the code 56", "Correct: digit characters have their own codes starting at 48, so the program holds 56, not 8."],
      ["Text cannot be stored in binary at all", "All text is stored in binary, as character codes."],
      ["ASCII cannot represent digits", "Digits 0-9 are in ASCII, with codes 48 to 57."],
      ["The number 8 needs Unicode to be stored", "Digits are part of ASCII, which Unicode includes."],
    ],
    answer: "A",
    hints: ["Is the character 8 the same as the number 8?"],
    explanation: `"0" is 48, so "8" is ${code("8")}. Adding 1 to the code would give "9", not the number 9; the program must convert the text to an integer first.`,
  });
  b.bits({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "The ASCII code for **A** is 65. Give the 8-bit binary code for the letter **K**.",
    value: code("K"), width: 8,
    explanation: `K is 10 letters after A: $65 + 10 = ${code("K")}$ → $64 + 8 + 2 + 1$ → ${bin("K")}.`,
  });
  b.bits({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "The ASCII code for **a** is 97. Give the 8-bit binary code for the letter **t**.",
    value: code("t"), width: 8,
    hints: ["Count on from a: t is the 20th letter.", "Then convert the denary code to binary."],
    explanation: `t is 19 letters after a: $97 + 19 = ${code("t")}$ = ${bin("t")}.`,
  });
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "Decode the ASCII message. You are told that the code for B is 66.",
    template: `${["S", "U", "N"].map((c) => bin(c)).join(" ")} → {{blank:a}}`,
    blanks: [{ id: "a", accepted: ["SUN"], normalise: ["trim", "collapse_whitespace"], wrong: "SVN" }],
    hints: ["Convert each byte to denary first.", "Then count on from B = 66."],
    explanation: `${["S", "U", "N"].map((c) => `${bin(c)} = ${code(c)} = ${c}`).join("; ")}.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: false, unit: "bits",
    stem: "The word **Masvingo** is stored using 8 bits per character. How many bits are needed?",
    value: "Masvingo".length * 8, wrong: ["Masvingo".length * 7, "Masvingo".length],
    hints: ["Count every character.", "Multiply by the bits per character."],
    explanation: `"Masvingo" has ${"Masvingo".length} characters: $${"Masvingo".length} \\times 8 = ${"Masvingo".length * 8}$ bits.`,
  });
  b.calc({
    d: 4, skill: "APPLICATION", calculator: false, unit: "bytes",
    stem: "The text **Pay now!** is stored in a Unicode format that uses 16 bits for every character. How many **bytes** does it take?",
    value: "Pay now!".length * 2, wrong: ["Pay now!".length, "Pay now!".length * 2 - 2],
    hints: ["Count the space and the exclamation mark as characters.", "16 bits = 2 bytes."],
    explanation: `"Pay now!" has ${"Pay now!".length} characters (including the space and !). $${"Pay now!".length} \\times 2 = ${"Pay now!".length * 2}$ bytes.`,
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The first 128 codes of Unicode are the same as the ASCII codes.",
    answer: true,
    explanation: "True. Unicode was designed to be compatible with ASCII, so English text has the same codes in both.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A text file stored in Unicode is usually smaller than the same text stored in ASCII.",
    answer: false,
    explanation: "False. Unicode can use more bits per character, so the same text usually takes the same or more space.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each character set with the correct description.",
    pairs: [
      ["Standard ASCII", "7 bits per character, 128 characters"],
      ["Extended ASCII", "8 bits per character, 256 characters"],
      ["Unicode", "Up to 32 bits per character, almost every language and emojis"],
    ],
    extraRight: ["4 bits per character, 16 characters"],
    explanation: "ASCII: 7 bits (128). Extended ASCII: 8 bits (256). Unicode: more bits (up to 32) and a huge range of characters.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how the text **OK** is stored and displayed by a computer that uses ASCII.",
    points: [
      "Each character has a unique code in the character set (O = 79, K = 75).",
      "The codes are stored in binary (e.g. 01001111 01001011), one per character, in sequence.",
      "To display the text, the computer looks up each code in the character set and shows the matching character.",
    ],
    modelAnswer: `Each character is looked up in the ASCII character set: O has code ${code("O")} and K has code ${code("K")}. These codes are stored as binary, ${bin("O")} and ${bin("K")}, one after the other. When the text is displayed, each code is matched back to its character.`,
    hints: ["Mention the code, the binary and the display step."],
    explanation: "Text = sequence of character codes stored in binary; display = look up each code.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "A mobile money company in Zimbabwe is choosing between ASCII and Unicode for the text messages it sends to customers. Compare the two character sets and recommend one.",
    points: [
      "ASCII uses fewer bits per character (7/8), so messages take less storage / less data to send.",
      "ASCII has only 128/256 characters: English letters, digits, punctuation; no other scripts or emojis.",
      "Unicode uses more bits per character (up to 32), so messages are larger.",
      "Recommendation with reason, e.g. Unicode, because customers' names or messages may need accented letters, other scripts or symbols that ASCII cannot show.",
    ],
    modelAnswer: "ASCII uses only 7 or 8 bits per character, so messages are small, but it can only represent English letters, digits and basic symbols. Unicode uses more bits per character, so messages take more space, but it can represent almost any character, including accented letters and other scripts. I recommend Unicode, because the company serves many customers whose names or messages may include characters that ASCII cannot show.",
    hints: ["Give a point about size and a point about the range of characters for each.", "End with a justified choice."],
    explanation: "Compare = similarities/differences on size and range; recommend with a reason linked to the scenario.",
  });
  {
    const word = "Exam";
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, marks: 8, calculator: false, secs: 720,
      stem: `Nyasha's computer stores text in 8-bit ASCII. The codes include C = 67 and c = 99. She types the word **${word}**.`,
      parts: [
        P.num({ type: "CALCULATION", label: "(a)", marks: 1, stem: "Give the denary ASCII code for E.", value: code("E"), wrong: [5], explanation: `E is 2 letters after C: $67 + 2 = ${code("E")}$.` }),
        P.bits({ label: "(b)", marks: 2, stem: "Give the 8-bit binary code for x.", value: code("x"), width: 8, explanation: `x is 21 letters after c: $99 + 21 = ${code("x")}$ → ${bin("x")}.` }),
        P.num({ type: "CALCULATION", label: "(c)", marks: 1, unit: "bits", stem: `How many bits are needed to store the word ${word}?`, value: word.length * 8, wrong: [word.length * 7], explanation: `${word.length} characters × 8 bits = ${word.length * 8} bits.` }),
        P.mcq({ label: "(d)", stem: "Nyasha adds a smiling-face emoji to the word. Which character set must the computer use?", options: [["Unicode", "Correct: emojis exist only in Unicode."], ["Standard ASCII", "Standard ASCII has 128 characters and no emojis."], ["Extended ASCII", "Extended ASCII adds symbols and accented letters, not emojis."], ["Binary", "Binary is the number system, not a character set."]], answer: "A", explanation: "Only Unicode includes emojis." }),
        P.manual({ label: "(e)", marks: 3, stem: "Explain one advantage and one disadvantage of using Unicode instead of ASCII.", points: ["Advantage: Unicode can represent far more characters (other languages/scripts, symbols, emojis).", "Because it uses more bits per character / has a larger range of unique codes.", "Disadvantage: each character takes more bits, so files are larger / need more storage or bandwidth."], modelAnswer: "Unicode uses more bits per character, so it can give unique codes to the characters of almost every language as well as emojis. However, because each character needs more bits, the same text takes up more storage and more data to send." }),
      ],
      hints: ["Letters have consecutive codes.", "Count the characters before multiplying."],
      explanation: `(a) ${code("E")}. (b) ${bin("x")}. (c) ${word.length * 8} bits. (d) Unicode.`,
    });
  }
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, marks: 6, calculator: false, secs: 540,
    stem: `A data logger sends the code **${["L", "O", "W"].map(bin).join(" ")}** in 8-bit ASCII when a water tank is nearly empty. The code for B is 66.`,
    parts: [
      P.short({ label: "(a)", marks: 3, stem: "Decode the message.", accepted: ["LOW"], wrong: ["MOW"], explanation: `${["L", "O", "W"].map((c) => `${bin(c)} = ${code(c)} = ${c}`).join("; ")}.` }),
      P.bits({ label: "(b)", marks: 1, stem: "Give the 8-bit ASCII code that would be sent for the letter F.", value: code("F"), width: 8, explanation: `F = 70 = ${bin("F")}.` }),
      P.manual({ label: "(c)", marks: 2, stem: "The engineer asks whether the logger could send the digit 5 as the binary number 00000101. Explain why this would be wrong if the receiver expects ASCII text.", points: ["In ASCII the character 5 has its own code, 53 (00110101), not 5.", "00000101 is the code for a (non-printing) control character, so the receiver would not display 5."], modelAnswer: `The receiver reads each byte as a character code. The character "5" has code ${code("5")} (${bin("5")}); code 5 is a control character, so the receiver would not show the digit 5.` }),
    ],
    hints: ["Convert each byte to denary, then count on from B = 66.", "Digit characters start at 48."],
    explanation: `The message is LOW; F = ${bin("F")}; "5" = ${code("5")}.`,
  });

  b.card("DEFINITION", "Character set", "A list of characters a computer can represent, each with a **unique binary code**.");
  b.card("FACT", "ASCII", "7 bits per character → 128 characters (extended ASCII: 8 bits → 256).");
  b.card("FACT", "Unicode", "More bits per character (up to 32): almost every language plus emojis; first 128 codes = ASCII.");
  b.card("CONCEPT", "Why does Unicode need more bits?", "More bits give more unique codes, so it can represent many more characters; the cost is larger files.");
  b.card("FACT", "Key ASCII codes", "space = 32, \"0\" = 48, A = 65, a = 97.");
  b.card("CONCEPT", "Upper and lower case codes", "A lower-case letter's code is 32 more than its capital (A 65, a 97).");
  b.card("CONCEPT", "How is text stored?", "As a sequence of character codes in binary, one code per character (spaces and punctuation included).");
  b.card("FORMULA", "Size of a text string", "Number of characters × bits per character.");
  b.card("CONCEPT", "Digit character vs number", "The character \"7\" is code 55, not 7; text must be converted before arithmetic.");
});
