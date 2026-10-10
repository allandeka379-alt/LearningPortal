// W4a: aphys.quantum.wave-particle-duality — evidence for wave and particle behaviour, electron diffraction through
// graphite, λ = h/p, p = √(2meV), comparison with atomic spacings.
import { concept, P, t, chk, DATA, sfStr, dpStr, sciTex, sciPlain, pctUnc, linFit, table } from "../lib.mjs";

const { h, e, me, mp, c } = DATA;
const lamV = (V, m = me, q = e) => h / Math.sqrt(2 * m * q * V);

concept("aphys.quantum.wave-particle-duality", { file: "quantum/wave-particle-duality", keyPrefix: "quantum.wave-particle-duality" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which observation provides evidence that electrons have wave properties?",
    options: [
      ["the diffraction of an electron beam by a thin graphite film", "Correct: diffraction is a wave behaviour."],
      ["the photoelectric effect", "This is evidence for the particle nature of light."],
      ["the deflection of an electron beam by a magnetic field", "Deflection of a charged particle shows particle behaviour."],
      ["thermionic emission from a hot filament", "This shows electrons escaping a metal, not wave behaviour."],
    ],
    answer: "A",
    explanation: "Rings produced when electrons pass through graphite are a diffraction pattern, which only waves produce.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which phenomenon is evidence for the particulate nature of electromagnetic radiation?",
    options: [
      ["the photoelectric effect", "Correct: a threshold frequency and instant emission need photons."],
      ["two-source interference of light", "Interference is wave behaviour."],
      ["the polarisation of light", "Polarisation shows light is a transverse wave."],
      ["the diffraction of X-rays by crystals", "Diffraction is wave behaviour."],
    ],
    answer: "A",
    explanation: "The photoelectric effect is explained by photons each giving energy hf to one electron.",
  });
  {
    const V = 2000;
    const lam = lamV(V);
    b.mcq({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: t`What is the de Broglie wavelength of electrons accelerated from rest through $2.0\ \text{kV}$?`,
      options: [
        [t`$${sciTex(lam)}\ \text{m}$`, "Correct: λ = h/√(2meV)."],
        [t`$${sciTex(h / (2 * me * e * V))}\ \text{m}$`, "The square root has been left out."],
        [t`$${sciTex(h / Math.sqrt(me * e * V))}\ \text{m}$`, "The factor 2 in ½mv² = eV is missing."],
        [t`$${sciTex((h * c) / (e * V))}\ \text{m}$`, "hc/E is for a photon, not an electron."],
      ],
      answer: "A",
      explanation: t`$\lambda = \dfrac{h}{\sqrt{2m_eeV}} = \dfrac{6.63 \times 10^{-34}}{\sqrt{2 \times 9.11 \times 10^{-31} \times 1.60 \times 10^{-19} \times 2000}} = ${sciTex(lam)}\ \text{m}$.`,
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In an electron diffraction tube, the accelerating p.d. is increased. What happens to the rings on the screen?",
    options: [
      ["They become smaller, because the electrons' wavelength decreases.", "Correct: higher momentum, shorter λ, smaller diffraction angle."],
      ["They become larger, because the electrons have more energy.", "More energy means shorter wavelength and less diffraction."],
      ["They stay the same size but become brighter.", "The diameter depends on wavelength, which changes."],
      ["They become smaller, because the graphite atoms move closer together.", "The atomic spacing is fixed; the wavelength changes."],
    ],
    answer: "A",
    explanation: "λ = h/√(2meV) falls as V rises, and the diffraction angle depends on λ/d, so the rings shrink.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Electrons are accelerated through a p.d. V. By what factor must V be increased to halve their de Broglie wavelength?",
    options: [
      ["4", "Correct: λ ∝ 1/√V."],
      ["2", "Doubling V reduces λ only by √2."],
      [t`$\sqrt{2}$`, "This would reduce λ by a factor of 2^(1/4)."],
      ["0.5", "Lowering V lengthens the wavelength."],
    ],
    answer: "A",
    explanation: "λ ∝ V^(−1/2): to halve λ, V must be multiplied by 2² = 4.",
    hints: ["How does λ depend on V?"],
  });
  {
    const V = 500;
    const ratio = Math.sqrt(mp / me);
    b.mcq({
      d: 3, skill: "ANALYSIS",
      stem: "A proton and an electron are each accelerated from rest through the same p.d. Which statement about their de Broglie wavelengths is correct?",
      options: [
        [t`The electron's wavelength is about $${sfStr(ratio, 2)}$ times the proton's.`, "Correct: same kinetic energy, λ ∝ 1/√m."],
        [t`The electron's wavelength is about $${sfStr(mp / me, 2)}$ times the proton's.`, "With equal kinetic energy, p = √(2mE_k), so λ ∝ 1/√m, not 1/m."],
        ["The wavelengths are equal because the charges have the same size.", "Equal charge gives equal kinetic energy, but the masses differ."],
        [t`The proton's wavelength is about $${sfStr(ratio, 2)}$ times the electron's.`, "The heavier proton has the larger momentum and the shorter wavelength."],
      ],
      answer: "A",
      explanation: t`Both gain $eV$. $p = \sqrt{2meV}$, so $\lambda_e/\lambda_p = \sqrt{m_p/m_e} = ${sfStr(ratio, 3)}$.`,
      hints: ["Both gain the same kinetic energy eV."],
    });
    chk(V, 500);
  }
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why does an electron beam passing through graphite produce rings rather than a set of spots?",
    options: [
      ["The film contains many small crystals at random orientations.", "Correct: each set of planes diffracts in all directions round the beam."],
      ["The electrons have a wide range of wavelengths.", "The beam is nearly monoenergetic; a spread would blur, not make rings."],
      ["Electrons travel in circles inside the tube.", "There is no magnetic field to curve them."],
      ["The fluorescent screen is curved, which bends the diffraction pattern into rings.", "The rings come from the diffraction geometry, not the screen."],
    ],
    answer: "A",
    explanation: "Randomly oriented crystallites give every orientation of the atomic planes, so each diffraction angle forms a cone, seen as a ring.",
    hints: ["Think about the orientation of the crystals in the film."],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A student suggests that the rings seen in an electron diffraction tube could be caused by X-rays produced when the electrons hit the anode. Which test would show that the pattern is due to electrons?",
    options: [
      ["Bring a magnet near the neck of the tube: the pattern moves.", "Correct: a magnetic field deflects charged particles but not X-rays."],
      ["Increase the p.d.: the rings become smaller.", "X-rays from the tube would also get shorter wavelengths at higher p.d."],
      ["Turn the tube round: the pattern stays the same.", "This does not distinguish between electrons and X-rays."],
      ["Reduce the filament current: the whole pattern becomes much dimmer.", "Fewer electrons would also mean fewer X-rays."],
    ],
    answer: "A",
    explanation: "Only charged particles are deflected by a magnetic field; X-ray photons are uncharged.",
    hints: ["Which property do electrons have that X-rays do not?"],
  });
  // Numerical
  {
    const m = 1.67e-27, v = 2.5e3;
    const lam = h / (m * v);
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: t`Neutrons (mass $1.67 \times 10^{-27}\ \text{kg}$) from a research reactor move at $2.5 \times 10^{3}\ \text{m s}^{-1}$. Calculate their de Broglie wavelength, in m, to two significant figures.`,
      value: lam, sf: 2, unit: "m", answer: sciPlain(lam, 2), wrong: [h * m * v, h / m],
      explanation: t`$\lambda = \dfrac{h}{mv} = \dfrac{6.63 \times 10^{-34}}{1.67 \times 10^{-27} \times 2.5 \times 10^{3}} = ${sciTex(lam, 2)}\ \text{m}$, about the spacing of atoms in a crystal, so slow neutrons are diffracted by crystals too.`,
    });
  }
  {
    const V = 150;
    const lam = lamV(V);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Electrons are accelerated from rest through $150\ \text{V}$. Calculate their de Broglie wavelength, in nm, to three significant figures.`,
      value: lam * 1e9, unit: "nm", wrong: [(h / (2 * me * e * V)) * 1e9, (h / Math.sqrt(me * e * V)) * 1e9],
      explanation: t`1. $E_k = eV = 1.60 \times 10^{-19} \times 150 = ${sciTex(e * V)}\ \text{J}$.
2. $p = \sqrt{2m_eE_k} = ${sciTex(Math.sqrt(2 * me * e * V))}\ \text{kg m s}^{-1}$.
3. $\lambda = h/p = ${sciTex(lam)}\ \text{m} = ${sfStr(lam * 1e9, 3)}\ \text{nm}$, about the size of an atom.`,
      hints: ["Find the momentum from the kinetic energy."],
    });
  }
  {
    const lam = 0.050e-9;
    const p = h / lam, Ek = p ** 2 / (2 * me);
    const V = Ek / e;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Calculate the accelerating p.d. needed to give electrons a de Broglie wavelength of $0.050\ \text{nm}$, in V, to three significant figures.`,
      value: V, unit: "V", wrong: [Ek, (h * c) / lam / e],
      explanation: t`1. $p = h/\lambda = 6.63 \times 10^{-34}/5.0 \times 10^{-11} = ${sciTex(p)}\ \text{kg m s}^{-1}$.
2. $E_k = p^2/(2m_e) = ${sciTex(Ek)}\ \text{J}$.
3. $V = E_k/e = ${sfStr(V, 3)}\ \text{V}$. Treating the electron as a photon ($hc/\lambda$) gives a very different, wrong answer.`,
      hints: ["Rearrange λ = h/√(2meV) for V."],
    });
  }
  {
    const lam = 1.7e-11;
    const v = h / (me * lam);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Calculate the speed of an electron with a de Broglie wavelength of $1.7 \times 10^{-11}\ \text{m}$, in $\text{m s}^{-1}$, to two significant figures.`,
      value: v, sf: 2, unit: "m/s", answer: sciPlain(v, 2), wrong: [h / (mp * lam), (h * me) / lam],
      explanation: t`$v = \dfrac{h}{m_e\lambda} = \dfrac{6.63 \times 10^{-34}}{9.11 \times 10^{-31} \times 1.7 \times 10^{-11}} = ${sciTex(v, 2)}\ \text{m s}^{-1}$, about 14% of $c$, so the non-relativistic formula is only approximate.`,
      hints: ["Rearrange λ = h/(mv) for v."],
    });
  }
  {
    const V1 = 3000, V2 = 4500, d1 = 24.0;
    const d2 = d1 * Math.sqrt(V1 / V2);
    b.num({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`In an electron diffraction tube, a ring has a diameter of $24.0\ \text{mm}$ when the accelerating p.d. is $3.0\ \text{kV}$. Assuming the diameter is proportional to the de Broglie wavelength, calculate its diameter when the p.d. is $4.5\ \text{kV}$, in mm, to three significant figures.`,
      value: d2, unit: "mm", wrong: [(d1 * V1) / V2, d1 * Math.sqrt(V2 / V1)],
      explanation: t`$\lambda \propto V^{-1/2}$, so $D_2 = 24.0 \times \sqrt{3.0/4.5} = ${sfStr(d2, 3)}\ \text{mm}$. Using $1/V$ instead of $1/\sqrt{V}$ gives ${sfStr((d1 * V1) / V2, 3)} mm.`,
      hints: ["λ ∝ 1/√V."],
    });
  }
  {
    const pV = 2;
    b.num({
      d: 3, skill: "EVALUATION", calculator: true,
      stem: t`The accelerating p.d. in an electron diffraction tube is known to $\pm 2\%$. What is the percentage uncertainty in the de Broglie wavelength calculated from it? Give your answer to one significant figure.`,
      value: pV / 2, sf: 1, unit: "%", wrong: [pV, 2 * pV],
      explanation: t`$\lambda \propto V^{-1/2}$, so the percentage uncertainty is $\tfrac{1}{2} \times 2\% = 1\%$. A power of $-\tfrac{1}{2}$ halves the percentage uncertainty.`,
      hints: ["Multiply the percentage uncertainty by the magnitude of the power."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A moving car has a de Broglie wavelength, but it is far too small for any diffraction to be observed.",
    answer: true,
    explanation: "True. Its momentum is enormous, so λ = h/p is many orders of magnitude smaller than any gap it could pass through.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each observation with the behaviour it demonstrates.",
    pairs: [
      ["electron diffraction rings from graphite", "wave behaviour of matter"],
      ["photoelectric emission", "particle behaviour of light"],
      ["two-slit interference of light", "wave behaviour of light"],
      ["deflection of an electron beam by a magnet", "particle behaviour of matter"],
    ],
    explanation: "Diffraction and interference: waves. Photoelectric effect and deflection of charges: particles.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements.",
    template: "The de Broglie wavelength of a particle equals the Planck constant divided by its {{blank:a}}. Electron diffraction is observed with graphite because the electron wavelength is similar to the {{blank:b}} between the atoms. Increasing the accelerating p.d. makes the rings {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["momentum"], choices: ["momentum", "energy", "speed"] },
      { id: "b", accepted: ["spacing"], choices: ["spacing", "mass", "charge"] },
      { id: "c", accepted: ["smaller"], choices: ["smaller", "larger", "brighter"] },
    ],
    explanation: "λ = h/p; λ comparable with atomic spacing; higher V, shorter λ, smaller rings.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the electron diffraction experiment and explain how it shows that electrons behave as waves.",
    points: [
      "Electrons from a heated filament are accelerated through a p.d. (a few kV) in an evacuated tube.",
      "They pass through a thin film of graphite (polycrystalline carbon) and strike a fluorescent screen.",
      "Concentric rings are seen on the screen.",
      "Rings are a diffraction pattern: waves are diffracted by the regular atomic spacing (comparable with λ), so electrons behave as waves.",
    ],
    modelAnswer: "In an evacuated tube, electrons from a hot filament are accelerated through a few kilovolts and pass through a very thin graphite film before hitting a fluorescent screen. The screen shows a bright centre and concentric rings. This is a diffraction pattern: the regular spacing of the carbon atoms, comparable with the electrons' de Broglie wavelength, diffracts them, so the electrons are behaving as waves.",
    explanation: "Arrangement, observation, interpretation.",
    hints: ["What does a regular lattice do to waves?"],
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: t`Show that the de Broglie wavelength of an electron accelerated from rest through a p.d. $V$ is $\lambda = \dfrac{h}{\sqrt{2m_eeV}}$.`,
    points: [
      t`Kinetic energy gained: $\tfrac{1}{2}m_ev^2 = eV$.`,
      t`$p = m_ev$, so $\tfrac{p^2}{2m_e} = eV$ and $p = \sqrt{2m_eeV}$.`,
      t`$\lambda = h/p = h/\sqrt{2m_eeV}$.`,
    ],
    modelAnswer: t`The electron gains kinetic energy $eV = \tfrac{1}{2}m_ev^2 = p^2/(2m_e)$, so $p = \sqrt{2m_eeV}$. Substituting in $\lambda = h/p$ gives $\lambda = h/\sqrt{2m_eeV}$.`,
    explanation: "E_k = p²/2m.",
    hints: ["Write the kinetic energy in terms of momentum."],
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 2,
    stem: "State what is meant by wave-particle duality, giving one example of particle behaviour of light.",
    points: [
      "Radiation and matter can show both wave properties and particle properties (depending on the situation).",
      "Particle behaviour of light: the photoelectric effect (or photon momentum / radiation detected as individual photons).",
    ],
    modelAnswer: "Wave-particle duality means that both electromagnetic radiation and matter can behave as waves in some situations and as particles in others. The photoelectric effect is an example of light behaving as particles.",
    explanation: "Both behaviours, one example.",
  });
  // Practice structured
  {
    const Vs = [1.5, 2.5, 3.5, 4.5, 5.5, 7.0]; // kV
    const noise = [0.3, -0.2, 0.2, -0.3, 0.1, -0.1]; // mm
    const k = 19.6 * Math.sqrt(2.0); // mm kV^0.5 — ring diameter D = k/√V
    const D = Vs.map((V, i) => Number((k / Math.sqrt(V) + noise[i]).toFixed(1)));
    const x = Vs.map((V) => 1 / Math.sqrt(V));
    const fit = linFit(x, D);
    const row = 4;
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Tatenda measures the diameter $D$ of the inner ring in an electron diffraction tube for different accelerating p.d.s $V$:

${table([t`$V\,/\,\text{kV}$`, t`$D\,/\,\text{mm}$`, t`$V^{-1/2}\,/\,\text{kV}^{-1/2}$`], Vs.map((V, i) => [V.toFixed(1), D[i].toFixed(1), i === row ? "" : dpStr(x[i], 3)]))}`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: t`Calculate the missing value of $V^{-1/2}$, in $\text{kV}^{-1/2}$, to three decimal places.`, value: x[row], dp: 3, wrong: [1 / Vs[row]], explanation: t`$1/\sqrt{5.5} = ${dpStr(x[row], 3)}$.` }),
        P.manual({ label: "(b)", marks: 2, stem: t`Explain why a graph of $D$ against $V^{-1/2}$ is expected to be a straight line through the origin.`, points: [t`$\lambda = h/\sqrt{2m_eeV}$, so $\lambda \propto V^{-1/2}$.`, t`For small angles the ring diameter is proportional to $\lambda$, so $D \propto V^{-1/2}$: a straight line through the origin.`], modelAnswer: t`The de Broglie wavelength is $h/\sqrt{2m_eeV}$, proportional to $V^{-1/2}$. For small diffraction angles the diameter of a ring is proportional to the wavelength, so $D \propto V^{-1/2}$, which plots as a straight line through the origin.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Determine the gradient of the best-fit line of $D$ against $V^{-1/2}$, in $\text{mm kV}^{1/2}$, to two significant figures.`, value: fit.m, sf: 2, tol: 1.2, wrong: [fit.m / 1000], explanation: t`From two well-separated points on the line, gradient $\approx ${sfStr(fit.m, 2)}\ \text{mm kV}^{1/2}$.` }),
        P.num({ label: "(d)", marks: 1, stem: t`Use your gradient to predict the diameter of the ring at $V = 8.0\ \text{kV}$, in mm, to two significant figures.`, value: fit.m / Math.sqrt(8.0) + fit.c, sf: 2, tol: 0.6, unit: "mm", wrong: [fit.m / 8.0], explanation: t`$D \approx ${sfStr(fit.m, 2)} \times 8.0^{-1/2} \approx ${sfStr(fit.m / Math.sqrt(8.0) + fit.c, 2)}\ \text{mm}$.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Suggest two difficulties in measuring D and how each could be reduced.", points: ["The rings are broad and fuzzy, so their edges are hard to judge: measure to the middle of the bright band, or measure the outer and inner edges and average.", "The screen is curved / the scale is outside the glass (parallax), or the rings are faint: darken the room, use vernier callipers held against the tube and view at right angles; repeat and average."], modelAnswer: "The rings are wide and blurred, so measure to the centre of each bright band (or average the inner and outer edges). The glass is curved and the rings are faint, so darken the room and measure with vernier callipers held against the tube, viewing at right angles to avoid parallax; repeat and average." }),
      ],
      explanation: "λ ∝ V^(−1/2) and D ∝ λ: D against V^(−1/2) is a straight line through the origin.",
      hints: ["How does λ depend on V?"],
    });
  }
  {
    const lam = 0.18e-9;
    const p = h / lam;
    const Ee = p ** 2 / (2 * me);
    const Eph = (h * c) / lam;
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`An electron and a photon each have a wavelength of $0.18\ \text{nm}$.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: t`Calculate the momentum of each, in $\text{kg m s}^{-1}$, to three significant figures.`, value: p, unit: "N s", answer: sciPlain(p), wrong: [h * lam], explanation: t`Both have $p = h/\lambda = 6.63 \times 10^{-34}/1.8 \times 10^{-10} = ${sciTex(p)}\ \text{kg m s}^{-1}$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the kinetic energy of the electron, in eV, to three significant figures.", value: Ee / e, unit: "eV", wrong: [Ee, Eph / e], explanation: t`$E_k = p^2/(2m_e) = ${sciTex(Ee)}\ \text{J} = ${sfStr(Ee / e, 3)}\ \text{eV}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the energy of the photon, in eV, to three significant figures.", value: Eph / e, unit: "eV", wrong: [Ee / e], explanation: t`$E = hc/\lambda = ${sciTex(Eph)}\ \text{J} = ${sfStr(Eph / e, 3)}\ \text{eV}$ (an X-ray photon).` }),
        P.manual({ label: "(d)", marks: 1, stem: "Suggest why electron microscopes can image fine detail without the very high photon energies an X-ray microscope would need.", points: ["For the same wavelength (resolution), an electron needs far less energy than a photon (tens of eV versus thousands), and electrons are easily focused by magnetic fields."], modelAnswer: t`At the same wavelength an electron carries only about ${sfStr(Ee / e, 2)} eV compared with about ${sfStr(Eph / 1000 / e, 2)} keV for a photon, and electron beams can be focused with magnetic lenses.` }),
      ],
      explanation: "Same λ means same momentum; E_k = p²/2m for the electron, E = pc for the photon.",
      hints: ["Equal wavelengths mean equal momenta."],
    });
  }
  b.card("DEFINITION", "**de Broglie wavelength**", "The wavelength of a moving particle: Planck constant divided by its momentum, λ = h/p.");
  b.card("FORMULA", "Electron accelerated through V", t`$\lambda = \dfrac{h}{\sqrt{2m_eeV}}$`);
  b.card("CONCEPT", "Evidence for waves", "Light: diffraction, interference. Electrons: diffraction rings from graphite.");
  b.card("CONCEPT", "Evidence for particles", "Light: photoelectric effect. Electrons: deflection by fields, measurable charge and mass.");
  b.card("CONCEPT", "Electron diffraction rings", "Randomly oriented graphite crystals; λ comparable with atomic spacing; higher p.d. → shorter λ → smaller rings.");
  b.card("FACT", "Atomic spacing in graphite", "About 0.1 to 0.2 nm: comparable with the wavelength of electrons accelerated through tens to thousands of volts.");
  b.card("CONCEPT", "Why we don't see a ball diffract", "Its momentum is huge, so λ = h/p is far smaller than any gap.");
  b.card("FACT", "Test for electrons", "A magnet moves the diffraction pattern, so it is made by charged particles, not X-rays.");
});
