---
{
  "key": "matrices.operations-inverses",
  "title": "Matrices: operations, determinants, inverses and linear systems",
  "summary": "Add, subtract and multiply matrices up to 3 × 3, find determinants and inverses of 2 × 2 and 3 × 3 matrices using cofactors, use (AB)⁻¹ = B⁻¹A⁻¹, and solve systems of two or three linear equations written as AX = b.",
  "concepts": ["amaths.matrices.operations-inverses"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

A matrix is a rectangular array of numbers. Matrices store data compactly (a table of maize sales by depot and month), describe transformations of the plane, and above all let us solve many simultaneous equations at once. Spreadsheet software, computer graphics and the models ZESA uses to plan electricity flows all rest on matrix algebra.

This lesson covers the arithmetic of matrices, determinants and inverses, and their use for solving linear systems. Matrices are in the ZIMSEC Pure Mathematics syllabus (Form 6, topic 6.1.6); they are not in Cambridge 9709.

## Key definitions

:::definition{term="Order of a matrix"}
A matrix with $m$ rows and $n$ columns has order $m \times n$. A **square** matrix has $m = n$.
:::

:::definition{term="Special matrices"}
The **null** (zero) matrix $\mathbf{O}$ has every entry 0. The **identity** matrix $\mathbf{I}$ is square with 1s on the leading diagonal and 0s elsewhere, so $\mathbf{AI} = \mathbf{IA} = \mathbf{A}$. A square matrix is **singular** if its determinant is 0 and **non-singular** otherwise.
:::

:::definition{term="Inverse"}
$\mathbf{A}^{-1}$ is the matrix with $\mathbf{AA}^{-1} = \mathbf{A}^{-1}\mathbf{A} = \mathbf{I}$. It exists exactly when $\mathbf{A}$ is non-singular.
:::

:::formula{name="2 × 2 determinant and inverse"}
$$
\mathbf{A} = \begin{pmatrix} a & b \\ c & d \end{pmatrix}: \quad \det\mathbf{A} = ad - bc, \quad \mathbf{A}^{-1} = \frac{1}{ad - bc}\begin{pmatrix} d & -b \\ -c & a \end{pmatrix}
$$
:::

:::formula{name="Inverse of a product"}
$$
(\mathbf{AB})^{-1} = \mathbf{B}^{-1}\mathbf{A}^{-1}
$$
:::

## Adding and multiplying

Matrices of the **same order** are added entry by entry; multiplying by a number multiplies every entry. The product $\mathbf{AB}$ is defined only when the number of columns of $\mathbf{A}$ equals the number of rows of $\mathbf{B}$ (the matrices are **conformable**). An $m \times n$ matrix times an $n \times p$ matrix gives an $m \times p$ matrix, and each entry is "row of $\mathbf{A}$ times column of $\mathbf{B}$".

:::worked-solution[Example 1: given $\mathbf{A} = \begin{pmatrix} 2 & -1 & 3 \\ 0 & 4 & 1 \end{pmatrix}$ and $\mathbf{B} = \begin{pmatrix} 1 & 2 \\ 3 & 0 \\ -1 & 5 \end{pmatrix}$, find $\mathbf{AB}$ and state the order of $\mathbf{BA}$]
1. $\mathbf{A}$ is $2 \times 3$ and $\mathbf{B}$ is $3 \times 2$, so $\mathbf{AB}$ is $2 \times 2$.
2. Row 1 × column 1: $2(1) + (-1)(3) + 3(-1) = -4$. Row 1 × column 2: $2(2) + (-1)(0) + 3(5) = 19$.
3. Row 2 × column 1: $0 + 12 - 1 = 11$. Row 2 × column 2: $0 + 0 + 5 = 5$.
4. $\mathbf{AB} = \begin{pmatrix} -4 & 19 \\ 11 & 5 \end{pmatrix}$.
5. $\mathbf{BA}$ is $(3 \times 2)(2 \times 3)$, a $3 \times 3$ matrix: clearly $\mathbf{AB} \ne \mathbf{BA}$.
:::

Matrix multiplication is **not commutative**, but it is associative: $(\mathbf{AB})\mathbf{C} = \mathbf{A}(\mathbf{BC})$.

## Determinants of 3 × 3 matrices

Expand along the first row. Each entry is multiplied by its **cofactor**: the determinant of the $2 \times 2$ **minor** left when that entry's row and column are deleted, with the sign pattern

$$
\begin{pmatrix} + & - & + \\ - & + & - \\ + & - & + \end{pmatrix}
$$

:::worked-solution[Example 2: find the determinant of $\mathbf{C} = \begin{pmatrix} 2 & 1 & 3 \\ 0 & -1 & 4 \\ 1 & 2 & 1 \end{pmatrix}$]
1. $\det\mathbf{C} = 2\begin{vmatrix} -1 & 4 \\ 2 & 1 \end{vmatrix} - 1\begin{vmatrix} 0 & 4 \\ 1 & 1 \end{vmatrix} + 3\begin{vmatrix} 0 & -1 \\ 1 & 2 \end{vmatrix}$.
2. $= 2(-1 - 8) - 1(0 - 4) + 3(0 + 1)$.
3. $= -18 + 4 + 3 = -11$.
4. $\mathbf{C}$ is non-singular, so it has an inverse.
:::

## The inverse of a 3 × 3 matrix

1. Find the determinant; if it is 0, there is no inverse.
2. Find all nine cofactors and write them in the **matrix of cofactors**.
3. Transpose it (rows become columns) to get the **adjoint** (adjugate), $\operatorname{adj}\mathbf{A}$.
4. $\mathbf{A}^{-1} = \dfrac{1}{\det\mathbf{A}}\operatorname{adj}\mathbf{A}$.
5. Check one or two entries of $\mathbf{AA}^{-1} = \mathbf{I}$.

:::worked-solution[Example 3: find the inverse of $\mathbf{M} = \begin{pmatrix} 1 & 1 & 1 \\ 1 & 2 & 3 \\ 1 & 3 & 6 \end{pmatrix}$]
1. $\det\mathbf{M} = 1(12 - 9) - 1(6 - 3) + 1(3 - 2) = 3 - 3 + 1 = 1$.
2. Cofactors, row by row: $3, -3, 1$; $-3, 5, -2$; $1, -2, 1$. (For example, the cofactor of the middle entry is $+\begin{vmatrix} 1 & 1 \\ 1 & 6 \end{vmatrix} = 5$.)
3. The matrix of cofactors is symmetric here, so transposing leaves it unchanged.
4. $\mathbf{M}^{-1} = \dfrac{1}{1}\begin{pmatrix} 3 & -3 & 1 \\ -3 & 5 & -2 \\ 1 & -2 & 1 \end{pmatrix}$.
5. Check row 1 of $\mathbf{M}$ times column 1 of $\mathbf{M}^{-1}$: $3 - 3 + 1 = 1$. Correct.
:::

## Solving linear systems

The equations $x + y + z = 6$, $x + 2y + 3z = 14$, $x + 3y + 6z = 25$ can be written $\mathbf{MX} = \mathbf{b}$ with $\mathbf{X} = \begin{pmatrix} x \\ y \\ z \end{pmatrix}$ and $\mathbf{b} = \begin{pmatrix} 6 \\ 14 \\ 25 \end{pmatrix}$. If $\mathbf{M}$ is non-singular, multiply on the **left** by $\mathbf{M}^{-1}$: $\mathbf{X} = \mathbf{M}^{-1}\mathbf{b}$.

:::worked-solution[Example 4: solve the system above]
1. Using Example 3, $\mathbf{X} = \begin{pmatrix} 3 & -3 & 1 \\ -3 & 5 & -2 \\ 1 & -2 & 1 \end{pmatrix}\begin{pmatrix} 6 \\ 14 \\ 25 \end{pmatrix}$.
2. $x = 18 - 42 + 25 = 1$; $y = -18 + 70 - 50 = 2$; $z = 6 - 28 + 25 = 3$.
3. Check in the third equation: $1 + 6 + 18 = 25$.
:::

If $\det\mathbf{M} = 0$, there is no unique solution. The equations are then either **inconsistent** (no solution: geometrically, three planes with no common point) or **consistent with infinitely many solutions** (the planes share a line). Eliminating one variable shows which: you reach either a contradiction such as $0 = 5$ or an identity $0 = 0$.

## The inverse of a product

Since $(\mathbf{AB})(\mathbf{B}^{-1}\mathbf{A}^{-1}) = \mathbf{A}(\mathbf{BB}^{-1})\mathbf{A}^{-1} = \mathbf{AIA}^{-1} = \mathbf{I}$, the inverse of $\mathbf{AB}$ is $\mathbf{B}^{-1}\mathbf{A}^{-1}$: the order reverses, just as you take off your shoes before your socks. For example, with $\mathbf{P} = \begin{pmatrix} 3 & 5 \\ 1 & 2 \end{pmatrix}$ and $\mathbf{Q} = \begin{pmatrix} 2 & 1 \\ 4 & 3 \end{pmatrix}$, $\mathbf{PQ} = \begin{pmatrix} 26 & 18 \\ 10 & 7 \end{pmatrix}$, and both $(\mathbf{PQ})^{-1}$ and $\mathbf{Q}^{-1}\mathbf{P}^{-1}$ equal $\begin{pmatrix} 3.5 & -9 \\ -5 & 13 \end{pmatrix}$.

## Common mistakes

:::mistake{title="Multiplying entry by entry"}
Matrix multiplication is row × column, not entry × entry.
:::

:::mistake{title="Forgetting the sign pattern"}
Cofactors carry the chessboard signs; the cofactor of the entry in row 1, column 2 is **minus** its minor.
:::

:::mistake{title="Forgetting to transpose"}
The adjoint is the **transpose** of the matrix of cofactors. Missing this step gives a wrong inverse unless the matrix of cofactors is symmetric.
:::

:::mistake{title="Wrong order"}
$(\mathbf{AB})^{-1} = \mathbf{B}^{-1}\mathbf{A}^{-1}$, not $\mathbf{A}^{-1}\mathbf{B}^{-1}$; and $\mathbf{X} = \mathbf{A}^{-1}\mathbf{b}$, not $\mathbf{bA}^{-1}$.
:::

## Exam tips

:::exam-tip
Show the expansion of a $3 \times 3$ determinant term by term; a single wrong sign loses the answer but not the method marks.
:::

:::exam-tip
After finding an inverse, multiply back for at least one row: it takes seconds and catches most errors.
:::

:::exam-tip
"Hence solve" after an inverse means use $\mathbf{X} = \mathbf{A}^{-1}\mathbf{b}$; solving by elimination instead may not earn the marks.
:::

## Summary

:::summary
- $\mathbf{AB}$ exists when columns of $\mathbf{A}$ = rows of $\mathbf{B}$; in general $\mathbf{AB} \ne \mathbf{BA}$.
- $2 \times 2$: $\det = ad - bc$, inverse $\frac{1}{ad - bc}\begin{pmatrix} d & -b \\ -c & a \end{pmatrix}$.
- $3 \times 3$: expand by cofactors; $\mathbf{A}^{-1} = \frac{1}{\det\mathbf{A}}\operatorname{adj}\mathbf{A}$ (adjoint = transpose of cofactors).
- Singular means $\det = 0$: no inverse.
- $\mathbf{AX} = \mathbf{b} \Rightarrow \mathbf{X} = \mathbf{A}^{-1}\mathbf{b}$; if $\det\mathbf{A} = 0$ the system is inconsistent or has infinitely many solutions.
- $(\mathbf{AB})^{-1} = \mathbf{B}^{-1}\mathbf{A}^{-1}$.
:::
