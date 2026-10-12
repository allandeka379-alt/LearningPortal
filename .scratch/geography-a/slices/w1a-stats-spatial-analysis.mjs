// W1a: stats.spatial-analysis. Illustrative data; all numbers computed with lib helpers.
import { concept, P, t, chk, table, idw, moransI, gearysC, mean, sum, dpStr, geographyLevels } from "../lib.mjs";

const mt = (x, dp) => dpStr(x, dp).replace("−", "-");
const tab = (h, r) => table(h, r);

// four areas in a line P-Q-R-S
const LINE = [9, 7, 4, 2];
const WL = [[0, 1, 0, 0], [1, 0, 1, 0], [0, 1, 0, 1], [0, 0, 1, 0]];
const lineI = moransI(LINE, WL);
const lineC = gearysC(LINE, WL);
chk(lineI.W, 6);
// 2 x 2 checkerboard A B / C D
const CB = [8, 2, 3, 9];
const WC = [[0, 1, 1, 0], [1, 0, 0, 1], [1, 0, 0, 1], [0, 1, 1, 0]];
const cbI = moransI(CB, WC);
const cbC = gearysC(CB, WC);
chk(cbI.W, 8);
// IDW with three gauges
const GS = [[0, 2, 530], [7, 1, 610], [2, 7, 470]];
const gi = idw(GS, 3, 3);
const two = idw([[0, 0, 600], [6, 0, 480]], 2, 0); // samples 2 km and 4 km away
chk(two.estimate, 576, 1e-9);

concept("ageo.stats.spatial-analysis", { file: "stats/spatial-analysis", keyPrefix: "stats.spatial-analysis" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is spatial autocorrelation?",
    options: [
      ["How alike the values at nearby places are", "Correct: it compares each place with its neighbours."],
      ["The error made when a scanned map is digitised on screen", "That is a georeferencing or digitising error."],
      ["The correlation between a variable and time over years", "That is temporal correlation, not spatial."],
      ["The average distance between all the points on a map", "That is related to nearest neighbour analysis."],
    ],
    answer: "A",
    explanation: "Spatial autocorrelation is the tendency for nearby places to have similar (positive) or dissimilar (negative) values.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which interpolation method gives nearer sample points a larger influence on the estimate than distant ones?",
    options: [
      ["Inverse distance weighting", "Correct: the weight falls as 1/d² rises."],
      ["Using the overall mean of all samples", "A plain mean gives every sample equal weight."],
      ["Using the median of all samples", "The median ignores distance altogether."],
      ["Choosing the highest sample value", "This ignores distance and the other samples."],
    ],
    answer: "A",
    explanation: "IDW weights samples by the inverse of distance (squared), so closer points count for more.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A Moran's I value that is clearly above zero for a map of district populations suggests which pattern?",
    options: [
      ["Clustered: similar values lie near each other", "Correct: positive autocorrelation."],
      ["Dispersed: high and low values alternate", "That would give a negative I."],
      ["Random: no relationship between neighbours", "A random pattern gives I close to the small negative expected value."],
      ["Uniform: every district has the same population", "Identical values would make the index undefined, not positive."],
    ],
    answer: "A",
    explanation: "Positive Moran's I means neighbouring areas tend to have similar values: a clustered pattern.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Geary's C for a set of districts is 1.45. What does it indicate?",
    options: [
      ["Negative autocorrelation: neighbours tend to be dissimilar", "Correct: C above 1 means dissimilar neighbours, a dispersed pattern."],
      ["Positive autocorrelation: neighbours tend to be similar", "Positive autocorrelation gives C below 1."],
      ["No autocorrelation, because C is not zero", "The no-pattern value of C is about 1, not 0."],
      ["An error, because C must lie between 0 and 1", "C can exceed 1; it ranges from 0 to about 2."],
    ],
    answer: "A",
    explanation: "Geary's C is about 1 for a random pattern, below 1 for clustering and above 1 for dispersion.",
    hints: ["What value of C corresponds to no pattern?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A mountain peak lies between four rain gauges in the Eastern Highlands, and all four lie in the valleys. Which is the likely weakness of an IDW rainfall map for the peak?",
    options: [
      ["It cannot exceed the highest gauge reading", "Correct: IDW values always lie within the range of the samples."],
      ["It gives the peak a negative rainfall value in dry spells", "IDW averages positive values and cannot give a negative result."],
      ["It ignores all the gauges that are nearer than 10 km", "IDW gives the nearest gauges the largest weights."],
      ["It requires the peak itself to be sampled twice", "Interpolation needs no repeated sampling of the target."],
    ],
    answer: "A",
    explanation: "IDW is a weighted average, so it cannot exceed the highest or fall below the lowest sample, and it misses peaks and troughs between the samples.",
    hints: ["Is a weighted average ever larger than the largest value?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "In a weights table for seven districts, five pairs of districts share a border. What is W, the sum of all the weights?",
    options: [
      ["10", "Correct: each pair is counted in both directions (5 × 2)."],
      ["5", "This counts each pair once; the table has w(i,j) and w(j,i)."],
      ["7", "This is the number of districts, N."],
      ["14", "This would be 2 × 7, which uses the number of districts instead of the pairs."],
    ],
    answer: "A",
    explanation: "W is the sum of all entries of the weights table. Each neighbouring pair gives two entries equal to 1, so W = 5 × 2 = 10.",
    hints: ["Does w(i, j) equal w(j, i)?"],
  });

  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Two rain gauges lie on a straight road. Gauge A, 12 km along the road, recorded 560 mm in a season and Gauge B, 52 km along the road, recorded 440 mm. Use linear interpolation to estimate the rainfall, in mm, at the 22 km point.",
    value: 560 - (10 / 40) * 120, unit: "mm",
    wrong: [500, 450],
    explanation: "The gauges are 40 km apart and the difference is 120 mm. The 22 km point is 10 km from A, so it is 10/40 of the way: 560 − 0.25 × 120 = 530 mm. The simple average, 500 mm, ignores position.",
    hints: ["What fraction of the way from A to B is the point?"],
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Rainfall must be estimated at a point that lies 2 km from Gauge X (600 mm) and 4 km from Gauge Y (480 mm). Use inverse distance weighting with power 2 to estimate rainfall at the point, in mm.`,
    value: two.estimate, unit: "mm",
    wrong: [540, 560],
    explanation: t`1. Weights: $1/2^2 = 0.25$ and $1/4^2 = 0.0625$; sum $= 0.3125$.\n2. Weight × rainfall: $0.25 \times 600 = 150$ and $0.0625 \times 480 = 30$; sum $= 180$.\n3. Estimate $= 180 \div 0.3125 = 576$ mm.\n4. The plain average (540 mm) ignores distance; power 1 would give 560 mm.`,
    hints: ["The weight is 1 divided by distance squared."],
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: t`For a map of 11 districts, what is the expected value of Moran's I if there is no spatial autocorrelation? Use $-1/(N-1)$.`,
    value: -0.1, dp: 1,
    wrong: [0.1, 0.5],
    explanation: t`$-1/(11 - 1) = -1/10 = -0.1$. Using N = 11 in the denominator gives −0.09.`,
    hints: ["N is the number of areas."],
  });
  b.calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: t`Four areas P, Q, R and S lie in a line, each sharing a border only with the next one (P-Q, Q-R and R-S). Their values are ${LINE.join(", ")}. Calculate Moran's I using $I = \dfrac{N}{W}\cdot\dfrac{\sum_i\sum_j w_{ij}(x_i-\bar{x})(x_j-\bar{x})}{\sum_i (x_i-\bar{x})^2}$, to three decimal places.`,
    value: lineI.I, dp: 3,
    wrong: [0.38 * 2, 0.19],
    explanation: t`1. $N = 4$, $W = 6$ (three pairs counted twice); mean $= 5.5$.\n2. Deviations: 3.5, 1.5, −1.5, −3.5; $\sum (x - \bar{x})^2 = 29$.\n3. Products for the pairs: 5.25, −2.25, 5.25; sum $= 8.25$, doubled $= 16.5$.\n4. $I = (4 \div 6) \times (16.5 \div 29) = ${dpStr(lineI.I, 3)}$.\n5. Using W = 3 instead of 6 gives a value twice as large.`,
    hints: ["Find the mean and the deviations first.", "Count each neighbouring pair twice in both W and the numerator."],
  });
  b.num({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: t`For the same four areas (values ${LINE.join(", ")}), calculate Geary's C using $C = \dfrac{N-1}{2W}\cdot\dfrac{\sum_i\sum_j w_{ij}(x_i-x_j)^2}{\sum_i (x_i-\bar{x})^2}$, to three decimal places.`,
    value: lineC.C, dp: 3,
    wrong: [1.17, 0.147],
    explanation: t`1. $(x_i - x_j)^2$ for the pairs: 4, 9, 4; sum $= 17$, doubled $= 34$.\n2. $\sum (x - \bar{x})^2 = 29$; $N - 1 = 3$; $2W = 12$.\n3. $C = (3 \div 12) \times (34 \div 29) = ${dpStr(lineC.C, 3)}$.\n4. C is below 1, which agrees with the positive Moran's I: a clustered pattern.`,
    hints: ["Use the differences between neighbours, not the deviations from the mean."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "An inverse distance weighting estimate can be higher than the largest sample value.",
    answer: false,
    explanation: "False. IDW is a weighted average of the sample values, so it always lies between the smallest and the largest.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why inverse distance weighting uses the square of the distance rather than the distance itself.",
    points: ["Squaring makes the weight fall away very quickly as distance increases", "So nearby samples have a much greater influence than distant ones", "The power can be changed (higher powers give an even more local estimate), which allows the method to be adjusted to the data"],
    modelAnswer: "Using the square of the distance makes the weight fall away very quickly as distance increases, so nearby samples have a much greater influence than distant ones. The power can also be changed, with higher powers giving a more local estimate, so the method can be adjusted to the data.",
    explanation: "Rapid fall of weights with distance and the option to change the power.",
    hints: ["Compare the weights for samples at 1 km and 2 km."],
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each result to the pattern it indicates.",
    pairs: [
      ["Moran's I clearly above zero", "Clustered pattern"],
      ["Moran's I close to −1", "Dispersed pattern"],
      ["Geary's C well below 1", "Clustered pattern (positive autocorrelation)"],
      ["Geary's C well above 1", "Dispersed pattern (negative autocorrelation)"],
    ],
    explanation: "Moran's I and Geary's C run in opposite directions: I positive and C below 1 both mean clustering.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the statement.",
    template: "In inverse distance weighting the weight of a sample is {{blank:a}} divided by its distance {{blank:b}} when the power is 2.",
    blanks: [
      { id: "a", accepted: ["1"], choices: ["1", "the value", "the mean"] },
      { id: "b", accepted: ["squared"], choices: ["squared", "cubed", "rounded"] },
    ],
    explanation: "The weight is 1/d².",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What name is given to the table that shows which areas are neighbours when calculating Moran's I?",
    accepted: ["weights table", "weights matrix", "spatial weights matrix", "weight matrix", "weights"],
    wrong: ["contingency table", "frequency table"],
    explanation: "The **weights table** (matrix) uses 1 for neighbours and 0 otherwise.",
  });

  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "State and explain two limitations of using inverse distance weighting to map rainfall.",
    points: ["Cannot estimate values higher than the highest or lower than the lowest gauge (misses peaks and troughs)", "Ignores factors such as altitude, relief and wind direction that affect rainfall", "Accuracy falls where gauges are few or unevenly spread/clustered (1 mark for any additional valid limitation with explanation)"],
    modelAnswer: "IDW is a weighted average, so it cannot estimate rainfall above the highest gauge or below the lowest and it misses peaks between gauges. It also ignores relief and wind direction, which strongly affect rainfall, and it is less accurate where gauges are few or clustered.",
    explanation: "Two limitations with an explanation each; the third mark is for developing either.",
    hints: ["Think about what the method does not take into account."],
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 3,
    stem: "A map of income levels in 30 wards gives a Moran's I of +0.62. Describe what this shows and suggest a reason.",
    points: ["Positive spatial autocorrelation / clustered pattern", "Wards with similar incomes lie close to each other (high next to high, low next to low)", "Suggested reason: similar housing, services, employment or land use in neighbouring wards (any valid reason)"],
    modelAnswer: "The positive value shows a clustered pattern: wards with similar income levels lie next to each other, high-income wards beside high-income wards and low-income wards beside low-income ones. This may be because neighbouring wards share housing type, services and access to employment.",
    explanation: "State the pattern, say what it means on the map, and give a reason.",
    hints: ["Positive Moran's I means neighbours are alike."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Suggest how a meteorological service could improve the accuracy of an interpolated rainfall map of Zimbabwe.",
    points: ["Install more gauges, especially in areas with few (the Zambezi valley or the highlands)", "Place gauges across a range of altitudes and aspects", "Combine gauge data with satellite rainfall estimates or radar", "Use a method that takes account of relief, such as regression with altitude or kriging, and check the estimates against gauges not used in the map"],
    modelAnswer: "More gauges could be installed where there are few, including at different altitudes. Gauge data could be combined with satellite rainfall estimates, and a method that takes account of relief could be used, with the estimates checked against gauges left out of the interpolation.",
    explanation: "Four distinct, valid improvements.",
    hints: ["Think of data sources as well as methods."],
  });

  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`A catchment manager needs a seasonal rainfall estimate for a point at (3, 3), where positions are in km east and north of a corner. Three gauges recorded the following (illustrative data).\n\n${tab(["Gauge", "Position (x, y)", "Rainfall (mm)"], GS.map((g, i) => [`G${i + 1}`, `(${g[0]}, ${g[1]})`, g[2]]))}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the distance from G1 to the point, in km, to two decimal places.", value: Math.sqrt(10), dp: 2, unit: "km", wrong: [10], explanation: "d² = 3² + 1² = 10, so d = √10 = 3.16 km. Leaving the square root out gives 10." }),
      P.num({ label: "(b)", marks: 4, type: "CALCULATION", stem: "Use inverse distance weighting with power 2 to estimate the rainfall at the point, in mm, to the nearest whole number.", value: gi.estimate, dp: 0, unit: "mm", wrong: [mean(GS.map((g) => g[2]))], explanation: t`1. Distances squared: ${gi.weights.map((w) => dpStr(w.d ** 2, 0)).join(", ")}.\n2. Weights 1/d²: ${gi.weights.map((w) => dpStr(w.w, 5)).join(", ")}; sum $= ${dpStr(sum(gi.weights.map((w) => w.w)), 5)}$.\n3. Weight × rainfall sum $= ${dpStr(sum(gi.weights.map((w) => w.w * w.v)), 2)}$.\n4. Estimate $= ${dpStr(gi.estimate, 0)}$ mm. The simple mean of the gauges is ${dpStr(mean(GS.map((g) => g[2])), 0)} mm.` }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which statement about the estimate is correct?", options: [["It must lie between 470 mm and 610 mm", "Correct: IDW is a weighted average of the gauge values."], ["It must be higher than 610 mm", "A weighted average cannot exceed the highest value."], ["It must equal the mean of the three gauges", "Distance weighting makes it differ from the plain mean."], ["It must equal the value of the nearest gauge", "Other gauges also contribute."]], answer: "A", explanation: "A weighted average always lies in the range of the values averaged." }),
      P.manual({ label: "(d)", marks: 2, stem: "Give two reasons why the estimate may differ from the true rainfall at the point.", points: ["Only three gauges, widely spaced, so the sample is small", "Relief, wind direction or local storms (convective rain) cause variations that distance alone does not account for"], modelAnswer: "There are only three gauges, which are widely spaced, and rainfall at the point may be affected by relief or local storms that IDW does not take into account." }),
      P.manual({ label: "(e)", marks: 2, stem: "Suggest how the estimate could be improved.", points: ["Use more gauges, especially close to the point", "Compare with other interpolation methods or satellite data, or check against an independent gauge"], modelAnswer: "Add gauges close to the point and check the estimate against an independent gauge or satellite rainfall data." }),
      P.manual({ label: "(f)", marks: 2, stem: "Compare IDW with simply giving the point the value of the nearest gauge.", points: ["Nearest gauge uses one sample only and ignores the other gauges; IDW uses all samples", "IDW gives a smoother, gradual change across the map, while the nearest-gauge method creates abrupt steps at boundaries"], modelAnswer: "The nearest-gauge method uses only one sample and produces abrupt changes at boundaries, whereas IDW uses all the gauges, weighted by distance, and gives a smoother surface." }),
    ],
    explanation: "Distances, inverse-square weights, a weighted average, a range check and an evaluation of the method.",
    hints: ["Weight = 1 ÷ distance squared."],
  });
  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`Four adjacent districts form a 2 × 2 block; each shares a border with the districts next to it horizontally and vertically but not diagonally. The percentage of households with a borehole is ${tab(["", "West", "East"], [["North", `A ${CB[0]}`, `B ${CB[1]}`], ["South", `C ${CB[2]}`, `D ${CB[3]}`]])} (illustrative data).`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "State W, the sum of the weights, for this block.", value: 8, wrong: [4], explanation: "The neighbouring pairs are A-B, C-D, A-C and B-D, four pairs; each is counted twice, so W = 8." }),
      P.num({ label: "(b)", marks: 3, type: "CALCULATION", stem: "Calculate Moran's I to two decimal places.", value: cbI.I, dp: 2, wrong: [-0.49], explanation: t`1. Mean $= 5.5$; deviations $2.5, -3.5, -2.5, 3.5$; $\sum (x - \bar{x})^2 = 37$.\n2. Products for pairs: −8.75, −8.75, −6.25, −12.25; sum $= -36$, doubled $= -72$.\n3. $I = (4 \div 8) \times (-72 \div 37) = ${mt(cbI.I, 2)}$.` }),
      P.manual({ label: "(c)", marks: 2, stem: "Compare the value with the expected value for no pattern, −0.33 (that is, −1/(N − 1)), and describe the pattern.", points: ["I is far below the expected value, close to −1", "Negative autocorrelation: neighbouring districts have dissimilar values (high next to low): a dispersed pattern"], modelAnswer: "I (about −0.97) is far below the expected −0.33 and close to −1, so there is strong negative autocorrelation: districts with high and low borehole coverage alternate, a dispersed pattern." }),
      P.manual({ label: "(d)", marks: 2, stem: "Geary's C for these data is 1.48. State what this shows and say whether it agrees with Moran's I.", points: ["C is above 1, showing negative autocorrelation / dissimilar neighbours", "Agrees with Moran's I (negative), which also shows a dispersed pattern"], modelAnswer: "C is above 1, so neighbours are dissimilar (negative autocorrelation). This agrees with the negative Moran's I: the pattern is dispersed." }),
    ],
    explanation: "W from the pairs, Moran's I from the deviations, and interpretation against the expected value.",
    hints: ["List the neighbouring pairs first.", "Moran's I below the expected value means dissimilar neighbours."],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 8,
    stem: "Evaluate the usefulness of Moran's I for describing the pattern of poverty across the districts of a country. [8]",
    points: [
      "Gives a single objective number for the degree of clustering, instead of judging from the map by eye",
      "Allows different years or indicators to be compared on the same scale",
      "Sign shows clustering or dispersion; size shows strength",
      "Depends on how neighbours are defined in the weights table (contiguity, distance) and on district boundaries (the modifiable area unit problem)",
      "Does not show where the clusters are (a global index) or the reasons for them",
      "Small numbers of areas or unequal area sizes limit reliability",
      "Needs a significance test or comparison with the expected value to be sure the pattern is not chance",
      "Judgement: useful as a summary measure for policy but must be combined with maps of local clusters and with explanations (access, climate, land, services)",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Moran's I gives one objective number for the degree of clustering, so poverty patterns in different years or for different indicators can be compared rather than judged by eye. A positive value shows that poor districts lie beside poor districts and its size shows the strength. However, the result depends on how neighbours are defined and on the district boundaries, it is a global index that does not show where the clusters are, and it cannot explain them. With few or unequal districts it is also less reliable. Overall it is a useful summary for planners, but it needs maps of local clusters and explanations such as access to services, land quality and climate to be of real use.",
    wordLimit: { max: 300 },
    explanation: "Strengths, limits and a supported judgement.",
    hints: ["Say what the index shows and what it cannot show."],
  });

  b.card("DEFINITION", "Spatial interpolation?", "Estimating the value of a variable at an unsampled place from values at nearby sample points.");
  b.card("FORMULA", "Inverse distance weighting (power 2)?", t`$\hat{z} = \dfrac{\sum z_i/d_i^2}{\sum 1/d_i^2}$`, "Estimates always lie within the range of the samples.");
  b.card("DEFINITION", "Spatial autocorrelation?", "The degree to which values at nearby locations are similar (positive), dissimilar (negative) or unrelated.");
  b.card("FORMULA", "Moran's I: reading it?", "Positive: clustered. About −1/(N − 1): random. Towards −1: dispersed.");
  b.card("FORMULA", "Geary's C: reading it?", "About 1: random. Below 1: clustered (positive autocorrelation). Above 1: dispersed.");
  b.card("FACT", "What is W in the formulae?", "The sum of all the weights; for contiguity weights, twice the number of neighbouring pairs.");
  b.card("CONCEPT", "Main limit of IDW?", "It cannot estimate values above the highest or below the lowest sample, so it misses peaks and troughs.");
  b.card("CONCEPT", "How does linear interpolation work?", "Between two samples the value changes in proportion to distance along the line joining them.");
  b.card("CONCEPT", "Why is the weights table important?", "It defines who counts as a neighbour; different definitions can give different Moran's I values.");
});
