---
{
  "key": "thermal.specific-heat-capacity",
  "title": "Specific heat capacity",
  "summary": "Relate a temperature rise to internal energy and particle kinetic energy, use ΔE = mcΔθ, and describe experiments to measure the specific heat capacity of a solid and a liquid.",
  "concepts": ["phys.thermal.specific-heat-capacity"],
  "objectives": ["cambridge/igcse/physics:2.2.2.1", "cambridge/igcse/physics:2.2.2.2", "cambridge/igcse/physics:2.2.2.3", "cambridge/igcse/physics:2.2.2.4", "zimsec/o-level/physics:7.2.8", "zimsec/o-level/physics:7.2.9"],
  "estimatedMinutes": 28,
  "level": "extended"
}
---
## Introduction

At midday the sand on the shore of Lake Kariba is too hot to walk on, yet the water is pleasantly cool. Both receive the same sunshine. Water needs far more energy than sand to warm up by each degree: it has a much higher **specific heat capacity**. This property explains why lakes moderate the climate around them and why water is used in car radiators and hot-water bottles.

For Cambridge, the equation and experiments are Supplement content; ZIMSEC covers them in topic 7.2.

## Key definitions

:::definition{term="Internal energy"}
The total energy of the particles of an object (their kinetic and potential energies). Raising the temperature increases the internal energy.
:::

:::definition{term="Specific heat capacity, c"}
The energy needed to raise the temperature of $1\ \text{kg}$ of a substance by $1\ ^\circ\text{C}$.
:::

:::formula{name="Specific heat capacity"}
$$
c = \frac{\Delta E}{m\Delta\theta} \qquad \text{so} \qquad \Delta E = mc\Delta\theta
$$

Unit: $\text{J/(kg}\ ^\circ\text{C)}$ (or $\text{J/(kg K)}$).
:::

## Temperature and particles

When an object is heated, its particles move faster on average: a temperature rise is an increase in the **average kinetic energy** of all its particles. Different substances need different amounts of energy to make their particles speed up by the same amount, so they have different specific heat capacities.

| Substance | $c$ / J/(kg °C) |
| --- | --- |
| water | 4200 |
| aluminium | 900 |
| sand (dry) | about 800 |
| copper | 390 |

## Calculations

:::worked-solution[Heating water for tea]
How much energy is needed to heat $2.0\ \text{kg}$ of water from $20\ ^\circ\text{C}$ to $70\ ^\circ\text{C}$? ($c = 4200\ \text{J/(kg}\ ^\circ\text{C)}$)

1. $\Delta\theta = 70 - 20 = 50\ ^\circ\text{C}$.
2. $\Delta E = mc\Delta\theta = 2.0 \times 4200 \times 50 = 420\,000\ \text{J}$ ($420\ \text{kJ}$).
:::

## Measuring specific heat capacity

### A solid (for example an aluminium block)

1. Measure the mass of the block on a balance.
2. Put an electric heater and a thermometer into holes drilled in the block, and wrap the block in insulation.
3. Record the starting temperature, switch on the heater and time it with a stop-watch; record the voltage $V$ and current $I$ (or read a joulemeter).
4. Switch off, wait for the highest temperature, and find the temperature rise.
5. Energy supplied $= IVt$ (ZIMSEC writes $\Delta Q = mc(\theta_2 - \theta_1) = IVt$); then $c = \dfrac{IVt}{m\Delta\theta}$.

![Apparatus for measuring the specific heat capacity of a 1.0 kg aluminium block: an electric heater and a thermometer in holes in the block, insulation round it, and a circuit with an ammeter to find the power. A 50 W heater for 300 s supplies 15 000 J, giving a 16.5 degree rise and c of about 909 J per kg per degree Celsius.](media:diagrams/shc-block-experiment.png "Figure: measuring the specific heat capacity of a metal block")

:::worked-solution[Results for an aluminium block]
A $1.0\ \text{kg}$ block is heated by a $50\ \text{W}$ heater for $300\ \text{s}$, and its temperature rises by $16.5\ ^\circ\text{C}$.

1. Energy supplied $= Pt = 50 \times 300 = 15\,000\ \text{J}$.
2. $c = \dfrac{15\,000}{1.0 \times 16.5} = 909\ \text{J/(kg}\ ^\circ\text{C)}$.
3. This is close to the accepted $900\ \text{J/(kg}\ ^\circ\text{C)}$; the experimental value is usually a little high, because some energy escapes to the surroundings.
:::

### A liquid (for example water)

Use a known mass of water in an insulated container (a polystyrene cup or a calorimeter), heat it with an immersion heater for a measured time, stir, and measure the temperature rise. Calculate $c$ in the same way.

## Common mistakes

:::mistake{title="Using the final temperature instead of the change"}
$\Delta\theta$ is the **change** in temperature: subtract the starting temperature.
:::

:::mistake{title="Mass in grams"}
With $c$ in J/(kg °C), the mass must be in kilograms.
:::

## Exam tips

:::exam-tip
For experiment questions, list the measurements (mass, start and final temperature, voltage, current and time, or joulemeter readings), say how heat losses are reduced (insulation, a lid, stirring), and give the formula.
:::

:::exam-tip
Explain why measured values are usually too high: energy lost to the surroundings is counted as if it heated the block.
:::

## Summary

:::summary
- Heating raises internal energy; temperature rise means a higher average kinetic energy of the particles.
- Specific heat capacity: energy per kg per °C; $\Delta E = mc\Delta\theta$.
- Water has a very high specific heat capacity, 4200 J/(kg °C).
- Measure $c$ with an electric heater: $c = \dfrac{IVt}{m\Delta\theta}$, with insulation to reduce losses.
- Heat losses make experimental values too high.
:::
