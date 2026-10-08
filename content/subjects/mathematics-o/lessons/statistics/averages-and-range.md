---
{
  "key": "statistics.averages-and-range",
  "title": "Averages and range",
  "summary": "Calculate the mean, median, mode and range of a list and of an ungrouped frequency table, choose the most suitable average, and (Extended) find the quartiles and interquartile range of a list.",
  "concepts": ["math.statistics.averages-and-range"],
  "objectives": ["zimsec/o-level/mathematics:9.0.3", "cambridge/igcse/mathematics:9.3.1", "cambridge/igcse/mathematics:9.3.2"],
  "estimatedMinutes": 17,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

A vendor at a market in Mutare sells tomatoes every day. On some days she sells a lot and on others very little. If she wants one number to describe a "typical" day, she needs an **average**. If she wants to know how much her sales vary, she needs a **measure of spread**.

There are three averages, each useful in different situations: the **mean**, the **median** and the **mode**. The simplest measure of spread is the **range**. In this lesson you will calculate all four from a list and from a frequency table, and learn which average to choose. Extended candidates also find the **quartiles** and the **interquartile range**.

## Key definitions

:::definition{term="Mean"}
The total of all the values divided by the number of values:

$$
\text{mean} = \frac{\text{sum of the values}}{\text{number of values}}
$$
:::

:::definition{term="Median"}
The middle value when the values are arranged in order. For $n$ values it is the $\frac{n + 1}{2}$th value; if $n$ is even, it is halfway between the two middle values.
:::

:::definition{term="Mode"}
The value that occurs most often. A set of data can have more than one mode, or none.
:::

:::definition{term="Range"}
The difference between the largest and smallest values: range $=$ largest $-$ smallest. It is a single number, not an interval.
:::

## Averages from a list

:::worked-solution[Example 1: a week of tomato sales]
The vendor's daily sales, in kg, for a week were: 12, 15, 9, 15, 20, 11, 16.

1. In order: 9, 11, 12, 15, 15, 16, 20.
2. Mean $= \dfrac{9 + 11 + 12 + 15 + 15 + 16 + 20}{7} = \dfrac{98}{7} = 14$ kg.
3. Median: there are 7 values, so it is the 4th: $15$ kg.
4. Mode: 15 occurs twice, so the mode is $15$ kg.
5. Range $= 20 - 9 = 11$ kg.
:::

:::worked-solution[Example 2: an even number of values]
Find the median of 3, 7, 4, 9, 6, 5, 8, 10.

1. In order: 3, 4, 5, 6, 7, 8, 9, 10.
2. With 8 values the middle is between the 4th and 5th values, 6 and 7.
3. Median $= \dfrac{6 + 7}{2} = 6.5$. The median does not have to be one of the values.
:::

## Averages from a frequency table

In a frequency table, each value $x$ occurs $f$ times, so the total of all the values is $\sum fx$ (the sum of value × frequency) and the number of values is $\sum f$.

:::formula{name="Mean of a frequency table"}
$$
\text{mean} = \frac{\sum fx}{\sum f}
$$
:::

:::worked-solution[Example 3: number of children in 40 families]
| Number of children, $x$ | 0 | 1 | 2 | 3 | 4 |
| --- | :---: | :---: | :---: | :---: | :---: |
| Frequency, $f$ | 4 | 11 | 13 | 8 | 4 |
| $fx$ | 0 | 11 | 26 | 24 | 16 |

1. $\sum f = 40$ and $\sum fx = 0 + 11 + 26 + 24 + 16 = 77$.
2. Mean $= \dfrac{77}{40} = 1.925$ children.
3. Median: the 20th and 21st values. Running totals of the frequencies are 4, 15, 28, …, so the 16th to 28th values are all 2. Median $= 2$.
4. Mode: the value with the highest frequency (13) is $2$. Note that the mode is 2, not 13.
5. Range $= 4 - 0 = 4$.
:::

## Choosing an average

| Average | Advantages | Disadvantages |
| --- | --- | --- |
| Mean | uses every value | distorted by extreme values |
| Median | not affected by extreme values | does not use every value |
| Mode | can be used for categories; shows the most common value | may not exist or there may be several |

:::example{title="Wages with an extreme value"}
The weekly wages, in US dollars, of six workers at a small business are 180, 210, 220, 230, 240 and 1600 (the owner). The mean is about US\$447, which is more than five of the six people earn. The median, US\$225, describes a typical worker much better.
:::

A shoe shop deciding which size to stock most of should use the **mode**, because it wants the most common size, not a size such as 6.4 that does not exist.

## Quartiles and interquartile range (Extended)

The **lower quartile** $Q_1$ is the median of the lower half of the ordered data and the **upper quartile** $Q_3$ is the median of the upper half (when $n$ is odd, leave the median itself out of both halves). For an odd number of values this is the same as taking the $\frac{n + 1}{4}$th value for $Q_1$ and the $\frac{3(n + 1)}{4}$th value for $Q_3$.

:::formula{name="Interquartile range"}
$$
\text{IQR} = Q_3 - Q_1
$$

It measures the spread of the middle half of the data and is not affected by extreme values.
:::

:::worked-solution[Example 4: quartiles of 11 values]
3, 5, 6, 8, 9, 10, 12, 14, 15, 17, 20 (already in order).

1. $n = 11$: median is the 6th value, $10$.
2. $Q_1$ is the $\frac{11 + 1}{4} = 3$rd value, $6$; $Q_3$ is the $\frac{3(11 + 1)}{4} = 9$th value, $15$.
3. IQR $= 15 - 6 = 9$.
:::

## Common mistakes

:::mistake{title="Finding the median without ordering"}
The median is the middle of the **ordered** list. The middle of an unordered list is meaningless.
:::

:::mistake{title="Dividing by the number of rows"}
For a frequency table, divide $\sum fx$ by $\sum f$ (the number of values), not by the number of different values in the table.
:::

:::mistake{title="Giving the frequency as the mode"}
The mode is the **value** that occurs most often, not how many times it occurs.
:::

:::mistake{title="Writing the range as an interval"}
The range of data from 9 to 20 is 11, not "9–20".
:::

## Exam tips

:::exam-tip
Show the total in a mean calculation (for example $\frac{98}{7}$). If the arithmetic slips, the method can still earn a mark.
:::

:::exam-tip
For "**Which average** would you use? Give a reason", name the average and give a reason linked to the data, such as "the median, because the value 1600 is much larger than the others".
:::

:::exam-tip
In a frequency table, add an $fx$ column and a running total column. They make the mean and the median straightforward.
:::

## Summary

:::summary
- Mean $=$ total ÷ number of values; for a frequency table, $\frac{\sum fx}{\sum f}$.
- Median: the middle of the ordered values (the $\frac{n + 1}{2}$th value).
- Mode: the most common value. Range: largest $-$ smallest.
- Use the median when there are extreme values, the mode for categories or the most common item, and the mean when every value should count.
- Extended: IQR $= Q_3 - Q_1$, the spread of the middle half of the data.
:::
