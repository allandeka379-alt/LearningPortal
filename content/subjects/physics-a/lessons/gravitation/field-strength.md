---
{
  "key": "gravitation.field-strength",
  "title": "Gravitational fields and field strength",
  "summary": "Describe a gravitational field as a field of force, define gravitational field strength as force per unit mass, derive g = GM/r² for a point or spherical mass, and use it to find g on planets, at height and at different distances from the centre.",
  "concepts": ["aphys.gravitation.field-strength"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Drop a stone from the wall of the Kariba gorge and it accelerates towards the river below without anything touching it. The Earth exerts a force on the stone across empty space, and it does the same on the Moon, on every satellite and on the water held behind the dam. Physicists describe this action at a distance with the idea of a **field**: a region in which an object experiences a force because of a property it has. For gravity that property is mass.

In this lesson you meet the gravitational field and its strength, find out where the familiar value $9.81\ \text{N kg}^{-1}$ comes from, and see how the field weakens with distance. The same ideas return for electric fields, so the care you take with definitions here pays off twice.

You should already know Newton's second law, weight $W = mg$, and the idea of a vector. Newton's law of gravitation, $F = Gm_1m_2/r^2$, is treated fully in the next lesson; here we use it to find the field.

## Key definitions

:::definition{term="Gravitational field"}
A region of space in which a mass experiences a force because of its mass.
:::

:::definition{term="Gravitational field strength"}
The gravitational force acting per unit mass on a small test mass placed at that point. It is a vector, directed towards the mass producing the field.
:::

:::formula{name="Field strength"}
$$
g = \frac{F}{m}
$$

$g$ gravitational field strength in $\text{N kg}^{-1}$; $F$ gravitational force in N on a small test mass $m$ in kg. The unit $\text{N kg}^{-1}$ is equivalent to $\text{m s}^{-2}$, so near the Earth $g$ is also the free-fall acceleration.
:::

:::formula{name="Field of a point mass or uniform sphere"}
$$
g = \frac{GM}{r^2}
$$

$M$ mass producing the field in kg; $r$ distance from its centre in m ($r$ at or beyond the surface for a sphere); $G = 6.67 \times 10^{-11}\ \text{N m}^2\,\text{kg}^{-2}$, the gravitational constant.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards need this topic: ZIMSEC in Form 5 (gravitational fields) and Cambridge at A Level only (topic 13, Paper 4). The definitions, field-line pictures and $g = GM/r^2$ are common to both.
:::

## Field lines

A field line shows the direction of the force on a small test mass. Field lines are drawn so that their closeness shows the field strength.

- **Point mass or uniform sphere:** straight lines pointing radially inwards to the centre, like the spokes of a wheel. They get further apart with distance, showing a weaker field. The field is **radial**.
- **Near the Earth's surface:** over a region small compared with the Earth (a classroom, the Victoria Falls gorge) the lines are almost parallel, vertical and equally spaced. The field there is very nearly **uniform**.
- Gravitational field lines always point **towards** masses (gravity only attracts) and never cross, because the force at any point has only one direction.

## Deriving g = GM/r²

A uniform sphere behaves, for points outside it, as if all its mass were concentrated at its centre. Place a small test mass $m$ at distance $r$ from the centre of a sphere of mass $M$.

1. Newton's law of gravitation gives the force: $F = \dfrac{GMm}{r^2}$.
2. Field strength is force per unit mass: $g = \dfrac{F}{m}$.
3. Dividing, the test mass cancels: $g = \dfrac{GM}{r^2}$.

The field strength depends only on the source mass and the distance, not on the test mass. This is why a heavy and a light object fall with the same acceleration (without air resistance).

## How g varies with distance

Outside the sphere, $g \propto 1/r^2$: an **inverse-square** relationship. Doubling the distance from the centre divides $g$ by four. The values below are for the Earth, using $M_E = 5.97 \times 10^{24}\ \text{kg}$ and $R_E = 6.37 \times 10^{6}\ \text{m}$.

| $r/R_E$ | $r\,/\,10^{6}\ \text{m}$ | $g\,/\,\text{N kg}^{-1}$ |
| --- | --- | --- |
| 1.0 | 6.37 | 9.81 |
| 1.5 | 9.56 | 4.36 |
| 2.0 | 12.7 | 2.45 |
| 3.0 | 19.1 | 1.09 |
| 4.0 | 25.5 | 0.613 |
| 6.6 | 42.0 | 0.225 |

A graph of $g$ against $r$ starts at $9.81\ \text{N kg}^{-1}$ at the surface and falls steeply at first, then more gently, approaching zero but never reaching it. A graph of $g$ against $1/r^2$ is a straight line through the origin with gradient $GM$. The last row is roughly the radius of a geostationary orbit, where $g$ is less than a fortieth of its surface value.

### Why g is nearly constant near the surface

Rising $1\ \text{km}$ above the ground changes $r$ from $6370\ \text{km}$ to $6371\ \text{km}$, a change of about $0.016\%$. Because $g \propto 1/r^2$ the field changes by about twice that, roughly $0.03\%$, which is far smaller than the uncertainty in most school measurements. For heights that are small compared with $R_E$ we treat $g$ as constant and use $\Delta E_p = mg\Delta h$. For satellites hundreds of kilometres up this approximation fails and $g = GM/r^2$ must be used.

### Weight and "weightlessness"

Your weight is $mg$ wherever you are, using the local value of $g$. Astronauts in a space station $400\ \text{km}$ up still have a weight of almost $90\%$ of their weight on the ground. They feel weightless because they and the station are falling freely together, so there is no contact force between them and the floor.

## Worked examples

:::worked-solution[Field strength at the Earth's surface and at the space station]
The Earth has mass $5.97 \times 10^{24}\ \text{kg}$ and radius $6.37 \times 10^{6}\ \text{m}$. Calculate $g$ at the surface and at a height of $400\ \text{km}$.

1. Surface: $g = \dfrac{GM}{R^2} = \dfrac{6.67 \times 10^{-11} \times 5.97 \times 10^{24}}{(6.37 \times 10^{6})^2} = 9.81\ \text{N kg}^{-1}$.
2. At height $h$, $r = R + h = 6.37 \times 10^{6} + 4.0 \times 10^{5} = 6.77 \times 10^{6}\ \text{m}$ (add the height to the radius).
3. $g = \dfrac{6.67 \times 10^{-11} \times 5.97 \times 10^{24}}{(6.77 \times 10^{6})^2} = 8.69\ \text{N kg}^{-1}$.
4. This is $0.885$ of the surface value: gravity is far from absent at that height.
:::

:::worked-solution[Mass of a planet from its surface field]
A space probe measures a free-fall acceleration of $1.35\ \text{m s}^{-2}$ at the surface of a large moon of radius $2.58 \times 10^{6}\ \text{m}$. Find the moon's mass.

1. Rearrange $g = GM/R^2$: $M = \dfrac{gR^2}{G}$.
2. $M = \dfrac{1.35 \times (2.58 \times 10^{6})^2}{6.67 \times 10^{-11}}$.
3. $M = 1.35 \times 10^{23}\ \text{kg}$ (three significant figures, matching the data).
:::

:::worked-solution[Where the Earth's and Moon's fields cancel]
The Moon (mass $7.35 \times 10^{22}\ \text{kg}$) is $3.84 \times 10^{8}\ \text{m}$ from the Earth (mass $5.97 \times 10^{24}\ \text{kg}$). Find the distance $x$ from the Earth's centre at which the resultant gravitational field is zero.

1. The fields are opposite in direction between the bodies, so set their magnitudes equal: $\dfrac{GM_E}{x^2} = \dfrac{GM_M}{(d - x)^2}$.
2. Take square roots: $\dfrac{d - x}{x} = \sqrt{\dfrac{M_M}{M_E}} = 0.111$.
3. $x = \dfrac{d}{1 + 0.111} = 3.46 \times 10^{8}\ \text{m}$, about $90\%$ of the way to the Moon, because the Moon is much less massive.
:::

## Common mistakes

:::mistake{title="Using height instead of distance from the centre"}
In $g = GM/r^2$, $r$ is measured from the **centre** of the planet. For a satellite at height $h$, use $r = R + h$.
:::

:::mistake{title="Forgetting to square r"}
Halving the distance multiplies $g$ by four, not two. Check ratio answers with $g_2/g_1 = (r_1/r_2)^2$.
:::

:::mistake{title="Calling g a constant everywhere"}
$G$ is a universal constant; $g$ is not. It depends on the planet and on the distance from its centre.
:::

:::mistake{title="Field strength as force"}
Field strength is force **per unit mass**. A definition that leaves out "per unit mass" (or "on a small test mass") scores nothing.
:::

## Exam tips

:::exam-tip{title="Which papers"}
ZIMSEC Papers 1-3 (Form 5 gravitational fields) and Cambridge Paper 4 (A Level). Multiple-choice items test ratios and the inverse-square law; structured questions combine $g = GM/r^2$ with orbits and potential.
:::

:::exam-tip{title="Command words"}
*Define* gravitational field strength: "force per unit mass" on a small test mass. *Show that* $g$ at the surface is about $9.8\ \text{N kg}^{-1}$: substitute and give the answer to one more significant figure than asked. *Derive* $g = GM/r^2$: start from Newton's law and divide by the test mass. *Explain* why $g$ is constant near the surface: the height change is tiny compared with $R$, so $r$ hardly changes. *Sketch* (describe) the field: radial lines inwards; parallel equally spaced lines close to the surface.
:::

## Summary

:::summary
- A gravitational field is a region in which a mass experiences a force; field lines point towards the mass.
- Gravitational field strength is force per unit mass, $g = F/m$, in $\text{N kg}^{-1}$ (equivalent to $\text{m s}^{-2}$).
- Outside a uniform sphere, $g = GM/r^2$, with $r$ measured from the centre: an inverse-square law.
- Close to the surface, $g$ is almost uniform because height changes are tiny compared with the radius.
- Radial field: lines spread out; uniform field: parallel, equally spaced lines.
:::
