---
{
  "key": "halogen.sn1-sn2",
  "title": "Nucleophilic substitution: SN1 and SN2 mechanisms",
  "summary": "The one-step SN2 mechanism (transition state, inversion, rate = k[RX][OH⁻]) and the two-step SN1 mechanism (carbocation intermediate, racemisation, rate = k[RX]) described in words; why primary halogenoalkanes react by SN2 and tertiary by SN1; inductive and steric effects; competition between substitution and elimination.",
  "concepts": ["achem.halogen.sn1-sn2"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

1-bromobutane and 2-bromo-2-methylpropane have the same molecular formula, $\ce{C4H9Br}$, and both are hydrolysed by hydroxide ions to alcohols. Yet doubling the hydroxide concentration doubles the rate for one of them and has no effect on the other. The explanation is that they react by two different mechanisms, SN2 and SN1. Knowing which mechanism operates lets chemists predict rates, the effect of changing conditions and even the shape (stereochemistry) of the product, which matters a great deal when the product is a medicine.

You should already know the reactions of halogenoalkanes, nucleophiles and curly arrows, carbocation stability and the idea of a rate equation and rate-determining step.

## Key definitions

:::definition{term="SN2"}
Substitution, nucleophilic, bimolecular: a one-step mechanism in which the nucleophile attacks as the halide leaves; two species take part in the rate-determining step.
:::

:::definition{term="SN1"}
Substitution, nucleophilic, unimolecular: a two-step mechanism in which the halogenoalkane first ionises slowly to a carbocation, which is then attacked rapidly by the nucleophile; one species takes part in the rate-determining step.
:::

:::definition{term="Transition state"}
The highest-energy arrangement of atoms along the reaction pathway, in which bonds are partly broken and partly formed; it cannot be isolated (unlike an intermediate).
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: both mechanisms in words, which halogenoalkanes use which, and the rate equations. The rate equation and rate-determining step link to the kinetics lesson on mechanisms (A Level for Cambridge).
:::

## The SN2 mechanism (primary halogenoalkanes)

:::example{title="Example 1: SN2 hydrolysis of bromoethane"}
1. The C–Br bond is polar: carbon δ+, bromine δ−.
2. The hydroxide ion approaches the δ+ carbon from the side **opposite** the bromine atom (backside attack), where there is least repulsion from the electron-rich bromine.
3. A curly arrow goes from a lone pair on the oxygen of $\ce{OH-}$ to the δ+ carbon; at the same time a curly arrow goes from the C–Br bond to the bromine atom.
4. **Transition state**: the carbon is partly bonded to both O and Br (shown with dotted bonds), with the three other groups (two H, one CH₃) flattened into a plane; the overall charge (−1) is spread over O and Br. It is often written in square brackets with a minus sign outside.
5. The C–Br bond breaks fully and $\ce{Br-}$ leaves; ethanol forms. The other three groups have flipped over, like an umbrella turning inside out in the wind: **inversion of configuration**.
:::

Both the halogenoalkane and the hydroxide ion are in the single, rate-determining step, so:

$$\text{rate} = k[\ce{RBr}][\ce{OH-}]$$

## The SN1 mechanism (tertiary halogenoalkanes)

1. **Slow step.** The C–Br bond breaks heterolytically on its own (an arrow from the C–Br bond to Br): $\ce{(CH3)3CBr -> (CH3)3C+ + Br-}$. A tertiary carbocation forms.
2. **Fast step.** A lone pair on $\ce{OH-}$ (or on water) attacks the positive carbon: $\ce{(CH3)3C+ + OH- -> (CH3)3COH}$.

Only the halogenoalkane is in the rate-determining step:

$$\text{rate} = k[\ce{RBr}]$$

The carbocation is **trigonal planar** (sp²), so the nucleophile can attack equally from either face. If the carbon was chiral, the product is a racemic mixture.

## Why primary prefers SN2 and tertiary prefers SN1

| Factor | Primary (e.g. $\ce{CH3CH2CH2Br}$) | Tertiary (e.g. $\ce{(CH3)3CBr}$) |
|---|---|---|
| carbocation stability (inductive effect) | primary carbocation unstable: only one electron-donating alkyl group | tertiary carbocation stabilised by three alkyl groups, so ionisation is possible |
| steric hindrance | small H atoms leave the back of the carbon open to attack | three bulky CH₃ groups block backside attack |
| mechanism | SN2 | SN1 |

![Two reaction profiles for halogenoalkane hydrolysis: SN2 has a single peak at the transition state, with the reactants RX and hydroxide passing directly to products; SN1 has two peaks with a dip between them for the carbocation intermediate, and the first step, forming the carbocation, has the higher peak so it is the slow step.](media:diagrams/sn1-sn2-energy-profiles.png "Figure: SN2 has a transition state; SN1 has a real intermediate and a slow first step")

**Secondary** halogenoalkanes, such as 2-bromopropane, are intermediate: they react by a mixture of both mechanisms.

:::worked-solution[Example 2: deducing the mechanism from rate data]
Hydrolysis of a halogenoalkane RBr by $\ce{OH-}$ at 25 °C (data obtained in an experiment):

| Exp. | [RBr] / mol dm⁻³ | [OH⁻] / mol dm⁻³ | initial rate / mol dm⁻³ s⁻¹ |
|---|---|---|---|
| 1 | 0.010 | 0.020 | 4.8 × 10⁻⁸ |
| 2 | 0.020 | 0.020 | 9.6 × 10⁻⁸ |
| 3 | 0.010 | 0.040 | 9.6 × 10⁻⁸ |

1. Experiments 1 and 2: [RBr] doubled, rate doubled: first order in RBr.
2. Experiments 1 and 3: [OH⁻] doubled, rate doubled: first order in OH⁻.
3. Rate = $k[\ce{RBr}][\ce{OH-}]$, second order overall: both species are in the rate-determining step, so the mechanism is **SN2** and RBr is probably primary.
4. $k = \dfrac{4.8 \times 10^{-8}}{0.010 \times 0.020} = 2.4 \times 10^{-4}\ \text{dm}^3\ \text{mol}^{-1}\ \text{s}^{-1}$.
:::

For comparison, 2-bromo-2-methylpropane gives data such as: 0.050 mol dm⁻³ RBr with 0.10 mol dm⁻³ OH⁻, rate 1.75 × 10⁻⁴; doubling [RBr] gives 3.50 × 10⁻⁴; doubling [OH⁻] leaves the rate at 1.75 × 10⁻⁴. Zero order in OH⁻ points to SN1.

## Substitution or elimination?

Hydroxide is both a nucleophile (attacking carbon) and a base (removing an H⁺ from the carbon next to C–X). Which role wins depends mainly on conditions:

| Conditions | Main reaction | Product from 2-bromopropane |
|---|---|---|
| NaOH(aq), warm | substitution | propan-2-ol |
| NaOH in ethanol, hot | elimination | propene |

Tertiary halogenoalkanes give more elimination than primary ones under the same conditions. In practice, most reactions give some of both.

## Common mistakes

:::mistake{title="Transition state versus intermediate"}
SN2 has a transition state (partial bonds, not isolable). SN1 has an intermediate (a real carbocation). Do not call the SN2 structure an intermediate.
:::

:::mistake{title="Wrong direction of attack"}
In SN2 the nucleophile attacks from the side opposite the halogen, not from the same side.
:::

:::mistake{title="Rate equation from the overall equation"}
Both mechanisms have the same overall equation; only the rate equation (from experiment) distinguishes them.
:::

:::mistake{title="Saying tertiary carbocations are stable because they are big"}
The reason is electronic: three alkyl groups donate electron density and disperse the positive charge.
:::

## Exam tips

:::exam-tip{title="Where it is tested"}
ZIMSEC Papers 2 and 3 and Cambridge Papers 2 and 4: *describe* the SN1 or SN2 mechanism (arrows, partial charges, transition state or intermediate), *explain* which halogenoalkane uses which, and *deduce* the mechanism from rate data.
:::

:::exam-tip{title="Describe SN2 for full marks"}
Mention: δ+ on carbon; arrow from the O lone pair to C; arrow from C–Br to Br; transition state with partial bonds and negative charge; Br⁻ leaving; inversion.
:::

:::exam-tip{title="Explain SN1 versus SN2"}
Two factors: carbocation stability (inductive effect) and steric hindrance. Name both for tertiary versus primary.
:::

## Summary

:::summary
- SN2: one step, backside attack, transition state, inversion; rate = k[RX][Nu⁻]; typical of primary halogenoalkanes.
- SN1: slow ionisation to a carbocation, then fast attack; rate = k[RX]; typical of tertiary halogenoalkanes; planar carbocation gives racemisation.
- Tertiary favours SN1 (stable carbocation, steric hindrance to backside attack); primary favours SN2; secondary uses both.
- Rate data reveal the mechanism: dependence on [OH⁻] means SN2.
- Aqueous hydroxide favours substitution; ethanolic hydroxide favours elimination.
:::
