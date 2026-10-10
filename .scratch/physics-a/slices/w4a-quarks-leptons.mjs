// W4a: aphys.particles.quarks-leptons (Cambridge only, AS) — six quark flavours and charges, antiquarks, baryons and
// mesons, leptons, quark changes in beta decay.
import { concept, P, t, chk, DATA, sciTex, sciPlain } from "../lib.mjs";

const { e } = DATA;
const Q = { u: 2 / 3, d: -1 / 3, s: -1 / 3, c: 2 / 3, t: 2 / 3, b: -1 / 3 };
/** Charge in units of e; capital letter = antiquark. */
const ch = (s) => [...s].reduce((a, k) => a + (k === k.toUpperCase() ? -Q[k.toLowerCase()] : Q[k]), 0);

concept("aphys.particles.quarks-leptons", { file: "particles/quarks-leptons", keyPrefix: "particles.quarks-leptons" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the quark composition of a proton?",
    options: [
      ["uud", "Correct: +2/3 + 2/3 − 1/3 = +1."],
      ["udd", "This is the neutron, with zero charge."],
      ["uuu", "This would have charge +2e."],
      [t`$\text{u}\bar{\text{d}}$`, "A quark-antiquark pair is a meson (a positive pion)."],
    ],
    answer: "A",
    explanation: "Proton = uud, charge +1e; neutron = udd, charge 0.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What is the charge of an anti-down quark?",
    options: [
      [t`$+\tfrac{1}{3}e$`, "Correct: the opposite of the down quark's −1/3 e."],
      [t`$-\tfrac{1}{3}e$`, "This is the down quark itself."],
      [t`$-\tfrac{2}{3}e$`, "This is the anti-up quark."],
      [t`$+\tfrac{2}{3}e$`, "This is the up quark."],
    ],
    answer: "A",
    explanation: "Antiquarks have the opposite charge to their quarks: d̄ is +1/3 e.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which particle is a lepton?",
    options: [
      ["electron neutrino", "Correct: a fundamental particle that does not feel the strong force."],
      ["neutron", "A neutron is a baryon made of quarks (udd)."],
      ["positive pion", "A pion is a meson: a quark and an antiquark."],
      ["proton", "A proton is a baryon made of quarks (uud)."],
    ],
    answer: "A",
    explanation: "Leptons include the electron, positron and neutrinos. Protons, neutrons and pions are hadrons.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which statement about mesons is correct?",
    options: [
      ["A meson consists of one quark and one antiquark.", "Correct."],
      ["A meson consists of three quarks.", "Three quarks make a baryon."],
      ["A meson is a fundamental particle like the electron.", "Mesons are made of quarks, so they are not fundamental."],
      ["A meson is a lepton that feels the strong interaction.", "Leptons do not feel the strong interaction; mesons are hadrons."],
    ],
    answer: "A",
    explanation: "Hadrons: baryons (qqq) and mesons (qq̄).",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: t`A hadron has the quark composition $\text{s}\bar{\text{u}}$. What is its charge, and what type of hadron is it?`,
    options: [
      ["−e, a meson", "Correct: −1/3 − 2/3 = −1; quark plus antiquark."],
      ["+e, a meson", "The anti-up quark has charge −2/3 e, not +2/3 e."],
      ["+1/3 e, a baryon", "Two constituents make a meson, and the charges sum to a whole number."],
      ["−e, a baryon", "A baryon has three quarks."],
    ],
    answer: "A",
    explanation: "s: −1/3 e; ū: −2/3 e; total −e. A quark-antiquark pair is a meson (the K⁻).",
    hints: ["Reverse the sign for the antiquark."],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "In beta-minus decay, which change takes place at quark level?",
    options: [
      ["A down quark changes into an up quark.", "Correct: udd → uud."],
      ["An up quark changes into a down quark.", "This happens in beta-plus decay."],
      ["A down quark and an up quark annihilate.", "No annihilation: one quark changes flavour."],
      ["A strange quark changes into an up quark.", "Neutrons and protons contain no strange quarks."],
    ],
    answer: "A",
    explanation: "Neutron (udd) → proton (uud): d → u + e⁻ + ν̄_e.",
    hints: ["Compare the quarks of the neutron and the proton."],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which combination of quarks could NOT exist as a free particle?",
    options: [
      ["ud", "Correct: two quarks (no antiquark) give +1/3 e, not a whole-number charge; no such hadron exists."],
      ["uds", "This is a neutral baryon (the lambda), charge 0."],
      [t`$\text{d}\bar{\text{d}}$`, "A neutral meson: −1/3 + 1/3 = 0."],
      ["ddd", "This is a baryon with charge −1 (the delta-minus)."],
    ],
    answer: "A",
    explanation: "Hadrons are qqq, q̄q̄q̄ or qq̄, and always have whole-number charges. 'ud' is neither and would have charge +1/3 e.",
    hints: ["What combinations can hadrons have?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "In a beta-plus decay inside a nucleus, which statement correctly describes the change in charge at quark level?",
    options: [
      ["+2/3 e becomes −1/3 e, and the positron carries away +1 e.", "Correct: u → d + e⁺ + ν_e, total charge +2/3 e on both sides."],
      ["−1/3 e becomes +2/3 e, and the positron carries away −1 e.", "This mixes up beta-minus with the positron; a positron is +1 e."],
      ["+2/3 e becomes −1/3 e, and the neutrino carries away +1 e.", "Neutrinos are uncharged; the positron carries the charge."],
      ["The quark charge is unchanged; the positron comes from the electron shells.", "An up quark does change into a down quark; the positron is created in the decay."],
    ],
    answer: "A",
    explanation: "u (+2/3) → d (−1/3) + e⁺ (+1) + ν_e (0): +2/3 = −1/3 + 1.",
    hints: ["Which quark changes in beta-plus decay?"],
  });
  // Numerical
  {
    const v = ch("dds");
    chk(v, -1, 1e-12);
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: "A baryon consists of the quarks d, d and s. Calculate its charge in coulombs, to three significant figures. Include the sign.",
      value: v * e, unit: "C", answer: sciPlain(v * e), wrong: [e, (-1 / 3) * e],
      explanation: t`$-\tfrac{1}{3} - \tfrac{1}{3} - \tfrac{1}{3} = -1$, so $Q = -1.60 \times 10^{-19}\ \text{C}$ (the sigma-minus baryon).`,
    });
  }
  {
    const v = ch("cD");
    b.num({
      d: 3, skill: "APPLICATION",
      stem: t`A D-meson consists of a charm quark and an anti-down quark ($\text{c}\bar{\text{d}}$). State its charge in units of e.`,
      value: v, wrong: [1 / 3],
      explanation: t`c: $+\tfrac{2}{3}$; $\bar{\text{d}}$: $+\tfrac{1}{3}$; total $+1$.`,
      hints: ["The anti-down quark has charge +1/3 e."],
    });
  }
  {
    const n = 3 * 2 + 3 * 1; // uud: 2 u; udd: 1 u — count up quarks in a He-4 nucleus: 2 p + 2 n
    const ups = 2 * 2 + 2 * 1;
    const downs = 2 * 1 + 2 * 2;
    chk(ups, 6); chk(downs, 6); chk(n, 9);
    b.num({
      d: 3, skill: "ANALYSIS",
      stem: t`How many up quarks are there in a nucleus of helium-4, ${"$"}{}^{4}_{2}\text{He}$?`,
      value: ups, wrong: [4, 12],
      explanation: "Two protons (uud) contain 4 up quarks; two neutrons (udd) contain 2 more: 6 up quarks (and 6 down quarks), giving a charge of 6 × 2/3 − 6 × 1/3 = +2e.",
      hints: ["Count the protons and neutrons first."],
    });
  }
  {
    const Qp = ch("uud") * e;
    const nP = 79; // gold nucleus: 79 protons, 118 neutrons
    const ups = nP * 2 + 118;
    b.num({
      d: 4, skill: "ANALYSIS",
      stem: t`A gold-197 nucleus, ${"$"}{}^{197}_{79}\text{Au}$, contains 79 protons and 118 neutrons. Calculate the total number of up quarks it contains.`,
      value: ups, wrong: [79 * 2, 197 * 2],
      explanation: t`Each proton (uud) has 2 up quarks, each neutron (udd) has 1: $79 \times 2 + 118 \times 1 = ${ups}$. (Check: the total charge $${ups} \times \tfrac{2}{3} - ${3 * 197 - ups} \times \tfrac{1}{3} = 79$, matching $Z$; one proton has charge $${sciTex(Qp)}\ \text{C}$.)`,
      hints: ["Up quarks per proton and per neutron?"],
    });
    chk(ups * (2 / 3) - (3 * 197 - ups) / 3, 79, 1e-9);
  }
  b.tf({
    d: 2, skill: "RECALL",
    stem: "Protons and neutrons are fundamental particles.",
    answer: false,
    explanation: "False. Each is a baryon made of three quarks. Quarks and leptons are fundamental.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "An antiquark has the same mass as its quark but the opposite charge.",
    answer: true,
    explanation: "True: this is the general rule for antiparticles.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each quark with its charge.",
    pairs: [
      ["up", "+2/3 e"],
      ["down", "−1/3 e"],
      ["anti-up", "−2/3 e"],
      ["anti-down", "+1/3 e"],
    ],
    explanation: "u +2/3, d −1/3; antiquarks reverse the sign.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the classification.",
    template: "Particles made of quarks are called {{blank:a}}. Those made of three quarks are {{blank:b}}, and those made of a quark and an antiquark are {{blank:c}}. The electron and the neutrino are {{blank:d}}.",
    blanks: [
      { id: "a", accepted: ["hadrons"], choices: ["hadrons", "leptons", "nucleons"] },
      { id: "b", accepted: ["baryons"], choices: ["baryons", "mesons", "leptons"] },
      { id: "c", accepted: ["mesons"], choices: ["mesons", "baryons", "photons"] },
      { id: "d", accepted: ["leptons"], choices: ["leptons", "hadrons", "baryons"] },
    ],
    explanation: "Hadrons = baryons (qqq) + mesons (qq̄); leptons are fundamental.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name one quark, other than the up quark, that has a charge of +2/3 e.",
    accepted: ["charm", "top", "c", "t", "charm quark", "top quark"],
    explanation: "Charm and top have +2/3 e, like up. Down, strange and bottom have −1/3 e.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe beta-minus decay in terms of quarks, and show that charge is conserved.",
    points: [
      "A down quark (in a neutron) changes into an up quark, so the neutron (udd) becomes a proton (uud).",
      "An electron and an electron antineutrino are emitted.",
      "Charge: −1/3 = +2/3 + (−1) + 0.",
    ],
    modelAnswer: "In beta-minus decay a down quark in a neutron changes into an up quark, so udd becomes uud and the neutron becomes a proton. An electron and an electron antineutrino are created and emitted. Charge before: −1/3 e; after: +2/3 e − 1 e + 0 = −1/3 e.",
    explanation: "d → u + e⁻ + ν̄_e.",
    hints: ["Which quark is in the neutron but not in the proton?"],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain the difference between a hadron and a lepton, giving one example of each.",
    points: [
      "A hadron is made of quarks (feels the strong interaction), e.g. proton, neutron or pion.",
      "A lepton is fundamental (not made of quarks, does not feel the strong interaction), e.g. electron or neutrino.",
    ],
    modelAnswer: "Hadrons are composite particles made of quarks that feel the strong interaction, such as the proton. Leptons are fundamental particles that do not feel the strong interaction, such as the electron.",
    explanation: "Made of quarks versus fundamental.",
    hints: ["Which kind is made of quarks?"],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 3,
    stem: "A student claims that a particle made of two up quarks and one anti-down quark could exist. Explain why this is not possible.",
    points: [
      "Hadrons have three quarks, three antiquarks, or one quark and one antiquark.",
      "uud̄ is a mixture of two quarks and one antiquark, which is none of these.",
      "Its charge would be +2/3 + 2/3 + 1/3 = +5/3 e, not a whole number of e.",
    ],
    modelAnswer: "Hadrons can only be baryons (three quarks), antibaryons (three antiquarks) or mesons (quark and antiquark). Two quarks plus one antiquark is none of these, and its charge would be +5/3 e, which is not a whole-number multiple of e; all observed particles have whole-number charges.",
    explanation: "Allowed combinations and integer charge.",
    hints: ["Add the charges."],
  });
  // Practice structured
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Phosphorus-30, ${"$"}{}^{30}_{15}\text{P}$, decays by beta-plus emission to silicon.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "State the nucleon number of the silicon nuclide formed.", value: 30, wrong: [29], explanation: "Beta-plus decay does not change A: 30." }),
      P.num({ label: "(b)", marks: 1, stem: "State the proton number of the silicon nuclide formed.", value: 14, wrong: [16], explanation: "A proton becomes a neutron: Z = 15 − 1 = 14." }),
      P.manual({ label: "(c)", marks: 2, stem: "Describe the change that occurs at quark level, naming the leptons emitted.", points: ["An up quark changes into a down quark (a proton uud becomes a neutron udd).", "A positron and an electron neutrino are emitted."], modelAnswer: "An up quark in one of the protons changes into a down quark, turning uud into udd. A positron and an electron neutrino are emitted." }),
      P.manual({ label: "(d)", marks: 2, stem: "Show that charge is conserved in the quark change.", points: ["Before: up quark +2/3 e.", "After: down quark −1/3 e + positron +1 e + neutrino 0 = +2/3 e."], modelAnswer: "Before: +2/3 e. After: −1/3 e + 1 e + 0 = +2/3 e. Charge is conserved." }),
      P.mcq({ label: "(e)", stem: "Which pair of particles produced in this decay are both leptons?", options: [["the positron and the neutrino", "Correct: both fundamental, neither feels the strong force."], ["the positron and the silicon nucleus", "A nucleus is made of hadrons."], ["the neutron and the neutrino", "The neutron is a baryon."], ["the down quark and the positron", "Quarks are not leptons."]], answer: "A", explanation: "Leptons: electron, positron and neutrinos." }),
    ],
    explanation: "β⁺: u → d + e⁺ + ν_e; A unchanged, Z falls by 1.",
    hints: ["Beta-plus decay lowers Z by 1."],
  });
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: t`Three hadrons have the quark compositions: X = uus, Y = $\text{u}\bar{\text{s}}$, Z = $\bar{\text{u}}\bar{\text{u}}\bar{\text{d}}$.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "State the charge of X in units of e.", value: ch("uus"), wrong: [2], explanation: "+2/3 + 2/3 − 1/3 = +1." }),
      P.num({ label: "(b)", marks: 1, stem: "State the charge of Y in units of e.", value: ch("uS"), wrong: [1 / 3], explanation: t`$+\tfrac{2}{3} + \tfrac{1}{3} = +1$ (the anti-strange quark is $+\tfrac{1}{3}e$).` }),
      P.num({ label: "(c)", marks: 1, stem: "State the charge of Z in units of e.", value: ch("UUD"), wrong: [1], explanation: "−2/3 − 2/3 + 1/3 = −1: the antiproton." }),
      P.manual({ label: "(d)", marks: 2, stem: "Classify each of X, Y and Z, giving a reason.", points: ["X is a baryon (three quarks) and Z an antibaryon (three antiquarks).", "Y is a meson (one quark and one antiquark)."], modelAnswer: "X has three quarks, so it is a baryon; Z has three antiquarks, so it is an antibaryon (the antiproton). Y has a quark and an antiquark, so it is a meson." }),
      P.short({ label: "(e)", marks: 1, stem: "Name the particle whose antiparticle is Z.", accepted: ["proton", "the proton", "p"], explanation: "Z is ūūd̄, the antiparticle of uud, the proton." }),
    ],
    explanation: "Add quark charges (antiquarks reversed); three quarks = baryon, quark-antiquark = meson.",
    hints: ["Reverse the sign of each antiquark's charge."],
  });

  b.card("FACT", "Quark charges", "u, c, t: +2/3 e. d, s, b: −1/3 e. Antiquarks: opposite sign.");
  b.card("FACT", "Proton and neutron", "Proton = uud (+e); neutron = udd (0).");
  b.card("DEFINITION", "**Hadron**", "A particle made of quarks that feels the strong interaction: a baryon (three quarks) or a meson (quark + antiquark).");
  b.card("DEFINITION", "**Baryon**", "A hadron made of three quarks, e.g. the proton and neutron.");
  b.card("DEFINITION", "**Meson**", "A hadron made of one quark and one antiquark, e.g. the pion uđ̄.".replace("đ̄", "d̄"));
  b.card("DEFINITION", "**Lepton**", "A fundamental particle that does not feel the strong interaction: electron, positron, neutrinos.");
  b.card("CONCEPT", "Beta-minus at quark level", "d → u + e⁻ + ν̄_e (neutron udd → proton uud).");
  b.card("CONCEPT", "Beta-plus at quark level", "u → d + e⁺ + ν_e (proton uud → neutron udd, inside a nucleus).");
  b.card("FACT", "Fundamental particles", "Quarks and leptons are fundamental; protons, neutrons and mesons are not.");
});
