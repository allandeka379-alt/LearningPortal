import { toBase, fromBase, mdTable, chk, same, group } from "../lib.mjs";
import { writeLesson } from "./w1a-lib.mjs";

const word = "ZIMSEC";
const codes = [...word].map((c) => c.charCodeAt(0));
const asciiTable = mdTable(["Character", "Denary code", "7-bit binary", "Hexadecimal"], [...word].map((c, i) => [c, codes[i], toBase(codes[i], 2, 7), toBase(codes[i], 16, 2)]));
const bitsWord = codes.length * 7;
const bitsWord8 = codes.length * 8;
const G = "G".charCodeAt(0);
const g = "g".charCodeAt(0);
chk(g - G, 32);
const gBin = toBase(G, 2, 8);
const gLow = toBase(g, 2, 8);
// bit 5 differs
same(toBase(G + 32, 2, 8), gLow, "case");
const utf = (ch) => [...Buffer.from(ch, "utf8")].map((x) => toBase(x, 16, 2));
const cp = (ch) => "U+" + toBase(ch.codePointAt(0), 16).padStart(4, "0");
const sample = ["A", "é", "€", "😀"];
const utfTable = mdTable(["Character", "Code point", "UTF-8 bytes (hex)", "UTF-8 size", "UTF-16 size"], sample.map((c) => [c, cp(c), utf(c).join(" "), `${Buffer.from(c, "utf8").length} byte(s)`, `${Buffer.from(c, "utf16le").length} bytes`]));
const msg = 160;
const ascii7 = msg * 7;
const ext8 = msg;
const u16 = msg * 2;
const ascii16 = ascii7 / 8;

const body = `
## Introduction

A computer stores only bits, so every letter in a text message, every name in a school register in Gweru, and every symbol on a keyboard must be given a number and the number stored in binary. A **character set** is the agreed list of characters and the code for each one. If two systems use different sets, the same bits are shown as different characters, which is why text sometimes appears as strange symbols when a file is opened on another machine.

You should be able to convert between denary and binary (see the number systems lesson). In this lesson you compare ASCII, extended ASCII, Unicode (with UTF-8 and UTF-16) and, for ZIMSEC, EBCDIC.

## Key definitions

:::definition{term="Character set"}
The set of characters that a system can represent, together with the binary code assigned to each character.
:::

:::definition{term="ASCII"}
The American Standard Code for Information Interchange: a 7-bit code giving 128 different codes for letters, digits, punctuation and control characters.
:::

:::definition{term="Extended ASCII"}
An 8-bit code that keeps the 128 ASCII codes and adds 128 more, giving 256 codes (used for accented letters and extra symbols; the extra codes vary between versions).
:::

:::definition{term="Unicode"}
A character set that gives every character from the world's writing systems a unique number called a **code point**, which can be stored using an encoding such as UTF-8 or UTF-16.
:::

:::keyfact{title="Sizes to learn"}
7 bits give 2^7 = 128 codes; 8 bits give 2^8 = 256 codes. UTF-8 uses 1 to 4 bytes per character; UTF-16 uses 2 or 4 bytes. The first 128 Unicode code points are the same as ASCII.
:::

## ASCII

Characters are given codes in a fixed order, so sorting by code sorts alphabetically within a case. The digits 0 to 9 have consecutive codes (48 to 57), the capital letters A to Z are consecutive from 65, and the lower-case letters a to z are consecutive from 97. The first 32 codes (0 to 31) are control characters such as line feed and tab, which are not printed.

:::worked-solution{title="Write the word ${word} in ASCII"}
1. Look up each character's code (a code table is given in the exam) and convert it to 7-bit binary:

${asciiTable}

2. The word has ${codes.length} characters, so it needs ${codes.length} × 7 = **${bitsWord} bits** in 7-bit ASCII, or ${codes.length} × 8 = ${bitsWord8} bits if each character is stored in a full byte.
:::

Because upper- and lower-case letters are in the same order, 32 apart, converting case changes one bit.

:::worked-solution{title="Convert G to g"}
1. G has code ${G}, which is ${gBin} in 8 bits.
2. The lower-case g has code ${G} + 32 = ${g}, which is ${gLow}.
3. Only the bit worth 32 has changed (from 0 to 1). A program can therefore convert case by adding or subtracting 32.
:::

## Extended ASCII

Eight bits per character allow 256 codes. The extra 128 codes were used for accented letters (like é), box-drawing characters and symbols, but different countries chose different extra characters, so a file written in one version could display wrongly in another. Extended ASCII is still one byte per character, which makes text files small, but it cannot hold more than 256 different characters.

## Unicode, UTF-8 and UTF-16

Unicode solves the compatibility problem by giving every character, whatever the language, a single code point written as U+ followed by hexadecimal. It covers Latin letters with accents, Arabic, Chinese, Devanagari, mathematical symbols and emoji. Shona and Ndebele are written mainly in Latin letters, which ASCII already holds, but a document that mixes those languages with names, quotations or symbols from other scripts needs Unicode.

The code point is then stored using an **encoding**:

- **UTF-8** is variable width. Code points up to U+007F use one byte, identical to ASCII, so ASCII text is valid UTF-8. Other characters use two, three or four bytes.
- **UTF-16** uses two bytes for most common characters and four bytes (a pair) for the rest.

${utfTable}

:::worked-solution{title="Compare storage of a ${msg}-character message"}
1. 7-bit ASCII: ${msg} × 7 = ${ascii7} bits (${ascii16} bytes).
2. Extended ASCII or UTF-8 using only plain English letters: ${msg} × 1 byte = ${ext8} bytes.
3. UTF-16 with common characters: ${msg} × 2 bytes = **${u16} bytes**, twice the size.
4. The Unicode versions allow far more characters, but cost more storage for plain English text in UTF-16.
:::

## EBCDIC (ZIMSEC)

EBCDIC (Extended Binary Coded Decimal Interchange Code) is an 8-bit code created by IBM. Its letters are not in one continuous run of codes, and it is not compatible with ASCII. It is found today mostly on older mainframe systems, such as in banks, which still run programs written for them. Data moved between an EBCDIC mainframe and an ASCII PC must be translated.

:::example{title="Why the choice of character set matters"}
A Bulawayo school stores learners' names in a database using extended ASCII. A new learner's name contains a character that is not among the 256 codes. The system cannot store it correctly and shows a different symbol. Changing the database to Unicode (UTF-8) lets every name be stored exactly, while plain English letters still use one byte each.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: ASCII, extended ASCII and Unicode, with a comparison of range, storage per character and compatibility. UTF-8 and UTF-16 are described only in outline. EBCDIC is ZIMSEC detail. Neither board expects you to memorise codes; a code table is given.
:::

## Comparing the sets

${mdTable(["Character set", "Bits per character", "Number of codes", "Notes"], [["ASCII", "7", "128", "English letters, digits, punctuation, control codes"], ["Extended ASCII", "8", "256", "Adds accented letters and symbols; versions differ"], ["EBCDIC (ZIMSEC)", "8", "256", "IBM mainframes; not compatible with ASCII"], ["Unicode (UTF-8)", "8 to 32", "over a million code points available", "All scripts; ASCII text is unchanged"], ["Unicode (UTF-16)", "16 or 32", "over a million code points available", "Two bytes for most common characters"]])}

## Common mistakes

:::mistake{title="Saying ASCII has 256 characters"}
Standard ASCII is a 7-bit code with 128 characters. Extended ASCII is the 8-bit code with 256.
:::

:::mistake{title="Confusing a character with its code"}
The character 5 is not the number 5. The character '5' has code 53 in ASCII, so you cannot add it to a number without converting it.
:::

:::mistake{title="Thinking Unicode always needs two bytes"}
UTF-8 stores ASCII characters in one byte. The size depends on the encoding as well as on the character.
:::

:::mistake{title="Giving a vague reason for choosing Unicode"}
Say that Unicode can represent the characters of many languages and symbols with a single code, avoiding clashes between different 8-bit sets.
:::

## Exam tips

:::exam-tip{title="Which papers test this"}
ZIMSEC Paper 1 and Cambridge Paper 1 ask you to state the number of bits and codes, compare character sets, and calculate the storage for a message. For **explain why Unicode is needed** give two points: more characters (many languages) and one standard code. For a size calculation, multiply the number of characters by the bits per character and give the unit asked for.
:::

:::exam-tip{title="Use the code table"}
When a table is given, use the stated codes. For ordering questions, remember that letters are in sequence, so the code of the next letter is one more.
:::

:::exam-tip{title="Check the unit"}
Read whether the question wants bits, bytes or kibibytes (kilobytes for ZIMSEC) before giving your final value.
:::

## Summary

:::summary
- A character set maps each character to a binary code.
- ASCII is 7 bits (128 codes); extended ASCII is 8 bits (256 codes).
- Unicode gives every character a code point; UTF-8 uses 1 to 4 bytes and UTF-16 uses 2 or 4 bytes.
- Letters and digits are in order, and upper and lower case differ by 32.
- EBCDIC is an 8-bit IBM code found on older mainframes (ZIMSEC only).
:::
`;
writeLesson({ key: "data.character-sets", title: "Character sets: ASCII, extended ASCII, Unicode and EBCDIC", summary: "Describe how characters are stored as binary codes, compare ASCII, extended ASCII, Unicode (UTF-8 and UTF-16) and EBCDIC, and calculate storage for text.", concept: "acs.data.character-sets", minutes: 40 }, body);
