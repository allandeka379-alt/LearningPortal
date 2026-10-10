---
{
  "key": "energy.work-energy",
  "title": "Work, energy and the work–energy principle",
  "summary": "Calculate the work done by a constant force, use kinetic and gravitational potential energy, and relate the change in a system's energy to the work done by external forces, including work against friction and resistance and motion along curved paths.",
  "concepts": ["amaths.energy.work-energy"],
  "estimatedMinutes": 55,
  "level": "core"
}
---
## Introduction

A child at the top of a playground slide in Bulawayo has energy stored because of her height; at the bottom that energy has become speed, minus whatever friction took away. A Hwange coal truck labouring up a gradient converts the energy of its fuel into height and into heat at the brakes and tyres. Energy methods describe such situations with a few scalar equations, without the need to know the acceleration at every instant.

This lesson is examined by ZIMSEC in Mechanics Form 6 (topic 6.9) and by Cambridge in Paper 4 (topic 4.5). Energy methods shine where Newton's laws struggle: on **curved paths**, such as a smooth slide or a bowl, where the acceleration keeps changing but the energy accounting stays simple.

## Key definitions

:::definition{term="Work done by a constant force"}
When a constant force $F$ moves its point of application a distance $d$, and the force makes an angle $\theta$ with the direction of motion, the work done is $W = Fd\cos\theta$, measured in joules (J). Only the component of the force along the motion does work.
:::

:::definition{term="Kinetic energy"}
The energy a body has because of its motion: $\text{KE} = \tfrac{1}{2}mv^2$.
:::

:::definition{term="Gravitational potential energy"}
The energy a body has because of its height $h$ above a chosen level: $\text{PE} = mgh$. Only changes in PE matter, so the zero level can be chosen freely.
:::

:::formula{name="Work–energy principle"}
$$
\text{work done by the driving forces} - \text{work done against resistances} = \text{gain in KE} + \text{gain in PE}
$$
:::

None of these is on MF19; learn them. When the only force doing work is gravity, the total mechanical energy $\text{KE} + \text{PE}$ is **conserved**.

## Work done by a force

A force perpendicular to the motion does no work: the normal reaction on a body moving along a surface, for example, or the weight of a body moving horizontally. A force opposing the motion ($\theta = 180°$) does negative work; we usually say work is done **against** it, a positive amount $Fd$.

:::worked-solution[Example 1: Farai drags a sack $12$ m across a level yard with a rope inclined at $30°$ above the horizontal. The tension is $50$ N. Find the work done by the tension.]
1. The sack moves horizontally; the tension makes $30°$ with that direction.
2. $W = Fd\cos\theta = 50 \times 12 \times \cos 30° = 520$ J (3 s.f.).
3. The vertical component of the tension does no work, because the sack does not move vertically.
:::

## Conservation of mechanical energy

If no work is done by friction or other resistances, the loss of PE equals the gain of KE. This holds whatever the shape of the path, which makes it ideal for curved surfaces.

:::worked-solution[Example 2: a child slides down a smooth curved slide. She starts at the top with speed $2$ m s$^{-1}$, and the bottom is $6$ m lower. Take $g = 10$ m s$^{-2}$. Find her speed at the bottom.]
1. The slide is smooth, so the normal reaction does no work (it is perpendicular to the motion) and only gravity does work.
2. Loss of PE $=$ gain of KE: $m(10)(6) = \tfrac{1}{2}mv^2 - \tfrac{1}{2}m(2)^2$.
3. Cancel $m$ and double: $120 = v^2 - 4$, so $v^2 = 124$.
4. $v = 11.1$ m s$^{-1}$. The shape of the slide does not matter, only the drop in height.
:::

Newton's laws could not do this directly: on a curved slide the acceleration changes all the time.

## The work–energy principle with resistance

When friction or air resistance acts, energy is lost from the system as heat. The work done against a constant resistance $F$ over a distance $d$ is $Fd$.

:::worked-solution[Example 3 (exam style): a crate of mass $20$ kg is pulled $25$ m up a rough ramp inclined at $15°$ to the horizontal, starting from rest, by a rope parallel to the ramp with tension $120$ N. The coefficient of friction is $0.3$ and $g = 10$ m s$^{-2}$. Use an energy method to find the speed of the crate at the end of the $25$ m.]
1. Work done by the tension: $120 \times 25 = 3000$ J.
2. Gain in PE: $mgh = 200 \times 25\sin 15° = 1294.1$ J.
3. Friction: $R = 200\cos 15°$, so $F = 0.3 \times 200\cos 15° = 57.96$ N; work against friction $= 57.96 \times 25 = 1448.9$ J.
4. Gain in KE $= 3000 - 1294.1 - 1448.9 = 257.0$ J.
5. $\tfrac{1}{2}(20)v^2 = 257.0$, so $v = 5.07$ m s$^{-1}$.
:::

:::worked-solution[Example 4: a car of mass $1200$ kg coasts down a straight hill with the engine off. Its speed increases from $10$ m s$^{-1}$ to $18$ m s$^{-1}$ while it travels $500$ m along the road and descends $40$ m vertically. Take $g = 10$ m s$^{-2}$. Find the average resistance to motion.]
1. Loss of PE: $1200 \times 10 \times 40 = 480\,000$ J.
2. Gain of KE: $\tfrac{1}{2}(1200)(18^2 - 10^2) = 134\,400$ J.
3. Work done against resistance $= 480\,000 - 134\,400 = 345\,600$ J.
4. Average resistance $= \dfrac{345\,600}{500} = 691$ N (3 s.f.).
:::

Notice that the resistance acts along the whole $500$ m of road, while the PE depends only on the vertical drop of $40$ m. Keep distances along the path and heights separate.

## Energy or Newton's laws?

Both methods describe the same physics, so on a straight slope with constant forces either gives the right answer. Energy is quicker when the question links speeds and **distances** and does not mention time, and it is the only practical method on a curved path. Newton's second law is better when you need an **acceleration** or a **time**, or when a force must be found at a particular instant. Many exam questions use both: an energy equation for a speed, then *suvat* or $F = ma$ for what follows. If the question names the method ("use an energy method", "use the work–energy principle"), you must use it.

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge Paper 4 uses $W = Fd\cos\theta$ without vectors, with $g = 10$ m s$^{-2}$. ZIMSEC states $g$, may ask you to explain the principle of conservation of energy, and also includes elastic potential energy (see the lesson on Hooke's law); the energy equation then gains an elastic term.
:::

## Common mistakes

:::mistake{title="Using the distance along a slope for PE"}
Potential energy uses the **vertical** height $h = d\sin\alpha$, not the distance $d$ moved along the slope.
:::

:::mistake{title="Forgetting the angle in the work done"}
A force at angle $\theta$ to the motion does work $Fd\cos\theta$, not $Fd$.
:::

:::mistake{title="Conserving energy when friction acts"}
Mechanical energy is conserved only if no work is done against resistance. With friction, use the work–energy principle.
:::

:::mistake{title="Counting the normal reaction"}
A normal reaction perpendicular to the motion does no work, even on a curved surface.
:::

## Exam tips

:::exam-tip
Write a word equation first ("Work done by $T$ $-$ work against friction $=$ gain in PE $+$ gain in KE"), then substitute. It earns the method mark even if one term is wrong.
:::

:::exam-tip
If a question says "use an energy method", a solution by Newton's laws and *suvat* may score nothing, even if the answer is right.
:::

:::exam-tip
Give energies in joules to 3 significant figures; very large values can be given in kJ.
:::

## Summary

:::summary
- Work done by a constant force: $W = Fd\cos\theta$ (J); forces perpendicular to the motion do no work.
- $\text{KE} = \frac{1}{2}mv^2$; $\text{PE} = mgh$ with $h$ the vertical height.
- If only gravity does work, $\text{KE} + \text{PE}$ is conserved, whatever the shape of the path.
- Otherwise: work by driving forces $-$ work against resistances $=$ gain in KE $+$ gain in PE.
- Work against a constant resistance $F$ over a distance $d$ along the path is $Fd$.
:::
