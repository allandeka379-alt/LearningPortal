// W2b: amath.series.binomial-expansion (Cambridge only: tagged automatically)
import { concept, P, t, chk, same, nCr, binomialCoeffs } from "../lib.mjs";

const N = (id, x, wrong) => ({ id, input: "number", accepted: [x], wrong });

concept("amath.series.binomial-expansion", { file: "series/binomial-expansion", keyPrefix: "series.binomial-expansion" }, (b) => {
  same([0, 1, 2, 3, 4].map((r) => nCr(4, r)), [1, 4, 6, 4, 1]);
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`Which list gives the binomial coefficients of $(a + b)^4$?`,
    options: [
      ["1, 4, 6, 4, 1", "Correct: row 4 of Pascal's triangle."],
      ["1, 3, 3, 1", t`This is the row for $(a + b)^3$.`],
      ["1, 4, 4, 1", "The middle coefficient is 3 + 3 = 6, and there are five terms."],
      ["1, 5, 10, 10, 5, 1", t`This is the row for $(a + b)^5$.`],
    ],
    answer: "A",
    explanation: t`$(a + b)^4 = a^4 + 4a^3b + 6a^2b^2 + 4ab^3 + b^4$: five terms with coefficients $\binom{4}{0}, \ldots, \binom{4}{4} = 1, 4, 6, 4, 1$.`,
  });

  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`How many terms are there in the expansion of $(a + b)^7$?`,
    options: [
      ["8", t`Correct: the powers of $b$ run from 0 to 7, giving $7 + 1 = 8$ terms.`],
      ["7", "This leaves out one term: the powers run from 0 to 7 inclusive."],
      ["14", "This doubles n; the number of terms is n + 1."],
      ["128", t`$2^7 = 128$ is the sum of the coefficients, not the number of terms.`],
    ],
    answer: "A",
    explanation: t`$(a + b)^n$ has $n + 1$ terms, so $(a + b)^7$ has 8.`,
  });

  chk(nCr(6, 2), 15);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Evaluate $\dbinom{6}{2}$.`,
    value: 15, wrong: [30, 12],
    explanation: t`$\binom{6}{2} = \frac{6 \times 5}{2 \times 1} = 15$. (Forgetting to divide by $2!$ gives 30.)`,
  });

  chk(binomialCoeffs(1, 1, 7)[2], 21);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Find the coefficient of $x^2$ in the expansion of $(1 + x)^7$.`,
    value: 21, wrong: [7, 42],
    explanation: t`The $x^2$ term is $\binom{7}{2}(1)^5x^2 = 21x^2$.`,
  });

  same(binomialCoeffs(3, 1, 3).reverse(), [1, 9, 27, 27]);
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Expand $(x + 3)^3$ fully. Complete: $(x + 3)^3 = x^3 + px^2 + qx + r$.`,
    template: "p = {{blank:p}}, q = {{blank:q}}, r = {{blank:r}}",
    blanks: [N("p", 9, "3"), N("q", 27, "9"), N("r", 27, "9")],
    explanation: t`Coefficients $1, 3, 3, 1$: $x^3 + 3x^2(3) + 3x(3)^2 + 3^3 = x^3 + 9x^2 + 27x + 27$.`,
  });

  same(binomialCoeffs(1, -2, 6).slice(0, 3), [1, -12, 60]);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The first three terms of $(1 - 2x)^6$, in ascending powers of $x$, are $1 + px + qx^2$. Find $p$ and $q$.`,
    template: "p = {{blank:p}}, q = {{blank:q}}",
    blanks: [N("p", -12, "12"), N("q", 60, "-60")],
    explanation: t`$\binom{6}{1}(-2x) = -12x$ and $\binom{6}{2}(-2x)^2 = 15 \times 4x^2 = 60x^2$. So $p = -12$, $q = 60$.`,
    hints: [t`Keep the bracket: $(-2x)^2 = 4x^2$.`],
  });

  same(binomialCoeffs(3, 1, 5).slice(0, 3), [243, 405, 270]);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the first three terms, in ascending powers of $x$, of $(3 + x)^5$. Complete: $(3 + x)^5 = a + bx + cx^2 + \cdots$`,
    template: "a = {{blank:a}}, b = {{blank:b}}, c = {{blank:c}}",
    blanks: [N("a", 243, "3"), N("b", 405, "15"), N("c", 270, "90")],
    explanation: t`$3^5 = 243$; $\binom{5}{1}3^4x = 5 \times 81x = 405x$; $\binom{5}{2}3^3x^2 = 10 \times 27x^2 = 270x^2$.`,
    hints: ["The powers of 3 go down: 3⁵, 3⁴, 3³."],
  });

  chk(binomialCoeffs(2, 1, 6)[3], 160);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the coefficient of $x^3$ in the expansion of $(2 + x)^6$.`,
    value: 160, wrong: [20, 320],
    explanation: t`$\binom{6}{3}2^3x^3 = 20 \times 8x^3 = 160x^3$. (The power of 2 is $6 - 3 = 3$.)`,
    hints: [t`The $x^3$ term is $\binom{6}{3}(2)^{3}x^3$.`],
  });

  chk(binomialCoeffs(3, -2, 4)[2], 216);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the coefficient of $x^2$ in the expansion of $(3 - 2x)^4$.`,
    value: 216, wrong: [-216, 108],
    explanation: t`$\binom{4}{2}(3)^2(-2x)^2 = 6 \times 9 \times 4x^2 = 216x^2$. The square makes it positive.`,
    hints: [t`Square the whole term $(-2x)$.`],
  });

  same(binomialCoeffs(1, -1, 3), [1, -3, 3, -1]);
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Which is the expansion of $(1 - x)^3$?`,
    options: [
      [t`$1 - 3x + 3x^2 - x^3$`, t`Correct: coefficients $1, 3, 3, 1$ with $b = -x$, so the signs alternate.`],
      [t`$1 - 3x - 3x^2 - x^3$`, t`$(-x)^2 = +x^2$, so the $x^2$ term is positive.`],
      [t`$1 + 3x + 3x^2 + x^3$`, t`This is $(1 + x)^3$.`],
      [t`$1 - x^3$`, "The middle terms cannot be left out."],
    ],
    answer: "A",
    explanation: t`$(1 - x)^3 = 1 + 3(-x) + 3(-x)^2 + (-x)^3 = 1 - 3x + 3x^2 - x^3$.`,
  });

  for (const [n, r] of [[7, 2], [9, 4], [12, 5]]) chk(nCr(n, r), nCr(n, n - r));
  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`For all integers $0 \leq r \leq n$, $\dbinom{n}{r} = \dbinom{n}{n - r}$.`,
    answer: true,
    explanation: t`True. $\frac{n!}{r!(n - r)!}$ is unchanged when $r$ and $n - r$ swap, which is why each row of Pascal's triangle is symmetric.`,
  });

  chk(binomialCoeffs(2, 1, 5)[0], 32);
  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`The constant term in the expansion of $(2 + x)^5$ is 2.`,
    answer: false,
    explanation: t`False. The constant term is $2^5 = 32$: the first term of the binomial is raised to the power 5.`,
  });

  const c13 = binomialCoeffs(1, -2, 5);
  const est = c13[0] + c13[1] * 0.01 + c13[2] * 0.0001;
  chk(est, 0.904);
  b.num({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`Find the first three terms of $(1 - 2x)^5$ in ascending powers of $x$, and use them with a suitable value of $x$ to estimate $0.98^5$. Give your estimate to 3 decimal places.`,
    value: 0.904, dp: 3, wrong: [0.9, 0.896],
    explanation: t`$(1 - 2x)^5 = 1 - 10x + 40x^2 + \cdots$. With $x = 0.01$: $0.98^5 \approx 1 - 0.1 + 0.004 = 0.904$. (The true value is $0.90392\ldots$)`,
    hints: [t`Choose $x$ so that $1 - 2x = 0.98$.`, t`$\binom{5}{2}(-2x)^2 = 40x^2$.`],
  });

  same([0, 1, 2, 3].map((k) => nCr(3, k) * 2 ** (3 - k)), [8, 12, 6, 1]);
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Expand $\left(2x + \dfrac{1}{x}\right)^3$ fully. Complete: $\left(2x + \dfrac{1}{x}\right)^3 = ax^3 + bx + \dfrac{c}{x} + \dfrac{1}{x^3}$.`,
    template: "a = {{blank:a}}, b = {{blank:b}}, c = {{blank:c}}",
    blanks: [N("a", 8, "2"), N("b", 12, "6"), N("c", 6, "3")],
    explanation: t`$(2x)^3 + 3(2x)^2\left(\frac{1}{x}\right) + 3(2x)\left(\frac{1}{x}\right)^2 + \left(\frac{1}{x}\right)^3 = 8x^3 + 12x + \frac{6}{x} + \frac{1}{x^3}$.`,
    hints: [t`$(2x)^2 = 4x^2$, and $x^2 \times \frac{1}{x} = x$.`],
  });

  chk(nCr(5, 2), 10); chk(nCr(6, 3), 20); chk(nCr(7, 1), 7); chk(nCr(8, 2), 28);
  b.match({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "Match each binomial coefficient with its value.",
    pairs: [
      [t`$\binom{5}{2}$`, "10"],
      [t`$\binom{6}{3}$`, "20"],
      [t`$\binom{7}{1}$`, "7"],
      [t`$\binom{8}{2}$`, "28"],
    ],
    explanation: t`$\frac{5 \times 4}{2} = 10$; $\frac{6 \times 5 \times 4}{6} = 20$; $\binom{7}{1} = 7$; $\frac{8 \times 7}{2} = 28$.`,
  });

  for (const k of [-2, 0.5, 3]) same(binomialCoeffs(3, k, 4).slice(0, 3), [81, 108 * k, 54 * k * k]);
  b.proof({
    d: 3, skill: "APPLICATION", calculator: false, marks: 2,
    stem: t`Show that the first three terms of $(3 + kx)^4$, in ascending powers of $x$, are $81 + 108kx + 54k^2x^2$.`,
    points: [
      t`M1 writes $3^4 + \binom{4}{1}3^3(kx) + \binom{4}{2}3^2(kx)^2$.`,
      t`A1 simplifies to $81 + 108kx + 54k^2x^2$, with $(kx)^2 = k^2x^2$.`,
    ],
    modelAnswer: t`$$
(3 + kx)^4 = 3^4 + \binom{4}{1}3^3(kx) + \binom{4}{2}3^2(kx)^2 + \cdots
$$

$$
= 81 + 4 \times 27kx + 6 \times 9k^2x^2 + \cdots = 81 + 108kx + 54k^2x^2 + \cdots
$$`,
    explanation: "Treat kx as the second term of the binomial and keep it in brackets.",
    hints: [t`The second term of the binomial is $kx$.`],
  });

  // Struct 1 (6): (1 + x/2)^8 first three terms -> 1 + 4x + 7x^2; estimate 1.005^8
  same(binomialCoeffs(1, 0.5, 8).slice(0, 3), [1, 4, 7]);
  const e17 = 1 + 4 * 0.01 + 7 * 0.0001;
  chk(e17, 1.0407);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: t`This question is about the expansion of $\left(1 + \dfrac{x}{2}\right)^8$.`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: t`Find the first three terms in ascending powers of $x$, in the form $1 + px + qx^2$.`, template: "p = {{blank:p}}, q = {{blank:q}}",
        blanks: [{ id: "p", input: "number", accepted: [4], marks: 1, wrong: "8" }, { id: "q", input: "number", accepted: [7], marks: 2, wrong: "28" }],
        explanation: t`$\binom{8}{1}\frac{x}{2} = 4x$ and $\binom{8}{2}\left(\frac{x}{2}\right)^2 = 28 \times \frac{x^2}{4} = 7x^2$.` }),
      P.num({ label: "(b)", marks: 2, stem: t`Use your answer with a suitable value of $x$ to estimate $1.005^8$, to 4 decimal places.`, value: e17, dp: 4, wrong: [1.04, 1.0428],
        explanation: t`$1 + \frac{x}{2} = 1.005$ when $x = 0.01$: $1 + 0.04 + 0.0007 = 1.0407$. (The true value is $1.040707\ldots$)` }),
      P.manual({ label: "(c)", marks: 1, stem: "Explain why three terms give a good estimate here.",
        points: [t`States that $x = 0.01$ is small, so the terms in $x^3$ and higher powers are very small (the next term is $7 \times 10^{-6}$ in size) and can be ignored.`],
        modelAnswer: t`With $x = 0.01$, each further term is much smaller than the one before (the $x^3$ term is $\binom{8}{3}\frac{x^3}{8} = 7 \times 10^{-6}$), so leaving them out changes only the 6th decimal place.`,
        explanation: "Higher powers of a small number are negligible." }),
    ],
    explanation: "Expand with brackets around x/2, then choose x so that the bracket equals the number to be estimated.",
    hints: [t`$\left(\frac{x}{2}\right)^2 = \frac{x^2}{4}$.`, t`Solve $1 + \frac{x}{2} = 1.005$.`],
  });

  // Struct 2 (7): (2 - x)^4 full; sum with (2 + x)^4; 1.9^4 + 2.1^4
  same(binomialCoeffs(2, -1, 4), [16, -32, 24, -8, 1]);
  for (const x of [-1.3, 0.1, 2]) chk((2 - x) ** 4 + (2 + x) ** 4, 32 + 48 * x * x + 2 * x ** 4);
  chk(1.9 ** 4 + 2.1 ** 4, 32.4802, 1e-9);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`This question is about $(2 - x)^4$ and $(2 + x)^4$.`,
    parts: [
      P.fib({ label: "(a)", marks: 4, stem: t`Expand $(2 - x)^4$ fully, in the form $16 + ax + bx^2 + cx^3 + dx^4$.`, template: "a = {{blank:a}}, b = {{blank:b}}, c = {{blank:c}}, d = {{blank:d}}",
        blanks: [N("a", -32, "32"), N("b", 24, "-24"), N("c", -8, "8"), N("d", 1, "-1")],
        explanation: t`$16 + 4(8)(-x) + 6(4)(-x)^2 + 4(2)(-x)^3 + (-x)^4 = 16 - 32x + 24x^2 - 8x^3 + x^4$.` }),
      P.fib({ label: "(b)", marks: 2, stem: t`Hence simplify $(2 - x)^4 + (2 + x)^4$ to the form $p + qx^2 + 2x^4$.`, template: "p = {{blank:p}}, q = {{blank:q}}",
        blanks: [N("p", 32, "16"), N("q", 48, "24")],
        explanation: t`$(2 + x)^4 = 16 + 32x + 24x^2 + 8x^3 + x^4$. Adding, the odd powers cancel: $32 + 48x^2 + 2x^4$.` }),
      P.num({ label: "(c)", marks: 1, stem: t`Hence find the exact value of $1.9^4 + 2.1^4$.`, value: 32.4802, dp: 4, wrong: [32.48, 32.4801],
        explanation: t`With $x = 0.1$: $32 + 48(0.01) + 2(0.0001) = 32 + 0.48 + 0.0002 = 32.4802$.` }),
    ],
    explanation: "Expand one bracket with alternating signs; adding the two expansions cancels the odd powers.",
    hints: [t`$(-x)^3 = -x^3$ but $(-x)^4 = x^4$.`, t`Use $x = 0.1$ in part (c).`],
  });

  chk(binomialCoeffs(3, 2, 4)[1], 216);
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`What is the coefficient of $x$ in the expansion of $(3 + 2x)^4$?`,
    options: [
      ["216", t`Correct: $\binom{4}{1}3^3(2x) = 4 \times 27 \times 2x = 216x$.`],
      ["108", t`This is $4 \times 27$: the 2 in $2x$ has been left out.`],
      ["24", t`This uses $3^1$ instead of $3^3$; the power of 3 is $4 - 1 = 3$.`],
      ["54", t`This is $27 \times 2$, without the coefficient $\binom{4}{1} = 4$.`],
    ],
    answer: "A",
    explanation: t`The $x$ term is $\binom{4}{1}(3)^3(2x) = 216x$.`,
  });

  chk(nCr(5, 1) * -2, -10);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`What is the second term of the expansion of $(x - 2)^5$ in descending powers of $x$?`,
    options: [
      [t`$-10x^4$`, t`Correct: $\binom{5}{1}x^4(-2) = -10x^4$.`],
      [t`$10x^4$`, t`The second term of the binomial is $-2$, so this term is negative.`],
      [t`$-2x^4$`, t`The coefficient $\binom{5}{1} = 5$ is missing.`],
      [t`$-10x$`, t`In descending powers the second term has $x^4$, not $x$.`],
    ],
    answer: "A",
    explanation: t`$(x - 2)^5 = x^5 + \binom{5}{1}x^4(-2) + \cdots = x^5 - 10x^4 + \cdots$`,
    hints: ["Descending powers start with x⁵."],
  });

  // Cards
  b.card("FORMULA", "Binomial theorem", t`$(a + b)^n = \sum_{r=0}^{n} \binom{n}{r}a^{n-r}b^r$`, "In Cambridge's List of formulas.");
  b.card("FORMULA", t`$\binom{n}{r}$`, t`$\frac{n!}{r!\,(n - r)!}$, e.g. $\binom{8}{3} = \frac{8 \times 7 \times 6}{3!} = 56$`);
  b.card("FACT", t`Number of terms in $(a + b)^n$`, t`$n + 1$`);
  b.card("FACT", "Pascal's triangle row 5", "1, 5, 10, 10, 5, 1");
  b.card("FACT", "Pascal's triangle row 6", "1, 6, 15, 20, 15, 6, 1");
  b.card("CONCEPT", "Bracket the second term", t`In $(2 - 3x)^5$ use $(-3x)^r$: e.g. $(-3x)^2 = 9x^2$.`);
  b.card("DEFINITION", "Ascending powers of x", t`Start with the constant term, then $x$, $x^2$, $\ldots$`);
  b.card("CONCEPT", "Estimating with an expansion", t`Choose $x$ so the bracket equals the number (e.g. $1 + 2x = 1.02$ gives $x = 0.01$) and add the first few terms.`);
  b.card("FACT", "Symmetry of binomial coefficients", t`$\binom{n}{r} = \binom{n}{n - r}$`);
});
