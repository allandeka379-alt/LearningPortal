// W1a: kinematics.suvat — equations of uniformly accelerated motion, free fall, determining g.
import { concept, P, t as raw, chk, sfStr, dpStr, table, pctUnc, gradient, DATA } from "../lib.mjs";

// String.raw keeps "\n" literally: turn \n (not followed by a lower-case letter, so \nu and \neq survive) into a newline.
const t = (s, ...v) => raw(s, ...v).replace(/\\n(?![a-z])/g, "\n");

const K = "aphys.kinematics.suvat";
const g = DATA.g;

concept(K, { file: "kinematics/suvat", keyPrefix: "kinematics.suvat" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which equation of uniformly accelerated motion does **not** involve the time $t$?",
    options: [
      [t`$v^2 = u^2 + 2as$`, "Correct: it links u, v, a and s only."],
      [t`$v = u + at$`, "This contains t (and leaves out s)."],
      [t`$s = ut + \tfrac{1}{2}at^2$`, "This contains t (and leaves out v)."],
      [t`$s = \tfrac{1}{2}(u + v)t$`, "This contains t (and leaves out a)."],
    ],
    answer: "A",
    explanation: t`$v^2 = u^2 + 2as$ is found by eliminating $t$ between $v = u + at$ and $s = \tfrac{1}{2}(u + v)t$. Use it when time is neither given nor asked for.`,
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: t`A car accelerates uniformly from rest at $2.5\ \text{m s}^{-2}$ for $6.0\ \text{s}$. What is its final speed?`,
    options: [
      [t`$15\ \text{m s}^{-1}$`, "Correct: v = 0 + 2.5 × 6.0."],
      [t`$45\ \text{m s}^{-1}$`, "45 m is the distance travelled, ½at², not the speed."],
      [t`$2.4\ \text{m s}^{-1}$`, "This divides 6.0 by 2.5 instead of multiplying."],
      [t`$8.5\ \text{m s}^{-1}$`, "Acceleration and time are multiplied, not added."],
    ],
    answer: "A",
    explanation: t`$v = u + at = 0 + 2.5 \times 6.0 = 15\ \text{m s}^{-1}$.`,
  });
  {
    const s = 0.5 * g * 2 ** 2;
    b.mcq({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: t`A stone is dropped from rest. How far does it fall in the first $2.0\ \text{s}$? (Ignore air resistance; $g = 9.81\ \text{m s}^{-2}$.)`,
      options: [
        [t`$${sfStr(s, 3)}\ \text{m}$`, "Correct: ½ × 9.81 × 2.0²."],
        [t`$${sfStr(g * 2 ** 2, 3)}\ \text{m}$`, "The ½ in s = ut + ½at² has been left out."],
        [t`$${sfStr(0.5 * g, 3)}\ \text{m}$`, "This is the distance fallen in the first second only."],
        [t`$${sfStr(0.5 * g * 2, 3)}\ \text{m}$`, "The time must be squared."],
      ],
      answer: "A",
      explanation: t`$s = ut + \tfrac{1}{2}at^2 = 0 + \tfrac{1}{2}(9.81)(2.0)^2 = ${sfStr(s, 3)}\ \text{m}$.`,
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A 2 kg steel ball and a 5 kg steel ball are released together from the same height. Air resistance is negligible. Which statement is correct?",
    options: [
      ["They hit the ground together, because both accelerate at g.", "Correct: in free fall all masses have the same acceleration."],
      ["The 5 kg ball lands first, because its weight is greater.", "The larger weight acts on a proportionally larger mass, so the acceleration is the same."],
      ["The 2 kg ball lands first, because it has less inertia.", "Less inertia is matched by less weight; the acceleration is still g."],
      ["The 5 kg ball lands first, because heavier objects fall faster.", "This is the misconception Galileo's experiments disproved."],
    ],
    answer: "A",
    explanation: "Weight is proportional to mass (W = mg), so the acceleration W/m = g is the same for every mass. Without air resistance both balls land together.",
  });
  {
    const H = 20 ** 2 / (2 * g);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A ball is thrown vertically upwards at $20\ \text{m s}^{-1}$. Ignoring air resistance, what is its maximum height above the point of release?`,
      options: [
        [t`$${sfStr(H, 3)}\ \text{m}$`, "Correct: 0 = 20² − 2(9.81)s, so s = 400/19.62."],
        [t`$${sfStr(2 * H, 3)}\ \text{m}$`, "The factor 2 in v² = u² + 2as has been dropped."],
        [t`$${sfStr(20 / g, 3)}\ \text{m}$`, "This is u/g, the time to the top in seconds, not a height."],
        [t`$${sfStr(H / 2, 3)}\ \text{m}$`, "This divides by 4g instead of 2g."],
      ],
      answer: "A",
      explanation: t`At the top $v = 0$. With upwards positive: $0 = 20^2 + 2(-9.81)s$, so $s = \dfrac{400}{19.62} = ${sfStr(H, 3)}\ \text{m}$.`,
      hints: ["What is v at the highest point?", "Use the equation without t."],
    });
  }
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A truck brakes with the same constant deceleration from two different speeds. If its initial speed is doubled, by what factor does its braking distance change?",
    options: [
      ["4", "Correct: from v² = u² + 2as with v = 0, s = u²/2a ∝ u²."],
      ["2", "That would be true if the distance were proportional to u, but it depends on u²."],
      ["√2", "The distance grows faster than the speed, not more slowly."],
      ["8", "There is no cube: s ∝ u²."],
    ],
    answer: "A",
    explanation: t`With $v = 0$: $s = \dfrac{u^2}{2|a|}$. Doubling $u$ multiplies $s$ by $2^2 = 4$. This is why braking distances grow so quickly with speed.`,
    hints: ["Write the braking distance in terms of u and a."],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A ball is thrown vertically upwards from the edge of a cliff and later falls past the cliff edge into the sea. Air resistance is negligible. Which statement about the ball as it passes the level of the cliff edge on the way down is correct?",
    options: [
      ["Its speed equals its launch speed, and its velocity is downwards.", "Correct: v² = u² + 2as with s = 0 gives v = −u."],
      ["Its speed is greater than its launch speed, because it has been accelerating.", "It decelerated on the way up by exactly as much as it accelerated on the way down."],
      ["Its velocity equals its launch velocity.", "The speeds are equal but the directions are opposite, so the velocities differ."],
      ["Its acceleration is zero at that instant.", "The acceleration is −g throughout the flight."],
    ],
    answer: "A",
    explanation: t`At the same level the displacement is zero, so $v^2 = u^2 + 2a(0) = u^2$: the speed is the same and the velocity is reversed ($v = -u$).`,
    hints: ["What is the displacement when it is back at the launch level?"],
  });

  // Numerical and calculation items
  b.num({
    d: 2, skill: "APPLICATION",
    stem: t`A cyclist moving at $2.5\ \text{m s}^{-1}$ accelerates uniformly at $1.2\ \text{m s}^{-2}$ for $9.0\ \text{s}$. Calculate the final speed, in $\text{m s}^{-1}$.`,
    value: 2.5 + 1.2 * 9, unit: "m/s", wrong: [1.2 * 9],
    explanation: t`$v = u + at = 2.5 + 1.2 \times 9.0 = 13.3\ \text{m s}^{-1}$. Leaving out $u$ gives 10.8.`,
  });
  {
    const s = 4 * 12 + 0.5 * 0.6 * 12 ** 2;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A train moving at $4.0\ \text{m s}^{-1}$ accelerates uniformly at $0.60\ \text{m s}^{-2}$ for $12\ \text{s}$. Calculate the distance travelled in this time, in m.`,
      value: s, unit: "m", wrong: [0.5 * 0.6 * 144, 4 * 12 + 0.6 * 144],
      explanation: t`1. $s = ut + \tfrac{1}{2}at^2$.\n2. $s = 4.0 \times 12 + \tfrac{1}{2}(0.60)(12)^2 = 48 + 43.2$.\n3. $s = ${sfStr(s, 3)}\ \text{m}$.\n\nForgetting $ut$ gives 43.2 m.`,
      hints: ["Which quantity is not given and not needed?"],
    });
  }
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: t`A minibus travelling at $18\ \text{m s}^{-1}$ brakes with a uniform deceleration of $4.5\ \text{m s}^{-2}$. Calculate the time it takes to stop, in s.`,
    value: 4, unit: "s", wrong: [18 * 4.5, 4.5 / 18],
    explanation: t`1. $u = 18\ \text{m s}^{-1}$, $v = 0$, $a = -4.5\ \text{m s}^{-2}$.\n2. $v = u + at$: $0 = 18 - 4.5t$.\n3. $t = 18/4.5 = 4.0\ \text{s}$.`,
    hints: ["Use v = u + at with v = 0 and a negative."],
  });
  {
    const u = 25;
    const tr = 0.7;
    const a = 6.5;
    const s = u * tr + u ** 2 / (2 * a);
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A driver travelling at $25\ \text{m s}^{-1}$ sees a hazard. Her reaction time is $0.70\ \text{s}$, after which the car decelerates uniformly at $6.5\ \text{m s}^{-2}$. Calculate the total stopping distance, in m.`,
      value: s, unit: "m", wrong: [u ** 2 / (2 * a), u * tr + u ** 2 / a],
      explanation: t`1. Thinking distance (constant speed): $25 \times 0.70 = 17.5\ \text{m}$.\n2. Braking distance: $0 = 25^2 - 2(6.5)s$, so $s = \dfrac{625}{13} = ${sfStr(u ** 2 / (2 * a), 3)}\ \text{m}$.\n3. Total $= 17.5 + ${sfStr(u ** 2 / (2 * a), 3)} = ${sfStr(s, 3)}\ \text{m}$.\n\nThe braking distance alone (${sfStr(u ** 2 / (2 * a), 3)} m) ignores the reaction time.`,
      hints: ["During the reaction time the car does not slow down.", "Braking: v² = u² + 2as with v = 0."],
    });
  }
  {
    const u = 8;
    const h = 1.5;
    const tt = (u + Math.sqrt(u * u + 2 * g * h)) / g;
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Farai throws a ball vertically upwards at $8.0\ \text{m s}^{-1}$, releasing it $1.5\ \text{m}$ above the ground. He does not catch it. Calculate the time from release until it hits the ground, in s.`,
      value: tt, unit: "s", wrong: [(2 * u) / g, u / g],
      explanation: t`1. Upwards positive: $u = 8.0$, $a = -9.81\ \text{m s}^{-2}$, $s = -1.5\ \text{m}$.\n2. $-1.5 = 8.0t - 4.905t^2$, so $4.905t^2 - 8.0t - 1.5 = 0$.\n3. $t = \dfrac{8.0 + \sqrt{64 + 4(4.905)(1.5)}}{2(4.905)} = ${sfStr(tt, 3)}\ \text{s}$.\n\n$2u/g = ${sfStr((2 * u) / g, 3)}\ \text{s}$ is the time to return to the release height only.`,
      hints: ["The ground is below the release point: s is negative.", "Solve the quadratic and keep the positive root."],
    });
  }
  {
    const h = 0.8;
    const tt = 0.404;
    const gg = (2 * h) / tt ** 2;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true, daily: true,
      stem: t`A steel ball falls from rest through $0.800\ \text{m}$ in $0.404\ \text{s}$. Calculate the value of $g$ given by these readings, in $\text{m s}^{-2}$.`,
      value: gg, unit: "m/s²", wrong: [h / tt ** 2, (2 * h) / tt],
      hints: ["From rest, h = ½gt²; make g the subject."],
      explanation: t`$h = \tfrac{1}{2}gt^2$, so $g = \dfrac{2h}{t^2} = \dfrac{2 \times 0.800}{0.404^2} = ${sfStr(gg, 3)}\ \text{m s}^{-2}$.`,
    });
    const h2 = 0.65;
    const t2 = 0.364;
    const p = pctUnc(0.002, h2) + 2 * pctUnc(0.002, t2);
    b.num({
      d: 4, skill: "EVALUATION", calculator: true,
      stem: t`In a free-fall experiment, $g$ is calculated from $g = 2h/t^2$ with $h = 0.650 \pm 0.002\ \text{m}$ and $t = 0.364 \pm 0.002\ \text{s}$. Calculate the percentage uncertainty in $g$, to two significant figures.`,
      value: p, sf: 2, unit: "%", wrong: [pctUnc(0.002, h2) + pctUnc(0.002, t2)],
      explanation: t`$\%\,\Delta h = \dfrac{0.002}{0.650} \times 100 = ${sfStr(pctUnc(0.002, h2), 2)}\,\%$; $\%\,\Delta t = \dfrac{0.002}{0.364} \times 100 = ${sfStr(pctUnc(0.002, t2), 2)}\,\%$, doubled for $t^2$. Total $= ${sfStr(pctUnc(0.002, h2), 2)} + 2 \times ${sfStr(pctUnc(0.002, t2), 2)} = ${sfStr(p, 2)}\,\%$. The timing dominates.`,
      hints: ["g = 2h/t²: add the percentage uncertainties, doubling the one for t."],
    });
  }

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The equations of uniformly accelerated motion can be used to find the speed of a parachutist a few seconds after the parachute opens.",
    answer: false,
    explanation: "False. After the parachute opens, the drag force changes as the speed changes, so the acceleration is not constant and the suvat equations do not apply.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Ignoring air resistance, a ball thrown vertically upwards has the same acceleration on the way up as on the way down.",
    answer: true,
    explanation: "True. The only force is its weight, so the acceleration is 9.81 m s⁻² downwards throughout the flight, including the top.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each equation with the quantity it does **not** contain.",
    pairs: [
      [t`$v = u + at$`, t`$s$`],
      [t`$s = \tfrac{1}{2}(u + v)t$`, t`$a$`],
      [t`$s = ut + \tfrac{1}{2}at^2$`, t`$v$`],
      [t`$v^2 = u^2 + 2as$`, t`$t$`],
    ],
    explanation: "Choose the equation that leaves out the quantity you neither know nor need.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct values.",
    template: "Taking upwards as positive, a ball in free flight has acceleration {{blank:a}} m s⁻². At the top of its flight its velocity is {{blank:b}} m s⁻¹.",
    blanks: [
      { id: "a", accepted: ["−9.81"], choices: ["−9.81", "+9.81", "0"] },
      { id: "b", accepted: ["0"], choices: ["−9.81", "+9.81", "0"] },
    ],
    explanation: "The acceleration is −9.81 m s⁻² (downwards) throughout; the velocity is zero only at the top.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: t`Starting from the definition of acceleration and a velocity-time graph, derive the equation $v^2 = u^2 + 2as$ for uniformly accelerated motion.`,
    points: [
      t`From the definition of acceleration (gradient of the $v$-$t$ graph): $a = \dfrac{v - u}{t}$, so $t = \dfrac{v - u}{a}$`,
      t`Displacement is the area under the $v$-$t$ graph (a trapezium): $s = \tfrac{1}{2}(u + v)t$`,
      t`Substitute for $t$: $s = \tfrac{1}{2}(u + v)\dfrac{(v - u)}{a}$`,
      t`Simplify: $2as = v^2 - u^2$, so $v^2 = u^2 + 2as$`,
    ],
    modelAnswer: t`Acceleration is the gradient of the velocity-time graph: $a = (v - u)/t$, so $t = (v - u)/a$. The displacement is the area under the straight line, a trapezium: $s = \tfrac{1}{2}(u + v)t$. Substituting for $t$: $s = \dfrac{(u + v)(v - u)}{2a} = \dfrac{v^2 - u^2}{2a}$. Rearranging, $v^2 = u^2 + 2as$.`,
    explanation: "Two starting results (gradient and area), then eliminate t.",
    hints: ["Write an expression for t from the gradient and one for s from the area."],
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: t`To find $g$, a student could either drop a ball once from $1.000\ \text{m}$ and calculate $g = 2h/t^2$, or drop it from six heights and use the gradient of a graph of $h$ against $t^2$. Explain why the graph method is better.`,
    points: [
      "Several readings over a range: the best-fit line averages out random errors in individual times",
      "A systematic error (e.g. a constant delay in release or timing, or h measured to the wrong point) shows as a non-zero intercept and does not affect the gradient",
      "Anomalous readings can be seen and repeated / the straight line through the origin also confirms h ∝ t² (constant acceleration)",
    ],
    modelAnswer: "With six heights the best-fit line averages the random scatter in the times. A systematic error such as a constant delay in releasing the ball, or measuring h to the wrong part of the ball, shifts the line (giving an intercept) but leaves its gradient unchanged, so g = 2 × gradient is still correct. The graph also shows any anomalous point and checks that h is proportional to t².",
    explanation: "Graphs average random errors and separate systematic offsets from the gradient.",
    hints: ["What happens to a constant timing delay on the graph?"],
  });

  // Practice structured 1: stopping distances.
  {
    const tr = 0.68;
    const a = 7;
    const speeds = [10, 15, 20, 25, 30];
    const stop = speeds.map((u) => u * tr + u ** 2 / (2 * a));
    const sMax = 40;
    // u*tr + u^2/(2a) = 40  ->  u^2/(2a) + tr*u - 40 = 0
    const A = 1 / (2 * a);
    const uMax = (-tr + Math.sqrt(tr ** 2 + 4 * A * sMax)) / (2 * A);
    console.log("suvat stopping", stop, "uMax", uMax);
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true, examStyle: true,
      stem: t`A road-safety leaflet for drivers in Gweru models a car whose driver has a reaction time of $0.68\ \text{s}$ and whose brakes give a uniform deceleration of $7.0\ \text{m s}^{-2}$ on a dry road.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: t`Calculate the thinking distance at $20\ \text{m s}^{-1}$, in m.`, value: 20 * tr, unit: "m", explanation: t`$20 \times 0.68 = ${sfStr(20 * tr, 3)}\ \text{m}$ at constant speed.` }),
        P.num({ label: "(b)", marks: 2, stem: t`Calculate the braking distance at $20\ \text{m s}^{-1}$, in m.`, value: 400 / (2 * a), unit: "m", wrong: [400 / a], explanation: t`$0 = 20^2 - 2(7.0)s$, so $s = 400/14 = ${sfStr(400 / 14, 3)}\ \text{m}$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Calculate the total stopping distance at $30\ \text{m s}^{-1}$, in m.`, value: stop[4], unit: "m", wrong: [900 / 14], explanation: t`Thinking: $30 \times 0.68 = 20.4\ \text{m}$; braking: $900/14 = ${sfStr(900 / 14, 3)}\ \text{m}$; total $${sfStr(stop[4], 3)}\ \text{m}$.` }),
        P.mcq({ label: "(d)", stem: "Which graph of the leaflet's data would be a straight line through the origin?", options: [["braking distance against (speed)²", "Correct: braking distance = u²/2a, proportional to u²."], ["braking distance against speed", "Braking distance depends on u², so this graph curves upwards."], ["total stopping distance against (speed)²", "The thinking distance is proportional to u, not u², so the total is not proportional to u²."], ["thinking distance against (speed)²", "Thinking distance is proportional to u, so this graph curves."]], answer: "A", explanation: t`Braking distance $= u^2/(2a)$ is proportional to $u^2$; thinking distance $= u t_r$ is proportional to $u$.` }),
        P.manual({ label: "(e)", marks: 2, stem: "On a wet road the maximum deceleration is smaller. Explain the effect on the thinking distance and on the braking distance.", points: ["Thinking distance is unchanged: it depends only on speed and reaction time", "Braking distance increases because it is u²/2a and a is smaller (e.g. halving a doubles it)"], modelAnswer: "The thinking distance does not change, because it is the speed multiplied by the reaction time. The braking distance u²/2a increases because the deceleration a is smaller; if the deceleration were halved, the braking distance would double." }),
        P.num({ label: "(f)", marks: 3, stem: t`Calculate the greatest speed from which the car can stop within $40\ \text{m}$ on the dry road, in $\text{m s}^{-1}$.`, value: uMax, unit: "m/s", wrong: [Math.sqrt(2 * a * sMax)], explanation: t`$0.68u + \dfrac{u^2}{14} = 40$, i.e. $u^2 + 9.52u - 560 = 0$. $u = \dfrac{-9.52 + \sqrt{9.52^2 + 4 \times 560}}{2} = ${sfStr(uMax, 3)}\ \text{m s}^{-1}$. Ignoring the thinking distance gives $\sqrt{2 \times 7.0 \times 40} = ${sfStr(Math.sqrt(2 * a * sMax), 3)}\ \text{m s}^{-1}$, which is too high.` }),
        P.manual({ label: "(g)", marks: 1, stem: "Suggest one factor that increases a driver's reaction time.", points: ["Tiredness, alcohol or drugs, or distraction (e.g. using a phone)"], modelAnswer: "Using a mobile phone while driving (distraction); tiredness, alcohol and some medicines also increase reaction time." }),
      ],
      explanation: t`Stopping distance $=$ thinking distance ($u t_r$) $+$ braking distance ($u^2/2a$). At $30\ \text{m s}^{-1}$ it is $${sfStr(stop[4], 3)}\ \text{m}$; to stop within $40\ \text{m}$ the speed must be below $${sfStr(uMax, 3)}\ \text{m s}^{-1}$.`,
      hints: ["The car moves at constant speed during the reaction time.", "Braking: v² = u² + 2as with v = 0.", "Part (f) leads to a quadratic in u."],
    });
  }

  // Practice structured 2: determining g with an electromagnet and trapdoor.
  {
    const hs = [0.2, 0.4, 0.6, 0.8, 1.0, 1.2];
    const ts = [0.205, 0.288, 0.351, 0.405, 0.452, 0.496];
    const t2 = ts.map((x) => x * x);
    const yA = 0.239;
    const yB = 1.173; // points read from the least-squares line (gradient 4.91, intercept -0.006 m)
    const grad = gradient([0.05, yA], [0.24, yB]);
    const gg = 2 * grad;
    console.log("suvat g struct t2", t2, "grad", grad, "g", gg);
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true, examStyle: true,
      stem: t`Thandeka releases a steel ball from an electromagnet; the timer starts when the current is switched off and stops when the ball opens a trapdoor a height $h$ below.\n\n${table([t`$h\,/\,\text{m}$`, ...hs.map((x) => dpStr(x, 3))], [[t`$t\,/\,\text{s}$`, ...ts.map((x) => dpStr(x, 3))]])}`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: t`Calculate $t^2$ for $h = 0.800\ \text{m}$, in $\text{s}^2$, to three significant figures.`, value: t2[3], sf: 3, explanation: t`$0.405^2 = ${sfStr(t2[3], 3)}\ \text{s}^2$.` }),
        P.num({ label: "(b)", marks: 2, stem: t`Her best-fit line of $h$ (vertical) against $t^2$ passes through $(0.0500\ \text{s}^2,\ ${dpStr(yA, 3)}\ \text{m})$ and $(0.2400\ \text{s}^2,\ ${dpStr(yB, 3)}\ \text{m})$. Calculate the gradient, in $\text{m s}^{-2}$.`, value: gradient([0.05, yA], [0.24, yB]), unit: "m/s²", explanation: t`Gradient $= \dfrac{${dpStr(yB, 3)} - ${dpStr(yA, 3)}}{0.2400 - 0.0500} = ${sfStr(gradient([0.05, yA], [0.24, yB]), 3)}\ \text{m s}^{-2}$.` }),
        P.num({ label: "(c)", marks: 1, stem: t`Use the gradient to find $g$, in $\text{m s}^{-2}$.`, value: 2 * gradient([0.05, yA], [0.24, yB]), unit: "m/s²", wrong: [gradient([0.05, yA], [0.24, yB])], explanation: t`$h = \tfrac{1}{2}gt^2$, so gradient $= g/2$ and $g = 2 \times \text{gradient} = ${sfStr(2 * gradient([0.05, yA], [0.24, yB]), 3)}\ \text{m s}^{-2}$.` }),
        P.manual({ label: "(d)", marks: 2, stem: "The ball is released slightly after the timer starts because the electromagnet's field takes time to collapse. State and explain the effect on her graph of h against t².", points: ["Every measured t is too long by the same small delay (systematic error)", "The points are shifted, so the line does not pass through the origin (it meets the t² axis at a small positive value); the effect on the gradient is small"], modelAnswer: "Each time includes the same release delay, so every t is too long. The points are shifted to the right, so the best-fit line no longer passes through the origin but cuts the t² axis at a small positive value. The gradient, and so g, is affected much less than a single calculation would be." }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain why a small steel ball is used rather than a table-tennis ball.", points: ["Air resistance on the steel ball is negligible compared with its weight (dense, small area)", "So its acceleration is close to g; the light table-tennis ball has significant drag compared with its weight, so its acceleration is less than g (and the electromagnet needs an iron/steel object)"], modelAnswer: "The steel ball is dense and small, so air resistance is tiny compared with its weight and its acceleration is very close to g; it is also attracted by the electromagnet. A table-tennis ball has a large area for its small weight, so drag would noticeably reduce its acceleration." }),
      ],
      explanation: t`Plot $h$ against $t^2$: gradient $= g/2$, giving $g \approx ${sfStr(gg, 3)}\ \text{m s}^{-2}$. A release delay shifts the line off the origin.`,
      hints: ["h = ½gt² has the form y = mx.", "A constant delay affects every time equally."],
    });
  }

  // Flashcards
  b.card("FORMULA", "The four suvat equations", t`$v = u + at$; $s = \tfrac{1}{2}(u + v)t$; $s = ut + \tfrac{1}{2}at^2$; $v^2 = u^2 + 2as$`);
  b.card("CONCEPT", "When can the suvat equations be used?", "Only for constant (uniform) acceleration in a straight line.");
  b.card("CONCEPT", "How are the suvat equations derived?", "From a straight-line v-t graph: gradient = a gives v = u + at; area (trapezium) gives s = ½(u + v)t; eliminate v or t for the other two.");
  b.card("DEFINITION", "Free fall", "Motion under gravity alone (no air resistance), with acceleration g = 9.81 m s⁻² downwards.");
  b.card("FACT", "Acceleration at the top of a vertical throw", "Still 9.81 m s⁻² downwards; only the velocity is zero.");
  b.card("FORMULA", "Braking distance from speed u with deceleration a", t`$s = \dfrac{u^2}{2a}$, so doubling $u$ quadruples $s$.`);
  b.card("CONCEPT", "Stopping distance", "Thinking distance (speed × reaction time) + braking distance (u²/2a).");
  b.card("FORMULA", "g from a graph of h against t²", t`From rest $h = \tfrac{1}{2}gt^2$: gradient $= g/2$, so $g = 2 \times$ gradient.`);
  b.card("CONCEPT", "Ball thrown up, back at the launch level", "Same speed as at launch, opposite direction (no air resistance).");
});
