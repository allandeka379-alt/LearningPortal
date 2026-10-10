---
{
  "key": "matter.thermal-conduction",
  "title": "Thermal conduction and thermal conductivity",
  "summary": "Explain conduction by lattice vibrations and free electrons, use the temperature gradient and the equation Q/t = kAΔθ/x, compare lagged and unlagged bars, solve composite-wall problems with equal heat flow rates, and outline Searle's bar and Lees' disc methods.",
  "concepts": ["aphys.matter.thermal-conduction"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Grab the metal handle of a pot that has been on the stove and you let go quickly; a wooden handle on the same pot stays comfortable. Builders in Bulawayo who add a ceiling board and insulation under a corrugated-iron roof keep the house far cooler in October. Both are about **thermal conduction**: how fast energy flows through a material because one side is hotter than the other.

At A-Level you describe the mechanism, define **thermal conductivity**, and calculate rates of energy flow through slabs and composite walls. You should already know that thermal energy flows from higher to lower temperature, and the ideas of power ($P = E/t$) and of temperature in kelvin and degrees Celsius.

## Key definitions

:::definition{term="Thermal conduction"}
The transfer of thermal energy through a material, from a region of higher temperature to one of lower temperature, by the interaction of neighbouring particles without any bulk movement of the material.
:::

:::definition{term="Temperature gradient"}
The change of temperature per unit distance along the direction of heat flow, $\Delta\theta/\Delta x$, measured in $\text{K m}^{-1}$.
:::

:::definition{term="Thermal conductivity"}
The rate of flow of thermal energy per unit cross-sectional area per unit temperature gradient, for flow perpendicular to the area: $k = \dfrac{Q/t}{A\,(\Delta\theta/x)}$.
:::

:::formula{name="Rate of conduction through a slab"}
$$
\frac{Q}{t} = kA\,\frac{\theta_1 - \theta_2}{x}
$$

$Q/t$ = rate of energy flow (W), $k$ = thermal conductivity ($\text{W m}^{-1}\ \text{K}^{-1}$), $A$ = cross-sectional area (m²), $\theta_1 - \theta_2$ = temperature difference across the slab (K or °C), $x$ = thickness (m).
:::

:::keyfact{title="Typical thermal conductivities near room temperature"}
Copper about $390$, aluminium about $240$, steel about $50$, glass about $0.8$, brick about $0.6$, water about $0.6$, wood about $0.1$-$0.2$, expanded polystyrene about $0.03$, still air about $0.025\ \text{W m}^{-1}\ \text{K}^{-1}$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Thermal conduction is ZIMSEC Form 6 only (scope to be confirmed against the syllabus); Cambridge 9702 does not include it.
:::

## How conduction happens

**In all solids: lattice vibrations.** Atoms at the hot end vibrate with larger amplitude. Because neighbouring atoms are linked by interatomic forces, these vibrations are passed along the lattice, so energy travels from hot to cold. This mechanism is fairly slow.

**In metals: free electrons as well.** Metals contain delocalised electrons moving rapidly at random. Electrons in the hot region gain kinetic energy, travel quickly through the lattice and give energy to atoms further along when they collide. This is far faster, which is why good electrical conductors are also good thermal conductors.

**Liquids and gases** conduct poorly: their particles are further apart or less strongly linked, and gases have no lattice at all. Trapped air (in wool, polystyrene, ceiling insulation) is therefore an excellent insulator, provided it cannot move and carry energy by convection.

## Rate of flow through a slab

The rate of energy flow is larger when the area is larger, the temperature difference is larger, the slab is thinner, and the material conducts better. All four appear in $Q/t = kA\Delta\theta/x$. Notice the analogy with electrical conduction, $I = \dfrac{\sigma A V}{L}$: heat flow rate plays the part of current, temperature difference the part of p.d., and $k$ the part of electrical conductivity.

:::worked-solution[Energy lost through a brick wall]
A brick wall is $3.0\ \text{m}$ by $2.5\ \text{m}$ and $0.22\ \text{m}$ thick, with $k = 0.60\ \text{W m}^{-1}\ \text{K}^{-1}$. The inner surface is at $24\ ^\circ\text{C}$ and the outer at $10\ ^\circ\text{C}$. Find the rate of energy flow.

1. $A = 3.0 \times 2.5 = 7.5\ \text{m}^2$; $\Delta\theta = 24 - 10 = 14\ \text{K}$.
2. $\dfrac{Q}{t} = kA\dfrac{\Delta\theta}{x} = 0.60 \times 7.5 \times \dfrac{14}{0.22}$.
3. $\dfrac{Q}{t} = 286\ \text{W} \approx 290\ \text{W}$ (two significant figures, like the data).
:::

## Lagged and unlagged bars

A metal bar is heated at one end and the other end is kept cool. Its temperature is measured at equal intervals along it.

- **Lagged bar** (wrapped in insulation): no energy escapes from the sides, so the same rate of energy flows through every cross-section. With constant $Q/t$, $k$ and $A$, the temperature gradient is constant: the **temperature-distance graph is a straight line** falling from the hot end to the cold end.
- **Unlagged bar**: energy is lost from the sides along the way, so less energy flows through the sections near the cold end. The temperature gradient is steepest at the hot end and becomes smaller towards the cold end: the **graph is a curve, concave upwards**, lying below the straight line of the lagged bar.

| Distance from hot end / cm | 0 | 10 | 20 | 30 | 40 |
|---|---|---|---|---|---|
| Lagged bar, $\theta\,/\,^\circ\text{C}$ | 100 | 80 | 60 | 40 | 20 |
| Unlagged bar, $\theta\,/\,^\circ\text{C}$ (typical) | 100 | 72 | 51 | 35 | 20 |

## Composite walls: layers in series

When heat flows through two layers one after the other (a wall with plaster, a window with two panes, a ceiling board with insulation on top), in the steady state **the rate of energy flow is the same through each layer**, because no energy accumulates at the interface. The layer with the lower conductivity per unit thickness has the larger temperature drop across it.

:::worked-solution[Interface temperature of a composite bar]
A lagged copper bar ($k = 385\ \text{W m}^{-1}\ \text{K}^{-1}$) and a lagged steel bar ($k = 50\ \text{W m}^{-1}\ \text{K}^{-1}$), each $0.10\ \text{m}$ long with the same cross-section, are joined end to end. The free end of the copper is at $100\ ^\circ\text{C}$ and the free end of the steel at $0\ ^\circ\text{C}$. Find the temperature $\theta$ of the junction.

1. Equal flow rates: $k_cA\dfrac{100 - \theta}{0.10} = k_sA\dfrac{\theta - 0}{0.10}$.
2. $385(100 - \theta) = 50\,\theta$, so $435\,\theta = 38\,500$.
3. $\theta = 88.5\ ^\circ\text{C}$. Most of the temperature drop (88.5 K) is across the poorly conducting steel.
4. For $A = 2.0 \times 10^{-4}\ \text{m}^2$, the rate is $385 \times 2.0 \times 10^{-4} \times \dfrac{11.5}{0.10} = 8.85\ \text{W}$.
:::

This is why insulation works so well: a thin layer of a very poor conductor takes almost all of the temperature difference and limits the flow through the whole wall or roof.

## Measuring thermal conductivity (outline)

- **Searle's bar (good conductors such as copper).** A long, thick, well-lagged bar is heated by steam at one end and cooled by water flowing through a coil at the other. Two thermometers a measured distance apart give the temperature gradient. The rate of energy flow is found from the cooling water: $Q/t = \dfrac{m}{t}\,c\,(\theta_{\text{out}} - \theta_{\text{in}})$. The bar is long and thick so the temperature difference between the thermometers is large enough to measure.
- **Lees' disc (poor conductors such as glass or card).** The specimen is a thin, wide disc sandwiched between a steam chamber and a brass disc. In the steady state the rate of flow through the specimen equals the rate the brass disc loses energy, found from its cooling rate at the steady temperature: $Q/t = mc\,(\mathrm{d}\theta/\mathrm{d}t)$. The specimen is thin and wide so that the rate of flow is large enough to measure.

## Common mistakes

:::mistake{title="Thinking the temperature at the junction is the average"}
The junction temperature is the average only when the two layers have equal $k/x$. Use equal heat flow rates to find it.
:::

:::mistake{title="Using thickness in cm or area in cm²"}
$k$ is in $\text{W m}^{-1}\ \text{K}^{-1}$, so thickness must be in metres and area in square metres.
:::

:::mistake{title="Saying insulators stop heat flow"}
Insulators reduce the rate of flow; they cannot stop it while a temperature difference exists.
:::

:::mistake{title="Explaining metal conduction by vibrations alone"}
In metals free electrons carry most of the energy; mention both mechanisms.
:::

## Exam tips

:::exam-tip{title="Describe the graph"}
For a lagged bar say "straight line, constant gradient, because the rate of flow is the same at every section". For an unlagged bar say "curve with decreasing gradient, because energy is lost from the sides".
:::

:::exam-tip{title="Composite problems"}
Write the equal-flow equation first, then solve for the unknown temperature; quote the rate with its unit, W.
:::

:::exam-tip{title="Which papers"}
Expect calculations in ZIMSEC Papers 2 and 3, the mechanism in Paper 1, and the outline of Searle's or Lees' method in Paper 3 or the practical paper.
:::

## Summary

:::summary
- Conduction: lattice vibrations in all solids, plus fast free electrons in metals.
- $Q/t = kA(\theta_1 - \theta_2)/x$; $k$ in $\text{W m}^{-1}\ \text{K}^{-1}$.
- Lagged bar: uniform gradient, straight temperature-distance line; unlagged: gradient decreases along the bar.
- Layers in series carry the same heat flow rate; the poorest conductor takes the largest temperature drop.
- Searle's bar measures $k$ for good conductors; Lees' disc for poor conductors.
:::
