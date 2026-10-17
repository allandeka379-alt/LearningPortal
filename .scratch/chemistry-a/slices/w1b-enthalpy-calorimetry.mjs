// W1b: achem.energetics.enthalpy-calorimetry
import { concept, P, t, ce, ZIM, heatQ, deltaHFromQ, molesFromSolution, moles, Mr, sfStr, dpStr, chk, linearFit, round } from "../lib.mjs";

concept("achem.energetics.enthalpy-calorimetry", { file: "energetics/enthalpy-calorimetry", keyPrefix: "energetics.enthalpy-calorimetry" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "When a reaction in a polystyrene cup takes place, the temperature of the solution rises. Which statement is correct?",
    options: [
      ["The reaction is exothermic and ΔH is negative.", "Correct: energy is transferred from the reacting system to the solution, so the system's enthalpy falls."],
      ["The reaction is endothermic and ΔH is positive.", "An endothermic reaction takes energy from the solution, which would cool."],
      ["The reaction is exothermic and ΔH is positive.", "Exothermic means the system loses enthalpy, so ΔH is negative."],
      ["The reaction is endothermic and ΔH is negative.", "Both parts are wrong: a rise in temperature means exothermic, negative ΔH."],
    ],
    answer: "A",
    explanation: "The solution is the surroundings. If it warms up, the reacting system has given out energy: exothermic, ΔH < 0.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which equation represents the standard enthalpy change of formation of ethanoic acid, CH₃COOH(l)?",
    options: [
      [t`$\ce{2C(s) + 2H2(g) + O2(g) -> CH3COOH(l)}$`, "Correct: one mole of the compound from its elements in their standard states."],
      [t`$\ce{4C(s) + 4H2(g) + 2O2(g) -> 2CH3COOH(l)}$`, "This forms two moles; the definition is for one mole."],
      [t`$\ce{2C(s) + 4H(g) + 2O(g) -> CH3COOH(l)}$`, "Gaseous atoms are not the standard states of hydrogen and oxygen, which are H₂(g) and O₂(g)."],
      [t`$\ce{CH3COOH(l) + 2O2(g) -> 2CO2(g) + 2H2O(l)}$`, "This is combustion of ethanoic acid, not formation."],
    ],
    answer: "A",
    explanation: "Formation: one mole of compound, made from its elements in their standard states (C(s) as graphite, H₂(g), O₂(g)), under standard conditions.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which set of conditions is used for standard enthalpy changes?",
    options: [
      ["298 K and 101 kPa", "Correct: 25 °C and one atmosphere (101 kPa), with solutions at 1 mol dm⁻³."],
      ["273 K and 101 kPa", "273 K is used for s.t.p. gas volumes, not for standard enthalpy changes."],
      ["298 K and 1 kPa", "Standard pressure is 101 kPa, not 1 kPa."],
      ["373 K and 101 kPa", "373 K is the boiling point of water; standard temperature is 298 K."],
    ],
    answer: "A",
    explanation: "Standard conditions for thermochemistry: 298 K, 101 kPa, 1 mol dm⁻³ solutions, substances in their standard states.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A reaction has ΔH = +62 kJ mol⁻¹ and an activation energy of 145 kJ mol⁻¹. What is the activation energy of the reverse reaction?",
    options: [
      ["83 kJ mol⁻¹", "Correct: the peak is 145 kJ above the reactants and the products are 62 kJ above the reactants, so the peak is 145 − 62 = 83 kJ above the products."],
      ["207 kJ mol⁻¹", "This adds ΔH; that would be correct only if the forward reaction were exothermic."],
      ["145 kJ mol⁻¹", "The reverse reaction starts from the product level, which is higher, so its barrier is smaller."],
      ["62 kJ mol⁻¹", "This is the size of ΔH, not a barrier height."],
    ],
    answer: "A",
    hints: ["Sketch the profile: reactants, products 62 kJ higher, peak 145 kJ above the reactants.", "Measure the reverse barrier from the products to the peak."],
    explanation: "For an endothermic reaction, Ea(reverse) = Ea(forward) − ΔH = 145 − 62 = 83 kJ mol⁻¹.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which statements about the standard enthalpy change of combustion are correct?\n\n1. It refers to one mole of the substance burned.\n2. The substance burns completely in excess oxygen.\n3. It is always negative.",
    options: [
      ["1, 2 and 3", "Correct: all three statements are true."],
      ["1 and 2 only", "Statement 3 is also true: combustion always releases energy."],
      ["2 and 3 only", "Statement 1 is true: the definition fixes one mole of the substance burned."],
      ["1 only", "Statements 2 and 3 are true as well."],
    ],
    answer: "A",
    explanation: "ΔH⦵c: one mole of substance burned completely in excess oxygen under standard conditions; combustion is always exothermic, so ΔH⦵c is always negative.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which statements explain why a value of ΔHc measured with a spirit burner and a copper can is less exothermic than the data-book value?\n\n1. The mass of fuel burned was found by weighing the burner before and after.\n2. Heat is lost to the surrounding air and to the can.\n3. Some fuel burns incompletely, forming soot and carbon monoxide.",
    options: [
      ["1, 2 and 3", "Statement 1 describes the correct method, not a source of error."],
      ["2 and 3 only", "Correct: heat loss and incomplete combustion both make the measured value too small; statement 1 is the method, not an error."],
      ["1 and 2 only", "Statement 1 is not an error, and statement 3 is a real reason."],
      ["1 only", "Statement 1 is not an error; statements 2 and 3 are the reasons."],
    ],
    answer: "B",
    hints: ["Which statements make the measured energy smaller than the energy actually released by complete combustion?"],
    explanation: "Energy that heats the air and the can is not measured by the water, and incomplete combustion releases less energy per mole than complete combustion. Weighing the burner before and after is the correct method, not a source of the discrepancy.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "The enthalpy change of neutralisation of ethanoic acid by sodium hydroxide is less exothermic than that of hydrochloric acid by sodium hydroxide. Why?",
    options: [
      ["Some energy is used to complete the ionisation of the weak acid as it reacts.", "Correct: ethanoic acid is mostly un-ionised, and breaking its O–H bonds takes in energy."],
      ["Ethanoic acid forms less water per mole of acid.", "Both acids are monoprotic, forming one mole of water per mole of acid."],
      ["Sodium ethanoate is less soluble than sodium chloride.", "Both salts are soluble; solubility is not the reason."],
      ["The reaction with ethanoic acid has a higher activation energy.", "Activation energy affects the rate, not the enthalpy change."],
    ],
    answer: "A",
    hints: ["Strong acids are fully ionised; weak acids are not."],
    explanation: "For strong acid and strong alkali the reaction is just H⁺ + OH⁻ → H₂O. A weak acid must ionise as it reacts, which is endothermic, so less energy is released overall.",
  });
  {
    const q = heatQ(80.0, 13.2);
    const n = molesFromSolution(40.0, 2.00);
    const dH = deltaHFromQ(q, n);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "40.0 cm³ of 2.00 mol dm⁻³ nitric acid was added to 40.0 cm³ of 2.10 mol dm⁻³ potassium hydroxide, both at the same starting temperature. The temperature rose by 13.2 °C. Calculate the enthalpy change of neutralisation, in kJ mol⁻¹, to three significant figures. (Treat the mixture as water: 1 cm³ has a mass of 1 g and c = 4.18 J g⁻¹ K⁻¹.)",
      value: dH, sf: 3, unit: "kJ/mol",
      wrong: [sfStr(-dH, 3), sfStr(deltaHFromQ(heatQ(40.0, 13.2), n), 3), sfStr(deltaHFromQ(q, molesFromSolution(40.0, 2.10)), 3)],
      hints: ["The mass is the total volume of solution: 80.0 g.", "The acid is limiting (0.0800 mol), so 0.0800 mol of water forms."],
      explanation: `q = 80.0 × 4.18 × 13.2 = ${sfStr(q, 4)} J. Water formed = 0.0400 × 2.00 = 0.0800 mol (the alkali is in slight excess). ΔH = −${sfStr(q / 1000, 4)} ÷ 0.0800 = ${sfStr(dH, 3)} kJ mol⁻¹. Common errors: a positive sign; using only 40.0 g of solution; dividing by the amount of the alkali in excess.`,
    });
  }
  {
    const M = Mr("C3H7OH");
    const n = moles(0.75, M);
    const q = heatQ(200.0, 23.5);
    const dH = deltaHFromQ(q, n);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "Burning 0.75 g of propan-1-ol, C₃H₇OH, raised the temperature of 200.0 g of water by 23.5 °C. Calculate the enthalpy change of combustion of propan-1-ol, in kJ mol⁻¹, to three significant figures. (Mr of C₃H₇OH = 60.0; c = 4.18 J g⁻¹ K⁻¹.)",
      value: dH, sf: 3, unit: "kJ/mol",
      wrong: [sfStr(-dH, 3), sfStr(deltaHFromQ(heatQ(0.75, 23.5), n), 3)],
      hints: ["Mr of C₃H₇OH = 60.0.", "m in q = mcΔT is the water, 200.0 g."],
      explanation: `1. q = 200.0 × 4.18 × 23.5 = ${sfStr(q, 5)} J = ${sfStr(q / 1000, 4)} kJ.\n2. n(propan-1-ol) = 0.75 ÷ ${M.toFixed(1)} = ${sfStr(n, 3)} mol.\n3. ΔHc = −${sfStr(q / 1000, 4)} ÷ ${sfStr(n, 3)} = ${sfStr(dH, 3)} kJ mol⁻¹ (negative: the water warmed). Using the mass of fuel in mcΔT is a common error.`,
    });
  }
  {
    const M = Mr("NH4NO3");
    const n = moles(4.00, M);
    const q = heatQ(45.0, 5.9);
    const dH = deltaHFromQ(q, n, { exothermic: false });
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "When 4.00 g of ammonium nitrate, NH₄NO₃, dissolved in 45.0 g of water, the temperature fell by 5.9 °C. Calculate the enthalpy change of solution of ammonium nitrate, in kJ mol⁻¹, to two significant figures. (Mr of NH₄NO₃ = 80.0; c = 4.18 J g⁻¹ K⁻¹; use the mass of water only.)",
      value: dH, sf: 2, unit: "kJ/mol",
      wrong: [sfStr(-dH, 2)],
      hints: ["A temperature fall means the process is endothermic.", "Mr of NH₄NO₃ = 80.0."],
      explanation: `1. q = 45.0 × 4.18 × 5.9 = ${sfStr(q, 4)} J taken in from the water.\n2. n = 4.00 ÷ ${M.toFixed(1)} = ${sfStr(n, 3)} mol.\n3. ΔHsol = +${sfStr(q / 1000, 3)} ÷ ${sfStr(n, 3)} = +${sfStr(dH, 2)} kJ mol⁻¹. The sign is positive because the solution cooled. (ΔT has 2 s.f., so the answer has 2 s.f.)`,
    });
  }
  {
    const n = molesFromSolution(30.0, 0.250);
    const dHdata = -217;
    const dT = (-dHdata * 1000 * n) / (30.0 * 4.18);
    b.num({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: "Data: for Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s), ΔH = −217 kJ mol⁻¹. Excess zinc powder is added to 30.0 cm³ of 0.250 mol dm⁻³ copper(II) sulfate. Assuming no heat loss, calculate the expected temperature rise, in °C, to three significant figures. (Treat the solution as water: 1 cm³ has a mass of 1 g; c = 4.18 J g⁻¹ K⁻¹.)",
      value: dT, sf: 3, unit: "°C",
      hints: ["Copper(II) ions are limiting: n = 0.0300 × 0.250.", "Energy released = n × 217 kJ; then ΔT = q ÷ (mc)."],
      explanation: `n(Cu²⁺) = ${sfStr(n, 3)} mol; energy released = ${sfStr(n, 3)} × 217 = ${sfStr(n * 217, 4)} kJ = ${sfStr(n * 217000, 4)} J. ΔT = ${sfStr(n * 217000, 4)} ÷ (30.0 × 4.18) = ${sfStr(dT, 3)} °C.`,
    });
  }
  {
    const dT = (57.1 * 1000 * 0.042) / (70.0 * 4.18);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "Data: the enthalpy change of neutralisation of a strong acid by a strong alkali is −57.1 kJ mol⁻¹. Predict the temperature rise, in °C, when 35.0 cm³ of 1.20 mol dm⁻³ hydrochloric acid is mixed with 35.0 cm³ of 1.20 mol dm⁻³ potassium hydroxide in a perfectly insulated cup. Give your answer to three significant figures. (Treat the mixture as 70.0 g of water; c = 4.18 J g⁻¹ K⁻¹.)",
      value: dT, sf: 3, unit: "°C",
      wrong: [sfStr(dT * 2, 3)],
      hints: ["n(H₂O formed) = 0.0350 × 1.20 mol.", "ΔT = q ÷ (mc)."],
      explanation: `n(H₂O) = 0.0350 × 1.20 = 0.0420 mol; q = 0.0420 × 57 100 = ${sfStr(0.042 * 57100, 4)} J; ΔT = ${sfStr(0.042 * 57100, 4)} ÷ (70.0 × 4.18) = ${sfStr(dT, 3)} °C. Using only 35.0 g of solution doubles the answer.`,
    });
  }
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The standard enthalpy change of formation of oxygen gas, O₂(g), is zero.",
    answer: true,
    explanation: "True. An element in its standard state is formed from itself with no change, so ΔH⦵f = 0 (for example O₂(g), C(graphite), Na(s)).",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "For a reaction carried out in a polystyrene cup, the mass m in q = mcΔT is the mass of the solid that reacts.",
    answer: false,
    explanation: "False. m is the mass of the water or solution whose temperature changes; the amount of the reacting substance is used afterwards to find ΔH per mole.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each equation with the standard enthalpy change it represents.",
    pairs: [
      [t`$\ce{Mg(s) + 1/2O2(g) -> MgO(s)}$`, "formation of magnesium oxide (also combustion of magnesium)"],
      [t`$\ce{CH4(g) + 2O2(g) -> CO2(g) + 2H2O(l)}$`, "combustion of methane"],
      [t`$\ce{H+(aq) + OH-(aq) -> H2O(l)}$`, "neutralisation"],
      [t`$\ce{N2(g) + 3H2(g) -> 2NH3(g)}$`, "reaction (two moles of ammonia, so not formation)"],
    ],
    explanation: "Formation forms one mole of a compound from its elements; combustion burns one mole completely; neutralisation forms one mole of water; an equation for other amounts is simply ΔH⦵r. MgO formation is also the combustion of magnesium.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the description of an energy profile.",
    template: "For an endothermic reaction the products are {{blank:a}} in enthalpy than the reactants, and the activation energy is {{blank:b}} than ΔH.",
    blanks: [
      { id: "a", accepted: ["higher"], choices: ["higher", "lower"] },
      { id: "b", accepted: ["larger"], choices: ["larger", "smaller"] },
    ],
    explanation: "Endothermic: products above reactants (ΔH positive). The peak lies above the products, so Ea is greater than ΔH.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: t`Name the standard enthalpy change represented by $\ce{Na(s) + 1/2Cl2(g) -> NaCl(s)}$.`,
    accepted: ["enthalpy change of formation", "standard enthalpy change of formation", "enthalpy of formation", "standard enthalpy of formation", "formation", "heat of formation", "enthalpy change of formation of sodium chloride", "standard enthalpy change of formation of sodium chloride"],
    wrong: ["lattice energy", "atomisation"],
    explanation: "One mole of NaCl(s) is formed from its elements in their standard states: the standard enthalpy change of formation. (Lattice energy starts from gaseous ions.)",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "Define the standard enthalpy change of combustion.",
    points: ["The enthalpy change when one mole of a substance is burned", "completely in excess oxygen", "under standard conditions (298 K, 101 kPa) with substances in their standard states."],
    modelAnswer: "The enthalpy change when one mole of a substance is burned completely in excess oxygen under standard conditions of 298 K and 101 kPa, all substances in their standard states.",
    explanation: "Each idea scores: one mole, complete combustion in excess oxygen, standard conditions.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "Tatenda measured ΔHc of methanol with a spirit burner and a copper can and got a value much less exothermic than the data-book value. Give three reasons for the difference.",
    points: ["Heat lost to the surroundings (air) rather than to the water.", "Heat absorbed by the copper can and thermometer (heat capacity of the apparatus ignored).", "Incomplete combustion (soot or CO) or evaporation of methanol from the wick, or non-standard conditions (water formed as vapour)."],
    modelAnswer: "Much of the energy heated the air around the can instead of the water; some heated the copper can itself, which was not included in the calculation; and some methanol burned incompletely (a yellow flame and soot) or evaporated without burning, so less energy was released per gram weighed.",
    hints: ["Where does energy go other than into the water?", "Is all the fuel burned completely?"],
    explanation: "Credit any three distinct, specific reasons; 'human error' is not creditworthy.",
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 4, applies: ZIM,
    stem: "Describe how a thermometric titration can be used to find the concentration of a sodium hydroxide solution, using hydrochloric acid of known concentration.",
    points: [
      "Pipette a known volume of the alkali into a polystyrene cup and record its temperature.",
      "Add the acid from a burette in small portions (e.g. 2-5 cm³), stirring and recording the temperature after each addition.",
      "Plot temperature against volume of acid added; draw best-fit lines through the rising and the falling points.",
      "The volume where the lines intersect is the end point; amount of HCl = concentration × volume = amount of NaOH, so [NaOH] = amount ÷ volume of alkali.",
    ],
    modelAnswer: "Put 25.0 cm³ of the NaOH(aq) in a polystyrene cup, record its temperature, then add the acid from a burette in 2 cm³ portions with stirring, recording the temperature each time. The temperature rises while acid is neutralised and then falls as excess cold acid is added. Plot temperature against volume and extrapolate both straight lines; where they cross is the end-point volume. Moles of HCl at that volume equal moles of NaOH, so divide by 0.0250 dm³ for the concentration.",
    hints: ["What happens to the temperature after the end point?"],
    explanation: "The maximum of the temperature-volume graph (found by extrapolating two lines) marks the end point, because no more heat is released once all the alkali has reacted.",
  });
  // Structured: thermometric titration (ZIMSEC detail)
  {
    const T0 = 22.0, slope = 0.65, Ve = 16.6, fall = 0.24;
    const Tm = T0 + slope * Ve;
    const vRise = [0, 4, 8, 12], vFall = [20, 24, 28, 32];
    const rise = vRise.map((v) => [v, round(T0 + slope * v, 1)]);
    const falls = vFall.map((v) => [v, round(Tm - fall * (v - Ve), 1)]);
    const L1 = linearFit(rise), L2 = linearFit(falls);
    const vEnd = (L2.c - L1.c) / (L1.m - L2.m);
    const tEnd = L1.m * vEnd + L1.c;
    const vR = round(vEnd, 1), tR = round(tEnd, 1);
    const conc = (vR * 2.00) / 25.0;
    const dT = tR - T0;
    const n = molesFromSolution(vR, 2.00);
    const dH = deltaHFromQ(heatQ(25.0 + vR, dT), n);
    chk(Math.abs(vEnd - Ve) < 0.3 ? 1 : 0, 1, 0, "end point");
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, applies: ZIM,
      stem: `25.0 cm³ of sodium hydroxide solution was placed in a polystyrene cup. 2.00 mol dm⁻³ hydrochloric acid was added from a burette and the temperature recorded after each addition.\n\n| volume of acid added / cm³ | ${[...vRise, ...vFall].join(" | ")} |\n|${"---|".repeat(9)}\n| temperature / °C | ${[...rise, ...falls].map(([, y]) => y.toFixed(1)).join(" | ")} |\n\nOn a graph, a straight line through the first four points and a straight line through the last four points cross at the end point.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Use the two lines to find the volume of acid at the end point, in cm³, to one decimal place.", value: vEnd, tol: 0.3, unit: "cm³", answer: dpStr(vEnd, 1), explanation: `Rising line T = ${sfStr(L1.m, 3)}V + ${sfStr(L1.c, 3)}; falling line T = ${sfStr(L2.m, 3)}V + ${sfStr(L2.c, 3)}. They cross at V = ${dpStr(vEnd, 1)} cm³ (a value read from a careful graph within about ±0.3 cm³ is accepted).` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the concentration of the sodium hydroxide, in mol dm⁻³, to three significant figures.", value: conc, tol: 0.03, answer: sfStr(conc, 3), unit: "mol/dm³", explanation: `n(HCl) = ${dpStr(vEnd, 1)} ÷ 1000 × 2.00 = ${sfStr(n, 3)} mol = n(NaOH); [NaOH] = ${sfStr(n, 3)} ÷ 0.0250 = ${sfStr(conc, 3)} mol dm⁻³.` }),
        P.num({ label: "(c)", marks: 2, stem: "The lines cross at the maximum temperature. Using this temperature and the total volume of solution at the end point, calculate the enthalpy change of neutralisation, in kJ mol⁻¹, to two significant figures (answers from a careful graph within about ±1.5 kJ mol⁻¹ are accepted).", value: dH, tol: 1.5, answer: sfStr(dH, 2), unit: "kJ/mol", wrong: [sfStr(-dH, 2)], explanation: `Maximum temperature ≈ ${dpStr(tEnd, 1)} °C, so ΔT = ${dpStr(dT, 1)} °C. q = (25.0 + ${dpStr(vEnd, 1)}) × 4.18 × ${dpStr(dT, 1)} = ${sfStr(heatQ(25.0 + vEnd, dT), 3)} J; ΔH = −q ÷ ${sfStr(n, 3)} mol = −${sfStr(-dH, 2)} kJ mol⁻¹.` }),
      ],
      hints: ["Draw the two best-fit lines and find where they meet.", "At the end point, moles of HCl = moles of NaOH."],
      explanation: `End point ${dpStr(vEnd, 1)} cm³; [NaOH] ${sfStr(conc, 3)} mol dm⁻³; ΔHneut ≈ −${sfStr(-dH, 2)} kJ mol⁻¹, close to the value expected for a strong acid and strong alkali.`,
    });
  }
  // Structured: comparing fuels
  {
    const M1 = Mr("CH3OH"), M2 = Mr("C4H9OH");
    const r1 = { m: 0.64, w: 120.0, dT: 18.5 }, r2 = { m: 0.74, w: 120.0, dT: 33.5 };
    const dH1 = deltaHFromQ(heatQ(r1.w, r1.dT), moles(r1.m, M1));
    const dH2 = deltaHFromQ(heatQ(r2.w, r2.dT), moles(r2.m, M2));
    const perG1 = heatQ(r1.w, r1.dT) / 1000 / r1.m;
    const perG2 = heatQ(r2.w, r2.dT) / 1000 / r2.m;
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: `Chipo compared two alcohols as fuels with the same spirit burner, copper can and 120.0 g of water.\n\n| fuel | mass burned / g | temperature rise / °C |\n|---|---|---|\n| methanol, CH₃OH | 0.64 | 18.5 |\n| butan-1-ol, C₄H₉OH | 0.74 | 33.5 |\n\n(Mr: CH₃OH 32.0, C₄H₉OH 74.0; c = 4.18 J g⁻¹ K⁻¹.)`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the enthalpy change of combustion of methanol, in kJ mol⁻¹, to three significant figures.", value: dH1, sf: 3, unit: "kJ/mol", wrong: [sfStr(-dH1, 3)], explanation: `q = 120.0 × 4.18 × 18.5 = ${sfStr(heatQ(r1.w, r1.dT), 4)} J; n = 0.64 ÷ ${M1.toFixed(1)} = ${sfStr(moles(r1.m, M1), 3)} mol; ΔHc = −${sfStr(-dH1, 3)} kJ mol⁻¹.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the enthalpy change of combustion of butan-1-ol, in kJ mol⁻¹, to three significant figures.", value: dH2, sf: 3, unit: "kJ/mol", wrong: [sfStr(-dH2, 3)], explanation: `q = 120.0 × 4.18 × 33.5 = ${sfStr(heatQ(r2.w, r2.dT), 5)} J; n = 0.74 ÷ ${M2.toFixed(1)} = ${sfStr(moles(r2.m, M2), 3)} mol; ΔHc = −${sfStr(-dH2, 3)} kJ mol⁻¹.` }),
        P.mcq({ label: "(c)", stem: "Which fuel released more energy per gram in this experiment?", options: [["butan-1-ol", `Correct: about ${sfStr(perG2, 2)} kJ g⁻¹ compared with ${sfStr(perG1, 2)} kJ g⁻¹ for methanol.`], ["methanol", `Methanol gave only about ${sfStr(perG1, 2)} kJ g⁻¹.`], ["both released the same energy per gram", "The temperature rises per gram are clearly different."], ["it depends on the data-book values", "The experiment itself gives energy per gram: q ÷ mass burned."]], answer: "A", explanation: "Energy per gram = q ÷ mass burned." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain why butan-1-ol has a more exothermic enthalpy change of combustion per mole than methanol.", points: ["Butan-1-ol has three more CH₂ groups, so more bonds (C–C, C–H and O=O) are broken per mole.", "Burning it forms three more CO₂ and three more H₂O, so more C=O and O–H bonds are made.", "The extra energy released making bonds is greater than the extra energy needed to break bonds, so ΔHc is more negative (by a roughly constant amount per CH₂)."], modelAnswer: "Butan-1-ol contains three extra CH₂ units. Burning each forms an extra CO₂ and H₂O; the energy released making their C=O and O–H bonds exceeds the energy needed to break the extra C–C, C–H and O=O bonds, so ΔHc becomes more negative by a roughly constant amount for each CH₂ added." }),
      ],
      hints: ["Use n = mass ÷ Mr for each fuel.", "Energy per gram is q ÷ mass."],
      explanation: `Methanol −${sfStr(-dH1, 3)} kJ mol⁻¹, butan-1-ol −${sfStr(-dH2, 3)} kJ mol⁻¹; both are much less exothermic than data-book values because of heat loss.`,
    });
  }
  b.card("DEFINITION", "Standard enthalpy change of formation", "Enthalpy change when one mole of a compound forms from its elements in their standard states under standard conditions (298 K, 101 kPa). Zero for an element in its standard state.");
  b.card("DEFINITION", "Standard enthalpy change of combustion", "Enthalpy change when one mole of a substance is burned completely in excess oxygen under standard conditions. Always negative.");
  b.card("DEFINITION", "Standard enthalpy change of neutralisation", "Enthalpy change when an acid and an alkali react to form one mole of water under standard conditions.");
  b.card("FACT", "Standard conditions", "298 K, 101 kPa, solutions 1 mol dm⁻³, substances in their standard states.");
  b.card("FORMULA", "Calorimetry", "q = mcΔT (m = mass of water or solution, c = 4.18 J g⁻¹ K⁻¹); ΔH = −q ÷ n, converting J to kJ.");
  b.card("CONCEPT", "Exothermic energy profile", "Products below reactants; ΔH arrow down (negative); activation energy from reactants up to the peak.");
  b.card("CONCEPT", "Why weak-acid neutralisation is less exothermic", "Energy is used to ionise the weak acid as it reacts, so less is released overall than for a strong acid.");
  b.card("CONCEPT", "Main errors in a spirit-burner experiment", "Heat lost to air and can, incomplete combustion, evaporation of fuel: measured ΔHc is less exothermic than the data value.");
  b.card("CONCEPT", "Thermometric titration end point", "Plot temperature against volume added; the rising and falling best-fit lines cross at the end point.", undefined, { applies: ZIM });
});
