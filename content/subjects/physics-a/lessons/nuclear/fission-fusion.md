---
{
  "key": "nuclear.fission-fusion",
  "title": "Nuclear fission and fusion",
  "summary": "Explain nuclear fission and fusion in terms of binding energy per nucleon, calculate the energy released from mass changes using ΔE = c²Δm, describe chain reactions and the roles of the moderator, control rods and coolant in a thermal reactor in outline, and explain why fusion powers the stars and needs very high temperatures and densities.",
  "concepts": ["aphys.nuclear.fission-fusion"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Zimbabwe's electricity comes mainly from falling water at Kariba and burning coal at Hwange, but much of the world's low-carbon electricity comes from splitting uranium nuclei, and every joule of sunlight that grows our maize began as hydrogen nuclei fusing in the core of the Sun. Fission and fusion are opposite processes, yet both release energy, and the curve of binding energy per nucleon explains why.

This lesson explains fission and fusion, calculates the energy they release from mass changes, outlines how a fission reactor controls a chain reaction, and explains the extreme conditions fusion requires.

You should already know mass defect, binding energy, binding energy per nucleon and its peak near $A = 56$, $\Delta E = c^2\Delta m$, and $1\ \text{u} \equiv 931.5\ \text{MeV}$.

## Key definitions

:::definition{term="Nuclear fission"}
The splitting of a heavy nucleus into two smaller nuclei of roughly similar mass, usually with the release of two or three neutrons and energy. In a reactor it is induced by the absorption of a slow neutron.
:::

:::definition{term="Nuclear fusion"}
The joining of two light nuclei to form a heavier nucleus, with the release of energy.
:::

:::definition{term="Chain reaction"}
A self-sustaining sequence of fissions in which neutrons released by one fission cause further fissions.
:::

:::definition{term="Critical mass"}
The minimum mass of fissile material in which a chain reaction can be sustained (fewer neutrons escape through the surface relative to those produced inside).
:::

:::formula{name="Energy released"}
$$
\Delta E = c^2\,\Delta m = c^2\left(\sum m_{\text{before}} - \sum m_{\text{after}}\right)
$$

Equivalently, energy released = total binding energy of the products − total binding energy of the reactants.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: ZIMSEC Form 6 (nuclear physics) and Cambridge A Level topic 23 (Paper 4). Reactor components are needed only in outline.
:::

## Why both release energy

The binding energy per nucleon rises steeply for light nuclei, peaks at about 8.8 MeV near iron-56, and falls slowly to about 7.6 MeV for uranium.

- **Fission**: uranium-235 (about 7.6 MeV per nucleon) splits into nuclei with $A$ around 90 and 140 (about 8.4 to 8.7 MeV per nucleon). Each of the roughly 235 nucleons becomes about 0.8 to 0.9 MeV more tightly bound, releasing roughly 200 MeV per fission.
- **Fusion**: hydrogen isotopes (about 1 to 3 MeV per nucleon) form helium-4 (7.1 MeV per nucleon). The gain per nucleon is several MeV, so fusion releases more energy **per kilogram** of fuel than fission, though less per reaction.

Both move nuclei towards the peak; the products have more binding energy and so less mass than the reactants.

## Fission of uranium-235

A slow (thermal) neutron is absorbed by uranium-235, forming highly unstable uranium-236, which splits. One of many possible reactions is

$$
{}^{1}_{0}\text{n} + {}^{235}_{92}\text{U} \rightarrow {}^{141}_{56}\text{Ba} + {}^{92}_{36}\text{Kr} + 3\,{}^{1}_{0}\text{n}
$$

Most of the energy appears as kinetic energy of the fission fragments, which heats the fuel; the rest is carried by the neutrons, gamma rays and later by the radioactive decay of the fragments, which are neutron-rich and strongly radioactive.

### Chain reactions

Each fission releases two or three neutrons. If, on average, exactly one of them causes another fission, the reaction proceeds at a steady rate (critical). If more than one does, the rate grows rapidly; if fewer, it dies away. Starting from 1000 fissions, the number in later generations would be (illustrative values for the average number $k$ of further fissions caused per fission):

| generation | $k = 0.95$ | $k = 1.00$ | $k = 1.05$ |
| --- | --- | --- | --- |
| 0 | 1000 | 1000 | 1000 |
| 1 | 950 | 1000 | 1050 |
| 5 | 774 | 1000 | 1280 |
| 10 | 599 | 1000 | 1630 |
| 20 | 358 | 1000 | 2650 |

Because a generation lasts only a tiny fraction of a second, even $k$ slightly above 1 would make the power climb very fast; a reactor is controlled so that $k$ stays at 1.

### A thermal reactor in outline

- **Fuel rods**: uranium enriched in uranium-235.
- **Moderator** (water or graphite): slows the fast fission neutrons by repeated collisions with light nuclei, because slow neutrons are much more likely to cause fission in uranium-235.
- **Control rods** (boron or cadmium): absorb neutrons; lowering them in reduces the number of neutrons available and so the fission rate.
- **Coolant** (water or gas): carries the thermal energy to a heat exchanger to make steam for turbines.
- **Shielding**: thick concrete and steel absorb neutrons and gamma radiation.

## Fusion

The Sun and other main-sequence stars release energy by fusing hydrogen into helium in a series of steps. On Earth, the most promising reaction for power stations is deuterium-tritium fusion:

$$
{}^{2}_{1}\text{H} + {}^{3}_{1}\text{H} \rightarrow {}^{4}_{2}\text{He} + {}^{1}_{0}\text{n}
$$

### Conditions for fusion

Nuclei are positively charged and repel each other. To fuse they must get close enough (about $10^{-15}\ \text{m}$) for the short-range strong force to act.

- **Very high temperature** (about $10^{7}$ K in the Sun's core, more than $10^{8}$ K in reactors on Earth): the nuclei need very high kinetic energies to overcome the electrostatic repulsion.
- **High density** (pressure): enough nuclei per unit volume for collisions, and so fusions, to be frequent.
- At these temperatures matter is a plasma; on Earth it must be confined by magnetic fields, which is why practical fusion power is still being developed. In stars, gravity provides the confinement.

## Worked examples

:::worked-solution[Energy from one fission]
For the barium-krypton fission above, the masses are: neutron $1.008665\ \text{u}$, uranium-235 $235.043930\ \text{u}$, barium-141 $140.914411\ \text{u}$, krypton-92 $91.926156\ \text{u}$ (atomic masses; the electrons balance). Find the energy released.

1. Before: $1.008665 + 235.043930 = 236.052595\ \text{u}$.
2. After: $140.914411 + 91.926156 + 3(1.008665) = 235.866562\ \text{u}$.
3. $\Delta m = 0.186033\ \text{u}$; $\Delta E = 0.186033 \times 931.5 = 173.3\ \text{MeV}$.
4. In joules: $0.186033 \times 1.66 \times 10^{-27} \times (3.00 \times 10^{8})^2 = 2.78 \times 10^{-11}\ \text{J}$.
:::

:::worked-solution[Energy from one kilogram]
Estimate the energy released if 1.0 kg of uranium-235 undergoes this fission ($N_A = 6.02 \times 10^{23}\ \text{mol}^{-1}$, molar mass $0.235\ \text{kg mol}^{-1}$).

1. Nuclei in 1.0 kg: $6.02 \times 10^{23}/0.235 = 2.56 \times 10^{24}$.
2. Energy $= 2.56 \times 10^{24} \times 2.78 \times 10^{-11} = 7.12 \times 10^{13}\ \text{J}$.
3. Burning 1.0 kg of coal releases about $3 \times 10^{7}\ \text{J}$, over two million times less.
:::

:::worked-solution[Deuterium-tritium fusion]
Masses: deuterium $2.014102\ \text{u}$, tritium $3.016049\ \text{u}$, helium-4 $4.002602\ \text{u}$, neutron $1.008665\ \text{u}$. Find the energy released.

1. $\Delta m = (2.014102 + 3.016049) - (4.002602 + 1.008665) = 0.018884\ \text{u}$.
2. $\Delta E = 0.018884 \times 931.5 = 17.6\ \text{MeV} = 2.82 \times 10^{-12}\ \text{J}$.
3. Per nucleon of fuel: $17.6/5 = 3.5\ \text{MeV}$, compared with $173/236 = 0.73\ \text{MeV}$ for this fission.
:::

## Common mistakes

:::mistake{title="Energy from binding energy being released"}
Energy is released because the **products** have greater binding energy per nucleon. Do not say "binding energy is released when the nucleus breaks".
:::

:::mistake{title="Moderator absorbs neutrons"}
The moderator **slows** neutrons; the control rods **absorb** them.
:::

:::mistake{title="Forgetting the neutrons"}
Count every neutron on both sides of a fission equation, including the one that causes the fission.
:::

:::mistake{title="Fusion needs heat to start because it is endothermic"}
Fusion releases energy. The high temperature is needed to give nuclei enough kinetic energy to overcome their electrostatic repulsion.
:::

## Exam tips

:::exam-tip{title="Which papers"}
Cambridge Paper 4 (A Level topic 23) and ZIMSEC Papers 1-3 (Form 6). Expect energy-release calculations from masses, explanations using the binding-energy-per-nucleon curve, and short descriptions of the moderator, control rods and fusion conditions.
:::

:::exam-tip{title="Command words"}
*Explain* why energy is released: products have higher binding energy per nucleon, so mass decreases and $\Delta E = c^2\Delta m$. *Explain* why fusion needs high temperature: nuclei must overcome electrostatic repulsion to come within range of the strong force. *Describe* the function of a moderator or control rod in one precise sentence. *Calculate*: keep all decimal places of the masses until the subtraction.
:::

## Summary

:::summary
- Fission: a heavy nucleus splits (after absorbing a slow neutron) into two medium nuclei plus 2-3 neutrons; about 200 MeV per fission.
- Fusion: light nuclei join; needs very high temperature and density to overcome electrostatic repulsion; powers the stars.
- Both release energy because the products have higher binding energy per nucleon; $\Delta E = c^2\Delta m$.
- Chain reaction: neutrons from one fission cause more; a reactor keeps it steady.
- Reactor: moderator slows neutrons, control rods absorb them, coolant removes heat, shielding protects people.
:::
