// W4a: amath.mechanics.equilibrium (ZIMSEC only)
import { concept, P, t, chk, rad, deg, steps } from "../lib.mjs";

const { cos, sin, tan, sqrt, asin, acos } = Math;
const g = 9.8;

concept("amath.mechanics.equilibrium", { file: "mechanics/equilibrium", keyPrefix: "mechanics.equilibrium" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "What is the condition for a particle to be in equilibrium?",
    options: [
      ["The resultant force on it is zero", "Correct: the vector sum of all the forces is zero."],
      ["Its weight is zero", "Every particle with mass has a weight; other forces balance it."],
      ["Only two forces act on it", "Any number of forces can act, provided their sum is zero."],
      ["Its velocity is increasing", "A changing velocity means a non-zero resultant force."],
    ],
    answer: "A",
    explanation: t`Equilibrium: $\sum F_x = 0$ and $\sum F_y = 0$, so the resultant force is zero.`,
  });

  b.tf({
    d: 1, skill: "UNDERSTANDING", calculator: false,
    stem: "A particle in equilibrium must be at rest.",
    answer: false,
    explanation: "False. Zero resultant force means zero acceleration, so the particle is either at rest or moving in a straight line at constant velocity.",
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "A particle rests on an inclined plane. Which pair of directions usually gives the simplest equations when you resolve the forces?",
    options: [
      ["Along the plane and perpendicular to it", "Correct: the normal reaction and friction then each appear in only one equation."],
      ["Horizontally and vertically", "This works but splits the normal reaction and friction into two components each."],
      ["Along the plane and vertically", "These directions are not perpendicular, so the equations are not independent sums."],
      ["Along the weight and along the normal reaction", "These are not perpendicular on an inclined plane."],
    ],
    answer: "A",
    explanation: "Any two perpendicular directions are valid, but resolving along and perpendicular to the plane means only the weight (and any applied force at an angle) needs splitting.",
  });

  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`The forces $(3\mathbf{i} - 7\mathbf{j})$ N, $(-8\mathbf{i} + 2\mathbf{j})$ N and $(a\mathbf{i} + b\mathbf{j})$ N act on a particle in equilibrium. Find $a$ and $b$.`,
    template: "a = {{blank:a}}, b = {{blank:b}}",
    blanks: [{ id: "a", input: "number", accepted: [5], wrong: "-5" }, { id: "b", input: "number", accepted: [5], wrong: "-5" }],
    explanation: t`$\mathbf{i}$: $3 - 8 + a = 0$, so $a = 5$. $\mathbf{j}$: $-7 + 2 + b = 0$, so $b = 5$.`,
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: "A 4 kg particle is held at rest on a smooth plane inclined at 35° to the horizontal by a string parallel to the line of greatest slope. Take g = 9.8 m/s². Find the tension in the string, correct to 3 significant figures.",
    value: 4 * g * sin(rad(35)), unit: "N", wrong: [4 * g * cos(rad(35)), 4 * g],
    explanation: t`Along the plane: $T = 4(9.8)\sin 35^\circ = 22.5$ N. Using cosine (32.1 N) gives the normal reaction instead.`,
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: "A 4 kg particle is held at rest on a smooth plane inclined at 35° to the horizontal by a string parallel to the line of greatest slope. Take g = 9.8 m/s². Find the normal reaction of the plane on the particle, correct to 3 significant figures.",
    value: 4 * g * cos(rad(35)), unit: "N", wrong: [4 * g * sin(rad(35)), 4 * g],
    explanation: t`Perpendicular to the plane: $R = 4(9.8)\cos 35^\circ = 32.1$ N. The string is parallel to the plane, so it has no component perpendicular to it.`,
  });

  {
    const T = (6 * g) / (2 * sin(rad(40)));
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "A 6 kg lamp hangs at rest from two light strings, each making an angle of 40° with the horizontal. Take g = 9.8 m/s². Find the tension in each string, correct to 3 significant figures.",
      value: T, unit: "N", wrong: [(6 * g) / (2 * cos(rad(40))), 6 * g / 2],
      explanation: t`By symmetry the tensions are equal. Vertically: $2T\sin 40^\circ = 58.8$, so $T = 45.7$ N. Using cosine (38.4 N) takes the angle as if measured from the vertical.`,
      hints: ["The horizontal components cancel by symmetry.", "Resolve vertically."],
    });
  }

  {
    const Pf = 20 * tan(rad(35));
    chk(Pf * 1, (20 / cos(rad(35))) * sin(rad(35)), 1e-9);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "A particle of weight 20 N hangs on a light string. It is pulled aside by a horizontal force P N and rests in equilibrium with the string at 35° to the vertical. Find P, correct to 3 significant figures.",
      value: Pf, unit: "N", wrong: [20 / tan(rad(35)), 20 * sin(rad(35))],
      explanation: t`Vertically: $T\cos 35^\circ = 20$. Horizontally: $T\sin 35^\circ = P$. Dividing: $P = 20\tan 35^\circ = 14.0$ N.`,
      workedSolution: steps(
        t`Resolve vertically: $T\cos 35^\circ = 20$, so $T = 24.4$ N.`,
        t`Resolve horizontally: $P = T\sin 35^\circ$.`,
        t`$P = 20\tan 35^\circ = 14.0$ N.`,
      ),
      hints: ["The angle is with the vertical: the vertical component of T uses cosine."],
    });
  }

  b.mcq({
    d: 2, skill: "RECALL", calculator: false,
    stem: t`A particle of mass $m$ rests on a smooth plane inclined at $\alpha$ to the horizontal. What is the component of its weight down the line of greatest slope?`,
    options: [
      [t`$mg\sin\alpha$`, "Correct: when α = 0 this is 0, as it should be on a flat surface."],
      [t`$mg\cos\alpha$`, "This is the component perpendicular to the plane."],
      [t`$mg\tan\alpha$`, "This is not a component of the weight; it appears when a horizontal force holds the particle."],
      [t`$mg$`, "The whole weight acts vertically, not along the slope."],
    ],
    answer: "A",
    explanation: t`The weight makes angle $\alpha$ with the normal to the plane, so its components are $mg\cos\alpha$ into the plane and $mg\sin\alpha$ down it.`,
  });

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`A particle of weight $W$ is held at rest on a smooth plane inclined at $\alpha$ by a horizontal force. How does the normal reaction $R$ compare with $W\cos\alpha$?`,
    options: [
      [t`$R$ is greater than $W\cos\alpha$`, "Correct: the horizontal force has a component into the plane, which adds to the reaction."],
      [t`$R$ equals $W\cos\alpha$`, "This is true only when the holding force is parallel to the plane."],
      [t`$R$ is less than $W\cos\alpha$`, "This happens when the force pulls away from the plane, not when it pushes horizontally into it."],
      [t`$R$ equals $W$`, "R = W only for a horizontal surface with no other vertical forces."],
    ],
    answer: "A",
    explanation: t`Perpendicular to the plane: $R = W\cos\alpha + P\sin\alpha$, which is greater than $W\cos\alpha$.`,
    hints: ["Resolve the horizontal force perpendicular to the plane."],
  });

  {
    const a = deg(asin(12 / (3 * g)));
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "A 3 kg particle is held at rest on a smooth inclined plane by a light string parallel to the line of greatest slope. The tension is 12 N. Take g = 9.8 m/s². Find the angle of the plane to the horizontal, correct to 1 decimal place.",
      value: a, unit: "°", wrong: [deg(acos(12 / (3 * g)))],
      explanation: t`Along the plane: $12 = 29.4\sin\alpha$, so $\sin\alpha = 0.408$ and $\alpha = 24.1^\circ$. Using cosine gives $65.9^\circ$.`,
      hints: ["Resolve along the plane."],
    });
  }

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`A particle of mass $m$ is in equilibrium in each situation below. Match each situation with the normal reaction $R$ on the particle.`,
    pairs: [
      ["On a horizontal floor, with only its weight and the reaction acting", t`$mg$`],
      [t`On a smooth slope of angle $\alpha$, held by a string parallel to the slope`, t`$mg\cos\alpha$`],
      [t`On a smooth slope of angle $\alpha$, held by a horizontal force`, t`$\dfrac{mg}{\cos\alpha}$`],
      [t`On a horizontal floor, pulled by a string with tension $T$ at $\theta$ above the horizontal`, t`$mg - T\sin\theta$`],
    ],
    explanation: t`Resolve perpendicular to the surface each time. A string parallel to the slope has no component perpendicular to it; a horizontal force pushes into the slope ($R = mg\cos\alpha + P\sin\alpha = \frac{mg}{\cos\alpha}$); a string pulling upwards reduces the reaction on the floor.`,
  });

  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "A particle is in equilibrium under three forces. Two of them are 9 N and 12 N and are perpendicular. What is the magnitude of the third force?",
    options: [
      ["15 N", "Correct: it balances the resultant of the other two, √(81 + 144) = 15 N."],
      ["21 N", "This adds the magnitudes as if the forces acted in the same direction."],
      ["3 N", "This subtracts the magnitudes as if the forces were opposite."],
      [t`$\sqrt{63}$ N`, "This subtracts the squares instead of adding them."],
    ],
    answer: "A",
    explanation: "The third force is equal and opposite to the resultant of the other two: √(9² + 12²) = 15 N.",
  });

  {
    const F3 = sqrt(164);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "A particle is acted on by a force of 10 N due east, a force of 8 N due north and a third force F that keeps it in equilibrium. Find the magnitude of F, correct to 3 significant figures.",
      value: F3, unit: "N", wrong: [18, 6],
      explanation: t`$F$ balances the resultant of the other two: $F = \sqrt{10^2 + 8^2} = \sqrt{164} = 12.8$ N, acting south-west of the particle at $\tan^{-1}\frac{8}{10} = 38.7^\circ$ south of west.`,
      hints: ["F is equal and opposite to the resultant of the other two forces."],
    });
  }

  {
    const th = deg(acos((2 * g * sin(rad(30))) / 12.5));
    chk(12.5 * cos(rad(th)), 9.8, 1e-9);
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: "A 2 kg particle rests on a smooth plane inclined at 30° to the horizontal. It is held in equilibrium by a force of 12.5 N acting at an angle θ above the line of greatest slope (in the vertical plane containing that line). Take g = 9.8 m/s². Find θ, correct to 1 decimal place.",
      value: th, unit: "°", wrong: [90 - th],
      explanation: t`Along the plane: $12.5\cos\theta = 2(9.8)\sin 30^\circ = 9.8$, so $\cos\theta = 0.784$ and $\theta = 38.4^\circ$.`,
      workedSolution: steps(
        t`Component of the weight down the plane: $19.6\sin 30^\circ = 9.8$ N.`,
        t`Component of the force up the plane: $12.5\cos\theta$.`,
        t`$12.5\cos\theta = 9.8$, so $\theta = 38.4^\circ$.`,
      ),
      hints: ["Only resolving along the plane is needed: the normal reaction has no component along it."],
    });
  }

  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 3,
    stem: t`A particle of weight $W$ rests on a smooth plane inclined at angle $\alpha$ to the horizontal. It is held in equilibrium by a horizontal force $P$. Show that $P = W\tan\alpha$.`,
    points: [
      t`M1 resolves along the plane, with $P\cos\alpha$ up the plane and $W\sin\alpha$ down it.`,
      t`M1 forms $P\cos\alpha = W\sin\alpha$ (or resolves horizontally and vertically and eliminates $R$).`,
      t`A1 divides by $\cos\alpha$ to reach $P = W\tan\alpha$.`,
    ],
    modelAnswer: t`Resolving along the line of greatest slope (the normal reaction has no component in this direction):

$$
P\cos\alpha - W\sin\alpha = 0
$$

$$
P = \frac{W\sin\alpha}{\cos\alpha} = W\tan\alpha
$$`,
    explanation: "Resolving along the plane removes the unknown normal reaction.",
    hints: ["Which direction avoids the normal reaction?"],
  });

  {
    const k = cos(rad(50)) / cos(rad(25));
    const T1 = 78.4 / (sin(rad(50)) + k * sin(rad(25)));
    const T2 = k * T1;
    chk(T1 * cos(rad(50)), T2 * cos(rad(25)), 1e-9);
    chk(T1 * sin(rad(50)) + T2 * sin(rad(25)), 78.4, 1e-9);
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
      stem: "An 8 kg particle hangs in equilibrium from two light strings. One string makes an angle of 50° with the horizontal and has tension T₁ N; the other makes an angle of 25° with the horizontal and has tension T₂ N. Take g = 9.8 m/s².",
      parts: [
        P.proof({ label: "(a)", marks: 2, stem: t`By resolving horizontally, show that $T_2 = kT_1$, where $k = \dfrac{\cos 50^\circ}{\cos 25^\circ}$.`,
          points: [t`M1 horizontal components $T_1\cos 50^\circ$ and $T_2\cos 25^\circ$ in opposite directions.`, t`A1 sets them equal and rearranges to $T_2 = \frac{\cos 50^\circ}{\cos 25^\circ}T_1$.`],
          modelAnswer: t`Resolving horizontally:

$$
T_1\cos 50^\circ = T_2\cos 25^\circ \quad\Rightarrow\quad T_2 = \frac{\cos 50^\circ}{\cos 25^\circ}\,T_1
$$`,
          explanation: "The horizontal components must cancel." }),
        P.num({ label: "(b)", marks: 3, stem: t`By resolving vertically, find $T_1$, correct to 3 significant figures.`, value: T1, unit: "N", wrong: [T2, 78.4 / 2],
          explanation: t`$T_1\sin 50^\circ + kT_1\sin 25^\circ = 78.4$, with $k = 0.7092$: $T_1(0.7660 + 0.2997) = 78.4$, so $T_1 = 73.6$ N.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Find $T_2$, correct to 3 significant figures.`, value: T2, unit: "N", wrong: [T1],
          explanation: t`$T_2 = 0.7092 \times 73.56 = 52.2$ N.` }),
      ],
      explanation: "Resolve horizontally to relate the tensions, then vertically to find them. The steeper string carries the larger tension.",
      hints: ["The weight is 8 × 9.8 = 78.4 N.", "Substitute T₂ = kT₁ into the vertical equation."],
    });
  }

  {
    const W = 5 * g;
    const Pa = (W * sin(rad(20))) / cos(rad(12));
    const Ra = W * cos(rad(20)) - Pa * sin(rad(12));
    const Ph = W * tan(rad(20));
    const Pl = W * sin(rad(20));
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: "A 5 kg particle rests on a smooth plane inclined at 20° to the horizontal. It is held in equilibrium by a force of P N acting at 12° above the line of greatest slope, in the vertical plane containing that line. Take g = 9.8 m/s².",
      parts: [
        P.num({ label: "(a)", marks: 3, stem: "Find P, correct to 3 significant figures.", value: Pa, unit: "N", wrong: [Pl, W * sin(rad(20)) / sin(rad(12))],
          explanation: t`Along the plane: $P\cos 12^\circ = 49\sin 20^\circ = 16.76$, so $P = 17.1$ N.` }),
        P.num({ label: "(b)", marks: 3, stem: "Find the normal reaction, correct to 3 significant figures.", value: Ra, unit: "N", wrong: [W * cos(rad(20)), W * cos(rad(20)) + Pa * sin(rad(12))],
          explanation: t`Perpendicular: $R + P\sin 12^\circ = 49\cos 20^\circ$, so $R = 46.04 - 3.56 = 42.5$ N. The force pulls partly away from the plane, so $R$ is less than $49\cos 20^\circ$.` }),
        P.num({ label: "(c)", marks: 2, stem: "If instead the force acted horizontally, what value of P would hold the particle? Give your answer correct to 3 significant figures.", value: Ph, unit: "N", wrong: [Pl],
          explanation: t`$P\cos 20^\circ = 49\sin 20^\circ$ gives $P = 49\tan 20^\circ = 17.8$ N.` }),
        P.manual({ label: "(d)", marks: 1, stem: "In which direction should the force act so that the smallest possible force holds the particle? Give its size.",
          points: [t`Parallel to the plane (up the line of greatest slope), $P = 49\sin 20^\circ = 16.8$ N.`],
          modelAnswer: t`Along the line of greatest slope, up the plane: then all of $P$ opposes the component $49\sin 20^\circ$, so $P = 16.8$ N, less than 17.1 N and 17.8 N.`,
          explanation: t`$P\cos\theta = 49\sin 20^\circ$ is smallest when $\cos\theta = 1$.` }),
      ],
      explanation: "Resolve along the plane to find P (the reaction has no component there), then perpendicular to find R. A force tilted away from the plane reduces R; a horizontal force increases it.",
      hints: ["Along the plane: P cos 12° balances 49 sin 20°.", "Perpendicular: R, P sin 12° and 49 cos 20°."],
    });
  }

  b.card("DEFINITION", "Equilibrium of a particle", "The resultant force is zero, so the particle is at rest or moves with constant velocity.");
  b.card("FORMULA", "Condition for equilibrium", t`$\sum F_x = 0$ and $\sum F_y = 0$ for any two perpendicular directions.`);
  b.card("FORMULA", "Weight on a slope of angle α", t`$mg\sin\alpha$ down the plane and $mg\cos\alpha$ into the plane.`);
  b.card("DEFINITION", "Smooth surface", "No friction: the only contact force is the normal reaction, perpendicular to the surface.");
  b.card("DEFINITION", "Light inextensible string", "Massless and does not stretch; the tension is the same throughout (also over a smooth peg).");
  b.card("CONCEPT", "Triangle of forces", "Three forces in equilibrium, drawn nose to tail, form a closed triangle; each balances the resultant of the other two.");
  b.card("FACT", "Horizontal force holding a particle on a smooth slope", t`$P = W\tan\alpha$ and $R = \dfrac{W}{\cos\alpha}$, larger than $W\cos\alpha$.`);
  b.card("CONCEPT", "Choosing directions to resolve", "Hanging particles: horizontal and vertical. Particles on slopes: along and perpendicular to the plane.");
});
