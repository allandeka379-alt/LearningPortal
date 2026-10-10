---
{
  "key": "capacitance.capacitors",
  "title": "Capacitance and capacitor combinations",
  "summary": "Define capacitance and the farad for parallel-plate capacitors and isolated spherical conductors, use C = Q/V and C = 4πε₀r, derive and use the formulae for capacitors in series and in parallel, and work out how charge and p.d. are shared in networks.",
  "concepts": ["aphys.capacitance.capacitors"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

A camera flash, the backup that keeps a clock running during a power cut, the smoothing in a phone charger and the timing circuit of a car's indicators all depend on capacitors: devices that store separated charge and release it when needed. Even a metal sphere on an insulating stand, such as the dome of a Van de Graaff generator, has a capacitance.

You should know about electric potential and the equation for the potential of an isolated point charge, $V = \dfrac{Q}{4\pi\varepsilon_0 r}$, as well as Kirchhoff's laws.

## Key definitions

:::definition{term="Capacitance of a capacitor"}
The charge stored on one plate per unit potential difference between the plates: $C = \dfrac{Q}{V}$.
:::

:::definition{term="Capacitance of an isolated conductor"}
The charge on the conductor per unit potential of the conductor (its potential being measured relative to zero at infinity).
:::

:::definition{term="The farad"}
The capacitance of a capacitor that stores a charge of one coulomb per volt of potential difference: $1\ \text{F} = 1\ \text{C V}^{-1}$.
:::

:::formula{name="Capacitance"}
$$
C = \frac{Q}{V}
$$

$C$ in F, $Q$ in C (the magnitude of the charge on **each** plate), $V$ in V.
:::

:::formula{name="Isolated sphere"}
$$
C = 4\pi\varepsilon_0 r
$$

$r$ is the radius of the sphere in m and $\varepsilon_0 = 8.85 \times 10^{-12}\ \text{F m}^{-1}$.
:::

:::keyfact{title="Practical sizes"}
The farad is very large. Capacitors in circuits are usually microfarads ($1\ \mu\text{F} = 10^{-6}\ \text{F}$), nanofarads ($10^{-9}\ \text{F}$) or picofarads ($10^{-12}\ \text{F}$). "Supercapacitors" of several farads exist for backup supplies.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards define capacitance for parallel plates and isolated spheres and derive the series and parallel formulae (Cambridge A Level 19.1, Paper 4; ZIMSEC Form 5).
:::

## How a capacitor stores charge

A parallel-plate capacitor is two conducting plates separated by an insulator (the dielectric). When it is connected to a cell, electrons flow from one plate, round the circuit, to the other. One plate gains charge $-Q$ and the other is left with $+Q$; no charge crosses the insulating gap. The flow stops when the p.d. between the plates equals the e.m.f. The capacitor as a whole remains neutral, which is why "the charge stored" means the charge on one plate.

The capacitance depends on the construction: larger plate area, smaller separation and a dielectric between the plates all increase it. Doubling the p.d. doubles the charge stored, so $Q \propto V$ and a graph of $Q$ against $V$ is a straight line through the origin with gradient $C$.

## The isolated sphere

The potential of an isolated sphere of radius $r$ carrying charge $Q$ is $V = \dfrac{Q}{4\pi\varepsilon_0 r}$, as if the charge were at its centre. So

$$
C = \frac{Q}{V} = 4\pi\varepsilon_0 r.
$$

:::worked-solution[A charged dome]
A spherical dome of radius $0.15\ \text{m}$ is charged to a potential of $50\ \text{kV}$. Find its capacitance and the charge on it.

1. $C = 4\pi\varepsilon_0 r = \dfrac{r}{8.99 \times 10^{9}} = \dfrac{0.15}{8.99 \times 10^{9}} = 1.67 \times 10^{-11}\ \text{F}$ (about 17 pF).
2. $Q = CV = 1.67 \times 10^{-11} \times 5.0 \times 10^{4} = 8.3 \times 10^{-7}\ \text{C}$ (to two significant figures, matching the data).
:::

Even the whole Earth, treated as an isolated conducting sphere, has a capacitance of less than a millifarad, which shows how large the farad is.

## Capacitors in parallel

1. Each capacitor has the same p.d. $V$ across it.
2. The total charge drawn from the supply is the sum of the charges: $Q = Q_1 + Q_2 + Q_3$ (conservation of charge).
3. Substitute $Q = CV$: $CV = C_1V + C_2V + C_3V$.
4. Divide by $V$: $C = C_1 + C_2 + C_3$.

## Capacitors in series

1. When the combination is charged, each capacitor carries the same charge $Q$: charge moved onto the outer plates induces equal and opposite charges on the inner plates, which are isolated from the rest of the circuit.
2. Kirchhoff's second law: $V = V_1 + V_2 + V_3$.
3. Substitute $V = Q/C$: $\dfrac{Q}{C} = \dfrac{Q}{C_1} + \dfrac{Q}{C_2} + \dfrac{Q}{C_3}$.
4. Divide by $Q$: $\dfrac{1}{C} = \dfrac{1}{C_1} + \dfrac{1}{C_2} + \dfrac{1}{C_3}$.

| | Resistors | Capacitors |
|---|---|---|
| Series | $R = R_1 + R_2$ | $1/C = 1/C_1 + 1/C_2$ |
| Parallel | $1/R = 1/R_1 + 1/R_2$ | $C = C_1 + C_2$ |
| Quantity that is the same in series | current | charge |
| Quantity that is the same in parallel | p.d. | p.d. |

In series the combined capacitance is smaller than the smallest capacitor, and the **smaller** capacitor takes the **larger** p.d. ($V = Q/C$ with the same $Q$).

:::worked-solution[Two capacitors in series]
Capacitors of $4.0\ \mu\text{F}$ and $12\ \mu\text{F}$ are connected in series across a $9.0\ \text{V}$ supply. Find the combined capacitance, the charge on each, and the p.d. across each.

1. $\dfrac{1}{C} = \dfrac{1}{4.0} + \dfrac{1}{12} = \dfrac{1}{3.0}$, so $C = 3.0\ \mu\text{F}$.
2. $Q = CV = 3.0 \times 10^{-6} \times 9.0 = 2.7 \times 10^{-5}\ \text{C}$ ($27\ \mu\text{C}$) on each.
3. $V_4 = \dfrac{27\ \mu\text{C}}{4.0\ \mu\text{F}} = 6.75\ \text{V}$ and $V_{12} = \dfrac{27}{12} = 2.25\ \text{V}$; check: $6.75 + 2.25 = 9.0\ \text{V}$.
:::

## Sharing charge between capacitors

When a charged capacitor is connected across an uncharged one, charge flows until both have the same p.d. The total charge is conserved.

:::worked-solution[Charge sharing]
A $10\ \mu\text{F}$ capacitor charged to $12\ \text{V}$ is disconnected and then connected across an uncharged $5.0\ \mu\text{F}$ capacitor.

1. Initial charge $= 10 \times 10^{-6} \times 12 = 120\ \mu\text{C}$.
2. After sharing, the capacitors are in parallel: total capacitance $15\ \mu\text{F}$.
3. Common p.d. $= \dfrac{120\ \mu\text{C}}{15\ \mu\text{F}} = 8.0\ \text{V}$; charges $80\ \mu\text{C}$ and $40\ \mu\text{C}$.
:::

Energy is not conserved in the sharing: some is dissipated in the connecting wires (see the next lesson).

## Uses of capacitors

Capacitors store energy for a quick release (camera flashes, defibrillators), keep a supply steady for a short time (memory backup), smooth the output of rectifiers, block steady d.c. while passing changing signals in amplifiers, and set time intervals with a resistor (timing circuits). Each use relies on $Q = CV$ and on the way the charge changes with time through a resistor.

## Common mistakes

:::mistake{title="Using total charge on both plates"}
The charge stored is the charge on **one** plate, $Q$, not $2Q$ and not zero.
:::

:::mistake{title="Swapping the series and parallel rules"}
Capacitors combine the opposite way to resistors: parallel capacitances add.
:::

:::mistake{title="Forgetting micro- prefixes"}
Convert µF to F ($\times 10^{-6}$) before calculating charge in coulombs or energy in joules.
:::

## Exam tips

:::exam-tip{title="Define precisely"}
*Define capacitance*: charge stored per unit potential difference (for a capacitor) or per unit potential (for an isolated conductor). Name $Q$ as the charge on one plate.
:::

:::exam-tip{title="Derive"}
For the series formula, state why the charge is the same on each capacitor, then apply the second law and $V = Q/C$. For parallel, state the p.d. is common and charges add.
:::

:::exam-tip{title="Which papers"}
Capacitance is Cambridge A Level (Paper 4) and ZIMSEC Form 5 (Papers 1 and 2); network questions often combine with energy stored.
:::

## Summary

:::summary
- $C = Q/V$; $1\ \text{F} = 1\ \text{C V}^{-1}$; practical values are µF, nF and pF.
- Isolated sphere: $C = 4\pi\varepsilon_0 r$.
- Parallel: $C = C_1 + C_2 + \dots$ (same p.d., charges add).
- Series: $1/C = 1/C_1 + 1/C_2 + \dots$ (same charge, p.d.s add); the smaller capacitor takes the larger p.d.
- When capacitors share charge, total charge is conserved and they end at a common p.d.
:::
