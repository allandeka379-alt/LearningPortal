// W4a: From the Lancaster House constitution to a home-grown constitution (her.constitution.lancaster-to-2013).
// Reviewer note: dates from the BRIEF reference list (conference Sep-Dec 1979; signed 21 December 1979; 20 of 100
// seats for seven years; willing-buyer willing-seller for ten years; executive presidency 1987; draft rejected
// February 2000; referendum 16 March 2013). Lesson also states: reserved seats abolished 1987, Senate abolished 1990
// and restored 2005, a Constitutional Commission (1999) drafted the 2000 text — please confirm. No vote percentages.
import { concept, P, source, levels } from "../lib.mjs";

concept("her.constitution.lancaster-to-2013", { file: "constitution/lancaster-to-2013", keyPrefix: "constitution.lancaster-to-2013" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On what date was the Lancaster House Agreement signed?",
    options: [
      ["21 December 1979", "Correct: the agreement was signed at the end of the conference."],
      ["18 April 1980", "This is Independence Day."],
      ["11 November 1965", "This is the date of UDI."],
      ["22 December 1987", "This is the date of the Unity Accord."],
    ],
    answer: "A",
    explanation: "The Lancaster House conference ran from September to December 1979, and the agreement was signed on 21 December 1979.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "How many of the 100 House of Assembly seats did the Lancaster House constitution reserve for whites?",
    options: [
      ["20", "Correct: 20 seats for seven years."],
      ["10", "The number reserved was larger than this."],
      ["30", "The number reserved was smaller than this."],
      ["50", "This would have been half of the House."],
    ],
    answer: "A",
    explanation: "Twenty of the 100 seats were reserved for white voters for seven years.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What did the **willing-buyer willing-seller** clause mean for land?",
    options: [
      ["Government could buy land only from owners who agreed to sell", "Correct: owners could not be forced to sell during the protected period."],
      ["Any person could take unused land without paying for it", "The clause protected owners and required payment."],
      ["Land could be sold only to foreign buyers", "The clause did not restrict buyers in this way."],
      ["All land became state land at independence", "Private ownership was protected."],
    ],
    answer: "A",
    explanation: "For ten years, land could be acquired only when the owner was willing to sell, with compensation, which slowed redistribution.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "In which year did an **executive presidency** replace the offices of ceremonial President and Prime Minister?",
    options: [
      ["1987", "Correct: the executive presidency dates from 1987."],
      ["1980", "In 1980 there was a ceremonial President and a Prime Minister."],
      ["2000", "This was the year of the rejected draft constitution."],
      ["2013", "This is when the new Constitution was adopted."],
    ],
    answer: "A",
    explanation: "A constitutional amendment created the executive presidency from 1987.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which reason for replacing the Lancaster House constitution is about **how often it was changed**?",
    options: [
      ["It had been amended many times and became a patchwork", "Correct: frequent amendments weakened confidence in it."],
      ["It was negotiated in London under British chairmanship", "This is about where and by whom it was made."],
      ["Its property clauses slowed land redistribution", "This is about land."],
      ["Citizens wanted their own languages and values reflected", "This is about national identity."],
    ],
    answer: "A",
    hints: ["Look for the reason about amendments."],
    explanation: "Many amendments made the constitution hard to follow and suggested it was changed to suit those in power.",
  });
  b.mcq({
    d: 3, skill: "RECALL",
    stem: "What happened in the referendum of **February 2000**?",
    options: [
      ["Voters rejected a draft constitution", "Correct: the draft was rejected."],
      ["Voters approved the Lancaster House constitution", "That constitution was never put to a referendum."],
      ["Voters approved the constitution now in force", "That was the referendum of 16 March 2013."],
      ["Voters elected a new President", "A referendum decides a proposal, not a candidate."],
    ],
    answer: "A",
    hints: ["Two referendums: one draft rejected, one approved."],
    explanation: "The draft of 2000 was rejected; the 2013 draft was approved on 16 March 2013.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why did the Lancaster House constitution include reserved seats and protected property?",
    options: [
      ["to reassure the white minority and make a ceasefire possible", "Correct: these were compromises to end the war."],
      ["because the liberation movements had asked for them at the conference", "They were concessions made by the liberation movements, not their demands."],
      ["to make land reform faster after 1980", "The property clauses slowed land reform."],
      ["because Zimbabweans voted for them in a referendum", "There was no referendum on the 1979 constitution."],
    ],
    answer: "A",
    hints: ["Who needed to be reassured for the war to end?"],
    explanation: "The constitution was a compromise: reserved seats and property protection reassured the white minority so that a settlement could be reached.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which point **best** supports the view that a home-grown constitution has greater legitimacy?",
    options: [
      ["Citizens take part in making it and approve it in a referendum", "Correct: participation and approval give authority."],
      ["It is longer and has more chapters than the old constitution", "Length does not create legitimacy."],
      ["It is written by experienced foreign lawyers", "That would make it less home-grown."],
      ["It can be changed easily by any government", "Easy change weakens rather than strengthens legitimacy."],
    ],
    answer: "A",
    hints: ["Legitimacy comes from the consent of the people."],
    explanation: "A constitution that citizens helped to make and approved in a referendum is widely accepted as their own.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Lancaster House conference was held in London.",
    answer: true,
    explanation: "True. It took place at Lancaster House in London from September to December 1979.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The Lancaster House constitution contained no Declaration of Rights.",
    answer: false,
    explanation: "False. It included a Declaration of Rights protecting civil and political rights.",
  });
  b.match({
    d: 3, skill: "RECALL",
    stem: "Match each date with the event.",
    pairs: [
      ["21 December 1979", "Lancaster House Agreement signed"],
      ["1987", "executive presidency introduced"],
      ["February 2000", "draft constitution rejected in a referendum"],
      ["16 March 2013", "new draft constitution approved in a referendum"],
    ],
    hints: ["The two referendums had opposite results."],
    explanation: "These dates trace the path from Lancaster House to the 2013 Constitution.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements about the Lancaster House constitution.",
    template: "White voters had reserved seats for {{blank:a}} years. Land could be acquired only on a willing-buyer willing-seller basis for {{blank:b}} years.",
    blanks: [
      { id: "a", accepted: ["seven"], choices: ["seven", "ten", "five", "twenty"] },
      { id: "b", accepted: ["ten"], choices: ["ten", "seven", "five", "twenty"] },
    ],
    explanation: "Reserved seats: seven years. Willing-buyer willing-seller: ten years.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Complete the comparison.",
    template: "The Lancaster House constitution was negotiated in {{blank:a}}, while the 2013 Constitution was approved by Zimbabwean voters in a {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["London"], choices: ["London", "Harare", "Bulawayo", "Lusaka"] },
      { id: "b", accepted: ["referendum"], choices: ["referendum", "by-election", "court case", "cabinet meeting"] },
    ],
    hints: ["Where was the 1979 conference? How did citizens approve the 2013 text?"],
    explanation: "The 1979 constitution was agreed in London; the 2013 Constitution was approved in a national referendum.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the building in London where the 1979 constitutional conference was held.",
    accepted: ["Lancaster House", "Lancaster"],
    wrong: ["Westminster"],
    explanation: "The conference was held at Lancaster House in London.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State **three** provisions of the Lancaster House constitution.",
    points: [
      "Any one of: 20 of 100 House of Assembly seats reserved for whites for seven years; willing-buyer willing-seller land acquisition for ten years / protection of property; a Declaration of Rights; a Senate and a House of Assembly; a ceremonial President and a Prime Minister; entrenched clauses",
      "A second different provision",
      "A third different provision",
    ],
    modelAnswer: "It reserved 20 of the 100 House of Assembly seats for whites for seven years, it allowed land to be acquired only on a willing-buyer willing-seller basis for ten years, and it contained a Declaration of Rights.",
    explanation: "One mark per correct provision.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why many Zimbabweans wanted to replace the Lancaster House constitution.",
    points: [
      "Identifies: it was negotiated abroad / was a ceasefire compromise",
      "Develops: made in London under British chairmanship to end a war, so it did not reflect the long-term wishes of Zimbabweans",
      "Identifies: it was amended many times / land clauses / demands for stronger rights and wider participation",
      "Develops: frequent amendments by governments of the day weakened confidence; citizens wanted a constitution they had made themselves",
    ],
    modelAnswer: "It was negotiated in London under British chairmanship as a compromise to end the war, so many felt it did not reflect what Zimbabweans wanted for the long term. It was also amended many times by governments of the day, which weakened public confidence, and citizens wanted a constitution they had helped to make.",
    hints: ["Where and why was it made? What happened to it after 1980?"],
    explanation: "One mark for each reason and one for its development.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Suggest **two** ways citizens can help to make sure the Constitution is respected and not changed lightly, and explain each.",
    points: [
      "Suggests learning about the Constitution / civic education in schools and communities",
      "Explains that people who know their rights can recognise and challenge violations",
      "Suggests taking part in public hearings on amendment bills / voting in referendums / approaching the courts",
      "Explains that wide participation means changes reflect the people's wishes and unlawful acts can be corrected",
    ],
    modelAnswer: "Citizens can learn about the Constitution through civic education in schools, churches and communities, so they know their rights and can recognise when they are violated. They can also attend public hearings on amendment bills and vote in referendums, so that any change reflects the wishes of the people rather than of a few.",
    hints: ["Think about knowledge and participation."],
    explanation: "One mark for each suggestion and one for its explanation.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: source("Source A", "a letter to the editor in a fictional newspaper, Mutare, 1998",
      "Our constitution was written in a foreign city to stop a war. It has been changed many times by those in power, often without asking us. It did bring us independence and majority rule, but we, the people, should now write our own.") +
      "\n\nRead Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "In which city was the constitution described in Source A negotiated?",
        options: [
          ["London", "Correct: the conference was at Lancaster House in London."],
          ["Harare", "It was not negotiated in Zimbabwe."],
          ["Lusaka", "Lusaka hosted other talks, not the 1979 conference."],
          ["Pretoria", "The conference was not held in South Africa."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** criticisms of the constitution made in the source.",
        points: [
          "It was written abroad to stop a war",
          "It was changed many times by those in power without consulting citizens",
        ],
        modelAnswer: "It was written in a foreign city to stop a war, and it was changed many times by those in power without asking the people.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "How far does the writer give a balanced view? Use the source and your own knowledge.",
        points: [
          "Balance in the source: admits it brought independence and majority rule",
          "Own knowledge: it also had a Declaration of Rights / protected the settlement that ended the war",
          "Judgement: mostly critical, with a single positive point, so only partly balanced",
        ],
        modelAnswer: "The writer is partly balanced, because he admits that the constitution brought independence and majority rule. However, he says nothing about its Declaration of Rights or its role in ending the war, and most of the letter is criticism, so the view is mainly one-sided.",
      }),
    ],
    hints: ["In (c), look for any positive point the writer makes."],
    explanation: "A source-based practice item on criticisms of the Lancaster House constitution.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "This question is about the Lancaster House constitution.",
    parts: [
      P.manual({
        label: "(a)", marks: 6,
        stem: "Describe **three** main features of the Lancaster House constitution.",
        points: [
          "Reserved seats: 20 of 100 House of Assembly seats for whites",
          "for seven years (abolished in 1987)",
          "Property protected: land acquired only on a willing-buyer willing-seller basis",
          "with compensation, for ten years",
          "A Declaration of Rights / a two-house Parliament / ceremonial President and Prime Minister",
          "explained (e.g. protecting civil and political rights; Westminster-style system)",
        ],
        modelAnswer: "First, it reserved 20 of the 100 House of Assembly seats for white voters for seven years; they were abolished in 1987. Second, it protected property, so land could be acquired only on a willing-buyer willing-seller basis with compensation for ten years. Third, it had a Declaration of Rights that protected civil and political rights such as freedom of expression.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"The Lancaster House constitution served Zimbabwe well.\" How far do you agree?",
        points: [
          ["For: it ended the war, brought independence and majority rule; it protected rights and gave stability", 2],
          ["Against: foreign-made compromise; reserved seats; land clauses slowed redistribution", 2],
          ["Against: many amendments, executive power concentrated; demands for reform and a home-grown constitution", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "The Lancaster House constitution did serve Zimbabwe in important ways. It made a ceasefire possible, brought independence and majority rule in 1980, and contained a Declaration of Rights. It also gave the new state a working system of government.\n\nHowever, it was a foreign-made compromise. The reserved seats gave a small minority a guaranteed voice, and the willing-buyer willing-seller clause slowed land redistribution in the 1980s. After 1980 it was amended many times, and many citizens and organisations argued that it no longer reflected their wishes, which led to the call for a home-grown constitution.\n\nI partly agree. It served well as a bridge from war to independence, but it was not suited to be the long-term supreme law of a sovereign nation.",
      }),
    ],
    hints: ["In (b), separate its short-term achievements from its long-term weaknesses."],
    explanation: "A practice evaluative item on the strengths and weaknesses of the Lancaster House constitution.",
  });

  b.card("DEFINITION", "Home-grown constitution", "A constitution made by a country's own citizens and institutions, reflecting their values and history.");
  b.card("DEFINITION", "Constitutional amendment", "A formal change to a constitution made by the special procedure it lays down.");
  b.card("FACT", "When was the Lancaster House Agreement signed?", "21 December 1979 (the conference ran from September to December 1979).");
  b.card("FACT", "How many seats were reserved for whites, and for how long?", "20 of the 100 House of Assembly seats, for seven years.");
  b.card("FACT", "For how long did the willing-buyer willing-seller land clause apply?", "Ten years.");
  b.card("FACT", "When was a draft constitution rejected in a referendum?", "February 2000.");
  b.card("FACT", "From which year did Zimbabwe have an executive presidency?", "1987.");
  b.card("CONCEPT", "Give three reasons why a new constitution was needed.", "It was negotiated abroad as a ceasefire compromise; it had been amended many times; citizens demanded stronger rights and a constitution of their own.");
  b.card("CONCEPT", "Why does a home-grown constitution matter?", "Citizens own it, it reflects national values, and approval in a referendum gives it legitimacy.");
});
