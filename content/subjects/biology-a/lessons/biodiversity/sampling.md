---
{
  "key": "biodiversity.sampling",
  "title": "Sampling organisms: quadrats, transects and mark-release-recapture",
  "summary": "Why ecologists sample at random and how they do it; using frame quadrats to measure density, frequency and percentage cover; line and belt transects along environmental gradients; and estimating the size of a population of mobile animals by mark-release-recapture and the Lincoln index, with its assumptions.",
  "concepts": ["abio.biodiversity.sampling"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Nobody can count every grass plant on a hillside near Masvingo, or every grasshopper in a field of sorghum. Ecologists **sample** instead: they count organisms in a small, representative part of the habitat and use the results to estimate the whole. The skill lies in choosing the method that suits the organism (still or mobile, large or tiny, scattered or clumped) and in sampling **without bias**, so that the estimate is fair. These methods underpin every conservation decision, from monitoring rhino numbers to judging the effect of grazing on grassland.

You should already know the meaning of population, community, habitat and ecosystem.

## Key definitions

:::definition{term="Random sampling"}
Sampling in which every part of the area has an equal chance of being chosen, so that the samples are not biased by the investigator.
:::

:::definition{term="Quadrat"}
A square frame of known area, often 0.25 m² or 1 m², placed on the ground to sample plants or slow-moving animals.
:::

:::definition{term="Transect"}
A line across a habitat, along which organisms are sampled systematically to show how their distribution changes with an environmental gradient.
:::

:::definition{term="Population density"}
The number of individuals of a species per unit area.
:::

:::definition{term="Species frequency"}
The percentage of quadrats in which a species is present.
:::

:::definition{term="Percentage cover"}
The percentage of the area of a quadrat covered by a species, viewed from above; used when individual plants cannot be counted.
:::

:::keyfact{title="The Lincoln index (formula provided in Cambridge papers)"}
$$N = \frac{n_1 \times n_2}{m_2}$$
$n_1$ = number caught, marked and released in the first sample; $n_2$ = number caught in the second sample; $m_2$ = number of marked animals in the second sample; $N$ = estimated population size.
:::

## Random sampling

If you place quadrats where the plants "look interesting", you will over-represent some species. To sample randomly in a uniform area:

1. Lay two long tape measures at right angles along two edges of the area to make **axes**.
2. Use a **random number generator** (or table) to produce pairs of coordinates.
3. Place the corner of the quadrat at each coordinate.
4. Sample a large number of quadrats, enough that the running mean stops changing much.

Random sampling is right when the habitat is roughly the same throughout. Where conditions change across the area, for example from a riverbank up a slope, **systematic sampling** along a transect is better, because it shows how organisms change with the gradient.

## Frame quadrats

A quadrat can be used to record species in four ways:

| Measure | How it is recorded | Best for |
|---|---|---|
| Species list | Which species are present | Species richness |
| Density | Count individuals; divide by area | Plants or animals that can be counted, e.g. limpets, tufts of a plant |
| Frequency | Present or absent in each quadrat; % of quadrats | Quick surveys; plants hard to count |
| Percentage cover | Estimate area covered; a grid quadrat of 100 small squares helps | Grasses, mosses and spreading plants |

Each has weaknesses. Frequency ignores how many plants are present; percentage cover is subjective and can exceed 100% in total when plants overlap in layers; counting is slow for small or clumped plants.

:::worked-solution[Estimating density from random quadrats]
Tatenda placed ten 0.25 m² quadrats at random in a 40 m × 25 m grassland plot and counted a small herb: 6, 2, 0, 4, 7, 3, 0, 5, 1, 2.
1. Mean per quadrat $= 30 \div 10 = 3$.
2. Density $= 3 \div 0.25 = 12$ plants per m².
3. Area of plot $= 40 \times 25 = 1000$ m².
4. Estimated population $= 12 \times 1000 = 12\,000$ plants.
5. Frequency: the herb was present in 8 of 10 quadrats, so its frequency is 80%.
:::

## Transects

- A **line transect** is a tape laid across the habitat; every organism **touching** the line (or at regular points along it) is recorded. It is quick but records only presence.
- A **belt transect** places quadrats at regular intervals (for example every 2 m) along the line, either continuously or with gaps (an **interrupted belt transect**). It gives density, frequency or cover at each point, so changes in abundance along the gradient can be measured.
- At each station, measure the **abiotic factor** that changes: light intensity, soil moisture, soil pH, altitude, distance from water. The data can then be tested with a correlation coefficient.
- Repeat the transect at several randomly chosen positions along the gradient, so that one unusual line does not mislead.

:::example{title="A belt transect from a vlei into miombo woodland"}
Chipo runs a 30 m belt transect from the wet grassland of a vlei (seasonal wetland) up into miombo woodland, with a 1 m² quadrat every 3 m. She records percentage cover of sedges and of a woodland grass, and measures soil moisture and light intensity at each quadrat. Sedge cover falls from about 70% at the wet end to near zero by 15 m, while the woodland grass increases. She suggests that sedges tolerate waterlogged soil, and plots each species' cover against soil moisture, then uses Spearman's rank test to see if the relationship is significant. Repeating the transect at three other points along the vlei edge would make her conclusion more reliable.
:::

## Mark-release-recapture

Mobile animals, such as beetles, grasshoppers, fish or small mammals, cannot be counted in quadrats. Instead:

1. Capture a sample using a suitable method (pitfall traps, sweep nets, small-mammal traps, nets).
2. **Mark** each animal in a way that does no harm and will not wear off (a small dot of non-toxic paint under the wing case, a fur clip, a ring). Count them: $n_1$.
3. **Release** them where they were caught and allow time to mix back into the population.
4. Take a second sample in the same way. Count all animals ($n_2$) and the marked ones among them ($m_2$).
5. Estimate the population with the Lincoln index.

:::worked-solution[Estimating a population of ground beetles]
Sipho caught 48 ground beetles in pitfall traps, marked them and released them. Two days later he caught 52 beetles, of which 12 were marked.
1. $n_1 = 48$, $n_2 = 52$, $m_2 = 12$.
2. $N = \dfrac{48 \times 52}{12} = \dfrac{2496}{12} = 208$.
3. The estimated population is about 208 beetles.

The logic: 12 of the 52 beetles in the second sample (about 23%) were marked, so the 48 marked beetles are taken to be about 23% of the whole population.
:::

### Assumptions of the Lincoln index

- Marked individuals **mix randomly** with the rest of the population before the second sample.
- Marking does **not affect survival** or behaviour (it does not make animals more visible to predators or less likely to be trapped).
- Marks are **not lost** between samples.
- The population is **closed**: no significant births, deaths, immigration or emigration between the two samples.
- Every animal has an **equal chance** of being caught in each sample (no "trap-happy" or "trap-shy" individuals).

If marked animals become trap-shy, $m_2$ is too small and the population is **overestimated**; if marks wear off, the same error occurs.

:::keyfact{title="ZIMSEC and Cambridge"}
Random sampling, quadrats, transects and the Lincoln index are Cambridge A Level content (Papers 4 and 5). They are not separate ZIMSEC syllabus objectives, though ZIMSEC candidates meet quadrats in practical ecology and in continuous assessment.
:::

## Common mistakes

:::mistake{title="Placing quadrats by eye"}
Throwing a quadrat over your shoulder is not random. Use coordinates from a random number generator.
:::

:::mistake{title="Forgetting the quadrat area"}
Density is per m². A mean of 3 plants per 0.25 m² quadrat is 12 per m², not 3.
:::

:::mistake{title="Using random sampling on a gradient"}
Where conditions change across the area, use a transect so that the change is measured, not averaged away.
:::

:::mistake{title="Inverting the Lincoln index"}
$N = n_1 n_2 / m_2$. Dividing by $n_2$ or multiplying by $m_2$ gives nonsense.
:::

## Exam tips

:::exam-tip
In Paper 5 planning questions, *describe* the sampling fully: quadrat size, how positions are chosen (random coordinates or regular intervals along a transect), how many samples, what is recorded, and which abiotic factor is measured and how (light meter, soil moisture probe, pH meter). Add a risk assessment, such as care near water or with sharp tools.
:::

:::exam-tip
When asked to *suggest* why a Lincoln index estimate may be inaccurate, link each reason to an assumption and say whether it causes an overestimate or an underestimate.
:::

## Summary

:::summary
- Sample randomly (random coordinates) in uniform areas and systematically along transects where conditions change.
- Quadrats measure density (number per m²), frequency (% of quadrats) or percentage cover.
- Line transects record presence along a line; belt transects use quadrats at intervals and measure abundance.
- Mark-release-recapture estimates mobile populations: $N = n_1 n_2 / m_2$.
- The Lincoln index assumes random mixing, harmless lasting marks, a closed population and equal catchability.
:::
