---
{
  "key": "settle.hierarchy-theories",
  "title": "Settlement hierarchy, primate cities and settlement theories",
  "summary": "Describe the hierarchy of settlements, explain primate and world cities, calculate primacy, the rank-size rule and nearest neighbour analysis, and outline central place theory.",
  "concepts": [
    "ageo.settle.hierarchy-theories"
  ],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

In any country there are many small settlements, fewer towns and only a handful of large cities. The pattern is a **hierarchy**: a ranking of settlements by size and by the number and level of services they offer. Geographers describe the hierarchy, test whether it follows rules such as the rank-size rule, ask why some countries have one giant city that dwarfs the rest, and use models such as central place theory to explain why settlements are spaced as they are. This lesson explains these ideas and shows how to calculate the measures: primacy, rank-size and nearest neighbour analysis.

You should already know the ideas of threshold and range from the lesson on spheres of influence, and the difference between site and situation.

## Key definitions

:::definition{term="Settlement hierarchy"}
The arrangement of settlements in order of size and importance. In a typical hierarchy there are many small places offering low-order goods (hamlets, villages, rural service centres), fewer larger places (growth points, towns) and very few big cities offering high-order goods and services.
:::

:::definition{term="Primate city and primacy"}
A primate city is a city that is much larger than the second-ranked city in a country and dominates its political, economic and cultural life. The primacy index is the population of the largest city divided by that of the second-largest (the two-city index); the four-city index divides the largest by the sum of the next three.
:::

:::definition{term="Rank-size rule"}
In a "normal" hierarchy the population of the town of rank $n$ is $1/n$ of the population of the largest city: $P_n = P_1 / n$.
:::

:::definition{term="World city"}
A city with an influence on the global economy, politics and culture beyond its country, as a centre of finance, company headquarters, producer services, transport and communications networks.
:::

## The hierarchy

| Level | Typical features | Zimbabwean example |
|---|---|---|
| Village or rural service centre | Few services (shop, school, clinic); low-order goods; small sphere of influence | Rural business centres |
| Growth point or small town | A wider range of services: secondary school, clinic, bank, market | District growth points |
| Town or provincial centre | Administrative offices, hospital, wholesalers, some industry | Masvingo, Gweru, Mutare, Kwekwe |
| City | Specialist and high-order services, universities, head offices | Bulawayo |
| Capital or primate city | Government, finance, the greatest range of services | Harare |
| World or global city | International finance and headquarters | London, New York, Tokyo; Johannesburg is the leading African example |

As rank rises, the number of settlements falls, their population rises, their spacing increases, and their range of functions and sphere of influence grows.

## Primate cities

**Causes:** colonial history (a single port or capital developed as the gateway); concentration of government, trade and investment in one place; economies of scale, which attract more firms to the largest market; and a small country with a strong centralised government.

**Consequences:** advantages include efficient services, a clear gateway for trade and investment, and a large market. Disadvantages include regional inequality, rural-urban migration, congestion, informal settlements and pressure on housing and water in the primate city, while smaller towns lack investment. Bangkok, Lima and Buenos Aires are often given as examples; Harare is the largest Zimbabwean city and concentrates government and finance, though Bulawayo remains a major second city.

## World cities

World cities are ranked by networks of firms providing advanced services (finance, law, accounting, advertising). They have the headquarters of transnational companies, financial markets, major airports and telecommunications, a skilled workforce and stable institutions. The Globalisation and World Cities (GaWC) group classifies them as alpha, beta and gamma cities; London and New York are among the highest-ranked. The causes are historic advantage, trade, language and openness to international business.

## Central place theory (outline)

Christaller (1933) proposed that settlements are **central places** that provide goods and services for the area around them. High-order places, with a high threshold and long range, are few and far apart; low-order places are many and close together. In an idealised flat landscape with evenly spread people, the market areas are hexagons and each higher-order place has several lower-order places around it in a regular pattern. Real landscapes vary because of rivers, mountains, roads and uneven population, but the theory explains why services are arranged in a hierarchy and spaced in a regular way.

## Nearest neighbour analysis

Nearest neighbour analysis tests whether settlements are clustered, random or regular. For $n$ settlements in an area $A$:

$$
R_n = \frac{\bar{d}_{obs}}{\bar{d}_{exp}}, \qquad \bar{d}_{exp} = \frac{0.5}{\sqrt{n/A}}
$$

where $\bar{d}_{obs}$ is the mean distance to the nearest neighbour. An $R_n$ near 0 means clustered, near 1 random and up to 2.15 regular (evenly spaced).

## Worked examples

:::worked-solution[Rank-size and primacy]
Illustrative populations of the five largest towns of a country (in thousands).

![Actual and expected town populations under the rank-size rule: the largest city has 1800 thousand people, but towns of rank 2 to 5 have 520, 410, 210 and 190 thousand, well below the 900, 600, 450 and 360 the rule predicts, giving a primacy index of 3.5, so the country has a primate city.](media:diagrams/rank-size-primate-city.png "Figure: actual populations compared with the rank-size rule for five towns (worked-example data, illustrative)")

| Rank | Population | Expected by rank-size rule (1 800 ÷ rank) | Actual as % of expected |
|---|---|---|---|
| 1 | 1 800 | 1 800 | 100% |
| 2 | 520 | 900 | 58% |
| 3 | 410 | 600 | 68% |
| 4 | 210 | 450 | 47% |
| 5 | 190 | 360 | 53% |

1. Expected populations: 1 800 ÷ 2 = 900, ÷ 3 = 600, ÷ 4 = 450, ÷ 5 = 360.
2. The actual populations of ranks 2 to 5 are all well below the expected values, so the largest city is far larger than the rank-size rule predicts.
3. Primacy index = 1 800 ÷ 520 = 3.5; four-city index = 1 800 ÷ (520 + 410 + 210) = 1.6.
4. Both show a primate city: the largest town is 3.5 times the size of the second and dominates the hierarchy.
:::

:::worked-solution[Nearest neighbour analysis]
Eight service centres lie in a region of 40 km by 25 km (1 000 km²) (illustrative data). The distance from each to its nearest neighbour is 10.77, 11.18, 7.81, 7.81, 11.18, 8.54, 10.30 and 8.54 km.

1. Mean observed distance = 76.13 ÷ 8 = 9.52 km.
2. Expected distance = 0.5 ÷ √(8 ÷ 1 000) = 0.5 ÷ 0.0894 = 5.59 km.
3. $R_n$ = 9.52 ÷ 5.59 = 1.70.
4. A value of 1.70 is well above 1, so the pattern is regular (dispersed): the centres are evenly spaced, as central place theory predicts for places of the same order.
:::

:::example{title="Describing a hierarchy from data"}
A table lists 12 settlements with their populations and numbers of services. The five largest places have more than 100 services and populations over 50 000; the seven smallest have fewer than 10 services and populations under 5 000. A description says that population and the number of services both fall steeply from the top of the hierarchy, with few large places and many small ones, and a large gap between the two groups.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards require hierarchy, primate cities, world cities and the ideas behind them. Nearest neighbour analysis is ZIMSEC statistics content (Paper 3). Cambridge asks about the causes and consequences of urban growth and, in the A Level options, world cities and global networks.
:::

## Common mistakes

:::mistake{title="Confusing the rank-size rule with the primacy index"}
The rank-size rule gives the expected population of every rank; the primacy index compares only the top two (or four) cities.
:::

:::mistake{title="Reading nearest neighbour values the wrong way"}
Values near 0 are clustered and near 2.15 are regular. A value near 1 is random.
:::

:::mistake{title="Calling every large city a primate city"}
A primate city is large relative to the next cities, not just large in absolute terms.
:::

## Exam tips

:::exam-tip
Tested in ZIMSEC Paper 2 (topic 9) and Paper 3 (statistics), and in Cambridge Paper 2 (topic 6). *Calculate* with the formula and the result in words (clustered, random, regular); *describe* a hierarchy with figures; *explain* primacy with historical, economic and political reasons; *assess* the rank-size rule or central place theory by saying where it fits and where real places differ.
:::

## Summary

:::summary
- A settlement hierarchy has many small places and few large ones; services and spheres of influence increase with rank.
- Primate cities are far larger than the next city; primacy index = largest ÷ second largest.
- Rank-size rule: $P_n = P_1/n$.
- Nearest neighbour index $R_n$: near 0 clustered, near 1 random, up to 2.15 regular.
- Central place theory explains the spacing of settlements by threshold and range; world cities are global centres of finance and headquarters.
:::
