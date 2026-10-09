// W3a: local government structures (her.governance.local-government).
import { concept, P, source, table, levels } from "../lib.mjs";

concept("her.governance.local-government", { file: "governance/local-government", keyPrefix: "governance.local-government" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **by-law**?",
    options: [
      ["A rule made by a local authority for its own area", "Correct."],
      ["A law passed by Parliament for the whole country", "That is an Act of Parliament."],
      ["A court ruling that interprets the national Constitution", "That is a judgment."],
      ["A customary rule applied by a chief at a village court", "That is customary law."],
    ],
    answer: "A",
    explanation: "By-laws apply only in a council's area, e.g. on refuse or street trading.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which chapter of the Constitution deals with **provincial and local government**?",
    options: [
      ["Chapter 14", "Correct."],
      ["Chapter 4", "Chapter 4 is the Declaration of Rights."],
      ["Chapter 8", "Chapter 8 is the Judiciary."],
      ["Chapter 16", "Chapter 16 is agricultural land."],
    ],
    answer: "A",
    explanation: "Chapter 14: provincial and local government, including devolution. Chapter 15: traditional leaders.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Who runs an **urban council** day to day, carrying out the councillors' decisions?",
    options: [
      ["The town clerk", "Correct: the chief official of an urban council."],
      ["The mayor", "The mayor chairs the council; officials carry out decisions."],
      ["The village head", "Village heads are traditional leaders in rural areas."],
      ["The Speaker", "The Speaker leads the National Assembly."],
    ],
    answer: "A",
    explanation: "Councillors decide; the town clerk and officials carry out the decisions.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is **devolution**?",
    options: [
      ["Transferring powers and resources to provincial and local tiers", "Correct."],
      ["Holding a referendum on every new by-law", "That is a form of direct democracy."],
      ["Merging all town and rural councils into one national authority", "That would centralise power."],
      ["Electing the President for a second term", "That is about the Executive."],
    ],
    answer: "A",
    explanation: "Devolution brings decisions and resources closer to the people (Chapter 14).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a source of income for an urban council?",
    options: [
      ["Property rates", "Correct."],
      ["Customs duty at the border posts", "Customs duty goes to central government via ZIMRA."],
      ["Income tax paid on workers' salaries", "Income tax is collected nationally."],
      ["Fines imposed by the Supreme Court", "Court fines are not council income."],
    ],
    answer: "A",
    explanation: "Councils raise rates, service charges, licences and fees, and receive government grants.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Residents of a ward in Bulawayo have had no refuse collection for a month. Who should they contact **first**?",
    options: [
      ["Their ward councillor or the city council", "Correct: refuse collection is a council function."],
      ["The Chief Justice in the Supreme Court", "Courts settle disputes; they do not collect refuse."],
      ["The Minister of Foreign Affairs", "Foreign affairs has no role in refuse."],
      ["The chief of a nearby rural district", "Chiefs serve communal areas; this is a city service."],
    ],
    hints: ["Which tier provides refuse collection?"],
    answer: "A",
    explanation: "Local services are the council's responsibility; the councillor represents the ward.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why must traditional leaders, under the Constitution, be **non-partisan**?",
    options: [
      ["So that they serve all members of the community fairly", "Correct."],
      ["So that they can stand as candidates for Parliament", "Non-partisanship stops them acting as party members."],
      ["So that they can collect council rates", "Rates are collected by councils."],
      ["So that they can appoint councillors", "Councillors are elected."],
    ],
    hints: ["Their communities include supporters of many parties."],
    answer: "A",
    explanation: "Communities include people of different political views; a non-partisan leader can serve everyone.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement **best** explains why a by-law against illegal dumping may fail?",
    options: [
      ["The council does not collect refuse, so residents have no lawful alternative", "Correct: the service must exist for the rule to work."],
      ["By-laws are not legally binding on anyone living in the area", "By-laws are binding within the area."],
      ["Only Parliament may make rules about refuse in towns", "Councils make by-laws on refuse."],
      ["Fines can be charged only by the Constitutional Court", "Councils can set fines for breaking by-laws."],
    ],
    hints: ["What must the council provide?"],
    answer: "A",
    explanation: "Rules need services and cooperation: if refuse is not collected, people dump it.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Zimbabwe has ten provinces, including the metropolitan provinces of Harare and Bulawayo.",
    answer: true,
    explanation: "True: eight provinces plus two metropolitan provinces.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Councillors are employed officials appointed by the town clerk.",
    answer: false,
    explanation: "False. Councillors are elected by wards; the town clerk is an employed official.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each person or body with their role in local governance.",
    pairs: [
      ["Ward councillor", "Represents the ward and votes on the council budget"],
      ["Town clerk", "Heads the employed staff of an urban council"],
      ["Village head", "Leads a village and helps allocate communal land"],
      ["VIDCO", "Lists a village's development priorities"],
    ],
    explanation: "Elected, employed and traditional leaders all play a part.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "A local authority for a rural district is called a rural district {{blank:a}}. A charge paid by property owners to a council is called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["council"], choices: ["council", "court", "assembly", "commission"] },
      { id: "b", accepted: ["rates"], choices: ["rates", "tariffs", "royalties", "tithes"] },
    ],
    explanation: "Rural district council (RDC); rates.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the Shona term for a village head. (one word)",
    accepted: ["sabhuku", "sabuku"],
    wrong: ["sadunhu"],
    explanation: "**Sabhuku** is the village head; sadunhu is a headman.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "State **four** functions of an urban council.",
    points: ["Water supply and sewage removal", "Refuse collection", "Roads, street lights or drains", "Clinics / housing stands / markets / licensing / by-laws"],
    modelAnswer: "Supplying water, collecting refuse, maintaining roads and running clinics.",
    explanation: "One mark per function.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways in which citizens can take part in local government.",
    points: [
      "Vote for councillors",
      "Developed: choose representatives who will speak for the ward and can be voted out",
      "Attend budget or ward meetings / join residents' associations",
      "Developed: residents' views shape spending priorities and services",
    ],
    modelAnswer: "Citizens can vote for their ward councillor, choosing someone who will speak for the ward and who can be replaced if they perform poorly. They can attend budget consultation and ward meetings, so that their priorities, such as a new clinic, are considered when the council plans its spending.",
    hints: ["Before, during and after decisions."],
    explanation: "Two marks per developed way.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "Suggest **three** ways in which a town council could improve its collection of rates and bills, explaining how each would help.",
    points: [
      "Improve services", "Developed: residents are more willing to pay when water and refuse services are reliable",
      "Make payment easy (mobile money, local offices)", "Developed: fewer people miss payments",
      "Publish the budget / consult residents", "Developed: transparency builds trust that money is well used",
    ],
    modelAnswer: "The council could improve services first, because residents are more willing to pay when water and refuse collection are reliable. It could make payment easy, for example by mobile money or offices in each suburb, so fewer people miss payments. It could publish its budget and accounts and consult residents, building trust that the money is well used.",
    hints: ["Why might residents not pay?"],
    explanation: "Two marks per developed suggestion.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: "Study the budget of a fictional town council (invented for this question).\n\n" + table(["Income source", "Share of income"], [
      ["Water and sewer charges", "40%"],
      ["Property rates", "30%"],
      ["Licences and market fees", "15%"],
      ["Grants from central government", "15%"],
    ]),
    parts: [
      P.mcq({
        label: "(a)", stem: "Which source provides the **largest** share of the council's income?",
        options: [
          ["Water and sewer charges", "Correct: 40%."],
          ["Property rates", "30%."],
          ["Licences and market fees", "15%."],
          ["Grants from central government", "15%."],
        ],
        answer: "A",
        explanation: "Water and sewer charges: 40%.",
      }),
      P.fib({
        label: "(b)",
        stem: "Complete the sentence.",
        template: "The share of income that the council raises itself, without grants, is {{blank:a}}.",
        blanks: [{ id: "a", accepted: ["85%"], choices: ["85%", "70%", "60%", "15%"] }],
        explanation: "100% − 15% = 85%.",
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain **two** problems the council would face if many residents stopped paying their water bills.",
        points: [
          "Large loss of income (40% from water)",
          "Developed: cannot buy water-treatment chemicals or repair pipes, so supply worsens",
          "Other services suffer / staff unpaid",
          "Developed: money must be taken from refuse, roads or clinics; health risks rise",
        ],
        modelAnswer: "Water charges are the council's biggest source of income, so it would lose a large share of its money and could not buy treatment chemicals or repair pipes, making the water supply worse. It would also have to take money from other services such as refuse collection and clinics, or fail to pay staff, which would increase health risks.",
      }),
    ],
    hints: ["Read the percentages carefully."],
    explanation: "Interpreting an invented council budget.",
  });
  b.struct({
    d: 4, skill: "EVALUATION",
    stem: "Answer the questions on devolution.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Outline the tiers of government in Zimbabwe.",
        points: ["National (central) government", "Provincial councils", "Metropolitan councils (Harare and Bulawayo)", "Local authorities: urban councils and rural district councils"],
        modelAnswer: "There is national (central) government; provincial councils and metropolitan councils for Harare and Bulawayo; and local authorities, which are urban councils and rural district councils.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Devolution is the best way to improve services in Zimbabwe's communities.\" How far do you agree?",
        points: [
          ["For: decisions closer to the people; local knowledge of needs; communities take part", 2],
          ["For: a share of national revenue goes to provinces and local authorities, spreading development", 2],
          ["Against: depends on enough funds, skilled staff and honest management; some services need national coordination; other measures (better rate collection, partners) also matter", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "Devolution can improve services because decisions are made closer to the people. Local councils know which roads, clinics and boreholes are most needed, and residents can take part in planning. The Constitution also requires a share of national revenue to go to provinces and local authorities, which can spread development more fairly.\n\nHowever, devolution works only if there are enough funds, skilled staff and honest management. Some services, such as national roads and power, need national coordination, and councils can also improve services by collecting rates better and working with partners.\n\nI partly agree: devolution is an important way to improve services, but it is not enough on its own.",
      }),
    ],
    hints: ["Consider conditions for devolution to work."],
    explanation: "Outlining tiers of government and evaluating devolution.",
  });

  b.card("DEFINITION", "Devolution", "Transferring powers and resources from central government to provincial and local tiers.");
  b.card("DEFINITION", "By-law", "A rule made by a local authority that applies only in its area.");
  b.card("DEFINITION", "Rates", "Charges paid by property owners to the council to fund local services.");
  b.card("FACT", "Two types of local authority?", "Urban councils and rural district councils (RDCs).");
  b.card("FACT", "Which chapters cover local government and traditional leaders?", "Chapter 14 (provincial and local government) and Chapter 15 (traditional leaders).");
  b.card("CONCEPT", "Councillor versus town clerk?", "Councillors are elected and decide; the town clerk is an employed official who carries out decisions.");
  b.card("CONCEPT", "Four sources of council income?", "Rates, service charges, licences and fees, government grants.");
  b.card("FACT", "What are VIDCOs and WADCOs?", "Village and ward development committees that plan local development.");
  b.card("CONCEPT", "Two roles of traditional leaders?", "Allocate communal land and settle disputes under customary law.");
});
