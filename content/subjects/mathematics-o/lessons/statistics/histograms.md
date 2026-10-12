---
{
  "key": "statistics.histograms",
  "title": "Histograms and frequency polygons",
  "summary": "Draw and interpret histograms with equal and unequal class widths using frequency density, find frequencies from a histogram, and (ZIMSEC) draw frequency polygons.",
  "concepts": ["math.statistics.histograms"],
  "objectives": ["zimsec/o-level/mathematics:9.0.2", "cambridge/igcse/mathematics:9.7.1", "cambridge/igcse/mathematics:9.7.2"],
  "estimatedMinutes": 16,
  "level": "extended"
}
---
## Introduction

A clinic in Masvingo records the ages of 100 patients seen in one morning. Children's ages are grouped in narrow classes (0 to 10, 10 to 20 years), but adults are grouped in wider classes (20 to 40, 40 to 60 years). If we drew an ordinary bar chart with heights equal to the frequencies, the wide classes would look far more important than they really are.

A **histogram** solves this problem by making the **area** of each bar, not its height, represent the frequency. In this lesson you will calculate **frequency density**, draw and read histograms with unequal class widths, and (for ZIMSEC) draw **frequency polygons**. For Cambridge, histograms are Extended content only.

You should know how to find class widths and midpoints of grouped continuous data.

## Key definitions

:::definition{term="Histogram"}
A diagram for grouped continuous data in which the bars touch, each bar covers its class on the horizontal axis, and the **area** of each bar is proportional to the frequency of the class.
:::

:::formula{name="Frequency density"}
$$
\text{frequency density} = \frac{\text{frequency}}{\text{class width}}
$$

so frequency $=$ frequency density $\times$ class width.
:::

:::keyfact{title="Equal and unequal widths"}
When all classes have the same width, the bar heights can simply be the frequencies. When the widths are unequal, the height of each bar must be its **frequency density**.
:::

:::definition{term="Frequency polygon (ZIMSEC)"}
A graph made by plotting the frequency of each class against its **midpoint** and joining the points with straight lines.
:::

## Drawing a histogram

:::worked-solution[Example 1: ages of 100 patients]
| Age, $a$ (years) | $0 < a \leq 10$ | $10 < a \leq 20$ | $20 < a \leq 40$ | $40 < a \leq 60$ | $60 < a \leq 80$ |
| --- | :---: | :---: | :---: | :---: | :---: |
| Frequency | 16 | 12 | 28 | 24 | 20 |
| Class width | 10 | 10 | 20 | 20 | 20 |
| Frequency density | 1.6 | 1.2 | 1.4 | 1.2 | 1.0 |

1. Class widths: $10 - 0 = 10$, $20 - 10 = 10$, $40 - 20 = 20$, and so on.
2. Frequency density $=$ frequency ÷ width: $16 \div 10 = 1.6$, $12 \div 10 = 1.2$, $28 \div 20 = 1.4$, $24 \div 20 = 1.2$, $20 \div 20 = 1.0$.
3. Draw bars with no gaps: from 0 to 10 with height 1.6, from 10 to 20 with height 1.2, from 20 to 40 with height 1.4, and so on. Label the vertical axis "Frequency density".
:::

Notice that the class $20 < a \leq 40$ has the largest frequency (28) but not the tallest bar: its 28 patients are spread over 20 years, so they are less concentrated than the 16 children in $0 < a \leq 10$.

![Histogram of the ages of 100 patients with bars of unequal width: heights are frequency densities 1.6 (0 to 10 years), 1.2 (10 to 20), 1.4 (20 to 40), 1.2 (40 to 60) and 1.0 (60 to 80); the 20 to 40 bar holds the most patients (28) but is not the tallest.](media:diagrams/histogram-patient-ages.png "Figure: the area of each bar, not its height, is the frequency")

Check the areas: the bar for $0 < a \leq 10$ has area $1.6 \times 10 = 16$ and the bar for $20 < a \leq 40$ has area $1.4 \times 20 = 28$, exactly the frequencies. Frequency density has units of "frequency per unit of the variable", here "patients per year of age".

## Reading a histogram

To find a frequency, multiply the height (frequency density) by the width of the bar.

:::worked-solution[Example 2: frequencies from bars]
A histogram of the times taken to complete a task has a bar from 20 to 35 minutes with height 2.4.

1. Class width $= 35 - 20 = 15$ minutes.
2. Frequency $= 2.4 \times 15 = 36$.
:::

You can also estimate how many values lie in part of a class by assuming the values are spread evenly across it.

:::worked-solution[Example 3: part of a class]
Using the patients in Example 1, estimate how many were aged between 30 and 50.

1. 30 to 40 is half of the class $20 < a \leq 40$: $\frac{1}{2} \times 28 = 14$.
2. 40 to 50 is half of the class $40 < a \leq 60$: $\frac{1}{2} \times 24 = 12$.
3. Estimate: $14 + 12 = 26$ patients.
:::

## Frequency polygons (ZIMSEC)

:::worked-solution[Example 4: masses of 50 pumpkins]
| Mass, $m$ (kg) | $1 < m \leq 2$ | $2 < m \leq 3$ | $3 < m \leq 4$ | $4 < m \leq 5$ | $5 < m \leq 6$ |
| --- | :---: | :---: | :---: | :---: | :---: |
| Frequency | 4 | 11 | 18 | 12 | 5 |

1. Midpoints: 1.5, 2.5, 3.5, 4.5, 5.5.
2. Plot $(1.5, 4)$, $(2.5, 11)$, $(3.5, 18)$, $(4.5, 12)$ and $(5.5, 5)$ and join them with straight lines.
3. To close the polygon, you may join to $(0.5, 0)$ and $(6.5, 0)$, the midpoints of the empty classes on either side.
:::

Frequency polygons are useful for comparing two distributions on the same axes, because two polygons are easier to compare than two sets of overlapping bars.

## Common mistakes

:::mistake{title="Using frequency as the height with unequal widths"}
With unequal class widths, a bar whose height is the frequency makes wide classes look too important. Use frequency density.
:::

:::mistake{title="Gaps between the bars"}
The data are continuous, so the bars of a histogram touch. Gaps belong to bar charts of categories.
:::

:::mistake{title="Reading the height as the frequency"}
On a histogram with a frequency density axis, the frequency is height × width, not the height alone.
:::

:::mistake{title="Plotting a frequency polygon at the boundaries"}
Frequency polygon points go at the **midpoints** of the classes.
:::

## Exam tips

:::exam-tip
Add a "class width" column and a "frequency density" column to the table before drawing. Each column often earns a mark.
:::

:::exam-tip
When a histogram is given and the frequency table is incomplete, use one complete class to work out the scale: frequency ÷ width tells you what one unit of height represents.
:::

:::exam-tip
Label the vertical axis "Frequency density", use a uniform scale, and draw bars exactly from boundary to boundary.
:::

## Summary

:::summary
- In a histogram the area of each bar represents frequency, and the bars touch.
- Frequency density $=$ frequency ÷ class width; frequency $=$ frequency density × class width.
- With unequal class widths, the bar heights must be frequency densities.
- To estimate part of a class, assume its values are spread evenly.
- ZIMSEC: a frequency polygon joins (midpoint, frequency) points with straight lines.
:::
