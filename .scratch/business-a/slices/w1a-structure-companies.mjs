// W1a: structure.companies
import { concept, P, table, r2, money, chk } from "../lib.mjs";
import { mc } from "../tables/w1a-lib.mjs";

concept("abus.structure.companies", { file: "structure/companies", keyPrefix: "structure.companies" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What does **limited liability** mean for a shareholder?",
    ok: ["Losses stop at the sum invested in shares", "Correct: personal property cannot be claimed for company debts."],
    bad: [["The shareholder cannot lose any money at all from it", "The investment itself can be lost."], ["The shareholder is liable for all company debts", "That is unlimited liability."], ["The shareholder may invest only a limited sum", "Limited liability concerns loss, not the size of the investment."]],
    explanation: "A shareholder can lose the money invested but no more.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "How do shares in a **private limited company** differ from shares in a public limited company?",
    ok: ["They cannot be offered to the general public", "Correct: sales are restricted to people chosen by the owners."],
    bad: [["They can be bought freely on a stock exchange", "That describes a public company."], ["They carry unlimited liability", "Both company types give limited liability."], ["They never pay any dividend", "Private companies may pay dividends."]],
    explanation: "A private company may not offer its shares to the public.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is meant by saying that a company has a **separate legal personality**?",
    ok: ["The company is a legal person apart from owners", "Correct: it can own property and make contracts in its own name."],
    bad: [["The company must have more than one employee", "Size of workforce is irrelevant to legal personality."], ["The company cannot be sued in any court", "A company can be sued in its own name."], ["The company has the same personality as its directors", "It is separate from directors and shareholders."]],
    explanation: "A company can own assets, owe debts and sue or be sued in its own name.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Who appoints the **directors** of a company?",
    ok: ["The shareholders", "Correct: owners elect the directors to run the business."],
    bad: [["The customers", "Customers do not elect directors."], ["The suppliers", "Suppliers have no vote in the appointment."], ["The workers' union", "A union may be consulted, but does not appoint directors."]],
    explanation: "Shareholders elect directors, who run the company on their behalf.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional shareholder in a private company in Mutare owns 8,000 of its 40,000 ordinary shares. The company declares a dividend of US\\$0.25 a share. How much does she receive?",
    ok: ["US\\$2,000", "Correct: 8,000 × 0.25 = 2,000."],
    bad: [["US\\$10,000", "This is 40,000 × 0.25, the whole dividend."], ["US\\$8,000", "This is the number of shares, not the dividend."], ["US\\$320", "This divides the shares by 25 instead of multiplying by 0.25."]],
    hints: ["Dividend = number of shares held × dividend per share."],
    explanation: "Her dividend is 8,000 × US\\$0.25 = US\\$2,000.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "Three owners of a fictional printing business in Bulawayo convert it from a partnership into a private limited company. Which benefit do they most clearly gain?",
    ok: ["Their own property is safe from business debts", "Correct: limited liability protects the owners."],
    bad: [["They avoid all costs of registering and reporting", "A company has more formalities."], ["They no longer share the profit with anyone", "Dividends are paid to all shareholders."], ["They can sell shares to anyone on a stock exchange", "Private company shares cannot be offered to the public."]],
    hints: ["What changes about their liability?"],
    explanation: "Limited liability is the main gain of incorporating.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Why might the founder of a successful private company be reluctant to float it as a public limited company?",
    ok: ["She may lose control to new owners", "Correct: selling shares to the public dilutes her voting power."],
    bad: [["Public companies cannot raise any new capital", "They can raise large sums."], ["Public companies have unlimited liability", "They have limited liability."], ["Public companies do not need any directors", "They have directors."]],
    hints: ["Think about who will own the shares after the sale."],
    explanation: "Selling shares widely reduces the founder's share of the votes and exposes the company to a takeover.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which statement is the best judgement on whether a sole trader should become a private limited company?",
    ok: ["It depends on risk, capital needed and compliance cost", "Correct: states the factors on which the answer depends."],
    bad: [["Yes, because a company has no disadvantages at all", "Companies have formalities and costs."], ["No, because limited liability protects creditors only", "Limited liability protects owners."], ["Yes, because limited companies never fail in business", "Companies can fail."]],
    hints: ["Look for the answer that gives conditions."],
    explanation: "A sound judgement weighs liability protection and capital against cost, loss of control and disclosure.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A company continues to exist even if one of its shareholders dies.",
    answer: true,
    explanation: "True. A company has continuity because it is a separate legal person.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A public limited company belongs to the public sector because members of the public can buy its shares.",
    answer: false,
    explanation: "False. A public limited company is privately owned by its shareholders; the public sector is owned by the state.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term to its meaning.",
    pairs: [["Shareholder", "An owner of part of a company"], ["Director", "A person elected to run the company"], ["Dividend", "A share of profit paid to shareholders"], ["Divorce of ownership from control", "Owners are different people from those who run the company"]],
    explanation: "Each term describes a different role or idea.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "A {{blank:a}} company may offer its shares to the general public, while a {{blank:b}} company may not.",
    blanks: [
      { id: "a", accepted: ["public"], choices: ["public", "private"] },
      { id: "b", accepted: ["private"], choices: ["public", "private"] },
    ],
    explanation: "Only public companies may sell shares to the public.",
  });

  chk(12000 * 0.08, 960);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: 12000 * 0.08, calculator: true, daily: true, wrong: [250000 * 0.08, 12000 / 0.08],
    stem: "A fictional public company has 250,000 ordinary shares and declares a dividend of US\\$0.08 a share. A shareholder owns 12,000 shares. Calculate her dividend.",
    hints: ["Shares held × dividend per share."],
    explanation: "12,000 × 0.08 = US\\$960. Using all 250,000 shares gives the company's total dividend of US\\$20,000.",
  });
  const own = 80000, total = 100000, newSh = 150000;
  const before = (own / total) * 100, after = (own / (total + newSh)) * 100;
  chk(after, 32, 0.0001);
  b.num({
    d: 4, skill: "ANALYSIS", kind: "pct", value: after, calculator: true, wrong: [before, r2((own / newSh) * 100)],
    stem: "A founder owns 80,000 of the 100,000 ordinary shares in a fictional company. To raise capital the company issues 150,000 new ordinary shares, all bought by outside investors. Calculate the founder's percentage of the votes after the issue, to one decimal place.",
    hints: ["Total shares after the issue = 100,000 + 150,000."],
    explanation: "Total shares = 250,000. Founder's share = 80,000 ÷ 250,000 × 100 = 32.0%, down from 80.0%, so the founder has lost control.",
  });
  const debts = 64000, assets = 46000, inv = 12000;
  chk(debts - assets, 18000);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: inv, calculator: true, wrong: [debts - assets, debts],
    stem: "A fictional private limited company fails with debts of US\\$64,000. Its assets sell for US\\$46,000. A shareholder invested US\\$12,000 in the company's shares and owns personal property worth US\\$25,000. What is the most the shareholder can lose through the company's failure?",
    hints: ["Limited liability limits the loss to the amount invested."],
    explanation: "The company's shortfall is 64,000 − 46,000 = 18,000, but the shareholder's liability is limited to the US\\$12,000 invested. Her personal property is protected.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the term for the payment of part of a company's profit to its shareholders.",
    accepted: ["dividend", "dividends"],
    explanation: "A dividend is a share of profit paid to shareholders.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain **one** advantage and **one** disadvantage of limited liability.",
    points: ["Advantage: owners' personal property is protected, so they are willing to invest and take risks", "Disadvantage: lenders may be reluctant to lend to a company, or may ask for personal guarantees", "Development: creditors bear more of the loss if the company fails"],
    modelAnswer: "Limited liability protects owners' personal property, so people are willing to invest. However, lenders and suppliers may be reluctant to give credit to a company, or may ask for personal guarantees, because they bear the loss if it fails.",
    hints: ["Consider the owners and the creditors."],
    explanation: "An advantage for owners and a disadvantage for creditors.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Nyasha owns a fictional hardware shop in Gweru as a sole trader. She plans to turn it into a private limited company. Explain **two** reasons why she may do this.",
    points: ["Limited liability protects her house and savings if the business fails", "Application: the hardware trade needs large stocks bought on credit, so debts could be large", "She can raise capital by selling shares to investors", "Application: money from investors can pay for a second shop without a large bank loan"],
    modelAnswer: "A company gives her limited liability, so her house and savings are safe if the shop fails, which matters when it holds large stocks bought on credit. She can also sell shares to investors to raise money for a second shop without a large bank loan.",
    hints: ["One reason about risk, one about finance."],
    explanation: "Two reasons, each developed in the hardware context.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse the problems that can arise when the ownership of a large company is separated from its control.",
    points: ["Directors may pursue their own interests, such as high pay or growth, rather than shareholders' interests", "Shareholders may not know what directors are doing because they have less information", "Directors may take a short-term view to please shareholders", "Conflict may lead to poor decisions and a falling share price"],
    modelAnswer: "Directors may put their own interests, such as high pay, ahead of the shareholders'. Shareholders have less information than directors, so it is hard to check what is going on. Directors may also take short-term decisions to please shareholders, which can lead to poor decisions and a falling share price.",
    hints: ["Think about who knows more and whose interests differ."],
    explanation: "A chain of problems arising from different interests.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "Evaluate whether a successful private limited company should convert to a public limited company.",
    points: ["Benefit: large amounts of capital for expansion", "Benefit: shares can be freely sold, and the company's profile rises", "Cost: loss of control and risk of takeover", "Cost: more disclosure and legal costs", "Short-term pressure from shareholders for dividends", "Judgement with a condition, e.g. depends on whether growth needs outside capital"],
    modelAnswer: "A public company can raise much more capital and enjoys a higher profile. But the founders may lose control, face a takeover, and have to disclose more and bear higher costs. Shareholders may also press for short-term dividends. The conversion makes sense only if the growth plans need more capital than can be raised privately and if the owners accept the loss of control.",
    hints: ["Weigh capital against control and cost, then give a condition."],
    explanation: "Both sides and a conditional judgement.",
  });

  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Fictional Zambezi Tools (Pvt) Ltd in Masvingo has 200,000 ordinary shares, each with one vote. The shareholders are Tatenda (90,000 shares), Chipo (60,000), Sipho (30,000) and 20 workers who hold 20,000 shares in total. The company declares a dividend of US\\$0.15 per share.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: 60000 * 0.15, stem: "Calculate Chipo's dividend.", wrong: [200000 * 0.15, 60000 / 0.15], explanation: "60,000 × 0.15 = US\\$9,000." }),
      P.num({ label: "(b)", marks: 2, kind: "pct", value: (90000 + 30000) / 200000 * 100, stem: "Tatenda and Sipho agree to vote together. Calculate the percentage of the votes they hold, to one decimal place.", wrong: [45, 15], explanation: "(90,000 + 30,000) ÷ 200,000 × 100 = 60.0%." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain whether Tatenda and Sipho together can control the company.", points: ["They hold 60% of the votes, which is more than half", "A majority of the votes decides ordinary decisions", "So they can carry any ordinary vote even against Chipo and the workers"], modelAnswer: "Together they hold 60% of the votes, more than half, so they can carry any ordinary vote even if Chipo and the workers oppose them.", explanation: "Control follows a majority of votes." }),
    ],
    hints: ["Divide the shares by 200,000 to find a percentage of votes."],
    explanation: "Chipo US\\$9,000; Tatenda and Sipho hold 60%, enough to control.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "Fictional Tendai's Auto Parts is a sole trader business in Harare. It has grown quickly and now needs US\\$60,000 for a new warehouse. Tendai could form a private limited company and sell shares to two investors, or borrow from a bank on the security of his house.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Explain **two** features of a private limited company that make it suitable for Tendai's expansion.", points: ["Limited liability: his house is protected", "Shares can be sold to investors, raising capital without a loan", "Continuity and separate legal identity make the business more secure"], modelAnswer: "Limited liability would protect his house if the warehouse plan fails. He could also sell shares to investors to raise the money without borrowing, and the company would continue to exist even if he left.", explanation: "Two features linked to the case." }),
      P.manual({ label: "(b)", marks: 6, stem: "Evaluate whether Tendai should form a company or borrow from the bank as a sole trader.", points: ["Company: house protected; capital from investors", "Company: control shared, costs and disclosure increase", "Bank loan: keeps full control and all profit", "Bank loan: house at risk; repayments whatever profits are", "Counter-argument: bank may require personal guarantees even from a company", "Judgement and reason"], modelAnswer: "A company would protect Tendai's house and bring in capital without loan repayments, but he would share control and profit and bear more costs and disclosure. A bank loan keeps control and profit, but his house is at risk and repayments must be made whatever the profit. A bank might also ask for personal guarantees from a company. On balance, forming a company is better if he can accept investors having a say, because the risk to his home is the more serious danger.", hints: ["Compare risk to his house with loss of control."], explanation: "Both options weighed and a judgement given." }),
    ],
    hints: ["Think about what Tendai gains and loses with each option."],
    explanation: "Limited liability and investor capital against loss of control and extra costs.",
  });

  b.card("DEFINITION", "Limited liability", "Shareholders' responsibility for company debts is limited to the amount they have invested; personal property is protected.");
  b.card("DEFINITION", "Separate legal personality", "A company is a legal person distinct from its owners: it can own property, make contracts and sue or be sued.");
  b.card("DEFINITION", "Private limited company", "Shares are sold privately and cannot be offered to the general public.");
  b.card("DEFINITION", "Public limited company", "May offer its shares to the general public, usually through a stock exchange.");
  b.card("DEFINITION", "Divorce of ownership from control", "Owners (shareholders) are different people from those who run the company (directors and managers).");
  b.card("FORMULA", "Dividend to a shareholder", "Number of shares held × dividend per share.");
  b.card("CONCEPT", "Control of a company", "Control needs more than 50% of the votes, alone or with allies; the largest holding may not be enough.");
  b.card("FACT", "Advantages and disadvantages of companies", "Limited liability, easier capital and continuity; but formalities, disclosure, shared profit and possible loss of control.");
  b.card("CONCEPT", "Private to public company", "Gains: large capital, higher profile, easy sale of shares. Costs: loss of control, takeover risk, more disclosure and cost.");
});
