---
{
  "key": "proof.induction",
  "title": "Proof by mathematical induction",
  "summary": "Understand why proof by induction works and write complete induction proofs (basis, hypothesis, inductive step, conclusion) for summation formulas, divisibility results, powers of matrices and the nth terms of recurrence relations, including forming a conjecture from trials and then proving it.",
  "concepts": ["amaths.proof.induction"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

Checking that a formula works for $n = 1, 2, 3, \ldots, 100$ does not prove it works for every $n$: the expression $n^2 + n + 41$ gives prime numbers for $n = 0$ to $39$, then fails at $n = 40$. To prove a statement for **all** positive integers you need a method that covers infinitely many cases at once. Mathematical induction is that method. Picture a long line of dominoes standing on the floor in a classroom in Gweru: if the first one falls, and each falling domino knocks over the next, then every domino falls.

This is ZIMSEC Pure Mathematics (mathematical induction, Form 6). Exam questions ask you to prove summation formulas (often ones found by standard results), divisibility statements such as "$3^{2n} + 7$ is divisible by 8", formulas for $\mathbf{A}^n$ where $\mathbf{A}$ is a matrix, and formulas for the $n$th term of a recurrence relation. Some questions ask you to calculate a few cases, make a conjecture, and then prove it.

## Key definitions

:::definition{term="Proposition P(n)"}
A statement about a positive integer $n$ that is either true or false for each value of $n$, for example "$\sum_{r=1}^{n} r^2 = \frac{n(n + 1)(2n + 1)}{6}$".
:::

:::definition{term="Principle of mathematical induction"}
If $P(1)$ is true, and $P(k)$ true implies $P(k + 1)$ true for every positive integer $k$, then $P(n)$ is true for every positive integer $n$.
:::

:::definition{term="Conjecture"}
A statement believed to be true from evidence (such as calculated cases) but not yet proved.
:::

## The structure of every proof

Every induction proof has four parts. Examiners award marks for each, so write all four, clearly labelled.

1. **Basis**: show $P(1)$ is true by working out both sides.
2. **Hypothesis**: assume $P(k)$ is true for some positive integer $k$ (write the statement out with $k$).
3. **Inductive step**: using the hypothesis, show that $P(k + 1)$ follows. Write down the target first, so you know where you are going.
4. **Conclusion**: "$P(1)$ is true, and if $P(k)$ is true then $P(k + 1)$ is true; hence, by mathematical induction, $P(n)$ is true for all positive integers $n$."

## Summation formulas

In the inductive step, split the sum to $k + 1$ into the sum to $k$ (replaced by the hypothesis) plus the $(k + 1)$th term. Then factorise towards the target, taking out common factors early.

:::worked-solution[Example 1: prove that $\displaystyle\sum_{r=1}^{n} r^2 = \frac{n(n + 1)(2n + 1)}{6}$ for all positive integers $n$]
1. Basis: $n = 1$: LHS $= 1$, RHS $= \frac{1 \times 2 \times 3}{6} = 1$. True.
2. Hypothesis: assume $\sum_{r=1}^{k} r^2 = \frac{k(k + 1)(2k + 1)}{6}$.
3. Target: $\sum_{r=1}^{k+1} r^2 = \frac{(k + 1)(k + 2)(2k + 3)}{6}$.
4. Step: $\sum_{r=1}^{k+1} r^2 = \frac{k(k + 1)(2k + 1)}{6} + (k + 1)^2 = \frac{(k + 1)}{6}\left[k(2k + 1) + 6(k + 1)\right]$.
5. The bracket is $2k^2 + 7k + 6 = (k + 2)(2k + 3)$, so the sum is $\frac{(k + 1)(k + 2)(2k + 3)}{6}$: the target.
6. Conclusion: true for $n = 1$, and true for $n = k$ implies true for $n = k + 1$, so true for all positive integers $n$ by induction.
:::

## Divisibility

Let $f(n)$ be the expression. Show $f(1)$ is divisible by the number, then write $f(k + 1)$ in terms of $f(k)$, plus something that is clearly a multiple of the divisor.

:::worked-solution[Example 2: prove that $3^{2n} + 7$ is divisible by 8 for all positive integers $n$]
1. Let $f(n) = 3^{2n} + 7$. Basis: $f(1) = 9 + 7 = 16 = 8 \times 2$. True.
2. Hypothesis: assume $f(k) = 3^{2k} + 7 = 8m$ for some integer $m$.
3. Step: $f(k + 1) = 3^{2k + 2} + 7 = 9 \times 3^{2k} + 7$.
4. Replace $3^{2k}$ by $8m - 7$: $f(k + 1) = 9(8m - 7) + 7 = 72m - 56 = 8(9m - 7)$.
5. $9m - 7$ is an integer, so $f(k + 1)$ is divisible by 8.
6. Conclusion: by induction, $3^{2n} + 7$ is divisible by 8 for all positive integers $n$.
:::

An equivalent route is $f(k + 1) - 9f(k) = -56$, which is a multiple of 8.

## Powers of matrices

To prove a formula for $\mathbf{A}^n$, use $\mathbf{A}^{k+1} = \mathbf{A}^k\mathbf{A}$ (or $\mathbf{A}\mathbf{A}^k$) and multiply out.

:::worked-solution[Example 3: given $\mathbf{A} = \begin{pmatrix} 2 & 1 \\ 0 & 1 \end{pmatrix}$, prove that $\mathbf{A}^n = \begin{pmatrix} 2^n & 2^n - 1 \\ 0 & 1 \end{pmatrix}$]
1. Basis: $n = 1$: $\begin{pmatrix} 2 & 1 \\ 0 & 1 \end{pmatrix}$, which is $\mathbf{A}$. True.
2. Hypothesis: assume $\mathbf{A}^k = \begin{pmatrix} 2^k & 2^k - 1 \\ 0 & 1 \end{pmatrix}$.
3. Step: $\mathbf{A}^{k+1} = \mathbf{A}^k\mathbf{A} = \begin{pmatrix} 2^k \cdot 2 & 2^k + 2^k - 1 \\ 0 & 1 \end{pmatrix} = \begin{pmatrix} 2^{k+1} & 2^{k+1} - 1 \\ 0 & 1 \end{pmatrix}$.
4. This is the formula with $n = k + 1$. Conclusion: true for all positive integers $n$ by induction.
:::

## Recurrence relations

For a sequence defined by $u_1$ and a rule $u_{n+1} = g(u_n)$, prove a formula for $u_n$ by using the rule in the inductive step.

:::worked-solution[Example 4: $u_1 = 2$ and $u_{n+1} = 3u_n - 2$. Prove that $u_n = 3^{n-1} + 1$]
1. Basis: $3^0 + 1 = 2 = u_1$. True.
2. Hypothesis: assume $u_k = 3^{k-1} + 1$.
3. Step: $u_{k+1} = 3u_k - 2 = 3(3^{k-1} + 1) - 2 = 3^k + 1$.
4. This is the formula with $n = k + 1$. Conclusion: true for all positive integers $n$ by induction.
:::

## Conjecture, then prove

:::worked-solution[Example 5: find $S_n = \sum_{r=1}^{n} \frac{1}{r(r + 1)}$ for $n = 1, 2, 3$, make a conjecture, and prove it]
1. $S_1 = \frac{1}{2}$, $S_2 = \frac{1}{2} + \frac{1}{6} = \frac{2}{3}$, $S_3 = \frac{2}{3} + \frac{1}{12} = \frac{3}{4}$.
2. Conjecture: $S_n = \frac{n}{n + 1}$.
3. Basis: $S_1 = \frac{1}{2}$. True.
4. Hypothesis: assume $S_k = \frac{k}{k + 1}$.
5. Step: $S_{k+1} = \frac{k}{k + 1} + \frac{1}{(k + 1)(k + 2)} = \frac{k(k + 2) + 1}{(k + 1)(k + 2)} = \frac{(k + 1)^2}{(k + 1)(k + 2)} = \frac{k + 1}{k + 2}$.
6. Conclusion: the conjecture is true for all positive integers $n$ by induction.
:::

## Common mistakes

:::mistake{title="Assuming what you want to prove"}
The hypothesis is about $n = k$ only. Never write "assume true for $n = k + 1$".
:::

:::mistake{title="Missing the basis or the conclusion"}
Without the basis the dominoes never start falling; without the conclusion the argument is incomplete. Both carry marks.
:::

:::mistake{title="Not using the hypothesis"}
If the inductive step never uses $P(k)$, it is not an induction proof. Point out where you use it.
:::

:::mistake{title="Algebra aimed nowhere"}
Write the target $P(k + 1)$ before starting the step, and factorise towards it rather than expanding everything.
:::

## Exam tips

:::exam-tip
Use the words "assume", "then", "hence" and the full conclusion sentence; mark schemes reward the logical structure.
:::

:::exam-tip
For divisibility, show the multiple explicitly, e.g. $8(9m - 7)$, and say why the bracket is an integer.
:::

:::exam-tip
If a question says "conjecture", show the calculated cases first, state the formula, then prove it.
:::

## Summary

:::summary
- Induction proves $P(n)$ for all positive integers: basis $P(1)$, hypothesis $P(k)$, step $P(k) \Rightarrow P(k + 1)$, conclusion.
- Sums: $S_{k+1} = S_k + u_{k+1}$, then factorise to the target.
- Divisibility: express $f(k + 1)$ as a multiple of the divisor using $f(k)$.
- Matrices: $\mathbf{A}^{k+1} = \mathbf{A}^k\mathbf{A}$. Recurrences: substitute the hypothesis into the rule.
- Checking cases suggests a conjecture; only induction proves it.
:::
