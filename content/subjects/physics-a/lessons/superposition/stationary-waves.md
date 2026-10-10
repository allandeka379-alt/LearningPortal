---
{
  "key": "superposition.stationary-waves",
  "title": "Superposition and stationary waves",
  "summary": "Apply the principle of superposition, explain how two waves travelling in opposite directions form a stationary wave with nodes and antinodes, find wavelengths from node spacing, and calculate harmonic frequencies for strings, closed and open pipes and microwaves.",
  "concepts": ["aphys.superposition.stationary-waves"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Pluck the string of a guitar or a violin and it vibrates in a steady pattern: some points hardly move while others swing widely. Blow across the top of a bottle and the air column inside sings one clear note. Neither the string nor the air column carries energy away along its length; the pattern stays where it is. These are **stationary (standing) waves**, and they explain the notes of every musical instrument and a neat way of measuring the wavelength of microwaves and sound.

You should know $v = f\lambda$, phase difference and the difference between transverse and longitudinal waves.

## Key definitions

:::definition{term="Principle of superposition"}
When two or more waves meet at a point, the resultant displacement at that point is the sum of the displacements of the individual waves.
:::

:::definition{term="Stationary wave"}
A wave pattern formed by the superposition of two progressive waves of the same frequency (and similar amplitude) travelling in opposite directions; the pattern does not move and there is no net transfer of energy along it.
:::

:::definition{term="Node and antinode"}
A node is a point on a stationary wave where the amplitude is zero. An antinode is a point where the amplitude is a maximum.
:::

:::definition{term="Fundamental and harmonics"}
The fundamental is the stationary wave of lowest frequency that a system can sustain. Harmonics are stationary waves whose frequencies are whole-number multiples of the fundamental frequency.
:::

:::keyfact{title="Spacing to learn"}
Adjacent nodes are $\lambda/2$ apart; adjacent antinodes are $\lambda/2$ apart; a node and the next antinode are $\lambda/4$ apart.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards require superposition, the formation of stationary waves, nodes and antinodes and finding $\lambda$ from their spacing (ZIMSEC Form 5; Cambridge AS 8.1). Experiments with a string, an air column and microwaves are named by both. End corrections are not required.
:::

## How a stationary wave forms

Send a wave along a string fixed at one end: it reflects at the fixed end and travels back. Two waves of the same frequency, speed and amplitude now cross in opposite directions. Add their displacements point by point (the graphical method):

- At some points the two waves are always exactly in antiphase, so the displacements cancel at every instant: **nodes**.
- Midway between, the two waves are always in phase, so the displacements add to give twice the amplitude of each: **antinodes**.

Draw both waves at an instant, then a quarter of a period later (each having moved $\lambda/4$ in opposite directions): the resultant goes from a sine curve of double amplitude to a flat line and back, but the nodes never move.

## Comparing stationary and progressive waves

| Feature | Progressive wave | Stationary wave |
| --- | --- | --- |
| Energy | Transferred along the wave | No net transfer; stored in the pattern |
| Amplitude | Same for all points (no losses) | Varies from zero (node) to maximum (antinode) |
| Phase | Changes continuously along the wave over one wavelength | All points between two adjacent nodes in phase; points either side of a node in antiphase |
| Wavelength | Distance between adjacent in-phase points | Twice the distance between adjacent nodes |

## Strings and air columns

**A string fixed at both ends** must have a node at each end. The fundamental is one loop: $L = \lambda/2$. The $n$th harmonic has $n$ loops: $L = n\lambda/2$, so $f_n = \dfrac{nv}{2L}$ with $n = 1, 2, 3, \ldots$

**A pipe closed at one end** has a node at the closed end (air cannot move) and an antinode at the open end. The fundamental is a quarter wavelength: $L = \lambda/4$, so $f_1 = \dfrac{v}{4L}$. Only odd harmonics occur: $3f_1$, $5f_1$, ...

**A pipe open at both ends** has antinodes at both ends: $L = \lambda/2$ for the fundamental, $f_1 = \dfrac{v}{2L}$, and all harmonics occur.

| System | Ends | Fundamental | Frequencies present |
| --- | --- | --- | --- |
| String fixed at both ends | node, node | $L = \lambda/2$ | $f_1, 2f_1, 3f_1, \ldots$ |
| Pipe closed at one end | node, antinode | $L = \lambda/4$ | $f_1, 3f_1, 5f_1, \ldots$ |
| Pipe open at both ends | antinode, antinode | $L = \lambda/2$ | $f_1, 2f_1, 3f_1, \ldots$ |

For sound in a pipe, "node" and "antinode" describe the displacement of the air; the wave in the air is longitudinal, but the pattern is described exactly as for a string.

:::worked-solution[Harmonics of a string]
A string of length $0.80\ \text{m}$ is fixed at both ends; waves travel along it at $120\ \text{m s}^{-1}$. Find the fundamental frequency and the frequency of the third harmonic.

1. Fundamental: one loop, $\lambda = 2L = 1.6\ \text{m}$.
2. $f_1 = \dfrac{v}{\lambda} = \dfrac{120}{1.6} = 75\ \text{Hz}$.
3. Third harmonic: three loops, $f_3 = 3f_1 = 225\ \text{Hz}$, with two nodes between the ends.
:::

:::worked-solution[A closed and an open pipe]
A pipe is $0.33\ \text{m}$ long; sound travels at $340\ \text{m s}^{-1}$. Ignore end corrections.

1. Closed at one end: $f_1 = \dfrac{v}{4L} = \dfrac{340}{4 \times 0.33} = 258\ \text{Hz}$.
2. The next resonance of the closed pipe is the third harmonic: $3 \times 258 = 773\ \text{Hz}$.
3. Open at both ends: $f_1 = \dfrac{v}{2L} = \dfrac{340}{0.66} = 515\ \text{Hz}$, twice the closed-pipe fundamental.
:::

## Measuring wavelength with microwaves

A microwave transmitter faces a metal plate; the wave reflected from the plate superposes on the incoming wave and forms a stationary wave. Move a small probe receiver along the line between them: the reading falls to minima at nodes and rises to maxima at antinodes.

:::worked-solution[Microwave node spacing]
The probe is moved from one node to the sixth node along, a distance of $7.0\ \text{cm}$.

1. From node 1 to node 6 there are 5 node spacings: spacing $= \dfrac{7.0}{5} = 1.4\ \text{cm}$.
2. $\lambda = 2 \times 1.4 = 2.8\ \text{cm} = 0.028\ \text{m}$.
3. $f = \dfrac{c}{\lambda} = \dfrac{3.00 \times 10^{8}}{0.028} = 1.07 \times 10^{10}\ \text{Hz}$.
4. Measuring over several nodes reduces the percentage uncertainty in the spacing.
:::

The same method works for sound: a loudspeaker facing a wall and a microphone moved along the line, or a resonance tube in which the water level is lowered until the air column resonates with a tuning fork.

## Common mistakes

:::mistake{title="Node spacing equals wavelength"}
Adjacent nodes are **half** a wavelength apart.
:::

:::mistake{title="Counting nodes instead of gaps"}
Six nodes have five gaps between them. Divide the distance by the number of gaps.
:::

:::mistake{title="Even harmonics in a closed pipe"}
A pipe closed at one end supports only odd harmonics; the next note above $f_1$ is $3f_1$, not $2f_1$.
:::

:::mistake{title="Saying a stationary wave transfers energy"}
The two travelling waves carry equal energy in opposite directions; the net energy transfer is zero.
:::

## Exam tips

:::exam-tip{title="Which papers"}
A favourite in ZIMSEC Papers 1-2 and Cambridge Papers 1-2; string and resonance-tube experiments appear in practical Papers 3 and 4.
:::

:::exam-tip{title="Command words"}
*Explain how a stationary wave is formed*: two waves of the same frequency (and speed) travelling in opposite directions (usually incident and reflected) superpose. *State* the phase relationship: in phase between adjacent nodes, antiphase across a node. *Describe the pattern* in words: nodes, antinodes and their spacing. *Determine* $\lambda$: measure across several nodes and double the spacing.
:::

## Summary

:::summary
- Superposition: displacements add at a point where waves meet.
- Two waves of equal frequency travelling in opposite directions form a stationary wave with fixed nodes and antinodes.
- Adjacent nodes (or antinodes) are $\lambda/2$ apart; node to antinode is $\lambda/4$.
- String: $f_n = nv/2L$; closed pipe: $f_1 = v/4L$, odd harmonics only; open pipe: $f_1 = v/2L$.
- Stationary waves transfer no net energy; points between adjacent nodes oscillate in phase.
:::
