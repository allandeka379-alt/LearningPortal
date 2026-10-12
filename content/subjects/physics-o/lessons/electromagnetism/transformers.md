---
{
  "key": "electromagnetism.transformers",
  "title": "Transformers and the transmission of electricity",
  "summary": "Describe the structure and action of a transformer, use Vp/Vs = Np/Ns and IpVp = IsVs, and explain why electricity is transmitted at high voltage and how transformer losses are reduced.",
  "concepts": ["phys.em.transformers"],
  "objectives": ["cambridge/igcse/physics:4.5.6.1", "cambridge/igcse/physics:4.5.6.2", "cambridge/igcse/physics:4.5.6.3", "cambridge/igcse/physics:4.5.6.4", "cambridge/igcse/physics:4.5.6.5", "cambridge/igcse/physics:4.5.6.6", "cambridge/igcse/physics:4.5.6.7", "cambridge/igcse/physics:4.5.6.8", "zimsec/o-level/physics:13.4.1", "zimsec/o-level/physics:13.4.2", "zimsec/o-level/physics:13.4.3", "zimsec/o-level/physics:13.4.4", "zimsec/o-level/physics:13.4.5"],
  "estimatedMinutes": 35
}
---
## Introduction

Electricity leaves a power station along tall pylons at hundreds of thousands of volts, yet arrives in a house at about $220$–$240\ \text{V}$, and a phone charger then reduces it to about $5\ \text{V}$. The devices that change the voltage at every stage are **transformers**. They are why the mains supply is alternating current.

## Key definitions

:::definition{term="Transformer"}
A device that changes the size of an alternating voltage, made of two coils wound on a soft-iron core.
:::

:::definition{term="Primary and secondary coils"}
The **primary** coil is connected to the input a.c. supply; the **secondary** coil supplies the output.
:::

:::definition{term="Step-up and step-down transformers"}
A **step-up** transformer has more turns on the secondary than on the primary and increases the voltage; a **step-down** transformer has fewer turns on the secondary and decreases the voltage.
:::

## How a transformer works (Cambridge Supplement; ZIMSEC)

1. An **alternating** current in the primary coil produces an alternating magnetic field.
2. The **soft-iron core** carries this changing magnetic field through the secondary coil.
3. The changing field linking the secondary coil **induces an alternating e.m.f.** in it.

A transformer does **not** work with steady d.c.: a constant current gives a constant field, and a constant field induces nothing.

## The transformer equations

![Step-down transformer: a primary coil of 2000 turns connected to a 240 V a.c. supply and a secondary coil of 100 turns giving 12 V, both wound on a soft-iron core. The voltage ratio equals the turns ratio, 240 to 12 equals 2000 to 100.](media:diagrams/transformer-step-down.png "Figure: a step-down transformer with 2000 and 100 turns")

:::formula{name="Turns ratio"}
$$
\frac{V_p}{V_s} = \frac{N_p}{N_s}
$$
where $V$ is the voltage and $N$ the number of turns on the primary (p) and secondary (s) coils.
:::

:::formula{name="Ideal (100% efficient) transformer (Cambridge Supplement; ZIMSEC)"}
$$
I_p V_p = I_s V_s
$$
The power into the primary equals the power out of the secondary.
:::

:::worked-solution[A step-down transformer for a charger]
A transformer reduces $240\ \text{V}$ to $12\ \text{V}$. Its primary coil has $2000$ turns.

1. $\dfrac{N_s}{N_p} = \dfrac{V_s}{V_p}$, so $N_s = 2000 \times \dfrac{12}{240} = 100$ turns.
:::

:::worked-solution[Currents in an ideal transformer]
The same transformer is 100% efficient. The primary current is $0.50\ \text{A}$.

1. Input power: $I_p V_p = 0.50 \times 240 = 120\ \text{W}$.
2. Output current: $I_s = \dfrac{120}{12} = 10\ \text{A}$.
3. Stepping the voltage **down** steps the current **up** by the same factor.
:::

## Transmitting electricity at high voltage

Power stations generate electricity at a few tens of kilovolts. **Step-up** transformers raise this to a very high voltage for the **transmission lines** of the national grid; at the other end, **step-down** transformers in substations reduce it in stages to the mains voltage.

**Why use a high voltage?** For a given power, $P = IV$, so a higher voltage means a **smaller current** in the cables. A smaller current wastes much less energy heating the cables. Thinner, cheaper cables can be used and less energy is lost over long distances.

:::worked-solution[Power lost in the cables (Cambridge Supplement)]
A power station sends $1.0\ \text{MW}$ along cables of total resistance $5.0\ \Omega$. The heating loss is $P = I^2 R$.

1. At $10\ \text{kV}$: $I = \dfrac{P}{V} = \dfrac{1.0 \times 10^{6}}{1.0 \times 10^{4}} = 100\ \text{A}$, so the loss is $100^2 \times 5.0 = 50\,000\ \text{W}$ (5% of the power).
2. At $100\ \text{kV}$: $I = 10\ \text{A}$, so the loss is $10^2 \times 5.0 = 500\ \text{W}$ (0.05%).
3. Ten times the voltage gives one tenth of the current and **one hundredth** of the power loss.
:::

## Energy losses in transformers (ZIMSEC)

Real transformers are very efficient (often over 95%), but some energy is lost:

- **Heating of the coils** by the current: reduced by using thick, low-resistance copper wire.
- **Eddy currents**: the changing field induces currents in the iron core itself, heating it. The core is **laminated** (made of thin sheets insulated from each other) to cut the eddy currents down.
- **Magnetising and demagnetising the core** every cycle: reduced by using **soft iron**, which is easily magnetised and demagnetised.
- **Field leakage**: some of the field does not pass through the secondary; reduced by winding the coils close together on the same core.

## Common mistakes

:::mistake{title="Transformers increase power"}
A step-up transformer increases the voltage but **decreases** the current; it cannot give out more power than goes in.
:::

:::mistake{title="Transformers with d.c."}
A transformer needs a **changing** field, so it only works with a.c. A battery connected to the primary gives no output (except a brief pulse when switched on or off).
:::

## Exam tips

:::exam-tip
Write the turns-ratio equation with the unknown on top, substitute, and check: more secondary turns must mean a higher secondary voltage.
:::

:::exam-tip
For "advantages of high-voltage transmission", say: smaller current → less power lost as heat in the cables ($P = I^2R$) → thinner cables can be used.
:::

## Summary

:::summary
- A transformer has primary and secondary coils on a soft-iron core and works only with a.c.
- The changing field from the primary induces an alternating e.m.f. in the secondary.
- $\dfrac{V_p}{V_s} = \dfrac{N_p}{N_s}$; for an ideal transformer $I_p V_p = I_s V_s$.
- High-voltage transmission means a smaller current and much smaller heating losses ($P = I^2R$).
- Losses are reduced with thick coils, a laminated soft-iron core and closely wound coils (ZIMSEC).
:::
