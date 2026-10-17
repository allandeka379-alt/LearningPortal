---
{
  "key": "algebra.indices-variation",
  "title": "Indices and variation",
  "summary": "Use the laws of indices with zero, negative and fractional powers, solve exponential equations by matching bases or by a substitution, and form and use direct, inverse, joint and partial variation models.",
  "concepts": ["amaths.algebra.indices-variation"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Indices are the grammar of A-Level algebra. Every time you differentiate $x^{-2}$, integrate $\sqrt{x}$, or write an exponential growth model, you are using the laws of indices. Variation is the language scientists and engineers use to describe how one quantity depends on others: the cost of hiring a kombi for a trip from Harare depends partly on a fixed booking fee and partly on the distance; the load a timber beam can carry depends on its width and on the square of its depth.

This topic is in the ZIMSEC Pure Mathematics syllabus (Form 5, *Indices and proportionality*). Cambridge 9709 does not list it separately: it treats it as knowledge you bring from IGCSE or O Level, and then uses it in almost every paper. You should already be able to work with positive integer powers and to solve linear and quadratic equations.

## Key definitions

:::formula{name="Laws of indices (a > 0, m and n rational)"}
$$
a^{m} \times a^{n} = a^{m+n}, \qquad a^{m} \div a^{n} = a^{m-n}, \qquad \left(a^{m}\right)^{n} = a^{mn}
$$

$$
a^{0} = 1, \qquad a^{-n} = \frac{1}{a^{n}}, \qquad a^{\frac{1}{n}} = \sqrt[n]{a}, \qquad a^{\frac{m}{n}} = \left(\sqrt[n]{a}\right)^{m}
$$

$$
(ab)^{n} = a^{n}b^{n}, \qquad \left(\frac{a}{b}\right)^{-n} = \left(\frac{b}{a}\right)^{n}
$$

These are not printed on any formula sheet: learn them.
:::

:::definition{term="Direct variation"}
$y$ varies directly as $x$ (written $y \propto x$) when $y = kx$ for a non-zero constant $k$, the **constant of proportionality**. More generally $y \propto x^{n}$ means $y = kx^{n}$.
:::

:::definition{term="Inverse variation"}
$y$ varies inversely as $x$ when $y = \dfrac{k}{x}$; $y$ varies inversely as the square of $x$ when $y = \dfrac{k}{x^{2}}$.
:::

:::definition{term="Joint variation"}
$y$ varies jointly as $x$ and $z$ when $y = kxz$. Joint and inverse variation can combine: "$y$ varies as $x^{2}$ and inversely as $\sqrt{z}$" means $y = \dfrac{kx^{2}}{\sqrt{z}}$.
:::

:::definition{term="Partial variation"}
$y$ is partly constant and partly varies as $x$ when $y = a + kx$, with **two** constants to find. Partial variation can involve other powers, for example $y = ax + bx^{2}$.
:::

## Working with fractional and negative indices

A fractional index has two jobs: the **denominator is a root** and the **numerator is a power**. Take the root first, because it keeps the numbers small: $27^{\frac{2}{3}} = \left(\sqrt[3]{27}\right)^{2} = 3^{2} = 9$.

A negative index means "one over": $9^{-\frac{1}{2}} = \dfrac{1}{9^{\frac{1}{2}}} = \dfrac{1}{3}$. A negative index never makes the answer negative.

:::worked-solution[Example 1: evaluate $\dfrac{27^{\frac{2}{3}} \times 9^{-\frac{1}{2}}}{81^{-\frac{3}{4}}}$ without a calculator]
1. $27^{\frac{2}{3}} = \left(\sqrt[3]{27}\right)^{2} = 3^{2} = 9$.
2. $9^{-\frac{1}{2}} = \dfrac{1}{\sqrt{9}} = \dfrac{1}{3}$.
3. $81^{-\frac{3}{4}} = \dfrac{1}{\left(\sqrt[4]{81}\right)^{3}} = \dfrac{1}{3^{3}} = \dfrac{1}{27}$.
4. So the expression is $\dfrac{9 \times \frac{1}{3}}{\frac{1}{27}} = 3 \times 27 = 81$.
5. Check with one base: every number is a power of 3, giving $3^{2} \times 3^{-1} \div 3^{-3} = 3^{2 - 1 + 3} = 3^{4} = 81$.
:::

Step 5 shows the most reliable method: **write every number as a power of the same prime**, then add and subtract the indices.

## Equations with unknown indices

When both sides can be written as powers of the same base, equate the indices. This uses the fact that $a^{p} = a^{q}$ implies $p = q$ for $a > 0$, $a \neq 1$.

:::worked-solution[Example 2: solve $9^{x} = 27^{x - 1}$]
1. Write both sides as powers of 3: $9^{x} = \left(3^{2}\right)^{x} = 3^{2x}$ and $27^{x-1} = 3^{3(x-1)} = 3^{3x - 3}$.
2. Equate the indices: $2x = 3x - 3$.
3. So $x = 3$.
4. Check: $9^{3} = 729$ and $27^{2} = 729$.
:::

Some equations contain both $a^{2x}$ and $a^{x}$. Since $a^{2x} = \left(a^{x}\right)^{2}$, the substitution $y = a^{x}$ turns the equation into a quadratic.

:::worked-solution[Example 3: solve $2^{2x+1} - 9\left(2^{x}\right) + 4 = 0$]
1. Rewrite $2^{2x+1} = 2 \times 2^{2x} = 2\left(2^{x}\right)^{2}$.
2. Let $y = 2^{x}$: the equation becomes $2y^{2} - 9y + 4 = 0$.
3. Factorise: $(2y - 1)(y - 4) = 0$, so $y = \dfrac{1}{2}$ or $y = 4$.
4. $2^{x} = \dfrac{1}{2} = 2^{-1}$ gives $x = -1$; $2^{x} = 4 = 2^{2}$ gives $x = 2$.
5. Check $x = 2$: $2^{5} - 9(4) + 4 = 32 - 36 + 4 = 0$.
:::

Remember that $a^{x} > 0$ for every real $x$. If the quadratic gives a negative or zero value of $y$, that value has **no** solution for $x$ and must be rejected with a reason. When the values of $y$ are not exact powers of the base, you need logarithms: that is covered in the lesson on the laws of logarithms.

## Variation

Every variation problem follows the same three steps:

1. Write the statement as an equation with a constant ($y = kx^{2}$, $y = a + kx$ …).
2. Substitute the given data to find the constant or constants.
3. Use the completed equation to answer the question.

:::worked-solution[Example 4: partial variation for a kombi hire]
The charge $C$ (US dollars) for hiring a kombi is partly constant and partly varies as the distance $d$ km. A 60 km trip costs US\$45 and a 130 km trip costs US\$73. Find the charge for a 200 km trip.

1. Model: $C = a + kd$.
2. Data: $45 = a + 60k$ and $73 = a + 130k$.
3. Subtract: $28 = 70k$, so $k = 0.4$.
4. Then $a = 45 - 60(0.4) = 21$, so $C = 21 + 0.4d$.
5. For $d = 200$: $C = 21 + 80 = 101$, so the trip costs US\$101.
:::

![Partial variation C = 21 + 0.4d for a kombi hire: a straight line with intercept 21 (the fixed charge) and gradient 0.4 US dollars per km through (60, 45) and (130, 73); a 200 km trip costs US\$101.](media:diagrams/partial-variation-kombi-hire.png "Figure: partial variation is a straight line: the intercept 21 is the fixed part, the gradient 0.4 the part that varies with distance")

The constant $a = 21$ has a meaning: a fixed booking charge of US\$21, with US\$0.40 for each kilometre. Interpreting the constants is often asked.

:::worked-solution[Example 5: joint variation and a "show that"]
$y$ varies directly as $x^{2}$ and inversely as $\sqrt{z}$. When $x = 2$ and $z = 9$, $y = 12$.

(a) Find $y$ when $x = 3$ and $z = 16$.

(b) Show that if $x$ is increased by 20% and $z$ by 44%, then $y$ increases by 20%.

1. Model: $y = \dfrac{kx^{2}}{\sqrt{z}}$.
2. Data: $12 = \dfrac{k \times 4}{3}$, so $k = 9$ and $y = \dfrac{9x^{2}}{\sqrt{z}}$.
3. (a) $y = \dfrac{9 \times 9}{\sqrt{16}} = \dfrac{81}{4} = 20.25$.
4. (b) The new values are $1.2x$ and $1.44z$, so the new $y$ is $\dfrac{9(1.2x)^{2}}{\sqrt{1.44z}} = \dfrac{1.44}{1.2} \times \dfrac{9x^{2}}{\sqrt{z}}$.
5. $\dfrac{1.44}{1.2} = 1.2$, so the new $y$ is $1.2$ times the old $y$: an increase of 20%, as required.
:::

Part (b) shows a useful idea: percentage changes in a variation model multiply. You never need the value of $k$ for a question about percentage change.

## Common mistakes

:::mistake{title="Treating a negative index as a negative number"}
$4^{-2} = \dfrac{1}{16}$, not $-16$ and not $-8$. The minus sign in an index means a reciprocal.
:::

:::mistake{title="Applying the root to only part of a product"}
$\left(16x^{4}\right)^{\frac{1}{2}} = 4x^{2}$: the index applies to **every** factor in the bracket. But $\left(9 + 16\right)^{\frac{1}{2}} = 5$, not $3 + 4$: indices do not distribute over a sum.
:::

:::mistake{title="Adding bases instead of indices"}
$2^{3} \times 2^{4} = 2^{7}$, not $4^{7}$. The base stays the same; only the indices add. And $2^{3} \times 3^{4}$ cannot be combined at all.
:::

:::mistake{title="Keeping an impossible root"}
If $y = 2^{x}$ and the quadratic gives $y = -3$, there is no real $x$. Write "$2^{x} = -3$ has no solution since $2^{x} > 0$" rather than simply ignoring it.
:::

:::mistake{title="Using one constant for partial variation"}
"Partly constant and partly varies as $x$" needs $y = a + kx$ with two unknowns, so you need two pieces of data. Writing $y = kx$ gives a wrong model.
:::

## Exam tips

:::exam-tip
"Without using a calculator" or "find the exact value" means every step must be shown: write each number as a power of a prime, then combine the indices.
:::

:::exam-tip
In a substitution question, state the substitution ($\text{let } y = 3^{x}$) and write the quadratic in $y$. Examiners give method marks for the correct quadratic even if a later step slips.
:::

:::exam-tip
In variation questions, write the equation with $k$ first. Most marks are lost by writing $y = kx$ when the question says "as the square of $x$" or "inversely as".
:::

:::exam-tip
When asked to "interpret" a constant in a model, give its meaning in context with units (a fixed charge in US dollars, a rate per kilometre).
:::

## Summary

:::summary
- $a^{0} = 1$, $a^{-n} = \frac{1}{a^{n}}$, $a^{\frac{m}{n}} = \left(\sqrt[n]{a}\right)^{m}$; take the root first.
- To simplify or solve, write every number as a power of the same prime and work with the indices.
- Equations with $a^{2x}$ and $a^{x}$ become quadratics with $y = a^{x}$; reject values of $y \leq 0$.
- Direct: $y = kx^{n}$; inverse: $y = \frac{k}{x^{n}}$; joint: $y = kxz$; partial: $y = a + kx$ (two constants).
- Find the constants from data, then use the model; percentage changes multiply through the model.
:::
