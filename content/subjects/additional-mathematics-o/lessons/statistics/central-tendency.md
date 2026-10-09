---
{
  "key": "statistics.central-tendency",
  "title": "Mean, median and mode",
  "summary": "Find the mean, median and mode of raw data, frequency tables and grouped data (estimated mean from midpoints, median by interpolation, modal class), relate the three averages for symmetric and skewed data, and choose the most suitable average.",
  "concepts": ["amath.statistics.central-tendency"],
  "estimatedMinutes": 45,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

"What is a typical value?" is the first question asked of any data set: the typical mark in a test, the typical household size in a village, the typical yield of a maize field. An average answers it with a single number. There are three common averages (the mean, the median and the mode), and each has its strengths.

ZIMSEC Paper 2 Section C asks you to calculate all three from raw data, frequency tables and grouped tables, often as the start of a question that goes on to measures of spread. You need to be able to build a frequency table and find class midpoints and cumulative frequencies.

## Key definitions

:::definition{term="Mean"}
The sum of the values divided by the number of values, $\bar{x}$.
:::

:::definition{term="Median"}
The middle value when the data are arranged in order. For $n$ values it is the $\frac{n + 1}{2}$th value; for an even $n$, the mean of the two middle values.
:::

:::definition{term="Mode"}
The value that occurs most often. Grouped data have a **modal class**, the class with the highest frequency (or highest frequency density when widths differ).
:::

:::formula{name="Mean"}
$$
\bar{x} = \frac{\sum x}{n} \qquad \bar{x} = \frac{\sum fx}{\sum f}
$$

For grouped data, $x$ is the class midpoint and the result is an estimate.
:::

:::formula{name="Median of grouped data (interpolation)"}
$$
\text{median} = L + \frac{\frac{n}{2} - F}{f} \times w
$$

$L$ = lower boundary of the median class, $F$ = cumulative frequency before that class, $f$ = its frequency, $w$ = its width.
:::

## Raw data

:::worked-solution[Example 1: find the mean, median and mode of 12, 15, 9, 15, 20, 11, 15, 7.]
1. Sum $= 104$ and $n = 8$, so the mean is $\dfrac{104}{8} = 13$.
2. In order: 7, 9, 11, 12, 15, 15, 15, 20. The middle values are the 4th and 5th: 12 and 15.
3. Median $= \dfrac{12 + 15}{2} = 13.5$.
4. Mode $= 15$ (three times).
:::

## Ungrouped frequency tables

Each value $x$ occurs $f$ times, so the total of the values is $\sum fx$ and the number of values is $\sum f$. For the median, use cumulative frequencies to locate the middle position.

:::worked-solution[Example 2: the numbers of children in 40 households in a village near Hwange are shown below. Find the mean, median and mode.]
1. $\sum f = 40$ and $\sum fx = 0 + 9 + 24 + 24 + 20 + 10 = 87$.
2. Mean $= \dfrac{87}{40} = 2.175$ children.
3. Median: the 20th and 21st values. Cumulative frequencies are 4, 13, 25, …, so both lie in $x = 2$. Median $= 2$.
4. Mode $= 2$ (frequency 12).
:::

| Children $x$ | 0 | 1 | 2 | 3 | 4 | 5 |
| --- | --- | --- | --- | --- | --- | --- |
| Households $f$ | 4 | 9 | 12 | 8 | 5 | 2 |
| $fx$ | 0 | 9 | 24 | 24 | 20 | 10 |

## Grouped data

The original values are lost when data are grouped, so the mean and median can only be **estimated**:

- **Estimated mean**: assume every value in a class sits at the midpoint.
- **Median**: assume the values are spread evenly through the median class and interpolate (or read it from a cumulative frequency curve at $\frac{n}{2}$).
- **Modal class**: the class with the highest frequency (equal widths).

:::worked-solution[Example 3: the heights of 60 maize plants are grouped below. Estimate the mean and the median, and state the modal class.]
1. Midpoints: 110, 130, 150, 170, 190. $\sum fx = 770 + 1950 + 3000 + 2040 + 1140 = 8900$.
2. Estimated mean $= \dfrac{8900}{60} \approx 148$ cm (148.3).
3. Median position $\frac{60}{2} = 30$. Cumulative frequencies: 7, 22, 42, … so the median class is $140 \leq h < 160$.
4. Median $= 140 + \dfrac{30 - 22}{20} \times 20 = 140 + 8 = 148$ cm.
5. Modal class: $140 \leq h < 160$ (frequency 20).
:::

| Height $h$ (cm) | $f$ | Midpoint | Cumulative $f$ |
| --- | --- | --- | --- |
| $100 \leq h < 120$ | 7 | 110 | 7 |
| $120 \leq h < 140$ | 15 | 130 | 22 |
| $140 \leq h < 160$ | 20 | 150 | 42 |
| $160 \leq h < 180$ | 12 | 170 | 54 |
| $180 \leq h < 200$ | 6 | 190 | 60 |

On a cumulative frequency curve through $(100, 0)$, $(120, 7)$, $(140, 22)$, $(160, 42)$, $(180, 54)$, $(200, 60)$, reading across from 30 gives the same median, about 148 cm.

## Working backwards with the mean

Because $\sum x = n\bar{x}$, totals can be recovered from means.

:::worked-solution[Example 4: class A (30 learners) has a mean mark of 62 and class B (20 learners) a mean of 57. Find the mean of all 50 learners.]
1. Total for A $= 30 \times 62 = 1860$; total for B $= 20 \times 57 = 1140$.
2. Combined mean $= \dfrac{1860 + 1140}{50} = \dfrac{3000}{50} = 60$.
3. Note that this is not $\frac{62 + 57}{2} = 59.5$: the larger class counts more.
:::

:::worked-solution[Example 5: the values 1, 2, 3, 4 have frequencies 3, $k$, 6, 2, and the mean is 2.5. Find $k$.]
1. $\dfrac{3 + 2k + 18 + 8}{11 + k} = 2.5$.
2. $29 + 2k = 27.5 + 2.5k$.
3. $1.5 = 0.5k$, so $k = 3$.
:::

## Shape of a distribution

- **Symmetric**: mean = median = mode.
- **Positively skewed** (a long tail of large values, such as incomes): mode < median < mean. The few large values pull the mean up.
- **Negatively skewed** (a long tail of small values, such as marks in an easy test): mean < median < mode.

## Choosing an average

| Average | Advantages | Disadvantages |
| --- | --- | --- |
| Mean | uses every value; used in further calculations (variance) | affected by extreme values |
| Median | not affected by extreme values; good for skewed data | ignores most of the values |
| Mode | the only average for qualitative data; easy to find | may not exist or may not be unique |

:::keyfact{title="ZIMSEC and Cambridge"}
This topic is ZIMSEC Paper 2 Section C only; Cambridge 0606 has no statistics.
:::

## Common mistakes

:::mistake{title="Dividing by the number of classes"}
For a frequency table, divide $\sum fx$ by $\sum f$ (the number of values), not by the number of rows.
:::

:::mistake{title="Median of unordered data"}
Arrange the values in order first. The median of 12, 15, 9, … is not simply the middle number of the list as given.
:::

:::mistake{title="Using class limits for the median"}
Interpolate from the lower **boundary** of the median class.
:::

:::mistake{title="Averaging averages"}
The mean of two groups of different sizes is not the mean of their means.
:::

## Exam tips

:::exam-tip
Show a table with $x$ (or midpoints), $f$, $fx$ and cumulative $f$. The column totals earn marks even if a later step goes wrong.
:::

:::exam-tip
Say "estimate" for the mean or median of grouped data, and give 3 significant figures.
:::

:::exam-tip
When asked which average is best, refer to the data: extreme values or skew point to the median; qualitative data need the mode.
:::

## Summary

:::summary
- Mean $= \frac{\sum x}{n}$ or $\frac{\sum fx}{\sum f}$; for grouped data use midpoints (an estimate).
- Median: the middle value in order; for grouped data interpolate in the median class.
- Mode: most frequent value; grouped data give a modal class.
- Symmetric: mean = median = mode; positive skew: mode < median < mean.
- Use the median when there are extreme values, the mode for qualitative data.
:::
