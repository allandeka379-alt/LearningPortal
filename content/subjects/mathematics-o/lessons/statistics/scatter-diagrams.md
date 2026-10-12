---
{
  "key": "statistics.scatter-diagrams",
  "title": "Scatter diagrams",
  "summary": "Plot and interpret scatter diagrams, describe positive, negative and no correlation, draw a line of best fit by eye through the mean point, and use it to make estimates, knowing when they are reliable.",
  "concepts": ["math.statistics.scatter-diagrams"],
  "objectives": ["cambridge/igcse/mathematics:9.5.1", "cambridge/igcse/mathematics:9.5.2"],
  "estimatedMinutes": 15,
  "level": "core"
}
---
## Introduction

Do learners who revise for longer get higher marks? Do older cars sell for less? Does a field that gets more rain give a bigger maize harvest? Each question is about the **relationship between two variables**. To investigate it, we collect pairs of values and plot them as points on a **scatter diagram**.

In this lesson you will plot scatter diagrams, describe the **correlation** they show, draw a **line of best fit** and use it to estimate values. You will also learn when such estimates can be trusted. Scatter diagrams are in the Cambridge IGCSE syllabus (Core and Extended).

## Key definitions

:::definition{term="Scatter diagram"}
A graph on which each pair of values $(x, y)$ is plotted as a single point, to show whether the two variables are related.
:::

:::definition{term="Correlation"}
The relationship between two variables shown on a scatter diagram.

- **Positive correlation:** as one variable increases, the other tends to increase.
- **Negative correlation:** as one variable increases, the other tends to decrease.
- **No (zero) correlation:** there is no clear pattern.

Correlation is **strong** when the points lie close to a straight line and **weak** when they are widely scattered about it.
:::

:::definition{term="Line of best fit"}
A straight line drawn by eye through the middle of the points, following their trend, with roughly as many points above it as below it. It should pass through the **mean point** $(\bar{x}, \bar{y})$.
:::

:::keyfact{title="Correlation is not causation"}
A correlation shows that two variables are linked, not that one causes the other. Ice-cream sales and the number of people who get sunburnt rise together because both depend on hot, sunny weather.
:::

## Plotting and describing

:::worked-solution[Example 1: revision and test marks]
| Hours of revision, $x$ | 2 | 5 | 1 | 8 | 4 | 6 | 3 | 7 |
| --- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| Test mark, $y$ | 41 | 58 | 35 | 72 | 50 | 63 | 47 | 66 |

1. Plot each pair as a point: $(2, 41)$, $(5, 58)$, and so on.
2. The points rise from left to right and lie close to a straight line.
3. Description: **strong positive correlation**. In context: learners who revised for longer tended to score higher marks.
:::

Other examples: the age of a car and its value show negative correlation; a learner's shoe size and their mark in a history test show no correlation.

![Scatter diagram of test mark against hours of revision for eight learners, from (1, 35) to (8, 72): the points rise steadily, showing strong positive correlation; the line of best fit passes through the mean point (4.5, 54) with a gradient of about 5.25 marks per hour.](media:diagrams/scatter-revision-marks.png "Figure: strong positive correlation, with the line of best fit through the mean point")

## The mean point and the line of best fit

The mean point is $(\bar{x}, \bar{y})$, where $\bar{x}$ is the mean of the $x$-values and $\bar{y}$ the mean of the $y$-values. Plot it first, then draw your line through it.

:::worked-solution[Example 2: mean point and estimate]
For the data in Example 1:

1. $\bar{x} = \dfrac{2 + 5 + 1 + 8 + 4 + 6 + 3 + 7}{8} = \dfrac{36}{8} = 4.5$.
2. $\bar{y} = \dfrac{41 + 58 + 35 + 72 + 50 + 63 + 47 + 66}{8} = \dfrac{432}{8} = 54$.
3. A line of best fit is drawn by eye through $(4.5, 54)$ and $(8.5, 75)$. Its gradient is $\dfrac{75 - 54}{8.5 - 4.5} = 5.25$: about 5 extra marks for each extra hour of revision.
4. To estimate the mark for 5.5 hours, go 1 hour to the right of the mean point: $54 + 5.25 \times 1 = 59.25$, so about 59 marks. On a graph you would read this value from the line.
:::

Because lines are drawn by eye, different people get slightly different lines, and examiners accept a range of answers for estimates.

## Interpolation and extrapolation

- **Interpolation:** estimating within the range of the data (here, between 1 and 8 hours). This is usually reliable when the correlation is strong.
- **Extrapolation:** estimating outside the range of the data. This is unreliable, because the pattern may not continue. Using the line for 20 hours of revision gives $54 + 5.25 \times 15.5 \approx 135$ marks, which is impossible for a test marked out of 100.

An **outlier** is a point that does not fit the pattern of the others, for example a learner who revised for 7 hours but scored 30. Ignore outliers when drawing the line of best fit, but mention them when describing the data.

## Common mistakes

:::mistake{title="Joining the dots"}
A line of best fit is a single straight line through the middle of the points, not a zigzag line joining them one by one.
:::

:::mistake{title="Forcing the line through the origin"}
The line of best fit does not have to pass through $(0, 0)$. It should pass through the mean point.
:::

:::mistake{title="Trusting extrapolation"}
Estimates outside the range of the data can be badly wrong. Say so if a question asks whether an estimate is reliable.
:::

:::mistake{title="Saying one variable causes the other"}
"More revision **causes** higher marks" goes beyond what a scatter diagram shows. Say "learners who revised more **tended to** score higher".
:::

## Exam tips

:::exam-tip
"**Describe the correlation**" needs the type (positive, negative or none), and "**interpret**" or "**describe the relationship**" needs a sentence in context.
:::

:::exam-tip
When reading an estimate from your line, draw faint construction lines on the graph from the axis to the line and across. Answers within a small range of the examiner's line earn the mark.
:::

:::exam-tip
Plot the mean point clearly (for example as a small cross) before drawing the line of best fit through it.
:::

## Summary

:::summary
- A scatter diagram plots pairs of values to show the relationship between two variables.
- Correlation can be positive, negative or none, and strong or weak.
- Draw the line of best fit by eye through the mean point $(\bar{x}, \bar{y})$, with points on both sides.
- Interpolation (inside the data range) is fairly reliable; extrapolation (outside it) is not.
- Correlation does not prove that one variable causes the other.
:::
