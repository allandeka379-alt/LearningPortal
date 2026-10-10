// W3a: THEORY10 exam-format items (ZIMSEC P2 / Cambridge P4 — all A Level concepts covered by both syllabi):
// T1 orbits and geostationary satellites; T2 gravitational potential and escape (Mars); T3 electron in a uniform
// field; T4 Coulomb's law and potential energy in the hydrogen atom; T5 charged particles in magnetic fields and a
// velocity selector; T6 flux linkage, Faraday's and Lenz's laws in a generator coil.
import { concept, P, t, chk, DATA, EXAM, checkExam, sfStr, dpStr, sciTex, sciPlain, rad } from "../lib.mjs";

const A = (k) => `aphys.${k}`;
const { G, e, me, mp, k_e: k } = DATA;

concept(A("gravitation.newtons-law-orbits"), { file: "exam/w3a-theory", keyPrefix: "exam.w3a-theory" }, (b) => {
  const plan = { examStyle: true, skill: EXAM.THEORY10.skill, secs: EXAM.THEORY10.secs, calculator: true, paper: "ZIMSEC P2 / Cambridge P4" };

  // T1: low orbit and geostationary orbit.
  {
    const M = 6.0e24, R = 6.4e6, h = 4.0e5;
    const g0 = (G * M) / R ** 2;
    const r = R + h;
    const T = 2 * Math.PI * Math.sqrt(r ** 3 / (G * M));
    const rGeo = Math.cbrt((G * M * 86400 ** 2) / (4 * Math.PI ** 2));
    b.struct({
      ...plan, d: 3,
      concepts: [A("gravitation.newtons-law-orbits"), A("gravitation.field-strength")],
      stem: t`The Earth may be treated as a uniform sphere of mass $6.0 \times 10^{24}\ \text{kg}$ and radius $6.4 \times 10^{6}\ \text{m}$. A space station orbits $400\ \text{km}$ above the surface; a communications satellite is in a geostationary orbit. ($G = 6.67 \times 10^{-11}\ \text{N m}^2\ \text{kg}^{-2}$.)`,
      parts: checkExam(EXAM.THEORY10, [
        P.manual({ label: "(a)", marks: 1, stem: "Define gravitational field strength.", points: ["The gravitational force per unit mass (on a small test mass placed at the point)."], modelAnswer: "The gravitational force per unit mass acting on a small test mass placed at the point." }),
        P.num({ label: "(b)", marks: 2, stem: t`Calculate the gravitational field strength at the Earth's surface, in $\text{N kg}^{-1}$, to three significant figures.`, value: g0, unit: "N/kg", wrong: [(G * M) / R], explanation: t`$g = \dfrac{GM}{R^2} = \dfrac{6.67 \times 10^{-11} \times 6.0 \times 10^{24}}{(6.4 \times 10^{6})^2} = ${sfStr(g0, 3)}\ \text{N kg}^{-1}$.` }),
        P.num({ label: "(c)", marks: 3, stem: "Calculate the orbital period of the space station, in minutes, to three significant figures.", value: T / 60, unit: "min", wrong: [(2 * Math.PI * Math.sqrt(h ** 3 / (G * M))) / 60, T], explanation: t`$r = 6.4 \times 10^{6} + 4.0 \times 10^{5} = ${sciTex(r, 2)}\ \text{m}$. From $\dfrac{GMm}{r^2} = \dfrac{4\pi^2mr}{T^2}$, $T = 2\pi\sqrt{\dfrac{r^3}{GM}} = ${sfStr(T, 3)}\ \text{s} = ${sfStr(T / 60, 3)}\ \text{min}$. Using the height instead of the orbital radius is the usual error.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the radius of a geostationary orbit (period 24 hours), in m, to two significant figures.", value: rGeo, sf: 2, unit: "m", wrong: [rGeo - R], answer: sciPlain(rGeo, 2), explanation: t`$r^3 = \dfrac{GMT^2}{4\pi^2} = \dfrac{6.67 \times 10^{-11} \times 6.0 \times 10^{24} \times 86400^2}{4\pi^2}$, so $r = ${sciTex(rGeo, 2)}\ \text{m}$.` }),
        P.manual({ label: "(e)", marks: 2, stem: "State two features, other than its period, of a geostationary orbit, and explain why such satellites are used for satellite television.", points: ["Above the Equator, moving west to east (same direction as the Earth's rotation).", "It stays above the same point on the Earth, so receiving dishes can be fixed and pointed permanently at it."], modelAnswer: "A geostationary orbit lies in the plane of the Equator and the satellite moves from west to east, the same way as the Earth rotates. It therefore stays above the same point on the surface, so television dishes can be fixed in one direction." }),
      ]),
      explanation: "g = GM/R²; T = 2π√(r³/GM) with r measured from the centre; geostationary r ≈ 4.2 × 10⁷ m.",
      hints: ["Use the orbital radius, not the height.", "Gravity provides the centripetal force."],
    });
  }

  // T2: gravitational potential and escape from Mars.
  {
    const M = 6.42e23, R = 3.39e6, m = 1200, h = 2.5e5;
    const phiS = (-G * M) / R;
    const vEsc = Math.sqrt((2 * G * M) / R);
    const dE = G * M * m * (1 / R - 1 / (R + h));
    b.struct({
      ...plan, d: 4,
      concepts: [A("gravitation.potential")],
      stem: t`Mars may be treated as a uniform sphere of mass $6.42 \times 10^{23}\ \text{kg}$ and radius $3.39 \times 10^{6}\ \text{m}$. A lander of mass $1200\ \text{kg}$ is on its surface. ($G = 6.67 \times 10^{-11}\ \text{N m}^2\ \text{kg}^{-2}$; ignore the planet's atmosphere and rotation.)`,
      parts: checkExam(EXAM.THEORY10, [
        P.manual({ label: "(a)", marks: 2, stem: "Define gravitational potential at a point.", points: ["Work done per unit mass…", "…in bringing a small test mass from infinity to the point."], modelAnswer: "The work done per unit mass in bringing a small test mass from infinity to the point." }),
        P.num({ label: "(b)", marks: 2, stem: t`Calculate the gravitational potential at the surface of Mars, in $\text{J kg}^{-1}$, to three significant figures. Include the sign.`, value: phiS, unit: "J/kg", wrong: [-phiS, (-G * M) / R ** 2], answer: sciPlain(phiS), explanation: t`$\phi = -\dfrac{GM}{R} = -\dfrac{6.67 \times 10^{-11} \times 6.42 \times 10^{23}}{3.39 \times 10^{6}} = ${sciTex(phiS)}\ \text{J kg}^{-1}$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Calculate the escape speed from the surface of Mars, in $\text{m s}^{-1}$, to three significant figures.`, value: vEsc, unit: "m/s", wrong: [Math.sqrt((G * M) / R)], explanation: t`$\tfrac{1}{2}mv^2 = \dfrac{GMm}{R} \Rightarrow v = \sqrt{2GM/R} = \sqrt{2 \times ${sciTex(-phiS)}} = ${sfStr(vEsc, 3)}\ \text{m s}^{-1}$.` }),
        P.num({ label: "(d)", marks: 2, stem: t`Calculate the minimum energy needed to lift the lander to a height of $250\ \text{km}$ above the surface (ignoring any kinetic energy it has there), in J, to three significant figures.`, value: dE, unit: "J", wrong: [m * ((G * M) / R ** 2) * h, (G * M * m) / (R + h)], answer: sciPlain(dE), explanation: t`$\Delta E_P = GMm\left(\dfrac{1}{R} - \dfrac{1}{R + h}\right) = 6.67 \times 10^{-11} \times 6.42 \times 10^{23} \times 1200 \times \left(\dfrac{1}{3.39 \times 10^{6}} - \dfrac{1}{3.64 \times 10^{6}}\right) = ${sciTex(dE)}\ \text{J}$.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain why the gravitational potential at the surface is negative, and why it becomes less negative with height.", points: ["Potential is zero at infinity; gravity is attractive, so work is done by the field (negative work by us) bringing a mass in from infinity: φ < 0.", "Further out, less work is done by the field in bringing the mass from infinity, so φ = −GM/r rises towards zero as r increases."], modelAnswer: "The zero of potential is at infinity. Gravity attracts, so as a test mass is brought in from infinity the field does the work and the work done on it per unit mass is negative. At larger r less energy is released bringing it in, so φ = −GM/r is less negative, approaching zero at infinity." }),
      ]),
      explanation: "φ = −GM/r; escape speed √(2GM/R); ΔE_P = GMm(1/r₁ − 1/r₂).",
      hints: ["Escape: kinetic energy equals GMm/R.", "Use the change in potential energy, not mgh with the surface g, for large heights."],
    });
  }

  // T3: electron deflected between plates.
  {
    const Va = 2500, Vd = 220, d = 0.025, L = 0.050;
    const v = Math.sqrt((2 * e * Va) / me);
    const E = Vd / d, a = (e * E) / me, tt = L / v, y = 0.5 * a * tt * tt;
    b.struct({
      ...plan, d: 3,
      concepts: [A("efields.uniform-fields"), A("efields.electric-potential")],
      stem: t`Electrons are accelerated from rest through a p.d. of $2500\ \text{V}$ and then enter, at right angles to the field, the space between two horizontal parallel plates $2.5\ \text{cm}$ apart and $5.0\ \text{cm}$ long, with $220\ \text{V}$ between them (upper plate positive).`,
      parts: checkExam(EXAM.THEORY10, [
        P.manual({ label: "(a)", marks: 1, stem: "Define electric field strength.", points: ["Force per unit positive charge (on a small stationary test charge)."], modelAnswer: "The force per unit positive charge acting on a small stationary test charge at the point." }),
        P.num({ label: "(b)", marks: 2, stem: t`Calculate the speed of the electrons entering the plates, in $\text{m s}^{-1}$, to three significant figures.`, value: v, unit: "m/s", wrong: [Math.sqrt((e * Va) / me)], answer: sciPlain(v), explanation: t`$\tfrac{1}{2}m_ev^2 = eV \Rightarrow v = \sqrt{\dfrac{2 \times 1.60 \times 10^{-19} \times 2500}{9.11 \times 10^{-31}}} = ${sciTex(v)}\ \text{m s}^{-1}$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Calculate the acceleration of an electron between the plates, in $\text{m s}^{-2}$, to three significant figures.`, value: a, unit: "m/s²", wrong: [(e * Vd) / me], answer: sciPlain(a), explanation: t`$E = V/d = 220/0.025 = ${sciTex(E, 2)}\ \text{V m}^{-1}$; $a = eE/m_e = ${sciTex(a)}\ \text{m s}^{-2}$, towards the upper plate.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the vertical deflection of the electrons as they leave the plates, in mm, to three significant figures.", value: y * 1000, unit: "mm", wrong: [a * tt * tt * 1000], explanation: t`$t = L/v = 0.050/${sciTex(v)} = ${sciTex(tt)}\ \text{s}$; $y = \tfrac{1}{2}at^2 = ${sfStr(y * 1000, 3)}\ \text{mm}$.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain why the path of the electrons between the plates is a parabola.", points: ["Constant force eE (uniform field), perpendicular to the plates: constant acceleration towards the positive plate.", "No force along the plates, so the horizontal velocity is constant; constant velocity plus perpendicular constant acceleration gives a parabola."], modelAnswer: "In the uniform field each electron feels a constant force towards the positive plate, so it has a constant vertical acceleration, while its horizontal velocity is unchanged. Uniform velocity in one direction with uniform acceleration at right angles gives a parabola, as for a projectile." }),
        P.manual({ label: "(f)", marks: 1, stem: "Describe the equipotential surfaces between the plates.", points: ["Flat planes parallel to the plates, equally spaced for equal steps of potential (perpendicular to the field lines)."], modelAnswer: "Flat planes parallel to the plates, equally spaced for equal potential steps, perpendicular to the field lines." }),
      ]),
      explanation: "eV = ½mv²; E = V/d; a = eE/m; t = L/v; y = ½at².",
      hints: ["The horizontal speed is constant between the plates."],
    });
  }

  // T4: Coulomb's law and the hydrogen atom.
  {
    const r = 5.3e-11;
    const Fe = (k * e * e) / r ** 2, Fg = (G * me * mp) / r ** 2;
    const Ep = (-k * e * e) / r;
    const vEl = Math.sqrt((k * e * e) / (me * r));
    b.struct({
      ...plan, d: 4,
      concepts: [A("efields.coulomb-point-charge"), A("efields.electric-potential")],
      stem: t`In a simple model of the hydrogen atom, an electron moves in a circle of radius $5.3 \times 10^{-11}\ \text{m}$ around a proton. Use the data-sheet values $e = 1.60 \times 10^{-19}\ \text{C}$, $1/(4\pi\varepsilon_0) = 8.99 \times 10^{9}\ \text{m F}^{-1}$, $m_e = 9.11 \times 10^{-31}\ \text{kg}$, $m_p = 1.67 \times 10^{-27}\ \text{kg}$ and $G = 6.67 \times 10^{-11}\ \text{N m}^2\ \text{kg}^{-2}$.`,
      parts: checkExam(EXAM.THEORY10, [
        P.manual({ label: "(a)", marks: 1, stem: "State Coulomb's law.", points: ["The force between two point charges is proportional to the product of the charges and inversely proportional to the square of their separation."], modelAnswer: "The electric force between two point charges is proportional to the product of their charges and inversely proportional to the square of the distance between them." }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the electric force between the electron and the proton, in N, to three significant figures.", value: Fe, unit: "N", wrong: [(k * e * e) / r], answer: sciPlain(Fe), explanation: t`$F = \dfrac{e^2}{4\pi\varepsilon_0r^2} = \dfrac{8.99 \times 10^{9} \times (1.60 \times 10^{-19})^2}{(5.3 \times 10^{-11})^2} = ${sciTex(Fe)}\ \text{N}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the ratio (electric force) ÷ (gravitational force) between the two particles, to two significant figures.", value: Fe / Fg, sf: 2, wrong: [Fg / Fe], answer: sciPlain(Fe / Fg, 2), explanation: t`$F_G = \dfrac{Gm_em_p}{r^2} = ${sciTex(Fg)}\ \text{N}$; ratio $= ${sciTex(Fe / Fg, 2)}$ (independent of $r$, since both are inverse-square).` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the electric potential energy of the electron–proton pair, in eV, to three significant figures. Include the sign.", value: Ep / e, unit: "eV", wrong: [-Ep / e, Ep], explanation: t`$E_P = -\dfrac{e^2}{4\pi\varepsilon_0r} = ${sciTex(Ep)}\ \text{J} = ${sfStr(Ep / e, 3)}\ \text{eV}$.` }),
        P.manual({ label: "(e)", marks: 1, stem: "Explain why the potential energy is negative.", points: ["The charges are unlike, so they attract: work is done by the field (energy released) as the electron is brought from infinity, where E_P = 0."], modelAnswer: "The charges attract, so energy is released as the electron comes in from infinity (where E_P = 0); the potential energy is therefore negative." }),
        P.num({ label: "(f)", marks: 2, stem: t`The electric force provides the centripetal force. Calculate the speed of the electron, in $\text{m s}^{-1}$, to three significant figures.`, value: vEl, unit: "m/s", wrong: [Math.sqrt((k * e * e) / (mp * r))], answer: sciPlain(vEl), explanation: t`$\dfrac{m_ev^2}{r} = F \Rightarrow v = \sqrt{\dfrac{Fr}{m_e}} = \sqrt{\dfrac{${sciTex(Fe)} \times 5.3 \times 10^{-11}}{9.11 \times 10^{-31}}} = ${sciTex(vEl)}\ \text{m s}^{-1}$.` }),
      ]),
      explanation: "Coulomb's law, F_E/F_G ≈ 2 × 10³⁹, E_P = −e²/(4πε₀r), centripetal force from the electric force.",
      hints: ["Use the electron mass for the circular motion."],
    });
  }

  // T5: charged particles in magnetic fields; velocity selector.
  {
    const B = 0.25, v = 3.0e6;
    const r = (mp * v) / (e * B);
    const tHalf = (Math.PI * mp) / (e * B);
    const E = B * v;
    b.struct({
      ...plan, d: 4,
      concepts: [A("magnetism.force-on-charge"), A("magnetism.force-on-conductor")],
      stem: t`A beam of protons moving horizontally at $3.0 \times 10^{6}\ \text{m s}^{-1}$ enters a region of uniform magnetic field of flux density $0.25\ \text{T}$, directed vertically downwards, at right angles to the beam.`,
      parts: checkExam(EXAM.THEORY10, [
        P.manual({ label: "(a)", marks: 2, stem: "Define the tesla.", points: ["The uniform flux density giving a force of 1 N on each metre of a straight conductor carrying 1 A…", "…placed at right angles to the field."], modelAnswer: "One tesla is the uniform flux density that exerts a force of 1 N per metre on a long straight wire carrying 1 A at right angles to the field." }),
        P.manual({ label: "(b)", marks: 1, stem: "The protons move due north as they enter the field. State the direction of the magnetic force on them as they enter.", points: ["Horizontal, towards the west (left-hand rule: field down, current north, force west)."], modelAnswer: "Horizontally towards the west." }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the radius of the protons' circular path, in m, to three significant figures.", value: r, unit: "m", wrong: [(me * v) / (e * B)], explanation: t`$r = \dfrac{mv}{BQ} = \dfrac{1.67 \times 10^{-27} \times 3.0 \times 10^{6}}{0.25 \times 1.60 \times 10^{-19}} = ${sfStr(r, 3)}\ \text{m}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the time taken for the protons to travel half a circle, in s, to three significant figures.", value: tHalf, unit: "s", wrong: [2 * tHalf], answer: sciPlain(tHalf), explanation: t`$t = \dfrac{\pi r}{v} = \dfrac{\pi m}{BQ} = ${sciTex(tHalf)}\ \text{s}$ (independent of speed).` }),
        P.num({ label: "(e)", marks: 2, stem: t`An electric field is added so that protons of this speed pass straight through undeflected. Calculate the electric field strength needed, in $\text{V m}^{-1}$, to two significant figures.`, value: E, sf: 2, unit: "V/m", wrong: [B / v], answer: sciPlain(E, 2), explanation: t`$QE = BQv \Rightarrow E = Bv = 0.25 \times 3.0 \times 10^{6} = ${sciTex(E, 2)}\ \text{V m}^{-1}$, directed so that the electric force is towards the east.` }),
        P.manual({ label: "(f)", marks: 1, stem: "Explain why the magnetic field does not change the kinetic energy of the protons.", points: ["The magnetic force is always perpendicular to the velocity, so no work is done on the protons (speed constant)."], modelAnswer: "The magnetic force acts at right angles to the velocity at every instant, so it does no work and the speed, hence kinetic energy, stays constant." }),
      ]),
      explanation: "F = BQv; r = mv/(BQ); half-period πm/(BQ); selector E = Bv.",
      hints: ["Fleming's left-hand rule with the current along the proton velocity."],
    });
    chk(r, 0.1252, 0.001);
  }

  // T6: flux linkage and induction in a rotating coil.
  {
    const N = 320, a = 0.060, bb = 0.040, B = 0.080, dt = 0.015, f = 30;
    const Ar = a * bb, NPhi = N * B * Ar;
    const Eav = NPhi / dt;
    const E0 = B * Ar * N * 2 * Math.PI * f;
    b.struct({
      ...plan, d: 3,
      concepts: [A("induction.flux-faraday"), A("induction.lenz-applications")],
      stem: t`A rectangular coil of $320$ turns, $6.0\ \text{cm}$ by $4.0\ \text{cm}$, is placed with its plane perpendicular to a uniform magnetic field of $0.080\ \text{T}$. It can be rotated about an axis in its plane, perpendicular to the field.`,
      parts: checkExam(EXAM.THEORY10, [
        P.manual({ label: "(a)", marks: 1, stem: "Define magnetic flux linkage.", points: ["The product of the magnetic flux through the coil and the number of turns (NΦ)."], modelAnswer: "The magnetic flux through the coil multiplied by its number of turns, NΦ." }),
        P.manual({ label: "(b)", marks: 1, stem: "State Faraday's law of electromagnetic induction.", points: ["The induced e.m.f. is equal (proportional) to the rate of change of magnetic flux linkage."], modelAnswer: "The magnitude of the induced e.m.f. equals the rate of change of magnetic flux linkage." }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the flux linkage of the coil in this position, in Wb, to two significant figures.", value: NPhi, sf: 2, unit: "Wb", wrong: [B * Ar], explanation: t`$N\Phi = NBA = 320 \times 0.080 \times (0.060 \times 0.040) = ${sciTex(NPhi, 2)}\ \text{Wb}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "The coil is turned through 90° in 15 ms. Calculate the average e.m.f. induced, in V, to two significant figures.", value: Eav, sf: 2, unit: "V", wrong: [(B * Ar) / dt], explanation: t`The flux linkage falls from ${sciTex(NPhi, 2)} Wb to zero: $E = \dfrac{${sciTex(NPhi, 2)}}{0.015} = ${sfStr(Eav, 2)}\ \text{V}$.` }),
        P.num({ label: "(e)", marks: 2, stem: t`The coil is now rotated steadily at $30$ revolutions per second. Using $E_0 = BAN\omega$, calculate the peak e.m.f., in V, to three significant figures.`, value: E0, unit: "V", wrong: [B * Ar * N * f], explanation: t`$\omega = 2\pi \times 30 = ${sfStr(2 * Math.PI * f, 3)}\ \text{rad s}^{-1}$; $E_0 = ${sciTex(NPhi, 2)} \times ${sfStr(2 * Math.PI * f, 3)} = ${sfStr(E0, 3)}\ \text{V}$.` }),
        P.manual({ label: "(f)", marks: 2, stem: "The coil is connected to a lamp. Use Lenz's law to explain why more effort is needed to turn the coil when the lamp is lit than when the coil is not connected.", points: ["With a closed circuit the induced current flows in a direction that opposes the change (the rotation); the forces on the current-carrying coil in the field produce an opposing torque.", "Work must be done against this torque, which becomes the electrical energy (light and heat in the lamp); on open circuit no current flows, so there is no opposing torque."], modelAnswer: "When the lamp is connected, a current flows and, by Lenz's law, its direction is such that the forces on the coil in the field oppose the rotation. Work must be done against this opposing torque, and this work becomes the energy in the lamp. With no circuit there is no current and no opposing torque." }),
      ]),
      explanation: "NΦ = NBA; E = Δ(NΦ)/Δt; E₀ = BANω; Lenz's law and energy conservation.",
      hints: ["Convert the area to m².", "ω = 2πf."],
    });
  }
});
