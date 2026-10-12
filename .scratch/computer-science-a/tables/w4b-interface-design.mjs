import { writeLesson, mdTable, codeBlock, py, same, chk } from "./w4b-q.mjs";

// ---- validation of the phone field: rule = exactly 10 digits, starting with 07
const rule = `def phone_ok(text):
    return len(text) == 10 and text.isdigit() and text.startswith("07")
`;
const tests = [["0771234567", "normal"], ["077123456", "too short"], ["07712345678", "too long"], ["0871234567", "wrong start"], ["07712x4567", "contains a letter"], ["", "empty"]];
const res = py(`${rule}\nfor t in ${JSON.stringify(tests.map((t) => t[0]))}:\n    print(phone_ok(t))`).split("\n");
same(res, ["True", "False", "False", "False", "False", "False"]);
const valTable = mdTable(["Entry", "Reason for the test", "Accepted?"], tests.map(([v, why], i) => [v === "" ? "(nothing entered)" : `\`${v}\``, why, res[i] === "True" ? "Yes" : "No"]));

// ---- user test results
const times = [95, 120, 80, 150, 110];
const done = [true, true, true, false, true];
const avg = times.reduce((a, c) => a + c, 0) / times.length;
chk(avg, 111);
const success = (100 * done.filter(Boolean).length) / done.length;
chk(success, 80);
const testTable = mdTable(["User", "Time to register (seconds)", "Completed without help?"], times.map((t, i) => [`User ${i + 1}`, t, done[i] ? "Yes" : "No"]));

const profile = mdTable(["Feature of the user", "Learner at a rural school", "Clinic receptionist"], [
  ["Age", "13 to 16", "25 to 55"],
  ["Computer skill", "Little experience; uses a phone", "Uses the system all day"],
  ["Device", "Shared computer with a small screen", "Desktop computer with keyboard"],
  ["Needs", "Short screens, clear instructions, large buttons", "Speed: keyboard shortcuts and few clicks"],
  ["Language", "English, with simple words", "English"],
]);

const formTable = mdTable(["Field", "Label", "Control", "Validation", "Message if wrong"], [
  ["Surname", "Surname", "Text box", "Presence check", "Please enter your surname"],
  ["Date of birth", "Date of birth", "Date picker", "Date in the past", "The date must be in the past"],
  ["Gender", "Gender", "Option buttons", "One option chosen", "Please choose one"],
  ["Form", "Form (1 to 6)", "Drop-down list", "Choice from the list", "Please choose a form"],
  ["Phone", "Mobile number", "Text box", "10 digits, starts with 07", "Enter 10 digits starting with 07"],
  ["Register", "Register", "Button", "none", "none"],
]);

const body = `
## Introduction

A mobile-money menu that needs five screens and three confirmations to send a small amount will frustrate users, and a registration form that rejects a phone number without saying why will send them away. The **user interface** is the part of a program that people actually see and use, and it can make the same program a pleasure or a burden. Good interfaces do not happen by accident: they are designed for the people who will use them.

This lesson covers building a profile of the users, designing input forms and screens, designing output reports and screens, the criteria for a usable interface, and evaluating an interface. Designs are described in words and tables, because the aim is to explain your decisions. You should know what validation is and how data is entered into a program.

## Key definitions

:::definition{term="User interface"}
The means by which a person communicates with a computer system: the screens, forms, menus, buttons and reports through which data is entered and results are shown.
:::

:::definition{term="User profile"}
A description of the people who will use a system: who they are, their age, skills, needs, language, the devices they use and the conditions in which they work. It is used to decide what the interface should be like.
:::

:::definition{term="Usability"}
How well a system lets its intended users reach their goals: whether they can complete tasks correctly (effectiveness), quickly (efficiency), learn the system easily, recover from mistakes and feel satisfied with it.
:::

:::definition{term="Input design"}
The design of the forms and screens through which data is entered, including labels, controls, order of fields, defaults and validation.
:::

:::definition{term="Output design"}
The design of the reports and screens that present results, including layout, readability, use of colour and the choice of tables, text or charts.
:::

## Building a user profile

Before drawing a single screen, ask who will use it. Two groups using the same registration system may need very different interfaces.

${profile}

The profile gives design decisions a reason. The learner's screens should be short, with large buttons and plain instructions; the receptionist needs a fast form that can be completed from the keyboard. Other points in a profile include any disability (poor sight, difficulty using a mouse), the language, the place of use (a noisy office or a dark room) and whether the connection is slow, which is a good reason to avoid large images.

## Input design

Good forms follow a few rules.

- **Label every field** clearly, next to the field, using the words the users use.
- **Group and order** related fields in a logical order, the way users think, and make the tab key move through the fields in that order.
- **Choose the right control**: a text box for free text, a drop-down list or option buttons for a fixed choice (so mistakes are impossible), a check box for yes/no, a date picker for dates, a button for an action.
- **Give defaults** where the likely answer is known, and mark required fields.
- **Validate** the data at the point of entry (presence, range, format, length, type) and give a helpful message that says what is wrong and how to fix it.
- **Be consistent**: same positions for buttons, same wording and colours on every screen.

:::worked-solution{title="Designing a registration form"}
A clinic needs a screen to register a new patient. The design is described as a table:

${formTable}

The date of birth uses a date picker so the format cannot be wrong, the form and gender are chosen from a fixed list, and the phone number is checked by a rule. The rule for the phone field (exactly 10 digits, starting with 07) was written as a function and tested with data of each kind; the results are:

${valTable}

Only the correct entry is accepted. Each rejected entry gets the message in the design table, which tells the user what to do, rather than only "Invalid".
:::

## Output design

A report or screen must be readable and fit for its purpose.

- Give each screen or report a **heading** and show units and dates clearly.
- **Align** text on the left and numbers on the right (or on the decimal point) so that columns can be compared.
- Use **white space**, a readable **font size** and a limited number of fonts.
- Use **colour** with care: keep strong contrast between text and background, use few colours, and never use colour alone to carry meaning (some users cannot tell certain colours apart), so add a symbol or word.
- Use a **table** for exact values, a **chart** to show trends or comparisons, and a **short text message** for a confirmation.
- Show the most important information first, and do not overload a screen.

## Usability criteria

A usable interface is judged by these criteria:

| Criterion | Question to ask |
|:--|:--|
| Effectiveness | Can the users complete their tasks correctly? |
| Efficiency | How many steps, clicks or seconds does a task take? |
| Learnability | Can a new user work out what to do without long training? |
| Error tolerance | Does it prevent mistakes, explain them and let the user recover? |
| Satisfaction | Is it pleasant, clear and consistent? |
| Accessibility | Can people with different needs (sight, language, device) use it? |

## Evaluating an interface

An interface is evaluated by comparing it with the criteria, by asking users, and by watching them complete tasks. Five new users registered a patient, and the results were recorded:

${testTable}

The average time was ${avg} seconds, and ${success} percent of the users completed the task without help. If the target was to register a patient within 120 seconds with every user succeeding, the interface does not yet meet it: one user was slower than 120 seconds (150 seconds) and one needed help. The designer then asks the slow users what confused them and changes the design, for example by adding an example in the phone field, and tests again.

:::keyfact{title="ZIMSEC only"}
Interface design and user profiling are in the ZIMSEC syllabus (Form 5, Paper 1 and project work). Cambridge 9618 does not examine them, though its validation and program-design topics overlap. The answers expected are descriptions: say who the users are, what each design feature is and why it helps those users.
:::

## Common mistakes

:::mistake{title="Describing a design without the user"}
"The form is colourful" is not a reason. Link each feature to a need of the users in the profile.
:::

:::mistake{title="Using colour alone to show meaning"}
Red for an error and green for success cannot be told apart by some users. Add words or symbols.
:::

:::mistake{title="Vague validation messages"}
"Invalid" does not tell the user what to do. State what is wrong and how to fix it.
:::

:::mistake{title="Confusing input and output design"}
Input design is about entering data (forms, validation); output design is about presenting results (reports, screens). Answer the one that is asked.
:::

## Exam tips

:::exam-tip
ZIMSEC Paper 1 asks you to **describe** a user profile, **design** (in words or a table) an input form or an output screen for a scenario, **suggest** validation checks and messages, **list** usability features, and **evaluate** a given interface. For a design question list the fields or items, the control for each, and the check; for an evaluation say what is good, what is poor and what to improve, each linked to the users.
:::

:::exam-tip
Mention the users by name in every answer ("for older users a large font is needed") and give a reason for every feature.
:::

## Summary

:::summary
- A user interface should be designed for a profile of its users: age, skills, needs, language, device and place of use.
- Input design: clear labels, logical order, suitable controls, defaults, validation with helpful messages, and consistency.
- Output design: headings, alignment, white space, readable fonts, careful colour that is not the only carrier of meaning, and the right choice of table or chart.
- Usability is judged by effectiveness, efficiency, learnability, error tolerance, satisfaction and accessibility.
- An interface is evaluated by user testing and by comparing it with the criteria, then improved and tested again.
:::
`;
writeLesson({ key: "prog.interface-design", title: "User interface design: user profiling, input and output design", summary: "Building a user profile, designing input forms and screens with labels, controls and validation, designing output reports and screens, usability criteria and evaluating an interface, with designs described in words and tables.", concept: "acs.prog.interface-design", minutes: 50 }, body);
