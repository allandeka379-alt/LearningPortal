---
{
  "key": "gis.gps-field-capture",
  "title": "GPS: how it fixes position, errors and field data capture",
  "summary": "Explain how GPS satellites fix a position by trilateration, identify sources of error and their remedies, and plan field data capture with waypoints and tracks that are loaded into a GIS.",
  "concepts": [
    "ageo.gis.gps-field-capture"
  ],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

A farmer's phone shows a blue dot on a map; a surveyor records the corners of a plot; a conservation team marks where a snare was found in Hwange. All use the **Global Positioning System (GPS)** or, more generally, a **Global Navigation Satellite System (GNSS)**. GPS is the best-known name; other systems include GLONASS, Galileo and BeiDou, and modern receivers use several together. In ZIMSEC Form 5, GPS is the main tool for primary data capture in GIS, so you must know how a position is calculated, why errors occur and how field data reach a GIS.

You should already know latitude, longitude and the idea of coordinates (see the lesson on coordinate systems).

## Key definitions

:::definition{term="GNSS and GPS"}
GNSS is the general name for satellite navigation systems. GPS is the US system, with a constellation of about 30 working satellites orbiting at roughly 20 200 km altitude, so that several are above the horizon almost anywhere.
:::

:::definition{term="Trilateration"}
Finding a position from its distances to several known points. A GPS receiver measures its distance (range) to each satellite from the time a radio signal takes to arrive.
:::

:::definition{term="Differential GPS (DGPS)"}
A method in which a base station at a known position calculates the error in the satellite signals and sends corrections to nearby receivers, giving much better accuracy.
:::

:::definition{term="Waypoint and track"}
A waypoint is a single recorded position (a borehole, a school). A track is a line of positions recorded automatically at intervals as the receiver moves (a footpath, a boundary walk).
:::

## How a position is found

1. Each satellite broadcasts its position and the exact time of sending.
2. The receiver notes the time of arrival. Range $=$ speed of light $\times$ travel time. Radio waves travel at about 299 792 km per second, so a signal from a satellite overhead takes roughly 0.067 s.
3. Knowing the distance to one satellite places the receiver on a sphere around it. Two spheres intersect in a circle, and three intersect at two points, one of which is usually absurd (far out in space), so **three satellites** give a position on the ground (two dimensions).
4. The receiver's own clock is not atomic and is slightly wrong, so every range is wrong by the same unknown amount. A **fourth satellite** allows the clock error to be solved with the three coordinates (x, y, z). At least four satellites are therefore needed for a reliable three-dimensional fix.

## Accuracy and sources of error

| Source of error | Effect | Remedy |
|---|---|---|
| Atmospheric delay (ionosphere, troposphere) | Signals slow down, ranges too long | Dual-frequency receivers; differential correction |
| Multipath | Signal bounces off buildings or cliffs before arriving, lengthening the path | Use open sites, choke-ring antennas; avoid walls |
| Satellite geometry (dilution of precision, DOP) | Satellites bunched together give poor intersections | Wait for a better arrangement; use more constellations |
| Canopy and buildings | Signals blocked or weakened, fewer satellites | Observe from clearings; wait or use an offset |
| Receiver clock and noise | Small timing errors | Fourth satellite; averaging many readings |
| Satellite orbit and clock errors | Small errors in satellite position | Correction messages; post-processing |

Typical accuracy of a phone or handheld receiver is a few metres in the open. DGPS can reach sub-metre accuracy, and survey-grade methods (such as real-time kinematic, RTK) reach centimetres.

## Using GPS in the field

- **Navigate:** enter waypoints, then follow the displayed bearing and distance.
- **Record points, lines and areas:** a point for a well, a track for a path, a walked loop for a field boundary.
- **Attributes:** at each point record details (ID, type, condition, photograph) in a form or notebook.
- **Settings:** check the datum (usually WGS 84) and the coordinate format before collecting; wait for a good fix; average readings.
- **Transfer:** download a GPX file or spreadsheet and load it into a GIS as a vector layer; reproject if needed.

## Worked examples

:::worked-solution[Range from signal travel time and the effect of a clock error]
1. A signal takes 0.0745 s to reach a receiver. Range $= 299\,792 \times 0.0745 = 22335$ km.
2. A clock error of one microsecond ($10^{-6}$ s) is a range error of $299\,792 \times 10^{-6} = 0.300$ km, about 300 m.
3. Because that is far larger than the accuracy needed, the fourth satellite is used to remove the receiver's clock error.
:::

:::worked-solution[Length of a walked track]
Illustrative UTM coordinates (metres) recorded at four waypoints along a field boundary:

| Waypoint | Easting (m) | Northing (m) | Distance from previous (m) |
|---|---|---|---|
| W1 | 314520 | 8026140 | - |
| W2 | 314820 | 8026540 | 500 |
| W3 | 315180 | 8026540 | 360 |
| W4 | 315180 | 8026240 | 300 |

1. W1 to W2: change in easting 300 m, northing 400 m. Distance $= \sqrt{300^2 + 400^2} = 500$ m.
2. W2 to W3: easting changes by 360 m, northing by 0, so 360 m. W3 to W4: northing changes by 300 m, so 300 m.
3. Track length $= 500 + 360 + 300 = 1160$ m.
4. Straight line from W1 to W4: $\sqrt{660^2 + 100^2} = 668$ m. The track is much longer than the straight line.
5. Bearing from W1 to W2: $\tan\theta = 300 \div 400$, so $\theta = 36.9^\circ$, written 037°.
:::

:::example{title="Why a position under trees may be wrong"}
A team marks a borehole beneath a thick canopy. The receiver sees only four satellites, all low on the horizon, so the geometry is poor (a high DOP). Some signals bounce off tree trunks (multipath). The recorded position might be 15 m from the true position. The team moves to a clearing, waits for more satellites, averages readings for a few minutes, records the offset to the borehole and corrects the point in the GIS.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
GPS operation, errors and field capture are ZIMSEC Form 5 GIS content. Cambridge candidates should know in outline that GPS and GIS are used to collect and analyse geographical data.
:::

## Common mistakes

:::mistake{title="Saying three satellites are enough for a full fix"}
Three give a rough two-dimensional position only if the receiver's clock is perfect. A reliable 3D fix needs four, to solve the clock error.
:::

:::mistake{title="Confusing accuracy with the number of decimal places"}
A receiver may display coordinates to six decimal places but still be wrong by 5 m. Decimals show precision of display, not accuracy of position.
:::

:::mistake{title="Forgetting to state the datum"}
Coordinates collected on one datum and plotted on another may be shifted. State WGS 84 (or the datum used) with every dataset.
:::

## Exam tips

:::exam-tip
Explain trilateration in order: signals, travel time, ranges, intersection of spheres, fourth satellite for clock error. For errors, name the source, say how it changes the range and give a remedy. For *suggest how GPS could be used*, link a feature type to a data type (point, line or polygon) and a purpose.
:::

## Summary

:::summary
- GNSS satellites broadcast time signals; range equals speed of light times travel time.
- Three ranges fix a position in 2D; four satellites also solve the receiver clock error and give 3D.
- Errors come from atmosphere, multipath, poor geometry, canopy and clock or orbit errors; DGPS and careful practice reduce them.
- Waypoints, tracks and attributes captured in the field are loaded into a GIS as vector layers.
- Always check datum and coordinate format.
:::
