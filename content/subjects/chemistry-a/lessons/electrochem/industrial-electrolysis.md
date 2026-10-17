---
{
  "key": "electrochem.industrial-electrolysis",
  "title": "Industrial electrolysis: aluminium, chlorine and metal refining",
  "summary": "How electrolysis is used in industry: extracting aluminium from alumina in molten cryolite, making chlorine, hydrogen and sodium hydroxide from brine in a membrane cell, refining copper and nickel, and producing hydrogen and oxygen, with the electrode equations and the economic and environmental issues.",
  "concepts": ["achem.electrochem.industrial-electrolysis"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Electrolysis is expensive: it needs a large, steady supply of electricity. Industry uses it only where nothing cheaper works, for example to extract very reactive metals, to make chlorine and sodium hydroxide, and to purify metals to the very high purity needed for electrical wiring. Zimbabwe mines copper and nickel, and nickel-copper ores on the Great Dyke also carry platinum group metals; electrolytic refining is the step that turns impure metal into a saleable product and concentrates the precious metals in the residue.

This lesson applies the rules for predicting electrolysis products from the previous lesson. You should be able to write electrode half-equations.

## Key definitions

:::definition{term="Electrolytic refining"}
Purifying a metal by making the impure metal the anode and a thin sheet of pure metal the cathode in a solution of the metal's ions: the metal dissolves from the anode and is deposited, pure, on the cathode.
:::

:::definition{term="Anode sludge (anode slime)"}
The insoluble residue that collects below the anode during refining; it contains unreactive metals such as silver, gold and platinum group metals.
:::

:::definition{term="Membrane cell"}
An electrolysis cell for brine in which the anode and cathode compartments are separated by an ion-exchange membrane that lets sodium ions (and water) pass but not chloride or hydroxide ions.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Industrial electrolysis is ZIMSEC content (Form 5). Cambridge students meet the underlying rules in the electrolysis lesson but are not examined on these processes.
:::

## Extracting aluminium

Aluminium is too reactive to be extracted by heating its oxide with carbon, so it is made by electrolysis of purified bauxite, **aluminium oxide (alumina)**.

| Feature | Detail and reason |
|---|---|
| electrolyte | alumina dissolved in molten **cryolite**, $\ce{Na3AlF6}$; this lowers the operating temperature from over 2000 °C (the melting point of alumina) to about 950 °C, saving energy, and improves conductivity |
| cathode | carbon (graphite) lining of the steel cell; molten aluminium collects on the bottom and is tapped off |
| anode | carbon blocks dipping into the melt |
| cathode reaction | $\ce{Al^3+ + 3e- -> Al}$ |
| anode reaction | $\ce{2O^2- -> O2 + 4e-}$; at this temperature the oxygen reacts with the carbon anode: $\ce{C + O2 -> CO2}$ |
| overall | $\ce{2Al2O3 -> 4Al + 3O2}$ |

![Electrolysis cell for aluminium: carbon anodes dip into alumina dissolved in molten cryolite at about 950 degrees C inside a carbon-lined steel cell that is the cathode; Al3+ ions are reduced to molten aluminium which collects at the bottom and is tapped off, while oxygen formed at the anodes burns the carbon to CO2, so the anodes are replaced.](media:diagrams/aluminium-electrolysis-cell.png "Figure: the aluminium extraction cell (alumina in molten cryolite, carbon electrodes)")

Because the anodes burn away, they must be **replaced regularly**. The process uses a very large amount of electricity, both to keep the electrolyte molten and to drive the electrolysis, so aluminium smelters are usually built where electricity is cheap, often from hydroelectric power. Recycling aluminium uses only a small fraction of the energy needed to extract it.

:::example{title="Example 1: why aluminium is not made from aqueous solution"}
In water, $\ce{Al^3+}$ ($E^\ominus = -1.66$ V) is far harder to reduce than water itself, so hydrogen would be produced at the cathode instead of aluminium. The electrolyte must contain no water, so a molten electrolyte is used.
:::

## Chlorine, hydrogen and sodium hydroxide from brine

Concentrated sodium chloride solution (brine) is electrolysed in a **membrane cell**.

![Membrane cell for brine: concentrated sodium chloride enters the anode compartment where chloride ions form chlorine (2Cl- to Cl2 + 2e-); water enters the cathode compartment where hydrogen and hydroxide ions form; sodium ions pass through the ion-exchange membrane to the cathode side to give sodium hydroxide solution, and the membrane keeps chlorine, hydrogen and sodium hydroxide apart.](media:diagrams/membrane-cell-brine.png "Figure: membrane cell producing chlorine, hydrogen and sodium hydroxide from brine")

| Electrode | Material | Half-equation |
|---|---|---|
| anode (+) | titanium (coated) | $\ce{2Cl-(aq) -> Cl2(g) + 2e-}$ |
| cathode (−) | nickel or steel | $\ce{2H2O(l) + 2e- -> H2(g) + 2OH-(aq)}$ |

Sodium ions pass through the membrane from the anode side to the cathode side, where they join the hydroxide ions to give sodium hydroxide solution. The membrane keeps chlorine away from hydrogen (an explosive mixture) and from sodium hydroxide (with which it would react to form chlorate(I)), so the products are kept pure.

| Product | Main uses |
|---|---|
| chlorine | water treatment, PVC, bleach, solvents, hydrochloric acid |
| sodium hydroxide | soap and detergents, paper, purifying bauxite, textiles |
| hydrogen | ammonia manufacture, hardening vegetable oils (margarine), fuel |

Older plants used mercury cathodes, which released toxic mercury; membrane cells avoid this and use less energy.

## Refining copper and nickel

![Copper refining cell: a thick impure copper anode and a thin pure copper cathode in acidified copper(II) sulfate; copper dissolves from the anode as Cu2+ and is deposited as pure copper on the cathode, so the anode loses mass and the cathode gains mass, while unreactive silver, gold and platinum fall below the anode as anode sludge.](media:diagrams/copper-refining-cell.png "Figure: electrolytic refining of copper")

:::example{title="Example 2: purifying copper"}
- **Anode:** impure copper; **cathode:** a thin sheet of pure copper; **electrolyte:** copper(II) sulfate acidified with sulfuric acid.
- Anode: $\ce{Cu -> Cu^2+ + 2e-}$. More reactive impurities such as zinc, iron and nickel also dissolve as ions but stay in solution.
- Cathode: $\ce{Cu^2+ + 2e- -> Cu}$. Only copper is deposited, because $\ce{Cu^2+}$ is the most easily reduced ion present.
- Silver, gold and platinum are less reactive than copper; they do not dissolve and fall as anode sludge, which is processed to recover them.
- The cathode gains mass and the anode loses mass; the concentration of $\ce{Cu^2+}$ stays roughly constant.
:::

Nickel is refined in the same way: impure nickel anodes, pure nickel cathodes and a nickel(II) sulfate electrolyte, with $\ce{Ni -> Ni^2+ + 2e-}$ at the anode and $\ce{Ni^2+ + 2e- -> Ni}$ at the cathode. Precious metals, including platinum group metals, collect in the anode sludge.

## Hydrogen and oxygen from water

Water containing an electrolyte such as potassium hydroxide is electrolysed with nickel electrodes:

- cathode: $\ce{4H2O + 4e- -> 2H2 + 4OH-}$;
- anode: $\ce{4OH- -> O2 + 2H2O + 4e-}$;
- overall: $\ce{2H2O -> 2H2 + O2}$, giving very pure hydrogen.

It is costly compared with making hydrogen from natural gas, but if the electricity comes from renewable sources such as hydroelectric or solar power, the hydrogen is made without releasing carbon dioxide.

## Economic and environmental considerations

- **Energy:** electricity is the major cost; plants are sited near cheap, reliable power.
- **Carbon dioxide:** carbon anodes in aluminium smelting are oxidised to $\ce{CO2}$; fossil-fuel electricity adds more.
- **Hazardous products:** chlorine is toxic; fluoride emissions from aluminium cells must be controlled.
- **By-products:** anode sludge from refining is valuable; selling hydrogen and sodium hydroxide helps pay for chlorine production.
- **Recycling** aluminium and copper saves energy and ore.

## Common mistakes

:::mistake{title="Saying cryolite is an ore of aluminium"}
Cryolite is a solvent that lowers the melting temperature; the aluminium comes from the alumina.
:::

:::mistake{title="Putting the pure metal at the anode in refining"}
The impure metal is the anode (it dissolves); the pure metal is the cathode (it grows).
:::

:::mistake{title="Sodium at the cathode of the membrane cell"}
Water is reduced to hydrogen; sodium ions only move through the membrane.
:::

:::mistake{title="Forgetting why the anodes are replaced"}
The oxygen released at the hot carbon anode burns it to carbon dioxide.
:::

## Exam tips

:::exam-tip{title="Which papers"}
ZIMSEC Papers 1 and 2 (electrode equations, reasons for conditions) and Paper 3 Section A or D (describing and evaluating an industrial process). Not examined by Cambridge.
:::

:::exam-tip{title="Command words"}
*Describe* a process: electrolyte, electrodes, half-equations and products. *Explain* a condition: give its purpose (cryolite lowers the temperature; the membrane separates the products). *Discuss* economic and environmental factors: energy cost, siting, CO₂, toxic products, recycling, value of by-products.
:::

## Summary

:::summary
- Aluminium: alumina in molten cryolite at about 950 °C; Al³⁺ + 3e⁻ → Al; carbon anodes burn away to CO₂.
- Brine in a membrane cell gives Cl₂ (anode), H₂ and NaOH (cathode side); the membrane keeps them apart.
- Refining: impure anode dissolves, pure metal deposits on the cathode, precious metals collect in the anode sludge.
- Electrolysis of water gives very pure hydrogen and oxygen in a 2 : 1 ratio.
- Electricity cost, carbon dioxide, toxic products and recycling are the key economic and environmental issues.
:::
