---
{
  "key": "sdlc.analysis-design-documentation",
  "title": "System analysis, design, implementation, documentation and evaluation",
  "summary": "Analysing the present system with data flow diagrams, flowcharts and entity-relationship diagrams, producing the design (data capture forms, file design, output design, test plan), choosing a changeover method, writing technical and user documentation, training users, and evaluating the system against its objectives.",
  "concepts": ["acs.sdlc.analysis-design-documentation"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

A school bursar in Gweru keeps learners' fees on index cards. The feasibility study has been passed and the user requirements specification has been signed. The next job is to understand exactly how the present system works, to design a computer system that does the same work better, to put the new system into use without losing a day's fees, and to find out afterwards whether it was a success.

These are the middle and later stages of the ZIMSEC development cycle: **analysis**, **design**, **implementation**, **documentation** and **evaluation**. This lesson explains what is done in each and what each produces. The fact-finding and feasibility stages come before, in the previous lesson.

You should know the stages of the development life cycle and the meaning of the user requirements specification.

## Key definitions

:::definition{term="System analysis"}
The detailed study of the present system, using the facts collected, to describe how it works, find its weaknesses and state what the new system must do.
:::

:::definition{term="Data flow diagram (DFD)"}
A diagram that shows how data moves through a system: from external entities, through processes, to and from data stores.
:::

:::definition{term="Changeover"}
The process of replacing the old system by the new system in the organisation.
:::

:::definition{term="Evaluation"}
Judging how well the finished system meets its objectives and the users' needs, so that improvements can be identified.
:::

## Analysis: describing the present system

Three tools are used to record what the analyst has found.

- A **data flow diagram** shows the movement of data. Its symbols are an **external entity** (a person or organisation outside the system), a **process** (work that changes data), a **data store** (a file or database) and a **data flow** (an arrow, labelled with the data). Because a picture cannot be reproduced in text here, a DFD is described as a table of flows.
- A **system flowchart** shows the sequence of the steps and the documents and files used.
- An **entity-relationship diagram** shows the entities and relationships of the data (the design lesson explains it).

The following table describes the DFD of the bursar's new fees system. Each row is one arrow.

{{flowTable}}

The diagram has {{nProcesses}} processes, one data store (D1) and two external entities (the parent and the bursar). Analysis ends with a list of the **weaknesses** of the present system (for example, slow searching of cards) and the **requirements** of the new one.

## Design

The design says **how** the system will meet the requirements. The main design products are:

1. **Data capture forms** (input design): the layout of the form or screen used to enter data, with labelled boxes, drop-down lists and validation.
2. **File and data structure design**: the files or tables, the fields, their data types and sizes, the keys, and the validation for each field.
3. **Output design**: the layout of reports, statements and screens, including headings and totals.
4. **Test plan**: the tests that will be done, with test data and expected results.

{{fileDesign}}

:::worked-solution{title="How much storage does the fees file need?"}
The sizes in the file design are in bytes. In this lesson 1 KB = 1024 bytes.
1. Record length = 6 + 25 + 2 + 8 + 8 + 10 = {{recLen}} bytes.
2. The school has {{learners}} learners, so the file holds {{learners}} records.
3. File size = {{recLen}} × {{learners}} = {{bytes}} bytes.
4. In kilobytes = {{bytes}} ÷ 1024 = {{kb}} KB.
:::

## Implementation and changeover

**Implementation** is the stage in which the new system is installed, the data is converted to the new format, the users are trained and the system is put to use. There are four main methods of changeover.

| Method | How it works | Advantage | Disadvantage |
|---|---|---|---|
| Direct | The old system is stopped and the new one starts at once | Quick and cheap | Risky: if the new system fails there is nothing to fall back on |
| Parallel | Both systems run together for a period, and the results are compared | Safe: the old system is a back-up | Slow and costly; the work is done twice |
| Phased | The new system is introduced one part at a time | A fault affects only one part; staff learn gradually | Takes longer; the old and new parts must work together |
| Pilot | The new system is tried in one branch or department first | Problems are found with a small group | Other users wait; the pilot group may not be typical |

Direct changeover suits a system that is not critical, or one that must be changed on a fixed date. Parallel running suits an important system such as payroll or fees, where an error would be costly.

## Documentation

Two kinds of documentation are produced.

| Type | Audience | Contents |
|---|---|---|
| Technical documentation | Programmers and administrators | Requirements, design, data dictionary, file layouts, program listings, test results; used to maintain the system |
| User documentation | The people who use the system | How to start, enter data, print reports and correct errors; a quick-start guide; a list of error messages and a help section |

Good documentation is clear, up to date and kept with the system. **Training** is given to the users before the changeover, using the user guide, practice sessions and a person to ask for help.

## Evaluation

After the system has been used for some time, it is **evaluated** by comparing it with the objectives in the requirements specification. The analyst collects the users' opinions (interviews or questionnaires), checks the results (for example the time taken to produce a statement) and looks for faults and missing features. The findings go into an evaluation report that recommends changes. This can start the **maintenance** or a new cycle.

:::keyfact{title="ZIMSEC only"}
This lesson is ZIMSEC only (Form 5). It covers analysis tools, design deliverables, the four changeover methods, technical and user documentation, training and evaluation. Cambridge covers testing and maintenance in a separate topic (see the testing and maintenance lesson).
:::

## Common mistakes

:::mistake{title="Putting the design before the analysis"}
Analysis finds out what is needed (the **what**). Design decides how to provide it (the **how**).
:::

:::mistake{title="Describing changeover methods without a drawback"}
Every method has a drawback. Direct is risky, parallel is costly, phased is slow and the pilot delays the other users. Give both sides.
:::

:::mistake{title="Mixing up technical and user documentation"}
Technical documentation is for the people who maintain the system; user documentation is for the people who use it. Name the audience.
:::

:::mistake{title="Evaluating the system against the wrong thing"}
A system is evaluated against its **objectives** and the user requirements, not against the personal opinion of the developer.
:::

## Exam tips

:::exam-tip
ZIMSEC Paper 1 asks you to "**compare**" changeover methods (give an advantage and a disadvantage of each, and match the method to the scenario) and to "**distinguish**" technical from user documentation (state the audience and the contents). For a design question, say which item you are designing (input, output, file or test plan).
:::

:::exam-tip
For a file-size calculation, add up the field sizes, multiply by the number of records and state the unit. For a DFD question, name each process, store and external entity and label every flow.
:::

## Summary

:::summary
- Analysis describes the present system (DFD, flowcharts, E-R diagram) and lists its weaknesses and the requirements.
- Design produces data capture forms, file design with validation, output design and a test plan.
- Changeover: direct, parallel, phased or pilot; choose by risk, cost and time.
- Technical documentation is for maintainers; user documentation is for users; users are trained before the changeover.
- Evaluation compares the system with its objectives and recommends improvements.
:::
