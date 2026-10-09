---
{
  "key": "algebra.identities",
  "title": "Identities and unknown coefficients",
  "summary": "Tell an identity from an equation, and find unknown coefficients in an identity by equating coefficients of like powers or by substituting convenient values of x.",
  "concepts": ["amath.algebra.identities"],
  "estimatedMinutes": 30,
  "level": "core"
}
---
## Introduction

Many Additional Mathematics questions begin "Express … in the form …" or "Given that … $\equiv$ …, find the constants $A$, $B$ and $C$". Behind each of these is an **identity**: a statement that two expressions are equal for every value of the variable. Because it is true for every value, an identity contains a lot of information, and you can unlock it in two ways: by **equating coefficients** or by **substituting convenient values**.

This topic is listed separately in the ZIMSEC syllabus. The same skills are used everywhere: completing the square, dividing polynomials, partial fractions in later studies and checking algebra.

You should be able to expand brackets, collect like terms and solve simple simultaneous equations.

## Key definitions

:::definition{term="Equation"}
A statement that two expressions are equal for **some** values of the variable (possibly none), which you find by solving. For example $(x + 3)^{2} = 16$ is true only for $x = 1$ and $x = -7$.
:::

:::definition{term="Identity"}
A statement that two expressions are equal for **every** value of the variable. It is written with the symbol $\equiv$, read "is identically equal to". For example $(x + 3)^{2} \equiv x^{2} + 6x + 9$.
:::

:::keyfact{title="The key property"}
If two polynomials are identically equal, the coefficients of each power of $x$ are equal. If $ax^{2} + bx + c \equiv px^{2} + qx + r$, then $a = p$, $b = q$ and $c = r$.
:::

## Method 1: equating coefficients

Expand the side containing the unknowns, then match the coefficients of $x^{2}$, $x$ and the constant term (and $x^{3}$ for cubics). Each match gives one equation.

:::worked-solution[Example 1: express $3x^{2} - 12x + 5$ in the form $a(x + b)^{2} + c$]
1. Expand the right side: $a(x + b)^{2} + c = ax^{2} + 2abx + ab^{2} + c$.
2. $x^{2}$ terms: $a = 3$.
3. $x$ terms: $2ab = -12$, so $6b = -12$ and $b = -2$.
4. Constants: $ab^{2} + c = 5$, so $3(4) + c = 5$ and $c = -7$.
5. So $3x^{2} - 12x + 5 \equiv 3(x - 2)^{2} - 7$.
:::

The same method works when the unknowns sit inside a bracket such as $(2x + p)^{2}$.

:::worked-solution[Example 2: find $p$ and $q$ such that $(2x + p)^{2} - q \equiv 4x^{2} - 20x + 19$]
1. Expand: $(2x + p)^{2} - q = 4x^{2} + 4px + p^{2} - q$.
2. $x$ terms: $4p = -20$, so $p = -5$.
3. Constants: $p^{2} - q = 19$, so $25 - q = 19$ and $q = 6$.
4. Check the $x^{2}$ terms: $4 = 4$. ✓ So $4x^{2} - 20x + 19 \equiv (2x - 5)^{2} - 6$.
:::

## Method 2: substituting convenient values

Because an identity is true for **every** $x$, you may substitute any value you like. Choose values that make brackets zero, so that unknowns disappear one at a time.

:::worked-solution[Example 3: find $A$ and $B$ such that $5x - 1 \equiv A(x + 1) + B(x - 2)$]
1. Put $x = 2$ (this makes $x - 2 = 0$): $10 - 1 = A(3) + 0$, so $A = 3$.
2. Put $x = -1$ (this makes $x + 1 = 0$): $-5 - 1 = 0 + B(-3)$, so $B = 2$.
3. Check by expanding: $3(x + 1) + 2(x - 2) = 3x + 3 + 2x - 4 = 5x - 1$. ✓
:::

## Combining the methods: a cubic divided by a linear factor

The identity $f(x) \equiv (x - a)\left(Ax^{2} + Bx + C\right) + R$ is the division identity. You can find all four constants without long division.

:::worked-solution[Example 4: find $A$, $B$, $C$ and $R$ such that $x^{3} - 4x^{2} + 2x + 7 \equiv (x - 2)\left(Ax^{2} + Bx + C\right) + R$]
1. Substitute $x = 2$: $8 - 16 + 4 + 7 = 0 + R$, so $R = 3$.
2. $x^{3}$ terms: $A = 1$.
3. Constant terms: $-2C + R = 7$, so $-2C = 4$ and $C = -2$.
4. $x^{2}$ terms: $B - 2A = -4$, so $B = -2$.
5. Check with the $x$ terms: $C - 2B = -2 + 4 = 2$. ✓
6. So $x^{3} - 4x^{2} + 2x + 7 \equiv (x - 2)\left(x^{2} - 2x - 2\right) + 3$: the quotient is $x^{2} - 2x - 2$ and the remainder is $3$.
:::

Notice that step 1 is exactly the remainder theorem. Use substitution for the constant that sits alone, and coefficients for the rest; always keep one coefficient back as a check.

### Which method to use

| Situation | Best method |
| --- | --- |
| Completed square $a(x + b)^{2} + c$ | Equate coefficients |
| Unknowns multiplying different brackets, e.g. $A(x + 1) + B(x - 2)$ | Substitute the roots of the brackets |
| Division identity with a remainder | Substitute for $R$, then equate coefficients |
| Two variables, e.g. $x^{2} + 4xy + 5y^{2} \equiv (x + ay)^{2} + by^{2}$ | Equate coefficients of $x^{2}$, $xy$, $y^{2}$ |

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC lists identities as a topic of its own (equating coefficients and substitution). Cambridge 0606 does not list it separately, but uses the same technique inside questions on completing the square and polynomials.
:::

## Common mistakes

:::mistake{title="Treating an identity as an equation"}
Do not "solve" $3x^{2} - 12x + 5 \equiv a(x + b)^{2} + c$ for $x$. The unknowns are $a$, $b$ and $c$; $x$ can be anything.
:::

:::mistake{title="Forgetting to multiply the whole bracket"}
$a(x + b)^{2} + c$ expands to $ax^{2} + 2abx + ab^{2} + c$. A common slip is writing $b^{2} + c$ for the constant instead of $ab^{2} + c$.
:::

:::mistake{title="Substituting a value that removes nothing"}
In $A(x + 1) + B(x - 2)$, putting $x = 0$ gives $A - 2B$, which does not isolate either constant. Use $x = -1$ and $x = 2$.
:::

## Exam tips

:::exam-tip
Write each coefficient comparison on its own line with a label ("$x^{2}$:", "$x$:", "const:"). Examiners can then award method marks even if one value is wrong.
:::

:::exam-tip
Use the last unused coefficient as a check. If it does not match, an earlier value is wrong.
:::

:::exam-tip
"**Hence**" after an identity usually means use the completed form, for example to read off a minimum value or a remainder.
:::

## Summary

:::summary
- An equation holds for particular values; an identity ($\equiv$) holds for every value.
- Identical polynomials have equal coefficients of every power of $x$.
- Equate coefficients for completed-square and two-variable forms.
- Substitute values that make brackets zero to isolate unknowns.
- Keep one coefficient back to check your constants.
:::
