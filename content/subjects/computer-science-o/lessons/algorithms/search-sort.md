---
{
  "key": "algorithms.search-sort",
  "title": "Linear search and bubble sort",
  "summary": "How a linear search checks each item in turn and stops when the item is found, and how a bubble sort orders an array by comparing and swapping neighbouring items in passes, using a flag to stop early; tracing both and writing them in pseudocode.",
  "concepts": ["comp.algorithms.search-sort"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

A pharmacy in Harare keeps the codes of its medicines in a list. When a customer asks for a medicine, the program must **search** the list for its code. At the end of the month the manager wants the medicines **sorted** by the number sold, from least to most. Searching and sorting are two of the most common jobs a computer does.

Cambridge names two standard methods you must be able to explain, trace and write: the **linear search** and the **bubble sort**. ZIMSEC lists searching and sorting techniques among the skills of its best candidates. Expect questions that ask you to describe how each works, to show the state of an array after a pass, to count comparisons, or to complete or write the pseudocode.

## Key definitions

:::definition{term="Linear search"}
A search that checks each item of a list in turn, starting from the first, until the item is found or the end of the list is reached.
:::

:::definition{term="Bubble sort"}
A sort that repeatedly passes through a list comparing each pair of neighbouring items and swapping them if they are in the wrong order, until a pass makes no swaps.
:::

:::definition{term="Pass"}
One complete run through the list (or the unsorted part of it) by a sorting algorithm.
:::

:::definition{term="Flag"}
A Boolean variable that records whether something has happened, such as `Found` in a search or `Swapped` in a sort.
:::

## Linear search

The linear search works on any list, sorted or not:

1. Start at the first item.
2. Compare the item with the value being searched for.
3. If they match, the item is found: stop.
4. Otherwise move to the next item and repeat, until the end of the list.
5. If the end is reached without a match, the item is not in the list.

A `WHILE` loop with a `Found` flag stops as soon as the item is found, which saves time:

![Linear search of the codes 418, 205, 377, 960, 122, 543, 381, 709: searching for 122 stops at index 5 after 5 comparisons, while searching for 300 compares all 8 codes and reports Not found](media:diagrams/linear-search-codes.png "Figure: a linear search finding 122 at index 5, and failing to find 300 after 8 comparisons")

```
OUTPUT "Enter the code to find"
INPUT SearchCode
Found ← FALSE
Index ← 1
WHILE Found = FALSE AND Index <= 8 DO
    IF Codes[Index] = SearchCode
        THEN
            Found ← TRUE
        ELSE
            Index ← Index + 1
    ENDIF
ENDWHILE
IF Found = TRUE
    THEN
        OUTPUT "Found at position ", Index
    ELSE
        OUTPUT "Not found"
ENDIF
```

:::worked-solution[Tracing a linear search]
The array `Codes` holds:

| Index | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| Codes | 418 | 205 | 377 | 960 | 122 | 543 | 381 | 709 |

**Search for 122.** The comparisons at indexes 1 to 4 fail, so `Index` goes up to 5. At index 5 the codes match, `Found` becomes `TRUE`, and the loop stops. Output: "Found at position 5", after **5 comparisons**.

**Search for 300.** No code matches:

| Index | Found | OUTPUT |
|:-:|:-:|:-:|
| 1 | FALSE |  |
| 2 |  |  |
| 3 |  |  |
| 4 |  |  |
| 5 |  |  |
| 6 |  |  |
| 7 |  |  |
| 8 |  |  |
| 9 |  |  |
|  |  | Not found |

1. Every one of the 8 codes is compared, so a missing item costs the most comparisons.
2. When `Index` reaches 9, `Index <= 8` is false and the loop ends with `Found` still `FALSE`.
3. The `IF` after the loop uses the flag to choose the message.
:::

A linear search is simple and works on unsorted data, but on a long list it is slow: for a list of *n* items it may need *n* comparisons.

## Bubble sort

To sort into **ascending** order (smallest first):

1. Compare the first two items. If the first is larger, swap them.
2. Move along one place and compare the next pair; swap if needed. Continue to the end of the list. This is one **pass**; the largest item has now "bubbled" to the last position.
3. Repeat the passes. Each pass can stop one place earlier, because the end of the list is already sorted.
4. Stop when a pass makes **no swaps** (the list is sorted) or when there is nothing left to compare.

Swapping needs a temporary variable, as in any swap: `Temp ← List[Index]`, `List[Index] ← List[Index + 1]`, `List[Index + 1] ← Temp`.

![Bubble sort of 27, 12, 35, 8, 19: pass 1 makes 3 swaps and moves 35 to the end giving 12, 27, 8, 19, 35; pass 2 gives 12, 8, 19, 27, 35; pass 3 gives 8, 12, 19, 27, 35 and pass 4 makes no swaps](media:diagrams/bubble-sort-passes.png "Figure: the first pass of a bubble sort comparison by comparison, then the array after each later pass")

:::worked-solution[One pass in detail]
Sort 27, 12, 35, 8, 19 into ascending order. The first pass:

| Comparison | Values compared | Swap? | Array after |
|:-:|:-:|:-:|:-:|
| 1 | 27 and 12 | Yes | 12, 27, 35, 8, 19 |
| 2 | 27 and 35 | No | 12, 27, 35, 8, 19 |
| 3 | 35 and 8 | Yes | 12, 27, 8, 35, 19 |
| 4 | 35 and 19 | Yes | 12, 27, 8, 19, 35 |

All the passes:

| Pass | Array after the pass | Comparisons | Swaps |
|:-:|:-:|:-:|:-:|
| 1 | 12, 27, 8, 19, 35 | 4 | 3 |
| 2 | 12, 8, 19, 27, 35 | 3 | 2 |
| 3 | 8, 12, 19, 27, 35 | 2 | 1 |
| 4 | 8, 12, 19, 27, 35 | 1 | 0 |

1. After pass 1 the largest value, 35, is in its final place; after pass 2, 27 is too.
2. A list of 5 items needs at most 4 passes, with 4, 3, 2 and 1 comparisons: 10 in total.
3. The list is sorted after pass 3, but the algorithm only knows this when a pass makes no swaps.
:::

In pseudocode, a `REPEAT` loop runs the passes and a `FOR` loop makes the comparisons within each pass. The flag `Swapped` records whether any swap happened:

```
Last ← 5
REPEAT
    Swapped ← FALSE
    FOR Index ← 1 TO Last - 1
        IF List[Index] > List[Index + 1]
            THEN
                Temp ← List[Index]
                List[Index] ← List[Index + 1]
                List[Index + 1] ← Temp
                Swapped ← TRUE
        ENDIF
    NEXT Index
    Last ← Last - 1
UNTIL Swapped = FALSE OR Last = 1
```

To sort into **descending** order, change the comparison to `<`. To sort names, the same algorithm works with strings, because strings are compared alphabetically.

:::example{title="Why the flag matters"}
If the list is already in order, for example 3, 6, 9, 14, the first pass makes no swaps, `Swapped` stays `FALSE`, and the sort stops after just 3 comparisons. Without the flag it would carry on with every pass, wasting time on a list that was already sorted.
:::

## Common mistakes

:::mistake{title="Swapping without a temporary variable"}
`List[Index] ← List[Index + 1]` followed by `List[Index + 1] ← List[Index]` puts the same value in both places. Always save one value in `Temp` first.
:::

:::mistake{title="Comparing past the end of the array"}
The comparison uses `List[Index + 1]`, so the inner loop must stop at `Last - 1`. A loop to `Last` would try to read an element that does not exist.
:::

:::mistake{title="Saying a linear search needs sorted data"}
A linear search works on any list, sorted or not. It is other searches (such as the binary search, not on this syllabus) that need sorted data.
:::

## Exam tips

:::exam-tip
When asked to "describe" a bubble sort, mention: comparing neighbouring items, swapping if in the wrong order, repeating passes through the list, and stopping when a pass makes no swaps (using a flag).
:::

:::exam-tip
When asked for the array "after the first pass", do only one pass. Write all the items in their new order, not just the ones that moved.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge 0478 limits the standard searching and sorting methods to the linear search and the bubble sort, and expects you to write and trace both. ZIMSEC's grade descriptors refer to searching and sorting techniques in general; the same two methods cover what is needed.
:::

## Summary

:::summary
- Linear search: check each item from the first; stop when found (`Found` flag) or at the end; works on unsorted lists; up to *n* comparisons.
- Bubble sort: compare neighbouring pairs and swap if out of order; each pass puts the next largest item in place.
- A list of *n* items needs at most *n* − 1 passes; each pass can stop one place earlier.
- A `Swapped` flag stops the sort early when a pass makes no swaps.
- Swaps need a temporary variable; for descending order use `<` instead of `>`.
:::
