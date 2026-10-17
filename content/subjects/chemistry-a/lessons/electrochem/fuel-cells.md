---
{
  "key": "electrochem.fuel-cells",
  "title": "Fuel cells",
  "summary": "How a hydrogen-oxygen fuel cell works with acidic and alkaline electrolytes, deducing electrode reactions for other fuel cells such as the methanol cell, and comparing fuel cells with conventional cells and combustion engines.",
  "concepts": ["achem.electrochem.fuel-cells"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

A fuel cell is an electrochemical cell that keeps working as long as fuel and oxygen are fed into it. Unlike a torch battery, it never "runs flat", and unlike a petrol engine it turns chemical energy directly into electrical energy without burning the fuel. Fuel cells power some buses and cars, backup generators for telecommunications towers and spacecraft. Most fuel cells need a platinum catalyst on their electrodes, which links this technology to the platinum group metals mined on Zimbabwe's Great Dyke.

You should be able to write electrode half-equations, calculate a standard cell potential from E⦵ values, and know the difference between oxidation at the anode and reduction at the cathode.

## Key definitions

:::definition{term="Fuel cell"}
An electrochemical cell in which a fuel (such as hydrogen or methanol) and an oxidant (usually oxygen from the air) are supplied continuously to the electrodes and react to produce electrical energy directly.
:::

:::definition{term="Electrolyte (in a fuel cell)"}
The ion-conducting material between the electrodes: an acid, a polymer membrane that conducts H⁺ ions, or an alkali such as potassium hydroxide solution that conducts OH⁻ ions.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Fuel cells are ZIMSEC content (Form 6). The Cambridge syllabus does not examine them, although Cambridge students meet the electrode potentials they depend on.
:::

## The hydrogen-oxygen fuel cell

Hydrogen is supplied to one electrode and oxygen (or air) to the other. The electrodes are porous and coated with a catalyst, usually platinum, which speeds up the electrode reactions.

### Acidic electrolyte (proton-exchange membrane)

| Electrode | Half-equation | Process |
|---|---|---|
| negative electrode (anode), hydrogen supplied | $\ce{H2 -> 2H+ + 2e-}$ | oxidation |
| positive electrode (cathode), oxygen supplied | $\ce{O2 + 4H+ + 4e- -> 2H2O}$ | reduction |

![Hydrogen-oxygen fuel cell with an acidic electrolyte: hydrogen is oxidised at the negative porous platinum-catalysed anode (H2 to 2H+ + 2e-), H+ ions pass through the electrolyte to the positive cathode where oxygen is reduced to water (O2 + 4H+ + 4e- to 2H2O), and electrons travel through the external circuit; the cell potential is 1.23 V.](media:diagrams/hydrogen-fuel-cell.png "Figure: hydrogen-oxygen fuel cell with an acid electrolyte (E°cell = 1.23 V)")

The $\ce{H+}$ ions move through the electrolyte from the anode to the cathode, while the electrons travel through the external circuit, doing useful work.

### Alkaline electrolyte (potassium hydroxide)

| Electrode | Half-equation | Process |
|---|---|---|
| negative electrode (anode) | $\ce{H2 + 2OH- -> 2H2O + 2e-}$ | oxidation |
| positive electrode (cathode) | $\ce{O2 + 2H2O + 4e- -> 4OH-}$ | reduction |

Here $\ce{OH-}$ ions move through the electrolyte from the cathode to the anode.

### The overall reaction

In both cases, doubling the hydrogen half-equation so that four electrons cancel and adding gives:

$$
\ce{2H2(g) + O2(g) -> 2H2O(l)}
$$

The electrolyte ions cancel out, so the overall reaction is the same whichever electrolyte is used.

:::worked-solution[Example 1: the cell potential of a hydrogen-oxygen fuel cell]
Data: $\ce{O2 + 4H+ + 4e- <=> 2H2O}$, E⦵ = +1.23 V; $\ce{2H+ + 2e- <=> H2}$, E⦵ = 0.00 V.

1. Oxygen has the more positive E⦵, so the oxygen electrode is positive.
2. $E^\ominus_\mathrm{cell} = 1.23 - 0.00 = 1.23$ V.
3. In practice a single cell gives less than this when current flows, so cells are stacked in series to give a useful voltage.
:::

## Deducing electrode reactions for other fuel cells

Any fuel that can be oxidised can, in principle, be used. The method is:

1. Write the **overall** equation (the same as for combustion).
2. Write the **cathode** half-equation for oxygen in the electrolyte given (acid: $\ce{O2 + 4H+ + 4e- -> 2H2O}$; alkali: $\ce{O2 + 2H2O + 4e- -> 4OH-}$).
3. Scale it to the amount of oxygen in the overall equation and **subtract** it from the overall equation to obtain the anode half-equation; tidy up by cancelling species on both sides.

:::worked-solution[Example 2: the direct methanol fuel cell (acidic electrolyte)]
1. Overall: $\ce{CH3OH + 3/2O2 -> CO2 + 2H2O}$.
2. Cathode, scaled for $\ce{3/2O2}$: $\ce{3/2O2 + 6H+ + 6e- -> 3H2O}$.
3. Subtract the cathode equation from the overall equation: the oxygen cancels; 6H⁺ and 6e⁻ move to the right-hand side; and taking three H₂O away from the two H₂O on the right leaves one H₂O short, so one H₂O appears on the left as a reactant:
$$
\ce{CH3OH + H2O -> CO2 + 6H+ + 6e-}
$$
4. Check: carbon changes from −2 in methanol to +4 in carbon dioxide, a loss of 6 electrons. Charge: 0 on the left, 0 on the right ($+6 - 6$).
:::

Methanol is a liquid at room temperature, so it is easier to store and transport than hydrogen gas, but the cell releases carbon dioxide.

## Comparing fuel cells with other energy sources

| Feature | Hydrogen fuel cell | Petrol or diesel engine | Conventional (non-rechargeable) cell |
|---|---|---|---|
| energy conversion | chemical → electrical directly; not limited like a heat engine, so more efficient | chemical → heat → motion; much energy wasted as heat | chemical → electrical |
| products | water only | CO₂, CO, NOₓ, unburnt hydrocarbons | spent cell must be disposed of (some contain toxic metals) |
| running time | as long as fuel is supplied | as long as fuel is supplied | until reactants are used up |
| noise and maintenance | silent, few moving parts | noisy, many moving parts | silent |

### Limitations

- **Storage of hydrogen.** Hydrogen has a very low density; it must be stored under high pressure, as a liquid at very low temperature, or absorbed in metals, and it is highly flammable.
- **Source of hydrogen.** Most hydrogen is made from natural gas or coal, which releases carbon dioxide. Hydrogen is only a "clean" fuel if it is made by electrolysis using renewable electricity.
- **Cost.** Platinum catalysts and membranes are expensive; there are few hydrogen filling stations.
- **Lifetime.** Membranes and catalysts degrade, and catalysts can be poisoned by impurities such as carbon monoxide.

## Common mistakes

:::mistake{title="Saying fuel cells burn hydrogen"}
The hydrogen is oxidised electrochemically at the anode; there is no flame.
:::

:::mistake{title="Writing H⁺ in an alkaline cell"}
In an alkaline electrolyte, balance with $\ce{OH-}$ and $\ce{H2O}$, not $\ce{H+}$.
:::

:::mistake{title="Claiming fuel cells produce no pollution at all"}
The cell itself makes only water, but making, compressing and transporting the hydrogen can release carbon dioxide.
:::

:::mistake{title="Electrons through the electrolyte"}
Ions move through the electrolyte; electrons move through the external circuit.
:::

## Exam tips

:::exam-tip{title="Which papers"}
ZIMSEC Papers 1-3 (electrode equations, deducing half-equations for a given fuel, advantages and disadvantages) and Paper 3 Section A or D extended answers. Not examined by Cambridge.
:::

:::exam-tip{title="Command words"}
*Write* electrode equations: match them to the electrolyte. *Deduce* the anode reaction for a new fuel: overall minus cathode. *Compare* or *discuss*: give balanced points on efficiency, products, storage, cost and the source of hydrogen.
:::

## Summary

:::summary
- A fuel cell converts the chemical energy of a continuously supplied fuel directly into electrical energy.
- Acidic: H₂ → 2H⁺ + 2e⁻ and O₂ + 4H⁺ + 4e⁻ → 2H₂O. Alkaline: H₂ + 2OH⁻ → 2H₂O + 2e⁻ and O₂ + 2H₂O + 4e⁻ → 4OH⁻.
- Overall 2H₂ + O₂ → 2H₂O; E⦵cell = 1.23 V.
- Other fuels: anode equation = overall equation − cathode equation.
- More efficient and cleaner at the point of use than engines, but hydrogen storage, production and catalyst cost are problems.
:::
