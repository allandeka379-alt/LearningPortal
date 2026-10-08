---
{
  "key": "maps.thematic-maps",
  "title": "Thematic maps: choropleth, isoline, flow and other maps",
  "summary": "Construct and interpret choropleth, isoline, dot distribution, proportional symbol, flow-line, desire-line, sphere-of-influence and route maps, choose the right one for a set of data, and weigh up their strengths and limitations.",
  "concepts": ["geo.maps.thematic-maps"],
  "objectives": ["zimsec/o-level/geography:7.6.1.2", "cambridge/igcse/geography:S.1.5"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

A topographical map shows everything at once: roads, rivers, contours and buildings. A **thematic map** shows just **one theme**, such as population density, rainfall, traffic or where shoppers come from, so that its pattern stands out. Thematic maps appear in census reports, newspapers, district plans and fieldwork write-ups, and exam papers use them as resources in almost every topic.

You need to do three things with them: **read** them (describe the pattern, quote values), **construct** them from data, and **judge** them (which type suits which data, and what each hides).

## Key definitions

:::definition{term="Thematic map"}
A map that shows the distribution of one topic or statistic over an area, such as rainfall, crop yields or population density.
:::

:::definition{term="Choropleth map"}
A map in which areas (such as districts or provinces) are shaded according to the value of a statistic, with darker or stronger shades for higher values.
:::

:::definition{term="Isoline"}
A line joining places with the same value of something. Examples: contours (height), isohyets (rainfall), isotherms (temperature) and isobars (air pressure).
:::

:::definition{term="Flow-line map"}
A map showing movement along actual routes, with the width of each line proportional to the amount moving.
:::

:::definition{term="Desire-line map"}
A map of straight lines drawn from where people start to where they go, showing the pattern of journeys rather than the routes taken.
:::

## Maps for data about areas

**Choropleth maps** suit data collected by area, such as census figures for districts. The data should be a **rate or density** (people per km², percentage of households with electricity), not a raw total, because large districts would otherwise look important just for their size.

:::worked-solution[Constructing a choropleth map (fictional data)]
| District | Population | Area (km²) | Density (people/km²) |
|---|---|---|---|
| P | 48,000 | 1,200 | 40 |
| Q | 15,000 | 1,500 | 10 |
| R | 90,000 | 600 | 150 |
| S | 33,000 | 1,100 | 30 |

1. Work out the density for each district: population ÷ area.
2. Choose 4–6 classes that do not overlap, for example 0–24, 25–49, 50–99, 100 and over.
3. Give each class a shade of one colour, lightest for the lowest class.
4. Shade each district and add a key. R is darkest; P and S share the second class; Q is lightest.
:::

Strengths: clear, quick to read, good for comparing areas. Limitations: each area appears **uniform** inside, and the change appears suddenly at boundaries, although real populations cluster in towns and thin out gradually. The choice of class boundaries can change the pattern.

## Maps for continuous data

**Isoline maps** suit things that change gradually across space, measured at points: rainfall at weather stations, temperature, air pressure, or pedestrian counts round a town centre. Lines are drawn by **interpolation** between the measured points. A rainfall map of Zimbabwe, for example, shows isohyets with higher values over the Eastern Highlands and lower values towards the south and the Zambezi valley.

Strengths: show gradual change and gradients (close isolines = rapid change). Limitations: values between lines must be estimated, and lines are only as accurate as the number of measuring points.

## Maps of points and quantities

- **Dot distribution maps**: each dot represents a fixed quantity (for example 1 dot = 500 people or 100 cattle), placed where the items actually are. They show clustering well. Counting is slow, and dots crowd together where values are high.
- **Proportional symbol maps**: a circle, square or bar at each place is sized according to the value. For circles, the **area** should be proportional to the value, so the radius is proportional to the **square root** of the value.

:::example{title="Proportional circles"}
Town A has 400 shops and is shown by a circle of radius 2 cm. Town B has 100 shops. B has one quarter of A's value, so its radius is 2 × √(100 ÷ 400) = 2 × 0.5 = **1 cm**, not 0.5 cm.
:::

## Maps of movement

- **Flow-line maps** draw each route with a width proportional to the volume. With a scale of 1 mm = 200 vehicles, a road carrying 2,600 vehicles a day is drawn 13 mm wide. They show the busiest routes clearly, but wide lines can overlap and hide detail.
- **Desire-line maps** join each person's origin to their destination with a straight line. In a shopping survey, many long lines to a town centre show a large **sphere of influence**. They show where people come from, not which roads they use, and many lines quickly become cluttered.
- **Sphere-of-influence maps** outline the area served by a settlement or service, for example a line round all the villages whose patients use one clinic.
- **Route maps** show the path of a road, railway, bus service or walking route, with stops, junctions and distances; they are simplified so the user can follow them.

## Choosing a suitable map

| Data | Suitable thematic map |
|---|---|
| Percentage of households with piped water, by ward | Choropleth |
| Mean annual rainfall at many weather stations | Isoline (isohyets) |
| Number of cattle at each dipping point | Proportional symbols or dot distribution |
| Daily traffic on each main road | Flow-line |
| Home villages of patients visiting a clinic | Desire-line (and sphere of influence) |

## Common mistakes

:::mistake{title="Shading totals on a choropleth map"}
Total population favours large districts. Convert to a density or percentage first.
:::

:::mistake{title="Scaling circles by radius"}
Doubling the radius makes a circle four times bigger in area. Scale the radius by the square root of the value.
:::

:::mistake{title="Confusing flow lines and desire lines"}
Flow lines follow real routes and vary in width; desire lines are straight lines from origin to destination.
:::

## Exam tips

:::exam-tip
"Describe the pattern" means: where values are highest and lowest (with names or areas), the general trend, and any anomaly, quoting figures from the key.
:::

:::exam-tip
"Suggest a suitable method of presenting this data" earns a mark for naming the map and another for a reason linked to the data type (area data, point data, movement).
:::

## Summary

:::summary
- Thematic maps show one theme so that its pattern is clear.
- Choropleth: area shading of rates or densities; hides variation inside areas.
- Isolines join equal values (isohyets, isotherms, isobars) and show gradual change.
- Dot maps show clustering; proportional circles have radius proportional to the square root of the value.
- Flow lines follow routes with width showing volume; desire lines are straight origin–destination lines that reveal a sphere of influence.
:::
