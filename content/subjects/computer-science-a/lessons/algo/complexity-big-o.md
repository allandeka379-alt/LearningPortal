---
{
  "key": "algo.complexity-big-o",
  "title": "Comparing algorithms and Big O notation",
  "summary": "Criteria for comparing algorithms (time and memory), Big O notation for time and space complexity from O(1) to O(2^n), identifying the order of an algorithm from its loops, growth tables, and best, average and worst cases.",
  "concepts": ["acs.algo.complexity-big-o"],
  "estimatedMinutes": 55,
  "level": "core"
}
---
## Introduction

Two programmers in Bulawayo write programs to search a customer database. Both programs work, and on the ten test customers they are equally quick. When the real database arrives with a million customers, one answers in an instant and the other takes minutes. Testing on small data does not show which algorithm will cope. We need a way to describe how the *work* of an algorithm grows as the *amount of data* grows, whatever computer is used. That is **time complexity**, and the usual notation for it is **Big O**.

This lesson explains the criteria for comparing algorithms, the common orders from O(1) to O(2ⁿ), how to find the order of an algorithm by looking at its loops, and the difference between best, average and worst cases. The counts and tables were produced by code. You should already know loops and the search and sort algorithms from earlier lessons.

## Key definitions

:::definition{term="Time complexity"}
How the number of steps an algorithm takes grows as the size of the input, n, grows.
:::

:::definition{term="Space complexity"}
How the amount of memory an algorithm needs grows as the size of the input, n, grows.
:::

:::definition{term="Big O notation"}
A way of writing the order of growth of time or space as a function of n, keeping only the fastest-growing term and ignoring constant factors. Linear growth is written O(n).
:::

:::definition{term="Worst case"}
The input of a given size that makes an algorithm do the most work. The best case is the input that makes it do the least work, and the average case is the typical amount.
:::

## Criteria for comparing algorithms

Algorithms that solve the same problem can be compared by:

- **time**: the number of steps (not the seconds, which depend on the computer);
- **memory**: the storage needed in addition to the data (extra arrays, copies, the stack of recursive calls);
- and, in practice, how simple they are to write and maintain.

## The common orders

| Notation | Name | Example |
|:-:|:-:|:-:|
| O(1) | constant | reading `Data[5]`; pushing onto a stack |
| O(log n) | logarithmic | binary search |
| O(n) | linear | linear search; one loop over the data |
| O(n log n) | linearithmic | quick sort on average |
| O(n²) | polynomial (quadratic) | bubble sort; a loop inside a loop over the data |
| O(2ⁿ) | exponential | naive recursive Fibonacci; trying every subset |

The table of values below shows why the order matters more than the speed of the computer. The values are exact.

| n | log₂ n | n × log₂ n | n² | 2ⁿ |
|:-:|:-:|:-:|:-:|:-:|
| 4 | 2 | 8 | 16 | 16 |
| 8 | 3 | 24 | 64 | 256 |
| 16 | 4 | 64 | 256 | 65 536 |
| 32 | 5 | 160 | 1 024 | 4 294 967 296 |
| 64 | 6 | 384 | 4 096 | 18 446 744 073 709 551 616 |

For 64 items an O(n²) algorithm takes 4 096 steps, but an O(2ⁿ) algorithm takes more than eighteen million million million. Doubling n adds one step to O(log n), doubles O(n), roughly doubles O(n log n), quadruples O(n²) and squares O(2ⁿ).

## Working out the order from the code

Count how many times the basic statement runs for different values of n, or look at the loops:

- statements outside loops: O(1);
- one loop that runs n times: O(n);
- a loop inside a loop, both running about n times: O(n²);
- a loop that halves (or doubles) the remaining work each time: O(log n);
- a loop that runs n times with a halving loop inside: O(n log n).

When several parts are added, keep only the fastest-growing term and drop constants: 3n + 20 is O(n), and n² + n is O(n²).

:::worked-solution{title="Counting the steps of four fragments"}
Fragment 1:

```
FOR Index ← 1 TO N
    Total ← Total + Data[Index]
NEXT Index
```

Fragment 2:

```
FOR Row ← 1 TO N
    FOR Col ← 1 TO N
        Count ← Count + 1
    NEXT Col
NEXT Row
```

Fragment 3:

```
WHILE N > 1 DO
    N ← DIV(N, 2)
    Steps ← Steps + 1
ENDWHILE
```

Fragment 4:

```
FOR Row ← 1 TO N
    FOR Col ← 1 TO Row
        Count ← Count + 1
    NEXT Col
NEXT Row
```

The number of times the loop body runs, counted by running each fragment:

| n | Fragment 1 (one loop) | Fragment 2 (loop in loop) | Fragment 3 (halving) | Fragment 4 (inner limit is the outer variable) |
|:-:|:-:|:-:|:-:|:-:|
| 8 | 8 | 64 | 3 | 36 |
| 16 | 16 | 256 | 4 | 136 |
| 32 | 32 | 1 024 | 5 | 528 |
| 64 | 64 | 4 096 | 6 | 2 080 |

- Fragment 1 runs n times: **O(n)**.
- Fragment 2 runs n × n times: **O(n²)**.
- Fragment 3 halves n each time, so it runs log₂ n times: **O(log n)**.
- Fragment 4 runs 1 + 2 + … + n = n(n + 1) ÷ 2 times, which is 36 for n = 8 and 136 for n = 16. The n² ÷ 2 term dominates and the ½ is a constant, so it is **O(n²)**.
:::

## Constants matter only for small n

Big O describes growth, so a method with a larger constant can win for small inputs. Suppose algorithm A takes 50 × n steps (O(n)) and algorithm B takes n² steps (O(n²)):

| n | Algorithm A: 50 × n steps | Algorithm B: n² steps | Fewer steps |
|:-:|:-:|:-:|:-:|
| 10 | 500 | 100 | B |
| 50 | 2500 | 2500 | equal |
| 51 | 2550 | 2601 | A |
| 100 | 5000 | 10000 | A |

B is faster for n below 50, they tie at 50, and A is faster from n = 51 onwards, with the gap widening for ever. For large data the order of growth decides.

:::worked-solution{title="An exponential algorithm: counting recursive calls"}
The simple recursive Fibonacci function calls itself twice for each call, so the number of calls grows exponentially. The Python program counts the calls (the output was produced by running it):

```python
calls = 0

def fib(n):
    global calls
    calls = calls + 1
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)

for n in (5, 10, 20):
    calls = 0
    result = fib(n)
    print(n, result, calls)
```

The columns are n, the result and the number of calls:

```
5 5 15
10 55 177
20 6765 21891
```

Going from n = 10 to n = 20 multiplies the number of calls from 177 to 21 891, about 124 times, although n only doubled. This is the signature of O(2ⁿ) growth (strictly, about 1.6ⁿ for this function, which is still exponential).
:::

## Best, average and worst case

The same algorithm can take different amounts of work on different inputs of the same size, so complexity is quoted for the case of interest:

| Algorithm | Best case | Average case | Worst case |
|:-:|:-:|:-:|:-:|
| Linear search | O(1) | O(n) | O(n) |
| Binary search | O(1) | O(log n) | O(log n) |
| Bubble sort (with a swap flag) | O(n) | O(n²) | O(n²) |
| Insertion sort | O(n) | O(n²) | O(n²) |
| Quick sort (good pivot) | O(n log n) | O(n log n) | O(n²) |

Worst-case figures are the safe guide: they tell you the most work you may be asked to do. A linear search of a million items has best case O(1) (the item is first) but worst case O(n).

## Space complexity

Space is counted the same way. An algorithm that uses only a few variables is O(1) in space whatever n is. Copying a list of n items needs O(n). A recursive function that calls itself n deep keeps n frames on the stack, which is O(n) space, while a binary search written recursively needs only O(log n) frames.

:::keyfact{title="ZIMSEC and Cambridge"}
Big O notation and the comparison of algorithms are Cambridge A Level content (topic 19.2, Paper 3). They are not in the ZIMSEC syllabus, which compares algorithms informally by speed. The pseudocode here follows the 9618 style.
:::

## Common mistakes

:::mistake{title="Measuring time in seconds"}
Big O counts steps, not seconds. The same algorithm takes different seconds on different computers, but the same number of steps.
:::

:::mistake{title="Keeping constants and small terms"}
O(3n + 5) is written O(n), and O(n² + n) is O(n²). Only the fastest-growing term is kept.
:::

:::mistake{title="Calling every nested loop O(n²)"}
Nested loops multiply only if both loops grow with n. A loop that runs 3 times inside a loop that runs n times is O(n), and a halving loop inside an n loop is O(n log n).
:::

:::mistake{title="Mixing up best and worst case"}
O(1) for a linear search describes the best case. The worst case, and the usual answer, is O(n).
:::

## Exam tips

:::exam-tip
Cambridge Paper 3 asks you to **state** the Big O of a given algorithm or fragment of code, to **compare** two algorithms using it, and to **explain** why one is better for large inputs. Write the notation, then one sentence: "O(n²) because there is a loop inside a loop, each running n times".
:::

:::exam-tip
When asked to **compare** algorithms, state both the time and the memory, say which case you mean, and refer to growth ("doubling n quadruples the work") rather than to seconds.
:::

## Summary

:::summary
- Algorithms are compared by the time (steps) and memory they need as the input size n grows.
- Big O keeps the fastest-growing term and ignores constants: O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ) in increasing order of growth.
- The order is found by counting repetitions: one loop O(n), nested loops O(n²), halving O(log n).
- Constants matter for small n but the order decides for large n.
- The best, average and worst cases of the same algorithm can differ; the worst case is the safe guide.
:::
