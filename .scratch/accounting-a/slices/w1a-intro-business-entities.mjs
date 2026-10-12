// W1a: intro.business-entities
import { concept, P, table, check, r2, fmt, money } from "../lib.mjs";
import { mc } from "../tables/w1a-lib.mjs";

concept("aacc.intro.business-entities", { file: "intro/business-entities", keyPrefix: "intro.business-entities" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What is the liability of a sole trader for the debts of the business?",
    ok: ["Unlimited: personal assets can be used to pay the debts", "Correct: the owner and the business are the same legal person."],
    bad: [["Limited to the capital the owner invested", "That describes shareholders of a limited company."], ["Limited to the profit of the last year", "No such limit applies."], ["None, because the business is a separate legal person", "A sole trader's business is not separate from its owner."]],
    explanation: "A sole trader has unlimited liability.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Who owns a limited company?",
    ok: ["The shareholders", "Correct: they own the shares."],
    bad: [["The directors", "Directors manage the company but may own no shares."], ["The auditors", "Auditors check the accounts; they do not own the company."], ["The employees", "Employees work for the company."]],
    explanation: "A company is owned by its shareholders and run by directors.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is an advantage of a partnership over a sole trader?",
    ok: ["More capital and a wider range of skills can be brought in", "Correct: each partner adds capital and skills."],
    bad: [["Partners have limited liability", "Ordinary partners have unlimited liability."], ["The profit does not have to be shared", "Profits are shared according to the agreement."], ["Decisions can always be made faster", "More people may slow decisions."]],
    explanation: "Partners add capital, skills and shared workload; they still have unlimited liability and share the profit.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Which feature distinguishes a public limited company from a private limited company?",
    ok: ["It may offer its shares to the public", "Correct: a private company may not."],
    bad: [["It has unlimited liability", "Both have limited liability."], ["It is owned by the government", "'Public' refers to the right to sell shares to the public."], ["It does not need directors", "Both have directors."]],
    explanation: "Only a public company may invite the public to buy its shares.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Why does limited liability make it easier for a company to raise share capital?",
    ok: ["Investors know they cannot lose more than the amount they agreed to pay for their shares", "Correct: it limits their risk."],
    bad: [["Investors are guaranteed a dividend", "No dividend is guaranteed."], ["Investors may use the company's assets personally", "Company assets belong to the company."], ["The company pays no tax", "Companies pay tax on profit."]],
    hints: ["Think of the risk to an investor's own savings."],
    explanation: "Limited liability protects an investor's other wealth, so more people are willing to invest.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "In which type of business does the business normally end when the owner dies?",
    ok: ["Sole trader", "Correct: the business is not separate from its owner."],
    bad: [["Private limited company", "A company continues when a shareholder dies."], ["Public limited company", "A company has perpetual succession."], ["Company with only one shareholder", "It is still a separate legal person."]],
    hints: ["Which form has a separate legal personality?"],
    explanation: "A sole trader business has no existence apart from the owner, so it ends on death unless someone takes over.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "Two trusted friends with a little capital each want to start a cleaning business and share the work. Which form is **most suitable**?",
    ok: ["Partnership", "Correct: they can pool capital and skills with little formality."],
    bad: [["Public limited company", "The cost and formality are far too high."], ["Sole trader", "There are two owners, so a sole trader does not fit."], ["Government department", "Not a form of private business."]],
    hints: ["How many owners and how much capital?"],
    explanation: "Two owners with small capital suit a partnership.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A bank asks the owner-directors of a small private limited company for personal guarantees before lending to the company. What is the most likely reason?",
    ok: ["Limited liability means the bank can claim only against the company's assets unless the directors guarantee the loan", "Correct: the guarantee gives the bank extra security."],
    bad: [["Directors are always personally liable for company debts", "Limited liability normally protects directors."], ["The bank is not allowed to lend to a company", "Banks lend to companies."], ["Guarantees are needed for tax", "Guarantees are about security for the loan."]],
    hints: ["Whose assets can the bank claim against?"],
    explanation: "A personal guarantee overcomes the limit on the owners' liability.",
  });

  b.tf({
    d: 2, skill: "RECALL", daily: true,
    stem: "A limited company is a separate legal person from its shareholders.",
    answer: true,
    explanation: "True. It can own property, enter contracts and be sued in its own name.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Ordinary partners in a partnership have limited liability for the firm's debts.",
    answer: false,
    explanation: "False. Partners normally have unlimited liability. (Limited liability partnerships are not examined.)",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each description to the form of business.",
    pairs: ["One owner with unlimited liability", "Two or more owners with unlimited liability who share profits by agreement", "A separate legal person whose shares are not offered to the public", "A separate legal person whose shares may be traded on a stock exchange"],
    right: ["Sole trader", "Partnership", "Private limited company", "Public limited company"],
    rightIndex: [0, 1, 2, 3],
    explanation: "The number of owners, liability and the right to offer shares to the public identify each form.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete each sentence.",
    template: "A shareholder's liability is {{blank:a}}, whereas a partner's liability is {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["limited"], choices: ["limited", "unlimited"] },
      { id: "b", accepted: ["unlimited"], choices: ["limited", "unlimited"] },
    ],
    explanation: "Shareholders lose at most the amount unpaid on their shares; partners can lose personal assets.",
  });

  const sf = r2(27450 - 18600);
  check("sf", sf, 8850);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: sf, daily: true, calculator: true, wrong: [18600, r2(27450 + 18600)],
    stem: "Sipho's business as a sole trader fails. Its assets are sold for US\\$18,600 and its debts total US\\$27,450. How much must Sipho pay from his private assets to settle the debts in full?",
    explanation: "27,450 - 18,600 = 8,850. A sole trader has unlimited liability.",
  });
  const pa = r2((14400 * 2) / 3);
  check("pa", pa, 9600);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: pa, calculator: true, wrong: [r2(14400 / 3), 14400],
    stem: "Nyasha and Chipo are partners who share losses in the ratio 2 : 1. Their business fails with a shortfall of US\\$14,400 owed to creditors. How much does Nyasha contribute as her share of the shortfall?",
    hints: ["Share the shortfall in the ratio 2 : 1."],
    explanation: "2/3 × 14,400 = 9,600. (Chipo's share is 4,800.) Each partner is in practice liable for the whole amount if the other cannot pay.",
  });
  const unpaid = r2(3000 * (0.5 - 0.3));
  chk600(unpaid);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: unpaid, calculator: true, wrong: [r2(3000 * 0.5), r2(3000 * 0.3)],
    stem: "Thandeka holds 3,000 ordinary shares of US\\$0.50 each in a private company, on which she has paid US\\$0.30 per share. The company fails. What is the most she can be required to pay towards the company's debts?",
    hints: ["Limited liability means the amount still unpaid on the shares."],
    explanation: "Unpaid amount: 3,000 × (0.50 - 0.30) = 600. Her limit is the unpaid amount on her shares, not the company's total debts.",
  });
  const own = (10400 / 40000) * 100;
  b.num({
    d: 3, skill: "APPLICATION", kind: "pct", value: own, calculator: true, wrong: [r2((10400 / (40000 - 10400)) * 100)],
    stem: "A private company has issued 40,000 ordinary shares. Farai holds 10,400 of them. What percentage of the votes (one vote per share) does he hold, to one decimal place?",
    hints: ["Votes held ÷ total votes."],
    explanation: "10,400 ÷ 40,000 × 100 = 26.0%. Dividing by the shares held by others gives 35.1%.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "State the term for the legal protection of shareholders whereby they can lose only the amount unpaid on their shares.",
    accepted: ["limited liability", "limited liability."],
    explanation: "Limited liability.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "State **two** advantages of a partnership over a sole trader.",
    points: ["More capital can be raised from the partners", "More skills and a shared workload and risk"],
    modelAnswer: "A partnership can raise more capital because there are several contributors, and it brings together different skills and shares the workload.",
    explanation: "Capital and skills are the usual points; shared risk is also creditworthy.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain what is meant by saying that a company is a separate legal entity.",
    points: ["The company is a person in law distinct from its owners, so it can own assets and make contracts in its own name", "Its debts are the company's, not the shareholders' (subject to limited liability), and it continues when shareholders change"],
    modelAnswer: "In law the company is a person distinct from its shareholders. It owns its assets and owes its debts itself, and it continues even if the shareholders change.",
    hints: ["Who owns the assets: the shareholders or the company?"],
    explanation: "Separate entity: own property, own debts, continuity.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Tendai's sole trader hardware business in Gweru has grown and he wants to expand to Masvingo, which needs more finance. His accountant suggests becoming a private limited company. Evaluate this suggestion.",
    points: ["Advantage: limited liability protects his personal assets while he borrows or invests more", "Advantage: shares can be issued to new investors, giving access to more capital, and the business continues", "Disadvantage: formation costs, more legal duties and accounts that must be filed", "Conclusion supported by the facts: worthwhile if the expansion is large and risky; otherwise a bank loan might be enough"],
    modelAnswer: "Becoming a company would protect Tendai's personal assets and let him sell shares to raise money for Masvingo. But it costs more to set up and brings legal duties and filing of accounts. It is worth it if the expansion is large and risky; for a small expansion a bank loan may be enough.",
    hints: ["Weigh protection and capital against cost and duties."],
    explanation: "A balanced judgement referring to the business earns the marks.",
  });

  // Structured 1: 10 marks
  const assets = 31200;
  const debts = 44700;
  const sfall = r2(debts - assets);
  const tShare = r2((sfall * 4) / 5);
  check("sfall", sfall, 13500);
  check("tShare", tShare, 10800);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Tendai's hardware business in Mutare has failed. The assets can be sold for ${money(assets)} and the business owes ${money(debts)}. Tendai invested ${money(20000)} in the business.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: sfall, wrong: [debts, assets], stem: "Calculate the shortfall.", explanation: "44,700 - 31,200 = 13,500." }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: tShare, wrong: [r2(sfall / 5), sfall], stem: "Suppose the business had been a partnership between Tendai and Sipho who share losses 4 : 1. Calculate Tendai's share of the shortfall.", explanation: "4/5 × 13,500 = 10,800." }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: 0, wrong: [sfall], stem: "Suppose instead that it had been a private limited company with fully paid shares. Calculate the amount the shareholders must pay towards the shortfall.", explanation: "Nil. Fully paid shareholders have no further liability; the creditors bear the shortfall." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain who bears the loss of 13,500 in the company case.", points: ["The creditors bear the shortfall because the shareholders' liability is limited", "Shareholders lose only the capital they paid for their shares", "The shareholders' personal assets cannot be claimed"], modelAnswer: "The creditors bear the loss. Shareholders' liability is limited to the unpaid amount on their shares, so they lose only the money already paid for the shares and their personal assets are safe.", explanation: "Limited liability shifts the shortfall to the creditors." }),
    ],
    hints: ["Shortfall = debts - assets realised."],
    explanation: "This item tests the effect of the form of business on liability.",
  });

  // Structured 2: 12 marks
  const total = 120000;
  const largest = 48000;
  const share = (largest / total) * 100;
  b.struct({
    d: 4, skill: "EVALUATION", calculator: true,
    stem: `The Moyo brothers run a successful sole trader transport business in Chinhoyi and want to raise ${money(150000)} to buy new lorries. A cousin and an uncle are willing to invest. They are considering forming a private limited company with ${total.toLocaleString("en-GB")} ordinary shares: the elder brother would hold ${largest.toLocaleString("en-GB")} of them.`,
    parts: [
      P.mcq({ label: "(a)", marks: 2, stem: "Which feature of a private limited company would **most** encourage the cousin and the uncle to invest?", options: [["Limited liability", "Correct: they can lose no more than they pay for their shares."], ["Unlimited liability", "This is a disadvantage to investors."], ["The company ends if one shareholder dies", "A company continues; in any case this would not encourage investment."], ["Shares must be offered to the public", "A private company cannot do this."]], answer: "A", explanation: "Limited liability protects their other wealth." }),
      P.num({ label: "(b)", marks: 2, kind: "pct", value: share, wrong: [r2((largest / (total - largest)) * 100)], stem: "Calculate the percentage of votes held by the elder brother (one vote per share), to one decimal place.", explanation: "48,000 ÷ 120,000 × 100 = 40.0%." }),
      P.manual({ label: "(c)", marks: 4, stem: "Explain **two** disadvantages for the brothers of changing from a sole trader to a private limited company.", points: ["Legal and formation costs, and duties such as keeping and filing accounts", "They must account to other shareholders and share control and profits (the elder brother has only 40% of the votes)", "Dividends are paid to the new shareholders, so the brothers receive less of the profit", "Directors' duties and possible loss of privacy"], modelAnswer: "The company must be formed and run to legal standards, which costs time and money, and the accounts have to be filed. The brothers also share control and profit: the elder holds only 40% of the votes and dividends go to the cousin and uncle as well.", explanation: "Two developed disadvantages earn two marks each." }),
      P.manual({ label: "(d)", marks: 4, stem: "Advise the brothers whether they should form the company or borrow the money from a bank as sole traders. Justify your answer.", points: ["Company: limited liability and new share capital with no interest", "Loan: they keep full control and all profit, but must pay interest and risk personal assets", "A reasoned recommendation relating to the size of the sum and their wish for control", "Mention of other factors such as the trust between the family members or lenders' security"], modelAnswer: "I would advise forming the company because the sum of US\\$150,000 is large, and limited liability protects the brothers' own assets. The cousin and uncle also provide capital without interest. The brothers give up some control, but with 40% of the votes the elder brother keeps a strong voice, and the family trust each other.", explanation: "A recommendation supported by reasons and a consideration of the other option." }),
    ],
    hints: ["Think about risk to personal assets and control of the business."],
    explanation: "This item tests choosing and justifying a form of business.",
  });

  b.card("DEFINITION", "What is **limited liability**?", "Shareholders' liability for company debts is limited to the amount unpaid on their shares.");
  b.card("CONCEPT", "Sole trader: liability and continuity", "Unlimited liability; the business is not separate from the owner and ends with the owner.");
  b.card("CONCEPT", "Partnership: liability and capital", "Unlimited liability (usually joint); more capital and skills than a sole trader.");
  b.card("CONCEPT", "A company is a separate legal person", "It owns its assets, owes its debts, and continues when shareholders change.");
  b.card("FACT", "Private against public limited company", "Private: shares not offered to the public. Public: may offer shares to the public and have them listed.");
  b.card("FACT", "Who owns and who runs a company?", "Shareholders own it; directors run it.");
  b.card("CONCEPT", "Choosing a form of business", "State the form, give a reason from the description and mention a drawback.");
  b.card("DEFINITION", "Formal and informal organisations (ZIMSEC)", "Formal: registered, keeps records. Informal: usually unregistered with few or no records.", undefined, { applies: ["zimsec"] });
  b.card("FACT", "Limited liability partnerships", "Not examined by either board.");
});

function chk600(v) {
  if (Math.abs(v - 600) > 1e-9) throw new Error("unpaid " + v);
}
