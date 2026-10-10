// W1a: six THEORY10 items (ZIMSEC P2, Cambridge P2 — AS content): kinematics, projectiles, Newton's laws, momentum,
// measurement and uncertainties, drag. Every concept is covered by both syllabi, so no `applies`.
import { concept, P, t as raw, chk, sfStr, dpStr, table, EXAM, checkExam, pctUnc, DATA, rad } from "../lib.mjs";

// String.raw keeps "\n" literally: turn \n (not followed by a lower-case letter, so \nu and \neq survive) into a newline.
const t = (s, ...v) => raw(s, ...v).replace(/\\n(?![a-z])/g, "\n");

const A = (k) => `aphys.${k}`;
const g = DATA.g;
const PLAN = EXAM.THEORY10;
const common = { skill: PLAN.skill, secs: PLAN.secs, examStyle: true, paper: "Paper 2", calculator: true };

concept(A("kinematics.suvat"), { file: "exam/w1a-theory", keyPrefix: "exam.w1a-theory" }, (b) => {
  // T1: a train journey (motion graphs + suvat).
  {
    const a1 = 18 / 45;
    const s = 0.5 * 45 * 18 + 120 * 18 + 0.5 * 30 * 18;
    const avg = s / 195;
    const dec = 18 / 30;
    chk(s, 2835);
    b.struct({
      ...common, d: 3,
      concepts: [A("kinematics.motion-graphs"), A("kinematics.suvat")],
      stem: t`A train leaves a station in Bulawayo. It accelerates uniformly from rest to $18\ \text{m s}^{-1}$ in $45\ \text{s}$, travels at $18\ \text{m s}^{-1}$ for $120\ \text{s}$, and then decelerates uniformly to rest at the next station in $30\ \text{s}$.`,
      parts: checkExam(PLAN, [
        P.manual({ label: "(a)", marks: 1, stem: "Define acceleration.", points: ["Rate of change of velocity (change in velocity per unit time)"], modelAnswer: "Acceleration is the rate of change of velocity." }),
        P.num({ label: "(b)", marks: 1, stem: t`Calculate the acceleration during the first $45\ \text{s}$, in $\text{m s}^{-2}$.`, value: a1, unit: "m/s²", explanation: t`$a = 18/45 = ${sfStr(a1, 2)}\ \text{m s}^{-2}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the distance between the two stations, in m.", value: s, unit: "m", wrong: [18 * 195], explanation: t`Area under the $v$-$t$ graph: $\tfrac{1}{2}(45)(18) + (120)(18) + \tfrac{1}{2}(30)(18) = 405 + 2160 + 270 = ${s}\ \text{m}$.` }),
        P.num({ label: "(d)", marks: 2, stem: t`Calculate the average speed for the journey, in $\text{m s}^{-1}$.`, value: avg, unit: "m/s", wrong: [9], explanation: t`$${s}/195 = ${sfStr(avg, 3)}\ \text{m s}^{-1}$. ($9\ \text{m s}^{-1}$, the mean of 0 and 18, ignores the long constant-speed stage.)` }),
        P.num({ label: "(e)", marks: 1, stem: t`Calculate the magnitude of the deceleration, in $\text{m s}^{-2}$.`, value: dec, unit: "m/s²", explanation: t`$18/30 = ${sfStr(dec, 2)}\ \text{m s}^{-2}$.` }),
        P.manual({ label: "(f)", marks: 2, stem: "In practice the deceleration is not uniform: it is small at first and increases as the train nears the platform. Describe how the final section of the velocity-time graph would differ from a straight line, and state how the distance travelled while braking could still be found.", points: ["The graph curves: shallow gradient at first, becoming steeper (gradient = deceleration increasing) as it reaches zero", "The distance is still the area under the (curved) graph, found by counting squares or splitting into strips"], modelAnswer: "The final section would be a curve that starts with a small negative gradient and becomes steeper until it meets the time axis, because the gradient is the acceleration. The braking distance is still the area under the curve, found by counting squares or dividing it into narrow strips." }),
        P.mcq({ label: "(g)", stem: "For the first 45 s, which graph would be a straight line through the origin?", options: [["distance travelled against (time)²", "Correct: from rest s = ½at², so s ∝ t²."], ["distance travelled against time", "s is proportional to t², so this graph curves upwards."], ["velocity against (time)²", "v = at is proportional to t, not t²."], ["acceleration against time", "The acceleration is constant: a horizontal line, not through the origin."]], answer: "A", explanation: t`From rest with uniform acceleration $s = \tfrac{1}{2}at^2$: $s$ against $t^2$ is a straight line through the origin of gradient $a/2$.` }),
      ]),
      explanation: t`Gradients give the accelerations (${sfStr(a1, 2)} and $-${sfStr(dec, 2)}\ \text{m s}^{-2}$); the area gives ${s} m, an average speed of $${sfStr(avg, 3)}\ \text{m s}^{-1}$.`,
      hints: ["Acceleration = gradient; distance = area under the v-t graph.", "Average speed = total distance ÷ total time."],
    });
  }

  // T2: projectile from a roof.
  {
    const u = 15;
    const th = 30;
    const h0 = 22;
    const ux = u * Math.cos(rad(th));
    const uy = u * Math.sin(rad(th));
    const H = h0 + uy ** 2 / (2 * g);
    const T = (uy + Math.sqrt(uy ** 2 + 2 * g * h0)) / g;
    const R = ux * T;
    console.log("theory T2", ux, uy, H, T, R);
    b.struct({
      ...common, d: 4,
      concepts: [A("kinematics.projectiles")],
      stem: t`A ball is thrown from the edge of a flat roof $22\ \text{m}$ above level ground with a velocity of $15\ \text{m s}^{-1}$ at $30^\circ$ above the horizontal. Air resistance is negligible; $g = 9.81\ \text{m s}^{-2}$.`,
      parts: checkExam(PLAN, [
        P.manual({ label: "(a)", marks: 1, stem: "State why the horizontal component of the ball's velocity remains constant.", points: ["No horizontal force acts (weight is vertical, air resistance negligible), so there is no horizontal acceleration"], modelAnswer: "The only force on the ball is its weight, which is vertical, so there is no horizontal force and no horizontal acceleration." }),
        P.group({ label: "(b)", stem: "Calculate the initial", parts: [
          P.num({ label: "(i)", marks: 1, stem: t`horizontal component of velocity, in $\text{m s}^{-1}$;`, value: ux, unit: "m/s", wrong: [uy], explanation: t`$15\cos 30^\circ = ${sfStr(ux, 3)}\ \text{m s}^{-1}$.` }),
          P.num({ label: "(ii)", marks: 1, stem: t`vertical component of velocity, in $\text{m s}^{-1}$.`, value: uy, unit: "m/s", wrong: [ux], explanation: t`$15\sin 30^\circ = 7.5\ \text{m s}^{-1}$.` }),
        ] }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the maximum height of the ball above the ground, in m.", value: H, unit: "m", wrong: [uy ** 2 / (2 * g)], explanation: t`Rise above the roof: $\dfrac{7.5^2}{2 \times 9.81} = ${sfStr(uy ** 2 / (2 * g), 3)}\ \text{m}$; height above ground $= 22 + ${sfStr(uy ** 2 / (2 * g), 3)} = ${sfStr(H, 3)}\ \text{m}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the time from release until the ball hits the ground, in s.", value: T, unit: "s", wrong: [(2 * uy) / g], explanation: t`Upwards positive, $s = -22\ \text{m}$: $-22 = 7.5t - 4.905t^2$, so $t = \dfrac{7.5 + \sqrt{7.5^2 + 4(4.905)(22)}}{9.81} = ${sfStr(T, 3)}\ \text{s}$.` }),
        P.num({ label: "(e)", marks: 1, stem: "Calculate the horizontal distance from the building to where the ball lands, in m.", value: R, unit: "m", wrong: [u * T], explanation: t`$${sfStr(ux, 3)} \times ${sfStr(T, 3)} = ${sfStr(R, 3)}\ \text{m}$.` }),
        P.manual({ label: "(f)", marks: 2, stem: "Suggest how air resistance would change the maximum height and the horizontal distance, and explain why.", points: ["Both are smaller: the maximum height is lower and the ball lands closer to the building", "Air resistance opposes the velocity, so it reduces the vertical component on the way up and the horizontal component throughout"], modelAnswer: "The maximum height and the horizontal distance would both be smaller. Air resistance acts against the velocity, so on the way up it adds to the downward force, slowing the rise, and it continuously reduces the horizontal velocity, so the ball lands closer to the building." }),
      ]),
      explanation: t`Components ${sfStr(ux, 3)} and 7.5 m s⁻¹; maximum height ${sfStr(H, 3)} m; flight time ${sfStr(T, 3)} s; range ${sfStr(R, 3)} m.`,
      hints: ["Resolve the launch velocity first.", "The ground is 22 m below the launch point: s = −22 m."],
    });
  }

  // T3: box on a smooth ramp connected to a hanging mass.
  {
    const mBox = 6;
    const mHang = 4;
    const comp = mBox * g * Math.sin(rad(30));
    const a = (mHang * g - comp) / (mBox + mHang);
    const T = mHang * (g - a);
    const v = Math.sqrt(2 * a * 0.8);
    console.log("theory T3", comp, a, T, v);
    b.struct({
      ...common, d: 4,
      concepts: [A("dynamics.newtons-laws"), A("measurement.scalars-vectors")],
      stem: t`A $6.0\ \text{kg}$ box rests on a smooth ramp inclined at $30^\circ$ to the horizontal. A light string parallel to the ramp passes over a smooth pulley at the top and supports a hanging $4.0\ \text{kg}$ mass. The system is released from rest; the hanging mass falls and the box moves up the ramp. Take $g = 9.81\ \text{m s}^{-2}$.`,
      parts: checkExam(PLAN, [
        P.mcq({ label: "(a)", stem: "Which force is the Newton's third-law partner of the pull of the string on the box?", options: [["the pull of the box on the string", "Correct: same type, equal and opposite, on the other body."], ["the component of the box's weight down the ramp", "This acts on the box itself and is gravitational, not a contact force from the string."], ["the weight of the hanging mass", "This acts on the hanging mass and is gravitational."], ["the normal contact force of the ramp on the box", "This acts on the box and is perpendicular to the ramp."]], answer: "A", explanation: "Third-law partners act on different bodies and are of the same type: string on box ↔ box on string." }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate the component of the box's weight acting down the ramp, in N.", value: comp, unit: "N", wrong: [mBox * g * Math.cos(rad(30))], explanation: t`$6.0 \times 9.81 \times \sin 30^\circ = ${sfStr(comp, 3)}\ \text{N}$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Calculate the acceleration of the system, in $\text{m s}^{-2}$.`, value: a, unit: "m/s²", wrong: [(mHang * g) / (mBox + mHang), (mHang * g - comp) / mHang], explanation: t`Resultant on the system $= 4.0 \times 9.81 - ${sfStr(comp, 3)} = ${sfStr(mHang * g - comp, 3)}\ \text{N}$; $a = ${sfStr(mHang * g - comp, 3)}/10.0 = ${sfStr(a, 3)}\ \text{m s}^{-2}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the tension in the string, in N.", value: T, unit: "N", wrong: [mHang * g], explanation: t`Hanging mass: $mg - T = ma$, so $T = 4.0(9.81 - ${sfStr(a, 3)}) = ${sfStr(T, 3)}\ \text{N}$. Check with the box: $T - ${sfStr(comp, 3)} = 6.0 \times ${sfStr(a, 3)}$.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain why the tension in the string is less than the weight of the hanging mass.", points: ["The hanging mass accelerates downwards, so the resultant force on it must be downwards", "So its weight must be greater than the upward tension (T = m(g − a))"], modelAnswer: "The hanging mass accelerates downwards, so by Newton's second law the resultant force on it is downwards. The upward tension must therefore be smaller than its weight: T = m(g − a)." }),
        P.num({ label: "(f)", marks: 2, stem: t`Calculate the speed of the box after it has moved $0.80\ \text{m}$ up the ramp from rest, in $\text{m s}^{-1}$.`, value: v, unit: "m/s", wrong: [2 * a * 0.8], explanation: t`$v^2 = 0 + 2(${sfStr(a, 3)})(0.80)$, so $v = ${sfStr(v, 3)}\ \text{m s}^{-1}$.` }),
      ]),
      explanation: t`Resolve the box's weight along the ramp (${sfStr(comp, 3)} N); the system's acceleration is $${sfStr(a, 3)}\ \text{m s}^{-2}$ and the tension ${sfStr(T, 3)} N.`,
      hints: ["Treat the box and hanging mass as one system for the acceleration.", "Only the component of the box's weight along the ramp opposes the motion."],
    });
  }

  // T4: a collision of two trolleys moving towards each other.
  {
    const mA = 0.6;
    const mB = 0.25;
    const uA = 0.9;
    const uB = -0.5;
    const vA = 0.12;
    const vB = (mA * uA + mB * uB - mA * vA) / mB;
    const keB = 0.5 * mA * uA ** 2 + 0.5 * mB * uB ** 2;
    const keA = 0.5 * mA * vA ** 2 + 0.5 * mB * vB ** 2;
    const F = (mB * (vB - uB)) / 0.04;
    console.log("theory T4", vB, keB, keA, keB - keA, F);
    b.struct({
      ...common, d: 3,
      concepts: [A("dynamics.conservation-momentum"), A("dynamics.momentum-force")],
      stem: t`On a level, frictionless track, trolley A ($0.60\ \text{kg}$) moves to the right at $0.90\ \text{m s}^{-1}$ and trolley B ($0.25\ \text{kg}$) moves to the left at $0.50\ \text{m s}^{-1}$. They collide head-on and are in contact for $0.040\ \text{s}$. Afterwards A moves to the right at $0.12\ \text{m s}^{-1}$.`,
      parts: checkExam(PLAN, [
        P.manual({ label: "(a)", marks: 2, stem: "State the principle of conservation of momentum.", points: ["The total momentum of a system remains constant", "provided no resultant external force acts on it"], modelAnswer: "The total momentum of a system of interacting bodies is constant, provided no resultant external force acts on the system." }),
        P.num({ label: "(b)", marks: 2, stem: t`Calculate the velocity of B after the collision, in $\text{m s}^{-1}$ (positive to the right).`, value: vB, unit: "m/s", wrong: [(mA * uA + mB * 0.5 - mA * vA) / mB], explanation: t`Right positive: $0.60(0.90) + 0.25(-0.50) = 0.60(0.12) + 0.25v_B$, so $0.415 = 0.072 + 0.25v_B$ and $v_B = ${sfStr(vB, 3)}\ \text{m s}^{-1}$ (to the right). Ignoring B's initial direction gives ${sfStr((mA * uA + mB * 0.5 - mA * vA) / mB, 3)}.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the total kinetic energy transferred to other forms in the collision, in J.", value: keB - keA, unit: "J", explanation: t`Before: $\tfrac{1}{2}(0.60)(0.90)^2 + \tfrac{1}{2}(0.25)(0.50)^2 = ${sfStr(keB, 3)}\ \text{J}$. After: $\tfrac{1}{2}(0.60)(0.12)^2 + \tfrac{1}{2}(0.25)(${sfStr(vB, 3)})^2 = ${sfStr(keA, 3)}\ \text{J}$. Transferred: $${sfStr(keB - keA, 3)}\ \text{J}$.` }),
        P.mcq({ label: "(d)", stem: "What type of collision is this?", options: [["inelastic, because the total kinetic energy decreased", "Correct: kinetic energy is not conserved."], ["elastic, because momentum was conserved", "Momentum is conserved in every collision of a closed system; elastic means kinetic energy is conserved too."], ["elastic, because the trolleys did not stick together", "Not sticking does not make a collision elastic."], ["perfectly inelastic, because the trolleys moved off together", "They moved off with different velocities."]], answer: "A", explanation: "The kinetic energy fell, so the collision is inelastic (but not perfectly inelastic, as the trolleys separate)." }),
        P.num({ label: "(e)", marks: 2, stem: "Calculate the average force exerted on B during the collision, in N.", value: F, unit: "N", wrong: [(mB * (vB - 0.4)) / 0.04], explanation: t`$\Delta p_B = 0.25(${sfStr(vB, 3)} - (-0.50)) = ${sfStr(mB * (vB - uB), 3)}\ \text{N s}$; $F = ${sfStr(mB * (vB - uB), 3)}/0.040 = ${sfStr(F, 3)}\ \text{N}$ to the right.` }),
        P.manual({ label: "(f)", marks: 1, stem: "State the magnitude and direction of the average force exerted on A during the collision.", points: [`${sfStr(F, 3)} N to the left (equal and opposite, Newton's third law)`], modelAnswer: `${sfStr(F, 3)} N to the left: by Newton's third law the force of B on A is equal and opposite to the force of A on B.` }),
      ]),
      explanation: t`Momentum gives $v_B = ${sfStr(vB, 3)}\ \text{m s}^{-1}$; ${sfStr(keB - keA, 3)} J of kinetic energy is transferred (inelastic); the force on B is ${sfStr(F, 3)} N, equal and opposite to that on A.`,
      hints: ["Give B's initial velocity a negative sign.", "Force = change of momentum ÷ contact time."],
    });
  }

  // T5: density of a metal cylinder with uncertainties.
  {
    const d = 2.54;
    const h = 4.0;
    const m = 172.6;
    const V = (Math.PI * d ** 2 * h) / 4;
    const rho = (m / V) * 1000;
    const p = pctUnc(0.1, m) + 2 * pctUnc(0.01, d) + pctUnc(0.01, h);
    const abs = (p / 100) * rho;
    console.log("theory T5", V, rho, p, abs);
    b.struct({
      ...common, d: 3,
      concepts: [A("measurement.errors-uncertainties"), A("measurement.si-units"), A("measurement.instruments")],
      stem: t`Thandeka determines the density of a metal cylinder. Her readings: diameter $d = 2.54 \pm 0.01\ \text{cm}$, length $l = 4.00 \pm 0.01\ \text{cm}$, mass $m = 172.6 \pm 0.1\ \text{g}$. The volume of a cylinder is $\tfrac{1}{4}\pi d^2 l$.`,
      parts: checkExam(PLAN, [
        P.manual({ label: "(a)", marks: 1, stem: "State the SI base units of density.", points: [t`$\text{kg m}^{-3}$`], modelAnswer: t`$\text{kg m}^{-3}$` }),
        P.mcq({ label: "(b)", stem: "Which instrument is most suitable for measuring the diameter of the cylinder to ±0.01 cm?", options: [["vernier calipers", "Correct: resolution 0.1 mm = 0.01 cm, and the jaws fit around a 2.5 cm cylinder."], ["a metre rule", "Its resolution, 0.1 cm, is ten times too coarse."], ["a micrometer screw gauge with a 0–25 mm range", "Its range ends at 25 mm, just below the 25.4 mm diameter."], ["a protractor", "A protractor measures angles."]], answer: "A", explanation: "Vernier calipers read to 0.1 mm (0.01 cm) and have the range needed." }),
        P.num({ label: "(c)", marks: 2, stem: t`Calculate the density of the metal, in $\text{kg m}^{-3}$, to three significant figures.`, value: rho, sf: 3, unit: "kg/m³", wrong: [m / V, (m / (Math.PI * d ** 2 * h)) * 1000], explanation: t`$V = \tfrac{1}{4}\pi(2.54)^2(4.00) = ${sfStr(V, 4)}\ \text{cm}^3$; $\rho = 172.6/${sfStr(V, 4)} = ${sfStr(rho / 1000, 3)}\ \text{g cm}^{-3} = ${sfStr(rho, 3)}\ \text{kg m}^{-3}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the percentage uncertainty in the density, to two significant figures.", value: p, sf: 2, unit: "%", wrong: [pctUnc(0.1, m) + pctUnc(0.01, d) + pctUnc(0.01, h)], explanation: t`$\%\,\Delta m = ${sfStr(pctUnc(0.1, m), 2)}$; $\%\,\Delta d = ${sfStr(pctUnc(0.01, d), 2)}$, doubled: ${sfStr(2 * pctUnc(0.01, d), 2)}; $\%\,\Delta l = 0.25$. Total $= ${sfStr(p, 2)}\,\%$.` }),
        P.num({ label: "(e)", marks: 1, stem: t`Calculate the absolute uncertainty in the density, in $\text{kg m}^{-3}$, to one significant figure.`, value: abs, sf: 1, unit: "kg/m³", explanation: t`$${sfStr(p / 100, 2)} \times ${sfStr(rho, 3)} = ${sfStr(abs, 2)} \approx ${sfStr(abs, 1)}\ \text{kg m}^{-3}$, so $\rho = (8.52 \pm 0.09) \times 10^{3}\ \text{kg m}^{-3}$.` }),
        P.manual({ label: "(f)", marks: 2, stem: "The calipers read 0.03 cm when closed and Thandeka did not correct for this. State the type of error and its effect on her value of the density.", points: ["A systematic (zero) error: every diameter reading is 0.03 cm too large", "So the volume is too large and the calculated density is too small"], modelAnswer: "It is a systematic error (a zero error): every diameter is 0.03 cm too large, so the calculated volume is too large and her density is too small." }),
        P.manual({ label: "(g)", marks: 1, stem: "Suggest why she should measure the diameter at several places and in different directions.", points: ["The cylinder may not be perfectly circular or uniform, so a mean of several readings is more representative"], modelAnswer: "The cylinder may be slightly oval or tapered, so the mean of several readings gives a more representative diameter." }),
      ]),
      explanation: t`$\rho = ${sfStr(rho, 3)}\ \text{kg m}^{-3}$ with ${sfStr(p, 2)} % uncertainty (the squared diameter dominates), i.e. $(8.52 \pm 0.09) \times 10^{3}\ \text{kg m}^{-3}$.`,
      hints: ["Convert g cm⁻³ to kg m⁻³ by multiplying by 1000.", "d is squared: double its percentage uncertainty."],
    });
  }

  // T6: a sphere falling with drag kv².
  {
    const m = 0.012;
    const k = 2.5e-4;
    const W = m * g;
    const a12 = g - (k * 144) / m;
    const vt = Math.sqrt(W / k);
    console.log("theory T6", W, a12, vt);
    b.struct({
      ...common, d: 3,
      concepts: [A("dynamics.drag-terminal-velocity"), A("dynamics.newtons-laws")],
      stem: t`A small plastic sphere of mass $0.012\ \text{kg}$ is dropped from a tall building. The air resistance on it is $D = kv^2$, where $k = 2.5 \times 10^{-4}\ \text{kg m}^{-1}$ and $v$ is its speed. Take $g = 9.81\ \text{m s}^{-2}$.`,
      parts: checkExam(PLAN, [
        P.manual({ label: "(a)", marks: 1, stem: "Define terminal velocity.", points: ["The constant (maximum) velocity reached when the resistive force(s) balance the weight (driving force), so the resultant force is zero"], modelAnswer: "The constant velocity reached when the drag on a falling object equals its weight, so the resultant force and acceleration are zero." }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate the weight of the sphere, in N.", value: W, unit: "N", explanation: t`$0.012 \times 9.81 = ${sfStr(W, 3)}\ \text{N}$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Calculate the acceleration of the sphere when its speed is $12\ \text{m s}^{-1}$, in $\text{m s}^{-2}$.`, value: a12, unit: "m/s²", wrong: [(k * 144) / m], explanation: t`$D = 2.5 \times 10^{-4} \times 12^2 = ${sfStr(k * 144, 3)}\ \text{N}$; $a = \dfrac{${sfStr(W, 3)} - ${sfStr(k * 144, 3)}}{0.012} = ${sfStr(a12, 3)}\ \text{m s}^{-2}$.` }),
        P.num({ label: "(d)", marks: 2, stem: t`Calculate the terminal velocity of the sphere, in $\text{m s}^{-1}$.`, value: vt, unit: "m/s", wrong: [W / k], explanation: t`$kv_t^2 = mg$: $v_t = \sqrt{${sfStr(W, 3)}/(2.5 \times 10^{-4})} = ${sfStr(vt, 3)}\ \text{m s}^{-1}$.` }),
        P.manual({ label: "(e)", marks: 3, stem: "Explain why the acceleration of the sphere decreases from its initial value to zero.", points: ["At release the speed is zero, so there is no drag: acceleration = g", "As the speed increases the drag increases, so the resultant force (weight − drag) decreases and the acceleration decreases", "When drag equals weight the resultant force is zero, so the acceleration is zero (terminal velocity)"], modelAnswer: "At release the sphere is at rest, so there is no drag and its acceleration is g. As it speeds up, the drag increases, so the resultant downward force (weight minus drag) and hence the acceleration decrease. When the drag equals the weight the resultant force is zero and the acceleration is zero: the sphere falls at terminal velocity." }),
        P.mcq({ label: "(f)", stem: "Which describes the velocity-time graph of the sphere?", options: [["A curve from the origin with initial gradient g, levelling off at the terminal velocity.", "Correct: the gradient (acceleration) falls from g to zero."], ["A straight line of gradient g up to the terminal velocity, then horizontal.", "The acceleration decreases gradually, not suddenly."], ["A curve that becomes steeper and steeper.", "The acceleration decreases, so the gradient decreases."], ["A horizontal line at the terminal velocity.", "The sphere starts from rest."]], answer: "A", explanation: "The v-t graph starts with gradient g and curves over to a horizontal line at the terminal velocity." }),
      ]),
      explanation: t`Weight ${sfStr(W, 3)} N; at $12\ \text{m s}^{-1}$, $a = ${sfStr(a12, 3)}\ \text{m s}^{-2}$; terminal velocity $${sfStr(vt, 3)}\ \text{m s}^{-1}$ when $kv^2 = mg$.`,
      hints: ["Resultant force = weight − drag.", "At terminal velocity drag = weight."],
    });
  }
});
