---
{
  "key": "communication.modulation",
  "title": "Amplitude and frequency modulation",
  "summary": "Explain why information is carried on a high-frequency carrier wave, describe amplitude modulation and frequency modulation from waveforms and data, calculate sideband frequencies and the bandwidth of an AM signal (2f_m) and outline FM frequency deviation, compare AM and FM, and place radio services in the LW, MW, VHF and UHF wavebands.",
  "concepts": ["aphys.communication.modulation"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Turn the dial of a radio in Mutare and you can pick out one station from dozens broadcasting at the same moment, some from Harare, some from across the border. Each station's speech and music are audio signals of a few hertz to a few kilohertz, yet they reach you as radio waves of hundreds of kilohertz or about a hundred megahertz. The audio has been used to **modulate** a high-frequency **carrier wave**. This lesson explains why that is necessary and compares the two classic methods, amplitude modulation (AM) and frequency modulation (FM).

You should already know the properties of waves ($v = f\lambda$, amplitude, frequency), the electromagnetic spectrum and the idea of a signal as a voltage that varies with time.

## Key definitions

:::definition{term="Carrier wave"}
A high-frequency electromagnetic wave of constant amplitude and frequency, one of whose properties is varied to carry the information signal.
:::

:::definition{term="Modulation"}
The process of varying a property (amplitude or frequency) of a carrier wave in step with the information signal.
:::

:::definition{term="Amplitude modulation (AM)"}
Modulation in which the amplitude of the carrier wave varies in synchrony with the displacement (instantaneous value) of the information signal, while the carrier frequency stays constant.
:::

:::definition{term="Frequency modulation (FM)"}
Modulation in which the frequency of the carrier wave varies in synchrony with the displacement of the information signal, while the carrier amplitude stays constant.
:::

:::definition{term="Bandwidth"}
The range of frequencies occupied by a modulated signal (or that a channel can carry), from its lowest to its highest frequency component.
:::

:::formula{name="AM sidebands and bandwidth"}
$$
f_c - f_m,\quad f_c,\quad f_c + f_m \qquad\qquad \text{bandwidth} = 2f_m
$$

$f_c$ = carrier frequency (Hz), $f_m$ = signal (modulating) frequency (Hz); for speech or music, $f_m$ is the highest audio frequency transmitted.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Communication is ZIMSEC Form 6 only; it is not in Cambridge 9702 for 2025-2027. Scope to be confirmed against the ZIMSEC syllabus.
:::

## Why use a carrier wave?

1. **Aerial size.** An aerial works well when its length is comparable to the wavelength (about half a wavelength). A 3 kHz audio wave has $\lambda = c/f = 100\ \text{km}$; a 100 MHz carrier has $\lambda = 3\ \text{m}$, so an aerial under a metre or two long is practical.
2. **Sharing the spectrum.** If every station transmitted its raw audio directly, all would occupy the same frequencies and interfere. Each station is given its own carrier frequency, so a receiver can be **tuned** to one.
3. **Propagation.** Different carrier frequencies travel in useful ways: long and medium waves follow the Earth's surface or reflect from the ionosphere; VHF and UHF travel in straight lines and suit local broadcasting.

## Amplitude modulation

In AM the **envelope** of the carrier (the curve joining its peaks) has the shape of the signal. If the carrier amplitude is 4.0 V and a sinusoidal signal changes it by up to 1.5 V, the envelope over one signal period is:

| Time / quarter-periods of the signal | 0 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|
| Signal displacement (relative) | 0.0 | 1.0 | 0.0 | −1.0 | 0.0 |
| Carrier amplitude / V | 4.0 | 5.5 | 4.0 | 2.5 | 4.0 |

The carrier's oscillations stay at the same spacing (constant frequency); only their height changes, at the signal frequency. The **loudness** of the sound is carried by how much the amplitude varies; the **pitch** is carried by how often it varies.

**Sidebands.** Mathematically, a carrier of frequency $f_c$ amplitude-modulated by a pure tone of frequency $f_m$ is the sum of three steady sine waves: the carrier at $f_c$ and two **side frequencies** at $f_c - f_m$ and $f_c + f_m$. A real audio signal containing all frequencies up to $f_m$ gives a **lower sideband** and an **upper sideband**, so the bandwidth is $2f_m$. A frequency spectrum (a graph of amplitude against frequency) shows a tall line at $f_c$ with the two sidebands either side.

:::worked-solution[AM bandwidth and the medium-wave band]
A medium-wave station uses a carrier of $990\ \text{kHz}$ and audio frequencies up to $4.5\ \text{kHz}$. Find the frequency range of the signal and the number of such stations that fit between 531 kHz and 1602 kHz without overlapping.

1. Lowest frequency $= 990 - 4.5 = 985.5\ \text{kHz}$; highest $= 990 + 4.5 = 994.5\ \text{kHz}$.
2. Bandwidth $= 2 \times 4.5 = 9.0\ \text{kHz}$.
3. Number of channels $= \dfrac{1602 - 531}{9.0} = 119$.
:::

Limiting audio to 4.5 kHz keeps medium-wave channels 9 kHz apart, which is why AM radio sounds less crisp than FM: high-pitched sounds are cut off.

## Frequency modulation

In FM the carrier's oscillations bunch closer together (higher frequency) when the signal is positive and spread out (lower frequency) when it is negative, while their amplitude never changes. Two quantities describe it:

- the **frequency deviation** $\Delta f$: the largest change of the carrier frequency from $f_c$, proportional to the **amplitude** of the signal (loudness);
- the **rate** at which the carrier frequency swings back and forth, equal to the **signal frequency** (pitch).

:::worked-solution[An FM transmitter]
A transmitter has carrier frequency $96.0\ \text{MHz}$ and a sensitivity of $20\ \text{kHz V}^{-1}$. It is modulated by a $2.5\ \text{V}$ peak, $3.0\ \text{kHz}$ sine wave. Describe the transmitted wave.

1. Frequency deviation $= 20 \times 2.5 = 50\ \text{kHz}$.
2. The carrier frequency varies between $96.0 - 0.050 = 95.95\ \text{MHz}$ and $96.0 + 0.050 = 96.05\ \text{MHz}$.
3. It swings between these limits $3000$ times per second; the amplitude stays constant.
4. An estimate of the bandwidth (Carson's rule, in outline) is $2(\Delta f + f_m) = 2(50 + 3.0) = 106\ \text{kHz}$, far more than for AM.
:::

| Signal voltage / V | −2.50 | −1.25 | 0.00 | 1.25 | 2.50 |
|---|---|---|---|---|---|
| Carrier frequency / MHz | 95.950 | 95.975 | 96.000 | 96.025 | 96.050 |

The carrier frequency is a linear function of the signal voltage: a straight line through 96.000 MHz at zero signal with gradient 20 kHz per volt.

## Comparing AM and FM

| Feature | AM | FM |
|---|---|---|
| Bandwidth | small, $2f_m$ (9 kHz for MW broadcasting) | large (about 200 kHz per broadcast station) |
| Stations per waveband | many | fewer, so FM uses the wide VHF band |
| Noise | noise adds to the amplitude and is heard | receiver ignores amplitude changes, so much less noise |
| Sound quality | lower (audio cut at about 4.5 kHz) | higher (audio to about 15 kHz) |
| Range | long: LW and MW follow the ground and reflect from the ionosphere | short: VHF is line of sight (tens of km) |
| Cost and complexity | simple, cheap transmitters and receivers | more complex circuits |

**Wavebands in outline.** LW (long wave) 30-300 kHz; MW (medium wave) 300 kHz-3 MHz, used for AM broadcasting; SW (short wave) 3-30 MHz, international AM broadcasting via the ionosphere; VHF 30-300 MHz, used for FM radio (87.5-108 MHz); UHF 300 MHz-3 GHz, used for television and mobile phones.

## Common mistakes

:::mistake{title="Saying the carrier carries sound waves"}
Radio waves are electromagnetic; the carrier carries an electrical **signal** that represents the sound.
:::

:::mistake{title="Using f_m instead of 2f_m for AM bandwidth"}
There are two sidebands, one either side of the carrier, so the bandwidth is $2f_m$.
:::

:::mistake{title="Saying FM deviation depends on the signal frequency"}
The size of the deviation depends on the signal's **amplitude**; the signal's **frequency** sets how often the carrier frequency changes.
:::

## Exam tips

:::exam-tip{title="Which papers and how"}
ZIMSEC Paper 1 tests definitions and sideband frequencies; Papers 2 and 3 ask you to *describe* AM and FM waveforms in words (what changes and what stays constant), *calculate* sidebands, bandwidths and numbers of channels, *explain* why a carrier is needed and *compare* AM with FM, giving a reason for each point. If asked to sketch a waveform, describe the axes, the envelope shape and what is constant.
:::

## Summary

:::summary
- A high-frequency carrier allows small aerials, lets many stations share the spectrum by tuning, and gives useful propagation.
- AM: carrier amplitude follows the signal; frequency constant. Sidebands at $f_c \pm f_m$, bandwidth $2f_m$.
- FM: carrier frequency follows the signal; amplitude constant. Deviation ∝ signal amplitude; rate of deviation = signal frequency.
- AM: narrow bandwidth, long range, cheap, noisy. FM: wide bandwidth, better quality, less noise, short VHF range.
- Wavebands: LW and MW (AM), VHF (FM radio), UHF (TV, mobile phones).
:::
