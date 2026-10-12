---
{
  "key": "de.separable",
  "title": "First-order differential equations with separable variables",
  "summary": "Turn a statement about a rate of change into a differential equation, solve first-order equations by separating the variables, find particular solutions from initial conditions, interpret solutions in context and sketch families of solution curves.",
  "concepts": ["amaths.de.separable"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

Many laws of nature are statements about **rates**. A cup of tea cools at a rate proportional to how much hotter it is than the room. A population of fish in Lake Kariba grows at a rate proportional to its size. Water drains from a tank at a rate proportional to the square root of its depth. Each statement gives an equation involving a derivative, a **differential equation**, and solving it tells us the quantity itself at any time.

This lesson covers first-order equations whose variables can be separated: the only kind examined at A Level. Cambridge examines them in Paper 3 (A Level only, topic 3.8), often combined with partial fractions or integration by parts. ZIMSEC examines them in Pure Mathematics Form 6 (topic 6.5.3), including sketching members of the family of solution curves.

## Key definitions

:::definition{term="First-order differential equation"}
An equation involving $x$, $y$ and $\frac{\mathrm{d}y}{\mathrm{d}x}$ (but no higher derivatives), such as $\frac{\mathrm{d}y}{\mathrm{d}x} = xy$.
:::

:::definition{term="Separable variables"}
The equation can be written $\frac{\mathrm{d}y}{\mathrm{d}x} = f(x)g(y)$: the right-hand side is a function of $x$ multiplied by a function of $y$.
:::

:::definition{term="General and particular solutions"}
The **general solution** contains an arbitrary constant and describes a whole family of curves. A **particular solution** uses a given condition (an initial condition such as $y = 2$ when $x = 0$) to fix the constant.
:::

:::formula{name="Separating the variables"}
$$
\frac{\mathrm{d}y}{\mathrm{d}x} = f(x)g(y) \quad\Rightarrow\quad \int \frac{1}{g(y)}\,\mathrm{d}y = \int f(x)\,\mathrm{d}x
$$
:::

Neither MF19 nor the ZIMSEC syllabus prints this; the integrals themselves may use any technique you know (standard integrals, substitution, partial fractions, parts).

## Forming a differential equation

Translate the words carefully. "The rate of change of $N$" is $\frac{\mathrm{d}N}{\mathrm{d}t}$. "Proportional to" introduces a constant $k$. "Decreasing" means the rate is negative, so either write $-k$ with $k > 0$ or say that $k$ will turn out negative.

| Statement | Differential equation |
| --- | --- |
| $N$ increases at a rate proportional to $N$ | $\frac{\mathrm{d}N}{\mathrm{d}t} = kN$ |
| $T$ decreases at a rate proportional to the excess of $T$ over 20 | $\frac{\mathrm{d}T}{\mathrm{d}t} = -k(T - 20)$ |
| $h$ decreases at a rate proportional to $\sqrt{h}$ | $\frac{\mathrm{d}h}{\mathrm{d}t} = -k\sqrt{h}$ |
| the gradient at $(x, y)$ is $\frac{x}{y^2}$ | $\frac{\mathrm{d}y}{\mathrm{d}x} = \frac{x}{y^2}$ |

## Solving by separating the variables

1. Rearrange so all the $y$ terms (with $\mathrm{d}y$) are on one side and all the $x$ terms (with $\mathrm{d}x$) on the other.
2. Integrate both sides; add **one** constant, on the $x$ side.
3. Use the given condition to find the constant.
4. If asked, make $y$ the subject.

:::worked-solution[Example 1: solve $\dfrac{\mathrm{d}y}{\mathrm{d}x} = xy$, given that $y = 2$ when $x = 0$, expressing $y$ in terms of $x$]
1. Separate: $\displaystyle\int \frac{1}{y}\,\mathrm{d}y = \int x\,\mathrm{d}x$.
2. Integrate: $\ln|y| = \frac{1}{2}x^2 + c$.
3. At $x = 0$, $y = 2$: $\ln 2 = c$.
4. So $\ln y = \frac{1}{2}x^2 + \ln 2$, and $y = \mathrm{e}^{\frac{1}{2}x^2 + \ln 2} = 2\mathrm{e}^{\frac{1}{2}x^2}$.
5. Check: $\frac{\mathrm{d}y}{\mathrm{d}x} = 2x\mathrm{e}^{\frac{1}{2}x^2} = xy$.
:::

![Family of solution curves y = A e^(x^2/2) of dy/dx = xy for A = 0.5, 1, 2 and 3: each curve is symmetrical about the y-axis with a minimum at x = 0, and the initial condition y = 2 when x = 0 picks out the single curve y = 2 e^(x^2/2).](media:diagrams/solution-curves-dy-dx-equals-xy.png "Figure: the general solution is a family of curves; y = 2 at x = 0 selects A = 2")

Step 4 shows a useful trick: writing the constant as $\ln A$ lets you combine logarithms, so $\ln y = \frac{1}{2}x^2 + \ln A$ becomes $y = A\mathrm{e}^{\frac{1}{2}x^2}$ directly.

## Modelling and interpretation

:::worked-solution[Example 2 (exam style): a cup of tea at 90 °C is left in a room at 20 °C. Its temperature $T$ °C after $t$ minutes satisfies $\frac{\mathrm{d}T}{\mathrm{d}t} = -k(T - 20)$. After 5 minutes the temperature is 60 °C. (a) Find $T$ in terms of $t$. (b) Find the time taken to cool to 40 °C. (c) State what happens to $T$ in the long run.]
1. (a) Separate: $\displaystyle\int \frac{1}{T - 20}\,\mathrm{d}T = \int -k\,\mathrm{d}t$, so $\ln(T - 20) = -kt + c$.
2. At $t = 0$, $T = 90$: $c = \ln 70$, so $T - 20 = 70\mathrm{e}^{-kt}$.
3. At $t = 5$, $T = 60$: $40 = 70\mathrm{e}^{-5k}$, so $k = \frac{1}{5}\ln\frac{7}{4} = 0.1119$.
4. Hence $T = 20 + 70\mathrm{e}^{-0.1119t}$.
5. (b) $40 = 20 + 70\mathrm{e}^{-kt}$ gives $\mathrm{e}^{-kt} = \frac{2}{7}$, so $t = \dfrac{\ln 3.5}{k} = 11.2$ minutes.
6. (c) As $t \to \infty$, $\mathrm{e}^{-kt} \to 0$, so $T \to 20$: the tea approaches room temperature but never quite reaches it.
:::

Interpretation questions want a sentence in context, such as "the temperature approaches room temperature", not just "$T \to 20$".

:::worked-solution[Example 3: water drains from a tank so that the depth $h$ m after $t$ minutes satisfies $\frac{\mathrm{d}h}{\mathrm{d}t} = -k\sqrt{h}$. Initially $h = 4$; after 10 minutes $h = 1$. Find when the tank is empty.]
1. Separate: $\displaystyle\int h^{-1/2}\,\mathrm{d}h = \int -k\,\mathrm{d}t$, so $2\sqrt{h} = -kt + c$.
2. $t = 0$, $h = 4$: $c = 4$.
3. $t = 10$, $h = 1$: $2 = -10k + 4$, so $k = 0.2$.
4. Empty when $h = 0$: $0 = -0.2t + 4$, so $t = 20$ minutes.
:::

Notice that the model says the tank empties in a **finite** time, unlike the cooling tea, which only approaches its limit. The form of the differential equation decides this.

## Families of solution curves (ZIMSEC)

Each value of the arbitrary constant gives one curve; together they form a family. To sketch typical members, find the general solution and draw it for two or three values of the constant.

![Concentric circles x^2 + y^2 = 2c centred at the origin, the family of solution curves of dy/dx = -x/y, shown for radii 1, 2 and 3; the short amber segments show the gradient -x/y at points on the circle of radius 2, each perpendicular to the radius.](media:diagrams/solution-curves-circles-minus-x-over-y.png "Figure: the solutions of dy/dx = −x/y are circles about the origin; the gradient is perpendicular to the radius")

For example, $\frac{\mathrm{d}y}{\mathrm{d}x} = -\frac{x}{y}$ separates to $\int y\,\mathrm{d}y = -\int x\,\mathrm{d}x$, so $\frac{1}{2}y^2 = -\frac{1}{2}x^2 + c$, i.e. $x^2 + y^2 = 2c$. The family is a set of circles centred at the origin; the condition $y = 3$ at $x = 0$ picks out the circle of radius 3. Similarly, $\frac{\mathrm{d}y}{\mathrm{d}x} = ky$ gives the family $y = A\mathrm{e}^{kx}$: exponential curves through $(0, A)$.

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge: A Level only (Paper 3, topic 3.8); questions often need partial fractions or integration by parts on one side, and finish with an interpretation. ZIMSEC (Form 6) examines the same skills and also asks you to sketch typical members of the family of solution curves.
:::

## Common mistakes

:::mistake{title="Forgetting the constant, or adding it too late"}
Add $+c$ as soon as you integrate. Adding it after taking exponentials gives $y = \mathrm{e}^{x^2/2} + c$, which is wrong.
:::

:::mistake{title="Splitting a sum"}
$\frac{\mathrm{d}y}{\mathrm{d}x} = x + y$ is **not** separable: you cannot write $x + y$ as $f(x)g(y)$.
:::

:::mistake{title="Wrong sign for a decrease"}
"Decreases at a rate proportional to $\sqrt{h}$" is $\frac{\mathrm{d}h}{\mathrm{d}t} = -k\sqrt{h}$ with $k > 0$.
:::

:::mistake{title="Exponentiating term by term"}
From $\ln y = x^2 + c$, $y = \mathrm{e}^{x^2 + c} = A\mathrm{e}^{x^2}$, not $\mathrm{e}^{x^2} + \mathrm{e}^{c}$.
:::

## Exam tips

:::exam-tip
Show the separated integral $\int \ldots\,\mathrm{d}y = \int \ldots\,\mathrm{d}x$ explicitly: it earns the first method mark.
:::

:::exam-tip
Use the initial condition before rearranging when the algebra is messy; you can find the constant straight from the log form.
:::

:::exam-tip
"Explain what happens as $t$ becomes large" needs a limit **and** a sentence in the context of the model.
:::

## Summary

:::summary
- "Rate of change of $y$" is $\frac{\mathrm{d}y}{\mathrm{d}t}$; "proportional to" introduces a constant $k$.
- If $\frac{\mathrm{d}y}{\mathrm{d}x} = f(x)g(y)$, then $\int \frac{1}{g(y)}\,\mathrm{d}y = \int f(x)\,\mathrm{d}x + c$.
- The general solution is a family of curves; an initial condition gives a particular solution.
- Write constants as $\ln A$ to combine logarithms neatly.
- Interpret limits and long-term behaviour in the context of the model.
:::
