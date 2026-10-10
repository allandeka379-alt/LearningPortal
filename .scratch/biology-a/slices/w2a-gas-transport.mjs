// W2a: oxygen and carbon dioxide transport.
import { concept, P, t, chk, ZIM, table, dpStr, sfStr, pctChange } from "../lib.mjs";

concept("abio.mammal-transport.gas-transport", { file: "mammal-transport/gas-transport", keyPrefix: "mammal-transport.gas-transport" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the maximum number of oxygen molecules that one haemoglobin molecule can carry?",
    options: [
      ["4", "Correct: one per haem group."],
      ["1", "One is the number carried by myoglobin, which has one haem."],
      ["2", "Haemoglobin has four haem groups, not two."],
      ["8", "Eight is the number of oxygen atoms, not molecules."],
    ],
    answer: "A",
    explanation: "Four haem groups, each binding one O₂ molecule.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which enzyme in red blood cells catalyses the reaction between carbon dioxide and water?",
    options: [
      ["Carbonic anhydrase", "Correct."],
      ["Catalase", "Catalase breaks down hydrogen peroxide."],
      ["ATP synthase", "ATP synthase makes ATP."],
      ["Amylase", "Amylase hydrolyses starch."],
    ],
    answer: "A",
    explanation: "**Carbonic anhydrase** speeds up CO₂ + H₂O ⇌ H₂CO₃.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the chloride shift?",
    options: [
      ["Movement of Cl⁻ into red blood cells as HCO₃⁻ diffuses out", "Correct: it keeps the cells electrically neutral."],
      ["Movement of Cl⁻ out of red blood cells as CO₂ diffuses into them", "Chloride moves in, not out, as hydrogencarbonate leaves."],
      ["Movement of the dissociation curve to the right", "That is the Bohr shift."],
      ["Binding of Cl⁻ to haemoglobin to release oxygen", "Oxygen release is caused by H⁺ binding (Bohr shift)."],
    ],
    answer: "A",
    explanation: "Chloride ions move **into** red cells to balance hydrogencarbonate ions leaving.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is the oxygen dissociation curve of adult haemoglobin S-shaped?",
    options: [
      ["The first oxygen to bind changes Hb shape, easing further binding", "Correct: cooperative binding."],
      ["Oxygen dissolves in plasma faster at high partial pressures", "Dissolved oxygen is a minor part and does not cause the shape."],
      ["Each haem group has a different, fixed affinity that never changes", "Affinity changes as oxygen binds; that is the point."],
      ["Carbon dioxide binds to haem groups at low partial pressure of oxygen", "CO₂ binds to globin amino groups, not haem."],
    ],
    answer: "A",
    explanation: "**Cooperative binding**: the first O₂ alters the quaternary structure, raising affinity at the other sites.",
    hints: ["What happens to the protein's shape after the first oxygen binds?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "During vigorous exercise, the partial pressure of CO₂ in a thigh muscle rises. What is the effect on haemoglobin passing through that muscle?",
    options: [
      ["It releases more oxygen at the same pO₂", "Correct: the Bohr shift lowers affinity."],
      ["It binds oxygen more tightly and releases less", "That would be a shift to the left."],
      ["It releases carbon dioxide to the muscle cells", "Blood takes up CO₂ in muscles; it releases CO₂ in the lungs."],
      ["Its oxygen capacity increases above 100%", "Saturation cannot exceed 100%."],
    ],
    answer: "A",
    explanation: "Higher pCO₂ → more H⁺ → lower affinity → **more oxygen unloaded** (Bohr shift).",
    hints: ["Which way does the curve move?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS", applies: ZIM,
    stem: "At a partial pressure of oxygen of 3 kPa, adult haemoglobin is 40% saturated and fetal haemoglobin is 65% saturated. What does this show?",
    options: [
      ["Fetal haemoglobin has a higher affinity for oxygen, so it can take oxygen from maternal blood", "Correct: its curve is to the left."],
      ["Fetal haemoglobin has a lower affinity for oxygen, so it releases oxygen to the mother's blood", "Higher saturation at the same pO₂ means higher affinity."],
      ["Fetal blood carries more carbon dioxide than maternal blood at all times", "The data are about oxygen saturation, not CO₂."],
      ["Fetal haemoglobin has more haem groups than adult haemoglobin", "Both have four haem groups."],
    ],
    answer: "A",
    explanation: "At the same pO₂ fetal Hb is more saturated: **higher affinity**, curve to the left, so oxygen passes from mother to fetus.",
    hints: ["Same partial pressure, different saturation: which binds more tightly?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING", applies: ZIM,
    stem: "Myoglobin in muscle has a dissociation curve far to the left of haemoglobin's. When does myoglobin release its oxygen?",
    options: [
      ["Only when muscle pO₂ is very low", "Correct: it acts as an oxygen store."],
      ["Whenever blood passes through the lungs", "Myoglobin is inside muscle cells, not in blood."],
      ["At the same partial pressure as haemoglobin", "Its higher affinity means it releases oxygen at lower pO₂."],
      ["Only when CO₂ in the muscle is low", "Myoglobin release depends mainly on very low pO₂."],
    ],
    answer: "A",
    explanation: "Myoglobin has a very high affinity and releases oxygen only at **very low pO₂**, during intense exercise.",
    hints: ["High affinity means it holds on until pO₂ is very low."],
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Carbaminohaemoglobin forms when carbon dioxide combines with the haem groups of haemoglobin.",
    answer: false,
    explanation: "False. CO₂ combines with the **amino groups of the globin chains**. Carbon monoxide binds to haem.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Most carbon dioxide is carried in the blood as hydrogencarbonate ions in the plasma.",
    answer: true,
    explanation: "True. About 85% travels as HCO₃⁻, formed in red cells by carbonic anhydrase.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term to its description.",
    pairs: [
      ["Bohr shift", "Curve moves right at higher partial pressure of CO₂"],
      ["Haemoglobinic acid", "Haemoglobin that has accepted hydrogen ions"],
      ["Carbaminohaemoglobin", "CO₂ bound to amino groups of globin"],
      ["Oxyhaemoglobin", "Haemoglobin with oxygen bound to haem"],
    ],
    explanation: "Four forms and effects to distinguish.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "In the lungs the partial pressure of oxygen is high, so haemoglobin is on the {{blank:a}} part of the curve and becomes almost fully saturated. In respiring tissues the pO₂ is low, on the {{blank:b}} part, so a small fall in pO₂ releases {{blank:c}} oxygen.",
    blanks: [
      { id: "a", accepted: ["flat"], choices: ["flat", "steep"] },
      { id: "b", accepted: ["steep"], choices: ["steep", "flat"] },
      { id: "c", accepted: ["a lot of"], choices: ["a lot of", "very little"] },
    ],
    explanation: "Plateau for loading, steep section for unloading.",
    hints: ["Match lung and tissue pO₂ to the two parts of an S-curve."],
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the ion that diffuses out of red blood cells into the plasma, carrying most of the carbon dioxide.",
    accepted: ["hydrogencarbonate", "hydrogencarbonate ion", "hydrogencarbonate ions", "bicarbonate", "bicarbonate ion", "bicarbonate ions", "HCO3-", "HCO3", "HCO₃⁻"],
    wrong: ["chloride", "hydrogen ion"],
    explanation: "**Hydrogencarbonate** (HCO₃⁻) ions diffuse out; chloride ions move in.",
  });

  // Oxygen unloading calculations (data differ from the lesson)
  const lungsSat = 95, tissueSat = 34, cap = 19.5;
  const released = ((lungsSat - tissueSat) / 100) * cap;
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Blood leaves the lungs 95% saturated and leaves an active muscle 34% saturated. Fully saturated blood carries 19.5 cm³ O₂ per 100 cm³ of blood. Calculate the volume of oxygen released to the muscle per 100 cm³ of blood, in cm³, to three significant figures.",
    value: released, unit: "cm³", sf: 3, wrong: [61, sfStr((34 / 100) * cap, 3)],
    explanation: t`$(95 - 34)\% \times 19.5 = 0.61 \times 19.5 = ${sfStr(released, 3)}\ \text{cm}^3$. Giving 61 forgets to multiply by the capacity.`,
    hints: ["Subtract the saturations, then use the capacity."],
  });
  const pRest = 96 - 70, pEx = 96 - 25;
  const fold = pEx / pRest;
  b.calc({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: "Blood leaving the lungs is 96% saturated. Blood leaving a resting muscle is 70% saturated; blood leaving the same muscle during exercise is 25% saturated. Calculate how many times more oxygen is released per volume of blood during exercise than at rest, to two significant figures.",
    value: fold, sf: 2, wrong: [sfStr(70 / 25, 2), sfStr(pRest / pEx, 2)],
    explanation: t`1. At rest: $96 - 70 = 26$ percentage points released.
2. During exercise: $96 - 25 = 71$ percentage points released.
3. Ratio $= 74 \div 26 = ${sfStr(fold, 3)} \approx ${sfStr(fold, 2)}$ times.
4. Dividing the two outgoing saturations (70 ÷ 25) ignores the starting value.`,
    hints: ["Work out the oxygen released in each case first."],
  });

  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 5,
    stem: "Explain how carbon dioxide produced in a respiring tissue is carried to the lungs as hydrogencarbonate ions.",
    points: [
      "CO₂ diffuses into red blood cells",
      "Carbonic anhydrase catalyses CO₂ + H₂O → carbonic acid (H₂CO₃)",
      "Carbonic acid dissociates into H⁺ and HCO₃⁻",
      "HCO₃⁻ diffuses out into the plasma; Cl⁻ moves in (chloride shift)",
      "H⁺ combines with haemoglobin to form haemoglobinic acid (buffering, releasing O₂)",
    ],
    modelAnswer: "CO₂ diffuses from the tissue into red blood cells, where carbonic anhydrase catalyses its reaction with water to form carbonic acid. This dissociates into hydrogen ions and hydrogencarbonate ions. The hydrogencarbonate ions diffuse out into the plasma and are carried to the lungs in solution, while chloride ions move into the cell to balance the charge (the chloride shift). The hydrogen ions bind to haemoglobin, forming haemoglobinic acid, which buffers the blood and makes the haemoglobin release oxygen.",
    explanation: "Enzyme, dissociation, chloride shift, haemoglobinic acid.",
    hints: ["Follow one CO₂ molecule into the red cell."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain the importance of the Bohr shift to an actively respiring muscle.",
    points: [
      "Active muscle produces more CO₂ (higher partial pressure of CO₂)",
      "Haemoglobin's affinity for oxygen falls / curve moves right (H⁺ binding)",
      "More oxygen is unloaded at the same pO₂, supplying more for aerobic respiration",
    ],
    modelAnswer: "An active muscle produces more carbon dioxide. This lowers haemoglobin's affinity for oxygen, moving the curve to the right, so at the same partial pressure of oxygen more oxygen is released to the muscle for aerobic respiration.",
    explanation: "More CO₂ → lower affinity → more unloading where it is needed.",
    hints: ["Link the CO₂ to the need for oxygen."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3, applies: ZIM,
    stem: "Suggest why it is an advantage for myoglobin to have a dissociation curve that is hyperbolic and far to the left of haemoglobin's.",
    points: [
      "Myoglobin stays saturated at the pO₂ found in muscle at rest / takes oxygen from haemoglobin",
      "Releases oxygen only when pO₂ is very low (intense exercise)",
      "Acts as an oxygen store, delaying the onset of anaerobic respiration",
    ],
    modelAnswer: "With its very high affinity, myoglobin loads oxygen from haemoglobin and stays saturated at normal muscle pO₂. It releases its oxygen only when pO₂ falls very low during intense exercise, acting as a store that delays the switch to anaerobic respiration.",
    explanation: "High affinity = store for emergencies.",
    hints: ["When would muscle pO₂ become very low?"],
  });

  // Practice structured: dissociation data (different from the lesson table)
  const po2 = [1.2, 2.2, 3.2, 4.2, 5.5, 8.5, 13.5];
  const sat = [16, 35, 51, 63, 77, 92, 99];
  const satHi = [9, 22, 36, 50, 66, 86, 96];
  const relLow = ((99 - 63) / 100) * 20;
  const relHigh = ((99 - 50) / 100) * 20;
  const pc = pctChange(relLow, relHigh);
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `The table shows the percentage saturation of human haemoglobin at two partial pressures of CO₂. Fully saturated blood carries 20 cm³ O₂ per 100 cm³ blood.\n\n${table(["pO₂ / kPa", ...po2.map(String)], [["Saturation at low pCO₂ / %", ...sat.map(String)], ["Saturation at high pCO₂ / %", ...satHi.map(String)]])}`,
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "Describe the shape of the curve at low pCO₂.",
        points: ["Rises slowly at first, then steeply (between about 1.2 and 5.5 kPa)", "Levels off near 100% at high pO₂ (99% at 13.5 kPa): S-shaped / sigmoid"],
        modelAnswer: "The saturation rises slowly at the lowest pO₂, then steeply from about 1.2 to 5.5 kPa (16% to 77%), and levels off near 100% at high pO₂, reaching 99% at 13.5 kPa: an S-shaped curve.",
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Blood leaves the lungs at 13.5 kPa (low pCO₂) and reaches a tissue at 4.2 kPa. Calculate the volume of oxygen released per 100 cm³ of blood if the tissue has low pCO₂, in cm³, to two significant figures.",
        value: relLow, sf: 2, unit: "cm³", wrong: [36],
        explanation: t`$(99 - 63)\% \times 20 = ${sfStr(relLow, 2)}\ \text{cm}^3$.`,
      }),
      P.num({
        label: "(c)", marks: 2, stem: "Calculate the percentage increase in oxygen released if the tissue has high pCO₂ instead. Give your answer to the nearest whole number.",
        value: pc, dp: 0, unit: "%", wrong: [49],
        explanation: t`High pCO₂: $(99 - 50)\% \times 20 = ${sfStr(relHigh, 2)}\ \text{cm}^3$. Increase $= \dfrac{${sfStr(relHigh, 2)} - ${sfStr(relLow, 2)}}{${sfStr(relLow, 2)}} \times 100 = ${dpStr(pc, 1)} \approx ${dpStr(pc, 0)}\%$.`,
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain why haemoglobin is less saturated at high pCO₂.",
        points: ["CO₂ forms carbonic acid, releasing H⁺ (carbonic anhydrase)", "H⁺ binds to haemoglobin, changing its shape and lowering its affinity for oxygen (Bohr shift)"],
        modelAnswer: "CO₂ reacts with water (carbonic anhydrase) to form carbonic acid, which releases hydrogen ions. These bind to haemoglobin, forming haemoglobinic acid and changing its shape, so its affinity for oxygen falls: the Bohr shift.",
      }),
    ],
    explanation: "Read saturations, subtract, multiply by capacity; the Bohr shift increases delivery.",
    hints: ["Released = (saturation in lungs − saturation in tissue) × capacity."],
    calculator: true,
  });
  chk(relLow, 7.2);
  chk(relHigh, 9.8);

  b.struct({
    d: 3, skill: "UNDERSTANDING", applies: ZIM,
    stem: "At a partial pressure of oxygen of 2.8 kPa, the percentage saturations of three pigments are: myoglobin 91%, fetal haemoglobin 62%, adult haemoglobin 42%.",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Which pigment has the highest affinity for oxygen?", accepted: ["myoglobin"], wrong: ["adult haemoglobin"], explanation: "Highest saturation at the same pO₂: myoglobin." }),
      P.manual({
        label: "(b)", marks: 2, stem: "Explain why the difference between fetal and adult haemoglobin is important during pregnancy.",
        points: ["Fetal haemoglobin is more saturated at the low pO₂ in the placenta (higher affinity)", "So oxygen moves from maternal oxyhaemoglobin (which unloads) to fetal haemoglobin across the placenta"],
        modelAnswer: "At the low partial pressure of oxygen in the placenta, fetal haemoglobin has a higher affinity than the mother's, so maternal haemoglobin unloads oxygen, which diffuses across the placenta and binds to fetal haemoglobin.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Myoglobin has one haem group. Suggest why its curve is not S-shaped.",
        points: ["With one haem there is no cooperative binding / no shape change affecting other sites", "So affinity is the same for every molecule binding: curve is hyperbolic"],
        modelAnswer: "With only one haem group there are no other sites whose affinity can change, so there is no cooperative binding and the curve rises steeply from the start and levels off (hyperbolic).",
      }),
    ],
    explanation: "Affinity order: myoglobin > fetal Hb > adult Hb.",
    hints: ["Cooperative binding needs more than one site."],
  });

  b.card("DEFINITION", "Define the **Bohr shift**.", "The dissociation curve moves right at higher partial pressure of CO₂, so haemoglobin releases oxygen more readily.");
  b.card("CONCEPT", "Why is the Hb dissociation curve S-shaped?", "Cooperative binding: first O₂ changes Hb's shape, making further binding easier; the last site is harder to fill.");
  b.card("CONCEPT", "Importance of the curve's shape", "Plateau at lung pO₂: full loading. Steep at tissue pO₂: large release for a small fall.");
  b.card("FORMULA", "Oxygen released to a tissue", "(saturation leaving lungs − saturation leaving tissue) ÷ 100 × oxygen capacity.");
  b.card("CONCEPT", "CO₂ to hydrogencarbonate", "CO₂ + H₂O → H₂CO₃ (carbonic anhydrase) → H⁺ + HCO₃⁻; HCO₃⁻ out to plasma, Cl⁻ in (chloride shift); H⁺ + Hb → HHb.");
  b.card("FACT", "Three ways CO₂ is carried", "Hydrogencarbonate ions (about 85%), carbaminohaemoglobin, dissolved in plasma.");
  b.card("DEFINITION", "Define the **chloride shift**.", "Movement of chloride ions into red blood cells to balance hydrogencarbonate ions leaving.");
  b.card("FACT", "Fetal haemoglobin curve", "To the left of adult Hb: higher affinity, so it takes O₂ from maternal blood in the placenta.", undefined, { applies: ZIM });
  b.card("FACT", "Myoglobin", "One haem; hyperbolic curve far to the left; oxygen store released at very low pO₂.", undefined, { applies: ZIM });
});
