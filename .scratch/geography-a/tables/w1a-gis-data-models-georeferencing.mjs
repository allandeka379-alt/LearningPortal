import { t, table, rmse, sum, dpStr, chk } from "../lib.mjs";
import { writeLesson } from "./w1a-_write.mjs";

const gcp = [[1.2, 0.8], [-0.9, 1.1], [0.5, -1.4], [-1.0, -0.6], [0.7, 0.9]];
const rm = rmse(gcp);
const rows = gcp.map(([dx, dy], i) => [`GCP ${i + 1}`, dpStr(dx, 1), dpStr(dy, 1), dpStr(dx * dx, 2), dpStr(dy * dy, 2), dpStr(dx * dx + dy * dy, 2)]);
const ss = sum(gcp.map(([dx, dy]) => dx * dx + dy * dy));
chk(rm, Math.sqrt(ss / 5), 1e-12);
// Raster example
const cells = 500 * 800;
const areaKm2 = (cells * 30 * 30) / 1e6;
const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "\\,");
const cells10 = areaKm2 * 1e6 / (10 * 10);
console.log({ rm, ss, cells, areaKm2, cells10 });

const body = t`
## Introduction

A geographical information system (GIS) stores the world in layers. How a layer is stored decides what can be done with it: a road network, a soil map and a satellite image are each best held in a different data model. Before layers can be combined they must be tied to the ground (**georeferenced**), and features traced from paper maps or images must be **digitised** carefully. This lesson covers these steps for ZIMSEC Form 5 and Paper 3, where an RMSE calculation or a choice between vector and raster is a regular question.

You should already know about coordinate systems (see the lesson on coordinates and projections).

## Key definitions

:::definition{term="Vector data model"}
Features stored as points, lines and polygons defined by coordinates, each with a row of attributes in a table. Examples: boreholes (points), roads (lines), districts (polygons).
:::

:::definition{term="Raster data model"}
A grid of equal-sized cells (pixels), each holding one value, such as elevation, land-cover class or reflectance. Examples: satellite images and digital elevation models.
:::

:::definition{term="Georeferencing"}
Assigning real-world coordinates to a scanned map or image by matching points on it to known ground positions called ground control points (GCPs).
:::

:::definition{term="Root mean square error (RMSE)"}
A single number showing how well a georeferenced layer fits its GCPs: the square root of the mean of the squared residual distances.
:::

:::definition{term="Digitising"}
Tracing the features of a map or image on screen (or with a digitising tablet) to create vector layers.
:::

## Vector and raster compared

| Feature | Vector | Raster |
|---|---|---|
| Basic unit | Point, line, polygon | Cell (pixel) |
| Best for | Discrete features with clear boundaries (roads, plots, boreholes) | Continuous surfaces (elevation, temperature, rainfall) and images |
| Accuracy of shape | Exact boundaries | Edges follow cell shapes (stair-steps) |
| File size | Small for simple data | Large, rising steeply as cell size falls |
| Analysis | Network analysis, buffers, attribute queries | Map algebra, surface analysis, overlays of grids |
| Attributes | Many attributes per feature | Usually one value per cell per layer |

Resolution matters for rasters: halving the cell size multiplies the number of cells by four. Rasters of categories (land cover) are best represented with nearest neighbour resampling so classes are not blended.

## Georeferencing

1. Scan the paper map and open it in the GIS.
2. Choose **ground control points** at features that can be identified exactly on both the scan and a reference (road junctions, bridge ends, corners of dams). Spread them around the map, including near the corners; at least three are needed for a simple transformation and more (six or more) for a good fit.
3. Enter the real-world coordinates of each GCP.
4. Choose a transformation (first-order or affine is common for a flat scan).
5. Check the **residuals**: the distance between where each GCP is placed after transformation and where it should be.
6. Compute the **RMSE**; remove or re-enter points with large residuals and repeat.
7. **Resample** the image to create the final raster: nearest neighbour (fast, keeps original values), bilinear interpolation (smooth) or cubic convolution (smooth, with sharper edges).

$$
RMSE = \sqrt{\frac{\sum (dx^2 + dy^2)}{n}}
$$

As a rule the RMSE should be less than one cell (and preferably under half a cell) of the finished layer.

## Digitising and its errors

- **Undershoot:** a line stops short of the line it should meet, leaving a gap.
- **Overshoot:** a line extends past the line it should meet.
- **Sliver polygons:** thin, false polygons created where two digitised boundaries that should coincide do not match exactly.
- **Duplicate or missing features** and **wrong attribute entry**.
- **Vertex placement error:** points placed carelessly make curved features look angular.

Reduce errors by zooming in, digitising at a constant scale, using **snapping** (vertices jump to existing nodes) and running topology checks for gaps, overlaps and dangles.

## Producing a map layout

A map layout needs a **title**, a **scale bar** (a ratio alone is wrong once the map is resized), a **north arrow**, a **legend** explaining symbols and colours, the **data source and date**, and a **coordinate grid** or neatline. Choose clear colours, readable fonts and a logical visual order.

## Worked examples

:::worked-solution[RMSE of a georeference]
Illustrative residuals (in metres on the ground) after georeferencing a scanned 1:50 000 sheet using five GCPs.

${table(["GCP", "dx (m)", "dy (m)", "dx²", "dy²", "dx² + dy²"], rows)}

1. Sum of $(dx^2 + dy^2)$ $= ${dpStr(ss, 2)}$.
2. Divide by the number of GCPs: $${dpStr(ss, 2)} \div 5 = ${dpStr(ss / 5, 3)}$.
3. Square root: $RMSE = \sqrt{${dpStr(ss / 5, 3)}} = ${dpStr(rm, 2)}$ m.
4. Evaluation: an RMSE of about ${dpStr(rm, 1)} m is far smaller than the 25 m positional error that a 0.5 mm line represents on a 1:50 000 map, so the fit is good. GCP 3 has the largest residual and would be checked first if the RMSE were too high.
:::

:::worked-solution[Cells in a raster]
A raster covers a study area with 500 rows and 800 columns of 30 m cells.

1. Number of cells $= 500 \times 800 = ${fmt(cells)}$.
2. Area of one cell $= 30 \times 30 = 900$ m².
3. Total area $= ${fmt(cells)} \times 900 = 360\,000\,000$ m² $= ${dpStr(areaKm2, 0)}$ km².
4. If the cell size were reduced to 10 m for the same area, the number of cells would rise to $360\,000\,000 \div 100 = ${fmt(cells10)}$, nine times as many, with much larger files.
:::

:::example{title="Choosing the data model"}
A district council needs (a) the locations and capacity of its water points, (b) the boundaries of its wards, and (c) a surface showing the slope of the land to plan pipelines. Water points are **point** vectors with attributes such as capacity; ward boundaries are **polygon** vectors; slope is a continuous surface and is best held as a **raster** derived from an elevation model.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Vector and raster models, georeferencing, RMSE and digitising errors are ZIMSEC Form 5 GIS content. Cambridge candidates should know that GIS stores data in layers, but the detail here is not required.
:::

## Common mistakes

:::mistake{title="Calling RMSE an average"}
The RMSE is not the mean of the residuals: it squares them first, which gives larger errors more weight. Show the squares in the working.
:::

:::mistake{title="Choosing raster for features with sharp boundaries"}
Roads and property boundaries are better stored as vectors. Rasters give stair-step edges unless the cells are very small.
:::

:::mistake{title="Clustering GCPs in one corner"}
GCPs must be spread over the whole map, otherwise the transformation is poor away from the points.
:::

## Exam tips

:::exam-tip
In RMSE questions show the squares, the sum, the division by $n$ and the square root, with units. For *choose* questions name the data type, give the model and justify with accuracy, file size and analysis needs. For digitising errors, *name* the error, *describe* how it appears and *state* how snapping or topology checks prevent it.
:::

## Summary

:::summary
- Vector data store points, lines and polygons with attributes; raster data store a grid of cell values.
- Use vector for discrete features and exact boundaries, raster for continuous surfaces and images.
- Georeferencing uses well-spread ground control points; check residuals and compute the RMSE.
- RMSE is the square root of the mean of the squared residuals ($dx^2 + dy^2$).
- Digitising errors include undershoots, overshoots and sliver polygons; snapping and topology checks reduce them.
- A map layout needs a title, scale bar, north arrow, legend and source.
:::
`;

writeLesson("gis", "data-models-georeferencing", { title: "Vector and raster models, georeferencing and digitising", summary: "Compare vector and raster data models, georeference a scanned map with ground control points and calculate the RMSE, identify digitising errors and plan a map layout.", minutes: 40 }, body);
