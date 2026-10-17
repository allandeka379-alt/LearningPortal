---
{
  "key": "trigonometry.exact-values",
  "title": "Exact trigonometric values",
  "summary": "Recall and derive the exact values of sine and cosine of 0°, 30°, 45°, 60° and 90° and of tangent of 0°, 30°, 45° and 60°, and use them without a calculator to find exact lengths, angles and values of expressions.",
  "concepts": ["math.trigonometry.exact-values"],
  "objectives": ["cambridge/igcse/mathematics:6.3.1"],
  "estimatedMinutes": 20,
  "level": "extended"
}
---
## Introduction

Cambridge IGCSE Paper 2 is a **non-calculator** paper, yet it can still ask trigonometry questions. That is possible because a few special angles, $30^\circ$, $45^\circ$ and $60^\circ$ (together with $0^\circ$ and $90^\circ$), have sines, cosines and tangents that can be written **exactly**, using fractions and square roots.

In this lesson you will see where these values come from, so that you can rebuild them in an examination instead of relying on memory alone, and you will use them to find exact lengths and angles.

:::note{title="Cambridge Extended only"}
Exact trigonometric values are in the Cambridge IGCSE Extended syllabus (6.3). They are not listed in the ZIMSEC O-Level syllabus.
:::

You should know SOH CAH TOA, Pythagoras' theorem and how to simplify surds such as $\sqrt{12} = 2\sqrt{3}$.

## Key definitions

:::definition{term="Exact value"}
A value written without rounding, using integers, fractions and surds, for example $\frac{\sqrt{3}}{2}$ rather than $0.866$.
:::

:::definition{term="Rationalising the denominator"}
Rewriting a fraction so that there is no surd on the bottom: $\dfrac{1}{\sqrt{3}} = \dfrac{1}{\sqrt{3}} \times \dfrac{\sqrt{3}}{\sqrt{3}} = \dfrac{\sqrt{3}}{3}$.
:::

## Where the values come from

![The two special triangles for exact trigonometric values: a right-angled isosceles triangle with legs 1 and hypotenuse √2 (angles 45°), and half an equilateral triangle with sides 1, √3 and 2 (angles 30° and 60°).](media:diagrams/exact-values-special-triangles.png "Figure: the 45° triangle and the 30°–60° triangle give the exact values")

:::example{title="The 45° triangle"}
Take a right-angled isosceles triangle with the two shorter sides 1 unit long. Its angles are $45^\circ$, $45^\circ$ and $90^\circ$, and by Pythagoras its hypotenuse is $\sqrt{1^2 + 1^2} = \sqrt{2}$. So
$\sin 45^\circ = \cos 45^\circ = \dfrac{1}{\sqrt{2}} = \dfrac{\sqrt{2}}{2}$ and $\tan 45^\circ = \dfrac{1}{1} = 1$.
:::

:::example{title="The 30° and 60° triangle"}
Take an equilateral triangle with sides of 2 units and cut it in half with its height. Each half has angles $30^\circ$, $60^\circ$ and $90^\circ$, a hypotenuse of 2, a short side of 1 and a height of $\sqrt{2^2 - 1^2} = \sqrt{3}$. So
$\sin 30^\circ = \dfrac{1}{2}$, $\cos 30^\circ = \dfrac{\sqrt{3}}{2}$, $\tan 30^\circ = \dfrac{1}{\sqrt{3}} = \dfrac{\sqrt{3}}{3}$, and
$\sin 60^\circ = \dfrac{\sqrt{3}}{2}$, $\cos 60^\circ = \dfrac{1}{2}$, $\tan 60^\circ = \sqrt{3}$.
:::

At $0^\circ$ the opposite side shrinks to nothing, and at $90^\circ$ the adjacent side does, which gives the values in the first and last columns below.

## The table to learn

| | $0^\circ$ | $30^\circ$ | $45^\circ$ | $60^\circ$ | $90^\circ$ |
| --- | :---: | :---: | :---: | :---: | :---: |
| $\sin$ | $0$ | $\frac{1}{2}$ | $\frac{\sqrt{2}}{2}$ | $\frac{\sqrt{3}}{2}$ | $1$ |
| $\cos$ | $1$ | $\frac{\sqrt{3}}{2}$ | $\frac{\sqrt{2}}{2}$ | $\frac{1}{2}$ | $0$ |
| $\tan$ | $0$ | $\frac{\sqrt{3}}{3}$ | $1$ | $\sqrt{3}$ | undefined |

:::keyfact{title="Patterns that help you remember"}
- The sines are $\frac{\sqrt{0}}{2}, \frac{\sqrt{1}}{2}, \frac{\sqrt{2}}{2}, \frac{\sqrt{3}}{2}, \frac{\sqrt{4}}{2}$; the cosines are the same list backwards.
- $\sin 30^\circ = \cos 60^\circ$ and $\sin 60^\circ = \cos 30^\circ$ (the two acute angles of a right-angled triangle add up to $90^\circ$).
- $\tan\theta = \dfrac{\sin\theta}{\cos\theta}$; for example $\tan 60^\circ = \dfrac{\sqrt{3}/2}{1/2} = \sqrt{3}$.
:::

## Worked examples

:::worked-solution[Example 1: evaluate $\sin^2 45^\circ + \cos 60^\circ$]
1. $\sin 45^\circ = \frac{\sqrt{2}}{2}$, so $\sin^2 45^\circ = \frac{2}{4} = \frac{1}{2}$.
2. $\cos 60^\circ = \frac{1}{2}$.
3. Total $= \frac{1}{2} + \frac{1}{2} = 1$.
:::

:::worked-solution[Example 2: exact lengths in a $30^\circ$ triangle]
A right-angled triangle has a hypotenuse of 10 cm and an angle of $30^\circ$. Find the exact lengths of the other two sides.
1. Opposite $= 10 \sin 30^\circ = 10 \times \frac{1}{2} = 5$ cm.
2. Adjacent $= 10 \cos 30^\circ = 10 \times \frac{\sqrt{3}}{2} = 5\sqrt{3}$ cm.
3. Check with Pythagoras: $5^2 + (5\sqrt{3})^2 = 25 + 75 = 100 = 10^2$.
:::

:::worked-solution[Example 3: finding angles from exact ratios]
1. If $\tan x = \sqrt{3}$ and $x$ is acute, the table gives $x = 60^\circ$.
2. If $\cos y = \frac{\sqrt{2}}{2}$ and $y$ is acute, then $y = 45^\circ$.
:::

:::worked-solution[Example 4: an exact side using tangent]
In a right-angled triangle, the side adjacent to a $60^\circ$ angle is 6 cm. Find the exact length of the side opposite it.
1. $\tan 60^\circ = \dfrac{\text{opposite}}{6}$.
2. Opposite $= 6 \tan 60^\circ = 6\sqrt{3}$ cm.
:::

:::worked-solution[Example 5: a ladder on a non-calculator paper]
A ladder leans against a vertical wall and makes an angle of $60^\circ$ with the level ground. Its foot is 2 m from the wall. Find the exact length of the ladder and the exact height it reaches.
1. The 2 m distance is adjacent to the $60^\circ$ angle and the ladder is the hypotenuse: $\cos 60^\circ = \dfrac{2}{L}$.
2. $\dfrac{1}{2} = \dfrac{2}{L}$, so $L = 4$ m.
3. The height is opposite: $h = 2\tan 60^\circ = 2\sqrt{3}$ m.
4. Check: $2^2 + (2\sqrt{3})^2 = 4 + 12 = 16 = 4^2$.
:::

## Working with surds in answers

Exact answers often contain $\sqrt{2}$ or $\sqrt{3}$. Keep them as surds and tidy them up at the end:

- Multiply the whole numbers and keep the surd: $8 \times \frac{\sqrt{3}}{2} = 4\sqrt{3}$.
- Rationalise any surd in a denominator: $\frac{6}{\sqrt{3}} = \frac{6\sqrt{3}}{3} = 2\sqrt{3}$.
- A surd squared is a whole number: $(2\sqrt{3})^2 = 4 \times 3 = 12$, which is useful for checking with Pythagoras.

If a question says "give your answer in the form $a\sqrt{3}$", any other correct form (such as $\sqrt{48}$) may not earn full marks, so simplify.

## Common mistakes

:::mistake{title="Swapping sin and cos"}
$\sin 30^\circ = \frac{1}{2}$ but $\cos 30^\circ = \frac{\sqrt{3}}{2}$. Sketch the half-equilateral triangle: the side **opposite** $30^\circ$ is the short side, 1.
:::

:::mistake{title="Squaring wrongly"}
$\sin^2 45^\circ$ means $(\sin 45^\circ)^2 = \left(\frac{\sqrt{2}}{2}\right)^2 = \frac{2}{4} = \frac{1}{2}$, not $\sin(45^2)$.
:::

:::mistake{title="Mixing up tan 30° and tan 60°"}
$\tan 30^\circ = \frac{1}{\sqrt{3}} \approx 0.577$ is less than 1, and $\tan 60^\circ = \sqrt{3} \approx 1.732$ is more than 1. Remember that $\tan 45^\circ = 1$ sits between them: tangent increases as the angle increases.
:::

:::mistake{title="Giving a decimal"}
"Exact" means no rounding. $0.866$ or $8.66$ cm will not earn the mark when $\frac{\sqrt{3}}{2}$ or $5\sqrt{3}$ cm is wanted.
:::

## Exam tips

:::exam-tip
If you forget a value, draw the two triangles (sides $1, 1, \sqrt{2}$ and $1, \sqrt{3}, 2$) in the margin. It takes less than a minute.
:::

:::exam-tip
Simplify surds and rationalise denominators unless the question says otherwise: $\frac{1}{\sqrt{3}}$ is usually written $\frac{\sqrt{3}}{3}$.
:::

:::exam-tip
On a non-calculator paper, a trigonometry question almost always uses $30^\circ$, $45^\circ$ or $60^\circ$. Look for those angles first.
:::

## Summary

:::summary
- $\sin 30^\circ = \cos 60^\circ = \frac{1}{2}$; $\sin 60^\circ = \cos 30^\circ = \frac{\sqrt{3}}{2}$; $\sin 45^\circ = \cos 45^\circ = \frac{\sqrt{2}}{2}$.
- $\tan 30^\circ = \frac{\sqrt{3}}{3}$, $\tan 45^\circ = 1$, $\tan 60^\circ = \sqrt{3}$; $\tan 90^\circ$ is undefined.
- $\sin 0^\circ = 0$, $\cos 0^\circ = 1$, $\sin 90^\circ = 1$, $\cos 90^\circ = 0$.
- Derive them from a right isosceles triangle (1, 1, $\sqrt{2}$) and half an equilateral triangle (1, $\sqrt{3}$, 2).
- Use them to give exact lengths and angles without a calculator.
:::
