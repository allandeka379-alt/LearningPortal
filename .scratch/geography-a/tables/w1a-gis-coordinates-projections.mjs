import { t, table, dmsToDecimal, haversineKm, minutesPerLongitude, dpStr, chk } from "../lib.mjs";
import { writeLesson } from "./w1a-_write.mjs";

const mt = (x, dp) => dpStr(x, dp).replace("−", "-");
const lat1 = dmsToDecimal(-17, 50), lon1 = dmsToDecimal(31, 3); // near Harare
const lat2 = dmsToDecimal(-20, 9), lon2 = dmsToDecimal(28, 35); // near Bulawayo
chk(lat1, -17 - 50 / 60, 1e-9);
const d = haversineKm(lat1, lon1, lat2, lon2);
const kmPerLonAt18 = 111.32 * Math.cos((18 * Math.PI) / 180);
const zone = (lon) => Math.floor((lon + 180) / 6) + 1;
chk(zone(lon1), 36); chk(zone(lon2), 35);
const dLon = lon1 - lon2;
const minutes = minutesPerLongitude(dLon);
console.log({ lat1, lon1, lat2, lon2, d, kmPerLonAt18, dLon, minutes });

const body = t`
## Introduction

Every point on the Earth's surface can be described with numbers, and every map must flatten a curved surface onto a flat page. The first problem is solved by **coordinate systems**; the second creates **map projections**, which always distort something. GIS software stores locations as coordinates and can switch from one system or projection to another, so understanding both is the first skill of ZIMSEC Form 5 GIS and a common Paper 3 topic.

You should already know latitude, longitude and the equator and prime meridian from earlier geography. Here we extend them to grid systems and to the families of projection, and we describe (without software screenshots) how a map layer is reprojected.

## Key definitions

:::definition{term="Geographic coordinates"}
Position on the Earth expressed as latitude (angle north or south of the equator, 0° to 90°) and longitude (angle east or west of the prime meridian, 0° to 180°). They are angles, so they are measured in degrees, minutes and seconds or in decimal degrees.
:::

:::definition{term="Plane (grid) coordinates"}
Position on a flat map expressed as distances in metres (eastings and northings) from an origin. A grid is easy to measure with, but only valid for the part of the Earth it was designed for.
:::

:::definition{term="Map projection"}
A mathematical method of transferring the curved surface of the Earth onto a flat surface. Every projection distorts at least one of area, shape, distance or direction.
:::

:::definition{term="UTM (Universal Transverse Mercator)"}
A world-wide grid system that divides the Earth into 60 zones, each 6° of longitude wide, and gives positions in metres as an easting and a northing within the zone.
:::

:::definition{term="Reprojection"}
Converting the coordinates of a data layer from one coordinate system or projection to another so that layers line up.
:::

## Geographic coordinates

- One degree of latitude is about 111 km everywhere. One minute is about 1.85 km.
- One degree of longitude is about $111.3\cos\varphi$ km, where $\varphi$ is the latitude, so the meridians converge towards the poles. At 18° it is about ${dpStr(kmPerLonAt18, 1)} km.
- To convert degrees and minutes to decimal degrees divide the minutes by 60 and the seconds by 3 600. South and west are written as negative decimals.
- The Earth turns 360° in 24 hours, so local time changes by **4 minutes for each degree of longitude**.

## Plane and polar coordinates

**Plane coordinates** use an easting (x, metres east of the origin) and northing (y, metres north). A national grid is a plane grid designed for one country; the grid system used on a map is stated in the margin. **Polar coordinates** give a place by distance and bearing from a fixed point (for example "5 km on a bearing of 040° from the dam"). They are useful for radar, surveying and navigation.

## The UTM system

The Earth is divided into 60 zones numbered eastward from 180°. Zone number $= \lfloor (\text{longitude} + 180) \div 6 \rfloor + 1$ for longitudes east of Greenwich in decimal degrees. In each zone the central meridian has an easting of 500 000 m (a "false easting", so no easting is negative), and in the southern hemisphere the northing at the equator is 10 000 000 m (a "false northing"), counting northings down to zero at the South Pole. Zimbabwe lies in two zones: **35S** (24°E to 30°E, central meridian 27°E) in the west and **36S** (30°E to 36°E, central meridian 33°E) in the east.

## Families of projection

| Family | Surface used | Best for | Typical distortion |
|---|---|---|---|
| Cylindrical (e.g. Mercator) | Cylinder around the globe | World maps, navigation: directions and shapes of small areas are correct | Area greatly enlarged away from the equator |
| Conical (e.g. Lambert conformal conic) | Cone over the mid-latitudes | Countries that are wide east-west in mid-latitudes | Distortion grows north and south of the chosen standard parallels |
| Azimuthal (planar) | Flat plane touching one point | Polar regions, air routes: correct directions and distances from the centre | Distortion increases away from the centre |

Projections are also classified by what they keep correct: **conformal** (shape and angles), **equal-area** (areas), **equidistant** (some distances) and **azimuthal** (directions from the centre). No flat map keeps all four.

:::keyfact{title="Forward and inverse projection"}
A **forward** projection turns latitude and longitude into x and y on the flat map. An **inverse** projection turns x and y back into latitude and longitude. Reprojecting from one projection to another means applying an inverse from the first and a forward from the second.
:::

## Reprojecting a vector layer

1. Identify the coordinate system of the layer (its metadata or the .prj file).
2. Choose the target system (for example UTM zone 36S for a project in eastern Zimbabwe, with the WGS 84 datum).
3. Transform every vertex of every feature; the layer does not need to be redrawn.
4. Check the result: the layers should line up, the units should be metres (not degrees) and measurement tools should give sensible distances.
5. Save as a new layer, keeping the original.

If the two layers use different **datums** (reference models of the Earth) their positions can differ by metres or even hundreds of metres, so state the datum as well as the projection.

## Worked examples

:::worked-solution[Degrees to decimal degrees and a straight-line distance]
A point near Harare is 17°50′S 31°03′E and a point near Bulawayo is 20°09′S 28°35′E (approximate positions, to the nearest minute).

1. Latitude 1: $17 + 50 \div 60 = 17.8333$, so $-17.8333^\circ$. Longitude 1: $31 + 3 \div 60 = 31.05^\circ$.
2. Latitude 2: $20 + 9 \div 60 = 20.15$, so $-20.15^\circ$. Longitude 2: $28 + 35 \div 60 = ${dpStr(lon2, 4)}^\circ$.
3. Using the great-circle (haversine) formula on a sphere of radius 6 371 km the distance is about ${dpStr(d, 0)} km. A projected map would measure a slightly different length depending on its distortion.
4. The UTM zones are $\lfloor (31.05 + 180) \div 6 \rfloor + 1 = 36$ and $\lfloor (${dpStr(lon2, 2)} + 180) \div 6 \rfloor + 1 = 35$, so the two points are in different zones.
:::

:::worked-solution[Time difference]
Mutare is at about 32.67°E and Bulawayo at about 28.58°E.

1. Difference in longitude $= 32.67 - 28.58 = 4.09^\circ$.
2. Time difference $= 4.09 \times 4 = ${dpStr(minutesPerLongitude(4.09), 1)}$ minutes.
3. Sunrise occurs about ${dpStr(minutesPerLongitude(4.09), 0)} minutes earlier in Mutare (east) than in Bulawayo (all other things equal), although the clock time is the same in both because Zimbabwe uses a single time zone (Central Africa Time, UTC+2).
:::

:::example{title="Choosing a projection"}
A planner needs to measure the area of commercial farmland in Zimbabwe's provinces. An **equal-area** projection (for example an Albers equal-area conic) is best because the areas are preserved, whereas the Mercator projection would exaggerate areas away from the equator. For a navigator plotting a course on a constant bearing, Mercator is the right choice.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Coordinate systems, UTM and projection families are ZIMSEC Form 5 GIS content. Cambridge candidates need latitude, longitude and time-zone ideas within Skills but not UTM or reprojection.
:::

## Common mistakes

:::mistake{title="Using degrees as if they were metres"}
A layer in latitude and longitude has units of degrees. Measuring distances or areas in a degree-based layer gives meaningless numbers: reproject to a metre-based projection first.
:::

:::mistake{title="Saying a projection is 'accurate'"}
Every projection is correct for something and distorted for something else. Name the property preserved and the property distorted.
:::

:::mistake{title="Mixing up east and west signs"}
In decimal degrees southern latitudes and western longitudes are negative. Zimbabwe has negative latitudes and positive longitudes.
:::

## Exam tips

:::exam-tip
Show conversions line by line. *State* a coordinate with its hemisphere letter or sign. *Compare* projections by naming what each preserves and distorts, then link the choice to the task (area measurement, navigation, polar flights). In reprojection questions list the steps in order and mention checking the result and the datum.
:::

## Summary

:::summary
- Geographic coordinates are angles; 1° of latitude is about 111 km, 1° of longitude shrinks with the cosine of latitude, and time changes by 4 minutes per degree of longitude.
- Plane (grid) coordinates are metres; UTM divides the world into 60 zones of 6°, and Zimbabwe lies in zones 35S and 36S.
- Cylindrical, conical and azimuthal projections each keep some properties and distort others; none keeps all.
- Forward projection turns latitude and longitude into x and y; inverse does the opposite.
- Reproject layers to a common system before measuring or overlaying them, and check the datum.
:::
`;

writeLesson("gis", "coordinates-projections", { title: "Coordinates, coordinate systems and map projections", summary: "Locate features with geographic, plane, polar and UTM coordinates, convert between forms, compare cylindrical, conical and azimuthal projections and describe how a vector layer is reprojected.", minutes: 40, free: true }, body);
