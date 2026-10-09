// W2a: small to medium enterprises (COM, BES).
import { concept, P, money, fmt, round, COM } from "../lib.mjs";

concept("bus.organisation.smes", { file: "organisation/smes", keyPrefix: "organisation.smes" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is a typical feature of a small to medium enterprise (SME)?",
    options: [
      ["It is usually managed by its owner", "Correct: owners make most decisions themselves."],
      ["It has thousands of shareholders", "That describes a large public company."],
      ["It is owned by the government", "SMEs are privately owned."],
      ["It operates in many countries", "That describes a multinational."],
    ],
    answer: "A",
    explanation: "SMEs are independently owned, often owner-managed, with few employees and little capital.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which measure should **not** be used to judge whether a business is small or large?",
    options: [
      ["Profit", "Correct: a small firm can be very profitable and a large one can make a loss."],
      ["Number of employees", "This is a common measure of size."],
      ["Annual turnover", "This is a common measure of size."],
      ["Capital employed", "This is a common measure of size."],
    ],
    answer: "A",
    explanation: "Size is measured by employees, turnover (sales) or capital employed; profit does not measure size.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why do commercial banks often refuse loans to SMEs?",
    options: [
      ["They lack collateral and proper records", "Correct: banks cannot judge the risk or secure the loan."],
      ["SMEs are not allowed by law to borrow money", "SMEs may borrow if they meet the bank's conditions."],
      ["SMEs have limited liability", "Most SMEs are sole traders with unlimited liability."],
      ["Banks lend only to the government", "Banks lend to businesses and individuals."],
    ],
    answer: "A",
    explanation: "Without collateral (security) or records, banks see SMEs as too risky.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", applies: COM,
    stem: "Siyaso and Glen View Area 8 are examples of which kind of government assistance to SMEs?",
    options: [
      ["Providing workspace in SME zones", "Correct: they are areas set aside for small businesses."],
      ["Giving tax holidays to multinationals", "These sites are for small local businesses."],
      ["Buying shares on the stock exchange", "SME zones are not shareholdings."],
      ["Nationalising small businesses", "SMEs stay privately owned."],
    ],
    answer: "A",
    explanation: "The Commerce syllabus names Siyaso and Glen View Area 8 as SME special zones where small businesses can work.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a way SMEs contribute to Zimbabwe's economy?",
    options: [
      ["Creating jobs for people without formal employment", "Correct: SMEs are a major source of jobs."],
      ["Repatriating profits to foreign owners", "SMEs are local and this is not a contribution."],
      ["Reducing competition in local markets", "SMEs increase competition."],
      ["Relying only on raw materials imported from abroad", "Many SMEs use local materials."],
    ],
    answer: "A",
    explanation: "SMEs create jobs and incomes, supply local markets, use local resources and develop entrepreneurs.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A welder at a home-industry site keeps no records of sales or costs. What is the most likely result?",
    options: [
      ["He cannot tell whether the business makes a profit", "Correct: without records he cannot measure profit or plan."],
      ["He will pay much more tax", "Lack of records does not raise tax."],
      ["He will gain limited liability", "Liability depends on the form of business."],
      ["Banks will lend to him more readily than before", "Banks want records before lending."],
    ],
    answer: "A",
    explanation: "Poor record keeping hides losses, mixes personal and business money and makes it impossible to get loans.",
    hints: ["What do records tell an owner?"],
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which government measure best tackles the SME problem of **lack of collateral**?",
    options: [
      ["Loan guarantees for small businesses", "Correct: the guarantee replaces collateral for the bank."],
      ["Building new SME workshop bays in towns", "This solves lack of workspace."],
      ["Running bookkeeping courses", "This solves poor record keeping."],
      ["Holding trade fairs", "This helps with markets."],
    ],
    answer: "A",
    explanation: "A guarantee promises the bank it will be repaid even if the business fails, so it can lend without collateral.",
    hints: ["Match the help to the specific problem."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "All SMEs operate in the informal sector.",
    answer: false,
    explanation: "False. Many SMEs are registered and formal; the informal sector is one part of the SME sector.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "SMEs can respond quickly to changes in customers' wants.",
    answer: true,
    explanation: "True. With few layers of management, owners can change products quickly.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each SME challenge with the most suitable form of help.",
    pairs: [
      ["No secure place to work", "Workspace in an SME zone"],
      ["Owner cannot keep accounts", "Training in bookkeeping"],
      ["Bank asks for collateral", "Government loan guarantee"],
      ["Too few customers", "Trade fairs and market linkages"],
    ],
    explanation: "Good answers pair each challenge with a matching form of assistance.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentence.",
    template: "Business size can be measured by the number of {{blank:a}}, the value of sales (turnover) or the {{blank:b}} employed.",
    blanks: [
      { id: "a", accepted: ["employees", "workers", "staff"] },
      { id: "b", accepted: ["capital"] },
    ],
    wrong: [["profits", "money"]],
    explanation: "Employees, turnover and capital employed are measures of size; profit is not.",
  });
  b.short({
    d: 2,
    stem: "Name the cluster of small workshops, often on council land, where carpenters, welders and mechanics work side by side.",
    accepted: ["home industry", "home industries", "a home industry", "home-industry site", "home industry site", "SME zone"],
    wrong: ["factory", "warehouse"],
    explanation: "These are **home industries** (home-industry sites), important places for SMEs.",
  });
  {
    const before = 36, after = 54, pct = ((after - before) / before) * 100;
    b.num({
      d: 3, skill: "APPLICATION", kind: "pct", value: pct, calculator: true,
      stem: `After moving into a new SME zone, a group of carpenters increased the number of wardrobes they made each month from ${before} to ${after}. Calculate the percentage increase in output (to one decimal place).`,
      wrong: [round(((after - before) / after) * 100, 1), after - before],
      explanation: `Increase = ${after} − ${before} = ${after - before}; ${after - before} ÷ ${before} × 100 = ${round(pct, 1)}%.`,
      hints: ["Divide the increase by the original output.", "Multiply by 100."],
    });
  }
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** challenges faced by SMEs in Zimbabwe.",
    points: [
      "Challenge 1, e.g. lack of finance (1)",
      "Explained, e.g. no collateral or records, so banks refuse loans and they rely on expensive informal lenders (1)",
      "Challenge 2, e.g. lack of workspace / poor management / limited markets / high costs (1)",
      "Explained, e.g. working on streets risks removal and theft / no bulk discounts (1)",
    ],
    modelAnswer: "SMEs struggle to get finance because they lack collateral and records, so banks refuse loans and owners turn to expensive informal lenders. Many also lack workspace, operating on the street where they risk removal by authorities and loss of goods.",
    explanation: "State each challenge and show how it holds the business back.",
    hints: ["Think about money and premises."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "Evaluate the importance of SMEs to the Zimbabwean economy.",
    points: [
      "Jobs and self-employment where formal jobs are scarce (1)",
      "Incomes and poverty reduction (1)",
      "Goods and services close to people, in small quantities (1)",
      "Develop entrepreneurs; some grow into large firms (1)",
      "Limitation: informal SMEs pay little tax / low productivity / poor conditions (1)",
      "Justified conclusion (1)",
    ],
    modelAnswer: "SMEs provide jobs and self-employment for many people who cannot find formal work, so they support household incomes. They supply goods and services close to where people live and in affordable quantities, and they train entrepreneurs who may build larger businesses. On the other hand, many are informal, pay little tax, use simple tools and offer poor working conditions. Overall SMEs are vital to livelihoods, and their contribution would grow further if more were helped to formalise and modernise.",
    explanation: "Evaluation weighs contributions against limitations and concludes.",
    hints: ["Consider jobs, incomes, consumers and tax.", "What limits their contribution?"],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 840, calculator: true,
    stem: "Nyasha makes school uniforms at home in Bulawayo with two helpers. Sales were US\\$1,800 in January and US\\$2,700 in February, her busiest month. She keeps no records, buys cloth in small amounts from retailers and has been refused a bank loan for an industrial sewing machine.",
    parts: [
      P.num({
        label: "(a)", marks: 2, kind: "money", value: 1800 + 2700,
        stem: "Calculate her total sales for the two months.",
        wrong: [2700 - 1800, 2700],
        explanation: "1,800 + 2,700 = US\\$4,500.",
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Identify **three** features that show Nyasha's business is an SME.",
        points: ["Few employees (two helpers) (1)", "Owner-managed / works from home (1)", "Small capital / informal (no records, no bank loan) (1)"],
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain **two** problems caused by buying cloth in small amounts from retailers.",
        points: ["Higher price per metre / no bulk discount (1)", "Lower profit margin on each uniform (1)", "Frequent trips / time and transport costs (1)", "Risk of running out of cloth in busy months (1)"],
      }),
      P.manual({
        label: "(d)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "Recommend **two** forms of assistance that would most help Nyasha's business. Justify your choices.",
        points: [
          "Training in record keeping (1)",
          "Justified: shows profit, needed to apply for loans (1)",
          "Loan guarantee / SME loan scheme for the machine (1)",
          "Justified: raises output in busy months, meets demand (1)",
          "Alternative considered, e.g. joining an association to buy cloth in bulk (1)",
          "Clear justified recommendation linked to the case (1)",
        ],
        modelAnswer: "First, training in record keeping, because without records she cannot see her profit and no lender will consider her. Second, an SME loan with a government guarantee to buy the industrial machine, so she can meet the high demand in busy months like February. Joining a traders' association to buy cloth in bulk would also help, but finance and records come first because they unlock everything else.",
      }),
    ],
    explanation: "Total sales US\\$4,500. Nyasha shows typical SME features and problems: no records, small purchases, no access to bank finance.",
    hints: ["Add the two months.", "Which help solves her biggest problem?"],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 780, applies: COM,
    stem: "A city council has built an SME zone with 300 workshop bays, electricity and water. Bays rent for a fixed monthly fee. Some vendors say the zone is too far from the city centre, where their customers are.",
    parts: [
      P.tf({
        label: "(a)", marks: 1,
        stem: "Providing workspace is a form of government assistance to SMEs.",
        answer: true,
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain **two** benefits of the SME zone to the businesses that move in.",
        points: ["Benefit 1: secure premises (1)", "Developed: goods and tools safe; no removal by authorities (1)", "Benefit 2: electricity and water (1)", "Developed: can use power tools, raising output and quality (1)"],
      }),
      P.manual({
        label: "(c)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "Evaluate the council's SME zone programme.",
        points: [
          "Strength: workspace and utilities raise output (1)",
          "Strength: easier for the council to reach SMEs with licences and training (1)",
          "Limitation: distance from customers reduces sales (1)",
          "Limitation: rent may be too high for the smallest businesses / too few bays (1)",
          "Suggests improvement, e.g. transport links, signs, lower rent at first (1)",
          "Justified conclusion (1)",
        ],
        modelAnswer: "The zone gives SMEs secure premises with power and water, so they can produce more and better goods, and the council can reach them with training and licences. But it is far from customers, so traders who depend on passing trade may lose sales, and the fixed rent may be too high for the smallest businesses. The programme is useful for manufacturers such as welders and carpenters, but the council should improve transport links and offer lower rents at first.",
      }),
    ],
    explanation: "SME zones solve the workspace problem but must be affordable and accessible to work well.",
    hints: ["Which SMEs need customers walking past?"],
  });
  b.card("DEFINITION", "Small to medium enterprise (SME)", "An independently owned business that is small or medium by employees, turnover or capital employed.");
  b.card("FACT", "Measures of business size", "Number of employees, turnover (sales), capital employed. Not profit.");
  b.card("DEFINITION", "Home industry", "A cluster of small workshops, often on council land, where small manufacturers and repairers work.");
  b.card("CONCEPT", "Importance of SMEs", "Jobs, incomes, local goods and services, use of local resources, training entrepreneurs, competition.");
  b.card("CONCEPT", "Challenges of SMEs", "Lack of finance and collateral, workspace, management skills, markets; high costs; regulations.");
  b.card("CONCEPT", "Government assistance to SMEs", "SME zones, loans and guarantees, training, simpler registration, trade fairs and procurement.");
  b.card("FACT", "SME zones named in the Commerce syllabus", "Siyaso and Glen View Area 8.", null, { applies: COM });
  b.card("DEFINITION", "Collateral", "An asset offered as security for a loan, which the lender can take if the loan is not repaid.");
  b.card("CONCEPT", "Link challenge to help", "Lack of collateral → loan guarantees; no workspace → SME zones; poor records → training.");
});
