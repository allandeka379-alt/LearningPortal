---
{
  "key": "electrochem.electrolysis-products",
  "title": "Electrolysis: predicting the products",
  "summary": "Predict the products of electrolysis of molten and aqueous electrolytes from the ions present, E⦵ values and concentration, explain the difference between inert and active electrodes, and write the half-equations at each electrode.",
  "concepts": ["achem.electrochem.electrolysis-products"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Electrolysis uses electrical energy to drive redox reactions that would not happen by themselves. It refines the copper and nickel produced in Zimbabwe, makes chlorine for water treatment and coats steel with zinc or chromium. In every case the key question is the same: **which species is oxidised at the anode and which is reduced at the cathode?** At A Level you answer it with electrode potentials and concentration, not only with a memorised list.

You should know the meaning of anode and cathode, the half-equations met at O Level, and how to use E⦵ values to compare oxidising and reducing agents.

## Key definitions

:::definition{term="Electrolysis"}
The decomposition of an electrolyte (a molten or dissolved ionic compound) by passing a direct current through it.
:::

:::definition{term="Cathode"}
The negative electrode, where reduction takes place (species gain electrons).
:::

:::definition{term="Anode"}
The positive electrode, where oxidation takes place (species lose electrons).
:::

:::definition{term="Inert electrode"}
An electrode, such as platinum or graphite (carbon), that conducts electrons but does not itself take part in the reaction.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC teaches this in Form 5 and names two experiments: electrolysis of acidified water and of copper(II) sulfate with carbon and with copper electrodes. For Cambridge it is A Level content (Paper 4), with the emphasis on E⦵ values and concentration.
:::

## Molten electrolytes

A molten ionic compound contains only its own two ions, so there is no choice:

- the metal ion is reduced at the cathode: $\ce{Pb^2+ + 2e- -> Pb}$;
- the non-metal ion is oxidised at the anode: $\ce{2Br- -> Br2 + 2e-}$.

Molten lead(II) bromide therefore gives lead and bromine. This must be done in a fume cupboard because bromine vapour is toxic.

## Aqueous electrolytes: two competitions

In water there are always $\ce{H+}$ and $\ce{OH-}$ ions (and water molecules) as well as the ions of the dissolved salt.

### At the cathode

The species with the **more positive** E⦵ is the better oxidising agent, so it is reduced first. Compare each metal ion with water:

$$
\ce{2H2O(l) + 2e- -> H2(g) + 2OH-(aq)} \qquad E^\ominus = -0.83 \text{ V}
$$

(in acid, $\ce{2H+ + 2e- -> H2}$, $E^\ominus = 0.00$ V).

| Metal ion in solution | E⦵ / V | Cathode product |
|---|---|---|
| $\ce{K+}$, $\ce{Na+}$, $\ce{Ca^2+}$, $\ce{Mg^2+}$, $\ce{Al^3+}$ | very negative (−1.66 or below) | hydrogen |
| $\ce{Zn^2+}$, $\ce{Fe^2+}$, $\ce{Ni^2+}$, $\ce{Pb^2+}$ | between about −0.8 and 0 | usually the metal at reasonable concentration (a mixture of metal and hydrogen is possible) |
| $\ce{Cu^2+}$, $\ce{Ag+}$ | positive | the metal |

### At the anode

The species that is most easily oxidised, the best reducing agent, with the **least positive** E⦵ for its reduction half-equation, is oxidised first:

| Anion | Relevant half-equation and E⦵ / V | Anode product (inert electrode) |
|---|---|---|
| $\ce{I-}$ | $\ce{I2 + 2e- <=> 2I-}$, +0.54 | iodine |
| $\ce{Br-}$ | $\ce{Br2 + 2e- <=> 2Br-}$, +1.07 | bromine |
| $\ce{Cl-}$ (concentrated) | $\ce{Cl2 + 2e- <=> 2Cl-}$, +1.36 | chlorine |
| $\ce{Cl-}$ (dilute), $\ce{SO4^2-}$, $\ce{NO3-}$ | water oxidised: $\ce{O2 + 4H+ + 4e- <=> 2H2O}$, +1.23 | oxygen |

Sulfate and nitrate ions are very hard to oxidise, so water is oxidised instead: $\ce{2H2O -> O2 + 4H+ + 4e-}$ (or, in alkali, $\ce{4OH- -> O2 + 2H2O + 4e-}$).

### Why concentration matters

The E⦵ values for chlorine (+1.36 V) and oxygen (+1.23 V) are close. In **concentrated** sodium chloride (brine), the high $[\ce{Cl-}]$ makes chloride oxidation easier, and oxygen formation also needs an extra voltage (an *overpotential*) at most electrodes, so chlorine is the main product. In **dilute** sodium chloride, water is oxidised and oxygen is the main product. Concentration changes electrode potentials (the Nernst equation, for Cambridge), and when two values are close the concentration decides.

:::example{title="Example 1: concentrated and dilute aqueous sodium chloride (inert electrodes)"}
| Electrolyte | Cathode | Anode | Left in solution |
|---|---|---|---|
| concentrated NaCl(aq) | $\ce{2H2O + 2e- -> H2 + 2OH-}$ | $\ce{2Cl- -> Cl2 + 2e-}$ | NaOH(aq): the solution becomes alkaline |
| dilute NaCl(aq) | $\ce{2H2O + 2e- -> H2 + 2OH-}$ | $\ce{2H2O -> O2 + 4H+ + 4e-}$ | NaCl(aq), becoming more concentrated as water is used up |

Sodium is never formed from an aqueous solution: $\ce{Na+}$ (E⦵ = −2.71 V) is far harder to reduce than water.
:::

## The ZIMSEC suggested experiments

:::example{title="Example 2: acidified water with inert electrodes"}
Water containing a little dilute sulfuric acid (to make it conduct) gives hydrogen at the cathode, $\ce{4H+ + 4e- -> 2H2}$, and oxygen at the anode, $\ce{2H2O -> O2 + 4H+ + 4e-}$. For every 4 electrons, 2 mol of $\ce{H2}$ and 1 mol of $\ce{O2}$ form, so the volume of hydrogen is twice that of oxygen. Overall, water is decomposed: $\ce{2H2O -> 2H2 + O2}$, and the amount of acid does not change.
:::

:::example{title="Example 3: copper(II) sulfate with carbon and with copper electrodes"}
| Electrodes | Cathode | Anode | Observations |
|---|---|---|---|
| carbon (inert) | $\ce{Cu^2+ + 2e- -> Cu}$ | $\ce{2H2O -> O2 + 4H+ + 4e-}$ | pink-brown copper coats the cathode; bubbles of oxygen at the anode; the blue colour fades and the solution becomes acidic |
| copper (active) | $\ce{Cu^2+ + 2e- -> Cu}$ | $\ce{Cu -> Cu^2+ + 2e-}$ | the cathode gains mass, the anode loses the same mass; the blue colour stays the same |

With copper electrodes, the copper anode is oxidised more easily than water ($E^\ominus$ for $\ce{Cu^2+/Cu}$ is +0.34 V, much less positive than +1.23 V), so copper atoms leave the anode as ions. This is the basis of copper refining and electroplating.
:::

## Common mistakes

:::mistake{title="Getting the electrodes the wrong way round"}
Cations move to the cathode (negative) and are reduced; anions move to the anode (positive) and are oxidised. Remember "reduction at the cathode", both consonants.
:::

:::mistake{title="Forming sodium or potassium from aqueous solution"}
Reactive metals are never deposited from aqueous solution: hydrogen forms instead.
:::

:::mistake{title="Forgetting that active anodes take part"}
A copper or nickel anode dissolves; no oxygen is produced. Only inert anodes give oxygen or halogens.
:::

:::mistake{title="Unbalanced half-equations"}
$\ce{2H2O -> O2 + 4H+ + 4e-}$ needs four electrons; check charge and atoms.
:::

## Exam tips

:::exam-tip{title="Which papers"}
ZIMSEC Papers 1-3 (products, half-equations, observations in the suggested experiments) and Paper 4 practical contexts. Cambridge Paper 4: predict products with reasons based on E⦵ and concentration.
:::

:::exam-tip{title="Command words"}
*Predict* the products: name each electrode product. *Explain*: compare E⦵ values (or position in the redox series) of the competing species and mention concentration where two values are close. *Write* half-equations with electrons on the correct side. *Describe* observations: colours, bubbles, mass changes.
:::

## Summary

:::summary
- Molten salts give their metal at the cathode and their non-metal at the anode.
- Cathode in water: the more positive E⦵ wins; reactive metal ions leave hydrogen to be formed.
- Anode in water: iodide, bromide and concentrated chloride give halogens; sulfate, nitrate and dilute chloride give oxygen.
- Close E⦵ values (Cl₂ and O₂) mean concentration decides.
- Active (copper) anodes dissolve instead of releasing oxygen.
:::
