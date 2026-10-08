---
{
  "key": "matrices.determinant-and-inverse",
  "title": "Determinant and inverse of a 2 × 2 matrix",
  "summary": "Find the determinant of a 2 × 2 matrix, recognise singular matrices (and find unknowns that make a matrix singular), find the inverse of a non-singular matrix, and use it to solve simultaneous linear equations.",
  "concepts": ["math.matrices.determinant-and-inverse"],
  "objectives": ["zimsec/o-level/mathematics:12.0.3", "zimsec/o-level/mathematics:12.0.4"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

At a market in Masvingo, 3 kg of tomatoes and 1 kg of onions cost US\$5.00, while 2 kg of tomatoes and 3 kg of onions cost US\$6.60. You can find the prices by elimination, but matrices give a second, very systematic method: write the problem as one matrix equation and “divide” by the matrix using its **inverse**.

Numbers have reciprocals: $5 \times \frac{1}{5} = 1$. A $2 \times 2$ matrix $A$ may have an inverse $A^{-1}$ with $AA^{-1} = I$, the identity matrix. Whether it does depends on a single number, the **determinant**. In this lesson you will calculate determinants and inverses and use them to solve simultaneous equations. This is ZIMSEC content and it prepares you for matrix transformations.

You should be able to multiply $2 \times 2$ matrices.

## Key definitions

:::definition{term="Determinant"}
For $A = \begin{pmatrix} a & b \\ c & d \end{pmatrix}$, the determinant is $\det A = ad - bc$: the product of the leading diagonal minus the product of the other diagonal.
:::

:::definition{term="Singular and non-singular"}
A matrix is **singular** if its determinant is 0; it has no inverse. It is **non-singular** if its determinant is not 0.
:::

:::formula{name="Inverse of a 2 × 2 matrix"}
$$
A^{-1} = \frac{1}{ad - bc}\begin{pmatrix} d & -b \\ -c & a \end{pmatrix}
$$
:::

:::keyfact{title="Building the inverse"}
Swap $a$ and $d$; change the signs of $b$ and $c$; divide every element by the determinant. Check that $AA^{-1} = I$.
:::

## Determinants and singular matrices

:::worked-solution[Example 1: find the determinants of $\begin{pmatrix} 7 & 2 \\ 3 & 4 \end{pmatrix}$ and $\begin{pmatrix} 3 & -2 \\ 5 & 1 \end{pmatrix}$]
1. $7 \times 4 - 2 \times 3 = 28 - 6 = 22$.
2. $3 \times 1 - (-2) \times 5 = 3 + 10 = 13$.
3. Both are non-zero, so both matrices have inverses.
:::

To find an unknown that makes a matrix singular, set the determinant equal to 0 and solve.

:::worked-solution[Example 2: find $x$ if $\begin{pmatrix} x & 3 \\ 12 & x \end{pmatrix}$ is singular]
1. $\det = x \times x - 3 \times 12 = x^2 - 36$.
2. Singular: $x^2 - 36 = 0$, so $x^2 = 36$.
3. $x = 6$ or $x = -6$.
:::

## Finding the inverse

:::worked-solution[Example 3: find the inverse of $A = \begin{pmatrix} 5 & 4 \\ 2 & 2 \end{pmatrix}$]
1. $\det A = 5 \times 2 - 4 \times 2 = 2$.
2. Swap 5 and 2 on the leading diagonal; change the signs of 4 and 2: $\begin{pmatrix} 2 & -4 \\ -2 & 5 \end{pmatrix}$.
3. Divide by 2: $A^{-1} = \begin{pmatrix} 1 & -2 \\ -1 & 2.5 \end{pmatrix}$.
4. Check the top-left element of $AA^{-1}$: $5(1) + 4(-1) = 1$. ✓
:::

## Solving simultaneous equations

The equations $2x + 3y = 12$ and $x + 2y = 7$ can be written as

$$
\begin{pmatrix} 2 & 3 \\ 1 & 2 \end{pmatrix}\begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} 12 \\ 7 \end{pmatrix}
$$

If $AX = B$, multiply both sides **on the left** by $A^{-1}$: $A^{-1}AX = A^{-1}B$, and since $A^{-1}A = I$, $X = A^{-1}B$.

:::worked-solution[Example 4: solve $2x + 3y = 12$ and $x + 2y = 7$]
1. $\det = 2 \times 2 - 3 \times 1 = 1$, so $A^{-1} = \begin{pmatrix} 2 & -3 \\ -1 & 2 \end{pmatrix}$.
2. $\begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} 2 & -3 \\ -1 & 2 \end{pmatrix}\begin{pmatrix} 12 \\ 7 \end{pmatrix} = \begin{pmatrix} 24 - 21 \\ -12 + 14 \end{pmatrix}$.
3. $= \begin{pmatrix} 3 \\ 2 \end{pmatrix}$, so $x = 3$ and $y = 2$.
4. Check: $6 + 6 = 12$ and $3 + 4 = 7$. ✓
:::

:::worked-solution[Example 5: the market prices]
Let tomatoes cost $t$ and onions $u$ dollars per kg: $\begin{pmatrix} 3 & 1 \\ 2 & 3 \end{pmatrix}\begin{pmatrix} t \\ u \end{pmatrix} = \begin{pmatrix} 5.00 \\ 6.60 \end{pmatrix}$.

1. $\det = 9 - 2 = 7$, so the inverse is $\dfrac{1}{7}\begin{pmatrix} 3 & -1 \\ -2 & 3 \end{pmatrix}$.
2. $t = \dfrac{1}{7}(3 \times 5.00 - 6.60) = \dfrac{8.40}{7} = 1.20$.
3. $u = \dfrac{1}{7}(-2 \times 5.00 + 3 \times 6.60) = \dfrac{9.80}{7} = 1.40$.
4. Tomatoes cost US\$1.20 per kg and onions US\$1.40 per kg.
:::

If the matrix of coefficients is singular, the equations have no unique solution: their graphs are parallel lines, or the same line.

## Common mistakes

:::mistake{title="Adding instead of subtracting"}
The determinant is $ad - bc$, not $ad + bc$. For $\begin{pmatrix} 3 & 1 \\ 2 & 3 \end{pmatrix}$ it is $9 - 2 = 7$, not 11.
:::

:::mistake{title="Swapping the wrong pair"}
Only $a$ and $d$ swap places; $b$ and $c$ stay where they are but change sign.
:::

:::mistake{title="Forgetting to divide by the determinant"}
$\begin{pmatrix} 3 & -1 \\ -2 & 3 \end{pmatrix}$ is not the inverse of $\begin{pmatrix} 3 & 1 \\ 2 & 3 \end{pmatrix}$; it must be multiplied by $\frac{1}{7}$. Only when the determinant is 1 can this step be skipped.
:::

:::mistake{title="Multiplying in the wrong order"}
$X = A^{-1}B$, with the inverse on the left. $BA^{-1}$ is not even defined when $B$ is a $2 \times 1$ column.
:::

## Exam tips

:::exam-tip
Questions often run: “(a) find the determinant; (b) write down the inverse; (c) **hence** solve the equations.” Use your inverse from (b) in (c), and show the matrix multiplication.
:::

:::exam-tip
Keep the fraction $\frac{1}{\det}$ outside the matrix until the last step. It keeps the arithmetic in whole numbers.
:::

:::exam-tip
Check your solution in **both** original equations. If it fails, check the determinant and the signs in the inverse.
:::

## Summary

:::summary
- $\det \begin{pmatrix} a & b \\ c & d \end{pmatrix} = ad - bc$.
- A singular matrix has determinant 0 and no inverse; to find an unknown that makes a matrix singular, solve $\det = 0$.
- $A^{-1} = \frac{1}{ad - bc}\begin{pmatrix} d & -b \\ -c & a \end{pmatrix}$, and $AA^{-1} = A^{-1}A = I$.
- Solve $AX = B$ by $X = A^{-1}B$, with the inverse on the left.
- A singular matrix of coefficients means no unique solution.
:::
