// W1a exam rows: ZIMSEC Paper 3 (ZIM_P3 x 6): statistics x2, topographic map x2, GIS x1, remote sensing x1.
// All datasets are invented for this exercise (labelled in the stems) and every number is computed in code.
import { concept, P, t, chk, table, checkExam, EXAM, geographyLevels, ZIM, mean, median, range, spearman, chiSquaredTable, rmse, sum, groundKm, gradient, sinuosity, dpStr } from "../lib.mjs";

const mt = (x, dp) => dpStr(x, dp).replace("−", "-");
const tab = (h, r) => table(h, r);
const BASE = { d: 4, skill: EXAM.ZIM_P3.skill, secs: EXAM.ZIM_P3.secs, examStyle: true, paper: "Paper 3", applies: EXAM.ZIM_P3.applies };

// ---------------------------------------------------------------- S1: Spearman on shop customers
const SX = [0.2, 0.6, 0.9, 1.4, 1.6, 2.6, 3.2, 3.7, 4.6, 5.5];
const SY = [148, 160, 121, 133, 98, 104, 70, 82, 45, 52];
const s1 = spearman(SX, SY);
chk(s1.sumD2, 320);
chk(mean(SY), 101.3, 1e-9);
chk(median(SY), 101);
chk(range(SY), 115);

// ---------------------------------------------------------------- S2: chi-squared on retail outlets
const OB = [[66, 29, 15], [27, 36, 43], [17, 35, 47]];
const rowNames = ["Formal shops", "Market stalls", "Street vendors"];
const colNames = ["CBD", "Inner suburbs", "Outer suburbs"];
const cs = chiSquaredTable(OB);
chk(cs.total, 315);
chk(cs.crit, 9.49);
const top = [...cs.cells].sort((a, b) => b.term - a.term)[0];
const topName = `${rowNames[top.r]} in the ${colNames[top.c] === "CBD" ? "CBD" : colNames[top.c].toLowerCase()}`;
const cellName = (r, c) => `${rowNames[r]} in the ${colNames[c] === "CBD" ? "CBD" : colNames[c].toLowerCase()}`;
const otherCells = cs.cells.filter((x) => !(x.r === top.r && x.c === top.c)).sort((a, b) => b.term - a.term).slice(0, 3);

concept("ageo.stats.correlation-regression", { file: "exam/w1a-zimsec", keyPrefix: "exam.w1a-zimsec", applies: ZIM }, (b) => {
  // ============================================================ S1
  b.struct({
    ...BASE,
    concepts: ["ageo.stats.correlation-regression", "ageo.stats.descriptive"],
    stem: t`A researcher investigates whether the number of customers at grocery shops falls with distance from the main road in a rural district of Zimbabwe. Ten shops were surveyed on one weekday (data invented for this exercise).\n\n${tab(["Shop", ...SX.map((_, i) => String(i + 1))], [["Distance from main road (km)", ...SX.map((x) => dpStr(x, 1))], ["Customers in one day", ...SY]])}\n\nThe researcher uses Spearman's rank correlation coefficient, $r_s = 1 - \dfrac{6\sum d^2}{n^3 - n}$. The critical value of $r_s$ at the 5% significance level for 10 pairs is 0.648.`,
    parts: checkExam(EXAM.ZIM_P3, [
      P.group({
        label: "(a)", stem: "Describe the data on customers.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "Calculate the mean number of customers per shop, to one decimal place.", value: mean(SY), dp: 1, wrong: [101, 1013], explanation: "Total = 1 013; 1 013 ÷ 10 = 101.3." }),
          P.num({ label: "(ii)", marks: 1, stem: "State the median number of customers.", value: median(SY), wrong: [101.3, 98], explanation: "Ordered: 45, 52, 70, 82, 98, 104, 121, 133, 148, 160. Median = (98 + 104) ÷ 2 = 101." }),
          P.num({ label: "(iii)", marks: 1, stem: "Calculate the range of the number of customers.", value: range(SY), wrong: [160, 105], explanation: "160 − 45 = 115." }),
          P.mcq({ label: "(iv)", marks: 1, stem: "What is the level of measurement of the distance from the main road?", options: [["Ratio", "Correct: it has equal intervals and a true zero."], ["Nominal", "Distance is a measurement, not a set of names."], ["Ordinal", "The distances are measured, not merely ranked."], ["Cyclic", "Distance does not repeat in a cycle."]], answer: "A", explanation: "Distance in km is ratio data." }),
          P.mcq({ label: "(v)", marks: 1, stem: "Which measure of spread uses only the middle half of the ordered data?", options: [["Inter-quartile range", "Correct: Q3 minus Q1."], ["Range", "The range uses the two extreme values."], ["Mode", "The mode is an average, not a measure of spread."], ["Mean", "The mean is an average, not a measure of spread."]], answer: "A", explanation: "The IQR covers the middle 50% of the data." }),
        ],
      }),
      P.group({
        label: "(b)", stem: "Test whether the number of customers falls with distance from the road.",
        parts: [
          P.manual({ label: "(i)", marks: 2, stem: "State the null hypothesis and the alternative hypothesis.", points: ["H₀: there is no relationship between distance from the main road and the number of customers", "H₁: the number of customers decreases as distance from the main road increases"], modelAnswer: "H₀: there is no relationship between distance from the main road and the number of customers. H₁: the number of customers decreases as distance from the road increases." }),
          P.num({ label: "(ii)", marks: 2, type: "CALCULATION", stem: "Rank both sets of data (smallest = 1) and calculate Σd².", value: s1.sumD2, wrong: [160, 0], explanation: t`Ranks of customers: ${s1.rows.map((r) => r.ry).join(", ")}; ranks of distance 1 to 10. $d$: ${s1.rows.map((r) => r.d).join(", ")}. $d^2$: ${s1.rows.map((r) => r.d2).join(", ")}; the sum is ${s1.sumD2}.` }),
          P.num({ label: "(iii)", marks: 3, type: "CALCULATION", stem: "Calculate r_s, to three decimal places (include the sign).", value: s1.rs, dp: 3, wrong: [-s1.rs, 1 - (6 * 320) / 1000], explanation: t`$r_s = 1 - 6 \times 320 \div (10^3 - 10) = 1 - 1920 \div 990 = ${mt(s1.rs, 3)}$. Forgetting the sign gives +0.939.` }),
        ],
      }),
      P.group({
        label: "(c)", stem: "Interpret the result.",
        parts: [
          P.mcq({ label: "(i)", marks: 1, stem: "What decision should be made about the null hypothesis?", options: [["Reject it, because |r_s| is greater than 0.648", "Correct."], ["Accept it, because r_s is negative", "The sign does not decide the test."], ["Accept it, because |r_s| is greater than 0.648", "A value above the critical value leads to rejection."], ["Reject it, because r_s is less than 1", "Being less than 1 is not the test."]], answer: "A", explanation: "0.939 > 0.648, so H₀ is rejected." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "Which conclusion is correct?", options: [["There is a significant strong negative relationship", "Correct."], ["There is a significant strong positive relationship", "The sign is negative."], ["There is a weak negative relationship that is not significant", "The value is strong and significant."], ["There is no relationship", "The null hypothesis was rejected."]], answer: "A", explanation: "Strong (−0.94) and significant at the 5% level." }),
          P.tf({ label: "(iii)", marks: 1, stem: "The result proves that distance from the main road causes the fall in customers.", answer: false, explanation: "False. Correlation shows a relationship, not cause; other factors (shop size, prices, population) may be involved." }),
          P.mcq({ label: "(iv)", marks: 1, stem: "Which change would make the result more reliable?", options: [["Survey more shops on several different days", "Correct: a larger sample and repeats reduce chance effects."], ["Survey only the five nearest shops", "A smaller, biased sample is less reliable."], ["Survey on one day only", "One day may not be typical."], ["Ignore the shops with unusual results", "Removing anomalies without reason biases the results."]], answer: "A", explanation: "More shops and repeated counts improve reliability." }),
        ],
      }),
      P.manual({
        label: "(d)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 },
        stem: "Assess how far the results support the hypothesis, and evaluate the method used in the investigation.",
        points: [
          "r_s = −0.94, a strong negative correlation: customers fall as distance from the road rises (quote figures)",
          "The value exceeds the critical value 0.648, so the relationship is significant at the 5% level",
          "Examples from the table: the shop at 0.2 km has 148 customers and the shop at 5.5 km has 52",
          "Anomalies: shop 3 (0.9 km) has fewer customers than shops 2 and 4, so the pattern is not perfect",
          "A reason for the pattern: passing traffic and public transport stops give roadside shops more trade, while remote shops serve only nearby villages",
          "Limits of the method: only 10 shops, one weekday, so the sample may not be typical (market days, pay days)",
          "Other factors (shop size, prices, population density, competition) may affect customers; correlation is not cause",
          "Judgement: the data strongly support the hypothesis but more shops, repeat counts and other variables are needed before firm conclusions are drawn",
        ],
        levels: geographyLevels(8),
        modelAnswer: "The data support the hypothesis strongly. r_s = −0.94 is far larger in size than the critical value of 0.648, so there is a significant negative relationship: the shop 0.2 km from the road had 148 customers and the one 5.5 km away had 52. Shop 3 is an anomaly, with fewer customers than the shops either side, so the relationship is not perfect. Roadside shops probably benefit from passing traffic and bus stops, while remote shops serve only the nearby villages. However, the method has limits: only ten shops were surveyed on one weekday, which may not be typical, and shop size, prices and population density may also affect customers. Correlation does not prove cause. Overall the results strongly support the hypothesis, but more shops, repeated counts and other variables are needed for firm conclusions.",
        explanation: "A balanced answer uses the figures, the critical value, anomalies, causes and limits of the method.",
      }),
    ]),
    explanation: "Descriptive statistics, Spearman's rank correlation with a printed critical value, interpretation and evaluation of the investigation.",
    hints: ["Rank both columns from the smallest value (1) to the largest.", "Compare |r_s| with the printed critical value."],
  });

  // ============================================================ S2
  b.struct({
    ...BASE,
    concepts: ["ageo.stats.hypothesis-testing", "ageo.stats.descriptive"],
    stem: t`Students counted retail outlets in three zones of a town in Zimbabwe to find out whether the type of outlet is linked to the zone (data invented for this exercise).\n\n${tab(["", ...colNames, "Row total"], [...OB.map((r, i) => [rowNames[i], ...r, cs.rowT[i]]), ["Column total", ...cs.colT, cs.total]])}\n\nThe test used is chi-squared, $\chi^2 = \sum \dfrac{(O - E)^2}{E}$. The critical value of $\chi^2$ at the 5% level for 4 degrees of freedom is ${cs.crit}.`,
    parts: checkExam(EXAM.ZIM_P3, [
      P.group({
        label: "(a)", stem: "Use the table to answer the following.",
        parts: [
          P.num({ label: "(i)", marks: 1, stem: "State the total number of outlets counted.", value: cs.total, wrong: [110, 945], explanation: "The grand total is 315." }),
          P.num({ label: "(ii)", marks: 2, type: "CALCULATION", stem: "An outlet is chosen at random. Calculate the probability that it is a formal shop, to three decimal places.", value: 110 / 315, dp: 3, wrong: [0.35 * 2, 110], explanation: "110 ÷ 315 = 0.349." }),
          P.num({ label: "(iii)", marks: 1, stem: "What percentage of the outlets in the CBD are formal shops? Give your answer to one decimal place.", value: (66 / 110) * 100, dp: 1, unit: "%", wrong: [21, 66], explanation: "66 ÷ 110 × 100 = 60.0%. Dividing by the grand total (315) gives 21.0%." }),
          P.num({ label: "(iv)", marks: 2, type: "CALCULATION", stem: "An outlet is chosen at random. Calculate the probability that it is a street vendor in the outer suburbs, to three decimal places.", value: 47 / 315, dp: 3, wrong: [47 / 99, 0.48], explanation: "47 ÷ 315 = 0.149. Using the row total (99) as the base gives 0.475, which is the probability among street vendors only." }),
        ],
      }),
      P.group({
        label: "(b)", stem: "Carry out the chi-squared test.",
        parts: [
          P.mcq({ label: "(i)", marks: 1, stem: "Which is the null hypothesis?", options: [["There is no association between outlet type and zone", "Correct."], ["Formal shops are more common in the CBD", "This is a directional alternative hypothesis."], ["Outlet type causes the zone to change", "A test of association cannot show cause."], ["There are the same number of outlets in each zone", "That is a different (goodness-of-fit) null."]], answer: "A", explanation: "The null hypothesis states there is no association." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "Which is the alternative hypothesis?", options: [["There is an association between outlet type and zone", "Correct."], ["There is no association between outlet type and zone", "That is the null hypothesis."], ["The CBD has the most outlets", "The test does not concern totals."], ["Outlets are evenly spread", "That would be consistent with the null hypothesis."]], answer: "A", explanation: "H₁ states there is an association." }),
          P.num({ label: "(iii)", marks: 1, stem: "Calculate the expected number of formal shops in the CBD, to one decimal place.", value: cs.expected[0][0], dp: 1, wrong: [66, 110], explanation: t`Expected = row total × column total ÷ grand total $= 110 \times 110 \div 315 = ${dpStr(cs.expected[0][0], 1)}$.` }),
          P.num({ label: "(iv)", marks: 3, type: "CALCULATION", stem: "Calculate χ² (all expected values are above 5), to two decimal places.", value: cs.chi2, dp: 2, wrong: [cs.chi2 / 2, 315], explanation: t`The nine terms $(O-E)^2/E$ are ${cs.cells.map((x) => dpStr(x.term, 2)).join(", ")}; their sum is ${dpStr(cs.chi2, 2)}.` }),
          P.num({ label: "(v)", marks: 1, stem: "State the number of degrees of freedom.", value: cs.df, wrong: [8, 3], explanation: "(3 − 1) × (3 − 1) = 4." }),
          P.mcq({ label: "(vi)", marks: 1, stem: "What decision is made about the null hypothesis?", options: [["Reject it, because χ² is greater than 9.49", "Correct."], ["Accept it, because χ² is greater than 9.49", "A value above the critical value leads to rejection."], ["Reject it, because χ² is less than 9.49", "A smaller value would lead to non-rejection."], ["Accept it, because χ² is less than 315", "315 is not the critical value."]], answer: "A", explanation: `${dpStr(cs.chi2, 2)} is greater than ${cs.crit}, so H₀ is rejected.` }),
        ],
      }),
      P.group({
        label: "(c)", stem: "Interpret the results.",
        parts: [
          P.mcq({ label: "(i)", marks: 1, stem: "Which cell contributes most to the value of χ²?", options: [[topName, "Correct: it has the largest (O − E)² ÷ E."], ...otherCells.map((x) => [cellName(x.r, x.c), "This cell contributes less to χ²."])], answer: "A", explanation: `The largest term, ${dpStr(top.term, 2)}, is for ${topName.toLowerCase()}.` }),
          P.manual({ label: "(ii)", marks: 2, stem: "Suggest a reason for the pattern of formal shops and street vendors in the town.", points: ["Formal shops are concentrated in the CBD where accessibility and demand are highest and they can afford high rents", "Street vendors and market stalls are numerous in the outer suburbs where rents are low and customers lack easy access to the CBD"], modelAnswer: "Formal shops cluster in the CBD where accessibility and customer numbers are highest and traders can afford high rents, while street vendors and stalls are more common in the outer suburbs where rents are low and residents cannot easily reach the CBD." }),
        ],
      }),
      P.manual({
        label: "(d)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 },
        stem: "Assess how useful the chi-squared test is for the town council in deciding where to provide new trading space, and discuss the limitations of the investigation.",
        points: [
          "The test shows a significant association between outlet type and zone (χ² greater than the critical value), so zones differ in the types of outlet",
          "The council can see where formal and informal trade are concentrated and target space (for example market stalls in outer suburbs)",
          "The individual cell terms show which zone-type combinations are most unlike the expected pattern",
          "The test shows association only, not why: rents, land use zoning and customer incomes may explain it",
          "Counts were taken on one occasion; trade varies by day and season, and street vendors are mobile so may be under-counted",
          "Expected values were above 5, so the test is valid, but the zones are broad and hide variation within them",
          "Council decisions also need data on customer numbers, incomes, safety and services",
          "Judgement: a useful first step that points to where more detailed surveys should be done, not enough by itself to plan",
        ],
        levels: geographyLevels(8),
        modelAnswer: "The test shows a significant association between outlet type and zone, so the council knows that formal shops are concentrated in the CBD and informal outlets in the outer suburbs; the largest cell terms show where the pattern is most marked. This helps the council to target space, for example by providing serviced market stalls in the outer suburbs. However, the test shows only that an association exists, not why: rents, zoning and incomes may explain it. The counts were made on one occasion, and street vendors are mobile and may have been under-counted. The zones are also broad and hide variation within them. Overall the test is a useful first step that shows where more detailed surveys are needed, but the council would also need data on customer numbers, incomes and services before planning trading space.",
        explanation: "Use the result, the cell terms and the limits of the data to reach a judgement.",
      }),
    ]),
    explanation: "Probability, chi-squared for association with a printed critical value, interpretation and evaluation of the investigation.",
    hints: ["Expected = row total × column total ÷ grand total.", "Compare χ² with the printed critical value."],
  });

  // ============================================================ T1: topographic map, Rukunguwo District
  const SCH = [41.5, 17.2], CLI = [43.2, 19.6], DWA = [41.2, 19.0];
  const dSC = Math.hypot(CLI[0] - SCH[0], CLI[1] - SCH[1]); // km
  const bearSC = (Math.atan2(CLI[0] - SCH[0], CLI[1] - SCH[1]) * 180) / Math.PI;
  const dSD = Math.hypot(DWA[0] - SCH[0], DWA[1] - SCH[1]) * 1000; // m
  const gSD = gradient(140, dSD);
  const SECT = [1450, 1465, 1505, 1480, 1450, 1425, 1410];
  const sightAt2 = SECT[0] + (SECT[6] - SECT[0]) * (2 / 6);
  chk(Math.round(bearSC), 35);
  const T1TABLE = tab(["Feature", "Position", "Height and detail"], [
    ["Mbada School", `Easting ${dpStr(SCH[0], 1)}, northing ${dpStr(SCH[1], 1)}`, "1 450 m; beside a gravel road"],
    ["Clinic", `Easting ${dpStr(CLI[0], 1)}, northing ${dpStr(CLI[1], 1)}`, "1 430 m; at the end of the gravel road"],
    ["Chikara dwala (granite hill)", `Summit at easting ${dpStr(DWA[0], 1)}, northing ${dpStr(DWA[1], 1)}`, "Summit 1 590 m; very steep sides with contours almost touching"],
    ["Rukunguwo River", "Source at 4021; flows south-east to the dam site", "1 510 m at the source and 1 390 m at the dam site; wide flat valley floor (about 400 m across) upstream of 4418"],
    ["Proposed dam site", "443181", "Narrow valley between two spurs; contours close together on both sides at 1 400 m, 1 420 m and 1 440 m"],
    ["Mbada village", "421185", "About 60 houses on the flat valley floor beside the river and the gravel road"],
    ["Flat farmland with red soils", "Squares 4418 and 4517", "Downstream of the dam site; crossed by the gravel road"],
    ["Hand-pump borehole", "3 tenths of a square east of easting line 41 and 8 tenths north of northing line 17", "Serves the school"],
  ]);
  b.struct({
    ...BASE,
    concepts: ["ageo.skills.topographic-maps"],
    stem: t`Table 1 describes part of a 1:50 000 topographic map of the fictional Rukunguwo District in the Zimbabwean midlands (invented for this exercise). Each grid square is 1 km by 1 km, the contour interval is 20 m, and positions given as easting and northing are grid-line values in km.\n\n${T1TABLE}\n\nTable 2 gives heights along a straight line X to Y (6 km long) across the district.\n\n${tab(["Distance from X (km)", "0", "1", "2", "3", "4", "5", "6"], [["Height (m)", ...SECT]])}`,
    parts: checkExam(EXAM.ZIM_P3, [
      P.group({
        label: "(a)", stem: "Use Table 1.",
        parts: [
          P.short({ label: "(i)", marks: 2, stem: "Give the six-figure grid reference of the borehole.", accepted: ["413178"], wrong: ["417138", "4117"], explanation: "Easting 41 + 3 tenths = 413; northing 17 + 8 tenths = 178. Eastings come first: 413178." }),
          P.num({ label: "(ii)", marks: 2, type: "CALCULATION", stem: "Calculate the straight-line distance from the school to the clinic, in km, to one decimal place.", value: dSC, dp: 1, unit: "km", wrong: [4.1, 1.7], explanation: t`Eastings differ by ${dpStr(CLI[0] - SCH[0], 1)} km and northings by ${dpStr(CLI[1] - SCH[1], 1)} km. Distance $= \sqrt{${dpStr(CLI[0] - SCH[0], 1)}^2 + ${dpStr(CLI[1] - SCH[1], 1)}^2} = ${dpStr(dSC, 1)}$ km. Adding the two differences gives 4.1 km.` }),
          P.num({ label: "(iii)", marks: 2, type: "CALCULATION", stem: "Calculate the bearing of the clinic from the school, to the nearest degree.", value: bearSC, dp: 0, unit: "°", wrong: [55, 215], explanation: t`$\tan\theta = 1.7 \div 2.4$, so $\theta = ${dpStr(bearSC, 1)}^\circ$, east of north, so the bearing is about 035°. An angle of 55° measures from east instead of north.` }),
        ],
      }),
      P.group({
        label: "(b)", stem: "Gradients and the cross-section.",
        parts: [
          P.num({ label: "(i)", marks: 3, type: "CALCULATION", stem: "The school is at 1 450 m and Chikara dwala summit at 1 590 m. Use the positions in Table 1 to calculate the average gradient between them as '1 in n', to the nearest whole number.", value: gSD.oneIn, dp: 0, wrong: [0.077, 1590 / 1450], explanation: t`Horizontal distance $= \sqrt{0.3^2 + 1.8^2} = ${dpStr(dSD / 1000, 2)}$ km $= ${dpStr(dSD, 0)}$ m. Vertical interval $= 140$ m. Gradient $= 1$ in $${dpStr(dSD, 0)} \div 140 = ${dpStr(gSD.oneIn, 1)}$, so 1 in 13.` }),
          P.num({ label: "(ii)", marks: 1, stem: "State the greatest height along line X to Y, in m.", value: 1505, unit: "m", wrong: [1590], explanation: "The highest value in Table 2 is 1 505 m at 2 km." }),
          P.mcq({ label: "(iii)", marks: 1, stem: "Is point Y (1 410 m) visible from point X (1 450 m)?", options: [["No, because the 2 km ridge is above the line of sight", "Correct: the line of sight is only about 1 437 m at 2 km."], ["Yes, because X is higher than Y", "Higher ground between the points can still block the view."], ["Yes, because the line is only 6 km long", "Distance alone does not decide visibility."], ["No, because Y is lower than the clinic", "The clinic is not on the line."]], answer: "A", explanation: `At 2 km the line of sight is at 1 450 − 40 × (2 ÷ 6) = ${dpStr(sightAt2, 0)} m, below the 1 505 m ridge.` }),
          P.num({ label: "(iv)", marks: 1, stem: "Calculate the difference between the highest and lowest heights along the section, in m.", value: 1505 - 1410, unit: "m", wrong: [50, 1505], explanation: "1 320 − 1 410 = 90 m." }),
        ],
      }),
      P.group({
        label: "(c)", stem: "Describe and explain.",
        parts: [
          P.manual({ label: "(i)", marks: 3, stem: "Describe the relief and drainage shown in Table 1.", points: ["Chikara dwala is a steep-sided hill with a summit of 1 590 m (contours almost touching)", "The river flows south-east, falling 120 m from 1 510 m at its source to 1 390 m at the dam site", "The valley floor is wide and flat upstream of the dam site (about 400 m across) but narrow and steep-sided at the dam site"], modelAnswer: "Chikara dwala is a steep-sided hill whose summit reaches 1 590 m. The river flows south-east, falling 120 m from 1 510 m at its source to 1 390 m at the dam site. The valley floor is wide and flat, about 400 m across, upstream of the dam site, but narrow and steep-sided at the dam site itself." }),
          P.manual({ label: "(ii)", marks: 2, stem: "Explain why Mbada village is sited where it is.", points: ["On the flat valley floor, which is suitable for building and farming", "Beside the river for water supply and the gravel road for access/trade"], modelAnswer: "The village is on the flat valley floor, which is suitable for building and farming, beside the river for water and beside the gravel road for access to the school and clinic." }),
        ],
      }),
      P.manual({
        label: "(d)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 },
        stem: "Assess the suitability of the proposed dam site (443181) for an irrigation scheme, using evidence from Table 1.",
        points: [
          "The narrow valley between two spurs means a short dam wall, which lowers building costs",
          "Steep valley sides at 1 400 m, 1 420 m and 1 440 m give a deep reservoir, which reduces evaporation per unit volume",
          "Upstream there is a wide flat floor, so the reservoir could store a large volume (and the catchment above is the 120 m fall from the source)",
          "Flat farmland with red soils downstream (squares 4418 and 4517) is close to the dam, so canals can be short and gravity-fed",
          "Gravel road crosses the farmland and links to the clinic and school, so access for construction and farmers is good",
          "Disadvantage: Mbada village lies on the flat valley floor upstream and could be flooded or need relocating; settlement upstream risks pollution",
          "Other doubts: river flow in the dry season is unknown; silting from farmland and evaporation losses reduce capacity; cost and the need for an environmental impact assessment",
          "Judgement: the topography is favourable but the village, river flow and cost need checking, so suitable provided these are resolved",
        ],
        levels: geographyLevels(8),
        modelAnswer: "The topography is favourable. The narrow valley between two spurs means a short dam wall and so lower costs, and the steep sides at 1 400, 1 420 and 1 440 m give a deep reservoir that loses less water to evaporation. The wide, flat valley floor upstream gives space to store a large volume. The flat farmland with red soils downstream in squares 4418 and 4517 is close, so canals can be short, and the gravel road gives access for construction and farmers. However, Mbada village is on the flat valley floor upstream and could be flooded or need relocating, and settlement upstream could pollute the water. The dry-season flow of the river is not known, silting from farmland and evaporation could reduce capacity, and the dam would be costly and need an environmental impact assessment. Overall the site is suitable provided the village, river flow and cost are resolved.",
        explanation: "Use evidence from the table for advantages and disadvantages and reach a conclusion.",
      }),
    ]),
    explanation: "Grid references, distance, bearing, gradient, cross-section interpretation, description of relief and evaluation of a dam site from a described map extract.",
    hints: ["Eastings come before northings.", "Convert the horizontal distance to metres before finding the gradient."],
  });

  // ============================================================ T2: topographic map, Zvamano District
  const chan = groundKm(11.2, 50000), str = groundKm(8.0, 50000);
  const sinu = sinuosity(chan, str);
  const A = [44.0, 17.5], B = [41.9, 20.9];
  const bearAB = (((Math.atan2(B[0] - A[0], B[1] - A[1]) * 180) / Math.PI) + 360) % 360;
  const gRoad = gradient(90, groundKm(3.6, 50000) * 1000);
const angAB = (Math.atan2(A[0] - B[0], B[1] - A[1]) * 180) / Math.PI;
  const T2TABLE = tab(["Feature", "Position and detail"], [
    ["Zvamano River", "Between the bridge and the ford the channel measures 11.2 cm along the river (measured with thread) and 8.0 cm in a straight line"],
    ["Msasa plantation", "Covers 12 whole grid squares and 9 part squares (each part square to be counted as half)"],
    ["Village A", `Easting ${dpStr(A[0], 1)}, northing ${dpStr(A[1], 1)}; 1 100 m; on the main gravel road beside the river`],
    ["Village B", `Easting ${dpStr(B[0], 1)}, northing ${dpStr(B[1], 1)}; on a gentle slope near a spring`],
    ["Houses", "Village A: a linear row beside the road; Village B: a cluster; farms: scattered homesteads in the north-east"],
    ["Proposed road, first section", "Climbs from 1 100 m to 1 190 m over 3.6 cm on the map"],
  ]);
  const ROUTES = tab(["", "Route 1 (over the ridge)", "Route 2 (along the valley)"], [["Length", "4.3 km", "6.5 km"], ["Steepest gradient", "1 in 9", "1 in 40"], ["River crossings (bridges needed)", "0", "2"], ["Land affected", "Mostly plantation", "Mostly farmland"]]);
  b.struct({
    ...BASE,
    concepts: ["ageo.skills.topographic-maps"],
    stem: t`Table 1 describes a 1:50 000 map extract of the fictional Zvamano District in southern Africa (invented for this exercise). Each grid square is 1 km by 1 km and positions are grid-line values in km.\n\n${T2TABLE}\n\nA new gravel road is planned between Village A and Village B. Table 2 compares two possible routes.\n\n${ROUTES}`,
    parts: checkExam(EXAM.ZIM_P3, [
      P.group({
        label: "(a)", stem: "Measurements from the map.",
        parts: [
          P.num({ label: "(i)", marks: 2, type: "CALCULATION", stem: "Calculate the real length of the river channel between the bridge and the ford, in km.", value: chan, dp: 1, unit: "km", wrong: [str, 560], explanation: "11.2 cm × 50 000 = 560 000 cm = 5.6 km. The straight-line distance is 4.0 km." }),
          P.num({ label: "(ii)", marks: 2, type: "CALCULATION", stem: "Calculate the sinuosity of the river (channel length ÷ straight-line length), to two decimal places.", value: sinu, dp: 2, wrong: [0.71, 1.6], explanation: "5.6 ÷ 4.0 = 1.40, a sinuous river." }),
          P.num({ label: "(iii)", marks: 2, type: "CALCULATION", stem: "Estimate the area of the plantation, in km², to one decimal place.", value: 12 + 9 / 2, dp: 1, unit: "km²", wrong: [21, 12], explanation: "12 whole squares + 9 × 0.5 = 16.5 km²." }),
        ],
      }),
      P.group({
        label: "(b)", stem: "The proposed road.",
        parts: [
          P.num({ label: "(i)", marks: 3, type: "CALCULATION", stem: "Calculate the gradient of the first section as '1 in n'.", value: gRoad.oneIn, dp: 0, wrong: [0.05, 25], explanation: "Vertical interval = 90 m; horizontal distance = 3.6 × 50 000 ÷ 100 = 1 800 m; 1 800 ÷ 90 = 20, so 1 in 20." }),
          P.num({ label: "(ii)", marks: 2, type: "CALCULATION", stem: "Calculate the bearing of Village B from Village A, to the nearest degree.", value: bearAB, dp: 0, unit: "°", wrong: [32, 148], explanation: t`Village B is ${dpStr(A[0] - B[0], 1)} km west and ${dpStr(B[1] - A[1], 1)} km north of A. $\tan\theta = ${dpStr(A[0] - B[0], 1)} \div ${dpStr(B[1] - A[1], 1)}$, so $\theta = ${dpStr(angAB, 1)}^\circ$ west of north: bearing $= 360 - ${dpStr(angAB, 1)} = ${dpStr(bearAB, 1)}^\circ$, so ${dpStr(bearAB, 0)}° to the nearest degree.` }),
          P.mcq({ label: "(iii)", marks: 1, stem: "Which settlement pattern is shown by Village A?", options: [["Linear", "Correct: a row of houses along the road."], ["Nucleated", "That is the pattern of Village B."], ["Dispersed", "That is the pattern of the farms."], ["Radial", "Radial refers to routes or streams spreading from a centre."]], answer: "A", explanation: "A row of houses along a road is a linear pattern." }),
        ],
      }),
      P.group({
        label: "(c)", stem: "Settlement.",
        parts: [
          P.manual({ label: "(i)", marks: 3, stem: "Describe the settlement pattern shown in Table 1.", points: ["Village A is linear, a row of houses beside the road and river", "Village B is nucleated, a cluster of houses near a spring", "Farms in the north-east are dispersed, scattered homesteads"], modelAnswer: "Village A is linear, with houses in a row beside the gravel road and river. Village B is nucleated, with its houses in a cluster near a spring. The farms in the north-east are dispersed as scattered homesteads." }),
          P.manual({ label: "(ii)", marks: 2, stem: "Explain why Village A has a linear pattern.", points: ["Houses locate along the road because it gives access to transport, trade and services", "The river alongside provides water, so the flat strip between road and river is the favoured site"], modelAnswer: "Houses are built along the road because it gives access to transport, trade and services, and the river alongside gives water, so the flat strip between road and river is the favoured site." }),
        ],
      }),
      P.manual({
        label: "(d)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 },
        stem: "Evaluate the two routes in Table 2 and recommend which one should be built.",
        points: [
          "Route 1 is shorter (4.3 km against 6.5 km), so it costs less to build and shortens journeys",
          "Route 1 has a steepest gradient of 1 in 9, which is hard for loaded lorries and buses and could erode in heavy rain",
          "Route 1 needs no bridges, avoiding the cost and flood risk of river crossings",
          "Route 1 mostly crosses the plantation, so less farmland is lost but trees must be cleared",
          "Route 2 is gentle (1 in 40), safer and cheaper to run for heavy vehicles",
          "Route 2 is 2.2 km longer and needs two bridges, which raise the cost and may be damaged by floods",
          "Route 2 crosses farmland, serving farmers but removing productive land and requiring compensation",
          "Judgement: a reasoned choice (for example Route 2 for safety and use by heavy vehicles, or Route 1 if cost is the main concern and the gradient can be engineered)",
        ],
        levels: geographyLevels(8),
        modelAnswer: "Route 1 is shorter at 4.3 km against 6.5 km, so it is cheaper to build and shortens journeys, and it needs no bridges, avoiding their cost and flood risk. It mostly crosses the plantation, so little farmland is lost. However, its steepest gradient of 1 in 9 is hard for loaded lorries and buses and could erode in heavy rain. Route 2 is gentle, with a steepest gradient of 1 in 40, so it is safer and cheaper to run for heavy vehicles, and it serves farmers. But it is 2.2 km longer, needs two bridges that can be damaged by floods, and takes farmland. On balance Route 2 is the better choice if the road is to carry heavy vehicles safely all year, but Route 1 would be preferable if cost is the main concern and the steep section can be engineered.",
        explanation: "Weigh length, gradient, bridges and land use, then recommend a route with a reason.",
      }),
    ]),
    explanation: "Scale, sinuosity, area, gradient, bearing, settlement patterns and evaluation of route options from a described map extract.",
    hints: ["Convert map distances to real distances with the 1:50 000 scale.", "Bearings are measured clockwise from north."],
  });

  // ============================================================ G1: GIS
  const RES = [[3.1, -2.5], [-1.8, 2.9], [2.6, 1.5], [-3.4, -0.4], [1.9, -2.2]];
  const rmG = rmse(RES);
  const ssG = sum(RES.map(([x, y]) => x * x + y * y));
  const resMag = RES.map(([x, y]) => Math.hypot(x, y));
  b.struct({
    ...BASE,
    concepts: ["ageo.gis.data-models-georeferencing", "ageo.gis.coordinates-projections"],
    stem: t`A district council in Zimbabwe is creating a GIS for planning new boreholes. A technician georeferences a scanned 1:50 000 map sheet using five ground control points. The residuals (dx, dy), in metres, are in the table. The finished raster has 10 m cells (data invented for this exercise).\n\n${tab(["GCP", "1", "2", "3", "4", "5"], [["dx (m)", ...RES.map((r) => dpStr(r[0], 1))], ["dy (m)", ...RES.map((r) => dpStr(r[1], 1))]])}`,
    parts: checkExam(EXAM.ZIM_P3, [
      P.group({
        label: "(a)", stem: "Data models and coordinates.",
        parts: [
          P.mcq({ label: "(i)", marks: 1, stem: "Which data model is best for the boundaries of wards?", options: [["Vector polygons", "Correct: boundaries are discrete areas with exact edges."], ["Raster cells", "Cells give stair-step edges."], ["A table of attributes only", "A table cannot show shape."], ["Vector points", "Points cannot show areas."]], answer: "A", explanation: "Discrete areas with sharp boundaries are stored as vector polygons." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "Which data model is best for a continuous surface of ground elevation?", options: [["Raster", "Correct: a grid of height values."], ["Vector lines only", "Contours can be stored as lines but the surface itself is continuous."], ["Vector points only", "Points sample the surface but do not cover it."], ["Vector polygons", "Polygons suit discrete areas."]], answer: "A", explanation: "Elevation is a continuous variable stored as a raster (digital elevation model)." }),
          P.num({ label: "(iii)", marks: 1, stem: "A borehole is at 30.4°E. State its UTM zone number, using zone = floor((longitude + 180) ÷ 6) + 1.", value: 36, wrong: [35], explanation: "(30.4 + 180) ÷ 6 = 35.07; whole number 35; add 1 to get zone 36." }),
          P.num({ label: "(iv)", marks: 2, type: "CALCULATION", stem: "Another borehole is at 18°15′S. Convert its latitude to decimal degrees (south negative), to two decimal places.", value: -18.25, dp: 2, unit: "°", wrong: [18.25, -18.15], explanation: "15′ ÷ 60 = 0.25°, so the latitude is −18.25°." }),
          P.mcq({ label: "(v)", marks: 1, stem: "Why should layers in latitude and longitude be reprojected before distances are measured?", options: [["A degree of longitude is not a fixed length on the ground", "Correct: it shrinks with latitude."], ["Degrees cannot be stored in a GIS", "GIS software stores degrees routinely."], ["Reprojection makes all areas equal", "No projection preserves everything."], ["Measurements in degrees are always larger", "The error depends on latitude and direction."]], answer: "A", explanation: "Degrees are angles; a degree of longitude covers less ground towards the poles." }),
        ],
      }),
      P.group({
        label: "(b)", stem: "Georeferencing accuracy.",
        parts: [
          P.num({ label: "(i)", marks: 4, type: "CALCULATION", stem: "Calculate the RMSE, in metres, to two decimal places.", value: rmG, dp: 2, unit: "m", wrong: [Math.sqrt(ssG), ssG], explanation: t`1. $dx^2 + dy^2$ for each point: ${RES.map(([x, y]) => dpStr(x * x + y * y, 2)).join(", ")}.\n2. Sum $= ${dpStr(ssG, 2)}$.\n3. Divide by 5: ${dpStr(ssG / 5, 3)}.\n4. Square root: ${dpStr(rmG, 2)} m.` }),
          P.mcq({ label: "(ii)", marks: 1, stem: "Is this RMSE acceptable for a raster with 10 m cells?", options: [["Yes, because it is smaller than half a cell", "Correct: the error is within the size of a cell."], ["No, because it is larger than 1 m", "The acceptable error depends on the cell size, not a fixed 1 m."], ["No, because RMSE must be zero", "Zero is not realistic."], ["Yes, because it is a whole number", "Being a whole number is irrelevant."]], answer: "A", explanation: `${dpStr(rmG, 2)} m is less than half of 10 m (5 m), so it is acceptable.` }),
          P.manual({ label: "(iii)", marks: 2, stem: "Suggest two ways to reduce the RMSE.", points: ["Check or replace the GCP with the largest residual (GCP 1)", "Add more GCPs spread over the whole sheet / choose a better transformation"], modelAnswer: "Check or replace the control point with the largest residual, and add more control points spread over the whole sheet." }),
        ],
      }),
      P.match({ label: "(c)", marks: 4, stem: "The technician then digitises roads and boundaries. Match each digitising error to its description.", pairs: [["Undershoot", "A line stops short of the line it should meet"], ["Overshoot", "A line extends beyond the line it should meet"], ["Sliver polygon", "A thin false polygon where two boundaries do not coincide"], ["Duplicate feature", "The same feature has been digitised twice"]], explanation: "Snapping and topology checks reduce these errors." }),
      P.manual({
        label: "(d)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 },
        stem: "Assess the usefulness of a GIS for planning the locations of new boreholes in the district, and discuss the limitations of the data used.",
        points: [
          "Layers (population, existing boreholes, geology, rivers, roads) can be overlaid to find places with high need and suitable geology",
          "Buffers can show households more than 1 km from the nearest water point, identifying underserved areas",
          "Raster layers (slope, rainfall, elevation) and vector layers (boundaries, points) can be combined in the analysis",
          "Results can be shown as clear maps that help officials and communities to agree on priorities",
          "Accuracy depends on georeferencing (RMSE of about 3 m is acceptable here) and on the age of the map and the data",
          "Geological layers and groundwater data may be coarse or missing, so GIS cannot show where water actually is without drilling surveys",
          "The analysis needs trained staff, software and up-to-date population data",
          "Judgement: GIS is a very effective tool for narrowing down sites and showing need, but field surveys and community consultation are needed before drilling",
        ],
        levels: geographyLevels(8),
        modelAnswer: "A GIS lets the council overlay layers such as population, existing boreholes, geology, rivers and roads to find places with high need and suitable geology. Buffers can show households more than a kilometre from the nearest water point, so underserved areas are clear, and the result can be shown as maps that help officials and communities to agree priorities. Vector and raster layers can be combined, for example slope and rainfall rasters with boundaries and borehole points. However, accuracy depends on the georeferencing, whose RMSE of about three metres is acceptable here, and on the age of the map and the population data. Geological and groundwater data may be coarse, so the GIS cannot show where water actually is without a drilling survey, and the work needs trained staff and up-to-date data. Overall a GIS is very effective for narrowing down sites and showing need, but field surveys and community consultation are needed before drilling.",
        explanation: "Uses of GIS analysis, limitations of the data and a supported judgement.",
      }),
    ]),
    explanation: "Data models, UTM zones, decimal degrees, RMSE, digitising errors and the use of GIS in planning.",
    hints: ["RMSE = square root of the mean of dx² + dy².", "Convert minutes to degrees by dividing by 60."],
  });

  // ============================================================ R1: remote sensing
  const REF = [["Irrigated sugarcane", 2, 7, 3, 58], ["Dry grassland", 9, 14, 19, 33], ["Reservoir water", 6, 5, 2, 1], ["Bare ground", 14, 18, 24, 29]];
  const nd = (nir, red) => (nir - red) / (nir + red);
  b.struct({
    ...BASE,
    concepts: ["ageo.rs.system-reflectance", "ageo.rs.resolution-interpretation"],
    stem: t`A catchment manager in the Zimbabwe lowveld uses satellite images to manage an irrigation scheme beside a reservoir. The table shows reflectance (%) of four surfaces in four bands (data invented for this exercise).\n\n${tab(["Surface", "Blue", "Green", "Red", "Near infrared"], REF.map((r) => [r[0], ...r.slice(1)]))}\n\nNDVI $= \dfrac{NIR - Red}{NIR + Red}$.`,
    parts: checkExam(EXAM.ZIM_P3, [
      P.group({
        label: "(a)", stem: "Use the table.",
        parts: [
          P.mcq({ label: "(i)", marks: 1, stem: "Which surface has the highest reflectance in the near infrared?", options: [["Irrigated sugarcane", "Correct: 58%."], ["Dry grassland", "Its NIR reflectance is 33%."], ["Reservoir water", "Water absorbs NIR."], ["Bare ground", "Its NIR reflectance is 29%."]], answer: "A", explanation: "Healthy green leaves reflect NIR strongly." }),
          P.num({ label: "(ii)", marks: 2, type: "CALCULATION", stem: "Calculate the NDVI of dry grassland, to two decimal places.", value: nd(33, 19), dp: 2, wrong: [14, 1.74], explanation: t`$(33 - 19) \div (33 + 19) = 14 \div 52 = ${dpStr(nd(33, 19), 2)}$. Forgetting to divide gives 14.` }),
          P.num({ label: "(iii)", marks: 2, type: "CALCULATION", stem: "Calculate the NDVI of the reservoir water, to two decimal places (include the sign).", value: nd(1, 2), dp: 2, wrong: [0.33, -1], explanation: t`$(1 - 2) \div (1 + 2) = -1 \div 3 = -0.33$. A positive 0.33 forgets that red is higher than NIR.` }),
          P.mcq({ label: "(iv)", marks: 1, stem: "What does a negative NDVI usually indicate?", options: [["Water", "Correct: water absorbs more NIR than red."], ["Dense healthy crops", "Healthy crops have high positive NDVI."], ["Bare soil", "Soil has small positive NDVI."], ["Dry grass", "Dry grass has low positive NDVI."]], answer: "A", explanation: "Water absorbs near infrared strongly, so NIR is lower than red and NDVI is negative." }),
        ],
      }),
      P.group({
        label: "(b)", stem: "Imagery and resolution.",
        parts: [
          P.mcq({ label: "(i)", marks: 1, stem: "In a standard false-colour composite (NIR shown as red), how does the sugarcane appear?", options: [["Bright red", "Correct."], ["Dark blue or black", "That is how water appears."], ["Pale green", "A natural colour image would show green."], ["White", "White would need high values in all three bands."]], answer: "A", explanation: "NIR is shown in red and sugarcane has high NIR reflectance." }),
          P.num({ label: "(ii)", marks: 3, type: "CALCULATION", stem: "The reservoir covers 3.6 km². How many 20 m by 20 m pixels cover it?", value: 3.6e6 / 400, unit: "pixels", wrong: [180, 90000], explanation: "3.6 km² = 3 600 000 m²; one pixel = 400 m²; 3 600 000 ÷ 400 = 9 000 pixels." }),
          P.mcq({ label: "(iii)", marks: 1, stem: "Which type of sensor is best for mapping the reservoir's extent during cloudy rainy-season weeks?", options: [["Radar (active microwave)", "Correct: microwaves pass through cloud."], ["Visible-light camera", "Cloud blocks visible light."], ["Near-infrared scanner", "Cloud also blocks NIR."], ["Thermal scanner", "Cloud blocks thermal infrared."]], answer: "A", explanation: "Radar penetrates cloud and works day and night." }),
          P.mcq({ label: "(iv)", marks: 1, stem: "The manager wants a weekly map of crop condition for the whole scheme. Which resolution is most important?", options: [["Temporal resolution", "Correct: frequent coverage is needed."], ["Radiometric resolution only", "It matters, but weekly coverage is the key need."], ["A very fine spatial resolution of 1 cm", "Not needed, and such images would be rare."], ["Spectral resolution of 500 bands", "Not needed for NDVI."]], answer: "A", explanation: "Weekly monitoring requires a short revisit time." }),
        ],
      }),
      P.group({
        label: "(c)", stem: "Explain the reflectance patterns.",
        parts: [
          P.manual({ label: "(i)", marks: 3, stem: "Explain why irrigated sugarcane has low reflectance in the red band but high reflectance in the near infrared.", points: ["Chlorophyll absorbs red light for photosynthesis", "The internal leaf structure scatters/reflects near infrared strongly", "Plants do not use NIR, so it is reflected rather than absorbed"], modelAnswer: "Chlorophyll in the leaves absorbs red light for photosynthesis, so little red is reflected. The internal structure of the leaves scatters near infrared strongly, and plants do not use it, so it is reflected." }),
          P.manual({ label: "(ii)", marks: 2, stem: "Explain why water appears dark in the near-infrared band.", points: ["Water absorbs almost all NIR radiation", "So very little is reflected back to the sensor"], modelAnswer: "Water absorbs almost all near-infrared radiation, so very little is reflected back to the sensor and the water looks dark." }),
        ],
      }),
      P.manual({
        label: "(d)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 },
        stem: "Assess the usefulness of satellite remote sensing for managing an irrigation scheme in Zimbabwe.",
        points: [
          "NDVI from red and NIR bands shows crop condition across the whole scheme, including fields that are difficult to visit",
          "Repeated images show change through the season and give early warning of water stress or disease",
          "Images can map the extent and changes of the reservoir (water is dark in NIR)",
          "Radar can be used in cloudy weeks, giving continuous monitoring in the rainy season",
          "Resolution trade-off: fine pixels (10 m) are needed to distinguish small fields, but fine detail may have less frequent coverage",
          "Optical images are blocked by cloud and need atmospheric correction; processing needs skills, software and sometimes cost/internet access",
          "NDVI shows that a crop is stressed but not why (water, disease, nutrients); field checks are needed",
          "Judgement: very useful for monitoring at scheme scale and early warning, but it complements, not replaces, field observation and flow measurements",
        ],
        levels: geographyLevels(8),
        modelAnswer: "Satellite remote sensing is very useful for an irrigation scheme. NDVI calculated from the red and near-infrared bands shows the condition of crops across the whole scheme, including fields that are difficult to visit, and repeated images show change through the season and warn of water stress early. Images also map the reservoir, which is dark in the near infrared, and radar can be used in cloudy weeks. Fine pixels of about 10 m are needed to separate small fields, though these may be revisited less often. However, optical images are blocked by cloud, need correction, and require skills, software and access to data, and NDVI shows that a crop is stressed but not why, so field checks are needed. Overall remote sensing is very useful for monitoring and early warning, but it complements rather than replaces field observation and flow measurements.",
        explanation: "Uses and limits of remote sensing for a scheme, with a supported judgement.",
      }),
    ]),
    explanation: "Reflectance and NDVI calculations, pixel counts, choice of imagery and evaluation of remote sensing for a scheme.",
    hints: ["NDVI = (NIR − Red) ÷ (NIR + Red).", "Convert square kilometres to square metres before dividing by the pixel area."],
  });
});
