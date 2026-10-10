// W3b: aphys.gases.kinetic-theory — assumptions, pressure from collisions, pV = ⅓Nm⟨c²⟩ derivation, mean-square and
// r.m.s. speeds, ½m⟨c²⟩ = (3/2)kT, speeds of different gases.
import { concept, P, t, DATA, chk, sfStr, dpStr, sciTex, toK, table, mean } from "../lib.mjs";

const { k, NA, R } = DATA;
const crms = (T, M) => Math.sqrt((3 * k * T) / (M / NA));

concept("aphys.gases.kinetic-theory", { file: "gases/kinetic-theory", keyPrefix: "gases.kinetic-theory" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is an assumption of the kinetic theory of an ideal gas?",
    options: [
      ["Collisions between molecules and with the walls are perfectly elastic.", "Correct: no kinetic energy is lost in collisions."],
      ["The molecules all move with the same speed.", "The molecules have a wide range of speeds."],
      ["The molecules attract each other weakly at all separations.", "There are no intermolecular forces except during collisions."],
      ["The duration of a collision is long compared with the time between collisions.", "Collision time is assumed negligible."],
    ],
    answer: "A",
    explanation: "Assumptions: random motion, negligible volume, no forces except in collisions, elastic collisions, negligible collision time.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A molecule of mass m moving with velocity component cₓ perpendicular to a wall rebounds elastically. What is the magnitude of the change in its momentum?",
    options: [
      [t`$2mc_x$`, "Correct: from +mcₓ to −mcₓ."],
      [t`$mc_x$`, "The molecule reverses, so the change is twice its momentum."],
      [t`$\tfrac{1}{2}mc_x^2$`, "That is a kinetic energy, not a momentum change."],
      ["zero", "Momentum is a vector: reversing it is a change of 2mcₓ."],
    ],
    answer: "A",
    explanation: "Δp = mcₓ − (−mcₓ) = 2mcₓ in magnitude.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The thermodynamic temperature of an ideal gas is doubled. By what factor does the r.m.s. speed of its molecules increase?",
    options: [
      [t`$\sqrt{2}$`, "Correct: c_rms ∝ √T."],
      ["2", "Doubling T doubles the mean kinetic energy, not the speed."],
      ["4", "Speed is proportional to √T, not T²."],
      [t`$\tfrac{1}{\sqrt{2}}$`, "Heating makes the molecules faster, not slower."],
    ],
    answer: "A",
    explanation: "½m⟨c²⟩ = (3/2)kT, so ⟨c²⟩ ∝ T and c_rms ∝ √T.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Oxygen (molar mass 32 g mol⁻¹) and hydrogen (2 g mol⁻¹) are at the same temperature. What is the ratio (r.m.s. speed of hydrogen) ÷ (r.m.s. speed of oxygen)?",
    options: [
      ["4", "Correct: c_rms ∝ 1/√m, and √(32/2) = 4."],
      ["16", "This is the ratio of masses; the speeds go as the square root."],
      ["1", "Equal temperatures give equal mean kinetic energies, not equal speeds."],
      ["0.25", "The lighter hydrogen molecules move faster, not slower."],
    ],
    answer: "A",
    explanation: "Same T → same ½m⟨c²⟩, so c_rms ∝ 1/√m: √(32/2) = 4.",
    hints: ["Same temperature means same mean kinetic energy."],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "In deriving pV = ⅓Nm⟨c²⟩, why is ⟨cₓ²⟩ replaced by ⅓⟨c²⟩?",
    options: [
      ["Random motion: the three components have equal mean squares.", "Correct: c² = cₓ² + c_y² + c_z² with equal averages."],
      ["Only a third of the molecules move towards any one wall.", "The factor comes from components of velocity, not from counting molecules."],
      ["A cube has three pairs of walls that share the force.", "Pressure is the same on each wall; the factor is from the velocity components."],
      ["A third of each collision's kinetic energy is lost.", "Collisions are elastic: no energy is lost."],
    ],
    answer: "A",
    explanation: "⟨c²⟩ = ⟨cₓ²⟩ + ⟨c_y²⟩ + ⟨c_z²⟩ = 3⟨cₓ²⟩ for random motion.",
    hints: ["Write c² in terms of its components."],
  });
  {
    const p = 1.2e5, rho = 0.16;
    const c = Math.sqrt((3 * p) / rho);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Helium has a density of $0.16\ \text{kg m}^{-3}$ at a pressure of $1.2 \times 10^{5}\ \text{Pa}$. What is the r.m.s. speed of its atoms?`,
      options: [
        [t`$${sfStr(c, 3)}\ \text{m s}^{-1}$`, "Correct: c_rms = √(3p/ρ)."],
        [t`$${sfStr(Math.sqrt(p / rho), 3)}\ \text{m s}^{-1}$`, "The factor 3 from p = ⅓ρ⟨c²⟩ is missing."],
        [t`$${sfStr((3 * p) / rho, 3)}\ \text{m s}^{-1}$`, "This is the mean-square speed; take the square root."],
        [t`$${sfStr(Math.sqrt(p / (3 * rho)), 3)}\ \text{m s}^{-1}$`, "This divides by 3 instead of multiplying."],
      ],
      answer: "A",
      explanation: t`$\langle c^2\rangle = \dfrac{3p}{\rho} = \dfrac{3 \times 1.2 \times 10^{5}}{0.16}$, so $c_{\text{r.m.s.}} = ${sfStr(c, 3)}\ \text{m s}^{-1}$.`,
      hints: ["p = ⅓ρ⟨c²⟩."],
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A gas is compressed at constant temperature. Why does its pressure increase?",
    options: [
      ["Molecules hit the walls more often: more per unit volume.", "Correct: same speeds, more frequent impacts."],
      ["Molecules hit the walls harder because they move faster.", "At constant temperature the mean speed is unchanged."],
      ["The molecules are squeezed and repel each other more strongly.", "An ideal gas has no intermolecular forces."],
      ["The molecules themselves become larger when compressed.", "Molecular size does not change."],
    ],
    answer: "A",
    explanation: "Constant T → same mean kinetic energy; a smaller volume means more impacts per second per unit area.",
  });
  {
    const T = toK(17), M = 0.032;
    const c = crms(T, M);
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, daily: true,
      stem: t`Calculate the r.m.s. speed of oxygen molecules (molar mass $0.032\ \text{kg mol}^{-1}$) at $17\ ^\circ\text{C}$, in $\text{m s}^{-1}$, to three significant figures.`,
      value: c, unit: "m/s", wrong: [crms(17, M), Math.sqrt((3 * k * T) / M)],
      explanation: t`$m = \dfrac{0.032}{6.02 \times 10^{23}} = ${sciTex(M / NA)}\ \text{kg}$; $c_{\text{r.m.s.}} = \sqrt{\dfrac{3 \times 1.38 \times 10^{-23} \times 290.15}{${sciTex(M / NA)}}} = ${sfStr(c, 3)}\ \text{m s}^{-1}$.`,
    });
  }
  {
    const T = toK(-23);
    b.num({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: t`Calculate the mean translational kinetic energy of a molecule of an ideal gas at $-23\ ^\circ\text{C}$, in J, to three significant figures.`,
      value: 1.5 * k * T, unit: "J", wrong: [1.5 * k * -23, k * T],
      explanation: t`$T = 250.15\ \text{K}$; $\tfrac{3}{2}kT = 1.5 \times 1.38 \times 10^{-23} \times 250.15 = ${sciTex(1.5 * k * T)}\ \text{J}$.`,
    });
  }
  {
    const speeds = [210, 340, 450, 520, 680, 790];
    const ms = mean(speeds.map((v) => v * v));
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: `Six gas molecules have speeds of ${speeds.join(", ")} m s⁻¹. Calculate their r.m.s. speed, in m s⁻¹, to three significant figures.`,
      value: Math.sqrt(ms), unit: "m/s", wrong: [mean(speeds), ms],
      explanation: t`1. Mean-square speed $= \dfrac{${speeds.map((v) => `${v}^2`).join(" + ")}}{6} = ${sciTex(ms)}\ \text{m}^2\ \text{s}^{-2}$.
2. r.m.s. speed $= \sqrt{${sciTex(ms)}} = ${sfStr(Math.sqrt(ms), 3)}\ \text{m s}^{-1}$.
3. The mean speed is only $${sfStr(mean(speeds), 3)}\ \text{m s}^{-1}$: squaring weights the fast molecules more.`,
      hints: ["Square each speed, average the squares, then take the square root."],
    });
  }
  {
    // temperature at which crms reaches a value
    const c = 1500, M = 0.004;
    const T = ((M / NA) * c * c) / (3 * k);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`At what temperature, in K, is the r.m.s. speed of helium atoms (molar mass $0.004\ \text{kg mol}^{-1}$) equal to $1500\ \text{m s}^{-1}$? Give your answer to three significant figures.`,
      value: T, unit: "K", wrong: [(M * c * c) / (3 * k), ((M / NA) * c) / (3 * k)],
      explanation: t`1. $\tfrac{1}{2}m\langle c^2\rangle = \tfrac{3}{2}kT$ gives $T = \dfrac{mc_{\text{r.m.s.}}^2}{3k}$.
2. $m = \dfrac{0.004}{6.02 \times 10^{23}} = ${sciTex(M / NA)}\ \text{kg}$.
3. $T = \dfrac{${sciTex(M / NA)} \times 1500^2}{3 \times 1.38 \times 10^{-23}} = ${sfStr(T, 3)}\ \text{K}$.`,
      hints: ["Rearrange ½m⟨c²⟩ = (3/2)kT for T."],
    });
  }
  {
    // total kinetic energy of gas in a room
    const p = 1.01e5, V = 75;
    const Ek = 1.5 * p * V;
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A classroom has a volume of $75\ \text{m}^3$ and the air pressure is $1.01 \times 10^{5}\ \text{Pa}$. Treating the air as an ideal gas, show that the total translational kinetic energy of the air molecules is $\tfrac{3}{2}pV$, and calculate it, in J, to three significant figures.`,
      value: Ek, unit: "J", wrong: [p * V, (p * V) / 3],
      explanation: t`1. Total kinetic energy $= N \times \tfrac{1}{2}m\langle c^2\rangle = N \times \tfrac{3}{2}kT = \tfrac{3}{2}NkT$.
2. $NkT = pV$, so total $= \tfrac{3}{2}pV$, independent of the temperature for a given $p$ and $V$.
3. $\tfrac{3}{2} \times 1.01 \times 10^{5} \times 75 = ${sciTex(Ek)}\ \text{J}$.`,
      hints: ["Multiply the mean kinetic energy per molecule by N.", "Use pV = NkT."],
    });
  }
  {
    // ratio of rms speeds at two temperatures for a gas: and uncertainty with T
    const T1 = toK(20), T2 = toK(150);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`The temperature of a gas rises from $20\ ^\circ\text{C}$ to $150\ ^\circ\text{C}$. Calculate the ratio (new r.m.s. speed) ÷ (original r.m.s. speed), to three significant figures.`,
      value: Math.sqrt(T2 / T1), wrong: [T2 / T1, Math.sqrt(150 / 20)],
      explanation: t`$\dfrac{c_2}{c_1} = \sqrt{\dfrac{T_2}{T_1}} = \sqrt{\dfrac{423.15}{293.15}} = ${sfStr(Math.sqrt(T2 / T1), 3)}$.`,
      hints: ["c_rms ∝ √T, with T in kelvin."],
    });
  }
  {
    // uncertainty in c_rms from p and rho
    const pp = 2.0, rp = 4.0;
    b.num({
      d: 4, skill: "EVALUATION",
      stem: t`The r.m.s. speed of a gas is found from $c_{\text{r.m.s.}} = \sqrt{3p/\rho}$. The pressure is measured with an uncertainty of 2.0% and the density with an uncertainty of 4.0%. Calculate the percentage uncertainty in $c_{\text{r.m.s.}}$.`,
      value: 0.5 * (pp + rp), dp: 1, unit: "%", wrong: [pp + rp, rp - pp],
      explanation: t`The quantity under the square root has uncertainty $2.0 + 4.0 = 6.0\%$; a square root halves the percentage uncertainty, giving $${dpStr(0.5 * (pp + rp), 1)}\%$.`,
      hints: ["A power of ½ multiplies the percentage uncertainty by ½."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "At the same temperature, the mean translational kinetic energy of a helium atom equals that of a nitrogen molecule.",
    answer: true,
    explanation: "True. ½m⟨c²⟩ = (3/2)kT depends only on T, not on the gas; the lighter helium atoms move faster.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each assumption of the kinetic theory with the step of the derivation (or result) that depends on it.",
    pairs: [
      ["Collisions with the wall are elastic", "The molecule rebounds with speed cₓ, so Δp = 2mcₓ"],
      ["Motion is random", "⟨cₓ²⟩ = ⅓⟨c²⟩"],
      ["Molecular volume is negligible", "The distance travelled between hits on a wall is 2L"],
      ["No intermolecular forces", "Molecules travel in straight lines at constant speed between collisions"],
    ],
    explanation: "Each assumption justifies one simplification in the derivation.",
    hints: ["Think about which step would change if the assumption failed."],
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the equations of kinetic theory.",
    template: "pV = {{blank:a}} Nm⟨c²⟩, and the mean translational kinetic energy of a molecule is ½m⟨c²⟩ = {{blank:b}} kT.",
    blanks: [
      { id: "a", accepted: ["1/3"], choices: ["1/3", "1/2", "3/2", "2/3"] },
      { id: "b", accepted: ["3/2"], choices: ["3/2", "1/2", "1/3", "2/3"] },
    ],
    explanation: "pV = ⅓Nm⟨c²⟩; ½m⟨c²⟩ = (3/2)kT.",
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 6,
    stem: t`Derive the equation $pV = \tfrac{1}{3}Nm\langle c^2\rangle$ for $N$ molecules, each of mass $m$, in a cube of side $L$.`,
    points: [
      "A molecule with velocity component cₓ hits a wall perpendicular to x and rebounds elastically: change in momentum 2mcₓ.",
      "Time between successive collisions with the same wall = 2L/cₓ.",
      "Mean force from one molecule = rate of change of momentum = 2mcₓ ÷ (2L/cₓ) = mcₓ²/L.",
      "Total force from N molecules = Nm⟨cₓ²⟩/L; pressure = force/L² = Nm⟨cₓ²⟩/L³ = Nm⟨cₓ²⟩/V.",
      "c² = cₓ² + c_y² + c_z², and for random motion ⟨cₓ²⟩ = ⟨c_y²⟩ = ⟨c_z²⟩.",
      "So ⟨cₓ²⟩ = ⅓⟨c²⟩, giving pV = ⅓Nm⟨c²⟩.",
    ],
    modelAnswer: "A molecule with velocity component cₓ towards a wall rebounds elastically with −cₓ, so its momentum changes by 2mcₓ. It returns to the same wall after travelling 2L, taking 2L/cₓ. The mean force it exerts is the rate of change of momentum, 2mcₓ/(2L/cₓ) = mcₓ²/L. For N molecules the total force is Nm⟨cₓ²⟩/L, and the pressure is this divided by the area L², i.e. Nm⟨cₓ²⟩/V. Since c² = cₓ² + c_y² + c_z² and the motion is random, ⟨cₓ²⟩ = ⅓⟨c²⟩, so pV = ⅓Nm⟨c²⟩.",
    explanation: "Momentum change, time between collisions, force, pressure, three dimensions.",
    hints: ["Start with one molecule moving along x.", "Use Newton's second law F = Δp/Δt."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: t`Show that the mean translational kinetic energy of a molecule of an ideal gas is $\tfrac{3}{2}kT$.`,
    points: [
      "pV = ⅓Nm⟨c²⟩ (kinetic theory) and pV = NkT (ideal gas equation).",
      "Equate: ⅓Nm⟨c²⟩ = NkT, so m⟨c²⟩ = 3kT.",
      "Multiply by ½: ½m⟨c²⟩ = (3/2)kT.",
    ],
    modelAnswer: "Kinetic theory gives pV = ⅓Nm⟨c²⟩ and the ideal gas equation gives pV = NkT. Equating them, ⅓Nm⟨c²⟩ = NkT, so m⟨c²⟩ = 3kT and ½m⟨c²⟩ = (3/2)kT.",
    explanation: "Equate the two expressions for pV.",
    hints: ["Two expressions for pV."],
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain, in terms of molecules, why the pressure of a gas in a sealed rigid container increases when the gas is heated.",
    points: [
      "Heating increases the mean kinetic energy (speed) of the molecules.",
      "Each collision with the wall involves a larger change of momentum.",
      "Collisions are also more frequent, so the rate of change of momentum, i.e. the force per unit area on the walls, increases.",
    ],
    modelAnswer: "Heating raises the mean kinetic energy, so the molecules move faster. Each impact on the wall changes the momentum of the molecule by more, and the molecules hit the walls more often. The rate of change of momentum at the walls, and so the force per unit area, increases.",
    explanation: "Harder and more frequent impacts.",
  });

  // Practice structured: Maxwell-type data (12 marks)
  {
    const speeds = [150, 350, 550, 750, 950];
    const counts = [12, 34, 30, 17, 7];
    const N = counts.reduce((s, x) => s + x, 0);
    const meanSp = speeds.reduce((s, v, i) => s + v * counts[i], 0) / N;
    const msq = speeds.reduce((s, v, i) => s + v * v * counts[i], 0) / N;
    const cr = Math.sqrt(msq);
    const M = 0.040;
    const T = ((M / NA) * msq) / (3 * k);
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A computer model of a gas of argon atoms (molar mass $0.040\ \text{kg mol}^{-1}$) sorts 100 atoms into speed groups:

${table([t`speed $/\ \text{m s}^{-1}$ (group centre)`, "number of atoms"], speeds.map((v, i) => [String(v), String(counts[i])]))}`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: t`Calculate the mean speed, in $\text{m s}^{-1}$, to three significant figures.`, value: meanSp, unit: "m/s", wrong: [mean(speeds)], explanation: t`$\dfrac{\sum nv}{N} = \dfrac{${speeds.map((v, i) => `${counts[i]} \\times ${v}`).join(" + ")}}{100} = ${sfStr(meanSp, 3)}\ \text{m s}^{-1}$.` }),
        P.num({ label: "(b)", marks: 3, stem: t`Calculate the r.m.s. speed, in $\text{m s}^{-1}$, to three significant figures.`, value: cr, unit: "m/s", wrong: [meanSp, msq], explanation: t`$\langle c^2\rangle = \dfrac{\sum nv^2}{N} = ${sciTex(msq)}\ \text{m}^2\ \text{s}^{-2}$; $c_{\text{r.m.s.}} = ${sfStr(cr, 3)}\ \text{m s}^{-1}$.` }),
        P.num({ label: "(c)", marks: 3, stem: "Calculate the temperature of the gas that this distribution represents, in K, to two significant figures.", value: T, sf: 2, unit: "K", wrong: [(M * msq) / (3 * k), ((M / NA) * meanSp * meanSp) / (3 * k)], explanation: t`$T = \dfrac{m\langle c^2\rangle}{3k} = \dfrac{${sciTex(M / NA)} \times ${sciTex(msq)}}{3 \times 1.38 \times 10^{-23}} = ${sfStr(T, 2)}\ \text{K}$.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain why the r.m.s. speed is greater than the mean speed.", points: ["The r.m.s. speed averages the squares of the speeds.", "Squaring gives extra weight to the faster molecules, so the r.m.s. value exceeds the mean (unless all speeds are equal)."], modelAnswer: "The r.m.s. speed is the square root of the mean of the squared speeds. Squaring gives more weight to the fast molecules, so it is larger than the simple mean whenever the speeds differ." }),
        P.manual({ label: "(e)", marks: 2, stem: "Describe how the distribution would change if the gas were heated, keeping the same number of molecules.", points: ["The peak moves to a higher speed and the mean and r.m.s. speeds increase (c_rms ∝ √T).", "The distribution spreads out and becomes flatter (more very fast molecules); the total number (area) is unchanged."], modelAnswer: "The most common speed and the mean and r.m.s. speeds increase, so the peak shifts to higher speeds; the distribution becomes broader and flatter with more fast molecules, while the total number of molecules stays the same." }),
      ],
      explanation: "⟨c²⟩ = Σnv²/N; T = m⟨c²⟩/(3k).",
      hints: ["Weight each speed by the number of molecules.", "Use ½m⟨c²⟩ = (3/2)kT."],
    });
  }
  // Practice structured: gas in a cylinder, combining equations (8 marks)
  {
    const V = 0.012, p = 2.4e5, T = toK(35), M = 0.044;
    const N = (p * V) / (k * T);
    const m = M / NA;
    const c = Math.sqrt((3 * p * V) / (N * m));
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A $0.012\ \text{m}^3$ container holds carbon dioxide (molar mass $0.044\ \text{kg mol}^{-1}$) at $2.4 \times 10^{5}\ \text{Pa}$ and $35\ ^\circ\text{C}$.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the number of molecules, to three significant figures.", value: N, wrong: [(p * V) / (R * T)], explanation: t`$N = \dfrac{pV}{kT} = \dfrac{2.4 \times 10^{5} \times 0.012}{1.38 \times 10^{-23} \times 308.15} = ${sciTex(N)}$.` }),
        P.num({ label: "(b)", marks: 3, stem: t`Use $pV = \tfrac{1}{3}Nm\langle c^2\rangle$ to calculate the r.m.s. speed, in $\text{m s}^{-1}$, to three significant figures.`, value: c, unit: "m/s", wrong: [Math.sqrt((p * V) / (N * m)), Math.sqrt((3 * p * V) / (N * M))], explanation: t`$m = ${sciTex(m)}\ \text{kg}$; $c_{\text{r.m.s.}} = \sqrt{\dfrac{3pV}{Nm}} = ${sfStr(c, 3)}\ \text{m s}^{-1}$.` }),
        P.num({ label: "(c)", marks: 1, stem: "Calculate the total translational kinetic energy of the molecules, in J, to three significant figures.", value: 1.5 * p * V, unit: "J", wrong: [p * V], explanation: t`$\tfrac{3}{2}pV = 1.5 \times 2.4 \times 10^{5} \times 0.012 = ${sfStr(1.5 * p * V, 3)}\ \text{J}$.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Suggest why carbon dioxide at this pressure may not behave exactly as an ideal gas.", points: ["Its molecules attract one another (intermolecular forces not negligible), especially as CO₂ is relatively easy to liquefy.", "At high pressure the molecules' own volume is a larger fraction of the container volume."], modelAnswer: "Carbon dioxide liquefies fairly easily, so attractions between its molecules are not negligible, and at 2.4 × 10⁵ Pa the volume of the molecules themselves is a slightly larger fraction of the container, so the ideal-gas assumptions are less accurate." }),
      ],
      explanation: "N = pV/kT; c_rms = √(3pV/Nm) = √(3kT/m).",
      hints: ["Find N from pV = NkT first."],
    });
    chk(c, crms(T, M), 1e-6);
  }

  b.card("CONCEPT", "Kinetic theory assumptions", "Random motion; negligible molecular volume; no forces except in collisions; elastic collisions; negligible collision time.");
  b.card("FORMULA", "Kinetic theory equation", t`$pV = \tfrac{1}{3}Nm\langle c^2\rangle$, or $p = \tfrac{1}{3}\rho\langle c^2\rangle$`);
  b.card("DEFINITION", "**Mean-square speed**", "⟨c²⟩ = (c₁² + c₂² + … + c_N²)/N; r.m.s. speed = √⟨c²⟩.");
  b.card("FORMULA", "Mean kinetic energy and temperature", t`$\tfrac{1}{2}m\langle c^2\rangle = \tfrac{3}{2}kT$`);
  b.card("FORMULA", "r.m.s. speed", t`$c_{\text{r.m.s.}} = \sqrt{\dfrac{3kT}{m}} = \sqrt{\dfrac{3RT}{M}}$`);
  b.card("CONCEPT", "Origin of gas pressure", "Molecules rebound from the walls: the rate of change of momentum per unit area is the pressure.");
  b.card("CONCEPT", "Why ⟨cₓ²⟩ = ⅓⟨c²⟩", "Random motion: no preferred direction, so the three components have equal mean squares.");
  b.card("CONCEPT", "Different gases at one temperature", "Same mean kinetic energy; c_rms ∝ 1/√m, so lighter molecules move faster.");
  b.card("FACT", "Total kinetic energy of an ideal gas", t`$\tfrac{3}{2}NkT = \tfrac{3}{2}nRT = \tfrac{3}{2}pV$`);
});
