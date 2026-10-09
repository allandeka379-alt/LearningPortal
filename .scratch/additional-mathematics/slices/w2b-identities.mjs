// W2b: amath.trig.identities
import { concept, P, t, chk, sec, cosec, cot } from "../lib.mjs";

const { sin, cos, tan } = Math;
const XS = [0.3, 0.9, 1.2, 2.0, 2.7, 4.0, 5.5];
/** Asserts f ≡ g at sample angles (radians). */
const ident = (f, g, label) => XS.forEach((x) => chk(f(x), g(x), 1e-9, `${label} at ${x}`));

concept("amath.trig.identities", { file: "trig/identities", keyPrefix: "trig.identities" }, (b) => {
  ident((x) => 1 + tan(x) ** 2, (x) => sec(x) ** 2, "1+tan2");
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "Which of these is an identity?",
    options: [
      [t`$1 + \tan^2\theta = \sec^2\theta$`, t`Correct: divide $\sin^2\theta + \cos^2\theta = 1$ by $\cos^2\theta$.`],
      [t`$1 + \sec^2\theta = \tan^2\theta$`, t`At $\theta = 0$ this gives $1 + 1 = 0$, which is false. $\tan$ and $\sec$ are the wrong way round.`],
      [t`$1 + \cot^2\theta = \sec^2\theta$`, t`$1 + \cot^2\theta$ equals $\operatorname{cosec}^2\theta$, not $\sec^2\theta$.`],
      [t`$\tan^2\theta - \sec^2\theta = 1$`, t`The difference is $-1$: $\sec^2\theta - \tan^2\theta = 1$.`],
    ],
    answer: "A",
    explanation: t`Dividing $\sin^2\theta + \cos^2\theta = 1$ by $\cos^2\theta$ gives $\tan^2\theta + 1 = \sec^2\theta$.`,
  });

  ident((x) => cosec(x) ** 2 - cot(x) ** 2, () => 1, "cosec2-cot2");
  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`$\operatorname{cosec}^2\theta - \cot^2\theta = 1$ for every $\theta$ for which both sides are defined.`,
    answer: true,
    explanation: t`True. $\operatorname{cosec}^2\theta = 1 + \cot^2\theta$ (divide $\sin^2\theta + \cos^2\theta = 1$ by $\sin^2\theta$), so the difference is 1.`,
  });

  ident((x) => cos(x) * tan(x), sin, "cos tan");
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Simplify $\cos\theta\tan\theta$.`,
    options: [
      [t`$\sin\theta$`, t`Correct: $\cos\theta \times \frac{\sin\theta}{\cos\theta} = \sin\theta$.`],
      [t`$1$`, t`That would need $\tan\theta = \frac{1}{\cos\theta}$, which is $\sec\theta$, not $\tan\theta$.`],
      [t`$\cot\theta$`, t`$\cot\theta = \frac{\cos\theta}{\sin\theta}$; here the $\cos\theta$ cancels.`],
      [t`$\sin^2\theta$`, t`Only one factor of $\sin\theta$ appears: $\tan\theta = \frac{\sin\theta}{\cos\theta}$.`],
    ],
    answer: "A",
    explanation: t`$\cos\theta\tan\theta = \cos\theta \cdot \frac{\sin\theta}{\cos\theta} = \sin\theta$.`,
  });

  ident((x) => (1 - sin(x) ** 2) / cos(x), cos, "1-sin2 over cos");
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Simplify $\dfrac{1 - \sin^2\theta}{\cos\theta}$.`,
    options: [
      [t`$\cos\theta$`, t`Correct: $1 - \sin^2\theta = \cos^2\theta$, and $\frac{\cos^2\theta}{\cos\theta} = \cos\theta$.`],
      [t`$\sec\theta$`, t`This inverts the answer; the numerator $\cos^2\theta$ has the higher power.`],
      [t`$\tan\theta$`, t`$1 - \sin^2\theta$ is $\cos^2\theta$, not $\sin\theta\cos\theta$.`],
      [t`$\cos\theta - \sin\theta$`, t`You cannot cancel $\cos\theta$ into one term of a sum; use the identity first.`],
    ],
    answer: "A",
    explanation: t`$\frac{1 - \sin^2\theta}{\cos\theta} = \frac{\cos^2\theta}{\cos\theta} = \cos\theta$.`,
  });

  ident((x) => sec(x) ** 2 - tan(x) ** 2, () => 1, "m1");
  ident((x) => sin(x) * cot(x), cos, "m2");
  ident((x) => cosec(x) ** 2 - 1, (x) => cot(x) ** 2, "m3");
  ident((x) => (1 - cos(x) ** 2) / sin(x), sin, "m4");
  b.match({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "Match each expression with its simplest form.",
    pairs: [
      [t`$\sec^2\theta - \tan^2\theta$`, t`$1$`],
      [t`$\sin\theta\cot\theta$`, t`$\cos\theta$`],
      [t`$\operatorname{cosec}^2\theta - 1$`, t`$\cot^2\theta$`],
      [t`$\dfrac{1 - \cos^2\theta}{\sin\theta}$`, t`$\sin\theta$`],
    ],
    explanation: t`$\sec^2\theta = 1 + \tan^2\theta$; $\sin\theta \cdot \frac{\cos\theta}{\sin\theta} = \cos\theta$; $\operatorname{cosec}^2\theta = 1 + \cot^2\theta$; $1 - \cos^2\theta = \sin^2\theta$.`,
  });

  ident((x) => tan(x) * cosec(x), sec, "tan cosec");
  b.expr({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Simplify $\tan x\operatorname{cosec} x$ to a single trigonometric function of $x$. Type it, e.g. cos x.`,
    accepted: ["sec x", "sec(x)", "1/cos x", "1/cos(x)", "1/(cos x)"],
    wrong: ["cot x", "cos x"],
    explanation: t`$\tan x\operatorname{cosec} x = \frac{\sin x}{\cos x} \cdot \frac{1}{\sin x} = \frac{1}{\cos x} = \sec x$.`,
  });

  ident((x) => (sec(x) ** 2 - 1) / tan(x), tan, "sec2-1 over tan");
  b.expr({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Simplify $\dfrac{\sec^2 x - 1}{\tan x}$ to a single trigonometric function of $x$. Type it, e.g. sin x.`,
    accepted: ["tan x", "tan(x)", "sin x/cos x", "sin(x)/cos(x)"],
    wrong: ["sec x", "1"],
    explanation: t`$\sec^2 x - 1 = \tan^2 x$, so the expression is $\frac{\tan^2 x}{\tan x} = \tan x$.`,
    hints: [t`Rearrange $\sec^2 x = 1 + \tan^2 x$.`],
  });

  const th8 = Math.atan(4);
  chk(sec(th8) ** 2, 17); chk(sec(th8 + Math.PI) ** 2, 17);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Given that $\tan\theta = 4$, find the value of $\sec^2\theta$.`,
    value: 17, wrong: [15, 16],
    explanation: t`$\sec^2\theta = 1 + \tan^2\theta = 1 + 16 = 17$. This holds whichever quadrant $\theta$ is in.`,
  });

  const th9 = Math.atan(3 / 2); // cot = 2/3
  chk(cot(th9), 2 / 3); chk(cosec(th9) ** 2, 13 / 9);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Given that $\cot\theta = \dfrac{2}{3}$, find the exact value of $\operatorname{cosec}^2\theta$. Give your answer as a fraction.`,
    value: 13 / 9, wrong: [5 / 9, 13 / 4],
    explanation: t`$\operatorname{cosec}^2\theta = 1 + \cot^2\theta = 1 + \frac{4}{9} = \frac{13}{9}$.`,
    hints: [t`Use $\operatorname{cosec}^2\theta = 1 + \cot^2\theta$.`],
  });

  // sin + cos = 1.2 -> sin cos = 0.22
  const th10 = Math.PI / 4 - Math.acos(1.2 / Math.SQRT2);
  chk(sin(th10) + cos(th10), 1.2); chk(sin(th10) * cos(th10), 0.22);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Given that $\sin\theta + \cos\theta = 1.2$, find the value of $\sin\theta\cos\theta$.`,
    value: 0.22, wrong: [0.44, 0.2],
    explanation: t`Square both sides: $\sin^2\theta + 2\sin\theta\cos\theta + \cos^2\theta = 1.44$. Since $\sin^2\theta + \cos^2\theta = 1$, $2\sin\theta\cos\theta = 0.44$ and $\sin\theta\cos\theta = 0.22$.`,
    hints: [t`Square $\sin\theta + \cos\theta$.`, t`Replace $\sin^2\theta + \cos^2\theta$ by 1.`],
  });

  ident((x) => 3 * sin(x) ** 2 + 5 * cos(x) ** 2, (x) => 3 + 2 * cos(x) ** 2, "3sin2+5cos2");
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Express $3\sin^2 x + 5\cos^2 x$ in the form $a + b\cos^2 x$.`,
    template: "a = {{blank:a}}, b = {{blank:b}}",
    blanks: [
      { id: "a", input: "number", accepted: [3], wrong: "5" },
      { id: "b", input: "number", accepted: [2], wrong: "8" },
    ],
    explanation: t`$3\sin^2 x + 5\cos^2 x = 3(1 - \cos^2 x) + 5\cos^2 x = 3 + 2\cos^2 x$.`,
    hints: [t`Replace $\sin^2 x$ by $1 - \cos^2 x$.`],
  });

  ident((x) => 2 * sec(x) ** 2 - 3 * tan(x) ** 2, (x) => 2 - tan(x) ** 2, "2sec2-3tan2");
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Express $2\sec^2\theta - 3\tan^2\theta$ in the form $a + b\tan^2\theta$.`,
    template: "a = {{blank:a}}, b = {{blank:b}}",
    blanks: [
      { id: "a", input: "number", accepted: [2], wrong: "-1" },
      { id: "b", input: "number", accepted: [-1], wrong: "-3" },
    ],
    explanation: t`$2\sec^2\theta - 3\tan^2\theta = 2(1 + \tan^2\theta) - 3\tan^2\theta = 2 - \tan^2\theta$.`,
    hints: [t`Replace $\sec^2\theta$ by $1 + \tan^2\theta$ and collect.`],
  });

  ident((x) => (1 - cos(x) ** 2) * (1 + cot(x) ** 2), () => 1, "p13");
  b.proof({
    d: 3, skill: "APPLICATION", calculator: false, marks: 3,
    stem: t`Prove that $(1 - \cos^2 x)(1 + \cot^2 x) \equiv 1$.`,
    points: [
      t`M1 uses $1 - \cos^2 x = \sin^2 x$.`,
      t`M1 uses $1 + \cot^2 x = \operatorname{cosec}^2 x$ (or writes $\cot^2 x = \frac{\cos^2 x}{\sin^2 x}$).`,
      t`A1 obtains $\sin^2 x \cdot \frac{1}{\sin^2 x} = 1$ with no errors.`,
    ],
    modelAnswer: t`$$
\text{LHS} = (1 - \cos^2 x)(1 + \cot^2 x)
$$

$$
= \sin^2 x \cdot \operatorname{cosec}^2 x
$$

$$
= \sin^2 x \cdot \frac{1}{\sin^2 x} = 1 = \text{RHS}
$$`,
    explanation: "Each bracket is a Pythagorean identity in disguise.",
    hints: [t`Replace each bracket using a Pythagorean identity.`],
  });

  ident((x) => cos(x) / (1 - sin(x)) - cos(x) / (1 + sin(x)), (x) => 2 * tan(x), "p14");
  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 4,
    stem: t`Prove that $\dfrac{\cos x}{1 - \sin x} - \dfrac{\cos x}{1 + \sin x} \equiv 2\tan x$.`,
    points: [
      t`M1 combines over the common denominator $(1 - \sin x)(1 + \sin x)$.`,
      t`A1 simplifies the numerator to $2\sin x\cos x$.`,
      t`M1 uses $1 - \sin^2 x = \cos^2 x$ for the denominator.`,
      t`A1 cancels to $\frac{2\sin x}{\cos x} = 2\tan x$.`,
    ],
    modelAnswer: t`$$
\text{LHS} = \frac{\cos x(1 + \sin x) - \cos x(1 - \sin x)}{(1 - \sin x)(1 + \sin x)}
$$

$$
= \frac{\cos x + \sin x\cos x - \cos x + \sin x\cos x}{1 - \sin^2 x}
$$

$$
= \frac{2\sin x\cos x}{\cos^2 x}
$$

$$
= \frac{2\sin x}{\cos x} = 2\tan x = \text{RHS}
$$`,
    explanation: "Combine the fractions, then the denominator becomes a difference of two squares and a Pythagorean identity.",
    hints: [t`$(1 - \sin x)(1 + \sin x) = 1 - \sin^2 x$.`],
  });

  ident((x) => sec(x) - cos(x), (x) => sin(x) * tan(x), "p15");
  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 3,
    stem: t`Prove that $\sec\theta - \cos\theta \equiv \sin\theta\tan\theta$.`,
    points: [
      t`M1 writes $\sec\theta - \cos\theta = \frac{1 - \cos^2\theta}{\cos\theta}$.`,
      t`M1 uses $1 - \cos^2\theta = \sin^2\theta$.`,
      t`A1 splits $\frac{\sin^2\theta}{\cos\theta} = \sin\theta \cdot \frac{\sin\theta}{\cos\theta} = \sin\theta\tan\theta$.`,
    ],
    modelAnswer: t`$$
\text{LHS} = \frac{1}{\cos\theta} - \cos\theta = \frac{1 - \cos^2\theta}{\cos\theta}
$$

$$
= \frac{\sin^2\theta}{\cos\theta} = \sin\theta \cdot \frac{\sin\theta}{\cos\theta} = \sin\theta\tan\theta = \text{RHS}
$$`,
    explanation: "Write sec as 1/cos and combine into one fraction.",
    hints: [t`Write $\sec\theta = \frac{1}{\cos\theta}$ and use a common denominator.`],
  });

  ident((x) => tan(x) ** 2 - sec(x) ** 2, () => -1, "not 1");
  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`Three of these expressions are identically equal to 1. Which one is not?`,
    options: [
      [t`$\tan^2\theta - \sec^2\theta$`, t`Correct: this equals $-1$, because $\sec^2\theta = 1 + \tan^2\theta$.`],
      [t`$\sin^2\theta + \cos^2\theta$`, "This is the basic Pythagorean identity: it equals 1."],
      [t`$\operatorname{cosec}^2\theta - \cot^2\theta$`, t`$\operatorname{cosec}^2\theta = 1 + \cot^2\theta$, so this equals 1.`],
      [t`$\sec^2\theta\cos^2\theta$`, t`$\sec\theta\cos\theta = 1$, so its square is 1.`],
    ],
    answer: "A",
    explanation: t`$\tan^2\theta - \sec^2\theta = \tan^2\theta - (1 + \tan^2\theta) = -1$. Check at $\theta = 0$: $0 - 1 = -1$.`,
    hints: [t`Test each at $\theta = 0$.`],
  });

  chk(sin(Math.PI / 4) + cos(Math.PI / 4), Math.SQRT2);
  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`$\sin\theta + \cos\theta = 1$ is an identity.`,
    answer: false,
    explanation: t`False. At $\theta = 45°$, $\sin\theta + \cos\theta = \sqrt{2} \neq 1$. The identity is $\sin^2\theta + \cos^2\theta = 1$, for the squares.`,
  });

  // Struct 1 (6): sin x tan x + cos x ≡ sec x
  ident((x) => sin(x) * tan(x) + cos(x), sec, "s1");
  chk(sec(Math.PI / 3), 2); chk(1 / 0.4, 2.5);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`This question is about the expression $E = \sin x\tan x + \cos x$.`,
    parts: [
      P.proof({ label: "(a)", marks: 3, stem: t`Show that $E \equiv \sec x$.`,
        points: [t`M1 writes $\sin x\tan x = \frac{\sin^2 x}{\cos x}$.`, t`M1 combines: $\frac{\sin^2 x + \cos^2 x}{\cos x}$.`, t`A1 uses $\sin^2 x + \cos^2 x = 1$ to reach $\frac{1}{\cos x} = \sec x$.`],
        modelAnswer: t`$$
E = \frac{\sin^2 x}{\cos x} + \cos x = \frac{\sin^2 x + \cos^2 x}{\cos x}
$$

$$
= \frac{1}{\cos x} = \sec x
$$`,
        explanation: "Write tan as sin/cos and use a common denominator." }),
      P.num({ label: "(b)", marks: 1, stem: t`Hence find the exact value of $E$ when $x = \dfrac{\pi}{3}$.`, value: 2, wrong: [0.5],
        explanation: t`$E = \sec\frac{\pi}{3} = \frac{1}{\cos(\pi/3)} = \frac{1}{1/2} = 2$.` }),
      P.num({ label: "(c)", marks: 1, stem: t`Find the value of $E$ for an angle with $\cos x = 0.4$.`, value: 2.5, wrong: [0.4],
        explanation: t`$E = \sec x = \frac{1}{0.4} = 2.5$.` }),
      P.manual({ label: "(d)", marks: 1, stem: t`Explain why $E = 0.5$ has no solutions.`,
        points: [t`States that $E = \sec x$ and $|\sec x| \geq 1$ because $|\cos x| \leq 1$, so $E$ cannot equal 0.5.`],
        modelAnswer: t`$E = \sec x = \frac{1}{\cos x}$. Since $-1 \leq \cos x \leq 1$, $\sec x \geq 1$ or $\sec x \leq -1$, so $\sec x = 0.5$ is impossible.`,
        explanation: "The secant is never strictly between −1 and 1." }),
    ],
    explanation: "Once E is simplified to sec x, every later part uses sec x = 1/cos x.",
    hints: [t`$\tan x = \frac{\sin x}{\cos x}$.`, t`$|\cos x| \leq 1$, so $|\sec x| \geq 1$.`],
  });

  // Struct 2 (7): (1 - tan²)/(1 + tan²) ≡ cos² - sin² ≡ 2cos² - 1
  ident((x) => (1 - tan(x) ** 2) / (1 + tan(x) ** 2), (x) => 2 * cos(x) ** 2 - 1, "s2");
  chk(2 * (1 / 9) - 1, -7 / 9);
  chk((1 - 4) / (1 + 4), -0.6);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`Let $F = \dfrac{1 - \tan^2\theta}{1 + \tan^2\theta}$.`,
    parts: [
      P.proof({ label: "(a)", marks: 4, stem: t`Show that $F \equiv 2\cos^2\theta - 1$.`,
        points: [t`M1 replaces the denominator by $\sec^2\theta$.`, t`M1 multiplies through by $\cos^2\theta$ (or writes $\tan^2\theta = \frac{\sin^2\theta}{\cos^2\theta}$).`, t`A1 obtains $\cos^2\theta - \sin^2\theta$.`, t`A1 uses $\sin^2\theta = 1 - \cos^2\theta$ to reach $2\cos^2\theta - 1$.`],
        modelAnswer: t`$$
F = \frac{1 - \tan^2\theta}{\sec^2\theta} = \cos^2\theta\,(1 - \tan^2\theta)
$$

$$
= \cos^2\theta - \cos^2\theta \cdot \frac{\sin^2\theta}{\cos^2\theta} = \cos^2\theta - \sin^2\theta
$$

$$
= \cos^2\theta - (1 - \cos^2\theta) = 2\cos^2\theta - 1
$$`,
        explanation: t`The denominator $1 + \tan^2\theta$ is $\sec^2\theta$, and dividing by $\sec^2\theta$ is multiplying by $\cos^2\theta$.` }),
      P.num({ label: "(b)", marks: 2, stem: t`Hence find the exact value of $F$ when $\cos\theta = \dfrac{1}{3}$. Give a fraction.`, value: -7 / 9, wrong: [-1 / 3, 7 / 9],
        explanation: t`$F = 2\left(\frac{1}{3}\right)^2 - 1 = \frac{2}{9} - 1 = -\frac{7}{9}$.` }),
      P.num({ label: "(c)", marks: 1, stem: t`Find the value of $F$ when $\tan\theta = 2$.`, value: -0.6, wrong: [-1, 0.6],
        explanation: t`Directly: $F = \frac{1 - 4}{1 + 4} = -\frac{3}{5}$.` }),
    ],
    explanation: "Spot 1 + tan²θ = sec²θ in the denominator, then use sin²θ + cos²θ = 1.",
    hints: [t`$1 + \tan^2\theta = \sec^2\theta$.`, t`Remember to square $\frac{1}{3}$.`],
  });

  ident((x) => 1 - sec(x) ** 2, (x) => -(tan(x) ** 2), "1-sec2");
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Express $1 - \sec^2\theta$ in terms of $\tan\theta$.`,
    options: [
      [t`$-\tan^2\theta$`, t`Correct: $\sec^2\theta = 1 + \tan^2\theta$, so $1 - \sec^2\theta = -\tan^2\theta$.`],
      [t`$\tan^2\theta$`, t`This is $\sec^2\theta - 1$; the order of subtraction gives a minus sign.`],
      [t`$1 - \tan^2\theta$`, t`$\sec^2\theta$ is $1 + \tan^2\theta$, not $\tan^2\theta$.`],
      [t`$-\cot^2\theta$`, t`$\cot^2\theta$ comes from the cosec identity, $\operatorname{cosec}^2\theta = 1 + \cot^2\theta$.`],
    ],
    answer: "A",
    explanation: t`$1 - \sec^2\theta = 1 - (1 + \tan^2\theta) = -\tan^2\theta$.`,
  });

  // Cards
  b.card("FORMULA", "Quotient identities", t`$\tan\theta = \frac{\sin\theta}{\cos\theta}$, $\cot\theta = \frac{\cos\theta}{\sin\theta}$`);
  b.card("FORMULA", "Basic Pythagorean identity", t`$\sin^2\theta + \cos^2\theta = 1$`, "In Cambridge's List of formulas.");
  b.card("FORMULA", t`Identity linking $\sec$ and $\tan$`, t`$\sec^2\theta = 1 + \tan^2\theta$`, t`Divide $\sin^2\theta + \cos^2\theta = 1$ by $\cos^2\theta$.`);
  b.card("FORMULA", t`Identity linking $\operatorname{cosec}$ and $\cot$`, t`$\operatorname{cosec}^2\theta = 1 + \cot^2\theta$`, t`Divide $\sin^2\theta + \cos^2\theta = 1$ by $\sin^2\theta$.`);
  b.card("DEFINITION", "Identity", "A statement true for every value of the variable for which both sides are defined (symbol ≡).");
  b.card("CONCEPT", "Setting out a proof", "Start from one side (usually the harder), transform it line by line, end with the other side; never work on both sides at once.");
  b.card("CONCEPT", "Stuck on a proof?", "Write everything in terms of sin and cos, combine fractions, then use sin² + cos² = 1.");
  b.card("FACT", t`$1 - \sin^2\theta$ and $1 - \cos^2\theta$`, t`$\cos^2\theta$ and $\sin^2\theta$; also $1 - \cos^2\theta = (1 - \cos\theta)(1 + \cos\theta)$.`);
  b.card("CONCEPT", t`Value of $\sin\theta\cos\theta$ from $\sin\theta + \cos\theta = k$`, t`Square: $1 + 2\sin\theta\cos\theta = k^2$, so $\sin\theta\cos\theta = \frac{k^2 - 1}{2}$.`);
});
