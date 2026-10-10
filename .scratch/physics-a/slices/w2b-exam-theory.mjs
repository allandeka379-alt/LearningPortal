// W2b: THEORY10 exam-format items (ZIMSEC P2 / Cambridge P2 for AS concepts, Cambridge P4 for A Level concepts).
// 4 AS (current and drift velocity; resistivity and power; e.m.f. and internal resistance; potential divider and
// Kirchhoff) + 2 A (capacitor networks and energy; capacitor discharge). All concepts are covered by both syllabi.
import { concept, P, t, chk, DATA, EXAM, checkExam, sfStr, dpStr, sciTex, parallelR, seriesC, potentialDivider } from "../lib.mjs";

const A = (k) => `aphys.${k}`;
const area = (d) => (Math.PI * d * d) / 4;
const u = 1e-6;
const e = DATA.e;

concept(A("electricity.current-charge"), { file: "exam/w2b-theory", keyPrefix: "exam.w2b-theory" }, (b) => {
  const plan = { examStyle: true, skill: EXAM.THEORY10.skill, secs: EXAM.THEORY10.secs, calculator: true };

  // T1 (AS): drift velocity in a aluminium cable feeding a pump.
  {
    const d = 2.5e-3, n = 1.8e29, I = 12, L = 25;
    const Ar = area(d);
    const v = I / (n * Ar * e);
    const Q = I * 30 * 60;
    b.struct({
      ...plan, d: 3, paper: "ZIMSEC P2 / Cambridge P2",
      concepts: [A("electricity.current-charge")],
      stem: t`A borehole pump draws a steady current of $12\ \text{A}$ through an aluminium cable whose conductors each have a diameter of $2.5\ \text{mm}$. Aluminium has $1.8 \times 10^{29}$ free electrons per cubic metre. The elementary charge is $1.60 \times 10^{-19}\ \text{C}$.`,
      parts: checkExam(EXAM.THEORY10, [
        P.manual({ label: "(a)", marks: 1, stem: "Define electric current.", points: ["The rate of flow of (electric) charge."], modelAnswer: "Electric current is the rate of flow of charge, I = ΔQ/Δt." }),
        P.num({ label: "(b)", marks: 2, stem: "The pump runs for 30 minutes. Calculate the charge that passes through it, in C.", value: Q, unit: "C", wrong: [I * 30], explanation: t`$Q = It = 12 \times 1800 = ${Q}\ \text{C}$.` }),
        P.num({ label: "(c)", marks: 3, stem: t`Calculate the drift velocity of the electrons in one conductor, in $\text{m s}^{-1}$, to two significant figures.`, value: v, sf: 2, unit: "m/s", wrong: [I / (n * Math.PI * d * d * e)], explanation: t`$A = \pi(1.25 \times 10^{-3})^2 = ${sciTex(Ar)}\ \text{m}^2$; $v = \dfrac{I}{nAe} = \dfrac{12}{1.8 \times 10^{29} \times ${sciTex(Ar)} \times 1.60 \times 10^{-19}} = ${sciTex(v, 2)}\ \text{m s}^{-1}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "The cable is 25 m long. Calculate the time an electron takes, on average, to drift the length of one conductor, in hours, to two significant figures.", value: L / v / 3600, sf: 2, unit: "h", wrong: [L / v], explanation: t`$t = L/v = 25/${sciTex(v, 2)} = ${sciTex(L / v, 2)}\ \text{s} \approx ${sfStr(L / v / 3600, 2)}\ \text{h}$.` }),
        P.manual({ label: "(e)", marks: 2, stem: "The pump starts as soon as its switch is closed. Explain why, given your answer to (d).", points: ["The electric field (signal) is set up along the conductors at nearly the speed of light.", "Free electrons already in the motor windings start drifting at once; no electron has to travel from the switch."], modelAnswer: "Closing the switch sets up the electric field throughout the circuit almost instantly, so the free electrons that are already in the motor's windings begin to drift straight away; no electron needs to travel along the cable." }),
      ]),
      explanation: "Q = It; I = nAvq gives a tiny drift velocity; the field, not the electrons, travels quickly.",
      hints: ["A = πd²/4 with d in metres.", "Rearrange I = nAve for v."],
    });
  }

  // T2 (AS): resistivity and power in a kettle element.
  {
    const V = 230, Pw = 2400, rho = 1.4e-6, d = 0.55e-3;
    const R = (V * V) / Pw;
    const L = (R * area(d)) / rho;
    b.struct({
      ...plan, d: 4, paper: "ZIMSEC P2 / Cambridge P2",
      concepts: [A("electricity.resistivity"), A("electricity.pd-power")],
      stem: t`The element of a $230\ \text{V}$, $2.4\ \text{kW}$ kettle is a wire of an iron-chromium-aluminium heating alloy of diameter $0.55\ \text{mm}$. The resistivity of the alloy at the element's working temperature is $1.4 \times 10^{-6}\ \Omega\ \text{m}$.`,
      parts: checkExam(EXAM.THEORY10, [
        P.manual({ label: "(a)", marks: 2, stem: "Define resistivity, naming the symbols you use.", points: ["ρ = RA/L…", "…where R is the resistance of a sample of length L and uniform cross-sectional area A."], modelAnswer: "ρ = RA/L, where R is the resistance of a uniform sample of the material of length L and cross-sectional area A." }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the current in the element, in A, to three significant figures.", value: Pw / V, unit: "A", wrong: [V / Pw], explanation: t`$I = P/V = 2400/230 = ${sfStr(Pw / V, 3)}\ \text{A}$.` }),
        P.num({ label: "(c)", marks: 1, stem: "Calculate the resistance of the element, in Ω, to three significant figures.", value: R, unit: "Ω", wrong: [Pw / (V * V)], explanation: t`$R = V^2/P = 230^2/2400 = ${sfStr(R, 3)}\ \Omega$.` }),
        P.num({ label: "(d)", marks: 3, stem: "Calculate the length of wire in the element, in m, to two significant figures.", value: L, sf: 2, unit: "m", wrong: [(R * Math.PI * d * d) / rho], explanation: t`$A = \pi(0.55 \times 10^{-3})^2/4 = ${sciTex(area(d))}\ \text{m}^2$; $L = RA/\rho = ${sfStr(R, 3)} \times ${sciTex(area(d))}/(1.4 \times 10^{-6}) = ${sfStr(L, 2)}\ \text{m}$.` }),
        P.manual({ label: "(e)", marks: 2, stem: "When the kettle is first switched on, the element is cold. Suggest and explain how its power at switch-on compares with its rated power.", points: ["The resistivity (resistance) of the metal is lower when cold.", "P = V²/R with V fixed, so the power (and current) at switch-on is slightly larger than the rated value."], modelAnswer: "A metal's resistivity rises with temperature, so the cold element has a lower resistance. With the p.d. fixed, P = V²/R is then larger than the rated 2.4 kW until the element warms up (heating alloys are chosen so that their resistivity changes only a little, so the difference is small)." }),
      ]),
      explanation: "P = VI, R = V²/P, L = RA/ρ.",
      hints: ["Find R from the power rating.", "A = πd²/4."],
    });
  }

  // T3 (AS): e.m.f. and internal resistance of a solar panel battery.
  {
    const E = 12.8, r = 0.05, I = 40;
    const V = E - I * r;
    const Pin = E * I, Pr = I * I * r;
    b.struct({
      ...plan, d: 3, paper: "ZIMSEC P2 / Cambridge P2",
      concepts: [A("circuits.emf-internal-resistance"), A("electricity.pd-power")],
      stem: t`A $12.8\ \text{V}$ battery in a solar installation has an internal resistance of $0.050\ \Omega$. An inverter connected to the battery draws a current of $40\ \text{A}$.`,
      parts: checkExam(EXAM.THEORY10, [
        P.manual({ label: "(a)", marks: 2, stem: "Explain the difference between the e.m.f. of the battery and the p.d. across the inverter, in terms of energy.", points: ["E.m.f.: energy transferred from chemical to electrical per unit charge in the battery (driving charge round the complete circuit).", "P.d. across the inverter: electrical energy transferred to other forms per unit charge in the inverter (less than e.m.f. because of energy lost in r)."], modelAnswer: "The e.m.f. is the chemical energy converted to electrical energy per unit charge driven round the whole circuit; the p.d. across the inverter is the electrical energy converted to other forms per unit charge in the inverter. They differ by the energy per unit charge dissipated in the internal resistance." }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the terminal p.d. of the battery, in V.", value: V, dp: 1, unit: "V", wrong: [E], explanation: t`$V = E - Ir = 12.8 - 40 \times 0.050 = ${dpStr(V, 1)}\ \text{V}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the power dissipated in the internal resistance, in W.", value: Pr, unit: "W", wrong: [I * r], explanation: t`$P = I^2r = 40^2 \times 0.050 = ${Pr}\ \text{W}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the percentage of the power produced by the e.m.f. that reaches the inverter, to three significant figures.", value: ((V * I) / Pin) * 100, unit: "%", wrong: [(Pr / Pin) * 100], explanation: t`$\dfrac{VI}{EI} \times 100 = \dfrac{${dpStr(V, 1)}}{12.8} \times 100 = ${sfStr(((V * I) / Pin) * 100, 3)}\%$.` }),
        P.manual({ label: "(e)", marks: 2, stem: "The inverter's current doubles. State and explain the effect on the terminal p.d.", points: ["The lost volts Ir double (to 4.0 V).", "So the terminal p.d. falls, to 8.8 V."], modelAnswer: "With twice the current the lost volts Ir double from 2.0 V to 4.0 V, so the terminal p.d. falls from 10.8 V to 8.8 V." }),
      ]),
      explanation: "V = E − Ir; power lost in r is I²r.",
      hints: ["Lost volts = Ir."],
    });
    chk(V, 10.8, 1e-9);
  }

  // T4 (AS): thermistor potential divider loaded by a meter; Kirchhoff.
  {
    const Vin = 7.5, Rf = 3.3e3, Rt = 4.7e3, Rm = 15e3;
    const v0 = potentialDivider(Vin, Rt, Rf);
    const Rp = parallelR(Rf, Rm);
    const v1 = potentialDivider(Vin, Rt, Rp);
    const Itot = Vin / (Rt + Rp);
    b.struct({
      ...plan, d: 4, paper: "ZIMSEC P2 / Cambridge P2",
      concepts: [A("circuits.potential-dividers"), A("circuits.kirchhoff-problems")],
      stem: t`An NTC thermistor of resistance $4.7\ \text{k}\Omega$ (at room temperature) is connected in series with a $3.3\ \text{k}\Omega$ resistor across a $7.5\ \text{V}$ supply of negligible internal resistance. The output is the p.d. across the $3.3\ \text{k}\Omega$ resistor.`,
      parts: checkExam(EXAM.THEORY10, [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the output p.d., in V, to three significant figures.", value: v0, unit: "V", wrong: [potentialDivider(Vin, Rf, Rt)], explanation: t`$7.5 \times \dfrac{3.3}{4.7 + 3.3} = ${sfStr(v0, 3)}\ \text{V}$.` }),
        P.manual({ label: "(b)", marks: 2, stem: "State and explain how the output changes when the thermistor is warmed.", points: ["The thermistor's resistance falls as its temperature rises.", "It takes a smaller share of the 7.5 V, so the output across the fixed resistor rises."], modelAnswer: "Warming lowers the thermistor's resistance, so it takes a smaller share of the supply p.d. and the p.d. across the 3.3 kΩ resistor rises." }),
        P.group({ label: "(c)", stem: t`At room temperature, a voltmeter of resistance $15\ \text{k}\Omega$ is connected across the $3.3\ \text{k}\Omega$ resistor.`, parts: [
          P.num({ label: "(i)", marks: 2, stem: "Calculate the reading on the voltmeter, in V, to three significant figures.", value: v1, unit: "V", wrong: [v0], explanation: t`$3.3 \parallel 15 = ${sfStr(Rp / 1000, 3)}\ \text{k}\Omega$; reading $= 7.5 \times \dfrac{${sfStr(Rp / 1000, 3)}}{4.7 + ${sfStr(Rp / 1000, 3)}} = ${sfStr(v1, 3)}\ \text{V}$.` }),
          P.num({ label: "(ii)", marks: 2, stem: "Calculate the current in the voltmeter, in mA, to two significant figures.", value: (v1 / Rm) * 1000, sf: 2, unit: "mA", wrong: [(Itot) * 1000], explanation: t`$I = V/R_m = ${sfStr(v1, 3)}/15,000 = ${sfStr((v1 / Rm) * 1000, 2)}\ \text{mA}$ (the rest of the $${sfStr(Itot * 1000, 2)}\ \text{mA}$ from the supply passes through the 3.3 kΩ resistor, by Kirchhoff's first law).` }),
        ] }),
        P.manual({ label: "(d)", marks: 2, stem: "Suggest why the voltmeter reading is lower than the value in (a), and what property the meter should have.", points: ["The meter is in parallel with the 3.3 kΩ resistor, lowering the resistance of that section, so it takes a smaller share of the p.d.", "The meter's resistance should be much larger than 3.3 kΩ (ideally infinite)."], modelAnswer: "The voltmeter in parallel reduces the resistance of the lower section, so that section takes a smaller share of the 7.5 V. A voltmeter's resistance should be very much larger than the resistance it is connected across." }),
      ]),
      explanation: "V_out = V_in R₂/(R₁ + R₂); a meter in parallel lowers the output.",
      hints: ["The output is across the fixed resistor.", "The meter is in parallel with the 3.3 kΩ resistor."],
    });
  }

  // T5 (A): capacitor network and energy.
  {
    const C1 = 10 * u, C2 = 15 * u, C3 = 20 * u, V = 18;
    const C12 = seriesC(C1, C2);
    const Ct = C12 + C3;
    const Q12 = C12 * V;
    const W = 0.5 * Ct * V * V;
    b.struct({
      ...plan, d: 4, paper: "ZIMSEC P2 / Cambridge P4",
      concepts: [A("capacitance.capacitors"), A("capacitance.energy-stored")],
      stem: t`A $10\ \mu\text{F}$ capacitor and a $15\ \mu\text{F}$ capacitor are connected in series. A $20\ \mu\text{F}$ capacitor is connected in parallel with this pair, and the network is charged from an $18\ \text{V}$ supply.`,
      parts: checkExam(EXAM.THEORY10, [
        P.manual({ label: "(a)", marks: 1, stem: "Define capacitance.", points: ["Charge stored (on one plate) per unit potential difference: C = Q/V."], modelAnswer: "Capacitance is the charge stored per unit p.d. across the capacitor, C = Q/V." }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the total capacitance of the network, in µF.", value: Ct / u, unit: "µF", wrong: [(C1 + C2 + C3) / u], explanation: t`Series pair: $\dfrac{10 \times 15}{25} = ${C12 / u}\ \mu\text{F}$; plus $20$: $${Ct / u}\ \mu\text{F}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the p.d. across the 10 µF capacitor, in V.", value: Q12 / C1, dp: 1, unit: "V", wrong: [Q12 / C2], explanation: t`Charge on the series pair $= ${C12 / u} \times 18 = ${sfStr(Q12 / u, 3)}\ \mu\text{C}$; $V_{10} = ${sfStr(Q12 / u, 3)}/10 = ${dpStr(Q12 / C1, 1)}\ \text{V}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the total energy stored in the network, in J, to three significant figures.", value: W, unit: "J", wrong: [Ct * V * V], explanation: t`$W = \tfrac{1}{2}CV^2 = \tfrac{1}{2} \times ${Ct / u} \times 10^{-6} \times 18^2 = ${sfStr(W * 1000, 3)}\ \text{mJ}$.` }),
        P.manual({ label: "(e)", marks: 3, stem: "Show that the energy stored in a capacitor is ½QV, and explain why the supply provides more energy than this while charging the network.", points: ["Energy = area under the p.d.-charge graph.", "V ∝ Q, so the graph is a straight line through the origin and the area is ½QV.", "The supply moves all the charge through the full p.d., giving QV; the other ½QV is dissipated in the resistance of the connecting circuit."], modelAnswer: "The work to add charge ΔQ at p.d. V is VΔQ, so the energy stored is the area under the V-Q graph. Since V = Q/C this is a straight line through the origin, and the triangular area is ½QV. The supply moves all the charge through its full p.d., supplying QV, so the remaining ½QV is dissipated as heat in the circuit resistance." }),
      ]),
      explanation: "Series pair first (same charge), then parallel; W = ½CV².",
      hints: ["Same charge on capacitors in series.", "Parallel capacitances add."],
    });
    chk(Q12 / C1, 10.8, 1e-9);
  }

  // T6 (A): capacitor discharge in a camera flash recharge/backup circuit.
  {
    const C = 390 * u, R = 120e3, V0 = 15;
    const RC = R * C;
    const tt = 30;
    const V = V0 * Math.exp(-tt / RC);
    const th = Math.LN2 * RC;
    b.struct({
      ...plan, d: 4, paper: "ZIMSEC P2 / Cambridge P4",
      concepts: [A("capacitance.discharge"), A("capacitance.energy-stored")],
      stem: t`A $390\ \mu\text{F}$ capacitor charged to $15\ \text{V}$ is disconnected from its supply and then discharges through a $120\ \text{k}\Omega$ resistor.`,
      parts: checkExam(EXAM.THEORY10, [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the time constant, in s, to three significant figures.", value: RC, unit: "s", wrong: [R * 390], explanation: t`$RC = 120 \times 10^{3} \times 390 \times 10^{-6} = ${sfStr(RC, 3)}\ \text{s}$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the p.d. across the capacitor 30 s after the discharge starts, in V, to three significant figures.", value: V, unit: "V", wrong: [V0 * Math.exp(-RC / tt)], explanation: t`$V = 15\,e^{-30/${sfStr(RC, 3)}} = ${sfStr(V, 3)}\ \text{V}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the time for the p.d. to fall to half its initial value, in s, to three significant figures.", value: th, unit: "s", wrong: [RC / 2], explanation: t`$t_{1/2} = RC\ln 2 = ${sfStr(RC, 3)} \times 0.693 = ${sfStr(th, 3)}\ \text{s}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the energy dissipated in the resistor during the first 30 s, in J, to three significant figures.", value: 0.5 * C * (V0 * V0 - V * V), unit: "J", wrong: [0.5 * C * (V0 - V) ** 2], explanation: t`$\tfrac{1}{2}C(V_0^2 - V^2) = \tfrac{1}{2} \times 390 \times 10^{-6}(15^2 - ${sfStr(V, 3)}^2) = ${sfStr(0.5 * C * (V0 * V0 - V * V) * 1000, 3)}\ \text{mJ}$.` }),
        P.manual({ label: "(e)", marks: 3, stem: "Describe the graph of current against time for this discharge, as you would sketch it, and state what its area represents.", points: [t`Starts at $I_0 = V_0/R = 0.125\ \text{mA}$ at $t = 0$.`, t`Decays exponentially with time constant ${sfStr(RC, 3)} s: steep at first, flattening, approaching zero (37% of I₀ at t = RC).`, "The area under the graph is the charge that flows, equal to the initial charge CV₀ (about 5.9 mC)."], modelAnswer: t`The current starts at $15/120\,000 = 0.125\ \text{mA}$ and decays exponentially, falling to 37% of this after ${sfStr(RC, 3)} s and approaching zero. The area under the graph is the total charge that flows, $CV_0 \approx 5.9\ \text{mC}$.` }),
      ]),
      explanation: "τ = RC; V = V₀e^(−t/RC); t½ = 0.693RC; energy from ½CV² at the two p.d.s.",
      hints: ["Convert kΩ and µF to Ω and F.", "Energy dissipated = energy stored at start − energy at 30 s."],
    });
  }
});
