---
{
  "key": "sdlc.fact-finding-feasibility",
  "title": "Preliminary investigation, fact finding and feasibility",
  "summary": "How a development project starts: identifying the opportunity, collecting facts by interview, questionnaire, observation and document inspection, testing feasibility (technical, economic, operational, legal and schedule), and writing the user requirements specification.",
  "concepts": ["acs.sdlc.fact-finding-feasibility"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

The matron of a clinic in Kariba complains that patients wait too long because appointments are written in a book and often double-booked. She asks the school's computer club to "make a computer system". Before anybody writes a line of code, three questions must be answered: What exactly is the problem? Is a computer solution possible and worth its cost? What must the new system do?

The first stages of the ZIMSEC development cycle answer these questions. The **preliminary investigation** identifies the opportunity, the **fact-finding** techniques collect the details, the **feasibility study** decides whether to go ahead, and the **user requirements specification** records what the users need. A project that skips them often delivers a system that nobody wants.

You should know the stages of the development life cycle from the previous lesson.

## Key definitions

:::definition{term="Preliminary investigation"}
A short study at the start of a project to find out what the problem or opportunity is, who is affected and whether it is worth studying further.
:::

:::definition{term="Fact finding"}
The collection of detailed information about the present system and the needs of its users, using techniques such as interviews, questionnaires, observation and document inspection.
:::

:::definition{term="Feasibility study"}
A study that decides whether a proposed solution is practical, by testing it for technical, economic, operational, legal and schedule feasibility.
:::

:::definition{term="User requirements specification (URS)"}
A document, agreed with the users, that lists what the new system must do (and the constraints it must meet), so that it can be checked at the end of the project.
:::

## Fact-finding techniques

| Technique | How it works | Advantages | Disadvantages |
|---|---|---|---|
| Interview | The analyst asks questions face to face | Detailed answers; questions can be explained and followed up; body language is seen | Takes a long time; costly; answers may be biased |
| Questionnaire | A set of written questions is given to many people | Cheap; many people can answer; answers are easy to compare | Many are not returned; questions cannot be explained; little detail |
| Observation | The analyst watches the system in use | Shows what really happens; reveals problems nobody mentions | People may behave differently when watched; takes time |
| Document inspection | The analyst studies forms, reports and manuals | Shows the data actually used; formats and volumes can be seen | Documents may be out of date; does not show how the work is done |

The techniques are usually combined. A questionnaire finds what many users think, interviews follow up the most important issues, observation checks what really happens and documents show the data.

:::worked-solution{title="Planning the fact finding at the clinic"}
The analyst sends a questionnaire to {{sent}} patients, and {{returned}} are returned. She also interviews {{interviews}} members of staff for {{mins}} minutes each.
1. Response rate = {{returned}} ÷ {{sent}} × 100 = {{rate}}%. More than a third of the patients did not answer, so the results may not represent all patients.
2. Interview time = {{interviews}} × {{mins}} minutes = {{interviews}} × {{mins}} ÷ 60 = {{hours}} hours, before any time for writing up the notes.
3. She observes the reception desk for one morning to check what the interviews said.
:::

## The feasibility study

A solution is **feasible** if it passes all of the following tests.

| Type | Question |
|---|---|
| Technical | Is the hardware and software available, and do the staff have the skills to build and run it? |
| Economic | Do the benefits outweigh the costs? (a cost-benefit analysis) |
| Operational | Will the people use it, and will it fit the way they work? |
| Legal | Does it obey the law, such as data protection and copyright? |
| Schedule | Can it be finished in the time available? |

The **economic** test compares the cost of the new system with the benefits. The **payback period** is the time taken for the savings to repay the initial cost.

{{costTable}}

:::worked-solution{title="Is the booking system economically feasible?"}
The system saves US\${{monthlySaving}} a month in paper, filing and clerk time. Running costs are US\${{running}} a month.
1. Initial cost = US\${{initial}}.
2. Payback period = initial cost ÷ monthly saving = {{initial}} ÷ {{monthlySaving}} = {{payback}} months (ignoring the running costs).
3. {{payback}} months is a little over a year. Over three years (36 months) the savings are 36 × {{monthlySaving}} = US\${{benefit3}} and the running costs are 36 × {{running}} = US\${{runningTotal}}.
4. Net benefit after 3 years = {{benefit3}} − {{initial}} − {{runningTotal}} = US\${{net3}}, a positive amount, so the economic test is passed.
:::

If a solution fails any test, the study may recommend changing it or not proceeding. The result is written in a **feasibility report** with a recommendation to the management.

## The user requirements specification

When the study approves the project, the facts are turned into a **user requirements specification**. A good one:

- states the objectives of the system and what it must do (for example "record an appointment and refuse a second booking for the same time");
- lists the inputs, outputs and data to be stored;
- gives the constraints (budget, time, equipment, laws);
- is written in language the users understand and is signed by them;
- is specific enough to be tested at the end.

## Documents produced

| Stage | Document |
|---|---|
| Preliminary investigation | Preliminary report (problem, scope, recommendation) |
| Fact finding | Interview notes, questionnaire results, copies of documents |
| Feasibility study | Feasibility report with a recommendation |
| Analysis | User requirements specification |

:::keyfact{title="ZIMSEC only"}
This lesson is ZIMSEC only (Form 5). Cambridge AS Level starts its life cycle at analysis and does not examine the five feasibility tests or the named fact-finding techniques as a topic.
:::

## Common mistakes

:::mistake{title="Giving advantages of a technique without a comparison"}
"Questionnaires are good" earns nothing. Say what they are good for: "many people can be asked cheaply, and the answers are easy to compare".
:::

:::mistake{title="Confusing feasibility types"}
Cost is **economic** feasibility. Whether the staff have the skills is **technical** or **operational**. Whether it breaks the law is **legal**. Name the type in your answer.
:::

:::mistake{title="Writing a vague requirement"}
"The system should be fast" cannot be tested. Write "a booking must be saved in under 2 seconds".
:::

:::mistake{title="Forgetting the users in the specification"}
The specification is agreed with the users. If they have not seen it, the system may not meet their needs.
:::

## Exam tips

:::exam-tip
ZIMSEC Paper 1 asks you to "**describe**" or "**compare**" fact-finding techniques: name the technique, say how it works, and give one advantage and one disadvantage. For feasibility, "**state** and **explain**" each type with a question that applies to the scenario.
:::

:::exam-tip
Calculations (payback period, response rate, net benefit) are marked on working: show the formula, substitute the numbers and give the unit (months, %, US\$).
:::

## Summary

:::summary
- The preliminary investigation identifies the problem; the feasibility study decides whether to proceed.
- Fact finding uses interviews, questionnaires, observation and document inspection; each has advantages and disadvantages, and they are combined.
- Feasibility is tested for technical, economic, operational, legal and schedule reasons.
- The payback period is the initial cost divided by the saving per period.
- The user requirements specification, agreed with the users, lists what the system must do and can be tested.
:::
