---
{
  "key": "bivariate.regression-correlation",
  "title": "Linear regression and correlation",
  "summary": "Draw and interpret scatter diagrams, calculate least-squares regression lines of y on x and x on y from data or summary statistics, make predictions (interpolation, and the risk of extrapolation), and calculate and interpret Pearson's product moment correlation coefficient r and the coefficient of determination r².",
  "concepts": ["amaths.bivariate.regression-correlation"],
  "estimatedMinutes": 50,
  "level": "core",
  "freePreview": true
}
---
## Introduction

Does more rainfall mean a bigger maize harvest? Do learners who revise for longer score higher marks? When each member of a sample gives **two** measurements, $(x, y)$, we have **bivariate data**. A scatter diagram shows the pattern; a **regression line** describes it with an equation we can use for prediction; and the **correlation coefficient** $r$ measures how close the points are to a straight line.

ZIMSEC Statistics examines bivariate data in Form 6: scatter diagrams, least-squares regression lines (both $y$ on $x$ and $x$ on $y$), prediction, and Pearson's product moment correlation coefficient with its interpretation. Cambridge 9709 does not include regression and correlation, so this lesson is for ZIMSEC candidates.

## Key definitions

:::definition{term="Explanatory and response variables"}
The **explanatory** (independent) variable $x$ is the one that is controlled or that we predict **from**; the **response** (dependent) variable $y$ is the one we predict. Rainfall explains yield, not the other way round.
:::

:::definition{term="Summary statistics"}
$$
S_{xx} = \sum x^2 - \frac{(\sum x)^2}{n}, \qquad S_{yy} = \sum y^2 - \frac{(\sum y)^2}{n}, \qquad S_{xy} = \sum xy - \frac{\sum x \sum y}{n}.
$$
:::

:::formula{name="Least-squares regression lines and correlation"}
$$
y \text{ on } x:\; y = a + bx, \quad b = \frac{S_{xy}}{S_{xx}}, \quad a = \bar{y} - b\bar{x}
$$
$$
x \text{ on } y:\; x = a' + b'y, \quad b' = \frac{S_{xy}}{S_{yy}}, \quad a' = \bar{x} - b'\bar{y}
$$
$$
r = \frac{S_{xy}}{\sqrt{S_{xx}S_{yy}}}, \qquad -1 \le r \le 1
$$
:::

The ZIMSEC syllabus prints no formula list; learn these results.

## Scatter diagrams and least squares

Plot $x$ across and $y$ up. Look for the **direction** (positive or negative), the **form** (roughly straight or curved) and the **strength** (how tightly the points cluster), and note any outliers.

The **least-squares regression line of $y$ on $x$** is the line that makes the sum of the squared **vertical** distances $\sum (y_i - \hat{y}_i)^2$ as small as possible. It always passes through the mean point $(\bar{x}, \bar{y})$. The line of $x$ on $y$ minimises the squared **horizontal** distances instead, so the two lines are different unless the points lie exactly on a line ($r = \pm 1$); both pass through $(\bar{x}, \bar{y})$.

**Which line?** To predict $y$ from a known $x$, use $y$ on $x$. To estimate $x$ from a known $y$, use $x$ on $y$. If $x$ is controlled (fixed in advance by the experimenter), only the $y$ on $x$ line is meaningful.

## Worked examples

:::worked-solution[Example 1: Eight farms in Mashonaland recorded seasonal rainfall $x$ (hundreds of mm) and maize yield $y$ (tonnes per hectare).]
| $x$ | 4.2 | 5.0 | 5.8 | 6.1 | 6.9 | 7.4 | 8.0 | 8.6 |
|---|---|---|---|---|---|---|---|---|
| $y$ | 2.1 | 2.6 | 2.9 | 3.4 | 3.6 | 4.1 | 4.3 | 4.8 |

Find the regression line of $y$ on $x$, estimate the yield for 700 mm of rain, and comment on using the line for 1100 mm.

1. $\sum x = 52$, $\sum y = 27.8$, $\sum x^2 = 353.82$, $\sum y^2 = 102.44$, $\sum xy = 190.24$, $n = 8$.
2. $S_{xx} = 353.82 - \frac{52^2}{8} = 15.82$; $S_{xy} = 190.24 - \frac{52 \times 27.8}{8} = 9.54$.
3. $b = \frac{9.54}{15.82} = 0.6030$; $\bar{x} = 6.5$, $\bar{y} = 3.475$; $a = 3.475 - 0.6030 \times 6.5 = -0.4447$.
4. Line: $y = -0.445 + 0.603x$.
5. At $x = 7$: $y = -0.4447 + 0.6030 \times 7 = 3.78$ tonnes per hectare. This is **interpolation** ($7$ lies within $4.2$ to $8.6$), so it is reliable.
6. At $x = 11$ the line gives $6.19$, but $11$ is far outside the data: **extrapolation**. The straight-line pattern may not continue (very heavy rain can waterlog crops), so this estimate is unreliable.
:::

![Scatter diagram of rainfall and maize yield for eight farms with the regression line y = -0.445 + 0.603x: the points lie close to the line, which passes through the mean point (6.5, 3.475) and predicts a yield of about 3.78 tonnes per hectare at x = 7.](media:diagrams/scatter-rainfall-yield-regression.png "Figure: the regression line y = −0.445 + 0.603x passes through the mean point (6.5, 3.475)")

The gradient has a meaning: each extra 100 mm of rain is associated with about $0.603$ more tonnes per hectare. The intercept ($-0.445$ at zero rainfall) has no sensible meaning here, because $x = 0$ is far outside the data.

:::worked-solution[Example 2: For 10 learners, $x$ is the hours spent revising and $y$ the test mark: $\sum x = 52$, $\sum y = 412$, $\sum x^2 = 300$, $\sum y^2 = 17\,760$, $\sum xy = 2220$. Find $r$, both regression lines, the mark predicted for 6 hours of revision, and the revision time estimated for a mark of 50.]
1. $S_{xx} = 300 - \frac{52^2}{10} = 29.6$; $S_{yy} = 17\,760 - \frac{412^2}{10} = 785.6$; $S_{xy} = 2220 - \frac{52 \times 412}{10} = 77.6$.
2. $r = \frac{77.6}{\sqrt{29.6 \times 785.6}} = 0.509$: moderate positive correlation.
3. $y$ on $x$: $b = \frac{77.6}{29.6} = 2.622$; $a = 41.2 - 2.622 \times 5.2 = 27.57$. So $y = 27.6 + 2.62x$.
4. For $x = 6$: $y = 27.57 + 2.622 \times 6 = 43.3$ marks.
5. $x$ on $y$: $b' = \frac{77.6}{785.6} = 0.09878$; $a' = 5.2 - 0.09878 \times 41.2 = 1.130$. So $x = 1.13 + 0.0988y$.
6. For $y = 50$: $x = 1.130 + 0.09878 \times 50 = 6.07$ hours.
:::

Rearranging $y = 27.6 + 2.62x$ to get $x$ from $y = 50$ would give $8.56$ hours, a different (and wrong) answer: always use the line that predicts the unknown variable.

## Interpreting r and r²

| $r$ | Description |
|---|---|
| close to $+1$ | strong positive linear correlation |
| around $\pm 0.5$ | moderate correlation |
| close to $0$ | little or no **linear** correlation |
| close to $-1$ | strong negative linear correlation |

$r$ has no units and is unchanged by **linear coding** of either variable (for example $u = \frac{x - 50}{10}$), apart from a sign change if one scale is reversed. The **coefficient of determination** $r^2$ is the proportion of the variation in $y$ that is explained by the linear relationship with $x$. In Example 1, $r = 0.993$ and $r^2 = 0.986$: about 98.6% of the variation in yield is explained by rainfall. In Example 2, $r^2 = 0.259$: revision time explains only about a quarter of the variation in marks.

Two warnings. First, $r$ near $0$ does not mean "no relationship": the points could lie on a curve. Second, **correlation is not causation**: ice-cream sales and drownings at Lake Kariba are both higher in hot weather, but one does not cause the other.

## Common mistakes

:::mistake{title="Using the y on x line to estimate x"}
To estimate $x$ from a given $y$, use the regression line of $x$ on $y$, not a rearranged $y$ on $x$ line (unless $x$ is controlled).
:::

:::mistake{title="Trusting extrapolation"}
A prediction outside the range of the data assumes the linear pattern continues. Say that it is unreliable.
:::

:::mistake{title="Rounding too early"}
Keep $S_{xx}$, $S_{xy}$ and $b$ to at least 4 significant figures before finding $a$; early rounding of $b$ changes $a$ noticeably.
:::

:::mistake{title="Saying a large r proves cause"}
Correlation shows association. A third factor may drive both variables.
:::

## Exam tips

:::exam-tip
Write $S_{xx}$, $S_{yy}$ and $S_{xy}$ before anything else, then $r$ and the lines. State the line with coefficients to 3 significant figures, and interpret the gradient in context with units.
:::

:::exam-tip
When asked about the reliability of an estimate, mention both **interpolation or extrapolation** and the **strength of the correlation** ($r$ close to $\pm 1$ makes predictions more reliable).
:::

## Summary

:::summary
- $S_{xx}$, $S_{yy}$, $S_{xy}$ come from the sums; the $y$ on $x$ line has $b = \frac{S_{xy}}{S_{xx}}$ and passes through $(\bar{x}, \bar{y})$.
- Use $y$ on $x$ to predict $y$, and $x$ on $y$ (with $b' = \frac{S_{xy}}{S_{yy}}$) to estimate $x$.
- $r = \frac{S_{xy}}{\sqrt{S_{xx}S_{yy}}}$ measures linear correlation; $r^2$ is the proportion of variation explained.
- Interpolation is reasonable; extrapolation is risky; correlation is not causation.
:::
