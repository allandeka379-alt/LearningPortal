---
{
  "key": "maps.gps-gis",
  "title": "GPS and GIS: layers, Boolean logic and overlay analysis",
  "summary": "How the Global Positioning System fixes a position and how to navigate with it; what a geographical information system is (layers, attributes, point, line and polygon data); Boolean AND, OR and NOT with Venn diagrams; overlay analysis with relational and conditional statements to choose a site; benefits and limitations of GIS.",
  "concepts": ["geo.maps.gps-gis"],
  "objectives": ["zimsec/o-level/geography:7.6.9.1", "zimsec/o-level/geography:7.6.9.2", "zimsec/o-level/geography:7.6.9.3", "cambridge/igcse/geography:S.3.3"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

A district health officer wants to build a new clinic. It should be close to a road, on land that does not flood, on a gentle slope, and within walking distance of as many homesteads as possible. Checking all of this by hand on paper maps would take weeks. A **geographical information system (GIS)** can do it in minutes by combining layers of data and asking logical questions of them. The positions of the homesteads, boreholes and roads in that GIS were very likely recorded with the **Global Positioning System (GPS)**.

GPS and GIS are now used in farming, mining, wildlife management, elections, disaster response and town planning, and in the phone in your pocket.

## Key definitions

:::definition{term="Global Positioning System (GPS)"}
A satellite navigation system in which a receiver on the ground uses signals from several orbiting satellites to work out its position (latitude, longitude and height) and the time.
:::

:::definition{term="Geographical information system (GIS)"}
A computer system that captures, stores, analyses and displays data linked to locations on the Earth's surface.
:::

:::definition{term="Layer"}
One set of geographical data in a GIS, such as roads, rivers, land use or population, which can be switched on, off or combined with other layers.
:::

:::definition{term="Attribute"}
A piece of information stored about a feature in a GIS, such as a road's surface type or a borehole's depth, held in an attribute table.
:::

:::definition{term="Overlay analysis"}
Combining two or more layers to find places that meet several conditions at once.
:::

## How GPS works

1. A network of satellites orbits about 20,000 km above the Earth, each continuously broadcasting its position and the exact time from an on-board atomic clock.
2. A GPS receiver picks up the signals and measures how long each took to arrive. Because radio signals travel at the speed of light, the time gives the **distance** to each satellite.
3. Knowing its distance from several satellites at once, the receiver works out the single point where those distances meet (**trilateration**). Signals from **at least four** satellites are needed: three to fix the position and a fourth to correct the receiver's less accurate clock.

The result is a position, usually accurate to within a few metres for an ordinary receiver, given as latitude and longitude or as a grid reference. Other countries run similar systems, and many phones use several of them together.

### Navigating with GPS

- A **waypoint** is a saved position (a borehole, a camp, a lost cow's last sighting).
- A **route** is a series of waypoints to follow; the receiver shows the direction (bearing) and distance to the next one.
- A **track** is a record of where you have actually been, useful for retracing your steps.

GPS can fail under thick tree cover, in deep valleys or between tall buildings, and when batteries run out, so a map and compass remain a sensible back-up.

## What a GIS contains

A GIS stores each theme as a separate layer, rather like a stack of transparent sheets laid over one base map. Each layer holds features of three kinds, with an attribute table for each:

- **Point** data: boreholes, schools, clinics, GPS waypoints.
- **Line** data: roads, rivers, power lines, district boundaries.
- **Polygon (area)** data: farms, wards, forests, flood zones, dams.

Some layers are images made of grid cells (pixels), such as satellite images or a slope map; these are called **raster** layers.

## Boolean logic

Boolean logic uses three operators to combine conditions. Venn diagrams show them clearly: imagine two overlapping circles, A (land within 2 km of a road) and B (land outside the flood zone).

- **AND (intersection)**: only the area where the circles **overlap**; land that is within 2 km of a road *and* outside the flood zone. AND narrows a search.
- **OR (union)**: the area covered by **either or both** circles. OR widens a search.
- **NOT (complement)**: everything **outside** a circle; for example NOT flood zone. "A NOT B" means the part of A that does not overlap B.

:::example{title="Boolean counts (fictional ward survey)"}
In a ward of 80 households, 40 have electricity (E), 25 have piped water (W) and 15 have both.
- E AND W = **15** households.
- E OR W = 40 + 25 − 15 = **50** households (the overlap is counted once).
- E NOT W = 40 − 15 = **25** households.
- NOT (E OR W) = 80 − 50 = **30** households have neither.
:::

## Overlay analysis: relational and conditional statements

Overlay analysis turns a planning problem into a set of rules applied to every feature or cell.

- A **relational statement** compares a value with a threshold using =, ≠, <, >, ≤ or ≥: *slope < 10%*, *distance to road ≤ 2 km*.
- A **conditional statement** uses IF ... THEN: *IF slope < 10% AND distance to road ≤ 2 km AND NOT flood zone THEN site is suitable, ELSE unsuitable.*

:::worked-solution[Choosing a site for a clinic (fictional data)]
| Site | Distance to road (km) | Slope (%) | In flood zone? |
|---|---|---|---|
| 1 | 1.1 | 4 | No |
| 2 | 0.6 | 14 | No |
| 3 | 2.6 | 3 | No |
| 4 | 0.9 | 5 | Yes |

Rule: IF distance ≤ 2 km AND slope < 10% AND NOT in flood zone THEN suitable.
1. Site 1: 1.1 ≤ 2 ✓, 4 < 10 ✓, not flooded ✓ → **suitable**.
2. Site 2 fails the slope test (14%).
3. Site 3 fails the distance test (2.6 km).
4. Site 4 fails the NOT flood-zone test.
Only **site 1** meets every condition.
:::

## Benefits and limitations of GIS

Benefits: handles huge amounts of data quickly; layers can be combined, updated and re-analysed easily; maps can be produced at any scale; it helps decisions in planning, disaster management, conservation, health and farming; results are easy to share.

Limitations: computers, software, training and electricity cost money; results are only as good as the data put in (out-of-date or inaccurate layers give wrong answers: "garbage in, garbage out"); collecting data in the field takes time; data about people raises privacy concerns; and a GIS answer still needs human judgement and local knowledge.

## Common mistakes

:::mistake{title="Mixing up AND and OR"}
AND gives fewer results (all conditions must be met); OR gives more (any condition will do).
:::

:::mistake{title="Counting the overlap twice"}
For A OR B, add the two sets and subtract the overlap once.
:::

:::mistake{title="Saying GPS needs only one satellite"}
A receiver needs signals from at least four satellites to fix its position and correct its clock.
:::

## Exam tips

:::exam-tip
For overlay questions, write the rule as a conditional statement first, then test each site against every condition in turn, ticking or crossing as you go.
:::

:::exam-tip
"Describe the benefits of GIS" answers should give a use (for example siting a clinic) as well as a general benefit (speed, combining layers).
:::

## Summary

:::summary
- GPS receivers measure signal travel times from at least four satellites to fix position by trilateration.
- A GIS stores layers of point, line and polygon (and raster) data, each with attributes.
- AND = intersection (narrows), OR = union (widens), NOT = complement (excludes); show them with Venn diagrams.
- Overlay analysis applies relational (<, ≤, =) and conditional (IF ... THEN) statements to layers to find suitable sites.
- GIS is fast and flexible but depends on accurate data, equipment and skilled users.
:::
