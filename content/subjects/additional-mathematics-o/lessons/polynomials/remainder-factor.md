---
{
  "key": "polynomials.remainder-factor",
  "title": "The remainder and factor theorems",
  "summary": "Find the remainder on dividing a polynomial by x − a or ax + b without long division, test for factors with the factor theorem, and find unknown coefficients from given factors and remainders.",
  "concepts": ["amath.polynomials.remainder-factor"],
  "estimatedMinutes": 35,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

Long division of a polynomial works, but it is slow, and a single sign slip spoils the remainder. The **remainder theorem** gives the remainder in one line by substitution. Its partner, the **factor theorem**, tells you when a linear expression is a factor, which is the first step in factorising and solving cubic equations.

These two theorems appear in almost every ZIMSEC and Cambridge 0606 paper, often in a question worth 5 to 8 marks where two unknown coefficients are found from two conditions. They are quick marks if you are accurate.

You should already be able to substitute negative numbers and fractions into a polynomial, divide by a linear expression and solve two simultaneous linear equations.

## Key definitions

:::definition{term="Remainder theorem"}
When a polynomial $f(x)$ is divided by $x - a$, the remainder is $f(a)$. When it is divided by $ax + b$, the remainder is $f\left(-\dfrac{b}{a}\right)$.
:::

:::definition{term="Factor theorem"}
$x - a$ is a factor of $f(x)$ if and only if $f(a) = 0$. Likewise $ax + b$ is a factor if and only if $f\left(-\dfrac{b}{a}\right) = 0$.
:::

:::formula{name="Which value to substitute"}
Set the divisor equal to zero and solve:

$$
x - a = 0 \Rightarrow x = a \qquad ax + b = 0 \Rightarrow x = -\frac{b}{a}
$$

Neither theorem is in Cambridge's List of formulas.
:::

## Why the remainder theorem works

Dividing $f(x)$ by $x - a$ gives a quotient $q(x)$ and a constant remainder $r$, and the division identity holds for **every** value of $x$:

$$
f(x) \equiv (x - a)\,q(x) + r
$$

Put $x = a$. The bracket $(x - a)$ becomes zero, so

$$
f(a) = 0 \times q(a) + r = r
$$

The same argument with $f(x) \equiv (ax + b)\,q(x) + r$ and $x = -\frac{b}{a}$ gives the second form. If the remainder is zero, $x - a$ divides exactly into $f(x)$: that is the factor theorem.

## Finding remainders

:::worked-solution[Example 1: find the remainder when $x^{3} - 4x^{2} + 2x + 5$ is divided by $x - 3$]
1. Let $f(x) = x^{3} - 4x^{2} + 2x + 5$. The divisor $x - 3$ is zero when $x = 3$.
2. $f(3) = 27 - 4(9) + 2(3) + 5$.
3. $= 27 - 36 + 6 + 5 = 2$.
4. The remainder is $2$.
:::

:::worked-solution[Example 2: find the remainder when $4x^{3} + 2x^{2} - x + 3$ is divided by $2x - 1$]
1. $2x - 1 = 0$ when $x = \frac{1}{2}$.
2. $f\left(\frac{1}{2}\right) = 4\left(\frac{1}{8}\right) + 2\left(\frac{1}{4}\right) - \frac{1}{2} + 3$.
3. $= \frac{1}{2} + \frac{1}{2} - \frac{1}{2} + 3 = \frac{7}{2}$.
4. The remainder is $\frac{7}{2}$. (Substituting $x = 1$ or $x = 2$ here is a common error.)
:::

## Testing for factors

To decide whether a linear expression is a factor, substitute the value that makes it zero. If the answer is $0$ it is a factor; otherwise it is not, and the value you found is the remainder.

:::worked-solution[Example 3: show that $x + 2$ is a factor of $x^{3} + 3x^{2} - 4$]
1. $x + 2 = 0$ when $x = -2$.
2. $f(-2) = (-2)^{3} + 3(-2)^{2} - 4 = -8 + 12 - 4$.
3. $f(-2) = 0$, so by the factor theorem $x + 2$ is a factor.
:::

## Finding unknown coefficients

If a factor or a remainder is given, substituting turns the condition into an **equation** for the unknown.

:::worked-solution[Example 4: $x - 2$ is a factor of $x^{3} + ax^{2} - 5x + 6$. Find $a$]
1. By the factor theorem, $f(2) = 0$.
2. $8 + 4a - 10 + 6 = 0$.
3. $4a + 4 = 0$, so $a = -1$.
:::

With **two unknowns** you need two conditions. Each gives one linear equation; solve them simultaneously.

:::worked-solution[Example 5: $f(x) = 2x^{3} + px^{2} + qx - 6$. $x + 1$ is a factor of $f(x)$, and the remainder on dividing by $x - 2$ is 12. Find $p$ and $q$, then factorise $f(x)$ completely]
1. Factor: $f(-1) = 0$, so $-2 + p - q - 6 = 0$, giving $p - q = 8$.
2. Remainder: $f(2) = 12$, so $16 + 4p + 2q - 6 = 12$, giving $4p + 2q = 2$, that is $2p + q = 1$.
3. Add the equations: $3p = 9$, so $p = 3$ and then $q = 3 - 8 = -5$.
4. So $f(x) = 2x^{3} + 3x^{2} - 5x - 6$.
5. Divide by $x + 1$: the quotient is $2x^{2} + x - 6 = (2x - 3)(x + 2)$.
6. $f(x) = (x + 1)(2x - 3)(x + 2)$.
7. Check: $f(2) = 16 + 12 - 10 - 6 = 12$. ✓
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine the remainder and factor theorems with divisors $x - a$ and $ax + b$, including two unknown coefficients. Knowing why the theorem works (from the division identity) helps you explain your method in "show that" parts.
:::

## Common mistakes

:::mistake{title="Substituting the wrong sign"}
For the divisor $x + 3$ you substitute $x = -3$, not $x = 3$. Always solve "divisor $= 0$".
:::

:::mistake{title="Substituting the coefficient instead of the root"}
For $2x - 1$ the value is $x = \frac{1}{2}$, not $x = 2$ and not $x = 1$.
:::

:::mistake{title="Forgetting the remainder condition is f(a) = r"}
"Remainder 12 on dividing by $x - 2$" means $f(2) = 12$. Writing $f(2) = 0$ treats it as a factor.
:::

:::mistake{title="Powers of negative numbers"}
$(-2)^{3} = -8$ but $(-2)^{2} = +4$. Use brackets when you substitute.
:::

## Exam tips

:::exam-tip
When asked to "**show that** $x + 2$ is a factor", write the substitution in full and end with "$f(-2) = 0$, so $x + 2$ is a factor". The conclusion sentence earns the final mark.
:::

:::exam-tip
Use the remainder theorem unless the question says "by long division" or asks for the **quotient**. It is faster and less error-prone.
:::

:::exam-tip
After finding unknown coefficients, substitute them back into both conditions. This takes a minute and protects every later part of the question.
:::

## Summary

:::summary
- Remainder on dividing $f(x)$ by $x - a$ is $f(a)$; by $ax + b$ it is $f\left(-\frac{b}{a}\right)$.
- $x - a$ is a factor exactly when $f(a) = 0$.
- The proof: put $x = a$ in $f(x) \equiv (x - a)q(x) + r$.
- A given factor or remainder gives one equation; two conditions give two simultaneous equations.
- Substitute the value that makes the divisor zero, using brackets for negatives.
:::
