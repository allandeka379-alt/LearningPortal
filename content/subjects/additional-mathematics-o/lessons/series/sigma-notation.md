---
{
  "key": "series.sigma-notation",
  "title": "Series and sigma notation",
  "summary": "Understand a series as the sum of the terms of a sequence, read and write sums in sigma (Σ) notation, count the terms, evaluate finite sums by listing or with the arithmetic and geometric series formulas, and use the properties Σ(aᵣ + bᵣ) = Σaᵣ + Σbᵣ, Σ kaᵣ = kΣaᵣ and Σ c = nc.",
  "concepts": ["amath.series.sigma-notation"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

A **sequence** is a list of terms; a **series** is what you get when you add them up. If a farmer near Marondera plants 40 more tomato seedlings each week than the week before, the sequence gives the number planted in each week and the series gives the **total** planted so far. Writing out long sums such as $4 + 7 + 10 + \cdots + 61$ is slow, so mathematicians use a compact notation built on the Greek capital letter sigma, $\Sigma$, meaning "sum".

ZIMSEC asks you to define sigma notation and use it to solve problems involving series. The notation reappears in arithmetic and geometric progressions and later in statistics (for example $\Sigma fx$), so it is worth becoming fluent now.

## Key definitions

:::definition{term="Series"}
The sum of the terms of a sequence. A **finite series** has a last term, such as $u_1 + u_2 + \cdots + u_n$; the sum of its first $n$ terms is written $S_n$.
:::

:::definition{term="Sigma notation"}
$\displaystyle\sum_{r=a}^{b} f(r)$ means: substitute $r = a$, $r = a + 1$, …, $r = b$ into $f(r)$ and add the results. The letter $r$ is the **index** (any letter may be used); $a$ and $b$ are the lower and upper **limits**.
:::

:::formula{name="Number of terms and basic properties (not printed by ZIMSEC)"}
$$
\sum_{r=a}^{b} f(r) \text{ has } b - a + 1 \text{ terms}
$$

$$
\sum_{r=1}^{n} \left(a_r + b_r\right) = \sum_{r=1}^{n} a_r + \sum_{r=1}^{n} b_r, \qquad \sum_{r=1}^{n} k\,a_r = k\sum_{r=1}^{n} a_r, \qquad \sum_{r=1}^{n} c = nc
$$

$$
\sum_{r=1}^{n} r = \frac{n(n + 1)}{2}
$$
:::

## Reading sigma notation

:::worked-solution[Example 1: write out and evaluate $\displaystyle\sum_{r=1}^{5} (3r - 1)$]
1. $r = 1$: $2$; $r = 2$: $5$; $r = 3$: $8$; $r = 4$: $11$; $r = 5$: $14$.
2. Sum: $2 + 5 + 8 + 11 + 14 = 40$.
:::

The lower limit need not be 1. For example $\displaystyle\sum_{r=0}^{4} 2^r = 1 + 2 + 4 + 8 + 16 = 31$: five terms, since $4 - 0 + 1 = 5$. Watch out for a factor such as $(-1)^r$, which makes the signs alternate: $\displaystyle\sum_{r=1}^{4} (-1)^r r = -1 + 2 - 3 + 4 = 2$.

## Writing a series in sigma notation

1. Find a formula for the general term in terms of $r$ (for terms going up by a constant amount it is linear, for terms multiplied by a constant ratio it involves a power).
2. Choose the limits: substitute the first and last terms to find the values of $r$.

:::worked-solution[Example 2: write $4 + 7 + 10 + \cdots + 61$ in sigma notation and find its value]
1. The terms increase by 3, starting at 4: the general term is $3r + 1$ (check: $r = 1$ gives 4).
2. Last term: $3r + 1 = 61$ gives $r = 20$.
3. So the series is $\displaystyle\sum_{r=1}^{20} (3r + 1)$, with 20 terms.
4. Value: it is an arithmetic series, so the sum is $\frac{20}{2}(4 + 61) = 10 \times 65 = 650$.
:::

:::worked-solution[Example 3: write $\dfrac{1}{2} - \dfrac{1}{4} + \dfrac{1}{8} - \dfrac{1}{16} + \dfrac{1}{32} - \dfrac{1}{64}$ in sigma notation and evaluate it]
1. The sizes are $\left(\frac{1}{2}\right)^r$ for $r = 1, \ldots, 6$; the signs alternate, starting positive, so include $(-1)^{r+1}$.
2. The series is $\displaystyle\sum_{r=1}^{6} (-1)^{r+1}\left(\frac{1}{2}\right)^r$.
3. It is geometric with first term $\frac{1}{2}$ and common ratio $-\frac{1}{2}$. Using $S_n = \frac{a(1 - r^n)}{1 - r}$: $\dfrac{\frac{1}{2}\left(1 - \frac{1}{64}\right)}{\frac{3}{2}} = \dfrac{1}{3} \times \dfrac{63}{64} = \dfrac{21}{64}$.
:::

## The same series, different limits

A series can be written in sigma notation in more than one way, because the index is only a counter. The series of Example 2 can also start from $r = 0$:

$$
\sum_{r=1}^{20} (3r + 1) = \sum_{r=0}^{19} (3r + 4)
$$

Both give $4 + 7 + \cdots + 61$: on the right, $r = 0$ gives 4 and $r = 19$ gives 61. When you shift the limits down by one, replace $r$ by $r + 1$ in the general term. Any correct form earns the marks, so choose the one that makes the general term simplest, and always check the first and last terms.

## Using the properties

The properties let you split a complicated sum into simple ones. You need two standard results: $\Sigma c = nc$ (adding the constant $c$ $n$ times) and $\Sigma r = \frac{n(n + 1)}{2}$ (the arithmetic series $1 + 2 + \cdots + n$).

:::worked-solution[Example 4: evaluate $\displaystyle\sum_{r=1}^{10} (2r + 5)$ using the properties]
1. Split: $\displaystyle\sum_{r=1}^{10} 2r + \sum_{r=1}^{10} 5 = 2\sum_{r=1}^{10} r + 10 \times 5$.
2. $\displaystyle\sum_{r=1}^{10} r = \frac{10 \times 11}{2} = 55$.
3. Total: $2(55) + 50 = 160$.
:::

To sum from a lower limit other than 1, subtract:

$$
\sum_{r=a}^{b} f(r) = \sum_{r=1}^{b} f(r) - \sum_{r=1}^{a-1} f(r)
$$

:::worked-solution[Example 5: evaluate $\displaystyle\sum_{r=11}^{30} (4r - 3)$]
1. First find a formula: $\displaystyle\sum_{r=1}^{n} (4r - 3) = 4 \cdot \frac{n(n + 1)}{2} - 3n = 2n^2 - n$.
2. $n = 30$: $2(900) - 30 = 1770$. $n = 10$: $2(100) - 10 = 190$.
3. $\displaystyle\sum_{r=11}^{30} (4r - 3) = 1770 - 190 = 1580$.
4. Check as an arithmetic series: first term $4(11) - 3 = 41$, last term $4(30) - 3 = 117$, $30 - 11 + 1 = 20$ terms: $\frac{20}{2}(41 + 117) = 1580$. ✓
:::

## Common mistakes

:::mistake{title="Miscounting the terms"}
$\displaystyle\sum_{r=11}^{30}$ has $30 - 11 + 1 = 20$ terms, not 19. Include both limits.
:::

:::mistake{title="Subtracting up to the wrong term"}
$\displaystyle\sum_{r=11}^{30} = \sum_{r=1}^{30} - \sum_{r=1}^{10}$, not $- \displaystyle\sum_{r=1}^{11}$: the 11th term must stay in.
:::

:::mistake{title="Forgetting that Σc = nc"}
$\displaystyle\sum_{r=1}^{10} 5 = 50$, not 5. The constant is added once for every value of $r$.
:::

:::mistake{title="Splitting products"}
$\Sigma(a_r b_r)$ is **not** $\Sigma a_r \times \Sigma b_r$, and $\Sigma r^2$ is not $(\Sigma r)^2$. Only sums and constant multiples split.
:::

## Exam tips

:::exam-tip
When asked to write a series in sigma notation, check your general term by substituting the first **and** last values of $r$.
:::

:::exam-tip
If the terms form an arithmetic or geometric progression, use the sum formula rather than adding term by term, but show which formula and values you used.
:::

:::exam-tip
Write the first two or three terms of any sigma sum before evaluating it. It catches sign errors from $(-1)^r$ and the wrong starting value.
:::

## Summary

:::summary
- A series is the sum of the terms of a sequence; $S_n$ is the sum of the first $n$ terms.
- $\sum_{r=a}^{b} f(r)$: substitute $r = a, \ldots, b$ and add; there are $b - a + 1$ terms.
- To write a series in $\Sigma$ form, find the general term and the limits.
- Properties: $\Sigma(a_r + b_r) = \Sigma a_r + \Sigma b_r$, $\Sigma k a_r = k\Sigma a_r$, $\Sigma c = nc$, $\Sigma r = \frac{n(n+1)}{2}$.
- $\sum_{r=a}^{b} = \sum_{r=1}^{b} - \sum_{r=1}^{a-1}$.
:::
