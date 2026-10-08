---
{
  "key": "maps.location-coordinates",
  "title": "Location: grid references, latitude, longitude and time",
  "summary": "Give the position of any feature with four- and six-figure grid references, locate places by latitude and longitude, understand the UTM grid in outline, and calculate local time from longitude.",
  "concepts": ["geo.maps.location-coordinates"],
  "objectives": ["zimsec/o-level/geography:7.6.2.1", "zimsec/o-level/geography:7.6.2.2", "zimsec/o-level/geography:7.6.2.3", "cambridge/igcse/geography:S.1.2"],
  "estimatedMinutes": 35,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

"Meet me near the school" is fine if you know the area. A surveyor, an ambulance driver or an examiner needs something more exact. Geographers have two systems for saying precisely where something is:

- **Grid references** on a topographical map, built from numbered grid lines.
- **Latitude and longitude** on the globe, measured in degrees.

Longitude also controls **time**: because the Earth turns, noon arrives in Mutare a few minutes before it arrives in Victoria Falls. This lesson covers all three ideas. Grid references appear in almost every map-work question, so practise them until they are automatic.

## Key definitions

:::definition{term="Eastings"}
The vertical grid lines on a map. Their numbers increase towards the **east**, so they are read along the bottom or top of the map.
:::

:::definition{term="Northings"}
The horizontal grid lines on a map. Their numbers increase towards the **north**, so they are read up the side of the map.
:::

:::definition{term="Latitude"}
The angular distance of a place north or south of the Equator (0°), up to 90°N or 90°S at the poles. Lines of latitude (parallels) run east–west.
:::

:::definition{term="Longitude"}
The angular distance of a place east or west of the Prime Meridian (0°) through Greenwich in London, up to 180°E or 180°W. Lines of longitude (meridians) run north–south and meet at the poles.
:::

:::definition{term="International Date Line"}
A line that roughly follows the 180° meridian (bending around some island groups). The calendar date changes by one day when you cross it.
:::

## Four-figure grid references

A four-figure reference names a **grid square**. Read the easting of the line on the **left (west)** side of the square, then the northing of the line along the **bottom (south)** side. A useful memory aid: *along the corridor, then up the stairs*.

In this course, map extracts are given as tables like the one below. Columns are eastings, rows are northings, and the **highest northing is at the top**, just as on a real map.

**Extract L** (fictional area), scale 1:50 000, grid squares 1 km:

| N \ E | 27 | 28 | 29 |
|---|---|---|---|
| 14 | Dip tank at 274 146 | Shop at 283 141 | Bridge at 298 143 |
| 13 | Borehole at 271 132 | School at 286 137 | Clinic at 292 135 |

The school lies in the square to the right of easting 28 and above northing 13, so its four-figure reference is **2813**.

## Six-figure grid references

A six-figure reference pinpoints a feature to the nearest tenth of a square (100 m on a 1:50 000 map).

:::worked-solution[Six-figure reference of the school in Extract L]
1. Easting of the line to the west of the school: 28.
2. Estimate tenths eastwards across the square: 6 tenths, giving 286.
3. Northing of the line to the south of the school: 13.
4. Estimate tenths northwards up the square: 7 tenths, giving 137.
5. Write easting first: **286 137**.
:::

Always give the easting before the northing. A reference such as 137 286 points to a completely different place.

## The UTM grid in outline

The grids on Zimbabwe's topographical maps belong to the **Universal Transverse Mercator (UTM)** system. The world is divided into 60 zones, each 6° of longitude wide, and positions within a zone are given in **metres** east and metres north of a fixed origin. Zimbabwe falls in UTM zones 35 and 36. On a map sheet the full figures are shortened: the large grid numbers you see (such as 28) are kilometres, so a full reference in metres would be written with more digits. You only need the idea, not the zone arithmetic.

## Latitude and longitude

Latitude and longitude are measured in **degrees (°)** and **minutes (′)**, with 60 minutes in one degree. Always write the hemisphere letter.

:::example{title="Locating Zimbabwe"}
Zimbabwe lies between roughly 15°S and 23°S and roughly 25°E and 33°E, so it is entirely in the **Southern** and **Eastern** hemispheres. Harare is at about 18°S, 31°E. A place exactly halfway between the 17°S and 18°S parallels is at 17°30′S, because half a degree is 30 minutes.
:::

## Calculating time from longitude

The Earth rotates through 360° in 24 hours, from west to east.

:::formula{name="Time and longitude"}
$$
360^\circ \div 24\ \text{h} = 15^\circ \text{ per hour, so } 1^\circ = 4\ \text{minutes}
$$
:::

Places to the **east** see the Sun rise first, so their local time is **ahead**; places to the **west** are **behind**. ("East – greater; West – less.")

:::worked-solution[It is 09:00 at a place on 15°E. What is the local time at a place on 60°W?]
1. The places are on opposite sides of the Prime Meridian, so add the longitudes: $15^\circ + 60^\circ = 75^\circ$.
2. Convert to time: $75 \div 15 = 5$ hours.
3. The second place is to the west, so it is behind: 09:00 − 5 h = **04:00** on the same day.
:::

:::worked-solution[Time difference between places on 28°E and 31°E]
1. Both are east of Greenwich, so subtract: $31^\circ - 28^\circ = 3^\circ$.
2. $3 \times 4 = 12$ minutes. The place on 31°E is 12 minutes ahead.
:::

For everyday life, countries use **standard time zones** rather than the exact local time of each town. Zimbabwe uses Central Africa Time, two hours ahead of Greenwich Mean Time. Exam questions on "local time" expect the 15° per hour calculation.

:::keyfact{title="Crossing the International Date Line"}
Travelling **eastwards** across the Date Line (from Asia towards the Americas) you go back one day. Travelling **westwards** across it you go forward one day.
:::

## Common mistakes

:::mistake{title="Northing first"}
Writing the northing before the easting gives a wrong reference. Easting first, every time.
:::

:::mistake{title="Using the line to the east of the square"}
The four-figure reference uses the lines on the **west** and **south** sides, i.e. the south-west corner of the square.
:::

:::mistake{title="Subtracting longitudes on opposite sides of Greenwich"}
If one place is east and the other west, **add** the longitudes. Subtract only when both are on the same side.
:::

## Exam tips

:::exam-tip
In Paper 1 multiple choice, distractors often reverse easting and northing or use the wrong corner of a square. Check the order before you choose.
:::

:::exam-tip
In time questions, show three steps: the longitude difference, the conversion to hours or minutes, and whether to add or subtract. State the day if it changes.
:::

## Summary

:::summary
- Four-figure references name a square by its south-west corner: easting, then northing.
- Six-figure references add tenths to locate a point to 100 m on a 1:50 000 map.
- Latitude is measured from the Equator, longitude from the Prime Meridian, in degrees and minutes.
- 15° of longitude = 1 hour; 1° = 4 minutes; places to the east are ahead.
- Crossing the Date Line eastwards takes you back a day; westwards, forward a day.
:::
