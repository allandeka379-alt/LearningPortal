---
{
  "key": "sad.documentation-training",
  "title": "System documentation and user training",
  "summary": "The two types of system documentation (user documentation and technical documentation), who uses each and what each contains, and why and how users of a new system are trained.",
  "concepts": ["comp.sad.documentation-training"],
  "estimatedMinutes": 30,
  "level": "core"
}
---
## Introduction

A new pharmacy system in Harare goes live on Monday. On Tuesday a pharmacist cannot remember how to print a repeat prescription, and on Wednesday the programmer who wrote the system leaves for a job in another city. A month later a new law requires an extra field on every receipt. Who will answer the pharmacist's question, and how will a new programmer understand the code well enough to change it?

The answers are **documentation** and **training**. Documentation is the written (or on-screen) record of how a system is used and how it works. Training gives users the skills and confidence to use the system. ZIMSEC Form 4 asks you to describe the types of documentation and their contents and to outline the importance of user training. Exam questions often ask you to list the contents of user or technical documentation, or to explain which document a particular person would need.

## Key definitions

:::definition{term="User documentation"}
Documentation written for the people who will use the system, explaining how to operate it to carry out their tasks, in non-technical language.
:::

:::definition{term="Technical documentation"}
Documentation written for programmers, analysts and technicians, explaining how the system was designed and built so that it can be maintained, corrected and improved.
:::

:::definition{term="User training"}
Teaching the people who will use a new system how to operate it correctly, efficiently and safely.
:::

## User documentation

User documentation is often called the **user guide** or **user manual**. It may be printed, a PDF, built-in help screens, short videos or an online help centre. Typical contents:

| Content | Purpose |
|:--|:--|
| Purpose of the system and what it can do | So users know what to use it for |
| Hardware and software requirements | So it can be installed on suitable equipment |
| How to install, start and log in | Getting started |
| Step-by-step instructions for each task, with screenshots | Carrying out tasks such as entering a sale or printing a report |
| Examples of inputs and outputs | Showing what to type and what to expect |
| How to save, back up and restore data | Protecting the user's work |
| Error messages and what to do about each (troubleshooting) | Solving problems without calling for help |
| Frequently asked questions (FAQs) | Quick answers to common questions |
| Glossary of terms | Explaining unfamiliar words |
| Index and contents page | Finding information quickly |
| Contact details for support | Getting further help |

User documentation must be written in **plain, non-technical language**, with clear headings and pictures.

Many systems now provide **context-sensitive help**: pressing a help button on a screen opens the instructions for that screen only, so the user does not have to search a long manual. A short **quick reference guide** (one or two pages of the most common tasks) is also useful beside a till or reception desk. Whatever the format, the documentation must be kept **up to date**: when the system changes, the screenshots and instructions must change too, or users will be confused by instructions that no longer match what they see.

## Technical documentation

Technical documentation is also called **system** or **maintenance** documentation. Typical contents:

| Content | Purpose |
|:--|:--|
| Requirements specification and objectives | What the system was built to do |
| System flowcharts, DFDs and structure diagrams | How the system fits together |
| Algorithms (pseudocode or program flowcharts) | The logic of each process |
| Program listings with comments | The actual code, explained |
| File and database structures (data dictionary) | Tables, fields, data types, keys and validation |
| Variables, constants and their purposes | Understanding the code |
| Hardware and software requirements, including versions | The exact environment needed |
| Test plan, test data and test results | Evidence of testing; data to re-test after changes |
| Known limitations and bugs | Problems still to fix |
| Version history | What has changed and when |

Technical documentation lets a **different** programmer maintain the system, because the original developer may leave. It is used during maintenance to find and fix errors and to add new features.

:::example{title="Which documentation?"}
1. A receptionist does not know how to cancel a booking: **user documentation** (step-by-step instructions).
2. A new programmer must add a field to the Customers table: **technical documentation** (data dictionary and program listings).
3. An error message "Printer not found" appears: **user documentation** (troubleshooting section).
4. A technician must reinstall the system on a new server: **technical documentation** (hardware and software requirements, installation details), supported by the installation section of the user guide.
:::

## User training

### Why training is important

- Users can use the system **correctly**, so fewer errors are made in the data.
- They work **efficiently** and use all the features, so the organisation gets the full benefit of its investment.
- They feel **confident**, so they accept the new system rather than resisting it.
- They know **security** rules: logging off, protecting passwords and data.
- Fewer calls to the help desk and less time lost.

### Methods of training

| Method | Advantages | Disadvantages |
|:--|:--|:--|
| Instructor-led (classroom) course | Questions answered immediately; hands-on practice | Staff away from work; cost of trainer and venue; same pace for all |
| On-the-job training (a trained colleague shows others) | Learnt in the real situation; little extra cost | May pass on bad habits; disrupts the colleague's work |
| Online (e-learning) courses and video tutorials | Learn at own pace and time; can be repeated | Needs devices and internet; no one to ask questions immediately |
| User manuals and help screens (self-study) | Cheap; always available | Needs self-discipline; some users do not read manuals |

After training, the organisation should check that it worked, for example by watching users complete real tasks, by short quizzes, or by counting the errors and help-desk calls in the first weeks. Refresher training is given when new staff join or when the system is updated.

Training is usually given **before** and during the changeover to the new system, and **different users need different training**: managers learn to produce reports, clerks learn data entry, and technicians learn backups and user accounts.

:::example{title="A training plan for a school"}
Masvingo Christian College (fictional) is introducing a computerised results system.

- **Who:** 40 teachers (entering marks), 3 office staff (reports and printing), 1 technician (backups, user accounts).
- **How:** a two-hour hands-on workshop for teachers in the computer lab; a full-day course for office staff by the supplier; the technician uses the technical documentation and an online course.
- **When:** in the last week of the holiday, before the system starts.
- **Support:** a short printed quick guide for each teacher and a help screen on every page.
:::

## Common mistakes

:::mistake{title="Putting program code in the user guide"}
Users do not need code or data structures. These belong in the technical documentation.
:::

:::mistake{title="Saying documentation is written only at the end"}
Documentation is built up throughout the project: requirements in analysis, designs in design, test results during testing. It is completed during implementation.
:::

## Exam tips

:::exam-tip
When asked for contents, give items that clearly belong to the type asked: for user documentation, "how to print a report" or "troubleshooting guide"; for technical documentation, "program listing" or "data dictionary".
:::

:::exam-tip
"Explain the importance of training" needs **consequences**: fewer errors, efficient use, user acceptance, security awareness.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Documentation and user training are examined by ZIMSEC only (Form 4). Cambridge 0478 asks for maintainable code (comments, meaningful identifiers), which is part of technical documentation.
:::

## Summary

:::summary
- User documentation is for users: purpose, requirements, how to start and carry out tasks, examples, backups, troubleshooting, FAQs, glossary and index, in plain language.
- Technical documentation is for programmers and technicians: requirements, diagrams, algorithms, commented code, data dictionary, test plan and results, limitations and versions.
- Technical documentation allows the system to be maintained by someone other than its original developer.
- Training helps users work correctly, efficiently, confidently and securely.
- Training methods: instructor-led courses, on-the-job training, online courses and videos, manuals and help screens.
:::
