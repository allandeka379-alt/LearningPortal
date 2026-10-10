// W4a: aphys.nuclear.atom-nucleus — alpha scattering, nuclear model, Z, A, isotopes, nuclide notation, sizes, the
// unified atomic mass unit, conservation of nucleon number and charge.
import { concept, P, t, chk, DATA, sfStr, dpStr, sciTex, sciPlain, mean, halfRange, pctUnc, table } from "../lib.mjs";

const { u, e } = DATA;

concept("aphys.nuclear.atom-nucleus", { file: "nuclear/atom-nucleus", keyPrefix: "nuclear.atom-nucleus" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In the alpha-particle scattering experiment, which observation shows that most of the volume of an atom is empty space?",
    options: [
      ["Most alpha particles pass through the foil undeflected or with very small deflections.", "Correct: they meet nothing that repels them strongly."],
      ["A very small fraction of alpha particles rebound from the foil.", "This shows a small, massive, charged nucleus, not that the atom is mostly empty."],
      ["Some alpha particles are deflected through large angles.", "Large deflections show concentrated positive charge."],
      ["The alpha particles are slowed down by collisions with air molecules before they ever reach the foil.", "This is why the apparatus is evacuated; it says nothing about atoms in the foil."],
    ],
    answer: "A",
    explanation: "If most particles go straight through, they pass far from any concentrated charge or mass: most of the atom is empty space.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why did a very few alpha particles rebound through more than 90° from the gold foil?",
    options: [
      ["They passed close to a tiny region holding the positive charge and most of the mass.", "Correct: only a massive, highly charged nucleus can turn back a fast alpha particle."],
      ["They collided head-on with electrons, which carry most of the mass of the atom.", "Electrons are about 1/7000 of the alpha particle's mass and cannot turn it back."],
      ["They were attracted back by negative charge that is spread evenly through the whole atom.", "Alpha particles are repelled by the positive nucleus; spread charge gives weak fields."],
      ["They were reflected by the flat surface of the foil, as light is from a mirror.", "The particles penetrate the foil; the deflection is by individual nuclei."],
    ],
    answer: "A",
    explanation: "A very strong repulsion from a tiny, massive, positive nucleus is needed to reverse a fast alpha particle.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: t`How many neutrons are in a nucleus of ${"$"}{}^{238}_{92}\text{U}$?`,
    options: [
      ["146", "Correct: 238 − 92."],
      ["92", "This is the number of protons."],
      ["238", "This is the total number of nucleons."],
      ["330", "Neutrons are A − Z, not A + Z."],
    ],
    answer: "A",
    explanation: "N = A − Z = 238 − 92 = 146.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which pair of nuclides are isotopes of the same element?",
    options: [
      [t`${"$"}{}^{12}_{6}\text{C}$ and ${"$"}{}^{14}_{6}\text{C}$`, "Correct: same proton number, different nucleon numbers."],
      [t`${"$"}{}^{14}_{6}\text{C}$ and ${"$"}{}^{14}_{7}\text{N}$`, "Same nucleon number but different proton numbers: different elements."],
      [t`${"$"}{}^{40}_{19}\text{K}$ and ${"$"}{}^{40}_{20}\text{Ca}$`, "Different proton numbers, so different elements."],
      [t`${"$"}{}^{3}_{1}\text{H}$ and ${"$"}{}^{3}_{2}\text{He}$`, "Same nucleon number, different proton numbers."],
    ],
    answer: "A",
    explanation: "Isotopes have the same number of protons and different numbers of neutrons.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which is the best estimate of the ratio radius of an atom ÷ radius of its nucleus?",
    options: [
      [t`$10^{4}$`, "Correct: about 10⁻¹⁰ m ÷ 10⁻¹⁴ m."],
      [t`$10^{2}$`, "Far too small: the nucleus would then fill a noticeable fraction of the atom."],
      [t`$10^{8}$`, "Too large: nuclei are about 10⁻¹⁵ to 10⁻¹⁴ m, not 10⁻¹⁸ m."],
      [t`$10^{12}$`, "This is roughly the ratio of volumes, not radii."],
    ],
    answer: "A",
    explanation: "Atomic radius ≈ 10⁻¹⁰ m, nuclear radius ≈ 10⁻¹⁵ to 10⁻¹⁴ m, so the ratio is about 10⁴ to 10⁵.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: t`In the reaction ${"$"}{}^{27}_{13}\text{Al} + {}^{4}_{2}\text{He} \rightarrow {}^{30}_{15}\text{P} + \text{X}$, what is X?`,
    options: [
      ["a neutron", "Correct: A = 27 + 4 − 30 = 1, Z = 13 + 2 − 15 = 0."],
      ["a proton", "A proton has Z = 1; charge would not balance."],
      ["an alpha particle", "That would need A = 4 and Z = 2."],
      ["an electron", "An electron has A = 0, but the nucleon numbers need 1 more on the right."],
    ],
    answer: "A",
    explanation: "Nucleon number: 31 = 30 + A gives A = 1. Charge: 15 = 15 + Z gives Z = 0. X is a neutron.",
    hints: ["Balance the top numbers and the bottom numbers separately."],
  });
  {
    const Z = 79;
    const q = Z * e;
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`What is the charge on a nucleus of ${"$"}{}^{197}_{79}\text{Au}$?`,
      options: [
        [t`$${sciTex(q)}\ \text{C}$`, "Correct: Ze with Z = 79."],
        [t`$${sciTex(197 * e)}\ \text{C}$`, "This uses the nucleon number; neutrons are uncharged."],
        [t`$${sciTex((197 - Z) * e)}\ \text{C}$`, "This counts the neutrons, which carry no charge."],
        [t`$${sciTex(-q)}\ \text{C}$`, "The nucleus is positive; the electrons around it carry −79e."],
      ],
      answer: "A",
      explanation: t`$Q = Ze = 79 \times 1.60 \times 10^{-19} = ${sciTex(q)}\ \text{C}$.`,
      hints: ["Only protons carry charge in the nucleus."],
    });
  }
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "The gold foil in the scattering experiment is replaced by an aluminium foil of the same thickness. Aluminium nuclei have a much smaller charge. How does the number of alpha particles scattered through large angles change?",
    options: [
      ["It decreases, because the repulsive force near each nucleus is weaker.", "Correct: smaller nuclear charge gives smaller deflections."],
      ["It increases, because aluminium is less dense, so the particles travel further.", "Large-angle scattering depends on close encounters with charged nuclei, not on range."],
      ["It is unchanged, because the foil has the same thickness.", "Thickness is matched, but the force from each nucleus is smaller."],
      ["It increases, because aluminium nuclei are lighter and recoil more.", "Lighter nuclei recoil more and turn the alpha particles back less."],
    ],
    answer: "A",
    explanation: "The repulsion is proportional to the nuclear charge Ze. With Z = 13 instead of 79, close encounters produce smaller deflections, so fewer particles are scattered through large angles.",
    hints: ["What sets the size of the repulsive force?"],
  });
  // Numerical
  {
    const A = 56, m = A * u;
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: t`Estimate the mass of a nucleus of iron-56, taking each nucleon to have a mass of $1\ \text{u} = 1.66 \times 10^{-27}\ \text{kg}$. Give your answer in kg to three significant figures.`,
      value: m, unit: "kg", wrong: [26 * u], answer: sciPlain(m),
      explanation: t`$m \approx 56 \times 1.66 \times 10^{-27} = ${sciTex(m)}\ \text{kg}$. Using only the 26 protons ignores the neutrons, which have almost the same mass.`,
    });
  }
  {
    const rA = 1.2e-10, rN = 5.0e-15;
    const ratio = (rA / rN) ** 3;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`An atom of radius $1.2 \times 10^{-10}\ \text{m}$ has a nucleus of radius $5.0 \times 10^{-15}\ \text{m}$. Treating both as spheres, calculate the ratio volume of atom ÷ volume of nucleus, to two significant figures.`,
      value: ratio, sf: 2, answer: sciPlain(ratio, 2), wrong: [rA / rN, (rA / rN) ** 2],
      explanation: t`Volume scales as $r^3$: $\left(\dfrac{1.2 \times 10^{-10}}{5.0 \times 10^{-15}}\right)^3 = (${sfStr(rA / rN, 2)})^3 = ${sciTex(ratio, 2)}$. The ratio of radii alone (about $2.4 \times 10^{4}$) is not the volume ratio.`,
      hints: ["Volume ∝ r³."],
    });
  }
  {
    const A = 27, r = 3.6e-15;
    const m = A * u, V = (4 / 3) * Math.PI * r ** 3, rho = m / V;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`An aluminium-27 nucleus has a radius of $3.6 \times 10^{-15}\ \text{m}$. Taking the mass of each nucleon as $1.66 \times 10^{-27}\ \text{kg}$, calculate the density of the nucleus in $\text{kg m}^{-3}$, to two significant figures.`,
      value: rho, sf: 2, unit: "kg/m³", answer: sciPlain(rho, 2), wrong: [m / ((4 / 3) * Math.PI * (2 * r) ** 3), (13 * u) / V],
      explanation: t`1. $m = 27 \times 1.66 \times 10^{-27} = ${sciTex(m)}\ \text{kg}$.
2. $V = \tfrac{4}{3}\pi r^3 = \tfrac{4}{3}\pi(3.6 \times 10^{-15})^3 = ${sciTex(V)}\ \text{m}^3$.
3. $\rho = m/V = ${sciTex(rho, 2)}\ \text{kg m}^{-3}$, about $10^{14}$ times the density of aluminium metal. Nuclear matter has roughly the same density in every nucleus.`,
      hints: ["Mass ≈ A u.", "Use V = 4πr³/3 with the radius, not the diameter."],
    });
  }
  {
    const Z = 82, A = 208;
    const q = Z * e, m = A * u, ratio = q / m;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A fully ionised lead atom ${"$"}{}^{208}_{82}\text{Pb}$ (a bare nucleus) is accelerated in a particle accelerator. Taking its mass as $208\ \text{u}$, calculate its charge-to-mass ratio in $\text{C kg}^{-1}$, to three significant figures.`,
      value: ratio, answer: sciPlain(ratio), wrong: [(A * e) / m, (Z * e) / (Z * u)],
      explanation: t`1. $q = 82 \times 1.60 \times 10^{-19} = ${sciTex(q)}\ \text{C}$.
2. $m = 208 \times 1.66 \times 10^{-27} = ${sciTex(m)}\ \text{kg}$.
3. $q/m = ${sciTex(ratio)}\ \text{C kg}^{-1}$.`,
      hints: ["The charge depends on Z, the mass on A."],
    });
  }
  // Uncertainty
  {
    const counts = [412, 386, 431, 398];
    const avg = mean(counts), hr = halfRange(counts), pct = pctUnc(hr, avg);
    b.num({
      d: 3, skill: "EVALUATION", calculator: true,
      stem: t`In a modern version of the scattering experiment, a detector at $30^\circ$ records the following counts in four 10-minute intervals: ${counts.join(", ")}. Using half the range as the absolute uncertainty, calculate the percentage uncertainty in the mean count, to two significant figures.`,
      value: pct, sf: 2, unit: "%", wrong: [pctUnc(Math.max(...counts) - Math.min(...counts), avg)],
      explanation: t`Mean $= ${dpStr(avg, 1)}$; half-range $= (431 - 386)/2 = ${hr}$; percentage uncertainty $= ${hr}/${dpStr(avg, 1)} \times 100 = ${sfStr(pct, 2)}\%$. The counts vary because decay and scattering are random; longer counting times reduce the percentage uncertainty.`,
      hints: ["Half-range = (largest − smallest)/2."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Isotopes of an element have the same chemical properties because they have the same number of electrons in their neutral atoms.",
    answer: true,
    explanation: "True. Chemistry depends on the electrons; isotopes have the same Z, hence the same number of electrons, but different numbers of neutrons.",
  });
  b.tf({
    d: 2, skill: "RECALL",
    stem: "The unified atomic mass unit is defined as the mass of one proton.",
    answer: false,
    explanation: "False. 1 u is one twelfth of the mass of a neutral carbon-12 atom (1.66 × 10⁻²⁷ kg). A proton is slightly heavier, 1.007 u.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each particle with its charge.",
    pairs: [
      ["proton", "+e"],
      ["neutron", "0"],
      ["electron", "−e"],
      ["alpha particle", "+2e"],
    ],
    explanation: "Proton +e, neutron uncharged, electron −e, alpha particle (two protons, two neutrons) +2e.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements about nuclide notation.",
    template: "In the symbol for a nuclide, the upper number is the {{blank:a}} number and the lower number is the {{blank:b}} number. The number of neutrons is found by {{blank:c}} the lower number from the upper number.",
    blanks: [
      { id: "a", accepted: ["nucleon"], choices: ["nucleon", "proton", "neutron"] },
      { id: "b", accepted: ["proton"], choices: ["proton", "nucleon", "electron"] },
      { id: "c", accepted: ["subtracting"], choices: ["subtracting", "adding", "dividing"] },
    ],
    explanation: "A (nucleon number) on top, Z (proton number) below; neutrons = A − Z.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "Describe the main results of the alpha-particle scattering experiment.",
    points: [
      "Most alpha particles passed straight through the foil (undeflected or deflected by small angles).",
      "A small number were deflected through large angles.",
      "A very small number (about 1 in 10 000 or fewer) were deflected through more than 90° (came back).",
    ],
    modelAnswer: "Nearly all the alpha particles went straight through the gold foil or were deflected only slightly. A few were deflected through large angles, and a very small fraction, of the order of 1 in 10 000, bounced back through more than 90°.",
    explanation: "Three observations, from most to fewest.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how the results of the alpha-particle scattering experiment lead to the conclusion that an atom has a small, dense, positively charged nucleus.",
    points: [
      "Most particles undeflected: most of the atom is empty space (nothing to repel them).",
      "Large-angle deflections: the positive charge is concentrated in a very small region, giving a very strong repulsive force close to it.",
      "Rebounds: that small region contains most of the mass of the atom (a light object could not reverse a fast alpha particle).",
      "Few particles deflected strongly: only those passing very close to the nucleus, so the nucleus is very small compared with the atom.",
    ],
    modelAnswer: "Because most alpha particles pass straight through, most of the atom must be empty. Large deflections need a strong repulsion, which requires the positive charge to be concentrated in a tiny region. Some particles bounce back, so that region must also hold most of the mass; electrons are far too light to do this. Since only a very small fraction is strongly deflected, few particles pass close enough, so the nucleus is tiny compared with the atom.",
    explanation: "Pair each observation with its conclusion.",
    hints: ["Link each observation to one property of the nucleus."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "State two features of the experimental arrangement in the alpha-particle scattering experiment and give a reason for each.",
    points: [
      "The apparatus is evacuated, because alpha particles are absorbed by a few centimetres of air.",
      "The foil is very thin, so each alpha particle is scattered by at most one nucleus (or: a narrow, parallel beam, so the scattering angle is well defined; or: gold, because it can be made very thin and has massive, highly charged nuclei).",
    ],
    modelAnswer: "The chamber is evacuated because alpha particles travel only a few centimetres in air. The foil is extremely thin so that each alpha particle interacts with at most one nucleus, which makes the scattering pattern easy to interpret.",
    explanation: "Vacuum, thin foil, narrow beam, gold.",
    hints: ["Think about the range of alpha particles."],
  });
  // Practice structured
  {
    const nuclides = [["C", 12, 6], ["C", 14, 6], ["N", 14, 7], ["O", 16, 8]];
    b.struct({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Four nuclides are: ${"$"}{}^{12}_{6}\text{C}$, ${"$"}{}^{14}_{6}\text{C}$, ${"$"}{}^{14}_{7}\text{N}$ and ${"$"}{}^{16}_{8}\text{O}$. Carbon-14 is formed in the upper atmosphere when a neutron is absorbed by a nitrogen-14 nucleus, which then emits a particle Y.`,
      parts: [
        P.short({ label: "(a)", marks: 1, stem: "Name the two nuclides that are isotopes of each other (give their symbols, e.g. C-12 and C-14).", accepted: ["C-12 and C-14", "C-14 and C-12", "carbon-12 and carbon-14", "carbon-14 and carbon-12", "12C and 14C", "14C and 12C"], explanation: "Both carbon nuclides have Z = 6." }),
        P.num({ label: "(b)", marks: 1, stem: "State the number of neutrons in a nitrogen-14 nucleus.", value: nuclides[2][1] - nuclides[2][2], wrong: [14], explanation: "14 − 7 = 7." }),
        P.num({ label: "(c)", marks: 2, stem: t`Calculate the charge on an oxygen-16 nucleus, in C, to three significant figures.`, value: 8 * e, unit: "C", answer: sciPlain(8 * e), wrong: [16 * e], explanation: t`$8 \times 1.60 \times 10^{-19} = ${sciTex(8 * e)}\ \text{C}$.` }),
        P.short({ label: "(d)", marks: 2, stem: t`Complete the equation ${"$"}{}^{14}_{7}\text{N} + {}^{1}_{0}\text{n} \rightarrow {}^{14}_{6}\text{C} + \text{Y}$ by naming Y.`, accepted: ["proton", "a proton", "p", "hydrogen nucleus", "H-1", "1 1 p", "11p"], explanation: "Top: 14 + 1 = 14 + A, A = 1. Bottom: 7 + 0 = 6 + Z, Z = 1. Y is a proton." }),
        P.manual({ label: "(e)", marks: 2, stem: "State the two quantities that are conserved in the reaction in (d), and show that they balance.", points: ["Nucleon number: 14 + 1 = 14 + 1.", "Charge (proton number): 7 + 0 = 6 + 1."], modelAnswer: "Nucleon number is conserved: 14 + 1 = 14 + 1 = 15. Charge is conserved: 7 + 0 = 6 + 1 = 7." }),
      ],
      explanation: "Isotopes share Z; neutrons = A − Z; charge = Ze; balance top and bottom numbers.",
      hints: ["Isotopes have the same proton number."],
    });
  }
  {
    const rows = [[10, 4200], [30, 52], [60, 4], [90, 1]];
    b.struct({
      d: 4, skill: "ANALYSIS",
      stem: t`In an alpha-particle scattering experiment, the numbers of alpha particles detected in equal times at different angles $\theta$ are:

${table([t`$\theta\,/\,^\circ$`, "number detected"], rows.map(([a, n]) => [a, n]))}`,
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "Describe how the number detected varies with angle, and what the trend shows about the size of the nucleus.", points: ["The number falls very steeply as θ increases (but is never zero).", "Large deflections need a close approach to the nucleus; few particles come that close, so the nucleus is very small compared with the atom."], modelAnswer: "The count falls very rapidly with increasing angle but does not reach zero. A large deflection needs a very close approach to a nucleus, and only a tiny fraction of particles pass that close, so the nucleus must be very small compared with the atom." }),
        P.mcq({ label: "(b)", stem: "Which change would increase the number detected at 90°?", options: [["using a foil of a metal with a larger proton number", "Correct: stronger repulsion near each nucleus."], ["using a foil of a metal with a smaller proton number", "Weaker repulsion gives fewer large deflections."], ["using alpha particles with greater kinetic energy", "Faster particles are deflected less."], ["filling the chamber with air", "Air absorbs the alpha particles."]], answer: "A", explanation: "The repulsive force is proportional to Ze." }),
        P.manual({ label: "(c)", marks: 2, stem: "Explain why the detector counts must be taken over long times at large angles.", points: ["Scattering (and emission) is random and the counts at large angles are very small.", "A small count has a large percentage (random) uncertainty, so a long time is needed to get a count large enough to be reliable."], modelAnswer: "The process is random and very few particles are scattered through large angles, so short counts would be tiny with a large percentage uncertainty. Counting for longer gives larger totals and a smaller percentage uncertainty." }),
        P.manual({ label: "(d)", marks: 1, stem: "Suggest why the experiment uses a narrow beam rather than a wide one.", points: ["So the direction of the incident particles is well defined and the scattering angle can be measured accurately."], modelAnswer: "A narrow, parallel beam has a well-defined direction, so the angle through which each particle is scattered can be measured." }),
      ],
      explanation: "Steep fall with angle: small nucleus; larger Z gives more large-angle scattering; long counts reduce random uncertainty.",
      hints: ["How close must an alpha particle pass a nucleus to be turned through 90°?"],
    });
  }

  b.card("DEFINITION", "**Nucleon number A**", "The total number of protons and neutrons in a nucleus.");
  b.card("DEFINITION", "**Proton number Z**", "The number of protons in a nucleus; it fixes the element and the nuclear charge +Ze.");
  b.card("DEFINITION", "**Isotopes**", "Nuclides with the same number of protons but different numbers of neutrons.");
  b.card("DEFINITION", "**Unified atomic mass unit**", "One twelfth of the mass of a neutral carbon-12 atom: 1 u = 1.66 × 10⁻²⁷ kg.");
  b.card("FORMULA", "Neutrons in a nucleus", t`$N = A - Z$ for ${"$"}{}^{A}_{Z}\text{X}$`);
  b.card("CONCEPT", "Alpha scattering: three results", "Most pass straight through (empty space); a few deflected through large angles (concentrated positive charge); very few rebound (that region holds most of the mass).");
  b.card("FACT", "Sizes", "Atom about 10⁻¹⁰ m; nucleus about 10⁻¹⁵ to 10⁻¹⁴ m; ratio about 10⁴ to 10⁵.");
  b.card("CONCEPT", "Conservation in nuclear processes", "Nucleon number and charge (proton number) are conserved: balance the top and bottom numbers.");
  b.card("FACT", "Why the apparatus is evacuated", "Alpha particles are absorbed by a few centimetres of air.");
});
