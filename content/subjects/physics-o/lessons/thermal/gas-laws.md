---
{
  "key": "thermal.gas-laws",
  "title": "Gas pressure, temperature and volume",
  "summary": "Explain gas pressure with particles, describe how temperature and volume affect it, convert to kelvin, and use Boyle's law (and, for ZIMSEC, Charles's law and the equation of state).",
  "concepts": ["phys.thermal.gas-laws"],
  "objectives": ["cambridge/igcse/physics:2.1.3.1", "cambridge/igcse/physics:2.1.3.2", "cambridge/igcse/physics:2.1.3.3", "zimsec/o-level/physics:7.1.3", "zimsec/o-level/physics:7.1.4"],
  "estimatedMinutes": 25
}
---
## Introduction

A minibus driver checks the tyres before a long trip from Bulawayo to Victoria Falls; by midday, after hours on hot tar, the tyre pressure has risen. A bicycle pump gets harder to push as you squeeze the air. Both are explained by **gas particles colliding** with surfaces.

## Key definitions

:::definition{term="Gas pressure"}
The force per unit area exerted by gas particles colliding with the walls of their container.
:::

:::definition{term="Kelvin scale"}
An absolute temperature scale that starts at absolute zero: $T\ (\text{K}) = \theta\ (^\circ\text{C}) + 273$.
:::

## Explaining gas pressure

Gas particles move randomly at high speed. Each time one hits a wall and bounces off, it pushes on the wall. Billions of collisions every second produce a steady force on every square metre of wall: the gas pressure.

### Heating a gas at constant volume

Heating makes the particles move **faster**. They hit the walls **more often** and **harder**, so the pressure **increases**. That is why tyre pressure rises on a hot day, and why aerosol cans warn "do not heat".

### Squashing a gas at constant temperature

Pushing a piston in reduces the volume. The particles are crowded into a smaller space, so they hit each unit area of wall **more often**, and the pressure **increases**, even though they move at the same speed.

## The kelvin scale

$0\ \text{K}$ is absolute zero ($-273\ ^\circ\text{C}$). One kelvin is the same size as one degree Celsius, so to convert, add 273: $27\ ^\circ\text{C} = 300\ \text{K}$, and $0\ ^\circ\text{C} = 273\ \text{K}$. Gas-law calculations must use kelvin.

## Boyle's law (Cambridge Supplement and ZIMSEC)

For a fixed mass of gas at constant temperature, pressure × volume is constant:

$$
pV = \text{constant} \qquad \text{or} \qquad p_1V_1 = p_2V_2
$$

A graph of $p$ against $V$ is a curve (pressure halves when volume doubles); a graph of $p$ against $\dfrac{1}{V}$ is a straight line through the origin.

![Boyle's law graphs for the syringe air: p against V is a curve passing through (2.0 litres, 120 kPa) and (0.80 litres, 300 kPa); p against 1/V is a straight line through the origin, because pV is constant at 240.](media:diagrams/gas-boyle-graphs.png "Figure: Boyle's law, pressure against volume and against 1/V")

:::worked-solution[Compressing air in a syringe]
Air in a sealed syringe has a volume of $2.0\ \text{litres}$ at $120\ \text{kPa}$. It is slowly pushed in, at constant temperature, to $0.80\ \text{litres}$.

1. $p_1V_1 = p_2V_2$: $120 \times 2.0 = p_2 \times 0.80$.
2. $p_2 = \dfrac{240}{0.80} = 300\ \text{kPa}$.
:::

## Charles's law and the equation of state (ZIMSEC)

For a fixed mass of gas at **constant pressure**, the volume is proportional to the **kelvin** temperature: $\dfrac{V}{T} = \text{constant}$ (Charles's law).

![Charles's law graph: for gas at constant pressure the volume is directly proportional to the kelvin temperature, a straight line through the origin; 3.0 litres at 290 K (17 degrees C) rises to 3.6 litres at 350 K (77 degrees C).](media:diagrams/gas-charles-volume-kelvin.png "Figure: Charles's law, volume against kelvin temperature at constant pressure")

Combining Boyle's and Charles's laws gives the **equation of state** for a fixed mass of gas:

$$
\frac{p_1V_1}{T_1} = \frac{p_2V_2}{T_2}
$$

:::worked-solution[Warming a balloon of gas]
A gas has a volume of $3.0\ \text{litres}$ at $17\ ^\circ\text{C}$. It is heated at constant pressure to $77\ ^\circ\text{C}$.

1. Convert to kelvin: $T_1 = 290\ \text{K}$, $T_2 = 350\ \text{K}$.
2. $\dfrac{V_1}{T_1} = \dfrac{V_2}{T_2}$: $V_2 = 3.0 \times \dfrac{350}{290} = 3.6\ \text{litres}$.
:::

## Common mistakes

:::mistake{title="Using degrees Celsius"}
Charles's law and the equation of state need kelvin. Using $17$ and $77$ instead of $290$ and $350$ gives a badly wrong answer.
:::

:::mistake{title="Faster particles in a compressed gas"}
When a gas is compressed at constant temperature, the particles move at the same speed; they just hit the walls more often.
:::

## Exam tips

:::exam-tip
Pressure explanations need two ideas: the **frequency** of collisions and the **force** of each collision. Say which ones change.
:::

:::exam-tip
Write the law you are using, substitute with units, and state the condition ("at constant temperature" or "at constant pressure").
:::

## Summary

:::summary
- Gas pressure is caused by particles colliding with the walls.
- Heating at constant volume raises the pressure: faster particles hit harder and more often.
- Compressing at constant temperature raises the pressure: more frequent collisions.
- $T\ (\text{K}) = \theta\ (^\circ\text{C}) + 273$; absolute zero is $0\ \text{K}$.
- Boyle's law: $pV$ = constant. ZIMSEC also: $V/T$ = constant and $p_1V_1/T_1 = p_2V_2/T_2$.
:::
