// W2b: ahist.constitution.democracy (ZIMSEC only).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.constitution.democracy", { file: "constitution/democracy", keyPrefix: "constitution.democracy" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which branch of government makes the laws of Zimbabwe?",
    options: [
      ["The legislature, which is the Parliament of Zimbabwe", "Correct: Parliament makes laws."],
      ["The executive, which is led by the President", "The executive carries out the laws."],
      ["The judiciary, which is made up of all the courts", "The courts interpret the law."],
      ["The police, who are part of the security services of the state", "The police enforce the law."],
    ],
    answer: "A",
    explanation: "Parliament, the legislature, makes laws; the executive carries them out and the judiciary interprets them.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is representative democracy?",
    options: [
      ["Citizens elect people to make laws and decisions for them", "Correct: this is the usual form in modern states."],
      ["Citizens vote on every law themselves in one large gathering", "That describes direct democracy."],
      ["A single party chooses the leaders without any vote by citizens", "That is not democratic."],
      ["Leaders are chosen at birth from a few families in the country", "That describes a hereditary system."],
    ],
    answer: "A",
    explanation: "In a representative democracy citizens elect representatives to make laws and decisions on their behalf.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "How many members does the Senate of Zimbabwe have under the 2013 Constitution?",
    options: [
      ["80", "Correct: 60 elected, 16 chiefs and 4 other members."],
      ["60", "Sixty are elected by provinces; the total is larger."],
      ["210", "This is the number of constituency seats in the National Assembly."],
      ["270", "This is the National Assembly total with the women's quota."],
    ],
    answer: "A",
    explanation: "The Senate has 80 members: six from each of ten provinces, 16 chiefs, two members for persons with disabilities, and the President and Deputy President of the National Council of Chiefs.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING", daily: true,
    stem: "Why is the separation of powers important in a democracy?",
    options: [
      ["It stops one body from holding all the power and allows each to check the others", "Correct: it spreads and limits power."],
      ["It allows the President to make laws, enforce them and judge cases at the same time", "That would concentrate power."],
      ["It makes sure that Parliament may overrule every decision of the courts at will", "That would weaken the judiciary."],
      ["It removes the need for any elections because the courts choose the leaders", "Elections choose leaders."],
    ],
    answer: "A",
    hints: ["Think about checks and balances."],
    explanation: "Dividing government into three branches prevents the concentration of power and allows checks on abuse.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What is the role of the Zimbabwe Electoral Commission (ZEC)?",
    options: [
      ["To register voters, run elections and announce the final results", "Correct: it is an independent commission."],
      ["To appoint every minister and decide how the Cabinet will vote", "The President appoints ministers."],
      ["To hear appeals against the decisions of the Constitutional Court", "The Constitutional Court is the final authority."],
      ["To write the laws that Parliament must pass each year without change", "Parliament makes laws."],
    ],
    answer: "A",
    hints: ["Its name tells you what it manages."],
    explanation: "ZEC is an independent commission that registers voters, conducts elections and announces results.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What does devolution mean?",
    options: [
      ["Sharing power and resources with provincial and local levels of government", "Correct: Chapter 14 provides for it."],
      ["Giving all power to the President and the Cabinet in the capital city", "That is centralisation."],
      ["Moving the national capital from one city to another city in the country", "That has nothing to do with devolution."],
      ["Abolishing local councils and provincial governors altogether, for ever", "Devolution strengthens local levels."],
    ],
    answer: "A",
    hints: ["Think of power moving down from the centre."],
    explanation: "Devolution transfers some powers and resources from the national government to provinces and local authorities; the Constitution sets at least 5 per cent of revenue for them.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which example shows the judiciary acting as a check on the other branches?",
    options: [
      ["The Constitutional Court declares a law to be unconstitutional and invalid", "Correct: courts can invalidate laws."],
      ["Parliament passes the budget for the coming financial year after debate", "This is a legislative function."],
      ["The President appoints a new Cabinet and Vice-Presidents after an election", "This is an executive function."],
      ["Citizens vote for their representatives in a general election", "This is the exercise of citizens' rights."],
    ],
    answer: "A",
    hints: ["Which action involves courts reviewing others' acts?"],
    explanation: "Courts can declare laws and executive acts unconstitutional, which limits both Parliament and the executive.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement about democracy in Zimbabwe in practice is best supported?",
    options: [
      ["The Constitution sets up checks and rights, but views differ on how well they work", "Correct: it gives the framework and the dispute."],
      ["All observers and parties have agreed that every election was free and fair", "Judgements have differed."],
      ["The Constitution has no provisions on elections, courts or Parliament", "It has detailed provisions."],
      ["No citizen has ever been able to take part in public hearings or petitions", "Public participation exists."],
    ],
    answer: "A",
    hints: ["Choose the statement that records both the framework and the debate."],
    explanation: "The framework is detailed, but observers, parties and the government have judged the practice differently.",
  });
  b.tf({
    d: 1, skill: "RECALL", stem: "In a direct democracy citizens vote on decisions themselves.", answer: true,
    explanation: "Referendums are an example of direct democracy.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true, stem: "Under the 2013 Constitution the President may serve only two five-year terms.", answer: true,
    explanation: "The Constitution limits the President to two terms of five years each.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING", stem: "In the separation of powers the judiciary makes the laws and Parliament interprets them.", answer: false,
    hints: ["Which branch makes the law?"],
    explanation: "Parliament makes laws and the judiciary interprets them and settles disputes.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each organ or term to its role.",
    pairs: [
      ["Executive", "Carries out the law and runs the government"],
      ["Legislature", "Makes laws and scrutinises the executive"],
      ["Judiciary", "Interprets the law and settles disputes"],
      ["ZEC", "Registers voters and conducts elections"],
    ],
    explanation: "These are the organs of government and the electoral commission.",
  });
  {
    const events = [
      "The first elections on the basis of universal adult suffrage",
      "The Global Political Agreement leads to a Government of National Unity",
      "A referendum approves the new Constitution",
      "A devolution policy is approved",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["The dates are 1980, 2009, 2013 and 2020."],
      explanation: "1980; 2009; 2013; 2020.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The National Assembly has {{blank:a}} constituency seats, and elections are managed by the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["210"], choices: ["80", "160", "210", "270"] },
      { id: "b", accepted: ["Zimbabwe Electoral Commission"], choices: ["Zimbabwe Electoral Commission", "Judicial Service Commission", "Human Rights Commission", "Media Commission"] },
    ],
    explanation: "210 constituency seats, with elections run by the Zimbabwe Electoral Commission (ZEC).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What name is given to the transfer of some powers and resources from the national government to provinces and local authorities?",
    accepted: ["devolution", "Devolution"],
    wrong: ["nationalisation"],
    explanation: "**Devolution**.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the characteristics of a democracy.",
    points: ["Regular free and fair elections with universal adult suffrage", "Competition between political parties and a free media", "The rule of law and an independent judiciary", "Protection of human rights and accountability of leaders"],
    modelAnswer: "A democracy holds regular free and fair elections in which all adults can vote. Political parties compete and the media are free, the rule of law applies with an independent judiciary, and human rights are protected and leaders are accountable.",
    explanation: "One mark for each characteristic described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain the importance of the separation of powers.",
    points: [["It prevents any one person or body from holding all the power, which reduces the risk of abuse", 2], ["Each branch can check the others, for example courts can strike down unconstitutional laws and Parliament can question ministers", 2]],
    hints: ["Give a reason about power and an example of a check."],
    modelAnswer: "Separation of powers prevents any one person or body from holding all the power, which reduces the risk of abuse. Each branch can check the others, for example the courts can strike down unconstitutional laws and Parliament can question ministers.",
    explanation: "Credit developed reasons with an example.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how devolution may improve democracy.",
    points: [["It brings decisions about services closer to the people who are affected, so they can take part and hold local leaders to account", 2], ["It shares resources more fairly between regions, with at least 5 per cent of national revenue set aside, which can reduce the feeling of exclusion", 2]],
    hints: ["Think about participation and about the sharing of resources."],
    modelAnswer: "Devolution brings decisions about local services closer to the people affected, so they can take part and hold local leaders to account. It shares resources more fairly between regions, with at least 5 per cent of national revenue set aside, which can reduce the feeling of exclusion.",
    explanation: "Credit developed reasons.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a comment by a fictional constitutional lawyer in a weekly newspaper, 2018",
        "On paper the 2013 Constitution is admirable. It limits the President to two terms, separates the powers, creates independent commissions and promises devolution. The test is whether those who hold office are willing to be bound by it, and whether the commissions are given the funds and the freedom to do their work."),
      "",
      source("Source B", "a speech by a fictional provincial councillor at a community meeting, 2019",
        "For decades decisions about our clinic and our road were made in the capital. Now the law says that a share of the national revenue belongs to the provinces. We shall hold our leaders to account for how it is spent, and we expect to see the results in our wards."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What features of the Constitution does Source A praise?", points: ["A two-term limit for the President and separation of powers", "Independent commissions and the promise of devolution"] }),
      P.manual({ label: "(b)", marks: 2, stem: "What does Source B expect from devolution?", points: ["A share of national revenue for the provinces to spend on local needs such as the clinic and road", "Local leaders held to account and results in the wards"] }),
      P.manual({ label: "(c)", marks: 4, stem: "How far do the sources agree about the working of the Constitution?", type: "EXTENDED_RESPONSE", levels: levels(4), points: [["Agree that the Constitution gives a good framework and raises expectations of accountability", 1], ["Differ in tone: A doubts whether leaders will be bound and whether commissions will be funded; B is hopeful that devolution will bring results", 1], ["Provenance: A is a lawyer's analysis for readers of a newspaper; B a councillor speaking to supporters at a local meeting", 1], ["Own knowledge: devolution and alignment of laws have been gradual, and views differ", 1]], modelAnswer: "The sources agree that the Constitution sets out a good framework and that leaders must be held to account. They differ in tone. Source A, a lawyer writing for a newspaper, doubts whether office-holders will be bound by the Constitution and whether commissions will be funded, while Source B, a councillor speaking to a local meeting, is hopeful that devolution will bring visible results. My own knowledge suggests that devolution and alignment of laws have been gradual and that views differ on the pace." }),
    ],
    hints: ["For (c), compare the doubt in A with the hope in B."],
    explanation: "Both sources are invented: a lawyer's comment and a councillor's speech.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 12, wordLimit: { min: 200, max: 450 },
    stem: "To what extent has Zimbabwe promoted democracy since 1980?",
    levels: levels(12),
    points: [
      ["Framework: universal suffrage from 1980, regular elections, the 2013 Constitution, separation of powers, independent commissions", 3],
      ["Participation: constitution-making outreach and referendum, public hearings, women's quota, devolution", 3],
      ["Criticisms: dominance of the executive, delays in aligning laws, limits on media and assembly, disputes about elections and the voters' roll; the government's response", 3],
      ["Different views and change over time", 1],
      ["Supported judgement", 2],
    ],
    hints: ["Compare the formal framework with how it works, and use different viewpoints."],
    modelAnswer: "Zimbabwe has promoted democracy in important ways, but views differ on how fully it has been achieved. Since 1980 all adults have been able to vote, elections have been held regularly, and the 2013 Constitution, approved by referendum after wide consultation, set out a separation of powers, term limits, independent commissions, a quota of seats for women and a plan for devolution. Citizens can take part through public hearings, parties and civil society. Critics say that the executive remains dominant, that laws were slow to be aligned with the Constitution, that media and assembly are restricted and that some elections were disputed over the voters' roll and violence. The government replies that it has followed the law, that the courts are open, and that devolution is being phased in. I conclude that the framework for democracy has developed considerably, but the extent to which it works in practice is contested and depends on the independence of institutions.",
    explanation: "Credit framework, participation, criticisms, different views and a supported judgement.",
  });
  b.ext({
    d: 4, skill: "ANALYSIS", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the importance of the independence of the judiciary in a democracy such as Zimbabwe.",
    levels: levels(8),
    points: [
      ["Role: interprets the Constitution, protects rights, settles disputes between citizens and the state", 2],
      ["Independence: judges are subject only to the Constitution and the law, the Judicial Service Commission", 2],
      ["Limits: pressure on courts, resources, perceptions of independence, dependence on enforcement by the executive", 2],
      ["Judgement on how important independence is", 2],
    ],
    hints: ["Link independence to the protection of rights and the limiting of power."],
    modelAnswer: "An independent judiciary is essential to democracy because it interprets the Constitution, protects rights and settles disputes between citizens and the state without fear or favour. The Constitution requires judges to be subject only to the Constitution and the law and uses the Judicial Service Commission to help protect independence. But courts can be affected by pressure, limited resources and the need for the executive to carry out their orders, and perceptions of independence vary. I conclude that independence is one of the most important safeguards of democracy, because without it the other checks on power are weak.",
    explanation: "Credit explained role, limits and a judgement.",
  });

  b.card("DEFINITION", "What is democracy?", "A system of government in which power comes from the people, who choose their leaders in free and fair elections and are protected by rights and the rule of law.");
  b.card("DEFINITION", "What is the difference between direct and representative democracy?", "Direct: citizens vote on decisions themselves; representative: citizens elect people to decide for them.");
  b.card("DEFINITION", "What is the separation of powers?", "Dividing government into executive, legislature and judiciary so that no one holds all power and each can check the others.");
  b.card("DEFINITION", "What is devolution?", "The transfer of some powers and resources from national government to provincial and local levels.");
  b.card("FACT", "How is Parliament composed under the 2013 Constitution?", "National Assembly of 210 constituency members plus a quota of 60 women (original text); Senate of 80 members.");
  b.card("FACT", "How long may a President serve under the 2013 Constitution?", "Two terms of five years each.");
  b.card("FACT", "What share of national revenue must go to provinces and local authorities?", "At least 5 per cent, under the devolution chapter of the Constitution.");
  b.card("CONCEPT", "How do the three organs of government check one another?", "Courts can strike down unconstitutional laws; Parliament scrutinises ministers; the President can refer laws back to Parliament.");
  b.card("CONCEPT", "Why do people disagree about democracy in Zimbabwe?", "The constitutional framework is strong, but observers, parties and the government judge the practice of elections, the media and the independence of institutions differently.");
});
