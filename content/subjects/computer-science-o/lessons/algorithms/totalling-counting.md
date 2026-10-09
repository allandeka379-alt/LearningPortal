---
{
  "key": "algorithms.totalling-counting",
  "title": "Totalling, counting, maximum, minimum and average",
  "summary": "The standard methods for keeping a running total, counting, finding the largest and smallest values and calculating an average, in loops over input values and arrays, with the correct initial values and the common mistakes to avoid.",
  "concepts": ["comp.algorithms.totalling-counting"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

At the end of each day, the manager of a hardware shop in Bulawayo wants to know the day's total sales, how many sales were over a certain amount, the biggest and smallest sale, and the average sale. Every one of those answers comes from the same few patterns of code, repeated in thousands of programs: **totalling**, **counting**, finding the **maximum** and **minimum**, and calculating an **average**.

Cambridge lists these as standard methods of solution, and both boards expect you to use them in the algorithms you write. Nearly every 15-mark Cambridge scenario question needs at least three of them. Learn the patterns well enough to write them without thinking, and pay close attention to **where** each statement goes: before the loop, inside it, or after it.

## Key definitions

:::definition{term="Totalling"}
Keeping a running total by adding each value to a variable that was set to zero before the loop: `Total ← Total + Value`.
:::

:::definition{term="Counting"}
Adding one to a variable, which was set to zero before the loop, each time an event happens: `Count ← Count + 1`.
:::

:::definition{term="Average (mean)"}
The total of the values divided by the number of values, calculated once, after the loop has finished.
:::

## Totalling and counting

Both patterns have three parts:

| Part | Totalling | Counting |
|:--|:--|:--|
| Before the loop | `Total ← 0` | `Count ← 0` |
| Inside the loop | `Total ← Total + Value` | `Count ← Count + 1` |
| After the loop | Output or use `Total` | Output or use `Count` |

Counting is often **conditional**: the count only increases when a value meets a condition, so the statement goes inside an `IF`.

```
IF Mark >= 50
    THEN
        PassCount ← PassCount + 1
ENDIF
```

## Average

The average is the total divided by the number of values. Two rules:

- calculate it **after** the loop, once the total is complete;
- divide by the **count** of values actually used, which is not always the same as the number of times the loop ran. If the count could be zero, check it first, because dividing by zero causes a run-time error.

```
IF Count > 0
    THEN
        Average ← Total / Count
        OUTPUT "Average: ", ROUND(Average, 2)
    ELSE
        OUTPUT "No values entered"
ENDIF
```

:::worked-solution[Total, conditional count and average over an array]
The array `Sales` holds six days of sales (in dollars) for a shop:

| Index | 1 | 2 | 3 | 4 | 5 | 6 |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| Sales | 120 | 85 | 60 | 150 | 95 | 114 |

```
Total ← 0
Count ← 0
FOR Day ← 1 TO 6
    Total ← Total + Sales[Day]
    IF Sales[Day] > 100
        THEN
            Count ← Count + 1
    ENDIF
NEXT Day
Average ← Total / 6
OUTPUT "Total ", Total, " Average ", Average, " Busy days ", Count
```

| Day | Total | Count | Average | OUTPUT |
|:-:|:-:|:-:|:-:|:-:|
|  | 0 | 0 |  |  |
| 1 | 120 | 1 |  |  |
| 2 | 205 |  |  |  |
| 3 | 265 |  |  |  |
| 4 | 415 | 2 |  |  |
| 5 | 510 |  |  |  |
| 6 | 624 | 3 |  |  |
|  |  |  | 104 |  |
|  |  |  |  | Total 624 Average 104 Busy days 3 |

1. `Total` and `Count` start at 0, before the loop.
2. Every day's sales are added to `Total`, but `Count` only increases on days over 100 (days 1, 4 and 6).
3. The average is calculated once, after the loop: 624 ÷ 6 = 104.
:::

## Maximum and minimum

To find the largest value, keep a variable holding the largest value **so far** and compare every new value with it. There are two safe ways to give it a starting value:

1. **Use the first value**: set both `Highest` and `Lowest` to the first value, then compare the rest. This always works.
2. **Use a value outside the possible range**: for marks from 0 to 100, start `Highest` at -1 and `Lowest` at 101. Any real mark then replaces them. This only works if you know the range.

Starting `Lowest` at 0 is a classic error: if all the values are positive, nothing is ever less than 0, and the output is 0.

:::worked-solution[Tallest and shortest of five learners]
Tatenda inputs the heights of five learners in centimetres: 152, 147, 163, 158, 141.

```
OUTPUT "Enter height in cm"
INPUT Height
Tallest ← Height
Shortest ← Height
FOR Learner ← 2 TO 5
    OUTPUT "Enter height in cm"
    INPUT Height
    IF Height > Tallest
        THEN
            Tallest ← Height
    ENDIF
    IF Height < Shortest
        THEN
            Shortest ← Height
    ENDIF
NEXT Learner
OUTPUT Tallest, " ", Shortest
```

| Learner | Height | Tallest | Shortest | OUTPUT |
|:-:|:-:|:-:|:-:|:-:|
|  | 152 |  |  |  |
|  |  | 152 | 152 |  |
| 2 | 147 |  | 147 |  |
| 3 | 163 | 163 |  |  |
| 4 | 158 |  |  |  |
| 5 | 141 |  | 141 |  |
|  |  |  |  | 163 141 |

(The prompts have been left out of this table to keep it short; in an exam, include them in the OUTPUT column.)

1. The first height sets both `Tallest` and `Shortest`, so the loop runs from learner 2.
2. Each new height is compared with both: 147 is a new shortest, 163 a new tallest, 158 neither, 141 a new shortest.
3. The two `IF` statements are separate, not `IF … ELSE`, because a value could in principle need checking against both.
:::

To find **where** the largest value is (for example, which learner is tallest), store the index as well: `Tallest ← Height` and `TallestLearner ← Learner` inside the same `IF`.

:::example{title="Several methods in one loop"}
A teacher in Mutare inputs 30 marks and wants the number of passes (50 or more), the highest mark and the class average.

```
Total ← 0
Passes ← 0
Highest ← -1
FOR Learner ← 1 TO 30
    REPEAT
        OUTPUT "Enter mark (0 to 100)"
        INPUT Mark
    UNTIL Mark >= 0 AND Mark <= 100
    Total ← Total + Mark
    IF Mark >= 50
        THEN
            Passes ← Passes + 1
    ENDIF
    IF Mark > Highest
        THEN
            Highest ← Mark
    ENDIF
NEXT Learner
OUTPUT "Passes: ", Passes, " Highest: ", Highest, " Average: ", ROUND(Total / 30, 1)
```

Every method has its starting value before the loop, its update inside the loop and its result used after the loop.
:::

## Common mistakes

:::mistake{title="Setting the total to zero inside the loop"}
If `Total ← 0` is inside the loop, the total is reset on every pass and ends up holding only the last value. Initialise before the loop.
:::

:::mistake{title="Calculating the average inside the loop"}
An average worked out inside the loop uses an unfinished total. Calculate it once, after the loop, and divide by the number of values actually included.
:::

:::mistake{title="Starting the minimum at zero"}
`Lowest ← 0` means no positive value is ever lower, so the minimum is wrongly output as 0. Start with the first value or with a value above the largest possible.
:::

## Exam tips

:::exam-tip
In a scenario answer, examiners award separate marks for initialising totals and counters, for updating them in the loop, and for using them after the loop. Make all three visible.
:::

:::exam-tip
Use meaningful names that show which total or count is which (`TotalSales`, `PassCount`, `HighestMark`), especially when one loop computes several.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge 0478 names totalling, counting, maximum, minimum and average as standard methods (topic 7.4). ZIMSEC uses the same methods when Form 4 learners design algorithms for a project. The patterns are identical for both boards.
:::

## Summary

:::summary
- Totalling: `Total ← 0` before the loop, `Total ← Total + Value` inside.
- Counting: `Count ← 0` before, `Count ← Count + 1` inside, often inside an `IF`.
- Average: total ÷ number of values, calculated once after the loop; guard against dividing by zero.
- Maximum and minimum: start with the first value (or a value outside the range); compare each new value and replace when larger or smaller.
- Store the index with the value to know where the maximum or minimum is.
:::
