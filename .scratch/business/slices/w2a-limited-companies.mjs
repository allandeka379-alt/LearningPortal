// W2a: private and public limited companies (COM, BES, CAM).
import { concept, P, money, fmt, round, ZIM, CAM } from "../lib.mjs";

concept("bus.organisation.limited-companies", { file: "organisation/limited-companies", keyPrefix: "organisation.limited-companies" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who owns a limited company?",
    options: [
      ["Its shareholders", "Correct: each share is a part of the ownership."],
      ["Its managers", "Managers run the company day to day but need not own shares."],
      ["Its customers", "Customers buy its products; they do not own it."],
      ["Its creditors", "Creditors are owed money; they do not own the company."],
    ],
    answer: "A",
    explanation: "Shareholders own a limited company; they elect directors, who control it and appoint managers.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who controls a limited company and sets its policies?",
    options: [
      ["The board of directors", "Correct: directors are elected by shareholders to control the company."],
      ["The Registrar of Companies", "The Registrar registers companies but does not control them."],
      ["Each individual shareholder", "Shareholders vote at meetings but do not run the company."],
      ["The company's biggest customer", "Customers have no control rights."],
    ],
    answer: "A",
    explanation: "The board of directors controls the company on behalf of the shareholders and appoints managers.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which feature is true of a private limited company but **not** of a public limited company?",
    options: [
      ["Its shares cannot be offered to the general public", "Correct: only public companies can invite the public to buy shares."],
      ["Its shareholders have limited liability for its debts", "Both types give shareholders limited liability."],
      ["It has a separate legal identity", "Both types are incorporated."],
      ["It continues if a shareholder dies", "Both types have continuity."],
    ],
    answer: "A",
    explanation: "Private companies sell shares privately, often to family and friends, and restrict transfers; public companies can offer shares to anyone.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is a **dividend**?",
    options: [
      ["A share of profit paid to shareholders", "Correct: usually an amount per share."],
      ["Interest paid to a bank on a loan", "Interest is paid to lenders, not owners."],
      ["The price paid to buy a share", "That is the share price."],
      ["A salary paid to the directors", "Directors' fees are a cost, not a dividend."],
    ],
    answer: "A",
    explanation: "A dividend is the part of a company's profit distributed to its shareholders.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why is a public limited company at greater risk of a takeover than a private limited company?",
    options: [
      ["Anyone can buy its shares on the stock exchange", "Correct: a rival can build up a controlling shareholding."],
      ["It has unlimited liability", "Public companies have limited liability."],
      ["It must be owned by the government by law", "Public companies are privately owned."],
      ["It cannot pay dividends", "Public companies can pay dividends."],
    ],
    answer: "A",
    explanation: "Because its shares are freely traded, another business can buy enough shares (more than half the votes) to take control.",
    hints: ["Who is allowed to buy shares in a public company?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "What is meant by the **separation of ownership and control** in a large public limited company?",
    options: [
      ["Shareholders own it but directors and managers run it", "Correct: owners and controllers are different people."],
      ["The government owns it but shareholders run it", "Public companies are not owned by the government."],
      ["Managers own the shares but do not run it", "Managers run the company; most do not own it."],
      ["Creditors own the assets until debts are paid", "Creditors do not own the company."],
    ],
    answer: "A",
    explanation: "Thousands of shareholders own a plc, but they elect directors who, with managers, control it; their aims may differ from the shareholders'.",
    hints: ["Who owns and who decides?"],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A family bakery needs US\\$80,000 to expand, wants limited liability and wants to keep control within the family. Which form is most suitable?",
    options: [
      ["Private limited company", "Correct: limited liability, extra capital from relatives, shares kept in the family."],
      ["Public limited company", "Selling shares to the public risks loss of control and costs too much."],
      ["Partnership", "Partners have unlimited liability, which the family does not want."],
      ["Sole trader", "One owner cannot raise the capital and has unlimited liability."],
    ],
    answer: "A",
    explanation: "A private limited company gives limited liability and continuity while shares are sold only privately, so the family keeps control.",
    hints: ["Which form gives limited liability without selling shares to the public?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A public limited company is owned by the government.",
    answer: false,
    explanation: "False. A public limited company is owned by private shareholders; \"public\" means its shares can be sold to the public.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A limited company can sue and be sued in its own name.",
    answer: true,
    explanation: "True. A limited company has separate legal personality.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each person or group to its role in a limited company.",
    pairs: [
      ["Shareholders", "Own the company and vote at the AGM"],
      ["Board of directors", "Controls the company and sets policy"],
      ["Managers", "Run the company day to day"],
    ],
    explanation: "Ownership (shareholders), control (directors) and day-to-day management (managers) can be separate in a company.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentence.",
    template: "Shares in a {{blank:a}} limited company may be bought and sold on a stock exchange, but shares in a {{blank:b}} limited company can be transferred only with the agreement of the other shareholders.",
    blanks: [
      { id: "a", accepted: ["public"], choices: ["public", "private"] },
      { id: "b", accepted: ["private"], choices: ["public", "private"] },
    ],
    explanation: "Public company shares are freely transferable; private company shares are restricted.",
  });
  b.short({
    d: 2,
    stem: "Name the yearly meeting at which shareholders elect the directors.",
    accepted: ["annual general meeting", "AGM", "the annual general meeting", "the AGM"],
    wrong: ["board meeting", "general meeting of directors"],
    explanation: "Shareholders vote at the **annual general meeting (AGM)**, usually one vote per share.",
  });
  {
    const shares = 80000, held = 44000;
    const pct = (held / shares) * 100;
    b.num({
      d: 2, skill: "APPLICATION", kind: "pct", value: pct, calculator: true, daily: true,
      stem: `A company has issued ${fmt(shares)} shares. Farai owns ${fmt(held)} of them. Calculate the percentage of the company Farai owns (to one decimal place).`,
      wrong: [round((shares - held) / shares * 100, 1), round(held / shares, 2)],
      explanation: `${fmt(held)} ÷ ${fmt(shares)} × 100 = ${round(pct, 1)}%. With more than 50% of the votes, Farai can elect the board.`,
    });
  }
  {
    const shares = 120000, div = 9000, held = 15000;
    const dps = div / shares, got = dps * held;
    b.calc({
      d: 3, skill: "APPLICATION", kind: "money", value: got, calculator: true, applies: ZIM,
      stem: `A private limited company has ${fmt(shares)} shares and pays a total dividend of ${money(div)}. Chipo owns ${fmt(held)} shares. Calculate Chipo's dividend.`,
      wrong: [dps, round(div / held, 2)],
      explanation: `Dividend per share = ${fmt(div)} ÷ ${fmt(shares)} = US\\$${dps.toFixed(3)}. Chipo receives ${fmt(held)} × ${dps.toFixed(3)} = ${money(got)}.`,
      hints: ["First find the dividend per share.", "Then multiply by the number of shares Chipo owns."],
    });
  }
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** disadvantages of a public limited company.",
    points: [
      "Disadvantage 1, e.g. high formation costs / many legal formalities (1)",
      "Explained, e.g. prospectus, audits and published accounts are expensive (1)",
      "Disadvantage 2, e.g. risk of takeover / separation of ownership and control / published accounts (1)",
      "Explained, e.g. rivals can buy a controlling stake / directors may follow their own aims / competitors see information (1)",
    ],
    modelAnswer: "A public company is expensive to form and run because it must issue a prospectus, have its accounts audited and publish them. It also risks a takeover, because anyone can buy its shares and a rival could gain control.",
    explanation: "State each disadvantage and explain why it is a problem for the company or its owners.",
    hints: ["Think about cost, control and information."],
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** reasons why a sole trader might convert the business into a private limited company.",
    points: [
      "Reason 1, e.g. limited liability (1)",
      "Developed: personal possessions protected if the business fails (1)",
      "Reason 2, e.g. raise more capital from new shareholders / continuity / easier borrowing (1)",
      "Developed: finance expansion while keeping control in the family / business survives the owner (1)",
    ],
    modelAnswer: "The owner would gain limited liability, so a failed expansion would not cost the family home. The business could also raise capital by selling shares to relatives and friends without giving outsiders control.",
    explanation: "Link each reason to the owner's situation.",
    hints: ["What does the owner risk as a sole trader?"],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 840, calculator: true,
    stem: "Mazowe Packaging (Private) Limited has 200,000 shares. The founding family owns 150,000 shares. The directors want US\\$500,000 to build a new factory and are considering becoming a public limited company and selling new shares to the public.",
    parts: [
      P.num({
        label: "(a)", marks: 2, kind: "pct", value: (150000 / 200000) * 100,
        stem: "Calculate the percentage of the shares the family owns now.",
        wrong: [25, 0.75],
        explanation: "150,000 ÷ 200,000 × 100 = 75%.",
      }),
      P.mcq({
        label: "(b)", marks: 1,
        stem: "Which document would the company issue to invite the public to buy its shares?",
        options: [["A prospectus", "Correct: it invites the public to buy shares."], ["Articles of association", "These are the internal rules."], ["A partnership deed", "Used by partnerships."], ["A trading licence", "Issued by local authorities to traders."]],
        answer: "A",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain **one** advantage to the company of becoming a public limited company.",
        points: ["Identifies, e.g. can raise large capital from the public (1)", "Applies: the US\\$500,000 for the factory (1)", "Effect, e.g. growth without high-interest loans (1)"],
      }),
      P.manual({
        label: "(d)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "Evaluate whether the family should agree to the company becoming a public limited company.",
        points: [
          "For: raises the full US\\$500,000 without interest payments (1)",
          "For: shares become easy to sell, so the family's wealth is more liquid (1)",
          "Against: family's percentage falls as new shares are issued; could lose majority control (1)",
          "Against: costs of becoming public / published accounts / takeover risk (1)",
          "Considers alternative, e.g. bank loan or selling shares privately (1)",
          "Justified conclusion (1)",
        ],
        modelAnswer: "Going public would raise the US\\$500,000 without loan interest and make the family's shares easy to sell. But issuing many new shares would cut the family's 75% holding, possibly below half, so they could lose control, and the company would face higher costs, published accounts and takeover risk. If the factory is profitable enough to repay a loan, borrowing or selling a few shares privately keeps control; the family should go public only if they accept sharing control.",
      }),
    ],
    explanation: "The family owns 75%. Going public raises large capital but dilutes control and adds costs.",
    hints: ["Shares owned ÷ total shares × 100.", "What happens to the family's percentage if new shares are sold?"],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 720, applies: CAM,
    stem: "Three friends plan to open a tourist lodge near Victoria Falls. They need US\\$150,000. Two of them have savings; the third has hotel experience but no money. They expect to borrow from a bank.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "Define **limited liability**.",
        points: ["Owners/shareholders can lose only the amount they invested (1)", "Personal possessions are not at risk for the business's debts (1)"],
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain **two** reasons why a private limited company would suit the three friends.",
        points: ["Reason 1: limited liability (1)", "Applied: a large bank loan / risky tourism business, so personal assets protected (1)", "Reason 2: shares can be allotted to reflect contributions / continuity / easier borrowing (1)", "Applied: the friend without money can earn shares for his experience; bank deals with a legal entity (1)"],
      }),
      P.manual({
        label: "(c)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "Recommend whether they should form a partnership or a private limited company. Justify your answer.",
        points: [
          "Partnership: cheaper and easier to form; accounts private (1)",
          "Partnership: unlimited liability on a large loan is a serious risk (1)",
          "Company: limited liability and continuity suit a large, long-term investment (1)",
          "Company: formation costs and formalities; bank may want personal guarantees (1)",
          "Uses case evidence (US\\$150,000, bank loan, tourism risk) (1)",
          "Justified recommendation (1)",
        ],
        modelAnswer: "A partnership would be cheap and quick to set up, but with US\\$150,000 at stake and a bank loan, unlimited liability would put all three friends' homes at risk if tourism falls. A private limited company costs more to form, and the bank may still ask for guarantees, but it protects their other assets, continues if one leaves and lets them allot shares fairly. They should form a private limited company.",
      }),
    ],
    explanation: "With large borrowing and a risky market, limited liability is the deciding factor.",
    hints: ["How large is the investment and how risky?", "What happens to personal assets in each form?"],
  });
  b.card("DEFINITION", "Shareholder", "A part-owner of a company who may receive dividends and can vote at the annual general meeting.");
  b.card("DEFINITION", "Director", "A person elected by shareholders to the board that controls a company.");
  b.card("DEFINITION", "Limited liability", "Shareholders can lose only the money they invested in shares, not their personal possessions.");
  b.card("DEFINITION", "Dividend", "The part of a company's profit paid to shareholders, usually per share.");
  b.card("CONCEPT", "Private versus public limited company", "A private company cannot offer shares to the public and restricts transfers; a public company can sell shares to anyone, often on a stock exchange.");
  b.card("CONCEPT", "Separation of ownership and control", "In a large company shareholders own it, but directors and managers control and run it.");
  b.card("FACT", "Features of all limited companies", "Separate legal personality, limited liability, continuity, ownership by shareholders, control by directors.");
  b.card("CONCEPT", "Takeover risk", "A public company's shares can be bought by anyone, so a rival may gain more than half the votes.");
  b.card("CONCEPT", "Recommending a company form", "Weigh capital needed, risk of the business, the owners' wish for control, and formation costs.");
});
