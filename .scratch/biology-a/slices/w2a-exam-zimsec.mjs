// W2a: ZIMSEC-only exam-format items: Paper 3 essays (ZIM_P3_ESSAY) and Paper 4 investigations (ZIM_P4_INVESTIGATION).
import { concept, P, t, chk, table, EXAM, checkExam, ZIM, capillaryVolume, mean, pctChange, dpStr, sfStr, rnd } from "../lib.mjs";

const A = (k) => `abio.${k}`;
const essay = (b, { concepts, d = 5, stem, a, bb, hints }) =>
  b.struct({
    d, examStyle: true, skill: EXAM.ZIM_P3_ESSAY.skill, secs: EXAM.ZIM_P3_ESSAY.secs, applies: EXAM.ZIM_P3_ESSAY.applies, paper: "ZIMSEC Paper 3",
    concepts, stem,
    parts: checkExam(EXAM.ZIM_P3_ESSAY, [
      P.manual({ label: "(a)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 }, ...a }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", wordLimit: { max: 550 }, ...bb }),
    ]),
    explanation: "Mark each part against the points: one mark for each point clearly made, up to the marks for the part.",
    hints,
  });

concept(A("plant-transport.water-uptake"), { file: "exam/w2a-zimsec", keyPrefix: "exam.w2a-zimsec", applies: ZIM }, (b) => {
  // ---------------------------------------------------------------- E1: water transport in plants
  essay(b, {
    concepts: [A("plant-transport.water-uptake"), A("plant-transport.transpiration"), A("plant-transport.tissues")],
    stem: "Answer both parts.",
    hints: ["In (a) follow the water from the soil to the root xylem, naming each pathway and barrier.", "In (b) explain evaporation, tension and cohesion, then each factor with its reason."],
    a: {
      stem: "Describe how water moves from the soil into the xylem of a root.",
      points: [
        "Root hairs give a large surface area in contact with soil water",
        "Water enters root hair cells by osmosis, from higher to lower water potential",
        "Active uptake of mineral ions keeps the water potential of root hair cells low",
        "Apoplast pathway: through cellulose cell walls and spaces of the cortex",
        "Symplast pathway: through cytoplasm and plasmodesmata (and vacuolar pathway through vacuoles)",
        "At the endodermis the Casparian strip (suberin) blocks the apoplast",
        "Water must pass through the cytoplasm / cross membranes of endodermis cells (control of ions)",
        "Ions pumped into the xylem lower its water potential, so water enters by osmosis (root pressure)",
      ],
      modelAnswer: "Root hairs provide a very large surface area in contact with the film of water around soil particles. Because root hair cells take up mineral ions by active transport, their water potential is lower than that of the dilute soil water, so water enters them by osmosis.\n\nWater then crosses the cortex by three routes. In the apoplast pathway it moves through the cellulose cell walls and intercellular spaces, pulled along by cohesion. In the symplast pathway it moves through the cytoplasm from cell to cell through plasmodesmata, and in the vacuolar pathway it also passes through the vacuoles.\n\nAt the endodermis, the Casparian strip of waterproof suberin blocks the apoplast, so water must cross the cell surface membrane and pass through the cytoplasm of the endodermis cells; this lets the plant control which ions enter the xylem. Cells of the endodermis and pericycle actively pump ions into the xylem, lowering its water potential, so water follows by osmosis and root pressure develops.",
    },
    bb: {
      stem: "Explain how water moves up the xylem of a tall plant, and how environmental factors affect the rate of transpiration.",
      points: [
        "Water evaporates from the walls of mesophyll cells into air spaces",
        "Water vapour diffuses out through stomata down a water vapour potential gradient",
        "Water lost is replaced from the xylem, creating tension (negative pressure) in the xylem",
        "Cohesion: hydrogen bonds hold water molecules together, so the column is pulled up (transpiration pull)",
        "Adhesion of water to the lignified / cellulose walls of xylem vessels supports the column (capillarity)",
        "Xylem vessels are continuous tubes (no end walls), lignified so they do not collapse",
        "Water moves by mass flow from roots to leaves",
        "Light: stomata open, so transpiration increases",
        "Temperature: faster evaporation and diffusion; warm air holds more water vapour",
        "Humidity: humid air reduces the water vapour potential gradient, so transpiration falls",
        "Wind: removes humid air from around the leaf, keeping the gradient steep",
        "Water shortage: stomata close (abscisic acid), reducing transpiration",
      ],
      modelAnswer: "Water evaporates from the wet cell walls of mesophyll cells into the air spaces of the leaf, and the water vapour diffuses out through open stomata down a water vapour potential gradient. The water lost is replaced from the xylem in the veins, which puts the water in the xylem under tension.\n\nWater molecules are held together by hydrogen bonds (cohesion), so the whole column of water is pulled up the xylem as one: the transpiration pull. Water also adheres to the hydrophilic walls of the vessels, which helps support the column. Xylem vessels are continuous, dead tubes without end walls, and their lignified walls stop them collapsing under the tension. Water therefore moves by mass flow from the roots to the leaves.\n\nThe rate of transpiration depends on the environment. In bright light the stomata open, so more water vapour escapes. A higher temperature increases evaporation and diffusion, and warm air can hold more vapour. High humidity reduces the water vapour potential gradient, so transpiration slows. Wind removes the humid air near the leaf surface, keeping the gradient steep and speeding transpiration. When water is short, guard cells lose turgor and stomata close, partly through abscisic acid, so transpiration falls.",
    },
  });

  // ---------------------------------------------------------------- E2: heart, blood pressure and exercise
  essay(b, {
    concepts: [A("mammal-transport.heart"), A("mammal-transport.blood-pressure-exercise")],
    stem: "Answer both parts.",
    hints: ["In (a) go through atrial systole, ventricular systole and diastole, naming each valve.", "In (b) start at the SAN, then link exercise to heart rate, stroke volume and blood pressure."],
    a: {
      stem: "Describe the events of the cardiac cycle.",
      points: [
        "Atrial systole: atria contract, pushing blood into the ventricles",
        "Atrioventricular valves open during atrial systole / semilunar valves closed",
        "Ventricular systole: ventricles contract from the apex upwards",
        "Ventricular pressure exceeds atrial pressure, so AV (tricuspid and bicuspid) valves close",
        "Ventricular pressure exceeds pressure in aorta / pulmonary artery, so semilunar valves open and blood is ejected",
        "Diastole: ventricles relax; pressure falls below arterial pressure so semilunar valves close",
        "AV valves open when ventricular pressure falls below atrial pressure",
        "Blood flows from veins into atria and ventricles (filling); cycle about 0.8 s at rest",
      ],
      modelAnswer: "The cardiac cycle has three stages. In atrial systole the atria contract and push blood through the open atrioventricular valves into the relaxed ventricles; the semilunar valves are closed.\n\nIn ventricular systole the ventricles contract, starting at the apex. As soon as ventricular pressure rises above atrial pressure the tricuspid and bicuspid valves close. Pressure keeps rising until it exceeds that in the aorta and pulmonary artery; the semilunar valves then open and blood is ejected.\n\nIn diastole the ventricles relax. When their pressure falls below arterial pressure the semilunar valves close, and when it falls below atrial pressure the atrioventricular valves open. Blood flows from the veins into the atria and on into the ventricles. At rest one cycle lasts about 0.8 s.",
    },
    bb: {
      stem: "Explain how the heartbeat is initiated and coordinated, and discuss how regular exercise and hypertension affect the cardiovascular system.",
      points: [
        "Heart muscle is myogenic; the SAN (pacemaker) in the right atrium wall generates waves of excitation",
        "Excitation spreads over both atria, which contract; non-conducting tissue stops it reaching the ventricles directly",
        "AVN delays the impulse (about 0.1 s) so atria empty before ventricles contract",
        "Bundle of His and Purkyne tissue carry excitation to the apex; ventricles contract from the apex upwards",
        "Rate adjusted by the cardiovascular centre (sympathetic / vagus nerves) and adrenaline",
        "Short term, exercise increases heart rate and stroke volume, so cardiac output rises; arterioles to muscles dilate",
        "Regular training enlarges / strengthens heart muscle, increasing stroke volume",
        "Resting heart rate falls; more capillaries in muscles; faster recovery after exercise",
        "Hypertension: persistently high resting blood pressure (e.g. well above about 120/80 mmHg)",
        "Risk factors: age, family history, high salt, obesity, inactivity, smoking, alcohol, stress",
        "Consequences: damage to artery endothelium, atherosclerosis, heart attack, stroke, heart / kidney failure",
        "Regular exercise helps lower resting blood pressure / an efficient cardiovascular system",
      ],
      modelAnswer: "Cardiac muscle is myogenic. Each beat starts at the sinoatrial node in the wall of the right atrium, which generates regular waves of excitation. These spread over both atria, which contract, but a layer of non-conducting tissue stops them reaching the ventricles directly. The atrioventricular node delays the excitation by about 0.1 s, so the atria empty before the ventricles contract. The excitation then passes down the bundle of His and up through the Purkyne tissue, so the ventricles contract from the apex upwards. The cardiovascular centre in the medulla adjusts the rate through sympathetic nerves and the vagus nerve, and adrenaline increases it.\n\nDuring exercise heart rate and stroke volume both rise, so cardiac output increases, and arterioles supplying the muscles dilate. With regular training the heart muscle becomes larger and stronger, so stroke volume increases and resting heart rate falls; more capillaries develop in the muscles and the pulse returns to normal faster after exercise. This is an efficient cardiovascular system.\n\nHypertension is a resting blood pressure that is persistently higher than normal, well above the typical 120/80 mmHg of a healthy young adult. Risk factors include age, family history, a high-salt diet, obesity, inactivity, smoking, heavy drinking and stress. High pressure damages the endothelium of arteries, encouraging atherosclerosis, which raises the risk of heart attack and stroke, and it overworks the heart and kidneys, which may fail. Regular exercise, less salt and a healthy weight help lower resting blood pressure.",
    },
  });

  // ---------------------------------------------------------------- E3: gas transport and sickle cell anaemia
  essay(b, {
    concepts: [A("mammal-transport.gas-transport"), A("nucleic.gene-mutation")],
    stem: "Answer both parts.",
    hints: ["In (a) cover oxygen loading and unloading, then the three ways CO₂ is carried.", "In (b) go from the base change to the amino acid, the protein, the cell and the symptoms, then general effects of mutations."],
    a: {
      stem: "Describe how oxygen and carbon dioxide are transported in the blood.",
      points: [
        "Oxygen combines reversibly with haemoglobin in red blood cells to form oxyhaemoglobin (four O₂ per Hb)",
        "High pO₂ in lungs: haemoglobin almost fully saturated; low pO₂ in tissues: oxygen released (S-shaped curve)",
        "Bohr shift: higher pCO₂ lowers the affinity, so more oxygen is released in active tissues",
        "CO₂ enters red cells; carbonic anhydrase forms carbonic acid, which dissociates to H⁺ and HCO₃⁻",
        "Most CO₂ (about 85%) carried as HCO₃⁻ in the plasma; chloride shift (Cl⁻ in)",
        "H⁺ taken up by haemoglobin to form haemoglobinic acid (buffer)",
        "Some CO₂ combines with amino groups of globin as carbaminohaemoglobin",
        "Some CO₂ dissolved in plasma",
      ],
      modelAnswer: "Oxygen is carried by haemoglobin in red blood cells. Each haemoglobin molecule combines reversibly with up to four oxygen molecules to form oxyhaemoglobin. In the lungs the partial pressure of oxygen is high and haemoglobin becomes almost fully saturated; in respiring tissues the partial pressure is low and oxygen is released, the S-shaped dissociation curve making unloading large for a small fall in pO₂. In active tissues the higher partial pressure of carbon dioxide lowers haemoglobin's affinity for oxygen (the Bohr shift), so even more oxygen is released.\n\nCarbon dioxide diffuses into red blood cells, where carbonic anhydrase catalyses its reaction with water to form carbonic acid. This dissociates into hydrogen ions and hydrogencarbonate ions. Most of the carbon dioxide, about 85%, is carried as hydrogencarbonate ions in the plasma; chloride ions move into the red cells to balance them (the chloride shift). The hydrogen ions combine with haemoglobin to form haemoglobinic acid, which buffers the blood. Some carbon dioxide combines with the amino groups of the globin chains as carbaminohaemoglobin, and a little is carried dissolved in the plasma.",
    },
    bb: {
      stem: "Explain how a gene mutation causes sickle cell anaemia, and discuss why different gene mutations have different effects on the phenotype.",
      points: [
        "A gene mutation is a change in the base sequence of DNA",
        "Sickle cell: substitution of one base in the β-globin gene, GAG → GTG (mRNA GAG → GUG)",
        "Glutamic acid replaced by valine at position 6 of the β chain",
        "Valine is non-polar / hydrophobic; at low oxygen HbS molecules stick together into fibres",
        "Red blood cells become sickle-shaped / rigid, block capillaries, causing pain and organ damage",
        "Sickle cells destroyed faster, causing anaemia; homozygous HbS HbS have the disease, heterozygotes have the trait",
        "Silent substitution: degenerate code, so the amino acid is unchanged / no effect",
        "Missense: one amino acid changed; effect depends on position (e.g. active site) and type of R group",
        "Nonsense: a stop codon gives a shortened, usually non-functional polypeptide",
        "Insertion or deletion of one or two bases causes a frameshift, changing all later amino acids",
        "Mutations in non-coding DNA (introns) usually have no effect; recessive alleles masked in heterozygotes",
        "Phenotype also depends on the environment, e.g. low oxygen at altitude triggers sickling / mutagens increase mutation rate",
      ],
      modelAnswer: "A gene mutation is a change in the sequence of bases in DNA. In the gene for the β-globin chain of haemoglobin, a single base substitution changes the triplet GAG to GTG, so the mRNA codon becomes GUG instead of GAG and valine replaces glutamic acid as the sixth amino acid. Valine has a non-polar, hydrophobic R group, so when haemoglobin S is deoxygenated its molecules stick together and form long fibres. Red blood cells become rigid and sickle-shaped, block capillaries, causing pain and organ damage, and are destroyed faster than normal cells, causing anaemia. People with two HbS alleles have sickle cell anaemia; carriers with one have sickle cell trait.\n\nNot all mutations have such effects. Because the genetic code is degenerate, many substitutions are silent and the amino acid is unchanged. A missense mutation changes one amino acid; its effect depends on where it is, for example in the active site of an enzyme, and on how different the new R group is. A nonsense mutation creates a stop codon, giving a shortened, usually non-functional polypeptide. Inserting or deleting one or two bases shifts the reading frame, so every later amino acid may change. Mutations in introns or other non-coding DNA usually have no effect, and a recessive mutant allele is masked in a heterozygote. Finally, the phenotype also depends on the environment: sickling is triggered by low oxygen, for example at high altitude, and mutagens such as radiation and aflatoxins increase the rate of mutation.",
    },
  });

  // ---------------------------------------------------------------- I1: ZIMSEC P4 investigation, leaf number and water uptake
  const leaves = [8, 6, 4, 2, 0];
  const dist = [[84, 80, 85], [65, 61, 66], [44, 48, 18], [24, 29, 26], [7, 6, 7]];
  const m4 = mean([dist[2][0], dist[2][1]]);
  chk(m4, 46);
  const m8 = mean(dist[0]);
  chk(m8, 83);
  const rate8 = capillaryVolume(0.5, m8) / 6;
  b.struct({
    d: 4, examStyle: true, skill: EXAM.ZIM_P4_INVESTIGATION.skill, secs: EXAM.ZIM_P4_INVESTIGATION.secs, applies: EXAM.ZIM_P4_INVESTIGATION.applies, paper: "ZIMSEC Paper 4",
    concepts: [A("plant-transport.transpiration"), A("skills.practical-investigation")],
    stem: `Tatenda investigated the effect of the number of leaves on the rate of water uptake by a leafy shoot.

1. A shoot with eight leaves of similar size was cut under water and fitted into a bubble potometer (capillary radius 0.5 mm) under water.
2. The shoot was left for 10 minutes in constant light and temperature.
3. The distance moved by the bubble in 6 minutes was measured three times.
4. Two leaves were cut off, the cut surfaces were sealed with petroleum jelly, and steps 2 and 3 were repeated, until no leaves remained.

${table(["Number of leaves", "Distance 1 / mm", "Distance 2 / mm", "Distance 3 / mm"], leaves.map((n, i) => [n, ...dist[i]]))}`,
    parts: checkExam(EXAM.ZIM_P4_INVESTIGATION, [
      P.group({
        label: "(a)", stem: "Variables.",
        parts: [
          P.short({ label: "(i)", marks: 1, stem: "State the independent variable.", accepted: ["number of leaves", "the number of leaves", "leaf number", "number of leaves on the shoot", "leaf area"], wrong: ["distance moved"], explanation: "The number of leaves was changed." }),
          P.manual({ label: "(ii)", marks: 1, stem: "State the dependent variable.", points: ["Distance moved by the bubble in 6 minutes / rate of water uptake"], modelAnswer: "The distance moved by the bubble in 6 minutes, a measure of the rate of water uptake." }),
          P.manual({ label: "(iii)", marks: 2, stem: "State two variables that were standardised.", points: ["Light intensity / temperature", "Time of each reading (6 min) / same shoot / same capillary / equilibration time (10 min) / leaves of similar size"], modelAnswer: "Light intensity and temperature were kept constant, and each reading was taken over 6 minutes with the same shoot and potometer." }),
        ],
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Describe how Tatenda's results table could be improved to include processed results.",
        points: ["Add a column for mean distance / mm", "Add a column for rate of water uptake / mm³ min⁻¹ (volume ÷ time)", "Headings with units (quantity / unit), units not in the body; consistent decimal places for processed values"],
        modelAnswer: "Add a column for mean distance / mm (excluding anomalies) and a column for the rate of water uptake / mm³ min⁻¹, with units only in the headings and processed values given to a consistent number of decimal places.",
      }),
      P.group({
        label: "(c)", stem: "Processing the results.",
        parts: [
          P.mcq({
            label: "(i)", stem: "Which reading is anomalous?",
            options: [["18 mm with four leaves", "Correct: far below 44 and 48 mm."], ["80 mm with eight leaves", "Close to 84 and 85 mm."], ["6 mm with no leaves", "Close to the other two readings of 7 mm."], ["61 mm with six leaves", "Close to 65 and 66 mm."]],
            answer: "A", explanation: "18 mm is less than half the other readings at four leaves.",
          }),
          P.num({ label: "(ii)", marks: 1, stem: "Calculate the mean distance with four leaves, leaving out the anomalous reading.", value: m4, unit: "mm", wrong: [sfStr(mean(dist[2]), 3)], explanation: t`$(44 + 48) \div 2 = 46$ mm. Including 18 mm gives ${sfStr(mean(dist[2]), 3)} mm.` }),
          P.num({
            label: "(iii)", marks: 2, stem: "Calculate the rate of water uptake with eight leaves in mm³/min, to three significant figures.",
            value: rate8, sf: 3, unit: "mm³/min", wrong: [sfStr(capillaryVolume(0.5, m8), 3), sfStr(capillaryVolume(0.25, m8) / 4, 3)],
            explanation: t`Mean $= 83$ mm. Volume $= \pi \times 0.5^2 \times 83 = ${sfStr(capillaryVolume(0.5, m8), 4)}\ \text{mm}^3$. Rate $= ${sfStr(capillaryVolume(0.5, m8), 4)} \div 6 = ${sfStr(rate8, 3)}\ \text{mm}^3\ \text{min}^{-1}$.`,
          }),
        ],
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Describe the graph of mean distance against number of leaves.",
        points: ["Distance increases as the number of leaves increases (roughly in proportion / straight line)", "Quote values: about 7 mm with no leaves rising to 83 mm with eight leaves"],
        modelAnswer: "The mean distance rises steadily, almost in a straight line, with the number of leaves, from about 7 mm with no leaves to 83 mm with eight leaves.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain the results.",
        points: ["More leaves give a larger surface area / more stomata for transpiration", "More water evaporates and diffuses out, so a greater transpiration pull draws more water up the xylem / taken up"],
        modelAnswer: "More leaves provide more stomata and a larger surface area for transpiration, so more water vapour is lost and a greater transpiration pull draws more water up the stem from the potometer.",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "Identify one systematic error and one random error in this investigation.",
        points: ["Systematic: e.g. small leak at a joint / water used by the shoot (uptake slightly greater than transpiration) / time lag before starting the stopwatch", "Random: e.g. reading the bubble position by eye / fluctuations in temperature or air movement / leaves differing in size"],
        modelAnswer: "A systematic error is that some water taken up is used by the shoot rather than transpired, or a slow leak at a joint. A random error is judging the position of the bubble by eye, or small changes in air movement between readings.",
      }),
      P.manual({
        label: "(g)", marks: 2, stem: "Suggest two improvements to the investigation.",
        points: ["Measure the total leaf area removed (e.g. trace on graph paper) and express uptake per unit leaf area", "Use several shoots / more replicates and repeat the anomaly; control air movement / use a fan at a fixed setting; use a thermostatically controlled room"],
        modelAnswer: "Measure the area of the leaves removed by tracing them on graph paper, so that uptake can be related to leaf area, and repeat the whole investigation with several shoots of the same species, repeating any anomalous reading.",
      }),
      P.manual({
        label: "(h)", marks: 1, stem: "Suggest why some water was still taken up when no leaves remained.",
        points: ["Water lost through the stem / cuticle or lenticels / cut leaf bases not fully sealed / water used to keep stem cells turgid"],
        modelAnswer: "Some water was still lost through the stem surface and imperfectly sealed leaf scars, and some was taken into stem cells.",
      }),
    ]),
    explanation: "Water uptake rises with the number of leaves because more leaf surface and stomata increase transpiration.",
    hints: ["Leave anomalies out of the mean.", "Volume = πr²l; divide by time."],
    calculator: true,
  });

  // ---------------------------------------------------------------- I2: ZIMSEC P4 investigation, duration of exercise and pulse rate
  const dur = [0, 1, 2, 3, 4];
  const pulse = [[64, 56, 63], [90, 94, 91], [108, 114, 107], [123, 89, 126], [131, 135, 133]];
  const rest = mean(pulse[0]);
  const m2 = mean(pulse[2]);
  const pc = pctChange(rest, m2);
  chk(rest, 61);
  b.struct({
    d: 4, examStyle: true, skill: EXAM.ZIM_P4_INVESTIGATION.skill, secs: EXAM.ZIM_P4_INVESTIGATION.secs, applies: EXAM.ZIM_P4_INVESTIGATION.applies, paper: "ZIMSEC Paper 4",
    concepts: [A("mammal-transport.blood-pressure-exercise"), A("skills.practical-investigation")],
    stem: `A student investigated the effect of the duration of exercise on pulse rate.

1. The student sat quietly for 5 minutes, then counted the pulse at the wrist for 30 s and doubled it.
2. The student stepped on and off a 30 cm step at a fixed rate (set by a metronome) for 1 minute, then immediately measured the pulse as in step 1.
3. After resting until the pulse returned to the resting value, the student repeated step 2 for 2, 3 and 4 minutes.
4. The whole procedure was carried out three times on different days.

${table(["Duration of exercise / min", "Pulse rate, trial 1 / beats per min", "Pulse rate, trial 2 / beats per min", "Pulse rate, trial 3 / beats per min"], dur.map((d, i) => [d, ...pulse[i]]))}`,
    parts: checkExam(EXAM.ZIM_P4_INVESTIGATION, [
      P.group({
        label: "(a)", stem: "Variables.",
        parts: [
          P.short({ label: "(i)", marks: 1, stem: "State the independent variable.", accepted: ["duration of exercise", "time spent exercising", "length of exercise", "exercise duration", "time of exercise", "duration"], wrong: ["pulse rate"], explanation: "The duration of exercise was changed." }),
          P.manual({ label: "(ii)", marks: 1, stem: "State the dependent variable.", points: ["Pulse rate immediately after exercise (beats per minute)"], modelAnswer: "The pulse rate immediately after exercise, in beats per minute." }),
          P.manual({ label: "(iii)", marks: 2, stem: "State two variables that were standardised.", points: ["Height of step (30 cm) / rate of stepping (metronome)", "Same person / same method of pulse measurement (30 s count) / rest before each trial"], modelAnswer: "The step height and stepping rate were fixed, and the pulse was always counted the same way at the wrist for 30 s." }),
        ],
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Suggest why the student rested until the pulse returned to the resting value before each new duration.",
        points: ["So that each reading started from the same baseline", "Otherwise the effect of the previous exercise would add to the next reading"],
        modelAnswer: "Each test then started from the same resting baseline, so the effect of the previous bout of exercise did not carry over into the next reading.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why counting for 30 s and doubling is less accurate than counting for a full minute, and why it was still used.",
        points: ["A miscount of one beat gives an error of two beats per minute / shorter count has a larger percentage error", "Pulse falls quickly after exercise, so a short count measures the rate immediately after exercise"],
        modelAnswer: "Each miscounted beat in 30 s becomes an error of 2 beats per minute, so the result is less precise; but the pulse starts falling as soon as exercise stops, so a short count gives a better measure of the rate immediately after exercise.",
      }),
      P.group({
        label: "(d)", stem: "Processing the results.",
        parts: [
          P.mcq({
            label: "(i)", stem: "Which reading is anomalous?",
            options: [["89 beats per min after 3 minutes", "Correct: far below 123 and 126."], ["56 beats per min at rest", "Within a few beats of 64 and 63."], ["135 beats per min after 4 minutes", "Close to 131 and 133."], ["90 beats per min after 1 minute", "Close to 94 and 91."]],
            answer: "A", explanation: "89 does not fit the other two readings after 3 minutes.",
          }),
          P.num({ label: "(ii)", marks: 1, stem: "Calculate the mean pulse rate after 2 minutes of exercise, to the nearest whole number.", value: m2, dp: 0, unit: "beats/min", wrong: [329], explanation: t`$(108 + 114 + 107) \div 3 = ${dpStr(m2, 2)} \approx ${dpStr(m2, 0)}$ beats per minute.` }),
          P.num({
            label: "(iii)", marks: 2, stem: "Calculate the percentage increase in mean pulse rate after 2 minutes of exercise compared with the mean resting pulse rate. Give your answer to the nearest whole number.",
            value: pc, dp: 0, unit: "%", wrong: [sfStr(pctChange(m2, rest), 2), sfStr(m2 - rest, 2)],
            explanation: t`Mean resting rate $= (64 + 56 + 63) \div 3 = 61$. Increase $= \dfrac{${dpStr(m2, 2)} - 61}{61} \times 100 = ${dpStr(pc, 1)} \approx ${dpStr(pc, 0)}\%$.`,
          }),
        ],
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Describe how pulse rate changes with the duration of exercise.",
        points: ["Pulse rate increases with duration of exercise", "Increase is greatest at first and becomes smaller at longer durations (e.g. about +31 from 0 to 1 min, about +9 from 3 to 4 min) / quote figures with units"],
        modelAnswer: "Pulse rate rises with the duration of exercise, from a mean of 61 beats per minute at rest to 133 beats per minute after 4 minutes; the rise is steepest in the first minutes and smaller between 3 and 4 minutes.",
      }),
      P.manual({
        label: "(f)", marks: 3, stem: "Explain why pulse rate increases during exercise.",
        points: ["Muscles respire faster, needing more oxygen and glucose and producing more CO₂", "Rise in CO₂ / fall in pH detected; cardiovascular centre sends more impulses (sympathetic) to the SAN / adrenaline released", "Heart rate (and stroke volume) increase, so cardiac output rises, delivering more oxygen and removing CO₂"],
        modelAnswer: "During exercise the leg muscles respire faster, needing more oxygen and glucose and producing more carbon dioxide. The rise in carbon dioxide is detected and the cardiovascular centre sends more impulses along sympathetic nerves to the SAN, helped by adrenaline, so heart rate and stroke volume increase. Cardiac output rises, delivering more oxygen to the muscles and removing carbon dioxide faster.",
      }),
      P.manual({
        label: "(g)", marks: 1, stem: "State one safety precaution for this investigation.",
        points: ["Stop if dizzy / unwell; person with a heart or breathing condition should not take part; step placed on a non-slip surface"],
        modelAnswer: "Anyone with a heart or breathing condition should not take part, and the exercise should stop if the student feels dizzy.",
      }),
      P.manual({
        label: "(h)", marks: 2, stem: "Suggest two ways to make the conclusion more reliable.",
        points: ["Test more people (several students) and calculate means", "Use a pulse monitor / heart rate monitor for continuous, accurate readings; repeat anomalous readings"],
        modelAnswer: "Test several students rather than one and calculate means, and use an electronic heart rate monitor to read the pulse accurately at the moment exercise stops, repeating any anomalous result.",
      }),
    ]),
    explanation: "Pulse rate rises with exercise duration as cardiac output increases to supply respiring muscles.",
    hints: ["Leave anomalies out of means.", "Percentage increase = (new − resting) ÷ resting × 100."],
    calculator: true,
  });
});
