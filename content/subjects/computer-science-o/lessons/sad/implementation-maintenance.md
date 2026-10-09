---
{
  "key": "sad.implementation-maintenance",
  "title": "Implementation, evaluation and maintenance",
  "summary": "The activities of implementation, including the four changeover methods (direct, parallel, phased and pilot) with their advantages and disadvantages; evaluating a new system against its objectives; and corrective, adaptive and perfective maintenance.",
  "concepts": ["comp.sad.implementation-maintenance"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

A building society with branches in Harare, Bulawayo, Mutare and Gweru has a new accounts system, fully tested. Should it switch every branch over on the same Monday morning? Run the old and new systems side by side for a month? Start with the Gweru branch only? The choice of **changeover method** balances cost against risk, and a wrong choice can mean lost records and angry customers.

After the changeover, the organisation must ask whether the new system actually solved the problems it was built for (**evaluation**), and it must keep the system working and up to date for years (**maintenance**). ZIMSEC Form 4 asks you to describe the activities of the implementation, evaluation and maintenance stages. Changeover methods are one of the most common Paper 2 questions: you are given an organisation and asked to recommend and justify a method.

## Key definitions

:::definition{term="Implementation"}
The stage in which the new system is installed and put into use: hardware and software are installed, data is converted and loaded, users are trained and the old system is replaced.
:::

:::definition{term="Changeover"}
The process of replacing the old system with the new one.
:::

:::definition{term="Evaluation"}
Reviewing a system after it has been in use to judge whether it meets its objectives and the users' requirements, and to identify improvements.
:::

:::definition{term="Maintenance"}
Changes made to a system after it is in use, to correct errors, adapt it to new conditions or improve it.
:::

## Implementation activities

1. **Install hardware**: computers, network cabling, printers, scanners; prepare the room (power, UPS, air conditioning).
2. **Install software**: the new system, operating systems, databases.
3. **Convert and load data**: transfer existing records from paper or the old system into the new files, then **verify** them.
4. **Train users** (see the documentation and training lesson).
5. **Complete documentation**.
6. **Change over** from the old system to the new one.

## Changeover methods

### Direct changeover

The old system is stopped and the new system starts immediately, for example at close of business on Friday.

| Advantages | Disadvantages |
|:--|:--|
| Quickest and cheapest: no duplication of work | Highest risk: if the new system fails, there is no system to fall back on |
| Benefits of the new system are felt immediately | Data may be lost; staff must cope with everything at once |

### Parallel running

The old and new systems run side by side for a period, processing the same data, and their results are compared.

| Advantages | Disadvantages |
|:--|:--|
| Lowest risk: if the new system fails, the old one is still working | Most expensive: double work for staff, more staff time and overtime |
| Outputs can be compared to check the new system is correct | Staff may be overworked and make mistakes |
| Staff can be trained gradually | Takes longer before the old system is dropped |

### Phased implementation

The new system is introduced **one part (module) at a time**, for example stock control first, then sales, then payroll, across the whole organisation.

| Advantages | Disadvantages |
|:--|:--|
| If one part fails, only that part is affected | Takes a long time before the whole system is in use |
| Staff learn one part at a time | Parts of the old and new systems must work together in the meantime |
| Problems in one phase can be fixed before the next | Needs careful planning |

### Pilot implementation

The whole new system is introduced in **one branch, department or location** first; once it works there, it is rolled out to the others.

| Advantages | Disadvantages |
|:--|:--|
| If it fails, only one branch is affected | Takes longer to reach all branches |
| Staff in the pilot branch can train others | The pilot branch may not be typical of the rest |
| Problems are found and fixed before the full roll-out | Branches use different systems for a while, so data must be combined |

:::example{title="Recommending a changeover method"}
1. A **hospital** replacing its patient records system: **parallel running**. Errors could endanger lives, so the old system must keep running until the new one is proven, despite the cost.
2. A **supermarket chain** with 12 branches: **pilot**. Try the new tills in one branch, fix problems, then roll out.
3. A **small shop** replacing a simple sales spreadsheet: **direct**. The system is simple and well tested, and the shop cannot afford double work.
4. A **school** introducing a system with separate modules for fees, marks and the library: **phased**. Introduce one module each term so staff are not overwhelmed.
:::

## Evaluation

Evaluation happens some weeks or months after changeover. The analyst:

- compares the system's performance with the **objectives** set at the start (for example "produce a stock report in under one minute");
- checks that each **requirement** in the specification has been met;
- collects **user feedback** through questionnaires and interviews;
- compares the actual **costs and benefits** with those predicted in the feasibility study;
- identifies **limitations** and recommends **improvements**.

:::worked-solution[Evaluating against objectives]
A school's results system had three objectives. After one term the analyst measures:

| Objective | Measured result | Met? |
|:--|:--|:--|
| Print all report cards in under 30 minutes | 22 minutes | Yes |
| Reduce data entry errors to fewer than 5 per term | 9 errors recorded | No |
| Teachers can enter a class's marks without help | 38 of 40 teachers did so | Mostly |

1. Compare each measured result with its objective.
2. Report cards: met, since 22 is under 30.
3. Errors: not met. The analyst investigates and recommends stronger validation (for example a range check of 0 to 100 on every mark) and a visual check before saving.
4. Ease of use: mostly met; the two teachers who needed help are offered extra training.
:::

## Maintenance

| Type | Purpose | Example |
|:--|:--|:--|
| Corrective | Fix errors (bugs) that were not found during testing | The system crashes when a surname contains an apostrophe |
| Adaptive | Change the system to cope with changes in its environment: new laws, tax rates, hardware, operating systems | A new tax rate must be applied to every invoice |
| Perfective | Improve performance or add features users have asked for, even though the system works | Adding a search box; making reports load faster |

Maintenance uses the **technical documentation** and is followed by testing, often re-running the original test data to check that nothing else has broken. Some writers also name **preventive** maintenance: changing code to stop problems happening in future.

## Common mistakes

:::mistake{title="Confusing pilot and phased"}
**Pilot**: the **whole** system in **one place** first. **Phased**: **one part** of the system across the **whole** organisation at a time.
:::

:::mistake{title="Saying parallel running is cheap"}
Parallel running is the **safest** method but the most **expensive**, because all work is done twice.
:::

:::mistake{title="Calling a new tax rate corrective maintenance"}
The system had no error; the world changed. That is **adaptive** maintenance.
:::

## Exam tips

:::exam-tip
When recommending a changeover method, link it to the scenario: how critical the data is, how many branches there are, the budget and the staff's workload.
:::

:::exam-tip
Learn one advantage and one disadvantage of each changeover method, and one example of each type of maintenance.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Implementation, evaluation and maintenance are examined by ZIMSEC only. Cambridge 0478 includes testing with normal, abnormal, extreme and boundary data, which you also use when checking a system.
:::

## Summary

:::summary
- Implementation: install hardware and software, convert data, train users, complete documentation and change over.
- Direct: quick and cheap but risky. Parallel: safest but most expensive. Phased: one part at a time. Pilot: whole system in one location first.
- Evaluation compares the system with its objectives and requirements, gathers user feedback and recommends improvements.
- Corrective maintenance fixes bugs; adaptive maintenance responds to changes such as new laws or hardware; perfective maintenance improves the system.
:::
