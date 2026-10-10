// W2a: THEORY10 exam-format items (ZIMSEC Paper 2; Cambridge Paper 2, AS concepts).
import { concept, P, t, chk, same, table, EXAM, checkExam, CAM, capillaryVolume, cardiacOutput, actualSize, pctChange, sfStr, dpStr } from "../lib.mjs";
import { translate, codonRows, mrnaFromTemplate } from "../tables/w2a-code.mjs";

const A = (k) => `abio.${k}`;
const g = (s) => s.match(/.{1,3}/g).join(" ");
const theory = (b, o) =>
  b.struct({
    d: o.d ?? 4, examStyle: true, skill: EXAM.THEORY10.skill, secs: EXAM.THEORY10.secs, paper: o.paper ?? "ZIMSEC P2 / Cambridge P2",
    concepts: o.concepts, stem: o.stem, applies: o.applies,
    parts: checkExam(EXAM.THEORY10, o.parts),
    explanation: o.explanation, hints: o.hints, calculator: o.calculator,
  });

concept(A("plant-transport.transpiration"), { file: "exam/w2a-theory", keyPrefix: "exam.w2a-theory" }, (b) => {
  // ---------------------------------------------------------------- T1: humidity and water uptake
  const hum = [30, 45, 60, 75, 90];
  const dist = [48, 41, 33, 22, 12];
  const r = 0.6;
  const rate30 = capillaryVolume(r, dist[0]) / 5;
  const pc = pctChange(dist[0], dist[4]);
  chk(pc, -75);
  theory(b, {
    concepts: [A("plant-transport.transpiration")],
    stem: `A leafy shoot of a bean plant was set up in a bubble potometer with a capillary tube of internal radius 0.6 mm, inside a clear box in which the relative humidity could be controlled. Temperature and light intensity were kept constant. The distance moved by the bubble in 5 minutes was recorded at each humidity.\n\n${table(["Relative humidity / %", ...hum.map(String)], [["Distance moved in 5 min / mm", ...dist.map(String)]])}`,
    parts: [
      P.mcq({
        label: "(a)", stem: "What does the potometer actually measure?",
        options: [["The rate of water uptake by the shoot", "Correct: uptake approximately equals transpiration."], ["The rate of evaporation from the capillary tube", "The tube is sealed except at the reservoir; evaporation from it is negligible."], ["The rate of photosynthesis", "Water used in photosynthesis is a tiny fraction."], ["The rate of root pressure", "The shoot has no roots."]],
        answer: "A", explanation: "A potometer measures water **uptake**.",
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the rate of water uptake at 30% relative humidity, in mm³/min, to three significant figures.",
        value: rate30, sf: 3, unit: "mm³/min", wrong: [sfStr(capillaryVolume(0.3, dist[0]) / 5, 3), sfStr(capillaryVolume(r, dist[0]), 3)],
        explanation: t`Volume $= \pi \times 0.6^2 \times 48 = ${sfStr(capillaryVolume(r, dist[0]), 4)}\ \text{mm}^3$; rate $= ${sfStr(capillaryVolume(r, dist[0]), 4)} \div 5 = ${sfStr(rate30, 3)}\ \text{mm}^3\ \text{min}^{-1}$.`,
      }),
      P.num({
        label: "(c)", marks: 1, stem: "Calculate the percentage change in the distance moved between 30% and 90% humidity. Include the sign.",
        value: pc, unit: "%", wrong: [75, 300],
        explanation: t`$\dfrac{12 - 48}{48} \times 100 = -75\%$.`,
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Explain the effect of increasing humidity on water uptake.",
        points: ["Uptake decreases as humidity increases (48 mm falling to 12 mm)", "Air outside the leaf contains more water vapour, so the water vapour potential gradient between air spaces and the atmosphere is less steep", "Slower diffusion of water vapour out through stomata, so less water is pulled up the xylem (less transpiration pull)"],
        modelAnswer: "Water uptake falls as humidity rises, from 48 mm to 12 mm in 5 minutes. More humid air outside the leaf reduces the water vapour potential gradient between the air spaces and the atmosphere, so water vapour diffuses out of the stomata more slowly and less water is pulled up the xylem.",
      }),
      P.short({
        label: "(e)", marks: 1, stem: "Name the attraction between water molecules that allows a continuous column of water to be pulled up the xylem.",
        accepted: ["cohesion", "hydrogen bonding", "hydrogen bonds", "cohesion due to hydrogen bonds"], wrong: ["adhesion"],
        explanation: "**Cohesion**, caused by hydrogen bonds between water molecules.",
      }),
      P.tf({
        label: "(f)", stem: "True or false: rolled leaves in marram grass reduce water loss because they trap humid air next to the stomata.",
        answer: true, explanation: "True. Trapped humid air reduces the water vapour potential gradient.",
      }),
      P.manual({
        label: "(g)", marks: 1, stem: "Suggest why the shoot was left in each new humidity for several minutes before readings were taken.",
        points: ["To allow the shoot / stomata to adjust (equilibrate) to the new conditions so the rate is steady"],
        modelAnswer: "So that the shoot could adjust to the new humidity and a steady rate was measured.",
      }),
    ],
    explanation: "Humidity reduces the water vapour potential gradient, so transpiration and uptake fall; volume = πr²l.",
    hints: ["Volume of a cylinder = πr²l.", "Percentage change = (new − original) ÷ original × 100."],
    calculator: true,
  });

  // ---------------------------------------------------------------- T2: translocation tracer
  const dCm = [20, 40, 60, 80];
  const tMin = [14, 29, 44, 59];
  const rateT = ((80 - 20) * 10) / (59 - 14);
  same(sfStr(rateT, 3), "13.3");
  theory(b, {
    concepts: [A("plant-transport.translocation")],
    stem: `A mature leaf of a soya bean plant was supplied with ¹⁴CO₂ for a short time. The time when radioactivity was first detected in the stem at different distances below the leaf was recorded.\n\n${table(["Distance below the leaf / cm", ...dCm.map(String)], [["Time when first detected / min", ...tMin.map(String)]])}`,
    parts: [
      P.mcq({
        label: "(a)", stem: "In this experiment, which part of the plant is acting as the source?",
        options: [["The leaf supplied with ¹⁴CO₂", "Correct: it makes and exports labelled sucrose."], ["The roots", "Roots are sinks here."], ["The xylem in the stem", "Xylem does not carry assimilates."], ["The growing pods", "Developing pods are sinks."]],
        answer: "A", explanation: "The photosynthesising leaf is the **source**.",
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the mean rate of movement of the radioactivity between 20 cm and 80 cm, in mm/min, to three significant figures.",
        value: rateT, sf: 3, unit: "mm/min", wrong: [sfStr(800 / 59, 3), sfStr(60 / 45, 3)],
        explanation: t`Distance $= 80 - 20 = 60\ \text{cm} = 600$ mm; time $= 59 - 14 = 45$ min; rate $= 600 \div 45 = ${sfStr(rateT, 3)}$ mm/min.`,
      }),
      P.fib({
        label: "(c)", stem: "Complete the description of loading.",
        template: "Companion cells use ATP to pump {{blank:a}} out of the cell; these ions return through {{blank:b}} proteins, carrying sucrose with them.",
        blanks: [
          { id: "a", accepted: ["hydrogen ions"], choices: ["hydrogen ions", "sodium ions", "sucrose", "water"] },
          { id: "b", accepted: ["cotransporter"], choices: ["cotransporter", "channel", "receptor", "aquaporin"] },
        ],
        explanation: "Proton pumps and sucrose-proton cotransporters.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Explain how loading of sucrose at the source causes sap to flow towards a sink.",
        points: ["Sucrose loading lowers the water potential in the sieve tube", "Water enters from the xylem by osmosis, raising hydrostatic pressure at the source", "Sucrose is removed at the sink so pressure is lower there; sap moves by mass flow down the pressure gradient"],
        modelAnswer: "Loading sucrose into the sieve tube lowers its water potential, so water enters from the xylem by osmosis and the hydrostatic pressure rises at the source. At the sink sucrose is removed, water leaves and the pressure is lower, so sap moves by mass flow down the pressure gradient.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "A ring of bark is removed from the stem 30 cm below the leaf before the experiment is repeated. Predict and explain the result.",
        points: ["Radioactivity would not be detected (or very little) below the ring / accumulates above it", "The phloem is in the bark, so removing it breaks the pathway for assimilates (xylem intact)"],
        modelAnswer: "Radioactivity would build up above the ring and would not be detected below it, because removing the bark removes the phloem, cutting the pathway for labelled sucrose; the xylem is left intact.",
      }),
    ],
    explanation: "The leaf is the source; sucrose loading sets up a pressure gradient for mass flow; ringing removes the phloem.",
    hints: ["Rate = distance ÷ time; convert cm to mm."],
    calculator: true,
  });
  // ---------------------------------------------------------------- T3: the cardiac cycle
  const T = [0, 88, 176, 264, 352, 440, 528, 616];
  const LA = [4, 9, 3, 4, 6, 8, 6, 4];
  const LV = [3, 7, 63, 119, 66, 5, 4, 3];
  const AO = [81, 80, 77, 117, 108, 99, 92, 86];
  same(T.map((_, i) => LV[i] > AO[i]), [false, false, false, true, false, false, false, false]);
  same(T.map((_, i) => LA[i] > LV[i]), [true, true, false, false, false, true, true, true]);
  const hr = 60 / 0.704;
  const co = cardiacOutput(66, 85);
  chk(co, 5610);
  theory(b, {
    concepts: [A("mammal-transport.heart")],
    stem: `The table shows pressures on the left side of the heart of a healthy adult at rest. One cardiac cycle lasts 704 ms.\n\n${table(["Time / ms", ...T.map(String)], [["Left atrium / mmHg", ...LA.map(String)], ["Left ventricle / mmHg", ...LV.map(String)], ["Aorta / mmHg", ...AO.map(String)]])}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the heart rate in beats/min, to the nearest whole number.", value: hr, dp: 0, unit: "beats/min", wrong: [46, 0.08], explanation: t`$60 \div 0.704 =${dpStr(hr, 2)} \approx ${dpStr(hr, 0)}$ beats/min.` }),
      P.mcq({
        label: "(b)", stem: "Between which times does the aortic semilunar valve open?",
        options: [["176 ms and 264 ms", "Correct: ventricular pressure rises above aortic pressure (63 < 77, then 119 > 117)."], ["88 ms and 176 ms", "At 176 ms the ventricle (63) is still below the aorta (77)."], ["264 ms and 352 ms", "The valve closes in this interval."], ["352 ms and 440 ms", "Both are after the valve has closed."]],
        answer: "A", explanation: "The valve opens when LV pressure first exceeds aortic pressure: between 176 and 264 ms.",
      }),
      P.num({
        label: "(c)", marks: 2, stem: "Using a heart rate of 85 beats/min and a stroke volume of 66 cm³, calculate the cardiac output in dm³/min, to three significant figures.",
        value: co / 1000, sf: 3, unit: "dm³/min", wrong: [5610, sfStr(66 / 85, 3)],
        explanation: t`$66 \times 85 = 5610\ \text{cm}^3\ \text{min}^{-1} = ${sfStr(co / 1000, 3)}\ \text{dm}^3\ \text{min}^{-1}$.`,
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain why the bicuspid (mitral) valve closes between 88 ms and 176 ms.",
        points: ["The ventricle contracts so ventricular pressure rises above atrial pressure (63 mmHg against 3 mmHg at 176 ms)", "Blood pushes the valve flaps shut, preventing backflow into the atrium"],
        modelAnswer: "The ventricle starts to contract, so its pressure rises above that in the atrium (63 mmHg against 3 mmHg at 176 ms). Blood pushes the valve flaps together, closing the valve and preventing backflow into the atrium.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain the importance of the delay at the atrioventricular node.",
        points: ["Delays the wave of excitation (about 0.1 s) before it passes to the ventricles", "So the atria finish contracting / emptying and the ventricles fill before ventricular systole"],
        modelAnswer: "The AVN delays the excitation for about 0.1 s before passing it to the bundle of His, so the atria finish contracting and the ventricles are full before they contract.",
      }),
      P.short({ label: "(f)", marks: 1, stem: "Name the structure that initiates each heartbeat.", accepted: ["sinoatrial node", "SAN", "SA node", "sino-atrial node", "the sinoatrial node", "pacemaker"], wrong: ["atrioventricular node"], explanation: "The **sinoatrial node** (pacemaker)." }),
      P.tf({ label: "(g)", stem: "True or false: the maximum pressure in the right ventricle would be lower than 119 mmHg.", answer: true, explanation: "True. The right ventricle has a thinner wall and pumps only to the lungs." }),
    ],
    explanation: "Valves open and close with pressure differences; heart rate = 60 ÷ cycle time; cardiac output = stroke volume × heart rate.",
    hints: ["Compare the pressures either side of each valve."],
    calculator: true,
  });

  // ---------------------------------------------------------------- T4: oxygen dissociation and the Bohr shift
  const po2 = [2, 4, 6, 8, 10, 12];
  const low = [27, 56, 79, 89, 93, 99];
  const high = [15, 41, 67, 81, 91, 94];
  const relHigh = ((99 - 41) / 100) * 20;
  chk(relHigh, 11.6);
  theory(b, {
    concepts: [A("mammal-transport.gas-transport")],
    stem: `The table shows the percentage saturation of human haemoglobin with oxygen at two partial pressures of carbon dioxide. Fully saturated blood carries 20 cm³ of oxygen per 100 cm³ of blood.\n\n${table(["Partial pressure of oxygen / kPa", ...po2.map(String)], [["Saturation at low pCO₂ / %", ...low.map(String)], ["Saturation at high pCO₂ / %", ...high.map(String)]])}`,
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Blood leaves the lungs (12 kPa, low pCO₂) and reaches an active muscle at 4 kPa where pCO₂ is high. Calculate the volume of oxygen released to the muscle per 100 cm³ of blood, in cm³, to three significant figures.",
        value: relHigh, sf: 3, unit: "cm³", wrong: [sfStr(((99 - 56) / 100) * 20, 3), 58],
        explanation: t`$(99 - 41)\% \times 20 = 0.58 \times 20 = 11.6\ \text{cm}^3$. Using the low-pCO₂ value at 4 kPa (56%) gives ${sfStr(((99 - 56) / 100) * 20, 3)} cm³.`,
      }),
      P.mcq({
        label: "(b)", stem: "How does the high-pCO₂ curve differ from the low-pCO₂ curve?",
        options: [["It is shifted to the right", "Correct: lower saturation at each pO₂."], ["It is shifted to the left", "A left shift would give higher saturation."], ["It is identical at every pO₂", "The values differ at every pO₂."], ["It reaches 100% at a lower pO₂", "It is less saturated at every pO₂."]],
        answer: "A", explanation: "Lower saturation at the same pO₂: a shift to the **right** (Bohr shift).",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why haemoglobin is less saturated at high partial pressure of carbon dioxide.",
        points: ["CO₂ forms carbonic acid (carbonic anhydrase), which dissociates releasing H⁺", "H⁺ binds to haemoglobin (haemoglobinic acid), changing its shape and lowering its affinity for oxygen"],
        modelAnswer: "In red blood cells carbonic anhydrase converts CO₂ and water to carbonic acid, which dissociates and releases hydrogen ions. These bind to haemoglobin, forming haemoglobinic acid and changing its shape, so its affinity for oxygen falls.",
      }),
      P.fib({
        label: "(d)", stem: "Complete the description of carbon dioxide transport.",
        template: "Most CO₂ is carried in the plasma as {{blank:a}} ions. As these leave red blood cells, {{blank:b}} ions move in. Some CO₂ combines with the amino groups of globin to form {{blank:c}}.",
        blanks: [
          { id: "a", accepted: ["hydrogencarbonate"], choices: ["hydrogencarbonate", "carbonate", "chloride", "hydrogen"] },
          { id: "b", accepted: ["chloride"], choices: ["chloride", "sodium", "hydrogen", "potassium"] },
          { id: "c", accepted: ["carbaminohaemoglobin"], choices: ["carbaminohaemoglobin", "oxyhaemoglobin", "carboxyhaemoglobin", "haemoglobinic acid"] },
        ],
        explanation: "HCO₃⁻ in plasma, chloride shift, carbaminohaemoglobin.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain the advantage of the S-shaped curve to a person at rest.",
        points: ["At lung pO₂ (about 12 kPa) the curve is flat, so haemoglobin is almost fully saturated (99%) even if pO₂ falls slightly", "At tissue pO₂ (2-6 kPa) the curve is steep, so a small fall in pO₂ releases a lot of oxygen"],
        modelAnswer: "At the high pO₂ of the lungs the curve is flat, so haemoglobin loads almost fully (99%) even if pO₂ drops slightly. At the low pO₂ of respiring tissues the curve is steep, so a small fall in pO₂ releases a large amount of oxygen.",
      }),
    ],
    explanation: "Oxygen released = difference in saturation × capacity; high CO₂ shifts the curve right (Bohr shift).",
    hints: ["Read the lungs value from the low-pCO₂ row and the muscle value from the high-pCO₂ row."],
    calculator: true,
  });

  // ---------------------------------------------------------------- T5: gene mutation
  const tmpl = "TACCTTCAAGGGACT"; // 3'->5'
  const mr = mrnaFromTemplate(tmpl);
  same(mr, "AUGGAAGUUCCCUGA");
  const prot = translate(mr).join("-");
  same(prot, "Met-Glu-Val-Pro");
  const tmplSub = "TACCTCCAAGGGACT";
  const mrSub = mrnaFromTemplate(tmplSub);
  same(translate(mrSub).join("-"), "Met-Glu-Val-Pro");
  const tmplNon = "TACATTCAAGGGACT";
  same(translate(mrnaFromTemplate(tmplNon)).join("-"), "Met");
  const codons = codonRows([...g(mr).split(" "), ...g(mrSub).split(" "), "UAA"]);
  theory(b, {
    concepts: [A("nucleic.gene-mutation")],
    stem: `Part of the template strand of a gene reads 3' ${g(tmpl)} 5'. Two mutant forms are found:\n\nMutant 1: 3' ${g(tmplSub)} 5'\n\nMutant 2: 3' ${g(tmplNon)} 5'\n\nmRNA codons: ${codons.map(([c, x]) => `${c} ${x}`).join("; ")}.`,
    parts: [
      P.short({
        label: "(a)", marks: 1, stem: "Write the mRNA transcribed from the original template strand, 5' to 3', without spaces.",
        accepted: [mr, g(mr)], wrong: [tmpl, mr.replace(/U/g, "T")],
        explanation: `mRNA: 5' ${g(mr)} 3'.`,
      }),
      P.short({
        label: "(b)", marks: 1, stem: "Give the sequence of amino acids coded by the original gene, using three-letter abbreviations separated by hyphens.",
        accepted: [prot, "Met Glu Val Pro", "MetGluValPro"], wrong: ["Met-Glu-Val-Pro-Stop"],
        explanation: `${g(mr)} → ${prot}, then stop.`,
      }),
      P.mcq({
        label: "(c)", stem: "What type of mutation is Mutant 1?",
        options: [["A silent substitution", "Correct: GAA → GAG still codes for Glu."], ["A missense substitution", "The amino acid is unchanged."], ["A nonsense substitution", "No stop codon is formed."], ["A frameshift deletion", "No base has been lost."]],
        answer: "A", explanation: "CTT → CTC on the template gives GAA → GAG in mRNA; both code for glutamic acid: **silent**.",
      }),
      P.mcq({
        label: "(d)", stem: "What is the effect of Mutant 2?",
        options: [["Translation stops after methionine", "Correct: GAA → UAA, a stop codon."], ["Glutamic acid is replaced by valine", "That is the sickle cell change (GAG → GUG), not this one."], ["Every amino acid after methionine changes", "A substitution does not shift the frame."], ["The polypeptide is unchanged", "UAA is a stop codon."]],
        answer: "A", explanation: "Template CTT → ATT gives mRNA GAA → UAA: a **nonsense** mutation.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain why Mutant 1 has no effect on the polypeptide.",
        points: ["The genetic code is degenerate / more than one codon codes for most amino acids", "GAG and GAA both code for glutamic acid, so the primary structure is unchanged"],
        modelAnswer: "The genetic code is degenerate: GAA and GAG both code for glutamic acid, so the amino acid sequence, and therefore the protein, is unchanged.",
      }),
      P.manual({
        label: "(f)", marks: 3, stem: "In the sickle cell allele, glutamic acid in the β-globin chain is replaced by valine. Explain how this changes the behaviour of haemoglobin.",
        points: ["Valine has a non-polar / hydrophobic R group whereas glutamic acid is polar / charged", "At low oxygen concentration, deoxygenated haemoglobin S molecules stick together, forming long fibres", "Red blood cells become sickle-shaped / rigid, blocking capillaries and carrying less oxygen"],
        modelAnswer: "Valine has a non-polar, hydrophobic R group where glutamic acid had a charged one. When haemoglobin S is deoxygenated, the hydrophobic regions make molecules stick together into long fibres. This distorts red blood cells into rigid sickle shapes that block capillaries and carry less oxygen.",
      }),
      P.tf({ label: "(g)", stem: "True or false: deleting one base from the template strand would change every codon after the deletion.", answer: true, explanation: "True: a frameshift." }),
    ],
    explanation: "Transcribe by complementary pairing, translate by codons; classify each mutation by its effect.",
    hints: ["Template → mRNA: A→U, T→A, C→G, G→C."],
  });

  // ---------------------------------------------------------------- T6: gas exchange system (Cambridge only)
  const alv = actualSize(36, "mm", 160);
  chk(alv, 225);
  const rel = (0.55 * 1.0) / 1.1;
  chk(rel, 0.5);
  theory(b, {
    paper: "Cambridge P2", applies: CAM,
    concepts: [A("gas-exchange.system")],
    stem: "Three regions of a human lung are described from photomicrographs.\n\nRegion P: an airway with irregular plates of cartilage, a lining of ciliated cells with goblet cells, and smooth muscle.\n\nRegion Q: a small airway with no cartilage, surrounded by a thick layer of smooth muscle, with a folded lining.\n\nRegion R: many small air sacs with very thin walls, each surrounded by capillaries containing red blood cells.",
    parts: [
      P.match({
        label: "(a)", stem: "Identify each region.",
        pairs: [["P", "Bronchus"], ["Q", "Bronchiole"], ["R", "Alveoli"]],
        extraRight: ["Trachea"],
        explanation: "Cartilage plates: bronchus. No cartilage, smooth muscle: bronchiole. Thin-walled air sacs: alveoli.",
      }),
      P.num({
        label: "(b)", marks: 1, stem: "An alveolus in region R measures 36 mm across on a photomicrograph at ×160. Calculate its actual diameter in µm.",
        value: alv, unit: "µm", wrong: [0.225, 5760],
        explanation: t`$36\,000 \div 160 = 225\ \mu\text{m}$.`,
      }),
      P.mcq({
        label: "(c)", stem: "What is the function of the goblet cells in region P?",
        options: [["Secreting mucus that traps particles", "Correct."], ["Sweeping mucus towards the throat", "Ciliated cells do this."], ["Keeping the airway open", "Cartilage does this."], ["Exchanging gases with the blood", "This happens in the alveoli."]],
        answer: "A", explanation: "Goblet cells secrete **mucus**.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Explain how the structure of region R is adapted for efficient gas exchange.",
        points: ["Many alveoli give a large surface area", "Walls of squamous epithelium (one cell thick) next to capillary endothelium give a short diffusion distance", "Dense capillary network / blood flow and ventilation maintain a steep concentration gradient"],
        modelAnswer: "The many alveoli give a very large surface area. Their walls are thin squamous epithelium pressed against capillaries whose walls are one cell thick, so the diffusion distance is short. A dense capillary network carries oxygen away and ventilation renews the air, keeping the concentration gradient steep.",
      }),
      P.num({
        label: "(e)", marks: 1, stem: t`Rate of diffusion $\propto \dfrac{\text{surface area} \times \text{concentration difference}}{\text{thickness}}$. In a damaged lung the surface area falls to 0.55 of normal and the barrier thickness increases to 1.1 times normal. Calculate the rate of diffusion as a fraction of normal.`,
        value: rel, dp: 2, wrong: [sfStr(0.55 * 1.1, 3)],
        explanation: t`$0.55 \div 1.1 = 0.50$.`,
      }),
      P.manual({
        label: "(f)", marks: 1, stem: "Suggest why smooth muscle is important in region Q.",
        points: ["It contracts or relaxes to change the diameter of the bronchiole and so control airflow to the alveoli"],
        modelAnswer: "It can contract or relax to change the diameter of the bronchiole, controlling the flow of air to the alveoli.",
      }),
    ],
    explanation: "Identify airways by cartilage and smooth muscle; alveoli maximise surface area, minimise distance and keep gradients steep.",
    hints: ["Which region has cartilage plates?"],
    calculator: true,
  });
});
