---
{
  "key": "statistics.collecting-and-classifying-data",
  "title": "Collecting and classifying data",
  "summary": "Classify data as qualitative or quantitative, discrete or continuous, and organise it in tally charts, frequency tables, grouped frequency tables and two-way tables.",
  "concepts": ["math.statistics.data-collection-and-classification"],
  "objectives": ["zimsec/o-level/mathematics:9.0.1", "cambridge/igcse/mathematics:9.1.1"],
  "estimatedMinutes": 16,
  "level": "core"
}
---
## Introduction

An agricultural extension officer in Masvingo province visits 20 households and records how many people live in each, how much maize each harvested and what crops they grow. A list of raw numbers and words is hard to read. Before anyone can draw a chart or work out an average, the data must be **classified** and **organised** into tables.

In this lesson you will learn the main types of data, how to collect data sensibly, and how to organise it in tally charts, frequency tables, grouped frequency tables and two-way tables. Everything else in statistics (charts, averages and spread) starts from tables like these.

## Key definitions

:::definition{term="Qualitative (categorical) data"}
Data described by words or categories, not numbers: favourite fruit, type of roof, province of birth.
:::

:::definition{term="Quantitative (numerical) data"}
Data that are numbers obtained by counting or measuring.
:::

:::definition{term="Discrete data"}
Quantitative data that can take only particular separate values, usually found by **counting**: the number of goats in a herd, shoe sizes, the number of goals scored.
:::

:::definition{term="Continuous data"}
Quantitative data that can take any value in a range, found by **measuring**: height, mass, time, temperature, rainfall.
:::

:::definition{term="Frequency"}
The number of times a value, or a value in a class, occurs.
:::

## Collecting data

ZIMSEC candidates can be asked about collecting data. The Cambridge syllabus examines only how data are classified and tabulated, but the ideas below still help you to judge a set of data.

Data you collect yourself, by a **questionnaire**, by **observation** or by an **experiment**, are **primary data**. Data that someone else has already collected, such as published rainfall records or census tables, are **secondary data**.

A good questionnaire question is clear, does not lead the person towards an answer, and gives response boxes that do not overlap and that cover every possible answer. "How many hours of television do you watch per week?" with boxes "less than 5", "5 to less than 10", "10 to less than 15" and "15 or more" is a good example.

## Tally charts and frequency tables

To count data, go through the list once, making a tally mark for each item. Tally marks are drawn in groups of five, with the fifth mark drawn across the other four, so they are easy to add up.

:::worked-solution[Example 1: household sizes]
The numbers of people in 20 households are:

3, 5, 2, 4, 6, 4, 5, 3, 4, 7, 2, 4, 5, 3, 6, 4, 4, 3, 5, 8

1. Go through the list once, tallying each value.
2. Count the tallies to get the frequencies:

| Number of people | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
| --- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| Frequency | 2 | 4 | 6 | 4 | 2 | 1 | 1 |

3. Check: $2 + 4 + 6 + 4 + 2 + 1 + 1 = 20$, the number of households.
:::

## Grouped frequency tables

When there are many different values, group them into **classes**. For continuous data use inequalities so that there are no gaps and no overlaps: $60 \leq h < 65$ includes 60 but not 65, so 65 goes into the next class. The **class width** of $60 \leq h < 65$ is $65 - 60 = 5$.

:::worked-solution[Example 2: heights of young maize plants]
The heights, in cm, of 16 young maize plants are:

62.5, 71.0, 58.4, 66.9, 74.2, 69.8, 60.0, 77.5, 65.3, 70.1, 63.8, 68.0, 59.6, 72.4, 66.0, 75.9

1. The smallest value is 58.4 and the largest is 77.5, so classes of width 5 from 55 to 80 cover them all.
2. Tally each height into its class. Note that 60.0 goes in $60 \leq h < 65$ and 70.1 in $70 \leq h < 75$.

| Height, $h$ (cm) | $55 \leq h < 60$ | $60 \leq h < 65$ | $65 \leq h < 70$ | $70 \leq h < 75$ | $75 \leq h < 80$ |
| --- | :---: | :---: | :---: | :---: | :---: |
| Frequency | 2 | 3 | 5 | 4 | 2 |

3. Check: $2 + 3 + 5 + 4 + 2 = 16$.
:::

For discrete data, classes such as 0–4, 5–9, 10–14 are fine, because no value can fall between 4 and 5. Grouping loses some detail: from the table you can no longer tell the exact height of each plant.

## Two-way tables

A two-way table records two features of each item at once. Row and column totals help you find missing entries.

:::worked-solution[Example 3: completing a two-way table]
A survey of 60 learners records gender and whether they walk to school. 34 learners walk; 28 learners are girls; 15 girls walk.

| | Walk | Do not walk | Total |
| --- | :---: | :---: | :---: |
| Girls | 15 | | 28 |
| Boys | | | |
| Total | 34 | | 60 |

1. Girls who do not walk: $28 - 15 = 13$.
2. Boys: $60 - 28 = 32$. Boys who walk: $34 - 15 = 19$.
3. Boys who do not walk: $32 - 19 = 13$, and the "Do not walk" total is $13 + 13 = 26 = 60 - 34$. The table is consistent.
:::

## Common mistakes

:::mistake{title="Overlapping or gappy classes"}
Classes "40–50, 50–60" leave it unclear where 50 goes, and "40–49, 51–60" leave out 50 completely. For continuous data use $40 \leq m < 50$, $50 \leq m < 60$.
:::

:::mistake{title="Calling counted data continuous"}
Shoe sizes and numbers of people are discrete even though shoe sizes can be halves: there is nothing between size 6 and size 6.5. Measurements such as mass and time are continuous.
:::

:::mistake{title="Not checking the total"}
The frequencies must add up to the number of data items. If they do not, an item was missed or counted twice.
:::

## Exam tips

:::exam-tip
"**Complete the frequency table**" usually gives a mark for the tallies or the frequencies and a mark for the correct total. Cross off each raw value as you tally it.
:::

:::exam-tip
In a two-way table question, fill in the cell that can be found from **one** subtraction first, and keep going. Check that every row and column adds up.
:::

:::exam-tip
When asked to classify data, give both levels: for example "quantitative and continuous", not just "numbers".
:::

## Summary

:::summary
- Qualitative data are categories; quantitative data are numbers.
- Discrete data are counted (separate values); continuous data are measured (any value in a range).
- Tally in groups of five and check that the frequencies add up to the total.
- Grouped tables for continuous data use inequalities such as $60 \leq h < 65$, with no gaps or overlaps.
- Two-way tables show two features at once; use the row and column totals to fill in missing cells.
:::
