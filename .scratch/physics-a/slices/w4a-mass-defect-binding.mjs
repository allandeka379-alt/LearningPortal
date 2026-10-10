// W4a: aphys.nuclear.mass-defect-binding — E = mc², mass defect, binding energy (J, MeV, u), binding energy per
// nucleon and its variation with A, energy from mass changes in reactions. Real atomic masses (u).
import { concept, P, t, chk, DATA, sfStr, dpStr, sciTex, sciPlain, pctUnc, table } from "../lib.mjs";

const { u, c, e } = DATA;
const mp = 1.007276, mn = 1.008665, meu = 0.000549, MeVu = 931.5;
const nuc = (Z, mAtomic) => mAtomic - Z * meu;
const defect = (Z, A, mNuc) => Z * mp + (A - Z) * mn - mNuc;

concept("aphys.nuclear.mass-defect-binding", { file: "nuclear/mass-defect-binding", keyPrefix: "nuclear.mass-defect-binding" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by the binding energy of a nucleus?",
    options: [
      ["the least energy needed to pull the nucleus apart into free nucleons", "Correct."],
      ["the energy stored inside the nucleus that is released when it decays", "Binding energy is not stored; it was released when the nucleus formed."],
      ["the energy needed to remove the outermost electron from the atom", "That is an ionisation energy, an atomic quantity."],
      ["the total kinetic energy of the nucleons moving inside the nucleus", "It is the energy to pull the nucleons apart, not their kinetic energy."],
    ],
    answer: "A",
    explanation: "Binding energy = energy needed to separate the nucleus completely into free nucleons = Δm c².",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which statement about the mass of a stable nucleus is correct?",
    options: [
      ["It is less than the total mass of its separate protons and neutrons.", "Correct: the difference is the mass defect."],
      ["It is equal to the total mass of its separate protons and neutrons.", "Energy was released on binding, so mass was lost."],
      ["It is greater than the total mass of its separate protons and neutrons.", "Binding releases energy, so the bound system has less mass."],
      ["It is equal to A unified atomic mass units exactly.", "Only carbon-12 atoms are exactly 12 u, by definition, and that includes electrons."],
    ],
    answer: "A",
    explanation: "Energy is released as the nucleons bind, so the nucleus has less mass-energy than its separate parts.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which nuclide has the greatest binding energy per nucleon?",
    options: [
      ["iron-56", "Correct: near the peak of the curve (about 8.8 MeV)."],
      ["uranium-238", "Uranium has the largest total binding energy but only about 7.6 MeV per nucleon."],
      ["helium-4", "Helium-4 is unusually stable for a light nucleus, but has only about 7.1 MeV per nucleon."],
      ["hydrogen-2", "Deuterium is weakly bound, about 1.1 MeV per nucleon."],
    ],
    answer: "A",
    explanation: "The curve peaks near A = 56.",
  });
  {
    const E = 3.4e-11;
    const dm = E / c ** 2;
    b.mcq({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: t`A nuclear reaction releases $3.4 \times 10^{-11}\ \text{J}$. What is the decrease in mass?`,
      options: [
        [t`$${sciTex(dm, 2)}\ \text{kg}$`, "Correct: Δm = ΔE/c²."],
        [t`$${sciTex(E / c, 2)}\ \text{kg}$`, "Divide by c², not c."],
        [t`$${sciTex(E * c ** 2, 2)}\ \text{kg}$`, "Divide by c², do not multiply."],
        [t`$${sciTex(dm / u, 2)}\ \text{kg}$`, "This is the mass in u, not in kg."],
      ],
      answer: "A",
      explanation: t`$\Delta m = \dfrac{\Delta E}{c^2} = \dfrac{3.4 \times 10^{-11}}{(3.00 \times 10^{8})^2} = ${sciTex(dm, 2)}\ \text{kg}$.`,
    });
  }
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why does the fission of uranium-235 into two medium-mass nuclei release energy?",
    options: [
      ["The products have a higher binding energy per nucleon than uranium.", "Correct: moving towards the peak of the curve releases energy."],
      ["The products have a lower binding energy per nucleon than uranium.", "Lower binding energy per nucleon would require energy to be supplied."],
      ["The products have more nucleons than the uranium nucleus.", "Nucleon number is conserved."],
      ["Uranium has the greatest total binding energy of all nuclei.", "Total binding energy is not the criterion; per nucleon is."],
    ],
    answer: "A",
    explanation: "Products near A ≈ 90-140 have about 8.4-8.7 MeV per nucleon against 7.6 MeV for uranium: total binding energy rises and the difference is released.",
    hints: ["Where are the products on the binding-energy-per-nucleon curve?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "A graph of binding energy per nucleon against nucleon number A is drawn. Which description is correct?",
    options: [
      ["It rises steeply for small A, peaks near A = 56, then falls gradually.", "Correct."],
      ["It rises steadily for all A, so the heaviest nuclei are most stable.", "Above A ≈ 56 the curve falls."],
      ["It falls steeply for small A, has a minimum near A = 56, then rises.", "This is upside down: A ≈ 56 is a maximum."],
      ["It is constant at about 8 MeV for all nuclei.", "It is nearly flat only for medium and heavy nuclei; light nuclei vary greatly."],
    ],
    answer: "A",
    explanation: "Steep rise from H-2 (1.1 MeV), maximum about 8.8 MeV near iron, slow fall to about 7.6 MeV for uranium.",
    hints: ["Which nuclei are the most stable?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which unit could be used for the binding energy per nucleon?",
    options: [
      ["MeV", "Correct: an energy per nucleon is an energy (nucleon number is a pure number)."],
      ["u", "u is a mass unit; it could express the mass defect, not an energy."],
      [t`$\text{J kg}^{-1}$`, "Per nucleon, not per kilogram."],
      [t`$\text{MeV u}^{-1}$`, "This is a conversion factor (931.5 MeV u⁻¹), not an energy per nucleon."],
    ],
    answer: "A",
    explanation: "Binding energy per nucleon is usually quoted in MeV (or J).",
    hints: ["What kind of quantity is 'per nucleon'?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Two deuterium nuclei (1.11 MeV per nucleon) fuse to form a helium-4 nucleus (7.07 MeV per nucleon). What energy is released?",
    options: [
      [t`$${sfStr(4 * 7.07 - 4 * 1.11, 3)}\ \text{MeV}$`, "Correct: 4 × 7.07 − 4 × 1.11."],
      [t`$${sfStr(7.07 - 1.11, 3)}\ \text{MeV}$`, "This is the change per nucleon; multiply by 4 nucleons."],
      [t`$${sfStr(4 * 7.07 - 2 * 1.11, 3)}\ \text{MeV}$`, "Each deuterium nucleus has 2 nucleons: total before is 4 × 1.11."],
      [t`$${sfStr(4 * 7.07 + 4 * 1.11, 3)}\ \text{MeV}$`, "The energy released is the increase in binding energy, not the sum."],
    ],
    answer: "A",
    explanation: t`Binding energy before $= 4 \times 1.11 = 4.44\ \text{MeV}$; after $= 4 \times 7.07 = 28.28\ \text{MeV}$; released $= ${sfStr(4 * 7.07 - 4 * 1.11, 3)}\ \text{MeV}$.`,
    hints: ["Total binding energy = binding energy per nucleon × A."],
  });
  // Numerical
  {
    const Z = 10, A = 20, mA = 19.99244;
    const mN = nuc(Z, mA), dm = defect(Z, A, mN);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`The atomic mass of neon-20 (${"$"}{}^{20}_{10}\text{Ne}$) is $19.992440\ \text{u}$. Using $m_p = 1.007276\ \text{u}$, $m_n = 1.008665\ \text{u}$ and $m_e = 0.000549\ \text{u}$, calculate the mass defect of the nucleus, in u, to four significant figures.`,
      value: dm, sf: 4, unit: "u", wrong: [Z * mp + (A - Z) * mn - mA],
      explanation: t`Nuclear mass $= 19.992440 - 10 \times 0.000549 = ${dpStr(mN, 6)}\ \text{u}$. Nucleons: $10(1.007276) + 10(1.008665) = ${dpStr(Z * mp + (A - Z) * mn, 6)}\ \text{u}$. $\Delta m = ${dpStr(dm, 6)}\ \text{u}$. Forgetting to remove the electrons gives ${sfStr(Z * mp + (A - Z) * mn - mA, 4)} u.`,
      hints: ["Subtract the electrons from the atomic mass."],
    });
  }
  {
    const Z = 20, A = 40, mA = 39.962591;
    const dm = defect(Z, A, nuc(Z, mA));
    const bepn = (dm * MeVu) / A;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Calcium-40 (${"$"}{}^{40}_{20}\text{Ca}$) has an atomic mass of $39.962591\ \text{u}$. Calculate its binding energy per nucleon, in MeV, to three significant figures. ($m_p = 1.007276\ \text{u}$, $m_n = 1.008665\ \text{u}$, $m_e = 0.000549\ \text{u}$, $1\ \text{u} \equiv 931.5\ \text{MeV}$.)`,
      value: bepn, unit: "MeV", wrong: [dm * MeVu, (dm * MeVu) / Z],
      explanation: t`1. Nuclear mass $= 39.962591 - 20(0.000549) = ${dpStr(nuc(Z, mA), 6)}\ \text{u}$.
2. $\Delta m = 20(1.007276) + 20(1.008665) - ${dpStr(nuc(Z, mA), 6)} = ${dpStr(dm, 6)}\ \text{u}$.
3. Binding energy $= ${dpStr(dm, 6)} \times 931.5 = ${sfStr(dm * MeVu, 4)}\ \text{MeV}$.
4. Per nucleon: $${sfStr(dm * MeVu, 4)}/40 = ${sfStr(bepn, 3)}\ \text{MeV}$.`,
      hints: ["Divide the total by the nucleon number, not the proton number."],
    });
  }
  {
    const dmU = 0.0186;
    const E = dmU * u * c ** 2;
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: t`In a nuclear reaction the total mass decreases by $0.0186\ \text{u}$. Calculate the energy released, in J, to three significant figures. ($1\ \text{u} = 1.66 \times 10^{-27}\ \text{kg}$.)`,
      value: E, unit: "J", answer: sciPlain(E), wrong: [dmU * c ** 2, dmU * u * c],
      explanation: t`$\Delta m = 0.0186 \times 1.66 \times 10^{-27} = ${sciTex(dmU * u)}\ \text{kg}$; $E = \Delta m\,c^2 = ${sciTex(E)}\ \text{J}$.`,
    });
  }
  {
    const Z = 83, A = 209, mA = 208.980399;
    const dm = defect(Z, A, nuc(Z, mA));
    const BE = dm * u * c ** 2;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`The atomic mass of bismuth-209 (${"$"}{}^{209}_{83}\text{Bi}$) is $208.980399\ \text{u}$. Calculate the binding energy of its nucleus, in J, to three significant figures. ($m_p = 1.007276\ \text{u}$, $m_n = 1.008665\ \text{u}$, $m_e = 0.000549\ \text{u}$, $1\ \text{u} = 1.66 \times 10^{-27}\ \text{kg}$.)`,
      value: BE, unit: "J", answer: sciPlain(BE), wrong: [(Z * mp + (A - Z) * mn - mA) * u * c ** 2, dm * u * c],
      explanation: t`1. Nucleus: $208.980399 - 83(0.000549) = ${dpStr(nuc(Z, mA), 6)}\ \text{u}$.
2. Nucleons: $83(1.007276) + 126(1.008665) = ${dpStr(Z * mp + (A - Z) * mn, 6)}\ \text{u}$.
3. $\Delta m = ${dpStr(dm, 6)}\ \text{u} = ${sciTex(dm * u)}\ \text{kg}$.
4. $E = \Delta m\,c^2 = ${sciTex(BE)}\ \text{J}$ (about ${sfStr(BE / e / 1e6, 4)} MeV, or ${sfStr((BE / e / 1e6) / A, 3)} MeV per nucleon).`,
      hints: ["Convert the mass defect to kg before using c²."],
    });
  }
  {
    // ⁹Be + ⁴He → ¹²C + n (atomic masses; electrons balance: 4 + 2 = 6)
    const before = 9.012182 + 4.002602, after = 12.0 + mn;
    const Q = (before - after) * MeVu;
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`When beryllium-9 is bombarded with alpha particles, the reaction ${"$"}{}^{9}_{4}\text{Be} + {}^{4}_{2}\text{He} \rightarrow {}^{12}_{6}\text{C} + {}^{1}_{0}\text{n}$ occurs. Atomic masses: Be-9 $9.012182\ \text{u}$, He-4 $4.002602\ \text{u}$, C-12 $12.000000\ \text{u}$; neutron $1.008665\ \text{u}$. Calculate the energy released, in MeV, to three significant figures. ($1\ \text{u} \equiv 931.5\ \text{MeV}$.)`,
      value: Q, unit: "MeV", wrong: [(after - before) * MeVu, (before - after) * u * c ** 2],
      explanation: t`1. Mass before $= 9.012182 + 4.002602 = ${dpStr(before, 6)}\ \text{u}$ (6 electrons).
2. Mass after $= 12.000000 + 1.008665 = ${dpStr(after, 6)}\ \text{u}$ (6 electrons, so they cancel).
3. Decrease $= ${dpStr(before - after, 6)}\ \text{u}$; energy released $= ${dpStr(before - after, 6)} \times 931.5 = ${sfStr(Q, 3)}\ \text{MeV}$, shared as kinetic energy of the products.`,
      hints: ["Check that the electrons balance before using atomic masses."],
    });
  }
  {
    const pE = pctUnc(0.000003, 0.098940);
    b.num({
      d: 4, skill: "EVALUATION", calculator: true,
      stem: t`The mass defect of carbon-12 is found from masses each known to $\pm 0.000001\ \text{u}$: the nucleus and the 6 protons and 6 neutrons (using one value each for $m_p$ and $m_n$). The mass defect is $0.098940\ \text{u}$. Taking the absolute uncertainty in the mass defect as $0.000003\ \text{u}$, calculate its percentage uncertainty, to one significant figure.`,
      value: pE, sf: 1, unit: "%", wrong: [pctUnc(0.000001, 0.098940)],
      explanation: t`$0.000003/0.098940 \times 100 = ${sfStr(pE, 1)}\%$. Although the masses are known to 1 part in $10^7$, the mass defect is a small difference between large numbers, so its percentage uncertainty is far larger; absolute uncertainties add on subtraction.`,
      hints: ["Percentage uncertainty = absolute ÷ value × 100."],
    });
  }
  {
    // ²¹⁰Po → ²⁰⁶Pb + α (atomic masses; electrons balance: 84 = 82 + 2)
    const mPo = 209.982874, mPb = 205.974465, mHe = 4.002602;
    const dmu = mPo - (mPb + mHe);
    const Q = dmu * MeVu;
    const Ka = (Q * 206) / 210; // momentum conservation, masses ∝ A
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Polonium-210 decays by alpha emission: ${"$"}{}^{210}_{84}\text{Po} \rightarrow {}^{206}_{82}\text{Pb} + {}^{4}_{2}\text{He}$. Atomic masses: Po-210 $209.982874\ \text{u}$, Pb-206 $205.974465\ \text{u}$, He-4 $4.002602\ \text{u}$. ($1\ \text{u} \equiv 931.5\ \text{MeV}$.) The polonium nucleus is at rest before it decays.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the decrease in mass in the decay, in u, to three significant figures.", value: dmu, unit: "u", wrong: [mPo - mPb], explanation: t`$209.982874 - (205.974465 + 4.002602) = ${dpStr(dmu, 6)}\ \text{u}$ (84 electrons on each side, so atomic masses can be used).` }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate the energy released, in MeV, to three significant figures.", value: Q, unit: "MeV", wrong: [dmu * u * c ** 2], explanation: t`$${dpStr(dmu, 6)} \times 931.5 = ${sfStr(Q, 3)}\ \text{MeV}$.` }),
        P.manual({ label: "(c)", marks: 2, stem: "Explain why the alpha particle carries away most, but not all, of this energy.", points: ["Momentum is conserved: the alpha particle and the lead nucleus move apart with equal and opposite momenta.", "E_k = p²/2m, so the lighter alpha particle gets the larger share (in the ratio of the masses, about 206 : 4)."], modelAnswer: "The nucleus was at rest, so the alpha particle and the daughter nucleus have equal and opposite momenta. Since kinetic energy is p²/(2m), the much lighter alpha particle receives most of the energy and the lead nucleus recoils with a small share." }),
        P.num({ label: "(d)", marks: 1, stem: "Calculate the kinetic energy of the alpha particle, in MeV, to three significant figures, taking the masses as proportional to the nucleon numbers.", value: Ka, unit: "MeV", wrong: [Q, (Q * 4) / 210], explanation: t`$E_\alpha = Q \times \dfrac{206}{210} = ${sfStr(Q, 3)} \times \dfrac{206}{210} = ${sfStr(Ka, 3)}\ \text{MeV}$.` }),
      ],
      explanation: "Q = (mass before − mass after) × 931.5 MeV; momentum conservation shares it in inverse proportion to mass.",
      hints: ["Equal and opposite momenta; E_k = p²/2m."],
    });
  }
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "A nucleus with a larger total binding energy is always more stable than one with a smaller total binding energy.",
    answer: false,
    explanation: "False. Stability depends on binding energy per nucleon. Uranium-238 has a much larger total than iron-56 but less per nucleon.",
    hints: ["Compare uranium with iron."],
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each quantity with a suitable unit.",
    pairs: [
      ["mass defect", "u"],
      ["binding energy", "MeV"],
      ["c²", "J kg⁻¹"],
      ["conversion 1 u ≡ 931.5", "MeV u⁻¹"],
    ],
    explanation: "Δm in u (or kg); binding energy in MeV (or J); c² in m² s⁻² = J kg⁻¹; 931.5 MeV per u.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements.",
    template: "The mass defect is the total mass of the separate {{blank:a}} minus the mass of the nucleus. The binding energy per nucleon is greatest for nuclei with nucleon numbers close to {{blank:b}}. Energy is released when nuclei move {{blank:c}} this peak.",
    blanks: [
      { id: "a", accepted: ["nucleons"], choices: ["nucleons", "electrons", "atoms"] },
      { id: "b", accepted: ["56"], choices: ["56", "4", "238"] },
      { id: "c", accepted: ["towards"], choices: ["towards", "away from", "past"] },
    ],
    explanation: "Δm = mass of nucleons − mass of nucleus; peak near A = 56; fusion and fission both move towards it.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 2,
    stem: "Define mass defect and binding energy.",
    points: [
      "Mass defect: the difference between the total mass of the separate nucleons and the mass of the nucleus.",
      "Binding energy: the minimum energy needed to separate a nucleus into its individual nucleons (= Δm c²).",
    ],
    modelAnswer: "The mass defect is the total mass of the separate protons and neutrons minus the mass of the nucleus. The binding energy is the minimum energy needed to separate the nucleus completely into its individual nucleons; it equals the mass defect multiplied by c².",
    explanation: "Δm and Δm c².",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the graph of binding energy per nucleon against nucleon number, and use it to explain why both fusion of light nuclei and fission of heavy nuclei release energy.",
    points: [
      "Rises steeply from about 1 MeV (H-2) for small A (with peaks at He-4, C-12, O-16).",
      "Maximum of about 8.8 MeV near A = 56 (iron), then falls slowly to about 7.6 MeV at A ≈ 238.",
      "Fusion of light nuclei produces a nucleus further up the rising part: higher binding energy per nucleon, so energy released.",
      "Fission of a heavy nucleus gives medium-mass products nearer the peak: higher binding energy per nucleon, so energy released.",
    ],
    modelAnswer: "The binding energy per nucleon rises steeply from about 1 MeV for deuterium, with local peaks at helium-4, carbon-12 and oxygen-16, reaches a maximum of about 8.8 MeV near A = 56, and then falls slowly to about 7.6 MeV for uranium. Fusing light nuclei forms a nucleus higher up the curve, and splitting a heavy nucleus forms products nearer the peak; in both cases the binding energy per nucleon increases, the total binding energy increases, and the difference is released.",
    explanation: "Both processes move towards the peak.",
    hints: ["Where is the peak?"],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why the change in mass is noticeable in nuclear reactions but not in chemical reactions.",
    points: ["Δm = ΔE/c², and c² is very large (9.0 × 10¹⁶ m² s⁻²).", "Nuclear energy changes per reaction (MeV) are about a million times larger than chemical ones (eV), so only nuclear mass changes are large enough to measure."],
    modelAnswer: "The mass change is ΔE/c², and c² is enormous. Chemical reactions involve a few eV per atom, giving undetectable mass changes, whereas nuclear reactions involve millions of eV per nucleus, giving mass changes measurable in atomic mass units.",
    explanation: "Scale of energies versus c².",
    hints: ["Compare the energies per reaction."],
  });
  // Practice structured
  {
    const Z = 9, A = 19, mA = 18.998403;
    const mN = nuc(Z, mA), dm = defect(Z, A, mN);
    const BEJ = dm * u * c ** 2, BEMeV = BEJ / e / 1e6;
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`The atomic mass of fluorine-19 (${"$"}{}^{19}_{9}\text{F}$) is $18.998403\ \text{u}$. ($m_p = 1.007276\ \text{u}$, $m_n = 1.008665\ \text{u}$, $m_e = 0.000549\ \text{u}$, $1\ \text{u} = 1.66 \times 10^{-27}\ \text{kg}$.)`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the mass of the fluorine-19 nucleus, in u, to six decimal places.", value: mN, dp: 6, unit: "u", wrong: [mA], explanation: t`$18.998403 - 9(0.000549) = ${dpStr(mN, 6)}\ \text{u}$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the mass defect, in u, to four significant figures.", value: dm, sf: 4, unit: "u", wrong: [Z * mp + (A - Z) * mn - mA], explanation: t`$9(1.007276) + 10(1.008665) - ${dpStr(mN, 6)} = ${dpStr(dm, 6)}\ \text{u}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the binding energy, in J, to three significant figures.", value: BEJ, unit: "J", answer: sciPlain(BEJ), wrong: [dm * c ** 2], explanation: t`$\Delta m = ${sciTex(dm * u)}\ \text{kg}$; $E = \Delta m\,c^2 = ${sciTex(BEJ)}\ \text{J}$.` }),
        P.num({ label: "(d)", marks: 1, stem: "Calculate the binding energy per nucleon, in MeV, to three significant figures.", value: BEMeV / A, unit: "MeV", wrong: [BEMeV / Z], explanation: t`$${sciTex(BEJ)}/1.60 \times 10^{-13} = ${sfStr(BEMeV, 3)}\ \text{MeV}$; per nucleon $${sfStr(BEMeV / A, 3)}\ \text{MeV}$.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Oxygen-16 has a binding energy per nucleon of 7.98 MeV. State which of fluorine-19 and oxygen-16 is more stable and explain why.", points: ["Oxygen-16 is more stable.", "It has the higher binding energy per nucleon, so more energy per nucleon is needed to separate it into nucleons."], modelAnswer: t`Oxygen-16, because its binding energy per nucleon (7.98 MeV) is greater than that of fluorine-19 (about ${sfStr(BEMeV / A, 3)} MeV), so each of its nucleons is more tightly bound.` }),
      ],
      explanation: "Nuclear mass = atomic mass − Zm_e; Δm = nucleons − nucleus; BE = Δm c²; divide by A.",
      hints: ["Remove the electrons first."],
    });
  }
  b.card("DEFINITION", "**Mass defect**", "Total mass of the separate nucleons minus the mass of the nucleus.");
  b.card("DEFINITION", "**Binding energy**", "The minimum energy needed to separate a nucleus completely into its individual nucleons; equals Δm c².");
  b.card("DEFINITION", "**Binding energy per nucleon**", "Binding energy divided by nucleon number; higher values mean more stable nuclei.");
  b.card("FORMULA", "Mass-energy equivalence", t`$\Delta E = c^2\,\Delta m$`);
  b.card("FACT", "Mass-energy conversion", "1 u ≡ 931.5 MeV (934 MeV with 1.66 × 10⁻²⁷ kg and c = 3.00 × 10⁸ m s⁻¹).");
  b.card("CONCEPT", "Shape of the BE per nucleon curve", "Steep rise for light nuclei, peak about 8.8 MeV near A = 56 (iron), slow fall to about 7.6 MeV for uranium.");
  b.card("CONCEPT", "Energy release", "Fusion and fission both release energy because the products have a higher binding energy per nucleon.");
  b.card("FACT", "Atomic versus nuclear masses", "Atomic masses include Z electrons: subtract Zmₑ, or make sure electrons balance in a reaction.");
});
