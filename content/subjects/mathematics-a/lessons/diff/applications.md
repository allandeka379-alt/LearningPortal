---
{
  "key": "diff.applications",
  "title": "Tangents, normals, increasing functions and rates of change",
  "summary": "Use the derivative to find equations of tangents and normals, decide where a function is increasing or decreasing, and solve connected-rates-of-change problems with the chain rule.",
  "concepts": ["amaths.diff.applications"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

The derivative is a gradient, and gradients answer practical questions. How steep is the curve at this point, and what line just touches it there? Over which values of $x$ is a function rising? If a ripple on Lake Kariba spreads outwards at a steady speed, how fast is the area inside it growing at a given moment?

These three applications appear in almost every A-Level paper. ZIMSEC Pure Mathematics (Form 5) asks for gradients, tangents, normals and rates of change; Cambridge 9709 Paper 1 (topic 1.7) adds increasing and decreasing functions and connected rates of change explicitly. Questions often combine them with coordinate geometry, so you need the equation of a straight line, $y - y_{1} = m(x - x_{1})$, and the rule for perpendicular gradients, $m_{1}m_{2} = -1$.

## Key definitions

:::definition{term="Tangent and normal"}
The **tangent** to a curve at $P$ is the straight line through $P$ with the same gradient as the curve at $P$. The **normal** at $P$ is the line through $P$ perpendicular to the tangent.
:::

:::formula{name="Gradients of the tangent and normal"}
If the curve's gradient at $P(x_{1}, y_{1})$ is $m = \frac{dy}{dx}$, then

$$
\text{tangent: } y - y_{1} = m(x - x_{1}), \qquad \text{normal: } y - y_{1} = -\frac{1}{m}(x - x_{1}).
$$

Neither is printed in MF19.
:::

:::definition{term="Increasing and decreasing functions"}
A function $f$ is **increasing** on an interval if $f'(x) > 0$ there and **decreasing** if $f'(x) < 0$ there. (Cambridge also accepts $f'(x) \geq 0$ for "increasing" when equality holds only at isolated points.)
:::

:::formula{name="Connected rates of change"}
If $A$ depends on $r$ and $r$ depends on time $t$:

$$
\frac{dA}{dt} = \frac{dA}{dr} \times \frac{dr}{dt}.
$$

This is the chain rule with time as the final variable.
:::

## Tangents and normals

The method has three steps: find the point, find the gradient, write the line.

:::worked-solution[Example 1: tangent and normal to $y = x^{3} - 3x^{2} + 2$ at $x = 3$]
1. The point: $y = 27 - 27 + 2 = 2$, so $P$ is $(3, 2)$.
2. The gradient: $\dfrac{dy}{dx} = 3x^{2} - 6x$; at $x = 3$, $m = 27 - 18 = 9$.
3. Tangent: $y - 2 = 9(x - 3)$, so $y = 9x - 25$.
4. Normal gradient: $-\frac{1}{9}$. Normal: $y - 2 = -\frac{1}{9}(x - 3)$.
5. Multiply by 9: $9y - 18 = -x + 3$, so $x + 9y = 21$.
:::

Two special cases. Where the tangent is horizontal ($m = 0$), the normal is the **vertical** line $x = x_{1}$. Where you know a gradient but not the point, solve $\frac{dy}{dx} = m$ for $x$ first.

## Increasing and decreasing functions

The sign of $f'(x)$ tells you whether the graph rises or falls as $x$ increases. To find the intervals:

1. Find $f'(x)$ and factorise it.
2. Solve $f'(x) = 0$ to find the boundary values.
3. Use the shape of $f'$ (for a quadratic, a sketch of the parabola) to decide where $f'(x) > 0$ and where $f'(x) < 0$.

:::worked-solution[Example 2: where is $f(x) = x^{3} + 3x^{2} - 9x + 4$ decreasing?]
1. $f'(x) = 3x^{2} + 6x - 9 = 3(x^{2} + 2x - 3) = 3(x + 3)(x - 1)$.
2. $f'(x) = 0$ at $x = -3$ and $x = 1$.
3. $f'$ is a positive quadratic (U-shaped), so it is negative **between** its roots.
4. $f$ is decreasing for $-3 < x < 1$ and increasing for $x < -3$ and for $x > 1$.
:::

To show that a function is increasing **for all** $x$, show that $f'(x) > 0$ for every $x$, often by completing the square. For example, if $f(x) = x^{3} + 3x + 1$ then $f'(x) = 3x^{2} + 3 \geq 3 > 0$, so $f$ is increasing everywhere and its equation $f(x) = 0$ has exactly one real root.

## Rates of change

$\frac{dy}{dx}$ is the rate of change of $y$ with respect to $x$. When the variable is time, $\frac{dV}{dt}$ is the rate at which $V$ changes per second (or per minute). A positive rate means the quantity is increasing; a negative one means it is decreasing.

In a **connected rates** problem you are given one rate and asked for another. The two quantities are linked by a formula (area of a circle, volume of a sphere) that you differentiate to provide the missing link in the chain.

:::worked-solution[Example 3: a ripple on Lake Kariba]
A stone dropped into still water makes a circular ripple whose radius increases at $3\ \text{m/s}$. Find the rate at which the area inside the ripple is increasing when the radius is $10\ \text{m}$.

1. Link: $A = \pi r^{2}$, so $\dfrac{dA}{dr} = 2\pi r$.
2. Given: $\dfrac{dr}{dt} = 3$.
3. Chain rule: $\dfrac{dA}{dt} = \dfrac{dA}{dr} \times \dfrac{dr}{dt} = 2\pi r \times 3 = 6\pi r$.
4. At $r = 10$: $\dfrac{dA}{dt} = 60\pi \approx 188.5\ \text{m}^2\text{/s}$.
:::

Notice that the area grows faster as the ripple gets bigger even though the radius grows at a steady rate.

:::worked-solution[Example 4: an exam-style balloon question]
Air is pumped into a spherical balloon at a constant rate of $50\ \text{cm}^3$ per second. Find the rate at which the radius is increasing at the instant when the radius is $5\ \text{cm}$.

1. Link: $V = \frac{4}{3}\pi r^{3}$, so $\dfrac{dV}{dr} = 4\pi r^{2}$.
2. Given: $\dfrac{dV}{dt} = 50$. Required: $\dfrac{dr}{dt}$.
3. Chain rule: $\dfrac{dV}{dt} = \dfrac{dV}{dr} \times \dfrac{dr}{dt}$, so $\dfrac{dr}{dt} = \dfrac{50}{4\pi r^{2}}$.
4. At $r = 5$: $\dfrac{dr}{dt} = \dfrac{50}{100\pi} = \dfrac{1}{2\pi} \approx 0.159\ \text{cm/s}$.
:::

A reliable layout for these questions: write the **given rate**, the **required rate**, the **link formula** and its derivative, then the chain rule with the rates in the right places. If the units do not match on both sides, a rate is in the wrong place.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine tangents, normals and rates of change at this level (ZIMSEC Form 5; Cambridge Paper 1). Cambridge names increasing and decreasing functions and connected rates explicitly; ZIMSEC includes them under rates of change and problems involving differentiation.
:::

## Common mistakes

:::mistake{title="Using the derivative instead of its value"}
The tangent's gradient is a **number**: substitute $x_{1}$ into $\frac{dy}{dx}$. Writing $y - 2 = (3x^{2} - 6x)(x - 3)$ gives a curve, not a line.
:::

:::mistake{title="Normal gradient as the negative only"}
If the tangent gradient is 9, the normal gradient is $-\frac{1}{9}$, not $-9$. It is the negative **reciprocal**.
:::

:::mistake{title="Rates the wrong way up"}
In Example 4, $\frac{dr}{dt} = \frac{dV}{dt} \div \frac{dV}{dr}$. Multiplying $50 \times 100\pi$ gives a huge, impossible answer; check the units.
:::

:::mistake{title="Substituting too early"}
Differentiate the link formula **before** substituting the particular value of $r$. Putting $r = 5$ into $V$ first makes $V$ a constant, whose derivative is 0.
:::

## Exam tips

:::exam-tip
"Find the equation of the tangent" usually expects a simplified form such as $y = mx + c$ or $ax + by + c = 0$ with integers. Read whether a particular form is asked for.
:::

:::exam-tip
For "show that $f$ is an increasing function", give a reason that covers every $x$: a completed square, or "$3x^{2} \geq 0$, so $f'(x) \geq 3 > 0$".
:::

:::exam-tip
In rates questions give units and say "increasing" or "decreasing". A negative $\frac{dh}{dt}$ is often reported as "decreasing at" the positive value.
:::

## Summary

:::summary
- Tangent at $(x_{1}, y_{1})$: gradient $m = \frac{dy}{dx}$ evaluated there; normal gradient $-\frac{1}{m}$.
- $f$ is increasing where $f'(x) > 0$ and decreasing where $f'(x) < 0$; factorise $f'(x)$ to find the intervals.
- Rates of change with time: $\frac{dA}{dt} = \frac{dA}{dr} \times \frac{dr}{dt}$.
- Differentiate the link formula first, then substitute the instant's values.
- Give units, and the direction of change, in rates answers.
:::
