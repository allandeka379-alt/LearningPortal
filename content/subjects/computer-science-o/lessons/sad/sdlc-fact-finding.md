---
{
  "key": "sad.sdlc-fact-finding",
  "title": "The systems development life cycle and fact-finding",
  "summary": "The stages of the systems development life cycle, problem identification and the preliminary investigation, and the four fact-finding methods (questionnaire, interview, record inspection and observation) with the advantages and disadvantages of each.",
  "concepts": ["comp.sad.sdlc-fact-finding"],
  "estimatedMinutes": 40,
  "level": "core",
  "freePreview": true
}
---
## Introduction

Tatenda's family runs a busy hardware shop in Masvingo. Sales are written in a counter book, stock is counted by hand every month, and customers often wait while an assistant searches a shelf for an item that, it turns out, sold out last week. The family decides to computerise. Where should they start? Not by buying a computer, but by **finding out exactly how the shop works now and what is going wrong**.

Developing a new information system is a big project, so it is done in an organised sequence of stages called the **systems development life cycle (SDLC)**. The person who leads it is a **systems analyst**. ZIMSEC Form 1 asks you to outline the stages of the SDLC and to identify the problems of an existing system using questionnaires, interviews, record inspection and observation. These are among the most frequently examined parts of Paper 2.

## Key definitions

:::definition{term="System"}
A set of parts (people, procedures, hardware, software and data) that work together to achieve a purpose, such as processing sales in a shop.
:::

:::definition{term="Systems development life cycle (SDLC)"}
The series of stages followed to develop a new information system or replace an existing one, from identifying the problem to maintaining the finished system.
:::

:::definition{term="Systems analyst"}
The person who studies an existing system, identifies its problems and users' requirements, and designs and oversees the development of a new system.
:::

:::definition{term="Fact-finding"}
Collecting information about how the current system works, its problems and what users need, using methods such as questionnaires, interviews, record inspection and observation.
:::

## The stages of the SDLC

| Stage | Main activities |
|:--|:--|
| 1. Problem identification (preliminary investigation) | Recognise that the current system has problems; define the problem and the objectives of the new system; agree the scope |
| 2. Feasibility study | Decide whether a new system is technically, economically, legally, operationally and socially possible and worthwhile |
| 3. Analysis | Fact-finding; describe the current system (data flow diagrams); identify user and system requirements; consider alternative solutions |
| 4. Design | Design inputs, outputs, user interfaces, files or database tables, processes and a test plan |
| 5. Development and testing | Write or configure the software, create the files, and test with normal, abnormal and extreme data |
| 6. Implementation | Install hardware and software, convert data, train users, and change over from the old system |
| 7. Documentation | Produce user and technical documentation (written throughout the project) |
| 8. Evaluation | Check whether the new system meets its objectives; get user feedback |
| 9. Maintenance | Correct errors, adapt the system to changes and improve it over time |

The process is called a **cycle** because evaluation and maintenance eventually reveal new problems or needs, and the cycle starts again. Different textbooks group or name the stages slightly differently; what matters is the order and the activities in each.

## Problem identification and the preliminary investigation

The cycle starts when someone notices a problem: delays, errors, lost records, high costs, or a system that cannot cope with growth. In the **preliminary investigation** the analyst briefly studies the problem and produces a short report stating:

- what the problem is and its causes;
- the **objectives** of the new system (for example "produce a stock report in under one minute");
- the **scope**: what will and will not be included;
- whether the project seems worth a full feasibility study.

## Fact-finding methods

The analyst needs facts, not guesses. There are four main methods, and analysts normally use a combination.

### Questionnaires

A set of written questions given to many people, often with tick boxes.

| Advantages | Disadvantages |
|:--|:--|
| Many people can be asked quickly and cheaply, even in different places | People may not return them, or may answer carelessly |
| Answers can be anonymous, so people may be more honest | Questions cannot be explained or followed up |
| Closed questions are easy to analyse and compare | Badly designed questions give misleading answers |
| People answer in their own time | Only answers the questions asked; unexpected problems may be missed |

### Interviews

A face-to-face (or phone) conversation between the analyst and a user or manager.

| Advantages | Disadvantages |
|:--|:--|
| Detailed answers; the analyst can ask follow-up questions | Time-consuming, so only a few people can be interviewed |
| Questions can be explained and adapted | Expensive in the analyst's time and the interviewee's work time |
| Body language shows how people feel about the system | Interviewees may say what they think the analyst wants to hear |
| Builds trust with users who will use the new system | Not anonymous; results are harder to compare |

### Record inspection (document analysis)

The analyst examines existing documents: invoices, receipts, forms, reports, stock cards, ledgers and files.

| Advantages | Disadvantages |
|:--|:--|
| Shows the actual data used: its fields, types, volumes and formats | Documents may be out of date, incomplete or confidential |
| Gives facts and figures, not opinions | Time-consuming if there are many records |
| Does not disturb staff while they work | Does not show how people actually use the documents |

### Observation

The analyst watches the current system being used, for example sitting at the counter for a day.

| Advantages | Disadvantages |
|:--|:--|
| Shows what really happens, including informal procedures | People may work differently because they know they are being watched |
| First-hand, reliable information about delays and bottlenecks | Time-consuming; problems may not occur while the analyst is watching |
| The analyst sees the whole process from start to finish | May make staff uncomfortable; cannot show staff opinions |

### Combining methods

No single method gives the whole picture. A typical investigation inspects records first (to learn the data), then observes the work (to see the real procedure), and then interviews key staff to ask about what was seen. A questionnaire is added when many people are affected. Facts from one method can be checked against another: if the manager says sales are always recorded, but observation shows cash sales are sometimes not written down, the analyst has found a real problem to solve.

:::example{title="Choosing fact-finding methods"}
Farai is the analyst for Tatenda's hardware shop, which has a manager, four assistants and about 300 regular trade customers.

- **Interview the manager**: to learn the objectives, budget and main problems in detail.
- **Observe the assistants** at the counter on a busy Saturday: to see how sales are recorded and where customers wait.
- **Inspect records**: the counter book, invoices and monthly stock sheets, to find the fields needed and the number of sales per day.
- **Questionnaire to trade customers**: too many to interview, and they are spread across the town; a short questionnaire collects their views quickly.
:::

:::example{title="Matching methods to situations"}
1. A university wants the views of 2,000 students on its library system: **questionnaire** (large, spread-out group).
2. The analyst needs to know which fields are on a hospital admission form: **record inspection**.
3. The analyst suspects clerks skip a step in the official procedure: **observation** (shows what really happens).
4. The analyst needs the head teacher's detailed requirements: **interview**.
:::

## Common mistakes

:::mistake{title="Giving advantages without context"}
"Interviews are good" scores nothing. Say why: "the analyst can ask follow-up questions to get more detail".
:::

:::mistake{title="Saying observation shows opinions"}
Observation shows what people **do**. To find out what they **think**, use interviews or questionnaires.
:::

:::mistake{title="Starting with design"}
A new system cannot be designed until the problem is identified, its feasibility is checked and the current system is analysed.
:::

## Exam tips

:::exam-tip
Learn the SDLC stages **in order**. A common question gives an activity ("users are trained", "a data flow diagram is drawn") and asks which stage it belongs to.
:::

:::exam-tip
For "recommend a fact-finding method", consider the **number of people** and **what you need to know**: many people → questionnaire; detailed views of a few → interview; actual data → record inspection; what really happens → observation.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
The SDLC and fact-finding are examined by ZIMSEC only. Cambridge 0478 has the shorter **program** development life cycle (analysis, design, coding, testing), covered with algorithm design.
:::

## Summary

:::summary
- The SDLC stages: problem identification, feasibility study, analysis, design, development and testing, implementation, documentation, evaluation and maintenance.
- The preliminary investigation defines the problem, objectives and scope.
- Questionnaires reach many people cheaply but cannot be followed up.
- Interviews give detailed answers with follow-up questions but are time-consuming.
- Record inspection gives real data and volumes; observation shows what actually happens, though people may act differently when watched.
:::
