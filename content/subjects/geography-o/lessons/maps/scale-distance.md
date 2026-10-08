---
{
  "key": "maps.scale-distance",
  "title": "Map scale, distance and area",
  "summary": "Read and convert statement, representative-fraction and linear scales, measure straight and winding distances (including with Pythagoras' theorem on grid references), and estimate areas by counting grid squares.",
  "concepts": ["geo.maps.scale-distance"],
  "objectives": ["zimsec/o-level/geography:7.6.3.1", "zimsec/o-level/geography:7.6.3.2", "zimsec/o-level/geography:7.6.3.3", "zimsec/o-level/geography:7.6.3.4", "cambridge/igcse/geography:S.1.3"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

A 1:50 000 map sheet is about half a metre across, yet it covers more than 20 km of countryside. **Scale** is what links the two. With it you can work out how far a learner walks to school, how long a new road will be, or how many hectares of land a dam will flood.

Scale questions appear in nearly every map-work paper, and they are among the easiest marks to gain, provided you convert units carefully. You should already know that 1 m = 100 cm and 1 km = 1 000 m = 100 000 cm.

## Key definitions

:::definition{term="Scale"}
The ratio between a distance on a map and the corresponding distance on the ground.
:::

:::definition{term="Statement scale"}
A scale written in words, for example *1 cm represents 0.5 km*.
:::

:::definition{term="Representative fraction (RF)"}
A scale written as a ratio or fraction such as 1:50 000 or 1/50 000. It has **no units**: 1 unit on the map represents 50 000 of the same units on the ground.
:::

:::definition{term="Linear scale"}
A line divided into equal parts and labelled with ground distances, used for measuring directly with a paper edge or dividers.
:::

## The three types of scale and converting between them

| Type | Example | Advantage |
| --- | --- | --- |
| Statement | 1 cm represents 0.5 km | Easy to understand |
| Representative fraction | 1:50 000 | Works in any unit, so anyone can use it |
| Linear | A bar marked 0, 1, 2, 3 km | Measure directly; stays correct if the map is enlarged or reduced |

To convert an RF to a statement, divide the ground number by 100 000 to get kilometres.

:::worked-solution[Convert 1:50 000 to a statement scale]
1. 1 cm on the map represents 50 000 cm on the ground.
2. $50\,000\ \text{cm} \div 100 = 500\ \text{m}$, and $500\ \text{m} = 0.5\ \text{km}$.
3. Statement: **1 cm represents 0.5 km**, so **2 cm represent 1 km**.
:::

On a 1:25 000 map, 1 cm represents 250 m and **4 cm represent 1 km**. The grid squares on both series are 1 km wide.

## Measuring straight-line distances

1. Lay the straight edge of a strip of paper between the two points and mark both.
2. Measure the length in centimetres with a ruler, or lay the strip along the linear scale.
3. Convert using the scale.

:::worked-solution[A straight line measures 7.4 cm on a 1:50 000 map]
1. Each centimetre represents 0.5 km.
2. $7.4 \times 0.5 = 3.7\ \text{km}$.
:::

### Using grid references and Pythagoras' theorem

When you know the six-figure references of two points, you can calculate the straight distance without measuring. Grid lines are 1 km apart, so the difference in eastings and northings is already in kilometres.

:::worked-solution[Distance from 312 458 to 336 476]
1. Difference in eastings: $33.6 - 31.2 = 2.4\ \text{km}$.
2. Difference in northings: $47.6 - 45.8 = 1.8\ \text{km}$.
3. Distance $= \sqrt{2.4^2 + 1.8^2} = \sqrt{5.76 + 3.24} = \sqrt{9} = 3.0\ \text{km}$.
:::

## Measuring winding distances

Roads, rivers and railways bend, so a straight edge underestimates their length.

- **Paper-edge method:** place the edge of a strip of paper along the first straight section and mark the start and the first bend. Pivot the paper at the bend so the edge follows the next section, mark again, and continue to the end. The total length on the strip is the map distance.
- **String method:** lay a piece of thread along every bend, mark the end point, straighten it and measure it.
- **Dividers:** step along the route with dividers set to a small, fixed distance and count the steps.

Then convert the map length with the scale as before.

## Estimating area

On 1:50 000 and 1:25 000 maps each grid square is 1 km by 1 km, so it covers **1 km²** (100 hectares).

1. Count the squares that are **completely** covered by the feature.
2. Count the squares that are **partly** covered. A common method is to treat each as half a square (another is to count only those more than half covered). Use the method the question gives you.
3. Add the totals.

:::worked-solution[A forest covers 6 complete squares and 8 partly covered squares]
1. Complete squares: 6 km².
2. Part squares counted as halves: $8 \times 0.5 = 4\ \text{km}^2$.
3. Estimated area: $6 + 4 = 10\ \text{km}^2$.
:::

For an irregular shape on a plan without a grid, trace it onto **graph paper** and count the small squares in the same way, then convert using the scale.

## Common mistakes

:::mistake{title="Forgetting to convert centimetres"}
On a 1:50 000 map, 6 cm is not 6 km. It is $6 \times 0.5 = 3\ \text{km}$.
:::

:::mistake{title="Adding the eastings and northings"}
The straight distance is $\sqrt{\Delta E^2 + \Delta N^2}$, not $\Delta E + \Delta N$. Adding gives the distance along two sides of a triangle, which is too long.
:::

:::mistake{title="Measuring a road with a ruler"}
A ruler between the end points gives the straight-line distance. A question asking for the distance *along the road* expects the winding distance.
:::

## Exam tips

:::exam-tip
Give the unit in your answer (km or m) and, if the question asks, the method. Answers within a stated tolerance (often about ±0.1 km) gain the mark, so measure carefully to the nearest millimetre.
:::

:::exam-tip
Read the question for *straight-line*, *as the crow flies* or *along the road*: each needs a different method.
:::

## Summary

:::summary
- Scale can be a statement, a representative fraction (no units) or a linear scale.
- On 1:50 000 maps, 2 cm represent 1 km; on 1:25 000 maps, 4 cm represent 1 km.
- Straight distance = map length × scale, or $\sqrt{\Delta E^2 + \Delta N^2}$ from grid references.
- Winding distances are measured with a paper edge, string or dividers.
- Area: count complete squares plus part squares (often as halves); each grid square is 1 km².
:::
