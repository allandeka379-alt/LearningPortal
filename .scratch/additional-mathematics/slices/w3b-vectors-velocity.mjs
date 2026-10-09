// W3b: amath.vectors.velocity (Cambridge only)
import { concept, P, t, chk, same, vec, quad, deg, sf } from "../lib.mjs";

const N = (id, x, wrong) => ({ id, input: "number", accepted: [x], wrong });
const { sqrt, asin, atan } = Math;

concept("amath.vectors.velocity", { file: "vectors/velocity", keyPrefix: "vectors.velocity" }, (b) => {
  chk(vec.mag([5, -12]), 13);
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`A particle has velocity $(5\mathbf{i} - 12\mathbf{j})$ m s$^{-1}$. What is its speed?`,
    options: [
      [t`$13$ m s$^{-1}$`, t`Correct: speed $= |\mathbf{v}| = \sqrt{25 + 144} = 13$.`],
      [t`$17$ m s$^{-1}$`, "The components were added; speed is the magnitude, found by Pythagoras."],
      [t`$-7$ m s$^{-1}$`, "The components were added with their signs; a speed is never negative."],
      [t`$7$ m s$^{-1}$`, "The components were subtracted; use Pythagoras."],
    ],
    answer: "A",
    explanation: t`Speed is the magnitude of the velocity: $\sqrt{5^2 + (-12)^2} = 13$ m s$^{-1}$.`,
  });

  chk(vec.mag([9, 12]), 15);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`A ferry on Lake Kariba has velocity $(9\mathbf{i} + 12\mathbf{j})$ km/h. Find its speed.`,
    value: 15, unit: "km/h", wrong: [21, 3],
    explanation: t`Speed $= \sqrt{9^2 + 12^2} = \sqrt{225} = 15$ km/h. Adding the components gives 21.`,
  });

  {
    const r = vec.add([3, -1], vec.scale(4, [2, 5]));
    same(r, [11, 19]);
    b.fib({
      d: 2, skill: "APPLICATION", calculator: false,
      stem: t`A particle starts at the point with position vector $(3\mathbf{i} - \mathbf{j})$ m and moves with constant velocity $(2\mathbf{i} + 5\mathbf{j})$ m s$^{-1}$. Find its position vector after 4 seconds.`,
      template: "r = {{blank:x}} i + {{blank:y}} j",
      blanks: [N("x", 11, "8"), N("y", 19, "20")],
      explanation: t`$\mathbf{r} = \mathbf{r}_0 + t\mathbf{v} = (3\mathbf{i} - \mathbf{j}) + 4(2\mathbf{i} + 5\mathbf{j}) = 11\mathbf{i} + 19\mathbf{j}$. The answer $8\mathbf{i} + 20\mathbf{j}$ forgets the starting position.`,
    });
  }

  {
    const v = vec.scale(20 / 5, [3, -4]);
    same(v, [12, -16]);
    b.fib({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`A canoe moves at 20 km/h in the direction of the vector $3\mathbf{i} - 4\mathbf{j}$. Find its velocity vector.`,
      template: "v = {{blank:x}} i + {{blank:y}} j km/h",
      blanks: [N("x", 12, "60"), N("y", -16, "-80")],
      explanation: t`$|3\mathbf{i} - 4\mathbf{j}| = 5$, so $\mathbf{v} = 20 \times \frac{1}{5}(3\mathbf{i} - 4\mathbf{j}) = 12\mathbf{i} - 16\mathbf{j}$. Multiplying by 20 without dividing by 5 gives a speed of 100 km/h.`,
      hints: ["Velocity = speed × unit vector in the direction of motion."],
    });
  }

  {
    chk(-6 + 3 * 2, 0);
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`At time $t$ hours a boat has position vector $\mathbf{r} = (-6 + 3t)\mathbf{i} + (2 + t)\mathbf{j}$ km relative to a jetty $O$, where $\mathbf{i}$ points east and $\mathbf{j}$ north. Find the time when the boat is due north of $O$.`,
      value: 2, unit: "h", wrong: [-2, 0],
      explanation: t`Due north of $O$ means the east component is 0 (and the north component positive): $-6 + 3t = 0$, so $t = 2$, when $\mathbf{r} = 4\mathbf{j}$. Setting the $\mathbf{j}$ component to 0 (giving $t = -2$) would find when it is due east or west.`,
      hints: ["Due north: no i component."],
    });
  }

  {
    const P1 = (x) => vec.add([2, 5], vec.scale(x, [3, -1]));
    const Q1 = (x) => vec.add([14, -7], vec.scale(x, [-1, 3]));
    same(P1(3), Q1(3));
    same(P1(3), [11, 2]);
    b.fib({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`Two particles have position vectors $\mathbf{r}_P = (2\mathbf{i} + 5\mathbf{j}) + t(3\mathbf{i} - \mathbf{j})$ and $\mathbf{r}_Q = (14\mathbf{i} - 7\mathbf{j}) + t(-\mathbf{i} + 3\mathbf{j})$. They collide. Find the time of the collision and the position vector of the point where it happens.`,
      template: "t = {{blank:t}}; position = {{blank:x}} i + {{blank:y}} j",
      blanks: [N("t", 3, "4"), N("x", 11, "14"), N("y", 2, "-1")],
      explanation: t`$\mathbf{i}$: $2 + 3t = 14 - t$ gives $t = 3$. $\mathbf{j}$ at $t = 3$: $5 - 3 = 2$ and $-7 + 9 = 2$, which agree. Position: $11\mathbf{i} + 2\mathbf{j}$.`,
      hints: ["Equate the i components, then check the j components at that time."],
    });
  }

  {
    const v = [4, 7];
    const ang = deg(atan(7 / 4));
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A particle moves with velocity $(4\mathbf{i} + 7\mathbf{j})$ m s$^{-1}$. Find the angle between its direction of motion and the vector $\mathbf{i}$, correct to 1 decimal place.`,
      value: ang, unit: "°", wrong: [deg(atan(4 / 7)), 90 + deg(atan(4 / 7))],
      explanation: t`$\tan\theta = \frac{7}{4}$, so $\theta = 60.3°$. Using $\frac{4}{7}$ gives the angle with $\mathbf{j}$ (29.7°) instead.`,
      hints: [t`Opposite over adjacent: the $\mathbf{j}$ component over the $\mathbf{i}$ component.`],
    });
    chk(vec.mag(v), sqrt(65));
  }

  {
    // ships: A r = t(6i + 8j), B r = (24i − 4j) + t(−2i + 10j)
    const rel = (x) => vec.sub(vec.add([24, -4], vec.scale(x, [-2, 10])), vec.scale(x, [6, 8]));
    same(rel(0), [24, -4]);
    same(rel(1), [16, -2]);
    chk(vec.mag(rel(2)), 8);
    for (const x of [0.5, 3]) chk(vec.mag(rel(x)) ** 2, 68 * x * x - 400 * x + 592, 1e-9);
    const ts = quad.roots(17, -100, 123);
    for (const x of ts) chk(vec.mag(rel(x)), 10, 1e-9);
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Ship $A$ leaves a harbour $O$ with velocity $(6\mathbf{i} + 8\mathbf{j})$ km/h. At the same moment ship $B$ is at $(24\mathbf{i} - 4\mathbf{j})$ km and moves with velocity $(-2\mathbf{i} + 10\mathbf{j})$ km/h. Find the distance between the ships after 30 minutes, correct to 3 significant figures.`,
      value: vec.mag(rel(0.5)), unit: "km", wrong: [vec.mag(rel(30)), vec.mag(rel(0))],
      explanation: t`$\overrightarrow{AB} = \mathbf{r}_B - \mathbf{r}_A = (24 - 8t)\mathbf{i} + (-4 + 2t)\mathbf{j}$. At $t = 0.5$ h: $20\mathbf{i} - 3\mathbf{j}$, so the distance is $\sqrt{400 + 9} = \sqrt{409} \approx 20.2$ km. Using $t = 30$ (minutes instead of hours) gives a meaningless answer.`,
      hints: ["30 minutes is t = 0.5 hours.", t`Form $\mathbf{r}_B - \mathbf{r}_A$ first.`],
    });

    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: t`Two fishing boats on Lake Kariba move with constant velocities. At time $t$ hours, boat $A$ has position vector $t(6\mathbf{i} + 8\mathbf{j})$ km and boat $B$ has position vector $(24\mathbf{i} - 4\mathbf{j}) + t(-2\mathbf{i} + 10\mathbf{j})$ km, relative to a jetty $O$.`,
      parts: [
        P.fib({ label: "(a)", marks: 2, stem: t`Find $\overrightarrow{AB}$ in terms of $t$, in the form $(p + qt)\mathbf{i} + (r + st)\mathbf{j}$.`, template: "p = {{blank:p}}, q = {{blank:q}}, r = {{blank:r}}, s = {{blank:s}}",
          blanks: [N("p", 24, "-24"), N("q", -8, "4"), N("r", -4, "4"), N("s", 2, "18")],
          explanation: t`$\mathbf{r}_B - \mathbf{r}_A = (24 - 2t - 6t)\mathbf{i} + (-4 + 10t - 8t)\mathbf{j} = (24 - 8t)\mathbf{i} + (-4 + 2t)\mathbf{j}$.` }),
        P.num({ label: "(b)", marks: 1, stem: t`Find the distance between the boats when $t = 2$.`, value: 8, unit: "km", wrong: [vec.mag([8, 8])],
          explanation: t`At $t = 2$: $\overrightarrow{AB} = 8\mathbf{i} + 0\mathbf{j}$, so they are 8 km apart (with $B$ due east of $A$).` }),
        P.proof({ label: "(c)", marks: 1, stem: t`Show that $|\overrightarrow{AB}|^2 = 68t^2 - 400t + 592$.`,
          points: [t`A1 expands $(24 - 8t)^2 + (2t - 4)^2 = 576 - 384t + 64t^2 + 4t^2 - 16t + 16$ and collects terms.`],
          modelAnswer: t`$$
|\overrightarrow{AB}|^2 = (24 - 8t)^2 + (2t - 4)^2 = (576 - 384t + 64t^2) + (4t^2 - 16t + 16) = 68t^2 - 400t + 592
$$`,
          explanation: "Square each component and add." }),
        P.fib({ label: "(d)", marks: 2, stem: t`Find the two times when the boats are 10 km apart, correct to 3 significant figures, in ascending order.`, template: "t = {{blank:a}} h and t = {{blank:b}} h",
          blanks: [
            { id: "a", input: "number", accepted: [String(sf(ts[0], 3))], tolerance: 0.005, wrong: "1" },
            { id: "b", input: "number", accepted: [String(sf(ts[1], 3))], tolerance: 0.005, wrong: "5" },
          ],
          explanation: t`$68t^2 - 400t + 592 = 100$ gives $17t^2 - 100t + 123 = 0$, so $t = \frac{100 \pm \sqrt{1636}}{34}$: $t = 1.75$ h or $t = 4.13$ h.` }),
      ],
      explanation: "Relative position = difference of position vectors; distance = its magnitude; square it to form a quadratic in t.",
      hints: [t`$\overrightarrow{AB} = \mathbf{r}_B - \mathbf{r}_A$.`, "Set the squared distance equal to 100."],
    });
  }

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`A particle moves with constant velocity and its position vector at time $t$ is $\mathbf{r} = \mathbf{r}_0 + t\mathbf{v}$. What does $\mathbf{r}_0$ represent?`,
    options: [
      [t`Its position vector when $t = 0$`, "Correct: substituting t = 0 leaves r = r₀."],
      [t`Its velocity when $t = 0$`, "The velocity is v, the coefficient of t; it is constant."],
      [t`Its displacement after 1 unit of time`, "After 1 unit of time the position is r₀ + v."],
      [t`Its distance from the origin`, "r₀ is a vector; the distance from O at t = 0 would be |r₀|."],
    ],
    answer: "A",
    explanation: t`At $t = 0$, $\mathbf{r} = \mathbf{r}_0$: the starting position. Each unit of time then adds one copy of $\mathbf{v}$.`,
  });

  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`A light aircraft flies with velocity $200\mathbf{i}$ km/h relative to the air, where $\mathbf{i}$ points east and $\mathbf{j}$ north. A wind blows with velocity $30\mathbf{j}$ km/h. What is the velocity of the aircraft relative to the ground?`,
    options: [
      [t`$(200\mathbf{i} + 30\mathbf{j})$ km/h`, "Correct: the resultant velocity is the vector sum of the two velocities."],
      [t`$(200\mathbf{i} - 30\mathbf{j})$ km/h`, "The wind blows towards the north (+j), so it adds +30j."],
      [t`$230\mathbf{i}$ km/h`, "The wind is at right angles to the heading, so its effect is in the j direction, not added to the i component."],
      [t`$170\mathbf{i}$ km/h`, "This treats the wind as a headwind blowing from the east."],
    ],
    answer: "A",
    explanation: t`Velocities add as vectors: $200\mathbf{i} + 30\mathbf{j}$. The ground speed is $\sqrt{200^2 + 30^2} \approx 202$ km/h.`,
  });

  {
    chk(60 / 3, 20);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: "A river is 60 m wide and flows at 2 m/s parallel to its banks. A boat points straight across the river and moves at 3 m/s relative to the water. How long does it take to cross?",
      options: [
        ["20 s", "Correct: only the across component, 3 m/s, carries the boat over the 60 m."],
        ["12 s", "The speeds 3 and 2 were added; the current is at right angles to the crossing."],
        ["30 s", "This uses the current's speed, which only carries the boat downstream."],
        [t`$\frac{60}{\sqrt{13}}$ s`, "The resultant speed √13 is along a slanting path that is longer than 60 m."],
      ],
      answer: "A",
      explanation: t`The current moves the boat parallel to the banks and does not change the across component of its velocity. Time $= \frac{60}{3} = 20$ s (and it lands $2 \times 20 = 40$ m downstream).`,
      hints: ["Which component of the velocity takes the boat across?"],
    });
  }

  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`With $\mathbf{i}$ pointing east and $\mathbf{j}$ north, a boat has velocity $(5\mathbf{i} - 5\mathbf{j})$ km/h. On what bearing is it moving?`,
    options: [
      ["135°", "Correct: equal east and south components point south-east, 135° clockwise from north."],
      ["045°", "That is north-east, for 5i + 5j."],
      ["315°", "That is north-west, for −5i + 5j."],
      ["225°", "That is south-west, for −5i − 5j."],
    ],
    answer: "A",
    explanation: t`The boat moves east and south equally, i.e. south-east. Bearings are measured clockwise from north, so south-east is $135°$.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`If two particles have the same $\mathbf{i}$ component of position at the same time, they must collide.`,
    answer: false,
    explanation: t`False. A collision needs the whole position vectors to be equal at the same time, so the $\mathbf{j}$ components must also agree at that time.`,
  });

  b.tf({
    d: 1, skill: "RECALL", calculator: false,
    stem: "Speed is the magnitude of the velocity vector.",
    answer: true,
    explanation: t`True. If $\mathbf{v} = x\mathbf{i} + y\mathbf{j}$, the speed is $|\mathbf{v}| = \sqrt{x^2 + y^2}$.`,
  });

  {
    for (const [v, s] of [[[3, 4], 5], [[8, -6], 10], [[20, 21], 29], [[-12, -16], 20]]) chk(vec.mag(v), s);
    b.match({
      d: 2, skill: "APPLICATION", calculator: false,
      stem: t`Match each velocity (in m s$^{-1}$) with its speed.`,
      pairs: [
        [t`$3\mathbf{i} + 4\mathbf{j}$`, "5 m/s"],
        [t`$8\mathbf{i} - 6\mathbf{j}$`, "10 m/s"],
        [t`$20\mathbf{i} + 21\mathbf{j}$`, "29 m/s"],
        [t`$-12\mathbf{i} - 16\mathbf{j}$`, "20 m/s"],
      ],
      explanation: t`Speed $= \sqrt{x^2 + y^2}$: $\sqrt{25} = 5$, $\sqrt{100} = 10$, $\sqrt{841} = 29$, $\sqrt{400} = 20$. Negative components still give positive squares.`,
    });
  }

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: t`Explain how to decide whether two particles, with position vectors $\mathbf{r}_P$ and $\mathbf{r}_Q$ given in terms of $t$, collide.`,
    points: [
      t`Equate one pair of components (e.g. the $\mathbf{i}$ components) and solve for $t$.`,
      t`Substitute that value of $t$ into the other components: they collide only if these are also equal (same place at the same time).`,
    ],
    modelAnswer: t`Set the $\mathbf{i}$ components equal and solve for $t$. Then substitute this $t$ into the $\mathbf{j}$ components of both position vectors. If they are equal too, the particles are at the same point at the same time and collide; if not, their paths cross at different times and there is no collision.`,
    explanation: "A collision needs the same place at the same time.",
    hints: ["What must be true of both components at the same instant?"],
  });

  {
    // river 80 m, boat 4 m/s relative to water, current 1.5 m/s
    const w = 80, u = 4, c = 1.5;
    chk(w / u, 20); chk((w / u) * c, 30);
    const alpha = deg(asin(c / u));
    const vres = sqrt(u * u - c * c);
    const tt = w / vres;
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: t`A stretch of the Zambezi is 80 m wide and flows at 1.5 m s$^{-1}$ parallel to its straight banks. Nyasha can paddle her canoe at 4 m s$^{-1}$ relative to the water.`,
      parts: [
        P.fib({ label: "(a)", marks: 2, stem: "She points the canoe straight across the river. Find the time she takes to cross and how far downstream she lands.", template: "time {{blank:t}} s; distance downstream {{blank:d}} m",
          blanks: [N("t", 20, "18.7"), N("d", 30, "28")],
          explanation: t`Across component 4 m s$^{-1}$: time $= \frac{80}{4} = 20$ s. Downstream drift $= 1.5 \times 20 = 30$ m.` }),
        P.num({ label: "(b)", marks: 2, stem: "She now wants to land directly opposite her starting point. Find the angle between the direction in which she must point the canoe and the line straight across the river, correct to 1 decimal place.", value: alpha, unit: "°", wrong: [deg(atan(c / u)), 90 - alpha],
          explanation: t`The upstream component of her paddling must cancel the current: $4\sin\alpha = 1.5$, so $\alpha = \sin^{-1}(0.375) = 22.0°$ upstream of straight across.` }),
        P.num({ label: "(c)", marks: 1, stem: "Find her resultant speed across the river, correct to 3 significant figures.", value: vres, unit: "m/s", wrong: [sqrt(u * u + c * c)],
          explanation: t`$\sqrt{4^2 - 1.5^2} = \sqrt{13.75} = 3.71$ m s$^{-1}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Find the time she now takes to cross, correct to 3 significant figures.", value: tt, unit: "s", wrong: [20, w / sqrt(u * u + c * c)],
          explanation: t`$\frac{80}{3.708} = 21.6$ s: longer than in (a), because part of her effort cancels the current.` }),
      ],
      explanation: "Resolve the paddling velocity into across and upstream components; the crossing time depends only on the component across the river.",
      hints: ["The current does not help or hinder the crossing itself, only the drift.", "To go straight across, the upstream component must equal 1.5."],
    });
  }

  b.card("DEFINITION", "Speed", t`The magnitude of the velocity: $|x\mathbf{i} + y\mathbf{j}| = \sqrt{x^2 + y^2}$.`);
  b.card("FORMULA", "Velocity of given speed and direction", t`$\mathbf{v} = \text{speed} \times \hat{\mathbf{d}}$ (unit vector in the direction).`);
  b.card("FORMULA", "Position with constant velocity", t`$\mathbf{r} = \mathbf{r}_0 + t\mathbf{v}$`);
  b.card("CONCEPT", "Collision", "Same position at the same time: equate i components to find t, then check the j components agree at that t.");
  b.card("CONCEPT", "Distance apart", t`$|\mathbf{r}_Q - \mathbf{r}_P|$; square it to get a quadratic in $t$.`);
  b.card("CONCEPT", "Resultant velocity", "Velocity relative to the medium plus the velocity of the medium (current, wind), added as vectors.");
  b.card("FACT", "River crossing time", "Depends only on the component of velocity straight across the river.");
  b.card("FACT", "Landing directly opposite", "Point upstream so that the upstream component of the boat's velocity cancels the current.");
  b.card("FACT", "Due north / due east", t`Due north of $O$: $\mathbf{i}$ component 0; due east: $\mathbf{j}$ component 0.`);
});
