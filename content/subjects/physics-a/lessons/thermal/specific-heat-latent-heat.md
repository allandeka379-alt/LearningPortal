---
{
  "key": "thermal.specific-heat-latent-heat",
  "title": "Specific heat capacity and specific latent heat",
  "summary": "Define and use specific heat capacity (ΔQ = mcΔθ) and specific latent heats of fusion and vaporisation (ΔQ = mL), describe electrical methods for c of a metal or a liquid and L of ice or water with corrections for heat losses, use the method of mixtures, and interpret heating and cooling curves.",
  "concepts": ["aphys.thermal.specific-heat-latent-heat"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

An electric geyser in a Harare home takes most of an hour to heat its tank in the morning, and in a car engine the cooling water carries away a large share of the energy released by the fuel. Water is used for both jobs because it can store a great deal of energy for each kelvin of temperature rise. Steam burns are worse than burns from boiling water at the same temperature for a related reason: steam releases a large amount of extra energy when it condenses on skin.

This lesson makes these ideas quantitative. You should already know the terms internal energy and temperature, that energy (J) = power (W) × time (s), and the idea from O-Level that melting and boiling take place at constant temperature.

## Key definitions

:::definition{term="Specific heat capacity"}
The energy required per unit mass of a substance to raise its temperature by one kelvin (or one degree Celsius), without a change of phase.
:::

:::definition{term="Specific latent heat of fusion"}
The energy required per unit mass to change a substance from solid to liquid at constant temperature.
:::

:::definition{term="Specific latent heat of vaporisation"}
The energy required per unit mass to change a substance from liquid to gas at constant temperature.
:::

:::formula{name="Heating without a change of phase"}
$$
\Delta Q = mc\,\Delta\theta
$$

$\Delta Q$ = energy supplied (J), $m$ = mass (kg), $c$ = specific heat capacity ($\text{J kg}^{-1}\ \text{K}^{-1}$), $\Delta\theta$ = temperature change (K or °C).
:::

:::formula{name="Change of phase"}
$$
\Delta Q = mL
$$

$L$ = specific latent heat of fusion ($L_f$) or vaporisation ($L_v$), in $\text{J kg}^{-1}$.
:::

:::keyfact{title="Values to know (approximate)"}
Water: $c = 4200\ \text{J kg}^{-1}\ \text{K}^{-1}$, $L_f = 3.3 \times 10^{5}\ \text{J kg}^{-1}$, $L_v = 2.26 \times 10^{6}\ \text{J kg}^{-1}$. Aluminium $c \approx 900$, copper $c \approx 385\ \text{J kg}^{-1}\ \text{K}^{-1}$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: ZIMSEC Form 6 and Cambridge A Level only (14.2, Paper 4). Both expect the electrical methods and the idea of correcting for heat losses; the method of mixtures is widely used in ZIMSEC questions.
:::

## Why phase changes need so much energy

During melting or boiling the temperature stays constant, so the mean kinetic energy of the molecules does not change. The energy supplied increases the **potential energy** of the molecules by overcoming intermolecular attractions (and, for boiling, doing work against the atmosphere as the volume increases). Vaporisation separates molecules completely, so $L_v$ for water is about seven times $L_f$.

## Heating and cooling curves

When a solid is heated at a constant rate, a graph of temperature against time shows:

- a rising section (solid warming; gradient $= P/(mc_{\text{solid}})$);
- a flat section at the melting point (energy $mL_f$ supplied);
- a rising section (liquid warming; a smaller gradient if $c_{\text{liquid}}$ is larger);
- a flat section at the boiling point, much longer because $L_v > L_f$.

With constant power $P$, the gradient of each sloping section is $\dfrac{\Delta\theta}{\Delta t} = \dfrac{P}{mc}$, so a steeper section means a smaller specific heat capacity. The length of each flat section is $mL/P$. A cooling curve of a liquid such as molten wax shows the same features in reverse, with a flat section while it solidifies and releases latent heat.

:::worked-solution[Heating and boiling in a kettle]
A $2.2\ \text{kW}$ kettle contains $1.2\ \text{kg}$ of water at $22\ ^\circ\text{C}$. Assuming no energy losses, find the time to reach $100\ ^\circ\text{C}$, and then the time to boil away $0.10\ \text{kg}$.

1. $\Delta Q = mc\Delta\theta = 1.2 \times 4200 \times 78 = 3.93 \times 10^{5}\ \text{J}$.
2. $t = \Delta Q/P = 3.93 \times 10^{5}/2200 = 179\ \text{s}$.
3. Boiling: $\Delta Q = mL_v = 0.10 \times 2.26 \times 10^{6} = 2.26 \times 10^{5}\ \text{J}$, so $t = 2.26 \times 10^{5}/2200 = 103\ \text{s}$.
:::

## Electrical method for c of a metal block

A metal block (say $1\ \text{kg}$ of aluminium) has two holes: one for an immersion heater and one for a thermometer, each with a little oil for good thermal contact. The block is lagged. A joulemeter, or an ammeter and voltmeter with a stop-watch, measures the energy supplied, $E = VIt$.

1. Record the starting temperature, switch on, and record $V$, $I$ and the time.
2. Switch off and record the **highest** temperature reached (the reading continues to rise briefly as energy spreads through the block).
3. $c = \dfrac{VIt}{m\Delta\theta}$.

Energy lost to the surroundings makes $\Delta\theta$ too small, so $c$ comes out too large. Lagging, starting a few degrees below room temperature and finishing the same amount above it (so gains and losses roughly cancel), and using a short heating time all reduce the error. For a **liquid**, the liquid is heated in an insulated container (calorimeter) with a stirrer, and the energy taken by the container is subtracted.

## Measuring latent heat, with losses removed

**Vaporisation of water.** Water in a lagged container is kept boiling by an immersion heater, the container standing on a top-pan balance. Once it is boiling steadily, the mass lost in a measured time gives the rate of evaporation. If energy is also lost to the surroundings at a rate $h$:

$$
P_1 t = m_1 L + ht, \qquad P_2 t = m_2 L + ht
$$

Repeating at a second power and subtracting removes $h$: $L = \dfrac{(P_1 - P_2)\,t}{m_1 - m_2}$.

:::worked-solution[Latent heat by the two-power method]
In $300\ \text{s}$, $7.17\ \text{g}$ of water boils away when the heater power is $60\ \text{W}$, and $4.51\ \text{g}$ when it is $40\ \text{W}$. Find $L_v$ and the rate of energy loss.

1. $L = \dfrac{(60 - 40) \times 300}{(7.17 - 4.51) \times 10^{-3}} = \dfrac{6000}{2.66 \times 10^{-3}} = 2.26 \times 10^{6}\ \text{J kg}^{-1}$.
2. Loss rate: $h = \dfrac{60 \times 300 - 7.17 \times 10^{-3} \times 2.26 \times 10^{6}}{300} \approx 6\ \text{W}$.
:::

**Fusion of ice.** Crushed ice in a funnel is melted by an immersion heater, and the meltwater collected in a set time is weighed. An identical funnel of ice **without** a heater, set up alongside for the same time, measures how much ice melts from the warmth of the room; subtracting this mass corrects for the energy gained from the surroundings.

## The method of mixtures

When a hot object is put into cooler water in an insulated container, energy lost by the hot object = energy gained by the cooler water (and container), once equilibrium is reached.

:::worked-solution[Copper block dropped into water]
A $0.15\ \text{kg}$ copper block ($c = 385\ \text{J kg}^{-1}\ \text{K}^{-1}$) at $100\ ^\circ\text{C}$ is placed in $0.20\ \text{kg}$ of water at $20\ ^\circ\text{C}$ in a container of negligible heat capacity. Find the final temperature $\theta$.

1. Energy lost by copper = energy gained by water: $0.15 \times 385 \times (100 - \theta) = 0.20 \times 4200 \times (\theta - 20)$.
2. $57.75(100 - \theta) = 840(\theta - 20)$, so $5775 + 16\,800 = 897.75\,\theta$.
3. $\theta = 25.1\ ^\circ\text{C}$: the water's large heat capacity keeps the rise small.
:::

If ice is added instead, include the energy $mL_f$ to melt it and then $mc\Delta\theta$ to warm the meltwater from $0\ ^\circ\text{C}$.

## Common mistakes

:::mistake{title="Using mcΔθ during a change of phase"}
While the temperature is constant at the melting or boiling point, use $mL$; $\Delta\theta = 0$ there.
:::

:::mistake{title="Forgetting the meltwater"}
Ice that melts in a mixture becomes water at $0\ ^\circ\text{C}$ that must then be warmed to the final temperature.
:::

:::mistake{title="Mixing grams and kilograms"}
$c$ and $L$ are per kilogram; convert $7.17\ \text{g}$ to $7.17 \times 10^{-3}\ \text{kg}$.
:::

:::mistake{title="Saying heat losses make c too small"}
Losses mean less of the supplied energy heats the block, so $\Delta\theta$ is smaller and the calculated $c$ is **too large**.
:::

## Exam tips

:::exam-tip{title="Describe an experiment"}
Name the apparatus, the readings (mass, $V$, $I$, $t$, temperatures), the equation used, and at least one way to reduce losses. For the two-power method, show why subtracting removes the loss term.
:::

:::exam-tip{title="Explain the flat sections"}
"Energy is used to increase the potential energy of the molecules (breaking intermolecular bonds), not their kinetic energy, so the temperature stays constant."
:::

:::exam-tip{title="Which papers"}
Calculations appear in Cambridge Paper 4 and ZIMSEC Papers 2-3; experiments in ZIMSEC Paper 4 and Cambridge Paper 5 planning questions.
:::

## Summary

:::summary
- $\Delta Q = mc\Delta\theta$ without a phase change; $\Delta Q = mL$ during one, at constant temperature.
- Phase changes increase molecular potential energy; $L_v$ is much larger than $L_f$.
- Electrical methods use $E = VIt$; heat losses make $c$ or $L$ too large unless corrected.
- The two-power method eliminates the loss rate: $L = (P_1 - P_2)t/(m_1 - m_2)$.
- Method of mixtures: energy lost by the hot body = energy gained by the cold body.
:::
