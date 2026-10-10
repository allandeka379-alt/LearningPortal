---
{
  "key": "matter.fluid-flow",
  "title": "Fluid flow: the continuity equation and Bernoulli's equation",
  "summary": "Distinguish streamline and turbulent flow, model an ideal fluid, use the continuity equation A₁v₁ = A₂v₂ and Bernoulli's equation p + ½ρv² + ρgh = constant, and explain the Venturi meter, aerofoil lift, the spray atomiser, the filter pump and the Bunsen burner.",
  "concepts": ["aphys.matter.fluid-flow"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Put your thumb over the end of a garden hose and the water shoots out much faster. Water from a borehole pump speeds up where the pipe narrows; air rushing over the curved top of an aircraft wing produces lift; a Bunsen burner draws in air through a hole at its base without any fan. All of these follow from two conservation laws applied to a moving fluid: conservation of mass (the **continuity equation**) and conservation of energy (**Bernoulli's equation**).

You should already know pressure $p = F/A$, hydrostatic pressure $\Delta p = \rho g \Delta h$, kinetic and gravitational potential energy, and the work-energy principle.

## Key definitions

:::definition{term="Streamline (laminar) flow"}
Flow in which every particle passing a given point follows the same path (a streamline) with the same velocity as the particles that passed that point before it. Streamlines never cross.
:::

:::definition{term="Turbulent flow"}
Flow in which the velocity at a point changes erratically in size and direction, with eddies and mixing; streamlines cannot be drawn.
:::

:::definition{term="Ideal fluid"}
A fluid that is incompressible (constant density) and non-viscous (no internal friction), flowing steadily without turbulence.
:::

:::definition{term="Volume flow rate"}
The volume of fluid passing a cross-section per unit time, $Q = Av$, measured in $\text{m}^3\ \text{s}^{-1}$.
:::

:::formula{name="Continuity equation"}
$$
A_1v_1 = A_2v_2
$$

$A$ = cross-sectional area of the pipe (m²), $v$ = mean speed of the fluid there (m s⁻¹). Valid for an incompressible fluid.
:::

:::formula{name="Bernoulli's equation"}
$$
p + \tfrac{1}{2}\rho v^2 + \rho g h = \text{constant along a streamline}
$$

$p$ = static pressure (Pa), $\rho$ = density (kg m⁻³), $v$ = speed (m s⁻¹), $h$ = height above a reference level (m), $g = 9.81\ \text{m s}^{-2}$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Fluid flow is ZIMSEC Form 6 only (scope to be confirmed against the syllabus); it is not in Cambridge 9702. Viscosity calculations (Stokes' law, Poiseuille) are outside this concept.
:::

## Streamline and turbulent flow

At low speeds, water flowing smoothly through a pipe or air flowing gently past a car moves in layers that slide past one another: streamline flow. Above a critical speed, which is lower for wider pipes and less viscous fluids, the flow breaks up into eddies: turbulent flow. Turbulence wastes energy, so Bernoulli's equation, which assumes no energy losses, applies only to streamline flow of an ideal fluid. Real liquids such as water in a short pipe come close to this ideal.

## The continuity equation

In time $\Delta t$, fluid passing section 1 moves a distance $v_1\Delta t$, so a volume $A_1v_1\Delta t$ passes. For an incompressible fluid with no leaks, the same volume must pass section 2 in the same time:

$$
A_1v_1\Delta t = A_2v_2\Delta t \quad\Rightarrow\quad A_1v_1 = A_2v_2
$$

The fluid speeds up where the pipe is narrower. For circular pipes, $v \propto 1/d^2$: halving the diameter quadruples the speed.

:::worked-solution[Water speeding up in a nozzle]
A hose of internal diameter $20\ \text{mm}$ delivers $0.40$ litres of water per second through a nozzle of diameter $6.0\ \text{mm}$. Find the speed in the hose and at the nozzle.

1. $Q = 0.40 \times 10^{-3}\ \text{m}^3\ \text{s}^{-1}$; $A_1 = \dfrac{\pi(0.020)^2}{4} = 3.14 \times 10^{-4}\ \text{m}^2$.
2. $v_1 = \dfrac{Q}{A_1} = \dfrac{0.40 \times 10^{-3}}{3.14 \times 10^{-4}} = 1.27\ \text{m s}^{-1}$.
3. $\dfrac{v_2}{v_1} = \dfrac{A_1}{A_2} = \left(\dfrac{20}{6.0}\right)^2 = 11.1$, so $v_2 = 1.27 \times 11.1 = 14.1\ \text{m s}^{-1}$.
:::

## Bernoulli's equation from energy conservation

Consider a small volume $V$ of fluid moving along a streamline from section 1 to section 2. The fluid behind it pushes it forward with pressure $p_1$, doing work $p_1V$; the fluid ahead pushes back with $p_2$, so work $p_2V$ is done against it. The net work done on the volume equals its gain in kinetic and gravitational potential energy:

$$
p_1V - p_2V = \left(\tfrac{1}{2}mv_2^2 - \tfrac{1}{2}mv_1^2\right) + (mgh_2 - mgh_1)
$$

Dividing by $V$ and using $m/V = \rho$ gives $p_1 + \tfrac{1}{2}\rho v_1^2 + \rho g h_1 = p_2 + \tfrac{1}{2}\rho v_2^2 + \rho g h_2$. Each term is an energy per unit volume, with unit $\text{J m}^{-3} = \text{Pa}$.

The key consequence for a horizontal pipe: **where the speed is higher, the pressure is lower.**

## The Venturi meter

A Venturi meter is a horizontal pipe with a smooth narrowing (the throat) of area $A_2$. Two vertical tubes, or a differential manometer, measure the pressure difference $\Delta p = p_1 - p_2$ between the wide section and the throat. Combining $v_2 = v_1A_1/A_2$ with Bernoulli's equation:

$$
\Delta p = \tfrac{1}{2}\rho v_1^2\left[\left(\frac{A_1}{A_2}\right)^2 - 1\right]
$$

:::worked-solution[Flow rate from a Venturi meter]
Water ($\rho = 1000\ \text{kg m}^{-3}$) flows through a Venturi meter with $A_1 = 2.0 \times 10^{-3}\ \text{m}^2$ and $A_2 = 0.50 \times 10^{-3}\ \text{m}^2$. The pressure difference is $12\ \text{kPa}$. Find the speed in the wide pipe and the volume flow rate.

1. $\left(\dfrac{A_1}{A_2}\right)^2 - 1 = 4.0^2 - 1 = 15$.
2. $v_1 = \sqrt{\dfrac{2\Delta p}{15\rho}} = \sqrt{\dfrac{2 \times 12 \times 10^{3}}{15 \times 1000}} = \sqrt{1.6} = 1.26\ \text{m s}^{-1}$.
3. $v_2 = 4.0 \times 1.26 = 5.06\ \text{m s}^{-1}$ (check: $\tfrac{1}{2} \times 1000 \times (5.06^2 - 1.26^2) = 12\ \text{kPa}$).
4. $Q = A_1v_1 = 2.0 \times 10^{-3} \times 1.26 = 2.5 \times 10^{-3}\ \text{m}^3\ \text{s}^{-1}$.
:::

## Other applications

- **Aerofoil (aircraft wing).** The shape and angle of attack make air flow faster over the upper surface than under the lower surface. By Bernoulli's equation the pressure above is lower, so there is a net upward force: lift $= \Delta p \times$ wing area.
- **Spray atomiser (perfume spray, paint spray gun).** Squeezing the bulb drives a fast air jet across the top of a narrow tube dipping into the liquid. The low pressure in the jet lets atmospheric pressure on the liquid surface push liquid up the tube, where the jet breaks it into droplets.
- **Filter pump.** Water from a tap is forced through a narrow jet; its high speed lowers the pressure around it, so air is drawn in from a side tube connected to a flask, used to speed up filtration.
- **Bunsen burner.** Gas emerges from a narrow jet at high speed and low pressure, so air is drawn in through the air hole and mixes with the gas before burning.
- **Water leaving a tank.** For water escaping through a small hole a depth $h$ below the surface, both points are at atmospheric pressure, so $\tfrac{1}{2}\rho v^2 = \rho g h$ and $v = \sqrt{2gh}$.

## Common mistakes

:::mistake{title="Saying faster fluid has higher pressure"}
In a horizontal streamline, a higher speed means a **lower** static pressure; the energy per unit volume is shared between pressure and kinetic terms.
:::

:::mistake{title="Using diameter as if it were area"}
$A_1/A_2 = (d_1/d_2)^2$. Halving the diameter makes the speed four times larger, not twice.
:::

:::mistake{title="Applying Bernoulli to turbulent or viscous flow"}
The equation assumes no energy is dissipated. State the ideal-fluid assumptions when you use it.
:::

:::mistake{title="Mixing units"}
Convert litres to m³ ($1\ \text{L} = 10^{-3}\ \text{m}^3$), mm² to m², and kPa to Pa before substituting.
:::

## Exam tips

:::exam-tip{title="Derive and explain"}
For *derive Bernoulli's equation*, state the work done by the pressure difference, equate it to the gain in kinetic plus potential energy, and divide by volume. For *explain lift*, link faster flow over the top to lower pressure and multiply the pressure difference by the area.
:::

:::exam-tip{title="State the assumptions"}
Many marks go to "incompressible, non-viscous, steady streamline flow" when you are asked when the equations apply.
:::

:::exam-tip{title="Which papers"}
Expect continuity and Bernoulli calculations in ZIMSEC Papers 2 and 3, and the applications in Paper 1 multiple choice.
:::

## Summary

:::summary
- Streamline flow: steady, non-crossing paths; turbulent flow: eddies and energy loss.
- Continuity: $A_1v_1 = A_2v_2$ for an incompressible fluid; narrower pipe, faster flow.
- Bernoulli: $p + \tfrac{1}{2}\rho v^2 + \rho g h$ is constant along a streamline of an ideal fluid; each term is energy per unit volume.
- In a horizontal pipe, faster flow means lower pressure: Venturi meter, aerofoil, atomiser, filter pump, Bunsen burner.
- Water escaping from a depth $h$ below an open surface leaves at $v = \sqrt{2gh}$.
:::
