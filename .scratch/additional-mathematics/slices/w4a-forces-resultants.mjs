// W4a: amath.mechanics.forces-resultants (ZIMSEC only)
import { concept, P, t, chk, rad, resultant, steps } from "../lib.mjs";

const { cos, sin, sqrt, hypot } = Math;

concept("amath.mechanics.forces-resultants", { file: "mechanics/forces-resultants", keyPrefix: "mechanics.forces-resultants" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "What is the SI unit of force?",
    options: [
      ["The newton", "Correct: 1 N gives a mass of 1 kg an acceleration of 1 m/s²."],
      ["The kilogram", "The kilogram is the unit of mass, not of force."],
      ["The joule", "The joule is the unit of work and energy."],
      ["The watt", "The watt is the unit of power."],
    ],
    answer: "A",
    explanation: "Force is measured in newtons (N). 1 N = 1 kg m/s².",
  });

  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "A box rests on a table. Which force does the table exert on the box at right angles to the table top?",
    options: [
      ["The normal reaction", "Correct: a surface pushes on a body perpendicular to the surface."],
      ["The weight of the box", "The weight is exerted by the Earth, not by the table."],
      ["The friction force", "Friction acts along the surface, not perpendicular to it."],
      ["The tension", "Tension is the pull in a string or rope."],
    ],
    answer: "A",
    explanation: "The contact force from a surface has a component perpendicular to the surface (the normal reaction) and, if the surface is rough, one along it (friction).",
  });

  b.tf({
    d: 1, skill: "RECALL", calculator: false,
    stem: "Take g = 9.8 m/s². The weight of a bag of mass 5 kg is 5 N.",
    answer: false,
    explanation: t`False. Weight is a force: $W = mg = 5 \times 9.8 = 49$ N. The mass is 5 kg.`,
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: "A sack of groundnuts has mass 6.5 kg. Take g = 9.8 m/s². Find its weight.",
    value: 6.5 * 9.8, unit: "N", wrong: [6.5, 6.5 / 9.8],
    explanation: t`$W = mg = 6.5 \times 9.8 = 63.7$ N.`,
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: "A rope pulls a log along level ground with a force of 50 N at 40° above the horizontal. Find the horizontal component of the force, correct to 3 significant figures.",
    value: 50 * cos(rad(40)), unit: "N", wrong: [50 * sin(rad(40))],
    explanation: t`Horizontal component $= 50\cos 40^\circ = 38.3$ N. Using sine (32.1 N) gives the vertical component.`,
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "Forces of 9 N due east and 12 N due north act on a particle. Find the magnitude of their resultant.",
    value: hypot(9, 12), unit: "N", wrong: [21, 3],
    explanation: t`The forces are perpendicular: $R = \sqrt{9^2 + 12^2} = \sqrt{225} = 15$ N. Adding the sizes (21 N) ignores the directions.`,
  });

  {
    const ang = Math.atan(12 / 5) * 180 / Math.PI;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "Forces of 5 N due east and 12 N due south act on a particle. Find the angle between the resultant and the 5 N force, correct to 1 decimal place.",
      value: ang, unit: "°", wrong: [90 - ang],
      explanation: t`The resultant is $\sqrt{25 + 144} = 13$ N. $\tan\alpha = \frac{12}{5}$ gives $\alpha = 67.4^\circ$ south of east. The value $22.6^\circ$ is the angle with the 12 N force.`,
      hints: ["Draw the right-angled triangle of forces.", "The 12 N side is opposite the angle at the 5 N force."],
    });
  }

  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`A force of 26 N acts at an angle $\theta$ above the horizontal, where $\tan\theta = \frac{5}{12}$. Find its horizontal and vertical components exactly.`,
    template: "horizontal = {{blank:x}} N, vertical = {{blank:y}} N",
    blanks: [{ id: "x", input: "number", accepted: [24], wrong: "10" }, { id: "y", input: "number", accepted: [10], wrong: "24" }],
    explanation: t`With $\tan\theta = \frac{5}{12}$ the triangle is 5, 12, 13, so $\cos\theta = \frac{12}{13}$ and $\sin\theta = \frac{5}{13}$. Components: $26 \times \frac{12}{13} = 24$ N and $26 \times \frac{5}{13} = 10$ N.`,
    hints: ["Use the 5, 12, 13 right-angled triangle to find sin θ and cos θ."],
  });

  {
    const R = sqrt(49 + 100 + 140 * cos(rad(50)));
    chk(resultant([[7, 0], [10, 50]]).mag, R, 1e-9);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "Two forces of 7 N and 10 N act at a point, with an angle of 50° between them. Find the magnitude of their resultant, correct to 3 significant figures.",
      value: R, unit: "N", wrong: [sqrt(149 - 140 * cos(rad(50))), 17],
      explanation: t`$R^2 = 7^2 + 10^2 + 2(7)(10)\cos 50^\circ = 149 + 89.99 = 238.99$, so $R = 15.5$ N. The minus sign (as in the cosine rule for the triangle's angle of $50^\circ$) gives 7.68 N, which is wrong because the angle in the triangle of forces is $130^\circ$.`,
      hints: [t`In the triangle of forces, the angle opposite the resultant is $180^\circ - 50^\circ$.`],
    });
  }

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: "A force of 30 N acts at 25° to the vertical. Which expression gives its horizontal component?",
    options: [
      [t`$30\sin 25^\circ$`, "Correct: the horizontal direction is perpendicular to the vertical, so use sine of the angle with the vertical."],
      [t`$30\cos 25^\circ$`, "This is the vertical component, along the direction the angle is measured from."],
      [t`$30\tan 25^\circ$`, "Tangent gives a ratio of components, not a component of the force."],
      [t`$\dfrac{30}{\sin 25^\circ}$`, "Dividing would give a value larger than the force itself."],
    ],
    answer: "A",
    explanation: "Component along a direction = F cos(angle with that direction). The angle with the horizontal is 65°, and 30 cos 65° = 30 sin 25°.",
    hints: ["What is the angle between the force and the horizontal?"],
  });

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: true,
    stem: t`The resultant of a set of forces has components $X = -4$ N and $Y = 3$ N. In which direction does it act, measured anticlockwise from the positive $x$-axis?`,
    options: [
      [t`$143.1^\circ$`, "Correct: X < 0 and Y > 0 put the resultant in the second quadrant, 180° − 36.9°."],
      [t`$36.9^\circ$`, "This is the acute angle from the calculator; it ignores the sign of X."],
      [t`$-36.9^\circ$`, "This is the calculator value of tan⁻¹(3/−4), which points into the fourth quadrant."],
      [t`$216.9^\circ$`, "This is in the third quadrant, where both components are negative."],
    ],
    answer: "A",
    explanation: t`$\tan^{-1}\frac{3}{4} = 36.9^\circ$. With $X$ negative and $Y$ positive the resultant points up and to the left, so its direction is $180^\circ - 36.9^\circ = 143.1^\circ$. Its magnitude is 5 N.`,
    hints: ["Sketch the components to see the quadrant."],
  });

  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Three forces $(3\mathbf{i} + 4\mathbf{j})$ N, $(-5\mathbf{i} + 2\mathbf{j})$ N and $(6\mathbf{i} - 9\mathbf{j})$ N act on a particle. Find the resultant in the form $(a\mathbf{i} + b\mathbf{j})$ N and its magnitude.`,
    template: "a = {{blank:a}}, b = {{blank:b}}, magnitude = {{blank:m}} N",
    blanks: [{ id: "a", input: "number", accepted: [4], wrong: "14" }, { id: "b", input: "number", accepted: [-3], wrong: "15" }, { id: "m", input: "number", accepted: [5], wrong: "7" }],
    explanation: t`$\mathbf{i}$: $3 - 5 + 6 = 4$; $\mathbf{j}$: $4 + 2 - 9 = -3$. Magnitude $\sqrt{4^2 + 3^2} = 5$ N.`,
    hints: ["Add the i-components and the j-components separately."],
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Two forces of 5 N and 8 N act at a point. Which of these cannot be the magnitude of their resultant?",
    options: [
      ["2 N", "Correct: the smallest possible resultant is 8 − 5 = 3 N, when the forces are opposite."],
      ["3 N", "Possible: the forces act in opposite directions."],
      ["10 N", "Possible: the angle between them is between 0° and 180°."],
      ["13 N", "Possible: the forces act in the same direction."],
    ],
    answer: "A",
    explanation: "The resultant of P and Q lies between |P − Q| and P + Q, so here between 3 N and 13 N. 2 N is impossible.",
  });

  b.match({
    d: 2, skill: "RECALL", calculator: false,
    stem: "Match each force with its description.",
    pairs: [
      ["Weight", "The pull of the Earth on a body, acting vertically downwards"],
      ["Normal reaction", "The push of a surface on a body, perpendicular to the surface"],
      ["Friction", "A force along a rough surface opposing motion or the tendency to move"],
      ["Tension", "The pull exerted by a taut string or rope along its length"],
    ],
    explanation: "These four forces appear in almost every Mechanics question; name each one on your force diagram.",
  });

  {
    const P0 = 21 / sqrt(7);
    chk(sqrt(P0 ** 2 + 4 * P0 ** 2 + 2 * P0 * 2 * P0 * cos(rad(60))), 21, 1e-9);
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: "Two forces of P N and 2P N act at a point with an angle of 60° between them. Their resultant has magnitude 21 N. Find P, correct to 3 significant figures.",
      value: P0, unit: "N", wrong: [7, 21 / sqrt(3)],
      explanation: t`$21^2 = P^2 + 4P^2 + 2(P)(2P)\cos 60^\circ = 5P^2 + 2P^2 = 7P^2$. So $P^2 = 63$ and $P = 7.94$. Using $2PQ\cos\theta$ with a minus sign gives $3P^2$ and $P = 12.1$; dividing 21 by 3 gives 7.`,
      workedSolution: steps(
        t`$R^2 = P^2 + Q^2 + 2PQ\cos\theta$ with $Q = 2P$, $\theta = 60^\circ$.`,
        t`$441 = P^2 + 4P^2 + 2P^2 = 7P^2$.`,
        t`$P = \sqrt{63} = 7.94$ N.`,
      ),
      hints: [t`$R^2 = P^2 + Q^2 + 2PQ\cos\theta$, with $\theta$ the angle between the forces.`],
    });
  }

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 4,
    stem: "A crate is pulled up a rough ramp by a rope parallel to the ramp. List every force acting on the crate, giving the direction of each.",
    points: [
      "Weight, vertically downwards.",
      "Normal reaction, perpendicular to the ramp, away from it.",
      "Friction, along the ramp, downwards (opposing the motion up the ramp).",
      "Tension in the rope, along the ramp, upwards.",
    ],
    modelAnswer: "Four forces: the weight mg acting vertically downwards; the normal reaction R perpendicular to the ramp surface; friction F acting down the ramp because the crate moves up it; and the tension T in the rope, acting up the ramp parallel to it.",
    explanation: "Weight always acts; each surface gives a normal reaction and, if rough, friction opposing the motion; each string gives a tension along it.",
    hints: ["Which way does friction act when the crate moves up the ramp?"],
  });

  {
    const F = [[6, 0], [8, 90], [10, 225]];
    const r = resultant(F);
    chk(r.x, 6 - 5 * sqrt(2), 1e-9);
    chk(r.y, 8 - 5 * sqrt(2), 1e-9);
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
      stem: "Three forces act on a particle: 6 N in the direction of the positive x-axis, 8 N in the direction of the positive y-axis, and 10 N in the direction 225° measured anticlockwise from the positive x-axis.",
      parts: [
        P.fib({ label: "(a)", marks: 4, stem: "Find the sum of the x-components and the sum of the y-components, correct to 3 significant figures.",
          template: "X = {{blank:x}} N, Y = {{blank:y}} N",
          blanks: [{ id: "x", input: "number", accepted: [Number(r.x.toFixed(4))], tolerance: 0.005, marks: 2, wrong: "13.1" }, { id: "y", input: "number", accepted: [Number(r.y.toFixed(4))], tolerance: 0.005, marks: 2, wrong: "15.1" }],
          explanation: t`$X = 6 + 10\cos 225^\circ = 6 - 7.071 = -1.07$; $Y = 8 + 10\sin 225^\circ = 8 - 7.071 = 0.929$.` }),
        P.num({ label: "(b)", marks: 1, stem: "Find the magnitude of the resultant, correct to 3 significant figures.", value: r.mag, unit: "N", wrong: [24],
          explanation: t`$R = \sqrt{1.071^2 + 0.929^2} = 1.42$ N.` }),
        P.num({ label: "(c)", marks: 2, stem: "Find the direction of the resultant, measured anticlockwise from the positive x-axis, correct to 1 decimal place.", value: r.angle, unit: "°", wrong: [40.9, -40.9],
          explanation: t`$X < 0$ and $Y > 0$: second quadrant. $\tan^{-1}\frac{0.929}{1.071} = 40.9^\circ$, so the direction is $180^\circ - 40.9^\circ = 139.1^\circ$.` }),
      ],
      explanation: "Resolve each force with its angle from the positive x-axis (cos 225° and sin 225° are both negative), add, then recombine and place the resultant in the correct quadrant.",
      hints: [t`$\cos 225^\circ = \sin 225^\circ = -\frac{\sqrt{2}}{2}$.`, "Sketch X and Y to find the quadrant."],
    });
  }

  {
    const F = 8 / -cos(rad(120));
    chk(F, 16, 1e-9);
    const R1 = F * sin(rad(120));
    const R2 = sqrt(64 + 121 + 2 * 8 * 11 * cos(rad(120)));
    chk(R2, sqrt(97), 1e-9);
    const ang2 = resultant([[8, 0], [11, 120]]).angle;
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: t`Two forces act at a point $O$: a force of 8 N along $OA$ and a force of $F$ N along $OB$, where angle $AOB = 120^\circ$.`,
      parts: [
        P.proof({ label: "(a)", marks: 2, stem: t`The resultant of the two forces is perpendicular to $OA$. Show that $F = 16$.`,
          points: [t`M1 resolves along $OA$: $8 + F\cos 120^\circ = 0$.`, t`A1 uses $\cos 120^\circ = -\frac{1}{2}$ to reach $F = 16$.`],
          modelAnswer: t`The resultant has no component along $OA$:

$$
8 + F\cos 120^\circ = 0
$$

$$
8 - \tfrac{1}{2}F = 0 \quad\Rightarrow\quad F = 16
$$`,
          explanation: "Perpendicular to OA means the component along OA is zero." }),
        P.num({ label: "(b)", marks: 2, stem: "Find the magnitude of the resultant in this case, correct to 3 significant figures.", value: R1, unit: "N", wrong: [sqrt(64 + 256), 8],
          explanation: t`The resultant is the component perpendicular to $OA$: $16\sin 120^\circ = 8\sqrt{3} = 13.9$ N.` }),
        P.num({ label: "(c)", marks: 3, stem: t`Instead, $F = 11$. Find the magnitude of the resultant, correct to 3 significant figures.`, value: R2, unit: "N", wrong: [sqrt(64 + 121 + 88)],
          explanation: t`$R^2 = 64 + 121 + 2(8)(11)\cos 120^\circ = 185 - 88 = 97$, so $R = 9.85$ N.` }),
        P.num({ label: "(d)", marks: 2, stem: t`With $F = 11$, find the angle between the resultant and $OA$, correct to 1 decimal place.`, value: ang2, unit: "°", wrong: [90 - ang2],
          explanation: t`Along $OA$: $8 + 11\cos 120^\circ = 2.5$; perpendicular: $11\sin 120^\circ = 9.526$. $\tan^{-1}\frac{9.526}{2.5} = 75.3^\circ$.` }),
      ],
      explanation: "Resolve along OA and perpendicular to it; the cosine rule with +2PQ cos θ gives the size of a resultant of two forces.",
      hints: [t`$\cos 120^\circ = -\frac{1}{2}$ and $\sin 120^\circ = \frac{\sqrt{3}}{2}$.`, "For (c), use R² = P² + Q² + 2PQ cos θ."],
    });
  }

  b.card("DEFINITION", "Force", "A push or pull that changes, or tends to change, the motion of a body. A vector measured in newtons (N).");
  b.card("FORMULA", "Weight", t`$W = mg$, acting vertically downwards (g is given in the question, e.g. $9.8$ m s$^{-2}$).`);
  b.card("FORMULA", "Components of a force F at θ to the x-axis", t`$F\cos\theta$ along the $x$-axis, $F\sin\theta$ along the $y$-axis.`);
  b.card("FORMULA", "Resultant from components", t`$R = \sqrt{X^2 + Y^2}$, direction $\tan\alpha = \dfrac{Y}{X}$ (check the quadrant).`);
  b.card("FORMULA", "Resultant of two forces at angle θ", t`$R^2 = P^2 + Q^2 + 2PQ\cos\theta$`, "θ is the angle between the two forces; the triangle of forces has 180° − θ opposite R.");
  b.card("DEFINITION", "Resultant", "The single force equivalent to all the forces acting together: their vector sum.");
  b.card("FACT", "Range of the resultant of P and Q", t`$|P - Q| \leq R \leq P + Q$`);
  b.card("CONCEPT", "Normal reaction and friction", "The two components of the contact force from a surface: the normal reaction perpendicular to it, friction along it.");
});
