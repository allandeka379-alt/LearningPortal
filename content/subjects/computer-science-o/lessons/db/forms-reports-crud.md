---
{
  "key": "db.forms-reports-crud",
  "title": "Database forms, reports and CRUD operations",
  "summary": "How datasheets, forms and reports are used to enter, view and present data; the four data manipulation operations create, read, update and delete (CRUD) and their SQL statements; and how records are searched, sorted and filtered.",
  "concepts": ["comp.db.forms-reports-crud"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Nyasha runs a phone repair shop in Masvingo. Every day she books in new jobs, changes the cost when a part turns out to be dearer, marks jobs as collected, and clears out old jobs. At the end of the month she prints a summary for the owner. She never types into the raw table: she uses a **form** to enter and edit jobs and a **report** to present them.

A database is useful only if people can put data in, get it out, change it and remove it safely. These four operations are called **CRUD**. ZIMSEC Form 2 asks you to develop databases with datasheets, queries, forms and reports, to perform CRUD operations and to search, filter and sort records. In the practical paper you do these in a database package; in the theory paper you describe them and explain why each object is used.

## Key definitions

:::definition{term="Datasheet"}
A view of a table or query that shows its records as rows and its fields as columns, in which data can be viewed and edited directly.
:::

:::definition{term="Form"}
A database object, designed on screen, used to enter, view and edit data one record at a time in a user-friendly layout.
:::

:::definition{term="Report"}
A database object that presents data from a table or query in a formatted layout for printing or reading, often with grouping, headings and totals.
:::

:::definition{term="CRUD"}
The four basic operations on stored data: Create (add new records), Read (retrieve records), Update (change existing records) and Delete (remove records).
:::

:::definition{term="Filter"}
A condition applied to a table or datasheet that temporarily hides the records that do not meet it, without deleting them.
:::

## Datasheets, forms and reports

| Object | Main purpose | Typical features |
|:--|:--|:--|
| Datasheet | quick viewing and editing of many records at once | rows and columns; sort and filter buttons |
| Form | entering and editing data, one record at a time | labels, text boxes, drop-down lists (combo boxes), check boxes for Yes/No fields, buttons, navigation controls |
| Report | presenting output for people to read or print | report header and footer, page numbers, records grouped (for example by device), totals and counts, no editing |

A well-designed form helps users avoid mistakes: each control has a clear label, related fields are grouped, the tab order follows the layout, a drop-down list offers only allowed values, a check box stands in for a Yes/No field, and the validation rules of the table still apply. A report is based on a table or query, so a report of "jobs not yet collected" is usually built on a query that selects those records first.

## CRUD with SQL

Each CRUD operation has an SQL statement.

| Operation | SQL statement | Example |
|:--|:--|:--|
| Create | INSERT INTO … VALUES (…) | `INSERT INTO Repairs VALUES (705, 'R. Gono', 'Phone', 'Battery', 25, FALSE);` |
| Read | SELECT … FROM … WHERE … | `SELECT Customer FROM Repairs WHERE Collected = FALSE;` |
| Update | UPDATE … SET … WHERE … | `UPDATE Repairs SET Collected = TRUE WHERE JobNo = 702;` |
| Delete | DELETE FROM … WHERE … | `DELETE FROM Repairs WHERE Collected = TRUE;` |

The **WHERE** clause decides which records an UPDATE or DELETE affects. Leave it out, and **every** record is changed or deleted. On a form, the same operations are buttons: New record, Save, Edit and Delete.

:::worked-solution[Applying CRUD statements in order]
Nyasha's `Repairs` table starts like this.

| JobNo | Customer | Device | Fault | Cost | Collected |
|:-:|:-:|:-:|:-:|:-:|:-:|
| 701 | T. Mapfumo | Phone | Screen | 45 | TRUE |
| 702 | C. Hove | Tablet | Battery | 30 | FALSE |
| 703 | S. Phiri | Phone | Charging port | 15 | FALSE |
| 704 | N. Zulu | Laptop | Keyboard | 55 | FALSE |

These four statements run in order:

```
INSERT INTO Repairs VALUES (705, 'R. Gono', 'Phone', 'Battery', 25, FALSE);
UPDATE Repairs SET Collected = TRUE WHERE JobNo = 702;
UPDATE Repairs SET Cost = Cost + 10 WHERE Device = 'Phone' AND Collected = FALSE;
DELETE FROM Repairs WHERE Collected = TRUE;
```

1. **Create**: job 705 is added, so there are 5 records.
2. **Update**: job 702 is marked as collected.
3. **Update**: phones not yet collected are jobs 703 and 705; each cost rises by 10, to 25 and 35. Job 701 is a phone but has been collected, so it is unchanged.
4. **Delete**: jobs 701 and 702 are now collected, so both are removed.

| JobNo | Customer | Device | Fault | Cost | Collected |
|:-:|:-:|:-:|:-:|:-:|:-:|
| 703 | S. Phiri | Phone | Charging port | 25 | FALSE |
| 704 | N. Zulu | Laptop | Keyboard | 55 | FALSE |
| 705 | R. Gono | Phone | Battery | 35 | FALSE |

Three records remain. The order matters: if the DELETE ran first, job 702 would not have been collected yet and would survive.
:::

## Searching, sorting and filtering

- **Searching** finds the records that match a value, such as the job for one customer. The Find tool in a datasheet jumps to a match; a query with WHERE returns every match.
- **Sorting** puts the records in ascending or descending order of one or more fields. A sort changes only the order in which records are shown, never the data.
- **Filtering** shows only the records that meet a condition and hides the rest. *Filter by selection* uses the value in the selected cell (for example all records where Device is Phone); *filter by form* lets you type conditions into several fields. Removing the filter shows every record again. A filter is temporary; a query is saved and can be reused or used as the source of a form or report.

:::example{title="Choosing the right tool"}
- "Show the uncollected jobs on screen for a minute while a customer waits": a **filter** on Collected = FALSE in the datasheet.
- "Every Friday, print a list of uncollected jobs with the total owed": save a **query** that selects Collected = FALSE and build a **report** on it, with a total in the report footer.
- "Book in a new repair at the counter": a **form**, with a drop-down list for Device and a check box for Collected.
- "Put the jobs in order of cost, dearest first": a **sort**, descending on Cost.
:::

## Common mistakes

:::mistake{title="Leaving out WHERE in UPDATE or DELETE"}
`DELETE FROM Repairs;` removes every record. Always check which records the WHERE clause selects before running it.
:::

:::mistake{title="Thinking a filter or sort deletes or changes data"}
A filter only hides records and a sort only reorders them. The stored data is unchanged.
:::

:::mistake{title="Using a report to enter data"}
Reports are for output. Data is entered and edited through forms or datasheets.
:::

## Exam tips

:::exam-tip
When asked to *state the purpose* of a form or a report, link it to the user: a form makes **data entry** easier and reduces errors; a report **presents** selected data in a readable, printable layout, often with totals.
:::

:::exam-tip
When tracing CRUD statements, apply them one at a time and rewrite the table after each step. Check every record against each WHERE condition, using the values as they are **after** the previous statement.
:::

## Summary

:::summary
- Datasheets show many records as rows and columns; forms enter and edit one record at a time; reports present data for reading or printing.
- CRUD: Create (INSERT), Read (SELECT), Update (UPDATE … SET), Delete (DELETE FROM).
- WHERE decides which records an UPDATE or DELETE affects; without it, all records are affected.
- Searching finds matching records, sorting reorders them, and filtering temporarily hides those that do not match.
- Save a query when the same selection is needed again or must feed a form or report.
:::
