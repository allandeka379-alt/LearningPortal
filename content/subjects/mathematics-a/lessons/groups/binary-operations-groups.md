---
{
  "key": "groups.binary-operations-groups",
  "title": "Binary operations and groups",
  "summary": "Define binary operations on a set, build Cayley tables, test closure, commutativity, associativity and distributivity, find identity and inverse elements, and decide whether a structure is a group.",
  "concepts": ["amaths.groups.binary-operations-groups"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

Addition of whole numbers, multiplication of non-zero fractions, composing rotations of a square, and multiplying invertible matrices look like very different activities. Yet they share the same skeleton: combine two things and get another of the same kind, there is a "do nothing" element, and every action can be undone. Abstract algebra studies this skeleton under the name **group**. Groups describe the symmetry of crystals and molecules, the patterns in Ndebele wall paintings, and the error-correcting codes that let a phone recover a damaged message.

Binary operations and groups are in the ZIMSEC Pure Mathematics syllabus (Form 6, topic 6.1.8): learners define the properties, use them to show that a structure is or is not a group, and solve problems on binary operations. Subgroups, Lagrange's theorem and isomorphism are not in the syllabus. The topic is not in Cambridge 9709.

## Key definitions

:::definition{term="Binary operation"}
A rule $*$ that combines any two elements $a$, $b$ of a set $S$ (in that order) to give a single element $a * b$.
:::

:::definition{term="Properties of a binary operation on S"}
- **Closure:** $a * b \in S$ for all $a, b \in S$.
- **Commutativity:** $a * b = b * a$ for all $a, b$.
- **Associativity:** $(a * b) * c = a * (b * c)$ for all $a, b, c$.
- **Identity:** an element $e \in S$ with $e * a = a * e = a$ for all $a$.
- **Inverse:** for an element $a$, an element $a^{-1} \in S$ with $a * a^{-1} = a^{-1} * a = e$.
- **Distributivity** (two operations): $\circ$ distributes over $*$ if $a \circ (b * c) = (a \circ b) * (a \circ c)$ for all $a, b, c$.
:::

:::definition{term="Group"}
A set $G$ with a binary operation $*$ is a group if the four **group axioms** hold: closure, associativity, an identity element exists, and every element has an inverse in $G$. If in addition $*$ is commutative, the group is **abelian**.
:::

Commutativity is **not** one of the group axioms. Neither ZIMSEC nor Cambridge prints these definitions; learn them word for word.

## Testing the properties of an operation

A binary operation can be given by a formula. Test each property in general, using letters, not just one or two numerical examples; a single counter-example is enough to show a property fails.

:::worked-solution[Example 1: the operation $*$ on the real numbers is defined by $a * b = a + b + ab$. Investigate commutativity, associativity, identity and inverses]
1. Commutative: $b * a = b + a + ba = a * b$. Yes.
2. Associative: $(a * b) * c = (a + b + ab) + c + (a + b + ab)c = a + b + c + ab + ac + bc + abc$. Expanding $a * (b * c)$ gives the same symmetric expression, so yes.
3. Identity: we need $a + e + ae = a$ for all $a$, i.e. $e(1 + a) = 0$ for all $a$, so $e = 0$. Check: $a * 0 = a$.
4. Inverse: $a + b + ab = 0$ gives $b = -\dfrac{a}{1 + a}$, which exists for every $a$ **except** $a = -1$.
5. So the reals under $*$ are not a group ($-1$ has no inverse), but the set of reals excluding $-1$ is (it is also closed, because $a * b = -1$ would need $(1 + a)(1 + b) = 0$).
:::

## Cayley tables

For a finite set, write all the products in a **Cayley table**: the entry in row $a$, column $b$ is $a * b$. The table shows the properties at a glance:

- closure: every entry belongs to the set;
- identity: a row (and column) that repeats the headings;
- inverses: the identity appears in every row and every column, and if $a * b = e$ then $b$ is the inverse of $a$;
- commutativity: the table is symmetric about the leading diagonal.

Associativity cannot be read from a table easily; for numbers under ordinary or modular addition and multiplication, or for composition of functions and matrices, it is inherited from the known properties of those operations.

The Cayley table for multiplication modulo 5 on $\{1, 2, 3, 4\}$ (row × column) is:

| $\times_5$ | 1 | 2 | 3 | 4 |
| --- | --- | --- | --- | --- |
| **1** | 1 | 2 | 3 | 4 |
| **2** | 2 | 4 | 1 | 3 |
| **3** | 3 | 1 | 4 | 2 |
| **4** | 4 | 3 | 2 | 1 |

:::worked-solution[Example 2: use the table to show that $\{1, 2, 3, 4\}$ under multiplication modulo 5 is a group, and find the inverse of each element]
1. The table lists every product, for example $3 \times 4 = 12 \equiv 2 \pmod 5$.
2. Closure: every entry is in $\{1, 2, 3, 4\}$.
3. Associativity: multiplication of integers is associative, and reducing mod 5 keeps this.
4. Identity: 1 (its row repeats the headings).
5. Inverses: 1 appears once in every row: $1^{-1} = 1$, $2^{-1} = 3$, $3^{-1} = 2$, $4^{-1} = 4$.
6. All four axioms hold, so it is a group; the table is symmetric, so the group is abelian.
:::

## Showing a structure is not a group

To prove that a structure is **not** a group, find one axiom that fails and give a specific counter-example.

:::worked-solution[Example 3: show that $\{0, 1, 2, 3, 4, 5\}$ under multiplication modulo 6 is not a group]
1. Closure holds and 1 is an identity.
2. Look for 1 in the row of 2: $2 \times 0, 2 \times 1, \dots, 2 \times 5$ give $0, 2, 4, 0, 2, 4$ (mod 6).
3. There is no 1 in that row, so 2 has no inverse.
4. Hence the inverse axiom fails and the structure is not a group. (The element 0 has no inverse either.)
:::

Other standard examples: the integers under subtraction are not a group, because subtraction is not associative ($(5 - 3) - 1 = 1$ but $5 - (3 - 1) = 3$). The integers under multiplication fail the inverse axiom (2 has no integer inverse). The integers under addition **are** a group, with identity 0 and inverse $-a$.

## Groups of transformations and matrices

The four rotations of a square about its centre, through $0^\circ$, $90^\circ$, $180^\circ$ and $270^\circ$, form a group under "followed by": combining two rotations gives another rotation in the set, the $0^\circ$ rotation is the identity, and the inverse of a $90^\circ$ rotation is the $270^\circ$ rotation. In matrix form, with $\mathbf{R} = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}$, the set $\{\mathbf{I}, \mathbf{R}, \mathbf{R}^2, \mathbf{R}^3\}$ is a group under matrix multiplication (matrix multiplication is associative). Because $\mathbf{R}^4 = \mathbf{I}$, the inverse of $\mathbf{R}$ is $\mathbf{R}^3$.

## Distributivity

Ordinary multiplication distributes over addition: $a(b + c) = ab + ac$. Addition does **not** distribute over multiplication: $a + bc \ne (a + b)(a + c)$ in general (try $a = b = c = 1$: $2 \ne 4$). For two operations defined by formulas, expand both sides with letters, as in Example 1.

## Common mistakes

:::mistake{title="Treating commutativity as a group axiom"}
A group need not be commutative; only closure, associativity, identity and inverses are required.
:::

:::mistake{title="Proving a property with one example"}
"$2 * 3 = 3 * 2$" does not prove commutativity. A general argument is needed to show a property holds; one counter-example is enough to show it fails.
:::

:::mistake{title="Inverse outside the set"}
Under multiplication on the integers, $\frac{1}{2}$ undoes 2, but it is not an integer, so 2 has no inverse **in the set**.
:::

:::mistake{title="Identity on one side only"}
The identity must satisfy $e * a = a$ **and** $a * e = a$. For non-commutative operations check both.
:::

## Exam tips

:::exam-tip
When asked to "show that $(G, *)$ is a group", list the four axioms one by one, with a reason for each (the table, a known property, or algebra).
:::

:::exam-tip
In a Cayley table, check each row and column for the identity: every element appears exactly once in each row and column of a group table.
:::

:::exam-tip
State the identity and each inverse explicitly; marks are often given for "$e = 1$", "$2^{-1} = 3$".
:::

## Summary

:::summary
- A binary operation combines two elements of a set to give one element.
- Properties: closure, commutativity, associativity, identity, inverses; distributivity links two operations.
- A group satisfies closure, associativity, identity and inverses (commutativity is optional: abelian groups).
- Cayley tables show closure, identity, inverses and symmetry (commutativity) quickly.
- To show a structure is not a group, give one specific counter-example to one axiom.
:::
