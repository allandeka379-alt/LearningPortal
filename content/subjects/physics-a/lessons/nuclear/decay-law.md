---
{
  "key": "nuclear.decay-law",
  "title": "Radioactive decay: activity, decay constant and half-life",
  "summary": "Explain the random and spontaneous nature of radioactive decay and the evidence from count-rate fluctuations, define activity, the becquerel, the decay constant and half-life, use A = λN, λ = 0.693/t½ and x = x₀e^(−λt), correct count rates for background, find λ from a graph of ln(count rate) against time, and apply the decay law to carbon dating and the choice of isotopes.",
  "concepts": ["aphys.nuclear.decay-law"],
  "estimatedMinutes": 55,
  "level": "core"
}
---
## Introduction

Archaeologists dating charcoal from the hearths of Great Zimbabwe, doctors choosing a tracer for a thyroid scan at Parirenyatwa Hospital and engineers planning how long spent reactor fuel must be stored all use the same law. You can never predict when a particular nucleus will decay, yet a large sample decays in a perfectly predictable, exponential way.

This lesson explains what "random and spontaneous" means, defines activity, the decay constant and half-life, derives and uses the exponential decay equation, and shows how to find the decay constant from experimental data.

You should already know the types of radiation, background radiation, logarithms (ln and e), and how to plot a straight-line graph.

## Key definitions

:::definition{term="Random decay"}
It is impossible to predict when a particular nucleus will decay; each nucleus has a constant probability of decaying per unit time.
:::

:::definition{term="Spontaneous decay"}
Decay is not affected by external factors such as temperature, pressure or chemical combination.
:::

:::definition{term="Activity A"}
The number of nuclei that decay per unit time. Its unit is the becquerel: $1\ \text{Bq} = 1$ decay per second.
:::

:::definition{term="Decay constant λ"}
The probability that an individual nucleus will decay per unit time.
:::

:::definition{term="Half-life t½"}
The mean time taken for half of the active (undecayed) nuclei in a sample to decay.
:::

:::formula{name="Activity"}
$$
A = \lambda N
$$

$A$ in Bq; $\lambda$ in $\text{s}^{-1}$; $N$ number of undecayed nuclei.
:::

:::formula{name="Exponential decay"}
$$
x = x_0e^{-\lambda t}
$$

$x$ can be $N$, $A$ or the (corrected) count rate $C$; $x_0$ its value at $t = 0$.
:::

:::formula{name="Half-life and decay constant"}
$$
\lambda = \frac{\ln 2}{t_{1/2}} = \frac{0.693}{t_{1/2}}
$$
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: ZIMSEC Form 6 (nuclear physics) and Cambridge A Level topic 23 (Paper 4). Cambridge Paper 5 often sets a data-analysis question on a ln graph of count rate.
:::

## Evidence that decay is random

A Geiger-Müller tube and counter placed near a long-lived source record different counts in equal time intervals, for example 108, 97, 115, 102 counts in successive 10 s intervals. The fluctuations about a mean are the signature of a random process: in each interval a different, unpredictable number of nuclei happen to decay. Because the source is long-lived, the mean itself hardly changes.

## Where the exponential law comes from

Each nucleus has the same probability $\lambda$ of decaying per unit time, so in a short time $\Delta t$ the expected number of decays is $\lambda N\Delta t$:

$$
\frac{\Delta N}{\Delta t} = -\lambda N
$$

The rate of decrease is proportional to the number left: the defining property of exponential decay. Its solution is $N = N_0e^{-\lambda t}$. Since $A = \lambda N$, the activity and the count rate (a fixed fraction of the activity for a fixed detector) decay in the same way.

### Half-life

Put $N = N_0/2$ at $t = t_{1/2}$: $\tfrac{1}{2} = e^{-\lambda t_{1/2}}$, so $\lambda t_{1/2} = \ln 2$ and $\lambda = 0.693/t_{1/2}$. After $n$ half-lives the fraction left is $(\tfrac{1}{2})^n$.

## Graphs and background correction

Background radiation adds a roughly constant count rate, so it must be **measured with the source removed** and **subtracted** from every reading before the decay law is applied.

Readings from a short-lived gas source, background $0.5\ \text{s}^{-1}$:

| $t\,/\,\text{s}$ | measured rate$\,/\,\text{s}^{-1}$ | corrected rate $R\,/\,\text{s}^{-1}$ | $\ln(R/\text{s}^{-1})$ |
| --- | --- | --- | --- |
| 0 | 40.5 | 40.0 | 3.69 |
| 20 | 32.1 | 31.6 | 3.45 |
| 40 | 24.6 | 24.1 | 3.18 |
| 60 | 19.7 | 19.2 | 2.95 |
| 80 | 15.2 | 14.7 | 2.69 |
| 100 | 12.2 | 11.7 | 2.46 |
| 120 | 9.7 | 9.2 | 2.22 |

A graph of $R$ against $t$ is a curve that falls by the same fraction in equal times. Taking logs, $\ln R = \ln R_0 - \lambda t$: a graph of $\ln R$ against $t$ is a **straight line** of gradient $-\lambda$ and intercept $\ln R_0$. Here the gradient is $(2.22 - 3.69)/120 = -0.01225\ \text{s}^{-1}$, so $\lambda = 0.0123\ \text{s}^{-1}$ and $t_{1/2} = 0.693/0.01225 = 56.6\ \text{s}$.

![Corrected count rate against time for the short-lived gas source: an exponential fall from 40.0 per second, with equal fractions lost in equal times; the rate halves to 20 per second after about 56.6 s, the half-life.](media:diagrams/decay-count-rate-graph.png "Figure: radioactive decay is exponential; the half-life is read from the curve")

![Graph of ln R against t for the decay data: a straight line from 3.69 at t = 0 to 2.22 at 120 s, with gradient −0.01225 per second, so the decay constant is 0.0123 per second and the half-life 56.6 s.](media:diagrams/decay-ln-graph.png "Figure: ln R against t is a straight line of gradient −λ")

## Applications

- **Carbon dating.** Living things keep the same ratio of carbon-14 to carbon-12 as the atmosphere. After death, carbon-14 ($t_{1/2} = 5730$ years) decays and is not replaced, so the activity per gram of carbon falls exponentially; comparing it with that of living material gives the age (useful for a few hundred to about 50 000 years).
- **Choosing an isotope.** Medical tracers need a short half-life (hours to days) so that the patient's dose is small, but long enough to complete the scan, and a gamma emitter so that radiation leaves the body to be detected. Industrial thickness gauges need a long half-life so that the count rate is steady for years, and beta radiation for paper or thin metal.

## Worked examples

:::worked-solution[Activity of a sample]
Find the activity of $1.0\ \mu\text{g}$ of cobalt-60 (half-life 5.27 years, molar mass $0.060\ \text{kg mol}^{-1}$). Take 1 year $= 3.16 \times 10^{7}\ \text{s}$.

1. $\lambda = 0.693/(5.27 \times 3.16 \times 10^{7}) = 4.16 \times 10^{-9}\ \text{s}^{-1}$.
2. $N = \dfrac{1.0 \times 10^{-9}}{0.060} \times 6.02 \times 10^{23} = 1.00 \times 10^{16}$.
3. $A = \lambda N = 4.18 \times 10^{7}\ \text{Bq}$ (using the unrounded $\lambda$).
:::

:::worked-solution[Activity after a given time]
A hospital receives iodine-131 (half-life 8.0 days) with activity $4.0 \times 10^{8}\ \text{Bq}$. Find its activity 20 days later.

1. $\lambda = 0.693/8.0 = 0.0866\ \text{day}^{-1}$ (units of time need only be consistent).
2. $A = A_0e^{-\lambda t} = 4.0 \times 10^{8} \times e^{-0.0866 \times 20} = 4.0 \times 10^{8} \times 0.177$.
3. $A = 7.07 \times 10^{7}\ \text{Bq}$.
:::

:::worked-solution[Carbon dating]
Charcoal from an ancient hearth has 0.35 of the carbon-14 activity per gram of living wood. Estimate its age.

1. $\lambda = 0.693/5730 = 1.21 \times 10^{-4}\ \text{year}^{-1}$.
2. $0.35 = e^{-\lambda t}$, so $t = \dfrac{\ln(1/0.35)}{\lambda}$.
3. $t = 8680$ years (about 1.5 half-lives).
:::

## Common mistakes

:::mistake{title="Inconsistent time units"}
$\lambda t$ must be dimensionless: if $\lambda$ is in $\text{s}^{-1}$, $t$ must be in s. To find an activity in Bq, $\lambda$ must be in $\text{s}^{-1}$.
:::

:::mistake{title="Background not subtracted"}
Subtract the background count rate from every reading before halving or taking logs; otherwise the count never falls to half of half.
:::

:::mistake{title="lg instead of ln"}
The gradient of a $\ln$ graph gives $-\lambda$. Using $\lg$ gives $-\lambda/2.30$.
:::

:::mistake{title="Half-life means half the time"}
After two half-lives one quarter (not zero) remains.
:::

## Exam tips

:::exam-tip{title="Which papers"}
Cambridge Paper 4 (A Level topic 23) and Paper 5 data analysis; ZIMSEC Papers 1-4 (Form 6). Expect definitions, $A = \lambda N$ with moles, exponential calculations, ln graphs with background correction, and isotope-choice explanations.
:::

:::exam-tip{title="Command words"}
*Define* the decay constant: "probability of decay per unit time" of a nucleus. *Explain* what "random" means and the evidence (fluctuating count rate). *Show that* $\lambda = 0.693/t_{1/2}$: substitute $N = N_0/2$. *Determine* $\lambda$ from a graph: gradient of $\ln C$ against $t$, with unit. *Suggest* a suitable isotope: give half-life and radiation type with reasons.
:::

## Summary

:::summary
- Decay is random (unpredictable for one nucleus) and spontaneous (unaffected by external conditions); count rates fluctuate.
- $A = \lambda N$; activity in becquerels (decays per second).
- $x = x_0e^{-\lambda t}$ for $N$, $A$ or corrected count rate; $\lambda = 0.693/t_{1/2}$.
- Subtract background; $\ln C$ against $t$ is a straight line of gradient $-\lambda$.
- Carbon dating uses carbon-14 ($t_{1/2} = 5730$ years); medical tracers need short half-lives and gamma emission.
:::
