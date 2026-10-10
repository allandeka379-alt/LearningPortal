// W4a: aphys.quantum.energy-levels-spectra — discrete levels, excitation, ionisation, emission and absorption line
// spectra, hf = E1 − E2, identifying transitions, counting lines.
import { concept, P, t, chk, DATA, sfStr, dpStr, sciTex, sciPlain, pctUnc, table } from "../lib.mjs";

const { h, c, e } = DATA;
const lamFor = (dEeV) => (h * c) / (dEeV * e);
// Simplified energy levels of mercury (eV), rounded.
const HG = [-10.44, -5.55, -3.74, -1.57];

concept("aphys.quantum.energy-levels-spectra", { file: "quantum/energy-levels-spectra", keyPrefix: "quantum.energy-levels-spectra" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does the existence of line spectra show about the electrons in isolated atoms?",
    options: [
      ["They can only have certain discrete energies.", "Correct: discrete level differences give discrete wavelengths."],
      ["They can have any energy below the ionisation energy.", "Then the spectrum would be continuous."],
      ["They all have the same energy.", "Then there would be no transitions and no lines."],
      ["They emit light continuously while orbiting.", "Atoms emit only when electrons change level."],
    ],
    answer: "A",
    explanation: "Each line corresponds to one photon energy equal to a difference between discrete levels.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why are the energy levels of an atom given negative values?",
    options: [
      ["Zero is a free electron at infinity, and a bound electron has less energy.", "Correct."],
      ["Electrons carry negative charge, so their energies must be negative too.", "The sign of the energy is not the sign of the charge."],
      ["The electrons are all moving towards the nucleus, losing energy.", "Direction of motion does not set the sign of the energy."],
      ["Energy is lost by the atom whenever its electrons are excited.", "Excitation needs energy to be supplied."],
    ],
    answer: "A",
    explanation: "Energy must be supplied to free an electron to the zero level at infinity, so bound levels are below zero.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "An electron falls from a level of −1.6 eV to a level of −5.5 eV. What is the energy of the emitted photon?",
    options: [
      ["3.9 eV", "Correct: −1.6 − (−5.5)."],
      ["7.1 eV", "The levels have been added; the photon carries the difference."],
      ["5.5 eV", "This is the size of one level, not the difference."],
      ["−3.9 eV", "Photon energies are positive."],
    ],
    answer: "A",
    explanation: "ΔE = E_upper − E_lower = −1.6 − (−5.5) = 3.9 eV.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which statement describes an absorption line spectrum?",
    options: [
      ["dark lines crossing a continuous spectrum", "Correct: missing wavelengths absorbed by a cooler gas."],
      ["bright lines on a dark background", "This is an emission spectrum."],
      ["a continuous band of colours with no lines", "This comes from a hot dense source such as a filament."],
      ["bright lines crossing a continuous spectrum", "Absorbed wavelengths appear dark, not bright."],
    ],
    answer: "A",
    explanation: "White light through a cooler gas: the gas removes particular wavelengths, leaving dark lines.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "An atom has four energy levels. An electron is excited to the highest level. How many different photon energies could be emitted as it returns to the ground state?",
    options: [
      ["6", "Correct: 4 × 3/2."],
      ["3", "This counts only one-step drops."],
      ["4", "There are four levels but six possible pairs."],
      ["12", "Each pair gives one energy, counted once: 4 × 3/2."],
    ],
    answer: "A",
    explanation: "Number of pairs = n(n − 1)/2 = 4 × 3/2 = 6.",
    hints: ["Count the pairs of levels."],
  });
  {
    const dE = -3.03 - -5.14;
    const lam = lamFor(dE);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "In a sodium atom the first excited level is at −3.03 eV and the ground state is at −5.14 eV. What is the wavelength of the photon emitted in the transition between them?",
      options: [
        [t`$${sfStr(lam * 1e9, 3)}\ \text{nm}$`, "Correct: λ = hc/ΔE with ΔE = 2.11 eV."],
        [t`$${sfStr(lamFor(3.03) * 1e9, 3)}\ \text{nm}$`, "This uses one level, not the difference."],
        [t`$${sfStr(lamFor(5.14 + 3.03) * 1e9, 3)}\ \text{nm}$`, "The levels were added instead of subtracted."],
        [t`$${sfStr(lamFor(5.14) * 1e9, 3)}\ \text{nm}$`, "This is the ionisation wavelength from the ground state."],
      ],
      answer: "A",
      explanation: t`$\Delta E = ${dpStr(dE, 2)}\ \text{eV} = ${sciTex(dE * e)}\ \text{J}$; $\lambda = hc/\Delta E = ${sfStr(lam * 1e9, 3)}\ \text{nm}$ (the yellow sodium line seen in street lamps).`,
      hints: ["Use the difference between the levels."],
    });
  }
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Hydrogen atoms in their ground state need 10.20 eV to reach the first excited level and 12.09 eV to reach the second. They are exposed to photons of energy 11.0 eV. What happens?",
    options: [
      ["The photons pass through without being absorbed.", "Correct: 11.0 eV matches no gap from the ground state."],
      ["The atoms are excited to n = 2 and the extra 0.8 eV is re-emitted.", "A photon is absorbed only if its whole energy matches a gap."],
      ["The atoms are ionised.", "Ionisation needs at least 13.6 eV."],
      ["The atoms are excited to n = 3.", "That needs 12.09 eV exactly."],
    ],
    answer: "A",
    explanation: "Gaps from n = 1: 10.20 eV and 12.09 eV. A photon is absorbed only if its energy equals a gap (or exceeds the ionisation energy); 11.0 eV does neither.",
    hints: ["Can a photon give up only part of its energy?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A beam of electrons each with kinetic energy 11.0 eV passes through ground-state hydrogen. Which statement is correct?",
    options: [
      ["Some atoms are excited to n = 2, and those electrons continue with 0.8 eV.", "Correct: a colliding electron can give up part of its energy."],
      ["No atoms are excited because 11.0 eV matches no gap.", "This applies to photons, not to colliding electrons."],
      ["Some atoms are ionised, because the electrons have more than 10.2 eV.", "Ionisation needs 13.6 eV."],
      ["Some atoms are excited to n = 3, and the electrons continue with 1.09 eV.", "n = 3 needs 12.09 eV, more than the electrons have."],
    ],
    answer: "A",
    explanation: "Unlike a photon, an electron can transfer just the 10.20 eV needed for n = 1 → 2, keeping 0.8 eV of kinetic energy.",
    hints: ["Compare photon absorption with electron collisions."],
  });
  // Numerical
  {
    const dE = -1.95 - -3.03;
    const lam = lamFor(dE);
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: "An electron in a sodium atom falls from a level at −1.95 eV to a level at −3.03 eV. Calculate the wavelength of the emitted photon, in nm, to three significant figures.",
      value: lam * 1e9, unit: "nm", wrong: [lamFor(1.95) * 1e9, lamFor(3.03) * 1e9],
      explanation: t`$\Delta E = ${dpStr(dE, 2)}\ \text{eV} = ${sciTex(dE * e)}\ \text{J}$; $\lambda = hc/\Delta E = ${sfStr(lam * 1e9, 3)}\ \text{nm}$ (infrared).`,
    });
  }
  {
    const lam = 4.36e-7;
    const dE = (h * c) / lam / e;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A violet line in the mercury spectrum has a wavelength of $436\ \text{nm}$. Calculate the energy difference between the two levels involved, in eV, to three significant figures.`,
      value: dE, unit: "eV", wrong: [(h * c) / lam, ((h * c) / 436) / e],
      explanation: t`1. $E = hc/\lambda = \dfrac{6.63 \times 10^{-34} \times 3.00 \times 10^{8}}{436 \times 10^{-9}} = ${sciTex((h * c) / lam)}\ \text{J}$.
2. $\Delta E = ${sciTex((h * c) / lam)}/1.60 \times 10^{-19} = ${sfStr(dE, 3)}\ \text{eV}$.`,
      hints: ["Find the photon energy, then convert to eV."],
    });
  }
  {
    const f = 2.92e15;
    const dE = (h * f) / e;
    const upper = -13.6 + dE;
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Ground-state hydrogen atoms (energy $-13.6\ \text{eV}$) absorb ultraviolet photons of frequency $2.92 \times 10^{15}\ \text{Hz}$. Calculate the energy, in eV, of the level to which the electrons are excited, to two decimal places. Include the sign.`,
      value: upper, dp: 2, unit: "eV", wrong: [-13.6 - dE, dE],
      explanation: t`1. Photon energy: $hf = 6.63 \times 10^{-34} \times 2.92 \times 10^{15} = ${sciTex(h * f)}\ \text{J} = ${dpStr(dE, 2)}\ \text{eV}$.
2. Upper level $= -13.6 + ${dpStr(dE, 2)} = ${dpStr(upper, 2)}\ \text{eV}$, which is $n = 3$ ($-1.51\ \text{eV}$).`,
      hints: ["Absorption raises the energy by hf."],
    });
    chk(Math.abs(upper - -1.51) < 0.05 ? 1 : 0, 1);
  }
  {
    const lam = lamFor(5.14);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "The ground state of sodium is at −5.14 eV. Calculate the longest wavelength of radiation that can ionise a sodium atom in its ground state, in nm, to three significant figures.",
      value: lam * 1e9, unit: "nm", wrong: [lamFor(2.11) * 1e9],
      explanation: t`Minimum energy $= 5.14\ \text{eV} = ${sciTex(5.14 * e)}\ \text{J}$; $\lambda_{\max} = hc/E = ${sfStr(lam * 1e9, 3)}\ \text{nm}$.`,
      hints: ["The minimum energy corresponds to the maximum wavelength."],
    });
  }
  {
    const lam = 656.3, d = 0.4;
    b.num({
      d: 3, skill: "EVALUATION", calculator: true,
      stem: t`A spectral line is measured with a grating spectrometer as $656.3 \pm 0.4\ \text{nm}$. Calculate the percentage uncertainty in the photon energy deduced from this wavelength, to one significant figure.`,
      value: pctUnc(d, lam), sf: 1, unit: "%", wrong: [2 * pctUnc(d, lam)],
      explanation: t`$E = hc/\lambda$: the percentage uncertainty is that of $\lambda$, $0.4/656.3 \times 100 = ${sfStr(pctUnc(d, lam), 1)}\%$. Spectral measurements are very precise, which is why spectra can distinguish elements.`,
      hints: ["The power of λ is −1."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The dark lines in the absorption spectrum of a gas are at the same wavelengths as bright lines in its emission spectrum.",
    answer: true,
    explanation: "True. Both involve the same level differences; absorption lines from the ground state match emission lines ending on the ground state.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "An atom in an excited state can emit a photon of any energy less than its excitation energy.",
    answer: false,
    explanation: "False. It can emit only photons whose energies equal differences between its discrete levels.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term with its meaning.",
    pairs: [
      ["ground state", "lowest energy level of the atom"],
      ["excitation", "electron raised to a higher level"],
      ["ionisation", "electron removed completely from the atom"],
      ["de-excitation", "electron falls to a lower level, emitting a photon"],
    ],
    explanation: "Standard vocabulary for energy levels.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements.",
    template: "When an electron moves from a higher to a lower energy level, the atom emits a {{blank:a}} whose energy equals the {{blank:b}} between the levels. A hot, low-pressure gas gives an {{blank:c}} line spectrum.",
    blanks: [
      { id: "a", accepted: ["photon"], choices: ["photon", "electron", "proton"] },
      { id: "b", accepted: ["difference"], choices: ["difference", "sum", "average"] },
      { id: "c", accepted: ["emission"], choices: ["emission", "absorption", "continuous"] },
    ],
    explanation: "hf = E₁ − E₂; hot low-pressure gas: emission lines.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how an emission line spectrum is formed and why it shows that atoms have discrete energy levels.",
    points: [
      "Atoms of a low-pressure gas are excited (by collisions with electrons in a discharge, or by heating): electrons move to higher levels.",
      "Electrons fall back to lower levels, each transition emitting one photon.",
      "The photon energy equals the difference between two levels: hf = E₁ − E₂.",
      "Only certain (discrete) wavelengths are seen, so only certain energy differences, hence discrete levels.",
    ],
    modelAnswer: "In a discharge tube, electrons collide with gas atoms and raise their electrons to higher energy levels. The electrons then drop back to lower levels, emitting a single photon each time, whose energy hf equals the difference between the two levels. The spectrum contains only certain wavelengths, so only certain energy differences occur; the energy levels must therefore be discrete.",
    explanation: "Excite, de-excite, photon = difference, discrete lines.",
    hints: ["Link one line to one transition."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "White light passes through a tube of cool sodium vapour and then through a diffraction grating. Explain why dark lines appear in the spectrum.",
    points: [
      "Sodium atoms absorb photons whose energy exactly equals the difference between the ground state and a higher level.",
      "The atoms re-emit this energy, but in all directions (or by different routes), so little of it continues in the original direction.",
      "So those particular wavelengths are missing (much reduced) in the transmitted beam, giving dark lines on the continuous spectrum.",
    ],
    modelAnswer: "Sodium atoms absorb only photons whose energy matches a gap from the ground state to a higher level. They re-emit the energy almost at once, but in random directions, so the beam continuing towards the grating is depleted at exactly those wavelengths, which appear as dark lines on the continuous spectrum.",
    explanation: "Selective absorption, re-emission in all directions.",
    hints: ["Why doesn't re-emission fill the gap?"],
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 2,
    stem: "Define ionisation energy and state the ionisation energy of hydrogen in its ground state.",
    points: ["The minimum energy needed to remove an electron completely from an atom in its ground state (to infinity / zero energy level).", "13.6 eV (2.18 × 10⁻¹⁸ J) for hydrogen."],
    modelAnswer: "The ionisation energy is the minimum energy needed to remove an electron completely from an atom in its ground state; for hydrogen it is 13.6 eV.",
    explanation: "From the ground state to zero.",
  });
  // Practice structured
  {
    const lines = [[3, 2], [2, 1], [3, 1]];
    const dE = lines.map(([a, bb]) => HG[a] - HG[bb]);
    const lams = dE.map((d) => lamFor(d) * 1e9);
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Simplified energy levels of a mercury atom are:

${table(["level", t`$E\,/\,\text{eV}$`], HG.map((x, i) => [i === 0 ? "ground state" : `level ${i}`, dpStr(x, 2)]).reverse())}

Mercury vapour in a fluorescent tube is excited by collisions with electrons.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the ionisation energy of a mercury atom in its ground state, in eV.", value: 10.44, dp: 2, unit: "eV", wrong: [-10.44], explanation: "The electron must be raised from −10.44 eV to 0: 10.44 eV." }),
        P.num({ label: "(b)", marks: 1, stem: "State the number of different photon energies that could be emitted by atoms excited to level 3.", value: 6, wrong: [3], explanation: "4 levels: 4 × 3/2 = 6." }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the wavelength of the photon emitted when an electron falls from level 3 to level 2, in nm, to three significant figures.", value: lamFor(HG[3] - HG[2]) * 1e9, unit: "nm", wrong: [lamFor(1.57) * 1e9], explanation: t`$\Delta E = -1.57 - (-3.74) = ${dpStr(HG[3] - HG[2], 2)}\ \text{eV}$; $\lambda = hc/\Delta E = ${sfStr(lamFor(HG[3] - HG[2]) * 1e9, 3)}\ \text{nm}$ (visible).` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the wavelength of the photon emitted when an electron falls from level 2 to level 1, in nm, to three significant figures.", value: lams[1], unit: "nm", wrong: [lamFor(3.74) * 1e9], explanation: t`$\Delta E = ${dpStr(dE[1], 2)}\ \text{eV}$; $\lambda = ${sfStr(lams[1], 3)}\ \text{nm}$ (red).` }),
        P.manual({ label: "(e)", marks: 2, stem: "The inside of a fluorescent tube is coated with a powder that absorbs ultraviolet and emits visible light. Explain, in terms of energy levels in the powder, why the emitted light has a longer wavelength than the absorbed radiation.", points: ["The powder's atoms are excited by the ultraviolet photon (a large energy gap), then de-excite in several smaller steps (or lose some energy as heat).", "Each smaller step emits a photon of lower energy, hence longer wavelength (visible)."], modelAnswer: "An ultraviolet photon raises an electron in the powder through a large energy gap. The electron returns in several smaller steps, some energy going to heat, so each emitted photon has less energy than the absorbed one and therefore a longer, visible wavelength." }),
      ],
      explanation: "Ionisation from the ground state to zero; n(n − 1)/2 lines; λ = hc/ΔE.",
      hints: ["Photon energy = difference between two levels."],
    });
    chk(lams.length, 3);
  }
  {
    const lams = [656.3, 486.1, 434.0];
    const dE = lams.map((l) => (h * c) / (l * 1e-9) / e);
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Three visible lines in the emission spectrum of hydrogen have wavelengths of $656.3\ \text{nm}$, $486.1\ \text{nm}$ and $434.0\ \text{nm}$. All three end on the level at $-3.40\ \text{eV}$.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the photon energy of the 486.1 nm line, in eV, to three significant figures.", value: dE[1], unit: "eV", wrong: [(h * c) / (486.1e-9)], explanation: t`$E = hc/\lambda = ${sciTex((h * c) / 486.1e-9)}\ \text{J} = ${sfStr(dE[1], 3)}\ \text{eV}$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Hence calculate the energy of the upper level for this line, in eV, to two decimal places. Include the sign.", value: -3.4 + dE[1], dp: 2, unit: "eV", wrong: [-3.4 - dE[1]], explanation: t`$E_{\text{upper}} = -3.40 + ${sfStr(dE[1], 3)} = ${dpStr(-3.4 + dE[1], 2)}\ \text{eV}$ (the $n = 4$ level).` }),
        P.manual({ label: "(c)", marks: 2, stem: "Explain why the three lines get closer together in wavelength as the wavelength decreases.", points: ["The upper levels get closer together in energy as they approach zero (the levels converge).", "So the photon energies (and wavelengths) of successive lines differ by smaller amounts: the lines crowd together towards a limit."], modelAnswer: "The higher energy levels are increasingly close together as they approach zero, so the photon energies for transitions from successive upper levels to −3.40 eV differ by smaller and smaller amounts; the lines therefore crowd together towards a short-wavelength limit." }),
      ],
      explanation: "hf = E_upper − E_lower; levels converge towards zero, so lines converge.",
      hints: ["Add the photon energy to the lower level."],
    });
  }
  b.card("DEFINITION", "**Energy level**", "One of the discrete allowed energies of an electron in an isolated atom.");
  b.card("DEFINITION", "**Ionisation energy**", "The minimum energy to remove an electron completely from an atom in its ground state (13.6 eV for hydrogen).");
  b.card("FORMULA", "Photon in a transition", t`$hf = \dfrac{hc}{\lambda} = E_1 - E_2$`);
  b.card("CONCEPT", "Emission spectrum", "Bright lines on a dark background: excited atoms emit photons equal to level differences.");
  b.card("CONCEPT", "Absorption spectrum", "Dark lines on a continuous spectrum: cool gas absorbs matching photons and re-emits them in all directions.");
  b.card("FORMULA", "Number of lines from level n", t`$\dfrac{n(n - 1)}{2}$`);
  b.card("FACT", "Negative energies", "Zero is the ionised electron at infinity; bound levels are negative; the ground state is the most negative.");
  b.card("CONCEPT", "Photons versus electrons in excitation", "A photon must match a gap exactly; a colliding electron can give up part of its kinetic energy.");
  b.card("FACT", "Hydrogen levels", "n = 1: −13.6 eV; n = 2: −3.40 eV; n = 3: −1.51 eV; n = 4: −0.85 eV.");
});
