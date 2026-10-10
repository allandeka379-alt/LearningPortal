---
{
  "key": "communication.channels-attenuation",
  "title": "Communication channels, attenuation and decibels",
  "summary": "Compare wire pairs, coaxial cables, radio waves (surface, sky and space waves), microwave links, geostationary and polar-orbit satellites and optical fibres in terms of bandwidth, noise, cross-talk, security and attenuation; calculate power gains and losses in decibels, attenuation per unit length and signal-to-noise ratios; and outline how the mobile phone network of cells, base stations and switching centres works.",
  "concepts": ["aphys.communication.channels-attenuation"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

A text message from Hwange to Harare might travel by radio to a base station, along an optical fibre or a microwave link to a switching centre, and perhaps up to a satellite and back. Each path is a **channel**, and each weakens the signal and adds noise. Engineers choose channels by how much information they carry, how far they reach, what they cost and how secure they are, and they measure losses in **decibels**. This lesson surveys the channels and the arithmetic of attenuation.

You should already know modulation and wavebands, the advantages of digital signals, total internal reflection in optical fibres, and logarithms to base 10.

## Key definitions

:::definition{term="Attenuation"}
The gradual loss of power of a signal as it travels along a channel.
:::

:::definition{term="Decibel (dB)"}
A logarithmic unit for comparing two powers: the ratio of $P_1$ to $P_2$ expressed in decibels is $10\lg(P_1/P_2)$.
:::

:::definition{term="Signal-to-noise ratio"}
The ratio of the signal power to the noise power at a point in a channel, usually expressed in decibels.
:::

:::definition{term="Cross-talk"}
Interference in which a signal in one channel (for example one wire pair) is picked up by a neighbouring channel.
:::

:::definition{term="Geostationary orbit"}
An equatorial orbit with a period of 24 hours, in which a satellite moves from west to east and so stays above the same point on the Earth's surface.
:::

:::formula{name="Power ratio in decibels"}
$$
\text{number of decibels} = 10\lg\!\left(\frac{P_1}{P_2}\right)
$$

$P_1$, $P_2$ = the two powers (W, any one unit). A loss (attenuation) uses $P_1$ = input power, $P_2$ = output power; a gain uses output over input.
:::

:::formula{name="Attenuation per unit length"}
$$
\text{attenuation per unit length} = \frac{10\lg(P_{\text{in}}/P_{\text{out}})}{L}
$$

$L$ = length of the channel (usually km); unit dB km⁻¹.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Communication channels are ZIMSEC Form 6 only (not in Cambridge 9702 for 2025-2027). Decibels for sound intensity level are a separate idea. Scope to be confirmed against the ZIMSEC syllabus.
:::

## Cables

| Channel | Structure | Bandwidth | Attenuation | Noise and security |
|---|---|---|---|---|
| Wire pair | two insulated copper wires, often twisted | low (kHz to a few MHz) | high, increasing with frequency | picks up interference; cross-talk; easy to tap |
| Coaxial cable | copper core, insulator, braided copper screen, outer sheath | higher (to hundreds of MHz) | lower than a wire pair | screen reduces interference and cross-talk; harder to tap |
| Optical fibre | glass core and cladding of lower refractive index; light by total internal reflection | very high (GHz and above) | very low (a fraction of a dB per km) | no electromagnetic interference or cross-talk; very hard to tap |

Optical fibres also use cheap raw material (sand rather than copper), are light and thin, and need regenerators only every tens of kilometres, so they carry most long-distance traffic.

## Radio waves

How a radio wave travels depends on its frequency:

- **Surface (ground) waves**, below about 3 MHz (LW and MW): diffract around the Earth's curvature, reaching hundreds of kilometres; attenuation rises with frequency.
- **Sky waves**, about 3-30 MHz (short wave): reflected by the ionosphere, an electrically charged layer of the upper atmosphere, and the ground, hopping around the world.
- **Space waves**, above about 30 MHz (VHF, UHF, microwaves): pass straight through the ionosphere, so they travel in straight lines: line of sight on Earth, or up to satellites.

**Microwave links** (a few GHz to tens of GHz) send narrow beams between dish aerials on tall towers within line of sight of each other, typically tens of kilometres apart. They have large bandwidth and need no cable, but the beam is affected by heavy rain.

## Satellites

| | Geostationary satellite | Polar-orbit satellite |
|---|---|---|
| Orbit | above the equator, period 24 h, west to east | low (a few hundred to about 1000 km), passing over the poles |
| Height | about $3.6 \times 10^{7}\ \text{m}$ above the surface | much lower |
| Coverage | always sees the same third of the Earth; three cover almost all but the polar regions | sees a strip at a time; covers the whole Earth over many orbits as the Earth turns |
| Ground aerials | fixed dishes, no tracking | must track the satellite; available only part of the time |
| Uses | television, telephone, data links | weather, mapping, surveillance |
| Delay | noticeable (about 0.24 s up and down) | small |

**Uplink and downlink.** The uplink to a satellite and the downlink back to Earth use **different frequencies** (for example about 6 GHz up and 4 GHz down), so the very weak received signal is not swamped by the satellite's own powerful transmission. Microwaves are used because they pass through the ionosphere and can be focused into narrow beams by dishes.

:::worked-solution[Delay of a geostationary link]
A call goes up to a geostationary satellite at height $3.6 \times 10^{7}\ \text{m}$ and straight back down. Estimate the delay.

1. Distance $= 2 \times 3.6 \times 10^{7} = 7.2 \times 10^{7}\ \text{m}$.
2. Time $= \dfrac{7.2 \times 10^{7}}{3.00 \times 10^{8}} = 0.24\ \text{s}$; a reply takes as long again, which is noticeable in conversation.
:::

## Attenuation and decibels

Power ratios in channels range over many powers of ten, so they are expressed on a logarithmic scale. A loss of 10 dB means the power falls to one tenth; 20 dB to one hundredth; 3 dB to about one half. Because logarithms add, **decibel losses and gains along a channel simply add**: a cable losing 30 dB followed by an amplifier of gain 20 dB gives a net loss of 10 dB.

:::worked-solution[Power after an optical fibre]
An optical fibre has an attenuation of $0.25\ \text{dB km}^{-1}$. A signal of $5.0\ \text{mW}$ enters a $60\ \text{km}$ length. Find the output power.

1. Total loss $= 0.25 \times 60 = 15\ \text{dB}$.
2. $15 = 10\lg\!\left(\dfrac{5.0}{P_{\text{out}}}\right)$, so $\dfrac{5.0}{P_{\text{out}}} = 10^{1.5} = 31.6$.
3. $P_{\text{out}} = \dfrac{5.0}{31.6} = 0.16\ \text{mW}$.
:::

**Noise and repeater spacing.** Every channel has some background noise power. The receiver needs the signal to stay a minimum number of decibels above the noise (a minimum signal-to-noise ratio). This sets the longest distance between amplifiers or regenerators.

:::worked-solution[Maximum cable length]
A signal of $200\ \text{mW}$ enters a cable of attenuation $8.0\ \text{dB km}^{-1}$. The noise power at the receiver is $4.0\ \mu\text{W}$ and the signal-to-noise ratio must be at least $25\ \text{dB}$. Find the maximum length.

1. Minimum signal: $10\lg(P/4.0 \times 10^{-6}) = 25$, so $P = 4.0 \times 10^{-6} \times 10^{2.5} = 1.26 \times 10^{-3}\ \text{W}$.
2. Largest allowed loss $= 10\lg\!\left(\dfrac{0.200}{1.26 \times 10^{-3}}\right) = 22.0\ \text{dB}$.
3. Maximum length $= \dfrac{22.0}{8.0} = 2.7\ \text{km}$.
:::

## The mobile phone network

The country is divided into **cells**, each served by a **base station** with a low-power transmitter on a mast. Neighbouring cells use different groups of frequencies; cells far enough apart reuse the same frequencies, which lets a limited band serve millions of users. Base stations are linked by cable, fibre or microwave to a **mobile switching centre**, a computer that keeps track of which cell each switched-on phone is in (the phone regularly registers with the strongest base station) and connects calls. When a caller moves into a new cell, the switching centre **hands over** the call to the new base station and frequency without interruption. Cells are small in towns, where there are many users, and large in rural areas.

## Common mistakes

:::mistake{title="Using 20 lg for powers"}
For a **power** ratio, decibels are $10\lg(P_1/P_2)$. (The factor 20 applies only to ratios of voltages, which you do not need here.)
:::

:::mistake{title="Saying a geostationary satellite is stationary"}
It moves at about $3\ \text{km s}^{-1}$; it only appears fixed because its period matches the Earth's rotation.
:::

:::mistake{title="Multiplying decibel values"}
Losses and gains in dB **add**; it is the power ratios that multiply.
:::

## Exam tips

:::exam-tip{title="Which papers and how"}
ZIMSEC Paper 1 tests the properties of channels and simple decibel conversions; Papers 2 and 3 ask you to *compare* channels (give a property and a reason), *explain* why uplink and downlink frequencies differ, *calculate* losses, output powers, attenuation per kilometre, signal-to-noise ratios and maximum lengths, and *outline* the cellular network. Show the decibel equation every time, with the powers in the same unit.
:::

## Summary

:::summary
- Wire pairs: cheap, low bandwidth, noisy, cross-talk. Coaxial: screened, more bandwidth. Optical fibre: huge bandwidth, very low attenuation, no interference, secure.
- Radio: surface waves (LW/MW), sky waves via the ionosphere (3-30 MHz), space waves above 30 MHz (line of sight, microwave links, satellites).
- Geostationary satellites: 24 h equatorial orbit, fixed dishes, 0.24 s delay; polar satellites: low, cover the whole Earth, need tracking. Uplink and downlink frequencies differ.
- Decibels: $10\lg(P_1/P_2)$; losses and gains in dB add; attenuation per unit length in dB km⁻¹; a minimum signal-to-noise ratio sets repeater spacing.
- Mobile phones: cells with base stations, frequency reuse, switching centre, handover.
:::
