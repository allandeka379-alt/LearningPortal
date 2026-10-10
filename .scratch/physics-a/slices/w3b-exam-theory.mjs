// W3b: THEORY10 exam-format items (ZIMSEC P2 / Cambridge P4 for A Level concepts; ZIMSEC-only concepts applies ZIM).
// 4 A (specific heat and latent heat; ideal gas and kinetic theory; first law; a.c. r.m.s. and rectification) +
// 2 ZIM (Bernoulli and continuity; transformers and transmission).
import { concept, P, t, chk, ZIM, DATA, EXAM, checkExam, sfStr, dpStr, sciTex, toK } from "../lib.mjs";

const A = (k) => `aphys.${k}`;
const { R, k, NA, g } = DATA;
const r2 = Math.SQRT2;

concept(A("thermal.specific-heat-latent-heat"), { file: "exam/w3b-theory", keyPrefix: "exam.w3b-theory" }, (b) => {
  const plan = { examStyle: true, skill: EXAM.THEORY10.skill, secs: EXAM.THEORY10.secs, calculator: true };

  // T1 (A): an electric shower and a steam burn.
  {
    const P0 = 8.5e3, Ti = 19, Tf = 41, c = 4200;
    const mdot = P0 / (c * (Tf - Ti));
    const Lv = 2.26e6, m = 2.0e-3, Tskin = 37;
    const Qsteam = m * Lv + m * c * (100 - Tskin);
    const Qwater = m * c * (100 - Tskin);
    b.struct({
      ...plan, d: 3, paper: "ZIMSEC P2 / Cambridge P4",
      concepts: [A("thermal.specific-heat-latent-heat")],
      stem: t`An electric shower heats water flowing through it from $19\ ^\circ\text{C}$ to $41\ ^\circ\text{C}$. Its heating element has a power of $8.5\ \text{kW}$. The specific heat capacity of water is $4200\ \text{J kg}^{-1}\ \text{K}^{-1}$ and its specific latent heat of vaporisation is $2.26 \times 10^{6}\ \text{J kg}^{-1}$.`,
      parts: checkExam(EXAM.THEORY10, [
        P.manual({ label: "(a)", marks: 1, stem: "Define specific heat capacity.", points: ["Energy required per unit mass to raise the temperature by one kelvin (without a change of phase)."], modelAnswer: "The specific heat capacity of a substance is the energy needed per unit mass to raise its temperature by one kelvin." }),
        P.num({ label: "(b)", marks: 2, stem: t`Assuming all the electrical energy heats the water, calculate the mass of water flowing per second, in $\text{kg s}^{-1}$, to two significant figures.`, value: mdot, sf: 2, wrong: [P0 / (c * Tf)], explanation: t`$\dfrac{m}{t} = \dfrac{P}{c\Delta\theta} = \dfrac{8500}{4200 \times 22} = ${sfStr(mdot, 2)}\ \text{kg s}^{-1}$.` }),
        P.manual({ label: "(c)", marks: 2, stem: "On a cold morning the water enters at 12 °C. State and explain what the user must do to keep the outlet at 41 °C.", points: ["The temperature rise needed is larger (29 K instead of 22 K).", "With fixed power, mΔθ/t is fixed, so the flow rate must be reduced (to about 22/29 of its value)."], modelAnswer: "The water must now be heated through 29 K instead of 22 K. Since the power, and so the product of flow rate and temperature rise, is fixed, the user must reduce the flow rate to about 22/29 of its previous value." }),
        P.group({ label: "(d)", stem: t`$2.0\ \text{g}$ of steam at $100\ ^\circ\text{C}$ condenses on skin and the water cools to $37\ ^\circ\text{C}$.`, parts: [
          P.num({ label: "(i)", marks: 2, stem: "Calculate the energy given to the skin, in J, to three significant figures.", value: Qsteam, unit: "J", wrong: [m * Lv, Qwater], explanation: t`$mL + mc\Delta\theta = 2.0 \times 10^{-3} \times 2.26 \times 10^{6} + 2.0 \times 10^{-3} \times 4200 \times 63 = ${sfStr(m * Lv, 4)} + ${sfStr(Qwater, 3)} = ${sfStr(Qsteam, 3)}\ \text{J}$.` }),
          P.num({ label: "(ii)", marks: 1, stem: "Calculate how many times larger this is than the energy from 2.0 g of water at 100 °C cooling to 37 °C, to two significant figures.", value: Qsteam / Qwater, sf: 2, wrong: [Qwater / Qsteam], explanation: t`$\dfrac{${sfStr(Qsteam, 3)}}{${sfStr(Qwater, 3)}} = ${sfStr(Qsteam / Qwater, 2)}$.` }),
        ] }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain, in terms of molecules, why condensing steam releases so much energy.", points: ["Steam molecules are far apart with high (near-zero, least negative) potential energy; on condensing they move close together and are bound by intermolecular forces.", "The decrease in potential energy (latent heat) is released at constant temperature, and it is large because almost all intermolecular bonds re-form."], modelAnswer: "In steam the molecules are far apart, with almost no intermolecular potential energy. When it condenses they come close together and are bound by attractive forces, so their potential energy falls by a large amount, released as latent heat at constant temperature." }),
      ]),
      explanation: "Power = (m/t)cΔθ; condensing steam releases mL before the water cools.",
      hints: ["For a continuous flow, P = (m/t)cΔθ.", "Steam first condenses (mL), then cools (mcΔθ)."],
    });
  }

  // T2 (A): ideal gas and kinetic theory in a gas cylinder.
  {
    const V = 0.015, p = 1.75e6, T = toK(23), M = 0.004;
    const n = (p * V) / (R * T), N = n * NA;
    const ke = 1.5 * k * T;
    const c = Math.sqrt((3 * k * T) / (M / NA));
    b.struct({
      ...plan, d: 4, paper: "ZIMSEC P2 / Cambridge P4",
      concepts: [A("gases.equation-of-state"), A("gases.kinetic-theory")],
      stem: t`A $0.015\ \text{m}^3$ cylinder holds helium (molar mass $0.004\ \text{kg mol}^{-1}$), which may be treated as an ideal gas, at $1.75 \times 10^{6}\ \text{Pa}$ and $23\ ^\circ\text{C}$. It is used to fill party balloons.`,
      parts: checkExam(EXAM.THEORY10, [
        P.manual({ label: "(a)", marks: 1, stem: "State what is meant by an ideal gas.", points: ["A gas for which pV is proportional to the thermodynamic temperature (for a fixed amount of gas)."], modelAnswer: "An ideal gas is one for which pV ∝ T, where T is the thermodynamic temperature, for a fixed amount of gas." }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the number of helium atoms in the cylinder, to three significant figures.", value: N, wrong: [n, (p * V) / (k * 23)], explanation: t`$n = \dfrac{pV}{RT} = \dfrac{1.75 \times 10^{6} \times 0.015}{8.31 \times 296} = ${sfStr(n, 3)}\ \text{mol}$; $N = nN_A = ${sciTex(N)}$.` }),
        P.num({ label: "(c)", marks: 1, stem: "Calculate the mean translational kinetic energy of a helium atom, in J, to three significant figures.", value: ke, unit: "J", wrong: [k * T], explanation: t`$\tfrac{3}{2}kT = 1.5 \times 1.38 \times 10^{-23} \times 296.15 = ${sciTex(ke)}\ \text{J}$.` }),
        P.num({ label: "(d)", marks: 2, stem: t`Calculate the r.m.s. speed of the atoms, in $\text{m s}^{-1}$, to three significant figures.`, value: c, unit: "m/s", wrong: [Math.sqrt((3 * k * T) / M)], explanation: t`$m = \dfrac{0.004}{6.02 \times 10^{23}} = ${sciTex(M / NA)}\ \text{kg}$; $c_{\text{r.m.s.}} = \sqrt{\dfrac{2 \times ${sciTex(ke)}}{${sciTex(M / NA)}}} = ${sfStr(c, 3)}\ \text{m s}^{-1}$.` }),
        P.num({ label: "(e)", marks: 2, stem: t`Each balloon holds $6.0 \times 10^{-3}\ \text{m}^3$ of helium at $1.1 \times 10^{5}\ \text{Pa}$ and $23\ ^\circ\text{C}$. The filling stops when the cylinder pressure falls to $1.1 \times 10^{5}\ \text{Pa}$. How many balloons can be filled?`, value: Math.floor(((p - 1.1e5) * V) / (1.1e5 * 6.0e-3)), wrong: [Math.floor((p * V) / (1.1e5 * 6.0e-3))], explanation: t`At constant temperature, the gas that leaves would occupy $\dfrac{(1.75 \times 10^{6} - 1.1 \times 10^{5}) \times 0.015}{1.1 \times 10^{5}} = ${sfStr(((p - 1.1e5) * V) / 1.1e5, 3)}\ \text{m}^3$ at balloon pressure: ${sfStr(((p - 1.1e5) * V) / (1.1e5 * 6.0e-3), 3)} balloons, so ${Math.floor(((p - 1.1e5) * V) / (1.1e5 * 6.0e-3))} complete balloons. Some gas must remain in the cylinder.` }),
        P.manual({ label: "(f)", marks: 2, stem: "Explain, in terms of the atoms, why the pressure in the cylinder falls as balloons are filled at constant temperature.", points: ["Fewer atoms remain in the same volume (number density falls).", "At the same temperature the atoms have the same mean speed, so they strike the walls less often: smaller rate of change of momentum per unit area."], modelAnswer: "As gas leaves, fewer atoms remain in the cylinder's fixed volume. Their mean speed is unchanged at constant temperature, so collisions with the walls are less frequent, the rate of change of momentum per unit area falls, and so does the pressure." }),
      ]),
      explanation: "pV = nRT for the amount; ½m⟨c²⟩ = (3/2)kT for the atoms.",
      hints: ["N = nN_A.", "The cylinder cannot empty below the balloon pressure."],
    });
  }

  // T3 (A): first law for a gas in a cylinder with a piston.
  {
    const p = 1.6e5, V1 = 3.0e-4, V2 = 5.5e-4, q = 140;
    const W = -p * (V2 - V1);
    const dU = q + W;
    b.struct({
      ...plan, d: 4, paper: "ZIMSEC P2 / Cambridge P4",
      concepts: [A("thermal.internal-energy-first-law")],
      stem: t`An ideal gas in a cylinder is heated. Its volume increases from $3.0 \times 10^{-4}\ \text{m}^3$ to $5.5 \times 10^{-4}\ \text{m}^3$ against a piston that keeps the pressure constant at $1.6 \times 10^{5}\ \text{Pa}$. The gas receives $140\ \text{J}$ by heating.`,
      parts: checkExam(EXAM.THEORY10, [
        P.manual({ label: "(a)", marks: 2, stem: "Define internal energy.", points: ["Sum of the random kinetic and potential energies…", "…of the molecules (randomly distributed) of the system."], modelAnswer: "Internal energy is the sum of the random kinetic energies and potential energies of all the molecules of a system." }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the work done on the gas, in J (include the sign).", value: W, unit: "J", wrong: [-W], explanation: t`$W = -p\Delta V = -1.6 \times 10^{5} \times 2.5 \times 10^{-4} = ${dpStr(W, 1)}\ \text{J}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Use the first law of thermodynamics to calculate the increase in internal energy of the gas, in J.", value: dU, dp: 1, unit: "J", wrong: [q - W], explanation: t`$\Delta U = q + W = 140 + (${dpStr(W, 1)}) = ${dpStr(dU, 1)}\ \text{J}$.` }),
        P.manual({ label: "(d)", marks: 2, stem: "State and explain the change in the temperature of the gas.", points: ["ΔU is positive, so the internal energy increases.", "For an ideal gas U is entirely random kinetic energy (U ∝ T), so the temperature rises."], modelAnswer: "ΔU is positive. For an ideal gas the internal energy is all random kinetic energy of the molecules, proportional to T, so the temperature rises." }),
        P.num({ label: "(e)", marks: 2, stem: "The same temperature rise is produced at constant volume instead. Calculate the energy that must now be supplied by heating, in J.", value: dU, dp: 1, unit: "J", wrong: [q], explanation: t`Same temperature rise → same $\Delta U = ${dpStr(dU, 1)}\ \text{J}$; at constant volume $W = 0$, so $q = \Delta U = ${dpStr(dU, 1)}\ \text{J}$, less than 140 J because no work is done.` }),
      ]),
      explanation: "W = −pΔV for an expansion; ΔU = q + W.",
      hints: ["The gas expands, so the work done ON it is negative.", "U depends only on T for an ideal gas."],
    });
  }

  // T4 (A): a.c. r.m.s. values and a smoothed rectifier.
  {
    const Vr = 6.3, R = 150, C = 2200e-6, f = 50;
    const V0 = Vr * r2;
    const Pm = (Vr * Vr) / R;
    const ripple = V0 * (1 - Math.exp(-1 / (2 * f) / (R * C)));
    b.struct({
      ...plan, d: 4, paper: "ZIMSEC P2 / Cambridge P4",
      concepts: [A("ac.characteristics-rms"), A("ac.rectification-smoothing")],
      stem: t`A transformer gives a sinusoidal output of $6.3\ \text{V}$ r.m.s. at $50\ \text{Hz}$. It is connected first directly to a $150\ \Omega$ resistor, and then to the same resistor through a bridge rectifier of ideal diodes with a $2200\ \mu\text{F}$ capacitor in parallel with the resistor.`,
      parts: checkExam(EXAM.THEORY10, [
        P.manual({ label: "(a)", marks: 1, stem: "Explain what is meant by the r.m.s. value of an alternating voltage.", points: ["The steady (d.c.) voltage that would give the same mean power (heating effect) in a resistor."], modelAnswer: "It is the value of the steady direct voltage that would dissipate energy in a resistor at the same average rate." }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate the peak voltage, in V, to three significant figures.", value: V0, unit: "V", wrong: [Vr / r2], explanation: t`$V_0 = \sqrt{2} \times 6.3 = ${sfStr(V0, 3)}\ \text{V}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "For the direct connection, calculate the mean power in the resistor, in W.", value: Pm, unit: "W", wrong: [(V0 * V0) / R], explanation: t`$\langle P\rangle = \dfrac{V_{\text{r.m.s.}}^2}{R} = \dfrac{6.3^2}{150} = ${sfStr(Pm, 3)}\ \text{W}$.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Describe the p.d. across the resistor when connected through the bridge rectifier and capacitor.", points: ["Nearly steady at about the peak value (8.9 V), always the same polarity.", "Small sawtooth ripple: slow fall as the capacitor discharges through R between peaks, sharp rise at each peak, 100 times per second."], modelAnswer: "The p.d. is almost steady, close to the 8.9 V peak and always of the same polarity, with a small ripple: it falls slowly as the capacitor discharges through the resistor between peaks and rises sharply at each of the 100 peaks per second." }),
        P.num({ label: "(e)", marks: 2, stem: t`Using $\Delta V = V_0\left(1 - e^{-t/RC}\right)$, estimate the ripple voltage, in V, to two significant figures.`, value: ripple, sf: 2, unit: "V", wrong: [V0 * (1 - Math.exp(-1 / f / (R * C)))], explanation: t`$RC = 150 \times 2200 \times 10^{-6} = 0.33\ \text{s}$; $t = 10\ \text{ms}$; $\Delta V = ${sfStr(V0, 3)}\left(1 - e^{-0.010/0.33}\right) = ${sfStr(ripple, 2)}\ \text{V}$.` }),
        P.manual({ label: "(f)", marks: 2, stem: "Suggest the effect on the ripple of replacing the resistor with one of 75 Ω, and explain.", points: ["The ripple increases (about doubles).", "RC halves, so the capacitor discharges more between peaks."], modelAnswer: "The ripple would roughly double, because the time constant RC is halved, so the capacitor loses more charge through the load between peaks." }),
      ]),
      explanation: "V₀ = √2 V_rms; mean power = V_rms²/R; ripple small when RC ≫ time between peaks.",
      hints: ["Full-wave: peaks every 10 ms.", "Mean power uses r.m.s. values."],
    });
  }

  // T5 (ZIM): Bernoulli and continuity in a fire hose.
  {
    const rho = 1000, d1 = 0.065, d2 = 0.025, Q = 0.010;
    const A1 = (Math.PI * d1 * d1) / 4, A2 = (Math.PI * d2 * d2) / 4;
    const v1 = Q / A1, v2 = Q / A2;
    const dp = 0.5 * rho * (v2 * v2 - v1 * v1);
    b.struct({
      ...plan, d: 4, paper: "ZIMSEC P2", applies: ZIM,
      concepts: [A("matter.fluid-flow")],
      stem: t`Water ($\rho = 1000\ \text{kg m}^{-3}$) flows at $0.010\ \text{m}^3\ \text{s}^{-1}$ through a horizontal fire hose of internal diameter $65\ \text{mm}$ and leaves through a nozzle of diameter $25\ \text{mm}$. Treat the water as an ideal fluid.`,
      parts: checkExam(EXAM.THEORY10, [
        P.manual({ label: "(a)", marks: 2, stem: "State two properties of an ideal fluid and the type of flow assumed in Bernoulli's equation.", points: ["Incompressible and non-viscous.", "Steady streamline (laminar) flow."], modelAnswer: "An ideal fluid is incompressible and non-viscous, and the flow is steady and streamline." }),
        P.num({ label: "(b)", marks: 2, stem: t`Calculate the speed of the water in the hose, in $\text{m s}^{-1}$, to three significant figures.`, value: v1, unit: "m/s", wrong: [Q / (Math.PI * d1 * d1)], explanation: t`$A_1 = \dfrac{\pi (0.065)^2}{4} = ${sciTex(A1)}\ \text{m}^2$; $v_1 = \dfrac{0.010}{${sciTex(A1)}} = ${sfStr(v1, 3)}\ \text{m s}^{-1}$.` }),
        P.num({ label: "(c)", marks: 1, stem: t`Calculate the speed at the nozzle, in $\text{m s}^{-1}$, to three significant figures.`, value: v2, unit: "m/s", wrong: [v1 * (d1 / d2)], explanation: t`$v_2 = v_1\left(\dfrac{65}{25}\right)^2 = ${sfStr(v2, 3)}\ \text{m s}^{-1}$.` }),
        P.num({ label: "(d)", marks: 3, stem: "Calculate the pressure difference between the water in the hose and the water leaving the nozzle, in Pa, to two significant figures.", value: dp, sf: 2, unit: "Pa", wrong: [0.5 * rho * v2 * v2 * 2, 0.5 * rho * (v2 - v1) ** 2], explanation: t`$\Delta p = \tfrac{1}{2}\rho(v_2^2 - v_1^2) = 500 \times (${sfStr(v2, 3)}^2 - ${sfStr(v1, 3)}^2) = ${sciTex(dp, 2)}\ \text{Pa}$.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain why a firefighter must hold the nozzle firmly.", points: ["The water's momentum increases greatly in the nozzle (speeds up), so the nozzle exerts a forward force on the water.", "By Newton's third law the water pushes the nozzle backwards (recoil), so it must be held."], modelAnswer: "The nozzle accelerates the water to a much higher speed, so it must exert a large force on the water; by Newton's third law the water exerts an equal backward force on the nozzle, which the firefighter must resist." }),
      ]),
      explanation: "Continuity gives the speeds; Bernoulli gives the pressure difference.",
      hints: ["A ∝ d².", "Δp = ½ρ(v₂² − v₁²)."],
    });
  }

  // T6 (ZIM): transformer and transmission line.
  {
    const P0 = 40e6, Vt = 132e3, R = 5.5, Np = 600, Vg = 11e3;
    const Ns = Np * (Vt / Vg);
    const I = P0 / Vt;
    const loss = I * I * R;
    b.struct({
      ...plan, d: 3, paper: "ZIMSEC P2", applies: ZIM,
      concepts: [A("ac.transformers-transmission")],
      stem: t`A power station generates at $11\ \text{kV}$. A step-up transformer with $600$ primary turns raises the voltage to $132\ \text{kV}$ for a line of total resistance $5.5\ \Omega$ that carries $40\ \text{MW}$. Treat the transformer as ideal.`,
      parts: checkExam(EXAM.THEORY10, [
        P.manual({ label: "(a)", marks: 2, stem: "Explain why an e.m.f. is induced in the secondary coil of the transformer.", points: ["The alternating primary current produces an alternating (changing) magnetic flux in the core, which links the secondary.", "The changing flux linkage of the secondary induces an e.m.f. (Faraday's law)."], modelAnswer: "The alternating current in the primary sets up an alternating flux in the iron core, which passes through the secondary. The secondary's flux linkage therefore changes continuously, inducing an e.m.f. by Faraday's law." }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate the number of turns on the secondary coil.", value: Ns, wrong: [(Np * Vg) / Vt], explanation: t`$N_s = 600 \times \dfrac{132}{11} = ${Ns}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the current in the transmission line, in A, to three significant figures.", value: I, unit: "A", wrong: [P0 / Vg], explanation: t`$I = \dfrac{40 \times 10^{6}}{132 \times 10^{3}} = ${sfStr(I, 3)}\ \text{A}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the power lost in the line, in kW, to three significant figures.", value: loss / 1000, sf: 3, unit: "kW", wrong: [((P0 / Vg) ** 2 * R) / 1000], explanation: t`$I^2R = ${sfStr(I, 3)}^2 \times 5.5 = ${sciTex(loss, 3)}\ \text{W} = ${sfStr(loss / 1000, 3)}\ \text{kW}$.` }),
        P.manual({ label: "(e)", marks: 3, stem: "Real transformers have energy losses. Name two of them and explain how one is reduced.", points: ["Eddy currents in the core (or hysteresis).", "Resistive heating of the windings (or flux leakage).", "Eddy currents reduced by laminating the core (thin insulated sheets increase the resistance of current paths) / windings: thick copper wire / hysteresis: soft iron."], modelAnswer: "Energy is lost through eddy currents in the core and through resistive heating of the windings. Eddy currents are reduced by laminating the core, building it from thin sheets insulated from each other so the induced currents meet a high resistance." }),
      ]),
      explanation: "Ns/Np = Vs/Vp; I = P/V; loss = I²R.",
      hints: ["Find the line current from P = VI."],
    });
    chk(Ns, 7200, 1e-9);
  }
});
