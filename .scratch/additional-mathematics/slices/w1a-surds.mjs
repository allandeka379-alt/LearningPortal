// W1a: amath.indices.surds (ZIMSEC only) — simplifying, expanding and rationalising surds.
import { concept, P, t, chk, same, simplifySurd } from "../lib.mjs";

const r = Math.sqrt;

concept("amath.indices.surds", { file: "indices/surds", keyPrefix: "indices.surds" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "Which of these numbers is irrational?",
    options: [
      [t`$\sqrt{20}$`, t`Correct: 20 is not a perfect square, so $\sqrt{20} = 2\sqrt{5}$ has a decimal that never ends or repeats.`],
      [t`$\sqrt{36}$`, t`$\sqrt{36} = 6$, a whole number, which is rational.`],
      [t`$0.\dot{6}$`, t`A recurring decimal is rational: $0.\dot{6} = \frac{2}{3}$.`],
      [t`$\frac{2}{7}$`, "Any fraction of two integers is rational by definition."],
    ],
    answer: "A",
    explanation: "A number is rational if it can be written as a fraction of two integers. The square root of a positive integer that is not a perfect square is irrational.",
  });

  same(simplifySurd(98).tex, t`7\sqrt{2}`);
  b.mcq({
    d: 1, skill: "APPLICATION", calculator: false,
    stem: t`Write $\sqrt{98}$ in its simplest surd form.`,
    options: [
      [t`$7\sqrt{2}$`, t`Correct: $98 = 49 \times 2$ and $\sqrt{49} = 7$.`],
      [t`$49\sqrt{2}$`, t`The square factor 49 must come out as its root, 7.`],
      [t`$2\sqrt{7}$`, t`The numbers are swapped: $2\sqrt{7} = \sqrt{28}$.`],
      [t`$7\sqrt{14}$`, t`$7\sqrt{14} = \sqrt{49 \times 14} = \sqrt{686}$, not $\sqrt{98}$.`],
    ],
    answer: "A",
    explanation: t`Use the largest square factor: $\sqrt{98} = \sqrt{49 \times 2} = 7\sqrt{2}$.`,
  });

  chk(r(45) + r(20), 5 * r(5));
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Simplify $\sqrt{45} + \sqrt{20}$, giving your answer in the form $k\sqrt{5}$.`,
    template: "k = {{blank:k}}",
    blanks: [{ id: "k", input: "number", accepted: [5], wrong: 65 }],
    explanation: t`$\sqrt{45} = 3\sqrt{5}$ and $\sqrt{20} = 2\sqrt{5}$, so the sum is $5\sqrt{5}$. (Not $\sqrt{65}$: roots of a sum do not add.)`,
  });

  same(simplifySurd(108), { k: 6, r: 3, v: 6 * r(3), tex: t`6\sqrt{3}`, s: "6√3" });
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Write $\sqrt{108}$ in the form $a\sqrt{3}$.`,
    template: "a = {{blank:a}}",
    blanks: [{ id: "a", input: "number", accepted: [6], wrong: 36 }],
    explanation: t`$108 = 36 \times 3$, so $\sqrt{108} = \sqrt{36} \times \sqrt{3} = 6\sqrt{3}$.`,
  });

  chk(r(75) - r(27) + 2 * r(12), 6 * r(3));
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Simplify $\sqrt{75} - \sqrt{27} + 2\sqrt{12}$, giving your answer in the form $k\sqrt{3}$.`,
    template: "k = {{blank:k}}",
    blanks: [{ id: "k", input: "number", accepted: [6], wrong: 4 }],
    explanation: t`$\sqrt{75} = 5\sqrt{3}$, $\sqrt{27} = 3\sqrt{3}$ and $2\sqrt{12} = 2 \times 2\sqrt{3} = 4\sqrt{3}$. So $5\sqrt{3} - 3\sqrt{3} + 4\sqrt{3} = 6\sqrt{3}$.`,
    hints: ["Simplify each surd so that every term is a multiple of √3.", "Then collect like surds as you would collect like terms."],
  });

  chk((r(7) + 2) * (r(7) - 2), 3);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Evaluate $\left(\sqrt{7} + 2\right)\left(\sqrt{7} - 2\right)$ without a calculator.`,
    value: 3, wrong: [11, 5],
    explanation: t`This is the difference of two squares: $\left(\sqrt{7}\right)^{2} - 2^{2} = 7 - 4 = 3$. The surd terms cancel.`,
  });

  chk((5 - r(3)) ** 2, 28 - 10 * r(3));
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Expand $\left(5 - \sqrt{3}\right)^{2}$, giving your answer in the form $a + b\sqrt{3}$.`,
    template: "a = {{blank:a}}, b = {{blank:b}}",
    blanks: [{ id: "a", input: "number", accepted: [28], wrong: 22 }, { id: "b", input: "number", accepted: [-10], wrong: -5 }],
    explanation: t`$\left(5 - \sqrt{3}\right)^{2} = 25 - 2 \times 5\sqrt{3} + 3 = 28 - 10\sqrt{3}$. Squaring term by term ($25 - 3 = 22$) misses the middle term.`,
    hints: [t`$(p - q)^{2} = p^{2} - 2pq + q^{2}$.`, t`$\left(\sqrt{3}\right)^{2} = 3$.`],
  });

  chk(2 * r(6) * 3 * r(10), 12 * r(15));
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Simplify $2\sqrt{6} \times 3\sqrt{10}$, giving your answer in the form $a\sqrt{b}$ where $b$ is as small as possible.`,
    template: "a = {{blank:a}}, b = {{blank:b}}",
    blanks: [{ id: "a", input: "number", accepted: [12], wrong: 6 }, { id: "b", input: "number", accepted: [15], wrong: 60 }],
    explanation: t`$2 \times 3 = 6$ and $\sqrt{6} \times \sqrt{10} = \sqrt{60} = \sqrt{4 \times 15} = 2\sqrt{15}$. So the product is $6 \times 2\sqrt{15} = 12\sqrt{15}$.`,
    hints: ["Multiply the whole numbers and the roots separately.", "Then simplify √60."],
  });

  chk(10 / r(5), 2 * r(5));
  b.expr({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Rationalise the denominator of $\dfrac{10}{\sqrt{5}}$ and simplify. Give your answer in the form a√b (type √ or sqrt).`,
    accepted: ["2√5", "2*√5"],
    rejected: [{ value: "10√5/5", feedback: "Correct so far, but simplify: 10/5 = 2." }],
    explanation: t`$\dfrac{10}{\sqrt{5}} \times \dfrac{\sqrt{5}}{\sqrt{5}} = \dfrac{10\sqrt{5}}{5} = 2\sqrt{5}$.`,
  });

  chk(12 / (4 + r(10)), 8 - 2 * r(10));
  b.fib({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`Express $\dfrac{12}{4 + \sqrt{10}}$ in the form $a + b\sqrt{10}$, where $a$ and $b$ are integers.`,
    template: "a = {{blank:a}}, b = {{blank:b}}",
    blanks: [{ id: "a", input: "number", accepted: [8], wrong: 48 }, { id: "b", input: "number", accepted: [-2], wrong: 2 }],
    explanation: t`Multiply top and bottom by the conjugate $4 - \sqrt{10}$. The denominator becomes $16 - 10 = 6$ and the numerator $48 - 12\sqrt{10}$. Dividing by 6: $8 - 2\sqrt{10}$.`,
    hints: [t`The conjugate of $4 + \sqrt{10}$ is $4 - \sqrt{10}$.`, t`$\left(4 + \sqrt{10}\right)\left(4 - \sqrt{10}\right) = 16 - 10$.`],
  });

  chk((r(5) + 1) / (r(5) - 1), 1.5 + 0.5 * r(5));
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Express $\dfrac{\sqrt{5} + 1}{\sqrt{5} - 1}$ in the form $a + b\sqrt{5}$, where $a$ and $b$ are rational. Give $a$ and $b$ as fractions or decimals.`,
    template: "a = {{blank:a}}, b = {{blank:b}}",
    blanks: [{ id: "a", input: "number", accepted: [1.5], wrong: 6 }, { id: "b", input: "number", accepted: [0.5], wrong: 2 }],
    explanation: t`Multiply top and bottom by $\sqrt{5} + 1$. Numerator: $\left(\sqrt{5} + 1\right)^{2} = 6 + 2\sqrt{5}$. Denominator: $5 - 1 = 4$. So the value is $\dfrac{6 + 2\sqrt{5}}{4} = \dfrac{3}{2} + \dfrac{1}{2}\sqrt{5}$.`,
    hints: [t`Multiply by $\dfrac{\sqrt{5} + 1}{\sqrt{5} + 1}$.`, "Divide every term of the numerator by the new denominator."],
  });

  b.tf({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`$\sqrt{16 + 9} = \sqrt{16} + \sqrt{9}$.`,
    answer: false,
    explanation: t`$\sqrt{16 + 9} = \sqrt{25} = 5$, while $\sqrt{16} + \sqrt{9} = 4 + 3 = 7$. The root of a sum is not the sum of the roots.`,
  });

  chk((r(3) + 1) * (r(3) - 1), 2);
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true, calculator: false,
    stem: t`The product $\left(\sqrt{3} + 1\right)\left(\sqrt{3} - 1\right)$ is a rational number.`,
    answer: true,
    explanation: t`Conjugates multiply to give $\left(\sqrt{3}\right)^{2} - 1^{2} = 3 - 1 = 2$, which is rational. This is why conjugates are used to rationalise denominators.`,
  });

  for (const [n, k, rr] of [[32, 4, 2], [27, 3, 3], [200, 10, 2], [80, 4, 5]]) { const s = simplifySurd(n); same([s.k, s.r], [k, rr]); }
  b.match({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "Match each surd to its simplest form.",
    pairs: [
      [t`$\sqrt{32}$`, t`$4\sqrt{2}$`],
      [t`$\sqrt{27}$`, t`$3\sqrt{3}$`],
      [t`$\sqrt{200}$`, t`$10\sqrt{2}$`],
      [t`$\sqrt{80}$`, t`$4\sqrt{5}$`],
    ],
    explanation: t`Use the largest square factor each time: $32 = 16 \times 2$, $27 = 9 \times 3$, $200 = 100 \times 2$, $80 = 16 \times 5$.`,
  });

  // conjugate of 2√3 − 1 is 2√3 + 1: (2√3)^2 − 1 = 11
  chk((2 * r(3) - 1) * (2 * r(3) + 1), 11);
  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`To rationalise the denominator of $\dfrac{5}{2\sqrt{3} - 1}$, you multiply the numerator and denominator by which expression?`,
    options: [
      [t`$2\sqrt{3} + 1$`, t`Correct: the conjugate. $\left(2\sqrt{3} - 1\right)\left(2\sqrt{3} + 1\right) = 12 - 1 = 11$.`],
      [t`$2\sqrt{3} - 1$`, t`Squaring the denominator gives $13 - 4\sqrt{3}$, which still contains a surd.`],
      [t`$\sqrt{3}$`, t`This gives $6 - \sqrt{3}$ in the denominator: still a surd.`],
      [t`$1 - 2\sqrt{3}$`, t`This is minus the denominator; the product $-\left(2\sqrt{3} - 1\right)^{2}$ still contains a surd.`],
    ],
    answer: "A",
    explanation: t`For a denominator $a\sqrt{b} - c$, multiply by its conjugate $a\sqrt{b} + c$; the product $a^{2}b - c^{2}$ is rational.`,
  });

  chk(1 / (r(5) - 2), r(5) + 2);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Which expression is equal to $\dfrac{1}{\sqrt{5} - 2}$?`,
    options: [
      [t`$\sqrt{5} + 2$`, t`Correct: multiplying by $\sqrt{5} + 2$ gives denominator $5 - 4 = 1$.`],
      [t`$\sqrt{5} - 2$`, "Rationalising multiplies by the conjugate, which has the opposite sign in the middle; this is just the denominator itself."],
      [t`$\dfrac{\sqrt{5} + 2}{9}$`, t`The denominator is $5 - 4 = 1$, not $5 + 4$: conjugates give a difference of squares.`],
      [t`$\dfrac{\sqrt{5} + 2}{3}$`, t`$\left(\sqrt{5}\right)^{2} - 2^{2} = 5 - 4 = 1$, not 3.`],
    ],
    answer: "A",
    explanation: t`$\dfrac{1}{\sqrt{5} - 2} \times \dfrac{\sqrt{5} + 2}{\sqrt{5} + 2} = \dfrac{\sqrt{5} + 2}{5 - 4} = \sqrt{5} + 2$.`,
    hints: [t`Multiply top and bottom by $\sqrt{5} + 2$.`],
  });

  chk((4 + r(3)) ** 2, 19 + 8 * r(3));
  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`The integer $a$ satisfies $\left(a + \sqrt{3}\right)^{2} = 19 + 8\sqrt{3}$. What is $a$?`,
    options: [
      [t`$4$`, t`Correct: $\left(a + \sqrt{3}\right)^{2} = a^{2} + 3 + 2a\sqrt{3}$, so $2a = 8$ and $a^{2} + 3 = 19$ both give $a = 4$.`],
      [t`$8$`, t`The middle term is $2a\sqrt{3}$, so $2a = 8$, not $a = 8$.`],
      [t`$16$`, t`$a^{2} = 16$, so $a$ itself is 4.`],
      [t`$\sqrt{19}$`, t`The rational part is $a^{2} + 3$, not $a^{2}$; and $a$ must be an integer.`],
    ],
    answer: "A",
    explanation: t`Expand: $a^{2} + 3 + 2a\sqrt{3}$. Compare the rational parts ($a^{2} + 3 = 19$) and the $\sqrt{3}$ parts ($2a = 8$): $a = 4$.`,
    hints: [t`Expand $\left(a + \sqrt{3}\right)^{2}$ and compare with $19 + 8\sqrt{3}$.`],
  });

  chk((r(12) + r(27)) / r(3), 5);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Simplify $\dfrac{\sqrt{12} + \sqrt{27}}{\sqrt{3}}$ to a whole number.`,
    value: 5, wrong: [13, 3],
    explanation: t`$\sqrt{12} + \sqrt{27} = 2\sqrt{3} + 3\sqrt{3} = 5\sqrt{3}$, and $\dfrac{5\sqrt{3}}{\sqrt{3}} = 5$.`,
    hints: [t`Write both surds in the numerator as multiples of $\sqrt{3}$.`],
  });

  chk(1 / (r(3) - 1) - 1 / (r(3) + 1), 1);
  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 3,
    stem: t`Show that $\dfrac{1}{\sqrt{3} - 1} - \dfrac{1}{\sqrt{3} + 1} = 1$.`,
    points: [
      t`M1 uses the common denominator $\left(\sqrt{3} - 1\right)\left(\sqrt{3} + 1\right) = 2$ (or rationalises each fraction)`,
      t`M1 numerator $\left(\sqrt{3} + 1\right) - \left(\sqrt{3} - 1\right) = 2$`,
      "A1 reaches 1 with no errors",
    ],
    modelAnswer: t`$$
\frac{1}{\sqrt{3} - 1} - \frac{1}{\sqrt{3} + 1} = \frac{\left(\sqrt{3} + 1\right) - \left(\sqrt{3} - 1\right)}{\left(\sqrt{3} - 1\right)\left(\sqrt{3} + 1\right)}
$$

$$
= \frac{2}{3 - 1} = \frac{2}{2} = 1
$$`,
    explanation: t`Combine over the common denominator $\left(\sqrt{3}\right)^{2} - 1 = 2$; the surds cancel in the numerator, leaving $\frac{2}{2} = 1$.`,
    hints: ["Use the product of the two denominators as a common denominator."],
  });

  // Right-angled triangle with shorter sides 3 + √2 and 3 − √2
  chk((3 + r(2)) * (3 - r(2)) / 2, 3.5);
  chk((3 + r(2)) ** 2 + (3 - r(2)) ** 2, 22);
  chk((3 - r(2)) / (3 + r(2)), (11 - 6 * r(2)) / 7);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`A right-angled triangle $PQR$ has the right angle at $Q$, $PQ = \left(3 + \sqrt{2}\right)$ cm and $QR = \left(3 - \sqrt{2}\right)$ cm. Do not use a calculator.`,
    parts: [
      P.proof({
        label: "(a)", marks: 2,
        stem: t`Show that the area of the triangle is $\frac{7}{2}$ cm².`,
        points: [t`M1 area $= \frac{1}{2}\left(3 + \sqrt{2}\right)\left(3 - \sqrt{2}\right)$ and uses $9 - 2$`, t`A1 obtains $\frac{7}{2}$`],
        modelAnswer: t`$$
\text{Area} = \tfrac{1}{2}\left(3 + \sqrt{2}\right)\left(3 - \sqrt{2}\right) = \tfrac{1}{2}(9 - 2) = \tfrac{7}{2}\ \text{cm}^2
$$`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: t`Find the exact value of $PR^{2}$.`,
        value: 22, unit: "cm²", wrong: [18, 14],
        explanation: t`$PR^{2} = \left(3 + \sqrt{2}\right)^{2} + \left(3 - \sqrt{2}\right)^{2} = \left(11 + 6\sqrt{2}\right) + \left(11 - 6\sqrt{2}\right) = 22$.`,
      }),
      P.fib({
        label: "(c)", stem: t`Express $\tan R = \dfrac{PQ}{QR}$ in the form $\dfrac{a + b\sqrt{2}}{7}$, where $a$ and $b$ are integers.`,
        template: "a = {{blank:a}}, b = {{blank:b}}",
        blanks: [{ id: "a", input: "number", accepted: [11], wrong: 9 }, { id: "b", input: "number", accepted: [6], wrong: -6 }],
        explanation: t`$\dfrac{3 + \sqrt{2}}{3 - \sqrt{2}} \times \dfrac{3 + \sqrt{2}}{3 + \sqrt{2}} = \dfrac{\left(3 + \sqrt{2}\right)^{2}}{9 - 2} = \dfrac{11 + 6\sqrt{2}}{7}$.`,
      }),
    ],
    explanation: t`The conjugate pair makes the area rational ($\frac{7}{2}$ cm²), the surd terms cancel in $PR^{2} = 22$, and rationalising gives $\tan R = \frac{11 + 6\sqrt{2}}{7}$.`,
    hints: ["Area of a right-angled triangle = ½ × base × height.", "Rationalise by multiplying top and bottom by 3 + √2."],
  });

  // x(√5 − 1) = 8 -> x = 2 + 2√5; x^2 − 4x = 16
  const xs = 8 / (r(5) - 1);
  chk(xs, 2 + 2 * r(5));
  chk(xs ** 2, 24 + 8 * r(5));
  chk(xs ** 2 - 4 * xs, 16);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`Rudo solves the equation $x\left(\sqrt{5} - 1\right) = 8$ without a calculator.`,
    parts: [
      P.fib({
        label: "(a)", marks: 3, stem: t`Find $x$ in the form $a + b\sqrt{5}$, where $a$ and $b$ are integers.`,
        template: "a = {{blank:a}}, b = {{blank:b}}",
        blanks: [{ id: "a", input: "number", accepted: [2], wrong: 8 }, { id: "b", input: "number", accepted: [2], wrong: 8 }],
        explanation: t`$x = \dfrac{8}{\sqrt{5} - 1} \times \dfrac{\sqrt{5} + 1}{\sqrt{5} + 1} = \dfrac{8\left(\sqrt{5} + 1\right)}{4} = 2 + 2\sqrt{5}$.`,
      }),
      P.proof({
        label: "(b)", marks: 2, stem: t`Show that $x^{2} = 24 + 8\sqrt{5}$.`,
        points: [t`M1 expands $\left(2 + 2\sqrt{5}\right)^{2} = 4 + 8\sqrt{5} + 20$`, t`A1 obtains $24 + 8\sqrt{5}$`],
        modelAnswer: t`$$
x^{2} = \left(2 + 2\sqrt{5}\right)^{2} = 4 + 2 \times 2 \times 2\sqrt{5} + 4 \times 5 = 24 + 8\sqrt{5}
$$`,
      }),
      P.num({
        label: "(c)", marks: 2, stem: t`Hence find the exact value of $x^{2} - 4x$.`,
        value: 16, wrong: [32, 8],
        explanation: t`$x^{2} - 4x = \left(24 + 8\sqrt{5}\right) - \left(8 + 8\sqrt{5}\right) = 16$.`,
      }),
    ],
    explanation: t`Rationalising gives $x = 2 + 2\sqrt{5}$; squaring gives $24 + 8\sqrt{5}$; the $\sqrt{5}$ terms cancel in $x^{2} - 4x = 16$.`,
    hints: [t`Divide by $\sqrt{5} - 1$, then rationalise.`, t`$\left(2\sqrt{5}\right)^{2} = 4 \times 5 = 20$.`],
  });

  b.card("DEFINITION", "Surd", t`An irrational root of a positive integer, such as $\sqrt{3}$ or $2\sqrt{7}$. $\sqrt{16} = 4$ is not a surd.`);
  b.card("DEFINITION", "Irrational number", "A real number that cannot be written as a fraction of two integers; its decimal never ends and never repeats.");
  b.card("FORMULA", "Multiplying and dividing roots", t`$\sqrt{ab} = \sqrt{a}\sqrt{b}$, $\sqrt{\dfrac{a}{b}} = \dfrac{\sqrt{a}}{\sqrt{b}}$, $\sqrt{a} \times \sqrt{a} = a$.`);
  b.card("CONCEPT", "How do you simplify a surd?", t`Split the number using its largest square factor: $\sqrt{63} = \sqrt{9 \times 7} = 3\sqrt{7}$.`);
  b.card("FACT", t`Is $\sqrt{a + b} = \sqrt{a} + \sqrt{b}$?`, t`No. For example $\sqrt{36 + 64} = 10$ but $\sqrt{36} + \sqrt{64} = 14$.`);
  b.card("CONCEPT", t`Rationalise $\dfrac{k}{\sqrt{b}}$`, t`Multiply top and bottom by $\sqrt{b}$: $\dfrac{k\sqrt{b}}{b}$.`);
  b.card("CONCEPT", t`Rationalise $\dfrac{k}{a + \sqrt{b}}$`, t`Multiply top and bottom by the conjugate $a - \sqrt{b}$; the denominator becomes $a^{2} - b$.`);
  b.card("FORMULA", "Product of conjugates", t`$\left(a + \sqrt{b}\right)\left(a - \sqrt{b}\right) = a^{2} - b$, a rational number.`);
  b.card("FACT", "Like surds", t`Only multiples of the same surd can be added: $4\sqrt{6} - \sqrt{6} = 3\sqrt{6}$, but $\sqrt{2} + \sqrt{3}$ does not simplify.`);
});
