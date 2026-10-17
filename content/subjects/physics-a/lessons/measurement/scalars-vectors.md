---
{
  "key": "measurement.scalars-vectors",
  "title": "Scalars and vectors: adding and resolving",
  "summary": "Distinguish scalar from vector quantities, add and subtract coplanar vectors by scale drawing and by calculation, and resolve a vector into perpendicular components, including on an inclined plane.",
  "concepts": ["aphys.measurement.scalars-vectors"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Two tractors pull a fallen tree out of a field near Mutare, one with a force of $40\ \text{kN}$ and the other with $30\ \text{kN}$. Is the total pull $70\ \text{kN}$? Only if the chains point the same way. If they are at an angle, the combined effect is smaller, and it acts in a direction between the two chains. Quantities like these, where direction matters as much as size, are **vectors**, and they cannot be added like ordinary numbers.

This lesson sets out which quantities are vectors, how to add and subtract them, and how to split a single vector into two perpendicular parts. Resolving vectors is used in almost every mechanics problem that follows: projectiles, inclined planes, equilibrium and collisions in two dimensions. You need Pythagoras' theorem, sine, cosine and tangent, and the sine and cosine rules.

## Key definitions

:::definition{term="Scalar quantity"}
A quantity that has magnitude only, such as mass, time, distance, speed, energy, power, temperature or charge.
:::

:::definition{term="Vector quantity"}
A quantity that has both magnitude and direction, such as displacement, velocity, acceleration, force, weight, momentum and electric field strength.
:::

:::definition{term="Resultant"}
The single vector that has the same effect as two or more vectors acting together: their vector sum.
:::

:::definition{term="Components of a vector"}
Two perpendicular vectors whose resultant is the original vector. A vector $F$ at angle $\theta$ to the $x$-direction has components $F\cos\theta$ along $x$ and $F\sin\theta$ along $y$.
:::

:::formula{name="Resolving a vector"}
$$
F_x = F\cos\theta \qquad F_y = F\sin\theta \qquad F = \sqrt{F_x^2 + F_y^2} \qquad \tan\theta = \frac{F_y}{F_x}
$$

$\theta$ is the angle between the vector $F$ and the $x$-direction; the components have the same unit as $F$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards require scalars and vectors, addition by drawing and by calculation, and resolution into perpendicular components. Equilibrium of three forces (closed vector triangles) is in the lesson on equilibrium.
:::

## Scalars and vectors side by side

| Scalar | Matching vector | The difference |
| --- | --- | --- |
| distance | displacement | displacement is distance in a stated direction from the start |
| speed | velocity | velocity is speed in a stated direction |
| mass | weight | weight is a force, directed towards the centre of the Earth |
| energy, work | force, momentum | energy has no direction; force and momentum do |

A vector is shown in a diagram as an arrow whose length represents the magnitude and whose direction is the direction of the vector. In writing, give a direction with every vector answer: "$13\ \text{N}$ at $23^\circ$ north of east".

## Adding vectors

Draw the vectors **tip to tail**: the second starts where the first ends. The resultant runs from the tail of the first to the tip of the last. The order does not matter.

- **Same direction:** add magnitudes. **Opposite directions:** subtract, and the resultant points the way of the larger.
- **At right angles:** use Pythagoras for the magnitude and tangent for the direction.
- **At any other angle:** use a scale drawing, or the cosine rule and sine rule on the vector triangle.

:::worked-solution[Two forces at right angles]
A boat on Lake Kariba is pushed by its engine with $12\ \text{kN}$ due east while the wind pushes it with $5.0\ \text{kN}$ due north.

1. The vectors are perpendicular, so $R = \sqrt{12^2 + 5.0^2} = 13\ \text{kN}$.
2. Direction: $\tan\theta = \dfrac{5.0}{12}$, so $\theta = 23^\circ$.
3. Resultant: $13\ \text{kN}$ at $23^\circ$ north of east.
:::

:::worked-solution[Two forces at $60^\circ$ to each other]
The tractors pull with $40\ \text{kN}$ and $30\ \text{kN}$, with $60^\circ$ between the chains.

1. Placed tip to tail, the vectors form a triangle in which the angle opposite the resultant is $180^\circ - 60^\circ = 120^\circ$.
2. Cosine rule: $R^2 = 40^2 + 30^2 - 2(40)(30)\cos 120^\circ = 1600 + 900 + 1200 = 3700$, so $R = 60.8\ \text{kN}$.
3. Sine rule for the angle $\alpha$ between $R$ and the $40\ \text{kN}$ chain: $\sin\alpha = \dfrac{30 \sin 120^\circ}{60.8}$, so $\alpha = 25.3^\circ$.
:::

A scale drawing gives the same result to within the accuracy of the drawing: choose a large scale (for example $1\ \text{cm}$ to $5\ \text{kN}$), draw carefully with a protractor, and measure the resultant's length and angle.

![Vector triangle for two tractor pulls of 40 kN and 30 kN with 60° between the chains: placed tip to tail the resultant closes the triangle, R = 60.8 kN at 25.3° to the 40 kN chain (angle opposite R is 120°).](media:diagrams/vector-triangle-two-pulls.png "Figure: adding two forces tip to tail (scale drawing, 1 kN = 4.2 px)")

## Subtracting vectors

To find $\mathbf{A} - \mathbf{B}$, add $\mathbf{A}$ and $-\mathbf{B}$ (the same magnitude as $\mathbf{B}$, reversed). The most common use is a **change in velocity**: $\Delta \mathbf{v} = \mathbf{v}_{\text{final}} - \mathbf{v}_{\text{initial}}$.

A ball moving east at $8.0\ \text{m s}^{-1}$ is deflected so that it moves north at $6.0\ \text{m s}^{-1}$. Its speed has fallen by only $2.0\ \text{m s}^{-1}$, but the change in velocity is $6.0\ \text{m s}^{-1}$ north plus $8.0\ \text{m s}^{-1}$ west: $10\ \text{m s}^{-1}$ at $37^\circ$ north of west.

## Resolving vectors

Any vector can be replaced by two perpendicular components. Choose the directions that make the problem easy: horizontal and vertical for a projectile, along and perpendicular to the slope for an inclined plane.

:::worked-solution[Towing a car]
A rope pulls a broken-down car with a tension of $250\ \text{N}$ at $35^\circ$ above the horizontal.

1. Horizontal component: $250\cos 35^\circ = 205\ \text{N}$ (this moves the car forward).
2. Vertical component: $250\sin 35^\circ = 143\ \text{N}$ (this slightly lifts the front, reducing the normal contact force).
:::

On a slope at angle $\theta$ to the horizontal, the weight $W = mg$ (vertically down) resolves into

$$
W_{\parallel} = mg\sin\theta \ \text{(down the slope)} \qquad W_{\perp} = mg\cos\theta \ \text{(into the slope)}
$$

The angle between the weight and the perpendicular to the slope equals $\theta$, which is why the sine goes with the component **along** the slope.

:::example{title="A crate on a ramp"}
A $60\ \text{kg}$ crate rests on a ramp at $20^\circ$ to the horizontal. Its weight is $60 \times 9.81 = 589\ \text{N}$. The component down the slope is $589\sin 20^\circ = 201\ \text{N}$, which friction must balance; the component into the slope is $589\cos 20^\circ = 553\ \text{N}$, balanced by the normal contact force.
:::

## Common mistakes

:::mistake{title="Adding magnitudes of vectors at an angle"}
$40\ \text{kN} + 30\ \text{kN}$ is $70\ \text{kN}$ only when the forces are parallel. At an angle, the resultant is always less than the arithmetic sum.
:::

:::mistake{title="Sine and cosine swapped on a slope"}
The component of weight down the slope is $mg\sin\theta$, not $mg\cos\theta$. Check with an extreme case: on a flat surface ($\theta = 0$) the component along the surface must be zero, and $\sin 0 = 0$.
:::

:::mistake{title="Change in velocity found by subtracting speeds"}
When the direction changes, $\Delta v$ is a vector subtraction. A ball that rebounds at the same speed has a change in velocity of twice its speed, not zero.
:::

:::mistake{title="No direction in the answer"}
A vector answer needs a direction: an angle and a reference ("$25^\circ$ to the $40\ \text{kN}$ force").
:::

## Exam tips

:::exam-tip{title="Command words"}
"Determine the resultant" accepts a scale drawing or a calculation; state the scale if you draw. "Show that the component is about …" requires the trigonometric expression with numbers substituted and an answer to more significant figures than given.
:::

:::exam-tip{title="Where it is tested"}
Cambridge Paper 1 has scalar-vector classification and resolution questions; Paper 2 builds on them in projectiles and equilibrium. ZIMSEC Papers 1 and 2 test the same skills.
:::

## Summary

:::summary
- Scalars have magnitude only; vectors have magnitude and direction (displacement, velocity, acceleration, force, momentum).
- Add vectors tip to tail; the resultant joins the first tail to the last tip.
- Perpendicular vectors: Pythagoras and tangent; other angles: scale drawing or cosine and sine rules.
- Components: $F\cos\theta$ along the reference direction and $F\sin\theta$ perpendicular to it.
- On a slope: $mg\sin\theta$ along the slope and $mg\cos\theta$ into it.
:::
