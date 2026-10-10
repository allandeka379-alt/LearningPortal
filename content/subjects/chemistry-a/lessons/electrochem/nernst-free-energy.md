---
{
  "key": "electrochem.nernst-free-energy",
  "title": "The Nernst equation and ΔG = −nFE",
  "summary": "How changing the concentration of aqueous ions changes an electrode potential, calculating electrode potentials under non-standard conditions with the Nernst equation, and linking a positive cell potential to a negative Gibbs free energy change with ΔG⦵ = −nE⦵cellF.",
  "concepts": ["achem.electrochem.nernst-free-energy"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Standard electrode potentials are measured at 1.00 mol dm⁻³, but real solutions are rarely that concentration. Water leaving a mine on the Great Dyke may contain metal ions at a few milligrams per litre; the electrolyte in a working battery changes concentration as the battery runs down, which is why its voltage falls. The **Nernst equation** tells you how far an electrode potential moves when concentrations change, and the relationship **ΔG⦵ = −nE⦵cellF** links electrochemistry to the Gibbs free energy you met in energetics.

You need standard electrode potentials, cell potentials, Le Chatelier's principle, logarithms to base 10 and the Gibbs free energy.

## Key definitions

:::definition{term="Nernst equation"}
For a half-cell written as a reduction, at 298 K: $E = E^\ominus + \dfrac{0.059}{z}\log_{10}\dfrac{[\text{oxidised form}]}{[\text{reduced form}]}$, where $z$ is the number of electrons in the half-equation.
:::

:::definition{term="Faraday constant, F"}
The charge on one mole of electrons: $F = 9.65 \times 10^{4}$ C mol⁻¹.
:::

:::formula{name="Free energy from a cell potential"}
$$
\Delta G^\ominus = -nE^\ominus_\mathrm{cell}F
$$

$n$ is the number of moles of electrons transferred in the balanced cell equation; with F in C mol⁻¹ and E in V, ΔG is in J mol⁻¹ (divide by 1000 for kJ mol⁻¹).
:::

:::keyfact{title="ZIMSEC and Cambridge"}
This lesson is Cambridge A Level only (Paper 4). ZIMSEC does not examine the Nernst equation or ΔG = −nFE.
:::

## Concentration and electrode potential: the qualitative idea

Each half-cell is an equilibrium, written as a reduction. For copper:

$$
\ce{Cu^2+(aq) + 2e- <=> Cu(s)}
$$

- **Increasing** $[\ce{Cu^2+}]$ shifts the equilibrium to the right (Le Chatelier). Electrons are removed from the electrode, so it becomes **more positive**: E increases.
- **Decreasing** $[\ce{Cu^2+}]$ shifts it to the left, releasing electrons onto the electrode, so E becomes **less positive** (more negative).

The same reasoning works for any couple: increasing the oxidised form makes E more positive; increasing the reduced form makes E more negative.

## The Nernst equation

For a metal and its ions, the metal is a solid, so only the ion concentration appears:

$$
E = E^\ominus + \frac{0.059}{z}\log_{10}[\ce{M^{z+}}]
$$

For two ions, such as $\ce{Fe^3+/Fe^2+}$, both appear:

$$
E = E^\ominus + \frac{0.059}{1}\log_{10}\frac{[\ce{Fe^3+}]}{[\ce{Fe^2+}]}
$$

The factor 0.059 V applies at 298 K. When every concentration is 1.00 mol dm⁻³, the log term is zero and $E = E^\ominus$.

:::worked-solution[Example 1: copper in a dilute solution]
Find E for a copper electrode in 0.010 mol dm⁻³ $\ce{Cu^2+(aq)}$ at 298 K. $E^\ominus(\ce{Cu^2+/Cu}) = +0.34$ V, $z = 2$.

1. $\log_{10}(0.010) = -2$.
2. $E = 0.34 + \dfrac{0.059}{2} \times (-2) = 0.34 - 0.059 = +0.281$ V, so about +0.28 V.
3. A hundredfold dilution lowers the potential by 0.059 V, in line with the qualitative prediction.
:::

:::worked-solution[Example 2: an iron(III)/iron(II) mixture]
A platinum electrode dips into a solution with $[\ce{Fe^3+}] = 0.50$ and $[\ce{Fe^2+}] = 0.050$ mol dm⁻³. $E^\ominus = +0.77$ V, $z = 1$.

1. Ratio $= 0.50 \div 0.050 = 10$, and $\log_{10} 10 = 1$.
2. $E = 0.77 + 0.059 \times 1 = +0.829$ V, so about +0.83 V.
3. More of the oxidised form makes the electrode more positive, so this mixture is a slightly stronger oxidising agent than the standard couple.
:::

## Feasibility under non-standard conditions

To decide whether a reaction happens with given concentrations, calculate E for each half-cell with the Nernst equation, then find $E_\mathrm{cell} = E(\text{reduced}) - E(\text{oxidised})$. Reactions with small E⦵cell values (a few tenths of a volt) can be reversed by large concentration changes; reactions with large E⦵cell values are hardly affected, because the log term changes slowly.

| Change | Effect on E of that half-cell | Effect on a cell where it is the positive electrode |
|---|---|---|
| increase [oxidised form] | more positive | E_cell increases |
| decrease [oxidised form] | less positive | E_cell decreases |
| increase [reduced form] (ions only) | less positive | E_cell decreases |

## Linking E and ΔG

A positive cell potential corresponds to a negative Gibbs free energy change, so both tests for feasibility agree.

:::worked-solution[Example 3: the zinc-copper cell]
$\ce{Zn + Cu^2+ -> Zn^2+ + Cu}$, $E^\ominus_\mathrm{cell} = +1.10$ V, $n = 2$.

1. $\Delta G^\ominus = -2 \times 1.10 \times 9.65 \times 10^{4} = -2.123 \times 10^{5}$ J mol⁻¹.
2. $\Delta G^\ominus = -212$ kJ mol⁻¹: negative, so the reaction is feasible, matching the positive E⦵cell.
:::

Notice that **n** is the number of electrons in the overall equation as written, not in one half-equation before balancing.

## Common mistakes

:::mistake{title="Using ln instead of log10"}
In the 0.059 form of the Nernst equation, the logarithm is to base 10.
:::

:::mistake{title="Putting the metal into the ratio"}
For a metal/ion couple only the ion concentration appears; a solid has no concentration term.
:::

:::mistake{title="Forgetting z"}
Divide 0.059 by the number of electrons in the half-equation: 2 for $\ce{Cu^2+/Cu}$, 1 for $\ce{Fe^3+/Fe^2+}$ or $\ce{Ag+/Ag}$.
:::

:::mistake{title="Leaving ΔG in joules"}
$-nEF$ gives J mol⁻¹. Convert to kJ mol⁻¹ before comparing with enthalpy values.
:::

## Exam tips

:::exam-tip{title="Which papers"}
Cambridge Paper 4: predict qualitatively how E changes with concentration, calculate E with the Nernst equation, and calculate ΔG⦵ from E⦵cell. Paper 5 can give values of E at different concentrations to plot against log[ion]: the gradient is 0.059/z.
:::

:::exam-tip{title="Command words"}
*Predict and explain* the effect of a concentration change: name the equilibrium, the direction of shift and the effect on E. *Calculate*: write the Nernst equation with values, show the log, and give E to two or three decimal places. *Deduce* feasibility: compare E values or the sign of ΔG.
:::

## Summary

:::summary
- Increasing the oxidised form makes an electrode potential more positive; increasing the reduced form makes it more negative.
- Nernst at 298 K: E = E⦵ + (0.059/z) log₁₀([oxidised]/[reduced]); solids are left out.
- A tenfold change in concentration changes E by 0.059/z V.
- ΔG⦵ = −nE⦵cellF, in J mol⁻¹; positive E⦵cell means negative ΔG⦵ and a feasible reaction.
- Small cell potentials can change sign when concentrations change a lot.
:::
