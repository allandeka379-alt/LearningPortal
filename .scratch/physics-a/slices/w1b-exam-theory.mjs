// W1b: THEORY10 exam-format items (ZIMSEC P2 / Cambridge P2 for AS concepts, Cambridge P4 for A Level concepts).
// 4 AS (forces, pressure, energy/power, solids) + 2 A (circular motion). All concepts are covered by both syllabi.
import { concept, P, t, chk, DATA, EXAM, checkExam, sfStr, dpStr, sciTex, rad, deg } from "../lib.mjs";

const g = DATA.g;
const A = (k) => `aphys.${k}`;
const area = (d) => (Math.PI * d * d) / 4;

concept(A("forces.equilibrium"), { file: "exam/w1b-theory", keyPrefix: "exam.w1b-theory" }, (b) => {
  const plan = { examStyle: true, skill: EXAM.THEORY10.skill, secs: EXAM.THEORY10.secs, calculator: true };

  // T1 (AS): a drawbridge-style hinged beam held by a cable.
  {
    const L = 3.0, W = 600, th = 50, xLoad = 2.4, load = 400;
    const T = (W * (L / 2) + load * xLoad) / (L * Math.sin(rad(th)));
    const H = T * Math.cos(rad(th));
    const V = W + load - T * Math.sin(rad(th));
    b.struct({
      ...plan, d: 4, paper: "ZIMSEC P2 / Cambridge P2",
      concepts: [A("forces.equilibrium"), A("forces.moments-couples")],
      stem: t`A uniform footbridge plank AB of length $3.0\ \text{m}$ and weight $600\ \text{N}$ is hinged to a river bank at A and held horizontal by a cable from B to the top of a post above A. The cable makes $${th}^\circ$ with the plank. A man of weight $400\ \text{N}$ stands $${xLoad}\ \text{m}$ from A.`,
      parts: checkExam(EXAM.THEORY10, [
        P.manual({ label: "(a)", marks: 2, stem: "State the two conditions for the plank to be in equilibrium.", points: ["The resultant force on it is zero.", "The resultant torque (moment) about any point is zero."], modelAnswer: "There is no resultant force on the plank, and there is no resultant moment about any point." }),
        P.num({ label: "(b)", marks: 3, stem: "By taking moments about A, calculate the tension in the cable, in N, to three significant figures.", value: T, unit: "N", wrong: [(W * (L / 2) + load * xLoad) / (L * Math.cos(rad(th)))],
          explanation: t`Clockwise about A: $600 \times 1.5 + 400 \times ${xLoad} = ${W * 1.5 + load * xLoad}\ \text{N m}$. Anticlockwise: $T \times 3.0\sin ${th}^\circ$. $T = ${sfStr(T, 3)}\ \text{N}$.` }),
        P.group({ label: "(c)", stem: "Calculate the components of the force exerted by the hinge on the plank, in N, to three significant figures.", parts: [
          P.num({ label: "(i)", marks: 1, stem: "horizontal component", value: H, unit: "N", wrong: [T * Math.sin(rad(th))], explanation: t`$H = T\cos ${th}^\circ = ${sfStr(H, 3)}\ \text{N}$, away from the post.` }),
          P.num({ label: "(ii)", marks: 2, stem: "vertical component (upwards positive)", value: V, unit: "N", wrong: [W + load], explanation: t`$V = 600 + 400 - T\sin ${th}^\circ = ${sfStr(V, 3)}\ \text{N}$.` }),
        ] }),
        P.manual({ label: "(d)", marks: 2, stem: "The man walks slowly from A towards B. Explain how the tension in the cable changes.", points: ["His moment about A increases as his distance from A increases.", "The cable's moment about A must increase to balance it, and its perpendicular distance from A is fixed, so the tension increases (linearly with his distance)."], modelAnswer: "As he moves away from A his weight has a larger moment about A. The cable's moment must increase to balance it; its perpendicular distance from A does not change, so the tension increases steadily." }),
      ]),
      explanation: "Moments about the hinge give the tension; resolving gives the hinge force.",
      hints: ["Take moments about A to eliminate the hinge force.", "Perpendicular distance of the cable from A = 3.0 sin 50°."],
    });
  }

  // T2 (AS): a floating buoy and hydrostatic pressure.
  {
    const r = 0.30, H = 1.20, m = 140, rho = 1025, p0 = 1.01e5;
    const Ab = Math.PI * r * r;
    const d = m / (rho * Ab);
    const pBottom = p0 + rho * g * d;
    const extra = rho * Ab * (H - d);
    b.struct({
      ...plan, d: 4, paper: "ZIMSEC P2 / Cambridge P2",
      concepts: [A("forces.density-pressure-upthrust")],
      stem: t`A navigation buoy is a closed vertical cylinder of radius $0.30\ \text{m}$, height $1.20\ \text{m}$ and mass $140\ \text{kg}$. It floats upright in sea water of density $${rho}\ \text{kg m}^{-3}$. Atmospheric pressure is $1.01 \times 10^{5}\ \text{Pa}$.`,
      parts: checkExam(EXAM.THEORY10, [
        P.manual({ label: "(a)", marks: 2, stem: "Explain, in terms of pressure, the origin of the upthrust on the buoy.", points: ["Pressure in a fluid increases with depth (p = ρgh).", "The pressure on the bottom face is greater than on the top, so there is a resultant upward force."], modelAnswer: "Pressure in the water increases with depth, so the water pushes up on the bottom of the buoy harder than it (or the air) pushes down on the top: the resultant upward force is the upthrust." }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the depth to which the buoy floats, in m, to three significant figures.", value: d, unit: "m", wrong: [m / (1000 * Ab)], explanation: t`Upthrust = weight: $\rho g (\pi r^2 d) = mg$, so $d = \dfrac{140}{${rho} \times \pi \times 0.30^2} = ${sfStr(d, 3)}\ \text{m}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the total pressure on the bottom of the buoy, in Pa, to three significant figures.", value: pBottom, unit: "Pa", wrong: [rho * g * d], explanation: t`$p = p_0 + \rho g d = 1.01 \times 10^{5} + ${rho} \times 9.81 \times ${sfStr(d, 3)} = ${sciTex(pBottom)}\ \text{Pa}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the largest extra mass of equipment that can be fixed to the top of the buoy before it sinks, in kg, to three significant figures.", value: extra, unit: "kg", wrong: [rho * Ab * H], explanation: t`Fully submerged it displaces $\pi r^2 H$; extra mass $= \rho\pi r^2 (H - d) = ${sfStr(extra, 3)}\ \text{kg}$.` }),
        P.manual({ label: "(e)", marks: 2, stem: "The buoy drifts from the sea into a fresh-water estuary. State and explain what happens to the depth at which it floats.", points: ["It floats deeper (lower).", "Fresh water is less dense, so a larger volume must be displaced to give an upthrust equal to the (unchanged) weight."], modelAnswer: "It floats lower in the water: the weight is unchanged, but fresh water is less dense, so a larger volume must be displaced to produce the same upthrust." }),
      ]),
      explanation: "Floating: upthrust = weight; the pressure at depth is p₀ + ρgh.",
      hints: ["Floating means upthrust equals weight.", "Displaced volume = πr² × depth."],
    });
  }

  // T3 (AS): power of a haulage truck on an incline, P = Fv, efficiency.
  {
    const m = 3.6e4, sinA = 0.04, v = 15, R = 5200, eff = 0.38;
    const F = R + m * g * sinA;
    const Pout = F * v;
    b.struct({
      ...plan, d: 3, paper: "ZIMSEC P2 / Cambridge P2",
      concepts: [A("energy.power"), A("energy.work-conservation-efficiency")],
      stem: t`A haulage truck of total mass $3.6 \times 10^{4}\ \text{kg}$ climbs a long straight hill at a constant speed of $15\ \text{m s}^{-1}$. The road rises $4.0\ \text{m}$ for every $100\ \text{m}$ travelled along it. The total resistive force on the truck is $5200\ \text{N}$.`,
      parts: checkExam(EXAM.THEORY10, [
        P.manual({ label: "(a)", marks: 1, stem: "Define power.", points: ["Work done (or energy transferred) per unit time."], modelAnswer: "Power is the work done per unit time." }),
        P.manual({ label: "(b)", marks: 2, stem: "Show that the power developed by a force F moving its point of application at a constant velocity v in the direction of the force is Fv.", points: ["P = W/t and W = F × s (displacement in the direction of the force).", "P = F s/t = Fv since s/t = v."], modelAnswer: "Power = work done ÷ time = (F × s)/t; since s/t is the velocity v, P = Fv." }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the driving force on the truck, in N, to three significant figures.", value: F, unit: "N", wrong: [R], explanation: t`Weight component down the slope $= mg\sin\theta = 3.6 \times 10^{4} \times 9.81 \times 0.040 = ${sfStr(m * g * sinA, 4)}\ \text{N}$. Driving force $= 5200 + ${sfStr(m * g * sinA, 4)} = ${sfStr(F, 3)}\ \text{N}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the useful power output of the engine, in W, to three significant figures.", value: Pout, unit: "W", wrong: [R * v], explanation: t`$P = Fv = ${sfStr(F, 4)} \times 15 = ${sciTex(Pout)}\ \text{W}$.` }),
        P.num({ label: "(e)", marks: 1, stem: "The engine is 38% efficient. Calculate the rate at which energy is supplied by the fuel, in W, to three significant figures.", value: Pout / eff, unit: "W", wrong: [Pout * eff], explanation: t`$P_{\text{in}} = \dfrac{${sciTex(Pout)}}{0.38} = ${sciTex(Pout / eff)}\ \text{W}$.` }),
        P.manual({ label: "(f)", marks: 2, stem: "At the top of the hill the road becomes level and the engine keeps the same power output. Explain what happens to the speed of the truck.", points: ["The weight component is no longer opposing motion, so the driving force P/v exceeds the resistive force and the truck accelerates.", "As speed rises, P/v falls and resistance rises until they are equal: the truck reaches a new, higher constant speed."], modelAnswer: "On the level the slope component disappears, so the driving force P/v is larger than the resistive force and the truck accelerates. As it speeds up the driving force falls and the resistance rises until they balance at a new, higher steady speed." }),
      ]),
      explanation: "Driving force = resistance + mg sin θ; power = Fv; input = output ÷ efficiency.",
      hints: ["Find the component of weight along the slope.", "P = Fv with the driving force."],
    });
  }

  // T4 (AS): steel guy wire: stress, strain, extension, strain energy, plastic deformation.
  {
    const L = 12.0, d = 4.0e-3, Tn = 2.5e3, E = 2.0e11;
    const Aw = area(d);
    const s = Tn / Aw, e = s / E, x = e * L;
    const En = 0.5 * Tn * x;
    b.struct({
      ...plan, d: 4, paper: "ZIMSEC P2 / Cambridge P2",
      concepts: [A("solids.stress-strain-young"), A("solids.elastic-plastic-energy")],
      stem: t`A steel guy wire supporting a radio mast is $12.0\ \text{m}$ long and $4.0\ \text{mm}$ in diameter. Its tension is $2.5 \times 10^{3}\ \text{N}$. The Young modulus of the steel is $2.0 \times 10^{11}\ \text{Pa}$, and the wire obeys Hooke's law.`,
      parts: checkExam(EXAM.THEORY10, [
        P.manual({ label: "(a)", marks: 2, stem: "Define tensile stress and tensile strain.", points: ["Tensile stress: (tensile) force per unit cross-sectional area.", "Tensile strain: extension per unit original length."], modelAnswer: "Tensile stress is the tensile force per unit cross-sectional area; tensile strain is the extension per unit original length." }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the stress in the wire, in Pa, to three significant figures.", value: s, unit: "Pa", wrong: [Tn / (Math.PI * d * d)], explanation: t`$A = \pi(2.0 \times 10^{-3})^2 = ${sciTex(Aw)}\ \text{m}^2$; $\sigma = 2500/${sciTex(Aw)} = ${sciTex(s)}\ \text{Pa}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the extension of the wire, in m, to three significant figures.", value: x, unit: "m", wrong: [e], explanation: t`$\varepsilon = \sigma/E = ${sciTex(e)}$; $x = \varepsilon L = ${sciTex(x)}\ \text{m}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the elastic potential energy stored in the wire, in J, to three significant figures.", value: En, unit: "J", wrong: [Tn * x], explanation: t`$E_P = \tfrac{1}{2}Fx = \tfrac{1}{2} \times 2500 \times ${sciTex(x)} = ${sfStr(En, 3)}\ \text{J}$.` }),
        P.manual({ label: "(e)", marks: 2, stem: "During a storm the tension rises so much that the wire is stretched beyond its elastic limit. Describe and explain what is observed when the storm passes.", points: ["The wire does not return to its original length: it has a permanent extension (it sags/becomes slack).", "Beyond the elastic limit, layers of atoms slip (plastic deformation), and these do not move back when the load is reduced."], modelAnswer: "When the tension falls the wire keeps a permanent extension, so it is slacker than before. Beyond the elastic limit layers of atoms slid past one another and these new positions remain when the load is removed." }),
      ]),
      explanation: "σ = F/A, ε = σ/E, x = εL and Ep = ½Fx within the limit of proportionality.",
      hints: ["Area = πd²/4 with d in metres.", "Strain = stress ÷ Young modulus."],
    });
  }

  // T5 (A): a car on a flat bend and over a hump.
  {
    const m = 1100, r = 45, v = 13, muMax = 0.62, rh = 30, vh = 12;
    const F = (m * v * v) / r;
    const vmax = Math.sqrt(muMax * g * r);
    const N = m * g - (m * vh * vh) / rh;
    b.struct({
      ...plan, d: 4, paper: "ZIMSEC P2 / Cambridge P4",
      concepts: [A("circular.centripetal-force"), A("circular.angular-speed")],
      stem: t`A car of mass $1100\ \text{kg}$ travels at a constant speed of $13\ \text{m s}^{-1}$ round a flat, horizontal bend that is an arc of a circle of radius $45\ \text{m}$.`,
      parts: checkExam(EXAM.THEORY10, [
        P.manual({ label: "(a)", marks: 2, stem: "Explain why the car is accelerating even though its speed is constant.", points: ["Velocity is a vector; its direction is changing continuously.", "So the velocity changes, which is an acceleration (directed towards the centre of the bend)."], modelAnswer: "Velocity is a vector and the direction of the car's motion keeps changing, so its velocity changes: it has an acceleration, towards the centre of the bend." }),
        P.num({ label: "(b)", marks: 1, stem: t`Calculate the angular speed of the car about the centre of the bend, in $\text{rad s}^{-1}$, to three significant figures.`, value: v / r, unit: "rad/s", wrong: [r / v], explanation: t`$\omega = v/r = 13/45 = ${sfStr(v / r, 3)}\ \text{rad s}^{-1}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the centripetal force on the car, in N, to three significant figures.", value: F, unit: "N", wrong: [(m * v) / r], explanation: t`$F = \dfrac{mv^2}{r} = \dfrac{1100 \times 13^2}{45} = ${sciTex(F)}\ \text{N}$, provided by friction.` }),
        P.num({ label: "(d)", marks: 2, stem: t`The maximum sideways friction is $0.62$ times the car's weight. Calculate the greatest speed at which it can take the bend, in $\text{m s}^{-1}$, to three significant figures.`, value: vmax, unit: "m/s", wrong: [muMax * g * r], explanation: t`$\dfrac{mv^2}{r} = 0.62mg \Rightarrow v = \sqrt{0.62 \times 9.81 \times 45} = ${sfStr(vmax, 3)}\ \text{m s}^{-1}$.` }),
        P.num({ label: "(e)", marks: 2, stem: t`Later the car crosses the top of a hump of radius $30\ \text{m}$ at $12\ \text{m s}^{-1}$. Calculate the normal contact force of the road on the car at the top, in N, to three significant figures.`, value: N, unit: "N", wrong: [m * g + (m * vh * vh) / rh], explanation: t`$mg - N = \dfrac{mv^2}{r}$: $N = 1100 \times 9.81 - \dfrac{1100 \times 12^2}{30} = ${sciTex(N)}\ \text{N}$.` }),
        P.manual({ label: "(f)", marks: 1, stem: "Explain why the passengers feel lighter at the top of the hump.", points: ["The normal (contact) force on them is less than their weight, because part of their weight provides the centripetal force."], modelAnswer: "The seat pushes up on them with less than their weight, because part of their weight is used to provide the centripetal force towards the centre below." }),
      ]),
      explanation: "Friction provides mv²/r on the flat bend; at the top of a hump, mg − N = mv²/r.",
      hints: ["Which real force points to the centre on the flat bend?", "At the top of the hump the centre is below the car."],
    });
  }

  // T6 (A): a fairground swing (conical pendulum) and a vertical loop.
  {
    const L = 6.0, Tp = 4.2, m = 60;
    const w = (2 * Math.PI) / Tp;
    const cosT = g / (L * w * w);
    const th = deg(Math.acos(cosT));
    const Tens = m * L * w * w;
    const r = L * Math.sin(Math.acos(cosT));
    b.struct({
      ...plan, d: 4, paper: "ZIMSEC P2 / Cambridge P4",
      concepts: [A("circular.centripetal-force"), A("circular.angular-speed")],
      stem: t`On a fairground ride, each seat hangs from a chain $6.0\ \text{m}$ long attached to the edge of a rotating roof. Treat each seat and rider (total mass $60\ \text{kg}$) as a conical pendulum whose chain is attached to a fixed point on the axis; it makes one revolution every $${Tp}\ \text{s}$.`,
      parts: checkExam(EXAM.THEORY10, [
        P.manual({ label: "(a)", marks: 1, stem: "Define the radian.", points: ["The angle subtended at the centre of a circle by an arc equal in length to the radius."], modelAnswer: "The angle subtended at the centre of a circle by an arc equal in length to the radius." }),
        P.num({ label: "(b)", marks: 1, stem: t`Calculate the angular speed, in $\text{rad s}^{-1}$, to three significant figures.`, value: w, unit: "rad/s", wrong: [1 / Tp], explanation: t`$\omega = 2\pi/${Tp} =${sfStr(w, 3)}\ \text{rad s}^{-1}$.` }),
        P.manual({ label: "(c)", marks: 2, stem: t`Show that the tension in the chain is $T = mL\omega^2$, where $L$ is the chain length.`, points: [t`Horizontally: $T\sin\theta = mr\omega^2$, where $r = L\sin\theta$ is the radius of the circle.`, t`So $T\sin\theta = mL\sin\theta\,\omega^2$ and $T = mL\omega^2$.`], modelAnswer: t`The horizontal component of tension provides the centripetal force: $T\sin\theta = mr\omega^2$ with $r = L\sin\theta$. Cancelling $\sin\theta$ gives $T = mL\omega^2$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the tension in the chain, in N, to three significant figures.", value: Tens, unit: "N", wrong: [m * g], explanation: t`$T = mL\omega^2 = 60 \times 6.0 \times ${sfStr(w, 3)}^2 = ${sfStr(Tens, 3)}\ \text{N}$.` }),
        P.num({ label: "(e)", marks: 2, stem: "Calculate the angle between the chain and the vertical, in degrees, to three significant figures.", value: th, unit: "°", wrong: [90 - th], explanation: t`$T\cos\theta = mg \Rightarrow \cos\theta = \dfrac{mg}{T} = \dfrac{g}{L\omega^2} = ${dpStr(cosT, 4)}$, so $\theta = ${sfStr(th, 3)}^\circ$.` }),
        P.num({ label: "(f)", marks: 2, stem: "Calculate the speed of the rider, in m/s, to three significant figures.", value: r * w, unit: "m/s", wrong: [L * w], explanation: t`$r = L\sin\theta = ${sfStr(r, 3)}\ \text{m}$; $v = r\omega = ${sfStr(r * w, 3)}\ \text{m s}^{-1}$. Using $L$ as the radius overestimates it.` }),
      ]),
      explanation: "Horizontal component of tension = mrω² with r = L sin θ, giving T = mLω²; the vertical component balances the weight.",
      hints: ["The radius of the circle is L sin θ, not L.", "Resolve the tension vertically to find θ."],
    });
  }
});
