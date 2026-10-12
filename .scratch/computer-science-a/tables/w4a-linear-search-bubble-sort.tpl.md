---
{
  "key": "algo.linear-search-bubble-sort",
  "title": "Linear search and bubble sort",
  "summary": "Writing and tracing a linear search of a one-dimensional array with a found flag, and a bubble sort with a swap using a temporary variable, passes, counted comparisons and swaps, the improved version, and the effect of the initial order on performance.",
  "concepts": ["acs.algo.linear-search-bubble-sort"],
  "estimatedMinutes": 60,
  "level": "core"
}
---
## Introduction

A teacher in Chitungwiza has the marks of six pupils in an array and wants to know whether a particular mark appears, and later to list the marks in order. These are two of the most common jobs in programming: **searching** and **sorting**. Phone contact lists, school registers, bank statements and exam results all depend on them.

This lesson covers the simplest method of each. A **linear search** checks the items one at a time. A **bubble sort** repeatedly compares neighbouring items and swaps them if they are in the wrong order. Both are written in pseudocode and traced. The tables were produced by code that mirrors the pseudocode. You should already know arrays and the three constructs.

## Key definitions

:::definition{term="Linear search"}
A search that examines the items of a list one after another, from the first, until the item is found or the end of the list is reached.
:::

:::definition{term="Bubble sort"}
A sorting algorithm that makes repeated passes through a list, comparing each pair of neighbouring items and swapping them if they are in the wrong order, until the list is sorted.
:::

:::definition{term="Pass"}
One complete run through the items of a list (or through the part of the list still being compared) in a sorting algorithm.
:::

:::definition{term="Comparison"}
One test of whether two values are equal, or which is larger. The number of comparisons is a measure of the work done by a search or sort.
:::

## Linear search

The array used in the examples holds six marks, with `Data[1]` the first:

{{dataTable}}

The algorithm needs a **found flag** (a Boolean) and an index. It stops as soon as the item is found (an **early exit**), so it does not examine the rest of the list. If the loop ends without the flag becoming `TRUE`, the item is not in the list, and that **not found** case must be handled.

{{lsPseudo}}

The same algorithm in Python, which counts from 0, so the position output is `index + 1`:

{{lsPy}}

Run with the target 41, the real output is:

{{lsOut41}}

Run with the target 50, which is not in the array, the real output is:

{{lsOut50}}

:::worked-solution{title="Counting comparisons in a linear search"}
Each time round the loop one comparison `Data[Index] = Target` is made. The number of comparisons is the position of the item if it is found, or the number of items if it is not.

{{searchTable}}

For the target 41, the comparisons are with 34, 12, 27, 9 and 41, which is 5. For the target 50, all six items are compared before the loop ends and "Not found" is output.
:::

A linear search works on data in any order. Its **best case** is that the item is the first one (one comparison). Its **worst case** is that the item is last or missing (as many comparisons as items). On average, when the item is present, about half of the items are examined, so the work grows in proportion to the number of items.

## Bubble sort

In one pass the algorithm compares `Data[1]` with `Data[2]`, then `Data[2]` with `Data[3]` and so on. If the left one is larger, the two are swapped, which needs a **temporary variable** (otherwise one value is overwritten before it is copied). After each pass the largest unsorted value has "bubbled" to the end, so the next pass can stop one place earlier. The **improved** version uses a flag, `Swapped`, and stops after a pass in which no swap is made, because the list is then sorted.

{{bsPseudo}}

:::worked-solution{title="Bubble sort of six marks"}
The array starts as 34, 12, 27, 9, 41, 18. The table shows the whole array after each pass, with the comparisons and swaps in that pass.

{{passTable}}

In pass 1 the five comparisons are 34 and 12 (swap), 34 and 27 (swap), 34 and 9 (swap), 34 and 41 (no swap) and 41 and 18 (swap), so 41 reaches the end. Pass 2 needs only four comparisons because 41 is already in place, pass 3 needs three, and pass 4 makes two comparisons with no swap, so the improved version stops. Altogether there are **{{nComp}} comparisons** and **{{nSwaps}} swaps** in **{{nPasses}} passes**.

The Python version, checked by running it, prints the sorted list and the number of passes:

{{bsPy}}

{{bsOut}}
:::

Without the `Swapped` flag, the algorithm always makes the full set of passes: for six items 5 + 4 + 3 + 2 + 1 = 15 comparisons, whatever the starting order.

## Effect of the initial order

The speed of the improved bubble sort depends strongly on how sorted the data already is. The table compares three starting orders of the same six values:

{{orderTable}}

For data already in order, one pass of five comparisons and no swaps is enough: the **best case**. For data in reverse order, every comparison needs a swap: the **worst case**, with 15 comparisons and 15 swaps for six items. For random data (the **average case**) the cost is between the two. In general, the number of comparisons in the worst case is about n × (n − 1) ÷ 2 for n items, which grows with the *square* of n, so doubling the number of items roughly quadruples the work.

:::keyfact{title="Searching or sorting first?"}
A linear search needs no sorting, so it suits small or unsorted lists. Sorting costs time, but once a list is sorted a faster method (the binary search, in a later lesson) can be used on it many times.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards expect you to write and trace a linear search and a bubble sort, including the improved bubble sort (ZIMSEC Form 5; Cambridge AS Level). You should be able to count the passes, comparisons and swaps for given data and describe the best, average and worst cases in words. Cambridge Paper 2 may ask for the algorithm in pseudocode.
:::

## Common mistakes

:::mistake{title="Swapping without a temporary variable"}
Writing `Data[Index] ← Data[Index + 1]` and then `Data[Index + 1] ← Data[Index]` loses the original value, and both places end up equal. Copy one value into `Temp` first.
:::

:::mistake{title="Comparing past the end of the array"}
The bubble sort loop must stop at `N - Pass` so that `Data[Index + 1]` always exists. Using `N` makes the last comparison go beyond the array.
:::

:::mistake{title="Forgetting the not found case"}
A search that outputs a position even when the item is absent is wrong. Test the found flag after the loop.
:::

:::mistake{title="Stopping the sort after a pass with a swap"}
The improved sort stops only when a whole pass makes *no* swap. A single pass with no swap is the signal, not the first swap.
:::

## Exam tips

:::exam-tip
Cambridge Papers 1 and 2 and ZIMSEC Paper 1 ask you to **write** a linear search or bubble sort in pseudocode, **complete** a trace table, **state** the number of passes or swaps, and **explain** the effect of the initial order. In a trace of a bubble sort, show the whole array after every pass and count the comparisons in each.
:::

:::exam-tip
"**Describe** how the improved bubble sort is more efficient" needs the idea of a flag that records whether a swap occurred, so that the algorithm stops as soon as a pass has no swaps (and the shorter passes that skip items already in place).
:::

## Summary

:::summary
- A linear search checks each item in turn using a found flag; it ends early when the item is found and must handle the not found case.
- The best case is one comparison and the worst case is as many comparisons as items.
- A bubble sort compares neighbouring items and swaps them (using a temporary variable) if they are in the wrong order; each pass puts the largest unsorted item in place.
- The improved version stops when a pass makes no swaps.
- Sorted data needs one pass; reverse-ordered data is the worst case with about n(n − 1)/2 comparisons.
:::
