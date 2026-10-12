// W1a: gis.data-models-georeferencing. Illustrative data; numbers computed in code.
import { concept, P, t, chk, table, rmse, sum, dpStr, geographyLevels } from "../lib.mjs";

const tab = (h, r) => table(h, r);
const R4 = [[1.0, 2.0], [-2.0, 1.0], [1.5, -1.5], [-0.5, -1.0]];
const rm4 = rmse(R4);
const R6 = [[2.4, -1.7], [-0.2, 2.0], [1.3, 0.4], [-2.7, -1.3], [0.3, 2.3], [-1.6, -0.2]];
const rm6 = rmse(R6);
const res6 = R6.map(([dx, dy]) => Math.hypot(dx, dy));
const maxI = res6.indexOf(Math.max(...res6));
chk(maxI, 3);
const ss6 = sum(R6.map(([dx, dy]) => dx * dx + dy * dy));
const area = (250 * 400 * 50 * 50) / 1e6;
chk(area, 250, 1e-9);

concept("ageo.gis.data-models-georeferencing", { file: "gis/data-models-georeferencing", keyPrefix: "gis.data-models-georeferencing" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which data model stores features as points, lines and polygons?",
    options: [
      ["Vector", "Correct: vector features are built from coordinates."],
      ["Raster", "Raster data are grids of cells."],
      ["Contour", "A contour is a type of line, not a data model."],
      ["Tabular", "Tabular data are rows and columns without geometry."],
    ],
    answer: "A",
    explanation: "The vector model stores discrete features as points, lines and polygons, each linked to an attribute table.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Which data are best stored as a raster?",
    options: [
      ["A digital elevation model", "Correct: elevation is a continuous surface."],
      ["The positions of clinics in a district", "Clinics are points, best stored as vectors."],
      ["The boundaries of resettlement farms", "Boundaries are polygons, best stored as vectors."],
      ["The route of the Harare to Mutare road", "Roads are lines, best stored as vectors."],
    ],
    answer: "A",
    explanation: "Continuous surfaces such as elevation and temperature, and images, are stored as rasters.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In digitising, what is an undershoot?",
    options: [
      ["A line that stops short of the line it should meet", "Correct: this leaves a gap in the network."],
      ["A line that extends beyond the line it should meet", "That is an overshoot."],
      ["A thin false polygon between two boundaries", "That is a sliver polygon."],
      ["A point placed in the wrong layer of the file", "This is a different kind of mistake."],
    ],
    answer: "A",
    explanation: "An undershoot is a gap where a line fails to reach the feature it should connect to.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which resampling method should be used on a land-cover raster in which each cell value is a class number such as 3 (forest) or 5 (water)?",
    options: [
      ["Nearest neighbour", "Correct: it copies original class values without blending."],
      ["Bilinear interpolation", "It averages neighbouring cells, creating meaningless class numbers."],
      ["Cubic convolution", "It also blends values, producing invalid classes."],
      ["Any method, because class numbers are identical", "Blending creates values such as 4 that are not real classes."],
    ],
    answer: "A",
    explanation: "Averaging class numbers (for example forest 3 and water 5 gives 4) is meaningless, so nearest neighbour is used for categorical rasters.",
    hints: ["Which method keeps the original cell values?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "When georeferencing a scanned map, why should ground control points be spread over the whole map?",
    options: [
      ["Clustered points give a poor fit elsewhere", "Correct: the transformation is poorest away from the control points."],
      ["The software refuses to run if the points are close together", "Software will run but give a poor result."],
      ["Control points must always be at the corners of grid squares", "Points need only be identifiable on both map and reference."],
      ["More points always reduce the RMSE to zero", "Residuals remain; RMSE is rarely zero."],
    ],
    answer: "A",
    explanation: "A transformation fitted to clustered points can be badly wrong in areas without points, so GCPs should cover the map, including near the edges.",
    hints: ["Where is the transformation checked?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "The cell size of a raster is halved for the same study area. What happens to the number of cells?",
    options: [
      ["It increases four times", "Correct: each cell is replaced by 2 × 2 smaller cells."],
      ["It doubles", "Halving the side length quarters the area of a cell, so 4 times as many cells fit."],
      ["It stays the same", "A smaller cell size means more cells for the same area."],
      ["It increases eight times", "Eight times would be for three dimensions; a raster is two-dimensional."],
    ],
    answer: "A",
    explanation: "Cell area falls to a quarter, so four times as many cells are needed; file size rises accordingly.",
    hints: ["Think of area, not length."],
  });

  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`After georeferencing, four ground control points have residuals (dx, dy), in metres, of ${R4.map((r) => `(${dpStr(r[0], 1)}, ${dpStr(r[1], 1)})`).join(", ")}. Calculate the RMSE, in metres, to two decimal places, using $RMSE = \sqrt{\sum (dx^2 + dy^2) \div n}$.`,
    value: rm4, dp: 2, unit: "m",
    wrong: [Math.sqrt(15.75), 3.94],
    explanation: t`1. $dx^2 + dy^2$ for each point: 5, 5, 4.5, 1.25.\n2. Sum $= 15.75$.\n3. Divide by $n = 4$: $3.9375$.\n4. Square root: $${dpStr(rm4, 2)}$ m.\n5. Forgetting to divide by n gives 3.97; forgetting the square root gives 3.94.`,
    hints: ["Square both dx and dy for every point.", "Divide by the number of points before the square root."],
  });
  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: "A raster of land cover has 250 rows and 400 columns, and each cell is 50 m by 50 m. Calculate the area it covers, in km².",
    value: area, unit: "km²",
    wrong: [100000, 25],
    explanation: "Cells = 250 × 400 = 100 000. Each cell = 2 500 m². Total = 250 000 000 m² = 250 km².",
    hints: ["Work out the area of one cell first."],
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "A satellite image covers a strip 12 km wide and has 600 pixels across. What is the ground size of one pixel, in metres?",
    value: 20, unit: "m",
    wrong: [200, 0.02],
    explanation: "12 km = 12 000 m; 12 000 ÷ 600 = 20 m per pixel.",
    hints: ["Convert kilometres to metres first."],
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A raster has a cell size of 30 m. The cell size is changed to 15 m for the same area. By what factor does the number of cells increase?",
    value: 4,
    wrong: [2, 8],
    explanation: "Halving the cell side makes each cell one quarter of the area, so 4 times as many cells are needed.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A root mean square error of zero can easily be achieved in georeferencing.",
    answer: false,
    explanation: "False. Small errors in picking points and distortion in paper maps mean residuals are never exactly zero; the aim is an RMSE smaller than a cell.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 4,
    stem: "Explain one advantage and one disadvantage of storing a land-cover map as a raster.",
    points: ["Advantage: matches satellite images, and layers can be overlaid and combined simply (map algebra)", "Explained: every cell has the same size and a single value, so calculations are fast and easy", "Disadvantage: file sizes become very large as the cell size is reduced", "Explained: boundaries have stair-step edges and mixed cells hide detail smaller than a cell"],
    modelAnswer: "A raster matches satellite images and layers can be overlaid and combined easily, because every cell has the same size and a single value. However, file sizes become very large as the cell size falls, and boundaries have stair-step edges while mixed cells hide detail smaller than a cell.",
    explanation: "One advantage and one disadvantage, each explained.",
    hints: ["Think of how cells are arranged and what happens when they are made smaller."],
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each digitising error to its description.",
    pairs: [
      ["Undershoot", "A line stops short of the line it should meet"],
      ["Overshoot", "A line extends beyond the line it should meet"],
      ["Sliver polygon", "A thin false polygon where two boundaries do not match exactly"],
      ["Duplicate feature", "The same feature is digitised twice"],
    ],
    explanation: "Topology checks and snapping help to find and prevent these errors.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statement.",
    template: "Georeferencing uses {{blank:a}} control points, and the {{blank:b}} summarises how well the layer fits them.",
    blanks: [
      { id: "a", accepted: ["ground"], choices: ["ground", "contour", "attribute"] },
      { id: "b", accepted: ["RMSE"], choices: ["RMSE", "legend", "scale bar"] },
    ],
    explanation: "Ground control points tie the scan to the real world; the RMSE measures the fit.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What name is given to a GIS setting that makes digitised vertices jump to existing nodes or lines, reducing gaps and overlaps?",
    accepted: ["snapping", "snap", "snapping tool"],
    wrong: ["resampling", "buffering"],
    explanation: "**Snapping** automatically joins new vertices to existing ones.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe the main steps in georeferencing a scanned map.",
    points: ["Select ground control points that can be identified on both the scan and a reference, spread over the map", "Enter the real-world coordinates and apply a transformation", "Check the residuals and RMSE, remove or correct poor points, then resample/save the layer"],
    modelAnswer: "Select well-spread ground control points that can be identified on both the scan and the reference, enter their real-world coordinates and apply a transformation. Then check the residuals and RMSE, correct or remove poorly fitting points and resample and save the georeferenced layer.",
    explanation: "Control points, transformation, checking and output.",
    hints: ["Start with the points and end with the check."],
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 3,
    stem: "Explain why a vector layer is better than a raster layer for the boundaries of farms.",
    points: ["Farm boundaries are discrete features with sharp edges", "Vectors store exact boundary coordinates, whereas a raster gives stair-step edges", "Vectors hold attributes (owner, size, crop) for each farm and give accurate area and length"],
    modelAnswer: "Farm boundaries are discrete features with sharp edges. A vector layer stores their exact coordinates, while a raster would give stair-step edges unless the cells were very small, and each polygon can hold attributes such as owner, size and crop.",
    explanation: "Sharp boundaries, accuracy and attributes.",
    hints: ["Think about how each model draws an edge."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "A scanned map has an RMSE of 22 m when the raster cell size is 10 m. Suggest two ways of reducing the RMSE.",
    points: ["Check and replace the GCPs with the largest residuals (they may be mis-identified)", "Add more GCPs, spread around the map, including the edges", "Use a more appropriate transformation (for example second-order if the paper is distorted)", "Use a higher-resolution scan or a more accurate reference for the coordinates"],
    modelAnswer: "Check the control points with the largest residuals and correct or replace them, since they may have been mis-identified. Add more points spread around the map, including near the edges, or use a different transformation if the paper is distorted.",
    explanation: "Any two valid improvements, each explained.",
    hints: ["Which points contribute most to the error?"],
  });

  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`A student georeferences a scanned map with six ground control points. The residuals (dx, dy), in metres, are shown below. The finished raster has 10 m cells (illustrative data).\n\n${tab(["GCP", "1", "2", "3", "4", "5", "6"], [["dx (m)", ...R6.map((r) => dpStr(r[0], 1))], ["dy (m)", ...R6.map((r) => dpStr(r[1], 1))]])}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Which GCP has the largest residual (combined error)? Give its number.", value: maxI + 1, wrong: [1], explanation: t`The combined errors $\sqrt{dx^2 + dy^2}$ are ${res6.map((r) => dpStr(r, 2)).join(", ")}; the largest is GCP 4.` }),
      P.num({ label: "(b)", marks: 4, type: "CALCULATION", stem: "Calculate the RMSE, in metres, to two decimal places.", value: rm6, dp: 2, unit: "m", wrong: [Math.sqrt(ss6)], explanation: t`1. Sum of $dx^2 + dy^2 = ${dpStr(ss6, 2)}$.\n2. Divide by 6: ${dpStr(ss6 / 6, 3)}.\n3. Square root: ${dpStr(rm6, 2)} m.\n4. Forgetting to divide by n gives ${dpStr(Math.sqrt(ss6), 2)}.` }),
      P.manual({ label: "(c)", marks: 2, stem: "State whether the RMSE is acceptable for a 10 m cell raster and give a reason.", points: ["Yes: the RMSE (about 2 m) is less than one cell (10 m), and even less than half a cell", "So the layer is positioned to well within the cell size"], modelAnswer: "Yes. The RMSE of about 2 m is smaller than half of a 10 m cell, so the layer is positioned well within the cell size." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest two ways to reduce the RMSE further.", points: ["Re-check or replace GCP 4, which has the largest error", "Add more control points spread over the map / use a better transformation"], modelAnswer: "Re-check or replace GCP 4, which has the largest error, and add more control points spread over the map." }),
      P.manual({ label: "(e)", marks: 3, stem: "Explain why the GCPs should be spread over the whole map and not clustered in one corner.", points: ["The transformation is fitted to the points used", "Areas far from the points are not controlled, so errors there are larger", "A spread of points also shows any stretching or distortion of the paper"], modelAnswer: "The transformation is fitted to the control points, so areas far from them are not controlled and errors there are larger. A good spread also reveals any stretching or distortion of the paper." }),
    ],
    explanation: "Residuals, RMSE calculation, evaluation against cell size and improvements.",
    hints: ["RMSE = square root of the mean of dx² + dy²."],
  });
  b.struct({
    d: 3, skill: "UNDERSTANDING",
    stem: "A council GIS officer must decide how to store four datasets (data invented for this exercise).",
    parts: [
      P.match({ label: "(a)", marks: 4, stem: "Match each dataset to the most suitable data model.", pairs: [["Locations of 120 boreholes", "Vector points"], ["The route of a pipeline", "Vector line"], ["Boundaries of wards", "Vector polygons"], ["Satellite image of the district", "Raster"]], explanation: "Discrete features suit vectors; images suit rasters." }),
      P.manual({ label: "(b)", marks: 2, stem: "State two disadvantages of storing a land-cover map as a raster with very small cells.", points: ["Very large file size / slow to process", "Many cells have the same value so storage is inefficient (or stair-step edges remain visible)"], modelAnswer: "The file size becomes very large and slow to process, and many neighbouring cells hold the same value, so storage is inefficient." }),
      P.manual({ label: "(c)", marks: 2, stem: "Describe one digitising error and how it can be prevented.", points: ["Name and describe an error (undershoot, overshoot, sliver polygon, duplicate)", "Prevention: snapping, zooming in, or topology rules/checks"], modelAnswer: "Undershoots leave gaps where a line stops short of another. Using snapping, so vertices jump to existing nodes, and running topology checks prevents them." }),
    ],
    explanation: "Match features to models and consider storage and digitising quality.",
    hints: ["Discrete features or continuous surface?"],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the advantages and disadvantages of vector and raster data models for a GIS used to plan water supply in a district. [8]",
    points: [
      "Vector: exact boundaries, points and lines for boreholes, pipes and wards",
      "Vector: attributes such as capacity, owner and condition can be linked to each feature",
      "Vector: network analysis (shortest routes, service areas) is possible",
      "Vector: poorer for continuous surfaces such as rainfall or slope",
      "Raster: good for continuous surfaces, elevation, rainfall and satellite imagery",
      "Raster: map algebra and overlays are simple and fast",
      "Raster: large files at fine resolution, and stair-step edges for boundaries",
      "Judgement: use both; vectors for infrastructure and boundaries, rasters for terrain and rainfall, combined in a single GIS",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Vectors suit water supply planning because boreholes, pipes and ward boundaries are discrete features that need exact positions, attributes such as capacity and condition, and network analysis of routes. They are less suited to continuous surfaces such as rainfall or slope. Rasters are good for continuous surfaces and satellite imagery and allow simple overlays, but they give large files at fine resolution and stair-step edges for boundaries. A good GIS would use both: vectors for infrastructure and boundaries, and rasters for terrain and rainfall, combined in one system.",
    wordLimit: { max: 300 },
    explanation: "Strengths and weaknesses of each followed by a judgement.",
    hints: ["Which data are discrete features and which are continuous surfaces?"],
  });

  b.card("DEFINITION", "Vector and raster models?", "Vector: points, lines and polygons with attributes. Raster: a grid of equal cells, each with one value.");
  b.card("CONCEPT", "When is raster better than vector?", "For continuous surfaces (elevation, rainfall) and images; vector is better for discrete features with sharp boundaries.");
  b.card("DEFINITION", "Ground control point (GCP)?", "A feature identifiable on both a scanned map and a reference, with known real-world coordinates, used in georeferencing.");
  b.card("FORMULA", "RMSE of georeferencing?", t`$RMSE = \sqrt{\dfrac{\sum (dx^2 + dy^2)}{n}}$`, "Aim for less than one cell, preferably half a cell.");
  b.card("CONCEPT", "Resampling methods?", "Nearest neighbour (keeps original values; use for classes), bilinear (smooth), cubic convolution (smooth with sharper edges).");
  b.card("CONCEPT", "Three digitising errors?", "Undershoot (gap), overshoot (extends too far), sliver polygon (thin false polygon between boundaries).");
  b.card("CONCEPT", "How do snapping and topology help?", "Snapping joins vertices to existing nodes; topology checks find gaps, overlaps and dangles.");
  b.card("FACT", "Effect of halving raster cell size?", "Four times as many cells for the same area; much larger files.");
  b.card("CONCEPT", "Essential items of a map layout?", "Title, scale bar, north arrow, legend, source and date.");
});
