// W4b: amaths.circular.motion (ZIMSEC only: Mechanics F6 6.10)
import { concept, P, t, chk, rad, deg } from "../lib.mjs";
import { f3, f4, fd, NB, NBd } from "../tables/w4b-kit.mjs";

const { sqrt, tan, sin, cos, acos, PI } = Math;
const g = 9.8;

concept("amaths.circular.motion", { file: "circular/motion", keyPrefix: "circular.motion" }, (b) => {
  // q01
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "A particle moves in a horizontal circle with constant speed. What is the direction of its acceleration?",
    options: [
      ["Towards the centre of the circle", "Correct: the velocity keeps turning towards the centre, so the change in velocity (and the acceleration) points inwards."],
      ["Along the tangent, in the direction of motion", "That is the direction of the velocity; with constant speed there is no tangential acceleration."],
      ["Away from the centre of the circle", "There is no outward force or acceleration; the 'flung outwards' feeling is the body tending to keep moving in a straight line."],
      ["It has no acceleration because its speed is constant", "Its velocity changes direction all the time, so it does accelerate."],
    ],
    answer: "A",
    explanation: t`For constant speed $v$ on a circle of radius $r$, the acceleration is $\frac{v^2}{r} = r\omega^2$ directed towards the centre.`,
  });

  // q02
  b.tf({
    d: 1, skill: "UNDERSTANDING", calculator: false,
    stem: "A particle moving at constant speed in a circle is in equilibrium, because its speed does not change.",
    answer: false,
    explanation: t`Its velocity changes direction, so it has an acceleration $\frac{v^2}{r}$ towards the centre and needs a resultant force $\frac{mv^2}{r}$. It is not in equilibrium.`,
  });

  // q03 rev/min to rad/s
  const w3 = (120 * 2 * PI) / 60;
  b.num({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: t`The drum of a hammer mill turns at $120$ revolutions per minute. Find its angular speed in radians per second, correct to 3 significant figures.`,
    value: w3, unit: "rad/s", wrong: [2, f3(120 * 2 * PI)],
    explanation: t`$120$ rev/min $= 2$ rev/s, and one revolution is $2\pi$ rad, so $\omega = 4\pi = ${f3(w3)}$ rad s$^{-1}$. ($2$ is revolutions per second, not radians per second.)`,
  });

  // q04 acceleration rω²
  const a4 = 0.35 * 36;
  chk(a4, 12.6, 1e-9);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`A particle moves in a circle of radius $0.35$ m with constant angular speed $6$ rad s$^{-1}$. Find the magnitude of its acceleration.`,
    value: a4, unit: "m/s²", wrong: [2.1, f3(36 / 0.35)],
    explanation: t`$a = r\omega^2 = 0.35 \times 6^2 = 12.6$ m s$^{-2}$ towards the centre. ($2.1$ m s$^{-1}$ is the speed $r\omega$.)`,
  });

  // q05 force on a car
  const F5 = (900 * 15 * 15) / 50;
  chk(F5, 4050, 1e-9);
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`A car of mass $900$ kg travels round a level bend of radius $50$ m at a constant speed of $15$ m s$^{-1}$. What is the resultant force on the car?`,
    options: [
      [t`$4050$ N towards the centre of the bend`, t`Correct: $\frac{mv^2}{r} = \frac{900 \times 225}{50} = 4050$ N, inwards.`],
      [t`$270$ N towards the centre of the bend`, t`This uses $\frac{mv}{r}$; the speed must be squared.`],
      [t`$4050$ N away from the centre of the bend`, "The size is right but the resultant points inwards, towards the centre."],
      ["Zero, because the speed is constant", "The direction of motion changes, so there is a resultant force towards the centre."],
    ],
    answer: "A",
    explanation: t`$F = \frac{mv^2}{r} = 4050$ N towards the centre, supplied by friction between the tyres and the road.`,
  });

  // q06 turntable ω max
  const w6 = sqrt((0.45 * g) / 0.25);
  chk(w6, 4.2, 1e-9);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A small parcel is placed $0.25$ m from the centre of a horizontal turntable. The coefficient of friction between parcel and turntable is $0.45$. Take $g = 9.8$ m s$^{-2}$. Find the greatest angular speed of the turntable for which the parcel does not slip.`,
    value: w6, unit: "rad/s", wrong: [f3((0.45 * g) / 0.25), f3(sqrt(0.45 * g * 0.25))],
    explanation: t`Vertically $R = mg$. Friction supplies the central force: $m(0.25)\omega^2 \le 0.45mg$. So $\omega^2 \le \frac{0.45 \times 9.8}{0.25} = 17.64$ and $\omega \le 4.2$ rad s$^{-1}$. (Forgetting the square root gives $17.6$.)`,
    workedSolution: t`1. $\uparrow$: $R = mg$.
2. Towards the centre: $F = mr\omega^2 = 0.25m\omega^2$.
3. Limiting friction: $0.25m\omega^2 = 0.45 \times 9.8m = 4.41m$.
4. $\omega^2 = 17.64$, $\omega = 4.2$ rad s$^{-1}$.`,
    hints: ["Friction is the only horizontal force.", "Set F = μR at the limit; the mass cancels."],
  });

  // q07 conical pendulum
  const T7 = 0.5 * 1.2 * 16;
  chk(T7, 9.6, 1e-9);
  const th7 = deg(acos(g / (1.2 * 16)));
  chk(T7 * cos(rad(th7)), 0.5 * g, 1e-9);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A particle of mass $0.5$ kg is attached to a light inextensible string of length $1.2$ m whose other end is fixed. The particle moves as a conical pendulum with angular speed $4$ rad s$^{-1}$. Take $g = 9.8$ m s$^{-2}$. Find the tension in the string and the angle between the string and the vertical (degrees, 1 decimal place).`,
    template: "Tension = {{blank:t}} N, angle with the vertical = {{blank:a}}°",
    blanks: [NB("t", T7, 4.9), NBd("a", th7, 1, fd(90 - th7, 1))],
    explanation: t`Horizontally: $T\sin\theta = m(l\sin\theta)\omega^2$, so $T = ml\omega^2 = 0.5 \times 1.2 \times 16 = 9.6$ N. Vertically: $T\cos\theta = mg$, so $\cos\theta = \frac{4.9}{9.6}$ and $\theta = ${fd(th7, 1)}°$.`,
    hints: [t`The radius is $l\sin\theta$; $\sin\theta$ cancels in the horizontal equation.`, "Then resolve vertically for the angle."],
  });

  // q08 banked, no friction
  const v8 = sqrt(120 * g * tan(rad(8)));
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A railway curve of radius $120$ m is banked at $8°$ to the horizontal. Take $g = 9.8$ m s$^{-2}$. At what speed is there no sideways force between the wheels and the rails? Give your answer correct to 3 significant figures.`,
    value: v8, unit: "m/s", wrong: [f3(sqrt(120 * g * sin(rad(8)))), f3(120 * g * tan(rad(8)))],
    explanation: t`With no sideways force, the normal reaction alone supplies the central force: $R\cos 8° = mg$ and $R\sin 8° = \frac{mv^2}{120}$, so $\tan 8° = \frac{v^2}{120 \times 9.8}$ and $v = ${f3(v8)}$ m s$^{-1}$.`,
    hints: [t`Divide the horizontal equation by the vertical one to get $\tan\theta = \frac{v^2}{rg}$.`],
  });

  // q09 banked with friction, max speed
  const th9 = rad(15), mu9 = 0.3;
  const v9 = sqrt((60 * g * (sin(th9) + mu9 * cos(th9))) / (cos(th9) - mu9 * sin(th9)));
  b.calc({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`A bend on a road has radius $60$ m and is banked at $15°$. The coefficient of friction between a car's tyres and the road is $0.3$. Take $g = 9.8$ m s$^{-2}$. Find the greatest speed at which the car can take the bend without slipping, correct to 3 significant figures.`,
    value: v9, unit: "m/s", wrong: [f3(sqrt(60 * g * tan(th9))), f3(sqrt((60 * g * (sin(th9) - mu9 * cos(th9))) / (cos(th9) + mu9 * sin(th9))))],
    explanation: t`At the greatest speed, friction $F = 0.3R$ acts DOWN the slope. Vertically: $R\cos 15° - 0.3R\sin 15° = mg$. Horizontally: $R\sin 15° + 0.3R\cos 15° = \frac{mv^2}{60}$. Dividing: $v^2 = 60g\,\frac{\sin 15° + 0.3\cos 15°}{\cos 15° - 0.3\sin 15°}$, so $v = ${f3(v9)}$ m s$^{-1}$. ($${f3(sqrt(60 * g * tan(th9)))}$ m s$^{-1}$ is the no-friction speed; the other wrong answer has friction up the slope, the least speed.)`,
    workedSolution: t`1. Car about to slide outwards (up the slope), so friction acts down the slope: $F = 0.3R$.
2. $\uparrow$: $R(\cos 15° - 0.3\sin 15°) = mg$.
3. $\leftarrow$: $R(\sin 15° + 0.3\cos 15°) = \frac{mv^2}{60}$.
4. $\frac{v^2}{60g} = \frac{${f4(sin(th9) + mu9 * cos(th9))}}{${f4(cos(th9) - mu9 * sin(th9))}}$, $v = ${f3(v9)}$ m s$^{-1}$.`,
    hints: ["At the greatest speed the car tends to slide up the slope, so friction acts down it.", "Resolve vertically and horizontally, not along the slope."],
  });

  // q10 string through a hole
  const w10 = sqrt((1.2 * g) / (0.4 * 0.5));
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A particle $P$ of mass $0.4$ kg moves in a horizontal circle of radius $0.5$ m on a smooth table. It is attached to a light string that passes through a small smooth hole at the centre of the circle and supports a particle of mass $1.2$ kg hanging at rest below the table. Take $g = 9.8$ m s$^{-2}$. Find the angular speed of $P$, correct to 3 significant figures.`,
    value: w10, unit: "rad/s", wrong: [f3((1.2 * g) / (0.4 * 0.5)), f3(sqrt((0.4 * g) / (1.2 * 0.5)))],
    explanation: t`The hanging particle is at rest, so $T = 1.2 \times 9.8 = 11.76$ N. For $P$: $T = 0.4 \times 0.5 \times \omega^2$, so $\omega^2 = 58.8$ and $\omega = ${f3(w10)}$ rad s$^{-1}$.`,
    hints: ["The tension equals the weight of the hanging particle.", "The tension is the central force on P."],
  });

  // q11 vertical circle constant speed
  const c11 = (0.25 * 25) / 0.6;
  const top11 = c11 - 0.25 * g, bot11 = c11 + 0.25 * g;
  b.fib({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A small bucket of mass $0.25$ kg is whirled in a vertical circle on a light rope of length $0.6$ m, at a constant speed of $5$ m s$^{-1}$. Take $g = 9.8$ m s$^{-2}$. Find the tension in the rope at the top and at the bottom of the circle, correct to 3 significant figures.`,
    template: "at the top: {{blank:t}} N, at the bottom: {{blank:b}} N",
    blanks: [NB("t", top11, f3(bot11)), NB("b", bot11, f3(top11))],
    explanation: t`$\frac{mv^2}{r} = \frac{0.25 \times 25}{0.6} = ${f4(c11)}$ N. At the top both the tension and the weight point to the centre: $T + 2.45 = ${f4(c11)}$, so $T = ${f3(top11)}$ N. At the bottom the tension points to the centre and the weight away: $T - 2.45 = ${f4(c11)}$, so $T = ${f3(bot11)}$ N.`,
    hints: ["At the top, the weight acts towards the centre.", "At the bottom, the weight acts away from the centre."],
  });

  // q12 least speed at top
  const v12 = sqrt(g * 0.9);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`A particle moves in a vertical circle of radius $0.9$ m on the end of a light string. Take $g = 9.8$ m s$^{-2}$. Find the least speed it can have at the top of the circle if the string is to remain taut, correct to 3 significant figures.`,
    value: v12, unit: "m/s", wrong: [f3(sqrt(2 * g * 0.9)), f3(g * 0.9)],
    explanation: t`At the top $T + mg = \frac{mv^2}{r}$. The string is taut while $T \ge 0$, i.e. $\frac{mv^2}{r} \ge mg$, so $v \ge \sqrt{gr} = \sqrt{8.82} = ${f3(v12)}$ m s$^{-1}$.`,
    hints: ["Set the tension at the top to zero."],
  });

  // q13 vertical circle with energy
  const vt13 = sqrt(49 - 4 * g * 0.8);
  chk(vt13, 4.2, 1e-9);
  chk(vt13 >= sqrt(g * 0.8) ? 1 : 0, 1);
  const T13 = (0.35 * vt13 * vt13) / 0.8 - 0.35 * g;
  b.calc({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`A particle of mass $0.35$ kg is attached to a light inextensible string of length $0.8$ m, the other end fixed at $O$. It moves in a vertical circle about $O$ with speed $7$ m s$^{-1}$ at the lowest point, and its speed varies as it rises. Use conservation of energy and take $g = 9.8$ m s$^{-2}$. Find the tension in the string at the highest point, correct to 3 significant figures.`,
    value: T13, unit: "N", wrong: [f3((0.35 * 49) / 0.8 - 0.35 * g), f3((0.35 * vt13 * vt13) / 0.8 + 0.35 * g)],
    explanation: t`Energy from bottom to top (rise $1.6$ m): $v^2 = 7^2 - 2(9.8)(1.6) = 17.64$, so $v = 4.2$ m s$^{-1}$. At the top: $T + 0.35(9.8) = \frac{0.35 \times 17.64}{0.8}$, so $T = 7.7175 - 3.43 = ${f3(T13)}$ N. (Keeping $v = 7$ at the top assumes constant speed, which is not the case here.)`,
    workedSolution: t`1. $\frac{1}{2}mv^2 = \frac{1}{2}m(7)^2 - mg(2 \times 0.8)$, so $v^2 = 49 - 31.36 = 17.64$.
2. At the top, towards $O$: $T + mg = \frac{mv^2}{r}$.
3. $T = \frac{0.35 \times 17.64}{0.8} - 3.43 = ${f3(T13)}$ N (positive, so the string is taut).`,
    hints: ["The particle rises through the diameter, 1.6 m.", "Then use the radial equation at the top."],
  });

  // q14 match
  b.match({
    d: 2, skill: "RECALL", calculator: false,
    stem: t`A particle moves in a circle of radius $r$ with constant angular speed $\omega$ and speed $v$. Match each quantity with its formula.`,
    pairs: [
      ["Speed", t`$r\omega$`],
      ["Acceleration towards the centre", t`$\dfrac{v^2}{r}$`],
      ["Period of one revolution", t`$\dfrac{2\pi}{\omega}$`],
      ["Resultant force towards the centre", t`$mr\omega^2$`],
    ],
    explanation: t`$v = r\omega$, $a = r\omega^2 = \frac{v^2}{r}$, $T = \frac{2\pi}{\omega}$, $F = ma = mr\omega^2$.`,
  });

  // q15 proof: conical pendulum period in terms of depth h
  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 4,
    stem: t`A particle of mass $m$ on a light string of length $l$ moves as a conical pendulum, the string making an angle $\theta$ with the vertical. The circle lies a vertical distance $h$ below the fixed end of the string. Show that the period of the motion is $2\pi\sqrt{\dfrac{h}{g}}$.`,
    points: [
      "M1 horizontal equation T sin θ = m(l sin θ)ω², giving T = mlω².",
      "M1 vertical equation T cos θ = mg.",
      "A1 combines to ω² = g/(l cos θ) = g/h, using h = l cos θ.",
      "A1 period 2π/ω = 2π√(h/g).",
    ],
    modelAnswer: t`The radius is $l\sin\theta$. Towards the centre:
$$
T\sin\theta = m(l\sin\theta)\omega^2 \;\Rightarrow\; T = ml\omega^2
$$
Vertically:
$$
T\cos\theta = mg \;\Rightarrow\; ml\omega^2\cos\theta = mg \;\Rightarrow\; \omega^2 = \frac{g}{l\cos\theta} = \frac{g}{h}
$$
since $h = l\cos\theta$. Period:
$$
\frac{2\pi}{\omega} = 2\pi\sqrt{\frac{h}{g}}
$$`,
    explanation: "Resolve horizontally and vertically; the depth h = l cos θ appears naturally.",
    hints: [t`Show first that $T = ml\omega^2$.`],
  });

  // q16 explain
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: "A kombi takes a level (unbanked) roundabout too fast and skids outwards. Explain, in terms of forces, why this happens.",
    points: [
      "On a level road only friction between the tyres and the road can supply the force mv²/r towards the centre.",
      "Friction cannot exceed μR = μmg; if mv²/r > μmg (too high a speed), there is not enough friction and the kombi slides outwards (continues more nearly in a straight line).",
    ],
    modelAnswer: "To move in a circle the kombi needs a resultant force mv²/r towards the centre. On a level road this comes only from friction, whose maximum is μmg. At high speed mv²/r exceeds μmg, so friction cannot provide the force and the kombi moves outwards relative to the circle.",
    explanation: "Compare the force needed, mv²/r, with the friction available.",
    hints: ["What supplies the force towards the centre on a level road?"],
  });

  // q17 banked: faster than design speed
  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: "A car takes a banked bend faster than the speed at which no friction is needed. In which direction does the friction on the car act?",
    options: [
      ["Down the slope of the banking", "Correct: the car tends to slide up and outwards, so friction acts down the slope, adding to the inward force."],
      ["Up the slope of the banking", "That happens when the car is SLOWER than the design speed and tends to slide down."],
      ["Along the road, opposite to the motion", "Sideways friction is what matters for cornering; it acts across the road, not along it."],
      ["There is no friction at this speed", "Friction is zero only at the design speed, where the normal reaction alone is enough."],
    ],
    answer: "A",
    explanation: t`At the design speed $\tan\theta = \frac{v^2}{rg}$ and no friction is needed. Faster, more inward force is needed, so friction acts down the slope (it has an inward horizontal component).`,
    hints: ["Which way would the car slide if the road were icy?"],
  });

  // q18 struct 5: level bend
  const v18 = sqrt(0.6 * g * 40);
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, calculator: true,
    stem: t`A car rounds a level bend of radius $40$ m. The coefficient of friction between the tyres and the road is $0.6$. Take $g = 9.8$ m s$^{-2}$.`,
    parts: [
      P.num({ label: "(a)", marks: 3, stem: "Find the greatest speed at which the car can take the bend without skidding, correct to 3 significant figures.", value: v18, unit: "m/s", wrong: [f3(0.6 * g * 40)],
        explanation: t`$\frac{mv^2}{40} \le 0.6mg$, so $v^2 \le 0.6 \times 9.8 \times 40 = 235.2$ and $v \le ${f3(v18)}$ m s$^{-1}$.` }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain why a loaded truck has the same greatest speed on this bend as the car.",
        points: ["The force needed, mv²/r, and the friction available, μmg, are both proportional to the mass.", "So m cancels: v² ≤ μgr whatever the mass."],
        modelAnswer: "The truck needs mv²/r and can get at most μmg; both contain m, so v_max = √(μgr) = 15.3 m/s for any mass (assuming the same μ).",
        explanation: "Mass appears on both sides of the inequality." }),
    ],
    explanation: "Friction supplies the central force on a level road.",
    hints: ["Set mv²/r = μmg.", "Look at where m appears."],
  });

  // q19 struct 13: particle on two strings from a vertical rod
  const cs = 5 / 13, sn = 12 / 13, m19 = 0.2, r19 = 0.6, w2 = 8 ** 2;
  const sumT = (m19 * r19 * w2) / sn, difT = (m19 * g) / cs;
  const TA = (sumT + difT) / 2, TB = (sumT - difT) / 2;
  chk(TA * sn + TB * sn, m19 * r19 * w2, 1e-9);
  chk(TA * cs - TB * cs, m19 * g, 1e-9);
  const w19 = sqrt((((m19 * g) / cs) * sn) / (m19 * r19));
  chk(w19 * w19, 4 * g, 1e-9);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`A particle $P$ of mass $0.2$ kg is attached to two light inextensible strings $AP$ and $BP$, each of length $0.65$ m. The ends $A$ and $B$ are fixed to a vertical rod, with $A$ a distance $0.5$ m vertically above $B$. $P$ moves in a horizontal circle about the rod with both strings taut and angular speed $8$ rad s$^{-1}$. Take $g = 9.8$ m s$^{-2}$.`,
    parts: [
      P.proof({ label: "(a)", marks: 2, stem: t`Show that the radius of the circle is $0.6$ m and that each string makes an angle $\theta$ with the vertical where $\cos\theta = \frac{5}{13}$.`,
        points: ["M1 P is level with the midpoint of AB (isosceles triangle), 0.25 m below A.", "A1 radius √(0.65² − 0.25²) = 0.6 m and cos θ = 0.25/0.65 = 5/13."],
        modelAnswer: t`Triangle $APB$ is isosceles ($AP = BP$), so $P$ is level with the midpoint $M$ of $AB$, with $AM = 0.25$ m.
$$
MP = \sqrt{0.65^2 - 0.25^2} = 0.6 \text{ m}, \qquad \cos\theta = \frac{0.25}{0.65} = \frac{5}{13}
$$`,
        explanation: "Use the symmetry of the isosceles triangle." }),
      P.fib({ label: "(b)", marks: 6, stem: "Find the tensions in AP and BP, correct to 3 significant figures.", template: "T_A = {{blank:a}} N, T_B = {{blank:b}} N",
        blanks: [NB("a", TA, f3(sumT / 2), 3), NB("b", TB, f3(sumT / 2), 3)],
        explanation: t`Vertically: $\frac{5}{13}(T_A - T_B) = 0.2(9.8)$, so $T_A - T_B = 5.096$. Towards the centre ($\sin\theta = \frac{12}{13}$): $\frac{12}{13}(T_A + T_B) = 0.2(0.6)(8^2) = 7.68$, so $T_A + T_B = 8.32$. Hence $T_A = ${f3(TA)}$ N and $T_B = ${f3(TB)}$ N.` }),
      P.num({ label: "(c)", marks: 3, stem: "Find the least angular speed for which the string BP is taut, correct to 3 significant figures.", value: w19, unit: "rad/s", wrong: [f3(sqrt(g / 0.25))],
        explanation: t`With $T_B = 0$: $\frac{5}{13}T_A = 1.96$ and $\frac{12}{13}T_A = 0.2(0.6)\omega^2$, so $\omega^2 = \frac{1.96 \times 12}{5 \times 0.12} = 39.2$ and $\omega = ${f3(w19)}$ rad s$^{-1}$.` }),
      P.manual({ label: "(d)", marks: 2, stem: "Describe what happens to the motion if the angular speed falls below this value.",
        points: ["BP becomes slack, so P moves as a conical pendulum on AP alone.", "P drops lower (the angle of AP with the vertical decreases) to a circle with ω² = g/(0.65 cos θ)."],
        modelAnswer: "The lower string goes slack and P hangs on AP alone as a conical pendulum. With a smaller ω, cos θ = g/(0.65ω²) is larger, so AP is closer to the vertical and the circle is lower and smaller.",
        explanation: "Below the critical speed, the model changes to a simple conical pendulum." }),
    ],
    explanation: "Resolve vertically (no vertical acceleration) and towards the centre (mrω²), using both tensions.",
    hints: ["Both strings make the same angle with the vertical but pull in different vertical directions.", "For (c), set T_B = 0."],
  });

  // ---------------------------------------------------------------- cards
  b.card("DEFINITION", "Angular speed ω", "Rate of turning of the radius, in rad/s; n rev/min = 2πn/60 rad/s.");
  b.card("FORMULA", "Speed and acceleration in a circle", t`$v = r\omega$; $a = r\omega^2 = \dfrac{v^2}{r}$ towards the centre.`);
  b.card("FORMULA", "Period of circular motion", t`$T = \dfrac{2\pi}{\omega} = \dfrac{2\pi r}{v}$`);
  b.card("CONCEPT", "Method for a horizontal circle", t`Resolve vertically (forces balance) and towards the centre (resultant $= mr\omega^2$).`);
  b.card("FORMULA", "Conical pendulum (string l at θ to vertical)", t`$r = l\sin\theta$, $T = ml\omega^2$, $\omega^2 = \dfrac{g}{l\cos\theta}$.`);
  b.card("FORMULA", "Smooth banked track (no friction needed)", t`$\tan\theta = \dfrac{v^2}{rg}$`);
  b.card("FORMULA", "Particle on a string in a vertical circle", t`Top: $T + mg = \dfrac{mv^2}{r}$; bottom: $T - mg = \dfrac{mv^2}{r}$.`);
  b.card("FACT", "Least speed at the top of a vertical circle on a string", t`$v = \sqrt{gr}$ (tension zero at the top).`);
  b.card("CONCEPT", "'Centripetal force'", "Not an extra force: it is the resultant of the real forces (friction, tension, reaction, weight) towards the centre.");
});
