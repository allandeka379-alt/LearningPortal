// W4b: achem.polymers.uses-degradability (both boards; ZIMSEC Form 6, Cambridge A Level only)
import { concept, P, t, ce, Mr, moles, sfStr, chk } from "../lib.mjs";

concept("achem.polymers.uses-degradability", { file: "polymers/uses-degradability", keyPrefix: "polymers.uses-degradability" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which polymer is used to coat non-stick frying pans?",
    options: [
      ["poly(tetrafluoroethene), PTFE", "Correct: very low friction, very inert and stable at cooking temperatures."],
      ["poly(chloroethene), PVC", "PVC softens and decomposes on heating, releasing HCl; it is used for pipes and cable insulation."],
      ["poly(phenylethene), polystyrene", "Polystyrene softens at a low temperature; it is used for packaging and insulation."],
      ["low-density poly(ethene), LDPE", "LDPE melts at a low temperature; it is used for bags and film."],
    ],
    answer: "A",
    explanation: "PTFE is chosen for its extremely low friction, chemical inertness and stability at high temperature.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why is nylon a better material than poly(ethene) for fishing nets that must hold heavy loads?",
    options: [
      ["Hydrogen bonds between nylon chains make strong fibres.", "Correct: N–H···O=C hydrogen bonds hold the chains together strongly."],
      ["Nylon chains contain C=C bonds that make the fibres more rigid.", "Nylon has no C=C bonds; its strength comes from inter-chain hydrogen bonding."],
      ["Nylon is non-biodegradable, whereas poly(ethene) rots quickly in water.", "Poly(ethene) is the more inert, non-biodegradable polymer."],
      ["Nylon dissolves slowly in water, which makes the knots tighten.", "Nylon does not dissolve in water."],
    ],
    answer: "A",
    explanation: "Amide groups on neighbouring nylon chains form hydrogen bonds, stronger than the instantaneous dipole forces between poly(ethene) chains.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A polymer is described as photodegradable. What does this mean?",
    options: [
      ["Its chains break when it absorbs ultraviolet light.", "Correct: absorbed UV energy breaks bonds in the chain."],
      ["It is broken down by bacteria and fungi in moist soil.", "That describes a biodegradable polymer."],
      ["It is hydrolysed by water in the presence of acid.", "That is hydrolysis, which needs polar links such as ester groups."],
      ["It melts when heated and can be remoulded.", "That describes a thermoplastic, not degradation."],
    ],
    answer: "A",
    explanation: "Photodegradable polymers contain groups (such as C=O) that absorb UV radiation; the energy breaks the chain into smaller pieces.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements about the disposal of polymers are correct?\n\n1. Photodegradable polymers break down only slowly, or not at all, when buried in landfill.\n2. Incinerating PVC can release hydrogen chloride.\n3. Poly(propene) is readily hydrolysed by hot aqueous sodium hydroxide.",
    options: [
      ["1 and 2 only", "Correct: no UV reaches buried plastic, and PVC's chlorine is released as HCl when burned."],
      ["1, 2 and 3", "Statement 3 is false: poly(propene) has no hydrolysable links."],
      ["2 and 3 only", "Statement 3 is false and statement 1 is true."],
      ["1 only", "Statement 2 is also true."],
    ],
    answer: "A",
    hints: ["Which polymers have links that can be hydrolysed?"],
    explanation: "Photodegradation needs light; burning PVC gives HCl; a poly(alkene) such as poly(propene) is not hydrolysed.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "PET is boiled with excess aqueous sodium hydroxide until it is completely hydrolysed. Which pair of products forms?",
    options: [
      ["ethane-1,2-diol and disodium benzene-1,4-dicarboxylate", "Correct: alkali hydrolyses the ester links; the acid appears as its sodium salt."],
      ["ethane-1,2-diol and benzene-1,4-dicarboxylic acid", "These are the products of acid hydrolysis; in excess alkali the acid is deprotonated."],
      ["sodium ethane-1,2-dioxide and benzene-1,4-dicarboxylic acid", "The diol is not deprotonated by aqueous alkali; the carboxylic acid is."],
      ["ethene and benzene-1,4-dicarboxylic acid", "Hydrolysis does not regenerate a C=C bond."],
    ],
    answer: "A",
    hints: ["What happens to –COOH groups in alkali?"],
    explanation: "Ester links + OH⁻ → alcohol + carboxylate. PET gives HOCH₂CH₂OH and NaOOC–C₆H₄–COONa.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Nylon-6,6 is boiled with concentrated hydrochloric acid until fully hydrolysed. Which product contains nitrogen?",
    options: [
      [t`$\ce{ClH3N(CH2)6NH3Cl}$`, "Correct: the diamine is released and protonated by the acid, giving its ammonium chloride salt."],
      [t`$\ce{H2N(CH2)6NH2}$`, "In excess acid the amine groups are protonated, so the free diamine does not remain."],
      [t`$\ce{H2NCO(CH2)4CONH2}$`, "Hydrolysis breaks amide links; it does not form a new diamide."],
      [t`$\ce{NH4Cl}$`, "The nitrogen stays attached to the carbon chain; it is not lost as ammonia."],
    ],
    answer: "A",
    hints: ["Amines are bases."],
    explanation: "Acid hydrolysis gives hexanedioic acid and hexane-1,6-diammonium chloride, ClH₃N(CH₂)₆NH₃Cl.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A supermarket proposes replacing poly(ethene) carrier bags with bags labelled 'photodegradable'. Which is the strongest scientific objection?",
    options: [
      ["Buried bags get no UV, and bags in sunlight may only break into small fragments.", "Correct: photodegradation needs light and does not turn the polymer into CO₂ and water."],
      ["Photodegradable bags are made from chlorine-containing monomers, which form HCl when they break down.", "Photodegradable poly(alkene)s usually contain C=O groups, not chlorine."],
      ["Photodegradable polymers dissolve in rainwater, releasing toxic monomers into the soil.", "They do not dissolve in water; they become brittle and fragment in UV light."],
      ["Photodegradable bags degrade so fast that they break before the customer gets home.", "Degradation in sunlight takes weeks to months, not minutes."],
    ],
    answer: "A",
    hints: ["Where do discarded bags usually end up?"],
    explanation: "UV is needed, so buried or covered bags persist; fragments may persist as small pieces.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements about the uses of polymers are correct?\n\n1. PTFE is used for non-stick coatings because it has very low friction and is very unreactive.\n2. Nylon is used for ropes because hydrogen bonds between its chains give high tensile strength.\n3. LDPE is used for rigid water tanks because its chains are highly branched.",
    options: [
      ["1 and 2 only", "Correct: statement 3 is false; branching makes LDPE soft and flexible, so tanks are made of HDPE."],
      ["1, 2 and 3", "Statement 3 is false: highly branched chains pack poorly, giving a soft, flexible polymer."],
      ["2 and 3 only", "Statement 1 is true and statement 3 is false."],
      ["1 only", "Statement 2 is also true."],
    ],
    answer: "A",
    hints: ["Which form of poly(ethene) is stiff?"],
    explanation: "PTFE: low friction and inert; nylon: hydrogen-bonded, strong fibres; rigid tanks are HDPE, not LDPE.",
  });
  {
    const nRep = moles(4.52, Mr("C12H22N2O2"));
    const nHCl = 2 * nRep;
    const mAcid = nRep * Mr("HOOC(CH2)4COOH");
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: "4.52 g of nylon-6,6 (repeat unit –NH(CH₂)₆NH–CO(CH₂)₄CO–, Mr 226) is completely hydrolysed by boiling with excess hydrochloric acid. The products are hexanedioic acid and hexane-1,6-diammonium chloride, ClH₃N(CH₂)₆NH₃Cl. Calculate the amount, in mol, of HCl used up.",
      value: nHCl, sf: 3, unit: "mol",
      wrong: [nRep],
      hints: ["HCl is not just a catalyst here: it ends up in the diammonium salt.", "How many N atoms are in each repeat unit?"],
      explanation: `1. Amount of repeat units = 4.52 ÷ 226 = ${sfStr(nRep, 3)} mol.\n2. Each repeat unit gives one H₂N(CH₂)₆NH₂, which takes up 2 HCl to form ClH₃N(CH₂)₆NH₃Cl (water, not HCl, breaks the amide links).\n3. HCl used = 2 × ${sfStr(nRep, 3)} = ${sfStr(nHCl, 3)} mol. The other product is ${sfStr(nRep, 3)} mol (${sfStr(mAcid, 3)} g) of hexanedioic acid.\n4. One HCl per repeat unit (${sfStr(nRep, 3)} mol) forgets that the diamine has two basic NH₂ groups.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Polyesters and polyamides are more likely to be biodegradable than poly(alkene)s because they contain polar links that can be hydrolysed.",
    answer: true,
    explanation: "True. Ester and amide links can be attacked by water (with acid, alkali or enzymes); poly(alkene)s have only C–C and C–H bonds.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A photodegradable carrier bag buried deep in a landfill site breaks down as quickly as one left in sunlight.",
    answer: false,
    explanation: "False. Photodegradation needs ultraviolet light, which does not reach buried waste.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each polymer with a typical use.",
    pairs: [
      ["Kevlar", "protective vests and helmets"],
      ["PET", "transparent drink bottles"],
      ["expanded polystyrene", "lightweight packaging and insulation"],
      ["poly(propene)", "woven sacks and ropes"],
    ],
    explanation: "Kevlar: high strength for its mass. PET: strong and transparent. Expanded polystyrene: light and insulating. Poly(propene): tough fibres.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Complete the sentences about hydrolysis of condensation polymers.",
    template: "When a polyamide is hydrolysed by hot aqueous acid, the amine groups are released as {{blank:a}} ions. When a polyester is hydrolysed by hot aqueous alkali, the acid groups are released as {{blank:b}} ions. Poly(alkene)s are not hydrolysed because their chains have no {{blank:c}} links.",
    blanks: [
      { id: "a", accepted: ["ammonium"], choices: ["ammonium", "amide", "nitrate"] },
      { id: "b", accepted: ["carboxylate"], choices: ["carboxylate", "hydroxide", "oxonium"] },
      { id: "c", accepted: ["polar"], choices: ["polar", "single", "carbon"] },
    ],
    hints: ["Acid protonates; alkali deprotonates."],
    explanation: "In acid –NH₂ → –NH₃⁺; in alkali –COOH → –COO⁻. Poly(alkene)s lack polar, hydrolysable ester or amide links.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the type of radiation that breaks down a photodegradable polymer.",
    accepted: ["ultraviolet", "ultraviolet light", "UV", "UV light", "ultraviolet radiation", "UV radiation", "sunlight"],
    wrong: ["infrared"],
    explanation: "Ultraviolet radiation (in sunlight) is absorbed by C=O groups in the chain, breaking bonds.",
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how including carbonyl groups in a poly(ethene) chain makes the polymer photodegradable, and give one limitation of this approach.",
    points: ["The C=O groups absorb ultraviolet radiation (poly(ethene) itself absorbs little)", "The energy absorbed breaks bonds in the chain next to the C=O, so the chain splits and the plastic becomes brittle and fragments", "Limitation: needs light, so buried/covered plastic does not degrade, or the fragments still persist as small pieces"],
    modelAnswer: "Carbonyl groups absorb ultraviolet radiation from sunlight. The energy absorbed breaks bonds in the polymer chain near the C=O groups, so the long chains are cut into shorter pieces and the plastic becomes brittle and falls apart. However, the process needs light: plastic buried in landfill or covered by soil does not degrade, and the small fragments formed can still remain in the environment.",
    hints: ["What does a C=O group absorb?"],
    explanation: "Mechanism (absorb UV, break chain) plus one limitation.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 2,
    stem: "Suggest why expanded polystyrene is used for packaging fragile goods, and one environmental disadvantage of this use.",
    points: ["Very low density and absorbs shocks (air trapped in the foam), cheap", "It is non-biodegradable / bulky litter that persists, and it breaks into small pieces that are hard to collect (or burning gives smoke and CO)"],
    modelAnswer: "Expanded polystyrene is very light and cushions impacts because of the trapped air, and it is cheap. But it is non-biodegradable, bulky and easily broken into small pieces that persist as litter.",
    hints: ["Think about density and what happens to it as litter."],
    explanation: "One property linked to the use, one disadvantage.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "A school in Masvingo collects used PET drink bottles. Discuss the case for chemically recycling PET by hydrolysis compared with sending the bottles to landfill.",
    points: ["Hydrolysis breaks the ester links, recovering ethane-1,2-diol and benzene-1,4-dicarboxylic acid (or its salt) that can be repolymerised", "Advantage: saves crude oil/feedstock and reduces waste in landfill (PET persists for a long time in landfill)", "Disadvantage: needs collection, sorting and cleaning, plus energy and acid or alkali for hydrolysis", "A conclusion weighing these, e.g. recycling is better where bottles can be collected cleanly in large amounts"],
    modelAnswer: "Because PET is a polyester, its ester links can be hydrolysed back to ethane-1,2-diol and benzene-1,4-dicarboxylic acid, which can be made into new PET of good quality. This conserves the crude oil used to make the monomers and keeps bottles out of landfill, where they would last for a very long time. On the other hand, bottles must be collected, sorted from other plastics and cleaned, and hydrolysis needs energy and chemicals. Overall, chemical recycling is preferable where clean bottles can be collected in large quantities.",
    hints: ["Which links in PET can be broken?"],
    explanation: "Chemistry of the process, an advantage, a disadvantage and a conclusion.",
  });
  {
    const nUnits = moles(7.2, Mr("C3H4O2"));
    const mNaOH = nUnits * Mr("NaOH");
    const mSalt = nUnits * Mr("CH3CH(OH)COONa");
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: "Farai tests disposable cups made of poly(lactic acid), repeat unit –O–CH(CH₃)–CO– (Mr 72.0). A 7.20 g piece of cup is boiled with excess aqueous sodium hydroxide until it dissolves completely. Ar: H 1.0, C 12.0, O 16.0, Na 23.0.",
      parts: [
        P.short({ label: "(a)", marks: 1, stem: "Name the type of reaction that takes place.", accepted: ["hydrolysis", "alkaline hydrolysis", "base hydrolysis", "saponification"], wrong: ["oxidation"], explanation: "The ester links are hydrolysed by hydroxide ions." }),
        P.short({ label: "(b)", marks: 1, stem: "Give the structural formula of the organic product.", accepted: ["CH3CH(OH)COONa", "CH₃CH(OH)COONa", "CH3CH(OH)COO-Na+", "CH3CH(OH)CO2Na", "CH3CH(OH)COO-", "CH₃CH(OH)COO⁻Na⁺"], normalise: ["trim", "collapse_whitespace"], wrong: ["CH3CH(OH)COOH"], explanation: "Sodium 2-hydroxypropanoate: the acid is present as its salt in alkali." }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the minimum mass of sodium hydroxide, in g, needed.", value: mNaOH, sf: 3, unit: "g", wrong: [2 * mNaOH], explanation: `Amount of repeat units = 7.20 ÷ 72.0 = ${sfStr(nUnits, 3)} mol; one ester link (one OH⁻) per unit, so ${sfStr(nUnits, 3)} mol NaOH = ${sfStr(mNaOH, 3)} g. Two OH⁻ per unit applies to diol + diacid polyesters.` }),
        P.num({ label: "(d)", marks: 1, stem: "Calculate the mass of organic product formed, in g.", value: mSalt, sf: 3, unit: "g", explanation: `${sfStr(nUnits, 3)} mol × Mr ${Mr("CH3CH(OH)COONa")} = ${sfStr(mSalt, 3)} g.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain why a poly(propene) cup would be unchanged by the same treatment.", points: ["Poly(propene) has only C–C and C–H bonds (no ester or other polar links)", "These are strong and non-polar, so OH⁻ ions (nucleophiles) have nothing to attack"], modelAnswer: "Poly(propene) is a poly(alkene) whose chains contain only strong, non-polar C–C and C–H bonds. There is no polar ester link with a δ+ carbon for hydroxide ions to attack, so the polymer is not hydrolysed." }),
        P.mcq({ label: "(f)", marks: 1, stem: "Which disposal route makes best use of this property of poly(lactic acid)?", options: [
          ["industrial composting with warmth, moisture and microbes", "Correct: its ester links are hydrolysed and the products digested by microorganisms."],
          ["deep landfill, where the absence of light and air preserves it", "Degradation is slow in dry, airless landfill; this does not use its degradability."],
          ["open burning at a dumpsite, which produces only steam", "Burning gives CO₂ (and CO and smoke if incomplete), not only water."],
          ["mixing with poly(ethene) for mechanical recycling", "Mixing different plastics spoils recycled material."],
        ], answer: "A", explanation: "Composting uses the hydrolysable ester links." }),
      ],
      hints: ["One ester link per repeat unit."],
      explanation: `${sfStr(nUnits, 3)} mol units need ${sfStr(mNaOH, 3)} g NaOH and give ${sfStr(mSalt, 3)} g of sodium 2-hydroxypropanoate; poly(propene) has no hydrolysable link.`,
    });
  }
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true,
    stem: "A hardware shop in Kwekwe sells the following products: (1) a water tank, (2) a non-stick pan, (3) flexible electrical cable, (4) a climbing rope, (5) a fizzy-drink bottle, (6) a protective helmet.",
    parts: [
      P.match({ label: "(a)", marks: 6, stem: "Match each product to the polymer most likely used.", pairs: [["water tank", "HDPE"], ["non-stick pan coating", "PTFE"], ["flexible cable insulation", "plasticised PVC"], ["climbing rope", "nylon"], ["fizzy-drink bottle", "PET"], ["protective helmet", "Kevlar"]], explanation: "Each use follows from the polymer's properties." }),
      P.manual({ label: "(b)", marks: 2, stem: "For the climbing rope, state the property needed and explain it in terms of structure.", points: ["High tensile strength (strong, does not snap) / hard-wearing", "Hydrogen bonds between N–H and C=O groups on neighbouring nylon chains hold the chains together"], modelAnswer: "The rope must have high tensile strength. Nylon chains are held together by hydrogen bonds between the N–H of one chain and the C=O of the next, so the fibres resist being pulled apart." }),
    ],
    hints: ["Think about what each product needs to do."],
    explanation: "HDPE tank; PTFE coating; plasticised PVC cable; nylon rope; PET bottle; Kevlar helmet.",
  });
  b.card("CONCEPT", "Why poly(alkene)s are inert", "Only strong, non-polar C–C and C–H bonds; no polar links for water, acid, alkali or enzymes to attack.");
  b.card("DEFINITION", "Photodegradable polymer", "A polymer whose chains break when it absorbs light, usually UV; often contains C=O groups.");
  b.card("DEFINITION", "Biodegradable polymer", "A polymer that microorganisms break down into small molecules such as CO₂ and water.");
  b.card("FACT", "Acid hydrolysis of a polyamide", "Gives the dicarboxylic acid and the ammonium salt of the diamine (e.g. ClH₃N(CH₂)₆NH₃Cl).");
  b.card("FACT", "Alkaline hydrolysis of a polyester", "Gives the diol and the carboxylate salt of the diacid (e.g. NaOOC–C₆H₄–COONa).");
  b.card("FACT", "PTFE uses", "Non-stick coatings, plumbing tape, bearings: very low friction and very inert.");
  b.card("FACT", "PVC uses", "Rigid: pipes, window frames. Plasticised: cable insulation, flooring. Durable and insulating.");
  b.card("FACT", "Kevlar uses", "Protective vests and helmets, ropes, tyre reinforcement: very strong for its mass.");
  b.card("CONCEPT", "Limits of photodegradation", "Needs UV light, so buried plastic does not degrade; fragments may persist.");
});
