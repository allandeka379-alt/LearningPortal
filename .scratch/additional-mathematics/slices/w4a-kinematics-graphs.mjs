// W4a: amath.mechanics.kinematics-graphs (ZIMSEC only)
import { concept, P, t, chk, quad, same, steps } from "../lib.mjs";

concept("amath.mechanics.kinematics-graphs", { file: "mechanics/kinematics-graphs", keyPrefix: "mechanics.kinematics-graphs" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "Which of these quantities is a vector?",
    options: [
      ["Displacement", "Correct: displacement has a size and a direction (or a sign along the line)."],
      ["Distance travelled", "Distance is the length of path covered; it has no direction, so it is a scalar."],
      ["Speed", "Speed is the size of the velocity only, so it is a scalar."],
      ["Time taken", "Time has size only; it is a scalar."],
    ],
    answer: "A",
    explanation: "Vectors have magnitude and direction: displacement, velocity, acceleration and force. Distance, speed, time and mass are scalars.",
  });

  b.tf({
    d: 1, skill: "RECALL", calculator: false,
    stem: "The gradient of a velocity–time graph gives the acceleration.",
    answer: true,
    explanation: t`True. Gradient $= \frac{\text{change in velocity}}{\text{time taken}}$, which is the acceleration. The area under the graph gives the displacement.`,
  });

  b.mcq({
    d: 2, skill: "RECALL", calculator: false,
    stem: "What does the area between a velocity–time graph and the time axis represent?",
    options: [
      ["The displacement", "Correct: area = velocity × time, which is displacement (area below the axis counts as negative)."],
      ["The acceleration", "Acceleration is the gradient of the velocity–time graph, not its area."],
      ["The average velocity", "Average velocity is the displacement divided by the total time."],
      ["The final speed", "The final speed is read from the last point of the graph."],
    ],
    answer: "A",
    explanation: "Area under a velocity–time graph = displacement. If the graph stays above the time axis, this is also the distance travelled.",
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`A displacement–time graph is a straight line from $(0, 12)$ to $(8, 52)$, with time in seconds and displacement in metres. Find the velocity.`,
    value: (52 - 12) / 8, unit: "m/s", wrong: [52 / 8],
    explanation: t`Velocity = gradient $= \frac{52 - 12}{8 - 0} = \frac{40}{8} = 5$ m s$^{-1}$. Dividing 52 by 8 (6.5) forgets that the graph starts at 12 m.`,
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: "On a velocity–time graph, a car's velocity rises in a straight line from 4 m/s to 22 m/s over 6 s. Find its acceleration.",
    value: (22 - 4) / 6, unit: "m/s²", wrong: [22 / 6, 18],
    explanation: t`$a = \frac{22 - 4}{6} = \frac{18}{6} = 3$ m s$^{-2}$. The value 18 is the change in velocity, not the rate of change.`,
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "A cyclist starts from rest and accelerates uniformly, reaching 15 m/s after 12 s. How far does she travel in these 12 s?",
    value: 0.5 * 12 * 15, unit: "m", wrong: [180],
    explanation: t`The velocity–time graph is a triangle with base 12 and height 15: distance $= \frac{1}{2} \times 12 \times 15 = 90$ m. Using $15 \times 12 = 180$ treats the speed as constant.`,
  });

  {
    const avg = (6 + 4) / (50 / 60);
    chk(avg, 12);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: "Rudo cycles 6 km in 20 minutes along the Masvingo road, then 4 km uphill in 30 minutes. Find her average speed for the whole ride in km/h.",
      value: avg, unit: "km/h", wrong: [(18 + 8) / 2],
      explanation: t`Total distance 10 km, total time 50 min $= \frac{5}{6}$ h. Average speed $= 10 \div \frac{5}{6} = 12$ km/h. Averaging the stage speeds (18 km/h and 8 km/h) gives 13 km/h, which ignores that the second stage takes longer.`,
      hints: ["Average speed = total distance ÷ total time.", "Change 50 minutes to hours."],
    });
  }

  {
    const d = 0.5 * (12 + 40 + 9 + 40) * 18;
    chk(d, 0.5 * 12 * 18 + 40 * 18 + 0.5 * 9 * 18);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: "A kombi leaves a rank in Bulawayo from rest. It accelerates uniformly to 18 m/s in 12 s, travels at 18 m/s for 40 s, then decelerates uniformly to rest in 9 s. Find the total distance it travels.",
      value: d, unit: "m", wrong: [61 * 18, 40 * 18],
      explanation: t`Trapezium with parallel sides $61$ s and $40$ s and height 18: $\frac{1}{2}(61 + 40) \times 18 = 909$ m. Check: $108 + 720 + 81 = 909$ m.`,
      workedSolution: steps(
        t`Total time $= 12 + 40 + 9 = 61$ s.`,
        t`Area $= \frac{1}{2}(61 + 40) \times 18$.`,
        t`Distance $= 909$ m.`,
      ),
      hints: ["Sketch the velocity–time graph: it is a trapezium.", "Distance = area under the graph."],
    });
  }

  b.num({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "A car slows down uniformly from 25 m/s to 10 m/s in 6 s. Find the size of its deceleration.",
    value: (25 - 10) / 6, unit: "m/s²", wrong: [25 / 6, 35 / 6],
    explanation: t`Gradient $= \frac{10 - 25}{6} = -2.5$, so the deceleration is 2.5 m s$^{-2}$. Adding the speeds (35/6) is a sign slip.`,
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Part of a displacement–time graph is a horizontal straight line. What is the object doing during that time?",
    options: [
      ["It is at rest", "Correct: the displacement does not change, so the velocity (the gradient) is zero."],
      ["It moves at constant speed", "Constant speed shows as a straight line with non-zero gradient."],
      ["It moves with constant acceleration", "On a displacement–time graph constant non-zero acceleration gives a curve."],
      ["It is returning to the start", "Returning to the start shows as a line sloping down towards zero."],
    ],
    answer: "A",
    explanation: "Gradient of a displacement–time graph = velocity. A horizontal line has gradient 0, so the object is stationary.",
  });

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: "A velocity–time graph is a straight line that starts above the time axis, slopes down and crosses the time axis at t = 7 s. What happens at t = 7 s?",
    options: [
      ["The object stops and reverses", "Correct: the velocity changes sign, so the direction of motion changes."],
      ["The object stops accelerating", "The gradient is the same constant on both sides of t = 7, so the acceleration does not change."],
      ["It returns to its starting point", "Displacement is the area; the positive area so far is not cancelled at t = 7."],
      ["Its acceleration changes sign", "The line is straight, so the acceleration is constant and negative throughout."],
    ],
    answer: "A",
    explanation: "Where a velocity–time graph crosses the time axis, v = 0 and changes sign: the object is momentarily at rest and then moves the other way. It is still a long way from its start.",
    hints: ["Which quantity's sign gives the direction of motion?"],
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "A displacement–time graph is a curve that gets steeper as time increases, with the displacement increasing. What does this show?",
    options: [
      ["The speed is increasing", "Correct: the gradient (the velocity) is increasing."],
      ["The speed is decreasing", "A decreasing speed gives a curve that gets less steep."],
      ["The speed is constant", "Constant speed gives a straight line, not a curve."],
      ["The object is at rest", "At rest the graph would be horizontal."],
    ],
    answer: "A",
    explanation: "The gradient of a displacement–time graph is the velocity, so a graph that gets steeper shows a velocity that is getting larger: the object is accelerating.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each graph feature with what it tells you about the motion.",
    pairs: [
      ["Gradient of a displacement–time graph", "Velocity"],
      ["Gradient of a velocity–time graph", "Acceleration"],
      ["Area under a velocity–time graph", "Displacement"],
      ["Horizontal line on a velocity–time graph", "Constant velocity"],
    ],
    explanation: "Gradients are rates of change (velocity from displacement, acceleration from velocity); the area under a velocity–time graph is velocity × time, the displacement; a horizontal velocity–time line means the velocity does not change.",
  });

  {
    const V = 1150 / (0.5 * (70 + 45));
    chk(V, 20);
    b.calc({
      d: 4, skill: "APPLICATION", calculator: false,
      stem: t`A car starts from rest at a traffic light in Gweru. It accelerates uniformly for 15 s to a speed of $V$ m/s, travels at this speed for 45 s, then decelerates uniformly for 10 s and stops at the next light, 1.15 km away. Find $V$.`,
      value: V, unit: "m/s", wrong: [1150 / 70, 1150 / 115],
      explanation: t`Total time $70$ s. Area $= \frac{1}{2}(70 + 45)V = 57.5V = 1150$, so $V = 20$ m s$^{-1}$. Using $70V$ (a rectangle) gives 16.4; forgetting the $\frac{1}{2}$ gives 10.`,
      workedSolution: steps(
        t`Sketch: up from $(0, 0)$ to $(15, V)$, level to $(60, V)$, down to $(70, 0)$.`,
        t`Area $= \frac{1}{2}(70 + 45)V = 57.5V$.`,
        t`$57.5V = 1150$ gives $V = 20$ m s$^{-1}$.`,
      ),
      hints: ["The velocity–time graph is a trapezium.", "Change 1.15 km to metres."],
    });
  }

  {
    const accDist = 0.5 * 12 * 6;
    const decT = 6 / 0.75;
    const decDist = 0.5 * decT * 6;
    const T = (528 - accDist - decDist) / 6;
    chk(T, 78);
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: false,
      stem: t`Nyasha starts from rest and accelerates at 0.5 m/s$^2$ for 12 s. He then cycles at constant speed for $T$ s and finally decelerates at 0.75 m/s$^2$ until he stops. He travels 528 m altogether. Find $T$.`,
      value: T, unit: "s", wrong: [528 / 6, (528 - 36) / 6],
      explanation: t`Top speed $= 0.5 \times 12 = 6$ m s$^{-1}$. Deceleration time $= \frac{6}{0.75} = 8$ s. Areas: $\frac{1}{2}(12)(6) = 36$, $6T$, $\frac{1}{2}(8)(6) = 24$. $36 + 6T + 24 = 528$ gives $T = 78$ s.`,
      workedSolution: steps(
        t`Top speed $= 0.5 \times 12 = 6$ m s$^{-1}$.`,
        t`Time to stop $= 6 \div 0.75 = 8$ s.`,
        t`Distance: $36 + 6T + 24 = 528$.`,
        t`$6T = 468$, so $T = 78$ s.`,
      ),
      hints: ["Find the top speed first.", "Use the deceleration to find how long he takes to stop."],
    });
  }

  {
    // v = 6 − 2t for 0 ≤ t ≤ 5: zero at t = 3, v(5) = −4
    const fwd = 0.5 * 3 * 6;
    const back = 0.5 * 2 * 4;
    chk(fwd + back, 13);
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: false,
      stem: "A particle moving along a straight line has velocity 6 m/s at t = 0 and a constant acceleration of −2 m/s² for 5 s. Find the total distance it travels in these 5 s.",
      value: fwd + back, unit: "m", wrong: [fwd - back, 0.5 * 5 * 6],
      explanation: t`The velocity is $6 - 2t$, zero at $t = 3$ and $-4$ m s$^{-1}$ at $t = 5$. Area above the axis $\frac{1}{2}(3)(6) = 9$, below the axis $\frac{1}{2}(2)(4) = 4$. Distance $= 9 + 4 = 13$ m; the displacement is only $9 - 4 = 5$ m.`,
      workedSolution: steps(
        t`$v = 0$ when $6 - 2t = 0$: $t = 3$ s. At $t = 5$, $v = -4$ m s$^{-1}$.`,
        t`Forward stage: $\frac{1}{2} \times 3 \times 6 = 9$ m.`,
        t`Backward stage: $\frac{1}{2} \times 2 \times 4 = 4$ m.`,
        t`Distance $= 13$ m.`,
      ),
      hints: ["Find when the velocity is zero.", "Distance adds the areas above and below the axis."],
    });
  }

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 3,
    stem: "Chipo walks from her house to a borehole 200 m away at a constant 1.6 m/s, waits there for 60 s while she fills her bucket, then walks home at a constant 1 m/s. Describe the displacement–time graph of her trip, giving the coordinates of each corner.",
    points: [
      t`A straight line from $(0, 0)$ up to $(125, 200)$ (gradient 1.6, as $200 \div 1.6 = 125$ s).`,
      t`A horizontal line from $(125, 200)$ to $(185, 200)$ while she waits.`,
      t`A straight line down from $(185, 200)$ to $(385, 0)$, less steep than the first (gradient $-1$).`,
    ],
    modelAnswer: t`Time in seconds across, displacement from the house in metres up. The graph rises in a straight line from $(0, 0)$ to $(125, 200)$, stays level at 200 m until $(185, 200)$, then falls in a less steep straight line to $(385, 0)$ when she is home.`,
    explanation: t`Walking out takes $200 \div 1.6 = 125$ s, waiting ends at 185 s and walking home takes $200 \div 1 = 200$ s, ending at 385 s.`,
    hints: ["Work out the time of each stage first."],
  });

  {
    const a1 = (17 - 5) / 8;
    const a2 = 17 / 6;
    const dist = 0.5 * (5 + 17) * 8 + 0.5 * 17 * 6;
    chk(dist, 139);
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
      stem: "A particle passes a point O with velocity 5 m/s. It accelerates uniformly to 17 m/s in 8 s, then decelerates uniformly and comes to rest 6 s later.",
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Find the acceleration in the first stage.", value: a1, unit: "m/s²", wrong: [17 / 8],
          explanation: t`$a = \frac{17 - 5}{8} = 1.5$ m s$^{-2}$.` }),
        P.num({ label: "(b)", marks: 1, stem: "Find the deceleration in the second stage, correct to 3 significant figures.", value: a2, unit: "m/s²", wrong: [12 / 6],
          explanation: t`$\frac{17}{6} = 2.83$ m s$^{-2}$.` }),
        P.num({ label: "(c)", marks: 3, stem: "Find the total distance travelled from O until the particle stops.", value: dist, unit: "m", wrong: [0.5 * 14 * 17, 0.5 * 17 * 8 + 0.5 * 17 * 6],
          explanation: t`Trapezium $\frac{1}{2}(5 + 17)(8) = 88$ m plus triangle $\frac{1}{2}(6)(17) = 51$ m: 139 m.` }),
        P.num({ label: "(d)", marks: 2, stem: "Find the average speed for the 14 s, correct to 3 significant figures.", value: dist / 14, unit: "m/s", wrong: [(5 + 17 + 0) / 3, 11],
          explanation: t`$\frac{139}{14} = 9.93$ m s$^{-1}$.` }),
      ],
      explanation: "Gradients give the accelerations; the area (a trapezium for the first stage because it does not start from rest, then a triangle) gives the distance.",
      hints: ["The first stage starts at 5 m/s, not at 0.", "Average speed = total distance ÷ total time."],
    });
  }

  {
    // train: accel 0.4, decel 0.8, total 200 s, 5 km; D(V) = 200V − 1.875V²
    const r = quad.roots(1.875, -200, 5000);
    chk(r[0], 40, 1e-9);
    chk(r[1], 200 / 3, 1e-9);
    const V = 40;
    const tc = 200 - V / 0.4 - V / 0.8;
    chk(tc, 50);
    chk(V * tc + 0.5 * (V / 0.4) * V + 0.5 * (V / 0.8) * V, 5000);
    same([200 / 3 / 0.4 + 200 / 3 / 0.8 > 200], [true]);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
      stem: t`A train travels 5 km between two stations in 200 s. It starts from rest, accelerates at 0.4 m s$^{-2}$ to a top speed of $V$ m s$^{-1}$, travels at this speed, then decelerates at 0.8 m s$^{-2}$ to rest.`,
      parts: [
        P.proof({ label: "(a)", marks: 3, stem: t`Show that the distance travelled is $200V - 1.875V^2$ metres.`,
          points: [
            t`M1 accelerating time $\frac{V}{0.4} = 2.5V$ and decelerating time $\frac{V}{0.8} = 1.25V$.`,
            t`M1 constant-speed time $200 - 3.75V$ and area expression with three parts (or a trapezium).`,
            t`A1 simplifies to $200V - 1.875V^2$ with no errors.`,
          ],
          modelAnswer: t`Accelerating takes $\frac{V}{0.4} = 2.5V$ s and decelerating $\frac{V}{0.8} = 1.25V$ s, so the constant-speed stage lasts $200 - 3.75V$ s.

$$
\text{distance} = \tfrac{1}{2}(2.5V)V + V(200 - 3.75V) + \tfrac{1}{2}(1.25V)V
$$

$$
= 1.25V^2 + 200V - 3.75V^2 + 0.625V^2 = 200V - 1.875V^2
$$`,
          explanation: "Each stage time comes from time = change in speed ÷ acceleration." }),
        P.num({ label: "(b)", marks: 3, stem: t`Hence find $V$.`, value: V, unit: "m/s", wrong: [200 / 3],
          explanation: t`$200V - 1.875V^2 = 5000$ gives $1.875V^2 - 200V + 5000 = 0$, so $V = 40$ or $V = 66.7$; the larger value is rejected (see (c)).` }),
        P.manual({ label: "(c)", marks: 1, stem: t`Explain why the other root of your equation in (b) must be rejected.`,
          points: [t`With $V = 66.7$ the accelerating and decelerating times total $3.75 \times 66.7 = 250$ s, more than 200 s (negative constant-speed time).`],
          modelAnswer: t`If $V = \frac{200}{3}$, speeding up and slowing down alone take $3.75 \times \frac{200}{3} = 250$ s, which is longer than the whole journey, so the constant-speed time would be negative.`,
          explanation: "Every stage time must be non-negative." }),
        P.num({ label: "(d)", marks: 1, stem: "Find the time for which the train travels at its top speed.", value: tc, unit: "s", wrong: [100],
          explanation: t`$200 - 3.75 \times 40 = 50$ s.` }),
        P.num({ label: "(e)", marks: 1, stem: "Find the average speed of the train between the stations.", value: 5000 / 200, unit: "m/s", wrong: [20],
          explanation: t`$\frac{5000}{200} = 25$ m s$^{-1}$.` }),
      ],
      explanation: "Express each stage time in terms of V, write the area as the distance, solve the quadratic and reject the root that gives a negative time.",
      hints: ["Time to reach V at 0.4 m/s² is V ÷ 0.4.", "Divide the quadratic by 1.875 or use the formula."],
    });
  }

  b.card("DEFINITION", "Scalar and vector", "A scalar has size only (distance, speed, time, mass). A vector has size and direction (displacement, velocity, acceleration, force).");
  b.card("DEFINITION", "Displacement", "Position relative to a fixed point, measured along the line with a sign or direction. It can decrease; distance cannot.");
  b.card("FORMULA", "Average speed", t`$\text{average speed} = \dfrac{\text{total distance}}{\text{total time}}$`, "Not the mean of the stage speeds unless the stages take equal times.");
  b.card("CONCEPT", "Gradient of a displacement–time graph", "The velocity. Horizontal = at rest; sloping down = moving back towards the start.");
  b.card("CONCEPT", "Gradient of a velocity–time graph", "The acceleration. A line sloping down means slowing down (if v > 0).");
  b.card("CONCEPT", "Area under a velocity–time graph", "The displacement. Area below the time axis counts as negative; add all areas as positive for the distance.");
  b.card("FACT", "Velocity–time graph crossing the time axis", "The object is momentarily at rest and changes direction.");
  b.card("FORMULA", "Trapezium area for a three-stage journey", t`$\text{distance} = \dfrac{1}{2}(T + t_c)V$, where $T$ is the total time, $t_c$ the time at constant speed and $V$ the top speed.`);
});
