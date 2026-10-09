---
{
  "key": "prog.string-handling",
  "title": "String handling: LENGTH, SUBSTRING, UCASE and LCASE",
  "summary": "Working with text in programs: character positions, finding the length of a string, extracting part of a string with SUBSTRING, converting case with UCASE and LCASE, and using these operations inside loops to count characters and check formats.",
  "concepts": ["comp.prog.string-handling"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

When a new learner joins a school's computer network, the system creates a username from their name: perhaps the first three letters of the surname followed by a number. When a learner registers for an online exam, the system checks that their candidate number has the right number of characters and starts with the right letters. When someone types "yes", "YES" or "Yes" in answer to a question, a well-written program accepts all three.

All of these jobs use **string handling**: operations that measure, cut up and change text. Cambridge 0478 names four of them, `LENGTH`, `SUBSTRING`, `UCASE` and `LCASE`, and Paper 2 questions regularly ask you to evaluate them, trace loops that use them and write code with them, including inside the 15-mark scenario question.

## Key definitions

:::definition{term="String"}
A sequence of zero or more characters, such as letters, digits, spaces and symbols, treated as one value; in pseudocode it is written in double quotes.
:::

:::definition{term="Substring"}
A part of a string made of consecutive characters, for example `"Falls"` is a substring of `"Victoria Falls"`.
:::

:::definition{term="Character position"}
The number of a character's place in a string; in 0478 pseudocode the first character is at position 1.
:::

## Positions in a string

Every character, including each space, has a position. For `Place ← "Victoria Falls"`:

| Position | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| Character | V | i | c | t | o | r | i | a | (space) | F | a | l | l | s |

Drawing a table like this is the most reliable way to answer string questions. Count the space: it is a character like any other.

## The four string operations

- `LENGTH(Text)` returns the number of characters in `Text` as an INTEGER.
- `SUBSTRING(Text, Start, Count)` returns `Count` characters of `Text`, beginning at position `Start`.
- `UCASE(Text)` returns `Text` with every letter in upper case; `LCASE(Text)` returns it in lower case. Digits, spaces and symbols are unchanged. Both also work on a single CHAR.

None of these operations changes the original variable. They **return** a new value, which you must output or assign, for example `Name ← UCASE(Name)`.

:::worked-solution[Evaluating string expressions]
`Place` holds `"Victoria Falls"`.

| Expression | Result |
|:-:|:-:|
| `LENGTH(Place)` | 14 |
| `SUBSTRING(Place, 1, 8)` | "Victoria" |
| `SUBSTRING(Place, 10, 5)` | "Falls" |
| `UCASE(Place)` | "VICTORIA FALLS" |
| `LCASE(SUBSTRING(Place, 10, 1))` | "f" |
| `SUBSTRING(Place, LENGTH(Place) - 2, 3)` | "lls" |

1. `LENGTH` counts all 14 characters, including the space at position 9.
2. `SUBSTRING(Place, 10, 5)` starts at position 10 (`F`) and takes 5 characters: `F`, `a`, `l`, `l`, `s`.
3. Nested calls are worked from the inside out: `SUBSTRING(Place, 10, 1)` is `"F"`, then `LCASE` gives `"f"`.
4. `LENGTH(Place) - 2` is 12, so the last expression takes the final 3 characters. This pattern, `SUBSTRING(Text, LENGTH(Text) - n + 1, n)`, gives the last `n` characters of any string.
:::

## Comparing strings

Two strings are equal only if they have exactly the same characters in the same positions, so `"Gweru" = "gweru"` is FALSE: upper- and lower-case letters are different characters. That is why programs convert user input with `UCASE` or `LCASE` before comparing it with a stored answer. A trailing space also makes two strings different, and the empty string `""` has a length of 0, which is a quick way to check that the user typed something: `IF LENGTH(Surname) = 0 THEN OUTPUT "Surname is required"`.

## Strings in loops

To look at every character of a string, use a FOR loop from 1 to `LENGTH(Text)` and take one character at a time with `SUBSTRING(Text, Position, 1)`. Because the end value is `LENGTH(Text)`, the same code works for strings of any length.

:::worked-solution[Counting a letter]
The algorithm counts the letter a (in either case) in `"Kariba Dam"`.

```
Text ← "Kariba Dam"
Count ← 0
FOR Position ← 1 TO LENGTH(Text)
    Letter ← SUBSTRING(Text, Position, 1)
    IF LCASE(Letter) = "a"
        THEN
            Count ← Count + 1
    ENDIF
NEXT Position
OUTPUT Count
```

| Position | Letter | Count | OUTPUT |
|:-:|:-:|:-:|:-:|
|  |  | 0 |  |
| 1 | K |  |  |
| 2 | a | 1 |  |
| 3 | r |  |  |
| 4 | i |  |  |
| 5 | b |  |  |
| 6 | a | 2 |  |
| 7 | (space) |  |  |
| 8 | D |  |  |
| 9 | a | 3 |  |
| 10 | m |  |  |
|  |  |  | 3 |

1. The loop runs 10 times because `LENGTH("Kariba Dam")` is 10.
2. `LCASE` makes the test work for both `"a"` and `"A"`, so one comparison is enough.
3. The same pattern counts spaces (to count words), digits or vowels.
:::

## Checking formats

String operations let a program check that an input follows a pattern. A single character can be compared with `>=` and `<=`: a character is a digit if it is from `"0"` to `"9"`, and an upper-case letter if it is from `"A"` to `"Z"`.

:::example{title="Validating a library card number"}
A library in Harare issues card numbers made of the letters `LB` followed by exactly four digits, such as `LB2071`.

```
Valid ← TRUE
IF LENGTH(CardNumber) <> 6
    THEN
        Valid ← FALSE
    ELSE
        IF UCASE(SUBSTRING(CardNumber, 1, 2)) <> "LB"
            THEN
                Valid ← FALSE
        ENDIF
        FOR Position ← 3 TO 6
            Digit ← SUBSTRING(CardNumber, Position, 1)
            IF Digit < "0" OR Digit > "9"
                THEN
                    Valid ← FALSE
            ENDIF
        NEXT Position
ENDIF
```

The length is checked first, so `SUBSTRING` never asks for positions that do not exist. `UCASE` accepts `lb2071` as well. The loop checks each of positions 3 to 6 and sets `Valid` to FALSE if any character is not a digit.
:::

## Common mistakes

:::mistake{title="Treating the third parameter as an end position"}
`SUBSTRING(Text, 3, 4)` means four characters starting at position 3 (positions 3, 4, 5 and 6), not "from position 3 to position 4".
:::

:::mistake{title="Forgetting spaces and punctuation"}
`LENGTH("Mr T. Moyo")` is 10: the spaces and the full stop are characters. Write out the positions before you count.
:::

:::mistake{title="Expecting UCASE to change the variable"}
`UCASE(Answer)` on its own line does nothing useful. Assign the result: `Answer ← UCASE(Answer)`.
:::

:::mistake{title="Starting at position 0"}
In 0478 pseudocode the first character is at position 1. Some programming languages, including Python, number characters from 0, so check which convention a question uses.
:::

## Exam tips

:::exam-tip
When a question gives a string, write its characters with their positions above them before you evaluate any `SUBSTRING`. It takes seconds and prevents most errors.
:::

:::exam-tip
In a scenario answer, use `LENGTH` as the end value of a loop over a string and `UCASE` or `LCASE` before comparing user input. Examiners reward code that works for any length and any case.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
String handling is a named Cambridge 0478 topic (8.1.4e). The ZIMSEC syllabus does not list it as a separate objective, although ZIMSEC learners meet similar functions when they program in Visual Basic (`Len`, `Mid`, `UCase`) or Python (`len`, slicing, `upper`).
:::

## Summary

:::summary
- A string is a sequence of characters; in 0478 pseudocode positions start at 1, and spaces count.
- `LENGTH(Text)` gives the number of characters; `SUBSTRING(Text, Start, Count)` gives `Count` characters from `Start`.
- `UCASE` and `LCASE` return upper- or lower-case copies; assign the result to keep it.
- Loop `FOR Position ← 1 TO LENGTH(Text)` with `SUBSTRING(Text, Position, 1)` to examine every character.
- Combine these operations to count characters, extract parts and check that inputs follow a format.
:::
