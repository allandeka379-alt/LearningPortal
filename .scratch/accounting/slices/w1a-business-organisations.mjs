// W1a: acc.fundamentals.business-organisations
import { concept, P, money, fmt, check, sum } from "../lib.mjs";

const row = (c) => `| ${c.join(" | ")} |`;
const table = (head, rows) => [row(head), row(head.map((_, i) => (i === 0 ? "---" : "---:"))), ...rows.map(row)].join("\n");
const ACT = ["Trading", "Manufacturing", "Service"];

concept("acc.fundamentals.business-organisations", { file: "fundamentals/business-organisations", keyPrefix: "fundamentals.business-organisations" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which business is a **service** business?",
    options: [
      ["A driving school in Gweru", "Correct: it sells lessons (skill and time), not goods."],
      ["A shop selling school uniforms", "It buys goods and resells them: a trading business."],
      ["A workshop making steel window frames", "It turns raw materials into products: manufacturing."],
      ["A wholesaler of cooking oil and sugar", "A wholesaler resells goods unchanged: trading."],
    ],
    answer: "A",
    explanation: "A service business sells skills or work. Trading businesses resell goods; manufacturers make them.",
  });

  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the main feature of a **manufacturing** business?",
    options: [
      ["It converts raw materials into finished goods", "Correct: manufacturing changes materials into new products."],
      ["It buys goods and resells them unchanged", "This describes a trading business."],
      ["It sells skills and labour rather than goods", "This describes a service business."],
      ["It is owned by shareholders with limited liability", "This describes a form of ownership, not a type of activity."],
    ],
    answer: "A",
    explanation: "Activity (trading, manufacturing, service) and form of organisation (sole trader, partnership, company) are two different questions.",
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which form of business organisation gives its owners **limited liability**?",
    options: [
      ["A limited company", "Correct: shareholders can lose only the amount paid for their shares."],
      ["A sole trader", "A sole trader has unlimited liability for the business debts."],
      ["An ordinary partnership", "Partners normally have unlimited liability."],
      ["A market vendor's business", "A vendor is a sole trader, with unlimited liability."],
    ],
    answer: "A",
    explanation: "Limited liability belongs to shareholders of a limited company, which is a separate legal person.",
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is an **advantage** of operating as a sole trader?",
    options: [
      ["The owner keeps all the profit", "Correct: no one else shares the profit."],
      ["Capital can be raised by selling shares", "Only companies can sell shares."],
      ["The owner's private assets are protected", "The opposite is true: liability is unlimited."],
      ["The business continues if the owner dies", "A sole trader's business often ends when the owner dies."],
    ],
    answer: "A",
    explanation: "Sole traders keep all the profit, make quick decisions and start easily, but face unlimited liability and limited capital.",
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a **disadvantage** of operating as a sole trader?",
    options: [
      ["Capital is limited to the owner's savings and loans", "Correct: this makes expansion difficult."],
      ["Decisions must be agreed with other owners", "A sole trader decides alone; shared decisions apply to partnerships."],
      ["Profits must be shared in an agreed ratio", "Profit sharing applies to partnerships."],
      ["Accounts must be published for the public", "Sole traders keep their affairs private."],
    ],
    answer: "A",
    explanation: "Limited capital, unlimited liability, long hours and lack of continuity are the main disadvantages.",
  });

  b.mcq({
    d: 2, skill: "RECALL",
    stem: "How many owners does an ordinary partnership normally have?",
    options: [
      ["Two to twenty", "Correct: at least two, and normally no more than twenty."],
      ["Exactly one", "One owner makes a sole trader."],
      ["Two to fifty", "Fifty is not the normal limit for a partnership."],
      ["Any number, with no upper limit", "Large numbers of owners are a feature of companies."],
    ],
    answer: "A",
    explanation: "A partnership has between two and twenty partners in normal cases. A company has shareholders, with no maximum.",
  });

  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Chipo bakes bread and buns and also sells bottled water bought from a wholesaler. How is her business best described?",
    options: [
      ["Mainly manufacturing, with some trading", "Correct: baking makes products; the water is resold unchanged."],
      ["Only a trading business", "Baking changes flour into bread, which is manufacturing."],
      ["Only a service business", "She sells goods, so it is not purely a service business."],
      ["Mainly service, with some trading", "Baking bread is not a service; it produces goods."],
    ],
    answer: "A",
    explanation: "A business can carry out more than one activity. Classify each part: making bread is manufacturing; reselling water is trading.",
    hints: ["Ask of each product: is it made or simply resold?"],
  });

  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Tatenda and Rudo plan to open a pharmacy that needs a large amount of capital. They want to protect their homes if the business fails. Which form suits them best?",
    options: [
      ["A private limited company", "Correct: shares raise capital and liability is limited."],
      ["A sole trader owned by Tatenda", "One owner means less capital and unlimited liability."],
      ["An ordinary partnership", "Partners normally have unlimited liability, so their homes are at risk."],
      ["Two separate sole traders", "Each would have limited capital and unlimited liability."],
    ],
    answer: "A",
    explanation: "Their two needs, more capital and protection of personal assets, both point to a limited company.",
    hints: ["Which form gives limited liability?"],
  });

  {
    const raised = 11240, payables = 7385, loan = 6500;
    const debts = payables + loan;
    const shortfall = debts - raised;
    check("sf", raised + shortfall, debts);
    b.calc({
      d: 3, skill: "APPLICATION", kind: "money", value: shortfall, calculator: true,
      stem: `Thandeka closes her clothing shop in Bulawayo, which she ran as a sole trader. Selling all the business assets raises ${money(raised)}. The business owes trade payables of ${money(payables)} and a bank loan of ${money(loan)}. Calculate the amount Thandeka must pay from her **personal** assets.`,
      wrong: [raised - payables, debts],
      explanation: `1. Business debts: ${fmt(payables)} + ${fmt(loan)} = ${money(debts)}.\n2. Shortfall: ${fmt(debts)} − ${fmt(raised)} = ${money(shortfall)}.\n3. With unlimited liability, Thandeka must pay ${money(shortfall)} from her own assets.\n\nForgetting the loan gives a surplus of ${money(raised - payables)}, which is wrong.`,
      hints: ["Add all the business debts first.", "The owner pays whatever the business assets cannot cover."],
    });
  }

  {
    const shares = 8000, raised = 15400, debts = 21650;
    b.num({
      d: 4, skill: "ANALYSIS", kind: "money", value: shares, calculator: true,
      stem: `Sipho paid ${money(shares)} for shares in a private limited company that runs a bus service. The company fails. Selling its assets raises ${money(raised)}, but it owes ${money(debts)}. What is the **most** Sipho can lose?`,
      wrong: [debts - raised, shares + debts - raised],
      explanation: `As a shareholder Sipho has limited liability: the most he can lose is the ${money(shares)} he paid for his shares. The company's shortfall of ${money(debts - raised)} is not his personal debt.`,
      hints: ["Is Sipho a sole trader or a shareholder?"],
    });
  }

  b.tf({
    d: 1, skill: "RECALL",
    stem: "A limited company is a separate legal person from its shareholders.",
    answer: true,
    explanation: "True. The company can own property, sue and be sued in its own name, and it continues when shareholders change.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A sole trader's private car can be sold to pay the debts of the business.",
    answer: true,
    explanation: "True. A sole trader has unlimited liability, so private possessions can be used to pay business creditors.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Because a sole trader's business is not a separate legal person, the owner's personal spending is recorded as a business expense.",
    answer: false,
    explanation: "False. The business entity idea treats the business as separate **in the accounts**. Personal spending paid from the business is drawings, not an expense.",
  });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each business with its main type of activity.",
    pairs: ["A hardware shop in Harare", "A brick-making yard in Chinhoyi", "A tailoring business that alters customers' clothes", "A wholesaler of maize meal", "A clothing factory in Bulawayo"],
    right: ACT,
    rightIndex: [0, 1, 2, 0, 1],
    explanation: "Shops and wholesalers resell goods (trading); brick-making and clothing factories make products (manufacturing); altering customers' own clothes sells a skill (service).",
  });

  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the comparison.",
    template: "A sole trader has {{blank:a}} liability, while the shareholders of a limited company have {{blank:b}} liability. In a partnership, profits are shared in the {{blank:c}} ratio.",
    blanks: [
      { id: "a", accepted: ["unlimited"], choices: ["unlimited", "limited"] },
      { id: "b", accepted: ["limited"], choices: ["unlimited", "limited"] },
      { id: "c", accepted: ["agreed"], choices: ["agreed", "capital", "equal"] },
    ],
    wrong: [["limited", "unlimited", "equal"]],
    explanation: "Sole traders (and normally partners) have unlimited liability; shareholders have limited liability. Partners share profits in the ratio in their agreement; equal shares apply only if there is no agreement.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Distinguish between a **trading** business and a **service** business.",
    points: [
      "A trading business buys goods and resells them without changing them (e.g. a grocery shop).",
      "A service business sells skills or work, not goods (e.g. a hair salon).",
    ],
    modelAnswer: "A trading business, such as a hardware shop, buys goods and resells them unchanged at a profit. A service business, such as a driving school, sells its skill and time, so it has no goods for resale.",
    explanation: "Use the same feature for both: what the business sells.",
  });

  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 4,
    stem: "Nyasha runs a successful poultry project as a sole trader in Marondera and wants to double its size. Her friend Farai offers to join her as a partner and bring in capital. Give **two** advantages and **two** disadvantages for Nyasha of forming the partnership.",
    points: [
      "Advantage: more capital is available for the expansion.",
      "Advantage: Farai brings extra skills / shares the work and decisions / continuity if one is ill.",
      "Disadvantage: profits must now be shared with Farai.",
      "Disadvantage: decisions must be agreed (possible disagreements) / liability is still unlimited, and she is liable for Farai's business decisions.",
    ],
    modelAnswer: "Farai's capital would pay for the extra poultry houses, and he can share the long hours of feeding and selling. However, Nyasha would have to share the profit with Farai, and she could no longer decide alone; both of them would still have unlimited liability for the partnership's debts.",
    explanation: "One mark for each relevant point, linked to Nyasha's project.",
    hints: ["Think about capital, work, profit and control."],
  });

  {
    const stim = table(["Feature", "Business X", "Business Y"], [
      ["Owners", "Three", "One"],
      ["Capital from", "Each owner, as agreed", "The owner's savings"],
      ["Profit", "Shared in the ratio 2 : 2 : 1", "All to the owner"],
      ["Liability", "Unlimited", "Unlimited"],
    ]);
    const profit = 46500;
    const share = (p) => (profit * p) / 5;
    check("shares", share(2) + share(2) + share(1), profit);
    b.struct({
      d: 3, skill: "APPLICATION", examStyle: true, calculator: true, secs: 660,
      stem: `Study the information about two businesses in Harare.\n\n${stim}`,
      parts: [
        P.mcq({ label: "(a)", stem: "What form of organisation is Business X?", options: [["A partnership", "Correct: three owners sharing profit in an agreed ratio with unlimited liability."], ["A sole trader", "A sole trader has one owner."], ["A limited company", "Shareholders of a company have limited liability."], ["A club or society", "Clubs do not share profits among owners."]], answer: "A", explanation: "Several owners, an agreed profit-sharing ratio and unlimited liability describe a partnership." }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: share(1), stem: `Business X made a profit of ${money(profit)} for the year. Calculate the share of the partner with the **smallest** share.`, wrong: [profit / 3, profit / 5 * 2], explanation: `The ratio has 2 + 2 + 1 = 5 parts. Smallest share = ${fmt(profit)} × 1/5 = ${money(share(1))}. Equal thirds (${money(profit / 3)}) ignore the agreed ratio.` }),
        P.manual({ label: "(c)", marks: 4, stem: "The owner of Business Y wants to open three new branches. Explain **two** problems she may face because she is a sole trader.", points: ["Limited capital: only her savings and what she can borrow…", "…so she may not afford three branches / banks may refuse a large loan.", "Unlimited liability…", "…so if the branches fail, her personal assets could be taken to pay the debts (or: she cannot manage four sites alone)."], modelAnswer: "Her capital is limited to her own savings and loans, so she may not be able to finance three branches, and a bank may see a large loan to one person as risky. She also has unlimited liability: if the new branches make losses, her home and savings could be used to pay the creditors." }),
      ],
      explanation: `Business X is a partnership; the smallest share is ${money(share(1))}. Business Y's expansion is limited by capital and risk.`,
      hints: ["Count the owners and look at liability.", "Add the parts of the ratio first."],
    });
  }

  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 720,
    stem: "Sipho has worked for five years as a mechanic. He now plans to open his own motor repair workshop in Gweru. He has savings of US\\$6,000 and will also sell spare parts to customers.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Identify the **two** types of business activity Sipho will carry out, with a reason for each.", points: ["Service: repairing vehicles sells his skill and labour.", "Trading: spare parts are bought and resold unchanged."], modelAnswer: "Repairs are a service because customers pay for his skill. Selling spare parts is trading because he buys the parts and resells them without changing them." }),
      P.tf({ label: "(b)", stem: "If Sipho starts as a sole trader, he may keep all of the workshop's profit.", answer: true, explanation: "True. A sole trader does not share profit with anyone." }),
      P.manual({ label: "(c)", marks: 6, stem: "Sipho cannot decide whether to start as a sole trader or with his brother as a partner. Discuss the choice and advise him.", points: ["Sole trader: quick decisions / keeps all profit / easy to start.", "Sole trader: only US$6,000 capital / heavy workload / unlimited liability.", "Partnership: more capital and skills from his brother.", "Partnership: profit shared / possible disagreements / still unlimited liability.", "A justified recommendation for one form.", "The recommendation is linked to Sipho's situation (capital needed for tools and parts / workload)."].map((p) => p.replace("US$", "US\\$")), modelAnswer: "As a sole trader Sipho would make all decisions and keep all the profit, and starting is cheap and simple. But US\\$6,000 may not buy the tools and the spare-parts inventory he needs, he would work alone, and he would have unlimited liability. With his brother as a partner he would have more capital and help, but he would share the profit and might disagree with his brother, and both would still have unlimited liability. I would advise a partnership, because a workshop needs costly equipment and inventory, as long as they sign a partnership agreement setting out capital and profit shares." }),
    ],
    explanation: "A good answer weighs both forms and ends with advice linked to the facts in the question.",
    hints: ["Use both sides: advantages and disadvantages of each form.", "Make a decision and say why."],
  });

  b.card("DEFINITION", "Trading business", "Buys goods and resells them unchanged (e.g. a grocery or hardware shop).");
  b.card("DEFINITION", "Manufacturing business", "Converts raw materials into finished goods for sale (e.g. a bakery, a furniture workshop).");
  b.card("DEFINITION", "Service business", "Sells skills or work, not goods (e.g. a salon, a driving school, a transport operator).");
  b.card("DEFINITION", "Unlimited liability", "The owner is personally responsible for all business debts; private assets can be sold to pay creditors.");
  b.card("DEFINITION", "Limited liability", "A shareholder can lose no more than the amount paid for the shares.");
  b.card("FACT", "Sole trader: advantages", "Easy to start; quick decisions; owner keeps all profit; personal service; privacy.");
  b.card("FACT", "Sole trader: disadvantages", "Unlimited liability; limited capital; long hours; may end if the owner dies or is ill; hard to expand.");
  b.card("FACT", "How many partners does a partnership normally have?", "Two to twenty. Profits and losses are shared in the agreed ratio (equally if there is no agreement).");
  b.card("CONCEPT", "Is a sole trader's business separate from its owner?", "Not legally, but it is in the accounts (business entity), so personal spending is drawings.");
});
