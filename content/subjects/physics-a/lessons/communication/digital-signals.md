---
{
  "key": "communication.digital-signals",
  "title": "Analogue and digital signals: sampling and conversion",
  "summary": "Distinguish analogue and digital signals and explain the advantages of digital transmission (regeneration, noise rejection, extra data), describe analogue-to-digital conversion by sampling and quantising with binary numbers, use the rule that the sampling rate must be at least twice the highest frequency, explain how sampling rate and number of bits affect the reproduced signal, calculate bit rates, and outline digital-to-analogue and parallel-to-serial conversion.",
  "concepts": ["aphys.communication.digital-signals"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

When Chipo in Gweru phones her grandmother in Chiredzi, her voice leaves the handset as a stream of 1s and 0s. Somewhere along the route the signal crosses kilometres of cable, fibre and radio link, picking up noise at every stage, yet the call arrives clear. The trick is to convert the continuously varying voice into **digital** form, send numbers instead of a wave shape, and convert back at the far end. This lesson explains how that conversion works and why it is worth the effort.

You should already know the difference between analogue and digital signals in outline, binary numbers, and the idea of noise and attenuation in a communication channel.

## Key definitions

:::definition{term="Analogue signal"}
A signal that varies continuously and can take any value within a range, in the same way as the quantity it represents.
:::

:::definition{term="Digital signal"}
A signal that takes only a set of discrete values; in binary transmission, two levels representing 1 and 0.
:::

:::definition{term="Sampling"}
Measuring the value of an analogue signal at regular intervals of time; the sampling rate (frequency) is the number of samples taken per second.
:::

:::definition{term="Quantisation"}
Rounding each sampled value to the nearest of a fixed set of levels so that it can be represented by a binary number of a set number of bits.
:::

:::definition{term="Bit rate"}
The number of binary digits transmitted per second.
:::

:::formula{name="Sampling, levels and bit rate"}
$$
f_{\text{s}} \geq 2f_{\max} \qquad N = 2^{n} \qquad \text{bit rate} = f_{\text{s}} \times n
$$

$f_{\text{s}}$ = sampling rate (Hz), $f_{\max}$ = highest frequency in the analogue signal (Hz), $n$ = number of bits per sample, $N$ = number of quantisation levels; bit rate in bits per second (bit s⁻¹), for one channel.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Digital communication is ZIMSEC Form 6 only (not in Cambridge 9702 for 2025-2027). Scope to be confirmed against the ZIMSEC syllabus.
:::

## Why go digital?

Every signal sent along a channel is **attenuated** (it loses power) and picks up **noise** (random unwanted signals). Amplifiers along the route must restore the power, but an analogue amplifier cannot tell signal from noise: it amplifies both, and the noise from every stage accumulates.

A digital signal has only two levels. A **regenerator** (repeater) along the route only has to decide, for each bit, "was this high or low?", and send out a fresh, clean pulse. Unless the noise is so large that a 0 is mistaken for a 1, the noise is **removed completely** at every regenerator.

Further advantages:

- **Extra data** can be added for error detection and correction (check bits), so the receiver can find and fix the occasional wrong bit.
- Signals from many sources (speech, text, video) can be **combined** (multiplexed) on one channel and handled by the same computer circuits.
- Digital data are easily **encrypted** for security, stored and processed.

The cost is that more bandwidth is needed to send the same information, and conversion circuits are needed at both ends.

## Analogue-to-digital conversion

An **analogue-to-digital converter (ADC)** does three things:

1. **Samples** the analogue voltage at regular intervals.
2. **Quantises** each sample to the nearest of $2^{n}$ levels.
3. **Codes** each level as an $n$-bit binary number.

:::worked-solution[A 4-bit ADC]
A 4-bit ADC has levels 0.5 V apart (level 0 = 0 V, level 15 = 7.5 V) and takes a sample every 0.125 ms. Five samples are 2.1, 4.8, 6.3, 5.0 and 2.6 V. Find the binary codes and the voltages a DAC would output.

1. Number of levels $= 2^{4} = 16$ (0 to 15).
2. Level = sample ÷ 0.5, rounded: 2.1 → 4.2 → 4; 4.8 → 9.6 → 10; 6.3 → 12.6 → 13; 5.0 → 10; 2.6 → 5.2 → 5.
3. Codes: 0100, 1010, 1101, 1010, 0101.
4. DAC outputs (level × 0.5 V): 2.0, 5.0, 6.5, 5.0, 2.5 V. Each differs from the original by up to 0.25 V, half a step: this is the **quantisation error**.
:::

| $t\,/\,\text{ms}$ | 0 | 0.125 | 0.250 | 0.375 | 0.500 |
|---|---|---|---|---|---|
| Sample / V | 2.1 | 4.8 | 6.3 | 5.0 | 2.6 |
| Level | 4 | 10 | 13 | 10 | 5 |
| Code | 0100 | 1010 | 1101 | 1010 | 0101 |
| DAC output / V | 2.0 | 5.0 | 6.5 | 5.0 | 2.5 |

**Binary numbers.** Each bit is worth twice the one to its right: in 1101, the bits are worth 8, 4, 2 and 1, so 1101 = 8 + 4 + 0 + 1 = 13. The left-hand bit is the **most significant bit** (MSB); the right-hand one is the **least significant bit** (LSB).

## Digital-to-analogue conversion

A **digital-to-analogue converter (DAC)** turns each number back into a voltage proportional to it and holds that voltage until the next sample arrives. The output is a **staircase** that follows the shape of the original wave. A low-pass filter then smooths the steps.

## How good is the reproduction?

**Sampling rate.** If samples are taken too rarely, rapid changes between samples are lost, and a high frequency can even be reproduced as a false lower frequency (aliasing). The rule is that the sampling rate must be **at least twice the highest frequency** in the signal. Telephone speech is filtered to below about 3.4 kHz and sampled at 8 kHz, comfortably above $2 \times 3.4 = 6.8\ \text{kHz}$.

**Number of bits.** More bits give more levels, smaller steps, and so a smaller quantisation error: the staircase follows the original more closely. Each extra bit doubles the number of levels.

| Bits per sample $n$ | 1 | 2 | 4 | 8 | 16 |
|---|---|---|---|---|---|
| Levels $2^{n}$ | 2 | 4 | 16 | 256 | 65 536 |

Both improvements have a price: a higher **bit rate**, which needs a channel of greater bandwidth or more storage.

:::worked-solution[Bit rates]
Find the bit rate for (a) a telephone channel sampled at 8000 Hz with 8 bits per sample, (b) CD-quality stereo music sampled at 44.1 kHz with 16 bits per sample per channel.

1. (a) $8000 \times 8 = 64\,000\ \text{bit s}^{-1}$ (64 kbit s⁻¹), with $2^{8} = 256$ levels.
2. (b) Two channels: $44\,100 \times 16 \times 2 = 1\,411\,200\ \text{bit s}^{-1}$, about 1.4 Mbit s⁻¹, more than 20 times the telephone rate.
:::

## Parallel-to-serial conversion

An ADC produces all the bits of a sample at once on separate wires (**parallel**). A single cable, fibre or radio link carries one bit at a time (**serial**). A **parallel-to-serial converter** sends the bits of each sample one after another, in a fixed order, at the bit rate; at the receiver a **serial-to-parallel converter** collects them back into groups of $n$ for the DAC. The receiver must know where each group starts, so extra synchronisation bits are added.

**The whole system in outline:** microphone → ADC (sample, quantise, code) → parallel-to-serial converter → transmission channel with regenerators → serial-to-parallel converter → DAC → filter → amplifier → loudspeaker.

## Common mistakes

:::mistake{title="Saying digital signals are not affected by noise"}
They pick up noise like any signal; the advantage is that regenerators can **remove** it, because only two levels need to be recognised.
:::

:::mistake{title="Using f_max as the sampling rate"}
The sampling rate must be at least **twice** the highest frequency.
:::

:::mistake{title="Confusing levels with bits"}
4 bits give $2^{4} = 16$ levels, not 4 or 8. The highest level number is $2^{n} - 1$ (1111 = 15).
:::

## Exam tips

:::exam-tip{title="Which papers and how"}
ZIMSEC Paper 1 tests binary conversion, the sampling rule and number of levels; Papers 2 and 3 ask you to *explain* the advantages of digital transmission (always link regeneration to removing noise), *complete* a sampling table or describe a reconstructed staircase in words, *calculate* bit rates, and *suggest* the effect of changing the sampling rate or bit depth.
:::

## Summary

:::summary
- Analogue signals vary continuously; digital signals have discrete levels (binary 1 and 0).
- Digital advantages: regenerators remove noise; extra bits allow error correction; easy processing, storage, multiplexing and encryption.
- ADC: sample, quantise to $2^{n}$ levels, code as $n$-bit binary; DAC: staircase output, then smoothed.
- Sampling rate $\geq 2f_{\max}$; more bits mean smaller steps; bit rate $= f_{\text{s}} \times n$.
- Parallel-to-serial conversion sends the bits of each sample one at a time along a single channel.
:::
