// W1b: ZIMSEC-only exam-format items: three Paper 3 Section A free-response questions and one Paper 4 quantitative
// analysis question (manganate(VII) with ethanedioate).
import { concept, P, t, ZIM, EXAM, checkExam, titre, meanTitre, molesFromSolution, Mr, AR, F, latticeEnergyFromCycle, solutionEnthalpy, ecell, pctErrorDifference, sfStr, dpStr, sciStr } from "../lib.mjs";

const A = (k) => `achem.${k}`;
const P3 = { skill: EXAM.ZIM_P3_FREE.skill, secs: EXAM.ZIM_P3_FREE.secs, applies: EXAM.ZIM_P3_FREE.applies, examStyle: true, paper: "Paper 3 Section A" };
const P4 = { skill: EXAM.ZIM_P4_QUANTITATIVE.skill, secs: EXAM.ZIM_P4_QUANTITATIVE.secs, applies: EXAM.ZIM_P4_QUANTITATIVE.applies, examStyle: true, paper: "Paper 4" };

concept(A("electrochem.industrial-electrolysis"), { file: "exam/w1b-zimsec", keyPrefix: "exam.w1b-zimsec", applies: ZIM }, (b) => {
  // ------------------------------------------------------------ Z1: aluminium smelting and copper refining
  {
    const Qkg = 3 * (1000 / AR.Al) * F;
    const Qh = 2.2e5 * 3600;
    const ne = Qh / F;
    const kgAl = ((ne / 3) * AR.Al) / 1000;
    const kgC = ((ne / 4) * 12.0) / 1000;
    b.struct({
      ...P3, d: 4, calculator: true,
      concepts: [A("electrochem.industrial-electrolysis"), A("electrochem.faraday")],
      stem: "Aluminium is extracted by electrolysis of alumina dissolved in molten cryolite, using carbon electrodes. Copper is purified by electrolysis. (Ar: C 12.0, Al 27.0; F = 9.65 × 10⁴ C mol⁻¹)",
      parts: checkExam(EXAM.ZIM_P3_FREE, [
        P.short({ label: "(a)", marks: 1, stem: "Write the half-equation at the cathode of the aluminium cell. (Type it as, for example, Al3+ + 3e- -> Al.)", accepted: ["Al3+ + 3e- -> Al", "Al3+ + 3e- → Al", "Al³⁺ + 3e⁻ → Al", "Al^3+ + 3e- -> Al", "Al3+ + 3e = Al"], normalise: ["trim", "lowercase", "remove_whitespace"], wrong: ["Al -> Al3+ + 3e-"], explanation: "Aluminium ions are reduced at the cathode." }),
        P.short({ label: "(b)", marks: 1, stem: "Write the half-equation at the anode of the aluminium cell. (Type it as, for example, 2O2- -> O2 + 4e-.)", accepted: ["2O2- -> O2 + 4e-", "2O2- → O2 + 4e-", "2O²⁻ → O₂ + 4e⁻", "2O^2- -> O2 + 4e-", "2O2- = O2 + 4e-"], normalise: ["trim", "lowercase", "remove_whitespace"], wrong: ["O2 + 4e- -> 2O2-"], explanation: "Oxide ions are oxidised to oxygen at the anode." }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the charge, in C, needed to produce 1.00 kg of aluminium, to three significant figures.", value: Qkg, sf: 3, unit: "C", wrong: [sfStr(Qkg / 3, 3)], explanation: `n(Al) = 1000 ÷ 27.0 = ${sfStr(1000 / AR.Al, 4)} mol; electrons = 3 × that = ${sfStr(3000 / AR.Al, 4)} mol; Q = ${sfStr(3000 / AR.Al, 4)} × 9.65 × 10⁴ = ${sciStr(Qkg, 3)} C.` }),
        P.num({ label: "(d)", marks: 2, stem: "A cell operates at a current of 2.20 × 10⁵ A. Calculate the mass of aluminium, in kg, it produces in one hour, to three significant figures.", value: kgAl, sf: 3, unit: "kg", wrong: [sfStr(kgAl * 3, 3)], explanation: `Q = 2.20 × 10⁵ × 3600 = 7.92 × 10⁸ C; n(e⁻) = ${sfStr(ne, 4)} mol; n(Al) = ${sfStr(ne / 3, 4)} mol; mass = ${sfStr(kgAl, 3)} kg.` }),
        P.num({ label: "(e)", marks: 2, stem: "Assume all the oxygen formed in that hour reacts with the carbon anodes to form carbon dioxide. Calculate the mass of carbon anode, in kg, used up in that hour, to three significant figures.", value: kgC, sf: 3, unit: "kg", wrong: [sfStr(kgC * 2, 3)], explanation: `n(O₂) = n(e⁻) ÷ 4 = ${sfStr(ne / 4, 4)} mol = n(C) (C + O₂ → CO₂); mass = ${sfStr(ne / 4, 4)} × 12.0 g = ${sfStr(kgC, 3)} kg.` }),
        P.mcq({ label: "(f)", stem: "Why must the carbon anodes be replaced regularly?", options: [["They are oxidised to carbon dioxide by the oxygen formed.", "Correct: C + O₂ → CO₂ at about 950 °C."], ["Aluminium deposits on them and blocks the current.", "Aluminium forms at the cathode."], ["Cryolite slowly dissolves the hot carbon.", "Cryolite dissolves alumina, not carbon."], ["Sodium from the cryolite coats the anodes.", "Sodium is not deposited at the anode."]], answer: "A", explanation: "The anodes burn away in the oxygen they release." }),
        P.manual({ label: "(g)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Describe and explain the electrolytic purification of copper. Include the electrodes, the electrolyte, the electrode equations and what happens to zinc and silver impurities.", points: ["Impure copper anode; thin sheet of pure copper as cathode.", "Electrolyte: copper(II) sulfate solution acidified with sulfuric acid.", "Anode: Cu → Cu²⁺ + 2e⁻; cathode: Cu²⁺ + 2e⁻ → Cu (cathode grows, anode shrinks).", "Zinc (more reactive) dissolves as Zn²⁺ but stays in solution, because Cu²⁺ is reduced in preference.", "Silver (less reactive) does not dissolve and falls below the anode as anode sludge, from which it is recovered."], modelAnswer: "The impure copper is made the anode and a thin sheet of pure copper the cathode, in copper(II) sulfate solution acidified with sulfuric acid. At the anode copper atoms are oxidised, Cu → Cu²⁺ + 2e⁻, and the anode dissolves; at the cathode Cu²⁺ + 2e⁻ → Cu deposits pure copper. Zinc, being more reactive, also dissolves as Zn²⁺, but Zn²⁺ is much harder to reduce than Cu²⁺, so it stays in solution. Silver is less reactive than copper, so it is not oxidised; it falls to the bottom as anode sludge, which is collected and refined for silver and other precious metals." }),
        P.fib({ label: "(h)", stem: "Complete the sentence.", template: "Recycling aluminium is encouraged because it needs much less {{blank:a}} than extracting it from alumina.", blanks: [{ id: "a", accepted: ["electricity"], choices: ["electricity", "cryolite", "copper"] }], explanation: "Recycling only needs the metal to be melted, a small fraction of the electrical energy of electrolysis." }),
      ]),
      hints: ["Al³⁺ needs three electrons; O₂ releases four.", "Q = It with t in seconds."],
      explanation: `${sciStr(Qkg, 3)} C per kg of Al; ${sfStr(kgAl, 3)} kg of Al and ${sfStr(kgC, 3)} kg of carbon anode used per hour at 2.20 × 10⁵ A.`,
    });
  }

  // ------------------------------------------------------------ Z2: lithium iodide energetics
  {
    const le = latticeEnergyFromCycle(-270, [159, 519, 107, -295]);
    const sol = solutionEnthalpy(le, [-520, -305]);
    const fAq = -270 + sol;
    b.struct({
      ...P3, d: 4,
      concepts: [A("energetics.born-haber"), A("energetics.solution-hydration"), A("energetics.hess-bond-energies")],
      stem: "Data for lithium iodide (kJ mol⁻¹): ΔH⦵f(LiI(s)) −270; ΔH⦵at(Li) +159; IE₁(Li) +519; ΔH⦵at(I) +107; EA₁(I) −295; ΔH⦵hyd(Li⁺) −520; ΔH⦵hyd(I⁻) −305.",
      parts: checkExam(EXAM.ZIM_P3_FREE, [
        P.manual({ label: "(a)", marks: 3, stem: "Define the terms *standard enthalpy change of formation* and *lattice energy*.", points: ["Formation: enthalpy change when one mole of a compound is formed from its elements in their standard states.", "Both under standard conditions (298 K, 101 kPa).", "Lattice energy: enthalpy change when one mole of an ionic compound is formed from its gaseous ions."], modelAnswer: "The standard enthalpy change of formation is the enthalpy change when one mole of a compound is formed from its elements in their standard states under standard conditions. Lattice energy is the enthalpy change when one mole of an ionic solid is formed from its gaseous ions under standard conditions." }),
        P.num({ label: "(b)", marks: 3, stem: "Use a Born-Haber cycle to calculate the lattice energy of lithium iodide, in kJ mol⁻¹.", value: le, unit: "kJ/mol", wrong: [String(latticeEnergyFromCycle(-270, [159, 519, 107, 295])), String(-le)], explanation: `Sum of the steps to the gaseous ions = 159 + 519 + 107 − 295 = ${159 + 519 + 107 - 295} kJ. ΔHlatt = −270 − ${159 + 519 + 107 - 295} = ${le} kJ mol⁻¹.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the enthalpy change of solution of lithium iodide, in kJ mol⁻¹.", value: sol, unit: "kJ/mol", wrong: [String(le - 520 - 305)], explanation: `ΔHsol = −(${le}) + (−520) + (−305) = ${sol} kJ mol⁻¹.` }),
        P.mcq({ label: "(d)", stem: "What would be observed when lithium iodide dissolves in water?", options: [["The solution becomes warmer.", "Correct: ΔHsol is negative."], ["The solution becomes colder.", "That needs a positive ΔHsol."], ["Iodine is released.", "Dissolving is not a redox reaction."], ["Hydrogen gas is given off.", "Lithium ions do not react with water."]], answer: "A", explanation: "An exothermic enthalpy of solution warms the water." }),
        P.manual({ label: "(e)", marks: 4, stem: "Explain (i) why the lattice energy of LiI is less exothermic than that of LiF, and (ii) why the hydration enthalpy of Li⁺ is more exothermic than that of Na⁺.", points: ["(i) I⁻ is much larger than F⁻ (same charge).", "(i) So the ions are further apart and the attraction between Li⁺ and I⁻ is weaker.", "(ii) Li⁺ is smaller than Na⁺ (same charge), so it has a higher charge density.", "(ii) Water molecules (δ− oxygen) get closer and are attracted more strongly, releasing more energy."], modelAnswer: "(i) Fluoride and iodide carry the same charge, but iodide is much larger, so the centres of the ions in LiI are further apart and the electrostatic attraction is weaker. (ii) Li⁺ and Na⁺ have the same charge but Li⁺ is smaller, giving a higher charge density; the δ− oxygen atoms of water molecules can approach more closely and are held more strongly, so more energy is released." }),
        P.num({ label: "(f)", marks: 2, stem: "Use Hess's law with your answers to find the enthalpy change for Li(s) + ½I₂(s) + aq → Li⁺(aq) + I⁻(aq), in kJ mol⁻¹.", value: fAq, unit: "kJ/mol", explanation: `Route: form LiI(s) (−270), then dissolve it (${sol}): ΔH = −270 + (${sol}) = ${fAq} kJ mol⁻¹.` }),
      ]),
      hints: ["ΔHlatt = ΔHf − (sum of the other terms).", "ΔHsol = −ΔHlatt + ΣΔHhyd."],
      explanation: `ΔHlatt(LiI) = ${le} kJ mol⁻¹; ΔHsol = ${sol} kJ mol⁻¹; overall ${fAq} kJ mol⁻¹.`,
    });
  }

  // ------------------------------------------------------------ Z3: vanadium redox
  {
    const e1 = ecell(1.52, 1.0);
    const n = molesFromSolution(18.70, 0.0250) * 5;
    const c = n / 0.0200;
    const mV = n * AR.V;
    b.struct({
      ...P3, d: 5, calculator: true,
      concepts: [A("electrochem.redox-titrations"), A("electrochem.electrode-potentials"), A("electrochem.oxidation-numbers")],
      stem: t`Data (E⦵ / V): $\ce{MnO4- + 8H+ + 5e- <=> Mn^2+ + 4H2O}$ +1.52; $\ce{VO2+ + 2H+ + e- <=> VO^2+ + H2O}$ +1.00; $\ce{VO^2+ + 2H+ + e- <=> V^3+ + H2O}$ +0.34; $\ce{V^3+ + e- <=> V^2+}$ −0.26; $\ce{Sn^2+ + 2e- <=> Sn}$ −0.14. (Ar: V 50.9)`,
      parts: checkExam(EXAM.ZIM_P3_FREE, [
        P.fib({ label: "(a)", stem: "Give the oxidation number of vanadium in each ion.", template: "VO₂⁺: {{blank:a}}; VO²⁺: {{blank:b}}", blanks: [{ id: "a", accepted: ["+5", "5"], wrong: "+4" }, { id: "b", accepted: ["+4", "4"], wrong: "+2" }], explanation: "VO₂⁺: x − 4 = +1, x = +5. VO²⁺: x − 2 = +2, x = +4." }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate E⦵cell, in V, for manganate(VII) oxidising VO²⁺ to VO₂⁺.", value: e1, dp: 2, unit: "V", explanation: `1.52 − 1.00 = +${dpStr(e1, 2)} V.` }),
        P.num({ label: "(c)", marks: 3, stem: "20.0 cm³ of a solution of VO²⁺ ions needed 18.70 cm³ of 0.0250 mol dm⁻³ acidified KMnO₄ to oxidise them to VO₂⁺. Calculate the concentration of VO²⁺, in mol dm⁻³, to three significant figures.", value: c, sf: 3, unit: "mol/dm³", wrong: [sfStr(c / 5, 3)], explanation: `n(MnO₄⁻) = 0.01870 × 0.0250 = ${sfStr(n / 5, 3)} mol. Each VO²⁺ loses one electron and each MnO₄⁻ gains five, so n(VO²⁺) = 5 × that = ${sfStr(n, 3)} mol; c = ${sfStr(n, 3)} ÷ 0.0200 = ${sfStr(c, 3)} mol dm⁻³.` }),
        P.manual({ label: "(d)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Tin metal and dilute acid are added to a solution of VO₂⁺ ions. Use the data to explain the colour changes seen, and why the final vanadium species is V³⁺ and not V²⁺.", points: ["Sn reduces VO₂⁺ (yellow) to VO²⁺ (blue): E⦵cell = 1.00 − (−0.14) = +1.14 V, feasible.", "Sn reduces VO²⁺ to V³⁺ (green): E⦵cell = 0.34 − (−0.14) = +0.48 V, feasible.", "Sn cannot reduce V³⁺ to V²⁺: E⦵cell = −0.26 − (−0.14) = −0.12 V, not feasible.", "Colours: yellow, then green (a yellow and blue mixture), then blue, then green (V³⁺).", "So the reduction stops at V³⁺ (a stronger reducing agent such as zinc would be needed to reach violet V²⁺)."], modelAnswer: "With tin as the reducing agent, VO₂⁺ → VO²⁺ has E⦵cell = +1.14 V and VO²⁺ → V³⁺ has E⦵cell = +0.48 V, so both happen: the yellow solution turns green (yellow and blue mixed), then blue, then green as V³⁺ forms. For V³⁺ → V²⁺, E⦵cell = −0.26 − (−0.14) = −0.12 V, which is negative, so tin cannot produce violet V²⁺; the final species is green V³⁺. A stronger reducing agent such as zinc would be needed to reach V²⁺." }),
        P.num({ label: "(e)", marks: 2, stem: "Calculate the mass of vanadium, in g, in the 20.0 cm³ of solution used in (c), to three significant figures.", value: mV, sf: 3, unit: "g", explanation: `${sfStr(n, 3)} mol × 50.9 = ${sfStr(mV, 3)} g.` }),
        P.mcq({ label: "(f)", stem: "Which species could reduce VO₂⁺ to VO²⁺ but NOT reduce VO²⁺ to V³⁺, according to E⦵ values?", options: [["Fe²⁺ (E⦵ Fe³⁺/Fe²⁺ = +0.77 V)", "Correct: 1.00 − 0.77 > 0 but 0.34 − 0.77 < 0."], ["Sn (E⦵ Sn²⁺/Sn = −0.14 V)", "Tin reduces vanadium as far as V³⁺, past VO²⁺."], ["Mn²⁺", "Mn²⁺ is the reduced form of a strong oxidising agent; it is not a useful reducing agent here."], ["V²⁺", "V²⁺ (−0.26 V couple) can reduce VO²⁺ to V³⁺ as well."]], answer: "A", explanation: "A reducing agent whose couple lies between +0.34 and +1.00 V stops at VO²⁺." }),
        P.short({ label: "(g)", marks: 1, stem: "State the colour of the solution containing V³⁺ ions.", accepted: ["green"], wrong: ["blue", "violet"], explanation: "V³⁺(aq) is green." }),
      ]),
      hints: ["Each step is feasible if E⦵(vanadium couple) − E⦵(Sn²⁺/Sn) is positive.", "VO²⁺ → VO₂⁺ is a one-electron change."],
      explanation: `MnO₄⁻ oxidises VO²⁺ (+${dpStr(e1, 2)} V); [VO²⁺] = ${sfStr(c, 3)} mol dm⁻³; tin reduces vanadium step by step, but only as far as V³⁺.`,
    });
  }

  // ------------------------------------------------------------ P4: manganate(VII) with sodium ethanedioate
  {
    const rd = [[0.20, 24.30], [0.35, 23.80], [1.25, 24.80], [0.45, 24.00]];
    const ts = rd.map(([a, c]) => titre(a, c));
    const { mean: m, used } = meanTitre(ts.slice(1));
    const mass = 16.37 - 15.65;
    const nMn = molesFromSolution(m, 0.0180);
    const nOx = nMn * 2.5;
    const tot = nOx * 5;
    const mNa = tot * Mr("Na2C2O4");
    const pur = (mNa / mass) * 100;
    const uM = pctErrorDifference(0.005, mass);
    const uT = pctErrorDifference(0.05, m);
    b.struct({
      ...P4, d: 5, calculator: true,
      concepts: [A("skills.quantitative-practical"), A("electrochem.redox-titrations")],
      stem: `You are to find the percentage purity of a sample of sodium ethanedioate, Na₂C₂O₄ (Mr = 134.0).

Method:
1. Weigh a weighing bottle containing the sample. Tip the sample into a beaker and reweigh the bottle.
2. Dissolve the sample in about 50 cm³ of dilute sulfuric acid, transfer to a 100 cm³ volumetric flask and make up to the mark with distilled water.
3. Pipette 20.0 cm³ into a conical flask, add 10 cm³ of dilute sulfuric acid and warm to about 60 °C.
4. Titrate with 0.0180 mol dm⁻³ potassium manganate(VII) until a permanent pale pink colour appears. Repeat to obtain concordant titres.

Results: mass of bottle + sample 16.37 g; mass of bottle after tipping 15.65 g.

| Titration | rough | 1 | 2 | 3 |
|---|---|---|---|---|
| final reading / cm³ | ${rd.map(([, c]) => c.toFixed(2)).join(" | ")} |
| initial reading / cm³ | ${rd.map(([a]) => a.toFixed(2)).join(" | ")} |

2MnO₄⁻ + 5C₂O₄²⁻ + 16H⁺ → 2Mn²⁺ + 10CO₂ + 8H₂O. Eye protection must be worn; potassium manganate(VII) is an oxidiser and stains skin.`,
      parts: checkExam(EXAM.ZIM_P4_QUANTITATIVE, [
        P.manual({ label: "(a)", marks: 3, stem: "Describe how you would present these results in a complete table.", points: ["A row (or column) for the titre, calculated as final − initial reading.", "Headings with quantity and unit, e.g. 'titre / cm³'.", "All readings and titres recorded to two decimal places (nearest 0.05 cm³), with the rough titre labelled and the concordant titres indicated."], modelAnswer: "Add a 'titre / cm³' row giving final − initial reading for each titration; keep every value to two decimal places ending in 0 or 5; label the rough titration and tick the concordant titres used for the mean." }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the mean of the concordant titres, in cm³ to two decimal places.", value: m, dp: 2, unit: "cm³", wrong: [dpStr(ts.reduce((s, x) => s + x) / 4, 2)], explanation: `Titres: ${ts.map((x) => dpStr(x, 2)).join(", ")}. Concordant: ${used.map((x) => dpStr(x, 2)).join(", ")}; mean = ${dpStr(m, 2)} cm³.` }),
        P.num({ label: "(c)", marks: 1, stem: "Calculate the amount, in mol, of manganate(VII) in the mean titre.", value: nMn, sf: 3, unit: "mol", explanation: `${dpStr(m, 2)} ÷ 1000 × 0.0180 = ${sfStr(nMn, 3)} mol.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the amount, in mol, of ethanedioate ions in 20.0 cm³ of the solution.", value: nOx, sf: 3, unit: "mol", wrong: [sfStr(nMn * 0.4, 3)], explanation: `C₂O₄²⁻ : MnO₄⁻ = 5 : 2, so n = ${sfStr(nMn, 3)} × 5/2 = ${sfStr(nOx, 3)} mol.` }),
        P.num({ label: "(e)", marks: 2, stem: "Calculate the mass, in g, of sodium ethanedioate in the 100 cm³ flask, to three significant figures.", value: mNa, sf: 3, unit: "g", wrong: [sfStr(nOx * 134.0, 3)], explanation: `n in 100 cm³ = 5 × ${sfStr(nOx, 3)} = ${sfStr(tot, 3)} mol; mass = ${sfStr(tot, 3)} × 134.0 = ${sfStr(mNa, 3)} g.` }),
        P.num({ label: "(f)", marks: 2, stem: "Calculate the percentage purity of the sample, to three significant figures.", value: pur, sf: 3, unit: "%", explanation: `Mass of sample = 16.37 − 15.65 = ${dpStr(mass, 2)} g; purity = ${sfStr(mNa, 3)} ÷ ${dpStr(mass, 2)} × 100 = ${sfStr(pur, 3)}%.` }),
        P.num({ label: "(g)", marks: 1, stem: "Each balance reading is uncertain by ±0.005 g. Calculate the percentage uncertainty in the mass of sample, to two significant figures.", value: uM, sf: 2, unit: "%", explanation: `Two readings: ±0.01 g; 0.01 ÷ ${dpStr(mass, 2)} × 100 = ${sfStr(uM, 2)}%.` }),
        P.num({ label: "(h)", marks: 1, stem: "Each burette reading is uncertain by half of the smallest division (0.1 cm³). Calculate the percentage uncertainty in the mean titre, to three significant figures.", value: uT, sf: 3, unit: "%", explanation: `±0.10 cm³ on ${dpStr(m, 2)} cm³: ${sfStr(uT, 3)}%.` }),
        P.manual({ label: "(i)", marks: 3, stem: "Explain why the solution is warmed, why no indicator is needed, and why the purple colour disappears slowly at first and then quickly.", points: ["Warming (to about 60 °C) increases the rate: the reaction between the two negative ions has a high activation energy.", "Manganate(VII) is purple and its reduction product Mn²⁺ is almost colourless, so the first excess drop gives a pink colour (self-indicating).", "Mn²⁺ ions formed catalyse the reaction (autocatalysis), so after a slow start the colour disappears quickly."], modelAnswer: "The reaction is slow at room temperature because two negatively charged ions must react, so warming speeds it up. Purple MnO₄⁻ is reduced to nearly colourless Mn²⁺, so the first slight excess shows as a permanent pink colour and no indicator is needed. The Mn²⁺ produced catalyses the reaction, so once some has formed the colour disappears much faster." }),
        P.manual({ label: "(j)", marks: 3, stem: "The percentage uncertainty in the mass is much larger than in the titre. Suggest how the method could be improved, and identify one other source of error with its improvement.", points: ["Use a larger mass of sample (e.g. about 2-3 g made up in a 250 cm³ flask) or a three-place balance, to reduce the percentage uncertainty in the mass.", "Error: some sample left in the beaker or funnel, or not all transferred to the flask.", "Improvement: rinse the beaker, rod and funnel with distilled water into the flask (or: titrate at a steady 60 °C / add titrant dropwise near the end point to avoid overshooting)."], modelAnswer: "Weigh out a larger mass (for example 2.5 g into a 250 cm³ flask) or use a three-decimal-place balance, so the mass uncertainty is much smaller. Solution may also be lost when transferring from the beaker; rinsing the beaker, stirring rod and funnel into the flask with distilled water prevents this." }),
      ]),
      hints: ["Leave out the rough titre.", "MnO₄⁻ : C₂O₄²⁻ = 2 : 5; scale 20.0 cm³ up to 100 cm³."],
      explanation: `Mean titre ${dpStr(m, 2)} cm³; Na₂C₂O₄ in the sample ${sfStr(mNa, 3)} g; purity ${sfStr(pur, 3)}%; the mass (${sfStr(uM, 2)}%) is the least precise measurement.`,
    });
  }
});
