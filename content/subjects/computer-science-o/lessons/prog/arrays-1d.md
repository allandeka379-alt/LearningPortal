---
{
  "key": "prog.arrays-1d",
  "title": "One-dimensional arrays",
  "summary": "Why programs use arrays, how to declare a one-dimensional array with its bounds, how to read and write elements using an index, and how to process a whole array with a loop to input, output, total, find the largest value and search.",
  "concepts": ["comp.prog.arrays-1d"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

A Form 3 class in Masvingo has 35 learners. A program that stores each learner's name in a separate variable would need `Name1`, `Name2`, … all the way to `Name35`, and 35 separate INPUT statements to fill them. Finding a learner or sorting the class would be almost impossible to write.

An **array** solves this. It stores many values of the same type under **one** identifier, and each value is reached by its position number, the **index**. Because the index can be a variable, a single loop can process every element, whether there are 5 or 5,000. Arrays appear in nearly every Cambridge Paper 2: you will declare them, trace loops over them and, in the 15-mark scenario question, process arrays that the question says are already filled with data.

## Key definitions

:::definition{term="Array"}
A data structure that holds a fixed number of values of the same data type under one identifier, each value being reached by its index.
:::

:::definition{term="Element"}
One value stored in an array, at one index position.
:::

:::definition{term="Index"}
The number that identifies the position of an element in an array; in 0478 pseudocode the first index is usually 1.
:::

:::definition{term="One-dimensional (1D) array"}
An array whose elements are arranged in a single row (a list), so each element is identified by one index.
:::

## Declaring a 1D array

```
DECLARE LearnerNames : ARRAY[1:35] OF STRING
DECLARE Rainfall : ARRAY[1:5] OF INTEGER
```

The declaration gives the identifier, the **lower bound** and **upper bound** of the index (here 1 and 35), and the data type of every element. The array therefore holds upper − lower + 1 elements. All elements have the same data type, and the size is fixed when the array is declared. It is good practice to state the lower bound, because some languages start indexes at 0 and others at 1.

## Using elements

An element is used exactly like a variable, by writing the array name followed by the index in square brackets:

```
LearnerNames[1] ← "Tendai"
INPUT Rainfall[3]
OUTPUT LearnerNames[Position]
Rainfall[Day + 1] ← Rainfall[Day]
```

The index can be a number, a variable or an expression, as long as it is a whole number between the bounds. Using an index outside the bounds, such as `Rainfall[6]` for a five-element array, causes a run-time error.

## Processing an array with a loop

Because the index can be a variable, a FOR loop whose counter runs from the lower bound to the upper bound visits every element once:

```
FOR Index ← 1 TO 35
    OUTPUT "Enter name of learner ", Index
    INPUT LearnerNames[Index]
NEXT Index
```

The same pattern outputs every element, sets every element to a starting value (for example `Total[Index] ← 0`), or applies the standard methods of totalling, counting, finding the maximum and minimum, and searching.

:::worked-solution[Total and wettest day]
The array `Rainfall` holds the rainfall in millimetres for five days.

| Index | 1 | 2 | 3 | 4 | 5 |
|:-:|:-:|:-:|:-:|:-:|:-:|
| Rainfall | 12 | 0 | 7 | 25 | 3 |

```
Total ← 0
Wettest ← Rainfall[1]
WettestDay ← 1
FOR Day ← 1 TO 5
    Total ← Total + Rainfall[Day]
    IF Rainfall[Day] > Wettest
        THEN
            Wettest ← Rainfall[Day]
            WettestDay ← Day
    ENDIF
NEXT Day
OUTPUT Total, " ", WettestDay
```

| Day | Total | Wettest | WettestDay | OUTPUT |
|:-:|:-:|:-:|:-:|:-:|
|  | 0 | 12 | 1 |  |
| 1 | 12 |  |  |  |
| 2 |  |  |  |  |
| 3 | 19 |  |  |  |
| 4 | 44 | 25 | 4 |  |
| 5 | 47 |  |  |  |
|  |  |  |  | 47 4 |

1. `Day` is used as the index, so each pass looks at the next element.
2. Storing `Day` as well as the value tells us **which** day was wettest, not just how much rain fell.
3. On day 2 nothing changes: 0 is added to the total and 0 is not greater than 12.
:::

## Parallel arrays

Two or more arrays of the same size can hold related data, with the **same index** linking them. For example, `Names[4]` is the name of a learner and `Marks[4]` is that learner's mark. This is how scenario questions usually store records, because a 0478 array holds only one data type.

:::worked-solution[Searching parallel arrays]
| Index | 1 | 2 | 3 | 4 | 5 | 6 |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| Names | Tendai | Rudo | Farai | Chipo | Sipho | Nyasha |
| Marks | 58 | 73 | 66 | 81 | 49 | 70 |

The program finds Chipo's mark using a linear search with a flag.

```
SearchName ← "Chipo"
Found ← FALSE
Index ← 0
WHILE Found = FALSE AND Index < 6 DO
    Index ← Index + 1
    IF Names[Index] = SearchName
        THEN
            Found ← TRUE
    ENDIF
ENDWHILE
IF Found
    THEN
        OUTPUT SearchName, " scored ", Marks[Index]
    ELSE
        OUTPUT "Not found"
ENDIF
```

| Index | Found | OUTPUT |
|:-:|:-:|:-:|
| 0 | FALSE |  |
| 1 |  |  |
| 2 |  |  |
| 3 |  |  |
| 4 | TRUE |  |
|  |  | Chipo scored 81 |

1. The WHILE loop stops as soon as the name is found, so elements 5 and 6 are never checked.
2. When the loop ends, `Index` still holds 4, the position of the match, so `Marks[Index]` is Chipo's mark.
3. The condition `Index < 6` stops the search at the end of the array if the name is not there.
:::

## Why use arrays?

- One identifier replaces many separate variables, so code is shorter and easier to read.
- A loop with a variable index can process every element, however many there are.
- Related data can be kept together in parallel arrays and processed in the same loop.
- Data can be sorted and searched, which is very hard with separate variables.

:::keyfact{title="ZIMSEC and Cambridge"}
Arrays are a Cambridge 0478 topic (8.2): declaring and using 1D and 2D arrays, explaining their use, and reading and writing elements with loops. The ZIMSEC syllabus does not list arrays as a separate objective. In Python the nearest structure is a list, whose first index is 0.
:::

## Common mistakes

:::mistake{title="Going past the bounds"}
`FOR Index ← 1 TO 36` on an `ARRAY[1:35]` asks for `Names[36]`, which does not exist. Make the loop's end value the upper bound.
:::

:::mistake{title="Confusing the index with the value"}
`Rainfall[4]` is 25 in the example: 4 is the position, 25 is the element stored there. Questions often ask for one or the other.
:::

:::mistake{title="Using the array name without an index"}
`OUTPUT Rainfall` or `Total ← Total + Rainfall` is not valid for a single element. Write `Rainfall[Day]`.
:::

:::mistake{title="Mixing data types"}
A 0478 array holds one data type. Store names and marks in two parallel arrays, not one.
:::

## Exam tips

:::exam-tip
In a scenario question, read the description of the arrays carefully: their names, sizes and what each index means. Use those exact names in your answer; examiners award marks for using the given arrays correctly.
:::

:::exam-tip
When asked to *explain* why an array is used, mention one identifier for many values of the same type and processing every element with a loop. Give the data from the question as your example.
:::

## Summary

:::summary
- An array stores a fixed number of values of one data type under one identifier.
- Declare with `DECLARE Name : ARRAY[1:n] OF TYPE`; the bounds fix the number of elements.
- Use an element with `Name[Index]`; the index can be a variable or expression within the bounds.
- A FOR loop from the lower to the upper bound processes every element: input, output, totals, maximum, search.
- Parallel arrays share an index to store related data such as names and marks.
:::
