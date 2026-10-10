// W4a: amaths.forces.equilibrium
import { concept, P, t, chk, rad, deg, resultant, ZM } from "../lib.mjs";
import { f3, g3, d1, N, S, A } from "../tables/w4a-kit.mjs";

const { sin, cos, tan, atan, atan2, hypot, acos, sqrt } = Math;
const D = (x) => sin(rad(x));
const C = (x) => cos(rad(x));

concept("amaths.forces.equilibrium", { file: "forces/equilibrium", keyPrefix: "forces.equilibrium" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "A particle is acted on by several forces and is in equilibrium. Which statement must be true?",
    options: [
      ["The vector sum of the forces on it is zero", "Correct: equilibrium means zero resultant force, so it is at rest or moving with constant velocity."],
      ["The particle must be at rest", "A particle moving in a straight line at constant speed is also in equilibrium."],
      ["All the forces on it have the same magnitude", "Forces of different sizes can balance, e.g. a 3 N, a 4 N and a 5 N force."],
      ["Exactly two forces act on it, equal and opposite", "Any number of forces can be in equilibrium as long as their vector sum is zero."],
    ],
    answer: "A",
    explanation: "Equilibrium of a particle: the resultant force is the zero vector, so the components in every direction sum to zero.",
  });

  const c2 = 30 * D(40);
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: t`A rope pulls a sledge with a force of $30$ N at $40°$ above the horizontal. What is the vertical component of the force, correct to 3 significant figures?`,
    options: [
      [t`$${f3(c2)}$ N`, t`Correct: the vertical side is opposite the $40°$ angle, so it is $30\sin 40°$.`],
      [t`$${f3(30 * C(40))}$ N`, t`$30\cos 40°$ is the horizontal component (next to the angle).`],
      [t`$${f3(30 * tan(rad(40)))}$ N`, "Tangent is a ratio of two sides, not a component of a force."],
      [t`$${f3(30 / D(40))}$ N`, "Dividing by sin 40° gives a value larger than the force itself, which a component can never be."],
    ],
    answer: "A",
    explanation: t`Vertical component $= 30\sin 40° = ${f3(c2)}$ N; horizontal component $= 30\cos 40° = ${f3(30 * C(40))}$ N.`,
  });

  const ang3 = deg(atan(24 / 7));
  chk(hypot(7, 24), 25);
  b.fib({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: t`Two forces of $7$ N and $24$ N act on a particle at right angles to each other. Find the magnitude of their resultant and the angle it makes with the $7$ N force (degrees, 1 decimal place).`,
    template: "Magnitude = {{blank:r}} N, angle with the 7 N force = {{blank:a}}°",
    blanks: [N("r", 25, "31"), A("a", ang3, d1(90 - ang3))],
    explanation: t`$R = \sqrt{7^2 + 24^2} = 25$ N. $\tan\theta = \frac{24}{7}$, so $\theta = ${d1(ang3)}°$ with the $7$ N force. ($${d1(90 - ang3)}°$ is the angle with the $24$ N force.)`,
  });

  const r4 = resultant([[12, 0], [9, 120], [15, 250]]);
  const dir4 = r4.angle < 0 ? r4.angle + 360 : r4.angle;
  chk(r4.x, 12 + 9 * C(120) + 15 * C(250));
  b.fib({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Three coplanar forces act on a particle: $12$ N in the direction of the positive $x$-axis, $9$ N at $120°$ and $15$ N at $250°$, each angle measured anticlockwise from the positive $x$-axis. Find the magnitude of the resultant (3 significant figures) and its direction as an angle anticlockwise from the positive $x$-axis, between $0°$ and $360°$ (1 decimal place).`,
    template: "Magnitude = {{blank:r}} N, direction = {{blank:a}}°",
    blanks: [S("r", r4.mag, f3(hypot(12 + 9 * C(120) + 15 * C(250), 9 * D(120) - 15 * D(250)))), A("a", dir4, d1(dir4 - 180))],
    explanation: t`$X = 12 + 9\cos 120° + 15\cos 250° = ${f3(r4.x)}$ N; $Y = 9\sin 120° + 15\sin 250° = ${f3(r4.y)}$ N. $R = \sqrt{X^2 + Y^2} = ${f3(r4.mag)}$ N. $X > 0$ and $Y < 0$, so the resultant is in the fourth quadrant: $\theta = 360° - \tan^{-1}\frac{${f3(-r4.y)}}{${f3(r4.x)}} = ${d1(dir4)}°$.`,
    hints: ["Add the x-components and the y-components separately.", "Sketch X and Y to find the quadrant before using tan⁻¹."],
  });

  b.fib({
    d: 2, skill: "APPLICATION", calculator: false, applies: ZM,
    stem: t`A particle is in equilibrium under the three forces $\mathbf{F}_1 = (3\mathbf{i} - 2\mathbf{j})$ N, $\mathbf{F}_2 = (-5\mathbf{i} + 6\mathbf{j})$ N and $\mathbf{F}_3 = (a\mathbf{i} + b\mathbf{j})$ N. Find $a$ and $b$.`,
    template: "a = {{blank:a}}, b = {{blank:b}}",
    blanks: [N("a", 2, "-2"), N("b", -4, "4")],
    explanation: t`Equilibrium: $\mathbf{F}_1 + \mathbf{F}_2 + \mathbf{F}_3 = \mathbf{0}$. $\mathbf{i}$: $3 - 5 + a = 0$, $a = 2$. $\mathbf{j}$: $-2 + 6 + b = 0$, $b = -4$. (Signs reversed would give the resultant of the first two instead of the balancing force.)`,
  });

  chk(hypot(4 + 2, 7 - 15), 10);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true, applies: ZM,
    stem: t`Two forces $(4\mathbf{i} + 7\mathbf{j})$ N and $(2\mathbf{i} - 15\mathbf{j})$ N act on a particle. Find the magnitude of their resultant.`,
    value: 10, unit: "N", wrong: [hypot(4, 7) + hypot(2, 15), 14],
    explanation: t`Resultant $= (6\mathbf{i} - 8\mathbf{j})$ N, magnitude $\sqrt{6^2 + 8^2} = 10$ N. Adding the two magnitudes ($${f3(hypot(4, 7) + hypot(2, 15))}$) ignores their directions.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`A particle of mass $m$ rests on a smooth plane inclined at $\alpha$ to the horizontal, held by a force acting up the line of greatest slope. The normal reaction on the particle is $mg\cos\alpha$.`,
    answer: true,
    explanation: t`Resolving perpendicular to the plane: $R - mg\cos\alpha = 0$, since the holding force has no component perpendicular to the plane. If the force were horizontal, $R$ would be larger.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "When three forces keep a particle in equilibrium, the largest force must equal the sum of the other two.",
    answer: false,
    explanation: "The three forces form a closed triangle, so the largest is LESS than the sum of the other two (triangle inequality) unless all three are parallel. For example 3 N, 4 N and 5 N forces can be in equilibrium, and 5 < 3 + 4.",
  });

  const T9 = (35 * C(65)) / D(105);
  const T9b = (35 * C(40)) / D(105);
  chk(T9 * C(40), T9b * C(65)); chk(T9 * D(40) + T9b * D(65), 35);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A water container of weight $35$ N hangs in equilibrium from two light strings. One string makes an angle of $40°$ with the horizontal and the other an angle of $65°$ with the horizontal, on opposite sides. Find the tension in the string inclined at $40°$, correct to 3 significant figures.`,
    value: T9, unit: "N", wrong: [T9b, 35 / 2],
    explanation: t`Horizontally: $T_1\cos 40° = T_2\cos 65°$. Vertically: $T_1\sin 40° + T_2\sin 65° = 35$. Eliminating $T_2$: $T_1 = \dfrac{35\cos 65°}{\sin 105°} = ${f3(T9)}$ N (and $T_2 = ${g3(T9b)}$ N). The flatter string has the smaller tension here.`,
    hints: ["Resolve horizontally and vertically.", "Use the horizontal equation to write one tension in terms of the other."],
  });

  const P10 = 60 * D(20);
  const R10 = 60 * C(20);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A box of mass $6$ kg is held at rest on a smooth ramp inclined at $20°$ to the horizontal by a force $P$ N acting up the line of greatest slope. Taking $g = 10$ m s$^{-2}$, find $P$ and the normal reaction $R$, each correct to 3 significant figures.`,
    template: "P = {{blank:p}} N, R = {{blank:r}} N",
    blanks: [S("p", P10, f3(R10)), S("r", R10, "60")],
    explanation: t`Along the plane: $P = 60\sin 20° = ${f3(P10)}$ N. Perpendicular: $R = 60\cos 20° = ${f3(R10)}$ N. Swapping sine and cosine is the usual error: the weight component down the slope is $mg\sin\alpha$.`,
    hints: ["The weight is 60 N; resolve it along and perpendicular to the ramp."],
  });

  const m11 = 2.5, W11 = m11 * 10;
  const P11 = (W11 * D(35)) / C(12);
  const R11 = W11 * C(35) - P11 * D(12);
  chk(P11 * C(12) - W11 * D(35), 0); chk(R11 + P11 * D(12) - W11 * C(35), 0);
  b.calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: t`A particle of mass $2.5$ kg is held in equilibrium on a smooth plane inclined at $35°$ to the horizontal by a force of magnitude $P$ N. The force acts at $12°$ above the line of greatest slope, pulling up the plane. Taking $g = 10$ m s$^{-2}$, find $P$, correct to 3 significant figures.`,
    value: P11, unit: "N", wrong: [W11 * D(35), (W11 * D(35)) / D(12)],
    explanation: t`Resolve along the plane so that $R$ does not appear: $P\cos 12° = 25\sin 35°$, so $P = ${f3(P11)}$ N. (Perpendicular to the plane, $R = 25\cos 35° - P\sin 12° = ${f3(R11)}$ N.) Using $P = 25\sin 35°$ forgets that only $P\cos 12°$ acts along the plane.`,
    hints: ["Resolve parallel to the plane.", "The force makes 12° with the plane, so its component along the plane is P cos 12°."],
  });

  const f12 = resultant([[10, 30], [14, -60]]); // bearings 060° and 150° → 30° and −60° from east
  const bal = [-f12.x, -f12.y];
  const mag12 = hypot(...bal);
  const brg12 = (90 - deg(atan2(bal[1], bal[0])) + 360) % 360;
  chk(mag12, sqrt(296));
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`Two horizontal forces act on a particle: $10$ N on a bearing of $060°$ and $14$ N on a bearing of $150°$. A third horizontal force keeps the particle in equilibrium. Find the magnitude of the third force (3 significant figures) and its bearing (1 decimal place).`,
    template: "Magnitude = {{blank:m}} N, bearing = {{blank:b}}°",
    blanks: [S("m", mag12, "24"), A("b", brg12, d1((brg12 + 180) % 360))],
    explanation: t`The two forces are at right angles, so their resultant has magnitude $\sqrt{10^2 + 14^2} = ${f3(mag12)}$ N on a bearing of $060° + \tan^{-1}\frac{14}{10} = ${d1((brg12 + 180) % 360)}°$. The third force is equal and opposite: $${f3(mag12)}$ N on a bearing of $${d1(brg12)}°$. (Giving the bearing of the resultant itself is the common slip.)`,
    hints: ["Find the resultant of the two given forces first.", "The balancing force points the opposite way: add 180° to the bearing."],
  });

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`A box of mass $m$ kg on a smooth horizontal floor is pulled by a rope with tension $T$ N at $30°$ above the horizontal. The box stays in contact with the floor. Which expression gives the normal reaction $R$?`,
    options: [
      [t`$R = mg - T\sin 30°$`, "Correct: vertically, R + T sin 30° = mg, because the rope lifts the box slightly."],
      [t`$R = mg$`, "This ignores the upward component of the tension."],
      [t`$R = mg + T\sin 30°$`, "The rope pulls upwards, so it reduces R; it does not add to it."],
      [t`$R = mg - T\cos 30°$`, "T cos 30° is the horizontal component, which does not act vertically."],
    ],
    answer: "A",
    explanation: t`Resolving vertically: $R + T\sin 30° - mg = 0$, so $R = mg - T\sin 30°$.`,
    hints: ["Resolve vertically: which forces have vertical components?"],
  });

  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`A lamp of weight $W$ hangs from a string. A horizontal force $P$ holds the lamp in equilibrium with the string at angle $\theta$ to the vertical. Which relation is correct?`,
    options: [
      [t`$P = W\tan\theta$`, t`Correct: $T\sin\theta = P$ and $T\cos\theta = W$; divide.`],
      [t`$P = W\sin\theta$`, "This would follow only if the tension equalled W, which it does not."],
      [t`$P = W\cos\theta$`, "Cosine gives the vertical component of the tension, which balances W."],
      [t`$P = \dfrac{W}{\tan\theta}$`, "This uses θ measured from the horizontal instead of the vertical."],
    ],
    answer: "A",
    explanation: t`Horizontally $T\sin\theta = P$; vertically $T\cos\theta = W$. Dividing, $\tan\theta = \frac{P}{W}$, so $P = W\tan\theta$.`,
    hints: ["Resolve horizontally and vertically, then divide the equations."],
  });

  b.match({
    d: 2, skill: "RECALL", calculator: false,
    stem: "Match each force with its description.",
    pairs: [
      ["Weight", "Acts vertically downwards, of magnitude mg"],
      ["Normal reaction", "Acts perpendicular to a surface, away from it"],
      ["Tension", "Pulls along a string, away from the particle"],
      ["Thrust", "Pushes along a rod, towards the particle"],
    ],
    explanation: "Weight is the pull of gravity; contact forces have a normal part (reaction) and a part along the surface (friction); strings pull (tension); rods can also push (thrust).",
  });

  b.proof({
    d: 3, skill: "APPLICATION", calculator: false, marks: 3,
    stem: t`A picture of weight $W$ hangs from a nail by a light string whose two halves each make an angle $\theta$ with the vertical. Show that the tension in the string is $T = \dfrac{W}{2\cos\theta}$.`,
    points: [
      "M1 states that the tension is the same in both halves (light string over a smooth nail) and that horizontal components cancel by symmetry.",
      t`M1 resolves vertically: $2T\cos\theta = W$.`,
      "A1 rearranges to the given result.",
    ],
    modelAnswer: t`$$
\text{Horizontally: } T\sin\theta - T\sin\theta = 0 \text{ (balanced by symmetry)}
$$
$$
\text{Vertically: } T\cos\theta + T\cos\theta - W = 0
$$
$$
2T\cos\theta = W \Rightarrow T = \frac{W}{2\cos\theta}
$$`,
    explanation: t`As $\theta$ approaches $90°$, $\cos\theta \to 0$ and $T$ becomes very large: a horizontal string can never support a weight.`,
    hints: ["Each half makes θ with the vertical, so its vertical component is T cos θ."],
  });

  const ang17 = 90;
  chk(5 ** 2 + 12 ** 2, 13 ** 2);
  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Three forces of magnitudes $5$ N, $12$ N and $13$ N act on a particle, which is in equilibrium. What is the angle between the lines of action of the $5$ N and $12$ N forces (measured between the force arrows drawn from the particle)?`,
    options: [
      [t`$${ang17}°$`, t`Correct: $5^2 + 12^2 = 13^2$, so the triangle of forces is right-angled with the 5 N and 12 N sides perpendicular; the forces themselves are at $90°$.`],
      [t`$${d1(deg(atan(12 / 5)))}°$`, t`This is $\tan^{-1}\frac{12}{5}$, an angle inside the triangle between the 5 N and 13 N sides.`],
      [t`$${d1(deg(atan(5 / 12)))}°$`, t`This is $\tan^{-1}\frac{5}{12}$, an angle of the triangle, not the angle between the 5 N and 12 N forces.`],
      [t`$180°$`, "Two forces at 180° would be opposite each other; they could not then be balanced by a 13 N force."],
    ],
    answer: "A",
    explanation: t`The 5 N and 12 N forces have a resultant of $\sqrt{5^2 + 12^2} = 13$ N only when they are perpendicular; the 13 N force balances that resultant.`,
    hints: ["Draw the triangle of forces. What do you notice about 5, 12 and 13?"],
  });

  // Struct 5: lamp on two strings with tan α = 3/4 and tan β = 4/3, mass 3 kg (g = 10)
  const TA = 18, TB = 24;
  chk(TA * 0.8, TB * 0.6); chk(TA * 0.6 + TB * 0.8, 30);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: t`A lamp of mass $3$ kg hangs in equilibrium at $C$, supported by two light strings $CA$ and $CB$ attached to points $A$ and $B$ on a horizontal ceiling. String $CA$ makes an angle $\alpha$ with the horizontal and string $CB$ an angle $\beta$ with the horizontal, where $\tan\alpha = \frac{3}{4}$ and $\tan\beta = \frac{4}{3}$. Take $g = 10$ m s$^{-2}$.`,
    parts: [
      P.proof({ label: "(a)", marks: 2, stem: t`By resolving horizontally, show that $4T_A = 3T_B$, where $T_A$ and $T_B$ are the tensions in $CA$ and $CB$.`,
        points: [t`M1 uses $\cos\alpha = \frac{4}{5}$ and $\cos\beta = \frac{3}{5}$ (3-4-5 triangles).`, t`A1 $T_A \times \frac{4}{5} = T_B \times \frac{3}{5}$, so $4T_A = 3T_B$.`],
        modelAnswer: t`$$
\tan\alpha = \tfrac{3}{4} \Rightarrow \cos\alpha = \tfrac{4}{5},\ \sin\alpha = \tfrac{3}{5}; \qquad \tan\beta = \tfrac{4}{3} \Rightarrow \cos\beta = \tfrac{3}{5},\ \sin\beta = \tfrac{4}{5}
$$
$$
T_A\cos\alpha = T_B\cos\beta \Rightarrow \tfrac{4}{5}T_A = \tfrac{3}{5}T_B \Rightarrow 4T_A = 3T_B
$$`,
        explanation: "Exact trigonometric ratios come from the 3-4-5 right-angled triangle." }),
      P.fib({ label: "(b)", marks: 3, stem: "Resolve vertically and hence find the two tensions.", template: "T_A = {{blank:a}} N, T_B = {{blank:b}} N",
        blanks: [N("a", TA, "24"), N("b", TB, "18")],
        explanation: t`Vertically: $\frac{3}{5}T_A + \frac{4}{5}T_B = 30$. With $T_B = \frac{4}{3}T_A$: $\frac{3}{5}T_A + \frac{16}{15}T_A = \frac{25}{15}T_A = 30$, so $T_A = 18$ N and $T_B = 24$ N.` }),
    ],
    explanation: "Exact ratios from tan α = 3/4 keep the working free of a calculator; resolve horizontally, then vertically.",
    hints: ["Draw a right-angled triangle with sides 3, 4, 5 to find sin and cos.", "Substitute T_B = 4T_A/3 into the vertical equation."],
  });

  // Struct 12: particle on a smooth slope held by a string at θ to the plane
  const m19 = 5, W19 = 50, al = 30;
  const T19a = (W19 * D(al)) / C(20);
  const R19a = W19 * C(al) - T19a * D(20);
  const thMax = deg(acos((W19 * D(al)) / 40));
  const R19c = W19 * C(al) - 40 * D(thMax);
  chk(tan(rad(60)), (W19 * C(al)) / (W19 * D(al)));
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`A particle of mass $5$ kg rests on a smooth plane inclined at $30°$ to the horizontal. It is held in equilibrium by a light string which lies in the vertical plane containing a line of greatest slope and makes an angle $\theta$ with the plane, pulling upwards and up the slope. Take $g = 10$ m s$^{-2}$.`,
    parts: [
      P.fib({ label: "(a)", marks: 4, stem: t`Given that $\theta = 20°$, find the tension $T$ in the string and the normal reaction $R$, each correct to 3 significant figures.`, template: "T = {{blank:t}} N, R = {{blank:r}} N",
        blanks: [S("t", T19a, f3(W19 * D(al)), 2), S("r", R19a, f3(W19 * C(al)), 2)],
        explanation: t`Along the plane: $T\cos 20° = 50\sin 30° = 25$, so $T = ${f3(T19a)}$ N. Perpendicular: $R + T\sin 20° = 50\cos 30°$, so $R = ${f3(R19a)}$ N.` }),
      P.num({ label: "(b)", marks: 3, stem: t`The string breaks if its tension exceeds $40$ N. Find the largest value of $\theta$ for which equilibrium is possible, correct to 1 decimal place.`, value: thMax, unit: "°", wrong: [deg(Math.asin(25 / 40))],
        explanation: t`Along the plane $T\cos\theta = 25$ for every $\theta$, so $T = \frac{25}{\cos\theta} \le 40$ gives $\cos\theta \ge 0.625$, $\theta \le ${d1(thMax)}°$. (Using $\sin^{-1}0.625$ resolves the wrong way.)` }),
      P.num({ label: "(c)", marks: 2, stem: "Find the normal reaction when θ takes this largest value, correct to 3 significant figures.", value: R19c, unit: "N", wrong: [W19 * C(al)],
        explanation: t`$R = 50\cos 30° - 40\sin ${d1(thMax)}° = ${f3(W19 * C(al))} - ${f3(40 * D(thMax))} = ${f3(R19c)}$ N.` }),
      P.proof({ label: "(d)", marks: 3, stem: t`Show that the particle would be on the point of leaving the plane when $\tan\theta = \sqrt{3}$, and explain why this cannot happen with this string.`,
        points: [
          t`M1 writes $R = 50\cos 30° - T\sin\theta$ with $T = \frac{25}{\cos\theta}$, i.e. $R = 25\sqrt{3} - 25\tan\theta$.`,
          t`A1 sets $R = 0$ to get $\tan\theta = \sqrt{3}$ ($\theta = 60°$).`,
          t`B1 at $\theta = 60°$, $T = \frac{25}{\cos 60°} = 50$ N $> 40$ N, so the string breaks first.`,
        ],
        modelAnswer: t`$$
R = 50\cos 30° - T\sin\theta = 25\sqrt{3} - \frac{25}{\cos\theta}\sin\theta = 25\sqrt{3} - 25\tan\theta
$$
$$
R = 0 \iff \tan\theta = \sqrt{3} \iff \theta = 60°
$$
$$
\text{At } \theta = 60°: T = \frac{25}{\cos 60°} = 50 \text{ N} > 40 \text{ N, so the string breaks before the particle can leave the plane.}
$$`,
        explanation: "The normal reaction cannot be negative: R = 0 marks the point of leaving the surface." }),
    ],
    explanation: "Resolving along the plane removes R and fixes T cos θ; resolving perpendicular to it then gives R for any θ.",
    hints: ["Resolve along the plane first: R has no component in that direction.", "For (b) and (d), write T in terms of θ."],
  });

  b.manualShort({
    d: 3, skill: "EVALUATION", calculator: false, marks: 2,
    stem: "A sack of maize on a ramp at a Chinhoyi depot is modelled as a particle on a smooth plane. State what each of the words 'particle' and 'smooth' assumes, and give one way in which the real situation differs.",
    points: [
      "Particle: the sack's size is ignored, so all forces act at one point and it cannot rotate or topple; smooth: there is no friction between sack and ramp.",
      "Real difference: e.g. a real ramp exerts friction, so less force is needed to hold the sack (or the sack has size and may tip).",
    ],
    modelAnswer: "Modelling as a particle means the sack's dimensions are ignored and all the forces act at a single point. Smooth means the ramp exerts only a normal reaction, with no friction. In reality the ramp is rough, so friction helps to hold the sack and the force needed is smaller than the model predicts.",
    explanation: "Modelling assumptions simplify the situation; a good answer says what is ignored and how reality differs.",
    hints: ["What force does a smooth surface fail to provide?"],
  });

  b.card("DEFINITION", "Equilibrium of a particle", "The resultant force is zero: the particle is at rest or moves with constant velocity.");
  b.card("FORMULA", "Components of a force F at angle θ to a direction", t`Along: $F\cos\theta$; perpendicular: $F\sin\theta$.`);
  b.card("FORMULA", "Magnitude and direction of a resultant", t`$R = \sqrt{X^2 + Y^2}$, $\tan\theta = \dfrac{Y}{X}$ (check the quadrant with a sketch).`);
  b.card("CONCEPT", "Resolving for equilibrium", "Set the sum of components to zero in two perpendicular directions; resolve perpendicular to an unknown force to remove it.");
  b.card("FACT", "Weight", t`$W = mg$ acting vertically down; Cambridge uses $g = 10$ m s$^{-2}$, ZIMSEC states $g$ in each question.`);
  b.card("FORMULA", "Lami's theorem", t`For three forces in equilibrium: $\dfrac{P}{\sin\alpha} = \dfrac{Q}{\sin\beta} = \dfrac{R}{\sin\gamma}$, each angle being the one between the other two forces.`);
  b.card("CONCEPT", "Smooth inclined plane", t`Weight components: $mg\sin\alpha$ down the slope and $mg\cos\alpha$ into the plane.`);
  b.card("FACT", "Normal reaction is not always mg", "On a slope, or when another force has a vertical component, resolve to find R.");
  b.card("CONCEPT", "Forces as vectors (ZIMSEC)", t`For forces in $\mathbf{i}, \mathbf{j}$ form, equilibrium means the $\mathbf{i}$ and $\mathbf{j}$ components each sum to zero.`, undefined, { applies: ZM });
});
