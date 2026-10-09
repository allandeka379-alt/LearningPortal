// W2a: business opportunities and risks; likelihood and impact (BES only).
import { concept, P } from "../lib.mjs";

concept("bus.enterprise.opportunities-risks", { file: "enterprise/opportunities-risks", keyPrefix: "enterprise.opportunities-risks" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **business opportunity**?",
    options: [
      ["A situation in which a need could be met profitably", "Correct: an unmet or poorly met demand."],
      ["A loan offered by a commercial bank", "A loan is a source of finance."],
      ["A legal document that is needed before starting to trade", "That is a licence or certificate."],
      ["A risk that a business may fail", "That is a business risk."],
    ],
    answer: "A",
    explanation: "An opportunity is a favourable situation where a business could profitably meet a need or want not yet met well.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In assessing a risk, what does **likelihood** mean?",
    options: [
      ["How probable it is that the risk will happen", "Correct: the chance of the event."],
      ["How serious the effect would be if it did happen", "That is impact (magnitude)."],
      ["How much insurance would cost", "That is the premium."],
      ["How long the business has traded", "That is not part of the assessment."],
    ],
    answer: "A",
    explanation: "Likelihood is the probability of the risk occurring; impact is how serious its effect would be.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "More families in a town now buy mobile data bundles instead of newspapers. Which source of opportunity does this show?",
    options: [
      ["Changes in taste and new technology", "Correct: new technology has changed what people buy."],
      ["Changes in the size of the population", "The number of people has not changed in the stem."],
      ["Government policy", "No policy is mentioned."],
      ["Research and development by the business", "The change is in consumers' behaviour."],
    ],
    answer: "A",
    explanation: "Technology changes tastes and habits, creating opportunities such as selling data and phone services.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is an example of an **operational** risk?",
    options: [
      ["The main machine breaks down", "Correct: it stops production."],
      ["Customers prefer a competitor's product", "That is a market risk."],
      ["A loan cannot be repaid on time", "That is a financial risk."],
      ["A new tax on the product is introduced", "That is a legal or political risk."],
    ],
    answer: "A",
    explanation: "Operational risks affect day-to-day running: breakdowns, theft, fire, supply and power problems.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Real incomes fall. Which business is most likely to see an opportunity?",
    options: [
      ["A shop selling second-hand clothes", "Correct: demand for cheaper goods rises when real incomes fall."],
      ["A shop selling luxury watches", "Demand for luxury goods usually falls."],
      ["A travel agent selling overseas holidays", "Demand for luxury services usually falls."],
      ["A dealer in new cars", "Demand for expensive new cars usually falls."],
    ],
    answer: "A",
    explanation: "Falling real incomes increase demand for cheaper goods, repairs and second-hand products.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A risk is rated likelihood 1 (unlikely) and impact 3 (severe). Another is rated likelihood 3 (likely) and impact 2 (serious). Using likelihood × impact, which statement is correct?",
    options: [
      ["The second risk has the higher rating", "Correct: 3 × 2 = 6 compared with 1 × 3 = 3."],
      ["The first risk has the higher rating", "1 × 3 = 3, which is lower than 6."],
      ["Both risks have the same rating", "The ratings are 3 and 6."],
      ["Only the impact matters", "Both likelihood and impact are used."],
    ],
    answer: "A",
    explanation: "Rating = likelihood × impact: 1 × 3 = 3 and 3 × 2 = 6, so the likely, serious risk ranks higher.",
    hints: ["Multiply likelihood by impact for each risk."],
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which action best reduces **market risk** before starting a business?",
    options: [
      ["Carrying out market research", "Correct: it tests whether there is enough demand."],
      ["Insuring the premises against fire", "This reduces operational risk."],
      ["Choosing limited liability", "This protects personal assets, not demand."],
      ["Installing a security alarm", "This reduces theft risk."],
    ],
    answer: "A",
    explanation: "Market research checks demand, competitors and prices before money is committed.",
    hints: ["Market risk is about customers."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A severe risk that is very unlikely to happen always deserves more attention than a moderate risk that is almost certain.",
    answer: false,
    explanation: "False. Both likelihood and impact matter; an almost-certain moderate risk may rank higher.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Globalisation can create opportunities by giving businesses access to foreign suppliers and export markets.",
    answer: true,
    explanation: "True. Globalisation opens new markets and cheaper sources of inputs.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each change with the source of opportunity it represents.",
    pairs: [
      ["A university opens in a small town", "Change in the size and structure of the population"],
      ["A new law requires helmets for motorcyclists", "Government policy"],
      ["Scientists develop a pest-resistant groundnut seed", "Research and development"],
      ["Young people want locally designed clothing", "Change in taste and fashion"],
    ],
    explanation: "Opportunities come from many kinds of change; name the source and give an example.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each risk with its type.",
    pairs: [
      ["Drought destroys a maize crop", "Natural risk"],
      ["A competitor halves its prices", "Market risk"],
      ["The bank raises interest on the loan", "Financial risk"],
      ["The trading licence is withdrawn", "Legal risk"],
    ],
    explanation: "Classifying risks helps choose the right response.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentence.",
    template: "A risk can be judged by its {{blank:a}} (how probable it is) and its {{blank:b}} (how serious its effect would be).",
    blanks: [
      { id: "a", accepted: ["likelihood", "probability"] },
      { id: "b", accepted: ["impact", "magnitude"] },
    ],
    wrong: [["impact", "likelihood"]],
    explanation: "Likelihood and impact (magnitude) are the two dimensions of a risk.",
  });
  {
    const lik = 3, imp = 3, rating = lik * imp;
    b.num({
      d: 2, skill: "APPLICATION", kind: "plain", value: rating, daily: true,
      stem: `Using the scale likelihood 1-3 and impact 1-3, a poultry farmer rates the risk of disease in his flock as likelihood ${lik} and impact ${imp}. Calculate the risk rating (likelihood × impact).`,
      wrong: [lik + imp, imp],
      explanation: `${lik} × ${imp} = ${rating}, the highest possible rating: the farmer must act now (vaccination, hygiene).`,
    });
  }
  {
    const a = [[2, 2], [1, 2]];
    const ta = a.reduce((s, [l, i]) => s + l * i, 0);
    b.num({
      d: 3, skill: "APPLICATION", kind: "plain", value: ta,
      stem: `Rudo rates two risks for a hair salon: staff leave (likelihood ${a[0][0]}, impact ${a[0][1]}) and equipment theft (likelihood ${a[1][0]}, impact ${a[1][1]}). Calculate the total risk rating for the salon by adding likelihood × impact for each risk.`,
      wrong: [a[0][0] + a[0][1] + a[1][0] + a[1][1], a[0][0] * a[0][1]],
      explanation: `${a[0][0]} × ${a[0][1]} = ${a[0][0] * a[0][1]}; ${a[1][0]} × ${a[1][1]} = ${a[1][0] * a[1][1]}; total = ${ta}.`,
      hints: ["Multiply each pair first.", "Then add the two ratings."],
    });
  }
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways in which business opportunities arise.",
    points: [
      "Way 1 identified, e.g. unmet demand (1)",
      "Explained with an example, e.g. no hardware shop in a growing township (1)",
      "Way 2 identified, e.g. new technology / change in population / government policy / globalisation (1)",
      "Explained with an example, e.g. mobile money creates demand for agents (1)",
    ],
    modelAnswer: "Opportunities arise from unmet demand: a growing township with no hardware shop offers a chance to open one. They also arise from new technology: mobile money created demand for agents who help customers deposit and withdraw cash.",
    explanation: "Name the source and give a specific example.",
    hints: ["Think about changes in technology and in where people live."],
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Suggest **two** ways a new market trader could reduce the risks she faces.",
    points: [
      "Way 1, e.g. start small / test the market first (1)",
      "Linked to the risk it reduces, e.g. less money lost if demand is low (1)",
      "Way 2, e.g. insure stock / keep records and a cash budget / diversify products / lockable storage (1)",
      "Linked, e.g. covers theft or fire / spots cash problems early / sales do not depend on one product (1)",
    ],
    modelAnswer: "She could start with a small stock to test demand, so she loses little if customers do not buy. She could also sell more than one product, so a fall in demand for one does not ruin the business.",
    explanation: "Each way must be linked to the risk it reduces.",
    hints: ["Which risks does a market trader face?"],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 840,
    stem: "Tendai plans to sell solar-powered phone charging at a busy rural bus stop. He lists three risks: (1) a rival copies his idea (likelihood 3, impact 2); (2) his solar panel is stolen (likelihood 2, impact 3); (3) heavy cloud for several days (likelihood 2, impact 1). Ratings are likelihood × impact.",
    parts: [
      P.num({
        label: "(a)", marks: 1, kind: "plain", value: 3 * 2,
        stem: "Calculate the rating for risk (1).",
        wrong: [5],
        explanation: "3 × 2 = 6.",
      }),
      P.num({
        label: "(b)", marks: 1, kind: "plain", value: 2 * 1,
        stem: "Calculate the rating for risk (3).",
        wrong: [3],
        explanation: "2 × 1 = 2.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Identify the source of the business opportunity and explain why it exists.",
        points: ["Unmet need / demand for phone charging (1)", "Many travellers wait at the bus stop (1)", "No electricity supply at the rural stop (1)"],
      }),
      P.manual({
        label: "(d)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "Recommend which risks Tendai should deal with first and how. Justify your answer.",
        points: [
          "Risks (1) and (2) both rate 6, so they are the priorities (1)",
          "Risk (1): build loyalty / extra services / low prices / good location (1)",
          "Risk (2): lock panel securely / take it home at night / insurance (1)",
          "Risk (3) rates 2: accept and monitor, e.g. a power bank as backup (1)",
          "Considers cost of each response (1)",
          "Justified recommendation (1)",
        ],
        modelAnswer: "Risks (1) and (2) both have a rating of 6, so they come first; risk (3) rates only 2. Theft would stop the business completely, so he should mount the panel securely and take it home each night, which costs little. To deal with copying, he should build loyalty with reliable service and offer extras such as selling airtime. Cloudy days can be handled with a charged power bank. He should start with theft protection because it is cheap and the loss would be total.",
      }),
    ],
    explanation: "Ratings: (1) 6, (2) 6, (3) 2. Act first on the high-rated risks.",
    hints: ["Multiply likelihood by impact.", "Which risks have the highest ratings?"],
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 780,
    stem: "The population of a fictional mining town has grown quickly as a new mine opened. Many workers are young and single, and incomes in the town have risen. However, the mine's future depends on world mineral prices.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Explain **two** business opportunities created by these changes.",
        points: ["Opportunity 1, e.g. rented rooms / housing (1)", "Linked: growing population of single workers (1)", "Opportunity 2, e.g. restaurants, entertainment, mobile money, transport (1)", "Linked: rising incomes increase spending on services (1)"],
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain **two** risks faced by businesses in the town.",
        points: ["Risk 1: mine closes if mineral prices fall (1)", "Effect: demand collapses as workers leave (1)", "Risk 2: competition as many traders arrive / rising rents (1)", "Effect: lower prices and profit (1)"],
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Suggest how an enterpriser could take advantage of the opportunities while limiting the risks.",
        points: ["Start small / rent rather than buy premises (1)", "Keeps losses low if the mine closes (1)", "Diversify / serve customers beyond the mine, e.g. nearby farmers (1)", "Not dependent on mine workers alone (1)"],
      }),
    ],
    explanation: "Population growth and rising incomes create opportunities; dependence on one mine is a major economic risk.",
    hints: ["Who lives in the town and what do they need?", "What happens if the mine closes?"],
  });
  b.card("DEFINITION", "Business opportunity", "A favourable situation in which a business could profitably meet an unmet or poorly met need.");
  b.card("DEFINITION", "Business risk", "The possibility that an event will cause a loss or stop a business reaching its objectives.");
  b.card("FACT", "Sources of opportunity", "Unmet demand, new technology, R&D, expansion, taste and fashion, population, real income, globalisation, government policy.");
  b.card("FACT", "Types of risk", "Market, financial, operational, economic, legal and political, natural, people.");
  b.card("DEFINITION", "Likelihood", "How probable it is that a risk will happen.");
  b.card("DEFINITION", "Impact (magnitude)", "How serious the effect would be if the risk happened.");
  b.card("FORMULA", "Risk rating", "Likelihood × impact (e.g. each on a 1-3 scale gives 1 to 9); act first on the highest ratings.");
  b.card("CONCEPT", "Reducing risk", "Market research, start small, insurance, diversification, records and cash budgets, limited liability, contracts.");
});
