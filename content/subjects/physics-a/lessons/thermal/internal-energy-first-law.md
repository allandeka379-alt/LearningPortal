---
{
  "key": "thermal.internal-energy-first-law",
  "title": "Internal energy and the first law of thermodynamics",
  "summary": "Define internal energy as the sum of the random kinetic and potential energies of the molecules, relate temperature rise and phase change to changes in kinetic and potential energy, calculate work done W = pΔV when a gas changes volume, and apply the first law ΔU = q + W (work done on the system) to gas processes and changes of phase.",
  "concepts": ["aphys.thermal.internal-energy-first-law"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

When a bicycle tyre is pumped up quickly, the pump barrel gets warm. When gas escapes from a pressurised aerosol can, the can feels cold. In a car engine, burning fuel heats the gas in a cylinder and the gas pushes the piston out, turning a crankshaft. Each of these is energy being shared between **heating**, **work** and the **internal energy** of a gas, and the rule that keeps the accounts is the **first law of thermodynamics**, a statement of conservation of energy.

You should already know the kinetic molecular model, specific heat capacity and latent heat, the ideal gas equation, and that work done = force × displacement.

## Key definitions

:::definition{term="Internal energy"}
The sum of the random kinetic energies and the potential energies of all the molecules of a system, the molecules being randomly distributed. It is determined by the state of the system (for example its temperature, pressure and volume), not by how it reached that state.
:::

:::definition{term="Heating (q)"}
Energy transferred to a system because of a temperature difference between the system and its surroundings.
:::

:::definition{term="Work done on a gas"}
Energy transferred to the gas by a force acting on it through a distance, for example by a piston compressing it. At constant pressure, the work done on the gas is $W = -p\Delta V$: positive when the gas is compressed, negative when it expands.
:::

:::formula{name="First law of thermodynamics (Cambridge convention)"}
$$
\Delta U = q + W
$$

$\Delta U$ = increase in internal energy of the system (J), $q$ = energy supplied **to** the system by heating (J), $W$ = work done **on** the system (J).
:::

:::formula{name="Work done when a gas changes volume at constant pressure"}
$$
W_{\text{by gas}} = p\,\Delta V, \qquad W_{\text{on gas}} = -p\,\Delta V
$$

$p$ = pressure (Pa), $\Delta V$ = change in volume (m³).
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: ZIMSEC Form 6 and Cambridge A Level only (15.2, Paper 4). Cambridge uses $\Delta U = q + W$ with $W$ the work done **on** the system. Some books (and possibly the ZIMSEC syllabus, still to be confirmed) write $\Delta Q = \Delta U + W$ with $W$ the work done **by** the gas. They are the same law: always state which convention you use.
:::

## Internal energy at the molecular level

Each molecule has **kinetic energy** because it moves randomly (and in solids and liquids, vibrates) and **potential energy** because of the forces between it and its neighbours. Internal energy is the total of both, summed over all the molecules.

- **Temperature rise without a phase change**: the mean kinetic energy of the molecules increases, so the internal energy increases. (Temperature is a measure of the mean random kinetic energy.)
- **Phase change at constant temperature**: the kinetic energy is unchanged; the potential energy increases (melting, boiling) or decreases (freezing, condensing). The internal energy still changes.
- **Ideal gas**: there are no intermolecular forces, so the potential energy is zero and the internal energy is entirely random kinetic energy. For a fixed amount of ideal gas, $U$ depends **only on temperature**, so $\Delta U = 0$ whenever the temperature returns to its starting value.

Because internal energy is a property of the state, a change in $U$ depends only on the start and end states. Heat and work are not properties of a state: they describe energy being transferred.

## Work done by an expanding gas

A gas at pressure $p$ in a cylinder pushes on a piston of area $A$ with force $F = pA$. If the piston moves out a small distance $\Delta x$ at constant pressure, the gas does work

$$
W_{\text{by}} = F\Delta x = pA\Delta x = p\Delta V
$$

On a graph of pressure against volume, the work done by the gas is the **area under the line**. For a gas expanding at constant pressure this area is a rectangle; if the pressure changes, the area under the curve still gives the work.

## Using the first law

Write each term with its sign before substituting:

| Process | $q$ | $W$ (on gas) | $\Delta U$ | Notes |
|---|---|---|---|---|
| Heated at constant volume | $+$ | $0$ | $= q$, temperature rises | no movement, no work |
| Heated at constant pressure, expands | $+$ | $-p\Delta V$ | $q - p\Delta V$ | more energy needed than at constant volume for the same rise |
| Compressed quickly (adiabatic, $q = 0$) | $0$ | $+$ | $= W$, temperature rises | warm bicycle pump |
| Expands quickly (adiabatic) | $0$ | $-$ | negative, temperature falls | cold aerosol can |
| Isothermal change of an ideal gas | $q = -W$ | either sign | $0$ | temperature constant |
| Complete cycle | $q = -W$ | net | $0$ | returns to start |

:::worked-solution[Gas heated at constant pressure]
A gas at a constant pressure of $1.0 \times 10^{5}\ \text{Pa}$ is supplied with $400\ \text{J}$ by heating and expands from $2.0 \times 10^{-3}\ \text{m}^3$ to $3.5 \times 10^{-3}\ \text{m}^3$. Find the change in its internal energy.

1. Work done on the gas: $W = -p\Delta V = -1.0 \times 10^{5} \times (3.5 - 2.0) \times 10^{-3} = -150\ \text{J}$.
2. First law: $\Delta U = q + W = 400 + (-150)$.
3. $\Delta U = +250\ \text{J}$: the internal energy increases, so the temperature of the gas rises. Of the 400 J supplied, 150 J left the gas as work done pushing the piston.
:::

:::worked-solution[Boiling water at atmospheric pressure]
$1.0\ \text{g}$ of water at $100\ ^\circ\text{C}$ is turned into steam at the same temperature at a pressure of $1.01 \times 10^{5}\ \text{Pa}$. The specific latent heat of vaporisation is $2.26 \times 10^{6}\ \text{J kg}^{-1}$; the volume increases from $1.0 \times 10^{-6}\ \text{m}^3$ to $1.67 \times 10^{-3}\ \text{m}^3$. Find the increase in internal energy.

1. Energy supplied by heating: $q = mL = 1.0 \times 10^{-3} \times 2.26 \times 10^{6} = 2260\ \text{J}$.
2. Work done on the water: $W = -p\Delta V = -1.01 \times 10^{5} \times (1.67 \times 10^{-3} - 1.0 \times 10^{-6}) = -169\ \text{J}$.
3. $\Delta U = q + W = 2260 - 169 = 2091 \approx 2090\ \text{J}$.
4. This increase is all potential energy (the temperature is constant). About 7.5% of the latent heat is used to push back the atmosphere.
:::

## Explaining everyday effects

**Bicycle pump.** Pushing the handle in quickly does work on the air ($W > 0$); there is little time for energy to escape ($q \approx 0$), so $\Delta U > 0$ and the temperature rises.

**Aerosol can.** The escaping gas expands rapidly, doing work on the atmosphere ($W < 0$) with little heating, so its internal energy and temperature fall.

**Car engine.** In the power stroke, the hot gas does work on the piston ($W < 0$), so its internal energy falls even though energy was supplied by the burning fuel. Over a full cycle, $\Delta U = 0$, so the net work done by the gas equals the net energy supplied by heating minus the energy lost to the exhaust and cooling system.

## Common mistakes

:::mistake{title="Mixing the two sign conventions"}
In $\Delta U = q + W$, $W$ is work done **on** the gas, so an expanding gas has negative $W$. Do not use "work done by" in this equation without changing the sign.
:::

:::mistake{title="Saying internal energy is just kinetic energy"}
It is kinetic plus potential energy. Only for an ideal gas is the potential part zero.
:::

:::mistake{title="Thinking ΔU = 0 means no energy was transferred"}
In an isothermal process energy is transferred by heating and by work, but they balance.
:::

:::mistake{title="Using litres or cm³ in pΔV"}
Convert volumes to m³ ($1\ \text{L} = 10^{-3}\ \text{m}^3$, $1\ \text{cm}^3 = 10^{-6}\ \text{m}^3$) and pressure to Pa.
:::

## Exam tips

:::exam-tip{title="Define and state"}
For *define internal energy*, include "sum", "random", "kinetic and potential" and "molecules". For *state the first law*, write $\Delta U = q + W$ and define each symbol with its direction (to the system, on the system).
:::

:::exam-tip{title="Explain a temperature change"}
Use the chain: sign of $W$ and $q$ → sign of $\Delta U$ → change in mean kinetic energy → change in temperature (for an ideal gas, $U \propto T$).
:::

:::exam-tip{title="Which papers"}
Cambridge Paper 4 (structured questions on gas processes and cycles); ZIMSEC Papers 2 and 3.
:::

## Summary

:::summary
- Internal energy = sum of the random kinetic and potential energies of the molecules; it depends only on the state.
- Temperature rise increases kinetic energy; a phase change changes potential energy at constant temperature.
- For an ideal gas, $U$ is all kinetic and depends only on $T$.
- Work done by a gas at constant pressure is $p\Delta V$ (area under the $p$-$V$ graph); work done on it is $-p\Delta V$.
- First law: $\Delta U = q + W$ (energy supplied by heating plus work done on the system).
:::
