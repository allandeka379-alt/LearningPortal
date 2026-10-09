---
{
  "key": "algorithms.decomposition-pdlc",
  "title": "Problem decomposition and the program development life cycle",
  "summary": "The four stages of the program development life cycle and the tasks in each; how computer systems are built from sub-systems; abstraction and decomposition into inputs, processes, outputs and storage; structure diagrams; and top-down and bottom-up design.",
  "concepts": ["comp.algorithms.decomposition-pdlc"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Imagine the owner of a busy tuck-shop at a school in Gweru asks you to "write a program for the shop". That request is far too big to code in one go. Which items are sold? Who uses the program? What must it print at the end of the day? Before a single line of code is written, a programmer has to understand the problem, break it into manageable pieces and plan a solution.

Professional developers follow a set of stages called the **program development life cycle**. They also use **decomposition** and **abstraction** to turn a large, vague problem into small, precise tasks. Cambridge Paper 2 asks you to name the stages and their tasks, to decompose a scenario into inputs, processes, outputs and storage, and to complete or describe structure diagrams. ZIMSEC expects you to use a top-down approach to break a problem into sub-problems.

## Key definitions

:::definition{term="Program development life cycle"}
The sequence of stages followed when producing a program: analysis, design, coding and testing.
:::

:::definition{term="Abstraction"}
Removing unnecessary detail from a problem so that only the information needed to solve it remains.
:::

:::definition{term="Decomposition"}
Breaking a complex problem down into smaller, simpler sub-problems that can each be solved separately.
:::

:::definition{term="Sub-system"}
A smaller system that performs one part of the job of a larger system; a sub-system can itself be made of further sub-systems.
:::

:::definition{term="Structure diagram"}
A diagram that shows how a system is broken down into sub-systems, level by level, from the whole system at the top to small modules at the bottom.
:::

## The four stages

| Stage | Main tasks |
|:--|:--|
| Analysis | Identify the problem and the requirements (what the program must do); use abstraction to remove irrelevant detail; decompose the problem |
| Design | Decide how the program will work: further decomposition, structure diagrams, flowcharts and pseudocode; plan the data and the user interface |
| Coding | Write the program code in a programming language, testing each part as it is written (iterative testing) |
| Testing | Run the finished program with test data (normal, abnormal, extreme and boundary) to check it meets the requirements |

The stages are a cycle rather than a straight line. If testing shows that a requirement was misunderstood, the developer returns to analysis; if a module will not work, the design is revised. **Iterative testing** during coding means each module is tested, corrected and tested again before the next is added, so errors are found while they are small.

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge 0478 limits the life cycle to four stages: analysis, design, coding and testing. ZIMSEC places the same ideas inside the wider systems development life cycle (which adds feasibility, implementation, evaluation and maintenance) and asks you to use **top-down design**. In a Cambridge answer, name only the four stages.
:::

## Systems and sub-systems

Every computer system is made up of sub-systems, which are made up of further sub-systems. A mobile money service, for example, has a sub-system for registering customers, one for sending money and one for producing statements. "Sending money" in turn contains sub-systems to check the balance, to transfer the amount and to send confirmation messages.

Thinking in sub-systems has clear benefits:

- each part is small enough to understand, write and test on its own;
- different programmers can work on different parts at the same time;
- a part that is used often (such as "validate a phone number") can be written once and reused;
- a fault can be traced to one part instead of the whole program.

## Decomposition into inputs, processes, outputs and storage

A useful way to decompose a problem is to ask four questions:

- **Inputs**: what data goes into the system?
- **Processes**: what must be done to the data (calculations, decisions, searches, sorting)?
- **Outputs**: what information comes out (on screen, printed, sent)?
- **Storage**: what data must be kept for later (in a file or database)?

:::example{title="Decomposing a tuck-shop till"}
The tuck-shop owner wants a program that records each sale, works out the change, and prints the day's total takings.

| Part | Items |
|:--|:--|
| Inputs | Item code, quantity, amount paid by the learner |
| Processes | Look up the price of the item; calculate price × quantity; calculate change; add the sale to the day's total |
| Outputs | Cost of the sale and the change on screen; day's total takings at closing time |
| Storage | The price list; a record of every sale made that day |

Notice the abstraction: the program does not need the learner's name, the colour of the wrapper or the time of day, so they are left out.
:::

## Structure diagrams

A structure diagram is drawn as boxes in levels: the whole system at the top, its sub-systems in a row underneath, and each sub-system split further below that. On this platform a structure diagram is written as an indented list, where each indent is one level down:

- Library loans system
  - Manage members
    - Add member
    - Remove member
  - Manage loans
    - Issue book
    - Return book
    - Calculate fine
  - Produce reports

Read from left to right, the sub-systems on each level are usually in the order they are used. Each box at the bottom level should be small enough to become one module (procedure or function) in the code.

:::example{title="A structure diagram for a quiz program"}
Farai is writing a quiz for Form 1 learners. Decomposing it top-down gives:

- Quiz program
  - Set up quiz
    - Load questions from file
    - Enter player name
  - Play quiz
    - Display question
    - Input answer
    - Check answer and update score
  - Finish quiz
    - Display final score
    - Save score to file

The top level answers "what are the main jobs?"; the next level answers "how is each job done?". The bottom level is detailed enough to write pseudocode for each box.
:::

## Top-down and bottom-up design

**Top-down design** starts with the whole problem and repeatedly splits each part into smaller parts until each part is simple enough to code, exactly as in the structure diagrams above. It gives a clear overall plan and makes it easy to share the work.

**Bottom-up design** works the other way: small, well-understood modules (often ones that already exist, such as a tested validation routine or a library function) are written or chosen first and then combined into larger parts until the whole system is built. It encourages reuse, but the overall plan may only become clear late in the project.

In practice developers mix the two: they plan top-down and build and test bottom-up.

## Common mistakes

:::mistake{title="Listing extra stages for Cambridge"}
For the 0478 program development life cycle, the stages are analysis, design, coding and testing. "Feasibility", "implementation" and "maintenance" belong to the wider systems life cycle and do not score in a Cambridge answer about the PDLC.
:::

:::mistake{title="Putting tasks in the wrong stage"}
Drawing a structure diagram or writing pseudocode is **design**, not coding. Identifying the requirements is **analysis**. Writing program code with iterative testing is **coding**; testing the whole program with test data is **testing**.
:::

:::mistake{title="Confusing abstraction with decomposition"}
Abstraction **removes** detail that does not matter; decomposition **splits** the problem into parts. A map of the Harare kombi routes that leaves out buildings is abstraction; dividing a ticket system into "sell ticket", "print receipt" and "record sale" is decomposition.
:::

## Exam tips

:::exam-tip
When asked to "identify the inputs, processes, outputs and storage" in a scenario, take them from the scenario's wording. Give a calculation as a process ("calculate the total cost"), not as an output.
:::

:::exam-tip
For "describe a task in the analysis stage", give a precise task such as "identify the requirements of the program" or "use abstraction to remove unnecessary detail", not a vague phrase like "think about the problem".
:::

## Summary

:::summary
- The program development life cycle has four stages: analysis, design, coding and testing; it is repeated when problems are found.
- Analysis: identify the problem and requirements, abstraction, decomposition. Design: structure diagrams, flowcharts, pseudocode. Coding: write code with iterative testing. Testing: test data.
- Every system is made of sub-systems, which can be split further.
- Decompose a problem into inputs, processes, outputs and storage.
- A structure diagram shows the levels of decomposition; top-down design splits the whole into parts, bottom-up design combines small modules into the whole.
:::
