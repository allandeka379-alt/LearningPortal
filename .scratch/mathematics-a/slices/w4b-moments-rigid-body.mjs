// W4b: amaths.forces.moments-rigid-body (ZIMSEC only: Mechanics F5 6.1.3 and rigid bodies)
import { concept, P, t, chk, rad, deg } from "../lib.mjs";
import { f3, f4, fd, NB, NBd, CB } from "../tables/w4b-kit.mjs";

const { sin, cos, tan, atan, hypot } = Math;
const S = (x) => sin(rad(x));
const C = (x) => cos(rad(x));

concept("amaths.forces.moments-rigid-body", { file: "forces/moments-rigid-body", keyPrefix: "forces.moments-rigid-body" }, (b) => {
  // q01
  const m1 = 18 * 0.4;
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`A force of $18$ N acts on a door. The perpendicular distance from the hinge line to the line of action of the force is $0.4$ m. What is the moment of the force about the hinge?`,
    options: [
      [t`$${m1}$ N m`, t`Correct: moment $= 18 \times 0.4 = ${m1}$ N m.`],
      [t`$45$ N m`, t`This divides the force by the distance; a moment is force $\times$ distance.`],
      [t`$18.4$ N m`, "This adds the force and the distance, which have different units."],
      [t`$72$ N m`, t`A decimal slip: $18 \times 4 = 72$, but the distance is $0.4$ m.`],
    ],
    answer: "A",
    explanation: t`Moment $=$ force $\times$ perpendicular distance $= 18 \times 0.4 = ${m1}$ N m, measured in newton metres.`,
  });

  // q02
  const m2 = 35 * 0.8 * S(40);
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: t`Farai pulls on the end of a spanner of length $0.8$ m with a force of $35$ N. The force makes an angle of $40°$ with the spanner. Find the moment of the force about the nut at the other end, correct to 3 significant figures.`,
    options: [
      [t`$${f3(m2)}$ N m`, t`Correct: the perpendicular component is $35\sin 40°$, so the moment is $35\sin 40° \times 0.8$.`],
      [t`$${f3(35 * 0.8 * C(40))}$ N m`, t`$35\cos 40°$ is the component ALONG the spanner, which passes through the nut and has no moment.`],
      [t`$28$ N m`, t`$35 \times 0.8$ treats the force as perpendicular to the spanner.`],
      [t`$${f3(35 * 0.8 / S(40))}$ N m`, t`Dividing by $\sin 40°$ gives more than $35 \times 0.8$, the largest moment possible.`],
    ],
    answer: "A",
    explanation: t`Only the component perpendicular to the spanner turns it: $35\sin 40° \times 0.8 = ${f3(m2)}$ N m. Equivalently, the perpendicular distance from the nut to the line of action is $0.8\sin 40°$ m.`,
  });

  // q03 components: F = 5i − 2j at (3, 4)
  const M3 = 3 * -2 - 4 * 5;
  chk(M3, -26);
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`A force $(5\mathbf{i} - 2\mathbf{j})$ N acts at the point with position vector $(3\mathbf{i} + 4\mathbf{j})$ m. Find the magnitude of the moment of the force about the origin $O$, and its sense.`,
    template: "Magnitude = {{blank:m}} N m, sense: {{blank:s}}",
    blanks: [NB("m", 26, 14), CB("s", ["clockwise", "anticlockwise"], "clockwise")],
    explanation: t`Anticlockwise moment $= xY - yX = 3(-2) - 4(5) = -6 - 20 = -26$. The negative sign means the moment is $26$ N m **clockwise**. ($14$ comes from $20 - 6$, a sign slip.)`,
  });

  // q04
  b.tf({
    d: 1, skill: "RECALL", calculator: false,
    stem: "A force whose line of action passes through a point P has zero moment about P.",
    answer: true,
    explanation: "The perpendicular distance from P to the line of action is zero, so the moment is zero. This is why we take moments about a point where an unknown force acts.",
  });

  // q05
  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "If the resultant of the forces on a rigid body is zero, the body must be in equilibrium.",
    answer: false,
    explanation: "Two equal and opposite forces whose lines of action are different (a couple) have zero resultant but a non-zero total moment, so the body turns. A rigid body also needs the total moment about a point to be zero.",
  });

  // q06 see-saw
  const d6 = (45 * 1.6) / 36;
  chk(d6, 2);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`Tendai, of mass $45$ kg, sits $1.6$ m from the pivot of a light see-saw. Rudo, of mass $36$ kg, sits on the other side so that the see-saw balances horizontally. How far from the pivot does Rudo sit?`,
    value: d6, unit: "m", wrong: [1.28, 1.6],
    explanation: t`Moments about the pivot: $45g \times 1.6 = 36g \times d$, so $d = \frac{72}{36} = 2$ m. The lighter person sits further out. ($1.28$ m comes from multiplying by $\frac{36}{45}$ instead of dividing.) $g$ cancels, so its value does not matter.`,
  });

  // q07 plank on two end supports, boy at 1.2 m from A
  const g = 9.8;
  const RB7 = (18 * g * 2 + 50 * g * 1.2) / 4;
  const RA7 = 68 * g - RB7;
  chk(RA7, 431.2, 1e-9);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A uniform plank $AB$ of length $4$ m and mass $18$ kg rests horizontally on supports at $A$ and $B$. Chipo, of mass $50$ kg, stands on the plank $1.2$ m from $A$. Take $g = 9.8$ m s$^{-2}$. Find the reaction at $A$, correct to 3 significant figures.`,
    value: RA7, unit: "N", wrong: [RB7, 68 * 9.8 / 2],
    explanation: t`Moments about $A$: $4R_B = 18(9.8)(2) + 50(9.8)(1.2) = 352.8 + 588 = 940.8$, so $R_B = 235.2$ N. Resolving vertically: $R_A = 68(9.8) - 235.2 = ${f3(RA7)}$ N. The support nearer Chipo carries more. ($235$ N is the reaction at $B$; $333$ N splits the total equally.)`,
    workedSolution: t`1. Weights: plank $176.4$ N at $2$ m from $A$; Chipo $490$ N at $1.2$ m from $A$.
2. Moments about $A$: $4R_B = 176.4 \times 2 + 490 \times 1.2 = 940.8$, so $R_B = 235.2$ N.
3. Vertically: $R_A + R_B = 666.4$, so $R_A = 431.2 \approx ${f3(RA7)}$ N.`,
    hints: ["Take moments about A to find the reaction at B first.", "Then resolve vertically."],
  });

  // q08 non-uniform rod on two strings, T_A = 1.5 T_B
  const d8 = (1 / 2.5) * 3;
  chk(d8, 1.2, 1e-12);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`A non-uniform rod $AB$ of length $3$ m hangs horizontally from two vertical light strings, one at $A$ and one at $B$. The tension in the string at $A$ is $1.5$ times the tension in the string at $B$. Find the distance of the centre of mass of the rod from $A$.`,
    value: d8, unit: "m", wrong: [1.8, 1.5],
    explanation: t`Let $T_B = T$, so $T_A = 1.5T$ and $2.5T = W$, giving $T = 0.4W$. Moments about $A$: $T \times 3 = W \times d$, so $d = 0.4 \times 3 = 1.2$ m. The centre of mass is nearer $A$, the end with the larger tension. ($1.8$ m is the distance from $B$.)`,
    hints: ["Write both tensions in terms of the weight W.", "Take moments about A."],
  });

  // q09 tilting
  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`A uniform beam rests horizontally on two supports $C$ and $D$. A load is moved along the beam beyond $D$, away from $C$, until the beam is on the point of tilting about $D$. Which statement is true at that moment?`,
    options: [
      [t`The reaction at $C$ is zero`, t`Correct: the beam is about to lift off $C$, so $C$ no longer pushes on it; all the weight is carried at $D$.`],
      [t`The reactions at $C$ and $D$ are equal`, "Equal reactions happen only for a symmetrical arrangement of loads, not when the beam is about to tilt."],
      [t`The reaction at $D$ is zero`, t`The beam pivots about $D$, so $D$ carries the whole weight; it is $C$ that loses contact.`],
      [t`The moment of the load about $D$ is zero`, t`The load is beyond $D$, so it has a non-zero moment about $D$; it balances the moment of the beam's weight.`],
    ],
    answer: "A",
    explanation: t`On the point of turning about $D$, the beam is just leaving $C$, so $R_C = 0$. Then moments about $D$ give the critical position or load.`,
    hints: ["Which support does the beam lift away from?"],
  });

  // q10 hinged rod 1.6 m, 60 N, string at B at 50°
  const T10 = (60 * 0.8) / (1.6 * S(50));
  const X10 = T10 * C(50);
  const Y10 = 60 - T10 * S(50);
  chk(Y10, 30, 1e-9);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A uniform rod $AB$, of length $1.6$ m and weight $60$ N, is freely hinged at $A$ to a vertical wall. It is held horizontal by a light string attached at $B$ and fixed to the wall above $A$, the string making an angle of $50°$ with the rod. Find the tension in the string and the horizontal component of the force exerted by the hinge, each correct to 3 significant figures.`,
    template: "Tension = {{blank:t}} N, horizontal component at the hinge = {{blank:x}} N",
    blanks: [NB("t", T10, f3(30 / C(50))), NB("x", X10, f3(T10 * S(50)))],
    explanation: t`Moments about $A$: $T\sin 50° \times 1.6 = 60 \times 0.8$, so $T = \frac{48}{1.6\sin 50°} = ${f3(T10)}$ N. Horizontally the hinge pushes the rod away from the wall with $X = T\cos 50° = ${f3(X10)}$ N. (Vertically, $Y = 60 - T\sin 50° = 30$ N.)`,
    hints: ["Take moments about the hinge so its two unknown components disappear.", "Use the perpendicular component T sin 50°."],
  });

  // q11 ladder alone, mu = 0.35, least angle
  const th11 = deg(atan(1 / (2 * 0.35)));
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`A uniform ladder rests with its foot on rough horizontal ground and its top against a smooth vertical wall. The coefficient of friction between the ladder and the ground is $0.35$. Find the smallest angle the ladder can make with the ground without slipping, in degrees correct to 1 decimal place.`,
    value: th11, unit: "°", wrong: [fd(deg(atan(2 * 0.35)), 1), fd(90 - th11, 1)],
    explanation: t`Let the ladder have weight $W$ and length $2a$, at angle $\theta$ to the ground. Vertically $R = W$; horizontally $F = S$. Moments about the foot: $S \times 2a\sin\theta = W \times a\cos\theta$, so $S = \frac{W}{2\tan\theta}$. Limiting friction: $\frac{W}{2\tan\theta} = 0.35W$, so $\tan\theta = \frac{1}{0.7}$ and $\theta = ${fd(th11, 1)}°$. ($${fd(deg(atan(0.7)), 1)}°$ inverts the ratio; $${fd(90 - th11, 1)}°$ is the angle with the wall.)`,
    hints: ["Use a length of 2a; it cancels.", "In limiting equilibrium F = μR with R = W."],
  });

  // q12 ladder 4 m, 150 N, 65°, mu 0.3, man 600 N: how far up
  const R12 = 750;
  const F12 = 0.3 * R12;
  const x12 = (F12 * 4 * S(65) - 150 * 2 * C(65)) / (600 * C(65));
  chk(x12 > 0 && x12 < 4 ? 1 : 0, 1);
  b.calc({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`A uniform ladder of length $4$ m and weight $150$ N rests at $65°$ to rough horizontal ground, with its top against a smooth vertical wall. The coefficient of friction at the ground is $0.3$. Sipho, of weight $600$ N, climbs the ladder. How far up the ladder can he go before it slips? Give your answer in metres correct to 3 significant figures.`,
    value: x12, unit: "m", wrong: [f3((0.3 * 600 * 4 * S(65) - 300 * C(65)) / (600 * C(65)))],
    explanation: t`Vertically $R = 150 + 600 = 750$ N, so in limiting equilibrium $F = 0.3 \times 750 = 225$ N $= S$ (the wall reaction). Moments about the foot: $S \times 4\sin 65° = 150 \times 2\cos 65° + 600x\cos 65°$. So $x = \frac{225 \times 4\sin 65° - 300\cos 65°}{600\cos 65°} = ${f3(x12)}$ m. (Using $R = 600$ N, forgetting the ladder's own weight, gives a smaller value.)`,
    workedSolution: t`1. $R = 750$ N; limiting friction $F = \mu R = 225$ N; horizontally $S = F = 225$ N.
2. Moments about the foot: $225 \times 4\sin 65° = 150 \times 2\cos 65° + 600x\cos 65°$.
3. $${f4(900 * S(65))} = ${f4(300 * C(65))} + ${f4(600 * C(65))}x$.
4. $x = ${f3(x12)}$ m up the ladder.`,
    hints: ["Find R by resolving vertically, then the limiting friction.", "Take moments about the foot of the ladder."],
  });

  // q13 match
  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each modelling situation with the fact used to solve it.",
    pairs: [
      ["The weight of a uniform rod", "acts at its midpoint"],
      ["The reaction of a smooth wall on a ladder", "is perpendicular to the wall"],
      ["A beam on the point of tilting about support D", "the reaction at the other support is zero"],
      ["The ladder is about to slip", "friction at the ground equals μR"],
    ],
    explanation: "These four facts set up almost every rigid-body equilibrium question: where the weight acts, the direction of a smooth reaction, the tilting condition and limiting friction.",
  });

  // q14 square lamina, side 2 m, forces along AB, BC, CD
  // A(0,0) B(2,0) C(2,2) D(0,2): 5 N along AB (x-dir at y=0), 3 N along BC (y-dir at x=2), 4 N along CD (−x at y=2)
  const mom = (x, y, X, Y) => x * Y - y * X;
  const M14 = mom(0, 0, 5, 0) + mom(2, 0, 0, 3) + mom(2, 2, -4, 0);
  chk(M14, 14);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`$ABCD$ is a square lamina of side $2$ m, labelled anticlockwise. Forces of $5$ N, $3$ N and $4$ N act along $AB$, $BC$ and $CD$ respectively, in the directions shown by the order of the letters. Find the total moment of the forces about $A$.`,
    options: [
      [t`$14$ N m anticlockwise`, t`Correct: the force along $AB$ passes through $A$; $3 \times 2 = 6$ and $4 \times 2 = 8$, both anticlockwise.`],
      [t`$2$ N m clockwise`, t`This treats the moment of the force along $CD$ as opposite in sense to the force along $BC$; both turn the square anticlockwise about $A$.`],
      [t`$24$ N m anticlockwise`, t`This includes $5 \times 2$ for the force along $AB$, but its line of action passes through $A$.`],
      [t`$14$ N m clockwise`, "The size is right but the sense is wrong: draw the forces on a sketch."],
    ],
    answer: "A",
    explanation: t`Place $A$ at the origin. The $5$ N force acts along $AB$ through $A$: moment $0$. The $3$ N force acts up $BC$, $2$ m from $A$: $6$ N m anticlockwise. The $4$ N force acts from $C$ to $D$, along the top edge $2$ m above $A$: $8$ N m anticlockwise. Total $14$ N m anticlockwise.`,
    hints: ["Find the perpendicular distance from A to each line of action."],
  });

  // q15 proof: ladder at θ, limiting, μ = 1/(2 tan θ)
  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 4,
    stem: t`A uniform ladder of length $2a$ and weight $W$ rests with its foot on rough horizontal ground and its top against a smooth vertical wall, making an angle $\theta$ with the ground. The ladder is in limiting equilibrium. Show that the coefficient of friction is $\mu = \dfrac{1}{2\tan\theta}$.`,
    points: [
      "M1 resolves vertically, R = W, and horizontally, F = S (wall reaction).",
      "M1 takes moments about the foot: S × 2a sin θ = W × a cos θ.",
      "M1 uses limiting friction F = μR.",
      "A1 reaches μ = 1/(2 tan θ) with no errors.",
    ],
    modelAnswer: t`Let $R$ and $F$ be the normal reaction and friction at the foot, and $S$ the reaction of the smooth wall.
$$
\uparrow: \; R = W, \qquad \rightarrow: \; F = S
$$
Moments about the foot:
$$
S \times 2a\sin\theta = W \times a\cos\theta \;\Rightarrow\; S = \frac{W}{2\tan\theta}
$$
Limiting equilibrium, $F = \mu R$:
$$
\frac{W}{2\tan\theta} = \mu W \;\Rightarrow\; \mu = \frac{1}{2\tan\theta}
$$`,
    explanation: "Resolve twice, take moments about the foot, then use F = μR.",
    hints: ["Take moments about the foot so R and F disappear."],
  });

  // q16 manual explanation
  b.manualShort({
    d: 3, skill: "EVALUATION", calculator: false, marks: 2,
    stem: "A ladder rests against a smooth wall on rough ground. Explain why it is more likely to slip when a person is near the top of the ladder than near the bottom.",
    points: [
      "The moment of the person's weight about the foot increases as they climb (larger horizontal distance).",
      "So the wall reaction, and hence the friction needed at the foot, increases; it may exceed μR, the maximum available (R increases by only the person's weight).",
    ],
    modelAnswer: "Moments about the foot: S × (height of top) = moments of the weights. As the person climbs, the horizontal distance of their weight from the foot grows, so S grows, and friction F = S must grow. The maximum friction μR is fixed once the person is on the ladder, so near the top the friction needed can exceed μR and the ladder slips.",
    explanation: "Link the person's position to the moment about the foot, then to the friction required.",
    hints: ["Take moments about the foot of the ladder."],
  });

  // q17 struct 5: beam on supports
  const g17 = 9.8;
  // beam PQ 5 m, 30 kg uniform; supports at P and at R, PR = 3.5 m; 12 kg at Q
  const RR17 = (30 * g17 * 2.5 + 12 * g17 * 5) / 3.5;
  const RP17 = 42 * g17 - RR17;
  // largest extra mass at Q before tilting about R: RP = 0 -> 30g*1 = M g*1.5 -> M = 20 total at Q
  const Mtip = (30 * 1) / 1.5;
  chk(Mtip, 20);
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, calculator: true,
    stem: t`A uniform beam $PQ$ of length $5$ m and mass $30$ kg rests horizontally on two supports, one at $P$ and one at $R$, where $PR = 3.5$ m. A sack of maize of mass $12$ kg hangs from $Q$. Take $g = 9.8$ m s$^{-2}$.`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: "Find the reactions at P and R, correct to 3 significant figures.",
        template: "Reaction at P = {{blank:p}} N, reaction at R = {{blank:r}} N",
        blanks: [NB("p", RP17, f3(RR17)), NB("r", RR17, f3(RP17))],
        explanation: t`Moments about $P$: $3.5R_R = 294 \times 2.5 + 117.6 \times 5 = 735 + 588 = 1323$, so $R_R = 378$ N. Vertically $R_P = 411.6 - 378 = ${f3(RP17)}$ N.` }),
      P.num({ label: "(b)", marks: 2, stem: "The sack is replaced by a heavier one. Find the largest mass of sack that can hang from Q without the beam tilting.", value: Mtip, unit: "kg", wrong: [12],
        explanation: t`On the point of tilting about $R$, $R_P = 0$. Moments about $R$: $30g \times 1 = Mg \times 1.5$, so $M = 20$ kg.` }),
    ],
    explanation: "Take moments about one support for the other reaction; on the point of tilting, the far reaction is zero.",
    hints: ["Take moments about P first.", "Which reaction becomes zero when the beam is about to tilt about R?"],
  });
  chk(RR17, 378, 1e-9);

  // q18 struct 12: rod resting on a peg, foot on rough ground
  const W18 = 80, L18 = 3, AC18 = 2.2, a18 = 40;
  const N18 = (W18 * 1.5 * C(a18)) / AC18;
  const F18 = N18 * S(a18);
  const R18 = W18 - N18 * C(a18);
  const mu18 = F18 / R18;
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`A uniform pole $AB$, of length $3$ m and weight $80$ N, rests with the end $A$ on rough horizontal ground and leans on a smooth horizontal rail at $C$, where $AC = 2.2$ m. The pole makes an angle of $40°$ with the horizontal and is in a vertical plane perpendicular to the rail.`,
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Describe the forces acting on the pole, giving the direction of each.",
        points: ["Weight 80 N vertically down at the midpoint (1.5 m from A); normal reaction R vertically up and friction F horizontally at A.", "Reaction N at the smooth rail C, perpendicular to the pole (not vertical)."],
        modelAnswer: "Four forces: the weight 80 N acting vertically down at the midpoint of AB; at A, the normal reaction R (vertically up) and friction F (horizontal, towards the rail side to stop A sliding out); at C, the reaction N of the smooth rail, perpendicular to the pole.",
        explanation: "A smooth contact gives a reaction perpendicular to the surface it touches — here, perpendicular to the pole." }),
      P.num({ label: "(b)", marks: 3, stem: "Find the reaction at C, correct to 3 significant figures.", value: N18, unit: "N", wrong: [f3((W18 * 1.5) / AC18)],
        explanation: t`Moments about $A$: $N \times 2.2 = 80 \times 1.5\cos 40°$, so $N = ${f3(N18)}$ N. (Forgetting $\cos 40°$ gives $${f3((W18 * 1.5) / AC18)}$ N.)` }),
      P.fib({ label: "(c)", marks: 4, stem: "Find the friction force and the normal reaction at A, correct to 3 significant figures.",
        template: "Friction = {{blank:f}} N, normal reaction = {{blank:r}} N",
        blanks: [NB("f", F18, f3(N18 * C(a18)), 2), NB("r", R18, 80, 2)],
        explanation: t`$N$ is perpendicular to the pole, so it makes $40°$ with the vertical. Horizontally: $F = N\sin 40° = ${f3(F18)}$ N. Vertically: $R + N\cos 40° = 80$, so $R = ${f3(R18)}$ N.` }),
      P.num({ label: "(d)", marks: 3, stem: "Find the least possible value of the coefficient of friction at A, correct to 3 significant figures.", value: mu18, wrong: [f3(F18 / 80)],
        explanation: t`Equilibrium needs $F \le \mu R$, so $\mu \ge \frac{${f4(F18)}}{${f4(R18)}} = ${f3(mu18)}$. (Using $R = 80$ N ignores the vertical part of the rail reaction.)` }),
    ],
    explanation: "Take moments about A, resolve the rail reaction (perpendicular to the pole), then compare F with μR.",
    hints: ["The rail reaction is perpendicular to the pole, at 40° to the vertical.", "Moments about A remove both forces at A."],
  });

  // q19 hinge direction MCQ
  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "A uniform rod is freely hinged to a wall at one end and held in equilibrium by a string. How should the force at the hinge be treated when solving the problem?",
    options: [
      ["As two unknown components, horizontal and vertical", "Correct: the hinge force has unknown size and direction, so it is found from its two components."],
      ["As a force acting along the rod towards the wall", "Only a light rod with forces at its ends only (a two-force member) is pushed along its length; a heavy rod generally is not."],
      ["As a vertical force equal to the weight of the rod", "The string usually carries part of the weight and pulls horizontally too, so the hinge force is not just vertical."],
      ["As zero, because the hinge is smooth", "A smooth hinge exerts no turning effect (couple), but it still exerts a force."],
    ],
    answer: "A",
    explanation: "Give the hinge reaction components X and Y. Take moments about the hinge to find the string tension, then resolve to find X and Y.",
  });

  // ---------------------------------------------------------------- cards
  b.card("DEFINITION", "Moment of a force about a point", t`Force $\times$ perpendicular distance from the point to the line of action; unit N m; has a sense (clockwise or anticlockwise).`);
  b.card("FORMULA", t`Moment of $X\mathbf{i} + Y\mathbf{j}$ acting at $(x, y)$ about $O$`, t`$M = xY - yX$ (anticlockwise positive).`);
  b.card("CONCEPT", "Conditions for equilibrium of a rigid body", "Resultant force zero (resolve in two directions) AND total moment about any one point zero.");
  b.card("FACT", "Weight of a uniform rod, beam or ladder", "Acts at the midpoint.");
  b.card("FACT", "Reaction of a smooth wall or smooth peg", "Perpendicular to the surface of contact (for a peg or rail: perpendicular to the rod).");
  b.card("CONCEPT", "Beam on the point of tilting about one support", "The reaction at the other support is zero; take moments about the tilting support.");
  b.card("CONCEPT", "Force at a smooth hinge", "Unknown magnitude and direction: use components X and Y; take moments about the hinge to remove them.");
  b.card("FORMULA", "Ladder of weight W on smooth wall, rough ground, limiting, angle θ with ground", t`$\mu = \dfrac{1}{2\tan\theta}$ (uniform ladder, no other loads).`);
  b.card("CONCEPT", "Choosing where to take moments", "About the point where the most unknown forces act; check with moments about a second point.");
});
