---
{
  "key": "elasticity.hookes-law-energy",
  "title": "Elastic strings and springs: Hooke's law and elastic energy",
  "summary": "Use Hooke's law T = λx/l for light elastic strings and springs, solve equilibrium problems, find the work done in stretching and the elastic potential energy λx²/(2l), and apply conservation of energy to bungee jumps, catapults and springs.",
  "concepts": ["amaths.elasticity.hookes-law-energy"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

The bungee rope at the Victoria Falls Bridge, the rubber of a catapult, the spring under a kombi seat and the coiled spring in a bathroom scale all stretch or compress when loaded and spring back when released. Within limits, the force they exert is proportional to how far they have been stretched. That simple rule, **Hooke's law**, together with the energy stored in a stretched string, lets us predict how far a bungee jumper falls or how fast a catapult stone leaves.

ZIMSEC Mechanics examines elasticity in Form 6 (topic 6.8): Hooke's law and the modulus of elasticity, equilibrium problems, and problems needing work and energy. Cambridge 9709 does not include elastic strings, so this lesson is for ZIMSEC candidates. You need Newton's laws, resolving forces and the work–energy principle.

## Key definitions

:::definition{term="Light elastic string and spring"}
A light (massless) string or spring that returns to its **natural length** $l$ when the load is removed. An elastic **string** can be stretched but goes slack (no tension) when shorter than $l$; a **spring** can also be compressed, when it pushes with a thrust.
:::

:::definition{term="Extension and modulus of elasticity"}
The **extension** $x$ is the stretched length minus the natural length. The **modulus of elasticity** $\lambda$, measured in newtons, is a property of the string's material and cross-section: the tension needed to double its length.
:::

:::formula{name="Hooke's law"}
$$
T = \frac{\lambda x}{l}
$$
The tension $T$ (or thrust for a compressed spring) is proportional to the extension $x$ (or compression).
:::

:::formula{name="Elastic potential energy"}
$$
\text{EPE} = \frac{\lambda x^2}{2l}
$$
This is the work done in stretching the string from its natural length to extension $x$.
:::

The **stiffness** $k = \frac{\lambda}{l}$ is sometimes used, giving $T = kx$ and EPE $= \frac{1}{2}kx^2$. ZIMSEC prints no formula list, so learn both formulae.

## Where the energy formula comes from

The tension changes as the string stretches, so work cannot be found as force × distance. Instead, add up the work over small extensions: stretching by a further $\delta x$ when the tension is $\frac{\lambda x}{l}$ takes work $\frac{\lambda x}{l}\,\delta x$. In the limit,
$$
W = \int_0^{x} \frac{\lambda s}{l}\,\mathrm{d}s = \left[\frac{\lambda s^2}{2l}\right]_0^{x} = \frac{\lambda x^2}{2l}.
$$
Graphically, this is the area of the triangle under the tension–extension line. Stretching further, from extension $x_1$ to $x_2$, takes $\frac{\lambda}{2l}\left(x_2^2 - x_1^2\right)$, **not** $\frac{\lambda}{2l}(x_2 - x_1)^2$.

![Tension-extension graph for a string of natural length 0.8 m and modulus 24 N: a straight line of gradient λ/l = 30 N/m, so a load of 4.9 N gives extension 0.163 m and the area under the line, the stored elastic energy, is 0.40 J.](media:diagrams/tension-extension-graph-epe.png "Figure: the area under the tension–extension line is the elastic energy stored")

## Equilibrium problems

In equilibrium, resolve forces as usual and replace each tension by $\frac{\lambda x}{l}$.

:::worked-solution[Example 1: A light elastic string of natural length 0.8 m and modulus 24 N has one end fixed. A particle of mass 0.5 kg hangs in equilibrium from the other end. Take $g = 9.8$ m s$^{-2}$. Find the extension and the stretched length.]
1. Resolve vertically: $T = mg = 0.5 \times 9.8 = 4.9$ N.
2. Hooke's law: $4.9 = \dfrac{24x}{0.8} = 30x$.
3. $x = \dfrac{4.9}{30} = 0.163$ m (0.16333 m).
4. Stretched length $= 0.8 + 0.163 = 0.963$ m.
:::

:::worked-solution[Example 2: Points $A$ and $B$ are 3 m apart on a smooth horizontal table. A particle $P$ is joined to $A$ by a light elastic string of natural length 1 m and modulus 20 N, and to $B$ by a light elastic string of natural length 1.2 m and modulus 30 N. $P$ rests in equilibrium on the line $AB$. Find the length $AP$.]
1. Let the extensions be $x$ (string $AP$) and $y$ (string $PB$). Total length: $(1 + x) + (1.2 + y) = 3$, so $x + y = 0.8$.
2. Equilibrium: the tensions are equal, $\dfrac{20x}{1} = \dfrac{30y}{1.2}$, so $20x = 25y$ and $x = 1.25y$.
3. Substitute: $2.25y = 0.8$, so $y = 0.3556$ m and $x = 0.4444$ m.
4. $AP = 1 + 0.4444 = 1.44$ m. (Check: both tensions are $8.89$ N.)
:::

## Energy problems

When a particle moves on an elastic string, the tension changes, so the acceleration is **not** constant and suvat cannot be used. Use **conservation of mechanical energy** instead (when the only forces doing work are gravity and the elastic tension):
$$
\text{KE} + \text{GPE} + \text{EPE} = \text{constant}.
$$
Remember that a string stores energy only when it is stretched: while slack, its EPE is zero.

:::worked-solution[Example 3: A bungee jumper of mass 60 kg is attached to an elastic rope of natural length 20 m and modulus 1500 N, whose other end is fixed to a bridge. She steps off from rest at the point of attachment. Model her as a particle and take $g = 9.8$ m s$^{-2}$. Find the greatest distance she falls, and her greatest speed.]
1. Let the greatest extension be $x$. From the start to the lowest point, KE is zero at both ends.
2. Loss of GPE $=$ gain of EPE: $60 \times 9.8 \times (20 + x) = \dfrac{1500x^2}{2 \times 20}$.
3. $588(20 + x) = 37.5x^2$, so $37.5x^2 - 588x - 11760 = 0$.
4. $x = \dfrac{588 + \sqrt{588^2 + 4(37.5)(11760)}}{75} = 27.2$ m (the negative root is impossible).
5. Greatest distance fallen $= 20 + 27.2 = 47.2$ m.
6. Greatest speed: where the acceleration is zero, i.e. $T = mg$: $\dfrac{1500e}{20} = 588$, so $e = 7.84$ m.
7. Energy: $\tfrac{1}{2}(60)v^2 = 588(27.84) - \dfrac{1500(7.84)^2}{40} = 16369.92 - 2304.96 = 14064.96$.
8. $v^2 = 468.83$, so $v = 21.7$ m s$^{-1}$.
:::

Notice that the greatest speed is **not** where the rope becomes taut (there $v = \sqrt{2 \times 9.8 \times 20} = 19.8$ m s$^{-1}$): she keeps accelerating until the tension equals her weight.

## Springs that are compressed

A spring obeys the same law in compression: thrust $= \frac{\lambda x}{l}$ and stored energy $\frac{\lambda x^2}{2l}$, with $x$ the compression. A catapult or a toy gun converts this energy into kinetic energy (and GPE if it fires upwards).

## Common mistakes

:::mistake{title="Using the stretched length instead of the extension"}
$x$ is the **extension**, stretched length minus natural length. Using the full length in $\frac{\lambda x}{l}$ is a frequent error.
:::

:::mistake{title="Using suvat with a variable force"}
The tension changes as the string stretches, so the acceleration changes. Use energy (or the equation of motion), not constant-acceleration formulae, while the string is taut.
:::

:::mistake{title="Counting EPE when the string is slack"}
An elastic string has no tension and no stored energy while shorter than its natural length.
:::

:::mistake{title="Wrong energy change between two extensions"}
From extension $x_1$ to $x_2$ the work is $\frac{\lambda}{2l}(x_2^2 - x_1^2)$, not $\frac{\lambda}{2l}(x_2 - x_1)^2$.
:::

## Exam tips

:::exam-tip
Write the energy equation in words first ("loss of GPE = gain of EPE + gain of KE"), then substitute. Measure heights from one clear reference level.
:::

:::exam-tip
"Show that the extension satisfies $37.5x^2 - 588x - 11760 = 0$" asks for the energy equation and its rearrangement, line by line, ending with the given equation. Reject a negative root with a reason.
:::

:::exam-tip
State $g$ as given; give answers to 3 significant figures with units (m, N, J, m s$^{-1}$).
:::

## Summary

:::summary
- Hooke's law: $T = \frac{\lambda x}{l}$, with $x$ the extension (or compression of a spring) and $\lambda$ the modulus in newtons.
- Work done in stretching from natural length to extension $x$: $\frac{\lambda x^2}{2l}$, the elastic potential energy.
- Equilibrium: resolve forces with $T = \frac{\lambda x}{l}$; strings joined to one particle share equal tension along a line.
- Motion on a taut string: use conservation of energy (KE + GPE + EPE); the greatest speed occurs where the tension equals the weight.
:::
