// W1a: character sets. Both boards; EBCDIC is ZIMSEC detail.
import { concept, P, ZIM, toBase, fromBase, group, chk } from "../lib.mjs";

concept("acs.data.character-sets", { file: "data/character-sets", keyPrefix: "data.character-sets" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "How many different characters can be represented by standard 7-bit ASCII?",
    options: [
      [String(2 ** 7), "Correct: 7 bits give 2^7 = 128 different codes."],
      [String(2 ** 8), "That is the number of codes in extended 8-bit ASCII."],
      ["127", "Codes run from 0 to 127, but that is 128 codes in total."],
      ["64", "64 codes would need only 6 bits."],
    ],
    answer: "A",
    explanation: "Seven bits give 2^7 = 128 codes (0 to 127). Extended ASCII uses 8 bits for 256.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "How many bits does each character use in extended ASCII?",
    options: [
      ["8", "Correct: extended ASCII uses one byte (8 bits), giving 256 codes."],
      ["7", "That is standard ASCII."],
      ["16", "That is the usual size of a UTF-16 character."],
      ["32", "UTF-32 uses 32 bits, but that is not extended ASCII."],
    ],
    answer: "A",
    explanation: "Extended ASCII keeps the 128 ASCII codes and uses the eighth bit to add 128 more, so every character is one byte.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In UTF-8, a character from the original ASCII set is stored in one byte.",
    answer: true,
    feedbackTrue: "Correct: the first 128 code points are the same as ASCII and use a single byte.",
    feedbackFalse: "UTF-8 is variable width and keeps ASCII characters at one byte, which makes it compatible with ASCII.",
    explanation: "UTF-8 uses one byte for U+0000 to U+007F and two to four bytes for other code points.",
  });
  {
    const w = "HARARE";
    b.num({
      d: 2, skill: "APPLICATION", daily: true, unit: "bits",
      stem: `How many bits are needed to store the word **${w}** in 7-bit ASCII?`,
      value: w.length * 7,
      workedSolution: `1. The word has ${w.length} characters.\n2. Each uses 7 bits: ${w.length} × 7 = ${w.length * 7} bits.`,
      explanation: `${w.length} characters × 7 bits = ${w.length * 7} bits.`,
    });
  }
  {
    const chars = 250;
    b.calc({
      d: 2, skill: "APPLICATION", unit: "bytes", calculator: false,
      stem: `A text message of ${chars} characters, all stored in two bytes each (UTF-16), is sent from Mutare. How many bytes does it use?`,
      value: chars * 2,
      explanation: `${chars} × 2 bytes = ${chars * 2} bytes.`,
    });
  }
  {
    const chars = 3072;
    b.calc({
      d: 3, skill: "APPLICATION", unit: "KiB", calculator: false,
      stem: `A file holds ${chars} characters in UTF-16, with two bytes for each character. How many KiB does the file use? (1 KiB = 1024 bytes.)`,
      value: (chars * 2) / 1024,
      hints: ["First find the number of bytes.", "Divide by 1024 to change bytes to KiB."],
      explanation: `${chars} × 2 = ${chars * 2} bytes; ${chars * 2} ÷ 1024 = ${(chars * 2) / 1024} KiB.`,
    });
  }
  {
    const target = "F".charCodeAt(0);
    b.bits({
      d: 3, skill: "APPLICATION",
      stem: "In ASCII the capital letter **A** has the denary code 65 and the letters follow in alphabetical order. Write the 7-bit binary ASCII code for the capital letter **F**.",
      value: target, width: 7,
      hints: ["Count how many letters F is after A.", "Add that number to 65, then convert to 7-bit binary."],
      explanation: `F is five letters after A, so its code is 65 + 5 = ${target}. In 7 bits that is ${toBase(target, 2, 7)}.`,
    });
  }
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "In ASCII the lower-case letter **a** has the denary code 97 and the letters follow in alphabetical order. What is the denary code of the lower-case letter **e**?",
    value: 101,
    workedSolution: "1. e is four letters after a.\n2. 97 + 4 = 101.",
    explanation: "a, b, c, d, e: e is four places after a, so its code is 97 + 4 = 101.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In ASCII the code for an upper-case letter is 32 less than the code for the same lower-case letter. What change to the binary code turns the upper-case letter into lower case?",
    options: [
      ["Set the bit worth 32 to 1", "Correct: adding 32 changes only the 32s bit from 0 to 1."],
      ["Set the bit worth 64 to 1", "The 64s bit is already 1 in all the letters."],
      ["Invert all seven bits", "Inverting every bit gives an unrelated character."],
      ["Shift every bit one place to the left", "A left shift doubles the code and gives a different character."],
    ],
    answer: "A",
    explanation: "Upper-case letters have codes 65 to 90 and lower-case letters 97 to 122. The difference of 32 is a single bit, so only that bit changes.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A school in Masvingo stores learners' names in a database that uses extended ASCII. One name contains a character that is not among its 256 codes. What is the best solution?",
    options: [
      ["Change the database to Unicode, which has far more characters", "Correct: Unicode has a code point for the character and keeps plain letters compact in UTF-8."],
      ["Change the database to 7-bit ASCII, which holds more characters", "7-bit ASCII holds fewer characters (128) than extended ASCII."],
      ["Store the name as a picture of the letters instead of as text", "That prevents searching and sorting and wastes space."],
      ["Remove the unusual character from the name", "Changing a person's name loses information and is not acceptable."],
    ],
    answer: "A",
    hints: ["Which character set has a very large number of code points?"],
    explanation: "Unicode gives every character a code point, so no name has to be altered. UTF-8 still stores ordinary English letters in one byte.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each character set to its description.",
    pairs: [
      ["ASCII", "7-bit code with 128 characters"],
      ["Extended ASCII", "8-bit code with 256 characters, whose extra codes vary between versions"],
      ["UTF-8", "Unicode encoding using 1 to 4 bytes per character"],
      ["UTF-16", "Unicode encoding using 2 or 4 bytes per character"],
    ],
    explanation: "Each set differs in the number of bits per character and in the number of characters it can represent.",
  });
  b.mcq({
    d: 2, skill: "RECALL", applies: ZIM,
    stem: "Where is the EBCDIC character set mostly found today?",
    options: [
      ["On older IBM mainframe systems", "Correct: EBCDIC was developed by IBM and is still used on some mainframes."],
      ["On mobile phones sold in Zimbabwe", "Phones use Unicode, usually UTF-8 or UTF-16."],
      ["On all personal computers, in place of ASCII", "Personal computers use ASCII-based sets and Unicode."],
      ["In web pages, as the standard web encoding", "Web pages normally use UTF-8."],
    ],
    answer: "A",
    explanation: "EBCDIC is an 8-bit code used by IBM mainframes. It is not compatible with ASCII, so data moved to a PC must be converted.",
  });
  {
    const w = "KARIBA";
    const code = [...w].map((c) => toBase(c.charCodeAt(0), 2, 7)).join(" ");
    b.short({
      d: 3, skill: "APPLICATION",
      stem: `The following 7-bit ASCII codes were received: **${code}**. The code for the capital letter A is 1000001 and the capital letters follow in alphabetical order. What word was sent?`,
      accepted: [w],
      hints: ["Convert each code to denary and compare it with 65 for A.", "Take each letter in turn."],
      wrong: ["KARIBU"],
      explanation: `The codes are ${[...w].map((c) => c.charCodeAt(0)).join(", ")}, which are the letters ${[...w].join(", ")}: ${w}.`,
    });
  }
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the character set that gives every character from all the world's languages its own unique code point.",
    accepted: ["Unicode"],
    wrong: ["ASCII"],
    explanation: "Unicode assigns a code point to every character and is stored using encodings such as UTF-8 and UTF-16.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why Unicode was introduced when ASCII and extended ASCII already existed.",
    points: [
      "ASCII and extended ASCII can represent only 128 or 256 characters, too few for the world's languages and symbols.",
      "Different versions of extended ASCII used the extra codes differently, so text could display incorrectly on another system.",
      "Unicode gives every character one unique code point, so text can be shared and displayed correctly everywhere.",
    ],
    modelAnswer: "ASCII has only 128 codes and extended ASCII 256, which cannot cover all alphabets, symbols and emoji. Different countries used the extra 128 codes differently, so a file could show wrong characters on another machine. Unicode gives each character a unique code point, so it is a single standard for all languages.",
    explanation: "The reasons are number of characters and compatibility between systems.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 3, hints: ["Compare the number of characters and the storage used for plain English text."],
    stem: "A Harare company stores English emails in extended ASCII and is considering UTF-16. Compare the two character sets.",
    points: [
      "Extended ASCII uses one byte per character, but UTF-16 uses at least two bytes, so UTF-16 files are about twice as large for plain English text.",
      "Extended ASCII is limited to 256 characters; UTF-16 can represent every Unicode character.",
      "UTF-16 avoids the clashes between different extended ASCII versions, so text shows correctly on other systems.",
    ],
    modelAnswer: "Extended ASCII stores each character in one byte, so English emails are small, but it can show only 256 characters and its extra codes differ between systems. UTF-16 uses two or four bytes per character, so the same emails take about twice the space, but it can represent all Unicode characters and is a single standard.",
    explanation: "UTF-16 trades storage for range and compatibility.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2, applies: ZIM,
    stem: "A bank in Harare moves customer records from an old mainframe that uses EBCDIC to a PC database that uses ASCII. Explain why the data must be converted.",
    points: [
      "EBCDIC and ASCII give the same characters different binary codes.",
      "Without conversion, the PC would show the wrong characters.",
    ],
    modelAnswer: "The two codes assign different bit patterns to the same characters, so unconverted data would display as the wrong characters on the PC. The records must be translated code by code.",
    explanation: "EBCDIC is not compatible with ASCII.",
  });
  {
    const learners = 640;
    const chars = 24;
    b.struct({
      d: 3, skill: "APPLICATION", examStyle: true, secs: 480,
      stem: `A school in Gweru keeps a list of ${learners} learner names. Each name is stored in a field of ${chars} characters.`,
      parts: [
        P.num({ label: "(a)", marks: 2, type: "CALCULATION", unit: "bytes", stem: `Calculate the number of bytes needed for the names if each character uses one byte (extended ASCII).`, value: learners * chars, explanation: `${learners} × ${chars} = ${learners * chars} bytes.` }),
        P.num({ label: "(b)", marks: 2, type: "CALCULATION", unit: "KiB", stem: "The school changes to Unicode with two bytes for every character. Calculate the storage in KiB. (1 KiB = 1024 bytes.)", value: (learners * chars * 2) / 1024, explanation: `${learners} × ${chars} × 2 = ${learners * chars * 2} bytes; ÷ 1024 = ${(learners * chars * 2) / 1024} KiB.` }),
        P.manual({ label: "(c)", marks: 2, stem: "Give two reasons why the school might accept the larger file size.", points: ["Unicode can represent names with any characters.", "It is a standard, so names display correctly on other systems."], modelAnswer: "UTF-16 can store any character, including names from other languages, and it gives the same display on all systems." }),
      ],
      hints: ["Multiply the number of names by the characters per name, then by the bytes per character.", "Divide by 1024 for KiB."],
      explanation: `Extended ASCII: ${learners * chars} bytes. UTF-16: ${learners * chars * 2} bytes = ${(learners * chars * 2) / 1024} KiB.`,
    });
  }
  {
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, secs: 600,
      stem: "A mobile-money app sends receipts as text. The developers compare three character sets: 7-bit ASCII, extended ASCII (8 bits) and Unicode in UTF-8.",
      parts: [
        P.num({ label: "(a)", marks: 1, type: "CALCULATION", stem: "How many different characters can 7-bit ASCII represent?", value: 128, explanation: "2^7 = 128." }),
        P.num({ label: "(b)", marks: 1, type: "CALCULATION", stem: "How many different characters can extended ASCII represent?", value: 256, explanation: "2^8 = 256." }),
        P.num({ label: "(c)", marks: 2, type: "CALCULATION", unit: "bits", stem: "A receipt contains 90 characters. Calculate the number of bits needed in 7-bit ASCII.", value: 630, explanation: "90 × 7 = 630 bits." }),
        P.mcq({ label: "(d)", marks: 1, stem: "In UTF-8, how many bytes does a plain English letter use?", options: [["1 byte", "Correct: ASCII characters use one byte in UTF-8."], ["2 bytes", "Two bytes is typical for UTF-16."], ["3 bytes", "Three bytes are for some other characters."], ["4 bytes", "Four bytes are for the rarest code points."]], answer: "A", explanation: "UTF-8 is backward compatible with ASCII." }),
        P.manual({ label: "(e)", marks: 3, stem: "The app must also show names with accented letters from other languages. Explain which character set the developers should choose.", points: ["Unicode (UTF-8) should be chosen.", "It has code points for accented letters and other scripts that 7-bit ASCII lacks.", "It keeps plain English text at one byte per character, so receipts stay small."], modelAnswer: "They should choose Unicode, stored as UTF-8. It has code points for accented characters and other scripts, which 7-bit ASCII cannot hold, and plain English letters still need only one byte so receipts stay small." }),
      ],
      hints: ["Consider both the range of characters and the size of the receipts.", "Remember that UTF-8 is variable width."],
      explanation: "7-bit ASCII gives 128 characters, extended ASCII 256, and 90 characters need 630 bits. Unicode in UTF-8 is the best choice for range with compact English text.",
    });
  }

  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A text file contains 1000 characters, each stored in extended ASCII. How many bytes does the file use?",
    options: [
      ["1000 bytes", "Correct: extended ASCII uses one byte for each character."],
      ["125 bytes", "This divides the number of characters by 8, as if each used one bit."],
      ["2000 bytes", "That would be two bytes per character, as in UTF-16."],
      ["8000 bytes", "That is the number of bits, not bytes."],
    ],
    answer: "A",
    explanation: "Extended ASCII uses 8 bits (1 byte) per character, so 1000 characters need 1000 bytes.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which statement about UTF-8 is correct?",
    options: [
      ["It uses from one to four bytes for each character", "Correct: UTF-8 is a variable-width encoding of Unicode."],
      ["It uses exactly two bytes for every character", "Two bytes for every character describes a fixed-width encoding."],
      ["It can represent only the 128 ASCII characters", "UTF-8 can encode every Unicode character."],
      ["It is the same as EBCDIC on a mainframe", "EBCDIC is a different, unrelated code."],
    ],
    answer: "A",
    explanation: "UTF-8 stores ASCII characters in one byte and other characters in two to four bytes.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A file written on one computer in extended ASCII shows some wrong symbols when opened on a computer in another country. What is the most likely cause?",
    options: [
      ["The computers use different versions of the extra codes", "Correct: extended ASCII versions assign different characters to the codes 128 to 255."],
      ["The file was saved as 7-bit ASCII, which has fewer codes", "The first 128 codes are the same in all versions."],
      ["The file is too large to be displayed correctly on the screen", "File size does not change which character a code displays."],
      ["The second computer is using too little memory", "Memory size does not affect the character set."],
    ],
    answer: "A",
    hints: ["Which codes are the same everywhere, and which differ between versions?"],
    explanation: "The first 128 codes are the same in every version, but the extra 128 codes of extended ASCII differ, so accented letters and symbols may be shown wrongly.",
  });

  b.card("DEFINITION", "Character set", "The list of characters a system can represent, with a binary code for each.");
  b.card("FACT", "How many characters in ASCII and extended ASCII?", "ASCII: 7 bits, 128 characters. Extended ASCII: 8 bits, 256 characters.");
  b.card("DEFINITION", "Unicode", "A character set that gives every character of all languages a unique code point, stored using encodings such as UTF-8 and UTF-16.");
  b.card("FACT", "UTF-8 versus UTF-16", "UTF-8 uses 1 to 4 bytes per character (ASCII characters use 1); UTF-16 uses 2 or 4 bytes.");
  b.card("CONCEPT", "Why is Unicode needed?", "To represent the characters of many languages and symbols, and to avoid clashes between different 8-bit character sets.");
  b.card("FACT", "How are upper-case and lower-case letters related in ASCII?", "The code of a lower-case letter is 32 more than the code of the same upper-case letter, so one bit differs.");
  b.card("FACT", "What is EBCDIC? (ZIMSEC)", "An 8-bit IBM character code used on older mainframes; it is not compatible with ASCII.", undefined, { applies: ZIM });
  b.card("CONCEPT", "How do you calculate the storage for a text?", "Multiply the number of characters by the bits (or bytes) per character, then convert to the unit asked for.");
  b.card("FACT", "Do you need to memorise ASCII codes?", "No: a code table is given. You need to know the order (digits, capitals, lower case) and that case differs by 32.");
});
