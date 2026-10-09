// Slice w4b: string handling (comp.prog.string-handling, Cambridge only).
import { concept, P } from "../lib.mjs";
import { fence, LENGTH, SUBSTRING, UCASE, LCASE, charsMd } from "./w4b-0-kit.mjs";

const gz = "Great Zimbabwe";
const sub1 = SUBSTRING("Masvingo", 1, 4);
const sub2 = SUBSTRING("Bulawayo", 5, 4);
const up1 = UCASE("Form 3b");
const W = "Chimanimani";
const mPairs = [
  ["`LENGTH(Word)`", String(LENGTH(W))],
  ["`SUBSTRING(Word, 1, 4)`", `"${SUBSTRING(W, 1, 4)}"`],
  ["`UCASE(SUBSTRING(Word, 5, 3))`", `"${UCASE(SUBSTRING(W, 5, 3))}"`],
  ["`SUBSTRING(Word, LENGTH(Word), 1)`", `"${SUBSTRING(W, LENGTH(W), 1)}"`],
];
const sentence = "Rain fell on Gweru town";
const spaces = [...sentence].filter((c) => c === " ").length;
const user = UCASE(SUBSTRING("Moyo", 1, 3)) + SUBSTRING("2026", 3, 2);
const ed = "Education";
const vowels = [...ed].filter((c) => "aeiou".includes(LCASE(c))).length;
const vowelSteps = [...ed].map((c, i) => `${i + 1}:${c}${"aeiou".includes(LCASE(c)) ? "✓" : ""}`).join(" ");
// Struct: product code "HRE-0457-K".
const code = "HRE-0457-K";
const town = SUBSTRING(code, 1, 3);
const num = SUBSTRING(code, 5, 4);
const last = SUBSTRING(code, LENGTH(code), 1);
// Struct 2: phone check "0772 815 340" style; check starts "07", length 10 when digits only.
const phones = ["0715482903", "0812345678", "071548290"];
const phoneOk = (p) => LENGTH(p) === 10 && SUBSTRING(p, 1, 2) === "07";
const phoneRes = phones.map(phoneOk);
if (phoneRes.join() !== "true,false,false") throw new Error("phones");

const codeCount = `Sentence ← "${sentence}"
Count ← 0
FOR Position ← 1 TO LENGTH(Sentence)
    IF SUBSTRING(Sentence, Position, 1) = " "
        THEN
            Count ← Count + 1
    ENDIF
NEXT Position
OUTPUT Count + 1`;

const codeVowel = `Word ← "${ed}"
Vowels ← 0
FOR Index ← 1 TO LENGTH(Word)
    Letter ← LCASE(SUBSTRING(Word, Index, 1))
    IF Letter = "a" OR Letter = "e" OR Letter = "i" OR Letter = "o" OR Letter = "u"
        THEN
            Vowels ← Vowels + 1
    ENDIF
NEXT Index
OUTPUT Vowels`;

concept("comp.prog.string-handling", { file: "prog/string-handling", keyPrefix: "prog.string-handling" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does `LENGTH(Text)` return?",
    options: [
      ["The number of characters in Text, as an integer", "Correct: every character, including spaces, is counted."],
      ["The number of words in Text", "Words are not counted; characters are."],
      ["The position of the first space in Text", "LENGTH does not search for any character."],
      ["The number of bytes the variable Text uses", "LENGTH counts characters, not storage."],
    ],
    answer: "A",
    explanation: "`LENGTH` gives the number of characters as an INTEGER.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: `What value is returned by \`LENGTH("${gz}")\`?`,
    value: LENGTH(gz),
    wrong: [LENGTH(gz) - 1],
    explanation: `"Great" has 5 characters, the space 1 and "Zimbabwe" 8: ${LENGTH(gz)}.`,
    workedSolution: `1. 5 + 1 + 8.\n2. LENGTH = ${LENGTH(gz)}.`,
  });
  b.short({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "What string is returned by `SUBSTRING(\"Masvingo\", 1, 4)`?",
    accepted: [sub1],
    normalise: ["trim", "strip_punctuation"],
    wrong: ["Masvi"],
    explanation: `Four characters starting at position 1: "${sub1}".`,
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "`UCASE(\"Form 3b\")` is evaluated. Which characters of the string are changed?",
    options: [
      ["o, r, m and b", `Correct: every lower-case letter becomes upper case, giving "${up1}".`],
      ["Only the F", "F is already upper case, so it does not change."],
      ["All seven characters, including 3", "Digits and spaces are not letters, so they are unchanged."],
      ["Only the b at the end", "Every lower-case letter is converted, not just the last."],
    ],
    answer: "A",
    explanation: `UCASE converts letters only; digits, spaces and symbols are unchanged: "${up1}".`,
  });
  b.short({
    d: 3, skill: "APPLICATION",
    hints: ["Write the positions above the letters. The third value is a count, not an end position."],
    stem: "What string is returned by `SUBSTRING(\"Bulawayo\", 5, 4)`?",
    accepted: [sub2],
    normalise: ["trim", "strip_punctuation"],
    wrong: ["away", "wa"],
    explanation: `${charsMd("Bulawayo")}\n\nPositions 5 to 8: "${sub2}".`,
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Try the expression on a code of known length, e.g. 6 characters."],
    stem: "Which expression returns the **last three** characters of the string `Code`, whatever its length?",
    options: [
      ["`SUBSTRING(Code, LENGTH(Code) - 2, 3)`", "Correct: for a 6-character code it starts at position 4 and takes 4, 5, 6."],
      ["`SUBSTRING(Code, LENGTH(Code) - 3, 3)`", "This starts one position too early and misses the last character."],
      ["`SUBSTRING(Code, LENGTH(Code), 3)`", "Starting at the last position leaves no room for three characters."],
      ["`SUBSTRING(Code, 3, LENGTH(Code))`", "This starts at position 3 and asks for too many characters."],
    ],
    answer: "A",
    explanation: "The last n characters start at position LENGTH − n + 1; for n = 3 that is LENGTH − 2.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "`LENGTH` counts spaces as characters.",
    answer: true,
    explanation: "True. A space is a character and occupies a position, so `LENGTH(\"Hi there\")` is 8.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The statement `UCASE(Surname)` on its own line changes the value stored in `Surname` to upper case.",
    answer: false,
    explanation: "False. UCASE returns a new value; it must be assigned, for example `Surname ← UCASE(Surname)`.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    hints: ["Number the characters of Chimanimani first."],
    stem: `\`Word\` holds \`"${W}"\`. Match each expression to its result.\n\n${charsMd(W)}`,
    pairs: mPairs,
    explanation: mPairs.map(([e, r]) => `${e} → ${r}`).join("; ") + ".",
  });
  b.num({
    d: 3, skill: "ANALYSIS", calculator: false,
    hints: ["Count the spaces, then look at the OUTPUT statement."],
    stem: `What is output?\n\n${fence(codeCount)}`,
    value: spaces + 1,
    wrong: [spaces],
    explanation: `There are ${spaces} spaces, so ${spaces} + 1 = ${spaces + 1} is output: the number of words.`,
    workedSolution: `1. Spaces between the ${spaces + 1} words: ${spaces}.\n2. Output Count + 1 = ${spaces + 1}.`,
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    hints: ["The loop must work for a word of any length."],
    stem: "Complete the algorithm, which outputs the characters of `Word` one per line.\n\n```\nFOR Position ← 1 TO [1]\n    OUTPUT SUBSTRING(Word, [2], [3])\nNEXT Position\n```",
    template: "[1] {{blank:a}} [2] {{blank:b}} [3] {{blank:c}}",
    blanks: [
      { id: "a", accepted: ["LENGTH(Word)"], choices: ["LENGTH(Word)", "Word", "Position", "10"] },
      { id: "b", accepted: ["Position"], choices: ["1", "Position", "LENGTH(Word)"] },
      { id: "c", accepted: ["1"], choices: ["1", "Position", "LENGTH(Word)"] },
    ],
    explanation: "Loop to LENGTH(Word) and take 1 character starting at Position on each pass.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    hints: ["OUTPUT with commas prints the items one after another with nothing between them."],
    stem: `What is output?\n\n${fence('Surname ← "Moyo"\nYear ← "2026"\nOUTPUT UCASE(SUBSTRING(Surname, 1, 3)), SUBSTRING(Year, 3, 2)')}`,
    options: [
      [user, "Correct: \"MOY\" followed by \"26\"."],
      ["MOYO26", "SUBSTRING(Surname, 1, 3) takes only three letters."],
      ["MOY2026", "SUBSTRING(Year, 3, 2) takes only two characters."],
      ["MOY20", "SUBSTRING(Year, 3, 2) starts at position 3: \"26\"."],
    ],
    answer: "A",
    explanation: `"MOY" and "26" are output together: ${user}.`,
  });
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    hints: ["LCASE makes the capital E count as a vowel.", "Check each of the letters in turn."],
    stem: `What is output?\n\n${fence(codeVowel)}`,
    value: vowels,
    wrong: [vowels - 1],
    explanation: `The vowels in "${ed}" are E, u, a, i, o: ${vowels}. Without LCASE the capital E would be missed.`,
    workedSolution: `1. Letters checked: ${vowelSteps}.\n2. Vowels = ${vowels}.`,
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    hints: ["Is \"Y\" equal to \"y\"?"],
    stem: "A program asks \"Continue? (Y/N)\". Why should it use `Answer ← UCASE(Answer)` before testing `IF Answer = \"Y\"`?",
    options: [
      ["So that both y and Y are accepted as yes", "Correct: comparisons are case-sensitive, so lower case would otherwise fail."],
      ["Because IF statements only work with upper-case strings", "IF compares any strings; the issue is that \"y\" and \"Y\" differ."],
      ["To make the string shorter before it is compared", "UCASE does not change the length."],
      ["To convert the answer from a string to a Boolean", "UCASE returns a string."],
    ],
    answer: "A",
    explanation: "String comparison is case-sensitive; converting first means one test covers both cases.",
  });
  b.mcq({
    d: 4, skill: "APPLICATION",
    hints: ["Characters can be compared with < and >."],
    stem: "`Ch` holds one character. Which condition is TRUE only when `Ch` is a digit?",
    options: [
      ["`Ch >= \"0\" AND Ch <= \"9\"`", "Correct: the digit characters lie from \"0\" to \"9\"."],
      ["`Ch >= \"0\" OR Ch <= \"9\"`", "Every character satisfies one side of OR."],
      ["`LENGTH(Ch) = 1`", "Every single character has length 1."],
      ["`UCASE(Ch) = Ch`", "Digits pass, but so do capital letters and symbols."],
    ],
    answer: "A",
    explanation: "A range check on characters: `>= \"0\" AND <= \"9\"`.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    hints: ["What if the next string is longer or shorter?"],
    stem: "Explain why a loop that examines each character of `Text` should use `FOR Position ← 1 TO LENGTH(Text)` rather than a fixed end value such as `FOR Position ← 1 TO 20`.",
    points: [
      "LENGTH(Text) makes the loop run exactly once per character, for a string of any length",
      "A fixed value would miss characters of longer strings or ask SUBSTRING for positions that do not exist in shorter strings (an error)",
    ],
    explanation: "The loop adapts to the data.",
    modelAnswer: "Using LENGTH(Text) means the loop runs once for every character whatever the string's length. With a fixed 20, a 25-character string would have its last 5 characters ignored, and a 12-character string would make SUBSTRING ask for positions 13 to 20, which do not exist.",
  });
  b.manualShort({
    d: 4, skill: "CREATION", marks: 5,
    hints: ["Check the length with LENGTH.", "Loop over the characters, looking for one from \"0\" to \"9\"."],
    stem: "Write pseudocode that inputs a password and outputs \"Strong\" if it has at least 8 characters **and** contains at least one digit, otherwise \"Weak\".",
    points: [
      "Inputs the password (with a prompt)",
      "Loop from 1 to LENGTH(Password) taking one character at a time with SUBSTRING",
      "Tests each character for a digit (>= \"0\" AND <= \"9\") and records it (flag or count)",
      "Tests LENGTH(Password) >= 8",
      "Outputs \"Strong\" only when both conditions are met, otherwise \"Weak\"",
    ],
    explanation: "Combine LENGTH, a loop with SUBSTRING and a Boolean flag.",
    modelAnswer: "```\nOUTPUT \"Enter a password\"\nINPUT Password\nHasDigit ← FALSE\nFOR Position ← 1 TO LENGTH(Password)\n    Ch ← SUBSTRING(Password, Position, 1)\n    IF Ch >= \"0\" AND Ch <= \"9\"\n        THEN\n            HasDigit ← TRUE\n    ENDIF\nNEXT Position\nIF LENGTH(Password) >= 8 AND HasDigit\n    THEN\n        OUTPUT \"Strong\"\n    ELSE\n        OUTPUT \"Weak\"\nENDIF\n```",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, marks: 6, secs: 540, calculator: false,
    hints: ["Number the characters, including the hyphens."],
    stem: `A courier labels parcels with codes such as \`"${code}"\`: a three-letter town code, a hyphen, a four-digit parcel number, a hyphen and a size letter.\n\n${charsMd(code)}`,
    parts: [
      P.num({ label: "(a)", stem: "State the value returned by `LENGTH(ParcelCode)` for this code.", value: LENGTH(code), wrong: [LENGTH(code) - 2], explanation: `Ten characters including two hyphens: ${LENGTH(code)}.`, workedSolution: `1. 3 + 1 + 4 + 1 + 1.\n2. ${LENGTH(code)}.` }),
      P.short({ label: "(b)", stem: "State the string returned by `SUBSTRING(ParcelCode, 5, 4)`.", accepted: [num], normalise: ["trim", "strip_punctuation"], wrong: ["-045"], explanation: `Positions 5 to 8: "${num}".` }),
      P.fib({
        label: "(c)", marks: 2, stem: "Complete the expressions.",
        template: `The town code \`"${town}"\` is \`SUBSTRING(ParcelCode, {{blank:a}}, 3)\`. The size letter \`"${last}"\` is \`SUBSTRING(ParcelCode, {{blank:b}}, 1)\`.`,
        blanks: [
          { id: "a", accepted: ["1"], choices: ["0", "1", "3"] },
          { id: "b", accepted: ["LENGTH(ParcelCode)"], choices: ["LENGTH(ParcelCode)", "LENGTH(ParcelCode) - 1", "1", "9"] },
        ],
        explanation: "Positions start at 1; the last character is at position LENGTH(ParcelCode).",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Write a condition that is TRUE when the fourth and ninth characters of `ParcelCode` are both hyphens.",
        points: ["SUBSTRING(ParcelCode, 4, 1) = \"-\"", "AND SUBSTRING(ParcelCode, 9, 1) = \"-\""],
        modelAnswer: "`SUBSTRING(ParcelCode, 4, 1) = \"-\" AND SUBSTRING(ParcelCode, 9, 1) = \"-\"`",
      }),
    ],
    explanation: `(a) ${LENGTH(code)}; (b) "${num}"; (c) 1 and LENGTH(ParcelCode).`,
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, marks: 8, secs: 720,
    hints: ["Check the length before using SUBSTRING.", "Both conditions must be TRUE."],
    stem: `A mobile money app accepts a phone number only if it has exactly 10 characters and begins with \`"07"\`.\n\n${fence('OUTPUT "Enter phone number"\nINPUT Phone\nIF LENGTH(Phone) = 10 AND SUBSTRING(Phone, 1, 2) = "07"\n    THEN\n        OUTPUT "Accepted"\n    ELSE\n        OUTPUT "Rejected"\nENDIF')}`,
    parts: [
      P.fib({
        label: "(a)", marks: 3, stem: "State the output for each input.",
        template: phones.map((p, i) => `\`"${p}"\`: {{blank:p${i}}}`).join("\n\n"),
        blanks: phones.map((p, i) => ({ id: `p${i}`, accepted: [phoneRes[i] ? "Accepted" : "Rejected"], choices: ["Accepted", "Rejected"] })),
        explanation: `${phones[0]}: 10 characters starting 07 (accepted). ${phones[1]}: starts 08 (rejected). ${phones[2]}: only ${LENGTH(phones[2])} characters (rejected).`,
      }),
      P.mcq({
        label: "(b)", stem: "A user types `\"0715 482 903\"` with spaces. What happens?",
        options: [["It is rejected because its length is 12", "Correct: the two spaces make it 12 characters long."], ["It is accepted because it starts with 07", "Both conditions must be TRUE; the length test fails."], ["It is accepted because spaces are ignored", "LENGTH counts spaces."], ["The program crashes", "The comparison is valid; it simply gives FALSE."]],
        answer: "A", explanation: "LENGTH counts the spaces, so the length condition is FALSE.",
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Write pseudocode that also checks that **every** character of `Phone` is a digit, and outputs \"Accepted\" only if all three checks pass.",
        points: [
          "Initialises a flag (e.g. AllDigits ← TRUE) before a loop",
          "FOR loop from 1 to LENGTH(Phone) using SUBSTRING(Phone, Position, 1)",
          "Sets the flag to FALSE when a character is < \"0\" or > \"9\"",
          "Final IF combines the flag with the length and prefix checks",
        ],
        modelAnswer: "```\nAllDigits ← TRUE\nFOR Position ← 1 TO LENGTH(Phone)\n    Ch ← SUBSTRING(Phone, Position, 1)\n    IF Ch < \"0\" OR Ch > \"9\"\n        THEN\n            AllDigits ← FALSE\n    ENDIF\nNEXT Position\nIF LENGTH(Phone) = 10 AND SUBSTRING(Phone, 1, 2) = \"07\" AND AllDigits\n    THEN\n        OUTPUT \"Accepted\"\n    ELSE\n        OUTPUT \"Rejected\"\nENDIF\n```",
      }),
    ],
    explanation: "Accepted, Rejected, Rejected; spaces count towards the length.",
  });

  b.card("DEFINITION", "String", "A sequence of zero or more characters treated as one value, written in double quotes.");
  b.card("FORMULA", "LENGTH", "LENGTH(Text) returns the number of characters (spaces included) as an INTEGER.");
  b.card("FORMULA", "SUBSTRING", "SUBSTRING(Text, Start, Count): Count characters starting at position Start (first position is 1).");
  b.card("FORMULA", "UCASE and LCASE", "Return upper- or lower-case copies; digits, spaces and symbols unchanged. Assign the result to keep it.");
  b.card("FORMULA", "Last n characters", "SUBSTRING(Text, LENGTH(Text) - n + 1, n)");
  b.card("CONCEPT", "Looping over a string", "FOR Position ← 1 TO LENGTH(Text) … SUBSTRING(Text, Position, 1) … NEXT Position");
  b.card("CONCEPT", "Is it a digit?", "Ch >= \"0\" AND Ch <= \"9\" (one character compared as a range).");
  b.card("FACT", "Case-sensitive comparison", "\"y\" <> \"Y\". Convert input with UCASE or LCASE before comparing.");
  b.card("FACT", "Positions in other languages", "0478 pseudocode starts at position 1; Python numbers characters from 0.");
});
