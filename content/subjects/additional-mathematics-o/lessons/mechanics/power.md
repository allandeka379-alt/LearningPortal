---
{
  "key": "mechanics.power",
  "title": "Power: the rate of doing work",
  "summary": "Use power as the rate of doing work, P = W/t, and P = Fv for a vehicle with driving force F at speed v; find the maximum speed when the driving force equals the resistance, and the acceleration at a given speed with F = ma, on level roads and slopes.",
  "concepts": ["amath.mechanics.power"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Two pumps can lift the same tank of water from a borehole, but the more powerful one does it faster. A bus climbing out of the Zambezi valley slows down even with the accelerator pressed to the floor, because its engine has a limited power. Power measures how quickly work is done, and it explains why every vehicle has a top speed.

In ZIMSEC Paper 2, power questions usually involve a car, lorry or train with an engine working at a given rate: you find the driving force at a given speed, the acceleration there, or the greatest possible speed. You need Newton's second law and the idea of work done.

## Key definitions

:::definition{term="Power"}
The rate at which work is done (or energy is transferred). Measured in watts (W): 1 W = 1 J s$^{-1}$. 1 kilowatt (kW) = 1000 W.
:::

:::definition{term="Driving force (tractive force)"}
The forward force produced by a vehicle's engine, acting in the direction of motion.
:::

:::definition{term="Maximum (terminal) speed"}
The greatest speed a vehicle can reach with its engine at a given power: the speed at which the driving force just equals the total resistance, so the acceleration is zero.
:::

:::formula{name="Power"}
$$
P = \frac{W}{t} \qquad P = Fv
$$

$P$ in watts, $W$ in joules, $t$ in seconds, $F$ the driving force in newtons, $v$ the speed in m s$^{-1}$.
:::

## Average power: P = W/t

:::worked-solution[Example 1: an electric pump lifts 600 kg of water through a height of 12 m in 2 minutes. Take $g = 9.8$ m s$^{-2}$. Find the useful power of the pump.]
1. Work done = PE gained $= 600 \times 9.8 \times 12 = 70\,560$ J.
2. Time $= 120$ s.
3. $P = \dfrac{70\,560}{120} = 588$ W.
:::

The same idea measures the power of a person. Running up stairs at a steady speed, all the work goes into potential energy, so the power is the gain in PE divided by the time.

:::worked-solution[Example 2: Farai, of mass 70 kg, runs up a flight of stairs that rises 12 m vertically in 15 s, at a steady speed. Take $g = 9.8$ m s$^{-2}$. Find his average power.]
1. Work done against gravity $= mgh = 70 \times 9.8 \times 12 = 8232$ J.
2. His kinetic energy does not change (steady speed), so this is all the work he does.
3. $P = \dfrac{8232}{15} \approx 549$ W (548.8 W).
4. Walking up the same stairs in 60 s needs the same work but only a quarter of the power, about 137 W.
:::

## Power of a moving vehicle: P = Fv

In a short time $t$ a vehicle moving at speed $v$ travels a distance $vt$, so its driving force $F$ does work $Fvt$. Dividing by $t$ gives

$$
P = Fv
$$

For a fixed power, $F = \dfrac{P}{v}$: the faster the vehicle goes, the smaller its driving force. That is why acceleration falls as speed rises.

:::worked-solution[Example 3: a car's engine produces a driving force of 1800 N while the car moves at 25 m s$^{-1}$. Find the power.]
1. $P = Fv = 1800 \times 25 = 45\,000$ W $= 45$ kW.
:::

## Maximum speed

At maximum speed the acceleration is zero, so the driving force equals the total resistance. With power $P$ and resistance $R$:

$$
v_{\max} = \frac{P}{R}
$$

:::worked-solution[Example 4: a car's engine works at 30 kW against a constant resistance of 1200 N on a level road. Find its maximum speed.]
1. At maximum speed, $F = R = 1200$ N.
2. $v_{\max} = \dfrac{30\,000}{1200} = 25$ m s$^{-1}$ (90 km/h).
:::

## Acceleration at a given speed

Find the driving force from $F = \frac{P}{v}$, then use Newton's second law.

:::worked-solution[Example 5: the car in Example 4 has mass 900 kg. Find its acceleration at the instant when its speed is 15 m s$^{-1}$, with the engine still at 30 kW.]
1. Driving force $= \dfrac{30\,000}{15} = 2000$ N.
2. N2L: $2000 - 1200 = 900a$.
3. $a = \dfrac{800}{900} \approx 0.889$ m s$^{-2}$.
:::

## Hills

Going **up** a slope inclined at $\theta$, the vehicle must also overcome the weight component $mg\sin\theta$ down the slope. Going **down**, that component helps.

$$
\text{uphill: } \frac{P}{v} - R - mg\sin\theta = ma
$$

:::worked-solution[Example 6: a lorry of mass 5000 kg climbs a road inclined at $\theta$ to the horizontal, where $\sin\theta = \frac{1}{25}$. Its engine works at 60 kW and the resistance is 2000 N. Take $g = 9.8$ m s$^{-2}$. Find its maximum speed up the hill.]
1. Weight component down the slope $= 5000 \times 9.8 \times \frac{1}{25} = 1960$ N.
2. At maximum speed: $F = 2000 + 1960 = 3960$ N.
3. $v_{\max} = \dfrac{60\,000}{3960} \approx 15.2$ m s$^{-1}$.
4. On level ground the same lorry could reach $\frac{60\,000}{2000} = 30$ m s$^{-1}$: the hill halves its top speed.
:::

| Situation | Forces opposing motion | Maximum speed |
| --- | --- | --- |
| level road | $R$ | $\dfrac{P}{R}$ |
| uphill, angle $\theta$ | $R + mg\sin\theta$ | $\dfrac{P}{R + mg\sin\theta}$ |
| downhill, angle $\theta$ | $R - mg\sin\theta$ | $\dfrac{P}{R - mg\sin\theta}$ |

:::keyfact{title="ZIMSEC and Cambridge"}
Power is in ZIMSEC Paper 2 Mechanics only; Cambridge 0606 has no mechanics.
:::

## Common mistakes

:::mistake{title="Forgetting kW"}
Change kilowatts to watts before dividing: 30 kW is 30 000 W.
:::

:::mistake{title="Treating the driving force as constant"}
At constant power the driving force changes with speed, $F = \frac{P}{v}$. Recalculate it at each speed.
:::

:::mistake{title="Using P = Fv with the resultant force"}
In $P = Fv$, $F$ is the **driving** force of the engine, not the resultant force.
:::

:::mistake{title="Using km/h in P = Fv"}
The speed must be in m s$^{-1}$ for the power to come out in watts.
:::

## Exam tips

:::exam-tip
"Moving at its maximum speed", "steady speed" and "constant speed" all mean $a = 0$, so the driving force equals the total resistance. State it.
:::

:::exam-tip
Lay out an acceleration question in three lines: $F = \frac{P}{v}$; N2L; answer with units.
:::

:::exam-tip
If the question gives the power in kW, give your answer in kW unless told otherwise, and say which unit you use.
:::

## Summary

:::summary
- Power is the rate of doing work: $P = \frac{W}{t}$, in watts.
- For a vehicle, $P = Fv$ with $F$ the driving force; at constant power $F = \frac{P}{v}$.
- At maximum speed, driving force = total resistance, so $v_{\max} = \frac{P}{\text{resistance}}$.
- Acceleration at speed $v$: $\frac{P}{v} - \text{resistance} = ma$.
- On a hill, include $mg\sin\theta$: against the motion uphill, with it downhill.
:::
