// W2b: ZIMSEC Paper 3 free-response items (format assumed, see BRIEF): current electricity, d.c. circuits with a
// potentiometer, capacitance.
import { concept, P, t, chk, ZIM, DATA, EXAM, checkExam, sfStr, dpStr, sciTex, seriesC, parallelC } from "../lib.mjs";

const A = (k) => `aphys.${k}`;
const area = (d) => (Math.PI * d * d) / 4;
const u = 1e-6;
const e = DATA.e;

// Two nodes joined by branches [E, R] (positive terminal towards the top node): node potential and upward currents.
function twoNode(branches) {
  const V = branches.reduce((s, [E, R]) => s + E / R, 0) / branches.reduce((s, [, R]) => s + 1 / R, 0);
  return { V, I: branches.map(([E, R]) => (E - V) / R) };
}

concept(A("electricity.resistivity"), { file: "exam/w2b-zimsec", keyPrefix: "exam.w2b-zimsec", applies: ZIM }, (b) => {
  const plan = { examStyle: true, skill: EXAM.ZIM_P3_FREE.skill, secs: EXAM.ZIM_P3_FREE.secs, applies: EXAM.ZIM_P3_FREE.applies, paper: "ZIMSEC P3", calculator: true };

  // Z1: current, drift velocity, resistivity and heating in a copper earth strap.
  {
    const w = 3.0e-3, th = 0.70e-3, L = 4.2, I = 35, n = 8.5e28, rho = 1.7e-8;
    const Ar = w * th;
    const v = I / (n * Ar * e);
    const R = (rho * L) / Ar;
    const Pw = I * I * R;
    const E10 = Pw * 600;
    b.struct({
      ...plan, d: 4,
      concepts: [A("electricity.resistivity"), A("electricity.current-charge"), A("electricity.resistance-iv"), A("electricity.pd-power")],
      stem: t`A copper strip of rectangular cross-section, $3.0\ \text{mm}$ wide and $0.70\ \text{mm}$ thick, and $4.2\ \text{m}$ long, carries a steady current of $35\ \text{A}$ in a mine's switchgear. Copper has $8.5 \times 10^{28}$ free electrons per cubic metre and resistivity $1.7 \times 10^{-8}\ \Omega\ \text{m}$.`,
      parts: checkExam(EXAM.ZIM_P3_FREE, [
        P.manual({ label: "(a)", marks: 5, stem: "Define electric current, potential difference, resistance and resistivity, and state Ohm's law.", points: [
          "Current: rate of flow of charge.",
          "Potential difference: energy transferred (from electrical to other forms) per unit charge.",
          "Resistance: p.d. across a component ÷ current in it (R = V/I).",
          "Resistivity: ρ = RA/L for a uniform sample of length L and cross-sectional area A.",
          "Ohm's law: current proportional to p.d. provided the temperature (physical conditions) stays constant.",
        ], modelAnswer: "Current is the rate of flow of charge. P.d. is the energy transferred from electrical to other forms per unit charge. Resistance is the ratio of the p.d. across a component to the current in it. Resistivity is ρ = RA/L, where R is the resistance of a uniform sample of length L and cross-sectional area A. Ohm's law: the current in a conductor is proportional to the p.d. across it, provided its temperature and other physical conditions remain constant." }),
        P.manual({ label: "(b)", marks: 5, stem: t`Derive the equation $I = nAvq$ for the current in a conductor, defining each symbol, and use it to explain why the drift velocity in a semiconductor is much larger than in a metal carrying the same current with the same cross-section.`, points: [
          "Symbols: n = number of charge carriers per unit volume, A = cross-sectional area, v = drift velocity, q = charge on each carrier.",
          "Length L contains nAL carriers, total charge nALq.",
          "This charge passes a cross-section in time L/v.",
          "I = nALq ÷ (L/v) = nAvq.",
          "A semiconductor has a far smaller n, so for the same I, A and q, v = I/(nAq) is much larger.",
        ], modelAnswer: "Let n be the number of carriers per unit volume, A the cross-sectional area, v the drift velocity and q the charge per carrier. A length L contains nAL carriers, so charge nALq, which passes a point in time L/v; hence I = nALq/(L/v) = nAvq. A semiconductor has a much smaller n than a metal, so for the same current and area its carriers must drift much faster." }),
        P.group({ label: "(c)", stem: "Calculate, to two significant figures:", parts: [
          P.num({ label: "(i)", marks: 2, stem: t`the cross-sectional area of the strip, in $\text{m}^2$`, value: Ar, sf: 2, unit: "m²", wrong: [3.0 * 0.7], explanation: t`$A = 3.0 \times 10^{-3} \times 0.70 \times 10^{-3} = ${sciTex(Ar, 2)}\ \text{m}^2$.` }),
          P.num({ label: "(ii)", marks: 3, stem: t`the drift velocity of the electrons, in $\text{m s}^{-1}$`, value: v, sf: 2, unit: "m/s", wrong: [I / (n * 3.0 * 0.7 * e)], explanation: t`$v = \dfrac{I}{nAe} = \dfrac{35}{8.5 \times 10^{28} \times ${sciTex(Ar, 2)} \times 1.60 \times 10^{-19}} = ${sciTex(v, 2)}\ \text{m s}^{-1}$.` }),
        ] }),
        P.group({ label: "(d)", stem: "Calculate:", parts: [
          P.num({ label: "(i)", marks: 2, stem: "the resistance of the strip, in Ω, to two significant figures", value: R, sf: 2, unit: "Ω", wrong: [(rho * Ar) / L], explanation: t`$R = \dfrac{\rho L}{A} = \dfrac{1.7 \times 10^{-8} \times 4.2}{${sciTex(Ar, 2)}} = ${sciTex(R, 2)}\ \Omega$.` }),
          P.num({ label: "(ii)", marks: 1, stem: "the p.d. across the strip, in V, to two significant figures", value: I * R, sf: 2, unit: "V", wrong: [R / I], explanation: t`$V = IR = 35 \times ${sciTex(R, 2)} = ${sfStr(I * R, 2)}\ \text{V}$.` }),
          P.num({ label: "(iii)", marks: 2, stem: "the thermal energy produced in the strip in 10 minutes, in J, to two significant figures", value: E10, sf: 2, unit: "J", wrong: [Pw * 10], explanation: t`$P = I^2R = 35^2 \times ${sciTex(R, 2)} = ${sfStr(Pw, 2)}\ \text{W}$; $W = Pt = ${sfStr(Pw, 3)} \times 600 = ${sciTex(E10, 2)}\ \text{J}$.` }),
        ] }),
      ]),
      explanation: "Definitions; I = nAvq; R = ρL/A; P = I²R.",
      hints: ["The cross-section is a rectangle: A = width × thickness.", "Convert mm to m."],
    });
  }

  // Z2: e.m.f., internal resistance, Kirchhoff and the potentiometer.
  {
    const Vcm = 1.86 / 100; // V per cm on the wire
    const l0 = 79.4, l = 61.2, Rx = 2.2;
    const E = Vcm * l0;
    const r = Rx * (l0 / l - 1);
    const br = [[7.2, 1.6], [5.4, 0.8], [0, 3.0]];
    const s = twoNode(br);
    b.struct({
      ...plan, d: 5,
      concepts: [A("circuits.potentiometer"), A("circuits.emf-internal-resistance"), A("circuits.kirchhoff-problems")],
      stem: t`Part 1: a potentiometer wire $100.0\ \text{cm}$ long has a steady p.d. of $1.86\ \text{V}$ across it. A cell balances at $79.4\ \text{cm}$ on open circuit and at $61.2\ \text{cm}$ when a $2.2\ \Omega$ resistor is connected across it.

Part 2: a $7.2\ \text{V}$ battery of internal resistance $1.6\ \Omega$ and a $5.4\ \text{V}$ battery of internal resistance $0.80\ \Omega$ are connected in parallel, positive terminal to positive terminal, across a $3.0\ \Omega$ resistor.`,
      parts: checkExam(EXAM.ZIM_P3_FREE, [
        P.manual({ label: "(a)", marks: 4, stem: "Define e.m.f. and internal resistance, and state Kirchhoff's two laws.", points: [
          "E.m.f.: energy transferred from other forms to electrical energy per unit charge in driving charge round a complete circuit.",
          "Internal resistance: resistance of the materials within the source, causing energy to be dissipated inside it when current flows.",
          "First law: sum of currents into a junction = sum of currents out (conservation of charge).",
          "Second law: round any closed loop, sum of e.m.f.s = sum of p.d.s (conservation of energy).",
        ], modelAnswer: "E.m.f. is the energy transferred to electrical energy per unit charge in driving charge round a complete circuit. Internal resistance is the resistance of the source's own materials, in which energy is dissipated when it supplies current. Kirchhoff's first law: the total current into a junction equals the total current out. Second law: round any closed loop, the sum of the e.m.f.s equals the sum of the p.d.s." }),
        P.manual({ label: "(b)", marks: 6, stem: t`Explain why a potentiometer at balance measures the e.m.f. of a cell, and show that the internal resistance is $r = R\left(\dfrac{l_0}{l} - 1\right)$, where $l_0$ and $l$ are the open-circuit and loaded balance lengths.`, points: [
          "A uniform wire with a steady current has p.d. proportional to length.",
          "At balance the galvanometer reads zero: no current flows through the test cell.",
          "So there are no lost volts (Ir = 0): the balance p.d. equals the e.m.f., E = kl₀.",
          "With R connected, the balance p.d. is the terminal p.d. V = kl, and the current is I = V/R.",
          "E = V + Ir, so r = (E − V)/I = R(E − V)/V.",
          "r = R(l₀ − l)/l = R(l₀/l − 1).",
        ], modelAnswer: "With a steady current in a uniform wire, the p.d. between one end and any point is proportional to the length, V = kl. At balance the galvanometer shows no current, so no current passes through the cell, there is no p.d. across its internal resistance, and the balance p.d. equals its e.m.f.: E = kl₀. With R across the cell, current I = V/R flows and the balance p.d. is the terminal p.d. V = kl. From E = V + Ir, r = (E − V)/I = R(E − V)/V = R(l₀/l − 1)." }),
        P.group({ label: "(c)", stem: "For Part 1, calculate:", parts: [
          P.num({ label: "(i)", marks: 2, stem: "the e.m.f. of the cell, in V, to three significant figures", value: E, unit: "V", wrong: [Vcm * l], explanation: t`$E = \dfrac{1.86}{100.0} \times 79.4 = ${sfStr(E, 3)}\ \text{V}$.` }),
          P.num({ label: "(ii)", marks: 2, stem: "the internal resistance, in Ω, to two significant figures", value: r, sf: 2, unit: "Ω", wrong: [Rx * (l / l0 - 1) * -1], explanation: t`$r = 2.2\left(\dfrac{79.4}{61.2} - 1\right) = ${sfStr(r, 2)}\ \Omega$.` }),
          P.num({ label: "(iii)", marks: 1, stem: "the current in the 2.2 Ω resistor at the loaded balance, in A, to two significant figures", value: (Vcm * l) / Rx, sf: 2, unit: "A", wrong: [E / Rx], explanation: t`$V = 0.0186 \times 61.2 = ${sfStr(Vcm * l, 3)}\ \text{V}$; $I = V/R = ${sfStr((Vcm * l) / Rx, 2)}\ \text{A}$.` }),
        ] }),
        P.group({ label: "(d)", stem: "For Part 2, calculate:", parts: [
          P.num({ label: "(i)", marks: 3, stem: "the p.d. across the 3.0 Ω resistor, in V, to three significant figures", value: s.V, unit: "V", wrong: [(7.2 + 5.4) / 2], explanation: t`Let $V$ be the p.d. across the resistor. First law: $\dfrac{7.2 - V}{1.6} + \dfrac{5.4 - V}{0.80} = \dfrac{V}{3.0}$. Multiplying by 24: $15(7.2 - V) + 30(5.4 - V) = 8V$, so $270 = 53V$ and $V = ${sfStr(s.V, 3)}\ \text{V}$.` }),
          P.num({ label: "(ii)", marks: 2, stem: "the current in the 5.4 V battery, in A, to two significant figures, stating whether it is charging or discharging", value: Math.abs(s.I[1]), sf: 2, unit: "A", wrong: [5.4 / 0.8], explanation: t`$I_2 = \dfrac{5.4 - ${sfStr(s.V, 3)}}{0.80} = ${dpStr(s.I[1], 3)}\ \text{A}$: ${s.I[1] > 0 ? "positive, so the 5.4 V battery is supplying current (discharging)" : "negative, so current flows into its positive terminal: it is being charged"}; magnitude $${sfStr(Math.abs(s.I[1]), 2)}\ \text{A}$.` }),
        ] }),
      ]),
      explanation: "Null method: no current in the cell at balance; E = V + Ir; node method for the two-battery network.",
      hints: ["p.d. per cm = 1.86/100.0.", "Write each branch current in terms of the p.d. across the 3.0 Ω resistor."],
    });
  }

  // Z3: capacitance, energy and discharge.
  {
    const C1 = 9 * u, C2 = 18 * u, C3 = 12 * u, V = 20;
    const C12 = seriesC(C1, C2);
    const Ct = parallelC(C12, C3);
    const W = 0.5 * Ct * V * V;
    const R = 56e3;
    const RC = R * Ct;
    const t30 = RC * Math.log(V / 3.0);
    b.struct({
      ...plan, d: 5,
      concepts: [A("capacitance.capacitors"), A("capacitance.energy-stored"), A("capacitance.discharge")],
      stem: t`A $9.0\ \mu\text{F}$ capacitor and an $18\ \mu\text{F}$ capacitor are connected in series, and a $12\ \mu\text{F}$ capacitor is connected in parallel with this pair. The network is charged to $20\ \text{V}$, disconnected from the supply, and then discharged through a $56\ \text{k}\Omega$ resistor.`,
      parts: checkExam(EXAM.ZIM_P3_FREE, [
        P.manual({ label: "(a)", marks: 4, stem: "Define capacitance, the farad and the time constant of a capacitor-resistor circuit, and state what is meant by exponential decay.", points: [
          "Capacitance: charge stored per unit p.d. (C = Q/V).",
          "Farad: capacitance that stores 1 C per volt (1 F = 1 C V⁻¹).",
          "Time constant: RC, the time for the charge (p.d. or current) to fall to 1/e (37%) of its initial value.",
          "Exponential decay: the rate of decrease is proportional to the amount remaining, so equal fractions are lost in equal times.",
        ], modelAnswer: "Capacitance is the charge stored per unit p.d. The farad is one coulomb per volt. The time constant RC is the time for the charge, p.d. or current to fall to 1/e of its initial value. In exponential decay the rate of decrease is proportional to the quantity remaining, so the same fraction is lost in each equal time interval." }),
        P.manual({ label: "(b)", marks: 6, stem: "Derive the formulae for the combined capacitance of two capacitors (i) in parallel and (ii) in series, and show that the energy stored in a capacitor is ½QV.", points: [
          "Parallel: same p.d. V across each; charges add, Q = Q₁ + Q₂.",
          "CV = C₁V + C₂V, so C = C₁ + C₂.",
          "Series: same charge Q on each; p.d.s add, V = V₁ + V₂.",
          "Q/C = Q/C₁ + Q/C₂, so 1/C = 1/C₁ + 1/C₂.",
          "Energy: work VΔQ to add charge ΔQ, so energy = area under the V-Q graph.",
          "V ∝ Q gives a straight line through the origin: triangle area ½QV.",
        ], modelAnswer: "In parallel, both capacitors have the same p.d. V and their charges add: Q = Q₁ + Q₂, so CV = C₁V + C₂V and C = C₁ + C₂. In series, both carry the same charge Q and the p.d.s add: V = V₁ + V₂, so Q/C = Q/C₁ + Q/C₂ and 1/C = 1/C₁ + 1/C₂. Adding charge ΔQ at p.d. V needs work VΔQ, so the energy is the area under the V-Q graph; since V ∝ Q this is a triangle of area ½QV." }),
        P.group({ label: "(c)", stem: "Calculate:", parts: [
          P.num({ label: "(i)", marks: 2, stem: "the combined capacitance, in µF", value: Ct / u, unit: "µF", wrong: [(C1 + C2 + C3) / u], explanation: t`Series pair $= \dfrac{9.0 \times 18}{27} = ${C12 / u}\ \mu\text{F}$; total $= ${C12 / u} + 12 = ${Ct / u}\ \mu\text{F}$.` }),
          P.num({ label: "(ii)", marks: 2, stem: "the p.d. across the 9.0 µF capacitor, in V, to three significant figures", value: (C12 * V) / C1, unit: "V", wrong: [(C12 * V) / C2], explanation: t`Charge on the series pair $= ${C12 / u} \times 20 = ${(C12 * V) / u}\ \mu\text{C}$; $V_8 = ${(C12 * V) / u}/9.0 = ${sfStr((C12 * V) / C1, 3)}\ \text{V}$.` }),
          P.num({ label: "(iii)", marks: 2, stem: "the total energy stored, in J, to three significant figures", value: W, unit: "J", wrong: [Ct * V * V], explanation: t`$W = \tfrac{1}{2} \times ${Ct / u} \times 10^{-6} \times 20^2 = ${sciTex(W)}\ \text{J}$.` }),
        ] }),
        P.group({ label: "(d)", stem: "During the discharge through the 56 kΩ resistor, calculate:", parts: [
          P.num({ label: "(i)", marks: 2, stem: "the time constant, in s, to three significant figures", value: RC, unit: "s", wrong: [R * C3], explanation: t`$RC = 56 \times 10^{3} \times ${Ct / u} \times 10^{-6} = ${sfStr(RC, 3)}\ \text{s}$.` }),
          P.num({ label: "(ii)", marks: 2, stem: "the time for the p.d. to fall to 3.0 V, in s, to three significant figures", value: t30, unit: "s", wrong: [RC * Math.log10(V / 3.0)], explanation: t`$t = RC\ln\dfrac{20}{3.0} = ${sfStr(RC, 3)} \times \ln 6.67 = ${sfStr(t30, 3)}\ \text{s}$.` }),
        ] }),
      ]),
      explanation: "Series then parallel; W = ½CV²; τ = RC; t = RC ln(V₀/V).",
      hints: ["Combine the series pair first.", "Use natural logarithms for the discharge time."],
    });
    chk(Ct / u, 18, 1e-9);
  }
});
