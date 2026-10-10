---
{
  "key": "inheritance.chi-squared",
  "title": "The chi-squared test in genetics",
  "summary": "How to decide whether the results of a genetic cross fit an expected ratio: stating a null hypothesis, calculating expected numbers, computing chi-squared, finding the degrees of freedom, comparing with the critical value at p = 0.05 and writing the conclusion in words.",
  "concepts": ["abio.inheritance.chi-squared"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Nyasha crosses two heterozygous tall pea plants and grows 360 offspring. Theory predicts 270 tall and 90 dwarf; she counts 281 tall and 79 dwarf. Is her cross behaving as expected, with the difference due to chance, or is something else going on, such as linkage, epistasis or poor survival of dwarf seedlings? Looking at the numbers is not enough: we need a **statistical test**. The **chi-squared ($\chi^2$) test** compares observed numbers with expected numbers and tells us whether the difference is small enough to be explained by chance.

You should already be able to work out expected ratios from monohybrid and dihybrid genetic diagrams.

## Key definitions

:::definition{term="Null hypothesis"}
A statement that there is no significant difference between the observed and expected results, so any difference is due to chance.
:::

:::definition{term="Chi-squared test"}
A statistical test that compares observed frequencies in categories with the frequencies expected from a hypothesis, to find whether the difference between them is significant.
:::

:::definition{term="Degrees of freedom"}
For the chi-squared test on one row of categories, the number of categories (classes) minus one.
:::

:::definition{term="Critical value"}
The value of the test statistic, read from a table at the chosen probability (p = 0.05 in biology) and degrees of freedom, above which the null hypothesis is rejected.
:::

:::definition{term="Significant difference"}
A difference between observed and expected results that is too large to be due to chance alone: the probability of it arising by chance is less than 0.05 (5%).
:::

:::keyfact{title="The formula"}
$$\chi^2 = \sum \frac{(O - E)^2}{E}$$
where $O$ is the observed number and $E$ the expected number in each category, and $\sum$ means "the sum of". Cambridge papers give this formula; you must be able to use it.
:::

## When to use the test

- The data are **counts** (numbers of individuals) in separate categories, such as phenotype classes. Never use percentages, ratios or measurements.
- There is a **hypothesis** that predicts the expected numbers, such as a 3 : 1 or 9 : 3 : 3 : 1 ratio.
- There is **one row** of categories (as in a genetic cross).
- The sample should be large enough: each expected number should be at least 5.

## The method, step by step

1. **State the null hypothesis**: "There is no significant difference between the observed numbers and those expected from a [3 : 1] ratio; any difference is due to chance."
2. **Calculate the expected numbers** from the ratio and the total: $E = \text{total} \times \dfrac{\text{parts for that class}}{\text{total parts}}$.
3. For each class, work out $O - E$, square it, and divide by $E$.
4. **Add** these values to get $\chi^2$.
5. **Degrees of freedom** = number of classes − 1.
6. **Look up the critical value** at p = 0.05 for those degrees of freedom.
7. **Compare and conclude**:
   - If $\chi^2$ is **less than** the critical value: the difference is **not significant**; it is due to chance; **accept** the null hypothesis. The results fit the expected ratio.
   - If $\chi^2$ is **greater than** the critical value: the difference is **significant**; it is not due to chance alone; **reject** the null hypothesis. Something other than chance (such as linkage or epistasis) is affecting the results.

| Degrees of freedom | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Critical value at p = 0.05 | 3.84 | 5.99 | 7.81 | 9.49 | 11.07 |
| Critical value at p = 0.01 | 6.63 | 9.21 | 11.34 | 13.28 | 15.09 |

A larger $\chi^2$ means a bigger difference between observed and expected results, and a smaller probability that the difference is due to chance.

:::worked-solution[A monohybrid cross: 3 : 1]
Nyasha's results: 281 tall and 79 dwarf (total 360).
1. Null hypothesis: there is no significant difference between the observed numbers and a 3 : 1 ratio; any difference is due to chance.
2. Expected: tall $= 360 \times \frac{3}{4} = 270$; dwarf $= 360 \times \frac{1}{4} = 90$.

| Phenotype | O | E | O − E | (O − E)² | (O − E)²/E |
|---|---|---|---|---|---|
| Tall | 281 | 270.00 | 11.00 | 121.00 | 0.448 |
| Dwarf | 79 | 90.00 | −11.00 | 121.00 | 1.344 |

3. $\chi^2 = 0.448 + 1.344 = 1.79$ (to 3 s.f.).
4. Degrees of freedom $= 2 - 1 = 1$; critical value at p = 0.05 is 3.84.
5. $1.79 < 3.84$, so the difference is not significant. It is due to chance; accept the null hypothesis. The results fit a 3 : 1 ratio.
:::

:::worked-solution[A dihybrid cross: 9 : 3 : 3 : 1]
Grains on F2 maize cobs: 301 purple smooth, 112 purple wrinkled, 86 yellow smooth, 41 yellow wrinkled (total 540).
1. Null hypothesis: no significant difference from a 9 : 3 : 3 : 1 ratio.
2. One part $= 540 \div 16 = 33.75$; expected $= 303.75$, $101.25$, $101.25$, $33.75$.

| Phenotype | O | E | O − E | (O − E)² | (O − E)²/E |
|---|---|---|---|---|---|
| Purple smooth | 301 | 303.75 | −2.75 | 7.56 | 0.025 |
| Purple wrinkled | 112 | 101.25 | 10.75 | 115.56 | 1.141 |
| Yellow smooth | 86 | 101.25 | −15.25 | 232.56 | 2.297 |
| Yellow wrinkled | 41 | 33.75 | 7.25 | 52.56 | 1.557 |

3. $\chi^2 = 0.025 + 1.141 + 2.297 + 1.557 = 5.02$ (to 3 s.f.).
4. Degrees of freedom $= 4 - 1 = 3$; critical value 7.81.
5. $5.02 < 7.81$: not significant; accept the null hypothesis. The genes appear to be unlinked and assorting independently.
:::

:::example{title="A significant result"}
A dihybrid test cross of fruit flies gives 152 grey long, 146 black vestigial, 52 grey vestigial and 50 black long (total 400). For a 1 : 1 : 1 : 1 ratio, each expected number is 100, and $\chi^2 = 27.04 + 21.16 + 23.04 + 25.00 = 96.24$. With 3 degrees of freedom the critical value is 7.81. Because 96.24 is far greater than 7.81, the difference is **significant**: reject the null hypothesis. The large parental classes and small recombinant classes suggest that the genes are **linked**.
:::

## Interpreting the result carefully

- Accepting the null hypothesis does not **prove** the hypothesis; it shows the data are consistent with it.
- p = 0.05 means we accept a 5% risk of wrongly rejecting a true null hypothesis.
- A significant result tells you the ratio does not fit, not why. Use the pattern of the data to suggest a reason: linkage (two large classes and two small), epistasis (classes merged), lethal genotypes (a class missing or reduced), or differences in survival.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards expect the null hypothesis, expected numbers, degrees of freedom, the critical value at p = 0.05 and a conclusion in words. Cambridge (A Level, Papers 4 and 5) gives the formula and expects the calculation. ZIMSEC Paper 4 tests understanding and interpretation rather than detailed computation, but theory papers may ask for the calculation, so practise it.
:::

## Common mistakes

:::mistake{title="Using degrees of freedom = number of classes"}
Degrees of freedom are classes − 1: 1 for two classes, 3 for four.
:::

:::mistake{title="Testing percentages instead of numbers"}
The test only works with actual counts. Percentages hide the sample size.
:::

:::mistake{title="Saying the result proves the hypothesis"}
Say "the difference is not significant; it is due to chance; the null hypothesis is accepted".
:::

:::mistake{title="Forgetting to divide by E"}
Each term is $(O - E)^2 \div E$. Dividing by O, or not dividing at all, gives the wrong value.
:::

## Exam tips

:::exam-tip
Lay out a table with columns O, E, O − E, (O − E)², (O − E)²/E. Examiners award marks for the expected values, the $\chi^2$ value, the degrees of freedom and the conclusion separately.
:::

:::exam-tip
A complete conclusion has three parts: compare with the critical value (with numbers), say whether the difference is significant, and accept or reject the null hypothesis. Then *suggest* a biological reason if the result is significant.
:::

## Summary

:::summary
- The chi-squared test compares observed counts with numbers expected from a genetic ratio.
- Null hypothesis: no significant difference between observed and expected; any difference is due to chance.
- $\chi^2 = \sum (O - E)^2 / E$; degrees of freedom = classes − 1; critical value at p = 0.05 (3.84 for 1 df, 7.81 for 3 df).
- $\chi^2$ below the critical value: not significant, accept the null hypothesis; above: significant, reject it.
- A significant result may indicate linkage, epistasis or differential survival.
:::
