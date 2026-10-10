---
{
  "key": "nuclear.atom-nucleus",
  "title": "The nuclear atom, nuclides and isotopes",
  "summary": "Interpret the alpha-particle scattering experiment, describe the nuclear model of the atom, use proton number, nucleon number and nuclide notation, explain isotopes, compare atomic and nuclear sizes, use the unified atomic mass unit and apply conservation of charge and nucleon number to nuclear processes.",
  "concepts": ["aphys.nuclear.atom-nucleus"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Every atom in a sheet of gold leaf, a lump of Hwange coal or a grain of Great Dyke chromite is almost entirely empty space. Its mass and all its positive charge are packed into a nucleus about ten thousand times smaller than the atom itself. That picture is barely a century old: it came from firing alpha particles at a thin gold foil and noticing that a tiny fraction bounced almost straight back.

This lesson explains the scattering experiment and what it proved, builds the simple nuclear model of protons, neutrons and orbiting electrons, and introduces the notation and bookkeeping (nucleon number, proton number, isotopes, the unified atomic mass unit, conservation laws) used in every later nuclear topic.

You should already know that atoms contain electrons, that like charges repel, and the meaning of charge, mass and density.

## Key definitions

:::definition{term="Nucleon"}
A particle in the nucleus: a proton or a neutron.
:::

:::definition{term="Proton number (atomic number) Z"}
The number of protons in the nucleus of an atom. It fixes the element and the charge of the nucleus, $+Ze$.
:::

:::definition{term="Nucleon number (mass number) A"}
The total number of protons and neutrons in the nucleus. The number of neutrons is $N = A - Z$.
:::

:::definition{term="Nuclide"}
A particular kind of nucleus, specified by its proton number and its nucleon number.
:::

:::definition{term="Isotopes"}
Nuclides of the same element: the same number of protons but different numbers of neutrons.
:::

:::definition{term="Unified atomic mass unit (u)"}
One twelfth of the mass of a neutral atom of carbon-12. $1\ \text{u} = 1.66 \times 10^{-27}\ \text{kg}$.
:::

:::formula{name="Nuclide notation"}
$$
{}^{A}_{Z}\text{X}
$$

$X$ the chemical symbol; $A$ the nucleon number (top); $Z$ the proton number (bottom). Example: ${}^{235}_{92}\text{U}$ has 92 protons and $235 - 92 = 143$ neutrons.
:::

:::keyfact{title="Sizes and masses to know"}
Atomic radius about $10^{-10}\ \text{m}$; nuclear radius about $10^{-15}$ to $10^{-14}\ \text{m}$. Proton charge $+e$, electron charge $-e$, neutron uncharged, with $e = 1.60 \times 10^{-19}\ \text{C}$. Proton and neutron masses are each about $1\ \text{u}$; the electron's is about $\tfrac{1}{1840}$ of that.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: ZIMSEC Form 6 (nuclear physics) and Cambridge AS Level topic 11 (Papers 1 and 2). Quarks inside the nucleons are a Cambridge topic covered in a separate lesson.
:::

## The alpha-particle scattering experiment

A narrow beam of alpha particles (helium nuclei, charge $+2e$) from a radioactive source is directed at a very thin gold foil in an evacuated chamber. A detector (originally a zinc sulfide screen viewed through a microscope, which gives a flash for each hit) is moved round the foil to count the alpha particles scattered through each angle $\theta$ in a fixed time.

The vacuum matters: in air, alpha particles travel only a few centimetres before losing their energy. The foil is thin so that each particle is scattered by (at most) one nucleus.

### Results and conclusions

| Observation | Conclusion |
| --- | --- |
| Almost all alpha particles pass straight through or are deflected by very small angles. | Most of the atom is empty space. |
| A small number are deflected through large angles. | The positive charge is concentrated in a very small region that repels them strongly. |
| A very few (about 1 in 10 000 or fewer) rebound through more than $90^\circ$. | That region also contains most of the mass: a light charge could not turn back a heavy, fast alpha particle. |

Together these show a **small, dense, positively charged nucleus** containing nearly all the mass, surrounded by mostly empty space in which the electrons move. The earlier "plum pudding" model, with positive charge spread through the whole atom, gives fields far too weak to deflect alpha particles by large angles.

### How the count varies with angle

The number of alpha particles detected per unit time falls very steeply as the scattering angle increases. Relative numbers predicted for a gold foil are:

| $\theta\,/\,^\circ$ | relative number detected per unit time |
| --- | --- |
| 10 | 1 000 000 |
| 20 | 63 000 |
| 30 | 13 000 |
| 45 | 2 700 |
| 60 | 920 |
| 90 | 230 |
| 120 | 100 |
| 150 | 66 |

The graph of number against angle is a steeply falling curve that flattens at large angles but never reaches zero: a few particles always come back. Only a particle aimed almost directly at a nucleus gets close enough to be turned back, and few particles are aimed that precisely.

## The nuclear model

- The **nucleus** contains protons (charge $+e$) and neutrons (no charge), together called nucleons. It holds over 99.9% of the atom's mass.
- **Electrons** (charge $-e$) occupy the space around the nucleus. A neutral atom has as many electrons as protons.
- The nucleus of a nuclide ${}^{A}_{Z}\text{X}$ has charge $+Ze$ and mass close to $A$ unified atomic mass units.
- Isotopes have identical chemistry (the same number of electrons) but different masses and often different nuclear stability. Carbon-12 and carbon-14, or uranium-235 and uranium-238, are pairs of isotopes.

### Orders of magnitude

A gold atom has a radius of about $1.4 \times 10^{-10}\ \text{m}$ and its nucleus about $7.0 \times 10^{-15}\ \text{m}$: a ratio of about 20 000, so the nucleus occupies roughly 1 part in $10^{13}$ of the atom's volume. If the nucleus were a marble on the centre spot of a football pitch, the atom would be larger than the stadium.

## Conservation in nuclear processes

In every nuclear reaction and decay:

- **nucleon number is conserved**: the top numbers balance;
- **charge (proton number) is conserved**: the bottom numbers balance, counting an electron as $-1$ and a positron as $+1$.

For example, when nitrogen-14 is bombarded with alpha particles,

$$
{}^{14}_{7}\text{N} + {}^{4}_{2}\text{He} \rightarrow {}^{17}_{8}\text{O} + {}^{1}_{1}\text{p}
$$

Top: $14 + 4 = 17 + 1$. Bottom: $7 + 2 = 8 + 1$.

## Worked examples

:::worked-solution[Composition, charge and mass of a nucleus]
For the nuclide ${}^{235}_{92}\text{U}$, state the numbers of protons and neutrons, and estimate the charge and mass of the nucleus.

1. Protons $= Z = 92$; neutrons $= A - Z = 235 - 92 = 143$.
2. Charge $= Ze = 92 \times 1.60 \times 10^{-19} = 1.47 \times 10^{-17}\ \text{C}$.
3. Mass $\approx A\ \text{u} = 235 \times 1.66 \times 10^{-27} = 3.90 \times 10^{-25}\ \text{kg}$.
:::

:::worked-solution[Density of nuclear matter]
A gold-197 nucleus has a radius of $7.0 \times 10^{-15}\ \text{m}$. Estimate its density.

1. Mass $\approx 197 \times 1.66 \times 10^{-27} = 3.27 \times 10^{-25}\ \text{kg}$.
2. Volume $= \tfrac{4}{3}\pi r^3 = \tfrac{4}{3}\pi(7.0 \times 10^{-15})^3 = 1.44 \times 10^{-42}\ \text{m}^3$.
3. Density $= m/V = 2.3 \times 10^{17}\ \text{kg m}^{-3}$: about $10^{13}$ times the density of solid gold.
:::

:::worked-solution[Balancing a nuclear equation]
Identify X in ${}^{9}_{4}\text{Be} + {}^{4}_{2}\text{He} \rightarrow {}^{12}_{6}\text{C} + \text{X}$.

1. Nucleon number: $9 + 4 = 12 + A$, so $A = 1$.
2. Proton number: $4 + 2 = 6 + Z$, so $Z = 0$.
3. X is ${}^{1}_{0}\text{n}$, a neutron (this reaction led to the neutron's discovery).
:::

## Common mistakes

:::mistake{title="Swapping A and Z"}
The nucleon number is the top (larger) number. Neutrons $= A - Z$, not $A$.
:::

:::mistake{title="Isotopes of different elements"}
Isotopes must have the **same** proton number. ${}^{14}_{6}\text{C}$ and ${}^{14}_{7}\text{N}$ have the same nucleon number but are different elements, not isotopes.
:::

:::mistake{title="Over-reading the experiment"}
Alpha scattering shows a small, dense, positive nucleus. It does not show neutrons (discovered later) or electron energy levels.
:::

:::mistake{title="Why gold foil"}
Gold is used because it can be beaten very thin and its nuclei are massive and highly charged, giving large deflections. Saying "gold is dense" is not the reason.
:::

## Exam tips

:::exam-tip{title="Which papers"}
Cambridge Papers 1 and 2 (AS topic 11) and ZIMSEC Papers 1-3. Expect multiple-choice items on nuclide notation and isotopes, and structured parts describing the scattering results and conclusions.
:::

:::exam-tip{title="Command words"}
*Describe* the results: give each observation (most undeflected, few through large angles, very few back). *Explain* what they show: pair each observation with its conclusion. *State* the composition of a nuclide: protons $Z$, neutrons $A - Z$, electrons $Z$ in the neutral atom. *Estimate*: give one or two significant figures and the order of magnitude.
:::

## Summary

:::summary
- Alpha scattering: most alpha particles pass straight through (atom mostly empty); a few are deflected through large angles (small, dense, positive nucleus).
- Nucleus: protons and neutrons (nucleons); charge $+Ze$, mass about $A$ u, radius about $10^{-15}$ to $10^{-14}\ \text{m}$; atom about $10^{-10}\ \text{m}$.
- ${}^{A}_{Z}\text{X}$: $Z$ protons, $A - Z$ neutrons. Isotopes: same $Z$, different $A$.
- $1\ \text{u} = 1.66 \times 10^{-27}\ \text{kg}$, one twelfth of the mass of a carbon-12 atom.
- Nucleon number and charge are conserved in nuclear processes.
:::
