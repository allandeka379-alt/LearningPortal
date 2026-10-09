// W3b: The constitution-making process (her.constitution.making).
// Reviewer note: dates from the BRIEF reference list (GPA 2008; COPAC from 2009; referendum 16 March 2013; signed
// 22 May 2013; rejected draft February 2000). Stakeholders' conferences mentioned without dates.
import { concept, P, source, timeline, levels } from "../lib.mjs";

concept("her.constitution.making", { file: "constitution/making", keyPrefix: "constitution.making" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On what date was the referendum on Zimbabwe's new Constitution held?",
    options: [
      ["16 March 2013", "Correct: voters approved the draft on 16 March 2013."],
      ["22 May 2013", "This is when the Constitution was signed into law."],
      ["18 April 1980", "This is Independence Day."],
      ["21 December 1979", "This is when the Lancaster House Agreement was signed."],
    ],
    answer: "A",
    explanation: "The referendum was on 16 March 2013; the Constitution was signed into law on 22 May 2013.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What was COPAC?",
    options: [
      ["a parliamentary select committee that led the process", "Correct: COPAC was a select committee of Parliament."],
      ["a political party formed in 2009 to contest the elections", "COPAC was not a party; its members came from the parties in Parliament."],
      ["the court that decides constitutional cases", "That is the Constitutional Court."],
      ["the commission that runs elections", "That is the Zimbabwe Electoral Commission."],
    ],
    answer: "A",
    explanation: "COPAC was the parliamentary select committee, set up in 2009, that led the constitution-making process.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is a **referendum**?",
    options: [
      ["a vote by all registered voters to accept or reject one proposal", "Correct: voters decide on a single question."],
      ["an election in which voters choose members of Parliament and councillors", "That is a general or harmonised election."],
      ["a meeting of chiefs to settle a dispute", "That is a traditional court or meeting."],
      ["a court case about human rights", "That is litigation, not a referendum."],
    ],
    answer: "A",
    explanation: "In a referendum all registered voters vote on one proposal, such as a draft constitution.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of the following describes a constitution as the **supreme** law?",
    options: [
      ["Any law or conduct inconsistent with it is invalid", "Correct: the Constitution overrides other laws."],
      ["It can be changed by any minister at any time", "Changes need a special procedure in Parliament and sometimes a referendum."],
      ["It applies only to the President", "It binds everyone, including the state and citizens."],
      ["It is used only when there are no other laws", "It always applies and is above other laws."],
    ],
    answer: "A",
    explanation: "Supremacy means the Constitution is above all other laws; anything inconsistent with it is invalid.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which reason for replacing the Lancaster House constitution relates to **where and how** it was made?",
    options: [
      ["It was negotiated in London rather than written by Zimbabweans in Zimbabwe", "Correct: it was not home-grown."],
      ["It had no provisions for elections at all", "It did provide for elections."],
      ["It was written only in Shona", "It was written in English."],
      ["It was made after the 2013 referendum, by the new Parliament in Harare", "It was made in 1979."],
    ],
    answer: "A",
    hints: ["Where did the conference take place?"],
    explanation: "The Lancaster House constitution was negotiated in London in 1979 under British supervision, so many felt it was not home-grown.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "At an outreach meeting in Marondera, Tatenda says he wants a two-term limit for the President. Which role of citizens is he performing?",
    options: [
      ["giving his views for the drafting of the constitution", "Correct: outreach meetings collected citizens' views."],
      ["voting in the referendum", "The referendum came later, on a finished draft."],
      ["deciding the case in the Constitutional Court", "Courts decide cases; outreach collected views."],
      ["writing the final legal text of the Constitution himself", "Professional drafters wrote the text."],
    ],
    answer: "A",
    hints: ["What were outreach meetings for?"],
    explanation: "Outreach meetings recorded citizens' views, which the drafters used.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which piece of evidence **best** supports the claim that the 2013 Constitution was more people-driven than the Lancaster House constitution?",
    options: [
      ["Citizens gave views at outreach meetings and approved the draft in a referendum", "Correct: both are forms of direct participation."],
      ["The 2013 Constitution has more chapters and sections than the earlier constitutions had", "Length says nothing about participation."],
      ["The 2013 Constitution was written in a different city", "Location alone does not show participation."],
      ["Lawyers were employed to draft the final text", "Lawyers drafted both; this does not show participation."],
    ],
    answer: "A",
    hints: ["What could ordinary citizens do in 2009-2013 that they could not do in 1979?"],
    explanation: "Outreach and a referendum gave citizens a direct say, which did not happen at Lancaster House.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which agreement between the main political parties in 2008 included the commitment to make a new constitution?",
    options: [
      ["the Global Political Agreement", "Correct: the GPA of 2008 provided for a new constitution."],
      ["the Unity Accord of December 1987", "The Unity Accord was signed in 1987, not 2008."],
      ["the Lancaster House Agreement", "This was signed in 1979."],
      ["the Rudd Concession", "This was a colonial concession of 1888."],
    ],
    answer: "A",
    explanation: "The Global Political Agreement (2008) led to the inclusive government and the constitution-making process.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A draft constitution was rejected by voters in a referendum in February 2000.",
    answer: true,
    explanation: "True. The 2000 draft was rejected; the new Constitution was approved in 2013.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In a referendum, voters choose candidates for Parliament.",
    answer: false,
    explanation: "False. In a referendum voters accept or reject a single proposal; candidates are chosen in elections.",
  });
  b.fib({
    d: 3, skill: "RECALL",
    stem: "Complete the timeline of the making of the Constitution.",
    template: "Global Political Agreement: {{blank:a}}. COPAC set up: {{blank:b}}. Referendum: {{blank:c}}. Signed into law: {{blank:d}}.",
    blanks: [
      { id: "a", accepted: ["2008"], choices: ["2008", "2000", "2009", "2013"] },
      { id: "b", accepted: ["2009"], choices: ["2009", "2008", "2000", "2013"] },
      { id: "c", accepted: ["16 March 2013"], choices: ["16 March 2013", "22 May 2013", "February 2000", "18 April 1980"] },
      { id: "d", accepted: ["22 May 2013"], choices: ["22 May 2013", "16 March 2013", "February 2000", "18 April 1980"] },
    ],
    hints: ["The process ran from 2008 to 2013."],
    explanation: timeline([["2008", "Global Political Agreement"], ["2009", "COPAC set up"], ["16 March 2013", "Referendum"], ["22 May 2013", "Signed into law"]]).md,
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term with its meaning.",
    pairs: [
      ["constitution", "the supreme law of a country"],
      ["referendum", "a vote to accept or reject one proposal"],
      ["outreach", "meetings to collect citizens' views"],
      ["select committee", "a group of MPs given a particular task"],
    ],
    explanation: "These terms describe the institutions and stages of constitution-making.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State **three** reasons why a country needs a constitution.",
    points: [
      "Any one of: sets up institutions of government; limits the power of leaders; protects rights and freedoms; is the supreme law; expresses national values and identity; provides stability and peaceful settlement of disputes",
      "A second different reason",
      "A third different reason",
    ],
    modelAnswer: "It sets up the institutions of government, limits the power of leaders and protects the rights of citizens.",
    explanation: "One mark per correct reason.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why Zimbabwe needed a new constitution.",
    points: [
      "Identifies: the Lancaster House constitution was negotiated abroad / not home-grown",
      "Develops: it was agreed in London under British supervision as part of a peace settlement, so many felt it did not reflect the people's wishes",
      "Identifies: it had been amended many times / people wanted stronger rights, limits on power, devolution",
      "Develops: frequent amendments made it hard to follow, and a new constitution could protect rights and spread power better",
    ],
    modelAnswer: "The Lancaster House constitution was negotiated in London under British supervision as part of a peace settlement, so many Zimbabweans felt it was not their own. It had also been amended many times, and people wanted a constitution with stronger protection of rights, limits on executive power and devolution.",
    hints: ["Think of where it was made and what people wanted to change."],
    explanation: "One mark for each reason and one for its development.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Suggest **two** ways a future constitution-making process could involve more young people, and explain each.",
    points: [
      "Suggests holding outreach meetings in schools, colleges and youth centres, or online and on radio",
      "Explains that young people can take part where they already are, so more views are collected",
      "Suggests civic education campaigns and voter registration drives for young people",
      "Explains that young people who understand the issues and are registered can vote in the referendum",
    ],
    modelAnswer: "Outreach meetings could be held in schools, colleges and youth centres, and views collected through radio and online platforms, so that young people can take part where they already are. There could also be civic education and voter registration drives for young people, so that they understand the draft and are able to vote in the referendum.",
    hints: ["Where are young people, and what do they need in order to vote?"],
    explanation: "One mark for each suggestion and one for its explanation.",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: source("Source A", "a report in a fictional community newsletter, Masvingo Province, 2012",
      "About two hundred villagers attended the outreach meeting at the business centre on Saturday. Women spoke about inheritance and property, young people about jobs and education, and elders about the role of chiefs. The team recorded every view. Some residents complained that the meeting was too short and that not everyone had a chance to speak.") +
      "\n\nRead Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "At which stage of the constitution-making process was this meeting held?",
        options: [
          ["outreach", "Correct: teams collected citizens' views at outreach meetings."],
          ["the referendum", "The referendum was a vote in 2013, not a discussion meeting."],
          ["the signing into law", "That happened in May 2013."],
          ["the Lancaster House conference", "That took place in London in 1979."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** issues raised by different groups at the meeting.",
        points: ["Women: inheritance and property", "Young people: jobs and education / elders: the role of chiefs"],
        modelAnswer: "Women spoke about inheritance and property, and young people about jobs and education.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Using the source, explain **one** strength and **one** weakness of the outreach process.",
        points: [
          "Strength: many people and different groups gave views that were recorded",
          "Develops: so the constitution could reflect the wishes of ordinary citizens",
          "Weakness: the meeting was too short and not everyone could speak",
        ],
        modelAnswer: "A strength is that about two hundred villagers, including women, youth and elders, gave views that were recorded, so the constitution could reflect what ordinary people wanted. A weakness is that the meeting was too short and some people could not speak.",
      }),
    ],
    hints: ["In (c), use details from the source for each side."],
    explanation: "A source-based practice item on the outreach stage of constitution-making.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "This question is about the making of the 2013 Constitution.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe the role of citizens in the making of the 2013 Constitution.",
        points: [
          "Attended outreach meetings and gave their views",
          "Sent written submissions through organisations such as churches, unions and women's groups",
          "Took part in civic education and discussion of the draft",
          "Voted in the referendum of 16 March 2013",
        ],
        modelAnswer: "Citizens attended outreach meetings in their wards and gave their views. Churches, unions, women's groups and other organisations sent submissions. Citizens took part in civic education and discussed the draft. Finally, registered voters accepted the draft in the referendum of 16 March 2013.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"The 2013 Constitution was truly people-driven.\" How far do you agree?",
        points: [
          ["For: outreach across the country; submissions by organisations; stakeholders' conferences", 2],
          ["For: approved in a referendum by a large majority; contrasts with Lancaster House", 2],
          ["Against: some meetings short or poorly attended; parties negotiated disputed areas; not all views could be included", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "There is strong evidence that the process was people-driven. Outreach teams held meetings across the country to record citizens' views, organisations made submissions, and stakeholders' conferences brought together churches, unions, women, youth and traditional leaders. Voters approved the draft by a large majority in the referendum of 16 March 2013. This is very different from 1979, when the constitution was negotiated in London.\n\nOn the other hand, some people complained that meetings were short or poorly attended, so not everyone was heard. The political parties negotiated the disputed sections, and not every view could be included in the final text.\n\nI largely agree. The process was not perfect, but citizens took part far more than in 1979, and the final decision was made by voters in a referendum.",
      }),
    ],
    hints: ["In (b), compare with 1979 and consider the criticisms."],
    explanation: "A practice evaluative item on how people-driven the constitution-making process was.",
  });

  b.card("DEFINITION", "Constitution", "The supreme law of a country: it sets up the institutions of government, limits their powers and protects people's rights.");
  b.card("DEFINITION", "Referendum", "A vote in which all registered voters accept or reject a single proposal.");
  b.card("FACT", "What was COPAC?", "The parliamentary select committee, set up in 2009, that led the making of the 2013 Constitution.");
  b.card("FACT", "When was the referendum on the new Constitution?", "16 March 2013.");
  b.card("FACT", "When was the 2013 Constitution signed into law?", "22 May 2013.");
  b.card("FACT", "Which agreement of 2008 provided for a new constitution?", "The Global Political Agreement (GPA).");
  b.card("CONCEPT", "Give two reasons why Zimbabwe needed a new constitution.", "The Lancaster House constitution was negotiated abroad and not home-grown; it had been amended many times (people also wanted stronger rights and devolution).");
  b.card("CONCEPT", "Name four roles of citizens in constitution-making.", "Giving views at outreach meetings; making submissions; civic education; voting in the referendum (also monitoring).");
  b.card("FACT", "When was an earlier draft constitution rejected in a referendum?", "February 2000.");
});
