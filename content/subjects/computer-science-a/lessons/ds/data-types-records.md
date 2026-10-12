---
{
  "key": "ds.data-types-records",
  "title": "Data types and records",
  "summary": "The built-in data types INTEGER, REAL, CHAR, STRING, BOOLEAN and DATE, choosing the right type for data, the purpose of a record, defining a record type in pseudocode, reading from and writing to a record, and an array of records.",
  "concepts": ["acs.ds.data-types-records"],
  "estimatedMinutes": 55,
  "level": "core"
}
---
## Introduction

A school office in Masvingo keeps information about every pupil: a student number, a name, a form, an average mark, and whether the pupil boards. These items are different kinds of data, but they all belong to one pupil. A program must store each item in a way that suits its kind (a name is text, an average is a number with a fractional part, boarding is yes or no) and must keep the items of one pupil together.

This lesson covers the **data types** that programming languages provide for single items and the **record**, a structure that groups items of different types under one identifier. The program output shown was produced by running the code. You should already know variables and arrays.

## Key definitions

:::definition{term="Data type"}
The kind of value that a variable can hold, which decides how the value is stored and which operations can be done with it. The built-in (primitive) types are INTEGER, REAL, CHAR, STRING, BOOLEAN and DATE.
:::

:::definition{term="Record"}
A data structure that holds a fixed number of items, called fields, which may have different data types, under one identifier. Each field has its own name.
:::

:::definition{term="Field"}
One named item of a record, such as `Name` or `Average`.
:::

:::definition{term="Composite data type"}
A data type made up of other data types, such as a record or an array (the primitive types are single values).
:::

## The built-in data types

| Data type | Holds | Example values |
|:-:|:-:|:-:|
| INTEGER | a whole number | `0`, `47`, `-12` |
| REAL | a number that may have a fractional part | `58.5`, `-0.25`, `3.0` |
| CHAR | a single character | `'A'`, `'7'`, `'?'` |
| STRING | zero or more characters (text) | `"Harare"`, `"0771234567"` |
| BOOLEAN | one of two values | `TRUE`, `FALSE` |
| DATE | a calendar date | `12/01/2026` |

Each type allows particular operations. Arithmetic and comparison work on INTEGER and REAL; `&` joins STRING values; `AND`, `OR` and `NOT` work on BOOLEAN values; and dates can be compared to find which is earlier. A CHAR is written between single quotation marks and a STRING between double quotation marks, so `'7'` is a character and `7` is an integer.

### Choosing the right type

The right type depends on what the data is and what will be done with it, not only on what it looks like:

| Data item | Suitable type | Reason |
|:-:|:-:|:-:|
| Number of pupils in a class | INTEGER | always a whole number |
| Mean mark of a class | REAL | can have a fractional part |
| Mobile telephone number | STRING | has a leading zero, and is never used in a calculation |
| Grade A to E | CHAR | one character |
| Whether a pupil boards | BOOLEAN | two possible values |
| Date a pupil joined | DATE | a calendar date that can be compared |

A telephone number looks like a number but is a STRING, because its leading zero would be lost as an integer and nobody adds telephone numbers together. A good rule: if you would do arithmetic with it, use a number type; if it is a label or an identifier, use a STRING. Using the right type also saves memory and lets the program reject wrong input (a letter typed into an INTEGER).

## Records

An array holds items of the *same* type. A record holds items of *different* types that belong together. A record type is first defined with `TYPE … ENDTYPE`, and then variables of that type are declared. A field is read or written by writing the variable name, a full stop and the field name.

```
TYPE TStudent
    DECLARE StudentID : STRING
    DECLARE Name : STRING
    DECLARE Form : INTEGER
    DECLARE Average : REAL
    DECLARE Boarder : BOOLEAN
ENDTYPE

DECLARE Pupil : TStudent
Pupil.StudentID ← "S104"
Pupil.Name ← "Chipo Mlambo"
Pupil.Form ← 5
Pupil.Average ← 63.5
Pupil.Boarder ← FALSE
OUTPUT Pupil.Name, " is in Form ", Pupil.Form
```

The last statement outputs `Chipo Mlambo is in Form 5`. Each record variable has its own copy of the fields, so changing `Pupil.Average` does not change the average of any other record.

:::worked-solution{title="Choosing the fields and types of a record"}
A clinic wants a record for each appointment. The fields and types are chosen from the kind of data in each:

| Field | Data type | Reason |
|:-:|:-:|:-:|
| PatientName | STRING | text |
| Phone | STRING | a leading zero must be kept and it is not used in sums |
| AppointmentDate | DATE | a calendar date |
| Fee | REAL | an amount of money with cents |
| Attended | BOOLEAN | yes or no |

The record type is therefore:

```
TYPE TAppointment
    DECLARE PatientName : STRING
    DECLARE Phone : STRING
    DECLARE AppointmentDate : DATE
    DECLARE Fee : REAL
    DECLARE Attended : BOOLEAN
ENDTYPE
```

The telephone number is a STRING so that a number such as 0771234567 keeps its leading zero, and the fee is REAL because it has cents.
:::

## An array of records

To store many pupils, declare an **array of records**: every element of the array is a whole record. A field of the element at position `Index` is `Class[Index].Name`. This lets a loop process each record in turn.

:::worked-solution{title="Processing an array of records"}
The pseudocode stores three pupils, outputs the name and average of those with an average of at least 50, and outputs the mean average.

```
DECLARE Class : ARRAY[1:3] OF TStudent
DECLARE Total : REAL
DECLARE Index : INTEGER
Class[1].Name ← "Tendai Ncube"
Class[1].Average ← 58.5
Class[2].Name ← "Rudo Dube"
Class[2].Average ← 47.0
Class[3].Name ← "Farai Sibanda"
Class[3].Average ← 71.25
Total ← 0
FOR Index ← 1 TO 3
    Total ← Total + Class[Index].Average
    IF Class[Index].Average >= 50 THEN
        OUTPUT Class[Index].Name, " ", Class[Index].Average
    ENDIF
NEXT Index
OUTPUT "Mean average: ", Total / 3
```

Python has no record keyword, but a class with fields (here made with `dataclass`) does the same job. The program below was run:

```python
from dataclasses import dataclass

@dataclass
class Student:
    student_id: str
    name: str
    form: int
    average: float
    boarder: bool

pupils = [
    Student("S101", "Tendai Ncube", 5, 58.5, True),
    Student("S102", "Rudo Dube", 5, 47.0, False),
    Student("S103", "Farai Sibanda", 6, 71.25, False),
]
total = 0
for pupil in pupils:
    total = total + pupil.average
    if pupil.average >= 50:
        print(pupil.name, pupil.average)
print("Mean average:", total / len(pupils))
```

The real output is:

```
Tendai Ncube 58.5
Farai Sibanda 71.25
Mean average: 58.916666666666664
```

Tendai (58.5) and Farai (71.25) are at least 50, so they are output; Rudo (47.0) is not. The total is 58.5 + 47.0 + 71.25 = 176.75 and the mean is 176.75 ÷ 3. Python shows the mean as 58.916666666666664 because a real number cannot be stored exactly in binary, which is why the average is better displayed with a fixed number of decimal places in a real program.
:::

A Python dictionary can also act as a simple record, with the field names as keys:

```python
pupil = {"name": "Chipo Mlambo", "form": 5, "average": 63.5}
pupil["average"] = pupil["average"] + 1
print(pupil["name"], pupil["average"])
```

```
Chipo Mlambo 64.5
```

## Why use records?

- The fields of one entity are **kept together** under one name, so they cannot get out of step as separate arrays might.
- The code is **easier to read**: `Pupil.Average` says more than `Data[3][4]`.
- A record can be **passed to a procedure or function** as one parameter and stored as a whole in an array or a file.
- Records mirror the **rows of a database table**, where each field is a column.

:::keyfact{title="ZIMSEC and Cambridge"}
Primitive data types are named in the ZIMSEC syllabus (Form 6: integer, floating point, character, Boolean) and the Cambridge AS Level lists INTEGER, REAL, CHAR, STRING, BOOLEAN and DATE. Records are examined by both. The DATE literal format used above, `12/01/2026`, follows our reading of the 9618 pseudocode guide and is flagged for review.
:::

## Common mistakes

:::mistake{title="Choosing INTEGER for identifiers such as telephone numbers"}
These are not used in calculations and may start with 0. Use STRING.
:::

:::mistake{title="Using INTEGER for averages or prices"}
An integer cannot store 58.5 or a price with cents. Use REAL.
:::

:::mistake{title="Forgetting the record name when using a field"}
Write `Pupil.Average`, not just `Average`. In an array of records write `Class[Index].Average`.
:::

:::mistake{title="Confusing a record with an array"}
An array holds items of the same type, accessed by an index. A record holds items of different types, accessed by field name.
:::

## Exam tips

:::exam-tip
Cambridge Paper 1 and ZIMSEC Paper 1 give a description of some data and ask you to **state** the most suitable data type for each item, **write** a record type definition (with `TYPE`, `DECLARE` and `ENDTYPE`) and **write** statements that read or write a field. Always give a reason for the type, such as "STRING because it must keep the leading zero".
:::

:::exam-tip
"**Explain** the benefit of using a record rather than separate variables" needs the idea that related data of different types is grouped under one identifier, which makes the program easier to read and to pass to subroutines.
:::

## Summary

:::summary
- The built-in data types are INTEGER, REAL, CHAR, STRING, BOOLEAN and DATE; choose the type from the kind of data and the operations needed.
- Identifiers such as telephone numbers are STRING; averages and prices are REAL; yes/no data is BOOLEAN.
- A record groups fields of different types under one identifier, defined with `TYPE … ENDTYPE`.
- A field is accessed with the dot notation `Pupil.Name`, or `Class[Index].Name` for an array of records.
- An array of records stores many entities and lets a loop process each one.
:::
