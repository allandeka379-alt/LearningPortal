---
{
  "key": "kinetics.catalysis",
  "title": "Homogeneous and heterogeneous catalysis",
  "summary": "Homogeneous and heterogeneous catalysts, how solid catalysts work by adsorption and desorption (iron in the Haber process, platinum-group metals in catalytic converters), catalyst poisoning, homogeneous catalysis by oxides of nitrogen and by Fe²⁺/Fe³⁺ explained with E⦵ values, and enzymes in outline.",
  "concepts": ["achem.kinetics.catalysis"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Platinum, palladium and rhodium are among the minerals of the Great Dyke, and much of their value comes from a single use: the catalytic converter in a car exhaust, where a few grams of metal clean up the gases from every kilometre driven. Iron catalysts make the ammonia for fertilisers, enzymes digest our food, and traces of nitrogen oxides in the air speed up the formation of acid rain. All of these speed up reactions without being used up, but they work in two quite different ways.

This lesson distinguishes **heterogeneous** catalysts, which work at a surface, from **homogeneous** catalysts, which take part in the reaction in the same phase and are regenerated. You should already know that a catalyst provides a route with a lower activation energy, how the Boltzmann distribution explains this, and how to use standard electrode potentials to predict whether a redox reaction is feasible.

## Key definitions

:::definition{term="Heterogeneous catalyst"}
A catalyst in a different phase from the reactants, usually a solid catalysing reactions of gases or liquids at its surface.
:::

:::definition{term="Homogeneous catalyst"}
A catalyst in the same phase as the reactants, usually all in solution or all gases. It reacts in one step of the mechanism and is regenerated in a later step.
:::

:::definition{term="Adsorption"}
The attachment of molecules to the surface of a solid by forming weak bonds with surface atoms. (Absorption, in contrast, means taking a substance into the bulk.)
:::

:::definition{term="Catalyst poisoning"}
Loss of catalytic activity when an impurity is strongly adsorbed onto the active sites of a heterogeneous catalyst and blocks them.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: modes of action of homogeneous and heterogeneous catalysts with the named examples (iron in the Haber process; Pt, Pd and Rh in catalytic converters; oxides of nitrogen with sulfur dioxide; Fe²⁺/Fe³⁺ in the iodide–peroxodisulfate reaction). ZIMSEC Form 6; Cambridge A Level (Paper 4). ZIMSEC also suggests the decomposition of hydrogen peroxide catalysed by manganese(IV) oxide as a practical.
:::

## Heterogeneous catalysis: how a surface helps

The reaction happens on the catalyst surface in four stages:

1. **Adsorption.** Reactant molecules diffuse to the surface and form weak bonds with atoms at the **active sites**.
2. **Bond weakening.** Bonds within the adsorbed molecules are weakened (and the molecules are held close together in a favourable orientation), so less energy is needed to break them.
3. **Reaction.** The adsorbed species react on the surface, forming new bonds.
4. **Desorption.** The product molecules are released from the surface, freeing the active sites for more reactant.

A good catalyst adsorbs reactants **strongly enough** to weaken their bonds but **weakly enough** for products to desorb. Transition metals do this well because they can use their d-orbitals to form bonds with adsorbed molecules.

### Iron in the Haber process

Nitrogen and hydrogen are adsorbed onto iron. The very strong N≡N triple bond is weakened, and nitrogen and hydrogen atoms on the surface combine step by step to form ammonia, which desorbs. Iron is used as a finely divided solid or porous lumps to give a large surface area.

### Catalytic converters

A ceramic honeycomb coated with a thin layer of platinum, palladium and rhodium gives a huge surface area for very little metal. As the hot exhaust gases pass through, three pollutants are removed:

| Pollutant | Reaction on the catalyst | Product |
|---|---|---|
| carbon monoxide and nitrogen monoxide | $\ce{2CO(g) + 2NO(g) -> 2CO2(g) + N2(g)}$ | carbon dioxide and nitrogen |
| carbon monoxide (with oxygen) | $\ce{2CO(g) + O2(g) -> 2CO2(g)}$ | carbon dioxide |
| unburnt hydrocarbons, e.g. octane | $\ce{2C8H18(g) + 25O2(g) -> 16CO2(g) + 18H2O(g)}$ | carbon dioxide and water |

Lead compounds (from old leaded petrol) are strongly adsorbed and **poison** the catalyst, which is why cars with converters must use unleaded fuel. Sulfur compounds can similarly poison the iron catalyst in the Haber process, so the feed gases are purified first.

## Homogeneous catalysis: used and regenerated

A homogeneous catalyst offers a different route of two (or more) steps, each with a lower activation energy than the uncatalysed reaction. It is used up in one step and re-formed in another, so it cancels from the overall equation.

![Energy profile for homogeneous catalysis: the uncatalysed route has one high peak; the catalysed route has two lower peaks with a dip between them for an intermediate, the catalyst reacting in step 1 and being regenerated in step 2, and both end at the same product energy.](media:diagrams/energy-profile-two-step-catalysis.png "Figure: homogeneous catalysis gives a two-step route with two lower activation energies")

### Oxides of nitrogen and sulfur dioxide

In polluted air, nitrogen dioxide catalyses the oxidation of sulfur dioxide, a step in the formation of acid rain:

$$
\ce{SO2(g) + NO2(g) -> SO3(g) + NO(g)}
$$
$$
\ce{NO(g) + 1/2O2(g) -> NO2(g)}
$$

Overall: $\ce{SO2 + 1/2O2 -> SO3}$. $\ce{NO2}$ is used in the first step and regenerated in the second; NO is an intermediate. The sulfur trioxide then reacts with water to form sulfuric acid in rain.

### Iron ions and the iodide–peroxodisulfate reaction

$$
\ce{S2O8^2-(aq) + 2I-(aq) -> 2SO4^2-(aq) + I2(aq)}
$$

This is slow without a catalyst, because both reactants are **negative ions** that repel each other, so the activation energy is high. A little iron(II) or iron(III) speeds it up greatly. Each catalysed step involves ions of **opposite charge**:

$$
\ce{S2O8^2-(aq) + 2Fe^2+(aq) -> 2SO4^2-(aq) + 2Fe^3+(aq)}
$$
$$
\ce{2Fe^3+(aq) + 2I-(aq) -> 2Fe^2+(aq) + I2(aq)}
$$

:::worked-solution[Example 1: checking each step with E⦵ values]
Data: $\ce{S2O8^2- + 2e- <=> 2SO4^2-}$, E⦵ = +2.01 V; $\ce{Fe^3+ + e- <=> Fe^2+}$, E⦵ = +0.77 V; $\ce{I2 + 2e- <=> 2I-}$, E⦵ = +0.54 V.

1. Step 1 (peroxodisulfate oxidises Fe²⁺): E⦵cell = 2.01 − 0.77 = +1.24 V. Positive, so feasible.
2. Step 2 (Fe³⁺ oxidises I⁻): E⦵cell = 0.77 − 0.54 = +0.23 V. Positive, so feasible.
3. The Fe³⁺/Fe²⁺ potential lies **between** the other two, so iron can be oxidised by one reactant and reduced by the other. Starting with Fe³⁺ works equally well: step 2 simply happens first.
:::

This shows the general requirement for a redox catalyst: its two oxidation states must have an electrode potential between those of the two reacting couples. Transition metal ions are good homogeneous catalysts because they have variable oxidation states.

## Manganese(IV) oxide and hydrogen peroxide (ZIMSEC practical)

Hydrogen peroxide decomposes slowly at room temperature; a little black manganese(IV) oxide powder makes it fizz rapidly:

$$
\ce{2H2O2(aq) -> 2H2O(l) + O2(g)}
$$

The rate can be followed by collecting the oxygen in a gas syringe. Filtering, washing and drying the MnO₂ afterwards shows that its mass is unchanged, a useful check that it acted as a catalyst. This is heterogeneous catalysis (a solid with an aqueous solution).

:::worked-solution[Example 2: volume of oxygen]
50.0 cm³ of 0.400 mol dm⁻³ hydrogen peroxide is decomposed completely with manganese(IV) oxide. Calculate the volume of oxygen at room conditions. (molar gas volume 24.0 dm³ mol⁻¹)

1. $n(\ce{H2O2}) = 0.0500 \times 0.400 = 0.0200$ mol.
2. 2 mol $\ce{H2O2}$ gives 1 mol $\ce{O2}$: $n(\ce{O2}) = 0.0100$ mol.
3. $V = 0.0100 \times 24.0 = 0.240$ dm³ = 240 cm³. Using more MnO₂ makes this volume appear faster, not larger.
:::

## Enzymes (outline)

Enzymes are protein molecules that act as biological catalysts. Each has an **active site** whose shape fits a particular substrate, so enzymes are highly **specific**. They work best at an optimum temperature and pH; at high temperatures or extreme pH the protein's shape is changed (denatured) and activity is lost. Enzymes are used industrially, for example in fermentation to make ethanol from sugars and in biological washing powders.

## Common mistakes

:::mistake{title="Absorption instead of adsorption"}
Reactants are **ad**sorbed onto the surface, not absorbed into the catalyst.
:::

:::mistake{title="Leaving out desorption"}
A full description of heterogeneous catalysis ends with the products leaving the surface so that the active sites are free again.
:::

:::mistake{title="Wrong ion charges in the Fe catalysis"}
The uncatalysed reaction is slow because S₂O₈²⁻ and I⁻ are both negative; each catalysed step involves a positive iron ion and a negative ion.
:::

:::mistake{title="Saying the catalyst is used up"}
A homogeneous catalyst is used in one step but regenerated in another, so overall it is not consumed.
:::

## Exam tips

:::exam-tip{title="Which papers"}
ZIMSEC Papers 1-3 (catalysis items may appear in Section A or D) and Paper 4 (H₂O₂/MnO₂ practical); Cambridge Paper 4. Expect to write the two steps of a homogeneous catalysis, check them with E⦵ values, and describe heterogeneous catalysis in stages.
:::

:::exam-tip{title="Command words"}
*Describe* heterogeneous catalysis: adsorption, weakening of bonds, reaction, desorption. *Explain* why Fe²⁺ catalyses the reaction: two equations, opposite charges attract, both E⦵cell values positive. *Suggest* why a catalyst is poisoned: an impurity is strongly adsorbed and blocks active sites. *Distinguish*: same phase versus different phase, with one example of each.
:::

## Summary

:::summary
- Heterogeneous catalysts are in a different phase; they work by adsorption, bond weakening, reaction and desorption at active sites.
- Iron catalyses the Haber process; Pt, Pd and Rh in catalytic converters remove CO, NO and unburnt hydrocarbons; lead and sulfur compounds poison catalysts.
- Homogeneous catalysts are in the same phase, used in one step and regenerated later: NO₂ with SO₂, Fe²⁺/Fe³⁺ with S₂O₈²⁻ and I⁻.
- A redox catalyst's E⦵ lies between those of the two reacting couples, so both steps are feasible.
- MnO₂ catalyses 2H₂O₂ → 2H₂O + O₂; enzymes are specific protein catalysts.
:::
