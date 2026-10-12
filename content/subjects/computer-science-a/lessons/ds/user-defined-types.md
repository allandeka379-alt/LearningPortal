---
{
  "key": "ds.user-defined-types",
  "title": "User-defined data types",
  "summary": "Why user-defined types are needed; enumerated and pointer types (non-composite) and set, record and class (composite); defining and using them in 9618-style pseudocode with TYPE and ENDTYPE and in Python; and choosing a type for a problem.",
  "concepts": [
    "acs.ds.user-defined-types"
  ],
  "estimatedMinutes": 55,
  "level": "core"
}
---
## Introduction

The built-in types INTEGER, REAL, CHAR, STRING and BOOLEAN are not always a good fit. A bus timetable for Mutare holds the day of the week. Storing it as an integer from 0 to 4 works, but then the program can hold the value 9, and anyone reading `Day ← 2` has to remember what 2 means. A learner has a name, a form and the fees paid, which are three different types that belong together. A **user-defined data type** lets the programmer build a new type for exactly the data of the problem.

This lesson covers why user-defined types are needed, the non-composite types (enumerated and pointer), the composite types (record, set and class), defining and using them in 9618-style pseudocode with `TYPE ... ENDTYPE` and in Python, and choosing a type for a given problem. You should know the built-in data types and arrays.

## Key definitions

:::definition{term="User-defined data type"}
A data type that the programmer defines, rather than one built into the language, to represent the data of a particular problem more accurately.
:::

:::definition{term="Non-composite data type"}
A user-defined type that holds a single value and does not refer to another data type, for example an enumerated type. A pointer, which holds an address, is also treated as non-composite.
:::

:::definition{term="Composite data type"}
A user-defined type made up of several values, which may themselves have types, such as a record, a set or a class.
:::

:::definition{term="Enumerated type"}
A type whose possible values are a list of named constants defined by the programmer. The names have a fixed order, so they can be compared.
:::

:::definition{term="Pointer"}
A type whose value is the memory address of another value. The value at that address is reached by dereferencing the pointer.
:::

:::definition{term="Record"}
A composite type that groups a fixed number of related data items, called fields, which may be of different types, under a single name.
:::

## The kinds of user-defined type

| Kind of type | Examples | What it holds |
|:-:|:-:|:-:|
| Non-composite: enumerated | days of the week, compass directions | one value from a fixed list of names that you define |
| Non-composite: pointer | a pointer to an integer | the memory address of another value |
| Composite: record | a learner with a name, a form and fees paid | a fixed set of fields, which may have different types, under one name |
| Composite: set | the vowels, the subjects a learner takes | an unordered collection with no duplicates |
| Composite: class (object) | a bank account with data and methods | data and the methods that act on it |

User-defined types make programs safer, because an enumerated variable can never hold a value outside its list, and clearer, because the names say what the data means. They also keep related data together, so a whole learner can be passed to a procedure as one item.

## Enumerated types

An enumerated type lists its values in a bracket. A variable of the type can only hold one of them, and the position in the list gives the order.

```
TYPE TDay = (Mon, Tue, Wed, Thu, Fri)
DECLARE Today : TDay
Today ← Wed
```

In Python the `Enum` class does the same job:

:::worked-solution{title="Using an enumerated type"}
```python
from enum import Enum

class Day(Enum):
    MON = 0
    TUE = 1
    WED = 2
    THU = 3
    FRI = 4

today = Day.WED
print(today.name, today.value)
print(Day.FRI.value - today.value)
print(today.value < Day.FRI.value)
for d in Day:
    if d.value > today.value:
        print(d.name)
```

Output:

```
WED 2
2
True
THU
FRI
```

`WED` has the number 2 in the list. Friday is 2 places after Wednesday (4 - 2), and Wednesday comes before Friday, so the comparison is `True`. The loop outputs the days after Wednesday, in order: THU and FRI. The names make the code readable, and a value such as `Day(9)` is refused, so an impossible day cannot be stored.
:::

## Pointers

A pointer holds an address. In the 9618 pseudocode a pointer type is declared with a caret, the address of a variable is obtained with `^`, and the value at the address is reached with the pointer followed by `^`:

```
TYPE TIntPointer = ^INTEGER
DECLARE Age : INTEGER
DECLARE AgePointer : TIntPointer
Age ← 15
AgePointer ← ^Age
AgePointer^ ← 16
```

After these statements `AgePointer` holds the address of `Age`, and the last statement changes `Age` to 16 through the pointer. Python hides addresses, but a pointer can be modelled with a dictionary that stands for memory, whose keys are addresses:

:::worked-solution{title="Modelling a pointer"}
```python
memory = {3000: 15, 3004: 20}
age_address = 3000
pointer = age_address
print(pointer)
print(memory[pointer])
memory[pointer] = 16
print(memory[age_address])
pointer = 3004
print(memory[pointer])
```

Output:

```
3000
15
16
20
```

The pointer holds the address 3000, not the value 15. Reading `memory[pointer]` follows the pointer to the value 15. Changing the value through the pointer changes it for `age_address` too (16), because they refer to the same location. Moving the pointer to 3004 makes it refer to a different value, 20.
:::

## Records

A record groups fields of different types under one name. In pseudocode a record type is defined with `TYPE` and `ENDTYPE`, a variable is declared of that type, and a field is reached with a full stop:

```
TYPE TLearner
    DECLARE Name : STRING
    DECLARE Form : INTEGER
    DECLARE FeesPaid : REAL
ENDTYPE

DECLARE Pupils : ARRAY[1:3] OF TLearner
Pupils[1].Name ← "Tendai"
Pupils[1].FeesPaid ← 120.0
```

:::worked-solution{title="An array of records"}
```python
from dataclasses import dataclass

@dataclass
class Learner:
    name: str
    form: int
    fees_paid: float

pupils = [Learner("Tendai", 5, 120.0), Learner("Rudo", 6, 80.5), Learner("Farai", 5, 0.0)]
pupils[2].fees_paid = 45.0
total = 0
for p in pupils:
    total = total + p.fees_paid
print(pupils[1].name, pupils[1].form)
print(total)
```

Output:

```
Rudo 6
245.5
```

A list of records holds three learners, with each learner's data kept together. The fees for the third learner were changed with `pupils[2].fees_paid = 45.0`, and the total is 120.0 + 80.5 + 45.0 = 245.5. A record is a better choice than three separate arrays for name, form and fees, because the related values cannot get out of step.
:::

## Sets

A set is an unordered collection with no duplicate values. The operations of sets are membership, union, intersection and difference. In the 9618 pseudocode a set type is declared with `SET OF` and its values are given with `DEFINE`; Python has the type `set`.

:::worked-solution{title="Set operations"}
```python
vowels = {"a", "e", "i", "o", "u"}
word = "Zimbabwe"
letters = set(word.lower())
print(sorted(letters & vowels))
print(sorted(letters - vowels))
print("a" in vowels, "z" in vowels)
print(len(letters))
```

Output:

```
['a', 'e', 'i']
['b', 'm', 'w', 'z']
True False
7
```

The word "Zimbabwe" has the distinct letters z, i, m, b, a, w and e: 7 values, since repeated letters are stored once. The letters in common with the vowels are a, e and i; the others are b, m, w and z. The membership test shows that `"a"` is in the set of vowels and `"z"` is not.
:::

## Choosing a type for a problem

| Problem | Suitable type | Reason |
|:-:|:-:|:-:|
| Record the day of the week on which a bus runs | Enumerated | only seven allowed values, with a clear order |
| Store a learner's name, form and fees together | Record | different data types belong to one item |
| Store the set of subjects a pupil has passed | Set | no order and no duplicates |
| Pass the location of a large value to a routine without copying it | Pointer | stores an address, not the value |

A **class** is also a composite type: it joins data and the methods that act on it, and is the basis of object-oriented programming. To choose a type, ask what values the data can take (a fixed list, a number, an address), whether it consists of several parts of different types, and whether order and duplicates matter.

:::keyfact{title="Cambridge only"}
User-defined types are a Cambridge A Level topic (enumerated and pointer as non-composite, set, record and class as composite). They are not examined as a separate topic in ZIMSEC, which uses records and arrays under data structures. The exact form of the set and pointer statements follows the 9618 pseudocode guide; if the paper gives the syntax, use that.
:::

## Common mistakes

:::mistake{title="Treating a pointer as the value"}
A pointer holds the address, not the data. To reach the data, dereference the pointer.
:::

:::mistake{title="Storing duplicates in a set"}
A set has no duplicates and no order, so `{1, 2, 2}` is the same set as `{1, 2}` and a set has no first element.
:::

:::mistake{title="Using an array of different types"}
An array holds items of one type. For fields of different types use a record.
:::

:::mistake{title="Giving an enumerated value a number in pseudocode"}
The values of an enumerated type are names, such as `Wed`, not strings or numbers: do not write quotation marks or assign `Today ← 2`.
:::

## Exam tips

:::exam-tip
Cambridge Paper 3 asks you to **write** the `TYPE` definition of an enumerated type, a pointer or a record for a described problem, to **declare** variables of that type, to **assign** values (field by field for a record), to **explain** why a user-defined type is better than a built-in type, and to **choose** a type for a given problem. Use the exact names and types in the question and end each record definition with `ENDTYPE`.
:::

:::exam-tip
To explain the need for a user-defined type, say what it improves for the program in the question: the allowed values are limited, related data is kept together, or the code is easier to read.
:::

## Summary

:::summary
- User-defined types represent the data of a problem more accurately than the built-in types.
- Non-composite types: enumerated (a list of named values, in order) and pointer (the address of another value).
- Composite types: record (fields of different types), set (unordered, no duplicates) and class (data and methods).
- Pseudocode uses `TYPE ... ENDTYPE` for records, `TYPE T = (a, b, c)` for an enumerated type and `^` for pointers; Python uses `Enum`, `dataclass` or a class, and `set`.
- Choose a type from the values the data can take, whether it has several parts, and whether order and duplicates matter.
:::
