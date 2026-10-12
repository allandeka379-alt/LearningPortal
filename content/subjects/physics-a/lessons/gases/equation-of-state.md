---
{
  "key": "gases.equation-of-state",
  "title": "The mole and the ideal gas equation",
  "summary": "Use the amount of substance (mol) and the Avogadro constant, define an ideal gas, apply pV = nRT and pV = NkT (k = R/N_A) to fixed and changing amounts of gas with temperatures in kelvin, treat Boyle's law, Charles's law and the pressure law as special cases and describe how they are investigated, and calculate gas densities and number densities.",
  "concepts": ["aphys.gases.equation-of-state"],
  "estimatedMinutes": 45,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

Before a long trip from Bulawayo to Victoria Falls, a kombi driver checks the tyre pressures in the cool of the morning, because the reading rises once the tyres warm up on the road. A welder's oxygen cylinder holds many times its own volume of gas because the gas is squeezed to a high pressure. A weather balloon swells as it rises. All three are described by one compact equation linking the pressure, volume, temperature and amount of a gas: the **ideal gas equation**.

You should already know pressure $p = F/A$, the kelvin scale, and the O-Level idea that gas pressure comes from molecules hitting the walls of the container.

## Key definitions

:::definition{term="Amount of substance"}
An SI base quantity, unit the **mole** (mol). One mole contains exactly $N_A$ particles, where the Avogadro constant $N_A = 6.02 \times 10^{23}\ \text{mol}^{-1}$.
:::

:::definition{term="Ideal gas"}
A gas for which $pV \propto T$ at all pressures, volumes and temperatures, where $T$ is the thermodynamic temperature, for a fixed amount of gas. Real gases behave almost ideally at low pressure and at temperatures well above their boiling points.
:::

:::formula{name="Ideal gas equation"}
$$
pV = nRT \qquad\text{and}\qquad pV = NkT
$$

$p$ = pressure (Pa), $V$ = volume (m³), $n$ = amount of gas (mol), $T$ = thermodynamic temperature (K), $R = 8.31\ \text{J K}^{-1}\ \text{mol}^{-1}$ (molar gas constant), $N$ = number of molecules, $k = 1.38 \times 10^{-23}\ \text{J K}^{-1}$ (Boltzmann constant).
:::

:::formula{name="Linking the constants"}
$$
N = nN_A, \qquad k = \frac{R}{N_A}
$$

Check: $\dfrac{8.31}{6.02 \times 10^{23}} = 1.38 \times 10^{-23}\ \text{J K}^{-1}$.
:::

:::formula{name="Fixed amount of gas"}
$$
\frac{p_1V_1}{T_1} = \frac{p_2V_2}{T_2}
$$
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: ZIMSEC Form 6 and Cambridge A Level only (15.1, Paper 4). Cambridge does not require the separate gas laws by name but expects $pV = nRT$; ZIMSEC uses Boyle's law, Charles's law and the pressure law. Always use kelvin.
:::

## The gas laws as special cases

For a fixed amount of an ideal gas, $pV/T$ is constant. Holding one quantity fixed gives each of the classical laws:

| Law | Constant | Relationship | Straight-line graph |
|---|---|---|---|
| Boyle's law | $T$ | $pV = \text{constant}$, $p \propto 1/V$ | $p$ against $1/V$, through the origin |
| Charles's law | $p$ | $V \propto T$ | $V$ against $T$, through the origin (absolute zero) |
| Pressure law | $V$ | $p \propto T$ | $p$ against $T$, through the origin |

Plotting $V$ against $\theta$ in degrees Celsius for Charles's law gives a straight line that meets the temperature axis at about $-273\ ^\circ\text{C}$: extrapolating gas behaviour is one way absolute zero was first estimated.

![Charles's law: volume of a fixed mass of gas at constant pressure against Celsius temperature is a straight line; extrapolated backwards (dashed) it meets the temperature axis at about −273 °C, the estimate of absolute zero, where the volume would be zero.](media:diagrams/charles-law-absolute-zero.png "Figure: extrapolating V against θ to zero volume gives about −273 °C")

## Using the equation

Always:

1. convert temperatures to kelvin;
2. convert volumes to m³ ($1\ \text{cm}^3 = 10^{-6}\ \text{m}^3$, $1\ \text{L} = 10^{-3}\ \text{m}^3$) and pressures to Pa;
3. decide whether the amount of gas is fixed (use $p_1V_1/T_1 = p_2V_2/T_2$) or needs to be found (use $pV = nRT$).

:::worked-solution[Amount of gas in a cylinder]
A gas cylinder of internal volume $0.020\ \text{m}^3$ contains oxygen at $1.2 \times 10^{6}\ \text{Pa}$ and $15\ ^\circ\text{C}$. Find the amount of gas, the number of molecules and the mass of oxygen (molar mass $0.032\ \text{kg mol}^{-1}$).

1. $T = 15 + 273.15 = 288.15\ \text{K}$.
2. $n = \dfrac{pV}{RT} = \dfrac{1.2 \times 10^{6} \times 0.020}{8.31 \times 288.15} = 10.0\ \text{mol}$.
3. $N = nN_A = 10.0 \times 6.02 \times 10^{23} = 6.03 \times 10^{24}$ molecules.
4. Mass $= nM = 10.0 \times 0.032 = 0.32\ \text{kg}$.
:::

:::worked-solution[Tyre pressure after a journey]
A tyre is at $2.2 \times 10^{5}\ \text{Pa}$ (absolute pressure) at $18\ ^\circ\text{C}$. After a long drive its temperature is $45\ ^\circ\text{C}$. Assuming the volume is unchanged and no air escapes, find the new pressure.

1. Fixed $n$ and $V$: $\dfrac{p_1}{T_1} = \dfrac{p_2}{T_2}$.
2. $p_2 = 2.2 \times 10^{5} \times \dfrac{318.15}{291.15}$.
3. $p_2 = 2.40 \times 10^{5}\ \text{Pa}$, an increase of about 9%. Using Celsius would wrongly give $5.5 \times 10^{5}\ \text{Pa}$.
:::

Note that tyre gauges show the pressure **above** atmospheric (gauge pressure); the gas equation needs the absolute pressure, gauge reading plus about $1.0 \times 10^{5}\ \text{Pa}$.

## Density and number density

Since $n = m/M$, the ideal gas equation can be rewritten for the density $\rho = m/V$:

$$
\rho = \frac{pM}{RT}
$$

so at fixed pressure a hot gas is less dense than a cold one (the principle of the hot-air balloon). The **number density**, molecules per unit volume, is $\dfrac{N}{V} = \dfrac{p}{kT}$. At $1.01 \times 10^{5}\ \text{Pa}$ and $273\ \text{K}$ this is about $2.7 \times 10^{25}$ molecules per cubic metre for any ideal gas.

## Investigating Boyle's law

Air is trapped in a sealed glass tube above a column of oil. A pump raises the pressure on the oil, which is read on a Bourdon gauge; the volume of trapped air is read from a scale on the tube. Each time the pressure is changed, wait for the air to return to room temperature before reading, so that $T$ stays constant. These readings were taken:

| $V\,/\,\text{cm}^3$ | $p\,/\,10^{5}\ \text{Pa}$ | $pV\,/\,10^{5}\ \text{Pa cm}^3$ | $\dfrac{1}{V}\,/\,\text{cm}^{-3}$ |
|---|---|---|---|
| 30.0 | 1.00 | 30.0 | 0.0333 |
| 25.0 | 1.21 | 30.3 | 0.0400 |
| 20.0 | 1.49 | 29.8 | 0.0500 |
| 15.0 | 2.02 | 30.3 | 0.0667 |
| 12.0 | 2.49 | 29.9 | 0.0833 |
| 10.0 | 3.01 | 30.1 | 0.1000 |

The product $pV$ is constant within about 1%, and a graph of $p$ against $1/V$ is a straight line through the origin with gradient $pV \approx 30 \times 10^{5}\ \text{Pa cm}^3$ ($3.0\ \text{J}$). The gradient equals $nRT$, so it gives the amount of trapped air: $n = 3.0/(8.31 \times 293) \approx 1.2 \times 10^{-3}\ \text{mol}$ at a room temperature of 20 °C.

![Boyle's law data: pressure against 1/volume for trapped air at constant temperature gives a straight line through the origin; the six readings from 1.00 × 10⁵ Pa at 30.0 cm³ to 3.01 × 10⁵ Pa at 10.0 cm³ lie on it, and the gradient pV is about 30 × 10⁵ Pa cm³, or 3.0 J.](media:diagrams/boyle-p-against-inverse-v.png "Figure: p against 1/V is a straight line through the origin, so pV is constant")

Charles's law is investigated similarly with a capillary tube of air trapped by a bead of concentrated sulfuric acid (which also keeps the air dry) in a water bath; the pressure law with a flask of air connected to a pressure gauge in a water bath. In both, stir the bath and wait for equilibrium at each temperature.

## Common mistakes

:::mistake{title="Using degrees Celsius"}
$pV = nRT$ needs $T$ in kelvin. A temperature in °C makes every proportional calculation wrong.
:::

:::mistake{title="Mixing n and N"}
$pV = nRT$ uses moles with $R$; $pV = NkT$ uses the number of molecules with $k$. Never use $n$ with $k$.
:::

:::mistake{title="Using gauge pressure"}
Use absolute pressure in the gas equation.
:::

:::mistake{title="Forgetting that gas has escaped or been added"}
If $n$ changes, $p_1V_1/T_1 = p_2V_2/T_2$ does not apply; use $pV = nRT$ for each state.
:::

## Exam tips

:::exam-tip{title="State and define"}
For *state what is meant by an ideal gas*, write "a gas for which $pV$ is proportional to the thermodynamic temperature $T$ (for a fixed amount of gas)". For *define the mole*, use the Avogadro constant.
:::

:::exam-tip{title="Show working with units"}
Write each conversion: "$T = 288\ \text{K}$, $V = 2.0 \times 10^{-2}\ \text{m}^3$" before substituting. Examiners give method marks for these steps.
:::

:::exam-tip{title="Which papers"}
Cambridge Paper 4 (often with kinetic theory in the same question); ZIMSEC Papers 1-3; gas-law experiments in ZIMSEC Paper 4 and Cambridge Paper 5 planning.
:::

## Summary

:::summary
- One mole contains $N_A = 6.02 \times 10^{23}$ particles; $N = nN_A$.
- Ideal gas: $pV = nRT = NkT$, with $k = R/N_A$ and $T$ in kelvin.
- For a fixed amount: $p_1V_1/T_1 = p_2V_2/T_2$; Boyle, Charles and pressure laws are special cases.
- Density $\rho = pM/RT$; number density $N/V = p/kT$.
- Gas-law experiments change one variable, keep another constant, and wait for thermal equilibrium.
:::
