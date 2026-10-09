// W1b: nature and purpose of insurance and assurance; risks; pooling; statistics; communal systems.
import { concept, P, money, round, check } from "../lib.mjs";

// Pooling / premium calculations (computed).
const shops = 2500;
const thefts = 35;
const avgTheft = 1800;
const expected = thefts * avgTheft; // 63,000
const perShop = expected / shops; // 25.2
const loading = 4.8;
const premium = round(perShop + loading, 2); // 30
check("premium", premium, 30);

const members2 = 120;
const funerals2 = 5;
const benefit2 = 864;
const perYear2 = (funerals2 * benefit2) / members2; // 36
const perMonth2 = round(perYear2 / 12, 2); // 3
check("society2", perMonth2, 3);

concept("bus.insurance.nature-purpose", { file: "insurance/nature-purpose", keyPrefix: "insurance.nature-purpose" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **premium**?",
    options: [
      ["The amount the insured pays the insurer for cover", "Correct: premiums are paid monthly or yearly in return for cover."],
      ["The amount the insurer pays to the insured after a loss", "That is compensation (the claim settlement)."],
      ["The maximum value covered by a policy", "That is the sum insured."],
      ["A document giving temporary cover", "That is a cover note."],
    ],
    answer: "A",
    explanation: "The **premium** is the price of insurance, paid by the insured to the insurer.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How does assurance differ from insurance?",
    options: [
      ["Assurance covers an event that is certain to happen", "Correct: life assurance covers death, which is certain, though its timing is not."],
      ["Assurance covers only damage to buildings", "Building damage is covered by fire insurance."],
      ["Assurance pays out only if a loss may or may not happen", "That describes insurance."],
      ["Assurance never requires premiums", "Assurance policies require premiums."],
    ],
    answer: "A",
    explanation: "**Insurance** covers risks that may or may not happen (fire, theft); **assurance** covers events that will happen (death) or pays at a fixed date.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which risk is **non-insurable**?",
    options: [
      ["Losing customers because of a change in fashion", "Correct: fashion changes cannot be predicted with statistics and depend on the firm's decisions."],
      ["Fire destroying a warehouse", "Fire is a classic insurable risk."],
      ["Theft of stock in a burglary", "Burglary is insurable."],
      ["A delivery van being damaged in an accident", "Motor accidents are insurable."],
    ],
    answer: "A",
    explanation: "Non-insurable risks include changes in fashion or demand, competition, poor management and trading losses: no reliable statistics exist and the business controls much of the outcome.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is meant by **pooling of risks**?",
    options: [
      ["Many people pay premiums into a fund that pays the few who suffer losses", "Correct: the losses of the unlucky few are shared by everyone in the pool."],
      ["Several insurers merge into one large insurance company", "That is a merger, not pooling of risks."],
      ["The insured pays the full cost of any loss out of his or her own savings", "Pooling exists so the insured does not bear the full loss."],
      ["Insurers share one office building to save costs", "Sharing premises is not what pooling of risks means."],
    ],
    answer: "A",
    explanation: "**Pooling**: premiums from many people facing the same risk form one fund, from which those who suffer a loss are compensated.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Under *zunde ramambo*, villagers work the chief's field and the harvest is stored. Who mainly benefits from the stored grain?",
    options: [
      ["Needy families such as orphans and widows, especially in drought", "Correct: the grain is a communal safety net for those in need."],
      ["The chief, who sells it to traders for a profit", "The purpose is communal protection, not the chief's profit."],
      ["Traders who buy it cheaply to export to other countries", "The grain is kept for local need, not trade."],
      ["Insurance companies that hold it as premiums", "Zunde ramambo is a traditional system, not run by insurers."],
    ],
    answer: "A",
    explanation: "**Zunde ramambo** (isiphala senkosi) is a communal system of insurance: grain from the chief's field supports vulnerable families and the community in times of hunger.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why does an insurer charge a higher fire premium for a house with a thatched roof than for one with a tiled roof?",
    options: [
      ["Statistics show thatched roofs catch fire more often", "Correct: a higher probability of loss means a higher premium."],
      ["Thatched houses are always worth more", "Premiums depend mainly on risk, not on an assumption about value."],
      ["Insurers do not like traditional buildings", "Premiums are set from statistics, not preferences."],
      ["The law fixes higher premiums for rural areas", "Premiums are not fixed by law in this way."],
    ],
    answer: "A",
    hints: ["Premiums reflect the probability of a loss."],
    explanation: "Actuaries use statistics on how often losses happen: the higher the risk, the higher the premium.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which condition must a risk meet to be insurable?",
    options: [
      ["The loss must happen by chance and be measurable in money", "Correct: insurable losses are accidental and can be valued."],
      ["The loss must be certain to happen within a year", "Certain events are covered by assurance, not ordinary insurance."],
      ["The insured must be able to control whether it happens", "Losses the insured controls are not insurable."],
      ["Only one person in the country must face the risk", "Many people must face it so that statistics exist and risks can be pooled."],
    ],
    answer: "A",
    hints: ["Think about chance, money value and statistics."],
    explanation: "Insurable risks are accidental, measurable in money, common enough for statistics to predict them, and the insured has an insurable interest.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Burial societies are a communal system of sharing the cost of funerals among members.",
    answer: true,
    explanation: "True. Members pay small regular contributions and the society pays when a member or family member dies.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A business can take out insurance to protect itself against making a trading loss.",
    answer: false,
    explanation: "False. Trading losses result from business decisions and market conditions that cannot be predicted statistically, so they are non-insurable. Profit is the reward for bearing them.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Classify each risk.",
    pairs: [
      ["Fire in a factory", "Business risk, insurable"],
      ["Death of a breadwinner", "Life risk, covered by assurance"],
      ["A rival opening a cheaper shop next door", "Non-insurable business risk"],
      ["Injury to a worker at work", "Business risk (liability), insurable"],
    ],
    explanation: "Fire and injury at work are insurable business risks; death is a life risk covered by assurance; competition is non-insurable.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentence.",
    template: "Insurers use {{blank:a}} about past losses to predict future claims, and the experts who calculate premiums from them are called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["statistics", "statistical data", "data"], wrong: "guesses" },
      { id: "b", accepted: ["actuaries", "actuary"], wrong: "brokers" },
    ],
    explanation: "**Statistics** show how often and how large losses are; **actuaries** use them to set premiums.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: premium, calculator: true,
    stem: `An insurer covers ${shops.toLocaleString("en-GB")} tuck shops against burglary. Its records show about ${thefts} burglaries a year, with an average loss of ${money(avgTheft)}. It adds ${money(loading)} per shop for running costs and profit. Calculate the yearly premium per shop.`,
    wrong: [round(perShop, 2), avgTheft / shops + loading],
    hints: ["Find the expected total claims first.", "Share them among all the shops, then add the loading."],
    explanation: `Expected claims = ${thefts} × ${money(avgTheft)} = ${money(expected)}. Per shop = ${money(expected)} ÷ ${shops.toLocaleString("en-GB")} = ${money(perShop)}. Premium = ${money(perShop)} + ${money(loading)} = ${money(premium)}.`,
    workedSolution: `1. Expected claims = ${thefts} × ${avgTheft} = ${expected.toLocaleString("en-GB")}.\n2. Share per shop = ${expected.toLocaleString("en-GB")} ÷ ${shops.toLocaleString("en-GB")} = ${perShop}.\n3. Premium = ${perShop} + ${loading} = ${premium}, so ${money(premium)} a year.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: perMonth2, calculator: true,
    stem: `A burial society has ${members2} members. It expects about ${funerals2} funerals a year and pays ${money(benefit2)} for each. Calculate the monthly contribution each member must pay to cover the expected payments.`,
    wrong: [perYear2, round(benefit2 / members2, 2)],
    hints: ["Find the yearly total, share it among members, then divide by 12."],
    explanation: `Yearly payments = ${funerals2} × ${money(benefit2)} = ${money(funerals2 * benefit2)}. Per member per year = ${money(funerals2 * benefit2)} ÷ ${members2} = ${money(perYear2)}. Per month = ${money(perYear2)} ÷ 12 = ${money(perMonth2)}.`,
  });
  b.manualShort({
    d: 3, marks: 4, skill: "UNDERSTANDING",
    stem: "Explain **two** purposes of insurance to a business.",
    points: [
      "Compensation for losses.",
      "So the business can replace property and continue trading after a fire or theft.",
      "Confidence / security for loans / encourages trade.",
      "Explains, e.g. banks lend against insured property; firms take reasonable risks and expand.",
    ],
    hints: ["What happens to an uninsured business after a big fire?"],
    modelAnswer: "Insurance compensates the business for losses, so after a fire or burglary it can replace stock and equipment and continue trading. It also gives confidence: banks lend more readily against insured property, so the business can borrow to expand.",
    explanation: "Purposes: compensation, peace of mind, encourages trade and investment, security for loans, loss prevention advice.",
  });
  b.manualShort({
    d: 3, marks: 3, skill: "ANALYSIS",
    stem: "State **three** differences between a burial society and a funeral assurance policy from an assurance company.",
    points: [
      "Burial society is based on community membership and trust; the policy is a legal contract.",
      "Society contributions are set by members; the assurer sets premiums using statistics / actuaries.",
      "Society may be small and risk running out of funds; the assurer is regulated and has large pooled funds (or: society offers social support at the funeral).",
    ],
    hints: ["Think about contracts, how payments are set and the size of the fund."],
    modelAnswer: "A burial society is based on trust among members, whereas a funeral policy is a legal contract; members agree the society's contributions, while the assurer sets premiums from statistics; a small society may run short of funds, while an assurance company pools risks across many policyholders.",
    explanation: "Communal systems use the same pooling idea as formal insurance but rely on trust and community, not contracts and statistics.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 840,
    stem: "Chipo owns a bakery in Gweru. She is worried about a fire in the ovens, theft of cash, a fall in demand if a new supermarket opens nearby, and what would happen to her children if she died.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "Identify **one** insurable risk and **one** non-insurable risk that Chipo faces.",
        points: ["Insurable: fire or theft of cash.", "Non-insurable: fall in demand from the new supermarket (competition)."],
        modelAnswer: "Insurable: fire in the ovens. Non-insurable: loss of customers to the new supermarket.",
      }),
      P.mcq({
        label: "(b)", stem: "Which type of cover protects Chipo's children if she dies?",
        options: [["Life assurance", "Correct: assurance covers death, which is certain to happen."], ["Fire insurance", "Fire insurance covers property damaged by fire."], ["Burglary insurance", "Burglary insurance covers theft after forced entry."], ["Goods in transit", "This covers goods while being carried."]],
        answer: "A",
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain why the new supermarket is a risk that Chipo cannot insure.",
        points: [
          "Competition affects demand, which cannot be predicted from statistics.",
          "So insurers cannot calculate a fair premium.",
          "The outcome depends partly on Chipo's own decisions (prices, quality).",
          "Bearing such risks is the job of the entrepreneur; profit is the reward.",
        ],
        modelAnswer: "How many customers the supermarket takes cannot be predicted from statistics, so an insurer could not calculate a premium. The outcome also depends on Chipo's own decisions about prices and quality, and bearing this kind of risk is part of being in business, rewarded by profit.",
      }),
      P.manual({
        label: "(d)", marks: 4,
        stem: "Explain how pooling of risks allows Chipo to insure her bakery against fire for a small premium.",
        points: [
          "Many bakeries and businesses pay premiums into one fund.",
          "Only a few suffer fires each year.",
          "The fund pays those few in full.",
          "So each pays a small share of the expected losses rather than bearing a large loss alone.",
        ],
        modelAnswer: "Many businesses facing the risk of fire pay premiums into the insurer's fund. In any year only a few have fires, and they are compensated from the fund. So Chipo pays a small, certain premium instead of facing the full cost of a fire herself.",
      }),
    ],
    hints: ["(a) Which risks have statistics and are accidental?", "(d) Many pay a little; a few are paid a lot."],
    explanation: "Fire and theft are insurable; competition is not. Assurance protects dependants. Pooling spreads the losses of a few across many.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "In Tendai's village, most families belong to a burial society, and the chief still organises *zunde ramambo*. A salesperson from an assurance company says that formal funeral policies are now better than these traditional systems.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Explain **two** advantages of the traditional systems to the villagers.",
        points: [
          "Low contributions in money, grain or labour that villagers can afford.",
          "So even the poorest families are protected.",
          "Based on trust and community: help with food, labour and comfort, not only money.",
          "Quick help without forms or distant offices.",
        ],
        modelAnswer: "Contributions are small and can be made in labour or grain, so even poor families take part. Help comes quickly from neighbours without forms or travel to offices, and includes food, labour and comfort as well as money.",
      }),
      P.manual({
        label: "(b)", marks: 6,
        stem: "Evaluate the salesperson's claim.",
        points: [
          "Formal policy: legal contract, enforceable, regulated.",
          "Formal policy: larger pooled funds and statistics, less risk of running out of money.",
          "Formal policy: premiums in cash may be hard for poor families; paperwork and offices far away.",
          "Traditional: may run short in a bad year (drought, many deaths at once) / depends on trust.",
          "Traditional: social support and accessibility.",
          "Justified conclusion (e.g. both have a place; a combination may be best).",
        ],
        modelAnswer: "A formal funeral policy is a legal contract, and the assurer pools risks across thousands of policyholders using statistics, so it is unlikely to run out of money. The traditional systems may run short in a bad year when many people need help at once, and they depend on trust. However, formal policies need regular cash premiums and paperwork that poor rural families may struggle with, while the traditional systems are affordable, accessible and give social support. The salesperson is only partly right: formal policies give more certain cover, but the traditional systems still meet needs that formal policies do not, so many families may benefit from both.",
      }),
    ],
    hints: ["(b) Compare security of payment with affordability and support."],
    explanation: "Communal systems are affordable and supportive but less certain; formal assurance is contractual and backed by large pools, but needs cash and access.",
  });
  b.card("DEFINITION", "What is **insurance**?", "A contract in which the insured pays premiums and the insurer compensates for losses from risks that may or may not happen.");
  b.card("DEFINITION", "What is **assurance**?", "Cover against an event that is certain to happen (death) or that pays at a fixed date; pays an agreed sum.");
  b.card("DEFINITION", "What is **pooling of risks**?", "Many people pay premiums into one fund from which the few who suffer losses are compensated.");
  b.card("FACT", "Conditions for a risk to be insurable?", "Accidental (by chance), measurable in money, common enough for statistics, insurable interest, not affecting everyone at once.");
  b.card("FACT", "Examples of non-insurable risks?", "Changes in fashion or demand, competition, poor management, trading losses, changes in government policy.");
  b.card("CONCEPT", "Role of statistics in insurance?", "They show how often and how large losses are, so actuaries can set premiums that cover expected claims and costs.");
  b.card("FACT", "What is **zunde ramambo**?", "A communal system (isiphala senkosi) where grain from the chief's field is stored to help needy families.");
  b.card("FACT", "Purposes of insurance?", "Compensation, peace of mind, encourages trade and investment, security for loans, protection of dependants, saving, loss prevention.");
  b.card("CONCEPT", "Business risks versus life risks?", "Business: fire, theft, accidents, liability, dishonest staff. Life: death, illness, injury, old age.");
});
