// W4a: amaths.kinematics.graphs
import { concept, P, t, chk, quad, ZM } from "../lib.mjs";
import { f3, g3, N, S } from "../tables/w4a-kit.mjs";

const { sqrt } = Math;

concept("amaths.kinematics.graphs", { file: "kinematics/graphs", keyPrefix: "kinematics.graphs" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "What does the gradient of a velocity–time graph represent?",
    options: [
      ["Acceleration", "Correct: acceleration is the rate of change of velocity."],
      ["Displacement", "Displacement is the AREA under a velocity–time graph."],
      ["Velocity", "Velocity is the gradient of a displacement–time graph."],
      ["Distance travelled", "Distance comes from areas, not gradients."],
    ],
    answer: "A",
    explanation: t`$a = \frac{\mathrm{d}v}{\mathrm{d}t}$, the gradient of the $v$–$t$ graph.`,
  });

  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "What does the area between a velocity–time graph and the time axis represent?",
    options: [
      ["Displacement", "Correct: area below the axis counts as negative displacement."],
      ["Acceleration", "Acceleration is the gradient of the velocity–time graph."],
      ["Average speed", "Average speed is total distance divided by total time."],
      ["Change in velocity", "That is the area under an ACCELERATION–time graph."],
    ],
    answer: "A",
    explanation: "Each thin strip has area v × δt ≈ δs, so the total area is the displacement.",
  });

  const d3 = 0.5 * (72 + 50) * 15;
  chk(d3, 0.5 * 12 * 15 + 50 * 15 + 0.5 * 10 * 15);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`A car starts from rest and accelerates uniformly to $15$ m s$^{-1}$ in $12$ s. It travels at $15$ m s$^{-1}$ for $50$ s and then decelerates uniformly to rest in $10$ s. Find the total distance travelled.`,
    value: d3, unit: "m", wrong: [15 * 72, 15 * 50],
    explanation: t`Area of the trapezium: $\frac{1}{2}(12)(15) + 50(15) + \frac{1}{2}(10)(15) = 90 + 750 + 75 = ${d3}$ m, or $\frac{1}{2}(72 + 50) \times 15$.`,
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`The displacement–time graph of a particle is a straight line from $(0, 4)$ to $(9, 40)$, with $t$ in seconds and $s$ in metres. Find the velocity of the particle.`,
    value: 4, unit: "m/s", wrong: [40 / 9],
    explanation: t`Velocity $=$ gradient $= \frac{40 - 4}{9 - 0} = 4$ m s$^{-1}$. ($\frac{40}{9}$ forgets that the particle did not start at the origin.)`,
  });

  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`For the car that accelerates from rest to $15$ m s$^{-1}$ in $12$ s, travels at $15$ m s$^{-1}$ for $50$ s and decelerates to rest in $10$ s, find the average speed for the whole journey, correct to 3 significant figures.`,
    value: d3 / 72, unit: "m/s", wrong: [7.5, 15],
    explanation: t`Total distance $${d3}$ m in $12 + 50 + 10 = 72$ s, so average speed $= \frac{${d3}}{72} = ${f3(d3 / 72)}$ m s$^{-1}$. (Averaging the speeds 0 and 15 gives 7.5, which ignores how long each speed lasts.)`,
    hints: ["Average speed = total distance ÷ total time."],
  });

  const T6 = (1530 - 0.5 * 25 * 20 - 0.5 * 8 * 20) / 20;
  chk(T6, 60);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`A kombi starts from rest and accelerates uniformly at $0.8$ m s$^{-2}$ until its speed is $20$ m s$^{-1}$. It keeps this speed for $T$ s and then decelerates uniformly at $2.5$ m s$^{-2}$ to rest. The total distance is $1530$ m. Find $T$ and the total time for the journey.`,
    template: "T = {{blank:t}}, total time = {{blank:tot}} s",
    blanks: [N("t", T6, "76.5"), N("tot", 25 + T6 + 8, "60")],
    explanation: t`Accelerating takes $\frac{20}{0.8} = 25$ s (distance $250$ m); decelerating takes $\frac{20}{2.5} = 8$ s (distance $80$ m). So $250 + 20T + 80 = 1530$, $T = ${T6}$, and the total time is $25 + ${T6} + 8 = ${25 + T6 + 8}$ s.`,
    hints: ["Find the time of each sloping stage from its gradient.", "Total area = 1530."],
  });

  const tz = 2, dA = 0.5 * 2 * 8, dB = 0.5 * 1.5 * 6;
  chk(8 - 4 * 3.5, -6);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`A particle moving in a straight line has velocity $8$ m s$^{-1}$ at $t = 0$ and a constant acceleration of $-4$ m s$^{-2}$. Using the velocity–time graph for $0 \le t \le 3.5$, find the distance travelled and the displacement in this time.`,
    template: "Distance = {{blank:d}} m, displacement = {{blank:s}} m",
    blanks: [S("d", dA + dB, "3.5"), S("s", dA - dB, "12.5")],
    explanation: t`$v = 8 - 4t$ is zero at $t = ${tz}$. Area above the axis: $\frac{1}{2}(2)(8) = ${dA}$ m; below: $\frac{1}{2}(1.5)(6) = ${dB}$ m. Distance $= ${dA + dB}$ m; displacement $= ${dA - dB}$ m.`,
    hints: ["Find when the velocity is zero.", "Distance adds the two areas; displacement subtracts."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "A horizontal section of a displacement–time graph shows that the object is moving with constant non-zero velocity.",
    answer: false,
    explanation: "A horizontal displacement–time graph has zero gradient: the displacement is not changing, so the object is at rest. A horizontal VELOCITY–time graph means constant velocity.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false, applies: ZM,
    stem: "A distance–time graph can never have a negative gradient.",
    answer: true,
    explanation: "Distance travelled never decreases, so its gradient (speed) is never negative. A DISPLACEMENT–time graph can slope downwards.",
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Part of a displacement–time graph is a straight line sloping downwards. What does it show?",
    options: [
      ["The object moves back towards the origin at constant velocity", "Correct: the gradient is a constant negative velocity."],
      ["The object is slowing down at a constant rate", "A straight line means constant velocity, so there is no acceleration at all."],
      ["The object is at rest at a point behind the origin", "At rest would give a horizontal line."],
      ["The object is falling freely under gravity", "Free fall has changing velocity, so its graph would be curved."],
    ],
    answer: "A",
    explanation: "Gradient of s–t = velocity; a straight line means it is constant, and a downward slope means it is negative.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each feature of a graph with what it shows about the motion.",
    pairs: [
      ["Horizontal line on a velocity–time graph", "Constant velocity"],
      ["Horizontal line on a displacement–time graph", "At rest"],
      ["Velocity–time graph crossing the time axis", "Instantaneously at rest, changing direction"],
      ["Straight line through the origin on a velocity–time graph", "Uniform acceleration from rest"],
    ],
    explanation: "Gradients of s–t give velocity, gradients of v–t give acceleration, and v = 0 where the v–t graph meets the time axis.",
  });

  const v12 = 3 + 1.5 * 6 - 2 * 4;
  b.num({
    d: 3, skill: "APPLICATION", calculator: false, applies: ZM,
    stem: t`A particle moving in a straight line has velocity $3$ m s$^{-1}$ at $t = 0$. Its acceleration–time graph shows $a = 1.5$ m s$^{-2}$ for $0 < t < 6$ and $a = -2$ m s$^{-2}$ for $6 < t < 10$. Find its velocity at $t = 10$.`,
    value: v12, unit: "m/s", wrong: [1.5 * 6 - 2 * 4, 3 + 1.5 * 6 + 2 * 4],
    explanation: t`Area under the $a$–$t$ graph $=$ change in velocity: $1.5 \times 6 - 2 \times 4 = 1$. So $v = 3 + 1 = ${v12}$ m s$^{-1}$. (Forgetting the initial $3$ m s$^{-1}$ gives 1.)`,
    hints: ["The area under an acceleration–time graph is the change in velocity."],
  });

  const t13 = 4 + (100 - 18) / 9;
  b.num({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: t`A sprinter starts from rest and accelerates uniformly to $9$ m s$^{-1}$ in $4$ s, then runs at constant speed. Find the time she takes to run $100$ m, correct to 3 significant figures.`,
    value: t13, unit: "s", wrong: [100 / 9, 4 + 100 / 9],
    explanation: t`In the first $4$ s she covers $\frac{1}{2}(4)(9) = 18$ m. The remaining $82$ m at $9$ m s$^{-1}$ take $\frac{82}{9}$ s. Total $4 + ${f3(82 / 9)} = ${f3(t13)}$ s.`,
    hints: ["Split the graph into a triangle and a rectangle."],
  });

  const tEq = 15 / 1.2, gap = 15 * tEq - 0.5 * 1.2 * tEq * tEq;
  chk(tEq, 12.5);
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`At $t = 0$ car $P$ starts from rest at a fuel station and accelerates uniformly at $1.2$ m s$^{-2}$, while car $Q$ passes the station at a constant $15$ m s$^{-1}$, moving the same way. Find the time at which the two cars have the same speed, and the exact distance between them at that time.`,
    template: "t = {{blank:t}} s, distance apart = {{blank:d}} m",
    blanks: [N("t", tEq, "18"), N("d", gap, "187.5")],
    explanation: t`Equal speeds when $1.2t = 15$: $t = ${tEq}$ s. Then $Q$ has gone $15 \times 12.5 = 187.5$ m and $P$ has gone $\frac{1}{2}(1.2)(12.5)^2 = ${gap}$ m, so they are $${gap}$ m apart. On the $v$–$t$ graph this is the area of the triangle between the two lines; it is the largest gap before $P$ starts to catch up.`,
    hints: ["Draw both velocity–time graphs on one set of axes.", "The gap is the area between the two graphs up to that time."],
  });

  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`The velocity–time graph of a particle is a straight line from $(0, 10)$ to $(8, -6)$, with $t$ in s and $v$ in m s$^{-1}$. Which statement is true?`,
    options: [
      [t`The particle is instantaneously at rest at $t = 5$`, t`Correct: $v = 10 - 2t = 0$ at $t = 5$.`],
      ["The particle decelerates for the whole 8 s", t`After $t = 5$ the speed increases (in the negative direction), so it is not decelerating.`],
      [t`The distance travelled in the 8 s is $16$ m`, t`$16$ m is the displacement; the distance is $25 + 9 = 34$ m.`],
      [t`The acceleration is $-1.25$ m s$^{-2}$`, t`The gradient is $\frac{-6 - 10}{8} = -2$ m s$^{-2}$.`],
    ],
    answer: "A",
    explanation: t`Gradient $-2$, so $v = 10 - 2t$, zero at $t = 5$. Areas: $25$ m above and $9$ m below the axis.`,
    hints: ["Find the equation of the line, then where it crosses the axis."],
  });

  // Triangle graph: a = 0.5 up to V then −1.0 to rest; area 2400
  const V16 = sqrt(2400 / 1.5), T16 = 3 * V16;
  chk(V16, 40); chk(0.5 * V16 * T16, 2400);
  b.calc({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`A train travels between two stations $2.4$ km apart. It starts from rest, accelerates uniformly at $0.5$ m s$^{-2}$ and then immediately decelerates uniformly at $1$ m s$^{-2}$, coming to rest at the second station. Find the time taken for the journey.`,
    value: T16, unit: "s", wrong: [V16, sqrt(2400 / 0.75)],
    explanation: t`Let the top speed be $V$. Times: $\frac{V}{0.5} = 2V$ and $\frac{V}{1} = V$, so the journey takes $3V$ s. Area of the triangle: $\frac{1}{2}(3V)(V) = 2400$, so $V^2 = 1600$, $V = 40$ m s$^{-1}$, and the time is $${T16}$ s.`,
    hints: ["The v–t graph is a triangle. Write both times in terms of the top speed V.", "Convert 2.4 km to metres."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: "A ball is thrown vertically upwards from the ground and caught at the same height. Describe the shape of its displacement–time graph (upwards positive) and of its velocity–time graph.",
    points: [
      "Displacement–time: an upside-down parabola (∩ shape) starting and ending at s = 0, steepest at the ends, with zero gradient at the top.",
      "Velocity–time: a straight line with negative gradient (−g), from +u down through zero (at the top) to −u.",
    ],
    modelAnswer: "The displacement–time graph is a ∩-shaped parabola that starts at 0, rises to the greatest height (where the gradient is zero) and returns to 0. The velocity–time graph is a straight line of gradient −g from u to −u, crossing the time axis at the moment of greatest height.",
    explanation: "Constant acceleration gives a straight v–t graph and a parabolic s–t graph.",
    hints: ["What is the gradient of the s–t graph at the top?"],
  });

  b.mcq({
    d: 2, skill: "RECALL", calculator: false, applies: ZM,
    stem: "What does the area between an acceleration–time graph and the time axis represent?",
    options: [
      ["The change in velocity", "Correct: a = dv/dt, so integrating a over time gives the change in v."],
      ["The displacement", "Displacement is the area under a VELOCITY–time graph."],
      ["The final velocity", "The area gives the CHANGE; add the initial velocity to get the final velocity."],
      ["The rate of change of acceleration", "That would be the gradient of the acceleration–time graph."],
    ],
    answer: "A",
    explanation: "Area under a–t = ∫a dt = change in velocity.",
  });

  // Struct 5: car, V for 20 s / 3 min / 30 s, total 4.6 km
  const V19 = 4600 / 205;
  chk(10 * V19 + 180 * V19 + 15 * V19, 4600);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
    stem: t`A car on the Harare–Bulawayo road starts from rest and accelerates uniformly for $20$ s to a speed of $V$ m s$^{-1}$. It travels at this speed for $3$ minutes and then decelerates uniformly to rest in $30$ s. The total distance travelled is $4.6$ km.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Use a velocity–time graph to find V, correct to 3 significant figures.", value: V19, unit: "m/s", wrong: [4600 / 230], explanation: t`Area $= 10V + 180V + 15V = 205V = 4600$, so $V = ${f3(V19)}$ m s$^{-1}$.` }),
      P.num({ label: "(b)", marks: 1, stem: "Find the deceleration, correct to 3 significant figures.", value: V19 / 30, unit: "m/s²", wrong: [V19 / 20], explanation: t`$\frac{V}{30} = ${f3(V19 / 30)}$ m s$^{-2}$.` }),
      P.num({ label: "(c)", marks: 2, stem: "Find the average speed for the journey.", value: 4600 / 230, unit: "m/s", wrong: [V19 / 2], explanation: t`$\frac{4600}{20 + 180 + 30} = 20$ m s$^{-1}$.` }),
    ],
    explanation: "Convert minutes and kilometres first; the area of the trapezium gives one equation in V.",
    hints: ["3 minutes = 180 s and 4.6 km = 4600 m."],
  });

  // Struct 13: lift
  const Tl = (39 - 3 - 4.5) / 3, half = 2 + (19.5 - 3) / 3;
  chk(Tl, 10.5); chk(half, 7.5);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`A lift in an office block in Harare starts from rest at the ground floor. It accelerates uniformly at $1.5$ m s$^{-2}$ for $2$ s, travels at constant speed for $T$ s, and then decelerates uniformly to rest in $3$ s. It rises $39$ m altogether.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Find the greatest speed of the lift.", value: 3, unit: "m/s", wrong: [0.75], explanation: "v = 1.5 × 2 = 3 m/s." }),
      P.manual({ label: "(b)", marks: 2, stem: "Describe the velocity–time graph of the motion, giving the coordinates of its corners in terms of T where necessary.", points: ["Trapezium shape: straight line from (0, 0) to (2, 3), horizontal to (2 + T, 3).", "Straight line down to (5 + T, 0); axes labelled t (s) and v (m/s)."],
        modelAnswer: "A trapezium: from (0, 0) up to (2, 3), horizontal to (T + 2, 3), then down to (T + 5, 0), with t in seconds and v in m/s.", explanation: "Three straight segments: constant acceleration, constant speed, constant deceleration." }),
      P.num({ label: "(c)", marks: 3, stem: "Find T.", value: Tl, wrong: [12], explanation: t`Area $= \frac{1}{2}(2)(3) + 3T + \frac{1}{2}(3)(3) = 7.5 + 3T = 39$, so $T = ${Tl}$.` }),
      P.num({ label: "(d)", marks: 1, stem: "Find the deceleration of the lift.", value: 1, unit: "m/s²", wrong: [1.5], explanation: t`$\frac{3}{3} = 1$ m s$^{-2}$.` }),
      P.num({ label: "(e)", marks: 3, stem: "Find the time taken for the lift to rise the first 19.5 m.", value: half, unit: "s", wrong: [6.5], explanation: t`The first $2$ s give $3$ m. The other $16.5$ m at $3$ m s$^{-1}$ take $5.5$ s. Total $${half}$ s.` }),
      P.mcq({ label: "(f)", marks: 1, stem: "Which describes the displacement–time graph while the lift moves at constant speed?",
        options: [["A straight line with positive gradient", "Correct: constant velocity means constant gradient."], ["A horizontal straight line", "That would mean the lift is at rest."], ["A curve getting steeper", "That would mean the lift is speeding up."], ["A straight line through the origin", "The line does not pass through the origin, because the lift has already risen 3 m."]],
        answer: "A", explanation: "Gradient of s–t = velocity = 3 m/s, constant." }),
      P.num({ label: "(g)", marks: 2, stem: "Find the average speed of the lift for the whole journey, correct to 3 significant figures.", value: 39 / (5 + Tl), unit: "m/s", wrong: [1.5], explanation: t`$\frac{39}{2 + ${Tl} + 3} = ${f3(39 / (5 + Tl))}$ m s$^{-1}$.` }),
    ],
    explanation: "One velocity–time graph answers every part: gradients for accelerations, areas for distances.",
    hints: ["Sketch the trapezium and label the times 2, T + 2 and T + 5.", "For (e), the lift is in its constant-speed stage after 19.5 m."],
  });
  chk(3 + 3 * Tl, 34.5); chk(19.5 > 3 && 19.5 < 3 + 3 * Tl ? 1 : 0, 1);

  b.card("FACT", "Gradient of a displacement–time graph", "Velocity.");
  b.card("FACT", "Gradient of a velocity–time graph", "Acceleration.");
  b.card("FACT", "Area under a velocity–time graph", "Displacement (area below the time axis is negative).");
  b.card("CONCEPT", "Distance versus displacement from a v–t graph", "Distance adds the sizes of all the areas; displacement subtracts the areas below the axis.");
  b.card("DEFINITION", "Average speed", t`$\dfrac{\text{total distance}}{\text{total time}}$`);
  b.card("CONCEPT", "Scalars and vectors", "Distance and speed are scalars; displacement, velocity and acceleration are vectors (signed in one dimension).");
  b.card("FORMULA", "Area of a trapezium-shaped v–t graph", t`$\tfrac{1}{2}(\text{total time} + \text{time at top speed}) \times \text{top speed}$`);
  b.card("CONCEPT", "Unknown speed or time", "Write the total area in terms of the unknown and set it equal to the given distance.");
  b.card("FACT", "Area under an acceleration–time graph", "Change in velocity.", undefined, { applies: ZM });
});
