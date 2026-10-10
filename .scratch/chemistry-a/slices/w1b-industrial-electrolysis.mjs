// W1b: achem.electrochem.industrial-electrolysis (ZIMSEC only)
import { concept, P, t, ce, ZIM, AR, F, massLiberated, sfStr, dpStr, chk } from "../lib.mjs";

concept("achem.electrochem.industrial-electrolysis", { file: "electrochem/industrial-electrolysis", keyPrefix: "electrochem.industrial-electrolysis", applies: ZIM }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the purpose of the cryolite in the extraction of aluminium?",
    options: [
      ["It dissolves the alumina and lowers the operating temperature.", "Correct: alumina dissolved in molten cryolite can be electrolysed at about 950 °C instead of above 2000 °C."],
      ["It is the ore from which the aluminium is obtained.", "The aluminium comes from the alumina (purified bauxite); cryolite is the solvent."],
      ["It reduces aluminium ions to aluminium at the cathode.", "Electrons from the cathode reduce Al³⁺; cryolite is not a reducing agent."],
      ["It protects the carbon anodes from burning away.", "The anodes still burn away and must be replaced."],
    ],
    answer: "A",
    explanation: "Molten cryolite (Na₃AlF₆) dissolves alumina, giving a conducting melt at a much lower temperature, which saves energy.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why must the carbon anodes be replaced regularly during aluminium extraction?",
    options: [
      ["Oxygen formed at the anodes burns the hot carbon.", "Correct: C + O₂ → CO₂ at about 950 °C, so the anodes are gradually used up."],
      ["Aluminium deposits on the anodes and blocks them.", "Aluminium forms at the cathode, not the anode."],
      ["The molten cryolite dissolves the carbon.", "Cryolite dissolves alumina, not carbon."],
      ["Fluorine is released at the anodes and attacks them.", "Oxide ions, not fluoride ions, are discharged at the anode."],
    ],
    answer: "A",
    explanation: "Anode: 2O²⁻ → O₂ + 4e⁻; the hot oxygen burns the carbon: C + O₂ → CO₂.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In the membrane cell for electrolysis of brine, which ions pass through the membrane?",
    options: [
      ["sodium ions", "Correct: Na⁺ moves from the anode compartment to the cathode compartment."],
      ["chloride ions", "Cl⁻ is oxidised at the anode and is kept on the anode side."],
      ["hydroxide ions", "OH⁻ is kept in the cathode compartment, where NaOH forms."],
      ["hydrogen ions", "The membrane is selective for Na⁺ (and water)."],
    ],
    answer: "A",
    explanation: "The ion-exchange membrane lets Na⁺ (and water) through but not Cl⁻ or OH⁻, so sodium hydroxide forms on the cathode side free of chloride.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which statements about the electrolytic refining of copper are correct?\n\n1. The impure copper is made the anode.\n2. Silver and gold impurities collect as anode sludge.\n3. Zinc impurities dissolve and stay in solution as Zn²⁺ ions.",
    options: [
      ["1, 2 and 3", "Correct: zinc dissolves but is not deposited, because Cu²⁺ is reduced in preference."],
      ["1 and 2 only", "Statement 3 is also true: Zn²⁺ (E⦵ = −0.76 V) stays in solution."],
      ["2 and 3 only", "Statement 1 is also true: the impure metal is always the anode."],
      ["1 only", "Statements 2 and 3 are also true."],
    ],
    answer: "A",
    hints: ["Which ions are easiest to reduce at the cathode?"],
    explanation: "The impure anode dissolves; Cu²⁺ is the most easily reduced ion, so only copper deposits. More reactive metals stay in solution as ions; less reactive ones fall as anode sludge.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which statements explain why aluminium smelters are usually built where electricity is cheap?\n\n1. Cheap electricity removes the need to replace the anodes.\n2. A very large current is needed for each tonne of aluminium.\n3. Energy is needed to keep the electrolyte molten.",
    options: [
      ["1, 2 and 3", "Statement 1 is false: the anodes burn because of oxygen, not because of the cost of electricity."],
      ["2 and 3 only", "Correct: electricity is the main running cost; the anodes are burned away whatever the energy source."],
      ["1 and 2 only", "Statement 1 is false, and statement 3 is true (the melt is kept at about 950 °C)."],
      ["1 only", "Statement 1 is false; statements 2 and 3 are the reasons."],
    ],
    answer: "B",
    hints: ["What are the two uses of electricity in the cell?"],
    explanation: "Each Al³⁺ needs three electrons, so huge charges are passed, and the cell must stay hot; both make electricity the dominant cost.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why are the chlorine and hydrogen produced in brine electrolysis kept apart?",
    options: [
      ["A mixture of hydrogen and chlorine can explode, especially in light.", "Correct: H₂ + Cl₂ → 2HCl is violently exothermic and can be set off by light."],
      ["Hydrogen would reduce the sodium hydroxide.", "Hydrogen does not react with sodium hydroxide."],
      ["Chlorine would oxidise the titanium anode.", "The anode is chosen to resist chlorine; that is not why the gases are separated."],
      ["The two gases would react to form sodium chloride again.", "Sodium chloride needs sodium; the gases would form hydrogen chloride."],
    ],
    answer: "A",
    hints: ["What do hydrogen and chlorine form when they react?"],
    explanation: "H₂ and Cl₂ react explosively (photochemically). The membrane also stops chlorine reacting with the sodium hydroxide.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which product of brine electrolysis is used to purify bauxite and to make soap?",
    options: [
      ["sodium hydroxide", "Correct: NaOH dissolves alumina from bauxite (separating iron oxide) and saponifies fats."],
      ["chlorine", "Chlorine is used for water treatment, PVC and bleach."],
      ["hydrogen", "Hydrogen is used for ammonia and margarine manufacture."],
      ["sodium chloride", "Sodium chloride is the starting material, not a product."],
    ],
    answer: "A",
    explanation: "Sodium hydroxide: bauxite purification, soap, paper, textiles.",
  });
  {
    const perMolE = AR.Al / 3;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "In an aluminium cell, 3.00 mol of electrons pass through the cell. What mass of aluminium, in g, is produced? (Ar: Al = 27.0)",
      value: AR.Al, sf: 3, unit: "g",
      wrong: [String(3 * AR.Al), sfStr(perMolE, 3)],
      hints: ["Al³⁺ + 3e⁻ → Al."],
      explanation: "Three moles of electrons reduce one mole of Al³⁺ to Al: 1.00 mol × 27.0 g mol⁻¹ = 27.0 g.",
    });
  }
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "In the membrane cell, 5.0 mol of chlorine is produced. How many moles of sodium hydroxide are formed at the same time?",
    value: 10, unit: "mol",
    wrong: ["5", "2.5"],
    hints: ["2NaCl + 2H₂O → Cl₂ + H₂ + 2NaOH."],
    explanation: "Overall: 2NaCl + 2H₂O → Cl₂ + H₂ + 2NaOH, so 2 mol NaOH per mole of Cl₂: 10 mol.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In the electrolytic refining of copper, the cathode is made of pure copper.",
    answer: true,
    explanation: "True. A thin sheet of pure copper is the cathode; pure copper deposits on it.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Aluminium can be extracted by electrolysing an aqueous solution of an aluminium salt.",
    answer: false,
    explanation: "False. In water, hydrogen is produced at the cathode instead, because Al³⁺ is much harder to reduce than water. A molten, water-free electrolyte is needed.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each process with the reaction at its cathode.",
    pairs: [
      ["extraction of aluminium", t`$\ce{Al^3+ + 3e- -> Al}$`],
      ["membrane cell for brine", t`$\ce{2H2O + 2e- -> H2 + 2OH-}$`],
      ["refining copper", t`$\ce{Cu^2+ + 2e- -> Cu}$`],
      ["refining nickel", t`$\ce{Ni^2+ + 2e- -> Ni}$`],
    ],
    explanation: "Aluminium and the refined metals are deposited at their cathodes; in brine electrolysis water is reduced to hydrogen.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the description of copper refining.",
    template: "The impure copper is the {{blank:a}}, the electrolyte is acidified copper(II) {{blank:b}}, and gold and silver collect as {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["anode"], choices: ["anode", "cathode"] },
      { id: "b", accepted: ["sulfate"], choices: ["sulfate", "chloride", "carbonate"] },
      { id: "c", accepted: ["anode sludge"], choices: ["anode sludge", "a cathode deposit", "a gas"] },
    ],
    explanation: "Impure anode dissolves; CuSO₄(aq) with H₂SO₄ carries Cu²⁺; unreactive metals fall as anode sludge.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Write the half-equation for the reaction at the anode in the membrane cell. (Type it as, for example, 2X- -> X2 + 2e-.)",
    accepted: ["2Cl- -> Cl2 + 2e-", "2Cl- → Cl2 + 2e-", "2Cl⁻ → Cl₂ + 2e⁻", "2Cl- = Cl2 + 2e-", "2Cl- -> Cl2 + 2e"],
    normalise: ["trim", "lowercase", "remove_whitespace"],
    wrong: ["Cl2 + 2e- -> 2Cl-"],
    explanation: "Chloride ions are oxidised at the anode: 2Cl⁻ → Cl₂ + 2e⁻.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the electrolytic extraction of aluminium from alumina. Include the electrolyte, the electrodes and the electrode equations.",
    points: ["Alumina (purified bauxite) is dissolved in molten cryolite at about 950 °C.", "Carbon (graphite) electrodes: the cell lining is the cathode and carbon blocks are the anodes.", "Cathode: Al³⁺ + 3e⁻ → Al (molten aluminium tapped off from the bottom).", "Anode: 2O²⁻ → O₂ + 4e⁻; the oxygen burns the carbon anodes to CO₂, so they are replaced."],
    modelAnswer: "Purified alumina is dissolved in molten cryolite at about 950 °C in a steel cell lined with carbon, which is the cathode; carbon blocks dip in as anodes. Al³⁺ + 3e⁻ → Al at the cathode, and molten aluminium is siphoned off. At the anodes 2O²⁻ → O₂ + 4e⁻; the hot oxygen reacts with the carbon to give CO₂, so the anodes must be replaced regularly.",
    hints: ["Four marks: electrolyte, electrodes, two equations."],
    explanation: "Each creditworthy idea earns one mark.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Discuss two economic and two environmental considerations in the electrolytic extraction of aluminium.",
    points: ["Economic: very high electricity consumption, so plants are sited near cheap (e.g. hydroelectric) power.", "Economic: carbon anodes must be replaced regularly (cost); recycling aluminium needs far less energy than extraction.", "Environmental: carbon dioxide from the burning anodes (and from fossil-fuel electricity) adds to global warming.", "Environmental: fluoride (from cryolite) emissions must be controlled; mining bauxite and disposing of red mud damage land."],
    modelAnswer: "Economically, electricity is the largest cost, so smelters are built near cheap power, and the carbon anodes are a recurring cost; recycling aluminium saves most of the energy. Environmentally, the anodes are oxidised to CO₂, and fossil-fuel power adds more; fluoride fumes from the cryolite bath must be captured, and bauxite mining and red mud waste affect land.",
    hints: ["Think about energy, materials, gases and waste."],
    explanation: "Credit two distinct economic points and two distinct environmental points.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why only copper is deposited on the cathode during copper refining, although the impure anode contains zinc and nickel.",
    points: ["Zinc and nickel are more reactive than copper, so they are oxidised and dissolve from the anode as Zn²⁺ and Ni²⁺.", "At the cathode the most easily reduced ion is reduced first: Cu²⁺ has a more positive E⦵ than Zn²⁺ or Ni²⁺.", "So Zn²⁺ and Ni²⁺ stay in solution and only copper is deposited."],
    modelAnswer: "Zinc and nickel dissolve from the anode as ions, but at the cathode Cu²⁺ (E⦵ +0.34 V) is far easier to reduce than Ni²⁺ (−0.25 V) or Zn²⁺ (−0.76 V), so only copper is deposited and the other ions remain in solution.",
    hints: ["Compare how easily each ion is reduced."],
    explanation: "Link the selectivity at the cathode to electrode potentials.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true,
    stem: "Impure nickel containing small amounts of copper, iron and platinum group metals is refined by electrolysis using an aqueous nickel(II) sulfate electrolyte.",
    parts: [
      P.fib({ label: "(a)", stem: "Complete the set-up.", template: "The impure nickel is the {{blank:a}}; a thin sheet of pure nickel is the {{blank:b}}.", blanks: [{ id: "a", accepted: ["anode"], choices: ["anode", "cathode"] }, { id: "b", accepted: ["cathode"], choices: ["cathode", "anode"] }], explanation: "The impure metal dissolves at the anode; pure metal grows on the cathode." }),
      P.short({ label: "(b)", marks: 1, stem: "Write the half-equation at the cathode. (Type it as, for example, Ni2+ + 2e- -> Ni.)", accepted: ["Ni2+ + 2e- -> Ni", "Ni2+ + 2e- → Ni", "Ni²⁺ + 2e⁻ → Ni", "Ni^2+ + 2e- -> Ni"], normalise: ["trim", "lowercase", "remove_whitespace"], wrong: ["Ni -> Ni2+ + 2e-"], explanation: "Nickel(II) ions are reduced to nickel at the cathode." }),
      P.mcq({ label: "(c)", stem: "Where do the platinum group metals end up?", options: [["in the anode sludge", "Correct: they are less reactive than nickel, so they do not dissolve."], ["deposited on the cathode", "They never enter the solution, so they cannot be deposited."], ["dissolved in the electrolyte", "They are not oxidised at the anode."], ["as a gas at the anode", "Metals do not form gases here."]], answer: "A", explanation: "Unreactive metals fall from the anode as sludge, which is collected and processed." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain what happens to the iron impurity.", points: ["Iron is more reactive than nickel, so it is oxidised at the anode and dissolves (as Fe²⁺).", "Fe²⁺ is harder to reduce than Ni²⁺, so it stays in solution and is not deposited."], modelAnswer: "Iron dissolves from the anode as Fe²⁺ because it is more reactive than nickel, but at the cathode Ni²⁺ is reduced in preference, so the iron stays in the electrolyte (which is purified from time to time)." }),
      P.manual({ label: "(e)", marks: 2, stem: "Suggest why the anode sludge from nickel refining can be economically important.", points: ["It contains valuable metals such as platinum, palladium, gold or silver.", "Recovering them adds income that helps pay for the refining (and conserves scarce metals)."], modelAnswer: "The sludge concentrates precious metals such as platinum group metals; selling them can be worth a lot and offsets the cost of the electricity." }),
    ],
    hints: ["More reactive metals dissolve and stay in solution; less reactive metals form sludge."],
    explanation: "Nickel is transferred from the impure anode to the pure cathode; iron and copper behave according to their reactivity; platinum group metals collect in the sludge.",
  });
  b.struct({
    d: 3, skill: "UNDERSTANDING", examStyle: true,
    stem: "Hydrogen and oxygen can be made by electrolysing water containing potassium hydroxide, with nickel electrodes.",
    parts: [
      P.mcq({ label: "(a)", stem: "Which half-equation occurs at the anode?", options: [[t`$\ce{4OH- -> O2 + 2H2O + 4e-}$`, "Correct: hydroxide ions are oxidised to oxygen."], [t`$\ce{2H2O + 2e- -> H2 + 2OH-}$`, "This reduction happens at the cathode."], [t`$\ce{K+ + e- -> K}$`, "Potassium is never deposited from water, and this is a reduction."], [t`$\ce{O2 + 2H2O + 4e- -> 4OH-}$`, "This is the reverse of the anode reaction."]], answer: "A", explanation: "Oxidation at the anode: 4OH⁻ → O₂ + 2H₂O + 4e⁻." }),
      P.num({ label: "(b)", marks: 1, stem: "What volume of oxygen, in dm³, forms while 30 dm³ of hydrogen forms (same conditions)?", value: 15, unit: "dm³", wrong: ["30", "60"], explanation: "Hydrogen and oxygen form in a 2 : 1 ratio by volume: 15 dm³." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why potassium hydroxide is added to the water.", points: ["Pure water is a very poor conductor (very few ions).", "KOH provides mobile ions so a current can flow; K⁺ is not discharged (and OH⁻ gives oxygen anyway)."], modelAnswer: "Pure water has too few ions to conduct; adding KOH supplies many mobile ions, and neither K⁺ nor the extra OH⁻ changes the products, which are still hydrogen and oxygen." }),
      P.manual({ label: "(d)", marks: 2, stem: "Hydrogen from electrolysis is described as 'green' only under certain conditions. Explain.", points: ["Electrolysis needs a lot of electricity.", "The hydrogen is 'green' (low-carbon) only if the electricity comes from renewable sources such as hydroelectric or solar power; electricity from coal releases CO₂."], modelAnswer: "The process uses a lot of electricity; if that electricity comes from burning coal, carbon dioxide is released, so the hydrogen is only low-carbon when renewable power such as solar or hydroelectricity is used." }),
    ],
    hints: ["Count electrons: 4 for each O₂ and 2 for each H₂."],
    explanation: "2H₂O → 2H₂ + O₂ overall; KOH provides conductivity; the carbon footprint depends on the electricity source.",
  });
  b.card("FACT", "Electrolyte for aluminium extraction", "Alumina dissolved in molten cryolite (Na₃AlF₆) at about 950 °C.");
  b.card("FORMULA", "Electrode reactions in aluminium extraction", "Cathode: Al³⁺ + 3e⁻ → Al. Anode: 2O²⁻ → O₂ + 4e⁻, then C + O₂ → CO₂.");
  b.card("CONCEPT", "Why carbon anodes are replaced", "Hot oxygen produced at the anode burns the carbon to carbon dioxide.");
  b.card("CONCEPT", "Membrane cell", "Brine: Cl₂ at the titanium anode, H₂ and OH⁻ at the nickel cathode; the membrane passes Na⁺ only, giving NaOH and keeping products apart.");
  b.card("FACT", "Uses of chlorine", "Water treatment, PVC, bleach, hydrochloric acid.");
  b.card("FACT", "Uses of sodium hydroxide", "Soap and detergents, paper, purifying bauxite, textiles.");
  b.card("CONCEPT", "Electrolytic refining of copper or nickel", "Impure anode dissolves; pure metal deposits on the cathode; less reactive metals form anode sludge; more reactive ones stay in solution.");
  b.card("CONCEPT", "Main economic factor in industrial electrolysis", "Electricity cost: plants are sited near cheap power; recycling saves energy.");
});
