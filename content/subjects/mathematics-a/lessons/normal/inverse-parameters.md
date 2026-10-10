---
{
  "key": "normal.inverse-parameters",
  "title": "The normal distribution: finding values, the mean and the standard deviation",
  "summary": "Use normal tables in reverse to find the value with a given probability above or below it, and to find an unknown mean, an unknown standard deviation, or both from given probabilities by solving equations.",
  "concepts": ["amaths.normal.inverse-parameters"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

A school in Gweru wants to give a certificate to the tallest 10% of its Form 5 learners: above what height? A drinks company must set its filling machine so that only 2% of cans are underweight: how small must the standard deviation be? A farmer knows what percentage of oranges are small and what percentage are large: what are the mean and standard deviation of the masses? These questions run the normal distribution **backwards**: from a probability to a value or a parameter.

This lesson covers ZIMSEC Statistics (Form 5, topic 6.5.3) and Cambridge 9709 Paper 5 (topic 5.5, "find a relationship between $x_1$, $\mu$ and $\sigma$ given the value of $\mathrm{P}(X > x_1)$"). You need the previous lesson on standardising first.

## Key definitions

:::definition{term="Inverse normal value"}
For a probability $p$, the value $z$ with $\Phi(z) = p$ is written $\Phi^{-1}(p)$. For example $\Phi^{-1}(0.9) = 1.282$: 90% of the standard normal distribution lies below 1.282.
:::

:::formula{name="The key equation"}
$$
\frac{x - \mu}{\sigma} = z
$$
Every problem in this lesson comes from this one equation, with three of the four quantities known (or two equations for two unknowns).
:::

:::formula{name="Critical values worth knowing (MF19 prints a table of them)"}
| $p$ | 0.75 | 0.9 | 0.95 | 0.975 | 0.99 |
| --- | --- | --- | --- | --- | --- |
| $z$ with $\Phi(z) = p$ | 0.674 | 1.282 | 1.645 | 1.960 | 2.326 |
:::

For other probabilities read the main $\Phi$ table backwards, choosing the closest entry or interpolating; answers are accepted to 3 decimal places of $z$.

## The method

1. **Sketch** the curve, mark the unknown value and shade the given probability.
2. Convert the area into an area to the **left**: if 10% lie above $x$, then 90% lie below it.
3. Decide the **sign** of $z$: if the value is below the mean, $z$ is negative. Use symmetry: if 2% lie below $x$, then $z = -\Phi^{-1}(0.98)$.
4. Write $\frac{x - \mu}{\sigma} = z$ and solve.

## Worked examples

:::worked-solution[Example 1: heights are N(165, 64) in cm. Find the height h exceeded by only 10% of learners]
1. $\mathrm{P}(X > h) = 0.1$, so $\mathrm{P}(X < h) = 0.9$ and $h$ is above the mean.
2. $\Phi^{-1}(0.9) = 1.282$, so $\frac{h - 165}{8} = 1.282$.
3. $h = 165 + 8 \times 1.282 = 175.3$ cm (1 d.p.).
:::

:::worked-solution[Example 2: cans are filled with X ~ N(330, σ²) ml. Only 2% of cans may contain less than 325 ml. Find the largest possible σ]
1. $\mathrm{P}(X < 325) = 0.02$: 325 is below the mean, so $z$ is negative.
2. $\Phi^{-1}(0.98) = 2.054$, so $z = -2.054$.
3. $\frac{325 - 330}{\sigma} = -2.054 \Rightarrow \sigma = \frac{5}{2.054} = 2.43$ ml (3 s.f.).
4. A smaller $\sigma$ makes underweight cans rarer still, so $\sigma$ must be at most 2.43 ml.
:::

:::worked-solution[Example 3: 15% of oranges have mass less than 60 g and 10% have mass more than 90 g. Assuming a normal distribution, find μ and σ]
1. Below 60 g: $\mathrm{P}(X < 60) = 0.15$. $\Phi^{-1}(0.85) = 1.036$, so $\frac{60 - \mu}{\sigma} = -1.036$, that is $60 = \mu - 1.036\sigma$.
2. Above 90 g: $\mathrm{P}(X > 90) = 0.1$, so $\frac{90 - \mu}{\sigma} = 1.282$, that is $90 = \mu + 1.282\sigma$.
3. Subtract: $30 = 2.318\sigma$, so $\sigma = 12.9$ g (3 s.f.).
4. Substitute: $\mu = 60 + 1.036 \times 12.94 = 73.4$ g (3 s.f.).
5. Check: $\frac{60 - 73.41}{12.94} = -1.036$ and $\frac{90 - 73.41}{12.94} = 1.282$, as required.
:::

Keep at least four significant figures for $\sigma$ when substituting back to find $\mu$; using $\sigma = 12.9$ in step 4 gives $\mu = 73.36$, which rounds differently.

## Unknown mean only

If $\sigma$ is known and $\mu$ is not, the same equation gives $\mu$ directly. For example, if masses have $\sigma = 6$ g and 5% are over 100 g, then $\frac{100 - \mu}{6} = 1.645$ gives $\mu = 100 - 9.87 = 90.1$ g (3 s.f.). Sketching first avoids the classic sign error.

## Quartiles and interquartile range

The quartiles of $\mathrm{N}(\mu, \sigma^2)$ are $\mu \pm 0.674\sigma$, so the interquartile range is $1.349\sigma$. For $\mathrm{N}(50, 144)$ the IQR is $2 \times 0.6745 \times 12 = 16.2$ (3 s.f.). This links the normal distribution to the box plots in the data topic.

## Interpreting the answers

A value found from the model is only as good as the model. If the mean and standard deviation come from rounded percentages, such as "about 15% of oranges are small", the answers are estimates and should not be quoted to more than 3 significant figures. Always ask whether the result makes sense in context: a standard deviation must be positive, a mean mass of oranges should lie between the "small" and "large" boundaries, and a cut-off for the top 10% must lie above the mean. When a question says "the machine is adjusted so that…", decide which parameter changes (usually the mean) and which stays fixed (usually the standard deviation, which depends on the machine's precision).

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine finding a value from a probability and finding $\mu$, $\sigma$ or both (ZIMSEC 6.5.3, Cambridge 5.5). Cambridge's MF19 prints the critical values in the table above; ZIMSEC candidates read their normal tables in reverse. Both accept $z$ to 3 decimal places from tables or a calculator.
:::

## Common mistakes

:::mistake{title="Wrong sign of z"}
If the value is below the mean, $z < 0$. "15% below 60" gives $z = -1.036$, not $+1.036$.
:::

:::mistake{title="Using the probability as z"}
$\frac{x - \mu}{\sigma}$ equals a $z$ value such as 1.282, never a probability such as 0.9 or 0.1.
:::

:::mistake{title="Reading the wrong tail"}
"10% exceed $h$" means $\Phi(z) = 0.9$. Using $\Phi^{-1}(0.1)$ without a minus sign puts $h$ on the wrong side of the mean.
:::

:::mistake{title="Rounding too early"}
Round $z$ to 3 or 4 decimal places and $\sigma$ to at least 4 significant figures before substituting back.
:::

## Exam tips

:::exam-tip
Write each equation in full, such as $\frac{60 - \mu}{\sigma} = -1.036$, before rearranging; this earns the method marks even if the solving goes wrong.
:::

:::exam-tip
For two unknowns, rearrange both equations to the form $x = \mu + z\sigma$ and subtract to eliminate $\mu$.
:::

:::exam-tip
Check your answer by substituting back: does your $\mu$ and $\sigma$ give the stated percentages?
:::

## Summary

:::summary
- Every question uses $\frac{x - \mu}{\sigma} = z$ with $z = \Phi^{-1}(p)$.
- Convert the given area to an area on the left; make $z$ negative for values below the mean.
- One unknown: rearrange. Two unknowns: two equations, subtract to eliminate $\mu$.
- Useful values: $\Phi^{-1}(0.75) = 0.674$, $\Phi^{-1}(0.9) = 1.282$, $\Phi^{-1}(0.95) = 1.645$, $\Phi^{-1}(0.975) = 1.960$, $\Phi^{-1}(0.99) = 2.326$.
:::
