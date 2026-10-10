---
{
  "key": "acids.buffers",
  "title": "Buffer solutions",
  "summary": "What a buffer is, how acidic and basic buffers are made (including by partial neutralisation), how they resist changes in pH, how to calculate buffer pH and the composition needed for a chosen pH, and buffers in blood and soil.",
  "concepts": ["achem.acids.buffers"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

Your blood stays at a pH of about 7.4 whether you have just drunk a glass of orange juice or run a race. Shampoos, eye drops and many medicines are formulated at a fixed pH, and laboratories calibrate pH meters with solutions of known, steady pH. All of these rely on **buffer solutions**: mixtures that keep the pH almost constant when small amounts of acid or alkali are added.

In this lesson you will learn what is in a buffer, why it works, and how to calculate its pH. You need to be confident with weak acids, Ka and pKa, Le Chatelier's principle, and calculating amounts in moles. Buffer calculations look different from weak-acid calculations because $[\ce{H+}]$ is no longer equal to $[\ce{A-}]$.

## Key definitions

:::definition{term="Buffer solution"}
A solution that resists changes in pH when small amounts of acid or alkali are added (or when it is diluted).
:::

:::definition{term="Acidic buffer"}
A solution containing a weak acid and its conjugate base, usually a salt of the acid: for example ethanoic acid with sodium ethanoate. It buffers below pH 7.
:::

:::definition{term="Basic buffer"}
A solution containing a weak base and its conjugate acid, usually a salt of the base: for example ammonia with ammonium chloride. It buffers above pH 7.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: definition, how buffers work with equations, buffer pH calculations and the hydrogencarbonate buffer in blood (ZIMSEC Form 6; Cambridge A Level, Paper 4). **ZIMSEC detail:** soil pH as a buffering example and the pOH of a basic buffer using Kb. Cambridge calculations use acidic buffers only.
:::

## How an acidic buffer works

Ethanoic acid is weak; sodium ethanoate is fully ionic. So the mixture contains **large reservoirs** of both $\ce{CH3COOH}$ and $\ce{CH3COO-}$, linked by the equilibrium

$$
\ce{CH3COOH(aq) <=> CH3COO-(aq) + H+(aq)}
$$

- **Small amount of acid added:** the extra $\ce{H+}$ ions combine with the large supply of ethanoate ions, $\ce{CH3COO- + H+ -> CH3COOH}$. The position moves left, and $[\ce{H+}]$ hardly changes.
- **Small amount of alkali added:** the $\ce{OH-}$ ions react with ethanoic acid, $\ce{CH3COOH + OH- -> CH3COO- + H2O}$ (equivalently, $\ce{OH-}$ removes $\ce{H+}$ and more acid dissociates to replace it). $[\ce{H+}]$ again hardly changes.

Because both reservoirs are large compared with the amount added, the **ratio** $[\ce{CH3COOH}]/[\ce{CH3COO-}]$ changes only a little, and so does the pH. A weak acid on its own is not a buffer: it has plenty of HA but very little $\ce{A-}$ to mop up added $\ce{H+}$.

## Calculating the pH of an acidic buffer

Rearrange the Ka expression:

$$
[\ce{H+}] = K_\text{a} \times \frac{[\ce{HA}]}{[\ce{A-}]} \qquad \text{or} \qquad \text{pH} = \text{p}K_\text{a} + \log_{10}\frac{[\ce{A-}]}{[\ce{HA}]}
$$

Two approximations are used: the acid is so weakly dissociated that $[\ce{HA}]$ equals the acid concentration added, and **all** of the $\ce{A-}$ comes from the salt. Because both species are in the same volume, you may use **amounts in moles** instead of concentrations.

:::worked-solution[Example 1: pH of a buffer]
Calculate the pH of a buffer that is 0.100 mol dm⁻³ in ethanoic acid and 0.150 mol dm⁻³ in sodium ethanoate. (data: Ka = 1.74 × 10⁻⁵ mol dm⁻³)

1. $[\ce{H+}] = 1.74 \times 10^{-5} \times \dfrac{0.100}{0.150} = 1.16 \times 10^{-5}$ mol dm⁻³.
2. pH = $-\log(1.16 \times 10^{-5}) = 4.94$.
3. Check: there is more salt than acid, so the pH is above the pKa (4.76), as expected.
:::

When [HA] = [A⁻], pH = pKa: a buffer works best near its pKa, within about one unit either side.

### Making a buffer by partial neutralisation

Adding a strong base to an **excess** of weak acid converts some of the acid into its salt, leaving a buffer.

:::worked-solution[Example 2: partial neutralisation]
20.0 cm³ of 0.200 mol dm⁻³ sodium hydroxide is added to 50.0 cm³ of 0.200 mol dm⁻³ ethanoic acid. Calculate the pH of the mixture. (data: Ka = 1.74 × 10⁻⁵ mol dm⁻³)

1. $n(\ce{CH3COOH})$ at the start $= 0.0500 \times 0.200 = 0.0100$ mol; $n(\ce{OH-}) = 0.0200 \times 0.200 = 0.00400$ mol.
2. $\ce{CH3COOH + OH- -> CH3COO- + H2O}$: acid left = 0.00600 mol; ethanoate formed = 0.00400 mol.
3. Same volume for both, so use amounts: $[\ce{H+}] = 1.74 \times 10^{-5} \times \dfrac{0.00600}{0.00400} = 2.61 \times 10^{-5}$ mol dm⁻³.
4. pH = 4.58.
:::

### Designing a buffer for a chosen pH

To make a buffer of pH 5.00 from 500 cm³ of 0.100 mol dm⁻³ ethanoic acid: $[\ce{A-}] = \dfrac{K_\text{a}[\ce{HA}]}{[\ce{H+}]} = \dfrac{1.74 \times 10^{-5} \times 0.100}{1.00 \times 10^{-5}} = 0.174$ mol dm⁻³. That is 0.0870 mol of sodium ethanoate ($M_\text{r}$ 82.0), or 7.13 g, dissolved in the acid (ignoring any volume change).

### How well does it resist change?

Adding 1.00 cm³ of 1.00 mol dm⁻³ hydrochloric acid to 100 cm³ of a buffer with 0.0100 mol each of ethanoic acid and ethanoate changes the amounts to 0.0110 mol and 0.0090 mol: the pH falls only from 4.76 to 4.67. The same acid added to 100 cm³ of pure water would take the pH from 7.00 to 2.00. The **buffer capacity** is the amount of acid or alkali a buffer can absorb before its pH changes significantly; it is larger when both components are more concentrated.

## Basic buffers (pOH method: ZIMSEC)

For ammonia and ammonium chloride, the reservoirs are $\ce{NH3}$ and $\ce{NH4+}$: added $\ce{H+}$ reacts with $\ce{NH3}$ to form $\ce{NH4+}$; added $\ce{OH-}$ reacts with $\ce{NH4+}$ to form $\ce{NH3}$ and water. Using Kb:

$$
\text{pOH} = \text{p}K_\text{b} + \log_{10}\frac{[\ce{NH4+}]}{[\ce{NH3}]}
$$

For 0.200 mol dm⁻³ ammonia with 0.100 mol dm⁻³ ammonium chloride (data: Kb = 1.8 × 10⁻⁵ mol dm⁻³): pOH = 4.74 + log(0.5) = 4.44, so pH = 14.00 − 4.44 = 9.56.

## Buffers in blood and soil

**Blood.** The main buffer in blood plasma is the carbonic acid–hydrogencarbonate system:

$$
\ce{CO2(aq) + H2O(l) <=> H2CO3(aq) <=> H+(aq) + HCO3-(aq)}
$$

Extra $\ce{H+}$ (for example lactic acid from hard exercise) combines with $\ce{HCO3-}$ to form carbonic acid, which breaks down to carbon dioxide that is breathed out. Extra $\ce{OH-}$ is removed by reaction with $\ce{H2CO3}$, forming $\ce{HCO3-}$ and water. This keeps blood pH close to 7.4; a change of only a few tenths of a pH unit is dangerous.

**Soil (ZIMSEC).** Soils contain weak acids from humus, together with clay particles and carbonates that can take up or release $\ce{H+}$ ions, so their pH changes only slowly when acidic fertilisers or acid rain are added. Once that buffering is used up the soil becomes acidic, which is why farmers add lime (calcium carbonate or calcium oxide) to acidic fields.

## Common mistakes

:::mistake{title="Using √(Ka c) for a buffer"}
In a buffer $[\ce{H+}] \neq [\ce{A-}]$, because the salt supplies most of the $\ce{A-}$. Use $[\ce{H+}] = K_\text{a}[\ce{HA}]/[\ce{A-}]$.
:::

:::mistake{title="Using initial amounts after partial neutralisation"}
Subtract the base added from the acid, and count the salt formed.
:::

:::mistake{title="Writing the buffer equations the wrong way"}
Added H⁺ is removed by the **conjugate base** ($\ce{A-}$); added OH⁻ is removed by the **weak acid** (HA). Write both equations.
:::

:::mistake{title="Saying a buffer keeps the pH exactly constant"}
The pH changes slightly; a buffer only resists large changes, and only for small additions.
:::

## Exam tips

:::exam-tip{title="Which papers"}
ZIMSEC Papers 1-3 (Section A); Cambridge Paper 4. Typical structure: define a buffer, explain with equations how it works, calculate its pH, then calculate the new pH after a small addition of acid or alkali.
:::

:::exam-tip{title="Command words"}
*Explain* how a buffer works: name both reservoirs, write an equation for added H⁺ and one for added OH⁻, and state that the ratio [HA]/[A⁻] changes little. *Calculate*: write $[\ce{H+}] = K_\text{a}[\ce{HA}]/[\ce{A-}]$ before substituting. *Describe* how blood is buffered: give the $\ce{H2CO3}$/$\ce{HCO3-}$ equilibrium and what happens to added acid and alkali.
:::

## Summary

:::summary
- A buffer resists pH change on adding small amounts of acid or alkali.
- Acidic buffer: weak acid + its salt; basic buffer: weak base + its salt; or partially neutralise a weak acid with a strong base.
- Added H⁺ reacts with A⁻; added OH⁻ reacts with HA; the ratio [HA]/[A⁻] changes little.
- [H⁺] = Ka[HA]/[A⁻] (pH = pKa when [HA] = [A⁻]); amounts can replace concentrations.
- Blood is buffered by H₂CO₃/HCO₃⁻ at about pH 7.4; ZIMSEC: soils buffer pH, basic buffers via pOH and Kb.
:::
