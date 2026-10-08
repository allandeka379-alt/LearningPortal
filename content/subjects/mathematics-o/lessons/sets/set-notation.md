---
{
  "key": "sets.set-notation",
  "title": "Set language and notation",
  "summary": "Describe sets by listing, in words and in set-builder notation, and use the notation for elements, number of elements, the universal set, complements, unions, intersections, subsets and the empty set.",
  "concepts": ["math.number.sets"],
  "objectives": ["zimsec/o-level/mathematics:2.0.1", "zimsec/o-level/mathematics:2.0.2", "cambridge/igcse/mathematics:1.2.1", "cambridge/igcse/mathematics:1.2.3"],
  "estimatedMinutes": 30,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

Mathematicians often need to talk about collections of things: the even numbers less than 20, the learners in a class who play netball, the provinces of Zimbabwe. A **set** is simply a well-defined collection, and set notation is a short, exact language for describing sets and combining them. It is the foundation for Venn diagrams and for probability.

You do not need any special background for this lesson, only a knowledge of factors, multiples and prime numbers.

## Key definitions

:::definition{term="Set and element"}
A set is a well-defined collection of objects, called its **elements** (or members). Sets are written with curly brackets: $A = \{2, 4, 6, 8\}$.
:::

:::definition{term="Universal set"}
The set of all the elements being considered in a problem, written $\mathscr{E}$ (Cambridge) or $\xi$ (often used in ZIMSEC papers).
:::

:::definition{term="Number of elements"}
$n(A)$ is the number of elements in set $A$. For $A = \{2, 4, 6, 8\}$, $n(A) = 4$.
:::

:::definition{term="Empty set"}
The set with no elements, written $\varnothing$ or $\{\ \}$. Note that $\{0\}$ is **not** empty: it contains the element 0.
:::

## Describing a set

A set can be described in three ways:

- **Listing**: $P = \{2, 3, 5, 7\}$.
- **In words**: $P$ is the set of prime numbers less than 10.
- **Set-builder notation**: $P = \{x : x \text{ is a prime number}, x < 10\}$, read as "the set of all $x$ such that $x$ is a prime number less than 10".

:::worked-solution[Example 1: list the elements of $\{x : x \text{ is an integer}, -2 < x \leq 3\}$]
1. $x$ must be an integer greater than $-2$, so $-2$ itself is not included.
2. $x$ can equal 3, because of the $\leq$ sign.
3. The set is $\{-1, 0, 1, 2, 3\}$, and it has 5 elements.
:::

## Combining sets

:::keyfact{title="The main symbols"}
| Notation | Meaning |
| :---: | --- |
| $x \in A$ | $x$ is an element of $A$ |
| $x \notin A$ | $x$ is not an element of $A$ |
| $A'$ | the complement of $A$: elements of $\mathscr{E}$ that are not in $A$ |
| $A \cup B$ | the union: elements in $A$ or $B$ or both |
| $A \cap B$ | the intersection: elements in both $A$ and $B$ |
| $A \subseteq B$ | $A$ is a subset of $B$: every element of $A$ is in $B$ |
| $A \not\subseteq B$ | $A$ is not a subset of $B$ |
:::

Cambridge Core uses the universal set, complement, union, intersection and $n(A)$. The symbols $\in$, $\notin$, $\subseteq$, $\not\subseteq$ and $\varnothing$ are Cambridge Extended, and ZIMSEC uses all of them.

:::worked-solution[Example 2: working with three sets]
$\mathscr{E} = \{1, 2, 3, \ldots, 12\}$, $A = \{\text{even numbers}\}$ and $B = \{\text{multiples of 3}\}$.
1. List the sets: $A = \{2, 4, 6, 8, 10, 12\}$ and $B = \{3, 6, 9, 12\}$.
2. $A \cap B$ (in both) $= \{6, 12\}$.
3. $A \cup B$ (in either) $= \{2, 3, 4, 6, 8, 9, 10, 12\}$, so $n(A \cup B) = 8$.
4. $A'$ (not in $A$) $= \{1, 3, 5, 7, 9, 11\}$.
5. $9 \in B$ but $9 \notin A$.
:::

## Subsets

$A$ is a subset of $B$ if every element of $A$ is also in $B$. The empty set is a subset of every set, and every set is a subset of itself.

:::worked-solution[Example 3: list all the subsets of $\{p, q, r\}$]
1. No elements: $\varnothing$.
2. One element: $\{p\}$, $\{q\}$, $\{r\}$.
3. Two elements: $\{p, q\}$, $\{p, r\}$, $\{q, r\}$.
4. Three elements: $\{p, q, r\}$.
5. There are 8 subsets. In general, a set with $n$ elements has $2^n$ subsets.
:::

:::note{title="Proper subsets (ZIMSEC)"}
ZIMSEC also uses $A \subset B$ for a **proper** subset: $A$ is a subset of $B$ and $A \neq B$. So $\{1, 2\} \subset \{1, 2, 3\}$, but $\{1, 2, 3\}$ is not a proper subset of itself. The 2025 Cambridge syllabus does not use this symbol.
:::

## Common mistakes

:::mistake{title="Confusing ∈ with ⊆"}
$3 \in \{1, 2, 3\}$ is correct, because 3 is an element. $\{3\} \in \{1, 2, 3\}$ is wrong: $\{3\}$ is a set, so write $\{3\} \subseteq \{1, 2, 3\}$.
:::

:::mistake{title="Mixing up union and intersection"}
$\cup$ (union, "or") collects everything; $\cap$ (intersection, "and") keeps only the elements in both. Think of $\cap$ as the overlap.
:::

:::mistake{title="Forgetting the universal set in a complement"}
$A'$ contains only elements of $\mathscr{E}$. If $\mathscr{E} = \{1, \ldots, 12\}$, then 15 is not in $A'$, even though it is not in $A$.
:::

:::mistake{title="Repeating elements"}
Each element is listed once: the set of letters in "ZIMBABWE" is $\{Z, I, M, B, A, W, E\}$, which has 7 elements, not 8.
:::

## Exam tips

:::exam-tip
When asked to "list the elements", use curly brackets and commas, and check the boundary values in set-builder notation ($<$ or $\leq$).
:::

:::exam-tip
Questions such as "find $n(A \cup B)$" want a **number**; "find $A \cup B$" wants a **set** in curly brackets.
:::

:::exam-tip
Write the sets out in full before combining them; it is the quickest way to avoid careless errors.
:::

## Summary

:::summary
- A set is a well-defined collection of elements, written in curly brackets; $n(A)$ is its number of elements.
- Sets can be listed, described in words, or written in set-builder notation $\{x : \ldots\}$.
- $A \cup B$ is "in $A$ or $B$ or both", $A \cap B$ is "in both", and $A'$ is "in $\mathscr{E}$ but not in $A$".
- $\in$ links an element to a set; $\subseteq$ links a set to a set; $\varnothing$ is the empty set.
- A set with $n$ elements has $2^n$ subsets.
:::
