---
{
  "key": "data.histograms-cumulative",
  "title": "Histograms and cumulative frequency graphs",
  "summary": "Draw and read histograms with equal and unequal class widths using class boundaries and frequency density, and use cumulative frequency graphs to estimate the median, quartiles, percentiles and the number of values above or below a given value.",
  "concepts": ["amaths.data.histograms-cumulative"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

When a data set is large, such as the masses of 120 goats sold at a market in Gokwe or the times 500 runners take in a marathon, listing every value is no longer useful. The data are grouped into classes and shown in a **histogram** or a **cumulative frequency graph**. From these you can see the shape of the distribution and estimate the median, the quartiles and the proportion of values in any range.

This lesson covers ZIMSEC Statistics (Form 5, data presentation) and Cambridge 9709 Paper 5 (topic 5.1). Both boards examine histograms with **unequal class widths**, and both ask you to read estimates from a cumulative frequency graph. ZIMSEC also examines **frequency polygons**.

## Key definitions

:::definition{term="Class boundaries and class width"}
The **class boundaries** are the values where one class ends and the next begins, with no gaps. The **class width** is upper boundary minus lower boundary.
:::

:::definition{term="Histogram"}
A diagram for grouped continuous data in which each class is a bar with **no gaps**, and the **area** of each bar is proportional to the frequency.
:::

:::formula{name="Frequency density (not in MF19)"}
$$
\text{frequency density} = \frac{\text{frequency}}{\text{class width}}
$$
:::

:::definition{term="Cumulative frequency"}
The total frequency up to a given upper class boundary. A cumulative frequency graph plots cumulative frequency against **upper class boundaries** and starts at zero at the lowest boundary.
:::

## Class boundaries

The boundaries depend on how the data were recorded:

- **Continuous data rounded to the nearest unit**: the class "50–54 kg" contains masses from 49.5 kg up to 54.5 kg, so its boundaries are 49.5 and 54.5 and its width is 5.
- **Data written with inequalities**: $10 \le t < 20$ has boundaries 10 and 20.
- **Age in completed years**: someone aged "20–29" can be any age from their 20th birthday up to the day before their 30th, so the boundaries are 20 and 30.
- **Discrete data** such as the number of pupils in a class: "11–15" is usually given boundaries 10.5 and 15.5 so that the bars touch.

## Histograms

Because the area of each bar represents frequency, the **height** of a bar is the frequency density, not the frequency. With equal class widths the two give the same shape, but with unequal widths plotting frequency would make wide classes look far too important.

:::worked-solution[Example 1: homework times of 80 learners]
| Time $t$ (minutes) | $0 \le t < 10$ | $10 \le t < 20$ | $20 \le t < 40$ | $40 \le t < 60$ | $60 \le t < 100$ |
| --- | --- | --- | --- | --- | --- |
| Frequency | 8 | 14 | 30 | 18 | 10 |

1. Class widths: 10, 10, 20, 20, 40.
2. Frequency densities: $\frac{8}{10} = 0.8$, $\frac{14}{10} = 1.4$, $\frac{30}{20} = 1.5$, $\frac{18}{20} = 0.9$, $\frac{10}{40} = 0.25$.
3. Draw bars from 0 to 10 of height 0.8, from 10 to 20 of height 1.4, and so on, with the vertical axis labelled "frequency density".
4. The tallest bar ($20 \le t < 40$) is the **modal class**: it has the greatest frequency per minute of width.
:::

![Histogram of the homework times of 80 learners with unequal classes: the bar heights are frequency densities 0.8, 1.4, 1.5, 0.9 and 0.25 for the classes 0-10, 10-20, 20-40, 40-60 and 60-100 minutes, and the area of each bar equals its frequency 8, 14, 30, 18 and 10; the 20 to 40 class is the modal class.](media:diagrams/histogram-unequal-class-widths.png "Figure: bar height is frequency density, so the area of each bar is its frequency")

To read a frequency from a histogram, reverse the process: **frequency = frequency density × class width**.

:::worked-solution[Example 2: reading a frequency from a bar]
A histogram bar for the class from 15 to 20 seconds has height 2.4 (frequency density).

1. Class width $= 20 - 15 = 5$.
2. Frequency $= 2.4 \times 5 = 12$.
:::

If a histogram has no vertical scale but you know one frequency, use that bar to find what one unit of area represents, then apply it to every other bar.

## Frequency polygons (ZIMSEC)

A **frequency polygon** joins with straight lines the points (class mid-point, frequency) — or frequency density when widths differ. It is useful for comparing two distributions on the same axes.

## Cumulative frequency graphs

To draw the graph, add the frequencies as you go and plot each running total at the **upper** boundary of its class. Join the points with straight lines (a polygon) or a smooth curve. To estimate:

- the **median**: read across from $\frac{n}{2}$;
- the **lower and upper quartiles**: read across from $\frac{n}{4}$ and $\frac{3n}{4}$;
- the **$k$th percentile**: read across from $\frac{k}{100} \times n$;
- **how many values lie below $x$**: read up from $x$.

With straight-line segments, a reading is the same as **linear interpolation** within the class, which is how the estimates below are calculated.

:::worked-solution[Example 3: masses of 120 goats]
| Mass $m$ (kg) | $10 \le m < 20$ | $20 \le m < 30$ | $30 \le m < 40$ | $40 \le m < 50$ | $50 \le m < 70$ |
| --- | --- | --- | --- | --- | --- |
| Frequency | 9 | 27 | 42 | 30 | 12 |

1. Cumulative frequencies at 20, 30, 40, 50, 70 kg: 9, 36, 78, 108, 120 (and 0 at 10 kg).
2. Median: $\frac{120}{2} = 60$, in the class 30–40 (cumulative 36 to 78). Median $\approx 30 + \frac{60 - 36}{42} \times 10 = 35.7$ kg.
3. $Q_1$: 30th value, in 20–30: $20 + \frac{30 - 9}{27} \times 10 = 27.8$ kg. $Q_3$: 90th value, in 40–50: $40 + \frac{90 - 78}{30} \times 10 = 44.0$ kg.
4. $\text{IQR} \approx 44.0 - 27.8 = 16.2$ kg.
5. The 90th percentile is the 108th value, which is exactly the cumulative frequency at 50 kg: 50 kg.
:::

![Cumulative frequency graph of the masses of 120 goats through the points (10, 0), (20, 9), (30, 36), (40, 78), (50, 108) and (70, 120): reading across from 30, 60 and 90 gives the lower quartile 27.8 kg, the median 35.7 kg and the upper quartile 44.0 kg.](media:diagrams/cumulative-frequency-goat-masses.png "Figure: reading across from 30, 60 and 90 on the cumulative frequency graph gives Q₁, the median and Q₃")

:::worked-solution[Example 4: how many goats are heavier than 45 kg?]
1. Up to 40 kg there are 78 goats and up to 50 kg there are 108.
2. Half of the 40–50 class lies below 45 kg, so about $78 + \frac{1}{2}(30) = 93$ goats are lighter than 45 kg.
3. Heavier than 45 kg: $120 - 93 = 27$ goats, which is $\frac{27}{120} = 22.5\%$.
:::

These are **estimates**: grouping loses the raw values, so we assume the values are spread evenly within each class.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine histograms with unequal widths and cumulative frequency graphs (Cambridge 5.1.2 and 5.1.4). ZIMSEC also asks for frequency polygons. Cambridge expects graphs drawn on graph paper; read values carefully and show the lines you used.
:::

## Common mistakes

:::mistake{title="Plotting frequency instead of frequency density"}
With unequal widths, the bar height must be frequency ÷ width. A class twice as wide with the same frequency has a bar half as high.
:::

:::mistake{title="Using class limits instead of boundaries"}
For masses to the nearest kg, "20–24" runs from 19.5 to 24.5 (width 5, not 4). Gaps between bars mean the boundaries are wrong.
:::

:::mistake{title="Plotting cumulative frequency at mid-points"}
Cumulative frequency is the number of values up to the end of a class, so it is plotted at the upper boundary.
:::

:::mistake{title="Answering the wrong question with a reading"}
"How many are more than 45 kg?" needs $n$ minus the reading at 45 kg, not the reading itself.
:::

## Exam tips

:::exam-tip
Label the histogram axes ("frequency density" and the variable with units) and use a linear scale that starts at the lowest boundary or at zero with a clear break.
:::

:::exam-tip
On a cumulative frequency graph, draw the horizontal and vertical reading lines; they show the examiner your method.
:::

:::exam-tip
For "estimate the number of …" give a whole number when the context is a count, and say "approximately".
:::

## Summary

:::summary
- Use class boundaries with no gaps; the width is upper minus lower boundary.
- In a histogram, area represents frequency: height = frequency density = frequency ÷ class width.
- Frequency = frequency density × class width; the modal class has the greatest frequency density.
- Cumulative frequency is plotted at upper boundaries; read the median at $\frac{n}{2}$, quartiles at $\frac{n}{4}$ and $\frac{3n}{4}$, percentiles at $\frac{k}{100}n$.
- Readings are estimates that assume values are spread evenly within each class.
:::
