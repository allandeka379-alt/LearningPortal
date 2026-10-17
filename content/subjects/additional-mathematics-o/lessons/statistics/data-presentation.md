---
{
  "key": "statistics.data-presentation",
  "title": "Collecting, organising and presenting data",
  "summary": "Choose a method of collecting data, organise data in tally charts and grouped frequency tables (class limits, boundaries, widths and midpoints), and present them in bar charts, pie charts, histograms with frequency density, frequency polygons, cumulative frequency curves and stem-and-leaf diagrams.",
  "concepts": ["amath.statistics.data-presentation"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

A list of 75 travel times or 200 maize yields tells you very little until it is organised. A good table or diagram shows the shape of the data at a glance: where most values lie, how spread out they are and whether there are unusual values. Choosing the right diagram, and drawing it correctly, is a skill ZIMSEC Paper 2 tests directly and also uses as a first step towards medians and quartiles.

You should know the types of data (qualitative, discrete, continuous) from the previous lesson, because the type decides the diagram.

## Key definitions

:::definition{term="Class limits"}
The smallest and largest values that can be recorded in a class, for example 40 and 44 in the class 40–44.
:::

:::definition{term="Class boundaries"}
The values that separate classes with no gaps, halfway between the upper limit of one class and the lower limit of the next: 39.5 and 44.5 for the class 40–44 when data are recorded to the nearest whole number.
:::

:::definition{term="Class width"}
Upper boundary minus lower boundary.
:::

:::definition{term="Class midpoint (mid-value)"}
Half the sum of the class boundaries (or of the class limits), used to represent the class.
:::

:::definition{term="Frequency density"}
Frequency divided by class width. In a histogram the height of each bar is the frequency density, so the **area** of the bar is the frequency.
:::

:::formula{name="Grouped data"}
$$
\text{width} = \text{upper boundary} - \text{lower boundary}, \qquad \text{frequency density} = \frac{\text{frequency}}{\text{class width}}
$$
:::

## Methods of collecting data

| Method | Merits | Demerits |
| --- | --- | --- |
| Questionnaire | reaches many people cheaply; same questions for all | low return rate; questions may be misunderstood |
| Interview | can explain questions and follow up answers | slow and costly; interviewer may influence answers |
| Observation | records what actually happens | time-consuming; observer may miss events |
| Experiment | controls conditions; can be repeated | may not reflect real life; needs equipment |
| Records (registers, reports) | quick and cheap; cover long periods | may be incomplete or out of date |

A good questionnaire question is short, clear and neutral, has tick boxes that do not overlap, and covers every possible answer.

## Grouped frequency tables

When there are many different values, group them into classes. For continuous data recorded to the nearest kilogram, the classes 40–44, 45–49, 50–54 and 55–59 have boundaries 39.5, 44.5, 49.5, 54.5 and 59.5. Each class has width 5 and midpoints 42, 47, 52 and 57.

For data given as intervals such as $10 \leq t < 15$, the boundaries are the numbers shown (10 and 15).

## Bar charts and pie charts

**Bar charts** suit qualitative or discrete data: bars of equal width with gaps between them, heights equal to the frequencies.

**Pie charts** show proportions of a whole. Each sector angle is

$$
\text{angle} = \frac{\text{frequency}}{\text{total}} \times 360^\circ
$$

:::worked-solution[Example 1: 72 learners named their favourite subject: Mathematics 20, English 16, Science 24, other 12. Find the pie chart angles.]
1. Each learner is represented by $\dfrac{360^\circ}{72} = 5^\circ$.
2. Mathematics: $20 \times 5^\circ = 100^\circ$. English: $16 \times 5^\circ = 80^\circ$.
3. Science: $24 \times 5^\circ = 120^\circ$. Other: $12 \times 5^\circ = 60^\circ$.
4. Check: $100 + 80 + 120 + 60 = 360^\circ$.
:::

## Histograms

Histograms are for **continuous** grouped data. The bars touch (no gaps), the horizontal axis is a continuous scale with the bars drawn between class boundaries, and the vertical axis shows **frequency density**. With equal class widths you may plot frequency, but with unequal widths you must use frequency density; otherwise wide classes look far too important.

:::worked-solution[Example 2: the times taken by 75 learners to walk to school are grouped as below. Find the frequency densities for a histogram.]
1. $0 \leq t < 10$: frequency 8, width 10, density $0.8$.
2. $10 \leq t < 15$: frequency 15, width 5, density $3$.
3. $15 \leq t < 20$: frequency 22, width 5, density $4.4$.
4. $20 \leq t < 30$: frequency 18, width 10, density $1.8$.
5. $30 \leq t < 50$: frequency 12, width 20, density $0.6$.
6. The tallest bar is $15 \leq t < 20$, even though the class $20 \leq t < 30$ has almost the same frequency: it is twice as wide.
:::

![Histogram of walking times of 75 learners with unequal class widths: frequency densities 0.8, 3, 4.4, 1.8 and 0.6 for the classes 0-10, 10-15, 15-20, 20-30 and 30-50 minutes; the tallest bar is 15-20 minutes and the data are skewed to longer times.](media:diagrams/histogram-walking-times.png "Figure: bar height is frequency density (frequency ÷ class width), so the wide classes do not look too big")

| Time (min) | Frequency | Width | Frequency density | Cumulative frequency |
| --- | --- | --- | --- | --- |
| $0 \leq t < 10$ | 8 | 10 | 0.8 | 8 |
| $10 \leq t < 15$ | 15 | 5 | 3 | 23 |
| $15 \leq t < 20$ | 22 | 5 | 4.4 | 45 |
| $20 \leq t < 30$ | 18 | 10 | 1.8 | 63 |
| $30 \leq t < 50$ | 12 | 20 | 0.6 | 75 |

Described, the histogram has five touching bars from $t = 0$ to $t = 50$, rising to a peak over 15–20 minutes and then falling, with a long low bar to the right: the data are skewed towards longer times.

## Frequency polygons

Plot each frequency (or frequency density) at the class **midpoint** and join the points with straight lines. Frequency polygons are useful for comparing two distributions on the same axes.

## Cumulative frequency curves

The cumulative frequency is the running total. Plot each cumulative frequency at the **upper class boundary**, start at zero at the lower boundary of the first class, and join the points with a smooth curve (an ogive). For Example 2 the points are $(0, 0)$, $(10, 8)$, $(15, 23)$, $(20, 45)$, $(30, 63)$, $(50, 75)$. The curve rises steeply where the data are concentrated and is used to estimate the median and quartiles.

![Cumulative frequency graph of the walking times of 75 learners, plotted at upper class boundaries: (0, 0), (10, 8), (15, 23), (20, 45), (30, 63) and (50, 75); half of the 75 learners, 37.5, is reached between 15 and 20 minutes.](media:diagrams/cumulative-frequency-walking-times.png "Figure: cumulative frequencies at the upper class boundaries rise to 75, the total number of learners")

## Stem-and-leaf diagrams

A stem-and-leaf diagram keeps every value while showing the shape. Split each value into a stem (for example the tens digit) and a leaf (the units digit), and write the leaves in order. Always include a key.

:::worked-solution[Example 3: draw a stem-and-leaf diagram of these 15 test marks: 34, 41, 45, 47, 52, 53, 53, 58, 61, 64, 66, 70, 72, 79, 85.]
1. Stems are the tens: 3, 4, 5, 6, 7, 8.
2. Write the units in order on each row.
3. Key: $5 \mid 3$ means 53 marks.
:::

| Stem | Leaves |
| --- | --- |
| 3 | 4 |
| 4 | 1 5 7 |
| 5 | 2 3 3 8 |
| 6 | 1 4 6 |
| 7 | 0 2 9 |
| 8 | 5 |

The longest row is the 50s, so the marks cluster there.

## Choosing a diagram

| Data | Suitable diagrams |
| --- | --- |
| qualitative | bar chart, pie chart |
| discrete, ungrouped | bar chart (vertical line graph), stem-and-leaf |
| continuous, grouped | histogram, frequency polygon, cumulative frequency curve |

:::keyfact{title="ZIMSEC and Cambridge"}
This is ZIMSEC Paper 2 Section C only; Cambridge 0606 has no statistics.
:::

## Common mistakes

:::mistake{title="Frequency on the axis of an unequal-width histogram"}
With unequal widths, the bar height must be frequency density. Plotting frequency makes wide classes look too large.
:::

:::mistake{title="Plotting cumulative frequency at midpoints"}
Cumulative frequency is plotted at the **upper class boundary**, because it counts everything up to the end of the class.
:::

:::mistake{title="Using limits instead of boundaries"}
For a class 40–44 of whole-number data, the bar runs from 39.5 to 44.5, not from 40 to 44.
:::

:::mistake{title="No key on a stem-and-leaf diagram"}
Without a key, $5 \mid 3$ could mean 53, 5.3 or 530.
:::

## Exam tips

:::exam-tip
Make a table with columns for boundaries, width, frequency density and cumulative frequency before drawing anything.
:::

:::exam-tip
Label both axes with quantities and units, and state "frequency density" on a histogram.
:::

:::exam-tip
Check pie chart angles add up to $360^\circ$ and cumulative frequencies end at the total.
:::

## Summary

:::summary
- Data are collected by questionnaire, interview, observation, experiment or from records; each has merits and demerits.
- Class boundaries remove gaps; width = upper boundary − lower boundary; midpoint = average of the boundaries.
- Pie chart angle = frequency ÷ total × 360°.
- Histogram bars have height frequency density = frequency ÷ width, so area represents frequency.
- Frequency polygons use midpoints; cumulative frequency curves use upper boundaries.
- Stem-and-leaf diagrams keep every value and need a key.
:::
