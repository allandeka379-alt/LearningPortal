---
{
  "key": "equilibria.kc-kp",
  "title": "Equilibrium constants Kc and Kp",
  "summary": "Writing Kc and Kp expressions, working out their units, using mole fractions and partial pressures, and calculating equilibrium constants and equilibrium amounts from initial amounts and one equilibrium amount.",
  "concepts": ["achem.equilibria.kc-kp"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

Le Chatelier's principle tells you which way an equilibrium moves. The equilibrium constant tells you **how far** a reaction goes. A chemist planning how much ethanol and ethanoic acid to mix to make a fruity ester flavouring, or an engineer checking how much ammonia a reactor can deliver, needs numbers, not just arrows.

For any reversible reaction at a fixed temperature, the ratio of product concentrations to reactant concentrations (each raised to the power of its coefficient) has the same value at equilibrium, whatever the starting amounts. That ratio is the equilibrium constant. You should already be able to calculate amounts in moles, concentrations in mol dm⁻³ and use the ideas of dynamic equilibrium and Le Chatelier's principle.

## Key definitions

:::definition{term="Equilibrium constant, Kc"}
For $a\text{A} + b\text{B} \rightleftharpoons c\text{C} + d\text{D}$ at equilibrium, $K_\text{c} = \dfrac{[\text{C}]^c[\text{D}]^d}{[\text{A}]^a[\text{B}]^b}$, where square brackets are equilibrium concentrations in mol dm⁻³. Its value is constant at a given temperature.
:::

:::definition{term="Mole fraction"}
The amount of one gas divided by the total amount of gas in the mixture: $x_\text{A} = \dfrac{n_\text{A}}{n_\text{total}}$. The mole fractions of all the gases add up to 1.
:::

:::definition{term="Partial pressure"}
The pressure one gas in a mixture would exert if it alone occupied the whole volume: $p_\text{A} = x_\text{A} \times p_\text{total}$. The partial pressures add up to the total pressure.
:::

:::definition{term="Equilibrium constant, Kp"}
For the same gaseous equilibrium, $K_\text{p} = \dfrac{p_\text{C}^{\,c}\,p_\text{D}^{\,d}}{p_\text{A}^{\,a}\,p_\text{B}^{\,b}}$, using equilibrium partial pressures.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards need Kc and Kp expressions, their units and calculations of K and of equilibrium amounts. Cambridge (AS Level) states that the relationship between Kp and Kc is not required, and questions never need a quadratic equation. Kstab (complex ions) and Ksp (solubility) have their own lessons.
:::

## Writing Kc expressions

- Products on top, reactants underneath, each concentration raised to the power of its coefficient in the balanced equation.
- Kc applies to **homogeneous** equilibria in this course: all species in the same phase. In esterification, water is a product in the same liquid mixture, so it appears in the expression.
- The expression matches the equation **as written**. If the equation is doubled, K is squared; if it is reversed, K becomes 1/K.

For $\ce{N2(g) + 3H2(g) <=> 2NH3(g)}$:

$$
K_\text{c} = \frac{[\ce{NH3}]^2}{[\ce{N2}][\ce{H2}]^3}
$$

### Working out units

Substitute the unit of each term and cancel. For the ammonia expression: $\dfrac{(\text{mol dm}^{-3})^2}{(\text{mol dm}^{-3})(\text{mol dm}^{-3})^3} = (\text{mol dm}^{-3})^{-2} = \text{dm}^6\,\text{mol}^{-2}$.

| Equation | Kc expression | Units of Kc |
|---|---|---|
| $\ce{H2(g) + I2(g) <=> 2HI(g)}$ | $[\ce{HI}]^2/[\ce{H2}][\ce{I2}]$ | none |
| $\ce{PCl5(g) <=> PCl3(g) + Cl2(g)}$ | $[\ce{PCl3}][\ce{Cl2}]/[\ce{PCl5}]$ | mol dm⁻³ |
| $\ce{2SO2(g) + O2(g) <=> 2SO3(g)}$ | $[\ce{SO3}]^2/[\ce{SO2}]^2[\ce{O2}]$ | dm³ mol⁻¹ |
| $\ce{N2(g) + 3H2(g) <=> 2NH3(g)}$ | $[\ce{NH3}]^2/[\ce{N2}][\ce{H2}]^3$ | dm⁶ mol⁻² |

Kp units are found the same way with pressure units (Pa, kPa or atm): for $\ce{N2O4 <=> 2NO2}$, Kp has units of kPa when pressures are in kPa.

## What the size of K tells you

- K much larger than 1: the equilibrium lies well to the right; mostly products.
- K much smaller than 1: the equilibrium lies to the left; mostly reactants.
- K close to 1: significant amounts of both.

Only temperature changes K. Adding a reactant changes the concentrations, but the system adjusts until the ratio again equals the same K.

## Calculating Kc: the equilibrium table method

1. Write the balanced equation.
2. Make a table of initial amounts, change and equilibrium amounts, using the mole ratio from the equation for the change.
3. Convert equilibrium amounts to concentrations (divide by the volume in dm³). If the total moles on each side are equal, the volume cancels.
4. Substitute into the Kc expression and work out the units.

:::worked-solution[Example 1: esterification]
0.500 mol of ethanoic acid and 0.600 mol of ethanol are mixed with a little acid catalyst and left to reach equilibrium at constant temperature. The equilibrium mixture contains 0.362 mol of ethyl ethanoate. Calculate Kc for $\ce{CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O}$.

| | $\ce{CH3COOH}$ | $\ce{C2H5OH}$ | $\ce{CH3COOC2H5}$ | $\ce{H2O}$ |
|---|---|---|---|---|
| initial / mol | 0.500 | 0.600 | 0 | 0 |
| change / mol | −0.362 | −0.362 | +0.362 | +0.362 |
| equilibrium / mol | 0.138 | 0.238 | 0.362 | 0.362 |

1. The volume $V$ cancels because there are two concentration terms on top and two below.
2. $K_\text{c} = \dfrac{0.362 \times 0.362}{0.138 \times 0.238} = 3.99$ (no units).
:::

:::worked-solution[Example 2: a Kc with units]
0.200 mol of phosphorus(V) chloride is heated in a sealed 2.00 dm³ flask: $\ce{PCl5(g) <=> PCl3(g) + Cl2(g)}$. At equilibrium 0.120 mol of $\ce{PCl5}$ remains. Calculate Kc.

1. $\ce{PCl5}$ reacted = 0.200 − 0.120 = 0.080 mol, so 0.080 mol each of $\ce{PCl3}$ and $\ce{Cl2}$ form (1 : 1 : 1).
2. Concentrations: $[\ce{PCl5}] = 0.120/2.00 = 0.0600$; $[\ce{PCl3}] = [\ce{Cl2}] = 0.080/2.00 = 0.0400$ mol dm⁻³.
3. $K_\text{c} = \dfrac{0.0400 \times 0.0400}{0.0600} = 0.0267\ \text{mol dm}^{-3}$.

Here the volume does not cancel: one term below, two on top. Using moles instead of concentrations would give a wrong answer.
:::

## Calculating Kp

1. Find the equilibrium amount of each gas (equilibrium table).
2. Find the total amount of gas and each mole fraction.
3. Partial pressure = mole fraction × total pressure.
4. Substitute into the Kp expression; give the units.

:::worked-solution[Example 3: dinitrogen tetroxide]
1.00 mol of $\ce{N2O4}$ is allowed to reach equilibrium, $\ce{N2O4(g) <=> 2NO2(g)}$, at a total pressure of 100 kPa. 20.0% of the $\ce{N2O4}$ dissociates. Calculate Kp.

1. $\ce{N2O4}$ reacting = 0.200 mol, so $\ce{NO2}$ formed = 2 × 0.200 = 0.400 mol; $\ce{N2O4}$ left = 0.800 mol.
2. Total = 0.800 + 0.400 = 1.200 mol. Mole fractions: $x(\ce{N2O4}) = 0.800/1.200 = 0.667$; $x(\ce{NO2}) = 0.400/1.200 = 0.333$.
3. Partial pressures: $p(\ce{N2O4}) = 66.7$ kPa; $p(\ce{NO2}) = 33.3$ kPa (they add up to 100 kPa).
4. $K_\text{p} = \dfrac{p(\ce{NO2})^2}{p(\ce{N2O4})} = \dfrac{33.3^2}{66.7} = 16.7\ \text{kPa}$.
:::

## Finding an equilibrium concentration from K

If K and all but one equilibrium concentration are known, rearrange the expression. For $\ce{H2 + I2 <=> 2HI}$: $[\ce{HI}] = \sqrt{K_\text{c}[\ce{H2}][\ce{I2}]}$. Exam questions are set so that no quadratic equation is needed.

## Common mistakes

:::mistake{title="Using initial amounts"}
Kc uses **equilibrium** concentrations. Always subtract the amount that reacted.
:::

:::mistake{title="Ignoring the mole ratio"}
In $\ce{N2O4 <=> 2NO2}$, 0.200 mol of $\ce{N2O4}$ gives 0.400 mol of $\ce{NO2}$, not 0.200 mol.
:::

:::mistake{title="Forgetting the volume"}
Divide amounts by the volume unless the volume truly cancels; check by counting terms.
:::

:::mistake{title="Mole fraction from the initial total"}
The total amount of gas changes when the numbers of moles on each side differ. Use the equilibrium total.
:::

:::mistake{title="Units"}
Do not quote units for Kc when they cancel. When they do not, cancel them carefully and state them.
:::

## Exam tips

:::exam-tip{title="Which papers"}
ZIMSEC Papers 1, 2 and 3 (Section A); Cambridge Papers 1 and 2 (AS). Expect one long calculation: equilibrium table, concentrations or partial pressures, K with units, then a question on how K changes with temperature.
:::

:::exam-tip{title="Command words"}
*Write an expression*: products over reactants with powers; square brackets for Kc, $p$ for Kp. *Calculate*: show the table and give the answer with units to 3 significant figures. *Deduce the units*: show the cancellation. *Explain* why K changes with temperature: link it to the sign of ΔH and the shift in position.
:::

## Summary

:::summary
- $K_\text{c}$ = product of equilibrium product concentrations ÷ product of reactant concentrations, each to the power of its coefficient.
- Kp uses partial pressures; partial pressure = mole fraction × total pressure.
- Units come from cancelling the units in the expression; sometimes there are none.
- Use an initial–change–equilibrium table and the mole ratio to find equilibrium amounts.
- Only temperature changes the value of K; a large K means the equilibrium lies to the right.
:::
