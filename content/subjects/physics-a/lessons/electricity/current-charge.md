---
{
  "key": "electricity.current-charge",
  "title": "Electric current, charge and drift velocity",
  "summary": "Define current as the rate of flow of charge, use Q = It and the quantisation of charge, derive I = nAvq, calculate drift velocities and compare conductors, semiconductors and insulators by their number density of charge carriers.",
  "concepts": ["aphys.electricity.current-charge"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

When a switch is closed in a house in Gweru, the lamp lights almost at once, yet the electrons in the copper wire creep along at well under a millimetre per second. Explaining that apparent paradox needs a clear picture of what a current is: a flow of charge carriers, each carrying a definite, tiny charge, drifting slowly through a material packed with them.

This lesson builds the A-Level model of current. You should already know that current is measured with an ammeter in series, that metals contain free electrons, and how to use standard form. The energy carried by the charge (potential difference and power) is the next lesson.

## Key definitions

:::definition{term="Electric current"}
The rate of flow of electric charge past a point in a circuit: $I = \dfrac{\Delta Q}{\Delta t}$.
:::

:::definition{term="The coulomb"}
The charge that passes a point in one second when there is a steady current of one ampere: $1\ \text{C} = 1\ \text{A s}$. The ampere is the SI base unit; the coulomb is derived from it.
:::

:::definition{term="Charge carrier"}
A charged particle that is free to move through a material and so can carry a current: free electrons in metals, positive and negative ions in electrolytes and ionised gases, electrons and holes in semiconductors.
:::

:::definition{term="Drift velocity"}
The average velocity of the charge carriers along a conductor, superimposed on their much faster random thermal motion, when there is a current.
:::

:::formula{name="Charge and current"}
$$
Q = It
$$

$Q$ is the charge in C that passes in time $t$ in s when the steady current is $I$ in A. For a changing current, the charge is the **area under a graph of current against time**.
:::

:::formula{name="Current and drift velocity"}
$$
I = nAvq
$$

$n$ is the number density of charge carriers (number per unit volume, in $\text{m}^{-3}$), $A$ the cross-sectional area in $\text{m}^2$, $v$ the drift velocity in $\text{m s}^{-1}$ and $q$ the charge on each carrier in C.
:::

:::keyfact{title="Charge is quantised"}
Every charge found on a free particle or an object is a whole-number multiple of the elementary charge $e = 1.60 \times 10^{-19}\ \text{C}$. The electron has charge $-e$, the proton $+e$. One coulomb is the charge of about $6.25 \times 10^{18}$ electrons.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards require $Q = It$, quantisation of charge and $I = Anvq$ with drift-velocity calculations (Cambridge AS 9.1; ZIMSEC Form 5). Cambridge writes the equation as $I = Anvq$; the order of the symbols does not matter.
:::

## Current as a flow of charge

Conventional current is shown flowing from the positive terminal of a supply, round the circuit, to the negative terminal. In a metal the carriers are electrons, which drift the other way; the two descriptions give the same transfer of charge, because a negative charge moving left is equivalent to a positive charge moving right.

In an electrolyte such as copper(II) sulfate solution, positive ions drift towards the cathode and negative ions towards the anode; both movements contribute to the current in the same direction. In a semiconductor, both free electrons and "holes" (vacancies that behave as positive carriers) contribute.

:::worked-solution[Charge delivered by a phone charger]
A charger supplies a steady current of $1.5\ \text{A}$ for $2.0$ hours. Find the charge that flows and the number of electrons this represents.

1. Convert the time: $t = 2.0 \times 3600 = 7200\ \text{s}$.
2. $Q = It = 1.5 \times 7200 = 10\,800\ \text{C}$ (about $1.1 \times 10^{4}\ \text{C}$).
3. Number of electrons $N = \dfrac{Q}{e} = \dfrac{10\,800}{1.60 \times 10^{-19}} = 6.75 \times 10^{22}$.
:::

## Deriving $I = nAvq$

1. Consider a length $L$ of a conductor of uniform cross-sectional area $A$. Its volume is $AL$.
2. The number of carriers in this length is $nAL$, so the total mobile charge is $nALq$.
3. With a drift velocity $v$, all of this charge passes through the end face in a time $t = L/v$.
4. Current $I = \dfrac{Q}{t} = \dfrac{nALq}{L/v} = nAvq$.

For a given current, the drift velocity is **inversely proportional** to the cross-sectional area and to the number density. Where a wire narrows, the carriers must drift faster, because the same charge must pass every cross-section each second (charge is conserved).

:::worked-solution[Drift velocity in a copper wire]
A copper wire of diameter $1.0\ \text{mm}$ carries $3.0\ \text{A}$. Copper has $8.5 \times 10^{28}$ free electrons per cubic metre. Find the drift velocity.

1. Radius $= 0.50 \times 10^{-3}\ \text{m}$, so $A = \pi r^2 = \pi (0.50 \times 10^{-3})^2 = 7.854 \times 10^{-7}\ \text{m}^2$.
2. Rearrange: $v = \dfrac{I}{nAe}$.
3. $v = \dfrac{3.0}{8.5 \times 10^{28} \times 7.854 \times 10^{-7} \times 1.60 \times 10^{-19}} = 2.81 \times 10^{-4}\ \text{m s}^{-1}$.
4. At this speed an electron takes about an hour to drift one metre.
:::

:::worked-solution[A narrower section in series]
The same current passes from the wire above into a section of the same copper with half the diameter. Find the drift velocity there.

1. Halving the diameter quarters the area: $A_2 = A_1/4$.
2. $I$, $n$ and $e$ are unchanged, so $v \propto 1/A$: $v_2 = 4 \times 2.81 \times 10^{-4} = 1.12 \times 10^{-3}\ \text{m s}^{-1}$.
:::

## Why is the drift velocity so small, and why does the lamp light at once?

A metal has an enormous number density of free electrons, so only a tiny average drift is needed to carry an ampere. The electrons also collide constantly with the vibrating positive ions of the lattice, so their random thermal speeds (around $10^{5}\ \text{m s}^{-1}$) produce no net flow; the drift is a small bias on top.

The lamp lights immediately because the **electric field** that drives the electrons is set up throughout the circuit at nearly the speed of light when the switch closes. Electrons everywhere in the circuit, including those already inside the filament, start drifting at almost the same instant. No electron has to travel from the switch to the lamp.

## Conductors, semiconductors and insulators

| Material | Typical $n\,/\,\text{m}^{-3}$ | Behaviour |
|---|---|---|
| Metal (copper) | about $10^{29}$ | Many free electrons; small drift velocity for everyday currents |
| Semiconductor (pure silicon at room temperature) | about $10^{16}$ | Few carriers, so a much larger drift velocity is needed for the same current; $n$ rises steeply with temperature |
| Insulator (glass, PVC) | negligible | Almost no free carriers; essentially no current |

The values are orders of magnitude only. For the same current density, a semiconductor's carriers would have to drift about $10^{13}$ times faster than copper's, which is why pure semiconductors carry only small currents. The rise of $n$ with temperature in a semiconductor is the reason an NTC thermistor's resistance falls as it warms.

## Current-time graphs

When a current changes, $Q = It$ no longer applies directly. The charge is the area under the current-time graph. For example, if a current falls steadily from $4.0\ \text{mA}$ to zero in $10\ \text{s}$, the charge is the triangle's area, $\tfrac{1}{2} \times 4.0 \times 10^{-3} \times 10 = 0.020\ \text{C}$. The same idea is used later for a discharging capacitor.

## Common mistakes

:::mistake{title="Saying current is used up"}
The current entering a component equals the current leaving it. Energy is transferred in the component; charge is not destroyed.
:::

:::mistake{title="Using the diameter as the radius"}
$A = \pi r^2 = \pi d^2/4$. Using the diameter in $\pi r^2$ makes the area four times too large and the drift velocity four times too small.
:::

:::mistake{title="Forgetting unit conversions"}
Convert mm to m before squaring ($1\ \text{mm}^2 = 10^{-6}\ \text{m}^2$), mA to A and hours to seconds.
:::

:::mistake{title="Thinking the electrons move at the speed of the signal"}
The signal (the field) travels at nearly the speed of light; the electrons themselves drift slowly.
:::

## Exam tips

:::exam-tip{title="Define and state"}
*Define current*: rate of flow of charge. *State what is meant by quantised*: charge exists only in whole-number multiples of $e$. Do not define the coulomb as "the charge on $6.25 \times 10^{18}$ electrons"; define it from the ampere and the second.
:::

:::exam-tip{title="Derive and explain"}
For *show that $I = nAvq$*, number every step as above: volume, number of carriers, charge, time to pass, divide. For *explain why the drift velocity is greater in the thinner wire*, say the current is the same (series) and $v = I/(nAq)$ with smaller $A$.
:::

:::exam-tip{title="Which papers"}
Multiple-choice items on units, ratios and drift velocity appear in ZIMSEC Paper 1 and Cambridge Paper 1; short calculations and the derivation appear in ZIMSEC Paper 2 and Cambridge Paper 2.
:::

## Summary

:::summary
- Current is the rate of flow of charge, $I = \Delta Q/\Delta t$; $1\ \text{C} = 1\ \text{A s}$; charge is the area under an $I$-$t$ graph.
- Charge is quantised in multiples of $e = 1.60 \times 10^{-19}\ \text{C}$.
- Carriers: free electrons (metals), ions (electrolytes), electrons and holes (semiconductors).
- $I = nAvq$; for a given current, $v$ is larger in a thinner conductor or a material with fewer carriers.
- Drift velocities in metals are a fraction of a millimetre per second; the field, not the electrons, travels at nearly the speed of light.
:::
