---
{
  "key": "data.file-size",
  "title": "Calculating image and sound file sizes",
  "summary": "Calculate the file size of a bitmap image (resolution × colour depth) and of a sound file (sample rate × sample resolution × length), convert the answer from bits to bytes, KiB or MiB using 1024, and work backwards to find a missing value.",
  "concepts": ["comp.data.file-size"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

Nyasha runs a small photography business in Masvingo and sends previews to customers over mobile data. Before she sends a batch, she wants to know how big the files will be. Her cousin records radio adverts and needs to know how long a recording will fit on a memory card. Both are file size calculations, and both use the ideas from the lesson on sound and images: resolution, colour depth, sample rate and sample resolution.

Cambridge 0478 asks you to calculate image and sound file sizes from given information, without a calculator, and to give the answer in the unit asked for. The numbers in exam questions are chosen so that the arithmetic works out neatly if you use the right method.

## Key definitions

:::definition{term="File size"}
The amount of storage a file needs, measured in bits, bytes or larger units such as KiB and MiB.
:::

:::formula{name="Image file size"}
$$
\text{size (bits)} = \text{width (pixels)} \times \text{height (pixels)} \times \text{colour depth (bits)}
$$
:::

:::formula{name="Sound file size"}
$$
\text{size (bits)} = \text{sample rate (Hz)} \times \text{sample resolution (bits)} \times \text{length (s)}
$$
:::

Both formulas give the size in **bits**. To convert:

- bits → bytes: divide by 8,
- bytes → KiB: divide by 1024,
- KiB → MiB: divide by 1024.

These formulas ignore the small amount of extra data (metadata, such as the width and height of an image) stored in a real file. Exam questions say to ignore it too.

## Image file size

:::worked-solution{title="An image is 1024 × 768 pixels with a colour depth of 8 bits. Find its size in KiB."}
1. Number of pixels: $1024 \times 768$.
2. Bits: $1024 \times 768 \times 8$.
3. Bytes: divide by 8, which cancels the colour depth: $1024 \times 768$ bytes.
4. KiB: divide by 1024, which cancels the width: $768$ KiB.
5. Answer: 768 KiB.
:::

Notice the trick: **do not multiply everything out first**. Cancel the 8 and the 1024 before you multiply, and the numbers stay small. This matters in a paper with no calculator.

:::worked-solution{title="An image is 2048 × 1024 pixels with a colour depth of 24 bits. Find its size in MiB."}
1. Bits: $2048 \times 1024 \times 24$.
2. Bytes: $\dfrac{2048 \times 1024 \times 24}{8} = 2048 \times 1024 \times 3$.
3. KiB: divide by 1024: $2048 \times 3 = 6144$ KiB.
4. MiB: divide by 1024: $6144 \div 1024 = 6$ MiB.
5. Answer: 6 MiB.
:::

## Sound file size

:::worked-solution{title="A sound is sampled 8000 times a second, with a sample resolution of 16 bits, for 64 seconds. Find its size in KiB."}
1. Bits: $8000 \times 16 \times 64$.
2. Bytes: divide by 8, so $16 \div 8 = 2$: $8000 \times 2 \times 64 = 8000 \times 128$ bytes.
3. KiB: divide by 1024. Since $128 \div 1024 = \frac{1}{8}$, this is $8000 \div 8 = 1000$ KiB.
4. Answer: 1000 KiB.
:::

For stereo sound, two channels are recorded, which doubles the size. Cambridge questions at this level use a single channel unless they say otherwise.

## Working backwards

Some questions give the file size and ask for a missing value, such as the length of a recording. Rearrange the formula: change the file size to **bits**, then divide by the values you know.

:::worked-solution{title="A memory chip has 3 MiB free. Sound is recorded at 32 768 Hz with 16-bit samples. For how many seconds can it record?"}
1. Free space in bits: $3 \times 1024 \times 1024 \times 8$.
2. Bits used per second: $32\,768 \times 16$.
3. Time = bits available ÷ bits per second.
4. Simplify: $32\,768 = 32 \times 1024$, so time $= \dfrac{3 \times 1024 \times 1024 \times 8}{32 \times 1024 \times 16} = \dfrac{3 \times 1024 \times 8}{32 \times 16} = \dfrac{24\,576}{512}$.
5. $24\,576 \div 512 = 48$ seconds.
:::

:::example{title="Comparing two cameras"}
Tatenda compares two settings on a camera. Setting 1: 2048 × 1536 pixels, 24-bit colour. Setting 2: 1024 × 768 pixels, 24-bit colour. Setting 1 has twice the width and twice the height, so it has $2 \times 2 = 4$ times as many pixels. With the same colour depth, its files are 4 times as large. Thinking in ratios like this is often quicker than working out both sizes.
:::

### Is the answer sensible?

Before you move on, compare your answer with sizes you know. A phone photo is usually a few MiB, a minute of good-quality sound is a few MiB, and a short text document is a few KiB. If your photo comes out at 6000 MiB or 0.003 KiB, you have probably multiplied instead of divided, or missed the step from bits to bytes. A quick estimate like this catches most slips, and it costs only a few seconds in the exam.

:::keyfact{title="Cambridge only"}
File size calculations are a Cambridge 0478 objective (1.3.2), with units using 1024. ZIMSEC O-Level does not require them, though ZIMSEC learners will find the unit conversions useful.
:::

## Common mistakes

:::mistake{title="Forgetting to divide by 8"}
The formulas give bits. If you divide straight by 1024, your answer is in "kibibits", which is 8 times too big. Always go bits → bytes first.
:::

:::mistake{title="Using 1000 instead of 1024"}
Cambridge uses 1024 between bytes, KiB, MiB and GiB. Using 1000 gives a different answer that will not get the mark.
:::

:::mistake{title="Using the number of colours instead of the colour depth"}
If a question says "256 colours", the colour depth is 8 bits ($2^8 = 256$). Multiply by 8, not by 256.
:::

:::mistake{title="Using minutes instead of seconds"}
Sample rate is samples per **second**. A 2-minute recording is 120 seconds.
:::

## Exam tips

:::exam-tip{title="Write the formula first"}
Start every calculation by writing the formula with the numbers substituted. This often earns a mark even if the arithmetic goes wrong.
:::

:::exam-tip{title="Cancel before you multiply"}
Look for 8 and 1024 (or 1024 hidden inside 2048, 4096 and so on) and cancel them first. The final multiplication or division is then easy.
:::

:::exam-tip{title="Give the unit asked for"}
If the question asks for MiB, a correct answer in bytes may lose the final mark. Read the last line of the question again before you write your answer.
:::

## Summary

:::summary
- Image size in bits = width × height × colour depth.
- Sound size in bits = sample rate × sample resolution × length in seconds.
- Divide by 8 for bytes, then by 1024 for each step up (KiB, MiB, GiB).
- Cancel 8 and 1024 before multiplying to keep the arithmetic easy.
- To find a missing value, convert the size to bits and divide by the known values.
:::
