---
{
  "key": "magnetism.hall-effect",
  "title": "The Hall effect and the Hall probe",
  "summary": "Explain how the Hall voltage arises when charge carriers in a current-carrying slice are deflected by a magnetic field, derive and use V_H = BI/(ntq), explain why semiconductors give larger Hall voltages, and use a Hall probe to measure magnetic flux density.",
  "concepts": ["aphys.magnetism.hall-effect"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

How do you measure the strength of a magnetic field without a balance and a wire? Most laboratories use a **Hall probe**: a thin slice of semiconductor at the end of a stick, connected to a meter that reads directly in millitesla. Hall sensors are everywhere. They detect the position of the rotor in the brushless motors of electric fans and drones, sense wheel speed for anti-lock brakes in modern trucks, and tell a phone when its flip cover is closed.

The effect was discovered by Edwin Hall in 1879. It follows directly from the force on moving charges in the previous lesson. This lesson explains where the Hall voltage comes from, derives its formula, and shows how a Hall probe is used.

You should already know $F = BQv$, the left-hand rule for moving charges, $F = QE$ and $E = V/d$ for a uniform field, and the equation $I = nAvq$ for current in terms of drift velocity.

## Key definitions

:::definition{term="Hall voltage"}
The potential difference produced across a current-carrying conductor or semiconductor, at right angles to both the current and an applied magnetic field, when the charge carriers are deflected sideways by the field.
:::

:::definition{term="Number density of charge carriers"}
The number of free charge carriers per unit volume of the material, $n$, in $\text{m}^{-3}$.
:::

:::formula{name="Hall voltage"}
$$
V_H = \frac{BI}{ntq}
$$

$V_H$ Hall voltage in V; $B$ flux density in T (perpendicular to the slice); $I$ current in A; $n$ number density of carriers in m⁻³; $t$ thickness of the slice **in the direction of the field** in m; $q$ charge of each carrier in C.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge only: A Level topic 20 (Paper 4). The Hall effect is not in the ZIMSEC topic list used here.
:::

## How the Hall voltage arises

Picture a thin rectangular slice lying flat in the plane of the page, with a current flowing from left to right and a uniform magnetic field into the page, through the thin dimension $t$. Let the width of the slice (across the page, from top edge to bottom edge) be $d$.

1. In a metal the carriers are electrons moving from right to left. By the left-hand rule (current to the right, field into the page) the force on each carrier is towards the **top edge**. (For electrons the conventional current direction already accounts for their negative charge.)
2. Electrons pile up on the top edge, leaving the bottom edge short of electrons (positively charged).
3. These separated charges create an **electric field** across the slice, from bottom to top, which pushes electrons down.
4. Charge builds up until the electric force $qE_H$ on each carrier balances the magnetic force $Bqv$. After that, the carriers go straight through and a steady **Hall voltage** $V_H$ is measured between the top and bottom edges.

If the carriers were positive (holes in a p-type semiconductor) moving left to right, the force would also be towards the top edge, but now positive charge collects there. The **sign** of the Hall voltage therefore tells you the sign of the charge carriers.

## Deriving V_H = BI/(ntq)

Balance of forces in the steady state:

$$
qE_H = Bqv \quad\text{with}\quad E_H = \frac{V_H}{d} \quad\Rightarrow\quad V_H = Bvd
$$

The current is $I = nAvq$ with cross-sectional area $A = dt$, so

$$
v = \frac{I}{ndtq}
$$

Substituting:

$$
V_H = Bd\left(\frac{I}{ndtq}\right) = \frac{BI}{ntq}
$$

The width $d$ cancels; the thickness $t$ measured **along the field** remains.

## Why semiconductors are used

$V_H \propto 1/n$. In a metal such as copper, $n \approx 8.5 \times 10^{28}\ \text{m}^{-3}$, and even a large current gives a Hall voltage of only microvolts, hard to measure. A semiconductor has far fewer carriers (typically $10^{20}$ to $10^{24}\ \text{m}^{-3}$), so for the same current the carriers must drift much faster, the magnetic force on each is larger, and $V_H$ reaches millivolts. A thin slice (small $t$) helps too.

## Using a Hall probe

- The probe's face (the slice) must be held **perpendicular to the field lines**; the reading is greatest in this orientation. At an angle $\theta$ between the field and the normal to the slice, only $B\cos\theta$ contributes, so the probe is rotated until the reading is a maximum.
- The current through the slice is kept **constant**, so $V_H \propto B$.
- The probe is **calibrated** in a known field, for example inside a long solenoid or with a commercial reference magnet, so that a reading of $V_H$ converts to $B$.
- Reversing the probe reverses the sign of the reading, which helps to identify the field direction and to cancel offsets.

### A calibration table

A probe with $n = 2.0 \times 10^{22}\ \text{m}^{-3}$, $t = 0.20\ \text{mm}$ and $I = 25\ \text{mA}$ gives:

| $B\,/\,\text{T}$ | $V_H\,/\,\text{mV}$ |
| --- | --- |
| 0.05 | 1.95 |
| 0.10 | 3.91 |
| 0.15 | 5.86 |
| 0.20 | 7.81 |

The graph of $V_H$ against $B$ is a straight line through the origin, gradient $I/(ntq) \approx 39\ \text{mV T}^{-1}$: a reading of $5.0\ \text{mV}$ means $B \approx 0.13\ \text{T}$.

## Worked examples

:::worked-solution[Hall voltage in copper]
A copper strip $0.10\ \text{mm}$ thick carries $5.0\ \text{A}$ in a field of $0.50\ \text{T}$ perpendicular to its face. Copper has $8.5 \times 10^{28}$ free electrons per m³. Find $V_H$.

1. $V_H = \dfrac{BI}{ntq} = \dfrac{0.50 \times 5.0}{8.5 \times 10^{28} \times 0.10 \times 10^{-3} \times 1.60 \times 10^{-19}}$.
2. $V_H = 1.84 \times 10^{-6}\ \text{V}$, under two microvolts: far too small for a practical probe.
:::

:::worked-solution[Semiconductor probe]
A semiconductor slice is $0.20\ \text{mm}$ thick and $4.0\ \text{mm}$ wide, with $n = 2.0 \times 10^{22}\ \text{m}^{-3}$. It carries $25\ \text{mA}$ in a field of $0.10\ \text{T}$. Find the Hall voltage and the drift speed.

1. $V_H = \dfrac{0.10 \times 25 \times 10^{-3}}{2.0 \times 10^{22} \times 0.20 \times 10^{-3} \times 1.60 \times 10^{-19}} = 3.91 \times 10^{-3}\ \text{V} = 3.91\ \text{mV}$.
2. $v = \dfrac{I}{nAq} = \dfrac{25 \times 10^{-3}}{2.0 \times 10^{22} \times (0.20 \times 10^{-3} \times 4.0 \times 10^{-3}) \times 1.60 \times 10^{-19}} = 9.77\ \text{m s}^{-1}$, millions of times faster than drift speeds in copper.
:::

:::worked-solution[Finding the carrier density]
A slice $0.50\ \text{mm}$ thick carrying $30\ \text{mA}$ in a field of $0.25\ \text{T}$ gives $V_H = 4.8\ \text{mV}$. Find $n$, assuming carriers of charge $e$.

1. Rearrange: $n = \dfrac{BI}{V_Htq}$.
2. $n = \dfrac{0.25 \times 30 \times 10^{-3}}{4.8 \times 10^{-3} \times 0.50 \times 10^{-3} \times 1.60 \times 10^{-19}} = 1.95 \times 10^{22}\ \text{m}^{-3}$.
:::

## Common mistakes

:::mistake{title="Width instead of thickness"}
The $t$ in $V_H = BI/(ntq)$ is the dimension **parallel to the field**. The width across which $V_H$ is measured cancels out.
:::

:::mistake{title="Probe at an angle"}
A Hall probe measures only the component of $B$ perpendicular to its face. Rotate it until the reading is a maximum.
:::

:::mistake{title="Metals make good probes"}
Large $n$ gives a tiny Hall voltage. Semiconductors, with small $n$, give a measurable one.
:::

:::mistake{title="Hall voltage grows forever"}
Charge builds up only until the electric force balances the magnetic force; then $V_H$ is steady.
:::

## Exam tips

:::exam-tip{title="Which papers"}
Cambridge Paper 4 (theory) and Paper 5 (a Hall probe is the usual instrument for measuring $B$ in planning questions). Not in the ZIMSEC list used here.
:::

:::exam-tip{title="Command words"}
*Explain* the Hall voltage: force on carriers, build-up of charge on one face, electric field, balance $qE = Bqv$. *Derive* $V_H$: balance of forces plus $I = nAvq$, showing $d$ cancelling. *Explain* why semiconductors are used: smaller $n$, so larger $v$ and $V_H$. *Describe* the use of a probe: face perpendicular to the field, constant current, calibration.
:::

## Summary

:::summary
- Carriers moving through a slice in a perpendicular field are pushed to one face, creating a transverse Hall voltage.
- In the steady state $qV_H/d = Bqv$; with $I = nAvq$ this gives $V_H = BI/(ntq)$, $t$ along the field.
- $V_H \propto 1/n$: semiconductors give millivolts, metals microvolts.
- The sign of $V_H$ reveals the sign of the charge carriers.
- A Hall probe, face perpendicular to $B$, at constant current and calibrated, reads $B$ directly.
:::
