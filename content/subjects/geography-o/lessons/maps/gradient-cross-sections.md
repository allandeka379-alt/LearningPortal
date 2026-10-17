---
{
  "key": "maps.gradient-cross-sections",
  "title": "Gradient, cross-sections and intervisibility",
  "summary": "Calculate gradient as vertical interval over horizontal equivalent (as 1 in n and as a percentage), explain how gradient affects roads, railways and farming, draw and read cross-sections with vertical exaggeration, and decide whether two places are intervisible.",
  "concepts": ["geo.maps.gradient-cross-sections"],
  "objectives": ["zimsec/o-level/geography:7.6.6.1", "zimsec/o-level/geography:7.6.6.2", "cambridge/igcse/geography:S.1.4"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

Why does the road from the Highveld down an escarpment twist back and forth in hairpin bends, while a railway takes a long detour along a valley? Why are large irrigated fields found on flat land, while steep hillsides are left under woodland? The answer in each case is **gradient**, the steepness of the land.

Contours tell you *that* a slope is steep; gradient tells you *how* steep, as a number. A **cross-section** shows the shape of the land along a line as a side view, and it lets you work out whether one place can be seen from another (**intervisibility**). All three skills are tested in map-work papers.

## Key definitions

:::definition{term="Vertical interval (VI)"}
The difference in height between two points, in metres, found from contours, spot heights or trigonometrical stations.
:::

:::definition{term="Horizontal equivalent (HE)"}
The horizontal distance between the same two points on the ground, found with the map scale and converted to metres.
:::

:::definition{term="Gradient"}
The steepness of a slope: the vertical interval divided by the horizontal equivalent, written as a ratio "1 in n" or as a percentage.
:::

:::definition{term="Vertical exaggeration"}
The number of times the vertical scale of a cross-section is stretched compared with its horizontal scale, so that relief shows up clearly.
:::

:::definition{term="Intervisibility"}
Whether one point can be seen from another, with no higher land between them blocking the line of sight.
:::

## Calculating gradient

:::formula{name="Gradient"}
$$
\text{gradient} = \frac{\text{VI}}{\text{HE}} \quad \text{(both in metres)}, \qquad \text{percentage gradient} = \frac{\text{VI}}{\text{HE}} \times 100
$$
:::

To write the gradient as "1 in n", divide the HE by the VI: $n = \text{HE} \div \text{VI}$.

:::worked-solution[Gradient from a spot height to a bridge]
On a 1:50 000 map a spot height of 1412 m is 4.8 cm from a bridge on the 1220 m contour.
1. VI = 1412 − 1220 = 192 m.
2. HE = 4.8 cm × 500 m per cm = 2,400 m.
3. n = 2,400 ÷ 192 = 12.5, so the gradient is **1 in 12.5**.
4. As a percentage: 192 ÷ 2,400 × 100 = **8%**.
:::

:::worked-solution[Gradient from two grid references]
A spot height of 1450 m is at 312 548 and a bridge at 1210 m is at 336 516 on a 1:50 000 map.
1. VI = 1450 − 1210 = 240 m.
2. ΔE = 2.4 km, ΔN = 3.2 km, so HE = √(2.4² + 3.2²) = 4.0 km = 4,000 m.
3. n = 4,000 ÷ 240 ≈ 16.7, so the gradient is about **1 in 17** (6%).
:::

The **smaller** the number n, the **steeper** the slope: 1 in 5 is much steeper than 1 in 50.

## Using gradient to explain features on a map

- **Roads** can climb fairly steep slopes, but on escarpments they zig-zag in **hairpin bends** to reduce the gradient: a longer route over the same VI gives a larger HE and so a gentler gradient.
- **Railways** need much gentler gradients than roads, because steel wheels on steel rails grip poorly and heavy trains cannot climb steep slopes. Railways therefore follow valleys, cross watersheds at low points such as cols, and use cuttings, embankments and long curves.
- **Farming** favours gentle slopes: tractors and irrigation work best there, and soil erosion is lower. Steep slopes are left under woodland or grazing, or are terraced.
- **Settlements** usually avoid steep slopes, where building is costly; gentle, well-drained slopes are preferred.

## Drawing a cross-section

1. Lay the straight edge of a strip of paper along the line of the section (for example from X to Y).
2. Mark the ends, and make a tick where each contour, river and important feature crosses the edge; write the heights beside the ticks.
3. Draw a horizontal axis the same length as the strip and a vertical axis with a sensible scale (for example 1 cm = 50 m).
4. Transfer each tick and plot it at its height; join the points with a smooth curve (not straight lines), rounding hilltops and valley bottoms sensibly.
5. Label rivers, roads and other features, and give a title, both scales and the vertical exaggeration.

:::formula{name="Vertical exaggeration"}
$$
\text{VE} = \frac{\text{horizontal scale denominator}}{\text{vertical scale denominator}}
$$
:::

:::example{title="Vertical exaggeration"}
Horizontal scale 1:50 000 (from the map). Vertical scale 1 cm = 50 m, which is 1:5 000. VE = 50 000 ÷ 5 000 = **10**: the land looks ten times steeper than it really is.
:::

## Intervisibility

Draw (or imagine) a straight line from the observer to the target on the cross-section. If any land rises **above** that line, the target is hidden; if not, the two places are intervisible.

**Table 1** gives heights along a straight line from a lookout tower (0 km) to a dip tank (2.5 km) (fictional data).

| Distance (km) | 0 | 0.5 | 1.0 | 1.5 | 2.0 | 2.5 |
|---|---|---|---|---|---|---|
| Height (m) | 1300 | 1280 | 1270 | 1320 | 1240 | 1250 |

The line of sight falls 50 m over 2.5 km, i.e. 20 m per km. At 1.5 km it is at 1300 − 30 = 1270 m, but the land there is 1320 m, so a ridge **blocks** the view: the two places are not intervisible.

![Cross-section from a lookout tower at 1300 m to a dip tank at 1250 m over 2.5 km: the line of sight falls 20 m per km and is at 1270 m at 1.5 km, but a ridge there is 1320 m high, so the two places are not intervisible.](media:diagrams/intervisibility-cross-section.png "Figure: a 1320 m ridge rises above the line of sight, so the dip tank cannot be seen from the tower")

## Common mistakes

:::mistake{title="Mixing units"}
VI and HE must be in the same unit. Convert the map distance to metres before dividing.
:::

:::mistake{title="Turning the ratio upside down"}
For "1 in n", n = HE ÷ VI. Dividing VI by HE gives a small decimal, which is the gradient as a fraction, not n.
:::

:::mistake{title="Joining cross-section points with a ruler"}
Real slopes are curved; join the points freehand with a smooth line.
:::

## Exam tips

:::exam-tip
Show three lines of working for any gradient: VI, HE in metres, and the division. Mark schemes give credit for each step and allow a small range in the final answer.
:::

:::exam-tip
"Explain the route of the railway" questions expect gradient: say that the railway follows the valley or the col *because* railways need gentle gradients.
:::

## Summary

:::summary
- Gradient = VI ÷ HE (same units); 1 in n with n = HE ÷ VI; percentage = VI ÷ HE × 100.
- The smaller n is, the steeper the slope.
- Roads use hairpin bends and railways follow valleys and cols to keep gradients gentle; farming and settlement favour gentle slopes.
- Cross-sections are drawn with a paper strip and smooth curves; VE = horizontal ÷ vertical scale denominators.
- Two places are intervisible if no land rises above the straight line of sight between them.
:::
