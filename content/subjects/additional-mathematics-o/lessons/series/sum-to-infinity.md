---
{
  "key": "series.sum-to-infinity",
  "title": "Convergent geometric progressions and the sum to infinity",
  "summary": "Use the condition |r| < 1 for a geometric series to converge and the sum to infinity a/(1 − r); explain why a given progression has or does not have a sum to infinity; write recurring decimals as fractions using geometric series; and solve problems such as the total distance travelled by a bouncing ball.",
  "concepts": ["amath.series.sum-to-infinity"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

Can you add infinitely many numbers and get a finite answer? Imagine walking from one side of a classroom to the other, first covering half the distance, then half of what is left, then half of that, and so on. The pieces $\frac{1}{2} + \frac{1}{4} + \frac{1}{8} + \cdots$ go on for ever, yet together they never exceed the width of the room: their total is exactly 1.

This happens whenever a geometric series has a common ratio between $-1$ and $1$: the terms shrink so quickly that the sums settle down to a limit, the **sum to infinity**. Examination questions ask you to find it, to explain whether it exists, to use it to write recurring decimals as fractions, and to apply it to situations such as a ball bouncing on a hard floor.

## Key definitions

:::definition{term="Convergent geometric series"}
A geometric series whose partial sums $S_1, S_2, S_3, \ldots$ approach a finite limit as $n$ increases. This happens exactly when $|r| < 1$, that is $-1 < r < 1$.
:::

:::definition{term="Sum to infinity"}
The limit of $S_n$ as $n \to \infty$, written $S_\infty$. It exists only for a convergent series.
:::

:::formula{name="Sum to infinity of a GP (in Cambridge's List of formulas)"}
$$
S_\infty = \frac{a}{1 - r}, \qquad |r| < 1
$$
:::

## Why the formula works

The sum of the first $n$ terms is

$$
S_n = \frac{a(1 - r^n)}{1 - r}
$$

If $|r| < 1$, then $r^n$ gets closer and closer to 0 as $n$ grows (for example $0.5^{10} \approx 0.001$), so $S_n$ approaches $\frac{a(1 - 0)}{1 - r} = \frac{a}{1 - r}$.

If $|r| \geq 1$, $r^n$ does not approach 0: for $r > 1$ the terms grow and the sums run off to infinity; for $r = 1$ the sum is $na$, which also grows without limit; for $r \leq -1$ the sums swing about without settling. In all these cases there is **no** sum to infinity.

:::worked-solution[Example 1: find the sum to infinity of $24 + 12 + 6 + \cdots$]
1. $a = 24$, $r = \frac{12}{24} = \frac{1}{2}$, and $|r| < 1$, so the sum to infinity exists.
2. $S_\infty = \frac{24}{1 - \frac{1}{2}} = \frac{24}{\frac{1}{2}} = 48$.
3. The partial sums approach 48 quickly: $S_{10} = 47.95$, only $0.047$ below the limit.
:::

:::worked-solution[Example 2: explain why $2 + 3 + 4.5 + \cdots$ has no sum to infinity]
1. The ratio is $r = \frac{3}{2} = 1.5$ (and $\frac{4.5}{3} = 1.5$).
2. Since $|r| = 1.5 > 1$, the terms keep growing, so the sums increase without limit: the series diverges and has no sum to infinity.
:::

## Recurring decimals

A recurring decimal is a convergent geometric series. For example

$$
0.\dot{2}\dot{7} = 0.272727\ldots = 0.27 + 0.0027 + 0.000027 + \cdots
$$

:::worked-solution[Example 3: write $0.\dot{2}\dot{7}$ as a fraction in its simplest form]
1. First term $a = 0.27 = \frac{27}{100}$; each term is $\frac{1}{100}$ of the one before, so $r = \frac{1}{100}$.
2. $S_\infty = \dfrac{\frac{27}{100}}{1 - \frac{1}{100}} = \dfrac{\frac{27}{100}}{\frac{99}{100}} = \dfrac{27}{99}$.
3. Simplify: $\dfrac{27}{99} = \dfrac{3}{11}$.
:::

## Working backwards

If you know $S_\infty$ and one more fact, the formula gives an equation for $a$ or $r$.

:::worked-solution[Example 4: a geometric series has first term 15 and sum to infinity 25. Find the common ratio and the third term]
1. $\frac{15}{1 - r} = 25$, so $1 - r = \frac{15}{25} = 0.6$ and $r = 0.4$.
2. Check: $|r| < 1$, as it must be.
3. Third term $ar^2 = 15 \times 0.16 = 2.4$.
:::

A condition on $x$ is found the same way: the series $1 + (2x - 1) + (2x - 1)^2 + \cdots$ has $r = 2x - 1$, so it converges when $-1 < 2x - 1 < 1$, that is $0 < x < 1$.

## The bouncing ball

:::worked-solution[Example 5 (exam style): a ball is dropped from a height of 8 m onto a concrete floor. After each bounce it rises to $\frac{3}{4}$ of the height from which it fell. Find the total distance it travels before coming to rest]
1. First fall: 8 m.
2. After that the ball rises and falls the same distance each time: up 6 m and down 6 m, then up 4.5 m and down 4.5 m, and so on.
3. The rises form a GP with $a = 6$ and $r = \frac{3}{4}$: their sum to infinity is $\frac{6}{1 - \frac{3}{4}} = 24$ m.
4. The falls after the first have the same total, 24 m.
5. Total distance $= 8 + 2 \times 24 = 56$ m.
:::

The model predicts infinitely many bounces but a **finite** total distance, because the series converges. (A real ball stops after a few bounces; the model is still a good estimate.)

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards ask for the sum to infinity and the condition $|r| < 1$. Cambridge prints $S_\infty = \frac{a}{1 - r}$ in the List of formulas; ZIMSEC prints no formulas. ZIMSEC questions often involve recurring decimals and "solve problems involving series".
:::

## Common mistakes

:::mistake{title="Using the formula when |r| ≥ 1"}
$\frac{a}{1 - r}$ gives a number for any $r \neq 1$, even $r = 3$, but the answer is meaningless. Check $|r| < 1$ first and say so.
:::

:::mistake{title="Forgetting the sign of a negative ratio"}
For $10 - 5 + 2.5 - \cdots$, $r = -\frac{1}{2}$ and $1 - r = 1.5$, so $S_\infty = \frac{10}{1.5} = \frac{20}{3}$, not 20.
:::

:::mistake{title="Counting the first drop twice"}
In bouncing-ball problems the first fall happens once; every later height is travelled twice (up and down).
:::

:::mistake{title="Wrong ratio for a recurring decimal"}
For $0.\dot{2}\dot{7}$ the block of two digits repeats, so $r = \frac{1}{100}$, not $\frac{1}{10}$.
:::

## Exam tips

:::exam-tip
"Explain why the series has a sum to infinity" needs the value of $r$ and the statement "$|r| < 1$". "Explain why it does not" needs $r$ and "$|r| \geq 1$".
:::

:::exam-tip
If an equation for $r$ has two roots, reject any with $|r| \geq 1$ and say why.
:::

:::exam-tip
Recurring decimals: write out the first three terms of the series before finding $a$ and $r$.
:::

## Summary

:::summary
- A geometric series converges if and only if $|r| < 1$.
- Sum to infinity $S_\infty = \frac{a}{1 - r}$; it comes from $S_n$ because $r^n \to 0$.
- No sum to infinity when $|r| \geq 1$.
- Recurring decimals are geometric series with $r = \frac{1}{10}, \frac{1}{100}, \ldots$
- Bouncing ball: first drop plus twice the sum of the rebound heights.
:::
