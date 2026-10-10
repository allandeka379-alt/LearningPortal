// W1b: amaths.series.geometric
import { concept, P, t, chk, same, gp, ap, money, rnd } from "../lib.mjs";

const N = (id, x, wrong, marks) => ({ id, input: "number", accepted: [x], wrong, ...(marks ? { marks } : {}) });
const least = (cond) => {
  for (let n = 1; n < 100000; n++) if (cond(n)) return n;
  throw new Error("least: none");
};

concept("amaths.series.geometric", { file: "series/geometric", keyPrefix: "series.geometric" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`What is the common ratio of the geometric progression $6, -3, 1.5, -0.75, \ldots$?`,
    options: [
      [t`$-\frac{1}{2}$`, t`Correct: $\frac{-3}{6} = -\frac{1}{2}$, and the signs alternate.`],
      [t`$\frac{1}{2}$`, "The signs alternate, so the ratio must be negative."],
      [t`$-2$`, t`This is $\frac{6}{-3}$, earlier over later; the ratio is later over earlier.`],
      [t`$-9$`, "This is the difference −3 − 6; a GP has a constant ratio, not a constant difference."],
    ],
    answer: "A",
    explanation: t`$r = \frac{u_2}{u_1} = \frac{-3}{6} = -\frac{1}{2}$; check $\frac{1.5}{-3} = -\frac{1}{2}$.`,
  });

  chk(gp.nth(5, 2, 8), 640);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`Find the 8th term of the geometric progression $5, 10, 20, \ldots$`,
    value: 640, wrong: [1280, 40],
    explanation: t`$u_8 = 5 \times 2^7 = 640$. (Using $2^8$ gives 1280.)`,
  });

  chk(gp.sum(2, 3, 8), 6560);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`Find the sum of the first 8 terms of the geometric series $2 + 6 + 18 + \cdots$`,
    value: 6560, wrong: [4374, 13120],
    explanation: t`$S_8 = \frac{2(3^8 - 1)}{3 - 1} = 3^8 - 1 = 6560$. (4374 is the 8th term.)`,
  });

  chk(gp.sumInf(45, 1 / 3), 67.5); chk(45 / (1 + 1 / 3), 33.75);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Find the sum to infinity of the geometric series $45 + 15 + 5 + \cdots$`,
    value: 67.5, wrong: [33.75, 65],
    explanation: t`$r = \frac{1}{3}$, $|r| < 1$: $S_\infty = \frac{45}{1 - \frac{1}{3}} = \frac{45}{\frac{2}{3}} = 67.5$. (33.75 uses $1 + r$ in the denominator; 65 is just the sum of the three terms shown.)`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`A geometric series with first term 4 and common ratio $1.2$ has a sum to infinity of $\frac{4}{1 - 1.2} = -20$.`,
    answer: false,
    explanation: t`A sum to infinity exists only when $|r| < 1$. With $r = 1.2$ the terms grow, so the series diverges; the formula gives a meaningless value.`,
  });

  chk(gp.nth(3, -2, 3), 12); chk(gp.nth(3, -2, 6), -96);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "The 3rd term of a geometric progression is 12 and the 6th term is −96. Find the first term and the common ratio.",
    template: "a = {{blank:a}}, r = {{blank:r}}",
    blanks: [N("a", 3, "-3"), N("r", -2, "2")],
    explanation: t`$ar^2 = 12$, $ar^5 = -96$. Dividing: $r^3 = -8$, so $r = -2$; then $a = \frac{12}{4} = 3$.`,
    hints: [t`Divide $ar^5$ by $ar^2$.`],
  });

  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`For which values of $x$ does the series $1 + 2x + 4x^2 + 8x^3 + \cdots$ have a sum to infinity?`,
    options: [
      [t`$-\frac{1}{2} < x < \frac{1}{2}$`, t`Correct: the ratio is $2x$, and $|2x| < 1$ gives $|x| < \frac{1}{2}$.`],
      [t`$-1 < x < 1$`, t`This uses $|x| < 1$, but the ratio is $2x$, not $x$.`],
      [t`$-2 < x < 2$`, t`This divides the wrong way: $|2x| < 1$ means $|x| < \frac{1}{2}$.`],
      [t`$0 < x < \frac{1}{2}$`, t`Negative $x$ also works: $|2x| < 1$ allows $-\frac{1}{2} < x < 0$.`],
    ],
    answer: "A",
    explanation: t`$r = \frac{2x}{1} = 2x$. A sum to infinity exists when $|2x| < 1$, i.e. $-\frac{1}{2} < x < \frac{1}{2}$; it is then $\frac{1}{1 - 2x}$.`,
    hints: ["Find the common ratio in terms of x."],
  });

  chk(gp.sumInf(3, 0.4), 5);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "A geometric series has first term 3 and sum to infinity 5. Find the common ratio.",
    value: 0.4, prefix: "r =", wrong: [0.6, 2.5],
    explanation: t`$\frac{3}{1 - r} = 5 \Rightarrow 1 - r = 0.6 \Rightarrow r = 0.4$.`,
    hints: [t`Use $S_\infty = \frac{a}{1 - r}$.`],
  });

  const n9 = least((n) => gp.sum(4, 1.5, n) > 1000);
  chk(n9, 12);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`Find the least number of terms of the geometric series $4 + 6 + 9 + \cdots$ whose sum exceeds 1000.`,
    value: n9, prefix: "n =", wrong: [11, 13],
    explanation: t`$r = 1.5$: $S_n = \frac{4(1.5^n - 1)}{0.5} = 8(1.5^n - 1) > 1000 \Rightarrow 1.5^n > 126 \Rightarrow n > \frac{\ln 126}{\ln 1.5} = 11.93$. So $n = 12$.`,
    hints: [t`Simplify $S_n$, then take logarithms.`],
  });

  const n10 = least((n) => 24 - gp.sum(12, 0.5, n) < 0.01);
  chk(n10, 12);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`For the geometric series $12 + 6 + 3 + \cdots$, find the least $n$ for which the sum to infinity exceeds the sum of the first $n$ terms by less than $0.01$.`,
    value: n10, prefix: "n =", wrong: [11, 2400],
    explanation: t`$S_\infty = 24$ and $S_\infty - S_n = 24 \times 0.5^n$. Need $24 \times 0.5^n < 0.01$, so $0.5^n < \frac{1}{2400}$ and $n > \frac{\ln 2400}{\ln 2} = 11.23$. Least $n = 12$.`,
    hints: [t`$S_\infty - S_n = \frac{ar^n}{1 - r}$.`, "Dividing by ln 0.5 reverses the inequality."],
  });

  for (const k of [6, -2]) chk((k + 6) ** 2, 4 * k * k);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The numbers $k$, $k + 6$ and $4k$, where $k > 0$, are consecutive terms of a geometric progression. Find $k$ and the common ratio.`,
    template: "k = {{blank:k}}, r = {{blank:r}}",
    blanks: [N("k", 6, "-2"), N("r", 2, "-2")],
    explanation: t`$(k + 6)^2 = 4k^2 \Rightarrow k + 6 = \pm 2k$. $k > 0$ gives $k = 6$: the terms are $6, 12, 24$, so $r = 2$. ($k = -2$ is rejected.)`,
    hints: [t`In a GP, (middle)$^2$ = first × third.`],
  });

  // 1st, 3rd, 9th terms of AP in GP → d = a, r = 3
  for (const a of [1, 5]) { chk((a + 2 * a) ** 2, a * (a + 8 * a)); chk(ap.nth(a, a, 3) / a, 3); }
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`The 1st, 3rd and 9th terms of an arithmetic progression with non-zero common difference are the first three terms of a geometric progression. Find the common ratio of the geometric progression.`,
    value: 3, prefix: "r =", wrong: [2, 9],
    explanation: t`$(a + 2d)^2 = a(a + 8d) \Rightarrow a^2 + 4ad + 4d^2 = a^2 + 8ad \Rightarrow 4d^2 = 4ad \Rightarrow d = a$ (as $d \neq 0$). Then $r = \frac{a + 2d}{a} = \frac{3a}{a} = 3$.`,
    hints: [t`Write the terms as $a$, $a + 2d$, $a + 8d$ and use $b^2 = ac$.`, "Cancel d, which is not zero."],
  });

  const v13 = 40000 * 0.85 ** 5;
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A tractor bought for ${money(40000)} loses 15% of its value each year. What is its value after 5 years, to the nearest dollar?`,
    options: [
      [money(Math.round(v13)), t`Correct: $40\,000 \times 0.85^5 = 17\,748.21$.`],
      [money(10000), t`This subtracts 15% of the original price each year (simple depreciation): $40\,000 - 5 \times 6000$.`],
      [money(Math.round(40000 * 0.85 ** 4)), t`This uses $0.85^4$: only 4 years of depreciation.`],
      [money(Math.round(40000 * 0.15 ** 5)), t`This multiplies by 0.15, the part lost, instead of 0.85, the part kept.`],
    ],
    answer: "A",
    explanation: t`Each year the value is multiplied by $1 - 0.15 = 0.85$: after 5 years ${money(40000)} $\times 0.85^5 \approx$ ${money(Math.round(v13))}.`,
    hints: ["Losing 15% means keeping 85%."],
  });
  chk(Math.round(v13), 17748);

  chk(8 + 2 * gp.sumInf(6, 0.75), 56);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`A ball is dropped from a height of 8 m. Each time it bounces it rises to $\frac{3}{4}$ of the height from which it fell. Find the total distance it travels before coming to rest.`,
    value: 56, unit: "m", wrong: [32, 48],
    explanation: t`First fall 8 m. Then up and down $6 + 4.5 + \cdots$, a GP with sum $\frac{6}{1 - 0.75} = 24$, travelled twice: $8 + 2 \times 24 = 56$ m. (32 is $\frac{8}{1 - 0.75}$, counting each bounce only once.)`,
    hints: ["After the first fall, every height is travelled twice: up and down."],
  });

  b.proof({
    d: 4, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: t`Starting from $S_n = \dfrac{a(1 - r^n)}{1 - r}$, explain why a geometric series has sum to infinity $\dfrac{a}{1 - r}$ when $|r| < 1$, and none when $|r| > 1$.`,
    points: [
      t`M1 for $|r| < 1$, $r^n \to 0$ as $n \to \infty$, so $S_n \to \frac{a(1 - 0)}{1 - r} = \frac{a}{1 - r}$.`,
      t`A1 for $|r| > 1$, $|r^n| \to \infty$, so $S_n$ has no finite limit.`,
    ],
    modelAnswer: t`If $|r| < 1$ then $r^n \to 0$ as $n \to \infty$, so

$$
S_n = \frac{a(1 - r^n)}{1 - r} \to \frac{a}{1 - r}
$$

If $|r| > 1$ then $|r^n|$ grows without bound, so $S_n$ does not approach a finite value and there is no sum to infinity.`,
    explanation: "Everything depends on what happens to rⁿ for large n.",
    hints: [t`What happens to $0.5^n$ and to $2^n$ as $n$ gets large?`],
  });

  for (const n of [1, 2, 5]) chk(1.5 * (1 - (1 / 3) ** n), gp.sum(1, 1 / 3, n), 1e-12);
  b.expr({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find an expression in terms of $n$ for the sum of the first $n$ terms of $1 + \frac{1}{3} + \frac{1}{9} + \cdots$. Type powers with ^, e.g. 2(1-(1/5)^n).`,
    accepted: ["(3/2)(1-(1/3)^n)", "3/2(1-(1/3)^n)", "1.5(1-(1/3)^n)", "1.5*(1-(1/3)^n)", "(3/2)*(1-(1/3)^n)", "3(1-(1/3)^n)/2", "(3-3(1/3)^n)/2", "3/2-(3/2)(1/3)^n", "(3/2)(1-3^(-n))", "1.5(1-3^(-n))", "3/2-1/(2*3^(n-1))", "(3^n-1)/(2*3^(n-1))"],
    wrong: ["3/2", "(3/2)(1-(1/3)^(n-1))"],
    explanation: t`$a = 1$, $r = \frac{1}{3}$: $S_n = \frac{1 - \left(\frac{1}{3}\right)^n}{1 - \frac{1}{3}} = \frac{3}{2}\left(1 - \left(\frac{1}{3}\right)^n\right)$. As $n \to \infty$ it tends to $\frac{3}{2}$.`,
    hints: [t`$S_n = \frac{a(1 - r^n)}{1 - r}$ with $a = 1$, $r = \frac{1}{3}$.`],
  });

  chk(gp.sumInf(9, -1 / 3), 27 / 4); chk(gp.sumInf(10, 0.1), 100 / 9);
  b.match({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "Match each geometric series with its sum to infinity.",
    pairs: [
      [t`$1 + \frac{1}{2} + \frac{1}{4} + \cdots$`, "2"],
      [t`$9 - 3 + 1 - \cdots$`, t`$\frac{27}{4}$`],
      [t`$10 + 1 + 0.1 + \cdots$`, t`$\frac{100}{9}$`],
      [t`$2 + 4 + 8 + \cdots$`, "no sum to infinity"],
    ],
    explanation: t`$\frac{1}{1 - \frac{1}{2}} = 2$; $\frac{9}{1 + \frac{1}{3}} = \frac{27}{4}$; $\frac{10}{1 - 0.1} = \frac{100}{9}$; $r = 2$ so the last diverges.`,
  });

  chk(gp.sumInf(5, -0.8), 25 / 9);
  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`A geometric series has first term 5 and common ratio $-0.8$. Which statement is true?`,
    options: [
      [t`Its sum to infinity is $\frac{25}{9}$.`, t`Correct: $\frac{5}{1 - (-0.8)} = \frac{5}{1.8} = \frac{25}{9}$.`],
      [t`Its sum to infinity is $25$.`, t`This uses $1 - 0.8$ in the denominator; with $r = -0.8$ it is $1 + 0.8$.`],
      ["It has no sum to infinity because the ratio is negative.", t`A negative ratio is fine; the condition is $|r| < 1$, and $|-0.8| < 1$.`],
      [t`Its partial sums all lie below $\frac{25}{9}$.`, t`$S_1 = 5 > \frac{25}{9}$: the partial sums oscillate above and below the limit.`],
    ],
    answer: "A",
    explanation: t`$|r| = 0.8 < 1$, so $S_\infty = \frac{a}{1 - r} = \frac{5}{1.8} = \frac{25}{9}$. Because $r < 0$, the partial sums $5, 1, 4.2, 1.64, \ldots$ alternate above and below $\frac{25}{9}$.`,
    hints: [t`Substitute carefully: $1 - r = 1 - (-0.8)$.`],
  });

  // Struct (12): sales 12000, +5% per year
  const y6 = 12000 * 1.05 ** 5;
  const t10 = gp.sum(12000, 1.05, 10);
  const n19 = least((n) => gp.sum(12000, 1.05, n) > 300000);
  chk(n19, 17);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
    stem: t`Farai sells tobacco at the Harare auction floors. In his first year his sales are ${money(12000)}, and he plans for sales to increase by 5% each year after that.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Find his planned sales in the 6th year, to the nearest dollar.", value: y6, dp: 0, wrong: [12000 * 1.05 ** 6, 15000],
        explanation: t`$12\,000 \times 1.05^5 = 15\,315.38$, so about ${money(15315)}. (Using $1.05^6$ gives the 7th year.)` }),
      P.num({ label: "(b)", marks: 2, stem: "Find his total planned sales over the first 10 years, to the nearest dollar.", value: t10, dp: 0, wrong: [12000 * 10 * 1.05, 120000],
        explanation: t`$S_{10} = \frac{12\,000(1.05^{10} - 1)}{0.05} = 150\,934.71$, so about ${money(150935)}.` }),
      P.proof({ label: "(c)", marks: 3, stem: t`Show that the total planned sales over $n$ years exceed ${money(300000)} when $1.05^n > 2.25$.`,
        points: [t`M1 writes $S_n = \frac{12\,000(1.05^n - 1)}{0.05} = 240\,000(1.05^n - 1)$.`, t`M1 sets $240\,000(1.05^n - 1) > 300\,000$.`, t`A1 divides by 240 000: $1.05^n - 1 > 1.25$, so $1.05^n > 2.25$.`],
        modelAnswer: t`$$
S_n = \frac{12\,000(1.05^n - 1)}{1.05 - 1} = 240\,000(1.05^n - 1)
$$

$$
240\,000(1.05^n - 1) > 300\,000 \Rightarrow 1.05^n - 1 > 1.25 \Rightarrow 1.05^n > 2.25
$$`,
        explanation: "Simplify the GP sum, then rearrange." }),
      P.num({ label: "(d)", marks: 3, stem: "Hence find the least number of years for the total to exceed US$300 000.".replace("US$", "US\\$"), prefix: "n =", value: n19, wrong: [16, 25],
        explanation: t`$n > \frac{\ln 2.25}{\ln 1.05} = 16.62$, so 17 years.` }),
      P.manual({ label: "(e)", marks: 2, stem: "Give two reasons why this model may be unrealistic over 40 years.",
        points: ["Sales cannot grow by a fixed percentage for ever: land, labour and market demand are limited.", "Prices and yields vary from year to year (weather, auction prices, inflation), so growth is not constant."],
        modelAnswer: "After 40 years the model predicts sales of 12 000 × 1.05³⁹ ≈ 80 000 US dollars a year: the farm's size and the market limit growth, and droughts or price changes make the yearly percentage change vary." }),
    ],
    explanation: "A fixed percentage increase gives a GP with r = 1.05; totals use S_n, and logarithms find n.",
    hints: ["5% growth multiplies by 1.05.", "Take logarithms to solve 1.05ⁿ > 2.25."],
  });

  // Struct (13): AP and GP both start at 64; GP 2nd = AP 3rd, GP 3rd = AP 4th → r = ½, d = −16
  same(gp.nth(64, 0.5, 2), ap.nth(64, -16, 3)); same(gp.nth(64, 0.5, 3), ap.nth(64, -16, 4));
  const quadR = (r) => 2 * r * r - 3 * r + 1; chk(quadR(0.5), 0); chk(quadR(1), 0);
  chk(gp.sumInf(64, 0.5), 128);
  const apMax = Math.max(...Array.from({ length: 12 }, (_, i) => ap.sum(64, -16, i + 1)));
  chk(apMax, 160); chk(ap.sum(64, -16, 4), 160); chk(ap.sum(64, -16, 5), 160);
  const n20 = least((n) => gp.sum(64, 0.5, n) > 127); chk(n20, 8);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`An arithmetic progression and a geometric progression both have first term 64. The common difference of the arithmetic progression is $d$ and the common ratio of the geometric progression is $r$, where $r \neq 1$. The 2nd term of the geometric progression equals the 3rd term of the arithmetic progression, and the 3rd term of the geometric progression equals the 4th term of the arithmetic progression.`,
    parts: [
      P.proof({ label: "(a)", marks: 3, stem: t`Show that $2r^2 - 3r + 1 = 0$.`,
        points: [t`M1 forms $64r = 64 + 2d$ and $64r^2 = 64 + 3d$.`, t`M1 eliminates $d$: $d = 32r - 32$ substituted into the second equation.`, t`A1 simplifies $64r^2 - 96r + 32 = 0$ to $2r^2 - 3r + 1 = 0$.`],
        modelAnswer: t`$$
64r = 64 + 2d \Rightarrow d = 32r - 32
$$

$$
64r^2 = 64 + 3(32r - 32) = 96r - 32 \Rightarrow 64r^2 - 96r + 32 = 0 \Rightarrow 2r^2 - 3r + 1 = 0
$$`,
        explanation: "Two equations in r and d; eliminate d." }),
      P.fib({ label: "(b)", marks: 3, stem: "Find r and d.", template: "r = {{blank:r}}, d = {{blank:d}}",
        blanks: [N("r", 0.5, "1", 1), N("d", -16, "16", 2)],
        explanation: t`$(2r - 1)(r - 1) = 0$ and $r \neq 1$, so $r = \frac{1}{2}$ and $d = 32 \times \frac{1}{2} - 32 = -16$. AP: $64, 48, 32, 16, \ldots$; GP: $64, 32, 16, \ldots$` }),
      P.num({ label: "(c)", marks: 2, stem: "Find the sum to infinity of the geometric progression.", value: 128, wrong: [64, 32],
        explanation: t`$|r| < 1$: $S_\infty = \frac{64}{1 - \frac{1}{2}} = 128$.` }),
      P.num({ label: "(d)", marks: 2, stem: "Find the greatest value of the sum of the first n terms of the arithmetic progression.", value: 160, wrong: [176, 144],
        explanation: t`$S_n = \frac{n}{2}\{128 - 16(n - 1)\} = n(72 - 8n)$. The terms are positive up to $u_4 = 16$, $u_5 = 0$, then negative, so the greatest sum is $S_4 = S_5 = 160$.` }),
      P.num({ label: "(e)", marks: 3, stem: "Find the least number of terms of the geometric progression whose sum exceeds 127.", prefix: "n =", value: n20, wrong: [7, 127],
        explanation: t`$128(1 - 0.5^n) > 127 \Rightarrow 0.5^n < \frac{1}{128} = 0.5^7 \Rightarrow n > 7$. So $n = 8$ ($S_7 = 127$ exactly, $S_8 = 127.5$).` }),
    ],
    explanation: "Equate the matching terms, eliminate d, and use r ≠ 1; then apply the GP and AP sum formulas.",
    hints: [t`2nd term of the GP is $64r$; 3rd term of the AP is $64 + 2d$.`, "In (d), the sum stops increasing when the terms become negative."],
  });
  chk(gp.sum(64, 0.5, 7), 127); chk(gp.sum(64, 0.5, 8), 127.5);

  b.card("DEFINITION", "Geometric progression", t`Each term is the previous term multiplied by the common ratio $r = \frac{u_{n+1}}{u_n}$.`);
  b.card("FORMULA", "nth term of a GP", t`$u_n = ar^{n-1}$`);
  b.card("FORMULA", "Sum of n terms of a GP", t`$S_n = \frac{a(1 - r^n)}{1 - r} = \frac{a(r^n - 1)}{r - 1}$, $r \neq 1$`, "In MF19.");
  b.card("FORMULA", "Sum to infinity", t`$S_\infty = \frac{a}{1 - r}$, only when $|r| < 1$`);
  b.card("FACT", "Three terms in GP", t`$a, b, c$ are in GP when $b^2 = ac$.`);
  b.card("CONCEPT", "Finding r from two terms", t`Divide the equations: $\frac{ar^5}{ar^2} = r^3$.`);
  b.card("CONCEPT", "Least n with logarithms", "Take logs of both sides; dividing by the log of a number below 1 reverses the inequality.");
  b.card("CONCEPT", "Bouncing ball", "Total distance = first drop + 2 × (sum of all rebound heights).");
  b.card("CONCEPT", "Percentage change", t`Growth of $p\%$: multiply by $1 + \frac{p}{100}$; decay: multiply by $1 - \frac{p}{100}$.`);
});
