---
{
  "key": "statistics.grouped-data-averages",
  "title": "Averages of grouped data",
  "summary": "Estimate the mean of grouped data using mid-interval values, identify the modal class and the class containing the median, and (ZIMSEC) calculate the mean using an assumed mean.",
  "concepts": ["math.statistics.grouped-data-averages"],
  "objectives": ["zimsec/o-level/mathematics:9.0.3", "cambridge/igcse/mathematics:9.3.3"],
  "estimatedMinutes": 16,
  "level": "extended"
}
---
## Introduction

A school asks 40 learners how long it takes them to travel to school. To keep the results simple, the times are recorded in groups: up to 10 minutes, 10 to 20 minutes, and so on. Now the exact times are lost. Can we still find an average journey time?

We can **estimate** it. In this lesson you will estimate the mean of grouped data using the middle value of each class, find the **modal class** and the class that contains the **median**, and (for ZIMSEC) use an **assumed mean** to make the arithmetic easier. In the Cambridge syllabus this is Extended content.

You should be able to find the mean of an ungrouped frequency table using $\frac{\sum fx}{\sum f}$.

## Key definitions

:::definition{term="Mid-interval value (midpoint)"}
The value halfway between the boundaries of a class. For $10 < t \leq 20$ it is $\frac{10 + 20}{2} = 15$.
:::

:::definition{term="Modal class"}
The class with the highest frequency (for classes of equal width).
:::

:::definition{term="Class containing the median"}
The class in which the middle value of the ordered data lies, found from running totals of the frequencies.
:::

:::formula{name="Estimated mean of grouped data"}
$$
\text{estimated mean} = \frac{\sum fx}{\sum f}, \quad \text{where } x \text{ is the midpoint of each class}
$$
:::

:::keyfact{title="Why only an estimate?"}
Using the midpoint assumes that the values in each class are spread evenly around its middle. The actual values are unknown, so the result is an estimate of the true mean.
:::

## Estimating the mean

:::worked-solution[Example 1: journey times]
| Time, $t$ (minutes) | $0 < t \leq 10$ | $10 < t \leq 20$ | $20 < t \leq 30$ | $30 < t \leq 40$ | $40 < t \leq 50$ |
| --- | :---: | :---: | :---: | :---: | :---: |
| Frequency, $f$ | 6 | 13 | 11 | 7 | 3 |
| Midpoint, $x$ | 5 | 15 | 25 | 35 | 45 |
| $fx$ | 30 | 195 | 275 | 245 | 135 |

1. $\sum f = 6 + 13 + 11 + 7 + 3 = 40$.
2. $\sum fx = 30 + 195 + 275 + 245 + 135 = 880$.
3. Estimated mean $= \dfrac{880}{40} = 22$ minutes.
4. Modal class: $10 < t \leq 20$ (frequency 13).
5. Median: the middle of 40 values is between the 20th and 21st. Running totals: 6, 19, 30, … The 20th and 21st values are in the third class, so the median lies in $20 < t \leq 30$.
:::

## How good is the estimate?

:::example{title="Comparing an estimate with the true mean"}
Ten journey times, in minutes, were 12, 14, 15, 17, 19, 21, 23, 26, 28 and 29. Their true mean is $\frac{204}{10} = 20.4$ minutes.

Grouped as $10 < t \leq 20$ (5 values) and $20 < t \leq 30$ (5 values), the estimated mean is $\frac{5 \times 15 + 5 \times 25}{10} = 20$ minutes.

The estimate is close but not exact: in each class the values average a little more than the midpoint ($\frac{77}{5} = 15.4$ compared with 15, and $\frac{127}{5} = 25.4$ compared with 25), so the estimate is a little too low.
:::

The estimate is usually good when there are many values and they are spread fairly evenly within each class. It is poor when the values in a class bunch at one end.

## Discrete data in classes

For whole-number data grouped as 21–30, 31–40, …, the midpoint of 21–30 is $\frac{21 + 30}{2} = 25.5$, not 25.

:::worked-solution[Example 2: test marks]
| Mark | 21–30 | 31–40 | 41–50 | 51–60 | 61–70 |
| --- | :---: | :---: | :---: | :---: | :---: |
| Frequency | 4 | 7 | 10 | 6 | 3 |
| Midpoint | 25.5 | 35.5 | 45.5 | 55.5 | 65.5 |

1. $\sum f = 30$.
2. $\sum fx = 4(25.5) + 7(35.5) + 10(45.5) + 6(55.5) + 3(65.5) = 102 + 248.5 + 455 + 333 + 196.5 = 1335$.
3. Estimated mean $= \dfrac{1335}{30} = 44.5$ marks.
:::

## Using an assumed mean (ZIMSEC)

With large midpoints the products $fx$ become big. Choose an **assumed mean** $A$, usually a midpoint near the middle of the table, and work with deviations $d = x - A$.

:::formula{name="Mean using an assumed mean"}
$$
\text{mean} = A + \frac{\sum fd}{\sum f}, \quad d = x - A
$$
:::

:::worked-solution[Example 3: the journey times again, with $A = 25$]
1. Deviations $d = x - 25$: $-20, -10, 0, 10, 20$.
2. $fd$: $6 \times (-20) = -120$, $13 \times (-10) = -130$, $0$, $7 \times 10 = 70$, $3 \times 20 = 60$.
3. $\sum fd = -120 - 130 + 0 + 70 + 60 = -120$.
4. Mean $= 25 + \dfrac{-120}{40} = 25 - 3 = 22$ minutes, the same as before.
:::

The assumed mean can be any value: the method always gives the same answer. Choosing a central midpoint keeps the numbers small.

## Common mistakes

:::mistake{title="Using the class boundary instead of the midpoint"}
Multiplying each frequency by the upper boundary (10, 20, 30, …) overestimates the mean. Use the midpoint of each class.
:::

:::mistake{title="Dividing by the number of classes"}
Divide $\sum fx$ by $\sum f$, the total frequency (40 learners), not by the number of classes (5).
:::

:::mistake{title="Giving a frequency as the modal class"}
The modal class is a class, such as $10 < t \leq 20$, not its frequency 13.
:::

:::mistake{title="Using the wrong midpoint for whole-number classes"}
For the class 21–30 of whole numbers, the midpoint is 25.5. Using 25 for every class lowers the estimate by 0.5.
:::

:::mistake{title="Calling the estimate exact"}
The answer from grouped data is an **estimate**. Say "estimated mean".
:::

## Exam tips

:::exam-tip
Add a midpoint column and an $fx$ column to the table and show the two totals. Typically there is a mark for using midpoints, a mark for $\sum fx$ and a mark for the final division.
:::

:::exam-tip
"**Write down the modal class**" needs only the class. "**Find the class containing the median**" needs the running totals: show them.
:::

:::exam-tip
Check that your estimated mean lies within the range of the data and near the classes with the highest frequencies.
:::

## Summary

:::summary
- Use the midpoint $x$ of each class: estimated mean $= \frac{\sum fx}{\sum f}$.
- For discrete classes like 21–30, the midpoint is 25.5.
- The modal class has the highest frequency; the median class is found from running totals.
- The result is an estimate because the exact values are not known.
- ZIMSEC: mean $= A + \frac{\sum fd}{\sum f}$ with $d = x - A$.
:::
