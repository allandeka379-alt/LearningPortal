---
{
  "key": "coordinate.perpendicular-lines",
  "title": "Perpendicular lines and perpendicular bisectors",
  "summary": "The gradients of perpendicular lines multiply to −1: find perpendicular gradients, the equation of a line perpendicular to a given line through a point, and the perpendicular bisector of a line segment.",
  "concepts": ["math.coordinate.perpendicular-lines"],
  "objectives": ["cambridge/igcse/mathematics:3.7.1"],
  "estimatedMinutes": 30,
  "level": "extended"
}
---
## Introduction

Two neighbouring farms each have a borehole. The farmers agree that the boundary fence between them should run along all the points that are the same distance from both boreholes. That fence line crosses the line joining the boreholes at its midpoint, at **right angles**. It is called the **perpendicular bisector**, and you can find its equation exactly.

Lines that meet at right angles are called **perpendicular**. In this lesson you will see the neat rule that connects their gradients, and use it to find equations of perpendicular lines and perpendicular bisectors, a standard question type on Cambridge Extended papers.

You should already know how to find gradients, midpoints and equations of the form $y = mx + c$.

## Key definitions

:::definition{term="Perpendicular lines"}
Lines that meet at a right angle ($90^\circ$).
:::

:::definition{term="Negative reciprocal"}
The negative reciprocal of a number $m$ is $-\frac{1}{m}$: turn the fraction upside down and change its sign. The negative reciprocal of $\frac{2}{3}$ is $-\frac{3}{2}$.
:::

:::definition{term="Perpendicular bisector"}
The line that passes through the midpoint of a line segment and is perpendicular to it. Every point on it is the same distance from both ends of the segment.
:::

:::keyfact{title="The perpendicular gradients rule"}
If two lines with gradients $m_1$ and $m_2$ are perpendicular, then

$$
m_1 \times m_2 = -1, \qquad \text{so} \qquad m_2 = -\frac{1}{m_1}
$$

The exception is a horizontal line (gradient $0$) and a vertical line (undefined gradient), which are also perpendicular.
:::

## Why the rule works

Take a line that goes $3$ across and $2$ up, so its gradient is $\frac{2}{3}$. Turn the little gradient triangle through $90^\circ$: now it goes $2$ **back** and $3$ up, which is the same as $2$ across and $3$ down. The new gradient is $-\frac{3}{2}$. And $\frac{2}{3} \times \left(-\frac{3}{2}\right) = -1$.

| Gradient of line | Perpendicular gradient | Product |
| :---: | :---: | :---: |
| $2$ | $-\frac{1}{2}$ | $-1$ |
| $-3$ | $\frac{1}{3}$ | $-1$ |
| $\frac{1}{4}$ | $-4$ | $-1$ |
| $-\frac{2}{5}$ | $\frac{5}{2}$ | $-1$ |

## Testing whether lines are perpendicular

:::worked-solution[Example 1: are $y = 2x + 1$ and $x + 2y = 6$ perpendicular?]
1. The first line has gradient $2$.
2. Rearrange the second: $2y = -x + 6$, so $y = -\frac{1}{2}x + 3$, gradient $-\frac{1}{2}$.
3. $2 \times \left(-\frac{1}{2}\right) = -1$, so the lines are perpendicular.
:::

## The equation of a perpendicular line

:::worked-solution[Example 2: perpendicular to $y = 3x - 2$ through $(6, 1)$]
1. The given gradient is $3$, so the perpendicular gradient is $-\frac{1}{3}$.
2. $y = -\frac{1}{3}x + c$. Substitute $(6, 1)$: $1 = -2 + c$, so $c = 3$.
3. $y = -\frac{1}{3}x + 3$.
4. Multiplying by 3 gives the integer form $x + 3y = 9$.
:::

:::worked-solution[Example 3: perpendicular to $3x - 4y = 8$ through $(-2, 5)$]
Give the answer in the form $ax + by = c$ with integer coefficients.
1. Rearrange the given line: $4y = 3x - 8$, so $y = \frac{3}{4}x - 2$ and its gradient is $\frac{3}{4}$.
2. The perpendicular gradient is $-\frac{4}{3}$.
3. $y = -\frac{4}{3}x + c$ through $(-2, 5)$: $5 = \frac{8}{3} + c$, so $c = \frac{7}{3}$.
4. Multiply $y = -\frac{4}{3}x + \frac{7}{3}$ by 3: $3y = -4x + 7$, so $4x + 3y = 7$.
5. Check: $4(-2) + 3(5) = -8 + 15 = 7$.
:::

Notice the pattern: a line perpendicular to $ax + by = c$ can be written $bx - ay = k$. Here $3x - 4y = 8$ led to $4x + 3y = 7$, with the coefficients swapped and one sign changed.

## The perpendicular bisector

You need two things: a **point** (the midpoint of the segment) and a **gradient** (perpendicular to the segment).

:::worked-solution[Example 4: perpendicular bisector of $A(1, 2)$ and $B(7, 6)$]
1. Midpoint $M = \left(\frac{1 + 7}{2}, \frac{2 + 6}{2}\right) = (4, 4)$.
2. Gradient of $AB = \frac{6 - 2}{7 - 1} = \frac{4}{6} = \frac{2}{3}$.
3. Perpendicular gradient $= -\frac{3}{2}$.
4. $y = -\frac{3}{2}x + c$ through $(4, 4)$: $4 = -6 + c$, so $c = 10$.
5. $y = -\frac{3}{2}x + 10$, or $3x + 2y = 20$.
6. Check: $A$ and $B$ should be the same distance from any point on it. The point $(0, 10)$ is on the line: its distance from $A$ is $\sqrt{1 + 64} = \sqrt{65}$, and from $B$ it is $\sqrt{49 + 16} = \sqrt{65}$.
:::

## Right angles in shapes

:::worked-solution[Example 5: a right-angled triangle]
Show that the triangle $A(1, 1)$, $B(3, 5)$, $C(7, 3)$ has a right angle at $B$.
1. Gradient $AB = \frac{5 - 1}{3 - 1} = 2$.
2. Gradient $BC = \frac{3 - 5}{7 - 3} = -\frac{1}{2}$.
3. $2 \times \left(-\frac{1}{2}\right) = -1$, so $AB$ is perpendicular to $BC$ and angle $ABC = 90^\circ$.
:::

## Common mistakes

:::mistake{title="Changing only one thing"}
The perpendicular gradient to $4$ is $-\frac{1}{4}$: you must both flip **and** change the sign. $\frac{1}{4}$ (flip only) or $-4$ (sign only) are wrong.
:::

:::mistake{title="Using the original line's point or gradient"}
A perpendicular bisector goes through the **midpoint** with the **perpendicular** gradient. Using $A$ instead of the midpoint, or the gradient of $AB$ itself, gives a different line.
:::

:::mistake{title="Not rearranging first"}
For $2x + 5y = 7$, the gradient is $-\frac{2}{5}$, so the perpendicular gradient is $\frac{5}{2}$. Reading the gradient as $2$ or $5$ leads to the wrong answer.
:::

:::mistake{title="Mixing up parallel and perpendicular"}
Parallel: equal gradients. Perpendicular: gradients multiply to $-1$. Write down which rule you are using before you start.
:::

## Exam tips

:::exam-tip
For a perpendicular bisector, write three labelled lines of working: "midpoint $= \ldots$", "gradient of $AB = \ldots$", "perpendicular gradient $= \ldots$". Each is usually worth a mark.
:::

:::exam-tip
To **show** that lines are perpendicular, multiply the gradients and state "$m_1 m_2 = -1$, so the lines are perpendicular". A conclusion sentence is needed for the final mark.
:::

:::exam-tip
Questions often ask for the answer in a form such as $ax + by = c$ or $ax + by + c = 0$: clear fractions by multiplying through, and give exactly the form requested.
:::

## Summary

:::summary
- Perpendicular lines meet at $90^\circ$; their gradients satisfy $m_1 m_2 = -1$.
- The perpendicular gradient is the negative reciprocal: flip the fraction and change the sign.
- Horizontal and vertical lines are perpendicular to each other.
- Perpendicular bisector of $AB$: through the midpoint of $AB$ with gradient $-\frac{1}{m_{AB}}$.
- Use $m_1 m_2 = -1$ to prove right angles in triangles and quadrilaterals.
:::
