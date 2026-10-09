// W4a: amath.mechanics.newtons-laws-planes (ZIMSEC only)
import { concept, P, t, chk, rad, suvat, steps } from "../lib.mjs";

const { cos, sin, tan, sqrt } = Math;
const g = 9.8;

concept("amath.mechanics.newtons-laws-planes", { file: "mechanics/newtons-laws-planes", keyPrefix: "mechanics.newtons-laws-planes" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`A particle slides down a smooth plane inclined at $\alpha$ to the horizontal. What is its acceleration?`,
    options: [
      [t`$g\sin\alpha$`, "Correct: the only force along the plane is the weight component mg sin α, so a = g sin α."],
      [t`$g\cos\alpha$`, "This comes from the component of the weight perpendicular to the plane, which is balanced by R."],
      [t`$g\tan\alpha$`, "This is not a component of the weight along the plane."],
      [t`$g$`, "The particle would accelerate at g only if it fell vertically."],
    ],
    answer: "A",
    explanation: t`Along the plane: $mg\sin\alpha = ma$, so $a = g\sin\alpha$. The mass cancels.`,
  });

  b.tf({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`While a particle slides over a rough surface, the frictional force on it is $\mu R$.`,
    answer: true,
    explanation: t`True. Once sliding, friction takes its limiting value $F = \mu R$ and acts opposite to the direction of motion.`,
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: "A trolley runs down a smooth ramp inclined at 15° to the horizontal. Take g = 9.8 m/s². Find its acceleration, correct to 3 significant figures.",
    value: g * sin(rad(15)), unit: "m/s²", wrong: [g * cos(rad(15)), g * tan(rad(15))],
    explanation: t`$a = g\sin 15^\circ = 9.8 \times 0.2588 = 2.54$ m s$^{-2}$.`,
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: "A 6 kg box on a smooth horizontal floor is pushed with a force of 24 N directed at 30° below the horizontal. Find the acceleration of the box, correct to 3 significant figures.",
    value: (24 * cos(rad(30))) / 6, unit: "m/s²", wrong: [24 / 6, (24 * sin(rad(30))) / 6],
    explanation: t`Only the horizontal component accelerates the box: $a = \frac{24\cos 30^\circ}{6} = 3.46$ m s$^{-2}$. The floor is smooth, so the downward component only increases $R$.`,
  });

  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A block slides down a rough plane inclined at 35° to the horizontal. The coefficient of friction is 0.4. Take g = 9.8 m/s². Find its acceleration, correct to 3 significant figures.",
    value: g * (sin(rad(35)) - 0.4 * cos(rad(35))), unit: "m/s²", wrong: [g * (sin(rad(35)) + 0.4 * cos(rad(35))), g * sin(rad(35)) - 0.4 * g],
    explanation: t`$R = mg\cos 35^\circ$, so friction $= 0.4mg\cos 35^\circ$ up the plane. $ma = mg\sin 35^\circ - 0.4mg\cos 35^\circ$, giving $a = 9.8(0.5736 - 0.3277) = 2.41$ m s$^{-2}$.`,
    hints: ["Find R by resolving perpendicular to the plane.", "Friction acts up the plane because the block slides down."],
  });

  {
    const R = 12 * g - 65 * sin(rad(30));
    const a = (65 * cos(rad(30)) - 0.25 * R) / 12;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "A 12 kg sack is dragged along rough horizontal ground by a rope inclined at 30° above the horizontal. The tension is 65 N and the coefficient of friction is 0.25. Take g = 9.8 m/s². Find the acceleration of the sack, correct to 3 significant figures.",
      value: a, unit: "m/s²", wrong: [(65 * cos(rad(30)) - 0.25 * 12 * g) / 12, (65 - 0.25 * R) / 12],
      explanation: t`$R = 117.6 - 65\sin 30^\circ = 85.1$ N, $F = 0.25 \times 85.1 = 21.275$ N. N2L: $65\cos 30^\circ - 21.275 = 12a$, so $a = \frac{56.29 - 21.28}{12} = 2.92$ m s$^{-2}$. Using $R = 117.6$ gives 2.24.`,
      workedSolution: steps(
        t`Vertically: $R = 117.6 - 32.5 = 85.1$ N.`,
        t`Sliding: $F = 0.25 \times 85.1 = 21.275$ N.`,
        t`Horizontally: $56.29 - 21.28 = 12a$.`,
        t`$a = 2.92$ m s$^{-2}$.`,
      ),
      hints: ["The rope lifts the sack slightly, so R < mg."],
    });
  }

  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A box is pushed up a rough ramp inclined at 15° and then released while still moving up. The coefficient of friction is 0.35. Take g = 9.8 m/s². Find its deceleration while it continues up the ramp, correct to 3 significant figures.",
    value: g * (sin(rad(15)) + 0.35 * cos(rad(15))), unit: "m/s²", wrong: [g * (sin(rad(15)) - 0.35 * cos(rad(15)))],
    explanation: t`Moving up: both $mg\sin 15^\circ$ and friction $0.35mg\cos 15^\circ$ act down the ramp. Deceleration $= 9.8(0.2588 + 0.3381) = 5.85$ m s$^{-2}$.`,
    hints: ["Which way does friction act while the box moves up?"],
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "A particle is projected up a line of greatest slope of a rough plane. While it is moving up, in which direction does friction act?",
    options: [
      ["Down the plane", "Correct: friction opposes the motion, which is up the plane."],
      ["Up the plane", "Friction acts up the plane only when the particle moves (or tends to move) down."],
      ["Perpendicular to the plane", "That is the direction of the normal reaction."],
      ["Vertically downwards", "Friction acts along the surface; vertically downwards is the weight."],
    ],
    answer: "A",
    explanation: "Friction always opposes the relative motion. Moving up the plane, both friction and mg sin α act down the plane, so the particle slows quickly.",
  });

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`A particle projected up a rough plane of angle $\alpha$ comes to instantaneous rest. The coefficient of friction is $\mu$. When does it stay at rest instead of sliding back?`,
    options: [
      [t`When $\tan\alpha \leq \mu$`, "Correct: the greatest friction μmg cos α can then balance mg sin α."],
      [t`When $\tan\alpha > \mu$`, "Then mg sin α exceeds the greatest friction, so it slides back down."],
      [t`When $\sin\alpha \leq \mu$`, "The comparison is mg sin α with μmg cos α, which gives tan α, not sin α."],
      ["It always slides back down", "On a steep enough rough slope it slides back, but not always."],
    ],
    answer: "A",
    explanation: t`At rest it needs friction $mg\sin\alpha$, and the most available is $\mu mg\cos\alpha$. It stays put when $mg\sin\alpha \leq \mu mg\cos\alpha$, i.e. $\tan\alpha \leq \mu$.`,
    hints: ["Compare the friction needed with the greatest friction available."],
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "A rope with tension T at an angle θ above the horizontal drags a block of mass m along a rough horizontal floor. Which expression gives the normal reaction?",
    options: [
      [t`$mg - T\sin\theta$`, "Correct: the rope's upward component takes some of the weight."],
      [t`$mg + T\sin\theta$`, "This would be correct for a push directed downwards at θ below the horizontal."],
      [t`$mg - T\cos\theta$`, "T cos θ is the horizontal component, which does not affect R."],
      [t`$mg$`, "This ignores the vertical component of the tension."],
    ],
    answer: "A",
    explanation: t`Vertically there is no acceleration: $R + T\sin\theta = mg$, so $R = mg - T\sin\theta$.`,
  });

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: "A 2 kg block and a 5 kg block, made of the same material, slide down the same rough plane. How do their accelerations compare?",
    options: [
      ["They are equal", "Correct: a = g(sin α − μ cos α), and the mass cancels."],
      ["The 5 kg block has the greater acceleration", "Its weight component is larger, but so are its friction and its mass, in the same ratio."],
      ["The 2 kg block has the greater acceleration", "Less friction acts on it, but its smaller weight component cancels this out."],
      ["It depends on which block is released first", "Each block's acceleration depends only on α, μ and g."],
    ],
    answer: "A",
    explanation: t`$ma = mg\sin\alpha - \mu mg\cos\alpha$, so $a = g(\sin\alpha - \mu\cos\alpha)$ for every mass.`,
    hints: ["Write N2L down the plane and see what happens to m."],
  });

  {
    const a = 16 / (2 * 2.5);
    const mu = (g * sin(rad(40)) - a) / (g * cos(rad(40)));
    chk(g * (sin(rad(40)) - mu * cos(rad(40))), 3.2, 1e-9);
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: "A 3 kg block is released from rest on a rough plane inclined at 40° to the horizontal. It reaches a speed of 4 m/s after sliding 2.5 m. Take g = 9.8 m/s². Find the coefficient of friction, correct to 3 significant figures.",
      value: mu, wrong: [(g * sin(rad(40)) - 4 / 2.5) / (g * cos(rad(40))), tan(rad(40))],
      explanation: t`$v^2 = 2as$: $16 = 5a$, so $a = 3.2$ m s$^{-2}$. N2L per kg: $9.8\sin 40^\circ - \mu(9.8\cos 40^\circ) = 3.2$, so $\mu = \frac{6.299 - 3.2}{7.507} = 0.413$. Taking $a = \frac{4}{2.5}$ is wrong: that is not an equation of motion.`,
      workedSolution: steps(
        t`$v^2 = u^2 + 2as$: $16 = 0 + 2a(2.5)$, $a = 3.2$ m s$^{-2}$.`,
        t`$R = 3(9.8)\cos 40^\circ = 22.52$ N, friction $= 22.52\mu$ up the plane.`,
        t`N2L down the plane: $3(9.8)\sin 40^\circ - 22.52\mu = 3(3.2)$.`,
        t`$18.90 - 22.52\mu = 9.6$, so $\mu = 0.413$.`,
      ),
      hints: ["Find the acceleration from the motion first.", "Then use N2L down the plane with F = μR."],
    });
  }

  {
    const d = g * (sin(rad(25)) + 0.15 * cos(rad(25)));
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: "A puck is projected at 6 m/s up a line of greatest slope of a rough plane inclined at 25° to the horizontal. The coefficient of friction is 0.15. Take g = 9.8 m/s². Find how far up the plane it travels before coming to rest, correct to 3 significant figures.",
      value: 36 / (2 * d), unit: "m", wrong: [36 / (2 * g * (sin(rad(25)) - 0.15 * cos(rad(25)))), 36 / (2 * g * sin(rad(25)))],
      explanation: t`Deceleration $= 9.8(\sin 25^\circ + 0.15\cos 25^\circ) = 5.474$ m s$^{-2}$. $0 = 36 - 2(5.474)s$, so $s = 3.29$ m. With friction acting up the plane you get 6.41 m.`,
      hints: ["Moving up, friction and the weight component both act down the plane.", "Then use v² = u² + 2as."],
    });
  }

  {
    const T = 10 * 0.5 + 10 * g * sin(rad(20)) + 0.25 * 10 * g * cos(rad(20));
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: "A 10 kg crate is pulled up a rough ramp inclined at 20° by a rope parallel to the ramp. The coefficient of friction is 0.25 and the crate accelerates at 0.5 m/s². Take g = 9.8 m/s². Find the tension in the rope, correct to 3 significant figures.",
      value: T, unit: "N", wrong: [10 * 0.5 + 10 * g * sin(rad(20)) - 0.25 * 10 * g * cos(rad(20)), 10 * 0.5 + 0.25 * 10 * g * cos(rad(20))],
      explanation: t`$R = 98\cos 20^\circ = 92.09$ N, friction $= 23.02$ N down the ramp. N2L up the ramp: $T - 98\sin 20^\circ - 23.02 = 10(0.5)$, so $T = 5 + 33.52 + 23.02 = 61.5$ N.`,
      workedSolution: steps(
        t`Perpendicular: $R = 98\cos 20^\circ = 92.09$ N.`,
        t`Friction (sliding, down the ramp): $0.25 \times 92.09 = 23.02$ N.`,
        t`N2L up the ramp: $T - 33.52 - 23.02 = 5$.`,
        t`$T = 61.5$ N.`,
      ),
      hints: ["The crate moves up, so friction acts down the ramp.", "Include the weight component down the ramp."],
    });
  }

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`A particle moves on a plane inclined at $\alpha$ (coefficient of friction $\mu$ where rough), with no applied force. Match each situation with the size of its acceleration.`,
    pairs: [
      ["Sliding down a smooth plane", t`$g\sin\alpha$`],
      ["Sliding down a rough plane", t`$g(\sin\alpha - \mu\cos\alpha)$`],
      ["Moving up a rough plane", t`$g(\sin\alpha + \mu\cos\alpha)$`],
      ["Sliding on a rough horizontal floor", t`$\mu g$`],
    ],
    explanation: "Friction opposes the motion: it reduces the acceleration down the plane and adds to the deceleration up it. On a horizontal floor only friction acts along the motion.",
  });

  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 3,
    stem: t`A particle of mass $m$ slides down a rough plane inclined at $\alpha$ to the horizontal; the coefficient of friction is $\mu$. Show that its acceleration is $g(\sin\alpha - \mu\cos\alpha)$.`,
    points: [
      t`M1 resolves perpendicular to the plane: $R = mg\cos\alpha$.`,
      t`M1 applies N2L down the plane with friction $\mu R$ up the plane: $mg\sin\alpha - \mu R = ma$.`,
      t`A1 substitutes and cancels $m$ to reach $a = g(\sin\alpha - \mu\cos\alpha)$.`,
    ],
    modelAnswer: t`Perpendicular to the plane:

$$
R = mg\cos\alpha
$$

Down the plane, with $F = \mu R$ acting up the plane:

$$
mg\sin\alpha - \mu mg\cos\alpha = ma
$$

$$
a = g(\sin\alpha - \mu\cos\alpha)
$$`,
    explanation: "The mass cancels, so all particles with the same μ slide with the same acceleration.",
    hints: ["Find R first, then use F = μR."],
  });

  {
    const R = 4 * g * cos(rad(28));
    const a = g * (sin(rad(28)) - 0.25 * cos(rad(28)));
    const m = suvat({ u: 0, a, s: 6 });
    chk(m.v, sqrt(12 * a), 1e-9);
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
      stem: "A 4 kg box is released from rest at the top of a rough ramp 6 m long, inclined at 28° to the horizontal. The coefficient of friction is 0.25. Take g = 9.8 m/s².",
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Find the normal reaction, correct to 3 significant figures.", value: R, unit: "N", wrong: [4 * g],
          explanation: t`$R = 39.2\cos 28^\circ = 34.6$ N.` }),
        P.num({ label: "(b)", marks: 3, stem: "Find the acceleration of the box, correct to 3 significant figures.", value: a, unit: "m/s²", wrong: [g * sin(rad(28)), g * (sin(rad(28)) + 0.25 * cos(rad(28)))],
          explanation: t`N2L down the ramp: $39.2\sin 28^\circ - 0.25(34.61) = 4a$, so $18.40 - 8.65 = 4a$ and $a = 2.44$ m s$^{-2}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Find the speed of the box at the bottom of the ramp, correct to 3 significant figures.", value: m.v, unit: "m/s", wrong: [sqrt(6 * a)],
          explanation: t`$v^2 = 2(2.438)(6) = 29.25$, so $v = 5.41$ m s$^{-1}$.` }),
        P.num({ label: "(d)", marks: 1, stem: "Find the time taken to reach the bottom, correct to 3 significant figures.", value: m.t, unit: "s", wrong: [6 / m.v],
          explanation: t`$t = \frac{v}{a} = \frac{5.408}{2.438} = 2.22$ s.` }),
      ],
      explanation: "Resolve perpendicular for R, use F = μR while sliding, apply N2L down the ramp, then the equations of motion.",
      hints: ["Friction acts up the ramp.", "Keep 4 significant figures for a before using it again."],
    });
  }

  {
    const up = g * (sin(rad(32)) + 0.15 * cos(rad(32)));
    const s = 100 / (2 * up);
    const dn = g * (sin(rad(32)) - 0.15 * cos(rad(32)));
    const vBack = sqrt(2 * dn * s);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: "A particle is projected with speed 10 m/s up a line of greatest slope of a rough plane inclined at 32° to the horizontal. The coefficient of friction is 0.15. Take g = 9.8 m/s².",
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Find the deceleration of the particle as it moves up the plane, correct to 3 significant figures.", value: up, unit: "m/s²", wrong: [dn],
          explanation: t`$9.8(\sin 32^\circ + 0.15\cos 32^\circ) = 9.8(0.5299 + 0.1272) = 6.44$ m s$^{-2}$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Find the distance it travels up the plane, correct to 3 significant figures.", value: s, unit: "m", wrong: [100 / up],
          explanation: t`$0 = 100 - 2(6.440)s$, so $s = 7.76$ m.` }),
        P.proof({ label: "(c)", marks: 1, stem: "Show that the particle then slides back down the plane.",
          points: [t`B1 compares $\tan 32^\circ = 0.625$ with $\mu = 0.15$ (or $mg\sin 32^\circ$ with $\mu mg\cos 32^\circ$) and concludes that friction cannot hold it.`],
          modelAnswer: t`At rest it would need friction $mg\sin 32^\circ = 0.530mg$, but the most available is $0.15mg\cos 32^\circ = 0.127mg$. Since $\tan 32^\circ = 0.625 > 0.15$, it slides back down.`,
          explanation: t`It stays at rest only if $\tan\alpha \leq \mu$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Find its acceleration as it slides back down, correct to 3 significant figures.", value: dn, unit: "m/s²", wrong: [up],
          explanation: t`Friction now acts up the plane: $9.8(0.5299 - 0.1272) = 3.95$ m s$^{-2}$.` }),
        P.num({ label: "(e)", marks: 2, stem: "Find its speed when it returns to the point of projection, correct to 3 significant figures.", value: vBack, unit: "m/s", wrong: [10],
          explanation: t`$v^2 = 2(3.947)(7.764) = 61.28$, so $v = 7.83$ m s$^{-1}$, less than 10 m s$^{-1}$ because friction removes energy both ways.` }),
      ],
      explanation: "Friction reverses direction when the motion reverses: deceleration g(sin α + μ cos α) going up, acceleration g(sin α − μ cos α) coming down.",
      hints: ["Going up, friction acts down the plane.", "Coming down, friction acts up the plane."],
    });
  }

  b.card("FORMULA", "Sliding down a smooth plane", t`$a = g\sin\alpha$`);
  b.card("FORMULA", "Sliding down a rough plane", t`$a = g(\sin\alpha - \mu\cos\alpha)$`, "Friction μmg cos α acts up the plane.");
  b.card("FORMULA", "Moving up a rough plane (no applied force)", t`deceleration $= g(\sin\alpha + \mu\cos\alpha)$`);
  b.card("CONCEPT", "Method for N2L with resolving", "Perpendicular to the motion: forces balance (gives R). Along the motion: resultant = ma. Use F = μR while sliding.");
  b.card("FORMULA", "Angled pull on a rough horizontal floor", t`$R = mg - T\sin\theta$ and $T\cos\theta - \mu R = ma$`);
  b.card("FACT", "After stopping on a rough slope", t`It slides back only if $\tan\alpha > \mu$.`);
  b.card("CONCEPT", "Finding μ from the motion", "Use the equations of motion to find a, then N2L along the plane with F = μR.");
  b.card("FACT", "Mass and sliding acceleration", "With no applied force, the acceleration on a slope does not depend on the mass.");
});
