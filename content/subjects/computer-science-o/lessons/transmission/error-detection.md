---
{
  "key": "transmission.error-detection",
  "title": "Error detection: parity, checksums, echo checks, check digits and ARQ",
  "summary": "Why errors happen during transmission, and how parity checks (odd, even, parity byte and parity block), checksums, echo checks, check digits and automatic repeat query detect them.",
  "concepts": ["comp.transmission.error-detection"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

A bank in Harare sends a payment instruction to a branch in Masvingo. If a single bit changes on the way, US\$100 could become a very different amount. Electrical interference from motors, lightning or poor cables can flip bits, lose them or add extra ones. Computers therefore **check** data after it has been sent, and ask for it again when something is wrong.

This lesson covers the methods named in the Cambridge syllabus: parity checks, checksums and echo checks for transmission; check digits for data entry; and automatic repeat query (ARQ), which makes sure data arrives without error. Each method appears regularly in Paper 1, often with a short calculation or a parity table to complete.

## Key definitions

:::definition{term="Transmission error"}
A difference between the data sent and the data received, caused for example by interference. Bits may be lost (data loss), extra bits may appear (data gain) or bits may be flipped (data change).
:::

:::definition{term="Parity check"}
A check in which an extra bit (the parity bit) is added to each byte so that the number of 1s is always even (even parity) or always odd (odd parity). The receiver counts the 1s to see whether the rule still holds.
:::

:::definition{term="Checksum"}
A value calculated from a block of data by an agreed method and sent with it. The receiver recalculates the value and compares it with the one received.
:::

:::definition{term="Echo check"}
The receiver sends the data it received back to the sender, which compares it with the original data.
:::

:::definition{term="Check digit"}
An extra digit calculated from the other digits of a number, such as an ISBN or bar code, and added to the end. It is used to detect errors when the number is entered.
:::

:::definition{term="Automatic repeat query (ARQ)"}
A method in which the receiver sends an acknowledgement when data arrives without error; if the sender gets a negative acknowledgement, or no acknowledgement before a timeout, it sends the data again.
:::

## Parity checks

The sender and receiver agree in advance on **even** or **odd** parity. In this course the parity bit is the left-most bit of the byte, and the other seven bits are data.

:::worked-solution[Adding a parity bit to 1011001]
1. Count the 1s in the seven data bits 1011001: there are 4.
2. **Even parity:** the total must be even. 4 is already even, so the parity bit is 0 and the byte sent is 01011001.
3. **Odd parity:** the total must be odd, so the parity bit is 1 and the byte sent is 11011001.
4. The receiver counts the 1s in the whole byte. Under even parity, if it finds an odd number, an error has occurred.
:::

A parity check has a weakness: if **two** bits flip, the count is still even (or odd), so the error is not detected. It also cannot show **which** bit is wrong.

### Parity blocks and the parity byte

To find the wrong bit, data is sent in a block of bytes, each with its own parity bit, followed by a **parity byte**. Each bit of the parity byte is the parity bit for one **column** of the block. A wrong bit then shows up as one row and one column that both fail the check, and the bit where they cross is the error.

:::worked-solution[Finding the error in a parity block (even parity)]
Four bytes and a parity byte arrive. The table counts the 1s in each row.

| Byte | P | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 1s in row | OK? |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| 1 | 0 | 1 | 1 | 0 | 1 | 0 | 0 | 1 | 4 | yes |
| 2 | 0 | 0 | 1 | 1 | 0 | 1 | 1 | 0 | 4 | yes |
| 3 | 0 | 1 | 0 | 0 | 1 | 1 | 1 | 1 | 5 | no |
| 4 | 1 | 0 | 0 | 1 | 1 | 0 | 1 | 0 | 4 | yes |
| Parity byte | 1 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 2 | yes |

1. Row check: byte 3 has five 1s, which is odd, so byte 3 contains the error.
2. Column check: counting down each column, column 4 has three 1s (odd); every other column has an even number.
3. The error is where byte 3 and column 4 cross. That bit arrived as 1, so the correct value is 0, and byte 3 should be 01000111.
4. The receiver can correct the bit itself instead of asking for the whole block again.
:::

## Checksums

The sender calculates a checksum from all the data in a block using an agreed method and sends it after the data. The receiver uses the same method on the data it received. If the two checksums differ, an error has occurred and the data is requested again.

:::worked-solution[A simple checksum]
Suppose the agreed method is: add the denary values of the bytes and keep the remainder after dividing by 256 (so the checksum fits in one byte).

1. A block holds the bytes 120, 45, 200 and 33.
2. Sum: $120 + 45 + 200 + 33 = 398$.
3. Remainder after dividing by 256: $398 - 256 = 142$. The checksum sent is 142.
4. If one byte changes during transmission, the receiver's checksum will not be 142 and the error is detected.
:::

Real systems use more complex methods, but the idea is the same: calculate, send, recalculate, compare.

## Echo checks

The receiver sends a copy of the data straight back to the sender. The sender compares the two. If they differ, the data is sent again. The weakness is that the sender cannot tell whether the error happened on the way **out** or on the way **back**, and the data travels twice, which doubles the traffic.

## Check digits

A check digit catches **data-entry** errors, such as typing one digit wrongly or swapping two neighbouring digits, when a number is keyed in or scanned. It does not check transmission. Examples: ISBNs on books, and bar codes on products in a supermarket.

:::worked-solution[Calculating an ISBN-13 check digit]
The first 12 digits of a book's ISBN are 978186197271. ISBN-13 multiplies the digits alternately by 1 and 3.

| Digit | 9 | 7 | 8 | 1 | 8 | 6 | 1 | 9 | 7 | 2 | 7 | 1 |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| Weight | 1 | 3 | 1 | 3 | 1 | 3 | 1 | 3 | 1 | 3 | 1 | 3 |
| Product | 9 | 21 | 8 | 3 | 8 | 18 | 1 | 27 | 7 | 6 | 7 | 3 |

1. Add the products: 118.
2. Find the remainder after dividing by 10: 8.
3. Subtract from 10: $10 - 8 = 2$. (If the remainder is 0, the check digit is 0.)
4. The check digit is 2, so the full ISBN is 9781861972712. When the number is entered, the computer repeats the calculation and compares the result with the last digit.
:::

## Automatic repeat query (ARQ)

1. The sender transmits a packet (with error-checking data such as a checksum) and starts a **timer**.
2. The receiver checks the packet. If it is correct, the receiver sends a **positive acknowledgement**; if it is wrong, it sends a **negative acknowledgement**.
3. On a negative acknowledgement, the sender resends the packet.
4. If no acknowledgement arrives before the **timeout**, the sender assumes the packet was lost and resends it.
5. This repeats until a positive acknowledgement is received (or a set number of attempts is reached).

:::keyfact{title="ZIMSEC and Cambridge"}
These error-detection methods are in the Cambridge 0478 syllabus (topic 2.2). The ZIMSEC syllabus does not list them; ZIMSEC learners meet the related ideas of validating and verifying data under security and ethics.
:::

## Common mistakes

:::mistake{title="Saying a check digit checks transmitted data"}
Check digits detect errors in **data entry** (typing or scanning). Parity, checksums and echo checks check **transmission**.
:::

:::mistake{title="Thinking parity always detects an error"}
If an even number of bits flip, the parity is unchanged and the error goes undetected. A parity block helps, but some patterns still escape.
:::

:::mistake{title="Describing ARQ without the timeout"}
A full ARQ answer includes acknowledgements **and** the timeout that triggers a resend when no acknowledgement arrives.
:::

## Exam tips

:::exam-tip
In parity-block questions, check every row and every column, then give the byte number and bit position of the error and its correct value.
:::

:::exam-tip
For "**describe** how a checksum is used", give the sequence: calculated by the sender, sent with the data, recalculated by the receiver, compared, data re-requested if different.
:::

:::exam-tip
Show the multiplications and sum for any check-digit calculation; method marks are available even if you slip in the arithmetic.
:::

## Summary

:::summary
- Interference can cause data loss, data gain or data change during transmission.
- Parity adds a bit so the count of 1s is even or odd; a parity block with a parity byte locates and corrects a single wrong bit.
- A checksum is calculated by the sender, recalculated by the receiver and compared.
- An echo check sends the data back to the sender for comparison.
- Check digits (ISBNs, bar codes) catch data-entry errors; ARQ uses acknowledgements and timeouts to resend data until it arrives correctly.
:::
