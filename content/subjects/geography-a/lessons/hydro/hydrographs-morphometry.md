---
{
  "key": "hydro.hydrographs-morphometry",
  "title": "Hydrographs and stream morphometry",
  "summary": "Read annual and storm hydrographs, calculate lag time and peak flow, explain how basin factors change hydrograph shape, and calculate stream order, bifurcation ratio, stream frequency and drainage density from a map extract.",
  "concepts": [
    "ageo.hydro.hydrographs-morphometry"
  ],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Zimbabwe's rivers tell their story in a graph. The Mazowe or the Save may be a trickle in October and a brown torrent in February, and a storm over Harare can send the Mukuvisi River from a trickle to a flood in a matter of hours. A **hydrograph** shows how the discharge of a river changes with time, and it lets us compare basins, predict floods and test ideas about the links between rainfall and runoff. The shape of the river network itself, measured by **morphometry**, helps to explain why basins respond differently.

You should know how water moves through a drainage basin (previous lesson). This lesson reads graphs, links their shape to basin characteristics, and then measures the stream network.

## Key definitions

:::definition{term="Discharge"}
The volume of water passing a point in a river each second, in cubic metres per second (m³/s, 'cumecs'). Discharge = cross-sectional area × velocity.
:::

:::definition{term="Hydrograph"}
A graph of river discharge against time. An **annual hydrograph** shows monthly or daily discharge through a year (the river regime). A **storm hydrograph** shows discharge during and after one rainfall event.
:::

:::definition{term="Lag time"}
The time between the peak of rainfall and the peak of discharge. A short lag time means a fast, flashy response.
:::

:::definition{term="Stream order (Strahler)"}
A system of numbering streams. Streams with no tributaries are **first order**. Where two streams of the same order join, the stream below is of the next order up. A stream of lower order joining a higher-order one does not change the order.
:::

## Annual hydrographs: river regimes

A **river regime** is the pattern of a river's flow through the year. Rainfall season, temperature, vegetation and storage all control it.

- Zimbabwean rivers on the plateau follow the **summer rainfall**: discharge rises from November, peaks between January and March, and falls to a minimum in September-October. Many small streams stop flowing in the dry season when baseflow fails.
- The Zambezi, with a very large catchment across Angola, Zambia and Zimbabwe, has a **single peak** in about March-April, later than local rainfall because of the travel time and storage in floodplains, and a low flow in October-November.
- Interpreting a regime: identify the month of the peak and the minimum, calculate the range or the ratio of maximum to minimum, and explain using rainfall, evapotranspiration and storage.

## Storm hydrographs

A storm hydrograph has these parts:

![Storm hydrograph: rainfall peaks at 18 mm/h in hour 3; the urban stream peaks at 26 m3/s in hour 5 (lag 2 hours) and the rural stream at 10 m3/s in hour 7 (lag 4 hours), so urban surfaces give a shorter lag and a peak 2.6 times higher.](media:diagrams/storm-hydrograph-urban-rural.png "Figure: storm hydrographs for a rural and an urban stream (data from the worked example, illustrative)")

1. **Baseflow:** the steady flow before the storm, fed by groundwater.
2. **Rising limb:** discharge rises as overland flow and throughflow reach the channel.
3. **Peak discharge:** the highest flow.
4. **Falling (recession) limb:** discharge falls as stormflow drains away, returning to baseflow.
5. **Lag time:** from peak rainfall to peak discharge.

### Factors that change the shape

| Factor | Flashy hydrograph (short lag, steep limbs, high peak) | Gentle hydrograph (long lag, low peak) |
|---|---|---|
| Land use | Urban, with impermeable surfaces and drains | Woodland or grassland |
| Rock and soil | Impermeable rock, clay soils, compacted soil | Permeable rock, sandy soils |
| Antecedent conditions | Saturated soil before the storm | Dry soil with spare capacity |
| Rainfall | Intense, short storm | Light, steady rain |
| Slope | Steep | Gentle |
| Basin shape | Circular | Elongated |
| Drainage density | High | Low |
| Vegetation | Sparse | Dense (interception) |

## Stream morphometry (ZIMSEC detail)

Morphometry measures the form of the drainage network on a map extract.

- **Stream order** (Strahler) and the **number of streams of each order** ($N_1$, $N_2$, …).
- **Bifurcation ratio** $R_b = \dfrac{N_u}{N_{u+1}}$, the number of streams of one order divided by the number of the next higher order. Values are usually 3-5; the **mean** of the ratios is used for the basin.
- **Drainage density** $D_d = \dfrac{\text{total length of streams (km)}}{\text{basin area (km}^2)}$.
- **Stream frequency (stream density)** $F = \dfrac{\text{total number of streams}}{\text{basin area (km}^2)}$.
- **Stream (drainage) intensity** $= \dfrac{F}{D_d}$, the number of streams per unit length of channel. Check your own syllabus notes for the form your teacher uses.

High drainage density and high stream frequency are typical of impermeable rock, sparse vegetation and heavy rainfall; they give a short lag time and a high peak.

## Worked examples

:::worked-solution[Reading a storm hydrograph]
Hourly data for a storm on a rural and an urban stream of similar size (illustrative data, invented for this exercise):

| Time (h) | Rainfall (mm/h) | Rural Q (m³/s) | Urban Q (m³/s) |
|---|---|---|---|
| 0 | 0 | 2 | 2 |
| 1 | 4 | 2 | 2 |
| 2 | 12 | 2 | 3 |
| 3 | 18 | 3 | 9 |
| 4 | 6 | 4 | 20 |
| 5 | 2 | 6 | 26 |
| 6 | 0 | 8 | 19 |
| 7 | 0 | 10 | 12 |
| 8 | 0 | 9 | 7 |
| 9 | 0 | 7 | 4 |
| 10 | 0 | 5 | 3 |
| 11 | 0 | 3 | 2 |
| 12 | 0 | 2 | 2 |

1. **Rainfall peak:** 18 mm/h at hour 3.
2. **Rural stream:** peak discharge 10 m³/s at hour 7, so lag time $= 7 - 3 = 4$ hours.
3. **Urban stream:** peak discharge 26 m³/s at hour 5, so lag time $= 5 - 3 = 2$ hours.
4. **Compare peaks:** $26 \div 10 = 2.6$ times higher, an increase of $\dfrac{26 - 10}{10} \times 100 = 160\%$.
5. **Explain:** the urban stream has impermeable surfaces and drains, so water reaches the channel quickly; the rural stream gets more infiltration and slower throughflow.
6. **Stormflow volume** (the extra discharge above the 2 m³/s baseflow, summed hourly): rural $= 37$ m³/s·h, urban $= 85$ m³/s·h, so the urban stream carried $85 \div 37 = 2.3$ times as much storm water.
:::

:::worked-solution[Stream morphometry of a basin]
A basin of 36 km² has the following streams on a map extract (illustrative data). Total channel length is 57.6 km.

![Number of streams falls steeply with Strahler order: 36 first-order, 9 second-order, 2 third-order and 1 fourth-order stream, giving bifurcation ratios of 4.0, 4.5 and 2.0 and a mean of 3.5.](media:diagrams/stream-order-numbers.png "Figure: number of streams by order and the bifurcation ratios of the worked-example basin (illustrative data)")

| Stream order | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| Number of streams | 36 | 9 | 2 | 1 |

1. **Bifurcation ratios:** $R_{b1} = 36 \div 9 = 4.0$; $R_{b2} = 9 \div 2 = 4.5$; $R_{b3} = 2 \div 1 = 2.0$.
2. **Mean bifurcation ratio:** $(4.0 + 4.5 + 2.0) \div 3 = 3.5$.
3. **Total number of streams:** $36 + 9 + 2 + 1 = 48$, so stream frequency $F = 48 \div 36 = 1.33$ streams per km².
4. **Drainage density:** $D_d = 57.6 \div 36 = 1.6$ km per km².
5. **Stream intensity:** $F \div D_d = 1.33 \div 1.6 = 0.83$.
6. A drainage density of 1.6 km/km² is moderate, so the basin responds at a moderate speed.
:::

:::worked-solution[Testing a rainfall-discharge hypothesis (ZIMSEC)]
Hypothesis: *the greater the storm rainfall, the greater the peak discharge.* Null hypothesis: there is no relationship. Data for eight storms (illustrative):

| Storm | Rainfall (mm) | Peak discharge (m³/s) | Rank x | Rank y | d | d² |
|---|---|---|---|---|---|---|
| 1 | 12 | 2.4 | 2 | 2 | 0 | 0 |
| 2 | 25 | 5.1 | 5 | 5 | 0 | 0 |
| 3 | 18 | 3.9 | 3 | 4 | −1 | 1 |
| 4 | 40 | 6.8 | 7 | 6 | 1 | 1 |
| 5 | 33 | 7.6 | 6 | 7 | −1 | 1 |
| 6 | 8 | 1.8 | 1 | 1 | 0 | 0 |
| 7 | 52 | 10.2 | 8 | 8 | 0 | 0 |
| 8 | 21 | 3.5 | 4 | 3 | 1 | 1 |

1. $\sum d^2 = 4$ and $n = 8$.
2. $r_s = 1 - \dfrac{6 \sum d^2}{n^3 - n} = 1 - \dfrac{6 \times 4}{504} = 1 - 0.048 = 0.95$.
3. The critical value for $n = 8$ at the 0.05 level is 0.738. Since $0.95 > 0.738$, reject the null hypothesis.
4. There is a **significant strong positive correlation** between storm rainfall and peak discharge. With only eight storms and other factors (soil wetness, intensity), the result is a guide, not proof.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards expect annual and storm hydrographs and the factors that influence them (ZIMSEC 6.2.1; Cambridge 1.1.4a and 1.1.4b). Stream ordering, stream density and intensity and other morphometry calculations (6.2.2) and testing rainfall-discharge hypotheses are ZIMSEC detail. Cambridge does not set morphometry calculations.
:::

## Common mistakes

:::mistake{title="Measuring lag time from the start of the rain"}
Lag time runs from the **peak** of rainfall to the **peak** of discharge, not from the start of the rain or the start of the rising limb.
:::

:::mistake{title="Adding orders when two streams meet"}
Two first-order streams make a second-order stream, not a third-order one. Only a junction of two streams of the **same** order raises the order.
:::

:::mistake{title="Confusing drainage density with stream frequency"}
Drainage density uses total **length**; stream frequency uses the **number** of streams. Both are per km² of basin.
:::

## Exam tips

:::exam-tip
Tested in ZIMSEC Paper 1 (topic 6) and Paper 3 (map and statistics), and in Cambridge Paper 1 (topic 1, often as a Section A resource). *Describe* a hydrograph with figures: peak, lag time, rising and falling limbs, with units. *Explain* differences by linking each factor to infiltration and speed. *Calculate* with the formula, the substitution and units. For hypotheses, state the null, give $r_s$ or the test statistic, compare with the critical value, and conclude in words.
:::

## Summary

:::summary
- A hydrograph graphs discharge against time; regimes show the annual pattern and storm hydrographs show the response to one storm.
- Parts of a storm hydrograph: baseflow, rising limb, peak discharge, falling limb, lag time.
- Urban, steep, impermeable, saturated, circular and high-density basins give short lag times and high peaks.
- Strahler order increases only when two streams of the same order meet.
- Bifurcation ratio = N(u) ÷ N(u+1); drainage density = length ÷ area; stream frequency = number ÷ area.
- Rainfall-discharge links can be tested with Spearman's rank correlation and a critical value.
:::
