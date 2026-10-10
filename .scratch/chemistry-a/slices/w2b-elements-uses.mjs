// W2b: achem.group14.elements-uses (ZIMSEC only, Form 5; tagged ZIMSEC automatically).
import { concept, P, t, Mr, AR, VM_RTP, sfStr, chk } from "../lib.mjs";

concept("achem.group14.elements-uses", { file: "group14/elements-uses", keyPrefix: "group14.elements-uses" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which Group IV element is a metal?",
    options: [
      ["lead", "Correct: lead (and tin) have metallic structures."],
      ["carbon", "Carbon is a non-metal."],
      ["silicon", "Silicon is a metalloid."],
      ["germanium", "Germanium is a metalloid."],
    ],
    answer: "A",
    explanation: "Metallic character increases down Group IV: C non-metal, Si and Ge metalloids, Sn and Pb metals.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why does graphite conduct electricity?",
    options: [
      ["Each carbon atom has one delocalised electron that can move along its layer.", "Correct: three electrons bond, the fourth is delocalised."],
      ["The layers of carbon atoms can slide over one another.", "Sliding layers explain softness, not conduction."],
      ["Graphite contains carbon ions that move when a voltage is applied.", "Graphite has no ions; it is covalently bonded."],
      ["Weak forces between layers allow electrons to jump between them.", "Conduction is along the layers, not between them."],
    ],
    answer: "A",
    explanation: "Delocalised electrons in each layer are the charge carriers.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which use of a Group IV substance is matched with the correct property?",
    options: [
      ["silicon in solar cells: it is a semiconductor", "Correct: its conductivity can be controlled, and light frees electrons."],
      ["graphite in drill bits: it is very hard", "Graphite is soft; diamond is used in drill bits."],
      ["lead in food cans: it resists corrosion", "Tin, not toxic lead, is used to coat food cans."],
      ["diamond in electrodes: it conducts electricity", "Diamond is an insulator; graphite is used for electrodes."],
    ],
    answer: "A",
    explanation: "Each use must be linked to the right property: diamond is hard, graphite conducts, tin resists corrosion.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements about the melting points of the Group IV elements are correct?\n\n1. They generally decrease down the group.\n2. Carbon, silicon and germanium melt only when strong covalent bonds are broken.\n3. Tin and lead have high melting points because they have giant covalent structures.",
    options: [
      ["1 and 2 only", "Correct: tin and lead are metallic, with much lower melting points."],
      ["1, 2 and 3", "Statement 3 is false: tin and lead are metallic and melt at 232 °C and 327 °C."],
      ["2 and 3 only", "Statement 3 is false and statement 1 is true."],
      ["1 only", "Statement 2 is also true."],
    ],
    answer: "A",
    hints: ["Which elements are metals?"],
    explanation: "Giant covalent C, Si, Ge (bonds weakening down the group), then weaker metallic bonding in Sn and Pb.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is the melting point of silicon lower than that of diamond?",
    options: [
      ["Si–Si bonds are longer and weaker than C–C bonds.", "Correct: larger atoms form weaker covalent bonds."],
      ["Silicon is simple molecular but diamond is giant covalent.", "Both have giant covalent structures."],
      ["Silicon atoms form only three bonds each.", "Each silicon atom forms four bonds, like carbon in diamond."],
      ["Silicon has metallic bonding, which is weak.", "Silicon is a metalloid with covalent bonding."],
    ],
    answer: "A",
    hints: ["Both have the same structure; compare the bonds."],
    explanation: "Same diamond-like structure, but the bonds between larger Si atoms are weaker.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which statements explain why tetrachloromethane is no longer used as a dry-cleaning solvent?\n\n1. It is toxic.\n2. It damages the ozone layer.\n3. It is highly flammable.",
    options: [
      ["1 and 2 only", "Correct: CCl₄ is not flammable (it was even used in fire extinguishers)."],
      ["1, 2 and 3", "Statement 3 is false: CCl₄ does not burn."],
      ["2 and 3 only", "Statement 3 is false and statement 1 is true."],
      ["1 only", "Statement 2 is also true: it is an ozone-depleting substance."],
    ],
    answer: "A",
    hints: ["It was once used to put out fires."],
    explanation: "Toxicity and ozone depletion led to strict controls; non-flammability was why it was once popular.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "An element in Group IV is a shiny grey solid that melts at 937 °C. Its electrical conductivity is low at room temperature and increases when it is warmed. Which element is it, and why?",
    options: [
      ["germanium; a metalloid semiconductor with a giant covalent structure", "Correct: lower melting point than silicon, semiconductor behaviour."],
      ["tin; a metal whose conductivity rises with temperature", "Tin melts at 232 °C and, like other metals, conducts less when warmer."],
      ["silicon; the melting point fits a giant covalent structure", "Silicon melts much higher, at about 1410 °C."],
      ["lead; metallic bonding gives a fairly high melting point", "Lead melts at 327 °C and is a good conductor."],
    ],
    answer: "A",
    hints: ["Semiconductor behaviour rules out the metals."],
    explanation: "A semiconductor with a melting point below silicon's: germanium.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What is the main compound in sand used to make glass?",
    options: [
      [t`$\ce{SiO2}$`, "Correct: silicon dioxide (silica)."],
      [t`$\ce{SiC}$`, "Silicon carbide is an abrasive made from sand and carbon."],
      [t`$\ce{CaCO3}$`, "Limestone is added to glass mixtures, but sand is mainly silica."],
      [t`$\ce{SnO2}$`, "Tin(IV) oxide is the main tin ore."],
    ],
    answer: "A",
    explanation: "Glass is made by melting sand (SiO₂) with other oxides (such as from sodium carbonate and limestone) and cooling.",
  });
  {
    const n = 15 / Mr("SiO2");
    const m = n * AR.Si;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "Silicon is made by heating silicon dioxide with carbon: SiO₂ + 2C → Si + 2CO. Calculate the maximum mass of silicon, in g, obtainable from 15.0 g of SiO₂, to three significant figures. (Mr SiO₂ 60.1; Ar Si 28.1)",
      value: m, sf: 3, unit: "g",
      wrong: [sfStr(n * 2 * AR.Si, 3)],
      hints: ["One SiO₂ gives one Si."],
      explanation: `1. Mr(SiO₂) = ${Mr("SiO2")}; n = 15.0 ÷ ${Mr("SiO2")} = ${sfStr(n, 3)} mol.\n2. n(Si) = ${sfStr(n, 3)} mol.\n3. Mass = ${sfStr(n, 3)} × 28.1 = ${sfStr(m, 3)} g. Using the 2 from 2C wrongly gives ${sfStr(n * 2 * AR.Si, 3)} g.`,
    });
  }
  {
    const n = 3 / Mr("SiO2");
    const v = n * 2 * VM_RTP;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "Calculate the volume of carbon monoxide, in dm³ at room conditions, formed when 3.00 g of silicon dioxide is reduced by carbon (SiO₂ + 2C → Si + 2CO), to three significant figures. (Mr SiO₂ = 60.1; molar gas volume 24.0 dm³ mol⁻¹)",
      value: v, sf: 3, unit: "dm³",
      wrong: [sfStr(v / 2, 3)],
      hints: ["Two moles of CO form per mole of SiO₂."],
      explanation: `1. n(SiO₂) = 3.00 ÷ 60.1 = ${sfStr(n, 3)} mol.\n2. n(CO) = 2 × ${sfStr(n, 3)} = ${sfStr(2 * n, 3)} mol.\n3. V = ${sfStr(2 * n, 3)} × 24.0 = ${sfStr(v, 3)} dm³. A 1 : 1 ratio gives ${sfStr(v / 2, 3)} dm³.`,
    });
  }
  {
    const bonds = chk((6 / 12) * 2, 1);
    b.num({
      d: 3, skill: "ANALYSIS", calculator: true,
      stem: "In diamond each carbon atom forms four C–C bonds, and each bond is shared between two atoms. How many moles of C–C bonds are there in 6.00 g of diamond? (Ar C 12.0)",
      value: bonds, sf: 3, unit: "mol",
      wrong: [2, 0.5],
      hints: ["Count bonds per atom, then halve because each bond joins two atoms."],
      explanation: "n(C) = 6.00 ÷ 12.0 = 0.500 mol. Each atom has 4 bonds, each shared by 2 atoms, so 2 bonds per atom: 0.500 × 2 = 1.00 mol of C–C bonds. Not halving gives 2.00 mol.",
    });
  }
  {
    const nPb = 2.07 / AR.Pb;
    const m = nPb * Mr("PbSO4");
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "In a discharging lead-acid battery, lead at the negative electrode is converted to lead(II) sulfate. Calculate the mass of PbSO₄, in g, formed when 2.07 g of lead reacts, to three significant figures. (Ar: O 16.0, S 32.1, Pb 207.2)",
      value: m, sf: 3, unit: "g",
      wrong: [sfStr(nPb * 2 * Mr("PbSO4"), 3)],
      hints: ["One Pb atom becomes one PbSO₄ at this electrode."],
      explanation: `1. n(Pb) = 2.07 ÷ 207.2 = ${sfStr(nPb, 3)} mol.\n2. Pb → PbSO₄ (1 : 1), Mr(PbSO₄) = ${Mr("PbSO4")}.\n3. Mass = ${sfStr(nPb, 3)} × ${Mr("PbSO4")} = ${sfStr(m, 3)} g. Doubling (counting the PbO₂ electrode as well) gives ${sfStr(nPb * 2 * Mr("PbSO4"), 3)} g, which is not what was asked.`,
    });
  }
  {
    const ratio = (60 / AR.Sn) / (40 / AR.Pb);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "A solder is 60% tin and 40% lead by mass. Calculate the ratio of tin atoms to lead atoms in the solder, to three significant figures. (Ar: Sn 118.7, Pb 207.2)",
      value: ratio, sf: 3,
      wrong: [sfStr(60 / 40, 3)],
      hints: ["Convert each mass to moles first."],
      explanation: `In 100 g: n(Sn) = 60 ÷ 118.7 = ${sfStr(60 / AR.Sn, 3)} mol; n(Pb) = 40 ÷ 207.2 = ${sfStr(40 / AR.Pb, 3)} mol; ratio = ${sfStr(ratio, 3)}. The mass ratio 1.50 is not the atom ratio.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The electrical conductivity of silicon increases when it is warmed.",
    answer: true,
    explanation: "True. Silicon is a semiconductor: warming gives more electrons enough energy to break free from bonds and carry charge.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each substance with a use.",
    pairs: [
      ["diamond", "drill bits for mining"],
      ["graphite", "electrodes in electrolysis"],
      ["tin", "coating steel food cans"],
      ["lead", "electrodes in car batteries"],
      ["silicon", "microchips and solar cells"],
    ],
    explanation: "Hardness, conductivity, corrosion resistance, the lead-acid cell and semiconductor behaviour respectively.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the description of Group IV.",
    template: "Down Group IV the elements change from non-metal to metal. Carbon is a {{blank:a}}, silicon and germanium are {{blank:b}}, and tin and lead are {{blank:c}}. Silicon and germanium are used in electronics because they are {{blank:d}}.",
    blanks: [
      { id: "a", accepted: ["non-metal"], choices: ["non-metal", "metalloid", "metal"] },
      { id: "b", accepted: ["metalloids"], choices: ["non-metals", "metalloids", "metals"] },
      { id: "c", accepted: ["metals"], choices: ["non-metals", "metalloids", "metals"] },
      { id: "d", accepted: ["semiconductors"], choices: ["semiconductors", "insulators", "superconductors"] },
    ],
    explanation: "Metallic character increases down the group.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the metal that is alloyed with copper to make bronze.",
    accepted: ["tin", "Sn"],
    wrong: ["zinc"],
    explanation: "Bronze is copper and tin; brass is copper and zinc.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why graphite is soft and can be used as a lubricant, whereas diamond is very hard.",
    points: [
      "Graphite: each C bonded to three others in flat layers",
      "Weak forces between layers, so the layers slide over each other",
      "Diamond: each C bonded to four others in a rigid 3D tetrahedral network of strong covalent bonds",
    ],
    modelAnswer: "In graphite each carbon atom forms three strong covalent bonds within a flat hexagonal layer, but the layers are held together only by weak forces, so they slide easily and graphite is soft and slippery. In diamond each carbon atom forms four strong covalent bonds in a rigid three-dimensional network, so it is extremely hard.",
    hints: ["Compare the number of bonds per atom and how the structure is arranged in space."],
    explanation: "Layers versus a 3D network.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Dental amalgam (\"tooth filler\") is an alloy of mercury with silver, tin and copper. Suggest two properties that make it suitable for filling teeth.",
    points: [
      "Soft and easily shaped when first mixed, so it can be packed into the cavity",
      "Hardens and is strong and resistant to wear / does not corrode in the mouth",
    ],
    modelAnswer: "When freshly mixed it is soft enough to be pressed into the cavity, and it then sets to a hard, strong solid that resists wear and corrosion in the mouth.",
    hints: ["Think about the filling process and life in the mouth."],
    explanation: "Uses are linked to properties.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain the trend in electrical conductivity from diamond to lead.",
    points: [
      "Diamond: all outer electrons in localised covalent bonds, no mobile electrons, insulator",
      "Si and Ge: covalent bonds weaker, a few electrons can break free (more when warmed), semiconductors",
      "Sn and Pb: metallic bonding, delocalised electrons, good conductors",
      "The change follows the increase in metallic character as atoms get larger and outer electrons are held less tightly",
    ],
    modelAnswer: "In diamond every outer electron is held in a localised C–C bond, so there are no mobile charge carriers and it does not conduct. In silicon and germanium the covalent bonds are weaker, so a few electrons can escape and carry charge, and more do so when warmed: they are semiconductors. Tin and lead are metals with delocalised electrons and conduct well. Conductivity increases down the group because the atoms get larger and hold their outer electrons less tightly, increasing metallic character.",
    hints: ["Identify the structure of each and whether there are mobile electrons."],
    explanation: "Insulator → semiconductors → metals.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true,
    stem: "The table gives information about four Group IV elements, **P**, **Q**, **R** and **S** (not in order of the Periodic Table).\n\n| Element | melting point / K | appearance | conductivity of the solid |\n|---|---|---|---|\n| **P** | 505 | silvery, malleable | good |\n| **Q** | 1683 | shiny grey, brittle | low; rises on heating |\n| **R** | 600 | dull grey, soft, very dense | good |\n| **S** | above 3800 | transparent, very hard | none |",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Identify element **S**.", accepted: ["diamond", "carbon", "carbon (diamond)", "C"], wrong: ["graphite"], explanation: "Transparent, very hard, non-conducting: diamond (carbon)." }),
      P.short({ label: "(b)", marks: 1, stem: "Identify element **Q**.", accepted: ["silicon", "Si"], wrong: ["germanium"], explanation: "Semiconductor melting at 1683 K (1410 °C): silicon." }),
      P.mcq({ label: "(c)", stem: "Which pair identifies **P** and **R**?", options: [
        ["**P** tin, **R** lead", "Correct: tin melts at 505 K; lead is soft, dense and melts at 600 K."],
        ["**P** lead, **R** tin", "Reversed: lead is the denser, softer metal."],
        ["**P** germanium, **R** tin", "Germanium is a brittle semiconductor."],
        ["**P** tin, **R** germanium", "Germanium melts at 937 °C and is a semiconductor."],
      ], answer: "A", explanation: "Both metals; lead is the dense, soft one." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why **S** has a much higher melting point than **P**.", points: ["S (diamond) is giant covalent: many strong C–C covalent bonds must be broken", "P (tin) is metallic: the metallic bonding between large ions and delocalised electrons is much weaker"], modelAnswer: "Diamond has a giant covalent structure, so melting requires many strong covalent bonds to be broken. Tin is metallic; the attraction between its large ions and the delocalised electrons is much weaker." }),
      P.manual({ label: "(e)", marks: 2, stem: "Give one use of **Q** and one use of **R**, each linked to a property.", points: ["Q (silicon): microchips/solar cells, because it is a semiconductor", "R (lead): batteries (Pb/PbO₂ electrodes) or radiation shielding, because it is very dense / forms PbSO₄ reversibly"], modelAnswer: "Silicon is used in microchips and solar cells because it is a semiconductor. Lead is used for shielding against X-rays because it is very dense (or in lead-acid batteries)." }),
      P.tf({ label: "(f)", stem: "The conductivity of **P** increases when it is warmed.", answer: false, explanation: "False: tin is a metal, and metallic conductivity falls slightly on warming." }),
    ],
    hints: ["Use melting point for the type of structure and conductivity for metal or not."],
    explanation: "S diamond, Q silicon, P tin, R lead.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: "Silicon for solar panels is made from quartz sand. In one step, silicon dioxide is heated with coke in an electric furnace at a very high temperature: SiO₂ + 2C → Si + 2CO. (Ar: C 12.0, O 16.0, Si 28.1)",
    parts: (() => {
      const nSi = 56.2 / AR.Si;
      const mSiO2 = nSi * Mr("SiO2");
      const mC = nSi * 2 * AR.C;
      const actual = 48.3;
      const yld = (actual / 56.2) * 100;
      return [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the mass of SiO₂, in g, needed to make 56.2 g of silicon, assuming complete reaction, to three significant figures.", value: mSiO2, sf: 3, unit: "g", wrong: [sfStr(56.2, 3)], explanation: `n(Si) = 56.2 ÷ 28.1 = ${sfStr(nSi, 3)} mol; mass SiO₂ = ${sfStr(nSi, 3)} × 60.1 = ${sfStr(mSiO2, 3)} g.` }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate the mass of carbon, in g, needed.", value: mC, sf: 3, unit: "g", wrong: [sfStr(mC / 2, 3)], explanation: `n(C) = 2 × ${sfStr(nSi, 3)} = ${sfStr(2 * nSi, 3)} mol; × 12.0 = ${sfStr(mC, 3)} g.` }),
        P.num({ label: "(c)", marks: 1, stem: "A run gave 48.3 g of silicon instead of 56.2 g. Calculate the percentage yield, to three significant figures.", value: yld, sf: 3, unit: "%", explanation: `48.3 ÷ 56.2 × 100 = ${sfStr(yld, 3)}%.` }),
        P.manual({ label: "(d)", marks: 2, stem: "State the type of reaction undergone by SiO₂ and identify the reducing agent.", points: ["Reduction (redox): SiO₂ loses oxygen / Si goes from +4 to 0", "Carbon is the reducing agent (it is oxidised to CO)"], modelAnswer: "Silicon dioxide is reduced (Si changes from +4 to 0) and carbon, which is oxidised to carbon monoxide, is the reducing agent." }),
        P.manual({ label: "(e)", marks: 1, stem: "Suggest one hazard of this process and a precaution.", points: ["Carbon monoxide is toxic: the gas must be collected and burned or vented safely (or: very high temperature/electric hazard)"], modelAnswer: "Carbon monoxide is toxic, so the furnace gases must be extracted and burned to CO₂ rather than released into the workplace." }),
        P.manual({ label: "(f)", marks: 1, stem: "Explain why the silicon must be purified further before use in solar cells.", points: ["The semiconductor properties depend on extremely high purity / impurities change the conductivity uncontrollably"], modelAnswer: "Semiconductor behaviour depends on very high purity; even small amounts of impurity change the conductivity, so only controlled 'doping' is allowed." }),
      ];
    })(),
    hints: ["Use the 1 : 1 ratio of SiO₂ to Si and 2 : 1 for C to Si.", "Carbon removes oxygen from SiO₂."],
    explanation: "Reacting masses, yield, and the redox nature of SiO₂ + 2C → Si + 2CO.",
  });
  b.card("FACT", "Character down Group IV", "C non-metal; Si, Ge metalloids (semiconductors); Sn, Pb metals.");
  b.card("CONCEPT", "Melting points in Group IV", "C, Si, Ge giant covalent: high, falling as bonds weaken; Sn, Pb metallic: much lower.");
  b.card("CONCEPT", "Conductivity: diamond vs graphite", "Diamond: no mobile electrons, insulator. Graphite: one delocalised electron per C, conducts along layers.");
  b.card("DEFINITION", "Semiconductor", "Conductivity between metal and insulator that increases with temperature (Si, Ge).");
  b.card("FACT", "Uses of diamond and graphite", "Diamond: cutting tools, drill bits, jewellery (hard). Graphite: pencils, lubricant, electrodes (soft layers, conducts).");
  b.card("FACT", "Uses of silicon and silica", "Si: chips, solar cells (semiconductor). SiO₂: glass, ceramics (high melting point, hard).");
  b.card("FACT", "Uses of tin and lead", "Tin: plating food cans, bronze, solder, pewter. Lead: lead-acid batteries, radiation shielding.");
  b.card("FACT", "Tetrachloromethane, CCl₄", "Former solvent and fire-extinguisher fluid; now restricted: toxic and ozone-depleting.");
  b.card("FORMULA", "Making silicon from sand", "SiO₂ + 2C → Si + 2CO (electric furnace); then purified for electronics.");
});
