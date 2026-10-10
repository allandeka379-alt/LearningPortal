// W4b: amaths.elasticity.hookes-law-energy (ZIMSEC only: Mechanics F6 6.8)
import { concept, P, t, chk, quad } from "../lib.mjs";
import { f3, f4, NB } from "../tables/w4b-kit.mjs";

const { sqrt } = Math;
const g = 9.8;

concept("amaths.elasticity.hookes-law-energy", { file: "elasticity/hookes-law-energy", keyPrefix: "elasticity.hookes-law-energy" }, (b) => {
  // q01
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`A light elastic string has natural length $l$ and modulus of elasticity $\lambda$. When its extension is $x$, what is the tension in it?`,
    options: [
      [t`$\dfrac{\lambda x}{l}$`, "Correct: Hooke's law, tension proportional to extension."],
      [t`$\dfrac{\lambda l}{x}$`, "This would make the tension fall as the string stretches."],
      [t`$\dfrac{\lambda x^2}{2l}$`, "This is the elastic potential energy stored, in joules, not the tension."],
      [t`$\lambda x$`, t`This leaves out the natural length; $\lambda x$ has units N m, not N.`],
    ],
    answer: "A",
    explanation: t`Hooke's law: $T = \frac{\lambda x}{l}$. When $x = l$ (length doubled), $T = \lambda$.`,
  });

  // q02
  b.tf({
    d: 1, skill: "UNDERSTANDING", calculator: false,
    stem: "A light elastic string that is shorter than its natural length pushes outwards on the particles at its ends.",
    answer: false,
    explanation: "A string goes slack when shorter than its natural length: it exerts no force at all. Only a spring can be compressed and exert a thrust.",
  });

  // q03 tension
  const T3 = (36 * 0.4) / 1.5;
  chk(T3, 9.6, 1e-12);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`A light elastic string of natural length $1.5$ m and modulus $36$ N is stretched to a length of $1.9$ m. Find the tension in the string.`,
    value: T3, unit: "N", wrong: [f3((36 * 1.9) / 1.5)],
    explanation: t`Extension $x = 1.9 - 1.5 = 0.4$ m. $T = \frac{36 \times 0.4}{1.5} = 9.6$ N. (Using the stretched length $1.9$ m instead of the extension gives $45.6$ N.)`,
  });

  // q04 EPE of compressed spring
  const E4 = (45 * 0.15 ** 2) / (2 * 0.6);
  b.num({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: t`A light spring of natural length $0.6$ m and modulus $45$ N is compressed by $0.15$ m. Find the elastic potential energy stored in the spring, in joules correct to 3 significant figures.`,
    value: E4, unit: "J", wrong: [f3((45 * 0.15) / 0.6), f3((45 * 0.15 ** 2) / 0.6)],
    explanation: t`EPE $= \frac{\lambda x^2}{2l} = \frac{45 \times 0.0225}{1.2} = ${f3(E4)}$ J. ($11.25$ is the thrust in newtons; forgetting the 2 doubles the energy.)`,
  });

  // q05 find modulus
  const lam5 = (0.6 * g * 1.4) / 0.35;
  chk(lam5, 23.52, 1e-9);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A particle of mass $0.6$ kg hangs in equilibrium from a light elastic string of natural length $1.4$ m whose other end is fixed. The extension of the string is $0.35$ m. Take $g = 9.8$ m s$^{-2}$. Find the modulus of elasticity of the string, correct to 3 significant figures.`,
    value: lam5, unit: "N", wrong: [f3((0.6 * 1.4) / 0.35), f3((0.6 * g * 1.75) / 0.35)],
    explanation: t`In equilibrium $T = mg = 5.88$ N. Hooke's law: $5.88 = \frac{\lambda \times 0.35}{1.4}$, so $\lambda = \frac{5.88 \times 1.4}{0.35} = ${f3(lam5)}$ N. (Forgetting $g$ gives $2.4$; using the stretched length $1.75$ m for $l$ gives too large a value.)`,
    workedSolution: t`1. Resolve vertically: $T = 0.6 \times 9.8 = 5.88$ N.
2. $T = \frac{\lambda x}{l}$: $5.88 = \frac{0.35\lambda}{1.4} = 0.25\lambda$.
3. $\lambda = ${f3(lam5)}$ N.`,
    hints: ["In equilibrium the tension equals the weight.", "Substitute into T = λx/l with l the natural length."],
  });

  // q06 work between two extensions
  const W6 = (40 / (2 * 0.5)) * (0.3 ** 2 - 0.1 ** 2);
  chk(W6, 3.2, 1e-9);
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`A light elastic string of natural length $0.5$ m and modulus $40$ N is stretched from an extension of $0.1$ m to an extension of $0.3$ m. How much work is done?`,
    options: [
      [t`$3.2$ J`, t`Correct: $\frac{40}{2(0.5)}(0.3^2 - 0.1^2) = 40 \times 0.08 = 3.2$ J.`],
      [t`$1.6$ J`, t`This uses $(0.3 - 0.1)^2$, the square of the difference instead of the difference of the squares.`],
      [t`$3.6$ J`, t`This is the energy stored at extension $0.3$ m, starting from the natural length, not from $0.1$ m.`],
      [t`$4.8$ J`, t`This multiplies the final tension, $24$ N, by the distance $0.2$ m; the tension was not constant.`],
    ],
    answer: "A",
    explanation: t`Work $=$ gain in EPE $= \frac{\lambda}{2l}(x_2^2 - x_1^2) = 40(0.09 - 0.01) = 3.2$ J.`,
  });
  chk((40 / 1) * 0.04, 1.6, 1e-9); chk(40 * 0.09, 3.6, 1e-9); chk((40 * 0.3) / 0.5 * 0.2, 4.8, 1e-9);

  // q07 spring on smooth slope
  const x7 = (2 * g * 0.5 * 0.5) / 49;
  chk(x7, 0.1, 1e-12);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`A particle of mass $2$ kg rests on a smooth plane inclined at $30°$ to the horizontal. It is held by a light spring of natural length $0.5$ m and modulus $49$ N, lying along a line of greatest slope with its upper end fixed. Take $g = 9.8$ m s$^{-2}$. Find the extension of the spring and its length.`,
    template: "extension = {{blank:x}} m, length = {{blank:l}} m",
    blanks: [NB("x", x7, 0.2), NB("l", 0.6, 0.7)],
    explanation: t`Along the slope: $T = mg\sin 30° = 2 \times 9.8 \times 0.5 = 9.8$ N. Hooke: $9.8 = \frac{49x}{0.5}$, so $x = 0.1$ m and the length is $0.6$ m. (Using the full weight $19.6$ N gives $0.2$ m.)`,
    hints: ["Only the component of the weight along the slope stretches the spring."],
  });

  // q08 two strings between fixed points
  const y8 = 0.7 / 2.5, x8 = 1.5 * y8;
  chk((16 * x8) / 0.8, (30 * y8) / 1, 1e-12);
  b.num({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`Points $A$ and $B$ are $2.5$ m apart on a smooth horizontal surface. A particle $P$ is attached to $A$ by a light elastic string of natural length $0.8$ m and modulus $16$ N, and to $B$ by a light elastic string of natural length $1$ m and modulus $30$ N. $P$ rests in equilibrium on the line $AB$. Find the length $AP$.`,
    value: 0.8 + x8, unit: "m", wrong: [f3(1 + y8), 1.25],
    explanation: t`Extensions $x$ (in $AP$) and $y$ (in $PB$): $x + y = 2.5 - 1.8 = 0.7$. Equal tensions: $\frac{16x}{0.8} = \frac{30y}{1}$, so $20x = 30y$, $x = 1.5y$. Then $2.5y = 0.7$, $y = 0.28$, $x = 0.42$, and $AP = 0.8 + 0.42 = 1.22$ m.`,
    hints: ["The two tensions are equal in equilibrium.", "The two extensions add up to 2.5 − (0.8 + 1)."],
  });

  // q09 spring launcher
  const v9 = sqrt((2 * ((60 * 0.08 ** 2) / (2 * 0.25))) / 0.12);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A ball of mass $0.12$ kg is held against a light spring of natural length $0.25$ m and modulus $60$ N, on a smooth horizontal surface, compressing the spring by $0.08$ m. The ball is released. Find the speed with which it leaves the spring, correct to 3 significant figures.`,
    value: v9, unit: "m/s", wrong: [f3(sqrt((2 * ((60 * 0.08 ** 2) / 0.25)) / 0.12))],
    explanation: t`Energy: $\frac{1}{2}(0.12)v^2 = \frac{60 \times 0.08^2}{2 \times 0.25} = 0.768$ J, so $v^2 = 12.8$ and $v = ${f3(v9)}$ m s$^{-1}$. (Omitting the 2 in $\frac{\lambda x^2}{2l}$ gives $${f3(sqrt((2 * ((60 * 0.08 ** 2) / 0.25)) / 0.12))}$ m s$^{-1}$.)`,
    hints: ["All the elastic energy becomes kinetic energy (smooth, horizontal)."],
  });

  // q10 dropped from the fixed point, greatest extension
  const r10 = quad.roots(73.5 / 2, -1.5 * g, -1.5 * g * 1);
  const x10 = r10[1];
  chk(1.5 * g * (1 + x10), (73.5 * x10 * x10) / 2, 1e-9);
  b.calc({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`A particle of mass $1.5$ kg is attached to one end of a light elastic string of natural length $1$ m and modulus $73.5$ N. The other end is fixed at $O$. The particle is released from rest at $O$ and falls vertically. Take $g = 9.8$ m s$^{-2}$. Find the greatest distance below $O$ that the particle reaches, correct to 3 significant figures.`,
    value: 1 + x10, unit: "m", wrong: [f3(x10), f3((1.5 * g * 1) / 73.5 + 1)],
    explanation: t`Let the greatest extension be $x$. Loss of GPE $=$ gain of EPE (KE zero at both ends): $1.5(9.8)(1 + x) = \frac{73.5x^2}{2}$, i.e. $36.75x^2 - 14.7x - 14.7 = 0$. The positive root is $x = ${f4(x10)}$ m, so the greatest distance below $O$ is $1 + ${f4(x10)} = ${f3(1 + x10)}$ m. ($1.2$ m is only the equilibrium position, where the particle is still moving fast.)`,
    workedSolution: t`1. Falls $1 + x$ metres in total; KE is zero at the start and at the lowest point.
2. $14.7(1 + x) = 36.75x^2$.
3. $36.75x^2 - 14.7x - 14.7 = 0 \Rightarrow x = \frac{14.7 + \sqrt{14.7^2 + 4(36.75)(14.7)}}{73.5} = ${f4(x10)}$.
4. Greatest distance $= ${f3(1 + x10)}$ m.`,
    hints: ["The string is slack for the first 1 m of the fall.", "Use energy: GPE lost over the whole fall = EPE at the lowest point."],
  });

  // q11 greatest speed (particle released from the fixed point)
  const e11 = (0.9 * g * 1.25) / 45;
  chk(e11, 0.245, 1e-12);
  const v11 = sqrt((2 * (0.9 * g * (1.25 + e11) - (45 * e11 * e11) / (2 * 1.25))) / 0.9);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`A particle of mass $0.9$ kg is attached to a light elastic string of natural length $1.25$ m and modulus $45$ N, whose other end is fixed at $O$. The particle is released from rest at $O$ and falls vertically. Take $g = 9.8$ m s$^{-2}$. Find its greatest speed, correct to 3 significant figures.`,
    value: v11, unit: "m/s", wrong: [f3(sqrt(2 * g * 1.25))],
    explanation: t`The speed is greatest where the acceleration is zero: $\frac{45e}{1.25} = 0.9 \times 9.8$, so $e = 0.245$ m. Energy, having fallen $1.495$ m: $\frac{1}{2}(0.9)v^2 = 8.82(1.495) - \frac{45(0.245)^2}{2.5} = ${f4(8.82 * 1.495)} - ${f4((45 * 0.245 ** 2) / 2.5)}$, so $v = ${f3(v11)}$ m s$^{-1}$. ($${f3(sqrt(2 * g * 1.25))}$ m s$^{-1}$ is the speed when the string just becomes taut; the particle still speeds up after that.)`,
    hints: ["Greatest speed where tension = weight.", "Then use conservation of energy to that point."],
  });

  // q12
  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "A bungee jumper reaches her greatest speed at the moment the rope first becomes taut.",
    answer: false,
    explanation: "Just after the rope becomes taut the tension is still less than her weight, so she keeps accelerating downwards. Her speed is greatest where the tension equals her weight (zero acceleration).",
  });

  // q13 match
  b.match({
    d: 2, skill: "RECALL", calculator: false,
    stem: "Match each term with its meaning for a light elastic string.",
    pairs: [
      ["Natural length", "the length when there is no tension"],
      ["Extension", "stretched length minus natural length"],
      ["Modulus of elasticity", "the tension that would double the length"],
      ["Elastic potential energy", "the work done in stretching it from its natural length"],
    ],
    explanation: t`From $T = \frac{\lambda x}{l}$: when $x = l$, $T = \lambda$; and the work done in stretching is $\frac{\lambda x^2}{2l}$.`,
  });

  // q14 cutting a string
  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`A light elastic string of natural length $2$ m and modulus $50$ N is cut into two equal pieces. What is the modulus of elasticity of each piece?`,
    options: [
      [t`$50$ N, the same as before`, t`Correct: $\lambda$ depends on the material and thickness, not the length; each piece has $l = 1$ m and $\lambda = 50$ N, so it is twice as stiff.`],
      [t`$25$ N`, "Halving the length does not halve the modulus; the material and cross-section are unchanged."],
      [t`$100$ N`, t`The STIFFNESS $\frac{\lambda}{l}$ doubles (from 25 to 50 N m$^{-1}$), but the modulus itself is unchanged.`],
      ["It depends on the load hung from it", "The modulus is a constant of the string, independent of the load."],
    ],
    answer: "A",
    explanation: t`For one piece, $T = \frac{50x}{1} = 50x$; for the whole string $T = \frac{50x}{2} = 25x$. The shorter piece needs twice the tension for the same extension, because its natural length is halved, not because $\lambda$ changes.`,
    hints: [t`Compare $T = \frac{\lambda x}{l}$ for the whole string and one half.`],
  });

  // q15 proof: EPE formula
  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 4,
    stem: t`Show, by integration, that the work done in stretching a light elastic string of natural length $l$ and modulus $\lambda$ from extension $x_1$ to extension $x_2$ is $\dfrac{\lambda}{2l}\left(x_2^2 - x_1^2\right)$. Deduce the elastic potential energy at extension $x$.`,
    points: [
      "M1 states the tension at extension s is λs/l (Hooke's law).",
      "M1 writes the work as ∫ from x₁ to x₂ of λs/l ds.",
      "A1 integrates to [λs²/(2l)] and substitutes the limits to reach the given result.",
      "B1 deduces EPE = λx²/(2l) with x₁ = 0 (from the natural length).",
    ],
    modelAnswer: t`At extension $s$ the tension is $T = \dfrac{\lambda s}{l}$, which varies, so the work is an integral:
$$
W = \int_{x_1}^{x_2} \frac{\lambda s}{l}\,\mathrm{d}s = \left[\frac{\lambda s^2}{2l}\right]_{x_1}^{x_2} = \frac{\lambda}{2l}\left(x_2^2 - x_1^2\right)
$$
Stretching from the natural length ($x_1 = 0$) to extension $x$ stores
$$
\text{EPE} = \frac{\lambda x^2}{2l}.
$$`,
    explanation: "Work done by a variable force is the integral of the force with respect to distance.",
    hints: ["Write the tension at a general extension s."],
  });

  // q16 explain
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: "Explain why the constant-acceleration (suvat) equations cannot be used for a particle moving on a taut elastic string, and state what method is used instead.",
    points: [
      "The tension depends on the extension (T = λx/l), so the resultant force and hence the acceleration change as the particle moves.",
      "Use conservation of energy (KE + GPE + EPE constant), or the equation of motion as a differential equation.",
    ],
    modelAnswer: "While the string is taut the tension λx/l changes with the extension, so the net force and the acceleration are not constant; suvat assumes constant acceleration. Instead, use conservation of mechanical energy, including the elastic potential energy λx²/(2l), or solve the equation of motion.",
    explanation: "Suvat needs constant acceleration; Hooke's law makes the force variable.",
    hints: ["What happens to the tension as the string stretches?"],
  });

  // q17 struct 5: oscillation speed through equilibrium
  const e17 = (1.2 * g * 0.9) / 44.1;
  chk(e17, 0.24, 1e-12);
  const KE17 = (44.1 / (2 * 0.9)) * (0.4 ** 2 - 0.24 ** 2) - 1.2 * g * 0.16;
  const v17 = sqrt((2 * KE17) / 1.2);
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, calculator: true,
    stem: t`A particle of mass $1.2$ kg hangs from a light elastic string of natural length $0.9$ m and modulus $44.1$ N, whose upper end is fixed. Take $g = 9.8$ m s$^{-2}$.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Find the extension of the string when the particle hangs in equilibrium.", value: e17, unit: "m", wrong: [f3((1.2 * 0.9) / 44.1)],
        explanation: t`$\frac{44.1e}{0.9} = 1.2 \times 9.8 = 11.76$, so $e = 0.24$ m.` }),
      P.num({ label: "(b)", marks: 3, stem: "The particle is pulled down a further 0.16 m and released from rest. Find its speed as it passes through the equilibrium position, correct to 3 significant figures.", value: v17, unit: "m/s", wrong: [f3(sqrt((2 * ((44.1 / 1.8) * 0.16 ** 2)) / 1.2))],
        explanation: t`From extension $0.4$ m to $0.24$ m: EPE lost $= \frac{44.1}{1.8}(0.4^2 - 0.24^2) = ${f4((44.1 / 1.8) * (0.4 ** 2 - 0.24 ** 2))}$ J; GPE gained $= 1.2(9.8)(0.16) = 1.8816$ J. KE $= ${f4(KE17)}$ J, so $v = ${f3(v17)}$ m s$^{-1}$.` }),
    ],
    explanation: "Equilibrium from Hooke's law; motion from energy, using the difference of squares for the elastic energy.",
    hints: ["Use EPE at both extensions, not (0.16)².", "The particle rises 0.16 m, gaining GPE."],
  });

  // q18 struct 14: bungee jump
  const lam18 = (75 * g * 60 * 2 * 25) / 35 ** 2;
  chk(lam18, 1800, 1e-9);
  const e18 = (75 * g * 25) / lam18;
  const v18 = sqrt((2 * (75 * g * (25 + e18) - (lam18 * e18 * e18) / 50)) / 75);
  const a18 = ((lam18 * 35) / 25 - 75 * g) / 75;
  chk(a18, 23.8, 1e-9);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`A bungee jumper of mass $75$ kg is attached to a light elastic rope of natural length $25$ m and modulus $\lambda$ N; the other end is fixed to a bridge high above the Zambezi. She steps off from rest at the point where the rope is fixed and falls vertically. Her lowest point is $60$ m below the bridge. Model her as a particle and take $g = 9.8$ m s$^{-2}$.`,
    parts: [
      P.proof({ label: "(a)", marks: 4, stem: t`Show that $\lambda = 1800$.`,
        points: ["B1 extension at the lowest point is 60 − 25 = 35 m.", "M1 energy equation: loss of GPE = gain of EPE (KE zero at both ends).", "A1 75(9.8)(60) = λ(35²)/(2 × 25) correct.", "A1 λ = 44100 × 50/1225 = 1800."],
        modelAnswer: t`At the lowest point the extension is $60 - 25 = 35$ m and her speed is zero, as at the start.
$$
75 \times 9.8 \times 60 = \frac{\lambda \times 35^2}{2 \times 25}
$$
$$
44100 = \frac{1225\lambda}{50} \;\Rightarrow\; \lambda = \frac{44100 \times 50}{1225} = 1800
$$`,
        explanation: "Energy from the start to the lowest point, where KE is zero." }),
      P.num({ label: "(b)", marks: 2, stem: "Find the extension of the rope when the jumper could hang in equilibrium, correct to 3 significant figures.", value: e18, unit: "m", wrong: [f3(35 / 2)],
        explanation: t`$\frac{1800e}{25} = 735$, so $e = ${f3(e18)}$ m.` }),
      P.num({ label: "(c)", marks: 4, stem: "Find her greatest speed, correct to 3 significant figures.", value: v18, unit: "m/s", wrong: [f3(sqrt(2 * g * 25))],
        explanation: t`Greatest speed at the equilibrium extension $e = ${f4(e18)}$ m: $\frac{1}{2}(75)v^2 = 735(25 + e) - \frac{1800e^2}{50}$, giving $v = ${f3(v18)}$ m s$^{-1}$.` }),
      P.num({ label: "(d)", marks: 2, stem: "Find the magnitude of her acceleration at the lowest point.", value: a18, unit: "m/s²", wrong: [f3((1800 * 35) / 25 / 75)],
        explanation: t`$T = \frac{1800 \times 35}{25} = 2520$ N upwards, weight $735$ N down: $a = \frac{2520 - 735}{75} = 23.8$ m s$^{-2}$, upwards.` }),
      P.manual({ label: "(e)", marks: 2, stem: "State two assumptions in this model and how one of them affects the results.",
        points: ["Any two of: jumper is a particle; rope is light; no air resistance; rope obeys Hooke's law throughout.", "One effect, e.g. air resistance would make the lowest point higher (less than 60 m) for the same rope; a heavy rope has energy of its own."],
        modelAnswer: "The jumper is treated as a particle and air resistance is ignored; the rope is light and obeys Hooke's law. With air resistance some energy is lost, so for the same rope she would not fall as far, and her greatest speed would be less.",
        explanation: "Name an assumption and link it to a change in the prediction." }),
    ],
    explanation: "Energy finds λ; equilibrium finds where the speed is greatest; Newton's second law at the lowest point gives the acceleration.",
    hints: ["Extension at the lowest point = 60 − 25.", "Greatest speed where tension = weight."],
  });

  // ---------------------------------------------------------------- cards
  b.card("FORMULA", "Hooke's law", t`$T = \dfrac{\lambda x}{l}$: tension (or thrust) $T$, modulus $\lambda$ (N), extension (or compression) $x$, natural length $l$.`);
  b.card("FORMULA", "Elastic potential energy", t`$\dfrac{\lambda x^2}{2l}$ joules at extension $x$.`);
  b.card("FORMULA", "Work done stretching from extension x₁ to x₂", t`$\dfrac{\lambda}{2l}\left(x_2^2 - x_1^2\right)$ (difference of squares).`);
  b.card("DEFINITION", "Modulus of elasticity", "The constant λ (in newtons) in T = λx/l: the tension that would double the natural length; depends on the material, not the length.");
  b.card("FACT", "Elastic string vs spring", "A string can only be in tension (slack below natural length, no EPE); a spring can also be compressed and push with a thrust.");
  b.card("CONCEPT", "Greatest speed on an elastic string or spring", "Where the acceleration is zero: tension equals weight (the equilibrium position).");
  b.card("CONCEPT", "Method for motion on a taut elastic string", "Conservation of energy: KE + GPE + EPE = constant (no suvat: the force varies).");
  b.card("CONCEPT", "Equilibrium of a particle between two elastic strings in a line", "The tensions are equal; the two extensions add up to the gap minus the natural lengths.");
});
