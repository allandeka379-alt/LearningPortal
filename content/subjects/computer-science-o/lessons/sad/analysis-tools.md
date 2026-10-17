---
{
  "key": "sad.analysis-tools",
  "title": "Systems analysis: requirements, DFDs and activity diagrams",
  "summary": "The activities of the analysis stage (describing the current system, identifying requirements and considering alternative solutions) and how to read and construct data flow diagrams and activity diagrams, described in words and tables.",
  "concepts": ["comp.sad.analysis-tools"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Once a feasibility study says "go ahead", the systems analyst must understand the current system in depth. At a school library in Gweru, for example: who borrows books, what is written down when a book goes out, where the records are kept, and what happens when a book is overdue. Pages of notes are hard to follow, so analysts summarise what they find with **diagrams**: a **data flow diagram (DFD)** shows how data moves through the system, and an **activity diagram** shows the order of the steps in a process.

ZIMSEC Form 3 asks you to describe the activities of the analysis stage, including alternative solutions, data flow diagrams and activity diagrams. In this course diagrams are described in words and tables. In an exam you may be asked to identify the parts of a given diagram, describe what it shows, or complete one from a description.

## Key definitions

:::definition{term="Systems analysis"}
The stage of the SDLC in which the current system is studied in detail, its problems are identified, the requirements of the new system are specified and alternative solutions are considered.
:::

:::definition{term="Requirements specification"}
A document that lists exactly what the new system must do (functional requirements) and the conditions it must meet, such as speed, security and hardware (non-functional requirements).
:::

:::definition{term="Data flow diagram (DFD)"}
A diagram that shows how data enters a system, how it is processed, where it is stored and where it leaves, using four symbols: external entity, process, data store and data flow.
:::

:::definition{term="Activity diagram"}
A diagram that shows the sequence of actions in a process, including decisions and actions that happen at the same time, from a start point to an end point.
:::

## Activities in the analysis stage

1. **Fact-finding**: questionnaires, interviews, record inspection and observation.
2. **Describing the current system**: its inputs, processes, outputs and storage, often as a DFD.
3. **Identifying problems** with the current system: delays, errors, duplication, lost records.
4. **Identifying requirements**: what users need the new system to do.
5. **Considering alternative solutions** and recommending one.
6. **Producing the requirements specification**, which becomes the basis for design.

### Requirements

| Type | Meaning | Examples for a library system |
|:--|:--|:--|
| User requirements | What the users need to be able to do | Search for a book by title; see which books a learner has borrowed |
| Functional (system) requirements | The functions the system must perform | Record loans and returns; print an overdue list every Friday |
| Non-functional requirements | Qualities and constraints | Search results in under 2 seconds; password access; runs on the existing computers |
| Hardware and software requirements | What is needed to run it | A computer with a bar code scanner; a database package |

Requirements should be specific and measurable wherever possible. "The system must be fast" cannot be tested; "a search must return results in under 2 seconds" can be checked during testing and at evaluation.

### Alternative solutions

The analyst compares options such as:

- **improving the manual system** (better forms and filing): cheapest, but problems remain;
- **buying an off-the-shelf package**: available quickly and well tested, but may not fit every need;
- **having a bespoke system written**: fits exactly, but costs more and takes longer;
- **adapting (customising) a package**: a middle way.

Each option is judged against the requirements, cost, time and risk, and one is recommended to management with reasons.

## Data flow diagrams

A DFD uses four symbols. You must recognise and name each.

| Symbol | Shape (description) | Meaning | Example |
|:--|:--|:--|:--|
| External entity | A rectangle (square) labelled with a noun | A person or organisation outside the system that sends or receives data | Learner, Supplier |
| Process | A rounded rectangle or circle labelled with a verb phrase | An action that changes or uses data | Record loan, Check stock |
| Data store | An open-ended rectangle (two parallel lines) | Where data is held | Books file, Loans file |
| Data flow | An arrow labelled with the data it carries | Data moving between the other symbols | Book details, Learner ID |

**Rules:** every data flow is labelled; data cannot flow directly between two external entities or two data stores, or between a data store and an entity; it must pass through a process. Every process has at least one input and one output.

![Data flow diagram of a library loan system: the Learner sends Learner ID and book to process 1 Record loan, which reads book details from store D1 Books, saves loan details in D2 Loans and returns a return date; process 2 reads overdue loans from D2 Loans and sends an overdue list to the Librarian](media:diagrams/dfd-library-loan.png "Figure: a data flow diagram with two entities, two processes and two data stores")

:::worked-solution[Reading a DFD of a library loan]
The DFD of a school library's loan system is described as:

| From | Data flow | To |
|:--|:--|:--|
| Learner (entity) | Learner ID and book | Process 1: Record loan |
| Data store D1: Books | Book details | Process 1: Record loan |
| Process 1: Record loan | Loan details | Data store D2: Loans |
| Process 1: Record loan | Return date | Learner (entity) |
| Data store D2: Loans | Overdue loans | Process 2: Produce overdue list |
| Process 2: Produce overdue list | Overdue list | Librarian (entity) |

Identify the parts and describe what the system does.

1. **External entities:** Learner and Librarian (outside the system).
2. **Processes:** 1 Record loan and 2 Produce overdue list.
3. **Data stores:** D1 Books and D2 Loans.
4. **Description:** when a learner borrows a book, process 1 reads the book's details from the Books store, saves the loan in the Loans store and gives the learner a return date. Process 2 reads the Loans store to find overdue loans and sends an overdue list to the librarian.
:::

## Activity diagrams

Activity diagrams (from the Unified Modelling Language) show the **flow of control**: what happens first, what next, where decisions are made and which actions can happen at the same time.

| Symbol | Shape (description) | Meaning |
|:--|:--|:--|
| Initial node | A small solid black circle | Where the activity starts |
| Action | A rounded rectangle | A step in the process |
| Control flow | An arrow | The order of the actions |
| Decision | A diamond with one arrow in and two or more out, each labelled with a condition in square brackets | A choice of path |
| Merge | A diamond with several arrows in and one out | Alternative paths join again |
| Fork | A thick bar with one arrow in and several out | Actions that start at the same time (in parallel) |
| Join | A thick bar with several arrows in and one out | Waits until all parallel actions finish |
| Final node | A solid circle inside a ring (a bullseye) | Where the activity ends |

:::example{title="An activity diagram for withdrawing cash"}
An activity diagram for an ATM withdrawal, written as a list of nodes:

1. Initial node → action 2.
2. Action: *Insert card and enter PIN* → decision 3.
3. Decision: [PIN incorrect] → action 4; [PIN correct] → action 5.
4. Action: *Display "Wrong PIN"* → final node 9.
5. Action: *Enter amount* → decision 6.
6. Decision: [insufficient funds] → action 7; [sufficient funds] → fork 8.
7. Action: *Display "Insufficient funds"* → final node 9.
8. Fork: *Dispense cash* and *Update account balance* happen in parallel → join → action *Return card* → final node 9.
9. Final node.
:::

**DFD or activity diagram?** A DFD shows **what data** moves and where it is stored, but not the order of steps or decisions. An activity diagram shows the **order of actions and decisions** but not where data is stored. Analysts often draw both for the same process.

## Common mistakes

:::mistake{title="Joining two entities with a data flow"}
Data between external entities is outside the system, so it is not shown. Every flow must start or end at a process.
:::

:::mistake{title="Labelling processes with nouns"}
A process does something, so name it with a verb phrase ("Calculate fees"), and label entities and stores with nouns ("Parent", "Fees file").
:::

:::mistake{title="Confusing a DFD with a flowchart"}
A DFD does not show decisions or the order of steps. Use an activity diagram (or a flowchart) for that.
:::

## Exam tips

:::exam-tip
When asked to "identify the components of a DFD", name all four (external entity, process, data store, data flow) and give an example of each from the scenario.
:::

:::exam-tip
Describe an activity diagram step by step from the initial node, saying what happens at each decision ("if the PIN is correct… otherwise…").
:::

:::keyfact{title="ZIMSEC and Cambridge"}
DFDs, activity diagrams and the analysis stage are examined by ZIMSEC only. Cambridge 0478 uses structure diagrams and flowcharts for algorithm design instead.
:::

## Summary

:::summary
- Analysis: fact-finding, describing the current system, identifying problems and requirements, considering alternatives and writing the requirements specification.
- Requirements may be user, functional, non-functional, and hardware and software requirements.
- A DFD has external entities (rectangles), processes (rounded rectangles), data stores (open-ended rectangles) and labelled data flows (arrows); every flow passes through a process.
- An activity diagram shows the order of actions: initial node, actions, decisions and merges, forks and joins, and the final node.
- DFDs show data movement and storage; activity diagrams show the sequence and decisions.
:::
