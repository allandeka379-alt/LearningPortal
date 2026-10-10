// W3a: aphys.efields.uniform-fields — E = F/q, field lines, E = V/d, acceleration along and deflection across a
// uniform field, energy qV, electron gun, ink-jet.
import { concept, P, t, chk, DATA, sfStr, dpStr, sciTex, sciPlain, mean, halfRange, pctUnc } from "../lib.mjs";

const e = DATA.e, me = DATA.me, mp = DATA.mp;

concept("aphys.efields.uniform-fields", { file: "efields/uniform-fields", keyPrefix: "efields.uniform-fields" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement defines the electric field strength at a point?",
    options: [
      ["the force per unit positive charge on a small stationary test charge placed at the point", "Correct: E = F/q."],
      ["the work done per unit positive charge in bringing a small test charge from infinity to the point", "This defines electric potential."],
      ["the force on any charge placed at the point", "Field strength is a force per unit charge, not a force."],
      ["the potential difference per unit charge between the point and earth", "Field strength is not a potential difference; its unit is N C⁻¹."],
    ],
    answer: "A",
    explanation: "Electric field strength is the force per unit positive charge on a small stationary test charge: E = F/q.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: t`Which unit is equivalent to $\text{N C}^{-1}$?`,
    options: [
      [t`$\text{V m}^{-1}$`, "Correct: from E = V/d."],
      [t`$\text{V m}$`, "This would come from multiplying V by d."],
      [t`$\text{J C}^{-1}$`, "This is the volt (the unit of potential), not of field strength."],
      [t`$\text{C N}^{-1}$`, "This is the reciprocal of the correct unit."],
    ],
    answer: "A",
    explanation: t`$1\ \text{V m}^{-1} = 1\ \text{J C}^{-1}\,\text{m}^{-1} = 1\ \text{N m C}^{-1}\,\text{m}^{-1} = 1\ \text{N C}^{-1}$.`,
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which describes the electric field lines between two large parallel plates, well away from their edges, when the top plate is positive?",
    options: [
      ["parallel, equally spaced and directed downwards from the top plate to the bottom plate", "Correct: a uniform field from + to −."],
      ["parallel, equally spaced and directed upwards from the bottom plate to the top plate", "Field lines point from the positive plate to the negative plate."],
      ["radial, spreading out from the centre of the top plate", "Radial fields belong to point charges, not to parallel plates."],
      ["parallel but closer together near the top plate, directed downwards", "Between parallel plates the field is uniform, so the spacing is constant."],
    ],
    answer: "A",
    explanation: "Away from the edges the field between parallel plates is uniform: straight, parallel, equally spaced lines from the positive to the negative plate, perpendicular to the plates.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "The potential difference between two parallel plates is doubled and their separation is halved. By what factor does the force on a charged dust particle between them change?",
    options: [
      ["4", "Correct: E = V/d rises by 2 × 2."],
      ["1", "Doubling V and halving d both increase E; they do not cancel."],
      ["2", "This counts only one of the two changes."],
      ["8", "E depends on V/d, with no squared terms."],
    ],
    answer: "A",
    explanation: "F = qE = qV/d: V × 2 and d ÷ 2 give E × 4, so F × 4.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "An electron enters the uniform field between two horizontal parallel plates, travelling horizontally at right angles to the field. Ignoring gravity, what is its path between the plates?",
    options: [
      ["a parabola curving towards the positive plate", "Correct: constant horizontal velocity and constant acceleration towards the positive plate."],
      ["a parabola curving towards the negative plate", "An electron is attracted towards the positive plate."],
      ["an arc of a circle curving towards the positive plate", "A circle needs a force always perpendicular to the velocity, as in a magnetic field."],
      ["a straight line at an angle towards the positive plate", "The sideways velocity increases steadily, so the path is curved."],
    ],
    answer: "A",
    explanation: "The force eE is constant and perpendicular to the plates; the velocity along the plates is unchanged. As for a horizontally thrown ball, the path is a parabola, here towards the positive plate.",
    hints: ["Compare with a ball thrown horizontally."],
  });
  {
    const V = 450, d = 0.015, E = V / d;
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A proton is between two parallel plates $1.5\ \text{cm}$ apart with a potential difference of $450\ \text{V}$ across them. What is the electric force on the proton?`,
      options: [
        [t`$${sciTex(e * E)}\ \text{N}$`, "Correct: F = eV/d."],
        [t`$${sciTex(e * V / 1.5)}\ \text{N}$`, "The separation was left in centimetres."],
        [t`$${sciTex(e * V)}\ \text{N}$`, "This is eV, the energy gained crossing the plates, in J, not the force."],
        [t`$${sciTex(e * V * d)}\ \text{N}$`, "The p.d. must be divided by the separation, not multiplied."],
      ],
      answer: "A",
      explanation: t`$E = V/d = 450/0.015 = ${sciTex(E)}\ \text{V m}^{-1}$; $F = eE = 1.60 \times 10^{-19} \times ${sciTex(E)} = ${sciTex(e * E)}\ \text{N}$.`,
      hints: ["Convert cm to m."],
    });
  }
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "An electron and a proton are released from rest at the same point in a uniform electric field. Which statement is correct about the forces on them and their accelerations?",
    options: [
      ["The forces are equal in size but opposite in direction; the electron's acceleration is much larger.", "Correct: same |q|, so same |F|; much smaller mass, so much larger acceleration."],
      ["The forces are equal in size and in the same direction; the accelerations are equal.", "Opposite charges feel opposite forces, and their masses differ greatly."],
      ["The force on the proton is much larger; the accelerations are equal.", "The charges have equal magnitude, so the forces have equal magnitude."],
      ["The forces are equal in size but opposite in direction; the proton's acceleration is much larger.", "a = F/m, and the electron's mass is about 1/1840 of the proton's."],
    ],
    answer: "A",
    explanation: "F = qE: |q| is the same, so |F| is the same; directions are opposite. a = F/m: the electron is about 1840 times lighter, so it accelerates about 1840 times more.",
    hints: ["Compare q and m for the two particles."],
  });
  {
    const V = 150;
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`An alpha particle (charge $+2e$) is accelerated from rest through a potential difference of $150\ \text{V}$. What kinetic energy does it gain?`,
      options: [
        [t`$${sciTex(2 * e * V)}\ \text{J}$`, "Correct: E_k = qV = 2eV."],
        [t`$${sciTex(e * V)}\ \text{J}$`, "This uses the charge of one proton; the alpha particle carries 2e."],
        [t`$${sciTex(4 * e * V)}\ \text{J}$`, "This uses the nucleon number (4) instead of the charge number (2)."],
        [t`$${sciTex(2 * e * V * V)}\ \text{J}$`, "The energy is proportional to V, not V²."],
      ],
      answer: "A",
      explanation: t`$E_k = qV = 2 \times 1.60 \times 10^{-19} \times 150 = ${sciTex(2 * e * V)}\ \text{J}$, which is $300\ \text{eV}$.`,
      hints: ["Use the charge, not the mass number."],
    });
  }
  // Numerical
  {
    const V = 3.0e3, d = 0.025;
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: t`Two parallel plates $2.5\ \text{cm}$ apart are connected to a $3.0\ \text{kV}$ supply. Calculate the electric field strength between them, in $\text{V m}^{-1}$, to two significant figures.`,
      value: V / d, sf: 2, unit: "V/m", wrong: [V / 2.5, V * d],
      explanation: t`$E = \dfrac{V}{d} = \dfrac{3.0 \times 10^{3}}{0.025} = ${sciTex(V / d, 2)}\ \text{V m}^{-1}$. Leaving $d$ in cm gives ${sfStr(V / 2.5, 2)}, which is 100 times too small.`,
    });
  }
  {
    const V = 4.5e3, v = Math.sqrt((2 * e * V) / me);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`In an electron gun, electrons leave a hot cathode with negligible speed and are accelerated through a potential difference of $4.5\ \text{kV}$. Calculate their final speed, in $\text{m s}^{-1}$, to three significant figures, using the data-sheet values of $e$ and $m_e$.`,
      value: v, unit: "m/s", wrong: [(2 * e * V) / me, Math.sqrt((e * V) / me)],
      explanation: t`1. Energy gained $= eV = 1.60 \times 10^{-19} \times 4.5 \times 10^{3} = ${sciTex(e * V)}\ \text{J}$.
2. $\tfrac{1}{2}m_ev^2 = eV \Rightarrow v = \sqrt{\dfrac{2eV}{m_e}} = \sqrt{\dfrac{2 \times ${sciTex(e * V)}}{9.11 \times 10^{-31}}}$.
3. $v = ${sciTex(v)}\ \text{m s}^{-1}$.`,
      hints: ["Kinetic energy gained = eV."],
    });
  }
  {
    const V = 800, d = 0.020, L = 0.060, vx = 3.2e7;
    const a = (e * V) / (d * me), tt = L / vx, y = 0.5 * a * tt * tt;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`An electron travelling at $3.2 \times 10^{7}\ \text{m s}^{-1}$ enters, at right angles to the field, the space between two parallel plates $6.0\ \text{cm}$ long and $2.0\ \text{cm}$ apart, with $800\ \text{V}$ between them. Calculate its sideways displacement when it leaves the plates, in mm, to two significant figures.`,
      value: y * 1000, sf: 2, unit: "mm", wrong: [a * tt * tt * 1000, 0.5 * ((e * V) / me) * tt * tt * 1000],
      explanation: t`1. $E = 800/0.020 = ${sciTex(V / d, 2)}\ \text{V m}^{-1}$; $a = \dfrac{eE}{m_e} = ${sciTex(a)}\ \text{m s}^{-2}$.
2. Time between the plates: $t = \dfrac{0.060}{3.2 \times 10^{7}} = ${sciTex(tt)}\ \text{s}$ (horizontal speed constant).
3. $y = \tfrac{1}{2}at^2 = ${sciTex(y)}\ \text{m} = ${sfStr(y * 1000, 2)}\ \text{mm}$, towards the positive plate.
4. Forgetting the $\tfrac{1}{2}$ doubles the answer; forgetting to divide $V$ by $d$ gives a wildly wrong acceleration.`,
      hints: ["Treat it like a horizontal projectile.", "a = eE/m and t = L/v."],
    });
  }
  {
    const m = 3.77e-15, Vp = 770, d = 0.010;
    const q = (m * DATA.g * d) / Vp;
    const n = q / e;
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A charged oil drop of mass $${sciTex(m)}\ \text{kg}$ is held stationary between two horizontal plates $1.0\ \text{cm}$ apart when the potential difference is $770\ \text{V}$, the upper plate being positive. Calculate the charge on the drop, in C, and state how many electrons' worth of charge this is (give the charge to two significant figures).`,
      value: q, sf: 2, unit: "C", wrong: [(m * DATA.g) / Vp, (m * d) / Vp],
      explanation: t`1. Stationary: electric force up = weight down, $qE = mg$.
2. $E = V/d = 770/0.010 =${sciTex(Vp / d, 2)}\ \text{V m}^{-1}$.
3. $q = \dfrac{mg}{E} = \dfrac{${sciTex(m)} \times 9.81}{${sciTex(Vp / d, 2)}} = ${sciTex(q, 2)}\ \text{C}$.
4. $q/e = ${dpStr(n, 1)}$, so the drop carries the charge of ${Math.round(n)} electrons (it is negatively charged, since the force is towards the positive upper plate).`,
      hints: ["The electric force balances the weight."],
    });
    chk(Math.abs(n - Math.round(n)) < 0.15 ? 1 : 0, 1);
  }
  {
    const V = 2.0e3, d = 0.050;
    const E = V / d, ratio = (e * E) / (me * DATA.g);
    b.num({
      d: 3, skill: "ANALYSIS", calculator: true,
      stem: t`Show that gravity can be ignored for an electron between parallel plates $5.0\ \text{cm}$ apart with $2.0\ \text{kV}$ across them, by calculating the ratio (electric force) ÷ (weight). Give the ratio to two significant figures.`,
      value: ratio, sf: 2, wrong: [(e * V) / (me * DATA.g)],
      explanation: t`$F_E = eE = 1.60 \times 10^{-19} \times ${sciTex(E, 2)} = ${sciTex(e * E, 2)}\ \text{N}$; $W = m_eg = 9.11 \times 10^{-31} \times 9.81 = ${sciTex(me * DATA.g)}\ \text{N}$; ratio $= ${sciTex(ratio, 2)}$, so the weight is utterly negligible.`,
      hints: ["Weight = mg; electric force = eV/d."],
    });
  }
  // Uncertainty
  {
    const V = 2500, dV = 25, d = 0.0360, dd = 0.0005;
    const pE = pctUnc(dV, V) + pctUnc(dd, d);
    b.num({
      d: 3, skill: "EVALUATION", calculator: true,
      stem: t`The field between two plates is found from $E = V/d$. The p.d. is $2500 \pm 25\ \text{V}$ and the separation, measured with a ruler, is $3.60 \pm 0.05\ \text{cm}$. Calculate the percentage uncertainty in $E$, to two significant figures.`,
      value: pE, sf: 2, unit: "%", wrong: [pctUnc(dV, V) - pctUnc(dd, d), pctUnc(dd, d)],
      explanation: t`For a quotient the percentage uncertainties add: $\dfrac{25}{2500} \times 100 + \dfrac{0.05}{3.60} \times 100 = 1.0 + ${sfStr(pctUnc(dd, d), 2)} = ${sfStr(pE, 2)}\%$. The separation contributes more; measuring it with vernier callipers would reduce it.`,
      hints: ["Add percentage uncertainties for a quotient."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Between two large parallel plates, a charged particle feels a larger electric force when it is close to one of the plates than when it is midway between them.",
    answer: false,
    explanation: "False. Away from the edges the field between parallel plates is uniform, so F = qE is the same everywhere between the plates.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each arrangement of charges with its field-line pattern.",
    pairs: [
      ["isolated positive point charge", "straight lines radiating outwards"],
      ["isolated negative point charge", "straight lines pointing radially inwards"],
      ["two equal positive charges", "lines curving away from each other, with a neutral point midway"],
      ["charged parallel plates", "parallel, equally spaced lines from + to −, curving at the edges"],
    ],
    explanation: "Field lines show the direction of the force on a positive test charge: away from positive charges, towards negative ones; parallel plates give a uniform field with edge effects.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements about a charged particle in a uniform electric field.",
    template: "Between parallel plates the field strength is E = V/{{blank:a}}. A charge moving parallel to the plates and at right angles to the field follows a {{blank:b}} path. The kinetic energy gained by a charge q accelerated from rest through a p.d. V is {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["d"], choices: ["d", "d²", "q"] },
      { id: "b", accepted: ["parabolic"], choices: ["parabolic", "circular", "straight"] },
      { id: "c", accepted: ["qV"], choices: ["qV", "qV²", "V/q"] },
    ],
    explanation: "E = V/d; constant force across the field gives a parabola; energy gained = qV.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: t`Show that the field strength between parallel plates a distance $d$ apart with a potential difference $V$ is $E = V/d$.`,
    points: [
      t`Moving a charge $q$ from one plate to the other against the uniform field needs a constant force $qE$ over the distance $d$: work $= qEd$.`,
      t`By definition of potential difference, the work done is $qV$.`,
      t`$qEd = qV$, so $E = V/d$.`,
    ],
    modelAnswer: "In the uniform field the force on a charge q is qE everywhere, so the work done moving it across the gap d is W = qEd. The work done per unit charge between the plates is the p.d., so W = qV. Equating, E = V/d.",
    explanation: "Equate the two expressions for the work done.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "A beam of electrons enters the uniform field between two horizontal plates, moving horizontally. Explain why its path between the plates is a parabola and describe its path after it leaves the plates.",
    points: [
      "The force on each electron is constant (uniform field) and vertical, towards the positive plate (opposite to the field lines).",
      "So the vertical acceleration is constant and the vertical velocity increases steadily.",
      "There is no horizontal force, so the horizontal velocity is constant; constant velocity in one direction and constant acceleration at right angles gives a parabola (like a projectile).",
      "After leaving the plates there is no force, so the electrons travel in a straight line (at an angle to the original direction).",
    ],
    modelAnswer: "In the uniform field each electron feels a constant force eE towards the positive plate, so it has a constant acceleration at right angles to the plates while its velocity along the plates is unchanged. Constant velocity in one direction with constant acceleration perpendicular to it gives a parabolic path, exactly like a horizontally thrown ball. Once the electrons leave the plates there is no force, so they continue in a straight line at an angle to their original direction.",
    explanation: "Projectile analogy: constant v along, constant a across.",
    hints: ["Separate the motion into components along and across the field."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe how an ink-jet printer uses a uniform electric field to place drops of ink on the paper.",
    points: [
      "Drops of ink are given a (variable) electric charge as they leave the nozzle.",
      "They pass between parallel deflecting plates with a p.d. across them, where a uniform field exerts a force qE on each drop.",
      "The deflection depends on the drop's charge (and on the field), so controlling the charge (or the p.d.) sets where each drop lands; uncharged drops go straight to a gutter for re-use.",
    ],
    modelAnswer: "Each drop leaving the nozzle is given a controlled charge. The drops pass between two parallel plates with a large p.d. across them, so each feels a constant force qE across its path and is deflected sideways. A drop with more charge is deflected more, so the printer sets the charge (or plate voltage) to place each drop; uncharged drops pass straight through into a gutter.",
    explanation: "Charge the drops; deflect them in a uniform field; control the charge.",
    hints: ["What does the deflection depend on?"],
  });
  // Practice structured: CRO deflection system
  {
    const Va = 1200, Vd = 130, d = 0.012, L = 0.032;
    const v = Math.sqrt((2 * e * Va) / me);
    const E = Vd / d, a = (e * E) / me, tt = L / v, y = 0.5 * a * tt * tt, vy = a * tt;
    const ang = (Math.atan(vy / v) * 180) / Math.PI;
    chk(y, (Vd * L * L) / (4 * d * Va), 1e-12);
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`In a cathode-ray tube, electrons are accelerated from rest through $1200\ \text{V}$ and then pass midway between two horizontal deflecting plates $3.2\ \text{cm}$ long and $1.2\ \text{cm}$ apart, with $130\ \text{V}$ between them (upper plate positive). Use the data-sheet values of $e$ and $m_e$.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: t`Calculate the speed of the electrons entering the plates, in $\text{m s}^{-1}$, to three significant figures.`, value: v, unit: "m/s", wrong: [Math.sqrt((e * Va) / me)], answer: sciPlain(v), explanation: t`$v = \sqrt{2eV/m_e} = \sqrt{\dfrac{2 \times 1.60 \times 10^{-19} \times 1200}{9.11 \times 10^{-31}}} = ${sciTex(v)}\ \text{m s}^{-1}$.` }),
        P.num({ label: "(b)", marks: 2, stem: t`Calculate the acceleration of an electron between the deflecting plates, in $\text{m s}^{-2}$, to three significant figures.`, value: a, unit: "m/s²", wrong: [(e * Vd) / me], answer: sciPlain(a), explanation: t`$E = 130/0.012 =${sciTex(E, 2)}\ \text{V m}^{-1}$; $a = eE/m_e = ${sciTex(a)}\ \text{m s}^{-2}$, upwards.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the vertical displacement of an electron as it leaves the plates, in mm, to three significant figures.", value: y * 1000, unit: "mm", wrong: [a * tt * tt * 1000], explanation: t`$t = L/v = 0.032/${sciTex(v)} = ${sciTex(tt)}\ \text{s}$; $y = \tfrac{1}{2}at^2 = ${sfStr(y * 1000, 3)}\ \text{mm}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the angle, in degrees, between the beam leaving the plates and its original direction, to three significant figures.", value: ang, unit: "°", wrong: [(Math.atan(y / L) * 180) / Math.PI], explanation: t`$v_y = at = ${sciTex(vy)}\ \text{m s}^{-1}$; $\tan\theta = v_y/v_x$, so $\theta = ${sfStr(ang, 3)}^\circ$. (Using $y/L$ gives half the correct tangent.)` }),
        P.manual({ label: "(e)", marks: 2, stem: "Show that the displacement y is given by y = V_d L²/(4 d V_a), and hence state how the deflection changes if the accelerating p.d. is doubled.", points: [t`Substituting $a = eV_d/(m_ed)$, $t = L/v$ and $v^2 = 2eV_a/m_e$ into $y = \tfrac{1}{2}at^2$ gives $y = \dfrac{V_dL^2}{4dV_a}$ (e and m cancel).`, "Doubling V_a halves the deflection (faster electrons spend less time between the plates)."], modelAnswer: t`$y = \tfrac{1}{2}\dfrac{eV_d}{m_ed}\dfrac{L^2}{v^2}$ and $v^2 = \dfrac{2eV_a}{m_e}$, so $y = \dfrac{V_dL^2}{4dV_a}$. Doubling $V_a$ halves $y$.` }),
        P.manual({ label: "(f)", marks: 2, stem: "Explain why the electrons would not be deflected if the deflecting plates were removed, even though they still have weight, and suggest why the formula in (e) does not depend on e or mₑ.", points: ["The weight of an electron (about 10⁻²⁹ N) is negligible compared with any electric force, so the beam travels in a straight line over the short distance.", "Both the energy gained in acceleration and the deflecting force are proportional to e, and the time and acceleration both involve mₑ, so they cancel: any charged particle accelerated and deflected by the same voltages follows the same path."], modelAnswer: "An electron's weight is only about 9 × 10⁻³⁰ N, so over a few centimetres it produces no measurable deflection. In (e) the charge and mass cancel because the accelerating energy and the deflecting force are both proportional to e, and the mass appears in both the speed and the acceleration; any particle with the same sign of charge would follow the same path." }),
      ],
      explanation: "v = √(2eV/m); a = eV/(md); t = L/v; y = ½at²; tan θ = v_y/v_x.",
      hints: ["Find the speed first.", "The horizontal speed is constant between the plates."],
    });
  }
  {
    const d = 5.0e-3, q = 3.2e-19, m = 6.64e-27, V = 400;
    const E = V / d, a = (q * E) / m, Ek = q * V, v = Math.sqrt((2 * Ek) / m);
    b.struct({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`An alpha particle (charge $3.2 \times 10^{-19}\ \text{C}$, mass $6.64 \times 10^{-27}\ \text{kg}$) is released from rest next to the positive plate of a pair of parallel plates $5.0\ \text{mm}$ apart in a vacuum. The p.d. between the plates is $400\ \text{V}$.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: t`Calculate the electric force on the alpha particle, in N, to two significant figures.`, value: q * E, sf: 2, unit: "N", wrong: [q * V], explanation: t`$E = 400/0.0050 =${sciTex(E, 2)}\ \text{V m}^{-1}$; $F = qE = ${sciTex(q * E, 2)}\ \text{N}$.` }),
        P.num({ label: "(b)", marks: 1, stem: t`Calculate its acceleration, in $\text{m s}^{-2}$, to two significant figures.`, value: a, sf: 2, unit: "m/s²", wrong: [(q * V) / m], explanation: t`$a = F/m = ${sciTex(a, 2)}\ \text{m s}^{-2}$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Calculate the speed with which it reaches the negative plate, in $\text{m s}^{-1}$, to two significant figures.`, value: v, sf: 2, unit: "m/s", wrong: [Math.sqrt((Ek) / m)], explanation: t`$\tfrac{1}{2}mv^2 = qV = ${sciTex(Ek, 2)}\ \text{J}$, so $v = ${sciTex(v, 2)}\ \text{m s}^{-1}$ (or $v^2 = 2ad$).` }),
        P.manual({ label: "(d)", marks: 1, stem: "State and explain how the speed at the negative plate would change if the plate separation were doubled with the p.d. unchanged.", points: ["No change: the energy gained is qV, which does not depend on d (the force halves but acts over twice the distance)."], modelAnswer: "It would not change: the kinetic energy gained is qV, independent of the separation; halving the field and force is exactly compensated by doubling the distance." }),
      ],
      explanation: "E = V/d, F = qE, a = F/m, ½mv² = qV.",
      hints: ["The energy gained depends only on the p.d."],
    });
  }

  b.card("DEFINITION", "**Electric field**", "A region in which a charge experiences a force because of its charge.");
  b.card("DEFINITION", "**Electric field strength**", "The force per unit positive charge on a small stationary test charge placed at the point.");
  b.card("FORMULA", "Force on a charge", t`$F = qE$; unit of $E$: $\text{N C}^{-1} = \text{V m}^{-1}$`);
  b.card("FORMULA", "Uniform field between plates", t`$E = \dfrac{V}{d}$`);
  b.card("CONCEPT", "Field lines between plates", "Parallel, equally spaced, perpendicular to the plates, from + to −; curved at the edges.");
  b.card("FORMULA", "Energy gained crossing a p.d.", t`$\tfrac{1}{2}mv^2 = qV$ (from rest)`);
  b.card("CONCEPT", "Path across a uniform field", "Parabola: constant velocity along the plates, constant acceleration qE/m across them.");
  b.card("FACT", "Gravity on electrons", "Negligible: the electric force in typical fields is about 10¹⁴ times the weight.");
  b.card("CONCEPT", "Electron gun", "Electrons from a hot cathode are accelerated through a p.d. to an anode with a hole, forming a fast narrow beam.");
});
