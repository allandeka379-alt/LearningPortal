import { t, table, chiSquared, chiSquaredTable, chiCrit, sum, dpStr, chk } from "../lib.mjs";
import { writeLesson } from "./w1a-_write.mjs";

// Example 1: goodness of fit, vehicles per weekday
const O1 = [64, 52, 48, 56, 80];
const E1 = [60, 60, 60, 60, 60];
const g = chiSquared(O1, E1);
chk(g.chi2, 640 / 60, 1e-9);
const rows1 = g.rows.map((r, i) => [["Mon", "Tue", "Wed", "Thu", "Fri"][i], r.o, r.e, dpStr(r.diff, 0), dpStr(r.diff2, 0), dpStr(r.term, 2)]);

// Example 2: contingency table, conservation practice by farm size
const O2 = [[15, 24, 31], [45, 36, 19]];
const c = chiSquaredTable(O2);
const exp = c.expected.map((r) => r.map((e) => dpStr(e, 1)));
const termRows = [0, 1].map((i) => c.cells.filter((x) => x.r === i).map((x) => dpStr(x.term, 2)));
console.log(c.chi2, c.df, c.crit, c.rowT, c.colT, c.total, g.chi2, g.crit);

const body = t`
## Introduction

Is the pattern you see in a sample real, or could it have arisen by chance? A teacher counts more vehicles on Fridays than on Tuesdays; a ward appears to have more households using conservation farming than another. A **hypothesis test** gives a fair, standard way to decide. In ZIMSEC Paper 3 Section A you must state hypotheses, calculate a test statistic from a formula, compare it with a critical value printed in the question and write a conclusion in geographical terms.

You should already be able to calculate means and tabulate frequencies (see the lesson on descriptive statistics). This lesson sets out the logic of testing and the **chi-squared test**, which works on counts in categories.

## Key definitions

:::definition{term="Null hypothesis (H₀)"}
The statement that there is no difference or no relationship, and that any pattern in the data is due to chance. It is the hypothesis that is tested.
:::

:::definition{term="Alternative hypothesis (H₁)"}
The statement that there is a real difference or relationship. It is accepted only if the data give enough evidence to reject H₀.
:::

:::definition{term="Significance level"}
The probability of rejecting a true null hypothesis that the investigator is willing to accept. Geographers normally use 0.05 (5%).
:::

:::definition{term="Degrees of freedom"}
The number of values that are free to vary once the totals are fixed. For a one-row chi-squared test, df = number of categories − 1; for a contingency table, df = (rows − 1) × (columns − 1).
:::

:::definition{term="Critical value"}
The value of the test statistic, found in tables for a chosen significance level and degrees of freedom, that separates results due to chance from significant ones.
:::

## The steps of any hypothesis test

1. State the research question and the null and alternative hypotheses.
2. Choose the significance level (0.05) and the test that suits the data.
3. Calculate the test statistic.
4. Find the degrees of freedom and the critical value (ZIMSEC questions print it).
5. Decide: for chi-squared, if the calculated value is **greater than** the critical value, reject H₀; otherwise do not reject (accept) H₀.
6. Write the conclusion in words about the geography, not just "reject H₀".

:::keyfact{title="Rejecting is not proving"}
A significant result means the pattern is unlikely to be chance alone at the 5% level. It does not prove a cause, and "not significant" means there is not enough evidence, not that nothing is happening.
:::

## The chi-squared test

Chi-squared compares **observed** counts (O) with **expected** counts (E) in categories:

$$
\chi^2 = \sum \frac{(O - E)^2}{E}
$$

It needs counts (not percentages or measurements), independent observations, and **every expected value at least 5**; if not, combine categories or collect more data.

- **Goodness of fit** (one row): do the counts fit an expected pattern, usually equal shares? Expected = total ÷ number of categories (or from a stated ratio). df = categories − 1.
- **Association** (contingency table): are two categorical variables linked? Expected = (row total × column total) ÷ grand total. df = (rows − 1) × (columns − 1).

## Worked examples

:::worked-solution[Goodness of fit: traffic on weekdays]
Illustrative data: vehicles counted on a road into Gweru in one hour each weekday morning: Monday 64, Tuesday 52, Wednesday 48, Thursday 56, Friday 80 (total 300).

H₀: traffic is spread evenly over the five days. H₁: traffic is not spread evenly. Significance level 0.05. The critical value for 4 degrees of freedom is ${g.crit}.

1. Expected count each day if traffic were even: $300 \div 5 = 60$.
2. Work out each term:

${table(["Day", "O", "E", "O − E", "(O − E)²", "(O − E)² / E"], rows1)}

3. Add the last column: $\chi^2 = ${dpStr(g.chi2, 2)}$.
4. Degrees of freedom: $5 - 1 = ${g.df}$. Critical value ${g.crit}.
5. ${dpStr(g.chi2, 2)} is greater than ${g.crit}, so reject H₀.
6. Conclusion: there is a significant difference in traffic between weekdays at the 0.05 level; the Friday count is the main reason (its term is the largest).
:::

:::worked-solution[Association: conservation farming and farm size]
Illustrative survey of ${c.total} farmers, grouped by farm size, on whether they use a conservation method such as mulching or contour ridges.

${table(["", "Small", "Medium", "Large", "Row total"], [["Uses a method", ...O2[0], c.rowT[0]], ["Does not", ...O2[1], c.rowT[1]], ["Column total", ...c.colT, c.total]])}

H₀: there is no association between farm size and use of a conservation method. H₁: there is an association. The critical value for ${c.df} degrees of freedom at 0.05 is ${c.crit}.

1. Expected values = row total × column total ÷ ${c.total}. For small farms using a method: $${c.rowT[0]} \times ${c.colT[0]} \div ${c.total} = ${exp[0][0]}$. All six expected values:

${table(["", "Small", "Medium", "Large"], [["Uses a method", ...exp[0]], ["Does not", ...exp[1]]])}

All are above 5, so the test is valid.
2. Terms $(O - E)^2 \div E$:

${table(["", "Small", "Medium", "Large"], [["Uses a method", ...termRows[0]], ["Does not", ...termRows[1]]])}

3. $\chi^2 = ${dpStr(c.chi2, 2)}$. Degrees of freedom $(2-1)(3-1) = ${c.df}$.
4. ${dpStr(c.chi2, 2)} is greater than ${c.crit}, so reject H₀.
5. Conclusion: there is a significant association between farm size and use of conservation methods; large farms use them more often than expected, small farms less often.
:::

## Writing the conclusion

A top-mark conclusion has three parts: the decision about H₀, the evidence (the two numbers), and the meaning in the geographical context. Then add a caution: a small or biased sample, or an unmeasured third factor (such as access to advice), may limit what you can claim.

:::keyfact{title="ZIMSEC and Cambridge"}
Hypothesis testing and chi-squared are ZIMSEC Paper 3 content; the critical value is printed in the question. Cambridge sets no statistical test but expects candidates to understand why a hypothesis is stated and tested in an enquiry.
:::

## Common mistakes

:::mistake{title="Using percentages instead of counts"}
Chi-squared must use the actual counts. Converting to percentages changes the value and makes the test meaningless.
:::

:::mistake{title="Reversing the decision rule"}
For chi-squared, a calculated value **above** the critical value means reject H₀. (For correlation coefficients the rule is also "greater than", but check each test's wording in the question.)
:::

:::mistake{title="Ignoring the small-expected-value rule"}
If any expected count is below 5 the result is unreliable. Say so and combine categories rather than continuing.
:::

## Exam tips

:::exam-tip
In Paper 3 Section A, write H₀ and H₁ in full with the variables named, show expected values, show one fully worked term, give the total, state df and the critical value, then decide and conclude in words. *State* a hypothesis needs both variables; *explain the result* needs a geographical reason, not only a statistical one.
:::

## Summary

:::summary
- A test decides whether a pattern could be chance; H₀ says it is, H₁ says it is not.
- Use the 0.05 significance level, the correct degrees of freedom and the printed critical value.
- $\chi^2 = \sum (O - E)^2 \div E$; all expected values must be at least 5.
- Goodness of fit: df = categories − 1. Association: expected = row total × column total ÷ grand total; df = (r − 1)(c − 1).
- If $\chi^2$ is greater than the critical value, reject H₀; always conclude in words about the geography.
:::
`;

writeLesson("stats", "hypothesis-testing", { title: "Hypotheses and the chi-squared test", summary: "State null and alternative hypotheses, then carry out and interpret the chi-squared test for goodness of fit and for association in a contingency table, using printed critical values.", minutes: 35 }, body);
