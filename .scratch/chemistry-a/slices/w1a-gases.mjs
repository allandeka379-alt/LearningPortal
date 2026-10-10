// W1a: states.gases — gas pressure, kinetic theory assumptions, pV = nRT, Mr of volatile liquids, real gases.
import { concept, P, t, chk, R, idealGasMoles, mrFromGas, cm3ToM3, dm3ToM3, kPaToPa, cToK, sfStr, ZIM } from "../lib.mjs";

concept("achem.states.gases", { file: "states/gases", keyPrefix: "states.gases" }, (b) => {
  // ---- MCQs
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is an assumption of the kinetic theory of an ideal gas?",
    options: [["There are no intermolecular forces between the molecules.", "Correct: an ideal gas has no attractions or repulsions between molecules."], ["The molecules all move at the same speed.", "Molecules have a range of speeds; the model assumes random motion."], ["Collisions between molecules lose kinetic energy.", "Collisions are assumed to be perfectly elastic."], ["The molecules occupy most of the volume of the container.", "Molecular volume is assumed to be negligible."]],
    answer: "A",
    explanation: "Assumptions: random motion, negligible molecular volume, no intermolecular forces, elastic collisions.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Under which conditions does a real gas behave most like an ideal gas?",
    options: [["low pressure and high temperature", "Correct: molecules are far apart and fast-moving, so their volume and attractions matter least."], ["high pressure and low temperature", "These are the conditions of greatest deviation."], ["high pressure and high temperature", "High pressure crowds the molecules, so their volume becomes significant."], ["low pressure and low temperature", "At low temperature attractions between slow molecules become significant."]],
    answer: "A",
    explanation: "Low pressure: molecular volume negligible. High temperature: intermolecular forces negligible compared with kinetic energy.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which gas deviates most from ideal behaviour at room temperature and pressure?",
    options: [[t`ammonia, $\ce{NH3}$`, "Correct: hydrogen bonding between NH₃ molecules gives the strongest intermolecular forces."], [t`helium, $\ce{He}$`, "Helium has tiny atoms and very weak forces: the most nearly ideal gas."], [t`hydrogen, $\ce{H2}$`, "H₂ is small and non-polar, with very weak forces."], [t`nitrogen, $\ce{N2}$`, "N₂ is non-polar with only weak instantaneous dipole forces."]],
    answer: "A",
    explanation: "The stronger the intermolecular forces, the greater the deviation from ideal behaviour.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A gas occupies 250 cm³. What is this volume in m³?",
    options: [[t`$2.50 \times 10^{-4}\ \text{m}^3$`, "Correct: 250 × 10⁻⁶ m³."], [t`$0.250\ \text{m}^3$`, "This divides by 1000 (the cm³ to dm³ factor) only."], [t`$2.50 \times 10^{-7}\ \text{m}^3$`, "This divides by 10⁹; 1 m³ is 10⁶ cm³."], [t`$2.50 \times 10^{5}\ \text{m}^3$`, "This multiplies instead of dividing."]],
    answer: "A",
    explanation: "1 m³ = 10⁶ cm³, so 250 cm³ = 2.50 × 10⁻⁴ m³.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why does the pressure of a gas in a sealed rigid container increase when it is heated?",
    options: [["The molecules move faster, so they hit the walls more often and with more force.", "Correct: higher average kinetic energy gives more frequent, harder collisions."], ["The molecules expand, so they take up more of the container's volume.", "Molecules do not expand on heating; they move faster."], ["The number of molecules in the container increases.", "The container is sealed: the number of molecules is fixed."], ["Intermolecular forces become stronger at higher temperature.", "Higher temperature makes attractions less significant, not stronger."]],
    answer: "A",
    hints: ["What happens to molecular speed when temperature rises?"],
    explanation: "At constant volume, faster molecules collide with the walls more frequently and with greater momentum change, so pressure increases.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Statements about a real gas at very high pressure:\n\n1. The volume of the molecules themselves is no longer negligible.\n2. Intermolecular attractions become significant.\n3. The gas obeys pV = nRT more closely than at low pressure.\n\nWhich of the statements are correct?",
    options: [["1 and 2 only", "Correct: both assumptions break down, so deviation increases."], ["1, 2 and 3", "Statement 3 is wrong: deviation increases at high pressure."], ["2 and 3 only", "Statement 1 is correct and statement 3 is wrong."], ["1 only", "Statement 2 is also correct: molecules are close together."]],
    answer: "A",
    hints: ["Which two assumptions fail when molecules are close together?"],
    explanation: "At high pressure molecules are crowded: their volume and their attractions both matter, so the gas deviates more from ideal behaviour.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Statements about the units used in pV = nRT:\n\n1. Pressure must be in pascals.\n2. Temperature must be in kelvin.\n3. Volume must be in dm³.\n\nWhich of the statements are correct?",
    options: [["1 and 2 only", "Correct: volume must be in m³ when R = 8.31 J K⁻¹ mol⁻¹."], ["1, 2 and 3", "Statement 3 is wrong: SI volume is m³."], ["2 and 3 only", "Statement 1 is correct and statement 3 is wrong."], ["1 only", "Statement 2 is also correct: T in K."]],
    answer: "A",
    explanation: "With R = 8.31 J K⁻¹ mol⁻¹: p in Pa, V in m³, T in K.",
  });
  {
    const M = mrFromGas(1.28, 1e5, dm3ToM3(0.5), 300);
    b.mcq({
      d: 3, skill: "ANALYSIS", calculator: true,
      stem: "1.28 g of a gas occupies 0.500 dm³ at 100 kPa and 300 K. Which gas could it be? (R = 8.31 J K⁻¹ mol⁻¹; Ar: H 1.0, C 12.0, N 14.0, O 16.0, S 32.1)",
      options: [[t`$\ce{SO2}$ (Mr 64.1)`, `Correct: M = mRT/pV = ${sfStr(M, 3)} g mol⁻¹.`], [t`$\ce{CO2}$ (Mr 44.0)`, "This would need a smaller mass for the same volume."], [t`$\ce{NO2}$ (Mr 46.0)`, "Too light: check the conversion of dm³ to m³."], [t`$\ce{C2H6}$ (Mr 30.0)`, "Far too light for these data."]],
      answer: "A",
      hints: ["M = mRT/pV, with V in m³."],
      explanation: `M = 1.28 × 8.31 × 300 ÷ (1.00 × 10⁵ × 5.00 × 10⁻⁴) = ${sfStr(M, 3)} g mol⁻¹, closest to SO₂.`,
    });
  }

  // ---- calculations
  {
    const n = idealGasMoles(kPaToPa(98.0), cm3ToM3(250), cToK(20));
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "Calculate the amount, in mol, of air in a 250 cm³ conical flask at 98.0 kPa and 20 °C. (R = 8.31 J K⁻¹ mol⁻¹) Give three significant figures.",
      value: n, unit: "mol", wrong: [idealGasMoles(98.0, 250, 20)],
      hints: ["Convert kPa → Pa, cm³ → m³ and °C → K first."],
      explanation: `1. p = 9.80 × 10⁴ Pa; V = 2.50 × 10⁻⁴ m³; T = 293 K.\n2. n = pV/RT = (9.80 × 10⁴ × 2.50 × 10⁻⁴) ÷ (8.31 × 293).\n3. n = ${sfStr(n, 3)} mol.`,
    });
  }
  {
    const p = (0.5 * R * cToK(50)) / dm3ToM3(10.0);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true, daily: false,
      stem: "0.500 mol of nitrogen is held in a 10.0 dm³ cylinder at 50 °C. Calculate the pressure in kPa. (R = 8.31 J K⁻¹ mol⁻¹)",
      value: p / 1000, unit: "kPa", wrong: [(0.5 * R * 50) / dm3ToM3(10) / 1000, (0.5 * R * 323) / 10 / 1000],
      hints: ["p = nRT/V with V in m³; then divide Pa by 1000."],
      explanation: `1. T = 323 K; V = 1.00 × 10⁻² m³.\n2. p = 0.500 × 8.31 × 323 ÷ 0.0100 = ${sfStr(p, 4)} Pa.\n3. p = ${sfStr(p / 1000, 3)} kPa. (Using 50 instead of 323 K gives ${sfStr((0.5 * R * 50) / 0.01 / 1000, 3)} kPa.)`,
    });
  }
  {
    const T = (kPaToPa(120) * dm3ToM3(5.0)) / (0.2 * R);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "At what temperature, in K, does 0.200 mol of an ideal gas occupy 5.00 dm³ at a pressure of 120 kPa? (R = 8.31 J K⁻¹ mol⁻¹)",
      value: T, unit: "K", wrong: [T - 273],
      hints: ["Rearrange to T = pV/nR."],
      explanation: `1. p = 1.20 × 10⁵ Pa; V = 5.00 × 10⁻³ m³.\n2. T = pV/nR = (1.20 × 10⁵ × 5.00 × 10⁻³) ÷ (0.200 × 8.31) = ${sfStr(T, 3)} K (about ${Math.round(T - 273)} °C).`,
    });
  }
  {
    const M = mrFromGas(0.150, kPaToPa(102), cm3ToM3(45.2), cToK(90));
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: "In an experiment, 0.150 g of a volatile liquid vaporised completely in a gas syringe at 90 °C and 102 kPa, giving 45.2 cm³ of vapour. Calculate the relative molecular mass of the liquid. (R = 8.31 J K⁻¹ mol⁻¹)",
      value: M, wrong: [mrFromGas(0.15, kPaToPa(102), cm3ToM3(45.2), 90)],
      hints: ["M = mRT/pV, all in SI units."],
      explanation: `1. T = 363 K; p = 1.02 × 10⁵ Pa; V = 4.52 × 10⁻⁵ m³.\n2. M = mRT/pV = 0.150 × 8.31 × 363 ÷ (1.02 × 10⁵ × 4.52 × 10⁻⁵).\n3. M = ${sfStr(M, 3)} g mol⁻¹, so Mr = ${sfStr(M, 3)}. (Leaving T in °C gives ${sfStr(mrFromGas(0.15, 102000, 45.2e-6, 90), 3)}.)`,
    });
  }
  {
    const V = ((0.0400 * R * cToK(25)) / kPaToPa(100)) * 1e6;
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, daily: true,
      stem: "Calculate the volume, in cm³, of 0.0400 mol of hydrogen at 100 kPa and 25 °C. (R = 8.31 J K⁻¹ mol⁻¹)",
      value: V, unit: "cm³", wrong: [V / 1000],
      explanation: `V = nRT/p = 0.0400 × 8.31 × 298 ÷ 1.00 × 10⁵ = ${sfStr(V / 1e6, 3)} m³ = ${sfStr(V, 3)} cm³.`,
    });
  }
  // ---- true/false
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In the kinetic theory of an ideal gas, collisions between molecules are assumed to be perfectly elastic.",
    answer: true,
    explanation: "True. No kinetic energy is lost overall in collisions.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Doubling the Celsius temperature of a gas from 20 °C to 40 °C at constant volume doubles its pressure.",
    answer: false,
    explanation: "False. Pressure is proportional to the absolute temperature: 293 K to 313 K raises the pressure by only about 7%.",
  });
  // ---- matching
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each quantity with its value in SI units.",
    pairs: [["150 kPa", t`$1.50 \times 10^{5}$ Pa`], ["2.0 dm³", t`$2.0 \times 10^{-3}$ m³`], ["75 cm³", t`$7.5 \times 10^{-5}$ m³`], ["−23 °C", "250 K"]],
    explanation: "kPa × 10³; dm³ × 10⁻³; cm³ × 10⁻⁶; °C + 273.",
  });
  // ---- fill in the blank
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences.",
    template: "Gas pressure is caused by molecules {{blank:a}} with the walls of the container. If the volume of a fixed amount of gas is halved at constant temperature, the pressure is {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["colliding"], choices: ["colliding", "reacting", "bonding"] },
      { id: "b", accepted: ["doubled"], choices: ["doubled", "halved", "unchanged", "quadrupled"] },
    ],
    explanation: "pV is constant at fixed n and T, so halving V doubles p: more collisions per unit area.",
  });
  // ---- short
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the noble gas that behaves most nearly as an ideal gas.",
    accepted: ["helium", "He"],
    wrong: ["xenon", "argon"],
    explanation: "Helium has the smallest atoms and the weakest intermolecular forces.",
  });
  // ---- self-marked
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "State four assumptions of the kinetic theory of an ideal gas.",
    points: ["Molecules move rapidly and randomly", "Molecules have negligible volume compared with the container", "No intermolecular forces (except during collisions)", "Collisions are perfectly elastic"],
    modelAnswer: "Gas molecules move rapidly and randomly; their own volume is negligible compared with the volume of the container; there are no intermolecular forces between them; and collisions with each other and with the walls are perfectly elastic.",
    hints: ["Think about motion, size, forces and collisions."],
    explanation: "The four standard assumptions.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4, applies: ZIM,
    stem: "Discuss how far the kinetic theory of an ideal gas is valid for real gases such as sulfur dioxide at high pressure and low temperature.",
    points: ["At high pressure molecules are close together, so their own volume is not negligible compared with the container", "At low temperature molecules move slowly, so intermolecular attractions become significant (SO₂ is polar, permanent dipole forces)", "Attractions reduce the force/frequency of wall collisions, so pV is less than nRT; the gas may liquefy", "So the theory is valid only approximately, at low pressure and high temperature, and less well for gases with strong intermolecular forces"],
    modelAnswer: "The ideal model assumes negligible molecular volume and no intermolecular forces. At high pressure SO₂ molecules are crowded, so their own volume is a significant part of the container volume. At low temperature they move slowly, so their permanent dipole attractions pull them together and reduce the force of collisions with the walls, making pV smaller than nRT; eventually the gas liquefies. The theory is therefore only a good approximation at low pressure and high temperature, and it works less well for polar gases such as SO₂ than for helium.",
    hints: ["Consider each assumption in turn."],
    explanation: "Both key assumptions fail at high pressure and low temperature.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Use the kinetic theory to explain why the pressure of a fixed amount of gas increases when it is compressed at constant temperature.",
    points: ["The same number of molecules occupy a smaller volume (more molecules per unit volume)", "So they collide with each unit area of the walls more frequently, increasing the pressure (their speed is unchanged)"],
    modelAnswer: "Compressing the gas puts the same molecules into a smaller volume, so there are more molecules per unit volume. They hit each square metre of the wall more often (at the same average speed, since T is constant), so the pressure rises.",
    hints: ["Temperature, and so speed, is constant."],
    explanation: "More frequent collisions per unit area.",
  });
  // ---- practice structured
  {
    const m = 0.354, pk = 99.0, vc = 120, tc = 100;
    const M = mrFromGas(m, kPaToPa(pk), cm3ToM3(vc), cToK(tc));
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: `Chipo injects ${m} g of a volatile hydrocarbon liquid into a gas syringe inside a steam jacket at ${tc} °C. The liquid vaporises completely and the syringe reading increases by ${vc} cm³. The atmospheric pressure is ${pk} kPa. (R = 8.31 J K⁻¹ mol⁻¹)`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Convert the temperature to kelvin.", value: cToK(tc), unit: "K", wrong: [tc], explanation: `${tc} + 273 = ${cToK(tc)} K.` }),
        P.num({ label: "(b)", marks: 1, stem: "Convert the volume to m³.", value: cm3ToM3(vc), unit: "m³", wrong: [vc / 1000], explanation: `${vc} × 10⁻⁶ = 1.20 × 10⁻⁴ m³.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the relative molecular mass of the hydrocarbon.", value: M, wrong: [mrFromGas(m, pk, cm3ToM3(vc), cToK(tc))], explanation: `M = mRT/pV = ${m} × 8.31 × ${cToK(tc)} ÷ (${pk * 1000} × 1.20 × 10⁻⁴) = ${sfStr(M, 3)}.` }),
        P.mcq({ label: "(d)", marks: 1, stem: "Which hydrocarbon is the liquid most likely to be?", options: [[t`methylbenzene, $\ce{C7H8}$ (Mr 92.0)`, "Correct: closest to the calculated value."], [t`benzene, $\ce{C6H6}$ (Mr 78.0)`, "Too light compared with the result."], [t`hexane, $\ce{C6H14}$ (Mr 86.0)`, "Further from the calculated value than methylbenzene."], [t`octane, $\ce{C8H18}$ (Mr 114.0)`, "Too heavy, and it boils above 100 °C, so it would not vaporise fully in steam."]], answer: "A", explanation: `${sfStr(M, 3)} is closest to 92.0.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Suggest two reasons why the experimental Mr might differ from the true value.", points: ["Some liquid did not vaporise / some vapour condensed, or liquid lost (evaporated) before injection, or mass not measured accurately", "The vapour does not behave ideally (intermolecular forces near its boiling point) / temperature of vapour not equal to jacket temperature / syringe friction or leaks"], modelAnswer: "Some of the liquid may have evaporated before injection, so less than 0.354 g actually entered the syringe; and the vapour, being close to its boiling point, does not behave ideally because intermolecular forces are still significant." }),
        P.manual({ label: "(f)", marks: 1, stem: "Explain why the steam jacket must be above the boiling point of the liquid.", points: ["So that all the liquid vaporises (and stays as a gas) / the equation applies only to gases"], modelAnswer: "So that the whole sample is vaporised and remains a gas, which the ideal gas equation describes." }),
      ],
      hints: ["Convert units first.", "M = mRT/pV."],
      explanation: `Mr = ${sfStr(M, 3)}: methylbenzene.`,
    });
  }
  {
    const n = idealGasMoles(kPaToPa(160), dm3ToM3(2.0), cToK(18));
    const mass = n * 44.0;
    b.struct({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "A 2.00 dm³ cylinder of a fire extinguisher contains carbon dioxide gas at 160 kPa and 18 °C. (R = 8.31 J K⁻¹ mol⁻¹; Mr of CO₂ = 44.0)",
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the amount, in mol, of carbon dioxide in the cylinder.", value: n, unit: "mol", wrong: [idealGasMoles(160, 2, 291)], explanation: `n = (1.60 × 10⁵ × 2.00 × 10⁻³) ÷ (8.31 × 291) = ${sfStr(n, 3)} mol.` }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate the mass, in g, of carbon dioxide.", value: mass, unit: "g", wrong: [n], explanation: `${sfStr(n, 3)} × 44.0 = ${sfStr(mass, 3)} g.` }),
        P.num({ label: "(c)", marks: 1, stem: "The cylinder warms to 47 °C in the sun. Calculate the new pressure in kPa.", value: (160 * cToK(47)) / cToK(18), unit: "kPa", wrong: [(160 * 47) / 27], explanation: `p ∝ T at constant V: 160 × 320/291 = ${sfStr((160 * 320) / 291, 3)} kPa.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain, using the kinetic theory, why the pressure rises in (c).", points: ["Molecules gain kinetic energy / move faster", "They collide with the walls more often and with greater force, so pressure increases"], modelAnswer: "Heating increases the average kinetic energy of the molecules, so they move faster and hit the walls more often and harder, increasing the pressure." }),
      ],
      hints: ["Use SI units; T in K."],
      explanation: `n = ${sfStr(n, 3)} mol; mass ${sfStr(mass, 3)} g; new pressure ${sfStr((160 * 320) / 291, 3)} kPa.`,
    });
  }

  // ---- flashcards
  b.card("FORMULA", "Ideal gas equation and its SI units?", "pV = nRT: p in Pa, V in m³, n in mol, R = 8.31 J K⁻¹ mol⁻¹, T in K.");
  b.card("FORMULA", "Mr of a gas or volatile liquid?", "M = mRT/pV (SI units).");
  b.card("FACT", "Assumptions of the kinetic theory of an ideal gas?", "Random rapid motion; negligible molecular volume; no intermolecular forces; perfectly elastic collisions.");
  b.card("CONCEPT", "What causes gas pressure?", "Molecules colliding with the walls of the container (force per unit area).");
  b.card("CONCEPT", "When do real gases behave most ideally?", "Low pressure and high temperature.");
  b.card("CONCEPT", "Why do real gases deviate at high pressure and low temperature?", "Molecular volume is no longer negligible and intermolecular attractions become significant.");
  b.card("FACT", "Unit conversions for pV = nRT?", "cm³ × 10⁻⁶ = m³; dm³ × 10⁻³ = m³; kPa × 10³ = Pa; °C + 273 = K.");
  b.card("FACT", "Which gases deviate most from ideal behaviour?", "Those with strong intermolecular forces, e.g. NH₃ (hydrogen bonding), SO₂ (polar); He is the most ideal.");
});
