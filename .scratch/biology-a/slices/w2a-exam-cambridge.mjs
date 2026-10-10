// W2a: Cambridge-only exam-format items: Paper 3 investigations (CAM_P3_INVESTIGATION) and a trachea microscopy
// item (PRACTICAL_MICROSCOPY on the Cambridge-only gas exchange concept).
import { concept, P, t, chk, same, table, EXAM, checkExam, CAM, mean, pctChange, magnification, actualSize, sfStr, dpStr } from "../lib.mjs";

const A = (k) => `abio.${k}`;
const p3 = (b, o) =>
  b.struct({
    d: o.d ?? 5, examStyle: true, skill: EXAM.CAM_P3_INVESTIGATION.skill, secs: EXAM.CAM_P3_INVESTIGATION.secs, applies: EXAM.CAM_P3_INVESTIGATION.applies, paper: "Cambridge Paper 3",
    concepts: o.concepts, stem: o.stem,
    parts: checkExam(EXAM.CAM_P3_INVESTIGATION, o.parts),
    explanation: o.explanation, hints: o.hints, calculator: true,
  });

concept(A("plant-transport.transpiration"), { file: "exam/w2a-cambridge", keyPrefix: "exam.w2a-cambridge", applies: CAM }, (b) => {
  // ---------------------------------------------------------------- C1: mass lost by leaves with petroleum jelly on different surfaces
  const groups = ["No jelly", "Upper surface coated", "Lower surface coated", "Both surfaces coated"];
  const init = [[2.14, 1.96, 2.31], [2.05, 2.22, 1.89], [1.98, 2.27, 2.12], [2.09, 1.93, 2.18]];
  const fin = [[1.27, 1.18, 1.36], [1.36, 1.44, 1.26], [1.81, 2.07, 1.63], [2.02, 1.87, 2.10]];
  const loss = init.map((row, i) => row.map((x, j) => -pctChange(x, fin[i][j])));
  const one = loss[0][1];
  const meanLower = mean([loss[2][0], loss[2][1]]);
  const meanLowerAll = mean(loss[2]);
  same(dpStr(one, 1), "39.8");
  same(dpStr(meanLower, 1), "8.7");
  p3(b, {
    concepts: [A("plant-transport.transpiration"), A("skills.practical-investigation")],
    stem: `A student investigated where water is lost from the leaves of a shrub.

1. Twelve leaves of similar size were picked from one plant.
2. Petroleum jelly was spread thinly over the upper surface, the lower surface, both surfaces or neither surface of three leaves each.
3. Each leaf was weighed, then hung by its stalk from a line in the laboratory, away from windows.
4. After 72 hours each leaf was weighed again.

${table(["Treatment", "Leaf 1: initial → final mass / g", "Leaf 2: initial → final mass / g", "Leaf 3: initial → final mass / g"], groups.map((g, i) => [g, ...init[i].map((x, j) => `${x.toFixed(2)} → ${fin[i][j].toFixed(2)}`)]))}`,
    parts: [
      P.group({
        label: "(a)", stem: "Variables.",
        parts: [
          P.short({ label: "(i)", marks: 1, stem: "State the independent variable.", accepted: ["surface coated with petroleum jelly", "which surface was coated", "leaf surface coated", "surface covered with jelly", "position of petroleum jelly", "treatment"], wrong: ["mass of leaf"], explanation: "The surface(s) coated with petroleum jelly." }),
          P.manual({ label: "(ii)", marks: 1, stem: "State the dependent variable and how it should be expressed.", points: ["Loss in mass of the leaves, expressed as percentage loss in mass (because initial masses differ)"], modelAnswer: "The loss in mass, expressed as a percentage of the initial mass because the leaves started with different masses." }),
          P.manual({ label: "(iii)", marks: 2, stem: "State two variables that were standardised.", points: ["Time (72 hours) / same plant / leaves of similar size", "Same conditions for all leaves (temperature, humidity, light, air movement) / thin layer of jelly"], modelAnswer: "All leaves came from one plant and were of similar size, and all were left for 72 hours in the same place, so temperature, humidity and air movement were the same." }),
        ],
      }),
      P.manual({
        label: "(b)", marks: 1, stem: "Explain the purpose of the leaves with no petroleum jelly.",
        points: ["Control / to show the water loss from an untreated leaf for comparison (so any reduction is due to the jelly)"],
        modelAnswer: "They are the control, showing how much water an untreated leaf loses, so the effect of coating each surface can be judged.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Describe a suitable table for recording the raw and processed results.",
        points: [
          "First column: treatment (surface coated)",
          "Columns for initial mass / g, final mass / g and percentage loss in mass / % for each leaf, and a mean percentage loss",
          "Units in headings only; masses to 2 decimal places; percentages to a consistent number of decimal places (e.g. 1 d.p.)",
        ],
        modelAnswer: "The first column lists the treatment. Further columns give initial mass / g, final mass / g and percentage loss in mass / % for each of the three leaves, then the mean percentage loss / %. Units appear only in the headings, masses are given to 2 decimal places and percentages to 1 decimal place.",
      }),
      P.group({
        label: "(d)", stem: "Processing the results.",
        parts: [
          P.num({ label: "(i)", marks: 1, stem: "Calculate the percentage loss in mass of leaf 2 with no jelly, to one decimal place.", value: one, dp: 1, unit: "%", wrong: [sfStr(((1.96 - 1.18) / 1.18) * 100, 3), 0.78], explanation: t`$\dfrac{1.96 - 1.18}{1.96} \times 100 = ${dpStr(one, 1)}\%$.` }),
          P.mcq({
            label: "(ii)", stem: "Which leaf gave an anomalous result?",
            options: [["Leaf 3, lower surface coated", "Correct: it lost about 23%, nearly three times the other two leaves."], ["Leaf 3, no jelly", "It lost about 41%, close to the other two."], ["Leaf 1, both surfaces coated", "It lost about 3%, close to the other two."], ["Leaf 2, upper surface coated", "It lost about 35%, close to the other two."]],
            answer: "A", explanation: `2.12 → 1.63 g is a loss of ${dpStr(loss[2][2], 1)}%, far from ${dpStr(loss[2][0], 1)}% and ${dpStr(loss[2][1], 1)}%.`,
          }),
          P.num({
            label: "(iii)", marks: 2, stem: "Calculate the mean percentage loss in mass for leaves with the lower surface coated, leaving out the anomalous result. Give your answer to one decimal place.",
            value: meanLower, dp: 1, unit: "%", wrong: [dpStr(meanLowerAll, 1)],
            explanation: t`Leaf 1: $${dpStr(loss[2][0], 2)}\%$; leaf 2: $${dpStr(loss[2][1], 2)}\%$. Mean $= ${dpStr(meanLower, 1)}\%$. Including leaf 3 gives $${dpStr(meanLowerAll, 1)}\%$.`,
          }),
        ],
      }),
      P.mcq({
        label: "(e)", stem: "Which type of graph is most suitable for the mean percentage losses?",
        options: [["A bar chart", "Correct: the treatments are categories."], ["A line graph", "The independent variable is not continuous."], ["A histogram", "A histogram shows frequencies of a continuous variable."], ["A scatter graph", "There is no continuous independent variable to plot."]],
        answer: "A", explanation: "Categorical independent variable → **bar chart** with separate bars.",
      }),
      P.manual({
        label: "(f)", marks: 3, stem: `The mean percentage losses (leaving out the anomaly) were about ${dpStr(mean(loss[0]), 1)}%, ${dpStr(mean(loss[1]), 1)}%, ${dpStr(meanLower, 1)}% and ${dpStr(mean(loss[3]), 1)}% for no jelly, upper coated, lower coated and both coated. Explain what these results show.`,
        points: [
          "Coating the lower surface reduces water loss far more than coating the upper surface",
          "So most stomata are on the lower surface; water vapour diffuses out through stomata",
          "Small loss with both surfaces coated: water lost through the stalk / jelly not completely sealing / loss through cuticle is small",
        ],
        modelAnswer: "Coating the lower surface cut water loss from about 40% to about 9%, whereas coating the upper surface reduced it only to about 34%. Most water vapour is therefore lost from the lower surface, where most of the stomata are. Even with both surfaces coated the leaves lost about 3%, probably through the cut stalk, gaps in the jelly or the cuticle.",
      }),
      P.manual({
        label: "(g)", marks: 2, stem: "Identify one source of systematic error and one source of random error.",
        points: ["Systematic: e.g. mass of the petroleum jelly included in initial and final mass / water lost from the cut stalk in every leaf / balance not zeroed", "Random: e.g. uneven thickness of jelly / leaves differing in number of stomata / draughts reaching some leaves more than others"],
        modelAnswer: "A systematic error is water lost through the cut stalk of every leaf, which the jelly does not cover. A random error is that the jelly was spread unevenly, so some leaves were sealed better than others.",
      }),
      P.manual({
        label: "(h)", marks: 3, stem: "Suggest three improvements to the method.",
        points: [
          "Seal the cut end of each stalk with petroleum jelly / weigh jelly separately",
          "Use more leaves per treatment (e.g. five) from several plants and calculate means / repeat the anomaly",
          "Control conditions (temperature, humidity, air movement) e.g. in a growth cabinet; weigh at intervals (e.g. every 24 h) to follow the rate",
        ],
        modelAnswer: "Seal the cut stalk of every leaf with petroleum jelly; use five leaves from several plants for each treatment and repeat any anomalous result; and keep the leaves in a growth cabinet at constant temperature and humidity, weighing them every 24 hours to follow the rate of loss.",
      }),
      P.manual({
        label: "(i)", marks: 1, stem: "Explain why percentage loss in mass, rather than loss in mass, should be compared.",
        points: ["Leaves had different initial masses, so percentage allows a fair comparison"],
        modelAnswer: "The leaves started with different masses, so percentage loss allows a fair comparison.",
      }),
      P.manual({
        label: "(j)", marks: 1, stem: "Assess the risk level of this investigation.",
        points: ["Low risk (e.g. wash hands after handling plant material / petroleum jelly; some plants have irritant sap)"],
        modelAnswer: "Low risk; wash hands after handling the leaves and petroleum jelly, as some plant saps irritate skin.",
      }),
      P.manual({
        label: "(k)", marks: 2, stem: "Suggest how the student could confirm directly that this plant has more stomata on its lower surface.",
        points: ["Make an epidermal impression (clear nail varnish peel) or peel of each surface and view under a microscope", "Count stomata in several fields of view of known area on each surface and compare the mean numbers per mm²"],
        modelAnswer: "Paint clear nail varnish on each surface, peel it off when dry and examine it under the microscope; count the stomata in several fields of view of known area on each surface and compare the mean number per mm².",
      }),
    ],
    explanation: "Coating the lower surface stops most water loss, showing most stomata are on the lower surface.",
    hints: ["Percentage loss = (initial − final) ÷ initial × 100."],
  });
  same([dpStr(mean(loss[0]), 1), dpStr(mean(loss[1]), 1), dpStr(mean(loss[3]), 1)], ["40.5", "34.0", "3.4"]);

  // ---------------------------------------------------------------- C2: dye movement up cut stems at different temperatures
  const temps = [15, 20, 25, 30, 35];
  const dist = [[32, 35, 34], [45, 49, 46], [53, 55, 50], [64, 67, 30], [77, 73, 75]];
  const m30 = mean([dist[3][0], dist[3][1]]);
  const m35 = mean(dist[4]);
  const rate35 = m35 / 30;
  same(dpStr(m30, 1), "65.5");
  p3(b, {
    concepts: [A("plant-transport.transpiration"), A("skills.practical-investigation")],
    stem: `A student investigated the effect of temperature on the movement of water up the stems of celery.

1. A 1.0% stock solution of a water-soluble dye was diluted to 0.2%.
2. Fifteen leafy celery stalks of similar length were cut under water, and each was placed in 20 cm³ of 0.2% dye in a beaker.
3. Three beakers were placed in each of five incubators set at the temperatures shown, with the same light intensity.
4. After 30 minutes each stalk was cut across at 5 mm intervals from the base to find the distance the dye had risen in the xylem.

${table(["Temperature / °C", "Distance stalk 1 / mm", "Distance stalk 2 / mm", "Distance stalk 3 / mm"], temps.map((x, i) => [x, ...dist[i]]))}`,
    parts: [
      P.group({
        label: "(a)", stem: "Variables.",
        parts: [
          P.short({ label: "(i)", marks: 1, stem: "State the independent variable.", accepted: ["temperature", "the temperature", "air temperature", "temperature of incubator"], wrong: ["distance moved by dye"], explanation: "Temperature was changed." }),
          P.manual({ label: "(ii)", marks: 1, stem: "State the dependent variable.", points: ["Distance the dye moved up the stalk in 30 minutes (rate of water movement)"], modelAnswer: "The distance the dye rose up the stalk in 30 minutes." }),
          P.manual({ label: "(iii)", marks: 2, stem: "State two standardised variables.", points: ["Time (30 min) / volume (20 cm³) and concentration of dye (0.2%)", "Light intensity / length or leafiness of stalks / humidity"], modelAnswer: "The time (30 minutes) and the volume and concentration of the dye; also light intensity and stalks of similar length." }),
        ],
      }),
      P.fib({
        label: "(b)", stem: "Complete the dilution to make 20 cm³ of 0.2% dye from the 1.0% stock.",
        template: "Volume of 1.0% stock = {{blank:s}} cm³; volume of water = {{blank:w}} cm³.",
        blanks: [
          { id: "s", accepted: ["4"], input: "number", wrong: "2" },
          { id: "w", accepted: ["16"], input: "number", wrong: "18" },
        ],
        explanation: t`$0.2 \div 1.0 \times 20 = 4\ \text{cm}^3$ of stock plus $16\ \text{cm}^3$ of water.`,
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why the stalks were cut under water.",
        points: ["Prevents air entering the xylem vessels", "Air bubbles (air lock) would break the water column / stop the dye rising"],
        modelAnswer: "Cutting under water stops air entering the xylem. An air bubble would break the continuous column of water and stop water and dye being drawn up.",
      }),
      P.group({
        label: "(d)", stem: "Processing the results.",
        parts: [
          P.mcq({
            label: "(i)", stem: "Which result is anomalous?",
            options: [["Stalk 3 at 30 °C", "Correct: 30 mm, less than half the other two."], ["Stalk 1 at 15 °C", "32 mm is close to 35 and 34 mm."], ["Stalk 3 at 25 °C", "50 mm is close to 53 and 55 mm."], ["Stalk 2 at 35 °C", "73 mm is close to 77 and 75 mm."]],
            answer: "A", explanation: "30 mm at 30 °C is far below 64 and 67 mm.",
          }),
          P.num({ label: "(ii)", marks: 1, stem: "Calculate the mean distance at 30 °C, leaving out the anomalous result, to one decimal place.", value: m30, dp: 1, unit: "mm", wrong: [dpStr(mean(dist[3]), 1)], explanation: t`$(64 + 67) \div 2 = 65.5$ mm.` }),
          P.num({
            label: "(iii)", marks: 2, stem: "Calculate the mean rate of dye movement at 35 °C in mm/min, to three significant figures.",
            value: rate35, sf: 3, unit: "mm/min", wrong: [sfStr(m35, 3), sfStr(30 / m35, 3)],
            explanation: t`Mean $= (77 + 73 + 75) \div 3 = ${sfStr(m35, 4)}$ mm; rate $= ${sfStr(m35, 4)} \div 30 = ${sfStr(rate35, 3)}$ mm/min.`,
          }),
        ],
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Describe the trend in the mean distances.",
        points: ["Distance increases as temperature increases", "Quote values: e.g. mean about 34 mm at 15 °C rising to 75 mm at 35 °C, roughly linear / steadily"],
        modelAnswer: "The mean distance rises steadily with temperature, from about 34 mm at 15 °C to 75 mm at 35 °C.",
      }),
      P.manual({
        label: "(f)", marks: 3, stem: "Explain the effect of temperature on the movement of the dye.",
        points: ["Higher temperature increases evaporation of water from mesophyll cell walls / kinetic energy of water molecules", "Faster diffusion of water vapour out through stomata (steeper gradient; warm air holds more vapour) so faster transpiration", "Greater tension / transpiration pull, so water and dye move up the xylem faster (cohesion)"],
        modelAnswer: "At higher temperatures water molecules have more kinetic energy, so water evaporates faster from the mesophyll cell walls and the vapour diffuses out of the stomata faster. Transpiration increases, creating a greater tension in the xylem, so the cohesive column of water, carrying the dye, is pulled up faster.",
      }),
      P.manual({
        label: "(g)", marks: 2, stem: "Identify one systematic error and one random error.",
        points: ["Systematic: cutting at 5 mm intervals means every distance is underestimated by up to 5 mm / dye travels ahead of visible colour", "Random: stalks differ in number of leaves or xylem vessels / judging where the colour ends"],
        modelAnswer: "Cutting at 5 mm intervals means the true distance could be up to 5 mm further than recorded, a systematic underestimate. Stalks differ in leaf area and number of xylem vessels, a source of random error.",
      }),
      P.manual({
        label: "(h)", marks: 3, stem: "Suggest three improvements that would increase confidence in the conclusion.",
        points: ["Cut at smaller intervals (e.g. 2 mm) / measure to the nearest mm", "Use more stalks per temperature (e.g. five) and repeat the anomaly", "Use stalks with similar leaf area (measure leaf area) / control humidity / use more temperatures at smaller intervals"],
        modelAnswer: "Cut the stalks at 2 mm intervals; use five stalks at each temperature and repeat the anomalous result; and select stalks with similar leaf areas while keeping humidity constant in the incubators.",
      }),
      P.manual({
        label: "(i)", marks: 1, stem: "Assess the risk of this investigation and give one precaution.",
        points: ["Low risk; e.g. cut away from the body on a tile / wear gloves or avoid skin contact with the dye"],
        modelAnswer: "Low risk; cut the stalks on a tile away from the body and avoid skin contact with the dye.",
      }),
      P.manual({
        label: "(j)", marks: 2, stem: "Predict and explain the results if the experiment were repeated with all the leaves removed from the stalks.",
        points: ["The dye would rise much less / more slowly at every temperature", "Little transpiration without leaves (few stomata), so little transpiration pull; any rise due to capillarity / root-free uptake only"],
        modelAnswer: "The dye would rise much less at every temperature, because without leaves there is very little transpiration and so very little transpiration pull; only a small rise by capillarity would occur.",
      }),
    ],
    explanation: "Higher temperature increases transpiration, so water and dye rise faster in the xylem.",
    hints: ["Leave out the anomaly before calculating a mean.", "Rate = distance ÷ time."],
  });
  chk(m35, 75);

  // ---------------------------------------------------------------- M4: trachea (Cambridge only)
  const barMag = magnification(16, "mm", 400, "µm");
  chk(barMag, 40);
  const cart = actualSize(26, "mm", barMag, "µm");
  chk(cart, 650);
  const goblets = [7, 9, 8, 10, 6];
  const gMean = mean(goblets);
  chk(gMean, 8);
  b.struct({
    d: 4, examStyle: true, skill: EXAM.PRACTICAL_MICROSCOPY.skill, secs: EXAM.PRACTICAL_MICROSCOPY.secs, applies: CAM, paper: "Cambridge Paper 3",
    concepts: [A("gas-exchange.system"), A("skills.biological-drawing")],
    stem: "A photomicrograph shows part of a transverse section of the trachea, with a scale bar labelled 400 µm that is 16 mm long. From the lumen outwards: a lining of tall columnar cells with hair-like projections, among which are pale, cup-shaped cells; a layer of connective tissue containing small rounded groups of gland cells; a thick band of glassy-looking tissue with small cells in spaces; and an outer layer of loose connective tissue.",
    parts: checkExam(EXAM.PRACTICAL_MICROSCOPY, [
      P.manual({
        label: "(a)", marks: 3, stem: "Describe the plan diagram you would draw of this part of the trachea wall.",
        points: [
          "Layers drawn as bands in correct order and proportion: epithelium (thin), connective tissue with glands, cartilage (thickest), outer connective tissue",
          "No individual cells drawn; glands shown as outlined regions only",
          "Sharp continuous lines, no shading; ruled label lines",
        ],
        modelAnswer: "A large drawing of the wall as a series of bands in correct order and proportion: a thin band of ciliated epithelium, a layer of connective tissue with outlined gland regions, a thick band of cartilage and an outer connective tissue layer. No cells, no shading, sharp continuous lines and ruled labels.",
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the magnification of the photomicrograph from the scale bar.",
        value: barMag, prefix: "×", wrong: [sfStr(16 / 400, 3), 25],
        explanation: t`$16\ \text{mm} = 16\,000\ \mu\text{m}$; $16\,000 \div 400 = \times 40$.`,
      }),
      P.num({
        label: "(c)", marks: 1, stem: "The cartilage band is 26 mm thick on the photomicrograph. Calculate its actual thickness in µm.",
        value: cart, unit: "µm", wrong: [0.65, 1040],
        explanation: t`$26\,000 \div 40 = 650\ \mu\text{m}$ (or $26 \div 16 \times 400$).`,
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Describe what your high-power drawing of four adjacent cells of the lining would show.",
        points: ["Tall columnar cell outlines of correct relative size, three with cilia drawn as a fringe on the free surface", "One goblet cell (cup-shaped, pale contents) in correct proportion; nuclei towards the base; no shading"],
        modelAnswer: "Four tall, narrow cells side by side, three with a fringe of cilia on the surface facing the lumen and one cup-shaped goblet cell with pale contents; nuclei near the base of each cell; correct proportions and no shading.",
      }),
      P.mcq({
        label: "(e)", stem: "What is the glassy-looking tissue with small cells in spaces?",
        options: [["Cartilage", "Correct: hyaline cartilage with chondrocytes in lacunae."], ["Smooth muscle", "Smooth muscle has spindle-shaped cells, not cells in spaces in a glassy matrix."], ["Squamous epithelium", "Squamous epithelium lines alveoli."], ["Elastic fibres", "Elastic fibres appear as wavy strands, not a glassy band."]],
        answer: "A", explanation: "**Hyaline cartilage** appears glassy, with chondrocytes in small spaces.",
      }),
      P.num({
        label: "(f)", marks: 1, stem: "Goblet cells were counted along a 0.2 mm length of lining in five fields: 7, 9, 8, 10 and 6. Calculate the mean number of goblet cells per 0.2 mm.",
        value: gMean, wrong: [40], explanation: t`$(7 + 9 + 8 + 10 + 6) \div 5 = 40 \div 5 = 8$.`,
      }),
      P.manual({
        label: "(g)", marks: 3, stem: "Describe a table showing three observable differences between this section and a section of a bronchiole.",
        points: ["Table with feature, trachea, bronchiole columns", "Cartilage present as a thick C-shaped band (trachea) / absent (bronchiole); glands present / absent", "Smooth muscle a thin strip (trachea) / thick ring (bronchiole); goblet cells many / few or none; lumen large / small and folded"],
        modelAnswer: "\n\n| Feature | Trachea | Bronchiole |\n|---|---|---|\n| Cartilage | Thick band | Absent |\n| Goblet cells | Many | Few or none |\n| Smooth muscle | Thin strip | Thick ring around the lumen |",
      }),
      P.manual({
        label: "(h)", marks: 2, stem: "Explain how the cells lining the lumen keep the airways clean.",
        points: ["Goblet cells (and glands) secrete mucus that traps dust and pathogens", "Cilia beat to move mucus up to the throat, where it is swallowed"],
        modelAnswer: "Goblet cells and the glands secrete mucus, which traps dust and pathogens; the cilia beat in rhythm, sweeping the mucus up to the throat, where it is swallowed.",
      }),
    ]),
    explanation: "Plan diagrams show layers only; magnification from a scale bar = bar length ÷ actual length; cartilage, cilia and goblet cells identify the trachea.",
    hints: ["Convert the scale bar to µm first."],
    calculator: true,
  });
});
