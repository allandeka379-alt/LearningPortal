---
{
  "key": "coordinate.linear-law",
  "title": "Reducing relationships to straight-line form",
  "summary": "Transform relationships such as y = Axⁿ, y = Abˣ and y = A/x + B into the straight-line form Y = mX + c, find the unknown constants from the gradient and intercept, and convert a given straight-line graph back into an equation connecting x and y.",
  "concepts": ["amath.coordinate.linear-law"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Scientists rarely get straight lines from their experiments. The yield of a maize plot against the amount of fertiliser, the number of bacteria against time, the period of a pendulum against its length: these give curves. A curve is hard to read accurately, but a straight line is easy: its gradient and intercept can be measured from a graph or calculated from two points.

The trick is to change the variables you plot. If $y = Ax^n$, a graph of $y$ against $x$ is curved, but a graph of $\lg y$ against $\lg x$ is a **straight line** whose gradient is $n$. This topic is in the Cambridge 0606 syllabus (it is not in the ZIMSEC syllabus). It uses the laws of logarithms and the equation of a straight line, so revise both first.

## Key definitions

:::definition{term="Straight-line form"}
An equation written as $Y = mX + c$, where $X$ and $Y$ are expressions in $x$ and $y$ (such as $\lg x$, $x^2$ or $\frac{y}{x}$) and $m$ and $c$ are constants. Plotting $Y$ against $X$ gives a straight line with gradient $m$ and $Y$-intercept $c$.
:::

:::definition{term="Plotting Y against X"}
$Y$ goes on the vertical axis and $X$ on the horizontal axis. "Plot $\lg y$ against $x$" means $\lg y$ is vertical.
:::

:::formula{name="Common transformations (not in the List of formulas)"}
$$
y = Ax^n \;\Rightarrow\; \lg y = n\lg x + \lg A
$$

$$
y = Ab^x \;\Rightarrow\; \lg y = (\lg b)x + \lg A
$$

$$
y = \frac{a}{x} + b \;\Rightarrow\; y = a\left(\frac{1}{x}\right) + b
$$
:::

## Choosing the variables

Rearrange the relationship so that it looks like $Y = mX + c$: the **unknown constants** must end up only in $m$ and $c$, and $X$ and $Y$ must contain only $x$ and $y$.

| Relationship | Plot $Y$ | against $X$ | gradient | intercept |
| --- | --- | --- | --- | --- |
| $y = Ax^n$ | $\lg y$ | $\lg x$ | $n$ | $\lg A$ |
| $y = Ab^x$ | $\lg y$ | $x$ | $\lg b$ | $\lg A$ |
| $y = \frac{a}{x} + b$ | $y$ | $\frac{1}{x}$ | $a$ | $b$ |
| $y = ax^2 + bx$ | $\frac{y}{x}$ | $x$ | $a$ | $b$ |
| $xy = ax + b$ | $xy$ | $x$ | $a$ | $b$ |

Natural logarithms work just as well as $\lg$; if you plot $\ln y$, the intercept is $\ln A$ and you recover $A = \mathrm{e}^{c}$.

## Finding the constants from the line

Once you have two points on the line (read from a graph, or given), find the gradient $m$ and intercept $c$ in the usual way, then **undo the transformation** to get the original constants.

:::worked-solution[Example 1: the variables satisfy $y = Ax^n$. The graph of $\lg y$ against $\lg x$ is a straight line through $(0.2, 1.1)$ and $(0.8, 2.6)$. Find $n$ and $A$]
1. Taking logarithms: $\lg y = n\lg x + \lg A$, so the gradient is $n$ and the intercept is $\lg A$.
2. Gradient: $n = \dfrac{2.6 - 1.1}{0.8 - 0.2} = \dfrac{1.5}{0.6} = 2.5$.
3. Intercept: $1.1 = 2.5(0.2) + \lg A$, so $\lg A = 0.6$.
4. $A = 10^{0.6} = 3.98$ (3 s.f.). So $y = 3.98x^{2.5}$.
:::

![Straight-line graph of lg y against lg x through (0.2, 1.1) and (0.8, 2.6): the gradient 1.5 divided by 0.6 is 2.5, which is the power n, and the intercept on the vertical axis is 0.6, which is lg A.](media:diagrams/linear-law-lg-graph.png "Figure: for y = Axⁿ the line of lg y against lg x has gradient n and intercept lg A")

:::worked-solution[Example 2: the variables satisfy $y = Ab^x$. The graph of $\ln y$ against $x$ is a straight line through $(1, 2.3)$ and $(4, 3.5)$. Find $A$ and $b$]
1. Taking natural logarithms: $\ln y = (\ln b)x + \ln A$.
2. Gradient: $\ln b = \dfrac{3.5 - 2.3}{4 - 1} = 0.4$, so $b = \mathrm{e}^{0.4} = 1.49$ (3 s.f.).
3. Intercept: $2.3 = 0.4(1) + \ln A$, so $\ln A = 1.9$ and $A = \mathrm{e}^{1.9} = 6.69$ (3 s.f.).
:::

Notice that in Example 1 the gradient **is** the constant $n$, while in Example 2 the gradient is $\ln b$, so you must exponentiate it. Always write down what the gradient and intercept represent before calculating.

:::worked-solution[Example 3: the graph of $y$ against $\frac{1}{x}$ is a straight line through $(0.5, 7)$ and $(2, 1)$. Find $y$ in terms of $x$]
1. Here $Y = y$ and $X = \frac{1}{x}$, so $y = m\left(\frac{1}{x}\right) + c$.
2. Gradient: $m = \dfrac{1 - 7}{2 - 0.5} = \dfrac{-6}{1.5} = -4$.
3. Intercept: $7 = -4(0.5) + c$, so $c = 9$.
4. Therefore $y = -\dfrac{4}{x} + 9$.
:::

## Converting a straight line back

Sometimes you are told the line and must find the relationship between $x$ and $y$. Write $Y = mX + c$ with the given $X$ and $Y$, then make $y$ the subject.

:::worked-solution[Example 4: (a) the graph of $y^2$ against $x^3$ is a straight line with gradient 2 through $(1, 5)$; (b) the graph of $\mathrm{e}^{2y}$ against $x^2$ has gradient 3 and intercept 1. Find $y$ in terms of $x$ in each case]
1. (a) $y^2 = 2x^3 + c$. At $X = 1$, $Y = 5$: $5 = 2 + c$, so $c = 3$ and $y^2 = 2x^3 + 3$.
2. Hence $y = \pm\sqrt{2x^3 + 3}$ (take the sign that matches the context).
3. (b) $\mathrm{e}^{2y} = 3x^2 + 1$.
4. Take $\ln$: $2y = \ln(3x^2 + 1)$, so $y = \frac{1}{2}\ln(3x^2 + 1)$.
:::

## Working from a table of values

In a full question you are given a table of $x$ and $y$, asked to complete a table of $X$ and $Y$, draw the line of best fit and use it. Use two points far apart **on your line** (not two data points that happen to lie off it) for the gradient.

:::worked-solution[Example 5: it is thought that $y = ax^2 + bx$. Use the data to find $a$ and $b$]
Data:

| $x$ | $1$ | $2$ | $3$ | $4$ | $5$ |
| --- | --- | --- | --- | --- | --- |
| $y$ | $3.5$ | $8$ | $13.5$ | $20$ | $27.5$ |
| $\frac{y}{x}$ | $3.5$ | $4$ | $4.5$ | $5$ | $5.5$ |

1. Divide by $x$: $\frac{y}{x} = ax + b$, so plot $\frac{y}{x}$ against $x$.
2. The values of $\frac{y}{x}$ go up by $0.5$ for each step of 1 in $x$: the points lie on a straight line with gradient $a = 0.5$.
3. Intercept: $3.5 = 0.5(1) + b$, so $b = 3$.
4. The relationship is $y = 0.5x^2 + 3x$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
This topic is examined by Cambridge only (0606 topic 7.4). Cambridge usually sets it on Paper 2 with a calculator: values of $A$ and $b$ to 3 significant figures. On Paper 1 the numbers are chosen to give exact answers such as $A = 10^{0.5} = \sqrt{10}$.
:::

## Common mistakes

:::mistake{title="Using the gradient as b instead of lg b"}
For $y = Ab^x$ the gradient of $\lg y$ against $x$ is $\lg b$. You must then find $b = 10^{m}$ (or $\mathrm{e}^{m}$ with $\ln$).
:::

:::mistake{title="Forgetting to undo the logarithm for A"}
The intercept is $\lg A$, not $A$. In Example 1 the intercept $0.6$ gives $A = 10^{0.6} = 3.98$.
:::

:::mistake{title="Reading the intercept where the line is not at X = 0"}
The intercept $c$ is the value of $Y$ when $X = 0$. If your graph's horizontal axis does not start at zero, calculate $c$ from $Y = mX + c$ with a point on the line.
:::

:::mistake{title="Plotting the axes the wrong way round"}
"$\lg y$ against $x$" puts $\lg y$ on the vertical axis. Swapping the axes inverts the gradient.
:::

## Exam tips

:::exam-tip
Begin with the transformed equation, for example "$\lg y = n\lg x + \lg A$, so gradient $= n$ and intercept $= \lg A$". This earns the method mark and tells you what to do next.
:::

:::exam-tip
When completing a table of $\lg x$ or $\ln y$ values, give them to 2 or 3 decimal places as the question asks, and keep that accuracy throughout.
:::

:::exam-tip
After finding the constants, check one original data point in your equation. A large disagreement means a slip with logarithms.
:::

## Summary

:::summary
- Rearrange a relationship into $Y = mX + c$ with the unknown constants only in $m$ and $c$.
- $y = Ax^n$: plot $\lg y$ against $\lg x$; gradient $n$, intercept $\lg A$.
- $y = Ab^x$: plot $\lg y$ against $x$; gradient $\lg b$, intercept $\lg A$.
- Find $m$ and $c$ from two points on the line, then undo the transformation ($A = 10^c$ or $\mathrm{e}^c$).
- To convert back, write $Y = mX + c$ with the given $X$ and $Y$ and make $y$ the subject.
:::
