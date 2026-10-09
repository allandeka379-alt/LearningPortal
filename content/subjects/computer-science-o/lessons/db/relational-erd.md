---
{
  "key": "db.relational-erd",
  "title": "Relational databases, keys and entity-relationship diagrams",
  "summary": "How a relational database links tables with primary and foreign keys, the three kinds of relationship (one-to-one, one-to-many and many-to-many), how to describe an entity-relationship diagram in words, how relational, flat-file, hierarchical and network models compare, and how data is imported and exported.",
  "concepts": ["comp.db.relational-erd"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

A clinic in Gweru first kept all its data in one big table: every row held a patient's details **and** the full details of their doctor. When Dr Sithole changed her speciality, the receptionist had to edit dozens of rows, and missed some. Soon the table said two different things about the same doctor.

A **relational database** avoids this by storing each kind of thing in its own table and linking the tables with keys. Each fact is stored once, so it is changed in one place. In Form 3, ZIMSEC asks you to create relational databases, identify primary and foreign keys, state the type of each relationship, describe entity-relationship diagrams, compare database models and import and export data.

## Key definitions

:::definition{term="Relational database"}
A database that stores data in two or more tables (relations) which are linked by matching values in key fields.
:::

:::definition{term="Entity"}
A thing about which data is stored, such as a patient, a doctor or a book; each entity usually becomes one table.
:::

:::definition{term="Foreign key"}
A field in one table that is the primary key of another table, used to link a record to the related record in that table.
:::

:::definition{term="Relationship"}
A link between two entities, described by how many records of one can be linked to one record of the other (its cardinality).
:::

:::definition{term="Entity-relationship diagram (ERD)"}
A diagram that shows the entities in a system as boxes and the relationships between them as lines, with the cardinality marked at each end.
:::

:::definition{term="Referential integrity"}
The rule that every foreign key value must match an existing primary key value in the linked table, so that no record refers to something that does not exist.
:::

## Linking tables with keys

The clinic's data is split into two tables. Each has its own primary key, and the `Patients` table also stores `DoctorID`, the primary key of the `Doctors` table.

| DoctorID | DoctorName | Speciality |
|:-:|:-:|:-:|
| D1 | Dr Mlambo | General |
| D2 | Dr Sithole | Children |
| D3 | Dr Gumbo | Eyes |

| PatientID | PatientName | Town | DoctorID |
|:-:|:-:|:-:|:-:|
| PT114 | Rudo Chari | Gweru | D2 |
| PT115 | Sipho Ndlovu | Kwekwe | D1 |
| PT118 | Chipo Marufu | Gweru | D2 |
| PT121 | Farai Zhou | Shurugwi | D3 |
| PT126 | Tendai Musa | Gweru | D2 |

In `Patients`, `DoctorID` is a **foreign key**. It may repeat (three patients see D2), which a primary key never may. To find who treats Farai Zhou, the database reads D3 in his record and looks up D3 in `Doctors`: Dr Gumbo. Dr Sithole's speciality is now stored once, in one record of `Doctors`.

:::worked-solution[Identifying keys and the relationship]
1. Primary key of `Doctors`: `DoctorID`, unique in every row. Primary key of `Patients`: `PatientID`.
2. The field that appears in both tables is `DoctorID`. It is the primary key in `Doctors`, so in `Patients` it is the **foreign key**.
3. Count the links: Dr Mlambo has 1 patient, Dr Sithole has 3 and Dr Gumbo has 1. One doctor can have many patients, but each patient record holds only one DoctorID.
4. So the relationship is **one-to-many**: one doctor to many patients.
5. Referential integrity holds: every DoctorID in `Patients` (D1, D2, D3) exists in `Doctors`. A patient with DoctorID D7 would be refused.
:::

## Types of relationship

| Relationship | Meaning | Example |
|:--|:--|:--|
| One-to-one (1:1) | one record in A links to at most one record in B, and the other way round | one headteacher manages one school |
| One-to-many (1:M) | one record in A links to many in B, but each record in B links to one in A | one form class has many learners |
| Many-to-many (M:M) | one record in A links to many in B, and one record in B links to many in A | a learner joins many clubs; a club has many learners |

A relational database cannot store a many-to-many relationship directly. It is broken into two one-to-many relationships through a **link table** (also called a junction table), whose records each pair one record from each side.

:::worked-solution[Resolving a many-to-many relationship]
A school stores learners and clubs. Nyasha belongs to Chess and Robotics, Tatenda to Robotics, and Thandeka to Chess and Drama.

| LearnerID | LearnerName |
|:-:|:-:|
| L7 | Nyasha |
| L8 | Tatenda |
| L9 | Thandeka |

| ClubID | ClubName |
|:-:|:-:|
| C1 | Chess |
| C2 | Drama |
| C3 | Robotics |

| LearnerID | ClubID |
|:-:|:-:|
| L7 | C1 |
| L7 | C3 |
| L8 | C3 |
| L9 | C1 |
| L9 | C2 |

1. The third table, `Memberships`, holds one record per learner in a club: 5 records for 5 memberships.
2. Each of its fields is a foreign key: `LearnerID` links to `Learners` and `ClubID` links to `Clubs`.
3. Its primary key is the **composite key** (`LearnerID`, `ClubID`): neither field alone is unique, but each pair is.
4. Learners to Memberships is one-to-many (Nyasha has 2 memberships), and Clubs to Memberships is one-to-many (Chess has 2). The many-to-many has become two one-to-many relationships.
:::

## Describing an entity-relationship diagram

An ERD draws each entity as a rectangle labelled with its name and joins related entities with a line. The cardinality is shown at the ends of the line. In the common "crow's foot" notation, a single plain line end means **one**, and an end that splits into three short prongs, like a bird's foot, means **many**.

:::example{title="An ERD for a school library, in words"}
A library has three entities: `Borrower`, `Loan` and `Book`.

- A line joins `Borrower` to `Loan`. The end at `Borrower` is plain (one) and the end at `Loan` has a crow's foot (many): one borrower can have many loans.
- A line joins `Book` to `Loan`. The end at `Book` is plain and the end at `Loan` has a crow's foot: one book appears in many loans over time.
- `Loan` is the link table that resolves the many-to-many relationship between borrowers and books. It holds `BorrowerID` and `BookID` as foreign keys, plus the loan date and the due date.
:::

## Database models compared

| Model | How data is organised | Strengths and weaknesses |
|:--|:--|:--|
| Flat-file | one table (or one file) holding everything | simple to set up; data is repeated, so updates are slow and inconsistencies appear |
| Hierarchical | records arranged as a tree: each child record has exactly one parent | fast for fixed one-to-many paths; poor for many-to-many links |
| Network | records linked as a graph: a record can have several parents | handles many-to-many links; complex to design and change |
| Relational | separate tables linked by primary and foreign keys | little repeated data, flexible queries across tables; needs careful design of the keys |

## Importing and exporting data

**Importing** brings data from another source, such as a spreadsheet or a comma-separated values (CSV) file, into a database table. **Exporting** sends data out in such a format, for example a class list exported to a spreadsheet for a teacher. In a CSV file each record is one line and the fields are separated by commas. When importing, check that the fields line up with the table's fields and data types, and that imported key values do not break uniqueness or referential integrity.

## Common mistakes

:::mistake{title="Calling any repeated field a foreign key"}
A foreign key is a field that is the **primary key of another table**. A repeated field such as Town is not a foreign key unless it links to a Towns table.
:::

:::mistake{title="Putting the foreign key on the wrong side"}
In a one-to-many relationship the foreign key goes in the table on the **many** side. A doctor record cannot hold the IDs of all its patients in one field.
:::

:::mistake{title="Leaving a many-to-many relationship unresolved"}
Two tables cannot be linked many-to-many directly. Add a link table whose records each hold one key from each side.
:::

## Exam tips

:::exam-tip
To *state the relationship*, ask the question both ways: "How many patients can one doctor have?" and "How many doctors does one patient record hold?" Then write it with the entities named, such as "one doctor to many patients".
:::

:::exam-tip
When asked to *describe* an ERD, name each entity, state which entities are joined, and say which end is "one" and which is "many". Examiners give credit for the cardinality at both ends.
:::

## Summary

:::summary
- A relational database stores each entity in its own table and links tables with keys, so each fact is stored once.
- A foreign key is the primary key of another table; it sits on the "many" side of a one-to-many relationship.
- Relationships are one-to-one, one-to-many or many-to-many; a many-to-many needs a link table with a composite key.
- An ERD shows entities as rectangles and relationships as lines, with one or many (crow's foot) at each end.
- Flat-file, hierarchical, network and relational models differ in how they link records; CSV files are used to import and export data.
:::
