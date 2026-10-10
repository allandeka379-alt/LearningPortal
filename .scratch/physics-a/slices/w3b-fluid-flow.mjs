// W3b: aphys.matter.fluid-flow (ZIMSEC only) — streamline and turbulent flow, ideal fluid, continuity equation,
// Bernoulli's equation, Venturi meter, aerofoil, atomiser, filter pump, Bunsen burner, efflux speed.
import { concept, P, t, DATA, chk, sfStr, dpStr, sciTex, mean, halfRange, pctUnc, table } from "../lib.mjs";

const { g } = DATA;
const area = (d) => (Math.PI * d * d) / 4;

concept("aphys.matter.fluid-flow", { file: "matter/fluid-flow", keyPrefix: "matter.fluid-flow" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which pair of properties defines an ideal fluid in the derivation of Bernoulli's equation?",
    options: [
      ["Incompressible and non-viscous", "Correct: constant density and no internal friction (no energy dissipated)."],
      ["Compressible and non-viscous", "The continuity equation in volume form needs constant density."],
      ["Incompressible and highly viscous", "Viscosity dissipates energy, which Bernoulli's equation ignores."],
      ["Turbulent and of low density", "Bernoulli's equation applies to steady streamline flow, not turbulence."],
    ],
    answer: "A",
    explanation: "An ideal fluid is incompressible and non-viscous, flowing steadily in streamlines.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which statement about streamline flow is correct?",
    options: [
      ["Every particle passing a given point has the same velocity there as earlier particles.", "Correct: the velocity at each point is steady, so the paths are fixed."],
      ["Particles move in eddies, and the velocity at any one point changes erratically with time.", "That is turbulent flow."],
      ["Streamlines cross where the fluid speeds up in a narrow section.", "Streamlines never cross; they crowd closer together where the flow is faster."],
      ["All particles in the fluid move with the same speed everywhere.", "Speeds differ from place to place (faster in narrow sections), but are steady at each point."],
    ],
    answer: "A",
    explanation: "Streamline (laminar) flow: steady velocity at each point, fixed non-crossing paths.",
  });
  {
    const ratio = 3;
    b.mcq({
      d: 2, skill: "APPLICATION", daily: true,
      stem: "Water flows steadily through a horizontal pipe whose diameter narrows to one third of its original value. By what factor does the speed of the water increase?",
      options: [
        [String(ratio * ratio), "Correct: area ∝ d², so A falls by 9 and v rises by 9."],
        [String(ratio), "This treats speed as inversely proportional to diameter instead of area."],
        [String(ratio ** 3), "Area depends on the square of the diameter, not the cube."],
        [sfStr(Math.sqrt(ratio), 3), "The speed is inversely proportional to area, not to the square root of the diameter."],
      ],
      answer: "A",
      explanation: "A₁v₁ = A₂v₂ and A ∝ d², so v₂/v₁ = (d₁/d₂)² = 3² = 9.",
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Bernoulli's equation contains the terms p, ½ρv² and ρgh. What does each term represent?",
    options: [
      ["An energy per unit volume of the fluid", "Correct: each has the unit J m⁻³, which equals Pa."],
      ["A force acting on the fluid", "The unit of each term is the pascal, not the newton."],
      ["An energy per unit mass of the fluid", "Dividing by mass would give p/ρ + ½v² + gh."],
      ["A power transferred per unit area of the pipe", "There is no time in these terms."],
    ],
    answer: "A",
    explanation: "Dividing the work-energy equation by the volume gives terms in J m⁻³ (= N m⁻² = Pa).",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "In a Bunsen burner, gas leaves a narrow jet near the air hole. Why is air drawn into the burner?",
    options: [
      ["The fast-moving gas has a low pressure, so atmospheric pressure pushes air in through the hole.", "Correct: high speed means low static pressure (Bernoulli)."],
      ["The gas is denser than air, so it sinks and pulls air in behind it.", "Natural gas is less dense than air; density is not the cause here."],
      ["The flame heats the air, which then expands into the tube.", "Air enters even before the burner is lit; the effect is the jet, not heating."],
      ["The gas at the jet is at a higher pressure than the atmosphere, so it sucks in air.", "A higher pressure would push gas out of the hole, not draw air in."],
    ],
    answer: "A",
    explanation: "The jet's high speed lowers its static pressure below atmospheric, so air is pushed in and mixes with the gas.",
    hints: ["Where the speed is high, what happens to the pressure?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Water flows steadily through a horizontal pipe that narrows at a throat and widens again. Vertical open tubes at the wide section and at the throat show water columns. Which statement is correct?",
    options: [
      ["The column above the throat is lower, because the pressure is lower where the water is faster.", "Correct: p + ½ρv² is constant in a horizontal pipe."],
      ["The column above the throat is higher, because the water is pushed harder through the narrow part.", "Faster flow means lower static pressure, not higher."],
      ["The columns are equal, because the pipe is horizontal and the flow is steady.", "Equal heights would need equal speeds; the throat is narrower."],
      ["The column above the throat is lower, because some water is lost through friction at the throat.", "An ideal fluid loses no energy; the drop is from the speed increase."],
    ],
    answer: "A",
    explanation: "At the throat v is larger, so p is smaller and the open tube shows a lower column: the principle of the Venturi meter.",
    hints: ["Apply continuity first, then Bernoulli."],
  });
  {
    const rho = 1.2, va = 62, vb = 54, Aw = 12;
    const dp = 0.5 * rho * (va * va - vb * vb);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Air of density $1.2\ \text{kg m}^{-3}$ flows at $62\ \text{m s}^{-1}$ over the top of a wing and $54\ \text{m s}^{-1}$ under it. The wing area is $12\ \text{m}^2$. Ignoring the thickness of the wing, what is the lift?`,
      options: [
        [`${sfStr(dp * Aw, 2)} N`, "Correct: Δp = ½ρ(v₁² − v₂²), lift = ΔpA."],
        [`${sfStr(0.5 * rho * (va - vb) ** 2 * Aw, 2)} N`, "This squares the difference of the speeds instead of taking the difference of the squares."],
        [`${sfStr(dp, 2)} N`, "This is the pressure difference in Pa; it must be multiplied by the area."],
        [`${sfStr(rho * (va * va - vb * vb) * Aw, 2)} N`, "The factor ½ in ½ρv² is missing."],
      ],
      answer: "A",
      explanation: t`$\Delta p = \tfrac{1}{2} \times 1.2 \times (62^2 - 54^2) = ${sfStr(dp, 3)}\ \text{Pa}$; lift $= ${sfStr(dp, 3)} \times 12 = ${sfStr(dp * Aw, 2)}\ \text{N}$.`,
      hints: ["v₁² − v₂² is not (v₁ − v₂)²."],
    });
  }
  {
    const d = 0.025, Q = 1.5e-3;
    const v = Q / area(d);
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, daily: true,
      stem: t`A borehole pump delivers $1.5 \times 10^{-3}\ \text{m}^3$ of water per second along a pipe of internal diameter $25\ \text{mm}$. Calculate the mean speed of the water, in $\text{m s}^{-1}$, to three significant figures.`,
      value: v, unit: "m/s", wrong: [Q / (Math.PI * d * d), Q / (Math.PI * (d / 2))],
      explanation: t`$A = \dfrac{\pi (0.025)^2}{4} = ${sciTex(area(d))}\ \text{m}^2$; $v = Q/A = ${sfStr(v, 3)}\ \text{m s}^{-1}$. Using the diameter as the radius gives a speed four times too small.`,
    });
  }
  {
    const A1 = 4.0e-4, v1 = 1.8, A2 = 1.5e-4;
    b.num({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: t`Oil flows at $1.8\ \text{m s}^{-1}$ in a pipe of cross-sectional area $4.0 \times 10^{-4}\ \text{m}^2$, which then narrows to $1.5 \times 10^{-4}\ \text{m}^2$. Calculate the speed in the narrow section, in $\text{m s}^{-1}$, to two significant figures.`,
      value: (A1 * v1) / A2, sf: 2, unit: "m/s", wrong: [(A2 * v1) / A1],
      explanation: t`$v_2 = \dfrac{A_1v_1}{A_2} = \dfrac{4.0 \times 10^{-4} \times 1.8}{1.5 \times 10^{-4}} = ${sfStr((A1 * v1) / A2, 2)}\ \text{m s}^{-1}$.`,
    });
  }
  {
    const h = 2.4;
    const v = Math.sqrt(2 * g * h);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A water storage tank on a Gweru house is open at the top. Water leaves through a small tap $2.4\ \text{m}$ below the water surface. Treating the water as an ideal fluid, calculate the speed at which it leaves the tap, in $\text{m s}^{-1}$, to three significant figures.`,
      value: v, unit: "m/s", wrong: [2 * g * h, Math.sqrt(g * h)],
      explanation: t`Both the surface and the jet are at atmospheric pressure and the surface speed is negligible, so $\rho g h = \tfrac{1}{2}\rho v^2$ and $v = \sqrt{2gh} = \sqrt{2 \times 9.81 \times 2.4} = ${sfStr(v, 3)}\ \text{m s}^{-1}$.`,
      hints: ["Apply Bernoulli between the surface and the jet: which terms cancel?"],
    });
  }
  {
    const rho = 1000, A1 = 3.0e-3, A2 = 1.0e-3, v1 = 0.90;
    const v2 = (v1 * A1) / A2;
    const dp = 0.5 * rho * (v2 * v2 - v1 * v1);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Water flows at $0.90\ \text{m s}^{-1}$ through a horizontal pipe of cross-sectional area $3.0 \times 10^{-3}\ \text{m}^2$ into a section of area $1.0 \times 10^{-3}\ \text{m}^2$. Calculate the difference in pressure between the two sections, in Pa, to two significant figures. (Density of water $= 1000\ \text{kg m}^{-3}$.)`,
      value: dp, sf: 2, unit: "Pa", wrong: [0.5 * rho * (v2 - v1) ** 2, rho * (v2 * v2 - v1 * v1)],
      explanation: t`1. Continuity: $v_2 = \dfrac{3.0 \times 10^{-3} \times 0.90}{1.0 \times 10^{-3}} = ${dpStr(v2, 1)}\ \text{m s}^{-1}$.
2. Bernoulli (horizontal): $p_1 - p_2 = \tfrac{1}{2}\rho(v_2^2 - v_1^2) = 500 \times (${dpStr(v2, 1)}^2 - 0.90^2)$.
3. $p_1 - p_2 = ${sfStr(dp, 2)}\ \text{Pa}$; the wider section is at the higher pressure.`,
      hints: ["Find the speed in the narrow section first."],
    });
  }
  {
    const rho = 1000, A1 = 5.0e-3, A2 = 2.0e-3, dp = 6.0e3;
    const v1 = Math.sqrt((2 * dp) / (rho * ((A1 / A2) ** 2 - 1)));
    const Q = A1 * v1;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A Venturi meter in a water main has a wide section of area $5.0 \times 10^{-3}\ \text{m}^2$ and a throat of area $2.0 \times 10^{-3}\ \text{m}^2$. The pressure at the throat is $6.0\\text{kPa}$ lower than in the wide section. Calculate the volume flow rate, in $\text{m}^3\ \text{s}^{-1}$, to two significant figures. (Density of water $= 1000\ \text{kg m}^{-3}$.)`,
      value: Q, sf: 2, wrong: [A2 * v1, A1 * Math.sqrt((2 * dp) / rho)],
      explanation: t`1. Continuity: $v_2 = \dfrac{A_1}{A_2}v_1 = 2.5\,v_1$.
2. Bernoulli: $\Delta p = \tfrac{1}{2}\rho v_1^2(2.5^2 - 1) = 2625\,v_1^2$ (in SI units).
3. $v_1 = \sqrt{\dfrac{6000}{2625}} = ${sfStr(v1, 3)}\ \text{m s}^{-1}$.
4. $Q = A_1v_1 = 5.0 \times 10^{-3} \times ${sfStr(v1, 3)} = ${sciTex(Q, 2)}\ \text{m}^3\ \text{s}^{-1}$.
5. Ignoring the speed in the wide section ($\Delta p = \tfrac{1}{2}\rho v_2^2$ alone) overestimates the flow.`,
      hints: ["Write v₂ in terms of v₁.", "Δp = ½ρ(v₂² − v₁²)."],
    });
  }
  {
    // uncertainty: speed from collected volume, time and diameter
    const V = 2.00e-3, dV = 0.02e-3, tt = [8.4, 8.9, 8.6], d = 9.0e-3, dd = 0.1e-3;
    const T = mean(tt), dT = halfRange(tt);
    const pct = pctUnc(dV, V) + pctUnc(dT, T) + 2 * pctUnc(dd, d);
    b.num({
      d: 4, skill: "EVALUATION", calculator: true,
      stem: t`Farai finds the speed of water leaving a tube by collecting $2.00 \pm 0.02$ litres in a measuring cylinder and timing it. His times are 8.4 s, 8.9 s and 8.6 s. The tube's internal diameter is $9.0 \pm 0.1\ \text{mm}$. Using $v = \dfrac{4V}{\pi d^2 t}$, calculate the percentage uncertainty in $v$, to two significant figures.`,
      value: pct, sf: 2, unit: "%", wrong: [pctUnc(dV, V) + pctUnc(dT, T) + pctUnc(dd, d)],
      explanation: t`1. Volume: $\dfrac{0.02}{2.00} \times 100 = ${sfStr(pctUnc(dV, V), 2)}\%$.
2. Time: mean $${sfStr(T, 3)}\ \text{s}$, half-range $${dpStr(dT, 2)}\ \text{s}$, so $${sfStr(pctUnc(dT, T), 2)}\%$.
3. Diameter (squared, so doubled): $2 \times \dfrac{0.1}{9.0} \times 100 = ${sfStr(2 * pctUnc(dd, d), 2)}\%$.
4. Total: $${sfStr(pct, 2)}\%$. The diameter contributes most; forgetting to double it gives too small a value.`,
      hints: ["Percentage uncertainties add for products and quotients.", "A squared quantity contributes twice its percentage uncertainty."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "For an incompressible fluid flowing steadily through a pipe, the volume flow rate is the same at every cross-section, even where the pipe narrows.",
    answer: true,
    explanation: "True. This is the continuity equation A₁v₁ = A₂v₂: no fluid is created, destroyed or stored.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each device with the way it uses the low pressure in fast-moving fluid.",
    pairs: [
      ["Spray atomiser", "Fast air over a tube lets atmospheric pressure push liquid up into the jet"],
      ["Filter pump", "A fast water jet draws air out of a flask through a side tube"],
      ["Aerofoil", "Faster air over the upper surface gives an upward resultant force"],
      ["Venturi meter", "A pressure difference between pipe and throat measures the flow rate"],
    ],
    explanation: "Each uses Bernoulli's principle: faster flow, lower pressure.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the statements about flow in a horizontal pipe.",
    template: "Where the pipe narrows, the speed of the fluid {{blank:a}} because the volume flow rate is {{blank:b}}. By Bernoulli's equation, the static pressure there is {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["increases"], choices: ["increases", "decreases", "stays the same"] },
      { id: "b", accepted: ["constant"], choices: ["constant", "increasing", "decreasing"] },
      { id: "c", accepted: ["lower"], choices: ["lower", "higher", "unchanged"] },
    ],
    explanation: "Continuity gives the speed increase; Bernoulli gives the pressure drop.",
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 4,
    stem: "Derive Bernoulli's equation for an ideal fluid flowing along a streamline from a point 1 to a point 2.",
    points: [
      "A small volume V moves along the streamline: the pressure behind does work p₁V on it and work p₂V is done against the pressure ahead.",
      "Net work done = (p₁ − p₂)V.",
      "This equals the gain in kinetic energy ½m(v₂² − v₁²) plus gain in gravitational potential energy mg(h₂ − h₁) (no energy dissipated in an ideal fluid).",
      "Divide by V, with m/V = ρ: p₁ + ½ρv₁² + ρgh₁ = p₂ + ½ρv₂² + ρgh₂.",
    ],
    modelAnswer: "Take a small volume V of fluid of mass m moving along a streamline. The fluid behind does work p₁V pushing it forward; it does work p₂V against the fluid ahead, so the net work done on it is (p₁ − p₂)V. With no viscous losses this equals its gain in kinetic and potential energy: (p₁ − p₂)V = ½m(v₂² − v₁²) + mg(h₂ − h₁). Dividing by V and writing ρ = m/V gives p₁ + ½ρv₁² + ρgh₁ = p₂ + ½ρv₂² + ρgh₂.",
    explanation: "Work done by pressure = gain in kinetic + potential energy, per unit volume.",
    hints: ["Work done by a pressure on a volume V is pV."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how an aircraft wing produces lift.",
    points: [
      "The shape (camber) and angle of attack make air flow faster over the upper surface than under the lower surface.",
      "By Bernoulli's equation the pressure above the wing is lower than below.",
      "The pressure difference × wing area gives a resultant upward force (lift).",
    ],
    modelAnswer: "The curved shape and tilt of the wing make the air move faster over the top surface than underneath. By Bernoulli's equation, faster air has lower static pressure, so the pressure above the wing is less than below. The pressure difference acting over the wing area gives an upward resultant force, the lift.",
    explanation: "Faster over the top → lower pressure above → net upward force.",
    hints: ["Compare the speeds above and below."],
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Distinguish between streamline flow and turbulent flow.",
    points: [
      "Streamline: velocity at each point constant in time; particles follow fixed paths that do not cross.",
      "Turbulent: velocity at a point changes erratically; eddies form and the fluid mixes (energy is dissipated).",
    ],
    modelAnswer: "In streamline flow the velocity at each point is steady, so particles passing a point follow the same non-crossing path. In turbulent flow the velocity at a point changes erratically, with eddies and mixing that dissipate energy.",
    explanation: "Steady, ordered paths versus erratic eddies.",
  });

  // Practice structured: a pipe rising up a hillside (12 marks)
  {
    const rho = 1000, d1 = 0.050, d2 = 0.030, Q = 2.6e-3, h = 6.0, p1 = 2.8e5;
    const v1 = Q / area(d1), v2 = Q / area(d2);
    const p2 = p1 + 0.5 * rho * (v1 * v1 - v2 * v2) - rho * g * h;
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`Water ($\rho = 1000\ \text{kg m}^{-3}$) is pumped at $2.6 \times 10^{-3}\ \text{m}^3\ \text{s}^{-1}$ through a pipe of internal diameter $50\ \text{mm}$ at ground level, where the pressure is $2.8 \times 10^{5}\ \text{Pa}$. The pipe rises $6.0\ \text{m}$ up a hillside near Mutare and narrows to an internal diameter of $30\ \text{mm}$. Treat the water as an ideal fluid.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: t`Calculate the speed of the water in the $50\ \text{mm}$ pipe, in $\text{m s}^{-1}$, to three significant figures.`, value: v1, unit: "m/s", wrong: [Q / (Math.PI * d1 * d1)], explanation: t`$v_1 = \dfrac{Q}{\pi d^2/4} = \dfrac{2.6 \times 10^{-3}}{${sciTex(area(d1))}} = ${sfStr(v1, 3)}\ \text{m s}^{-1}$.` }),
        P.num({ label: "(b)", marks: 2, stem: t`Calculate the speed in the $30\ \text{mm}$ pipe, in $\text{m s}^{-1}$, to three significant figures.`, value: v2, unit: "m/s", wrong: [v1 * (d1 / d2)], explanation: t`$v_2 = v_1\left(\dfrac{50}{30}\right)^2 = ${sfStr(v2, 3)}\ \text{m s}^{-1}$.` }),
        P.num({ label: "(c)", marks: 3, stem: t`Calculate the pressure in the narrow pipe at the top, in Pa, to three significant figures.`, value: p2, unit: "Pa", wrong: [p1 + 0.5 * rho * (v1 * v1 - v2 * v2), p1 - rho * g * h], explanation: t`$p_2 = p_1 + \tfrac{1}{2}\rho(v_1^2 - v_2^2) - \rho g h = 2.8 \times 10^{5} + 500(${sfStr(v1, 3)}^2 - ${sfStr(v2, 3)}^2) - 1000 \times 9.81 \times 6.0 = ${sciTex(p2)}\ \text{Pa}$.` }),
        P.manual({ label: "(d)", marks: 2, stem: "State the two terms of Bernoulli's equation that change most between the bottom and the top here, and explain which change lowers the pressure more.", points: ["The ρgh term increases by ρgh ≈ 5.9 × 10⁴ Pa.", "The ½ρv² term increases by only about 5.9 × 10³ Pa, so the rise in height lowers the pressure far more than the speed increase."], modelAnswer: "Both ½ρv² and ρgh increase. The potential-energy term rises by about 5.9 × 10⁴ Pa while the kinetic term rises by only about 5.9 × 10³ Pa, so the height gain causes most of the pressure drop." }),
        P.manual({ label: "(e)", marks: 3, stem: "State three reasons why the real pressure at the top would be lower than your answer to (c).", points: ["Water is viscous: energy is dissipated by friction with the pipe walls.", "Flow may be turbulent (especially at bends or the narrowing), dissipating energy in eddies.", "Losses at joints, bends and valves (or leaks) reduce the energy per unit volume further."], modelAnswer: "Real water is viscous, so friction with the walls dissipates energy; the flow may be partly turbulent, losing energy in eddies; and bends, joints and the narrowing itself cause extra losses." }),
      ],
      explanation: "Continuity gives the speeds; Bernoulli with a height change gives the pressure.",
      hints: ["A ∝ d².", "Include ρgh when the pipe rises."],
    });
    chk(p2 < p1 ? 1 : 0, 1);
  }
  // Practice structured: emptying a tank, with data (8 marks)
  {
    const hs = [0.80, 0.60, 0.40, 0.20];
    const vs = hs.map((h) => Math.sqrt(2 * g * h));
    const nz = [-0.03, 0.04, -0.02, 0.02];
    const vm = vs.map((v, i) => Math.round((0.97 * v + nz[i]) * 100) / 100);
    const row = 1;
    b.struct({
      d: 3, skill: "ANALYSIS", calculator: true,
      stem: t`Chipo measures the speed $v$ of water leaving a small hole in the side of an open tank for several depths $h$ of the hole below the water surface:

${table([t`$h\,/\,\text{m}$`, t`$v\,/\,\text{m s}^{-1}$ (measured)`], hs.map((h, i) => [dpStr(h, 2), dpStr(vm[i], 2)]))}`,
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: t`Show that, for an ideal fluid, $v = \sqrt{2gh}$.`, points: ["Surface and jet are both at atmospheric pressure, and the surface speed is negligible (large tank).", "So ρgh = ½ρv², giving v = √(2gh)."], modelAnswer: "Applying Bernoulli between the surface and the jet: both are at atmospheric pressure and the surface barely moves, so ρgh = ½ρv² and v = √(2gh)." }),
        P.num({ label: "(b)", marks: 2, stem: t`Calculate the ideal speed for $h = 0.60\ \text{m}$, in $\text{m s}^{-1}$, to three significant figures.`, value: vs[row], unit: "m/s", wrong: [2 * g * 0.6], explanation: t`$\sqrt{2 \times 9.81 \times 0.60} = ${sfStr(vs[row], 3)}\ \text{m s}^{-1}$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Calculate the measured speed as a percentage of the ideal speed for $h = 0.60\ \text{m}$, to two significant figures.`, value: (vm[row] / vs[row]) * 100, sf: 2, unit: "%", wrong: [(vs[row] / vm[row]) * 100], explanation: t`$\dfrac{${dpStr(vm[row], 2)}}{${sfStr(vs[row], 3)}} \times 100 = ${sfStr((vm[row] / vs[row]) * 100, 2)}\%$.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Suggest two reasons why the measured speeds are slightly below the ideal values.", points: ["Viscous friction at the edges of the hole dissipates energy.", "The water surface is moving down / the jet contracts just outside the hole, so the measured speed (or effective area) differs from the ideal."], modelAnswer: "Viscosity causes energy losses as the water passes through the hole, and the surface is not quite stationary while the jet narrows after leaving the hole, so the ideal assumptions do not hold exactly." }),
      ],
      explanation: "v = √(2gh) is the efflux speed of an ideal fluid; real values are a few per cent lower.",
      hints: ["Which terms of Bernoulli's equation are equal at the surface and at the jet?"],
    });
  }

  b.card("DEFINITION", "**Streamline flow**", "Flow in which every particle passing a point follows the same path with the same velocity as those before it; streamlines never cross.");
  b.card("DEFINITION", "**Ideal fluid**", "Incompressible and non-viscous, flowing steadily (streamline flow).");
  b.card("FORMULA", "Continuity equation", t`$A_1v_1 = A_2v_2$ (volume flow rate $Q = Av$ constant)`);
  b.card("FORMULA", "Bernoulli's equation", t`$p + \tfrac{1}{2}\rho v^2 + \rho g h = \text{constant}$ along a streamline`);
  b.card("CONCEPT", "Bernoulli in one line", "In a horizontal pipe, where the fluid moves faster its static pressure is lower.");
  b.card("FORMULA", "Venturi meter", t`$\Delta p = \tfrac{1}{2}\rho v_1^2\left[\left(\dfrac{A_1}{A_2}\right)^2 - 1\right]$`);
  b.card("FORMULA", "Efflux speed from a tank", t`$v = \sqrt{2gh}$ for a hole a depth $h$ below an open surface`);
  b.card("CONCEPT", "Aerofoil lift", "Faster air above the wing → lower pressure above → lift = pressure difference × wing area.");
  b.card("CONCEPT", "Atomiser, filter pump, Bunsen burner", "A fast jet has low pressure, so atmospheric pressure pushes liquid or air into the jet.");
  b.card("FACT", "Each Bernoulli term", "Energy per unit volume: unit J m⁻³ = Pa.");
});
