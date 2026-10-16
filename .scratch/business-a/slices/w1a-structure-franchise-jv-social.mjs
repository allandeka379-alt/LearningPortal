// W1a: structure.franchise-jv-social (Cambridge AS only; tagged automatically)
import { concept, P, table, r2, money, chk } from "../lib.mjs";
import { mc } from "../tables/w1a-lib.mjs";

concept("abus.structure.franchise-jv-social", { file: "structure/franchise-jv-social", keyPrefix: "structure.franchise-jv-social" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "In a franchise agreement, who is the **franchisee**?",
    ok: ["The person who pays to use the brand", "Correct: the franchisee trades under the franchisor's name and pays fees."],
    bad: [["The owner of the brand who grants the right", "That is the franchisor."], ["A customer who buys from the outlet", "Customers are not party to the agreement."], ["A bank that lends money to the outlet", "A lender is not the franchisee."]],
    explanation: "The franchisee buys the right to operate under the franchisor's brand.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What is a **joint venture**?",
    ok: ["Two or more firms jointly set up a business", "Correct: they share ownership, risk and reward of the project."],
    bad: [["One firm buys another against its wishes", "That is a hostile takeover."], ["An owner sells shares on a stock exchange", "That is a share issue."], ["A business trades only for a social purpose", "That is a social enterprise."]],
    explanation: "A joint venture is a new business jointly owned by two or more firms.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is a **benefit to a franchisee**?",
    ok: ["It receives a proven brand and training", "Correct: a tested business format reduces the risk of failure."],
    bad: [["It pays no fees of any kind", "Franchisees normally pay an initial fee and royalties."], ["It may change the products without permission", "Franchisees must usually follow the franchisor's rules."], ["It keeps all the profit without sharing", "Royalties take a share of revenue."]],
    explanation: "A brand and support reduce risk, in return for fees and less freedom.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "What is a defining feature of a **social enterprise**?",
    ok: ["It trades mainly to meet a stated social aim", "Correct: most of its profit is reinvested in that purpose."],
    bad: [["It pays all its profit to shareholders", "That is typical of a profit-making company."], ["It is never allowed to sell goods or services", "It earns income by trading."], ["It is always owned by the national government", "Social enterprises can be privately run."]],
    explanation: "A social enterprise combines trading with a social or environmental purpose.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional pizza chain lets an entrepreneur in Gweru trade under its name, use its recipes and receive training, in return for a fee and a share of sales. For the chain, what is the main advantage of this arrangement?",
    ok: ["It can expand its brand fairly cheaply", "Correct: the franchisee supplies the capital for the outlet."],
    bad: [["It keeps all the profit from every outlet it licenses", "The franchisee keeps most of an outlet's profit."], ["It no longer has to protect its brand name", "A poor outlet can harm the brand, so it must monitor standards."], ["It is certain the outlet will succeed", "Success is never guaranteed."]],
    hints: ["Who pays for the new outlet?"],
    explanation: "The franchisor grows through the franchisee's capital and effort.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "Two fictional firms, a software company in Harare and a telecoms firm in Johannesburg, set up a jointly owned company to sell a mobile payment service in both countries. Which is the **most likely** reason for the joint venture?",
    ok: ["To combine technology and market knowledge", "Correct: each partner brings strengths the other lacks."],
    bad: [["To remove all competition from the market", "A joint venture does not remove all competitors."], ["To avoid sharing any profits", "Profits are shared."], ["To make decisions faster than a sole trader", "Joint decision-making is usually slower."]],
    hints: ["Think what each firm brings."],
    explanation: "Joint ventures pool different strengths and share cost and risk.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Why might a joint venture between two firms with different management styles fail?",
    ok: ["Disagreements over control may delay decisions", "Correct: clashing cultures and shared control slow decisions."],
    bad: [["Joint ventures must always be run by a government", "A government need not be involved."], ["A joint venture can have no more than one owner", "A joint venture has two or more owners."], ["Profits cannot be shared once a venture starts", "Profits can be shared as agreed."]],
    hints: ["Consider how decisions are made when two firms share control."],
    explanation: "Shared control and different cultures are a common cause of friction.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A fictional inexperienced owner can start an independent café or buy a franchise with high fees. Which statement is the best judgement?",
    ok: ["A franchise is better if its support outweighs fees", "Correct: it sets the benefit against the cost and gives a condition."],
    bad: [["The franchise is always better, whatever the fees", "High fees could make profits too low."], ["The independent café is always better, as franchises fail", "Franchises may be less risky for new owners."], ["It makes no difference which form is chosen", "The choice affects risk, cost and control."]],
    hints: ["Look for the answer that gives a condition."],
    explanation: "A good judgement compares support and brand against the fees and loss of freedom.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A franchisee normally pays an initial fee and a royalty based on sales.",
    answer: true,
    explanation: "True. The usual fees are an initial payment and a percentage of revenue.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A social enterprise does not try to make a profit.",
    answer: false,
    explanation: "False. A social enterprise trades and aims to make a profit, but it reinvests most of it in its social or environmental purpose.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term to its description.",
    pairs: [["Franchisor", "The owner of the brand who grants the right to use it"], ["Royalty", "A regular payment based on a percentage of sales"], ["Joint venture", "A business set up and owned by two or more firms together"], ["Social enterprise", "A business that reinvests most profit into a social aim"]],
    explanation: "Each term has a distinct meaning.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "A {{blank:a}} pays fees to use another firm's brand, while a {{blank:b}} is set up and owned jointly by two or more firms.",
    blanks: [
      { id: "a", accepted: ["franchisee"], choices: ["franchisee", "franchisor", "co-operative"] },
      { id: "b", accepted: ["joint venture"], choices: ["joint venture", "social enterprise", "sole trader"] },
    ],
    explanation: "A franchisee pays to use a brand; a joint venture is shared ownership of a project.",
  });

  const rev = 150000, roy = rev * 0.04, other = 105000;
  chk(roy, 6000);
  chk(rev - other - roy, 39000);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: rev - other - roy, calculator: true, daily: true, wrong: [rev - other, roy],
    stem: "A fictional franchisee runs a juice bar in Gaborone. Annual revenue is US\\$150,000 and costs before the royalty are US\\$105,000. The royalty is 4% of revenue. Calculate the profit for the year.",
    hints: ["Work out the royalty first."],
    explanation: "Royalty = 4% × 150,000 = 6,000. Profit = 150,000 − 105,000 − 6,000 = US\\$39,000. Ignoring the royalty gives US\\$45,000.",
  });
  const jp = 60000;
  chk(jp * 0.45, 27000);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: jp * 0.45, calculator: true, wrong: [jp * 0.55, jp / 2],
    stem: "Two fictional firms form a joint venture and agree to share profits 55 : 45. The joint venture earns a profit of US\\$60,000. How much goes to the firm with the 45% share?",
    hints: ["Use the percentage that belongs to that firm."],
    explanation: "45% × 60,000 = US\\$27,000 (the other firm receives US\\$33,000). Sharing equally would give US\\$30,000.",
  });
  const fee = 18000, prof = 24000;
  const pb = fee / prof;
  chk(pb, 0.75);
  b.num({
    d: 4, skill: "ANALYSIS", kind: "months", value: pb * 12, calculator: true, wrong: [18, 24],
    stem: "A franchisee pays an initial fee of US\\$18,000 and then earns an annual profit of US\\$24,000 (after royalties, spread evenly through the year). After how many months of profit has the initial fee been recovered?",
    hints: ["Divide the fee by the annual profit and convert years to months."],
    explanation: "18,000 ÷ 24,000 = 0.75 years = 9 months. Using 18 or 24 mixes up the fee and profit figures.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the person who owns the brand and grants the right to trade under it in a franchise.",
    accepted: ["franchisor", "the franchisor"],
    explanation: "The franchisor owns the brand and grants the franchise.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain **two** drawbacks of buying a franchise.",
    points: ["Fees and royalties reduce profit", "The franchisee must follow the franchisor's rules, so it has less freedom", "The franchisee's reputation depends on the franchisor and on other outlets"],
    modelAnswer: "A franchisee pays an initial fee and royalties, which reduce profit. It must follow the franchisor's rules on products and methods, so it has less freedom, and its reputation also depends on the franchisor and other outlets.",
    hints: ["Think about cost, freedom and reputation."],
    explanation: "Any two drawbacks, developed (3 marks).",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional building firm in Bulawayo is considering a joint venture with a Zambian firm to win a road contract. Explain **two** benefits of the joint venture.",
    points: ["The firms share the cost of equipment and finance", "Application: a road contract needs expensive machinery that neither may afford alone", "They share risk and combine local knowledge", "Application: the Zambian firm may know local suppliers and rules"],
    modelAnswer: "The two firms can share the cost of expensive road-building machinery, which neither might afford alone. They also share risk and combine knowledge, as the Zambian firm may know local suppliers and rules.",
    hints: ["Link each benefit to the road contract."],
    explanation: "Two benefits, each applied to the contract.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse how being a social enterprise might affect a bakery's ability to grow.",
    points: ["Profit is reinvested in the social aim, so less is available for expansion", "Investors may be reluctant to provide finance if returns are limited", "Public goodwill and loyal customers could raise sales", "Growth may therefore be slower than for a profit-maximising bakery but more stable"],
    modelAnswer: "A social enterprise reinvests most of its profit in its social aim, so less is available for expansion, and investors may be reluctant to lend if returns are limited. However, goodwill and loyal customers could raise sales. Growth may therefore be slower, but more stable.",
    hints: ["Consider the effect on finance and on customers."],
    explanation: "A balanced analysis.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "Evaluate whether a new, inexperienced entrepreneur should buy a franchise rather than start an independent business.",
    points: ["Franchise: proven brand, training and lower risk of failure", "Franchise: easier to obtain finance", "Franchise: fees and royalties reduce profit and the owner has little freedom", "Independent: freedom and all the profit, but higher risk and no support", "Counter-argument: a strong local idea may beat a franchise", "Judgement with a condition, e.g. franchise is better if its fees are affordable"],
    modelAnswer: "A franchise gives an inexperienced entrepreneur a proven brand, training and easier finance, so failure is less likely. However, fees and royalties reduce profit and the franchisee has little freedom. An independent business gives freedom and all the profit but with greater risk and no support. A franchise is the better choice if the fees are affordable and the brand is strong in the area.",
    hints: ["Compare risk reduction with cost and freedom."],
    explanation: "Both sides and a conditional judgement.",
  });

  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A fictional franchisee, Tatenda, runs a coffee outlet in Harare for a franchisor. He paid an initial fee of US\\$24,000. Each year the royalty is 6% of revenue. Last year revenue was US\\$180,000, cost of sales was US\\$72,000 and other running costs were US\\$64,000.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: 180000 * 0.06, stem: "Calculate the royalty paid last year.", wrong: [24000, 180000 * 0.6], explanation: "6% × 180,000 = US\\$10,800." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: 180000 - 72000 - 64000 - 10800, stem: "Calculate last year's profit after the royalty (before considering the initial fee).", wrong: [180000 - 72000 - 64000, 10800], explanation: "180,000 − 72,000 − 64,000 − 10,800 = US\\$33,200." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain **one** reason why Tatenda may be willing to pay the royalty every year.", points: ["The brand attracts customers who already know it", "He receives training and support from the franchisor", "Together these reduce the risk of failure and raise sales"], modelAnswer: "The franchisor's brand attracts customers who already know it, and he gets training and support. This reduces the risk of failure and raises sales above what an unknown independent café might achieve.", explanation: "A reason, developed." }),
    ],
    hints: ["Royalty first, then profit."],
    explanation: "Royalty US\\$10,800; profit US\\$33,200.",
  });
  b.struct({
    d: 4, skill: "EVALUATION",
    stem: "Fictional Nyasha has trained as a chef and wants to open a restaurant in Victoria Falls. She has US\\$20,000. The options are: (1) an independent restaurant as a sole trader; (2) a franchise costing US\\$35,000 with a 7% royalty; (3) a joint venture with a lodge owner who would provide the building and share profit equally.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Explain **one** advantage of the joint venture with the lodge owner to Nyasha.", points: ["The lodge owner provides the building, so she needs less capital", "Risk and cost are shared", "The lodge's guests give her ready customers"], modelAnswer: "The lodge owner provides the building, so Nyasha needs less capital, and the lodge's guests provide ready customers. Cost and risk are shared.", explanation: "An advantage developed using the case." }),
      P.manual({ label: "(b)", marks: 6, stem: "Evaluate which option is most appropriate for Nyasha.", points: ["Independent: control and all profit, but US\\$20,000 may be too little and she has no brand", "Franchise: tested brand but costs exceed her savings and royalties reduce profit", "Joint venture: shares cost and gives customers, but profit and decisions are shared", "Criteria: finance, risk, control and her aims", "Counter-argument: a joint venture depends on the lodge owner's trust and agreement", "Judgement and reason"], modelAnswer: "The franchise costs US\\$35,000, more than her savings, and the royalty would reduce profit. An independent restaurant would give her control but she has limited capital and no brand. The joint venture shares cost and gives ready customers, though profit and decisions are shared. As finance is her main constraint, the joint venture is most appropriate if the lodge owner agrees clear terms on decisions and profit.", hints: ["Use finance, risk and control as criteria."], explanation: "Three options judged against criteria with a conditional recommendation." }),
    ],
    hints: ["Which option suits her limited savings?"],
    explanation: "The joint venture best matches her limited capital, if terms are clear.",
  });

  b.card("DEFINITION", "Franchise", "An agreement in which a franchisor allows a franchisee to trade under its brand and methods in return for fees and royalties.");
  b.card("DEFINITION", "Franchisor and franchisee", "Franchisor: owner of the brand who grants the right. Franchisee: the person who pays to trade under the brand.");
  b.card("DEFINITION", "Joint venture", "An agreement between two or more businesses to set up and share the ownership, risk and reward of a project or new business.");
  b.card("DEFINITION", "Social enterprise", "A business that trades to meet a social or environmental purpose and reinvests most of its profit in it.");
  b.card("FACT", "Benefits and drawbacks of a franchise", "Franchisee: proven brand and support but fees, royalties and less freedom. Franchisor: faster growth but risk to its brand.");
  b.card("FACT", "Joint venture benefits and drawbacks", "Shared cost, risk and skills; but possible disagreement, culture clashes and shared profit.");
  b.card("CONCEPT", "Choosing a form of ownership", "Compare liability, finance, control, risk, tax and administration, and the owner's purpose.");
  b.card("CONCEPT", "Public sector bodies", "Owned by the state or local authority; aim to provide a service rather than maximise profit.");
  b.card("FORMULA", "Royalty", "Royalty = percentage rate × revenue, paid regularly by a franchisee to the franchisor.");
});
