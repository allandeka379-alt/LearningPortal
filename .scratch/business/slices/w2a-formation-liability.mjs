// W2a: corporate legal personality, limited liability, risks of forming an enterprise and company formation documents (COM, BES).
import { concept, P, money, fmt, COM, BES } from "../lib.mjs";

concept("bus.organisation.formation-liability", { file: "organisation/formation-liability", keyPrefix: "organisation.formation-liability" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which document states a company's name, registered office, objects and that its members' liability is limited?",
    options: [
      ["Memorandum of association", "Correct: it governs the company's dealings with the outside world."],
      ["Articles of association", "The articles contain internal rules such as meetings and voting."],
      ["Trading certificate", "This allows a public company to begin trading."],
      ["Partnership deed", "This is an agreement between partners, not a company document."],
    ],
    answer: "A",
    explanation: "The memorandum of association sets out the company's external constitution: name, registered office, objects, limited liability and share capital.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which document is issued by the Registrar of Companies to show that a company legally exists?",
    options: [
      ["Certificate of incorporation", "Correct: it creates the company as a legal person."],
      ["Prospectus", "A prospectus is issued by a company to invite the public to buy shares."],
      ["Articles of association", "These are prepared by the founders, not issued by the Registrar."],
      ["Memorandum of association", "This is prepared by the founders and lodged with the Registrar."],
    ],
    answer: "A",
    explanation: "Once the documents are approved, the Registrar issues a certificate of incorporation, and the company exists in law.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which item would be found in the **articles** of association?",
    options: [
      ["How directors are elected and meetings are held", "Correct: the articles are the company's internal rules."],
      ["The address of the registered office", "This is in the memorandum."],
      ["The objects of the company", "The objects are in the memorandum."],
      ["A statement that liability is limited", "This is in the memorandum."],
    ],
    answer: "A",
    explanation: "The articles cover internal matters: directors, meetings, voting, share transfers, dividends and accounts.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", applies: COM,
    stem: "What must a **public** limited company obtain, after incorporation, before it can start trading?",
    options: [
      ["A trading certificate", "Correct: issued once the minimum capital has been raised."],
      ["A partnership deed", "Companies do not use partnership deeds."],
      ["A second memorandum of association", "Only one memorandum is needed."],
      ["A dividend warrant", "A dividend warrant is used to pay dividends."],
    ],
    answer: "A",
    explanation: "A public company issues a prospectus, raises the minimum capital and then receives a trading certificate (certificate to commence business).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What does **corporate legal personality** allow a company to do?",
    options: [
      ["Own property and make contracts in its own name", "Correct: the company is a legal person separate from its owners."],
      ["Avoid paying any of the debts it runs up", "A company must pay its debts as far as its assets allow."],
      ["Ignore company law", "Companies must follow company law."],
      ["Pay no tax on its profits", "Companies pay tax on their profits."],
    ],
    answer: "A",
    explanation: "Separate legal personality means the company owns assets, signs contracts, employs workers and sues or is sued in its own name.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why might a bank ask the directors of a small private company to sign personal guarantees for a loan?",
    options: [
      ["Limited liability would otherwise protect their personal assets", "Correct: the guarantee lets the bank claim from the directors."],
      ["The company has no legal identity", "A company has separate legal identity."],
      ["Directors are required by law to own all the company's shares", "Directors need not own shares."],
      ["Private companies cannot borrow money", "They can borrow; the bank wants extra security."],
    ],
    answer: "A",
    explanation: "Because shareholders have limited liability, a lender to a small company may lose money if it fails; a personal guarantee removes that protection for that loan.",
    hints: ["Who bears the loss if a limited company cannot repay?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION", applies: BES,
    stem: "A new enterprise discovers that customers prefer a competitor's cheaper product. Which risk of forming an enterprise is this?",
    options: [
      ["Market risk", "Correct: too little demand because of competition."],
      ["Legal risk", "Legal risk concerns licences and regulations."],
      ["Operational risk", "Operational risk concerns breakdowns, theft or supply problems."],
      ["Personal risk", "Personal risk concerns the owner's stress and income."],
    ],
    answer: "A",
    explanation: "Market risk is the risk of too few customers, for example because of competition or changing tastes.",
    hints: ["Is the problem customers, machines, the law or the owner?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A private limited company must issue a prospectus before it can trade.",
    answer: false,
    explanation: "False. A private company cannot invite the public to buy shares, so it does not issue a prospectus. It can trade once it has a certificate of incorporation.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Limited liability shifts some of the risk of a company failing from its shareholders to its creditors.",
    answer: true,
    explanation: "True. Shareholders lose only their investment, so unpaid creditors bear any remaining loss.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each document with its purpose.",
    pairs: [
      ["Memorandum of association", "Sets out the company's name, objects and limited liability"],
      ["Articles of association", "Sets out the internal rules on meetings, directors and shares"],
      ["Certificate of incorporation", "Confirms the company exists as a legal person"],
      ["Prospectus", "Invites the public to buy shares"],
    ],
    explanation: "The memorandum faces outwards, the articles inwards; the Registrar issues the certificate; a public company issues a prospectus.",
  });
  b.fib({
    d: 3, applies: COM,
    stem: "Put the steps for forming a public limited company in order.",
    template: "First the promoters prepare the memorandum and articles. The documents are lodged with the {{blank:a}}, who issues a certificate of {{blank:b}}. The company then issues a {{blank:c}} to raise capital and finally receives a {{blank:d}} certificate.",
    blanks: [
      { id: "a", accepted: ["Registrar of Companies", "Registrar", "registrar of companies", "the Registrar"] },
      { id: "b", accepted: ["incorporation"] },
      { id: "c", accepted: ["prospectus"] },
      { id: "d", accepted: ["trading", "trading certificate", "commencement of business"] },
    ],
    wrong: [["bank", "trading", "memorandum", "incorporation"]],
    explanation: "Promoters → memorandum and articles → Registrar → certificate of incorporation → prospectus → trading certificate.",
    hints: ["Which official keeps the register of companies?", "A public company must raise its minimum capital before trading."],
  });
  b.short({
    d: 2,
    stem: "Give the name for the people who start the process of forming a company and prepare its documents.",
    accepted: ["promoters", "the promoters", "promoter", "founders"],
    wrong: ["directors only", "creditors"],
    explanation: "The **promoters** (founders) take the steps needed to form the company.",
  });
  {
    const shares = 4000, price = 2.25, invested = shares * price;
    b.num({
      d: 2, skill: "APPLICATION", kind: "money", value: invested,
      stem: `Tendai bought ${fmt(shares)} shares at ${money(price)} each in a company that later failed owing US\\$65,000 more than its assets. What is the most Tendai can lose?`,
      wrong: [65000, 65000 + invested],
      explanation: `With limited liability his loss is limited to his investment: ${fmt(shares)} × ${fmt(price)} = ${money(invested)}. The US\\$65,000 shortfall is borne by the creditors.`,
    });
  }
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 4,
    stem: "Explain **two** reasons why limited liability is important to the economy.",
    points: [
      "Reason 1, e.g. encourages people to buy shares (1)",
      "Developed: companies can raise large capital and grow (1)",
      "Reason 2, e.g. encourages entrepreneurs to take risks / supports a stock exchange (1)",
      "Developed: more new businesses, jobs and innovation / shares can be traded freely (1)",
    ],
    modelAnswer: "Limited liability encourages people to buy shares because their homes and savings are safe, so companies can raise large amounts of capital to grow. It also encourages entrepreneurs to start new businesses, creating jobs and new products.",
    explanation: "Link limited liability to investment, enterprise and growth.",
    hints: ["Would you buy shares if you could lose your house?"],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4, applies: BES,
    stem: "Identify **four** risks associated with forming a new business enterprise.",
    points: [
      "Financial risk, e.g. losing capital invested / unpaid debts (1)",
      "Market risk, e.g. too few customers / competition (1)",
      "Operational risk, e.g. breakdowns / theft / unreliable suppliers (1)",
      "Legal or personal risk, e.g. fines for not having licences / stress and irregular income (1)",
    ],
    modelAnswer: "The owner may lose the money invested; there may be too few customers; equipment may break down or stock be stolen; and the business may be fined if it lacks the correct licences.",
    explanation: "Any four different risks earn the marks.",
    hints: ["Think about money, customers, operations and the law."],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 840,
    stem: "Nyasha and three relatives are forming Hwange Bricks (Private) Limited. They have agreed the company will make and sell clay bricks, that each share carries one vote and that shares may be sold only with the board's approval.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "In which document will \"to make and sell clay bricks\" appear as the company's objects?",
        options: [["Memorandum of association", "Correct: the objects are in the memorandum."], ["Articles of association", "The articles hold internal rules."], ["Certificate of incorporation", "Issued by the Registrar; it does not list the objects in detail."], ["Prospectus", "A private company does not issue one."]],
        answer: "A",
      }),
      P.short({
        label: "(b)", marks: 1,
        stem: "Name the document in which the voting and share-transfer rules will appear.",
        accepted: ["articles of association", "the articles of association", "articles"],
        wrong: ["memorandum of association"],
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain **two** benefits to the relatives of the company having a separate legal personality.",
        points: ["Benefit 1, e.g. company owns the kiln and land (1)", "Developed: assets stay with the business if a relative dies or leaves / continuity (1)", "Benefit 2, e.g. limited liability / company signs contracts and is sued in its own name (1)", "Developed: relatives' homes protected if the business fails (1)"],
      }),
      P.manual({
        label: "(d)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "Evaluate whether forming a private limited company is worth the cost and formalities for the relatives.",
        points: [
          "Benefit: limited liability protects personal assets in a capital-intensive business (1)",
          "Benefit: continuity and easier borrowing as a legal entity (1)",
          "Cost: registration fees, legal documents, audited accounts and returns (1)",
          "Cost: lenders may still want personal guarantees (1)",
          "Weighs up using case evidence (four owners, equipment, risk) (1)",
          "Justified conclusion (1)",
        ],
        modelAnswer: "Brick making needs kilns, land and transport, and four owners need clear rules, so limited liability, continuity and articles that control share sales are valuable. The costs are registration, legal fees and keeping audited accounts, and banks may still want personal guarantees. Because the investment is large and there are several owners, the protection and clarity are worth the cost.",
      }),
    ],
    explanation: "Objects go in the memorandum; voting and transfer rules in the articles. Separate legal personality gives continuity and limited liability.",
    hints: ["External matters: memorandum. Internal rules: articles.", "Weigh protection against cost in (d)."],
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 720, applies: BES,
    stem: "Thandeka plans to open a car-wash business in Gweru with a loan of US\\$8,000. The site is near a busy road, but two other car washes operate nearby, the water supply is unreliable, and she has never run a business before.",
    parts: [
      P.manual({
        label: "(a)", marks: 3,
        stem: "Identify **three** risks Thandeka faces in forming this enterprise.",
        points: ["Market risk: competition from two car washes (1)", "Operational risk: unreliable water supply (1)", "Financial or personal risk: repaying the US\\$8,000 loan / lack of experience (1)"],
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain how forming a private limited company would affect her financial risk.",
        points: ["Limited liability: her loss limited to her investment (1)", "Personal assets protected if the business fails (1)", "But the lender may ask for a personal guarantee (1)", "So the protection may not cover the loan (1)"],
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Suggest **two** ways she could reduce the other risks.",
        points: ["Way 1, e.g. store water in tanks / drill a borehole (1)", "Linked to operational risk (1)", "Way 2, e.g. offer lower prices or extra services / gain experience or training first (1)", "Linked to market or personal risk (1)"],
      }),
    ],
    explanation: "Thandeka faces market, operational, financial and personal risks; a company limits personal financial risk unless she guarantees the loan.",
    hints: ["Which risks come from competitors, water and the loan?"],
  });
  b.card("DEFINITION", "Corporate legal personality", "A company is a legal person separate from its owners: it owns assets, signs contracts, sues and is sued in its own name.");
  b.card("DEFINITION", "Memorandum of association", "External constitution: name, registered office, objects, limited liability and share capital.");
  b.card("DEFINITION", "Articles of association", "Internal rules: directors, meetings, voting, share transfers, dividends and accounts.");
  b.card("DEFINITION", "Certificate of incorporation", "Issued by the Registrar of Companies; confirms the company exists as a legal person.");
  b.card("DEFINITION", "Trading certificate", "Allows a public company to start trading once it has raised the minimum capital.", null, { applies: COM });
  b.card("DEFINITION", "Prospectus", "A public company's invitation to the public to buy its shares, with details of the company and the offer.");
  b.card("CONCEPT", "Who bears the risk under limited liability?", "Shareholders lose only their investment; creditors bear any loss beyond the company's assets.");
  b.card("FACT", "Risks of forming an enterprise", "Financial, market, operational, legal and personal risks.", null, { applies: BES });
  b.card("CONCEPT", "Memorandum versus articles", "Memorandum faces outwards (who the company is and what it does); articles face inwards (how it is run).");
});
