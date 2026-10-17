// W4a: amaths.kinematics.constant-acceleration
import { concept, P, t, chk, suvat, quad, ZM } from "../lib.mjs";
import { f3, g3, N, S } from "../tables/w4a-kit.mjs";

const { sqrt } = Math;

concept("amaths.kinematics.constant-acceleration", { file: "kinematics/constant-acceleration", keyPrefix: "kinematics.constant-acceleration" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "Which constant-acceleration formula does NOT involve the time t?",
    options: [
      [t`$v^2 = u^2 + 2as$`, "Correct: it links u, v, a and s only."],
      [t`$s = \tfrac{1}{2}(u + v)t$`, "This one leaves out the acceleration a, not t."],
      [t`$v = u + at$`, "This one leaves out the displacement s."],
      [t`$s = vt - \tfrac{1}{2}at^2$`, "This one leaves out the initial velocity u."],
    ],
    answer: "A",
    explanation: "Each suvat formula omits exactly one of s, u, v, a, t; choose the one that omits the quantity you neither know nor want.",
  });

  const q2 = suvat({ u: 12, a: 1.5, t: 8 });
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`A lorry travelling at $12$ m s$^{-1}$ accelerates uniformly at $1.5$ m s$^{-2}$ for $8$ s. Find its speed at the end of this time.`,
    value: q2.v, unit: "m/s", wrong: [12 * 1.5 * 8, 1.5 * 8],
    explanation: t`$v = u + at = 12 + 1.5 \times 8 = ${q2.v}$ m s$^{-1}$.`,
  });

  const q3 = suvat({ u: 32, v: 0, s: 256 });
  chk(q3.a, -2);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`A goods train travelling at $32$ m s$^{-1}$ brakes uniformly and comes to rest in a distance of $256$ m. Find the magnitude of its deceleration.`,
    value: 2, unit: "m/s²", wrong: [4, 0.125],
    explanation: t`$v^2 = u^2 + 2as$: $0 = 32^2 + 2a(256)$, so $a = -\frac{1024}{512} = -2$ m s$^{-2}$, a deceleration of $2$ m s$^{-2}$. (Forgetting the 2 in $2as$ gives 4.)`,
  });

  const q4 = suvat({ u: 0, a: 9.8, t: 3.2 });
  b.num({
    d: 2, skill: "APPLICATION", calculator: true, applies: ZM,
    stem: t`A stone is dropped from rest from a bridge and hits the water $3.2$ s later. Taking $g = 9.8$ m s$^{-2}$ and ignoring air resistance, find the height of the bridge above the water, correct to 3 significant figures.`,
    value: q4.s, unit: "m", wrong: [9.8 * 3.2, 9.8 * 3.2 * 3.2],
    explanation: t`$s = ut + \frac{1}{2}at^2 = 0 + \frac{1}{2}(9.8)(3.2)^2 = ${f3(q4.s)}$ m. (Leaving out the $\frac{1}{2}$ doubles the answer.)`,
  });

  const q5 = suvat({ u: 18, v: 0, a: -10 });
  b.num({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`A ball is thrown vertically upwards with speed $18$ m s$^{-1}$. Taking $g = 10$ m s$^{-2}$, find the greatest height it reaches above the point of projection.`,
    value: q5.s, unit: "m", wrong: [32.4, 1.8],
    explanation: t`At the top $v = 0$: $0 = 18^2 - 2(10)s$, so $s = \frac{324}{20} = ${q5.s}$ m. ($32.4$ m forgets the factor 2.)`,
  });

  const r6 = quad.roots(5, -18, 10);
  const dur6 = r6[1] - r6[0];
  chk(dur6, sqrt(124) / 5);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A ball is thrown vertically upwards with speed $18$ m s$^{-1}$ from ground level. Taking $g = 10$ m s$^{-2}$, find the length of time for which the ball is more than $10$ m above the ground, correct to 3 significant figures.`,
    value: dur6, unit: "s", wrong: [r6[0], r6[1]],
    explanation: t`$10 = 18t - 5t^2 \Rightarrow 5t^2 - 18t + 10 = 0 \Rightarrow t = \frac{18 \pm \sqrt{124}}{10}$, i.e. $t = ${g3(r6[0])}$ s (going up) and $t = ${g3(r6[1])}$ s (coming down). Time above $10$ m: $${f3(dur6)}$ s.`,
    hints: ["Both roots of the quadratic are meaningful here.", "Subtract the smaller time from the larger."],
  });

  const t7 = quad.roots(0.4, 3, -40)[1];
  const v7 = 3 + 0.8 * t7;
  b.fib({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A cyclist passes a marker post at $3$ m s$^{-1}$ and accelerates uniformly at $0.8$ m s$^{-2}$. Find the time she takes to travel the next $40$ m, and her speed at the end of that distance, each correct to 3 significant figures.`,
    template: "Time = {{blank:t}} s, speed = {{blank:v}} m/s",
    blanks: [S("t", t7, "10"), S("v", v7, "11")],
    explanation: t`$40 = 3t + 0.4t^2 \Rightarrow 0.4t^2 + 3t - 40 = 0 \Rightarrow t = \frac{-3 + \sqrt{9 + 64}}{0.8} = ${f3(t7)}$ s (the negative root is rejected). $v = 3 + 0.8t = ${f3(v7)}$ m s$^{-1}$ (check: $v^2 = 9 + 2(0.8)(40) = 73$).`,
    hints: ["Use s = ut + ½at² and solve the quadratic."],
  });
  chk(v7 * v7, 73, 1e-9);

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "At the highest point of its flight, a ball thrown vertically upwards has zero acceleration.",
    answer: false,
    explanation: t`Its **velocity** is zero for an instant, but gravity still acts, so the acceleration is $g$ downwards throughout.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`Ignoring air resistance, a ball thrown vertically upwards with speed $u$ returns to the point of projection with speed $u$.`,
    answer: true,
    explanation: t`When it returns, $s = 0$, so $v^2 = u^2 + 2a(0) = u^2$: the speed is $u$, now directed downwards.`,
  });

  const s10 = 0.5 * (10 + 4) * 3;
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`A cyclist slows uniformly from $10$ m s$^{-1}$ to $4$ m s$^{-1}$ in $3$ s. How far does she travel in this time?`,
    options: [
      [t`$${s10}$ m`, t`Correct: $s = \frac{1}{2}(u + v)t = \frac{1}{2}(14)(3)$.`],
      [t`$30$ m`, "This uses the initial speed for the whole 3 s, ignoring the slowing down."],
      [t`$12$ m`, "This uses the final speed for the whole 3 s."],
      [t`$9$ m`, t`This uses $\frac{1}{2}(v - u)t$, the change in speed, not the mean speed.`],
    ],
    answer: "A",
    explanation: t`With constant acceleration the mean speed is $\frac{u + v}{2} = 7$ m s$^{-1}$, so $s = 7 \times 3 = ${s10}$ m.`,
  });

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`Taking upwards as positive and $g = 10$ m s$^{-2}$, a ball is thrown vertically upwards at $9$ m s$^{-1}$ from a balcony $12$ m above the ground. Which equation gives the time $t$ s for the ball to reach the ground?`,
    options: [
      [t`$-12 = 9t - 5t^2$`, "Correct: the ground is 12 m below the start, so s = −12, and a = −10."],
      [t`$12 = 9t - 5t^2$`, "The ground is below the point of projection, so its displacement is negative."],
      [t`$-12 = 9t + 5t^2$`, "With upwards positive, gravity gives a = −10, so the t² term is −5t²."],
      [t`$12 = 9t + 5t^2$`, "Both the sign of s and the sign of a are wrong for upwards positive."],
    ],
    answer: "A",
    explanation: t`$s = ut + \frac{1}{2}at^2$ with $s = -12$, $u = 9$, $a = -10$.`,
    hints: ["Is the ground above or below the starting point?"],
  });

  const q12 = suvat({ u: 0, a: 2.5, t: 6 });
  const d12 = q12.s + q12.v * 20;
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`A car starts from rest and accelerates uniformly at $2.5$ m s$^{-2}$ for $6$ s. It then travels at the speed reached for a further $20$ s. Find the total distance travelled.`,
    value: d12, unit: "m", wrong: [q12.s, 2.5 * 26 * 26 / 2],
    explanation: t`Stage 1: $s = \frac{1}{2}(2.5)(6^2) = ${q12.s}$ m, and $v = 2.5 \times 6 = ${q12.v}$ m s$^{-1}$. Stage 2 (constant velocity): $${q12.v} \times 20 = ${q12.v * 20}$ m. Total $${d12}$ m. (The formulae cannot be applied to the whole 26 s at once, because the acceleration changes.)`,
    hints: ["Treat each stage separately; the final speed of stage 1 is the speed in stage 2."],
  });

  // A dropped from 45 m, B thrown up at 20 m/s from the ground below, at the same instant
  const tm = 45 / 20;
  const h13 = 45 - 5 * tm * tm;
  chk(20 * tm - 5 * tm * tm, h13);
  b.calc({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`Ball $A$ is released from rest at a height of $45$ m. At the same instant, ball $B$ is thrown vertically upwards at $20$ m s$^{-1}$ from the ground directly below $A$. Taking $g = 10$ m s$^{-2}$, find the height above the ground at which the balls meet, correct to 3 significant figures.`,
    value: h13, unit: "m", wrong: [5 * tm * tm, 22.5],
    explanation: t`Heights above the ground: $h_A = 45 - 5t^2$ and $h_B = 20t - 5t^2$. They meet when $45 - 5t^2 = 20t - 5t^2$, so $t = 2.25$ s. Height: $45 - 5(2.25)^2 = ${f3(h13)}$ m. ($${g3(5 * tm * tm)}$ m is the distance $A$ has fallen.)`,
    hints: ["Measure both heights from the ground, with the same t.", "The t² terms cancel."],
  });

  const q14 = suvat({ u: 4, v: 9, s: 20 });
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A particle moving in a straight line with constant acceleration passes point $A$ with speed $4$ m s$^{-1}$ and point $B$, $20$ m further on, with speed $9$ m s$^{-1}$. Find the time taken to travel from $A$ to $B$, correct to 3 significant figures.`,
    value: q14.t, unit: "s", wrong: [20 / 9, 20 / 4],
    explanation: t`Use the formula without $a$: $20 = \frac{1}{2}(4 + 9)t$, so $t = \frac{40}{13} = ${f3(q14.t)}$ s.`,
    hints: ["Which formula avoids the acceleration?"],
  });

  // 16 m in the first 2 s, 30 m in the next 2 s
  const a15 = 3.5, u15 = 4.5;
  chk(2 * u15 + 2 * a15, 16); chk(4 * u15 + 8 * a15, 46);
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`A particle moves in a straight line with constant acceleration. It travels $16$ m in the first $2$ s of its motion and $30$ m in the next $2$ s. Find its initial speed $u$ and its acceleration $a$.`,
    template: "u = {{blank:u}} m/s, a = {{blank:a}} m/s²",
    blanks: [N("u", u15, "8"), N("a", a15, "7")],
    explanation: t`First 2 s: $16 = 2u + \frac{1}{2}a(4) = 2u + 2a$. First 4 s: $16 + 30 = 46 = 4u + \frac{1}{2}a(16) = 4u + 8a$. From the first, $u = 8 - a$; then $32 - 4a + 8a = 46$, so $a = 3.5$ m s$^{-2}$ and $u = 4.5$ m s$^{-1}$. (Using 30 m as the distance in the first 4 s is the usual slip.)`,
    hints: ["Write equations for the first 2 s and the first 4 s, both from the start.", "The distance in the first 4 s is 16 + 30."],
  });

  const t16 = quad.roots(1, -12, -48)[1];
  chk(t16 * t16, 12 * (t16 + 4));
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`A minibus travelling at a constant $12$ m s$^{-1}$ passes a parked car. Four seconds later the car sets off after it, accelerating uniformly at $2$ m s$^{-2}$. Find how long after setting off the car takes to draw level with the minibus, correct to 3 significant figures.`,
    value: t16, unit: "s", wrong: [12, quad.roots(1, -12, 0)[1] + 4],
    explanation: t`Let $t$ s be the time after the car sets off; the minibus has then been moving for $t + 4$ s past the car's position. Level when $\frac{1}{2}(2)t^2 = 12(t + 4)$: $t^2 - 12t - 48 = 0$, so $t = 6 + \sqrt{84} = ${f3(t16)}$ s.`,
    hints: ["Use one time variable for both vehicles: the minibus has a 4 s start.", "Reject the negative root."],
  });

  b.proof({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 3, applies: ZM,
    stem: t`Starting from $v = u + at$ and $s = \tfrac{1}{2}(u + v)t$, derive the formula $v^2 = u^2 + 2as$.`,
    points: [
      t`M1 makes $t$ the subject of $v = u + at$: $t = \frac{v - u}{a}$.`,
      t`M1 substitutes into $s = \frac{1}{2}(u + v)t$.`,
      t`A1 uses $(v + u)(v - u) = v^2 - u^2$ and rearranges to $v^2 = u^2 + 2as$.`,
    ],
    modelAnswer: t`$$
t = \frac{v - u}{a}
$$
$$
s = \frac{1}{2}(u + v)\cdot\frac{v - u}{a} = \frac{v^2 - u^2}{2a}
$$
$$
2as = v^2 - u^2 \Rightarrow v^2 = u^2 + 2as
$$`,
    explanation: "ZIMSEC expects the constant-acceleration formulae to be derived, from the velocity–time graph or by elimination.",
    hints: ["Eliminate t between the two given formulae."],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each missing quantity with the constant-acceleration formula that does not use it.",
    pairs: [
      ["t is not needed", t`$v^2 = u^2 + 2as$`],
      ["a is not needed", t`$s = \tfrac{1}{2}(u + v)t$`],
      ["v is not needed", t`$s = ut + \tfrac{1}{2}at^2$`],
      ["u is not needed", t`$s = vt - \tfrac{1}{2}at^2$`],
    ],
    explanation: t`The fifth formula, $v = u + at$, is the one without $s$.`,
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "A stone falls freely after being dropped from a cliff, with air resistance ignored. Which quantity stays constant during the fall?",
    options: [
      ["Its acceleration", "Correct: it accelerates at g throughout."],
      ["Its speed", "The speed increases by g every second."],
      ["The distance it falls each second", "Each second it falls further than in the previous second."],
      ["Its velocity", "Velocity changes because there is an acceleration."],
    ],
    answer: "A",
    explanation: "Free fall is motion with constant acceleration g downwards, so the suvat formulae apply.",
  });

  const q22 = suvat({ u: 10, a: -10, t: 1.5 });
  const dist22 = 5 + 0.5 * 10 * 0.5 * 0.5;
  chk(q22.s, 3.75);
  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`A ball is thrown vertically upwards at $10$ m s$^{-1}$. Taking $g = 10$ m s$^{-2}$, what total DISTANCE has it travelled after $1.5$ s?`,
    options: [
      [t`$${dist22}$ m`, t`Correct: it rises $5$ m in $1$ s, then falls $1.25$ m in the next $0.5$ s.`],
      [t`$${q22.s}$ m`, "This is the displacement (height above the start), not the distance travelled."],
      [t`$5$ m`, "This is only the distance travelled on the way up."],
      [t`$11.25$ m`, t`This adds $\frac{1}{2}gt^2$ to $ut$ instead of subtracting it.`],
    ],
    answer: "A",
    explanation: t`The ball stops at $t = 1$ s after rising $\frac{10^2}{20} = 5$ m. In the next $0.5$ s it falls $\frac{1}{2}(10)(0.5)^2 = 1.25$ m. Distance $= 6.25$ m; displacement $= 3.75$ m.`,
    hints: ["Find when the ball changes direction."],
  });

  // Struct 5 (ZM): stone thrown up from a bridge 108 m above water, g = 9.8
  const top19 = 6 / 9.8;
  const v19 = sqrt(36 + 2 * 9.8 * 108);
  const t19 = (6 + v19) / 9.8;
  chk(6 * t19 - 4.9 * t19 * t19, -108, 1e-9);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: true, applies: ZM,
    stem: t`A stone is thrown vertically upwards at $6$ m s$^{-1}$ from a bridge, at a point $108$ m above the water. Take $g = 9.8$ m s$^{-2}$ and ignore air resistance.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Find the time taken to reach the highest point, correct to 3 significant figures.", value: top19, unit: "s", wrong: [9.8 / 6], explanation: t`$0 = 6 - 9.8t$, so $t = ${f3(top19)}$ s.` }),
      P.num({ label: "(b)", marks: 2, stem: "Find the speed of the stone as it hits the water, correct to 3 significant figures.", value: v19, unit: "m/s", wrong: [sqrt(2 * 9.8 * 108)], explanation: t`Downwards positive: $u = -6$, $s = 108$, $a = 9.8$. $v^2 = 36 + 2(9.8)(108) = ${f3(v19 * v19, 5)}$, so $v = ${f3(v19)}$ m s$^{-1}$.` }),
      P.num({ label: "(c)", marks: 2, stem: "Find the time from the throw until the stone hits the water, correct to 3 significant figures.", value: t19, unit: "s", wrong: [v19 / 9.8], explanation: t`$v = u + at$ with downwards positive: $${f3(v19)} = -6 + 9.8t$, so $t = ${f3(t19)}$ s.` }),
    ],
    explanation: "Choose one positive direction for the whole motion; the stone's upward start makes u negative if downwards is positive.",
    hints: ["The motion up and then down is one motion with constant acceleration.", "Use (b) in v = u + at, or solve a quadratic in t."],
  });

  // Struct 12: P thrown up at 25 m/s; 1 s later Q thrown up at 30 m/s from the same point
  const Tm = 4 / 3;
  const hP = (s) => 25 * s - 5 * s * s;
  const hQ = (s) => 30 * s - 5 * s * s;
  chk(hP(Tm + 1), hQ(Tm));
  const vP = 25 - 10 * (Tm + 1), vQ = 30 - 10 * Tm;
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`A particle $P$ is projected vertically upwards from a point $O$ on the ground with speed $25$ m s$^{-1}$. One second later a second particle $Q$ is projected vertically upwards from $O$ with speed $30$ m s$^{-1}$. Take $g = 10$ m s$^{-2}$.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Find the exact greatest height of P above O.", value: 31.25, dp: 2, unit: "m", wrong: [62.5], explanation: t`$0 = 25^2 - 20h$, so $h = 31.25$ m.` }),
      P.proof({ label: "(b)", marks: 3, stem: t`Show that $P$ and $Q$ are at the same height when $Q$ has been moving for $\frac{4}{3}$ s.`,
        points: [t`M1 height of $P$ after $Q$ has moved for $T$ s: $25(T + 1) - 5(T + 1)^2$.`, t`M1 height of $Q$: $30T - 5T^2$, and equates.`, t`A1 simplifies to $15T + 20 = 30T$, so $T = \frac{4}{3}$.`],
        modelAnswer: t`$$
25(T + 1) - 5(T + 1)^2 = 30T - 5T^2
$$
$$
25T + 25 - 5T^2 - 10T - 5 = 30T - 5T^2
$$
$$
15T + 20 = 30T \Rightarrow T = \frac{4}{3}
$$`,
        explanation: "Use one clock (Q's time T); P has been moving 1 s longer." }),
      P.num({ label: "(c)", marks: 2, stem: "Find the height above O at which they meet, correct to 3 significant figures.", value: hQ(Tm), unit: "m", wrong: [hP(Tm)], explanation: t`$h = 30 \times \frac{4}{3} - 5 \times \frac{16}{9} = ${f3(hQ(Tm))}$ m (and $P$: $25 \times \frac{7}{3} - 5 \times \frac{49}{9}$, the same).` }),
      P.fib({ label: "(d)", marks: 2, stem: "Find the velocities of P and Q at that instant, taking upwards as positive, each correct to 3 significant figures.", template: "P: {{blank:p}} m/s, Q: {{blank:q}} m/s",
        blanks: [S("p", vP, f3(-vP)), S("q", vQ, "30")],
        explanation: t`$v_P = 25 - 10 \times \frac{7}{3} = ${f3(vP)}$ m s$^{-1}$ and $v_Q = 30 - 10 \times \frac{4}{3} = ${f3(vQ)}$ m s$^{-1}$.` }),
      P.mcq({ label: "(e)", marks: 1, stem: "At the moment they meet, which statement is true?",
        options: [["Both particles are still moving upwards", "Correct: both velocities are positive."], ["P is moving down and Q up", "P's velocity is still positive (just), so it is still rising."], ["Both particles are moving down", "Q has only been moving for 4/3 s and is still rising fast."], ["P is at rest at its highest point", "P reaches its top at 2.5 s; they meet at 7/3 s."]],
        answer: "A", explanation: "P is close to its highest point (reached at t = 2.5 s) but still rising." }),
      P.num({ label: "(f)", marks: 2, stem: "Find the total time for which P is in the air.", value: 5, unit: "s", wrong: [2.5], explanation: t`$0 = 25t - 5t^2$ gives $t = 5$ s (twice the time to the top).` }),
    ],
    explanation: "Two particles: one equation each, one common time variable, then equate positions.",
    hints: ["Let T be the time Q has been moving; P has been moving for T + 1 s.", "The t² terms cancel when you equate the heights."],
  });

  b.card("FORMULA", "Constant acceleration (no s)", t`$v = u + at$`);
  b.card("FORMULA", "Constant acceleration (no a)", t`$s = \tfrac{1}{2}(u + v)t$`);
  b.card("FORMULA", "Constant acceleration (no v / no u)", t`$s = ut + \tfrac{1}{2}at^2$; $\;s = vt - \tfrac{1}{2}at^2$`);
  b.card("FORMULA", "Constant acceleration (no t)", t`$v^2 = u^2 + 2as$`);
  b.card("CONCEPT", "Choosing a formula", "List s, u, v, a, t; pick the formula that leaves out the quantity you neither know nor want.");
  b.card("FACT", "Vertical motion", t`Acceleration $g$ downwards throughout (Cambridge $g = 10$ m s$^{-2}$); $v = 0$ at the highest point.`);
  b.card("CONCEPT", "Sign convention", "Choose a positive direction first; deceleration, and displacements the other way, are negative.");
  b.card("CONCEPT", "Two moving objects", "Write a position equation for each with the same origin and time variable, then equate positions.");
  b.card("CONCEPT", "Deriving the formulae", t`From the straight-line $v$–$t$ graph: gradient $a = \frac{v - u}{t}$, area $s = \frac{1}{2}(u + v)t$; eliminate to get the rest.`, undefined, { applies: ZM });
});
