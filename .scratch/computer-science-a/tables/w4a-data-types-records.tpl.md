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

{{types}}

Each type allows particular operations. Arithmetic and comparison work on INTEGER and REAL; `&` joins STRING values; `AND`, `OR` and `NOT` work on BOOLEAN values; and dates can be compared to find which is earlier. A CHAR is written between single quotation marks and a STRING between double quotation marks, so `'7'` is a character and `7` is an integer.

### Choosing the right type

The right type depends on what the data is and what will be done with it, not only on what it looks like:

{{choose}}

A telephone number looks like a number but is a STRING, because its leading zero would be lost as an integer and nobody adds telephone numbers together. A good rule: if you would do arithmetic with it, use a number type; if it is a label or an identifier, use a STRING. Using the right type also saves memory and lets the program reject wrong input (a letter typed into an INTEGER).

## Records

An array holds items of the *same* type. A record holds items of *different* types that belong together. A record type is first defined with `TYPE … ENDTYPE`, and then variables of that type are declared. A field is read or written by writing the variable name, a full stop and the field name.

{{recPseudo}}

The last statement outputs `Chipo Mlambo is in Form 5`. Each record variable has its own copy of the fields, so changing `Pupil.Average` does not change the average of any other record.

:::worked-solution{title="Choosing the fields and types of a record"}
A clinic wants a record for each appointment. The fields and types are chosen from the kind of data in each:

{{clinicTable}}

The record type is therefore:

{{clinicPseudo}}

The telephone number is a STRING so that a number such as 0771234567 keeps its leading zero, and the fee is REAL because it has cents.
:::

## An array of records

To store many pupils, declare an **array of records**: every element of the array is a whole record. A field of the element at position `Index` is `Class[Index].Name`. This lets a loop process each record in turn.

:::worked-solution{title="Processing an array of records"}
The pseudocode stores three pupils, outputs the name and average of those with an average of at least 50, and outputs the mean average.

{{arrPseudo}}

Python has no record keyword, but a class with fields (here made with `dataclass`) does the same job. The program below was run:

{{py}}

The real output is:

{{out}}

Tendai (58.5) and Farai (71.25) are at least 50, so they are output; Rudo (47.0) is not. The total is 58.5 + 47.0 + 71.25 = 176.75 and the mean is 176.75 ÷ 3. Python shows the mean as 58.916666666666664 because a real number cannot be stored exactly in binary, which is why the average is better displayed with a fixed number of decimal places in a real program.
:::

A Python dictionary can also act as a simple record, with the field names as keys:

{{dictPy}}

{{dictOut}}

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
