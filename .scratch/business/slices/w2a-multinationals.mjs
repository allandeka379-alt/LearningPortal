// W2a: multinational companies (COM, CAM).
import { concept, P, money, fmt, round, COM, CAM } from "../lib.mjs";

concept("bus.organisation.multinationals", { file: "organisation/multinationals", keyPrefix: "organisation.multinationals" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a multinational company?",
    options: [
      ["A business that produces in more than one country", "Correct: it has operations, not just sales, in several countries."],
      ["A business that only exports its products", "Exporting alone does not make a firm multinational."],
      ["A business owned by several governments", "MNCs are usually privately owned."],
      ["A business with many shareholders in one country", "Many shareholders does not make a firm multinational."],
    ],
    answer: "A",
    explanation: "A multinational company (MNC) has factories, mines, offices or other operations in more than one country.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the **host country** of a multinational company?",
    options: [
      ["A country where it sets up operations", "Correct: the host receives the MNC's investment."],
      ["The country where its headquarters are", "That is the home (parent) country."],
      ["Any country that buys its exports", "Buying exports does not make a country a host."],
      ["The country with the most shareholders", "Shareholding does not decide the host country."],
    ],
    answer: "A",
    explanation: "Host countries receive the MNC's factories, mines or offices; the home country is where its headquarters are.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is an advantage of a multinational company to a **host** country?",
    options: [
      ["New jobs and training for local workers", "Correct: MNCs employ and train local people."],
      ["Profits sent back to the home country", "Repatriated profits are a disadvantage to the host."],
      ["Local firms forced out of business", "This is a disadvantage."],
      ["Faster use of non-renewable resources", "Exploitation of resources is a disadvantage."],
    ],
    answer: "A",
    explanation: "Host countries gain jobs, training, investment, technology, exports and tax revenue.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is meant by **repatriation of profits**?",
    options: [
      ["Sending profits back to the MNC's home country", "Correct: the gains leave the host country."],
      ["Reinvesting profits in the host country", "That keeps the profits in the host country."],
      ["Paying profits to local workers as bonuses", "That is profit sharing with employees."],
      ["Paying tax on profits to the host government", "That is corporate tax."],
    ],
    answer: "A",
    explanation: "Repatriation means profits earned in the host country are sent to the home country, so the host loses part of the benefit.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", applies: CAM,
    stem: "Which is a reason for a business to become a multinational?",
    options: [
      ["To avoid import tariffs by producing inside a market", "Correct: local production avoids trade barriers."],
      ["To pay higher wages than in its home country", "Firms usually seek lower costs, not higher wages."],
      ["To increase its transport costs", "Producing near customers reduces transport costs."],
      ["To reduce the number of markets it sells in", "MNCs aim to reach more markets."],
    ],
    answer: "A",
    explanation: "Businesses become multinational to cut costs, reach raw materials and new markets, avoid trade barriers and spread risk.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why are some multinational companies described as **footloose**?",
    options: [
      ["They can move production to cheaper countries easily", "Correct: this can cause sudden job losses in the host."],
      ["They do not pay any of their workers", "MNCs pay their workers."],
      ["They only sell products in their home country", "MNCs operate in several countries."],
      ["They are owned by the host government", "MNCs are usually privately owned."],
    ],
    answer: "A",
    explanation: "A footloose MNC can close a plant and move to a country with lower costs or better incentives, leaving the host with unemployment.",
    hints: ["What happens if costs rise in the host country?"],
  });
  b.mcq({
    d: 3, skill: "EVALUATION", applies: COM,
    stem: "Which condition would most increase the benefit of a new foreign-owned factory to Zimbabwe?",
    options: [
      ["Requiring it to train and promote local managers", "Correct: skills stay in the country."],
      ["Allowing it to send all its profits home", "This reduces the benefit to the host."],
      ["Exempting it from environmental rules", "This increases the risk of pollution."],
      ["Letting it import all its raw materials", "This reduces business for local suppliers."],
    ],
    answer: "A",
    explanation: "Host governments gain more from MNCs when skills, profits and supply contracts stay in the country and the environment is protected.",
    hints: ["Which condition keeps more of the gain in the host country?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A business that makes everything in Zimbabwe and exports to Zambia is a multinational company.",
    answer: false,
    explanation: "False. It only exports. A multinational must produce (have operations) in more than one country.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A multinational company can increase a host country's exports and foreign currency earnings.",
    answer: true,
    explanation: "True. Many MNCs export much of their output from the host country, earning foreign currency.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each effect of an MNC on a host country with its type.",
    pairs: [
      ["Local suppliers win contracts to supply the plant", "Advantage: business for local firms"],
      ["Senior posts go to foreign staff", "Disadvantage: few skilled jobs for locals"],
      ["Waste from the plant pollutes a river", "Disadvantage: environmental damage"],
      ["Local engineers learn new methods", "Advantage: technology transfer"],
    ],
    explanation: "Classify each effect and say who gains or loses.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentence.",
    template: "Investment by a business in factories or mines in another country is called foreign {{blank:a}} investment. The country where the MNC has its headquarters is its {{blank:b}} country.",
    blanks: [
      { id: "a", accepted: ["direct"] },
      { id: "b", accepted: ["home", "parent", "home (parent)"] },
    ],
    wrong: [["portfolio", "host"]],
    explanation: "Foreign direct investment (FDI); home or parent country.",
  });
  {
    const workers = 850, local = 731, pct = (local / workers) * 100;
    b.num({
      d: 2, skill: "APPLICATION", kind: "pct", value: pct, calculator: true,
      stem: `A multinational's factory in Bulawayo employs ${fmt(workers)} workers, of whom ${fmt(local)} are Zimbabwean. Calculate the percentage of workers who are Zimbabwean (to one decimal place).`,
      wrong: [round(((workers - local) / workers) * 100, 1), round(workers / local, 2)],
      explanation: `${fmt(local)} ÷ ${fmt(workers)} × 100 = ${round(pct, 1)}%.`,
    });
  }
  {
    const profit = 4800000, pctRep = 70, rep = (profit * pctRep) / 100, kept = profit - rep;
    b.num({
      d: 3, skill: "APPLICATION", kind: "money", value: kept, calculator: true, applies: COM,
      stem: `A foreign-owned mine makes a profit of ${money(profit)} in a year after tax and repatriates ${pctRep}% of it to its home country. How much of the profit stays in the host country?`,
      wrong: [rep, profit],
      explanation: `${pctRep}% repatriated = ${money(rep)}; profit kept = ${fmt(profit)} − ${fmt(rep)} = ${money(kept)}.`,
      hints: ["Find the amount sent home first.", "Subtract it from the total profit."],
    });
  }
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** disadvantages of multinational companies to a host country.",
    points: [
      "Disadvantage 1, e.g. competition forces local firms out (1)",
      "Explained, e.g. local jobs and entrepreneurs lost (1)",
      "Disadvantage 2, e.g. repatriation of profits / pollution / exploitation / footloose (1)",
      "Explained, e.g. less income stays in the country / damage to farming and health (1)",
    ],
    modelAnswer: "A large MNC with low costs and strong brands can force small local firms out of business, so local jobs and enterprises disappear. It may also send most of its profits back to its home country, so much of the benefit leaves the host country.",
    explanation: "Identify each disadvantage and explain its effect on the host.",
    hints: ["Think about local businesses and where the profits go."],
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4, applies: COM,
    stem: "Explain **two** effects on the **home (parent)** country when its multinational companies move production abroad.",
    points: [
      "Effect 1, e.g. jobs lost at home (1)",
      "Explained, e.g. factories close as production moves to cheaper countries (1)",
      "Effect 2, e.g. profits flow back / cheaper imports / less tax paid at home (1)",
      "Explained, e.g. higher income for shareholders / consumers pay less / lower government revenue (1)",
    ],
    modelAnswer: "Jobs are lost in the home country when factories close and production moves to countries with cheaper labour. On the other hand, profits earned abroad flow back to the home country, increasing income for its shareholders.",
    explanation: "Home-country effects can be positive (profits) or negative (jobs, tax).",
    hints: ["Which jobs move, and where do the profits go?"],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 900, calculator: true,
    stem: "A fictional multinational, GlobalBev, plans a bottling plant near Gweru. It will invest US\\$25 million, employ 400 people and build a road to the plant. It will compete with three small local drink makers, which together employ 150 people. GlobalBev will use large amounts of local water.",
    parts: [
      P.num({
        label: "(a)", marks: 1, kind: "plain", value: 400 - 150,
        stem: "If all three local firms closed, what would be the net change in jobs?",
        wrong: [400, 550],
        explanation: "400 new jobs − 150 lost = 250 more jobs.",
      }),
      P.mcq({
        label: "(b)", marks: 1,
        stem: "Which benefit to Gweru is shown by the new road?",
        options: [["Infrastructure development", "Correct: the road can be used by the community."], ["Repatriation of profits", "This is a cost to the host."], ["Technology transfer", "A road is infrastructure."], ["Lower competition", "Competition increases."]],
        answer: "A",
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain **two** problems the plant might cause for Gweru.",
        points: ["Problem 1: local drink makers close (1)", "Developed: 150 jobs and local entrepreneurs lost (1)", "Problem 2: heavy water use (1)", "Developed: shortages for households and farmers / environmental damage (1)"],
      }),
      P.manual({
        label: "(d)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "Evaluate whether the government should allow GlobalBev to build the plant. Give a justified conclusion.",
        points: [
          "Benefits: investment, 400 jobs, road, tax revenue (1)",
          "Benefits: possible exports and training (1)",
          "Costs: local firms and 150 jobs at risk; profits repatriated (1)",
          "Costs: water use and environmental damage (1)",
          "Conditions, e.g. water limits, local suppliers, training (1)",
          "Justified conclusion (1)",
        ],
        modelAnswer: "The plant brings US\\$25 million of investment, 400 jobs, a road and tax revenue, and even if all three local firms closed there would be 250 more jobs. However, local entrepreneurs could be forced out, much of the profit may be repatriated and the plant's water use could cause shortages for residents and farmers. The government should allow the plant on conditions: limits on water use, a commitment to buy from local suppliers and to train local managers. With these, the benefits outweigh the costs.",
      }),
    ],
    explanation: "Net jobs = 400 − 150 = 250. A judgement weighs investment, jobs and infrastructure against local closures, repatriation and water use.",
    hints: ["Subtract jobs lost from jobs created.", "Could conditions reduce the costs?"],
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 780, applies: CAM,
    stem: "SunHarvest, a fictional food company with headquarters in Europe, sells canned fruit across southern Africa. It currently exports cans from Europe and pays import tariffs in each country. It is considering opening a canning factory in Zimbabwe, close to fruit farms in the Eastern Highlands.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "Identify **two** features of a multinational company.",
        points: ["Operations/production in more than one country (1)", "Headquarters in a home country / very large / global brand (1)"],
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain **two** reasons why SunHarvest might open the factory in Zimbabwe.",
        points: ["Reason 1: close to raw materials (fruit farms) (1)", "Developed: fresher fruit and lower transport costs (1)", "Reason 2: avoid import tariffs / closer to southern African customers / lower costs (1)", "Developed: cheaper products, higher profit or sales (1)"],
      }),
      P.manual({
        label: "(c)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "Explain whether the Zimbabwean fruit farmers would benefit from SunHarvest's factory.",
        points: [
          "Benefit: a large, reliable buyer for fruit (1)",
          "Benefit: higher demand may raise prices / training in quality standards (1)",
          "Drawback: MNC's buying power may push prices down (1)",
          "Drawback: dependence on one buyer that could leave (footloose) (1)",
          "Considers contracts / what the outcome depends on (1)",
          "Justified conclusion (1)",
        ],
        modelAnswer: "Farmers would gain a large buyer close to their farms, which could raise demand and help them sell fruit that would otherwise be wasted, and SunHarvest may train them in quality. But as the main buyer it could use its power to push prices down, and farmers who depend on it would suffer if it moved the factory. Farmers would benefit overall if they sign contracts that fix fair prices and keep other buyers too.",
      }),
    ],
    explanation: "Producing near raw materials and inside a market avoids transport costs and tariffs; host suppliers gain a buyer but face its bargaining power.",
    hints: ["Where are the fruit and the customers?", "Think about price and dependence."],
  });
  b.card("DEFINITION", "Multinational company (MNC)", "A business that produces goods or services in more than one country.");
  b.card("DEFINITION", "Host country", "A country in which a multinational sets up operations.");
  b.card("DEFINITION", "Home (parent) country", "The country where a multinational has its headquarters.");
  b.card("DEFINITION", "Repatriation of profits", "Sending profits earned in the host country back to the MNC's home country.");
  b.card("FACT", "Why firms become multinational", "Lower costs, raw materials, new markets, avoid trade barriers, lower transport costs, spread risk, incentives.", null, { applies: CAM });
  b.card("CONCEPT", "Benefits to host countries", "Jobs, training, investment, technology transfer, exports, tax revenue, choice, business for local suppliers.");
  b.card("CONCEPT", "Costs to host countries", "Local firms forced out, repatriated profits, exploitation, pollution, few senior jobs for locals, footloose plants.");
  b.card("DEFINITION", "Footloose", "Able to move production easily to another country with lower costs.");
  b.card("CONCEPT", "Effects on the home country", "Gains repatriated profits and cheap imports; may lose jobs and tax as production moves abroad.", null, { applies: COM });
});
