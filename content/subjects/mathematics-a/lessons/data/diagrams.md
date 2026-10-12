---
{
  "key": "data.diagrams",
  "title": "Collecting data and statistical diagrams",
  "summary": "Classify data, choose a suitable way to collect and present it, and draw and interpret stem-and-leaf diagrams (including back-to-back) and box-and-whisker plots, with outliers and comparisons between data sets.",
  "concepts": ["amaths.data.diagrams"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Statistics starts with raw data: the masses of tobacco bales on an auction floor in Harare, the times learners take to walk to school, the daily rainfall at a weather station in Masvingo. Before calculating anything, you decide how to collect the data and how to display it so that its shape, centre and spread can be seen at a glance.

This lesson covers ZIMSEC Statistics (Form 5, data collection and presentation) and Cambridge 9709 Paper 5 (topic 5.1). Both boards examine **stem-and-leaf diagrams** and **box-and-whisker plots**, and ask you to choose a suitable diagram and discuss its advantages and disadvantages. ZIMSEC also examines the methods of collecting data, the types of data, and the familiar diagrams from O Level: bar graphs, pie charts, pictograms and line graphs.

## Key definitions

:::definition{term="Qualitative and quantitative data"}
**Qualitative** (categorical) data are descriptions, such as a favourite subject or the colour of a car. **Quantitative** data are numbers, such as a mass or a count.
:::

:::definition{term="Discrete and continuous data"}
**Discrete** data can take only particular values, usually counts (the number of goats on a farm). **Continuous** data can take any value in a range and are measured (a height, a time, a mass), so they are always rounded.
:::

:::definition{term="Primary and secondary data"}
**Primary** data are collected by the investigator for the purpose in hand. **Secondary** data were collected by someone else, for example from school records or a published report.
:::

:::definition{term="Five-number summary"}
The minimum, lower quartile $Q_1$, median $Q_2$, upper quartile $Q_3$ and maximum. A box-and-whisker plot is a picture of these five numbers.
:::

:::formula{name="Interquartile range and outliers (not in MF19)"}
$$
\text{IQR} = Q_3 - Q_1
$$

A common rule treats a value as an **outlier** if it lies more than $1.5 \times \text{IQR}$ below $Q_1$ or above $Q_3$. Questions state the rule they want.
:::

## Collecting data (ZIMSEC)

ZIMSEC expects you to describe and design instruments for collecting data:

- **Questionnaires**: cheap, reach many people, can be anonymous; but response rates may be low and questions can be misread. Good questions are short, clear, not leading, and offer tick boxes that do not overlap ("0–1 h, more than 1 h up to 2 h, …").
- **Interviews**: questions can be explained and followed up; but they are slow, and the interviewer can influence answers.
- **Observation**: records what actually happens (counting kombis passing a point each minute); it can be time-consuming.
- **Experiments**: control conditions to measure an effect (yield of maize with and without fertiliser).
- **Records**: existing data (attendance registers, hospital records); quick, but the data may not match your purpose exactly.

## Stem-and-leaf diagrams

A stem-and-leaf diagram keeps every raw value while showing the shape of the distribution. Each value is split into a **stem** (the leading digits) and a **leaf** (the last digit). Leaves are written in order, and the diagram **must have a key**, such as "$2 \mid 4$ means 24 minutes".

:::worked-solution[Example 1: walking times of 15 learners]
The times, in minutes, are 8, 12, 15, 15, 17, 21, 22, 24, 26, 28, 31, 33, 35, 40, 47.

1. Stems 0 to 4: the rows are $0 \mid 8$; $1 \mid 2\ 5\ 5\ 7$; $2 \mid 1\ 2\ 4\ 6\ 8$; $3 \mid 1\ 3\ 5$; $4 \mid 0\ 7$. Key: $1 \mid 2$ means 12 minutes.
2. With $n = 15$ the median is the 8th value: $Q_2 = 24$.
3. The lower half is the 7 values below the median; its middle (4th) value gives $Q_1 = 15$. The upper half gives $Q_3 = 33$ (the 12th value).
4. $\text{IQR} = 33 - 15 = 18$ minutes.
:::

A **back-to-back** stem-and-leaf diagram compares two sets on one shared stem. The leaves of the left-hand set are written from right to left, increasing away from the stem, and the key must explain both sides: "$5 \mid 3 \mid 1$ means 35 marks for Form 5A and 31 marks for Form 5B".

:::worked-solution[Example 2: comparing two classes]
Form 5A marks: 34, 41, 45, 48, 52, 53, 57, 61, 64, 68, 75. Form 5B marks: 29, 38, 44, 47, 49, 50, 51, 55, 58, 66, 83.

1. Each class has 11 marks, so the median is the 6th value and the quartiles are the 3rd and 9th values.
2. Form 5A: $Q_1 = 45$, median $= 53$, $Q_3 = 64$, $\text{IQR} = 19$.
3. Form 5B: $Q_1 = 44$, median $= 50$, $Q_3 = 58$, $\text{IQR} = 14$.
4. Compare in context: Form 5A scored higher on average (median 53 against 50); Form 5B's middle half of marks is less spread out (IQR 14 against 19), although its range is wider because of the mark of 83.
:::

## Box-and-whisker plots

A box plot is drawn against a scale. The box runs from $Q_1$ to $Q_3$ with a line at the median; the whiskers run to the smallest and largest values that are **not** outliers, and outliers are marked separately with a cross.

:::worked-solution[Example 3: rain days with an outlier]
The numbers of rainy days in a month at 11 weather stations are 3, 5, 6, 6, 7, 8, 9, 10, 11, 12, 29. Outliers are values more than $1.5 \times \text{IQR}$ beyond the quartiles.

1. $Q_1 = 6$ (3rd value), median $= 8$ (6th value), $Q_3 = 11$ (9th value); $\text{IQR} = 5$.
2. Upper fence: $11 + 1.5 \times 5 = 18.5$. Lower fence: $6 - 7.5 = -1.5$.
3. 29 is above 18.5, so 29 is an outlier; nothing lies below the lower fence.
4. Draw the box from 6 to 11 with the median at 8, the lower whisker to 3, the upper whisker to 12 (the largest value that is not an outlier), and a cross at 29.
:::

![Box-and-whisker plot of the rainy days at 11 weather stations: the box runs from Q1 = 6 to Q3 = 11 with the median at 8, the whiskers reach 3 and 12, and the value 29, above the upper fence 18.5, is marked as an outlier with a cross.](media:diagrams/box-plot-with-outlier.png "Figure: box plot with the outlier 29 beyond the upper fence 18.5")

The **shape** shows in a box plot: if the median is nearer $Q_1$ and the upper whisker is longer, the data are **positively skewed** (a long tail of high values); the mirror image is negative skew; a central median with equal whiskers suggests a symmetrical distribution.

## Bar graphs, pie charts, pictograms and line graphs (ZIMSEC)

Bar graphs and pictograms compare categories; a **pie chart** shows each category as a share of the whole, with sector angle $\dfrac{\text{frequency}}{\text{total}} \times 360^\circ$; a **line graph** shows how a quantity changes over time.

:::worked-solution[Example 4: a household budget pie chart]
A family spends US\$180 on food, US\$150 on rent, US\$60 on transport, US\$90 on school fees and US\$60 on other items in a month.

1. Total: $180 + 150 + 60 + 90 + 60 = 540$ dollars.
2. Food: $\frac{180}{540} \times 360^\circ = 120^\circ$. Rent: $\frac{150}{540} \times 360^\circ = 100^\circ$.
3. Transport and other: $\frac{60}{540} \times 360^\circ = 40^\circ$ each. School fees: $60^\circ$.
4. Check: $120 + 100 + 40 + 60 + 40 = 360^\circ$.
:::

## Choosing a diagram

| Diagram | Advantages | Disadvantages |
| --- | --- | --- |
| Stem-and-leaf | keeps raw values; shows shape; median and quartiles easy to read | awkward for large data sets |
| Box plot | compares several sets quickly; shows skew and outliers | loses the raw values and the mean |
| Histogram | suits large continuous data sets in classes | raw values lost; needs class boundaries |
| Pie chart | shows proportions of a whole | hard to compare similar sectors; no exact values |

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge 5.1 examines stem-and-leaf diagrams, box plots, histograms and cumulative frequency graphs, and choosing between them. ZIMSEC also examines data collection methods, types of data, frequency polygons, bar graphs, pie charts, pictograms and line graphs.
:::

## Common mistakes

:::mistake{title="No key, or a key that does not explain both sides"}
A stem-and-leaf diagram without a key loses a mark. In a back-to-back diagram the key must show how to read the left and the right leaves.
:::

:::mistake{title="Leaves not in order, or not lined up"}
Leaves should be in ascending order away from the stem and in neat columns, so the diagram acts like a bar chart.
:::

:::mistake{title="Whiskers drawn to an outlier"}
When outliers are shown, the whisker stops at the most extreme value that is not an outlier.
:::

:::mistake{title="Comparing without context"}
"5A is higher" is not enough: say which measure you used (median 53 against 50) and what it means (5A did better on average).
:::

## Exam tips

:::exam-tip
When asked to **compare** two data sets, give one comparison of a measure of location (median) and one of a measure of spread (IQR or range), each in context.
:::

:::exam-tip
Draw box plots on graph paper against a labelled scale; use the same scale for two plots you are comparing.
:::

:::exam-tip
State which quartile method you use for raw data. With $n = 4k + 3$ values the common methods agree.
:::

## Summary

:::summary
- Data are qualitative or quantitative; quantitative data are discrete (counted) or continuous (measured); primary data are collected first-hand, secondary data come from elsewhere.
- A stem-and-leaf diagram keeps every value, with ordered leaves and a key; a back-to-back diagram compares two sets.
- The five-number summary gives a box plot; $\text{IQR} = Q_3 - Q_1$, and outliers are often values beyond $1.5 \times \text{IQR}$ from the quartiles.
- Skew shows in the position of the median within the box and in the whisker lengths.
- Choose a diagram for the data and the purpose, and compare data sets using a measure of location and a measure of spread in context.
:::
