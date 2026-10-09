// W4a: amath.mechanics.constant-acceleration (ZIMSEC only)
import { concept, P, t, chk, suvat, quad, same, steps } from "../lib.mjs";

const { sqrt } = Math;

concept("amath.mechanics.constant-acceleration", { file: "mechanics/constant-acceleration", keyPrefix: "mechanics.constant-acceleration" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`Which equation of motion does not contain the displacement $s$?`,
    options: [
      [t`$v = u + at$`, "Correct: it links u, v, a and t only."],
      [t`$v^2 = u^2 + 2as$`, "This one contains s; it is the equation without t."],
      [t`$s = \frac{1}{2}(u + v)t$`, "This one contains s; it is the equation without a."],
      [t`$s = ut + \frac{1}{2}at^2$`, "This one contains s; it is the equation without v."],
    ],
    answer: "A",
    explanation: t`$v = u + at$ is the only one of the five equations without $s$. Use it when the displacement is neither given nor asked for.`,
  });

  b.tf({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`The equation $s = ut + \frac{1}{2}at^2$ may be used for any motion in a straight line, even when the acceleration changes.`,
    answer: false,
    explanation: "False. All five equations of motion assume that the acceleration is constant. When it changes, split the motion into stages of constant acceleration.",
  });

  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "A kombi travels at 54 km/h. What is this speed in metres per second?",
    options: [
      ["15 m/s", "Correct: 54 × 1000 ÷ 3600 = 15."],
      ["194.4 m/s", "This multiplies by 3.6 instead of dividing."],
      ["0.9 m/s", "This divides by 60 only (km per minute), and kilometres are not converted."],
      ["54 m/s", "The units have not been converted at all."],
    ],
    answer: "A",
    explanation: "1 km/h = 1000 m ÷ 3600 s, so divide km/h by 3.6: 54 ÷ 3.6 = 15 m/s.",
  });

  {
    const r = suvat({ u: 5, a: 2, t: 4 });
    b.num({
      d: 2, skill: "APPLICATION", calculator: false, daily: true,
      stem: "A particle has initial velocity 5 m/s and a constant acceleration of 2 m/s². Find its velocity after 4 s.",
      value: r.v, unit: "m/s", wrong: [8, 21],
      explanation: t`$v = u + at = 5 + 2 \times 4 = 13$ m s$^{-1}$. The value 8 forgets the initial velocity.`,
    });
  }

  {
    const r = suvat({ u: 0, a: 3, t: 6 });
    b.num({
      d: 2, skill: "APPLICATION", calculator: false, daily: true,
      stem: "A car starts from rest and accelerates uniformly at 3 m/s² for 6 s. How far does it travel?",
      value: r.s, unit: "m", wrong: [108, 18],
      explanation: t`$s = ut + \frac{1}{2}at^2 = 0 + \frac{1}{2} \times 3 \times 36 = 54$ m. Leaving out the $\frac{1}{2}$ gives 108 m; 18 is the final speed in m s$^{-1}$.`,
    });
  }

  {
    const r = suvat({ u: 20, v: 0, s: 50 });
    chk(r.a, -4);
    b.num({
      d: 2, skill: "APPLICATION", calculator: false,
      stem: "A motorcyclist travelling at 20 m/s brakes uniformly and stops in a distance of 50 m. Find the size of the deceleration.",
      value: -r.a, unit: "m/s²", wrong: [2, 8],
      explanation: t`$v^2 = u^2 + 2as$: $0 = 400 + 100a$, so $a = -4$ m s$^{-2}$, a deceleration of 4 m s$^{-2}$. Dividing 400 by 50 without the 2 gives 8.`,
    });
  }

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "A ball is thrown vertically upwards. Upwards is taken as positive and g = 9.8 m/s². What is the acceleration of the ball while it is falling back down?",
    options: [
      [t`$-9.8$ m s$^{-2}$`, "Correct: gravity acts downwards throughout, so a = −g both going up and coming down."],
      [t`$+9.8$ m s$^{-2}$`, "The ball speeds up while falling, but downwards is negative in this convention."],
      [t`$0$ m s$^{-2}$`, "The acceleration is never zero in free fall; the velocity is zero only at the top."],
      [t`$-19.6$ m s$^{-2}$`, "There is no doubling: the acceleration due to gravity is g."],
    ],
    answer: "A",
    explanation: "Once released, the only force is the ball's weight, so its acceleration is g downwards for the whole flight. With upwards positive, a = −9.8 m/s² at every instant.",
  });

  {
    const h = 19.6 ** 2 / (2 * 9.8);
    chk(h, 19.6, 1e-9);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: "A stone is thrown vertically upwards at 19.6 m/s. Take g = 9.8 m/s². Find the greatest height it reaches above the point of projection.",
      value: h, unit: "m", wrong: [2 * h, 2],
      explanation: t`At the top $v = 0$: $0 = 19.6^2 - 2(9.8)s$, so $s = \frac{384.16}{19.6} = 19.6$ m. Forgetting the 2 gives 39.2 m; 2 is the time to the top in seconds.`,
      hints: ["At the greatest height the velocity is zero.", "Use the equation without t."],
    });
  }

  {
    const h = 0.5 * 9.8 * 2.5 ** 2;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "A small stone is dropped from rest into a dry borehole and hits the bottom 2.5 s later. Take g = 9.8 m/s² and ignore air resistance. Find the depth of the borehole, correct to 3 significant figures.",
      value: h, unit: "m", wrong: [9.8 * 2.5 ** 2, 9.8 * 2.5],
      explanation: t`Downwards positive, $u = 0$: $s = \frac{1}{2}(9.8)(2.5^2) = 30.6$ m. Without the $\frac{1}{2}$ you get 61.3 m; 24.5 is the speed at the bottom.`,
      hints: ["'Dropped' means the initial velocity is zero."],
    });
  }

  {
    const r = suvat({ u: 12, a: 0.8, s: 120 });
    chk(r.t, (-12 + sqrt(144 + 192)) / 0.8, 1e-9);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "A car passes a road sign at 12 m/s and accelerates uniformly at 0.8 m/s². Find the time it takes to travel the next 120 m, correct to 3 significant figures.",
      value: r.t, unit: "s", wrong: [10, (-12 - sqrt(336)) / 0.8],
      explanation: t`$120 = 12t + 0.4t^2$, so $0.4t^2 + 12t - 120 = 0$ and $t = \frac{-12 + \sqrt{144 + 192}}{0.8} = 7.91$ s. The negative root is rejected; $120 \div 12 = 10$ ignores the acceleration.`,
      hints: ["Use s = ut + ½at² and solve the quadratic in t.", "Reject the negative root."],
    });
  }

  {
    const a = (26 - 14) / (7 - 3);
    const u = 14 - 3 * a;
    chk(u + 7 * a, 26);
    b.fib({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: "A particle moves with constant acceleration. Its velocity is 14 m/s after 3 s and 26 m/s after 7 s. Find its acceleration and its initial velocity.",
      template: "a = {{blank:a}} m/s², u = {{blank:u}} m/s",
      blanks: [{ id: "a", input: "number", accepted: [a], wrong: "4" }, { id: "u", input: "number", accepted: [u], wrong: "14" }],
      explanation: t`$14 = u + 3a$ and $26 = u + 7a$. Subtracting: $4a = 12$, $a = 3$ m s$^{-2}$, then $u = 14 - 9 = 5$ m s$^{-1}$.`,
      hints: ["Write v = u + at for each time and subtract."],
    });
  }

  {
    const r = suvat({ v: 0, a: -1.5, t: 4 });
    chk(r.s, 12);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: "A bus decelerates uniformly at 1.5 m/s² and comes to rest at a bus stop. How far does it travel in the last 4 s before stopping?",
      value: r.s, unit: "m", wrong: [24, 6],
      explanation: t`$v = 0$, $a = -1.5$, $t = 4$: $s = vt - \frac{1}{2}at^2 = 0 + \frac{1}{2}(1.5)(16) = 12$ m. (Or $u = 6$ m s$^{-1}$ and $s = \frac{1}{2}(6 + 0)(4) = 12$ m.) The value 6 is the speed 4 s before stopping.`,
      hints: [t`You know $v$, $a$ and $t$: which equation leaves out $u$?`],
    });
  }

  {
    // A from rest a = 2; B from the same point, from rest 2 s later, a = 4.5
    same(quad.roots(1.25, -9, 9).map((x) => +x.toFixed(9)), [1.2, 6]);
    const T = 6;
    chk(T * T, 2.25 * (T - 2) ** 2);
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: false,
      stem: "Particle A starts from rest at point O and moves along a straight line with acceleration 2 m/s². Two seconds later particle B starts from rest at O and moves along the same line with acceleration 4.5 m/s². Find the time, measured from when A starts, at which B catches up with A.",
      value: T, unit: "s", wrong: [4, 1.2],
      explanation: t`$s_A = t^2$ and $s_B = 2.25(t - 2)^2$. Equal when $t = 1.5(t - 2)$ (both positive), so $t = 6$ s, 36 m from O. The root $t = 1.2$ is before B starts and is rejected; 4 is B's own time of motion.`,
      workedSolution: steps(
        t`$s_A = \frac{1}{2}(2)t^2 = t^2$.`,
        t`B moves for $t - 2$ seconds: $s_B = \frac{1}{2}(4.5)(t - 2)^2 = 2.25(t - 2)^2$.`,
        t`$t^2 = 2.25(t - 2)^2$ gives $t = 1.5(t - 2)$ for $t > 2$.`,
        t`$t = 1.5t - 3$, so $t = 6$ s.`,
      ),
      hints: ["Measure both times from when A starts: B has been moving for (t − 2) s.", "Reject a time before B starts."],
    });
  }

  {
    const T = (7 + sqrt(49 + 4 * 4.9 * 28)) / 9.8;
    chk(7 * T - 4.9 * T * T, -28, 1e-9);
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: "Tatenda stands at the edge of a cliff above Lake Kariba and throws a stone vertically upwards at 7 m/s from a point 28 m above the water. Take g = 9.8 m/s². Find the time the stone takes to reach the water, correct to 3 significant figures.",
      value: T, unit: "s", wrong: [sqrt(28 / 4.9), (-7 + sqrt(49 + 548.8)) / 9.8],
      explanation: t`Upwards positive: $s = -28$, $u = 7$, $a = -9.8$. $-28 = 7t - 4.9t^2$ gives $4.9t^2 - 7t - 28 = 0$, so $t = \frac{7 + \sqrt{597.8}}{9.8} = 3.21$ s. Taking $s = +28$ or ignoring the upward throw gives a wrong time.`,
      hints: ["The water is below the start, so s = −28 with upwards positive.", "Solve the quadratic and take the positive root."],
    });
  }

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: "A ball thrown vertically upwards is at its highest point. Which statement is correct at that instant?",
    options: [
      [t`$v = 0$ and $a = -g$`, "Correct: it stops for an instant, but gravity still accelerates it downwards."],
      [t`$v = 0$ and $a = 0$`, "If a were 0 the ball would stay at the top; gravity still acts."],
      [t`$v = -g$ and $a = 0$`, "g is an acceleration, not a velocity, and the acceleration is not zero."],
      [t`$v$ is greatest and $a = -g$`, "The speed is least (zero) at the top, not greatest."],
    ],
    answer: "A",
    explanation: "At the top the velocity changes from positive to negative, so it is zero for an instant. The acceleration is −g throughout the flight.",
    hints: ["What force acts on the ball at the top?"],
  });

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: "You know the initial velocity, the final velocity and the displacement of a particle moving with constant acceleration, and you want the time taken. Which equation gives the time directly?",
    options: [
      [t`$s = \frac{1}{2}(u + v)t$`, "Correct: it contains u, v, s and t, and leaves out the unknown a."],
      [t`$v = u + at$`, "This needs a, which you do not know yet."],
      [t`$v^2 = u^2 + 2as$`, "This contains no t at all."],
      [t`$s = ut + \frac{1}{2}at^2$`, "This needs a, which you do not know yet."],
    ],
    answer: "A",
    explanation: t`Known $u$, $v$, $s$; wanted $t$; the quantity not involved is $a$. The equation without $a$ is $s = \frac{1}{2}(u + v)t$.`,
    hints: ["Which of the five quantities is neither known nor wanted?"],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each equation of motion with the quantity it does not contain.",
    pairs: [
      [t`$v = u + at$`, t`$s$`],
      [t`$v^2 = u^2 + 2as$`, t`$t$`],
      [t`$s = \frac{1}{2}(u + v)t$`, t`$a$`],
      [t`$s = ut + \frac{1}{2}at^2$`, t`$v$`],
      [t`$s = vt - \frac{1}{2}at^2$`, t`$u$`],
    ],
    explanation: "Each of the five equations leaves out exactly one of u, v, a, s and t; pick the one without the quantity you neither know nor need.",
  });

  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 3,
    stem: t`A particle moves with constant acceleration $a$ from velocity $u$ to velocity $v$ in time $t$. Starting from $v = u + at$ and $s = \frac{1}{2}(u + v)t$, show that $s = ut + \frac{1}{2}at^2$.`,
    points: [
      t`M1 substitutes $v = u + at$ into $s = \frac{1}{2}(u + v)t$.`,
      t`M1 obtains $s = \frac{1}{2}(2u + at)t$.`,
      t`A1 expands to $s = ut + \frac{1}{2}at^2$ with no errors.`,
    ],
    modelAnswer: t`$$
s = \tfrac{1}{2}(u + v)t
$$

$$
= \tfrac{1}{2}(u + u + at)t
$$

$$
= \tfrac{1}{2}(2u + at)t = ut + \tfrac{1}{2}at^2
$$`,
    explanation: "Eliminate v by substitution and expand.",
    hints: ["Replace v with u + at."],
  });

  {
    const H = 12.6 ** 2 / (2 * 9.8) + 1.6;
    chk(H, 9.7, 1e-9);
    const tTop = 12.6 / 9.8;
    const tG = (12.6 + sqrt(12.6 ** 2 + 4 * 4.9 * 1.6)) / 9.8;
    chk(12.6 * tG - 4.9 * tG * tG, -1.6, 1e-9);
    const vG = sqrt(12.6 ** 2 + 2 * 9.8 * 1.6);
    chk(vG, 9.8 * tG - 12.6, 1e-9);
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
      stem: "Farai throws a ball vertically upwards at 12.6 m/s from a point 1.6 m above the ground. Take g = 9.8 m/s² and ignore air resistance.",
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Find the greatest height of the ball above the ground.", value: H, unit: "m", wrong: [8.1],
          explanation: t`$0 = 12.6^2 - 2(9.8)s$ gives $s = 8.1$ m above the hand, so $8.1 + 1.6 = 9.7$ m above the ground.` }),
        P.num({ label: "(b)", marks: 1, stem: "Find the time taken to reach this height, correct to 3 significant figures.", value: tTop, unit: "s", wrong: [9.8 / 12.6],
          explanation: t`$0 = 12.6 - 9.8t$ gives $t = 1.29$ s.` }),
        P.num({ label: "(c)", marks: 3, stem: "Find the time from the throw until the ball hits the ground, correct to 3 significant figures.", value: tG, unit: "s", wrong: [2 * tTop],
          explanation: t`$-1.6 = 12.6t - 4.9t^2$, so $4.9t^2 - 12.6t - 1.6 = 0$ and $t = \frac{12.6 + \sqrt{190.12}}{9.8} = 2.69$ s. Doubling the time to the top (2.57 s) only brings it back to the hand.` }),
        P.num({ label: "(d)", marks: 1, stem: "Find the speed with which the ball hits the ground, correct to 3 significant figures.", value: vG, unit: "m/s", wrong: [12.6],
          explanation: t`$v^2 = 12.6^2 + 2(9.8)(1.6) = 190.12$, so the speed is $13.8$ m s$^{-1}$.` }),
      ],
      explanation: "Take upwards as positive with a = −9.8 throughout; the ground is 1.6 m below the point of projection, so s = −1.6 there.",
      hints: ["At the top, v = 0.", "When the ball hits the ground, s = −1.6."],
    });
  }

  {
    // car from rest a = 2.5 as kombi passes at 15 m/s
    const tEq = 15 / 2.5;
    const gap = 15 * tEq - 1.25 * tEq ** 2;
    same(quad.roots(1.25, -15, 0), [0, 12]);
    chk(gap, 45);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
      stem: "A car is waiting at a roadblock on the Harare–Mutare road. At the instant a kombi passes it at a constant 15 m/s, the car starts from rest and accelerates uniformly at 2.5 m/s² in the same direction.",
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Find the time at which the car and the kombi have the same speed.", value: tEq, unit: "s", wrong: [12],
          explanation: t`$2.5t = 15$ gives $t = 6$ s.` }),
        P.num({ label: "(b)", marks: 3, stem: "Find the greatest distance between the kombi and the car before the car catches up.", value: gap, unit: "m", wrong: [90, 180],
          explanation: t`The kombi pulls away while it is faster, so the gap is greatest at $t = 6$: $15(6) - 1.25(6^2) = 90 - 45 = 45$ m.` }),
        P.num({ label: "(c)", marks: 2, stem: "Find the time at which the car overtakes the kombi.", value: 12, unit: "s", wrong: [6],
          explanation: t`$1.25t^2 = 15t$ gives $t = 0$ or $t = 12$ s.` }),
        P.num({ label: "(d)", marks: 1, stem: "How far from the roadblock does this happen?", value: 15 * 12, unit: "m", wrong: [90],
          explanation: t`$15 \times 12 = 180$ m.` }),
        P.num({ label: "(e)", marks: 1, stem: "Find the speed of the car at that moment.", value: 2.5 * 12, unit: "m/s", wrong: [15],
          explanation: t`$v = 2.5 \times 12 = 30$ m s$^{-1}$.` }),
      ],
      explanation: "Write both displacements from the roadblock in terms of the same t. The gap grows while the kombi is faster and is greatest when the speeds are equal; the car overtakes when the displacements are equal.",
      hints: ["The gap stops growing when the two speeds are equal.", "Overtaking: equal displacements from the roadblock."],
    });
  }

  b.card("FORMULA", "Equation without s", t`$v = u + at$`);
  b.card("FORMULA", "Equation without v", t`$s = ut + \tfrac{1}{2}at^2$`);
  b.card("FORMULA", "Equation without t", t`$v^2 = u^2 + 2as$`);
  b.card("FORMULA", "Equation without a", t`$s = \tfrac{1}{2}(u + v)t$`);
  b.card("FORMULA", "Equation without u", t`$s = vt - \tfrac{1}{2}at^2$`);
  b.card("CONCEPT", "Vertical motion, upwards positive", t`$a = -g$ for the whole flight. At the top $v = 0$; back at the start $s = 0$; below the start $s < 0$.`);
  b.card("FACT", "Converting km/h to m/s", "Divide by 3.6 (multiply by 1000 and divide by 3600). 72 km/h = 20 m/s.");
  b.card("CONCEPT", "Overtaking problems", "Write both displacements from the same point in terms of the same time; set them equal. A particle starting k seconds later moves for (t − k) s.");
  b.card("FACT", "When the equations of motion apply", "Only when the acceleration is constant. Split a journey into stages otherwise.");
});
