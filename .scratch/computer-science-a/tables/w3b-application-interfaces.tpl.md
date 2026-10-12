---
{
  "key": "db.application-interfaces",
  "title": "Database applications and accessing data from programs",
  "summary": "Building forms, queries and reports with the tools of a DBMS, linking a Python program to a database, using parameterised queries to prevent SQL injection, and the stages of developing a small database application.",
  "concepts": ["acs.db.application-interfaces"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

A school secretary does not type SQL. She opens a form, types a learner's name into boxes, presses a button, and later prints a class list. Behind the screen there is a database, but she sees only a **database application**: a program built on top of the database that gives ordinary users a simple way to enter, find and report data.

This lesson shows the two ways such applications are built: with the **tools of a DBMS** (forms, queries and reports) and with a **program written in a high-level language** such as Python that connects to the database. It explains a serious security risk, **SQL injection**, and how a **parameterised query** prevents it. It ends with the stages of building a small application for a school or a business.

You should know SQL `SELECT`, `INSERT`, `UPDATE` and `DELETE`, and the basics of Python (variables, loops, functions).

## Key definitions

:::definition{term="Database application"}
A program that gives users a friendly interface to a database, so that they can enter, find, change and report data without writing SQL.
:::

:::definition{term="Form, query and report"}
A **form** is a screen for entering or viewing one record at a time. A **query** is a saved request for data. A **report** is a formatted output of data, usually printed, that can be grouped and can show totals.
:::

:::definition{term="SQL injection"}
An attack in which a user types SQL code into an input box, so that the program builds and runs a statement that the programmer did not intend.
:::

:::definition{term="Parameterised query"}
An SQL statement that contains placeholders instead of the values; the values are sent to the database separately, so that they can only be treated as data and never as SQL code.
:::

## Building with the tools of a DBMS

Most database systems have a developer interface for building an application without writing a full program.

| Object | What it does | Example in a school |
|---|---|---|
| Table | Stores the data | `Learner`, `Mark` |
| Form | Entry and viewing of one record; can contain drop-down lists and validation | A screen for enrolling a new learner |
| Query | Selects, sorts, joins and calculates | All learners in form 5B with a mark below 50 |
| Report | Produces a formatted listing, grouped, with totals and page headings | A class list with the average mark for each form |
| Menu or switchboard | Buttons that open the forms and reports | A main menu for the secretary |

A form is linked to a table or a query, so its boxes are **bound** to fields. Validation rules set in the table apply to the form too. A report is usually based on a query, so that the data is selected and sorted before it is formatted.

## Linking a program to a database

When the application needs more than the DBMS tools offer (a web page, a mobile app, a calculation), a program in a high-level language **connects** to the database, sends SQL statements, and receives the results. In Python the standard `sqlite3` library does this. The steps are:

1. Connect to the database (`connect`) and create a **cursor**.
2. Execute an SQL statement with `execute`.
3. For a `SELECT`, read the rows with `fetchone` or `fetchall`.
4. For `INSERT`, `UPDATE` or `DELETE`, save the changes with `commit`.
5. Close the connection.

{{prog1}}

The output of this program is shown below. The learners in form 5B are Banda and Chuma, and the mean mark of the four learners is (64 + 72 + 58 + 81) ÷ 4.

{{out1}}

In the second example a mark is changed. The program reports the number of records changed, which is useful for checking that the `WHERE` clause matched one record.

{{prog2}}

{{out2}}

## SQL injection and parameterised queries

The simplest way to build a query is to join pieces of text together. This is dangerous when part of the text comes from the user.

{{prog3}}

{{out3}}

:::worked-solution{title="Why did the unsafe query match two records?"}
1. The user typed the text `x' OR '1'='1` in the PIN box.
2. The program joined it into the statement, which became the first line of the output above: `{{injected}}`.
3. In SQL, `AND` is evaluated before `OR`. The condition is `(UserName = 'nobody' AND Pin = 'x') OR '1'='1'`. The second part, `'1'='1'`, is always true, so every record matches.
4. The count is 2, the number of accounts, so a person who knows no PIN would appear to be accepted.
5. The parameterised query uses `?` placeholders. The whole text is sent as a value to be compared with the PIN, not as SQL. No account has that PIN, so the count is 0.
:::

Defences against SQL injection:

- use parameterised queries (placeholders), never string joining, for any value from a user;
- validate inputs (type, length, allowed characters);
- give the application's database account only the rights it needs;
- do not show detailed database error messages to users.

## Stages of building a small database application

| Stage | Work done | Example |
|---|---|---|
| 1. Requirements | Find out what data is stored and what outputs are needed | The clinic needs patient records and a daily appointment list |
| 2. Database design | Entities, relationships, tables in third or second normal form, keys | `Patient`, `Appointment`, `Doctor` |
| 3. Build the tables | Create tables with data types and validation | `CREATE TABLE` statements |
| 4. Build the interface | Forms for entry, queries, reports and a menu | Appointment entry form |
| 5. Test | Test with normal, abnormal and extreme data, and with several users | Enter a date in the past |
| 6. Document and train | A user guide and technical documentation; train the staff | A one-page guide for receptionists |
| 7. Implement and maintain | Install, back up the data regularly, correct faults | Weekly backup |

:::keyfact{title="ZIMSEC only"}
This lesson is ZIMSEC only (Form 5): building forms, queries and reports, linking a high-level language such as Python to a database, parameterised queries and the stages of building an application. Cambridge AS Level does not examine it as a separate topic.
:::

## Common mistakes

:::mistake{title="Building the SQL by joining user input"}
Joining the user's text into the statement lets the user change the meaning of the statement. Use placeholders.
:::

:::mistake{title="Forgetting to commit"}
After `INSERT`, `UPDATE` or `DELETE` the changes are not saved until `commit` is called. They are lost when the connection closes.
:::

:::mistake{title="Confusing a form and a report"}
A **form** is for entering and viewing records on screen. A **report** is formatted output, usually printed, with grouping and totals.
:::

:::mistake{title="Treating validation as a defence against injection by itself"}
Validation helps but it is not enough. The reliable defence is a parameterised query.
:::

## Exam tips

:::exam-tip
In ZIMSEC Paper 1 and Paper 2, questions ask you to "**describe** the stages of building a database application" (name each stage and say what is done), "**explain** SQL injection" (user input is run as SQL) and "**complete** a program" that connects to a database. Know the sequence connect, execute, fetch, commit, close.
:::

:::exam-tip
For "**state** how to prevent SQL injection", write: "use parameterised queries, with placeholders for the values, so that the input is treated only as data". Add input validation as a second measure.
:::

## Summary

:::summary
- A database application hides SQL behind forms, queries and reports built with the DBMS tools.
- A high-level language such as Python can connect to a database: connect, execute, fetch, commit, close.
- SQL injection is user input that changes the meaning of an SQL statement built by joining text.
- A parameterised query uses placeholders, so input is data only; this is the reliable defence.
- Stages: requirements, design, build tables, build interface, test, document and train, implement and maintain.
:::
