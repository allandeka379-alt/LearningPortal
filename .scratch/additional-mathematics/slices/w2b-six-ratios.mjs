// W2b: amath.trig.six-ratios
import { concept, P, t, chk, rad, sec, cosec, cot } from "../lib.mjs";

const S = (d) => Math.sin(rad(d));
const C = (d) => Math.cos(rad(d));
const T = (d) => Math.tan(rad(d));

concept("amath.trig.six-ratios", { file: "trig/six-ratios", keyPrefix: "trig.six-ratios" }, (b) => {
  chk(S(120), Math.sqrt(3) / 2); chk(C(120), -0.5);
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`An angle $\theta$ lies between $90°$ and $180°$. Which statement about its trigonometric functions is true?`,
    options: [
      [t`$\sin\theta > 0$ and $\cos\theta < 0$`, t`Correct: in the second quadrant $y > 0$ and $x < 0$, so sine is positive and cosine negative.`],
      [t`$\sin\theta < 0$ and $\cos\theta > 0$`, "These are the signs in the fourth quadrant (270° to 360°)."],
      [t`$\sin\theta > 0$ and $\tan\theta > 0$`, t`Tangent is negative in the second quadrant because $\tan\theta = \frac{y}{x}$ with $x < 0$.`],
      [t`$\cos\theta > 0$ and $\tan\theta > 0$`, "Both are positive only in the first quadrant."],
    ],
    answer: "A",
    explanation: t`CAST: only sine (and its reciprocal cosec) is positive in the second quadrant. For example $\sin 120° = \frac{\sqrt{3}}{2}$ and $\cos 120° = -\frac{1}{2}$.`,
  });

  chk(T(60), Math.sqrt(3));
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`What is the exact value of $\tan 60°$?`,
    options: [
      [t`$\sqrt{3}$`, t`Correct: $\tan 60° = \frac{\sin 60°}{\cos 60°} = \frac{\sqrt{3}/2}{1/2} = \sqrt{3}$.`],
      [t`$\frac{\sqrt{3}}{3}$`, t`This is $\tan 30°$.`],
      [t`$\frac{\sqrt{3}}{2}$`, t`This is $\sin 60°$.`],
      [t`$\frac{1}{2}$`, t`This is $\cos 60°$.`],
    ],
    answer: "A",
    explanation: t`In the half-equilateral triangle with sides 1, 2 and $\sqrt{3}$, the side opposite $60°$ is $\sqrt{3}$ and the adjacent side is 1, so $\tan 60° = \sqrt{3}$.`,
  });

  chk(C(120), -0.5);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Without a calculator, find the exact value of $\cos 120°$. Give your answer as a fraction or a decimal.`,
    value: -0.5, wrong: [0.5, -Math.sqrt(3) / 2],
    explanation: t`$120°$ is in the second quadrant, related angle $180° - 120° = 60°$, and cosine is negative there: $\cos 120° = -\cos 60° = -\frac{1}{2}$.`,
  });

  chk(S(225), -Math.SQRT1_2);
  b.expr({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Find the exact value of $\sin 225°$. Give a surd, e.g. -√3/2 or -1/√3.`,
    accepted: ["-√2/2", "-1/√2", "-(√2)/2", "-(1/√2)", "-(√2/2)", "-0.5√2", "-½√2"],
    wrong: ["√2/2", "-√3/2"],
    explanation: t`$225°$ is in the third quadrant, related angle $225° - 180° = 45°$, and sine is negative there: $\sin 225° = -\sin 45° = -\frac{\sqrt{2}}{2}$ (equivalently $-\frac{1}{\sqrt{2}}$).`,
  });

  b.tf({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`$\sec\theta = \dfrac{1}{\sin\theta}$`,
    answer: false,
    explanation: t`False. $\sec\theta = \frac{1}{\cos\theta}$; it is $\operatorname{cosec}\theta$ that equals $\frac{1}{\sin\theta}$. Third-letter rule: se**c** goes with **c**os.`,
  });

  b.match({
    d: 2, skill: "RECALL", calculator: false,
    stem: "Match each function with an equivalent expression.",
    pairs: [
      [t`$\sec\theta$`, t`$\dfrac{1}{\cos\theta}$`],
      [t`$\operatorname{cosec}\theta$`, t`$\dfrac{1}{\sin\theta}$`],
      [t`$\cot\theta$`, t`$\dfrac{\cos\theta}{\sin\theta}$`],
      [t`$\tan\theta$`, t`$\dfrac{\sin\theta}{\cos\theta}$`],
    ],
    explanation: t`Secant, cosecant and cotangent are the reciprocals of cosine, sine and tangent; since $\tan\theta = \frac{\sin\theta}{\cos\theta}$, its reciprocal is $\cot\theta = \frac{\cos\theta}{\sin\theta}$.`,
  });

  chk(sec(rad(240)), -2);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Without a calculator, find the exact value of $\sec 240°$.`,
    value: -2, wrong: [2, -2 / Math.sqrt(3)],
    explanation: t`$\cos 240° = -\cos 60° = -\frac{1}{2}$ (third quadrant, related angle $60°$), so $\sec 240° = \frac{1}{-1/2} = -2$.`,
  });

  chk(S(70), Math.abs(S(110))); chk(C(290), C(70));
  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`What is the related acute angle of $290°$?`,
    options: [
      [t`$70°$`, t`Correct: $290°$ is in the fourth quadrant, so the related angle is $360° - 290° = 70°$.`],
      [t`$20°$`, t`This is measured to the $y$-axis ($290° - 270°$). The related angle is always measured to the $x$-axis.`],
      [t`$110°$`, t`This is $290° - 180°$, which is not acute; that rule is for the third quadrant.`],
      [t`$-70°$`, t`$-70°$ ends in the same place as $290°$ (it is $290° - 360°$), but the related angle is the positive acute angle to the $x$-axis.`],
    ],
    answer: "A",
    explanation: t`Fourth quadrant: related angle $= 360° - \theta = 70°$. So, for example, $\cos 290° = \cos 70°$ and $\sin 290° = -\sin 70°$.`,
  });

  // sin θ = 8/17, θ obtuse
  const th1 = Math.PI - Math.asin(8 / 17);
  chk(Math.cos(th1), -15 / 17); chk(Math.tan(th1), -8 / 15);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Given that $\sin\theta = \dfrac{8}{17}$ and $\theta$ is obtuse, find the exact values of $\cos\theta$ and $\tan\theta$. Type fractions, e.g. -3/5.`,
    template: "cos θ = {{blank:c}}, tan θ = {{blank:t}}",
    blanks: [
      { id: "c", input: "number", accepted: ["-15/17"], wrong: "15/17" },
      { id: "t", input: "number", accepted: ["-8/15"], wrong: "8/15" },
    ],
    explanation: t`Related-angle triangle: opposite 8, hypotenuse 17, adjacent $\sqrt{17^2 - 8^2} = \sqrt{225} = 15$. An obtuse angle is in the second quadrant, where cosine and tangent are negative: $\cos\theta = -\frac{15}{17}$, $\tan\theta = -\frac{8}{15}$.`,
    hints: ["Find the third side of the right-angled triangle with Pythagoras.", "Obtuse means the second quadrant: which functions are negative there?"],
  });

  const c200 = cot(rad(200));
  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: t`Use a calculator to find $\cot 200°$, correct to 3 significant figures.`,
    value: c200, wrong: [0.364, -2.75],
    explanation: t`$\cot 200° = \frac{1}{\tan 200°} = \frac{1}{0.36397\ldots} = 2.747\ldots \approx 2.75$. It is positive because $200°$ is in the third quadrant, where tangent and cotangent are positive.`,
  });

  // tan θ = 2, sin θ < 0 -> third quadrant, cos = -1/√5
  const th2 = Math.PI + Math.atan(2);
  chk(Math.cos(th2), -1 / Math.sqrt(5)); chk(Math.sign(Math.sin(th2)), -1);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Given that $\tan\theta = 2$ and $\sin\theta < 0$, find the exact value of $\cos\theta$.`,
    options: [
      [t`$-\frac{1}{\sqrt{5}}$`, t`Correct: tangent positive and sine negative means the third quadrant, where cosine is negative; the triangle has sides 2, 1 and $\sqrt{5}$.`],
      [t`$\frac{1}{\sqrt{5}}$`, t`The size is right but cosine is negative in the third quadrant.`],
      [t`$-\frac{2}{\sqrt{5}}$`, t`This is $\sin\theta$: opposite over hypotenuse.`],
      [t`$-\frac{1}{\sqrt{3}}$`, t`The hypotenuse is $\sqrt{2^2 + 1^2} = \sqrt{5}$, not $\sqrt{3}$.`],
    ],
    answer: "A",
    explanation: t`$\tan\theta > 0$ and $\sin\theta < 0$ only in the third quadrant. Triangle: opposite 2, adjacent 1, hypotenuse $\sqrt{5}$. So $\cos\theta = -\frac{1}{\sqrt{5}}$ (and $\sin\theta = -\frac{2}{\sqrt{5}}$).`,
    hints: ["Use the signs of tan and sin to fix the quadrant first."],
  });

  chk(cosec(4 * Math.PI / 3), -2 / Math.sqrt(3));
  b.expr({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the exact value of $\operatorname{cosec}\dfrac{4\pi}{3}$. Give a surd, e.g. 2/√3 or -√3/3.`,
    accepted: ["-2/√3", "-2√3/3", "-(2√3)/3", "-(2/√3)", "-2/3√3", "-(2/3)√3"],
    wrong: ["2/√3", "-2"],
    explanation: t`$\frac{4\pi}{3} = 240°$, third quadrant, related angle $60°$: $\sin\frac{4\pi}{3} = -\frac{\sqrt{3}}{2}$. So $\operatorname{cosec}\frac{4\pi}{3} = -\frac{2}{\sqrt{3}} = -\frac{2\sqrt{3}}{3}$.`,
    hints: [t`Convert to degrees: $\pi$ radians $= 180°$.`],
  });

  chk(Math.sin(5 * Math.PI / 6), 0.5);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Find the exact value of $\sin\dfrac{5\pi}{6}$.`,
    value: 0.5, wrong: [-0.5, Math.sqrt(3) / 2],
    explanation: t`$\frac{5\pi}{6} = 150°$, second quadrant, related angle $30°$; sine is positive there, so $\sin\frac{5\pi}{6} = \sin\frac{\pi}{6} = \frac{1}{2}$.`,
  });

  for (const a of [17, 73, 200]) chk(C(-a), C(a));
  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`For every angle $\theta$, $\cos(-\theta) = \cos\theta$.`,
    answer: true,
    explanation: t`True. Rotating clockwise through $\theta$ gives the reflection of the point in the $x$-axis: $x$ is unchanged and $y$ changes sign. So $\cos(-\theta) = \cos\theta$ but $\sin(-\theta) = -\sin\theta$.`,
  });

  chk(S(160), S(20)); chk(S(200), -S(20)); chk(C(20), S(70));
  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`Which of these is equal to $\sin 340°$?`,
    options: [
      [t`$-\sin 20°$`, t`Correct: fourth quadrant, related angle $20°$, sine negative.`],
      [t`$\sin 20°$`, "The related angle is right but sine is negative in the fourth quadrant."],
      [t`$-\cos 20°$`, t`The related angle gives the same function, sine, not cosine.`],
      [t`$\sin 160°$`, t`$\sin 160° = +\sin 20°$, which is positive.`],
    ],
    answer: "A",
    explanation: t`$340°$ is in the fourth quadrant; related angle $360° - 340° = 20°$; only cosine and secant are positive there. So $\sin 340° = -\sin 20°$.`,
  });

  chk(sec(rad(-45)), Math.SQRT2);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the exact value of $\sec^2(-45°)$.`,
    value: 2, wrong: [-2, 1],
    explanation: t`$\cos(-45°) = \cos 45° = \frac{1}{\sqrt{2}}$, so $\sec(-45°) = \sqrt{2}$ and $\sec^2(-45°) = 2$.`,
    hints: [t`$\cos(-\theta) = \cos\theta$.`],
  });

  // cos θ = 1/3, 270 < θ < 360: tan = -2√2, cosec = -3/(2√2) = -3√2/4
  const th3 = 2 * Math.PI - Math.acos(1 / 3);
  chk(Math.tan(th3), -2 * Math.SQRT2); chk(cosec(th3), -3 * Math.SQRT2 / 4);
  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 3,
    stem: t`Given that $\cos\theta = \dfrac{1}{3}$ and $270° < \theta < 360°$, show that $\tan\theta = -2\sqrt{2}$.`,
    points: [
      t`M1 finds the third side of the related-angle triangle: $\sqrt{3^2 - 1^2} = \sqrt{8} = 2\sqrt{2}$.`,
      t`M1 uses the fourth quadrant to give $\sin\theta = -\frac{2\sqrt{2}}{3}$ (sine negative).`,
      t`A1 reaches $\tan\theta = \frac{\sin\theta}{\cos\theta} = -2\sqrt{2}$ with the sign justified.`,
    ],
    modelAnswer: t`Related-angle triangle: adjacent 1, hypotenuse 3, opposite

$$
\sqrt{3^2 - 1^2} = \sqrt{8} = 2\sqrt{2}
$$

$\theta$ is in the fourth quadrant, where sine is negative:

$$
\sin\theta = -\frac{2\sqrt{2}}{3}
$$

$$
\tan\theta = \frac{\sin\theta}{\cos\theta} = \frac{-2\sqrt{2}/3}{1/3} = -2\sqrt{2}
$$`,
    explanation: t`The size $2\sqrt{2}$ comes from Pythagoras; the minus sign comes from the quadrant (tangent is negative in the fourth quadrant).`,
    hints: ["Draw the right-angled triangle for the related angle first."],
  });

  // Struct 1 (6): sin α = 12/13 obtuse? use cos β = -3/5? -> use sec α = -7/... keep: sin α = 20/29, α obtuse
  const al = Math.PI - Math.asin(20 / 29);
  chk(Math.cos(al), -21 / 29); chk(Math.tan(al), -20 / 21); chk(sec(al), -29 / 21); chk(cot(al), -21 / 20);
  chk(cosec(al) - sec(al), 1189 / 420); chk(29 * 21 + 29 * 20, 1189);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: t`The angle $\alpha$ is obtuse and $\sin\alpha = \dfrac{20}{29}$. Answer without a calculator.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: t`The right-angled triangle for the related acute angle has hypotenuse 29 and opposite side 20. Find the third side.`, value: 21, wrong: [Math.sqrt(1241)],
        explanation: t`$\sqrt{29^2 - 20^2} = \sqrt{841 - 400} = \sqrt{441} = 21$.` }),
      P.fib({ label: "(b)", marks: 2, stem: t`Find the exact values of $\cos\alpha$ and $\tan\alpha$. Type fractions, e.g. -3/5.`, template: "cos α = {{blank:c}}, tan α = {{blank:t}}",
        blanks: [{ id: "c", input: "number", accepted: ["-21/29"], wrong: "21/29" }, { id: "t", input: "number", accepted: ["-20/21"], wrong: "-21/20" }],
        explanation: t`Obtuse means the second quadrant: cosine and tangent are negative. $\cos\alpha = -\frac{21}{29}$, $\tan\alpha = -\frac{20}{21}$.` }),
      P.num({ label: "(c)", marks: 2, stem: t`Find the exact value of $\operatorname{cosec}\alpha - \sec\alpha$, as a fraction.`, value: 1189 / 420, wrong: [29 / 420],
        explanation: t`$\operatorname{cosec}\alpha = \frac{29}{20}$ and $\sec\alpha = -\frac{29}{21}$, so $\operatorname{cosec}\alpha - \sec\alpha = \frac{29}{20} + \frac{29}{21} = \frac{609 + 580}{420} = \frac{1189}{420}$.` }),
      P.num({ label: "(d)", marks: 1, stem: t`Find the value of $\tan\alpha \times \cot\alpha$.`, value: 1, wrong: [-1],
        explanation: t`$\cot\alpha = \frac{1}{\tan\alpha}$, so the product is 1 for every angle where both are defined.` }),
    ],
    explanation: "Find the missing side with Pythagoras, then give each function the sign it has in the second quadrant (only sin and cosec positive).",
    hints: ["Obtuse: 90° < α < 180°.", t`$\operatorname{cosec}\alpha = \frac{1}{\sin\alpha}$ and $\sec\alpha = \frac{1}{\cos\alpha}$.`],
  });

  // Struct 2 (7): exact evaluation
  const e1 = S(150) * C(330) + T(225);
  chk(e1, Math.sqrt(3) / 4 + 1);
  const e2 = sec(rad(135)) ** 2 - cot(rad(330)) ** 2;
  chk(e2, 2 - 3); chk(e2, -1);
  const e3 = cosec(rad(-30)) * Math.cos(2 * Math.PI / 3);
  chk(e3, 1);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: "Without using a calculator, find the exact value of each expression.",
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: t`$\sin 150° \cos 330° + \tan 225°$, in the form $p + \dfrac{\sqrt{3}}{q}$.`, template: "p = {{blank:p}}, q = {{blank:q}}",
        blanks: [{ id: "p", input: "number", accepted: [1], wrong: "-1" }, { id: "q", input: "number", accepted: [4], wrong: "2" }],
        explanation: t`$\sin 150° = \frac{1}{2}$, $\cos 330° = \frac{\sqrt{3}}{2}$, $\tan 225° = 1$. So the value is $\frac{\sqrt{3}}{4} + 1$: $p = 1$, $q = 4$.` }),
      P.num({ label: "(b)", marks: 2, stem: t`$\sec^2 135° - \cot^2 330°$`, value: -1, wrong: [1, 5],
        explanation: t`$\cos 135° = -\frac{1}{\sqrt{2}}$ so $\sec^2 135° = 2$; $\tan 330° = -\frac{1}{\sqrt{3}}$ so $\cot 330° = -\sqrt{3}$ and $\cot^2 330° = 3$. Value $2 - 3 = -1$.` }),
      P.num({ label: "(c)", marks: 2, stem: t`$\operatorname{cosec}\left(-\dfrac{\pi}{6}\right)\cos\dfrac{2\pi}{3}$`, value: 1, wrong: [-1],
        explanation: t`$\sin\left(-\frac{\pi}{6}\right) = -\frac{1}{2}$, so $\operatorname{cosec}\left(-\frac{\pi}{6}\right) = -2$; $\cos\frac{2\pi}{3} = -\frac{1}{2}$. Product $(-2)\left(-\frac{1}{2}\right) = 1$.` }),
    ],
    explanation: "For each angle: quadrant, related acute angle, exact value, CAST sign; then reciprocals and arithmetic.",
    hints: ["Squares remove the sign, so sec² and cot² are positive.", t`$\sin(-\theta) = -\sin\theta$.`],
  });

  // Cards
  b.card("DEFINITION", t`$\sin\theta$, $\cos\theta$, $\tan\theta$ for any angle`, t`For $P(x, y)$ at distance $r$ on the arm of $\theta$: $\frac{y}{r}$, $\frac{x}{r}$, $\frac{y}{x}$.`);
  b.card("FORMULA", t`$\sec\theta$, $\operatorname{cosec}\theta$, $\cot\theta$`, t`$\frac{1}{\cos\theta}$, $\frac{1}{\sin\theta}$, $\frac{1}{\tan\theta} = \frac{\cos\theta}{\sin\theta}$`, "Third-letter rule: sec–cos, cosec–sin, cot–tan.");
  b.card("CONCEPT", "CAST", "Positive functions by quadrant: 4th cos, 1st all, 2nd sin, 3rd tan (reciprocals share the sign).");
  b.card("CONCEPT", "Related acute angle", t`2nd quadrant $180° - \theta$; 3rd $\theta - 180°$; 4th $360° - \theta$. Always measured to the $x$-axis.`);
  b.card("FACT", t`Exact values at $30°$ ($\frac{\pi}{6}$)`, t`$\sin = \frac{1}{2}$, $\cos = \frac{\sqrt{3}}{2}$, $\tan = \frac{1}{\sqrt{3}}$`);
  b.card("FACT", t`Exact values at $45°$ ($\frac{\pi}{4}$)`, t`$\sin = \cos = \frac{1}{\sqrt{2}}$, $\tan = 1$`);
  b.card("FACT", t`Exact values at $60°$ ($\frac{\pi}{3}$)`, t`$\sin = \frac{\sqrt{3}}{2}$, $\cos = \frac{1}{2}$, $\tan = \sqrt{3}$`);
  b.card("FACT", "Negative angles", t`$\cos(-\theta) = \cos\theta$, $\sin(-\theta) = -\sin\theta$, $\tan(-\theta) = -\tan\theta$.`);
  b.card("CONCEPT", "Other ratios from one ratio", "Draw the related-angle triangle with positive sides, use Pythagoras, then attach signs from the quadrant.");
});
