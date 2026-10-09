---
{
  "key": "calculus.rates-of-change",
  "title": "Rates of change and connected rates of change",
  "summary": "Interpret a derivative as a rate of change, and use the chain rule dy/dt = dy/dx × dx/dt to connect rates, for example the rate of increase of the area of a circle or the volume of a sphere, or the rate at which a liquid level rises in a tank.",
  "concepts": ["amath.calculus.rates-of-change"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

A derivative measures how fast one quantity changes compared with another. When the second quantity is **time**, the derivative is a rate in the everyday sense: litres per minute flowing into a tank, centimetres per second by which a ripple spreads on Lake Kariba, metres per minute by which water rises in a conical reservoir.

Often we know how fast one thing changes and want the rate of something connected to it. If a stone dropped into a pond makes a circular ripple whose radius grows at 3 cm/s, how fast is the area of the circle growing? Radius and area are linked by $A = \pi r^2$, and the **chain rule** links their rates. These "connected rates of change" questions appear in both ZIMSEC (applications of differentiation: rates of change) and Cambridge 0606 (topic 14.7), usually with a circle, a sphere, a cube or a cone.

## Key definitions

:::definition{term="Rate of change"}
$\dfrac{dy}{dx}$ is the rate of change of $y$ with respect to $x$. A rate of change **with respect to time** is written $\dfrac{dy}{dt}$; if no variable is named, "rate of change" means with respect to time.
:::

:::formula{name="Connected rates of change (chain rule, not in the List of formulas)"}
$$
\frac{dy}{dt} = \frac{dy}{dx} \times \frac{dx}{dt}
$$
:::

:::formula{name="Formulas often used"}
Circle: $A = \pi r^2$, $C = 2\pi r$. Sphere: $V = \frac{4}{3}\pi r^3$, $S = 4\pi r^2$. Cone: $V = \frac{1}{3}\pi r^2 h$. Cube: $V = x^3$, $S = 6x^2$. Cambridge's List of formulas gives the sphere and cone formulas; learn the others.
:::

Units of a rate: the units of the top quantity "per" the units of the bottom, for example cm²/s or m³/min. An increasing quantity has a **positive** rate; a decreasing one has a **negative** rate.

## The derivative as a rate

:::worked-solution[Example 1: the volume of water in a tank $t$ minutes after a tap is opened is $V = 40t + 3t^2$ litres. Find the rate at which the volume is increasing when $t = 5$]
1. $\dfrac{dV}{dt} = 40 + 6t$.
2. At $t = 5$: $\dfrac{dV}{dt} = 40 + 30 = 70$.
3. The volume is increasing at 70 litres per minute.
:::

## Connecting two rates

The method for connected rates:

1. Write down the rate you are **given** and the rate you **want**, in $\frac{d}{dt}$ notation.
2. Find a formula linking the two quantities, and differentiate it.
3. Use the chain rule to link the three derivatives, then substitute the values at the instant asked about.

Substitute the particular value (such as $r = 10$) only **after** differentiating. Substituting first turns a variable into a constant, and the derivative of a constant is zero.

:::worked-solution[Example 2: a circular ripple spreads so that its radius increases at 3 cm/s. Find the rate at which the area is increasing when the radius is 10 cm]
1. Given $\dfrac{dr}{dt} = 3$; want $\dfrac{dA}{dt}$ when $r = 10$.
2. $A = \pi r^2$, so $\dfrac{dA}{dr} = 2\pi r$.
3. $\dfrac{dA}{dt} = \dfrac{dA}{dr} \times \dfrac{dr}{dt} = 2\pi r \times 3 = 6\pi r$.
4. At $r = 10$: $\dfrac{dA}{dt} = 60\pi \approx 188$ cm²/s.
:::

When the given rate belongs to the "outer" quantity, the chain rule is used the other way round, dividing by the derivative.

:::worked-solution[Example 3: air is pumped into a spherical balloon at 100 cm³/s. Find the rate at which the radius is increasing when the radius is 5 cm]
1. Given $\dfrac{dV}{dt} = 100$; want $\dfrac{dr}{dt}$ when $r = 5$.
2. $V = \frac{4}{3}\pi r^3$, so $\dfrac{dV}{dr} = 4\pi r^2 = 100\pi$ at $r = 5$.
3. $\dfrac{dV}{dt} = \dfrac{dV}{dr} \times \dfrac{dr}{dt}$, so $100 = 100\pi \times \dfrac{dr}{dt}$.
4. $\dfrac{dr}{dt} = \dfrac{1}{\pi} \approx 0.318$ cm/s.
:::

Notice that the radius grows more slowly as the balloon gets bigger: the same 100 cm³ is spread over a larger surface.

## Liquid in a cone

Cone questions need one more step: the radius and the height of the water are linked by similar triangles, so the volume can be written in terms of the height alone.

:::worked-solution[Example 4: a conical tank has its vertex at the bottom. Its radius is half its height at every level, so the water surface has radius $r = \frac{1}{2}h$ when the depth is $h$ m. Water flows in at 2 m³/min. Find the rate at which the depth is rising when $h = 4$]
1. $V = \frac{1}{3}\pi r^2 h = \frac{1}{3}\pi\left(\frac{h}{2}\right)^2 h = \dfrac{\pi h^3}{12}$.
2. $\dfrac{dV}{dh} = \dfrac{\pi h^2}{4}$; at $h = 4$ this is $4\pi$.
3. $\dfrac{dV}{dt} = \dfrac{dV}{dh} \times \dfrac{dh}{dt}$: $2 = 4\pi \times \dfrac{dh}{dt}$.
4. $\dfrac{dh}{dt} = \dfrac{1}{2\pi} \approx 0.159$ m/min.
:::

## A point moving along a curve

The same idea applies to any function. If a point moves along the curve $y = \ln(2x + 1)$ with its $x$-coordinate increasing at 0.5 units per second, then when $x = 2$:

$$
\frac{dy}{dt} = \frac{dy}{dx} \times \frac{dx}{dt} = \frac{2}{2x + 1} \times 0.5 = \frac{2}{5} \times 0.5 = 0.2 \text{ units per second.}
$$

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards set connected rates with circles, spheres, cubes and cones, and both expect the chain rule written out. Cambridge prints the sphere and cone formulas on its List of formulas; ZIMSEC questions usually state the formula needed. Give exact answers in terms of $\pi$ when no accuracy is asked, otherwise 3 significant figures.
:::

## Common mistakes

:::mistake{title="Substituting the value too early"}
Putting $r = 10$ into $A = \pi r^2$ before differentiating gives $A = 100\pi$, a constant with derivative 0. Differentiate first.
:::

:::mistake{title="Chain rule upside down"}
Check that the "cancelling" works: $\frac{dA}{dr} \times \frac{dr}{dt}$ gives $\frac{dA}{dt}$; $\frac{dr}{dA} \times \frac{dr}{dt}$ does not.
:::

:::mistake{title="Forgetting the similar-triangles link in a cone"}
In $V = \frac{1}{3}\pi r^2 h$ both $r$ and $h$ change. Replace $r$ by its expression in $h$ before differentiating with respect to $h$.
:::

:::mistake{title="Sign of a decreasing quantity"}
If water leaks out at 5 cm³/s, then $\frac{dV}{dt} = -5$, and the depth's rate of change will come out negative.
:::

## Exam tips

:::exam-tip
Start every connected-rates answer by writing the given rate and the required rate in $\frac{d}{dt}$ notation. It shows the examiner your plan and earns a method mark.
:::

:::exam-tip
Write the chain rule in symbols before substituting numbers, for example $\frac{dV}{dt} = \frac{dV}{dh} \times \frac{dh}{dt}$.
:::

:::exam-tip
Include units in the final answer (cm²/s, m/min) and say whether the quantity is increasing or decreasing if asked.
:::

## Summary

:::summary
- $\dfrac{dy}{dt}$ is the rate of change of $y$ with time; positive means increasing.
- Connected rates: $\dfrac{dy}{dt} = \dfrac{dy}{dx} \times \dfrac{dx}{dt}$.
- Differentiate the linking formula first, then substitute the instant's values.
- For a cone, use similar triangles to write the volume in terms of one variable.
- Give units, and exact answers in terms of $\pi$ where appropriate.
:::
