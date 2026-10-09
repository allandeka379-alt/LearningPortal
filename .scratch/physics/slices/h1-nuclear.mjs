import { concept, P, t } from "../lib.mjs";

const Z = ["zimsec"];
const C = ["cambridge"];
const REL2 = { kind: "relative", amount: 0.02 };
/** Nuclide LaTeX without delimiters, built outside template literals (where a dollar sign before a brace starts an interpolation). */
const N = (A, Z, X) => "{}^{" + A + "}_{" + Z + "}\\text{" + X + "}";

// =====================================================================================================================
concept("phys.nuclear.atomic-structure", {
  file: "nuclear/atomic-structure",
  keyPrefix: "nuclear.atom",
  objectives: { cambridge: ["5.1.1.1", "5.1.1.2", "5.1.1.3"], zimsec: ["15.1.1"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "Which statement describes the nuclear model of the atom?",
    options: [["A tiny positive nucleus with negative electrons orbiting it", "Correct."], ["A sphere of positive charge with electrons dotted through it", "That is the older plum pudding model."], ["A negatively charged nucleus with positive electrons around it", "The charges are the other way round."], ["A solid ball with no smaller parts inside it", "Atoms have a nucleus and electrons."]],
    answer: "A", explanation: "An atom has a tiny positive nucleus, with negative electrons orbiting it." });

  q.mcq({ d: 1, skill: "RECALL",
    stem: "How does an atom become a positive ion?",
    options: [["By losing one or more electrons", "Correct."], ["By gaining one or more electrons", "That makes a negative ion."], ["By gaining protons", "The nucleus does not change."], ["By losing neutrons", "Neutrons have no charge."]],
    answer: "A", explanation: "Losing negative electrons leaves the atom with more positive charge than negative: a positive ion." });

  q.tf({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "An atom that gains an electron becomes a negative ion.",
    answer: true, explanation: "An extra electron gives the atom an overall negative charge." });

  q.mcq({ d: 2, skill: "RECALL",
    stem: "Where is almost all the mass of an atom?",
    options: [["In the nucleus", "Correct."], ["In the electrons", "Electrons have very little mass."], ["Spread evenly through the atom", "No: it is concentrated."], ["In the empty space between the electrons", "Empty space has no mass."]],
    answer: "A", explanation: "The nucleus contains almost all of the atom's mass." });

  q.mcq({ d: 1, skill: "RECALL",
    stem: "Which particles orbit the nucleus of an atom?",
    options: [["Electrons", "Correct."], ["Protons", "Protons are in the nucleus."], ["Neutrons", "Neutrons are in the nucleus."], ["Alpha particles", "No."]],
    answer: "A", explanation: "Negatively charged electrons orbit the positive nucleus." });

  q.num({ d: 2, skill: "APPLICATION",
    stem: t`A large nucleus is about $1 \times 10^{-14}\ \text{m}$ across and its atom is about $1 \times 10^{-10}\ \text{m}$ across. How many times wider is the atom than the nucleus?`,
    value: 10000, wrong: [4, 0.0001],
    explanation: t`$\dfrac{1 \times 10^{-10}}{1 \times 10^{-14}} = 1 \times 10^{4} = 10\,000$ times.` });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: C,
    stem: "In the alpha-particle scattering experiment, most alpha particles passed straight through the gold foil. What does this show?",
    options: [["Atoms are mostly empty space.", "Correct."], ["The nucleus is negatively charged.", "No."], ["Alpha particles have no charge.", "They are positive."], ["Gold atoms are very large.", "Not the conclusion."]],
    answer: "A", explanation: "If most alpha particles meet nothing, the atom must be mostly empty space." });

  q.mcq({ d: 3, skill: "ANALYSIS", applies: C,
    stem: "In the alpha-particle scattering experiment, a very small number of alpha particles bounced back towards the source. What did this show?",
    options: [["The positive charge and most mass are in a tiny nucleus.", "Correct."], ["The electrons are very heavy and bounce particles back.", "Electrons are far too light to turn an alpha particle back."], ["The atom is mostly empty space with no centre.", "True, but that is shown by the particles passing straight through."], ["Alpha particles are negatively charged.", "They are positive."]],
    answer: "A", explanation: "Only a very concentrated, massive positive charge could repel an alpha particle strongly enough to reverse it.",
    hints: ["What could turn a fast, heavy, positive particle right round?"] });

  q.mcq({ d: 3, skill: "UNDERSTANDING", applies: C,
    stem: "In the scattering experiment, why were some alpha particles deflected through small angles?",
    options: [["They passed near a nucleus and were repelled by its charge.", "Correct."], ["They were attracted by the electrons they passed close to in the foil.", "Electrons have too little mass to deflect them noticeably."], ["They collided with neutrons inside the foil.", "The model at the time did not include neutrons; repulsion explains the deflection."], ["They were slowed down by the air in the apparatus.", "The experiment was in a vacuum."]],
    answer: "A", explanation: "Alpha particles are positive, so they are repelled when they pass near the positive nucleus.",
    hints: ["Like charges repel."] });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: C,
    stem: "Why was the alpha-particle scattering experiment carried out in a vacuum?",
    options: [["Alpha particles travel only a few centimetres in air.", "Correct."], ["To keep the thin gold foil cool", "The foil is not heated; air would stop the alpha particles."], ["To stop the thin gold foil reacting with oxygen in the air", "Gold does not react with air."], ["To give the alpha particles their charge", "They are always positive."]],
    answer: "A", explanation: "Air molecules would absorb and scatter the alpha particles, so the apparatus was evacuated." });

  q.match({ d: 3, skill: "ANALYSIS", applies: C,
    stem: "Match each observation from the alpha-particle scattering experiment with its conclusion.",
    pairs: [["Most alpha particles passed straight through", "The atom is mostly empty space"], ["A few were deflected through small angles", "There is a concentrated positive charge"], ["Very few bounced back", "The nucleus is tiny and contains most of the mass"]],
    explanation: "Straight through: empty space. Small deflections: positive charge. Bounced back: a tiny, massive nucleus.",
    hints: ["Think about what each behaviour needs."] });

  q.struct({ d: 3, skill: "ANALYSIS", applies: C, examStyle: true,
    stem: "Before 1909, many scientists believed in the plum pudding model of the atom. The alpha-particle scattering experiment showed it was wrong.",
    parts: [
      P.mcq({ label: "(a)", stem: "In the plum pudding model, how was the positive charge arranged?", options: [["Spread through the whole atom, with electrons dotted in it", "Correct."], ["Concentrated in a tiny nucleus at the centre", "That is the nuclear model."], ["There was no positive charge in the atom at all.", "The atom had positive charge to balance the electrons."], ["Carried by the electrons dotted around inside the sphere of the atom", "Electrons are negative."]], answer: "A",
        explanation: "The plum pudding model spread the positive charge through the atom." }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain why the plum pudding model cannot explain why some alpha particles bounced back.",
        points: ["Positive charge spread through the whole atom would exert only a weak force on a passing alpha particle, deflecting it slightly at most", "Only a tiny, concentrated, massive positive nucleus could repel an alpha particle strongly enough to turn it back"] }),
      P.mcq({ label: "(c)", stem: "What is the overall charge of a neutral atom?", options: [["Zero", "Correct: the positive and negative charges are equal."], ["Positive", "No."], ["Negative", "No."], ["It depends on the element.", "Every neutral atom has zero overall charge."]], answer: "A",
        explanation: "A neutral atom has as many electrons as protons." }),
    ],
    explanation: "A spread-out charge could not turn alpha particles back; a tiny, dense, positive nucleus can.",
    hints: ["Compare the force from a concentrated charge with that from a spread-out charge."] });

  q.card("DEFINITION", "The nuclear model of the atom?", "A tiny, positively charged nucleus with negatively charged electrons orbiting it.");
  q.card("FACT", "Where is the mass of an atom?", "Almost all of it is in the tiny nucleus (about 1/100 000 of the atom's width).");
  q.card("FACT", "How do ions form?", "Losing electrons makes a positive ion; gaining electrons makes a negative ion.");
  q.card("CONCEPT", "Alpha scattering: observations and conclusions?", "Most pass through: mostly empty space. Small deflections: positive charge. A few bounce back: tiny, dense, massive nucleus.", undefined, { applies: C });
  q.card("FACT", "What did the nuclear model replace?", "The plum pudding model, with positive charge spread through the atom.", undefined, { applies: C });
});

// =====================================================================================================================
concept("phys.nuclear.nucleus-isotopes", {
  file: "nuclear/nucleus-isotopes",
  keyPrefix: "nuclear.nucleus",
  objectives: { cambridge: ["5.1.2.1", "5.1.2.2", "5.1.2.3", "5.1.2.4", "5.1.2.5", "5.1.2.7", "5.1.2.8"], zimsec: ["15.1.1", "15.1.2"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "Which particles are found in the nucleus of an atom?",
    options: [["Protons and neutrons", "Correct."], ["Protons and electrons", "Electrons orbit outside the nucleus."], ["Neutrons and electrons", "No."], ["Electrons only", "No."]],
    answer: "A", explanation: "The nucleus contains protons and neutrons (nucleons)." });

  q.mcq({ d: 1, skill: "RECALL",
    stem: "What is the relative charge of a neutron?",
    options: [["0", "Correct."], ["+1", "That is the proton."], ["−1", "That is the electron."], ["+2", "That is an alpha particle."]],
    answer: "A", explanation: "Neutrons are uncharged; protons are +1 and electrons −1." });

  q.num({ d: 2, skill: "APPLICATION", daily: true,
    stem: t`How many neutrons are there in a nucleus of $${N(59, 27, "Co")}$?`,
    value: 32, wrong: [59, 86],
    explanation: t`Neutrons $= A - Z = 59 - 27 = 32$.` });

  q.num({ d: 2, skill: "APPLICATION",
    stem: "A sodium nucleus contains 11 protons and 12 neutrons. What is its nucleon number?",
    value: 23, wrong: [11, 1],
    explanation: "Nucleon number = protons + neutrons = 11 + 12 = 23." });

  q.mcq({ d: 1, skill: "RECALL",
    stem: "What is the proton number of an element?",
    options: [["The number of protons in the nucleus", "Correct."], ["The number of neutrons in the nucleus", "No."], ["The total number of protons and neutrons", "That is the nucleon number."], ["The number of electron shells", "No."]],
    answer: "A", explanation: "The proton number Z is the number of protons, which decides the element." });

  q.tf({ d: 2, skill: "RECALL", daily: true,
    stem: "Isotopes of an element have the same number of protons but different numbers of neutrons.",
    answer: true, explanation: "That is the definition of isotopes." });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "Which pair of nuclides are isotopes of the same element?",
    options: [[t`$${N(35, 17, "Cl")}$ and $${N(37, 17, "Cl")}$`, "Correct: same proton number, different nucleon numbers."], [t`$${N(14, 6, "C")}$ and $${N(14, 7, "N")}$`, "Different proton numbers: different elements."], [t`$${N(40, 18, "Ar")}$ and $${N(40, 20, "Ca")}$`, "Different proton numbers."], [t`$${N(16, 8, "O")}$ and $${N(32, 16, "S")}$`, "Different elements."]],
    answer: "A", explanation: "Isotopes have the same proton number (17 for chlorine) but different nucleon numbers." });

  q.num({ d: 3, skill: "APPLICATION",
    stem: "Iodine-131 has a proton number of 53. How many neutrons are in its nucleus?",
    value: 78, wrong: [184, 131],
    explanation: "Neutrons = A − Z = 131 − 53 = 78.",
    hints: ["The number in the name (131) is the nucleon number."] });

  q.mcq({ d: 3, skill: "UNDERSTANDING", applies: C,
    stem: t`What is the relative charge of a $${N(27, 13, "Al")}$ nucleus?`,
    options: [["+13", "Correct: equal to the proton number."], ["+27", "That is the nucleon number."], ["+14", "That is the number of neutrons."], ["0", "A nucleus is positive."]],
    answer: "A", explanation: "Only protons are charged, so the nucleus's relative charge equals its proton number: +13.",
    hints: ["Which particles in the nucleus are charged?"] });

  q.mcq({ d: 3, skill: "UNDERSTANDING", applies: C,
    stem: t`What is the approximate relative mass of a $${N(56, 26, "Fe")}$ nucleus?`,
    options: [["56", "Correct: equal to the nucleon number."], ["26", "That is the proton number."], ["30", "That is the number of neutrons."], ["82", "No."]],
    answer: "A", explanation: "Protons and neutrons each have a relative mass of about 1, so the relative mass is about A = 56.",
    hints: ["Which particles have a relative mass of about 1?"] });

  q.fib({ d: 2, skill: "RECALL",
    stem: "Complete the sentence about nuclide notation.",
    template: "In the symbol written with A at the top left and Z at the bottom left, A is the {{blank:a}} number and Z is the {{blank:b}} number.",
    blanks: [
      { id: "a", input: "select", choices: ["nucleon", "proton", "neutron"], accepted: ["nucleon"], wrong: "proton" },
      { id: "b", input: "select", choices: ["nucleon", "proton", "neutron"], accepted: ["proton"], wrong: "nucleon" },
    ],
    explanation: "A (top) is the nucleon number; Z (bottom) is the proton number." });

  q.match({ d: 2, skill: "RECALL",
    stem: "Match each particle with its relative charge.",
    pairs: [["Proton", "+1"], ["Neutron", "0"], ["Electron", "−1"]],
    explanation: "Proton +1, neutron 0, electron −1." });

  q.short({ d: 1, skill: "RECALL",
    stem: "What name is given to atoms of the same element that have different numbers of neutrons?",
    accepted: ["isotopes", "isotope"], wrong: ["ions"],
    explanation: "They are isotopes." });

  q.struct({ d: 3, skill: "APPLICATION", examStyle: true,
    stem: t`Two isotopes of potassium are $${N(39, 19, "K")}$ and $${N(40, 19, "K")}$. Potassium-40 is radioactive.`,
    parts: [
      P.num({ label: "(a)", stem: "How many neutrons are in a potassium-40 nucleus?", value: 21, wrong: [40],
        explanation: "40 − 19 = 21." }),
      P.num({ label: "(b)", stem: "How many more neutrons does potassium-40 have than potassium-39?", value: 1, wrong: [0],
        explanation: "Potassium-39 has 20 neutrons; potassium-40 has 21." }),
      P.mcq({ label: "(c)", stem: "Why do the two isotopes have the same chemical properties?", options: [["They have the same number of protons, so the same electrons.", "Correct."], ["They have exactly the same total mass in each nucleus.", "Their masses differ."], ["They have the same number of neutrons in the nucleus.", "They do not."], ["They are both radioactive, so they react the same way.", "Only potassium-40 is."]], answer: "A",
        explanation: "Chemical behaviour depends on the electrons, and both isotopes have 19 of them." }),
    ],
    explanation: "Isotopes share a proton number (and electron arrangement) but differ in neutrons.",
    hints: ["Neutrons = A − Z."] });

  q.card("FACT", "What is in the nucleus?", "Protons and neutrons (nucleons).");
  q.card("FACT", "Relative charges of proton, neutron, electron?", "+1, 0, −1.");
  q.card("DEFINITION", "**Proton number** and **nucleon number**?", "Z = number of protons. A = number of protons + neutrons.");
  q.card("FORMULA", "Number of neutrons?", "N = A − Z");
  q.card("DEFINITION", "What are **isotopes**?", "Atoms of the same element with the same number of protons but different numbers of neutrons.");
  q.card("CONCEPT", "Nuclide notation?", "Nucleon number A at the top left of the symbol, proton number Z at the bottom left.");
  q.card("FACT", "Relative charge and mass of a nucleus?", "Charge = +Z; mass ≈ A.", undefined, { applies: C });
});

// =====================================================================================================================
concept("phys.nuclear.fission-fusion", {
  file: "nuclear/fission-fusion",
  keyPrefix: "nuclear.fission",
  objectives: { cambridge: ["5.1.2.6"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL", applies: C,
    stem: "What is nuclear fission?",
    options: [["The splitting of a heavy nucleus into two smaller nuclei", "Correct."], ["The joining of two light nuclei into a heavier one", "That is fusion."], ["The emission of an alpha particle from a nucleus", "That is alpha decay."], ["The burning of uranium fuel in air to release heat", "Fission is a nuclear process, not burning."]],
    answer: "A", explanation: "In fission a heavy nucleus, such as uranium-235, splits into two smaller nuclei." });

  q.mcq({ d: 1, skill: "RECALL", applies: C,
    stem: "What is nuclear fusion?",
    options: [["The joining of two light nuclei to form a heavier one", "Correct."], ["The splitting of a heavy nucleus into two parts", "That is fission."], ["The emission of a beta particle from a nucleus", "That is beta decay."], ["The melting of a metal to join two pieces", "That is welding, not nuclear fusion."]],
    answer: "A", explanation: "Fusion joins light nuclei, such as hydrogen isotopes, into a heavier nucleus." });

  q.mcq({ d: 2, skill: "RECALL", applies: C, daily: true,
    stem: "Which process releases the energy of the Sun?",
    options: [["Fusion of hydrogen nuclei into helium", "Correct."], ["Fission of uranium nuclei", "That happens in nuclear power stations."], ["Burning of hydrogen gas", "The Sun does not burn chemically."], ["Radioactive decay of helium in the core", "No."]],
    answer: "A", explanation: "Stars like the Sun are powered by fusing hydrogen into helium." });

  q.mcq({ d: 2, skill: "RECALL", applies: C,
    stem: "In a nuclear reactor, what makes a uranium-235 nucleus undergo fission?",
    options: [["It absorbs a neutron.", "Correct."], ["It is heated strongly.", "Heat does not cause fission."], ["It is hit by an alpha particle.", "No."], ["It is placed in an electric field.", "No."]],
    answer: "A", explanation: "Absorbing a slow neutron makes a uranium-235 nucleus unstable, and it splits." });

  q.tf({ d: 2, skill: "UNDERSTANDING", applies: C,
    stem: "In both fission and fusion, the total mass of the products is slightly less than the total mass before the reaction.",
    answer: true, explanation: "The small loss of mass is released as energy." });

  q.mcq({ d: 3, skill: "UNDERSTANDING", applies: C,
    stem: "Why does fusion need an extremely high temperature?",
    options: [["Nuclei repel, so they must move very fast to get close enough.", "Correct."], ["The nuclei must be melted before they can join.", "Nuclei do not melt."], ["Heat splits the nuclei apart into smaller pieces.", "That would be the opposite of fusion."], ["The heat produces the fast neutrons that are needed to trigger fusion.", "Fusion is not triggered by neutrons; nuclei must overcome their repulsion."]],
    answer: "A", explanation: "Only at enormous temperatures (and pressures) do nuclei move fast enough to overcome their electrical repulsion.",
    hints: ["What force acts between two positive nuclei?"] });

  q.mcq({ d: 3, skill: "UNDERSTANDING", applies: C,
    stem: "What is a chain reaction in a nuclear reactor?",
    options: [["Neutrons released by one fission go on to cause further fissions.", "Correct."], ["Alpha particles from one decay cause further decays.", "No."], ["Electrons flow round the reactor in a chain.", "No."], ["The reactor heats water to make steam, which then drives a turbine and generator.", "That is how the energy is used, not the chain reaction."]],
    answer: "A", explanation: "Each fission releases two or three neutrons, which can split more nuclei; in a reactor this is controlled.",
    hints: ["What particles are released by each fission?"] });

  q.num({ d: 3, skill: "APPLICATION", applies: C,
    stem: t`Plutonium-239 can undergo fission: $${N(239, 94, "Pu")} + ${N(1, 0, "n")} \rightarrow ${N(134, 54, "Xe")} + ${N(103, 40, "Zr")} + x\,${N(1, 0, "n")}$. What is the value of $x$?`,
    value: 3, wrong: [2, 1],
    explanation: "Nucleon numbers: 239 + 1 = 240 = 134 + 103 + x, so x = 3. (Proton numbers: 94 = 54 + 40.)",
    hints: ["Balance the nucleon numbers (top numbers)."] });

  q.num({ d: 2, skill: "APPLICATION", applies: C,
    stem: t`In the fusion reaction $${N(2, 1, "H")} + ${N(2, 1, "H")} \rightarrow {}^{3}_{Z}\text{X} + ${N(1, 0, "n")}$, what is the proton number $Z$ of the product X?`,
    value: 2, wrong: [1, 3],
    explanation: "Proton numbers: 1 + 1 = Z + 0, so Z = 2: X is helium-3.",
    hints: ["Balance the proton numbers (bottom numbers)."] });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: C,
    stem: "Which of these nuclear reactions is fusion?",
    options: [[t`$${N(1, 1, "H")} + ${N(2, 1, "H")} \rightarrow ${N(3, 2, "He")}$`, "Correct: two light nuclei join."], [t`$${N(32, 15, "P")} \rightarrow ${N(32, 16, "S")} + ${N(0, -1, "e")}$`, "That is beta decay."], [t`$${N(241, 95, "Am")} \rightarrow ${N(237, 93, "Np")} + ${N(4, 2, "He")}$`, "That is alpha decay."], [t`$${N(1, 0, "n")} + ${N(233, 92, "U")} \rightarrow ${N(138, 54, "Xe")} + ${N(94, 38, "Sr")} + 2\,${N(1, 0, "n")}$`, "That is fission."]],
    answer: "A", explanation: "Fusion joins light nuclei; here hydrogen-1 and hydrogen-2 form helium-3." });

  q.mcq({ d: 3, skill: "UNDERSTANDING", applies: C,
    stem: "Where does the energy released in nuclear fission come from?",
    options: [["A small decrease in mass, which is converted into energy", "Correct."], ["Breaking chemical bonds in the uranium", "Fission is a nuclear change, not a chemical one."], ["Only the kinetic energy carried in by the slow incoming neutron", "The energy released is far larger than that."], ["Heat supplied by the reactor", "The reactor produces heat; it does not supply it."]],
    answer: "A", explanation: "The products have slightly less mass than the uranium nucleus and neutron; the lost mass is released as energy.",
    hints: ["Compare the mass before and after."] });

  q.match({ d: 2, skill: "RECALL", applies: C,
    stem: "Match each term with its description.",
    pairs: [["Fission", "A heavy nucleus splits into two smaller nuclei"], ["Fusion", "Light nuclei join to form a heavier nucleus"], ["Chain reaction", "Neutrons from one fission cause further fissions"]],
    explanation: "Fission splits; fusion joins; a chain reaction is a self-continuing series of fissions." });

  q.struct({ d: 3, skill: "UNDERSTANDING", applies: C, examStyle: true,
    stem: "The Sun releases energy by nuclear fusion in its core.",
    parts: [
      P.mcq({ label: "(a)", stem: "Which nuclei fuse in the core of a stable star like the Sun?", options: [["Hydrogen nuclei, forming helium", "Correct."], ["Helium nuclei, forming hydrogen", "It is the other way round."], ["Uranium nuclei", "Uranium undergoes fission, not fusion, on the Earth."], ["Carbon nuclei, forming hydrogen", "No."]], answer: "A",
        explanation: "Hydrogen fuses into helium." }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain why fusion releases energy.",
        points: ["The mass of the helium nucleus formed is slightly less than the mass of the nuclei that fused", "The lost mass is released as energy (kinetic energy of the products and radiation)"] }),
      P.mcq({ label: "(c)", stem: "Why does fusion happen naturally in the Sun's core but not at the Earth's surface?", options: [["Only the core has the huge temperature and pressure needed.", "Correct."], ["Hydrogen exists only in the Sun, not anywhere on or around the Earth.", "Hydrogen is common on the Earth."], ["The Earth's magnetic field prevents it here.", "The magnetic field does not stop fusion; the conditions are missing."], ["Fusion needs strong sunlight to get started.", "Fusion needs extreme temperature and pressure, not light."]], answer: "A",
        explanation: "Fusion needs nuclei to collide at enormous speeds, which requires the conditions in a star's core." }),
    ],
    explanation: "Hydrogen fuses into helium; the small mass loss is released as energy; extreme temperature and pressure are needed.",
    hints: ["Compare the masses before and after fusion."] });

  q.card("DEFINITION", "What is **nuclear fission**?", "The splitting of a heavy nucleus into two smaller nuclei, releasing neutrons and energy.", undefined, { applies: C });
  q.card("DEFINITION", "What is **nuclear fusion**?", "The joining of light nuclei to form a heavier nucleus, releasing energy.", undefined, { applies: C });
  q.card("CONCEPT", "What is a chain reaction?", "Neutrons released by fission cause further fissions; in a reactor it is controlled.", undefined, { applies: C });
  q.card("CONCEPT", "Where does the energy in fission and fusion come from?", "The products have slightly less mass; the lost mass is released as energy.", undefined, { applies: C });
  q.card("FACT", "Conditions needed for fusion?", "Extremely high temperature and pressure, as in the cores of stars.", undefined, { applies: C });
  q.card("FACT", "Balancing nuclear equations?", "The nucleon numbers (top) and proton numbers (bottom) each add up to the same total on both sides.", undefined, { applies: C });
});

// =====================================================================================================================
concept("phys.nuclear.detection", {
  file: "nuclear/detection",
  keyPrefix: "nuclear.detection",
  objectives: { cambridge: ["5.2.1.1", "5.2.1.2", "5.2.1.3", "5.2.1.4", "5.2.1.5"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "What is background radiation?",
    options: [["Ionising radiation that is always present in the environment", "Correct."], ["Ionising radiation from a nearby radioactive source in the laboratory only", "Background is present even with no source."], ["Radiation from mobile phones", "That is non-ionising microwave radiation."], ["Thermal radiation from the ground", "Background radiation means ionising radiation."]],
    answer: "A", explanation: "Background radiation is the low level of ionising radiation that is always around us." });

  q.mcq({ d: 2, skill: "RECALL",
    stem: "Which of these is a natural source of background radiation?",
    options: [["Radon gas from the ground", "Correct."], ["Signals from mobile phone masts", "Not ionising radiation."], ["Microwave ovens", "Not ionising radiation."], ["Radio broadcasts", "Not ionising radiation."]],
    answer: "A", explanation: "Radon gas, rocks and buildings, food and drink, and cosmic rays are the main sources." });

  q.mcq({ d: 3, skill: "RECALL", multiple: true,
    stem: "Select **all** the main sources of background radiation.",
    options: [["Radon gas", "Correct."], ["Rocks and buildings", "Correct."], ["Cosmic rays", "Correct."], ["Radio waves from transmitters", "Not ionising."], ["Light from lamps", "Not ionising."], ["Sound from machinery", "Sound is not ionising radiation."]],
    answer: ["A", "B", "C"], explanation: "Radon gas, rocks and buildings, and cosmic rays are all main sources (with food and drink).",
    hints: ["Only ionising radiation counts."] });

  q.mcq({ d: 1, skill: "RECALL",
    stem: "Which apparatus is used to measure ionising radiation?",
    options: [["A Geiger–Müller tube connected to a counter", "Correct."], ["A voltmeter connected across the source", "A voltmeter measures p.d., not radiation."], ["A sensitive thermometer near the source", "Radiation doses heat things far too little to measure this way."], ["A microphone with an amplifier and speaker", "The clicks you hear come from a counter, not a microphone."]],
    answer: "A", explanation: "Each ionising event in the GM tube gives a pulse that the counter records." });

  q.num({ d: 2, skill: "APPLICATION", daily: true,
    stem: "A detector records 2400 counts in 4.0 minutes. What is the count rate in counts per minute?",
    value: 600, unit: "counts/min", wrong: [9600, 10],
    explanation: "2400 ÷ 4.0 = 600 counts/min." });

  q.num({ d: 2, skill: "APPLICATION",
    stem: "A ratemeter reads 12 counts per second. What is this in counts per minute?",
    value: 720, unit: "counts/min", wrong: [0.2, 72],
    explanation: "12 × 60 = 720 counts/min." });

  q.num({ d: 3, skill: "APPLICATION",
    stem: "The background count rate in a laboratory is 24 counts/min. With a source in place, a detector reads 315 counts/min. What is the count rate due to the source?",
    value: 291, unit: "counts/min", wrong: [339, 315],
    explanation: "Corrected count rate = 315 − 24 = 291 counts/min.",
    hints: ["Subtract the background count rate."] });

  q.num({ d: 3, skill: "ANALYSIS",
    stem: "With no source present, a detector records 75 counts in 5.0 minutes. With a source in place, it records 1800 counts in 5.0 minutes. Calculate the corrected count rate in counts per minute.",
    value: 345, unit: "counts/min", wrong: [1725, 360],
    explanation: "Background = 75 ÷ 5.0 = 15 counts/min. Measured = 1800 ÷ 5.0 = 360 counts/min. Corrected = 360 − 15 = 345 counts/min.",
    hints: ["Turn both readings into count rates first.", "Then subtract the background."] });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "Why are radiation counts usually taken over several minutes, or repeated and averaged?",
    options: [["Decay is random, so counts vary; longer counts are more reliable.", "Correct."], ["The detector needs several minutes to warm up.", "Not the reason."], ["The background changes every second, so it must be timed over several minutes.", "It fluctuates randomly, but that is the point: average it."], ["To let the source cool down between readings.", "Sources do not need cooling."]],
    answer: "A", explanation: "Random decay makes counts vary; counting for longer reduces the effect of the fluctuations." });

  q.tf({ d: 2, skill: "RECALL",
    stem: "Most background radiation comes from nuclear power stations.",
    answer: false, explanation: "Most comes from natural sources: radon, rocks and buildings, food and drink, and cosmic rays." });

  q.mcq({ d: 3, skill: "ANALYSIS",
    stem: "Why is the background count rate higher on a high mountain or in an aircraft?",
    options: [["There is less air above to absorb cosmic radiation.", "Correct."], ["There is more radon gas in the thin air at high altitude.", "Radon comes from the ground."], ["It is closer to the Sun's heat.", "Heat is not ionising radiation."], ["The air is colder up there.", "Temperature does not matter."]],
    answer: "A", explanation: "The atmosphere absorbs much of the cosmic radiation, so less is absorbed above you at altitude.",
    hints: ["Which source of background radiation comes from space?"] });

  q.struct({ d: 3, skill: "APPLICATION", examStyle: true,
    stem: "With the source removed, a detector records 108 counts in 4.0 minutes. With a source 10 cm from the detector, it records 1336 counts in 4.0 minutes.",
    parts: [
      P.num({ label: "(a)", stem: "Calculate the background count rate.", value: 27, unit: "counts/min", wrong: [108],
        explanation: "108 ÷ 4.0 = 27 counts/min." }),
      P.num({ label: "(b)", stem: "Calculate the measured count rate with the source in place.", value: 334, unit: "counts/min", wrong: [1336],
        explanation: "1336 ÷ 4.0 = 334 counts/min." }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the corrected count rate due to the source.", value: 307, unit: "counts/min", wrong: [361, 1228],
        explanation: "334 − 27 = 307 counts/min." }),
      P.mcq({ label: "(d)", stem: "Why must the reading with the source be corrected?", options: [["It also counts background radiation not coming from the source.", "Correct."], ["The source is too weak to be measured on its own reading.", "The source gives a clear count above background."], ["The detector always reads about 10% too high at any distance.", "Not the reason."], ["Decay is random, so any one reading can never be right.", "Randomness is dealt with by counting for longer."]], answer: "A",
        explanation: "Subtracting the background leaves the count rate due to the source alone." }),
    ],
    explanation: "Convert counts to count rates, then subtract the background.",
    hints: ["Count rate = counts ÷ time."] });

  q.card("DEFINITION", "What is **background radiation**?", "Ionising radiation that is always present in the environment.");
  q.card("FACT", "Main sources of background radiation?", "Radon gas, rocks and buildings, food and drink, cosmic rays.");
  q.card("FACT", "How is ionising radiation detected?", "With a detector such as a Geiger–Müller tube connected to a counter or ratemeter.");
  q.card("DEFINITION", "What is a **count rate**?", "The number of counts per second or per minute.");
  q.card("FORMULA", "Corrected count rate?", "Measured count rate − background count rate.");
});

// =====================================================================================================================
concept("phys.nuclear.emissions", {
  file: "nuclear/emissions",
  keyPrefix: "nuclear.emissions",
  objectives: { cambridge: ["5.2.2.1", "5.2.2.2", "5.2.2.3", "5.2.2.4"], zimsec: ["15.2.1", "15.2.2"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "What is an alpha particle?",
    options: [["A helium nucleus: two protons and two neutrons", "Correct."], ["A fast-moving electron emitted from the nucleus", "That is a beta particle."], ["An electromagnetic wave", "That is gamma radiation."], ["A single neutron from the nucleus", "Neutrons are emitted in fission, not as alpha particles."]],
    answer: "A", explanation: "An alpha particle is a helium nucleus, with charge +2." });

  q.mcq({ d: 1, skill: "RECALL",
    stem: "What is a beta particle?",
    options: [["A fast-moving electron emitted from the nucleus", "Correct."], ["A helium nucleus of two protons and two neutrons", "That is an alpha particle."], ["An electromagnetic wave", "That is gamma radiation."], ["A proton emitted from the nucleus", "Beta particles are electrons."]],
    answer: "A", explanation: "A beta particle is a high-speed electron emitted by the nucleus." });

  q.mcq({ d: 1, skill: "RECALL",
    stem: "What is gamma radiation?",
    options: [["An electromagnetic wave of very high frequency", "Correct."], ["A fast-moving electron from the nucleus", "That is beta."], ["A helium nucleus of two protons and two neutrons", "That is alpha."], ["A stream of neutrons from the nucleus", "Gamma radiation is electromagnetic, with no particles of matter."]],
    answer: "A", explanation: "Gamma rays are electromagnetic waves, with no charge and no mass." });

  q.mcq({ d: 2, skill: "RECALL", daily: true,
    stem: "Which type of radiation is stopped by a sheet of paper?",
    options: [["Alpha", "Correct."], ["Beta", "Beta needs a few millimetres of aluminium."], ["Gamma", "Gamma passes through paper easily."], ["All three", "Only alpha is stopped by paper."]],
    answer: "A", explanation: "Alpha particles are stopped by paper or a few centimetres of air." });

  q.mcq({ d: 2, skill: "RECALL",
    stem: "Which type of radiation is the most strongly ionising?",
    options: [["Alpha", "Correct."], ["Beta", "Moderately ionising."], ["Gamma", "Weakly ionising."], ["They are all equally ionising.", "No."]],
    answer: "A", explanation: "Alpha particles produce the most ions along their short paths." });

  q.mcq({ d: 2, skill: "RECALL",
    stem: "Which type of radiation can pass through several centimetres of lead, being reduced but not completely stopped?",
    options: [["Gamma", "Correct."], ["Alpha", "Stopped by paper."], ["Beta", "Stopped by a few millimetres of aluminium."], ["None of them", "Gamma can."]],
    answer: "A", explanation: "Gamma rays are very penetrating and are only reduced by thick lead or concrete." });

  q.mcq({ d: 3, skill: "ANALYSIS",
    stem: "A source is tested with a detector (background 30 counts/min). Count rates: no absorber 640; paper 638; 3 mm of aluminium 240; 2 cm of lead 45 counts/min. Which radiations does the source emit?",
    options: [["Beta and gamma", "Correct."], ["Alpha and beta", "Paper made no difference, so there is no alpha."], ["Alpha only", "Paper made no difference."], ["Gamma only", "Aluminium removed a large part: that was beta."]],
    answer: "A", explanation: "Paper changes nothing (no alpha); aluminium removes a large part (beta); what passes the aluminium and is reduced by lead is gamma.",
    hints: ["Compare each reading with the one before it.", "Which radiation is stopped by aluminium but not by paper?"] });

  q.tf({ d: 2, skill: "UNDERSTANDING",
    stem: "Radioactive decay can be speeded up by heating the source.",
    answer: false, explanation: "Radioactive emission is spontaneous: it is not affected by temperature, pressure or chemical reactions." });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "What does it mean to say that radioactive emission is random?",
    options: [["You cannot predict when a given nucleus will decay, or which way.", "Correct."], ["All the nuclei in the source decay at the same moment.", "Nuclei decay one by one at unpredictable times."], ["Decay happens only when the source is heated or shaken.", "Decay is spontaneous."], ["The radiation always goes upwards, away from the ground, in a single beam.", "It goes in random directions."]],
    answer: "A", explanation: "Each nucleus has a chance of decaying, but exactly when, and in which direction it emits, cannot be predicted." });

  q.mcq({ d: 3, skill: "UNDERSTANDING", applies: C,
    stem: "Alpha, beta and gamma radiation pass between two oppositely charged parallel plates. Which statement is correct?",
    options: [["Alpha bends to −, beta bends more strongly to +, gamma goes straight.", "Correct."], ["All three bend towards the positive plate by different amounts.", "Alpha is positive; gamma is uncharged."], ["Gamma bends the most because it is the most penetrating.", "Gamma is uncharged and is not deflected."], ["Alpha and beta bend the same way by the same amount.", "They have opposite charges and very different masses."]],
    answer: "A", explanation: "Opposite charges bend opposite ways; the much lighter beta particles are deflected more; uncharged gamma is not deflected.",
    hints: ["Consider the charge and the mass of each."] });

  q.mcq({ d: 3, skill: "UNDERSTANDING", applies: C,
    stem: "Why are beta particles deflected much more than alpha particles in a magnetic field?",
    options: [["Beta particles have a much smaller mass.", "Correct."], ["Beta particles have a larger charge.", "Alpha has the larger charge (+2)."], ["Beta particles move more slowly.", "They move faster."], ["Beta particles are uncharged.", "They are negative."]],
    answer: "A", explanation: "A beta particle's tiny mass means the magnetic force changes its direction far more easily.",
    hints: ["Compare the masses of the two particles."] });

  q.mcq({ d: 3, skill: "UNDERSTANDING", applies: C,
    stem: "Why is alpha radiation much more strongly ionising than gamma radiation?",
    options: [["Alpha has a large charge and hits atoms strongly; gamma has no charge.", "Correct."], ["Gamma rays carry no energy to give to atoms.", "They do carry energy."], ["Alpha particles are electromagnetic waves of high energy.", "They are helium nuclei."], ["Alpha particles travel faster than gamma rays, so they hit more atoms each second.", "Gamma rays travel at the speed of light."]],
    answer: "A", explanation: "Charge and kinetic energy let alpha particles ionise many atoms close together; uncharged gamma rays rarely interact.",
    hints: ["Think about charge and how often each radiation interacts with atoms."] });

  q.match({ d: 2, skill: "RECALL",
    stem: "Match each radiation with what stops (or greatly reduces) it.",
    pairs: [["Alpha", "A sheet of paper"], ["Beta", "A few millimetres of aluminium"], ["Gamma", "Thick lead or concrete"]],
    explanation: "Alpha: paper. Beta: a few mm of aluminium. Gamma: thick lead or concrete." });

  q.struct({ d: 3, skill: "UNDERSTANDING", examStyle: true,
    stem: "Alpha particles and gamma rays are both emitted by radioactive nuclei.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Compare the nature and charge of alpha particles and gamma rays.",
        points: ["An alpha particle is a helium nucleus (two protons and two neutrons) with a charge of +2", "A gamma ray is an electromagnetic wave with no charge and no mass"] }),
      P.mcq({ label: "(b)", stem: "Which is more penetrating?", options: [["Gamma", "Correct."], ["Alpha", "Alpha is stopped by paper."], ["They are equally penetrating.", "No."], ["Neither can pass through paper.", "Gamma can."]], answer: "A",
        explanation: "Gamma passes through paper and aluminium and is only reduced by thick lead." }),
      P.mcq({ label: "(c)", stem: "Which is more dangerous if a source is swallowed?", options: [["Alpha: it dumps all its energy in a small volume of tissue", "Correct."], ["Gamma, because it is more penetrating than alpha", "Inside the body, penetration means it passes out."], ["They are equally dangerous once inside the body, as both are ionising.", "Alpha does far more damage inside the body."], ["Neither is harmful once it is inside the body.", "Both can harm cells."]], answer: "A",
        explanation: "Alpha particles are strongly ionising and cannot escape the body, so they damage nearby cells intensely." }),
    ],
    explanation: "Alpha: helium nucleus, +2, strongly ionising, least penetrating. Gamma: EM wave, uncharged, weakly ionising, most penetrating.",
    hints: ["Strong ionisation means short range."] });

  q.card("DEFINITION", "What is **radioactivity**?", "The spontaneous, random emission of radiation from unstable nuclei.");
  q.card("FACT", "Alpha radiation?", "Helium nucleus, charge +2; strongly ionising; stopped by paper.");
  q.card("FACT", "Beta radiation?", "Fast electron from the nucleus, charge −1; moderately ionising; stopped by a few mm of aluminium.");
  q.card("FACT", "Gamma radiation?", "Electromagnetic wave, no charge; weakly ionising; reduced only by thick lead or concrete.");
  q.card("CONCEPT", "Spontaneous and random emission?", "Unaffected by temperature or chemistry; when a nucleus decays and in which direction cannot be predicted.");
  q.card("CONCEPT", "Deflection of nuclear radiation?", "Alpha and beta are deflected in opposite directions (beta more); gamma is not deflected.", undefined, { applies: C });
  q.card("CONCEPT", "Why is alpha most ionising?", "Large charge and kinetic energy: it interacts with many atoms over a short path.", undefined, { applies: C });
});

// =====================================================================================================================
concept("phys.nuclear.decay", {
  file: "nuclear/decay",
  keyPrefix: "nuclear.decay",
  objectives: { cambridge: ["5.2.3.1", "5.2.3.2", "5.2.3.3", "5.2.3.4", "5.2.3.5"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "What happens to an unstable nucleus during radioactive decay?",
    options: [["It emits radiation and may become a different element.", "Correct."], ["It gains electrons from the surroundings.", "Decay happens in the nucleus; electrons are not gained."], ["It always stays exactly the same element.", "Alpha and beta decay change it."], ["It splits into two equal halves, each a lighter element, every time.", "That is not decay; fission gives two smaller nuclei."]],
    answer: "A", explanation: "Radioactive decay is a random change in an unstable nucleus, emitting alpha, beta or gamma radiation." });

  q.mcq({ d: 2, skill: "RECALL",
    stem: "How does alpha decay change a nucleus?",
    options: [["The nucleon number falls by 4 and the proton number falls by 2.", "Correct."], ["The nucleon number stays the same and the proton number rises by 1.", "That is beta decay."], ["The nucleon number falls by 2 and the proton number by 4.", "The numbers are the wrong way round."], ["Neither number changes.", "That is gamma emission."]],
    answer: "A", explanation: "An alpha particle carries away 2 protons and 2 neutrons." });

  q.mcq({ d: 2, skill: "RECALL",
    stem: "How does beta decay change a nucleus?",
    options: [["The nucleon number stays the same and the proton number rises by 1.", "Correct."], ["The nucleon number falls by 4 and the proton number falls by 2 as well.", "That is alpha decay."], ["The nucleon number rises by 1.", "The total number of nucleons does not change."], ["Neither number changes.", "That is gamma emission."]],
    answer: "A", explanation: "A neutron becomes a proton, so Z goes up by 1 while A is unchanged." });

  q.tf({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Gamma emission changes the proton number of a nucleus.",
    answer: false, explanation: "Gamma emission changes only the energy of the nucleus; A and Z are unchanged." });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "What happens inside the nucleus during beta decay?",
    options: [["A neutron becomes a proton and an electron, which is emitted.", "Correct."], ["A proton changes into a neutron and stays inside.", "That is not beta-minus decay."], ["One of the atom's orbiting electrons is thrown out at very high speed.", "The beta particle comes from the nucleus."], ["A neutron is emitted from the nucleus.", "No."]],
    answer: "A", explanation: "In beta decay a neutron becomes a proton (which stays) and an electron (which is emitted)." });

  q.fib({ d: 3, skill: "APPLICATION",
    stem: t`Polonium-210, $${N(210, 84, "Po")}$, decays by alpha emission. Give the numbers for the daughter nucleus.`,
    template: "Nucleon number: {{blank:a}}. Proton number: {{blank:b}}.",
    blanks: [
      { id: "a", input: "number", accepted: ["206"], wrong: "210" },
      { id: "b", input: "number", accepted: ["82"], wrong: "86" },
    ],
    explanation: "Alpha decay: A = 210 − 4 = 206; Z = 84 − 2 = 82 (lead).",
    hints: ["An alpha particle is a helium nucleus: 4 nucleons, 2 protons."] });

  q.fib({ d: 3, skill: "APPLICATION",
    stem: t`Strontium-90, $${N(90, 38, "Sr")}$, decays by beta emission. Give the numbers for the daughter nucleus.`,
    template: "Nucleon number: {{blank:a}}. Proton number: {{blank:b}}.",
    blanks: [
      { id: "a", input: "number", accepted: ["90"], wrong: "86" },
      { id: "b", input: "number", accepted: ["39"], wrong: "37" },
    ],
    explanation: "Beta decay: A stays 90; Z = 38 + 1 = 39 (yttrium).",
    hints: ["In beta decay a neutron becomes a proton."] });

  q.mcq({ d: 3, skill: "ANALYSIS",
    stem: "Which equation correctly shows the beta decay of iodine-131?",
    options: [[t`$${N(131, 53, "I")} \rightarrow ${N(131, 54, "Xe")} + ${N(0, -1, "e")}$`, "Correct: A unchanged, Z up by 1."], [t`$${N(131, 53, "I")} \rightarrow ${N(131, 52, "Te")} + ${N(0, -1, "e")}$`, "The proton numbers do not balance."], [t`$${N(131, 53, "I")} \rightarrow ${N(127, 51, "Sb")} + ${N(0, -1, "e")}$`, "The nucleon numbers do not balance."], [t`$${N(131, 53, "I")} \rightarrow ${N(131, 53, "I")} + ${N(0, -1, "e")}$`, "The proton numbers do not balance."]],
    answer: "A", explanation: "131 = 131 + 0 and 53 = 54 + (−1): only the first equation balances.",
    hints: ["Check that the top numbers and the bottom numbers each balance."] });

  q.mcq({ d: 4, skill: "ANALYSIS",
    stem: "A nucleus emits one alpha particle and then two beta particles. What is the overall change?",
    options: [["The nucleon number falls by 4 and the proton number is unchanged.", "Correct: an isotope of the original element."], ["The nucleon number falls by 4 and the proton number falls by 2.", "That ignores the two beta decays."], ["The nucleon number is unchanged and the proton number rises by 2.", "That ignores the alpha decay."], ["Both numbers fall by 4.", "No."]],
    answer: "A", explanation: "Alpha: A − 4, Z − 2. Two betas: Z + 2. Overall A − 4, Z unchanged.",
    hints: ["Add up the changes from each decay."] });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "Why are some isotopes unstable (radioactive)?",
    options: [["Their nuclei have an unstable mix of neutrons and protons.", "Correct."], ["They have too many orbiting electrons.", "Electrons do not cause nuclear instability."], ["They are too cold for their nuclei to hold together.", "Temperature does not matter."], ["They are ions with missing electrons.", "Ions are about electrons, not the nucleus."]],
    answer: "A", explanation: "Nuclei with too many neutrons tend to beta decay; very heavy nuclei tend to alpha decay." });

  q.mcq({ d: 2, skill: "RECALL",
    stem: "Which types of decay produce a nucleus of a different element?",
    options: [["Alpha decay and beta decay", "Correct."], ["Gamma emission, but not alpha or beta", "Gamma does not change the element."], ["All three", "Gamma does not."], ["None of them", "Alpha and beta change Z."]],
    answer: "A", explanation: "Both alpha and beta decay change the proton number, so the element changes." });

  q.match({ d: 2, skill: "RECALL",
    stem: "Match each emission with the change it makes to the nucleus.",
    pairs: [["Alpha", "A falls by 4, Z falls by 2"], ["Beta", "A unchanged, Z rises by 1"], ["Gamma", "A and Z unchanged"]],
    explanation: "Alpha: −4, −2. Beta: 0, +1. Gamma: no change." });

  q.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: t`Thorium-232, $${N(232, 90, "Th")}$, decays by alpha emission to radium. The radium then decays by beta emission to actinium.`,
    parts: [
      P.fib({ label: "(a)", stem: "Give the numbers for the radium nucleus.",
        template: "Nucleon number: {{blank:a}}. Proton number: {{blank:b}}.",
        blanks: [
          { id: "a", input: "number", accepted: ["228"], wrong: "232" },
          { id: "b", input: "number", accepted: ["88"], wrong: "90" },
        ],
        explanation: "A = 232 − 4 = 228; Z = 90 − 2 = 88." }),
      P.fib({ label: "(b)", stem: "Give the numbers for the actinium nucleus.",
        template: "Nucleon number: {{blank:a}}. Proton number: {{blank:b}}.",
        blanks: [
          { id: "a", input: "number", accepted: ["228"], wrong: "224" },
          { id: "b", input: "number", accepted: ["89"], wrong: "87" },
        ],
        explanation: "Beta decay: A stays 228; Z = 88 + 1 = 89." }),
      P.manual({ label: "(c)", marks: 1, stem: "Explain why the beta decay changes the element but not the nucleon number.",
        points: ["A neutron changes into a proton (and an emitted electron), so Z rises by 1 while the total number of nucleons stays the same"] }),
    ],
    explanation: "Alpha: A − 4, Z − 2. Beta: A unchanged, Z + 1.",
    hints: ["Do the alpha decay first, then the beta decay."] });

  q.card("DEFINITION", "What is **radioactive decay**?", "A random, spontaneous change in an unstable nucleus, emitting alpha, beta and/or gamma radiation.");
  q.card("FACT", "Effect of alpha decay?", "Nucleon number −4, proton number −2: a new element.");
  q.card("FACT", "Effect of beta decay?", "Nucleon number unchanged, proton number +1 (a neutron becomes a proton and an electron).");
  q.card("FACT", "Effect of gamma emission?", "No change in A or Z; the nucleus loses energy.");
  q.card("CONCEPT", "Why are some nuclei unstable?", "Too many neutrons (beta decay) or too heavy (alpha decay).");
  q.card("CONCEPT", "Balancing a decay equation?", "Top numbers (A) and bottom numbers (Z) must each balance; use Z to name the element.");
});

// =====================================================================================================================
concept("phys.nuclear.half-life", {
  file: "nuclear/half-life",
  keyPrefix: "nuclear.halflife",
  objectives: { cambridge: ["5.2.4.1", "5.2.4.2"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "What is the half-life of a radioactive isotope?",
    options: [["The time taken for half the nuclei in a sample to decay", "Correct."], ["Half the time it takes for the whole sample to decay", "A sample never decays completely."], ["The time for one nucleus to decay", "That is random and unpredictable."], ["Half the age of the sample", "No."]],
    answer: "A", explanation: "Half-life is the time for half the undecayed nuclei (or the count rate) to halve." });

  q.num({ d: 2, skill: "APPLICATION", daily: true,
    stem: "A source has a count rate of 640 counts/min and a half-life of 3.0 days. What will the count rate be after 9.0 days? (Ignore background radiation.)",
    value: 80, unit: "counts/min", wrong: [213, 160],
    explanation: "9.0 days = 3 half-lives: 640 → 320 → 160 → 80 counts/min." });

  q.num({ d: 2, skill: "APPLICATION",
    stem: "What fraction of a radioactive sample is still undecayed after 4 half-lives? Give your answer as a decimal or a fraction.",
    value: 0.0625, answer: "0.0625", wrong: [0.25, 0.125],
    explanation: t`$\left(\dfrac{1}{2}\right)^{4} = \dfrac{1}{16} = 0.0625$.` });

  q.num({ d: 3, skill: "ANALYSIS",
    stem: "The activity of a sample falls from 960 counts/s to 60 counts/s in 20 hours. What is its half-life?",
    value: 5.0, answer: "5.0", unit: "hours", wrong: [10, 1.25],
    explanation: "960 → 480 → 240 → 120 → 60 is 4 half-lives in 20 hours, so the half-life is 5.0 hours.",
    hints: ["Count how many times the activity halves."] });

  q.num({ d: 3, skill: "APPLICATION",
    stem: "Radon-222 has a half-life of 3.8 days. How long does it take for the activity of a radon sample to fall to one-eighth of its starting value?",
    value: 11.4, answer: "11.4", unit: "days", wrong: [30.4, 1.27],
    explanation: "One-eighth is three halvings: 3 × 3.8 = 11.4 days.",
    hints: [t`$\dfrac{1}{8} = \dfrac{1}{2} \times \dfrac{1}{2} \times \dfrac{1}{2}$`] });

  q.num({ d: 3, skill: "APPLICATION",
    stem: t`A sample contains $1.2 \times 10^{8}$ undecayed nuclei. The half-life is 15 minutes. How many nuclei are still undecayed after 1 hour?`,
    value: 7.5e6, answer: "7.5e6", tol: REL2, wrong: [3.0e7, 3.0e6],
    explanation: t`1 hour = 4 half-lives: $1.2 \times 10^{8} \rightarrow 6.0 \times 10^{7} \rightarrow 3.0 \times 10^{7} \rightarrow 1.5 \times 10^{7} \rightarrow 7.5 \times 10^{6}$.`,
    hints: ["How many 15-minute periods are in an hour?"] });

  q.mcq({ d: 2, skill: "APPLICATION",
    stem: "On a decay curve, the count rate is 720 counts/min at the start, 360 counts/min after 2.5 minutes and 180 counts/min after 5.0 minutes. What is the half-life?",
    options: [["2.5 minutes", "Correct."], ["5.0 minutes", "That is two half-lives."], ["1.25 minutes", "No."], ["10 minutes", "No."]],
    answer: "A", explanation: "The count rate halves every 2.5 minutes." });

  q.tf({ d: 2, skill: "UNDERSTANDING",
    stem: "After two half-lives, all of a radioactive sample has decayed.",
    answer: false, explanation: "After two half-lives a quarter of the nuclei are still undecayed." });

  q.num({ d: 4, skill: "ANALYSIS", applies: C,
    stem: "The background count rate is 40 counts/min. A source gives a measured count rate of 1640 counts/min at the start and 440 counts/min after 6.0 hours. What is the half-life of the source?",
    value: 3.0, answer: "3.0", unit: "hours", wrong: [6, 2],
    explanation: "Corrected: 1640 − 40 = 1600 and 440 − 40 = 400. 1600 → 800 → 400 is 2 half-lives in 6.0 hours, so the half-life is 3.0 hours.",
    hints: ["Subtract the background from both readings first."] });

  q.mcq({ d: 3, skill: "UNDERSTANDING", applies: C,
    stem: "Why must the background count rate be subtracted before finding a half-life from measured count rates?",
    options: [["Background does not halve, so it makes the half-life seem too long.", "Correct."], ["The background doubles every half-life of the source.", "It stays roughly constant."], ["The background comes from the source itself, not from the room around it.", "It comes from the surroundings."], ["It is not necessary: the background has no effect at all.", "It does affect the answer."]],
    answer: "A", explanation: "Only the source's count rate halves each half-life; the constant background must be removed first.",
    hints: ["Does the background radiation decay away?"] });

  q.mcq({ d: 3, skill: "ANALYSIS",
    stem: "Two sources start with the same activity. Source X has a half-life of 2 days; source Y has a half-life of 2 years. Which statement is true after 10 days?",
    options: [["The activity of X is now much lower than that of Y.", "Correct: X has gone through 5 half-lives."], ["The activity of Y is now much lower than that of X.", "Y has hardly decayed."], ["Their activities are still equal.", "No."], ["Both have completely decayed.", "No."]],
    answer: "A", explanation: "In 10 days X halves 5 times (to 1/32), while Y has barely changed.",
    hints: ["How many half-lives has each gone through?"] });

  q.fib({ d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentence.",
    template: "After one half-life {{blank:a}} of the radioactive nuclei remain; after three half-lives {{blank:b}} remain.",
    blanks: [
      { id: "a", input: "select", choices: ["a half", "a quarter", "an eighth", "a sixteenth"], accepted: ["a half"], wrong: "a quarter" },
      { id: "b", input: "select", choices: ["a half", "a quarter", "an eighth", "a sixteenth"], accepted: ["an eighth"], wrong: "a sixteenth" },
    ],
    explanation: "1 half-life: 1/2. 3 half-lives: 1/2 × 1/2 × 1/2 = 1/8." });

  q.struct({ d: 3, skill: "ANALYSIS", applies: C, examStyle: true,
    stem: "A detector near a source gives these measured count rates. The background count rate is 30 counts/min. Time / min: 0, 10, 20, 30, 40. Measured count rate / counts per min: 990, 510, 270, 150, 90.",
    parts: [
      P.num({ label: "(a)", stem: "Calculate the corrected count rate at time 0.", value: 960, unit: "counts/min", wrong: [1020],
        explanation: "990 − 30 = 960 counts/min." }),
      P.num({ label: "(b)", marks: 2, stem: "Use the corrected count rates to find the half-life.", value: 10, unit: "minutes", wrong: [20, 5],
        explanation: "Corrected values: 960, 480, 240, 120, 60. They halve every 10 minutes." }),
      P.num({ label: "(c)", stem: "Predict the measured count rate (including background) at 50 minutes.", value: 60, unit: "counts/min", wrong: [30, 45],
        explanation: "Corrected: 60 → 30 counts/min; adding the background gives 30 + 30 = 60 counts/min." }),
    ],
    explanation: "Subtract the background, find the halving time, then add the background back for a measured prediction.",
    hints: ["Work with corrected count rates, then add the background back for (c)."] });

  q.card("DEFINITION", "What is **half-life**?", "The time for half the nuclei of an isotope to decay (or for the count rate to halve).");
  q.card("CONCEPT", "Counting half-lives?", "Halve repeatedly: e.g. 800 → 400 → 200 → 100 is three half-lives.");
  q.card("FORMULA", "Fraction left after n half-lives?", t`$\left(\dfrac{1}{2}\right)^{n}$`);
  q.card("CONCEPT", "Half-life from a decay curve?", "Read the time for the count rate to fall to half, from two or more starting points, and average.");
  q.card("CONCEPT", "Half-life with background radiation?", "Subtract the background from every reading first; the background does not halve.", undefined, { applies: C });
});

// =====================================================================================================================
concept("phys.nuclear.uses-safety", {
  file: "nuclear/uses-safety",
  keyPrefix: "nuclear.uses",
  objectives: { cambridge: ["5.2.4.3", "5.2.5.1", "5.2.5.2", "5.2.5.3"], zimsec: ["15.2.3"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "Which is an effect of ionising radiation on living cells?",
    options: [["It can cause mutations and cancer.", "Correct."], ["It makes the cells magnetic.", "No."], ["It makes the cells permanently radioactive.", "Irradiated cells do not become radioactive."], ["It has no effect.", "It can damage or kill cells."]],
    answer: "A", explanation: "Ionising radiation can kill cells, cause mutations and lead to cancer." });

  q.mcq({ d: 1, skill: "RECALL",
    stem: "Which type of radiation is used in a smoke alarm?",
    options: [["Alpha", "Correct."], ["Beta", "No."], ["Gamma", "No."], ["X-rays", "No."]],
    answer: "A", explanation: "Smoke alarms contain an alpha emitter, such as americium-241." });

  q.mcq({ d: 3, skill: "UNDERSTANDING",
    stem: "Why is an alpha emitter used in a smoke alarm?",
    options: [["Alpha ionises the air so a current flows; smoke blocks it and the alarm sounds.", "Correct."], ["Alpha passes straight through the smoke and is then detected by a sensor outside the room.", "Alpha has a very short range."], ["Alpha particles heat the smoke until it glows and is seen.", "Alpha particles are not used to heat anything."], ["Alpha is the most penetrating, so it fills the whole room.", "They are the least penetrating."]],
    answer: "A", explanation: "Strong ionisation gives a measurable current, easily interrupted by smoke; the short range makes it safe.",
    hints: ["What does smoke do to alpha particles?"] });

  q.mcq({ d: 2, skill: "RECALL",
    stem: "Which radiation is used to sterilise sealed packs of medical equipment?",
    options: [["Gamma", "Correct: it passes through the packaging."], ["Alpha", "It cannot pass through packaging."], ["Beta", "It is less penetrating than gamma."], ["Ultraviolet", "It cannot pass through most packaging."]],
    answer: "A", explanation: "Gamma rays penetrate the sealed packs and kill bacteria inside." });

  q.mcq({ d: 3, skill: "EVALUATION",
    stem: "A paper mill checks the thickness of paper using a radioactive source on one side and a detector on the other. Which source is most suitable?",
    options: [["A beta emitter with a long half-life", "Correct."], ["An alpha emitter with a long half-life", "Alpha would be stopped completely by the paper."], ["A gamma emitter with a short half-life", "Gamma would pass through almost unchanged, and the source would soon need replacing."], ["A beta emitter with a half-life of a few minutes", "It would need replacing constantly."]],
    answer: "A", explanation: "Beta is partly absorbed by paper, so the count rate changes with thickness; a long half-life keeps the count rate steady for years.",
    hints: ["The radiation must be partly absorbed by the paper.", "The source should last a long time."] });

  q.mcq({ d: 3, skill: "EVALUATION",
    stem: "Which isotope would be most suitable as a tracer injected into a patient for a medical scan?",
    options: [["A gamma emitter with a half-life of a few hours", "Correct."], ["An alpha emitter with a long half-life", "Alpha cannot reach a detector outside the body and is very damaging inside."], ["A beta emitter with a long half-life", "Beta is mostly absorbed in the body, and a long half-life gives a large dose."], ["A gamma emitter with a half-life of many years", "The patient would be irradiated for years."]],
    answer: "A", explanation: "Gamma escapes the body to the detector; a short half-life keeps the patient's dose small.",
    hints: ["The radiation must get out of the body.", "The source should not stay active for long."] });

  q.tf({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Food that has been irradiated with gamma rays becomes radioactive.",
    answer: false, explanation: "Irradiation kills microbes; the food does not become radioactive." });

  q.mcq({ d: 1, skill: "RECALL",
    stem: "Which is a safe way to handle a radioactive source in a school laboratory?",
    options: [["Use long tongs and keep it pointed away from people", "Correct."], ["Pick it up quickly with your fingers", "Never handle sources with bare hands."], ["Point it at a partner to test the detector", "Never point a source at anyone."], ["Keep it in your pocket between experiments so it is not lost", "Sources must be stored in a lead-lined container."]],
    answer: "A", explanation: "Tongs increase the distance; sources are never pointed at people." });

  q.mcq({ d: 3, skill: "UNDERSTANDING", multiple: true,
    stem: "Select **all** the measures that reduce a worker's exposure to radiation.",
    options: [["Spending less time near the source", "Correct."], ["Increasing the distance from the source", "Correct."], ["Putting lead or concrete shielding between the source and the worker", "Correct."], ["Wearing a cotton apron only", "Cotton does not stop beta or gamma."], ["Storing sources on open shelves", "Sources must be shielded and locked away."], ["Eating lunch in the laboratory", "This risks swallowing radioactive material."]],
    answer: ["A", "B", "C"], explanation: "Time, distance and shielding are the three ways to reduce exposure.",
    hints: ["Think of time, distance and shielding."] });

  q.mcq({ d: 3, skill: "ANALYSIS",
    stem: "Why is an alpha source outside the body less dangerous than a gamma source, but more dangerous if it is swallowed?",
    options: [["Skin stops alpha outside; inside, it dumps energy in living tissue.", "Correct."], ["Alpha is more penetrating than gamma once it is inside the soft tissue of the body.", "It is much less penetrating."], ["Gamma radiation does not ionise the atoms it passes at all.", "It ionises weakly."], ["Alpha particles are electromagnetic waves, like gamma.", "They are helium nuclei."]],
    answer: "A", explanation: "Range and ionisation decide the hazard: alpha's short range protects us from outside but concentrates damage inside.",
    hints: ["Compare how far each radiation travels in tissue."] });

  q.mcq({ d: 2, skill: "RECALL",
    stem: "Why does a radiographer wear a dosimeter (film badge)?",
    options: [["To measure the radiation dose received over time", "Correct."], ["To shield the body from radiation", "A badge gives no protection."], ["To stop alpha particles reaching the chest", "The badge is a detector, not a shield."], ["To detect smoke in the X-ray room", "That is a smoke alarm's job."]],
    answer: "A", explanation: "A dosimeter records the dose a worker receives, so it can be kept within safe limits." });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "Engineers find a leak in an underground water pipe by adding a radioactive tracer to the water and searching above ground with a detector. Why must the tracer emit gamma rather than beta radiation?",
    options: [["Gamma passes through the soil; beta would be absorbed by it.", "Correct."], ["Gamma is less dangerous than beta to the engineers working above the pipe.", "Not the reason."], ["Beta emitters always have very long half-lives.", "Not true."], ["Beta radiation cannot be detected by any instrument.", "It can, at short range."]],
    answer: "A", explanation: "The radiation must penetrate the soil above the pipe, so a gamma emitter is needed (with a short half-life)." });

  q.match({ d: 2, skill: "RECALL",
    stem: "Match each use with the type of radiation it needs.",
    pairs: [["Smoke alarm", "Alpha"], ["Measuring the thickness of paper", "Beta"], ["Sterilising surgical instruments", "Gamma"]],
    explanation: "Smoke alarm: alpha. Paper thickness: beta. Sterilising: gamma." });

  q.struct({ d: 3, skill: "APPLICATION", examStyle: true,
    stem: "A teacher demonstrates the properties of radiation with a sealed radioactive source.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Describe three precautions the teacher should take.",
        points: ["Handle the source with long tongs, never with bare hands", "Keep it as far from people as possible, point it away from them and use it for as short a time as possible", "Return it promptly to its lead-lined box in a locked, labelled store"] }),
      P.mcq({ label: "(b)", stem: "Why are sources stored in lead-lined boxes?", options: [["Lead absorbs the radiation, reducing exposure.", "Correct."], ["Lead keeps the source cool.", "No."], ["Lead stops the source being stolen.", "A lock does that."], ["Lead slows the decay, so the source lasts much longer.", "Nothing changes the half-life."]], answer: "A",
        explanation: "Lead is a dense absorber of beta and gamma radiation." }),
    ],
    explanation: "Reduce exposure through time, distance and shielding; store sources shielded and secure.",
    hints: ["Think of time, distance and shielding."] });

  q.card("FACT", "Effects of ionising radiation on living things?", "Cell death, mutations, cancer.");
  q.card("CONCEPT", "How do you choose an isotope for a use?", "By its type of radiation (penetration, ionisation) and its half-life (how long it must last).", undefined, { applies: C });
  q.card("FACT", "How does a smoke alarm work?", "Alpha particles ionise air so a current flows; smoke absorbs them, the current drops and the alarm sounds.");
  q.card("FACT", "Sterilisation and food irradiation?", "Gamma rays penetrate packaging and kill microbes; the items do not become radioactive.");
  q.card("FACT", "Thickness gauges for paper?", "Beta source with a long half-life; thicker paper absorbs more, lowering the count rate.");
  q.card("FACT", "Medical tracers?", "Gamma emitters with short half-lives (hours), e.g. technetium-99m.");
  q.card("FACT", "Safe handling of sources?", "Tongs, never point at people, lead-lined locked storage, short use, dosimeters for workers.");
  q.card("CONCEPT", "Three ways to reduce exposure?", "Less time, more distance, more shielding.", undefined, { applies: C });
});
