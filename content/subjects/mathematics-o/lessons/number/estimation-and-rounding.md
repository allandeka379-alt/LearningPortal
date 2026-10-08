---
{
  "key": "number.estimation-and-rounding",
  "title": "Estimation and rounding",
  "summary": "Round to the nearest 10, 100 or 1000, to decimal places and to significant figures, estimate calculations by rounding to one significant figure, and give answers to a sensible accuracy.",
  "concepts": ["math.number.estimation-and-rounding"],
  "objectives": ["zimsec/o-level/mathematics:1.2.1", "zimsec/o-level/mathematics:1.2.2", "cambridge/igcse/mathematics:1.9.1", "cambridge/igcse/mathematics:1.9.2", "cambridge/igcse/mathematics:1.9.3"],
  "estimatedMinutes": 30,
  "level": "core"
}
---
## Introduction

A calculator might tell you that each of 7 friends should pay US\$35.714285… towards a trip, but nobody can pay that exact amount. A newspaper reports that a crowd of "about 25 000" watched a match at the National Sports Stadium, not "24 873". Rounding gives numbers that are useful in real life, and estimating lets you check in a few seconds whether a calculator answer is sensible.

Calculator questions often ask for an answer "correct to 3 significant figures" or "to 2 decimal places", so rounding correctly is worth marks across every topic.

## Key definitions

:::definition{term="Decimal places (d.p.)"}
The number of digits after the decimal point. $3.142$ is written to 3 decimal places.
:::

:::definition{term="Significant figures (s.f.)"}
The digits of a number counted from the first **non-zero** digit. In $0.04057$ the first significant figure is 4, so $0.04057$ has 4 significant figures (4, 0, 5, 7).
:::

:::keyfact{title="Zeros and significant figures"}
- Zeros **before** the first non-zero digit never count: $0.0306$ has 3 s.f.
- Zeros **between** non-zero digits always count: $2\,049$ has 4 s.f.
- Zeros at the **end** of a decimal count: $16.0$ has 3 s.f.
- Zeros at the end of a whole number are place holders and may or may not be significant: $6\,470\,000$ could be 3 s.f.
:::

## How to round

1. Find the last digit you want to keep.
2. Look at the **next** digit (the decider).
3. If the decider is 5 or more, round the kept digit up; if it is 4 or less, leave it.
4. For whole numbers, fill the places up to the decimal point with zeros so the number keeps its size.

:::worked-solution[Example 1: round $6\,473.849$ in five ways]
1. Nearest hundred: the hundreds digit is 4 and the decider is 7, so $6\,500$.
2. 1 decimal place: keep $6\,473.8$; the decider is 4, so $6\,473.8$.
3. 2 decimal places: keep $6\,473.84$; the decider is 9, so $6\,473.85$.
4. 3 significant figures: keep $647$; the decider is 3, so $6\,470$ (zero fills the units place).
5. 1 significant figure: keep $6$; the decider is 4, so $6\,000$.
:::

:::worked-solution[Example 2: round $0.040571$ to 2 and to 3 significant figures]
1. The first significant figure is 4 (the zeros before it do not count).
2. 2 s.f.: keep $0.040$; the decider is 5, so round up to $0.041$.
3. 3 s.f.: keep $0.0405$; the decider is 7, so $0.0406$.
:::

When rounding up turns a 9 into 10, carry it: $15.96$ to 1 d.p. is $16.0$. Keep the final zero: it shows the accuracy.

## Estimating calculations

To estimate, round every number to **1 significant figure**, then work out the simpler calculation, usually in your head.

:::worked-solution[Example 3: estimate $\dfrac{48.7 \times 3.12}{0.496}$]
1. Round each number to 1 s.f.: $48.7 \approx 50$, $3.12 \approx 3$, $0.496 \approx 0.5$.
2. $\dfrac{50 \times 3}{0.5} = \dfrac{150}{0.5} = 300$.
3. The calculator gives $306.3\ldots$, so the estimate confirms the size of the answer.
:::

Dividing by a number less than 1 makes the answer **bigger**; dividing by $0.5$ is the same as doubling.

## Sensible accuracy

The context decides how to round:

- Money: to the nearest cent, so US\$47.856 becomes US\$47.86.
- People, buses, bags and other things that come in whole units: round to a whole number, and think about whether to round **up** or **down**.
- Measurements: usually to 3 significant figures, or to the same accuracy as the data.

:::worked-solution[Example 4: kombis for a school trip]
230 pupils from a school in Kwekwe are going on a trip. Each kombi carries 18 pupils. How many kombis are needed?
1. $230 \div 18 = 12.77\ldots$
2. Twelve kombis carry only $12 \times 18 = 216$ pupils, leaving 14 behind.
3. So **13** kombis are needed. Here we round **up**, even though normal rounding also gives 13.
:::

If the question had asked "how many full kombis can be filled?", the answer would be 12: round **down** when only complete groups count.

## Common mistakes

:::mistake{title="Counting leading zeros as significant"}
$0.0849$ to 2 s.f. is $0.085$, not $0.08$ (which is 1 s.f.).
:::

:::mistake{title="Changing the size of a whole number"}
$6\,473\,849$ to 3 s.f. is $6\,470\,000$, not $647$. Fill the remaining places with zeros.
:::

:::mistake{title="Rounding in stages"}
$7.4682$ to 1 d.p.: look only at the second decimal place, which gives $7.5$. Rounding first to $7.47$ and then to $7.5$ happens to agree here, but stage-by-stage rounding (for example $2.346 \to 2.35 \to 2.4$) can give a wrong answer: $2.346$ to 1 d.p. is $2.3$.
:::

:::mistake{title="Dropping a significant zero"}
$15.96$ to 1 d.p. is $16.0$, not $16$. The zero tells the reader the accuracy.
:::

## Exam tips

:::exam-tip
"Estimate" or "show your rounding" questions need the rounded values written down, such as $\frac{50 \times 3}{0.5}$. An answer with no rounded values shown may score nothing.
:::

:::exam-tip
In long calculator questions, keep the full display in your working and round only the final answer. Rounding early can make the final answer wrong.
:::

:::exam-tip
On Cambridge papers, when no accuracy is asked for, non-exact answers are given to 3 significant figures (angles in degrees to 1 decimal place). Always read the instructions on the front of your own paper.
:::

## Summary

:::summary
- Find the last digit to keep, look at the next digit, and round up if it is 5 or more.
- Significant figures start at the first non-zero digit; zeros fill places to keep a number's size.
- Estimate by rounding every number to 1 significant figure.
- Give money to the nearest cent and whole objects as whole numbers, rounding up or down to suit the context.
- Round only the final answer, and keep significant final zeros such as $16.0$.
:::
