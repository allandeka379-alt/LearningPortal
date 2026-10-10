// W3a: ZIMSEC Paper 3 free-response items (format assumed, see BRIEF): Z1 gravitational fields and orbits (Jupiter's
// moons), Z2 electric fields (point charges, oil drop, electron beam), Z3 magnetic fields and electromagnetic
// induction (proton beam, velocity selector, rod on rails).
import { concept, P, t, chk, DATA, EXAM, checkExam, sfStr, dpStr, sciTex, sciPlain } from "../lib.mjs";

const A = (k) => `aphys.${k}`;
const { G, e, me, mp, k_e: k } = DATA;

concept(A("gravitation.newtons-law-orbits"), { file: "exam/w3a-zimsec", keyPrefix: "exam.w3a-zimsec", applies: EXAM.ZIM_P3_FREE.applies }, (b) => {
  const plan = { examStyle: true, skill: EXAM.ZIM_P3_FREE.skill, secs: EXAM.ZIM_P3_FREE.secs, applies: EXAM.ZIM_P3_FREE.applies, paper: "ZIMSEC P3", calculator: true };

  // Z1: gravitation — Jupiter and its moons.
  {
    const r1 = 1.07e9, T1 = 7.15 * 86400, r2 = 1.88e9, m = 500;
    const M = (4 * Math.PI ** 2 * r1 ** 3) / (G * T1 ** 2);
    const gAt = (G * M) / r1 ** 2;
    const phi1 = (-G * M) / r1;
    const dE = G * M * m * (1 / r1 - 1 / r2);
    chk(gAt, (4 * Math.PI ** 2 * r1) / T1 ** 2, 1e-9);
    b.struct({
      ...plan, d: 5,
      concepts: [A("gravitation.newtons-law-orbits"), A("gravitation.field-strength"), A("gravitation.potential")],
      stem: t`Ganymede, a moon of Jupiter, moves in a circular orbit of radius $1.07 \times 10^{9}\ \text{m}$ with a period of $7.15$ days. Callisto, another moon, orbits at a radius of $1.88 \times 10^{9}\ \text{m}$. Jupiter may be treated as a uniform sphere. ($G = 6.67 \times 10^{-11}\ \text{N m}^2\ \text{kg}^{-2}$.)`,
      parts: checkExam(EXAM.ZIM_P3_FREE, [
        P.manual({ label: "(a)", marks: 5, stem: "State Newton's law of gravitation, and define gravitational field strength and gravitational potential. State the relationship between field strength and potential.", points: [
          "Newton's law: the force between two point masses is proportional to the product of the masses…",
          "…and inversely proportional to the square of their separation (F = Gm₁m₂/r²).",
          "Gravitational field strength: gravitational force per unit mass (on a small test mass).",
          "Gravitational potential: work done per unit mass bringing a small test mass from infinity to the point.",
          "Field strength is the negative of the potential gradient, g = −Δφ/Δr.",
        ], modelAnswer: "Newton's law: two point masses attract each other with a force proportional to the product of their masses and inversely proportional to the square of their separation, F = Gm₁m₂/r². Gravitational field strength at a point is the force per unit mass on a small test mass there. Gravitational potential is the work done per unit mass in bringing a small test mass from infinity to the point. The field strength equals minus the potential gradient, g = −Δφ/Δr." }),
        P.manual({ label: "(b)", marks: 5, stem: t`Show that for a moon in a circular orbit of radius $r$ about a planet of mass $M$, $T^2 = \dfrac{4\pi^2}{GM}r^3$. State the assumptions you make.`, points: [
          "Gravitational force provides the centripetal force: GMm/r² = mv²/r (or mω²r).",
          t`$v = 2\pi r/T$ (or $\omega = 2\pi/T$).`,
          t`Substituting: $\dfrac{GM}{r^2} = \dfrac{4\pi^2 r}{T^2}$, so $T^2 = \dfrac{4\pi^2}{GM}r^3$.`,
          "The orbit is circular, and the planet acts as a point mass at its centre (uniform sphere).",
          "The moon's mass is much smaller than the planet's (planet stationary) and other bodies have negligible effect.",
        ], modelAnswer: t`The gravitational pull provides the centripetal force: $GMm/r^2 = mv^2/r$. With $v = 2\pi r/T$, $GM/r^2 = 4\pi^2r/T^2$, so $T^2 = (4\pi^2/GM)r^3$. Assumptions: a circular orbit, the planet behaves as a point mass at its centre, the planet does not move (its mass is much larger than the moon's), and other bodies are ignored.` }),
        P.group({ label: "(c)", stem: "Using the data for Ganymede:", parts: [
          P.num({ label: "(i)", marks: 3, stem: "calculate the mass of Jupiter, in kg, to three significant figures", value: M, unit: "kg", wrong: [(4 * Math.PI ** 2 * r1 ** 3) / (G * 7.15 ** 2)], answer: sciPlain(M), explanation: t`$T = 7.15 \times 86400 = ${sciTex(T1)}\ \text{s}$; $M = \dfrac{4\pi^2r^3}{GT^2} = \dfrac{4\pi^2 \times (1.07 \times 10^{9})^3}{6.67 \times 10^{-11} \times (${sciTex(T1)})^2} = ${sciTex(M)}\ \text{kg}$. Leaving T in days gives an absurd value.` }),
          P.num({ label: "(ii)", marks: 2, stem: t`calculate the gravitational field strength of Jupiter at Ganymede's orbit, in $\text{N kg}^{-1}$, to three significant figures`, value: gAt, unit: "N/kg", wrong: [(G * M) / r1], explanation: t`$g = \dfrac{GM}{r^2} = ${sfStr(gAt, 3)}\ \text{N kg}^{-1}$ (also equal to the centripetal acceleration $4\pi^2r/T^2$).` }),
        ] }),
        P.group({ label: "(d)", stem: "A space probe of mass 500 kg is moved from Ganymede's orbital radius to Callisto's orbital radius.", parts: [
          P.num({ label: "(i)", marks: 2, stem: t`Calculate the gravitational potential due to Jupiter at Ganymede's orbital radius, in $\text{J kg}^{-1}$, to three significant figures. Include the sign.`, value: phi1, unit: "J/kg", wrong: [-phi1], answer: sciPlain(phi1), explanation: t`$\phi = -\dfrac{GM}{r} = -\dfrac{6.67 \times 10^{-11} \times ${sciTex(M)}}{1.07 \times 10^{9}} = ${sciTex(phi1)}\ \text{J kg}^{-1}$.` }),
          P.num({ label: "(ii)", marks: 3, stem: "Calculate the increase in the gravitational potential energy of the probe, in J, to three significant figures.", value: dE, unit: "J", wrong: [G * M * m * (1 / r1 + 1 / r2), (G * M * m) / r2], answer: sciPlain(dE), explanation: t`$\Delta E_P = GMm\left(\dfrac{1}{r_1} - \dfrac{1}{r_2}\right) = 6.67 \times 10^{-11} \times ${sciTex(M)} \times 500 \times \left(\dfrac{1}{1.07 \times 10^{9}} - \dfrac{1}{1.88 \times 10^{9}}\right) = ${sciTex(dE)}\ \text{J}$.` }),
        ] }),
      ]),
      explanation: "T² = 4π²r³/(GM) gives M; g = GM/r²; φ = −GM/r; ΔE_P = GMm(1/r₁ − 1/r₂).",
      hints: ["Convert the period to seconds.", "The potential energy increases (becomes less negative) moving outwards."],
    });
  }

  // Z2: electric fields.
  {
    const Q1 = 6.0e-9, Q2 = -3.0e-9, sep = 0.30, xP = 0.12; // P on the line, 0.12 m from Q1, 0.18 m from Q2
    const E1 = (k * Q1) / xP ** 2, E2 = (k * Math.abs(Q2)) / (sep - xP) ** 2;
    const EP = E1 + E2; // both point from Q1 towards Q2
    const VP = k * (Q1 / xP + Q2 / (sep - xP));
    const q = 2.0e-9;
    const W = q * VP; // from infinity to P
    const Va = 1900, Vd = 150, d = 0.020, L = 0.040;
    const v = Math.sqrt((2 * e * Va) / me);
    const a = (e * Vd) / (d * me), tt = L / v, y = 0.5 * a * tt * tt;
    b.struct({
      ...plan, d: 4,
      concepts: [A("efields.coulomb-point-charge"), A("efields.electric-potential"), A("efields.uniform-fields")],
      stem: t`Point charges of $+6.0\ \text{nC}$ and $-3.0\ \text{nC}$ are fixed $0.30\ \text{m}$ apart in air. Point P lies on the line joining them, $0.12\ \text{m}$ from the positive charge. ($1/(4\pi\varepsilon_0) = 8.99 \times 10^{9}\ \text{m F}^{-1}$, $e = 1.60 \times 10^{-19}\ \text{C}$, $m_e = 9.11 \times 10^{-31}\ \text{kg}$, $g = 9.81\ \text{m s}^{-2}$.)`,
      parts: checkExam(EXAM.ZIM_P3_FREE, [
        P.manual({ label: "(a)", marks: 5, stem: "Define electric field strength and electric potential, state Coulomb's law, and give one similarity and one difference between electric and gravitational fields.", points: [
          "Electric field strength: force per unit positive charge (on a small stationary test charge).",
          "Electric potential: work done per unit positive charge bringing a small test charge from infinity to the point.",
          "Coulomb's law: force between point charges ∝ product of charges and ∝ 1/(separation)².",
          "Similarity: both inverse-square fields for point sources / potential ∝ 1/r, zero at infinity / field = −potential gradient.",
          "Difference: gravitational forces only attract (potential always negative); electric forces attract or repel (potential either sign).",
        ], modelAnswer: "Electric field strength is the force per unit positive charge on a small stationary test charge. Electric potential is the work done per unit positive charge in bringing a small test charge from infinity to the point. Coulomb's law: the force between two point charges is proportional to the product of the charges and inversely proportional to the square of their separation. Both fields follow an inverse-square law for point sources (with potential ∝ 1/r, zero at infinity). Gravity only attracts, so gravitational potential is always negative, while electric forces can attract or repel, so electric potential can be positive or negative." }),
        P.manual({ label: "(b)", marks: 5, stem: t`A charged oil drop of mass $m$ is held stationary between horizontal plates a distance $d$ apart with a p.d. $V$ across them. Explain how this is possible, derive an expression for the charge on the drop, and explain how such measurements show that charge is quantised.`, points: [
          "The p.d. produces a uniform field E = V/d between the plates; the electric force on the drop is qE.",
          "Upper plate polarity chosen so the electric force is upwards (e.g. upper plate positive for a negative drop).",
          t`Stationary: electric force = weight, $qV/d = mg$…`,
          t`…so $q = \dfrac{mgd}{V}$.`,
          "Repeated for many drops, all charges are whole-number multiples of 1.60 × 10⁻¹⁹ C (e), so charge comes in discrete units.",
        ], modelAnswer: t`The p.d. sets up a uniform field $E = V/d$, so the drop feels an electric force $qE$. With the upper plate's polarity chosen so this force is upward, $V$ is adjusted until $qV/d = mg$ and the drop hangs still, giving $q = mgd/V$. Measurements on many drops give charges that are always whole-number multiples of $1.60 \times 10^{-19}\ \text{C}$, showing that charge is quantised.` }),
        P.group({ label: "(c)", stem: "For the two point charges:", parts: [
          P.num({ label: "(i)", marks: 2, stem: t`calculate the electric field strength at P, in $\text{N C}^{-1}$, to three significant figures`, value: EP, unit: "N/C", wrong: [E1 - E2], explanation: t`$E_1 = \dfrac{8.99 \times 10^{9} \times 6.0 \times 10^{-9}}{0.12^2} = ${sfStr(E1, 3)}\ \text{N C}^{-1}$ away from $+6.0\ \text{nC}$; $E_2 = \dfrac{8.99 \times 10^{9} \times 3.0 \times 10^{-9}}{0.18^2} = ${sfStr(E2, 3)}\ \text{N C}^{-1}$ towards $-3.0\ \text{nC}$. Both point towards the negative charge, so they add: $${sfStr(EP, 3)}\ \text{N C}^{-1}$.` }),
          P.num({ label: "(ii)", marks: 2, stem: "calculate the electric potential at P, in V, to three significant figures", value: VP, unit: "V", wrong: [k * (Q1 / xP - Q2 / (sep - xP))], explanation: t`$V = 8.99 \times 10^{9}\left(\dfrac{6.0 \times 10^{-9}}{0.12} + \dfrac{-3.0 \times 10^{-9}}{0.18}\right) = ${sfStr(VP, 3)}\ \text{V}$ (scalars, with signs).` }),
          P.num({ label: "(iii)", marks: 1, stem: "calculate the work done to bring a +2.0 nC charge from infinity to P, in J, to three significant figures", value: W, unit: "J", wrong: [q * EP], answer: sciPlain(W), explanation: t`$W = qV = 2.0 \times 10^{-9} \times ${sfStr(VP, 3)} = ${sciTex(W)}\ \text{J}$.` }),
        ] }),
        P.group({ label: "(d)", stem: t`Electrons accelerated from rest through $1900\ \text{V}$ enter, at right angles to the field, the space between plates $2.0\ \text{cm}$ apart and $4.0\ \text{cm}$ long with $150\ \text{V}$ between them.`, parts: [
          P.num({ label: "(i)", marks: 2, stem: t`Calculate the speed of the electrons, in $\text{m s}^{-1}$, to three significant figures.`, value: v, unit: "m/s", wrong: [Math.sqrt((e * Va) / me)], answer: sciPlain(v), explanation: t`$v = \sqrt{2eV/m_e} = ${sciTex(v)}\ \text{m s}^{-1}$.` }),
          P.num({ label: "(ii)", marks: 3, stem: "Calculate the deflection of the electrons as they leave the plates, in mm, to three significant figures.", value: y * 1000, unit: "mm", wrong: [a * tt * tt * 1000], explanation: t`$a = \dfrac{eV}{dm_e} = ${sciTex(a)}\ \text{m s}^{-2}$; $t = L/v = ${sciTex(tt)}\ \text{s}$; $y = \tfrac{1}{2}at^2 = ${sfStr(y * 1000, 3)}\ \text{mm}$ towards the positive plate.` }),
        ] }),
      ]),
      explanation: "Fields add as vectors, potentials as scalars; W = qV; electron: eV = ½mv², then projectile motion across the plates.",
      hints: ["Find the direction of each field at P before adding.", "Horizontal speed is constant between the plates."],
    });
    chk(Math.sign(VP), 1);
  }

  // Z3: magnetic fields and induction.
  {
    const B = 0.40, v = 2.4e6;
    const r = (mp * v) / (e * B);
    const Esel = B * v;
    const T = (2 * Math.PI * mp) / (e * B);
    const Br = 0.30, L = 0.25, vr = 6.0, R = 1.2;
    const Er = Br * L * vr, I = Er / R, F = Br * I * L;
    b.struct({
      ...plan, d: 4,
      concepts: [A("magnetism.force-on-charge"), A("magnetism.force-on-conductor"), A("induction.flux-faraday"), A("induction.lenz-applications")],
      stem: t`This question is about magnetic forces and electromagnetic induction. ($e = 1.60 \times 10^{-19}\ \text{C}$, $m_p = 1.67 \times 10^{-27}\ \text{kg}$.)`,
      parts: checkExam(EXAM.ZIM_P3_FREE, [
        P.manual({ label: "(a)", marks: 5, stem: "Define magnetic flux density and magnetic flux, and state Faraday's law and Lenz's law of electromagnetic induction.", points: [
          "Magnetic flux density: force per unit current per unit length on a straight conductor at right angles to the field.",
          "Magnetic flux: product of area and the component of flux density perpendicular to it (Φ = BA cos θ).",
          "Faraday's law: induced e.m.f. equals (is proportional to) the rate of change of magnetic flux linkage.",
          "Lenz's law: the induced e.m.f./current is in a direction that opposes…",
          "…the change (in flux linkage) that produces it.",
        ], modelAnswer: "Magnetic flux density is the force per unit current per unit length on a straight conductor placed at right angles to the field. Magnetic flux through an area is the area multiplied by the component of flux density perpendicular to it. Faraday's law: the induced e.m.f. equals the rate of change of magnetic flux linkage. Lenz's law: the induced e.m.f. acts in a direction that opposes the change in flux linkage producing it." }),
        P.manual({ label: "(b)", marks: 5, stem: t`A metal rod of length $L$ is pulled at constant speed $v$ along horizontal rails at right angles to a uniform vertical field $B$; the rails are joined by a resistor. Derive $E = BLv$ and use Lenz's law to explain why a steady force is needed to keep the rod moving, relating this to energy conservation.`, points: [
          t`In time $\Delta t$ the rod sweeps out area $Lv\Delta t$, so the flux change is $BLv\Delta t$.`,
          t`Faraday's law: $E = \Delta\Phi/\Delta t = BLv$.`,
          "An induced current flows round the circuit; the rod carrying it in the field experiences a force BIL.",
          "By Lenz's law this force opposes the motion (acts backwards), so an equal forward force is needed for constant speed.",
          "The work done by the pulling force per second (Fv) equals the electrical power (EI = I²R) dissipated in the resistor: energy is conserved.",
        ], modelAnswer: t`In a time $\Delta t$ the rod sweeps area $Lv\Delta t$, so the flux through the circuit changes by $BLv\Delta t$ and $E = BLv$. The induced current in the rod experiences a force $BIL$; by Lenz's law it opposes the motion, so a steady forward force of $BIL$ is needed. The work done per second by this force, $Fv = BILv = EI$, equals the power dissipated as heat in the resistor, as conservation of energy requires.` }),
        P.group({ label: "(c)", stem: t`Protons moving at $2.4 \times 10^{6}\ \text{m s}^{-1}$ enter a uniform magnetic field of $0.40\ \text{T}$ at right angles to it.`, parts: [
          P.num({ label: "(i)", marks: 2, stem: "Calculate the radius of their path, in m, to three significant figures.", value: r, unit: "m", wrong: [(me * v) / (e * B)], explanation: t`$r = \dfrac{mv}{BQ} = \dfrac{1.67 \times 10^{-27} \times 2.4 \times 10^{6}}{0.40 \times 1.60 \times 10^{-19}} = ${sfStr(r, 3)}\ \text{m}$.` }),
          P.num({ label: "(ii)", marks: 1, stem: "Calculate the time for one complete orbit, in s, to three significant figures.", value: T, unit: "s", wrong: [T / 2], answer: sciPlain(T), explanation: t`$T = \dfrac{2\pi m}{BQ} = ${sciTex(T)}\ \text{s}$.` }),
          P.num({ label: "(iii)", marks: 2, stem: t`Calculate the electric field strength that, applied at right angles to both the beam and the magnetic field, would let these protons pass undeflected, in $\text{V m}^{-1}$, to two significant figures.`, value: Esel, sf: 2, unit: "V/m", wrong: [B / v], answer: sciPlain(Esel, 2), explanation: t`$QE = BQv \Rightarrow E = Bv = 0.40 \times 2.4 \times 10^{6} = ${sciTex(Esel, 2)}\ \text{V m}^{-1}$.` }),
        ] }),
        P.group({ label: "(d)", stem: t`A rod $25\ \text{cm}$ long moves at $6.0\ \text{m s}^{-1}$ along rails at right angles to a field of $0.30\ \text{T}$. The total resistance of the circuit is $1.2\ \Omega$.`, parts: [
          P.num({ label: "(i)", marks: 2, stem: "Calculate the induced e.m.f., in V, to two significant figures.", value: Er, sf: 2, unit: "V", wrong: [Br * 25 * vr], explanation: t`$E = BLv = 0.30 \times 0.25 \times 6.0 = ${sfStr(Er, 2)}\ \text{V}$.` }),
          P.num({ label: "(ii)", marks: 1, stem: "Calculate the current, in A, to three significant figures.", value: I, unit: "A", wrong: [Er * R], explanation: t`$I = E/R = ${sfStr(Er, 2)}/1.2 = ${sfStr(I, 3)}\ \text{A}$.` }),
          P.num({ label: "(iii)", marks: 2, stem: "Calculate the force needed to keep the rod moving at constant speed, in N, to three significant figures.", value: F, unit: "N", wrong: [Br * I], explanation: t`$F = BIL = 0.30 \times ${sfStr(I, 3)} \times 0.25 = ${sciTex(F)}\ \text{N}$ (equal and opposite to the magnetic force on the rod).` }),
        ] }),
      ]),
      explanation: "r = mv/(BQ), T = 2πm/(BQ), E = Bv; E = BLv, I = E/R, F = BIL opposing the motion.",
      hints: ["The pulling force balances the magnetic force on the induced current."],
    });
  }
});
