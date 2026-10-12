---
{
  "key": "algo.quick-sort",
  "title": "Quick sort",
  "summary": "The divide-and-conquer idea of quick sort, choosing a pivot, partitioning, recursive sorting of the sub-lists, a trace on eight values with every partition shown, the best and worst cases and a comparison with bubble sort.",
  "concepts": ["acs.algo.quick-sort"],
  "estimatedMinutes": 55,
  "level": "core"
}
---
## Introduction

A teacher in Mutare has to sort the marks of a thousand candidates. Bubble sort would need almost half a million comparisons. A faster method is to pick one mark, split the others into those smaller and those larger, and then do the same thing to each group. Each split makes the groups smaller, so the work finishes quickly. This is **quick sort**, one of the best-known sorting algorithms, and it is on the ZIMSEC Form 5 syllabus.

Quick sort is an example of **divide and conquer**: a problem is divided into smaller problems of the same kind, which are solved the same way. The algorithm calls itself on the smaller lists, which is called **recursion**; the next lessons on recursion explain how this works. The tables and outputs in this lesson were produced by code that mirrors the pseudocode. You should already know arrays and the bubble sort.

## Key definitions

:::definition{term="Quick sort"}
A sorting algorithm that chooses a pivot, partitions the list into items smaller than the pivot and items not smaller, places the pivot between them and then sorts each part in the same way.
:::

:::definition{term="Pivot"}
The item chosen to divide a list during quick sort. In this lesson the pivot is always the last item of the sub-list being sorted.
:::

:::definition{term="Partitioning"}
Rearranging the items of a (sub-)list so that all items smaller than the pivot come before it and the others come after it, with the pivot in its final sorted position.
:::

:::definition{term="Divide and conquer"}
A method of solving a problem by splitting it into smaller problems of the same kind, solving each and combining the results.
:::

## How quick sort works

1. If the sub-list has fewer than two items, it is already sorted: stop.
2. Choose the **pivot** (the last item).
3. **Partition**: move items smaller than the pivot to the front, then put the pivot straight after them. The pivot is now in its final position.
4. Quick sort the sub-list to the left of the pivot, then the sub-list to the right.

The partition used here keeps a `Boundary` marker. Items smaller than the pivot are swapped to the boundary, and the boundary moves along. At the end the pivot is swapped into the boundary position.

```
DECLARE Data : ARRAY[1:8] OF INTEGER

FUNCTION Partition(Low : INTEGER, High : INTEGER) RETURNS INTEGER
    DECLARE Pivot, Boundary, Index, Temp : INTEGER
    Pivot ← Data[High]
    Boundary ← Low
    FOR Index ← Low TO High - 1
        IF Data[Index] < Pivot THEN
            Temp ← Data[Index]
            Data[Index] ← Data[Boundary]
            Data[Boundary] ← Temp
            Boundary ← Boundary + 1
        ENDIF
    NEXT Index
    Temp ← Data[Boundary]
    Data[Boundary] ← Data[High]
    Data[High] ← Temp
    RETURN Boundary
ENDFUNCTION

PROCEDURE QuickSort(Low : INTEGER, High : INTEGER)
    DECLARE P : INTEGER
    IF Low < High THEN
        P ← Partition(Low, High)
        CALL QuickSort(Low, P - 1)
        CALL QuickSort(P + 1, High)
    ENDIF
ENDPROCEDURE

CALL QuickSort(1, 8)
```

The same algorithm in Python (which counts from 0), checked by running it, sorts the list 45, 12, 38, 7, 29, 51, 20, 33:

```python
data = [45, 12, 38, 7, 29, 51, 20, 33]

def partition(low, high):
    pivot = data[high]
    boundary = low
    for index in range(low, high):
        if data[index] < pivot:
            data[index], data[boundary] = data[boundary], data[index]
            boundary = boundary + 1
    data[boundary], data[high] = data[high], data[boundary]
    return boundary

def quick_sort(low, high):
    if low < high:
        p = partition(low, high)
        quick_sort(low, p - 1)
        quick_sort(p + 1, high)

quick_sort(0, len(data) - 1)
print(data)
```

```
[7, 12, 20, 29, 33, 38, 45, 51]
```

## Tracing a quick sort

:::worked-solution{title="Quick sort of eight marks"}
The array is 45, 12, 38, 7, 29, 51, 20, 33. Each row of the table is one partition, in the order they happen (the left part is always sorted before the right part). A sub-list of one item, or no items, needs no partition.

| Step | Sub-list before | Pivot | Sub-list after partition | Pivot position in the sub-list |
|:-:|:-:|:-:|:-:|:-:|
| 1 | 45, 12, 38, 7, 29, 51, 20, 33 | 33 | 12, 7, 29, 20, 33, 51, 45, 38 | 5 |
| 2 | 12, 7, 29, 20 | 20 | 12, 7, 20, 29 | 3 |
| 3 | 12, 7 | 7 | 7, 12 | 1 |
| 4 | 51, 45, 38 | 38 | 38, 45, 51 | 1 |
| 5 | 45, 51 | 51 | 45, 51 | 2 |

**Step 1.** The pivot is the last item, 33. The items smaller than 33 are moved to the front, giving 12, 7, 29, 20, 33, 51, 45, 38, and the pivot ends in position 5 of the sub-list. It is now in its final place. Items to its left (12, 7, 29, 20) are all smaller; items to its right (51, 45, 38) are all larger.

**Steps 2 and 3** sort the left part: the pivot 20 splits 12, 7, 29 into a smaller part and a larger part, and the pivot 7 puts 7 before 12.

**Steps 4 and 5** sort the right part, 51, 45, 38: the pivot 38 is the smallest, so everything else is to its right, and then the pivot 51 is the largest of 45, 51.

There are 5 partitions and **14 comparisons** of an item with a pivot in total. The final array is 7, 12, 20, 29, 33, 38, 45, 51.
:::

## Best and worst cases

Quick sort is fastest when each pivot splits its sub-list into two parts of nearly equal size, because the sub-lists then shrink quickly. It is slowest when the pivot is always the smallest or largest item, because one part is empty and the other has only one item fewer. With the last item as pivot, this happens when the list is **already sorted** or in **reverse order**.

| Starting order | Array | Quick sort comparisons | Simple bubble sort comparisons |
|:-:|:-:|:-:|:-:|
| a mixed order | 45, 12, 38, 7, 29, 51, 20, 33 | 14 | 28 |
| already sorted | 7, 12, 20, 29, 33, 38, 45, 51 | 28 | 28 |
| reverse order | 51, 45, 38, 33, 29, 20, 12, 7 | 28 | 28 |

For the mixed order, quick sort needs 14 comparisons, half the 28 of the simple bubble sort. For sorted or reverse-ordered data it makes 28, the same as the bubble sort's worst case, because the pivot never splits the list evenly. A better choice of pivot (the middle item, or the median of three) avoids this: in practice quick sort is then much faster than bubble sort for long lists of random data. Note that an *improved* bubble sort finishes sorted data in a single pass of 7 comparisons, so quick sort with a fixed last-item pivot is not the best choice for nearly sorted data.

| Case | What happens | Work for n items |
|:-:|:-:|:-:|
| Best / average | Pivot splits the list into two parts of similar size | roughly n × log₂ n comparisons |
| Worst | Pivot is always the smallest or largest item | roughly n² ÷ 2 comparisons |

## Comparing quick sort with bubble sort

- Quick sort is much faster on long lists of random data; bubble sort is simpler to write and needs no extra procedure calls.
- Quick sort is recursive, so each call needs memory on the stack; bubble sort sorts in place with a fixed amount of extra storage.
- A bubble sort with a swap flag is faster than quick sort (with a fixed pivot) on data that is already sorted.

:::keyfact{title="ZIMSEC and Cambridge"}
Quick sort is named in the ZIMSEC syllabus (Form 5, algorithm design: bubble sort, quick sort). Cambridge 9618 does not require quick sort (it requires bubble and insertion sort), so this lesson is ZIMSEC content; students of both boards can read it as an example of recursion.
:::

## Common mistakes

:::mistake{title="Forgetting that the pivot is already in place"}
After a partition, the pivot is in its final position. It is not included in either sub-list that is sorted next.
:::

:::mistake{title="Sorting the right part first or skipping a sub-list"}
Follow the order in the trace: the left sub-list is sorted completely before the right one. Sub-lists with two or more items still need a partition.
:::

:::mistake{title="Saying quick sort is always fast"}
Its speed depends on the pivot. With the last item as pivot, sorted data is the worst case.
:::

:::mistake{title="Moving items equal to or larger than the pivot to the front"}
Only items *smaller* than the pivot go in front of it; the others stay behind it.
:::

## Exam tips

:::exam-tip
ZIMSEC Paper 1 asks you to **show** the working of a quick sort on a short list: write the sub-list, the pivot and the result of each partition, in order. **Explain** the idea of divide and conquer, and **state** which data gives the worst case.
:::

:::exam-tip
In Paper 2 the algorithm may be given as pseudocode or Python to **complete** or **trace**. Check the parameters `Low` and `High` of each call and remember that the recursive calls use `P - 1` and `P + 1`, which leave out the pivot.
:::

## Summary

:::summary
- Quick sort uses divide and conquer: choose a pivot, partition the list around it, then sort the left and right sub-lists in the same way.
- After a partition the pivot is in its final position.
- A sub-list of one item, or none, needs no sorting; this is the stopping condition of the recursion.
- The best and average cases take about n × log₂ n comparisons; the worst case (pivot always the smallest or largest) takes about n² ÷ 2.
- With the last item as pivot, sorted and reverse-ordered data are worst cases; quick sort is much faster than bubble sort on long random lists.
:::
