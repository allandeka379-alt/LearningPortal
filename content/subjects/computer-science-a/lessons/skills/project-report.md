---
{
  "key": "skills.project-report",
  "title": "The ZIMSEC computer science project report",
  "summary": "Choosing a problem and the five sections of the ZIMSEC project report as the guide structures them, what evidence earns marks in each, the page limit and layout, documenting code, user documentation, test plans with standard, extreme and abnormal data, and evaluating the system.",
  "concepts": ["acs.skills.project-report"],
  "estimatedMinutes": 55,
  "level": "core"
}
---
## Introduction

Farai is in Form 5 and his teacher says that the project report will carry a fifth of his final grade. He has two terms to build a program that solves a real problem for a real client, and to write a report that proves what he did. Many learners lose marks not because their programs are poor but because the report does not show the work: no evidence of the research, no test results, no explanation of how to use the system.

This lesson explains how to choose a problem and how the report is organised and marked, according to the ZIMSEC project guide as the course records it. The project is done over about four terms, from term two of Form 5 to the end of term two of Form 6, and is Paper 4. The project itself cannot be simulated here, so this lesson concentrates on the skills the report needs, with a worked test plan. You should already know about the software development life cycle, data validation and program design from other topics.

:::note{title="Check the current guide"}
The mark allocation and rules below are recorded from the syllabus text. Your teacher must confirm them against the current ZIMSEC project guide, which has priority if it differs.
:::

## Key definitions

:::definition{term="Project report"}
A document of limited length that describes a computer-based solution to a real problem: the investigation, design, development, testing and evaluation of the system.
:::

:::definition{term="Feasibility study"}
An early check of whether a proposed solution is possible and worthwhile, looking at technical, economic and operational factors.
:::

:::definition{term="Requirements specification"}
A statement of what the system must do, set out for the user, software and hardware.
:::

:::definition{term="Test plan"}
A table of the tests to be carried out, with the data to be used, the reason for each test and the expected result, written before testing begins.
:::

## Choosing a problem

A good project has a real client such as a school office, a shop or a clinic; a problem that a program can solve in the time available; and enough programming to show depth (data structures, files or a database, validation, reports). Avoid problems that are too large to finish or so small that the program needs only a few lines. Agree the choice with your teacher, find a person who will answer your questions, and keep a diary with dates.

## The sections and marks

| Section | Title | Marks |
|:-:|:-:|:-:|
| A | Selection, investigation and analysis | 25 |
| B | Design | 25 |
| C | Software development | 25 |
| D | Testing and evaluation | 15 |
| E | General expectations | 10 |
|  | **Total** | **100** |

### What earns marks in each section

**A. Selection, investigation and analysis (25).** Define the problem and give the background; investigate the current system with a data flow diagram, flow chart or entity-relationship diagram and use research tools such as questionnaires, interviews, record inspection and observation; identify the problems with the current system; carry out a feasibility study; write a requirements specification (user, software, hardware); state aims and objectives; and give *evidence* that the research was carried out, such as completed questionnaires and interview answers.

**B. Design (25).** Consider alternative methods and justify the one chosen; design the input (data capture forms and screen layouts), the data structures or file design (or object-oriented design with class, use case and sequence diagrams), an overall plan, the output and the user interface, and a test strategy.

**C. Software development (25).** Show good structure in the code with procedures and functions, local and global variables, comments, blank lines and indentation; provide technical documentation (algorithms, pseudocode or flow charts for modules, and program listings); and provide user documentation covering installation, starting, navigating and exiting the system.

**D. Testing and evaluation (15).** Design and select test data for standard, extreme and abnormal (invalid) data and show evidence through sample runs and error messages; test the system for ease of use, reliability, effectiveness and speed; and evaluate the system against the objectives, naming achievements, limitations and future development.

**E. General expectations (10).** Show depth of knowledge and understanding, originality, an organised conduct of the project and a well-presented, easy-to-follow report with sections, page numbers and an index.

## Layout and presentation

The guide limits the project to 50 pages excluding appendices. The report has a cover page, a table of contents and the appendices, and it must be spiral bound. The appendices contain any two of: completed questionnaires, interview questions with the answers, and sample documents. Keep the main text for explanation and put bulky evidence in the appendices.

## Documenting code

Good code is easy for another person to read. Use meaningful names (`student_total`, not `x`), indentation and blank lines to show structure, comments that explain *why* and not just *what*, and separate procedures and functions for each task. Technical documentation then lists each module, its inputs and outputs, and its algorithm. User documentation is written for the client, not the programmer: step-by-step instructions with screens, the meaning of each message and what to do if something goes wrong.

## Testing: a worked test plan

A routine in a school fees program takes the fee (300) and the amount a parent says was paid, and returns a status. The test plan must include standard data (typical), extreme data (the limits) and abnormal data (invalid input).

```python
def fee_status(fee, paid_text):
    try:
        paid = float(paid_text)
    except ValueError:
        return "Invalid: not a number"
    if paid < 0 or paid > fee:
        return "Invalid: out of range"
    if paid == fee:
        return "Paid in full"
    if paid == 0:
        return "Not paid"
    return "Part paid, balance " + str(fee - paid)


for item in ["150", "0", "300", "-20", "abc", "350"]:
    print(item, "->", fee_status(300, item))
```

```
150 -> Part paid, balance 150.0
0 -> Not paid
300 -> Paid in full
-20 -> Invalid: out of range
abc -> Invalid: not a number
350 -> Invalid: out of range
```

:::worked-solution{title="Test plan and result"}
| Test | Type of data | Input (fee 300) | Expected result |
|---|---|---|---|
| 1 | Standard | 150 | Part paid, balance 150.0 |
| 2 | Extreme (lower limit) | 0 | Not paid |
| 3 | Extreme (upper limit) | 300 | Paid in full |
| 4 | Abnormal | -20 | Invalid: out of range |
| 5 | Abnormal | abc | Invalid: not a number |
| 6 | Abnormal | 350 | Invalid: out of range |

1. The expected results were written *before* the routine was run.
2. The real run matches the expected column for all six tests, so the plan passes; the sample run is evidence for the report.
3. A report would add a screen shot of each run, and explain any test that failed and how the fault was corrected.
:::

## Evaluating the system

An honest evaluation compares the finished system with each objective in section A: which were met, how the client can show it, and which were not. It states limitations (for example, "reports cannot yet be printed") and suggests future improvements. Say how users responded: a short feedback form or an interview with the client is good evidence. Do not claim that the system has no faults.

:::example{title="Turning an objective into evidence"}
*Objective:* "The bursar can see each learner's balance in under ten seconds." *Evidence of testing:* a timed trial with the bursar searching three names, with the times written down and a sample screen. *Evaluation:* "Met: the balance appeared in about two seconds. Limitation: names with spelling mistakes are not found. Future work: add a partial-name search."
:::

:::keyfact{title="ZIMSEC only"}
The project is a ZIMSEC requirement (Paper 4, Forms 5 and 6); Cambridge has its own practical papers instead. The syllabus marks the report by sections A to E as above. This course cannot mark your project, but the practice questions train the skills the sections reward.
:::

## Common mistakes

:::mistake{title="Describing the program but not the investigation"}
Section A needs evidence that you studied the current system and spoke to the user. A report that begins with the solution loses a quarter of the marks.
:::

:::mistake{title="Testing only with data that works"}
Section D asks for standard, extreme and abnormal data. Show that bad data is rejected with a clear message.
:::

:::mistake{title="Writing user documentation for programmers"}
User documentation explains how to install, start, use and exit the system in plain steps, without code.
:::

## Exam tips

:::exam-tip
There is no written paper on the project itself, but ZIMSEC Paper 1 and coursework may ask about system design, test data and documentation. Treat the section headings as a checklist: for every objective you should be able to point to the investigation that led to it, the design that meets it, the code that implements it and the test that proves it. When asked for test data, give an input, the type of data and the expected result. Keep a copy of your report and evidence safe.
:::

## Summary

:::summary
- The project report is marked in five sections: A 25, B 25, C 25, D 15 and E 10 marks, for a total of 100 (check the current guide).
- Section A needs an investigation with evidence; B needs justified designs; C needs well-structured code and technical and user documentation; D needs a test plan and an honest evaluation.
- The report is limited to 50 pages excluding appendices, is spiral bound, and puts bulky evidence such as questionnaires in the appendices.
- A test plan uses standard, extreme and abnormal data, with expected results written before testing.
- Evaluate the system against each objective, stating achievements, limitations and future development.
:::
