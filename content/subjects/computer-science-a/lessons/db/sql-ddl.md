---
{
  "key": "db.sql-ddl",
  "title": "SQL data definition language",
  "summary": "Writing and reading SQL that defines a database: CREATE DATABASE, CREATE TABLE with data types and PRIMARY KEY, FOREIGN KEY ... REFERENCES and NOT NULL, and ALTER TABLE, with the results of running the statements.",
  "concepts": ["acs.db.sql-ddl"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Once a database has been designed on paper, someone has to build it. A developer does not draw the tables with a mouse in every system; the standard way is to write **SQL** (Structured Query Language) statements that tell the database management system what tables, fields and keys to create. The same script can be run on a new computer to build an identical, empty database.

The part of SQL that defines the structure is the **data definition language (DDL)**. This lesson covers the statements you must be able to write and read: `CREATE DATABASE`, `CREATE TABLE`, `ALTER TABLE`, the data types and the key definitions. The statements that work with the data inside the tables (`SELECT`, `INSERT`, `UPDATE`, `DELETE`) are the data manipulation language, covered in the next lesson.

You should know what a primary key and a foreign key are, and have seen a table design written as `Table(Field, Field, ...)`.

## Key definitions

:::definition{term="Data definition language (DDL)"}
The part of SQL used to create and change the structure of a database: its tables, fields, data types and keys.
:::

:::definition{term="Data type"}
The kind of value a field can hold, such as whole numbers or text. The DBMS uses it to check values and to decide how much storage to use.
:::

:::definition{term="Constraint"}
A rule attached to a field or table that the DBMS enforces, such as `PRIMARY KEY`, `FOREIGN KEY` or `NOT NULL`.
:::

## Data types

| Data type | Holds | Example value |
|---|---|---|
| `CHARACTER(n)` | Text of exactly n characters | `'4A'` |
| `VARCHAR(n)` | Text of up to n characters | `'Chikwanha'` |
| `BOOLEAN` | True or false | `TRUE` |
| `INTEGER` | Whole numbers | `42` |
| `REAL` | Numbers with a fractional part | `45.50` |
| `DATE` | A calendar date | `'2010-03-14'` |
| `TIME` | A time of day | `'08:30:00'` |

Choose the type that fits the data. A telephone number or a student number such as `S0101` is text, not an integer, because it is never used in a calculation and may start with a zero or a letter. A `CHARACTER(n)` field always uses n characters; a `VARCHAR(n)` field uses only as many as the value needs, so it suits names.

## Creating tables

The statement `CREATE TABLE` names the table and lists each field with its data type and constraints, separated by commas. A table that another table refers to must be created first. In this script, `Form` is created before `Student` because a student's `FormID` refers to a form.

```
CREATE TABLE Form (
    FormID CHARACTER(2) PRIMARY KEY,
    FormTeacher VARCHAR(30) NOT NULL,
    Room INTEGER
);

CREATE TABLE Student (
    StudentID CHARACTER(5) PRIMARY KEY,
    Surname VARCHAR(30) NOT NULL,
    DateOfBirth DATE,
    Boarder BOOLEAN,
    FeePaid REAL,
    FormID CHARACTER(2),
    FOREIGN KEY (FormID) REFERENCES Form(FormID)
);
```

Reading the script:

- `PRIMARY KEY` marks the field that identifies each record. It must be unique and cannot be empty.
- `NOT NULL` means the field must always have a value.
- `FOREIGN KEY (FormID) REFERENCES Form(FormID)` says that a student's `FormID` must match a `FormID` in the `Form` table: this enforces referential integrity.
- Statements end with a semicolon, and keywords are written in capitals by convention.

`CREATE DATABASE School;` creates a new empty database in most systems. SQLite, which we use to test the examples in this course, keeps each database in its own file, so it has no such statement; the tables are simply created in the open file.

The structure that the script created can be listed.

| Field | Data type | NOT NULL | Primary key |
|:-:|:-:|:-:|:-:|
| FormID | CHARACTER(2) | no | yes |
| FormTeacher | VARCHAR(30) | yes | no |
| Room | INTEGER | no | no |

| Field | Data type | NOT NULL | Primary key |
|:-:|:-:|:-:|:-:|
| StudentID | CHARACTER(5) | no | yes |
| Surname | VARCHAR(30) | yes | no |
| DateOfBirth | DATE | no | no |
| Boarder | BOOLEAN | no | no |
| FeePaid | REAL | no | no |
| FormID | CHARACTER(2) | no | no |

## Checking that the constraints work

The DBMS now enforces the rules in the script. Two records were inserted into `Student`.

| StudentID | Surname | DateOfBirth | Boarder | FeePaid | FormID |
|:-:|:-:|:-:|:-:|:-:|:-:|
| S0101 | Moyo | 2010-03-14 | 1 | 45.50 | 4A |
| S0102 | Ncube | 2010-08-02 | 0 | 60.00 | 4B |

:::worked-solution{title="What happens when the rules are broken?"}
Three further `INSERT` statements were run on the same tables.
1. A student with `FormID` `'4Z'` was inserted, but no form `4Z` exists. The DBMS refused it with the message `FOREIGN KEY constraint failed`: the foreign key rule protected referential integrity.
2. A student with `StudentID` `'S0101'` was inserted, but that identifier is already used. The message was `UNIQUE constraint failed: Student.StudentID`: a primary key must be unique.
3. A student with no surname was inserted. The message was `NOT NULL constraint failed: Student.Surname`: the field was declared `NOT NULL`.
(The wording of an error message depends on the DBMS; the rule that is enforced is the same.)
:::

## Changing a table with ALTER TABLE

`ALTER TABLE` changes the structure of a table that already exists. The most common change is to add a field.

```
ALTER TABLE Student ADD Phone VARCHAR(15);
```

:::worked-solution{title="Adding a field to a table that holds data"}
1. The statement adds a `Phone` field of up to 15 characters to `Student`.
2. The table now has seven fields instead of six.
3. The records already in the table have no phone number. The new field holds the special value `NULL` (no value) in those records, which is why a field added later usually cannot be declared `NOT NULL`.

| StudentID | Surname | Phone |
|:-:|:-:|:-:|
| S0101 | Moyo | NULL |
| S0102 | Ncube | NULL |
:::

A primary key or foreign key can also be added after the table has been created. In standard SQL, as used in the Cambridge examinations, this is written as follows. SQLite cannot run these two forms (it needs the key to be declared in `CREATE TABLE`), so they are shown but not run here.

```
ALTER TABLE Student ADD PRIMARY KEY (StudentID);
ALTER TABLE Student ADD FOREIGN KEY (FormID) REFERENCES Form(FormID);
```

## Writing DDL from a design

To turn a design such as `Form(FormID, FormTeacher, Room)` and `Student(StudentID, Surname, ..., FormID)` into a script:

1. Create the tables that are referred to (the "one" side) before the tables that refer to them (the "many" side).
2. Give every field a data type that suits the data.
3. Declare the primary key of each table.
4. Add the `FOREIGN KEY ... REFERENCES` clause on the many side.
5. Add `NOT NULL` to fields that must always have a value.

## Differences between systems

Database systems differ in small ways. SQLite stores a `BOOLEAN` as 1 and 0 and a `DATE` as text, and it does not check the length in `VARCHAR(30)`. Other systems are stricter. Examination answers should use the standard types in the table above.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards expect `CREATE DATABASE`, `CREATE TABLE`, `ALTER TABLE`, the data types above, `PRIMARY KEY` and `FOREIGN KEY ... REFERENCES`. Cambridge examinations use the standard forms shown, including `ALTER TABLE ... ADD PRIMARY KEY` and `ADD FOREIGN KEY`. ZIMSEC practical work may use whichever database software the school has, so check the syntax of that system.
:::

## Common mistakes

:::mistake{title="Creating the table with the foreign key first"}
`Student` refers to `Form`, so `Form` must exist before `Student` is created.
:::

:::mistake{title="Using a number type for identifiers"}
Phone numbers and student numbers are labels, not quantities. Use `CHARACTER` or `VARCHAR`, so leading zeros and letters are kept.
:::

:::mistake{title="Forgetting commas and brackets"}
Fields in a `CREATE TABLE` are separated by commas, with no comma after the last one, and the whole list is in brackets followed by a semicolon.
:::

:::mistake{title="Confusing DDL and DML"}
`CREATE TABLE` and `ALTER TABLE` define structure (DDL). `INSERT INTO` adds a record to an existing table and belongs to DML.
:::

## Exam tips

:::exam-tip
Appears in Cambridge Paper 1 (topic 8) and ZIMSEC Paper 1 and Paper 2 (databases). For "**write** an SQL script to create the table", write the keywords in capitals, give every field a data type, mark the key and add the foreign key clause. Marks are given for each correct field, the primary key and the foreign key.
:::

:::exam-tip
For "**state** the purpose of this statement", say what is created or changed, for example "creates a table named `Student` with six fields, with `StudentID` as the primary key and `FormID` as a foreign key to `Form`".
:::

## Summary

:::summary
- DDL defines structure: `CREATE DATABASE`, `CREATE TABLE`, `ALTER TABLE`.
- Types: `CHARACTER(n)`, `VARCHAR(n)`, `BOOLEAN`, `INTEGER`, `REAL`, `DATE`, `TIME`; identifiers are text.
- `PRIMARY KEY`, `NOT NULL` and `FOREIGN KEY ... REFERENCES` constraints are enforced by the DBMS.
- Create the referred-to table first; fields added later hold NULL in existing records.
- Dialects differ (SQLite stores booleans as 1 and 0); use the standard forms in examinations.
:::
