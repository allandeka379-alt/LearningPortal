// W1a: kinematics.projectiles — independent horizontal and vertical motion, time of flight, range, maximum height.
import { concept, P, t as raw, chk, sfStr, dpStr, table, pctUnc, DATA, deg, rad } from "../lib.mjs";

// String.raw keeps "\n" literally: turn \n (not followed by a lower-case letter, so \nu and \neq survive) into a newline.
const t = (s, ...v) => raw(s, ...v).replace(/\\n(?![a-z])/g, "\n");

const K = "aphys.kinematics.projectiles";
const g = DATA.g;
const sin = (d) => Math.sin(rad(d));
const cos = (d) => Math.cos(rad(d));

concept(K, { file: "kinematics/projectiles", keyPrefix: "kinematics.projectiles" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "A projectile moves through still air with negligible air resistance. What is its horizontal acceleration?",
    options: [
      ["zero", "Correct: gravity acts vertically, so there is no horizontal force."],
      [t`$9.81\ \text{m s}^{-2}$`, "This is the vertical acceleration."],
      [t`$9.81\cos\theta\ \text{m s}^{-2}$`, "Gravity has no horizontal component, whatever the launch angle."],
      ["it decreases as the projectile rises", "With no air resistance nothing acts horizontally, so the horizontal acceleration stays zero."],
    ],
    answer: "A",
    explanation: "With no air resistance the only force is weight, which is vertical. So the horizontal acceleration is zero and the horizontal velocity is constant.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "At the same instant, one ball is dropped from rest and an identical ball is fired horizontally from the same height. Air resistance is negligible and the ground is level. Which statement is correct?",
    options: [
      ["Both balls reach the ground at the same time.", "Correct: both start with zero vertical velocity and accelerate down at g."],
      ["The dropped ball lands first because it travels a shorter path.", "The length of the path does not matter: the vertical motions are identical."],
      ["The fired ball lands first because it is moving faster.", "Its extra speed is horizontal and does not affect the vertical motion."],
      ["The fired ball lands later because its horizontal motion slows its fall.", "Horizontal and vertical motions are independent."],
    ],
    answer: "A",
    explanation: "The vertical motion of each ball starts from rest with acceleration g, so both take the same time to fall the same height. The horizontal velocity only decides how far the fired ball travels.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A ball is kicked at an angle above the horizontal. Air resistance is negligible. Which describes the ball at the highest point of its path?",
    options: [
      ["Its velocity is horizontal and its acceleration is g downwards.", "Correct: only the vertical component is zero; the acceleration is unchanged."],
      ["Its velocity is zero and its acceleration is zero.", "The horizontal velocity is unchanged, and gravity still acts."],
      ["Its velocity is zero and its acceleration is g downwards.", "The horizontal component of velocity is not zero."],
      ["Its velocity is horizontal and its acceleration is zero.", "The weight still acts, so the acceleration is g downwards."],
    ],
    answer: "A",
    explanation: t`At the top, $v_y = 0$ but $v_x = u\cos\theta$, so the velocity is horizontal (and the speed is a minimum). The acceleration is $g$ downwards throughout.`,
  });
  {
    const h = 2.0;
    const u = 6.0;
    const tt = Math.sqrt((2 * h) / g);
    const R = u * tt;
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A ball is launched horizontally at $6.0\ \text{m s}^{-1}$ from a height of $2.0\ \text{m}$ above level ground. How far does it travel horizontally before landing?`,
      options: [
        [t`$${sfStr(R, 3)}\ \text{m}$`, "Correct: t = √(2h/g) = 0.639 s and R = 6.0 × 0.639."],
        [t`$${sfStr(u * Math.sqrt(h / g), 3)}\ \text{m}$`, "This uses t = √(h/g), dropping the 2 from h = ½gt²."],
        [t`$${sfStr(u * (h / g), 3)}\ \text{m}$`, "This uses t = h/g, which has the wrong units for a time."],
        [t`$${sfStr(2 * R, 3)}\ \text{m}$`, "This doubles the fall time as though the ball first rose and then fell."],
      ],
      answer: "A",
      explanation: t`Vertical (from rest): $2.0 = \tfrac{1}{2}(9.81)t^2$, so $t = ${sfStr(tt, 3)}\ \text{s}$. Horizontal: $R = 6.0 \times ${sfStr(tt, 3)} = ${sfStr(R, 3)}\ \text{m}$.`,
      hints: ["Find the fall time from the vertical motion only.", "Multiply by the constant horizontal speed."],
    });
  }
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Projectiles are launched from level ground with the same speed at different angles. Air resistance is negligible. Which pair of launch angles gives the same range?",
    options: [
      [t`$25^\circ$ and $65^\circ$`, "Correct: angles adding to 90° give equal ranges, since sin 2θ is the same."],
      [t`$30^\circ$ and $45^\circ$`, "45° gives the maximum range; 30° gives less."],
      [t`$20^\circ$ and $60^\circ$`, "These add to 80°, so sin 40° ≠ sin 120°."],
      [t`$40^\circ$ and $60^\circ$`, "These add to 100°, so sin 80° ≠ sin 120°."],
    ],
    answer: "A",
    explanation: t`On level ground $R = \dfrac{u^2 \sin 2\theta}{g}$. $\sin 2\theta$ is the same for $\theta$ and $90^\circ - \theta$: $\sin 50^\circ = \sin 130^\circ$.`,
    hints: ["Range ∝ sin 2θ.", "When is sin 2θ the same for two angles?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "How does significant air resistance change the path of a ball kicked at an angle, compared with its path in a vacuum?",
    options: [
      ["The range is shorter and the descent is steeper than the ascent.", "Correct: drag reduces the horizontal velocity throughout, so the path is cut short and asymmetric."],
      ["The range is shorter but the path stays symmetrical about the highest point.", "Drag keeps reducing the horizontal velocity, so the second half is shorter and steeper."],
      ["The maximum height is greater because air pushes the ball upwards.", "Drag opposes the motion; on the way up it acts partly downwards, lowering the peak."],
      ["Only the vertical motion is affected, because drag acts vertically.", "Drag acts opposite to the velocity, which has a horizontal component."],
    ],
    answer: "A",
    explanation: "Air resistance acts opposite to the velocity. It reduces the horizontal speed, so the range is shorter, the peak is lower and comes earlier, and the ball falls more steeply than it rose.",
    hints: ["Drag acts against the velocity, which has both components."],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Balls are thrown horizontally from the top of a cliff with different speeds. Air resistance is negligible. On which quantity does the time each ball takes to reach the sea depend?",
    options: [
      ["the height of the cliff only", "Correct: the vertical motion starts from rest with acceleration g in every case."],
      ["the launch speed only", "The launch speed is horizontal and does not affect the vertical motion."],
      ["both the height and the launch speed", "The launch speed changes the range, not the time."],
      ["the mass of the ball and the height", "All masses fall with the same acceleration g."],
    ],
    answer: "A",
    explanation: t`For a horizontal launch $u_y = 0$, so $h = \tfrac{1}{2}gt^2$ and $t = \sqrt{2h/g}$: only the height matters. The launch speed sets the range.`,
    hints: ["What is the initial vertical velocity of a horizontal throw?"],
  });
  {
    const h = 0.8;
    const R = 1.6;
    const tt = Math.sqrt((2 * h) / g);
    const u = R / tt;
    b.mcq({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`Water leaves a horizontal pipe $0.80\ \text{m}$ above the ground and lands $1.6\ \text{m}$ from the end of the pipe, measured horizontally. At what speed does the water leave the pipe?`,
      options: [
        [t`$${sfStr(u, 3)}\ \text{m s}^{-1}$`, "Correct: t = √(2 × 0.80/9.81) = 0.404 s; u = 1.6/0.404."],
        [t`$2.0\ \text{m s}^{-1}$`, "This divides the range by the height, which is not a time."],
        [t`$${sfStr(R / Math.sqrt(h / g), 3)}\ \text{m s}^{-1}$`, "This uses t = √(h/g), leaving out the 2."],
        [t`$${sfStr(R * tt, 3)}\ \text{m s}^{-1}$`, "This multiplies the range by the time instead of dividing."],
      ],
      answer: "A",
      explanation: t`Fall time: $t = \sqrt{2h/g} = ${sfStr(tt, 3)}\ \text{s}$. Horizontal speed: $u = R/t = 1.6/${sfStr(tt, 3)} = ${sfStr(u, 3)}\ \text{m s}^{-1}$.`,
      hints: ["The fall time comes from the height.", "The horizontal speed is range ÷ time."],
    });
  }

  // Numerical and calculation items
  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: t`A javelin is thrown at $26\ \text{m s}^{-1}$ at $40^\circ$ above the horizontal. Calculate the horizontal component of its initial velocity, in $\text{m s}^{-1}$.`,
    value: 26 * cos(40), unit: "m/s", wrong: [26 * sin(40)],
    explanation: t`$u_x = 26\cos 40^\circ = ${sfStr(26 * cos(40), 3)}\ \text{m s}^{-1}$. ($26\sin 40^\circ = ${sfStr(26 * sin(40), 3)}$ is the vertical component.)`,
  });
  {
    const T = (2 * 15 * sin(50)) / g;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A ball is kicked from level ground at $15\ \text{m s}^{-1}$ at $50^\circ$ above the horizontal. Ignoring air resistance, calculate its time of flight, in s.`,
      value: T, unit: "s", wrong: [(15 * sin(50)) / g, (2 * 15 * cos(50)) / g],
      explanation: t`1. $u_y = 15\sin 50^\circ = ${sfStr(15 * sin(50), 3)}\ \text{m s}^{-1}$.\n2. Time to the top: $u_y/g = ${sfStr((15 * sin(50)) / g, 3)}\ \text{s}$.\n3. Time of flight $= 2 \times ${sfStr((15 * sin(50)) / g, 3)} = ${sfStr(T, 3)}\ \text{s}$.\n\nForgetting to double gives only the time to the top; using cos gives the wrong component.`,
      hints: ["Use the vertical component of the launch velocity.", "The flight time is twice the time to the top on level ground."],
    });
  }
  {
    const uy = 22 * sin(60);
    const H = uy ** 2 / (2 * g);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A firework rocket's burnt-out casing leaves the launch tube at $22\ \text{m s}^{-1}$ at $60^\circ$ to the horizontal and then moves freely. Ignoring air resistance, calculate the greatest height it reaches above the tube, in m.`,
      value: H, unit: "m", wrong: [22 ** 2 / (2 * g), uy ** 2 / g],
      explanation: t`1. $u_y = 22\sin 60^\circ = ${sfStr(uy, 3)}\ \text{m s}^{-1}$.\n2. At the top $v_y = 0$: $0 = u_y^2 - 2gH$.\n3. $H = \dfrac{${sfStr(uy, 3)}^2}{2 \times 9.81} = ${sfStr(H, 3)}\ \text{m}$.\n\nUsing the full speed (22) gives the height for a vertical launch, ${sfStr(22 ** 2 / (2 * g), 3)} m.`,
      hints: ["Only the vertical component matters for the height."],
    });
  }
  {
    const R = (12 ** 2 * sin(60)) / g;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A stone is thrown from level ground at $12\ \text{m s}^{-1}$ at $30^\circ$ above the horizontal. Ignoring air resistance, calculate its range, in m.`,
      value: R, unit: "m", wrong: [(12 ** 2 * sin(30)) / g, 12 * ((2 * 12 * sin(30)) / g)],
      explanation: t`1. $u_x = 12\cos 30^\circ = ${sfStr(12 * cos(30), 3)}\ \text{m s}^{-1}$; $u_y = 12\sin 30^\circ = 6.0\ \text{m s}^{-1}$.\n2. Time of flight $= 2 \times 6.0/9.81 = ${sfStr((2 * 6) / g, 3)}\ \text{s}$.\n3. Range $= ${sfStr(12 * cos(30), 3)} \times ${sfStr((2 * 6) / g, 3)} = ${sfStr(R, 3)}\ \text{m}$.\n\nMultiplying the full speed by the time (${sfStr(12 * ((2 * 12 * sin(30)) / g), 3)} m) uses the wrong component.`,
      hints: ["Find the time of flight from the vertical motion.", "Multiply by the horizontal component."],
    });
  }
  {
    const vy = Math.sqrt(2 * g * 3.2);
    const v = Math.hypot(5, vy);
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A ball is thrown horizontally at $5.0\ \text{m s}^{-1}$ from a window $3.2\ \text{m}$ above the ground. Ignoring air resistance, calculate its speed just before it hits the ground, in $\text{m s}^{-1}$.`,
      value: v, unit: "m/s", wrong: [5 + vy, vy],
      explanation: t`1. Vertical: $v_y^2 = 0 + 2(9.81)(3.2)$, so $v_y = ${sfStr(vy, 3)}\ \text{m s}^{-1}$.\n2. Horizontal: $v_x = 5.0\ \text{m s}^{-1}$ (unchanged).\n3. Speed $= \sqrt{5.0^2 + ${sfStr(vy, 3)}^2} = ${sfStr(v, 3)}\ \text{m s}^{-1}$.\n\nAdding the components (${sfStr(5 + vy, 3)}) ignores that they are perpendicular.`,
      hints: ["Find the vertical velocity from the height fallen.", "Combine the perpendicular components with Pythagoras."],
    });
  }
  {
    const p = pctUnc(0.02, 1.42) + 0.5 * pctUnc(0.005, 0.95);
    b.num({
      d: 4, skill: "EVALUATION", calculator: true,
      stem: t`In a practical, the launch speed of a ball rolling off a bench is found from $u = R\sqrt{\dfrac{g}{2h}}$. The range is $R = 1.42 \pm 0.02\ \text{m}$ and the height is $h = 0.950 \pm 0.005\ \text{m}$. Calculate the percentage uncertainty in $u$, to two significant figures.`,
      value: p, sf: 2, unit: "%", wrong: [pctUnc(0.02, 1.42) + pctUnc(0.005, 0.95)],
      explanation: t`$\%\,\Delta R = \dfrac{0.02}{1.42} \times 100 = ${sfStr(pctUnc(0.02, 1.42), 2)}\,\%$. $\%\,\Delta h = ${sfStr(pctUnc(0.005, 0.95), 2)}\,\%$, and $u \propto h^{-1/2}$, so it contributes half: ${sfStr(0.5 * pctUnc(0.005, 0.95), 2)} %. Total $= ${sfStr(p, 2)}\,\%$ ($g$ is a constant). The range measurement dominates.`,
      hints: ["A power of ½ halves the percentage uncertainty.", "Powers of −½ count the same as ½ for uncertainty."],
    });
  }

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "At the highest point of its path, a ball launched at an angle above the horizontal has zero velocity.",
    answer: false,
    explanation: "False. Only the vertical component is zero at the top. The horizontal component is unchanged (with no air resistance), so the velocity is horizontal.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The time a ball thrown horizontally takes to fall to the ground depends on how fast it is thrown.",
    answer: false,
    explanation: "False. The fall time depends only on the height (t = √(2h/g)); the horizontal speed only decides the range.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: t`A projectile is launched from level ground at speed $u$ and angle $\theta$ above the horizontal. Match each quantity with its expression (no air resistance).`,
    pairs: [
      ["time to reach the highest point", t`$\dfrac{u\sin\theta}{g}$`],
      ["maximum height", t`$\dfrac{(u\sin\theta)^2}{2g}$`],
      ["horizontal velocity at any time", t`$u\cos\theta$`],
      ["range", t`$u\cos\theta \times \dfrac{2u\sin\theta}{g}$`],
    ],
    explanation: "Vertical quantities use u sin θ with acceleration g; horizontal ones use the constant u cos θ; the range combines the horizontal velocity with the time of flight.",
    hints: ["Which component sets the height and the time?"],
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the explanation.",
    template: "With no air resistance, the horizontal velocity of a projectile stays {{blank:a}}, because its weight has no {{blank:b}} component.",
    blanks: [
      { id: "a", accepted: ["constant"], choices: ["constant", "increasing", "decreasing"] },
      { id: "b", accepted: ["horizontal"], choices: ["horizontal", "vertical"] },
    ],
    explanation: "Weight acts vertically, so there is no horizontal force, no horizontal acceleration and the horizontal velocity is constant.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why the horizontal component of the velocity of a projectile is constant when air resistance is negligible.",
    points: [
      "The only force acting is the weight, which acts vertically (no horizontal force)",
      "So there is no horizontal acceleration (Newton's second law) and the horizontal velocity does not change",
    ],
    modelAnswer: "With no air resistance the only force on the projectile is its weight, which is vertical. There is therefore no horizontal resultant force, so no horizontal acceleration, and the horizontal component of velocity stays constant.",
    explanation: "No horizontal force means no horizontal acceleration.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 3,
    stem: "A shot-putter's throw is filmed. Describe three ways in which the real path of the shot would differ from the ideal parabola if air resistance were significant.",
    points: [
      "The range is shorter, because the horizontal velocity decreases throughout",
      "The maximum height is lower and is reached sooner (earlier and nearer the thrower)",
      "The path is not symmetrical: the descent is steeper than the ascent",
    ],
    modelAnswer: "Air resistance acts opposite to the velocity, so the horizontal velocity keeps decreasing and the shot lands short of the ideal range. On the way up drag adds to gravity's effect, so the peak is lower and is reached earlier. Because the shot is moving more slowly horizontally on the way down, the descent is steeper than the ascent, so the path is lopsided rather than a symmetrical parabola.",
    explanation: "Drag opposes the velocity and so affects both components. (For a dense shot the effect is small; for a shuttlecock it is huge.)",
    hints: ["Drag acts against the velocity: think about each component."],
  });

  // Practice structured 1: a water jet from a farm nozzle.
  {
    const u = 9;
    const th = 43;
    const ux = u * cos(th);
    const uy = u * sin(th);
    const tTop = uy / g;
    const H = uy ** 2 / (2 * g);
    const T = 2 * tTop;
    const R = ux * T;
    const vy = uy - g * 0.8;
    const v = Math.hypot(ux, vy);
    const ang = deg(Math.atan(Math.abs(vy) / ux));
    console.log("proj jet", ux, uy, tTop, H, T, R, vy, v, ang);
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true, examStyle: true,
      stem: t`A pump on a farm near Masvingo sends a jet of water from a nozzle at ground level. The water leaves the nozzle at $9.0\ \text{m s}^{-1}$ at $43^\circ$ above the horizontal. Ignore air resistance and take $g = 9.81\ \text{m s}^{-2}$.`,
      parts: [
        P.group({ label: "(a)", stem: "Calculate the components of the initial velocity", parts: [
          P.num({ label: "(i)", marks: 1, stem: t`horizontal, in $\text{m s}^{-1}$;`, value: ux, unit: "m/s", wrong: [uy], explanation: t`$9.0\cos 43^\circ = ${sfStr(ux, 3)}\ \text{m s}^{-1}$.` }),
          P.num({ label: "(ii)", marks: 1, stem: t`vertical, in $\text{m s}^{-1}$.`, value: uy, unit: "m/s", wrong: [ux], explanation: t`$9.0\sin 43^\circ = ${sfStr(uy, 3)}\ \text{m s}^{-1}$.` }),
        ] }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate the time for the water to reach its highest point, in s.", value: tTop, unit: "s", explanation: t`$t = u_y/g = ${sfStr(uy, 3)}/9.81 = ${sfStr(tTop, 3)}\ \text{s}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the maximum height of the jet, in m.", value: H, unit: "m", wrong: [u ** 2 / (2 * g)], explanation: t`$H = \dfrac{u_y^2}{2g} = \dfrac{${sfStr(uy, 3)}^2}{19.62} = ${sfStr(H, 3)}\ \text{m}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the horizontal distance from the nozzle to where the water lands on level ground, in m.", value: R, unit: "m", wrong: [ux * tTop, u * T], explanation: t`Time of flight $= 2 \times ${sfStr(tTop, 3)} = ${sfStr(T, 3)}\ \text{s}$; $R = ${sfStr(ux, 3)} \times ${sfStr(T, 3)} = ${sfStr(R, 3)}\ \text{m}$.` }),
        P.group({ label: "(e)", stem: t`For the water at $t = 0.80\ \text{s}$ after leaving the nozzle, calculate`, parts: [
          P.num({ label: "(i)", marks: 2, stem: t`its speed, in $\text{m s}^{-1}$;`, value: v, unit: "m/s", wrong: [ux], explanation: t`$v_y = ${sfStr(uy, 3)} - 9.81 \times 0.80 = ${sfStr(vy, 3)}\ \text{m s}^{-1}$ (falling); $v = \sqrt{${sfStr(ux, 3)}^2 + ${sfStr(vy, 3)}^2} = ${sfStr(v, 3)}\ \text{m s}^{-1}$.` }),
          P.num({ label: "(ii)", marks: 1, stem: "the angle of its velocity below the horizontal, in degrees.", value: ang, unit: "°", wrong: [90 - ang], explanation: t`$\tan\alpha = \dfrac{${sfStr(Math.abs(vy), 3)}}{${sfStr(ux, 3)}}$, so $\alpha = ${sfStr(ang, 3)}^\circ$ below the horizontal.` }),
        ] }),
        P.manual({ label: "(f)", marks: 2, stem: "The water actually lands closer to the nozzle than your answer to (d). Suggest two reasons.", points: ["Air resistance acting on the water (especially on small drops / spray) reduces its horizontal velocity", "The jet breaks up into drops, increasing drag; or the nozzle is slightly above/below ground level or the speed or angle is not exactly as stated"], modelAnswer: "Air resistance on the water, which increases as the jet breaks into small droplets, slows its horizontal motion, so it lands short. Also, the speed or angle at the nozzle may differ from the stated values (for example, pressure losses in the pipe reduce the speed)." }),
      ],
      explanation: t`Resolve the launch velocity, use the vertical component with $g$ for time and height, and the constant horizontal component for the range: $H = ${sfStr(H, 3)}\ \text{m}$, $R = ${sfStr(R, 3)}\ \text{m}$.`,
      hints: ["Resolve 9.0 m s⁻¹ into components.", "Time of flight = 2 × time to the top.", "At t = 0.80 s the water is already falling."],
    });
  }

  // Practice structured 2: range against height for a horizontal launch.
  {
    const u = 2.4;
    const grad = (2 * u ** 2) / g;
    const hs = [0.3, 0.5, 0.7, 0.9, 1.1];
    const Rs = [0.6, 0.77, 0.92, 1.03, 1.15];
    const R2 = Rs.map((x) => x * x);
    const gradRead = 1.2; // m, from the best-fit line in the stem
    const uFound = Math.sqrt((gradRead * g) / 2);
    console.log("proj R2 fit check", R2.map((r, i) => r / hs[i]), grad, uFound);
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true, examStyle: true,
      stem: t`Tatenda rolls a ball down a fixed ramp so that it leaves the edge of a horizontal shelf with the same speed $u$ each time. He changes the height $h$ of the shelf above the floor and measures the horizontal distance $R$ to where the ball lands.\n\n${table([t`$h\,/\,\text{m}$`, ...hs.map((x) => dpStr(x, 3))], [[t`$R\,/\,\text{m}$`, ...Rs.map((x) => dpStr(x, 3))]])}`,
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: t`Show that $R^2 = \dfrac{2u^2}{g}h$.`, points: [t`Vertical motion from rest: $h = \tfrac{1}{2}gt^2$, so $t^2 = 2h/g$`, t`Horizontal: $R = ut$, so $R^2 = u^2t^2 = \dfrac{2u^2}{g}h$`], modelAnswer: t`The ball leaves horizontally, so vertically $h = \tfrac{1}{2}gt^2$, giving $t^2 = 2h/g$. Horizontally $R = ut$, so $R^2 = u^2 t^2 = \dfrac{2u^2}{g}h$.` }),
        P.num({ label: "(b)", marks: 1, stem: t`Calculate $R^2$ for $h = 0.700\ \text{m}$, in $\text{m}^2$, to three significant figures.`, value: R2[2], sf: 3, unit: "m²", explanation: t`$0.920^2 = ${sfStr(R2[2], 3)}\ \text{m}^2$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`The gradient of his best-fit line of $R^2$ against $h$ is $1.20\ \text{m}$. Calculate $u$, in $\text{m s}^{-1}$.`, value: uFound, unit: "m/s", wrong: [(gradRead * g) / 2, Math.sqrt(gradRead * g)], explanation: t`Gradient $= 2u^2/g$, so $u = \sqrt{\dfrac{1.20 \times 9.81}{2}} = ${sfStr(uFound, 3)}\ \text{m s}^{-1}$. Forgetting the square root gives ${sfStr((gradRead * g) / 2, 3)}.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Suggest how Tatenda could make sure the ball leaves the shelf with the same speed each time and moving horizontally.", points: ["Release the ball from the same marked point on the ramp each time (e.g. against a stop or from behind a ruler), without pushing", "Make the end of the ramp/shelf edge horizontal (check with a spirit level) so the ball leaves horizontally"], modelAnswer: "Release the ball from rest at the same marked point on the ramp every time, holding it against a stop and letting go without pushing. Make the last part of the track horizontal, checked with a spirit level, so that the ball leaves the edge moving horizontally." }),
        P.mcq({ label: "(e)", stem: t`What is the unit of the gradient of the graph of $R^2$ against $h$?`, options: [["m", "Correct: m² ÷ m = m."], ["m²", "This is the unit of R², the y-axis quantity."], ["m⁻¹", "This is the unit of h/R², the inverse."], ["no unit", "The units do not cancel: m²/m leaves m."]], answer: "A", explanation: t`Gradient $= \Delta(R^2)/\Delta h$: $\text{m}^2/\text{m} = \text{m}$, consistent with $2u^2/g$: $(\text{m}^2\ \text{s}^{-2})/(\text{m s}^{-2}) = \text{m}$.` }),
      ],
      explanation: t`$R^2 = (2u^2/g)h$, so the gradient $1.20\ \text{m}$ gives $u = ${sfStr(uFound, 3)}\ \text{m s}^{-1}$.`,
      hints: ["Combine h = ½gt² and R = ut to remove t.", "Gradient = 2u²/g."],
    });
  }

  // Flashcards
  b.card("DEFINITION", "Projectile", "An object moving under gravity alone after launch: acceleration g downwards, no horizontal acceleration (no air resistance).");
  b.card("CONCEPT", "Independence of horizontal and vertical motion", "Horizontal: constant velocity. Vertical: uniform acceleration g. They are linked only by the time.");
  b.card("FORMULA", "Components of the launch velocity", t`$u_x = u\cos\theta$, $u_y = u\sin\theta$`);
  b.card("FORMULA", "Time of flight on level ground", t`$T = \dfrac{2u\sin\theta}{g}$`);
  b.card("FORMULA", "Maximum height of a projectile", t`$H = \dfrac{(u\sin\theta)^2}{2g}$`);
  b.card("FORMULA", "Range on level ground", t`$R = u\cos\theta \times \dfrac{2u\sin\theta}{g} = \dfrac{u^2\sin 2\theta}{g}$; greatest at $45^\circ$.`);
  b.card("FACT", "Velocity at the top of the path", t`Horizontal, equal to $u\cos\theta$: not zero.`);
  b.card("FORMULA", "Fall time for a horizontal launch from height h", t`$t = \sqrt{2h/g}$, independent of the launch speed.`);
  b.card("CONCEPT", "Effect of air resistance on a projectile", "Shorter range, lower and earlier peak, steeper descent than ascent.");
});
