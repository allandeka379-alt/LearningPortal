// W1a: enterprise.entrepreneurs
import { concept, P, CAM, ZBE } from "../lib.mjs";
import { mc } from "../tables/w1a-lib.mjs";

concept("abus.enterprise.entrepreneurs", { file: "enterprise/entrepreneurs", keyPrefix: "enterprise.entrepreneurs" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which person is best described as an **entrepreneur**?",
    ok: ["Someone who starts a firm and bears its risk", "Correct: the entrepreneur organises resources and takes the risk of the venture."],
    bad: [["A manager who is paid a salary to run a shop", "A salaried manager does not carry the owner's risk."], ["A customer who buys goods from a business", "A customer is a buyer, not a business starter."], ["A bank clerk who processes loan forms", "A clerk is an employee in a financial firm."]],
    explanation: "An entrepreneur identifies an opportunity, organises resources and takes the risk of starting a business.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "An **intrapreneur** is an employee who",
    ok: ["develops new ideas from within a large firm", "Correct: intrapreneurs act like entrepreneurs within an organisation."],
    bad: [["leaves a firm to open a rival business", "That person becomes an entrepreneur."], ["owns shares in rival companies of the firm", "Shareholding is not intrapreneurship."], ["works part-time for several different employers", "That describes a portfolio worker, not an intrapreneur."]],
    explanation: "Intrapreneurs innovate inside an existing business, using the employer's resources.",
    applies: CAM,
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of these is a **barrier to entrepreneurship**?",
    ok: ["Difficulty in obtaining enough finance", "Correct: lack of security makes bank lending hard for new owners."],
    bad: [["Strong demand for the product", "Demand helps an entrepreneur; it is not a barrier."], ["A skilled and committed workforce", "Skilled workers help a business to succeed."], ["A wide choice of suppliers", "A wide choice of suppliers makes starting easier."]],
    explanation: "Finance, skills, regulation and market access are the usual barriers.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of the following is an example of **uncertainty** rather than risk for a bakery in Masvingo?",
    ok: ["How a customer may react to a completely new product, once launched", "Correct: the outcome and its probability cannot be known."],
    bad: [["The chance that a customer will not pay a bill, based on past experience", "Past data allow the chance of a bad debt to be estimated, so this is risk."], ["The chance that an oven will break down, based on its age", "Breakdown chances can be estimated from experience, so this is risk."], ["The chance that bread is stolen from the delivery van, from records of past thefts", "Records allow the loss to be estimated, so this is risk."]],
    explanation: "Risk can be estimated from experience; uncertainty cannot.",
    applies: CAM,
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "Tendai has twice failed to get a bank loan for his welding workshop because he has nothing to offer as security. Which barrier to entrepreneurship does this show?",
    ok: ["Lack of finance", "Correct: without security the bank will not lend."],
    bad: [["Lack of creativity", "Nothing in the case suggests he lacks ideas."], ["Excess regulation", "The problem is lending, not licences."], ["Lack of market access", "The case concerns obtaining a loan, not finding customers."]],
    hints: ["What does the bank need before it lends?"],
    explanation: "Failure to obtain a loan for lack of security is a finance barrier.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A salesperson at a tourist lodge in Victoria Falls suggests a new guided-walk package. The owner agrees, provides the funds and keeps the profit, and the salesperson receives a bonus. Which statement is correct?",
    ok: ["She is acting as an intrapreneur", "Correct: she developed a new idea inside an existing firm, which bears the risk."],
    bad: [["She is acting as an entrepreneur, because she had the idea", "An entrepreneur owns the venture and carries its risk; she does not."], ["She is acting as a franchisee", "No franchise agreement is involved."], ["She is acting as a shareholder", "No shares in the lodge are mentioned."]],
    hints: ["Who funds the idea and who keeps the profit?"],
    explanation: "She is an intrapreneur: the idea is hers but the funds, the risk and the profit belong to the owner.",
    applies: CAM,
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which statement gives the **strongest** argument that enterprise is not guaranteed to help a country develop?",
    ok: ["Many new firms fail, so the jobs created may not last", "Correct: failure rates limit the lasting benefit."],
    bad: [["Enterprise always creates large factories in every district", "Many new ventures are small; the claim is wrong."], ["Enterprise never creates any tax revenue for government", "Successful businesses do pay taxes."], ["Enterprise reduces competition in every market", "New firms normally increase competition."]],
    hints: ["Which statement is true and also weakens the case for enterprise?"],
    explanation: "High failure rates mean the jobs and output may not last, so the benefit depends on how many ventures survive.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "In Business Enterprise Skills, a person who shows initiative in spotting opportunities and turning them into income-earning activities is called a(n)",
    ok: ["enterpriser", "Correct: the enterpriser is the person; the enterprise is the activity."],
    bad: [["shareholder", "A shareholder owns part of a company but is not defined by initiative."], ["competitor", "A competitor is a rival firm."], ["regulator", "A regulator enforces rules."]],
    explanation: "BES uses enterpriser for the enterprising person and enterprise for the activity.",
    applies: ZBE,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "An entrepreneur earns profit as a reward, but may also make a loss.",
    answer: true,
    explanation: "True. Profit is the reward for enterprise and bearing risk; if the business fails the entrepreneur may lose the money invested.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "Risk and uncertainty mean exactly the same thing in business.",
    answer: false,
    explanation: "False. Risk is a situation where outcomes and their likelihood can be estimated; uncertainty is where they cannot be known.",
    hints: ["Think of whether probabilities can be estimated."],
    applies: CAM,
  });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each quality of an entrepreneur to the situation that shows it.",
    pairs: [["Resilience", "Restarting a mushroom project after the first crop fails"], ["Creativity", "Designing a new product that meets an unmet need"], ["Risk-taking", "Investing personal savings in an unproven business"], ["Leadership", "Motivating a team of workers to meet a deadline"]],
    explanation: "Each quality shows itself in a distinct behaviour.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "An {{blank:a}} starts a new business and bears the risk, while an {{blank:b}} develops new ideas inside an existing firm.",
    blanks: [
      { id: "a", accepted: ["entrepreneur"], choices: ["entrepreneur", "intrapreneur", "employee"] },
      { id: "b", accepted: ["intrapreneur"], choices: ["entrepreneur", "intrapreneur", "shareholder"] },
    ],
    explanation: "Entrepreneurs start businesses; intrapreneurs innovate inside existing ones.",
    applies: CAM,
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "State **one** quality that an entrepreneur needs.",
    accepted: ["risk-taking", "risk taking", "creativity", "determination", "resilience", "self-confidence", "leadership", "hard work", "innovation", "perseverance", "initiative"],
    explanation: "Any of risk-taking, creativity, determination, resilience, self-confidence or leadership is accepted.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "State **one** way in which enterprise helps the development of a country.",
    accepted: ["creates jobs", "job creation", "creates employment", "employment", "tax revenue", "raises output", "innovation", "more competition", "income", "increases output"],
    explanation: "Enterprise creates jobs, output, innovation, competition and tax revenue.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain **one** difference between an entrepreneur and an intrapreneur.",
    points: ["An entrepreneur starts and owns a new business; an intrapreneur works for an existing firm", "The entrepreneur bears the financial risk and keeps the profit", "The intrapreneur uses the employer's resources and normally earns a salary or bonus"],
    modelAnswer: "An entrepreneur starts and owns a new business, whereas an intrapreneur is an employee who creates something new inside an existing firm. The entrepreneur invests personal money and bears the risk and keeps the profit. The intrapreneur uses the employer's funds and is rewarded with a salary or bonus.",
    hints: ["Compare who owns the venture, who funds it and who is rewarded."],
    explanation: "One difference, developed in terms of risk and reward.",
    applies: CAM,
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Nyasha, a fictional young farmer in Chinhoyi, wants to start a bee-keeping business but has no savings. Explain **two** barriers she is likely to face.",
    points: ["Finance: banks want security she cannot provide", "Application: she may not afford hives and protective clothing", "Skills or market access: she may lack knowledge of honey processing or have no buyers", "Application: without training or a market, early production may go unsold"],
    modelAnswer: "She will find it hard to raise finance because banks want security and she has no savings, so she may not be able to buy hives. She may also lack skills and market access: if she does not know how to process or sell honey, the early harvests may go unsold.",
    hints: ["Think of finance, skills, regulation and finding customers."],
    explanation: "Two barriers, each applied to the case.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse why a district with many small, new enterprises may enjoy faster development than one with few.",
    points: ["New enterprises create jobs and incomes", "Higher incomes raise spending, which supports other local businesses", "Enterprises bring innovation and competition, which keep prices down and quality up", "Successful firms pay taxes that support public services (a limit: many fail)"],
    modelAnswer: "Enterprises create jobs, so households earn more income. They spend part of it in local shops, which supports other businesses. New firms also bring competition and ideas, improving quality and keeping prices low, and successful ones pay tax. However, many new firms fail, so the benefit depends on how many survive.",
    hints: ["Follow the chain from jobs to spending to further jobs."],
    explanation: "A chain of cause and effect with a limit.",
  });

  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "A fictional business: Thandeka sells tomatoes from a stall in Gweru. She saved for three years to buy a cold-storage unit and two market licences. Her cousin Chipo says that Thandeka's quick decisions and her willingness to keep going after a flood destroyed her first stock are the reasons she has succeeded. Local banks have refused to lend Thandeka money to open a second stall, because she cannot show accounts.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Identify **two** qualities of an entrepreneur shown by Thandeka.", points: ["Determination or resilience (continued after the flood)", "Risk-taking or initiative (invested her savings in a cold-storage unit and licences)"], modelAnswer: "Resilience, because she carried on after the flood, and risk-taking, because she invested her savings in a cold-storage unit.", explanation: "One mark for each quality, supported by the case." }),
      P.manual({ label: "(b)", marks: 3, stem: "Explain **one** barrier that Thandeka faces in expanding her business.", points: ["Finance is a barrier: banks have refused her a loan", "She cannot show accounts, so the bank cannot judge her ability to repay", "Without a loan she cannot afford a second stall, so growth is limited"], modelAnswer: "Finance is a barrier. The banks have refused to lend because she cannot show accounts, so they cannot judge whether she will repay. Without a loan she cannot afford the second stall, so her growth is limited.", explanation: "A barrier, applied, with a consequence." }),
      P.manual({ label: "(c)", marks: 4, stem: "Assess whether determination is more important than finance for the success of an entrepreneur such as Thandeka.", points: ["Determination helps an entrepreneur recover from setbacks such as the flood", "Without finance, she cannot expand, however determined she is", "Determination can lead her to find other ways, such as saving or a small trader's loan group", "Judgement with a reason: finance is needed to grow, determination to survive; both matter and which matters more depends on the stage of the business"], modelAnswer: "Determination helped Thandeka recover after the flood, so it is important for survival. But she cannot open a second stall without money, however determined she is. Determination may also help her find other sources of money. On balance, determination matters more in the early stage when survival is at stake, while finance matters more when she wants to grow.", hints: ["Compare the stage of the business with what it needs."], explanation: "Both sides and a reasoned judgement." }),
    ],
    hints: ["Quote the case in each part."],
    explanation: "Qualities from the case, a barrier applied, and a reasoned assessment.",
  });
  b.struct({
    d: 4, skill: "EVALUATION",
    stem: "A fictional business: Rudo works in the marketing section of a large furniture manufacturer in Harare. She proposes a range of flat-pack furniture for city flat-dwellers. The manufacturer's directors agree to fund a pilot of 200 units. Rudo is excited but also thinks about leaving to start her own business making flat-pack furniture.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Explain why Rudo is an intrapreneur at present.", points: ["She has developed a new idea (flat-pack furniture)", "She works inside an existing firm", "The employer provides the finance and bears the risk"], modelAnswer: "Rudo is an intrapreneur because she has created a new idea inside an existing firm, the manufacturer. The directors fund the pilot, so they carry the financial risk.", explanation: "Definition applied to the case.", applies: CAM }),
      P.manual({ label: "(b)", marks: 6, stem: "Evaluate whether Rudo should leave the firm and start her own business.", points: ["Staying: no personal financial risk, steady salary, existing market and production", "Leaving: she would keep all the profit and control the business", "Leaving: she would need finance, premises and customers and might have no security", "Her qualities (creativity, confidence) may suit entrepreneurship", "Counter-argument: she could stay until the pilot shows the demand", "Judgement and reason"], modelAnswer: "Staying gives Rudo a steady salary, the manufacturer's factory and customers, and no personal risk. Leaving would let her keep all the profit and decide everything herself, but she would need finance and customers without any guarantee. Because the pilot has not yet shown whether customers want the product, the safer choice is to stay until the pilot results are known, and to leave only if demand is strong and the firm will not share the reward.", hints: ["Compare risk and reward in the two choices, then say what it depends on."], explanation: "Both options weighed, then a judgement with a condition.", applies: CAM }),
    ],
    hints: ["Think about who carries the risk."],
    explanation: "An intrapreneur role is explained, then the choice of leaving is evaluated.",
    applies: CAM,
  });

  b.card("DEFINITION", "Entrepreneur", "A person who identifies an opportunity, organises resources and takes the risk of starting a new business.");
  b.card("DEFINITION", "Intrapreneur", "An employee who acts like an entrepreneur inside an existing organisation, using the employer's resources.", undefined, { applies: CAM });
  b.card("CONCEPT", "Risk and uncertainty", "Risk: outcomes and likelihoods can be estimated. Uncertainty: they cannot be known.", undefined, { applies: CAM });
  b.card("FACT", "Qualities of an entrepreneur", "Risk-taking, creativity, determination, self-confidence, leadership and hard work.");
  b.card("FACT", "Barriers to entrepreneurship", "Finance, skills, regulation, market access, and fear of failure.");
  b.card("FACT", "Role of enterprise in development", "Creates jobs, raises output and income, brings innovation and competition, and increases tax revenue.");
  b.card("DEFINITION", "Enterpriser (BES)", "A person who shows initiative in spotting opportunities and turning them into income-earning activities.", undefined, { applies: ZBE });
  b.card("CONCEPT", "Culture of enterprising (BES)", "A community or school that rewards initiative, accepts mistakes and encourages people to start income-earning activities.", undefined, { applies: ZBE });
  b.card("CONCEPT", "Benefits and drawbacks of enterprising", "Benefits: own income, independence and jobs. Drawbacks: uncertain income, long hours and the risk of losing savings.");
});
