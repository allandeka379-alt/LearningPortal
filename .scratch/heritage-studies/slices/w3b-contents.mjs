// W3b: Contents and key features of the Constitution of Zimbabwe (her.constitution.contents).
// Reviewer note: chapter titles and sections 1-6 as in the 2013 Constitution; amendments described in outline only
// ("amended in 2017 and 2021"). Presidential two-term limit (Chapter 5) is stated without a section number.
import { concept, P, source, levels } from "../lib.mjs";

concept("her.constitution.contents", { file: "constitution/contents", keyPrefix: "constitution.contents" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "How many chapters does the 2013 Constitution of Zimbabwe have?",
    options: [
      ["18", "Correct: the Constitution has 18 chapters."],
      ["16", "16 is the number of officially recognised languages."],
      ["10", "10 is the number of provinces."],
      ["4", "Chapter 4 is the Declaration of Rights; there are more chapters."],
    ],
    answer: "A",
    explanation: "The Constitution has 18 chapters; it recognises 16 languages; the country has 10 provinces.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which chapter of the Constitution contains the Declaration of Rights?",
    options: [
      ["Chapter 4", "Correct: Chapter 4 is the Declaration of Rights."],
      ["Chapter 2", "Chapter 2 sets out national objectives."],
      ["Chapter 12", "Chapter 12 deals with independent commissions."],
      ["Chapter 15", "Chapter 15 deals with traditional leaders."],
    ],
    answer: "A",
    explanation: "Chapter 4 (sections 44-87) is the Declaration of Rights.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Section 2 of the Constitution establishes the **supremacy of the Constitution**. What does this mean?",
    options: [
      ["Any law or conduct inconsistent with it is invalid to that extent", "Correct: the Constitution is the highest law."],
      ["The President may set aside the Constitution in an emergency", "No one is above the Constitution; even emergency powers are limited by it."],
      ["Customary law always takes priority over the Constitution", "Customs inconsistent with the Constitution are invalid."],
      ["Parliament may pass any law it likes without limits", "Parliament's laws must be consistent with the Constitution."],
    ],
    answer: "A",
    explanation: "Supremacy means the Constitution is the highest law; inconsistent laws, customs and conduct are invalid.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which of the following is listed among the founding values and principles in section 3?",
    options: [
      ["gender equality", "Correct: gender equality is a founding value."],
      ["a one-party state", "Section 3 refers to a multi-party democratic political system."],
      ["rule by a hereditary monarch", "Zimbabwe is a republic, not a monarchy."],
      ["unlimited presidential terms", "The Constitution limits a President to two terms."],
    ],
    answer: "A",
    explanation: "Section 3 lists values including the rule of law, human rights, equality, gender equality, good governance and respect for the liberation struggle.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of the following is one of the three tiers of government set out in the Constitution?",
    options: [
      ["provincial and metropolitan councils", "Correct: the tiers are national government, provincial and metropolitan councils, and local authorities."],
      ["school development committees", "These manage schools; they are not a tier of government."],
      ["burial societies and clubs", "These are community organisations."],
      ["the independent commissions in Chapter 12", "Commissions support democracy; they are not a tier of government."],
    ],
    answer: "A",
    explanation: "Section 5 sets out three tiers: national government, provincial and metropolitan councils, and local authorities.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A chief openly campaigns for a political party at a rally. Which part of the Constitution is **most directly** relevant?",
    options: [
      ["the chapter on traditional leaders, which requires them to be non-partisan", "Correct: Chapter 15 says traditional leaders must not act in a partisan way."],
      ["the chapter on finance, which deals with taxes, public money and the national budget", "The issue is not about public money."],
      ["the section on the national flag and anthem", "This does not deal with chiefs' conduct."],
      ["the chapter on citizenship by registration", "This deals with how people become citizens."],
    ],
    answer: "A",
    hints: ["Which chapter deals with chiefs?"],
    explanation: "Chapter 15 recognises traditional leaders and requires them not to be members of political parties or act in a partisan way.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is the **separation of powers** an important feature of the Constitution?",
    options: [
      ["The three arms of government check one another, so no body holds all power", "Correct: separation prevents abuse of power."],
      ["It allows the President alone to make the laws, carry them out and judge all cases", "This is the opposite of the separation of powers."],
      ["It separates the country into ten provinces", "Provinces are about devolution, not separation of powers."],
      ["It keeps citizens apart from their leaders", "It is about dividing power among institutions."],
    ],
    answer: "A",
    hints: ["Think of the Executive, the Legislature and the Judiciary."],
    explanation: "The Legislature makes laws, the Executive carries them out and the Judiciary interprets them; each checks the others.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A council decides how to spend its own budget on local roads after consulting residents. Which feature of the Constitution does this **best** illustrate?",
    options: [
      ["devolution of power to local authorities", "Correct: decisions are made closer to the people."],
      ["the presidential term limit", "This concerns the President, not councils."],
      ["the sixteen official languages", "This is not about languages."],
      ["the supremacy of customary law over the Constitution", "Customary law is not supreme; the Constitution is."],
    ],
    answer: "A",
    hints: ["Which tier of government is acting here?"],
    explanation: "Devolution gives provincial councils and local authorities powers to make decisions for their areas.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Section 6 of the Constitution recognises sixteen languages, including sign language.",
    answer: true,
    explanation: "True. Section 6 lists sixteen officially recognised languages, including sign language.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Founding values in section 3 and individual rights in Chapter 4 are the same thing.",
    answer: false,
    explanation: "False. Founding values are principles the nation is built on; rights in Chapter 4 belong to individuals and can be enforced in court.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each chapter of the Constitution with what it covers.",
    pairs: [
      ["Chapter 3", "citizenship"],
      ["Chapter 6", "the Legislature (Parliament)"],
      ["Chapter 12", "independent commissions supporting democracy"],
      ["Chapter 14", "provincial and local government"],
    ],
    extraRight: ["traditional leaders"],
    explanation: "Chapter 3 citizenship; Chapter 6 the Legislature; Chapter 12 independent commissions; Chapter 14 provincial and local government. Traditional leaders are Chapter 15.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "Section 1 says Zimbabwe is a unitary, democratic and {{blank:a}} republic. National objectives are set out in Chapter {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["sovereign"], choices: ["sovereign", "federal", "monarchical", "one-party"] },
      { id: "b", accepted: ["2"], choices: ["2", "4", "8", "16"] },
    ],
    explanation: "Section 1: a unitary, democratic and sovereign republic. Chapter 2: national objectives.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "State **four** founding values or principles of Zimbabwe listed in section 3 of the Constitution.",
    points: [
      "Any one of: supremacy of the Constitution; rule of law; fundamental human rights and freedoms; dignity and worth of every person; equality of all human beings; gender equality; good governance; recognition of the liberation struggle",
      "A second different value",
      "A third different value",
      "A fourth different value",
    ],
    modelAnswer: "The rule of law, gender equality, good governance and recognition of the liberation struggle.",
    explanation: "One mark per correct value or principle.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Explain the significance of **three** key features of the Constitution.",
    points: [
      "Feature 1 identified, e.g. supremacy of the Constitution",
      "Significance: no law, custom or official is above it, which protects citizens from abuse of power",
      "Feature 2 identified, e.g. Declaration of Rights / separation of powers / term limits",
      "Significance: e.g. rights can be enforced in court, or power is checked",
      "Feature 3 identified, e.g. devolution / sixteen languages / independent commissions",
      "Significance: e.g. decisions closer to the people, recognition of diversity, independent oversight",
    ],
    modelAnswer: "The supremacy of the Constitution means no law, custom or official is above it, which protects citizens from abuse of power. The Declaration of Rights protects freedoms such as expression and education, and citizens can go to court to enforce them. Devolution gives provincial councils and local authorities power to decide on local matters, bringing government closer to the people.",
    hints: ["For each feature, say what it is and what it achieves."],
    explanation: "One mark for each feature and one for its significance.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Many adults in a fictional village near Gokwe have never read the Constitution. Suggest **two** ways of making its contents better known, and explain each.",
    points: [
      "Suggests simplified versions or summaries in local languages (and in braille or sign language)",
      "Explains that people understand the Constitution best in their own language, which section 6 supports",
      "Suggests civic education through radio, schools, churches, community meetings",
      "Explains that these reach many people where they already gather and allow questions",
    ],
    modelAnswer: "Short, simple summaries of the Constitution could be printed in local languages, as well as in braille and sign language, because people understand it best in their own language, which section 6 supports. Civic education could be given through radio, schools, churches and community meetings, which reach many people where they already gather and let them ask questions.",
    hints: ["Think of language and of where people meet."],
    explanation: "One mark for each suggestion and one for its explanation.",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: source("Source A", "a scenario written for a fictional school civic education lesson, Gweru, 2026",
      "The councillors of a town council decide to close a market without consulting traders. Traders say the decision breaks the Constitution's principles of accountability and transparency. A local radio station invites listeners to send questions in Shona, Ndebele and English. A lawyer explains that if a decision violates a right, people can go to court.") +
      "\n\nRead Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "Which tier of government made the decision in the source?",
        options: [
          ["a local authority", "Correct: a town council is a local authority."],
          ["the national Cabinet", "The decision was made by councillors, not Cabinet."],
          ["the Constitutional Court", "Courts decide cases; they do not close markets."],
          ["a provincial heroes acre committee", "This is not a tier of government."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** principles or features of the Constitution referred to in the source.",
        points: ["Accountability and transparency (good governance)", "Official languages / enforcement of rights through the courts"],
        modelAnswer: "Accountability and transparency, and the enforcement of rights through the courts (also the official languages).",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain how the Constitution helps the traders in this situation.",
        points: [
          "Principles of accountability and transparency require councillors to consult and explain decisions",
          "The traders can raise the matter with councillors and the public (radio, meetings)",
          "If a right is violated, they can go to court because the Constitution is supreme and rights are enforceable",
        ],
        modelAnswer: "The Constitution's principles of accountability and transparency mean councillors should consult traders and explain their decisions. The traders can raise the matter publicly, for example on the radio. If a right has been violated, they can go to court, because the Constitution is supreme and its rights can be enforced.",
      }),
    ],
    hints: ["In (c), think of principles, public discussion and courts."],
    explanation: "A source-based practice item on applying features of the Constitution.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "This question is about the Constitution of Zimbabwe.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Summarise the contents of **four** chapters of the Constitution.",
        points: [
          "A chapter correctly summarised, e.g. Chapter 1 founding provisions (republic, supremacy, values, symbols, languages)",
          "A second chapter, e.g. Chapter 4 Declaration of Rights",
          "A third chapter, e.g. Chapters 5-8 Executive, Legislature, elections, Judiciary",
          "A fourth chapter, e.g. Chapter 12 independent commissions or Chapter 14 provincial and local government",
        ],
        modelAnswer: "Chapter 1 sets out founding provisions such as supremacy, founding values, national symbols and languages. Chapter 4 is the Declaration of Rights. Chapter 6 sets up Parliament, made up of the Senate and the National Assembly. Chapter 14 deals with provincial and local government and devolution.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"The Constitution is the most important document in Zimbabwe.\" Discuss.",
        points: [
          ["For: supreme law; all other laws and conduct must agree with it", 2],
          ["For: protects rights, sets up and limits government, unites the nation through shared values and recognised diversity", 2],
          ["Limits: a document is effective only if respected, known and enforced; many citizens do not know its contents; other laws and institutions carry it out", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "The Constitution is the most important document in Zimbabwe because it is the supreme law: every other law, custom and action must be consistent with it. It protects citizens' rights, sets up the Executive, Parliament and the courts and limits their powers, and it unites the nation through shared values and the recognition of sixteen languages.\n\nHowever, a document is only as strong as the respect it receives. Many citizens do not know what it says, so they cannot claim their rights. Its provisions are carried out through other laws, institutions and officials; if these are weak, the Constitution cannot work fully.\n\nI agree that it is the most important document, because everything else depends on it. But its importance in practice depends on citizens knowing it and on institutions respecting and enforcing it.",
      }),
    ],
    hints: ["In (b), separate what the Constitution says from how it works in practice."],
    explanation: "A practice evaluative item on the importance of the Constitution.",
  });

  b.card("FACT", "How many chapters does the 2013 Constitution have?", "18.");
  b.card("DEFINITION", "Supremacy of the Constitution", "The Constitution is the highest law; any law, custom or conduct inconsistent with it is invalid to that extent (section 2).");
  b.card("FACT", "Name four founding values in section 3.", "Any four of: supremacy of the Constitution, rule of law, human rights and freedoms, dignity, equality, gender equality, good governance, recognition of the liberation struggle.");
  b.card("FACT", "What are the three tiers of government?", "National government; provincial and metropolitan councils; local authorities.");
  b.card("DEFINITION", "Devolution", "Transfer of some powers and responsibilities from national government to provincial and metropolitan councils and local authorities.");
  b.card("FACT", "What do Chapters 2, 3 and 4 cover?", "Chapter 2: national objectives. Chapter 3: citizenship. Chapter 4: Declaration of Rights.");
  b.card("FACT", "Which chapter deals with independent commissions supporting democracy?", "Chapter 12.");
  b.card("DEFINITION", "Separation of powers", "Dividing government power among the Executive, Legislature and Judiciary so that each checks the others.");
  b.card("CONCEPT", "Why is the Constitution important?", "It is the supreme law, protects rights, sets up and limits government, unites the nation and guides policy.");
});
