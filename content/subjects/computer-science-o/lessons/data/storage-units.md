---
{
  "key": "data.storage-units",
  "title": "Units of data storage",
  "summary": "The units used to measure data, from the bit, nibble and byte up to the exbibyte, with 1024 between each unit; the kibibyte (KiB), mebibyte (MiB), gibibyte (GiB) and tebibyte (TiB) names used by Cambridge and the kilobyte, megabyte, gigabyte and terabyte names used by ZIMSEC; and converting between units.",
  "concepts": ["comp.data.storage-units"],
  "estimatedMinutes": 25,
  "level": "core"
}
---
## Introduction

Sipho's phone warns him that its storage is almost full. A music app says an album is 120 MiB, his school notes take a few hundred KiB, and the memory card in his camera holds 64 GiB. To decide what to delete, or whether a file will fit on a flash drive, he needs to understand **units of data storage** and convert between them.

Both ZIMSEC and Cambridge examine storage units, but they use different names for the larger units. This lesson explains both, and why exams use **1024** between units rather than 1000.

## Key definitions

:::definition{term="Bit"}
A single binary digit, 0 or 1: the smallest unit of data.
:::

:::definition{term="Nibble"}
A group of 4 bits (half a byte). One nibble can be written as one hexadecimal digit.
:::

:::definition{term="Byte"}
A group of 8 bits. A byte is often enough to store one character of text.
:::

:::definition{term="Kibibyte (KiB)"}
1024 bytes. The next units each multiply by 1024: mebibyte (MiB), gibibyte (GiB), tebibyte (TiB), pebibyte (PiB), exbibyte (EiB).
:::

## The units, smallest to largest

| Unit | Symbol | Equal to |
|:-:|:-:|:-:|
| bit | b | a single 0 or 1 |
| nibble | | 4 bits |
| byte | B | 8 bits |
| kibibyte | KiB | 1024 bytes |
| mebibyte | MiB | 1024 KiB |
| gibibyte | GiB | 1024 MiB |
| tebibyte | TiB | 1024 GiB |
| pebibyte | PiB | 1024 TiB |
| exbibyte | EiB | 1024 PiB |

Why 1024? Computers count in binary, and $2^{10} = 1024$ is the power of 2 closest to 1000. So 1 KiB is $2^{10}$ bytes, 1 MiB is $2^{20}$ bytes, 1 GiB is $2^{30}$ bytes, and so on.

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge 0478 uses the IEC names with "bi" in them: KiB, MiB, GiB, TiB, PiB and EiB, always with 1024 between units. The ZIMSEC syllabus names the units from the bit and nibble up to the terabyte using the traditional names: kilobyte (KB), megabyte (MB), gigabyte (GB) and terabyte (TB). In ZIMSEC questions, use **1024** between these units as well unless the question says otherwise.
:::

Outside exams you will see both systems. Some storage manufacturers use 1000 between units (1 kB = 1000 bytes), which is why a drive sold as "500 GB" shows a little less space on a computer. In your exam, follow the factor the board uses: 1024.

## Converting between units

- To change to a **smaller** unit (for example GiB → MiB), **multiply** by 1024 for each step down.
- To change to a **larger** unit (for example bytes → KiB), **divide** by 1024 for each step up.
- Between bits and bytes, the factor is **8**, not 1024.

A useful picture is a staircase: each step between bytes, KiB, MiB, GiB and TiB is 1024; the step between bits and bytes is 8.

:::worked-solution{title="Convert 3 GiB to MiB"}
1. GiB → MiB is one step down, so multiply by 1024.
2. $3 \times 1024 = 3072$.
3. 3 GiB = 3072 MiB.
:::

:::worked-solution{title="Convert 6 291 456 bytes to MiB"}
1. Bytes → KiB: $6\,291\,456 \div 1024 = 6144$ KiB.
2. KiB → MiB: $6144 \div 1024 = 6$ MiB.
3. So 6 291 456 bytes = 6 MiB (two steps up, so divide by 1024 twice).
:::

:::worked-solution{title="How many bytes and nibbles are in 40 bits?"}
1. Bytes: $40 \div 8 = 5$ bytes.
2. Nibbles: $40 \div 4 = 10$ nibbles.
:::

:::example{title="Will the photos fit?"}
Rudo's camera card holds 64 GiB, and each of her photos is about 4 MiB. To compare, put both in the same unit: $64 \times 1024 = 65\,536$ MiB. Then $65\,536 \div 4 = 16\,384$ photos. Converting to the same unit first is the key step in every "how many will fit" question.
:::

### Working without a calculator

Cambridge papers do not allow calculators, so the numbers are chosen to divide neatly. Learn these:

- $1024 \times 2 = 2048$, $1024 \times 4 = 4096$, $1024 \times 8 = 8192$.
- $1024 \times 1024 = 1\,048\,576$ (bytes in a MiB).
- Dividing by 1024 twice is the same as dividing by $1\,048\,576$.

## Ordering storage sizes

To compare sizes given in different units, convert them all to the same unit. For example, which is larger: 2 GiB, 1500 MiB or 3 000 000 KiB? In MiB: 2 GiB = 2048 MiB, 1500 MiB, and $3\,000\,000 \div 1024 \approx 2930$ MiB. So 3 000 000 KiB is the largest.

## Common mistakes

:::mistake{title="Using 1000 instead of 1024"}
In both exams the factor between units from KiB (or KB) upwards is 1024. Using 1000 gives answers that do not match the mark scheme.
:::

:::mistake{title="Using 1024 between bits and bytes"}
There are **8** bits in a byte. 1024 only appears between bytes and KiB and between the larger units.
:::

:::mistake{title="Multiplying when you should divide"}
Going to a **larger** unit makes the number **smaller**, so divide. A quick sense check: 5000 bytes must be a small number of KiB, not millions.
:::

:::mistake{title="Mixing up the order of the large units"}
Learn the order: kibi, mebi, gibi, tebi, pebi, exbi (K, M, G, T, P, E). A useful sentence: "Kind Men Give Their People Everything".
:::

## Exam tips

:::exam-tip{title="Show each step"}
Write each conversion step on its own line, with the unit: "6 291 456 B ÷ 1024 = 6144 KiB; 6144 KiB ÷ 1024 = 6 MiB". Method marks are given for correct steps.
:::

:::exam-tip{title="Use the board's unit names"}
In Cambridge answers write KiB, MiB, GiB. In ZIMSEC answers KB, MB, GB are expected. Always include the unit in your final answer.
:::

:::exam-tip{title="Order questions"}
When asked to put units in order, list the full set: bit, nibble, byte, KiB, MiB, GiB, TiB, PiB, EiB.
:::

## Summary

:::summary
- 1 nibble = 4 bits; 1 byte = 8 bits.
- From bytes upwards each unit is 1024 times the one before: KiB, MiB, GiB, TiB, PiB, EiB ($2^{10}$ steps).
- Cambridge uses KiB, MiB, GiB, …; ZIMSEC uses KB, MB, GB, TB, also with 1024.
- To a smaller unit: multiply by 1024 per step; to a larger unit: divide by 1024 per step.
- Convert to the same unit before comparing sizes or working out how many files fit.
:::
