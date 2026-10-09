// W2b: amath.series.sum-to-infinity
import { concept, P, t, chk, same, gp, quad, F, ln } from "../lib.mjs";

const least = (cond) => {
  for (let n = 1; n < 1000; n++) if (cond(n)) return n;
  throw new Error("least: none");
};

concept("amath.series.sum-to-infinity", { file: "series/sum-to-infinity", keyPrefix: "series.sum-to-infinity" }, (b) => {
  b.mcq({
    d: 1, skill: "UNDERSTANDING", calculator: false,
    stem: "Which geometric series has a sum to infinity?",
    options: [
      [t`common ratio $-0.6$`, t`Correct: $|-0.6| = 0.6 < 1$, so the series converges.`],
      [t`common ratio $1.2$`, t`$|r| = 1.2 > 1$: the terms grow, so the sums grow without limit.`],
      [t`common ratio $-1$`, t`$|r| = 1$: the terms keep the same size and the sums alternate, so there is no limit.`],
      [t`common ratio $2$`, "The terms double each time; the series diverges."],
    ],
    answer: "A",
    explanation: t`A geometric series converges exactly when $-1 < r < 1$. Only $r = -0.6$ satisfies this; a negative ratio is fine as long as its size is below 1.`,
  });

  chk(gp.sumInf(36, 1 / 3), 54);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Find the sum to infinity of the geometric series $36 + 12 + 4 + \cdots$`,
    value: 54, wrong: [108, 27],
    explanation: t`$a = 36$, $r = \frac{1}{3}$: $S_\infty = \frac{36}{1 - \frac{1}{3}} = \frac{36}{\frac{2}{3}} = 54$.`,
  });

  chk(gp.sumInf(12, -1 / 3), 9);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Find the sum to infinity of the geometric series $12 - 4 + \frac{4}{3} - \cdots$`,
    value: 9, wrong: [18, 36],
    explanation: t`$r = \frac{-4}{12} = -\frac{1}{3}$, so $S_\infty = \frac{12}{1 - \left(-\frac{1}{3}\right)} = \frac{12}{\frac{4}{3}} = 9$. (Ignoring the minus sign gives 18.)`,
  });

  b.tf({
    d: 1, skill: "UNDERSTANDING", calculator: false,
    stem: t`The geometric series $1 + 1.1 + 1.21 + \cdots$ has a sum to infinity.`,
    answer: false,
    explanation: t`False. $r = 1.1 > 1$, so the terms grow and the sum increases without limit.`,
  });

  for (const n of [5, 10, 20]) chk(Math.sign(gp.sumInf(5, 0.7) - gp.sum(5, 0.7, n)), 1);
  chk(gp.sumInf(5, 0.7) - gp.sum(5, 0.7, 20), (5 * 0.7 ** 20) / 0.3);
  b.tf({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`For a geometric series with $a > 0$ and $0 < r < 1$, every partial sum $S_n$ is less than $S_\infty$.`,
    answer: true,
    explanation: t`True. $S_\infty - S_n = \frac{a}{1 - r} - \frac{a(1 - r^n)}{1 - r} = \frac{ar^n}{1 - r}$, which is positive when $a > 0$ and $0 < r < 1$. The sums increase towards $S_\infty$ without reaching it.`,
    hints: [t`Work out $S_\infty - S_n$.`],
  });

  chk(gp.sumInf(0.18, 0.01), 2 / 11);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Use a geometric series to write the recurring decimal $0.\dot{1}\dot{8} = 0.181818\ldots$ as a fraction $\frac{p}{q}$ in its lowest terms.`,
    template: "p = {{blank:p}}, q = {{blank:q}}",
    blanks: [
      { id: "p", input: "number", accepted: [2], wrong: "18" },
      { id: "q", input: "number", accepted: [11], wrong: "99" },
    ],
    explanation: t`$0.18 + 0.0018 + \cdots$ has $a = \frac{18}{100}$ and $r = \frac{1}{100}$: $S_\infty = \frac{18/100}{99/100} = \frac{18}{99} = \frac{2}{11}$.`,
    hints: [t`Two digits repeat, so $r = \frac{1}{100}$.`],
  });

  chk(0.2 + gp.sumInf(0.07, 0.1), 5 / 18); chk(F(25, 90).v, 5 / 18);
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Write $0.2\dot{7} = 0.27777\ldots$ as a fraction $\frac{p}{q}$ in its lowest terms.`,
    template: "p = {{blank:p}}, q = {{blank:q}}",
    blanks: [
      { id: "p", input: "number", accepted: [5], wrong: "27" },
      { id: "q", input: "number", accepted: [18], wrong: "99" },
    ],
    explanation: t`$0.2\dot{7} = 0.2 + (0.07 + 0.007 + \cdots)$. The bracket has $a = 0.07$, $r = 0.1$: $\frac{0.07}{0.9} = \frac{7}{90}$. Total $\frac{2}{10} + \frac{7}{90} = \frac{18 + 7}{90} = \frac{25}{90} = \frac{5}{18}$.`,
    hints: ["Only the 7 repeats: split off the 0.2 first.", t`The repeating part $0.0777\ldots$ has $r = \frac{1}{10}$.`],
  });

  chk(1 - 12 / 30, 0.6); chk(gp.sumInf(12, 0.6), 30);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "A geometric series has first term 12 and sum to infinity 30. Find the common ratio.",
    value: 0.6, prefix: "r =", wrong: [0.4, 2.5],
    explanation: t`$\frac{12}{1 - r} = 30$ gives $1 - r = 0.4$, so $r = 0.6$ (and $|r| < 1$ as required).`,
    hints: [t`Set $\frac{a}{1 - r}$ equal to 30.`],
  });

  chk(gp.sumInf(50, -0.25), 40);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`A geometric series has common ratio $-0.25$ and sum to infinity 40. Find the first term.`,
    value: 50, prefix: "a =", wrong: [30, 32],
    explanation: t`$a = S_\infty(1 - r) = 40 \times 1.25 = 50$. (Using $1 + r = 0.75$ by mistake gives 30.)`,
    hints: [t`$1 - (-0.25) = 1.25$.`],
  });

  // S∞ = 16, u2 = 3 -> 16r^2 - 16r + 3 = 0 -> r = 1/4, 3/4
  same(quad.roots(16, -16, 3), [0.25, 0.75]);
  for (const r of [0.25, 0.75]) { chk(gp.sumInf(16 * (1 - r), r), 16); chk(16 * (1 - r) * r, 3); }
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: "A geometric series has sum to infinity 16 and second term 3. Find the two possible values of the common ratio, in ascending order, and the corresponding first terms.",
    template: "r = {{blank:r1}} with a = {{blank:a1}}; r = {{blank:r2}} with a = {{blank:a2}}",
    blanks: [
      { id: "r1", input: "number", accepted: ["0.25"], wrong: "4" },
      { id: "a1", input: "number", accepted: [12], wrong: "4" },
      { id: "r2", input: "number", accepted: ["0.75"], wrong: "1.5" },
      { id: "a2", input: "number", accepted: [4], wrong: "12" },
    ],
    explanation: t`$\frac{a}{1 - r} = 16$ and $ar = 3$. Then $a = 16(1 - r)$, so $16r(1 - r) = 3$, giving $16r^2 - 16r + 3 = 0$ and $(4r - 1)(4r - 3) = 0$. $r = \frac{1}{4}$ gives $a = 12$; $r = \frac{3}{4}$ gives $a = 4$. Both satisfy $|r| < 1$.`,
    hints: [t`Write $a$ in terms of $r$ from the sum to infinity.`, "Substitute into ar = 3 to get a quadratic in r."],
  });

  chk(5 + 2 * gp.sumInf(3, 0.6), 20);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`A ball is dropped from a height of 5 m. After each bounce it rises to 0.6 of the height from which it fell. Find the total distance it travels before coming to rest.`,
    value: 20, unit: "m", wrong: [12.5, 15],
    explanation: t`First drop 5 m. The rebounds $3 + 1.8 + 1.08 + \cdots$ have $S_\infty = \frac{3}{0.4} = 7.5$ m, travelled up and down: $2 \times 7.5 = 15$ m. Total $5 + 15 = 20$ m. (Treating the whole motion as one series $\frac{5}{0.4} = 12.5$ m forgets that each rebound height is travelled twice.)`,
    hints: ["The first fall happens once; every rebound height is travelled twice."],
  });

  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Find the set of values of $x$ for which the geometric series $1 + \frac{x}{3} + \left(\frac{x}{3}\right)^2 + \cdots$ has a sum to infinity.`,
    template: "{{blank:a}} < x < {{blank:b}}",
    blanks: [
      { id: "a", input: "number", accepted: [-3], wrong: "-1" },
      { id: "b", input: "number", accepted: [3], wrong: "1" },
    ],
    explanation: t`$r = \frac{x}{3}$. Convergence needs $-1 < \frac{x}{3} < 1$, that is $-3 < x < 3$.`,
    hints: [t`Identify $r$ in terms of $x$ and apply $|r| < 1$.`],
  });

  chk(gp.sumInf(81, 1 / 3) - gp.sum(81, 1 / 3, 4), 1.5);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`For the geometric series $81 + 27 + 9 + \cdots$, find the difference between the sum to infinity and the sum of the first 4 terms.`,
    value: 1.5, wrong: [3, 120],
    explanation: t`$S_\infty = \frac{81}{2/3} = 121.5$ and $S_4 = 81 + 27 + 9 + 3 = 120$, so the difference is $1.5$. (It equals $\frac{ar^4}{1 - r} = \frac{1}{2/3}$.)`,
    hints: [t`Find $S_\infty$ and $S_4$ separately.`],
  });

  chk(gp.sumInf(5, 2 / 3), 15);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The sum to infinity of a geometric series is three times its first term. What is the common ratio?`,
    options: [
      [t`$\frac{2}{3}$`, t`Correct: $\frac{a}{1 - r} = 3a$ gives $1 - r = \frac{1}{3}$.`],
      [t`$\frac{1}{3}$`, t`This is $1 - r$, not $r$.`],
      [t`$-2$`, t`This solves $1 - r = 3$; the equation is $\frac{1}{1 - r} = 3$.`],
      [t`$3$`, "A series with ratio 3 has no sum to infinity."],
    ],
    answer: "A",
    explanation: t`Divide $\frac{a}{1 - r} = 3a$ by $a$: $\frac{1}{1 - r} = 3$, so $1 - r = \frac{1}{3}$ and $r = \frac{2}{3}$.`,
    hints: [t`Cancel $a$ from both sides.`],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: t`Explain why the geometric series $4 - 6 + 9 - 13.5 + \cdots$ does not have a sum to infinity.`,
    points: [
      t`Finds the common ratio $r = \frac{-6}{4} = -1.5$.`,
      t`States that $|r| = 1.5 \geq 1$ (the terms grow in size), so the series does not converge.`,
    ],
    modelAnswer: t`The common ratio is $r = -\frac{6}{4} = -1.5$. A sum to infinity needs $|r| < 1$, but $|r| = 1.5$, so the terms get larger in size and the partial sums swing further and further apart: there is no limit.`,
    explanation: "The sign of r does not matter; its size must be less than 1.",
    hints: ["Find r first, including its sign."],
  });

  const n16 = least((n) => gp.sumInf(1, 0.5) - gp.sum(1, 0.5, n) < 0.01);
  chk(n16, 8); chk(ln(0.005) / ln(0.5), 7.643856189774724);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`For the series $1 + \frac{1}{2} + \frac{1}{4} + \cdots$, find the least value of $n$ for which $S_n$ is within 0.01 of the sum to infinity.`,
    value: n16, prefix: "n =", wrong: [7, 100],
    explanation: t`$S_\infty = 2$ and $S_\infty - S_n = \frac{ar^n}{1 - r} = 2(0.5)^n$. Need $2(0.5)^n < 0.01$, so $0.5^n < 0.005$ and $n > \frac{\ln 0.005}{\ln 0.5} = 7.64$. So $n = 8$.`,
    hints: [t`$S_\infty - S_n = \frac{ar^n}{1 - r}$.`, "Dividing by ln 0.5 (negative) reverses the inequality."],
  });

  // Struct 1 (6): u2 = 12, u3 = 9 -> r = 0.75, a = 16; S∞ = 64; least n with S_n > 60 = 10
  chk(gp.nth(16, 0.75, 2), 12); chk(gp.nth(16, 0.75, 3), 9); chk(gp.sumInf(16, 0.75), 64);
  const n17 = least((n) => gp.sum(16, 0.75, n) > 60);
  chk(n17, 10);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: "The second and third terms of a geometric progression are 12 and 9.",
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: "Find the common ratio and the first term.", template: "r = {{blank:r}}, a = {{blank:a}}",
        blanks: [{ id: "r", input: "number", accepted: ["0.75"], wrong: "1.33" }, { id: "a", input: "number", accepted: [16], wrong: "9" }],
        explanation: t`$r = \frac{9}{12} = \frac{3}{4}$ and $a = \frac{12}{3/4} = 16$.` }),
      P.manual({ label: "(b)", marks: 1, stem: "Explain why the progression has a sum to infinity.",
        points: [t`States $|r| = \frac{3}{4} < 1$, so the series converges.`],
        modelAnswer: t`The common ratio is $\frac{3}{4}$, and $\left|\frac{3}{4}\right| < 1$, so the series converges and has a sum to infinity.`,
        explanation: "Convergence needs |r| < 1." }),
      P.num({ label: "(c)", marks: 1, stem: "Find the sum to infinity.", value: 64, wrong: [48],
        explanation: t`$S_\infty = \frac{16}{1 - 0.75} = 64$.` }),
      P.num({ label: "(d)", marks: 2, stem: t`Find the least number of terms for which $S_n$ exceeds 60.`, value: n17, prefix: "n =", wrong: [9, 15],
        explanation: t`$64(1 - 0.75^n) > 60$ gives $0.75^n < \frac{1}{16}$, so $n > \frac{\ln(1/16)}{\ln 0.75} = 9.64$. Least $n = 10$.` }),
    ],
    explanation: "Find r by dividing consecutive terms, check |r| < 1, then use S∞ and the inequality for Sₙ.",
    hints: [t`$r = \frac{u_3}{u_2}$.`, t`$S_n = S_\infty(1 - r^n)$ when $S_\infty = \frac{a}{1 - r}$.`],
  });

  // Struct 2 (9): ball from 10 m, rebound 0.4
  chk(10 * 0.4 ** 3, 0.64);
  const total = 10 + 2 * gp.sumInf(4, 0.4);
  chk(total, 70 / 3);
  const fifth = 10 + 2 * gp.sum(4, 0.4, 4);
  chk(fifth, 10 + (8 * (1 - 0.4 ** 4)) / 0.6); chk(fifth, 10 + (40 / 3) * (1 - (2 / 5) ** 4)); chk(fifth, 22.992);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`Thandeka drops a ball from a height of 10 m onto a concrete floor. Each time it bounces, it rises to $\frac{2}{5}$ of the height from which it fell.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Find the height the ball reaches after its third bounce.", value: 0.64, unit: "m", wrong: [1.6, 0.256],
        explanation: t`$10 \times 0.4^3 = 0.64$ m.` }),
      P.proof({ label: "(b)", marks: 2, stem: t`Show that the total distance travelled up to the moment the ball hits the floor for the 5th time is $10 + \dfrac{40}{3}\left(1 - \left(\frac{2}{5}\right)^4\right)$ metres.`,
        points: [t`M1 identifies the first drop (10 m) plus up-and-down journeys of $4, 1.6, 0.64, 0.256$ m (four rebounds before the 5th impact).`, t`A1 sums $2(4 + 1.6 + 0.64 + 0.256)$ as a GP with $a = 8$, $r = 0.4$, $n = 4$: $\frac{8(1 - 0.4^4)}{0.6} = \frac{40}{3}\left(1 - 0.4^4\right)$.`],
        modelAnswer: t`The ball falls 10 m to its first impact. Between the 1st and 5th impacts it makes four rebounds, of heights $4, 1.6, 0.64, 0.256$ m, each travelled up and down:

$$
2(4 + 1.6 + 0.64 + 0.256) = \frac{8(1 - 0.4^4)}{1 - 0.4} = \frac{40}{3}\left(1 - \left(\frac{2}{5}\right)^4\right)
$$

So the total is $10 + \dfrac{40}{3}\left(1 - \left(\frac{2}{5}\right)^4\right)$ metres.`,
        explanation: "Count impacts carefully: 5 impacts means 4 rebounds." }),
      P.num({ label: "(c)", marks: 1, stem: "Evaluate this distance, correct to 3 significant figures.", value: fifth, unit: "m", wrong: [10 + (8 * (1 - 0.4 ** 5)) / 0.6],
        explanation: t`$10 + \frac{8 \times 0.9744}{0.6} = 10 + 12.992 = 22.992 \approx 23.0$ m.` }),
      P.num({ label: "(d)", marks: 3, stem: "Find the total distance travelled before the ball comes to rest, according to this model.", value: total, unit: "m", wrong: [10 / 0.6, 10 + 4 / 0.6],
        explanation: t`Rebounds: $S_\infty = \frac{4}{1 - 0.4} = \frac{20}{3}$ m, travelled twice: $\frac{40}{3}$ m. Total $10 + \frac{40}{3} = \frac{70}{3} \approx 23.3$ m.` }),
      P.manual({ label: "(e)", marks: 2, stem: "The model predicts infinitely many bounces. Explain how the total distance can still be finite, and give one reason why the model is not exact.",
        points: [t`States that the rebound heights form a geometric series with $|r| = 0.4 < 1$, which converges, so the infinite sum is finite.`, "Gives a limitation, e.g. a real ball stops after a finite number of bounces, or air resistance and the size of the ball are ignored."],
        modelAnswer: t`The heights $4, 1.6, 0.64, \ldots$ shrink by the factor $0.4$; since $0.4 < 1$ the series converges and adds up to a finite number. In reality the ball stops after a few bounces (energy is also lost to air resistance and the ball is not a point), so the model is only an estimate.`,
        explanation: "A convergent series has a finite sum even though it has infinitely many terms." }),
    ],
    explanation: "The first drop happens once; every rebound height is travelled up and down, and the rebound heights form a convergent GP.",
    hints: [t`The rebound heights are $4, 1.6, 0.64, \ldots$`, "Up and down doubles each rebound distance."],
  });

  chk(gp.sumInf(1, 0.25), 4 / 3);
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`What is the sum to infinity of $1 + \frac{1}{4} + \frac{1}{16} + \cdots$?`,
    options: [
      [t`$\frac{4}{3}$`, t`Correct: $\frac{1}{1 - \frac{1}{4}} = \frac{1}{\frac{3}{4}} = \frac{4}{3}$.`],
      [t`$\frac{5}{4}$`, "This is only the sum of the first two terms."],
      [t`$\frac{3}{4}$`, t`This is $1 - r$; the sum is $\frac{a}{1 - r}$.`],
      [t`$4$`, t`This is $\frac{1}{r}$, not $\frac{a}{1 - r}$.`],
    ],
    answer: "A",
    explanation: t`$a = 1$, $r = \frac{1}{4}$, so $S_\infty = \frac{1}{1 - \frac{1}{4}} = \frac{4}{3}$.`,
  });

  b.mcq({
    d: 2, skill: "RECALL", calculator: false,
    stem: t`For which values of the common ratio $r$ does a geometric series have a sum to infinity?`,
    options: [
      [t`$-1 < r < 1$`, t`Correct: the series converges exactly when $|r| < 1$.`],
      [t`$r < 1$`, t`This includes values such as $r = -3$, for which the terms grow in size.`],
      [t`$0 < r < 1$`, t`Negative ratios such as $r = -0.5$ also give a sum to infinity.`],
      [t`$r > -1$`, t`This includes $r = 2$, for which the series diverges.`],
    ],
    answer: "A",
    explanation: t`$r^n \to 0$ only when $|r| < 1$, that is $-1 < r < 1$; then $S_\infty = \frac{a}{1 - r}$.`,
  });

  chk(gp.sumInf(2, 0.6), 5);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The geometric series $2 + 2x + 2x^2 + \cdots$ has sum to infinity 5. Find $x$.`,
    options: [
      [t`$0.6$`, t`Correct: $\frac{2}{1 - x} = 5$ gives $1 - x = 0.4$.`],
      [t`$0.4$`, t`This is $1 - x$, not $x$.`],
      [t`$2.5$`, t`This is $\frac{5}{2}$; also a ratio of 2.5 would give no sum to infinity.`],
      [t`$-1.5$`, t`This solves $1 - x = 2.5$, inverting the fraction.`],
    ],
    answer: "A",
    explanation: t`$a = 2$, $r = x$: $\frac{2}{1 - x} = 5$, so $1 - x = \frac{2}{5}$ and $x = 0.6$, which satisfies $|x| < 1$.`,
    hints: [t`The ratio of this series is $x$.`],
  });

  // Cards
  b.card("FACT", "Condition for a sum to infinity", t`$|r| < 1$, that is $-1 < r < 1$.`);
  b.card("FORMULA", "Sum to infinity of a GP", t`$S_\infty = \frac{a}{1 - r}$`, "In Cambridge's List of formulas.");
  b.card("CONCEPT", "Why the formula works", t`In $S_n = \frac{a(1 - r^n)}{1 - r}$, $r^n \to 0$ when $|r| < 1$.`);
  b.card("CONCEPT", "No sum to infinity", t`When $|r| \geq 1$ the partial sums grow without limit or oscillate.`);
  b.card("CONCEPT", "Recurring decimal as a GP", t`$0.\dot{a}\dot{b} = \frac{ab}{100} + \frac{ab}{10\,000} + \cdots$ with $r = \frac{1}{100}$.`);
  b.card("CONCEPT", "Bouncing ball total distance", "First drop + 2 × (sum to infinity of the rebound heights).");
  b.card("FORMULA", t`$S_\infty - S_n$`, t`$\frac{ar^n}{1 - r}$`);
  b.card("CONCEPT", t`Series in $x$ converges`, t`Write $r$ in terms of $x$ and solve $-1 < r < 1$.`);
});
