// W4a: aphys.particles.electron-charge-mass (ZIMSEC only, Form 6) — thermionic emission, electron guns, e/m by a
// fine-beam tube and crossed fields, Millikan's oil-drop principle and quantisation of charge, the electronvolt.
import { concept, P, t, chk, DATA, sfStr, dpStr, sciTex, sciPlain, pctUnc, table } from "../lib.mjs";

const { e, me, g } = DATA;
const em = e / me;

concept("aphys.particles.electron-charge-mass", { file: "particles/electron-charge-mass", keyPrefix: "particles.electron-charge-mass" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is thermionic emission?",
    options: [
      ["the release of electrons from the surface of a heated metal", "Correct."],
      ["the release of electrons from a metal when light falls on it", "This is the photoelectric effect."],
      ["the emission of heat radiation by a hot filament", "Thermionic emission is about electrons, not infrared radiation."],
      ["the flow of electrons through a vacuum from anode to cathode", "Electrons travel from the hot cathode to the anode."],
    ],
    answer: "A",
    explanation: "Heating gives some free electrons enough kinetic energy to escape the metal surface.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In an electron gun, the filament current is increased while the anode p.d. is kept constant. What happens to the beam?",
    options: [
      ["More electrons per second, with the same speed.", "Correct: hotter filament, more emission; speed set by eV = ½mv²."],
      ["The same number of electrons per second, at a higher speed.", "The speed depends on the anode p.d., which is unchanged."],
      ["More electrons per second, each at a higher speed.", "Only the number changes; each still gains eV."],
      ["Fewer electrons per second, at a lower speed.", "A hotter filament emits more electrons, not fewer."],
    ],
    answer: "A",
    explanation: "Temperature controls the emission rate (beam current); the accelerating p.d. controls the kinetic energy eV.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why does an electron beam move in a circle in a uniform magnetic field perpendicular to it?",
    options: [
      ["The force is always perpendicular to the velocity, so it is centripetal.", "Correct: a constant-size centripetal force."],
      ["The force is parallel to the velocity and slows the electrons down.", "The magnetic force on a moving charge is perpendicular to its velocity."],
      ["The electrons are attracted to the north pole of the field.", "Fields do not attract charges to poles; F = Bev acts sideways."],
      ["The force increases steadily as the electrons speed up in the field.", "A magnetic force does no work, so the speed does not change."],
    ],
    answer: "A",
    explanation: "F = Bev is perpendicular to v and of constant size, providing a centripetal force: uniform circular motion.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: t`An electron is accelerated from rest through a p.d. of $500\ \text{V}$. What kinetic energy does it gain?`,
    options: [
      [t`$${sciTex(500 * e)}\ \text{J}$`, "Correct: 500 eV."],
      [t`$500\ \text{J}$`, "This treats eV as if it were joules; multiply by e."],
      [t`$${sciTex(500 / e)}\ \text{J}$`, "Multiply by e, do not divide."],
      [t`$${sciTex(e / 500)}\ \text{J}$`, "The energy is eV, the charge times the p.d."],
    ],
    answer: "A",
    explanation: t`$E_k = eV = 1.60 \times 10^{-19} \times 500 = ${sciTex(500 * e)}\ \text{J} = 500\ \text{eV}$.`,
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "In a fine-beam tube the accelerating p.d. is doubled and the magnetic flux density is unchanged. By what factor does the radius of the beam's circular path change?",
    options: [
      [t`$\sqrt{2}$`, "Correct: v ∝ √V and r ∝ v."],
      ["2", "r ∝ v, and v ∝ √V, not V."],
      ["4", "r² ∝ V, so r ∝ √V."],
      [t`$1/\sqrt{2}$`, "A faster electron curves less, so the radius increases."],
    ],
    answer: "A",
    explanation: "r = mv/(Be) and v = √(2eV/m), so r ∝ √V: doubling V multiplies r by √2.",
    hints: ["Combine r = mv/(Be) with eV = ½mv²."],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "In crossed electric and magnetic fields, an electron beam passes through undeflected. Which statement is correct?",
    options: [
      ["The electric and magnetic forces are equal and opposite, so v = E/B.", "Correct: eE = Bev."],
      ["Both fields are zero at the centre, so there is no force.", "Both fields are present; their forces cancel."],
      ["The electrons have no charge while in the fields.", "Charge does not change; the forces balance."],
      ["Any electron passes undeflected, whatever its speed.", "Only electrons with v = E/B pass straight through."],
    ],
    answer: "A",
    explanation: "For no deflection the forces balance: eE = Bev, so only electrons with speed E/B are undeflected.",
    hints: ["Compare the two forces."],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What did Millikan's oil-drop experiment show?",
    options: [
      ["Charge occurs only in whole-number multiples of a basic charge e.", "Correct: quantisation of charge."],
      ["The mass of the electron is 9.11 × 10⁻³¹ kg.", "The experiment measured charge; the mass followed from e and e/m."],
      ["Electrons travel in circles in magnetic fields.", "That is the basis of the fine-beam tube, not Millikan's experiment."],
      ["Oil drops gain charge continuously while they fall.", "The charges found were discrete multiples of e."],
    ],
    answer: "A",
    explanation: "The charges on many drops were all whole-number multiples of 1.60 × 10⁻¹⁹ C.",
    hints: ["What pattern appeared in the charges of many drops?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A charged oil drop is held stationary between horizontal plates. The p.d. is then doubled. What is the initial acceleration of the drop?",
    options: [
      ["g upwards", "Correct: electric force becomes 2mg upwards, weight mg down: net mg up."],
      ["2g upwards", "The weight still acts: net force is 2mg − mg."],
      ["g downwards", "The electric force increases, so the drop moves up."],
      ["zero, because the drop stays balanced", "Doubling V doubles the electric force, upsetting the balance."],
    ],
    answer: "A",
    explanation: "Balanced: qV/d = mg. Doubled: electric force 2mg up, weight mg down; resultant mg upwards, so a = g upwards (initially, before air resistance builds up).",
    hints: ["What is the electric force after the change?"],
  });
  // Numerical
  {
    const V = 3000;
    const v = Math.sqrt(2 * em * V);
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: t`Calculate the speed of electrons accelerated from rest through $3000\ \text{V}$, in $\text{m s}^{-1}$, to three significant figures.`,
      value: v, unit: "m/s", answer: sciPlain(v), wrong: [Math.sqrt(em * V), 2 * em * V],
      explanation: t`$v = \sqrt{\dfrac{2eV}{m_e}} = \sqrt{\dfrac{2 \times 1.60 \times 10^{-19} \times 3000}{9.11 \times 10^{-31}}} = ${sciTex(v)}\ \text{m s}^{-1}$. Forgetting the 2 or the square root are the usual slips.`,
    });
  }
  {
    const V = 320, B = 1.1e-3, r = 0.054;
    const ratio = (2 * V) / (B * B * r * r);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`In a fine-beam tube, electrons accelerated through $320\ \text{V}$ move in a circle of radius $5.4\ \text{cm}$ in a field of $1.1\\text{mT}$. Calculate $e/m_e$ in $\text{C kg}^{-1}$, to two significant figures.`,
      value: ratio, sf: 2, answer: sciPlain(ratio, 2), wrong: [(2 * V) / (B * B * 0.108 * 0.108), V / (B * B * r * r)],
      explanation: t`1. $\dfrac{e}{m_e} = \dfrac{2V}{B^2r^2}$.
2. $= \dfrac{2 \times 320}{(1.1 \times 10^{-3})^2 \times (0.054)^2} = ${sciTex(ratio, 2)}\ \text{C kg}^{-1}$.
3. Using the diameter (10.8 cm) instead of the radius gives a value four times too small.`,
      hints: ["Eliminate v between eV = ½mv² and r = mv/(Be)."],
    });
  }
  {
    const V = 1500, d = 0.050, B = 2.0e-3;
    const v = V / (d * B);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Two parallel plates $5.0\ \text{cm}$ apart have a p.d. of $1500\ \text{V}$ between them. A magnetic field of $2.0\ \text{mT}$ is applied at right angles to the electric field and to an electron beam. Calculate the speed of the electrons that pass through undeflected, in $\text{m s}^{-1}$, to two significant figures.`,
      value: v, sf: 2, unit: "m/s", answer: sciPlain(v, 2), wrong: [(V * d) / B, V / B],
      explanation: t`1. $E = V/d = 1500/0.050 = ${sciTex(V / d, 2)}\ \text{V m}^{-1}$.
2. $eE = Bev \Rightarrow v = E/B = ${sciTex(V / d, 2)}/2.0 \times 10^{-3} = ${sciTex(v, 2)}\ \text{m s}^{-1}$.`,
      hints: ["First find E = V/d."],
    });
  }
  {
    const r = 1.5e-6, rho = 880, d = 6.0e-3, V = 1080;
    const m = (4 / 3) * Math.PI * r ** 3 * rho;
    const q = (m * g * d) / V;
    chk(Math.round(q / e), 4);
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`An oil drop of radius $1.5 \times 10^{-6}\ \text{m}$ and density $880\ \text{kg m}^{-3}$ is held stationary between horizontal plates $6.0\ \text{mm}$ apart when the p.d. is $1080\ \text{V}$. Calculate the charge on the drop, in C, to two significant figures, and hence the number of electronic charges it carries.`,
      value: q, sf: 2, unit: "C", answer: sciPlain(q, 2), wrong: [(m * d) / V, (m * g) / (V * d)],
      explanation: t`1. $m = \tfrac{4}{3}\pi r^3\rho = \tfrac{4}{3}\pi(1.5 \times 10^{-6})^3 \times 880 = ${sciTex(m)}\ \text{kg}$.
2. Balance: $\dfrac{qV}{d} = mg \Rightarrow q = \dfrac{mgd}{V} = \dfrac{${sciTex(m)} \times 9.81 \times 6.0 \times 10^{-3}}{1080} = ${sciTex(q, 2)}\ \text{C}$.
3. $q/e = ${dpStr(q / e, 2)}$, so the drop carries 4 electronic charges. Forgetting $g$ (using mass instead of weight) is a common slip.`,
      hints: ["Find the mass from the volume and density.", "Electric force = weight."],
    });
  }
  {
    const pr = pctUnc(0.2, 5.0), pV = pctUnc(5, 300), pB = pctUnc(0.02, 0.90);
    const tot = 2 * pr + pV + 2 * pB;
    b.num({
      d: 4, skill: "EVALUATION", calculator: true,
      stem: t`In a fine-beam tube experiment, $r = 5.0 \pm 0.2\ \text{cm}$, $V = 300 \pm 5\ \text{V}$ and $B = 0.90 \pm 0.02\ \text{mT}$. Using $e/m_e = 2V/(B^2r^2)$, calculate the percentage uncertainty in $e/m_e$, to two significant figures.`,
      value: tot, sf: 2, unit: "%", wrong: [pr + pV + pB],
      explanation: t`$\%(e/m) = \%V + 2\%B + 2\%r = ${sfStr(pV, 2)} + 2(${sfStr(pB, 2)}) + 2(${sfStr(pr, 2)}) = ${sfStr(tot, 2)}\%$. The radius dominates: it is squared and hard to read because the beam is wide and the scale is outside the tube (parallax).`,
      hints: ["Powers multiply the percentage uncertainty."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "An electron gun must be evacuated so that electrons are not scattered or slowed down by collisions with gas molecules.",
    answer: true,
    explanation: "True. (A fine-beam tube deliberately contains a trace of gas at low pressure so that the beam glows, at the cost of a slightly blurred beam.)",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "In a uniform magnetic field, the magnetic force increases the kinetic energy of the electrons in a beam.",
    answer: false,
    explanation: "False. The magnetic force is always perpendicular to the velocity, so it does no work; the speed and kinetic energy stay constant.",
    hints: ["What is the angle between the force and the displacement?"],
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each experiment or device with the condition or relationship it uses.",
    pairs: [
      ["fine-beam tube", "Bev = mv²/r"],
      ["velocity selector", "eE = Bev"],
      ["Millikan's oil drop", "qV/d = mg"],
      ["electron gun", "eV = ½mv²"],
    ],
    explanation: "Circle in a magnetic field; balanced forces in crossed fields; balanced drop; energy gained from the accelerating p.d.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements.",
    template: "Electrons emitted from a hot filament are accelerated towards a positive {{blank:a}}. Each gains kinetic energy equal to e multiplied by the accelerating {{blank:b}}. In a magnetic field perpendicular to the beam the electrons move in a {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["anode"], choices: ["anode", "cathode", "grid"] },
      { id: "b", accepted: ["potential difference"], choices: ["potential difference", "current", "resistance"] },
      { id: "c", accepted: ["circle"], choices: ["circle", "parabola", "straight line"] },
    ],
    explanation: "Cathode → anode; E_k = eV; circular path in B.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: t`Electrons accelerated from rest through a p.d. $V$ enter a uniform magnetic field $B$ at right angles and move in a circle of radius $r$. Derive an expression for $e/m_e$ in terms of $V$, $B$ and $r$.`,
    points: [
      t`Energy: $eV = \tfrac{1}{2}m_ev^2$.`,
      t`Magnetic force provides the centripetal force: $Bev = m_ev^2/r$, so $v = Ber/m_e$.`,
      t`Substitute: $eV = \tfrac{1}{2}m_e(Ber/m_e)^2 = \dfrac{B^2e^2r^2}{2m_e}$.`,
      t`Rearrange: $\dfrac{e}{m_e} = \dfrac{2V}{B^2r^2}$.`,
    ],
    modelAnswer: t`The kinetic energy gained is $eV = \tfrac{1}{2}m_ev^2$. In the field, $Bev = m_ev^2/r$, so $v = Ber/m_e$. Substituting, $eV = \tfrac{1}{2}m_eB^2e^2r^2/m_e^2 = B^2e^2r^2/(2m_e)$, giving $e/m_e = 2V/(B^2r^2)$.`,
    explanation: "Two equations, eliminate v.",
    hints: ["Write the two equations and eliminate v."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the principle of Millikan's oil-drop experiment and explain how it shows that charge is quantised.",
    points: [
      "Charged oil drops between horizontal plates; the p.d. is adjusted until a drop is stationary.",
      "Then electric force = weight: qV/d = mg, so q = mgd/V.",
      "The mass is found from the drop's radius and the oil density (m = 4πr³ρ/3; radius from its terminal speed with the field off).",
      "Charges of many drops are all whole-number multiples of 1.60 × 10⁻¹⁹ C (never fractions), so charge is quantised.",
    ],
    modelAnswer: "Tiny charged oil drops are observed between two horizontal plates. The p.d. is adjusted until one drop hangs still, when the electric force qV/d equals its weight mg, so q = mgd/V. The mass comes from the radius (found from the drop's terminal speed) and the density of the oil. Repeating for many drops gives charges that are always whole-number multiples of 1.60 × 10⁻¹⁹ C, so charge comes in discrete units of e.",
    explanation: "Balance, q = mgd/V, multiples of e.",
    hints: ["What condition is used for a stationary drop?"],
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "Suggest two reasons why the radius of the beam in a fine-beam tube is difficult to measure accurately, and one way to reduce the uncertainty.",
    points: [
      "The glowing beam is several millimetres wide and fuzzy, so its edge (or centre) is hard to judge.",
      "The scale is outside the curved glass, away from the beam, so readings suffer from parallax error.",
      "Remedy: view with the eye in line with the beam at right angles to the scale (or use a mirror scale), or measure the larger diameter and halve it, or use a larger radius so the percentage uncertainty is smaller.",
    ],
    modelAnswer: "The beam is a few millimetres wide and fuzzy, and the scale is outside the curved glass so its reading suffers from parallax. View the beam with the eye in line with it at right angles to the scale (or use a mirror behind the scale), and measure the diameter, which is larger, then halve it.",
    explanation: "Beam width and parallax; viewing technique.",
    hints: ["Where is the scale compared with the beam?"],
  });
  // Practice structured
  {
    const qs = [3.17, 6.45, 4.82, 9.55, 1.61, 8.04]; // ×10^-19 C
    const ns = qs.map((q) => Math.round(q / 1.6));
    const est = qs.reduce((a, q, i) => a + q / ns[i], 0) / qs.length;
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`In a Millikan-type experiment, the charges on six oil drops are found to be:

${table(["drop", t`$q\,/\,10^{-19}\ \text{C}$`], qs.map((q, i) => [i + 1, q.toFixed(2)]))}`,
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "Explain how these results suggest that charge is quantised.", points: ["All the values are (close to) whole-number multiples of about 1.6 × 10⁻¹⁹ C.", "No drop has a charge between these values (e.g. 2.4 × 10⁻¹⁹ C), so charge comes in discrete units."], modelAnswer: "Every charge is close to 1, 2, 3, 4, 5 or 6 times 1.6 × 10⁻¹⁹ C, and no value lies in between, so charge exists only in whole units." }),
        P.num({ label: "(b)", marks: 1, stem: "State the number of electronic charges on drop 4.", value: ns[3], wrong: [5], explanation: t`$9.55/1.6 \approx ${dpStr(9.55 / 1.6, 2)}$, so 6 charges.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Use all six drops to find a mean value of the elementary charge, in units of $10^{-19}\ \text{C}$, to three significant figures.`, value: est, wrong: [qs.reduce((a, q) => a + q, 0) / 6], explanation: t`Divide each charge by its whole number (${ns.join(", ")}) and average: $${sfStr(est, 3)} \times 10^{-19}\ \text{C}$.` }),
        P.manual({ label: "(d)", marks: 1, stem: "Suggest why X-rays are sometimes directed at the space between the plates during the experiment.", points: ["To ionise the air so drops can gain or lose charge, letting the charge on one drop be changed and measured again."], modelAnswer: "X-rays ionise the air, so a drop can pick up or lose charge; the experimenter can then measure the new charge on the same drop." }),
      ],
      explanation: "Divide by the smallest common unit; discrete multiples show quantisation.",
      hints: ["Divide each charge by 1.6 × 10⁻¹⁹ C."],
    });
  }
  {
    const V = 200, B = 0.60e-3, r = 0.080;
    const ratio = (2 * V) / (B * B * r * r);
    const v = Math.sqrt(2 * ratio * V);
    const Ek = e * V;
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`In a fine-beam tube, electrons are accelerated through $200\ \text{V}$ and enter a uniform magnetic field of $0.60\ \text{mT}$ at right angles. The beam forms a circle of diameter $16.0\ \text{cm}$.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the kinetic energy of each electron, in J, to three significant figures.", value: Ek, unit: "J", answer: sciPlain(Ek), wrong: [V], explanation: t`$E_k = eV = 1.60 \times 10^{-19} \times 200 = ${sciTex(Ek)}\ \text{J}$.` }),
        P.num({ label: "(b)", marks: 2, stem: t`Calculate $e/m_e$ from these results, in $\text{C kg}^{-1}$, to three significant figures.`, value: ratio, answer: sciPlain(ratio), wrong: [(2 * V) / (B * B * 0.16 * 0.16)], explanation: t`$r = 0.080\ \text{m}$; $e/m_e = \dfrac{2 \times 200}{(0.60 \times 10^{-3})^2 \times 0.080^2} = ${sciTex(ratio)}\ \text{C kg}^{-1}$.` }),
        P.num({ label: "(c)", marks: 1, stem: t`Calculate the speed of the electrons using your value of $e/m_e$, in $\text{m s}^{-1}$, to three significant figures.`, value: v, unit: "m/s", answer: sciPlain(v), wrong: [Math.sqrt(ratio * V)], explanation: t`$v = \sqrt{2(e/m_e)V} = ${sciTex(v)}\ \text{m s}^{-1}$ (or $v = (e/m_e)Br$).` }),
        P.manual({ label: "(d)", marks: 2, stem: "State and explain what happens to the circle if the current in the field coils is increased.", points: ["The flux density B increases, so the magnetic force on each electron increases.", "The radius decreases (r = mv/(Be)); the circle gets smaller."], modelAnswer: "A larger coil current gives a larger B, so the magnetic force Bev is larger and the electrons turn more sharply: r = mv/(Be) decreases and the circle shrinks." }),
      ],
      explanation: "E_k = eV; e/m = 2V/(B²r²) with r = half the diameter; r ∝ 1/B.",
      hints: ["Halve the diameter."],
    });
  }

  b.card("DEFINITION", "**Thermionic emission**", "The release of electrons from the surface of a heated metal.");
  b.card("DEFINITION", "**Specific charge**", "Charge per unit mass, q/m, in C kg⁻¹. For the electron e/mₑ = 1.76 × 10¹¹ C kg⁻¹.");
  b.card("DEFINITION", "**Electronvolt**", "The energy gained by an electron moving through a p.d. of 1 V: 1 eV = 1.60 × 10⁻¹⁹ J.");
  b.card("FORMULA", "e/m from a fine-beam tube", t`$\dfrac{e}{m_e} = \dfrac{2V}{B^2r^2}$`);
  b.card("FORMULA", "Velocity selector", t`$v = \dfrac{E}{B}$ (from $eE = Bev$)`);
  b.card("FORMULA", "Balanced oil drop", t`$\dfrac{qV}{d} = mg$`);
  b.card("CONCEPT", "Quantisation of charge", "Millikan found every drop's charge to be a whole-number multiple of e = 1.60 × 10⁻¹⁹ C.");
  b.card("CONCEPT", "Electron gun controls", "Filament temperature sets the number of electrons per second; anode p.d. sets their speed.");
  b.card("FACT", "Magnetic force on a beam", "Perpendicular to velocity, does no work: speed constant, path circular.");
});
