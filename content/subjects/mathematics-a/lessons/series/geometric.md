---
{
  "key": "series.geometric",
  "title": "Geometric progressions and the sum to infinity",
  "summary": "Find the nth term and the sum of a geometric progression, use b² = ac for three terms in geometric progression, find the sum to infinity when |r| < 1, and solve problems that combine an arithmetic and a geometric progression or model growth and decay.",
  "concepts": ["amaths.series.geometric"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

When a quantity grows or shrinks by the same **percentage** each period, its values form a geometric progression: money in a savings account earning compound interest, the value of a tractor losing 15% each year, the height of a ball bouncing to 60% of its previous height. Geometric series also give one of the most surprising results at this level: some infinite sums have a finite total.

This lesson covers ZIMSEC Pure Mathematics (sequences and series, Form 5) and Cambridge 9709 Paper 1 (topic 1.6). Exam questions combine geometric progressions with arithmetic ones, use logarithms to find how many terms are needed, and ask when a sum to infinity exists.

## Key definitions

:::definition{term="Geometric progression (GP)"}
A sequence in which each term is the previous term multiplied by a constant **common ratio** $r$ ($r \neq 0$). The first term is $a$.
:::

:::definition{term="Convergent series"}
An infinite series whose partial sums $S_n$ approach a finite limit, the **sum to infinity** $S_\infty$, as $n \to \infty$.
:::

:::formula{name="Geometric progression (in MF19)"}
$$
u_n = ar^{n-1} \qquad S_n = \frac{a(1 - r^n)}{1 - r} \quad (r \neq 1) \qquad S_\infty = \frac{a}{1 - r} \quad (|r| < 1)
$$
:::

For $r > 1$ the equivalent form $S_n = \dfrac{a(r^n - 1)}{r - 1}$ avoids negative signs.

## Terms and sums

Find $r$ by dividing any term by the one before it. When two terms are given, divide one equation by the other to eliminate $a$.

:::worked-solution[Example 1: for the GP $3, 6, 12, \ldots$ find the 10th term and the sum of the first 10 terms]
1. $a = 3$, $r = \frac{6}{3} = 2$.
2. $u_{10} = 3 \times 2^9 = 1536$.
3. $S_{10} = \dfrac{3(2^{10} - 1)}{2 - 1} = 3 \times 1023 = 3069$.
:::

:::worked-solution[Example 2: the 3rd term of a GP is 18 and the 6th term is $-486$. Find $a$ and $r$]
1. $ar^2 = 18$ and $ar^5 = -486$.
2. Divide: $r^3 = \dfrac{-486}{18} = -27$, so $r = -3$.
3. $a = \dfrac{18}{(-3)^2} = 2$. The GP is $2, -6, 18, -54, 162, -486, \ldots$
:::

A negative ratio makes the signs alternate. When $r^2$ (rather than $r^3$) is found, both square roots may be possible: use any extra condition in the question ("all terms positive") to choose.

## Three terms in geometric progression

$a$, $b$, $c$ are consecutive terms of a GP when $\dfrac{b}{a} = \dfrac{c}{b}$, that is

$$
b^2 = ac
$$

:::worked-solution[Example 3: $k$, $k + 6$ and $4k$ are consecutive terms of a GP. Find the possible values of $k$]
1. $(k + 6)^2 = k \times 4k$.
2. Take square roots of both sides: $k + 6 = \pm 2k$.
3. $k + 6 = 2k$ gives $k = 6$: terms $6, 12, 24$ with $r = 2$.
4. $k + 6 = -2k$ gives $k = -2$: terms $-2, 4, -8$ with $r = -2$.
:::

## The sum to infinity

If $|r| < 1$, then $r^n \to 0$ as $n \to \infty$, so $S_n = \dfrac{a(1 - r^n)}{1 - r} \to \dfrac{a}{1 - r}$. If $|r| \ge 1$ the terms do not shrink to zero and the series has no sum to infinity. The condition $|r| < 1$ must be checked (and often stated) every time.

:::worked-solution[Example 4: find the sum to infinity of $48 + 36 + 27 + \cdots$, and the least number of terms whose sum exceeds 190]
1. $r = \frac{36}{48} = \frac{3}{4}$, and $|r| < 1$, so $S_\infty = \dfrac{48}{1 - \frac{3}{4}} = 192$.
2. $S_n = 192\left(1 - 0.75^n\right) > 190$ gives $0.75^n < \frac{2}{192} = \frac{1}{96}$.
3. Take logarithms: $n\ln 0.75 < \ln\frac{1}{96}$. Dividing by $\ln 0.75$, which is **negative**, reverses the inequality: $n > \dfrac{\ln(1/96)}{\ln 0.75} = 15.87$.
4. The least number of terms is 16.
:::

## Arithmetic and geometric progressions together

A favourite exam question links the two kinds of progression: some terms of an AP are also terms of a GP. Write each term in terms of $a$ and $d$, apply $b^2 = ac$, and simplify, using $d \neq 0$ to cancel.

:::worked-solution[Example 5: the 1st, 2nd and 5th terms of an AP with first term $a$ and common difference $d \neq 0$ are the first three terms of a GP. Show that $d = 2a$, find the common ratio, and write down the GP when $a = 4$]
1. The terms are $a$, $a + d$, $a + 4d$, so $(a + d)^2 = a(a + 4d)$.
2. $a^2 + 2ad + d^2 = a^2 + 4ad$, so $d^2 = 2ad$.
3. Since $d \neq 0$, divide by $d$: $d = 2a$.
4. Common ratio $r = \dfrac{a + d}{a} = \dfrac{3a}{a} = 3$.
5. With $a = 4$, $d = 8$: the AP is $4, 12, 20, 28, 36, \ldots$ and the GP is $4, 12, 36, \ldots$
:::

## Growth, decay and repeated motion

Percentage growth of $p\%$ per period multiplies by $1 + \frac{p}{100}$; percentage decay multiplies by $1 - \frac{p}{100}$. The total over many periods is a geometric sum.

:::worked-solution[Example 6: a ball is dropped from a height of 10 m and each bounce reaches 60% of the previous height. Find the total distance it travels before coming to rest]
1. The first fall is 10 m.
2. After that, each bounce goes up and comes down the same distance: $6, 3.6, 2.16, \ldots$ metres, each counted twice.
3. The heights $6 + 3.6 + 2.16 + \cdots$ form a GP with $a = 6$, $r = 0.6$: sum $\dfrac{6}{1 - 0.6} = 15$.
4. Total distance $= 10 + 2 \times 15 = 40$ m.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine geometric progressions, the sum to infinity and combined AP/GP questions in the same way (Cambridge Paper 1, topic 1.6). MF19 prints $u_n$, $S_n$ and $S_\infty$ for Cambridge; ZIMSEC candidates must learn them.
:::

## Common mistakes

:::mistake{title="Using r^n in the nth term"}
$u_n = ar^{n-1}$: the 10th term of $3, 6, 12, \ldots$ is $3 \times 2^9$, not $3 \times 2^{10}$.
:::

:::mistake{title="Sum to infinity when |r| ≥ 1"}
$2 + 4 + 8 + \cdots$ has no sum to infinity. The formula $\frac{a}{1 - r}$ would give $-2$, which is nonsense.
:::

:::mistake{title="Not reversing the inequality"}
Dividing by $\ln 0.75$ (negative) reverses the inequality sign. Check the final $n$ by substitution.
:::

:::mistake{title="Losing a negative ratio"}
$r^2 = 9$ gives $r = 3$ **or** $r = -3$; consider both unless the question rules one out.
:::

## Exam tips

:::exam-tip
When a sum to infinity is used, write "$|r| < 1$, so $S_\infty$ exists". Some mark schemes award a mark for it.
:::

:::exam-tip
For "least $n$" questions, give the inequality, the logarithm step and the conclusion; then check $n - 1$ and $n$.
:::

:::exam-tip
In AP/GP questions, keep $a$ and $d$ as letters until the end; state "$d \neq 0$" when you divide by $d$.
:::

## Summary

:::summary
- GP: $u_n = ar^{n-1}$, $S_n = \frac{a(1 - r^n)}{1 - r}$ ($r \neq 1$).
- $a, b, c$ in GP $\iff b^2 = ac$.
- $S_\infty = \frac{a}{1 - r}$ exists only when $|r| < 1$.
- Use logarithms to find $n$; dividing by the log of a number below 1 reverses the inequality.
- AP/GP problems: express terms in $a$ and $d$, use $b^2 = ac$, cancel $d \neq 0$.
:::
