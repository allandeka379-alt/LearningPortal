---
{
  "key": "electrochemistry.cells-and-batteries",
  "title": "Simple cells and the lead-acid battery",
  "summary": "Build a simple cell from two different metals and an electrolyte, explain the reactions at its electrodes and why the voltage depends on how far apart the metals are in the reactivity series, and describe the composition, charging and safe maintenance of a lead-acid battery.",
  "concepts": ["chem.electrochemistry.cells-and-batteries"],
  "objectives": ["zimsec/o-level/chemistry:7.1.8.3", "zimsec/o-level/chemistry:7.1.8.4", "zimsec/o-level/chemistry:7.1.8.5"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

When the power goes off in the evening, many homes in Zimbabwe switch to lights run from a battery that was charged by a solar panel during the day. Kombis, tractors and cars all start their engines with a 12-volt **lead-acid battery**. Even a few lemons joined in series, each with two different metals pushed into it, can light a small LED. All of these are **cells**: they turn the energy stored in chemicals into electrical energy.

In this lesson you will build a simple cell, explain where its electrons come from and why some pairs of metals give a bigger voltage than others. You will then look inside a car battery and learn how to charge and look after it safely.

You should already know the reactivity series of metals and how to write half-equations for oxidation and reduction.

## Key definitions

:::definition{term="Simple cell"}
Two different metals (the **electrodes**) dipping into an **electrolyte** and joined by a wire. A chemical reaction in the cell pushes electrons round the circuit, so chemical energy is changed into electrical energy.
:::

:::definition{term="Electrolyte (in a cell)"}
A solution or paste that contains ions and conducts electricity, for example dilute sulfuric acid, salt solution or lemon juice.
:::

:::definition{term="Battery"}
Two or more cells joined together. A 12-volt car battery is six cells of about 2 volts each, joined in series.
:::

:::definition{term="Voltage"}
A measure of how strongly the cell pushes electrons round the circuit, measured in volts (V) with a voltmeter.
:::

## Building a zinc–copper cell

**Apparatus (in words).** Clean a strip of zinc and a strip of copper with sandpaper. Stand them in a beaker of dilute sulfuric acid so that they do not touch. Join them with wires to a voltmeter (or to a small bulb or LED).

**What happens.**

- Zinc is more reactive than copper, so zinc atoms give up electrons more readily. Zinc slowly dissolves as zinc ions: $\ce{Zn -> Zn^2+ + 2e-}$. This is **oxidation**, and it makes zinc the **negative electrode**.
- The electrons flow through the wire, from zinc to copper. Copper is the **positive electrode**.
- At the copper surface, hydrogen ions from the acid take the electrons: $\ce{2H+ + 2e- -> H2}$. This is **reduction**, and bubbles of hydrogen appear on the copper.

The overall reaction is $\ce{Zn + 2H+ -> Zn^2+ + H2}$. The copper is not used up; the cell stops working when the zinc or the acid runs out.

:::example{title="Example 1: a lemon cell"}
Push a galvanised (zinc-coated) nail and a piece of copper wire into a lemon, a few centimetres apart, and connect them to a voltmeter. The reading is about 0.9 V. The citric acid in the lemon juice is the electrolyte, the zinc is the negative electrode and the copper is the positive electrode. Two or three lemon cells joined in series give enough voltage to light an LED.
:::

## Voltage and the reactivity series

The further apart two metals are in the reactivity series, the **bigger the voltage**. Two strips of the **same** metal give **no** voltage, because neither metal is more ready to lose electrons than the other. The more reactive metal is always the negative electrode.

The table shows typical results from a class experiment in which each metal was paired with copper in salt solution (real readings vary with the electrolyte and the condition of the metal surfaces):

| Metal paired with copper | Voltage / V | Negative electrode |
| --- | --- | --- |
| magnesium | 1.8 | magnesium |
| zinc | 1.0 | zinc |
| iron | 0.6 | iron |
| lead | 0.4 | lead |
| copper | 0.0 | (none) |

The order of the voltages is the order of the reactivity series.

:::worked-solution[Example 2: using the table]
1. **Predict the voltage of a zinc–iron cell.** Both are measured against copper, so the difference is about $1.0 - 0.6 = 0.4$ V. Zinc is more reactive, so zinc is negative.
2. **Place an unknown metal X.** An X–copper cell gives 0.8 V with X negative. Since $0.6 < 0.8 < 1.0$, X lies between zinc and iron in the reactivity series.
3. If the voltmeter had shown that **copper** was negative, X would be **less** reactive than copper (silver behaves like this).
:::

## The lead-acid battery

A car battery is a plastic case divided into **six cells** joined in series.

| Part | Material |
| --- | --- |
| negative plates | spongy **lead**, $\ce{Pb}$ |
| positive plates | **lead(IV) oxide**, $\ce{PbO2}$, pressed into a lead grid |
| electrolyte | **dilute sulfuric acid** |
| separators | porous plastic sheets that stop the plates touching |

Each cell gives about 2 V, so the battery gives about 12 V.

**Discharging (when it supplies a current).** Both kinds of plate slowly change into **lead(II) sulfate**, and sulfuric acid is used up while water is formed:

$$
\ce{Pb + PbO2 + 2H2SO4 -> 2PbSO4 + 2H2O}
$$

At the negative plate $\ce{Pb + SO4^2- -> PbSO4 + 2e-}$ (oxidation); at the positive plate $\ce{PbO2 + 4H+ + SO4^2- + 2e- -> PbSO4 + 2H2O}$ (reduction).

Because acid is replaced by water, the **density of the electrolyte falls** as the battery runs down. A **hydrometer** measures it: about 1.28 g/cm³ when fully charged and roughly 1.1 g/cm³ when flat.

**Charging.** A battery charger, a car's alternator or a solar charge controller pushes current through the battery in the **opposite** direction. The reactions reverse: lead(II) sulfate turns back into lead and lead(IV) oxide, and the acid becomes more concentrated. Electrical energy is stored as chemical energy. Near the end of charging, some water is electrolysed into **hydrogen and oxygen** (the battery "gasses"), and this mixture can explode.

## Looking after a lead-acid battery

1. Keep the plates covered by topping up with **distilled (deionised) water**, never tap water (its dissolved ions damage the plates) and never acid (the acid is not lost; water is).
2. Keep the terminals clean and smear them with petroleum jelly to stop corrosion.
3. Charge in a **well-ventilated** place, with no flames, sparks or smoking nearby, because of the hydrogen.
4. Wear eye protection and gloves: the acid is corrosive. Wash any spill with plenty of water.
5. Recharge a flat battery soon. Left discharged, the lead(II) sulfate forms hard crystals that will not change back, and the battery is ruined.
6. Return old batteries for **recycling**. Lead is toxic and the acid is corrosive, so a battery must never be burnt, buried or dumped.

## Cells compared with electrolysis

| Simple cell | Electrolysis cell |
| --- | --- |
| chemical energy → electrical energy | electrical energy → chemical energy |
| the reaction happens by itself | a power supply forces the reaction |
| the more reactive metal is the negative electrode | the electrode joined to the negative terminal is the cathode |

## Common mistakes

:::mistake{title="Using two identical metals"}
Two copper strips give 0 V. A cell needs two **different** metals (or a metal and another electrode).
:::

:::mistake{title="Saying the battery stores electricity"}
A battery stores **chemical energy**. It changes it into electrical energy when a current is taken.
:::

:::mistake{title="Topping up with acid"}
The sulfuric acid is re-formed on charging; only water is lost (by evaporation and electrolysis). Top up with distilled water.
:::

## Exam tips

:::exam-tip
To identify the negative electrode, name the **more reactive** metal and say that it **loses electrons** more readily.
:::

:::exam-tip
"Describe the maintenance of a lead-acid battery" usually earns a mark for each practical point: distilled water, clean greased terminals, ventilation when charging, no flames, recharge promptly, recycle.
:::

## Summary

:::summary
- A simple cell has two different metals in an electrolyte; it changes chemical energy into electrical energy.
- The more reactive metal is the negative electrode: it is oxidised and its electrons flow through the wire to the other metal.
- The further apart the metals are in the reactivity series, the bigger the voltage; identical metals give 0 V.
- A lead-acid battery has lead and lead(IV) oxide plates in dilute sulfuric acid; six 2 V cells give 12 V.
- Discharging turns both plates into lead(II) sulfate and lowers the acid's density; charging reverses this.
- Maintain with distilled water, clean terminals, ventilation, no flames, prompt recharging and recycling.
:::
