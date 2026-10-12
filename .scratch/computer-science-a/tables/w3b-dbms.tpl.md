---
{
  "key": "db.dbms",
  "title": "Database management systems",
  "summary": "What a database management system does: data management and the data dictionary, data modelling and the logical schema, integrity and security (backup, access rights), the developer interface and query processor, and the roles of DDL and DML.",
  "concepts": ["acs.db.dbms"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

When a clerk in the registry at a Bulawayo school types a pupil's surname, several things happen that the clerk never sees. The program checks that the surname is not empty. Another program checks that the clerk is allowed to change pupil records. The record is saved in a place that other staff can read at the same moment, and at night a copy of the whole database is made in case the computer fails.

All of this is done by a **database management system (DBMS)**, the software that sits between the users' programs and the stored data. In the lesson on relational databases you saw that a file-based system has weak sharing, security and integrity. A DBMS is the answer to these weaknesses. This lesson describes its features and how SQL's two sub-languages, DDL and DML, are used by it.

You should already know the terms table, record, field, key and referential integrity.

## Key definitions

:::definition{term="Database management system (DBMS)"}
Software that is used to create, store, organise, secure and give controlled access to a database, so that many users and programs can share the same data.
:::

:::definition{term="Data dictionary"}
A store, held by the DBMS, of data about the database itself: the name, data type, size, validation rule and key status of every field, and the relationships between tables.
:::

:::definition{term="Logical schema"}
The description of the whole database as the designer sees it: the tables, their fields and data types, the keys and the relationships. It does not say how the data is physically stored on disk.
:::

## The features of a DBMS

### Data management

The DBMS stores the data and controls how it is read and written. Programs do not open data files; they ask the DBMS, which finds the data. This removes **program-data dependence**: the layout of the files can change without rewriting the programs. Because every request goes through the DBMS, many users can read and update the same data at the same time without damaging each other's changes.

### The data dictionary

The data dictionary describes the data. It is used by the DBMS to check every request, and by developers to see what the database contains.

{{dict}}

### Data modelling and the logical schema

Data modelling is the design of the tables and the relationships between them, which gives the logical schema. The DBMS holds the logical schema and uses it to turn a request that mentions tables and fields into the physical reading of the disk. Different users can have different **views** of the same data. A teacher sees the marks of their own class; the bursar sees fees but not marks.

### Data integrity

Integrity means that the data is correct and consistent. The DBMS enforces it using rules from the schema:

- **validation rules** such as a range check or a format check on a field;
- **primary key rules**: the key must be unique and not empty;
- **referential integrity**: a foreign key must match an existing primary key.

### Data security: backup and access rights

The DBMS allows the administrator to give each **user or group of users** **access rights** to each table (and even to each field). A user can be given the right to read only, or to read and change, or no access.

{{rights}}

The DBMS also provides **backup** and **recovery**. A full backup copies the entire database. An incremental backup copies only what has changed since the last backup. After a failure the database is restored from the backup.

:::worked-solution{title="How much storage does a week of backups need?"}
A school database is {{dbGB}} GB. About 3% of it changes each day. The school makes a full backup on day 1 and an incremental backup on each of days 2 to 7.
1. One incremental backup holds {{dbGB}} × 0.03 = {{incr}} GB.
2. Six incremental backups hold 6 × {{incr}} = 2.16 GB.
3. The weekly total is {{dbGB}} + 2.16 = {{weekly}} GB.
4. A full backup every day would need 7 × {{dbGB}} = {{fullEveryDay}} GB, so the plan saves {{saved}} GB.
:::

### Developer interface and query processor

The **developer interface** is the set of tools that a database developer uses to create the database: to define tables, set validation rules, build forms and reports and write queries. The **query processor** takes a query written in a language such as SQL, checks it against the data dictionary, works out the quickest way to carry it out (using indexes where they exist) and returns the result.

## DDL and DML in the DBMS

SQL has two parts.

| Part | Name | Used for | Examples |
|---|---|---|---|
| DDL | Data definition language | Defining the structure | `CREATE TABLE`, `ALTER TABLE` |
| DML | Data manipulation language | Working with the data | `SELECT`, `INSERT`, `UPDATE`, `DELETE` |

When a developer runs DDL, the DBMS creates the structure and records it in the **data dictionary** and **logical schema**. When a user runs DML, the DBMS first checks the user's access rights and the integrity rules, and then reads or changes the data.

:::worked-solution{title="What the DBMS does with one request"}
A teacher runs `UPDATE Marks SET Mark = 135 WHERE StudentID = 'S0042'` on a field that holds a mark out of 100.
1. The DBMS checks the access rights: teachers have write access to the marks table, so the request continues.
2. The query processor finds the record using the primary key index.
3. The DBMS checks the validation rule in the data dictionary: the mark must be between 0 and 100. 135 fails the range check.
4. The DBMS refuses the update and returns an error, so the stored data is unchanged.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards expect the features listed above. Cambridge words them as data management, data dictionary, data modelling, logical schema, data integrity, data security (backup and access rights for individuals and groups), developer interface and query processor. ZIMSEC covers the same ideas under the advantages of a DBMS.
:::

## Common mistakes

:::mistake{title="Confusing the DBMS with the database"}
The database is the data. The DBMS is the software that manages it. A DBMS does not store pupils or marks; it controls how they are stored and accessed.
:::

:::mistake{title="Saying the data dictionary holds the data"}
The data dictionary holds data **about** the data (names, types, rules), not the records themselves.
:::

:::mistake{title="Giving every user full access"}
Access rights should follow the "need to know" idea: each user group gets the least access that its job needs.
:::

:::mistake{title="Backup is not security against unauthorised access"}
A backup protects against loss. Access rights and passwords protect against unauthorised use. Name the right one for the threat.
:::

## Exam tips

:::exam-tip
Appears in Paper 1 for both boards (ZIMSEC databases; Cambridge topic 8). "**State**" a feature: name it and add a short purpose. "**Explain** how a DBMS supports data security": access rights for individuals and groups, so that users see only the data they need, and backups so that the data can be recovered.
:::

:::exam-tip
Link every feature to the file-based problem it solves: the data dictionary and logical schema solve program-data dependence, integrity rules solve inconsistency, and access rights solve poor security.
:::

## Summary

:::summary
- A DBMS controls storage, access, integrity and security of the data for many users.
- The data dictionary holds data about the data; the logical schema describes the tables, fields and relationships.
- Integrity is enforced by validation rules, primary key rules and referential integrity.
- Security uses access rights for individuals and groups, plus backup and recovery.
- The developer interface builds the database; the query processor carries out queries; DDL defines structure and DML works with the data.
:::
