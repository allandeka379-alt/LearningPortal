---
{
  "key": "functions.exponential-log",
  "title": "Exponential and logarithmic functions: e^x and ln x",
  "summary": "Use the properties and graphs of e^x and ln x as inverse functions, solve equations involving them, and build and interpret exponential growth and decay models.",
  "concepts": ["amaths.functions.exponential-log"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Some quantities change by a fixed **percentage** rather than a fixed amount: a population growing by 4% a year, a tractor losing 15% of its value each year, hot tea cooling faster when it is hotter. These are modelled by exponential functions, and the most natural base is the number $\mathrm{e} \approx 2.71828$. Its inverse, the natural logarithm $\ln x$, is how you find **when** something reaches a given level.

ZIMSEC Pure Mathematics (Form 5) asks you to explain exponential growth and decay and model situations with them. Cambridge 9709 examines $\mathrm{e}^{x}$ and $\ln x$, their graphs and their use in Papers 2 and 3 (topic 2.2 / 3.2). You need the laws of indices; the laws of logarithms are in the next lesson.

## Key definitions

:::definition{term="The exponential function"}
$f(x) = \mathrm{e}^{x}$, $x \in \mathbb{R}$, where $\mathrm{e} = 2.71828\ldots$ Its range is $f(x) > 0$. It is the only exponential function whose gradient at every point equals its value.
:::

:::definition{term="The natural logarithm"}
$\ln x = \log_{\mathrm{e}} x$, defined for $x > 0$. It is the inverse of $\mathrm{e}^{x}$:
$$
y = \mathrm{e}^{x} \iff x = \ln y
$$
:::

:::formula{name="Inverse relationships"}
$$
\mathrm{e}^{\ln x} = x \ (x > 0), \qquad \ln\left(\mathrm{e}^{x}\right) = x, \qquad \ln 1 = 0, \qquad \ln \mathrm{e} = 1
$$

MF19 does not list these; they follow from the definition.
:::

:::definition{term="Exponential growth and decay"}
A model $y = A\mathrm{e}^{kt}$ with $A > 0$. If $k > 0$ it is **growth**; if $k < 0$ it is **decay**. $A$ is the value when $t = 0$.
:::

## The graphs

Because $\ln x$ is the inverse of $\mathrm{e}^{x}$, their graphs are reflections of each other in $y = x$.

![Graphs of y = e^x through (0, 1) with asymptote y = 0, and y = ln x through (1, 0) with asymptote x = 0: they are reflections of each other in the dashed line y = x.](media:diagrams/exp-and-ln-graphs.png "Figure: y = eˣ and y = ln x are reflections in y = x")

| | $y = \mathrm{e}^{x}$ | $y = \ln x$ |
| :--- | :--- | :--- |
| Domain | all real $x$ | $x > 0$ |
| Range | $y > 0$ | all real $y$ |
| Passes through | $(0, 1)$ | $(1, 0)$ |
| Asymptote | $y = 0$ (as $x \to -\infty$) | $x = 0$ (as $x \to 0^{+}$) |
| Behaviour | increasing, ever more steeply | increasing, ever more slowly |

Transformations from the previous lesson apply. For example:

- $y = \mathrm{e}^{-2x} + 3$ is a decreasing curve through $(0, 4)$ with horizontal asymptote $y = 3$;
- $y = \ln(2x - 1)$ exists only for $x > \frac{1}{2}$, has the vertical asymptote $x = \frac{1}{2}$ and crosses the $x$-axis where $2x - 1 = 1$, at $(1, 0)$.

For $y = \mathrm{e}^{kx}$, a positive $k$ gives growth (rising to the right) and a negative $k$ gives decay (falling to the right); a larger $|k|$ makes the curve steeper.

## Solving equations

To undo $\mathrm{e}$, take $\ln$ of both sides; to undo $\ln$, raise $\mathrm{e}$ to both sides.

:::worked-solution[Example 1: solve $\mathrm{e}^{2x - 1} = 7$, giving $x$ to 3 significant figures]
1. Take natural logarithms: $2x - 1 = \ln 7$.
2. So $x = \dfrac{1 + \ln 7}{2}$ (exact form).
3. $\ln 7 = 1.9459\ldots$, so $x = 1.4729\ldots = 1.47$ (3 s.f.).
:::

:::worked-solution[Example 2: solve $\ln(3x + 2) = 4$]
1. Exponentiate: $3x + 2 = \mathrm{e}^{4}$.
2. $x = \dfrac{\mathrm{e}^{4} - 2}{3}$ (exact).
3. $\mathrm{e}^{4} = 54.598\ldots$, so $x = 17.53\ldots = 17.5$ (3 s.f.).
4. Check the domain: $3x + 2 = 54.6 > 0$, so the logarithm is defined.
:::

Equations such as $\mathrm{e}^{2x} - 5\mathrm{e}^{x} + 6 = 0$ are quadratics in $\mathrm{e}^{x}$; remember that $\mathrm{e}^{x} > 0$, so a negative root for $\mathrm{e}^{x}$ is rejected.

## Growth and decay models

The standard question gives a model $y = A\mathrm{e}^{kt}$, some data, and asks you to find $A$ and $k$, then use the model.

:::worked-solution[Example 3: population growth]
The population of a town is modelled by $P = 24\,000\,\mathrm{e}^{kt}$, where $t$ is the time in years after the start of 2020. In 2025 the population is 30 000.

(a) Show that $k = \frac{1}{5}\ln 1.25$ and find $k$ to 3 significant figures. (b) Find when the model predicts a population of 50 000.

1. (a) At $t = 5$: $30\,000 = 24\,000\,\mathrm{e}^{5k}$, so $\mathrm{e}^{5k} = 1.25$.
2. Take logarithms: $5k = \ln 1.25$, so $k = \frac{1}{5}\ln 1.25$, as required.
3. $k = \frac{0.22314\ldots}{5} = 0.04462\ldots = 0.0446$ (3 s.f.).
4. (b) $50\,000 = 24\,000\,\mathrm{e}^{kt}$ gives $\mathrm{e}^{kt} = \frac{50}{24}$, so $kt = \ln\frac{50}{24} = 0.73397\ldots$
5. $t = \dfrac{0.73397\ldots}{0.04462\ldots} = 16.4$ years, during 2036.
:::

Use the unrounded value of $k$ in step 5. Rounding $k$ to 0.0446 first gives a slightly different $t$.

:::worked-solution[Example 4: Newton's law of cooling]
A cup of tea cools according to $\theta = 20 + 75\mathrm{e}^{-0.04t}$, where $\theta$ is the temperature in °C after $t$ minutes.

1. Initial temperature: $t = 0$ gives $\theta = 20 + 75 = 95$ °C.
2. As $t \to \infty$, $\mathrm{e}^{-0.04t} \to 0$, so $\theta \to 20$ °C: the room temperature.
3. When $\theta = 50$: $75\mathrm{e}^{-0.04t} = 30$, so $\mathrm{e}^{-0.04t} = 0.4$.
4. $-0.04t = \ln 0.4 = -0.91629\ldots$, so $t = 22.9$ minutes (3 s.f.).
:::

![Graph of the temperature of a cup of tea, theta = 20 + 75e^(-0.04t): it starts at 95 degrees C, falls to 50 degrees C after 22.9 minutes and levels off towards the room temperature of 20 degrees C, which is the horizontal asymptote.](media:diagrams/cooling-tea-exponential-decay.png "Figure: θ = 20 + 75e^(−0.04t) falls from 95 °C towards the asymptote 20 °C")

Interpreting the constants is often worth marks: in Example 4, 20 is the long-term (room) temperature, 75 the initial excess temperature, and 0.04 measures how fast the tea cools.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine $\mathrm{e}^{x}$, $\ln x$, their graphs and growth and decay models. Cambridge sets this in Papers 2 and 3. ZIMSEC's syllabus asks you to "explain" growth and decay, so be ready to interpret constants and long-term behaviour in words.
:::

## Common mistakes

:::mistake{title="Taking ln of a sum term by term"}
$\ln(\mathrm{e}^{x} + 3)$ is not $x + \ln 3$. Isolate the exponential first: from $\mathrm{e}^{x} + 3 = 10$, write $\mathrm{e}^{x} = 7$, then $x = \ln 7$.
:::

:::mistake{title="Ignoring the domain of ln"}
$\ln(2x - 1)$ needs $2x - 1 > 0$. Solutions that make the argument zero or negative must be rejected.
:::

:::mistake{title="Rounding k too early"}
Keep $k$ exact (as $\frac{1}{5}\ln 1.25$) or to full calculator accuracy until the final answer.
:::

:::mistake{title="Wrong sign for decay"}
In $A\mathrm{e}^{kt}$, decay needs $k < 0$. If your calculation gives a positive $k$ for something that is decreasing, check the data substitution.
:::

## Exam tips

:::exam-tip
"Give your answer in exact form" means leave $\ln$ and $\mathrm{e}$ in the answer, for example $x = \frac{1 + \ln 7}{2}$.
:::

:::exam-tip
For a sketch of $y = A\mathrm{e}^{kx} + c$ or $y = \ln(ax + b)$, show the intercept and the asymptote, with its equation.
:::

:::exam-tip
In context questions, state units and interpret: "16.4 years after the start of 2020, so during 2036".
:::

## Summary

:::summary
- $\mathrm{e}^{x}$ and $\ln x$ are inverse functions; their graphs reflect in $y = x$.
- $\mathrm{e}^{x} > 0$ always; $\ln x$ needs $x > 0$; $\ln 1 = 0$ and $\ln \mathrm{e} = 1$.
- Solve $\mathrm{e}^{\ldots} = c$ by taking $\ln$; solve $\ln(\ldots) = c$ by exponentiating.
- $A\mathrm{e}^{kt}$ models growth ($k > 0$) or decay ($k < 0$); $A$ is the initial value.
- Find $k$ from data with logarithms, keep it unrounded, and interpret constants in context.
:::
