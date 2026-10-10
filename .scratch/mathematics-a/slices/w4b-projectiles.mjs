// W4b: amaths.projectiles.motion (ZIMSEC only: Mechanics F5 6.5)
import { concept, P, t, chk, rad, deg, quad } from "../lib.mjs";
import { f3, f4, fd, NB, NBd, CB } from "../tables/w4b-kit.mjs";

const { sin, cos, atan, sqrt, hypot } = Math;
const S = (x) => sin(rad(x));
const C = (x) => cos(rad(x));

concept("amaths.projectiles.motion", { file: "projectiles/motion", keyPrefix: "projectiles.motion" }, (b) => {
  // q01
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "A ball is thrown into the air and moves freely under gravity, with air resistance ignored. What is its acceleration at the highest point of its path?",
    options: [
      [t`$g$ vertically downwards`, "Correct: gravity is the only force throughout the flight, so the acceleration is g downwards at every point, including the top."],
      ["zero", "At the top the VERTICAL VELOCITY is zero, but the velocity is still changing, so the acceleration is not zero."],
      [t`$g$ in the direction of motion`, "At the top the ball moves horizontally, but gravity still pulls vertically down."],
      ["less than g, because the ball has slowed down", "The acceleration does not depend on the speed; it is g downwards throughout."],
    ],
    answer: "A",
    explanation: t`A projectile's only force is its weight, so its acceleration is $g$ vertically downwards at all times. At the highest point $\dot{y} = 0$ but $\ddot{y} = -g$.`,
  });

  // q02
  b.tf({
    d: 1, skill: "RECALL", calculator: false,
    stem: "In the projectile model, the horizontal component of the velocity stays constant throughout the flight.",
    answer: true,
    explanation: t`No force acts horizontally (air resistance is ignored), so the horizontal acceleration is zero and $\dot{x} = u\cos\alpha$ throughout.`,
  });

  // q03 components of 18 m/s at 32°
  const ux3 = 18 * C(32), uy3 = 18 * S(32);
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: t`A particle is projected with speed $18$ m s$^{-1}$ at $32°$ above the horizontal. Which pair gives the horizontal and vertical components of its initial velocity, correct to 3 significant figures?`,
    options: [
      [t`$${f3(ux3)}$ and $${f3(uy3)}$ m s$^{-1}$`, t`Correct: horizontal $18\cos 32°$, vertical $18\sin 32°$.`],
      [t`$${f3(uy3)}$ and $${f3(ux3)}$ m s$^{-1}$`, t`These are swapped: the horizontal component is next to the $32°$ angle, so it uses cosine.`],
      [t`$9$ and $9$ m s$^{-1}$`, "Halving the speed is not how a velocity is resolved."],
      [t`$${f3(18 / C(32))}$ and $${f3(18 / S(32))}$ m s$^{-1}$`, "Dividing by cos and sin gives values larger than the speed itself, which a component cannot be."],
    ],
    answer: "A",
    explanation: t`$u\cos\alpha = 18\cos 32° = ${f3(ux3)}$ m s$^{-1}$; $u\sin\alpha = 18\sin 32° = ${f3(uy3)}$ m s$^{-1}$.`,
  });

  // q04 greatest height 22 m/s at 55°, g = 9.8
  const H4 = (22 * S(55)) ** 2 / (2 * 9.8);
  b.num({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: t`A ball is projected from ground level with speed $22$ m s$^{-1}$ at $55°$ above the horizontal. Take $g = 9.8$ m s$^{-2}$. Find the greatest height it reaches, in metres correct to 3 significant figures.`,
    value: H4, unit: "m", wrong: [f3((22 * C(55)) ** 2 / 19.6), f3((22 * S(55)) ** 2 / 9.8)],
    explanation: t`At the top $\dot{y} = 0$: $0 = (22\sin 55°)^2 - 2(9.8)H$, so $H = \frac{(${f4(22 * S(55))})^2}{19.6} = ${f3(H4)}$ m. (Using $\cos 55°$ gives $${f3((22 * C(55)) ** 2 / 19.6)}$ m; forgetting the 2 in $2gH$ doubles the answer.)`,
  });

  // q05 T and R, 16 m/s at 28°, g = 10
  const T5 = (2 * 16 * S(28)) / 10;
  const R5 = (16 * 16 * S(56)) / 10;
  chk(R5, 16 * C(28) * T5, 1e-9);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A particle is projected from a point on horizontal ground with speed $16$ m s$^{-1}$ at $28°$ above the horizontal. Take $g = 10$ m s$^{-2}$. Find the time of flight and the range, each correct to 3 significant figures.`,
    template: "Time of flight = {{blank:t}} s, range = {{blank:r}} m",
    blanks: [NB("t", T5, f3(T5 / 2)), NB("r", R5, f3(R5 / 2))],
    explanation: t`Vertically: $y = 16\sin 28°\,t - 5t^2 = 0$ gives $t = \frac{2 \times 16\sin 28°}{10} = ${f3(T5)}$ s. Horizontally: $R = 16\cos 28° \times ${f4(T5)} = ${f3(R5)}$ m (or $R = \frac{16^2\sin 56°}{10}$). ($${f3(T5 / 2)}$ s is the time to the highest point only.)`,
    hints: ["Set the vertical displacement to zero and solve for t.", "Range = horizontal velocity × time of flight."],
  });

  // q06 horizontal projection from 35 m at 9 m/s
  const t6 = sqrt((2 * 38) / 9.8);
  const x6 = 9 * t6;
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A stone is thrown horizontally with speed $9$ m s$^{-1}$ from the top of a vertical cliff $38$ m above the sea. Take $g = 9.8$ m s$^{-2}$. How far from the foot of the cliff does the stone hit the sea? Give your answer in metres correct to 3 significant figures.`,
    value: x6, unit: "m", wrong: [f3(9 * sqrt(38 / 9.8)), f3(9 * (38 / 9.8))],
    explanation: t`Vertically (down positive), $u_y = 0$: $38 = 4.9t^2$, so $t = ${f4(t6)}$ s. Horizontally: $x = 9 \times ${f4(t6)} = ${f3(x6)}$ m. (Using $38 = 9.8t^2$ drops the $\frac{1}{2}$.)`,
    workedSolution: t`1. Thrown horizontally, so the initial vertical velocity is 0.
2. $s = ut + \frac{1}{2}at^2$ vertically: $38 = 0 + 4.9t^2$, $t = ${f4(t6)}$ s.
3. Horizontal distance $= 9 \times ${f4(t6)} = ${f3(x6)}$ m.`,
    hints: ["The initial vertical velocity is zero.", "Find the time from the vertical motion first."],
  });

  // q07 velocity at t = 2.5 s, 24 m/s at 50°
  const ux7 = 24 * C(50), vy7 = 24 * S(50) - 9.8 * 2.5;
  const sp7 = hypot(ux7, vy7), an7 = deg(atan(-vy7 / ux7));
  chk(vy7 < 0 ? 1 : 0, 1);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A particle is projected with speed $24$ m s$^{-1}$ at $50°$ above the horizontal. Take $g = 9.8$ m s$^{-2}$. Find its speed $2.5$ s after projection (3 significant figures) and the angle its direction of motion makes with the horizontal (degrees, 1 decimal place), saying whether it is above or below the horizontal.`,
    template: "Speed = {{blank:v}} m/s, angle = {{blank:a}}° {{blank:s}} the horizontal",
    blanks: [NB("v", sp7, f3(hypot(ux7, 24 * S(50) + 24.5))), NBd("a", an7, 1, fd(90 - an7, 1)), CB("s", ["above", "below"], "below")],
    explanation: t`$\dot{x} = 24\cos 50° = ${f3(ux7)}$ m s$^{-1}$; $\dot{y} = 24\sin 50° - 9.8(2.5) = ${f3(vy7)}$ m s$^{-1}$, negative, so the particle is already falling. Speed $= \sqrt{${f4(ux7)}^2 + ${f4(-vy7)}^2} = ${f3(sp7)}$ m s$^{-1}$; angle $= \tan^{-1}\frac{${f4(-vy7)}}{${f4(ux7)}} = ${fd(an7, 1)}°$ **below** the horizontal.`,
    hints: ["Find both velocity components at t = 2.5 s.", "The sign of the vertical component tells you above or below."],
  });

  // q08 same range
  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`A particle projected from level ground at $25°$ to the horizontal has range $R$. At which other angle of projection, with the same speed, is the range also $R$?`,
    options: [
      [t`$65°$`, t`Correct: $\sin 2(65°) = \sin 130° = \sin 50° = \sin 2(25°)$; complementary angles give equal ranges.`],
      [t`$50°$`, t`Doubling the angle does not keep $\sin 2\alpha$ the same: $\sin 100° \ne \sin 50°$.`],
      [t`$45°$`, t`$45°$ gives the maximum range, which is larger than $R$.`],
      [t`$155°$`, t`This aims backwards ($180° - 25°$); the angle of projection must be between $0°$ and $90°$.`],
    ],
    answer: "A",
    explanation: t`$R = \frac{u^2\sin 2\alpha}{g}$ and $\sin 2\alpha = \sin(180° - 2\alpha) = \sin 2(90° - \alpha)$, so $\alpha$ and $90° - \alpha$ give the same range.`,
  });

  // q09 max range 21 m/s
  const Rm9 = 21 * 21 / 9.8;
  chk(Rm9, 45, 1e-9);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Thandeka can throw a ball with speed $21$ m s$^{-1}$. Taking $g = 9.8$ m s$^{-2}$ and ignoring air resistance and her height, what is the greatest horizontal distance she can throw it on level ground?`,
    value: Rm9, unit: "m", wrong: [22.5, 90],
    explanation: t`The maximum range is $\frac{u^2}{g}$ at $45°$: $\frac{441}{9.8} = 45$ m. ($22.5$ m uses $\frac{u^2}{2g}$, the greatest height of a vertical throw.)`,
  });

  // q10
  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "If the speed of projection is doubled, with the angle unchanged, the range on level ground doubles.",
    answer: false,
    explanation: t`$R = \frac{u^2\sin 2\alpha}{g}$ is proportional to $u^2$, so doubling $u$ multiplies the range by **4**. (The time of flight doubles and the horizontal speed doubles.)`,
  });

  // q11 trajectory form, u = 20, α = 45°, g = 10 → y = x − x²/40
  const k11 = (2 * 400 * 0.5) / 10;
  chk(k11, 40, 1e-9);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`A particle is projected from the origin with speed $20$ m s$^{-1}$ at $45°$ above the horizontal. Take $g = 10$ m s$^{-2}$, with $x$ and $y$ the horizontal and vertical displacements in metres. The equation of its path is $y = x - \frac{x^2}{k}$. Find $k$, and the range on the horizontal through the origin.`,
    template: "k = {{blank:k}}, range = {{blank:r}} m",
    blanks: [NB("k", 40, 80), NB("r", 40, 20)],
    explanation: t`$y = x\tan\alpha - \frac{gx^2}{2u^2\cos^2\alpha} = x - \frac{10x^2}{2(400)(0.5)} = x - \frac{x^2}{40}$, so $k = 40$. Range: $y = 0$ gives $x(1 - \frac{x}{40}) = 0$, so $x = 40$ m (check: $\frac{u^2}{g} = 40$ m at $45°$).`,
    hints: [t`$\cos^2 45° = \frac{1}{2}$.`, "Set y = 0 for the range."],
  });

  // q12 two angles: u = 35, target (90, 15), g = 9.8
  const k12 = (9.8 * 90 * 90) / (2 * 35 * 35);
  chk(k12, 32.4, 1e-9);
  const tr12 = quad.roots(k12, -90, k12 + 15);
  const a12 = tr12.map((T) => deg(atan(T)));
  for (const T of tr12) chk(90 * T - k12 * (1 + T * T), 15, 1e-9);
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`A water cannon at ground level fires water at $35$ m s$^{-1}$. The water must reach a point $90$ m away horizontally and $15$ m above the nozzle. Take $g = 9.8$ m s$^{-2}$ and model the water as a projectile. Find the two possible angles of projection, in degrees correct to 1 decimal place (smaller first).`,
    template: "α = {{blank:a}}° or α = {{blank:b}}°",
    blanks: [NBd("a", a12[0], 1, fd(90 - a12[1], 1)), NBd("b", a12[1], 1, fd(90 - a12[0], 1))],
    explanation: t`The trajectory $y = x\tan\alpha - \frac{gx^2}{2u^2}(1 + \tan^2\alpha)$ with $x = 90$, $y = 15$, $u = 35$: $\frac{9.8 \times 8100}{2450} = 32.4$, so $15 = 90\tan\alpha - 32.4 - 32.4\tan^2\alpha$, i.e. $32.4\tan^2\alpha - 90\tan\alpha + 47.4 = 0$. Then $\tan\alpha = ${f4(tr12[0])}$ or $${f4(tr12[1])}$, giving $\alpha = ${fd(a12[0], 1)}°$ or $${fd(a12[1], 1)}°$. (The two angles are not complementary here, because the target is above the launch level.)`,
    hints: [t`Use $\sec^2\alpha = 1 + \tan^2\alpha$ to get a quadratic in $\tan\alpha$.`, "Solve with the quadratic formula; both roots are valid."],
  });

  // q13 from a cliff, projected upwards
  const t13 = Math.max(...quad.roots(-4.9, 15 * S(30), 46));
  const x13 = 15 * C(30) * t13;
  chk(15 * S(30) * t13 - 4.9 * t13 * t13, -46, 1e-9);
  b.calc({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`A stone is thrown from the top of a vertical cliff $46$ m above a beach of Lake Kariba, with speed $15$ m s$^{-1}$ at $30°$ ABOVE the horizontal. Take $g = 9.8$ m s$^{-2}$. Find the horizontal distance from the foot of the cliff to the point where the stone lands, correct to 3 significant figures.`,
    value: x13, unit: "m", wrong: [f3((225 * S(60)) / 9.8)],
    explanation: t`With up positive, landing means $y = -46$: $-46 = 7.5t - 4.9t^2$, i.e. $4.9t^2 - 7.5t - 46 = 0$, so $t = ${f4(t13)}$ s (the positive root). Horizontally: $x = 15\cos 30° \times ${f4(t13)} = ${f3(x13)}$ m. (The level-ground formula $\frac{u^2\sin 2\alpha}{g}$ gives $${f3((225 * S(60)) / 9.8)}$ m, ignoring the drop below the cliff top.)`,
    workedSolution: t`1. $u_x = 15\cos 30° = ${f4(15 * C(30))}$ m s$^{-1}$; $u_y = 15\sin 30° = 7.5$ m s$^{-1}$.
2. Vertically: $-46 = 7.5t - 4.9t^2 \Rightarrow 4.9t^2 - 7.5t - 46 = 0$.
3. $t = \frac{7.5 + \sqrt{56.25 + 901.6}}{9.8} = ${f4(t13)}$ s.
4. $x = ${f4(15 * C(30))} \times ${f4(t13)} = ${f3(x13)}$ m.`,
    hints: ["The stone lands 46 m BELOW its starting point.", "Solve the quadratic for t and keep the positive root."],
  });

  // q14 match
  b.match({
    d: 2, skill: "RECALL", calculator: false,
    stem: t`A particle is projected from level ground with speed $u$ at angle $\alpha$ above the horizontal. Match each quantity with its formula.`,
    pairs: [
      ["Time of flight", t`$\dfrac{2u\sin\alpha}{g}$`],
      ["Greatest height", t`$\dfrac{u^2\sin^2\alpha}{2g}$`],
      ["Range", t`$\dfrac{u^2\sin 2\alpha}{g}$`],
      ["Time to the highest point", t`$\dfrac{u\sin\alpha}{g}$`],
    ],
    explanation: "All four come from the vertical equations (dy/dt = 0 at the top, y = 0 on landing) together with x = (u cos α)t.",
  });

  // q15 proof: range formula and maximum range
  b.proof({
    d: 3, skill: "ANALYSIS", calculator: false, marks: 5,
    stem: t`A particle is projected from a point $O$ on horizontal ground with speed $u$ at an angle $\alpha$ above the horizontal. Derive the formula $R = \dfrac{u^2\sin 2\alpha}{g}$ for its range, and deduce the maximum range and the angle that gives it.`,
    points: [
      "M1 writes y = (u sin α)t − ½gt² and sets y = 0.",
      "A1 obtains the time of flight T = 2u sin α / g (rejecting t = 0).",
      "M1 uses R = (u cos α) × T.",
      "A1 uses 2 sin α cos α = sin 2α to reach R = u² sin 2α / g.",
      "B1 states the maximum range u²/g when sin 2α = 1, i.e. α = 45°.",
    ],
    modelAnswer: t`Vertically:
$$
y = (u\sin\alpha)t - \tfrac{1}{2}gt^2 = t\left(u\sin\alpha - \tfrac{1}{2}gt\right)
$$
$y = 0$ when $t = 0$ (launch) or $t = \dfrac{2u\sin\alpha}{g}$ (landing). Horizontally:
$$
R = (u\cos\alpha) \times \frac{2u\sin\alpha}{g} = \frac{u^2(2\sin\alpha\cos\alpha)}{g} = \frac{u^2\sin 2\alpha}{g}
$$
Since $\sin 2\alpha \le 1$, the maximum range is $\dfrac{u^2}{g}$, when $2\alpha = 90°$, i.e. $\alpha = 45°$.`,
    explanation: "A derivation starts from the equations of motion and states each identity used.",
    hints: ["Find the time of flight from y = 0 first."],
  });

  // q16 speed at the top
  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`A particle is projected with speed $u$ at angle $\alpha$ above the horizontal. What is its speed at the highest point of its path?`,
    options: [
      [t`$u\cos\alpha$`, "Correct: at the top the vertical component is zero and the horizontal component is unchanged."],
      ["0", "Only the vertical component is zero at the top; the particle is still moving horizontally."],
      [t`$u\sin\alpha$`, "This is the initial vertical component, which has fallen to zero at the top."],
      [t`$u$`, "The particle has lost all its vertical velocity, so it moves more slowly than at launch."],
    ],
    answer: "A",
    explanation: t`At the top $\dot{y} = 0$ and $\dot{x} = u\cos\alpha$, so the speed is $u\cos\alpha$; this is the least speed during the flight.`,
    hints: ["Which velocity component is zero at the top?"],
  });

  // q17 assumptions
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: "State two modelling assumptions made when a cricket ball is treated as a projectile, and say how each affects the predicted range.",
    points: [
      "The ball is a particle (no size, no spin); spin can make it swerve or dip in reality.",
      "Air resistance is ignored (only gravity acts); in reality the range is shorter than predicted.",
    ],
    modelAnswer: "The ball is modelled as a particle, so its spin and size are ignored (spin could make it swerve). Air resistance is ignored, so only its weight acts; real air resistance slows the ball and the real range is less than the model predicts. (Also: g is constant.)",
    explanation: "Name the assumption and its effect on the prediction.",
  });

  // q18 struct 5: from a height of 1.5 m
  const uy18 = 16 * S(35), ux18 = 16 * C(35);
  const H18 = 1.5 + (uy18 * uy18) / 19.6;
  const tl18 = (uy18 + sqrt(uy18 * uy18 + 2 * 9.8 * 1.5)) / 9.8;
  const x18 = ux18 * tl18;
  chk(uy18 * tl18 - 4.9 * tl18 * tl18, -1.5, 1e-9);
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, calculator: true,
    stem: t`Tatenda throws a ball from a point $1.5$ m above horizontal ground with speed $16$ m s$^{-1}$ at $35°$ above the horizontal. Take $g = 9.8$ m s$^{-2}$.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Find the greatest height of the ball above the ground, correct to 3 significant figures.", value: H18, unit: "m", wrong: [f3(H18 - 1.5)],
        explanation: t`Rise above the launch point: $\frac{(16\sin 35°)^2}{19.6} = ${f3(H18 - 1.5)}$ m; above the ground $${f3(H18)}$ m.` }),
      P.num({ label: "(b)", marks: 3, stem: "Find the horizontal distance the ball travels before hitting the ground, correct to 3 significant figures.", value: x18, unit: "m", wrong: [f3((256 * S(70)) / 9.8)],
        explanation: t`$-1.5 = ${f4(uy18)}t - 4.9t^2$ gives $t = ${f4(tl18)}$ s (positive root); $x = 16\cos 35° \times ${f4(tl18)} = ${f3(x18)}$ m. (The level-ground range $\frac{u^2\sin 70°}{g}$ ignores the 1.5 m drop.)` }),
    ],
    explanation: "Measure heights from the launch point, then add or subtract the launch height.",
    hints: ["The ball lands 1.5 m below its starting point.", "Use the positive root for t."],
  });

  // q19 struct 13: trajectory over a wall (tan α = 4/3, u = 30, g = 10)
  const u19 = 30, sA = 0.8, cA = 0.6, g19 = 10;
  const coef19 = g19 / (2 * u19 * u19 * cA * cA);
  chk(coef19, 5 / 324, 1e-12);
  const y54 = (4 / 3) * 54 - coef19 * 54 * 54;
  chk(y54, 27, 1e-9);
  const R19 = (2 * u19 * sA * u19 * cA) / g19;
  chk(R19, 86.4, 1e-9);
  const vy19 = u19 * sA - g19 * (54 / (u19 * cA));
  chk(vy19, -6, 1e-9);
  const sp19 = hypot(18, 6), an19 = deg(atan(6 / 18));
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`A particle $P$ is projected from a point $O$ on horizontal ground with speed $30$ m s$^{-1}$ at an angle $\alpha$ above the horizontal, where $\tan\alpha = \frac{4}{3}$. Take $g = 10$ m s$^{-2}$. Axes $Ox$ (horizontal) and $Oy$ (vertically up) are in the plane of motion, with distances in metres.`,
    parts: [
      P.proof({ label: "(a)", marks: 4, stem: t`Show that the equation of the path of $P$ is $y = \dfrac{4x}{3} - \dfrac{5x^2}{324}$.`,
        points: ["B1 uses cos α = 3/5 and sin α = 4/5, so horizontal and vertical components 18 and 24 m/s.", "M1 writes x = 18t and y = 24t − 5t².", "M1 eliminates t = x/18.", "A1 reaches y = 4x/3 − 5x²/324 with no errors."],
        modelAnswer: t`$\tan\alpha = \frac{4}{3}$ gives $\cos\alpha = \frac{3}{5}$, $\sin\alpha = \frac{4}{5}$, so the components are $18$ and $24$ m s$^{-1}$.
$$
x = 18t, \qquad y = 24t - 5t^2
$$
$$
t = \frac{x}{18} \;\Rightarrow\; y = \frac{24x}{18} - \frac{5x^2}{324} = \frac{4x}{3} - \frac{5x^2}{324}
$$`,
        explanation: "Eliminate t between the horizontal and vertical equations." }),
      P.num({ label: "(b)", marks: 2, stem: "A vertical wall 24 m high stands 54 m from O, in the plane of motion. By how much does P clear the top of the wall?", value: 3, unit: "m", wrong: [27],
        explanation: t`At $x = 54$: $y = 72 - \frac{5 \times 2916}{324} = 72 - 45 = 27$ m, so $P$ clears the wall by $27 - 24 = 3$ m.` }),
      P.num({ label: "(c)", marks: 2, stem: "Assuming P passes over the wall, find the range of P on the horizontal ground.", value: R19, unit: "m", wrong: [43.2],
        explanation: t`$y = 0$: $x\left(\frac{4}{3} - \frac{5x}{324}\right) = 0$, so $x = \frac{4 \times 324}{15} = 86.4$ m. (Check: $\frac{u^2\sin 2\alpha}{g} = \frac{900 \times 0.96}{10} = 86.4$ m.)` }),
      P.group({ label: "(d)", stem: "As P passes over the wall:", parts: [
        P.num({ label: "(i)", marks: 2, stem: "find its speed, correct to 3 significant figures;", value: sp19, unit: "m/s", wrong: [f3(hypot(18, 24))],
          explanation: t`$t = \frac{54}{18} = 3$ s; $\dot{y} = 24 - 30 = -6$ m s$^{-1}$, $\dot{x} = 18$ m s$^{-1}$; speed $= \sqrt{18^2 + 6^2} = ${f3(sp19)}$ m s$^{-1}$.` }),
        P.fib({ label: "(ii)", marks: 3, stem: "find the angle its direction of motion makes with the horizontal, and whether it is rising or falling.",
          template: "angle = {{blank:a}}° (1 d.p.), P is {{blank:s}}",
          blanks: [NBd("a", an19, 1, fd(90 - an19, 1), 2), CB("s", ["rising", "falling"], "falling", 1)],
          explanation: t`$\tan^{-1}\frac{6}{18} = ${fd(an19, 1)}°$ below the horizontal: $\dot{y} < 0$, so $P$ is falling.` }),
      ] }),
    ],
    explanation: "Use exact components 18 and 24 m/s from tan α = 4/3; the trajectory equation answers questions about position, the components answer questions about velocity.",
    hints: [t`A 3-4-5 triangle gives $\sin\alpha$ and $\cos\alpha$.`, "For the velocity at the wall, find the time when x = 54."],
  });

  // ---------------------------------------------------------------- cards
  b.card("DEFINITION", "Projectile", "A particle moving freely under gravity alone (air resistance ignored); acceleration g vertically downwards throughout.");
  b.card("FORMULA", "Projectile equations of motion (speed u, angle α, origin at launch, up positive)", t`$x = (u\cos\alpha)t$, $y = (u\sin\alpha)t - \tfrac{1}{2}gt^2$; $\dot{x} = u\cos\alpha$, $\dot{y} = u\sin\alpha - gt$.`);
  b.card("FORMULA", "Time of flight on level ground", t`$T = \dfrac{2u\sin\alpha}{g}$`);
  b.card("FORMULA", "Greatest height", t`$H = \dfrac{u^2\sin^2\alpha}{2g}$, reached at $t = \dfrac{u\sin\alpha}{g}$.`);
  b.card("FORMULA", "Range on level ground and maximum range", t`$R = \dfrac{u^2\sin 2\alpha}{g}$; maximum $\dfrac{u^2}{g}$ at $\alpha = 45°$.`);
  b.card("FORMULA", "Equation of the trajectory", t`$y = x\tan\alpha - \dfrac{gx^2}{2u^2\cos^2\alpha} = x\tan\alpha - \dfrac{gx^2}{2u^2}(1 + \tan^2\alpha)$, a parabola.`);
  b.card("FACT", "Angles giving equal ranges", t`$\alpha$ and $90° - \alpha$ (same speed, level ground), since $\sin 2\alpha = \sin(180° - 2\alpha)$.`);
  b.card("CONCEPT", "Velocity of a projectile at time t", "Speed √(ẋ² + ẏ²); direction tan⁻¹|ẏ/ẋ| with the horizontal, above if ẏ > 0 (rising), below if ẏ < 0 (falling).");
  b.card("CONCEPT", "Projected from a height h", "Level-ground formulae do not apply: solve y = −h for t (positive root), then x = (u cos α)t.");
});
