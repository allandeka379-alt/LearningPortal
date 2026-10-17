---
{
  "key": "energy.power",
  "title": "Power and the equation P = Fv",
  "summary": "Define power and the watt, derive P = Fv, and solve problems on vehicles moving against resistive forces, lifting motors and pumps, including input power, output power and efficiency.",
  "concepts": ["aphys.energy.power"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

Two kombis can both climb the hill out of Mutare towards Christmas Pass, but the one with the more powerful engine climbs it faster. Power is not about how much energy is transferred, but how quickly. It decides the top speed of a vehicle, the rate at which a borehole pump fills a tank, and the size of motor needed for a mine hoist.

You should be confident with work done ($W = Fs$), kinetic and potential energy, efficiency, and Newton's second law. Electrical power ($P = VI$) is covered in the electricity topic; the ideas here apply to any energy transfer.

## Key definitions

:::definition{term="Power"}
The work done per unit time, or the rate of energy transfer.
:::

:::definition{term="The watt"}
A power of one joule per second: $1\ \text{W} = 1\ \text{J s}^{-1} = 1\ \text{kg m}^2\,\text{s}^{-3}$.
:::

:::formula{name="Power"}
$$
P = \frac{W}{t} = \frac{\Delta E}{t}
$$

$W$ is the work done (or $\Delta E$ the energy transferred) in J, in time $t$ in s. For a varying rate this gives the **average** power.
:::

:::formula{name="Power of a force moving its point of application"}
$$
P = Fv
$$

$F$ is the force in N and $v$ the velocity in $\text{m s}^{-1}$ in the direction of the force. This gives the **instantaneous** power.
:::

:::formula{name="Efficiency in terms of power"}
$$
\text{efficiency} = \frac{\text{useful power output}}{\text{total power input}} \times 100\%
$$
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards define power, derive $P = Fv$ and use it with efficiency (Cambridge AS 5.1.3–5.1.4; ZIMSEC Form 5).
:::

## Deriving $P = Fv$

1. A constant force $F$ moves its point of application a small displacement $\Delta s$ in its own direction in time $\Delta t$.
2. Work done: $\Delta W = F\Delta s$.
3. Power: $P = \dfrac{\Delta W}{\Delta t} = F\dfrac{\Delta s}{\Delta t}$.
4. $\dfrac{\Delta s}{\Delta t}$ is the velocity $v$, so $P = Fv$.

## Vehicles at constant speed

At constant velocity there is no resultant force, so the driving force from the engine (through the wheels) exactly balances the total resistive force (air resistance and rolling resistance), plus, on a hill, the component of weight down the slope.

:::worked-solution[A kombi on a level road]
A kombi travels at a constant $25\ \text{m s}^{-1}$ on a level road. The total resistive force is $1800\ \text{N}$. Find the useful power output of the engine.

1. Constant speed, so driving force = resistive force = $1800\ \text{N}$.
2. $P = Fv = 1800 \times 25 = 45\,000\ \text{W} = 45\ \text{kW}$.
:::

:::worked-solution[A truck climbing a hill]
A truck of mass $15\,000\ \text{kg}$ climbs a road that rises $1\ \text{m}$ for every $20\ \text{m}$ travelled along it, at a steady $12\ \text{m s}^{-1}$. The resistive force is $4000\ \text{N}$.

1. Slope: $\sin\theta = 1/20 = 0.050$.
2. Component of weight down the slope $= mg\sin\theta = 15\,000 \times 9.81 \times 0.050 = 7357.5\ \text{N}$.
3. Driving force $= 4000 + 7357.5 = 11\,357.5\ \text{N}$.
4. Power $= Fv = 11\,357.5 \times 12 = 1.36 \times 10^{5}\ \text{W}$ (136 kW).
:::

## Maximum speed and acceleration

An engine's maximum useful power is fixed. At low speed, $P = Fv$ allows a large driving force, so the vehicle accelerates. As it speeds up, the driving force available, $F = P/v$, falls while air resistance rises. The top speed is reached when the driving force at full power equals the total resistive force.

![Driving force against speed for a 1000 kg car with maximum power 60 kW: the curve F = P/v gives 3000 N at 20 m/s, where the resistive force is 1200 N, leaving a resultant of 1800 N (a = 1.8 m/s²); at 30 m/s the force is 2000 N, equal to the resistive force, so 30 m/s is the top speed.](media:diagrams/power-force-speed-graph.png "Figure: full-power driving force falls as speed rises until it equals the resistive force")

:::worked-solution[Top speed and acceleration of a car]
A car of mass $1000\ \text{kg}$ has a maximum useful power of $60\ \text{kW}$.

1. At its top speed the resistive force is $2000\ \text{N}$: $v_{\max} = \dfrac{P}{F} = \dfrac{60\,000}{2000} = 30\ \text{m s}^{-1}$.
2. At $20\ \text{m s}^{-1}$ (full power), the resistive force is $1200\ \text{N}$. Driving force $= \dfrac{60\,000}{20} = 3000\ \text{N}$.
3. Resultant force $= 3000 - 1200 = 1800\ \text{N}$, so $a = \dfrac{1800}{1000} = 1.8\ \text{m s}^{-2}$.
:::

## Lifting and pumping

A motor lifting a load at constant speed provides a useful output power $P = mgv$, where $v$ is the vertical speed; equivalently, the gain in potential energy per second. A pump lifting water gives useful power = (mass of water lifted per second) × $g$ × height.

:::worked-solution[A borehole pump]
A borehole pump lifts water through a vertical height of $45\ \text{m}$ at a rate of $0.50\ \text{kg s}^{-1}$. The electrical power input is $400\ \text{W}$.

1. Useful power $= \dfrac{mgh}{t} = 0.50 \times 9.81 \times 45 = 220.7\ \text{W}$.
2. Efficiency $= \dfrac{220.7}{400} \times 100\% = 55.2\%$.
3. Wasted power $= 400 - 220.7 = 179\ \text{W}$, heating the motor and the water, and overcoming friction in the pipe.
:::

If the water also leaves the pipe with a significant speed, the useful power includes the kinetic energy given to it each second, $\tfrac{1}{2}(m/t)v^2$.

## Common mistakes

:::mistake{title="Using P = Fv with the resultant force"}
In $P = Fv$ for an engine, $F$ is the **driving** force, not the resultant force. At constant speed the resultant force is zero, but the engine's power is not.
:::

:::mistake{title="Mixing kilowatts and watts, minutes and seconds"}
Convert to W and s before substituting. A pump rated in litres per minute must be converted to $\text{kg s}^{-1}$ (1 litre of water ≈ 1 kg).
:::

:::mistake{title="Confusing power and energy"}
The kilowatt-hour is a unit of **energy** ($3.6 \times 10^{6}\ \text{J}$), not of power.
:::

:::mistake{title="Forgetting the slope component"}
On a hill the engine must also supply $mg\sin\theta \times v$ to raise the vehicle's potential energy.
:::

## Exam tips

:::exam-tip{title="Define and derive"}
*Define power*: work done (energy transferred) **per unit time**. *Show that $P = Fv$*: power = work/time = force × displacement/time = force × velocity. Keep "in the direction of the force".
:::

:::exam-tip{title="Explain a top speed"}
Use $F = P/v$: as $v$ rises the driving force falls and resistance rises, until they are equal; then the resultant force and acceleration are zero.
:::

:::exam-tip{title="Which papers"}
Power appears in Cambridge Papers 1 and 2 and in ZIMSEC Papers 1 and 2, often with efficiency, motion graphs or electrical power.
:::

## Summary

:::summary
- Power = work done per unit time = rate of energy transfer; $1\ \text{W} = 1\ \text{J s}^{-1}$.
- $P = Fv$ (derived from $P = W/t$ and $v = s/t$) gives the power of a force moving at velocity $v$.
- At constant speed, driving force = total resistive force (plus $mg\sin\theta$ on a slope).
- Top speed is reached when $P_{\max}/v$ equals the resistive force.
- Efficiency = useful power output ÷ total power input; lifting power $= mgv$.
:::
