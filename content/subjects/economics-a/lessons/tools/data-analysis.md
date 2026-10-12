---
{
  "key": "tools.data-analysis",
  "title": "Mean, median, mode and presenting economic data",
  "summary": "Calculate the mean, median and mode from raw, frequency and grouped data, use weighted means and percentage changes, build pie charts and graphs from tables and judge what data really shows.",
  "concepts": ["aecon.tools.data-analysis"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

An economist rarely works with one number. A ministry has thousands of household incomes, a shop has hundreds of daily takings and a farmer has many years of rainfall. To make sense of them we **summarise** the data with an average, **present** it in a table or chart and then **interpret** it carefully. This ZIMSEC Form 5 lesson covers those skills, which are tested in Paper 1 calculations, Paper 2 data-response questions and the continuous assessment.

You should already be comfortable with fractions, decimals, percentages and reading a simple table. All data in this lesson is fictional and for practice only. Weighted price indices and real values come later, in the lesson on price indices.

## Key definitions

:::definition{term="Mean"}
The sum of all the values divided by the number of values. Also called the arithmetic mean or average.
:::

:::definition{term="Median"}
The middle value when the data is arranged in order of size. With an even number of values it is the mean of the two middle values.
:::

:::definition{term="Mode"}
The value that occurs most often. In a grouped table, the *modal class* is the class with the highest frequency.
:::

:::definition{term="Weighted mean"}
A mean in which each value is multiplied by a weight showing its importance (for example the quantity sold) before the total is divided by the sum of the weights.
:::

## Averages from raw data

:::worked-solution{title="Mean, median, mode and range of raw data"}
Nine fictional airtime vendors in Harare sold the following amounts in a week (US\$): 12, 15, 9, 15, 20, 11, 15, 8, 25.

1. **Mean:** total $= 12 + 15 + 9 + 15 + 20 + 11 + 15 + 8 + 25 = 130$. Mean $= 130 \div 9 = 14.4$ (to 1 d.p.).
2. **Median:** order the values: 8, 9, 11, 12, **15**, 15, 15, 20, 25. The 5th of 9 values is **15**.
3. **Mode:** 15 appears three times, more than any other value.
4. **Range:** highest minus lowest $= 25 - 8 = 17$.
:::

The mean (14.4) is below the median (15) because it uses every value; if the largest value of 25 were 250 the mean would jump but the median would not move. So the median is better when there are extreme values (outliers), the mean when the data is spread fairly evenly, and the mode when we want the most common item, such as the most popular shoe size.

## Averages from a frequency table

When values repeat, they are listed with their **frequency** $f$.

| Children in household | Households ($f$) | Children × $f$ |
| ---: | ---: | ---: |
| 0 | 6 | 0 |
| 1 | 10 | 10 |
| 2 | 14 | 28 |
| 3 | 8 | 24 |
| 4 | 2 | 8 |
| **Total** | **40** | **70** |

- **Mean** $= 70 \div 40 = 1.75$ children per household. (Divide the total of the third column by the total frequency, not by the number of rows.)
- **Mode** $= 2$ children (highest frequency, 14).
- **Median:** with 40 households the middle lies between the 20th and 21st. The cumulative frequencies are 6, 16, 30, 38, 40, so both the 20th and 21st households have 2 children and the median is **2**.

## Averages from grouped data

When data is grouped in classes, the exact values are lost, so we use the **class mid-point** as a representative value. The result is an estimate.

| Monthly income (US\$) | Households ($f$) | Mid-point ($x$) | $f \times x$ |
| --- | ---: | ---: | ---: |
| 0 to under 100 | 8 | 50 | 400 |
| 100 to under 200 | 14 | 150 | 2,100 |
| 200 to under 300 | 20 | 250 | 5,000 |
| 300 to under 400 | 6 | 350 | 2,100 |
| 400 to under 500 | 2 | 450 | 900 |
| **Total** | **50** | | **10,500** |

- Estimated mean $= 10{,}500 \div 50 =$ US\$210.
- Modal class: 200 to under 300 (frequency 20).

## Weighted mean

If a trader sells three grades of beans at different prices, a simple average of the prices ignores how much of each grade is sold.

:::worked-solution{title="Weighted mean price"}
Grade A sells at US\$1.00 per kg (60 kg), grade B at US\$1.50 (30 kg) and grade C at US\$2.50 (10 kg).

1. Simple mean of the prices $= (1.00 + 1.50 + 2.50) \div 3$ = US\$1.67.
2. Total revenue $= 60 \times 1.00 + 30 \times 1.50 + 10 \times 2.50 = 60 + 45 + 25 = 130$.
3. Total quantity $= 60 + 30 + 10 = 100$ kg.
4. Weighted mean price $= 130 \div 100$ = **US\$1.30 per kg**.
5. The weighted mean is lower because most of the beans sold are the cheapest grade.
:::

## Presenting data

| Display | Best for | Key rule |
| --- | --- | --- |
| Table | Exact figures and comparison | Clear headings with units |
| Bar chart | Comparing separate categories | Equal-width bars with gaps; start the vertical axis at zero |
| Line graph | Change over time | Time on the horizontal axis; label units |
| Pie chart | Shares of a whole | Angle $= \dfrac{\text{value}}{\text{total}} \times 360^\circ$ |
| Frequency polygon | Shape of grouped data | Plot frequencies at class mid-points and join with straight lines |
| Pictogram | Simple display for a general audience | State what one symbol stands for |

:::worked-solution{title="Pie chart angles"}
Fictional government spending (US\$ million): education 150, health 100, transport 50, defence 40, other 60. Total $= 400$.

1. Education: $150 \div 400 \times 360^\circ = 135^\circ$.
2. Health: $100 \div 400 \times 360^\circ = 90^\circ$.
3. Transport: $50 \div 400 \times 360^\circ = 45^\circ$.
4. Defence: $40 \div 400 \times 360^\circ = 36^\circ$.
5. Other: $60 \div 400 \times 360^\circ = 54^\circ$.
6. Check: $135 + 90 + 45 + 36 + 54 = 360^\circ$.
:::

To describe a diagram in an examination, say what is on each axis, give the units and mention the highest, lowest and any trend.

## Percentages and index numbers

- **Percentage change** $= \dfrac{\text{new} - \text{old}}{\text{old}} \times 100$.
- A **simple index** shows a value relative to a base year set at 100: $\text{index} = \dfrac{\text{value}}{\text{base value}} \times 100$.

:::example{title="Percentage change and a simple index"}
A fictional loaf of bread costs US\$2.50 in the base year, US\$2.80 the next year and US\$2.66 the year after.

1. Index in year 2: $2.80 \div 2.50 \times 100 = 112$. Prices are 12% higher than in the base year.
2. Change from year 2 to year 3: $(2.66 - 2.80) \div 2.80 \times 100 = -5\%$.
3. Year 3 index: $2.66 \div 2.50 \times 100 = 106.4$.
4. A fall of 5% from year 2 is **not** a fall of 5 index points: the index fell from 112 to 106.4, a drop of 5.6 points.
:::

## Reading and criticising data

Always ask: *Who collected it, how many were asked, when, and is the scale honest?* A bar chart whose vertical axis starts at 90 instead of 0 makes small differences look huge. An average hides the spread (a mean income of US\$210 says nothing about the poorest households). A small sample, an old date or a biased source weakens a conclusion.

## Common mistakes

:::mistake{title="Dividing by the number of classes"}
For frequency tables, divide the total of $f \times x$ by the total frequency, not by the number of rows.
:::

:::mistake{title="Forgetting to order data before finding the median"}
The median is the middle of the *ordered* list, not the middle of the list as written.
:::

:::mistake{title="Using the class limits instead of mid-points"}
In grouped data use the mid-point $(\text{lower} + \text{upper}) \div 2$ and call the result an estimate.
:::

:::mistake{title="Percentages and percentage points"}
A rise from 8% to 10% is a rise of 2 percentage points, but a 25% increase in the rate.
:::

## Exam tips

:::exam-tip{title="Show your working"}
Write the formula, substitute the numbers, then give the answer with its unit and rounding. Method marks are awarded even when the final answer is wrong.
:::

:::exam-tip{title="Which average?"}
*Explain which average is more suitable* questions need a reason linked to the data: use the median when there are extreme values, the mode for the most common item, the mean when every value matters. This topic is tested in ZIMSEC Papers 1 and 2; Cambridge 9708 expects the skills but does not examine them as a separate topic.
:::

## Summary

:::summary
- Mean is total ÷ number of values; median is the middle value of ordered data; mode is the most frequent value.
- For frequency tables divide $\sum fx$ by $\sum f$; for grouped data use class mid-points and call the mean an estimate.
- A weighted mean uses weights such as quantities sold.
- Pie chart angle $= \dfrac{\text{value}}{\text{total}} \times 360^\circ$; percentage change $= \dfrac{\text{change}}{\text{original}} \times 100$.
- A simple index sets the base year at 100; percentage change and index-point change are different.
- Always check the source, sample size, date and scale of data before drawing conclusions.
:::
