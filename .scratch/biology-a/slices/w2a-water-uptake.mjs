// W2a: water uptake from soil to root xylem.
import { concept, P, t, chk, ZIM, table, dpStr, sfStr, rnd, pctChange } from "../lib.mjs";

concept("abio.plant-transport.water-uptake", { file: "plant-transport/water-uptake", keyPrefix: "plant-transport.water-uptake" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "By which process does water enter a root hair cell from the soil?",
    options: [
      ["Osmosis", "Correct: water moves down a water potential gradient across the partially permeable membrane."],
      ["Active transport", "Water is never actively pumped; mineral ions are."],
      ["Facilitated diffusion of solutes", "Facilitated diffusion moves solutes, not water down a water potential gradient."],
      ["Endocytosis", "Endocytosis takes in material in vesicles; water uptake by roots is by osmosis."],
    ],
    answer: "A",
    explanation: "Root hair cells have a lower water potential than soil water, so water enters by **osmosis**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which pathway carries water through the cellulose cell walls of the root cortex?",
    options: [
      ["Apoplast", "Correct: the apoplast is the cell walls and intercellular spaces."],
      ["Symplast", "The symplast is the cytoplasm linked by plasmodesmata."],
      ["Vacuolar", "The vacuolar pathway passes through vacuoles and cytoplasm."],
      ["Phloem", "Phloem is a transport tissue in the stele, not a pathway across the cortex."],
    ],
    answer: "A",
    explanation: "The **apoplast** pathway runs through cell walls and spaces without crossing membranes.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which substance forms the Casparian strip in endodermis cell walls?",
    options: [
      ["Suberin", "Correct: a waxy, waterproof substance (with some lignin)."],
      ["Cellulose", "Cellulose walls are permeable to water; the strip is made waterproof by suberin."],
      ["Callose", "Callose is deposited at sieve plates, not in the endodermis."],
      ["Pectin", "Pectin is in the middle lamella and is not waterproof."],
    ],
    answer: "A",
    explanation: "The Casparian strip is a band of **suberin** in the radial and end walls.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What is the main consequence of the Casparian strip for a plant?",
    options: [
      ["Water and ions must cross a membrane, so ion entry is controlled", "Correct: the strip blocks the apoplast at the endodermis."],
      ["Water cannot reach the xylem at all and must travel in the phloem instead", "Water still crosses the endodermis through the cytoplasm."],
      ["Ions move faster through the endodermis cell walls into the stele", "The strip blocks wall movement; it does not speed it up."],
      ["Water moves from the xylem back into the cortex at night", "The strip helps prevent ions leaking back out; it does not cause outward flow."],
    ],
    answer: "A",
    explanation: "Blocking the apoplast forces everything through the **symplast**, so membrane carriers select which ions enter the xylem.",
    hints: ["What can the apoplast not do once it meets a waterproof band?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Roots of a potted plant were kept in a solution bubbled with nitrogen instead of air. Which change would occur first?",
    options: [
      ["Uptake of mineral ions would fall", "Correct: without oxygen, aerobic respiration stops and less ATP is available for active transport."],
      ["Water would enter roots faster by osmosis", "Less ion uptake raises the root water potential, so water entry falls."],
      ["The Casparian strip would break down", "Suberin is not affected by short-term lack of oxygen."],
      ["Transpiration from the leaves would stop at once", "Transpiration depends on leaf conditions, not root oxygen."],
    ],
    answer: "A",
    explanation: "Ion uptake is **active** and needs ATP from aerobic respiration, so it falls when oxygen is removed.",
    hints: ["Which process needs ATP?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS", applies: ZIM,
    stem: "Sap stops oozing from a cut stem stump when the roots are cooled to 2 °C. Which conclusion is best supported?",
    options: [
      ["Root pressure depends on metabolic activity of root cells", "Correct: cooling slows respiration and active ion pumping, which generate root pressure."],
      ["Root pressure is caused by evaporation from the leaves", "The leaves have been removed, so they cannot be involved."],
      ["Low temperature makes the Casparian strip permeable", "There is no evidence for this; cooling acts on enzymes and respiration."],
      ["Water moves only by the apoplast pathway at low temperature", "This would not explain an effect on exudation from the stump."],
    ],
    answer: "A",
    explanation: "Cooling slows enzyme-controlled respiration, so less ATP for pumping ions into the xylem: root pressure is **active**.",
    hints: ["Which processes slow at low temperature?"],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why do root hairs increase the rate of water uptake?",
    options: [
      ["They greatly increase the surface area in contact with soil water", "Correct: more membrane area for osmosis."],
      ["They contain chloroplasts that make sugars to lower water potential", "Root hairs are not photosynthetic."],
      ["They have lignified walls that pull water in", "Root hair walls are thin cellulose; lignin is in xylem."],
      ["They secrete water into the soil to dissolve ions", "Water moves into the root hair, not out."],
    ],
    answer: "A",
    explanation: "Root hairs provide a **large surface area** for osmosis and ion uptake.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Plasmodesmata are strands of cytoplasm that link adjacent plant cells through their cell walls.",
    answer: true,
    explanation: "True. They connect the cytoplasm of neighbouring cells, forming the symplast.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Soil water usually has a lower water potential than the cytoplasm of a root hair cell.",
    answer: false,
    explanation: "False. Soil water is dilute, so it has a **higher** water potential; that is why water enters the root hair.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each structure to its role in water uptake.",
    pairs: [
      ["Root hair", "Large surface area for osmosis and ion uptake"],
      ["Casparian strip", "Blocks the apoplast pathway at the endodermis"],
      ["Plasmodesmata", "Link cytoplasm of neighbouring cells in the symplast"],
      ["Pericycle and endodermis cells", "Actively pump ions into the xylem"],
    ],
    explanation: "Uptake, pathway, barrier and loading each have their own structure.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "Mineral ions are pumped into the xylem, which {{blank:a}} the water potential of the xylem sap, so water enters by {{blank:b}}, producing root {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["lowers"], choices: ["lowers", "raises", "does not change"] },
      { id: "b", accepted: ["osmosis"], choices: ["osmosis", "active transport", "transpiration", "mass flow"] },
      { id: "c", accepted: ["pressure"], choices: ["pressure", "tension", "hairs", "nodules"] },
    ],
    explanation: "Ions lower ψ of the xylem; water follows by osmosis, creating root pressure.",
  });
  b.short({
    d: 2, skill: "RECALL", applies: ZIM,
    stem: "Name the loss of liquid water droplets from the leaf edges of grasses on cool, humid mornings, caused by root pressure.",
    accepted: ["guttation"],
    wrong: ["transpiration", "evaporation"],
    explanation: "**Guttation** is caused by root pressure when transpiration is low.",
  });

  // Water potential calculation (different numbers from the lesson)
  const s = -850, p = 360;
  const psi = s + p;
  chk(psi, -490);
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "A cortex cell has a solute potential of −850 kPa and a pressure potential of +360 kPa. Calculate its water potential, in kPa. Include the sign.",
    value: psi, unit: "kPa", wrong: [-1210, 490],
    explanation: t`$\psi = \psi_s + \psi_p = -850 + 360 = -490$ kPa. Subtracting the pressure potential gives −1210.`,
  });
  const rateData = [0.1, 0.21, 0.3, 0.4, 0.52];
  const hrs = [1.5, 3, 4.5, 6, 7.5];
  const rate = 0.52 / 7.5;
  const rate2 = (0.52 - 0.21) / (7.5 - 3);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true, applies: ZIM,
    stem: `Exudate was collected from a cut tomato stump; the volumes are cumulative.\n\n${table(["Time / h", ...hrs.map(String)], [["Volume / cm³", ...rateData.map((v) => v.toFixed(2))]])}\n\nCalculate the mean rate of exudation between 3 h and 7.5 h, in cm³/h, to three significant figures.`,
    value: rate2, sf: 3, unit: "cm³/h", wrong: [sfStr(0.52 / 4.5, 3), sfStr(rate, 3)],
    explanation: t`1. Volume collected between 3 h and 7.5 h $= 0.52 - 0.21 = 0.31\ \text{cm}^3$.
2. Time $= 7.5 - 3 = 4.5$ h.
3. Rate $= 0.26 \div 4.5 = ${dpStr(rate2, 4)} \approx ${rnd(rate2, 3)}\ \text{cm}^3\ \text{h}^{-1}$.
4. Using the total volume (0.52) over 4.5 h forgets the 0.21 cm³ already collected.`,
    hints: ["Use the difference in volume over the difference in time."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the pathway of water from a root hair to the xylem, by the apoplast route, including what happens at the endodermis.",
    points: [
      "Water enters root hair (by osmosis) and moves through cell walls / intercellular spaces of the cortex",
      "Pulled along by cohesion between water molecules / little resistance as no membranes crossed",
      "At the endodermis the Casparian strip (suberin) blocks the cell walls",
      "Water crosses the membrane into the cytoplasm (symplast) of endodermis cells, then into the xylem (via pericycle)",
    ],
    modelAnswer: "Water that has entered the root hair passes into the cell walls and moves through the cellulose walls and intercellular spaces of the cortex, pulled along by cohesion without crossing membranes. At the endodermis the waterproof suberin Casparian strip blocks the walls, so water must cross a cell surface membrane into the cytoplasm of endodermis cells, then passes through the pericycle into the xylem.",
    explanation: "Route, force, barrier, final entry.",
    hints: ["Name the barrier and say what water must do to pass it."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "Suggest why crops in waterlogged fields often show signs of mineral deficiency even though the soil contains plenty of ions.",
    points: [
      "Waterlogged soil has little oxygen (air spaces filled with water)",
      "Roots respire anaerobically / less aerobic respiration, so less ATP",
      "Less active transport of mineral ions into root hairs / into the xylem",
    ],
    modelAnswer: "Water fills the air spaces in waterlogged soil, so roots get little oxygen. Aerobic respiration falls and less ATP is made, so root cells cannot actively take up enough mineral ions even though they are present.",
    explanation: "Oxygen → respiration → ATP → active uptake.",
    hints: ["What does active uptake need?"],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3, applies: ZIM,
    stem: "Explain how root pressure is generated.",
    points: [
      "Endodermis / pericycle cells actively pump mineral ions into the xylem (using ATP)",
      "This lowers the water potential of the xylem sap, so water enters by osmosis",
      "Casparian strip prevents ions leaking back out, so a positive hydrostatic pressure builds up",
    ],
    modelAnswer: "Cells of the endodermis and pericycle use ATP to pump mineral ions into the xylem. This lowers the water potential of the xylem sap, so water moves in by osmosis from surrounding cells. The Casparian strip stops the ions leaking back through the walls, so pressure builds up in the xylem.",
    explanation: "Active pumping → lower ψ → osmosis → pressure.",
    hints: ["Start with ATP."],
  });

  // Practice structured: ion uptake and respiratory inhibitor
  const times = [0, 20, 40, 60, 80];
  const air = [0, 1.8, 3.7, 5.5, 7.4];
  const inhib = [0, 0.6, 0.7, 0.8, 0.8];
  const pct = pctChange(air[4], inhib[4]);
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `Discs of carrot root were kept in potassium chloride solution, aerated, with or without a respiratory inhibitor. Uptake of potassium ions was measured.\n\n${table(["Time / min", ...times.map(String)], [["K⁺ uptake, aerated / µmol g⁻¹", ...air.map((x) => x.toFixed(1))], ["K⁺ uptake, with inhibitor / µmol g⁻¹", ...inhib.map((x) => x.toFixed(1))]])}`,
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "Describe the results for the aerated discs.",
        points: ["Uptake increases steadily / linearly with time", "Quote data: e.g. 1.8 µmol g⁻¹ at 20 min rising to 7.4 µmol g⁻¹ at 80 min"],
        modelAnswer: "Potassium uptake rises steadily with time, at a nearly constant rate, from 1.8 µmol g⁻¹ at 20 minutes to 7.4 µmol g⁻¹ at 80 minutes.",
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the percentage difference in uptake at 80 minutes with the inhibitor compared with the aerated discs. Give your answer to the nearest whole number and include the sign.",
        value: pct, dp: 0, unit: "%", wrong: [rnd(pctChange(inhib[4], air[4]), 0), 89],
        explanation: t`$\dfrac{0.8 - 7.4}{7.4} \times 100 = ${dpStr(pct, 1)} \approx ${dpStr(pct, 0)}\%$.`,
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain the difference between the two sets of results.",
        points: ["Inhibitor stops (aerobic) respiration, so little ATP is made", "K⁺ uptake is by active transport using carrier proteins / needs ATP", "Small initial uptake with inhibitor is by diffusion (into cell walls / free space), which soon stops"],
        modelAnswer: "The inhibitor stops respiration, so the cells make little ATP. Potassium is taken up mainly by active transport through carrier proteins, which needs ATP, so uptake almost stops. The small early uptake with the inhibitor is passive diffusion into the cell walls, which levels off quickly.",
      }),
      P.manual({
        label: "(d)", marks: 1, stem: "Suggest one variable that should have been kept constant.",
        points: ["Temperature / KCl concentration / mass or surface area of discs / volume of solution / aeration rate"],
        modelAnswer: "Temperature (or the concentration of potassium chloride, or the mass of discs).",
      }),
    ],
    explanation: "Active ion uptake depends on ATP from respiration; with an inhibitor only a small passive uptake occurs.",
    hints: ["Percentage change = (new − original) ÷ original × 100."],
    calculator: true,
  });

  const psis = [["Soil", -50], ["Root hair cell", -310], ["Cortex cell", -420], ["Endodermis cell", -480], ["Xylem", -610]];
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: `The water potential of regions of a maize root was estimated on a sunny afternoon.\n\n${table(["Region", "Water potential / kPa"], psis.map(([n, v]) => [n, dpStr(v, 0)]))}`,
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Which region has the highest water potential?", accepted: ["soil", "the soil", "soil water"], wrong: ["xylem"], explanation: "−50 kPa is the highest (least negative)." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the difference in water potential between the soil and the xylem, in kPa (as a positive number).", value: 560, unit: "kPa", wrong: [660], explanation: t`$-50 - (-610) = 560$ kPa.` }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain how the data show that water moves into the xylem by osmosis.",
        points: ["Water potential decreases (becomes more negative) from soil to xylem / continuous gradient", "Water moves by osmosis from higher to lower water potential, across membranes"],
        modelAnswer: "The water potential falls at every step from the soil (−50 kPa) to the xylem (−610 kPa), so water moves down this gradient by osmosis.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest why the xylem has such a low water potential on a sunny afternoon.",
        points: ["Transpiration from leaves is high", "Water pulled up under tension (negative pressure potential) lowers the xylem water potential / ions in sap also lower it"],
        modelAnswer: "On a sunny afternoon transpiration is fast, so water in the xylem is pulled up under tension, giving a negative pressure potential that, with the dissolved ions, makes the water potential very low.",
      }),
    ],
    explanation: "Water potential falls from soil to xylem, so water moves inwards by osmosis; tension from transpiration lowers xylem ψ.",
    hints: ["Higher water potential means less negative."],
  });
  chk(-50 - -610, 560);

  b.card("DEFINITION", "Define the **apoplast pathway**.", "Movement of water through cell walls and intercellular spaces without crossing membranes.");
  b.card("DEFINITION", "Define the **symplast pathway**.", "Movement of water through cytoplasm, from cell to cell via plasmodesmata.");
  b.card("CONCEPT", "Casparian strip: what and why", "Band of suberin in endodermis walls; blocks the apoplast so water and ions cross a membrane, letting the plant control ion entry.");
  b.card("FACT", "How do mineral ions enter root hairs?", "Mainly by active transport through carrier proteins, using ATP from respiration.");
  b.card("CONCEPT", "Why water enters root hairs", "Active ion uptake keeps the root hair's water potential below that of soil water, so water enters by osmosis.");
  b.card("DEFINITION", "Define **root pressure**.", "Positive pressure in root xylem caused by active pumping of ions into the xylem and osmotic entry of water.");
  b.card("FACT", "Evidence for root pressure", "Sap oozes from a cut stem stump; guttation; stops with respiratory inhibitors, low oxygen or cold.", undefined, { applies: ZIM });
  b.card("FACT", "Vacuolar pathway", "Water passes through cytoplasm and vacuoles of successive cells, crossing membranes by osmosis.", undefined, { applies: ZIM });
  b.card("FORMULA", "Water potential of a cell", "ψ = ψs + ψp (solute potential + pressure potential).");
});
