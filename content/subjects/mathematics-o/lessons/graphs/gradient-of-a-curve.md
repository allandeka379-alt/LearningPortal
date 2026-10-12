---
{
  "key": "graphs.gradient-of-a-curve",
  "title": "Gradient of a curve: drawing tangents",
  "summary": "Estimate the gradient of a curve at a point by drawing a tangent and finding its gradient, and interpret the result as a rate of change, such as a speed from a curved distance–time graph.",
  "concepts": ["math.graphs.gradient-of-a-curve"],
  "objectives": ["zimsec/o-level/mathematics:5.1.5", "cambridge/igcse/mathematics:2.12.1"],
  "estimatedMinutes": 25,
  "level": "extended"
}
---
## Introduction

A kombi pulling away from the rank in Bulawayo starts slowly and gets faster. Its distance–time graph is not a straight line but a curve that gets steeper and steeper. How fast is it going exactly 6 seconds after it starts? A straight line has one gradient everywhere, but a curve's steepness changes from point to point.

To measure the steepness of a curve at one particular point, we draw a **tangent** there and find the gradient of that straight line. It is an estimate, because it depends on how carefully the tangent is drawn, so examiners accept a range of answers.

You should already be able to find the gradient of a straight line and plot curves from tables of values.

## Key definitions

:::definition{term="Tangent"}
A straight line that touches a curve at one point and has the same direction as the curve there. Close to that point, it does not cut across the curve.
:::

:::definition{term="Gradient of a curve at a point"}
The gradient of the tangent to the curve at that point. It tells you the rate at which $y$ is changing with $x$ at that instant.
:::

:::definition{term="Chord"}
A straight line joining two points on a curve. Its gradient is the **average** rate of change between those two points.
:::

:::keyfact{title="Interpreting the sign"}
- Positive gradient: the curve is rising at that point.
- Negative gradient: the curve is falling at that point.
- Zero gradient: the tangent is horizontal, as at a turning point (maximum or minimum).
:::

## How to draw a tangent and find its gradient

1. Mark the point $P$ on the curve clearly.
2. Place your ruler so that it touches the curve at $P$ only. The angles between the ruler and the curve should look the same on both sides of $P$.
3. Draw a long straight line along the ruler.
4. Choose two points on the tangent that are **far apart** and easy to read, ideally where the line crosses grid lines.
5. Gradient $= \dfrac{\text{change in } y}{\text{change in } x}$ between those two points, using the scales on the axes.

:::worked-solution[Example 1: the gradient of $y = x^2$ at $x = 2$]
1. The point is $(2, 4)$.
2. A student draws the tangent at $(2, 4)$; it passes through $(1, 0)$ and $(3, 8)$.
3. Gradient $= \frac{8 - 0}{3 - 1} = \frac{8}{2} = 4$.
4. So at $x = 2$ the curve is rising at 4 units of $y$ for every unit of $x$.
:::

Different students' tangents differ slightly, so answers such as $3.8$ or $4.3$ would also be accepted for this estimate. (In the Cambridge Extended course you will meet differentiation, which gives the exact value: $4$.)

![Graph of y = x² with the tangent at P(2, 4) drawn as a straight line touching the curve only at P and passing through (1, 0) and (3, 8); its gradient is 8 divided by 2, which is 4.](media:diagrams/tangent-gradient-x-squared.png "Figure: the gradient of the tangent at P estimates the gradient of the curve")

:::worked-solution[Example 2: a negative gradient]
Estimate the gradient of $y = \frac{12}{x}$ at the point $(2, 6)$.
1. The curve is falling here, so expect a negative answer.
2. The tangent at $(2, 6)$ passes through $(0, 12)$ and $(4, 0)$.
3. Gradient $= \frac{0 - 12}{4 - 0} = \frac{-12}{4} = -3$.
:::

## Gradients as rates of change

On a real-life curve, the gradient of a tangent is an **instantaneous rate of change**, with units.

:::worked-solution[Example 3: the speed of the kombi]
A kombi's distance $d$ metres after $t$ seconds is given by $d = 0.5t^2$ for $0 \leq t \leq 10$. Estimate its speed at $t = 6$.
1. Table: $t = 0, 2, 4, 6, 8, 10$ gives $d = 0, 2, 8, 18, 32, 50$.
2. Plot the curve and draw the tangent at $(6, 18)$.
3. The tangent passes through about $(3, 0)$ and $(10, 42)$.
4. Gradient $= \frac{42 - 0}{10 - 3} = \frac{42}{7} = 6$.
5. The speed at $t = 6$ is about $6\ \text{m/s}$.
:::

Compare this with the **average** speed over the whole 10 seconds: the chord from $(0, 0)$ to $(10, 50)$ has gradient $\frac{50}{10} = 5\ \text{m/s}$. At $t = 6$ the kombi is going faster than its average, because it is still speeding up.

![Distance-time curve d = 0.5t² for 0 to 10 s: the tangent at t = 6 s (through (3, 0) and (10, 42)) has gradient 6 m/s, steeper than the dashed chord from (0, 0) to (10, 50), whose gradient is the average speed of 5 m/s.](media:diagrams/kombi-tangent-speed.png "Figure: the tangent gives speed at one instant, the chord gives average speed")

:::example{title="A growing maize plant"}
A graph of the height $h$ cm of a maize plant against time $t$ days is a curve. The tangent at $t = 20$ passes through $(10, 30)$ and $(30, 90)$. Its gradient is $\frac{60}{20} = 3$, so on day 20 the plant is growing at about $3\ \text{cm}$ per day.
:::

## Common mistakes

:::mistake{title="Drawing a chord instead of a tangent"}
Joining two points **on the curve** gives a chord and the average rate between them, not the gradient at a point. A tangent touches the curve at just one point.
:::

:::mistake{title="Letting the tangent cut the curve"}
If your line crosses the curve near the point, it is not a tangent. Rotate the ruler until it just touches.
:::

:::mistake{title="Using points too close together"}
Reading two points only one small square apart magnifies tiny errors. Extend the tangent and use points far apart.
:::

:::mistake{title="Ignoring the axis scales and the sign"}
Use the values on the axes, not the number of squares. A tangent sloping down from left to right has a negative gradient.
:::

## Exam tips

:::exam-tip
Leave the tangent and the two points you used visible on your graph. A correct-looking tangent usually earns a mark even if your final estimate is slightly outside the accepted range.
:::

:::exam-tip
Answers from tangents are accepted within a range around the true value, so do not worry about tiny differences. Do give the sign, and units if the graph has them (for example, m/s).
:::

:::exam-tip
"**Estimate the speed at** $t = 6$" on a distance–time curve means "draw a tangent at $t = 6$ and find its gradient".
:::

## Summary

:::summary
- The gradient of a curve at a point is the gradient of the tangent at that point.
- Draw the tangent touching the curve at the point only; use two far-apart points on it.
- Positive: rising; negative: falling; zero: turning point.
- A tangent gives an instantaneous rate of change; a chord gives an average rate of change.
- On a distance–time curve, the gradient of a tangent is the speed at that instant.
:::
