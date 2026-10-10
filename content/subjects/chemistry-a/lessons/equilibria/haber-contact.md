---
{
  "key": "equilibria.haber-contact",
  "title": "The Haber and Contact processes",
  "summary": "How ammonia and sulfuric acid are manufactured, why the chosen temperatures, pressures and catalysts are compromises between rate, yield, cost and safety, the uses of both products, and the laboratory preparation of ammonia and ammonium sulfate.",
  "concepts": ["achem.equilibria.haber-contact"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Maize fields from Mashonaland to Masvingo depend on nitrogen fertilisers such as ammonium nitrate and ammonium sulfate, and nearly all of that nitrogen started as ammonia made by the **Haber process**. Sulfuric acid, made by the **Contact process**, is used in even larger amounts: for phosphate and ammonium sulfate fertilisers, in car batteries and across the chemical industry.

Both processes are built around a reversible, exothermic reaction between gases. That makes them the classic test of whether you can combine Le Chatelier's principle with collision theory and practical economics. Before this lesson you should know Le Chatelier's principle, the effect of temperature and catalysts on rate, and how to do mole calculations.

## Key definitions

:::definition{term="Compromise conditions"}
Operating conditions chosen to give an acceptable equilibrium yield at an acceptable rate and cost, rather than the maximum possible yield or the maximum possible rate.
:::

:::definition{term="Heterogeneous catalyst"}
A catalyst in a different phase from the reactants, such as solid iron with gaseous nitrogen and hydrogen. It is not used up, so a small amount works for a long time.
:::

:::definition{term="Oleum"}
Fuming sulfuric acid, $\ce{H2S2O7}$, formed when sulfur trioxide dissolves in concentrated sulfuric acid.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards need the conditions of both processes and the reasons for them. ZIMSEC also lists the industrial importance of ammonia and sulfuric acid, the burning of sulfur, and the laboratory preparations of ammonia and ammonium sulfate. How the iron catalyst works at the surface is covered in the catalysis lesson.
:::

## The Haber process

$$
\ce{N2(g) + 3H2(g) <=> 2NH3(g)} \qquad \Delta H = -92\ \text{kJ mol}^{-1}
$$

**Raw materials**

- **Nitrogen** comes from the air, separated by fractional distillation of liquid air (or left in the gas stream after oxygen is removed by burning).
- **Hydrogen** comes mainly from natural gas by steam reforming, $\ce{CH4(g) + H2O(g) -> CO(g) + 3H2(g)}$, or from the electrolysis of water where cheap electricity is available.

**Conditions**

| Condition | Typical value | Effect on equilibrium yield | Effect on rate | Why this value |
|---|---|---|---|---|
| Temperature | about 400–450 °C | lower T gives a higher yield (forward reaction exothermic) | higher T gives a faster rate | a compromise: lower temperatures are too slow, higher ones give too little ammonia |
| Pressure | about 200 atm | higher pressure gives a higher yield (4 mol of gas → 2 mol) | higher pressure gives a faster rate | very high pressures need thick-walled plant and expensive compressors and are more hazardous |
| Catalyst | iron | no effect | much faster | lets a lower temperature be used while keeping a useful rate |

Only a small fraction of the gases reacts in one pass through the converter. The mixture is cooled so that ammonia liquefies and is removed; the unreacted nitrogen and hydrogen are **recycled**, so overall almost all of the feed is eventually converted.

## The Contact process

**Step 1: making sulfur dioxide.** Molten sulfur is burned in air: $\ce{S(s) + O2(g) -> SO2(g)}$. Sulfur burns with a blue flame. (Sulfur dioxide is also a by-product of roasting sulfide ores.) The gas is cleaned and dried to protect the catalyst.

**Step 2: the equilibrium step.**

$$
\ce{2SO2(g) + O2(g) <=> 2SO3(g)} \qquad \Delta H = -197\ \text{kJ mol}^{-1}
$$

| Condition | Typical value | Why |
|---|---|---|
| Temperature | about 400–450 °C | compromise between rate and the yield of an exothermic reaction |
| Pressure | about 1–2 atm | the equilibrium already lies far to the right, so the small gain from high pressure does not justify its cost |
| Catalyst | vanadium(V) oxide, $\ce{V2O5}$ | increases the rate; no effect on yield |
| Oxygen | slight excess of air | moves the position right and makes better use of the more valuable $\ce{SO2}$ |

**Step 3: absorption.** Sulfur trioxide is absorbed in concentrated sulfuric acid to make oleum, which is then diluted carefully with water:

$$
\ce{SO3(g) + H2SO4(l) -> H2S2O7(l)} \qquad \ce{H2S2O7(l) + H2O(l) -> 2H2SO4(l)}
$$

Sulfur trioxide is **not** dissolved directly in water. The reaction is so exothermic that it forms a fine mist of acid droplets that is hard to condense and escapes.

:::example{title="Example 1: explaining a compromise temperature"}
Question: explain why the Haber process is not run at 200 °C, even though the equilibrium yield of ammonia would be higher.

1. The forward reaction is exothermic, so lowering the temperature moves the position of equilibrium to the right: the equilibrium yield would rise.
2. But at 200 °C very few molecules have energy equal to or greater than the activation energy, even with the iron catalyst, so the rate would be far too slow.
3. Ammonia would be made too slowly to be economic. About 400–450 °C gives a lower yield per pass but a much faster rate, and unreacted gases are recycled.
:::

:::worked-solution[Example 2: sulfuric acid from sulfur]
Calculate the maximum mass of sulfuric acid that can be made from 1.00 tonne of sulfur. ($A_\text{r}$: H 1.0, O 16.0, S 32.1)

1. Every sulfur atom ends up in one $\ce{H2SO4}$: S → $\ce{SO2}$ → $\ce{SO3}$ → $\ce{H2SO4}$, a 1 : 1 ratio.
2. $M_\text{r}(\ce{H2SO4}) = 2(1.0) + 32.1 + 4(16.0) = 98.1$.
3. Mass = $1.00 \times \dfrac{98.1}{32.1} = 3.06$ tonnes.
:::

## Why the products matter

| Product | Main uses |
|---|---|
| Ammonia | fertilisers (ammonium nitrate, ammonium sulfate, urea); making nitric acid; explosives; cleaning products |
| Sulfuric acid | fertilisers (superphosphate, ammonium sulfate); detergents; car batteries; paints and pigments; general chemical industry |

:::worked-solution[Example 3: comparing nitrogen fertilisers]
Which fertiliser supplies more nitrogen per kilogram: ammonium nitrate, $\ce{NH4NO3}$, or ammonium sulfate, $\ce{(NH4)2SO4}$? ($A_\text{r}$: H 1.0, N 14.0, O 16.0, S 32.1)

1. $M_\text{r}(\ce{NH4NO3}) = 80.0$; % N = $\dfrac{2 \times 14.0}{80.0} \times 100 = 35.0\%$.
2. $M_\text{r}(\ce{(NH4)2SO4}) = 132.1$; % N = $\dfrac{2 \times 14.0}{132.1} \times 100 = 21.2\%$.
3. Ammonium nitrate supplies more nitrogen per kilogram, although ammonium sulfate also supplies sulfur.
:::

## Laboratory preparations (ZIMSEC suggested activities)

**Ammonia.** Heat a mixture of ammonium chloride and calcium hydroxide:

$$
\ce{2NH4Cl(s) + Ca(OH)2(s) -> CaCl2(s) + 2NH3(g) + 2H2O(g)}
$$

Dry the gas by passing it through calcium oxide. Concentrated sulfuric acid and anhydrous calcium chloride cannot be used because both react with ammonia. Collect it by upward delivery (downward displacement of air), because ammonia is less dense than air and very soluble in water. Ammonia turns damp red litmus paper blue and forms white fumes of ammonium chloride with hydrogen chloride. Work in a fume cupboard.

**Ammonium sulfate.** Titrate a measured volume of aqueous ammonia with dilute sulfuric acid using methyl orange. Repeat with the same volumes but no indicator, then evaporate to the point of crystallisation and leave to crystallise:

$$
\ce{2NH3(aq) + H2SO4(aq) -> (NH4)2SO4(aq)}
$$

For example, 20.0 cm³ of 1.50 mol dm⁻³ ammonia contains 0.0300 mol of $\ce{NH3}$, which gives at most 0.0150 mol, or 1.98 g, of ammonium sulfate.

## Common mistakes

:::mistake{title="Saying the catalyst increases the yield"}
Iron and vanadium(V) oxide speed up the reaction. They do not change the position of equilibrium or the yield.
:::

:::mistake{title="Explaining the temperature with yield alone"}
A full answer mentions both sides: a lower temperature gives a higher yield, but the rate would be too slow.
:::

:::mistake{title="Using high pressure in the Contact process"}
The pressure is only 1–2 atm because the yield is already high; high pressure would cost more than it gains.
:::

:::mistake{title="Dissolving SO₃ in water"}
SO₃ is absorbed in concentrated sulfuric acid to form oleum; adding it to water directly forms an acid mist.
:::

## Exam tips

:::exam-tip{title="Which papers"}
ZIMSEC Papers 1-3 (the processes are listed with the applied chemistry of sulfur, so Paper 3 may place them in Section A or D); Cambridge Papers 1 and 2 (AS). Questions usually give the equation and ΔH and ask you to justify each condition.
:::

:::exam-tip{title="Command words"}
*State* the conditions: give a value and the catalyst. *Explain* a condition: give its effect on the yield (with the reason from the equation), its effect on the rate, and the cost or safety argument. *Suggest* why unreacted gases are recycled or why excess air is used: link to cost and to Le Chatelier. *Calculate*: use the 1 : 1 or 2 : 1 ratios through the steps.
:::

## Summary

:::summary
- Haber: $\ce{N2 + 3H2 <=> 2NH3}$, ΔH negative; iron catalyst, about 200 atm and 400–450 °C; ammonia liquefied out and gases recycled.
- Contact: $\ce{2SO2 + O2 <=> 2SO3}$, ΔH negative; $\ce{V2O5}$ catalyst, about 1–2 atm and 400–450 °C; $\ce{SO3}$ absorbed in concentrated $\ce{H2SO4}$ to make oleum.
- Conditions are compromises between equilibrium yield, rate, cost and safety.
- Ammonia makes fertilisers and nitric acid; sulfuric acid makes fertilisers, detergents and battery acid.
- In the laboratory, ammonia is made from an ammonium salt and an alkali and dried with calcium oxide.
:::
