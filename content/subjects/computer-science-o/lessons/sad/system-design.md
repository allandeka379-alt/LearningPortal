---
{
  "key": "sad.system-design",
  "title": "System design: inputs, outputs, files and system flowcharts",
  "summary": "The activities of the design stage: designing input forms and data capture, output screens and reports, user interfaces, files and database tables, system flowcharts (described in words) and pseudocode algorithms for the new system, plus the test plan.",
  "concepts": ["comp.sad.system-design"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Nyasha has finished analysing the manual booking system of a bus company in Bulawayo and has a requirements specification. Before a single line of code is written, she must decide what the booking screen will look like, what a ticket will show, which tables the database needs and how the program will check that a seat is free. This is the **design stage**: it turns the requirements into a detailed plan that programmers can build and testers can check.

ZIMSEC Form 3 asks you to describe the activities of the design stage, to design inputs, outputs, user interfaces, file structures and tables, and to construct system flowcharts and pseudocode. Paper 2 often gives a scenario and asks you to design a data capture form, list the fields of a file with their data types, or describe a system flowchart.

## Key definitions

:::definition{term="System design"}
The stage of the SDLC in which the analyst plans exactly how the new system will work: its inputs, outputs, user interface, data storage, processes and testing.
:::

:::definition{term="Data capture form"}
A paper or on-screen form used to collect data in a structured way so that it can be entered into a computer accurately.
:::

:::definition{term="Data dictionary"}
A table describing each field of a file or database table: its name, data type, length or format, validation and an example.
:::

:::definition{term="System flowchart"}
A diagram showing the overall flow of data through a whole system: the inputs, the main processes, the files and storage used and the outputs, using standard symbols.
:::

## Activities in the design stage

1. **Input design**: what data is collected, how (keyboard, scanner, form) and how it is validated.
2. **Output design**: screen displays and printed reports, their layout and content.
3. **User interface design**: menus, forms, buttons and navigation.
4. **File and database design**: tables, fields, data types, key fields and validation.
5. **Process design**: system flowcharts and algorithms (pseudocode or program flowcharts).
6. **Test plan**: what will be tested, the test data and the expected results.
7. **Security design**: user accounts, access levels and backups.

## Designing inputs

A good data capture form or input screen:

- has a clear **title** and short **instructions**;
- groups related fields logically, in the same order as the source document;
- uses **boxes** for each character where handwriting is captured (for example a date as DD/MM/YYYY);
- uses **tick boxes, drop-down lists or option buttons** for fixed choices (gender, class, route), which reduces typing errors;
- shows **validation** messages close to the field;
- has buttons to **submit**, **clear** and **cancel**.

## Designing outputs

Output design decides **what** is shown, **to whom** and **in what format** (screen, printed report, ticket, SMS). A good report has a title, the date, clear column headings, totals where needed and page numbers. Only the information the user needs should be shown; personal data should appear only on outputs for authorised users.

## Designing the user interface

Interfaces should be consistent (the same colours, fonts and button positions on every screen), simple, readable (good contrast, a suitable font size) and forgiving (confirmation before deleting, an undo option, helpful error messages). Different users may need different interfaces: a ticket clerk needs speed and keyboard shortcuts; a member of the public needs clear menus.

## Designing files and tables

Each file or table is described in a **data dictionary**:

| Field name | Data type | Length / format | Validation | Example |
|:--|:--|:--|:--|:--|
| BookingID | Text | 7 characters, `BK` + 5 digits | Format check | BK00417 |
| PassengerName | Text | Up to 40 characters | Presence check | Rudo Moyo |
| Route | Text | Up to 25 characters | Chosen from a list | Bulawayo–Harare |
| TravelDate | Date | DD/MM/YYYY | Must not be in the past | 14/12/2026 |
| SeatNumber | Integer | 1 to 60 | Range check | 23 |
| Paid | Boolean | Yes/No | — | Yes |

**BookingID** is the **primary key**: it is unique for every booking, so each record can be identified.

## System flowcharts

A system flowchart shows the whole system at a high level. Common symbols (described in words):

| Symbol | Shape | Meaning |
|:--|:--|:--|
| Process | A rectangle | A computer process, e.g. *Update bookings* |
| Document | A rectangle with a wavy bottom edge | A printed document or report, e.g. a ticket |
| Manual input | A rectangle whose top edge slopes upwards to the right | Data keyed in by a user |
| Online storage (disk) | A cylinder | A file or database on disk |
| Display | A shape with a curved right side and a pointed left side | Output shown on a screen |
| Flow line | An arrow | The direction in which data flows |

:::example{title="A system flowchart for bus bookings"}
The system flowchart for the booking system is described as:

1. **Manual input**: the clerk keys in the passenger's name, route, date and seat → process 2.
2. **Process**: *Validate and check seat* reads the **Bookings file (online storage)** → if the seat is free, process 3; if not, display 5.
3. **Process**: *Save booking* writes to the **Bookings file** → document 4.
4. **Document**: a printed ticket for the passenger.
5. **Display**: the message "Seat already booked" on the clerk's screen.

A separate weekly process reads the Bookings file and produces a **document**: the passenger list for each bus.
:::

## Designing algorithms

The processes in the system flowchart are then designed in detail as algorithms, usually in pseudocode, so that programmers know exactly what to write.

:::worked-solution[Designing the seat check]
Write an algorithm that checks whether a seat is free. `Booked` is an array of 60 Boolean values, where `Booked[n]` is TRUE if seat `n` has been sold.

```
OUTPUT "Enter seat number (1 to 60)"
INPUT Seat
WHILE Seat < 1 OR Seat > 60 DO
    OUTPUT "Invalid seat, enter 1 to 60"
    INPUT Seat
ENDWHILE
IF Booked[Seat] = TRUE
    THEN
        OUTPUT "Seat already booked"
    ELSE
        Booked[Seat] ← TRUE
        OUTPUT "Seat ", Seat, " booked"
ENDIF
```

1. The seat number is input and validated with a range check in a loop.
2. The array element for that seat is checked.
3. If it is already TRUE, a message is displayed; otherwise the seat is marked as booked and a confirmation is output.
:::

## The test plan

Design also produces a **test plan** listing each test, its purpose, the test data (normal, abnormal and extreme) and the expected result, so that the finished system can be checked against the design.

| Test | Test data | Type | Expected result |
|:--|:--|:--|:--|
| Seat number accepted | 30 | Normal | Seat 30 booked |
| Lowest seat | 1 | Extreme | Seat 1 booked |
| Seat out of range | 75 | Abnormal | "Invalid seat" message |

## Common mistakes

:::mistake{title="Designing the form without validation"}
Every input field needs a check: presence, range, format or a drop-down list. Say which check applies to each field.
:::

:::mistake{title="Mixing up system and program flowcharts"}
A **system** flowchart shows the whole system (inputs, files, outputs); a **program** flowchart shows the detailed steps and decisions of one algorithm.
:::

## Exam tips

:::exam-tip
When designing a file, give **field name, data type, length or format, and validation** for each field, and identify the key field.
:::

:::exam-tip
For "describe features of a good input form", mention specific features such as drop-down lists, character boxes, clear instructions and validation messages, each with its benefit.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
System design is examined by ZIMSEC only. Cambridge 0478 covers the design of algorithms (pseudocode, flowcharts, structure diagrams) and single-table databases, which this lesson uses.
:::

## Summary

:::summary
- Design plans the inputs, outputs, interface, files, processes, security and testing of the new system.
- Good input forms have instructions, logical order, character boxes, drop-down lists and validation.
- Outputs show only what each user needs, clearly laid out.
- A data dictionary lists each field's name, type, length or format, validation and example; a primary key identifies each record.
- A system flowchart shows the whole system with process, document, manual input, storage and display symbols; algorithms are then designed in pseudocode.
- The test plan lists tests, test data and expected results.
:::
