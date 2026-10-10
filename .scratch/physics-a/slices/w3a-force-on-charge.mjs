// W3a: aphys.magnetism.force-on-charge — F = BQv sin θ, direction for + and − charges, circular paths r = mv/BQ,
// beam deflection, velocity selection v = E/B, mass spectrometer.
import { concept, P, t, chk, DATA, sfStr, dpStr, sciTex, sciPlain, rad, pctUnc } from "../lib.mjs";

const e = DATA.e, me = DATA.me, mp = DATA.mp, u = DATA.u;

concept("aphys.magnetism.force-on-charge", { file: "magnetism/force-on-charge", keyPrefix: "magnetism.force-on-charge" }, (b) => {
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A charged particle moves in a uniform magnetic field. Which statement is correct?",
    options: [
      ["The magnetic force does no work on the particle, so its speed is constant.", "Correct: the force is always perpendicular to the velocity."],
      ["The magnetic force increases the particle's speed in the direction of the field.", "The force is perpendicular to the field, and it cannot change the speed."],
      ["A stationary charged particle is pushed along the field lines.", "A charge at rest feels no magnetic force."],
      ["The force is greatest when the particle moves parallel to the field.", "Moving parallel to the field gives zero force (sin 0° = 0)."],
    ],
    answer: "A",
    explanation: "F = BQv sin θ acts at right angles to the velocity, so it does no work: the kinetic energy and speed are unchanged; only the direction changes.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "An electron moves to the right, across the page, in a uniform magnetic field directed into the page. In which direction is the magnetic force on it as it enters the field?",
    options: [
      ["down the page", "Correct: conventional current is to the left; field into page; left-hand rule gives down."],
      ["up the page", "This is the force on a positive charge moving to the right."],
      ["to the right, along its velocity", "The magnetic force is perpendicular to the velocity."],
      ["out of the page", "The force is perpendicular to the field, so it lies in the plane of the page."],
    ],
    answer: "A",
    explanation: t`For an electron the conventional current is opposite to its motion (to the left). Left-hand rule: field into page, current to the left, thrust down the page. Vector check: $\vec F = q\vec v \times \vec B$ with $q < 0$: right × into = up, reversed for the negative charge = down.`,
    hints: ["For an electron, the 'current' finger points opposite to its velocity."],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A proton and an electron move at the same speed at right angles to the same uniform magnetic field. Which statement about their paths is correct?",
    options: [
      ["They curve in opposite senses, and the proton's radius is much larger.", "Correct: opposite charges; r = mv/(BQ) with the proton's mass about 1840 times larger."],
      ["They curve in the same sense with equal radii.", "Opposite charges curve in opposite senses, and the masses differ."],
      ["They curve in opposite senses with equal radii, because the charges have equal size.", "Equal |Q| gives equal forces, but r also depends on the mass."],
      ["They curve in opposite senses, and the electron's radius is much larger.", "r ∝ m: the lighter electron moves in the much tighter circle."],
    ],
    answer: "A",
    explanation: "r = mv/(BQ): same v, B and |Q|, so r ∝ m. The proton's path is about 1840 times larger in radius, and it curls the opposite way.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Particles of the same charge and mass move in circles in a uniform magnetic field. The speed of one particle is doubled. What happens to the radius of its path and to the time for one revolution?",
    options: [
      ["The radius doubles and the time for one revolution is unchanged.", "Correct: r ∝ v; T = 2πm/(BQ)."],
      ["The radius doubles and the time for one revolution doubles.", "The longer circumference is covered at double speed, so T is unchanged."],
      ["The radius halves and the time for one revolution halves.", "r = mv/(BQ) is proportional to v, not inversely."],
      ["The radius is unchanged and the time for one revolution halves.", "Faster particles move in larger circles."],
    ],
    answer: "A",
    explanation: "r = mv/(BQ) ∝ v; T = 2πr/v = 2πm/(BQ), independent of v.",
    hints: ["Write T = 2πr/v and substitute for r."],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "In a velocity selector, which particles pass through undeflected?",
    options: [
      ["only those whose speed equals E/B, whatever their charge and mass", "Correct: QE = BQv gives v = E/B; Q cancels."],
      ["only those whose charge-to-mass ratio equals E/B", "The selector picks a speed; charge and mass cancel from the balance condition."],
      ["all particles of the same charge, whatever their speed", "Faster particles have a larger magnetic force and are deflected."],
      ["only those whose speed equals B/E", "This ratio is upside down: v = E/B."],
    ],
    answer: "A",
    explanation: "Undeflected if QE = BQv, i.e. v = E/B: the charge cancels and the mass does not appear.",
    hints: ["Balance the electric force against the magnetic force."],
  });
  {
    const B = 0.50, v = 3.0e6;
    const F = B * e * v;
    b.mcq({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: t`An alpha particle (charge $+2e$) moves at $3.0 \times 10^{6}\ \text{m s}^{-1}$ at right angles to a field of $0.50\ \text{T}$. What is the magnetic force on it?`,
      options: [
        [t`$${sciTex(2 * F)}\ \text{N}$`, "Correct: F = B(2e)v."],
        [t`$${sciTex(F)}\ \text{N}$`, "This uses e instead of 2e for the alpha particle."],
        [t`$${sciTex(4 * F)}\ \text{N}$`, "This uses the nucleon number (4) instead of the charge number (2)."],
        [t`$${sciTex(2 * e * v / B)}\ \text{N}$`, "B must multiply, not divide."],
      ],
      answer: "A",
      explanation: t`$F = BQv = 0.50 \times 2 \times 1.60 \times 10^{-19} \times 3.0 \times 10^{6} = ${sciTex(2 * F)}\ \text{N}$.`,
    });
  }
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A beam of electrons enters a region of uniform field at right angles to the field. Which comparison of the path in an electric field with the path in a magnetic field is correct?",
    options: [
      ["parabola in the electric field; arc of a circle in the magnetic field", "Correct: fixed-direction force versus force always perpendicular to v."],
      ["arc of a circle in the electric field; parabola in the magnetic field", "The two have been swapped."],
      ["parabola in both fields", "The magnetic force turns with the velocity, so it cannot give a parabola."],
      ["straight line in the magnetic field, because no work is done", "No work means constant speed, not zero force: the direction still changes."],
    ],
    answer: "A",
    explanation: "An electric field gives a constant force in a fixed direction (projectile-like parabola). A magnetic field gives a force always perpendicular to the velocity (circle) and the speed does not change.",
    hints: ["Does the direction of each force change as the electron turns?"],
  });
  {
    const E = 3.6e4, B = 0.12;
    b.mcq({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: t`A velocity selector has an electric field of $3.6 \times 10^{4}\ \text{V m}^{-1}$ and a magnetic field of $0.12\ \text{T}$. What speed of ion passes straight through?`,
      options: [
        [t`$${sciTex(E / B, 2)}\ \text{m s}^{-1}$`, "Correct: v = E/B."],
        [t`$${sciTex(E * B, 2)}\ \text{m s}^{-1}$`, "E and B must be divided, not multiplied."],
        [t`$${sciTex(B / E, 2)}\ \text{m s}^{-1}$`, "The ratio is upside down."],
        [t`$${sciTex(E / B / e, 2)}\ \text{m s}^{-1}$`, "The charge cancels; it must not be divided out."],
      ],
      answer: "A",
      explanation: t`$v = E/B = 3.6 \times 10^{4}/0.12 = ${sciTex(E / B, 2)}\ \text{m s}^{-1}$, for any charge or mass.`,
    });
  }
  // Numerical
  {
    const B = 0.80, v = 5.0e5, th = 35;
    const F = B * e * v * Math.sin(rad(th));
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: t`A proton moves at $5.0 \times 10^{5}\ \text{m s}^{-1}$ at $35^\circ$ to a uniform field of $0.80\ \text{T}$. Calculate the magnetic force on it, in N, to three significant figures.`,
      value: F, unit: "N", wrong: [B * e * v * Math.cos(rad(th)), B * e * v],
      explanation: t`$F = BQv\sin\theta = 0.80 \times 1.60 \times 10^{-19} \times 5.0 \times 10^{5} \times \sin 35^\circ = ${sciTex(F)}\ \text{N}$. Using $\cos 35^\circ$ (angle measured wrongly) gives $${sciTex(B * e * v * Math.cos(rad(th)))}\ \text{N}$.`,
    });
  }
  {
    const v = 4.2e7, B = 3.5e-3;
    const r = (me * v) / (e * B);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Electrons travelling at $4.2 \times 10^{7}\ \text{m s}^{-1}$ enter a uniform magnetic field of $3.5\ \text{mT}$ at right angles. Calculate the radius of their circular path, in cm, to three significant figures.`,
      value: r * 100, unit: "cm", wrong: [(me * v) / (e * 3.5) * 100, (mp * v) / (e * B) * 100],
      explanation: t`1. $BQv = \dfrac{mv^2}{r} \Rightarrow r = \dfrac{m_ev}{eB}$.
2. $r = \dfrac{9.11 \times 10^{-31} \times 4.2 \times 10^{7}}{1.60 \times 10^{-19} \times 3.5 \times 10^{-3}} = ${sfStr(r, 3)}\ \text{m} = ${sfStr(r * 100, 3)}\ \text{cm}$.
3. Not converting mT to T gives a radius 1000 times too small.`,
      hints: ["Convert mT to T."],
    });
  }
  {
    const r = 0.25, B = 0.40, q = e;
    const v = (B * q * r) / mp;
    const Ek = 0.5 * mp * v * v / e / 1e6;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`Protons move in a circle of radius $25\ \text{cm}$ in a uniform field of $0.40\ \text{T}$. Calculate their kinetic energy, in MeV, to three significant figures.`,
      value: Ek, unit: "MeV", wrong: [(mp * v * v) / e / 1e6, 0.5 * mp * v * v],
      explanation: t`1. $v = \dfrac{BQr}{m} = \dfrac{0.40 \times 1.60 \times 10^{-19} \times 0.25}{1.67 \times 10^{-27}} = ${sciTex(v)}\ \text{m s}^{-1}$.
2. $E_k = \tfrac{1}{2}mv^2 = ${sciTex(0.5 * mp * v * v)}\ \text{J}$.
3. $E_k = ${sciTex(0.5 * mp * v * v)}/(1.60 \times 10^{-19}) = ${sciTex(Ek * 1e6)}\ \text{eV} = ${sfStr(Ek, 3)}\ \text{MeV}$.`,
      hints: ["Find v from r = mv/(BQ) first."],
    });
  }
  {
    const B = 1.2e-3, me_ = me;
    const T = (2 * Math.PI * me_) / (e * B);
    const f = 1 / T;
    b.num({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Show that the number of revolutions per second made by an electron moving in a circle in a uniform field does not depend on its speed, and calculate it for a field of $1.2\ \text{mT}$, in MHz, to three significant figures.`,
      value: f / 1e6, unit: "MHz", wrong: [(e * B) / me_ / 1e6, T * 1e6],
      explanation: t`$T = \dfrac{2\pi r}{v} = \dfrac{2\pi}{v} \cdot \dfrac{mv}{eB} = \dfrac{2\pi m}{eB}$, so $f = \dfrac{eB}{2\pi m}$ has no $v$ in it. $f = \dfrac{1.60 \times 10^{-19} \times 1.2 \times 10^{-3}}{2\pi \times 9.11 \times 10^{-31}} = ${sciTex(f)}\ \text{Hz} = ${sfStr(f / 1e6, 3)}\ \text{MHz}$. Forgetting the $2\pi$ gives the angular frequency in rad s⁻¹.`,
      hints: ["Substitute r = mv/(eB) into T = 2πr/v."],
    });
  }
  // Uncertainty
  {
    const B = 2.50, dB = 0.05, r = 4.0, dr = 0.2, V = 150, dV = 1;
    // e/m = 2V/(B²r²): % = %V + 2%B + 2%r
    const pct = pctUnc(dV, V) + 2 * pctUnc(dB, B) + 2 * pctUnc(dr, r);
    b.num({
      d: 4, skill: "EVALUATION", calculator: true,
      stem: t`In a fine-beam tube, electrons accelerated through $V$ move in a circle of radius $r$ in a field $B$, and $\dfrac{e}{m} = \dfrac{2V}{B^2r^2}$. The readings are $V = 150 \pm 1\ \text{V}$, $B = 2.50 \pm 0.05\ \text{mT}$ and $r = 4.0 \pm 0.2\ \text{cm}$. Calculate the percentage uncertainty in $e/m$, to two significant figures.`,
      value: pct, sf: 2, unit: "%", wrong: [pctUnc(dV, V) + pctUnc(dB, B) + pctUnc(dr, r), 2 * pctUnc(dr, r)],
      explanation: t`Powers multiply the percentage uncertainty: $\dfrac{1}{150} \times 100 + 2 \times \dfrac{0.05}{2.50} \times 100 + 2 \times \dfrac{0.2}{4.0} \times 100 = ${sfStr(pctUnc(dV, V), 2)} + 4.0 + 10 = ${sfStr(pct, 2)}\%$. The radius dominates: measuring the diameter of the circle with a scale inside the tube, avoiding parallax, would help most.`,
      hints: ["For x², double the percentage uncertainty."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A charged particle moving parallel to a uniform magnetic field continues in a straight line at constant speed.",
    answer: true,
    explanation: "True. θ = 0, so F = BQv sin θ = 0: no force, so no change in velocity.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each situation with the path of the charged particle (ignore gravity).",
    pairs: [
      ["moving at right angles to a uniform magnetic field", "a circle"],
      ["moving at an angle (not 90°) to a uniform magnetic field", "a helix"],
      ["moving at right angles to a uniform electric field", "a parabola"],
      ["moving parallel to a uniform magnetic field", "a straight line at constant speed"],
    ],
    explanation: "Perpendicular to B: circle; oblique: circle plus drift along B = helix; across E: parabola; along B: no force.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the equations for a particle of mass m and charge Q moving at speed v perpendicular to a uniform field B.",
    template: "The radius of the path is r = mv/{{blank:a}}. In a velocity selector the undeflected speed is v = {{blank:b}}. In a mass spectrometer, for ions of equal speed and charge, the radius is proportional to the {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["BQ"], choices: ["BQ", "BQv", "B²Q"] },
      { id: "b", accepted: ["E/B"], choices: ["E/B", "B/E", "EB"] },
      { id: "c", accepted: ["mass"], choices: ["mass", "charge", "speed squared"] },
    ],
    explanation: "BQv = mv²/r gives r = mv/(BQ); QE = BQv gives v = E/B; with v, B and Q fixed, r ∝ m.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: t`Explain why a charged particle moving at right angles to a uniform magnetic field follows a circular path, and show that the radius is $r = mv/(BQ)$.`,
    points: [
      "The magnetic force BQv is always perpendicular to the velocity.",
      "So it does no work: the speed is constant, and so the size of the force is constant.",
      "A constant-size force always perpendicular to the velocity is a centripetal force: uniform circular motion.",
      t`$BQv = mv^2/r$, so $r = mv/(BQ)$.`,
    ],
    modelAnswer: t`The force $BQv$ always acts at right angles to the velocity, so it does no work and the speed stays constant; therefore the force has constant size. A force of constant size always perpendicular to the velocity provides a centripetal force, giving uniform circular motion. Equating, $BQv = mv^2/r$, so $r = mv/(BQ)$.`,
    explanation: "Perpendicular force, constant speed, centripetal force.",
    hints: ["What does a force perpendicular to the velocity do to the speed?"],
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Describe how a mass spectrometer with a velocity selector separates ions of two isotopes of the same element.",
    points: [
      "The atoms are ionised (same charge, e.g. +e) and accelerated into a velocity selector.",
      "Crossed E and B fields: only ions with v = E/B pass undeflected through the exit slit, so all emerging ions have the same speed.",
      "In a second uniform magnetic field they move in semicircles of radius r = mv/(BQ).",
      "With v, B and Q the same, r ∝ m: the heavier isotope follows a larger semicircle and lands further along the detector.",
    ],
    modelAnswer: "The atoms are ionised so that each carries the same charge and are accelerated into a velocity selector, where crossed electric and magnetic fields let only ions with v = E/B pass straight through the slit. These ions then enter a second uniform magnetic field and move in semicircles of radius r = mv/(BQ). Since v, B and Q are the same for both isotopes, r is proportional to the mass, so the heavier isotope lands further from the entrance slit.",
    explanation: "Equal speed from the selector, then r ∝ m.",
    hints: ["Why is the velocity selector needed first?"],
  });
  // Practice structured: velocity selector and spectrometer
  {
    const E = 3.0e4, B1 = 0.10, B2 = 0.40;
    const v = E / B1;
    const m1 = 24 * u, m2 = 26 * u;
    const r1 = (m1 * v) / (e * B2), r2 = (m2 * v) / (e * B2);
    const sep = 2 * (r2 - r1);
    chk(v, 3.0e5, 1e-6);
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`Singly charged magnesium ions of mass $24\ \text{u}$ and $26\ \text{u}$ ($1\ \text{u} = 1.66 \times 10^{-27}\ \text{kg}$) enter a velocity selector with an electric field of $3.0 \times 10^{4}\ \text{V m}^{-1}$ and a magnetic field of $0.10\ \text{T}$. The selected ions then enter a uniform field of $0.40\ \text{T}$, perpendicular to their velocity, and travel through a semicircle before striking a detector.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: t`Calculate the speed of the ions leaving the selector, in $\text{m s}^{-1}$.`, value: v, unit: "m/s", wrong: [E * B1], answer: sciPlain(v, 2), explanation: t`$QE = BQv \Rightarrow v = E/B = 3.0 \times 10^{4}/0.10 = ${sciTex(v, 2)}\ \text{m s}^{-1}$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the radius of the path of the 24 u ions, in m, to three significant figures.", value: r1, unit: "m", wrong: [(m1 * v) / (e * B1)], explanation: t`$r = \dfrac{mv}{BQ} = \dfrac{24 \times 1.66 \times 10^{-27} \times ${sciTex(v, 2)}}{0.40 \times 1.60 \times 10^{-19}} = ${sfStr(r1, 3)}\ \text{m}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the distance between the points where the two isotopes strike the detector, in cm, to three significant figures.", value: sep * 100, unit: "cm", wrong: [(r2 - r1) * 100], explanation: t`$r_{26} = ${sfStr(r2, 3)}\ \text{m}$; the ions land a diameter from the slit, so the separation is $2(r_{26} - r_{24}) = ${sfStr(sep * 100, 3)}\ \text{cm}$.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain why the speed selected does not depend on the charge of the ions, and state what would happen to an ion moving slightly faster than this speed in the selector.", points: ["Both forces (QE and BQv) are proportional to Q, so Q cancels in QE = BQv.", "A faster ion has BQv > QE, so it is deflected in the direction of the magnetic force and misses the exit slit."], modelAnswer: "The electric force QE and the magnetic force BQv both contain Q, so it cancels from the balance condition v = E/B. A faster ion has a magnetic force larger than the electric force, so it is deflected towards the side of the magnetic force and does not pass through the slit." }),
      ],
      explanation: "v = E/B; r = mv/(BQ) ∝ m; separation = difference in diameters.",
      hints: ["The ions land one diameter from the entry slit."],
    });
  }
  {
    const B = 1.8e-3, V = 200;
    const v = Math.sqrt((2 * e * V) / me);
    const r = (me * v) / (e * B);
    b.struct({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`In a fine-beam tube, electrons are accelerated from rest through $200\ \text{V}$ and then move at right angles to a uniform magnetic field of $1.8\ \text{mT}$ produced by a pair of coils.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: t`Calculate the speed of the electrons, in $\text{m s}^{-1}$, to three significant figures.`, value: v, unit: "m/s", wrong: [Math.sqrt((e * V) / me)], answer: sciPlain(v), explanation: t`$\tfrac{1}{2}m_ev^2 = eV \Rightarrow v = \sqrt{2eV/m_e} = ${sciTex(v)}\ \text{m s}^{-1}$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the radius of the circular beam, in cm, to three significant figures.", value: r * 100, unit: "cm", wrong: [((me * v) / (e * 1.8)) * 100], explanation: t`$r = \dfrac{m_ev}{eB} = \dfrac{9.11 \times 10^{-31} \times ${sciTex(v)}}{1.60 \times 10^{-19} \times 1.8 \times 10^{-3}} = ${sfStr(r * 100, 3)}\ \text{cm}$.` }),
        P.manual({ label: "(c)", marks: 2, stem: "State and explain the effect on the radius of increasing the accelerating voltage to 800 V, the field being unchanged.", points: ["Speed doubles (v ∝ √V, √4 = 2).", "r ∝ v, so the radius doubles."], modelAnswer: "v ∝ √V, so quadrupling V doubles the speed; since r = mv/(eB) ∝ v, the radius doubles." }),
      ],
      explanation: "eV = ½mv², then r = mv/(eB).",
      hints: ["Find the speed first from the accelerating voltage."],
    });
  }

  b.card("FORMULA", "Force on a moving charge", t`$F = BQv\sin\theta$, perpendicular to $v$ and $B$`);
  b.card("FORMULA", "Radius in a magnetic field", t`$r = \dfrac{mv}{BQ}$ (from $BQv = mv^2/r$)`);
  b.card("FORMULA", "Velocity selector", t`$v = \dfrac{E}{B}$, independent of charge and mass`);
  b.card("CONCEPT", "No work by a magnetic force", "The force is perpendicular to the velocity, so speed and kinetic energy are constant.");
  b.card("CONCEPT", "Direction for electrons", "Point the current finger opposite to the electron's velocity in Fleming's left-hand rule.");
  b.card("FACT", "Period of circular motion", t`$T = \dfrac{2\pi m}{BQ}$: independent of speed`);
  b.card("CONCEPT", "Mass spectrometer", "Selector gives equal speeds; in a uniform field r ∝ m, so isotopes land at different points.");
  b.card("CONCEPT", "Electric versus magnetic deflection", "Electric field across a beam: parabola. Magnetic field: circular arc at constant speed.");
});
