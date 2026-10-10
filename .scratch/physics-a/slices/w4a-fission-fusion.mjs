// W4a: aphys.nuclear.fission-fusion — fission and fusion and binding energy per nucleon, ΔE = c²Δm, chain reactions,
// moderator / control rods / coolant in outline, fusion conditions in stars.
import { concept, P, t, chk, DATA, sfStr, dpStr, sciTex, sciPlain, pctUnc, table } from "../lib.mjs";

const { u, c, e, NA } = DATA;
const mn = 1.008665, MeVu = 931.5;

concept("aphys.nuclear.fission-fusion", { file: "nuclear/fission-fusion", keyPrefix: "nuclear.fission-fusion" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is nuclear fusion?",
    options: [
      ["the joining of two light nuclei to form a heavier nucleus", "Correct."],
      ["the splitting of a heavy nucleus into two lighter nuclei", "This is fission."],
      ["the emission of an alpha particle by a heavy nucleus", "This is alpha decay."],
      ["the absorption of a neutron by a nucleus without splitting", "This is neutron capture."],
    ],
    answer: "A",
    explanation: "Fusion joins light nuclei; fission splits heavy ones.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the function of the moderator in a thermal fission reactor?",
    options: [
      ["to slow down the neutrons so that they are more likely to cause fission", "Correct."],
      ["to absorb neutrons so that the reaction rate is controlled", "This is the job of the control rods."],
      ["to carry thermal energy away from the core", "This is the coolant."],
      ["to stop gamma radiation leaving the reactor", "This is the shielding."],
    ],
    answer: "A",
    explanation: "Fast neutrons lose energy in collisions with light moderator nuclei (water, graphite); slow neutrons cause fission in U-235 far more readily.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Control rods are lowered further into a reactor core. What is the effect?",
    options: [
      ["More neutrons are absorbed, so the rate of fission decreases.", "Correct."],
      ["More neutrons are slowed down, so the rate of fission increases.", "Slowing is done by the moderator; control rods absorb."],
      ["The fuel is cooled, so the rate of fission decreases.", "Control rods do not cool the fuel."],
      ["Fewer neutrons are absorbed, so the rate of fission increases.", "Inserting the rods increases absorption."],
    ],
    answer: "A",
    explanation: "Boron or cadmium in the rods absorbs neutrons, reducing the number available to cause further fissions.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why does fusion require a very high temperature?",
    options: [
      ["The nuclei need large kinetic energies to overcome their electrostatic repulsion.", "Correct: they must come within range of the strong force."],
      ["Fusion reactions absorb energy, which must be supplied as heat.", "Fusion of light nuclei releases energy."],
      ["High temperature increases the binding energy per nucleon of the reactants.", "Binding energy does not depend on temperature."],
      ["The electrons must be removed so that the nuclei can attract each other.", "Bare nuclei still repel; they are all positive."],
    ],
    answer: "A",
    explanation: "Two positive nuclei repel; only at about 10⁷ K or more do enough of them move fast enough to get within about 10⁻¹⁵ m, where the strong force acts.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: t`Complete the fission equation: ${"$"}{}^{1}_{0}\text{n} + {}^{235}_{92}\text{U} \rightarrow {}^{140}_{55}\text{Cs} + {}^{93}_{37}\text{Rb} + x\,{}^{1}_{0}\text{n}$. What is x?`,
    options: [
      ["3", "Correct: 236 − 140 − 93 = 3."],
      ["2", "Count the incoming neutron: the total before is 236."],
      ["4", "Nucleon number would not balance."],
      ["1", "Too few: the nucleon numbers would not balance."],
    ],
    answer: "A",
    explanation: "Nucleon number: 1 + 235 = 140 + 93 + x, so x = 3. Charge: 92 = 55 + 37 ✓.",
    hints: ["Include the neutron that causes the fission."],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which statement correctly explains why fission of uranium releases energy?",
    options: [
      ["The fragments have a greater binding energy per nucleon, so their total mass is less than that of the reactants.", "Correct."],
      ["The fragments have a smaller binding energy per nucleon, so energy stored in the bonds is released.", "Smaller binding energy per nucleon would require energy input."],
      ["The neutrons released carry away the uranium's binding energy.", "The neutrons carry only part of the kinetic energy; this does not explain the release."],
      ["Uranium has more protons than the fragments, so its electrostatic energy is converted to mass.", "Mass decreases; energy is released, not converted into mass."],
    ],
    answer: "A",
    explanation: "Moving towards the peak of the binding-energy curve: total binding energy increases, mass decreases by ΔE/c².",
    hints: ["Use the binding-energy-per-nucleon curve."],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is a sample of uranium-235 smaller than the critical mass unable to sustain a chain reaction?",
    options: [
      ["Too many neutrons escape through its surface before causing fission.", "Correct: surface-to-volume ratio is large for small samples."],
      ["It contains too few neutrons to start fission.", "Neutrons are produced by the fissions themselves."],
      ["Small samples cannot reach a high enough temperature.", "Fission does not need a high temperature."],
      ["The fragments are too light to release energy.", "The fragments are the same whatever the size of the sample."],
    ],
    answer: "A",
    explanation: "In a small sample a large fraction of neutrons leave through the surface, so on average fewer than one goes on to cause another fission.",
    hints: ["Think about neutrons leaving the sample."],
  });
  {
    const per = (17.6 / 5) / (200 / 236);
    b.mcq({
      d: 4, skill: "ANALYSIS",
      stem: "A deuterium-tritium fusion releases 17.6 MeV, and a uranium-235 fission releases about 200 MeV. Which statement is correct?",
      options: [
        [t`Fusion releases about $${sfStr(per, 1)}$ times as much energy per nucleon of fuel as fission.`, "Correct: 17.6/5 ≈ 3.5 MeV against 200/236 ≈ 0.85 MeV."],
        ["Fission releases more energy per kilogram of fuel because 200 MeV is more than 17.6 MeV.", "Per reaction yes, but per nucleon (per kg) fusion releases more."],
        ["Fusion and fission release the same energy per kilogram.", "Fusion releases roughly four times as much per nucleon."],
        [t`Fusion releases about $${sfStr(200 / 17.6, 2)}$ times less energy per kilogram than fission.`, "This compares single reactions, not equal masses of fuel."],
      ],
      answer: "A",
      explanation: t`Per nucleon: fusion $17.6/5 = 3.5\ \text{MeV}$, fission $200/236 = 0.85\ \text{MeV}$, ratio about $${sfStr(per, 1)}$.`,
      hints: ["Divide each energy by the number of nucleons in the reactants."],
    });
  }
  // Numerical
  {
    const before = mn + 235.04393, after = 143.922953 + 89.919517 + 3 * mn; // Ba-144, Kr-89
    const dm = before - after;
    const E = dm * MeVu;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`In the fission ${"$"}{}^{1}_{0}\text{n} + {}^{235}_{92}\text{U} \rightarrow {}^{144}_{56}\text{Ba} + {}^{89}_{36}\text{Kr} + 3\,{}^{1}_{0}\text{n}$, the masses are: neutron $1.008665\ \text{u}$, U-235 $235.043930\ \text{u}$, Ba-144 $143.922953\ \text{u}$, Kr-89 $89.919517\ \text{u}$. Calculate the energy released, in MeV, to three significant figures. ($1\ \text{u} \equiv 931.5\ \text{MeV}$.)`,
      value: E, unit: "MeV", wrong: [(235.04393 - 143.922953 - 89.919517) * MeVu, (before - (143.922953 + 89.919517 + mn)) * MeVu],
      explanation: t`1. Before: $1.008665 + 235.043930 = ${dpStr(before, 6)}\ \text{u}$.
2. After: $143.922953 + 89.919517 + 3(1.008665) = ${dpStr(after, 6)}\ \text{u}$.
3. $\Delta m = ${dpStr(dm, 6)}\ \text{u}$; $\Delta E = ${dpStr(dm, 6)} \times 931.5 = ${sfStr(E, 3)}\ \text{MeV}$. Leaving out the neutrons gives the wrong mass change.`,
      hints: ["Count all the neutrons on both sides."],
    });
  }
  {
    const dmu = 2 * 2.014102 - 3.016049 - 1.007825; // D + D → T + H-1 (atomic masses)
    const E = dmu * u * c ** 2;
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: t`In one branch of deuterium-deuterium fusion, two deuterium nuclei form a tritium nucleus and a proton, and the total mass decreases by $0.004330\ \text{u}$. Calculate the energy released, in J, to three significant figures. ($1\ \text{u} = 1.66 \times 10^{-27}\ \text{kg}$.)`,
      value: E, unit: "J", answer: sciPlain(E), wrong: [dmu * c ** 2],
      explanation: t`$\Delta m = 0.004330 \times 1.66 \times 10^{-27} = ${sciTex(dmu * u)}\ \text{kg}$; $\Delta E = \Delta m\,c^2 = ${sciTex(E)}\ \text{J}$ (about 4.0 MeV).`,
    });
  }
  {
    const P = 2.2e9, Ef = 200e6 * e;
    const rate = P / Ef;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A nuclear reactor core produces thermal power of $2.2\ \text{GW}$. Each fission of uranium-235 releases $200\ \text{MeV}$. Calculate the number of fissions per second, to two significant figures.`,
      value: rate, sf: 2, answer: sciPlain(rate, 2), wrong: [P / 200e6, P / (200 * e)],
      explanation: t`1. Energy per fission: $200 \times 10^{6} \times 1.60 \times 10^{-19} = ${sciTex(Ef, 2)}\ \text{J}$.
2. Fissions per second $= P/E = 2.2 \times 10^{9}/${sciTex(Ef, 2)} = ${sciTex(rate, 2)}\ \text{s}^{-1}$.`,
      hints: ["Convert MeV to J."],
    });
  }
  {
    const P = 3.0e9, Ef = 200e6 * e;
    const massPerDay = ((P / Ef) * 86400 * 0.235) / NA;
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`For the reactor in which fissions release $200\ \text{MeV}$ each and the thermal power is $3.0\ \text{GW}$, calculate the mass of uranium-235 used per day, in kg, to two significant figures. (Molar mass of U-235 $= 0.235\ \text{kg mol}^{-1}$, $N_A = 6.02 \times 10^{23}\ \text{mol}^{-1}$.)`,
      value: massPerDay, sf: 2, unit: "kg", wrong: [((P / Ef) * 86400 * 235) / NA, ((P / Ef) * 0.235) / NA],
      explanation: t`1. Fissions per second: $${sciTex(P / Ef, 2)}$; per day: $\times 86400 = ${sciTex((P / Ef) * 86400, 2)}$.
2. Moles: $${sciTex((P / Ef) * 86400, 2)} \div 6.02 \times 10^{23} = ${sfStr(((P / Ef) * 86400) / NA, 2)}\ \text{mol}$.
3. Mass: $\times 0.235 = ${sfStr(massPerDay, 2)}\ \text{kg}$ per day. Using 235 g as 235 kg gives a value 1000 times too large.`,
      hints: ["Find the number of nuclei used per day first."],
    });
  }
  {
    const dE = 17.6, ddE = 0.1;
    b.num({
      d: 3, skill: "EVALUATION", calculator: true,
      stem: t`The mass decrease in a fusion reaction is $0.01888 \pm 0.00002\ \text{u}$. Calculate the percentage uncertainty in the energy released, to one significant figure.`,
      value: pctUnc(0.00002, 0.01888), sf: 1, unit: "%", wrong: [0.00002 / 0.01888],
      explanation: t`$\Delta E \propto \Delta m$, so the percentage uncertainty is $0.00002/0.01888 \times 100 = ${sfStr(pctUnc(0.00002, 0.01888), 1)}\%$ (the conversion factor is taken as exact).`,
      hints: ["ΔE is proportional to Δm."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In both fission and fusion, the total mass of the products is less than the total mass of the reactants.",
    answer: true,
    explanation: "True. Energy is released in both, so mass decreases by ΔE/c².",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each part of a thermal fission reactor with its function.",
    pairs: [
      ["moderator", "slows neutrons down"],
      ["control rods", "absorb neutrons"],
      ["coolant", "transfers thermal energy to the heat exchanger"],
      ["concrete shield", "absorbs neutrons and gamma radiation escaping the core"],
    ],
    explanation: "Moderator slows; control rods absorb; coolant removes heat; shielding protects.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements.",
    template: "A chain reaction occurs when {{blank:a}} released by one fission go on to cause further fissions. Fusion in stars is possible because the very high {{blank:b}} gives nuclei enough kinetic energy to overcome their electrostatic {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["neutrons"], choices: ["neutrons", "protons", "electrons"] },
      { id: "b", accepted: ["temperature"], choices: ["temperature", "binding energy", "half-life"] },
      { id: "c", accepted: ["repulsion"], choices: ["repulsion", "attraction", "binding"] },
    ],
    explanation: "Neutron chain reaction; high temperature overcomes Coulomb repulsion.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe what happens in the induced fission of uranium-235 and explain how a chain reaction can occur.",
    points: [
      "A slow (thermal) neutron is absorbed by a U-235 nucleus (forming unstable U-236).",
      "The nucleus splits into two smaller nuclei (fission fragments) of similar mass, releasing energy (mostly as kinetic energy of the fragments).",
      "Two or three neutrons are also released.",
      "If on average at least one of these causes a further fission, the reaction becomes self-sustaining: a chain reaction.",
    ],
    modelAnswer: "A slow neutron is absorbed by a uranium-235 nucleus, which becomes unstable uranium-236 and splits into two medium-mass fragments, releasing about 200 MeV, mostly as kinetic energy of the fragments, together with two or three fast neutrons. If at least one of these neutrons (after slowing) causes another fission, each fission triggers another and the process sustains itself as a chain reaction.",
    explanation: "Absorb, split, neutrons, chain.",
    hints: ["What does each fission release that can cause another?"],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why fusion of hydrogen nuclei occurs in the core of the Sun but not in its outer layers.",
    points: [
      "The core is at a very high temperature (about 10⁷ K), so nuclei move fast enough to overcome electrostatic repulsion.",
      "The core has a very high density (pressure, due to gravity), so collisions are frequent.",
      "The outer layers are much cooler and less dense, so too few nuclei have enough energy and collisions are rare.",
    ],
    modelAnswer: "In the core the temperature is about 10⁷ K, so hydrogen nuclei move fast enough to overcome their mutual repulsion and come within range of the strong force, and gravity compresses the gas to a very high density so that collisions are frequent. The outer layers are far cooler and less dense, so fusion there is negligible.",
    explanation: "Temperature and density.",
    hints: ["Two conditions are needed."],
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 2,
    stem: "State why fusion power stations are difficult to build, and how a star overcomes the same problem.",
    points: ["The fuel must be a plasma at over 10⁸ K, which cannot touch any material container, so it must be confined (by strong magnetic fields), which is technically very hard.", "In a star, gravity confines the hot, dense plasma."],
    modelAnswer: "The fuel must be heated to over 100 million kelvin, forming a plasma that would destroy any container, so it has to be held by strong magnetic fields, which is very difficult to sustain. In a star, gravity holds the hot plasma together.",
    explanation: "Confinement.",
  });
  // Practice structured
  {
    const mD = 2.014102, mHe3 = 3.016029;
    const dmu = 2 * mD - mHe3 - mn;
    const EJ = dmu * u * c ** 2;
    const Pw = 500e6;
    const rate = Pw / EJ;
    const massD = (2 * rate * 86400 * 2.0e-3) / NA; // kg of deuterium per day (two D per reaction)
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A design study for a fusion power plant considers the reaction ${"$"}{}^{2}_{1}\text{H} + {}^{2}_{1}\text{H} \rightarrow {}^{3}_{2}\text{He} + {}^{1}_{0}\text{n}$. Masses: deuterium $2.014102\ \text{u}$, helium-3 $3.016029\ \text{u}$, neutron $1.008665\ \text{u}$. ($1\ \text{u} = 1.66 \times 10^{-27}\ \text{kg}$.)`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the mass decrease in one reaction, in u, to four significant figures.", value: dmu, sf: 4, unit: "u", wrong: [2 * mD - mHe3], explanation: t`$2(2.014102) - (3.016029 + 1.008665) = ${dpStr(dmu, 6)}\ \text{u}$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the energy released in one reaction, in J, to three significant figures.", value: EJ, unit: "J", answer: sciPlain(EJ), wrong: [dmu * c ** 2], explanation: t`$${dpStr(dmu, 6)} \times 1.66 \times 10^{-27} \times (3.00 \times 10^{8})^2 = ${sciTex(EJ)}\ \text{J}$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`The plant is to produce $500\ \text{MW}$ of thermal power. Calculate the number of reactions needed per second, to two significant figures.`, value: rate, sf: 2, answer: sciPlain(rate, 2), wrong: [Pw / (dmu * MeVu)], explanation: t`$500 \times 10^{6}/${sciTex(EJ)} = ${sciTex(rate, 2)}\ \text{s}^{-1}$.` }),
        P.num({ label: "(d)", marks: 2, stem: t`Calculate the mass of deuterium used per day, in kg, to two significant figures, remembering that each reaction uses two deuterium nuclei (molar mass of deuterium $2.0 \times 10^{-3}\ \text{kg mol}^{-1}$, $N_A = 6.02 \times 10^{23}\ \text{mol}^{-1}$).`, value: massD, sf: 2, unit: "kg", wrong: [(rate * 86400 * 2.0e-3) / NA], explanation: t`Reactions per day $= ${sciTex(rate * 86400, 2)}$; deuterium nuclei: twice this; moles $= ${sciTex((2 * rate * 86400) / NA, 2)}$; mass $= ${sciTex((2 * rate * 86400) / NA, 2)} \times 2.0 \times 10^{-3} = ${sfStr(massD, 2)}\ \text{kg}$. Forgetting that each reaction uses two nuclei halves the answer.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain, in terms of binding energy per nucleon, why this reaction releases energy.", points: ["Helium-3 has a greater binding energy per nucleon (about 2.6 MeV) than deuterium (about 1.1 MeV).", "So the total binding energy increases and the mass decreases; the difference appears as kinetic energy of the products."], modelAnswer: "The nucleons in helium-3 are more tightly bound (about 2.6 MeV per nucleon) than in deuterium (about 1.1 MeV per nucleon), so the total binding energy rises; the products therefore have less mass, and the mass difference is released as kinetic energy of the helium-3 nucleus and the neutron." }),
        P.manual({ label: "(f)", marks: 2, stem: "Suggest one advantage and one difficulty of fusion power compared with fission power.", points: ["Advantage: abundant fuel (deuterium from sea water) / no long-lived highly radioactive fission products / no runaway chain reaction / more energy per kilogram of fuel.", "Difficulty: the plasma must be heated above 10⁸ K and confined (by magnetic fields) long enough at high density, which has not yet been achieved economically; or neutrons make the reactor structure radioactive."], modelAnswer: "Fusion fuel such as deuterium is abundant and the products are not long-lived fission waste, but the fuel must be heated to over 100 million kelvin and confined by magnetic fields at high density, which is extremely difficult to sustain." }),
      ],
      explanation: "Δm from masses, ΔE = c²Δm, rate = P/ΔE, then moles and mass.",
      hints: ["Find the energy per reaction in joules first."],
    });
  }
  {
    const before = mn + 235.04393, after = 139.921640 + 93.915361 + 2 * mn; // Xe-140, Sr-94
    const dm = before - after;
    const E = dm * MeVu;
    b.struct({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Another fission of uranium-235 is ${"$"}{}^{1}_{0}\text{n} + {}^{235}_{92}\text{U} \rightarrow {}^{140}_{54}\text{Xe} + {}^{94}_{Z}\text{Sr} + x\,{}^{1}_{0}\text{n}$. Masses: neutron $1.008665\ \text{u}$, U-235 $235.043930\ \text{u}$, Xe-140 $139.921640\ \text{u}$, Sr-94 $93.915361\ \text{u}$.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "State the value of Z.", value: 38, wrong: [36], explanation: "92 = 54 + Z, so Z = 38." }),
        P.num({ label: "(b)", marks: 1, stem: "State the value of x.", value: 2, wrong: [3], explanation: "1 + 235 = 140 + 94 + x, so x = 2." }),
        P.num({ label: "(c)", marks: 2, stem: t`Calculate the energy released, in MeV, to three significant figures ($1\ \text{u} \equiv 931.5\ \text{MeV}$).`, value: E, unit: "MeV", wrong: [(235.04393 - 139.92164 - 93.915361) * MeVu], explanation: t`$\Delta m = ${dpStr(before, 6)} - ${dpStr(after, 6)} = ${dpStr(dm, 6)}\ \text{u}$; $\Delta E = ${sfStr(E, 3)}\ \text{MeV}$.` }),
        P.manual({ label: "(d)", marks: 2, stem: "State the form in which most of this energy first appears, and explain why the spent fuel is highly radioactive.", points: ["As kinetic energy of the fission fragments (which becomes thermal energy of the fuel).", "The fragments are neutron-rich (unstable), so they decay, mainly by beta-minus emission (with gamma)."], modelAnswer: "Most of the energy appears as kinetic energy of the two fragments, which is shared with the fuel as thermal energy. The fragments have too many neutrons for their size, so they are unstable and decay by beta-minus and gamma emission, making spent fuel highly radioactive." }),
      ],
      explanation: "Balance A and Z; Δm × 931.5 MeV; fragments are neutron-rich.",
      hints: ["Balance the charge to find Z."],
    });
  }
  b.card("DEFINITION", "**Nuclear fission**", "The splitting of a heavy nucleus into two medium nuclei, with 2-3 neutrons and energy released.");
  b.card("DEFINITION", "**Nuclear fusion**", "The joining of two light nuclei into a heavier nucleus, releasing energy.");
  b.card("CONCEPT", "Why both release energy", "Products have higher binding energy per nucleon (nearer the peak at A ≈ 56), so mass decreases: ΔE = c²Δm.");
  b.card("CONCEPT", "Chain reaction", "Neutrons from one fission cause further fissions; steady when on average exactly one does.");
  b.card("FACT", "Moderator", "Slows fast neutrons (water or graphite) so they cause fission more readily.");
  b.card("FACT", "Control rods", "Absorb neutrons (boron or cadmium) to control the fission rate.");
  b.card("CONCEPT", "Fusion conditions", "Very high temperature (to overcome electrostatic repulsion) and high density (frequent collisions).");
  b.card("FACT", "Energy per reaction", "Fission of U-235 about 200 MeV; D-T fusion 17.6 MeV, but more per nucleon.");
});
