---
{
  "key": "sequences.behaviour",
  "title": "Sequences and their behaviour",
  "summary": "Define a sequence and use the notation u₁, u₂, …, uₙ; generate terms from an nth-term formula or a recurrence relation; and describe how a sequence behaves: increasing, decreasing, periodic, oscillating, convergent (with its limit) or divergent.",
  "concepts": ["amath.sequences.behaviour"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

A **sequence** is a list of numbers in a definite order: the monthly balances of a savings account at a bank in Bulawayo, the number of bacteria in a sample counted every hour, the heights reached by a ball bouncing on a concrete floor. Additional Mathematics asks two kinds of questions about sequences: how to **generate** the terms (from a formula or from a rule linking each term to the one before), and how the sequence **behaves** in the long run: does it keep growing, settle down to a fixed value, or repeat itself?

This topic is examined by ZIMSEC (Paper 1). It leads straight into series, arithmetic and geometric progressions, so the notation here is used in the rest of the topic.

## Key definitions

:::definition{term="Sequence and terms"}
An ordered list of numbers $u_1, u_2, u_3, \ldots$. Each number is a **term**; $u_n$ is the $n$th term, and $n$ (a positive integer) is its position. A sequence may be finite or infinite.
:::

:::definition{term="nth-term formula"}
A formula giving $u_n$ directly in terms of $n$, such as $u_n = 3n^2 - 1$. Any term can be found without the ones before it.
:::

:::definition{term="Recurrence relation"}
A rule giving each term from the previous one, such as $u_{n+1} = 2u_n - 3$, together with a starting value such as $u_1 = 5$. Terms must be found in order.
:::

:::formula{name="Long-term value of a convergent recurrence (not printed by ZIMSEC)"}
If $u_{n+1} = f(u_n)$ converges to a limit $L$, then $L$ satisfies

$$
L = f(L)
$$
:::

## Generating terms

:::worked-solution[Example 1: the nth term of a sequence is $u_n = 3n^2 - 1$. Write down the first four terms and find which term equals 299]
1. $u_1 = 3(1) - 1 = 2$, $u_2 = 3(4) - 1 = 11$, $u_3 = 3(9) - 1 = 26$, $u_4 = 3(16) - 1 = 47$.
2. Set $3n^2 - 1 = 299$: $3n^2 = 300$, $n^2 = 100$, $n = 10$ (positions are positive).
3. So 299 is the 10th term.
:::

:::worked-solution[Example 2: a sequence is defined by $u_1 = 5$ and $u_{n+1} = 2u_n - 3$. Find the first four terms]
1. $u_2 = 2(5) - 3 = 7$.
2. $u_3 = 2(7) - 3 = 11$.
3. $u_4 = 2(11) - 3 = 19$.
4. The terms $5, 7, 11, 19, \ldots$ keep increasing; the differences $2, 4, 8$ double each time.
:::

## Types of behaviour

| Behaviour | Meaning | Example |
| --- | --- | --- |
| increasing | each term is larger than the one before: $u_{n+1} > u_n$ | $3, 7, 11, 15, \ldots$ |
| decreasing | each term is smaller than the one before: $u_{n+1} < u_n$ | $20, 10, 5, 2.5, \ldots$ |
| periodic | the terms repeat in a cycle; the **period** is the length of the cycle | $1, 4, 1, 4, \ldots$ (period 2) |
| oscillating | the terms go up and down alternately (often changing sign) | $-1, 2, -4, 8, \ldots$ |
| convergent | the terms get closer and closer to a fixed number $L$, the **limit** | $1, \frac{1}{2}, \frac{1}{4}, \ldots \to 0$ |
| divergent | the sequence does not converge (it grows without bound, or oscillates without settling) | $2, 4, 8, 16, \ldots$ |

These descriptions combine. A sequence can be **increasing and convergent**, such as $u_n = \frac{2n + 1}{n + 3}$, or **oscillating and convergent**, such as $u_n = \left(-\frac{1}{2}\right)^n$: $-0.5, 0.25, -0.125, 0.0625, \ldots$, which swings either side of 0 but closes in on it. The sequence $u_n = (-2)^n$: $-2, 4, -8, 16, \ldots$ is **oscillating and divergent**. A periodic sequence such as $1, 4, 1, 4, \ldots$ is divergent, because it never settles on one value.

:::worked-solution[Example 3: describe the sequence $u_1 = 2$, $u_{n+1} = \dfrac{1}{1 - u_n}$]
1. $u_2 = \frac{1}{1 - 2} = -1$.
2. $u_3 = \frac{1}{1 - (-1)} = \frac{1}{2}$.
3. $u_4 = \frac{1}{1 - \frac{1}{2}} = 2 = u_1$.
4. From here the terms repeat: $2, -1, \frac{1}{2}, 2, -1, \frac{1}{2}, \ldots$ The sequence is **periodic with period 3** (and therefore divergent).
5. To find, say, $u_{20}$: $20 = 3 \times 6 + 2$, so $u_{20} = u_2 = -1$.
:::

## Finding a limit

For an nth-term formula, see what happens to $u_n$ as $n$ becomes very large. Dividing the top and bottom of a fraction by $n$ helps:

$$
u_n = \frac{2n + 1}{n + 3} = \frac{2 + \frac{1}{n}}{1 + \frac{3}{n}} \to \frac{2 + 0}{1 + 0} = 2
$$

The terms $0.75, 1, 1.17, 1.29, \ldots$ increase towards 2; $u_{1000} \approx 1.995$.

For a recurrence relation that converges, the limit $L$ must satisfy $L = f(L)$, because when $n$ is large both $u_n$ and $u_{n+1}$ are very close to $L$.

:::worked-solution[Example 4: the sequence $u_1 = 2$, $u_{n+1} = 0.5u_n + 4$ converges. Find its limit]
1. Terms: $2, 5, 6.5, 7.25, 7.625, \ldots$: increasing, with the gaps halving.
2. The limit satisfies $L = 0.5L + 4$.
3. $0.5L = 4$, so $L = 8$.
4. Check: $u_{30} \approx 7.99999999$, very close to 8.
:::

The equation $L = f(L)$ gives the limit **only if** the sequence converges. The sequence $u_{n+1} = 2u_n - 3$ of Example 2 gives $L = 2L - 3$, so $L = 3$, yet starting from 5 the terms run off to infinity: it diverges. Always look at the terms first.

## Common mistakes

:::mistake{title="Confusing uₙ₊₁ with uₙ + 1"}
$u_{n+1}$ is the **next term**; $u_n + 1$ is the current term plus one. In $u_{n+1} = 2u_n - 3$ the subscript tells you the position.
:::

:::mistake{title="Thinking convergent means increasing"}
A convergent sequence can decrease, increase or oscillate. Convergence is about approaching a limit, not about direction.
:::

:::mistake{title="Using L = f(L) without checking convergence"}
The equation can have a solution even when the sequence diverges. Generate a few terms to see that they are settling down.
:::

:::mistake{title="Calling a periodic sequence convergent"}
$1, 4, 1, 4, \ldots$ stays bounded but does not approach a single value, so it does not converge.
:::

## Exam tips

:::exam-tip
When asked to "describe the behaviour", use the exact words: increasing, decreasing, periodic (give the period), oscillating, convergent (give the limit) or divergent. One word is rarely enough; for example "oscillating and convergent to 0".
:::

:::exam-tip
For a periodic sequence, find the period first, then use the remainder when $n$ is divided by the period to find any term.
:::

:::exam-tip
Show the terms you used. A list such as $2, 5, 6.5, 7.25$ supports your description and earns method marks.
:::

## Summary

:::summary
- A sequence is an ordered list $u_1, u_2, \ldots$; $u_n$ is the $n$th term.
- An nth-term formula gives $u_n$ directly; a recurrence relation gives $u_{n+1}$ from $u_n$ and needs a first term.
- Behaviour: increasing, decreasing, periodic (with a period), oscillating, convergent (with a limit) or divergent; these combine.
- Limit of a formula: let $n$ become large (divide top and bottom by $n$).
- Limit of a convergent recurrence $u_{n+1} = f(u_n)$: solve $L = f(L)$.
:::
