---
{
  "key": "gravitation.newtons-law-orbits",
  "title": "Newton's law of gravitation and circular orbits",
  "summary": "State and use Newton's law of gravitation, treat spheres as point masses, analyse circular orbits with gravity as the centripetal force, derive T² ∝ r³, find a planet's mass from a moon's orbit, and explain geostationary orbits.",
  "concepts": ["aphys.gravitation.newtons-law-orbits"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Television dishes on roofs across Harare and Bulawayo point at a fixed spot in the northern sky and never need to be moved. They are aimed at satellites that circle the Earth once a day, in step with the Earth's rotation, so they seem to hang motionless. Placing a satellite in that orbit needs only two ideas you can put together in a few lines: Newton's law of gravitation, and the centripetal force needed for circular motion.

Newton realised that the force that makes an apple fall is the same force that keeps the Moon in orbit. In this lesson you state his law, use it to analyse circular orbits, derive the link between orbital period and radius, weigh a planet using one of its moons, and explain why geostationary satellites must be where they are.

You should already know centripetal force $F = mv^2/r = mr\omega^2$, angular speed $\omega = 2\pi/T$, and gravitational field strength $g = GM/r^2$.

## Key definitions

:::definition{term="Newton's law of gravitation"}
Any two point masses attract each other with a force that is directly proportional to the product of their masses and inversely proportional to the square of their separation.
:::

:::formula{name="Newton's law of gravitation"}
$$
F = \frac{Gm_1m_2}{r^2}
$$

$F$ magnitude of the attractive force on each mass in N; $m_1$, $m_2$ the masses in kg; $r$ the distance between their centres in m; $G = 6.67 \times 10^{-11}\ \text{N m}^2\,\text{kg}^{-2}$.
:::

:::definition{term="Geostationary orbit"}
An equatorial orbit in which a satellite moves from west to east with a period of 24 hours, so that it stays above the same point on the Equator.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: ZIMSEC Form 5 and Cambridge A Level (13.2-13.4, Paper 4). Both expect the derivation of $T^2 \propto r^3$ for circular orbits and the conditions for a geostationary orbit.
:::

## Spheres as point masses

Newton's law is written for point masses. For a uniform sphere (and, to a good approximation, for planets and stars) the force on an outside mass is the same as if all the sphere's mass were concentrated at its centre. So $r$ is always measured **between centres**. A satellite $300\ \text{km}$ above the Earth is about $6670\ \text{km}$ from the Earth's centre, not $300\ \text{km}$.

The two forces in Newton's law are an action-reaction pair: the Earth pulls the Moon with exactly the same size of force as the Moon pulls the Earth, in the opposite direction. The Moon's much larger acceleration comes from its much smaller mass.

## Circular orbits

For a satellite of mass $m$ in a circular orbit of radius $r$ around a planet of mass $M$, gravity is the **only** force acting, and it provides the centripetal force.

1. Set the gravitational force equal to the centripetal force: $\dfrac{GMm}{r^2} = \dfrac{mv^2}{r}$.
2. Cancel $m$ and one $r$: $v^2 = \dfrac{GM}{r}$, so $v = \sqrt{\dfrac{GM}{r}}$.
3. The orbital speed does not depend on the satellite's mass, and **decreases** as the orbit gets larger.

### Deriving T² ∝ r³

1. In one period $T$ the satellite travels the circumference: $v = \dfrac{2\pi r}{T}$.
2. Substitute into $v^2 = GM/r$: $\dfrac{4\pi^2r^2}{T^2} = \dfrac{GM}{r}$.
3. Rearrange: $T^2 = \dfrac{4\pi^2}{GM}\,r^3$.

Since $4\pi^2/GM$ is the same for every body orbiting the same central mass, $T^2 \propto r^3$. This is Kepler's third law, here derived for circular orbits. A graph of $T^2$ against $r^3$ is a straight line through the origin of gradient $4\pi^2/GM$, which gives a way to find $M$.

You can reach the same result with angular speed: $\dfrac{GMm}{r^2} = mr\omega^2$ with $\omega = 2\pi/T$.

### Orbits around the Earth

These values use $M_E = 5.97 \times 10^{24}\ \text{kg}$ and $R_E = 6.37 \times 10^{6}\ \text{m}$.

| Orbit | $r\,/\,10^{6}\ \text{m}$ | $v\,/\,\text{km s}^{-1}$ | $T\,/\,\text{h}$ |
| --- | --- | --- | --- |
| low orbit, $300\ \text{km}$ up | 6.67 | 7.73 | 1.51 |
| $2000\ \text{km}$ up | 8.37 | 6.90 | 2.12 |
| navigation satellite, $20\,200\ \text{km}$ up | 26.6 | 3.87 | 12.0 |
| geostationary | 42.2 | 3.07 | 24.0 |

The further out the orbit, the slower the satellite and the longer its period.

## Geostationary orbits

A geostationary satellite must:

- have a period of **24 hours** (strictly one sidereal day, about 23 h 56 min), the Earth's rotation period;
- orbit **from west to east**, the direction in which the Earth spins;
- orbit **above the Equator**, because the centre of every orbit must be the Earth's centre, and only an equatorial orbit keeps the satellite over one point.

Because $T$ is fixed, $T^2 \propto r^3$ fixes the radius: there is only one geostationary radius, about $4.22 \times 10^{7}\ \text{m}$ from the Earth's centre.

**Uses and comparison.** Geostationary satellites carry satellite television, communications and weather images of a whole hemisphere: receiving dishes can be fixed. But they are far away, so signals are weak and take about a quarter of a second for the round trip, and they cannot see the polar regions well. **Low orbits** (a few hundred kilometres, often passing over the poles) give detailed images and short signal delays and are cheaper to reach, but each satellite is overhead only for minutes, so tracking aerials or many satellites are needed.

## Worked examples

:::worked-solution[Force between the Earth and the Moon]
The Earth ($5.97 \times 10^{24}\ \text{kg}$) and Moon ($7.35 \times 10^{22}\ \text{kg}$) are $3.84 \times 10^{8}\ \text{m}$ apart. Find the gravitational force between them.

1. $F = \dfrac{Gm_1m_2}{r^2} = \dfrac{6.67 \times 10^{-11} \times 5.97 \times 10^{24} \times 7.35 \times 10^{22}}{(3.84 \times 10^{8})^2}$.
2. $F = 1.98 \times 10^{20}\ \text{N}$, acting on each body towards the other.
:::

:::worked-solution[Radius of a geostationary orbit]
Find the radius and height of a geostationary orbit.

1. $T = 24 \times 3600 = 86\,400\ \text{s}$.
2. $r^3 = \dfrac{GMT^2}{4\pi^2} = \dfrac{6.67 \times 10^{-11} \times 5.97 \times 10^{24} \times 86\,400^2}{4\pi^2}$.
3. $r = 4.22 \times 10^{7}\ \text{m}$.
4. Height above the surface $= r - R_E = 4.22 \times 10^{7} - 6.37 \times 10^{6} = 3.59 \times 10^{7}\ \text{m}$ (about $36\,000\ \text{km}$).
5. Orbital speed $v = 2\pi r/T = 3070\ \text{m s}^{-1}$.
:::

:::worked-solution[Weighing Jupiter with a moon]
Jupiter's moon Io orbits at a radius of $4.22 \times 10^{8}\ \text{m}$ with a period of $1.77$ days. Find Jupiter's mass.

1. $T = 1.77 \times 86\,400 = 1.53 \times 10^{5}\ \text{s}$ (convert to seconds).
2. $M = \dfrac{4\pi^2r^3}{GT^2} = \dfrac{4\pi^2 \times (4.22 \times 10^{8})^3}{6.67 \times 10^{-11} \times (1.53 \times 10^{5})^2}$.
3. $M = 1.90 \times 10^{27}\ \text{kg}$. Io's own mass cancels and cannot be found this way.
:::

## Common mistakes

:::mistake{title="Height instead of radius"}
Orbit equations use the distance from the planet's **centre**. Add the planet's radius to any height given.
:::

:::mistake{title="Period not in seconds"}
$T$ in days or hours must be converted to seconds before using $T^2 = 4\pi^2r^3/GM$ with $G$ in SI units.
:::

:::mistake{title="Satellite mass in the answer"}
The satellite's mass cancels. Two satellites of different mass in the same orbit have the same speed and period.
:::

:::mistake{title="Extra forces on an orbiting satellite"}
There is no separate "centripetal force" acting as well as gravity. Gravity **is** the centripetal force; adding both counts gravity twice.
:::

## Exam tips

:::exam-tip{title="Which papers"}
ZIMSEC Papers 1-3 (Form 5) and Cambridge Paper 4. The derivation of $T^2 \propto r^3$ and the geostationary calculation appear often.
:::

:::exam-tip{title="Command words"}
*State* Newton's law: "point masses", "product of the masses", "inverse square of separation". *Show that* $T^2 \propto r^3$: equate $GMm/r^2$ to $mv^2/r$ (or $mr\omega^2$), substitute $v = 2\pi r/T$ and show the constant. *Explain* why a geostationary orbit has one radius: $T$ fixed, so $r$ fixed by $T^2 \propto r^3$. *Suggest* uses: compare coverage, delay and resolution of geostationary and low orbits.
:::

## Summary

:::summary
- $F = Gm_1m_2/r^2$ between point masses; uniform spheres act as point masses at their centres.
- In a circular orbit gravity provides the centripetal force: $v = \sqrt{GM/r}$.
- $T^2 = (4\pi^2/GM)\,r^3$, so $T^2 \propto r^3$; the central mass follows from $M = 4\pi^2r^3/GT^2$.
- Geostationary: period 24 h, west to east, above the Equator, radius about $4.2 \times 10^{7}\ \text{m}$.
- Low orbits give detail and short delays; geostationary orbits give fixed dishes and wide coverage.
:::
