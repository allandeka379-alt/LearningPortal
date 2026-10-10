---
{
  "key": "circuits.potentiometer",
  "title": "The potentiometer and null methods",
  "summary": "Use the slide-wire potentiometer to compare potential differences by balance lengths, explain why a null method draws no current from the cell under test, compare e.m.f.s and measure internal resistance, and (ZIMSEC) use the Wheatstone bridge and metre bridge.",
  "concepts": ["aphys.circuits.potentiometer"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Every voltmeter draws some current, so it disturbs the circuit it measures and, across a cell, reads the terminal p.d. rather than the e.m.f. Before electronic meters with enormous input resistance were common, physicists solved this with a **null method**: a circuit adjusted until a sensitive meter reads zero, at which point no current flows through the item being measured. The slide-wire potentiometer is the classic example, and it still teaches the clearest lesson about measurement without disturbance.

You should know about potential dividers, e.m.f. and internal resistance, and that the resistance of a uniform wire is proportional to its length.

## Key definitions

:::definition{term="Slide-wire potentiometer"}
A long uniform resistance wire with a steady current maintained in it by a driver cell, so that the p.d. between one end and any point on the wire is proportional to the length of wire between them.
:::

:::definition{term="Balance point (null point)"}
The point on the potentiometer wire at which the galvanometer in the test circuit shows no deflection, so that no current flows in the test circuit.
:::

:::definition{term="Null method"}
A method of measurement in which a circuit is adjusted until a detector (here a galvanometer) reads zero; the result does not depend on the calibration of the detector.
:::

:::formula{name="Balance lengths are proportional to p.d."}
$$
\frac{V_1}{V_2} = \frac{l_1}{l_2} \qquad \frac{E_1}{E_2} = \frac{l_1}{l_2}
$$

$l$ is the balance length measured from the end of the wire to which the test cell's like terminal is connected.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards require the potentiometer as a means of comparing p.d.s and the galvanometer in null methods (Cambridge AS 10.3; ZIMSEC Form 5). The Wheatstone bridge is included for ZIMSEC (to be confirmed); it is not required by Cambridge.
:::

## How the potentiometer works

The arrangement is described in words:

1. A **driver cell** (e.m.f. larger than any p.d. to be measured) is connected across the ends A and B of a uniform resistance wire about one metre long, usually in series with a rheostat to set the current.
2. The **test cell** has its positive terminal joined to A (the same end as the driver cell's positive terminal). Its negative terminal connects through a **galvanometer** and a protective resistor to a **jockey**, a sliding contact touched onto the wire.
3. The jockey is moved until the galvanometer reads zero. The length AJ is the balance length $l$.

Because the wire is uniform, its resistance per unit length is constant, so with a steady current the p.d. along the wire is proportional to length. At balance the p.d. across AJ exactly equals the e.m.f. of the test cell; the two oppose each other round the test loop, so no current flows through the galvanometer or the test cell.

:::worked-solution[Reading an e.m.f.]
The p.d. across the whole $1.000\ \text{m}$ wire is $2.00\ \text{V}$. A cell balances at $72.5\ \text{cm}$.

1. P.d. per unit length $= \dfrac{2.00}{100.0} = 0.0200\ \text{V cm}^{-1}$.
2. $E = 0.0200 \times 72.5 = 1.45\ \text{V}$.
:::

## Why a null method gives the e.m.f.

At balance there is **no current** in the test cell, so there are no lost volts across its internal resistance: the balance p.d. equals the true e.m.f. A voltmeter connected across the cell would draw a small current and read $E - Ir$. The galvanometer is used only to detect zero, so its calibration does not matter; a protective resistor in series with it is short-circuited (or removed) near balance to make the detector sensitive.

## Comparing e.m.f.s

Balance a standard cell of known e.m.f., then the cell under test, without changing the current in the wire.

:::worked-solution[Comparing two cells]
A standard cell of e.m.f. $1.018\ \text{V}$ balances at $50.9\ \text{cm}$. A test cell balances at $74.0\ \text{cm}$.

1. $\dfrac{E_x}{1.018} = \dfrac{74.0}{50.9}$.
2. $E_x = 1.018 \times \dfrac{74.0}{50.9} = 1.480\ \text{V}$.
:::

No balance point can be found if the test e.m.f. is larger than the p.d. across the whole wire, or if the test cell is connected the wrong way round (like terminals not joined): then the galvanometer deflects the same way wherever the jockey is placed.

## Measuring internal resistance

1. Find the balance length $l_0$ with the test cell on open circuit: the p.d. is its e.m.f., $E \propto l_0$.
2. Connect a known resistor $R$ across the cell and find the new balance length $l$: the p.d. is the terminal p.d., $V \propto l$.
3. $E = V + Ir$ with $I = V/R$ gives $r = R\left(\dfrac{E}{V} - 1\right) = R\left(\dfrac{l_0}{l} - 1\right)$.

:::worked-solution[Internal resistance of a cell]
A cell balances at $76.0\ \text{cm}$ on open circuit and at $63.0\ \text{cm}$ with a $5.0\ \Omega$ resistor across it.

1. $r = R\left(\dfrac{l_0}{l} - 1\right) = 5.0 \times \left(\dfrac{76.0}{63.0} - 1\right)$.
2. $r = 5.0 \times 0.206 = 1.03\ \Omega$.
:::

## The Wheatstone bridge (ZIMSEC detail)

Four resistances P, Q, R and S form a loop P-Q-S-R. A cell is connected across one diagonal (between the P-R junction and the Q-S junction) and a galvanometer across the other. When the galvanometer reads zero the bridge is **balanced**, and

$$
\frac{P}{Q} = \frac{R}{S}.
$$

In the **metre bridge**, a uniform metre wire replaces R and S; a jockey on the wire finds balance. With a known resistance $R_k$ in one gap and the unknown $X$ in the other, and the balance point at length $l$ from the end beside $X$: $\dfrac{X}{R_k} = \dfrac{l}{100 - l}$.

:::worked-solution[A metre bridge]
A $30\ \Omega$ resistor is in the right-hand gap. Balance is found $40.0\ \text{cm}$ from the left-hand end, beside the unknown resistor.

1. $\dfrac{X}{30} = \dfrac{40.0}{60.0}$.
2. $X = 20.0\ \Omega$.
3. For the best precision, choose the known resistor so the balance point is near the middle of the wire.
:::

## Common mistakes

:::mistake{title="Connecting the test cell the wrong way round"}
The like terminals (positive to positive) of the driver and test cells must be joined at the same end of the wire, or no balance point exists.
:::

:::mistake{title="Changing the wire current between readings"}
Comparing balance lengths only works if the p.d. per unit length is the same for both; do not adjust the rheostat between the two balances.
:::

:::mistake{title="Using a driver cell that is too weak"}
If the p.d. across the whole wire is less than the e.m.f. being measured, no balance is possible.
:::

## Exam tips

:::exam-tip{title="Explain the advantage"}
For *explain why the potentiometer measures e.m.f.*, write: at balance no current flows through the cell, so there is no p.d. across its internal resistance; the balance p.d. equals the e.m.f.
:::

:::exam-tip{title="Suggest reasons for no balance"}
Driver e.m.f. too small (or rheostat resistance too large), test cell reversed, or a broken connection.
:::

:::exam-tip{title="Which papers"}
Potentiometer reasoning appears in ZIMSEC Paper 1 and Cambridge Paper 1 items and in ZIMSEC Paper 2 and Cambridge Paper 2; the metre bridge appears in ZIMSEC-style practical and theory questions.
:::

## Summary

:::summary
- A uniform wire with a steady current has p.d. proportional to length, so balance lengths compare p.d.s: $E_1/E_2 = l_1/l_2$.
- At balance the galvanometer shows no current, so the test cell's e.m.f. is measured without lost volts.
- Internal resistance: $r = R(l_0/l - 1)$.
- No balance if the driver p.d. is too small or the test cell is reversed.
- ZIMSEC: Wheatstone bridge balance $P/Q = R/S$; metre bridge $X/R_k = l/(100 - l)$.
:::
