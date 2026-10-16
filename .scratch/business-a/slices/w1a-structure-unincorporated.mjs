// W1a: structure.unincorporated
import { concept, P, ZIM, table, r2, money, chk } from "../lib.mjs";
import { mc } from "../tables/w1a-lib.mjs";

concept("abus.structure.unincorporated", { file: "structure/unincorporated", keyPrefix: "structure.unincorporated" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Who is responsible for the debts of a **sole trader's** business?",
    ok: ["The owner, personally and without limit", "Correct: unlimited liability means personal property can be claimed."],
    bad: [["Only the customers of the business", "Customers are not responsible for the owner's debts."], ["Only the bank that lent the money", "A lender is owed the debt, not liable for it."], ["No one, as the business is a separate person", "A sole trader's business is not separate from the owner."]],
    explanation: "A sole trader has unlimited liability for the business's debts.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What is a **partnership agreement**?",
    ok: ["A record of how partners share profit", "Correct: it records capital, duties, profit shares and leaving rules."],
    bad: [["A loan contract between one partner and a bank", "A loan contract is not a partnership agreement."], ["A government licence to trade in a town", "A licence is permission from authorities."], ["A promise to buy shares in a company", "Partnerships do not issue shares."]],
    explanation: "The agreement records how partners will run the business and share profits.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is a typical **advantage** of being a sole trader?",
    ok: ["The owner keeps all profit and decides alone", "Correct: no one else has a claim on the profit or a say in decisions."],
    bad: [["The owner has limited liability for debts", "Sole traders have unlimited liability."], ["The business continues automatically after the owner dies", "A sole trader's business may end when the owner dies."], ["The business can easily raise millions from share sales", "Sole traders cannot sell shares."]],
    explanation: "Control and the right to all the profit are the main advantages.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "In a co-operative, how are votes normally allocated?",
    ok: ["Each member has one equal vote", "Correct: control is democratic, regardless of investment."],
    bad: [["One vote for each share held", "That is how companies usually allocate votes."], ["The manager has all the votes", "The members control the co-operative."], ["Votes go to the largest customer", "Customers do not vote unless they are members."]],
    explanation: "One member, one vote is the main democratic principle of co-operatives.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "Chipo and Rudo are partners. Rudo signs a contract for stock without telling Chipo, and the stock is never paid for. Which statement is correct?",
    ok: ["Chipo may have to help to pay the debt", "Correct: partners are jointly liable for the debts of the business."],
    bad: [["Only Rudo is responsible, because she signed", "Partners normally share liability for each other's business acts."], ["No one is responsible, as the contract was secret", "The supplier can claim from the partnership."], ["The government must pay the supplier", "The state is not responsible for a firm's debts."]],
    hints: ["Think about what unlimited liability means for partners."],
    explanation: "Partners normally share liability for debts incurred on behalf of the business.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "Thirty fictional farmers in Chipinge join to buy fertiliser together at a lower price, and each farmer has one vote in the group. Which type of business is this most like?",
    ok: ["A co-operative", "Correct: members own it, buy jointly and have one vote each."],
    bad: [["A sole trader", "A sole trader has one owner."], ["A public limited company", "Votes there follow shareholding."], ["A franchise", "No franchisor licenses a brand."]],
    hints: ["Who owns the group and how are decisions made?"],
    explanation: "A member-owned group with equal voting and joint buying is a co-operative.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Why might unlimited liability discourage a sole trader from expanding?",
    ok: ["A bigger loan risks his personal property", "Correct: failure would make the owner personally liable for larger debts."],
    bad: [["Expansion is illegal for any sole trader", "Sole traders are allowed to expand."], ["Customers refuse to buy from growing firms", "Growth does not make customers refuse to buy."], ["Banks never lend any money to sole traders", "Banks do lend, often with security."]],
    hints: ["Think about what the owner stands to lose."],
    explanation: "Expansion often needs borrowing, and unlimited liability means the owner's own assets stand behind it.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which statement is the best judgement on whether two friends should form a partnership to open a restaurant?",
    ok: ["Yes, if they have a clear written agreement signed", "Correct: names the conditions on which the benefits depend."],
    bad: [["Yes, because partnerships never have any disputes", "Disputes are a recognised disadvantage."], ["No, because partnerships cannot raise any capital", "Partners can pool more capital than one person."], ["No, because partners always have limited liability", "Partners normally have unlimited liability, so the reason is wrong."]],
    hints: ["Look for the judgement that gives a condition."],
    explanation: "A partnership brings capital and skills but needs a clear agreement and trust.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A sole trader can employ other people.",
    answer: true,
    explanation: "True. 'Sole' means one owner, not one worker; a sole trader can employ many people.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In a partnership, profits must always be shared equally whatever the partners have agreed.",
    answer: false,
    explanation: "False. Partners may agree any sharing arrangement; equal sharing applies only when there is no agreement.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each form of business to its main feature.",
    pairs: [["Sole trader", "One owner with unlimited liability who keeps all the profit"], ["Partnership", "Two or more owners who share profit and usually have unlimited liability"], ["Co-operative", "Member-owned with one vote per member"], ["Unlimited liability", "Owners' personal property can be used to pay business debts"]],
    explanation: "Each term identifies a distinct feature.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "A {{blank:a}} is owned by one person who has {{blank:b}} liability for its debts.",
    blanks: [
      { id: "a", accepted: ["sole trader"], choices: ["sole trader", "public company", "co-operative"] },
      { id: "b", accepted: ["unlimited"], choices: ["limited", "unlimited"] },
    ],
    explanation: "A sole trader is owned by one person and has unlimited liability.",
  });

  const prof = 36000, w1 = 4, w2 = 2;
  const sA = prof * w1 / (w1 + w2), sB = prof * w2 / (w1 + w2);
  chk(sA, 24000);
  chk(sB, 12000);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: sB, calculator: true, daily: true, wrong: [sA, prof / 2],
    stem: "Moyo and Sibanda are partners who agree to share profits in the ratio 4 : 2. The business makes a profit of US\\$36,000 for the year. How much does Sibanda receive?",
    hints: ["Total parts = 4 + 2 = 6."],
    explanation: "One part = 36,000 ÷ 6 = 6,000. Sibanda has 2 parts = US\\$12,000 (Moyo receives US\\$24,000). Sharing equally would give US\\$18,000, ignoring the ratio.",
  });
  const debts = 41000, assets = 29500, personal = 18000;
  const short = debts - assets;
  chk(short, 11500);
  chk(personal - short, 6500);
  b.num({
    d: 3, skill: "ANALYSIS", kind: "money", value: personal - short, calculator: true, wrong: [short, personal],
    stem: "A fictional sole trader in Gweru closes his business with debts of US\\$41,000. The assets are sold for US\\$29,500. He has personal property worth US\\$18,000. After paying the debts in full, how much personal property is left?",
    hints: ["First find the shortfall that the business assets cannot cover."],
    explanation: "Shortfall = 41,000 − 29,500 = 11,500. He must pay this from his personal property: 18,000 − 11,500 = US\\$6,500 left. US\\$11,500 is the amount lost, not what is left.",
  });
  const rem = 54000 - 9000;
  chk(rem / 3, 15000);
  b.num({
    d: 4, skill: "ANALYSIS", kind: "money", value: 9000 + rem / 3, calculator: true, wrong: [54000 / 3, rem / 3],
    stem: "Three partners share a profit of US\\$54,000. The agreement says that Tatenda receives a salary of US\\$9,000 first, and the remainder is shared equally among the three. Calculate the total Tatenda receives.",
    hints: ["Deduct the salary before sharing."],
    explanation: "Remainder = 54,000 − 9,000 = 45,000. Equal share = 15,000. Tatenda receives 9,000 + 15,000 = US\\$24,000. Dividing the whole profit by three gives US\\$18,000, which ignores the salary.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the type of liability faced by the owners of sole trader and partnership businesses.",
    accepted: ["unlimited liability", "unlimited"],
    explanation: "Sole traders and partners have unlimited liability.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain **one** advantage and **one** disadvantage of a partnership compared with a sole trader.",
    points: ["Advantage: more capital and skills are available", "Disadvantage: disagreements between partners may delay decisions", "Disadvantage developed: profit must be shared and each partner may be liable for the others' acts"],
    modelAnswer: "A partnership can raise more capital and bring a wider range of skills than a sole trader. However, partners may disagree, which can delay decisions, and they must share the profit and may be liable for each other's acts.",
    hints: ["Compare capital and skills with control and sharing."],
    explanation: "One advantage and one developed disadvantage.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Rudo, a fictional dressmaker in Harare, plans to take on a partner to open a second shop. Explain **two** reasons why a written partnership agreement would help.",
    points: ["It sets out how profits will be shared", "Application: Rudo and the partner will know how much each receives and avoid disputes", "It states each partner's duties and what happens if one leaves", "Application: the second shop can continue if one partner withdraws"],
    modelAnswer: "A written agreement sets out how the profit will be shared, so Rudo and her partner know what each receives and are less likely to dispute it. It also states each partner's duties and what happens if one leaves, so the second shop can continue to trade if one partner withdraws.",
    hints: ["Think of profit sharing and what happens if someone leaves."],
    explanation: "Two reasons, each linked to Rudo's case.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse why many sole traders find it hard to expand their businesses.",
    points: ["Finance is limited to the owner's savings and loans", "Lenders may refuse loans without security", "Unlimited liability makes the owner reluctant to borrow", "One person has limited time and skills to manage a larger business"],
    modelAnswer: "A sole trader's finance is limited to personal savings and loans. Lenders may refuse large loans without security, and unlimited liability makes the owner unwilling to borrow too much. As the business grows, one person also lacks the time and skills to manage everything.",
    hints: ["Consider finance, risk and management."],
    explanation: "A chain of constraints on growth.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain what is meant by a **producer co-operative** and give an example.",
    points: ["Members produce goods, such as crops, and combine to sell them", "They gain better prices or lower costs by acting together", "Example: farmers selling vegetables jointly to hotels"],
    modelAnswer: "A producer co-operative is a group of producers, such as farmers, who combine to sell or process their output. By acting together they obtain better prices and share costs. For example, vegetable growers may sell jointly to hotels.",
    hints: ["Think of who the members are and what they do together."],
    explanation: "Definition, benefit and example.",
    applies: ZIM,
  });

  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Fictional partners Farai, Chipo and Sipho own a transport business in Mutare. Their partnership agreement says that Chipo, who drives full time, receives a salary of US\\$7,200 a year first. The remainder of the profit is shared in the ratio 3 : 2 : 1 to Farai, Chipo and Sipho. The profit for the year is US\\$31,200.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: 31200 - 7200, stem: "Calculate the profit remaining after Chipo's salary.", wrong: [31200, 7200], explanation: "31,200 − 7,200 = US\\$24,000." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: 7200 + 24000 * 2 / 6, stem: "Calculate Chipo's total share of the profit for the year, including her salary.", wrong: [24000 * 2 / 6, 31200 * 2 / 6], explanation: "One part = 24,000 ÷ 6 = 4,000. Chipo has 2 parts = 8,000. Total = 7,200 + 8,000 = US\\$15,200." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain **one** advantage and **one** disadvantage of having a written agreement like this one.", points: ["Advantage: everyone knows how profit is shared, which reduces disputes", "Advantage developed: Chipo is rewarded for the extra work she does", "Disadvantage: it may need updating if duties or capital change, and partners may disagree about changes"], modelAnswer: "The agreement shows how profit is shared, which reduces disputes, and rewards Chipo for working full time. However, it may need updating when duties or capital change, and partners may disagree about the changes.", explanation: "Advantage with development and a disadvantage." }),
    ],
    hints: ["Deduct the salary before using the ratio."],
    explanation: "Remainder US$24,000; Chipo US$15,200 in total.",
  });
  b.struct({
    d: 4, skill: "EVALUATION",
    stem: "Fictional sole trader Nyasha runs a bakery in Chinhoyi. She has US\\$6,000 in savings and wants to open a second site that needs US\\$18,000. Her bank manager would lend US\\$12,000 if she offers her house as security. Her cousin Tendai, a retired cook, offers to join her as a partner and invest US\\$12,000.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Explain why Nyasha's liability is a concern if she borrows from the bank.", points: ["As a sole trader she has unlimited liability", "If the new site fails she must repay from personal property", "The bank has asked for her house as security, so she could lose her home"], modelAnswer: "As a sole trader Nyasha has unlimited liability, so if the second site fails she must repay the loan from her own property. The bank wants her house as security, so she could lose her home.", explanation: "Unlimited liability applied to the loan." }),
      P.manual({ label: "(b)", marks: 6, stem: "Evaluate whether Nyasha should borrow from the bank or take Tendai as a partner.", points: ["Bank loan: Nyasha keeps control and all the profit", "Bank loan: her house is at risk", "Partner: no loan or house at risk; Tendai also brings help", "Partner: profit and decisions are shared, and disagreements are possible", "Partner: Tendai would also have unlimited liability for the debts", "Judgement and reason"], modelAnswer: "Borrowing lets Nyasha keep control and all the profit, but she risks her house if the second site fails. A partnership with Tendai avoids the loan and brings an extra worker, but she must share profit and decisions, and they may disagree. On balance a partnership with a written agreement is the safer choice, because it protects her house; she should take the loan only if she is confident of the new site's profit.", hints: ["Compare risk with control."], explanation: "Both options weighed and a judgement given." }),
    ],
    hints: ["Think about risk and control."],
    explanation: "Unlimited liability puts her house at risk; a partner shares both risk and profit.",
  });

  b.card("DEFINITION", "Sole trader", "A business owned and usually run by one person, who keeps all the profit and has unlimited liability.");
  b.card("DEFINITION", "Partnership", "A business owned by two or more people who share capital, work, profit and risk, usually under a partnership agreement.");
  b.card("DEFINITION", "Co-operative", "A business owned and run by its members, with one member one vote and profit shared among members.");
  b.card("DEFINITION", "Unlimited liability", "An owner is responsible for all the business's debts, including from personal property.");
  b.card("CONCEPT", "Partnership agreement", "A written document setting capital, duties, profit shares and what happens when a partner leaves; without one, profit is normally shared equally.");
  b.card("FACT", "Advantages of the sole trader", "Total control, keeps all profit, few formalities, close contact with customers.");
  b.card("FACT", "Disadvantages of the sole trader", "Unlimited liability, limited finance, heavy workload, business may end with the owner.");
  b.card("FACT", "Advantages and disadvantages of partnership", "More capital and skills, shared workload; but unlimited liability, disagreements and shared profits.");
  b.card("FACT", "Kinds of co-operative", "Producer (sell members' produce together), consumer (buy goods together) and worker (members run the business).", undefined, { applies: ZIM });
});
