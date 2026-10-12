---
{
  "key": "ds.arrays",
  "title": "One- and two-dimensional arrays",
  "summary": "The terms array, element, index and bounds, declaring and initialising one- and two-dimensional arrays in pseudocode and Python, choosing between them, processing array data with loops, and static against dynamic data structures.",
  "concepts": ["acs.ds.arrays"],
  "estimatedMinutes": 60,
  "level": "core",
  "freePreview": true
}
---
## Introduction

A teacher in Gweru has eight test marks to process. She could give each mark its own variable (`Mark1`, `Mark2` and so on), but then finding the total would need eight separate additions, and she would have to rewrite the program for a class of forty. A better way is to keep all the marks under one name and use a number to pick out the one wanted. A structure that does this is an **array**.

Arrays are the most common data structure in programs. This lesson explains the terms, how to declare and fill a one-dimensional array (a list) and a two-dimensional array (a table), how loops process arrays, and how an array differs from the dynamic structures met later. All outputs were produced by running the code. You should already know variables, loops and selection.

## Key definitions

:::definition{term="Array"}
A data structure that holds a fixed number of items of the same data type under one identifier. Each item is reached using its position number.
:::

:::definition{term="Element"}
One item stored in an array, for example `Marks[3]`.
:::

:::definition{term="Index"}
The number that identifies the position of an element in an array. In the pseudocode used here the first index is 1.
:::

:::definition{term="Lower bound and upper bound"}
The smallest and largest valid index of an array. For `ARRAY[1:8]` they are 1 and 8. Using an index outside the bounds is an error.
:::

:::definition{term="Two-dimensional array"}
An array whose elements are identified by two indexes, a row number and a column number, like the cells of a table.
:::

## One-dimensional arrays

A one-dimensional (1D) array is a list. It is declared with its bounds and the type of its elements. Every element has the same data type.

{{dataTable}}

The array above is declared `DECLARE Marks : ARRAY[1:8] OF INTEGER`, so `Marks[1]` is 56 and `Marks[4]` is 90. Python lists start at index 0, so the same element is `marks[3]`; the table below shows the usual forms in both languages.

{{declTable}}

To fill an array, a loop usually sets each element in turn. Processing an array also uses a loop, because the loop variable can be used as the index. Typical tasks are finding a **total**, a **maximum**, a **count** of items that meet a condition, or a **search** for an item.

:::worked-solution{title="Total, average, highest and count of the marks"}
The algorithm below processes the eight marks shown in one pass.

{{oneD}}

The Python version, run for real:

{{oneDpy}}

{{oneDout}}

The total is 56 + 71 + 48 + 90 + 63 + 39 + 77 + 82 = 526, and the average is 526 ÷ 8 = 65.75. The highest mark, 90, is at position 4, and six marks are at least 50 (48 and 39 are not). The variables `Largest` and `Position` are set from the first element before the loop, so that the first comparison is made with a real mark.
:::

## Two-dimensional arrays

A table of data, such as the marks of several pupils in several subjects, needs two indexes. A 2D array is declared with a row range and a column range: `ARRAY[1:3, 1:4]` has 3 rows and 4 columns, which is 12 elements. An element is `Scores[Row, Column]`. In Python it is a list of lists, written `scores[row][column]`.

{{gridMd}}

In this table `Scores[2, 3]` is 59, Rudo's mark in Science. A 2D array is processed with **nested loops**: the outer loop moves down the rows and the inner loop along the columns.

:::worked-solution{title="Row totals and column totals of a 2D array"}
{{twoD}}

The Python version also finds the total of each column, and prints the element in row 2, column 3:

{{twoDpy}}

{{twoDout}}

The row totals are 236, 279 and 196, so Rudo has the highest total. The column totals are 187, 174, 168 and 182. The last line shows `scores[1][2]` (row 2, column 3, since Python counts from 0), which is 59. Initialising with a loop or with `[[0] * 4 for row in range(3)]` creates a separate list for each row:

{{initPy}}

{{initOut}}
:::

## Choosing between a 1D and a 2D array

Use a **1D array** for a simple list of values of one kind (the marks of a class, the prices of items). Use a **2D array** when the data forms a table in which each value is identified by two things (pupil and subject, row and seat, day and hour). If the data of one entity has several different types, use an array of records instead, as the previous lesson shows.

## Static and dynamic data structures

An array is a **static** data structure: its size is fixed when it is declared and it cannot grow or shrink while the program runs, and its elements are stored next to each other in memory. This makes access very quick, because the position of any element is worked out from its index, but memory is wasted if the array is larger than needed and the program fails if more items must be stored than the array holds. A **dynamic** data structure, such as a linked list or a binary tree, changes size as items are added and removed. Python's built-in list can be extended while the program runs, but in this course it is used as an array of fixed size.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine one- and two-dimensional arrays, with the pseudocode declarations `ARRAY[1:n] OF type` and `ARRAY[1:r, 1:c] OF type`. The ZIMSEC syllabus uses the terms static and dynamic data structures (arrays against linked lists and binary trees). Cambridge pseudocode states the lower bound explicitly; the examples here start at 1.
:::

## Common mistakes

:::mistake{title="Going outside the bounds"}
In `ARRAY[1:8]` the valid indexes are 1 to 8. `Marks[0]` or `Marks[9]` is an error. A loop to `8 + 1` is a common off-by-one mistake.
:::

:::mistake{title="Mixing up row and column"}
`Scores[2, 3]` is row 2, column 3 (Rudo, Science), not row 3, column 2. Always give the row first.
:::

:::mistake{title="Forgetting the starting values"}
A total must start at 0 before the loop, and a maximum must start from the first element (or a very small value), not from 0 if marks could be negative.
:::

:::mistake{title="Using the wrong index in Python"}
Python lists start at 0, so the element at pseudocode position 4 is `marks[3]`, and the last of 8 is `marks[7]`.
:::

## Exam tips

:::exam-tip
Cambridge Papers 1 and 2 and ZIMSEC Papers 1 and 2 ask you to **declare** an array, **write** a loop that fills or processes it (total, maximum, count, search), and **trace** nested loops over a 2D array. State the bounds exactly and use the loop variable as the index.
:::

:::exam-tip
"**Explain** why a 2D array is suitable" needs a reference to the data given in the question: it is a table with two characteristics, so each value needs a row index and a column index. "**Describe** a static structure" needs fixed size, elements stored together and quick access.
:::

## Summary

:::summary
- An array holds a fixed number of elements of the same type under one name; each is reached by its index within the lower and upper bounds.
- A 1D array is a list, declared `ARRAY[1:n] OF type`; a 2D array is a table, declared `ARRAY[1:r, 1:c] OF type` and processed with nested loops.
- Loops use the loop variable as the index to find totals, maximums, counts and to search.
- Python lists start at index 0, so `Marks[4]` in pseudocode is `marks[3]` in Python.
- An array is static: its size is fixed and its elements are stored together, so access is quick, whereas dynamic structures grow and shrink.
:::
