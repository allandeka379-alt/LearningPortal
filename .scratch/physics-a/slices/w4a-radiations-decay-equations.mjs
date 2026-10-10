// W4a: aphys.nuclear.radiations-decay-equations — nature, ionisation, penetration and deflection of α, β⁻, β⁺, γ;
// antiparticles; (anti)neutrinos and the continuous β spectrum (Cambridge detail → applies CAM); decay equations;
// background radiation and safe handling.
import { concept, P, t, chk, DATA, CAM, sfStr, dpStr, sciTex, sciPlain, mean, table } from "../lib.mjs";

const { u, e, me } = DATA;

concept("aphys.nuclear.radiations-decay-equations", { file: "nuclear/radiations-decay-equations", keyPrefix: "nuclear.radiations-decay-equations" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which type of radiation is the most strongly ionising?",
    options: [
      ["alpha", "Correct: heavy, doubly charged, interacts with almost every atom it passes."],
      ["beta-minus", "Beta particles ionise about a hundred times less per millimetre than alpha."],
      ["gamma", "Gamma photons are uncharged and the least ionising."],
      ["beta-plus", "Positrons ionise about as weakly as electrons, far less than alpha."],
    ],
    answer: "A",
    explanation: "Alpha particles produce about 10⁴ ion pairs per mm of air, far more than beta or gamma.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: t`Polonium-210, ${"$"}{}^{210}_{84}\text{Po}$, decays by alpha emission. What is the daughter nuclide?`,
    options: [
      [t`${"$"}{}^{206}_{82}\text{Pb}$`, "Correct: A − 4, Z − 2."],
      [t`${"$"}{}^{206}_{84}\text{Po}$`, "The proton number must also fall, by 2."],
      [t`${"$"}{}^{208}_{82}\text{Pb}$`, "Alpha emission removes 4 nucleons, not 2."],
      [t`${"$"}{}^{210}_{85}\text{At}$`, "This would be beta-minus decay."],
    ],
    answer: "A",
    explanation: "Alpha decay: A = 210 − 4 = 206, Z = 84 − 2 = 82 (lead).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In beta-minus decay, what happens inside the nucleus?",
    options: [
      ["A neutron changes into a proton, emitting an electron and an antineutrino.", "Correct: Z rises by 1, A is unchanged."],
      ["A proton changes into a neutron, emitting an electron and a neutrino.", "A proton becoming a neutron happens in beta-plus decay, emitting a positron."],
      ["An orbiting electron is captured and then emitted at high speed.", "The beta particle is created in the nucleus, not taken from the shells."],
      ["A neutron is emitted and the proton number stays the same.", "Neutron emission is a different process; it lowers A."],
    ],
    answer: "A",
    explanation: "n → p + e⁻ + ν̄. The nucleus gains a proton and loses a neutron.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A beam containing alpha, beta-minus and gamma radiation passes between two charged parallel plates in a vacuum. Which statement is correct?",
    options: [
      ["Alpha and beta are deflected in opposite directions, and beta is deflected more.", "Correct: opposite charges; beta has a much larger charge-to-mass ratio."],
      ["Alpha and beta are deflected the same way, and alpha is deflected more.", "Opposite charges are deflected in opposite directions."],
      ["All three are deflected, gamma the least.", "Gamma radiation is uncharged and is not deflected at all."],
      ["Alpha is deflected more than beta because it carries twice the charge.", "Its mass is about 7000 times larger, so its acceleration is much smaller."],
    ],
    answer: "A",
    explanation: "Acceleration = qE/m. Beta particles have q/m thousands of times larger than alpha, and the opposite sign of charge.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", applies: CAM,
    stem: t`Fluorine-18, ${"$"}{}^{18}_{9}\text{F}$, used in medical scans, decays by beta-plus emission. Which equation is correct?`,
    options: [
      [t`${"$"}{}^{18}_{9}\text{F} \rightarrow {}^{18}_{8}\text{O} + {}^{0}_{+1}\text{e} + \nu_e$`, "Correct: Z falls by 1; a positron and a neutrino are emitted."],
      [t`${"$"}{}^{18}_{9}\text{F} \rightarrow {}^{18}_{10}\text{Ne} + {}^{0}_{+1}\text{e} + \nu_e$`, "Charge does not balance: 9 ≠ 10 + 1."],
      [t`${"$"}{}^{18}_{9}\text{F} \rightarrow {}^{18}_{8}\text{O} + {}^{0}_{+1}\text{e} + \bar{\nu}_e$`, "An antineutrino goes with beta-minus decay; beta-plus emits a neutrino."],
      [t`${"$"}{}^{18}_{9}\text{F} \rightarrow {}^{17}_{8}\text{O} + {}^{1}_{1}\text{p}$`, "This is proton emission, not beta-plus decay."],
    ],
    answer: "A",
    explanation: "Beta-plus: p → n + e⁺ + ν_e, so Z falls from 9 to 8 (oxygen) and A stays 18.",
    hints: ["Which way does Z change when a proton becomes a neutron?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING", applies: CAM,
    stem: "Why do beta particles from a single radioactive nuclide have a continuous range of kinetic energies?",
    options: [
      ["The energy released in each decay is shared with an antineutrino in varying proportions.", "Correct: three bodies share a fixed energy."],
      ["The nuclei have a continuous range of energies before they decay.", "Each decay of a given nuclide releases the same energy."],
      ["The beta particles lose varying amounts of energy colliding inside the nucleus.", "The spread is present at emission; it is not due to collisions in the nucleus."],
      ["The daughter nucleus always takes a different, random share of the momentum.", "Recoil alone (two bodies) would fix the energy, as for alpha decay."],
    ],
    answer: "A",
    explanation: "The decay energy is fixed. With a third particle (the antineutrino for β⁻) to share it, the electron can have any energy up to a maximum.",
    hints: ["Compare with alpha decay, where only two bodies share the energy."],
  });
  b.mcq({
    d: 3, skill: "RECALL", applies: CAM,
    stem: "Which statement about the positron is correct?",
    options: [
      ["It has the same mass as an electron and a charge of +e.", "Correct: it is the antiparticle of the electron."],
      ["It has the same mass as a proton and a charge of +e.", "A positron is about 1840 times lighter than a proton."],
      ["It has zero mass and a charge of +e, like a charged photon.", "It has the electron's rest mass."],
      ["It has the same mass as an electron and no charge.", "Antiparticles have the opposite charge to their particle."],
    ],
    answer: "A",
    explanation: "An antiparticle has the same mass as its particle and the opposite charge.",
    hints: ["What changes, and what stays the same, between a particle and its antiparticle?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: t`Thorium-232, ${"$"}{}^{232}_{90}\text{Th}$, decays through a series of alpha and beta-minus decays to lead-208, ${"$"}{}^{208}_{82}\text{Pb}$. How many alpha and beta-minus decays occur?`,
    options: [
      ["6 alpha and 4 beta-minus", "Correct: 24/4 = 6 alpha; Z drops to 78, so 4 beta-minus."],
      ["6 alpha and 8 beta-minus", "Six alpha decays reduce Z by 12, to 78; only 4 beta-minus are needed to reach 82."],
      ["4 alpha and 6 beta-minus", "Only alpha decay changes A: (232 − 208)/4 = 6."],
      ["8 alpha and 4 beta-minus", "Eight alpha decays would remove 32 nucleons."],
    ],
    answer: "A",
    explanation: "A falls by 24, so 6 alpha decays. Z would then be 90 − 12 = 78; to reach 82 needs 4 beta-minus decays.",
    hints: ["Use the nucleon numbers first."],
  });
  // Numerical
  {
    const Ek = 5.3e6 * e, m = 6.64e-27;
    const v = Math.sqrt((2 * Ek) / m);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`An alpha particle of mass $6.64 \times 10^{-27}\ \text{kg}$ is emitted with a kinetic energy of $5.3\ \text{MeV}$. Calculate its speed in $\text{m s}^{-1}$, to two significant figures.`,
      value: v, sf: 2, unit: "m/s", answer: sciPlain(v, 2), wrong: [Math.sqrt((2 * 5.3e6) / m), Math.sqrt(Ek / m)],
      explanation: t`$E_k = 5.3 \times 10^{6} \times 1.60 \times 10^{-19} = ${sciTex(Ek)}\ \text{J}$; $m = ${sciTex(m)}\ \text{kg}$; $v = \sqrt{2E_k/m} = ${sciTex(v, 2)}\ \text{m s}^{-1}$. Forgetting to convert MeV to J gives a meaningless value.`,
      hints: ["Convert MeV to J first."],
    });
  }
  {
    const mA = 4.0015 * u;
    const r = (e / me) / ((2 * e) / mA);
    b.num({
      d: 3, skill: "ANALYSIS", calculator: true,
      stem: t`Calculate the ratio (charge-to-mass ratio of a beta-minus particle) ÷ (charge-to-mass ratio of an alpha particle), to three significant figures. Take the alpha particle's mass as $4.0015\ \text{u}$, $1\ \text{u} = 1.66 \times 10^{-27}\ \text{kg}$ and $m_e = 9.11 \times 10^{-31}\ \text{kg}$.`,
      value: r, answer: sciPlain(r), wrong: [mA / me, r / 4],
      explanation: t`$\dfrac{e/m_e}{2e/m_\alpha} = \dfrac{m_\alpha}{2m_e} = \dfrac{${sciTex(mA)}}{2 \times 9.11 \times 10^{-31}} = ${sciTex(r)}$. This is why beta particles are deflected so much more than alpha particles in the same field. Forgetting the factor 2 in the alpha charge doubles the answer.`,
      hints: ["The alpha particle has charge 2e."],
    });
  }
  {
    const steps = 4;
    const A0 = 234, Z0 = 90;
    // Th-234 → β⁻ → Pa-234 → β⁻ → U-234 → α → Th-230 → α → Ra-226
    const Zf = Z0 + 1 + 1 - 2 - 2, Af = A0 - 8;
    chk(Zf, 88); chk(Af, 226);
    b.num({
      d: 3, skill: "APPLICATION", daily: true,
      stem: t`A nucleus of ${"$"}{}^{234}_{90}\text{Th}$ undergoes, in order, a beta-minus decay, a second beta-minus decay, an alpha decay and a second alpha decay. State the proton number of the final nuclide.`,
      value: Zf, wrong: [Z0 - 2 - 2 - 1 - 1, Z0 - 4],
      explanation: t`$Z$: $90 \rightarrow 91 \rightarrow 92 \rightarrow 90 \rightarrow 88$ (each beta-minus adds 1, each alpha subtracts 2). The final nuclide is ${"$"}{}^{226}_{88}\text{Ra}$, radium.`,
      hints: ["Track Z one step at a time."],
    });
  }
  {
    const counts = [[0, 386], [1, 382], [2, 249], [3, 161], [4, 104]]; // aluminium thickness / mm, counts per minute
    const bg = 22;
    const corr = counts.map(([x, c]) => [x, c - bg]);
    const ratio = corr[4][1] / corr[1][1];
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A student places aluminium sheets between a source and a Geiger-Müller tube. The background count rate is $${bg}\ \text{min}^{-1}$. Measured count rates are:

${table([t`thickness$\,/\,\text{mm}$`, t`count rate$\,/\,\text{min}^{-1}$`], counts.map(([x, c]) => [x, c]))}

Calculate the corrected count rate at $4\ \text{mm}$ as a percentage of the corrected count rate at $1\ \text{mm}$, to two significant figures.`,
      value: ratio * 100, sf: 2, unit: "%", wrong: [(counts[4][1] / counts[1][1]) * 100],
      explanation: t`1. Corrected rates: $${corr[1][1]}\ \text{min}^{-1}$ at 1 mm and $${corr[4][1]}\ \text{min}^{-1}$ at 4 mm.
2. Percentage $= ${corr[4][1]}/${corr[1][1]} \times 100 = ${sfStr(ratio * 100, 2)}\%$.
3. The near-unchanged rate from 0 to 1 mm shows any alpha was already stopped by the air or the tube window; the steady fall through millimetres of aluminium is typical of beta radiation. Not subtracting the background gives $${sfStr((counts[4][1] / counts[1][1]) * 100, 2)}\%$.`,
      hints: ["Subtract the background from every reading first."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Gamma emission changes neither the nucleon number nor the proton number of a nucleus.",
    answer: true,
    explanation: "True. A gamma photon has no charge and no mass; the nucleus only moves from an excited state to a lower energy state.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Alpha sources are harmless to humans because alpha particles cannot pass through skin.",
    answer: false,
    explanation: "False. Outside the body alpha is stopped by the dead outer layer of skin, but an alpha emitter that is swallowed or inhaled deposits all its energy in a small volume of living tissue and is very dangerous.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each radiation with the material that just absorbs it (or, for gamma, greatly reduces it).",
    pairs: [
      ["alpha", "a sheet of paper"],
      ["beta-minus", "a few millimetres of aluminium"],
      ["gamma", "several centimetres of lead"],
    ],
    explanation: "Alpha: paper or a few cm of air. Beta: a few mm of aluminium. Gamma: intensity reduced by thick lead, never to zero.",
  });
  b.fib({
    d: 2, skill: "RECALL", applies: CAM,
    stem: "Complete the statements about beta decay.",
    template: "In beta-minus decay a neutron becomes a proton and an electron and an electron {{blank:a}} are emitted. In beta-plus decay a proton becomes a neutron and a {{blank:b}} and an electron {{blank:c}} are emitted.",
    blanks: [
      { id: "a", accepted: ["antineutrino"], choices: ["antineutrino", "neutrino", "photon"] },
      { id: "b", accepted: ["positron"], choices: ["positron", "proton", "neutron"] },
      { id: "c", accepted: ["neutrino"], choices: ["neutrino", "antineutrino", "photon"] },
    ],
    explanation: "β⁻: n → p + e⁻ + ν̄_e. β⁺: p → n + e⁺ + ν_e.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State the nature of alpha, beta-minus and gamma radiation.",
    points: [
      "Alpha: a helium nucleus (two protons and two neutrons), charge +2e.",
      "Beta-minus: a high-speed electron emitted from the nucleus.",
      "Gamma: high-frequency electromagnetic radiation (a photon) emitted by a nucleus.",
    ],
    modelAnswer: "An alpha particle is a helium nucleus of two protons and two neutrons. A beta-minus particle is a fast electron emitted from the nucleus when a neutron changes into a proton. Gamma radiation is short-wavelength electromagnetic radiation emitted as photons by an excited nucleus.",
    explanation: "Helium nucleus; electron from the nucleus; electromagnetic photon.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3, applies: CAM,
    stem: "Explain how the energy spectrum of beta particles led to the prediction of the neutrino.",
    points: [
      "Every decay of a given nuclide releases the same total energy.",
      "But the beta particles have a continuous range of kinetic energies up to a maximum (a two-body decay would give a single energy).",
      "So another undetected particle (the antineutrino in β⁻ decay) must carry away the rest of the energy (and momentum).",
    ],
    modelAnswer: "Each decay of a given nuclide releases a fixed amount of energy, yet beta particles are emitted with every kinetic energy from almost zero up to a maximum. If only the electron and the daughter nucleus were involved, every electron would have the same energy. A third, almost undetectable particle, the (anti)neutrino, was therefore proposed to carry off the missing energy.",
    explanation: "Fixed energy, continuous spectrum, third particle.",
    hints: ["Compare the number of bodies in alpha and beta decay."],
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A teacher uses a sealed gamma source in a school laboratory. State four precautions she should take, with a reason for each.",
    points: [
      "Handle the source with long tongs, never fingers: increases the distance (intensity falls with distance).",
      "Keep it in its lead-lined box when not in use: lead absorbs much of the gamma radiation.",
      "Keep exposure times as short as possible: dose is proportional to time.",
      "Point the source away from people (and keep students at a distance); or wear a dosimeter badge to monitor dose; or never eat or drink nearby.",
    ],
    modelAnswer: "She should handle the source only with long tongs, so that her hands stay far from it; keep it in a lead-lined container when it is not being used, because lead absorbs gamma radiation; use it for as short a time as possible, since the dose received is proportional to exposure time; and point it away from everyone, keeping students well back, because the intensity falls rapidly with distance.",
    explanation: "Distance, shielding, time, direction or monitoring.",
    hints: ["Think of distance, time and shielding."],
  });
  // Practice structured
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: t`Strontium-90, ${"$"}{}^{90}_{38}\text{Sr}$, is a beta-minus emitter. Its daughter, yttrium-90, is also a beta-minus emitter.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "State the proton number of yttrium-90.", value: 39, wrong: [37], explanation: "Beta-minus decay raises Z by 1: 38 + 1 = 39." }),
      P.short({ label: "(b)", marks: 1, stem: "Name the element formed when yttrium-90 decays (give its name).", accepted: ["zirconium", "zirconium-90", "Zr"], explanation: "Z = 40 is zirconium." }),
      P.mcq({ label: "(c)", stem: "Which particle, apart from the electron and the daughter nucleus, is emitted in each decay?", options: [["an electron antineutrino", "Correct: beta-minus decay emits an antineutrino."], ["an electron neutrino", "A neutrino goes with beta-plus decay."], ["a gamma photon", "Gamma may follow, but it is not required by every decay."], ["a positron", "A positron is emitted in beta-plus decay."]], answer: "A", explanation: "n → p + e⁻ + ν̄_e." }),
      P.manual({ label: "(d)", marks: 2, stem: "Describe and explain the path of the beta particles in a uniform magnetic field at right angles to their velocity.", points: ["Circular arcs (curved paths), because the magnetic force is always perpendicular to the velocity.", "Arcs of different radii, because the beta particles have a range of speeds (r = mv/Bq)."], modelAnswer: "Each beta particle follows a circular arc because the magnetic force is perpendicular to its velocity. The arcs have different radii because the particles are emitted with a range of speeds and r = mv/Be." }),
      P.manual({ label: "(e)", marks: 1, stem: "Suggest why the beta-minus particles from strontium-90 do not all have the same kinetic energy.", points: ["The decay energy is shared between the electron, the antineutrino (and the recoiling nucleus) in varying proportions."], modelAnswer: "The fixed decay energy is shared between the electron and the antineutrino in different proportions in each decay." }),
    ],
    explanation: "β⁻ raises Z by 1 and emits an antineutrino; magnetic deflection gives arcs whose radii depend on speed.",
    hints: ["Beta-minus decay: Z + 1, A unchanged."],
  });
  {
    const bg = 18;
    const raw = [[0, 1210], [0.5, 1196], [5, 1188], [10, 650], [20, 344]]; // absorber code: paper=0.5 (sheet), Al mm, Pb mm
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`An unknown source is placed $3\ \text{cm}$ from a Geiger-Müller tube. Count rates with different absorbers are recorded; the background is $${bg}\ \text{min}^{-1}$.

${table(["absorber", t`count rate$\,/\,\text{min}^{-1}$`], [["none", raw[0][1]], ["sheet of paper", raw[1][1]], ["5 mm aluminium", raw[2][1]], ["10 mm lead", raw[3][1]], ["20 mm lead", raw[4][1]]])}`,
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "Deduce which radiation(s) the source emits. Explain your answer.", points: ["Paper and 5 mm aluminium hardly change the rate, so there is no significant alpha or beta reaching the tube.", "The rate falls only gradually with thickness of lead, so the source emits gamma."], modelAnswer: "The count rate is almost unchanged by paper and by 5 mm of aluminium, so no alpha or beta radiation is detected. It falls only gradually as thicker lead is used, which is characteristic of gamma radiation." }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the corrected count rate with 20 mm of lead as a percentage of the corrected rate with no absorber, to two significant figures.", value: ((raw[4][1] - bg) / (raw[0][1] - bg)) * 100, sf: 2, unit: "%", wrong: [(raw[4][1] / raw[0][1]) * 100], explanation: t`$\dfrac{${raw[4][1]} - ${bg}}{${raw[0][1]} - ${bg}} \times 100 = \dfrac{${raw[4][1] - bg}}{${raw[0][1] - bg}} \times 100 = ${sfStr(((raw[4][1] - bg) / (raw[0][1] - bg)) * 100, 2)}\%$.` }),
        P.manual({ label: "(c)", marks: 2, stem: "Explain why the source being only 3 cm from the tube matters when testing for alpha radiation, and state a source of background radiation.", points: ["Alpha particles have a range of only a few cm in air, so a larger distance could stop them before the tube (and wrongly suggest no alpha).", "Background: radon gas / rocks and soil / cosmic rays / food / medical sources."], modelAnswer: "Alpha particles travel only a few centimetres in air, so the source must be close or any alpha would be absorbed before reaching the tube. Background radiation comes from radon gas, rocks and soil, cosmic rays, food and medical uses." }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain why the count rate fluctuates even when nothing is changed, and how the experimenter should allow for this.", points: ["Radioactive decay is random (spontaneous), so the number of decays in equal times varies.", "Count for a long time (or repeat and average) to reduce the percentage uncertainty."], modelAnswer: "Decay is random, so the count in a fixed time varies about a mean. Counting for longer, or repeating and averaging, gives larger totals and a smaller percentage uncertainty." }),
      ],
      explanation: "Little change with paper or aluminium, gradual fall with lead: gamma. Correct for background before comparing.",
      hints: ["Which absorbers change the count rate significantly?"],
    });
  }

  b.card("FACT", "Alpha particle", "A helium nucleus ⁴₂He: charge +2e, mass about 4 u; strongly ionising, stopped by paper or a few cm of air.");
  b.card("FACT", "Beta-minus particle", "A fast electron created in the nucleus (n → p + e⁻ + ν̄); stopped by a few mm of aluminium.");
  b.card("FACT", "Gamma radiation", "High-frequency electromagnetic photons from an excited nucleus; uncharged, weakly ionising, reduced by thick lead.");
  b.card("FORMULA", "Alpha decay", t`${"$"}{}^{A}_{Z}\text{X} \rightarrow {}^{A-4}_{Z-2}\text{Y} + {}^{4}_{2}\alpha$`);
  b.card("FORMULA", "Beta-minus decay", t`${"$"}{}^{A}_{Z}\text{X} \rightarrow {}^{A}_{Z+1}\text{Y} + {}^{0}_{-1}\text{e} + \bar{\nu}_e$`);
  b.card("FORMULA", "Beta-plus decay", t`${"$"}{}^{A}_{Z}\text{X} \rightarrow {}^{A}_{Z-1}\text{Y} + {}^{0}_{+1}\text{e} + \nu_e$`, undefined, { applies: CAM });
  b.card("DEFINITION", "**Antiparticle**", "A particle with the same mass as its partner and the opposite charge; the positron is the antielectron.", undefined, { applies: CAM });
  b.card("CONCEPT", "Continuous beta spectrum", "The fixed decay energy is shared with an (anti)neutrino, so beta particles have a range of energies up to a maximum; alpha energies are discrete.", undefined, { applies: CAM });
  b.card("CONCEPT", "Ionisation versus penetration", "The more strongly a radiation ionises, the faster it loses energy and the less penetrating it is.");
  b.card("CONCEPT", "Safe handling", "Tongs (distance), lead box (shielding), short times, point away from people; alpha is most dangerous inside the body.");
});
