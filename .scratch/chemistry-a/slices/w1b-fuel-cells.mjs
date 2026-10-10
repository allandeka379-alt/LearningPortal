// W1b: achem.electrochem.fuel-cells (ZIMSEC only)
import { concept, P, t, ce, ZIM, ecell, dpStr } from "../lib.mjs";

concept("achem.electrochem.fuel-cells", { file: "electrochem/fuel-cells", keyPrefix: "electrochem.fuel-cells", applies: ZIM }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the only product of a hydrogen-oxygen fuel cell?",
    options: [
      ["water", "Correct: 2H₂ + O₂ → 2H₂O."],
      ["carbon dioxide", "There is no carbon in the fuel or the oxidant."],
      ["hydrogen peroxide", "Oxygen is fully reduced to water at the cathode."],
      ["nitrogen oxides", "No combustion takes place, so no nitrogen oxides form."],
    ],
    answer: "A",
    explanation: "The overall reaction of every hydrogen-oxygen fuel cell is 2H₂ + O₂ → 2H₂O.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In a hydrogen-oxygen fuel cell with an alkaline electrolyte, which half-equation occurs at the negative electrode?",
    options: [
      [t`$\ce{H2 + 2OH- -> 2H2O + 2e-}$`, "Correct: hydrogen is oxidised, using hydroxide ions from the electrolyte."],
      [t`$\ce{H2 -> 2H+ + 2e-}$`, "This is the acidic-electrolyte version; in alkali, H⁺ reacts with OH⁻."],
      [t`$\ce{O2 + 2H2O + 4e- -> 4OH-}$`, "This reduction occurs at the positive electrode."],
      [t`$\ce{2H2O + 2e- -> H2 + 2OH-}$`, "This produces hydrogen; in a fuel cell hydrogen is consumed."],
    ],
    answer: "A",
    explanation: "The negative electrode (anode) is where the fuel is oxidised: H₂ + 2OH⁻ → 2H₂O + 2e⁻.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which half-equation occurs at the positive electrode of a hydrogen-oxygen fuel cell with an acidic electrolyte?",
    options: [
      [t`$\ce{O2 + 4H+ + 4e- -> 2H2O}$`, "Correct: oxygen is reduced, using H⁺ ions that have crossed the electrolyte."],
      [t`$\ce{O2 + 2H2O + 4e- -> 4OH-}$`, "This is the alkaline-electrolyte cathode reaction."],
      [t`$\ce{H2 -> 2H+ + 2e-}$`, "This oxidation happens at the negative electrode."],
      [t`$\ce{2H2O -> O2 + 4H+ + 4e-}$`, "This produces oxygen, the reverse of what happens in a fuel cell."],
    ],
    answer: "A",
    explanation: "At the positive electrode (cathode) oxygen gains electrons; in acid it combines with H⁺ to form water.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which statements are advantages of hydrogen fuel cells over petrol engines for vehicles?\n\n1. No carbon dioxide is produced at the point of use.\n2. They convert a greater fraction of the fuel's energy into useful energy.\n3. Hydrogen is easy to store safely in large amounts.",
    options: [
      ["1 and 2 only", "Correct: storing hydrogen is one of the main disadvantages."],
      ["1, 2 and 3", "Statement 3 is false: hydrogen is a low-density, highly flammable gas that is hard to store."],
      ["2 and 3 only", "Statement 1 is an advantage and statement 3 is not."],
      ["1 only", "Statement 2 is also an advantage: fuel cells are not limited like heat engines."],
    ],
    answer: "A",
    hints: ["Think about how hydrogen is stored."],
    explanation: "Fuel cells emit only water and convert chemical energy directly to electrical energy, so they are more efficient. Hydrogen storage (high pressure or very low temperature) is difficult and expensive.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which statements about a fuel cell with an acidic electrolyte are correct?\n\n1. Hydrogen ions move through the electrolyte towards the oxygen electrode.\n2. Electrons flow through the electrolyte from the hydrogen electrode to the oxygen electrode.\n3. The concentration of acid in the electrolyte falls steadily as the cell works.",
    options: [
      ["1 and 2 only", "Statement 2 is false: electrons cannot travel through the electrolyte."],
      ["1 only", "Correct: electrons go round the external circuit, and the H⁺ made at the anode is used at the cathode, so the acid is not used up."],
      ["2 and 3 only", "Both are false; only statement 1 is correct."],
      ["1, 2 and 3", "Statements 2 and 3 are false."],
    ],
    answer: "B",
    hints: ["Compare how much H⁺ is made and used."],
    explanation: "Anode: 2H₂ → 4H⁺ + 4e⁻; cathode: O₂ + 4H⁺ + 4e⁻ → 2H₂O. The H⁺ crosses the electrolyte, electrons go round the circuit, and the acid is not consumed (the water formed slowly dilutes it unless removed).",
  });
  b.mcq({
    d: 4, skill: "APPLICATION",
    stem: "In a direct methanol fuel cell with an alkaline electrolyte, carbon is released as carbonate ions. Which is the half-equation at the negative electrode?",
    options: [
      [t`$\ce{CH3OH + 8OH- -> CO3^2- + 6H2O + 6e-}$`, "Correct: atoms and charge balance (−8 on each side) and carbon goes from −2 to +4."],
      [t`$\ce{CH3OH + H2O -> CO2 + 6H+ + 6e-}$`, "This is the acidic-electrolyte equation."],
      [t`$\ce{CH3OH + 6OH- -> CO3^2- + 5H2O + 6e-}$`, "Check the oxygen and hydrogen: this does not balance."],
      [t`$\ce{CH3OH + 8OH- -> CO3^2- + 6H2O + 4e-}$`, "Charge does not balance: −8 on the left but −6 on the right."],
    ],
    answer: "A",
    hints: ["Carbon changes oxidation number from −2 to +4.", "Balance O with H₂O and charge with OH⁻ and electrons."],
    explanation: "Carbon loses 6 electrons. In alkali: CH₃OH + 8OH⁻ → CO₃²⁻ + 6H₂O + 6e⁻ (O: 9 = 9; H: 12 = 12; charge −8 = −8).",
  });
  {
    const e = ecell(0.40, -0.83);
    b.num({
      d: 3, skill: "APPLICATION",
      stem: t`Data: $\ce{O2 + 2H2O + 4e- <=> 4OH-}$, E⦵ = +0.40 V; $\ce{2H2O + 2e- <=> H2 + 2OH-}$, E⦵ = −0.83 V. Calculate the standard cell potential, in V, of a hydrogen-oxygen fuel cell with an alkaline electrolyte.`,
      value: e, dp: 2, unit: "V",
      wrong: [dpStr(0.40 - 0.83, 2), dpStr(0.40 + 2 * 0.83, 2)],
      hints: ["The oxygen electrode is positive.", "E⦵cell = E⦵(positive) − E⦵(negative)."],
      explanation: `E⦵cell = 0.40 − (−0.83) = ${dpStr(e, 2)} V: the same as for the acidic cell, because the overall reaction (2H₂ + O₂ → 2H₂O) is the same.`,
    });
  }
  b.num({
    d: 3, skill: "APPLICATION", daily: true,
    stem: t`How many electrons are released per molecule of ethanol in an ethanol fuel cell with an acidic electrolyte? ($\ce{C2H5OH + 3H2O -> 2CO2 + nH+ + ne-}$)`,
    value: 12,
    wrong: ["6", "4"],
    hints: ["Each carbon changes from −2 to +4.", "Or balance hydrogen: 6 + 6 = 12 H atoms on the left."],
    explanation: "Each of the two carbon atoms goes from −2 to +4, losing 6 electrons: 12 in total. Hydrogen check: 6 (ethanol) + 6 (water) = 12 H⁺.",
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "In a hydrogen-oxygen fuel cell, 0.60 mol of hydrogen is consumed. How many moles of oxygen are consumed at the same time?",
    value: 0.3, dp: 2, unit: "mol",
    wrong: ["0.6", "1.2"],
    hints: ["2H₂ + O₂ → 2H₂O."],
    explanation: "Mole ratio H₂ : O₂ = 2 : 1, so 0.60 ÷ 2 = 0.30 mol O₂ (four electrons are transferred per O₂, two per H₂).",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A fuel cell works for as long as fuel and oxygen are supplied to it.",
    answer: true,
    explanation: "True. Unlike a conventional cell, the reactants are fed in continuously and the products removed.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Hydrogen fuel cells cause no carbon dioxide emissions at any stage, whatever the source of the hydrogen.",
    answer: false,
    explanation: "False. The cell itself emits only water, but most hydrogen is made from natural gas or coal, releasing CO₂. Only hydrogen made with renewable electricity is low-carbon.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each part of an alkaline hydrogen-oxygen fuel cell with its role or reaction.",
    pairs: [
      ["negative electrode", "H₂ + 2OH⁻ → 2H₂O + 2e⁻"],
      ["positive electrode", "O₂ + 2H₂O + 4e⁻ → 4OH⁻"],
      ["potassium hydroxide solution", "carries OH⁻ ions between the electrodes"],
      ["platinum coating", "catalyses the electrode reactions"],
    ],
    explanation: "Fuel oxidised at the negative electrode, oxygen reduced at the positive electrode, ions carried by the electrolyte, reactions speeded up by the catalyst.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the description.",
    template: "In a fuel cell, the fuel is {{blank:a}} at the negative electrode and oxygen is {{blank:b}} at the positive electrode; electrons flow through the {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["oxidised"], choices: ["oxidised", "reduced"] },
      { id: "b", accepted: ["reduced"], choices: ["reduced", "oxidised"] },
      { id: "c", accepted: ["external circuit"], choices: ["external circuit", "electrolyte"] },
    ],
    explanation: "Oxidation at the anode (negative), reduction at the cathode (positive); electrons through the external circuit, ions through the electrolyte.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the metal most commonly used as the catalyst on fuel-cell electrodes.",
    accepted: ["platinum", "Pt"],
    wrong: ["iron", "nickel"],
    explanation: "Platinum (a platinum group metal) catalyses the electrode reactions; its cost is one disadvantage of fuel cells.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Methane can be used in a fuel cell with an acidic electrolyte. Write the overall equation, the half-equation at the positive electrode, and deduce the half-equation at the negative electrode.",
    points: ["Overall: CH₄ + 2O₂ → CO₂ + 2H₂O.", "Positive electrode: 2O₂ + 8H⁺ + 8e⁻ → 4H₂O.", "Negative electrode: CH₄ + 2H₂O → CO₂ + 8H⁺ + 8e⁻."],
    modelAnswer: "Overall CH₄ + 2O₂ → CO₂ + 2H₂O. Cathode (scaled for 2O₂): 2O₂ + 8H⁺ + 8e⁻ → 4H₂O. Subtracting gives the anode reaction CH₄ + 2H₂O → CO₂ + 8H⁺ + 8e⁻ (carbon −4 → +4, 8 electrons).",
    hints: ["Overall minus cathode gives the anode half-equation."],
    explanation: "Scale the oxygen half-equation to match the overall equation, then subtract.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Discuss the advantages and disadvantages of hydrogen fuel cells compared with diesel engines for buses in a city such as Harare.",
    points: ["Advantage: only water is emitted, so no CO₂, CO, NOₓ or particulates in the city (better air quality).", "Advantage: more efficient energy conversion and quiet operation with few moving parts.", "Disadvantage: hydrogen is hard to store (high pressure, flammable, low density) and needs new filling infrastructure.", "Disadvantage: high cost (platinum catalyst) and most hydrogen comes from fossil fuels unless made by electrolysis with renewable electricity."],
    modelAnswer: "Fuel-cell buses would emit only water in the city, cutting smoke, CO, NOₓ and CO₂ at street level, and are quieter and more efficient than diesel engines. However, hydrogen must be stored under high pressure and is flammable, refuelling stations would have to be built, fuel cells with platinum catalysts are expensive, and unless the hydrogen were made using solar or hydroelectric power its production would still release CO₂.",
    hints: ["Give two points on each side."],
    explanation: "Credit two advantages and two disadvantages, each specific.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why fuel cells can convert a larger fraction of a fuel's chemical energy into useful work than a petrol engine.",
    points: ["A fuel cell converts chemical energy directly into electrical energy.", "A petrol engine first converts it into heat (it is a heat engine), and much of that heat is lost to the surroundings in the exhaust and cooling system."],
    modelAnswer: "In a fuel cell the redox reaction drives electrons round the circuit directly, while an engine must burn the fuel to make heat and then convert heat into motion, losing a large share as waste heat.",
    hints: ["Count the energy conversions in each."],
    explanation: "The key idea is direct conversion versus conversion through heat.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true,
    stem: "A telecommunications company uses hydrogen-oxygen fuel cells with a proton-exchange (acidic) membrane as backup generators at remote towers.",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Write the half-equation at the negative electrode. (Type it as, for example, H2 -> 2H+ + 2e-.)", accepted: ["H2 -> 2H+ + 2e-", "H2 → 2H+ + 2e-", "H₂ → 2H⁺ + 2e⁻", "H2 = 2H+ + 2e-"], normalise: ["trim", "lowercase", "remove_whitespace"], wrong: ["2H+ + 2e- -> H2"], explanation: "Hydrogen is oxidised at the negative electrode." }),
      P.mcq({ label: "(b)", stem: "Which ions carry the current through the membrane?", options: [["H⁺ ions, from the hydrogen electrode to the oxygen electrode", "Correct: the membrane conducts protons."], ["OH⁻ ions, from the oxygen electrode to the hydrogen electrode", "That is the alkaline cell."], ["electrons, from the hydrogen electrode to the oxygen electrode", "Electrons travel through the external circuit, not the membrane."], ["O²⁻ ions, from the oxygen electrode to the hydrogen electrode", "Oxide ions are not carried by this membrane."]], answer: "A", explanation: "In a proton-exchange membrane cell, H⁺ crosses from anode to cathode." }),
      P.num({ label: "(c)", marks: 1, stem: "Each cell produces about 0.70 V when delivering current. How many cells must be connected in series to give at least 48 V?", value: 69, unit: undefined, wrong: ["68"], explanation: "48 ÷ 0.70 = 68.6, so 69 cells are needed (68 would give only 47.6 V)." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest why the voltage of a working cell (about 0.70 V) is less than E⦵cell (1.23 V).", points: ["Energy is lost when current flows: internal resistance of the membrane and electrodes (heating).", "Electrode reactions are slow (activation energy), and conditions are not standard (temperature, pressure, concentrations)."], modelAnswer: "When current is drawn, some energy is wasted overcoming the resistance of the membrane and electrodes and the activation energy of the electrode reactions, and the cell does not work under standard conditions, so the voltage is lower than 1.23 V." }),
      P.manual({ label: "(e)", marks: 3, stem: "Give three reasons why fuel cells are suitable as backup generators at remote towers compared with diesel generators.", points: ["Quiet, with few moving parts, so little maintenance at remote sites.", "No exhaust gases other than water (no fumes, CO or soot).", "Start quickly and run as long as hydrogen is supplied, with high efficiency (less fuel to deliver)."], modelAnswer: "They are silent and have almost no moving parts, so they rarely need servicing; they emit only water; and they are efficient and run for as long as hydrogen cylinders are connected, so fewer fuel deliveries are needed." }),
    ],
    hints: ["Which ions does an acidic membrane conduct?"],
    explanation: "Anode H₂ → 2H⁺ + 2e⁻; H⁺ crosses the membrane; cells are stacked to raise the voltage; working voltage is below E⦵ because of resistance and slow electrode reactions.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: t`Hydrazine, $\ce{N2H4}$, a toxic liquid, has been tested as the fuel in fuel cells with an alkaline electrolyte. The overall reaction is $\ce{N2H4 + O2 -> N2 + 2H2O}$.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Nitrogen changes from −2 in hydrazine to 0 in nitrogen gas. How many electrons are released per molecule of hydrazine?", value: 4, wrong: ["2"], explanation: "Two nitrogen atoms each lose 2 electrons: 4 electrons per N₂H₄." }),
      P.mcq({ label: "(b)", stem: "Which is the half-equation at the negative electrode?", options: [[t`$\ce{N2H4 + 4OH- -> N2 + 4H2O + 4e-}$`, "Correct: N, H, O and charge (−4) all balance."], [t`$\ce{N2H4 -> N2 + 4H+ + 4e-}$`, "This is the acidic form; the electrolyte here is alkaline."], [t`$\ce{N2H4 + 2OH- -> N2 + 2H2O + 2e-}$`, "Hydrogen does not balance, and four electrons are released, not two."], [t`$\ce{O2 + 2H2O + 4e- -> 4OH-}$`, "This is the reaction at the positive electrode."]], answer: "A", explanation: "Balance H with OH⁻ and H₂O in alkali: N₂H₄ + 4OH⁻ → N₂ + 4H₂O + 4e⁻." }),
      P.short({ label: "(c)", marks: 1, stem: "Write the half-equation at the positive electrode. (Type it as, for example, O2 + 2H2O + 4e- -> 4OH-.)", accepted: ["O2 + 2H2O + 4e- -> 4OH-", "O2 + 2H2O + 4e- → 4OH-", "O₂ + 2H₂O + 4e⁻ → 4OH⁻", "O2 + 2H2O + 4e = 4OH-"], normalise: ["trim", "lowercase", "remove_whitespace"], wrong: ["O2 + 4H+ + 4e- -> 2H2O"], explanation: "In alkali, oxygen is reduced to hydroxide ions." }),
      P.manual({ label: "(d)", marks: 3, stem: "Suggest one advantage and two disadvantages of hydrazine compared with hydrogen as a fuel-cell fuel.", points: ["Advantage: a liquid at room temperature, so easier to store and transport than hydrogen gas (higher energy per volume); products N₂ and H₂O are harmless.", "Disadvantage: hydrazine is toxic (and corrosive), so leaks are dangerous to people and the environment.", "Disadvantage: it is expensive to make (from ammonia, using energy) and may decompose or be flammable."], modelAnswer: "Hydrazine is a liquid, so it is much easier to store and carry than compressed hydrogen, and its products are only nitrogen and water. However it is highly toxic, so spills endanger people and water supplies, and it is costly to manufacture." }),
    ],
    hints: ["Use OH⁻ and H₂O to balance in alkali."],
    explanation: "Anode N₂H₄ + 4OH⁻ → N₂ + 4H₂O + 4e⁻; cathode O₂ + 2H₂O + 4e⁻ → 4OH⁻; liquid fuel is convenient but toxic.",
  });
  b.card("DEFINITION", "Fuel cell", "Electrochemical cell supplied continuously with fuel and oxygen, converting chemical energy directly into electrical energy.");
  b.card("FORMULA", "H₂-O₂ fuel cell, acidic", "Anode: H₂ → 2H⁺ + 2e⁻. Cathode: O₂ + 4H⁺ + 4e⁻ → 2H₂O.");
  b.card("FORMULA", "H₂-O₂ fuel cell, alkaline", "Anode: H₂ + 2OH⁻ → 2H₂O + 2e⁻. Cathode: O₂ + 2H₂O + 4e⁻ → 4OH⁻.");
  b.card("FACT", "Overall reaction and E⦵cell of the H₂-O₂ fuel cell", "2H₂ + O₂ → 2H₂O; E⦵cell = 1.23 V.");
  b.card("CONCEPT", "Deducing the anode reaction for a new fuel", "Overall equation minus the (scaled) oxygen cathode half-equation.");
  b.card("FORMULA", "Methanol fuel cell anode (acidic)", "CH₃OH + H₂O → CO₂ + 6H⁺ + 6e⁻");
  b.card("CONCEPT", "Advantages of fuel cells", "Only water at the point of use; direct conversion so more efficient; quiet; few moving parts.");
  b.card("CONCEPT", "Disadvantages of hydrogen fuel cells", "Hydrogen hard to store (pressure, flammability); costly platinum catalyst; hydrogen often made from fossil fuels.");
});
