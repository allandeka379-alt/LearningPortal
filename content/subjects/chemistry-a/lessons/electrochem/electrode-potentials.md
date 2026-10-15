---
{
  "key": "electrochem.electrode-potentials",
  "title": "Standard electrode potentials and cell potentials",
  "summary": "The standard hydrogen electrode, how standard electrode potentials are measured for metal, non-metal and ion-ion systems, calculating standard cell potentials, electrode polarity and electron flow, and using E⦵ values to predict whether redox reactions are feasible.",
  "concepts": ["achem.electrochem.electrode-potentials"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

A torch battery, the lead-acid battery in a commuter omnibus and the corrosion of a steel roof in Mutare's rainy season are all redox reactions in which electrons pass from one substance to another. If the oxidation and the reduction happen in separate containers joined by a wire, the electrons flow through the wire as a current, and the voltage tells us how strongly one half-reaction "pulls" electrons from the other. Measuring these voltages against a common reference gives a single table of **standard electrode potentials** that predicts which redox reactions can happen.

You need oxidation numbers, half-equations and the idea of a dynamic equilibrium before starting.

## Key definitions

:::definition{term="Standard electrode potential, E⦵"}
The potential difference (e.m.f.) of a cell made from the half-cell under standard conditions and a standard hydrogen electrode. Values are written for the reduction: $\ce{Cu^2+(aq) + 2e- <=> Cu(s)}$, $E^\ominus = +0.34$ V.
:::

:::definition{term="Standard conditions for electrode potentials"}
A temperature of 298 K, a pressure of 101 kPa for any gas, and a concentration of 1.00 mol dm⁻³ for every ion taking part in the half-equation.
:::

:::definition{term="Standard cell potential, E⦵cell"}
The potential difference between the two electrodes of a cell under standard conditions when no current flows: $E^\ominus_\mathrm{cell} = E^\ominus(\text{positive electrode}) - E^\ominus(\text{negative electrode})$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC teaches electrode potentials in Form 5 (including the relative oxidising power of the halogens); for Cambridge this is A Level content (Paper 4). ZIMSEC candidates are given the E⦵ values they need; Cambridge candidates use the Data section. How concentration changes E (the Nernst equation) is a separate Cambridge lesson.
:::

## The standard hydrogen electrode

A single electrode potential cannot be measured on its own, so every half-cell is compared with the **standard hydrogen electrode (SHE)**, which is given $E^\ominus = 0.00$ V:

- hydrogen gas at 101 kPa bubbled over a platinum electrode coated with platinum black (finely divided platinum, which catalyses the equilibrium);
- dipping into a solution with $[\ce{H+(aq)}] = 1.00$ mol dm⁻³, for example 1.00 mol dm⁻³ HCl;
- at 298 K. The half-equation is $\ce{2H+(aq) + 2e- <=> H2(g)}$.

![Measuring the standard electrode potential of copper: on the left the standard hydrogen electrode (platinum in 1.00 mol per dm³ H+ with hydrogen gas at 101 kPa bubbling over it) is connected through a high-resistance voltmeter and a salt bridge to a copper electrode in 1.00 mol per dm³ Cu2+; the voltmeter reads +0.34 V, the E standard of Cu2+/Cu.](media:diagrams/she-copper-cell.png "Figure: the standard hydrogen electrode (left) joined to a Cu²⁺/Cu half-cell; the reading is E⦵(Cu²⁺/Cu) = +0.34 V")

## Measuring standard electrode potentials

The half-cell under test is connected to the SHE by:

- a **wire** with a **high-resistance voltmeter**, so that almost no current flows and the concentrations do not change during the measurement;
- a **salt bridge**, a strip of filter paper soaked in saturated potassium nitrate solution (or KCl when no silver or lead ions are present), which completes the circuit by letting ions move between the solutions without the solutions mixing.

| Type of half-cell | Example | Electrode |
|---|---|---|
| metal / metal ion | $\ce{Cu^2+(aq) + 2e- <=> Cu(s)}$ | the metal itself in 1.00 mol dm⁻³ of its ions |
| non-metal / ion | $\ce{Cl2(g) + 2e- <=> 2Cl-(aq)}$ | platinum; chlorine at 101 kPa bubbled into 1.00 mol dm⁻³ Cl⁻ |
| two ions of one element | $\ce{Fe^3+(aq) + e- <=> Fe^2+(aq)}$ | platinum in a solution 1.00 mol dm⁻³ in **both** ions |

Platinum is used when no solid metal takes part, because it conducts electrons but is unreactive.

## The electrochemical series

Arranging half-equations in order of E⦵ gives the electrochemical (redox) series:

| Half-equation | E⦵ / V |
|---|---|
| $\ce{Mg^2+ + 2e- <=> Mg}$ | −2.38 |
| $\ce{Zn^2+ + 2e- <=> Zn}$ | −0.76 |
| $\ce{Fe^2+ + 2e- <=> Fe}$ | −0.44 |
| $\ce{2H+ + 2e- <=> H2}$ | 0.00 |
| $\ce{Cu^2+ + 2e- <=> Cu}$ | +0.34 |
| $\ce{I2 + 2e- <=> 2I-}$ | +0.54 |
| $\ce{Fe^3+ + e- <=> Fe^2+}$ | +0.77 |
| $\ce{Ag+ + e- <=> Ag}$ | +0.80 |
| $\ce{Br2 + 2e- <=> 2Br-}$ | +1.07 |
| $\ce{Cl2 + 2e- <=> 2Cl-}$ | +1.36 |
| $\ce{F2 + 2e- <=> 2F-}$ | +2.87 |

- The **more positive** E⦵, the more readily the species on the left gains electrons: it is a **stronger oxidising agent**. Fluorine is the strongest here.
- The **more negative** E⦵, the more readily the species on the right loses electrons: it is a **stronger reducing agent**. Magnesium is the strongest here.
- The halogens' E⦵ values fall from $\ce{F2}$ to $\ce{I2}$, so their oxidising power falls down Group 17 (Group VII). Chlorine oxidises bromide and iodide; bromine oxidises iodide only.

## Cell potentials, polarity and electron flow

In any cell the half-cell with the **more positive** E⦵ is the **positive electrode**, where reduction happens. The other is negative, where oxidation happens. Electrons flow through the external wire from the negative electrode to the positive electrode.

![Zinc-copper cell with a high-resistance voltmeter reading 1.10 V: a zinc electrode in 1.00 mol per dm³ zinc ions is the negative electrode where zinc is oxidised, a copper electrode in 1.00 mol per dm³ copper ions is the positive electrode where copper ions are reduced, a salt bridge joins the beakers and electrons flow through the wire from zinc to copper.](media:diagrams/zinc-copper-cell.png "Figure: the zinc-copper cell; electrons flow from the negative zinc electrode to the positive copper electrode")

:::worked-solution[Example 1: the zinc-copper cell]
Data: $E^\ominus(\ce{Zn^2+/Zn}) = -0.76$ V; $E^\ominus(\ce{Cu^2+/Cu}) = +0.34$ V.

1. Copper's value is more positive, so the copper electrode is positive: $\ce{Cu^2+ + 2e- -> Cu}$.
2. Zinc is the negative electrode: $\ce{Zn -> Zn^2+ + 2e-}$.
3. $E^\ominus_\mathrm{cell} = +0.34 - (-0.76) = +1.10$ V.
4. Electrons flow through the wire from zinc to copper. Overall: $\ce{Zn + Cu^2+ -> Zn^2+ + Cu}$.
:::

:::worked-solution[Example 2: magnesium and silver]
Data: $E^\ominus(\ce{Mg^2+/Mg}) = -2.38$ V; $E^\ominus(\ce{Ag+/Ag}) = +0.80$ V.

1. Silver is the positive electrode; magnesium the negative.
2. $E^\ominus_\mathrm{cell} = 0.80 - (-2.38) = +3.18$ V.
3. Balance electrons: $\ce{Mg + 2Ag+ -> Mg^2+ + 2Ag}$. The E⦵ value of silver is **not** doubled: electrode potentials do not depend on how many times a half-equation is written.
:::

## Predicting feasibility

A redox reaction is feasible under standard conditions if $E^\ominus_\mathrm{cell}$ is positive when calculated as $E^\ominus(\text{species reduced}) - E^\ominus(\text{species oxidised})$.

:::worked-solution[Example 3: will iron(III) ions oxidise iodide and bromide?]
1. $\ce{2Fe^3+ + 2I- -> 2Fe^2+ + I2}$: $E^\ominus_\mathrm{cell} = 0.77 - 0.54 = +0.23$ V. Positive, so feasible: iron(III) oxidises iodide.
2. $\ce{2Fe^3+ + 2Br- -> 2Fe^2+ + Br2}$: $E^\ominus_\mathrm{cell} = 0.77 - 1.07 = -0.30$ V. Negative, so not feasible. The reverse reaction, bromine oxidising iron(II), is feasible.
:::

A quick check: the oxidising agent (left side) of the more positive couple reacts with the reducing agent (right side) of the less positive couple, an "anticlockwise" pattern when the series is written with the most negative at the top.

### Limits of the predictions

1. **Rate.** A feasible reaction may be too slow to observe if its activation energy is high.
2. **Non-standard conditions.** Different concentrations, temperatures or pressures change electrode potentials; a small $E^\ominus_\mathrm{cell}$ (less than about 0.3 V) can change sign under real conditions.
3. **Other products.** The actual products may differ from those assumed (for example a different oxidation state forms).

## Common mistakes

:::mistake{title="Multiplying E⦵ by the coefficients"}
E⦵ values are not multiplied when a half-equation is doubled to balance electrons.
:::

:::mistake{title="Subtracting the wrong way round"}
Always take E⦵(positive or reduced) − E⦵(negative or oxidised). A negative answer means the reaction as written is not feasible.
:::

:::mistake{title="Electrons in the salt bridge"}
Ions move through the salt bridge; electrons move only through the external wire.
:::

:::mistake{title="Forgetting a platinum electrode"}
For $\ce{Fe^3+/Fe^2+}$, $\ce{Cl2/Cl-}$ or $\ce{MnO4-/Mn^2+}$ there is no metal in the half-equation, so an inert platinum electrode is required.
:::

## Exam tips

:::exam-tip{title="Which papers"}
ZIMSEC Papers 1-3 (definitions, cell diagrams, feasibility, halogen oxidising power). Cambridge Paper 4 (A Level): describe the SHE and the measurement of E⦵, calculate E⦵cell, predict feasibility and explain its limits.
:::

:::exam-tip{title="Command words"}
*Describe* the SHE: H₂ at 101 kPa, 1.00 mol dm⁻³ H⁺, 298 K, platinum (black) electrode. *Calculate* E⦵cell: positive minus negative, with the sign. *Predict* with a reason: quote the E⦵cell value and its sign. *Explain* why a feasible reaction is not seen: rate (high activation energy) or non-standard conditions.
:::

## Summary

:::summary
- E⦵ is measured against the SHE (0.00 V) at 298 K, 101 kPa, 1.00 mol dm⁻³, with a salt bridge and a high-resistance voltmeter.
- Use platinum when no metal takes part in the half-equation.
- More positive E⦵: stronger oxidising agent; more negative: stronger reducing agent.
- E⦵cell = E⦵(positive) − E⦵(negative); electrons flow from negative to positive through the wire.
- Positive E⦵cell means feasible under standard conditions, but not necessarily fast.
:::
