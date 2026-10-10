---
{
  "key": "quantum.energy-levels-spectra",
  "title": "Energy levels and line spectra",
  "summary": "Describe discrete electron energy levels in isolated atoms, explain excitation and ionisation, explain how emission and absorption line spectra are formed, use hf = E₁ − E₂ to calculate the wavelengths of spectral lines and identify transitions, and count the possible transitions between levels.",
  "concepts": ["aphys.quantum.energy-levels-spectra"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Look at a street lamp in Harare through a diffraction grating and you see not a rainbow but a few bright coloured lines: the yellow of sodium or the blue-green of mercury. Every element has its own set of lines, a fingerprint that lets astronomers identify elements in stars they will never visit, and lets mining laboratories in Bulawayo analyse ore samples. Line spectra are direct evidence that the electrons in an atom can only have certain energies.

This lesson describes energy levels, explains how emission and absorption spectra arise, and shows how to link each spectral line to a transition between two levels.

You should already know photon energy $E = hf = hc/\lambda$, the electronvolt, and how a diffraction grating separates wavelengths.

## Key definitions

:::definition{term="Energy level"}
One of the discrete, allowed values of energy that an electron in an isolated atom can have.
:::

:::definition{term="Ground state"}
The lowest energy level of an atom: the state in which its electrons are most tightly bound.
:::

:::definition{term="Excitation"}
The promotion of an electron to a higher energy level by absorbing exactly the energy difference between the levels (from a photon or a colliding electron).
:::

:::definition{term="Ionisation energy"}
The minimum energy needed to remove an electron completely from an atom in its ground state, taking it to the zero of energy (infinity).
:::

:::definition{term="Emission line spectrum"}
A set of bright lines of particular wavelengths on a dark background, emitted by a hot, low-pressure gas.
:::

:::definition{term="Absorption line spectrum"}
A continuous spectrum crossed by dark lines at particular wavelengths, produced when white light passes through a cooler gas.
:::

:::formula{name="Photon emitted or absorbed in a transition"}
$$
hf = \frac{hc}{\lambda} = E_1 - E_2
$$

$E_1$ the higher level, $E_2$ the lower level (in J); $f$ and $\lambda$ of the photon.
:::

:::keyfact{title="Why the energies are negative"}
The zero of energy is an electron at rest, completely removed from the atom (at infinity). A bound electron has less energy than this, so every level is negative. The ground state is the most negative; levels crowd closer together towards zero as the energy increases.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: ZIMSEC Form 6 (quantum physics) and Cambridge A Level topic 22 (Paper 4). Hydrogen is the usual example; the formula $E_n = -13.6/n^2$ eV is not required, but the level values are often given in questions.
:::

## Energy levels of hydrogen

| $n$ | $E\,/\,\text{eV}$ | $E\,/\,\text{J}$ |
| --- | --- | --- |
| 1 (ground state) | $-13.60$ | $-2.18 \times 10^{-18}$ |
| 2 | $-3.40$ | $-5.44 \times 10^{-19}$ |
| 3 | $-1.51$ | $-2.42 \times 10^{-19}$ |
| 4 | $-0.85$ | $-1.36 \times 10^{-19}$ |
| 5 | $-0.54$ | $-8.70 \times 10^{-20}$ |
| $\infty$ | $0$ | $0$ |

An energy-level diagram draws these as horizontal lines, spaced to scale, with the ground state at the bottom. The gaps get smaller going up: the energy rises steeply at first and then levels off towards zero. The ionisation energy of hydrogen is 13.6 eV.

## Emission spectra

In a discharge tube, collisions with fast electrons excite atoms of a low-pressure gas. An excited atom is unstable: within about $10^{-8}\ \text{s}$ an electron drops to a lower level and the atom emits **one photon** carrying exactly the energy difference. Because the levels are discrete, only certain differences are possible, so only certain wavelengths appear: a **line** spectrum.

- Large drops (for example to $n = 1$ in hydrogen) give ultraviolet photons.
- Drops to $n = 2$ in hydrogen give the visible lines.
- Small drops between high levels give infrared photons.

## Absorption spectra

When white light (all wavelengths) passes through a cooler gas, atoms absorb photons whose energy **exactly** matches a gap from their current level (usually the ground state) to a higher level. The excited atoms re-emit the energy within a very short time, but in **all directions**, so less light of that wavelength continues in the original direction. A dark line appears at each absorbed wavelength, at the same positions as the corresponding emission lines of that element. The dark lines in the Sun's spectrum are produced in this way by its cooler outer layers.

A photon whose energy does not match a gap passes through unabsorbed. A photon with more than the ionisation energy can, however, be absorbed by ionising the atom, with the excess becoming kinetic energy of the freed electron.

## Counting transitions

An electron in level $n$ can fall directly to any lower level, or in steps. The number of different photon energies possible from level $n$ is

$$
\frac{n(n - 1)}{2}
$$

From $n = 4$: $4 \times 3/2 = 6$ lines ($4 \to 3$, $4 \to 2$, $4 \to 1$, $3 \to 2$, $3 \to 1$, $2 \to 1$).

## Worked examples

:::worked-solution[Wavelength of a hydrogen line]
Find the wavelength of the photon emitted when an electron in hydrogen falls from $n = 3$ ($-1.51\ \text{eV}$) to $n = 2$ ($-3.40\ \text{eV}$).

1. $\Delta E = -1.51 - (-3.40) = 1.89\ \text{eV} = 1.89 \times 1.60 \times 10^{-19} = 3.02 \times 10^{-19}\ \text{J}$.
2. $\lambda = hc/\Delta E = 6.63 \times 10^{-34} \times 3.00 \times 10^{8}/3.02 \times 10^{-19}$.
3. $\lambda = 658\ \text{nm}$: red light (the well-known red hydrogen line; the small difference from the measured 656 nm comes from the rounded data).
:::

:::worked-solution[Identifying a transition]
A hydrogen line has wavelength $488\ \text{nm}$. Identify the transition.

1. Photon energy: $hc/\lambda = 4.08 \times 10^{-19}\ \text{J} = 2.55\ \text{eV}$.
2. Look for a pair of levels $2.55\ \text{eV}$ apart: $-0.85 - (-3.40) = 2.55\ \text{eV}$.
3. The transition is $n = 4 \to n = 2$ (blue-green).
:::

:::worked-solution[Ionisation]
Find the longest wavelength that can ionise hydrogen in its ground state.

1. Minimum energy = ionisation energy = $13.6\ \text{eV} = 2.18 \times 10^{-18}\ \text{J}$.
2. $\lambda = hc/E = 9.14 \times 10^{-8}\ \text{m} = 91.4\ \text{nm}$ (ultraviolet). Shorter wavelengths ionise too, with the excess becoming kinetic energy of the electron.
:::

## Common mistakes

:::mistake{title="Using one level's energy"}
The photon energy is the **difference** between two levels, not the value of either level. A photon from $n = 3$ to $n = 2$ has 1.89 eV, not 1.51 eV.
:::

:::mistake{title="Sign of the energy"}
Use magnitudes for the photon: $\Delta E = E_{\text{upper}} - E_{\text{lower}}$ is positive. Photon energies are never negative.
:::

:::mistake{title="Absorption lines from re-emission"}
Atoms do re-emit the absorbed energy, but in all directions, so the line stays dark in the direction of the beam.
:::

:::mistake{title="Partial absorption of photons"}
A photon is absorbed whole or not at all. A photon of 11 eV cannot excite ground-state hydrogen (the gaps are 10.2 eV and 12.09 eV), so it passes through. (A colliding **electron**, unlike a photon, can give up just part of its kinetic energy.)
:::

## Exam tips

:::exam-tip{title="Which papers"}
Cambridge Paper 4 (A Level topic 22) and ZIMSEC Papers 1-3 (Form 6). Expect energy-level diagrams with calculations of wavelengths, identification of transitions, explanations of line spectra, and counting the number of lines.
:::

:::exam-tip{title="Command words"}
*Explain* how a line spectrum shows discrete levels: each line is a single photon energy equal to a difference between levels; only discrete differences give discrete wavelengths. *Describe* an absorption spectrum: dark lines on a continuous background. *Calculate*: convert eV to J before using $\lambda = hc/\Delta E$. *Show on a diagram*: describe arrows downwards for emission, upwards for absorption.
:::

## Summary

:::summary
- Electrons in isolated atoms have discrete, negative energy levels; zero is the ionised state.
- A transition between levels emits or absorbs one photon: $hf = hc/\lambda = E_1 - E_2$.
- Emission spectra: bright lines from excited gases; absorption spectra: dark lines where white light passes through cooler gas.
- Ionisation energy is the energy to remove an electron from the ground state (13.6 eV for hydrogen).
- From level $n$, up to $n(n - 1)/2$ different lines can be emitted.
:::
