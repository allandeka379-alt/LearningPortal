// W3a: aphys.efields.electric-potential — V = Q/(4πε₀r), E_P = Qq/(4πε₀r), E = −ΔV/Δr, equipotentials,
// closest approach, comparison with gravitational potential.
import { concept, P, t, chk, DATA, sfStr, dpStr, sciTex, sciPlain, ePotential, pctUnc, table } from "../lib.mjs";

const k = DATA.k_e, e = DATA.e;

concept("aphys.efields.electric-potential", { file: "efields/electric-potential", keyPrefix: "efields.electric-potential" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement defines the electric potential at a point?",
    options: [
      ["the work done per unit positive charge in bringing a small test charge from infinity to the point", "Correct: potential is work per unit positive charge from infinity."],
      ["the force per unit positive charge on a small test charge placed at the point", "This defines electric field strength."],
      ["the work done in bringing a small test charge from the point to infinity", "Wrong direction, and potential is per unit charge, not the total work."],
      ["the energy per unit positive charge stored by a capacitor placed at the point", "Capacitors are not involved; the reference point is infinity."],
    ],
    answer: "A",
    explanation: "Electric potential at a point: work done per unit positive charge bringing a small test charge from infinity to the point. It is a scalar, measured in volts (J C⁻¹).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The distance from a point charge is doubled. What happens to the electric potential and to the electric field strength?",
    options: [
      ["the potential halves and the field strength falls to a quarter", "Correct: V ∝ 1/r and E ∝ 1/r²."],
      ["both fall to a quarter", "Only the field strength follows an inverse-square law; potential goes as 1/r."],
      ["both halve", "The field strength depends on 1/r², not 1/r."],
      ["the potential falls to a quarter and the field strength halves", "The two dependences have been swapped."],
    ],
    answer: "A",
    explanation: "V = Q/(4πε₀r) ∝ 1/r, so V halves; E = Q/(4πε₀r²) ∝ 1/r², so E falls to a quarter.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which statement about the electric potential near an isolated negative point charge is correct?",
    options: [
      ["It is negative and becomes more negative closer to the charge.", "Correct: V = Q/(4πε₀r) with Q negative."],
      ["It is positive and increases closer to the charge.", "This describes a positive charge."],
      ["It is negative and becomes less negative closer to the charge.", "The magnitude of V grows as r decreases."],
      ["It is zero everywhere because the field points inwards.", "The field direction does not make the potential zero; V is zero only at infinity."],
    ],
    answer: "A",
    explanation: "A positive test charge is attracted towards a negative charge, so the field does work as it comes in from infinity and the work done on it per unit charge is negative. V = Q/(4πε₀r) is negative and its size increases as r decreases.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which statement about equipotential surfaces is correct?",
    options: [
      ["They are always perpendicular to the electric field lines.", "Correct: no work is done moving along them, so there is no field component along them."],
      ["They are always parallel to the electric field lines.", "If they were parallel, work would be done moving along them."],
      ["Around a point charge they are equally spaced for equal steps of potential.", "They are closer together near the charge, where the field is stronger."],
      ["Between parallel plates they are concentric spheres.", "Between plates they are flat planes parallel to the plates."],
    ],
    answer: "A",
    explanation: "No work is done moving a charge along an equipotential, so the field has no component along it: equipotentials are perpendicular to field lines everywhere.",
  });
  {
    const Q = 3.0e-9, r = 0.050, V = ePotential(Q, r);
    b.mcq({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: t`What is the electric potential $5.0\ \text{cm}$ from a point charge of $+3.0\ \text{nC}$?`,
      options: [
        [t`$${sfStr(V, 3)}\ \text{V}$`, "Correct: V = kQ/r."],
        [t`$${sciTex(ePotential(Q, r) / r)}\ \text{V}$`, "Dividing by r² gives the field strength (in V m⁻¹), not the potential."],
        [t`$${sfStr(ePotential(Q, 5.0), 3)}\ \text{V}$`, "The distance was left in centimetres."],
        [t`$${sfStr(k * Q * r, 3)}\ \text{V}$`, "The distance must divide, not multiply."],
      ],
      answer: "A",
      explanation: t`$V = \dfrac{8.99 \times 10^{9} \times 3.0 \times 10^{-9}}{0.050} = ${sfStr(V, 3)}\ \text{V}$.`,
    });
  }
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A graph shows the electric potential V against distance r from a point charge. Which quantity is given by the negative of the gradient of the tangent to such a V–r curve at a point?",
    options: [
      ["the electric field strength at that distance", "Correct: E = −ΔV/Δr."],
      ["the electric potential energy of a unit charge there", "That is V itself, read off the vertical axis."],
      ["the force on the point charge itself", "The gradient tells you about the field at that point, not the force on the source."],
      ["the work done bringing a unit charge from infinity", "That is again the potential, not its gradient."],
    ],
    answer: "A",
    explanation: "The field strength equals the negative of the potential gradient, E = −ΔV/Δr. The steeper the V–r graph, the stronger the field.",
    hints: ["Think of E = V/d for a uniform field."],
  });
  {
    const Q1 = 5.0e-9, Q2 = -5.0e-9;
    b.mcq({
      d: 3, skill: "ANALYSIS",
      stem: t`Equal and opposite charges of $+5.0\ \text{nC}$ and $-5.0\ \text{nC}$ are fixed $0.20\ \text{m}$ apart. Which describes the electric potential and the electric field strength at the midpoint between them?`,
      options: [
        ["The potential is zero and the field strength is not zero.", "Correct: the potentials cancel (scalars) but both fields point towards the negative charge."],
        ["The potential is zero and the field strength is zero.", "The fields from the two charges point the same way at the midpoint, so they add."],
        ["The potential is not zero and the field strength is zero.", "Equal and opposite potentials add to zero; the fields do not cancel."],
        ["Neither the potential nor the field strength is zero.", "The two potentials have equal size and opposite signs, so they sum to zero."],
      ],
      answer: "A",
      explanation: t`$V = k(Q_1 + Q_2)/0.10 = 0$ because potentials add as scalars. The field from the positive charge points away from it, towards the negative charge, and the field from the negative charge also points towards it, so the fields add: $E = 2kQ/r^2 = ${sciTex((2 * k * Q1) / 0.01)}\ \text{V m}^{-1}$.`,
      hints: ["Potential is a scalar; field strength is a vector."],
    });
    chk(Q1 + Q2, 0);
  }
  {
    const Ek = 4.0e6 * e, Z = 79, r = (k * 2 * e * Z * e) / Ek;
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`An alpha particle with kinetic energy $4.0\ \text{MeV}$ travels directly towards a gold nucleus (charge $+79e$). What is its distance of closest approach?`,
      options: [
        [t`$${sciTex(r)}\ \text{m}$`, "Correct: kinetic energy = (2e)(79e)/(4πε₀r)."],
        [t`$${sciTex(r / 2)}\ \text{m}$`, "This uses the alpha particle's charge as e instead of 2e."],
        [t`$${sciTex(Math.sqrt(r))}\ \text{m}$`, "This equates the kinetic energy to an inverse-square (force-like) expression, kQq/r², which is not an energy."],
        [t`$${sciTex((r * 197) / 79)}\ \text{m}$`, "This uses the nucleon number of gold (197) instead of its proton number (79)."],
      ],
      answer: "A",
      explanation: t`$E_k = 4.0 \times 10^{6} \times 1.60 \times 10^{-19} = ${sciTex(Ek)}\ \text{J}$; $r = \dfrac{8.99 \times 10^{9} \times 2 \times 79 \times (1.60 \times 10^{-19})^2}{${sciTex(Ek)}} = ${sciTex(r)}\ \text{m}$.`,
      hints: ["At closest approach all the kinetic energy has become potential energy."],
    });
  }
  // Numerical
  {
    const Q = -8.0e-9, r = 0.24, V = ePotential(Q, r);
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: t`Calculate the electric potential $24\ \text{cm}$ from a point charge of $-8.0\ \text{nC}$, in V, to three significant figures. Include the sign.`,
      value: V, unit: "V", wrong: [-V, ePotential(Q, 24)],
      explanation: t`$V = \dfrac{Q}{4\pi\varepsilon_0r} = \dfrac{8.99 \times 10^{9} \times (-8.0 \times 10^{-9})}{0.24} = ${sfStr(V, 3)}\ \text{V}$. The sign matters: near a negative charge the potential is negative.`,
    });
  }
  {
    const Q = 15e-9, q = 3.0e-9, r1 = 0.50, r2 = 0.10;
    const W = q * (ePotential(Q, r2) - ePotential(Q, r1));
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A small sphere carries a charge of $+15\ \text{nC}$. Calculate the work needed to move a charge of $+3.0\ \text{nC}$ from $0.50\ \text{m}$ to $0.10\ \text{m}$ from its centre, in J, to three significant figures.`,
      value: W, unit: "J", wrong: [q * ePotential(Q, r2), q * k * Q * (1 / r2 ** 2 - 1 / r1 ** 2)],
      explanation: t`1. $V_{0.50} = \dfrac{8.99 \times 10^{9} \times 15 \times 10^{-9}}{0.50} = ${sfStr(ePotential(Q, r1), 3)}\ \text{V}$; $V_{0.10} = ${sfStr(ePotential(Q, r2), 3)}\ \text{V}$.
2. $W = q\Delta V = 3.0 \times 10^{-9} \times (${sfStr(ePotential(Q, r2), 3)} - ${sfStr(ePotential(Q, r1), 3)}) = ${sciTex(W)}\ \text{J}$.
3. Using only the final potential ignores the energy the charge already had at 0.50 m; using $1/r^2$ confuses potential with field strength.`,
      hints: ["Work = charge × change in potential."],
    });
  }
  {
    const q1 = 1.60e-19, q2 = 1.60e-19, r = 2.0e-15;
    const Ep = (k * q1 * q2) / r;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Two protons are $2.0 \times 10^{-15}\ \text{m}$ apart in a nucleus. Calculate their electric potential energy, in MeV, to three significant figures.`,
      value: Ep / e / 1e6, unit: "MeV", wrong: [Ep, (k * q1 * q2) / r ** 2 / e / 1e6],
      explanation: t`1. $E_P = \dfrac{Qq}{4\pi\varepsilon_0r} = \dfrac{8.99 \times 10^{9} \times (1.60 \times 10^{-19})^2}{2.0 \times 10^{-15}} = ${sciTex(Ep)}\ \text{J}$.
2. In eV: $${sciTex(Ep)}/(1.60 \times 10^{-19}) = ${sciTex(Ep / e)}\ \text{eV} = ${sfStr(Ep / e / 1e6, 3)}\ \text{MeV}$.
3. It is positive (like charges): work had to be done to push them together; the strong force holds them there.`,
      hints: ["1 eV = 1.60 × 10⁻¹⁹ J."],
    });
  }
  {
    const Ek = 6.0e6 * e, Z = 50, r = (k * 2 * e * Z * e) / Ek;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`An alpha particle (charge $+2e$) of kinetic energy $6.0\ \text{MeV}$ is fired directly at a tin nucleus (charge $+50e$). Assuming the nucleus does not move, calculate the distance of closest approach, in m, to three significant figures.`,
      value: r, unit: "m", wrong: [(k * e * Z * e) / Ek, (k * 2 * e * Z * e) / 6.0e6],
      explanation: t`1. $E_k = 6.0 \times 10^{6} \times 1.60 \times 10^{-19} = ${sciTex(Ek)}\ \text{J}$.
2. At closest approach $E_k = \dfrac{(2e)(50e)}{4\pi\varepsilon_0r}$.
3. $r = \dfrac{8.99 \times 10^{9} \times 100 \times (1.60 \times 10^{-19})^2}{${sciTex(Ek)}} = ${sciTex(r)}\ \text{m}$.
4. Using $e$ instead of $2e$ for the alpha particle halves the answer; leaving the energy in eV gives a meaningless number.`,
      hints: ["Convert MeV to J.", "The alpha particle carries 2e."],
    });
  }
  {
    const Q = 16e-9, r1 = 0.18, r2 = 0.36;
    const V1 = Number(sfStr(ePotential(Q, r1), 3)), V2 = Number(sfStr(ePotential(Q, r2), 3)); const chord = (V1 - V2) / (r2 - r1);
    b.num({
      d: 3, skill: "ANALYSIS", calculator: true,
      stem: t`The potential is $${sfStr(ePotential(Q, r1), 3)}\ \text{V}$ at $0.18\ \text{m}$ from a charged sphere and $${sfStr(ePotential(Q, r2), 3)}\ \text{V}$ at $0.36\ \text{m}$. Calculate the average electric field strength between these two points, in $\text{V m}^{-1}$, to three significant figures.`,
      value: chord, unit: "V/m", wrong: [ePotential(Q, r1) / r1],
      explanation: t`$E = -\dfrac{\Delta V}{\Delta r} = -\dfrac{${sfStr(ePotential(Q, r2), 3)} - ${sfStr(ePotential(Q, r1), 3)}}{0.36 - 0.18} = ${sfStr(chord, 3)}\ \text{V m}^{-1}$ (directed outwards, from high to low potential). This is an average: the field is stronger at 0.18 m than at 0.36 m.`,
      hints: ["E is minus the potential gradient."],
    });
  }
  // Uncertainty / practical
  {
    const V = 2.40e3, dV = 0.05e3, r = 0.125, dr = 0.002;
    const pct = pctUnc(dV, V) + pctUnc(dr, r);
    b.num({
      d: 3, skill: "EVALUATION", calculator: true,
      stem: t`A student finds the charge on a sphere from $Q = 4\pi\varepsilon_0 rV$, measuring $V = 2.40 \pm 0.05\ \text{kV}$ with an electrostatic voltmeter and $r = 12.5 \pm 0.2\ \text{cm}$. Calculate the percentage uncertainty in $Q$, to two significant figures.`,
      value: pct, sf: 2, unit: "%", wrong: [pctUnc(dV, V), Math.abs(pctUnc(dV, V) - pctUnc(dr, r))],
      explanation: t`For a product, percentage uncertainties add: $\dfrac{0.05}{2.40} \times 100 + \dfrac{0.2}{12.5} \times 100 = ${sfStr(pctUnc(dV, V), 2)} + ${sfStr(pctUnc(dr, r), 2)} = ${sfStr(pct, 2)}\%$.`,
      hints: ["Q ∝ rV: add the percentage uncertainties."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "No work is done when a charge is moved along an equipotential surface.",
    answer: true,
    explanation: "True. Work = qΔV and ΔV = 0 along an equipotential, so no work is done; this is why field lines cross equipotentials at right angles.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each quantity with its SI unit.",
    pairs: [
      ["electric potential", "V (J C⁻¹)"],
      ["electric field strength", "V m⁻¹ (N C⁻¹)"],
      ["electric potential energy", "J"],
      ["permittivity of free space", "F m⁻¹"],
    ],
    explanation: "Potential: work per unit charge, J C⁻¹ = V. Field strength: N C⁻¹ = V m⁻¹. Energy: J. ε₀: F m⁻¹.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements about electric potential.",
    template: "Electric potential is a {{blank:a}} quantity. The potential of a point charge is proportional to 1/{{blank:b}}. The field strength equals the {{blank:c}} of the potential gradient.",
    blanks: [
      { id: "a", accepted: ["scalar"], choices: ["scalar", "vector"] },
      { id: "b", accepted: ["r"], choices: ["r", "r²", "r³"] },
      { id: "c", accepted: ["negative"], choices: ["negative", "square", "reciprocal"] },
    ],
    explanation: "V is a scalar; V = Q/(4πε₀r) ∝ 1/r; E = −ΔV/Δr.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why the gravitational potential near a planet is always negative, but the electric potential near a charge can be positive or negative.",
    points: [
      "Both are zero at infinity (the reference point), and potential is the work done per unit mass/charge bringing a test mass/charge in from infinity.",
      "Gravitational forces are always attractive, so the field does work on a test mass coming in: the work done on it is negative, so φ is always negative.",
      "Electric forces can repel (like charges, work must be done: V positive) or attract (unlike charges: V negative).",
    ],
    modelAnswer: "Potential is measured from zero at infinity. Bringing a mass in towards a planet, gravity attracts it and does the work, so the work done per unit mass is negative: gravitational potential is always negative. Charges can repel or attract: near a positive charge work must be done to push a positive test charge in, so V is positive; near a negative charge the test charge is attracted, so V is negative.",
    explanation: "Attraction only gives negative potential; repulsion gives positive potential.",
    hints: ["What is the sign of the work done by an external agent when the force is attractive?"],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: t`Show that the field strength in a uniform field is related to the potential by $E = -\Delta V/\Delta x$.`,
    points: [
      t`To move a positive charge $q$ a small distance $\Delta x$ against the field, a force $qE$ must be applied: work $\Delta W = -qE\Delta x$ (work done against the field, the field pointing along $+x$).`,
      t`The work done is also $q\Delta V$ by definition of potential difference.`,
      t`$q\Delta V = -qE\Delta x$, so $E = -\Delta V/\Delta x$: the field points towards decreasing potential.`,
    ],
    modelAnswer: t`Take the field along $+x$. Moving a charge $q$ by $\Delta x$ along the field, the external force $-qE$ does work $-qE\Delta x$. This work equals $q\Delta V$, so $\Delta V = -E\Delta x$ and $E = -\Delta V/\Delta x$. The minus sign shows that the potential falls in the direction of the field.`,
    explanation: "Equate the two expressions for work.",
    hints: ["Work = force × distance = charge × p.d."],
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe the equipotentials around an isolated positive point charge, drawn at equal steps of potential, and relate them to the field lines.",
    points: [
      "Concentric spheres (circles on a drawing) centred on the charge.",
      "Closer together near the charge, further apart further out (V ∝ 1/r, so equal steps of V need smaller steps of r where the field is stronger).",
      "Perpendicular to the radial field lines everywhere.",
    ],
    modelAnswer: "The equipotentials are concentric spheres centred on the charge. For equal steps of potential they get closer together nearer the charge, where the field is stronger, and further apart further out. They cross the radial field lines at right angles everywhere.",
    explanation: "Spheres, crowding where the field is strong, perpendicular to field lines.",
  });
  // Practice structured: closest approach and potential graph
  {
    const Z = 79, Ek0 = 7.6e6 * e;
    const r0 = (k * 2 * e * Z * e) / Ek0;
    const rr = 2 * r0, Vr = ePotential(Z * e, rr), Ekr = Ek0 - 2 * e * Vr;
    chk(Ekr / Ek0, 0.5, 1e-9);
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`In a scattering experiment, alpha particles (charge $+2e$, mass $6.64 \times 10^{-27}\ \text{kg}$) with kinetic energy $7.6\ \text{MeV}$ are fired at gold nuclei (charge $+79e$), which may be assumed to stay at rest.`,
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "Define electric potential at a point.", points: ["Work done per unit positive charge…", "…in bringing a small test charge from infinity to the point."], modelAnswer: "The work done per unit positive charge in bringing a small test charge from infinity to that point." }),
        P.num({ label: "(b)", marks: 3, stem: "For an alpha particle heading directly at a nucleus, calculate the distance of closest approach, in m, to three significant figures.", value: r0, unit: "m", wrong: [r0 / 2], explanation: t`$E_k = 7.6 \times 10^{6} \times 1.60 \times 10^{-19} = ${sciTex(Ek0)}\ \text{J}$; $r = \dfrac{k(2e)(79e)}{E_k} = ${sciTex(r0)}\ \text{m}$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Calculate the electric potential due to the gold nucleus at twice this distance, in V, to three significant figures.`, value: Vr, unit: "V", wrong: [ePotential(Z * e, r0)], answer: sciPlain(Vr), explanation: t`$V = \dfrac{8.99 \times 10^{9} \times 79 \times 1.60 \times 10^{-19}}{${sciTex(rr)}} = ${sciTex(Vr)}\ \text{V}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Hence calculate the kinetic energy of the alpha particle at twice the closest-approach distance, in MeV, to three significant figures.", value: Ekr / e / 1e6, unit: "MeV", wrong: [(Ek0 - e * Vr) / e / 1e6], explanation: t`Potential energy there $= 2eV = ${sciTex(2 * e * Vr)}\ \text{J}$; $E_k = ${sciTex(Ek0)} - ${sciTex(2 * e * Vr)} = ${sciTex(Ekr)}\ \text{J} = ${sfStr(Ekr / e / 1e6, 3)}\ \text{MeV}$: exactly half, since $E_P \propto 1/r$.` }),
        P.manual({ label: "(e)", marks: 3, stem: "Describe, in words, how the electric potential energy and the kinetic energy of the alpha particle vary from far away to the point of closest approach and back out again.", points: ["Far away: potential energy about zero, kinetic energy 7.6 MeV.", "Approaching: potential energy rises as 1/r while kinetic energy falls by the same amount (total constant).", "At closest approach kinetic energy is zero and potential energy is 7.6 MeV; on the way out the changes reverse, and the particle leaves with 7.6 MeV."], modelAnswer: "Far from the nucleus the potential energy is almost zero and the kinetic energy is 7.6 MeV. As the alpha particle approaches, its potential energy increases (as 1/r) and its kinetic energy decreases by the same amount, the total staying constant. At closest approach it is momentarily at rest with 7.6 MeV of potential energy; it is then repelled and the changes reverse, so it leaves with its original 7.6 MeV." }),
      ],
      explanation: "Closest approach: E_k = Qq/(4πε₀r). Energy is conserved, so E_k + E_P is constant.",
      hints: ["Convert MeV to J.", "Potential energy = charge × potential."],
    });
  }
  {
    const Q = 20e-9;
    const rs = [0.10, 0.20, 0.40];
    const Vs = rs.map((r) => ePotential(Q, r));
    const Ex = (k * Q) / 0.2 ** 2;
    b.struct({
      d: 3, skill: "ANALYSIS", calculator: true,
      stem: t`A charged metal sphere of radius $5.0\ \text{cm}$ carries $+20\ \text{nC}$. The potential at distances $r$ from its centre is:

${table([t`$r\,/\,\text{m}$`, t`$V\,/\,\text{V}$`], rs.map((r, i) => [dpStr(r, 2), sfStr(Vs[i], 3)]))}`,
      parts: [
        P.manual({ label: "(a)", marks: 1, stem: "State what happens to V each time r doubles, and explain why this shows that V is proportional to 1/r.", points: ["V halves each time r doubles, so V × r is constant (V ∝ 1/r)."], modelAnswer: "Each time r doubles V halves; Vr is constant, so V ∝ 1/r." }),
        P.num({ label: "(b)", marks: 2, stem: t`Calculate the electric field strength at $r = 0.20\ \text{m}$, in $\text{V m}^{-1}$, to three significant figures.`, value: Ex, unit: "V/m", wrong: [Vs[1] / 0.20 / 0.20], explanation: t`$E = \dfrac{kQ}{r^2} = \dfrac{8.99 \times 10^{9} \times 20 \times 10^{-9}}{0.20^2} = ${sfStr(Ex, 3)}\ \text{V m}^{-1}$ (equal to $V/r$ for a point charge).` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the potential at the surface of the sphere, in V, to three significant figures.", value: ePotential(Q, 0.05), unit: "V", wrong: [ePotential(Q, 0.10)], explanation: t`At the surface $r = 0.050\ \text{m}$: $V = ${sfStr(ePotential(Q, 0.05), 3)}\ \text{V}$ (the whole conductor is at this potential).` }),
        P.manual({ label: "(d)", marks: 1, stem: "Explain why the average field strength found from the potentials at 0.10 m and 0.20 m is not equal to the field strength at 0.15 m.", points: ["The field is not uniform (E ∝ 1/r²; the V–r graph is curved), so the chord gradient is not the tangent gradient at the midpoint."], modelAnswer: "The V–r graph is a curve (E ∝ 1/r²), so the gradient of the chord between 0.10 m and 0.20 m differs from the gradient of the tangent at 0.15 m." }),
      ],
      explanation: "V ∝ 1/r; E = kQ/r² = −dV/dr.",
      hints: ["Compare V × r for each row."],
    });
  }

  b.card("DEFINITION", "**Electric potential**", "The work done per unit positive charge in bringing a small test charge from infinity to the point.");
  b.card("FORMULA", "Potential of a point charge", t`$V = \dfrac{Q}{4\pi\varepsilon_0r}$ (scalar; sign of $Q$ included)`);
  b.card("FORMULA", "Potential energy of two charges", t`$E_P = \dfrac{Qq}{4\pi\varepsilon_0r}$; positive for like charges, negative for unlike`);
  b.card("FORMULA", "Field from potential", t`$E = -\dfrac{\Delta V}{\Delta r}$: field strength is the negative potential gradient`);
  b.card("CONCEPT", "Equipotentials", "Surfaces of equal potential; perpendicular to field lines; closer together where the field is stronger; no work done moving along them.");
  b.card("CONCEPT", "Closest approach", "All the initial kinetic energy becomes electric potential energy: E_k = Qq/(4πε₀r).");
  b.card("CONCEPT", "Electric versus gravitational potential", "Both scalar, both ∝ 1/r and zero at infinity; gravitational is always negative, electric has the sign of the charge.");
  b.card("FACT", "Zero potential is not zero field", "Midway between +Q and −Q, V = 0 but E is large and points towards −Q.");
  b.card("FORMULA", "Work moving a charge", t`$W = q\Delta V$`);
});
