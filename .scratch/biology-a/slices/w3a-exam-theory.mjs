// W3a: THEORY10 exam-format items (ZIMSEC Paper 2; Cambridge Paper 4, A Level concepts).
import { concept, P, t, chk, sfStr, dpStr, table, EXAM, checkExam, CAM, rq, pctChange, inverseSquare } from "../lib.mjs";

const A = (k) => `abio.${k}`;
const theory = (b, o) =>
  b.struct({
    d: o.d ?? 4, examStyle: true, skill: EXAM.THEORY10.skill, secs: EXAM.THEORY10.secs, paper: o.paper ?? "ZIMSEC P2 / Cambridge P4",
    concepts: o.concepts, stem: o.stem, applies: o.applies,
    parts: checkExam(EXAM.THEORY10, o.parts),
    explanation: o.explanation, hints: o.hints, calculator: o.calculator,
  });

concept(A("respiration.oxidative-phosphorylation"), { file: "exam/w3a-theory", keyPrefix: "exam.w3a-theory" }, (b) => {
  // ---------------------------------------------------------------- T1: mitochondria, cyanide and an uncoupler
  const rows = [
    ["1", "Pyruvate", "40", "100"],
    ["2", "Pyruvate + cyanide", "2", "3"],
    ["3", "Pyruvate + an uncoupler", "70", "10"],
    ["4", "Glucose", "3", "2"],
  ];
  const pcCy = pctChange(40, 2);
  chk(pcCy, -95);
  theory(b, {
    concepts: [A("respiration.oxidative-phosphorylation"), A("respiration.glycolysis-krebs")],
    stem: `A suspension of mitochondria isolated from rat liver was given different substrates and inhibitors, with oxygen, ADP and phosphate present. The rates of oxygen uptake and ATP production were measured.\n\n${table(["Tube", "Additions", "Oxygen uptake / arbitrary units", "ATP production / arbitrary units"], rows)}\n\nAn uncoupler is a substance that makes the inner mitochondrial membrane permeable to protons.`,
    parts: [
      P.mcq({
        label: "(a)", stem: "Which is the best explanation for the results in tube 4?",
        options: [["Mitochondria lack the enzymes of glycolysis", "Correct: glucose is not used."], ["Glucose cannot be oxidised by any cell", "Cells oxidise glucose via glycolysis in the cytoplasm."], ["Glucose inhibits the electron transport chain", "Glucose is not an inhibitor."], ["Glucose is converted to lactate in the matrix", "Lactate fermentation is cytoplasmic."]],
        answer: "A", explanation: "Glycolysis happens in the cytoplasm, which is absent.",
      }),
      P.num({
        label: "(b)", marks: 1, stem: "Calculate the percentage change in oxygen uptake when cyanide is added (tube 2 compared with tube 1). Include the sign.",
        value: pcCy, unit: "%", wrong: [95, -2000], explanation: t`$\dfrac{2 - 40}{40} \times 100 = ${pcCy}\%$.`,
      }),
      P.short({
        label: "(c)", marks: 1, stem: "Name the final electron acceptor in tube 1.",
        accepted: ["oxygen", "O2", "O₂", "molecular oxygen"], wrong: ["NAD"], explanation: "**Oxygen.**",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Cyanide binds to the last carrier of the electron transport chain. Explain the results in tube 2.",
        points: ["Electrons cannot be passed to oxygen, so oxygen is not taken up / electron flow stops", "No energy released to pump protons into the intermembrane space, so no proton gradient", "No protons flow through ATP synthase, so (almost) no ATP is made"],
        modelAnswer: "With the last carrier blocked, electrons cannot pass to oxygen, so oxygen uptake almost stops and electron flow along the chain stops. No energy is released to pump protons into the intermembrane space, so no gradient forms, no protons flow through ATP synthase and almost no ATP is made.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain why, in tube 3, oxygen uptake is high but ATP production is low.",
        points: ["Electron transport continues (faster), so oxygen is still used as the final acceptor", "Protons leak back across the membrane, not through ATP synthase, so the gradient is lost and little ATP is made (energy released as heat)"],
        modelAnswer: "Electrons still flow along the chain to oxygen, even faster, so oxygen uptake is high. But protons leak back across the inner membrane instead of passing through ATP synthase, so the proton gradient collapses, little ATP is made and the energy is released as heat.",
      }),
      P.num({
        label: "(f)", marks: 1, stem: "How many molecules of reduced NAD are produced from ONE molecule of pyruvate in the link reaction and one turn of the Krebs cycle?",
        value: 1 + 3, wrong: [3, 5], explanation: "Link reaction 1 + Krebs cycle 3 = **4**.",
      }),
      P.tf({
        label: "(g)", stem: "True or false: in tube 1, protons are pumped from the intermembrane space into the matrix by the electron transport chain.",
        answer: false, explanation: "False. They are pumped **from the matrix into the intermembrane space** and return through ATP synthase.",
      }),
    ],
    explanation: "Cyanide stops electron flow; an uncoupler stops the gradient; mitochondria cannot use glucose.",
    hints: ["Separate electron flow (oxygen uptake) from proton flow through ATP synthase (ATP production)."],
    calculator: true,
  });

  // ---------------------------------------------------------------- T2: RQ of germinating seeds
  const seeds = [["Pea, day 1", 8, 20], ["Pea, day 4", 45, 45], ["Sunflower, day 4", 50, 35]];
  const rqPea1 = rq(20, 8), rqSun = rq(35, 50);
  chk(rqPea1, 2.5); chk(rqSun, 0.7);
  theory(b, {
    concepts: [A("respiration.substrates-rq"), A("respiration.anaerobic")],
    stem: `The volumes of oxygen taken in and carbon dioxide given out by germinating seeds were measured with respirometers at 25 °C over one hour.\n\n${table(["Seeds", "Oxygen taken in / mm³", "Carbon dioxide given out / mm³"], seeds)}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the RQ of the sunflower seeds, to two decimal places.", value: rqSun, dp: 2, wrong: [dpStr(1 / rqSun, 2)], explanation: t`$35 \div 50 = ${dpStr(rqSun, 2)}$.` }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the RQ of the pea seeds on day 1, to two decimal places.", value: rqPea1, dp: 2, wrong: [dpStr(1 / rqPea1, 2)], explanation: t`$20 \div 8 = ${dpStr(rqPea1, 2)}$.` }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain why the RQ of the pea seeds on day 1 is greater than 1.",
        points: ["Testa (seed coat) still intact / little oxygen can reach the cells", "Some respiration is anaerobic (ethanol fermentation)", "Anaerobic respiration releases CO₂ without taking in oxygen, so CO₂ given out exceeds O₂ taken in"],
        modelAnswer: "On day 1 the seed coat is still largely intact and limits the oxygen reaching the cells, so some respiration is anaerobic. Ethanol fermentation releases carbon dioxide without taking in any oxygen, so more carbon dioxide is given out than oxygen is taken in.",
      }),
      P.mcq({
        label: "(d)", stem: "Which substrate are the pea seeds mainly respiring on day 4?",
        options: [["Carbohydrate", "Correct: RQ = 45 ÷ 45 = 1.0; peas store starch."], ["Lipid", "Lipid gives about 0.7."], ["Protein", "Protein gives about 0.9."], ["A mixture of lipid and protein only", "The RQ of 1.0 matches carbohydrate."]],
        answer: "A", explanation: "RQ 1.0 → carbohydrate.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain why the sunflower seeds release more energy per gram of stored food than the pea seeds.",
        points: ["Sunflower seeds store lipid (RQ about 0.7); peas store carbohydrate", "Lipids have more hydrogen atoms per gram, so more reduced NAD / FAD and more ATP from oxidative phosphorylation"],
        modelAnswer: "The RQ shows sunflower seeds respire lipid, while peas respire carbohydrate. Lipids contain more hydrogen atoms per gram, which provide more reduced NAD and FAD for the electron transport chain, so more ATP and energy are released per gram.",
      }),
      P.mcq({
        label: "(f)", stem: "How was the volume of oxygen taken in measured separately from the carbon dioxide given out?",
        options: [["Potassium hydroxide absorbed the carbon dioxide, so the liquid moved only because of oxygen uptake", "Correct."], ["Potassium hydroxide absorbed the oxygen, so the liquid moved only because of carbon dioxide release", "KOH absorbs CO₂, not O₂."], ["A water bath removed the carbon dioxide from the tube", "A water bath controls temperature."], ["Glass beads in a control tube absorbed both gases", "Glass beads do not absorb gases."]],
        answer: "A", explanation: "KOH absorbs **CO₂**.",
      }),
      P.short({ label: "(g)", marks: 1, stem: "Name the organic product of anaerobic respiration in the pea seeds on day 1.", accepted: ["ethanol", "alcohol", "ethyl alcohol"], wrong: ["lactate"], explanation: "**Ethanol** (plants carry out ethanol fermentation)." }),
    ],
    explanation: "RQ = CO₂ ÷ O₂; values above 1 indicate anaerobic respiration.",
    hints: ["RQ = CO₂ given out ÷ O₂ taken in."],
    calculator: true,
  });

  // ---------------------------------------------------------------- T3: fractions of chloroplasts
  const frac = [
    ["A", "Thylakoids + NADP", "Light", "High", "None"],
    ["B", "Stroma only", "Light", "None", "None"],
    ["C", "Stroma + ATP + reduced NADP", "Dark", "None", "High"],
    ["D", "Thylakoids + stroma", "Light", "High", "High"],
    ["E", "Thylakoids + stroma", "Dark", "None", "Very low"],
  ];
  const nCO2 = 15;
  const nadph = nCO2 * 2;
  const o2 = nadph / 2;
  chk(nadph, 30); chk(o2, 15);
  theory(b, {
    concepts: [A("photosynthesis.light-dependent"), A("photosynthesis.calvin-c4")],
    stem: `Chloroplasts from spinach leaves were broken open and separated into thylakoids and stroma. Each fraction, or a mixture, was given carbon dioxide and the additions shown, in light or in darkness. Oxygen release and carbon dioxide fixation were measured.\n\n${table(["Tube", "Contents", "Conditions", "Oxygen released", "CO₂ fixed"], frac)}`,
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name the enzyme in the stroma that fixes carbon dioxide.", accepted: ["rubisco", "RuBisCO", "ribulose bisphosphate carboxylase", "ribulose bisphosphate carboxylase oxygenase", "ribulose bisphosphate carboxylase/oxygenase"], wrong: ["ATP synthase"], explanation: "**Rubisco.**" }),
      P.short({ label: "(b)", marks: 1, stem: "Name the 3-carbon compound formed when carbon dioxide is fixed.", accepted: ["glycerate 3-phosphate", "GP", "glycerate-3-phosphate", "3-phosphoglycerate", "PGA", "glycerate phosphate"], wrong: ["triose phosphate"], explanation: "**Glycerate 3-phosphate (GP).**" }),
      P.mcq({
        label: "(c)", stem: "Why does tube C fix carbon dioxide in the dark?",
        options: [["It has been given the products of the light-dependent stage", "Correct: ATP and reduced NADP drive the Calvin cycle."], ["The stroma contains chlorophyll that works in the dark", "Chlorophyll is in the thylakoids and needs light."], ["Rubisco only works in the dark", "Rubisco works in light or dark if substrates are present."], ["Carbon dioxide is fixed by photolysis in the stroma", "Photolysis is on the thylakoids and releases oxygen."]],
        answer: "A", explanation: "The Calvin cycle needs only ATP, reduced NADP, CO₂ and its enzymes.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain why oxygen is released in tube A.",
        points: ["Light excites electrons in photosystem II (chlorophyll), which leave the reaction centre", "Water is split by photolysis to replace them, releasing oxygen (NADP accepts the electrons)"],
        modelAnswer: "Light excites electrons in photosystem II and they leave the reaction centre, passing eventually to NADP. Water is split by photolysis to replace them, and oxygen is released.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain why no carbon dioxide is fixed in tube B.",
        points: ["No thylakoids, so no ATP or reduced NADP made", "GP cannot be reduced to TP and RuBP cannot be regenerated, so fixation stops"],
        modelAnswer: "Without thylakoids no ATP or reduced NADP is made, so GP cannot be reduced to triose phosphate and RuBP cannot be regenerated; once any RuBP present is used, no more CO₂ is fixed.",
      }),
      P.num({
        label: "(f)", marks: 1, stem: "Each CO₂ fixed in the Calvin cycle needs 2 reduced NADP. How many reduced NADP are needed to fix 15 molecules of CO₂?",
        value: nadph, wrong: [nCO2, 45], explanation: t`$15 \times 2 = ${nadph}$.`,
      }),
      P.num({
        label: "(g)", marks: 1, stem: "Each reduced NADP needs 2 electrons, and splitting 2 molecules of water releases 4 electrons and 1 molecule of oxygen. How many molecules of oxygen are released when the NADP in (f) is reduced?",
        value: o2, wrong: [nadph, 60], explanation: t`$30 \times 2 = 60$ electrons; $60 \div 4 = ${o2}$ O₂.`,
      }),
      P.tf({ label: "(h)", stem: "True or false: cyclic photophosphorylation produces reduced NADP.", answer: false, explanation: "False. Cyclic photophosphorylation produces **ATP only**." }),
    ],
    explanation: "Thylakoids make ATP, reduced NADP and oxygen in light; the stroma fixes CO₂ when given ATP and reduced NADP.",
    hints: ["Which fraction needs light, and which needs ATP and reduced NADP?"],
  });

  // ---------------------------------------------------------------- T4: leaf discs, light and hydrogencarbonate
  const dist = [10, 15, 20, 30];
  const low = [300, 320, 400, 800];
  const high = [150, 200, 380, 790];
  const rate = 1000 / high[0];
  const ratio = inverseSquare(10) / inverseSquare(20);
  chk(ratio, 4);
  theory(b, {
    concepts: [A("photosynthesis.limiting-factors")],
    stem: `Leaf discs with the air removed were placed in sodium hydrogencarbonate solution of two concentrations, with a lamp at different distances, at 25 °C. The time for 5 of 10 discs to float was recorded.\n\n${table(["Distance of lamp / cm", ...dist.map(String)], [["Time in 0.2% hydrogencarbonate / s", ...low.map(String)], ["Time in 1.0% hydrogencarbonate / s", ...high.map(String)]])}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the rate of photosynthesis as 1000/time for 1.0% hydrogencarbonate at 10 cm, in s⁻¹, to three significant figures.", value: rate, sf: 3, unit: "s⁻¹", wrong: [0.15], explanation: t`$1000 \div 150 = ${sfStr(rate, 3)}$ s⁻¹.` }),
      P.num({ label: "(b)", marks: 1, stem: "By what factor is the light intensity at 10 cm greater than at 20 cm?", value: ratio, wrong: [2], explanation: "Inverse square law: (20 ÷ 10)² = **4**." }),
      P.mcq({
        label: "(c)", stem: "Why do the leaf discs float?",
        options: [["Oxygen from photosynthesis collects in the air spaces", "Correct."], ["Carbon dioxide from the solution collects in the air spaces", "CO₂ is used in photosynthesis."], ["The discs lose water and become lighter", "They are in solution."], ["Starch made in the discs is less dense than water", "Starch is denser than water."]],
        answer: "A", explanation: "Oxygen makes the discs buoyant.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Identify the limiting factor at 30 cm and give the evidence from the table.",
        points: ["Light intensity", "Times at the two hydrogencarbonate concentrations are almost the same (800 s and 790 s), so raising CO₂ has no effect"],
        modelAnswer: "Light intensity is limiting at 30 cm, because increasing the hydrogencarbonate concentration makes almost no difference (800 s and 790 s).",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Identify the limiting factor at 10 cm in 0.2% hydrogencarbonate and give the evidence.",
        points: ["Carbon dioxide concentration", "Raising hydrogencarbonate to 1.0% halves the time (300 s to 150 s); moving the lamp closer from 15 cm to 10 cm in 0.2% has little effect (320 s to 300 s)"],
        modelAnswer: "Carbon dioxide concentration is limiting, because raising the hydrogencarbonate to 1.0% halves the time from 300 s to 150 s, while moving the lamp from 15 cm to 10 cm in 0.2% changes the time only from 320 s to 300 s.",
      }),
      P.short({ label: "(f)", marks: 1, stem: "State the gas supplied by the sodium hydrogencarbonate.", accepted: ["carbon dioxide", "CO2", "CO₂"], wrong: ["oxygen"], explanation: "**Carbon dioxide.**" }),
      P.manual({
        label: "(g)", marks: 1, stem: "Describe how the temperature could be kept at 25 °C as the lamp is moved closer.",
        points: ["Heat filter (beaker / tank of water) between lamp and discs, or LED lamp, or water bath at 25 °C checked with a thermometer"],
        modelAnswer: "Place a glass tank of water between the lamp and the discs as a heat filter and check the temperature with a thermometer.",
      }),
      P.tf({ label: "(h)", stem: "True or false: halving the distance of the lamp doubles the light intensity.", answer: false, explanation: "False. It increases the light intensity **four** times." }),
    ],
    explanation: "Where changing a factor changes the rate, that factor is limiting.",
    hints: ["Compare the two rows at each distance.", "Rate = 1000 ÷ time."],
    calculator: true,
  });

  // ---------------------------------------------------------------- T5: ADH and urine flow (Cambridge)
  const tm = [0, 30, 60, 90, 120, 150];
  const flow = [0.9, 4.2, 7.2, 4.6, 1.9, 1.1];
  const adh = [3.0, 1.2, 0.5, 0.8, 2.0, 2.8];
  const pcFlow = pctChange(flow[0], flow[2]);
  chk(pcFlow, 700);
  const gfr = 120;
  const reab = ((gfr - flow[2]) / gfr) * 100;
  theory(b, {
    applies: CAM, paper: "Cambridge P4",
    concepts: [A("homeostasis.kidney")],
    stem: `Sipho drank 1 dm³ of water at time 0. His rate of urine flow and the concentration of ADH in his blood plasma were measured.\n\n${table(["Time / min", ...tm.map(String)], [["Urine flow / cm³ min⁻¹", ...flow.map((x) => x.toFixed(1))], ["Plasma ADH / arbitrary units", ...adh.map((x) => x.toFixed(1))]])}`,
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name the gland that releases ADH into the blood.", accepted: ["posterior pituitary", "posterior pituitary gland", "pituitary", "pituitary gland", "neurohypophysis"], rejected: ["anterior pituitary"], wrong: ["hypothalamus"], explanation: "The **posterior pituitary**." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the percentage increase in urine flow from 0 to 60 minutes.", value: pcFlow, unit: "%", wrong: [800, 87.5], explanation: t`$\dfrac{7.2 - 0.9}{0.9} \times 100 = ${pcFlow}\%$.` }),
      P.manual({
        label: "(c)", marks: 2, stem: "Describe the relationship between plasma ADH and urine flow.",
        points: ["Inverse / negative relationship: as ADH falls urine flow rises", "Lowest ADH (0.5 at 60 min) coincides with the highest flow (7.2 cm³ min⁻¹); both return towards starting values by 150 min"],
        modelAnswer: "There is an inverse relationship: as ADH falls from 3.0 to 0.5 units at 60 minutes, urine flow rises from 0.9 to a peak of 7.2 cm³ min⁻¹; then ADH rises again and flow falls back to 1.1 cm³ min⁻¹ by 150 minutes.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Explain how a low concentration of ADH leads to a high rate of urine flow.",
        points: ["Less ADH binds to receptors on collecting duct cells / less cAMP", "Fewer aquaporins in the luminal membrane (removed by endocytosis), so the collecting duct is less permeable to water", "Less water reabsorbed by osmosis into the medulla / blood, so a large volume of dilute urine"],
        modelAnswer: "With little ADH, fewer ADH molecules bind to receptors on the collecting duct cells, so aquaporins are removed from the luminal membrane by endocytosis. The collecting duct becomes less permeable to water, less water is reabsorbed by osmosis into the medulla and blood, and a large volume of dilute urine is produced.",
      }),
      P.mcq({
        label: "(e)", stem: "Which cells detected the change in blood water potential after Sipho drank the water?",
        options: [["Osmoreceptors in the hypothalamus", "Correct."], ["Beta cells in the pancreas", "These detect glucose."], ["Podocytes in the Bowman's capsule", "Podocytes are part of the filter."], ["Cells of the collecting duct", "These are the target of ADH."]],
        answer: "A", explanation: "**Osmoreceptors** in the hypothalamus.",
      }),
      P.num({ label: "(f)", marks: 1, stem: "Sipho's glomerular filtration rate was 120 cm³ min⁻¹. Calculate the percentage of filtrate reabsorbed at 60 minutes, to three significant figures.", value: reab, sf: 3, unit: "%", wrong: [sfStr((flow[2] / gfr) * 100, 3)], explanation: t`$\dfrac{120 - 7.2}{120} \times 100 = ${sfStr(reab, 3)}\%$.` }),
      P.tf({ label: "(g)", stem: "True or false: the changes in ADH and urine flow are an example of negative feedback.", answer: true, explanation: "True. The response restores blood water potential, after which ADH secretion returns to normal." }),
    ],
    explanation: "Low ADH → fewer aquaporins → less water reabsorbed → more dilute urine.",
    hints: ["Percentage change uses the starting value.", "Reabsorbed = filtrate − urine."],
    calculator: true,
  });

  // ---------------------------------------------------------------- T6: glucagon and cAMP (Cambridge)
  const exps = [
    ["1", "Intact liver cells + glucagon", "100"],
    ["2", "Intact liver cells, no glucagon", "5"],
    ["3", "Cytoplasm only (no membranes) + glucagon", "6"],
    ["4", "Cytoplasm only + cyclic AMP", "95"],
    ["5", "Cell membranes + glucagon + ATP; this mixture then added to cytoplasm", "90"],
  ];
  const ampl = 100 * 1000;
  chk(ampl, 1e5);
  theory(b, {
    applies: CAM, paper: "Cambridge P4",
    concepts: [A("homeostasis.blood-glucose")],
    stem: `The activity of glycogen phosphorylase was measured in liver preparations.\n\n${table(["Experiment", "Preparation", "Glycogen phosphorylase activity / % of maximum"], exps)}`,
    parts: [
      P.mcq({
        label: "(a)", stem: "Why is activity low in experiment 3?",
        options: [["Receptors and adenylyl cyclase are membrane proteins", "Correct: without membranes no cAMP is made."], ["Glucagon is broken down by enzymes in the cytoplasm", "There is no evidence of this; experiment 4 shows the cytoplasm can respond."], ["Glycogen phosphorylase is found only in the membrane", "Experiment 4 shows it is in the cytoplasm."], ["Cytoplasm contains no glycogen", "Experiment 4 shows activity in cytoplasm."]],
        answer: "A", explanation: "The receptor and adenylyl cyclase are **membrane** proteins.",
      }),
      P.short({ label: "(b)", marks: 1, stem: "Name the second messenger produced in experiment 5.", accepted: ["cyclic AMP", "cAMP", "cyclic adenosine monophosphate"], wrong: ["ATP"], explanation: "**Cyclic AMP.**" }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain the result of experiment 4.",
        points: ["cAMP activates protein kinase A (in the cytoplasm)", "Which activates an enzyme cascade leading to active glycogen phosphorylase, so no receptor / membrane is needed"],
        modelAnswer: "Cyclic AMP activates protein kinase A in the cytoplasm, which starts an enzyme cascade that activates glycogen phosphorylase, so the membrane and glucagon are not needed when cAMP is supplied directly.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Describe the events in the membrane in experiment 5 that lead to the formation of the second messenger.",
        points: ["Glucagon binds to its specific receptor, which changes shape (conformation)", "The receptor activates a G-protein", "The G-protein activates adenylyl cyclase, which converts ATP to cAMP"],
        modelAnswer: "Glucagon binds to its specific receptor in the membrane, changing the receptor's shape. The receptor activates a G-protein, which in turn activates adenylyl cyclase. Adenylyl cyclase converts ATP into cyclic AMP.",
      }),
      P.num({
        label: "(e)", marks: 1, stem: "In a model, one bound glucagon molecule leads to 100 molecules of cAMP, and each cAMP molecule leads eventually to the release of 1000 glucose molecules. How many glucose molecules are released per glucagon molecule?",
        value: ampl, wrong: [1100, 1000], explanation: t`$100 \times 1000 = ${ampl}$: the cascade amplifies the signal.`,
      }),
      P.tf({ label: "(f)", stem: "True or false: glucagon has the same effect on skeletal muscle cells as on liver cells.", answer: false, explanation: "False. Muscle cells have no glucagon receptors." }),
      P.short({ label: "(g)", marks: 1, stem: "Name the hormone that has the opposite effect to glucagon on blood glucose.", accepted: ["insulin"], wrong: ["adrenaline"], explanation: "**Insulin.**" }),
    ],
    explanation: "Glucagon acts at membrane receptors; cAMP carries the signal into the cytoplasm.",
    hints: ["Which components are in the membrane and which in the cytoplasm?"],
  });
});
