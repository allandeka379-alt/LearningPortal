---
{
  "key": "nuclear.mass-defect-binding",
  "title": "Mass-energy equivalence, mass defect and binding energy",
  "summary": "Use E = mc² and the equivalence of mass and energy, define and calculate mass defect and binding energy in kg, u, J and MeV, calculate binding energy per nucleon, sketch and explain the variation of binding energy per nucleon with nucleon number, and find the energy released or absorbed in nuclear reactions from masses.",
  "concepts": ["aphys.nuclear.mass-defect-binding"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

Weigh a helium-4 nucleus and you find it is lighter than the two protons and two neutrons it is made from. The "missing" mass has not vanished: it is the energy that was released when the nucleons bound together, according to Einstein's $E = mc^2$. The same accounting explains why uranium fuel in a nuclear power station and hydrogen in the Sun both release energy, and why iron sits at the bottom of the nuclear energy valley.

This lesson introduces mass-energy equivalence, mass defect and binding energy, and the curve of binding energy per nucleon that ties fission and fusion together.

You should already know nuclide notation, the unified atomic mass unit ($1\ \text{u} = 1.66 \times 10^{-27}\ \text{kg}$), the electronvolt, and conservation of nucleon number and charge.

## Key definitions

:::definition{term="Mass-energy equivalence"}
Mass and energy are equivalent: a change in energy $\Delta E$ of a system is always accompanied by a change in mass $\Delta m = \Delta E/c^2$.
:::

:::definition{term="Mass defect"}
The difference between the total mass of the separate nucleons in a nucleus and the mass of the nucleus itself.
:::

:::definition{term="Binding energy"}
The minimum energy needed to separate a nucleus completely into its individual protons and neutrons (equivalently, the energy released when the nucleus is formed from them).
:::

:::definition{term="Binding energy per nucleon"}
The binding energy of a nucleus divided by its nucleon number: a measure of how tightly each nucleon is held, and so of the stability of the nucleus.
:::

:::formula{name="Mass-energy equivalence"}
$$
\Delta E = c^2\,\Delta m
$$

$\Delta E$ in J; $\Delta m$ in kg; $c = 3.00 \times 10^{8}\ \text{m s}^{-1}$.
:::

:::formula{name="Mass defect of a nuclide"}
$$
\Delta m = Zm_p + (A - Z)m_n - m_{\text{nucleus}}
$$

Binding energy $= \Delta m\,c^2$.
:::

:::keyfact{title="Masses and conversions"}
$m_p = 1.007276\ \text{u}$, $m_n = 1.008665\ \text{u}$, $m_e = 0.000549\ \text{u}$. With the data-sheet values, $1\ \text{u} \times c^2 = 1.66 \times 10^{-27} \times (3.00 \times 10^{8})^2 = 1.49 \times 10^{-10}\ \text{J} = 934\ \text{MeV}$. The precise value is $1\ \text{u} \equiv 931.5\ \text{MeV}$; use it whenever a question gives it.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: ZIMSEC Form 6 (nuclear physics) and Cambridge A Level topic 23 (Paper 4). Fission and fusion are developed in the next lesson.
:::

## Mass-energy equivalence

$E = mc^2$ applies to every energy change, but $c^2 = 9.00 \times 10^{16}\ \text{m}^2\ \text{s}^{-2}$ is so large that chemical and mechanical energy changes produce undetectable mass changes. Burning a tonne of coal at Hwange changes the mass of the products by well under a milligram. In nuclear reactions the energies per particle are about a million times larger than in chemistry, so the mass changes are measurable in atomic mass units, and must be included in the accounting: **mass-energy** is conserved, not mass alone.

## Mass defect and binding energy

To pull a nucleus apart into separate nucleons, work must be done against the strong nuclear force. The separated nucleons therefore have **more** energy, and so more mass, than the bound nucleus. The difference in mass is the mass defect; the corresponding energy is the binding energy.

Questions often give **atomic** masses (including electrons). For the nucleus, subtract $Z$ electron masses, or use the hydrogen-1 atomic mass in place of the proton mass so that the electrons cancel.

## Binding energy per nucleon

Values calculated from measured masses (with $1\ \text{u} = 931.5\ \text{MeV}$):

| nuclide | $A$ | nuclear mass / u | $\Delta m$ / u | binding energy per nucleon / MeV |
| --- | --- | --- | --- | --- |
| ${}^{2}\text{H}$ | 2 | 2.013553 | 0.002388 | 1.11 |
| ${}^{4}\text{He}$ | 4 | 4.001504 | 0.030378 | 7.07 |
| ${}^{7}\text{Li}$ | 7 | 7.014356 | 0.042132 | 5.61 |
| ${}^{12}\text{C}$ | 12 | 11.996706 | 0.098940 | 7.68 |
| ${}^{16}\text{O}$ | 16 | 15.990523 | 0.137005 | 7.98 |
| ${}^{56}\text{Fe}$ | 56 | 55.920662 | 0.528464 | 8.79 |
| ${}^{141}\text{Ba}$ | 141 | 140.883667 | 1.260314 | 8.33 |
| ${}^{235}\text{U}$ | 235 | 234.993422 | 1.915065 | 7.59 |
| ${}^{238}\text{U}$ | 238 | 238.000280 | 1.934202 | 7.57 |

A graph of binding energy per nucleon against nucleon number:

- rises steeply from very low values for the lightest nuclei (1.1 MeV for deuterium);
- has local peaks for especially stable light nuclei such as helium-4, carbon-12 and oxygen-16;
- reaches a broad maximum of about 8.8 MeV near $A = 56$ (iron and nickel), the most stable nuclei;
- falls slowly for heavier nuclei, to about 7.6 MeV for uranium.

Nuclei near the peak are the most tightly bound. Any reaction that moves nuclei **towards** the peak increases the total binding energy and releases energy: light nuclei joining (**fusion**) or heavy nuclei splitting (**fission**).

![Binding energy per nucleon against nucleon number, from the nuclide values in the lesson: 1.11 MeV for deuterium, a local peak of 7.07 MeV for helium-4, rising to a broad maximum of 8.79 MeV at iron-56, then falling slowly to about 7.6 MeV for uranium; fusion of light nuclei and fission of heavy nuclei both move towards the peak and release energy.](media:diagrams/binding-energy-per-nucleon-curve.png "Figure: iron-56 is near the peak of the binding-energy curve (lines join the tabulated nuclides)")

## Energy in nuclear reactions

For any reaction,

$$
\text{energy released} = (\text{total mass before} - \text{total mass after})\,c^2
$$

If the products have more mass than the reactants, energy must be supplied (for example as kinetic energy of an incoming particle). Equivalently, energy released = total binding energy after − total binding energy before.

## Worked examples

:::worked-solution[Binding energy of helium-4]
A helium-4 nucleus has mass $4.001504\ \text{u}$. Find its binding energy in J and MeV, and the binding energy per nucleon.

1. Separate nucleons: $2(1.007276) + 2(1.008665) = 4.031882\ \text{u}$.
2. $\Delta m = 4.031882 - 4.001504 = 0.030378\ \text{u} = 0.030378 \times 1.66 \times 10^{-27} = 5.04 \times 10^{-29}\ \text{kg}$.
3. $E = \Delta m\,c^2 = 5.04 \times 10^{-29} \times (3.00 \times 10^{8})^2 = 4.54 \times 10^{-12}\ \text{J}$ (28.4 MeV with these data; 28.3 MeV using $931.5\ \text{MeV u}^{-1}$).
4. Per nucleon: $28.3/4 = 7.07\ \text{MeV}$.
:::

:::worked-solution[A reaction that needs energy]
For ${}^{14}_{7}\text{N} + {}^{4}_{2}\text{He} \rightarrow {}^{17}_{8}\text{O} + {}^{1}_{1}\text{H}$, the atomic masses are $14.003074$, $4.002602$, $16.999132$ and $1.007825\ \text{u}$. Is energy released or absorbed?

1. Before: $14.003074 + 4.002602 = 18.005676\ \text{u}$. After: $16.999132 + 1.007825 = 18.006957\ \text{u}$. (Electrons balance: 9 on each side.)
2. Mass increases by $0.001281\ \text{u}$, so energy is **absorbed**.
3. $0.001281 \times 931.5 = 1.19\ \text{MeV}$, which must come from the kinetic energy of the alpha particle.
:::

:::worked-solution[Energy equivalent of one gram]
Find the energy equivalent of $1.0\ \text{g}$ of mass.

1. $E = mc^2 = 1.0 \times 10^{-3} \times (3.00 \times 10^{8})^2$.
2. $E = 9.0 \times 10^{13}\ \text{J}$: roughly the energy a large power station delivers in a day.
:::

## Common mistakes

:::mistake{title="Binding energy is stored in the nucleus"}
Binding energy is the energy **released** when the nucleus formed, or needed to take it apart. A nucleus with a larger binding energy has **less** mass-energy than its separate nucleons.
:::

:::mistake{title="Total versus per nucleon"}
Uranium has a far larger total binding energy than iron, but a smaller binding energy **per nucleon**. Stability is judged per nucleon.
:::

:::mistake{title="Atomic masses with electrons"}
Atomic masses include electrons. Subtract $Zm_e$ for nuclear masses, or make sure electrons balance on both sides of a reaction.
:::

:::mistake{title="Rounding too early"}
Mass defects are small differences between large numbers. Keep all the decimal places given until the subtraction is done.
:::

## Exam tips

:::exam-tip{title="Which papers"}
Cambridge Paper 4 (A Level topic 23) and ZIMSEC Papers 1-3 (Form 6). Expect definitions, a binding-energy calculation from masses, a sketch of the binding-energy-per-nucleon curve described in words, and explanations of energy release in fission and fusion.
:::

:::exam-tip{title="Command words"}
*Define* binding energy: "minimum energy to separate a nucleus into its individual nucleons". *Sketch* (describe) the curve: steep rise, peak about 8.8 MeV at $A \approx 56$, gradual fall. *Calculate*: find $\Delta m$ in u, then convert to kg (× $1.66 \times 10^{-27}$) and use $c^2$, or use 931.5 MeV when it is given. *Explain* energy release: products have higher binding energy per nucleon.
:::

## Summary

:::summary
- $\Delta E = c^2\Delta m$: every energy change has a mass change.
- Mass defect: mass of separate nucleons minus mass of the nucleus; binding energy $= \Delta m\,c^2$.
- $1\ \text{u} \times c^2 \approx 931.5\ \text{MeV}$ (934 MeV with the data-sheet values).
- Binding energy per nucleon peaks near $A = 56$ (about 8.8 MeV); higher values mean more stable nuclei.
- Energy is released when reactions increase the binding energy per nucleon: fusion of light nuclei, fission of heavy ones.
:::
