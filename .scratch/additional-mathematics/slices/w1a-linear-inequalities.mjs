// W1a: amath.algebra.linear-inequalities (ZIMSEC only).
import { concept, P, t, chk, same, money } from "../lib.mjs";

const SIGNS = ["<", "≤", ">", "≥"];
/** Asserts that pred(x) and claim(x) agree on a fine grid (checks a solved inequality, endpoints included). */
function agree(pred, claim, label, lo = -40, hi = 40) {
  for (let i = lo * 8; i <= hi * 8; i++) {
    const x = i / 8;
    if (pred(x) !== claim(x)) throw new Error(`inequality check failed ${label} at x = ${x}`);
  }
}
const integersIn = (claim, lo = -40, hi = 40) => { const out = []; for (let x = lo; x <= hi; x++) if (claim(x)) out.push(x); return out; };
const sel = (id, sign, wrong) => ({ id, choices: SIGNS, accepted: [sign], wrong: wrong ?? SIGNS.find((s) => s !== sign) });
const nb = (id, v, w) => ({ id, input: "number", accepted: [v], wrong: w });

concept("amath.algebra.linear-inequalities", { file: "algebra/linear-inequalities", keyPrefix: "algebra.linear-inequalities" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "Which operation, applied to both sides of an inequality, requires the inequality sign to be reversed?",
    options: [
      ["Dividing both sides by −3", "Correct: multiplying or dividing by a negative number reverses the order of numbers."],
      ["Subtracting 3 from both sides", "Adding or subtracting any number keeps the order of the two sides."],
      ["Multiplying both sides by 3", "Multiplying by a positive number keeps the order."],
      ["Adding −3 to both sides", "Adding a negative number is a subtraction; the order is unchanged."],
    ],
    answer: "A",
    explanation: "Only multiplying or dividing both sides by a negative number reverses an inequality; for example 2 < 5 but −2 > −5.",
  });

  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`A number line shows a filled (solid) circle at $-2$ with a line and arrow going to the right. Which inequality does it show?`,
    options: [
      [t`$x \geq -2$`, "Correct: a filled circle includes −2, and the arrow to the right means larger values."],
      [t`$x > -2$`, "An open circle would be used for a strict inequality."],
      [t`$x \leq -2$`, "The arrow points right, towards larger values."],
      [t`$x < -2$`, "Both the circle and the direction are wrong for this inequality."],
    ],
    answer: "A",
    explanation: "Filled circle: the endpoint is included (≥ or ≤). Arrow to the right: all larger values.",
  });

  // 4x + 7 < 19 -> x < 3
  agree((x) => 4 * x + 7 < 19, (x) => x < 3, "q3");
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Solve $4x + 7 < 19$.`,
    template: "x {{blank:s}} {{blank:v}}",
    blanks: [sel("s", "<", ">"), nb("v", 3, 6.5)],
    explanation: t`Subtract 7: $4x < 12$. Divide by 4: $x < 3$.`,
  });

  // 9 − 4x ≥ 21 -> x ≤ −3
  agree((x) => 9 - 4 * x >= 21, (x) => x <= -3, "q4");
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Solve $9 - 4x \geq 21$.`,
    template: "x {{blank:s}} {{blank:v}}",
    blanks: [sel("s", "≤", "≥"), nb("v", -3, 3)],
    explanation: t`Subtract 9: $-4x \geq 12$. Divide by $-4$ and reverse the sign: $x \leq -3$.`,
  });

  // 3(x − 2) > 5x + 4 -> x < −5
  agree((x) => 3 * (x - 2) > 5 * x + 4, (x) => x < -5, "q5");
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Solve $3(x - 2) > 5x + 4$.`,
    template: "x {{blank:s}} {{blank:v}}",
    blanks: [sel("s", "<", ">"), nb("v", -5, 5)],
    explanation: t`Expand: $3x - 6 > 5x + 4$. Subtract $5x$ and add 6: $-2x > 10$. Divide by $-2$ and reverse: $x < -5$. (Or collect on the right: $-10 > 2x$, so $x < -5$.)`,
    hints: ["Expand the bracket first.", "Divide by a negative number? Reverse the sign."],
  });

  // −7 ≤ 2x − 3 < 5 -> −2 ≤ x < 4
  agree((x) => -7 <= 2 * x - 3 && 2 * x - 3 < 5, (x) => -2 <= x && x < 4, "q6");
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Solve the double inequality $-7 \leq 2x - 3 < 5$.`,
    template: "{{blank:a}} {{blank:s1}} x {{blank:s2}} {{blank:c}}",
    blanks: [nb("a", -2, -5), sel("s1", "≤", "<"), sel("s2", "<", "≤"), nb("c", 4, 1)],
    explanation: t`Add 3 to all three parts: $-4 \leq 2x < 8$. Divide all three parts by 2: $-2 \leq x < 4$.`,
    hints: ["Do the same thing to all three parts.", "Keep each sign as it is: you only divide by positive 2."],
  });

  // 3 ≤ 7 − 2x < 15 -> −4 < x ≤ 2
  agree((x) => 3 <= 7 - 2 * x && 7 - 2 * x < 15, (x) => -4 < x && x <= 2, "q7");
  b.fib({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`Solve $3 \leq 7 - 2x < 15$, giving your answer with the smaller number on the left.`,
    template: "{{blank:a}} {{blank:s1}} x {{blank:s2}} {{blank:c}}",
    blanks: [nb("a", -4, 2), sel("s1", "<", "≤"), sel("s2", "≤", "<"), nb("c", 2, -4)],
    explanation: t`Subtract 7: $-4 \leq -2x < 8$. Divide by $-2$ and reverse both signs: $2 \geq x > -4$. Rewritten: $-4 < x \leq 2$.`,
    hints: ["Subtract 7 from all three parts.", "Dividing by −2 reverses both signs; then rewrite with the smaller number first."],
  });

  same(integersIn((x) => -3 < x && x <= 4), [-2, -1, 0, 1, 2, 3, 4]);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`How many integers satisfy $-3 < x \leq 4$?`,
    value: 7, wrong: [8, 6],
    explanation: t`The integers are $-2, -1, 0, 1, 2, 3, 4$: seven of them. $-3$ is excluded (strict sign) and $4$ is included.`,
  });

  // 2(3x − 1) < 4x + 9 -> x < 5.5 -> largest integer 5
  agree((x) => 2 * (3 * x - 1) < 4 * x + 9, (x) => x < 5.5, "q9");
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the largest integer $x$ that satisfies $2(3x - 1) < 4x + 9$.`,
    value: 5, wrong: [6, 5.5],
    explanation: t`$6x - 2 < 4x + 9$, so $2x < 11$ and $x < 5.5$. The largest integer below 5.5 is 5.`,
    hints: ["Solve the inequality first, then look for the largest whole number in the set."],
  });

  // (2x − 1)/3 > (x + 2)/4 -> x > 2 -> smallest integer 3
  agree((x) => (2 * x - 1) / 3 > (x + 2) / 4, (x) => x > 2, "q10");
  b.num({
    d: 3, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Find the smallest integer $x$ that satisfies $\dfrac{2x - 1}{3} > \dfrac{x + 2}{4}$.`,
    value: 3, wrong: [2, -2],
    explanation: t`Multiply by 12: $4(2x - 1) > 3(x + 2)$, so $8x - 4 > 3x + 6$, $5x > 10$ and $x > 2$. The smallest integer greater than 2 is 3.`,
    hints: ["Multiply every term by 12."],
  });

  b.tf({
    d: 1, skill: "UNDERSTANDING", calculator: false,
    stem: t`If $-x < 4$, then $x < -4$.`,
    answer: false,
    explanation: t`Multiplying by $-1$ reverses the sign: $-x < 4$ gives $x > -4$.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`No value of $x$ satisfies both $x > 3$ and $x < -1$.`,
    answer: true,
    explanation: "Numbers greater than 3 and numbers less than −1 do not overlap on the number line, so the combined solution set is empty.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each solution set to the number line that shows it.",
    pairs: [
      [t`$\{x : x > 2\}$`, "Open circle at 2, arrow to the right"],
      [t`$\{x : x \leq 2\}$`, "Filled circle at 2, arrow to the left"],
      [t`$\{x : -2 < x \leq 2\}$`, "Open circle at −2, filled circle at 2, line between them"],
      [t`$\{x : x \geq -2\}$`, "Filled circle at −2, arrow to the right"],
    ],
    explanation: "Filled circles include the endpoint (≤, ≥); open circles exclude it (<, >). The line or arrow covers every value in the set.",
  });

  // 3x + 2 > −4 and 2x − 5 ≤ 3 -> −2 < x ≤ 4
  same(integersIn((x) => 3 * x + 2 > -4 && 2 * x - 5 <= 3), [-1, 0, 1, 2, 3, 4]);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Which set lists all the integers that satisfy both $3x + 2 > -4$ and $2x - 5 \leq 3$?`,
    options: [
      [t`$\{-1, 0, 1, 2, 3, 4\}$`, t`Correct: $x > -2$ and $x \leq 4$.`],
      [t`$\{-2, -1, 0, 1, 2, 3, 4\}$`, t`$-2$ is excluded: $3(-2) + 2 = -4$, which is not greater than $-4$.`],
      [t`$\{-1, 0, 1, 2, 3\}$`, t`$4$ is included: $2(4) - 5 = 3 \leq 3$.`],
      [t`$\{-2, -1, 0, 1, 2, 3\}$`, "Both endpoints have been treated the wrong way round."],
    ],
    answer: "A",
    explanation: t`$3x > -6$ gives $x > -2$; $2x \leq 8$ gives $x \leq 4$. The integers with $-2 < x \leq 4$ are $-1, 0, 1, 2, 3, 4$.`,
    hints: ["Solve each inequality, then take the overlap.", "Check each endpoint against its sign."],
  });

  agree((x) => -3 * x > 12, (x) => x < -4, "q15");
  b.mcq({
    d: 3, skill: "EVALUATION", calculator: false,
    stem: t`Nyasha solves $-3x > 12$ and writes "$x > -4$". She tests $x = 0$. What does her test show?`,
    options: [
      [t`Her answer is wrong: $x = 0$ satisfies $x > -4$ but $-3(0) = 0$ is not greater than 12, so the answer is $x < -4$.`, "Correct: a value in her set fails the original inequality, so the sign should have been reversed."],
      [t`Her answer is right, because $0 > -4$ is true.`, "Being in her answer set is not enough: x = 0 must also satisfy the original inequality, and it does not."],
      [t`Her answer is wrong: it should be $x > 4$, because dividing by $-3$ changes the sign of 12.`, t`Dividing $12$ by $-3$ gives $-4$; the sign that must change is the inequality sign.`],
      [t`Her answer is wrong: it should be $x < 4$, because dividing by $-3$ reverses the sign.`, t`The sign is reversed correctly, but $12 \div (-3) = -4$, not $4$.`],
    ],
    answer: "A",
    explanation: t`Dividing by $-3$ reverses the sign: $x < -4$. Testing a value from the claimed set against the original inequality is a quick way to catch this.`,
    hints: [t`Substitute $x = 0$ into $-3x > 12$.`],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 3,
    stem: t`Describe how to show the solution set $-1 < x \leq 3$ on a number line.`,
    points: ["An open (unfilled) circle at −1", "A filled (solid) circle at 3", "A line joining the two circles (no arrows)"],
    modelAnswer: "Draw an open circle at −1 because −1 is not included, a filled circle at 3 because 3 is included, and a line between them.",
    explanation: "Strict signs (<, >) give open circles; inclusive signs (≤, ≥) give filled circles. A double inequality is a segment between the two endpoints.",
    hints: ["Which endpoint is included?"],
  });

  agree((x) => x / -2 >= 3, (x) => x <= -6, "q19");
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Solve $\dfrac{x}{-2} \geq 3$.`,
    options: [
      [t`$x \leq -6$`, t`Correct: multiply by $-2$ and reverse the sign.`],
      [t`$x \geq -6$`, "Multiplying by a negative number must reverse the sign."],
      [t`$x \leq -1.5$`, t`Multiply by $-2$; do not divide 3 by $-2$.`],
      [t`$x \geq 6$`, t`$3 \times (-2) = -6$, and the sign reverses.`],
    ],
    answer: "A",
    explanation: t`Multiply both sides by $-2$ (negative), reversing the sign: $x \leq -6$. Check: $x = -8$ gives $4 \geq 3$ ✓.`,
  });

  // Structured (7 marks): kombi hire 15 + 2.5x ≤ 65 and x > 12
  agree((x) => 15 + 2.5 * x <= 65, (x) => x <= 20, "q17a");
  same(integersIn((x) => x > 12 && x <= 20), [13, 14, 15, 16, 17, 18, 19, 20]);
  const least = 15 + 2.5 * 13;
  chk(least, 47.5);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: `A kombi company in Gweru charges ${money(15)} plus ${money(2.5)} per kilometre for a private hire. Tendai's club can spend at most ${money(65)}, and the trip to the event is more than 12 km. Let x be the length of the trip in kilometres.`,
    parts: [
      P.fib({
        label: "(a)", marks: 2, stem: "Form an inequality for the cost and solve it.",
        template: "x {{blank:s}} {{blank:v}}",
        blanks: [sel("s", "≤", "<"), nb("v", 20, 26)],
        explanation: t`$15 + 2.5x \leq 65$, so $2.5x \leq 50$ and $x \leq 20$.`,
      }),
      P.fib({
        label: "(b)", marks: 2, stem: "Combine your answer with the distance condition as a double inequality.",
        template: "{{blank:a}} {{blank:s1}} x {{blank:s2}} {{blank:c}}",
        blanks: [nb("a", 12, 20), sel("s1", "<", "≤"), sel("s2", "≤", "<"), nb("c", 20, 12)],
        explanation: t`The trip is more than 12 km ($x > 12$) and $x \leq 20$: $12 < x \leq 20$.`,
      }),
      P.num({
        label: "(c)", marks: 1, stem: "How many whole-number trip lengths are possible?",
        value: 8, wrong: [9, 7],
        explanation: "13, 14, …, 20: eight whole numbers.",
      }),
      P.num({
        label: "(d)", marks: 2, stem: "Find the least possible cost for a whole-number trip length.",
        value: least, prefix: "US$", answer: "47.50", tol: 0.005, wrong: [45, 65],
        explanation: `The shortest whole-number trip is 13 km: ${money(15)} + 13 × ${money(2.5)} = ${money(47.5)}.`,
      }),
    ],
    explanation: t`$15 + 2.5x \leq 65$ gives $x \leq 20$; with $x > 12$ the set is $12 < x \leq 20$, which contains the 8 integers 13 to 20. The cheapest of these is 13 km at US\$47.50.`,
    hints: ["Cost = 15 + 2.5x.", "More than 12 km means x > 12, so 12 itself is excluded."],
  });

  // Structured (9 marks)
  agree((x) => 5 - 2 * (x - 1) < 3 * x - 8, (x) => x > 3, "q18a");
  agree((x) => (x + 4) / 2 >= x - 3, (x) => x <= 10, "q18b");
  same(integersIn((x) => x > 3 && x <= 10).filter((n) => [2, 3, 5, 7, 11].includes(n)), [5, 7]);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`Two inequalities are $5 - 2(x - 1) < 3x - 8$ and $\dfrac{x + 4}{2} \geq x - 3$.`,
    parts: [
      P.fib({
        label: "(a)", marks: 2, stem: "Solve the first inequality.",
        template: "x {{blank:s}} {{blank:v}}",
        blanks: [sel("s", ">", "<"), nb("v", 3, -3)],
        explanation: t`$5 - 2x + 2 < 3x - 8$, so $15 < 5x$ and $x > 3$.`,
      }),
      P.fib({
        label: "(b)", marks: 2, stem: "Solve the second inequality.",
        template: "x {{blank:s}} {{blank:v}}",
        blanks: [sel("s", "≤", "≥"), nb("v", 10, 2)],
        explanation: t`Multiply by 2: $x + 4 \geq 2x - 6$, so $10 \geq x$, that is $x \leq 10$.`,
      }),
      P.fib({
        label: "(c)", marks: 2, stem: "Write the values of x that satisfy both inequalities as a double inequality.",
        template: "{{blank:a}} {{blank:s1}} x {{blank:s2}} {{blank:c}}",
        blanks: [nb("a", 3, 10), sel("s1", "<", "≤"), sel("s2", "≤", "<"), nb("c", 10, 3)],
        explanation: t`Overlap of $x > 3$ and $x \leq 10$: $3 < x \leq 10$.`,
      }),
      P.fib({
        label: "(d)", marks: 2, stem: "List the prime numbers that satisfy both inequalities.",
        template: "{{blank:p1}} and {{blank:p2}} (smaller first)",
        blanks: [nb("p1", 5, 3), nb("p2", 7, 9)],
        explanation: "The integers in the set are 4, 5, …, 10; of these only 5 and 7 are prime (3 is excluded).",
      }),
      P.manual({
        label: "(e)", marks: 1, stem: "Describe the endpoints you would draw to show the combined set on a number line.",
        points: ["Open circle at 3 and filled circle at 10, joined by a line"],
        modelAnswer: "An open circle at 3, a filled circle at 10 and a line between them.",
      }),
    ],
    explanation: t`The first inequality gives $x > 3$, the second $x \leq 10$; together $3 < x \leq 10$, which contains the primes 5 and 7.`,
    hints: ["Expand and collect for (a); multiply by 2 for (b).", "Primes are 2, 3, 5, 7, 11, …"],
  });

  b.card("FACT", "When do you reverse an inequality sign?", "Only when multiplying or dividing both sides by a negative number.");
  b.card("DEFINITION", "Set notation {x : x > 4}", "The set of all x such that x is greater than 4.");
  b.card("CONCEPT", "Open and filled circles on a number line", "Open circle: endpoint not included (< or >). Filled circle: endpoint included (≤ or ≥).");
  b.card("CONCEPT", "Solving a double inequality", t`Apply each step to all three parts: $-5 < 3x + 1 \leq 10 \Rightarrow -2 < x \leq 3$.`);
  b.card("CONCEPT", "Two inequalities together", "Solve each, then take the overlap of the two solution sets (it may be empty).");
  b.card("FACT", "Clearing fractions in an inequality", "Multiply every term by the (positive) common denominator; the sign does not change.");
  b.card("FACT", "Words to symbols", "at most: ≤; at least: ≥; more than: >; fewer than / less than: <.");
  b.card("CONCEPT", "Checking an inequality answer", "Substitute one value inside your set and one outside into the original inequality.");
});
