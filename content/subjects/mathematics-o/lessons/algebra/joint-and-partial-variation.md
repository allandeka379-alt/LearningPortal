---
{
  "key": "algebra.joint-and-partial-variation",
  "title": "Joint and partial variation",
  "summary": "Write joint variation such as z ∝ x/y² as an equation, find the constant, and solve partial variation problems such as y = kx + c by forming simultaneous equations from two given conditions.",
  "concepts": ["math.algebra.joint-and-partial-variation"],
  "objectives": ["zimsec/o-level/mathematics:6.0.2", "zimsec/o-level/mathematics:6.0.3"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

The time it takes to build a wall depends on **two** things: how long the wall is and how many builders there are. A longer wall takes more days; more builders take fewer days. When one quantity depends on several others in this way, we have **joint variation**.

Now think about hiring a school hall in Masvingo for a function. There is a fixed booking fee, plus a charge for every guest. Part of the cost is constant and part varies with the number of guests. This is **partial variation**.

Both ideas are in the ZIMSEC Variation topic. You should already be confident with direct and inverse variation ($y = kx$, $y = \frac{k}{x}$ and the versions with powers and roots) and with solving simultaneous linear equations.

## Key definitions

:::definition{term="Joint variation"}
A quantity varies jointly when it varies as two or more other quantities at once. "$z$ varies jointly as $x$ and $y$" means $z \propto xy$, so $z = kxy$.
:::

:::definition{term="Combined (joint and inverse) variation"}
A quantity can vary directly as some quantities and inversely as others. "$z$ varies directly as $x$ and inversely as the square of $y$" means $z = \dfrac{kx}{y^2}$.
:::

:::definition{term="Partial variation"}
A quantity that is the sum of two or more parts, each of which is constant or varies. "$y$ is partly constant and partly varies as $x$" means $y = c + kx$, with **two** constants to find.
:::

:::keyfact{title="One constant or two?"}
Joint variation has **one** constant $k$, found from one set of values. Partial variation has **two** constants, so you need **two** sets of values and simultaneous equations.
:::

## Joint variation

The method is the same as for simple variation: write the equation with $k$, substitute to find $k$, then use the equation.

:::worked-solution[Example 1: $z$ varies jointly as $x$ and $y$]
$z = 24$ when $x = 2$ and $y = 3$. Find $z$ when $x = 5$ and $y = 1.5$.

1. $z = kxy$.
2. $24 = k \times 2 \times 3 = 6k$, so $k = 4$.
3. $z = 4xy$.
4. When $x = 5$ and $y = 1.5$: $z = 4 \times 5 \times 1.5 = 30$.
:::

:::worked-solution[Example 2: $z$ varies directly as $x$ and inversely as $y^2$]
$z = 6$ when $x = 12$ and $y = 2$.

1. $z = \dfrac{kx}{y^2}$.
2. $6 = \dfrac{12k}{4} = 3k$, so $k = 2$ and $z = \dfrac{2x}{y^2}$.
3. When $x = 9$ and $y = 3$: $z = \dfrac{2 \times 9}{9} = 2$.
4. To find $y$ when $z = 8$ and $x = 16$: $8 = \dfrac{32}{y^2}$, so $y^2 = 4$ and $y = 2$ (taking the positive value).
:::

### The effect of changes

If $z = \dfrac{kx}{y^2}$ and **both** $x$ and $y$ are doubled, then $z$ becomes $\dfrac{k(2x)}{(2y)^2} = \dfrac{2kx}{4y^2}$, which is half of the original $z$. Work out the effect of each change and multiply them together.

## Partial variation

:::worked-solution[Example 3: the cost of hiring a hall]
The cost $C$ dollars of hiring a hall is partly constant and partly varies as the number of guests $n$. For 40 guests the cost is US\$290; for 70 guests it is US\$440. Find the cost for 100 guests.

1. $C = a + bn$, where $a$ and $b$ are constants.
2. $290 = a + 40b$ and $440 = a + 70b$.
3. Subtract the first equation from the second: $150 = 30b$, so $b = 5$.
4. Substitute: $290 = a + 200$, so $a = 90$. Therefore $C = 90 + 5n$.
5. For 100 guests: $C = 90 + 500 = 590$, so US\$590.
:::

Here $a = 90$ is the fixed booking fee (the part that does not change) and $b = 5$ is the charge per guest.

:::worked-solution[Example 4: partly as $x$ and partly as $x^2$]
$y$ is partly proportional to $x$ and partly proportional to $x^2$. When $x = 1$, $y = 7$; when $x = 2$, $y = 22$. Find $y$ in terms of $x$.

1. $y = ax + bx^2$.
2. $x = 1$: $a + b = 7$.
3. $x = 2$: $2a + 4b = 22$, so $a + 2b = 11$.
4. Subtract: $b = 4$, and then $a = 3$.
5. So $y = 3x + 4x^2$. Check: $x = 2$ gives $6 + 16 = 22$.
:::

## Graphs

- $z = kxy$ cannot be drawn as a single graph in two dimensions, but if one variable is fixed it becomes simple direct variation.
- The partial variation $y = c + kx$ has a **straight-line** graph with gradient $k$ that cuts the $y$-axis at $c$. It does **not** pass through the origin (unless $c = 0$), which is how you can tell it apart from direct variation.

![Graph of the hall cost C = 90 + 5n for partial variation: a straight line with gradient 5 (US\$5 per guest) that cuts the vertical axis at US\$90, the fixed fee, so it does not pass through the origin; it passes through (40, 290), (70, 440) and (100, 590).](media:diagrams/partial-variation-hall-cost-graph.png "Figure: partial variation is a straight line that does not start at the origin")

## Common mistakes

:::mistake{title="Using two constants in a joint variation"}
$z \propto xy$ is $z = kxy$ with one constant, not $z = ax + by$.
:::

:::mistake{title="Trying to find two constants from one condition"}
A partial variation $y = a + bx$ needs two pairs of values. Write **two** equations and solve them simultaneously.
:::

:::mistake{title="Forgetting the power in the denominator"}
In $z = \frac{kx}{y^2}$ with $y = 2$, divide by $y^2 = 4$, not by 2.
:::

## Exam tips

:::exam-tip
Write the equation with the constant(s) first, before substituting. Examiners give a mark for the correct form such as $C = a + bn$ even before any numbers are used.
:::

:::exam-tip
After finding the constants, check them in **both** original conditions. A quick check catches most arithmetic slips.
:::

:::exam-tip
In a context question, say what the constants mean, such as "the fixed fee is US\$90 and each guest costs US\$5". "Interpret" questions ask for exactly this.
:::

## Summary

:::summary
- Joint variation: $z \propto xy$ means $z = kxy$; combined variation such as $z = \frac{kx}{y^2}$ also has one constant.
- Find the single constant of a joint variation from one set of values.
- Partial variation, such as $y = c + kx$ or $y = ax + bx^2$, has two constants found by simultaneous equations from two conditions.
- The graph of $y = c + kx$ is a straight line with $y$-intercept $c$, not passing through the origin.
:::
