---
{
  "key": "gases.kinetic-theory",
  "title": "Kinetic theory of gases",
  "summary": "State the assumptions of the kinetic theory, explain gas pressure by molecular collisions, derive pV = ⅓Nm⟨c²⟩ from a one-dimensional model extended to three dimensions, use mean-square and root-mean-square speeds, and compare with pV = NkT to show that the mean translational kinetic energy of a molecule is (3/2)kT.",
  "concepts": ["aphys.gases.kinetic-theory"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

The air in a classroom in Gweru presses on every square metre of wall with a force of about $10^{5}\ \text{N}$, yet nothing visibly pushes. That force comes from about $3 \times 10^{27}$ molecular impacts per second on each square metre, each one tiny. Kinetic theory explains the large-scale properties of a gas, pressure and temperature, from the motion of its molecules. It is one of the great successes of physics: from Newton's laws and a few simple assumptions, it derives the ideal gas equation and gives temperature a molecular meaning.

You should already know momentum and Newton's second law in the form $F = \Delta p/\Delta t$, the ideal gas equation $pV = NkT$, and the kinetic molecular model.

## Key definitions

:::definition{term="Mean-square speed"}
For $N$ molecules with speeds $c_1, c_2, \ldots, c_N$, the mean-square speed is $\langle c^2\rangle = \dfrac{c_1^2 + c_2^2 + \cdots + c_N^2}{N}$.
:::

:::definition{term="Root-mean-square speed"}
The square root of the mean-square speed, $c_{\text{r.m.s.}} = \sqrt{\langle c^2\rangle}$.
:::

:::formula{name="Kinetic theory equation"}
$$
pV = \tfrac{1}{3}Nm\langle c^2\rangle \qquad\text{or}\qquad p = \tfrac{1}{3}\rho\langle c^2\rangle
$$

$p$ = pressure (Pa), $V$ = volume (m³), $N$ = number of molecules, $m$ = mass of one molecule (kg), $\langle c^2\rangle$ = mean-square speed (m² s⁻²), $\rho = Nm/V$ = density (kg m⁻³).
:::

:::formula{name="Mean translational kinetic energy of a molecule"}
$$
\tfrac{1}{2}m\langle c^2\rangle = \tfrac{3}{2}kT
$$

$k = 1.38 \times 10^{-23}\ \text{J K}^{-1}$, $T$ in kelvin. Hence $c_{\text{r.m.s.}} = \sqrt{\dfrac{3kT}{m}}$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: ZIMSEC Form 6 and Cambridge A Level only (15.3, Paper 4). Cambridge expects the derivation with the one-dimensional model and $\langle c^2\rangle = 3\langle c_x^2\rangle$.
:::

## Assumptions of the kinetic theory

1. A gas consists of a very large number of identical molecules in continuous **random motion**.
2. The **volume of the molecules is negligible** compared with the volume of the container.
3. There are **no forces between molecules** except during collisions.
4. Collisions of molecules with each other and with the walls are **perfectly elastic**.
5. The **duration of a collision is negligible** compared with the time between collisions.
6. Molecules obey Newton's laws of motion.

These are the conditions for an ideal gas. A real gas fails assumptions 2 and 3 at high pressure and low temperature.

## Explaining pressure

When a molecule hits a wall and rebounds, its momentum changes. By Newton's second law the wall exerts a force on it, and by Newton's third law it exerts an equal and opposite force on the wall. Countless impacts every second add up to a steady average force, and the force per unit area is the pressure. Heating the gas makes the molecules faster, so each impact transfers more momentum and impacts are more frequent: the pressure rises. Compressing the gas puts more molecules near each wall, so impacts are more frequent: again the pressure rises.

## Deriving pV = ⅓Nm⟨c²⟩

Consider a cube of side $L$ containing $N$ molecules, each of mass $m$.

**One molecule, one direction.** A molecule has velocity component $c_x$ towards the shaded wall (area $L^2$, perpendicular to $x$).

1. It hits the wall and rebounds elastically with $-c_x$. Change of momentum $= -mc_x - mc_x = -2mc_x$; the momentum given to the wall is $+2mc_x$.
2. It travels to the opposite wall and back, distance $2L$, before hitting the same wall again: time between hits $\Delta t = \dfrac{2L}{c_x}$.
3. Mean force on the wall from this molecule $= \dfrac{2mc_x}{2L/c_x} = \dfrac{mc_x^2}{L}$.

**All molecules.** Total force $= \dfrac{m}{L}\left(c_{x1}^2 + c_{x2}^2 + \cdots\right) = \dfrac{Nm\langle c_x^2\rangle}{L}$, so the pressure is

$$
p = \frac{F}{L^2} = \frac{Nm\langle c_x^2\rangle}{L^3} = \frac{Nm\langle c_x^2\rangle}{V}
$$

**Three dimensions.** For each molecule $c^2 = c_x^2 + c_y^2 + c_z^2$. Because the motion is random, no direction is preferred, so $\langle c_x^2\rangle = \langle c_y^2\rangle = \langle c_z^2\rangle = \tfrac{1}{3}\langle c^2\rangle$. Substituting:

$$
pV = \tfrac{1}{3}Nm\langle c^2\rangle
$$

Collisions between molecules do not affect the result: they exchange momentum, but the total momentum carried to the walls, on average, is unchanged.

## Mean-square and r.m.s. speeds

The molecules have a wide spread of speeds, constantly changed by collisions. The equation uses the **mean of the squares** of the speeds, not the square of the mean speed.

:::worked-solution[Mean, mean-square and r.m.s. speeds]
Five molecules have speeds $300$, $400$, $500$, $600$ and $700\ \text{m s}^{-1}$. Find the mean speed, the mean-square speed and the r.m.s. speed.

1. Mean speed $= \dfrac{300 + 400 + 500 + 600 + 700}{5} = 500\ \text{m s}^{-1}$.
2. Mean-square speed $= \dfrac{300^2 + 400^2 + 500^2 + 600^2 + 700^2}{5} = \dfrac{1.35 \times 10^{6}}{5} = 2.70 \times 10^{5}\ \text{m}^2\ \text{s}^{-2}$.
3. r.m.s. speed $= \sqrt{2.70 \times 10^{5}} = 520\ \text{m s}^{-1}$: slightly larger than the mean, because squaring weights the faster molecules more.
:::

Using $p = \tfrac{1}{3}\rho\langle c^2\rangle$, the r.m.s. speed can be found from measurable quantities: for a gas of density $1.25\ \text{kg m}^{-3}$ at $1.01 \times 10^{5}\ \text{Pa}$, $c_{\text{r.m.s.}} = \sqrt{3p/\rho} = \sqrt{3 \times 1.01 \times 10^{5}/1.25} = 492\ \text{m s}^{-1}$, faster than the speed of sound in that gas.

## Temperature and molecular kinetic energy

Comparing $pV = \tfrac{1}{3}Nm\langle c^2\rangle$ with $pV = NkT$:

$$
\tfrac{1}{3}Nm\langle c^2\rangle = NkT \quad\Rightarrow\quad \tfrac{1}{2}m\langle c^2\rangle = \tfrac{3}{2}kT
$$

The **mean translational kinetic energy of a molecule is proportional to the thermodynamic temperature**, and is the same for every ideal gas at a given temperature. This is the molecular meaning of temperature. For one mole, the total translational kinetic energy is $\tfrac{3}{2}RT$.

:::worked-solution[r.m.s. speed of nitrogen molecules]
Find the mean translational kinetic energy and the r.m.s. speed of nitrogen molecules (molar mass $0.028\ \text{kg mol}^{-1}$) at $300\ \text{K}$.

1. $\tfrac{3}{2}kT = 1.5 \times 1.38 \times 10^{-23} \times 300 = 6.21 \times 10^{-21}\ \text{J}$.
2. $m = \dfrac{0.028}{6.02 \times 10^{23}} = 4.65 \times 10^{-26}\ \text{kg}$.
3. $c_{\text{r.m.s.}} = \sqrt{\dfrac{3kT}{m}} = \sqrt{\dfrac{3 \times 1.38 \times 10^{-23} \times 300}{4.65 \times 10^{-26}}} = 517\ \text{m s}^{-1}$.
:::

**Different gases at the same temperature** have the same mean kinetic energy, so lighter molecules move faster: $c_{\text{r.m.s.}} \propto 1/\sqrt{m}$. Hydrogen molecules (molar mass $0.002\ \text{kg mol}^{-1}$) move $\sqrt{14} \approx 3.7$ times faster than nitrogen molecules at the same temperature. And for one gas, $c_{\text{r.m.s.}} \propto \sqrt{T}$: doubling the kelvin temperature increases the r.m.s. speed by $\sqrt{2}$.

## Common mistakes

:::mistake{title="Squaring the mean speed"}
$\langle c^2\rangle$ is the mean of the squares. $(\text{mean speed})^2$ is smaller.
:::

:::mistake{title="Using the molar mass as the molecular mass"}
In $\tfrac{1}{2}m\langle c^2\rangle = \tfrac{3}{2}kT$, $m$ is the mass of **one molecule**, $M/N_A$, in kg.
:::

:::mistake{title="Forgetting the factor 2 in the momentum change"}
The molecule reverses, so its momentum changes by $2mc_x$, not $mc_x$.
:::

:::mistake{title="Saying doubling T doubles the speed"}
Doubling $T$ doubles the mean kinetic energy; the r.m.s. speed increases by a factor of $\sqrt{2}$.
:::

## Exam tips

:::exam-tip{title="Derive"}
Number the steps: change of momentum $2mc_x$; time between collisions $2L/c_x$; force $mc_x^2/L$; sum over $N$ molecules; pressure $= F/L^2$; then $\langle c_x^2\rangle = \tfrac{1}{3}\langle c^2\rangle$ because the motion is random. State where each assumption is used.
:::

:::exam-tip{title="Show that"}
For *show that the mean kinetic energy is (3/2)kT*, equate $\tfrac{1}{3}Nm\langle c^2\rangle$ and $NkT$ explicitly, then rearrange.
:::

:::exam-tip{title="Which papers"}
Cambridge Paper 4 (derivations and calculations); ZIMSEC Papers 2 and 3.
:::

## Summary

:::summary
- Assumptions: random motion, negligible molecular volume, no intermolecular forces except in collisions, elastic collisions, negligible collision time.
- Pressure results from the rate of change of momentum of molecules hitting the walls.
- $pV = \tfrac{1}{3}Nm\langle c^2\rangle$, derived using $\langle c_x^2\rangle = \tfrac{1}{3}\langle c^2\rangle$.
- $\tfrac{1}{2}m\langle c^2\rangle = \tfrac{3}{2}kT$: mean translational kinetic energy ∝ thermodynamic temperature.
- $c_{\text{r.m.s.}} = \sqrt{3kT/m}$: lighter molecules move faster at the same temperature.
:::
