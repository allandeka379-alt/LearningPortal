---
{
  "key": "energetics.enthalpy-calorimetry",
  "title": "Enthalpy changes and calorimetry",
  "summary": "Exothermic and endothermic reactions, energy profiles, standard conditions and the standard enthalpy changes of reaction, formation, combustion and neutralisation, and how to measure enthalpy changes with q = mcΔT.",
  "concepts": ["achem.energetics.enthalpy-calorimetry"],
  "estimatedMinutes": 40,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

When maize meal porridge cooks on a gas stove, the burning gas transfers energy to the pot; when a farmer dissolves ammonium nitrate fertiliser in a bucket of water, the bucket feels cold. Chemists describe both with one quantity, the **enthalpy change**, $\Delta H$. Measuring it is the starting point for the whole of energetics: Hess cycles, bond energies, Born-Haber cycles and the feasibility of reactions all build on the definitions in this lesson.

You should already know how to calculate amounts in moles from masses and from solution volumes, and that bond breaking takes in energy while bond making releases it.

## Key definitions

:::definition{term="Enthalpy change, ΔH"}
The heat energy transferred between a reacting system and its surroundings at constant pressure, in kJ mol⁻¹ for the amounts shown in the equation.
:::

:::definition{term="Exothermic and endothermic"}
An exothermic reaction transfers energy to the surroundings ($\Delta H$ negative; the surroundings warm up). An endothermic reaction takes in energy from the surroundings ($\Delta H$ positive; the surroundings cool down).
:::

:::definition{term="Standard conditions"}
A temperature of 298 K, a pressure of 101 kPa, solutions at 1 mol dm⁻³, and every substance in its standard state (its normal physical state under these conditions). Standard values are written $\Delta H^\ominus$.
:::

:::definition{term="Standard enthalpy change of reaction, ΔH⦵r"}
The enthalpy change when the amounts shown in the equation react under standard conditions, all substances in their standard states.
:::

:::definition{term="Standard enthalpy change of formation, ΔH⦵f"}
The enthalpy change when one mole of a compound is formed from its elements in their standard states under standard conditions. For an element in its standard state, $\Delta H^\ominus_\mathrm{f} = 0$.
:::

:::definition{term="Standard enthalpy change of combustion, ΔH⦵c"}
The enthalpy change when one mole of a substance is burned completely in excess oxygen under standard conditions.
:::

:::definition{term="Standard enthalpy change of neutralisation, ΔH⦵neut"}
The enthalpy change when an acid and an alkali react to form one mole of water under standard conditions.
:::

:::definition{term="Activation energy, Ea"}
The minimum energy that colliding particles must have for a reaction to occur.
:::

:::keyfact{title="Equations that match the definitions"}
- Formation of ethanol: $\ce{2C(s) + 3H2(g) + 1/2O2(g) -> C2H5OH(l)}$ (one mole of product, elements as reactants).
- Combustion of ethanol: $\ce{C2H5OH(l) + 3O2(g) -> 2CO2(g) + 3H2O(l)}$ (one mole of fuel).
- Neutralisation: $\ce{H+(aq) + OH-(aq) -> H2O(l)}$ (one mole of water).

Fractions such as $\ce{1/2O2}$ are allowed because the definition fixes one mole of the named substance.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards define these four enthalpy changes. ZIMSEC also lists the enthalpy changes of hydration and solution here (met in outline; their cycle is a separate lesson) and asks for thermometric titrations and temperature-time graphs with extrapolation.
:::

## Energy profiles

A reaction pathway (energy profile) diagram plots enthalpy against the progress of the reaction. Describe it in words like this:

| Feature | Exothermic reaction | Endothermic reaction |
|---|---|---|
| products compared with reactants | lower | higher |
| $\Delta H$ (arrow from reactant level to product level) | points down, negative | points up, positive |
| activation energy (arrow from reactant level to the peak) | positive | positive, and larger than $\Delta H$ |

Breaking bonds in the reactants needs energy; forming bonds in the products releases energy. If more energy is released than taken in, the reaction is exothermic overall.

## Measuring enthalpy changes

All calorimetry uses one idea: the energy given out (or taken in) by the reaction changes the temperature of a known mass of water or solution.

:::formula{name="Energy transferred and enthalpy change"}
$$
q = mc\Delta T \qquad \Delta H = -\frac{q}{n}
$$
:::

Here $m$ is the mass of the water or solution being heated (in g, taking 1.00 g cm⁻³ for dilute solutions), $c$ is its specific heat capacity (4.18 J g⁻¹ K⁻¹), $\Delta T$ is the temperature change (a change of 1 °C is a change of 1 K), and $n$ is the amount in moles of the substance named in the definition. The minus sign makes $\Delta H$ negative when the temperature rises. Divide $q$ by 1000 to convert J to kJ.

| Experiment | Apparatus | Mass in $q = mc\Delta T$ | Main errors |
|---|---|---|---|
| neutralisation, solution, displacement | polystyrene cup with lid, thermometer | total volume of solution (in g) | heat loss; heat capacity of the cup ignored; density and $c$ taken as water |
| combustion of a liquid fuel | spirit burner under a copper can of water | the water in the can, not the fuel | heat loss to the air and can; incomplete combustion (soot); evaporation of fuel |

:::worked-solution[Example 1: enthalpy change of neutralisation]
50.0 cm³ of 1.00 mol dm⁻³ hydrochloric acid was mixed with 50.0 cm³ of 1.00 mol dm⁻³ sodium hydroxide in a polystyrene cup. The temperature rose by 6.7 °C.

1. Mass of solution $= 50.0 + 50.0 = 100.0$ g (density 1.00 g cm⁻³).
2. $q = 100.0 \times 4.18 \times 6.7 = 2800.6$ J $= 2.8006$ kJ.
3. Amount of water formed $=$ amount of HCl $= 0.0500 \times 1.00 = 0.0500$ mol.
4. $\Delta H_\mathrm{neut} = -\dfrac{2.8006}{0.0500} = -56.0\ \text{kJ mol}^{-1}$ (3 s.f.).
:::

:::worked-solution[Example 2: enthalpy change of combustion of ethanol]
Burning 0.92 g of ethanol, $\ce{C2H5OH}$ ($M_\mathrm{r} = 46.0$), heated 150.0 g of water in a copper can by 24.0 °C.

1. $q = 150.0 \times 4.18 \times 24.0 = 15\,048$ J $= 15.048$ kJ.
2. Amount of ethanol $= 0.92 \div 46.0 = 0.0200$ mol.
3. $\Delta H_\mathrm{c} = -\dfrac{15.048}{0.0200} = -752\ \text{kJ mol}^{-1}$.
4. Data: $\Delta H^\ominus_\mathrm{c}(\ce{C2H5OH}) = -1367\ \text{kJ mol}^{-1}$. The experiment captured only about 55% of the energy: most was lost heating the air and the can, and some ethanol burned incompletely.
:::

### Temperature-time graphs and thermometric titrations

In a cup reaction such as zinc displacing copper from copper(II) sulfate, the reaction is not instantaneous, so the solution cools while it is still warming. Record the temperature for a few minutes before mixing, add the reagent at a known time, then keep recording. Extrapolate the cooling line back to the time of mixing: the gap between it and the starting line is the corrected $\Delta T$.

In a **thermometric titration**, one solution is added in portions from a burette and the temperature is recorded after each addition. The temperature rises while the reaction takes place and falls once excess cold reagent is being added. Two best-fit lines, one through the rising points and one through the falling points, cross at the end point; the volume there gives the concentration, and the maximum temperature rise can give $\Delta H$.

:::example{title="Example 3: displacement with an extrapolated temperature change"}
25.0 cm³ of 0.400 mol dm⁻³ copper(II) sulfate was stirred with excess zinc powder. Extrapolating the cooling line back to the time of mixing gave $\Delta T = 19.6$ °C. Then $q = 25.0 \times 4.18 \times 19.6 = 2048$ J, $n(\ce{Cu^2+}) = 0.0100$ mol, and $\Delta H = -2.048 \div 0.0100 = -205\ \text{kJ mol}^{-1}$ for $\ce{Zn(s) + Cu^2+(aq) -> Zn^2+(aq) + Cu(s)}$. The zinc is in excess, so the copper(II) ions fix the amount reacting.
:::

## Common mistakes

:::mistake{title="Using the mass of the fuel or solid in q = mcΔT"}
$m$ is the mass of the water or solution whose temperature changes, not the mass of the substance that reacts.
:::

:::mistake{title="Losing the sign"}
A temperature rise means an exothermic reaction, so $\Delta H$ is negative. Write the sign every time.
:::

:::mistake{title="Dividing by the wrong amount"}
Divide by the amount of the substance in the definition: the fuel for combustion, water formed for neutralisation, the limiting reagent for a reaction in a cup.
:::

:::mistake{title="Formation equations with compounds as reactants"}
$\ce{CO + 1/2O2 -> CO2}$ is not the formation of $\ce{CO2}$; formation starts from the elements: $\ce{C(s) + O2(g) -> CO2(g)}$.
:::

## Exam tips

:::exam-tip{title="Which papers"}
ZIMSEC Papers 1-3 (definitions, calculations, energy profiles) and Paper 4 (thermometric experiments). Cambridge Papers 1 and 2 (AS); Paper 3 thermometric experiments and Paper 5 evaluation of calorimetry methods.
:::

:::exam-tip{title="Command words"}
*Define*: include standard conditions, one mole of the right substance and standard states. *Construct an equation*: state symbols and the right amount of the named substance. *Calculate*: show q in J, convert to kJ, divide by n, give the sign and unit. *Explain* why an experimental value is less exothermic than the data value: heat loss, incomplete combustion, non-standard conditions.
:::

## Summary

:::summary
- ΔH is the heat transferred at constant pressure: negative for exothermic, positive for endothermic.
- Standard conditions: 298 K, 101 kPa, 1 mol dm⁻³, standard states.
- Formation: one mole of compound from its elements; combustion: one mole burned completely; neutralisation: one mole of water.
- q = mcΔT with m the mass of water or solution; ΔH = −q/n in kJ mol⁻¹.
- Heat loss makes measured values less exothermic; extrapolating a cooling curve corrects ΔT.
:::
