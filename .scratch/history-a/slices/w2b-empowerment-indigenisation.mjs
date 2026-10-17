// W2b: ahist.empowerment.indigenisation (ZIMSEC only).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.empowerment.indigenisation", { file: "empowerment/indigenisation", keyPrefix: "empowerment.indigenisation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does indigenisation mean in the Zimbabwean context?",
    options: [
      ["Transferring ownership and control in the economy to indigenous Zimbabweans", "Correct: it aims to correct racial inequality in ownership."],
      ["Banning all foreign visitors from entering Zimbabwean mines and farms", "It is about ownership, not a ban on visitors."],
      ["Moving people from towns to resettlement schemes on former farms", "That describes land resettlement, a separate policy."],
      ["Selling all state-owned companies to foreign investors at low prices", "Indigenisation aimed at local, not foreign, ownership."],
    ],
    answer: "A",
    explanation: "Indigenisation transfers ownership, control and jobs in the economy to indigenous Zimbabweans.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "What share of ownership in larger businesses did the Indigenisation and Economic Empowerment Act target for indigenous Zimbabweans?",
    options: [
      ["At least 51 per cent of the shares", "Correct: a majority stake."],
      ["At least 10 per cent of the shares", "This is far below the target set."],
      ["Exactly 25 per cent of the shares", "This is below the target set."],
      ["All of the shares in every firm", "The target was a majority, not all."],
    ],
    answer: "A",
    explanation: "The Act and its 2010 regulations set a target of 51 per cent indigenous ownership for businesses above a value threshold.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What was the National Indigenisation and Economic Empowerment Board (NIEEB) set up to do?",
    options: [
      ["Oversee the plans and progress of the indigenisation programme", "Correct: it monitored compliance and plans."],
      ["Choose the members of the national football and cricket teams", "It had nothing to do with sport."],
      ["Run the courts that hear appeals against land acquisition", "Land courts are a separate matter."],
      ["Set the official exchange rate for the Zimbabwe dollar each month", "That is a task of the central bank."],
    ],
    answer: "A",
    explanation: "NIEEB, established under the 2007 Act and the 2010 regulations, monitored and oversaw the plans of firms to meet indigenisation targets.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING", daily: true,
    stem: "How does a community share ownership trust (CSOT) work?",
    options: [
      ["It holds company shares for a community and pays for its projects", "Correct: the community benefits through the trust."],
      ["It pays each family a fixed wage every month, whatever the company earns", "Payment depends on dividends, not a fixed wage."],
      ["It gives the mine owner the right to move people off local land for mining", "A CSOT does not remove people from land."],
      ["It sells shares in the company to foreign banks on the stock exchange", "A CSOT keeps shares for local benefit."],
    ],
    answer: "A",
    hints: ["Think of who holds the shares and who benefits."],
    explanation: "A CSOT holds shares on behalf of a community near a mine; dividends pay for projects such as clinics, schools and boreholes.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which of the following is a reason given by critics for thinking the 51 per cent rule harmed the economy?",
    options: [
      ["It created uncertainty and deterred investors", "Correct: this is the main argument made by critics."],
      ["It required every company to close for one year to change its owners", "No such requirement existed."],
      ["It made it illegal for any Zimbabwean to own a business of any size", "The rule promoted local ownership."],
      ["It ended all trade between Zimbabwe and every one of its neighbours", "Trade continued."],
    ],
    answer: "A",
    hints: ["Think about how investors react to uncertain rules."],
    explanation: "Critics argued that the rule and its uncertain application discouraged investment; supporters answered that it corrected inequality and kept benefits at home.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement best weighs the community share ownership trusts?",
    options: [
      ["They brought visible local projects, but depended on profits and honest management", "Correct: a balanced judgement."],
      ["They solved every problem of rural poverty in every district where they operated", "They could not solve all poverty."],
      ["They failed completely and never produced a single project of any kind in any district", "Some projects were funded."],
      ["They had no connection with companies or with the sharing of dividends from any mine", "They were built on company dividends."],
    ],
    answer: "A",
    hints: ["Choose the judgement with strengths and limits."],
    explanation: "CSOTs funded community projects, but their income varied with mineral prices and their management was sometimes questioned.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which comparison of the 1980s and the 2007-2010 policies is correct?",
    options: [
      ["The 1980s stressed jobs and training in the public service; 2007-2010 stressed ownership shares in firms", "Correct: the focus shifted from jobs to ownership."],
      ["The 1980s required 51 per cent ownership; 2007-2010 stressed public-service jobs only", "The 51 per cent target came with the 2007 Act."],
      ["Both periods set a 51 per cent target and created NIEEB in 1980", "NIEEB came after the 2007 Act."],
      ["Neither period had any policy of affirmative action or empowerment", "Both periods had policies."],
    ],
    answer: "A",
    hints: ["Link each period to its main method."],
    explanation: "Early policy centred on the public service and training with limited ownership change; the 2007 Act focused on shares in private firms.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which was a business model promoted to advance empowerment and local ownership?",
    options: [
      ["Cooperatives and small and medium enterprises (SMEs)", "Correct: both promoted local ownership and enterprise."],
      ["Colonial chartered companies run from London by directors", "That was a colonial model."],
      ["Contract labour compounds on mine properties", "That was a colonial labour system."],
      ["Foreign-owned plantations exporting their whole crop to Europe", "That is not an empowerment model."],
    ],
    answer: "A",
    explanation: "Cooperatives, SMEs and community or employee share schemes were presented as models of local ownership.",
  });
  b.tf({
    d: 1, skill: "RECALL", stem: "Indigenisation policies aimed to correct the racial imbalance in ownership inherited at independence.", answer: true,
    explanation: "Ownership of farms, mines and businesses had been racially unequal before 1980, and indigenisation aimed to change this.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true, stem: "Indigenisation and land reform are the same policy.", answer: false,
    explanation: "Indigenisation concerns ownership of businesses, mines and jobs; land reform concerns farmland.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING", stem: "In the 1980s the main method of empowerment was Africanisation of the public service and support for small business, not a 51 per cent ownership rule.", answer: true,
    hints: ["The 51 per cent target came later."],
    explanation: "The ownership target came with the 2007 Act; the 1980s stressed public-service jobs, training and small-business support.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term to its meaning.",
    pairs: [
      ["Affirmative action", "Measures to help groups disadvantaged in the past"],
      ["CSOT", "A trust that holds shares for a community near a mine"],
      ["ESOP", "A scheme that gives workers shares in their company"],
      ["NIEEB", "The board that oversaw indigenisation plans"],
    ],
    explanation: "These are the key terms of empowerment policy.",
  });
  {
    const events = [
      "SEDCO is established to support small enterprises",
      "The Indigenisation and Economic Empowerment Act is passed",
      "The indigenisation regulations set a US\\$500,000 threshold",
      "The law is narrowed to platinum and diamonds",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["The dates are 1983, 2007, 2010 and 2018."],
      explanation: "1983; 2007; 2010; 2018.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The 2007 Indigenisation Act set a target of {{blank:a}} per cent indigenous ownership in large businesses, overseen by the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["51"], choices: ["10", "25", "51", "75"] },
      { id: "b", accepted: ["NIEEB"], choices: ["NIEEB", "SADC Tribunal", "IMF", "ZIPO"] },
    ],
    explanation: "A target of 51 per cent, overseen by the National Indigenisation and Economic Empowerment Board (NIEEB).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What name is given to deliberate measures that help groups disadvantaged in the past, such as priority in recruitment or training?",
    accepted: ["affirmative action", "Affirmative action"],
    wrong: ["sanctions"],
    explanation: "**Affirmative action**.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the methods used to promote empowerment in the 1980s.",
    points: ["Africanisation of the public service, local councils and the security forces", "Training programmes and scholarships to supply skilled people", "Support for small business through bodies such as SEDCO", "Priority for local people in some jobs and state contracts"],
    modelAnswer: "The government replaced white officials with Africans in the public service, local councils and the security forces. It provided training and scholarships to supply skilled people, supported small business through SEDCO, and gave some priority to local people in jobs and state contracts.",
    explanation: "One mark for each method described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the government adopted the Indigenisation and Economic Empowerment Act.",
    points: [["Ownership of the economy was still largely in the hands of whites and foreign firms, so the government wished to correct historic inequality", 2], ["It was also a political response to the expectations of the people, and aimed to keep more profits in the country and build national pride", 2]],
    hints: ["Think of the past and of political and economic hopes."],
    modelAnswer: "Ownership of mines, farms and firms was still largely in the hands of whites and foreign companies, and the government wished to correct that historic inequality. It was also responding to the expectations of the people, and argued that local ownership would keep more profit in the country and build national pride.",
    explanation: "Credit developed reasons.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain one success and one difficulty of community share ownership trusts.",
    points: [["Success: a community near a mine received a stake and part of the dividends, which paid for projects such as clinics and boreholes", 2], ["Difficulty: income depended on company profits and mineral prices, and disputes arose over management and who benefited", 2]],
    hints: ["Give one point for each."],
    modelAnswer: "A success was that communities near mines received a share of the dividends, which paid for clinics, schools and boreholes. A difficulty was that this income depended on company profits and mineral prices, and there were disputes over how the funds were managed and who benefited.",
    explanation: "Credit a developed success and a developed difficulty.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a statement by a fictional official of a mining district council, 2012",
        "For the first time our district holds shares in the mine that sits on our land. When the first dividend arrives we will build a clinic where women now walk twenty kilometres. The mine will benefit too, since a district with a stake will protect it."),
      "",
      source("Source B", "a comment by a fictional economist in a business newspaper, 2013",
        "Forcing a transfer of shares to local owners without capital or a clear process does not create enterprises. It makes investors hesitate, and when they hesitate, jobs and factories do not appear. Ownership matters, but so do skills, finance and certainty."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What benefits of share ownership does Source A expect?", points: ["The district will receive dividends to build projects such as a clinic", "The mine will be protected because the district has a stake in it"] }),
      P.manual({ label: "(b)", marks: 2, stem: "What concerns about share transfers does Source B raise?", points: ["Transfers without capital or a clear process do not create enterprises / investors hesitate", "Jobs and factories do not appear; skills, finance and certainty are also needed"] }),
      P.manual({ label: "(c)", marks: 4, stem: "How far do these sources agree about the value of indigenisation?", type: "EXTENDED_RESPONSE", levels: levels(4), points: [["Disagree: A expects benefits for the community; B warns of damage to investment and jobs", 1], ["Some agreement: both accept that ownership matters, and B says so directly", 1], ["Provenance: A is from a council official with a local interest; B from an economist writing for business readers", 1], ["Own knowledge: CSOTs funded some projects, but investor uncertainty and uneven benefits were also reported", 1]], modelAnswer: "The sources disagree about the effects. Source A, from a local official, expects a clinic and protection for the mine, while Source B, from an economist writing for business readers, warns that forced transfers make investors hesitate and cost jobs. They agree that ownership matters, since B accepts this but adds skills, finance and certainty. My own knowledge supports both: CSOTs paid for some local projects, but investor uncertainty and uneven benefits were also reported." }),
    ],
    hints: ["For (c), consider who wrote each source and what each is concerned about."],
    explanation: "Both sources are invented: a council official's statement and an economist's comment.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 12, wordLimit: { min: 200, max: 450 },
    stem: "To what extent were indigenisation and empowerment policies successful in Zimbabwe between 1980 and 2018?",
    levels: levels(12),
    points: [
      ["Aims: correct racial inequality in ownership and jobs, build skills and national pride", 2],
      ["Successes: Africanisation of the public service, support for small business, community share ownership trusts and employee schemes, wider black participation", 3],
      ["Difficulties: investor uncertainty, lack of capital and skills, benefits going to a few, changes in the rules, effects on jobs", 3],
      ["Different views of supporters and critics; change over time", 2],
      ["Supported judgement", 2],
    ],
    hints: ["Compare the aims with what happened, and separate method from aim."],
    modelAnswer: "The policies were partly successful. Their aim of correcting the racial inequality in ownership inherited at independence is widely accepted. Africanisation of the public service and support for small business widened black participation in the 1980s, and later community share ownership trusts and employee schemes brought a stake and some projects to communities. But the 51 per cent rule created uncertainty for investors, local owners often lacked capital and skills, benefits went mainly to a small number, and the rules were changed several times, including in 2018. Supporters point to the correction of injustice and critics to the damage to investment and jobs. I conclude that the policies achieved some real change in who participates in the economy but failed to deliver broad and lasting benefits, so the aim was right but the method was only partly effective.",
    explanation: "Credit aims, successes, difficulties, different views and a supported judgement.",
  });
  b.ext({
    d: 4, skill: "ANALYSIS", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the importance of business models such as cooperatives, SMEs and community share ownership trusts in promoting indigenisation.",
    levels: levels(8),
    points: [
      ["Cooperatives and SMEs: low-cost ways for local people to own and run enterprises, creating jobs and income", 2],
      ["CSOTs and ESOPs: shares for communities and workers, with dividends paying for projects", 2],
      ["Limits: lack of finance, skills and markets; dependence on profits; uneven benefits", 2],
      ["Judgement on how far these models advanced indigenisation", 2],
    ],
    hints: ["Compare models of small ownership with models of shared ownership."],
    modelAnswer: "Business models were an important way of spreading ownership beyond a few large investors. Cooperatives and SMEs allowed local people to own and run enterprises at low cost and to create income and jobs, while community share ownership trusts and employee schemes gave communities and workers a stake in large companies and paid for local projects from dividends. However, many small enterprises lacked finance, skills and markets, and trust income depended on company profits and on honest management. I conclude that the models were useful, especially for widening participation, but they could not by themselves bring the deeper change in ownership that the policy sought.",
    explanation: "Credit explained models, limits and a judgement.",
  });

  b.card("DEFINITION", "What is indigenisation?", "The transfer of ownership, control and jobs in the economy to indigenous Zimbabweans, to correct the racial inequality inherited at independence.");
  b.card("DEFINITION", "What is empowerment?", "Policies that give people the skills, finance and opportunities to take full part in the economy; wider than ownership alone.");
  b.card("DEFINITION", "What is a community share ownership trust (CSOT)?", "A trust that holds shares in a company, such as a mine, for the benefit of the local community, paying for projects from the dividends.");
  b.card("FACT", "What did the Indigenisation and Economic Empowerment Act (2007) require?", "At least 51 per cent indigenous ownership in businesses above a value threshold (US\\$500,000 in the 2010 regulations), overseen by the NIEEB.");
  b.card("FACT", "Who were the 'indigenous' people under the 2007 Act?", "People disadvantaged by unfair discrimination before 18 April 1980, and their descendants.");
  b.card("FACT", "How did the 1980s approach to empowerment differ from that of 2007?", "The 1980s stressed public-service jobs, training and small-business support; 2007 focused on ownership of shares in private firms.");
  b.card("CONCEPT", "Why was the 51 per cent rule controversial?", "Supporters saw justice and local benefit; critics said it created uncertainty, deterred investors and benefited few.");
  b.card("CONCEPT", "Why is the aim of indigenisation widely accepted but its method debated?", "Most people agree that racial inequality in ownership needed correction, but disagree on whether share transfers create enterprises, skills and jobs.");
});
