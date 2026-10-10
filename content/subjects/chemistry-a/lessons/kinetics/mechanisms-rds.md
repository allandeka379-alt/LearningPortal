---
{
  "key": "kinetics.mechanisms-rds",
  "title": "Reaction mechanisms and the rate-determining step",
  "summary": "Multi-step mechanisms, intermediates and catalysts within a mechanism, the rate-determining step, deducing a rate equation from a mechanism, and suggesting a mechanism consistent with a rate equation, including halogenoalkane hydrolysis and the iodination of propanone.",
  "concepts": ["achem.kinetics.mechanisms-rds"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

A queue at a Harare bank moves only as fast as the slowest teller, no matter how quickly people walk in through the door. Chemical reactions that happen in several steps behave the same way: the overall rate is controlled by the **slowest step**. That is why the rate equation, which is found by experiment, is such a powerful clue. It tells you which particles are involved in the slow step, and so it lets chemists test proposed mechanisms.

In this lesson you will meet intermediates and the rate-determining step, deduce rate equations from given mechanisms, and work backwards from a rate equation to a mechanism that fits. You need to be confident with rate equations, orders and the initial-rates method. The organic mechanisms named here (SN1, SN2) are described fully in the halogenoalkane lessons; here they are used as kinetics examples.

## Key definitions

:::definition{term="Reaction mechanism"}
The sequence of simple steps by which a reaction takes place. Adding the steps gives the overall equation.
:::

:::definition{term="Rate-determining step"}
The slowest step in a reaction mechanism. It controls the overall rate of reaction.
:::

:::definition{term="Intermediate"}
A species formed in one step of a mechanism and used up in a later step. It does not appear in the overall equation.
:::

:::definition{term="Catalyst (in a mechanism)"}
A species used up in one step and regenerated in a later step, so it appears on both sides when the steps are added and cancels from the overall equation. It can appear in the rate equation.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: the rate-determining step, deducing a rate equation from a mechanism and suggesting a mechanism from a rate equation (ZIMSEC Form 5; Cambridge A Level, Paper 4). Cambridge also asks you to identify intermediates and catalysts in a given mechanism.
:::

## How the slow step sets the rate equation

The rule: **the rate equation includes the species that take part in the rate-determining step** (and in any fast steps before it that produce its reactants). Species that react only **after** the slow step do not appear in the rate equation, so they are **zero order**. The number of particles of a species in the slow step usually gives its order.

:::example{title="Example 1: from a mechanism to a rate equation"}
$\ce{2NO2(g) + F2(g) -> 2NO2F(g)}$ has the proposed mechanism:

| Step | Equation | Speed |
|---|---|---|
| 1 | $\ce{NO2 + F2 -> NO2F + F}$ | slow |
| 2 | $\ce{NO2 + F -> NO2F}$ | fast |

1. Adding the steps gives the overall equation; the fluorine atom, F, is formed in step 1 and used in step 2, so it is an **intermediate**.
2. The slow step involves one $\ce{NO2}$ and one $\ce{F2}$.
3. Predicted rate equation: rate = $k[\ce{NO2}][\ce{F2}]$: first order in each, even though the equation contains $2\ce{NO2}$. This matches experiment, so the mechanism is consistent.
:::

## Working backwards: suggesting a mechanism

A suggested mechanism must (1) add up to the overall equation, and (2) have a slow step whose reactants match the rate equation.

| Reaction | Rate equation (experimental) | Consistent mechanism |
|---|---|---|
| $\ce{NO2 + CO -> NO + CO2}$ (below about 500 K) | $k[\ce{NO2}]^2$ | slow: $\ce{2NO2 -> NO3 + NO}$; fast: $\ce{NO3 + CO -> NO2 + CO2}$ |
| $\ce{CH3CH2CH2Br + OH- -> CH3CH2CH2OH + Br-}$ | $k[\ce{C3H7Br}][\ce{OH-}]$ | one step (SN2): $\ce{OH-}$ attacks as $\ce{Br-}$ leaves |
| $\ce{(CH3)3CBr + OH- -> (CH3)3COH + Br-}$ | $k[\ce{(CH3)3CBr}]$ | slow: $\ce{(CH3)3CBr -> (CH3)3C+ + Br-}$; fast: $\ce{(CH3)3C+ + OH- -> (CH3)3COH}$ (SN1) |
| $\ce{2H2O2 -> 2H2O + O2}$ (catalysed by $\ce{I-}$) | $k[\ce{H2O2}][\ce{I-}]$ | slow: $\ce{H2O2 + I- -> H2O + IO-}$; fast: $\ce{H2O2 + IO- -> H2O + O2 + I-}$ |

In the first row CO does not appear in the rate equation: it reacts only after the slow step. In the halogenoalkane rows, a primary halogenoalkane reacts in one step involving both reactants (second order overall), while a tertiary one first ionises slowly on its own, so the rate does not depend on $[\ce{OH-}]$. In the last row $\ce{IO-}$ is an intermediate and $\ce{I-}$ is a catalyst: it is used in step 1, regenerated in step 2, and appears in the rate equation.

## The iodination of propanone

In acid solution propanone reacts with iodine:

$$
\ce{CH3COCH3(aq) + I2(aq) ->[H+] CH3COCH2I(aq) + H+(aq) + I-(aq)}
$$

:::worked-solution[Example 2: data that reveal the slow step]
Initial rates at 25 °C:

| Exp. | [CH₃COCH₃] / mol dm⁻³ | [H⁺] / mol dm⁻³ | [I₂] / mol dm⁻³ | Initial rate / mol dm⁻³ s⁻¹ |
|---|---|---|---|---|
| 1 | 0.40 | 0.20 | 0.0020 | 2.24 × 10⁻⁶ |
| 2 | 0.80 | 0.20 | 0.0020 | 4.48 × 10⁻⁶ |
| 3 | 0.40 | 0.40 | 0.0020 | 4.48 × 10⁻⁶ |
| 4 | 0.40 | 0.20 | 0.0040 | 2.24 × 10⁻⁶ |

1. Experiments 1 and 2: [propanone] × 2, rate × 2: first order in propanone.
2. Experiments 1 and 3: [H⁺] × 2, rate × 2: first order in H⁺.
3. Experiments 1 and 4: [I₂] × 2, rate unchanged: **zero order** in iodine.
4. Rate = $k[\ce{CH3COCH3}][\ce{H+}]$; $k = \dfrac{2.24 \times 10^{-6}}{0.40 \times 0.20} = 2.8 \times 10^{-5}$ dm³ mol⁻¹ s⁻¹.
5. Interpretation: the rate-determining step involves propanone and H⁺ (one of each); iodine reacts only in a later, fast step. $\ce{H+}$ is a catalyst: it appears in the rate equation but is regenerated, so it is not used up overall.
:::

A useful consequence: because the reaction is zero order in iodine, the iodine colour fades at a **constant rate**, so a graph of [I₂] against time is a straight line.

## Recognising intermediates and catalysts

When you add the steps of a mechanism:

- a species produced in one step and used up in a later one cancels: it is an **intermediate** (F atoms, $\ce{NO3}$, $\ce{IO-}$, carbocations);
- a species used up in one step and produced again later also cancels: it is a **catalyst** ($\ce{I-}$ above, $\ce{H+}$ in the iodination).

## Common mistakes

:::mistake{title="Using the overall equation for orders"}
The overall equation shows stoichiometry; the slow step shows the orders.
:::

:::mistake{title="Including species after the slow step"}
Reactants that join only in fast steps after the rate-determining step are zero order and do not appear in the rate equation.
:::

:::mistake{title="Mixing up intermediates and catalysts"}
An intermediate is made then used; a catalyst is used then remade.
:::

:::mistake{title="A mechanism that does not add up"}
Always check that the steps add to the overall equation, with intermediates and catalysts cancelling.
:::

## Exam tips

:::exam-tip{title="Which papers"}
ZIMSEC Papers 1-3 (Section A); Cambridge Paper 4. A typical question gives initial-rates data, asks for the rate equation, then asks you to suggest a two-step mechanism or to choose which of several mechanisms is consistent.
:::

:::exam-tip{title="Command words"}
*Suggest* a mechanism: write two (or more) balanced steps, label the slow step, and check that the slow step's reactants match the rate equation and that the steps add up. *Identify* an intermediate or catalyst: say in which step it is formed and in which it is used. *Explain* why a reactant is zero order: it is not involved in (or before) the rate-determining step.
:::

## Summary

:::summary
- The rate-determining step is the slowest step; it controls the overall rate.
- The rate equation contains the species in the slow step (and those in earlier fast steps that form its reactants).
- Species that react only after the slow step are zero order.
- Intermediates are formed then used; catalysts are used then regenerated (and may appear in the rate equation).
- Examples: SN2 (rate = k[RX][OH⁻]), SN1 (rate = k[RX]), iodination of propanone (rate = k[propanone][H⁺]).
:::
