---
{
  "key": "db.relational-concepts",
  "title": "File-based and relational databases",
  "summary": "Why a collection of separate files causes redundancy, inconsistency and insecurity, how a relational database removes these problems, and the terms entity, table, record, field, keys, relationships, referential integrity and index.",
  "concepts": ["acs.db.relational-concepts"],
  "estimatedMinutes": 45,
  "level": "core",
  "freePreview": true
}
---
## Introduction

A secondary school in Gweru keeps its records in separate files. The registry has one file of pupils, the bursar has another for fees and the sports master has a third for team lists. Each department wrote its own program to read its own file. Soon the same pupil appears in three places, with the surname spelt in three ways, and nobody can say which version is correct.

This lesson explains the problems of this **file-based approach**, how a **relational database** solves them, and the vocabulary used to describe a relational database. Everything in the rest of the topic (design, normalisation, SQL) depends on this vocabulary, so learn the terms exactly.

You should already know what data and information are, and what a table with rows and columns looks like.

## Key definitions

:::definition{term="Database"}
An organised collection of related data, stored so that it can be shared, searched and updated by many users and programs.
:::

:::definition{term="Relational database"}
A database in which the data is held in tables (relations) that are linked to each other by matching key values.
:::

:::definition{term="Entity"}
A person, object, place or event about which data is stored, such as a pupil, a class or a subject. Each entity normally becomes one table.
:::

:::definition{term="Table, record and field"}
A **table** (relation) holds the data about one entity. A **record** (tuple) is one row: all the data about one occurrence of the entity. A **field** (attribute) is one column: one item of data about every occurrence.
:::

:::definition{term="Primary key"}
A field, or combination of fields, whose value is different in every record, so that it identifies exactly one record. It can never be empty.
:::

:::definition{term="Foreign key"}
A field in one table that holds the primary key value of a record in another table. It is the link between the two tables.
:::

## Problems with the file-based approach

In a file-based system each application has its own data files. The data is stored in the format that the program expects.

| Problem | What it means | Example |
|---|---|---|
| Data redundancy | The same data is stored more than once, wasting space | The class teacher's name is typed in every pupil's row |
| Data inconsistency | The copies of the data disagree | The teacher's name is changed in two of three rows |
| Program-data dependence | The file format is written into the program, so changing the file means rewriting every program that uses it | Adding a field to the pupil file breaks the fees program |
| No data sharing | Each department has its own files; combining them needs new programs | The sports master cannot see which pupils owe fees without a new program |
| Poor security and integrity | Anyone who can open the file can read or change all of it; there are no rules to stop invalid values | A clerk can change any field, including one they should not see |

Here is one such file.

| StudentID | Name | ClassID | ClassTeacher | Room |
|:-:|:-:|:-:|:-:|:-:|
| S101 | Tendai Moyo | 4A | Mr Dube | 12 |
| S102 | Rudo Chikwanha | 4A | Mr Dube | 12 |
| S103 | Farai Ncube | 4B | Mrs Sibanda | 7 |
| S104 | Chipo Banda | 4A | Mr Dube | 12 |
| S105 | Nyasha Mutasa | 4C | Ms Gumbo | 3 |
| S106 | Sipho Ndlovu | 4B | Mrs Sibanda | 7 |

The class teacher and room are stored once for **every pupil**: 3 rows repeat "Mr Dube". If Mr Dube is replaced, three rows must be edited, and if one is missed the file contradicts itself.

## How a relational database solves them

A relational database splits the data into tables so that each fact is stored **once**, and links the tables using keys. A **database management system** (DBMS) controls access to the data (see the lesson on DBMS features). The same data now becomes two tables.

| StudentID (PK) | Name | ClassID (FK) |
|:-:|:-:|:-:|
| S101 | Tendai Moyo | 4A |
| S102 | Rudo Chikwanha | 4A |
| S103 | Farai Ncube | 4B |
| S104 | Chipo Banda | 4A |
| S105 | Nyasha Mutasa | 4C |
| S106 | Sipho Ndlovu | 4B |

| ClassID (PK) | ClassTeacher | Room |
|:-:|:-:|:-:|
| 4A | Mr Dube | 12 |
| 4B | Mrs Sibanda | 7 |
| 4C | Ms Gumbo | 3 |

The `ClassID` in the `Student` table is a foreign key: it matches the primary key of the `Class` table.

:::worked-solution{title="How much repetition is removed?"}
1. In the file there are 6 rows, and each stores 2 items about the class (teacher and room): 6 × 2 = 12 items.
2. In the database there are 3 classes, and each class is stored once with its 2 items: 3 × 2 = 6 items.
3. The relational design stores 6 fewer items. More importantly, changing Mr Dube's room is now done in **one** record, so the data cannot disagree with itself.
:::

The other problems are solved too. Programs and data are separate (a program asks the DBMS for data and does not depend on the file layout). Several users share the same data at once. Access rights and validation rules are applied in one place.

## Keys

A key is a field or combination of fields used to identify or find records.

- A **candidate key** is any field (or fields) that could serve as the primary key because every value is unique and never empty.
- The **primary key** is the candidate key chosen to identify records.
- A **secondary key** is a candidate key that was not chosen as the primary key.
- A **foreign key** links to the primary key of another table.
- A **composite key** is a primary key made of two or more fields that are unique only in combination.

| TeacherID | Name | NationalIDNo | Email | Subject |
|:-:|:-:|:-:|:-:|:-:|
| T01 | Mr Dube | 8801234A12 | dube@school.example | Mathematics |
| T02 | Mrs Sibanda | 7705678B34 | sibanda@school.example | English |
| T03 | Ms Gumbo | 9109012C56 | gumbo@school.example | Mathematics |

:::worked-solution{title="Choosing the keys of the Teacher table"}
1. `TeacherID`, `NationalIDNo` and `Email` are each different for every teacher, so each could identify a record: they are the **candidate keys**.
2. `Name` is not a safe candidate: two teachers could share a name. `Subject` is repeated (two teachers teach Mathematics), so it cannot identify one record.
3. `TeacherID` is chosen as the **primary key**: it is short, never changes and is issued by the school. `NationalIDNo` and `Email` are the **secondary keys**.
:::

## Relationships

Tables are related in one of three ways.

| Relationship | Meaning | Example |
|---|---|---|
| One-to-one (1:1) | One record in A matches at most one record in B | A teacher and the single locker assigned to them |
| One-to-many (1:M) | One record in A matches many records in B | One class has many pupils |
| Many-to-many (M:M) | Many records in A match many in B | Pupils and subjects: a pupil takes many subjects and a subject has many pupils |

In a one-to-many relationship the foreign key is placed in the table on the **many** side (`ClassID` in `Student`). A many-to-many relationship cannot be stored directly, so it is split into two one-to-many relationships using a third **link table** (for example `Enrolment` with `StudentID` and `SubjectID`); the design lesson shows how.

## Referential integrity and indexing

**Referential integrity** means that every foreign key value must match an existing primary key value in the related table (or be empty if the design allows it). The DBMS then refuses to add a pupil in class `4Z` when no such class exists, and refuses to delete a class that still has pupils.

An **index** is a separate sorted structure, built on one or more fields, that lets the DBMS find records without reading the whole table. An index on `Name` makes a search for a surname fast, like the index at the back of a book. The costs are extra storage, and slower inserts and updates because the index must be kept up to date. Primary keys are indexed automatically.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards expect the limitations of the file-based approach, the features of a relational database and all the terms above. Cambridge names the terms entity, table, record, field, tuple, attribute, candidate key, secondary key, primary key, foreign key, relationship, referential integrity and index. ZIMSEC uses the same vocabulary within its relational database topic. Use the exact words of the question in your answer.
:::

## Common mistakes

:::mistake{title="Saying the data is stored only once in a file system"}
In a file-based system the same data is stored in several files. It is the relational database that stores each fact once.
:::

:::mistake{title="Confusing field and record"}
A field is a **column** (one attribute for all items); a record is a **row** (all attributes of one item).
:::

:::mistake{title="Putting the foreign key on the wrong side"}
The foreign key goes in the table on the **many** side of a one-to-many relationship, holding the primary key value of the "one" side.
:::

:::mistake{title="Using a name as a primary key"}
Names are not unique and can change. Use an identifier such as `StudentID`, which is unique, never empty and does not change.
:::

## Exam tips

:::exam-tip
Questions in this area appear in Paper 1 for both boards (ZIMSEC Paper 1 databases; Cambridge Paper 1 topic 8). "**State**" a term: give the exact definition in one sentence. "**Describe**" the limitations of a file-based approach needs each limitation named and explained with a consequence: redundancy leads to wasted space and inconsistency.
:::

:::exam-tip
"**Explain** why a primary key is needed": every record must be uniquely identified so that the right record is found, updated or linked to from other tables. For a relationship question, name the two tables, say which side is "many" and say where the foreign key goes.
:::

## Summary

:::summary
- A file-based system stores data in separate files, giving redundancy, inconsistency, program-data dependence, no sharing and weak security.
- A relational database stores data in linked tables, each fact once, controlled by a DBMS.
- Table = entity; record (tuple) = row; field (attribute) = column.
- Keys: candidate, primary, secondary, foreign (and composite); the foreign key goes on the many side.
- Referential integrity forbids a foreign key value with no matching primary key; an index speeds up searches at a cost.
:::
