// Slice EVO: listening skills, practised on short WRITTEN transcripts (the platform has no audio).
import { concept, P } from "../lib.mjs";

const T = "Read the transcript (a written record of what was said) as if you were hearing it once, then answer.";

const BUS = `${T}

**Transcript: an announcement at a bus terminus in Bulawayo**

*"Attention, please. Passengers travelling to Victoria Falls on the ten o'clock coach: we apologise, but this service will now depart at eleven fifteen because of a mechanical fault. Please wait in Bay 6, not Bay 4 as shown on your ticket. Refreshment vouchers are available from the ticket office. Thank you for your patience."*`;

const PHONE = `${T}

**Transcript: a voicemail message**

*"Hello, this is Mrs Ncube from Gweru Medical Supplies. I'm calling for Mr Dube about his order of first-aid kits. It was due on Tuesday, but it will now be delivered on Thursday morning, between nine and eleven. If that isn't convenient, please call me back on extension 204. Thank you."*`;

const FARMER = `${T}

**Transcript: part of a radio interview**

*Interviewer: "Mr Sibanda, has the new irrigation scheme helped your farm?"*
*Mr Sibanda: "Well, it's certainly better than nothing. We get water twice a week now, which is a start. But frankly, twice a week isn't enough for tomatoes in October, and nobody has told us when the second pump is coming."*`;

const TALK = `${T}

**Transcript: the opening of a talk by a nurse at a school in Chinhoyi**

*"Good afternoon. Today I want to talk about preventing malaria during the rainy season. First, I'll explain how the disease spreads. Next, I'll show you three simple ways to protect your family. However, the most important point I want you to remember is this: sleep under a treated net every night, not only when you see mosquitoes. Finally, I'll answer your questions."*`;

concept("eng.oral.listening", { file: "oral/listening", keyPrefix: "oral.listening" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does it mean to listen for **gist**?",
    options: [
      ["To understand the main point of what is said", "Correct: gist is the general meaning or main message."],
      ["To write down every word the speaker says", "That is impossible and not the aim of listening for gist."],
      ["To catch a specific time, name or number", "That is listening for detail."],
      ["To judge whether the speaker has a good voice", "Gist is about meaning, not voice quality."],
    ],
    answer: "A",
    explanation: "**Gist** = the overall message. Listen for gist first, then for specific **details**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: `${BUS}\n\nWhat is the main purpose of the announcement?`,
    options: [
      ["To tell passengers about a delay and a change of bay", "Correct: this is the gist; the time, bay and vouchers are details."],
      ["To advertise refreshments sold at the ticket office", "The vouchers are a detail offered because of the delay."],
      ["To cancel the coach service to Victoria Falls", "The service is delayed, not cancelled."],
      ["To explain how to repair a mechanical fault", "The fault is only the reason for the delay."],
    ],
    answer: "A",
    explanation: "The gist is the **delay and the new waiting place**. Everything else supports that message.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: `${BUS}\n\nAt what time will the coach now leave?`,
    options: [
      ["11.15", "Correct: the service will now depart at eleven fifteen."],
      ["10.00", "Ten o'clock was the original time."],
      ["11.00", "The speaker says eleven fifteen, not eleven."],
      ["10.15", "No time of ten fifteen is mentioned."],
    ],
    answer: "A",
    explanation: "Listen to the whole sentence: *the ten o'clock coach … will now depart at **eleven fifteen***. The first time you hear is the old one.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: `${BUS}\n\nWhere should passengers wait?`,
    options: [
      ["Bay 6", "Correct: Please wait in Bay 6."],
      ["Bay 4", "Bay 4 is the old bay printed on the tickets."],
      ["At the ticket office", "The ticket office is where vouchers are collected."],
      ["On board the coach", "The coach has a fault and is not yet boarding."],
    ],
    answer: "A",
    explanation: "*Please wait in Bay 6, **not** Bay 4 as shown on your ticket.* Words like *not* and *instead* signal a correction.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: `${FARMER}\n\nWhich word best describes Mr Sibanda's attitude to the irrigation scheme?`,
    options: [
      ["partly satisfied but critical", "Correct: better than nothing shows some approval; frankly … isn't enough shows criticism."],
      ["completely delighted", "He says twice a week isn't enough, so he is not delighted."],
      ["totally uninterested", "He gives detailed views, so he cares about it."],
      ["angry and threatening", "He is frustrated but makes no threats."],
    ],
    answer: "A",
    hints: ["Find one phrase that praises the scheme and one that criticises it."],
    explanation: "Attitude shows in word choice: *better than nothing* and *a start* (some approval); *frankly … isn't enough* and *nobody has told us* (criticism).",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: `${TALK}\n\nWhich phrase tells listeners that the speaker is about to give her **key message**?`,
    options: [
      ["the most important point I want you to remember", "Correct: this emphasis signpost introduces the key message."],
      ["First, I'll explain how the disease spreads", "First signals the order of the talk, not the key message."],
      ["Finally, I'll answer your questions", "Finally signals the last stage of the talk."],
      ["Next, I'll show you three simple ways", "Next signals sequence."],
    ],
    answer: "A",
    hints: ["Look for a signpost of emphasis rather than sequence."],
    explanation: "Emphasis signposts (*the most important point, above all, I must stress*) tell you what to write down.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A speaker says: *\"The new library is very popular. **However**, …\"* What should you expect next?",
    options: [
      ["a contrasting point, such as a problem", "Correct: however signals a contrast."],
      ["another example of its popularity", "That would follow also or for example."],
      ["the conclusion of the whole talk", "That would follow to sum up or in conclusion."],
      ["the first point in a list", "That would follow first or firstly."],
    ],
    answer: "A",
    explanation: "**However** signals a change of direction. Signpost words help you predict and organise your notes.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: `${PHONE}\n\nWhich note of the message is the **most accurate and useful** for Mr Dube?`,
    options: [
      ["Order: Thurs 9–11 a.m. (not Tues). If not OK, ring Mrs Ncube, ext. 204.", "Correct: the new day and time, the change, and the action with the extension."],
      ["Order: Tues 9–11 a.m. If not OK, ring Mrs Ncube, ext. 204.", "Tuesday was the old delivery day."],
      ["Order: Thurs. Mrs Ncube from Gweru phoned about first-aid.", "This leaves out the time and the call-back number."],
      ["Order: Thurs 9–11 a.m. Please ring Gweru Medical Supplies.", "It leaves out who to ask for and the extension."],
    ],
    answer: "A",
    hints: ["A message must include the key change and the action needed."],
    explanation: "A good message gives **what has changed**, **when**, and **what action** to take with the contact details.",
  });
  b.fib({
    d: 2,
    stem: `${PHONE}\n\nComplete the message pad.`,
    template: "Caller: Mrs Ncube. New delivery day: {{blank:a}}. Delivery time: between 9 and {{blank:b}} a.m. Call-back extension: {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["Thursday", "Thurs", "Thur"], wrong: "Tuesday" },
      { id: "b", accepted: ["11", "eleven"], wrong: "9" },
      { id: "c", accepted: ["204", "ext 204", "extension 204"], wrong: "240" },
    ],
    explanation: "Details: delivery **Thursday**, between 9 and **11** a.m.; call back on extension **204**.",
  });
  b.fib({
    d: 2,
    stem: "Choose the signpost word that fits each gap in this talk.",
    template: "{{blank:a}}, I will describe the problem. {{blank:b}}, I will suggest a solution. {{blank:c}}, we need everyone's help.",
    blanks: [
      { id: "a", accepted: ["First"], choices: ["First", "However", "To sum up"] },
      { id: "b", accepted: ["Then"], choices: ["Then", "Although", "First"] },
      { id: "c", accepted: ["To sum up"], choices: ["To sum up", "First", "Although"] },
    ],
    explanation: "Sequence signposts (*First, Then*) order the points; concluding signposts (*To sum up*) mark the end.",
  });
  b.short({
    d: 2,
    stem: `${BUS}\n\nWhat is the reason for the delay? Answer in **two words**.`,
    accepted: ["mechanical fault", "a mechanical fault"],
    wrong: ["heavy rain", "bay 6"],
    explanation: "*…because of a **mechanical fault***. *Because of* is a cause signpost: the reason follows it.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "When taking notes from a talk, you should try to write down every word the speaker says.",
    answer: false,
    explanation: "False. Write **key words**, numbers and names, using abbreviations and headings; fill in details afterwards.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: `${FARMER}\n\nTrue or false: Mr Sibanda knows when the second pump will arrive.`,
    answer: false,
    explanation: "False. He says *nobody has told us when the second pump is coming*.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each signpost word or phrase with its purpose.",
    pairs: [["in addition", "adding a point"], ["on the other hand", "showing contrast"], ["as a result", "showing cause and effect"], ["above all", "emphasising"], ["in conclusion", "concluding"]],
    explanation: "Signposts help you follow a talk and organise your notes under the right headings.",
  });
  b.struct({
    d: 3, skill: "UNDERSTANDING", examStyle: true, secs: 420,
    stem: TALK,
    parts: [
      P.short({
        label: "(a)",
        stem: "What is the topic of the talk? Answer in no more than **six words**.",
        accepted: ["preventing malaria", "preventing malaria during the rainy season", "malaria prevention", "how to prevent malaria", "malaria"],
        model: "preventing malaria during the rainy season",
        wrong: ["mosquito nets"],
        explanation: "*Today I want to talk about **preventing malaria** during the rainy season.*",
      }),
      P.short({
        label: "(b)",
        stem: "How many ways of protecting a family will the nurse show? Give a number.",
        accepted: ["3", "three"],
        wrong: ["2"],
        explanation: "*I'll show you **three** simple ways to protect your family.*",
      }),
      P.mcq({
        label: "(c)",
        stem: "What will the nurse do **before** she shows ways to protect a family?",
        options: [
          ["Explain how the disease spreads", "Correct: First, I'll explain how the disease spreads. Next…"],
          ["Answer the audience's questions", "Questions come Finally, at the end."],
          ["Hand out treated nets to families", "Handing out nets is not mentioned."],
          ["Describe the symptoms of malaria", "Symptoms are not mentioned."],
        ],
        answer: "A",
        explanation: "The sequence signposts *First … Next … Finally* show the order of the talk.",
      }),
      P.manual({
        label: "(d)",
        marks: 2,
        stem: "What is the nurse's most important advice, and which words show that it is important?",
        points: [
          "Advice: sleep under a treated net every night (not only when mosquitoes are seen).",
          "Signal: the phrase the most important point I want you to remember (or However, the most important point).",
        ],
        modelAnswer: "Sleep under a treated net every night, not only when you see mosquitoes. She signals it with 'the most important point I want you to remember'.",
        explanation: "Emphasis signposts mark the key message: note it in full.",
      }),
    ],
    hints: ["Use the signpost words to find the structure of the talk."],
    explanation: "Listen (or read) for the topic (gist), the details (*three ways*), the order (*First, Next, Finally*) and the emphasised message.",
  });
  b.manualShort({
    d: 3, skill: "CREATION", marks: 5,
    stem: `${PHONE}\n\nYou took this call for Mr Dube. Write the message you would leave on his desk.`,
    points: [
      "States who the message is for (Mr Dube) and who called (Mrs Ncube, Gweru Medical Supplies).",
      "States what the message is about (his order of first-aid kits).",
      "Gives the new delivery day: Thursday (not Tuesday).",
      "Gives the time: between 9 and 11 a.m.",
      "Gives the action: call back on extension 204 if not convenient.",
    ],
    modelAnswer: "To: Mr Dube. From: Mrs Ncube, Gweru Medical Supplies. Your order of first-aid kits will now be delivered on Thursday, 9–11 a.m., not Tuesday. If this is not convenient, please call her back on ext. 204.",
    hints: ["Who, for whom, what, when, and what action?"],
    explanation: "A complete message answers: who called, for whom, about what, the key details, and what action is needed.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3, examStyle: true,
    stem: `${FARMER}\n\nDescribe Mr Sibanda's attitude to the irrigation scheme and support your answer with **two** pieces of evidence from the transcript.`,
    points: [
      "Describes a mixed attitude: partly satisfied but frustrated or critical.",
      "Evidence of approval: better than nothing / which is a start.",
      "Evidence of criticism: frankly, twice a week isn't enough / nobody has told us when the second pump is coming.",
    ],
    modelAnswer: "He is partly satisfied but critical. He admits it is 'better than nothing' and 'a start', but says 'frankly, twice a week isn't enough' and complains that nobody has told them when the second pump will come.",
    hints: ["Find a phrase of approval and a phrase of criticism."],
    explanation: "Attitude questions need a precise description supported by the speaker's own words.",
  });

  b.card("DEFINITION", "Gist", "The main point or overall meaning of what is said.", "Listen for gist first, then for detail.");
  b.card("DEFINITION", "Detail", "A specific fact: a time, place, name, number, price or instruction.", undefined);
  b.card("DEFINITION", "Signpost words", "Words that show the structure of a talk: first, next, however, as a result, above all, to sum up.", undefined);
  b.card("CONCEPT", "Predicting before you listen", "Use the situation and the questions to guess what you will hear (times, places, reasons) so you know what to listen for.", undefined);
  b.card("CONCEPT", "Note-taking", "Key words only, abbreviations (mtg, govt, approx.), headings and numbered points; fill in afterwards.", undefined);
  b.card("CONCEPT", "A complete message", "Who called, for whom, when, the message, the action needed and how to reply.", undefined);
  b.card("FACT", "Corrections in announcements", "Speakers often give an old and a new time or place. Listen for not, instead, now, changed to.", undefined);
  b.card("CONCEPT", "Recognising attitude", "Look for evaluative words: frankly, unfortunately, at last, I'm delighted, I'm not convinced.", undefined);
  b.card("VOCABULARY", "Emphasis signposts", "the most important point, above all, I must stress, the key thing is.", undefined);
});
