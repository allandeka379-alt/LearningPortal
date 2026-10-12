---
{
  "key": "db.normalisation",
  "title": "Normalisation to third normal form",
  "summary": "Why tables are normalised, what functional dependency means, and how to take a table through first, second and third normal form by removing repeating groups, partial dependencies and transitive dependencies, with the keys marked at each step.",
  "concepts": ["acs.db.normalisation"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

A hardware shop in Mutare records every order in one large table. Each row repeats the customer's name and city, and the name and price of every product. When the price of a bag of cement changes, someone must find every row that mentions cement. If one row is missed, the shop has two prices for the same product.

**Normalisation** is the step-by-step process of reorganising the tables of a database so that these problems cannot occur. It is the test you apply to a design after the entity-relationship stage. This lesson explains the problems normalisation removes, the idea of a **functional dependency**, and the three normal forms that you must be able to apply.

You should know the terms primary key, foreign key and composite key from the earlier lessons.

## Key definitions

:::definition{term="Normalisation"}
The process of organising data into tables so that redundancy is removed and update, insertion and deletion anomalies cannot occur.
:::

:::definition{term="Functional dependency"}
Attribute B is functionally dependent on attribute A (written A → B) if each value of A is linked to exactly one value of B. A is called the determinant.
:::

:::definition{term="Partial dependency"}
A non-key attribute that depends on only part of a composite primary key.
:::

:::definition{term="Transitive dependency"}
A non-key attribute that depends on another non-key attribute, so that it depends on the key only indirectly (A → B and B → C, so A → C through B).
:::

## Why normalise: anomalies

A table that is not normalised causes three kinds of **anomaly** (an unwanted side effect when the data is changed).

- **Update anomaly**: the same fact is stored in several rows, and changing it in only some of them leaves the data inconsistent.
- **Insertion anomaly**: a fact cannot be recorded until another fact exists. A new product cannot be stored until somebody orders it.
- **Deletion anomaly**: deleting a row also deletes a fact you wanted to keep. Removing the only order of a customer deletes the customer.

## The starting table

The shop's data is first written as a list in which one order can hold several products. This is **unnormalised** because some cells hold more than one value.

| OrderNo | CustomerID | ProductCode | Quantity |
|:-:|:-:|:-:|:-:|
| 5001 | C10 | P1, P2 | 20, 5 |
| 5002 | C11 | P1 | 10 |
| 5003 | C10 | P3, P1 | 30, 4 |

**First normal form (1NF)** requires that every cell holds a single value (the attributes are **atomic**), there are no repeating groups, and the table has a primary key. Giving every product on an order its own row, and using `OrderNo` with `ProductCode` as the composite key, gives the following table of 7 rows.

| OrderNo | Date | CustomerID | CustomerName | CustomerCity | ProductCode | ProductName | UnitPrice | Quantity |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| 5001 | 2026-03-02 | C10 | Mutare Builders | Mutare | P1 | Cement bag | 12.50 | 20 |
| 5001 | 2026-03-02 | C10 | Mutare Builders | Mutare | P2 | Paint tin | 8.00 | 5 |
| 5002 | 2026-03-02 | C11 | Kariba Supplies | Kariba | P1 | Cement bag | 12.50 | 10 |
| 5003 | 2026-03-04 | C10 | Mutare Builders | Mutare | P3 | Nails (kg) | 2.00 | 30 |
| 5003 | 2026-03-04 | C10 | Mutare Builders | Mutare | P1 | Cement bag | 12.50 | 4 |
| 5004 | 2026-03-05 | C12 | Hwange Traders | Hwange | P2 | Paint tin | 8.00 | 8 |
| 5004 | 2026-03-05 | C12 | Hwange Traders | Hwange | P3 | Nails (kg) | 2.00 | 15 |

## Functional dependencies in the table

Before splitting the table, find what depends on what.

| Determinant | Determines |
|---|---|
| `OrderNo` | `Date`, `CustomerID` |
| `CustomerID` | `CustomerName`, `CustomerCity` |
| `ProductCode` | `ProductName`, `UnitPrice` |
| `OrderNo` and `ProductCode` together | `Quantity` |

## Second normal form (2NF)

A table is in **2NF** if it is in 1NF and has **no partial dependencies**: every non-key attribute depends on the **whole** key. This only matters when the key is composite. Here `Date` depends on `OrderNo` alone, and `ProductName` on `ProductCode` alone, so they depend on part of the key. The fix is to move each partially dependent attribute to a new table with its determinant as the key.

The 1NF table becomes three tables: an order table (with the customer details still in it), a product table, and the order line table, which keeps only what depends on the whole key.

| OrderNo (PK) | Date | CustomerID | CustomerName | CustomerCity |
|:-:|:-:|:-:|:-:|:-:|
| 5001 | 2026-03-02 | C10 | Mutare Builders | Mutare |
| 5002 | 2026-03-02 | C11 | Kariba Supplies | Kariba |
| 5003 | 2026-03-04 | C10 | Mutare Builders | Mutare |
| 5004 | 2026-03-05 | C12 | Hwange Traders | Hwange |

| ProductCode (PK) | ProductName | UnitPrice |
|:-:|:-:|:-:|
| P1 | Cement bag | 12.50 |
| P2 | Paint tin | 8.00 |
| P3 | Nails (kg) | 2.00 |

| OrderNo (PK, FK) | ProductCode (PK, FK) | Quantity |
|:-:|:-:|:-:|
| 5001 | P1 | 20 |
| 5001 | P2 | 5 |
| 5002 | P1 | 10 |
| 5003 | P3 | 30 |
| 5003 | P1 | 4 |
| 5004 | P2 | 8 |
| 5004 | P3 | 15 |

## Third normal form (3NF)

A table is in **3NF** if it is in 2NF and has **no transitive dependencies**: no non-key attribute depends on another non-key attribute. In the order table `CustomerName` and `CustomerCity` depend on `CustomerID`, which is not the key, so the customer details are repeated in every order of that customer. Move them to a `Customer` table keyed on `CustomerID` and leave `CustomerID` behind as a foreign key.

| CustomerID (PK) | CustomerName | CustomerCity |
|:-:|:-:|:-:|
| C10 | Mutare Builders | Mutare |
| C11 | Kariba Supplies | Kariba |
| C12 | Hwange Traders | Hwange |

| OrderNo (PK) | Date | CustomerID (FK) |
|:-:|:-:|:-:|
| 5001 | 2026-03-02 | C10 |
| 5002 | 2026-03-02 | C11 |
| 5003 | 2026-03-04 | C10 |
| 5004 | 2026-03-05 | C12 |

The 3NF design is the `Customer` and `Order` tables above, with the `Product` and `OrderLine` tables from the previous step. It is often remembered as "every non-key attribute depends on the key, the whole key and nothing but the key".

:::worked-solution{title="What did normalisation achieve?"}
1. The original table stores 7 rows × 9 attributes = 63 data items.
2. The four 3NF tables store 51 items. That is 12 fewer items, and the saving grows with each new order.
3. Update anomaly: the price of cement (`P1`) was stored in 3 rows; it is now stored in one row of `Product`.
4. Deletion anomaly: the customer `C12` appeared only in the rows of order 5004, so deleting that order would have deleted the customer. In 3NF the customer is kept in `Customer`.
5. Insertion anomaly: a new product can now be added to `Product` before anyone orders it.
:::

:::worked-solution{title="Checking that no information was lost"}
Joining the four tables on `CustomerID`, `OrderNo` and `ProductCode` rebuilds the original 7 rows exactly, so nothing was lost in the split. This is the test of a correct decomposition: the data can be put back together by following the foreign keys.
:::

## Deciding the normal form of a given table

1. Find the primary key.
2. If any cell holds several values, or there is a repeating group, the table is **not in 1NF**.
3. If the key is composite, check whether any non-key attribute depends on only part of it. If so, the table is **not in 2NF**.
4. Check whether any non-key attribute depends on another non-key attribute. If so, the table is **not in 3NF**.
5. Otherwise the table is in 3NF.

A table with a **single-field** key and atomic values is automatically in 2NF, because a partial dependency needs a composite key.

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge requires normalisation to third normal form (3NF). ZIMSEC requires normalisation up to second normal form (2NF), but the 3NF steps are a useful check. Both boards expect the keys to be marked and the reason for each split to be stated.
:::

## Common mistakes

:::mistake{title="Checking for partial dependency in a table with a single-field key"}
Partial dependency is only possible with a composite key. If the key is one field and the values are atomic, the table is already in 2NF.
:::

:::mistake{title="Leaving the foreign key behind"}
When an attribute is moved to a new table, its determinant stays in the old table as a foreign key. Without it the tables cannot be joined back together.
:::

:::mistake{title="Confusing 2NF and 3NF"}
2NF removes dependence on **part of the key**. 3NF removes dependence on a **non-key attribute**. Name the dependency in your answer.
:::

:::mistake{title="Putting the quantity in the product table"}
`Quantity` depends on the order **and** the product together, so it belongs in the table keyed on both.
:::

## Exam tips

:::exam-tip
Both boards test this in Paper 1 (ZIMSEC databases; Cambridge topic 8). To "**explain** why a table is not in 3NF" write the dependency: "`CustomerName` depends on `CustomerID`, which is not the primary key, so there is a transitive dependency."
:::

:::exam-tip
To "**normalise**" a table, write each resulting table as `Name(PrimaryKey, field, field, ForeignKey)` with the keys marked and say which rule each split follows. To "**state** an anomaly" give an example from the data given, not just the name.
:::

## Summary

:::summary
- Normalisation removes redundancy and the update, insertion and deletion anomalies.
- 1NF: atomic values, no repeating groups, a primary key.
- 2NF: 1NF and no partial dependency on part of a composite key.
- 3NF: 2NF and no transitive dependency on a non-key attribute.
- Each split keeps the determinant as a foreign key so the original data can be joined back together.
:::
