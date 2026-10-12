---
{
  "key": "db.sql-dml",
  "title": "SQL data manipulation language",
  "summary": "Using SELECT with WHERE, ORDER BY, GROUP BY and INNER JOIN, the functions SUM, COUNT and AVG, and the statements INSERT INTO, UPDATE and DELETE FROM, with every result produced by running the query.",
  "concepts": ["acs.db.sql-dml"],
  "estimatedMinutes": 55,
  "level": "core"
}
---
## Introduction

A farmers' co-operative in the Midlands collects maize, beans and cotton from its members every week. The manager wants answers to questions such as "Which farmers are in Gweru?", "How many kilograms of maize did we receive in total?" and "Who delivered the most?". Writing a program for each question would be slow. With **SQL**, each question is a short statement that the database answers at once.

The statements that read and change the data in tables are the **data manipulation language (DML)**: `SELECT`, `INSERT INTO`, `UPDATE` and `DELETE FROM`. This lesson explains each of them with results that were produced by running the statements on the two tables below.

You should know how a table is defined (the DDL lesson) and the meaning of primary key, foreign key and record.

## Key definitions

:::definition{term="Data manipulation language (DML)"}
The part of SQL used to retrieve, add, change and remove the data stored in the tables of a database.
:::

:::definition{term="Query"}
A request to the database, written in SQL, for specific data. A `SELECT` statement is a query.
:::

:::definition{term="Aggregate function"}
A function such as `SUM`, `COUNT` or `AVG` that works on a group of records and returns one value.
:::

## The data

The `Farmer` table lists the members; the `Delivery` table records each delivery, and `FarmerID` is a foreign key.

| FarmerID | Name | District |
|:-:|:-:|:-:|
| F01 | Tendai Moyo | Gweru |
| F02 | Rudo Chikwanha | Mutare |
| F03 | Farai Ncube | Masvingo |
| F04 | Chipo Banda | Gweru |
| F05 | Nyasha Mutasa | Mutare |

| DeliveryID | FarmerID | Crop | Kg | Week |
|:-:|:-:|:-:|:-:|:-:|
| 1 | F01 | Maize | 450 | 1 |
| 2 | F01 | Beans | 120 | 1 |
| 3 | F02 | Maize | 600 | 1 |
| 4 | F03 | Cotton | 300 | 2 |
| 5 | F02 | Beans | 90 | 2 |
| 6 | F04 | Maize | 520 | 2 |
| 7 | F01 | Maize | 380 | 3 |
| 8 | F05 | Beans | 150 | 3 |
| 9 | F03 | Maize | 410 | 3 |
| 10 | F04 | Beans | 75 | 3 |
| 11 | F02 | Maize | 540 | 3 |

## SELECT, FROM and WHERE

`SELECT` lists the fields to show, `FROM` names the table, and `WHERE` keeps only the records that meet a condition. Text values are written in single quotes. `SELECT *` shows all fields. The comparison operators are `=`, `<>`, `<`, `<=`, `>`, `>=`, and conditions are combined with `AND` and `OR`.

```
SELECT Name, District
FROM Farmer
WHERE District = 'Gweru';
```

| Name | District |
|:-:|:-:|
| Tendai Moyo | Gweru |
| Chipo Banda | Gweru |

```
SELECT Name
FROM Farmer
WHERE District = 'Mutare' OR District = 'Masvingo'
ORDER BY Name;
```

| Name |
|:-:|
| Farai Ncube |
| Nyasha Mutasa |
| Rudo Chikwanha |

## ORDER BY

`ORDER BY` sorts the result. The default is ascending (`ASC`); `DESC` gives descending order. A sort on a text field is alphabetical.

```
SELECT DeliveryID, Crop, Kg
FROM Delivery
WHERE Kg > 400
ORDER BY Kg DESC;
```

| DeliveryID | Crop | Kg |
|:-:|:-:|:-:|
| 3 | Maize | 600 |
| 11 | Maize | 540 |
| 6 | Maize | 520 |
| 1 | Maize | 450 |
| 9 | Maize | 410 |

## Aggregate functions

`COUNT` counts records, `SUM` adds the values of a numeric field, and `AVG` finds the mean. They give one row for the whole set of records selected by the `WHERE` clause.

```
SELECT COUNT(*), SUM(Kg), AVG(Kg)
FROM Delivery
WHERE Crop = 'Beans';
```

| COUNT(*) | SUM(Kg) | AVG(Kg) |
|:-:|:-:|:-:|
| 4 | 435 | 108.75 |

:::worked-solution{title="Checking an aggregate query by hand"}
1. The `WHERE` clause keeps the deliveries whose crop is Beans: delivery 2 (120 kg), delivery 5 (90 kg), delivery 8 (150 kg) and delivery 10 (75 kg).
2. `COUNT(*)` counts these records: 4.
3. `SUM(Kg)` = 120 + 90 + 150 + 75 = 435.
4. `AVG(Kg)` = 435 ÷ 4 = 108.75.
:::

## GROUP BY

`GROUP BY` puts the records with the same value of a field into a group and applies the aggregate function to each group separately. Every field in the `SELECT` list that is not inside an aggregate function must also appear in the `GROUP BY` clause.

```
SELECT Crop, SUM(Kg)
FROM Delivery
GROUP BY Crop;
```

| Crop | SUM(Kg) |
|:-:|:-:|
| Beans | 435 |
| Cotton | 300 |
| Maize | 2900 |

There are three crops, so there are three rows. Maize totals 2900 kg.

## INNER JOIN

Data about one delivery and the farmer who made it is in two tables. `INNER JOIN ... ON` combines each record of one table with the records of the other where the two fields in the `ON` condition are equal, normally the foreign key and the primary key. Fields that exist in both tables are written as `Table.Field`.

```
SELECT Farmer.Name, Delivery.Crop, Delivery.Kg
FROM Farmer
INNER JOIN Delivery ON Farmer.FarmerID = Delivery.FarmerID
WHERE Delivery.Crop = 'Maize'
ORDER BY Delivery.Kg DESC;
```

| Name | Crop | Kg |
|:-:|:-:|:-:|
| Rudo Chikwanha | Maize | 600 |
| Rudo Chikwanha | Maize | 540 |
| Chipo Banda | Maize | 520 |
| Tendai Moyo | Maize | 450 |
| Farai Ncube | Maize | 410 |
| Tendai Moyo | Maize | 380 |

Farmers with no delivery of maize do not appear (Nyasha Mutasa has no maize delivery), because an inner join keeps only the rows with a match. A join can be combined with `GROUP BY`.

```
SELECT Farmer.Name, SUM(Delivery.Kg)
FROM Farmer
INNER JOIN Delivery ON Farmer.FarmerID = Delivery.FarmerID
GROUP BY Farmer.Name
ORDER BY SUM(Delivery.Kg) DESC;
```

| Name | SUM(Delivery.Kg) |
|:-:|:-:|
| Rudo Chikwanha | 1230 |
| Tendai Moyo | 950 |
| Farai Ncube | 710 |
| Chipo Banda | 595 |
| Nyasha Mutasa | 150 |

:::worked-solution{title="Reading the join and group query"}
1. The join matches every delivery with its farmer using `FarmerID`.
2. `GROUP BY Farmer.Name` makes one group for each farmer.
3. `SUM(Delivery.Kg)` adds the kilograms in each group; Rudo Chikwanha's deliveries are 600 + 90 + 540 = 1230 kg.
4. `ORDER BY SUM(Delivery.Kg) DESC` puts the largest total first, so Rudo Chikwanha is at the top.
:::

## INSERT INTO, UPDATE and DELETE FROM

These statements change the data. After each, a `SELECT` shows the table.

**INSERT INTO** adds a record. The fields and values are listed in the same order.

```
INSERT INTO Delivery (DeliveryID, FarmerID, Crop, Kg, Week)
VALUES (12, 'F05', 'Maize', 260, 4);
```

| DeliveryID | FarmerID | Crop | Kg | Week |
|:-:|:-:|:-:|:-:|:-:|
| 12 | F05 | Maize | 260 | 4 |

**UPDATE** changes the values in the records chosen by `WHERE`. The result after the statement below shows the new value of delivery 1.

```
UPDATE Delivery
SET Kg = 480
WHERE DeliveryID = 1;
```

| DeliveryID | Kg |
|:-:|:-:|
| 1 | 480 |

**DELETE FROM** removes the records chosen by `WHERE`. This statement removes the week 1 delivery of beans, so a count of the records afterwards gives 10 instead of 11.

```
DELETE FROM Delivery
WHERE Week = 1 AND Crop = 'Beans';
```

:::mistake{title="UPDATE or DELETE without WHERE"}
Without a `WHERE` clause, `UPDATE` changes **every** record and `DELETE FROM` removes **every** record. Always check the `WHERE` clause first.
:::

## Writing a query

1. Decide which table or tables hold the data. If two tables are needed, join them on the foreign key.
2. List the fields in `SELECT` (an aggregate function if a total, count or mean is needed).
3. Add `WHERE` for the condition, `GROUP BY` for per-group results, `ORDER BY` for the order.
4. Write the clauses in this order: `SELECT`, `FROM`, `WHERE`, `GROUP BY`, `ORDER BY`.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards expect `SELECT ... FROM`, `WHERE`, `ORDER BY`, `GROUP BY`, `INNER JOIN`, `SUM`, `COUNT`, `AVG`, `INSERT INTO`, `UPDATE` and `DELETE FROM` on at most two tables, and prediction of the output of a given query. The queries here were run on SQLite; results in the examination are the same for this subset, but the layout of a result table may differ.
:::

## Common mistakes

:::mistake{title="Forgetting quotation marks on text"}
`WHERE District = Gweru` is wrong. Text values are in single quotes: `'Gweru'`.
:::

:::mistake{title="Selecting an extra field with GROUP BY"}
`SELECT Crop, Name, SUM(Kg) ... GROUP BY Crop` is wrong: `Name` is neither grouped nor aggregated.
:::

:::mistake{title="Joining without the ON condition"}
Without matching the foreign key to the primary key in `ON`, every record is paired with every other record and the result is meaningless.
:::

:::mistake{title="Using = to compare with a range"}
Use `>` and `<` for ranges. `Kg = 400` finds only the deliveries of exactly 400.
:::

## Exam tips

:::exam-tip
Appears in Cambridge Paper 1 (topic 8) and ZIMSEC Papers 1 and 2. To "**state the output**" of a query, work through it in steps: join, `WHERE`, group, calculate, sort. Write the column headings and every row.
:::

:::exam-tip
To "**write a query**", write each clause on its own line in the correct order, end with a semicolon, put text in single quotes and use `Table.Field` when a field name occurs in both tables. Give a mark for each clause you write.
:::

## Summary

:::summary
- `SELECT fields FROM table WHERE condition ORDER BY field` retrieves and sorts records; `DESC` reverses the order.
- `COUNT`, `SUM` and `AVG` give one value for a set of records; `GROUP BY` gives one value for each group.
- `INNER JOIN table ON key = key` combines two tables; unmatched records are left out.
- `INSERT INTO`, `UPDATE ... SET ... WHERE` and `DELETE FROM ... WHERE` change the data.
- Without `WHERE`, `UPDATE` and `DELETE FROM` affect every record.
:::
