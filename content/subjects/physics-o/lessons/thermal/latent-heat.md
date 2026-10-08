---
{
  "key": "thermal.latent-heat",
  "title": "Specific latent heat",
  "summary": "Define the specific latent heats of fusion and vaporisation, use Q = ml, explain latent heat with particles, and describe experiments to measure it.",
  "concepts": ["phys.thermal.latent-heat"],
  "objectives": ["zimsec/o-level/physics:7.2.10", "zimsec/o-level/physics:7.2.6"],
  "estimatedMinutes": 25,
  "applies": ["zimsec"]
}
---
## Introduction

Ice taken from a freezer warms to $0\ ^\circ\text{C}$ quickly, but then takes a long time to melt, even though it keeps absorbing energy from the room. A scald from steam is far worse than one from boiling water at the same temperature. Both are explained by **latent heat**: the "hidden" energy needed to change state. This ZIMSEC topic (7.2) shows how to calculate it.

## Key definitions

:::definition{term="Latent heat"}
The energy absorbed or released when a substance changes state without any change in temperature.
:::

:::definition{term="Specific latent heat of fusion, l_f"}
The energy needed to change $1\ \text{kg}$ of a substance from solid to liquid without a change in temperature.
:::

:::definition{term="Specific latent heat of vaporisation, l_v"}
The energy needed to change $1\ \text{kg}$ of a substance from liquid to gas without a change in temperature.
:::

:::formula{name="Latent heat"}
$$
Q = ml
$$

where $Q$ is the energy (J), $m$ the mass changing state (kg) and $l$ the specific latent heat (J/kg).
:::

:::keyfact
For water: $l_f = 3.34 \times 10^{5}\ \text{J/kg}$ and $l_v = 2.26 \times 10^{6}\ \text{J/kg}$.
:::

## Latent heat and particles

During melting, the energy supplied **weakens the bonds** between particles so they can slide past each other; during boiling it **separates** the particles completely. In both cases the particles do not speed up, so the temperature stays the same. Vaporisation needs far more energy than melting because the particles must be pulled completely apart against the forces between them, and pushed out against the atmosphere.

When steam condenses on your skin, it gives out its large latent heat of vaporisation as well as cooling down, which is why steam scalds are so severe.

## Calculations

:::worked-solution[Melting ice for a cool box]
How much energy is needed to melt $0.50\ \text{kg}$ of ice at $0\ ^\circ\text{C}$?

1. $Q = ml_f = 0.50 \times 3.34 \times 10^{5}$.
2. $Q = 1.67 \times 10^{5}\ \text{J}$ ($167\ \text{kJ}$).
:::

## Measuring specific latent heat

### Of vaporisation

A $100\ \text{W}$ immersion heater keeps a beaker of water boiling on a balance. Once the water is boiling steadily, record the balance reading, start a stop-watch, and after a measured time record the mass again; the loss of mass is the water boiled away.

:::worked-solution[Finding the latent heat of vaporisation]
1. In $500\ \text{s}$ the $100\ \text{W}$ heater boils away $22\ \text{g} = 0.022\ \text{kg}$ of water.
2. Energy supplied $= Pt = 100 \times 500 = 50\,000\ \text{J}$.
3. $l_v = \dfrac{Q}{m} = \dfrac{50\,000}{0.022} = 2.3 \times 10^{6}\ \text{J/kg}$.
:::

### Of fusion

Put crushed ice at $0\ ^\circ\text{C}$ in a funnel with an immersion heater, and collect the melted water in a beaker for a measured time. A second, identical funnel of ice **without** a heater collects the water melted by the warm room; subtracting this **control** mass gives the mass melted by the heater alone. Then $l_f = \dfrac{Pt}{m}$. (Assume no energy is lost to or gained from the surroundings apart from the control correction.)

## Heating curves

A graph of temperature against time for ice heated steadily rises to $0\ ^\circ\text{C}$, stays flat while the ice melts (latent heat of fusion), rises to $100\ ^\circ\text{C}$, then stays flat again for much longer while the water boils (the latent heat of vaporisation is about seven times larger).

## Common mistakes

:::mistake{title="Using mcΔθ during a change of state"}
During melting or boiling the temperature does not change, so $mc\Delta\theta$ gives zero. Use $Q = ml$ for the change of state.
:::

:::mistake{title="Using the total mass of water"}
In the boiling experiment, $m$ is only the mass **boiled away**, not the mass in the beaker.
:::

## Exam tips

:::exam-tip
For a whole heating process (for example ice at $-10\ ^\circ\text{C}$ to water at $20\ ^\circ\text{C}$), split it into stages: warming ($mc\Delta\theta$), melting ($ml$), warming again ($mc\Delta\theta$), then add.
:::

:::exam-tip
Explain the control funnel: it measures ice melted by the room so that it can be subtracted.
:::

## Summary

:::summary
- Latent heat is absorbed or released during a change of state, at constant temperature.
- Specific latent heat: energy per kg to change state; $Q = ml$.
- Water: $l_f = 3.34 \times 10^{5}\ \text{J/kg}$, $l_v = 2.26 \times 10^{6}\ \text{J/kg}$.
- The energy breaks bonds between particles rather than increasing their kinetic energy.
- Measure $l_v$ by boiling water away on a balance; measure $l_f$ with a heated funnel of ice and a control.
:::
