// W3a: systems of governance: democracy and autocracy (her.governance.systems).
import { concept, P, source, table, levels } from "../lib.mjs";

concept("her.governance.systems", { file: "governance/systems", keyPrefix: "governance.systems" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **autocracy**?",
    options: [
      ["Rule by one person with unlimited, unchecked power", "Correct."],
      ["Rule by the people through representatives they elect in regular free elections", "That is representative democracy."],
      ["Rule by a king or queen who is head of state while elected leaders govern", "That is a constitutional monarchy."],
      ["A system in which citizens vote directly on every decision", "That is direct democracy."],
    ],
    answer: "A",
    explanation: "In an autocracy one person or a small group holds power without accountability to the people.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which term describes the principle that **everyone, including leaders, must obey the law**?",
    options: [
      ["The rule of law", "Correct."],
      ["Separation of powers between the three arms", "That divides power among the arms of government."],
      ["Universal adult suffrage", "That is the right of all adults to vote."],
      ["Devolution of power to provinces", "That is the transfer of power to lower tiers of government."],
    ],
    answer: "A",
    explanation: "The rule of law: nobody is above the law, and laws are applied equally.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In which system do **all citizens vote on a decision themselves**, rather than through representatives?",
    options: [
      ["Direct democracy", "Correct: e.g. a referendum."],
      ["Representative democracy", "In this system citizens elect others to decide for them."],
      ["Absolute monarchy", "The monarch decides."],
      ["Dictatorship", "One ruler decides."],
    ],
    answer: "A",
    explanation: "A referendum, such as that of 16 March 2013 on the Constitution, is a form of direct democracy.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the difference between **government** and **governance**?",
    options: [
      ["Government is the institutions; governance is how power is used", "Correct."],
      ["Government is local, while governance refers only to the national level", "Both terms apply at every level."],
      ["Government is elected, but governance is always inherited by birth", "Governance is not about inheritance."],
      ["There is no difference; the two words mean exactly the same thing", "They are related but different."],
    ],
    answer: "A",
    explanation: "Government: the people and institutions with authority. Governance: the way power is exercised, shared and checked.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In a **constitutional monarchy**, who governs the country day to day?",
    options: [
      ["Elected leaders", "Correct: the monarch is head of state but does not rule."],
      ["The monarch alone, without any parliament or courts", "That describes an absolute monarchy."],
      ["The army commander, who took power by force", "That describes a military dictatorship."],
      ["A council of spirit mediums chosen from each region", "This is not a system of governance in the syllabus."],
    ],
    answer: "A",
    explanation: "In a constitutional monarchy the king or queen is head of state, but elected leaders govern.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "In a fictional country, a newspaper that criticises the ruler is closed and its editor is jailed without trial. Which characteristic of autocracy does this show?",
    options: [
      ["Restriction of rights and freedoms", "Correct: freedom of the press and the right to a fair trial are denied."],
      ["Separation of powers", "This is a characteristic of democracy."],
      ["Free and fair elections", "Elections are not involved here."],
      ["Accountability of leaders", "The ruler is avoiding accountability."],
    ],
    hints: ["Which freedoms are denied?"],
    answer: "A",
    explanation: "Closing critical media and jailing without trial restrict rights, a mark of autocracy.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Councillors in a fictional town publish the council budget and answer residents' questions at a public meeting. Which characteristic of democracy is this?",
    options: [
      ["Accountability and transparency", "Correct: leaders explain and answer for their decisions."],
      ["Universal adult suffrage", "That is the right to vote."],
      ["Hereditary succession of leaders", "That belongs to monarchy."],
      ["Concentration of power in one person", "That is autocracy."],
    ],
    hints: ["Leaders explain their decisions."],
    answer: "A",
    explanation: "Publishing the budget and answering questions show accountability and transparency.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why are elections **alone** not enough to make a country a democracy?",
    options: [
      ["Without rights and the rule of law, elections may not be free", "Correct."],
      ["Elections are too expensive for most countries to hold", "Cost is a disadvantage, not the reason."],
      ["Elections can only be held in countries that are ruled by monarchs", "Elections are held in many systems."],
      ["Only direct democracy uses elections", "Representative democracy depends on elections."],
    ],
    hints: ["What else must be present for an election to be free and fair?"],
    answer: "A",
    explanation: "Democracy needs free and fair elections together with the rule of law, protected rights, independent institutions and accountability.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Section 1 of the Constitution describes Zimbabwe as a unitary, democratic and sovereign republic.",
    answer: true,
    explanation: "True.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In pre-colonial Zimbabwe, rulers were advised by councils of elders, and matters were discussed at the dare or inkundla.",
    answer: true,
    explanation: "True. Indigenous systems included consultation, and advisers could check a ruler.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "An advantage of autocracy is that leaders can easily be changed peacefully at elections.",
    answer: false,
    explanation: "False. Peaceful change of leaders through elections is an advantage of democracy; autocracy offers no such way.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each system of governance with how its leaders get power.",
    pairs: [
      ["Representative democracy", "Regular free and fair elections"],
      ["Monarchy", "Birth into a royal family"],
      ["Military dictatorship", "Often by seizing power in a coup"],
      ["Indigenous chieftainship", "By custom, from a ruling family"],
    ],
    explanation: "Systems differ in how leaders are chosen and checked.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "A vote by all citizens on a single question, such as approving a constitution, is called a {{blank:a}}. The division of power among the Executive, the Legislature and the Judiciary is called the {{blank:b}} of powers.",
    blanks: [
      { id: "a", accepted: ["referendum"], choices: ["referendum", "by-election", "census", "petition"] },
      { id: "b", accepted: ["separation"], choices: ["separation", "devolution", "concentration", "delegation"] },
    ],
    explanation: "Referendum; separation of powers.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "State **four** characteristics of democracy.",
    points: ["Free and fair elections", "Rule of law", "Separation of powers / independent courts", "Protection of rights, accountability or multiparty politics"],
    modelAnswer: "Free and fair elections, the rule of law, separation of powers and protection of rights.",
    explanation: "One mark per characteristic.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** disadvantages of democracy.",
    points: [
      "Slow decision-making",
      "Developed: discussion and debate take time, which is a problem in an emergency",
      "Elections are costly / majority may ignore minorities",
      "Developed: money is spent on elections that could fund services; minorities need rights to be protected",
    ],
    modelAnswer: "Decisions are slow because many people must be consulted and laws debated, which can be a problem in an emergency. Elections are also expensive, using money that could be spent on services.",
    hints: ["Think about time and cost."],
    explanation: "Two marks per developed disadvantage.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain **three** ways in which indigenous systems of governance in pre-colonial Zimbabwe limited the power of rulers.",
    points: [
      "Councils of elders / advisers", "Developed: rulers were expected to consult them before major decisions",
      "Open discussion at the dare / inkundla", "Developed: people could raise grievances and disputes were heard in public",
      "Spirit mediums / religious authority", "Developed: mediums could warn or criticise a ruler who abused power",
    ],
    modelAnswer: "Rulers were advised by councils of elders and relatives, and were expected to consult them before making major decisions. Matters were discussed openly at the dare or inkundla, where people could raise grievances and disputes were heard in public. Spirit mediums also had religious authority and could warn a ruler who abused his power.",
    hints: ["Who advised and checked a mambo or inkosi?"],
    explanation: "Two marks per developed way.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: "Study the table, which describes two fictional countries (invented for this question).\n\n" + table(["Feature", "Country X", "Country Y"], [
      ["Elections", "Every five years; several parties take part", "None for twenty years"],
      ["Courts", "Judges can rule against the government", "Judges are dismissed if they rule against the ruler"],
      ["Media", "Newspapers criticise ministers freely", "All media controlled by the state"],
      ["Decisions", "Parliament debates bills before they become law", "The ruler issues decrees"],
    ]),
    parts: [
      P.mcq({
        label: "(a)", stem: "Which system of governance does **Country Y** show?",
        options: [
          ["Autocracy", "Correct: power is concentrated and unchecked."],
          ["Representative democracy", "Country X shows this."],
          ["Direct democracy", "Citizens do not vote on decisions in Country Y."],
          ["Constitutional monarchy", "There is no monarch and no elected government."],
        ],
        answer: "A",
        explanation: "No elections, controlled courts and media, and rule by decree indicate autocracy.",
      }),
      P.match({
        label: "(b)",
        stem: "Match each feature of Country X with the characteristic of democracy it shows.",
        pairs: [
          ["Judges can rule against the government", "Independent judiciary"],
          ["Newspapers criticise ministers freely", "Freedom of the press"],
          ["Several parties take part in elections", "Multiparty politics"],
        ],
        explanation: "Each feature shows a characteristic of democracy.",
      }),
      P.manual({
        label: "(c)", marks: 8,
        stem: "Explain **four** ways in which life for citizens of Country Y might differ from life in Country X.",
        points: [
          "Citizens of Y cannot change their leaders", "Developed: no elections, so they cannot remove a ruler peacefully",
          "No protection from the courts", "Developed: judges cannot protect citizens against unfair treatment by the state",
          "Limited information and free speech", "Developed: state-controlled media, so citizens cannot criticise or learn the truth",
          "No say in laws", "Developed: decrees are issued without debate, so laws may not reflect citizens' needs",
        ],
        modelAnswer: "Citizens of Country Y cannot change their leaders because there are no elections, so they have no peaceful way to remove a bad ruler. The courts cannot protect them, because judges who rule against the ruler are dismissed. The media is controlled, so people cannot criticise the government freely or get independent information. Laws are made by decree without debate, so citizens have no say and laws may ignore their needs.",
      }),
    ],
    hints: ["Compare the two columns row by row."],
    explanation: "Comparing democracy and autocracy from a table.",
  });
  b.struct({
    d: 4, skill: "EVALUATION",
    stem: "Answer the questions on systems of governance.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Distinguish between direct democracy and representative democracy.",
        points: [
          "Direct democracy: citizens decide issues themselves",
          "e.g. a referendum or a community meeting",
          "Representative democracy: citizens elect representatives who decide for them",
          "e.g. Parliament or a council; suited to large populations",
        ],
        modelAnswer: "In direct democracy citizens decide issues themselves, for example in a referendum or a village meeting. In representative democracy citizens elect representatives, such as members of Parliament or councillors, who make decisions on their behalf; this suits large populations.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Autocracy is the best way to achieve quick development.\" How far do you agree?",
        points: [
          ["For: decisions are made quickly without long debate; projects can be started fast", 2],
          ["Against: no accountability, so resources may be wasted or stolen; mistakes are not corrected", 2],
          ["Against: development needs participation, rights and trust; democracy allows leaders to be changed peacefully", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "Some people argue that autocracy brings quick development, because a ruler can make decisions without long debate and start projects quickly.\n\nHowever, an autocrat is not accountable, so money can be wasted or stolen without anyone being able to question it, and mistakes are not corrected because critics are silenced. Development also depends on people taking part and trusting their leaders; in a democracy citizens can raise problems and change leaders peacefully.\n\nI therefore disagree: autocracy may be faster at first, but democracy is more likely to produce development that lasts and benefits everyone.",
      }),
    ],
    hints: ["Speed is not the only measure of development."],
    explanation: "Distinguishing types of democracy and evaluating autocracy.",
  });

  b.card("DEFINITION", "Governance", "The way power is used to manage a country's affairs: decisions, choosing leaders, accountability and participation.");
  b.card("DEFINITION", "Democracy", "Power belongs to the people, who decide directly or through elected representatives.");
  b.card("DEFINITION", "Autocracy", "Rule by one person or a small group with unlimited power and no accountability.");
  b.card("DEFINITION", "Rule of law", "Everyone, including leaders, is subject to the law, applied equally by independent courts.");
  b.card("DEFINITION", "Referendum", "A vote by all citizens on a single question, e.g. the Constitution referendum of 16 March 2013.");
  b.card("CONCEPT", "Constitutional versus absolute monarchy?", "Constitutional: monarch is head of state, elected leaders govern. Absolute: the monarch rules.");
  b.card("CONCEPT", "Five characteristics of democracy?", "Free and fair elections, rule of law, separation of powers, protected rights, accountability.");
  b.card("CONCEPT", "How were pre-colonial rulers checked?", "Councils of elders, open discussion at the dare/inkundla, and spirit mediums.");
  b.card("FACT", "What does section 1 of the Constitution say about Zimbabwe?", "It is a unitary, democratic and sovereign republic.");
});
