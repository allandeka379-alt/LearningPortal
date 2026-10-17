---
{
  "key": "algebra.variation",
  "title": "Direct and inverse variation",
  "summary": "Write direct and inverse variation (proportion) with x, x², x³, √x and ∛x as equations using a constant k, find k from given values, use the equation to find unknowns, and recognise the graphs.",
  "concepts": ["math.algebra.variation"],
  "objectives": ["zimsec/o-level/mathematics:6.0.1", "zimsec/o-level/mathematics:6.0.3", "cambridge/igcse/mathematics:2.8.1", "cambridge/igcse/mathematics:2.8.2"],
  "estimatedMinutes": 35,
  "freePreview": true,
  "level": "extended"
}
---
## Introduction

Drop a stone down a well on a farm near Gweru. After 1 second it has fallen about 5 metres, after 2 seconds about 20 metres and after 3 seconds about 45 metres. The distance is not simply proportional to the time: it is proportional to the **square** of the time. Mathematics that describes how one quantity depends on another in this way is called **variation** (Cambridge calls it **proportion**).

In this lesson you will turn statements such as "$y$ varies inversely as the square of $x$" into equations, find the constant of variation, and use the equations to solve problems. This is Cambridge Extended material and part of the ZIMSEC Variation topic.

You should already be able to substitute into formulas, rearrange simple equations, and find squares, cubes, square roots and cube roots.

## Key definitions

:::definition{term="Direct variation"}
$y$ varies directly as $x$ (or $y$ is directly proportional to $x$), written $y \propto x$, when $y = kx$ for some constant $k$.
:::

:::definition{term="Inverse variation"}
$y$ varies inversely as $x$ (or $y$ is inversely proportional to $x$), written $y \propto \frac{1}{x}$, when $y = \frac{k}{x}$ for some constant $k$.
:::

:::definition{term="Constant of variation"}
The fixed number $k$ in a variation equation (also called the constant of proportionality). It is found from one pair of known values.
:::

:::keyfact{title="The common forms"}
| Statement | Equation |
| --- | --- |
| $y$ varies as $x$ | $y = kx$ |
| $y$ varies as the square of $x$ | $y = kx^2$ |
| $y$ varies as the cube of $x$ | $y = kx^3$ |
| $y$ varies as the square root of $x$ | $y = k\sqrt{x}$ |
| $y$ varies as the cube root of $x$ | $y = k\sqrt[3]{x}$ |
| $y$ varies inversely as $x$ | $y = \dfrac{k}{x}$ |
| $y$ varies inversely as the square of $x$ | $y = \dfrac{k}{x^2}$ |
:::

## The method

1. Write the statement as an equation with $k$.
2. Substitute the pair of values you are given and solve for $k$.
3. Write the equation again with the value of $k$.
4. Use the equation to find the unknown.

:::worked-solution[Example 1: direct variation]
$y$ is directly proportional to $x$, and $y = 12$ when $x = 4$. Find $y$ when $x = 7$.

1. $y = kx$.
2. $12 = k \times 4$, so $k = 3$.
3. $y = 3x$.
4. When $x = 7$: $y = 3 \times 7 = 21$.
:::

:::worked-solution[Example 2: the stone in the well, $d \propto t^2$]
The distance $d$ metres fallen by a stone varies as the square of the time $t$ seconds. $d = 45$ when $t = 3$.

1. $d = kt^2$.
2. $45 = k \times 3^2 = 9k$, so $k = 5$.
3. $d = 5t^2$.
4. After 4 seconds: $d = 5 \times 4^2 = 80$ m.
5. To fall 125 m: $125 = 5t^2$, so $t^2 = 25$ and $t = 5$ s (time is positive).
:::

:::worked-solution[Example 3: inverse variation with a square root]
$y$ is inversely proportional to $\sqrt{x}$, and $y = 6$ when $x = 16$. Find $x$ when $y = 3$.

1. $y = \dfrac{k}{\sqrt{x}}$.
2. $6 = \dfrac{k}{\sqrt{16}} = \dfrac{k}{4}$, so $k = 24$.
3. $y = \dfrac{24}{\sqrt{x}}$.
4. When $y = 3$: $3 = \dfrac{24}{\sqrt{x}}$, so $\sqrt{x} = 8$ and $x = 64$.
:::

## The effect of a change

You can often answer "what happens to $y$" questions without finding $k$.

- If $y \propto x^2$ and $x$ is doubled, $y$ is multiplied by $2^2 = 4$.
- If $y \propto x^3$ and $x$ is increased by 10%, $y$ is multiplied by $1.1^3 = 1.331$: an increase of 33.1%.
- If $y \propto \frac{1}{x}$ and $x$ is halved, $y$ is doubled.
- If $y \propto \frac{1}{x^2}$ and $x$ is tripled, $y$ is divided by $3^2 = 9$.

:::example{title="Journey time and speed"}
The time for a journey varies inversely as the average speed. A trip takes 3 hours at 80 km/h, so $t = \frac{k}{v}$ with $k = 240$. At 96 km/h it takes $\frac{240}{96} = 2.5$ hours.
:::

## Graphs of variation

- $y = kx$: a straight line through the origin with gradient $k$.
- $y = kx^2$ (for $x \geq 0$): a curve through the origin that gets steeper and steeper.
- $y = \frac{k}{x}$ (for $x > 0$): a curve that falls as $x$ increases and gets closer and closer to both axes without touching them.
- Plotting $y$ against $x^2$ (or against $\frac{1}{x}$) turns the matching variation into a **straight line through the origin**. This is a good way to test data.

![Two graphs of variation: the stone's distance d = 5t² rises ever more steeply through (1, 5), (2, 20), (3, 45) and (4, 80); the journey time t = 240 ÷ v falls as speed rises, passing through (80, 3) and (96, 2.5).](media:diagrams/variation-square-and-inverse-graphs.png "Figure: direct variation with the square (left) and inverse variation (right)")

A table of values can also be tested: if $y \propto x^2$, then $\frac{y}{x^2}$ is the same for every pair. For $x = 1, 2, 3$ and $y = 3, 12, 27$, every ratio $\frac{y}{x^2}$ is 3.

## Common mistakes

:::mistake{title="Forgetting to square (or root) when finding k"}
If $d = kt^2$ and $d = 45$ when $t = 3$, then $45 = 9k$, not $45 = 3k$.
:::

:::mistake{title="Using y = k + x"}
Variation always multiplies or divides by $k$. "$y$ varies as $x$" is $y = kx$, never $y = x + k$.
:::

:::mistake{title="Doubling instead of squaring"}
If $y \propto x^2$, doubling $x$ multiplies $y$ by 4, not 2.
:::

:::mistake{title="Stopping at the square"}
When solving $125 = 5t^2$, you get $t^2 = 25$. Remember the final square root: $t = 5$.
:::

## Exam tips

:::exam-tip
"Find an equation connecting $y$ and $x$" or "express $y$ in terms of $x$" means write the equation with the **number** for $k$, such as $y = 5x^2$. Leaving it as $y = kx^2$ loses the mark.
:::

:::exam-tip
Show the substitution that finds $k$ as a separate line: it is usually worth a method mark on its own.
:::

:::exam-tip
Check your answer for sense: in an inverse variation, a bigger $x$ must give a smaller $y$.
:::

## Summary

:::summary
- $y \propto x$ means $y = kx$; $y \propto \frac{1}{x}$ means $y = \frac{k}{x}$; the same pattern works with $x^2$, $x^3$, $\sqrt{x}$ and $\sqrt[3]{x}$.
- Find $k$ by substituting one pair of values, then write the equation with that value of $k$.
- If $y \propto x^n$, multiplying $x$ by $m$ multiplies $y$ by $m^n$.
- Direct variation $y = kx$ is a straight line through the origin; inverse variation $y = \frac{k}{x}$ is a curve approaching both axes.
:::
