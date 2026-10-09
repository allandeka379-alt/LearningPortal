// W2b: amath.series.geometric
import { concept, P, t, chk, same, gp, ap, lg, ln, money } from "../lib.mjs";

/** Least n ≥ 0 with cond(n). */
const least = (cond) => {
  for (let n = 0; n < 1000; n++) if (cond(n)) return n;
  throw new Error("least: none");
};

concept("amath.series.geometric", { file: "series/geometric", keyPrefix: "series.geometric" }, (b) => {
  chk(27 / 81, 1 / 3);
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`What is the common ratio of the geometric progression $81, 27, 9, 3, \ldots$?`,
    options: [
      [t`$\frac{1}{3}$`, t`Correct: $\frac{27}{81} = \frac{1}{3}$; each term is a third of the one before.`],
      [t`$3$`, t`This is $\frac{81}{27}$, earlier over later. The ratio is later over earlier.`],
      [t`$-54$`, "This is the difference 27 − 81; a GP has a constant ratio, not a constant difference."],
      [t`$-\frac{1}{3}$`, "The terms are all positive, so the ratio is positive."],
    ],
    answer: "A",
    explanation: t`$r = \frac{u_2}{u_1} = \frac{27}{81} = \frac{1}{3}$.`,
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Which of these sequences is a geometric progression?",
    options: [
      [t`$5, -10, 20, -40, \ldots$`, t`Correct: each term is $-2$ times the one before.`],
      [t`$5, 10, 15, 20, \ldots$`, "This has a constant difference of 5: it is arithmetic."],
      [t`$5, 10, 20, 35, \ldots$`, t`$\frac{10}{5} = 2$ but $\frac{35}{20} = 1.75$: the ratio is not constant.`],
      [t`$5, -5, -15, -25, \ldots$`, "This has a constant difference of −10: it is arithmetic."],
    ],
    answer: "A",
    explanation: t`Check the ratio of neighbouring terms: $\frac{-10}{5} = \frac{20}{-10} = \frac{-40}{20} = -2$. A negative ratio makes the signs alternate.`,
  });

  chk(gp.nth(2, 2, 8), 256);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Find the 8th term of the geometric progression $2, 4, 8, \ldots$`,
    value: 256, wrong: [512, 16],
    explanation: t`$a = 2$, $r = 2$: $u_8 = 2 \times 2^7 = 256$. (Using $2^8$ as the power gives 512.)`,
  });

  chk(gp.sum(1, 3, 6), 364);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Find the sum of the first 6 terms of the geometric series $1 + 3 + 9 + \cdots$`,
    value: 364, wrong: [243, 729],
    explanation: t`$S_6 = \frac{1(3^6 - 1)}{3 - 1} = \frac{728}{2} = 364$. (243 is the 6th term.)`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "The terms of a geometric progression with a negative common ratio alternate in sign.",
    answer: true,
    explanation: t`True. Multiplying by a negative number changes the sign each time: for example $3, -6, 12, -24, \ldots$ with $r = -2$.`,
  });

  // u2 = 12, u5 = 96 -> r = 2, a = 6; u10 = 3072
  chk(gp.nth(6, 2, 2), 12); chk(gp.nth(6, 2, 5), 96); chk(gp.nth(6, 2, 10), 3072);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "The 2nd term of a geometric progression is 12 and the 5th term is 96. Find the 10th term.",
    value: 3072, wrong: [6144, 1536],
    explanation: t`$ar = 12$ and $ar^4 = 96$. Dividing: $r^3 = 8$, so $r = 2$ and $a = 6$. Then $u_{10} = 6 \times 2^9 = 3072$.`,
    hints: [t`Divide $ar^4$ by $ar$ to find $r^3$.`],
  });

  chk(gp.nth(2, 3, 2), 6); chk(gp.nth(2, 3, 4), 54);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "All the terms of a geometric progression are positive. The 2nd term is 6 and the 4th term is 54. Find the first term and the common ratio.",
    template: "a = {{blank:a}}, r = {{blank:r}}",
    blanks: [
      { id: "a", input: "number", accepted: [2], wrong: "-2" },
      { id: "r", input: "number", accepted: [3], wrong: "-3" },
    ],
    explanation: t`$ar^3 \div ar = r^2 = 9$, so $r = \pm 3$. All terms positive means $r = 3$, and then $a = \frac{6}{3} = 2$.`,
    hints: [t`$r^2 = 9$ has two solutions; use the condition in the question.`],
  });

  chk(gp.sum(64, -0.5, 8), 42.5);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the sum of the first 8 terms of the geometric series $64 - 32 + 16 - \cdots$`,
    value: 42.5, wrong: [127.5, 85],
    explanation: t`$a = 64$, $r = -\frac{1}{2}$: $S_8 = \frac{64\left(1 - \left(-\frac{1}{2}\right)^8\right)}{1 + \frac{1}{2}} = \frac{64 \times \frac{255}{256}}{\frac{3}{2}} = 42.5$. (Using $r = +\frac{1}{2}$ gives 127.5.)`,
    hints: [t`The ratio is negative: $r = -\frac{1}{2}$.`],
  });

  const amt = 500 * 1.06 ** 10;
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Farai invests ${money(500)} in an account paying 6% compound interest per year. Find the amount in the account after 10 years, in US dollars correct to 2 decimal places.`,
    value: amt, dp: 2, wrong: [500 * 1.06 ** 9, 800],
    explanation: t`The amount is multiplied by 1.06 each year: $500 \times 1.06^{10} = 895.42$, so ${money(895.42)}. (Simple interest would give ${money(800)}.)`,
    hints: ["6% interest means multiplying by 1.06 each year."],
  });

  const n10 = least((n) => gp.sum(3, 2, n) > 5000);
  chk(n10, 11); chk(gp.sum(3, 2, 10), 3069); chk(gp.sum(3, 2, 11), 6141);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`Find the least number of terms of the geometric series $3 + 6 + 12 + \cdots$ whose sum exceeds 5000.`,
    value: n10, prefix: "n =", wrong: [10, 12],
    explanation: t`$S_n = 3(2^n - 1) > 5000$ gives $2^n > 1667.7$, so $n > \frac{\lg 1667.7}{\lg 2} = 10.70$. The least $n$ is 11. Check: $S_{10} = 3069$, $S_{11} = 6141$.`,
    hints: [t`Simplify $S_n$, then take logarithms.`],
  });

  const n11 = least((n) => 40000 * 0.8 ** n < 10000);
  chk(n11, 7); chk(ln(0.25) / ln(0.8), 6.212567439010781);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`A tractor bought for ${money(40000)} loses 20% of its value each year. After how many complete years is its value first less than ${money(10000)}?`,
    value: n11, wrong: [6, 4],
    explanation: t`$40\,000 \times 0.8^n < 10\,000$ gives $0.8^n < 0.25$. Then $n\ln 0.8 < \ln 0.25$; dividing by $\ln 0.8 < 0$ reverses the sign: $n > 6.21$. So after 7 complete years.`,
    hints: ["Losing 20% means multiplying by 0.8.", "Dividing by the logarithm of a number less than 1 reverses the inequality."],
  });

  // x - 2, x + 2, x + 10 in GP -> x = 6
  chk((6 + 2) ** 2, (6 - 2) * (6 + 10));
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The numbers $x - 2$, $x + 2$ and $x + 10$ are consecutive terms of a geometric progression. Find $x$.`,
    value: 6, prefix: "x =", wrong: [-6, 2],
    explanation: t`Equal ratios: $\frac{x + 2}{x - 2} = \frac{x + 10}{x + 2}$, so $(x + 2)^2 = (x - 2)(x + 10)$. Then $x^2 + 4x + 4 = x^2 + 8x - 20$, so $4x = 24$ and $x = 6$. The terms are $4, 8, 16$.`,
    hints: [t`For a GP, (middle term)$^2$ = (first) × (third).`],
  });

  for (const n of [1, 2, 6]) chk(3 * (2 ** n - 1), gp.sum(3, 2, n));
  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`The sum of the first $n$ terms of a geometric progression is $S_n = 3(2^n - 1)$. What is the common ratio?`,
    options: [
      [t`$2$`, t`Correct: $S_1 = 3$ and $S_2 = 9$, so $u_2 = 6$ and $r = \frac{6}{3} = 2$.`],
      [t`$3$`, "3 is the first term (S₁), not the ratio."],
      [t`$6$`, "6 is the second term, not the ratio between terms."],
      [t`$\frac{1}{2}$`, "This is the ratio of the first term to the second."],
    ],
    answer: "A",
    explanation: t`$u_1 = S_1 = 3$, $u_2 = S_2 - S_1 = 9 - 3 = 6$, so $r = 2$. This matches $\frac{a(r^n - 1)}{r - 1}$ with $a = 3$, $r = 2$.`,
    hints: [t`Find $u_1 = S_1$ and $u_2 = S_2 - S_1$.`],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each sequence with its description.",
    pairs: [
      [t`$3, 12, 48, \ldots$`, "geometric, ratio 4"],
      [t`$3, 7, 11, \ldots$`, "arithmetic, difference 4"],
      [t`$48, 12, 3, \ldots$`, t`geometric, ratio $\frac{1}{4}$`],
      [t`$11, 7, 3, \ldots$`, "arithmetic, difference −4"],
    ],
    explanation: "Check differences and ratios of neighbouring terms: a constant difference means arithmetic, a constant ratio means geometric; direction gives the sign or size.",
  });

  for (const n of [1, 2, 3, 7]) chk(80 * 0.5 ** (n - 1), 160 / 2 ** n);
  b.expr({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find an expression for the $n$th term of the geometric progression $80, 40, 20, \ldots$ Type powers with ^, e.g. 7*3^(n-1).`,
    accepted: ["80(1/2)^(n-1)", "80*(1/2)^(n-1)", "80(0.5)^(n-1)", "80*0.5^(n-1)", "80(0.5^(n-1))", "160/2^n", "160(0.5)^n", "160*0.5^n", "160*(1/2)^n", "80/2^(n-1)", "160(1/2)^n"],
    wrong: ["80(1/2)^n", "80-40(n-1)"],
    explanation: t`$a = 80$, $r = \frac{1}{2}$: $u_n = 80\left(\frac{1}{2}\right)^{n-1}$, which can also be written $\frac{160}{2^n}$.`,
    hints: [t`Use $u_n = ar^{n-1}$.`],
  });

  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 3,
    stem: t`Prove that the sum of the first $n$ terms of a geometric progression with first term $a$ and common ratio $r \neq 1$ is $S_n = \dfrac{a(1 - r^n)}{1 - r}$.`,
    points: [
      t`M1 writes $S_n = a + ar + \cdots + ar^{n-1}$ and $rS_n = ar + ar^2 + \cdots + ar^n$.`,
      t`M1 subtracts to get $S_n - rS_n = a - ar^n$.`,
      t`A1 factorises and divides by $1 - r$ (valid as $r \neq 1$).`,
    ],
    modelAnswer: t`$$
S_n = a + ar + ar^2 + \cdots + ar^{n-1}
$$

$$
rS_n = ar + ar^2 + \cdots + ar^{n-1} + ar^n
$$

Subtracting, the middle terms cancel:

$$
S_n - rS_n = a - ar^n
$$

$$
S_n(1 - r) = a(1 - r^n) \Rightarrow S_n = \frac{a(1 - r^n)}{1 - r}
$$`,
    explanation: "Multiplying by r shifts every term one place, so subtracting leaves only the first and last terms.",
    hints: [t`Multiply $S_n$ by $r$ and subtract.`],
  });

  // Struct 1 (7): GP = AP terms 1, 3, 7 -> a = 2d, r = 2
  chk(gp.nth(10, 2, 2), ap.nth(10, 5, 3)); chk(gp.nth(10, 2, 3), ap.nth(10, 5, 7)); chk(gp.sum(10, 2, 10), 10230);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`An arithmetic progression has first term $a$ and common difference $d$, where $d \neq 0$. Its 1st, 3rd and 7th terms are the first three terms of a geometric progression.`,
    parts: [
      P.proof({ label: "(a)", marks: 3, stem: t`Show that $a = 2d$.`,
        points: [t`M1 uses the GP condition $(a + 2d)^2 = a(a + 6d)$.`, t`M1 expands: $a^2 + 4ad + 4d^2 = a^2 + 6ad$, so $4d^2 = 2ad$.`, t`A1 divides by $2d$ (allowed as $d \neq 0$) to obtain $a = 2d$.`],
        modelAnswer: t`$$
(a + 2d)^2 = a(a + 6d)
$$

$$
a^2 + 4ad + 4d^2 = a^2 + 6ad
$$

$$
4d^2 = 2ad \Rightarrow 2d = a \quad (d \neq 0)
$$`,
        explanation: "Three numbers are in GP when the square of the middle one equals the product of the outer two." }),
      P.num({ label: "(b)", marks: 1, stem: "Find the common ratio of the geometric progression.", value: 2, wrong: [3],
        explanation: t`$r = \frac{a + 2d}{a} = \frac{2d + 2d}{2d} = 2$.` }),
      P.num({ label: "(c)", marks: 1, stem: t`Given that $a = 10$, find $d$.`, value: 5, wrong: [20],
        explanation: t`$d = \frac{a}{2} = 5$. The AP is $10, 15, 20, 25, 30, 35, 40, \ldots$ and the GP is $10, 20, 40, \ldots$` }),
      P.num({ label: "(d)", marks: 2, stem: t`With $a = 10$, find the sum of the first 10 terms of the geometric progression.`, value: 10230, wrong: [5120, 10240],
        explanation: t`$S_{10} = \frac{10(2^{10} - 1)}{2 - 1} = 10 \times 1023 = 10\,230$.` }),
    ],
    explanation: "Translate 'terms in GP' into (middle)² = first × third, then solve for the relationship between a and d.",
    hints: [t`The 3rd term of the AP is $a + 2d$ and the 7th is $a + 6d$.`, "Cancel d only because d ≠ 0."],
  });

  // Struct 2 (9): population growth with logs, and comparison with an AP
  const p5 = 25000 * 1.04 ** 5;
  const nDouble = least((n) => 25000 * 1.04 ** n > 50000);
  chk(nDouble, 18); chk(lg(2) / lg(1.04), 17.672987685129698);
  const nBeat = least((n) => 25000 * 1.04 ** n > 38000 + 800 * n);
  chk(nBeat, 20);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: "The population of a town near Masvingo is 25 000 and is growing by 4% each year. A second town has 38 000 people and grows by 800 people each year.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Find the population of the first town after 5 years, to the nearest whole number.", value: p5, dp: 0, wrong: [30000, 25000 * 1.04 ** 4],
        explanation: t`$25\,000 \times 1.04^5 = 30\,416.3$, so about 30 416 people. (20% simple growth would give 30 000.)` }),
      P.proof({ label: "(b)", marks: 2, stem: t`Show that the first town's population is more than 50 000 when $n > \dfrac{\lg 2}{\lg 1.04}$, where $n$ is the number of years.`,
        points: [t`M1 forms $25\,000 \times 1.04^n > 50\,000$ and simplifies to $1.04^n > 2$.`, t`A1 takes logarithms: $n\lg 1.04 > \lg 2$, and divides by $\lg 1.04 > 0$.`],
        modelAnswer: t`$$
25\,000 \times 1.04^n > 50\,000 \Rightarrow 1.04^n > 2
$$

$$
n\lg 1.04 > \lg 2 \Rightarrow n > \frac{\lg 2}{\lg 1.04}
$$

(the inequality keeps its direction because $\lg 1.04 > 0$).`,
        explanation: "Divide by 25 000 first, then take logarithms." }),
      P.num({ label: "(c)", marks: 2, stem: "Hence find the least number of complete years after which the first town's population is more than 50 000.", value: nDouble, wrong: [17, 25],
        explanation: t`$\frac{\lg 2}{\lg 1.04} = 17.67$, so 18 complete years.` }),
      P.num({ label: "(d)", marks: 3, stem: "Find the least number of complete years after which the first town has more people than the second town.", value: nBeat, wrong: [19, 21],
        explanation: t`Compare $25\,000 \times 1.04^n$ with $38\,000 + 800n$: after 19 years, $52\,671 < 53\,200$; after 20 years, $54\,778 > 54\,000$. So 20 years.` }),
    ],
    explanation: "Percentage growth is geometric (multiply by 1.04 each year); a fixed increase each year is arithmetic.",
    hints: ["Growth of 4% multiplies by 1.04.", "In (d) there is no simple algebraic solution: compare the two populations year by year near the answer."],
  });

  chk(gp.nth(3, -2, 5), 48);
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`A geometric progression has first term 3 and common ratio $-2$. What is its 5th term?`,
    options: [
      ["48", t`Correct: $3 \times (-2)^4 = 3 \times 16 = 48$.`],
      ["−48", t`$(-2)^4$ is positive: an even power of a negative number.`],
      ["−96", t`This is $3 \times (-2)^5$, the 6th term.`],
      ["11", t`This adds $-2$ repeatedly in the wrong direction; a GP multiplies by the ratio.`],
    ],
    answer: "A",
    explanation: t`$u_5 = ar^4 = 3(-2)^4 = 48$. The terms are $3, -6, 12, -24, 48$.`,
  });

  chk(Math.sqrt(4 * 25), 10);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The numbers $4$, $x$ and $25$ are consecutive terms of a geometric progression, and $x > 0$. Find $x$.`,
    options: [
      ["10", t`Correct: $x^2 = 4 \times 25 = 100$, so $x = 10$ (ratio $\frac{5}{2}$).`],
      ["14.5", t`This is the arithmetic mean $\frac{4 + 25}{2}$, which would make an AP.`],
      ["100", t`This is $x^2$; take the square root.`],
      ["21", "This is the difference 25 − 4, not a term between them."],
    ],
    answer: "A",
    explanation: t`Equal ratios: $\frac{x}{4} = \frac{25}{x}$, so $x^2 = 100$ and $x = 10$ (positive).`,
    hints: [t`In a GP, (middle term)$^2$ = first × third.`],
  });

  // Cards
  b.card("DEFINITION", "Geometric progression", t`A sequence with a constant ratio $r = \frac{u_{n+1}}{u_n}$ between neighbouring terms.`);
  b.card("FORMULA", "nth term of a GP", t`$u_n = ar^{n-1}$`);
  b.card("FORMULA", "Sum of the first n terms of a GP", t`$S_n = \frac{a(1 - r^n)}{1 - r} = \frac{a(r^n - 1)}{r - 1}$, $r \neq 1$`, "In Cambridge's List of formulas.");
  b.card("CONCEPT", "AP or GP?", "Constant difference: arithmetic. Constant ratio: geometric.");
  b.card("CONCEPT", "Finding r from two terms", t`Divide the terms: e.g. $\frac{ar^5}{ar^2} = r^3$.`);
  b.card("CONCEPT", t`Finding $n$ in $ar^{n-1} > k$`, "Take logarithms of both sides; dividing by the log of a number below 1 reverses the inequality.");
  b.card("FACT", "Growth or decay of p% per period", t`Multiply by $1 + \frac{p}{100}$ (growth) or $1 - \frac{p}{100}$ (decay) each period.`);
  b.card("FACT", "Three numbers in GP", t`$x, y, z$ are in GP when $y^2 = xz$.`);
  b.card("CONCEPT", "Proof of the GP sum", t`Write $S_n$ and $rS_n$ and subtract: $S_n(1 - r) = a(1 - r^n)$.`);
});
