// W4a: amath.mechanics.friction (ZIMSEC only)
import { concept, P, t, chk, rad, deg, steps } from "../lib.mjs";

const { cos, sin, tan, atan } = Math;
const g = 9.8;

concept("amath.mechanics.friction", { file: "mechanics/friction", keyPrefix: "mechanics.friction" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`What are the units of the coefficient of friction $\mu$?`,
    options: [
      ["It has no units", "Correct: μ is the ratio of two forces, F and R, so the units cancel."],
      ["Newtons", "μ multiplies a force (R) to give a force (F), so it cannot itself be in newtons."],
      ["Newtons per kilogram", "This is the unit of g, the gravitational field strength."],
      ["Metres per second squared", "This is the unit of acceleration."],
    ],
    answer: "A",
    explanation: t`$\mu = \frac{F}{R}$ in limiting equilibrium: newtons divided by newtons, so $\mu$ is a pure number.`,
  });

  b.tf({
    d: 1, skill: "UNDERSTANDING", calculator: false,
    stem: t`The frictional force on a particle resting on a rough surface is always equal to $\mu R$.`,
    answer: false,
    explanation: t`False. $F \leq \mu R$. Friction equals $\mu R$ only in limiting equilibrium or when the particle slides; otherwise it is just large enough to prevent motion.`,
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: "A 12 kg box rests on a rough horizontal floor. The coefficient of friction is 0.35. Take g = 9.8 m/s². Find the greatest frictional force the floor can exert, correct to 3 significant figures.",
    value: 0.35 * 12 * g, unit: "N", wrong: [0.35 * 12, 12 * g],
    explanation: t`$R = 12 \times 9.8 = 117.6$ N, so $F_{\max} = \mu R = 0.35 \times 117.6 = 41.2$ N. Multiplying by the mass (4.2) forgets that $R$ is a force.`,
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: "An 8 kg block on a rough horizontal surface is on the point of moving when it is pushed horizontally with a force of 23.52 N. Take g = 9.8 m/s². Find the coefficient of friction.",
    value: 23.52 / (8 * g), wrong: [23.52 / 8],
    explanation: t`Limiting equilibrium: $F = \mu R$ with $F = 23.52$ N and $R = 78.4$ N, so $\mu = \frac{23.52}{78.4} = 0.3$.`,
  });

  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "A 10 kg box rests on a rough horizontal floor with coefficient of friction 0.5. Take g = 9.8 m/s². Thandeka pushes it horizontally with a force of 30 N and it does not move. What is the frictional force on the box?",
    options: [
      ["30 N", "Correct: the box is at rest, so friction exactly balances the 30 N push."],
      ["49 N", "This is the maximum friction μR; the box needs less than this."],
      ["19 N", "This is the difference 49 − 30; friction does not subtract the push from its maximum."],
      ["0 N", "With a push acting and no motion, friction must act to balance it."],
    ],
    answer: "A",
    explanation: "Maximum friction = 0.5 × 98 = 49 N. The push of 30 N is less than this, so the box stays still and friction is just 30 N.",
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "A block rests on a rough inclined plane with no forces acting on it other than its weight and the contact force. In which direction does the friction on the block act?",
    options: [
      ["Up the slope", "Correct: without friction the block would slide down, so friction acts up the plane."],
      ["Down the slope", "Friction opposes the tendency to slide down, so it cannot act down the slope here."],
      ["Perpendicular to the slope", "That is the direction of the normal reaction, not friction."],
      ["Vertically upwards", "Friction acts along the surface, not vertically."],
    ],
    answer: "A",
    explanation: "Friction opposes the motion that would happen without it. Here the block would slide down the plane, so friction acts up the plane.",
  });

  {
    const a = deg(atan(0.7));
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "The coefficient of friction between a tin of paint and a wooden plank is 0.7. The plank is slowly tilted. Find the angle to the horizontal at which the tin is about to slide, correct to 1 decimal place.",
      value: a, unit: "°", wrong: [deg(Math.asin(0.7)), 90 - a],
      explanation: t`In limiting equilibrium on a slope with no other forces, $\mu = \tan\alpha$: $\alpha = \tan^{-1} 0.7 = 35.0^\circ$. Using $\sin^{-1}$ gives $44.4^\circ$.`,
      hints: [t`Show that $\mu = \tan\alpha$: friction $mg\sin\alpha = \mu mg\cos\alpha$.`],
    });
  }

  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A brick rests on a rough plank inclined at 28° to the horizontal and is just about to slip down it. No other forces act. Find the coefficient of friction, correct to 3 significant figures.",
    value: tan(rad(28)), wrong: [sin(rad(28)), cos(rad(28))],
    explanation: t`Along: $F = mg\sin 28^\circ$; perpendicular: $R = mg\cos 28^\circ$. Limiting: $\mu = \frac{F}{R} = \tan 28^\circ = 0.532$.`,
    hints: ["Resolve along and perpendicular to the plank, then use F = μR."],
  });

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`A particle rests on a rough slope of angle $\alpha$. A force $P$ acts up the line of greatest slope, and $P$ is greater than $mg\sin\alpha$. The particle does not move. In which direction does friction act?`,
    options: [
      ["Down the slope", "Correct: P alone would push the particle up the slope, so friction opposes that."],
      ["Up the slope", "Friction acts up the slope only when the particle tends to slide down, i.e. P < mg sin α."],
      ["Perpendicular to the slope", "Friction always acts along the surface."],
      ["Friction is zero", "Friction is zero only when P exactly equals mg sin α."],
    ],
    answer: "A",
    explanation: t`Without friction the net force along the plane would be $P - mg\sin\alpha > 0$, up the slope, so friction acts down the slope with size $P - mg\sin\alpha$ (provided this is at most $\mu R$).`,
    hints: ["Which way would the particle move if the slope were smooth?"],
  });

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: "A heavy trunk on a rough floor can be moved either by pushing horizontally or by pulling with a rope angled upwards. Why can the angled pull start it moving with a smaller force?",
    options: [
      ["The upward part of the pull reduces R, so μR falls", "Correct: R = mg − P sin θ, so the maximum friction is smaller."],
      ["Pulling always needs less force than pushing", "A horizontal pull and push of equal size have the same effect."],
      ["The angled pull increases the normal reaction", "An upward component reduces the reaction; a downward push would increase it."],
      ["The angled pull removes friction entirely", "Friction is reduced, not removed, unless the trunk is lifted off the floor."],
    ],
    answer: "A",
    explanation: t`Vertically $R = mg - P\sin\theta$. A smaller $R$ means a smaller limiting friction $\mu R$, which can outweigh the loss of $P(1 - \cos\theta)$ in the horizontal component.`,
    hints: ["Resolve vertically to find R."],
  });

  {
    const Pv = (0.3 * 15 * g) / (cos(rad(20)) + 0.3 * sin(rad(20)));
    chk(Pv * cos(rad(20)), 0.3 * (15 * g - Pv * sin(rad(20))), 1e-9);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "A 15 kg sledge loaded with firewood rests on rough level ground, coefficient of friction 0.3. Farai pulls it with a rope at 20° above the horizontal. Take g = 9.8 m/s². Find the tension in the rope when the sledge is on the point of moving, correct to 3 significant figures.",
      value: Pv, unit: "N", wrong: [(0.3 * 15 * g) / cos(rad(20)), 0.3 * 15 * g],
      explanation: t`Vertically: $R = 147 - P\sin 20^\circ$. Horizontally: $P\cos 20^\circ = 0.3(147 - P\sin 20^\circ)$. So $P = \frac{44.1}{\cos 20^\circ + 0.3\sin 20^\circ} = 42.3$ N. Taking $R = 147$ N gives 46.9 N.`,
      workedSolution: steps(
        t`Resolve vertically: $R = 147 - P\sin 20^\circ$.`,
        t`Limiting friction: $F = 0.3R$.`,
        t`Resolve horizontally: $P\cos 20^\circ = 0.3(147 - P\sin 20^\circ)$.`,
        t`$P(0.9397 + 0.1026) = 44.1$, so $P = 42.3$ N.`,
      ),
      hints: ["The rope lifts the sledge a little: R is not 147 N.", "On the point of moving: F = μR."],
    });
  }

  {
    const R = 3 * g * cos(rad(22));
    const F = 3 * g * sin(rad(22));
    chk(F < 0.5 * R ? 1 : 0, 1);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "A 3 kg block rests on a rough plane inclined at 22° to the horizontal. The coefficient of friction is 0.5. Take g = 9.8 m/s². Find the frictional force on the block, correct to 3 significant figures.",
      value: F, unit: "N", wrong: [0.5 * R, 0.5 * 3 * g],
      explanation: t`Friction needed: $29.4\sin 22^\circ = 11.0$ N. Maximum: $0.5 \times 29.4\cos 22^\circ = 13.6$ N. As $11.0 < 13.6$ the block stays at rest and friction is 11.0 N, not $\mu R$.`,
      hints: ["Is the block in limiting equilibrium? Compare the friction needed with μR."],
    });
  }

  {
    const W = 6 * g;
    const Pmin = W * (sin(rad(40)) - 0.2 * cos(rad(40)));
    const Pup = W * (sin(rad(40)) + 0.2 * cos(rad(40)));
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: "A 6 kg parcel is on a rough ramp inclined at 40° to the horizontal, coefficient of friction 0.2. A force P N acts on it up the line of greatest slope. Take g = 9.8 m/s². Find the least value of P that prevents the parcel from sliding down, correct to 3 significant figures.",
      value: Pmin, unit: "N", wrong: [Pup, W * sin(rad(40))],
      explanation: t`About to slide down, so friction acts up the ramp: $P + 0.2R = 58.8\sin 40^\circ$ with $R = 58.8\cos 40^\circ = 45.04$. $P = 37.80 - 9.01 = 28.8$ N. Friction in the wrong direction gives 46.8 N.`,
      workedSolution: steps(
        t`$R = 58.8\cos 40^\circ = 45.04$ N, so $\mu R = 9.01$ N.`,
        t`About to slide down: friction up the ramp.`,
        t`$P = 58.8\sin 40^\circ - 9.01 = 37.80 - 9.01 = 28.8$ N.`,
      ),
      hints: ["About to slide down: which way does friction act?"],
    });
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: "The 6 kg parcel is on the same rough ramp (40°, coefficient of friction 0.2), with P acting up the line of greatest slope and g = 9.8 m/s². Find the value of P for which the parcel is about to move up the ramp, correct to 3 significant figures.",
      value: Pup, unit: "N", wrong: [Pmin, W * sin(rad(40))],
      explanation: t`About to move up, so friction acts down the ramp: $P = 58.8\sin 40^\circ + 0.2(58.8\cos 40^\circ) = 37.80 + 9.01 = 46.8$ N.`,
      hints: ["About to move up: friction now acts down the ramp."],
    });
  }

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each description with the condition it gives.",
    pairs: [
      ["Smooth surface", t`$\mu = 0$`],
      ["Limiting equilibrium", t`$F = \mu R$, particle at rest`],
      ["At rest, not on the point of moving", t`$F < \mu R$`],
      ["About to slip on a slope with no other forces", t`$\mu = \tan\alpha$`],
    ],
    explanation: t`Friction can take any value up to $\mu R$; it reaches $\mu R$ only when motion is about to start (or is happening). A smooth surface has no friction at all.`,
  });

  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 3,
    stem: t`A particle rests on a rough plane inclined at angle $\alpha$ to the horizontal, acted on only by its weight and the contact force, and is on the point of slipping. Show that the coefficient of friction is $\mu = \tan\alpha$.`,
    points: [
      t`M1 resolves perpendicular to the plane: $R = mg\cos\alpha$.`,
      t`M1 resolves along the plane: $F = mg\sin\alpha$, with $F = \mu R$ (limiting).`,
      t`A1 divides to obtain $\mu = \tan\alpha$.`,
    ],
    modelAnswer: t`$$
R = mg\cos\alpha
$$

$$
F = mg\sin\alpha
$$

Limiting equilibrium, so $F = \mu R$:

$$
mg\sin\alpha = \mu\,mg\cos\alpha \quad\Rightarrow\quad \mu = \frac{\sin\alpha}{\cos\alpha} = \tan\alpha
$$`,
    explanation: "The mass cancels, so the angle of slipping depends only on the surfaces.",
    hints: ["Resolve along and perpendicular to the plane."],
  });

  {
    const W = 25 * g;
    const R = W + 150 * sin(rad(20));
    const Fm = 0.45 * R;
    const H = 150 * cos(rad(20));
    const Pl = (0.45 * W) / (cos(rad(20)) - 0.45 * sin(rad(20)));
    chk(H > Fm ? 1 : 0, 1);
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
      stem: "A 25 kg box rests on a rough horizontal floor in a Mutare warehouse; the coefficient of friction is 0.45. Sipho pushes it with a force of 150 N directed downwards at 20° below the horizontal. Take g = 9.8 m/s².",
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Find the normal reaction, correct to 3 significant figures.", value: R, unit: "N", wrong: [W, W - 150 * sin(rad(20))],
          explanation: t`Vertically: $R = 245 + 150\sin 20^\circ = 296$ N. The push has a downward component, so $R > mg$.` }),
        P.num({ label: "(b)", marks: 1, stem: "Find the greatest possible friction, correct to 3 significant figures.", value: Fm, unit: "N", wrong: [0.45 * W],
          explanation: t`$\mu R = 0.45 \times 296.3 = 133$ N.` }),
        P.manual({ label: "(c)", marks: 2, stem: "Determine whether the box moves. Show your reasoning.",
          points: [t`Horizontal component of the push $150\cos 20^\circ = 141$ N.`, t`$141 > 133$, so friction cannot balance it and the box moves.`],
          modelAnswer: t`The horizontal component is $150\cos 20^\circ = 141.0$ N, greater than the maximum friction of 133.3 N, so the box starts to move.`,
          explanation: "Compare the horizontal force with μR." }),
        P.num({ label: "(d)", marks: 2, stem: "Find the least push at 20° below the horizontal that would just move the box, correct to 3 significant figures.", value: Pl, unit: "N", wrong: [(0.45 * W) / cos(rad(20))],
          explanation: t`$P\cos 20^\circ = 0.45(245 + P\sin 20^\circ)$, so $P = \frac{110.25}{\cos 20^\circ - 0.45\sin 20^\circ} = 140$ N.` }),
      ],
      explanation: "A downward push increases R and so increases the limiting friction; resolve vertically for R before using F = μR.",
      hints: ["Vertically: R balances the weight and the downward part of the push.", "Limiting: horizontal part of P = μR."],
    });
  }

  {
    const m = 4 * g;
    const s = sin(rad(30));
    const c = cos(rad(30));
    const Pmin = (m * (s - 0.25 * c)) / (c + 0.25 * s);
    const Pmax = (m * (s + 0.25 * c)) / (c - 0.25 * s);
    chk(Pmin * c + 0.25 * (m * c + Pmin * s), m * s, 1e-9);
    chk(Pmax * c, m * s + 0.25 * (m * c + Pmax * s), 1e-9);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: "A 4 kg particle rests on a rough plane inclined at 30° to the horizontal; the coefficient of friction is 0.25. A horizontal force of P N acts on the particle, in the vertical plane containing a line of greatest slope, pushing towards the plane. Take g = 9.8 m/s².",
      parts: [
        P.proof({ label: "(a)", marks: 2, stem: t`Show that the normal reaction is $R = 39.2\cos 30^\circ + P\sin 30^\circ$.`,
          points: [t`M1 resolves perpendicular to the plane, including the component $P\sin 30^\circ$ of the horizontal force.`, t`A1 obtains $R = 39.2\cos 30^\circ + P\sin 30^\circ$.`],
          modelAnswer: t`Perpendicular to the plane the weight has component $39.2\cos 30^\circ$ into the plane and the horizontal force has component $P\sin 30^\circ$ into the plane, so

$$
R = 39.2\cos 30^\circ + P\sin 30^\circ
$$`,
          explanation: "The horizontal force makes angle 30° with the plane, so its component perpendicular to the plane is P sin 30°." }),
        P.num({ label: "(b)", marks: 3, stem: "Find the least value of P that prevents the particle sliding down the plane, correct to 3 significant figures.", value: Pmin, unit: "N", wrong: [Pmax, m * (s - 0.25 * c) / c],
          explanation: t`Friction up the plane: $P\cos 30^\circ + 0.25R = 39.2\sin 30^\circ$, giving $P(\cos 30^\circ + 0.125) = 39.2(0.5 - 0.2165)$, so $P = 11.2$ N.` }),
        P.num({ label: "(c)", marks: 3, stem: "Find the value of P for which the particle is about to move up the plane, correct to 3 significant figures.", value: Pmax, unit: "N", wrong: [Pmin],
          explanation: t`Friction down the plane: $P\cos 30^\circ = 39.2\sin 30^\circ + 0.25R$, giving $P(\cos 30^\circ - 0.125) = 39.2(0.5 + 0.2165)$, so $P = 37.9$ N.` }),
        P.manual({ label: "(d)", marks: 1, stem: "State the range of values of P for which the particle remains at rest.",
          points: [t`$11.2 \leq P \leq 37.9$ (newtons, 3 s.f.).`],
          modelAnswer: t`The particle stays at rest for $11.2 \leq P \leq 37.9$.`,
          explanation: "Between the two limiting cases friction can adjust to keep the particle still." }),
      ],
      explanation: "The horizontal force has components along and into the plane, so it changes R. Use F = μR in each limiting case with friction opposing the motion that is about to happen.",
      hints: ["About to slide down: friction acts up the plane.", "About to move up: friction acts down the plane."],
    });
  }

  b.card("FORMULA", "Friction law", t`$F \leq \mu R$, with $F = \mu R$ in limiting equilibrium and when sliding.`);
  b.card("DEFINITION", "Limiting equilibrium", "At rest but on the point of moving: friction has its maximum value μR.");
  b.card("DEFINITION", "Coefficient of friction", "μ, a dimensionless number depending on the two surfaces; μ = 0 for a smooth surface.");
  b.card("FACT", "Particle about to slip on a slope with no other forces", t`$\mu = \tan\alpha$; the mass cancels.`);
  b.card("CONCEPT", "Direction of friction", "Opposite to the motion that would take place without friction (or to the actual motion if sliding).");
  b.card("CONCEPT", "Pulling at an angle above the horizontal", t`$R = mg - P\sin\theta$: the pull reduces the reaction and so the maximum friction.`);
  b.card("CONCEPT", "Deciding whether a particle moves", "Find the friction needed for equilibrium by resolving; if it exceeds μR the particle moves.");
  b.card("FORMULA", "Force P up a rough slope", t`About to slide down: $P = mg\sin\alpha - \mu R$. About to move up: $P = mg\sin\alpha + \mu R$.`, "Here P acts parallel to the slope, so R = mg cos α.");
});
