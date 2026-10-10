// W1b: amaths.series.binomial-positive
import { concept, P, t, chk, same, nCr, binomialCoeffs, poly, sum } from "../lib.mjs";

const N = (id, x, wrong, marks) => ({ id, input: "number", accepted: [x], wrong, ...(marks ? { marks } : {}) });
/** Coefficient of x^k in a product of ascending coefficient lists. */
const mulAsc = (p, q) => {
  const out = Array(p.length + q.length - 1).fill(0);
  p.forEach((a, i) => q.forEach((c, j) => (out[i + j] += a * c)));
  return out;
};

concept("amaths.series.binomial-positive", { file: "series/binomial-positive", keyPrefix: "series.binomial-positive" }, (b) => {
  chk(nCr(7, 3), 35);
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`What is the value of $\dbinom{7}{3}$?`,
    options: [
      ["35", t`Correct: $\frac{7!}{3!\,4!} = \frac{7 \times 6 \times 5}{3 \times 2 \times 1} = 35$.`],
      ["210", t`This is $\frac{7!}{4!} = 7 \times 6 \times 5$, the number of arrangements; divide by $3!$ as well.`],
      ["21", t`This is $\binom{7}{2}$.`],
      ["7", t`This is $\binom{7}{1}$.`],
    ],
    answer: "A",
    explanation: t`$\binom{7}{3} = \frac{7!}{3!(7 - 3)!} = 35$; it is also entry 3 of row 7 of Pascal's triangle: $1, 7, 21, 35, \ldots$`,
  });

  chk(binomialCoeffs(1, 3, 5)[2], 90);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`Find the coefficient of $x^2$ in the expansion of $(1 + 3x)^5$.`,
    value: 90, wrong: [30, 270],
    explanation: t`$\binom{5}{2}(3x)^2 = 10 \times 9x^2 = 90x^2$. (30 forgets to square the 3.)`,
  });

  same(binomialCoeffs(2, 1, 5).slice(0, 3), [32, 80, 80]);
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Find the first three terms, in ascending powers of $x$, of the expansion of $(2 + x)^5$.`,
    template: "Expansion: ({{blank:a}}) + {{blank:b}}x + {{blank:c}}x²",
    blanks: [N("a", 32, "2"), N("b", 80, "10"), N("c", 80, "40")],
    explanation: t`$2^5 + \binom{5}{1}2^4x + \binom{5}{2}2^3x^2 = 32 + 80x + 80x^2$.`,
  });

  chk(binomialCoeffs(2, -1, 6)[3], -160);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the coefficient of $x^3$ in the expansion of $(2 - x)^6$.`,
    value: -160, wrong: [160, -20],
    explanation: t`$\binom{6}{3}2^3(-x)^3 = 20 \times 8 \times (-1)x^3 = -160x^3$.`,
    hints: [t`The bracket term is $(-x)$; an odd power keeps the minus sign.`],
  });

  chk(nCr(4, 2) * 9, 54);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`Find the term independent of $x$ in the expansion of $\left(x + \dfrac{3}{x}\right)^4$.`,
    value: 54, wrong: [6, 108],
    explanation: t`General term $\binom{4}{r}x^{4-r}\left(\frac{3}{x}\right)^r = \binom{4}{r}3^r x^{4 - 2r}$. $r = 2$: $6 \times 9 = 54$.`,
    hints: ["Find r for which the power of x is zero."],
  });

  chk(9 - 3 * 3, 0); chk(nCr(9, 3) * 2 ** 6 * (-1) ** 3, -5376);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Find the term independent of $x$ in the expansion of $\left(2x - \dfrac{1}{x^2}\right)^9$.`,
    value: -5376, wrong: [5376, -672],
    explanation: t`General term $\binom{9}{r}(2x)^{9-r}\left(-\frac{1}{x^2}\right)^r = \binom{9}{r}2^{9-r}(-1)^r x^{9 - 3r}$. $9 - 3r = 0$ gives $r = 3$: $84 \times 2^6 \times (-1) = -5376$.`,
    hints: [t`The power of $x$ in each term is $(9 - r) - 2r$.`, "(−1)³ = −1."],
  });

  // (1 + ax)^n = 1 + 12x + 60x² + … → n = 6, a = 2
  same(binomialCoeffs(1, 2, 6).slice(0, 3), [1, 12, 60]);
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`The first three terms of the expansion of $(1 + ax)^n$, where $n$ is a positive integer, are $1 + 12x + 60x^2$. Find $n$ and $a$.`,
    template: "n = {{blank:n}}, a = {{blank:a}}",
    blanks: [N("n", 6, "12"), N("a", 2, "1")],
    explanation: t`$na = 12$ and $\frac{n(n - 1)}{2}a^2 = 60$. Then $\frac{(na)(n - 1)a}{2} = 6(n - 1)a = 60$, so $(n - 1)a = 10$, i.e. $na - a = 10$, giving $a = 2$ and $n = 6$.`,
    hints: [t`Write the two coefficient equations: $na = 12$ and $\binom{n}{2}a^2 = 60$.`, t`Replace $na$ by 12 in the second.`],
  });

  const c8 = mulAsc([2, -1], binomialCoeffs(1, 3, 6));
  chk(c8[2], 252);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the coefficient of $x^2$ in the expansion of $(2 - x)(1 + 3x)^6$.`,
    value: 252, wrong: [270, 288],
    explanation: t`$(1 + 3x)^6 = 1 + 18x + 135x^2 + \cdots$. The $x^2$ terms: $2 \times 135x^2$ and $(-x) \times 18x$. Coefficient $= 270 - 18 = 252$. (270 misses the second product.)`,
    hints: ["Expand (1 + 3x)⁶ as far as the x² term.", "Two products give x²."],
  });

  b.mcq({
    d: 2, skill: "RECALL", calculator: false,
    stem: t`How many terms are there in the expansion of $(a + b)^{10}$?`,
    options: [
      ["11", t`Correct: the powers of $b$ run from $0$ to $10$.`],
      ["10", t`The powers run from 0 to 10 inclusive: one more than 10.`],
      ["20", "That would be a sum of two expansions; there is one term for each power."],
      ["2", "There are two terms inside the bracket, but the expansion has many more."],
    ],
    answer: "A",
    explanation: t`$(a + b)^n$ has $n + 1$ terms.`,
  });

  for (const [n, r] of [[7, 2], [9, 4], [12, 5]]) chk(nCr(n, r), nCr(n, n - r));
  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`For every positive integer $n$ and $0 \le r \le n$, $\dbinom{n}{r} = \dbinom{n}{n - r}$.`,
    answer: true,
    explanation: t`Choosing $r$ objects to take is the same as choosing $n - r$ to leave: $\frac{n!}{r!(n - r)!}$ is unchanged when $r$ and $n - r$ swap. So each row of Pascal's triangle is symmetric.`,
  });

  chk(nCr(5, 3) * (-3) ** 3, -270);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the coefficient of $x^4$ in the expansion of $(x^2 - 3)^5$.`,
    value: -270, wrong: [270, 90],
    explanation: t`General term $\binom{5}{r}(x^2)^{5-r}(-3)^r$. Power $2(5 - r) = 4$ gives $r = 3$: $10 \times (-27) = -270$.`,
    hints: [t`The power of $x$ is $2(5 - r)$.`],
  });

  chk(nCr(8, 2) * 4, 112);
  b.num({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`The coefficient of $x^2$ in the expansion of $(1 + kx)^8$ is 112, and $k > 0$. Find $k$.`,
    value: 2, prefix: "k =", wrong: [4, -2],
    explanation: t`$\binom{8}{2}k^2 = 28k^2 = 112$, so $k^2 = 4$ and, as $k > 0$, $k = 2$.`,
    hints: [t`The $x^2$ term is $\binom{8}{2}(kx)^2$.`],
  });

  const est = 32 - 80 * 0.02 + 80 * 0.02 ** 2;
  chk(est, 30.432);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Use the first three terms of the expansion of $(2 - x)^5$, in ascending powers of $x$, to find an approximation to $1.98^5$. Give the value of your approximation exactly.`,
    value: est, dp: 3, wrong: [30.4, 33.632],
    explanation: t`$(2 - x)^5 = 32 - 80x + 80x^2 - \cdots$. With $x = 0.02$: $32 - 1.6 + 0.032 = 30.432$. (The true value is $30.4316$ to 4 d.p.)`,
    hints: ["Choose x so that 2 − x = 1.98."],
  });

  same(binomialCoeffs(1, -2, 4), [1, -8, 24, -32, 16]);
  b.expr({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Expand $(1 - 2x)^4$ fully, in ascending powers of $x$. Type powers with ^, e.g. 1-6x+12x^2-8x^3.`,
    accepted: ["1-8x+24x^2-32x^3+16x^4"],
    wrong: ["1-8x+24x^2+32x^3+16x^4", "1+8x+24x^2+32x^3+16x^4"],
    explanation: t`Row 4: $1, 4, 6, 4, 1$. $1 + 4(-2x) + 6(-2x)^2 + 4(-2x)^3 + (-2x)^4 = 1 - 8x + 24x^2 - 32x^3 + 16x^4$.`,
    hints: ["Odd powers of (−2x) are negative."],
  });

  b.match({
    d: 2, skill: "RECALL", calculator: false,
    stem: "Match each binomial coefficient with its value.",
    pairs: [
      [t`$\binom{5}{2}$`, "10"],
      [t`$\binom{6}{3}$`, "20"],
      [t`$\binom{8}{2}$`, "28"],
      [t`$\binom{7}{1}$`, "7"],
    ],
    explanation: t`$\binom{5}{2} = \frac{5 \times 4}{2} = 10$; $\binom{6}{3} = \frac{6 \times 5 \times 4}{6} = 20$; $\binom{8}{2} = \frac{8 \times 7}{2} = 28$; $\binom{7}{1} = 7$.`,
  });
  same([nCr(5, 2), nCr(6, 3), nCr(8, 2), nCr(7, 1)], [10, 20, 28, 7]);

  chk(nCr(9, 3), 84);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`What is the 4th term, in ascending powers of $x$, of the expansion of $(1 + x)^9$?`,
    options: [
      [t`$84x^3$`, t`Correct: the 4th term has $r = 3$: $\binom{9}{3}x^3 = 84x^3$.`],
      [t`$126x^4$`, t`This is the 5th term ($r = 4$); the $(r + 1)$th term has $r$ one less than its position.`],
      [t`$36x^2$`, t`This is the 3rd term ($r = 2$).`],
      [t`$504x^3$`, t`$504 = 9 \times 8 \times 7$: divide by $3! = 6$ to get $\binom{9}{3}$.`],
    ],
    answer: "A",
    explanation: t`Terms: $1$, $9x$, $36x^2$, $84x^3$, … The 4th term is $\binom{9}{3}x^3 = 84x^3$.`,
    hints: [t`The $(r + 1)$th term is $\binom{n}{r}x^r$.`],
  });

  chk(binomialCoeffs(1, -1, 5)[3], -10);
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`What is the coefficient of $x^3$ in the expansion of $(1 - x)^5$?`,
    options: [
      ["−10", t`Correct: $\binom{5}{3}(-x)^3 = -10x^3$.`],
      ["10", t`$(-x)^3 = -x^3$: an odd power keeps the minus sign.`],
      ["−5", t`This uses $\binom{5}{1}$; the $x^3$ term needs $\binom{5}{3} = 10$.`],
      ["−60", t`$\binom{5}{3} = 10$, not $5 \times 4 \times 3 = 60$.`],
    ],
    answer: "A",
    explanation: t`Row 5 of Pascal's triangle is $1, 5, 10, 10, 5, 1$, and the signs alternate: $1 - 5x + 10x^2 - 10x^3 + 5x^4 - x^5$.`,
  });

  // (√3 + 1)^4 + (√3 − 1)^4 = 56
  chk((Math.sqrt(3) + 1) ** 4 + (Math.sqrt(3) - 1) ** 4, 56, 1e-9);
  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 3,
    stem: t`Use the binomial theorem to show that $(\sqrt{3} + 1)^4 + (\sqrt{3} - 1)^4 = 56$.`,
    points: [
      t`M1 expands $(\sqrt{3} + 1)^4 = 9 + 4(3\sqrt{3}) + 6(3) + 4\sqrt{3} + 1 = 28 + 16\sqrt{3}$.`,
      t`M1 expands $(\sqrt{3} - 1)^4 = 28 - 16\sqrt{3}$ (odd powers of $-1$ change sign).`,
      t`A1 adds: the surd terms cancel, leaving 56.`,
    ],
    modelAnswer: t`$$
(\sqrt{3} + 1)^4 = (\sqrt{3})^4 + 4(\sqrt{3})^3 + 6(\sqrt{3})^2 + 4\sqrt{3} + 1 = 9 + 12\sqrt{3} + 18 + 4\sqrt{3} + 1 = 28 + 16\sqrt{3}
$$

$$
(\sqrt{3} - 1)^4 = 9 - 12\sqrt{3} + 18 - 4\sqrt{3} + 1 = 28 - 16\sqrt{3}
$$

Adding: $(28 + 16\sqrt{3}) + (28 - 16\sqrt{3}) = 56$.`,
    explanation: "The odd-power terms are equal and opposite in the two expansions, so they cancel.",
    hints: [t`$(\sqrt{3})^3 = 3\sqrt{3}$ and $(\sqrt{3})^4 = 9$.`],
  });

  // Struct (12): (1 + x/2)^8 → 1 + 4x + 7x² + 7x³; (3 − 2x)(…) x² coeff 13; 1.005^8 estimate
  const c18 = binomialCoeffs(1, 0.5, 8);
  same(c18.slice(0, 4), [1, 4, 7, 7]);
  chk(mulAsc([3, -2], c18)[2], 13);
  const est18 = 1 + 4 * 0.01 + 7 * 0.01 ** 2 + 7 * 0.01 ** 3;
  chk(est18, 1.040707, 1e-12);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
    stem: t`This question is about the expansion of $\left(1 + \dfrac{x}{2}\right)^8$.`,
    parts: [
      P.fib({ label: "(a)", marks: 4, stem: "Find the first four terms of the expansion in ascending powers of x, simplifying each coefficient.", template: "Expansion: ({{blank:a}}) + {{blank:b}}x + {{blank:c}}x² + {{blank:d}}x³",
        blanks: [N("a", 1, "0"), N("b", 4, "8"), N("c", 7, "28"), N("d", 7, "56")],
        explanation: t`$1 + 8\left(\frac{x}{2}\right) + 28\left(\frac{x}{2}\right)^2 + 56\left(\frac{x}{2}\right)^3 = 1 + 4x + 7x^2 + 7x^3$.` }),
      P.num({ label: "(b)", marks: 3, stem: t`Hence find the coefficient of $x^2$ in the expansion of $(3 - 2x)\left(1 + \dfrac{x}{2}\right)^8$.`, value: 13, wrong: [21, 29],
        explanation: t`$3 \times 7 + (-2) \times 4 = 21 - 8 = 13$.` }),
      P.num({ label: "(c)", marks: 2, stem: t`Use your expansion with a suitable value of $x$ to estimate $1.005^8$, correct to 5 significant figures.`, value: est18, sf: 5, wrong: [1.04, 1.0407 + 0.001],
        explanation: t`$1 + \frac{x}{2} = 1.005$ when $x = 0.01$: $1 + 0.04 + 0.0007 + 0.000007 = 1.040707 \approx 1.0407$.` }),
      P.manual({ label: "(d)", marks: 3, stem: t`Explain why the four-term expansion gives a very good estimate of $1.005^8$ but a poor estimate of $1.5^8$.`,
        points: [
          t`For $1.005^8$, $x = 0.01$ is small, so the omitted terms ($x^4$ and higher) are tiny.`,
          t`For $1.5^8$, $x = 1$, so the omitted terms are not small (e.g. $\binom{8}{4}\left(\frac{1}{2}\right)^4 = 4.375$).`,
          t`So the truncated sum $1 + 4 + 7 + 7 = 19$ is far from $1.5^8 \approx 25.6$.`,
        ],
        modelAnswer: "With x = 0.01 every later term is a power of 0.01 times a moderate coefficient, so it is negligible. With x = 1 the later terms 4.375, 1.75, 0.4375, … are large, so stopping after four terms gives 19 instead of 25.6." }),
    ],
    explanation: "Expand with (x/2) as the second term, combine products for (b), and substitute a small x for estimates.",
    hints: [t`Keep the $\frac{1}{2}$ inside the bracket: $\left(\frac{x}{2}\right)^2 = \frac{x^2}{4}$.`],
  });
  chk(nCr(8, 4) / 16, 4.375); chk(1.5 ** 8, 25.62890625);

  // Struct (13): (2 + kx)^6, x² coefficient = 5 × x coefficient → k = 4
  const ratio = (k) => binomialCoeffs(2, k, 6)[2] / binomialCoeffs(2, k, 6)[1];
  chk(ratio(4), 5);
  const c19 = binomialCoeffs(2, 4, 6);
  chk(c19[3], 10240); chk(c19[1], 768); chk(c19[2], 3840);
  chk(mulAsc([1, -3], c19)[2], 1536);
  chk(c19[0] + 2 * c19[1] + c19[2], 5440);
  chk(sum(c19), 46656);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`In the expansion of $(2 + kx)^6$, where $k$ is a non-zero constant, the coefficient of $x^2$ is 5 times the coefficient of $x$.`,
    parts: [
      P.proof({ label: "(a)", marks: 3, stem: t`Show that $k = 4$.`,
        points: [t`M1 coefficient of $x$: $\binom{6}{1}2^5k = 192k$.`, t`M1 coefficient of $x^2$: $\binom{6}{2}2^4k^2 = 240k^2$.`, t`A1 $240k^2 = 5 \times 192k = 960k$, and $k \neq 0$ gives $k = 4$.`],
        modelAnswer: t`$$
x: \binom{6}{1}2^5k = 192k \qquad x^2: \binom{6}{2}2^4k^2 = 240k^2
$$

$$
240k^2 = 5 \times 192k = 960k \Rightarrow 240k(k - 4) = 0 \Rightarrow k = 4 \quad (k \neq 0)
$$`,
        explanation: "Write both coefficients in terms of k, then cancel k ≠ 0." }),
      P.num({ label: "(b)", marks: 2, stem: t`Find the coefficient of $x^3$.`, value: 10240, wrong: [2560, 640],
        explanation: t`$\binom{6}{3}2^3 4^3 = 20 \times 8 \times 64 = 10\,240$.` }),
      P.num({ label: "(c)", marks: 3, stem: t`Find the coefficient of $x^2$ in the expansion of $(1 - 3x)(2 + 4x)^6$.`, value: 1536, wrong: [3840, 6144],
        explanation: t`$(2 + 4x)^6 = 64 + 768x + 3840x^2 + \cdots$. Coefficient of $x^2$: $3840 - 3 \times 768 = 1536$.` }),
      P.num({ label: "(d)", marks: 3, stem: t`Find the term independent of $x$ in the expansion of $(2 + 4x)^6\left(1 + \dfrac{1}{x}\right)^2$.`, value: 5440, wrong: [64, 3904],
        explanation: t`$\left(1 + \frac{1}{x}\right)^2 = 1 + \frac{2}{x} + \frac{1}{x^2}$. Constant terms: $64 \times 1 + 768x \times \frac{2}{x} + 3840x^2 \times \frac{1}{x^2} = 64 + 1536 + 3840 = 5440$.` }),
      P.num({ label: "(e)", marks: 2, stem: t`Find the sum of all the coefficients in the expansion of $(2 + 4x)^6$.`, value: 46656, wrong: [64, 4096],
        explanation: t`Put $x = 1$: $(2 + 4)^6 = 6^6 = 46\,656$.` }),
    ],
    explanation: "Compare coefficients to find k, then use the expansion term by term; x = 1 gives the sum of the coefficients.",
    hints: [t`The coefficient of $x^r$ is $\binom{6}{r}2^{6-r}k^r$.`, "In (d), pair each power of x with the matching power of 1/x."],
  });

  b.card("FORMULA", "Binomial theorem", t`$(a + b)^n = \sum_{r=0}^{n}\binom{n}{r}a^{n-r}b^r$, $n$ a positive integer`, "In MF19.");
  b.card("FORMULA", "Binomial coefficient", t`$\binom{n}{r} = \frac{n!}{r!(n - r)!}$`);
  b.card("FACT", "General term", t`The $(r + 1)$th term of $(a + b)^n$ is $\binom{n}{r}a^{n-r}b^r$.`);
  b.card("FACT", "Number of terms", t`$(a + b)^n$ has $n + 1$ terms.`);
  b.card("CONCEPT", "Term independent of x", "Write the general term, collect the powers of x, set the power to zero and solve for r.");
  b.card("CONCEPT", "Coefficient in a product", "Expand the binomial far enough, then add every product of terms giving the required power.");
  b.card("FACT", "Pascal's triangle rows 4-6", "1 4 6 4 1; 1 5 10 10 5 1; 1 6 15 20 15 6 1");
  b.card("CONCEPT", "Signs in (a − b)ⁿ", "Write it as (a + (−b))ⁿ; odd powers of −b are negative, so the signs alternate.");
  b.card("CONCEPT", "Sum of the coefficients", t`Substitute $x = 1$: the coefficients of $(a + bx)^n$ add up to $(a + b)^n$.`);
});
