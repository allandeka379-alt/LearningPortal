// W1a: business organisations and business ethics (ZIMSEC only).
import { concept, P, chk, fmt, table } from "../lib.mjs";

const LV8 = [
  [3, 6, 8, "Two-sided, applied and developed, with a justified conclusion."],
  [2, 3, 5, "Some development of one or both sides, limited application or conclusion."],
  [1, 1, 2, "Simple, undeveloped points."],
];

concept("aecon.enterprise.business-forms-ethics", { file: "enterprise/business-forms-ethics", keyPrefix: "enterprise.business-forms-ethics" }, (b) => {
  const mc = (o, correct, wrongs) => b.mcq({ ...o, options: [correct, ...wrongs], answer: "A" });

  mc({ d: 1, skill: "RECALL", stem: "Which form of business organisation has limited liability for its owners?",
    explanation: "Shareholders in a limited company lose only what they invested; sole traders and ordinary partners are personally liable for debts." },
    ["A private limited company", "Correct."],
    [["A sole trader", "Unlimited liability."],
     ["An ordinary partnership", "Unlimited liability."],
     ["A trader working with an unregistered friend", "Informal arrangements give unlimited liability."]]);

  mc({ d: 1, skill: "RECALL", stem: "Which statement describes a sole trader?",
    explanation: "A sole trader owns and runs the business alone and takes all profits and risks." },
    ["One person owns the business and bears all its risks", "Correct."],
    [["The business is owned by shareholders who elect directors", "That describes a company."],
     ["The government owns and controls the business", "That describes a state-owned enterprise."],
     ["Members each have one vote in running the business", "That describes a cooperative."]]);

  mc({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "What is the main difference between a private limited company and a public limited company?",
    explanation: "Public companies may sell shares to the general public, usually on a stock exchange; private companies sell shares privately." },
    ["Shares of a public company can be offered to the general public", "Correct."],
    [["Only a public company has limited liability", "Both have limited liability."],
     ["Only a private company can be owned by shareholders", "Both are owned by shareholders."],
     ["A public company is owned by the government", "That describes a state-owned enterprise."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "In a cooperative, decisions are normally made on the basis of",
    explanation: "Cooperatives are democratic: each member has one vote regardless of the amount contributed." },
    ["one member, one vote", "Correct."],
    [["one share, one vote", "That is the usual rule in companies."],
     ["decisions by the largest investor", "Not a cooperative principle."],
     ["decisions by government officials", "That describes state-owned enterprises."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "Which is a disadvantage of a partnership?",
    explanation: "In an ordinary partnership each partner may be responsible for all the firm's debts, so one partner's mistake can cost another his personal property." },
    ["Partners have unlimited liability, so one partner's actions can put all at risk", "Correct."],
    [["Only one person's skills and capital are available to the business at any time", "That is a feature of a sole trader."],
     ["Profits do not have to be shared", "Profits are shared between partners."],
     ["The business continues unchanged for ever", "Partnerships may end when a partner leaves."]]);

  mc({ d: 3, skill: "APPLICATION", hints: ["Which form combines shared ownership with limited risk?"],
    stem: "A group of 40 smallholder tomato growers near Mutare want to share transport costs and get a better price from supermarkets. Which form of business organisation suits them best?",
    explanation: "A cooperative lets members pool resources and bargaining power while keeping democratic control." },
    ["A cooperative", "Correct: members jointly sell and buy."],
    [["A sole trader", "Forty growers cannot be a sole trader."],
     ["A public limited company", "Too costly and complex for small farmers."],
     ["A state-owned enterprise", "The growers want to own and control the business."]]);

  mc({ d: 3, skill: "ANALYSIS", hints: ["Compare personal property at risk."],
    stem: "A sole trader's shop fails with debts of US\\$40,000 and assets of US\\$25,000. A private limited company's business fails with the same figures. Which statement is correct?",
    explanation: "The sole trader is personally liable for the remaining US\\$15,000; the shareholders of the company lose only their investment." },
    ["The sole trader may have to pay the remaining US\\$15,000 from personal property; the shareholders may not", "Correct."],
    [["Both owners must pay the remaining US\\$15,000 out of their own personal property and savings", "Shareholders have limited liability."],
     ["Neither owner has to pay any of the remaining debt", "The sole trader has unlimited liability."],
     ["The shareholders must pay the debts but the sole trader need not", "This reverses the rules."]]);

  mc({ d: 3, skill: "EVALUATION", hints: ["Think about the costs and the long-run benefits."],
    stem: "A fictional factory discharges untreated waste into a river. Which action best shows environmental consciousness?",
    explanation: "Treating waste before release protects the river and the community, even though it raises costs." },
    ["Installing equipment to treat waste before it enters the river", "Correct."],
    [["Moving the pipe to discharge the waste downstream where fewer people live", "This shifts the problem rather than solving it."],
     ["Paying a small fine each year and continuing", "This ignores the harm."],
     ["Raising the price of its products by 10%", "A price rise does not reduce pollution."]]);

  {
    const profit = 24000, parts = [2, 1, 1], per = profit / 4, t = 2 * per;
    chk(t, 12000);
    b.num({ d: 3, skill: "APPLICATION", kind: "money", value: t, hints: ["Add the ratio parts to find one part."],
      stem: "Three partners in a fictional garage share a profit of US\\$24,000 in the ratio 2 : 1 : 1. How much does the partner with the largest share receive, in US\\$?",
      wrong: [6000, 8000],
      explanation: `1. Total parts = 2 + 1 + 1 = 4.\n2. One part = 24,000 ÷ 4 = US\\$6,000.\n3. Largest share = 2 × 6,000 = **US\\$${fmt(t)}**.\n\nUS\\$6,000 is one part, and US\\$8,000 divides the profit by 3 parts.` });
  }
  {
    const debts = 50000, assets = 32000, left = debts - assets;
    chk(left, 18000);
    b.num({ d: 2, skill: "APPLICATION", kind: "money", value: left,
      stem: "A sole trader's business closes with debts of US\\$50,000 and assets that can be sold for US\\$32,000. How much of the debt remains to be paid from the owner's personal property, in US\\$?",
      wrong: [32000, 82000],
      explanation: "50,000 − 32,000 = US\\$18,000. Because a sole trader has unlimited liability, the remaining debt can be claimed from personal property." });
  }
  {
    const shares = 5000, mine = 800, pct = (mine / shares) * 100;
    chk(pct, 16);
    b.num({ d: 2, skill: "APPLICATION", kind: "pct", value: pct, dp: 0, unit: "%", daily: true,
      stem: "A private limited company has issued 5,000 shares. Rudo holds 800 of them. What percentage of the company does she own?",
      wrong: [800 / 5000, (5000 / 800) * 100],
      explanation: "800 ÷ 5,000 × 100 = 16%. Dividing the other way gives 625%." });
  }

  b.tf({ d: 1, skill: "RECALL", stem: "A company is a separate legal person from its owners.", answer: true,
    explanation: "True. A company can own assets, sue and be sued in its own name." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Unhu/Ubuntu in business means making the highest possible profit whatever the effect on others.", answer: false,
    explanation: "False. Unhu/Ubuntu stresses respect, honesty, fairness and care for others and the community." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each form of business to the correct description.",
    pairs: [["Sole trader", "Owned by one person with unlimited liability"], ["Cooperative", "Owned by members with one vote each"], ["Public limited company", "Shares may be bought by the general public"], ["State-owned enterprise", "Owned by the government"]],
    explanation: "Four forms of business organisation." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "The owners of a limited company have {{blank:a}} liability, so they can lose only the amount they {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["limited"], choices: ["limited", "unlimited"] }, { id: "b", accepted: ["invested"], choices: ["invested", "borrowed", "earned"] }],
    wrong: [["unlimited", "earned"]],
    explanation: "Limited liability: loss is limited to the amount invested." });

  b.short({ d: 2, skill: "RECALL", stem: "Name the African philosophy of humanity that emphasises honesty, respect and care for the community in the way a business behaves.",
    accepted: ["Unhu", "Ubuntu", "Vumunhu", "Unhu/Ubuntu", "Unhu Ubuntu", "Unhu/Ubuntu/Vumunhu"], wrong: ["capitalism"],
    explanation: "Unhu (also called Ubuntu or Vumunhu)." });

  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3, stem: "Explain **one** advantage and **one** disadvantage of operating as a sole trader.",
    points: ["Advantage stated (for example the owner keeps all profit and decides alone).", "Disadvantage stated (for example unlimited liability or limited finance).", "At least one is developed in context."],
    modelAnswer: "A sole trader makes decisions quickly and keeps all the profit. However, she has unlimited liability, so her personal property could be used to pay the debts if the business fails, and she can raise only limited finance.",
    explanation: "One advantage and one disadvantage, developed." });

  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4, hints: ["Think of risk to investors and the ability to raise money."],
    stem: "Analyse **two** advantages of limited liability for the owners of a company.",
    points: ["Advantage 1: owners' personal assets are protected.", "Explained: they can lose only what they invested, so they are willing to take risks.", "Advantage 2: more people are willing to invest.", "Explained: the company can raise more finance by selling shares."],
    modelAnswer: "Limited liability protects the owners' personal property, since they can lose only what they invested, so they are willing to take business risks. It also encourages more people to buy shares, because the risk is limited, which allows the company to raise more finance.",
    explanation: "Protection and ability to raise finance." });

  b.manualShort({ d: 3, skill: "APPLICATION", marks: 4, hints: ["Costs and benefits."],
    stem: "A fictional mine in Hwange spends US\\$40,000 a year treating the water that flows into a river used by farmers. Explain **two** benefits to the mine of acting in this socially responsible way.",
    points: ["Benefit 1 identified (for example better reputation or fewer fines).", "Explained: customers and investors prefer ethical firms and the firm avoids legal disputes.", "Benefit 2 identified (for example good relations with the community).", "Explained: this makes it easier to recruit workers and to keep its licence to operate."],
    modelAnswer: "The mine's reputation improves and it avoids fines and disputes, so customers and investors are more willing to deal with it. It also builds good relations with the farmers and the community, which makes it easier to recruit workers and keep its licence to operate.",
    explanation: "Link ethics to long-term business gains." });

  // Structured 1: choose a form.
  {
    const tab = table(["Form", "Money needed to set up (US\\$)", "Liability of owners", "Number of owners"], [["Sole trader", "2,000", "Unlimited", "1"], ["Partnership", "2,000", "Unlimited", "2"], ["Private limited company", "2,800 (including registration)", "Limited", "2"]], { align: ["l", "l", "l", "l"] });
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, hints: ["Compare cost, risk and finance."],
      stem: `Two friends, Chipo and Sipho, plan a fictional furniture workshop in Bulawayo. They compare three forms of business (illustrative data).\n\n${tab}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: 800, stem: "Calculate how much more it costs to set up as a private limited company than as a partnership, in US\\$.", wrong: [2800, 400], explanation: "2,800 − 2,000 = US\\$800." }),
        P.manual({ label: "(b)", marks: 2, stem: "Explain **one** advantage of the partnership compared with Chipo working as a sole trader.",
          points: ["Two people provide more finance.", "Skills and workload are shared."],
          modelAnswer: "A partnership brings together the money and skills of both friends, so more finance is available and the workload is shared." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain why limited liability might matter to Chipo and Sipho.",
          points: ["Furniture making needs equipment and stock bought on credit, so debts are possible.", "With limited liability they would lose only their investment.", "Their personal property such as homes would be protected."],
          modelAnswer: "The workshop will buy timber and machinery, often on credit, so it could build up debts. With limited liability they would lose only what they invested and their homes and savings would be safe." }),
        P.manual({ label: "(d)", marks: 3, stem: "Recommend which form they should choose, giving a reason.",
          points: ["A recommendation made.", "A reason based on the information (cost, liability, finance).", "A consideration of what is rejected."],
          modelAnswer: "They should choose the private limited company. The extra US\\$800 is small compared with the protection it gives their homes from business debts, whereas a partnership has unlimited liability. A partnership is cheaper but riskier." }),
      ],
      explanation: "The company costs US\\$800 more but protects owners with limited liability." });
  }

  // Structured 2: ethics.
  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, hints: ["Compare short-run cost with long-run gains."],
    stem: "A fictional tobacco processor in Harare finds that it can cut costs by US\\$30,000 a year by paying its seasonal workers below the agreed rate and by burning waste in the open. A manager says: \"If we follow the rules our profit will fall by 10%, so we should not.\" The firm's annual profit is US\\$300,000.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: 30000, stem: "A 10% fall in the firm's profit would reduce profit by how many US\\$?", wrong: [3000, 270000], explanation: "10% of US\\$300,000 = US\\$30,000." }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain **one** way in which the firm's proposed actions would break the idea of Unhu/Ubuntu.",
        points: ["Underpaying workers is unfair and disrespectful.", "Burning waste harms the community and environment."],
        modelAnswer: "Paying workers less than the agreed rate is unfair and shows lack of respect for them, and burning waste in the open harms the health of neighbours and the environment, which is against care for others." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain **one** long-term risk to the firm of acting in this way.",
        points: ["Risk identified (for example fines or legal action, loss of reputation).", "Explained: customers, workers or authorities may react.", "So long-term profit may fall by more than US\\$30,000."],
        modelAnswer: "If the underpayment and open burning become known, the firm could face fines or legal action and lose its reputation, so buyers and good workers may leave, and long-term profit could fall by more than the US\\$30,000 saved." }),
      P.manual({ label: "(d)", marks: 3, stem: "Discuss whether profit should be the only objective of the firm.",
        points: ["Profit is needed for survival, investment and returns to owners.", "Businesses depend on workers, customers and the community, so ethical behaviour protects long-term profit.", "A justified judgement."],
        modelAnswer: "Profit is needed so that the firm survives and can reward its owners, but if it is the only aim the firm may harm workers and the environment and damage its reputation. Social responsibility usually protects long-term profit, so profit should be a main objective but not the only one." }),
    ],
    explanation: "US\\$30,000 is 10% of profit; unethical savings carry risks; profit is important but not the only objective." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Consider both the owners and the public."],
    stem: "Evaluate whether all large businesses should be organised as public limited companies rather than as private limited companies.",
    points: ["Public companies can raise very large sums by selling shares to the public.", "Their shares are easily bought and sold.", "They have wider credibility.", "Strict disclosure and listing rules add cost and reduce privacy.", "There is risk of takeover and loss of control for founders.", "Managers may focus on short-term profit for shareholders.", "Private companies keep control within a family or small group.", "A justified conclusion about which form suits which large business."],
    levels: LV8,
    modelAnswer: "A public limited company can raise very large sums by selling shares to the public, and its shares can be traded easily, which makes it suitable for businesses needing huge capital, such as mines or banks. It also gains credibility. However, public companies must publish detailed accounts, face high costs of listing, can be taken over and may be pushed to focus on short-term profit. A private limited company keeps control with the owners and avoids these costs, though it may find it harder to raise very large sums. Not all large businesses should become public companies: those that need massive capital probably benefit, while stable family-owned firms may prefer private ownership.",
    wordLimit: { min: 100, max: 300 },
    explanation: "Weigh capital-raising and credibility against disclosure and control." });

  b.card("DEFINITION", "Define **limited liability**.", "Owners can lose only the amount they invested; their personal property cannot be claimed to pay the company's debts.");
  b.card("DEFINITION", "Define **unlimited liability**.", "Owners are personally responsible for all the debts of the business, including with their personal property.");
  b.card("CONCEPT", "Which business forms have unlimited liability?", "Sole traders and ordinary partnerships.");
  b.card("CONCEPT", "Private limited company compared with public limited company", "Private: shares not offered to the public. Public: shares may be bought by the general public, often on a stock exchange.");
  b.card("CONCEPT", "How is a cooperative controlled?", "Democratically by its members, usually with one member, one vote.");
  b.card("CONCEPT", "What is a **state-owned enterprise**?", "A business owned by the government, often providing essential services.");
  b.card("DEFINITION", "What is **Unhu/Ubuntu/Vumunhu** in business?", "A philosophy of humanity: honesty, respect, fairness and care for the community in how a business behaves.");
  b.card("CONCEPT", "Name **four** ethical responsibilities of a business.", "Unhu/Ubuntu, accountability, social responsibility and environmental consciousness.");
});
