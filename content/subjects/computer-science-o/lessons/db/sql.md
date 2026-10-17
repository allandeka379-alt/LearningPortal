---
{
  "key": "db.sql",
  "title": "Querying a table with SQL",
  "summary": "How to read, complete and write SQL queries on a single table with SELECT, FROM, WHERE, AND, OR, ORDER BY, SUM and COUNT, and how to work out exactly what a query outputs from given data.",
  "concepts": ["comp.db.sql"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

Rudo manages a plant nursery in Harare. Her stock table holds every plant she sells, but on a busy Saturday she needs quick answers: which herbs are in stock, how many indoor plants cost less than 7 dollars, how many trees and shrubs she has altogether. Scrolling through the table by eye is slow and easy to get wrong. Instead she asks the database a **query**.

**Structured Query Language (SQL)** is the standard language for asking a database for data. A query names the fields you want, the table they come from, the condition records must meet and the order of the results. Cambridge 0478 Paper 2 asks you to read, complete and write SQL for one table and to state its output exactly. ZIMSEC asks you to design and run the same kinds of query in a database package, and SQL is the clearest way to write them down.

## Key definitions

:::definition{term="Query"}
A request for data from a database that returns only the fields and records that meet given conditions, in a given order.
:::

:::definition{term="SQL (Structured Query Language)"}
A standard language used to write queries that search, sort and summarise data held in database tables.
:::

:::definition{term="Search condition"}
An expression after WHERE that is TRUE or FALSE for each record; only records for which it is TRUE are included in the results.
:::

:::definition{term="Aggregate function"}
A function that returns one value calculated from many records: SUM adds the values of a numeric field and COUNT counts the records.
:::

## The parts of a query

| Keyword | Purpose | Example |
|:--|:--|:--|
| SELECT | the fields to show, separated by commas | `SELECT PlantName, Price` |
| FROM | the table the data comes from | `FROM Plants` |
| WHERE | the condition each record must meet | `WHERE Stock < 20` |
| ORDER BY … ASC | sort the results in ascending order (A to Z, smallest first) | `ORDER BY PlantName ASC` |
| ORDER BY … DESC | sort the results in descending order (Z to A, largest first) | `ORDER BY Price DESC` |
| AND, OR | join two conditions | `WHERE Type = 'Herb' AND Indoor = TRUE` |
| SUM( ) | total of a numeric field over the selected records | `SELECT SUM(Stock)` |
| COUNT( ) | number of selected records | `SELECT COUNT(*)` |

A query is written in this order: SELECT, FROM, WHERE, ORDER BY, ending with a semicolon. Text values go in single quotes (`'Herb'`); numbers and the Boolean values TRUE and FALSE do not. The comparison operators are the same as in pseudocode: `=`, `<>`, `<`, `<=`, `>`, `>=`.

Here is Rudo's table, which the examples below use.

| PlantID | PlantName | Type | Price | Stock | Indoor |
|:-:|:-:|:-:|:-:|:-:|:-:|
| PL01 | Basil | Herb | 3 | 64 | TRUE |
| PL02 | Msasa | Tree | 18 | 7 | FALSE |
| PL03 | Aloe | Succulent | 6 | 23 | TRUE |
| PL04 | Rosemary | Herb | 4 | 38 | FALSE |
| PL05 | Bougainvillea | Shrub | 9 | 16 | FALSE |
| PL06 | Mint | Herb | 2 | 52 | TRUE |
| PL07 | Jacaranda | Tree | 21 | 5 | FALSE |
| PL08 | Snake plant | Succulent | 8 | 29 | TRUE |

## Working out the output of a query

Work through a query in three steps: **filter** the records with WHERE, **sort** them with ORDER BY, then **show** only the fields named after SELECT.

![SQL query stages on Rudo's plants table: WHERE Type = 'Herb' keeps Basil, Rosemary and Mint; ORDER BY Price DESC puts Rosemary (4), Basil (3), Mint (2) in that order; SELECT PlantName, Price shows only those two fields](media:diagrams/sql-query-filter-sort-show.png "Figure: a query filters with WHERE, sorts with ORDER BY, then shows only the SELECT fields")

:::worked-solution[Selecting and sorting]
```
SELECT PlantName, Price
FROM Plants
WHERE Type = 'Herb'
ORDER BY Price DESC;
```

1. Filter: the records with Type equal to 'Herb' are Basil, Rosemary and Mint.
2. Sort by Price, largest first: Rosemary (4), Basil (3), Mint (2).
3. Show only PlantName and Price, in that order:

| PlantName | Price |
|:-:|:-:|
| Rosemary | 4 |
| Basil | 3 |
| Mint | 2 |

PlantID, Type, Stock and Indoor are used for nothing here, so they are not shown. A field can be used in WHERE or ORDER BY without being listed after SELECT.
:::

## Combining conditions with AND and OR

With **AND**, a record is included only when both conditions are TRUE. With **OR**, it is included when at least one condition is TRUE. Be careful with everyday English: "show the trees and the shrubs" means records where Type is 'Tree' **OR** Type is 'Shrub'. Writing `WHERE Type = 'Tree' AND Type = 'Shrub'` returns no records at all, because no single plant has two types.

## SUM and COUNT

SUM and COUNT return one value, calculated from the records that pass the WHERE condition. `COUNT(*)` counts records; `SUM(Field)` adds up a numeric field. Neither lists the records themselves.

:::worked-solution[Counting and totalling]
```
SELECT COUNT(*)
FROM Plants
WHERE Indoor = TRUE AND Price < 7;
```

1. Indoor plants: Basil (3), Aloe (6), Mint (2) and Snake plant (8).
2. Of these, a price below 7 leaves Basil, Aloe and Mint: Snake plant fails the second condition.
3. The output is **3**, the number of records, not a list of plants.

```
SELECT SUM(Stock)
FROM Plants
WHERE Type = 'Tree' OR Type = 'Shrub';
```

1. Trees and shrubs: Msasa (7), Bougainvillea (16) and Jacaranda (5).
2. Add their Stock values: 7 + 16 + 5 = **28**.
:::

## Writing a query from a request

:::example{title="From a manager's request to SQL"}
Rudo asks: "List the names and stock levels of every plant with fewer than 20 in stock, in alphabetical order of name."

- Fields to show: PlantName and Stock, so `SELECT PlantName, Stock`.
- Table: `FROM Plants`.
- Condition: fewer than 20, so `WHERE Stock < 20` (not `<=`, since exactly 20 is not fewer than 20).
- Order: alphabetical means ascending on PlantName, so `ORDER BY PlantName ASC`.

```
SELECT PlantName, Stock
FROM Plants
WHERE Stock < 20
ORDER BY PlantName ASC;
```

| PlantName | Stock |
|:-:|:-:|
| Bougainvillea | 16 |
| Jacaranda | 5 |
| Msasa | 7 |
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge 0478 limits SQL to one table and the keywords SELECT, FROM, WHERE, ORDER BY (ascending and descending), SUM, COUNT, AND and OR, written on paper. ZIMSEC learners also build queries in a database package, often with a design grid: each field is placed in a column, conditions such as `<20` go in the Criteria row, the Sort row is set to Ascending or Descending, and the Show box decides whether the field appears in the results. The grid produces the same SQL.
:::

## Common mistakes

:::mistake{title="Showing fields that were not selected"}
The output contains only the fields listed after SELECT, in that order, even if WHERE or ORDER BY used other fields.
:::

:::mistake{title="Using AND when the request means OR"}
"Trees and shrubs" means either type. `Type = 'Tree' AND Type = 'Shrub'` can never be TRUE for one record.
:::

:::mistake{title="Confusing SUM and COUNT"}
COUNT gives the number of records; SUM adds the values in a field. Counting 3 records is not the same as their stock adding to 28.
:::

:::mistake{title="Forgetting quotation marks around text"}
Write `Type = 'Herb'`. Without quotes, Herb would be read as the name of a field.
:::

## Exam tips

:::exam-tip
When asked for the output, write it as a table with the selected field names as headings, in the sorted order. Check every record against the condition: examiners include records that meet only one half of an AND.
:::

:::exam-tip
When asked to *write* a query, put each clause on its own line (SELECT, FROM, WHERE, ORDER BY), spell field and table names exactly as given, and check that < or <= matches words such as "below", "at least" and "or more".
:::

## Summary

:::summary
- A query is written SELECT fields, FROM table, WHERE condition, ORDER BY field ASC or DESC.
- To find the output: filter with WHERE, sort with ORDER BY, then show only the selected fields.
- AND needs both conditions TRUE; OR needs at least one.
- `SUM(Field)` totals a numeric field and `COUNT(*)` counts records; each returns a single value.
- Text values go in single quotes; numbers and TRUE/FALSE do not.
:::
