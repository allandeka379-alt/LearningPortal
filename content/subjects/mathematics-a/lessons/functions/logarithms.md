---
{
  "key": "functions.logarithms",
  "title": "Laws of logarithms and equations with unknown indices",
  "summary": "Use the relationship between logarithms and indices and the laws of logarithms to simplify expressions and to solve exponential equations, logarithmic equations and inequalities such as a^x < b, giving exact or 3-significant-figure answers.",
  "concepts": ["amaths.functions.logarithms"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

A logarithm answers the question "what power?". If an investment grows by 8% a year, how many years until it doubles? If a borehole pump loses 5% efficiency every year, when does it drop below half its original output? The unknown is an **index**, and logarithms are the tool that brings it down to solve for it.

ZIMSEC Pure Mathematics (Form 5) asks you to solve equations $a^{x} = b$ and inequalities $a^{x} < b$ or $a^{x} > b$ using logarithms. Cambridge 9709 examines the relationship between logarithms and indices, the laws of logarithms (but **not** the change of base formula) and the same equations and inequalities in Papers 2 and 3. You need the laws of indices and the previous lesson on $\mathrm{e}^{x}$ and $\ln x$.

## Key definitions

:::definition{term="Logarithm"}
For $a > 0$, $a \neq 1$ and $x > 0$:
$$
\log_{a} x = n \iff a^{n} = x
$$
So $\log_{2} 32 = 5$ because $2^{5} = 32$. $\lg x$ means $\log_{10} x$ and $\ln x$ means $\log_{\mathrm{e}} x$.
:::

:::formula{name="Laws of logarithms (same base a)"}
$$
\log_{a}(xy) = \log_{a} x + \log_{a} y
$$

$$
\log_{a}\left(\frac{x}{y}\right) = \log_{a} x - \log_{a} y
$$

$$
\log_{a}\left(x^{k}\right) = k\log_{a} x
$$

$$
\log_{a} a = 1, \qquad \log_{a} 1 = 0
$$

These are not printed in MF19; learn them.
:::

:::formula{name="Change of base (ZIMSEC)"}
$$
\log_{a} x = \frac{\log_{b} x}{\log_{b} a}
$$

Cambridge 9709 excludes this formula; ZIMSEC does not mention it, so it may be useful there.
:::

## Using the laws

Each law comes from a law of indices. For example, if $x = a^{p}$ and $y = a^{q}$, then $xy = a^{p+q}$, so $\log_{a}(xy) = p + q = \log_{a} x + \log_{a} y$.

:::worked-solution[Example 1: express $2\lg 3 + \lg 4 - \lg 6$ as a single logarithm]
1. Power law first: $2\lg 3 = \lg 3^{2} = \lg 9$.
2. Add: $\lg 9 + \lg 4 = \lg 36$.
3. Subtract: $\lg 36 - \lg 6 = \lg \dfrac{36}{6} = \lg 6$.
:::

## Equations with the unknown in the index

If the two sides cannot be written as powers of the same base, take logarithms of both sides (any base, usually $\ln$ or $\lg$) and use the power law to bring the unknown down.

:::worked-solution[Example 2: solve $5^{x+1} = 2^{3x - 1}$, giving $x$ to 3 significant figures]
1. Take $\ln$ of both sides: $(x + 1)\ln 5 = (3x - 1)\ln 2$.
2. Expand: $x\ln 5 + \ln 5 = 3x\ln 2 - \ln 2$.
3. Collect the $x$ terms: $x(3\ln 2 - \ln 5) = \ln 5 + \ln 2$.
4. Simplify with the laws: $3\ln 2 - \ln 5 = \ln\frac{8}{5}$ and $\ln 5 + \ln 2 = \ln 10$, so $x = \dfrac{\ln 10}{\ln 1.6}$.
5. $x = \dfrac{2.30259\ldots}{0.47000\ldots} = 4.899\ldots = 4.90$ (3 s.f.).
:::

Step 4 gives an exact form, which some questions ask for. Notice how the brackets in step 1 matter: $\ln 5^{x+1} = (x + 1)\ln 5$, not $x + \ln 5$.

## Inequalities

Logarithms with base greater than 1 are increasing functions, so taking logarithms keeps an inequality the right way round. But dividing by a **negative** logarithm, such as $\ln 0.8$, reverses it.

:::worked-solution[Example 3: find the least integer $n$ for which $0.8^{n} < 0.1$]
1. Take $\ln$: $n\ln 0.8 < \ln 0.1$.
2. $\ln 0.8 = -0.2231\ldots$ is negative, so dividing reverses the sign: $n > \dfrac{\ln 0.1}{\ln 0.8}$.
3. $\dfrac{\ln 0.1}{\ln 0.8} = 10.31\ldots$, so $n > 10.31\ldots$
4. The least integer is $n = 11$. Check: $0.8^{10} = 0.107 > 0.1$ and $0.8^{11} = 0.0859 < 0.1$.
:::

![Graph of y = 0.8^n with the line y = 0.1: the curve crosses the line at n = 10.32, so 0.8^10 = 0.107 is still above 0.1 and 0.8^11 = 0.0859 is below, giving least integer n = 11.](media:diagrams/decay-curve-08-to-the-n.png "Figure: the decay curve y = 0.8ⁿ crosses y = 0.1 at n = 10.31, so the least whole n is 11")

This is the typical depreciation question: "a machine loses 20% of its value each year; after how many whole years is it worth less than 10% of its original value?"

## Logarithmic equations

Combine the logarithms into one using the laws, convert to index form, solve, and **check the domain**: every logarithm in the original equation must have a positive argument.

:::worked-solution[Example 4: solve $\log_{2}(x + 2) + \log_{2}(x - 2) = 5$]
1. Combine: $\log_{2}\big[(x + 2)(x - 2)\big] = 5$.
2. Index form: $(x + 2)(x - 2) = 2^{5} = 32$, so $x^{2} - 4 = 32$.
3. $x^{2} = 36$, so $x = 6$ or $x = -6$.
4. $x = -6$ makes $x + 2 = -4 < 0$, so $\log_{2}(x + 2)$ is undefined: reject it.
5. Answer: $x = 6$. Check: $\log_{2} 8 + \log_{2} 4 = 3 + 2 = 5$.
:::

:::worked-solution[Example 5: change of base (ZIMSEC): evaluate $\log_{3} 20$]
1. $\log_{3} 20 = \dfrac{\ln 20}{\ln 3}$.
2. $= \dfrac{2.99573\ldots}{1.09861\ldots} = 2.727\ldots = 2.73$ (3 s.f.).
3. Check: $3^{2.727} \approx 20$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine the laws of logarithms, equations $a^{x} = b$, inequalities $a^{x} < b$ and logarithmic equations. Cambridge (Papers 2 and 3) excludes the change of base formula, so a Cambridge question can always be done by taking $\ln$ or $\lg$ of both sides. ZIMSEC does not exclude it.
:::

## Common mistakes

:::mistake{title="Inventing a law for sums"}
$\log(x + y)$ is **not** $\log x + \log y$. The addition law is for a product: $\log(xy) = \log x + \log y$.
:::

:::mistake{title="Dividing logarithms wrongly"}
$\dfrac{\ln 10}{\ln 2}$ is not $\ln 5$. Only $\ln 10 - \ln 2$ equals $\ln 5$.
:::

:::mistake{title="Forgetting to reverse the inequality"}
$\ln 0.8 < 0$. Dividing $n\ln 0.8 < \ln 0.1$ by it reverses the sign, giving $n > 10.31$, not $n < 10.31$.
:::

:::mistake{title="Keeping an invalid root"}
Always substitute back into the **original** logarithmic equation. A root that makes any argument zero or negative must be rejected.
:::

## Exam tips

:::exam-tip
"Give your answer in the form $\frac{\ln a}{\ln b}$" asks for an exact answer: combine the logarithms with the laws before dividing.
:::

:::exam-tip
In a "least integer" question, state the inequality for $n$, then the integer, and show a check with the two neighbouring integers.
:::

:::exam-tip
Work to at least 4 significant figures in intermediate steps and round only at the end.
:::

## Summary

:::summary
- $\log_{a} x = n \iff a^{n} = x$; $\log_{a} a = 1$, $\log_{a} 1 = 0$.
- $\log(xy) = \log x + \log y$; $\log\frac{x}{y} = \log x - \log y$; $\log x^{k} = k\log x$.
- Solve $a^{f(x)} = b^{g(x)}$ by taking logarithms of both sides and collecting the $x$ terms.
- When dividing an inequality by the logarithm of a number less than 1, reverse the sign.
- Check every solution of a logarithmic equation in the original equation.
:::
