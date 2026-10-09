---
{
  "key": "db.table-design",
  "title": "Designing a database table: fields, records, data types and keys",
  "summary": "How a single-table database is organised into fields and records, how to choose a data type, field size and format for each field, how validation rules and input masks protect the data, and how to choose a primary key.",
  "concepts": ["comp.db.table-design"],
  "estimatedMinutes": 45,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

A school library in Gweru used to keep a card for every book in a wooden drawer. Finding every book by one author meant flicking through hundreds of cards, and a card filed in the wrong place was lost for good. A **database** stores the same facts in a structured way, so that a computer can search, sort and count them in a fraction of a second.

Before any data is typed in, someone has to **design** the table: decide which facts to store, what kind of data each one is, what values are allowed and which field identifies each item uniquely. A poor design causes problems for years: telephone numbers that lose their leading zero, dates that cannot be sorted, or two learners who cannot be told apart. Both ZIMSEC and Cambridge ask you to define a table from a description of the data, suggest data types, explain the purpose of a primary key and choose a suitable one.

## Key definitions

:::definition{term="Database"}
A structured, persistent collection of related data, organised so that it can be searched, sorted and updated easily.
:::

:::definition{term="Table"}
A collection of records about one type of thing (an entity), such as books, learners or products, arranged in rows and columns.
:::

:::definition{term="Field"}
One item of data stored about every record, such as a title or a price; it is a column of the table and has a name and a data type.
:::

:::definition{term="Record"}
All the data stored about one item in the table, such as one book; it is a row of the table.
:::

:::definition{term="Data type"}
The kind of data a field can hold, such as text, integer or date/time, which decides how it is stored and what can be done with it.
:::

:::definition{term="Primary key"}
A field (or combination of fields) whose value is unique for every record, so it identifies each record in the table.
:::

:::definition{term="Validation rule"}
A rule applied when data is entered, which rejects values that are not sensible or allowed, such as a mark above 100.
:::

## Fields and records

Every table is a grid. Each **column** is a field and each **row** is a record. The field names appear once, at the top, and are not records themselves.

:::worked-solution[Counting fields and records]
Here is part of the `Books` table used by the Gweru school library.

| BookID | Title | Author | Category | Pages | OnLoan | DateAdded |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| B0012 | Rivers of the Lowveld | T. Moyo | Geography | 214 | TRUE | 14/01/2024 |
| B0013 | Coding for Beginners | R. Ncube | Computing | 188 | FALSE | 14/01/2024 |
| B0019 | The Granite Hills | T. Moyo | Fiction | 302 | FALSE | 03/03/2024 |
| B0027 | Birds of Zimbabwe | C. Dube | Science | 256 | TRUE | 21/05/2024 |
| B0031 | Coding for Beginners | R. Ncube | Computing | 188 | TRUE | 09/09/2024 |
| B0034 | Market Day | N. Sibanda | Fiction | 145 | FALSE | 09/09/2024 |

1. Count the columns: BookID, Title, Author, Category, Pages, OnLoan and DateAdded, so there are **7 fields**.
2. Count the rows of data, not the heading row: there are **6 records**.
3. Look for a field whose values never repeat. Title repeats (the library owns two copies of *Coding for Beginners*), Author, Category, Pages and DateAdded all repeat, and OnLoan has only two possible values. Only **BookID** is different in every record, so it is the primary key.
:::

## Choosing data types

The data type tells the database how to store a field and what it may do with it: it can add numbers, sort dates in time order and test Boolean fields for TRUE or FALSE. The basic types you need are:

| Data type | Holds | Examples of fields |
|:--|:--|:--|
| Text / alphanumeric | any mix of letters, digits and symbols | name, address, telephone number, book ID |
| Character | exactly one character | grade (A to E), size code (S, M, L) |
| Boolean | one of two values, TRUE or FALSE (Yes or No) | paid, on loan, boarder |
| Integer | a whole number | pages, quantity in stock, number of seats |
| Real | a number with a fractional part | price, mass in kg, height in metres |
| Date/time | a calendar date and/or a time of day | date of birth, date added, appointment time |

Two rules decide most exam answers:

- If a "number" will never be used in a calculation and may start with 0 or contain spaces or a plus sign, store it as **text**. A telephone number such as 0772 123 456 stored as an integer loses its leading zero.
- Store a **date of birth**, not an age. An age changes every year and would have to be edited; the age can always be calculated from the date.

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge 0478 uses the generic names above: text/alphanumeric, character, Boolean, integer, real and date/time. ZIMSEC learners build tables in a database package, where the types have product names such as Short Text, Number (with field sizes Integer or Double), Currency, Date/Time, Yes/No and AutoNumber. ZIMSEC also asks you to set field sizes, formats and input masks; Cambridge does not.
:::

## Field size, format and input masks

A database package lets you set more properties for each field:

- **Field size**: the largest number of characters a text field may hold (for example 30 for a surname), or the range of a number field. A sensible size saves storage and stops absurdly long entries.
- **Format**: how a value is displayed, such as a date shown as 14/01/2024 or a price shown with two decimal places. Format changes the display only, not the stored value.
- **Input mask**: a pattern that controls what may be typed, character by character. A mask for a book ID of one letter followed by four digits makes the user type exactly that shape, and fixed characters such as the dashes in a code are filled in automatically.

## Validation rules

Validation checks that data is sensible and allowed **as it is entered**. It cannot prove that data is correct (a valid date of birth can still be the wrong one), but it stops many mistakes.

| Check | What it tests | Example in the Books table |
|:--|:--|:--|
| Presence check | a value has been entered | Title must not be left blank |
| Range check | a value lies between limits | Pages between 1 and 2000 |
| Length check | the number of characters is allowed | BookID is exactly 5 characters |
| Type check | the value is of the right data type | Pages must be a whole number |
| Format check | the value matches a pattern | BookID is a letter followed by four digits |
| Lookup check | the value is in a list of allowed values | Category is one of the library's categories |

## Choosing a primary key

The primary key must be **unique** for every record and must never be blank. Names are poor keys, because two learners can share a name, and so are fields that change, such as a telephone number. The safest choice is usually an ID field created for the purpose: a learner number, a book ID or an invoice number. A database package can generate one automatically (an AutoNumber field).

:::example{title="Defining a table from requirements"}
Farai runs a hardware shop in Masvingo. For each product he wants to store a code such as HW-0451, a description, the price in dollars, the number in stock, whether it is sold by weight, and the date the stock was last checked.

| Field | Data type | Validation | Reason |
|:--|:--|:--|:--|
| ProductCode | Text | format: two letters, a dash, four digits; presence | contains letters and a dash; unique, so it is the **primary key** |
| Description | Text | presence; length up to 40 | words |
| Price | Real | range: greater than 0 | money has cents, so a fractional part |
| NumberInStock | Integer | range: 0 or more | counted in whole items |
| SoldByWeight | Boolean | none needed | only two possible values |
| DateChecked | Date/time | must not be in the future | a date, so it can be sorted in time order |

The table is called `Products`. Each product is one record, and six fields are stored for every product.
:::

## Common mistakes

:::mistake{title="Storing a telephone number as an integer"}
Integers drop leading zeros and cannot hold spaces or a plus sign, and nobody adds telephone numbers together. Use text.
:::

:::mistake{title="Counting the heading row as a record"}
The field names are not data. Count only the rows below them when asked how many records a table has.
:::

:::mistake{title="Choosing a name as the primary key"}
Names repeat. A primary key must be unique for every record, so choose an ID or code field.
:::

:::mistake{title="Answering 'number' for a data type"}
Say integer for whole numbers and real for numbers with a fractional part. "Number" alone does not show which.
:::

## Exam tips

:::exam-tip
When asked to *suggest a data type*, check the actual values in the table: a code with letters is text, a single letter is character, a value with decimals is real, and Yes/No or TRUE/FALSE is Boolean.
:::

:::exam-tip
To *explain the purpose* of a primary key, say that it holds a **unique** value for each record so that each record can be identified. To *identify* one, name the field and say why its values are unique.
:::

## Summary

:::summary
- A table stores records (rows) about one entity; each record has the same fields (columns).
- Data types: text/alphanumeric, character, Boolean, integer, real and date/time; telephone numbers and codes are text.
- Field size, format and input masks control how data is stored, displayed and typed.
- Validation rules (presence, range, length, type, format, lookup) reject unreasonable data on entry.
- The primary key is a field with a unique value for every record, usually an ID or code.
:::
