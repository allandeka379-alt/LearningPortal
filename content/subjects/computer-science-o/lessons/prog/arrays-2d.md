---
{
  "key": "prog.arrays-2d",
  "title": "Two-dimensional arrays",
  "summary": "Storing data in a table of rows and columns: declaring a two-dimensional array, using a row index and a column index, and processing the array with nested loops to fill it, output it, find row and column totals and search it.",
  "concepts": ["comp.prog.arrays-2d"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

A company runs three hardware shops, in Harare, Gweru and Mutare, and records each shop's sales for each of four weeks. The data naturally forms a table: one **row** per shop and one **column** per week. A one-dimensional array could hold one shop's four weeks, or all three shops' sales for one week, but not the whole table in a way that keeps its shape.

A **two-dimensional (2D) array** does exactly that. Each element is found by two indexes: which row and which column. Seating plans, timetables, game boards, marks for each learner in each subject and sales by shop and week are all 2D arrays. Cambridge Paper 2 questions ask you to declare them, trace nested loops over them and write code to total rows and columns or search them, and the scenario question often provides one already filled with data.

## Key definitions

:::definition{term="Two-dimensional array"}
An array whose elements are arranged in rows and columns, like a table, so each element is identified by two indexes.
:::

:::definition{term="Row index"}
The first index of an element in a 2D array, saying which row it is in.
:::

:::definition{term="Column index"}
The second index of an element in a 2D array, saying which column it is in.
:::

## Declaring and using a 2D array

```
DECLARE Sales : ARRAY[1:3, 1:4] OF INTEGER
DECLARE Board : ARRAY[1:3, 1:3] OF CHAR
```

The first pair of bounds is for the rows and the second for the columns, so `Sales` has 3 rows and 4 columns: 3 × 4 = 12 elements, all of the same data type.

An element is written with both indexes, row first: `Sales[2, 3]` is the element in row 2, column 3. Each index can be a number, a variable or an expression within its bounds:

```
Sales[1, 4] ← 37
INPUT Sales[Shop, Week]
OUTPUT Board[Row, Column]
```

Here is `Sales` filled with data, with each shop as a row and each week as a column:

| Sales | Column 1 | Column 2 | Column 3 | Column 4 |
|:-:|:-:|:-:|:-:|:-:|
| Row 1 | 34 | 28 | 41 | 37 |
| Row 2 | 22 | 30 | 19 | 25 |
| Row 3 | 45 | 38 | 50 | 42 |

`Sales[3, 2]` is 38 (row 3, column 2), while `Sales[2, 3]` is 19. Swapping the indexes picks a different element, so always check the order.

## Nested loops

To visit every element, use one loop for the rows and, **inside** it, another loop for the columns. The inner loop runs completely for every pass of the outer loop, so each row is processed column by column.

```
FOR Shop ← 1 TO 3
    FOR Week ← 1 TO 4
        OUTPUT "Sales for shop ", Shop, " week ", Week
        INPUT Sales[Shop, Week]
    NEXT Week
NEXT Shop
```

The loop counters are used as the indexes, and the loop bounds match the array bounds: 3 for rows, 4 for columns.

:::worked-solution[Row totals]
The program outputs the total sales of each shop.

```
FOR Shop ← 1 TO 3
    ShopTotal ← 0
    FOR Week ← 1 TO 4
        ShopTotal ← ShopTotal + Sales[Shop, Week]
    NEXT Week
    OUTPUT "Shop ", Shop, ": ", ShopTotal
NEXT Shop
```

| Shop | Week | ShopTotal | OUTPUT |
|:-:|:-:|:-:|:-:|
| 1 |  | 0 |  |
|  | 1 | 34 |  |
|  | 2 | 62 |  |
|  | 3 | 103 |  |
|  | 4 | 140 |  |
|  |  |  | Shop 1: 140 |
| 2 |  | 0 |  |
|  | 1 | 22 |  |
|  | 2 | 52 |  |
|  | 3 | 71 |  |
|  | 4 | 96 |  |
|  |  |  | Shop 2: 96 |
| 3 |  | 0 |  |
|  | 1 | 45 |  |
|  | 2 | 83 |  |
|  | 3 | 133 |  |
|  | 4 | 175 |  |
|  |  |  | Shop 3: 175 |

1. `ShopTotal ← 0` is **inside** the outer loop but **before** the inner loop, so each shop starts from zero.
2. The output is inside the outer loop but after the inner loop, so it happens once per shop, when that row is complete.
3. Putting `ShopTotal ← 0` before both loops would give running totals of 140, 236 and 411 instead.
:::

## Column totals

To total each **column** (here, each week across all shops), swap the loops: weeks in the outer loop and shops in the inner loop. The indexes inside the brackets keep the same order, `Sales[Shop, Week]`, because the array's shape has not changed; only the order of visiting has.

:::worked-solution[Best week across all shops]
```
BestWeek ← 1
BestTotal ← 0
FOR Week ← 1 TO 4
    WeekTotal ← 0
    FOR Shop ← 1 TO 3
        WeekTotal ← WeekTotal + Sales[Shop, Week]
    NEXT Shop
    IF WeekTotal > BestTotal
        THEN
            BestTotal ← WeekTotal
            BestWeek ← Week
    ENDIF
NEXT Week
OUTPUT "Best week: ", BestWeek, " with ", BestTotal
```

1. Column totals: week 1 is 34 + 22 + 45 = 101, week 2 is 96, week 3 is 110 and week 4 is 104.
2. The comparison with `BestTotal` happens after each column is complete, in the outer loop.
3. The output is `Best week: 3 with 110`. Starting `BestTotal` at 0 is safe here because sales cannot be negative.
:::

## Searching a 2D array

A search also uses nested loops. To report **where** a value is, store both indexes when it is found.

:::example{title="Finding an empty seat"}
A school hall has 10 rows of 12 seats, stored as `Booked : ARRAY[1:10, 1:12] OF BOOLEAN`. The program counts the free seats and outputs the position of the first one.

```
FreeCount ← 0
FirstRow ← 0
FirstSeat ← 0
FOR Row ← 1 TO 10
    FOR Seat ← 1 TO 12
        IF Booked[Row, Seat] = FALSE
            THEN
                FreeCount ← FreeCount + 1
                IF FirstRow = 0
                    THEN
                        FirstRow ← Row
                        FirstSeat ← Seat
                ENDIF
        ENDIF
    NEXT Seat
NEXT Row
OUTPUT FreeCount, " seats free"
IF FirstRow > 0
    THEN
        OUTPUT "First free seat: row ", FirstRow, " seat ", FirstSeat
ENDIF
```

`FirstRow` stays 0 until a free seat is found, so the inner IF records only the first one. The loops visit all 10 × 12 = 120 seats.
:::

## Common mistakes

:::mistake{title="Swapping the row and column indexes"}
`Sales[Week, Shop]` instead of `Sales[Shop, Week]` reads the wrong element, and when the dimensions differ it soon goes out of bounds (there is no row 4). Keep the index order of the declaration.
:::

:::mistake{title="Resetting a total in the wrong place"}
A row total must be set to 0 inside the outer loop and before the inner loop. Set it before both loops and it never resets; set it inside the inner loop and it is wiped out on every element.
:::

:::mistake{title="Loop bounds that do not match the array"}
For `ARRAY[1:3, 1:4]` the row loop runs 1 to 3 and the column loop 1 to 4. Using 4 for both is out of bounds on the rows.
:::

## Exam tips

:::exam-tip
Before tracing a nested loop, decide which index changes fastest: the inner loop's counter. Write the order of the elements visited, such as [1,1], [1,2], [1,3], [1,4], [2,1] …, and the trace becomes mechanical.
:::

:::exam-tip
In the scenario question, a 2D array is often described in words, for example "row 1 stores the morning readings and row 2 the afternoon readings". Use exactly that meaning for each index in your code.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
2D arrays are a Cambridge 0478 topic (8.2), processed with nested iteration. The ZIMSEC syllabus does not list arrays separately. In Python a table is usually a list of lists, `sales[1][2]`, with indexes starting at 0.
:::

## Summary

:::summary
- A 2D array stores values of one data type in rows and columns: `ARRAY[1:rows, 1:columns] OF TYPE`.
- An element is written `Name[Row, Column]`, row index first; the number of elements is rows × columns.
- Nested loops process every element; the inner loop runs completely for each pass of the outer loop.
- For row totals, reset the total inside the outer loop before the inner loop; for column totals, swap the loops.
- Store both indexes when searching to report where a value was found.
:::
