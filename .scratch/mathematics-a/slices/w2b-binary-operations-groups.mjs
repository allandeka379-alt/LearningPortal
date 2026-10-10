// W2b: amaths.groups.binary-operations-groups (ZIMSEC only)
import { concept, P, t, chk, same, cx, mat } from "../lib.mjs";

const N = (id, x, wrong, marks) => ({ id, input: "number", accepted: [String(x)], wrong, ...(marks ? { marks } : {}) });
const FR = (id, list, wrong, marks) => ({ id, input: "number", accepted: list, tolerance: 0.0005, wrong, ...(marks ? { marks } : {}) });
const TXT = (id, list, wrong, marks) => ({ id, accepted: list, wrong, ...(marks ? { marks } : {}) });
/** Checks the group axioms (closure, identity, inverses) on a finite set; associativity is inherited. */
function groupInfo(S, op) {
  for (const a of S) for (const b of S) if (!S.includes(op(a, b))) return { group: false, why: "closure" };
  const e = S.find((x) => S.every((a) => op(x, a) === a && op(a, x) === a));
  if (e === undefined) return { group: false, why: "identity" };
  const inv = {};
  for (const a of S) {
    const b = S.find((y) => op(a, y) === e && op(y, a) === e);
    if (b === undefined) return { group: false, why: `inverse of ${a}`, e };
    inv[a] = b;
  }
  return { group: true, e, inv };
}
const SAMPLES = [-2.5, -0.3, 0.7, 2, 3.4];
const forAll3 = (f, l) => { for (const a of SAMPLES) for (const b of SAMPLES) for (const c of SAMPLES) f(a, b, c, l); };

concept("amaths.groups.binary-operations-groups", { file: "groups/binary-operations-groups", keyPrefix: "groups.binary-operations-groups" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "Which of the following is NOT one of the group axioms?",
    options: [
      ["Commutativity", "Correct: groups need not be commutative; those that are are called abelian."],
      ["Closure", "Closure is an axiom: combining two elements must give an element of the set."],
      ["Associativity", "Associativity is an axiom: (a * b) * c = a * (b * c)."],
      ["Existence of inverses", "Every element must have an inverse in the set."],
    ],
    answer: "A",
    explanation: "The four group axioms are closure, associativity, identity and inverses.",
  });

  chk((5 - 3) - 1, 1); chk(5 - (3 - 1), 3);
  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false, daily: true,
    stem: "Subtraction is an associative binary operation on the integers.",
    answer: false,
    explanation: t`Counter-example: $(5 - 3) - 1 = 1$ but $5 - (3 - 1) = 3$. So the integers under subtraction are not a group.`,
  });

  const op3 = (a, c) => a + c - 3;
  for (const a of SAMPLES) chk(op3(a, 3), a);
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`The binary operation $*$ on the integers is defined by $a * b = a + b - 3$. What is the identity element?`,
    options: [
      ["3", t`Correct: $a * 3 = a + 3 - 3 = a$ and $3 * a = a$.`],
      ["0", t`$a * 0 = a - 3$, not $a$.`],
      ["−3", t`$a * (-3) = a - 6$.`],
      ["1", t`$a * 1 = a - 2$.`],
    ],
    answer: "A",
    explanation: t`Solve $a + e - 3 = a$ for all $a$: $e = 3$.`,
  });

  chk(op3(5, 1), 3);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`With $a * b = a + b - 3$ on the integers (identity 3), find the inverse of 5.`,
    value: 1, wrong: [-5, -2],
    explanation: t`$5 * b = 3 \Rightarrow 5 + b - 3 = 3 \Rightarrow b = 1$. In general the inverse of $a$ is $6 - a$.`,
  });

  const z6 = [0, 1, 2, 3, 4, 5];
  const g5 = groupInfo(z6, (a, c) => (a + c) % 6);
  same([g5.group, g5.e, g5.inv[2], g5.inv[3]], [true, 0, 4, 3]);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The set $\{0, 1, 2, 3, 4, 5\}$ under addition modulo 6 is a group. State the identity and the inverses of 2 and 3.`,
    template: "identity {{blank:e}}, inverse of 2 = {{blank:a}}, inverse of 3 = {{blank:b}}",
    blanks: [N("e", 0, "1"), N("a", 4, "-2"), N("b", 3, "-3")],
    explanation: t`0 is the identity for addition. $2 + 4 = 6 \equiv 0$ and $3 + 3 = 6 \equiv 0 \pmod 6$, so $2^{-1} = 4$ and $3^{-1} = 3$. ($-2$ is not in the set.)`,
    hints: ["Which element adds to 2 to give 0 (mod 6)?"],
  });

  const s6 = [1, 3, 5, 7], m8 = (a, c) => (a * c) % 8;
  const g6 = groupInfo(s6, m8);
  same([g6.group, g6.inv[5], m8(3, 7)], [true, 5, 5]);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`In the group $\{1, 3, 5, 7\}$ under multiplication modulo 8, find $3 \times 7$ and the inverse of 5.`,
    template: "3 × 7 = {{blank:p}} (mod 8), inverse of 5 = {{blank:i}}",
    blanks: [N("p", 5, "21"), N("i", 5, "3")],
    explanation: t`$3 \times 7 = 21 = 2 \times 8 + 5$, so $3 \times 7 \equiv 5$. $5 \times 5 = 25 \equiv 1$, so 5 is its own inverse (in fact every element of this group is self-inverse).`,
    hints: ["Reduce each product by subtracting multiples of 8."],
  });

  same(groupInfo([1, 5, 7, 11], (a, c) => (a * c) % 12).group, true);
  same(groupInfo([0, 1, 2, 3], (a, c) => (a * c) % 4).group, false);
  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: "Which of the following is a group?",
    options: [
      [t`$\{1, 5, 7, 11\}$ under multiplication modulo 12`, t`Correct: closed, identity 1, and each element is self-inverse ($5^2 = 25 \equiv 1$, $7^2 = 49 \equiv 1$, $11^2 = 121 \equiv 1$).`],
      [t`$\{0, 1, 2, 3\}$ under multiplication modulo 4`, "0 has no inverse (and neither has 2), so it fails the inverse axiom."],
      ["The integers under multiplication", t`2 has no inverse: $\frac{1}{2}$ is not an integer.`],
      ["The positive integers under addition", "There is no identity: 0 is not a positive integer."],
    ],
    answer: "A",
    explanation: "Check closure, identity and inverses; associativity is inherited from multiplication of integers.",
    hints: ["Test each set for an identity and inverses."],
  });

  const op8 = (a, c) => 2 * a + c;
  chk(op8(op8(1, 2), 3), 11); chk(op8(1, op8(2, 3)), 9);
  b.tf({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`The binary operation $a * b = 2a + b$ on the integers is associative.`,
    answer: false,
    explanation: t`$(a * b) * c = 2(2a + b) + c = 4a + 2b + c$, but $a * (b * c) = 2a + (2b + c) = 2a + 2b + c$. These differ when $a \ne 0$: e.g. $(1 * 2) * 3 = 11$ but $1 * (2 * 3) = 9$.`,
    hints: ["Expand both bracketings with letters."],
  });

  // a ∘ b = a + b + 2ab: identity 0, inverse of 3 is −3/7, −1/2 has no inverse
  const op9 = (a, c) => a + c + 2 * a * c;
  forAll3((a, c, d) => chk(op9(op9(a, c), d), op9(a, op9(c, d)), 1e-9), "assoc9");
  chk(op9(3, -3 / 7), 0);
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`The operation $\circ$ on the real numbers is $a \circ b = a + b + 2ab$. Find the identity, the inverse of 3, and the one real number that has no inverse (fractions allowed).`,
    template: "identity {{blank:e}}, inverse of 3 = {{blank:i}}, no inverse: {{blank:n}}",
    blanks: [N("e", 0, "1"), FR("i", ["-3/7", "-0.4286", "-0.429"], "-3"), FR("n", ["-1/2", "-0.5"], "0")],
    explanation: t`$a + e + 2ae = a \Rightarrow e(1 + 2a) = 0$ for all $a$, so $e = 0$. Inverse: $3 + b + 6b = 0 \Rightarrow b = -\frac{3}{7}$. In general $b = -\frac{a}{1 + 2a}$, undefined when $a = -\frac{1}{2}$.`,
    hints: ["Solve a ∘ e = a for e.", "Solve a ∘ b = e for b in terms of a."],
  });

  // a ∘ b = ab − a − b + 2 = (a − 1)(b − 1) + 1: identity 2, 1 has no inverse
  const op10 = (a, c) => a * c - a - c + 2;
  for (const a of SAMPLES) chk(op10(a, 2), a);
  chk(op10(1, 7), 1);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`The operation $\circ$ on the real numbers is defined by $a \circ b = ab - a - b + 2$. Its identity element is 2. Find the real number that has no inverse.`,
    value: 1, wrong: [2, 0],
    explanation: t`$a \circ b = (a - 1)(b - 1) + 1$. For an inverse, $(a - 1)(b - 1) + 1 = 2$, i.e. $(a - 1)(b - 1) = 1$, so $b = 1 + \frac{1}{a - 1}$. This fails only for $a = 1$, since $1 \circ b = 1$ for every $b$.`,
    hints: [t`Factorise: $ab - a - b + 1 = (a - 1)(b - 1)$.`],
  });

  b.match({
    d: 2, skill: "RECALL", calculator: false,
    stem: "Match each property of a binary operation * on a set S with its definition.",
    pairs: [
      ["Closure", "a * b ∈ S for all a, b in S"],
      ["Commutativity", "a * b = b * a for all a, b"],
      ["Associativity", "(a * b) * c = a * (b * c) for all a, b, c"],
      ["Identity", "e * a = a * e = a for all a"],
    ],
    explanation: "Inverses complete the list of group axioms: a * a⁻¹ = a⁻¹ * a = e.",
  });

  chk(2 * (3 + 4), 2 * 3 + 2 * 4); chk(1 + 1 * 1 === (1 + 1) * (1 + 1) ? 1 : 0, 0);
  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: "For real numbers, which statement about distributivity is true?",
    options: [
      [t`Multiplication distributes over addition: $a(b + c) = ab + ac$`, "Correct: this is the usual expansion of brackets."],
      [t`Addition distributes over multiplication: $a + bc = (a + b)(a + c)$`, t`False in general: with $a = b = c = 1$, $2 \ne 4$.`],
      [t`Subtraction distributes over multiplication: $a - bc = (a - b)(a - c)$`, t`False in general: with $a = 3$, $b = c = 1$, $3 - 1 = 2$ but $(3 - 1)(3 - 1) = 4$.`],
      [t`Multiplication distributes over division: $a(b \div c) = ab \div ac$`, t`$ab \div ac = \frac{b}{c}$, not $\frac{ab}{c}$.`],
    ],
    answer: "A",
    explanation: t`$\circ$ distributes over $*$ when $a \circ (b * c) = (a \circ b) * (a \circ c)$ for all $a, b, c$.`,
    hints: ["Test each with simple numbers."],
  });
  chk(3 - 1, 2); chk((3 - 1) * (3 - 1), 4);

  // group of order 3 {e, a, b}: a*a = b, a*b = e, b*b = a
  const c3 = { e: 0, a: 1, b: 2 }, add3 = (x, y) => (x + y) % 3;
  same([add3(c3.a, c3.a), add3(c3.a, c3.b), add3(c3.b, c3.b)], [2, 0, 1]);
  b.fib({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`The set $\{e, a, b\}$ is a group with identity $e$, and $a \ne b$. Use the fact that each element appears exactly once in each row of the Cayley table to find $a * a$, $a * b$ and $b * b$.`,
    template: "a * a = {{blank:p}}, a * b = {{blank:q}}, b * b = {{blank:r}}",
    blanks: [TXT("p", ["b"], "a"), TXT("q", ["e"], "b"), TXT("r", ["a"], "e")],
    explanation: t`Row $a$ already has $a * e = a$. If $a * a = e$, then $a * b$ would have to be $b$, but $e * b = b$ already uses $b$ in that column. So $a * a = b$ and $a * b = e$. Row $b$: $b * e = b$, $b * a = e$, so $b * b = a$.`,
    hints: ["Start with row a: a * e = a, so a * a and a * b must be e and b in some order."],
  });

  b.tf({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: "In the Cayley table of a finite group, every element appears exactly once in each row and in each column.",
    answer: true,
    explanation: t`If $a * x = a * y$, multiplying on the left by $a^{-1}$ gives $x = y$, so the entries of a row are all different; there are as many entries as elements, so each appears once. Columns work the same way.`,
    hints: ["Use inverses to cancel."],
  });

  const S15 = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  for (const z of S15) for (const w of S15) chk(S15.some((u) => Math.abs(u[0] - cx.mul(z, w)[0]) < 1e-12 && Math.abs(u[1] - cx.mul(z, w)[1]) < 1e-12) ? 1 : 0, 1);
  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 4,
    stem: t`Show that the set $\{1, -1, \mathrm{i}, -\mathrm{i}\}$ forms a group under multiplication of complex numbers.`,
    points: [
      t`B1 closure: a Cayley table (or argument) shows every product is in the set, e.g. $\mathrm{i} \times \mathrm{i} = -1$, $\mathrm{i} \times (-\mathrm{i}) = 1$.`,
      "B1 associativity: inherited from multiplication of complex numbers.",
      "B1 identity: 1.",
      t`B1 inverses: $1^{-1} = 1$, $(-1)^{-1} = -1$, $\mathrm{i}^{-1} = -\mathrm{i}$, $(-\mathrm{i})^{-1} = \mathrm{i}$.`,
    ],
    modelAnswer: t`Cayley table (row × column):

| $\times$ | $1$ | $-1$ | $\mathrm{i}$ | $-\mathrm{i}$ |
| --- | --- | --- | --- | --- |
| $1$ | $1$ | $-1$ | $\mathrm{i}$ | $-\mathrm{i}$ |
| $-1$ | $-1$ | $1$ | $-\mathrm{i}$ | $\mathrm{i}$ |
| $\mathrm{i}$ | $\mathrm{i}$ | $-\mathrm{i}$ | $-1$ | $1$ |
| $-\mathrm{i}$ | $-\mathrm{i}$ | $\mathrm{i}$ | $1$ | $-1$ |

Every entry is in the set (closure). Multiplication of complex numbers is associative. 1 is the identity. 1 appears in every row: $1^{-1} = 1$, $(-1)^{-1} = -1$, $\mathrm{i}^{-1} = -\mathrm{i}$, $(-\mathrm{i})^{-1} = \mathrm{i}$. All four axioms hold, so it is a group.`,
    explanation: "These are the four fourth roots of unity.",
    hints: ["Build the 4 × 4 Cayley table first."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: "Explain why the set of integers under multiplication is not a group.",
    points: ["Closure, associativity and identity (1) all hold.", "But most elements have no inverse in the set: e.g. 2 × b = 1 needs b = ½, which is not an integer (and 0 has no inverse at all)."],
    modelAnswer: "Integers are closed under multiplication, multiplication is associative and 1 is the identity, but 2 has no integer inverse (½ is not an integer), so the inverse axiom fails.",
    explanation: "One counter-example to one axiom is enough.",
    hints: ["Which axiom fails, and for which element?"],
  });

  const Mk = (k) => [[1, k], [0, 1]];
  same(mat.mul(Mk(2), Mk(5)), Mk(7)); same(mat.mul(Mk(3), Mk(-3)), Mk(0));
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`For each integer $k$, let $\mathbf{M}_k = \begin{pmatrix} 1 & k \\ 0 & 1 \end{pmatrix}$. The set of all such matrices is a group under matrix multiplication. Find $k$ such that $\mathbf{M}_2\mathbf{M}_5 = \mathbf{M}_k$, and $m$ such that $\mathbf{M}_3^{-1} = \mathbf{M}_m$.`,
    template: "k = {{blank:k}}, m = {{blank:m}}",
    blanks: [N("k", 7, "10"), N("m", -3, "3")],
    explanation: t`$\mathbf{M}_a\mathbf{M}_b = \begin{pmatrix} 1 & a + b \\ 0 & 1 \end{pmatrix} = \mathbf{M}_{a+b}$, so $k = 7$. The identity is $\mathbf{M}_0 = \mathbf{I}$ and $\mathbf{M}_3\mathbf{M}_{-3} = \mathbf{M}_0$, so $m = -3$.`,
    hints: ["Multiply two general matrices of this form."],
  });

  // Struct 12: {2, 4, 6, 8} under × mod 10: identity 6
  const S = [2, 4, 6, 8], m10 = (a, c) => (a * c) % 10;
  const g = groupInfo(S, m10);
  same([g.group, g.e, g.inv[2], g.inv[4], m10(2, 4), m10(4, 4), m10(6, 8), m10(8, 8)], [true, 6, 8, 4, 8, 6, 8, 4]);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`The set $S = \{2, 4, 6, 8\}$ is combined under multiplication modulo 10.`,
    parts: [
      P.fib({ label: "(a)", marks: 4, stem: "Find the following entries of the Cayley table.", template: "2 × 4 = {{blank:a}}, 4 × 4 = {{blank:b}}, 6 × 8 = {{blank:c}}, 8 × 8 = {{blank:d}} (all mod 10)",
        blanks: [N("a", 8, "4"), N("b", 6, "16"), N("c", 8, "48"), N("d", 4, "64")],
        explanation: t`$8$; $16 \equiv 6$; $48 \equiv 8$; $64 \equiv 4 \pmod{10}$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Find the identity element of S under this operation.", value: 6, wrong: [1, 2],
        explanation: t`$6 \times 2 = 12 \equiv 2$, $6 \times 4 = 24 \equiv 4$, $6 \times 6 = 36 \equiv 6$, $6 \times 8 = 48 \equiv 8$: 6 leaves every element unchanged. (1 is not in $S$.)` }),
      P.fib({ label: "(c)", marks: 2, stem: "Find the inverses of 2 and of 4.", template: "inverse of 2 = {{blank:a}}, inverse of 4 = {{blank:b}}",
        blanks: [N("a", 8, "6"), N("b", 4, "6")],
        explanation: t`$2 \times 8 = 16 \equiv 6$ and $4 \times 4 = 16 \equiv 6$, the identity.` }),
      P.manual({ label: "(d)", marks: 4, stem: "Hence show that S is a group under multiplication modulo 10, and state whether it is abelian.", points: ["Closure: every entry of the table is in S.", "Associativity: inherited from multiplication of integers (reduced mod 10).", "Identity 6 exists and every element has an inverse (2↔8, 4↔4, 6↔6).", "Abelian, because multiplication is commutative (the table is symmetric)."],
        modelAnswer: "The full table is: row 2: 4, 8, 2, 6; row 4: 8, 6, 4, 2; row 6: 2, 4, 6, 8; row 8: 6, 2, 8, 4. All entries lie in S (closed); modular multiplication is associative; 6 is the identity; 2 and 8 are inverses, 4 and 6 are self-inverse. So S is a group, and it is abelian since a × b = b × a.",
        explanation: "The identity of a group need not be the number 1." }),
    ],
    explanation: "A surprising identity: 6 behaves like 1 on this set.",
    hints: ["Look for the row that repeats the column headings.", "An inverse gives the identity 6, not 1."],
  });

  // Struct 13: a * b = a + b − ab on R \ {1}
  const op = (a, c) => a + c - a * c;
  forAll3((a, c, d) => chk(op(op(a, c), d), op(a, op(c, d)), 1e-9), "assoc19");
  for (const a of SAMPLES) { chk(op(a, 0), a); if (a !== 1) chk(op(a, a / (a - 1)), 0, 1e-12); }
  chk(op(3, 1.5), 0); chk(op(2, -3), 5);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`The binary operation $*$ is defined on the set $S$ of all real numbers except 1 by $a * b = a + b - ab$.`,
    parts: [
      P.proof({ label: "(a)", marks: 3, stem: t`By writing $1 - a * b$ in factorised form, show that $S$ is closed under $*$.`,
        points: [t`M1 $1 - (a + b - ab) = 1 - a - b + ab = (1 - a)(1 - b)$.`, t`M1 if $a \ne 1$ and $b \ne 1$ then $(1 - a)(1 - b) \ne 0$.`, t`A1 so $a * b \ne 1$, i.e. $a * b \in S$.`],
        modelAnswer: t`$$
1 - a * b = 1 - a - b + ab = (1 - a)(1 - b)
$$
For $a, b \in S$, both factors are non-zero, so $1 - a * b \ne 0$ and $a * b \ne 1$. Hence $a * b \in S$: $S$ is closed.`,
        explanation: "Closure here means the result is never the excluded value 1." }),
      P.proof({ label: "(b)", marks: 4, stem: t`Show that $*$ is associative.`,
        points: [t`M1 $(a * b) * c = (a + b - ab) + c - (a + b - ab)c$.`, t`A1 $= a + b + c - ab - ac - bc + abc$.`, t`M1 expands $a * (b * c)$ similarly.`, "A1 the two expressions are identical, so * is associative."],
        modelAnswer: t`$$
(a * b) * c = a + b - ab + c - ac - bc + abc = a + b + c - ab - bc - ca + abc
$$
$$
a * (b * c) = a + (b + c - bc) - a(b + c - bc) = a + b + c - ab - bc - ca + abc
$$
The expressions are equal for all $a, b, c$, so $*$ is associative.`,
        explanation: "Both bracketings give the same symmetric expression." }),
      P.num({ label: "(c)", marks: 1, stem: "Find the identity element.", value: 0, wrong: [1],
        explanation: t`$a * 0 = a + 0 - 0 = a$, and similarly $0 * a = a$.` }),
      P.expr({ label: "(d)", marks: 2, stem: "Find the inverse of a in terms of a. Type it as a single fraction, e.g. a/(2a+1).",
        accepted: ["a/(a-1)", "-a/(1-a)", "a/(-1+a)", "(a)/(a-1)"], wrong: ["a/(1-a)"],
        explanation: t`$a + b - ab = 0 \Rightarrow b(1 - a) = -a \Rightarrow b = \dfrac{a}{a - 1}$, which exists because $a \ne 1$ (and $b \ne 1$, so it lies in $S$).` }),
      P.num({ label: "(e)", marks: 1, stem: "Find the inverse of 3.", value: 1.5, wrong: [-1.5, 3],
        explanation: t`$\frac{3}{3 - 1} = 1.5$. Check: $3 + 1.5 - 4.5 = 0$.` }),
      P.num({ label: "(f)", marks: 2, stem: t`Solve the equation $2 * x = 5$.`, prefix: "x =", value: -3, wrong: [3, 7],
        explanation: t`$2 + x - 2x = 5 \Rightarrow -x = 3 \Rightarrow x = -3$.` }),
    ],
    explanation: t`$(S, *)$ is a group: closure, associativity, identity 0 and inverses $\frac{a}{a - 1}$.`,
    hints: [t`$1 - a - b + ab$ factorises.`, "Solve a * b = 0 for b to find the inverse."],
  });

  b.card("DEFINITION", "Binary operation", "A rule * that combines two elements a, b of a set (in order) to give one element a * b.");
  b.card("DEFINITION", "Group", "A set with a binary operation satisfying closure, associativity, identity and inverses.");
  b.card("DEFINITION", "Abelian group", "A group whose operation is also commutative: a * b = b * a.");
  b.card("DEFINITION", "Identity element", "e with e * a = a * e = a for every a in the set.");
  b.card("DEFINITION", "Inverse element", t`$a^{-1}$ in the set with $a * a^{-1} = a^{-1} * a = e$.`);
  b.card("CONCEPT", "Reading a Cayley table", "Identity: the row that repeats the headings. Inverses: where e appears. Commutative: symmetric about the leading diagonal.");
  b.card("FACT", "Latin square property", "In a group table every element appears exactly once in each row and each column.");
  b.card("CONCEPT", "Proving not a group", "Give one specific counter-example to one axiom (e.g. 2 has no inverse in ℤ under ×).");
  b.card("DEFINITION", "Distributivity", t`$\circ$ distributes over $*$ if $a \circ (b * c) = (a \circ b) * (a \circ c)$ for all $a, b, c$.`);
});
