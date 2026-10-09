---
{
  "key": "logs.equations",
  "title": "Exponential and logarithmic equations",
  "summary": "Solve equations such as aˣ = b and equations with different bases by taking logarithms, solve equations with e and ln, solve logarithmic equations with the laws and reject values that make a logarithm undefined, and use exponential growth and decay models.",
  "concepts": ["amath.logs.equations"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

How many years will it take for a town near Chinhoyi to grow from 1,800 to 3,000 people if it grows by 3.5% a year? How long until a hot pot of sadza cools to room temperature, or until half of a radioactive sample has decayed? In each case the unknown is an **index**, so ordinary algebra cannot reach it. Logarithms bring the index down so that you can solve for it.

This lesson builds on the laws of logarithms. Both ZIMSEC and Cambridge set equations of the form $a^x = b$; equations with $\mathrm{e}$ and $\ln$ and logarithmic equations that need the laws appear regularly, often as the "hence" part of a longer question.

## Key definitions

:::definition{term="Exponential equation"}
An equation in which the unknown appears in an index, for example $5^x = 40$ or $2^{x+1} = 3^x$.
:::

:::definition{term="Logarithmic equation"}
An equation in which the unknown appears inside a logarithm, for example $\log_3 (x + 8) + \log_3 x = 2$.
:::

:::definition{term="Exact answer"}
An answer left in terms of logarithms, $\mathrm{e}$ or surds, such as $x = \frac{\ln 7}{2}$, rather than a rounded decimal.
:::

:::formula{name="Key results (not in the List of formulas)"}
$$
a^x = b \iff x = \log_a b = \frac{\lg b}{\lg a} = \frac{\ln b}{\ln a}
$$

$$
\mathrm{e}^{x} = k \iff x = \ln k \qquad (k > 0)
$$

$$
\ln x = k \iff x = \mathrm{e}^{k}
$$
:::

## Equations of the form $a^x = b$

Take logarithms of both sides (base 10 or base $\mathrm{e}$, whichever your calculator has) and use the power law to bring the index down. If both sides are powers of the same number, you may not need a calculator at all: $8^x = 32$ is $2^{3x} = 2^5$, so $x = \frac{5}{3}$.

:::worked-solution[Example 1: solve $5^x = 40$, giving $x$ correct to 3 significant figures]
1. Take logarithms of both sides: $\lg 5^x = \lg 40$.
2. Power law: $x \lg 5 = \lg 40$.
3. $x = \dfrac{\lg 40}{\lg 5} = \dfrac{1.6020\ldots}{0.6989\ldots} = 2.2920\ldots$
4. $x = 2.29$ (3 s.f.). Check: $5^{2.29} \approx 39.9$.
:::

The exact answer is $x = \dfrac{\lg 40}{\lg 5}$, or equally $\log_5 40$. Note that $\dfrac{\lg 40}{\lg 5}$ is **not** $\lg 8$: you divide the logarithms, not the numbers.

## Different bases

When the bases are different and cannot be written as powers of one number, take logarithms of both sides, expand the brackets and collect the terms in $x$.

:::worked-solution[Example 2: solve $2^{x+1} = 3^x$, giving $x$ correct to 3 significant figures]
1. Take natural logarithms: $(x + 1)\ln 2 = x\ln 3$.
2. Expand: $x\ln 2 + \ln 2 = x\ln 3$.
3. Collect the $x$ terms: $\ln 2 = x\ln 3 - x\ln 2 = x(\ln 3 - \ln 2)$.
4. $x = \dfrac{\ln 2}{\ln 3 - \ln 2} = \dfrac{\ln 2}{\ln 1.5} = 1.7095\ldots$, so $x = 1.71$ (3 s.f.).
:::

## Equations with e and ln

The functions $\mathrm{e}^x$ and $\ln x$ undo each other: $\ln(\mathrm{e}^k) = k$ and $\mathrm{e}^{\ln k} = k$. Isolate the exponential or the logarithm first, then apply the other function.

:::worked-solution[Example 3: solve (a) $3\mathrm{e}^{2x} - 5 = 16$, (b) $\ln(2x - 1) = 3$]
1. (a) Isolate the exponential: $3\mathrm{e}^{2x} = 21$, so $\mathrm{e}^{2x} = 7$.
2. Take $\ln$: $2x = \ln 7$, so $x = \frac{1}{2}\ln 7$ exactly, or $x = 0.973$ (3 s.f.).
3. (b) Apply $\mathrm{e}$ to both sides: $2x - 1 = \mathrm{e}^3$.
4. $x = \dfrac{\mathrm{e}^3 + 1}{2} = 10.54\ldots$, so $x = 10.5$ (3 s.f.).
:::

## Logarithmic equations

Use the laws to combine the logarithms into a **single** logarithm on each side, then convert to index form. Finally, **check every solution** in the original equation: a logarithm of zero or a negative number is undefined, so some algebraic solutions must be rejected.

:::worked-solution[Example 4: solve $\log_3 (x + 8) + \log_3 x = 2$]
1. Product law: $\log_3 \left[x(x + 8)\right] = 2$.
2. Index form: $x(x + 8) = 3^2 = 9$.
3. Rearrange: $x^2 + 8x - 9 = 0$, so $(x + 9)(x - 1) = 0$ and $x = -9$ or $x = 1$.
4. Check: $x = -9$ gives $\log_3(-9)$, which is undefined, so reject it.
5. $x = 1$: $\log_3 9 + \log_3 1 = 2 + 0 = 2$. The solution is $x = 1$.
:::

When the bases differ, change them to one base first.

:::worked-solution[Example 5: solve $\log_2 x + \log_4 x = 6$]
1. Change base: $\log_4 x = \dfrac{\log_2 x}{\log_2 4} = \frac{1}{2}\log_2 x$.
2. So $\log_2 x + \frac{1}{2}\log_2 x = 6$, that is $\frac{3}{2}\log_2 x = 6$.
3. $\log_2 x = 4$, so $x = 2^4 = 16$.
4. Check: $\log_2 16 + \log_4 16 = 4 + 2 = 6$.
:::

## Growth and decay

A quantity that grows or decays by a fixed percentage each period follows $N = N_0 \times r^t$; continuous growth or decay is written $N = N_0\mathrm{e}^{kt}$ ($k > 0$ for growth, $k < 0$ for decay). Finding the **time** needs logarithms.

:::worked-solution[Example 6: a town has 1,800 people and grows by 3.5% a year, so after $t$ years its population is $N = 1800 \times 1.035^t$. After how many complete years does the population first exceed 3,000?]
1. Solve $1800 \times 1.035^t = 3000$: $1.035^t = \frac{3000}{1800} = \frac{5}{3}$.
2. Take logarithms: $t \ln 1.035 = \ln \frac{5}{3}$, so $t = \dfrac{\ln (5/3)}{\ln 1.035} = 14.84\ldots$
3. The population passes 3,000 during the 15th year. Check: $t = 14$ gives about 2,914 and $t = 15$ gives about 3,016.
4. Answer: after 15 complete years.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards set $a^x = b$ and logarithmic equations that need the laws. Cambridge Paper 1 (no calculator) asks for exact answers such as $x = \frac{\ln 7}{2}$ or uses numbers that are powers of one base; Paper 2 asks for 3 significant figures. Equations that become quadratics in $\mathrm{e}^x$ or $2^x$ are covered in the lesson on substitution.
:::

## Common mistakes

:::mistake{title="Dividing the numbers instead of the logarithms"}
From $x\lg 5 = \lg 40$, $x = \frac{\lg 40}{\lg 5}$, which is not $\lg 8$ and not $\frac{40}{5}$. Keep the logarithms until you divide on the calculator.
:::

:::mistake{title="Taking logs of each term"}
$\ln(3\mathrm{e}^{2x} - 5)$ is not $\ln 3 + 2x - \ln 5$. Isolate the exponential term first, then take logarithms of both sides.
:::

:::mistake{title="Keeping a solution that makes a logarithm undefined"}
In Example 4 the quadratic gives $x = -9$, but $\log_3 (-9)$ does not exist. Always substitute back and reject such values, with a reason.
:::

:::mistake{title="Rounding too early"}
Rounding $\ln 1.5$ to $0.41$ in Example 2 gives $x = 1.69$, which loses the accuracy mark. Keep full calculator values until the last step.
:::

## Exam tips

:::exam-tip
"Give your answer correct to 3 significant figures" means a decimal; "find the exact value" means an expression such as $\frac{1}{2}\ln 7$. Read which one is asked for.
:::

:::exam-tip
In a logarithmic equation, write a line such as "$x = -9$ is rejected since $\log_3(-9)$ is undefined". Examiners often reserve the final mark for this.
:::

:::exam-tip
In growth problems, answer the question asked: a time in years to 3 significant figures, or the first whole number of years, as in Example 6.
:::

## Summary

:::summary
- Solve $a^x = b$ by taking logarithms: $x = \frac{\lg b}{\lg a} = \frac{\ln b}{\ln a}$.
- With different bases, take logarithms, expand, collect the $x$ terms and factorise.
- $\mathrm{e}^x$ and $\ln x$ undo each other: isolate one, then apply the other.
- For logarithmic equations, combine into a single logarithm, convert to index form, solve, then reject any value that makes a logarithm undefined.
- Growth and decay: $N = N_0 r^t$ or $N = N_0 \mathrm{e}^{kt}$; solve for $t$ with logarithms and answer in the units asked.
:::
