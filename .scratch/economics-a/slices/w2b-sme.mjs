// W2b: small and medium enterprises (ZIMSEC only, Form 6).
import { concept, P, chk, fmt, table } from "../lib.mjs";
import { mc, LV8 } from "../tables/w2b-kit.mjs";

concept("aecon.firms.sme", { file: "firms/sme", keyPrefix: "firms.sme" }, (b) => {
  mc(b, [1, "RECALL"], "Which of these is commonly used to classify a business as small or medium?",
    ["The number of people it employs", "Correct: employees, turnover and assets are common criteria."],
    [["The age of the owner of the business", "Owner age plays no part in classification."],
     ["The number of complaints from customers", "Complaints do not measure size."],
     ["The distance of the business from the capital", "Location does not determine size."]],
    "Size criteria include employees, turnover and the value of assets; they vary from country to country.");

  mc(b, [1, "RECALL"], "An informal business is one that is",
    ["not registered or not fully recorded", "Correct: it operates outside the formal system."],
    [["always selling only illegal goods and services", "Many informal firms sell perfectly legal goods."],
     ["owned only by the government", "State ownership is unrelated."],
     ["always a multinational company", "Informal firms are typically very small."]],
    "Informal does not mean illegal: the business is unregistered or its activity is not fully recorded.");

  mc(b, [2, "UNDERSTANDING"], "Which is a reason why small firms survive alongside large ones?",
    ["They can serve niche markets that are too small for large firms", "Correct: specialised local demand suits small firms."],
    [["They always have lower unit costs than large firms in every industry", "Large firms usually enjoy economies of scale."],
     ["They never face competition from other firms", "Competition affects firms of all sizes."],
     ["They are guaranteed bank loans on easy terms", "Small firms often find it hard to borrow."]],
    "Niche markets, personal service, flexibility and low barriers help small firms survive.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "Which is a common problem for small businesses seeking a bank loan?",
    ["They have little collateral and limited records", "Correct: lenders see them as riskier."],
    [["They earn too much profit to qualify", "Profit does not disqualify a borrower."],
     ["Banks lend only to firms in the informal sector of the economy", "Banks lend mainly to formal firms."],
     ["They are never charged interest on loans", "Loans carry interest."]],
    "Little collateral and poor records make lenders reluctant, so credit is scarce and dearer.", { daily: true });

  mc(b, [3, "ANALYSIS"], "Simplifying business registration is most likely to help the economy by",
    ["encouraging informal firms to move into the formal sector", "Correct: easier rules reduce the cost of formalising."],
    [["forcing every small firm to close at once", "Simplification lowers, not raises, the barrier."],
     ["ending the need for any taxes on business", "Registration helps taxes to be collected."],
     ["preventing new firms from entering the market for many years", "It makes entry easier."]],
    "Lower registration costs encourage formalisation, which can widen the tax base and improve access to finance.", { hints: ["What does an easier rule do to the cost of registering?"] });

  mc(b, [3, "APPLICATION"], "A small firm buys its cloth in very small amounts and pays a higher price per metre than a large factory. This is an example of",
    ["a disadvantage of small scale", "Correct: lack of bulk-buying discounts raises unit costs."],
    [["an economy of scale", "Economies of scale come from large output."],
     ["a government subsidy", "Nothing in the example involves a subsidy."],
     ["a benefit of being an informal business", "Informality does not reduce input prices."]],
    "Small buyers cannot get bulk discounts, so their unit costs are higher.", { hints: ["Who gets a discount for buying in bulk?"] });

  mc(b, [4, "EVALUATION"], "A government has a limited budget to support small firms. Support is most likely to raise employment if it is aimed at",
    ["firms with a record of growth and a clear plan to expand", "Correct: these are most likely to create jobs."],
    [["every business regardless of its plans", "Untargeted help is spread thin and costly."],
     ["only firms that have recently failed", "Failed firms are unlikely to create jobs soon."],
     ["firms that have no intention of employing anyone in the next few years", "No jobs would result."]],
    "Targeting firms with growth potential gives most jobs per dollar of support.", { hints: ["Where is each dollar of support likely to create most jobs?"] });

  {
    const sh = ((520 + 1000 + 1100) / 4100) * 100;
    chk(sh, 63.902439, 1e-5);
    b.num({ d: 3, skill: "APPLICATION", kind: "pct", value: sh, dp: 1, hints: ["Add the workers in micro, small and medium firms, then divide by the total."],
      stem: "A fictional district has 520 workers in micro firms, 1,000 in small firms, 1,100 in medium firms and 1,480 in large firms. Calculate the share of all workers employed in micro, small and medium firms together, in % to one decimal place.",
      wrong: [36.1, 25.4, 63],
      explanation: "SME workers = 520 + 1,000 + 1,100 = 2,620. Total = 2,620 + 1,480 = 4,100. Share = 2,620 ÷ 4,100 × 100 = 63.9%." });
  }
  {
    const avg = 1100 / 10;
    b.num({ d: 2, skill: "APPLICATION", daily: true, kind: "plain", value: avg, unit: "workers",
      stem: "In a fictional district the 10 medium firms employ 1,100 workers in total. How many workers does the average medium firm employ?",
      wrong: [11, 1000, 120],
      explanation: "1,100 ÷ 10 = 110 workers." });
  }
  {
    const profit = 1800 - 1260, interest = (3000 * 0.24) / 12;
    chk(profit, 540, 1e-9); chk(interest, 60, 1e-9);
    b.calc({ d: 3, skill: "APPLICATION", calculator: true, kind: "pct", value: (interest / profit) * 100, dp: 1, hints: ["Monthly interest first, then divide by monthly profit."],
      stem: "A fictional hair salon in Masvingo has monthly sales of US\\$1,800 and monthly costs of US\\$1,260. The owner borrows US\\$3,000 at 24% interest a year. What percentage of monthly profit does the monthly interest represent? Give your answer to one decimal place.",
      wrong: [4.0, 33.3, 133],
      explanation: "1. Profit = 1,800 − 1,260 = US\\$540 a month.\n2. Annual interest = 0.24 × 3,000 = US\\$720, so monthly interest = US\\$60.\n3. 60 ÷ 540 × 100 = 11.1%." });
  }

  b.tf({ d: 1, skill: "RECALL", stem: "There is one international definition of a small or medium enterprise that applies in every country.", answer: false,
    explanation: "False. The criteria vary between countries and sectors, so use the definition given in the question." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A business that is informal is always breaking the law.", answer: false,
    explanation: "False. An informal business is unregistered or not fully recorded; many informal firms sell legal goods and services." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term with its meaning.",
    pairs: [["Niche market", "A small, specialised group of customers"], ["Collateral", "An asset a borrower pledges to secure a loan"], ["Formalisation", "Moving a business into the registered, tax-paying sector"], ["Sub-contracting", "Making parts or services for a larger firm"]],
    explanation: "Each term is used in the analysis of why small firms survive and the problems they face." });

  b.fib({ d: 2, skill: "RECALL", stem: "Complete the sentence.",
    template: "Small firms often find it hard to borrow because they have little {{blank:a}} and a short {{blank:b}} of keeping accounts.",
    blanks: [{ id: "a", accepted: ["collateral"], choices: ["collateral", "profit", "competition"] }, { id: "b", accepted: ["record"], choices: ["record", "monopoly", "subsidy"] }],
    explanation: "Lenders want security (collateral) and a record that shows the firm can repay." });

  b.short({ d: 2, skill: "RECALL", stem: "Name the sector of business that is not registered or fully recorded.",
    accepted: ["informal sector", "informal", "the informal sector"], wrong: ["formal sector"],
    explanation: "Businesses outside registration and tax records are in the informal sector." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "State **two** criteria that may be used to define a small or medium enterprise.",
    points: ["Number of employees.", "Annual turnover (or value of assets or capital)."],
    modelAnswer: "The number of employees and annual turnover (or the value of assets).",
    explanation: "One mark for each valid criterion." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Name each reason and explain why it helps a small firm."],
    stem: "Explain **two** reasons why small firms survive in competition with large firms.",
    points: ["Reason 1 identified (for example, personal service or a niche market).", "Reason 1 explained: customers value individual attention or the market is too small for a large firm.", "Reason 2 identified (for example, flexibility or low barriers to entry).", "Reason 2 explained: owners decide quickly and can start with little capital."],
    modelAnswer: "A small firm can serve a niche market that is too small for a large firm to bother with, such as repairing one make of phone. It is also flexible: the owner can change products and prices quickly to meet local demand, and little capital is needed to start.",
    explanation: "Two identified and explained reasons." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4, hints: ["Think of the effect on the firm, the government and workers."],
    stem: "Analyse how the formalisation of a small business could benefit the business and the economy.",
    points: ["A registered firm can open a business bank account and show records to lenders.", "This improves access to loans, so it can invest and grow.", "The firm pays tax, which raises government revenue.", "Workers gain contracts and legal protection, and the economy has more recorded activity."],
    modelAnswer: "A registered business can keep proper records and open a bank account, which makes lenders more willing to lend, so it can invest and grow. It pays tax, raising government revenue, and its workers are more likely to have contracts and legal protection. The economy then has more recorded and productive activity.",
    explanation: "Credit access to finance, growth, tax revenue and worker protection." });

  {
    const rows = [["Micro", 330, 580], ["Small", 70, 840], ["Medium", 15, 1200], ["Large", 4, 1860]];
    const tbl = table(["Size group", "Firms", "Workers"], rows);
    const avg = 840 / 70, shareMicro = (330 / 419) * 100;
    chk(avg, 12, 1e-9);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["Average = total workers ÷ number of firms.", "Add the firms in all four groups for the total."],
      stem: `**Businesses in a fictional district (illustrative data)**\n\nA survey of a fictional district records the number of firms and workers in each size group. The groups are the survey's own.\n\n${tbl}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "plain", value: avg, unit: "workers", stem: "Calculate the average number of workers in a small firm.", wrong: [8, 120, 14], explanation: "840 ÷ 70 = 12 workers." }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: shareMicro, dp: 1, stem: "Calculate the percentage of all firms that are micro firms, to one decimal place.", wrong: [13.8, 7.6, 78], explanation: "Total firms = 330 + 70 + 15 + 4 = 419. 330 ÷ 419 × 100 = 78.8%." }),
        P.mcq({ label: "(c)", marks: 1, stem: "Which statement is supported by the table?", options: [["Large firms employ more workers than micro firms", "Correct: 1,860 workers against 580."], ["Micro firms employ the most workers", "Large firms employ more."], ["There are more large firms than small firms", "There are 4 large and 70 small firms."], ["Medium firms are the most numerous", "Micro firms are the most numerous."]], answer: "A", explanation: "1,860 workers in the four large firms exceed the 580 in micro firms." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain **one** reason why many micro firms do not grow into small firms.",
          points: ["Lack of finance: little collateral and savings.", "Limited demand or marketing, so sales cannot expand.", "Owners may lack skills or prefer a small, manageable business."],
          modelAnswer: "Many micro firms find it hard to grow because they cannot borrow to invest: they have little collateral and no records. Without funds for equipment or stock, and with a small customer base, sales cannot expand, so the firm stays small." }),
      ],
      explanation: "Average 12 workers; micro firms 78.8% of firms; micro firms employ fewer workers than large firms." });
  }
  {
    const profit = 3200 - 2450, interest = (6000 * 0.15) / 12;
    chk(profit, 750, 1e-9); chk(interest, 75, 1e-9);
    b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, hints: ["Annual interest ÷ 12 gives the monthly interest.", "Think about lenders' risk."],
      stem: "**A credit scheme for small firms (illustrative data)**\n\nA fictional government is considering a scheme that guarantees part of the loans banks make to small firms. Banks say that small firms are risky because few have collateral or accounts. A welder in Kwekwe has monthly sales of US\\$3,200 and monthly costs of US\\$2,450. She wants to borrow US\\$6,000 at 15% interest a year to buy a second machine.",
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "Define a small and medium enterprise.", points: ["A business that is small or medium in size.", "Classified by criteria such as employees, turnover or assets, which vary between countries."], modelAnswer: "An SME is a business that is small or medium in size, judged by criteria such as the number of employees, turnover or assets, which differ from country to country." }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: interest, stem: "Calculate the monthly interest on the loan, in US\\$.", wrong: [900, 750, 6.25], explanation: "Annual interest = 0.15 × 6,000 = US\\$900; monthly interest = 900 ÷ 12 = US\\$75." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain why banks may be unwilling to lend to small firms without a guarantee.", points: ["Small firms have little collateral to claim if they cannot repay.", "They often lack accounts and records, so the bank cannot judge the risk.", "Failure rates are high, so the bank expects losses."], modelAnswer: "Small firms have little collateral the bank can claim if they default and often have no accounts, so the bank cannot judge the risk. Because many small firms fail, the bank expects losses and either refuses or charges high interest." }),
        P.manual({ label: "(d)", marks: 3, stem: "Analyse how the guarantee scheme could increase employment.", points: ["The guarantee reduces the bank's risk, so it lends more.", "Firms use loans to buy equipment and stock and expand output.", "Higher output needs more workers, so employment rises."], modelAnswer: "A guarantee reduces the bank's risk, so it lends more to small firms. They use loans for equipment and stock, increasing output, and to produce more they hire extra workers, raising employment." }),
        P.manual({ label: "(e)", marks: 2, stem: "State **one** limitation of the scheme.", points: ["It costs the government money if borrowers default.", "It does not solve other problems such as markets or infrastructure (or may benefit firms that would have borrowed anyway)."], modelAnswer: "The scheme costs the government money if borrowers default, and it does not solve other problems such as weak markets or poor infrastructure." }),
      ],
      explanation: "Monthly interest US$75 (10% of the welder's US$750 monthly profit); guarantees reduce lenders' risk but cost money and do not cure every problem." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Give benefits and costs.", "Judge which kinds of support are best."],
    stem: "Assess whether the government should give financial support to small and medium enterprises.",
    points: ["SMEs provide many jobs and incomes.", "Finance is their main obstacle, so support can raise investment and output.", "Support may help informal firms to formalise and pay tax.", "Competition and entrepreneurship improve.", "The scheme costs taxpayers' money and has an opportunity cost.", "Firms that would have succeeded anyway may receive help (deadweight), and some may become dependent.", "Many SMEs have low productivity and fail whatever the support.", "A justified judgement: target support at firms with growth potential and combine it with training and better infrastructure."],
    levels: LV8,
    modelAnswer: "SMEs provide jobs and incomes for many households, and because lack of finance is one of their biggest obstacles, a loan scheme could raise investment and output and help informal firms to register and pay tax. Greater enterprise also adds to competition. However, support costs taxpayers' money that could be spent elsewhere, some of it goes to firms that would have succeeded anyway, and many SMEs have low productivity and fail whatever help they receive. Overall, financial support is justified if it is targeted at firms with a plan to grow and combined with training and better infrastructure, but untargeted handouts would be wasteful.",
    wordLimit: { min: 100, max: 300 },
    explanation: "Weigh employment and enterprise gains against cost and deadweight, then judge on targeting." });

  b.card("DEFINITION", "What is a **small and medium enterprise (SME)**?", "A business that is small or medium by criteria such as employees, turnover or assets; the criteria vary by country, so use those in the question.", "ZIMSEC");
  b.card("CONCEPT", "Give **four** reasons why small firms survive.", "Niche markets, personal service, flexibility, low barriers to entry (also sub-contracting for large firms and owners' preference for independence).");
  b.card("CONCEPT", "Give **four** problems facing SMEs.", "Finance (little collateral), markets, poor infrastructure, regulation and management skills.");
  b.card("DEFINITION", "Distinguish the **formal** from the **informal** sector.", "Formal: registered, recorded and taxed. Informal: unregistered or not fully recorded; often very small and not necessarily illegal.");
  b.card("CONCEPT", "How can governments support SMEs?", "Loan guarantees and credit schemes, training and advice, workshop space and services, simpler registration and tax rules, access to public contracts.");
  b.card("CONCEPT", "Why is **collateral** important to a small firm?", "Banks lend against it; a small firm with little collateral and poor records finds loans scarce and costly.");
  b.card("CONCEPT", "What are the benefits of SMEs to society?", "Jobs and incomes, local supply, competition and innovation, training of entrepreneurs, and a route from informal to formal activity.");
  b.card("CONCEPT", "What is a disadvantage of small scale?", "Higher unit costs: small buyers get no bulk discounts and fixed costs are spread over little output.");
  b.card("CONCEPT", "How could support for SMEs be criticised?", "It costs taxpayers' money, can go to firms that would have succeeded anyway and may not create many good jobs.");
});
