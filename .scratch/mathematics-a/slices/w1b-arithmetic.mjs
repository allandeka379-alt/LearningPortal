// W1b: amaths.series.arithmetic
import { concept, P, t, chk, same, ap, sum, money, ZP } from "../lib.mjs";

const N = (id, x, wrong, marks) => ({ id, input: "number", accepted: [x], wrong, ...(marks ? { marks } : {}) });
const sig = (m, n, f) => sum(Array.from({ length: n - m + 1 }, (_, i) => f(m + i)));
/** Least n ≥ 1 with cond(n). */
const least = (cond) => {
  for (let n = 1; n < 100000; n++) if (cond(n)) return n;
  throw new Error("least: none");
};

concept("amaths.series.arithmetic", { file: "series/arithmetic", keyPrefix: "series.arithmetic" }, (b) => {
  const r1 = [2]; for (let i = 0; i < 2; i++) r1.push(3 * r1[i] - 2);
  chk(r1[2], 10);
  b.mcq({
    d: 1, skill: "APPLICATION", calculator: false,
    stem: t`A sequence is defined by $u_1 = 2$ and $u_{n+1} = 3u_n - 2$. What is $u_3$?`,
    options: [
      ["10", t`Correct: $u_2 = 3(2) - 2 = 4$, then $u_3 = 3(4) - 2 = 10$.`],
      ["4", t`This is $u_2$; apply the rule once more.`],
      ["7", t`This uses $3n - 2$ with $n = 3$; the rule acts on the previous term, not on $n$.`],
      ["28", t`This is $u_4 = 3(10) - 2$; one step too many.`],
    ],
    answer: "A",
    explanation: t`A recurrence relation gives each term from the one before: $2 \to 4 \to 10$.`,
  });

  chk(ap.nth(7, 4, 20), 83);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`Find the 20th term of the arithmetic progression $7, 11, 15, \ldots$`,
    value: 83, wrong: [87, 80],
    explanation: t`$a = 7$, $d = 4$: $u_{20} = 7 + 19 \times 4 = 83$. (Using $20d$ gives 87.)`,
  });

  chk(ap.sum(4, 3, 30), 1425);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`Find the sum of the first 30 terms of the series $4 + 7 + 10 + \cdots$`,
    value: 1425, wrong: [91, 1470],
    explanation: t`$S_{30} = \frac{30}{2}\{2(4) + 29(3)\} = 15(8 + 87) = 1425$. (91 is the 30th term.)`,
  });

  chk(ap.nth(2, 4, 5), 18); chk(ap.nth(2, 4, 12), 46);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "The 5th term of an arithmetic progression is 18 and the 12th term is 46. Find the first term and the common difference.",
    template: "a = {{blank:a}}, d = {{blank:d}}",
    blanks: [N("a", 2, "6"), N("d", 4, "4.67")],
    explanation: t`$a + 4d = 18$ and $a + 11d = 46$. Subtracting: $7d = 28$, $d = 4$; then $a = 18 - 16 = 2$.`,
    hints: [t`Write both terms as $a + (n - 1)d$ and subtract.`],
  });

  chk(sig(1, 25, (r) => 2 * r - 1), 625);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Evaluate $\displaystyle\sum_{r=1}^{25}(2r - 1)$.`,
    value: 625, wrong: [650, 49],
    explanation: t`The terms $1, 3, 5, \ldots, 49$ form an AP with 25 terms: $S = \frac{25}{2}(1 + 49) = 625$. (The sum of the first $n$ odd numbers is $n^2$.)`,
  });

  chk(sig(10, 30, (r) => 4 * r + 1), 1701);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Evaluate $\displaystyle\sum_{r=10}^{30}(4r + 1)$.`,
    value: 1701, wrong: [1620, 1885],
    explanation: t`There are $30 - 10 + 1 = 21$ terms, from $41$ to $121$: $S = \frac{21}{2}(41 + 121) = 21 \times 81 = 1701$. (Using 20 terms gives 1620.)`,
    hints: ["Count the terms carefully: from r = 10 to r = 30 inclusive.", "Find the first and last terms, then use n/2 (a + l)."],
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Which of these sequences is an arithmetic progression?",
    options: [
      [t`$12, 8.5, 5, 1.5, \ldots$`, "Correct: the common difference is −3.5."],
      [t`$1, 4, 9, 16, \ldots$`, "These are squares: the differences 3, 5, 7 are not constant."],
      [t`$3, 6, 12, 24, \ldots$`, "This has a constant ratio of 2: it is geometric."],
      [t`$2, 5, 9, 14, \ldots$`, "The differences 3, 4, 5 increase, so it is not arithmetic."],
    ],
    answer: "A",
    explanation: "An AP has the same difference between every pair of neighbouring terms; here 8.5 − 12 = 5 − 8.5 = 1.5 − 5 = −3.5.",
  });

  chk((200 - 8) / 3 + 1, 65);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`How many terms are there in the arithmetic progression $8, 11, 14, \ldots, 200$?`,
    value: 65, wrong: [64, 66],
    explanation: t`$8 + (n - 1)3 = 200 \Rightarrow (n - 1)3 = 192 \Rightarrow n - 1 = 64 \Rightarrow n = 65$. (64 forgets that the first term counts.)`,
    hints: [t`Set $u_n = 200$ and solve for $n$.`],
  });

  chk(2 * (3 * 6 - 2), 6 + 1 + 4 * 6 + 1);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The numbers $x + 1$, $3x - 2$ and $4x + 1$ are consecutive terms of an arithmetic progression. Find $x$.`,
    value: 6, prefix: "x =", wrong: [2, 1.5],
    explanation: t`$2(3x - 2) = (x + 1) + (4x + 1) \Rightarrow 6x - 4 = 5x + 2 \Rightarrow x = 6$. The terms are $7, 16, 25$.`,
    hints: ["The middle term is the mean of the other two: 2b = a + c."],
  });

  const n10 = least((n) => ap.sum(3, 4, n) > 2000);
  chk(n10, 32); chk(ap.sum(3, 4, 31), 1953); chk(ap.sum(3, 4, 32), 2080);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`Find the least number of terms of the arithmetic series $3 + 7 + 11 + \cdots$ that must be taken for the sum to exceed 2000.`,
    value: n10, prefix: "n =", wrong: [31, 500],
    explanation: t`$S_n = \frac{n}{2}\{6 + 4(n - 1)\} = n(2n + 1)$. Solve $2n^2 + n - 2000 > 0$: positive root $n = \frac{-1 + \sqrt{16001}}{4} = 31.4$. So $n = 32$. Check: $S_{31} = 1953$, $S_{32} = 2080$.`,
    hints: [t`Simplify $S_n$ first.`, "Round the root up, then check."],
  });

  for (const n of [1, 2, 3, 7]) chk(3 * n * n + 2 * n, ap.sum(5, 6, n));
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`The sum of the first $n$ terms of an arithmetic progression is $S_n = 3n^2 + 2n$. Find the first term and the common difference.`,
    template: "a = {{blank:a}}, d = {{blank:d}}",
    blanks: [N("a", 5, "3"), N("d", 6, "3")],
    explanation: t`$u_1 = S_1 = 5$. $S_2 = 16$, so $u_2 = 16 - 5 = 11$ and $d = 6$. (Check: $\frac{n}{2}\{10 + 6(n - 1)\} = 3n^2 + 2n$.)`,
    hints: [t`$u_1 = S_1$ and $u_2 = S_2 - S_1$.`],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false, applies: ZP,
    stem: t`The sequence $u_n = \dfrac{1}{n^2}$ is convergent.`,
    answer: true,
    explanation: t`The terms $1, \frac{1}{4}, \frac{1}{9}, \ldots$ get closer and closer to 0, so the sequence converges with limit 0.`,
  });

  b.match({
    d: 3, skill: "UNDERSTANDING", calculator: false, applies: ZP,
    stem: "Match each sequence with the description of its behaviour.",
    pairs: [
      [t`$u_n = 5 - \frac{1}{n}$`, "convergent (limit 5)"],
      [t`$u_n = 2^n$`, "divergent, increasing without bound"],
      [t`$u_n = (-1)^n n$`, "oscillating and divergent"],
      [t`$u_n = \sin\frac{n\pi}{2}$`, "periodic with period 4"],
    ],
    explanation: t`$5 - \frac{1}{n} \to 5$; $2^n$ grows without limit; $(-1)^n n$ alternates in sign with growing size; $\sin\frac{n\pi}{2}$ repeats $1, 0, -1, 0$.`,
    hints: ["Write out the first five terms of each sequence."],
  });

  const r14 = [2]; for (let i = 0; i < 5; i++) r14.push(1 / (1 - r14[i]));
  chk(r14[3], 2); chk(r14[1], -1); chk(r14[2], 0.5);
  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false, applies: ZP,
    stem: t`A sequence is defined by $u_1 = 2$ and $u_{n+1} = \dfrac{1}{1 - u_n}$. How would you describe it?`,
    options: [
      ["periodic with period 3", t`Correct: $2, -1, \frac{1}{2}, 2, -1, \frac{1}{2}, \ldots$ repeats every 3 terms.`],
      ["periodic with period 2", t`$u_3 = \frac{1}{2} \neq u_1$, so the cycle is longer than 2.`],
      ["convergent to 1", t`The terms never approach 1; in fact $u_n = 1$ would make the next term undefined.`],
      ["divergent, increasing without bound", "The terms stay among 2, −1 and ½."],
    ],
    answer: "A",
    explanation: t`$u_2 = \frac{1}{1 - 2} = -1$, $u_3 = \frac{1}{1 + 1} = \frac{1}{2}$, $u_4 = \frac{1}{1 - \frac{1}{2}} = 2 = u_1$. The pattern repeats every 3 terms.`,
    hints: ["Work out the first four terms."],
  });

  const cost = ap.sum(15, 0.5, 60);
  chk(cost, 1785);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`A contractor drilling a borehole in Masvingo charges ${money(15)} for the first metre and ${money(0.5)} more for each extra metre than for the metre before. Find the total cost of drilling a borehole 60 m deep, in US dollars.`,
    value: cost, wrong: [44.5, 900],
    explanation: t`An AP with $a = 15$, $d = 0.5$, $n = 60$: $S_{60} = \frac{60}{2}\{30 + 59(0.5)\} = 30 \times 59.5 = 1785$, so ${money(1785)}. (44.5 is the cost of the 60th metre alone.)`,
    hints: ["Each metre costs 50 cents more than the one before: an arithmetic progression."],
  });

  const n16 = (399 - 105) / 7 + 1;
  chk(n16, 43); chk(ap.sum(105, 7, 43), 10836);
  chk(sig(101, 399, (k) => (k % 7 === 0 ? k : 0)), 10836);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: "Find the sum of all the integers between 100 and 400 that are divisible by 7.",
    value: 10836, wrong: [10584, 11088],
    explanation: t`The multiples of 7 run from $105 = 7 \times 15$ to $399 = 7 \times 57$: $57 - 15 + 1 = 43$ terms. $S = \frac{43}{2}(105 + 399) = 43 \times 252 = 10\,836$.`,
    hints: ["Find the first and last multiples of 7 in the range.", "Count the terms: (last − first)/7 + 1."],
  });

  b.proof({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 3,
    stem: t`Prove that the sum of the first $n$ terms of an arithmetic progression with first term $a$ and common difference $d$ is $S_n = \frac{n}{2}\{2a + (n - 1)d\}$.`,
    points: [
      t`M1 writes $S_n = a + (a + d) + \cdots + (a + (n - 1)d)$ and the same sum in reverse order.`,
      t`M1 adds the two lines term by term: each of the $n$ pairs sums to $2a + (n - 1)d$.`,
      t`A1 $2S_n = n\{2a + (n - 1)d\}$, so $S_n = \frac{n}{2}\{2a + (n - 1)d\}$.`,
    ],
    modelAnswer: t`$$
S_n = a + (a + d) + \cdots + [a + (n - 2)d] + [a + (n - 1)d]
$$

$$
S_n = [a + (n - 1)d] + [a + (n - 2)d] + \cdots + (a + d) + a
$$

Adding, each of the $n$ columns sums to $2a + (n - 1)d$:

$$
2S_n = n\{2a + (n - 1)d\} \Rightarrow S_n = \frac{n}{2}\{2a + (n - 1)d\}
$$`,
    explanation: "Writing the sum backwards pairs the first and last terms, the second and second-last, and so on.",
    hints: ["Write the series forwards and backwards, then add."],
  });

  for (const n of [1, 2, 3, 10]) chk(21 - 4 * n, ap.nth(17, -4, n));
  b.expr({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find an expression for the $n$th term of the arithmetic progression $17, 13, 9, \ldots$ in its simplest form.`,
    accepted: ["21-4n", "-4n+21", "17-4(n-1)", "17+(n-1)(-4)"],
    wrong: ["17-4n", "4n+13"],
    explanation: t`$a = 17$, $d = -4$: $u_n = 17 - 4(n - 1) = 21 - 4n$. Check: $u_1 = 17$, $u_2 = 13$.`,
    hints: [t`Use $u_n = a + (n - 1)d$ with a negative $d$.`],
  });

  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "Which three numbers are consecutive terms of an arithmetic progression?",
    options: [
      [t`$\frac{1}{3}, \frac{7}{12}, \frac{5}{6}$`, t`Correct: $2 \times \frac{7}{12} = \frac{7}{6} = \frac{1}{3} + \frac{5}{6}$; the common difference is $\frac{1}{4}$.`],
      [t`$\frac{1}{3}, \frac{1}{2}, \frac{3}{4}$`, t`Differences are $\frac{1}{6}$ and $\frac{1}{4}$: not equal.`],
      [t`$2, 4, 8$`, "These have a common ratio (2), not a common difference: geometric."],
      [t`$-3, 1, 6$`, "Differences are 4 and 5: not equal."],
    ],
    answer: "A",
    explanation: t`Use $2b = a + c$ to test each triple.`,
    hints: ["Check whether twice the middle number equals the sum of the outer two."],
  });

  // Struct (12): S10 = 155, next 10 sum to 455 → 2a + 9d = 31, 2a + 19d = 61 → d = 3, a = 2
  chk(ap.sum(2, 3, 10), 155); chk(ap.sum(2, 3, 20) - ap.sum(2, 3, 10), 455);
  const nc = least((n) => ap.nth(2, 3, n) > 100); chk(nc, 34);
  const nd = least((n) => ap.sum(2, 3, n) > 1000); chk(nd, 26); chk(ap.sum(2, 3, 25) < 1000 ? 1 : 0, 1);
  const se = sig(1, 200, (n) => { const u = ap.nth(2, 3, n); return u > 50 && u < 100 ? u : 0; });
  chk(se, 1208);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: "The sum of the first 10 terms of an arithmetic progression is 155, and the sum of the next 10 terms is 455.",
    parts: [
      P.proof({ label: "(a)", marks: 2, stem: t`Show that $2a + 9d = 31$, where $a$ is the first term and $d$ the common difference.`,
        points: [t`M1 uses $S_{10} = \frac{10}{2}(2a + 9d) = 155$.`, t`A1 divides by 5 to obtain $2a + 9d = 31$.`],
        modelAnswer: t`$$
S_{10} = \frac{10}{2}(2a + 9d) = 5(2a + 9d) = 155 \Rightarrow 2a + 9d = 31
$$`,
        explanation: "Substitute n = 10 in the sum formula." }),
      P.fib({ label: "(b)", marks: 3, stem: "Find a and d.", template: "a = {{blank:a}}, d = {{blank:d}}",
        blanks: [N("a", 2, "-1", 1), N("d", 3, "6", 2)],
        explanation: t`$S_{20} = 155 + 455 = 610 = 10(2a + 19d)$, so $2a + 19d = 61$. Subtracting $2a + 9d = 31$: $10d = 30$, $d = 3$, $a = 2$. (Using 455 as $S_{20}$ gives the wrong second equation.)` }),
      P.num({ label: "(c)", marks: 2, stem: "Find the least value of n for which the nth term exceeds 100.", prefix: "n =", value: nc, wrong: [33, 35],
        explanation: t`$2 + 3(n - 1) > 100 \Rightarrow 3n > 101 \Rightarrow n > 33.7$, so $n = 34$ ($u_{34} = 101$).` }),
      P.num({ label: "(d)", marks: 3, stem: "Find the least number of terms for which the sum exceeds 1000.", prefix: "n =", value: nd, wrong: [25, 34],
        explanation: t`$S_n = \frac{n}{2}(4 + 3(n - 1)) = \frac{n(3n + 1)}{2} > 1000 \Rightarrow 3n^2 + n - 2000 > 0$. Positive root $\frac{-1 + \sqrt{24\,001}}{6} = 25.65$, so $n = 26$. Check: $S_{25} = 950$, $S_{26} = 1027$.` }),
      P.num({ label: "(e)", marks: 2, stem: "Find the sum of all the terms of the progression that lie between 50 and 100.", value: se, wrong: [1155, 1360],
        explanation: t`$u_n = 3n - 1$. Terms between 50 and 100: $u_{18} = 53$ to $u_{33} = 98$, which is 16 terms. Sum $= \frac{16}{2}(53 + 98) = 1208$.` }),
    ],
    explanation: "Two sums give two linear equations in a and d; then use the nth-term and sum formulas with inequalities.",
    hints: ["The sum of the first 20 terms is 155 + 455.", "For 'least n', solve the equation and round up."],
  });
  chk(ap.sum(2, 3, 25), 950); chk(ap.sum(2, 3, 26), 1027);

  // Struct (13): coal: 1200 t in week 1, +80 t per week
  chk(ap.nth(1200, 80, 20), 2720); chk(ap.sum(1200, 80, 20), 39200);
  const n20 = least((n) => ap.sum(1200, 80, n) > 100000); chk(n20, 38);
  const nw = least((n) => ap.nth(1200, 80, n) > ap.nth(1500, 60, n)); chk(nw, 17);
  for (const n of [5, 30]) chk(ap.sum(1200, 80, n), 40 * n * n + 1160 * n);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: "A coal mine near Hwange plans to send 1200 tonnes of coal by truck in the first week, increasing the amount by 80 tonnes each week after that.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Find the amount sent in the 20th week, in tonnes.", value: 2720, wrong: [2800, 1280],
        explanation: t`$u_{20} = 1200 + 19 \times 80 = 2720$ tonnes.` }),
      P.num({ label: "(b)", marks: 2, stem: "Find the total amount sent in the first 20 weeks, in tonnes.", value: 39200, wrong: [2720 * 20, 27200],
        explanation: t`$S_{20} = \frac{20}{2}(1200 + 2720) = 10 \times 3920 = 39\,200$ tonnes.` }),
      P.proof({ label: "(c)", marks: 3, stem: t`Show that the total sent in the first $n$ weeks exceeds 100 000 tonnes when $n^2 + 29n - 2500 > 0$.`,
        points: [t`M1 uses $S_n = \frac{n}{2}\{2400 + 80(n - 1)\}$.`, t`A1 simplifies to $S_n = 40n^2 + 1160n$.`, t`A1 sets $40n^2 + 1160n > 100\,000$ and divides by 40.`],
        modelAnswer: t`$$
S_n = \frac{n}{2}\{2400 + 80(n - 1)\} = \frac{n}{2}(2320 + 80n) = 40n^2 + 1160n
$$

$$
40n^2 + 1160n > 100\,000 \Rightarrow n^2 + 29n - 2500 > 0
$$`,
        explanation: "Simplify the sum formula, then divide the inequality by 40." }),
      P.num({ label: "(d)", marks: 3, stem: "Hence find the least number of weeks needed for the total to exceed 100 000 tonnes.", prefix: "n =", value: n20, wrong: [37, 39],
        explanation: t`Positive root of $n^2 + 29n - 2500 = 0$: $n = \frac{-29 + \sqrt{10\,841}}{2} = 37.56$. So $n = 38$ weeks. (Check: $S_{37} = 97\,680$, $S_{38} = 101\,840$.)` }),
      P.num({ label: "(e)", marks: 3, stem: "A second plan sends 1500 tonnes in the first week and increases by 60 tonnes each week. In which week does the first plan first send more coal in a single week than the second plan?", prefix: "week", value: nw, wrong: [16, 15],
        explanation: t`$1200 + 80(n - 1) > 1500 + 60(n - 1) \Rightarrow 20(n - 1) > 300 \Rightarrow n - 1 > 15 \Rightarrow n > 16$. In week 16 they are equal (2400 tonnes each); week 17 is the first in which the first plan sends more.` }),
    ],
    explanation: "A fixed weekly increase gives an AP: use u_n for one week and S_n for totals.",
    hints: ["a = 1200, d = 80.", "In (e), compare the nth terms of the two progressions."],
  });
  chk(ap.sum(1200, 80, 37), 97680); chk(ap.sum(1200, 80, 38), 101840); chk(ap.nth(1200, 80, 16), ap.nth(1500, 60, 16));

  b.card("DEFINITION", "Arithmetic progression", "A sequence with a constant difference d between consecutive terms.");
  b.card("FORMULA", "nth term of an AP", t`$u_n = a + (n - 1)d$`);
  b.card("FORMULA", "Sum of an AP", t`$S_n = \frac{n}{2}\{2a + (n - 1)d\} = \frac{n}{2}(a + l)$`, "In MF19.");
  b.card("FACT", "Three terms in AP", t`$a, b, c$ are in AP when $2b = a + c$.`);
  b.card("FACT", "Number of terms in Σ from r = m to n", t`$n - m + 1$`);
  b.card("CONCEPT", "Recurrence relation", t`A rule giving each term from the previous one, e.g. $u_{n+1} = 2u_n - 1$, with a starting value.`);
  b.card("CONCEPT", "Least n for a sum", "Solve the quadratic equation, round the positive root up, and check S at the neighbouring integers.");
  b.card("DEFINITION", "Convergent, divergent, oscillating, periodic", "Convergent: terms approach a limit. Divergent: no limit. Oscillating: terms alternate up and down. Periodic: terms repeat in a cycle.", undefined, { applies: ZP });
  b.card("CONCEPT", "Finding a and d from S_n", t`$u_1 = S_1$ and $u_n = S_n - S_{n-1}$.`);
});
