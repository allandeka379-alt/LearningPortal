---
{
  "key": "ac.transformers-transmission",
  "title": "Transformers and power transmission",
  "summary": "Explain how an iron-cored transformer works by changing flux linkage, use the ideal transformer relations Vs/Vp = Ns/Np = Ip/Is, describe the causes of energy losses (eddy currents, winding resistance, hysteresis, flux leakage) and how they are reduced, calculate efficiency, and explain why electrical power is transmitted at high voltage through the national grid.",
  "concepts": ["aphys.ac.transformers-transmission"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Electricity generated at Kariba South or Hwange travels hundreds of kilometres to homes in Harare, Bulawayo and Mutare along ZESA's transmission lines. The generators produce alternating current at a modest voltage; transformers at the power station raise it to hundreds of kilovolts for the long journey, and a chain of substations steps it down again until it reaches a wall socket at 230 V. Without transformers, much of the energy would be lost as heat in the cables. This lesson explains how a transformer works and why high-voltage transmission saves so much energy.

You should already know Faraday's and Lenz's laws of electromagnetic induction, magnetic flux and flux linkage, r.m.s. values and $P = VI = I^2R$.

## Key definitions

:::definition{term="Transformer"}
A device that changes the size of an alternating voltage, consisting of a primary coil and a secondary coil wound on a common laminated soft-iron core.
:::

:::definition{term="Step-up and step-down transformers"}
A step-up transformer has more turns on the secondary than on the primary, so $V_s > V_p$; a step-down transformer has fewer secondary turns, so $V_s < V_p$.
:::

:::definition{term="Ideal transformer"}
A transformer with no energy losses: all the flux produced by the primary links the secondary, and the input power equals the output power.
:::

:::definition{term="Efficiency"}
The ratio of useful output power to input power, $\eta = \dfrac{P_{\text{out}}}{P_{\text{in}}} = \dfrac{V_sI_s}{V_pI_p}$, often given as a percentage.
:::

:::formula{name="Turns ratio (ideal transformer)"}
$$
\frac{V_s}{V_p} = \frac{N_s}{N_p} = \frac{I_p}{I_s}
$$

$V$ = r.m.s. voltage (V), $N$ = number of turns, $I$ = r.m.s. current (A); subscripts p (primary) and s (secondary).
:::

:::formula{name="Power lost in a transmission cable"}
$$
P_{\text{loss}} = I^2R = \left(\frac{P}{V}\right)^2R
$$

$P$ = power transmitted (W), $V$ = transmission voltage (V), $R$ = total resistance of the cables (Ω).
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Transformers and power transmission are ZIMSEC Form 6 (scope to be confirmed against the syllabus). Cambridge 9702 assumes only IGCSE knowledge of transformers; its A Level a.c. topic covers r.m.s. values and rectification.
:::

## How a transformer works

1. An alternating current in the primary coil produces an **alternating magnetic flux** in the soft-iron core.
2. The core, made of a material that is easily magnetised, guides almost all of this flux through the secondary coil.
3. The flux linkage of the secondary coil therefore **changes continuously**.
4. By Faraday's law, an alternating e.m.f. of the same frequency is induced in the secondary.

Because the same changing flux $\Phi$ passes through every turn of both coils, the e.m.f. per turn is the same in each coil ($\mathrm{d}\Phi/\mathrm{d}t$). So the voltages are in the ratio of the turns: $\dfrac{V_s}{V_p} = \dfrac{N_s}{N_p}$.

A transformer **does not work with steady d.c.**: a constant current produces a constant flux, the flux linkage does not change, and no e.m.f. is induced (except briefly when the current is switched on or off).

For an ideal transformer, energy is conserved: $V_pI_p = V_sI_s$, so $\dfrac{I_p}{I_s} = \dfrac{V_s}{V_p}$. Stepping the voltage **up** steps the current **down** by the same factor.

:::worked-solution[A step-down transformer for a 12 V lamp]
A transformer with $1150$ primary turns is connected to the $230\ \text{V}$ mains and must light a $12\ \text{V}$, $24\ \text{W}$ lamp. Assuming it is ideal, find the secondary turns and both currents.

1. $N_s = N_p\dfrac{V_s}{V_p} = 1150 \times \dfrac{12}{230} = 60$ turns.
2. Secondary current: $I_s = \dfrac{P}{V_s} = \dfrac{24}{12} = 2.0\ \text{A}$.
3. Primary current: $I_p = \dfrac{P}{V_p} = \dfrac{24}{230} = 0.104\ \text{A}$ (check: $I_p/I_s = 12/230$).
:::

## Energy losses and how they are reduced

Real transformers are very efficient (large ones over 99%), but some energy is always lost, mostly as heat:

| Loss | Cause | Reduced by |
|---|---|---|
| Copper (resistive) loss | $I^2R$ heating in the resistance of the windings | thick copper wire of low resistance, especially in the high-current winding |
| Eddy currents | the changing flux induces currents circulating inside the iron core, heating it | **laminating** the core: thin sheets insulated from one another, which greatly increase the resistance to circulating currents |
| Hysteresis | energy needed to magnetise and demagnetise the core every cycle | a soft magnetic material (soft iron or silicon steel) that is easily magnetised and demagnetised |
| Flux leakage | some flux from the primary does not pass through the secondary | winding the coils on top of each other on a well-designed closed core |

Laminations work because the eddy currents would flow in loops perpendicular to the flux; the insulating layers between thin sheets break these loops into tiny paths of high resistance, so the induced currents, and the heating $I^2R$, are much smaller.

## Why transmit at high voltage?

A power station sends a fixed power $P = VI$ along cables of total resistance $R$. The power lost as heat in the cables is $I^2R$. Transmitting the same power at a higher voltage needs a smaller current, $I = P/V$, and the loss falls as the **square** of the current: increasing the voltage by a factor of 10 reduces the loss by a factor of 100.

:::worked-solution[Losses at two transmission voltages]
A line of total resistance $4.0\ \Omega$ carries $5.0\ \text{MW}$ to a town. Compare the power lost when the power is sent at $33\ \text{kV}$ and at $11\ \text{kV}$.

1. At $33\ \text{kV}$: $I = \dfrac{5.0 \times 10^{6}}{33 \times 10^{3}} = 152\ \text{A}$; loss $= 152^2 \times 4.0 = 9.2 \times 10^{4}\ \text{W}$ (1.8% of the power).
2. At $11\ \text{kV}$: $I = \dfrac{5.0 \times 10^{6}}{11 \times 10^{3}} = 455\ \text{A}$; loss $= 455^2 \times 4.0 = 8.3 \times 10^{5}\ \text{W}$ (17%).
3. Three times the voltage gives nine times smaller loss.
:::

High voltage also allows **thinner, lighter cables** for the same loss, saving copper or aluminium and allowing pylons to be further apart. The limits are the cost of insulation, the height of pylons needed to keep high-voltage lines safely clear of people and trees, and corona discharge. Alternating current is used for the grid because transformers make it easy and efficient to change the voltage at each stage.

**The grid in outline.** Generator voltage (typically about 11 to 25 kV) → step-up transformer at the power station → transmission lines at very high voltage (for example 330 kV or 420 kV on parts of the ZESA network) → step-down transformers at substations → distribution lines (for example 33 kV and 11 kV) → local pole or ground transformers → 230 V to consumers.

## Common mistakes

:::mistake{title="Saying a transformer increases power"}
A step-up transformer increases voltage but reduces current; the output power can never exceed the input power.
:::

:::mistake{title="Using P = V²/R for cable losses"}
In $V^2/R$, $V$ would have to be the p.d. **across the cable**, not the transmission voltage. Use $I^2R$ with $I = P/V$.
:::

:::mistake{title="Saying laminations stop eddy currents completely"}
They greatly reduce eddy currents, not eliminate them.
:::

:::mistake{title="Saying the core carries current to the secondary"}
No current passes through the core between the coils; the coils are linked only by the changing magnetic flux.
:::

## Exam tips

:::exam-tip{title="Explain the principle"}
Use the chain: alternating current in primary → alternating flux in core → changing flux linkage in secondary → e.m.f. induced (Faraday's law). Each link usually earns a mark.
:::

:::exam-tip{title="Transmission calculations"}
Find the current first ($I = P/V$), then the loss ($I^2R$), then the percentage. State that a higher voltage means a smaller current for the same power.
:::

:::exam-tip{title="Which papers"}
ZIMSEC Paper 1 (principle and losses), Papers 2 and 3 (calculations with efficiency and transmission).
:::

## Summary

:::summary
- An alternating primary current makes an alternating flux in the core that induces an e.m.f. in the secondary; steady d.c. induces no e.m.f.
- Ideal transformer: $V_s/V_p = N_s/N_p = I_p/I_s$ and $V_pI_p = V_sI_s$.
- Losses: winding resistance, eddy currents (reduced by laminations), hysteresis (soft iron), flux leakage.
- Efficiency $= P_{\text{out}}/P_{\text{in}}$.
- High-voltage transmission reduces the current and so the $I^2R$ loss, which falls as the square of the current.
:::
