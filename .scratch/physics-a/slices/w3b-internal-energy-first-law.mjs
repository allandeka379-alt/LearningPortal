// W3b: aphys.thermal.internal-energy-first-law — internal energy, W = pΔV, ΔU = q + W (Cambridge convention: W done
// ON the system), gas processes, cycles and phase changes.
import { concept, P, t, DATA, chk, sfStr, dpStr, sciTex, pctUnc, table } from "../lib.mjs";

const { R } = DATA;

concept("aphys.thermal.internal-energy-first-law", { file: "thermal/internal-energy-first-law", keyPrefix: "thermal.internal-energy-first-law" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is the best definition of the internal energy of a system?",
    options: [
      ["The sum of the random kinetic and potential energies of its molecules", "Correct: both forms, summed over all the molecules."],
      ["The total kinetic energy of the system moving as a whole", "Bulk motion is not internal energy; the molecular motion must be random."],
      ["The energy supplied to the system by heating", "Heating is a transfer of energy, not the energy a system contains."],
      ["The mean kinetic energy of one molecule of the system", "Internal energy is a total over all molecules, including potential energy."],
    ],
    answer: "A",
    explanation: "Internal energy = Σ(random kinetic energy + potential energy) of the molecules.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In the first law of thermodynamics written as ΔU = q + W, what does W represent?",
    options: [
      ["The work done on the system", "Correct: in this (Cambridge) convention W is positive when the gas is compressed."],
      ["The work done by the system", "That is the other convention, ΔQ = ΔU + W."],
      ["The weight of the gas", "W here is work, not weight."],
      ["The energy lost to the surroundings by heating", "Energy transferred by heating is q, with q negative for a loss."],
    ],
    answer: "A",
    explanation: "ΔU = q + W: q is energy supplied to the system by heating, W is work done on it.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Ice at 0 °C melts to water at 0 °C. What happens to the internal energy of the ice and why?",
    options: [
      ["It increases, because the potential energy of the molecules increases.", "Correct: kinetic energy is unchanged at constant temperature."],
      ["It is unchanged, because the temperature is unchanged.", "Temperature reflects kinetic energy only; potential energy changes in melting."],
      ["It increases, because the mean kinetic energy of the molecules increases.", "Constant temperature means constant mean kinetic energy."],
      ["It decreases, because the molecules move closer together in water.", "Bonds are broken in melting, so the potential energy rises (becomes less negative)."],
    ],
    answer: "A",
    explanation: "Melting supplies latent heat that increases molecular potential energy at constant temperature.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A fixed mass of ideal gas is compressed quickly so that no energy is transferred by heating. Which describes the changes?",
    options: [
      ["q = 0, W positive, ΔU positive, temperature rises", "Correct: work done on the gas increases its internal energy."],
      ["q = 0, W negative, ΔU negative, temperature falls", "That is a rapid expansion."],
      ["q positive, W = 0, ΔU positive, temperature rises", "No heating occurs, and work is done because the volume changes."],
      ["q = 0, W positive, ΔU = 0, temperature constant", "With q = 0, ΔU = W, which is positive."],
    ],
    answer: "A",
    explanation: "Adiabatic compression: ΔU = 0 + W > 0, and for an ideal gas U ∝ T, so T rises (the warm bicycle pump).",
    hints: ["Compression means work is done ON the gas."],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "An ideal gas expands isothermally. Which statement is correct?",
    options: [
      ["Energy is supplied by heating equal to the work done by the gas.", "Correct: ΔU = 0, so q = −W, with W (on the gas) negative."],
      ["No energy is transferred because the temperature does not change.", "Energy is transferred both by heating and by work; they balance."],
      ["The internal energy increases by the work done by the gas.", "Isothermal for an ideal gas means ΔU = 0."],
      ["The gas loses energy by heating equal to the work it does.", "The gas must gain energy by heating to keep its temperature up while doing work."],
    ],
    answer: "A",
    explanation: "U depends only on T for an ideal gas, so ΔU = 0 and q = −W = work done by the gas.",
    hints: ["What is ΔU for an ideal gas at constant temperature?"],
  });
  {
    const p = 2.0e5, V1 = 1.2e-3, V2 = 3.0e-3;
    const W = p * (V2 - V1);
    b.mcq({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: t`A gas expands from $1.2\ \text{L}$ to $3.0\ \text{L}$ at a constant pressure of $2.0 \times 10^{5}\ \text{Pa}$. How much work does the gas do?`,
      options: [
        [`${sfStr(W, 2)} J`, "Correct: pΔV with ΔV = 1.8 × 10⁻³ m³."],
        [`${sfStr(p * (V2 - V1) * 1000, 2)} J`, "This treats litres as cubic metres; 1 L = 10⁻³ m³."],
        [`${sfStr(p * V2, 2)} J`, "This uses the final volume instead of the change in volume."],
        [`${sfStr(p * (V2 + V1), 2)} J`, "Work depends on the change in volume, not the sum."],
      ],
      answer: "A",
      explanation: t`$W = p\Delta V = 2.0 \times 10^{5} \times 1.8 \times 10^{-3} = ${sfStr(W, 2)}\ \text{J}$.`,
    });
  }
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A gas is taken round a complete cycle and returns to its initial state. During the cycle the gas does a net 120 J of work on its surroundings. What is the net energy supplied to the gas by heating?",
    options: [
      ["+120 J", "Correct: ΔU = 0 over a cycle, so q = −W = −(−120) = +120 J."],
      ["−120 J", "Net work done ON the gas is −120 J; q has the opposite sign."],
      ["0 J", "ΔU is zero over a cycle, not q."],
      ["+240 J", "There is no doubling: q + W = 0."],
    ],
    answer: "A",
    explanation: "Over a cycle ΔU = 0, so q = −W. W (on the gas) = −120 J, so q = +120 J.",
    hints: ["Internal energy is a function of state."],
  });
  {
    const q = 650, p = 1.6e5, dV = 2.0e-3;
    const W = -p * dV;
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, daily: true,
      stem: t`A gas is supplied with $650\ \text{J}$ by heating and expands by $2.0 \times 10^{-3}\ \text{m}^3$ at a constant pressure of $1.6 \times 10^{5}\ \text{Pa}$. Calculate the increase in its internal energy, in J.`,
      value: q + W, unit: "J", wrong: [q - W, q],
      explanation: t`$W = -p\Delta V = -1.6 \times 10^{5} \times 2.0 \times 10^{-3} = ${W}\ \text{J}$; $\Delta U = q + W = 650 - ${-W} = ${q + W}\ \text{J}$. Adding the work done by the gas would give ${q - W} J.`,
    });
  }
  {
    // compression with cooling
    const W = 480, q = -310;
    b.num({
      d: 2, skill: "APPLICATION",
      stem: t`$480\ \text{J}$ of work is done on a gas while it loses $310\ \text{J}$ to its surroundings by heating. Calculate the change in its internal energy, in J (positive for an increase).`,
      value: q + W, unit: "J", wrong: [W - q, -(q + W)],
      explanation: t`$\Delta U = q + W = -310 + 480 = +${q + W}\ \text{J}$: the internal energy increases.`,
    });
  }
  {
    // n moles ideal gas, constant pressure expansion: work = nRΔT
    const n = 0.25, T1 = 290, T2 = 410;
    const W = n * R * (T2 - T1);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`$0.25\ \text{mol}$ of an ideal gas is heated at constant pressure from $290\ \text{K}$ to $410\ \text{K}$. Calculate the work done by the gas, in J, to three significant figures. ($R = 8.31\ \text{J K}^{-1}\ \text{mol}^{-1}$)`,
      value: W, unit: "J", wrong: [n * R * T2, R * (T2 - T1)],
      explanation: t`1. At constant pressure $pV = nRT$ gives $p\Delta V = nR\Delta T$.
2. $W_{\text{by}} = 0.25 \times 8.31 \times (410 - 290) = ${sfStr(W, 3)}\ \text{J}$.`,
      hints: ["pΔV = nRΔT when p is constant."],
    });
  }
  {
    // internal energy of monatomic gas change: ΔU = 3/2 nRΔT ; heat needed at constant pressure
    const n = 0.40, dT = 75;
    const dU = 1.5 * n * R * dT, Wby = n * R * dT, q = dU + Wby;
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`The internal energy of a monatomic ideal gas is $U = \tfrac{3}{2}nRT$. $0.40\ \text{mol}$ of such a gas is heated at constant pressure so that its temperature rises by $75\ \text{K}$. Calculate the energy that must be supplied by heating, in J, to three significant figures. ($R = 8.31\ \text{J K}^{-1}\ \text{mol}^{-1}$)`,
      value: q, unit: "J", wrong: [dU, dU - Wby],
      explanation: t`1. $\Delta U = \tfrac{3}{2}nR\Delta T = 1.5 \times 0.40 \times 8.31 \times 75 = ${sfStr(dU, 3)}\ \text{J}$.
2. Work done on the gas: $W = -p\Delta V = -nR\Delta T = -${sfStr(Wby, 3)}\ \text{J}$.
3. $q = \Delta U - W = ${sfStr(dU, 3)} + ${sfStr(Wby, 3)} = ${sfStr(q, 3)}\ \text{J}$. At constant volume only ${sfStr(dU, 3)} J would be needed.`,
      hints: ["Find ΔU from U = (3/2)nRT.", "Then rearrange ΔU = q + W."],
    });
  }
  {
    // phase change: evaporating 2.0 g ethanol
    const m = 2.0e-3, L = 8.5e5, p = 1.01e5, Vg = 1.20e-3, Vl = 2.5e-6;
    const q = m * L, W = -p * (Vg - Vl);
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`$2.0\ \text{g}$ of liquid ethanol at its boiling point is vaporised at a pressure of $1.01 \times 10^{5}\ \text{Pa}$. Its volume increases from $2.5 \times 10^{-6}\ \text{m}^3$ to $1.20 \times 10^{-3}\ \text{m}^3$. The specific latent heat of vaporisation of ethanol is $8.5 \times 10^{5}\ \text{J kg}^{-1}$. Calculate the increase in internal energy, in J, to three significant figures.`,
      value: q + W, unit: "J", wrong: [q - W, q],
      explanation: t`1. $q = mL = 2.0 \times 10^{-3} \times 8.5 \times 10^{5} = ${sfStr(q, 3)}\ \text{J}$.
2. $W = -p\Delta V = -1.01 \times 10^{5} \times (1.20 \times 10^{-3} - 2.5 \times 10^{-6}) = ${sfStr(W, 3)}\ \text{J}$.
3. $\Delta U = q + W = ${sfStr(q + W, 3)}\ \text{J}$ (all of it potential energy, since the temperature is constant).`,
      hints: ["The latent heat is q.", "Expansion means negative work done on the substance."],
    });
  }
  {
    // uncertainty in work from p and ΔV
    const p = 1.20e5, dp = 0.02e5, V1 = 240, V2 = 365, dVr = 2; // cm³ readings ±2
    const W = p * (V2 - V1) * 1e-6;
    const pct = pctUnc(dp, p) + pctUnc(2 * dVr, V2 - V1);
    b.num({
      d: 4, skill: "EVALUATION", calculator: true,
      stem: t`A gas syringe reading increases from $240\ \text{cm}^3$ to $365\ \text{cm}^3$ (each reading $\pm 2\ \text{cm}^3$) at a constant pressure of $(1.20 \pm 0.02) \times 10^{5}\ \text{Pa}$. Calculate the percentage uncertainty in the work done by the gas, to two significant figures.`,
      value: pct, sf: 2, unit: "%", wrong: [pctUnc(dp, p) + pctUnc(dVr, V2 - V1), pctUnc(dp, p) + pctUnc(2 * dVr, V2)],
      explanation: t`1. $W = p\Delta V = 1.20 \times 10^{5} \times 125 \times 10^{-6} = ${sfStr(W, 3)}\ \text{J}$.
2. $\Delta V$ is a difference: uncertainty $2 + 2 = 4\ \text{cm}^3$, or $\dfrac{4}{125} \times 100 = ${sfStr(pctUnc(4, 125), 2)}\%$.
3. Pressure: $\dfrac{0.02}{1.20} \times 100 = ${sfStr(pctUnc(dp, p), 2)}\%$. Total $${sfStr(pct, 2)}\%$.`,
      hints: ["Uncertainty in a difference: add the absolute uncertainties."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The internal energy of a fixed mass of ideal gas depends only on its temperature.",
    answer: true,
    explanation: "True. An ideal gas has no intermolecular forces, so its internal energy is all random kinetic energy, which depends only on T.",
  });
  b.match({
    d: 3, skill: "ANALYSIS",
    stem: "Match each process of a fixed mass of ideal gas with the correct statement.",
    pairs: [
      ["Heated at constant volume", "W = 0, so ΔU = q"],
      ["Rapid (adiabatic) expansion", "q = 0, so ΔU = W, which is negative"],
      ["Isothermal compression", "ΔU = 0, so q = −W, which is negative"],
      ["Taken round a complete cycle", "ΔU = 0 for the whole cycle"],
    ],
    explanation: "Apply ΔU = q + W with the condition each process imposes.",
    hints: ["Identify which term is zero in each process."],
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the explanation of why the air in a bicycle pump warms when the handle is pushed in quickly.",
    template: "Work is done {{blank:a}} the air. There is little time for energy to be transferred by {{blank:b}}, so the internal energy of the air {{blank:c}} and its temperature rises.",
    blanks: [
      { id: "a", accepted: ["on"], choices: ["on", "by"] },
      { id: "b", accepted: ["heating"], choices: ["heating", "work"] },
      { id: "c", accepted: ["increases"], choices: ["increases", "decreases", "stays the same"] },
    ],
    explanation: "q ≈ 0 and W > 0, so ΔU > 0.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: t`Show that the work done by a gas expanding at constant pressure $p$ is $p\Delta V$.`,
    points: [
      "Force on the piston F = pA (A = piston area).",
      "Work done = F × distance moved = pAΔx.",
      "AΔx = ΔV, so work = pΔV.",
    ],
    modelAnswer: "The gas pushes on a piston of area A with force F = pA. When the piston moves out a distance Δx at constant pressure, the work done by the gas is FΔx = pAΔx. Since AΔx is the increase in volume ΔV, the work done is pΔV.",
    explanation: "F = pA and W = FΔx.",
    hints: ["Start from W = force × distance."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Gas escaping from a pressurised can makes the can feel cold. Use the first law of thermodynamics to explain why.",
    points: [
      "The escaping gas expands rapidly, doing work on the atmosphere, so the work done on it, W, is negative.",
      "The expansion is so quick that there is little transfer by heating (q ≈ 0).",
      "So ΔU = q + W is negative: the internal energy (mean kinetic energy of the molecules) falls and the gas and can cool.",
    ],
    modelAnswer: "The gas expands quickly against the atmosphere, so it does work and the work done on it is negative. There is no time for significant heating from the surroundings, so q ≈ 0. Then ΔU = q + W is negative: the internal energy, and with it the mean kinetic energy and temperature of the gas, falls, cooling the can.",
    explanation: "Adiabatic expansion: ΔU = W < 0.",
    hints: ["Which term is about zero for a rapid process?"],
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 2,
    stem: "Explain why the internal energy of an ideal gas is entirely kinetic energy.",
    points: [
      "An ideal gas has no intermolecular forces (except during collisions).",
      "So the molecules have no potential energy: internal energy is the sum of their random kinetic energies only.",
    ],
    modelAnswer: "In an ideal gas there are no forces between molecules except during collisions, so there is no intermolecular potential energy. The internal energy is therefore just the total random kinetic energy of the molecules.",
    explanation: "No forces → no potential energy.",
  });

  // Practice structured: a gas cycle (14 marks)
  {
    const pA = 1.2e5, pB = 2.4e5, V1 = 1.5e-3, V2 = 4.0e-3;
    const Wexp = pB * (V2 - V1); // B->C expansion at high pressure
    const Wcomp = pA * (V2 - V1); // D->A compression at low pressure
    const Wnet = Wexp - Wcomp;
    const n = (pA * V1) / (R * 300);
    const TB = (pB * V1) / (n * R), TC = (pB * V2) / (n * R);
    b.struct({
      d: 5, skill: "ANALYSIS", calculator: true,
      stem: t`A fixed mass of ideal gas is taken round a cycle A → B → C → D → A:

${table(["State", t`$p\,/\,10^{5}\ \text{Pa}$`, t`$V\,/\,10^{-3}\ \text{m}^3$`], [["A", "1.2", "1.5"], ["B", "2.4", "1.5"], ["C", "2.4", "4.0"], ["D", "1.2", "4.0"]])}

A → B and C → D are at constant volume; B → C and D → A are at constant pressure. The temperature at A is $300\ \text{K}$.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the amount of gas, in mol, to two significant figures.", value: n, sf: 2, unit: "mol", wrong: [(pA * V1) / 300], explanation: t`$n = \dfrac{pV}{RT} = \dfrac{1.2 \times 10^{5} \times 1.5 \times 10^{-3}}{8.31 \times 300} = ${sfStr(n, 2)}\ \text{mol}$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the temperature at C, in K.", value: TC, unit: "K", wrong: [TB], explanation: t`$T \propto pV$: $T_C = 300 \times \dfrac{2.4 \times 4.0}{1.2 \times 1.5} = ${sfStr(TC, 3)}\ \text{K}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the work done by the gas from B to C, in J.", value: Wexp, unit: "J", wrong: [pB * V2], explanation: t`$W = p\Delta V = 2.4 \times 10^{5} \times 2.5 \times 10^{-3} = ${Wexp}\ \text{J}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the net work done by the gas in one cycle, in J.", value: Wnet, unit: "J", wrong: [Wexp + Wcomp], explanation: t`Work done by gas B → C is $${Wexp}\ \text{J}$; work done on gas D → A is $${Wcomp}\ \text{J}$; net $= ${Wexp} - ${Wcomp} = ${Wnet}\ \text{J}$ (the area enclosed by the cycle).` }),
        P.num({ label: "(e)", marks: 2, stem: "State the net energy supplied to the gas by heating in one cycle, in J.", value: Wnet, unit: "J", wrong: [0], explanation: t`$\Delta U = 0$ over a cycle, so $q = -W_{\text{on}} = +${Wnet}\ \text{J}$.` }),
        P.manual({ label: "(f)", marks: 2, stem: "For the change A → B, state the values or signs of W and ΔU and hence of q.", points: ["W = 0 (no change of volume).", "Temperature rises (p increases at constant V), so ΔU > 0 and q = ΔU > 0: energy is supplied by heating."], modelAnswer: "From A to B the volume is constant, so W = 0. The pressure, and so the temperature, rise, so ΔU is positive; therefore q = ΔU is positive: the gas is heated." }),
        P.manual({ label: "(g)", marks: 2, stem: "Explain why the internal energy of the gas returns to its original value after one cycle.", points: ["Internal energy is a function of state (depends only on p, V, T).", "The gas returns to state A with the same temperature, and for an ideal gas U depends only on T, so ΔU = 0."], modelAnswer: "Internal energy depends only on the state of the gas, and for an ideal gas only on its temperature. After one cycle the gas is back in state A at 300 K, so its internal energy has its original value." }),
      ],
      explanation: "Net work = area enclosed; over a cycle ΔU = 0 so q = −W.",
      hints: ["Work is done only in the constant-pressure stages.", "T ∝ pV for a fixed mass of ideal gas."],
    });
    chk(TC, 1600, 1e-6);
  }
  // Practice structured: steam in a piston (8 marks)
  {
    const p = 2.0e5, dV = 4.5e-4, q = 520;
    const W = -p * dV, dU = q + W;
    b.struct({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Gas in a cylinder is heated by $520\ \text{J}$ and pushes a piston outwards at a constant pressure of $2.0 \times 10^{5}\ \text{Pa}$. The volume of the gas increases by $4.5 \times 10^{-4}\ \text{m}^3$.`,
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "State the first law of thermodynamics, defining each symbol.", points: ["ΔU = q + W, where ΔU is the increase in internal energy of the system…", "…q is the energy supplied to the system by heating and W is the work done on the system."], modelAnswer: "ΔU = q + W: the increase in internal energy of a system equals the energy supplied to it by heating plus the work done on it." }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the work done on the gas, in J (include the sign).", value: W, unit: "J", wrong: [-W], explanation: t`$W = -p\Delta V = -2.0 \times 10^{5} \times 4.5 \times 10^{-4} = ${W}\ \text{J}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the change in internal energy of the gas, in J.", value: dU, unit: "J", wrong: [q - W], explanation: t`$\Delta U = 520 + (${W}) = ${dU}\ \text{J}$.` }),
        P.manual({ label: "(d)", marks: 2, stem: "State and explain what happens to the temperature of the gas, assuming it is ideal.", points: ["ΔU is positive, so the internal energy increases.", "For an ideal gas U is all random kinetic energy, so the mean kinetic energy, and the temperature, rise."], modelAnswer: "ΔU is positive, so the internal energy rises. For an ideal gas this is all random kinetic energy, so the mean kinetic energy of the molecules, and hence the temperature, increases." }),
      ],
      explanation: "W = −pΔV for an expansion; ΔU = q + W.",
      hints: ["The gas expands, so work done ON it is negative."],
    });
  }

  b.card("DEFINITION", "**Internal energy**", "The sum of the random kinetic and potential energies of the molecules of a system; a function of its state.");
  b.card("FORMULA", "First law", t`$\Delta U = q + W$: $q$ = energy supplied by heating, $W$ = work done ON the system`);
  b.card("FORMULA", "Work done by a gas at constant pressure", t`$W_{\text{by}} = p\Delta V$ (area under the $p$-$V$ graph); $W_{\text{on}} = -p\Delta V$`);
  b.card("CONCEPT", "Ideal gas internal energy", "No intermolecular forces → no potential energy → U is all random kinetic energy and depends only on T.");
  b.card("CONCEPT", "Phase change and internal energy", "Melting or boiling: kinetic energy constant (constant T); potential energy, and so U, increases.");
  b.card("CONCEPT", "Adiabatic changes", "q = 0: compression → W > 0 → warms (bicycle pump); expansion → W < 0 → cools (aerosol).");
  b.card("CONCEPT", "Isothermal change of an ideal gas", "ΔU = 0, so q = −W: energy supplied by heating equals work done by the gas.");
  b.card("CONCEPT", "Cycle", "Returns to the same state: ΔU = 0, so net heat in = net work done by the gas = enclosed area on p-V.");
  b.card("FACT", "Other sign convention", "Some books use ΔQ = ΔU + W with W = work done BY the gas. Same law; state your convention.");
});
