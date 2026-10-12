import { t, table, idw, moransI, gearysC, mean, sum, dpStr, chk } from "../lib.mjs";
import { writeLesson } from "./w1a-_write.mjs";

const mt = (x, dp) => dpStr(x, dp).replace("−", "-");
// IDW: four rain gauges (x km, y km, mm), estimate at (5, 5)
const G = [[2, 3, 640], [8, 2, 590], [5, 9, 710], [9, 8, 660]];
const est = idw(G, 5, 5);
const wRows = G.map((g, i) => [`G${i + 1}`, `(${g[0]}, ${g[1]})`, g[2], dpStr(est.weights[i].d ** 2, 0), dpStr(est.weights[i].w, 5), dpStr(est.weights[i].w * g[2], 2)]);
const sw = sum(est.weights.map((w) => w.w));
const swv = sum(est.weights.map((w) => w.w * w.v));

// Linear interpolation: temperature between two stations
// Moran's I and Geary's C: 2 x 3 grid of districts, rook contiguity
const names = ["A", "B", "C", "D", "E", "F"];
const X = [3.0, 2.8, 1.4, 2.6, 2.9, 1.2];
const pairs = [[0, 1], [1, 2], [3, 4], [4, 5], [0, 3], [1, 4], [2, 5]];
const Wm = names.map(() => names.map(() => 0));
for (const [i, j] of pairs) { Wm[i][j] = 1; Wm[j][i] = 1; }
const mi = moransI(X, Wm);
const gc = gearysC(X, Wm);
const m = mean(X);
const den = sum(X.map((x) => (x - m) ** 2));
const pairRows = pairs.map(([i, j]) => [`${names[i]}-${names[j]}`, dpStr((X[i] - m) * (X[j] - m), 4), dpStr((X[i] - X[j]) ** 2, 2)]);
const sumProd = sum(pairs.map(([i, j]) => (X[i] - m) * (X[j] - m)));
const sumSq = sum(pairs.map(([i, j]) => (X[i] - X[j]) ** 2));
chk(mi.I, (6 / 14) * ((2 * sumProd) / den), 1e-9);
chk(gc.C, (5 / 28) * ((2 * sumSq) / den), 1e-9);
console.log({ est: est.estimate, sw, swv, I: mi.I, C: gc.C, exp: mi.expected, m, den, sumProd, sumSq });

const body = t`
## Introduction

Rainfall is measured at gauges, soil samples are taken at chosen points and census data are counted for districts. Yet we often need a value at a place where nothing was measured, and we need to know whether similar values are bunched together on the map. **Spatial interpolation** estimates values between sample points; **spatial autocorrelation** describes whether nearby places have similar values. Both are used with GIS software in ZIMSEC Form 6 and in Paper 3.

Before this lesson you should know how to calculate means and standard deviations and how to measure distances on a grid (see the lessons on descriptive statistics and coordinates).

## Key definitions

:::definition{term="Spatial interpolation"}
Estimating the value of a variable at an unsampled location from values measured at nearby sample points.
:::

:::definition{term="Inverse distance weighting (IDW)"}
An interpolation method in which each sample point's influence falls as its distance from the target point rises; weights are $1/d^p$, usually with the power $p = 2$.
:::

:::definition{term="Spatial autocorrelation"}
The degree to which values at nearby locations are similar (positive), dissimilar (negative) or unrelated (none). It reflects Tobler's idea that near things are more related than distant things.
:::

:::definition{term="Moran's I and Geary's C"}
Indices of spatial autocorrelation calculated from the values in each area and a table of weights that shows which areas are neighbours.
:::

## Ways to interpolate

- **Nearest neighbour (nearest sample):** give the unknown point the value of the closest sample. Simple, but it produces abrupt steps.
- **Linear interpolation:** along a line between two sample points, the value changes in proportion to distance. If a station 10 km away records 24 °C and another 30 km away on the same line records 20 °C, a point 20 km from the first (two-thirds of the way) is estimated at $24 - \tfrac{2}{3} \times 4 = 21.3$ °C.
- **Inverse distance weighting:** an average of all (or the nearest few) samples in which close samples count for more.

IDW assumes that values change smoothly and that the sample is well spread. It cannot predict values higher than the highest or lower than the lowest sample, so it will miss a peak that lies between the gauges. Few points, clusters of points and barriers such as mountain ranges all reduce accuracy.

## Inverse distance weighting, step by step

$$
\hat{z} = \frac{\sum z_i / d_i^2}{\sum 1 / d_i^2}
$$

1. Measure the distance $d_i$ from the target to each sample.
2. Calculate the weight $1/d_i^2$ for each.
3. Multiply each weight by its value, add those products, and divide by the sum of the weights.

## Spatial autocorrelation

Create a **weights table**: $w_{ij} = 1$ if areas $i$ and $j$ share a border (contiguity) and 0 otherwise (an area is never its own neighbour). For $N$ areas with values $x$, mean $\bar{x}$ and $W$ the sum of all weights:

$$
I = \frac{N}{W} \cdot \frac{\sum_i \sum_j w_{ij}(x_i - \bar{x})(x_j - \bar{x})}{\sum_i (x_i - \bar{x})^2}
\qquad
C = \frac{N - 1}{2W} \cdot \frac{\sum_i \sum_j w_{ij}(x_i - x_j)^2}{\sum_i (x_i - \bar{x})^2}
$$

| Index | No autocorrelation (random) | Clustered (similar values together) | Dispersed (alternating values) |
|---|---|---|---|
| Moran's I | About $-1/(N-1)$, near 0 | Positive, towards +1 | Negative, towards −1 |
| Geary's C | About 1 | Below 1 | Above 1 |

:::keyfact{title="Reading the indices"}
Moran's I behaves like a correlation coefficient and Geary's C is its inverse partner: C below 1 corresponds to positive autocorrelation. Both use the same weights table. Formal tests of significance exist, but at this level you describe the pattern in words and say the sample is small.
:::

## Worked examples

:::worked-solution[IDW rainfall estimate]
Illustrative data: four rain gauges with positions (km east, km north) and seasonal rainfall. Estimate the rainfall at the point (5, 5) using power 2.

${table(["Gauge", "Position", "Rainfall (mm)", "d²", "Weight 1/d²", "Weight × rainfall"], wRows)}

1. Sum of weights $= ${dpStr(sw, 5)}$.
2. Sum of weight × rainfall $= ${dpStr(swv, 2)}$.
3. Estimate $= ${dpStr(swv, 2)} \div ${dpStr(sw, 5)} = ${dpStr(est.estimate, 0)}$ mm.
4. The nearest gauge is G1 (${dpStr(Math.sqrt(13), 2)} km away) and it has the largest weight, followed by G3 (4 km). The estimate lies inside the range 590 mm to 710 mm, as IDW always does.
:::

:::worked-solution[Moran's I and Geary's C for six districts]
Illustrative maize yield (t/ha) in six districts arranged in two rows of three, neighbours sharing a border (A-B, B-C, D-E, E-F, A-D, B-E, C-F):

${table(["", "Column 1", "Column 2", "Column 3"], [["Row 1", `A ${dpStr(X[0], 1)}`, `B ${dpStr(X[1], 1)}`, `C ${dpStr(X[2], 1)}`], ["Row 2", `D ${dpStr(X[3], 1)}`, `E ${dpStr(X[4], 1)}`, `F ${dpStr(X[5], 1)}`]])}

1. There are 7 neighbouring pairs, so $W = 14$ (each pair counts in both directions). $N = 6$.
2. Mean $\bar{x} = ${dpStr(m, 4)}$. $\sum (x - \bar{x})^2 = ${dpStr(den, 4)}$.
3. For each pair calculate $(x_i - \bar{x})(x_j - \bar{x})$ and $(x_i - x_j)^2$:

${table(["Pair", "(xi − mean)(xj − mean)", "(xi − xj)²"], pairRows)}

4. Sums over pairs: ${dpStr(sumProd, 4)} and ${dpStr(sumSq, 2)}. Over all ordered pairs each is doubled.
5. $I = \dfrac{6}{14} \times \dfrac{2 \times ${dpStr(sumProd, 4)}}{${dpStr(den, 4)}} = ${mt(mi.I, 3)}$. The expected value for no pattern is $-1/5 = ${mt(mi.expected, 2)}$.
6. $C = \dfrac{5}{28} \times \dfrac{2 \times ${dpStr(sumSq, 2)}}{${dpStr(den, 4)}} = ${mt(gc.C, 3)}$.
7. Interpretation: $I$ is clearly positive, well above the ${mt(mi.expected, 2)} expected for a random pattern, and $C$ is below 1, so there is positive spatial autocorrelation. The high-yield districts (A, B, D, E) sit together in the west and the two low-yield districts (C, F) lie together in the east: the pattern is clustered. With six areas this is only a description of a small sample.
:::

## Using the results in geography

A clustered pattern invites explanations that act over areas: soils, climate, a river, an irrigation scheme or a market. A dispersed pattern suggests competition or deliberate spacing, such as services located apart from one another. A random pattern suggests no spatial process. Autocorrelation also matters for sampling: many statistical tests assume independent observations, so strongly autocorrelated data reduce the effective sample size.

:::keyfact{title="ZIMSEC and Cambridge"}
Interpolation, IDW, Moran's I and Geary's C are ZIMSEC Form 6 and Paper 3 content (formulae are given). Cambridge does not set these methods.
:::

## Common mistakes

:::mistake{title="Wrong direction for Geary's C"}
Geary's C below 1 means positive autocorrelation (clustering), the opposite direction from Moran's I below zero. Learn the pairing: I positive and C low go together.
:::

:::mistake{title="Forgetting that W counts both directions"}
In the weights table $w_{ij}$ and $w_{ji}$ are both 1 for neighbours, so $W$ is twice the number of neighbouring pairs.
:::

:::mistake{title="Using distance instead of squared distance"}
In IDW with power 2 the weight is $1/d^2$. Using $1/d$ changes the estimate and is a different (power 1) method.
:::

## Exam tips

:::exam-tip
Present IDW in a table with distance, weight and weight × value columns, and finish with a sentence about accuracy. For Moran's I and Geary's C, state $N$ and $W$, show each sum, give the index to the requested decimal places, compare it with the value for no autocorrelation and describe the pattern (clustered, random or dispersed) in the context of the map. *Evaluate* interpolation by considering the number and spread of samples and barriers.
:::

## Summary

:::summary
- Interpolation estimates values between samples: nearest neighbour, linear and IDW.
- IDW weights each sample by $1/d^2$; estimates always lie within the range of the samples.
- Spatial autocorrelation compares each area with its neighbours using a weights table.
- Moran's I: positive means clustered, near $-1/(N-1)$ random, negative dispersed; Geary's C below 1 means clustered, above 1 dispersed.
- Small samples and the choice of neighbours limit how far the results can be trusted.
:::
`;

writeLesson("stats", "spatial-analysis", { title: "Spatial interpolation and spatial autocorrelation", summary: "Estimate values between sample points with nearest-neighbour, linear and inverse distance weighting, and describe the spatial pattern of values with Moran's I and Geary's C.", minutes: 40 }, body);
