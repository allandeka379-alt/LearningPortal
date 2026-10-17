---
{
  "key": "functions.linear-law",
  "title": "Reducing relationships to linear form",
  "summary": "Use logarithms to turn y = kx^n and y = ka^x into straight-line graphs, use other substitutions such as y against x^2, and find the unknown constants from the gradient and intercept of a line.",
  "concepts": ["amaths.functions.linear-law"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Scientists rarely know the formula behind their data in advance. A researcher measuring how the yield of a maize variety depends on fertiliser, or how quickly a disease spreads through a herd, suspects a power law or an exponential law, but a curve on a graph is hard to judge by eye. A **straight line** is easy to judge, and its gradient and intercept are easy to measure. The trick is to change the variables so that the suspected law becomes a straight line.

ZIMSEC Pure Mathematics (Form 5) asks you to use logarithms to transform a given relationship to linear form and find unknown constants, and to reduce equations such as $y = ax^{2} + b$ to linear form by plotting $y$ against $x^{2}$. Cambridge 9709 (Papers 2 and 3) examines the logarithmic cases: $\ln y$ against $\ln x$ and $\ln y$ against $x$. You need the laws of logarithms and the equation of a straight line.

## Key definitions

:::definition{term="Linear form"}
An equation written as $Y = mX + c$, where $Y$ and $X$ are expressions in the original variables (such as $\ln y$ and $\ln x$). Plotting $Y$ against $X$ gives a straight line with gradient $m$ and $Y$-intercept $c$.
:::

:::formula{name="The two logarithmic forms"}
$$
y = kx^{n} \;\Rightarrow\; \ln y = n\ln x + \ln k \qquad (\text{plot } \ln y \text{ against } \ln x)
$$

$$
y = ka^{x} \;\Rightarrow\; \ln y = (\ln a)x + \ln k \qquad (\text{plot } \ln y \text{ against } x)
$$

The same works with $\lg$ instead of $\ln$. Not in MF19.
:::

:::formula{name="Other linear forms (ZIMSEC)"}
| Relationship | Plot | Gradient | Intercept |
| :--- | :--- | :--- | :--- |
| $y = ax^{2} + b$ | $y$ against $x^{2}$ | $a$ | $b$ |
| $y = \dfrac{a}{x} + b$ | $y$ against $\dfrac{1}{x}$ | $a$ | $b$ |
| $xy = ax + b$ | $xy$ against $x$ | $a$ | $b$ |
| $y = ax + bx^{2}$ | $\dfrac{y}{x}$ against $x$ | $b$ | $a$ |
:::

## The method

1. Take logarithms (or divide, or substitute) to get the form $Y = mX + c$.
2. Identify which quantities go on each axis: $Y$ must contain only known data, and so must $X$.
3. Match the gradient and intercept with the unknown constants.
4. Find the gradient from two points **on the line** (not two raw data points unless they lie on it), then the intercept.
5. Undo the logarithm to get the constants: if $\ln k = c$, then $k = \mathrm{e}^{c}$.

## Power laws: y = kx^n

:::worked-solution[Example 1: a line of $\ln y$ against $\ln x$ passes through $(0.5, 2.1)$ and $(2.0, 4.8)$. Find $n$ and $k$ in $y = kx^{n}$]
1. Taking logs: $\ln y = n\ln x + \ln k$, so the gradient is $n$ and the intercept is $\ln k$.
2. Gradient: $n = \dfrac{4.8 - 2.1}{2.0 - 0.5} = \dfrac{2.7}{1.5} = 1.8$.
3. Intercept: $2.1 = 1.8(0.5) + \ln k$, so $\ln k = 1.2$.
4. $k = \mathrm{e}^{1.2} = 3.32$ (3 s.f.). So $y = 3.32x^{1.8}$.
:::

![Straight-line graph of ln y against ln x through (0.5, 2.1) and (2.0, 4.8): the gradient 2.7 ÷ 1.5 = 1.8 is the power n and the intercept 1.2 on the ln y axis is ln k, so y = kx^n with n = 1.8 and k = e^1.2 = 3.32.](media:diagrams/linear-law-ln-y-against-ln-x.png "Figure: for y = kxⁿ, a graph of ln y against ln x is a line with gradient n and intercept ln k")

## Exponential laws: y = ka^x

:::worked-solution[Example 2: a line of $\ln y$ against $x$ passes through $(1, 3.2)$ and $(5, 4.4)$. Find $a$ and $k$ in $y = ka^{x}$]
1. Taking logs: $\ln y = x\ln a + \ln k$. The horizontal axis is $x$ itself.
2. Gradient: $\ln a = \dfrac{4.4 - 3.2}{5 - 1} = 0.3$, so $a = \mathrm{e}^{0.3} = 1.35$ (3 s.f.).
3. Intercept: $3.2 = 0.3(1) + \ln k$, so $\ln k = 2.9$ and $k = \mathrm{e}^{2.9} = 18.2$ (3 s.f.).
4. So $y = 18.2 \times 1.35^{x}$.
:::

![Straight-line graph of ln y against x through (1, 3.2) and (5, 4.4): the gradient 1.2 ÷ 4 = 0.3 is ln a and the intercept 2.9 is ln k, so y = ka^x with a = e^0.3 = 1.35 and k = e^2.9 = 18.2.](media:diagrams/linear-law-ln-y-against-x.png "Figure: for y = kaˣ, a graph of ln y against x is a line with gradient ln a and intercept ln k")

The key difference between the two forms is the horizontal axis: $\ln x$ for a power law, $x$ for an exponential law.

## Working from data

In practice you are given a table, you compute the new variables, plot them and draw a line of best fit.

:::worked-solution[Example 3: show that the data fit $y = kx^{n}$ and find $k$ and $n$]
The table shows measurements of two quantities $x$ and $y$:

| $x$ | 2 | 4 | 8 | 16 |
| :--- | :--- | :--- | :--- | :--- |
| $y$ | 8.49 | 24.0 | 67.9 | 192 |

1. Compute $\ln x$: $0.693, 1.386, 2.079, 2.773$; and $\ln y$: $2.138, 3.178, 4.218, 5.257$ (3 d.p.).
2. The increases in $\ln y$ are all $1.040$ for equal steps of $0.693$ in $\ln x$, so the points lie on a straight line: the law fits.
3. Gradient: $n = \dfrac{5.257 - 2.138}{2.773 - 0.693} = \dfrac{3.119}{2.080} = 1.50$ (3 s.f.).
4. Intercept: $\ln k = 2.138 - 1.50 \times 0.693 = 1.099$, so $k = \mathrm{e}^{1.099} = 3.00$.
5. The law is $y = 3x^{1.5}$. Check: $3 \times 4^{1.5} = 24$.
:::

## A non-logarithmic form (ZIMSEC)

:::worked-solution[Example 4: a relationship of the form $y = ax^{2} + b$]
Values of $y$ were recorded: $y = 5$ when $x = 1$, $y = 11$ when $x = 2$, $y = 21$ when $x = 3$ and $y = 35$ when $x = 4$.

1. Plot $Y = y$ against $X = x^{2}$: the points are $(1, 5)$, $(4, 11)$, $(9, 21)$, $(16, 35)$.
2. Gradient using the first and last points: $a = \dfrac{35 - 5}{16 - 1} = \dfrac{30}{15} = 2$.
3. Intercept: $5 = 2(1) + b$, so $b = 3$.
4. The law is $y = 2x^{2} + 3$. Check the middle points: $2(4) + 3 = 11$ and $2(9) + 3 = 21$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge 9709 (Papers 2 and 3) examines the logarithmic forms, usually giving a line through two points on a graph of $\ln y$ against $\ln x$ or against $x$. ZIMSEC also includes non-logarithmic forms such as $y$ against $x^{2}$, and often gives a data table to plot.
:::

## Common mistakes

:::mistake{title="Wrong horizontal axis"}
For $y = ka^{x}$ the horizontal axis is $x$, not $\ln x$. Using $\ln x$ treats it as a power law.
:::

:::mistake{title="Forgetting to undo the logarithm"}
The intercept is $\ln k$, not $k$. If the intercept is $1.2$, then $k = \mathrm{e}^{1.2} = 3.32$, not $1.2$.
:::

:::mistake{title="Gradient is ln a, not a"}
In $\ln y = x\ln a + \ln k$ the gradient is $\ln a$, so $a = \mathrm{e}^{\text{gradient}}$.
:::

:::mistake{title="Mixing lg and ln"}
If the graph uses $\lg y$, then $k = 10^{\text{intercept}}$, not $\mathrm{e}^{\text{intercept}}$.
:::

## Exam tips

:::exam-tip
Start by writing the linear form explicitly, for example "$\ln y = n\ln x + \ln k$, so the gradient is $n$ and the intercept is $\ln k$". This line usually earns the first mark.
:::

:::exam-tip
When reading points from a given line, choose points far apart and clearly on the line; a gradient from close points magnifies reading errors.
:::

:::exam-tip
Give constants to 3 significant figures unless told otherwise, and keep more figures in the working.
:::

## Summary

:::summary
- Change variables so the law becomes $Y = mX + c$; plot $Y$ against $X$.
- $y = kx^{n}$: $\ln y$ against $\ln x$, gradient $n$, intercept $\ln k$.
- $y = ka^{x}$: $\ln y$ against $x$, gradient $\ln a$, intercept $\ln k$.
- ZIMSEC also uses non-log forms: $y$ against $x^{2}$, $y$ against $\frac{1}{x}$, $\frac{y}{x}$ against $x$.
- Undo the logarithms at the end: $k = \mathrm{e}^{c}$ (or $10^{c}$ with $\lg$).
:::
