// Slice EWR2: memoranda.
import { concept } from "../lib.mjs";

const br = (...l) => l.join("\\\n");

concept("eng.functional.memo", { file: "functional/memo", keyPrefix: "functional.memo" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which set of lines forms the **heading block** of a memo?",
    options: [
      ["To, From, Date, Subject", "Correct: these four lines replace the addresses and greeting of a letter."],
      ["Address, Date, Dear Sir, Subject", "That is the opening of a formal letter."],
      ["Headline, Strapline, By-line", "Those are the format features of an article."],
      ["Title, Introduction, Findings", "Those are sections of a report."],
    ],
    answer: "A",
    explanation: "A memo begins with **MEMORANDUM**, then **To / From / Date / Subject**. There is no salutation.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "A memo is used mainly for communication…",
    options: [
      ["between people inside the same organisation", "Correct: a memo is internal, for example from the Head to staff."],
      ["between a school and a newspaper editor", "That calls for a letter to the editor."],
      ["between two close friends living far apart", "That calls for an informal letter or email."],
      ["between an applicant and a possible employer", "That calls for a formal letter of application."],
    ],
    answer: "A",
    explanation: "Memos are **internal** communications: Head to staff, manager to workers, chairperson to club members.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Which is the **best subject line** for a memo telling teachers about a change in the date of the staff meeting?",
    options: [
      ["Subject: Staff meeting moved to Thursday 5 March", "Correct: specific, so readers know the content before reading."],
      ["Subject: Very important please read now", "Urgent but vague: it does not say what the memo is about."],
      ["Subject: Hello to all our hard-working staff", "A greeting, not a subject."],
      ["Subject: Something has changed this week", "Too vague to be useful."],
    ],
    answer: "A",
    explanation: "A memo subject line should let a busy reader know the main point at a glance.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How should a memo **end**?",
    options: [
      ["With the action required and the writer's initials", "Correct: memos end with what readers must do and the writer's initials or signature."],
      ["With Yours faithfully and the writer's full name", "Memos have no complimentary close."],
      ["With Love and best wishes from the writer", "This is an informal letter close."],
      ["With a list of recommendations under a heading", "Recommendations under a heading belong to a report."],
    ],
    answer: "A",
    explanation: "A memo ends with the **action required** (and deadline), perhaps a brief courteous line, then the writer's initials.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which sentence would make the **best opening** for the body of a memo?",
    options: [
      ["Please note that the library will close at 3 p.m. from Monday 1 June.", "Correct: it states the key information at once, briefly and politely."],
      ["Dear colleagues, I hope you are all well and enjoying the term so far.", "Memos have no greeting or small talk."],
      ["Libraries have been important places of learning since ancient times.", "Background history wastes a busy reader's time."],
      ["I am writing this letter to inform you about the library hours.", "A memo is not a letter; get straight to the point."],
    ],
    answer: "A",
    hints: ["Memos are for busy readers.", "Which sentence gives the key fact first?"],
    explanation: "The body of a memo starts with its purpose or key information, with no greeting or background.",
  });
  b.match({
    d: 3, skill: "ANALYSIS",
    stem: "Match each line from a memo with the part of the memo where it belongs.",
    pairs: [
      ["All Form 1 class teachers", "To"],
      ["Mr T. Banda, Deputy Head", "From"],
      ["Transport for the inter-schools quiz", "Subject"],
      ["Please confirm your numbers with the office by Wednesday.", "Action required"],
    ],
    hints: ["Who is writing and who is reading?", "Which line asks readers to do something?"],
    explanation: "The heading block identifies readers (To), writer (From) and topic (Subject); the action required tells readers what to do.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "True or false? A memo begins with a salutation such as *Dear Staff*.",
    answer: false,
    explanation: "False. The To/From/Date/Subject block replaces a salutation, so a memo goes straight into its purpose.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "True or false? Numbered points are useful in a memo that gives several instructions.",
    answer: true,
    explanation: "True. Numbered points make each instruction easy to find and follow.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which word is the **plural** of *memorandum* in formal English?",
    options: [
      ["memoranda", "Correct: the Latin plural memoranda (memos is also acceptable in everyday use)."],
      ["memorandums's", "The apostrophe makes no sense here: an apostrophe shows possession, not a plural."],
      ["memorandi", "This is not a correct plural of memorandum."],
      ["memorandae", "This is not a correct plural of memorandum."],
    ],
    answer: "A",
    explanation: "*Memorandum* → *memoranda* (like *curriculum* → *curricula*). The short form *memo* → *memos*.",
  });
  b.fib({
    d: 2,
    stem: "Choose the best words for a memo.",
    template: "All staff are {{blank:a}} to submit mark schedules {{blank:b}} Friday 20 November.",
    blanks: [
      { id: "a", accepted: ["requested"], choices: ["requested", "begged", "invited kindly", "suggested"] },
      { id: "b", accepted: ["by"], choices: ["by", "until", "on to", "since"] },
    ],
    explanation: "*All staff are requested to…* is the standard polite instruction. A deadline takes **by**: *by Friday*. (*Until* means continuing up to a time.)",
  });

  b.ext({
    d: 2, skill: "CREATION", marks: 10, secs: 1000,
    stem: "You are the chairperson of the Interact Club at Marlborough High School, Harare. Write a **memo** (about 110 words) to all club members about a clean-up at Mbare Musika on Saturday 14 March. Include: meeting time and place, what to bring, transport arrangements and the action required.",
    wordLimit: { min: 90, max: 120 },
    points: [
      ["Complete heading block: MEMORANDUM, To, From (with title), Date, Subject", 3],
      ["Meeting time and place, items to bring and transport all stated clearly", 3],
      ["Clear action required with a deadline", 2],
      ["Brief, direct style; no salutation or complimentary close", 2],
    ],
    modelAnswer: `**MEMORANDUM**\n\n**MARLBOROUGH HIGH SCHOOL INTERACT CLUB**\n\n${br("**To:** All Interact Club members", "**From:** Tatenda Ruzvidzo, Chairperson", "**Date:** 6 March 2026", "**Subject:** Clean-up at Mbare Musika, Saturday 14 March")}\n\nThe club will hold its term clean-up at Mbare Musika next Saturday. Please note the following arrangements.\n\n1. Meet at the school gate at 7.00 a.m. sharp.\n2. Wear old clothes and closed shoes, and bring a hat and a water bottle. Gloves and bags will be provided.\n3. The school bus will take us to Mbare and bring us back by 1.00 p.m.\n\nPlease sign the list on the club notice board by Wednesday 11 March so that we can confirm numbers with the driver.\n\n*T.R.*`,
    explanation: "The model has the full heading block, a one-line purpose, numbered arrangements, a deadline for action and initials, with no greeting or close.",
  });
  b.ext({
    d: 3, skill: "CREATION", marks: 12, secs: 1300,
    stem: "You are the Head of Chipinge High School. Write a **memo** (about 140 words) to all teaching staff about a visit by Ministry officials next Tuesday. Include: the purpose of the visit, three things staff must have ready, the time of a short briefing on Monday and the action required.",
    wordLimit: { min: 120, max: 150 },
    points: [
      ["Full heading block with an appropriate subject line", 3],
      ["Purpose of the visit stated briefly", 2],
      ["Three items to have ready, in numbered points", 3],
      ["Briefing time and the action required with a deadline", 2],
      ["Concise, polite, direct style and accurate language", 2],
    ],
    hints: ["Think of documents a visiting official might check.", "Keep each item to one line."],
    modelAnswer: `**Plan and opening:**\n\n${br("**MEMORANDUM**", "**To:** All teaching staff", "**From:** Mr S. Mlambo, Head", "**Date:** 2 October 2026", "**Subject:** Ministry visit, Tuesday 13 October")}\n\nOpening: *Officials from the Provincial Education Office will visit the school on Tuesday 13 October to observe lessons and review curriculum records.*\n\nNumbered points: (1) up-to-date schemes of work and lesson plans; (2) learners' exercise books marked to date; (3) mark schedules for the last two tests.\n\nBriefing: Monday 12 October at 2.00 p.m. in the staff room.\n\nAction: *Heads of department should check their departments' records and report to the Deputy Head by Friday 9 October.* Initials: *S.M.*`,
    explanation: "A memo from a head stays brief and direct: purpose, numbered requirements, a briefing time and a clear action with a deadline.",
  });
  b.ext({
    d: 3, skill: "CREATION", marks: 10, secs: 1000,
    stem: "The following memo has several errors in format and style. Rewrite it correctly (about 100 words).\n\n*\"Dear all workers,\n\nHi there! I hope you are fine. I just wanted to say that, starting from next month, which is April, everybody should wear their protective boots in the workshop all the time, because last week someone hurt their foot and that was really bad. Also please don't forget the helmets. Thanks a lot.\n\nYours faithfully,\nThe Manager\"*",
    wordLimit: { min: 80, max: 110 },
    points: [
      ["Heading block added (MEMORANDUM, To, From, Date, Subject) and greeting/close removed", 3],
      ["Purpose stated directly at the start", 2],
      ["Instructions in clear numbered points with the start date", 3],
      ["Brief, polite, formal style; initials at the end", 2],
    ],
    hints: ["What replaces Dear… in a memo?", "Separate the boots and helmets into numbered points."],
    modelAnswer: `**MEMORANDUM**\n\n${br("**To:** All workshop staff", "**From:** Mr K. Zhou, Workshop Manager", "**Date:** 20 March 2026", "**Subject:** Compulsory protective equipment from 1 April")}\n\nFollowing an injury in the workshop last week, when a falling component struck a worker's foot, the following rules apply with effect from 1 April 2026:\n\n1. Protective boots must be worn at all times in the workshop.\n2. Safety helmets must be worn in all marked areas.\n\nPlease collect any missing equipment from the stores by Friday 27 March. Supervisors will check compliance daily.\n\n*K.Z.*`,
    explanation: "A memo replaces the greeting and close with a heading block and initials, states the purpose at once and gives instructions as numbered points with a clear date.",
  });

  b.card("DEFINITION", "Memo (memorandum)", "A brief, formal internal message within an organisation.");
  b.card("CONCEPT", "Memo format", "MEMORANDUM → To, From (with title), Date, Subject → purpose → numbered points → action required → initials.");
  b.card("FACT", "Does a memo have a salutation or complimentary close?", "No. The heading block replaces them; the memo ends with initials.");
  b.card("DEFINITION", "Action required", "The part of a memo that tells readers exactly what to do and by when.");
  b.card("VOCABULARY", "Memo phrases", "Please note that…; With effect from…; All staff are requested to…; Kindly submit … by …");
  b.card("FACT", "Plural of memorandum", "memoranda (or memos).");
  b.card("CONCEPT", "Memo style", "Brief, direct, polite, logically ordered; numbered points for several instructions.");
  b.card("CONCEPT", "Memo versus letter", "Memo: internal, heading block, initials. Letter: external, addresses, salutation, Yours faithfully/sincerely.");
});
