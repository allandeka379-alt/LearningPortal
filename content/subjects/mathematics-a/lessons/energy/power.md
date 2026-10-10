---
{
  "key": "energy.power",
  "title": "Power: the rate of doing work",
  "summary": "Define power as the rate of doing work, use average power and P = Fv, and solve problems on the greatest speed and the instantaneous acceleration of a vehicle on a level road or a hill against resistance.",
  "concepts": ["amaths.energy.power"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Two kombis can climb the same hill out of Mutare; the one with the more powerful engine does it faster. A borehole pump in Masvingo and a hand pump can both lift the same water, but at very different rates. **Power** measures how quickly work is done, and it explains why a vehicle has a top speed: at full power, the driving force falls as the speed rises, until it only just balances the resistance.

Power is examined by ZIMSEC in Mechanics Form 6 (topic 6.9) and by Cambridge in Paper 4 (topic 4.5), usually in a question about a car or lorry on a level road or a hill, combined with Newton's second law.

## Key definitions

:::definition{term="Power"}
The rate at which a force does work. Its unit is the watt (W): $1$ W $= 1$ J s$^{-1}$. A kilowatt (kW) is $1000$ W.
:::

:::definition{term="Average power"}
$\text{average power} = \dfrac{\text{work done}}{\text{time taken}}$.
:::

:::formula{name="Power of a moving force"}
$$
P = Fv
$$
:::

Here $F$ is the force (in N) acting in the direction of motion and $v$ the speed (in m s$^{-1}$) at that instant. Neither board prints this; learn it and its derivation: in a short time $\delta t$ the force moves the body $\delta s$ and does work $F\,\delta s$, so the rate of working is $F\dfrac{\delta s}{\delta t} \to Fv$.

## Average power

:::worked-solution[Example 1: a crane lifts a load of mass $400$ kg through a height of $15$ m at constant speed in $20$ s. Take $g = 10$ m s$^{-2}$. Find the average power of the crane.]
1. At constant speed the tension equals the weight, $4000$ N, and there is no gain in KE.
2. Work done $= 4000 \times 15 = 60\,000$ J (equal to the gain in PE).
3. Average power $= \dfrac{60\,000}{20} = 3000$ W $= 3$ kW.
4. Check with $P = Fv$: the speed is $\dfrac{15}{20} = 0.75$ m s$^{-1}$, so $P = 4000 \times 0.75 = 3000$ W.
:::

## Driving force from power

For a vehicle whose engine works at power $P$, the driving force at speed $v$ is

$$
F = \frac{P}{v}.
$$

At low speed the driving force is large; as the speed rises, it falls. Remember to convert kilowatts to watts before dividing.

### Greatest speed

The vehicle speeds up as long as the driving force exceeds the resistances. It reaches its **greatest (terminal) speed** when the acceleration is zero, so the driving force exactly balances the total resistance:

$$
\frac{P}{v_{\max}} = \text{total resistance}.
$$

:::worked-solution[Example 2: the engine of a car works at a maximum power of $36$ kW. On a level road the resistance to motion is a constant $1200$ N. Find the greatest speed of the car.]
1. At the greatest speed, $a = 0$, so the driving force equals the resistance: $\dfrac{36\,000}{v} = 1200$.
2. $v = \dfrac{36\,000}{1200} = 30$ m s$^{-1}$, which is $108$ km h$^{-1}$.
:::

## Acceleration at an instant, and hills

For the acceleration at a particular speed, find the driving force at that speed from $P = Fv$, then use Newton's second law along the road. On a hill inclined at $\alpha$, the component of the weight $mg\sin\alpha$ acts down the slope: it adds to the resistance going up and helps going down.

:::worked-solution[Example 3 (exam style): a car of mass $1000$ kg moves up a straight hill inclined at $\alpha$ to the horizontal, where $\sin\alpha = 0.05$. The engine works at a constant $24$ kW and the resistance is a constant $600$ N. Take $g = 10$ m s$^{-2}$. (a) Find the acceleration of the car when its speed is $12$ m s$^{-1}$. (b) Find the greatest speed of the car up the hill.]
1. (a) Driving force at $12$ m s$^{-1}$: $F = \dfrac{24\,000}{12} = 2000$ N.
2. Weight component down the hill: $1000 \times 10 \times 0.05 = 500$ N.
3. N2L up the hill: $2000 - 600 - 500 = 1000a$, so $a = 0.9$ m s$^{-2}$.
4. (b) Greatest speed when $a = 0$: $\dfrac{24\,000}{v} = 600 + 500 = 1100$.
5. $v = \dfrac{24\,000}{1100} = 21.8$ m s$^{-1}$ (3 s.f.).
:::

On the level the same car could reach $\dfrac{24\,000}{600} = 40$ m s$^{-1}$: the hill costs it nearly half its top speed.

### Power when the speed is changing

If the engine's power is constant, the driving force changes as the speed changes, so the acceleration is **not** constant. You must not use *suvat* across such a motion. Use $P = Fv$ at an instant, or the work–energy principle with work done $=$ power $\times$ time over an interval.

For example, if a car's engine works at a constant $15$ kW for $8$ s, it does $15\,000 \times 8 = 120\,000$ J of work, however the speed changes during those seconds. That work goes into kinetic energy, potential energy (on a hill) and work against resistance, exactly as in the work–energy lesson. This combination, power for the engine's work and energy for the rest, is the standard way to deal with a vehicle that accelerates at full power, and it often appears as the final part of an exam question.

### Efficiency in context

Real engines and pumps waste some of their input as heat and sound. When a question gives a useful power output, use it directly; when it gives an input power and an efficiency, multiply first (for instance, $80\%$ of $5$ kW is $4$ kW of useful power).

:::keyfact{title="ZIMSEC and Cambridge"}
The content is the same for both boards. Cambridge Paper 4 uses $g = 10$ m s$^{-2}$ and typically links power to Newton's second law at an instant; ZIMSEC states $g$ (often $9.8$ m s$^{-2}$), gives powers in W or kW, and may also ask you to define power and to explain where $P = Fv$ comes from.
:::

## Common mistakes

:::mistake{title="Forgetting to convert kW"}
$24$ kW is $24\,000$ W. Dividing $24$ by a speed gives a force that is a thousand times too small.
:::

:::mistake{title="Using the greatest speed condition at other speeds"}
The driving force $\frac{P}{v}$ equals the resistance only at the greatest speed, where $a = 0$. At any other speed, use $\frac{P}{v} - \text{resistance} = ma$.
:::

:::mistake{title="Leaving out the weight component on a hill"}
Going up a hill, $mg\sin\alpha$ opposes the motion; going down, it helps.
:::

:::mistake{title="Using suvat at constant power"}
At constant power the driving force varies, so the acceleration varies: the constant-acceleration formulae do not apply.
:::

## Exam tips

:::exam-tip
Write "$F = \frac{P}{v}$" with the numbers substituted as a separate line. It is usually worth a mark on its own.
:::

:::exam-tip
"Find the greatest speed" or "the steady speed" means set the acceleration to zero and balance the forces.
:::

:::exam-tip
Give powers in W or kW as the question does, to 3 significant figures, and state the unit.
:::

## Summary

:::summary
- Power is the rate of doing work, measured in watts ($1$ W $= 1$ J s$^{-1}$).
- Average power $=$ work done $\div$ time taken.
- For a force in the direction of motion, $P = Fv$, so the driving force is $F = \frac{P}{v}$.
- Greatest speed: $a = 0$, so $\frac{P}{v_{\max}}$ equals the total resistance (including $mg\sin\alpha$ uphill).
- At constant power the acceleration is not constant: use $P = Fv$ at an instant, not *suvat*.
:::
