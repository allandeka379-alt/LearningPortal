---
{
  "key": "algo.binary-search-insertion-sort",
  "title": "Binary search and insertion sort",
  "summary": "Writing and tracing a binary search of a sorted array with low, high and mid, the number of comparisons needed, an insertion sort with shifting, how the performance of each depends on the data and its size, and choosing between linear and binary search.",
  "concepts": ["acs.algo.binary-search-insertion-sort"],
  "estimatedMinutes": 60,
  "level": "core"
}
---
## Introduction

Finding a name in a printed telephone directory does not mean reading every entry. You open the book near the middle, see whether the name comes before or after the page you are on, and ignore the half that cannot contain it. Repeating this, you find the name in a few steps. The **binary search** does exactly this on a sorted array, and it is far faster than a linear search for long lists.

A binary search only works if the list is already sorted, so this lesson also covers the **insertion sort**, which sorts a list the way many people sort playing cards in their hand: take each card in turn and slide it into its place among the cards already in order. Tables and outputs were produced by code that mirrors the pseudocode. You should already know the linear search and bubble sort.

## Key definitions

:::definition{term="Binary search"}
A search of a sorted list that compares the target with the middle item and discards the half that cannot contain it, repeating on the remaining half until the item is found or no items remain.
:::

:::definition{term="Insertion sort"}
A sorting algorithm that takes each item in turn, starting with the second, and inserts it into its correct place among the items before it, which are already in order, by shifting larger items one place to the right.
:::

:::definition{term="Shift"}
Moving an item one place along an array to make room for an item being inserted.
:::

## Binary search

The data must be in order. The algorithm keeps the positions of the **low** and **high** ends of the part of the list still being searched, and works out the **middle** position `Mid ← DIV(Low + High, 2)`. It compares `Data[Mid]` with the target:

- equal: the item is found;
- `Data[Mid]` is smaller than the target: the target can only be in the upper half, so `Low ← Mid + 1`;
- `Data[Mid]` is larger: the target can only be in the lower half, so `High ← Mid - 1`.

The loop ends when the item is found or `Low` is greater than `High`, which means no items remain and the target is **not in the list**. The array used here holds twelve values in ascending order:

| Index | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| Data | 5 | 11 | 14 | 22 | 27 | 31 | 38 | 45 | 52 | 60 | 71 | 88 |

```
DECLARE Data : ARRAY[1:12] OF INTEGER   // in ascending order
DECLARE Low, High, Mid, Target : INTEGER
DECLARE Found : BOOLEAN
INPUT Target
Low ← 1
High ← 12
Found ← FALSE
WHILE Found = FALSE AND Low <= High DO
    Mid ← DIV(Low + High, 2)
    IF Data[Mid] = Target THEN
        Found ← TRUE
    ELSE
        IF Data[Mid] < Target THEN
            Low ← Mid + 1
        ELSE
            High ← Mid - 1
        ENDIF
    ENDIF
ENDWHILE
IF Found = TRUE THEN
    OUTPUT "Found at position ", Mid
ELSE
    OUTPUT "Not found"
ENDIF
```

The Python version counts from 0, so it outputs `mid + 1`. Run with the target 45 the real output is:

```python
data = [5, 11, 14, 22, 27, 31, 38, 45, 52, 60, 71, 88]
target = int(input())
low = 0
high = len(data) - 1
found = False
while not found and low <= high:
    mid = (low + high) // 2
    if data[mid] == target:
        found = True
    elif data[mid] < target:
        low = mid + 1
    else:
        high = mid - 1
if found:
    print("Found at position", mid + 1)
else:
    print("Not found")
```

```
Found at position 8
```

and with the target 30, which is not in the array:

```
Not found
```

:::worked-solution{title="Tracing a binary search that succeeds and one that fails"}
Searching for **45**. Each row is one pass of the loop, with one comparison.

| Low | High | Mid | Data[Mid] | Compare with 45 |
|:-:|:-:|:-:|:-:|:-:|
| 1 | 12 | 6 | 31 | less: Low ← Mid + 1 |
| 7 | 12 | 9 | 52 | greater: High ← Mid - 1 |
| 7 | 8 | 7 | 38 | less: Low ← Mid + 1 |
| 8 | 8 | 8 | 45 | equal: found |

It takes **4 comparisons**. In the first row 31 is less than 45 so the lower half is discarded. In the second row 52 is greater so the upper part is discarded, and so on until `Data[8]` is 45.

Searching for **30**, which is not in the list:

| Low | High | Mid | Data[Mid] | Compare with 30 |
|:-:|:-:|:-:|:-:|:-:|
| 1 | 12 | 6 | 31 | greater: High ← Mid - 1 |
| 1 | 5 | 3 | 14 | less: Low ← Mid + 1 |
| 4 | 5 | 4 | 22 | less: Low ← Mid + 1 |
| 5 | 5 | 5 | 27 | less: Low ← Mid + 1 |

After the fourth comparison `Low` becomes 6 while `High` is 5, so `Low <= High` is false, the loop ends with `Found` still `FALSE`, and "Not found" is output after **4 comparisons**.
:::

### How many comparisons?

Each comparison halves the number of items left, so the worst case needs about log₂ n comparisons, and exactly ⌊log₂ n⌋ + 1 in the version above. The table shows the worst cases, computed by running the algorithm:

| Items in the list | Linear search, worst case | Binary search, worst case |
|:-:|:-:|:-:|
| 12 | 12 | 4 |
| 100 | 100 | 7 |
| 1 000 | 1 000 | 10 |
| 1 000 000 | 1 000 000 | 20 |

A list of a million items needs at most 20 comparisons, where a linear search may need a million. Doubling the size of the list adds only one comparison.

## Insertion sort

```
DECLARE Data : ARRAY[1:6] OF INTEGER
DECLARE Index, Position, Key : INTEGER
FOR Index ← 2 TO 6
    Key ← Data[Index]
    Position ← Index - 1
    WHILE Position >= 1 AND Data[Position] > Key DO
        Data[Position + 1] ← Data[Position]
        Position ← Position - 1
    ENDWHILE
    Data[Position + 1] ← Key
NEXT Index
```

For each `Index` from 2, the value `Key` is copied out. The items before it that are larger than `Key` are shifted one place right, starting with the one next to it, and then `Key` is written into the gap. The condition `Position >= 1` is tested first so that `Data[0]`, which does not exist, is never read. The Python version, checked by running it:

```python
data = [34, 12, 27, 9, 41, 18]
for index in range(1, len(data)):
    key = data[index]
    position = index - 1
    while position >= 0 and data[position] > key:
        data[position + 1] = data[position]
        position = position - 1
    data[position + 1] = key
print(data)
```

```
[9, 12, 18, 27, 34, 41]
```

:::worked-solution{title="Insertion sort of six marks"}
The array starts as 34, 12, 27, 9, 41, 18. The first item is already a sorted list of one. The table shows the array after each pass; comparisons are the tests of `Data[Position] > Key`, and shifts are the items moved right.

| Pass | Key | Array after the pass | Comparisons | Shifts |
|:-:|:-:|:-:|:-:|:-:|
| start |  | 34, 12, 27, 9, 41, 18 |  |  |
| 1 | 12 | 12, 34, 27, 9, 41, 18 | 1 | 1 |
| 2 | 27 | 12, 27, 34, 9, 41, 18 | 2 | 1 |
| 3 | 9 | 9, 12, 27, 34, 41, 18 | 3 | 3 |
| 4 | 41 | 9, 12, 27, 34, 41, 18 | 1 | 0 |
| 5 | 18 | 9, 12, 18, 27, 34, 41 | 4 | 3 |

Pass 3 is the largest: the key 9 is smaller than 34, 27 and 12, so all three are shifted and 9 goes to the front. In pass 4 the key 41 is larger than 34, so one comparison shows it is already in place and nothing moves. Altogether there are **11 comparisons** and **8 shifts**.
:::

### Effect of the initial order

| Starting order | Array | Comparisons | Shifts |
|:-:|:-:|:-:|:-:|
| already sorted | 9, 12, 18, 27, 34, 41 | 5 | 0 |
| reverse order | 41, 34, 27, 18, 12, 9 | 15 | 15 |
| the data above | 34, 12, 27, 9, 41, 18 | 11 | 8 |

Data that is already in order is the best case: each key needs one comparison and nothing is shifted, so the work grows in proportion to the number of items. Data in reverse order is the worst case: every key is shifted past all the items before it, which gives 15 comparisons and 15 shifts for six items, growing with the square of the number of items. Insertion sort is quick on lists that are nearly sorted and is therefore often used to add a few new items to a sorted list.

## Choosing between linear and binary search

- Use a **linear search** when the list is unsorted, is short, or will be searched only once, because sorting it first would cost more than it saves.
- Use a **binary search** when the list is already sorted (or will be searched many times), is long, and its items can be reached directly by position, as in an array.

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC (Form 5) names the binary search and expects you to compare it with a linear search; the insertion sort is Cambridge detail (A Level, Paper 3, topic 19). Cambridge examines both and may ask for the binary search in pseudocode or Python and for the number of comparisons. The pseudocode above uses the 9618 style for both boards.
:::

## Common mistakes

:::mistake{title="Binary search on unsorted data"}
The method relies on order. If the data is not sorted, discarding half of the list can throw away the target. Sort the list first or use a linear search.
:::

:::mistake{title="Not changing Low or High"}
Setting `Low ← Mid` or `High ← Mid` instead of `Mid + 1` and `Mid - 1` can make the loop repeat for ever, because the middle item has already been compared.
:::

:::mistake{title="Overwriting the key in the insertion sort"}
Without copying the item into `Key` first, the first shift overwrites it and the value is lost.
:::

:::mistake{title="Saying binary search is always better"}
For a short or unsorted list a linear search is simpler and the cost of sorting may outweigh the saving.
:::

## Exam tips

:::exam-tip
Questions **trace** a binary search with a table of Low, High and Mid, **state** the number of comparisons for a given target, or **explain** why the data must be sorted. Show the new values of Low and High on each row, and state how the loop ends when the target is missing.
:::

:::exam-tip
"**Compare** an insertion sort with a bubble sort" needs correct statements about each: both are slow for long lists (work grows with the square of the number of items), insertion sort shifts items rather than swapping pairs, and both are fast on data that is almost in order.
:::

## Summary

:::summary
- A binary search needs sorted data; it compares with `Mid ← DIV(Low + High, 2)` and discards half of the remaining items each time.
- It ends when the item is found or `Low > High` (not found); the worst case is about log₂ n comparisons.
- An insertion sort inserts each item into the sorted part by shifting larger items right, using `Key` to hold the item.
- Insertion sort is quickest on data already in order and slowest on reverse-ordered data.
- Choose a linear search for short or unsorted lists and a binary search for long sorted lists.
:::
