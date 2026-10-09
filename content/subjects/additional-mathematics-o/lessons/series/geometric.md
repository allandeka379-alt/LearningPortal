---
{
  "key": "series.geometric",
  "title": "Geometric progressions",
  "summary": "Recognise a geometric progression and its common ratio, tell it apart from an arithmetic progression, use the nth term arⁿ⁻¹ and the sum of the first n terms, find n with logarithms, and solve problems on growth, depreciation, compound interest and progressions that combine an AP and a GP.",
  "concepts": ["amath.series.geometric"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

When a quantity is **multiplied** by the same factor at each step, it forms a **geometric progression** (GP). Money in a savings account earning 6% a year is multiplied by 1.06 each year; a minibus that loses 15% of its value each year keeps 0.85 of its value; a population of bacteria that doubles every hour is multiplied by 2. Geometric growth starts slowly and then becomes very fast, which is why it matters in finance, biology and planning.

Both boards examine GPs: the nth term and the sum, finding $a$ and $r$ from two terms, using logarithms to find how many terms are needed, and questions that link an arithmetic and a geometric progression.

## Key definitions

:::definition{term="Geometric progression (GP)"}
A sequence in which each term is obtained by multiplying the previous term by a fixed non-zero number $r$, the **common ratio**: $\dfrac{u_{n+1}}{u_n} = r$ for every $n$. The first term is $a$.
:::

:::definition{term="Geometric series"}
The sum of the terms of a GP; $S_n$ is the sum of the first $n$ terms.
:::

:::formula{name="nth term of a GP (not in the List of formulas)"}
$$
u_n = ar^{n-1}
$$
:::

:::formula{name="Sum of the first n terms of a GP (in Cambridge's List of formulas)"}
$$
S_n = \frac{a(1 - r^n)}{1 - r} = \frac{a(r^n - 1)}{r - 1}, \qquad r \neq 1
$$
:::

The two forms are equal; the second avoids negative numbers when $r > 1$. If $r = 1$ every term is $a$ and $S_n = na$.

## AP or GP?

| Test | AP | GP |
| --- | --- | --- |
| Compare neighbouring terms | difference $u_{n+1} - u_n$ constant | ratio $\frac{u_{n+1}}{u_n}$ constant |
| Example | $5, 8, 11, 14$ ($d = 3$) | $5, 10, 20, 40$ ($r = 2$) |
| nth term | $a + (n - 1)d$ | $ar^{n-1}$ |

A negative ratio makes the signs alternate: $4, -2, 1, -\frac{1}{2}, \ldots$ has $r = -\frac{1}{2}$.

## Why the sum formula works

Multiply $S_n$ by $r$ and subtract:

$$
S_n = a + ar + ar^2 + \cdots + ar^{n-1}
$$

$$
rS_n = ar + ar^2 + \cdots + ar^{n-1} + ar^n
$$

Subtracting, all the middle terms cancel: $S_n - rS_n = a - ar^n$, so $S_n(1 - r) = a(1 - r^n)$, which gives the formula.

:::worked-solution[Example 1: for the GP $3, 6, 12, \ldots$ find the 10th term and the sum of the first 10 terms]
1. $a = 3$, $r = \frac{6}{3} = 2$.
2. $u_{10} = 3 \times 2^9 = 3 \times 512 = 1536$.
3. $S_{10} = \frac{3(2^{10} - 1)}{2 - 1} = 3 \times 1023 = 3069$.
:::

## Finding a and r

Divide one term by another to eliminate $a$.

:::worked-solution[Example 2: the 3rd term of a GP is 18 and the 6th term is 486. Find $a$, $r$ and the sum of the first 8 terms]
1. $ar^2 = 18$ and $ar^5 = 486$.
2. Divide: $r^3 = \frac{486}{18} = 27$, so $r = 3$.
3. $a = \frac{18}{9} = 2$.
4. $S_8 = \frac{2(3^8 - 1)}{3 - 1} = 3^8 - 1 = 6560$.
:::

## Finding n with logarithms

When $n$ is the unknown it sits in a power, so take logarithms of both sides (either $\lg$ or $\ln$). Remember that dividing by the logarithm of a number less than 1 (which is negative) **reverses** an inequality.

:::worked-solution[Example 3: which is the first term of the GP $2, 6, 18, \ldots$ to exceed one million?]
1. $u_n = 2 \times 3^{n-1} > 1\,000\,000$, so $3^{n-1} > 500\,000$.
2. Take logarithms: $(n - 1)\lg 3 > \lg 500\,000$, so $n - 1 > \frac{\lg 500\,000}{\lg 3} = 11.94$.
3. $n > 12.94$, so $n = 13$.
4. Check: $u_{12} = 354\,294$ and $u_{13} = 1\,062\,882$. The 13th term is the first above one million.
:::

## Growth and decay in context

An increase of $p\%$ per period multiplies by $1 + \frac{p}{100}$; a decrease of $p\%$ multiplies by $1 - \frac{p}{100}$. After $n$ periods the value is (starting value) $\times$ (multiplier)$^n$. Be careful with counting: the value **after** $n$ years is the $(n + 1)$th term if the starting value is the first term.

:::worked-solution[Example 4: a kombi bought for US\$12 000 loses 15% of its value each year. Find its value after 5 years, and after how many complete years it is first worth less than US\$3000]
1. Multiplier $0.85$. After 5 years: $12\,000 \times 0.85^5 = 5324.46$, so about US\$5324.
2. Need $12\,000 \times 0.85^n < 3000$, that is $0.85^n < 0.25$.
3. Logarithms: $n\ln 0.85 < \ln 0.25$. Since $\ln 0.85 < 0$, dividing reverses the inequality: $n > \frac{\ln 0.25}{\ln 0.85} = 8.53$.
4. After 9 complete years: the value is then $12\,000 \times 0.85^9$, about US\$2779, while after 8 years it is still about US\$3270.
:::

## Combining an AP and a GP

:::worked-solution[Example 5 (exam style): the first three terms of a GP are equal to the 1st, 4th and 10th terms of an AP with common difference $d \neq 0$. Show that the common ratio of the GP is 2, and find $d$ when the first term is 12]
1. Let both progressions start with $a$. Then $ar = a + 3d$ and $ar^2 = a + 9d$.
2. So $a(r - 1) = 3d$ and $a(r^2 - 1) = 9d$.
3. Divide: $\frac{a(r - 1)(r + 1)}{a(r - 1)} = 3$, so $r + 1 = 3$ and $r = 2$ (we may cancel $r - 1$ because $d \neq 0$ means $r \neq 1$).
4. With $a = 12$: $12(2 - 1) = 3d$, so $d = 4$.
5. Check: GP $12, 24, 48$; AP $12, 16, 20, 24, \ldots$ has 4th term 24 and 10th term $12 + 36 = 48$. ✓
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine the nth term, the sum and problems in context. Cambridge prints $S_n$ in the List of formulas and expects logarithms (Paper 2) to find $n$; ZIMSEC prints no formulas, so learn $u_n = ar^{n-1}$ and $S_n$.
:::

## Common mistakes

:::mistake{title="Using arⁿ for the nth term"}
The nth term is $ar^{n-1}$: the first term is $ar^0 = a$.
:::

:::mistake{title="Not reversing the inequality"}
In $0.85^n < 0.25$, dividing by $\ln 0.85$ (negative) turns $<$ into $>$. Getting "$n < 8.53$" is a classic error.
:::

:::mistake{title="Forgetting the negative ratio"}
$r^2 = 9$ gives $r = 3$ **or** $r = -3$. Use any condition in the question (such as "all terms positive") to choose.
:::

:::mistake{title="Calling 15% depreciation r = 0.15"}
Losing 15% means keeping 85%: the ratio is $0.85$.
:::

## Exam tips

:::exam-tip
In "find the least $n$" questions, show the logarithm step, give the decimal value, then state the integer answer and check the terms on either side.
:::

:::exam-tip
To show that three numbers are in geometric progression, show that $\frac{u_2}{u_1} = \frac{u_3}{u_2}$; for an arithmetic progression show that $u_2 - u_1 = u_3 - u_2$.
:::

:::exam-tip
Keep full calculator accuracy until the end of money questions, then round to the nearest cent or dollar as asked.
:::

## Summary

:::summary
- GP: constant ratio $r = \frac{u_{n+1}}{u_n}$; first term $a$.
- nth term $u_n = ar^{n-1}$; sum $S_n = \frac{a(1 - r^n)}{1 - r} = \frac{a(r^n - 1)}{r - 1}$.
- Two terms: divide to eliminate $a$ and find $r$.
- Unknown $n$ in a power: take logarithms; dividing by a negative logarithm reverses an inequality.
- Growth by $p\%$: multiply by $1 + \frac{p}{100}$; decay by $p\%$: multiply by $1 - \frac{p}{100}$.
:::
