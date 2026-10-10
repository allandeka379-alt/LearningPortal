// W1a: atoms.particles-isotopes — the nuclear atom, sub-atomic particles, deflection, isotopes, radius trends.
import { concept, P, t, chk } from "../lib.mjs";

const counts = (A, Z, q) => ({ p: Z, n: A - Z, e: Z - q });

concept("achem.atoms.particles-isotopes", { file: "atoms/particles-isotopes", keyPrefix: "atoms.particles-isotopes" }, (b) => {
  // ---- MCQs
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement about the distribution of mass and charge in an atom is correct?",
    options: [
      ["Nearly all the mass and all the positive charge are in the nucleus.", "Correct: protons and neutrons (relative mass 1 each) are in the nucleus; electrons have a relative mass of only 1/1836."],
      ["The mass is spread evenly through the atom, with the positive charge in the nucleus.", "The mass is concentrated in the tiny nucleus; the rest of the atom is mostly empty space."],
      ["Nearly all the mass is in the nucleus, but the positive charge is in the shells.", "The shells contain electrons, which carry negative charge; the protons (positive) are in the nucleus."],
      ["Half the mass is in the nucleus and half is carried by the electrons.", "An electron has 1/1836 of the mass of a proton, so electrons contribute almost nothing to the mass."],
    ],
    answer: "A",
    explanation: "The nucleus contains the protons and neutrons, so it holds almost all of the mass and all of the positive charge. The electrons, with negligible mass, occupy the much larger volume around it.",
  });
  {
    const c = counts(79, 34, -2);
    b.mcq({
      d: 2, skill: "APPLICATION", daily: true,
      stem: t`How many protons, neutrons and electrons are there in one $\ce{^{79}_{34}Se^2-}$ ion?`,
      options: [
        [`${c.p} protons, ${c.n} neutrons, ${c.e} electrons`, "Correct: neutrons = 79 − 34; a 2− ion has gained two electrons, so 34 + 2."],
        [`${c.p} protons, ${c.n} neutrons, ${c.p - 2} electrons`, "A negative ion has gained electrons, not lost them."],
        [`${c.p} protons, ${79} neutrons, ${c.e} electrons`, "79 is the nucleon number (protons + neutrons), not the number of neutrons."],
        [`${c.e} protons, ${c.n} neutrons, ${c.p} electrons`, "The charge changes the number of electrons only; the proton number stays 34."],
      ],
      answer: "A",
      explanation: t`Protons $= Z = 34$; neutrons $= A - Z = 79 - 34 = ${c.n}$; electrons $= 34 + 2 = ${c.e}$ because the ion carries a 2− charge.`,
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Beams of protons, neutrons and electrons, all moving at the same speed, pass between two oppositely charged plates. Which row describes what happens?",
    options: [
      ["Electrons bend strongly to the positive plate; protons bend slightly to the negative plate; neutrons go straight on.", "Correct: direction from the sign of the charge, size from charge ÷ mass (the electron's mass is 1/1836 of the proton's)."],
      ["Electrons bend slightly to the positive plate; protons bend strongly to the negative plate; neutrons go straight on.", "The sizes are reversed: the much lighter electron is deflected far more."],
      ["Electrons bend strongly to the negative plate; protons bend slightly to the positive plate; neutrons go straight on.", "Opposite charges attract: electrons move towards the positive plate."],
      ["Electrons and protons bend equally to opposite plates; neutrons bend slightly towards the negative plate.", "The charges are equal in size, but the masses are not; neutrons have no charge, so they are not deflected."],
    ],
    answer: "A",
    explanation: "The deflection is towards the oppositely charged plate and its size is proportional to charge ÷ mass. Electron and proton charges have the same size, but the electron is 1836 times lighter, so it is deflected much more. Neutrons are uncharged and pass straight through.",
  });
  b.mcq({
    d: 4, skill: "APPLICATION",
    stem: t`Beams of the ions $\ce{^{1}H+}$, $\ce{^{2}H+}$, $\ce{^{4}He^2+}$ and $\ce{^{7}Li+}$ travel at the same speed through the same electric field. Which ion is deflected through the **smallest** angle?`,
    options: [
      [t`$\ce{^{7}Li+}$`, "Correct: charge ÷ mass = 1/7 ≈ 0.14, the smallest of the four."],
      [t`$\ce{^{4}He^2+}$`, "Charge ÷ mass = 2/4 = 0.5: the 2+ charge doubles the force."],
      [t`$\ce{^{2}H+}$`, "Charge ÷ mass = 1/2 = 0.5, the same as He²⁺."],
      [t`$\ce{^{1}H+}$`, "Charge ÷ mass = 1/1 = 1: this is deflected the most, not the least."],
    ],
    answer: "A",
    hints: ["Work out charge ÷ mass for each ion.", "The smaller the ratio, the smaller the deflection."],
    explanation: "Deflection is proportional to charge/mass: H⁺ 1, ²H⁺ 0.5, He²⁺ 0.5, Li⁺ 1/7 ≈ 0.14. The lithium ion has the smallest ratio, so it is deflected least.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: t`Why do the isotopes $\ce{^{10}B}$ and $\ce{^{11}B}$ have the same chemical properties?`,
    options: [
      ["They have the same number of electrons arranged in the same way.", "Correct: chemical reactions involve electrons, and the electron configuration depends only on the proton number."],
      ["They have the same number of neutrons in the nucleus.", "Isotopes differ in their numbers of neutrons (5 and 6 here)."],
      ["They have the same nucleon number.", "Their nucleon numbers are 10 and 11, which are different."],
      ["They have the same density and the same rate of diffusion.", "These mass-dependent physical properties differ slightly between isotopes."],
    ],
    answer: "A",
    explanation: "Both atoms have 5 protons and therefore 5 electrons in the configuration 1s² 2s² 2p¹. Chemistry depends on electrons, so the reactions are the same; only mass-dependent properties differ.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which list shows the ions in order of **decreasing** radius?",
    options: [
      [t`$\ce{O^2-}$, $\ce{F-}$, $\ce{Na+}$, $\ce{Mg^2+}$`, "Correct: all have 10 electrons; the radius falls as the nuclear charge rises from 8 to 12."],
      [t`$\ce{Mg^2+}$, $\ce{Na+}$, $\ce{F-}$, $\ce{O^2-}$`, "This is increasing radius: Mg²⁺ has the greatest nuclear charge and is the smallest."],
      [t`$\ce{Na+}$, $\ce{Mg^2+}$, $\ce{O^2-}$, $\ce{F-}$`, "Cations of Period 3 elements here have the same two shells as the anions, but a larger nuclear charge, so they are smaller."],
      [t`$\ce{F-}$, $\ce{O^2-}$, $\ce{Mg^2+}$, $\ce{Na+}$`, "Oxygen has fewer protons than fluorine, so O²⁻ is larger than F⁻; likewise Na⁺ is larger than Mg²⁺."],
    ],
    answer: "A",
    hints: ["Count the electrons in each ion.", "For the same number of electrons, more protons pull them closer."],
    explanation: "The ions are isoelectronic (2,8). Proton numbers: O 8, F 9, Na 11, Mg 12. More protons attract the same electron arrangement more strongly, so the radius decreases O²⁻ > F⁻ > Na⁺ > Mg²⁺.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Statements about atomic radius:\n\n1. Atomic radius decreases from sodium to chlorine because the nuclear charge increases while shielding stays about the same.\n2. Atomic radius increases down Group 1 because each element has an extra occupied shell.\n3. A chloride ion is larger than a chlorine atom because the chloride ion has an extra proton.\n\nWhich of the statements are correct?",
    options: [
      ["1 and 2 only", "Correct: statements 1 and 2 give the right trend and reason; statement 3 is wrong because Cl⁻ has an extra electron, not a proton."],
      ["1, 2 and 3", "Statement 3 is wrong: forming an ion never changes the number of protons."],
      ["2 and 3 only", "Statement 1 is correct, and statement 3 is wrong."],
      ["1 only", "Statement 2 is also correct: the extra shell outweighs the extra nuclear charge."],
    ],
    answer: "A",
    hints: ["Check each reason, not just each trend."],
    explanation: "Across a period: more protons, same shell, similar shielding → smaller atoms. Down a group: more shells → larger atoms. Cl⁻ is larger than Cl because it has gained an electron, increasing electron-electron repulsion with the same nuclear charge.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: t`Statements about the species $\ce{^{40}_{20}Ca^2+}$ and $\ce{^{40}_{18}Ar}$:

1. They have the same number of electrons.
2. They have the same nucleon number.
3. They have the same number of neutrons.

Which of the statements are correct?`,
    options: [
      ["1 and 2 only", "Correct: both have 18 electrons and nucleon number 40; neutrons are 20 (Ca) and 22 (Ar)."],
      ["1, 2 and 3", "Statement 3 is wrong: calcium has 40 − 20 = 20 neutrons, argon 40 − 18 = 22."],
      ["2 and 3 only", "Statement 1 is correct (18 electrons each) and statement 3 is wrong."],
      ["1 only", "Statement 2 is also correct: both nucleon numbers are 40."],
    ],
    answer: "A",
    explanation: "Ca²⁺: 20 protons, 20 neutrons, 18 electrons. Ar: 18 protons, 22 neutrons, 18 electrons. Same electron count and same nucleon number (40), different neutron counts.",
  });

  // ---- numerical
  {
    const c = counts(65, 30, 2);
    b.num({
      d: 1, skill: "RECALL",
      stem: t`How many electrons are there in one $\ce{^{65}_{30}Zn^2+}$ ion?`,
      value: chk(c.e, 28), wrong: [32, 35],
      explanation: "Zinc has 30 protons; the 2+ ion has lost two electrons: 30 − 2 = 28.",
    });
  }
  {
    const c = counts(127, 53, -1);
    b.num({
      d: 2, skill: "APPLICATION", daily: true,
      stem: t`Iodine-127 forms the iodide ion, $\ce{^{127}_{53}I-}$. How many neutrons does one iodide ion contain?`,
      value: chk(c.n, 74), wrong: [75, 53],
      explanation: "Neutrons = nucleon number − proton number = 127 − 53 = 74. The charge changes the electrons, not the neutrons.",
    });
  }
  {
    // An ion with 26 protons, 30 neutrons, 24 electrons: charge and nucleon number
    const Z = 26, N = 30, E = 24;
    b.num({
      d: 2, skill: "APPLICATION",
      stem: "An ion contains 26 protons, 30 neutrons and 24 electrons. What is its nucleon number?",
      value: chk(Z + N, 56), wrong: [50, 80],
      explanation: `Nucleon number = protons + neutrons = 26 + 30 = 56. (The ion is ⁵⁶Fe²⁺: 26 protons make it iron, and ${Z - E} electrons have been lost.)`,
    });
  }
  // ---- true/false
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A neutron beam passing between charged plates is deflected towards the negative plate.",
    answer: false,
    explanation: "False. Neutrons are uncharged, so they feel no force in an electric field and are not deflected.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: t`Heavy water, $\ce{D2O}$, is denser than ordinary water, $\ce{H2O}$, but reacts with sodium in the same way.`,
    answer: true,
    explanation: "True. Deuterium has a neutron that ordinary hydrogen lacks, so D₂O molecules are heavier (higher density), but the electron arrangement is the same, so the chemical reactions are the same.",
  });
  // ---- matching
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each comparison with the main reason for it.",
    pairs: [
      [t`$\ce{K}$ atom is larger than $\ce{Na}$ atom`, "an extra occupied electron shell"],
      [t`$\ce{Cl}$ atom is smaller than $\ce{Na}$ atom`, "greater nuclear charge with similar shielding"],
      [t`$\ce{S^2-}$ ion is larger than $\ce{S}$ atom`, "more electron-electron repulsion, same nuclear charge"],
      [t`$\ce{Na+}$ ion is smaller than $\ce{Na}$ atom`, "one fewer occupied shell"],
    ],
    explanation: "Down a group a shell is added; across a period the nuclear charge rises with little change in shielding; gaining electrons increases repulsion; Na⁺ has lost its whole third shell.",
  });
  // ---- fill in the blank
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "Isotopes are atoms of the same element with the same number of {{blank:a}} but different numbers of {{blank:b}}. They have the same {{blank:c}} properties.",
    blanks: [
      { id: "a", accepted: ["protons"], choices: ["protons", "neutrons", "nucleons", "electron shells"] },
      { id: "b", accepted: ["neutrons"], choices: ["protons", "neutrons", "electrons", "orbitals"] },
      { id: "c", accepted: ["chemical"], choices: ["chemical", "physical", "nuclear", "mass-dependent"] },
    ],
    explanation: "Same proton number, different neutron number; same electron arrangement, so the same chemical properties.",
  });
  // ---- short
  b.short({
    d: 2, skill: "APPLICATION",
    stem: "A species has 38 protons, 50 neutrons and 36 electrons. Give its symbol with its charge (for example Na+ or O2-).",
    accepted: ["Sr2+", "Sr^2+", "Sr 2+", "Sr²⁺", "strontium ion", "strontium(II) ion"],
    wrong: ["Kr", "Sr2-"],
    explanation: "38 protons identifies strontium. Two fewer electrons than protons gives a 2+ charge: Sr²⁺ (⁸⁸Sr²⁺, since 38 + 50 = 88).",
  });
  // ---- self-marked
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why a beam of electrons is deflected more than a beam of protons travelling at the same speed between the same charged plates, and in the opposite direction.",
    points: [
      "The charges are equal in size but opposite in sign (−1 and +1), so they are attracted to opposite plates (electrons to the positive plate)",
      "The electron's mass is much smaller (about 1/1836 of the proton's)",
      "So the electron has a much larger charge-to-mass ratio / greater acceleration for the same force, giving a larger deflection",
    ],
    modelAnswer: "Electrons (−1) are attracted to the positive plate and protons (+1) to the negative plate, so they bend in opposite directions. The forces are the same size because the charges are equal in magnitude, but the electron's mass is only about 1/1836 of the proton's, so its charge-to-mass ratio is far larger and it is deflected much more.",
    hints: ["Think about both the sign and the size of the charge, and then the mass."],
    explanation: "Deflection direction depends on the sign of the charge; deflection size on charge ÷ mass.",
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 4,
    stem: t`Explain why the atomic radius decreases from sodium to argon across Period 3, and why the radius of $\ce{Na+}$ is much smaller than that of a sodium atom.`,
    points: [
      "Across the period the nuclear charge / number of protons increases",
      "Electrons are added to the same (third) shell, so shielding stays about the same",
      "The outer electrons are attracted more strongly and pulled closer to the nucleus",
      "Na⁺ has lost its 3s electron, so it has one fewer occupied shell (and the remaining electrons are held by an unchanged nuclear charge)",
    ],
    modelAnswer: "From sodium to argon the number of protons increases by one each step, but the extra electrons enter the same third shell, so shielding by inner electrons hardly changes. The increasing nuclear charge pulls the outer electrons closer, so the atoms get smaller. Na⁺ has lost its single 3s electron and with it the whole third shell, so its outer electrons are in the second shell, much nearer the nucleus.",
    hints: ["Mention nuclear charge, shielding and distance."],
    explanation: "Nuclear charge rises with constant shielding across a period; the cation loses its outer shell.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Magnesium has three stable isotopes. State one property that is the same for all three isotopes and one property that is different, and give the reason for the difference.",
    points: [
      "Same: chemical properties / reactions (e.g. burning to MgO, reaction with acid) or number of protons or electrons",
      "Different: mass / density / rate of diffusion, because they have different numbers of neutrons",
    ],
    modelAnswer: "All three react in the same way, for example burning to form magnesium oxide, because they have 12 electrons arranged identically. Their masses (and so densities) differ because they contain 12, 13 and 14 neutrons.",
    explanation: "Same electrons → same chemistry; different neutrons → different mass-dependent physical properties.",
  });
  // ---- practice structured
  {
    const sp = [["X", 24, 12, 0], ["Y", 25, 12, 2], ["Z", 26, 12, 0], ["Q", 23, 11, 1]];
    const rows = sp.map(([s, A, Z, q]) => ({ s, ...counts(A, Z, q), A, Z, q }));
    b.struct({
      d: 4, skill: "APPLICATION",
      stem: t`The table shows the particles in four species, labelled X, Y, Z and Q.

| Species | Protons | Neutrons | Electrons |
|---|:---:|:---:|:---:|
${rows.map((r) => `| ${r.s} | ${r.p} | ${r.n} | ${r.e} |`).join("\n")}`,
      parts: [
        P.short({ label: "(a)", marks: 1, stem: "Which species is a positive ion with a charge of 2+? Give its letter.", accepted: ["Y"], wrong: ["Q"], explanation: "Y has 12 protons and 10 electrons: charge 2+." }),
        P.short({ label: "(b)", marks: 1, stem: "Which two species are isotopes of the same element (atoms, not ions)? Give both letters, for example A and B.", accepted: ["X and Z", "Z and X", "X, Z", "XZ", "X Z", "Z, X"], wrong: ["X and Y"], explanation: "X and Z both have 12 protons and are neutral, with 12 and 14 neutrons." }),
        P.num({ label: "(c)", marks: 1, stem: "State the nucleon number of species Q.", value: chk(rows[3].p + rows[3].n, 23), wrong: [11], explanation: "11 protons + 12 neutrons = 23." }),
        P.short({ label: "(d)", marks: 1, stem: "Name the element of which species Q is an ion.", accepted: ["sodium", "Na"], wrong: ["magnesium"], explanation: "11 protons identifies sodium; Q is ²³Na⁺." }),
        P.manual({ label: "(e)", marks: 2, stem: "Beams of X and Q ions (the singly charged ion of X, formed by removing one electron) travel at the same speed through an electric field. Explain which is deflected more.", points: ["Both have the same charge (+1)", "Q (²³Na⁺) has the smaller mass, so the larger charge-to-mass ratio and the larger deflection"], modelAnswer: "²⁴Mg⁺ and ²³Na⁺ both carry a +1 charge, so the force is the same; ²³Na⁺ has the smaller mass (23 against 24), so its charge-to-mass ratio is larger and it is deflected slightly more." }),
      ],
      hints: ["Use protons to name the element, electrons for the charge, protons + neutrons for the nucleon number."],
      explanation: "X = ²⁴Mg, Y = ²⁵Mg²⁺, Z = ²⁶Mg, Q = ²³Na⁺. Deflection depends on charge/mass.",
    });
  }
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: "Rudo is studying the structure of the atom. She is told that a gold atom has a radius of about 1.4 × 10⁻¹⁰ m and that its nucleus has a radius of about 7 × 10⁻¹⁵ m.",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate how many times larger the radius of the atom is than the radius of its nucleus. Give your answer to one significant figure.", value: 1.4e-10 / 7e-15, sf: 1, wrong: [2e-5], explanation: "1.4 × 10⁻¹⁰ ÷ 7 × 10⁻¹⁵ = 2 × 10⁴ (twenty thousand times)." }),
      P.manual({ label: "(b)", marks: 2, stem: "Use your answer to (a) and the relative masses of the particles to describe how mass is distributed in an atom.", points: ["The nucleus is tiny compared with the atom / the atom is mostly empty space", "Nearly all the mass is in the nucleus because protons and neutrons have relative mass 1 while electrons have 1/1836"], modelAnswer: "The nucleus is about twenty thousand times smaller in radius than the atom, so the atom is mostly empty space. Yet nearly all the mass is in the nucleus, because protons and neutrons (relative mass 1) are there, while electrons have a relative mass of only 1/1836." }),
      P.manual({ label: "(c)", marks: 3, stem: "Gold has only one stable isotope, ¹⁹⁷Au, with proton number 79. State the numbers of protons, neutrons and electrons in the ion Au³⁺.", points: ["79 protons", "118 neutrons (197 − 79)", "76 electrons (79 − 3)"], modelAnswer: "79 protons, 118 neutrons and 76 electrons." }),
    ],
    hints: ["Divide the two radii.", "Neutrons = A − Z; a 3+ ion has lost three electrons."],
    explanation: "The atom is about 2 × 10⁴ times the radius of the nucleus. Au³⁺: 79 p, 197 − 79 = 118 n, 79 − 3 = 76 e.",
    calculator: true,
  });

  // ---- flashcards
  b.card("DEFINITION", "Define **isotopes**.", "Atoms of the same element with the same number of protons but different numbers of neutrons (same proton number, different nucleon number).");
  b.card("DEFINITION", "Define **nucleon number** (mass number).", "The total number of protons and neutrons in the nucleus of an atom.");
  b.card("FACT", "Relative masses and charges of the proton, neutron and electron?", "Proton: mass 1, charge +1. Neutron: mass 1, charge 0. Electron: mass 1/1836, charge −1.");
  b.card("FORMULA", "How do you find the number of neutrons from isotope notation?", t`Neutrons $= A - Z$ (nucleon number minus proton number).`);
  b.card("CONCEPT", "Why do isotopes have the same chemical properties?", "Same number of protons → same number and arrangement of electrons; chemical reactions involve electrons.", "Mass-dependent physical properties (density, diffusion rate) differ.");
  b.card("CONCEPT", "What decides the size of deflection of a particle beam in an electric field?", "The charge-to-mass ratio: a larger charge or a smaller mass gives a larger deflection. Direction: towards the oppositely charged plate.");
  b.card("FACT", "How are electrons, protons and neutrons deflected between charged plates?", "Electrons: strongly towards the positive plate. Protons: slightly towards the negative plate. Neutrons: not deflected.");
  b.card("CONCEPT", "Why does atomic radius decrease across a period?", "Nuclear charge increases while electrons enter the same shell (similar shielding), so outer electrons are pulled closer.");
  b.card("CONCEPT", "Compare ion and atom sizes.", "Cations are smaller than their atoms (fewer shells / fewer electrons for the same nuclear charge). Anions are larger (more electron repulsion, same nuclear charge).");
});
