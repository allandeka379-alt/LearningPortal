---
{
  "key": "data.binary-subtraction",
  "title": "Binary subtraction with borrowing",
  "summary": "Subtract one positive binary number from a larger one column by column, using the four subtraction rules and borrowing (including borrowing across zeros), and check the result by converting to denary.",
  "concepts": ["comp.data.binary-subtraction"],
  "estimatedMinutes": 30,
  "level": "core"
}
---
## Introduction

At a grocery shop in Chinhoyi, the stock system subtracts every sale from the number of loaves on the shelf. Behind the screen, the processor does that subtraction in binary. The ZIMSEC syllabus (Form 2) asks you to **subtract binary numbers**, and the method is the same column method you use for denary, with one difference: when you borrow, you borrow a **2**, not a 10.

You should already be able to convert between binary and denary and add binary numbers. In this lesson you will learn the four subtraction rules, how to borrow (even across a run of zeros), and how to check every answer in denary.

## Key definitions

:::definition{term="Minuend and subtrahend"}
In $A - B$, the number you start with, $A$, is the minuend (the top number) and the number taken away, $B$, is the subtrahend (the bottom number). The answer is the difference.
:::

:::definition{term="Borrowing"}
Taking 1 from the next column to the left when the top digit is too small. In binary the borrowed 1 is worth **2** in the column that receives it, because each place value is double the one to its right.
:::

## The four rules of binary subtraction

| Column | Result | Borrow needed? |
|:-:|:-:|:-:|
| 0 − 0 | 0 | No |
| 1 − 0 | 1 | No |
| 1 − 1 | 0 | No |
| 0 − 1 | 1 | Yes: borrow 1 from the left, so the column becomes 10 − 1 = 1 |

The last rule is the only tricky one. Binary 10 means 2, and $2 - 1 = 1$.

## Subtracting with a single borrow

Line the numbers up by place value with the larger number on top. Start in the **right-hand column** and work left.

:::worked-solution{title="Work out 11101 − 01010"}
1. 1s column: $1 - 0 = 1$.
2. 2s column: $0 - 1$ cannot be done, so borrow from the 4s column. The 4s top digit drops from 1 to 0, and the 2s column becomes 10 (two). $2 - 1 = 1$.
3. 4s column: the top digit is now 0. $0 - 0 = 0$.
4. 8s column: $1 - 1 = 0$.
5. 16s column: $1 - 0 = 1$.
6. Answer: 10011.
7. Check in denary: $29 - 10 = 19$, and $10011 = 16 + 2 + 1 = 19$.
:::

| | 16 | 8 | 4 | 2 | 1 |
|:-:|:-:|:-:|:-:|:-:|:-:|
| Top | 1 | 1 | 1 (becomes 0) | 0 (becomes 10) | 1 |
| Bottom | 0 | 1 | 0 | 1 | 0 |
| Difference | 1 | 0 | 0 | 1 | 1 |

## Borrowing across zeros

Sometimes the column next door is 0, so there is nothing to borrow from it. Move left until you reach the **nearest 1**. That 1 becomes 0, every 0 you passed over becomes 1, and the column that needed the borrow becomes 10. This is just like borrowing across zeros in denary (for example $1000 - 1$), where each passed-over 0 becomes a 9.

:::worked-solution{title="Work out 10000 − 00011"}
1. 1s column: $0 - 1$ needs a borrow. The 2s, 4s and 8s columns are all 0, so go to the 16s column, the nearest 1.
2. The 16s digit becomes 0; the 8s, 4s and 2s digits each become 1; the 1s column becomes 10 (two).
3. 1s: $2 - 1 = 1$. 2s: $1 - 1 = 0$. 4s: $1 - 0 = 1$. 8s: $1 - 0 = 1$. 16s: $0 - 0 = 0$.
4. Answer: 01101, which is 1101.
5. Check: $16 - 3 = 13$, and $1101 = 8 + 4 + 1 = 13$.
:::

## An 8-bit example with several borrows

:::worked-solution{title="Work out 10100100 − 00110110"}
1. 1s: $0 - 0 = 0$.
2. 2s: $0 - 1$ needs a borrow. The 4s top digit (1) becomes 0 and the 2s column becomes 10. $2 - 1 = 1$.
3. 4s: now $0 - 1$, so borrow again. The 8s and 16s are 0, so go to the 32s column: 32s becomes 0, 16s and 8s become 1, 4s becomes 10. $2 - 1 = 1$.
4. 8s: $1 - 0 = 1$. 16s: $1 - 1 = 0$.
5. 32s: now $0 - 1$, so borrow. The 64s is 0, so go to the 128s: 128s becomes 0, 64s becomes 1, 32s becomes 10. $2 - 1 = 1$.
6. 64s: $1 - 0 = 1$. 128s: $0 - 0 = 0$.
7. Answer: 01101110.
8. Check: $164 - 54 = 110$, and $01101110 = 64 + 32 + 8 + 4 + 2 = 110$.
:::

| | 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| Top | 1 | 0 | 1 | 0 | 0 | 1 | 0 | 0 |
| Bottom | 0 | 0 | 1 | 1 | 0 | 1 | 1 | 0 |
| Difference | 0 | 1 | 1 | 0 | 1 | 1 | 1 | 0 |

:::example{title="Checking by addition"}
Rudo works out $11001 - 00111$ and gets 10010. To check without converting, she adds her answer to the bottom number: $10010 + 00111 = 11001$, the top number. Subtraction and addition undo each other, so if the sum gives back the top number, the subtraction is right. In denary: $25 - 7 = 18$.
:::

:::keyfact{title="ZIMSEC only"}
Binary subtraction by borrowing is a ZIMSEC objective (Form 2). Cambridge 0478 does not ask for binary subtraction; it covers two's complement representation instead. ZIMSEC questions use positive numbers where the top number is the larger, so the answer is never negative.
:::

## Common mistakes

:::mistake{title="Borrowing a 10 instead of a 2"}
In denary a borrowed 1 is worth ten in the next column; in binary it is worth **two**. So $0 - 1$ after borrowing is $2 - 1 = 1$, not $10 - 1 = 9$.
:::

:::mistake{title="Forgetting to reduce the column you borrowed from"}
When you borrow from a column, its top digit goes down by 1 (a 1 becomes 0). Cross it out and write the new digit above so you do not use the old value.
:::

:::mistake{title="Borrowing across zeros incorrectly"}
The zeros you pass over become **1**, not 2. Only the column that needed the borrow becomes 10.
:::

:::mistake{title="Subtracting the smaller digit from the larger in each column"}
Doing $1 - 0$ when the column is really $0 - 1$ ignores the borrow and gives a wrong answer. Always take the bottom digit from the top digit.
:::

## Exam tips

:::exam-tip{title="Show the borrows"}
Cross out the digit you borrow from and write its new value above it. Examiners can then see your method and award working marks.
:::

:::exam-tip{title="Always check"}
Convert the two numbers and your answer to denary, or add your answer to the bottom number. A subtraction slip is easy to make and easy to catch.
:::

:::exam-tip{title="Keep the same number of bits"}
If the question uses 8-bit numbers, give an 8-bit answer, with leading zeros where needed.
:::

## Summary

:::summary
- Rules: 0 − 0 = 0; 1 − 0 = 1; 1 − 1 = 0; 0 − 1 = 1 with a borrow.
- A borrowed 1 is worth 2 in the column that receives it.
- To borrow across zeros, take 1 from the nearest 1 on the left; the zeros passed over become 1s.
- Work from the right-hand column, reducing each column you borrow from.
- Check by converting to denary or by adding the answer to the bottom number.
:::
