---
{
  "key": "inference.chi-squared",
  "title": "Chi-squared tests: goodness of fit and independence",
  "summary": "Use the χ² distribution to test whether observed frequencies fit a model (given ratios, uniform, binomial or Poisson, with parameters estimated from the data) and whether two classifications in a contingency table are independent, combining classes with expected frequencies below 5.",
  "concepts": ["amaths.inference.chi-squared"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

Are learner absences spread evenly over the five school days, or is Monday worse? Does the number of seeds germinating in each tray follow a binomial model? Is the time of day that learners prefer to study independent of their form? Each question compares **observed frequencies** with the frequencies we would **expect** if a hypothesis were true. The $\chi^2$ (chi-squared) test measures how far apart the two sets of frequencies are, and decides whether the gap is too big to be chance.

ZIMSEC Statistics examines $\chi^2$ tests in Form 6: the characteristics of the distribution and its degrees of freedom, goodness-of-fit tests and tests for independence in contingency tables. Cambridge 9709 does not include $\chi^2$ tests, so this lesson is for ZIMSEC candidates. Yates' correction is not in the syllabus and is not used here.

## Key definitions

:::definition{term="The χ² test statistic"}
For observed frequencies $O_i$ and expected frequencies $E_i$ (calculated assuming $H_0$ is true),
$$
X^2 = \sum \frac{(O_i - E_i)^2}{E_i}.
$$
If $H_0$ is true and every $E_i \ge 5$, $X^2$ approximately follows a $\chi^2_\nu$ distribution.
:::

:::definition{term="Degrees of freedom"}
$\nu$ = (number of classes after combining) $-$ (number of constraints). Goodness of fit: $\nu = k - 1 - m$, where $k$ is the number of classes and $m$ the number of parameters estimated from the data. Contingency table with $r$ rows and $c$ columns: $\nu = (r - 1)(c - 1)$.
:::

:::formula{name="Expected frequency in a contingency table"}
$$
E = \frac{\text{row total} \times \text{column total}}{\text{grand total}}
$$
:::

The ZIMSEC syllabus prints no formula list; critical values come from $\chi^2$ tables.

## The χ² distribution

- It takes only non-negative values and is **positively skewed**; its shape depends on $\nu$, and its mean is $\nu$.
- As $\nu$ grows the distribution becomes more symmetrical.
- The test is always **upper-tailed**: a large $X^2$ means a poor fit. Tables give the value exceeded with a stated probability, for example $\chi^2_4(5\%) = 9.488$.

| $\nu$ | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| 5% point | 3.841 | 5.991 | 7.815 | 9.488 | 11.070 |
| 1% point | 6.635 | 9.210 | 11.345 | 13.277 | 15.086 |

**The rule of 5.** The $\chi^2$ approximation is poor when expected frequencies are small. If any $E_i < 5$, combine that class with a neighbouring class (adding both $O$ and $E$) before calculating $X^2$, and count the classes **after** combining.

## Goodness-of-fit tests

:::worked-solution[Example 1: A Gweru school records 120 learner absences in a term: Monday 31, Tuesday 20, Wednesday 15, Thursday 25, Friday 29. Test at the 5% level whether absences are uniformly distributed over the five days.]
1. $H_0$: absences are equally likely on each day; $H_1$: they are not.
2. Expected frequencies: $\frac{120}{5} = 24$ for each day.
3. $X^2 = \dfrac{7^2 + 4^2 + 9^2 + 1^2 + 5^2}{24} = \dfrac{172}{24} = 7.17$.
4. $\nu = 5 - 1 = 4$ (only the total is used); $\chi^2_4(5\%) = 9.488$.
5. $7.17 < 9.488$, so do not reject $H_0$. There is no significant evidence at the 5% level that absences depend on the day.
:::

When the model has a parameter that you **estimate from the data**, you lose one more degree of freedom for each estimate.

:::worked-solution[Example 2: Nyasha plants 4 seeds in each of 80 trays and counts how many germinate: 0 seeds in 3 trays, 1 in 10, 2 in 25, 3 in 28, 4 in 14. Test at the 5% level whether a binomial model fits.]
1. $H_0$: the number germinating per tray is $\mathrm{B}(4, p)$; $H_1$: it is not.
2. Estimate $p$: total germinated $= 0(3) + 1(10) + 2(25) + 3(28) + 4(14) = 200$ out of $320$ seeds, so $\hat{p} = 0.625$.
3. Expected frequencies $80 \times \mathrm{P}(X = r)$: $1.582$, $10.547$, $26.367$, $29.297$, $12.207$ for $r = 0, \dots, 4$.
4. $E_0 = 1.582 < 5$: combine $r = 0$ and $r = 1$ into one class with $O = 13$, $E = 12.129$.
5. $X^2 = \dfrac{0.871^2}{12.129} + \dfrac{1.367^2}{26.367} + \dfrac{1.297^2}{29.297} + \dfrac{1.793^2}{12.207} = 0.0626 + 0.0709 + 0.0574 + 0.2634 = 0.454$.
6. Classes after combining: 4. Constraints: the total and the estimated $p$, so $\nu = 4 - 2 = 2$; $\chi^2_2(5\%) = 5.991$.
7. $0.454 < 5.991$: do not reject $H_0$. The binomial model fits well.
:::

A **Poisson** model works the same way: estimate $\lambda$ by the sample mean (one parameter, so subtract one extra degree of freedom), compute $N\,\mathrm{P}(X = r)$ for the listed values, and make the last class "$r$ or more" so that the expected frequencies add up to $N$. When a ratio is given (for example a genetic ratio $9 : 3 : 3 : 1$) or the parameter is given in the question, nothing is estimated and $\nu = k - 1$.

## Tests for independence

:::worked-solution[Example 3: 200 learners at a Mutare school were asked when they prefer to study. Test at the 5% level whether preference is independent of form.]
| | Morning | Afternoon | Evening | Total |
|---|---|---|---|---|
| Form 5 | 28 | 17 | 35 | 80 |
| Form 6 | 22 | 23 | 75 | 120 |
| Total | 50 | 40 | 110 | 200 |

1. $H_0$: study-time preference is independent of form; $H_1$: it is not.
2. Expected frequencies $\frac{\text{row} \times \text{column}}{200}$: Form 5: $20, 16, 44$; Form 6: $30, 24, 66$. All are at least 5.
3. $X^2 = \frac{8^2}{20} + \frac{1^2}{16} + \frac{9^2}{44} + \frac{8^2}{30} + \frac{1^2}{24} + \frac{9^2}{66} = 3.2 + 0.0625 + 1.841 + 2.133 + 0.0417 + 1.227 = 8.51$.
4. $\nu = (2 - 1)(3 - 1) = 2$; $\chi^2_2(5\%) = 5.991$.
5. $8.51 > 5.991$: reject $H_0$. There is evidence at the 5% level of an association between form and preferred study time.
6. Comment: the largest contributions come from mornings (more Form 5 learners than expected) and evenings (more Form 6 learners than expected).
:::

At the 1% level ($\chi^2_2(1\%) = 9.210$) the same data would not be significant, so the evidence is moderate, not overwhelming.

## Common mistakes

:::mistake{title="Using percentages instead of frequencies"}
$X^2$ must be computed from **counts**. Converting to percentages changes the value of the statistic.
:::

:::mistake{title="Counting classes before combining"}
Degrees of freedom use the number of classes **after** combining those with $E < 5$.
:::

:::mistake{title="Forgetting estimated parameters"}
Estimating $p$ or $\lambda$ from the data costs one degree of freedom each.
:::

:::mistake{title="Using a lower tail"}
A very small $X^2$ is not evidence against $H_0$. The test is upper-tailed.
:::

## Exam tips

:::exam-tip
Lay out a table with columns $O$, $E$ and $\frac{(O - E)^2}{E}$. Keep $E$ to at least 2 decimal places, give $X^2$ to 3 significant figures, and state $\nu$ with a reason.
:::

:::exam-tip
Hypotheses must name the model ("$\mathrm{B}(4, p)$ fits the data") or the independence ("preference is independent of form"). Conclude in context, and when asked to comment, point to the cells with the largest contributions.
:::

## Summary

:::summary
- $X^2 = \sum \frac{(O - E)^2}{E}$, approximately $\chi^2_\nu$ when $H_0$ is true and every $E \ge 5$; upper-tailed test.
- Goodness of fit: $\nu = k - 1 - m$ ($m$ = parameters estimated); combine classes with $E < 5$ first.
- Contingency tables: $E = \frac{\text{row total} \times \text{column total}}{\text{grand total}}$, $\nu = (r - 1)(c - 1)$.
- Conclude in context, and identify the cells that contribute most.
:::
