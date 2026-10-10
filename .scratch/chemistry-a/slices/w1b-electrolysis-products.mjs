// W1b: achem.electrochem.electrolysis-products
import { concept, P, t, ce, ZIM } from "../lib.mjs";

concept("achem.electrochem.electrolysis-products", { file: "electrochem/electrolysis-products", keyPrefix: "electrochem.electrolysis-products" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What are the products when molten zinc chloride is electrolysed with inert electrodes?",
    options: [
      ["zinc at the cathode, chlorine at the anode", "Correct: a molten salt contains only Zn²⁺ and Cl⁻."],
      ["hydrogen at the cathode, chlorine at the anode", "There is no water in a molten salt, so no hydrogen can form."],
      ["chlorine at the cathode, zinc at the anode", "Positive zinc ions go to the negative cathode; chloride ions go to the anode."],
      ["zinc at the cathode, oxygen at the anode", "There is no source of oxygen in molten zinc chloride."],
    ],
    answer: "A",
    explanation: "Molten electrolytes have no competition: Zn²⁺ + 2e⁻ → Zn at the cathode; 2Cl⁻ → Cl₂ + 2e⁻ at the anode.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Aqueous potassium sulfate is electrolysed with platinum electrodes. What forms at each electrode?",
    options: [
      ["hydrogen at the cathode, oxygen at the anode", "Correct: K⁺ is too hard to reduce and SO₄²⁻ too hard to oxidise, so water reacts at both electrodes."],
      ["potassium at the cathode, oxygen at the anode", "Potassium (E⦵ = −2.92 V) is never deposited from aqueous solution."],
      ["hydrogen at the cathode, sulfur dioxide at the anode", "Sulfur dioxide would need sulfate to be reduced; the anode is where oxidation happens."],
      ["potassium at the cathode, sulfur at the anode", "Neither ion is discharged from aqueous solution."],
    ],
    answer: "A",
    explanation: "Cathode: 2H₂O + 2e⁻ → H₂ + 2OH⁻. Anode: 2H₂O → O₂ + 4H⁺ + 4e⁻. The electrolysis simply decomposes water.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is chlorine, rather than oxygen, the main anode product when concentrated sodium chloride solution is electrolysed with inert electrodes?",
    options: [
      ["The two E⦵ values are close, so the high [Cl⁻] decides.", "Correct: when the E⦵ values are close, concentration decides (and oxygen also needs an extra overpotential)."],
      ["Chloride is always oxidised before water, at any concentration.", "In dilute NaCl(aq) oxygen is the main product, so concentration matters."],
      ["Chlorine has a more negative E⦵ than oxygen, so it is formed at the cathode.", "Chlorine forms at the anode by oxidation; its E⦵ (+1.36 V) is not negative."],
      ["Water molecules cannot reach the anode in a concentrated solution.", "Water is still present in large amounts in brine."],
    ],
    answer: "A",
    hints: ["Compare +1.36 V for chlorine with +1.23 V for oxygen.", "What changes between concentrated and dilute solutions?"],
    explanation: "E⦵(Cl₂/Cl⁻) = +1.36 V and E⦵(O₂/H₂O) = +1.23 V are close. A high [Cl⁻] makes Cl⁻ easier to oxidise, so chlorine is produced from brine but oxygen from dilute NaCl(aq).",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements about electrolysis of aqueous copper(II) sulfate with copper electrodes are correct?\n\n1. Oxygen bubbles form at the anode.\n2. Copper is deposited on the cathode.\n3. The anode loses mass as copper atoms become Cu²⁺ ions.",
    options: [
      ["1, 2 and 3", "Statement 1 is false: copper atoms are oxidised more easily than water."],
      ["2 and 3 only", "Correct: the copper anode is oxidised in preference to water, so no oxygen forms."],
      ["1 and 2 only", "Statement 1 is false, and statement 3 is true."],
      ["1 only", "Statement 1 is false; statements 2 and 3 are true."],
    ],
    answer: "B",
    hints: ["Is the anode inert or active?"],
    explanation: "With an active copper anode: Cu → Cu²⁺ + 2e⁻ (anode) and Cu²⁺ + 2e⁻ → Cu (cathode). The concentration of Cu²⁺ stays constant, so the blue colour does not fade.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which statements about electrolysis of aqueous copper(II) sulfate with carbon electrodes are correct?\n\n1. The blue colour of the solution fades.\n2. The solution becomes acidic.\n3. Oxygen is given off at the anode.",
    options: [
      ["1, 2 and 3", "Correct: Cu²⁺ is removed at the cathode, and water is oxidised at the inert anode to oxygen and H⁺."],
      ["1 and 2 only", "Statement 3 is also true: 2H₂O → O₂ + 4H⁺ + 4e⁻ at the carbon anode."],
      ["2 and 3 only", "Statement 1 is also true: Cu²⁺ (blue) is used up."],
      ["1 only", "Statements 2 and 3 are also true."],
    ],
    answer: "A",
    hints: ["What is oxidised at an inert anode in a sulfate solution?"],
    explanation: "Cathode: Cu²⁺ + 2e⁻ → Cu (blue colour fades). Anode (inert): 2H₂O → O₂ + 4H⁺ + 4e⁻ (acid builds up; the solution becomes sulfuric acid).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which half-equation shows the reaction at the anode when dilute sulfuric acid is electrolysed with platinum electrodes?",
    options: [
      [t`$\ce{2H2O -> O2 + 4H+ + 4e-}$`, "Correct: water is oxidised to oxygen; sulfate ions are not oxidised."],
      [t`$\ce{2H+ + 2e- -> H2}$`, "This is reduction, which happens at the cathode."],
      [t`$\ce{SO4^2- -> SO2 + O2 + 2e-}$`, "Sulfate is not oxidised; the equation is also unbalanced."],
      [t`$\ce{O2 + 4H+ + 4e- -> 2H2O}$`, "This is the reverse: a reduction, which consumes oxygen."],
    ],
    answer: "A",
    explanation: "Oxidation at the anode: electrons appear on the right. Water is oxidised because sulfate is extremely hard to oxidise.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Aqueous silver nitrate is electrolysed with inert electrodes. What happens to the pH of the solution and why?",
    options: [
      ["It decreases, because H⁺ ions form at the anode.", "Correct: 4Ag⁺ + 4e⁻ → 4Ag and 2H₂O → O₂ + 4H⁺ + 4e⁻, so nitric acid builds up."],
      ["It increases, because OH⁻ ions form at the cathode as silver deposits.", "OH⁻ forms only when water is reduced; here silver ions are reduced instead."],
      ["It stays the same, because inert electrodes do not react.", "Inert electrodes do not stop water being oxidised at the anode."],
      ["It increases, because nitrate ions are oxidised at the anode.", "Nitrate is not oxidised; water is, releasing H⁺."],
    ],
    answer: "A",
    hints: ["Which is easier to reduce: Ag⁺ (+0.80 V) or water?", "What does water oxidation release?"],
    explanation: "Silver (E⦵ = +0.80 V) is deposited at the cathode; at the anode water is oxidised, releasing H⁺. The solution turns into dilute nitric acid, so the pH falls.",
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "In the electrolysis of acidified water, what is the ratio of the volume of gas at the cathode to the volume of gas at the anode (measured under the same conditions)? Give the number x in x : 1.",
    value: 2,
    wrong: ["1", "0.5"],
    explanation: "4H⁺ + 4e⁻ → 2H₂ and 2H₂O → O₂ + 4H⁺ + 4e⁻: the same 4 electrons give 2 mol H₂ and 1 mol O₂, so the volumes are 2 : 1.",
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "During the electrolysis of concentrated aqueous sodium chloride with inert electrodes, 0.40 mol of chlorine is produced at the anode. How many moles of hydroxide ions are produced at the cathode at the same time?",
    value: 0.8, dp: 2, unit: "mol",
    wrong: ["0.4", "0.2"],
    hints: ["2Cl⁻ → Cl₂ + 2e⁻ and 2H₂O + 2e⁻ → H₂ + 2OH⁻."],
    explanation: "0.40 mol Cl₂ needs 0.80 mol of electrons; at the cathode 2 electrons give 2 OH⁻, so 0.80 mol OH⁻ (and 0.40 mol H₂) form.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Reduction always takes place at the cathode during electrolysis.",
    answer: true,
    explanation: "True. The cathode is the negative electrode; cations or water gain electrons there.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Sodium metal is produced at the cathode when concentrated aqueous sodium chloride is electrolysed.",
    answer: false,
    explanation: "False. Na⁺ (E⦵ = −2.71 V) is much harder to reduce than water, so hydrogen is formed. Sodium is made by electrolysing molten sodium chloride.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    stem: "Match each aqueous electrolyte (inert electrodes) with its anode product.",
    pairs: [
      ["concentrated potassium iodide", "iodine"],
      ["concentrated sodium bromide", "bromine"],
      ["dilute sodium chloride", "oxygen"],
      ["concentrated hydrochloric acid", "chlorine"],
    ],
    extraRight: ["hydrogen"],
    hints: ["Halide ions are oxidised when concentrated; dilute chloride gives oxygen."],
    explanation: "Iodide and bromide are oxidised easily; chloride is oxidised only when concentrated; dilute chloride solutions give oxygen from water.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the rule for the cathode in aqueous solution.",
    template: "At the cathode the species with the more {{blank:a}} E⦵ value is reduced, so metals {{blank:b}} hydrogen in the redox series are deposited.",
    blanks: [
      { id: "a", accepted: ["positive"], choices: ["positive", "negative"] },
      { id: "b", accepted: ["below"], choices: ["below", "above"] },
    ],
    explanation: "Ions with positive E⦵ (below hydrogen in a series listed from most negative), such as Cu²⁺ and Ag⁺, are reduced in preference to water.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the gas produced at the cathode when aqueous magnesium sulfate is electrolysed.",
    accepted: ["hydrogen", "hydrogen gas", "H2", "H₂"],
    wrong: ["magnesium", "oxygen"],
    explanation: "Mg²⁺ (E⦵ = −2.38 V) is not reduced in water; water is reduced to hydrogen: 2H₂O + 2e⁻ → H₂ + 2OH⁻.",
  });
  b.short({
    d: 3, skill: "APPLICATION",
    stem: "Name the substance left in solution after the complete electrolysis of concentrated aqueous potassium chloride with inert electrodes (the products are not allowed to mix).",
    accepted: ["potassium hydroxide", "KOH", "potassium hydroxide solution", "aqueous potassium hydroxide"],
    wrong: ["potassium chloride", "hydrochloric acid"],
    hints: ["Which ions are removed, and which remain?"],
    explanation: "Cl⁻ is removed as chlorine and H₂O is reduced to H₂ + OH⁻, so K⁺ and OH⁻ remain: potassium hydroxide.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why hydrogen, not zinc, may be expected at the cathode from very dilute zinc sulfate solution, whereas zinc is deposited from concentrated zinc sulfate solution.",
    points: ["E⦵(Zn²⁺/Zn) = −0.76 V is more negative than for H⁺/H₂ (0.00 V), so by E⦵ alone water/H⁺ would be reduced.", "At high Zn²⁺ concentration the electrode potential for zinc becomes less negative (and the reduction of water needs an extra voltage, overpotential, at zinc).", "So in concentrated solution zinc is deposited, while in very dilute solution hydrogen is favoured."],
    modelAnswer: "On E⦵ values alone, H⁺/H₂O (0.00 V in acid) is easier to reduce than Zn²⁺ (−0.76 V), so hydrogen is expected. In concentrated ZnSO₄ the high [Zn²⁺] makes the zinc electrode potential less negative, and hydrogen formation at a zinc surface needs an extra overpotential, so zinc is deposited; in very dilute solution hydrogen forms.",
    hints: ["Concentration changes electrode potentials.", "Compare E⦵ values first."],
    explanation: "When two E⦵ values are not far apart, concentration (and overpotential) decide the product.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4, applies: ZIM,
    stem: "Describe what you would observe, and write the electrode equations, when aqueous copper(II) sulfate is electrolysed using carbon electrodes.",
    points: ["Pink-brown copper deposits on the cathode: Cu²⁺ + 2e⁻ → Cu.", "Bubbles of a colourless gas (oxygen) at the anode: 2H₂O → O₂ + 4H⁺ + 4e⁻.", "The blue colour of the solution fades as Cu²⁺ is used up.", "The solution becomes acidic (pH falls) because H⁺ forms at the anode."],
    modelAnswer: "Cathode: a pink-brown layer of copper forms (Cu²⁺ + 2e⁻ → Cu). Anode: bubbles of oxygen (2H₂O → O₂ + 4H⁺ + 4e⁻). The blue solution gradually becomes paler and more acidic.",
    hints: ["Carbon is inert."],
    explanation: "One mark each for the two equations with observations, the fading colour and the acidity.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 2,
    stem: "Suggest why graphite anodes are not suitable for the long-term electrolysis of dilute sulfuric acid, although they are suitable for electrolysis of concentrated hydrochloric acid.",
    points: ["With dilute sulfuric acid, oxygen forms at the anode.", "Oxygen reacts with hot graphite (forming CO₂), so the anode is gradually worn away; with HCl, chlorine forms and does not attack graphite in this way."],
    modelAnswer: "Electrolysing dilute sulfuric acid gives oxygen at the anode, which oxidises the carbon to carbon dioxide and slowly eats away the electrode. Concentrated HCl gives chlorine instead, which does not burn away graphite.",
    hints: ["What gas forms at the anode in each case?"],
    explanation: "Any reasonable chemistry linking oxygen to the oxidation of carbon earns the marks.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true,
    stem: "Four aqueous solutions, each about 1 mol dm⁻³, are electrolysed with inert electrodes: A potassium iodide; B copper(II) nitrate; C sodium sulfate; D silver nitrate.",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Which solution gives a metal at the cathode and oxygen at the anode, with a blue colour that fades? Give the letter.", accepted: ["B"], wrong: ["D"], explanation: "Copper(II) nitrate: copper at the cathode; nitrate is not oxidised, so oxygen forms; Cu²⁺ (blue) is used up." }),
      P.short({ label: "(b)", marks: 1, stem: "Which solution gives hydrogen at the cathode and a brown solution near the anode? Give the letter.", accepted: ["A"], wrong: ["C"], explanation: "Potassium iodide: K⁺ is not reduced (hydrogen forms); iodide is oxidised to iodine, which colours the solution brown." }),
      P.mcq({ label: "(c)", stem: "For solution C, what is the overall effect of the electrolysis?", options: [["Water is decomposed into hydrogen and oxygen.", "Correct: neither Na⁺ nor SO₄²⁻ is discharged."], ["Sodium and oxygen are produced.", "Sodium is never deposited from water."], ["Sodium sulfate is decomposed into sulfur dioxide.", "Sulfate is not oxidised or reduced here."], ["Nothing happens because the ions cannot be discharged.", "Water is discharged at both electrodes."]], answer: "A", explanation: "Cathode 2H₂O + 2e⁻ → H₂ + 2OH⁻; anode 2H₂O → O₂ + 4H⁺ + 4e⁻." }),
      P.manual({ label: "(d)", marks: 3, stem: "For solution D, write the half-equations at each electrode and explain why silver, not hydrogen, forms at the cathode.", points: ["Cathode: Ag⁺ + e⁻ → Ag.", "Anode: 2H₂O → O₂ + 4H⁺ + 4e⁻.", "E⦵(Ag⁺/Ag) = +0.80 V is more positive than that for water/H⁺ (0.00 V or −0.83 V), so Ag⁺ is reduced in preference."], modelAnswer: "Ag⁺ + e⁻ → Ag at the cathode and 2H₂O → O₂ + 4H⁺ + 4e⁻ at the anode. Silver ions have a much more positive E⦵ (+0.80 V) than H⁺ or water, so they are the better oxidising agent and are reduced first." }),
      P.manual({ label: "(e)", marks: 2, stem: "Solution D is now electrolysed with silver electrodes instead. Predict the anode reaction and the effect on the concentration of silver ions.", points: ["The silver anode dissolves: Ag → Ag⁺ + e⁻ (no oxygen).", "Silver ions are added at the anode at the same rate as they are removed at the cathode, so [Ag⁺] stays constant."], modelAnswer: "The active silver anode is oxidised, Ag → Ag⁺ + e⁻, instead of water; as fast as silver is deposited on the cathode, silver ions are replaced from the anode, so the concentration of Ag⁺ does not change." }),
    ],
    hints: ["Use the redox series for each cation and anion.", "Inert or active anode?"],
    explanation: "A: H₂ and I₂. B: Cu and O₂. C: H₂ and O₂. D: Ag and O₂ (or, with silver electrodes, silver transferred from anode to cathode).",
  });
  b.struct({
    d: 3, skill: "UNDERSTANDING", examStyle: true, applies: ZIM,
    stem: "In a ZIMSEC suggested experiment, dilute sulfuric acid is electrolysed in a Hofmann voltameter with platinum electrodes, and the gases are collected in two graduated tubes.",
    parts: [
      P.fib({ label: "(a)", stem: "Name the gas at each electrode.", template: "Cathode: {{blank:a}}; anode: {{blank:b}}", blanks: [{ id: "a", accepted: ["hydrogen", "H2"], wrong: "oxygen" }, { id: "b", accepted: ["oxygen", "O2"], wrong: "hydrogen" }], explanation: "Hydrogen ions are reduced at the cathode; water is oxidised at the anode." }),
      P.num({ label: "(b)", marks: 1, stem: "After some time 18.0 cm³ of gas has collected above the cathode. What volume of gas, in cm³, has collected above the anode?", value: 9, unit: "cm³", wrong: ["18", "36"], explanation: "The volumes are 2 : 1 (hydrogen : oxygen), so 18.0 ÷ 2 = 9.0 cm³ of oxygen." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why the amount of sulfuric acid in the voltameter does not change.", points: ["H⁺ ions are used up at the cathode (4H⁺ + 4e⁻ → 2H₂).", "The same amount of H⁺ is produced at the anode (2H₂O → O₂ + 4H⁺ + 4e⁻), so only water is used up overall."], modelAnswer: "Every 4 electrons remove 4 H⁺ at the cathode and form 4 H⁺ at the anode, so the acid is not consumed; overall 2H₂O → 2H₂ + O₂, and the acid simply becomes slightly more concentrated." }),
      P.manual({ label: "(d)", marks: 1, stem: "Suggest why the measured volume of oxygen is often slightly less than half that of hydrogen at the start of the experiment.", points: ["Oxygen is more soluble in water than hydrogen (or some oxygen reacts with/adsorbs on the electrode), so less is collected at first."], modelAnswer: "Oxygen is slightly more soluble in water than hydrogen, so some dissolves before the solution is saturated." }),
    ],
    hints: ["Count electrons in each half-equation."],
    explanation: "H₂ at the cathode and O₂ at the anode in a 2 : 1 ratio by volume; the acid is not used up.",
  });
  b.card("CONCEPT", "Molten electrolyte products", "Metal at the cathode, non-metal at the anode (no water to compete).");
  b.card("CONCEPT", "Cathode rule (aqueous)", "The species with the more positive E⦵ is reduced: Cu²⁺, Ag⁺ give metals; K⁺, Na⁺, Mg²⁺, Al³⁺ give hydrogen.");
  b.card("CONCEPT", "Anode rule (aqueous, inert electrodes)", "I⁻, Br⁻ and concentrated Cl⁻ give halogens; SO₄²⁻, NO₃⁻ and dilute Cl⁻ give oxygen.");
  b.card("FORMULA", "Oxygen at the anode", "2H₂O → O₂ + 4H⁺ + 4e⁻ (or 4OH⁻ → O₂ + 2H₂O + 4e⁻)");
  b.card("FORMULA", "Hydrogen at the cathode (neutral or alkaline)", "2H₂O + 2e⁻ → H₂ + 2OH⁻");
  b.card("CONCEPT", "Why concentration matters for NaCl(aq)", "E⦵ for Cl₂ (+1.36 V) and O₂ (+1.23 V) are close: concentrated chloride gives Cl₂, dilute gives O₂.");
  b.card("CONCEPT", "CuSO₄(aq) with carbon electrodes", "Copper on the cathode, oxygen at the anode, blue colour fades, solution becomes acidic.");
  b.card("CONCEPT", "CuSO₄(aq) with copper electrodes", "Copper anode dissolves, cathode gains copper, colour unchanged: the basis of refining.");
  b.card("DEFINITION", "Inert electrode", "Conducts electrons but does not react, e.g. platinum or graphite.");
});
