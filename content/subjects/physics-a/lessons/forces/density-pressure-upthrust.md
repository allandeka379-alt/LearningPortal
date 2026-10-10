---
{
  "key": "forces.density-pressure-upthrust",
  "title": "Density, pressure in fluids and upthrust",
  "summary": "Use density and pressure, derive and apply p = ρgh, explain upthrust as a pressure difference and use Archimedes' principle for floating and sinking objects, hydrometers and manometers.",
  "concepts": ["aphys.forces.density-pressure-upthrust"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Many Zimbabwean homes and schools store borehole water in a tank on a tall stand: the higher the tank, the stronger the flow at the taps. A dam wall is built much thicker at the bottom than at the top. A loaded barge on Lake Kariba floats lower in the water than an empty one. All three follow from one idea: the pressure in a fluid increases with depth.

You should know $p = F/A$ and $\rho = m/V$ from O-Level, and that weight is $mg$. This lesson derives the A-Level results and uses them quantitatively. Moving fluids (Bernoulli's principle) belong to the fluid-flow lesson.

## Key definitions

:::definition{term="Density"}
The mass per unit volume of a substance: $\rho = m/V$, in $\text{kg m}^{-3}$.
:::

:::definition{term="Pressure"}
The normal (perpendicular) force acting per unit area of a surface: $p = F/A$, in pascals ($1\ \text{Pa} = 1\ \text{N m}^{-2}$).
:::

:::definition{term="Upthrust"}
The resultant upward force exerted by a fluid on an object wholly or partly immersed in it, caused by the pressure on its lower surface being greater than the pressure on its upper surface.
:::

:::definition{term="Archimedes' principle"}
The upthrust on an object in a fluid equals the weight of the fluid it displaces.
:::

:::formula{name="Hydrostatic pressure"}
$$
\Delta p = \rho g \Delta h
$$

$\Delta p$ is the pressure difference in Pa between two points a vertical distance $\Delta h$ (m) apart in a fluid of density $\rho$ ($\text{kg m}^{-3}$); $g = 9.81\ \text{m s}^{-2}$. The total pressure at depth $h$ below an open surface is $p = p_0 + \rho g h$, where $p_0$ is atmospheric pressure.
:::

:::formula{name="Upthrust"}
$$
F = \rho g V
$$

$\rho$ is the density of the **fluid**, $V$ the volume of fluid displaced (the immersed volume of the object).
:::

:::keyfact{title="Values to know"}
Density of water $\approx 1000\ \text{kg m}^{-3}$; atmospheric pressure at sea level $\approx 1.01 \times 10^{5}\ \text{Pa}$ (lower on the Highveld, which is well above sea level).
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards need $p = \rho g h$ and upthrust. Cambridge (AS 4.3) asks you to **derive** $p = \rho g h$ and to explain upthrust from the pressure difference; hydrometers and manometers are useful applications for both.
:::

## Deriving $p = \rho g h$

Imagine a vertical column of liquid of height $h$ and cross-sectional area $A$ resting on the bottom of a container.

1. Volume of the column: $V = Ah$.
2. Mass: $m = \rho V = \rho A h$.
3. Weight: $W = mg = \rho A h g$.
4. Pressure on the base from this weight: $p = \dfrac{W}{A} = \dfrac{\rho A h g}{A} = \rho g h$.

The area cancels, so the pressure depends only on depth, density and $g$, not on the shape of the container. This assumes the liquid is incompressible (constant density), which is a very good approximation for water.

:::worked-solution[Pressure from a tank stand]
The water surface in a borehole tank is $12\ \text{m}$ above a tap. Take atmospheric pressure as $1.01 \times 10^{5}\ \text{Pa}$.

1. Pressure due to the water: $\rho g h = 1000 \times 9.81 \times 12 = 1.18 \times 10^{5}\ \text{Pa}$.
2. Total pressure in the pipe at the tap (closed) $= p_0 + \rho g h = 1.01 \times 10^{5} + 1.18 \times 10^{5} = 2.19 \times 10^{5}\ \text{Pa}$.
3. The tap outlet is open to the air, so the pressure that pushes the water out is the excess, $1.18 \times 10^{5}\ \text{Pa}$, about one extra atmosphere.
:::

## Why there is an upthrust

The pressure on the bottom face of a submerged block is greater than on its top face, because the bottom is deeper. The sideways forces on opposite vertical faces cancel. The resultant is an upward force.

For a block of height $\Delta h$ and horizontal face area $A$:

$$
F = (p_{\text{bottom}} - p_{\text{top}})A = \rho g \Delta h A = \rho g V
$$

$\rho g V$ is the weight of a volume $V$ of the fluid, which is Archimedes' principle. The result holds for any shape.

:::worked-solution[Upthrust on a steel block]
A steel block $0.20\ \text{m} \times 0.10\ \text{m} \times 0.050\ \text{m}$ (density $7800\ \text{kg m}^{-3}$) hangs on a spring balance, fully under water, with its large faces horizontal.

1. Volume: $V = 0.20 \times 0.10 \times 0.050 = 1.0 \times 10^{-3}\ \text{m}^3$.
2. Pressure difference between bottom and top faces: $\rho g \Delta h = 1000 \times 9.81 \times 0.050 = 490.5\ \text{Pa}$.
3. Upthrust $= 490.5 \times (0.20 \times 0.10) = 9.81\ \text{N}$, the same as $\rho g V = 1000 \times 9.81 \times 1.0 \times 10^{-3}$.
4. Weight $= 7800 \times 1.0 \times 10^{-3} \times 9.81 = 76.5\ \text{N}$.
5. Balance reading $= 76.5 - 9.81 = 66.7\ \text{N}$.
:::

## Floating and sinking

An object released in a fluid sinks if its weight is greater than the largest upthrust it can receive (when fully immersed), which happens when its average density is greater than the fluid's. It rises to the surface and floats when its average density is smaller. A floating object sinks until the **upthrust equals its weight**, so

$$
\rho_{\text{object}} V_{\text{object}} g = \rho_{\text{fluid}} V_{\text{immersed}} g \;\Rightarrow\; \frac{V_{\text{immersed}}}{V_{\text{object}}} = \frac{\rho_{\text{object}}}{\rho_{\text{fluid}}}
$$

A log of density $650\ \text{kg m}^{-3}$ floats in fresh water with 0.65 of its volume submerged. A steel ship floats because its hull encloses air, so its average density is less than that of water. Loading it increases its weight, so it sinks lower until it displaces more water.

A **hydrometer** is a weighted float with a narrow stem. It floats lower in a less dense liquid because a larger volume must be displaced to give the same upthrust. The scale on the stem reads density directly; hydrometers are used to check battery acid and the sugar content of brewing liquids.

:::worked-solution[A hydrometer]
A hydrometer of mass $0.030\ \text{kg}$ has a uniform stem of cross-sectional area $1.5 \times 10^{-4}\ \text{m}^2$. Treat it as a uniform tube floating upright. How deep does it float in water, and in a liquid of density $800\ \text{kg m}^{-3}$?

1. Floating: upthrust = weight, so $\rho A d g = mg$ and $d = \dfrac{m}{\rho A}$.
2. In water: $d = \dfrac{0.030}{1000 \times 1.5 \times 10^{-4}} = 0.20\ \text{m}$.
3. In the lighter liquid: $d = \dfrac{0.030}{800 \times 1.5 \times 10^{-4}} = 0.25\ \text{m}$: it floats lower, as expected.
:::

## Manometers

A U-tube manometer contains a liquid. One arm is connected to a gas supply and the other is open to the air. If the liquid in the open arm stands $\Delta h$ higher, the gas pressure exceeds atmospheric pressure by $\rho g \Delta h$. With water and $\Delta h = 0.15\ \text{m}$, the excess pressure is $1000 \times 9.81 \times 0.15 = 1.47 \times 10^{3}\ \text{Pa}$. Mercury, 13.6 times denser than water, is used for larger pressures.

## Common mistakes

:::mistake{title="Using the object's density for upthrust"}
Upthrust depends on the density of the **fluid** and the volume displaced, not on what the object is made of.
:::

:::mistake{title="Upthrust increases with depth"}
For a fully submerged incompressible object the upthrust does not change with depth: both face pressures increase by the same amount, so the difference stays the same.
:::

:::mistake{title="Forgetting atmospheric pressure, or adding it wrongly"}
Read whether the question asks for the pressure *due to the liquid* ($\rho g h$) or the *total* pressure ($p_0 + \rho g h$).
:::

:::mistake{title="Units"}
Convert $\text{g cm}^{-3}$ to $\text{kg m}^{-3}$ (multiply by 1000), cm to m, and $\text{cm}^2$ to $\text{m}^2$ (multiply by $10^{-4}$).
:::

## Exam tips

:::exam-tip{title="Derive and explain"}
*Show that $p = \rho g h$*: state volume $Ah$, mass $\rho A h$, weight $\rho A h g$, and divide by $A$. *Explain the origin of upthrust*: pressure increases with depth, so the upward force on the lower surface is greater than the downward force on the upper surface.
:::

:::exam-tip{title="Floating problems"}
Write "floating, so upthrust = weight" before substituting: it is usually the method mark.
:::

:::exam-tip{title="Which papers"}
Density, pressure and upthrust appear in multiple-choice papers (Cambridge Paper 1, ZIMSEC Paper 1) and short structured questions (Paper 2), often combined with forces in equilibrium.
:::

## Summary

:::summary
- $\rho = m/V$; $p = F/A$ with $F$ normal to the surface; $1\ \text{Pa} = 1\ \text{N m}^{-2}$.
- In a fluid, $\Delta p = \rho g \Delta h$; total pressure $= p_0 + \rho g h$; the shape of the container does not matter.
- Upthrust comes from the greater pressure on the lower surface; $F = \rho_{\text{fluid}} g V_{\text{displaced}}$ (Archimedes).
- A floating object displaces its own weight of fluid; the fraction immersed is $\rho_{\text{object}}/\rho_{\text{fluid}}$.
- Hydrometers float lower in less dense liquids; a manometer's height difference gives excess pressure $\rho g \Delta h$.
:::
