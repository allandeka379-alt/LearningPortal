---
{
  "key": "mechanics.work-energy",
  "title": "Work, kinetic energy and potential energy",
  "summary": "Calculate the work done by a constant force (Fd and Fd cos θ), kinetic energy ½mv² and gravitational potential energy mgh, and solve problems with the conservation of mechanical energy and the work–energy principle, including resistances and slopes.",
  "concepts": ["amath.mechanics.work-energy"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Water falling over Victoria Falls, a bucket hauled up a borehole and a bus braking on the descent into Mutare all involve energy changing from one form to another. Energy methods often solve a mechanics problem in two lines where Newton's laws would need several: you only compare the start and the end, without finding the acceleration.

ZIMSEC Paper 2 asks for work done by forces, kinetic and potential energy, conservation of mechanical energy, and the work–energy principle with resistances. Energy is a scalar, so there are no directions to resolve except in finding the work done by a force at an angle.

## Key definitions

:::definition{term="Work done by a constant force"}
The force multiplied by the distance moved by its point of application **in the direction of the force**. Measured in joules (J); 1 J = 1 N m.
:::

:::definition{term="Kinetic energy (KE)"}
The energy a body has because of its motion, $\frac{1}{2}mv^2$.
:::

:::definition{term="Gravitational potential energy (PE)"}
The energy a body has because of its height above a chosen zero level, $mgh$.
:::

:::definition{term="Mechanical energy"}
The total of kinetic and gravitational potential energy.
:::

:::formula{name="Work and energy formulas"}
$$
W = Fd \qquad W = Fd\cos\theta
$$

$$
\text{KE} = \tfrac{1}{2}mv^2 \qquad \text{PE} = mgh
$$
:::

## Work done by a force

If a force acts along the direction of motion, the work done is $Fd$. If it acts at an angle $\theta$ to the direction of motion, only its component $F\cos\theta$ along the motion does work.

:::worked-solution[Example 1: Nyasha pulls a sledge of firewood 25 m along level ground with a rope at $35^\circ$ above the horizontal and tension 60 N. Find the work done by the tension.]
1. Component along the motion: $60\cos 35^\circ$.
2. $W = 60\cos 35^\circ \times 25 \approx 1230$ J (1228.7 J).
:::

Some forces do **no** work: the normal reaction on a body moving along a surface (perpendicular to the motion), and the weight of a body moving horizontally. A force opposing the motion, such as friction or air resistance, does negative work: we say work is done **against** it.

## Kinetic and potential energy

A 1200 kg car moving at 15 m s$^{-1}$ has $\text{KE} = \frac{1}{2}(1200)(15^2) = 135\,000$ J. A 70 kg climber who goes 200 m up Mount Nyangani gains $\text{PE} = 70 \times 9.8 \times 200 = 137\,200$ J. Only changes in PE matter, so you may put the zero level wherever is convenient, usually the lowest point.

## Conservation of mechanical energy

If the only force doing work is gravity (no friction, no resistance, no driving force), the total mechanical energy stays the same:

$$
\text{KE}_{\text{start}} + \text{PE}_{\text{start}} = \text{KE}_{\text{end}} + \text{PE}_{\text{end}}
$$

Normal reactions are allowed because they do no work. This means the speed at the bottom of a **smooth** slope depends only on the vertical drop, not on the shape or length of the slope.

:::worked-solution[Example 2: a stone falls from rest through 20 m. Take $g = 9.8$ m s$^{-2}$ and ignore air resistance. Find its speed at the bottom using energy.]
1. Loss of PE $= m(9.8)(20) = 196m$ J.
2. Gain of KE $= \frac{1}{2}mv^2$.
3. $\frac{1}{2}mv^2 = 196m$, so $v^2 = 392$ and $v \approx 19.8$ m s$^{-1}$.
4. The mass cancels, as it does for any body falling freely.
:::

## The work–energy principle

When other forces do work, the change in mechanical energy equals the work done by those forces:

$$
\text{work done by driving forces} - \text{work done against resistances} = \Delta\text{KE} + \Delta\text{PE}
$$

Read it as an energy budget: energy in from the engine or a push, energy out to friction and resistance, and the rest changes the KE and PE.

:::worked-solution[Example 3: a car of mass 800 kg slows from 20 m s$^{-1}$ to 12 m s$^{-1}$ over 160 m on a level road with the engine off. Find the constant resistance.]
1. Loss of KE $= \frac{1}{2}(800)(20^2 - 12^2) = 400 \times 256 = 102\,400$ J.
2. No change in PE (level road).
3. Work against resistance $= R \times 160 = 102\,400$.
4. $R = 640$ N.
:::

:::worked-solution[Example 4: Thandeka and her bicycle have total mass 50 kg. She freewheels down a slope 300 m long that drops 18 m vertically, starting at 4 m s$^{-1}$. The resistance to motion is a constant 25 N. Take $g = 9.8$ m s$^{-2}$. Find her speed at the bottom.]
1. PE lost $= 50 \times 9.8 \times 18 = 8820$ J.
2. Work done against resistance $= 25 \times 300 = 7500$ J.
3. KE at the start $= \frac{1}{2}(50)(4^2) = 400$ J.
4. KE at the bottom $= 400 + 8820 - 7500 = 1720$ J.
5. $\frac{1}{2}(50)v^2 = 1720$, so $v^2 = 68.8$ and $v \approx 8.29$ m s$^{-1}$.
:::

Notice that the resistance acts along the whole 300 m of the slope, while the PE depends only on the 18 m drop.

:::keyfact{title="ZIMSEC and Cambridge"}
Work and energy are in ZIMSEC Paper 2 Mechanics only; Cambridge 0606 does not include mechanics.
:::

## Common mistakes

:::mistake{title="Using the slope length for PE"}
PE change is $mgh$ with $h$ the **vertical** height. The distance along the slope is used for the work done against resistance.
:::

:::mistake{title="Forgetting to square the speed"}
$\text{KE} = \frac{1}{2}mv^2$. Also, $\frac{1}{2}m(v^2 - u^2)$ is **not** $\frac{1}{2}m(v - u)^2$.
:::

:::mistake{title="Using conservation of energy with friction"}
Mechanical energy is conserved only when no work is done by forces other than gravity. With resistance, use the work–energy principle.
:::

:::mistake{title="Using the whole force at an angle"}
A force at angle $\theta$ to the motion does work $Fd\cos\theta$, not $Fd$.
:::

## Exam tips

:::exam-tip
Write the energy equation in words first ("PE lost = KE gained + work against resistance"), then put in the numbers. The words earn the method mark.
:::

:::exam-tip
If a question says "use an energy method" or "use the work–energy principle", a solution with the equations of motion may get no credit.
:::

:::exam-tip
Give energies in joules (or kJ) to 3 significant figures; large values such as 135 000 J are best written as 135 kJ.
:::

## Summary

:::summary
- Work = force × distance in the direction of the force; $Fd\cos\theta$ for a force at angle $\theta$.
- $\text{KE} = \frac{1}{2}mv^2$; $\text{PE} = mgh$ with $h$ vertical.
- With only gravity doing work, KE + PE is constant.
- Otherwise: work by driving forces − work against resistances = change in KE + change in PE.
- Normal reactions do no work; resistances act over the full distance travelled.
:::
