---
{
  "key": "indices.surds",
  "title": "Surds and exact answers",
  "summary": "Simplify surds, add, multiply and divide them, expand brackets containing surds and rationalise denominators of the forms a√b and a ± √b to give exact answers in simplest surd form.",
  "concepts": ["amath.indices.surds"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

When Tendai measures the diagonal of a square plot of land with sides of 10 m near Gweru, Pythagoras gives $\sqrt{200}$ m. A calculator shows $14.142135\ldots$ and the decimals never end or repeat. Any rounded value is slightly wrong; the **exact** value is $10\sqrt{2}$ m.

Examiners ask for exact answers all the time: "give your answer in the form $a + b\sqrt{3}$", "find the exact length", "rationalise the denominator". In ZIMSEC Additional Mathematics surds are tested in their own right. In Cambridge 0606 they are assumed knowledge, but exact answers in surd form appear on the non-calculator Paper 1 in quadratics, trigonometry, coordinate geometry and calculus.

You should already know square numbers up to $15^{2}$, the laws of indices and how to expand two brackets.

## Key definitions

:::definition{term="Rational number"}
A number that can be written as $\dfrac{p}{q}$ with $p$ and $q$ integers and $q \neq 0$, for example $3$, $-\frac{2}{7}$, $0.25$ and $0.\dot{3}$.
:::

:::definition{term="Irrational number"}
A real number that cannot be written as a fraction of two integers. Its decimal never ends and never repeats, for example $\sqrt{2}$, $\sqrt{7}$ and $\pi$.
:::

:::definition{term="Surd"}
A root of a positive integer that is irrational, such as $\sqrt{5}$ or $3\sqrt{2}$. $\sqrt{9} = 3$ is not a surd.
:::

:::formula{name="Rules for surds (a, b > 0)"}
$$
\sqrt{ab} = \sqrt{a} \times \sqrt{b} \qquad \sqrt{\frac{a}{b}} = \frac{\sqrt{a}}{\sqrt{b}} \qquad \sqrt{a} \times \sqrt{a} = a
$$

But $\sqrt{a + b} \neq \sqrt{a} + \sqrt{b}$. These rules are not in a formula list.
:::

## Simplifying a surd

To simplify $\sqrt{n}$, split $n$ into a product with the **largest square factor**:

$$
\sqrt{72} = \sqrt{36 \times 2} = \sqrt{36} \times \sqrt{2} = 6\sqrt{2}
$$

A surd is in **simplest form** when the number under the root has no square factor other than 1. If you choose a square factor that is too small ($\sqrt{72} = \sqrt{4 \times 18} = 2\sqrt{18}$), keep going: $2\sqrt{18} = 2 \times 3\sqrt{2} = 6\sqrt{2}$.

## Adding and subtracting surds

Surds behave like algebraic terms: you can only collect **like surds**, the same way $3x + 5x = 8x$. So $3\sqrt{2} + 5\sqrt{2} = 8\sqrt{2}$, but $\sqrt{2} + \sqrt{3}$ cannot be simplified. Simplify each surd first; unlike surds often become like surds.

:::worked-solution[Example 1: simplify $\sqrt{72} + \sqrt{50} - 2\sqrt{18}$]
1. $\sqrt{72} = \sqrt{36 \times 2} = 6\sqrt{2}$.
2. $\sqrt{50} = \sqrt{25 \times 2} = 5\sqrt{2}$.
3. $2\sqrt{18} = 2\sqrt{9 \times 2} = 2 \times 3\sqrt{2} = 6\sqrt{2}$.
4. Collect: $6\sqrt{2} + 5\sqrt{2} - 6\sqrt{2} = 5\sqrt{2}$.
:::

## Multiplying and expanding brackets

Multiply the whole numbers together and the surds together: $2\sqrt{3} \times 5\sqrt{6} = 10\sqrt{18} = 10 \times 3\sqrt{2} = 30\sqrt{2}$. Expand brackets exactly as in algebra, remembering that $\sqrt{a} \times \sqrt{a} = a$.

:::worked-solution[Example 2: expand $\left(3 + 2\sqrt{5}\right)\left(4 - \sqrt{5}\right)$]
1. $3 \times 4 = 12$.
2. $3 \times \left(-\sqrt{5}\right) = -3\sqrt{5}$.
3. $2\sqrt{5} \times 4 = 8\sqrt{5}$.
4. $2\sqrt{5} \times \left(-\sqrt{5}\right) = -2 \times 5 = -10$.
5. Total: $12 - 10 + (-3 + 8)\sqrt{5} = 2 + 5\sqrt{5}$.
:::

A special product is $\left(a + \sqrt{b}\right)\left(a - \sqrt{b}\right) = a^{2} - b$. The surd terms cancel and the answer is **rational**. The two brackets are called **conjugates**, and they are the key to rationalising.

## Rationalising the denominator

An answer such as $\dfrac{6}{\sqrt{3}}$ is not in simplest form: the convention is to have no surd in the denominator.

**Denominator $a\sqrt{b}$.** Multiply top and bottom by $\sqrt{b}$:

$$
\frac{6}{\sqrt{3}} = \frac{6 \times \sqrt{3}}{\sqrt{3} \times \sqrt{3}} = \frac{6\sqrt{3}}{3} = 2\sqrt{3}
$$

**Denominator $a \pm \sqrt{b}$.** Multiply top and bottom by the **conjugate** $a \mp \sqrt{b}$, which makes the denominator $a^{2} - b$.

:::worked-solution[Example 3: rationalise $\dfrac{14}{3 - \sqrt{2}}$]
1. The conjugate of $3 - \sqrt{2}$ is $3 + \sqrt{2}$.
2. Denominator: $\left(3 - \sqrt{2}\right)\left(3 + \sqrt{2}\right) = 9 - 2 = 7$.
3. Numerator: $14\left(3 + \sqrt{2}\right) = 42 + 14\sqrt{2}$.
4. So $\dfrac{14}{3 - \sqrt{2}} = \dfrac{42 + 14\sqrt{2}}{7} = 6 + 2\sqrt{2}$.
:::

:::worked-solution[Example 4: write $\dfrac{1 + \sqrt{3}}{2 - \sqrt{3}}$ in the form $a + b\sqrt{3}$]
1. Multiply top and bottom by $2 + \sqrt{3}$.
2. Denominator: $4 - 3 = 1$.
3. Numerator: $\left(1 + \sqrt{3}\right)\left(2 + \sqrt{3}\right) = 2 + \sqrt{3} + 2\sqrt{3} + 3 = 5 + 3\sqrt{3}$.
4. So the expression equals $5 + 3\sqrt{3}$: $a = 5$, $b = 3$.
:::

## Surds in exam-style problems

Surds appear inside longer questions, often with a "show that".

:::worked-solution[Example 5: a rectangle has sides $\left(2 + \sqrt{3}\right)$ cm and $\left(4 - \sqrt{3}\right)$ cm. Show that its area is $\left(5 + 2\sqrt{3}\right)$ cm² and find the exact square of the length of a diagonal]
1. Area $= \left(2 + \sqrt{3}\right)\left(4 - \sqrt{3}\right) = 8 - 2\sqrt{3} + 4\sqrt{3} - 3$.
2. $= 5 + 2\sqrt{3}$ cm², as required.
3. By Pythagoras, diagonal² $= \left(2 + \sqrt{3}\right)^{2} + \left(4 - \sqrt{3}\right)^{2}$.
4. $\left(2 + \sqrt{3}\right)^{2} = 4 + 4\sqrt{3} + 3 = 7 + 4\sqrt{3}$.
5. $\left(4 - \sqrt{3}\right)^{2} = 16 - 8\sqrt{3} + 3 = 19 - 8\sqrt{3}$.
6. Diagonal² $= 26 - 4\sqrt{3}$ cm².
:::

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC sets surd questions directly (simplify, rationalise, expand). Cambridge 0606 does not list surds as a topic, but expects answers such as $\frac{3 + \sqrt{5}}{2}$ or $4\sqrt{3}$ whenever a question says "exact", especially on the non-calculator Paper 1.
:::

## Common mistakes

:::mistake{title="Splitting a root over a sum"}
$\sqrt{9 + 16} = \sqrt{25} = 5$, but $\sqrt{9} + \sqrt{16} = 7$. The root of a sum is **not** the sum of the roots.
:::

:::mistake{title="Not using the largest square factor"}
$\sqrt{48} = 2\sqrt{12}$ is correct but not simplest; $\sqrt{48} = 4\sqrt{3}$. Check that the number under the root has no square factor left.
:::

:::mistake{title="Forgetting to multiply the numerator"}
When rationalising, multiply the **whole** numerator by the conjugate, not just one term, and expand it fully.
:::

:::mistake{title="Squaring a bracket term by term"}
$\left(2 + \sqrt{3}\right)^{2} \neq 4 + 3$. Expand it: $4 + 4\sqrt{3} + 3 = 7 + 4\sqrt{3}$.
:::

## Exam tips

:::exam-tip
"**Exact**" or "**in surd form**" means no decimals at all. A correct decimal answer to a question that asks for an exact value earns no accuracy mark.
:::

:::exam-tip
When the answer must be in the form $a + b\sqrt{c}$, finish by stating $a$ and $b$ (and $c$) clearly. Check by calculator, where allowed, that your surd and the original expression give the same decimal.
:::

:::exam-tip
In a "**show that**" question, write every line of the expansion. The final line must match the given result exactly.
:::

## Summary

:::summary
- Simplify $\sqrt{n}$ using its largest square factor: $\sqrt{72} = 6\sqrt{2}$.
- Only like surds can be added or subtracted; simplify each surd first.
- $\sqrt{a} \times \sqrt{b} = \sqrt{ab}$ and $\sqrt{a} \times \sqrt{a} = a$; expand brackets as in algebra.
- Rationalise $\dfrac{k}{\sqrt{b}}$ by multiplying by $\sqrt{b}$, and $\dfrac{k}{a \pm \sqrt{b}}$ by the conjugate $a \mp \sqrt{b}$.
- $\left(a + \sqrt{b}\right)\left(a - \sqrt{b}\right) = a^{2} - b$ is rational.
:::
