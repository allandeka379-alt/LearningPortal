---
{
  "key": "data.text-character-sets",
  "title": "Representing text: ASCII and Unicode",
  "summary": "How text is stored as binary codes from a character set; ASCII (7-bit and extended 8-bit) and Unicode; why Unicode needs more bits per character but covers far more characters, languages and emojis; and converting characters to codes using a given table.",
  "concepts": ["comp.data.text-character-sets"],
  "estimatedMinutes": 30,
  "level": "core"
}
---
## Introduction

When Tatenda types a message to a friend in Bulawayo, each key press sends a code to the phone's processor. The letter is not stored as a shape; it is stored as a **number**, and that number is stored in binary. The receiving phone looks up the same number and draws the matching letter on the screen. For this to work, both devices must agree on which number stands for which character. That agreement is called a **character set**.

Both ZIMSEC and Cambridge examine this topic. ZIMSEC asks you to convert keyboard characters to binary using ASCII codes; Cambridge asks you to explain how text is represented and to compare ASCII with Unicode.

## Key definitions

:::definition{term="Character"}
A single letter, digit, punctuation mark, space, symbol or control code (such as a new line) that can be stored as text.
:::

:::definition{term="Character set"}
A defined list of characters that a computer can recognise, in which each character has its own unique binary code.
:::

:::definition{term="ASCII"}
The American Standard Code for Information Interchange: a character set that uses 7 bits per character, giving 128 characters (English letters, digits, punctuation and control codes). Extended ASCII uses 8 bits, giving 256 characters.
:::

:::definition{term="Unicode"}
A character set designed to represent the characters of almost every written language, plus symbols and emojis. It uses more bits per character than ASCII (up to 32 bits) and its first 128 codes are the same as ASCII.
:::

## How text is stored

1. Each key press (or character in a file) is matched to its **code** in the character set.
2. The code is stored as a **binary number**.
3. A word or sentence is stored as a sequence of codes, one per character.
4. To display text, the computer reads each code and shows the matching character.

The **character code** is just a number. The same binary pattern 01000001 could be the number 65 or the letter A: the program decides how to interpret it.

## ASCII

Standard ASCII uses **7 bits**, so it has $2^7 = 128$ codes (0 to 127). These include:

- the upper-case letters A-Z and lower-case letters a-z,
- the digits 0-9,
- punctuation and symbols such as ! ? , . and the space,
- **control characters** that are not printed, such as carriage return and line feed.

In practice each ASCII character is usually stored in one 8-bit byte. **Extended ASCII** uses all 8 bits, so it has $2^8 = 256$ codes. The extra 128 codes hold symbols and some accented letters, but different versions of extended ASCII use them differently.

### Codes are in order

Letters and digits have **consecutive codes**, so if you know one code you can work out the others.

| Character | Denary code | 8-bit binary |
|:-:|:-:|:-:|
| space | 32 | 00100000 |
| 0 | 48 | 00110000 |
| 9 | 57 | 00111001 |
| A | 65 | 01000001 |
| B | 66 | 01000010 |
| Z | 90 | 01011010 |
| a | 97 | 01100001 |
| b | 98 | 01100010 |
| z | 122 | 01111010 |

Each lower-case letter's code is **32 more** than its capital: A is 65 and a is 97. The **digit** characters are not the same as the numbers: the character "7" has code 55, not 7. This is why a number typed as text has to be converted before a program can do arithmetic with it.

:::worked-solution{title="Write the word Gweru in ASCII"}
1. Look up or work out each code: G is 71 (A is 65, and G is six letters later).
2. w is 119, e is 101, r is 114, u is 117 (lower-case letters start at a = 97).
3. Convert each code to 8-bit binary: G = 01000111, w = 01110111, e = 01100101, r = 01110010, u = 01110101.
4. The word is stored as five bytes: 01000111 01110111 01100101 01110010 01110101.
:::

:::worked-solution{title="Decode the ASCII bytes 01001000 01101001 00100001"}
1. Convert each byte to denary: 01001000 = 72, 01101001 = 105, 00100001 = 33.
2. 72 is H (A = 65, so 72 is the eighth letter).
3. 105 is i (a = 97, so 105 is the ninth letter).
4. 33 is the exclamation mark "!".
5. The message is "Hi!".
:::

## Unicode

ASCII was designed for English. It has no room for letters such as é or ŵ, for scripts such as Arabic, Chinese or Amharic, or for emojis. **Unicode** solves this by giving every character in almost every writing system its own unique code, with room for over a million codes.

- Unicode uses **more bits per character** than ASCII: commonly 16 or 32 bits, and some characters need up to 4 bytes.
- Its first 128 codes match ASCII, so English text is compatible.
- Because it is a single worldwide standard, a message written in one language on one device displays correctly on another.

### Comparing ASCII and Unicode

| Feature | ASCII | Unicode |
|:-:|:-:|:-:|
| Bits per character | 7 (8 for extended) | More: up to 32 |
| Number of characters | 128 (256 extended) | Over a million possible codes |
| Languages | English only | Almost all written languages |
| Emojis and many symbols | No | Yes |
| File size for the same text | Smaller | Larger |

:::example{title="Choosing a character set"}
A school in Masvingo is building a website with pages in English, Shona and Ndebele, and pupils want to post comments with emojis. Shona and Ndebele are written in the Latin alphabet, but visitors' names may include accented letters such as é, and emojis are not in ASCII at all. Unicode is the right choice: every character can be represented and will display correctly on every device. The cost is that each character may take more bits, so the files are a little larger.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC (Form 2) asks you to convert keyboard characters to binary using ASCII codes, usually with a table given. Cambridge 0478 asks you to explain how character sets work and why Unicode needs more bits but covers more characters. Both boards may give you part of a code table and expect you to work out the rest.
:::

## Common mistakes

:::mistake{title="Saying ASCII uses 8 bits"}
Standard ASCII is a **7-bit** code (128 characters). Extended ASCII uses 8 bits. In practice each character is stored in a byte, but say 7-bit when defining standard ASCII.
:::

:::mistake{title="Thinking the digit 5 has code 5"}
Digit characters have their own codes: "0" is 48, so "5" is 53. The code 5 is a control character.
:::

:::mistake{title="Saying Unicode is better without a reason"}
Unicode represents far more characters (all languages, emojis), but each character uses more bits, so files are larger. Give both sides when comparing.
:::

:::mistake{title="Forgetting the space"}
A space is a character with its own code (32). When counting characters or bytes, count every space and punctuation mark.
:::

## Exam tips

:::exam-tip{title="Use the given table"}
If a question gives the code for A or a, count on through the alphabet. Write the denary code first, then convert it to binary, so the examiner can see your method.
:::

:::exam-tip{title="Explaining Unicode"}
A strong answer links the cause and effect: "Unicode uses more bits per character, so it can represent many more characters, including other languages and emojis".
:::

:::exam-tip{title="Character set definition"}
Include both parts: "a list of characters the computer can use" and "each character has a unique binary code".
:::

## Summary

:::summary
- Text is stored as a sequence of binary codes, one for each character, taken from a character set.
- A character set lists the characters a computer recognises, each with a unique binary code.
- ASCII uses 7 bits (128 characters); extended ASCII uses 8 bits (256 characters).
- Codes are consecutive: A = 65, a = 97 (32 more), "0" = 48.
- Unicode uses more bits per character, so it covers almost every language and emojis, but files are larger.
:::
