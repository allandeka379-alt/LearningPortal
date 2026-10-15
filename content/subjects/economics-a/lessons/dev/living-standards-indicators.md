---
{
  "key": "dev.living-standards-indicators",
  "title": "Measuring living standards and economic development",
  "summary": "Classify economies by income and development, use real per capita national income and purchasing power parity to compare living standards, explain the limitations of money measures, describe and calculate composite indicators such as the HDI, and describe the MEW, the MPI and the Kuznets curve.",
  "concepts": ["aecon.dev.living-standards-indicators"],
  "estimatedMinutes": 60,
  "level": "core"
}
---
## Introduction

Is a family in Gweru better off than a family in Gaborone? Is Zimbabwe richer than it was ten years ago? Two things make these questions hard: prices differ between places and years, and income is only one part of how well people live, since health, education, safety, clean water and leisure also matter. Economists therefore use a range of measures, from **real national income per head** to **composite indicators** that combine income with health and education. This lesson shows how they are calculated and why none is perfect.

You should know the definitions of GDP, GNI and real GDP (the national income lessons).

## Key definitions

:::definition{term="Economic growth and economic development"}
**Economic growth** is an increase in real output (real GDP or real GDP per head) over time. **Economic development** is a broader improvement in people's well-being: higher incomes, better health and education, less poverty and inequality, and wider choice.
:::

:::definition{term="Purchasing power parity (PPP)"}
An adjustment that converts incomes into a common currency using the exchange rate at which a given basket of goods would cost the same in each country, so that income comparisons reflect what money can actually buy.
:::

:::definition{term="Human Development Index (HDI)"}
A composite index, published by the United Nations Development Programme, that combines a health indicator (life expectancy), an education indicator (mean and expected years of schooling) and an income indicator (GNI per head), each turned into an index between 0 and 1.
:::

## Classifying economies

Economies are commonly grouped by **income per head** (low-income, lower-middle, upper-middle and high-income, the World Bank approach, with thresholds revised each year) and by **level of development** (developing, emerging and developed). Classification is useful but crude: countries with the same average income can have very different health, education and inequality, and a country can move between groups as income grows.

## Real per capita national income and PPP

Real GDP, GNI or NNI **per head** adjusts for inflation and for population, so it is the standard starting point for comparing living standards over time and between countries.

:::worked-solution{title="Growth per head"}
Real GDP grows by 5% in a year while population grows by 2.5%.
1. Real GDP per head = 1.05 ÷ 1.025 = 1.0244, an increase of **2.4%** (about 5 − 2.5 = 2.5 percentage points as an approximation).
2. Output per head grows more slowly than output because the population has also grown.
:::

:::worked-solution{title="Converting with market rates and PPP"}
In Zandia, GNI per head is 36,000 units of local currency. The market exchange rate is 24 units per US dollar. A basket of goods costs 540 units in Zandia and US\$30 in the USA.
1. At the market rate: 36,000 ÷ 24 = **US\$1,500**.
2. PPP exchange rate = 540 ÷ 30 = **18 units per US dollar**.
3. At PPP: 36,000 ÷ 18 = **US\$2,000**. Prices in Zandia are lower than the market rate suggests, so the same income buys more than US\$1,500 would in the USA.
4. The market-rate figure of US\$1,500 is 25% below the PPP figure of US\$2,000 (1,500 ÷ 2,000 = 0.75), so it understates the real living standard in Zandia.
:::

## Problems of money measures

Even real income per head, converted at PPP, is an imperfect measure of living standards:

1. **Distribution.** An average hides inequality; most people may have much less than the mean.
2. **Non-market output.** Subsistence farming, unpaid household work and much of the informal economy are poorly counted or omitted.
3. **Quality and variety.** Better goods and new products are hard to capture in price indices.
4. **Leisure and working conditions** are not included.
5. **Externalities and the environment.** Pollution and depletion of resources are not subtracted; some "output" (repairing damage) is not a gain in welfare.
6. **Composition.** Spending on arms or prisons raises GDP but not necessarily welfare; public goods are valued at cost.
7. **Data reliability.** Statistics may be inaccurate, especially where the informal sector is large.
8. **Prices and exchange rates.** Market exchange rates fluctuate and ignore local price differences; PPP estimates are approximate.

## Non-monetary and composite indicators

Single indicators include life expectancy, infant mortality, adult literacy, school enrolment, access to clean water and electricity, calories per head, and doctors per thousand people. **Composite indicators** combine several.

:::keyfact{title="The HDI (UNDP method from 2010)"}
Each of the three dimensions is turned into an index using minimum and maximum values ("goalposts"):
Health index = (life expectancy − 20) ÷ (85 − 20).
Education index = average of (mean years of schooling ÷ 15) and (expected years of schooling ÷ 18).
Income index = [ln(GNI per head) − ln(100)] ÷ [ln(75,000) − ln(100)], where the log is used because extra income matters less at high levels.
**HDI = the geometric mean of the three indices** = (health × education × income)^(1/3).
:::

:::worked-solution{title="Calculating an HDI (illustrative country)"}
Country A: life expectancy 60 years, mean years of schooling 6, expected years of schooling 10, GNI per head US\$2,000.
1. Health = (60 − 20) ÷ 65 = **0.615**.
2. Education = (6 ÷ 15 + 10 ÷ 18) ÷ 2 = (0.400 + 0.556) ÷ 2 = **0.478**.
3. Income = [ln 2,000 − ln 100] ÷ [ln 75,000 − ln 100] = 2.996 ÷ 6.620 = **0.453**.
4. HDI = (0.615 × 0.478 × 0.453)^(1/3) = (0.1331)^(1/3) = **0.511**.
A second illustrative country with life expectancy 75, schooling 11 and 15 years and GNI per head US\$12,000 has an HDI of about 0.783.
:::

**Strengths of the HDI:** simple, includes health and education, and shows that countries with similar incomes can differ widely in development. **Weaknesses:** it ignores inequality within a country, the environment, human rights and political freedom, and it weights the three dimensions equally; income is still included.

Other composite measures:

- **Measure of Economic Welfare (MEW):** starts with GDP and adjusts for the value of leisure and unpaid household work, and subtracts the costs of pollution and urbanisation (Nordhaus and Tobin).
- **Multidimensional Poverty Index (MPI):** counts how many people are deprived in several dimensions of health, education and standard of living (such as nutrition, school attendance, sanitation, electricity and housing) and how intensely.

## The Kuznets curve

:::keyfact{title="Kuznets curve"}
The hypothesis that as a country grows from a low level of income, income inequality at first **rises** and then **falls**, giving an inverted U-shape of inequality against income per head. Reasons: early growth is concentrated in a modern sector with a small number of workers; later, wider education, taxation and transfers spread the gains. The evidence is mixed: some countries followed the pattern, others did not, so it should be presented as a hypothesis.
:::

:::example{title="Comparing living standards"}
Country X has a GDP per head 30% higher than country Y in PPP terms, but a much higher inequality and a lower life expectancy. Does X have the higher living standard? On average income, yes; on health and equity, probably not. Therefore a sound comparison uses real income per head at PPP together with indicators of health, education and distribution, and recognises their limits.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC (Form 5) emphasises classification, the problems of comparing living standards, and non-monetary indicators including the HDI. Cambridge (A Level only) adds the calculation and interpretation of the HDI, MEW, MPI, PPP and the Kuznets curve. Quote only illustrative data in calculations; do not quote real HDI values unless given in the question.
:::

## Common mistakes

:::mistake{title="Equating growth with development"}
Growth in real output per head is only one part of development. Growth can occur with rising inequality or damage to the environment.
:::

:::mistake{title="Using nominal values for comparisons over time"}
Compare real per capita income, adjusted for inflation, not nominal figures.
:::

:::mistake{title="Saying that PPP is the actual exchange rate"}
PPP is a statistical adjustment for comparing living standards; it is not the rate at which currencies are traded.
:::

## Exam tips

:::exam-tip{title="Where it is tested"}
ZIMSEC Paper 2 and 3 ask for limitations of GDP per head and for non-monetary indicators; Cambridge Paper 3 asks multiple-choice questions on PPP and the HDI, and Paper 4 asks you to evaluate measures of development.
:::

:::exam-tip{title="Command words"}
*Calculate*: show each index before the geometric mean. *Explain*: give a reason and apply it to the country described. *Evaluate*: weigh the strengths against the limits and conclude on which measure is best for the purpose.
:::

## Summary

:::summary
- Growth is an increase in real output; development is a wider improvement in well-being.
- Real GDP, GNI or NNI per head, converted at PPP, is the usual money measure of living standards.
- Money measures ignore distribution, non-market output, leisure and the environment.
- The HDI combines health, education and income using a geometric mean; MEW and MPI adjust for welfare and multidimensional poverty.
- The Kuznets curve suggests that inequality first rises and then falls as income grows (a hypothesis).
:::
