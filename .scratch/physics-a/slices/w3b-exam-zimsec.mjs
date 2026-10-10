// W3b: ZIMSEC Paper 3 free-response items (format assumed, see BRIEF): kinetic theory and gases; conduction and
// radiation; fluid flow (Bernoulli).
import { concept, P, t, chk, ZIM, DATA, EXAM, checkExam, sfStr, dpStr, sciTex, toK } from "../lib.mjs";

const A = (k) => `aphys.${k}`;
const { R, k, NA, sigma, g } = DATA;

concept(A("gases.kinetic-theory"), { file: "exam/w3b-zimsec", keyPrefix: "exam.w3b-zimsec", applies: ZIM }, (b) => {
  const plan = { examStyle: true, skill: EXAM.ZIM_P3_FREE.skill, secs: EXAM.ZIM_P3_FREE.secs, applies: EXAM.ZIM_P3_FREE.applies, paper: "ZIMSEC P3", calculator: true };

  // Z1: kinetic theory of gases and the ideal gas equation.
  {
    const V = 2.4e-2, p = 1.25e5, T = toK(12), M = 0.032;
    const n = (p * V) / (R * T), N = n * NA, m = M / NA;
    const c2 = (3 * p * V) / (N * m);
    const crms = Math.sqrt(c2);
    const T2 = toK(127);
    const crms2 = crms * Math.sqrt(T2 / T);
    const Ek = 1.5 * p * V;
    b.struct({
      ...plan, d: 5,
      concepts: [A("gases.kinetic-theory"), A("gases.equation-of-state")],
      stem: t`A sealed container of volume $2.4 \times 10^{-2}\ \text{m}^3$ holds oxygen (molar mass $0.032\ \text{kg mol}^{-1}$) at a pressure of $1.25 \times 10^{5}\ \text{Pa}$ and a temperature of $12\ ^\circ\text{C}$. Treat oxygen as an ideal gas.`,
      parts: checkExam(EXAM.ZIM_P3_FREE, [
        P.manual({ label: "(a)", marks: 5, stem: "State five assumptions of the kinetic theory of an ideal gas.", points: [
          "The gas consists of a very large number of molecules in continuous random motion.",
          "The volume of the molecules is negligible compared with the volume of the container.",
          "There are no forces between molecules except during collisions.",
          "Collisions between molecules and with the walls are perfectly elastic.",
          "The time spent in collisions is negligible compared with the time between collisions.",
        ], modelAnswer: "A gas consists of a very large number of identical molecules in random motion; the volume of the molecules is negligible compared with that of the container; there are no intermolecular forces except during collisions; all collisions are perfectly elastic; and the duration of a collision is negligible compared with the time between collisions." }),
        P.manual({ label: "(b)", marks: 5, stem: t`Derive the equation $pV = \tfrac{1}{3}Nm\langle c^2\rangle$ for $N$ molecules each of mass $m$ in a cube of side $L$.`, points: [
          "A molecule with velocity component cₓ rebounds elastically from a wall: change of momentum 2mcₓ.",
          "Time between successive collisions with the same wall = 2L/cₓ, so mean force = 2mcₓ/(2L/cₓ) = mcₓ²/L.",
          "Total force from N molecules = Nm⟨cₓ²⟩/L; pressure = force/L² = Nm⟨cₓ²⟩/V.",
          "c² = cₓ² + c_y² + c_z²; random motion gives ⟨cₓ²⟩ = ⟨c_y²⟩ = ⟨c_z²⟩ = ⅓⟨c²⟩.",
          "Hence pV = ⅓Nm⟨c²⟩.",
        ], modelAnswer: "A molecule with velocity component cₓ towards a wall rebounds with −cₓ, changing its momentum by 2mcₓ. It returns to that wall after a time 2L/cₓ, so the mean force it exerts is mcₓ²/L. For N molecules the force is Nm⟨cₓ²⟩/L and the pressure on the wall of area L² is Nm⟨cₓ²⟩/L³ = Nm⟨cₓ²⟩/V. Since c² = cₓ² + c_y² + c_z² and the motion is random, ⟨cₓ²⟩ = ⅓⟨c²⟩, giving pV = ⅓Nm⟨c²⟩." }),
        P.group({ label: "(c)", stem: "For the oxygen in the container, calculate:", parts: [
          P.num({ label: "(i)", marks: 2, stem: "the number of molecules, to three significant figures", value: N, wrong: [n], explanation: t`$n = \dfrac{pV}{RT} = \dfrac{1.25 \times 10^{5} \times 2.4 \times 10^{-2}}{8.31 \times 285.15} = ${sfStr(n, 3)}\ \text{mol}$; $N = nN_A = ${sciTex(N)}$.` }),
          P.num({ label: "(ii)", marks: 3, stem: t`the r.m.s. speed of the molecules, in $\text{m s}^{-1}$, to three significant figures, using the equation in (b)`, value: crms, unit: "m/s", wrong: [Math.sqrt((p * V) / (N * m)), Math.sqrt((3 * p * V) / (N * M))], explanation: t`$m = \dfrac{0.032}{6.02 \times 10^{23}} = ${sciTex(m)}\ \text{kg}$; $\langle c^2\rangle = \dfrac{3pV}{Nm} = ${sciTex(c2)}\ \text{m}^2\ \text{s}^{-2}$; $c_{\text{r.m.s.}} = ${sfStr(crms, 3)}\ \text{m s}^{-1}$.` }),
        ] }),
        P.group({ label: "(d)", stem: t`The container is heated to $127\ ^\circ\text{C}$. Calculate:`, parts: [
          P.num({ label: "(i)", marks: 2, stem: "the new pressure, in Pa, to three significant figures", value: (p * T2) / T, unit: "Pa", wrong: [(p * 127) / 12], explanation: t`$p_2 = 1.25 \times 10^{5} \times \dfrac{400.15}{285.15} = ${sciTex((p * T2) / T)}\ \text{Pa}$.` }),
          P.num({ label: "(ii)", marks: 2, stem: t`the new r.m.s. speed, in $\text{m s}^{-1}$, to three significant figures`, value: crms2, unit: "m/s", wrong: [crms * (T2 / T)], explanation: t`$c \propto \sqrt{T}$: $${sfStr(crms, 3)} \times \sqrt{\dfrac{400.15}{285.15}} = ${sfStr(crms2, 3)}\ \text{m s}^{-1}$.` }),
          P.num({ label: "(iii)", marks: 1, stem: "the total translational kinetic energy of the molecules at 12 °C, in J, to three significant figures", value: Ek, unit: "J", wrong: [p * V], explanation: t`$\tfrac{3}{2}pV = 1.5 \times 1.25 \times 10^{5} \times 2.4 \times 10^{-2} = ${sfStr(Ek, 3)}\ \text{J}$.` }),
        ] }),
      ]),
      explanation: "Kinetic theory: pV = ⅓Nm⟨c²⟩; with pV = NkT, ½m⟨c²⟩ = (3/2)kT, so c_rms ∝ √T.",
      hints: ["N = pV/(kT).", "c_rms ∝ √T at constant volume."],
    });
    chk(crms, Math.sqrt((3 * k * T) / m), 0.2);
  }

  // Z2: thermal conduction and radiation from a geyser tank.
  {
    const kIns = 0.040, x = 0.050, A1 = 3.2, Tin = 65, Tout = 20;
    const Pcond = (kIns * A1 * (Tin - Tout)) / x;
    const Pday = Pcond * 24 * 3600;
    const Ap = 2.0, Tp = toK(75), T0 = toK(25);
    const Prad = sigma * Ap * (Tp ** 4 - T0 ** 4);
    b.struct({
      ...plan, d: 4,
      concepts: [A("matter.thermal-conduction"), A("matter.convection-radiation")],
      stem: t`A domestic hot-water geyser tank has a total surface area of $3.2\ \text{m}^2$ covered by a $50\ \text{mm}$ layer of insulation of thermal conductivity $0.040\ \text{W m}^{-1}\ \text{K}^{-1}$. The water inside is at $65\ ^\circ\text{C}$ and the room at $20\ ^\circ\text{C}$. A separate solar collector panel on the roof has an area of $2.0\ \text{m}^2$. ($\sigma = 5.67 \times 10^{-8}\ \text{W m}^{-2}\ \text{K}^{-4}$)`,
      parts: checkExam(EXAM.ZIM_P3_FREE, [
        P.manual({ label: "(a)", marks: 5, stem: "Define thermal conductivity, and explain how thermal energy is conducted through a metal and through a non-metal.", points: [
          "Thermal conductivity: rate of flow of thermal energy per unit cross-sectional area per unit temperature gradient (k = (Q/t)x/(AΔθ)).",
          "In all solids: atoms at the hotter end vibrate with larger amplitude and pass vibrational energy to neighbours through the bonds (lattice vibrations).",
          "This mechanism is slow; it is the only one in non-metals.",
          "Metals also have free (delocalised) electrons which gain kinetic energy in hot regions and move rapidly through the metal.",
          "They transfer energy to atoms in cooler regions by collisions, so metals conduct far better.",
        ], modelAnswer: "Thermal conductivity is the rate of flow of thermal energy per unit area per unit temperature gradient. In any solid, atoms at the hot end vibrate more strongly and pass this vibrational energy to their neighbours through the interatomic bonds; this is slow and is the only mechanism in a non-metal. A metal also has free electrons, which gain kinetic energy in hot regions, travel quickly through the lattice and give energy to atoms in cooler regions in collisions, so metals are much better conductors." }),
        P.manual({ label: "(b)", marks: 5, stem: "Explain the features of a solar water heater (collector panel, glass cover, tank position and lagging) that make it work efficiently.", points: [
          "Matt black collector: a good absorber of radiation from the Sun.",
          "Glass cover: transmits short-wavelength sunlight but absorbs/blocks much of the long-wavelength infrared emitted by the warm plate (greenhouse effect).",
          "Glass cover also stops warm air above the plate leaving by convection.",
          "Tank above the collector: warm, less dense water rises into the tank by natural convection while cooler water sinks to the panel (no pump needed).",
          "Lagged tank and pipes: poor conductors (trapped air) reduce conduction losses.",
        ], modelAnswer: "The collector is matt black, so it absorbs sunlight well. A glass cover lets the short-wavelength sunlight through but absorbs much of the long-wavelength infrared emitted by the warm plate, and it also stops convection losses from the plate. The tank is placed above the collector so that heated, less dense water rises into it by natural convection while cooler water sinks back to the panel. The tank and pipes are lagged with a poor conductor to reduce conduction losses." }),
        P.group({ label: "(c)", stem: "For the geyser tank, calculate:", parts: [
          P.num({ label: "(i)", marks: 3, stem: "the rate of energy loss by conduction through the insulation, in W, to three significant figures", value: Pcond, sf: 3, unit: "W", wrong: [(kIns * A1 * (Tin - Tout)) / 50], explanation: t`$\dfrac{Q}{t} = \dfrac{kA\Delta\theta}{x} = \dfrac{0.040 \times 3.2 \times 45}{0.050} = ${sfStr(Pcond, 3)}\ \text{W}$.` }),
          P.num({ label: "(ii)", marks: 2, stem: "the energy lost in 24 hours, in J, to three significant figures", value: Pday, sf: 3, unit: "J", wrong: [Pcond * 24], explanation: t`$${sfStr(Pcond, 3)} \times 24 \times 3600 = ${sciTex(Pday, 3)}\ \text{J}$.` }),
          P.num({ label: "(iii)", marks: 1, stem: "the factor by which the conduction loss would change if the insulation were doubled in thickness", value: 0.5, dp: 1, wrong: [2], explanation: t`$Q/t \propto 1/x$, so doubling $x$ halves the loss: factor $0.5$.` }),
        ] }),
        P.group({ label: "(d)", stem: t`The collector panel, treated as a black body radiating from one face, is at $75\ ^\circ\text{C}$ with surroundings at $25\ ^\circ\text{C}$.`, parts: [
          P.num({ label: "(i)", marks: 3, stem: "Calculate the net rate of energy loss by radiation from the panel, in W, to two significant figures.", value: Prad, sf: 2, unit: "W", wrong: [sigma * Ap * Tp ** 4, sigma * Ap * (75 ** 4 - 25 ** 4)], explanation: t`$\sigma A(T^4 - T_0^4) = 5.67 \times 10^{-8} \times 2.0 \times (348.15^4 - 298.15^4) = ${sfStr(Prad, 2)}\ \text{W}$.` }),
          P.num({ label: "(ii)", marks: 1, stem: "Calculate the total power emitted by the panel, ignoring what it absorbs from the surroundings, in W, to two significant figures.", value: sigma * Ap * Tp ** 4, sf: 2, unit: "W", wrong: [Prad], explanation: t`$\sigma AT^4 = 5.67 \times 10^{-8} \times 2.0 \times 348.15^4 = ${sfStr(sigma * Ap * Tp ** 4, 2)}\ \text{W}$; most of this is balanced by radiation absorbed from the surroundings.` }),
        ] }),
      ]),
      explanation: "Conduction Q/t = kAΔθ/x; radiation σA(T⁴ − T₀⁴) with T in kelvin.",
      hints: ["Convert mm to m.", "Use kelvin in the Stefan-Boltzmann law."],
    });
  }

  // Z3: fluid flow, continuity and Bernoulli with a height change.
  {
    const rho = 1000, A1 = 4.5e-3, A2 = 1.8e-3, v1 = 1.4, h = 3.0, p1 = 2.2e5;
    const v2 = (A1 * v1) / A2;
    const p2 = p1 + 0.5 * rho * (v1 * v1 - v2 * v2) - rho * g * h;
    const Q = A1 * v1;
    // Venturi
    const Av1 = 1.2e-3, Av2 = 0.40e-3, dpV = 4.5e3;
    const u1 = Math.sqrt((2 * dpV) / (rho * ((Av1 / Av2) ** 2 - 1)));
    b.struct({
      ...plan, d: 5,
      concepts: [A("matter.fluid-flow")],
      stem: t`Part 1: water ($\rho = 1000\ \text{kg m}^{-3}$) flows at $1.4\ \text{m s}^{-1}$ through a pipe of cross-sectional area $4.5 \times 10^{-3}\ \text{m}^2$, where the pressure is $2.2 \times 10^{5}\ \text{Pa}$. The pipe rises $3.0\ \text{m}$ and narrows to $1.8 \times 10^{-3}\ \text{m}^2$.

Part 2: a horizontal Venturi meter has a wide section of area $1.2 \times 10^{-3}\ \text{m}^2$ and a throat of area $0.40 \times 10^{-3}\ \text{m}^2$; the pressure difference between them is $4.5\ \text{kPa}$. Treat water as an ideal fluid throughout.`,
      parts: checkExam(EXAM.ZIM_P3_FREE, [
        P.manual({ label: "(a)", marks: 4, stem: "Distinguish between streamline and turbulent flow, and state the conditions under which Bernoulli's equation applies.", points: [
          "Streamline: every particle passing a point has the same velocity as those before; paths (streamlines) are steady and do not cross.",
          "Turbulent: velocity at a point changes erratically; eddies form and energy is dissipated.",
          "Bernoulli applies to an ideal fluid: incompressible and non-viscous.",
          "…in steady streamline flow, along one streamline.",
        ], modelAnswer: "In streamline flow the velocity at each point is steady, so particles follow fixed paths that never cross; in turbulent flow the velocity at a point changes erratically, with eddies that dissipate energy. Bernoulli's equation applies along a streamline in steady flow of an ideal fluid, one that is incompressible and non-viscous." }),
        P.manual({ label: "(b)", marks: 6, stem: t`Derive Bernoulli's equation $p + \tfrac{1}{2}\rho v^2 + \rho g h = \text{constant}$ for an ideal fluid, and use the continuity equation to explain why the pressure is lower at the throat of a horizontal Venturi meter.`, points: [
          "Consider a volume V of fluid moving along a streamline: work done on it by the fluid behind = p₁V; work done by it against the fluid ahead = p₂V.",
          "Net work (p₁ − p₂)V = gain in kinetic energy ½m(v₂² − v₁²) + gain in potential energy mg(h₂ − h₁), with no viscous losses.",
          "Dividing by V and using ρ = m/V: p₁ + ½ρv₁² + ρgh₁ = p₂ + ½ρv₂² + ρgh₂.",
          "Continuity: A₁v₁ = A₂v₂ (incompressible), so the speed is larger at the narrower throat.",
          "Horizontal: h₁ = h₂, so p + ½ρv² is constant.",
          "Larger v at the throat means smaller p there.",
        ], modelAnswer: "Take a volume V of fluid of mass m moving along a streamline. The fluid behind it does work p₁V on it, and it does work p₂V on the fluid ahead, so the net work done on it is (p₁ − p₂)V. With no viscous losses this equals its gain in kinetic and potential energy: (p₁ − p₂)V = ½m(v₂² − v₁²) + mg(h₂ − h₁). Dividing by V, with ρ = m/V, gives p₁ + ½ρv₁² + ρgh₁ = p₂ + ½ρv₂² + ρgh₂. In a Venturi meter the continuity equation A₁v₁ = A₂v₂ means the water moves faster in the narrow throat. The meter is horizontal, so p + ½ρv² is constant, and the larger speed at the throat means a lower pressure there." }),
        P.group({ label: "(c)", stem: "For Part 1, calculate:", parts: [
          P.num({ label: "(i)", marks: 2, stem: t`the speed in the narrow section, in $\text{m s}^{-1}$`, value: v2, unit: "m/s", wrong: [(A2 * v1) / A1], explanation: t`$v_2 = \dfrac{4.5 \times 10^{-3} \times 1.4}{1.8 \times 10^{-3}} = ${sfStr(v2, 3)}\ \text{m s}^{-1}$.` }),
          P.num({ label: "(ii)", marks: 3, stem: "the pressure in the narrow section at the top, in Pa, to three significant figures", value: p2, unit: "Pa", wrong: [p1 + 0.5 * rho * (v1 * v1 - v2 * v2), p1 - rho * g * h], explanation: t`$p_2 = p_1 + \tfrac{1}{2}\rho(v_1^2 - v_2^2) - \rho g h = 2.2 \times 10^{5} + 500(1.4^2 - ${sfStr(v2, 3)}^2) - 1000 \times 9.81 \times 3.0 = ${sciTex(p2)}\ \text{Pa}$.` }),
        ] }),
        P.group({ label: "(d)", stem: "For Part 2, calculate:", parts: [
          P.num({ label: "(i)", marks: 3, stem: t`the speed in the wide section, in $\text{m s}^{-1}$, to three significant figures`, value: u1, unit: "m/s", wrong: [Math.sqrt((2 * dpV) / rho)], explanation: t`$\Delta p = \tfrac{1}{2}\rho v_1^2\left[\left(\dfrac{A_1}{A_2}\right)^2 - 1\right] = 500 \times 8\,v_1^2$, so $v_1 = \sqrt{\dfrac{4500}{4000}} = ${sfStr(u1, 3)}\ \text{m s}^{-1}$.` }),
          P.num({ label: "(ii)", marks: 2, stem: t`the volume flow rate, in $\text{m}^3\ \text{s}^{-1}$, to three significant figures`, value: Av1 * u1, wrong: [Av2 * u1], explanation: t`$Q = A_1v_1 = 1.2 \times 10^{-3} \times ${sfStr(u1, 3)} = ${sciTex(Av1 * u1)}\ \text{m}^3\ \text{s}^{-1}$.` }),
        ] }),
      ]),
      explanation: "Continuity A₁v₁ = A₂v₂; Bernoulli p + ½ρv² + ρgh constant along a streamline.",
      hints: ["Find the speeds from continuity first.", "Include ρgh when the pipe rises."],
    });
    chk(Q, 6.3e-3, 1e-12);
  }
});
