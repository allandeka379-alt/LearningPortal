// W2b: stakeholders.
import { concept, P } from "../lib.mjs";

concept("bus.enterprise.stakeholders", { file: "enterprise/stakeholders", keyPrefix: "enterprise.stakeholders" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a stakeholder?",
    options: [
      ["Any person or group affected by the activities of a business", "Correct: stakeholders have an interest because the business affects them."],
      ["A person who owns shares in a limited company", "That is a shareholder, which is only one type of stakeholder."],
      ["A manager who controls the day-to-day running of a business", "Managers are one stakeholder group, not the definition."],
      ["A government official who collects business taxes", "Government is one stakeholder group among many."],
    ],
    answer: "A",
    explanation: "A **stakeholder** is any person or group with an interest in a business because they are affected by what it does.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is an internal stakeholder?",
    options: [
      ["An employee", "Correct: employees work inside the business."],
      ["A supplier", "Suppliers are outside the business: external."],
      ["A customer", "Customers are external stakeholders."],
      ["A commercial bank that has lent money", "Lenders are external stakeholders."],
    ],
    answer: "A",
    explanation: "Internal stakeholders are **owners, managers and employees**. All other groups are external.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which objective is a supplier most likely to have?",
    options: [
      ["Regular orders and prompt payment", "Correct: suppliers want steady business and to be paid on time."],
      ["Low prices and good quality products", "That is what customers want."],
      ["High dividends on shares", "Dividends are what shareholders want."],
      ["Little noise and pollution", "That is a concern of the local community."],
    ],
    answer: "A",
    explanation: "Suppliers want **regular orders, fair prices and prompt payment**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which stakeholder group is mainly interested in a business paying taxes and obeying the law?",
    options: [
      ["Government", "Correct: government collects taxes and enforces laws."],
      ["Competitors", "Competitors want fair competition, not tax payments."],
      ["Employees", "Employees mainly want fair pay and job security."],
      ["Suppliers", "Suppliers mainly want orders and prompt payment."],
    ],
    answer: "A",
    explanation: "The **government** wants businesses to pay taxes, provide jobs and obey laws on safety, employment and the environment.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A mine near Zvishavane plans to expand. Which stakeholder group is most likely to object because of extra dust and heavy lorries?",
    options: [
      ["The local community", "Correct: people living nearby bear the noise, dust and traffic."],
      ["The mine's shareholders", "Shareholders expect expansion to raise profits."],
      ["The mine's managers", "Managers often gain status and pay from growth."],
      ["The mine's equipment suppliers", "Suppliers expect more orders from expansion."],
    ],
    answer: "A",
    explanation: "The **local community** suffers the external effects of the expansion, such as dust, noise and heavy traffic, though some residents may welcome new jobs.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A bakery replaces ten workers with an automated oven. Which two stakeholder groups' objectives are most clearly in conflict?",
    options: [
      ["Owners and employees", "Correct: owners gain lower costs while employees lose jobs."],
      ["Owners and managers", "Both usually support lower costs and growth."],
      ["Customers and owners", "Customers may gain from lower prices too."],
      ["Lenders and owners", "Lenders benefit if the business becomes more profitable."],
    ],
    answer: "A",
    hints: ["Who gains from lower costs, and who loses a job?"],
    explanation: "Automation lowers costs and may raise profit for **owners**, but **employees** lose their jobs: a clear conflict.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "When a business becomes more successful, which stakeholder is likely to gain at the same time as the owners?",
    options: [
      ["The government, through higher tax revenue", "Correct: higher profits and sales mean more tax collected."],
      ["Competitors, through higher market share", "A more successful business usually takes share from competitors."],
      ["Lenders, through being repaid more slowly", "Lenders want to be repaid on time, not slowly."],
      ["Customers, through having fewer products to choose from", "Fewer choices would not be a gain for customers."],
    ],
    answer: "A",
    hints: ["Stakeholder objectives do not always conflict."],
    explanation: "Many objectives **overlap**: a successful business pays more tax, keeps jobs secure and gives suppliers regular orders.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How do lenders help a business?",
    options: [
      ["They provide finance for starting or expanding the business", "Correct: banks and other lenders supply loans."],
      ["They make the day-to-day decisions on how the business is run", "That is the role of managers."],
      ["They buy most of the business's products", "That is the role of customers."],
      ["They pass the laws that businesses must obey", "That is the role of government."],
    ],
    answer: "A",
    explanation: "**Lenders** provide finance and in return want repayment with interest on time.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Every stakeholder of a company is also a shareholder.",
    answer: false,
    explanation: "False. Shareholders are one stakeholder group. Customers, employees and suppliers are stakeholders without owning shares.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Competitors are external stakeholders of a business.",
    answer: true,
    explanation: "True. Competitors are outside the business but are affected by its decisions, for example on prices.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each stakeholder group with its main objective.",
    pairs: [
      ["Customers", "Good quality products at fair prices"],
      ["Employees", "Fair wages and job security"],
      ["Owners", "Profit and growth in the value of the business"],
      ["Lenders", "Repayment of loans with interest on time"],
      ["Local community", "Jobs with little pollution or noise"],
    ],
    explanation: "Each group wants something different from the business, which is why objectives can conflict.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "Owners, managers and employees are {{blank:a}} stakeholders. Customers, suppliers and the government are {{blank:b}} stakeholders.",
    blanks: [
      { id: "a", accepted: ["internal"], choices: ["internal", "external"] },
      { id: "b", accepted: ["external"], choices: ["external", "internal"] },
    ],
    explanation: "Internal stakeholders are inside the business; all others are external.",
  });
  b.short({
    d: 2, skill: "APPLICATION",
    stem: "A furniture maker buys timber on credit from a sawmill in Mutare. Name the stakeholder group the sawmill belongs to.",
    accepted: ["supplier", "suppliers", "a supplier", "the supplier"],
    wrong: ["customer", "lender"],
    explanation: "The sawmill supplies timber, so it is a **supplier** (an external stakeholder).",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "ANALYSIS",
    stem: "A supermarket plans to open on Sundays. Explain how this decision could affect **two** different stakeholder groups.",
    points: [
      "Customers: more convenient shopping / more choice of time.",
      "Explains: may increase sales and customer loyalty.",
      "Employees: must work on Sundays / may earn extra pay.",
      "Explains: less family or rest time, possible conflict with owners / or welcome overtime.",
    ],
    hints: ["Choose one group that gains and one that may lose."],
    modelAnswer: "Customers gain because they can shop on Sundays, when many of them are free, so the supermarket may sell more. Employees may have to work on Sundays, losing rest and family time, although some may welcome the extra pay.",
    explanation: "Name each group, state the effect and explain it.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "UNDERSTANDING",
    stem: "Explain **two** ways a business can reduce conflict between its stakeholders.",
    points: [
      "Consultation / communication with stakeholders.",
      "Explains: concerns are heard and decisions are understood, reducing opposition.",
      "Compromise / phase changes / retrain workers / corporate social responsibility.",
      "Explains the second method, e.g. introducing machines gradually and retraining staff limits job losses.",
    ],
    hints: ["Think about talking to stakeholders and meeting them halfway."],
    modelAnswer: "The business can consult its stakeholders before a decision, explaining the reasons and listening to concerns, so people are less likely to oppose it. It can also compromise, for example by introducing new machines gradually and retraining workers for other jobs instead of dismissing them.",
    explanation: "Methods include prioritising, consulting, compromising and acting responsibly.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 840,
    stem: "Gumbo Poultry is a partnership near Chinhoyi that sells chickens to butcheries. The partners want to double the number of chicken houses. They will need a bank loan, more feed from their supplier and six more workers. Some neighbours have complained about the smell from the existing chicken houses.",
    parts: [
      P.short({
        label: "(a)", marks: 1,
        stem: "Name the stakeholder group that will provide the loan.",
        accepted: ["lenders", "lender", "bank", "the bank", "a bank", "commercial bank"],
        wrong: ["suppliers"],
      }),
      P.mcq({
        label: "(b)", stem: "Which stakeholder group named in the case is internal?",
        options: [["The six new workers", "Correct: employees are internal stakeholders."], ["The neighbours", "The community is external."], ["The feed supplier", "Suppliers are external."], ["The butcheries", "Customers are external."]],
        answer: "A",
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain how the expansion could benefit **two** stakeholder groups.",
        points: [
          "Feed supplier: larger, regular orders.",
          "So higher sales and income for the supplier.",
          "Local people / job seekers: six new jobs / butcheries get a more reliable supply / partners gain profit.",
          "Explains the benefit, e.g. more income spent in the local area.",
        ],
        modelAnswer: "The feed supplier gains larger, regular orders, which raise its sales. Local job seekers gain because six new jobs are created, and the wages will be spent in the area.",
      }),
      P.manual({
        label: "(d)", marks: 6,
        stem: "Discuss whether the partners should go ahead with the expansion despite the neighbours' complaints.",
        points: [
          "Benefits: more output and profit; jobs; orders for the supplier.",
          "Neighbours' concerns: smell will increase; complaints could become action by local authorities.",
          "Risk: loss of goodwill / possible fines or closure.",
          "Possible compromise: site new houses away from homes / better cleaning and waste disposal.",
          "Cost of the compromise vs benefit.",
          "Justified conclusion.",
        ],
        modelAnswer: "Expansion would raise output and profit, create six jobs and give the feed supplier more orders. However, doubling the chicken houses will make the smell worse, and if the neighbours complain to the local authority the partners could face fines or even be told to close. The partners should go ahead only with a compromise: build the new houses further from homes and improve cleaning and manure disposal. This adds cost but protects the business's right to operate, so the expansion can still be profitable.",
      }),
    ],
    hints: ["(c) Think of who gains orders, jobs or supply.", "(d) Weigh the benefits against the neighbours' power to cause problems."],
    explanation: "(a) Lenders. (b) Employees. (c) Supplier, workers, customers or owners gain. (d) A justified decision, ideally with a compromise to reduce conflict.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 960,
    stem: "The directors of a soft-drinks factory in Harare plan to cut costs by buying sugar from a cheaper foreign supplier instead of the local supplier they have used for twenty years, and by freezing employees' wages for one year. Shareholders have complained that dividends have been low for three years.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Identify **two** stakeholder groups who would lose from the directors' plan and explain why.",
        points: [
          "Local supplier.",
          "Loses a large, long-standing customer and its revenue.",
          "Employees.",
          "Real income falls with a wage freeze; morale may fall.",
        ],
        modelAnswer: "The local sugar supplier loses a customer it has had for twenty years, cutting its revenue. Employees lose because their wages are frozen while prices may rise, so their living standards and morale fall.",
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Explain why the shareholders are likely to support the plan.",
        points: [
          "Lower costs raise profit.",
          "Higher profit allows higher dividends.",
          "Dividends have been low for three years, so shareholders want a change.",
        ],
        modelAnswer: "Cheaper sugar and frozen wages cut costs, which raises profit and allows higher dividends. Shareholders have received low dividends for three years, so they welcome this.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Evaluate whether the directors should give priority to the shareholders' objectives.",
        points: [
          "Shareholders own the company and can replace directors; they provide capital.",
          "Low dividends may make it hard to raise new capital.",
          "But unhappy employees may be less productive / leave / strike.",
          "Losing a reliable local supplier risks late or poor supplies and bad publicity.",
          "Long-term success needs all stakeholders; a balance is possible (e.g. smaller wage rise, negotiate price with local supplier).",
          "Justified judgement.",
        ],
        modelAnswer: "Shareholders own the company and provide its capital, so their objectives matter, and three years of low dividends may make it harder to raise money in future. However, freezing wages may lower morale and productivity or lead staff to leave, and switching to an unknown foreign supplier risks late deliveries and bad publicity for dropping a twenty-year local partner. The directors should not give shareholders total priority. A better plan is to negotiate a lower price with the local supplier and give a small wage rise linked to productivity, which raises profit while keeping the support of employees and suppliers that long-term profit depends on.",
      }),
    ],
    hints: ["(c) Who owns the company, and who does it depend on to produce?"],
    explanation: "The plan helps shareholders but harms the local supplier and employees. Long-term profit depends on balancing stakeholder interests.",
  });
  b.card("DEFINITION", "What is a **stakeholder**?", "Any person or group with an interest in a business because they are affected by its activities.");
  b.card("FACT", "The three internal stakeholder groups?", "Owners, managers, employees.");
  b.card("FACT", "Six external stakeholder groups?", "Customers, suppliers, lenders, government, local community, competitors.");
  b.card("CONCEPT", "Stakeholder or shareholder?", "A shareholder owns shares in a company. A stakeholder is anyone affected by the business; shareholders are one type.");
  b.card("CONCEPT", "What do customers and employees want?", "Customers: quality, fair prices, good service. Employees: fair wages, safe conditions, job security, training.");
  b.card("CONCEPT", "Example of a stakeholder conflict?", "Replacing workers with machines: owners gain lower costs, employees lose jobs.");
  b.card("CONCEPT", "How can a business reduce stakeholder conflict?", "Prioritise, consult and communicate, compromise, act responsibly (CSR).");
  b.card("FACT", "What do lenders and government want?", "Lenders: repayment with interest on time. Government: taxes, jobs, legal behaviour.");
});
