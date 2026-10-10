---
{
  "key": "electricity.pd-power",
  "title": "Potential difference and electrical power",
  "summary": "Define potential difference as energy transferred per unit charge, use V = W/Q, P = VI = I²R = V²/R and W = VIt, and solve problems on heaters, lamps, geysers, cables and the cost of energy in kilowatt-hours.",
  "concepts": ["aphys.electricity.pd-power"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

An electric geyser in a Bulawayo home and the tiny LED on a phone charger are both rated in watts, and the household bill is worked out in kilowatt-hours. Behind every rating lies the same idea: as charge passes through a component, energy is transferred from the charge to the component, and the potential difference tells you how much energy each coulomb gives up.

You should know that current is the rate of flow of charge ($Q = It$) and that resistance is $R = V/I$. Electromotive force, the energy a source gives to each coulomb, is the topic of a later lesson.

## Key definitions

:::definition{term="Potential difference (p.d.)"}
The energy transferred from electrical energy to other forms per unit charge passing between two points in a circuit: $V = \dfrac{W}{Q}$.
:::

:::definition{term="The volt"}
The potential difference between two points when one joule of energy is transferred per coulomb of charge passing between them: $1\ \text{V} = 1\ \text{J C}^{-1} = 1\ \text{kg m}^2\,\text{s}^{-3}\,\text{A}^{-1}$.
:::

:::definition{term="The kilowatt-hour"}
The energy transferred by a device of power one kilowatt in one hour: $1\ \text{kW h} = 1000\ \text{W} \times 3600\ \text{s} = 3.6 \times 10^{6}\ \text{J}$.
:::

:::formula{name="Potential difference"}
$$
V = \frac{W}{Q}
$$

$W$ is the energy transferred in J when charge $Q$ in C passes through the component; $V$ is in V.
:::

:::formula{name="Electrical power"}
$$
P = VI = I^2R = \frac{V^2}{R}
$$

$P$ in W, $V$ in V, $I$ in A, $R$ in Ω. The energy transferred in time $t$ is $W = VIt = Pt$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards define p.d. as energy per unit charge and use $P = VI$, $P = I^2R$ and $P = V^2/R$ (Cambridge AS 9.2; ZIMSEC Form 5). Costing energy in kW h is simple arithmetic and appears in ZIMSEC-style questions; the unit itself is useful for both.
:::

## From the definition to $P = VI$

1. When charge $Q$ passes through a component with p.d. $V$, the energy transferred is $W = VQ$.
2. In time $t$ the charge is $Q = It$, so $W = VIt$.
3. Power is energy transferred per unit time: $P = \dfrac{W}{t} = VI$.
4. Using $V = IR$: $P = I(IR) = I^2R$. Using $I = V/R$: $P = V(V/R) = V^2/R$.

Choose the form that uses the quantity that is the **same** for the components you are comparing. Resistors in series carry the same current, so $P = I^2R$ shows the larger resistor dissipates more power. Resistors in parallel have the same p.d., so $P = V^2/R$ shows the **smaller** resistor dissipates more.

:::worked-solution[A kettle on the mains]
A kettle is rated $2.0\ \text{kW}$, $230\ \text{V}$. Find the current, its resistance when hot, and the energy transferred in 3.0 minutes.

1. $I = \dfrac{P}{V} = \dfrac{2000}{230} = 8.70\ \text{A}$.
2. $R = \dfrac{V^2}{P} = \dfrac{230^2}{2000} = 26.45\ \Omega \approx 26.5\ \Omega$.
3. $W = Pt = 2000 \times (3.0 \times 60) = 3.6 \times 10^{5}\ \text{J}$ (360 kJ).
:::

## Energy, the kilowatt-hour and cost

A supply company bills the energy transferred, not the power. The kilowatt-hour is used because the joule is inconveniently small for household use.

:::worked-solution[Backup element in a solar geyser]
A solar geyser has a $3.0\ \text{kW}$ electric backup element that runs for 2.5 hours a day during a cloudy month of 30 days. Electricity costs US\$0.12 per kW h (an illustrative tariff).

1. Energy per month $= 3.0\ \text{kW} \times 2.5\ \text{h} \times 30 = 225\ \text{kW h}$.
2. In joules: $225 \times 3.6 \times 10^{6} = 8.10 \times 10^{8}\ \text{J}$.
3. Cost $= 225 \times 0.12 =$ US\$27.00.
:::

## Power lost in cables

Connecting cables have a small resistance. The power converted to thermal energy in them is $I^2R_{\text{cable}}$, which depends on the **square** of the current. This is why long-distance transmission lines carry a small current at a very high voltage (transformers are covered in the a.c. topic).

:::worked-solution[An extension cable]
A $12\ \text{A}$ current flows to a welding machine through an extension lead whose two cores have a total resistance of $0.15\ \Omega$.

1. Power lost in the cable $= I^2R = 12^2 \times 0.15 = 21.6\ \text{W}$.
2. P.d. across the cable $= IR = 12 \times 0.15 = 1.8\ \text{V}$, so the machine receives 1.8 V less than the socket provides.
3. Doubling the current would quadruple the power wasted in the cable.
:::

## Choosing a fuse

A fuse in the live lead melts if the current becomes dangerously large, protecting the cable from overheating. To choose one, calculate the normal working current from $I = P/V$ and pick the next standard rating above it. A $2.0\ \text{kW}$ kettle on $230\ \text{V}$ draws $8.70\ \text{A}$, so a $13\ \text{A}$ fuse is used; a $60\ \text{W}$ lamp draws only about $0.26\ \text{A}$, so a $3\ \text{A}$ fuse is appropriate. A fuse rated far above the working current would allow a fault current large enough to overheat a thin flex before it melted.

## Power when the supply voltage changes

For a component of **constant resistance**, $P = V^2/R$, so halving the p.d. quarters the power. A $60\ \text{W}$, $230\ \text{V}$ heater element of fixed resistance $882\ \Omega$ would develop only $15\ \text{W}$ on $115\ \text{V}$. A filament lamp does not keep a constant resistance (it is lower when the filament is cooler), so at half voltage it develops rather more than a quarter of its rated power.

| Quantity | Symbol | Unit | Base units |
|---|---|---|---|
| Energy | $W$ | J | $\text{kg m}^2\,\text{s}^{-2}$ |
| Charge | $Q$ | C | A s |
| Potential difference | $V$ | V | $\text{kg m}^2\,\text{s}^{-3}\,\text{A}^{-1}$ |
| Power | $P$ | W | $\text{kg m}^2\,\text{s}^{-3}$ |

## Common mistakes

:::mistake{title="Defining p.d. as energy per charge carrier"}
Say "energy transferred **per unit charge**", not "per electron" or "per charge". The p.d. is measured across a component, between two points.
:::

:::mistake{title="Treating the kW h as a unit of power"}
The kilowatt-hour is energy. Multiply power in kW by time in **hours** to get kW h; multiply W by s to get J.
:::

:::mistake{title="Using the wrong power formula for a comparison"}
For components in parallel, $P = I^2R$ misleads you because the currents differ; use $P = V^2/R$ with the common p.d.
:::

:::mistake{title="Assuming rated values apply at another voltage"}
The rated power applies only at the rated p.d. Work out the resistance first, then the new power, and remember a filament lamp's resistance is not constant.
:::

## Exam tips

:::exam-tip{title="Define and derive"}
*Define p.d.*: energy transferred (from electrical to other forms) per unit charge. *Show that $P = I^2R$*: start from $P = VI$ and substitute $V = IR$, stating each step.
:::

:::exam-tip{title="Calculate with care"}
Show the formula, the substitution with units and the answer to the same number of significant figures as the data. In comparisons ("which lamp is brighter?") identify what is common to the components first.
:::

:::exam-tip{title="Which papers"}
ZIMSEC Paper 1 and Cambridge Paper 1 test units, ratios and quick power calculations; ZIMSEC Paper 2 and Cambridge Paper 2 combine power with resistance, resistivity or internal resistance.
:::

## Summary

:::summary
- P.d. is energy transferred per unit charge, $V = W/Q$; $1\ \text{V} = 1\ \text{J C}^{-1}$.
- $P = VI = I^2R = V^2/R$ and $W = VIt = Pt$.
- Series components: same current, so use $I^2R$. Parallel components: same p.d., so use $V^2/R$.
- $1\ \text{kW h} = 3.6 \times 10^{6}\ \text{J}$; cost = energy in kW h × price per kW h.
- Cable losses $I^2R$ depend on the square of the current.
:::
