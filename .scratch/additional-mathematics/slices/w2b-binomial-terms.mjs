// W2b: amath.series.binomial-terms (Cambridge only: tagged automatically)
import { concept, P, t, chk, same, nCr, binomialCoeffs, quad } from "../lib.mjs";

const N = (id, x, wrong) => ({ id, input: "number", accepted: [x], wrong });
/**
 * Expansion of (c1 x^p1 + c2 x^p2)^n as a map power -> coefficient (exact for integer data).
 */
function expandMono(c1, p1, c2, p2, n) {
  const out = new Map();
  for (let r = 0; r <= n; r++) {
    const pw = p1 * (n - r) + p2 * r;
    out.set(pw, (out.get(pw) ?? 0) + nCr(n, r) * c1 ** (n - r) * c2 ** r);
  }
  return out;
}

concept("amath.series.binomial-terms", { file: "series/binomial-terms", keyPrefix: "series.binomial-terms" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`Which expression is the term containing $b^r$ in the expansion of $(a + b)^n$?`,
    options: [
      [t`$\binom{n}{r}a^{n-r}b^r$`, t`Correct: the powers of $a$ and $b$ add up to $n$.`],
      [t`$\binom{n}{r}a^{r}b^r$`, t`The power of $a$ must be $n - r$ so that the powers add up to $n$.`],
      [t`$\binom{n}{r+1}a^{n-r}b^r$`, t`The coefficient of $b^r$ is $\binom{n}{r}$; $r + 1$ is the position of the term.`],
      [t`$n\,a^{n-r}b^r$`, t`The coefficient is $\binom{n}{r}$, which equals $n$ only when $r = 1$ or $r = n - 1$.`],
    ],
    answer: "A",
    explanation: t`$T_{r+1} = \binom{n}{r}a^{n-r}b^r$: it is the $(r + 1)$th term, and the powers of $a$ and $b$ always add up to $n$.`,
  });

  chk(nCr(9, 4), 126);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Find the coefficient of $x^4$ in the expansion of $(1 + x)^9$.`,
    value: 126, wrong: [84, 36],
    explanation: t`$\binom{9}{4} = \frac{9 \times 8 \times 7 \times 6}{4 \times 3 \times 2 \times 1} = 126$.`,
  });

  chk(binomialCoeffs(1, -2, 6)[3], -160);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Find the coefficient of $x^3$ in the expansion of $(1 - 2x)^6$.`,
    value: -160, wrong: [160, -40],
    explanation: t`$\binom{6}{3}(-2x)^3 = 20 \times (-8)x^3 = -160x^3$.`,
  });

  chk(binomialCoeffs(2, 1, 7)[5], 84);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the coefficient of $x^5$ in the expansion of $(2 + x)^7$.`,
    value: 84, wrong: [21, 672],
    explanation: t`$\binom{7}{5}2^{2}x^5 = 21 \times 4x^5 = 84x^5$. (The power of 2 is $7 - 5 = 2$; using $2^5$ gives 672.)`,
    hints: [t`The power of 2 is $n - r$.`],
  });

  chk(binomialCoeffs(3, -0.5, 6)[2], 303.75);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the exact coefficient of $x^2$ in the expansion of $\left(3 - \dfrac{x}{2}\right)^6$. Give your answer as a decimal or a fraction.`,
    value: 303.75, dp: 2, wrong: [-303.75, 607.5],
    explanation: t`$\binom{6}{2}3^4\left(-\frac{x}{2}\right)^2 = 15 \times 81 \times \frac{x^2}{4} = \frac{1215}{4}x^2 = 303.75x^2$.`,
    hints: [t`$\left(-\frac{x}{2}\right)^2 = \frac{x^2}{4}$.`],
  });

  chk(expandMono(1, 1, 2, -1, 6).get(0), 160);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the term independent of $x$ in the expansion of $\left(x + \dfrac{2}{x}\right)^6$.`,
    value: 160, wrong: [20, 8],
    explanation: t`$T_{r+1} = \binom{6}{r}x^{6-r}\left(\frac{2}{x}\right)^r = \binom{6}{r}2^r x^{6-2r}$. $6 - 2r = 0$ gives $r = 3$: $\binom{6}{3}2^3 = 20 \times 8 = 160$.`,
    hints: [t`Find the power of $x$ in the general term and set it to 0.`],
  });

  chk(expandMono(1, 2, 1, -1, 6).get(0), 15);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Find the term independent of $x$ in the expansion of $\left(x^2 + \dfrac{1}{x}\right)^6$.`,
    value: 15, wrong: [20, 6],
    explanation: t`$T_{r+1} = \binom{6}{r}(x^2)^{6-r}x^{-r} = \binom{6}{r}x^{12-3r}$. $12 - 3r = 0$ gives $r = 4$: $\binom{6}{4} = 15$.`,
    hints: [t`$(x^2)^{6-r} = x^{12-2r}$.`],
  });

  chk(expandMono(2, 1, -0.5, -1, 8).get(0), 70);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Find the term independent of $x$ in the expansion of $\left(2x - \dfrac{1}{2x}\right)^8$.`,
    value: 70, wrong: [-70, 1120],
    explanation: t`$T_{r+1} = \binom{8}{r}(2x)^{8-r}\left(-\frac{1}{2x}\right)^r = \binom{8}{r}2^{8-r}\left(-\frac{1}{2}\right)^r x^{8-2r}$. $r = 4$: $70 \times 2^4 \times \frac{1}{16} = 70$.`,
    hints: [t`$\left(-\frac{1}{2x}\right)^4 = \frac{1}{16x^4}$.`, t`Here $2^4 \times \frac{1}{2^4} = 1$.`],
  });

  // (x^3 - 1/x)^8: power 24 - 4r = 0 -> r = 6 -> 7th term
  chk((24 - 0) / 4, 6); chk(expandMono(1, 3, -1, -1, 8).get(0), nCr(8, 6));
  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`Which term of the expansion of $\left(x^3 - \dfrac{1}{x}\right)^8$ is independent of $x$?`,
    options: [
      ["the 7th term", t`Correct: the power is $3(8 - r) - r = 24 - 4r = 0$, so $r = 6$, which is the 7th term.`],
      ["the 6th term", t`$r = 6$ gives the $(r + 1)$th term, the 7th.`],
      ["the 9th term", t`The last term is $\left(-\frac{1}{x}\right)^8 = x^{-8}$, not a constant.`],
      ["the 5th term", t`The 5th term has $r = 4$, giving the power $24 - 16 = 8$, not 0.`],
    ],
    answer: "A",
    explanation: t`$T_{r+1} = \binom{8}{r}(x^3)^{8-r}(-x^{-1})^r$ has power $24 - 3r - r = 24 - 4r$. Zero when $r = 6$: the 7th term, $\binom{8}{6} = 28$.`,
    hints: [t`Remember the term with $b^r$ is the $(r + 1)$th term.`],
  });

  const c10 = binomialCoeffs(1, -1, 5);
  chk(c10[2] + 3 * c10[1], -5);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Find the coefficient of $x^2$ in the expansion of $(1 + 3x)(1 - x)^5$.`,
    value: -5, wrong: [10, 25],
    explanation: t`$(1 - x)^5 = 1 - 5x + 10x^2 + \cdots$ The $x^2$ terms: $1 \times 10x^2$ and $3x \times (-5x) = -15x^2$. Coefficient $10 - 15 = -5$.`,
    hints: ["There are two ways to make x² in the product."],
  });

  same(quad.roots(1, -1, -30), [-5, 6]); chk(nCr(6, 2) * 9, 135);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`The coefficient of $x^2$ in the expansion of $(1 + 3x)^n$ is 135. Find the value of $n$.`,
    value: 6, prefix: "n =", wrong: [-5, 15],
    explanation: t`$\binom{n}{2}(3x)^2 = \frac{9n(n - 1)}{2}x^2$. So $\frac{9n(n - 1)}{2} = 135$, $n(n - 1) = 30$, $n^2 - n - 30 = 0$, $(n - 6)(n + 5) = 0$, and $n = 6$ (a positive integer).`,
    hints: [t`$\binom{n}{2} = \frac{n(n - 1)}{2}$.`],
  });

  chk(nCr(6, 2) * 2 ** 2, 60);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The coefficient of $x^2$ in the expansion of $(1 + kx)^6$ is 60, and $k > 0$. Find $k$.`,
    value: 2, prefix: "k =", wrong: [-2, 4],
    explanation: t`$\binom{6}{2}k^2 = 15k^2 = 60$, so $k^2 = 4$ and $k = 2$ (as $k > 0$).`,
    hints: [t`$(kx)^2 = k^2x^2$.`],
  });

  // n a = 12, C(n,2) a^2 = 60 -> n = 6, a = 2
  chk(6 * 2, 12); chk(nCr(6, 2) * 4, 60);
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`In the expansion of $(1 + ax)^n$, where $n$ is a positive integer, the coefficient of $x$ is 12 and the coefficient of $x^2$ is 60. Find $n$ and $a$.`,
    template: "n = {{blank:n}}, a = {{blank:a}}",
    blanks: [N("n", 6, "12"), N("a", 2, "1")],
    explanation: t`$na = 12$ and $\frac{n(n - 1)}{2}a^2 = 60$. Since $n^2a^2 = 144$: $\frac{144(n - 1)}{2n} = 60$, so $72(n - 1) = 60n$, $12n = 72$ and $n = 6$. Then $a = 2$.`,
    hints: [t`Write $\frac{n(n - 1)}{2}a^2$ as $\frac{(na)^2(n - 1)}{2n}$.`, "Substitute na = 12."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`The 4th term of the expansion of $(a + b)^n$ is $\binom{n}{4}a^{n-4}b^4$.`,
    answer: false,
    explanation: t`False. The 4th term has $r = 3$: $\binom{n}{3}a^{n-3}b^3$. The term containing $b^r$ is the $(r + 1)$th term.`,
  });

  chk(expandMono(1, 1, 1, -1, 7).has(0) ? 1 : 0, 0);
  b.tf({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`The expansion of $\left(x + \dfrac{1}{x}\right)^7$ has a term independent of $x$.`,
    answer: false,
    explanation: t`False. The general term contains $x^{7 - 2r}$, and $7 - 2r = 0$ gives $r = 3.5$, which is not a whole number. So no term is independent of $x$.`,
    hints: ["Find the power of x in the general term."],
  });

  chk(nCr(5, 2) * 2 ** 3, 80);
  b.expr({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the 3rd term of the expansion of $(2x + y)^5$, in its simplest form. Type it, e.g. 40x^2y^3.`,
    accepted: ["80x^3y^2", "80y^2x^3", "80x³y²"],
    wrong: ["10x^3y^2", "40x^2y^3"],
    explanation: t`The 3rd term has $r = 2$: $\binom{5}{2}(2x)^3y^2 = 10 \times 8x^3y^2 = 80x^3y^2$.`,
    hints: [t`3rd term means $r = 2$.`, t`$(2x)^3 = 8x^3$.`],
  });

  // Struct 1 (6): (2 + x)^6 first three; (1 - 2x)(2 + x)^6
  const c17 = binomialCoeffs(2, 1, 6);
  same(c17.slice(0, 3), [64, 192, 240]);
  chk(c17[2] - 2 * c17[1], -144); chk(c17[1] - 2 * c17[0], 64);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: t`This question is about the expansion of $(2 + x)^6$.`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: t`Find the first three terms in ascending powers of $x$, in the form $p + qx + sx^2$.`, template: "p = {{blank:p}}, q = {{blank:q}}, s = {{blank:s}}",
        blanks: [N("p", 64, "2"), N("q", 192, "12"), N("s", 240, "60")],
        explanation: t`$2^6 = 64$; $\binom{6}{1}2^5x = 192x$; $\binom{6}{2}2^4x^2 = 15 \times 16x^2 = 240x^2$.` }),
      P.num({ label: "(b)", marks: 2, stem: t`Hence find the coefficient of $x^2$ in the expansion of $(1 - 2x)(2 + x)^6$.`, value: -144, wrong: [240, 624],
        explanation: t`$1 \times 240x^2 + (-2x)(192x) = (240 - 384)x^2 = -144x^2$.` }),
      P.num({ label: "(c)", marks: 1, stem: t`Find the coefficient of $x$ in the expansion of $(1 - 2x)(2 + x)^6$.`, value: 64, wrong: [192],
        explanation: t`$1 \times 192x + (-2x)(64) = (192 - 128)x = 64x$.` }),
    ],
    explanation: "Expand the binomial far enough, then collect every product that gives the required power.",
    hints: ["Each coefficient in the product comes from two pairs of terms.", t`For $x^2$: $1 \times (x^2 \text{ term})$ and $-2x \times (x \text{ term})$.`],
  });

  // Struct 2 (9): (2x^2 + 1/x)^6
  const e18 = expandMono(2, 2, 1, -1, 6);
  for (let r = 0; r <= 6; r++) chk(e18.get(12 - 3 * r), nCr(6, r) * 2 ** (6 - r));
  chk(e18.get(0), 60); chk(e18.get(6), 240); chk(e18.has(5) ? 1 : 0, 0);
  chk(e18.get(0) + e18.get(3), 220); chk(e18.get(3), 160);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`This question is about the expansion of $\left(2x^2 + \dfrac{1}{x}\right)^6$.`,
    parts: [
      P.proof({ label: "(a)", marks: 2, stem: t`Show that the general term can be written as $\dbinom{6}{r}2^{6-r}x^{12-3r}$.`,
        points: [t`M1 writes $\binom{6}{r}(2x^2)^{6-r}\left(\frac{1}{x}\right)^r$.`, t`A1 simplifies the powers: $(2x^2)^{6-r} = 2^{6-r}x^{12-2r}$ and $x^{-r}$, giving $x^{12-3r}$.`],
        modelAnswer: t`$$
T_{r+1} = \binom{6}{r}(2x^2)^{6-r}\left(\frac{1}{x}\right)^r = \binom{6}{r}2^{6-r}x^{12-2r}x^{-r}
$$

$$
= \binom{6}{r}2^{6-r}x^{12-3r}
$$`,
        explanation: "Use the index laws on each factor separately." }),
      P.num({ label: "(b)", marks: 2, stem: t`Find the term independent of $x$.`, value: 60, wrong: [15, 240],
        explanation: t`$12 - 3r = 0$ gives $r = 4$: $\binom{6}{4}2^2 = 15 \times 4 = 60$.` }),
      P.num({ label: "(c)", marks: 2, stem: t`Find the coefficient of $x^6$.`, value: 240, wrong: [60, 160],
        explanation: t`$12 - 3r = 6$ gives $r = 2$: $\binom{6}{2}2^4 = 15 \times 16 = 240$.` }),
      P.manual({ label: "(d)", marks: 1, stem: t`Explain why the expansion has no term in $x^5$.`,
        points: [t`States that $12 - 3r = 5$ gives $r = \frac{7}{3}$, which is not a whole number, so no term has $x^5$.`],
        modelAnswer: t`Every power is $12 - 3r$ with $r$ a whole number, i.e. a multiple of 3 (12, 9, 6, 3, 0, …). $12 - 3r = 5$ would need $r = \frac{7}{3}$, so there is no $x^5$ term.`,
        explanation: "The powers present are 12, 9, 6, 3, 0, −3, −6." }),
      P.num({ label: "(e)", marks: 2, stem: t`Find the coefficient of $x^3$ in the expansion of $(1 + x^3)\left(2x^2 + \dfrac{1}{x}\right)^6$.`, value: 220, wrong: [160, 60],
        explanation: t`$x^3$ arises from $1 \times (x^3 \text{ term})$ and $x^3 \times (\text{constant term})$. The $x^3$ term has $12 - 3r = 3$, $r = 3$: $\binom{6}{3}2^3 = 160$. Total $160 + 60 = 220$.` }),
    ],
    explanation: "Simplify the power of x in the general term once; every later part is a matter of choosing r.",
    hints: [t`$(x^2)^{6-r} = x^{12-2r}$.`, t`In (e), the $x^3$ of the first bracket pairs with the constant term.`],
  });

  for (let r = 0; r <= 9; r++) chk(expandMono(1, 2, 3, -1, 9).has(18 - 3 * r) ? 1 : 0, 1);
  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`In the general term of the expansion of $\left(x^2 + \dfrac{3}{x}\right)^9$, what is the power of $x$?`,
    options: [
      [t`$18 - 3r$`, t`Correct: $(x^2)^{9-r}x^{-r} = x^{18 - 2r - r}$.`],
      [t`$18 - r$`, t`$(x^2)^{9-r} = x^{18-2r}$, not $x^{18-r}$; then subtract another $r$.`],
      [t`$9 - 3r$`, t`The first term is $x^2$, so its power doubles: $2(9 - r)$.`],
      [t`$18 - 2r$`, t`This forgets the $x^{-r}$ from $\left(\frac{3}{x}\right)^r$.`],
    ],
    answer: "A",
    explanation: t`$T_{r+1} = \binom{9}{r}(x^2)^{9-r}\left(\frac{3}{x}\right)^r = \binom{9}{r}3^r x^{18-3r}$.`,
  });

  chk(nCr(10, 7), 120);
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`What is the coefficient of $x^7$ in the expansion of $(1 + x)^{10}$?`,
    options: [
      ["120", t`Correct: $\binom{10}{7} = \binom{10}{3} = \frac{10 \times 9 \times 8}{6} = 120$.`],
      ["720", t`This is $10 \times 9 \times 8$ without dividing by $3! = 6$.`],
      ["210", t`This is $\binom{10}{4}$, the coefficient of $x^4$ or $x^6$.`],
      ["70", t`This is $10 \times 7$, which is not a binomial coefficient.`],
    ],
    answer: "A",
    explanation: t`The $x^7$ term is $\binom{10}{7}x^7$, and $\binom{10}{7} = 120$.`,
  });

  chk(expandMono(1, 1, -1, -1, 4).get(0), 6);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`What is the term independent of $x$ in the expansion of $\left(x - \dfrac{1}{x}\right)^4$?`,
    options: [
      ["6", t`Correct: $r = 2$ gives $\binom{4}{2}x^2\left(-\frac{1}{x}\right)^2 = 6$.`],
      ["−6", t`$\left(-\frac{1}{x}\right)^2$ is positive.`],
      ["4", t`This is $\binom{4}{1}$; the constant term needs $r = 2$.`],
      ["1", "This is the coefficient of x⁴, the first term."],
    ],
    answer: "A",
    explanation: t`$T_{r+1} = \binom{4}{r}(-1)^r x^{4-2r}$; $4 - 2r = 0$ gives $r = 2$ and the term $6$.`,
    hints: ["Set the power of x equal to 0."],
  });

  // Cards
  b.card("FORMULA", t`General term of $(a + b)^n$`, t`$T_{r+1} = \binom{n}{r}a^{n-r}b^r$`);
  b.card("FACT", "Position of the term with bʳ", t`It is the $(r + 1)$th term; the 4th term has $r = 3$.`);
  b.card("CONCEPT", "Term independent of x", t`Set the power of $x$ in the general term equal to 0 and solve for a whole-number $r$.`);
  b.card("CONCEPT", "No term independent of x", t`When the equation for $r$ has no whole-number solution in $0 \leq r \leq n$.`);
  b.card("CONCEPT", t`Coefficient in $(1 + kx)(a + bx)^n$`, "Add every product of terms giving the required power (usually two).");
  b.card("FORMULA", t`$\binom{n}{2}$ and $\binom{n}{3}$ in terms of $n$`, t`$\frac{n(n - 1)}{2}$ and $\frac{n(n - 1)(n - 2)}{6}$`);
  b.card("CONCEPT", t`Finding an unknown $n$`, t`Form an equation using $\binom{n}{r}$ in terms of $n$; keep the positive integer root.`);
  b.card("FACT", "Coefficient versus term", t`The coefficient of $x^5$ is a number; the term includes $x^5$.`);
});
