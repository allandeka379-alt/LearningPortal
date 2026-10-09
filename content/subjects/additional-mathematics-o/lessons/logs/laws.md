---
{
  "key": "logs.laws",
  "title": "Logarithms and the laws of logarithms",
  "summary": "Understand a logarithm as an index, convert between index and logarithmic form, use common and natural logarithms, apply the product, quotient and power laws and the change of base rule, and evaluate logarithms without a calculator.",
  "concepts": ["amath.logs.laws"],
  "estimatedMinutes": 40,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

A logarithm answers one question: **what power?** If a borehole pump in Masvingo doubles the water stored in a tank every hour, how many hours until the volume is 32 times larger? You need the power of 2 that gives 32, and that power is a logarithm.

Logarithms turn multiplication into addition and powers into multiplication. That is why they are used for the Richter scale of earthquakes, the pH scale in chemistry, the decibel scale for sound and for compound interest and population growth. In Additional Mathematics they are the tool for solving exponential equations, for turning curved graphs into straight lines and, later, for differentiating and integrating.

Both ZIMSEC and Cambridge examine the definition and the laws, and both expect you to evaluate simple logarithms **without a calculator** (Cambridge Paper 1 does not allow one). You should already be confident with the laws of indices: $a^m \times a^n = a^{m+n}$, $(a^m)^n = a^{mn}$, $a^0 = 1$ and $a^{-n} = \dfrac{1}{a^n}$.

## Key definitions

:::definition{term="Logarithm"}
For a base $a > 0$, $a \neq 1$, and a number $b > 0$, the logarithm of $b$ to base $a$ is the power to which $a$ must be raised to give $b$:

$$
\log_a b = c \iff a^c = b
$$
:::

:::definition{term="Common logarithm"}
A logarithm to base 10. Cambridge writes $\lg x$; ZIMSEC papers usually write $\log x$ with the base 10 understood. Both mean $\log_{10} x$.
:::

:::definition{term="Natural logarithm"}
A logarithm to base $\mathrm{e}$, where $\mathrm{e} \approx 2.718$. It is written $\ln x$, so $\ln x = \log_{\mathrm{e}} x$.
:::

:::formula{name="Laws of logarithms (not in Cambridge's List of formulas: learn them)"}
$$
\log_a (xy) = \log_a x + \log_a y
$$

$$
\log_a \left(\frac{x}{y}\right) = \log_a x - \log_a y
$$

$$
\log_a (x^n) = n \log_a x
$$

$$
\log_a a = 1, \qquad \log_a 1 = 0, \qquad \log_a \left(\frac{1}{x}\right) = -\log_a x
$$
:::

:::formula{name="Change of base (not in the List of formulas)"}
$$
\log_a b = \frac{\log_c b}{\log_c a} \qquad \text{in particular} \qquad \log_a b = \frac{1}{\log_b a}
$$
:::

## Index form and logarithmic form

Every statement about a power can be written both ways. The base stays the base; the index becomes the logarithm.

| Index form | Logarithmic form |
| --- | --- |
| $2^5 = 32$ | $\log_2 32 = 5$ |
| $10^{-3} = 0.001$ | $\lg 0.001 = -3$ |
| $16^{\frac{1}{4}} = 2$ | $\log_{16} 2 = \frac{1}{4}$ |
| $\mathrm{e}^{0} = 1$ | $\ln 1 = 0$ |

Two facts follow straight from the definition. Since a positive base raised to any power is positive, **you can only take the logarithm of a positive number**: $\log_2 0$ and $\log_2 (-4)$ do not exist. And $\log_a (a^k) = k$ while $a^{\log_a x} = x$: a logarithm and a power to the same base undo each other.

To evaluate a logarithm by hand, write the number as a power of the base.

:::worked-solution[Example 1: evaluate without a calculator (a) $\log_3 243$, (b) $\log_{27} 9$, (c) $\log_2 \frac{1}{64}$, (d) $\log_{49} 7$]
1. (a) $243 = 3^5$, so $\log_3 243 = 5$.
2. (b) Both numbers are powers of 3: $27 = 3^3$ and $9 = 3^2$. We need $27^c = 9$, that is $3^{3c} = 3^2$, so $3c = 2$ and $\log_{27} 9 = \frac{2}{3}$.
3. (c) $\frac{1}{64} = 2^{-6}$, so $\log_2 \frac{1}{64} = -6$.
4. (d) $7 = 49^{\frac{1}{2}}$, so $\log_{49} 7 = \frac{1}{2}$.
:::

## Why the laws work

Let $\log_a x = m$ and $\log_a y = n$, so $x = a^m$ and $y = a^n$. Then

$$
xy = a^m \times a^n = a^{m+n} \quad \Rightarrow \quad \log_a (xy) = m + n = \log_a x + \log_a y
$$

The quotient law comes from $a^m \div a^n = a^{m-n}$, and the power law from $(a^m)^k = a^{km}$. So each law of logarithms is a law of indices in disguise.

The laws let you **combine** several logarithms into one, or **split** one logarithm into simpler pieces. To combine, first move every coefficient inside as a power, then add and subtract.

:::worked-solution[Example 2: write $2\lg 5 + \lg 12 - \lg 3$ as a single logarithm and hence evaluate it]
1. Power law first: $2\lg 5 = \lg 5^2 = \lg 25$.
2. Product law: $\lg 25 + \lg 12 = \lg (25 \times 12) = \lg 300$.
3. Quotient law: $\lg 300 - \lg 3 = \lg \frac{300}{3} = \lg 100$.
4. $100 = 10^2$, so the expression equals $2$.
:::

:::worked-solution[Example 3: given $\lg 2 = p$ and $\lg 3 = q$, express (a) $\lg 72$, (b) $\lg 1.5$, (c) $\lg 600$ in terms of $p$ and $q$]
1. (a) Split into prime factors: $72 = 2^3 \times 3^2$, so $\lg 72 = 3\lg 2 + 2\lg 3 = 3p + 2q$.
2. (b) $1.5 = \frac{3}{2}$, so $\lg 1.5 = \lg 3 - \lg 2 = q - p$.
3. (c) $600 = 2 \times 3 \times 100$, and $\lg 100 = 2$, so $\lg 600 = p + q + 2$.
:::

## Change of base

Calculators have keys for $\lg$ and $\ln$ only. To find a logarithm to any other base, change to base 10 or base $\mathrm{e}$. Without a calculator, change to a base that makes both numbers simple powers.

:::worked-solution[Example 4: find (a) $\log_9 27$ exactly, (b) $\log_4 7$ correct to 3 significant figures]
1. (a) Change to base 3: $\log_9 27 = \dfrac{\log_3 27}{\log_3 9} = \dfrac{3}{2}$.
2. Check: $9^{\frac{3}{2}} = (\sqrt{9})^3 = 3^3 = 27$.
3. (b) Change to base $\mathrm{e}$ (base 10 works equally well): $\log_4 7 = \dfrac{\ln 7}{\ln 4} = \dfrac{1.9459\ldots}{1.3862\ldots} = 1.4036\ldots$
4. So $\log_4 7 = 1.40$ to 3 significant figures. Check: $4^{1.4} \approx 6.96$, close to 7.
:::

A very useful special case: when the new base is a power of the old one, $\log_{a^k} x = \dfrac{\log_a x}{\log_a a^k} = \dfrac{1}{k}\log_a x$.

:::worked-solution[Example 5: show that $\log_4 x = \frac{1}{2}\log_2 x$ for $x > 0$]
1. Change to base 2: $\log_4 x = \dfrac{\log_2 x}{\log_2 4}$.
2. $\log_2 4 = 2$ because $2^2 = 4$.
3. So $\log_4 x = \dfrac{\log_2 x}{2} = \frac{1}{2}\log_2 x$, as required.
:::

This result is the key step in equations that mix bases 2 and 4, or 3 and 9.

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC writes the common logarithm as $\log x$ and may give four-figure values such as $\log 2 = 0.3010$ to work with. Cambridge writes $\lg x$, and its Paper 1 expects exact work with the laws, so values like $\log_8 4 = \frac{2}{3}$ must be found by hand. The laws themselves are identical.
:::

## Common mistakes

:::mistake{title="Splitting the log of a sum"}
$\log_a (x + y)$ is **not** $\log_a x + \log_a y$. The product law needs a product: $\log_a (xy) = \log_a x + \log_a y$. A logarithm of a sum cannot be simplified.
:::

:::mistake{title="Dividing logarithms instead of subtracting"}
$\dfrac{\log_a x}{\log_a y}$ is not $\log_a \dfrac{x}{y}$. A quotient of two logarithms is a change of base: $\dfrac{\log_a x}{\log_a y} = \log_y x$.
:::

:::mistake{title="Applying the power law to only part of the expression"}
$2\log_a 3x$ means $\log_a (3x)^2 = \log_a 9x^2$, not $\log_a 3x^2$. Put the whole argument in brackets before squaring.
:::

:::mistake{title="Taking the logarithm of zero or a negative number"}
$\log_a 0$ and $\log_a(-5)$ are undefined. When an answer makes the argument of a logarithm zero or negative, it must be rejected.
:::

## Exam tips

:::exam-tip
"Without using a calculator" or "find the exact value" means every step must be shown: write each number as a power of a common base and quote the law you use.
:::

:::exam-tip
When combining into a single logarithm, deal with the coefficients first (power law), then products and quotients. Write the final answer as one logarithm, for example $\lg 45$, not a decimal, unless asked to evaluate.
:::

:::exam-tip
In "show that" questions with change of base, state the base you are changing to and show $\log_2 4 = 2$ (or similar) explicitly. The examiner needs every step to reach the given result.
:::

## Summary

:::summary
- $\log_a b = c$ means $a^c = b$; logarithms exist only for positive numbers, with base $a > 0$, $a \neq 1$.
- $\lg$ (or $\log$ in ZIMSEC papers) is base 10; $\ln$ is base $\mathrm{e}$.
- Product, quotient and power laws: $\log_a xy = \log_a x + \log_a y$, $\log_a \frac{x}{y} = \log_a x - \log_a y$, $\log_a x^n = n\log_a x$; also $\log_a a = 1$, $\log_a 1 = 0$.
- Change of base: $\log_a b = \dfrac{\log_c b}{\log_c a}$, so $\log_a b = \dfrac{1}{\log_b a}$ and $\log_{a^k} x = \dfrac{1}{k}\log_a x$.
- Evaluate by hand by writing numbers as powers of one base; never split a logarithm of a sum.
:::
