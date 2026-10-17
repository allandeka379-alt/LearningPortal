---
{
  "key": "maps.direction-bearings",
  "title": "Direction and bearings on maps",
  "summary": "Give direction with the 8- and 16-point compass, tell true, grid and magnetic north apart, measure three-figure bearings clockwise from grid north, work out back bearings and navigate with a magnetic compass.",
  "concepts": ["geo.maps.direction-bearings"],
  "objectives": ["zimsec/o-level/geography:7.6.4.1", "zimsec/o-level/geography:7.6.4.2", "cambridge/igcse/geography:S.1.3"],
  "estimatedMinutes": 30,
  "level": "core"
}
---
## Introduction

A herd boy looking for lost cattle, a ranger tracking poachers in a national park and a pilot flying from Harare to Bulawayo all need to know which way to go. "Over there" is not good enough on a map or in an exam. Geographers describe direction in two ways:

- **Compass points** such as north-east (NE) or south-south-west (SSW), which are quick but approximate.
- **Bearings**, which are angles in degrees measured clockwise from north, and are exact.

Direction questions appear in nearly every map-work exercise, together with grid references and distance. Once you can measure a bearing confidently you will collect these marks every time.

## Key definitions

:::definition{term="Compass direction"}
The direction of one place from another named by a point of the compass, for example north (N) or east-south-east (ESE).
:::

:::definition{term="Bearing"}
The angle, in degrees, measured **clockwise** from **north** to the line joining two places. It is always written with three figures, for example 045° or 270°.
:::

:::definition{term="Back bearing"}
The bearing of the starting point seen from the destination. It differs from the forward bearing by exactly 180°.
:::

:::definition{term="Magnetic declination"}
The angle between grid (or true) north and magnetic north at a place. It is printed in the margin of a topographical map and changes slowly from year to year.
:::

## The 8- and 16-point compass

The four **cardinal points** are north, east, south and west, 90° apart. Halfway between them are the **intercardinal points**: NE (045°), SE (135°), SW (225°) and NW (315°). Together these make the 8-point compass, with points 45° apart.

The 16-point compass adds a point halfway between each pair, 22.5° apart. Each new point is named by the nearest cardinal point first, then the intercardinal point: NNE (022.5°), ENE (067.5°), ESE (112.5°), SSE (157.5°), SSW (202.5°), WSW (247.5°), WNW (292.5°) and NNW (337.5°).

:::example{title="Reading the wording of a question"}
"What is the direction of the clinic **from** the school?" means: stand at the school and look towards the clinic. Reversing the question ("the school from the clinic") gives the opposite direction. Always start your line at the place named after the word **from**.
:::

## Three kinds of north

- **True north** points to the geographic North Pole. Lines of longitude run towards it.
- **Grid north** is the direction of the vertical grid lines (eastings) on a map. Over a single map sheet it is very close to true north, and it is the north you use for map bearings.
- **Magnetic north** is the direction a compass needle points. It differs from grid north by the **magnetic declination**, which the map margin states (for example "magnetic north is 6° west of grid north in the year of survey").

:::keyfact{title="Converting between grid and magnetic bearings"}
If magnetic north lies **west** of grid north, the magnetic bearing is **larger**: add the declination to a grid bearing to get the magnetic bearing, and subtract it to go back. If magnetic north lies east of grid north, do the opposite.
:::

## Measuring a bearing on a map

**Map extract D** (fictional area), scale 1:50 000, grid squares 1 km:

| N \ E | 61 | 62 | 63 | 64 |
|---|---|---|---|---|
| 48 | Trigonometrical station at 612 482 | Forest | Bridge at 636 484 | Church at 642 482 |
| 47 | Steep slope facing east | Store at 623 475 | Main road runs north–south | Cultivated land |
| 46 | Grassland | Clinic at 627 467 | Grinding mill at 638 461 | Cultivated land |
| 45 | Dam at 612 452 | Cattle pens | Main road | School at 642 452 |

:::worked-solution[Bearing of the bridge from the dam]
1. Mark both places and draw a straight line from the dam (the place after "from") to the bridge.
2. Draw a short line pointing to grid north at the dam, parallel to the eastings.
3. Put the protractor's centre on the dam with 0° on the north line.
4. Read clockwise to the line to the bridge: about **037°**.
5. Check with the grid: the bridge is 2.4 km east and 3.2 km north of the dam, so it lies between north and north-east, and nearer north-east. An angle of 037° fits.
:::

Pairs of features that are the same distance east and north of each other always give an intercardinal bearing. In Extract D the church is 3 km east and 3 km north of the dam, so its bearing from the dam is **045°** (north-east).

![Grid with eastings 61 to 64 and northings 45 to 49: the bridge lies 2.4 km east and 3.2 km north of the dam, so its bearing from the dam, measured clockwise from grid north, is 037°, and the bearing of the dam from the bridge (back bearing) is 217°.](media:diagrams/bearing-dam-bridge.png "Figure: the bearing of the bridge from the dam is 037°; the back bearing is 217°")

## Back bearings

To reverse a bearing, add 180° if it is less than 180°, or subtract 180° if it is 180° or more.

:::formula{name="Back bearing"}
$$
\text{back bearing} = \text{bearing} \pm 180^\circ
$$
:::

The bearing of the bridge from the dam is 037°, so the bearing of the dam from the bridge is 037° + 180° = **217°**. The bearing of the school from the trigonometrical station is 135°, so the station from the school is 135° + 180° = **315°**.

## Navigating with a magnetic compass

A baseplate (orienteering) compass lets you follow a bearing across open country:

1. Lay the edge of the compass along the route on the map, with the direction-of-travel arrow pointing to the destination.
2. Turn the housing until its orienting lines are parallel to the grid lines, with its arrow pointing to grid north. Read the grid bearing.
3. Adjust for magnetic declination as the map margin says.
4. Hold the compass flat and turn your body until the red end of the needle sits inside the orienting arrow.
5. Walk in the direction of travel, picking a landmark on the line (a tree or a rock) and walking to it, then picking the next one.

Iron objects, vehicles and power lines deflect the needle, so take readings away from them.

## Common mistakes

:::mistake{title="Measuring from the wrong place"}
The bearing of A **from** B is measured at B. Mixing them up gives the back bearing, an error of 180°.
:::

:::mistake{title="Measuring anticlockwise"}
Bearings always run clockwise from north. A place to the west is at 270°, not 090°.
:::

:::mistake{title="Two-figure bearings"}
Write 045°, not 45°. Examiners expect three figures.
:::

## Exam tips

:::exam-tip
In ZIMSEC Paper 1 multiple choice, the wrong options are often the back bearing or the angle measured anticlockwise. Estimate the compass direction first (for example "between N and NE"), then pick the bearing that fits.
:::

:::exam-tip
When asked to "measure the bearing", draw a north line at the starting point, use a sharp pencil and give the answer in three figures. Mark schemes usually allow a few degrees either side.
:::

## Summary

:::summary
- The 8-point compass has points 45° apart; the 16-point compass has points 22.5° apart.
- Bearings are measured clockwise from grid north and written in three figures.
- The bearing of A from B is measured at B; the back bearing differs by 180°.
- True north points to the North Pole, grid north follows the eastings, and magnetic north is where the compass needle points.
- With magnetic north west of grid north, add the declination to convert a grid bearing to a magnetic one.
:::
