---
{
  "key": "series.standard-sums-differences",
  "title": "Standard sums and the method of differences",
  "summary": "Use the standard results for Σr, Σr² and Σr³ to find related sums such as Σr(r + 1) and sums from r = n + 1 to 2n, and sum series by the method of differences (often after partial fractions), including sums to infinity.",
  "concepts": ["amaths.series.standard-sums-differences"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Adding the first 100 whole numbers by hand is slow; the formula $\frac{n(n + 1)}{2}$ gives 5050 at once. In this lesson you extend that idea to sums of squares and cubes, and you learn a second, very different technique: the **method of differences**, in which almost every term of a series cancels, leaving only a few at the start and the end. Both ideas reappear in proof by induction, where you prove the formulas you use here.

This is ZIMSEC Pure Mathematics (series, Form 6). Questions ask you to find $\sum r(r + 1)$ or $\sum (2r - 1)^2$ in a simplified factorised form, to evaluate sums between two limits, and to sum fractions such as $\frac{1}{r(r + 2)}$ by partial fractions and differences, including the sum to infinity.

## Key definitions

:::definition{term="Standard results"}
The closed forms for $\sum_{r=1}^{n} r$, $\sum_{r=1}^{n} r^2$ and $\sum_{r=1}^{n} r^3$, used as building blocks for other sums.
:::

:::definition{term="Method of differences"}
If each term can be written as $u_r = f(r) - f(r + 1)$, then in $\sum_{r=1}^{n} u_r$ the inner terms cancel in pairs (the sum "telescopes"), leaving $f(1) - f(n + 1)$.
:::

:::formula{name="Standard sums (learn them; ZIMSEC prints no list)"}
$$
\sum_{r=1}^{n} r = \frac{n(n + 1)}{2} \qquad \sum_{r=1}^{n} r^2 = \frac{n(n + 1)(2n + 1)}{6} \qquad \sum_{r=1}^{n} r^3 = \frac{n^2(n + 1)^2}{4}
$$
:::

Notice that $\sum r^3 = \left(\sum r\right)^2$, and that $\sum_{r=1}^{n} 1 = n$ (adding 1 to itself $n$ times).

## Building other sums

Sigma is **linear**: $\sum (a f(r) + b g(r)) = a\sum f(r) + b\sum g(r)$. Expand the general term, split the sum, substitute the standard results, and factorise. Look for common factors such as $n(n + 1)$ early; they make the algebra much shorter.

:::worked-solution[Example 1: show that $\displaystyle\sum_{r=1}^{n} r(r + 1) = \frac{n(n + 1)(n + 2)}{3}$, and evaluate it for $n = 10$]
1. $\sum r(r + 1) = \sum r^2 + \sum r = \dfrac{n(n + 1)(2n + 1)}{6} + \dfrac{n(n + 1)}{2}$.
2. Take out $\dfrac{n(n + 1)}{6}$: $\dfrac{n(n + 1)}{6}\left[(2n + 1) + 3\right] = \dfrac{n(n + 1)(2n + 4)}{6}$.
3. $= \dfrac{n(n + 1)(n + 2)}{3}$.
4. For $n = 10$: $\dfrac{10 \times 11 \times 12}{3} = 440$.
:::

## Sums that do not start at 1

A sum from $r = m$ to $n$ is the sum to $n$ minus the sum to $m - 1$:

$$
\sum_{r=m}^{n} f(r) = \sum_{r=1}^{n} f(r) - \sum_{r=1}^{m-1} f(r)
$$

:::worked-solution[Example 2: evaluate $\displaystyle\sum_{r=11}^{20} r^2$]
1. $\sum_{r=1}^{20} r^2 = \dfrac{20 \times 21 \times 41}{6} = 2870$.
2. $\sum_{r=1}^{10} r^2 = \dfrac{10 \times 11 \times 21}{6} = 385$.
3. $\sum_{r=11}^{20} r^2 = 2870 - 385 = 2485$.
:::

The same idea works with algebraic limits: $\sum_{r=n+1}^{2n} r = \frac{2n(2n + 1)}{2} - \frac{n(n + 1)}{2} = \frac{n(3n + 1)}{2}$.

:::worked-solution[Example 3: show that $\displaystyle\sum_{r=1}^{n}(2r - 1)^2 = \frac{n(2n - 1)(2n + 1)}{3}$]
1. Expand: $(2r - 1)^2 = 4r^2 - 4r + 1$.
2. $\sum = 4 \cdot \dfrac{n(n + 1)(2n + 1)}{6} - 4 \cdot \dfrac{n(n + 1)}{2} + n$.
3. $= \dfrac{2n(n + 1)(2n + 1)}{3} - 2n(n + 1) + n = \dfrac{n}{3}\left[2(n + 1)(2n + 1) - 6(n + 1) + 3\right]$.
4. The bracket is $4n^2 + 6n + 2 - 6n - 6 + 3 = 4n^2 - 1 = (2n - 1)(2n + 1)$.
5. So the sum is $\dfrac{n(2n - 1)(2n + 1)}{3}$. Check $n = 2$: $1 + 9 = 10 = \dfrac{2 \times 3 \times 5}{3}$. ✓
:::

## The method of differences

When the general term is a fraction with a product of linear factors underneath, split it into partial fractions. The result is usually of the form $f(r) - f(r + k)$. Write out the first few and last few terms in rows; the cancelling pattern becomes obvious.

:::worked-solution[Example 4: find $\displaystyle\sum_{r=1}^{n} \frac{1}{r(r + 1)}$ and its sum to infinity]
1. Partial fractions: $\dfrac{1}{r(r + 1)} = \dfrac{1}{r} - \dfrac{1}{r + 1}$.
2. Write out the terms: $\left(1 - \tfrac{1}{2}\right) + \left(\tfrac{1}{2} - \tfrac{1}{3}\right) + \left(\tfrac{1}{3} - \tfrac{1}{4}\right) + \cdots + \left(\tfrac{1}{n} - \tfrac{1}{n + 1}\right)$.
3. Every term except the first and the last cancels: the sum is $1 - \dfrac{1}{n + 1} = \dfrac{n}{n + 1}$.
4. As $n \to \infty$, $\dfrac{1}{n + 1} \to 0$, so the series converges with sum to infinity $1$.
:::

When the gap is 2, as in $\frac{1}{r} - \frac{1}{r + 2}$, **two** terms survive at each end.

:::worked-solution[Example 5: find $\displaystyle\sum_{r=1}^{n} \frac{1}{r(r + 2)}$ and the sum to infinity]
1. $\dfrac{1}{r(r + 2)} = \dfrac{1}{2}\left(\dfrac{1}{r} - \dfrac{1}{r + 2}\right)$.
2. Terms: $\tfrac{1}{2}\left[\left(1 - \tfrac{1}{3}\right) + \left(\tfrac{1}{2} - \tfrac{1}{4}\right) + \left(\tfrac{1}{3} - \tfrac{1}{5}\right) + \cdots + \left(\tfrac{1}{n - 1} - \tfrac{1}{n + 1}\right) + \left(\tfrac{1}{n} - \tfrac{1}{n + 2}\right)\right]$.
3. Surviving: $1$ and $\tfrac{1}{2}$ at the start, $-\tfrac{1}{n + 1}$ and $-\tfrac{1}{n + 2}$ at the end.
4. Sum $= \dfrac{1}{2}\left(\dfrac{3}{2} - \dfrac{1}{n + 1} - \dfrac{1}{n + 2}\right)$.
5. Sum to infinity $= \dfrac{1}{2} \times \dfrac{3}{2} = \dfrac{3}{4}$.
:::

## Checking your answers

Always test a formula for a small $n$: substitute $n = 1$ (and $n = 2$) into your result and compare with the first one or two terms added directly. This catches almost every algebra slip. For the method of differences, also check that the number of surviving terms at each end equals the gap between the arguments.

## Common mistakes

:::mistake{title="Forgetting the constant term"}
$\sum_{r=1}^{n} 1 = n$, not 1. In $\sum(4r^2 - 4r + 1)$ the last part contributes $n$.
:::

:::mistake{title="Wrong lower limit when subtracting"}
$\sum_{r=11}^{20} = \sum_{r=1}^{20} - \sum_{r=1}^{10}$: subtract the sum up to $m - 1 = 10$, not up to 11.
:::

:::mistake{title="Cancelling too much in differences"}
With $\frac{1}{r} - \frac{1}{r + 2}$, two terms remain at each end. Write out enough rows to see them.
:::

:::mistake{title="Not simplifying fully"}
"Show that" results are usually factorised; take out common factors such as $\frac{n(n + 1)}{6}$ before expanding.
:::

## Exam tips

:::exam-tip
Quote the standard results you use; then factorise step by step towards the printed answer.
:::

:::exam-tip
In method-of-differences questions, show at least the first three and the last two rows of the cancellation.
:::

:::exam-tip
For a sum to infinity, say what happens to each remaining term as $n \to \infty$ (e.g. "$\frac{1}{n + 1} \to 0$").
:::

## Summary

:::summary
- $\sum r = \frac{n(n + 1)}{2}$, $\sum r^2 = \frac{n(n + 1)(2n + 1)}{6}$, $\sum r^3 = \frac{n^2(n + 1)^2}{4}$, $\sum 1 = n$.
- Split sums by linearity, substitute the standard results and factorise.
- $\sum_{r=m}^{n} = \sum_{r=1}^{n} - \sum_{r=1}^{m-1}$.
- Method of differences: write $u_r = f(r) - f(r + k)$, cancel, and keep $k$ terms at each end.
- Sum to infinity: let $n \to \infty$ in the remaining terms.
:::
