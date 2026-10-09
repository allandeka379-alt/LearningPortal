// Slice W2a: democracy (ZIMSEC topic 15.2).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.constitution.democracy", { file: "constitution/democracy", keyPrefix: "constitution.democracy" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does the Greek word \"demos\" in democracy mean?",
    options: [
      ["People", "Correct: demos means people; kratos means rule."],
      ["Law", "The Greek for law is nomos."],
      ["King", "Rule by a king is monarchy."],
      ["Army", "Rule by soldiers is military rule."],
    ],
    answer: "A",
    explanation: "**Demos** means people and **kratos** means rule: democracy is rule by the people.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is an example of direct democracy?",
    options: [
      ["A national referendum", "Correct: citizens decide the question themselves."],
      ["Parliament passing a budget", "MPs decide on behalf of voters: representative democracy."],
      ["A minister signing a regulation", "This is executive action."],
      ["A court hearing an appeal", "This is the judiciary at work."],
    ],
    answer: "A",
    explanation: "In a **referendum**, such as those of 2000 and 2013, citizens vote directly on a question.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is universal adult suffrage?",
    options: [
      ["The right of every adult citizen to vote", "Correct: regardless of race, sex or wealth."],
      ["The right of property owners to vote", "This is a property qualification, which excludes many adults."],
      ["The right of the President to dissolve Parliament", "This concerns executive power, not voting."],
      ["The duty of adults to pay taxes", "Tax is a duty; suffrage is the vote."],
    ],
    answer: "A",
    explanation: "**Universal adult suffrage** means every adult citizen (18 and over in Zimbabwe) may vote.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Who was Zimbabwe's ceremonial President under the parliamentary system that followed independence?",
    options: [
      ["Canaan Banana", "Correct: Robert Mugabe was Prime Minister."],
      ["Joshua Nkomo", "Nkomo led ZAPU and later became a Vice-President after the Unity Accord."],
      ["Abel Muzorewa", "Muzorewa was Prime Minister of Zimbabwe-Rhodesia in 1979."],
      ["Simon Muzenda", "Muzenda was Deputy Prime Minister and later Vice-President."],
    ],
    answer: "A",
    explanation: "**Canaan Banana** was ceremonial President; Robert Mugabe was Prime Minister until the executive presidency began at the end of 1987.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "In a parliamentary democracy, how is the head of government usually removed between elections?",
    options: [
      ["By a vote of no confidence in parliament", "Correct: the Prime Minister depends on parliament's support."],
      ["By a decision of the Chief Justice alone", "Judges do not remove governments in this way."],
      ["By the head of the army", "Military removal is a coup, not democracy."],
      ["By the votes of foreign governments", "Other states have no such power."],
    ],
    answer: "A",
    hints: ["Who does a Prime Minister answer to?"],
    explanation: "A Prime Minister needs a majority in parliament and can be removed by a **vote of no confidence**.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which democratic principle is most directly served by an independent electoral commission?",
    options: [
      ["Free and fair elections", "Correct: it runs elections impartially."],
      ["Freedom of religion", "This concerns belief, not elections."],
      ["The right to education", "This is a social right."],
      ["Separation of church and state", "This is not about elections."],
    ],
    answer: "A",
    hints: ["What does an electoral commission do?"],
    explanation: "An independent commission such as **ZEC** is meant to ensure **free and fair elections**.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which piece of evidence best supports the view that democratic institutions worked in Zimbabwe in 2000?",
    options: [
      ["The government accepted defeat in the referendum", "Correct: voters rejected its draft and the result stood."],
      ["The Public Order and Security Act was passed in 2002", "This law restricted meetings, so it points the other way."],
      ["Opposition parties disputed later elections", "This points to problems, not success."],
      ["Land reform began on a large scale", "This is not evidence about democratic institutions."],
    ],
    answer: "A",
    hints: ["Look for an event where the voters' decision was respected."],
    explanation: "In February 2000 voters rejected the government-backed draft constitution, and the government **accepted the result**.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Zimbabwe adopted an executive presidency at the end of 1987.",
    answer: true,
    explanation: "True. The office of Prime Minister was abolished and the President became head of government.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Majority rule means that minorities lose all their rights once the majority has voted.",
    answer: false,
    explanation: "False. Democracy combines majority rule with the protection of minority rights.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each principle of democracy with its meaning.",
    pairs: [
      ["Rule of law", "Everyone, including leaders, is subject to the law"],
      ["Accountability", "Leaders must explain and answer for their actions"],
      ["Popular participation", "Citizens take part in decisions"],
      ["Freedom of expression", "People may criticise the government without fear"],
    ],
    explanation: "These are four core principles of democracy.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "New Constitution approved in a referendum",
      "First elections under universal adult suffrage",
      "Zimbabwe Electoral Commission established",
      "Executive presidency created",
    ],
    right: POS,
    rightIndex: [3, 0, 2, 1],
    hints: ["Independence elections came first."],
    explanation: "Elections February 1980; executive presidency 1987; ZEC 2004; new Constitution 2013.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The voting age in Zimbabwe is {{blank:a}}. In a presidential democracy the head of government is the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["18"], choices: ["18", "16", "21", "25"] },
      { id: "b", accepted: ["President"], choices: ["President", "Prime Minister", "Chief Justice", "Speaker"] },
    ],
    explanation: "Adults may vote from **18**; in a presidential system the **President** heads the government.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the type of democracy in which citizens elect people to make decisions for them.",
    accepted: ["representative democracy", "representative", "indirect democracy", "indirect"],
    wrong: ["direct democracy"],
    explanation: "**Representative** (indirect) democracy.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 5,
    stem: "State **five** principles of democracy.",
    points: [
      "Popular participation.",
      "Free and fair elections.",
      "Rule of law.",
      "Separation of powers.",
      "Accountability / freedom of expression / majority rule with minority rights / human rights.",
    ],
    modelAnswer: "Popular participation; free and fair elections; rule of law; separation of powers; accountability.",
    explanation: "One mark per principle.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Explain **three** ways in which the government of Zimbabwe has tried to promote democracy since 1980.",
    points: [
      "Identifies regular elections / universal suffrage.",
      "Explains: citizens choose their leaders (participation).",
      "Identifies independent commissions (ZEC, Human Rights Commission).",
      "Explains: run elections and protect rights impartially (free and fair elections, accountability).",
      "Identifies the 2013 Constitution / devolution / women's seats.",
      "Explains: rights and term limits / power brought closer to people / representation.",
    ],
    hints: ["Link each measure to a principle of democracy."],
    modelAnswer: "Since 1980 there have been regular elections under universal adult suffrage, so citizens choose their leaders. Independent commissions such as ZEC and the Human Rights Commission are meant to run elections fairly and hold the state to account. The 2013 Constitution added a Declaration of Rights, presidential term limits, devolution to provincial councils and seats reserved for women, which widen participation and limit power.",
    explanation: "Two marks per developed way.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** differences between parliamentary and presidential democracy.",
    points: [
      "Identifies difference in who leads (Prime Minister from parliament vs elected President).",
      "Develops with an example (Britain / Zimbabwe 1980-87 vs USA / Zimbabwe since 1987).",
      "Identifies difference in removal (no confidence vote vs fixed term/impeachment).",
      "Develops the consequence (PM depends on parliament; President more independent of legislature).",
    ],
    hints: ["Think about who leads and how they can be removed."],
    modelAnswer: "In a parliamentary democracy the government is led by a Prime Minister drawn from the majority in parliament, as in Zimbabwe from 1980 to 1987; in a presidential democracy an executive President is elected separately, as in Zimbabwe since 1987. A Prime Minister can be removed by a vote of no confidence, so depends on parliament, while a President normally serves a fixed term and is more independent of the legislature.",
    explanation: "Two marks per developed difference.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "a diary entry by a fictional first-time voter in Mutare, February 1980", "We stood in the queue from before sunrise. Old women who had never been allowed to vote were dressed in their best clothes. When I put my paper in the box I felt that the country was ours at last.")}\n\n${source("Source B", "a letter to a newspaper by a fictional opposition supporter in Harare, 2008", "We were told that every vote counts, yet our candidates could not hold rallies in many districts and some of our members were beaten. The results took weeks to appear. How can we call this a free election?")}`,
    hints: ["Think about when each source was written and by whom."],
    parts: [
      P.mcq({ label: "(a)", stem: "Which statement is supported by Source A?", options: [
        ["Many people were voting for the first time", "Correct: old women \"had never been allowed to vote\"."],
        ["Candidates could not hold rallies", "That is in Source B."],
        ["The results took weeks to appear", "That is in Source B."],
        ["Few people came out to vote at the polling station in Mutare", "The writer describes a long queue."],
      ], answer: "A", explanation: "Source A shows first-time voters in 1980." }),
      P.manual({ label: "(b)", marks: 4, stem: "How far do Sources A and B give different impressions of elections in Zimbabwe? Use details from both.", points: [
        "A: hopeful, ownership (\"the country was ours\").",
        "B: doubt that the election was free (rallies blocked, violence).",
        "A: participation (long queues); B: restrictions on participation.",
        "Explains they describe different elections (1980 and 2008), so the difference is partly time.",
      ], explanation: "Contrast with details." }),
      P.manual({ label: "(c)", marks: 7, type: "EXTENDED_RESPONSE", stem: "Using both sources and your own knowledge, how far has Zimbabwe achieved free and fair elections since 1980?", points: [
        "A shows universal suffrage and participation from 1980.",
        "Own knowledge: regular multi-party elections; 2000 referendum result accepted.",
        "Own knowledge: ZEC (2004) and 2013 Constitution's independent commissions.",
        "B shows restrictions and violence; own knowledge: disputes, 2008 violence, delayed results.",
        "Own knowledge: POSA (2002) restrictions; SADC mediation in 2008.",
        "Provenance: both are single personal views (A a first-time voter; B a partisan).",
        "Supported judgement.",
      ], levels: levels(7), modelAnswer: "Source A shows the great achievement of 1980: universal adult suffrage, with long queues of people voting for the first time. Since then Zimbabwe has held regular multi-party elections, the government accepted defeat in the 2000 referendum, and institutions such as ZEC (2004) and the 2013 Constitution's commissions were set up to run elections fairly.\n\nSource B shows the other side. In 2008 there was serious violence, results of the March election were delayed for weeks, and the opposition could not campaign freely in many areas; laws such as POSA had restricted rallies. Elections have often been disputed, and in 2008 SADC had to mediate.\n\nBoth sources are personal views: A is a hopeful first-time voter and B is an opposition supporter. Overall, Zimbabwe achieved universal suffrage and regular elections, but how free and fair its elections have been is strongly debated, especially for 2008.", explanation: "Use both sources, own knowledge and provenance." }),
    ],
    explanation: "Source-based practice question on elections (12 marks).",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true,
    stem: "Answer all parts.",
    hints: ["In (b), describe each type and give an example."],
    parts: [
      P.manual({ label: "(a)", marks: 6, stem: "Describe **three** types of democracy.", points: [
        "Direct democracy named.",
        "Described: citizens decide themselves (Athens, referendums).",
        "Representative democracy named.",
        "Described: citizens elect representatives (MPs, councillors).",
        "Parliamentary or presidential democracy named.",
        "Described: PM from parliament / separately elected executive President.",
      ], explanation: "Two marks per type." }),
      P.manual({ label: "(b)", marks: 8, type: "EXTENDED_RESPONSE", stem: "How far has the separation of powers been important in protecting democracy in Zimbabwe?", points: [
        ["Important: courts can strike down unlawful laws / Constitutional Court.", 2],
        ["Important: Parliament questions ministers and approves budgets.", 2],
        ["Limits / other factors: elections, commissions, media and civil society also matter; debate about executive dominance and judicial appointments.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(8), modelAnswer: "The separation of powers matters because it stops one arm holding all power. The courts, led by the Constitutional Court, can strike down laws and actions that break the Constitution, and Parliament can question ministers, examine policies in committees and refuse spending.\n\nBut other things also protect democracy: regular elections, independent commissions such as ZEC, a free media and civil society. Critics argue that in practice the executive has been dominant, and that changes since 2017 to how senior judges are appointed reduced judicial independence.\n\nOverall the separation of powers is an important protection, but it works only alongside other institutions and depends on how far each arm is independent in practice.", explanation: "Both sides with judgement." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("DEFINITION", "Democracy", "Government by the people, directly or through representatives chosen in free and fair elections (Greek demos = people, kratos = rule).");
  b.card("DEFINITION", "Universal adult suffrage", "The right of every adult citizen to vote; in Zimbabwe from age 18.");
  b.card("DEFINITION", "Direct democracy", "Citizens decide for themselves, e.g. in a referendum.");
  b.card("DEFINITION", "Representative democracy", "Citizens elect representatives (MPs, councillors, a president) to decide for them.");
  b.card("CONCEPT", "Parliamentary vs presidential democracy?", "Parliamentary: Prime Minister from parliament, removable by no confidence (Zimbabwe 1980-87). Presidential: separately elected executive President (Zimbabwe since 1987).");
  b.card("CONCEPT", "Name six principles of democracy.", "Participation, free and fair elections, rule of law, separation of powers, accountability, freedom of expression (also minority rights and human rights).");
  b.card("FACT", "When was the Zimbabwe Electoral Commission established?", "2004.");
  b.card("CONCEPT", "Give four ways government has promoted democracy in Zimbabwe.", "Universal suffrage and regular elections; referendums; independent commissions; devolution and reserved seats for women (and the 2013 Declaration of Rights).");
  b.card("CONCEPT", "What criticisms have been made of democracy in Zimbabwe?", "Disputed elections, violence in some campaigns (especially 2008), restrictive laws such as POSA (2002) and questions about institutional independence.");
});
