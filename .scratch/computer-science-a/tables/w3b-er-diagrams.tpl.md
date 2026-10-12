---
{
  "key": "db.er-diagrams",
  "title": "Entity-relationship diagrams and database design",
  "summary": "Turning a scenario into entities, attributes and relationships, reading an entity-relationship diagram, resolving many-to-many relationships with a link table, choosing keys and converting the design into a relational schema.",
  "concepts": ["acs.db.er-diagrams"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Before anyone writes a line of SQL, the designer of a database must decide what data to store and how the pieces connect. A school librarian in Mutare wants to record which members borrow which books, and when the books are due back. If the design is wrong, the library will not be able to answer simple questions such as "Which books has Tendai not returned?"

An **entity-relationship (E-R) diagram** is the planning tool for this stage. It shows the entities, their attributes and the relationships between them. This lesson explains how to analyse a scenario, how to read and describe an E-R diagram, how to remove many-to-many relationships and how to convert the design into a set of tables.

You should know the terms entity, attribute, primary key, foreign key and the three kinds of relationship from the lesson on relational concepts.

## Key definitions

:::definition{term="Entity-relationship (E-R) diagram"}
A diagram that shows the entities in a system, the relationships between them and the degree of each relationship (one-to-one, one-to-many or many-to-many).
:::

:::definition{term="Attribute"}
A property of an entity, for example the title of a book. Each attribute becomes a field in the table of its entity.
:::

:::definition{term="Link table"}
A table, with a composite or new primary key and two foreign keys, that turns one many-to-many relationship into two one-to-many relationships.
:::

## Reading and drawing an E-R diagram

In an E-R diagram each **entity** is a box labelled with its name. A line joins two entities that are related. The ends of the line show the **degree**. In the common **crow's foot** notation:

- a single short bar across the line means **one** at that end;
- three lines spreading out like a bird's foot mean **many** at that end;
- a small circle in addition means the relationship is **optional** (zero is allowed) at that end.

Because the diagram cannot be reproduced in text here, examination questions in this course describe it in words or in a table, and you can do the same: "Each `Member` makes many `Loan`s; each `Loan` is made by one `Member`".

## Analysing a scenario

Work through these steps.

1. **Find the entities**: the nouns about which the system must remember data (member, book, loan, category).
2. **List the attributes** of each entity (title, author, phone number).
3. **Find the relationships** between entities, read them in both directions, and decide the degree of each.
4. **Remove many-to-many relationships** by adding a link table.
5. **Choose the primary key** of every entity and place the **foreign keys** on the many side.
6. Write the **relational schema**.

:::example{title="The library scenario"}
The library holds books, and each book is in one category (Fiction, Science, History). Members borrow books. A loan records the date out and the date due. A member can borrow many books over time, and a book can be borrowed by many members over time.
:::

The entities are `Member`, `Book`, `Category` and, as explained below, `Loan`. The relationships are listed here with the degree of each.

{{relTable}}

## Many-to-many relationships

Members and books are in a **many-to-many** relationship: a member borrows many books, and a book is borrowed by many members. A relational database cannot store this directly, because a single foreign key field can only hold one value. The solution is a **link table** that contains the primary keys of both tables as foreign keys. Here the link table is `Loan`, and it also holds the facts that belong to the borrowing itself (the dates).

:::worked-solution{title="A link table for pupils and subjects"}
A school wants to record which pupils take which subjects. A pupil takes several subjects, and a subject is taken by many pupils, so the relationship is many-to-many. The link table `Enrolment` has the foreign keys `StudentID` and `SubjectID`. Its primary key is the **pair** of fields, because a pupil can appear many times and a subject can appear many times, but the same pair only once.

{{enrolTable}}

1. The table has {{nEnrol}} rows: one for each time a pupil takes a subject.
2. Pupil S203 has the most rows: {{maxSubjects}} subjects.
3. No pair of values appears twice, so `(StudentID, SubjectID)` is a suitable **composite primary key**.
4. The many-to-many relationship has become two one-to-many relationships: one pupil to many enrolments, and one subject to many enrolments.
:::

## Choosing keys and converting to a schema

Every entity table needs a primary key. If no field is naturally unique, add one, such as `MemberID`; this is an identifier that never changes and has no other meaning. A foreign key is placed in the table on the many side, with the same data type as the primary key it matches.

:::worked-solution{title="From the library E-R diagram to tables"}
Apply the steps to the library scenario. One table is made for each of the {{nTables}} entities (including the link table `Loan`), with the keys shown.

{{schemaTable}}

1. `Category` and `Member` have no foreign keys, because they are on the "one" side only.
2. `Book` is on the many side of `Category`, so it holds `CategoryID`.
3. `Loan` is on the many side of both `Member` and `Book`, so it holds `MemberID` and `BookID`, plus its own key `LoanID` because the same member may borrow the same book on different days.
4. Written as a schema, in the usual form, the tables are `Member(MemberID, Name, Phone)`, `Category(CategoryID, CategoryName)`, `Book(BookID, Title, Author, CategoryID)` and `Loan(LoanID, DateOut, DateDue, MemberID, BookID)`.
:::

Good design also checks the following.

- Store each fact once. If the author's address would be repeated for every book, make `Author` an entity.
- Do not store a value that can be calculated (a member's age if the date of birth is stored).
- Keep attributes **atomic**: one value in each field, for example separate `Forename` and `Surname` fields.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards expect entities, attributes, relationships, the removal of many-to-many relationships and the conversion of an E-R diagram into tables with keys. Cambridge asks for E-R diagrams and the relational schema with normalisation to third normal form (see the normalisation lesson). ZIMSEC asks for relational design to second normal form.
:::

## Common mistakes

:::mistake{title="Leaving a many-to-many relationship in the design"}
Two tables cannot hold a many-to-many relationship with one foreign key. Always add a link table.
:::

:::mistake{title="Putting the foreign key on the wrong side"}
The foreign key goes on the **many** side. A `Category` table with a `BookID` field would allow a category to hold only one book.
:::

:::mistake{title="Reading the relationship in one direction only"}
Read it both ways. "A category has many books" and "a book is in one category" together give one-to-many. Checking only one direction can make a one-to-many look like many-to-many.
:::

:::mistake{title="Using an attribute that is not unique as a key"}
Names, titles and dates are not unique. Use an identifier field unless the field is certain to be unique and unchanging.
:::

## Exam tips

:::exam-tip
Questions are in Cambridge Paper 1 (topic 8) and ZIMSEC Paper 1 (databases). "**Draw**" is replaced in this course by "describe" or "complete the table". State each relationship as "one X has many Y" and name the table that carries the foreign key.
:::

:::exam-tip
To "**explain** why a link table is needed", say that a relational database cannot store a many-to-many relationship directly, and that the link table splits it into two one-to-many relationships with a foreign key to each table.
:::

## Summary

:::summary
- An E-R diagram shows entities, attributes and relationships; the crow's foot end of a line means "many".
- Find entities (nouns), list attributes, find relationships and their degree, then choose keys.
- A many-to-many relationship is replaced by a link table with two foreign keys.
- The foreign key goes on the many side; the link table's key is often the pair of foreign keys or a new identifier.
- Convert each entity to a table and write the schema with primary and foreign keys marked.
:::
