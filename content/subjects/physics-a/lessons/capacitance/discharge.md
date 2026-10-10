---
{
  "key": "capacitance.discharge",
  "title": "Capacitor discharge and the time constant",
  "summary": "Describe and interpret the exponential graphs of p.d., charge and current for a capacitor discharging through a resistor, use the time constant τ = RC and x = x₀e^(−t/RC), find the time to halve, determine RC from a graph of ln V against t, and describe charging curves.",
  "concepts": ["aphys.capacitance.discharge"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

The courtesy light in a kombi fades out gradually after the door is closed; a phone charger's smoothing capacitor keeps the output steady between peaks of the mains cycle; a timing circuit decides how long an irrigation valve on a Masvingo farm stays open. Each relies on the way a capacitor's charge drains away through a resistor: quickly at first, then more and more slowly. This is the first **exponential decay** you meet in A-Level physics, and the same mathematics returns in radioactive decay.

You should know $C = Q/V$, $V = IR$, Kirchhoff's laws and how to use natural logarithms.

## Key definitions

:::definition{term="Time constant"}
For a capacitor of capacitance $C$ discharging through a resistance $R$, the time constant is $\tau = RC$. It is the time for the charge, p.d. or current to fall to $1/e$ (about 37%) of its initial value.
:::

:::definition{term="Exponential decay"}
A decrease in which the rate of decrease of a quantity is proportional to the quantity itself, so that it falls by the same fraction in each equal interval of time.
:::

:::formula{name="Discharge equations"}
$$
x = x_0\,e^{-t/RC}
$$

$x$ stands for the charge $Q$, the p.d. $V$ or the current $I$ at time $t$; $x_0$ is its value at $t = 0$. $R$ in Ω, $C$ in F, $RC$ and $t$ in s.
:::

:::formula{name="Time to halve"}
$$
t_{1/2} = RC\ln 2 \approx 0.693\,RC
$$
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards require the discharge graphs, $\tau = RC$ and $x = x_0e^{-t/RC}$ (Cambridge A Level 19.3, Paper 4; ZIMSEC Form 5). Charging is described qualitatively for both; the charging equations at the end of this lesson are included for ZIMSEC (to be confirmed).
:::

## Why the decay is exponential

A capacitor charged to $V_0$ is connected across a resistor $R$. At any instant the p.d. across the resistor equals the p.d. across the capacitor, so the current is $I = \dfrac{V}{R} = \dfrac{Q}{RC}$. The current is the rate at which charge leaves the capacitor:

$$
\frac{\mathrm{d}Q}{\mathrm{d}t} = -\frac{Q}{RC}
$$

The rate of loss is proportional to the charge remaining, which is the definition of exponential decay. As the charge falls, the p.d. falls, so the current falls, so the charge is lost more slowly: the curve never quite reaches zero. Because $V = Q/C$ and $I = V/R$, the p.d. and the current fall with exactly the same shape and the same time constant.

## The graphs

- **Charge against time** and **p.d. against time**: start at $Q_0$ (or $V_0$) and fall steeply, then ever more gently, approaching zero. The gradient of the $Q$-$t$ graph at any time is $-I$.
- **Current against time**: starts at $I_0 = V_0/R$ and decays with the same shape. The area under the $I$-$t$ graph is the charge that has flowed, $Q_0$ in total.
- After $t = RC$: 37% remains. After $2RC$: 13.5%. After $5RC$: under 1%, so the capacitor is effectively discharged.

The unit check is reassuring: $\Omega \times \text{F} = \dfrac{\text{V}}{\text{A}} \times \dfrac{\text{C}}{\text{V}} = \dfrac{\text{C}}{\text{A}} = \text{s}$.

:::worked-solution[Discharge through a resistor]
A $470\ \mu\text{F}$ capacitor charged to $9.0\ \text{V}$ discharges through a $22\ \text{k}\Omega$ resistor. Find the time constant and the p.d. after $15\ \text{s}$.

1. $\tau = RC = 22 \times 10^{3} \times 470 \times 10^{-6} = 10.34\ \text{s} \approx 10.3\ \text{s}$.
2. $V = V_0e^{-t/RC} = 9.0\,e^{-15/10.34}$.
3. $V = 9.0 \times 0.234 = 2.11\ \text{V}$.
:::

:::worked-solution[Time to fall to a given p.d.]
A capacitor discharging with $RC = 4.7\ \text{s}$ starts at $12\ \text{V}$. How long does it take to fall to $2.0\ \text{V}$?

1. $\dfrac{V}{V_0} = e^{-t/RC}$, so $\ln\dfrac{V_0}{V} = \dfrac{t}{RC}$.
2. $t = RC\ln\dfrac{V_0}{V} = 4.7 \times \ln 6.0 = 4.7 \times 1.792$.
3. $t = 8.42\ \text{s}$.
:::

## Using a logarithmic graph to find RC

Taking natural logarithms of $V = V_0e^{-t/RC}$:

$$
\ln V = \ln V_0 - \frac{t}{RC}
$$

A graph of $\ln(V/\text{V})$ against $t$ is a straight line with gradient $-\dfrac{1}{RC}$ and intercept $\ln V_0$. These readings were taken for a $1000\ \mu\text{F}$ capacitor discharging through a $47\ \text{k}\Omega$ resistor:

| $t\,/\,\text{s}$ | $V\,/\,\text{V}$ | $\ln(V/\text{V})$ |
|---|---|---|
| 0 | 12.00 | 2.485 |
| 10 | 9.70 | 2.272 |
| 20 | 7.84 | 2.059 |
| 30 | 6.34 | 1.847 |
| 40 | 5.12 | 1.633 |
| 50 | 4.14 | 1.421 |
| 60 | 3.35 | 1.209 |

The $\ln V$ values fall by almost exactly $0.213$ every $10\ \text{s}$, so the graph is a straight line with gradient $-0.0213\ \text{s}^{-1}$, giving $RC = \dfrac{1}{0.0213} = 47\ \text{s}$, as expected from $47 \times 10^{3} \times 1000 \times 10^{-6}$. A straight line confirms the decay is exponential, and using the gradient averages over all the readings. The half-life here is $0.693 \times 47 = 32.6\ \text{s}$.

In the laboratory, the p.d. is read from a high-resistance voltmeter (or a data logger) every few seconds, starting a stop-watch as the switch is moved from "charge" to "discharge". Choosing $RC$ of about a minute makes manual timing practical; reaction time is then a small fraction of each interval.

## Charging through a resistor

When an uncharged capacitor is connected to a supply of e.m.f. $E$ through a resistor $R$, the current starts at $E/R$ and decays exponentially with the same time constant $RC$, because the growing p.d. across the capacitor opposes the supply. The charge and the p.d. **rise** along an inverted exponential curve towards $Q_0 = CE$ and $E$: steeply at first, then levelling off. After $RC$ the capacitor has reached 63% of its final p.d. (ZIMSEC detail, to be confirmed:)

$$
V = E\left(1 - e^{-t/RC}\right), \qquad Q = Q_0\left(1 - e^{-t/RC}\right), \qquad I = I_0e^{-t/RC}
$$

Smoothing capacitors in rectifier circuits use exactly this behaviour: between peaks the capacitor discharges through the load, and a large $RC$ compared with the time between peaks keeps the ripple small (see the a.c. topic).

## Common mistakes

:::mistake{title="Thinking the decay is linear"}
The capacitor does not lose equal amounts of charge in equal times; it loses equal **fractions**.
:::

:::mistake{title="Mixing lg and ln"}
Use natural logarithms (ln). With $\lg$ (base 10) the gradient is $-\dfrac{1}{2.303\,RC}$.
:::

:::mistake{title="Forgetting prefixes in RC"}
$22\ \text{k}\Omega \times 470\ \mu\text{F} = 22 \times 10^{3} \times 470 \times 10^{-6}\ \text{s}$; leaving out the powers of ten gives nonsense time constants.
:::

:::mistake{title="Saying the current reverses during discharge without explanation"}
During discharge the current flows in the opposite direction to the charging current, but it still decays exponentially from its initial value.
:::

## Exam tips

:::exam-tip{title="Sketch described in words"}
Describe a discharge curve as: starts at the initial value on the $y$-axis, gradient steepest at $t = 0$, gradient decreasing, approaching zero asymptotically; mark 37% at $t = RC$.
:::

:::exam-tip{title="Show that and determine"}
For *show that the time constant has the unit of time*, use $\Omega\,\text{F} = (\text{V A}^{-1})(\text{C V}^{-1}) = \text{C A}^{-1} = \text{s}$. For *determine RC from a graph*, plot $\ln V$ against $t$ and use gradient $= -1/RC$; quote the unit.
:::

:::exam-tip{title="Which papers"}
Discharge calculations appear in Cambridge Paper 4 and ZIMSEC Papers 1 and 2; the $\ln V$ graph is a classic data-analysis task in Cambridge Paper 5 and ZIMSEC Paper 4.
:::

## Summary

:::summary
- During discharge, $Q$, $V$ and $I$ all decay as $x = x_0e^{-t/RC}$.
- The time constant $\tau = RC$ (in s) is the time to fall to 37%; the time to halve is $0.693\,RC$.
- $\ln V = \ln V_0 - t/RC$: a graph of $\ln V$ against $t$ has gradient $-1/RC$.
- Area under the $I$-$t$ graph = charge that flows; gradient of the $Q$-$t$ graph = $-I$.
- Charging: current decays with time constant $RC$; charge and p.d. rise towards $CE$ and $E$ (63% after $RC$).
:::
