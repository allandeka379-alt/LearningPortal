---
{
  "key": "matrices.matrix-operations",
  "title": "Matrix operations",
  "summary": "Use matrices to store information, state their order, add and subtract them, multiply by a scalar, multiply matrices (products up to 2 × 2) and use the identity and zero matrices.",
  "concepts": ["math.matrices.operations"],
  "objectives": ["zimsec/o-level/mathematics:12.0.1", "zimsec/o-level/mathematics:12.0.2"],
  "estimatedMinutes": 35,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

Two school tuck shops in Kadoma, X and Y, record their Tuesday sales. Shop X sold 30 buns and 45 drinks; shop Y sold 50 buns and 20 drinks. A neat way to store this is a rectangular table of numbers called a **matrix**:

$$
S = \begin{pmatrix} 30 & 45 \\ 50 & 20 \end{pmatrix}
$$

The rows are the shops and the columns are the items. Matrices let us do calculations on whole tables at once: for example, one matrix multiplication gives the takings of both shops. In this lesson you will learn the language of matrices and how to add, subtract and multiply them. Matrices are in the ZIMSEC O-Level syllabus; they lead on to inverse matrices and to transformations.

## Key definitions

:::definition{term="Matrix and element"}
A **matrix** is a rectangular array of numbers in rows and columns, written inside large brackets. Each number is an **element**.
:::

:::definition{term="Order"}
The order of a matrix is (number of rows) $\times$ (number of columns). $S$ above has order $2 \times 2$; $\begin{pmatrix} 4 & -1 \end{pmatrix}$ has order $1 \times 2$; $\begin{pmatrix} 0.60 \\ 0.75 \end{pmatrix}$ has order $2 \times 1$.
:::

:::definition{term="Identity and zero matrices"}
The $2 \times 2$ **identity matrix** is $I = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$. The **zero matrix** $O$ has every element equal to 0.
:::

:::keyfact{title="When operations are possible"}
- Add or subtract: only matrices of the **same order**.
- Multiply $AB$: only when the number of **columns of $A$** equals the number of **rows of $B$**. The result has the rows of $A$ and the columns of $B$.
:::

## Adding, subtracting and multiplying by a number

Add or subtract elements in the same position. To multiply by a number (a **scalar**), multiply every element.

:::worked-solution[Example 1: $A = \begin{pmatrix} 2 & -1 \\ 0 & 3 \end{pmatrix}$ and $B = \begin{pmatrix} 1 & 4 \\ -2 & 1 \end{pmatrix}$; find $3A - 2B$]
1. $3A = \begin{pmatrix} 6 & -3 \\ 0 & 9 \end{pmatrix}$ and $2B = \begin{pmatrix} 2 & 8 \\ -4 & 2 \end{pmatrix}$.
2. Subtract element by element: $6 - 2 = 4$, $-3 - 8 = -11$, $0 - (-4) = 4$, $9 - 2 = 7$.
3. $3A - 2B = \begin{pmatrix} 4 & -11 \\ 4 & 7 \end{pmatrix}$.
:::

## Multiplying matrices

Each element of a product is found by multiplying a **row** of the first matrix by a **column** of the second: multiply the pairs and add. Check the orders first:

$$
(2 \times \mathbf{2})(\mathbf{2} \times 1) \to 2 \times 1
$$

The inner numbers must match; the outer numbers give the order of the answer.

:::worked-solution[Example 2: the tuck shop takings]
A bun costs US\$0.60 and a drink US\$0.75. Store the prices as $P = \begin{pmatrix} 0.60 \\ 0.75 \end{pmatrix}$.

1. Orders: $(2 \times 2)(2 \times 1)$, so $SP$ exists and is $2 \times 1$.
2. Row 1 (shop X): $30 \times 0.60 + 45 \times 0.75 = 18 + 33.75 = 51.75$.
3. Row 2 (shop Y): $50 \times 0.60 + 20 \times 0.75 = 30 + 15 = 45$.
4. $SP = \begin{pmatrix} 51.75 \\ 45 \end{pmatrix}$: shop X took US\$51.75 and shop Y took US\$45.00.
:::

:::worked-solution[Example 3: find $\begin{pmatrix} 2 & -1 \\ 1 & 3 \end{pmatrix}\begin{pmatrix} 3 & 1 \\ 4 & -2 \end{pmatrix}$]
1. Row 1 × column 1: $2(3) + (-1)(4) = 2$.
2. Row 1 × column 2: $2(1) + (-1)(-2) = 4$.
3. Row 2 × column 1: $1(3) + 3(4) = 15$.
4. Row 2 × column 2: $1(1) + 3(-2) = -5$.
5. Answer: $\begin{pmatrix} 2 & 4 \\ 15 & -5 \end{pmatrix}$.
:::

## Order matters, and the identity

For numbers, $3 \times 5 = 5 \times 3$, but for matrices $AB$ and $BA$ are usually different. With $A = \begin{pmatrix} 2 & 1 \\ 0 & 1 \end{pmatrix}$ and $B = \begin{pmatrix} 1 & 0 \\ 3 & 1 \end{pmatrix}$:

$$
AB = \begin{pmatrix} 5 & 1 \\ 3 & 1 \end{pmatrix} \qquad BA = \begin{pmatrix} 2 & 1 \\ 6 & 4 \end{pmatrix}
$$

The identity matrix behaves like the number 1: $AI = IA = A$. The zero matrix behaves like 0: $A + O = A$.

## Unknown elements

Two matrices are equal when every pair of corresponding elements is equal. This turns a matrix equation into ordinary equations.

:::worked-solution[Example 4: find $x$ and $y$ if $\begin{pmatrix} 3 & x \\ 2 & 1 \end{pmatrix}\begin{pmatrix} 1 & 2 \\ y & 4 \end{pmatrix} = \begin{pmatrix} 13 & 14 \\ 7 & 8 \end{pmatrix}$]
1. Row 1 × column 2: $3(2) + x(4) = 14$, so $4x = 8$ and $x = 2$.
2. Row 2 × column 1: $2(1) + 1(y) = 7$, so $y = 5$.
3. Check row 1 × column 1: $3(1) + 2(5) = 13$. ✓
:::

## Common mistakes

:::mistake{title="Multiplying element by element"}
$\begin{pmatrix} 3 & 0 \\ 0 & 3 \end{pmatrix}\begin{pmatrix} 2 & 1 \\ -1 & 4 \end{pmatrix}$ is not $\begin{pmatrix} 6 & 0 \\ 0 & 12 \end{pmatrix}$. Use row × column: the answer is $\begin{pmatrix} 6 & 3 \\ -3 & 12 \end{pmatrix}$.
:::

:::mistake{title="Writing the order the wrong way round"}
A matrix with 3 rows and 2 columns has order $3 \times 2$, not $2 \times 3$. Rows come first.
:::

:::mistake{title="Changing the order of a product"}
$AB$ and $BA$ are usually different, so never swap the matrices in a product.
:::

:::mistake{title="Squaring each element"}
$A^2$ means $A \times A$. For $A = \begin{pmatrix} 2 & 1 \\ 1 & 3 \end{pmatrix}$, $A^2 = \begin{pmatrix} 5 & 5 \\ 5 & 10 \end{pmatrix}$, not $\begin{pmatrix} 4 & 1 \\ 1 & 9 \end{pmatrix}$.
:::

## Exam tips

:::exam-tip
Before multiplying, write the orders side by side, such as $(1 \times 2)(2 \times 2)$. It tells you whether the product exists and how big the answer is.
:::

:::exam-tip
Show at least one row × column calculation, such as $1(3) + 3(4) = 15$. If an element is wrong, the method can still earn marks.
:::

:::exam-tip
In information questions, say what an element of the answer means, with units: “US\$51.75 is the money taken by shop X on Tuesday.”
:::

## Summary

:::summary
- A matrix stores numbers in rows and columns; its order is rows × columns.
- Add and subtract matrices of the same order element by element; a scalar multiplies every element.
- $AB$ exists when the columns of $A$ match the rows of $B$; each element is row × column.
- In general $AB \neq BA$; the identity $I$ satisfies $AI = IA = A$.
- Equal matrices have equal corresponding elements, which gives equations for unknowns.
:::
