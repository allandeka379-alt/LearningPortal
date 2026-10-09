---
{
  "key": "db.advanced-queries",
  "title": "Multi-table queries and linking a database to a program",
  "summary": "How to query related tables with a join, add calculated fields, ask for a value at run time with a parameter query, group records with totals, and connect a database to a program so that it can read and update records safely.",
  "concepts": ["comp.db.advanced-queries"],
  "estimatedMinutes": 55,
  "level": "core"
}
---
## Introduction

Thandeka sells eggs, honey and maize meal from her family's farm shop near Gweru. Her database has two linked tables: `Products`, with the price of each product, and `Sales`, with one record for each sale. A single-table query can list the sales, but it cannot say what each sale was worth, because the quantity is in one table and the price in the other.

In Form 4, ZIMSEC asks you to create queries based on several tables and to link a database to the modules of a project. The Paper 5 project is a program built on a relational database, so you need to know how a program connects to the database, runs queries and updates records. This lesson builds on single-table SQL and on primary and foreign keys.

## Key definitions

:::definition{term="Join"}
An operation in a query that combines records from two or more tables by matching the values of a related field, usually a foreign key with the primary key it refers to.
:::

:::definition{term="Calculated field"}
A field in the results of a query whose value is worked out from other fields, such as `Quantity * UnitPrice`, rather than being stored in a table.
:::

:::definition{term="Parameter query"}
A query that asks the user for a value each time it runs and uses that value in its condition, so one saved query can answer many similar questions.
:::

:::definition{term="Grouping"}
Collecting the records that share a value into groups and calculating one summary result, such as a SUM or COUNT, for each group.
:::

:::definition{term="Database connection"}
A link opened by a program to a database, through which the program sends SQL statements and receives results until the link is closed.
:::

## The two tables

| ProductID | ProductName | UnitPrice |
|:-:|:-:|:-:|
| F1 | Eggs (tray) | 6 |
| F2 | Honey (jar) | 4 |
| F3 | Maize meal (10 kg) | 9 |

| SaleID | ProductID | Quantity | SaleDay |
|:-:|:-:|:-:|:-:|
| 851 | F1 | 3 | Monday |
| 852 | F3 | 2 | Monday |
| 853 | F2 | 5 | Tuesday |
| 854 | F1 | 4 | Tuesday |
| 855 | F3 | 1 | Wednesday |
| 856 | F1 | 2 | Wednesday |

`ProductID` is the primary key of `Products` and a foreign key in `Sales`. A query that joins the tables on this field can use a product's name and price alongside each sale.

## Joining tables and calculated fields

In SQL, the join is written after FROM. Because both tables contain a field called `ProductID`, each field is written with its table name and a dot (`Sales.ProductID`) so the query knows which one is meant. A calculated field is an expression after SELECT; `AS` gives its column a name.

:::worked-solution[A join with a calculated field]
```
SELECT Sales.SaleID, Products.ProductName, Sales.Quantity, Sales.Quantity * Products.UnitPrice AS LineTotal
FROM Sales
INNER JOIN Products ON Sales.ProductID = Products.ProductID
WHERE Sales.SaleDay = 'Tuesday';
```

1. Join: each sale is matched with the product whose ProductID is the same, so sale 853 (F2) is paired with Honey at 4 dollars.
2. Filter: only Tuesday's sales remain: 853 and 854.
3. Calculate: LineTotal = Quantity × UnitPrice. Sale 853: 5 × 4 = 20. Sale 854 (eggs): 4 × 6 = 24.

| SaleID | ProductName | Quantity | LineTotal |
|:-:|:-:|:-:|:-:|
| 853 | Honey (jar) | 5 | 20 |
| 854 | Eggs (tray) | 4 | 24 |

LineTotal is not stored anywhere. It is calculated each time the query runs, so if the price of honey changes, the result changes with it.
:::

In a database package's design view, the same join appears as a line between the two tables, and a calculated field is typed into the Field row, for example `LineTotal: [Quantity]*[UnitPrice]`.

## Grouping with totals

GROUP BY puts records with the same value together and gives one result row for each group.

:::worked-solution[Total sold of each product]
```
SELECT Products.ProductName, SUM(Sales.Quantity) AS TotalSold
FROM Sales
INNER JOIN Products ON Sales.ProductID = Products.ProductID
GROUP BY Products.ProductName
ORDER BY TotalSold DESC;
```

1. Group the joined records by product: eggs (sales 851, 854, 856), honey (853), maize meal (852, 855).
2. Sum each group's quantities: eggs 3 + 4 + 2 = 9; honey 5; maize meal 2 + 1 = 3.
3. Sort by TotalSold, largest first.

| ProductName | TotalSold |
|:-:|:-:|
| Eggs (tray) | 9 |
| Honey (jar) | 5 |
| Maize meal (10 kg) | 3 |
:::

## Parameter queries

Instead of saving a separate query for each day, Thandeka saves one query whose condition is a **parameter**. In a database package the condition is written in square brackets, such as `[Enter the day]`; when the query runs, a box shows that prompt, she types Wednesday, and the query returns sales 855 and 856. Parameter queries are often used behind forms and reports, for example "report of sales for the day entered".

## Connecting a database to a program

A program, such as the one in a ZIMSEC project, uses a database in five steps:

1. **Connect**: open a connection to the database file or server.
2. **Send SQL**: run a SELECT, INSERT, UPDATE or DELETE statement.
3. **Use the results**: read the returned records one by one, usually in a loop, and display or process them.
4. **Commit**: save the changes made by INSERT, UPDATE or DELETE.
5. **Close**: close the connection when the program has finished with it.

Values typed by the user should be passed as **parameters** (placeholders) rather than joined into the SQL text. The database then treats them strictly as data, which prevents SQL injection, where a user types SQL code into an input box to change what the statement does.

:::example{title="A short Python program using a database"}
This Python program uses the built-in `sqlite3` module. The `?` marks are placeholders, filled from the values given after the SQL.

```
import sqlite3

connection = sqlite3.connect(":memory:")
cursor = connection.cursor()
cursor.execute("CREATE TABLE Members (MemberID TEXT, MemberName TEXT, Town TEXT)")
cursor.executemany("INSERT INTO Members VALUES (?, ?, ?)",
                   [("M1", "Rudo", "Gweru"), ("M2", "Farai", "Kwekwe"), ("M3", "Chipo", "Gweru")])
connection.commit()

town = "Gweru"
cursor.execute("SELECT MemberName FROM Members WHERE Town = ? ORDER BY MemberName", (town,))
for row in cursor.fetchall():
    print(row[0])

cursor.execute("UPDATE Members SET Town = ? WHERE MemberID = ?", ("Gweru", "M2"))
connection.commit()
cursor.execute("SELECT COUNT(*) FROM Members WHERE Town = ?", (town,))
print("Members in", town, ":", cursor.fetchone()[0])
connection.close()
```

Output:

```
Chipo
Rudo
Members in Gweru : 3
```

- The SELECT returns the two Gweru members in alphabetical order, and the `for` loop prints each one.
- The UPDATE moves Farai (M2) to Gweru; after the commit, the count of Gweru members is 3.
- A Visual Basic project follows the same steps with a connection object, a command object holding the SQL and a reader that loops through the results.
:::

## Common mistakes

:::mistake{title="Joining without a matching condition"}
Joining two tables with no `ON` condition pairs every record with every other record. Always match the foreign key to the primary key it refers to.
:::

:::mistake{title="Storing a value that can be calculated"}
A LineTotal field typed into the Sales table goes wrong as soon as a price changes. Calculate it in a query instead.
:::

:::mistake{title="Building SQL by joining user input into the text"}
Putting typed input straight into the SQL string allows SQL injection. Pass input as parameters.
:::

## Exam tips

:::exam-tip
When asked for the output of a join, first write the joined rows (each sale with its product's details), then apply WHERE, then any calculation, grouping and sorting. Show the multiplication for each calculated value.
:::

:::exam-tip
To *explain* a parameter query, say that it prompts the user for a value when it runs and uses that value in the criteria, so one query replaces many.
:::

## Summary

:::summary
- A join combines related tables by matching a foreign key with the primary key it refers to.
- A calculated field, such as `Quantity * UnitPrice AS LineTotal`, is worked out when the query runs and is not stored.
- GROUP BY gives one result row per group, with SUM or COUNT for each group.
- A parameter query prompts for a value at run time and uses it in the condition.
- A program connects, sends SQL, reads the results, commits changes and closes the connection; user input is passed as parameters to prevent SQL injection.
:::
