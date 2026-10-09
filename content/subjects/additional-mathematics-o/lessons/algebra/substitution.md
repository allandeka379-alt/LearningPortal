---
{
  "key": "algebra.substitution",
  "title": "Equations reducible to quadratic form",
  "summary": "Spot the substitution (u = x^(1/3), u = √x, u = e^x, u = 2^x, u = ln x) that turns an equation into a quadratic, solve it, substitute back and reject impossible values, giving exact or 3-significant-figure answers.",
  "concepts": ["amath.algebra.substitution"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

Some equations look nothing like quadratics, yet they are quadratics in disguise:

$$
x - 5\sqrt{x} + 6 = 0 \qquad e^{2x} - 5e^{x} + 6 = 0 \qquad (\ln x)^{2} - 3\ln x + 2 = 0
$$

In each one, one term is the **square** of another. Replace that other term by a single letter, $u$, and you have an ordinary quadratic. Solve for $u$, then turn each value of $u$ back into a value of $x$.

Cambridge 0606 sets these equations regularly, on both papers: exact answers such as $x = \ln 3$ on Paper 1, and 3-significant-figure answers on Paper 2. They also appear inside questions on logarithms and exponential functions.

You need to solve quadratics, and know that $e^{x} > 0$, $a^{x} > 0$ and $\sqrt{x} \geq 0$ for real $x$, and that $e^{x} = k$ means $x = \ln k$.

## Key definitions

:::definition{term="Equation in quadratic form"}
An equation that can be written $a\,u^{2} + b\,u + c = 0$ where $u$ is some expression in $x$, such as $\sqrt{x}$, $x^{\frac{1}{3}}$, $e^{x}$, $2^{x}$ or $\ln x$.
:::

:::definition{term="Rejecting a value"}
Discarding a solution of the quadratic in $u$ because no real $x$ gives that value of $u$, for example $e^{x} = -2$ or $\sqrt{x} = -3$.
:::

:::formula{name="Useful squares"}
$$
x = \left(\sqrt{x}\right)^{2} \qquad x^{\frac{2}{3}} = \left(x^{\frac{1}{3}}\right)^{2} \qquad e^{2x} = \left(e^{x}\right)^{2} \qquad 4^{x} = \left(2^{x}\right)^{2} \qquad e^{-x} = \frac{1}{e^{x}}
$$

None of these are in the List of formulas; they follow from the laws of indices.
:::

## Spotting the substitution

Look for two terms where one is the square of the other:

| Equation contains | Substitute | Then the other term is |
| --- | --- | --- |
| $x$ and $\sqrt{x}$ | $u = \sqrt{x}$ | $x = u^{2}$ |
| $x^{\frac{2}{3}}$ and $x^{\frac{1}{3}}$ | $u = x^{\frac{1}{3}}$ | $x^{\frac{2}{3}} = u^{2}$ |
| $e^{2x}$ and $e^{x}$ | $u = e^{x}$ | $e^{2x} = u^{2}$ |
| $9^{x}$ and $3^{x}$ | $u = 3^{x}$ | $9^{x} = u^{2}$ |
| $(\ln x)^{2}$ and $\ln x$ | $u = \ln x$ | $(\ln x)^{2} = u^{2}$ |

If the equation contains $e^{-x}$, multiply every term by $e^{x}$ first. If it contains $3^{x+2}$, write it as $9 \times 3^{x}$.

## The method

1. Choose $u$ and rewrite the equation as a quadratic in $u$.
2. Solve the quadratic (factorise or use the formula).
3. For each value of $u$, decide whether it is possible. Reject negative values of $\sqrt{x}$, $e^{x}$ or $a^{x}$, and say why.
4. Convert each remaining value back to $x$: square, cube, take $\ln$, or take logs.
5. Give the answer in the form asked: exact ($\ln 3$, $64$) or to 3 significant figures.

:::worked-solution[Example 1: solve $x^{\frac{2}{3}} - 5x^{\frac{1}{3}} + 4 = 0$]
1. Let $u = x^{\frac{1}{3}}$, so $x^{\frac{2}{3}} = u^{2}$: $u^{2} - 5u + 4 = 0$.
2. $(u - 1)(u - 4) = 0$, so $u = 1$ or $u = 4$.
3. Cube roots may be negative or positive, so both values are allowed.
4. $x^{\frac{1}{3}} = 1$ gives $x = 1$; $x^{\frac{1}{3}} = 4$ gives $x = 4^{3} = 64$.
:::

:::worked-solution[Example 2: solve $x - 5\sqrt{x} + 6 = 0$]
1. Let $u = \sqrt{x}$, so $x = u^{2}$: $u^{2} - 5u + 6 = 0$.
2. $(u - 2)(u - 3) = 0$, so $u = 2$ or $u = 3$.
3. Both are positive, so both are allowed.
4. $\sqrt{x} = 2$ gives $x = 4$; $\sqrt{x} = 3$ gives $x = 9$.
:::

If instead the equation were $x + \sqrt{x} - 6 = 0$, you would get $(u + 3)(u - 2) = 0$. The value $u = -3$ is rejected because $\sqrt{x}$ is never negative, leaving only $x = 4$.

## Exponential equations

:::worked-solution[Example 3: solve $e^{2x} - 5e^{x} + 6 = 0$, giving exact answers]
1. Let $u = e^{x}$: $u^{2} - 5u + 6 = 0$, so $u = 2$ or $u = 3$.
2. $e^{x} = 2$ gives $x = \ln 2$; $e^{x} = 3$ gives $x = \ln 3$.
3. To 3 significant figures these are $0.693$ and $1.10$.
:::

:::worked-solution[Example 4: solve $3^{2x} - 4 \times 3^{x} - 12 = 0$, giving your answer to 3 significant figures]
1. Let $u = 3^{x}$: $u^{2} - 4u - 12 = 0$, so $(u - 6)(u + 2) = 0$.
2. $u = -2$ is rejected because $3^{x} > 0$ for every real $x$.
3. $3^{x} = 6$, so $x \lg 3 = \lg 6$ and $x = \dfrac{\lg 6}{\lg 3} = 1.63$ (3 s.f.).
:::

## Logarithmic equations

:::worked-solution[Example 5: solve $(\ln x)^{2} - 3\ln x + 2 = 0$]
1. Let $u = \ln x$: $u^{2} - 3u + 2 = 0$, so $u = 1$ or $u = 2$.
2. $\ln x$ can take any real value, so both are allowed. (Instead, $x$ itself must be positive.)
3. $\ln x = 1$ gives $x = e$; $\ln x = 2$ gives $x = e^{2}$.
4. To 3 significant figures: $x = 2.72$ or $x = 7.39$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
This is a Cambridge 0606 topic. ZIMSEC candidates meet the same idea, with powers of a single base only, in the lesson on indices and exponential equations (for example $u = 2^{x}$).
:::

## Common mistakes

:::mistake{title="Stopping at u"}
The question asks for $x$. After finding $u = 2$ and $u = 3$, you must convert back.
:::

:::mistake{title="Keeping impossible values"}
$e^{x} = -2$ has no solution; neither does $\sqrt{x} = -3$. Reject them and write the reason.
:::

:::mistake{title="Wrong square"}
$e^{2x}$ is $\left(e^{x}\right)^{2}$, not $2e^{x}$. Similarly $4^{x} = \left(2^{x}\right)^{2}$, not $2 \times 2^{x}$.
:::

:::mistake{title="Forgetting to clear a negative index"}
$e^{x} - 6e^{-x} = 1$ is not yet a quadratic. Multiply by $e^{x}$: $e^{2x} - 6 = e^{x}$.
:::

## Exam tips

:::exam-tip
Paper 1 has no calculator, so answers such as $\ln 3$ or $\dfrac{\ln 5}{\ln 2}$ are expected in exact form. Do not round unless the question asks.
:::

:::exam-tip
State the substitution at the start ("Let $u = e^{x}$"). It earns a method mark and keeps your working clear.
:::

:::exam-tip
When you reject a value, write a reason such as "$e^{x} > 0$". A rejection without a reason may lose the accuracy mark.
:::

## Summary

:::summary
- Look for a term that is the square of another: $x$ and $\sqrt{x}$, $e^{2x}$ and $e^{x}$, $(\ln x)^{2}$ and $\ln x$.
- Substitute $u$, solve the quadratic, then convert each $u$ back to $x$.
- Reject $u < 0$ when $u = \sqrt{x}$, $e^{x}$ or $a^{x}$, giving the reason.
- Clear negative indices first by multiplying through by $e^{x}$ or $a^{x}$.
- Give exact answers (logs, powers) or 3 significant figures as asked.
:::
