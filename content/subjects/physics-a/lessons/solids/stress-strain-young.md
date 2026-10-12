---
{
  "key": "solids.stress-strain-young",
  "title": "Stress, strain and the Young modulus",
  "summary": "Define tensile stress, tensile strain and the Young modulus, interpret stress-strain graphs for ductile and brittle materials, and describe and analyse the experiment to find the Young modulus of a metal wire.",
  "concepts": ["aphys.solids.stress-strain-young"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

The spring constant of the previous lesson describes one particular object: a thicker or shorter steel wire is stiffer than a thin long one, though both are steel. Engineers designing the cables of a mine hoist, the steel reinforcing bars in a bridge deck or the guy wires of a radio mast need a property of the **material** itself. That property is the Young modulus, and it comes from two ideas, stress and strain, that remove the effect of size and shape.

You need Hooke's law, the area of a circle, and standard form. Energy stored in a deformed material is in the next lesson.

## Key definitions

:::definition{term="Tensile stress"}
The tensile force acting per unit cross-sectional area: $\sigma = F/A$, in pascals (Pa).
:::

:::definition{term="Tensile strain"}
The extension per unit original length: $\varepsilon = x/L$. It is a ratio, so it has no unit.
:::

:::definition{term="Young modulus"}
The ratio of tensile stress to tensile strain for a material, within the limit of proportionality: $E = \sigma/\varepsilon$, in Pa.
:::

:::definition{term="Ultimate tensile stress"}
The maximum stress a material can withstand before it breaks; the highest point on its stress-strain graph.
:::

:::formula{name="Stress, strain and Young modulus"}
$$
\sigma = \frac{F}{A} \qquad \varepsilon = \frac{x}{L} \qquad E = \frac{\sigma}{\varepsilon} = \frac{FL}{Ax}
$$

$F$ in N, $A$ the cross-sectional area in $\text{m}^2$ (for a wire $A = \pi d^2/4$), $x$ the extension and $L$ the original length in the same unit.
:::

:::keyfact{title="Typical Young moduli"}
Steel about $2.0 \times 10^{11}\ \text{Pa}$; copper about $1.2 \times 10^{11}\ \text{Pa}$; aluminium about $7 \times 10^{10}\ \text{Pa}$; glass about $7 \times 10^{10}\ \text{Pa}$; rubber about $10^{6}$ to $10^{7}\ \text{Pa}$ (and not constant).
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards require stress, strain, the Young modulus, stress-strain graphs and the wire experiment (Cambridge AS 6.1; ZIMSEC Form 6).
:::

## Why stress and strain?

Doubling the cross-sectional area of a wire halves the extension for the same load, so dividing the force by the area (stress) removes the effect of thickness. Doubling the length doubles the extension, because each metre stretches the same amount, so dividing by the length (strain) removes the effect of length. The ratio $E = \sigma/\varepsilon$ is then the same for every sample of the material, whatever its size.

The link with the spring constant is $k = \dfrac{EA}{L}$: a short, thick wire of a high-modulus material is the stiffest.

:::worked-solution[The Young modulus of a steel wire]
A steel wire $2.50\ \text{m}$ long and $0.50\ \text{mm}$ in diameter extends by $5.1\ \text{mm}$ under a load of $80\ \text{N}$.

1. Area: $A = \dfrac{\pi d^2}{4} = \dfrac{\pi (0.50 \times 10^{-3})^2}{4} = 1.96 \times 10^{-7}\ \text{m}^2$.
2. Stress: $\sigma = \dfrac{80}{1.96 \times 10^{-7}} = 4.07 \times 10^{8}\ \text{Pa}$.
3. Strain: $\varepsilon = \dfrac{5.1 \times 10^{-3}}{2.50} = 2.04 \times 10^{-3}$.
4. $E = \dfrac{4.07 \times 10^{8}}{2.04 \times 10^{-3}} = 2.0 \times 10^{11}\ \text{Pa}$, as expected for steel.
:::

:::worked-solution[Predicting an extension]
A copper wire ($E = 1.2 \times 10^{11}\ \text{Pa}$) is $1.80\ \text{m}$ long with a diameter of $0.40\ \text{mm}$. Find its extension under a load of $12\ \text{N}$.

1. $A = \pi(0.20 \times 10^{-3})^2 = 1.257 \times 10^{-7}\ \text{m}^2$.
2. $\sigma = \dfrac{12}{1.257 \times 10^{-7}} = 9.55 \times 10^{7}\ \text{Pa}$.
3. $\varepsilon = \dfrac{\sigma}{E} = \dfrac{9.55 \times 10^{7}}{1.2 \times 10^{11}} = 7.96 \times 10^{-4}$.
4. $x = \varepsilon L = 7.96 \times 10^{-4} \times 1.80 = 1.43 \times 10^{-3}\ \text{m} = 1.43\ \text{mm}$.
:::

## Stress-strain graphs

| Feature | What it means |
| --- | --- |
| Straight line from the origin | Hooke's law region; gradient $= E$ |
| Limit of proportionality | End of the straight region |
| Elastic limit | Beyond it the material does not return to its original length |
| Yield point (ductile metals) | Large increase in strain with little extra stress; plastic flow begins |
| Ultimate tensile stress | Maximum stress on the graph |
| Breaking stress | Stress at fracture (for ductile metals, below the UTS because the wire "necks") |

A **ductile** material, such as copper or mild steel, shows a large plastic region: it can be drawn into wires and gives warning before it fails. A **brittle** material, such as glass, cast iron or concrete under tension, is linear right up to fracture with no plastic region, so it snaps suddenly. A stiffer material has a steeper straight region; a stronger material has a higher ultimate tensile stress. These are different properties.

![Stress-strain graph for a ductile metal such as copper or mild steel: a straight line from the origin whose gradient is the Young modulus up to the limit of proportionality, then a yield point where strain rises with little extra stress, a maximum at the ultimate tensile stress, and a breaking point below it as the wire necks.](media:diagrams/stress-strain-ductile-metal.png "Figure: stress-strain curve of a ductile metal (shape only; no scale)")

## The Young modulus experiment

1. Hang two long, identical wires from a rigid beam: a **test wire** carrying the load, and a **reference wire** carrying a fixed weight to keep it straight. A vernier scale joins them (or use a single wire over a pulley, with a marker read against a fixed scale).
2. Measure the original length $L$ (about 2 m or more) from the clamp to the marker with a metre rule or tape: a long wire gives a measurable extension.
3. Measure the diameter with a **micrometer** at several points along the wire and in two perpendicular directions; average. Wire diameters are under 1 mm, so this is the most precise measurement needed.
4. Add loads in equal steps; read the extension on the vernier (to 0.1 mm or better) after each. Repeat while unloading.
5. Plot load $F$ against extension $x$. The gradient is $F/x$, so $E = \text{gradient} \times \dfrac{L}{A}$.

The reference wire cancels the effects of temperature changes and of the beam sagging, since both wires are affected equally. Wear goggles in case the wire snaps, and keep feet clear of the masses (a sand tray beneath them).

:::worked-solution[Uncertainty in the Young modulus]
In the steel-wire example, $d = (0.50 \pm 0.01)\ \text{mm}$, $x = (5.1 \pm 0.1)\ \text{mm}$ and $L = (2.500 \pm 0.002)\ \text{m}$; the load is known precisely.

1. $E = \dfrac{4FL}{\pi d^2 x}$, so the percentage uncertainties add, with the diameter counted twice.
2. Diameter: $2 \times \dfrac{0.01}{0.50} \times 100 = 4.0\%$. Extension: $\dfrac{0.1}{5.1} \times 100 = 2.0\%$. Length: $0.08\%$.
3. Total $\approx 6.0\%$, so $E = (2.0 \pm 0.1) \times 10^{11}\ \text{Pa}$.
4. The diameter dominates: measure it carefully at many points.
:::

## Common mistakes

:::mistake{title="Using diameter as radius"}
$A = \pi r^2 = \pi d^2/4$. Using the diameter in $\pi r^2$ makes the area four times too large and $E$ four times too small.
:::

:::mistake{title="Forgetting unit conversions"}
Convert mm to m: $0.50\ \text{mm} = 0.50 \times 10^{-3}\ \text{m}$, so $d^2 = 2.5 \times 10^{-7}\ \text{m}^2$. Squaring a value in mm and then converting by $10^{-3}$ only is a common slip.
:::

:::mistake{title="Giving strain a unit"}
Strain is length ÷ length: no unit. Stress and the Young modulus are both in Pa.
:::

:::mistake{title="Stiff and strong are not the same"}
The Young modulus measures stiffness (resistance to stretching); the ultimate tensile stress measures strength (resistance to breaking).
:::

## Exam tips

:::exam-tip{title="Definitions"}
*Define the Young modulus*: tensile stress ÷ tensile strain (and, for full credit, "within the limit of proportionality"). Define stress and strain separately if asked, with "per unit area" and "per unit original length".
:::

:::exam-tip{title="The experiment"}
*Describe* questions want: long wire, reference wire or fixed scale with vernier, micrometer at several places for diameter, loads added in steps, graph of $F$ against $x$, $E = \text{gradient} \times L/A$, and a safety point. *Suggest* why the wire is long and thin: to make the extension large enough to measure.
:::

:::exam-tip{title="Which papers"}
Cambridge Papers 1, 2 and 5 (planning questions often ask for a Young modulus experiment in an unusual form) and ZIMSEC Papers 1, 2 and 4.
:::

## Summary

:::summary
- Stress $\sigma = F/A$ (Pa); strain $\varepsilon = x/L$ (no unit); Young modulus $E = \sigma/\varepsilon = FL/(Ax)$ (Pa).
- $E$ is a property of the material; $k = EA/L$ also depends on the shape of the sample.
- Stress-strain graph: gradient $E$ in the straight region; ultimate tensile stress at the maximum.
- Ductile materials deform plastically before breaking; brittle materials break with no plastic region.
- Experiment: long thin wire, reference wire and vernier, micrometer for the diameter (largest uncertainty, counted twice), $E = \text{gradient} \times L/A$.
:::
