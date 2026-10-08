---
{
  "key": "geometry.bearings",
  "title": "Bearings",
  "summary": "Give directions as three-figure bearings measured clockwise from north, convert between compass bearings and three-figure bearings (ZIMSEC), find back bearings, and solve bearing problems by scale drawing or with Pythagoras' theorem and trigonometry.",
  "concepts": ["math.geometry.bearings"],
  "objectives": ["zimsec/o-level/mathematics:8.2.1", "zimsec/o-level/mathematics:8.2.2", "cambridge/igcse/mathematics:4.3.2"],
  "estimatedMinutes": 20,
  "level": "core"
}
---
## Introduction

A fishing boat leaves Kariba harbour at dawn. To find the fishing grounds again, and to get home safely, the crew needs more than "go north-east for a while". Pilots, surveyors, hikers in the Chimanimani mountains and search-and-rescue teams all describe direction with **bearings**: a precise angle measured from north.

In this lesson you will learn to write and read bearings, to turn a bearing round (the back bearing), and to solve bearing problems by scale drawing or by calculation. The calculations use Pythagoras' theorem and the trigonometry of right-angled triangles.

## Key definitions

:::definition{term="Three-figure bearing"}
An angle measured **clockwise** from the **north** direction, written with three figures: $045^\circ$, $120^\circ$, $305^\circ$. Bearings run from $000^\circ$ to $360^\circ$.
:::

:::definition{term="Bearing of B from A"}
The bearing you would face if you stood at $A$ and looked towards $B$. The word "from" tells you where to draw the north line: at $A$.
:::

:::definition{term="Back bearing"}
The bearing of $A$ from $B$, when the bearing of $B$ from $A$ is known. It differs from the original bearing by $180^\circ$.
:::

## Three-figure bearings

| Direction | Bearing | Direction | Bearing |
| --- | --- | --- | --- |
| North | $000^\circ$ | South | $180^\circ$ |
| North-east | $045^\circ$ | South-west | $225^\circ$ |
| East | $090^\circ$ | West | $270^\circ$ |
| South-east | $135^\circ$ | North-west | $315^\circ$ |

To measure the bearing of $B$ from $A$: draw a north line at $A$, put the protractor on $A$, and measure clockwise from north to the line $AB$. For a bearing over $180^\circ$, measure the anticlockwise angle $\theta$ from north instead and subtract it from $360^\circ$.

:::note{title="ZIMSEC: compass bearings"}
ZIMSEC also uses **compass bearings**. Start from north or south, then turn the stated angle towards east or west: N $40^\circ$ E is $040^\circ$, S $30^\circ$ W is $180^\circ + 30^\circ = 210^\circ$, S $25^\circ$ E is $180^\circ - 25^\circ = 155^\circ$, and N $70^\circ$ W is $360^\circ - 70^\circ = 290^\circ$. The angle is always measured from the north–south line and is at most $90^\circ$.
:::

## Back bearings

The north lines at $A$ and $B$ are parallel, so the angles at the two ends are linked by co-interior angles. The result is simple:

:::keyfact{title="Finding a back bearing"}
If the bearing of $B$ from $A$ is $\theta$, the bearing of $A$ from $B$ is $\theta + 180^\circ$ (when $\theta < 180^\circ$) or $\theta - 180^\circ$ (when $\theta \geq 180^\circ$).
:::

:::worked-solution[Example 1: two back bearings]
1. The bearing of $B$ from $A$ is $064^\circ$. This is less than $180^\circ$, so the bearing of $A$ from $B$ is $064^\circ + 180^\circ = 244^\circ$.
2. The bearing of $Q$ from $P$ is $290^\circ$. This is more than $180^\circ$, so the bearing of $P$ from $Q$ is $290^\circ - 180^\circ = 110^\circ$.
:::

## Solving bearing problems

Always start with a **sketch**: draw a north arrow at every point where a bearing is taken, mark the bearings, and look for a right-angled triangle.

:::worked-solution[Example 2: a boat on Lake Kariba]
A boat sails 12 km from a harbour $H$ on a bearing of $040^\circ$. How far north and how far east of $H$ is it?
1. Sketch: the path makes an angle of $40^\circ$ with the north line at $H$. Complete a right-angled triangle with a northward side and an eastward side.
2. North (adjacent to the $40^\circ$ angle): $12 \cos 40^\circ = 9.19$ km (3 s.f.).
3. East (opposite the $40^\circ$ angle): $12 \sin 40^\circ = 7.71$ km (3 s.f.).
:::

:::worked-solution[Example 3: a walk east then north]
Farai walks 5 km due east from $A$ and then 8 km due north to $B$. Find the distance $AB$ and the bearing of $B$ from $A$.
1. The two legs meet at a right angle, so $AB = \sqrt{5^2 + 8^2} = \sqrt{89} = 9.43$ km (3 s.f.).
2. At $A$, the angle between north and $AB$ is $\theta$, with the 5 km side opposite and the 8 km side adjacent: $\tan \theta = \frac{5}{8}$.
3. $\theta = 32.0^\circ$, measured clockwise from north, so the bearing of $B$ from $A$ is $032.0^\circ$.
4. The bearing of $A$ from $B$ is $032.0^\circ + 180^\circ = 212.0^\circ$.
:::

:::worked-solution[Example 4: the angle between two legs of a journey]
The bearing of $B$ from $A$ is $070^\circ$ and the bearing of $C$ from $B$ is $160^\circ$. Find angle $ABC$.
1. At $B$, the bearing back to $A$ is $070^\circ + 180^\circ = 250^\circ$.
2. Both $250^\circ$ and $160^\circ$ are measured clockwise from the same north line at $B$, so angle $ABC = 250^\circ - 160^\circ = 90^\circ$.
3. The triangle is right-angled at $B$, so Pythagoras' theorem and right-angled trigonometry can be used to find $AC$.
:::

Problems with no right angle need the sine and cosine rules, which are covered in a later lesson. Scale drawings work too: choose a scale such as 1 cm to 2 km, draw each leg with a protractor and ruler, and measure.

## Common mistakes

:::mistake{title="Measuring anticlockwise or from east"}
Bearings are always clockwise from **north**. An angle of $30^\circ$ measured from east is a bearing of $090^\circ + 30^\circ = 120^\circ$ (if clockwise), not $030^\circ$.
:::

:::mistake{title="Drawing the north line at the wrong point"}
"The bearing of $B$ from $A$" is measured at $A$. Measuring at $B$ gives the back bearing instead.
:::

:::mistake{title="Two-figure bearings"}
Write $045^\circ$, not $45^\circ$: a bearing always has three figures.
:::

:::mistake{title="Adding 180° to a large bearing"}
$290^\circ + 180^\circ = 470^\circ$ is more than a full turn. For bearings of $180^\circ$ or more, **subtract** $180^\circ$ to get the back bearing.
:::

## Exam tips

:::exam-tip
Draw a clear sketch with a north line at every point. Most marks in bearing questions are lost through a wrong diagram, not wrong arithmetic.
:::

:::exam-tip
Use parallel north lines: co-interior angles (adding up to $180^\circ$) and alternate angles connect the angles at different points.
:::

:::exam-tip
Give bearings to the nearest degree or to 1 decimal place, as the question asks, and always with three figures before the decimal point, for example $032.0^\circ$.
:::

## Summary

:::summary
- A bearing is measured clockwise from north and written with three figures, from $000^\circ$ to $360^\circ$.
- "The bearing of $B$ from $A$" is measured at $A$.
- Back bearing: add $180^\circ$ if the bearing is less than $180^\circ$; otherwise subtract $180^\circ$.
- Sketch the north lines, find a right-angled triangle, then use Pythagoras' theorem or sine, cosine and tangent.
- ZIMSEC compass bearings such as S $30^\circ$ W are measured from north or south towards east or west.
:::
