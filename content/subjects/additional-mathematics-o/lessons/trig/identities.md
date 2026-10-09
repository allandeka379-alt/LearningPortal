---
{
  "key": "trig.identities",
  "title": "Trigonometric identities and proofs",
  "summary": "Use tan θ = sin θ / cos θ, cot θ = cos θ / sin θ and the three Pythagorean identities sin²θ + cos²θ = 1, sec²θ = 1 + tan²θ and cosec²θ = 1 + cot²θ to simplify expressions and to prove identities involving the six trigonometric functions, setting out a 'show that' clearly.",
  "concepts": ["amath.trig.identities"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

An **identity** is a statement that is true for **every** value of the variable for which both sides are defined. You already use algebraic identities such as $(a + b)^2 \equiv a^2 + 2ab + b^2$. Trigonometry has its own identities, and they are the main tool for two kinds of examination question:

- **prove** (or **show that**) one trigonometric expression is identical to another, and
- **solve** an equation by first rewriting it in terms of one function (the next lesson).

A proof question usually carries 3 to 5 marks, and the marks are for a clear chain of correct steps. This lesson shows the identities you need, how they are derived, and a reliable way to set out a proof.

## Key definitions

:::definition{term="Identity"}
An equation that holds for all values of the variable for which both sides are defined, written with $\equiv$ (or $=$ when the context makes it clear). An **equation** such as $\sin x = \frac{1}{2}$ is true only for particular values.
:::

:::formula{name="Quotient identities (not in the List of formulas)"}
$$
\tan\theta = \frac{\sin\theta}{\cos\theta}, \qquad \cot\theta = \frac{\cos\theta}{\sin\theta}
$$
:::

:::formula{name="Pythagorean identities (in Cambridge's List of formulas)"}
$$
\sin^2\theta + \cos^2\theta = 1
$$

$$
\sec^2\theta = 1 + \tan^2\theta
$$

$$
\operatorname{cosec}^2\theta = 1 + \cot^2\theta
$$
:::

Notation: $\sin^2\theta$ means $(\sin\theta)^2$. It is not $\sin(\theta^2)$.

## Where the identities come from

Take the point $P(x, y)$ at distance $r$ from the origin on the arm of $\theta$. Pythagoras gives $x^2 + y^2 = r^2$. Dividing by $r^2$:

$$
\left(\frac{x}{r}\right)^2 + \left(\frac{y}{r}\right)^2 = 1 \quad\Rightarrow\quad \cos^2\theta + \sin^2\theta = 1
$$

Dividing $\sin^2\theta + \cos^2\theta = 1$ by $\cos^2\theta$ gives $\tan^2\theta + 1 = \sec^2\theta$; dividing by $\sin^2\theta$ gives $1 + \cot^2\theta = \operatorname{cosec}^2\theta$. So you only need to remember the first and how to divide.

Useful rearrangements:

$$
\cos^2\theta = 1 - \sin^2\theta, \qquad \tan^2\theta = \sec^2\theta - 1, \qquad \cot^2\theta = \operatorname{cosec}^2\theta - 1
$$

## Simplifying expressions

To simplify, it often helps to write everything in terms of $\sin$ and $\cos$, then look for a Pythagorean pattern or a common factor.

:::worked-solution[Example 1: simplify $\dfrac{1 - \cos^2\theta}{\sin\theta\cos\theta}$]
1. Replace the numerator: $1 - \cos^2\theta = \sin^2\theta$.
2. $\dfrac{\sin^2\theta}{\sin\theta\cos\theta} = \dfrac{\sin\theta}{\cos\theta}$ (cancel one factor $\sin\theta$).
3. $= \tan\theta$.
:::

## How to set out a proof

1. **Start with one side**, usually the more complicated one, and work on it alone. Never write the identity as if it were already true and manipulate both sides together.
2. Use the identities and ordinary algebra (common denominators, factorising, the difference of two squares $1 - \cos^2\theta = (1 - \cos\theta)(1 + \cos\theta)$).
3. Write **one step per line**, each step following from the line before.
4. Finish with the other side exactly as printed and a short conclusion such as "$= \text{RHS}$".

If both sides are complicated, you may simplify each separately to the same expression, but say so clearly.

:::worked-solution[Example 2: prove that $\dfrac{\sin\theta}{1 - \cos\theta} - \dfrac{\sin\theta}{1 + \cos\theta} \equiv 2\cot\theta$]
1. Start with the left-hand side and use the common denominator $(1 - \cos\theta)(1 + \cos\theta)$.
2. $\text{LHS} = \dfrac{\sin\theta(1 + \cos\theta) - \sin\theta(1 - \cos\theta)}{(1 - \cos\theta)(1 + \cos\theta)}$.
3. Numerator: $\sin\theta + \sin\theta\cos\theta - \sin\theta + \sin\theta\cos\theta = 2\sin\theta\cos\theta$.
4. Denominator: $1 - \cos^2\theta = \sin^2\theta$.
5. $\text{LHS} = \dfrac{2\sin\theta\cos\theta}{\sin^2\theta} = \dfrac{2\cos\theta}{\sin\theta} = 2\cot\theta = \text{RHS}$.
:::

:::worked-solution[Example 3: prove that $\sec^2\theta + \operatorname{cosec}^2\theta \equiv \sec^2\theta\operatorname{cosec}^2\theta$]
1. $\text{LHS} = \dfrac{1}{\cos^2\theta} + \dfrac{1}{\sin^2\theta}$.
2. $= \dfrac{\sin^2\theta + \cos^2\theta}{\cos^2\theta\sin^2\theta}$.
3. $= \dfrac{1}{\cos^2\theta\sin^2\theta}$, using $\sin^2\theta + \cos^2\theta = 1$.
4. $= \dfrac{1}{\cos^2\theta} \times \dfrac{1}{\sin^2\theta} = \sec^2\theta\operatorname{cosec}^2\theta = \text{RHS}$.
:::

:::worked-solution[Example 4 (exam style): show that $\dfrac{1 + \sin x}{\cos x} + \dfrac{\cos x}{1 + \sin x} \equiv 2\sec x$]
1. Common denominator $\cos x\,(1 + \sin x)$:
   $\text{LHS} = \dfrac{(1 + \sin x)^2 + \cos^2 x}{\cos x\,(1 + \sin x)}$.
2. Expand: $(1 + \sin x)^2 + \cos^2 x = 1 + 2\sin x + \sin^2 x + \cos^2 x$.
3. Use $\sin^2 x + \cos^2 x = 1$: the numerator is $2 + 2\sin x = 2(1 + \sin x)$.
4. $\text{LHS} = \dfrac{2(1 + \sin x)}{\cos x\,(1 + \sin x)} = \dfrac{2}{\cos x} = 2\sec x = \text{RHS}$.
:::

:::worked-solution[Example 5: prove that $\tan\theta + \cot\theta \equiv \sec\theta\operatorname{cosec}\theta$]
1. $\text{LHS} = \dfrac{\sin\theta}{\cos\theta} + \dfrac{\cos\theta}{\sin\theta} = \dfrac{\sin^2\theta + \cos^2\theta}{\sin\theta\cos\theta}$.
2. $= \dfrac{1}{\sin\theta\cos\theta} = \dfrac{1}{\cos\theta} \times \dfrac{1}{\sin\theta} = \sec\theta\operatorname{cosec}\theta = \text{RHS}$.
:::

## A useful trick: multiplying by a conjugate

When a denominator is $1 - \cos\theta$, $1 + \sin\theta$ or similar, multiply the top and bottom by the same expression with the opposite sign. The denominator becomes a difference of two squares and then a single squared function:

$$
\frac{1}{1 - \cos\theta} = \frac{1 + \cos\theta}{(1 - \cos\theta)(1 + \cos\theta)} = \frac{1 + \cos\theta}{1 - \cos^2\theta} = \frac{1 + \cos\theta}{\sin^2\theta}
$$

This often turns a proof that seems stuck into a two-line simplification.

## Using an identity to find values

Identities also give one value from another without finding the angle. If $\tan\theta = 3$, then $\sec^2\theta = 1 + 9 = 10$ for **every** such $\theta$. If $\sin\theta + \cos\theta = k$, squaring gives $1 + 2\sin\theta\cos\theta = k^2$, so $\sin\theta\cos\theta = \frac{k^2 - 1}{2}$.

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC asks you to prove simple trigonometric identities; Cambridge 0606 names the three Pythagorean identities (printed in the List of formulas) and proofs involving all six functions. The quotient identities are not printed by either board: learn them.
:::

## Common mistakes

:::mistake{title="Working on both sides at once"}
Writing the identity, then doing the same thing to both sides, assumes what you are trying to prove. Transform one side until it becomes the other.
:::

:::mistake{title="Sign errors with the Pythagorean identities"}
$\sec^2\theta = 1 + \tan^2\theta$, so $\sec^2\theta - \tan^2\theta = 1$, but $\tan^2\theta - \sec^2\theta = -1$. Check by putting $\theta = 0$: $\sec^2 0 = 1$ and $\tan^2 0 = 0$.
:::

:::mistake{title="Cancelling terms instead of factors"}
In $\dfrac{\sin\theta + \sin\theta\cos\theta}{\sin\theta}$ you may cancel $\sin\theta$ only after factorising: $\dfrac{\sin\theta(1 + \cos\theta)}{\sin\theta} = 1 + \cos\theta$.
:::

:::mistake{title="Treating sin θ + cos θ = 1 as an identity"}
It is false for most angles (try $\theta = 45°$). The identity is for the **squares**.
:::

## Exam tips

:::exam-tip
In a **show that** question the answer is given, so every step is marked. Show the identity you use on each line and do not skip the common-denominator step.
:::

:::exam-tip
If you are stuck, write everything in terms of $\sin$ and $\cos$; most textbook identities then fall out with one use of $\sin^2\theta + \cos^2\theta = 1$.
:::

:::exam-tip
Check an identity before you try to prove it by substituting a value such as $\theta = 30°$ into both sides. If they differ, you have misread the question.
:::

## Summary

:::summary
- Quotient identities: $\tan\theta = \frac{\sin\theta}{\cos\theta}$, $\cot\theta = \frac{\cos\theta}{\sin\theta}$.
- Pythagorean identities: $\sin^2\theta + \cos^2\theta = 1$, $\sec^2\theta = 1 + \tan^2\theta$, $\operatorname{cosec}^2\theta = 1 + \cot^2\theta$.
- To prove an identity, start from one side and transform it step by step into the other.
- Useful moves: write in sin and cos, combine fractions, factorise, use $1 - \cos^2\theta = \sin^2\theta$.
- Identities give values directly: $\tan\theta = 3 \Rightarrow \sec^2\theta = 10$.
:::
