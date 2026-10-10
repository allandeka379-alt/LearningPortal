// W2a: achem.kinetics.collisions-boltzmann (both boards; ZIMSEC Form 5, Cambridge AS Level)
import { concept, P, t, ce, AR, VM_RTP, round, sfStr, dpStr, sciStr } from "../lib.mjs";

concept("achem.kinetics.collisions-boltzmann", { file: "kinetics/collisions-boltzmann", keyPrefix: "kinetics.collisions-boltzmann" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by the activation energy of a reaction?",
    options: [
      ["the minimum energy colliding particles need for the collision to lead to reaction", "Correct: collisions with less energy than Ea are not effective."],
      ["the energy given out when the products are formed from the reactants", "That describes the enthalpy change of an exothermic reaction."],
      ["the average kinetic energy of the reacting particles at room temperature", "Ea is a threshold, not an average energy."],
      ["the total energy needed to break every bond in all of the reactant molecules", "Only enough energy to reach the transition state is needed, not to break all bonds."],
    ],
    answer: "A",
    explanation: "Activation energy is the minimum collision energy for an effective (successful) collision.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Powdered calcium carbonate reacts faster with dilute hydrochloric acid than the same mass of large marble chips. Why?",
    options: [
      ["The powder has a larger surface area, so collisions with acid particles are more frequent.", "Correct: more exposed particles means more collisions per second."],
      ["The powder has a lower activation energy for its reaction with the acid.", "Ea is a property of the reaction pathway, not of particle size."],
      ["The particles in the powder have more kinetic energy than those in the chips.", "At the same temperature the particles have the same energy distribution."],
      ["The powder contains more calcium carbonate per gram than the chips.", "The same mass of the same substance contains the same amount."],
    ],
    answer: "A",
    explanation: "Surface area affects collision frequency, not activation energy or particle energy.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How does the Boltzmann distribution for a gas change when the temperature is increased?",
    options: [
      ["The peak moves to higher energy and becomes lower; the area under the curve stays the same.", "Correct: the same number of molecules is spread over a wider range of energies."],
      ["The peak moves to higher energy and becomes higher; the area under the curve increases.", "The number of molecules is unchanged, so the area cannot increase."],
      ["The peak stays at the same energy but the curve becomes taller.", "The most probable energy increases with temperature."],
      ["The activation energy moves to a lower value on the energy axis.", "Temperature does not change Ea; a catalyst lowers it."],
    ],
    answer: "A",
    explanation: "Higher temperature: flatter, broader curve with its peak further right and lower; same area; more molecules beyond Ea.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How does a catalyst increase the rate of a reaction?",
    options: [
      ["It provides an alternative route with a lower activation energy.", "Correct: a larger proportion of collisions then have enough energy to react."],
      ["It gives the reacting particles more kinetic energy.", "A catalyst does not change the energy distribution of the particles."],
      ["It makes the enthalpy change of the reaction more negative.", "ΔH is unchanged by a catalyst."],
      ["It increases the concentration of the reactants.", "A catalyst does not change the amounts of reactants present."],
    ],
    answer: "A",
    explanation: "The catalysed pathway has a lower Ea, so more particles have E ≥ Ea; the distribution and ΔH stay the same.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: t`Propanone reacts with iodine in acid solution: $\ce{CH3COCH3 + I2 -> CH3COCH2I + HI}$. Iodine is the only coloured substance. Which is the most suitable way to follow the rate continuously?`,
    options: [
      ["colorimetry, measuring the absorbance as the brown colour of iodine fades", "Correct: the colour change can be measured continuously without disturbing the mixture."],
      ["collecting the gas produced in a gas syringe", "No gas is produced in this reaction."],
      ["measuring the loss in mass of the flask on a balance", "Nothing escapes from the flask, so its mass does not change."],
      ["timing how long it takes for a cross under the flask to be hidden by a precipitate", "No precipitate forms; that is the thiosulfate–acid reaction."],
    ],
    answer: "A",
    hints: ["Which property of the mixture changes?"],
    explanation: "Only iodine is coloured, so its concentration can be followed by colorimetry; samples could also be quenched and titrated with thiosulfate.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements about the Boltzmann distribution of molecular energies in a gas are correct?\n\n1. The curve starts at the origin.\n2. The curve meets the energy axis at the maximum energy a molecule can have.\n3. The area under the curve represents the total number of molecules.",
    options: [
      ["1 and 3 only", "Correct: the high-energy tail approaches the axis but never meets it."],
      ["1, 2 and 3", "Statement 2 is false: there is no maximum energy."],
      ["2 and 3 only", "Statement 2 is false and statement 1 is true."],
      ["1 only", "Statement 3 is also true: area = total number of molecules."],
    ],
    answer: "A",
    hints: ["Is there an upper limit on molecular energy?"],
    explanation: "No molecules have zero energy, so the curve starts at the origin; it tails off without touching the axis; its area is the number of molecules.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which changes increase the rate of reaction between zinc granules and dilute sulfuric acid by increasing the frequency of collisions, without changing the proportion of collisions with energy ≥ Ea?\n\n1. Using zinc powder instead of granules\n2. Using more concentrated acid\n3. Raising the temperature",
    options: [
      ["1 and 2 only", "Correct: surface area and concentration change only collision frequency; temperature also changes the energy distribution."],
      ["1, 2 and 3", "Temperature also increases the proportion of particles with energy ≥ Ea, so statement 3 does not fit."],
      ["2 and 3 only", "Statement 1 fits; statement 3 changes the energy distribution as well."],
      ["1 only", "Statement 2 also increases collision frequency only."],
    ],
    answer: "A",
    hints: ["Which change alters the energies of the particles?"],
    explanation: "Surface area and concentration raise collision frequency; temperature raises both frequency and, much more importantly, the fraction of molecules with E ≥ Ea.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Raising the temperature from 20 °C to 30 °C roughly doubles the rate of a reaction, but increases the average speed of the molecules by under 2%. What is the best explanation?",
    options: [
      ["A small shift of the energy distribution greatly increases the proportion of molecules with energy above Ea.", "Correct: the high-energy tail beyond Ea grows by a large factor."],
      ["Collisions become twice as frequent because the molecules are now moving twice as fast as before.", "The speed rises by under 2%, so collision frequency rises only slightly."],
      ["The activation energy of the reaction halves when the temperature rises by 10 °C.", "Ea is essentially independent of temperature."],
      ["More collisions now have the correct orientation for reaction.", "Orientation is not affected significantly by temperature."],
    ],
    answer: "A",
    hints: ["Look at the area under the Boltzmann curve beyond Ea."],
    explanation: "Because Ea lies far out in the tail, a small change in the distribution doubles the number of molecules able to react.",
  });
  b.num({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: "Marble chips react with acid in an open flask on a balance. The mass falls by 0.88 g in the first 40 s. Calculate the average rate of mass loss in g s⁻¹.",
    value: 0.88 / 40, sf: 3, unit: "g/s",
    wrong: [40 / 0.88],
    explanation: `Rate = 0.88 g ÷ 40 s = ${sfStr(0.88 / 40, 3)} g s⁻¹.`,
  });
  {
    const g = (0.035 - 0.015) / (50 - 10);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "On a graph of reactant concentration against time, a tangent drawn at t = 30 s passes through the points (10 s, 0.0350 mol dm⁻³) and (50 s, 0.0150 mol dm⁻³). Calculate the rate of reaction at 30 s, in mol dm⁻³ s⁻¹.",
      value: g, sf: 3, unit: "mol/dm³/s",
      wrong: [0.025 / 30],
      hints: ["Rate = −gradient of the tangent."],
      explanation: `Gradient = (0.0150 − 0.0350) ÷ (50 − 10) = −${sciStr(g, 3)} mol dm⁻³ s⁻¹; the rate is ${sciStr(g, 3)} mol dm⁻³ s⁻¹ (positive). Dividing a concentration read from the curve by the time gives an average from t = 0, not the rate at 30 s.`,
    });
  }
  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: "In a sodium thiosulfate–hydrochloric acid clock experiment, the cross disappears after 80 s in run 1 and after 32 s in run 2. How many times faster is the reaction in run 2?",
    value: 80 / 32, sf: 3,
    wrong: [32 / 80],
    explanation: "Rate ∝ 1/time, so rate₂/rate₁ = (1/32)/(1/80) = 80/32 = 2.5.",
  });
  {
    const n = 0.06 / AR.Mg;
    const v = n * VM_RTP * 1000;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`0.0600 g of magnesium ribbon reacts with excess dilute hydrochloric acid: $\ce{Mg(s) + 2HCl(aq) -> MgCl2(aq) + H2(g)}$. Calculate the final volume of hydrogen collected in a gas syringe, in cm³ at room conditions, to three significant figures. (Ar: Mg 24.3; molar gas volume 24.0 dm³ mol⁻¹)`,
      value: v, sf: 3, unit: "cm³",
      wrong: [v / 2, n * VM_RTP],
      hints: ["The Mg : H₂ ratio is 1 : 1."],
      explanation: `1. n(Mg) = 0.0600 ÷ 24.3 = ${sciStr(n, 3)} mol = n(H₂).\n2. V = ${sciStr(n, 3)} × 24 000 = ${sfStr(v, 3)} cm³.\n3. Leaving it in dm³ gives ${sfStr(n * VM_RTP, 3)}; halving (misreading the 2HCl) gives ${sfStr(v / 2, 3)} cm³.`,
    });
  }
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A catalyst is chemically unchanged at the end of the reaction it catalyses.",
    answer: true,
    explanation: "True. It may take part in intermediate steps but is regenerated.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Adding a catalyst changes the shape of the Boltzmann distribution so that more molecules have high energies.",
    answer: false,
    explanation: "False. The distribution depends only on temperature; a catalyst lowers Ea, so more of the existing molecules exceed it.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    stem: "Match each reaction with the most suitable way of following its rate.",
    pairs: [
      [t`$\ce{Mg + 2HCl -> MgCl2 + H2}$`, "volume of gas in a gas syringe"],
      [t`$\ce{Na2S2O3 + 2HCl -> 2NaCl + S + SO2 + H2O}$`, "time for a cross to be hidden by a precipitate"],
      [t`$\ce{CH3COCH3 + I2 -> CH3COCH2I + HI}$ (in acid)`, "colorimetry"],
      [t`$\ce{(CH3)3CBr + H2O -> (CH3)3COH + H+ + Br-}$`, "electrical conductivity"],
    ],
    hints: ["Which property changes: gas, precipitate, colour or ions?"],
    explanation: "Gas → gas volume; sulfur precipitate → clock method; iodine colour → colorimetry; ions formed → conductivity.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentence about collisions.",
    template: "For a collision to be effective, the particles must collide with the correct {{blank:a}} and with energy at least equal to the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["orientation"], choices: ["orientation", "speed", "mass"] },
      { id: "b", accepted: ["activation energy"], choices: ["activation energy", "enthalpy change", "bond energy"] },
    ],
    explanation: "Correct orientation and energy ≥ Ea.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "In a reaction pathway diagram, what is the name of the highest-energy arrangement of atoms at the peak of the curve?",
    accepted: ["transition state", "the transition state", "activated complex", "the activated complex"],
    wrong: ["intermediate"],
    explanation: "The transition state (activated complex); an intermediate sits in a dip between peaks.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the Boltzmann distribution of molecular energies for a gas at temperature T, and use it to explain why a catalyst increases the rate of reaction.",
    points: [
      "Axes: number of molecules (with a given energy) against energy; curve starts at the origin",
      "Rises to a peak (most probable energy) then falls, with a tail that approaches but never touches the energy axis",
      "A catalyst provides an alternative pathway with a lower activation energy (Ea line moves to the left)",
      "So a greater proportion (area beyond Ea) of molecules have enough energy, giving more effective collisions per second",
    ],
    modelAnswer: "The graph plots the number of molecules with a particular energy against energy. It starts at the origin, rises to a peak at the most probable energy and then falls gradually, approaching but never touching the energy axis. A catalyst offers a different reaction pathway with a lower activation energy, so the Ea line lies further to the left; the area under the curve to the right of it is larger, meaning a greater proportion of molecules can react and there are more effective collisions per second.",
    hints: ["Describe the shape first, then where Ea lies with and without a catalyst."],
    explanation: "Shape plus the lower-Ea argument.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: t`Suggest how you would follow the rate of the reaction $\ce{CaCO3(s) + 2HCl(aq) -> CaCl2(aq) + H2O(l) + CO2(g)}$, stating what you would measure and how you would use the results to find the initial rate.`,
    points: ["Measure the volume of CO₂ with a gas syringe (or the loss in mass on a balance) at regular time intervals", "Plot volume (or mass lost) against time", "Draw a tangent to the curve at t = 0; its gradient is the initial rate"],
    modelAnswer: "Connect the flask to a gas syringe and record the volume of carbon dioxide every 10 s (or stand the open flask on a balance and record the mass every 10 s). Plot volume against time and draw a tangent to the curve at time zero; its gradient gives the initial rate in cm³ s⁻¹.",
    hints: ["What is produced that you could measure?"],
    explanation: "Method, graph and tangent.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "A reaction pathway diagram is drawn for an exothermic reaction with and without a catalyst. Describe two features that are the same and one that differs.",
    points: ["Same: energy levels of reactants and products, so ΔH is unchanged (and the reaction is still exothermic)", "Different: the peak (activation energy) is lower for the catalysed route"],
    modelAnswer: "The reactant and product levels are the same, so ΔH is identical and both show products below reactants. The catalysed curve has a lower peak, showing a smaller activation energy.",
    hints: ["What does a catalyst not change?"],
    explanation: "Catalysts change Ea, not ΔH.",
  });
  // Structured: magnesium + acid gas-volume data
  {
    const n = 0.06 / AR.Mg;
    const Vmax = n * VM_RTP * 1000;
    const ts = [0, 15, 30, 45, 60, 90, 120, 180];
    const vs = ts.map((x) => round(Vmax * (1 - Math.exp(-0.04 * x)), 0));
    const avg30 = vs[2] / 30;
    const tangent = 47 / 20;
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: `Sipho reacts 0.0600 g of magnesium ribbon with 50 cm³ of 1.0 mol dm⁻³ hydrochloric acid (an excess) at 25 °C and collects the hydrogen.

| Time / s | ${ts.join(" | ")} |
|---|---|---|---|---|---|---|---|---|
| Volume of H₂ / cm³ | ${vs.join(" | ")} |`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the average rate of reaction over the first 30 s, in cm³ s⁻¹.", value: avg30, sf: 3, unit: "cm³/s", explanation: `${vs[2]} cm³ ÷ 30 s = ${sfStr(avg30, 3)} cm³ s⁻¹.` }),
        P.num({ label: "(b)", marks: 2, stem: "A tangent drawn to the volume–time curve at t = 0 passes through (0 s, 0 cm³) and (20 s, 47 cm³). Calculate the initial rate, in cm³ s⁻¹.", value: tangent, sf: 3, unit: "cm³/s", wrong: [avg30], explanation: `Gradient = 47 ÷ 20 = ${sfStr(tangent, 3)} cm³ s⁻¹; it is larger than the average over 30 s because the rate falls as the reaction proceeds.` }),
        P.manual({ label: "(c)", marks: 2, stem: "Describe how the rate changes during the experiment and explain why.", points: ["The rate is greatest at the start and decreases until it reaches zero (volume stops increasing)", "Magnesium is used up (and the acid concentration falls), so collisions become less frequent; the reaction stops when the magnesium has all reacted"], modelAnswer: "The rate is fastest at the start and gradually decreases, becoming zero when the volume stops changing. As the magnesium is used up its surface area falls (and the acid becomes a little less concentrated), so there are fewer collisions per second; when all the magnesium has reacted the rate is zero." }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the final volume of hydrogen expected, in cm³ at room conditions, to three significant figures. (Ar: Mg 24.3; molar gas volume 24.0 dm³ mol⁻¹)", value: Vmax, sf: 3, unit: "cm³", wrong: [n * VM_RTP], explanation: `n(Mg) = ${sciStr(n, 3)} mol = n(H₂); V = ${sfStr(Vmax, 3)} cm³, in agreement with the final reading.` }),
        P.mcq({ label: "(e)", marks: 1, stem: "The experiment is repeated with 0.0600 g of magnesium powder instead of ribbon. What happens?", options: [
          ["The initial rate increases; the final volume is the same.", "Correct: larger surface area, same amount of magnesium."],
          ["The initial rate increases; the final volume increases.", "The amount of magnesium, and so of hydrogen, is unchanged."],
          ["The initial rate is the same; the final volume increases.", "Powder reacts faster, and the amount is the same."],
          ["The initial rate decreases; the final volume is the same.", "A larger surface area gives a faster rate."],
        ], answer: "A", explanation: "Surface area affects rate, not yield." }),
        P.manual({ label: "(f)", marks: 3, stem: "Explain, using the Boltzmann distribution, why the initial rate would be greater at 35 °C.", points: ["At higher temperature the distribution is flatter and shifted to higher energies", "so a greater proportion of particles have energy ≥ Ea", "giving more frequent effective collisions (collision frequency also rises slightly)"], modelAnswer: "At 35 °C the Boltzmann distribution is broader with its peak at higher energy, so a much greater proportion of the acid particles colliding with the magnesium have energy equal to or above the activation energy. The particles also move faster and collide a little more often, so the frequency of effective collisions, and therefore the rate, increases." }),
        P.short({ label: "(g)", marks: 1, stem: "Name a piece of apparatus suitable for collecting and measuring the hydrogen.", accepted: ["gas syringe", "a gas syringe", "syringe", "inverted burette", "measuring cylinder", "inverted measuring cylinder", "burette"], wrong: ["beaker"], explanation: "A gas syringe, or an inverted measuring cylinder or burette over water." }),
      ],
      hints: ["Rate = gradient of the volume–time graph.", "Mg : H₂ = 1 : 1."],
      explanation: `Average rate over 30 s = ${sfStr(avg30, 3)} cm³ s⁻¹; initial rate ≈ ${sfStr(tangent, 3)} cm³ s⁻¹; final volume ${sfStr(Vmax, 3)} cm³; the rate falls as magnesium is used up and rises with temperature.`,
    });
  }
  // Structured: clock reaction at different temperatures
  {
    const Ts = [20, 30, 40, 50];
    const tt = Ts.map((T) => round(80 * Math.exp((52000 / 8.31) * (1 / (T + 273) - 1 / 293)), 0));
    const r40 = 1 / tt[2];
    const ratio = tt[0] / tt[1];
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
      stem: t`Chipo times how long it takes for a cross under a flask to be hidden when hydrochloric acid is added to sodium thiosulfate solution, $\ce{Na2S2O3 + 2HCl -> 2NaCl + S + SO2 + H2O}$, at different temperatures.

| Temperature / °C | ${Ts.join(" | ")} |
|---|---|---|---|---|
| Time / s | ${tt.join(" | ")} |`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the relative rate, 1/time, at 40 °C, in s⁻¹, to three significant figures.", value: r40, sf: 3, unit: "s⁻¹", explanation: `1/${tt[2]} = ${sciStr(r40, 3)} s⁻¹.` }),
        P.manual({ label: "(b)", marks: 2, stem: "State two variables Chipo must keep the same in every run.", points: ["Volumes and concentrations of thiosulfate and acid (total volume)", "The same cross / same flask and depth of solution (same observer)"], modelAnswer: "The volume and concentration of each solution (so the total volume is the same), and the same flask with the same cross viewed from the same position." }),
        P.mcq({ label: "(c)", marks: 1, stem: "By what factor does the rate increase from 20 °C to 30 °C?", options: [
          [`${sfStr(ratio, 2)}`, "Correct: rate ∝ 1/time, so the factor is t(20 °C)/t(30 °C)."],
          [`${sfStr(1 / ratio, 2)}`, "This is t(30 °C)/t(20 °C), the inverse: the rate rises."],
          ["1.5", "Temperature ratio 30/20 is irrelevant; use the times."],
          ["10", "The temperature difference is not the rate factor."],
        ], answer: "A", explanation: `${tt[0]}/${tt[1]} = ${sfStr(ratio, 2)}.` }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain the effect of temperature on the rate using the Boltzmann distribution.", points: ["At higher temperature the distribution shifts to higher energies (peak lower and to the right)", "A greater proportion of particles have energy ≥ Ea", "So effective collisions are more frequent and the rate increases"], modelAnswer: "At a higher temperature the Boltzmann distribution is flatter and moved to higher energies, so a much greater proportion of the colliding ions have energy at least equal to the activation energy. Effective collisions become more frequent, so sulfur forms faster and the cross is hidden sooner." }),
        P.tf({ label: "(e)", marks: 1, stem: "The time measured corresponds to the same amount of sulfur formed in every run.", answer: true, explanation: "True: the cross disappears when a fixed amount of sulfur has formed, so rate ∝ 1/time." }),
      ],
      hints: ["Rate is proportional to 1/time."],
      explanation: `1/t at 40 °C = ${sciStr(r40, 3)} s⁻¹; the rate rises by a factor of about ${sfStr(ratio, 2)} from 20 °C to 30 °C because more particles have energy ≥ Ea.`,
    });
  }
  b.card("DEFINITION", "Activation energy, Ea", "The minimum energy colliding particles must have for the collision to result in reaction.");
  b.card("DEFINITION", "Rate of reaction", "Change in amount or concentration of a reactant or product per unit time; the gradient of a concentration–time graph.");
  b.card("CONCEPT", "Effective collision", "Particles collide with energy ≥ Ea and the correct orientation.");
  b.card("FACT", "Boltzmann distribution shape", "Starts at the origin, peaks, then tails off without touching the energy axis; area = number of molecules.");
  b.card("CONCEPT", "Effect of temperature (Boltzmann)", "Curve flattens and shifts right: a much greater proportion of molecules have E ≥ Ea.");
  b.card("CONCEPT", "Effect of a catalyst (Boltzmann)", "Same curve; Ea line moves left, so more molecules exceed it.");
  b.card("FORMULA", "Clock reaction rate", "Rate ∝ 1/time, because the same fixed amount of product forms in every run.");
  b.card("FACT", "Methods for following rate", "Gas volume, mass loss, colorimetry, titration of quenched samples, conductivity, clock reactions.");
  b.card("CONCEPT", "Concentration, pressure, surface area", "Increase collision frequency only; the energy distribution is unchanged.");
});
