// W2b: business ethics and social responsibility.
import { concept, P, money, f } from "../lib.mjs";

const eRev = 186000, eCost0 = 151000, eExtra = 13500;
const eP0 = f.profit(eRev, eCost0), eP1 = f.profit(eRev, eCost0 + eExtra); // 35000, 21500

concept("bus.enterprise.ethics", { file: "enterprise/ethics", keyPrefix: "enterprise.ethics" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What are business ethics?",
    options: [
      ["Moral principles about what is right and fair in business", "Correct: ethics go beyond what is legal or profitable."],
      ["The laws and regulations that every business must obey", "Laws are the minimum; ethics are about what is right."],
      ["The methods used to calculate profit", "That is accounting, not ethics."],
      ["The rules for forming a limited company", "That is company formation, not ethics."],
    ],
    answer: "A",
    explanation: "**Business ethics** are moral principles that guide businesses to do what is right and fair, not only what is legal or profitable.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A trader sells bags of sugar labelled 2 kg that contain only 1.8 kg. What kind of unethical practice is this?",
    options: [
      ["Short weight", "Correct: customers receive less than they pay for."],
      ["Child labour", "No children are involved."],
      ["Bribery", "No one is being paid to act dishonestly."],
      ["Unfair wages", "The issue concerns customers, not workers."],
    ],
    answer: "A",
    explanation: "Selling less than the stated quantity is **short weight**: dishonest, unethical and illegal.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is an example of corporate social responsibility?",
    options: [
      ["A mining company drills a borehole for a nearby village", "Correct: it goes beyond the law to help the community."],
      ["A shop pays the tax it owes on time", "Paying tax is a legal duty, not going beyond the law."],
      ["A factory raises prices to increase profit", "This is a pricing decision, not social responsibility."],
      ["A company reduces its costs by dismissing some of its workers", "This does not consider society's interests."],
    ],
    answer: "A",
    explanation: "**CSR** means acting responsibly towards society and the environment beyond legal requirements, such as providing water to a community.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the most likely disadvantage to a business of buying only from environmentally responsible suppliers?",
    options: [
      ["Higher costs and lower short-term profit", "Correct: responsible suppliers often charge more."],
      ["A worse reputation with customers", "Ethical buying usually improves reputation."],
      ["More pressure-group campaigns against it", "Pressure groups usually target irresponsible firms."],
      ["Less motivated employees", "Employees usually prefer working for ethical firms."],
    ],
    answer: "A",
    explanation: "Ethical choices often **raise costs** in the short run, which can reduce profit or force higher prices.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why might an ethical business still earn higher long-term profits than a rival that cuts corners?",
    options: [
      ["Its reputation builds customer loyalty and avoids boycotts", "Correct: trust brings repeat sales and fewer legal problems."],
      ["Ethical businesses pay no taxes", "Ethical businesses pay their taxes."],
      ["Ethical businesses always have lower costs", "Ethical choices often raise costs."],
      ["The law forbids customers from buying from unethical firms", "There is no such law."],
    ],
    answer: "A",
    hints: ["Think about reputation and customers' choices over many years."],
    explanation: "A good **reputation** brings loyal customers, motivated staff and fewer fines or boycotts, which can outweigh the higher costs.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which action is legal but may still be considered unethical?",
    options: [
      ["Advertising sugary snacks heavily to young children", "Correct: it may be legal, but many see it as exploiting children."],
      ["Paying a bribe to an official to win a contract", "Bribery is illegal as well as unethical."],
      ["Selling goods using tampered scales", "Short weights are illegal."],
      ["Hiding income to avoid paying tax", "Tax evasion is illegal."],
    ],
    answer: "A",
    hints: ["Three of the options break the law."],
    explanation: "Ethics go beyond the law: targeting young children with adverts for unhealthy food may be legal but is widely seen as wrong.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A food processor in Mutare pays small-scale fruit farmers a price below their cost of growing the fruit because the farmers have no other buyer. Which ethical issue does this raise?",
    options: [
      ["Fair prices to suppliers", "Correct: the business uses its power to underpay suppliers."],
      ["Honest advertising", "Advertising is not involved."],
      ["Child labour", "No children are mentioned."],
      ["Bribery of government officials", "No officials are involved."],
    ],
    answer: "A",
    explanation: "Paying suppliers below their costs because they have no alternative is an issue of **fair prices to suppliers**.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What is an ethical code?",
    options: [
      ["A written statement of how employees are expected to behave", "Correct: also called a code of conduct."],
      ["A password used to protect the business's computer records", "That is a security code, not an ethical code."],
      ["A set of prices agreed with competitors", "Agreeing prices with rivals is itself usually unethical."],
      ["A government licence to trade", "A licence is a legal permit."],
    ],
    answer: "A",
    explanation: "An **ethical code** sets out expected behaviour, for example on gifts, honesty and treatment of customers.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Every action that is legal is also ethical.",
    answer: false,
    explanation: "False. The law sets a minimum; some legal actions, such as paying suppliers unfairly low prices, are still unethical.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Behaving ethically can help a business to recruit and keep good employees.",
    answer: true,
    explanation: "True. Many people prefer to work for a business they respect, and fair treatment improves motivation.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each situation with the ethical issue it raises.",
    pairs: [
      ["A farm employs twelve-year-olds during school term", "Child labour"],
      ["A builder pays an inspector to ignore safety faults", "Bribery"],
      ["An advert claims a cream cures all skin diseases", "Dishonest advertising"],
      ["A factory dumps waste oil in a stream", "Damage to the environment"],
    ],
    explanation: "Each situation harms a stakeholder group: children, the public, customers or the community.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "When a business takes responsibility for its effects on society beyond what the law requires, this is called corporate social {{blank:a}}. Ethical behaviour usually raises costs in the {{blank:b}} term.",
    blanks: [
      { id: "a", accepted: ["responsibility"], choices: ["responsibility", "ownership", "liability", "integration"] },
      { id: "b", accepted: ["short"], choices: ["short", "long"] },
    ],
    explanation: "Corporate social **responsibility**; costs rise in the **short** term, while benefits often come in the long term.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A furniture maker has annual sales revenue of ${money(eRev)} and total costs of ${money(eCost0)}. It decides to buy timber only from a supplier that replants its forests, which adds ${money(eExtra)} a year to its costs. Assuming revenue does not change, calculate its profit after the change.`,
    kind: "money", value: eP1, wrong: [eP0, eP0 + eExtra],
    hints: ["Add the extra cost to total costs, then subtract from revenue."],
    explanation: `New total costs = ${money(eCost0 + eExtra)}; profit = ${money(eRev)} − ${money(eCost0 + eExtra)} = ${money(eP1)} (down from ${money(eP0)}). The business must judge whether a better reputation will win back the difference.`,
  });
  b.manualShort({
    d: 3, marks: 4, skill: "UNDERSTANDING",
    stem: "Explain **two** reasons why a business may choose to behave ethically.",
    points: [
      "Better reputation / customer loyalty.",
      "Explains: customers prefer to buy from responsible firms, raising sales.",
      "Motivated staff / avoids fines and boycotts / attracts investors.",
      "Explains the second reason.",
    ],
    hints: ["Think about customers, workers and the law."],
    modelAnswer: "A reputation for honesty makes customers trust the business and come back, which increases sales over time. Ethical behaviour also avoids fines, court cases and boycotts by pressure groups that could damage the business.",
    explanation: "Reasons: reputation, customer loyalty, staff motivation, investors, avoiding legal problems and boycotts.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "UNDERSTANDING",
    stem: "Describe **four** unethical practices of traders.",
    points: [
      "Short weights and measures.",
      "False descriptions / misleading advertising.",
      "Selling expired or unsafe goods.",
      "Overcharging / hoarding / not giving receipts / bribery.",
    ],
    hints: ["Think about weights, labels, dates and prices."],
    modelAnswer: "Traders may use tampered scales to give short weights, describe goods falsely (\"pure\" honey mixed with syrup), sell goods past their expiry date, and hoard goods to push up prices during a shortage.",
    explanation: "Unethical trading harms consumers and honest competitors.",
    applies: ["zimsec/o-level/commerce"],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "Thandeka's Fashions (a fictional business) makes school uniforms in Bulawayo. It can buy fabric from a cheap foreign supplier that has been reported to use child workers, or from a local mill that pays fair wages but charges more. Several schools have said they want uniforms that are \"made responsibly\".",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which ethical issue does the cheap supplier raise?",
        options: [["Child labour", "Correct: it has been reported to use child workers."], ["Bribery", "No bribes are mentioned."], ["Short weights", "Weights are not involved."], ["Tax evasion", "Tax is not mentioned."]],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain **two** advantages to Thandeka's Fashions of buying from the local mill.",
        points: [
          "Better reputation / meets schools' demand for responsibly made uniforms.",
          "So it may win or keep school contracts.",
          "Supports local jobs / reliable, nearby supply / no risk of scandal.",
          "Explains the effect on the business.",
        ],
        modelAnswer: "Schools want responsibly made uniforms, so buying from a fair-wage local mill helps the business win and keep school contracts. A nearby supplier is also more reliable, and there is no risk of a scandal if the foreign supplier's use of children becomes public.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Should Thandeka's Fashions buy from the local mill even though it costs more? Justify your answer.",
        points: [
          "Cost: higher fabric cost reduces profit or raises prices.",
          "Some customers (parents) are price-sensitive.",
          "Benefit: schools' demand; reputation; avoids risk of boycott or bad publicity.",
          "Long-term vs short-term profit.",
          "Could mention the ethical choice in marketing to schools.",
          "Justified decision.",
        ],
        modelAnswer: "Buying from the local mill raises costs, so Thandeka's Fashions must either accept lower profit or charge more, and some parents choose the cheapest uniform. However, its customers are mainly schools, which have said they want responsibly made uniforms, so the ethical choice protects its main source of sales. If the use of child workers by the foreign supplier became public, the business could lose contracts altogether. It should buy from the local mill and use this in its marketing to schools, because the long-term gain in reputation and contracts outweighs the short-term rise in costs.",
      }),
    ],
    hints: ["(c) Who are the main customers, and what do they want?"],
    explanation: "Child labour is the issue. The ethical choice costs more but matches what the schools want and protects the business's reputation.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "A construction company in Harare is bidding for a contract to build a clinic. An official hints that a \"gift\" would make the company's bid successful. The company has had few contracts this year and may have to lay off workers.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Explain **two** reasons why paying the \"gift\" would be unethical.",
        points: [
          "It is a bribe: the contract should be won fairly.",
          "Honest competitors are treated unfairly.",
          "Public money may be wasted / the clinic may be built by a worse or dearer firm.",
          "It is illegal and encourages corruption.",
        ],
        modelAnswer: "The gift is a bribe, so the contract would be won unfairly, harming honest competitors with better bids. It also encourages corruption and may waste public money meant for a clinic that the community needs.",
      }),
      P.manual({
        label: "(b)", marks: 6,
        stem: "Evaluate the possible consequences for the company of paying and of refusing to pay.",
        points: [
          "Paying: wins the contract; jobs saved in the short run.",
          "Paying: risk of prosecution, fines, ban from public contracts, damaged reputation.",
          "Refusing: may lose this contract and lay off workers.",
          "Refusing: keeps reputation; can report the official; wins future contracts honestly.",
          "Weighs short-term against long-term effects.",
          "Justified conclusion.",
        ],
        modelAnswer: "Paying might win the contract and save jobs this year, but bribery is a crime: if discovered, managers could be prosecuted, the company fined and banned from public contracts, and its reputation ruined, which could end the business. Refusing may lose this contract and force some layoffs, but the company keeps its good name and can report the official. In the long run an honest reputation wins more contracts, so the company should refuse, even though the short-term cost is painful.",
      }),
    ],
    hints: ["(b) Compare what happens this year with what could happen later."],
    explanation: "Bribery is unethical and illegal. Paying offers a short-term gain but risks the company's future.",
  });
  b.card("DEFINITION", "What are **business ethics**?", "Moral principles guiding businesses to do what is right and fair, not only what is legal or profitable.");
  b.card("DEFINITION", "What is **corporate social responsibility (CSR)**?", "Taking responsibility for the effects of business decisions on society and the environment, beyond legal requirements.");
  b.card("FACT", "Six ethical issues in business?", "Fair wages and conditions, child labour, fair prices to suppliers, honest advertising, bribery, the environment (and tax).");
  b.card("CONCEPT", "Advantages of being ethical?", "Reputation, customer loyalty, motivated staff, attracts investors, avoids fines and boycotts.");
  b.card("CONCEPT", "Disadvantages of being ethical?", "Higher costs, possibly higher prices, lower short-term profit, may be undercut by rivals.");
  b.card("CONCEPT", "Legal vs ethical?", "The law is the minimum; some legal actions are still unethical (e.g. underpaying powerless suppliers).");
  b.card("DEFINITION", "What is an **ethical code**?", "A written code of conduct setting out how employees should behave.");
  b.card("FACT", "Examples of CSR?", "Community projects (boreholes, classrooms), staff training, recycling, buying locally, health programmes.");
});
