// W1a: kinematics.motion-graphs — definitions, s-t and v-t graphs, gradients, tangents and areas.
import { concept, P, t as raw, chk, sfStr, dpStr, table, gradient } from "../lib.mjs";

// String.raw keeps "\n" literally: turn \n (not followed by a lower-case letter, so \nu and \neq survive) into a newline.
const t = (s, ...v) => raw(s, ...v).replace(/\\n(?![a-z])/g, "\n");

const K = "aphys.kinematics.motion-graphs";

concept(K, { file: "kinematics/motion-graphs", keyPrefix: "kinematics.motion-graphs" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is the correct definition of velocity?",
    options: [
      ["the rate of change of displacement", "Correct: change of displacement per unit time, a vector."],
      ["the distance travelled per unit time", "This defines speed, a scalar."],
      ["the rate of change of speed", "This is not acceleration either: acceleration is the rate of change of velocity."],
      ["the displacement multiplied by the time taken", "Velocity divides displacement by time; it does not multiply."],
    ],
    answer: "A",
    explanation: "Velocity is the rate of change of displacement. Speed is the rate of change of distance. Acceleration is the rate of change of velocity.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Part of a displacement-time graph for a trolley is a horizontal straight line well above the time axis. What does this section show?",
    options: [
      ["The trolley is at rest some distance from the reference point.", "Correct: zero gradient means zero velocity; the height is the displacement."],
      ["The trolley is moving at a constant high velocity.", "Velocity is the gradient of the line, which is zero, not its height."],
      ["The trolley is moving with constant acceleration.", "Constant acceleration gives a curve on a displacement-time graph."],
      ["The trolley is moving back towards the reference point.", "That would be a line sloping downwards (negative gradient)."],
    ],
    answer: "A",
    explanation: "On a displacement-time graph the gradient is the velocity. A horizontal line has zero gradient: the object is stationary at the displacement shown.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "What does the area between a velocity-time graph and the time axis represent?",
    options: [
      ["displacement", "Correct: velocity × time = displacement."],
      ["acceleration", "Acceleration is the gradient of a velocity-time graph, not the area."],
      ["average velocity", "Average velocity is the area divided by the total time."],
      ["the resultant force", "Force is not read from a velocity-time graph without the mass."],
    ],
    answer: "A",
    explanation: "Area under a v-t graph = displacement (area below the axis counts as negative). Gradient of a v-t graph = acceleration.",
  });
  {
    const disp = 3 * 5 + -1.5 * 7;
    const dist = 3 * 5 + 1.5 * 7;
    chk(disp, 4.5);
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: t`A velocity-time graph shows a robot moving at $+3.0\ \text{m s}^{-1}$ for $5.0\ \text{s}$, then at $-1.5\ \text{m s}^{-1}$ for $7.0\ \text{s}$ (the changes of velocity are almost instantaneous). What is its displacement from the start after $12\ \text{s}$?`,
      options: [
        [t`$4.5\ \text{m}$`, "Correct: +15 m − 10.5 m = +4.5 m."],
        [t`$25.5\ \text{m}$`, "This is the total distance travelled: the area below the axis is negative for displacement."],
        [t`$15\ \text{m}$`, "This ignores the 10.5 m travelled back towards the start."],
        [t`$-10.5\ \text{m}$`, "This is only the second stage's displacement."],
      ],
      answer: "A",
      explanation: t`Displacement $=$ signed area: $(3.0)(5.0) + (-1.5)(7.0) = 15 - 10.5 = ${disp}\ \text{m}$. The distance travelled is $15 + 10.5 = ${dist}\ \text{m}$.`,
      hints: ["Area below the time axis is negative displacement."],
    });
  }
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A ball is dropped from rest, bounces once on hard ground and rises again. Upwards is positive and air resistance is negligible. Which description of its velocity-time graph is correct?",
    options: [
      ["A straight line of negative gradient to a large negative velocity, a sudden jump to a positive velocity, then a line with the same negative gradient.", "Correct: the acceleration is −g throughout the flight; the bounce reverses the velocity almost instantly."],
      ["A straight line of positive gradient to a large positive velocity, a sudden drop to zero, then a horizontal line along the time axis.", "Falling is negative velocity when upwards is positive, and the ball rises again after bouncing."],
      ["A curve of increasing gradient down to the bounce, then a curve of decreasing gradient back up to zero velocity.", "Without air resistance the acceleration is constant, so the lines are straight."],
      ["A straight line of negative gradient to the bounce, then a line of positive gradient back to zero velocity.", "After the bounce the ball still accelerates downwards at g, so the gradient stays negative."],
    ],
    answer: "A",
    explanation: "In flight the only force is weight, so the gradient (acceleration) is always −9.81 m s⁻². Falling: v becomes more negative. At the bounce v jumps from negative to positive. Rising: v decreases (same negative gradient) towards zero at the top.",
    hints: ["What is the acceleration while the ball is in the air, both falling and rising?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "A stone is thrown vertically upwards. Ignoring air resistance, what is its acceleration at the highest point of its path?",
    options: [
      [t`$9.81\ \text{m s}^{-2}$ downwards`, "Correct: the only force is still its weight."],
      ["zero", "The velocity is momentarily zero, but the velocity is still changing, so the acceleration is not zero."],
      [t`$9.81\ \text{m s}^{-2}$ upwards`, "Gravity always pulls downwards; the acceleration is downwards throughout."],
      ["it depends on the mass of the stone", "Without air resistance all objects fall with the same acceleration, g."],
    ],
    answer: "A",
    explanation: "Zero velocity does not mean zero acceleration. At the top the stone's velocity is changing from upwards to downwards at 9.81 m s⁻² every second.",
    hints: ["Is the velocity changing at the top?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "The displacement-time graph of a car is a curve that starts steep and becomes less steep, while staying above the time axis and rising. Which statement about the car is correct?",
    options: [
      ["It is moving forwards and slowing down.", "Correct: the positive gradient (velocity) is decreasing, so the car decelerates while still moving forwards."],
      ["It is moving forwards and speeding up.", "Speeding up would make the curve steeper with time."],
      ["It is moving backwards towards its starting point.", "The displacement is still increasing, so the motion is forwards."],
      ["It is moving at constant velocity.", "Constant velocity gives a straight line, not a curve."],
    ],
    answer: "A",
    explanation: "Velocity = gradient. A rising curve that flattens has a positive but decreasing gradient: forward motion with decreasing velocity (negative acceleration).",
    hints: ["Look at what happens to the gradient, not the height."],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: t`What is the unit of the gradient of a velocity-time graph with $v$ in $\text{m s}^{-1}$ and $t$ in $\text{s}$?`,
    options: [
      [t`$\text{m s}^{-2}$`, "Correct: (m s⁻¹)/s, the unit of acceleration."],
      [t`$\text{m}$`, "Metres is the unit of the area (velocity × time)."],
      [t`$\text{m s}^{-1}$`, "This is the unit of the y-axis quantity, not of the gradient."],
      [t`$\text{m s}$`, "The gradient divides by time; it does not multiply."],
    ],
    answer: "A",
    explanation: t`Gradient $= \Delta v / \Delta t$: $\text{m s}^{-1} \div \text{s} = \text{m s}^{-2}$, an acceleration. The area has unit $\text{m s}^{-1} \times \text{s} = \text{m}$.`,
  });

  // Numerical and calculation items
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: t`On a velocity-time graph a truck's velocity rises in a straight line from $3.0\ \text{m s}^{-1}$ at $t = 0$ to $12.6\ \text{m s}^{-1}$ at $t = 8.0\ \text{s}$. Calculate its acceleration, in $\text{m s}^{-2}$.`,
    value: (12.6 - 3) / 8, unit: "m/s²", wrong: [12.6 / 8],
    explanation: t`$a = \dfrac{12.6 - 3.0}{8.0} = 1.2\ \text{m s}^{-2}$. Dividing the final velocity by the time (1.58) ignores the initial $3.0\ \text{m s}^{-1}$.`,
  });
  {
    const s = 0.5 * (6 + 18) * 10;
    chk(s, 120);
    b.calc({
      d: 3, skill: "APPLICATION",
      stem: t`A velocity-time graph is a straight line from $6.0\ \text{m s}^{-1}$ at $t = 0$ to $18\ \text{m s}^{-1}$ at $t = 10\ \text{s}$. Calculate the displacement in this time, in m.`,
      value: s, unit: "m", wrong: [18 * 10, 0.5 * 18 * 10],
      explanation: t`1. The area is a trapezium (a rectangle plus a triangle).\n2. $s = \tfrac{1}{2}(6.0 + 18)(10) = 120\ \text{m}$.\n\nUsing the final velocity × time (180 m) overestimates; a triangle from zero (90 m) ignores the initial velocity.`,
      hints: ["The area under the line is a trapezium."],
    });
  }
  {
    const v = gradient([0.5, 1.2], [3.5, 9.6]);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A tangent is drawn to a curved displacement-time graph at $t = 2.0\ \text{s}$. It passes through $(0.50\ \text{s},\ 1.2\ \text{m})$ and $(3.50\ \text{s},\ 9.6\ \text{m})$. Calculate the instantaneous velocity at $t = 2.0\ \text{s}$, in $\text{m s}^{-1}$.`,
      value: v, unit: "m/s", wrong: [9.6 / 3.5, 1 / v],
      explanation: t`1. Gradient of the tangent $= \dfrac{9.6 - 1.2}{3.50 - 0.50} = \dfrac{8.4}{3.00}$.\n2. $v = ${sfStr(v, 2)}\ \text{m s}^{-1}$.\n\nDividing one point's displacement by its time gives an average from the origin, not the gradient of the tangent.`,
      hints: ["The velocity is the gradient of the tangent."],
    });
  }
  {
    const s = 0.5 * 20 * 15 + 60 * 15 + 0.5 * 30 * 15;
    const avg = s / 110;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A train accelerates uniformly from rest to $15\ \text{m s}^{-1}$ in $20\ \text{s}$, travels at $15\ \text{m s}^{-1}$ for $60\ \text{s}$, then decelerates uniformly to rest in $30\ \text{s}$. Calculate its average speed for the whole journey, in $\text{m s}^{-1}$.`,
      value: avg, unit: "m/s", wrong: [7.5, 15],
      explanation: t`1. Distance $=$ area: $\tfrac{1}{2}(20)(15) + (60)(15) + \tfrac{1}{2}(30)(15) = 150 + 900 + 225 = ${s}\ \text{m}$.\n2. Total time $= 110\ \text{s}$.\n3. Average speed $= ${s}/110 = ${sfStr(avg, 3)}\ \text{m s}^{-1}$.\n\nAveraging 0 and 15 (7.5) ignores the long constant-speed stage.`,
      hints: ["Find the total area under the graph.", "Divide by the total time."],
    });
  }
  {
    const tz = 8 / (14 / 7);
    const s = 0.5 * tz * 8 + 0.5 * (7 - tz) * -6;
    chk(tz, 4);
    chk(s, 7);
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`An object's velocity decreases uniformly from $+8.0\ \text{m s}^{-1}$ at $t = 0$ to $-6.0\ \text{m s}^{-1}$ at $t = 7.0\ \text{s}$. Calculate its displacement at $t = 7.0\ \text{s}$, in m.`,
      value: s, unit: "m", wrong: [16 + 9, 0.5 * (8 + -6) * 7 + 0.001],
      explanation: t`1. Gradient $= \dfrac{-6.0 - 8.0}{7.0} = -2.0\ \text{m s}^{-2}$, so $v = 0$ at $t = 8.0/2.0 = 4.0\ \text{s}$.\n2. Area above the axis: $\tfrac{1}{2}(4.0)(8.0) = 16\ \text{m}$.\n3. Area below: $\tfrac{1}{2}(3.0)(-6.0) = -9.0\ \text{m}$.\n4. Displacement $= 16 - 9.0 = 7.0\ \text{m}$ (the distance travelled is 25 m).`,
      hints: ["Find when the velocity is zero.", "Areas below the axis are negative."],
    });
  }

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "An object that is momentarily at rest must have zero acceleration at that instant.",
    answer: false,
    explanation: "False. A ball at the top of its flight has zero velocity but an acceleration of 9.81 m s⁻² downwards: its velocity is still changing.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A straight line sloping downwards on a velocity-time graph always means that the object is moving backwards.",
    answer: false,
    explanation: "False. A downward slope means negative acceleration. While the line is above the axis the velocity is still positive (moving forwards, slowing down); only below the axis is the object moving backwards.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each graph feature with the motion it shows.",
    pairs: [
      ["horizontal line on a displacement-time graph", "at rest"],
      ["straight line of positive gradient on a displacement-time graph", "constant velocity away from the reference point"],
      ["straight line of positive gradient on a velocity-time graph", "uniform acceleration"],
      ["curve flattening to horizontal on a velocity-time graph", "acceleration decreasing to zero"],
    ],
    explanation: "On s-t, gradient = velocity; on v-t, gradient = acceleration. A v-t curve that levels off (as for an object reaching terminal velocity) shows a decreasing acceleration.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the graph rules.",
    template: "The gradient of a velocity-time graph gives the {{blank:a}}, and the area under an acceleration-time graph gives the change in {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["acceleration"], choices: ["acceleration", "displacement", "velocity"] },
      { id: "b", accepted: ["velocity"], choices: ["acceleration", "displacement", "velocity"] },
    ],
    explanation: "Gradient goes down a level (s → v → a); area goes up a level (a → Δv, v → Δs).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What quantity is given by the gradient of the tangent to a displacement-time graph at a particular time?",
    accepted: ["instantaneous velocity", "velocity", "the velocity", "the instantaneous velocity", "velocity at that instant"],
    wrong: ["speed", "acceleration"],
    explanation: "The gradient of the tangent is the **instantaneous velocity** at that time.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "A ball is thrown vertically upwards and caught again at the same height. Taking upwards as positive and ignoring air resistance, describe the velocity-time graph you would sketch for its flight: shape, gradient and key points.",
    points: [
      "A single straight line starting at a positive velocity (the launch speed) and sloping downwards",
      "Constant negative gradient equal to −g (−9.81 m s⁻²) throughout",
      "It crosses the time axis at the top of the flight (half-way in time) and ends at a negative velocity of the same size as the launch velocity; the areas above and below the axis are equal",
    ],
    modelAnswer: "The graph is one straight line. It starts at +u, slopes down with a constant gradient of −9.81 m s⁻², passes through v = 0 at the highest point (half the total time) and ends at −u when the ball is caught. The triangles above and below the axis have equal areas, so the total displacement is zero.",
    explanation: "Constant acceleration gives a straight line; the change of direction appears as the line crossing the axis.",
    hints: ["What is the acceleration throughout?"],
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Sipho jogs 400 m once round a running track and stops where he started. Explain why the distance he travelled and his displacement are different.",
    points: [
      "Distance is the total length of path covered (a scalar): 400 m",
      "Displacement is the straight-line distance from start to finish in a specified direction (a vector): zero, because he finishes where he started",
    ],
    modelAnswer: "Distance is the total length of the path, 400 m. Displacement is the change in position in a stated direction, measured in a straight line from start to finish; since he ends at his starting point, his displacement is zero.",
    explanation: "Distance is a scalar path length; displacement is a vector change of position.",
  });

  // Practice structured 1: a lift's velocity-time data.
  {
    const up = 0.5 * 2 * 1.6 + 7 * 1.6 + 0.5 * 2 * 1.6;
    const down = 0.5 * 1.8 * 1.8 + 6.5 * 1.8 + 0.5 * 1.2 * 1.8;
    chk(up, 14.4, 1e-9);
    chk(down, 14.4, 1e-9);
    const total = 25;
    const avgSpeed = (up + down) / total;
    const aFinal = (0 - -1.8) / 1.2;
    chk(aFinal, 1.5, 1e-9);
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true, examStyle: true,
      stem: t`A data logger records the vertical velocity $v$ of a goods lift in a Mutare warehouse (upwards positive). The velocity changes uniformly between the times listed.\n\n${table([t`$t\,/\,\text{s}$`, "0", "2.0", "9.0", "11.0", "15.5", "17.3", "23.8", "25.0"], [[t`$v\,/\,\text{m s}^{-1}$`, "0", "1.6", "1.6", "0", "0", "−1.8", "−1.8", "0"]])}`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: t`Calculate the acceleration of the lift during the first $2.0\ \text{s}$, in $\text{m s}^{-2}$.`, value: 0.8, unit: "m/s²", wrong: [1.6 * 2], explanation: t`$a = (1.6 - 0)/2.0 = 0.80\ \text{m s}^{-2}$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate how far the lift rises between $t = 0$ and $t = 11.0$ s, in m.", value: up, unit: "m", wrong: [1.6 * 11], explanation: t`Area $= \tfrac{1}{2}(2.0)(1.6) + (7.0)(1.6) + \tfrac{1}{2}(2.0)(1.6) = 1.6 + 11.2 + 1.6 = 14.4\ \text{m}$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Calculate the acceleration of the lift between $t = 23.8\ \text{s}$ and $t = 25.0\ \text{s}$, in $\text{m s}^{-2}$, including its sign.`, value: aFinal, unit: "m/s²", wrong: [-aFinal], explanation: t`$a = \dfrac{0 - (-1.8)}{1.2} = +1.5\ \text{m s}^{-2}$: positive (upwards), because the downward-moving lift is slowing down.` }),
        P.mcq({ label: "(d)", stem: t`What is the displacement of the lift at $t = 25.0\ \text{s}$ from its position at $t = 0$?`, options: [["0 m", "Correct: it rises 14.4 m and descends 14.4 m."], ["28.8 m", "This is the total distance travelled."], ["14.4 m upwards", "This ignores the descent."], ["14.4 m downwards", "This ignores the ascent."]], answer: "A", explanation: t`Area above the axis $= +14.4\ \text{m}$; area below $= \tfrac{1}{2}(1.8)(1.8) + (6.5)(1.8) + \tfrac{1}{2}(1.2)(1.8) = 14.4\ \text{m}$ (negative). Net displacement zero.` }),
        P.num({ label: "(e)", marks: 2, stem: t`Calculate the average speed of the lift over the whole $25.0\ \text{s}$, in $\text{m s}^{-1}$.`, value: avgSpeed, unit: "m/s", wrong: [0], explanation: t`Average speed $=$ total distance ÷ time $= 28.8/25.0 = ${sfStr(avgSpeed, 3)}\ \text{m s}^{-1}$. (The average **velocity** is zero.)` }),
        P.manual({ label: "(f)", marks: 3, stem: "Describe the displacement-time graph for the lift from $t = 0$ to $t = 25.0$ s.", points: ["Rises from zero: curving upwards (steepening) from 0 to 2.0 s, a straight line from 2.0 s to 9.0 s, then flattening to a maximum of 14.4 m at 11.0 s", "Horizontal at 14.4 m from 11.0 s to 15.5 s (at rest)", "Falls back to zero: curving down from 15.5 s, straight (gradient −1.8 m s⁻¹) from 17.3 s to 23.8 s, flattening to reach 0 m at 25.0 s"], modelAnswer: "The graph starts at zero and curves upward with increasing gradient to 2.0 s, is a straight line of gradient 1.6 m s⁻¹ to 9.0 s, then curves over to a maximum of 14.4 m at 11.0 s. It is flat at 14.4 m until 15.5 s. It then curves downwards, becomes a straight line of gradient −1.8 m s⁻¹ from 17.3 s to 23.8 s, and flattens out as it returns to 0 m at 25.0 s." }),
        P.manual({ label: "(g)", marks: 1, stem: "Explain why the acceleration in (c) is positive although the lift is moving downwards.", points: ["The velocity is negative but becoming less negative (changing towards zero), so the change in velocity, and the acceleration, is upwards (positive)"], modelAnswer: "The velocity changes from −1.8 m s⁻¹ to 0, an increase of +1.8 m s⁻¹, so the acceleration is positive (upwards): the lift is slowing its downward motion." }),
      ],
      explanation: t`Gradients give accelerations ($0.80\ \text{m s}^{-2}$ up at the start, $+1.5\ \text{m s}^{-2}$ while stopping on the way down); areas give the 14.4 m rise and the 14.4 m descent, so the displacement is zero while the average speed is $${sfStr(avgSpeed, 3)}\ \text{m s}^{-1}$.`,
      hints: ["Gradient of v-t = acceleration; area = displacement.", "Areas below the axis are negative.", "Distance adds the sizes of the areas."],
    });
  }

  // Practice structured 2: video analysis of a ball rolling down a curved ramp.
  {
    const ts = [0, 0.2, 0.4, 0.6, 0.8, 1.0];
    const ss = [0, 0.09, 0.32, 0.65, 1.05, 1.5];
    const avg = (ss[3] - ss[1]) / (ts[3] - ts[1]);
    const tan = gradient([0.3, 0.12], [0.9, 1.08]);
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true, examStyle: true,
      stem: t`Rudo films a ball rolling down a curved ramp next to a metre rule and reads its displacement $s$ along the ramp from the video frames.\n\n${table([t`$t\,/\,\text{s}$`, ...ts.map((x) => dpStr(x, 1))], [[t`$s\,/\,\text{m}$`, ...ss.map((x) => dpStr(x, 2))]])}`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: t`Calculate the average velocity between $t = 0.2\ \text{s}$ and $t = 0.6\ \text{s}$, in $\text{m s}^{-1}$.`, value: avg, unit: "m/s", wrong: [ss[3] / ts[3]], explanation: t`$\bar{v} = \dfrac{0.65 - 0.09}{0.6 - 0.2} = \dfrac{0.56}{0.4} = ${sfStr(avg, 2)}\ \text{m s}^{-1}$.` }),
        P.num({ label: "(b)", marks: 2, stem: t`A tangent to the curve at $t = 0.6\ \text{s}$ passes through $(0.30\ \text{s},\ 0.12\ \text{m})$ and $(0.90\ \text{s},\ 1.08\ \text{m})$. Calculate the instantaneous velocity at $t = 0.6\ \text{s}$, in $\text{m s}^{-1}$.`, value: tan, unit: "m/s", wrong: [ss[3] / ts[3]], explanation: t`Gradient $= \dfrac{1.08 - 0.12}{0.90 - 0.30} = \dfrac{0.96}{0.60} = ${sfStr(tan, 2)}\ \text{m s}^{-1}$.` }),
        P.mcq({ label: "(c)", stem: "What does the shape of the s-t graph (steepening throughout) show?", options: [["The ball's velocity increases throughout.", "Correct: the gradient (velocity) keeps increasing."], ["The ball's velocity is constant.", "Constant velocity would give a straight line."], ["The ball's velocity decreases throughout.", "A decreasing velocity would make the curve flatten."], ["The ball's acceleration is zero.", "A changing gradient means the velocity changes, so there is an acceleration."]], answer: "A", explanation: "The gradient of an s-t graph is the velocity; a curve that steepens shows the velocity increasing." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain why the instantaneous velocity found from a hand-drawn tangent is uncertain, and suggest how the uncertainty could be reduced.", points: ["The tangent's angle is judged by eye, so different students draw different tangents and gradients", "Also each displacement is read from a video frame / metre rule with uncertainty, and points are only 0.2 s apart so the curve between them is uncertain", "Improvement: take more readings (more frames, smaller time interval) near 0.6 s, draw a long tangent (or use a mirror/normal method), or use a motion sensor and data logger"], modelAnswer: "The tangent is drawn by eye, so its angle, and hence its gradient, varies between attempts. The readings themselves are uncertain (reading a moving ball against a rule) and there are only six points, so the curve near 0.6 s is not well defined. Using every video frame to get many more points near 0.6 s, drawing a long tangent with the help of a mirror (normal method), or using a motion sensor with a data logger would reduce the uncertainty." }),
      ],
      explanation: t`The average velocity over $0.2$–$0.6\ \text{s}$ is $${sfStr(avg, 2)}\ \text{m s}^{-1}$, less than the instantaneous $${sfStr(tan, 2)}\ \text{m s}^{-1}$ at $0.6\ \text{s}$, because the ball is accelerating.`,
      hints: ["Average velocity = Δs ÷ Δt.", "Instantaneous velocity = gradient of the tangent."],
    });
  }

  // Flashcards
  b.card("DEFINITION", "Displacement", "Distance moved in a specified direction from a reference point (a vector).");
  b.card("DEFINITION", "Velocity", "Rate of change of displacement (a vector).");
  b.card("DEFINITION", "Acceleration", "Rate of change of velocity (a vector), in m s⁻².");
  b.card("CONCEPT", "Gradient of a displacement-time graph", "Velocity; on a curve, the gradient of the tangent gives the instantaneous velocity.");
  b.card("CONCEPT", "Gradient of a velocity-time graph", "Acceleration.");
  b.card("CONCEPT", "Area under a velocity-time graph", "Displacement (area below the time axis is negative); the total of the sizes of the areas is the distance.");
  b.card("CONCEPT", "Velocity-time graph for a ball thrown up (no air resistance)", "One straight line of gradient −9.81 m s⁻², crossing the axis at the top of the flight.");
  b.card("FACT", "Acceleration at the top of a vertical throw", "9.81 m s⁻² downwards: zero velocity does not mean zero acceleration.");
  b.card("FORMULA", "Average velocity", t`$\bar{v} = \dfrac{\text{total displacement}}{\text{total time}}$`);
});
