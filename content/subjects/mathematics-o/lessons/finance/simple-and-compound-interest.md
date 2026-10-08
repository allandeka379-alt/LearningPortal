---
{
  "key": "finance.simple-and-compound-interest",
  "title": "Simple and compound interest",
  "summary": "Calculate simple interest with I = PRT/100 and compound interest by repeated multiplication, and find the principal, rate or time, comparing savings and loan options.",
  "concepts": ["math.number.simple-and-compound-interest"],
  "objectives": ["zimsec/o-level/mathematics:3.1.2", "cambridge/igcse/mathematics:1.13.3"],
  "estimatedMinutes": 35,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

When Nyasha saves US\$1200 in a bank account, the bank pays her **interest** for the use of her money. When a small business in Bulawayo borrows US\$1500 from a lender to buy a freezer, the business pays interest to the lender. Interest is the price of money.

There are two ways of calculating interest. With **simple interest** the interest is the same every year, because it is always calculated on the original amount. With **compound interest** the interest earned is added to the account, so the next year's interest is calculated on a bigger amount: interest earns interest.

The interest rates in this lesson are examples only; real bank rates change and differ between banks. You should already be able to work with percentages and multipliers.

## Key definitions

:::definition{term="Principal"}
The amount of money first invested or borrowed, $P$.
:::

:::definition{term="Rate of interest"}
The percentage of the principal paid as interest for each time period, usually **per annum** (per year), $R\%$.
:::

:::definition{term="Simple interest"}
Interest calculated only on the original principal, so it is the same every year.
:::

:::definition{term="Compound interest"}
Interest calculated on the principal **plus** all the interest already added, so the interest grows every year.
:::

:::definition{term="Amount"}
The total value at the end: principal plus interest.
:::

:::formula{name="Simple interest"}
$$
I = \frac{P \times R \times T}{100}, \qquad A = P + I
$$

where $T$ is the time in **years**.
:::

:::formula{name="Compound interest (interest added once a year)"}
$$
A = P\left(1 + \frac{R}{100}\right)^n, \qquad \text{interest} = A - P
$$

where $n$ is the number of years.
:::

Cambridge papers do not give these formulas, so learn them. ZIMSEC candidates should also be able to use them without being reminded.

## Simple interest

:::worked-solution[Example 1: US\$1200 at 6% per annum simple interest for 3 years]
1. $I = \dfrac{1200 \times 6 \times 3}{100} = 216$, so the interest is US\$216.
2. The amount is $1200 + 216 = 1416$, so US\$1416.
:::

If the time is given in months, write it as a fraction of a year: 8 months $= \frac{8}{12}$ year and 18 months $= 1.5$ years.

:::worked-solution[Example 2: US\$800 at 9% per annum for 8 months]
1. $T = \frac{8}{12}$ years.
2. $I = \dfrac{800 \times 9 \times \frac{8}{12}}{100} = 48$, so the interest is US\$48.
:::

### Finding the rate or the time

Rearrange the formula: $R = \dfrac{100I}{PT}$ and $T = \dfrac{100I}{PR}$.

:::worked-solution[Example 3: finding the time]
How long does it take US\$1500 to earn US\$210 simple interest at 4% per annum?

1. $T = \dfrac{100 \times 210}{1500 \times 4} = \dfrac{21\,000}{6000} = 3.5$.
2. It takes $3\frac{1}{2}$ years.
:::

## Compound interest

With compound interest you apply the multiplier $1 + \frac{R}{100}$ once for every year.

:::worked-solution[Example 4: US\$2000 at 5% per annum compound interest for 3 years]
1. The multiplier for 5% is $1.05$.
2. After 1 year: $2000 \times 1.05 = 2100$.
3. After 2 years: $2100 \times 1.05 = 2205$.
4. After 3 years: $2205 \times 1.05 = 2315.25$. In one step: $2000 \times 1.05^3 = 2315.25$.
5. The interest is $2315.25 - 2000 = 315.25$, so US\$315.25.
:::

Simple interest at 5% for 3 years would be only $\frac{2000 \times 5 \times 3}{100} = 300$ dollars. After the first year, compound interest always earns more than simple interest at the same rate, because each year's interest is calculated on a larger amount.

| Year | Simple interest amount (US\$) | Compound interest amount (US\$) |
| --- | --- | --- |
| 0 | 2000.00 | 2000.00 |
| 1 | 2100.00 | 2100.00 |
| 2 | 2200.00 | 2205.00 |
| 3 | 2300.00 | 2315.25 |

### Finding the time by trial

Without logarithms, find the number of years by trying values of $n$.

:::worked-solution[Example 5: when does the investment first exceed US\$2500?]
US\$2000 is invested at 5% per annum compound interest. After how many complete years is it first worth more than US\$2500?

1. $2000 \times 1.05^4 = 2431.01$, which is less than 2500.
2. $2000 \times 1.05^5 = 2552.56$, which is more than 2500.
3. So it first exceeds US\$2500 after **5** years.
:::

You can find an unknown principal the same way you reverse a percentage: if US\$2704 is the amount after 2 years at 4% compound interest, then $P = 2704 \div 1.04^2 = 2500$.

## Common mistakes

:::mistake{title="Using months as years"}
For 8 months, $T = \frac{8}{12}$, not 8. A time of 8 years would give twelve times too much interest.
:::

:::mistake{title="Giving the amount when the interest is asked for (or the reverse)"}
Read the question carefully. "Interest" is only the extra money; "amount" or "value" includes the principal.
:::

:::mistake{title="Using simple interest for a compound question"}
$2000 \times 1.05^3$ is not the same as $2000 \times 1.15$. Compound interest needs the power.
:::

:::mistake{title="Rounding too early"}
Keep full calculator values in the middle of a compound interest calculation and round money to the nearest cent only at the end.
:::

## Exam tips

:::exam-tip
Write the method first, for example "$2000 \times 1.05^3$". That expression usually earns the method mark on its own.
:::

:::exam-tip
Money answers are normally given to the nearest cent (2 decimal places), such as US\$315.25. If the question says "to the nearest dollar", round at the end.
:::

:::exam-tip
In a "which option is better?" question, calculate both values and then write a clear conclusion with the difference, for example "Option B gives US\$12.40 more."
:::

## Summary

:::summary
- Simple interest: $I = \frac{PRT}{100}$, the same every year; time in years.
- Compound interest: $A = P\left(1 + \frac{R}{100}\right)^n$; interest $= A - P$.
- Rearrange $I = \frac{PRT}{100}$ to find the rate or the time.
- Find the number of years for compound interest by trying values of $n$.
- After the first year, compound interest earns more than simple interest at the same rate.
:::
