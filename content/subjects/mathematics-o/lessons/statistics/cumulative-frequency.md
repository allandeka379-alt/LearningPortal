---
{
  "key": "statistics.cumulative-frequency",
  "title": "Cumulative frequency",
  "summary": "Build cumulative frequency tables, draw cumulative frequency curves, and use them to estimate the median, quartiles, percentiles, interquartile range and (ZIMSEC) semi-interquartile range of grouped data.",
  "concepts": ["math.statistics.cumulative-frequency"],
  "objectives": ["zimsec/o-level/mathematics:9.0.4", "cambridge/igcse/mathematics:9.6.1", "cambridge/igcse/mathematics:9.6.2"],
  "estimatedMinutes": 16,
  "level": "extended"
}
---
## Introduction

A clinic in Gweru records how long each of 80 patients waits to be seen, in a grouped frequency table. The manager wants to know the median waiting time, how spread out the middle half of the times is, and how many patients waited more than 75 minutes. With grouped data the individual values are lost, but a **cumulative frequency curve** lets us estimate all of these.

In this lesson you will build cumulative frequency tables, draw the curve, and read off the median, quartiles, interquartile range and percentiles. This is Extended content for Cambridge and part of the ZIMSEC statistics topic, where the **semi-interquartile range** is also used.

You should be able to read grouped frequency tables and find the median and quartiles of a list.

## Key definitions

:::definition{term="Cumulative frequency"}
The running total of the frequencies: the number of values less than or equal to the upper boundary of each class.
:::

:::definition{term="Cumulative frequency curve"}
A graph of cumulative frequency (vertical axis) against the **upper class boundary** (horizontal axis), with the points joined by a smooth curve (or by straight lines, giving a cumulative frequency polygon). It starts at the lower boundary of the first class with cumulative frequency 0.
:::

:::keyfact[Readings for $n$ values]
For a large data set of $n$ values, read across from these cumulative frequencies:

- lower quartile $Q_1$ at $\frac{1}{4}n$;
- median at $\frac{1}{2}n$;
- upper quartile $Q_3$ at $\frac{3}{4}n$;
- the $p$th percentile at $\frac{p}{100}n$.
:::

:::formula{name="Interquartile range and semi-interquartile range"}
$$
\text{IQR} = Q_3 - Q_1, \qquad \text{semi-interquartile range} = \frac{Q_3 - Q_1}{2}
$$
:::

## Building the table

:::worked-solution[Example 1: waiting times of 80 patients]
| Waiting time, $t$ (min) | $30 < t \leq 40$ | $40 < t \leq 50$ | $50 < t \leq 60$ | $60 < t \leq 70$ | $70 < t \leq 80$ | $80 < t \leq 90$ |
| --- | :---: | :---: | :---: | :---: | :---: | :---: |
| Frequency | 4 | 12 | 16 | 16 | 20 | 12 |

1. Add the frequencies as you go: $4$, $4 + 12 = 16$, $16 + 16 = 32$, $32 + 16 = 48$, $48 + 20 = 68$, $68 + 12 = 80$.

| Waiting time, $t$ (min) | $t \leq 40$ | $t \leq 50$ | $t \leq 60$ | $t \leq 70$ | $t \leq 80$ | $t \leq 90$ |
| --- | :---: | :---: | :---: | :---: | :---: | :---: |
| Cumulative frequency | 4 | 16 | 32 | 48 | 68 | 80 |

2. Plot the points $(30, 0)$, $(40, 4)$, $(50, 16)$, $(60, 32)$, $(70, 48)$, $(80, 68)$, $(90, 80)$ and join them with a smooth curve.
3. The last cumulative frequency, 80, equals the number of patients: a useful check.
:::

## Reading the curve

To estimate a value, go **across** from the cumulative frequency on the vertical axis to the curve, then **down** to the horizontal axis. Between two plotted points you can check a reading by assuming the values are spread evenly through the class (this is exactly what a straight-line polygon does).

:::worked-solution[Example 2: median, quartiles and IQR]
For the 80 waiting times:

1. Median: read at $\frac{1}{2} \times 80 = 40$. Across from 40 to the curve and down gives $65.2$ minutes. Check: the 40th value is in $60 < t \leq 70$ (the 33rd to 48th values), the 8th of 16 values in that class, so assuming an even spread $60 + \frac{8}{16} \times 10 = 65$ minutes.
2. Lower quartile: read at 20, which gives $52.7$ minutes from the curve. Check: the 20th value is the 4th of 16 values in $50 < t \leq 60$, so $50 + \frac{4}{16} \times 10 = 52.5$ minutes with an even spread.
3. Upper quartile: read at 60, which gives $75.8$ minutes from the curve. Check: the 60th value is the 12th of 20 values in $70 < t \leq 80$, so $70 + \frac{12}{20} \times 10 = 76$ minutes with an even spread.
4. $\text{IQR} = 75.8 - 52.7 = 23.1$ minutes, and the semi-interquartile range is $11.55$ minutes. (The even-spread checks give $76 - 52.5 = 23.5$ and $11.75$, within a small tolerance of the curve readings.)
:::

A smooth curve drawn by hand gives readings close to the even-spread checks, and examiners accept answers within a small tolerance. In the figure below the reading lines meet the curve exactly.

![Cumulative frequency curve for the waiting times of 80 patients through (30, 0), (40, 4), (50, 16), (60, 32), (70, 48), (80, 68) and (90, 80); dashed reading lines from 20, 40 and 60 on the vertical axis meet the curve at the lower quartile 52.7, the median 65.2 and the upper quartile 75.8 minutes.](media:diagrams/cumulative-frequency-waiting-times.png "Figure: read across from n/4, n/2 and 3n/4, then down to the time axis")

:::worked-solution[Example 3: how many are above a value?]
How many patients waited more than 75 minutes?

1. Read **up** from 75 minutes to the curve and across: the cumulative frequency is about $48 + \frac{5}{10} \times 20 = 58$.
2. So about 58 patients waited 75 minutes or less.
3. More than 75 minutes: $80 - 58 = 22$ patients.
:::

Percentiles work in the same way: the 85th percentile is read at $\frac{85}{100} \times 80 = 68$, which gives 80 minutes, so 85% of the patients waited 80 minutes or less.

## Reading the shape

Where the curve is **steep**, many values are packed into a small interval; where it is **flat**, few values lie there. A smaller IQR means the middle half of the data is more tightly bunched, so the data are more consistent.

## Common mistakes

:::mistake{title="Plotting at the midpoints"}
Cumulative frequencies are plotted at the **upper class boundaries**, because they count everything up to the end of each class. Plotting at midpoints shifts the whole curve to the left.
:::

:::mistake{title="Using (n + 1)/2 for a curve"}
For a cumulative frequency curve of large grouped data, read the median at $\frac{n}{2}$, not $\frac{n + 1}{2}$.
:::

:::mistake{title="Forgetting the first point"}
The curve starts at the lower boundary of the first class with cumulative frequency 0, for example $(30, 0)$.
:::

:::mistake{title="Adding the quartiles"}
The interquartile range is $Q_3 - Q_1$, not $Q_3 + Q_1$.
:::

## Exam tips

:::exam-tip
Show your reading lines on the graph (across from the cumulative frequency, then down to the axis). They earn method marks if the final reading is slightly out.
:::

:::exam-tip
For "**how many** are more than…" questions, read the cumulative frequency at the value and **subtract it from the total**.
:::

:::exam-tip
Check the scale on each axis before reading: small squares often represent 2 or 5 units, not 1.
:::

## Summary

:::summary
- Cumulative frequency is the running total of the frequencies; the last value equals the total $n$.
- Plot cumulative frequency against the upper class boundary, starting at (first lower boundary, 0).
- Read $Q_1$, the median and $Q_3$ at $\frac{n}{4}$, $\frac{n}{2}$ and $\frac{3n}{4}$; the $p$th percentile at $\frac{p}{100}n$.
- IQR $= Q_3 - Q_1$; semi-interquartile range $= \frac{1}{2}(Q_3 - Q_1)$ (ZIMSEC).
- "More than $x$" = total − cumulative frequency at $x$.
:::
