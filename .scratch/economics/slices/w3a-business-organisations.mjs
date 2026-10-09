// W3a: econ.firms.business-organisations (ZIMSEC only) — sole traders, partnerships, co-operatives, limited companies,
// documents for forming a company.
import { concept, P, check, fmt } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.firms.business-organisations", { file: "firms/business-organisations", keyPrefix: "firms.business-organisations" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by **unlimited liability**?",
    options: [
      ["The owners' personal possessions can be used to pay the debts of the business", "Correct: the owners are personally liable for all business debts."],
      ["The business can borrow as much money as it wishes from banks", "Liability is about responsibility for debts, not borrowing limits."],
      ["The owners can lose only the money they themselves invested in the business", "That is limited liability."],
      ["The business is allowed to sell its shares to the general public", "That describes a public limited company."],
    ],
    answer: "A",
    explanation: "With unlimited liability the owners are personally responsible for all the debts; their houses, cars and savings can be taken.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which form of business organisation is owned by **one person**?",
    options: [
      ["Sole trader", "Correct: one owner, who may employ others."],
      ["Partnership", "A partnership has two or more owners."],
      ["Co-operative", "A co-operative is owned by its members."],
      ["Private limited company", "A company is owned by its shareholders."],
    ],
    answer: "A",
    explanation: "A sole trader has a single owner, although the business may employ several workers.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In a co-operative, how are decisions usually made by the members?",
    options: [
      ["Each member has one vote, whatever capital they put in", "Correct: democratic control is a key feature."],
      ["Each member has votes in proportion to the shares they hold", "That is how voting works in a limited company."],
      ["The member who started the co-operative makes all decisions", "Co-operatives are controlled by all members."],
      ["The government appoints a board to make all decisions", "That describes a public corporation."],
    ],
    answer: "A",
    explanation: "Co-operatives follow the principle of one member, one vote.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which document sets out a company's **internal rules**, such as the powers of directors and how meetings are run?",
    options: [
      ["The articles of association", "Correct: the internal rules of the company."],
      ["The memorandum of association", "It covers external matters: name, objects, capital, liability."],
      ["The certificate of incorporation", "It confirms that the company exists in law."],
      ["The trading certificate", "It allows a public company to start trading."],
    ],
    answer: "A",
    explanation: "The articles of association are the company's internal rules: directors, meetings, voting, dividends and share transfers.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which document gives a company its **separate legal identity**?",
    options: [
      ["The certificate of incorporation", "Correct: once issued, the company exists in law."],
      ["The articles of association", "These are the internal rules."],
      ["The partnership agreement", "Partnerships are not companies."],
      ["The memorandum of association", "It is submitted for registration but does not itself create the company."],
    ],
    answer: "A",
    explanation: "The Registrar of Companies issues the certificate of incorporation, which creates the company as a separate legal entity.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "What is the main difference between a private limited company and a public limited company?",
    options: [
      ["Only a public company can offer its shares to the general public", "Correct: a private company cannot invite the public to buy its shares."],
      ["Only a public company has limited liability for its owners", "Both have limited liability."],
      ["Only a private company is a separate legal entity", "Both are separate legal entities."],
      ["Only a private company is owned by shareholders", "Both are owned by shareholders."],
    ],
    answer: "A",
    hints: ["Both types share limited liability and incorporation. What differs?"],
    explanation: "Both types are incorporated with limited liability; the difference is that a public company may sell shares to the public (and on the stock exchange).",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why does limited liability make it easier for a company to raise capital?",
    options: [
      ["Investors know they cannot lose more than the amount they invest", "Correct: lower risk to investors encourages them to buy shares."],
      ["Limited liability means the company never has to repay loans", "Companies must repay their debts."],
      ["Limited liability guarantees that the company will make a profit", "It does not affect profitability."],
      ["Limited liability means the government provides the company's capital", "Companies raise capital from shareholders and lenders."],
    ],
    answer: "A",
    hints: ["Think about the risk to a person buying shares."],
    explanation: "Because shareholders' personal assets are safe, many people are willing to invest, so companies can raise large sums.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A group of dairy farmers in Mashonaland East want to buy feed in bulk and sell their milk together to get better prices, with each farmer having an equal say. Which form of organisation suits them best?",
    options: [
      ["A producer co-operative", "Correct: bulk buying, joint marketing and one member, one vote."],
      ["A partnership of all the farmers", "Possible, but partners would carry unlimited liability for one another."],
      ["A public limited company", "Too costly and complex; voting is by shares, not equal."],
      ["A sole trader owned by the largest farmer", "The others would have no ownership or say."],
    ],
    answer: "A",
    hints: ["Which form gives every member an equal vote?"],
    explanation: "A producer (marketing) co-operative lets farmers buy inputs in bulk, sell together and control the business democratically.",
  });

  {
    const profit = 48000, ratio = [5, 3], share = (profit * ratio[0]) / (ratio[0] + ratio[1]);
    check("share", share, 30000);
    b.num({
      d: 2, skill: "APPLICATION", kind: "money", value: share, daily: true,
      stem: `Nyasha and Farai run a fictional catering partnership. Their agreement says profit is shared in the ratio ${ratio[0]} : ${ratio[1]}. This year's profit is US\\$${fmt(profit)}. Calculate Nyasha's share.`,
      wrong: [profit / 2, (profit * ratio[1]) / 8, profit / ratio[0]],
      explanation: `1. Total parts = ${ratio[0]} + ${ratio[1]} = 8.\n2. One part = ${fmt(profit)} ÷ 8 = US\\$${fmt(profit / 8)}.\n3. Nyasha: ${ratio[0]} × ${fmt(profit / 8)} = **US\\$${fmt(share)}**.\n4. Sharing equally (US\\$${fmt(profit / 2)}) ignores the agreement; US\\$${fmt((profit * ratio[1]) / 8)} is Farai's share.`,
    });
  }
  {
    const debts = 42000, assets = 15000, shortfall = debts - assets;
    check("shortfall", shortfall, 27000);
    b.calc({
      d: 3, skill: "APPLICATION", kind: "money", value: shortfall,
      stem: `Thandeka is a fictional sole trader whose shop has closed. The business owes US\\$${fmt(debts)}, but selling all its assets raises only US\\$${fmt(assets)}. How much of the debt must she pay from her personal possessions?`,
      wrong: [debts, 0],
      hints: ["A sole trader has unlimited liability."],
      explanation: `1. Debts not covered by the business: ${fmt(debts)} − ${fmt(assets)} = **US\\$${fmt(shortfall)}**.\n2. As a sole trader she has unlimited liability, so this must come from her personal possessions (savings, car, even her house).\n3. A shareholder in a limited company would owe nothing more than the money already invested, which is why 0 is wrong here.`,
    });
  }
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A sole trader keeps all the profit of the business.",
    answer: true,
    explanation: "True. There is only one owner, so all the profit (after tax) belongs to the sole trader.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A public limited company needs a trading certificate before it can start business.",
    answer: true,
    explanation: "True. After incorporation, a public company must show that it has raised the minimum share capital before it receives a trading certificate (certificate to commence business).",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A sleeping partner takes an active part in running the partnership every day.",
    answer: false,
    explanation: "False. A sleeping (dormant) partner invests capital and shares the profit but takes no part in running the business.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each document with what it contains or does.",
    pairs: [
      ["Memorandum of association", "Name, objects, registered office, share capital and limited liability"],
      ["Articles of association", "Rules on directors, meetings, voting and dividends"],
      ["Certificate of incorporation", "Confirms the company exists as a separate legal entity"],
      ["Trading certificate", "Allows a public company to start trading"],
      ["Partnership agreement", "How partners share capital, profit and duties"],
    ],
    explanation: "The memorandum covers external matters, the articles internal rules; the certificates are issued by the Registrar.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences.",
    template: "A sole trader has {{blank:a}} liability. A shareholder in a limited company has {{blank:b}} liability. A company continues to exist when its shareholders change because it is a separate legal {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["unlimited"], choices: ["unlimited", "limited"] },
      { id: "b", accepted: ["limited"], choices: ["unlimited", "limited"] },
      { id: "c", accepted: ["entity"], choices: ["entity", "partner", "liability"] },
    ],
    explanation: "Sole traders have unlimited liability; shareholders have limited liability; incorporation gives continuity.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** disadvantages of forming a partnership rather than remaining a sole trader.",
    points: [
      "Profit must be shared among the partners.",
      "So each partner may earn less than as a sole trader / less reward for effort.",
      "Partners may disagree, slowing decisions or ending the business.",
      "Each partner is usually liable for the debts of the whole firm, including those caused by other partners (unlimited liability).",
    ],
    modelAnswer: "First, the profit has to be shared, so the former sole trader may earn less even if the business grows. Second, partners may disagree about how to run the business, which slows decisions and can break up the firm; also, with unlimited liability each partner can be made to pay debts caused by the others.",
    hints: ["Think about profit, decisions and liability."],
    explanation: "Two disadvantages, each identified and explained.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 12,
    stem: "Tatenda owns a fictional, successful furniture business in Chinhoyi as a sole trader. He wants to open a factory, which will cost US\\$60,000. He has US\\$12,000 of savings. Two friends are willing to invest, and a bank has offered a loan if he provides security.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "What is the main risk to Tatenda of borrowing the money as a sole trader?",
        options: [["He could lose his personal possessions if the factory fails", "Correct: unlimited liability."], ["He would have to share his profit with the bank", "The bank receives interest, not a share of profit."], ["The business would have to publish its accounts", "Sole traders do not publish accounts."], ["He would lose control of the business to shareholders", "A sole trader has no shareholders."]],
        answer: "A",
        explanation: "As a sole trader he has unlimited liability for the loan.",
      }),
      P.manual({ label: "(b)", marks: 3, stem: "Describe **three** features of a private limited company.", points: ["Owned by shareholders; shares cannot be offered to the public.", "Limited liability for shareholders.", "Separate legal entity with continuity; run by directors; name ends in (Pvt) Ltd."], modelAnswer: "A private limited company is owned by shareholders whose shares cannot be sold to the general public. The shareholders have limited liability. It is a separate legal entity, run by directors, which continues if shareholders change; its name ends in (Private) Limited." }),
      P.manual({ label: "(c)", marks: 4, stem: "Explain **two** advantages to Tatenda of forming a private limited company with his two friends.", points: ["Limited liability: his house and savings are protected if the factory fails.", "This makes his friends (and others) more willing to invest / he is willing to take the risk.", "More capital from selling shares to his friends, reducing the loan needed.", "Continuity: the business continues if a shareholder leaves or dies; easier to borrow from the bank."], modelAnswer: "First, he would have limited liability, so if the factory failed he could lose only what he invested, not his house; this also makes his friends more willing to invest. Second, he can raise capital by selling shares to his friends, so he needs a smaller loan; the company also continues if a shareholder leaves, which reassures lenders." }),
      P.manual({
        label: "(d)", marks: 4, levels: LV(4),
        stem: "Discuss whether Tatenda should form a private limited company or remain a sole trader.",
        points: [
          "For a company: limited liability, more capital, continuity, easier borrowing for a large project.",
          "Against: cost and paperwork of forming a company; shares profit and control with the friends; more rules.",
          "Depends on the size of the risk (US\\$48,000 still to find) and how much control he wants to keep.",
          "Justified conclusion.",
        ],
        modelAnswer: "Forming a private limited company would give him limited liability, bring in capital from his friends and make the business easier to lend to, which matters for a US\\$60,000 project when he has only US\\$12,000. However, setting up a company costs money and involves more paperwork, and he would have to share profit and decisions with his friends. Because the factory is a large and risky investment, the protection of limited liability and the extra capital outweigh these costs, so he should form a private limited company, keeping a majority of the shares to retain control.",
      }),
    ],
    explanation: "(a) Unlimited liability. (b) Shareholders, limited liability, separate legal entity. (c) Limited liability and more capital. (d) Protection and capital against cost and shared control.",
    hints: ["Compare the risk he faces in each form."],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, marks: 8,
    stem: "Twenty fictional small-scale tobacco farmers in Mashonaland West each sell their crop separately. Each farmer has little bargaining power with buyers and pays high prices for fertiliser bought in small quantities. They are thinking of forming a co-operative.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "State **two** features of a co-operative.", points: ["Owned and controlled by its members.", "One member, one vote / surplus shared among members (e.g. according to sales)."], modelAnswer: "It is owned and controlled by its members, each member has one vote, and any surplus is shared among the members." }),
      P.manual({
        label: "(b)", marks: 6, levels: LV(6),
        stem: "Discuss whether forming a co-operative would benefit the farmers.",
        points: [
          "For: bulk buying of fertiliser lowers costs per bag.",
          "For: selling together gives bargaining power / better prices; can share transport, storage and grading.",
          "For: access to credit, training and shared equipment; democratic control.",
          "Against: limited capital from members; members may lack management skills.",
          "Against: disagreements; one member one vote may slow decisions; larger farmers may feel they gain too little.",
          "Justified conclusion.",
        ],
        modelAnswer: "A co-operative would let the farmers buy fertiliser in bulk at a lower price per bag and sell their tobacco together, giving them more bargaining power with buyers and lower transport costs. They could also share equipment and get credit and training more easily, and each farmer would have an equal vote. However, the co-operative's capital would be limited to what the farmers can contribute, it may lack skilled managers, and disagreements could slow decisions; larger farmers might feel they gain too little. Overall, because each farmer is weak alone, the gains from bulk buying and joint selling are likely to outweigh these problems, provided the co-operative employs or trains a capable manager.",
      }),
    ],
    explanation: "(a) Member ownership and one member, one vote. (b) Bulk buying and bargaining power against limited capital and management problems.",
    hints: ["What can twenty farmers do together that one cannot?"],
  });

  b.card("DEFINITION", "Sole trader", "A business owned by one person, who keeps all the profit and has unlimited liability.");
  b.card("DEFINITION", "Partnership", "A business owned by two or more partners who share capital, work, decisions and profit; usually unlimited liability.");
  b.card("DEFINITION", "Co-operative", "A business owned and controlled by its members, with one vote each, for their mutual benefit; surplus shared among members.");
  b.card("DEFINITION", "Limited liability", "Shareholders can lose only the money they invested; their personal possessions are safe.");
  b.card("DEFINITION", "Unlimited liability", "The owners are personally responsible for all the debts of the business.");
  b.card("CONCEPT", "Private versus public limited company", "Both have limited liability and are separate legal entities; only a public company can sell shares to the public.");
  b.card("FACT", "Memorandum of association", "External matters: name, registered office, objects, share capital and limited liability.");
  b.card("FACT", "Articles of association", "Internal rules: directors' powers, meetings, voting, dividends and share transfers.");
  b.card("FACT", "Certificate of incorporation and trading certificate", "Incorporation creates the company in law; a trading certificate lets a public company start business.");
});
