// W3b: National events and celebrations (her.heritage.national-events).
// Reviewer note: National Tree Planting Day given as the first Saturday of December (widely stated); the Forestry
// Commission's "tree of the year" mentioned in the lesson only.
import { concept, P, source, table, levels } from "../lib.mjs";

concept("her.heritage.national-events", { file: "heritage/national-events", keyPrefix: "heritage.national-events" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On what date is Unity Day commemorated in Zimbabwe?",
    options: [
      ["22 December", "Correct: the Unity Accord was signed on 22 December 1987."],
      ["18 April", "18 April is Independence Day."],
      ["25 May", "25 May is Africa Day."],
      ["12 September", "12 September 1890 is when the Pioneer Column reached Fort Salisbury; it is not Unity Day."],
    ],
    answer: "A",
    explanation: "Unity Day, 22 December, marks the Unity Accord of 1987.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Africa Day on 25 May commemorates the founding of which organisation?",
    options: [
      ["the Organisation of African Unity", "Correct: the OAU was founded on 25 May 1963."],
      ["the Southern African Development Community", "SADC was formed in 1992."],
      ["the United Nations", "The UN was founded on 24 October 1945."],
      ["the Common Market for Eastern and Southern Africa", "COMESA's treaty dates from 1993."],
    ],
    answer: "A",
    explanation: "The OAU was founded in Addis Ababa on 25 May 1963; the African Union replaced it in 2002.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "When is Heroes Day observed?",
    options: [
      ["on the second Monday of August", "Correct: the date changes each year but is always the second Monday of August."],
      ["on 18 April every year", "18 April is Independence Day."],
      ["on the first Saturday of December", "This is National Tree Planting Day."],
      ["on 22 December every year", "This is Unity Day."],
    ],
    answer: "A",
    explanation: "Heroes Day is the second Monday of August, followed by Defence Forces Day on the Tuesday.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which two parties signed the Unity Accord commemorated on Unity Day?",
    options: [
      ["ZANU (PF) and PF-ZAPU", "Correct: the two main nationalist parties united in 1987."],
      ["ZANU and the Rhodesian Front", "The Rhodesian Front was the party of the settler government before 1980."],
      ["ZAPU and the British government", "The Accord was between Zimbabwean parties."],
      ["FRELIMO and ZANU (PF)", "FRELIMO is a Mozambican party."],
    ],
    answer: "A",
    explanation: "The Unity Accord of 22 December 1987 united ZANU (PF) and PF-ZAPU and ended the conflict of the 1980s.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Where is the main national ceremony held on Heroes Day?",
    options: [
      ["the National Heroes Acre in Harare", "Correct: the main ceremony is at the National Heroes Acre."],
      ["the Great Zimbabwe monument near Masvingo", "Great Zimbabwe is a pre-colonial monument."],
      ["the Victoria Falls rainforest", "This is a natural World Heritage Site."],
      ["Chimoio in Mozambique", "Chimoio is commemorated on 23 November."],
    ],
    answer: "A",
    explanation: "The main Heroes Day ceremony takes place at the National Heroes Acre; provinces and districts hold their own.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "On a December Saturday, pupils at a school in Marondera each plant an indigenous tree and agree a watering rota. Which national event are they observing?",
    options: [
      ["National Tree Planting Day", "Correct: it falls on the first Saturday of December."],
      ["Unity Day", "Unity Day (22 December) is about national unity, not trees."],
      ["Independence Day celebrations", "Independence Day is on 18 April and is not about trees."],
      ["Africa Day", "Africa Day is on 25 May."],
    ],
    answer: "A",
    hints: ["Which event is about the environment?"],
    explanation: "National Tree Planting Day, the first Saturday of December, encourages planting and caring for trees.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statement **best** explains why Defence Forces Day follows Heroes Day?",
    options: [
      ["It links honouring those who won independence with the forces that now defend it", "Correct: the two days connect past sacrifice and present defence."],
      ["The defence forces were founded before the liberation struggle began", "The Zimbabwe Defence Forces were formed after independence."],
      ["There was not enough space in the national calendar to hold it in any other month of the year", "The timing is deliberate, not about space."],
      ["Soldiers are not allowed to attend Heroes Day ceremonies", "Soldiers take part in Heroes Day ceremonies."],
    ],
    answer: "A",
    hints: ["Think of what was won and who protects it."],
    explanation: "Heroes Day honours those who sacrificed for independence; Defence Forces Day recognises the forces that defend it.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A community is planning Unity Day. Some older residents lost relatives in the conflict of the 1980s. Which approach **best** serves the purpose of the day?",
    options: [
      ["Celebrate unity while respectfully acknowledging the suffering that came before the Accord", "Correct: honest remembrance supports reconciliation."],
      ["Forbid any mention of the 1980s so that the celebration stays cheerful", "Silence can deepen hurt and does not promote reconciliation."],
      ["Hold separate events for each language group so that people from different areas never have to meet", "Separate events work against the aim of unity."],
      ["Cancel the event because past conflict makes unity impossible", "The Accord shows that unity can follow conflict."],
    ],
    answer: "A",
    hints: ["What does reconciliation need?"],
    explanation: "Unity Day is about peace and national unity; acknowledging past suffering honestly supports healing.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Independence Day is celebrated on 18 April.",
    answer: true,
    explanation: "True. Zimbabwe became independent on 18 April 1980.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Heroes Day falls on the same date every year.",
    answer: false,
    explanation: "False. Heroes Day is the second Monday of August, so its date changes from year to year.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each national event with what it commemorates.",
    pairs: [
      ["Independence Day", "the end of colonial rule in 1980"],
      ["Heroes Day", "those who sacrificed in the liberation struggle"],
      ["Unity Day", "the 1987 Accord between two nationalist parties"],
      ["Africa Day", "the founding of the OAU in 1963"],
    ],
    extraRight: ["the signing of the 2013 Constitution"],
    explanation: "Independence Day: 1980; Heroes Day: the heroes of the struggle; Unity Day: the Accord of 1987; Africa Day: the OAU of 1963.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "Defence Forces Day is held on the {{blank:a}} after Heroes Day. National Tree Planting Day is held on the first Saturday of {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Tuesday"], choices: ["Tuesday", "Monday", "Friday", "Sunday"] },
      { id: "b", accepted: ["December"], choices: ["December", "August", "April", "May"] },
    ],
    explanation: "Defence Forces Day is the Tuesday after Heroes Day; Tree Planting Day is the first Saturday of December.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "State **four** ways in which Independence Day is celebrated.",
    points: [
      "Any one of: national celebrations at a stadium; raising the flag; speeches; music and dance; parades; sports competitions; church services and prayers; community and school celebrations",
      "A second different way",
      "A third different way",
      "A fourth different way",
    ],
    modelAnswer: "There are national celebrations at a stadium with the raising of the flag and speeches; musicians and dancers perform; there are sports competitions; and churches hold services of thanksgiving.",
    explanation: "One mark per correct way.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why citizens should take part in national events.",
    points: [
      "Identifies unity",
      "Develops: people of all backgrounds celebrate together, strengthening their sense of one nation",
      "Identifies remembrance / patriotism / education",
      "Develops: e.g. honouring heroes keeps their sacrifice alive for young people, or celebrating independence builds pride in the country",
    ],
    modelAnswer: "Taking part brings together people of every language, region and faith, so they feel part of one nation. It also keeps alive the memory of those who sacrificed for independence, so young people learn the history and grow up proud of their country.",
    hints: ["Think of what an event does for the people who attend."],
    explanation: "One mark for each reason and one for its development.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Few young people in a fictional ward in Gwanda attended last year's Heroes Day ceremony. Suggest **two** ways the ward could involve more young people, and explain each.",
    points: [
      "Suggests involving schools and youth groups (poems, drama, history quizzes, music) in the programme",
      "Explains that young people come when they have an active part and learn the history in an engaging way",
      "Suggests inviting veterans or elders to share their stories, or using social media and radio to announce the event",
      "Explains that personal stories make the history real / good publicity reaches young people where they are",
    ],
    modelAnswer: "The ward could invite schools and youth groups to perform poems, drama and music about the struggle, because young people attend when they have an active part. It could also invite veterans and elders to share their stories, and announce the event on community radio and social media, so that young people hear about it and find the history real and interesting.",
    hints: ["Think of what would make a young person want to come."],
    explanation: "One mark for each sensible suggestion and one for explaining it.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: "The table shows the results of a survey of 100 Form 3 pupils at a school in Kariba, asking which national event they took part in during the year (invented for this question; pupils could choose more than one event).\n\n" +
      table(["National event", "Pupils who took part"], [
        ["Independence Day", "72"],
        ["Heroes Day", "40"],
        ["National Tree Planting Day", "55"],
        ["Unity Day", "12"],
        ["Africa Day", "18"],
      ]) + "\n\nStudy the table and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "Which event had the **lowest** participation?",
        options: [
          ["Unity Day", "Correct: only 12 pupils took part."],
          ["Africa Day", "18 pupils took part in Africa Day."],
          ["Heroes Day", "40 pupils took part in Heroes Day."],
          ["Independence Day", "This had the highest participation."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Suggest **two** reasons why participation in Unity Day was low.",
        points: [
          "It falls on 22 December, during the school holidays, when pupils are away from school",
          "Pupils may know little about the Unity Accord / fewer events are organised for it",
        ],
        modelAnswer: "Unity Day falls on 22 December, in the school holidays, so the school cannot organise an event. Many pupils also know little about the Unity Accord, and fewer public events are held for it.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Suggest how the school could increase awareness of Unity Day, and explain why this matters.",
        points: [
          "Hold a Unity Day lesson or assembly before the schools close in December",
          "Organise activities that bring together pupils of different backgrounds (cultural day, debates)",
          "Explains that knowing about the Accord teaches peace and tolerance and strengthens national unity",
        ],
        modelAnswer: "The school could hold a Unity Day assembly and lesson before closing in December, and organise a cultural day where pupils of different backgrounds share songs and food. This matters because learning about the Accord teaches peace and tolerance and helps pupils see themselves as one nation.",
      }),
    ],
    hints: ["Check the date of Unity Day against the school calendar."],
    explanation: "A data-response practice item on participation in national events.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "This question is about national events in Zimbabwe.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe how Heroes Day is commemorated.",
        points: [
          "Main ceremony at the National Heroes Acre in Harare",
          "Ceremonies at provincial and district heroes acres",
          "Laying of wreaths and speeches honouring the heroes",
          "Music, prayers or a minute of silence; it is a public holiday followed by Defence Forces Day",
        ],
        modelAnswer: "The main ceremony is held at the National Heroes Acre in Harare, and provinces and districts hold ceremonies at their own heroes acres. Wreaths are laid on the graves and speeches honour those who sacrificed in the liberation struggle. There are prayers, music and moments of silence, and the day is a public holiday followed by Defence Forces Day.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"National events are an effective way of building national unity.\" How far do you agree?",
        points: [
          ["For: people of all backgrounds gather and celebrate together; shared memory and pride", 2],
          ["For: education of the young; Unity Day directly promotes reconciliation", 2],
          ["Against: some people do not attend or feel left out; events can be seen as costly or one-sided; one day cannot remove deep divisions or economic hardship", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "National events can build unity. On Independence Day people of every language, region and faith celebrate together, and Heroes Day gives the nation a shared memory of sacrifice. School activities teach young people the history behind the events, and Unity Day directly promotes peace and reconciliation.\n\nHowever, events alone have limits. Many people do not attend, especially in remote areas or when they are struggling to earn a living. Some feel that certain events do not tell the whole story or do not include them, and some question the cost. A single day cannot heal deep divisions or end poverty and inequality.\n\nI partly agree. National events are a useful way of building unity because they give citizens shared memories and pride, but they work best when they are inclusive and honest about the past, and when unity is also built through fairness in everyday life.",
      }),
    ],
    hints: ["In (b), weigh what events achieve against what they cannot do alone."],
    explanation: "A practice evaluative item on national events and national unity.",
  });

  b.card("FACT", "On what date is Unity Day commemorated?", "22 December (the Unity Accord of 1987).");
  b.card("FACT", "When is Independence Day?", "18 April (independence in 1980).");
  b.card("FACT", "When are Heroes Day and Defence Forces Day?", "Heroes Day: the second Monday of August. Defence Forces Day: the following Tuesday.");
  b.card("FACT", "What does Africa Day (25 May) commemorate?", "The founding of the Organisation of African Unity on 25 May 1963.");
  b.card("FACT", "When is National Tree Planting Day?", "The first Saturday of December.");
  b.card("DEFINITION", "Commemorate", "To honour and remember a person or event publicly, for example by holding a ceremony on its anniversary.");
  b.card("CONCEPT", "Why does Unity Day matter?", "It marks the 1987 Accord that united ZANU (PF) and PF-ZAPU and ended the conflict of the 1980s, promoting peace and reconciliation.");
  b.card("CONCEPT", "Give three reasons for taking part in national events.", "They build unity, keep the memory of heroes and history alive, and build patriotism and pride (also education).");
  b.card("FACT", "Where is the main Heroes Day ceremony held?", "At the National Heroes Acre in Harare.");
});
