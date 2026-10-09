---
{
  "key": "algorithms.test-data",
  "title": "Test data and test plans",
  "summary": "Why programs are tested; the four types of test data (normal, abnormal, extreme and boundary) and how to choose values of each type for a given rule; and how to write a test plan with expected results.",
  "concepts": ["comp.algorithms.test-data"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

A bus company in Mutare launches a new booking program. On the first morning a customer books 0 seats and is charged nothing, another books 11 seats on a bus with 10 left, and a clerk types "two" instead of 2 and the program crashes. Each of these problems could have been found before launch with well-chosen **test data**.

Testing is the final stage of the program development life cycle. It is not enough to try a few ordinary values: good testers deliberately choose values that are likely to break the program, especially values at the edges of what is allowed. Cambridge asks you to suggest test data of each type for a given rule and to say whether each value should be accepted. ZIMSEC asks you to explain the testing stage and to produce a **test plan**.

## Key definitions

:::definition{term="Test data"}
Data chosen to run a program with, in order to check that it works as intended and to find any errors.
:::

:::definition{term="Normal data"}
Sensible, valid data that the program should accept and process correctly.
:::

:::definition{term="Abnormal data"}
Data that should be rejected: values outside the allowed limits or of the wrong type. Also called erroneous data.
:::

:::definition{term="Extreme data"}
The largest and smallest values that are still acceptable.
:::

:::definition{term="Boundary data"}
The values on each side of a limit: the largest or smallest acceptable value together with the matching smallest or largest value that should be rejected.
:::

:::definition{term="Test plan"}
A table listing each test to be carried out, with its purpose, the test data, the type of data and the expected result, to which the actual result is added when the test is run.
:::

## The four types of test data

Take the rule "the number of tickets bought must be a whole number from 1 to 10".

| Test data | Type | Expected result |
|:-:|:-:|:-:|
| 4 | Normal | Accepted |
| 7 | Normal | Accepted |
| 15 | Abnormal | Rejected |
| -3 | Abnormal | Rejected |
| "four" | Abnormal | Rejected |
| 1 | Extreme | Accepted |
| 10 | Extreme | Accepted |
| 0 and 1 | Boundary | 0 rejected, 1 accepted |
| 10 and 11 | Boundary | 10 accepted, 11 rejected |

- **Normal** data tests that the program does its ordinary job.
- **Abnormal** data tests that invalid input is rejected with a helpful message and does not crash the program or corrupt the results. Try values too high, too low and of the wrong type.
- **Extreme** data tests that the limits themselves are accepted. A program that rejects exactly 10 tickets has a bug.
- **Boundary** data tests both sides of each limit, so it is given as a **pair**: the last accepted value and the first rejected value.

:::keyfact{title="Extreme and boundary"}
Extreme data is only the accepted value at each end (1 and 10). Boundary data adds the rejected value just outside (0 and 1; 10 and 11). The "just outside" value depends on the data: for whole numbers it is one more or one less; for prices to two decimal places, the value next to 10.00 is 10.01.
:::

## Why boundary testing matters

Most errors in validation are **off-by-one** errors in the conditions: writing `<` instead of `<=`, or `>` instead of `>=`. These errors only show up at the limits. For example, a check written as

```
IF Tickets > 1 AND Tickets < 10
```

accepts 4 and 7 (normal data), and rejects 15 and -3 (abnormal data), so it seems to work. Only the extreme values 1 and 10 reveal that it wrongly rejects valid input. The correct condition is `Tickets >= 1 AND Tickets <= 10`.

## Writing a test plan

A test plan sets out each test before it is run, so that the expected result is decided in advance and cannot be "adjusted" to match what happened. Each row has:

- a test number;
- the purpose of the test (what is being checked);
- the test data;
- the type of test data;
- the expected result;
- the actual result (filled in when the test is run), and whether the test was passed.

:::worked-solution[A test plan for a password length check]
A website in Gweru requires passwords of 6 to 12 characters. Write a test plan for the length check.

| Test | Purpose | Test data | Length | Type | Expected result |
|:-:|:-:|:-:|:-:|:-:|:-:|
| 1 | Valid length | `Mbare2024` | 9 | Normal | Accepted |
| 2 | Too short | `cat` | 3 | Abnormal | Rejected, error message |
| 3 | Nothing entered | (empty) | 0 | Abnormal | Rejected, error message |
| 4 | Shortest valid | `Kwekwe` | 6 | Extreme | Accepted |
| 5 | Longest valid | `Chimanimani1` | 12 | Extreme | Accepted |
| 6 | One below the shortest | `Gokwe` | 5 | Boundary | Rejected, error message |
| 7 | One above the longest | `Chimanimani12` | 13 | Boundary | Rejected, error message |

1. For a length check, the "value" being tested is the number of characters, so the plan records the length of each string.
2. Tests 4 and 6 form the lower boundary pair (6 accepted, 5 rejected); tests 5 and 7 form the upper pair (12 accepted, 13 rejected).
3. Test 3 checks that an empty entry is handled, which also tests the program's presence check.
4. When the tests are run, an "Actual result" column is added. Any row where the actual result differs from the expected result shows an error to fix.
:::

:::example{title="Choosing data for a real-number range"}
A clinic's program accepts body temperatures from 35.0 °C to 42.0 °C, entered to one decimal place. Suitable test data:

- Normal: 36.8, 38.5.
- Abnormal: 50.0, 20.4, "hot".
- Extreme: 35.0 and 42.0.
- Boundary: 34.9 and 35.0; 42.0 and 42.1.

Because readings have one decimal place, the first rejected values are 34.9 and 42.1, not 34 and 43.
:::

## Common mistakes

:::mistake{title="Giving only one value for boundary data"}
Boundary data is a pair: the accepted value at the limit and the rejected value just outside it. "10" alone is extreme data; "10 and 11" is boundary data.
:::

:::mistake{title="Forgetting wrong-type data"}
Abnormal data is not only numbers out of range. A letter where a number is expected, or a blank entry, should also be tested.
:::

:::mistake{title="Vague expected results"}
"It works" is not an expected result. Say exactly what should happen: "accepted and the cost is displayed" or "rejected with the message Quantity must be 1 to 10".
:::

## Exam tips

:::exam-tip
When asked for test data, read the rule carefully: is each limit included ("from 1 to 10", "at least 18") or excluded ("more than 0", "under 100")? The extreme values are the last ones **accepted**.
:::

:::exam-tip
Give a reason with each piece of test data when the question asks for one: "15, abnormal, because it is above the maximum of 10 and should be rejected".
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge 0478 limits test data to normal, abnormal, extreme and boundary, with boundary data defined as the pair either side of a limit. ZIMSEC treats testing in Form 3 systems analysis, where you describe the development and testing stage and write a testing plan; the same four types of data are used in the plan.
:::

## Summary

:::summary
- Testing checks that a program works and finds errors before it is used.
- Normal: valid, ordinary data, accepted. Abnormal: out of range or wrong type, rejected.
- Extreme: the largest and smallest acceptable values, accepted.
- Boundary: pairs either side of each limit (last accepted, first rejected); they catch off-by-one errors.
- A test plan lists test number, purpose, test data, type and expected result; the actual result is compared with it.
:::
