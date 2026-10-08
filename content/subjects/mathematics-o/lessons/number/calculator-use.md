---
{
  "key": "number.calculator-use",
  "title": "Using a calculator",
  "summary": "Enter calculations correctly with brackets, powers and roots, keep full accuracy until the final answer, and interpret calculator displays as amounts of money and times.",
  "concepts": ["math.number.calculator-use"],
  "objectives": ["cambridge/igcse/mathematics:1.14.1", "cambridge/igcse/mathematics:1.14.2"],
  "estimatedMinutes": 25,
  "level": "core"
}
---
## Introduction

A calculator is only as accurate as the person using it. On calculator papers, many marks are lost not through poor mathematics but through keying errors: a missing bracket, a time typed as 1.45 instead of 1.75 hours, or a value rounded too early. This lesson shows you how to avoid those mistakes on any scientific calculator. Key names differ between models, so practise with your own calculator using the examples here.

You should already know the order of operations (BIDMAS) and how to round to significant figures.

## Key definitions

:::definition{term="Full accuracy"}
Using every digit the calculator gives (or its memory or ANS key) in later steps, and rounding only the final answer.
:::

:::definition{term="Decimal hours"}
A time written as a decimal number of hours. $3.25$ hours means 3 hours and $0.25 \times 60 = 15$ minutes.
:::

## Brackets: the calculator follows BIDMAS

A calculator does exactly what you type, in the BIDMAS order. Fraction lines and square-root signs that cover several numbers need **brackets** (or the calculator's fraction template).

:::worked-solution[Example 1: work out $\dfrac{5.6 + 3.2}{1.8 \times 0.4}$, correct to 3 significant figures]
1. Enter it as $(5.6 + 3.2) \div (1.8 \times 0.4)$.
2. The display shows $12.2222\ldots$
3. To 3 s.f.: $12.2$.
4. Without brackets, $5.6 + 3.2 \div 1.8 \times 0.4$ gives $6.311\ldots$, which is wrong.
:::

Use brackets for negative numbers too: $(-3)^2 = 9$, but keying $-3^2$ gives $-9$ on most calculators.

## Keep full accuracy

Never round in the middle of a calculation. Store intermediate results in the memory, use the ANS key, or write down at least four or five significant figures and carry on with the full value.

:::worked-solution[Example 2: a cube with volume $50\ \text{cm}^3$]
Find the total surface area of the cube, correct to 3 significant figures.
1. Edge $= \sqrt[3]{50} = 3.68403\ldots$ cm. Keep this value in the calculator.
2. Area of one face $= 3.68403\ldots^2 = 13.5720\ldots\ \text{cm}^2$.
3. Total surface area $= 6 \times 13.5720\ldots = 81.432\ldots \approx 81.4\ \text{cm}^2$.
4. If the edge had been rounded to $3.7$ first, the answer would be $6 \times 3.7^2 = 82.14 \approx 82.1$, which is wrong to 3 s.f.
:::

:::example{title="Using the ANS key for a two-stage calculation"}
To work out $\dfrac{3.7}{2.1^2 + 0.8}$, first find the denominator: $2.1^2 + 0.8 = 5.21$. Then key $3.7 \div \text{ANS}$, which uses the full value just calculated, to get $0.71017\ldots \approx 0.710$ (3 s.f.). Typing $3.7 \div 2.1^2 + 0.8$ without brackets would give $1.639\ldots$, which is wrong.
:::

## Interpreting the display: money

A display of $4.8$ in a money question means US\$4.80, not US\$4.08. Money in dollars is written with two decimal places (cents). A display of $0.35$ dollars is 35 cents.

## Interpreting the display: time

Calculators work in decimals, but time uses 60 minutes in an hour.

:::keyfact{title="Converting decimal hours"}
- Decimal hours to minutes: multiply the decimal part by 60. $2.7$ h $= 2$ h $+ 0.7 \times 60$ min $= 2$ h $42$ min.
- Hours and minutes to decimal hours: divide the minutes by 60. $1$ h $45$ min $= 1 + \frac{45}{60} = 1.75$ h.
- So $1$ h $45$ min is **not** $1.45$ h.
:::

:::worked-solution[Example 3: a journey from Harare to Bulawayo]
A coach travels about 440 km at an average speed of 68 km/h. It leaves Harare at 07:45. Estimate its arrival time to the nearest minute.
1. Time $= \dfrac{440}{68} = 6.470588\ldots$ hours.
2. Minutes: $0.470588\ldots \times 60 = 28.23\ldots \approx 28$ minutes.
3. Journey time: 6 h 28 min.
4. 07:45 + 6 h = 13:45, and 13:45 + 28 min = 14:13.
:::

:::worked-solution[Example 4: average speed with a time in hours and minutes]
A kombi travels 190 km in 2 hours 30 minutes. Find its average speed.
1. Convert the time: $2$ h $30$ min $= 2.5$ h.
2. Speed $= 190 \div 2.5 = 76$ km/h.
3. Keying $190 \div 2.30$ would give $82.6\ldots$, which is wrong.
:::

## Reading standard form on the display

A display such as $3.6 \times 10^{-05}$ (on some models shown as 3.6E-05) means $3.6 \times 10^{-5} = 0.000036$. Write it in proper notation, never as "3.6E-05".

## Common mistakes

:::mistake{title="Missing brackets around a numerator or denominator"}
$\dfrac{12}{3 + 5}$ must be entered as $12 \div (3 + 5) = 1.5$. Keying $12 \div 3 + 5$ gives 9.
:::

:::mistake{title="Typing minutes as a decimal"}
2 hours 30 minutes is $2.5$ hours, not $2.30$ hours.
:::

:::mistake{title="Reading decimal hours as minutes"}
$3.25$ hours is 3 hours 15 minutes, not 3 hours 25 minutes.
:::

:::mistake{title="Rounding too early"}
Rounding an intermediate value can change the final answer. Use the memory or ANS key.
:::

## Exam tips

:::exam-tip
Write down the full calculator display (for example $12.2222\ldots$) before rounding. If your rounding is wrong, the working still shows the method.
:::

:::exam-tip
Do a quick estimate to check the display is the right size: $\frac{5.6 + 3.2}{1.8 \times 0.4} \approx \frac{9}{0.7}$, which is a bit more than 10.
:::

:::exam-tip
Give money to 2 decimal places (US\$4.80) and times in hours and minutes unless the question asks for decimal hours.
:::

## Summary

:::summary
- The calculator follows BIDMAS: use brackets for whole numerators, denominators and negative numbers.
- Keep full accuracy in the calculator and round only the final answer.
- A money display of $4.8$ means US\$4.80.
- Decimal hours to minutes: multiply the decimal part by 60; minutes to hours: divide by 60.
- Write standard-form displays in proper notation.
:::
