import { t, table, mean, median, mode, range, sd, quartiles, skewIndicator, sum, dpStr, chk } from "../lib.mjs";
import { writeLesson } from "./w1a-_write.mjs";

const A = [2.1, 2.4, 2.4, 2.8, 3.1, 3.3, 3.6, 3.9, 4.5, 5.2, 7.9]; // stream widths (m), 11 sites
const mA = mean(A), medA = median(A), modeA = mode(A)[0], rangeA = range(A), qA = quartiles(A), skA = skewIndicator(A);
const B = [520, 610, 640, 660, 690, 700, 730, 850]; // seasonal rainfall (mm), 8 seasons
const mB = mean(B), sB = sd(B);
chk(mB, 675); chk(sum(B), 5400);
const devRows = B.map((x) => [x, dpStr(x - mB, 0), dpStr((x - mB) ** 2, 0)]);
const ss = sum(B.map((x) => (x - mB) ** 2));
console.log({ mA, medA, modeA, rangeA, qA, skA, mB, sB, ss });
const dpA = (x) => dpStr(x, 2);

const body = t`
## Introduction

Almost every geographical enquiry ends with numbers: stream widths, monthly rainfall, pedestrian counts, soil pH. Before you test a hypothesis you must describe the data honestly. **Descriptive statistics** summarise a data set with a few numbers, and the right summary depends on the *kind* of data you hold. ZIMSEC Paper 3 Section A is a compulsory statistics question, and the first marks are almost always for descriptive work done correctly.

You should already be able to read a table, add and divide, and use a calculator's square-root key. In this lesson you will classify data, choose and calculate averages and measures of spread, find simple probabilities, and judge whether a distribution is roughly normal.

## Key definitions

:::definition{term="Levels of measurement"}
The four scales on which data are recorded, each allowing more statistics than the one before: nominal, ordinal, interval and ratio. A fifth type, cyclic data, repeats after a fixed cycle.
:::

:::definition{term="Measure of central tendency"}
A single value that represents the centre of a data set: the mean, the median or the mode.
:::

:::definition{term="Measure of dispersion"}
A value that shows how spread out the data are around the centre: the range, the inter-quartile range (IQR) or the standard deviation.
:::

:::definition{term="Standard deviation"}
A measure of the typical distance of the values from the mean. A small standard deviation means the values cluster near the mean; a large one means they are widely scattered.
:::

:::definition{term="Normal distribution"}
A symmetrical, bell-shaped distribution in which the mean, median and mode coincide and the frequency falls away evenly on both sides.
:::

## Levels of measurement

| Level | What it tells you | Geographical example | Statistics allowed |
|---|---|---|---|
| Nominal | Names or categories, no order | Rock type; land use; type of crop | Mode, frequencies, chi-squared |
| Ordinal | Categories in a ranked order, gaps unknown | Settlement order (1st, 2nd, 3rd); environmental quality score 1-5 | Median, quartiles, mode, Spearman's rank |
| Interval | Equal gaps, no true zero | Temperature in °C; year | Mean, standard deviation |
| Ratio | Equal gaps and a true zero | Rainfall in mm; distance; population | All of the above, plus ratios ("twice as much") |
| Cyclic | Repeats after a fixed cycle | Wind direction (0-360°); time of day; month | Special methods (not the ordinary mean) |

:::keyfact{title="Why the level matters"}
You cannot find a mean of nominal data (what is the "average" of granite and sandstone?). Cyclic data need care too: the arithmetic mean of winds from 350° and 10° is 180° (south), but both winds blow from almost due north.
:::

## Averages

- The **mean** is the sum of the values divided by the number of values: $\bar{x} = \dfrac{\sum x}{n}$. It uses every value, but one extreme value pulls it.
- The **median** is the middle value when the data are in order (for an even number of values, the mean of the two middle ones). It ignores extremes.
- The **mode** is the most frequent value. A set may have no mode, one mode or several.

## Spread

The **range** is the largest value minus the smallest. It is quick but depends on two values only.

**Quartiles** split the ordered data into four equal parts. Method used here: the median is $Q_2$; $Q_1$ is the median of the lower half and $Q_3$ the median of the upper half, leaving the median out of both halves when $n$ is odd. The **inter-quartile range** is $IQR = Q_3 - Q_1$ and describes the middle half of the data, so extremes do not affect it. Always state the method in an exam answer, because textbooks differ slightly.

For the **sample standard deviation** (use this unless told the data are a whole population):

$$
s = \sqrt{\frac{\sum (x - \bar{x})^2}{n - 1}}
$$

## Probability, in brief

The probability of an event is $P = \dfrac{\text{number of favourable outcomes}}{\text{total number of possible outcomes}}$, between 0 (impossible) and 1 (certain). For *independent* events (one does not affect the other), $P(A \text{ and } B) = P(A) \times P(B)$. For *mutually exclusive* events (they cannot both happen), $P(A \text{ or } B) = P(A) + P(B)$.

## Is the distribution normal?

Many tests assume a roughly normal distribution. Check three things: (1) a histogram that is symmetrical and bell-shaped; (2) the mean and median are close; (3) a skew indicator, $\dfrac{\bar{x} - \text{median}}{s}$, near zero. A mean well above the median shows **positive skew** (a long tail of high values); a mean well below it shows negative skew. In a normal distribution about 68% of values lie within one standard deviation of the mean and about 95% within two. The skew indicator is a rough check, not a formal test, so always look at the histogram as well.

## Worked examples

:::worked-solution[Averages and spread of stream widths]
Illustrative data: the width of a stream (in metres) at 11 sites, already in order: ${A.join(", ")}.

1. Mean: the total is ${dpStr(sum(A), 1)} m, so $\bar{x} = ${dpStr(sum(A), 1)} \div 11 = ${dpA(mA)}$ m.
2. Median: with 11 values the middle one is the 6th, so the median is ${dpStr(medA, 1)} m.
3. Mode: 2.4 m occurs twice and every other value once, so the mode is ${dpStr(modeA, 1)} m.
4. Range: $${dpStr(Math.max(...A), 1)} - ${dpStr(Math.min(...A), 1)} = ${dpStr(rangeA, 1)}$ m.
5. Quartiles: leave out the median. The lower half is ${A.slice(0, 5).join(", ")}, so $Q_1 = ${dpStr(qA.q1, 1)}$ m. The upper half is ${A.slice(6).join(", ")}, so $Q_3 = ${dpStr(qA.q3, 1)}$ m. $IQR = ${dpStr(qA.q3, 1)} - ${dpStr(qA.q1, 1)} = ${dpStr(qA.iqr, 1)}$ m.
6. The mean (${dpA(mA)} m) is above the median (${dpStr(medA, 1)} m) because the widest site, 7.9 m, pulls the mean up. The median describes a typical site better here.
:::

:::worked-solution[Standard deviation of seasonal rainfall]
Illustrative data: total seasonal rainfall (mm) at a station in a rain-fed farming area over 8 seasons: ${B.join(", ")}.

1. Mean: $5400 \div 8 = ${dpStr(mB, 0)}$ mm.
2. Subtract the mean from each value and square the result:

${table(["Rainfall x (mm)", "x − mean", "(x − mean)²"], devRows)}

3. Sum of squares: $\sum (x - \bar{x})^2 = ${dpStr(ss, 0)}$.
4. Divide by $n - 1 = 7$: $${dpStr(ss, 0)} \div 7 = ${dpStr(ss / 7, 1)}$.
5. Square root: $s = \sqrt{${dpStr(ss / 7, 1)}} = ${dpStr(sB, 1)}$ mm, to one decimal place.
6. Interpretation: a typical season departs from the mean by roughly ${dpStr(sB, 0)} mm. Rainfall in this area is therefore quite variable from season to season, which matters for rain-fed farming.
:::

:::example{title="Probability and normality"}
A survey of 60 households in a rural ward found that 24 use a borehole as their main water source. The probability that a household chosen at random uses a borehole is $24 \div 60 = 0.4$.

For the stream widths above, the skew indicator is $(${dpA(mA)} - ${dpStr(medA, 1)}) \div ${dpA(sd(A))} = ${dpStr(skA, 2)}$. The positive value, together with a long tail towards the 7.9 m site, shows positive skew, so the widths are not normally distributed and the median is the safer average.
:::

## Choosing a measure for a geographical data set

- Skewed data (river widths, incomes, settlement populations): median and IQR.
- Roughly normal interval or ratio data (annual temperature): mean and standard deviation.
- Categories (land use): mode and a frequency table or percentages.
- Ranked scores (a 1-5 environmental quality score): median and quartiles.

:::keyfact{title="ZIMSEC and Cambridge"}
Descriptive statistics and the normality check are examined in ZIMSEC Paper 3 (Section A). Cambridge candidates use simple averages and ranges in data handling but set no statistical test.
:::

## Common mistakes

:::mistake{title="Using n instead of n − 1"}
For sample data the sum of squares is divided by $n - 1$. Dividing by $n$ gives the population standard deviation and a smaller answer. Check the question: "sample" or unspecified means $n - 1$.
:::

:::mistake{title="Forgetting to order the data"}
Quartiles and the median are found from data arranged in order. Reading the middle of an unsorted list is a common error.
:::

:::mistake{title="Averaging cyclic or nominal data"}
Do not calculate a mean wind direction from degrees, or an "average" land use. Use the mode for categories and a wind rose for direction.
:::

## Exam tips

:::exam-tip
These skills sit in ZIMSEC Paper 3, Section A. Show every stage: the formula, the substitution, the answer with its unit and the stated number of decimal places. *Calculate* needs working; *describe the distribution* needs a comparison of mean and median plus a statement about skew; *comment on* the standard deviation means saying what a high or low value tells you about variability in the context (for example, how reliable the rainfall is for farmers).
:::

## Summary

:::summary
- Data are nominal, ordinal, interval, ratio or cyclic; the level decides which statistics are valid.
- Use the mean for symmetrical data, the median for skewed data and the mode for categories.
- Spread: range, IQR (middle half) and sample standard deviation with $n - 1$.
- Probability is favourable outcomes divided by all outcomes; multiply for "and" with independent events, add for "or" with exclusive events.
- A roughly normal distribution has mean close to median, a symmetrical histogram and a skew indicator near zero.
:::
`;

writeLesson("stats", "descriptive", { title: "Levels of measurement and descriptive statistics", summary: "Classify geographical data by level of measurement, then calculate and choose averages, quartiles and the standard deviation, find simple probabilities and judge whether a distribution is normal.", minutes: 35 }, body);
