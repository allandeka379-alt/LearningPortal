// W3a: aphys.gravitation.potential — φ = −GM/r, E_P = −GMm/r, why negative, energy changes, escape speed,
// g as the negative potential gradient.
import { concept, P, t, chk, DATA, sfStr, dpStr, sciTex, sciPlain, gPotential, gField, table } from "../lib.mjs";

const G = DATA.G;

concept("aphys.gravitation.potential", { file: "gravitation/potential", keyPrefix: "gravitation.potential" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement defines the gravitational potential at a point?",
    options: [
      ["the work done per unit mass in bringing a small test mass from infinity to the point", "Correct."],
      ["the work done in bringing a small test mass from infinity to the point", "Potential is per unit mass; this describes potential energy."],
      ["the gravitational force per unit mass on a small test mass at the point", "This defines gravitational field strength."],
      ["the work done per unit mass in moving a small test mass from the point to the Earth's surface", "The reference point for potential is infinity, not the Earth's surface."],
    ],
    answer: "A",
    explanation: "Gravitational potential φ is the work done per unit mass bringing a small test mass from infinity to the point.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is the gravitational potential near a planet negative?",
    options: [
      ["The potential is zero at infinity and the attractive force means work is done by the field as a mass moves in.", "Correct: energy must be supplied to move the mass back out to zero potential."],
      ["The potential is taken as zero at the planet's surface, and it then decreases steadily as a mass is moved further away.", "The zero is at infinity, and potential increases with distance."],
      ["The gravitational force on a mass near the planet acts away from the planet.", "Gravity is always attractive, towards the planet."],
      ["Mass can be negative, so the product of the masses in the formula is negative.", "Mass is always positive; the sign comes from the choice of zero at infinity."],
    ],
    answer: "A",
    explanation: "With zero at infinity, and gravity attractive, the work done by an external agent bringing a mass in is negative, so φ < 0 everywhere at finite distance.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "At the surface of a planet of radius R, the gravitational potential is φ and the field strength is g. What are the potential and the field strength at a distance 2R from the centre?",
    options: [
      ["φ/2 and g/4", "Correct: φ ∝ 1/r and g ∝ 1/r²."],
      ["φ/4 and g/2", "These are the wrong way round."],
      ["φ/2 and g/2", "Field strength follows an inverse-square law."],
      ["2φ and g/4", "The magnitude of the potential decreases with distance; 2φ would be twice as negative."],
    ],
    answer: "A",
    explanation: "φ = −GM/r halves when r doubles; g = GM/r² falls to a quarter.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: t`Which unit is equivalent to the unit of gravitational potential, $\text{J kg}^{-1}$?`,
    options: [
      [t`$\text{m}^2\,\text{s}^{-2}$`, "Correct: J = kg m² s⁻², so J kg⁻¹ = m² s⁻²."],
      [t`$\text{m s}^{-2}$`, "This is equivalent to N kg⁻¹, the unit of field strength."],
      [t`$\text{N m}^{-1}$`, "This is the unit of a spring constant."],
      [t`$\text{kg m}^2\,\text{s}^{-2}$`, "This is the joule itself."],
    ],
    answer: "A",
    explanation: t`$\text{J kg}^{-1} = \text{kg m}^2\,\text{s}^{-2}/\text{kg} = \text{m}^2\,\text{s}^{-2}$ (the unit of speed squared, which is why $v_{\text{esc}}^2 = 2GM/R$ is homogeneous).`,
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A graph shows the gravitational potential φ against distance r from the centre of a planet. What does the gradient of the tangent at a point give?",
    options: [
      ["the magnitude of the gravitational field strength at that point", "Correct: g = −Δφ/Δr."],
      ["the gravitational potential energy of a 1 kg mass at that point", "That is the value of φ itself, read from the y-axis."],
      ["the work needed to move a 1 kg mass from that point to infinity", "That is −φ, again read from the axis, not the gradient."],
      ["the speed needed to escape from that point", "Escape speed is √(−2φ), found from the value of φ, not its gradient."],
    ],
    answer: "A",
    explanation: "Field strength is the negative of the potential gradient: the slope of φ against r gives g (positive slope, field directed towards smaller r).",
    hints: ["Recall the link between field strength and potential gradient."],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Planet Y has twice the mass and twice the radius of planet X. How does the escape speed from Y compare with that from X?",
    options: [
      ["It is the same.", "Correct: v = √(2GM/R) and M/R is unchanged."],
      ["It is twice as large.", "This uses M alone and ignores R."],
      ["It is √2 times as large.", "This uses √M alone and ignores R."],
      ["It is half as large.", "Doubling M compensates exactly for doubling R."],
    ],
    answer: "A",
    explanation: "v_esc = √(2GM/R); M/R is the same for both, so the escape speeds are equal.",
    hints: ["Escape speed depends on M/R."],
  });
  {
    const phi = gPotential(4.87e24, 6.05e6);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Venus has mass $4.87 \times 10^{24}\ \text{kg}$ and radius $6.05 \times 10^{6}\ \text{m}$. What is the gravitational potential at its surface?`,
      options: [
        [t`$${sciTex(phi)}\ \text{J kg}^{-1}$`, "Correct: φ = −GM/R."],
        [t`$${sciTex(-phi)}\ \text{J kg}^{-1}$`, "The potential near a mass is negative."],
        [t`$${sciTex(-gField(4.87e24, 6.05e6))}\ \text{J kg}^{-1}$`, "This divides by R², giving the field strength (with a minus sign)."],
        [t`$${sciTex(2 * phi)}\ \text{J kg}^{-1}$`, "The factor 2 belongs in the escape-speed formula, not in φ."],
      ],
      answer: "A",
      explanation: t`$\phi = -\dfrac{GM}{R} = -\dfrac{6.67 \times 10^{-11} \times 4.87 \times 10^{24}}{6.05 \times 10^{6}} = ${sciTex(phi)}\ \text{J kg}^{-1}$.`,
      hints: ["Potential varies as 1/r and is negative."],
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which description of the gravitational equipotential surfaces around an isolated spherical planet is correct?",
    options: [
      ["concentric spheres, closer together near the planet, crossed at right angles by the field lines", "Correct: φ depends only on r; equal steps of φ are closer where the field is strong."],
      ["concentric spheres, equally spaced at all distances, crossed at right angles by the field lines", "Equal potential steps are closer together where the field (gradient) is larger."],
      ["parallel planes, equally spaced, with the field lines lying along them", "Field lines are perpendicular to equipotentials; no work is done along an equipotential."],
      ["concentric spheres, further apart near the planet, with the field lines lying along them", "Near the planet the field is strongest, so the surfaces are closest together there."],
    ],
    answer: "A",
    explanation: "φ = −GM/r is constant on spheres centred on the planet. The field (gradient) is strongest close in, so equal potential steps are closest there; field lines cross equipotentials at right angles.",
  });
  // Numerical
  {
    const M = 6.42e23, R = 3.39e6, v = Math.sqrt((2 * G * M) / R);
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: t`Calculate the escape speed from the surface of Mars (mass $6.42 \times 10^{23}\ \text{kg}$, radius $3.39 \times 10^{6}\ \text{m}$), in $\text{m s}^{-1}$, to three significant figures.`,
      value: v, unit: "m/s", wrong: [Math.sqrt((G * M) / R), (2 * G * M) / R],
      explanation: t`$v = \sqrt{\dfrac{2GM}{R}} = \sqrt{\dfrac{2 \times 6.67 \times 10^{-11} \times 6.42 \times 10^{23}}{3.39 \times 10^{6}}} = ${sfStr(v, 3)}\ \text{m s}^{-1}$. Leaving out the 2 gives the speed of an orbit at the surface, ${sfStr(Math.sqrt((G * M) / R), 3)} m s⁻¹.`,
    });
  }
  {
    const M = 6.0e24, m = 500, r1 = 7.0e6, r2 = 1.4e7;
    const dE = G * M * m * (1 / r1 - 1 / r2);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A $500\ \text{kg}$ satellite is moved from a circular orbit of radius $7.0 \times 10^{6}\ \text{m}$ to one of radius $1.4 \times 10^{7}\ \text{m}$ around the Earth (mass $6.0 \times 10^{24}\ \text{kg}$). Calculate the increase in its gravitational potential energy, in J, to two significant figures.`,
      value: dE, sf: 2, unit: "J", wrong: [G * M * m * (1 / r1 ** 2 - 1 / r2 ** 2), m * 9.81 * (r2 - r1)],
      explanation: t`1. $\Delta E_P = GMm\left(\dfrac{1}{r_1} - \dfrac{1}{r_2}\right)$.
2. $= 6.67 \times 10^{-11} \times 6.0 \times 10^{24} \times 500 \times \left(\dfrac{1}{7.0 \times 10^{6}} - \dfrac{1}{1.4 \times 10^{7}}\right)$.
3. $= ${sciTex(dE, 2)}\ \text{J}$.
4. Using $mg\Delta h$ with $g = 9.81\ \text{N kg}^{-1}$ gives $${sciTex(m * 9.81 * (r2 - r1), 2)}\ \text{J}$, far too large, because $g$ is much smaller than $9.81\ \text{N kg}^{-1}$ along most of the path.`,
      hints: ["Find the potential at each radius and subtract."],
    });
  }
  {
    const M = 7.35e22, R = 1.74e6;
    const v = Math.sqrt((G * M) / R);
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A probe is fired vertically upwards from the surface of the Moon (mass $7.35 \times 10^{22}\ \text{kg}$, radius $1.74 \times 10^{6}\ \text{m}$; no atmosphere). Calculate the launch speed it needs to reach a height equal to the Moon's radius before falling back, in $\text{m s}^{-1}$, to three significant figures.`,
      value: v, unit: "m/s", wrong: [Math.sqrt((2 * G * M) / R), Math.sqrt(2 * gField(M, R) * R)],
      explanation: t`1. At the top ($r = 2R$) the probe is momentarily at rest.
2. Energy: $\tfrac{1}{2}mv^2 = GMm\left(\dfrac{1}{R} - \dfrac{1}{2R}\right) = \dfrac{GMm}{2R}$.
3. $v = \sqrt{\dfrac{GM}{R}} = \sqrt{\dfrac{6.67 \times 10^{-11} \times 7.35 \times 10^{22}}{1.74 \times 10^{6}}} = ${sfStr(v, 3)}\ \text{m s}^{-1}$.
4. Using $v^2 = 2gh$ with the surface value of $g$ gives ${sfStr(Math.sqrt(2 * gField(M, R) * R), 3)} m s⁻¹, too high, because $g$ falls as the probe rises.`,
      hints: ["Use potential energy at R and at 2R, not mgh."],
    });
  }
  {
    const phi1 = -4.80e7, phi2 = -4.62e7, r1 = 8.30e6, r2 = 8.62e6;
    const gEst = (phi2 - phi1) / (r2 - r1);
    b.num({
      d: 3, skill: "ANALYSIS", calculator: true,
      stem: t`At distances of $8.30 \times 10^{6}\ \text{m}$ and $8.62 \times 10^{6}\ \text{m}$ from the centre of a planet, the gravitational potentials are $-4.80 \times 10^{7}\ \text{J kg}^{-1}$ and $-4.62 \times 10^{7}\ \text{J kg}^{-1}$. Estimate the magnitude of the gravitational field strength between these points, in $\text{N kg}^{-1}$, to two significant figures.`,
      value: gEst, sf: 2, unit: "N/kg", wrong: [-phi1 / r1, (phi2 - phi1) / r2],
      explanation: t`$g = -\dfrac{\Delta\phi}{\Delta r}$; magnitude $= \dfrac{(-4.62 + 4.80) \times 10^{7}}{(8.62 - 8.30) \times 10^{6}} = \dfrac{${sciTex(phi2 - phi1, 2)}}{${sciTex(r2 - r1, 2)}} = ${sfStr(gEst, 2)}\ \text{N kg}^{-1}$.`,
      hints: ["Field strength = potential gradient (in magnitude)."],
    });
  }
  // Uncertainty
  {
    const pM = 2.4, pR = 0.8, pv = (pM + pR) / 2;
    chk(pv, 1.6);
    b.num({
      d: 3, skill: "EVALUATION", calculator: true,
      stem: t`The escape speed of a planet is calculated from $v = \sqrt{2GM/R}$. The mass is known to $\pm 2.4\%$ and the radius to $\pm 0.8\%$; $G$ is exact. Calculate the percentage uncertainty in $v$, to two significant figures.`,
      value: pv, sf: 2, unit: "%", wrong: [pM + pR, pM / 2],
      explanation: t`$v = (2GM/R)^{1/2}$: the percentage uncertainty in $M/R$ is $2.4 + 0.8 = 3.2\%$; the square root halves it, giving $${sfStr(pv, 2)}\%$.`,
      hints: ["A square root multiplies the percentage uncertainty by ½."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "When a satellite moves to a higher orbit, its gravitational potential energy increases even though its value is still negative.",
    answer: true,
    explanation: "True. E_P = −GMm/r becomes less negative (closer to zero) as r increases, which is an increase.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each quantity for a spherical planet of mass M with how it depends on the distance r from the centre (outside the planet).",
    pairs: [
      ["gravitational field strength", t`$\propto 1/r^2$`],
      ["gravitational potential", t`$\propto -1/r$`],
      ["orbital speed of a satellite", t`$\propto 1/\sqrt{r}$`],
      ["orbital period of a satellite", t`$\propto r^{3/2}$`],
    ],
    explanation: "g = GM/r²; φ = −GM/r; v = √(GM/r); T² ∝ r³.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements about gravitational potential.",
    template: "Gravitational potential is zero at {{blank:a}}. Close to a planet it is {{blank:b}}. The gravitational field strength equals the negative of the potential {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["infinity"], choices: ["infinity", "the surface", "the centre"] },
      { id: "b", accepted: ["negative"], choices: ["negative", "positive", "zero"] },
      { id: "c", accepted: ["gradient"], choices: ["gradient", "energy", "difference"] },
    ],
    explanation: "φ = −GM/r is zero at infinity and negative elsewhere; g = −Δφ/Δr.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Define gravitational potential at a point and explain why its value near a planet is negative.",
    points: [
      "Work done per unit mass in bringing a small test mass from infinity to the point.",
      "The potential is defined as zero at infinity.",
      "The gravitational force is attractive, so the field does work on the mass as it approaches (work done by an external agent is negative / energy is released), so the potential is below zero.",
    ],
    modelAnswer: "Gravitational potential is the work done per unit mass in bringing a small test mass from infinity to the point. It is zero at infinity, and because gravity attracts, the field itself does work as the mass moves in; the work done on the mass by an external agent is negative, so the potential at any finite distance is negative.",
    explanation: "Definition; zero at infinity; attraction gives negative work.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: t`Show that the escape speed from the surface of a planet of mass $M$ and radius $R$ is $v = \sqrt{2GM/R}$, stating the assumptions you make.`,
    points: [
      t`To escape, the object must reach infinity, where $E_P = 0$; its potential energy at the surface is $-GMm/R$, so it needs to gain $GMm/R$.`,
      t`Kinetic energy at launch supplies this: $\tfrac{1}{2}mv^2 = GMm/R$, so $v = \sqrt{2GM/R}$ (the object's mass cancels).`,
      "Assumptions: no air resistance and no other bodies' fields (and no further energy supplied after launch).",
    ],
    modelAnswer: "At the surface E_P = −GMm/R; at infinity it is zero. The object just escapes if its kinetic energy at launch equals the gain in potential energy: ½mv² = GMm/R, giving v = √(2GM/R), independent of m. This assumes no air resistance, no other gravitating bodies and no thrust after launch.",
    explanation: "Energy conservation from the surface to infinity.",
    hints: ["What is E_P at infinity?"],
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 2,
    stem: t`Explain why $\Delta E_P = mg\Delta h$ gives a good answer for raising a load up a Kariba dam wall but not for launching a satellite into a high orbit.`,
    points: [
      "mgΔh assumes g is constant over the height change.",
      "This is true for heights (about 100 m) tiny compared with the Earth's radius, but for orbits g falls significantly (∝ 1/r²), so ΔE_P = GMm(1/r₁ − 1/r₂) must be used.",
    ],
    modelAnswer: "mgΔh assumes the field strength is constant. Over the height of a dam wall, a tiny fraction of the Earth's radius, g hardly changes, so the formula is accurate. On the way to a high orbit g falls greatly, so the energy must be found from the change in potential, GMm(1/r₁ − 1/r₂).",
    explanation: "Uniform-field approximation versus radial field.",
    hints: ["What does mgΔh assume about g?"],
  });
  // Practice structured: potential data
  {
    const M = 3.30e23, R = 2.44e6;
    const ks = [1, 1.5, 2, 3, 4];
    const L = (x) => dpStr(x, 2).replace("−", "-");
    const rs = ks.map((k) => k * R);
    const ph = rs.map((r) => Number((gPotential(M, r) / 1e6).toFixed(2)));
    const tab = table([t`$r\,/\,10^{6}\ \text{m}$`, t`$\phi\,/\,10^{6}\ \text{J kg}^{-1}$`], rs.map((r, i) => [dpStr(r / 1e6, 2), L(ph[i], 2)]));
    const Mfit = (-ph[0] * 1e6 * rs[0]) / G;
    const vesc = Math.sqrt(-2 * ph[0] * 1e6);
    const dEp = 250 * (ph[2] - ph[0]) * 1e6;
    const gSurf = gField(Mfit, R);
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A space agency models the gravitational potential $\phi$ around a small rocky planet of radius $2.44 \times 10^{6}\ \text{m}$. Values at several distances $r$ from its centre are shown.

${tab}`,
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: t`Show that the data are consistent with $\phi \propto -1/r$.`, points: [t`$\phi r$ is constant (e.g. ${L(ph[0])} × ${dpStr(rs[0] / 1e6, 2)} ≈ ${L(ph[2])} × ${dpStr(rs[2] / 1e6, 2)}), or doubling r halves φ.`, t`So $\phi = -\text{constant}/r$, with constant $GM$.`], modelAnswer: t`Doubling $r$ from ${dpStr(rs[0] / 1e6, 2)} to ${dpStr(rs[2] / 1e6, 2)} × 10⁶ m changes $\phi$ from ${L(ph[0])} to ${L(ph[2])} × 10⁶ J kg⁻¹, i.e. halves it; $\phi r$ is the same in every row, so $\phi = -GM/r$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Use the value at the surface to calculate the mass of the planet, in kg, to three significant figures.", value: Mfit, unit: "kg", wrong: [(-ph[0] * 1e6 * rs[0] * rs[0]) / G], answer: sciPlain(Mfit), explanation: t`$M = -\dfrac{\phi R}{G} = \dfrac{${dpStr(-ph[0], 2)} \times 10^{6} \times 2.44 \times 10^{6}}{6.67 \times 10^{-11}} = ${sciTex(Mfit)}\ \text{kg}$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Calculate the escape speed from the surface, in $\text{m s}^{-1}$, to three significant figures.`, value: vesc, unit: "m/s", wrong: [Math.sqrt(-ph[0] * 1e6)], explanation: t`$\tfrac{1}{2}v^2 = -\phi$, so $v = \sqrt{2 \times ${dpStr(-ph[0], 2)} \times 10^{6}} = ${sfStr(vesc, 3)}\ \text{m s}^{-1}$.` }),
        P.num({ label: "(d)", marks: 2, stem: t`Calculate the gain in potential energy when a $250\ \text{kg}$ lander is lifted from the surface to $r = ${dpStr(rs[2] / 1e6, 2)} \times 10^{6}\ \text{m}$, in J, to three significant figures.`, value: dEp, unit: "J", wrong: [250 * (ph[0] - ph[2]) * 1e6], explanation: t`$\Delta E_P = m(\phi_2 - \phi_1) = 250 \times (${L(ph[2])} - (${L(ph[0])})) \times 10^{6} = ${sciTex(dEp)}\ \text{J}$ (positive: the potential rises).` }),
        P.num({ label: "(e)", marks: 2, stem: t`Using your mass from (b), calculate the gravitational field strength at the surface, in $\text{N kg}^{-1}$, to three significant figures.`, value: gSurf, unit: "N/kg", wrong: [-ph[0] * 1e6], explanation: t`$g = \dfrac{GM}{R^2} = -\dfrac{\phi}{R} = \dfrac{${dpStr(-ph[0], 2)} \times 10^{6}}{2.44 \times 10^{6}} = ${sfStr(gSurf, 3)}\ \text{N kg}^{-1}$.` }),
        P.manual({ label: "(f)", marks: 2, stem: "Describe the graph of φ against r for these data, and explain how the field strength at any r could be found from it.", points: ["φ is negative, rising towards zero with increasing r; steep near the planet and flattening out (a −1/r curve).", "Draw the tangent at that r: the field strength equals the gradient of the tangent (g = −Δφ/Δr, magnitude)."], modelAnswer: "The graph is a negative curve rising towards zero, steep close to the planet and levelling off at large r. The field strength at any r is the gradient of the tangent to the curve at that point, since g = −Δφ/Δr." }),
      ],
      explanation: "φ = −GM/r; v_esc = √(−2φ); ΔE_P = mΔφ; g = −dφ/dr = GM/r².",
      hints: ["φr should be constant.", "Escape needs ½v² = −φ."],
    });
  }
  {
    const M = 6.0e24, R = 6.4e6, m = 2.0;
    const phiS = -(G * M) / R;
    const vesc = Math.sqrt((2 * G * M) / R);
    const v0 = 5.0e3;
    const rmax = 1 / (1 / R - (v0 * v0) / (2 * G * M));
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A $2.0\ \text{kg}$ instrument package is fired straight upwards from the Earth's surface. The Earth has mass $6.0 \times 10^{24}\ \text{kg}$ and radius $6.4 \times 10^{6}\ \text{m}$. Ignore air resistance and the Earth's rotation.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: t`Calculate the gravitational potential at the Earth's surface, in $\text{J kg}^{-1}$, to three significant figures.`, value: phiS, wrong: [-phiS], explanation: t`$\phi = -GM/R = ${sciTex(phiS)}\ \text{J kg}^{-1}$.` }),
        P.num({ label: "(b)", marks: 2, stem: t`Calculate the minimum launch speed needed for the package to escape from the Earth, in $\text{m s}^{-1}$, to two significant figures.`, value: vesc, sf: 2, unit: "m/s", wrong: [Math.sqrt(-phiS)], explanation: t`$v = \sqrt{-2\phi} = \sqrt{2GM/R} = ${sciTex(vesc, 2)}\ \text{m s}^{-1}$.` }),
        P.num({ label: "(c)", marks: 3, stem: t`The package is instead launched at $5.0\ \text{km s}^{-1}$. Calculate the greatest distance from the Earth's centre that it reaches, in m, to two significant figures.`, value: rmax, sf: 2, unit: "m", wrong: [R + (v0 * v0) / (2 * 9.81)], explanation: t`$\tfrac{1}{2}v^2 = GM\left(\dfrac{1}{R} - \dfrac{1}{r}\right)$, so $\dfrac{1}{r} = \dfrac{1}{R} - \dfrac{v^2}{2GM}$, giving $r = ${sciTex(rmax, 2)}\ \text{m}$. Using $v^2 = 2gh$ with constant $g$ gives $${sciTex(R + (v0 * v0) / (2 * 9.81), 2)}\ \text{m}$, too small, because $g$ weakens with height.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain why the escape speed does not depend on the mass of the package.", points: ["Both the kinetic energy at launch (½mv²) and the energy needed to escape (GMm/R) are proportional to m.", "So m cancels: v = √(2GM/R)."], modelAnswer: "The kinetic energy ½mv² and the potential energy to be gained, GMm/R, are both proportional to the package's mass, so m cancels and the escape speed depends only on M and R." }),
      ],
      explanation: "Energy conservation in a radial field: ½mv² = GMm(1/R − 1/r).",
      hints: ["At the highest point the package is momentarily at rest.", "Do not use mgh: g is not constant."],
    });
  }

  b.card("DEFINITION", "**Gravitational potential**", "The work done per unit mass in bringing a small test mass from infinity to the point.");
  b.card("FORMULA", "Potential of a point mass", t`$\phi = -\dfrac{GM}{r}$, unit $\text{J kg}^{-1}$, zero at infinity`);
  b.card("FORMULA", "Potential energy of two masses", t`$E_P = -\dfrac{GMm}{r}$`);
  b.card("CONCEPT", "Why potential is negative", "Zero at infinity; gravity attracts, so work is done by the field as a mass comes in: φ < 0 at every finite distance.");
  b.card("FORMULA", "Energy to move between radii", t`$\Delta E_P = GMm\left(\dfrac{1}{r_1} - \dfrac{1}{r_2}\right)$ (outwards: positive)`);
  b.card("FORMULA", "Escape speed", t`$\tfrac{1}{2}mv^2 = \dfrac{GMm}{R} \Rightarrow v = \sqrt{\dfrac{2GM}{R}}$`);
  b.card("CONCEPT", "Field and potential gradient", t`$g = -\Delta\phi/\Delta r$: the gradient of the $\phi$-$r$ graph gives $g$`);
  b.card("CONCEPT", "φ versus g with distance", "Doubling r halves φ (1/r) but quarters g (1/r²).");
  b.card("FACT", "Earth's escape speed", t`About $11.2\ \text{km s}^{-1}$, independent of the escaping mass`);
});
