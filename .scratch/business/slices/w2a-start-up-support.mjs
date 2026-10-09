// W2a: support for new enterprises (BES, CAM).
import { concept, P, money, fmt, CAM, BES } from "../lib.mjs";

concept("bus.enterprise.start-up-support", { file: "enterprise/start-up-support", keyPrefix: "enterprise.start-up-support" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **grant**?",
    options: [
      ["Money given that does not have to be repaid", "Correct: if its conditions are met."],
      ["A loan repaid with interest", "Loans must be repaid."],
      ["A share in the ownership of a company", "That is equity."],
      ["A payment made by customers in advance", "That is a deposit or prepayment."],
    ],
    answer: "A",
    explanation: "A grant is money from the government or a development organisation that need not be repaid if its conditions are met.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **business incubator**?",
    options: [
      ["A programme giving new firms cheap space and mentoring", "Correct: it nurtures start-ups."],
      ["A machine that keeps eggs warm until they hatch", "In business studies the term means a support programme."],
      ["A bank account for business savings", "That is a savings account."],
      ["A tax on new businesses", "Incubators support, not tax, new businesses."],
    ],
    answer: "A",
    explanation: "Incubators provide low-cost workspace, shared equipment, advice and mentoring for new businesses.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why do banks often refuse loans to new businesses?",
    options: [
      ["They have no trading record and little collateral", "Correct: the bank cannot judge or secure the risk."],
      ["New businesses are not allowed to borrow", "They may borrow if they satisfy the bank."],
      ["Banks lend only to the government", "Banks lend to many types of customer."],
      ["New businesses always make high profits", "Many new businesses make losses."],
    ],
    answer: "A",
    explanation: "Start-ups lack a track record and security, so lenders see them as high risk.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", applies: CAM,
    stem: "Why do governments support business start-ups?",
    options: [
      ["New businesses create jobs and future tax revenue", "Correct: start-ups help the whole economy."],
      ["Start-ups always repay grants with interest", "Grants are not repaid."],
      ["Governments want to own every new business", "Support does not mean ownership."],
      ["Start-ups reduce competition in markets", "Start-ups increase competition."],
    ],
    answer: "A",
    explanation: "Governments support start-ups for jobs, growth, innovation, competition, future tax and regional development.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", applies: BES,
    stem: "Which is a disadvantage of borrowing from family and friends to start a business?",
    options: [
      ["Relationships may suffer if the money is lost", "Correct: personal ties are at risk."],
      ["High interest rates are always charged", "Family loans are often interest-free."],
      ["Collateral is always required", "Family rarely ask for collateral."],
      ["The process takes many months", "Family finance is usually quick."],
    ],
    answer: "A",
    explanation: "Family finance is quick and cheap, but amounts are small and disputes can damage relationships.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Chipo's start-up has enough capital but she cannot keep accounts or price her products. Which support would help her most?",
    options: [
      ["A training course in bookkeeping and costing", "Correct: it targets her real problem, skills."],
      ["A larger bank loan", "She already has enough capital."],
      ["A grant for new equipment", "Equipment is not her problem."],
      ["Cheap workspace in a business incubator", "Premises are not mentioned as a problem."],
    ],
    answer: "A",
    explanation: "Support works best when matched to the business's main problem; here it is lack of skills.",
    hints: ["What does Chipo lack?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "How does a government **loan guarantee** help a start-up obtain a bank loan?",
    options: [
      ["The government promises to repay if the start-up cannot", "Correct: this replaces collateral and reduces the bank's risk."],
      ["The government pays the whole loan as a gift", "That would be a grant."],
      ["The bank is forced to lend at zero interest", "A guarantee does not set interest."],
      ["The start-up no longer has to repay", "The start-up must still repay."],
    ],
    answer: "A",
    explanation: "With a guarantee, the bank is protected from default, so it is willing to lend to a business without collateral.",
    hints: ["What worries the bank most?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A low-cost (soft) loan does not have to be repaid.",
    answer: false,
    explanation: "False. A soft loan has lower interest or easier terms, but it must still be repaid. Only grants need not be repaid.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Support for start-ups cannot guarantee success if there is no demand for the product.",
    answer: true,
    explanation: "True. Support reduces risk but cannot rescue an idea that customers do not want.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each start-up problem with the most suitable support.",
    pairs: [
      ["No collateral for a bank loan", "Government loan guarantee"],
      ["No premises and no equipment", "Business incubator"],
      ["Owner cannot draw up a business plan", "Advice from a business advisory centre"],
      ["Needs a small sum quickly, without interest", "Loan from family"],
    ],
    explanation: "Match the support to the specific problem.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentence.",
    template: "Raising small amounts of money from a large number of people, often online, is called {{blank:a}}. Money from the government that does not have to be repaid is a {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["crowdfunding", "crowd funding", "crowd-funding"] },
      { id: "b", accepted: ["grant"] },
    ],
    wrong: [["overdraft", "loan"]],
    explanation: "Crowdfunding and grants are two sources of start-up support.",
  });
  b.short({
    d: 2,
    stem: "Name the term for a newly created business in its first years of trading.",
    accepted: ["start-up", "startup", "start up", "a start-up", "new enterprise", "start-up business"],
    wrong: ["franchise", "multinational"],
    explanation: "A **start-up** is a new business in its early years.",
  });
  {
    const cost = 7200, grantPct = 40, grant = (cost * grantPct) / 100, need = cost - grant;
    b.num({
      d: 2, skill: "APPLICATION", kind: "money", value: need, calculator: true, daily: true,
      stem: `A youth enterprise scheme gives a grant of ${grantPct}% of start-up costs. Tatenda's start-up costs are ${money(cost)}. How much must he find from other sources?`,
      wrong: [grant, cost],
      explanation: `Grant = ${grantPct}% × ${fmt(cost)} = ${money(grant)}; still needed = ${fmt(cost)} − ${fmt(grant)} = ${money(need)}.`,
    });
  }
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why new enterprises need support.",
    points: [
      "Reason 1, e.g. lack of finance (1)",
      "Explained, e.g. no record or collateral, so banks refuse loans (1)",
      "Reason 2, e.g. lack of experience / no customers / high start-up costs / cash-flow problems (1)",
      "Explained, e.g. mistakes in pricing or records cause failure / costs arrive before revenue (1)",
    ],
    modelAnswer: "New enterprises lack finance, because banks will not lend to a business with no trading record or collateral. Their owners often lack experience, so they make mistakes in pricing or record keeping that can cause the business to fail.",
    explanation: "Link each reason to why the business could fail without help.",
    hints: ["What do new businesses lack?"],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 6, applies: CAM,
    stem: "Evaluate whether governments should give grants, rather than loans, to start-ups.",
    points: [
      "Grants: no repayment, so no cash-flow burden on the new business (1)",
      "Grants: encourage people who fear debt to start (1)",
      "Grants: costly to taxpayers; money not recovered if businesses fail (1)",
      "Loans: repaid and re-lent; encourage careful use of money (1)",
      "Loans: repayments may strain cash flow in early months (1)",
      "Justified conclusion (1)",
    ],
    modelAnswer: "Grants do not have to be repaid, so new businesses avoid repayments in their difficult early months, and more people are willing to start. But grants are expensive for taxpayers, and money given to businesses that fail is lost. Loans are repaid and can be lent again, and owners tend to use borrowed money more carefully, though repayments can strain cash flow. A mix is best: small grants for training and planning, and low-interest loans with repayment holidays for equipment.",
    explanation: "Compare cost to government with effect on start-ups and conclude.",
    hints: ["Who pays for grants?", "What happens to a loan when it is repaid?"],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 840, calculator: true,
    stem: "Sipho, 20, wants to start a mobile car-servicing business in Masvingo. He needs US\\$5,400 for tools and a second-hand motorbike. He has US\\$900 saved and his uncle offers US\\$1,500 interest-free. A government youth fund offers loans at a low interest rate to applicants who complete a five-day business training course.",
    parts: [
      P.num({
        label: "(a)", marks: 2, kind: "money", value: 5400 - 900 - 1500,
        stem: "Calculate how much Sipho would need to borrow from the youth fund.",
        wrong: [5400 - 900, 5400 - 1500],
        explanation: "5,400 − 900 − 1,500 = US\\$3,000.",
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Identify **three** types of support available to Sipho.",
        points: ["Own savings (1)", "Family (uncle's interest-free loan) (1)", "Government: low-interest loan and training (1)"],
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain **two** reasons why the youth fund requires training before lending.",
        points: ["Reason 1: improves business skills (1)", "Developed: lower chance of failure, so loan more likely repaid (1)", "Reason 2: helps applicants write a business plan / manage cash (1)", "Developed: money used well, fund can lend to others (1)"],
      }),
      P.manual({
        label: "(d)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "Discuss whether Sipho should accept his uncle's offer as well as the youth loan.",
        points: [
          "For: interest-free, reduces the amount borrowed at interest (1)",
          "For: quick, flexible, no collateral (1)",
          "Against: risk to family relationship if business fails (1)",
          "Against: uncle may expect a say in decisions (1)",
          "Suggests a written agreement on repayment (1)",
          "Justified conclusion (1)",
        ],
        modelAnswer: "The uncle's US\\$1,500 is interest-free, so Sipho borrows less from the fund and pays less interest, and the money is available quickly without collateral. But if the business fails, Sipho may be unable to repay, which could damage the family relationship, and his uncle may expect a say in decisions. He should accept, but agree in writing when and how the money will be repaid.",
      }),
    ],
    explanation: "Borrowing needed: 5,400 − 900 − 1,500 = US\\$3,000. Combining support sources lowers cost but each has drawbacks.",
    hints: ["Subtract all the money he already has.", "Weigh cost against family risk."],
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 720, applies: CAM,
    stem: "A government plans a programme for start-ups in a region with high unemployment. It will offer cheap workspace in incubators, free advice and loan guarantees.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "Identify **two** reasons why the government wants to support start-ups in this region.",
        points: ["Reduce unemployment / create jobs (1)", "Economic growth / regional development / future tax (1)"],
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain how **two** parts of the programme help start-ups.",
        points: ["Incubator workspace (1)", "Developed: lower start-up costs, shared equipment and mentoring (1)", "Loan guarantees / advice (1)", "Developed: banks lend without collateral / better plans and decisions (1)"],
      }),
      P.manual({
        label: "(c)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "Evaluate whether the programme is likely to succeed in creating lasting businesses.",
        points: [
          "Strength: tackles finance and premises, two main barriers (1)",
          "Strength: advice improves management, lowering failure rates (1)",
          "Limitation: cannot create demand if local incomes are low (1)",
          "Limitation: limited funds / may favour well-connected / dependency (1)",
          "Recognises dependence on business ideas and markets (1)",
          "Justified conclusion (1)",
        ],
        modelAnswer: "The programme tackles the main barriers: finance (through guarantees) and premises (through incubators), and advice should cut early mistakes. But it cannot create customers: in a region with high unemployment, local incomes are low, so start-ups may struggle to sell. Funds may be limited and could go to the best-connected applicants. It will create lasting businesses if it also helps start-ups reach markets outside the region.",
      }),
    ],
    explanation: "Governments support start-ups for jobs and growth; support works when it tackles real barriers and there is demand.",
    hints: ["Which barriers does each part remove?", "What can support not provide?"],
  });
  b.card("DEFINITION", "Start-up", "A newly created business in its first years of trading.");
  b.card("DEFINITION", "Grant", "Money given to a business that does not have to be repaid if its conditions are met.");
  b.card("DEFINITION", "Low-cost (soft) loan", "A loan with lower interest or easier terms than a normal bank loan; it must still be repaid.");
  b.card("DEFINITION", "Business incubator", "A programme giving new firms cheap workspace, shared equipment, advice and mentoring.");
  b.card("DEFINITION", "Crowdfunding", "Raising small sums from many people, often online, to finance a project.");
  b.card("CONCEPT", "Why start-ups need support", "Lack of finance, experience and customers; high start-up costs; cash-flow problems; high failure rate.");
  b.card("CONCEPT", "Why governments support start-ups", "Jobs, economic growth, competition, innovation, future tax, regional development, formalisation.", null, { applies: CAM });
  b.card("CONCEPT", "Family and friends as support", "Quick, cheap, flexible and no collateral; but small sums and risk to relationships.", null, { applies: BES });
  b.card("CONCEPT", "Making support effective", "Match support to the real problem; combine loans with training; support cannot replace demand.");
});
