// Slice w4b: user interface design (acs.prog.interface-design, ZIMSEC only).
import { concept, P, chk, same, mdTable, codeBlock } from "../lib.mjs";
import { mc, pm } from "../tables/w4b-q.mjs";

concept("acs.prog.interface-design", { file: "prog/interface-design", keyPrefix: "prog.interface-design" }, (b) => {
  // ---- computed: user test
  const times = [45, 60, 75, 80];
  const done = [true, true, true, false];
  const avg = times.reduce((a, c) => a + c, 0) / times.length;
  chk(avg, 65);
  const succ = (100 * done.filter(Boolean).length) / done.length;
  chk(succ, 75);
  const over = times.filter((t) => t > 70).length;
  chk(over, 2);
  const testTable = mdTable(["User", "Time to pay the fees (seconds)", "Completed without help?"], times.map((t, i) => [`User ${i + 1}`, t, done[i] ? "Yes" : "No"]));
  // second small data set for a num question
  const t2 = [32, 41, 50, 45, 52];
  const avg2 = t2.reduce((a, c) => a + c, 0) / t2.length;
  chk(avg2, 44);

  // ---- multiple choice
  mc(b, 2, "RECALL", "What is a user profile?",
    ["A description of the people who will use a system and their needs", "It guides the design of the interface."],
    [["A list of the errors found in a program", "That is a test log."], ["A diagram of the data stored in a database", "That is a data model."], ["A report of how fast a program runs on the computer", "That is a performance measurement."]],
    "A user profile records who the users are, their skills and needs.", { daily: true });
  mc(b, 2, "APPLICATION", "Which input control is the most suitable for choosing a form from the fixed list Form 1 to Form 6, so that no invalid entry is possible?",
    ["A drop-down list", "Only the listed forms can be chosen."],
    [["A text box", "Anything could be typed."], ["A button", "A button starts an action; it does not select a value."], ["A heading", "A heading is only a title."]],
    "Use a list when the choices are fixed.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Why should every field on an input form have a clear label?",
    ["So that the user knows what data to enter", "A label tells the user what the field is for."],
    [["So that the form uses less memory", "Labels do not save memory."], ["So that the data is encrypted", "Labels do not encrypt data."], ["So that the form can be printed in colour", "Printing is not the reason."]],
    "Labels tell users what to enter and reduce mistakes.", { daily: true });
  mc(b, 3, "APPLICATION", "In a report that lists fees paid, how should the column of amounts be aligned so that the values can be compared easily?",
    ["Right-aligned, with equal decimal places", "The digits line up by place value."],
    [["Left-aligned, in the same way as the text is", "Digits of different place value would not line up."], ["Centred, so that the column looks neat", "Centred numbers do not line up."], ["In a different position in each of the rows", "That makes comparing impossible."]],
    "Numbers are right-aligned (or aligned on the decimal point).", { hints: ["Which alignment puts units under units and tens under tens?"] });
  mc(b, 3, "ANALYSIS", "A screen shows errors in red and successful entries in green, and nothing else. Why could this be a problem?",
    ["Some users cannot tell red from green", "Colour should not be the only way to show meaning."],
    [["Red and green need a lot of memory", "Colours do not need extra memory."], ["Colours cannot be shown on a monitor", "Monitors show colour."], ["Green is always invisible on a white background", "Green can be seen on white."]],
    "Add words or symbols so that meaning does not depend on colour.", { hints: ["Think about colour blindness."] });
  mc(b, 2, "UNDERSTANDING", "Which message is the best response to a mobile number that has only 9 digits?",
    ["Enter 10 digits starting with 07", "It states what is wrong and how to correct it."],
    [["Error: the entry was not accepted by the system", "It does not say what is wrong."], ["Invalid entry: the value was not accepted", "It does not help the user to fix it."], ["Entry rejected, please try the entry again", "It does not give the reason."]],
    "A good message says what is wrong and what to do.");
  mc(b, 2, "RECALL", "Which is a usability criterion for an interface?",
    ["Learnability", "Whether new users can learn it easily."],
    [["Compression", "That is a method of reducing file size."], ["Latency", "That is a delay in a network."], ["Resolution", "That is the detail of an image."]],
    "Usability criteria include learnability, efficiency and error tolerance.");

  // ---- true / false
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A drop-down list is used on a form to prevent users from entering a value that is not one of the allowed choices.", answer: true,
    explanation: "True. Only the listed values can be selected, so a type of invalid entry is impossible." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Using different colours, positions and wording for the same button on each screen makes an interface easier to learn.", answer: false,
    explanation: "False. Consistency makes an interface easier to learn: the same button should look the same and be in the same place on every screen." });

  // ---- fib, num, short, match
  b.fib({ d: 2, skill: "APPLICATION", stem: "Choose the most suitable control for each field of a library form.",
    template: "Date the book is due back: {{blank:a}}\n\nBook category (Fiction, Science, History): {{blank:b}}\n\nMember wants an email reminder (yes or no): {{blank:c}}",
    blanks: [{ id: "a", accepted: ["date picker"], choices: ["date picker", "drop-down list", "check box", "text box"] }, { id: "b", accepted: ["drop-down list"], choices: ["date picker", "drop-down list", "check box", "text box"] }, { id: "c", accepted: ["check box"], choices: ["date picker", "drop-down list", "check box", "text box"] }],
    explanation: "A date picker for a date, a list for a fixed set of categories and a check box for yes/no." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Add the times and divide by the number of users."],
    stem: "Five users test a library screen. They take 32, 41, 50, 45 and 52 seconds to borrow a book. Calculate the average time in seconds.",
    value: avg2, unit: "s", wrong: [41, 45], workedSolution: "32 + 41 + 50 + 45 + 52 = 220, and 220 ÷ 5 = 44.", explanation: "The average time is 44 seconds." });
  b.short({ d: 2, skill: "RECALL", stem: "State the name of the validation check that makes sure a required field has not been left empty.", accepted: ["presence check", "presence", "a presence check"], wrong: ["range check"], explanation: "A presence check." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each usability criterion to the question it asks.",
    pairs: [["Effectiveness", "Can users complete their tasks correctly?"], ["Efficiency", "How many steps or seconds does a task take?"], ["Learnability", "Can a new user work it out without long training?"], ["Error tolerance", "Does it prevent and explain mistakes?"]],
    explanation: "The usability criteria and what they test." });

  // ---- self-marked
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Think about age, skill and what they need."],
    stem: "An app is being designed for farmers in a rural district who have used only basic mobile phones. Describe three features of a suitable user profile for them. [3]",
    points: ["Little experience of apps or computers, so the screens need simple steps and plain wording", "Small screens and slow connections, so pages should be light and buttons large", "Language needs (a local language or simple English) and possible difficulty reading small text"],
    modelAnswer: "The farmers have little experience of apps, so the steps must be simple. They use small screens and slow connections, so pages should be light and buttons large. They may prefer a local language or simple English.", explanation: "Link each profile feature to a design decision." });
  b.manualShort({ d: 4, skill: "CREATION", marks: 4, hints: ["List the fields, the control for each, a check and the button."],
    stem: "Describe the design of an input screen for a school library to register a new member (name, form, date joined). [4]",
    points: ["A heading and clear labels beside each field", "A text box for the name with a presence check", "A drop-down list for the form and a date picker (or date field with a check) for the date joined", "A clearly labelled Save button, with helpful messages for invalid entries"],
    modelAnswer: "The screen has a heading and a clear label beside each field. The name is a text box with a presence check, the form is chosen from a drop-down list, and the date joined uses a date picker. A Save button is at the end, and invalid entries give a message that says how to correct them.", explanation: "Fields, controls and validation." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 3, hints: ["Comment on alignment, labels and colour."],
    stem: "A report of fees paid shows the amounts left-aligned in small, light-grey text on a white background, with no heading. Suggest three improvements. [3]",
    points: ["Add a heading that says what the report shows (and the date or term)", "Right-align the amounts, with the same number of decimal places", "Use a larger, dark font on a white background for good contrast"],
    modelAnswer: "Add a heading with the term, right-align the amounts with the same number of decimals, and use larger dark text on a white background for contrast.", explanation: "Improve layout and readability." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 2, hints: ["Think about what users have to learn."], stem: "Explain why an interface should be consistent from one screen to the next. [2]",
    points: ["Users learn the positions and meanings of buttons and menus once and can apply them on every screen", "This reduces mistakes and the time needed to learn the system"],
    modelAnswer: "Users learn once where things are and what they mean and can use the same knowledge on every screen, which reduces mistakes and learning time.", explanation: "Consistency supports learnability." });

  // ---- structured practice
  b.struct({ d: 4, skill: "CREATION", examStyle: true, hints: ["Link each feature to the users: older parents on shared phones.", "A message should say what is wrong and what to do."],
    explanation: "Designing a fees payment screen for a stated group of users.",
    stem: "A school in Chivhu wants a mobile screen on which parents pay school fees. Most parents are over 40, use a basic smartphone with a small screen and have little experience of apps. The screen has the fields Learner number, Term and Amount, and a Pay button.",
    parts: [
      pm("(a)", "Which control is the most suitable for the field `Term`, which has the choices Term 1, Term 2 and Term 3?", ["A drop-down list", "The user chooses from the fixed list."], [["A text box", "Anything could be typed."], ["A check box that allows all three to be ticked", "Only one term is paid at a time."], ["A heading", "A heading cannot be used to select."]], "A fixed choice is best made from a list."),
      P.manual({ label: "(b)", marks: 2, stem: "Describe two validation checks for the field `Amount` and give a suitable message for one of them.", points: ["A presence check (not left empty) and a range check (more than zero and not more than the fees due) or a type check that it is a number", "A helpful message such as \"Enter an amount greater than 0\""], modelAnswer: "A presence check so that it is not empty, and a range check so that the amount is more than 0 and not more than the fees due. A message such as \"Enter an amount greater than 0\".", explanation: "Checks plus a helpful message." }),
      P.manual({ label: "(c)", marks: 2, stem: "Describe two features of the screen that make it suitable for the parents in the profile.", points: ["Large text and large buttons, because of the small screen and older users", "Simple wording and few steps, because of little experience of apps"], modelAnswer: "Large text and a large Pay button suit the small screen and older users. Simple wording and few steps suit parents with little experience of apps.", explanation: "Link features to the profile." }),
      P.manual({ label: "(d)", marks: 3, stem: "After payment the screen shows a confirmation. Describe the output design of the confirmation message.", points: ["States clearly that the payment was successful, with a heading", "Shows the amount, the learner number, the term and the date", "Uses a symbol or words as well as colour, and has a clearly labelled button to finish"], modelAnswer: "A heading states that the payment was successful and the screen shows the amount, the learner number, the term and the date. A tick symbol and words are used as well as colour, and a clear Finish button ends the task.", explanation: "Output design for a confirmation." }),
    ] });
  b.struct({ d: 3, skill: "EVALUATION", examStyle: true, calculator: false, hints: ["Average time = total ÷ number of users.", "Compare the results with the target."],
    explanation: "Evaluating an interface from user-test results.",
    stem: `Four users tested the fees screen. The target was that every user completes the payment without help in no more than 70 seconds.\n\n${testTable}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the average time taken.", value: 65, unit: "s", wrong: [260, 70], workedSolution: "45 + 60 + 75 + 80 = 260 and 260 ÷ 4 = 65.", explanation: "The average time is 65 seconds." }),
      P.num({ label: "(b)", marks: 1, stem: "State the percentage of users who completed the payment without help.", value: 75, unit: "%", wrong: [25, 3], workedSolution: "3 of the 4 users completed it: 3 ÷ 4 × 100 = 75.", explanation: "75 percent completed it." }),
      P.num({ label: "(c)", marks: 1, stem: "State how many users took longer than the target of 70 seconds.", value: 2, wrong: [1, 4], workedSolution: "Users 3 and 4 took 75 and 80 seconds.", explanation: "Two users were slower than the target." }),
      P.manual({ label: "(d)", marks: 2, stem: "State whether the screen meets the target and justify your answer.", points: ["It does not meet the target", "One user needed help and two users took longer than 70 seconds (the average being below 70 is not enough because every user must succeed in time)"], modelAnswer: "It does not meet the target. One user needed help and two users took longer than 70 seconds, even though the average of 65 seconds is below 70.", explanation: "The target applies to every user." }),
      P.manual({ label: "(e)", marks: 1, stem: "Suggest one way to find out why User 4 needed help.", points: ["Ask User 4 (or watch a user of the same profile) which step was confusing"], modelAnswer: "Ask User 4 which step was confusing, or watch them use the screen.", explanation: "Observation and questions find the cause." }),
    ] });

  // ---- flashcards
  b.card("DEFINITION", "User interface", "The screens, forms, menus and reports through which people enter data and see results.");
  b.card("DEFINITION", "User profile", "A description of the users: age, skills, needs, language, device and place of use. It decides the design.");
  b.card("CONCEPT", "Input design rules", "Clear labels, logical order and tab order, suitable controls, defaults, validation with helpful messages, consistency.");
  b.card("CONCEPT", "Choosing a control", "Text box: free text. Drop-down or option buttons: fixed choice. Check box: yes/no. Date picker: dates. Button: action.");
  b.card("CONCEPT", "Output design rules", "Heading, left-aligned text, right-aligned numbers, white space, readable font, strong contrast, colour not the only meaning.");
  b.card("FACT", "Usability criteria", "Effectiveness, efficiency, learnability, error tolerance, satisfaction, accessibility.");
  b.card("CONCEPT", "Good error message", "States what is wrong and how to fix it: \"Enter 10 digits starting with 07\", not \"Invalid\".");
  b.card("CONCEPT", "Evaluating an interface", "Compare with the criteria and user tests (time, success rate), find the causes of problems, improve and test again.");
});
