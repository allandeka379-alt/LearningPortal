// W3b: achem.hydrocarbons.alkanes-crude-oil (both boards; ZIMSEC Form 6, Cambridge AS Level)
import { concept, P, t, Mr, moles, VM_RTP, chk, sfStr } from "../lib.mjs";

concept("achem.hydrocarbons.alkanes-crude-oil", { file: "hydrocarbons/alkanes-crude-oil", keyPrefix: "hydrocarbons.alkanes-crude-oil" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Decane is cracked over a hot aluminium oxide catalyst. What type of products always form?",
    options: [
      ["a shorter alkane and at least one alkene", "Correct: there are not enough H atoms for all products to be alkanes."],
      ["two shorter alkanes and nothing else", "Two alkanes would need more hydrogen than decane contains."],
      ["carbon dioxide and water vapour only", "Those are combustion products; cracking happens without oxygen."],
      ["a longer alkane together with hydrogen gas", "Cracking breaks molecules into smaller ones."],
    ],
    answer: "A",
    explanation: "e.g. C₁₀H₂₂ → C₈H₁₈ + C₂H₄.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why does the boiling point of the straight-chain alkanes increase from pentane to decane?",
    options: [
      ["Larger molecules have more electrons, so London forces between molecules are stronger.", "Correct: more electrons and more surface contact → stronger instantaneous dipole–induced dipole forces."],
      ["Longer chains have more C–C bonds, which must be broken when the alkane boils.", "Boiling separates molecules; it does not break covalent bonds."],
      ["Longer alkanes are more polar, so permanent dipole forces become stronger.", "Alkanes are essentially non-polar at every chain length."],
      ["Longer alkanes can form hydrogen bonds between their C–H groups and neighbours.", "C–H bonds do not form hydrogen bonds."],
    ],
    answer: "A",
    explanation: "Boiling point depends on intermolecular London forces, which grow with the number of electrons.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which pollutant in car exhaust forms mainly because nitrogen and oxygen from the air react at high temperature in the engine?",
    options: [
      ["nitrogen monoxide", "Correct: N₂ + O₂ → 2NO at engine temperatures."],
      ["carbon monoxide", "CO forms from incomplete combustion of the fuel."],
      ["unburnt hydrocarbons", "These are fuel molecules that did not burn."],
      ["carbon dioxide", "CO₂ is a product of complete combustion of the fuel."],
    ],
    answer: "A",
    explanation: "Oxides of nitrogen form from atmospheric N₂ and O₂ in the hot cylinder.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: t`What is the missing product X in the cracking equation $\ce{C10H22 -> C6H14 + X}$?`,
    options: [
      [t`$\ce{C4H8}$`, "Correct: C 10 − 6 = 4, H 22 − 14 = 8, an alkene."],
      [t`$\ce{C4H10}$`, "This would need 24 H atoms in total; the equation would not balance."],
      [t`$\ce{2C2H6}$`, "2C₂H₆ contains 12 H, too many."],
      [t`$\ce{C4H6}$`, "This gives only 20 H in total."],
    ],
    answer: "A",
    explanation: "Balance C and H: X = C₄H₈ (a butene).",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which equation correctly shows a reaction that takes place in a catalytic converter?",
    options: [
      [t`$\ce{2CO + 2NO -> 2CO2 + N2}$`, "Correct: CO is oxidised and NO reduced; atoms balance."],
      [t`$\ce{CO + NO -> CO2 + N2}$`, "Not balanced: one N on the left, two on the right."],
      [t`$\ce{2CO2 + N2 -> 2CO + 2NO}$`, "This is the reverse: it would make pollutants."],
      [t`$\ce{CO2 + C -> 2CO}$`, "This makes CO; converters remove it."],
    ],
    answer: "A",
    hints: ["Count N and O on both sides."],
    explanation: "2CO + 2NO → 2CO₂ + N₂ on a Pt/Pd/Rh surface.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which of the statements explain why alkanes are generally unreactive?\n\n1. C–H bonds are almost non-polar.\n2. C–C and C–H bonds are strong.\n3. The lone pairs on carbon repel electrophiles.",
    options: [
      ["1 and 2 only", "Correct: carbon in an alkane has no lone pairs."],
      ["1, 2 and 3", "Statement 3 is false: all four carbon electron pairs are bonding pairs."],
      ["2 and 3 only", "Statement 3 is false and statement 1 is true."],
      ["1 only", "Statement 2 is also a reason: the bonds need much energy to break."],
    ],
    answer: "A",
    hints: ["How many lone pairs does an sp³ carbon in an alkane have?"],
    explanation: "Strong, non-polar bonds; no δ+ or δ− sites to attract reagents.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which of the statements are correct?\n\n1. 2-methylbutane has a lower boiling point than pentane.\n2. 2,2-dimethylpropane is the most volatile isomer of C₅H₁₂.\n3. Hexane is less volatile than pentane.",
    options: [
      ["1, 2 and 3", "Correct: branching lowers boiling points; a longer chain raises them."],
      ["1 and 2 only", "Statement 3 is also true: hexane boils higher, so it is less volatile."],
      ["2 and 3 only", "Statement 1 is also true."],
      ["1 only", "Statements 2 and 3 are also true."],
    ],
    answer: "A",
    hints: ["Volatile means easily vaporised (low boiling point)."],
    explanation: "More branching → less contact → weaker London forces → lower boiling point.",
  });
  {
    const v = 10.0, vO = 50.0;
    const used = 3.5 * v, co2 = 2 * v;
    const after = co2 + (vO - used);
    chk(after, 35, 1e-9, "ethane volume");
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: "10.0 cm³ of ethane is exploded with 50.0 cm³ of oxygen. Calculate the total volume of gas, in cm³, after cooling to the original room temperature and pressure.",
      value: after, sf: 3, unit: "cm³",
      wrong: [after + 3 * v],
      hints: ["Write the balanced equation; water is liquid at room temperature."],
      explanation: `1. C₂H₆ + 3½O₂ → 2CO₂ + 3H₂O.\n2. O₂ used = 3.5 × 10.0 = ${used} cm³; O₂ left = 50.0 − ${used} = ${vO - used} cm³.\n3. CO₂ formed = 2 × 10.0 = ${co2} cm³.\n4. Total = ${co2} + ${vO - used} = ${after} cm³. Counting 30 cm³ of steam gives ${after + 3 * v} cm³, which is wrong after cooling.`,
    });
  }
  {
    const n = moles(6.0, Mr("C6H14"));
    const m = 6 * n * Mr("CO2");
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "Calculate the mass of carbon dioxide, in g, formed when 6.00 g of hexane, C₆H₁₄, burns completely. Ar: C 12.0, H 1.0, O 16.0.",
      value: m, sf: 3, unit: "g",
      wrong: [n * Mr("CO2")],
      hints: ["How many moles of CO₂ come from one mole of hexane?"],
      explanation: `1. 2C₆H₁₄ + 19O₂ → 12CO₂ + 14H₂O: 1 mol hexane gives 6 mol CO₂.\n2. Mr(C₆H₁₄) = 86.0; n = 6.00 ÷ 86.0 = ${sfStr(n, 3)} mol.\n3. n(CO₂) = 6 × ${sfStr(n, 3)} = ${sfStr(6 * n, 3)} mol; mass = ${sfStr(6 * n, 3)} × 44.0 = ${sfStr(m, 3)} g.\n4. Ignoring the 1 : 6 ratio gives ${sfStr(n * Mr("CO2"), 3)} g.`,
    });
  }
  {
    const n = moles(2.5, Mr("C4H10"));
    const v = 6.5 * n * VM_RTP;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: "Calculate the volume of oxygen, in dm³ at room conditions, needed to burn 2.50 g of butane, C₄H₁₀, completely. Ar: C 12.0, H 1.0; molar gas volume 24.0 dm³ mol⁻¹.",
      value: v, sf: 3, unit: "dm³",
      wrong: [n * VM_RTP, 13 * n * VM_RTP],
      hints: ["Balance with 13O₂ for 2C₄H₁₀, then use the ratio per mole of butane."],
      explanation: `1. 2C₄H₁₀ + 13O₂ → 8CO₂ + 10H₂O: 6.5 mol O₂ per mol butane.\n2. n(C₄H₁₀) = 2.50 ÷ 58.0 = ${sfStr(n, 3)} mol.\n3. n(O₂) = 6.5 × ${sfStr(n, 3)} = ${sfStr(6.5 * n, 3)} mol; V = ${sfStr(6.5 * n, 3)} × 24.0 = ${sfStr(v, 3)} dm³.\n4. Using 13 (not 6.5) per mole of butane doubles the answer.`,
    });
  }
  b.num({
    d: 3, skill: "ANALYSIS", daily: true,
    stem: "20.0 cm³ of a gaseous alkane burns completely in excess oxygen, forming 80.0 cm³ of carbon dioxide (same temperature and pressure). How many carbon atoms are in one molecule of the alkane?",
    value: 4,
    wrong: [80],
    hints: ["Volume ratio = mole ratio."],
    explanation: "80.0 ÷ 20.0 = 4 mol CO₂ per mol alkane, so four carbons: butane.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Complete the cracking equation by finding n: C₁₄H₃₀ → C₁₀H₂₂ + n C₂H₄.",
    value: 2,
    wrong: [4],
    explanation: "Carbon: 14 = 10 + 2n, so n = 2; hydrogen check: 30 = 22 + 8.",
  });
  b.tf({
    d: 2, skill: "RECALL",
    stem: "Propene can be converted into propane by heating with hydrogen and a nickel catalyst.",
    answer: true,
    explanation: "True: hydrogenation (addition of H₂) makes the alkane.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The nitrogen oxides in car exhaust come from nitrogen compounds dissolved in petrol.",
    answer: false,
    explanation: "False: they form from atmospheric N₂ and O₂ at the high temperatures in the engine.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each crude-oil fraction with a typical use.",
    pairs: [
      ["refinery gases", "bottled gas (LPG) for cooking"],
      ["kerosene (paraffin)", "jet fuel and paraffin stoves"],
      ["diesel (gas oil)", "lorries and generators"],
      ["bitumen", "surfacing roads"],
    ],
    explanation: "Small molecules are gases; the heaviest residue is bitumen.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the description of catalytic cracking.",
    template: "Long-chain alkanes are heated to about 450-500 °C with a catalyst of {{blank:a}} or zeolite. The products are shorter {{blank:b}} and {{blank:c}}, which can be tested for with {{blank:d}}.",
    blanks: [
      { id: "a", accepted: ["aluminium oxide"], choices: ["aluminium oxide", "iron", "nickel", "vanadium(V) oxide"] },
      { id: "b", accepted: ["alkanes"], choices: ["alkanes", "alcohols", "carboxylic acids"] },
      { id: "c", accepted: ["alkenes"], choices: ["alkenes", "esters", "halogenoalkanes"] },
      { id: "d", accepted: ["bromine water"], choices: ["bromine water", "limewater", "silver nitrate solution"] },
    ],
    explanation: "Al₂O₃ (or zeolite) catalyst; products include alkenes, which decolorise bromine water.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name one metal used as a catalyst in a car's catalytic converter.",
    accepted: ["platinum", "palladium", "rhodium", "Pt", "Pd", "Rh"],
    wrong: ["nickel"],
    explanation: "Platinum, palladium and rhodium (platinum group metals).",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Pentane boils at about 36 °C and its isomer 2,2-dimethylpropane at about 10 °C. Explain this difference.",
    points: ["Both have the same number of electrons, so the difference is due to shape", "2,2-dimethylpropane is more branched (nearly spherical), so the surface contact between molecules is smaller", "So its London (instantaneous dipole–induced dipole) forces are weaker and less energy is needed to separate the molecules"],
    modelAnswer: "The isomers have the same Mr and number of electrons. Pentane molecules are long and can lie alongside each other with a large contact area, whereas 2,2-dimethylpropane is compact and nearly spherical. The weaker London forces between the branched molecules need less energy to overcome, so it boils lower.",
    hints: ["Same formula: what differs is the shape."],
    explanation: "Branching → smaller contact → weaker London forces.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Describe how you could demonstrate the cracking of liquid paraffin in a school laboratory and show that an alkene is produced. Include one safety precaution.",
    points: ["Soak mineral wool with liquid paraffin in a boiling tube; place broken porcelain or aluminium oxide in the middle of the tube", "Heat the porcelain/catalyst strongly, then warm the paraffin so its vapour passes over the hot catalyst; collect the gas over water", "Shake the gas with bromine water: orange-brown to colourless shows an alkene", "Safety: remove the delivery tube from the water before stopping heating (suck-back), or wear eye protection"],
    modelAnswer: "Liquid paraffin is absorbed on mineral wool at the closed end of a boiling tube, with broken porcelain (or aluminium oxide) in the middle. The porcelain is heated strongly and the paraffin is warmed occasionally so the vapour passes over the hot catalyst. The gas is collected in test tubes over water. Shaking it with bromine water turns the orange solution colourless, showing an alkene. Wear eye protection and lift the delivery tube out of the water before removing the flame to prevent suck-back.",
    hints: ["Catalyst, heating, collecting, testing, safety."],
    explanation: "One point per stage.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why oil refineries crack some of the heavier fractions of crude oil.",
    points: ["Demand for heavy fractions is lower than supply, while demand for petrol-sized molecules is higher than supply", "Cracking also produces alkenes, which are valuable feedstocks for polymers and other chemicals"],
    modelAnswer: "Crude oil contains more heavy fractions than are needed and too little petrol; cracking converts the surplus heavy molecules into smaller alkanes for petrol, and it produces alkenes such as ethene and propene that are used to make polymers.",
    hints: ["Think supply and demand, and the alkene products."],
    explanation: "Two reasons: matching demand, and producing alkenes.",
  });
  {
    const v = 15.0, vO = 120.0;
    const co2 = 3 * v, used = 4.5 * v, left = vO - used;
    const afterCool = co2 + left;
    const x = co2 / v;
    const y = (used / v - x) * 4;
    chk(x, 3, 1e-9, "x");
    chk(y, 6, 1e-9, "y");
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: `15.0 cm³ of a gaseous hydrocarbon CₓHᵧ was exploded with ${vO.toFixed(1)} cm³ of oxygen (an excess). After cooling to room temperature and pressure, the gas volume was ${afterCool.toFixed(1)} cm³. Passing this gas through aqueous sodium hydroxide reduced the volume to ${left.toFixed(1)} cm³.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Deduce the volume of carbon dioxide formed, in cm³.", value: co2, sf: 3, unit: "cm³", wrong: [afterCool], explanation: `NaOH absorbs CO₂: ${afterCool.toFixed(1)} − ${left.toFixed(1)} = ${co2.toFixed(1)} cm³.` }),
        P.num({ label: "(b)", marks: 1, stem: "Deduce the value of x.", value: x, wrong: [co2], explanation: `${co2.toFixed(1)} ÷ 15.0 = 3.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the volume of oxygen used and hence deduce y (CₓHᵧ + (x + y/4)O₂ → xCO₂ + (y/2)H₂O). Give y.", value: y, wrong: [8], explanation: `O₂ used = ${vO.toFixed(1)} − ${left.toFixed(1)} = ${used.toFixed(1)} cm³ = 4.5 × 15.0; x + y/4 = 4.5, so y/4 = 1.5 and y = 6.` }),
        P.short({ label: "(d)", marks: 1, stem: "Give the molecular formula of the hydrocarbon (for example C2H6).", accepted: ["C3H6", "C₃H₆"], normalise: ["trim", "collapse_whitespace"], wrong: ["C3H8"], explanation: "C₃H₆." }),
        P.manual({ label: "(e)", marks: 2, stem: "C₃H₆ could be propene or cyclopropane. Describe a simple test to distinguish them and give the result for each.", points: ["Add (shake with) bromine water", "Propene decolorises it (orange to colourless); cyclopropane does not react at room temperature, so the colour stays"], modelAnswer: "Shake each gas with bromine water. Propene, which has a C=C bond, turns it from orange to colourless; cyclopropane, a saturated cycloalkane, leaves it orange." }),
        P.manual({ label: "(f)", marks: 1, stem: "Write an equation for the incomplete combustion of propene to carbon monoxide and water.", points: ["C₃H₆ + 3O₂ → 3CO + 3H₂O (or 2C₃H₆ + 6O₂ → 6CO + 6H₂O)"], modelAnswer: "C₃H₆ + 3O₂ → 3CO + 3H₂O" }),
      ],
      hints: ["NaOH removes CO₂; the remaining gas is unused oxygen.", "Volume ratios equal mole ratios."],
      explanation: `CO₂ ${co2.toFixed(1)} cm³ → x = 3; O₂ used ${used.toFixed(1)} cm³ → y = 6; C₃H₆.`,
    });
  }
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true,
    stem: "A minibus engine burns a fuel that is mainly heptane, C₇H₁₆. Its exhaust passes through a catalytic converter.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Explain how nitrogen monoxide forms in the engine.", points: ["Nitrogen and oxygen from the air are present in the cylinder", "The very high temperature (from combustion/spark) provides the energy for N₂ + O₂ → 2NO"], modelAnswer: "Air in the cylinder contains nitrogen and oxygen; at the very high temperature produced by the burning fuel they combine: N₂ + O₂ → 2NO." }),
      P.num({ label: "(b)", marks: 1, stem: "Unburnt heptane reacts with nitrogen monoxide in the converter: C₇H₁₆ + n NO → 7CO₂ + 8H₂O + (n/2) N₂. Find n.", value: 22, wrong: [11], explanation: "Oxygen: n = 7 × 2 + 8 = 22; nitrogen: 22 = 2 × 11." }),
      P.mcq({ label: "(c)", marks: 1, stem: "What happens to carbon monoxide in the converter?", options: [
        ["It is oxidised to carbon dioxide.", "Correct: CO gains oxygen (from NO or O₂)."],
        ["It is reduced to carbon.", "That would form soot; the converter oxidises CO."],
        ["It is absorbed by the metal catalyst.", "A catalyst is not used up; CO reacts on its surface."],
        ["It reacts with water to form methanol.", "No such reaction occurs in a converter."],
      ], answer: "A", explanation: "2CO + 2NO → 2CO₂ + N₂ or 2CO + O₂ → 2CO₂." }),
      P.tf({ label: "(d)", marks: 1, stem: "The catalyst metals (Pt, Pd, Rh) are platinum group metals.", answer: true, explanation: "True." }),
      P.manual({ label: "(e)", marks: 1, stem: "Explain why fitting a catalytic converter does not reduce the vehicle's contribution to the greenhouse effect.", points: ["The converter produces CO₂ (and does not remove the CO₂ from combustion), and CO₂ is a greenhouse gas"], modelAnswer: "All the carbon still leaves as carbon dioxide, a greenhouse gas; the converter actually turns CO and hydrocarbons into more CO₂." }),
    ],
    hints: ["Balance O and N separately."],
    explanation: "NO from N₂ + O₂ at high temperature; n = 22; CO oxidised to CO₂; CO₂ still emitted.",
  });

  b.card("DEFINITION", "Cracking", "Breaking long-chain alkanes into shorter alkanes and alkenes by heat, usually with an Al₂O₃ or zeolite catalyst.");
  b.card("CONCEPT", "Why boiling point rises along the alkanes", "More electrons and surface contact → stronger London forces → more energy to separate molecules.");
  b.card("CONCEPT", "Effect of branching on boiling point", "Branched isomers have less surface contact, weaker London forces, lower boiling points.");
  b.card("CONCEPT", "Why alkanes are unreactive", "Strong C–C and C–H bonds; C–H almost non-polar, so no δ+ or δ− sites.");
  b.card("FORMULA", "Complete combustion of propane", "C₃H₈ + 5O₂ → 3CO₂ + 4H₂O");
  b.card("FACT", "Why is carbon monoxide toxic?", "It binds to haemoglobin more strongly than oxygen, reducing oxygen transport.");
  b.card("FACT", "Origin of NOₓ in exhaust", "N₂ and O₂ from the air combine at the high temperature in the engine.");
  b.card("FORMULA", "Catalytic converter: CO and NO", "2CO + 2NO → 2CO₂ + N₂ (Pt/Pd/Rh catalyst).");
  b.card("FACT", "Making an alkane from an alkene", "Hydrogenation: H₂ with a Ni (or Pt) catalyst and heat.");
});
