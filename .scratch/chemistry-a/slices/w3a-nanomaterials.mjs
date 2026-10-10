// W3a: achem.nano.nanomaterials (ZIMSEC only, Form 6; tagged to ZIMSEC automatically).
import { concept, P, t, chk, Mr, L, sfStr, dpStr, sciStr } from "../lib.mjs";

const M_C60 = chk(Mr("C60"), 720);

concept("achem.nano.nanomaterials", { file: "nano/nanomaterials", keyPrefix: "nano.nanomaterials" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What size range is usually described as the nanoscale?",
    options: [
      ["1 nm to 100 nm", "Correct: 1 × 10⁻⁹ m to 1 × 10⁻⁷ m."],
      ["1 µm to 100 µm", "That is the size of cells and fine dust, a thousand times larger."],
      ["0.01 nm to 0.1 nm", "That is smaller than a single atom."],
      ["1 mm to 100 mm", "That is everyday visible size."],
    ],
    answer: "A",
    explanation: "Nanoscale: about 1-100 nm, where 1 nm = 10⁻⁹ m.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why are nanoparticles of a metal often much better catalysts than the same mass of bulk metal?",
    options: [
      ["They have a much larger surface area to volume ratio.", "Correct: far more atoms are exposed at the surface for adsorption."],
      ["They contain a different element from the bulk metal.", "The element is the same; only the particle size differs."],
      ["They have a higher melting point than the bulk metal.", "Nanoparticles usually melt at lower temperatures."],
      ["They are always more dense than the bulk metal.", "Density is not the reason for catalytic activity."],
    ],
    answer: "A",
    explanation: "Catalysis happens at the surface; nanoparticles expose a large fraction of their atoms.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which nanomaterial is a single layer of carbon atoms arranged in hexagons?",
    options: [
      ["graphene", "Correct: one atom thick."],
      ["buckminsterfullerene", "C₆₀ is a closed cage of pentagons and hexagons."],
      ["diamond", "Diamond is a 3D tetrahedral network, not a single layer."],
      ["titanium dioxide", "TiO₂ is not made of carbon."],
    ],
    answer: "A",
    explanation: "Graphene is a single sheet of graphite; rolled up, it forms a nanotube.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Why do sunscreens containing titanium dioxide nanoparticles look transparent on the skin?",
    options: [
      ["The particles are too small to scatter visible light.", "Correct: but they still absorb ultraviolet."],
      ["Titanium dioxide dissolves in the skin's oils.", "TiO₂ is insoluble; it stays as particles."],
      ["The particles absorb all visible light.", "Absorbing all visible light would make them look black."],
      ["Nanoparticles do not interact with any light.", "They absorb UV, which is why they protect the skin."],
    ],
    answer: "A",
    hints: ["Compare the particle size with the wavelength of visible light (400-700 nm)."],
    explanation: "Particles much smaller than the wavelength of visible light scatter little of it; UV is still absorbed.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements about carbon nanotubes are correct?\n\n1. They can be described as rolled-up sheets of graphene.\n2. They conduct electricity along the tube.\n3. They are weak and break easily when pulled.",
    options: [
      ["1 and 2 only", "Correct: nanotubes have very high tensile strength."],
      ["1, 2 and 3", "Statement 3 is false: they are exceptionally strong in tension."],
      ["2 and 3 only", "Statement 1 is true and statement 3 is false."],
      ["1 only", "Statement 2 is also true: delocalised electrons carry charge."],
    ],
    answer: "A",
    hints: ["Think of the strong C-C covalent bonds along the tube."],
    explanation: "Strong covalent bonds give great tensile strength; delocalised electrons give conductivity.",
  });
  b.mcq({
    d: 3, skill: "RECALL",
    stem: "Why are silver nanoparticles used in some wound dressings?",
    options: [
      ["They release silver ions that kill bacteria.", "Correct: Ag⁺ is antibacterial."],
      ["They absorb ultraviolet light.", "That is the role of TiO₂ in sunscreens."],
      ["They conduct electricity to the wound.", "Conductivity is not the purpose."],
      ["They catalyse the clotting of blood.", "Clotting is a biological process not caused by silver."],
    ],
    answer: "A",
    hints: ["Which property of silver has long been used against infection?"],
    explanation: "The large surface area of the nanoparticles releases Ag⁺ ions steadily.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statements are valid concerns about the widespread use of nanoparticles?\n\n1. Some can pass through cell membranes.\n2. Their long-term effects on health are not fully known.\n3. A substance known to be safe in bulk is certain to be safe as nanoparticles.",
    options: [
      ["1 and 2 only", "Correct: statement 3 is false, which is why separate testing is argued for."],
      ["1, 2 and 3", "Statement 3 is not a concern and is not true: nanoscale properties may differ."],
      ["2 and 3 only", "Statement 1 is a valid concern and statement 3 is false."],
      ["1 only", "Statement 2 is also a valid concern."],
    ],
    answer: "A",
    hints: ["Do bulk safety data automatically apply at the nanoscale?"],
    explanation: "Size-dependent properties mean nanomaterials may need their own safety testing.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A cube of edge 50 nm is broken into cubes of edge 5 nm. By what factor does the total surface area increase?",
    options: [
      ["10", "Correct: SA : V = 6/l, so a tenfold smaller edge gives ten times the area for the same volume."],
      ["100", "That would be the factor for the area of one face, not the total area."],
      ["1000", "That is the number of small cubes formed, not the increase in area."],
      ["1", "Breaking a solid into pieces always creates new surface."],
    ],
    answer: "A",
    hints: ["Total volume is unchanged; use SA = (6/l) × V."],
    explanation: "With V fixed, total area ∝ 1/l: 50 nm → 5 nm multiplies the area by 10 (1000 cubes, each with 1/100 of the original area).",
  });
  {
    const r = 6 / 20e-9;
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, daily: true,
      stem: "Calculate the surface area to volume ratio, in m⁻¹, of a cube-shaped nanoparticle with an edge of 20.0 nm (1 nm = 1.00 × 10⁻⁹ m). Give your answer in standard form to three significant figures.",
      value: r, sf: 3,
      wrong: [sciStr(6 / 20, 3)],
      explanation: `1. SA : V = 6l² ÷ l³ = 6/l.\n2. l = 20.0 × 10⁻⁹ m = 2.00 × 10⁻⁸ m.\n3. 6 ÷ 2.00 × 10⁻⁸ = ${sciStr(r, 3)} m⁻¹. Forgetting to convert nm to m gives ${sciStr(6 / 20, 3)}.`,
    });
  }
  {
    const n = (1e-2 / 2e-8) ** 3;
    const area = n * 6 * (2e-8) ** 2;
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: "A 1.00 cm cube of a metal oxide is divided into cubes of edge 20.0 nm. Calculate the total surface area of the nanocubes, in m², to three significant figures.",
      value: area, sf: 3,
      wrong: [sfStr(6e-4, 3), sfStr(area / 100, 3)],
      hints: ["Find the number of nanocubes first: (edge ratio)³."],
      explanation: `1. Edge ratio = 1.00 × 10⁻² m ÷ 2.00 × 10⁻⁸ m = 5.00 × 10⁵; number of cubes = (5.00 × 10⁵)³ = ${sciStr(n, 3)}.\n2. Area of one cube = 6 × (2.00 × 10⁻⁸)² = 2.40 × 10⁻¹⁵ m².\n3. Total = ${sciStr(n, 3)} × 2.40 × 10⁻¹⁵ = ${sfStr(area, 3)} m² (the original cube had only 6.00 × 10⁻⁴ m²).`,
    });
  }
  {
    const V = (4 / 3) * Math.PI * (8e-7) ** 3;
    const atoms = ((V * 10.5) / 107.9) * L;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: "A spherical silver nanoparticle has a diameter of 16.0 nm. Calculate the number of silver atoms in it, to three significant figures. (Density of silver 10.5 g cm⁻³; Ar Ag = 107.9; L = 6.022 × 10²³ mol⁻¹; 1 nm = 1.00 × 10⁻⁷ cm; volume of a sphere = 4/3 πr³)",
      value: atoms, sf: 3,
      wrong: [sciStr(atoms * 8, 3)],
      hints: ["Use the radius (8.00 nm), in cm."],
      explanation: `1. r = 8.00 nm = 8.00 × 10⁻⁷ cm; V = 4/3 π r³ = ${sciStr(V, 3)} cm³.\n2. Mass = ${sciStr(V, 3)} × 10.5 = ${sciStr(V * 10.5, 3)} g.\n3. Atoms = ${sciStr(V * 10.5, 3)} ÷ 107.9 × 6.022 × 10²³ = ${sciStr(atoms, 3)}. Using the diameter as the radius gives ${sciStr(atoms * 8, 3)}.`,
    });
  }
  {
    const n = 1e-3 / M_C60;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "Calculate the number of C₆₀ molecules in 1.00 mg of buckminsterfullerene, to three significant figures. (Ar C = 12.0; L = 6.022 × 10²³ mol⁻¹)",
      value: n * L, sf: 3,
      wrong: [sciStr((1e-3 / 12) * L, 3), sciStr((1 / M_C60) * L, 3)],
      hints: ["Mr(C₆₀) = 60 × 12.0; convert mg to g."],
      explanation: `1. Mr = 60 × 12.0 = ${M_C60}.\n2. n = 1.00 × 10⁻³ g ÷ ${M_C60} = ${sciStr(n, 3)} mol.\n3. Molecules = ${sciStr(n, 3)} × 6.022 × 10²³ = ${sciStr(n * L, 3)}. Using Ar(C) gives the number of atoms, ${sciStr((1e-3 / 12) * L, 3)}; forgetting mg → g gives ${sciStr((1 / M_C60) * L, 3)}.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Gold nanoparticles can look red or purple in water even though bulk gold is yellow.",
    answer: true,
    explanation: "True. Optical properties become size-dependent at the nanoscale.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each nanomaterial with an application.",
    pairs: [
      ["silver nanoparticles", "antibacterial wound dressings"],
      ["titanium dioxide nanoparticles", "transparent sunscreens"],
      ["carbon nanotubes", "strong, light composite materials"],
      ["fullerene cages", "carrying drug molecules (drug delivery research)"],
    ],
    extraRight: ["fuel for nuclear reactors"],
    explanation: "Nuclear fuel is uranium, not a nanomaterial application here.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Complete the sentences about the surface area to volume ratio.",
    template: "For a cube of edge l, SA : V = {{blank:a}}. When the edge is made 10 times smaller, the ratio becomes {{blank:b}} times larger. So a larger fraction of the atoms are at the {{blank:c}}, which makes nanoparticles more {{blank:d}}.",
    blanks: [
      { id: "a", accepted: ["6/l"], choices: ["6/l", "6l", "l/6", "6l²"] },
      { id: "b", accepted: ["10"], choices: ["10", "100", "1000"] },
      { id: "c", accepted: ["surface"], choices: ["surface", "centre", "nucleus"] },
      { id: "d", accepted: ["reactive"], choices: ["reactive", "dense", "stable"] },
    ],
    hints: ["Divide 6l² by l³."],
    explanation: "SA : V = 6/l, so it is inversely proportional to edge length.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the molecular formula of buckminsterfullerene.",
    accepted: ["C60", "C₆₀"],
    normalise: ["trim", "lowercase", "remove_whitespace"],
    wrong: ["C70"],
    explanation: "C₆₀: 12 pentagons and 20 hexagons.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why the properties of a substance can change when it is made into nanoparticles.",
    points: [
      "Nanoparticles have a very large surface area to volume ratio (SA : V = 6/l)",
      "A large fraction of the atoms are at the surface, with fewer neighbours, so they are more reactive (better catalysts and adsorbents, lower melting point)",
      "At this size optical and electrical properties become size-dependent (for example the colour of gold nanoparticles, or transparency of TiO₂)",
    ],
    modelAnswer: "Because the particles are so small, their surface area to volume ratio is enormous, so a large fraction of the atoms are at the surface. Surface atoms have fewer neighbours and are more reactive, so nanoparticles are better catalysts and adsorbents and melt at lower temperatures. At this scale properties such as colour also depend on size: gold nanoparticles look red, and TiO₂ nanoparticles are transparent.",
    hints: ["Start with the surface area to volume ratio."],
    explanation: "Size-dependent properties.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Discuss the benefits and risks of using silver nanoparticles in water filters for rural communities.",
    points: [
      "Benefit: silver nanoparticles release Ag⁺ that kills bacteria, giving safer drinking water and fewer water-borne diseases",
      "Benefit: a large surface area means a small mass of silver works for a long time, and filters need no electricity",
      "Risk: nanoparticles or Ag⁺ may leach into the water or the environment, with possible toxicity and unknown long-term effects",
      "Risk: silver released may harm useful bacteria (e.g. in soil or sewage treatment); filters need testing, monitoring and regulation",
    ],
    modelAnswer: "Silver nanoparticles in a filter release silver ions that kill bacteria, so the water is safer and cases of diarrhoeal disease could fall; because of the huge surface area, a small mass of silver lasts a long time and no electricity is needed. However, some silver or nanoparticles may leach into the drinking water or the environment, where they could harm people or useful bacteria, and long-term effects are not fully known. The filters should therefore be tested, monitored and regulated.",
    hints: ["Give at least two points on each side."],
    explanation: "Balanced discussion.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe the structures of C₆₀ and a carbon nanotube and explain why a nanotube conducts electricity.",
    points: [
      "C₆₀: a hollow, closed cage (ball) of 60 carbon atoms in 12 pentagons and 20 hexagons, each C bonded to three others",
      "Nanotube: a sheet of graphene (hexagons of carbon) rolled into a cylinder about 1 nm in diameter",
      "Each carbon uses three electrons in bonding; the fourth is delocalised along the tube and carries charge",
    ],
    modelAnswer: "Buckminsterfullerene, C₆₀, is a hollow cage of 60 carbon atoms arranged in 12 pentagons and 20 hexagons, each carbon bonded to three others. A carbon nanotube is a graphene sheet of hexagonal rings rolled into a cylinder about 1 nm across. In both, each carbon forms three covalent bonds and its fourth electron is delocalised; in the long nanotube these electrons move along the tube, so it conducts electricity.",
    hints: ["Compare with graphite."],
    explanation: "Carbon nanostructures.",
  });
  {
    const r1 = 6 / 1e-2;
    const r2 = 6 / 25e-9;
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: "Rudo compared the rate of decomposition of hydrogen peroxide catalysed by the same mass (0.10 g) of manganese(IV) oxide in two forms, at the same temperature and concentration. Eye protection was worn.\n\n| catalyst form | approximate particle size | volume of oxygen after 60 s / cm³ |\n|---|---|---|\n| coarse granules | 1 cm | 4 |\n| nanopowder | 25 nm | 58 |",
      parts: [
        P.num({ label: "(a)", stem: "Calculate the SA : V ratio, in m⁻¹, of a cube of edge 1 cm (1.00 × 10⁻² m).", value: r1, sf: 3, explanation: `6 ÷ 1.00 × 10⁻² = ${sfStr(r1, 3)} m⁻¹.` }),
        P.num({ label: "(b)", stem: "Calculate the SA : V ratio, in m⁻¹, of a cube of edge 25.0 nm.", value: r2, sf: 3, wrong: [sciStr(6 / 25, 3)], explanation: `6 ÷ 2.50 × 10⁻⁸ = ${sciStr(r2, 3)} m⁻¹.` }),
        P.num({ label: "(c)", stem: "By what factor is the SA : V ratio of the nanopowder larger?", value: r2 / r1, sf: 3, explanation: `${sciStr(r2, 3)} ÷ ${sfStr(r1, 3)} = ${sciStr(r2 / r1, 3)}.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain the difference in the volumes of oxygen.", points: ["The nanopowder has a far larger surface area for the same mass", "More active sites for H₂O₂ to adsorb on, so more frequent successful reactions and a faster rate"], modelAnswer: "For the same mass, the nanopowder exposes an enormously larger surface area, so many more active sites are available where hydrogen peroxide can adsorb and decompose; the rate, and so the volume of oxygen collected in 60 s, is much greater." }),
        P.manual({ label: "(e)", marks: 2, stem: "Suggest two precautions needed when handling the dry nanopowder.", points: ["Avoid breathing the powder: use a fume cupboard / mask, because nanoparticles can penetrate deep into the lungs", "Avoid skin contact and spreading dust: gloves, handle as a slurry or in closed containers, careful disposal"], modelAnswer: "Weigh and transfer the nanopowder in a fume cupboard or wear a suitable mask so that it is not inhaled, and wear gloves; keep it in a closed container and dispose of it as instructed rather than washing it down the sink." }),
        P.tf({ label: "(f)", stem: "The total volume of oxygen finally collected (when all the H₂O₂ has decomposed) would be the same with both forms of catalyst.", answer: true, explanation: "True: a catalyst changes the rate, not the amount of product, when the same amount of H₂O₂ is used." }),
      ],
      hints: ["SA : V = 6/l; convert nm to m."],
      explanation: `SA : V rises from ${sfStr(r1, 3)} to ${sciStr(r2, 3)} m⁻¹ (×${sciStr(r2 / r1, 3)}), so the nanopowder catalyses much faster.`,
    });
  }
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true,
    stem: "A town's borehole water contains bacteria and traces of lead(II) ions. A filter is proposed that contains a nanoscale iron oxide adsorbent and silver nanoparticles.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Explain why a nanoscale adsorbent removes lead ions better than the same mass of coarse iron oxide.", points: ["Much larger surface area (SA : V ratio) for the same mass", "More adsorption sites for Pb²⁺ ions, so more is removed (faster)"], modelAnswer: "The nanoscale adsorbent has a vastly larger surface area for the same mass, so it offers far more sites where lead ions can be adsorbed, removing more lead more quickly." }),
      P.mcq({ label: "(b)", stem: "What is the role of the silver nanoparticles?", options: [
        ["to kill bacteria", "Correct: Ag⁺ ions released are antibacterial."],
        ["to remove lead ions", "The iron oxide adsorbent does this."],
        ["to soften the water", "Ion exchange softens water."],
        ["to add fluoride", "Silver does not supply fluoride."],
      ], answer: "A", explanation: "Silver is antibacterial." }),
      P.manual({ label: "(c)", marks: 2, stem: "State two pieces of information the town council should ask for before approving the filter.", points: ["Evidence that silver or nanoparticles do not leach into the drinking water above safe limits (test results)", "How the used filter is disposed of safely, the long-term environmental effects, or independent approval / regulation and monitoring"], modelAnswer: "Independent test results showing how much silver or nanoparticle material leaches into the treated water, and a plan for safe disposal of used filters and for monitoring long-term effects." }),
      P.tf({ label: "(d)", stem: "Silver nanoparticles are made of a different element from bulk silver.", answer: false, explanation: "False: same element, different particle size." }),
      P.short({ label: "(e)", stem: "Give the upper limit of the nanoscale, in nm.", accepted: ["100", "100 nm", "100nm"], wrong: ["1000"], explanation: "1-100 nm." }),
      P.mcq({ label: "(f)", stem: "Which carbon nanomaterial, one atom thick, is being developed for very thin filter membranes?", options: [
        ["graphene", "Correct: a single layer of carbon atoms."],
        ["buckminsterfullerene", "C₆₀ is a cage molecule, not a sheet."],
        ["diamond", "Diamond is a bulk 3D network."],
        ["charcoal", "Charcoal is porous carbon but not one atom thick."],
      ], answer: "A", explanation: "Graphene (and graphene oxide) membranes." }),
    ],
    hints: ["Link each property to surface area or to silver ions."],
    explanation: "Nanoscale adsorbents and silver nanoparticles: benefits with checks on safety.",
  });
  b.card("DEFINITION", "Nanoscale", "About 1 nm to 100 nm (1 nm = 1 × 10⁻⁹ m).");
  b.card("FORMULA", "Surface area to volume ratio of a cube", "SA : V = 6l² ÷ l³ = 6/l: smaller particles, larger ratio.");
  b.card("CONCEPT", "Why nanoparticles behave differently", "Huge SA : V and many surface atoms; size-dependent colour, melting point and reactivity.");
  b.card("FACT", "Buckminsterfullerene", "C₆₀: hollow cage of 12 pentagons and 20 hexagons; molecular; drug delivery research.");
  b.card("FACT", "Carbon nanotubes", "Rolled graphene cylinders about 1 nm wide: very strong, conduct electricity along the tube.");
  b.card("FACT", "Graphene", "Single layer of graphite: one atom thick, very strong, transparent, excellent conductor.");
  b.card("FACT", "Silver and TiO₂ nanoparticles", "Ag: releases Ag⁺, antibacterial (dressings, filters). TiO₂: absorbs UV, transparent (sunscreens), photocatalyst.");
  b.card("FACT", "Applications of nanomaterials", "Drug delivery, water purification, pollution remediation, catalysis, sunscreens, electronics.");
  b.card("CONCEPT", "Risks of nanomaterials", "May enter lungs and cells; long-term effects unknown; environmental release; need testing and regulation.");
});
