// W1a: the market economic system: definition, advantages and disadvantages.
import { concept, P, money, pct, fmt } from "../lib.mjs";

const LV6 = [
  [3, 5, 6, "Two-sided analysis, developed, with a justified conclusion."],
  [2, 3, 4, "Some analysis of both sides or one side well developed, limited conclusion."],
  [1, 1, 2, "Simple points, little explanation."],
];
const AD = ["advantage", "disadvantage"];

concept("econ.systems.market-economy", { file: "systems/market-economy", keyPrefix: "systems.market-economy" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In a market economic system, resources are allocated mainly by",
    options: [
      ["the price mechanism", "Correct: the decisions of buyers and sellers, through prices, allocate resources."],
      ["a central planning authority", "Central planning belongs to a planned economy."],
      ["the central bank", "A central bank manages money and interest rates, not the allocation of all resources."],
      ["local councils", "Councils provide some services but do not allocate most resources in a market system."],
    ],
    answer: "A",
    explanation: "In a market economic system, private owners make decisions in response to prices; the price mechanism allocates resources.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is an **advantage** of a market economic system?",
    options: [
      ["Competition gives firms an incentive to keep costs and prices down", "Correct: inefficient firms lose customers to rivals."],
      ["Goods are shared equally among all households", "Goods go to those who can pay, so sharing is unequal."],
      ["Public goods such as street lighting are always provided by private firms", "Firms cannot profit from public goods, so markets do not provide them."],
      ["Harmful goods such as cigarettes are never produced", "Markets produce whatever is profitable, including harmful goods."],
    ],
    answer: "A",
    explanation: "Competition and the profit motive push firms towards efficiency and low prices. The other options describe things markets do badly.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why do private firms in a market economy **not** supply public goods such as street lighting?",
    options: [
      ["Non-payers cannot be stopped from benefiting, so firms cannot profit", "Correct: non-payers can still use them, so no one has to pay."],
      ["Street lighting is too cheap to make any profit from", "Cost is not the problem; charging users is."],
      ["The law in a market economy forbids private firms from selling services", "There is no such rule in a market economy."],
      ["Consumers do not want street lighting at all", "People do want it; the problem is that they need not pay to benefit."],
    ],
    answer: "A",
    explanation: "Public goods are non-excludable: those who refuse to pay still benefit. Firms cannot earn revenue, so the market does not provide them.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In a market economic system, what is meant by **consumer sovereignty**?",
    options: [
      ["Consumers' spending decides what firms produce", "Correct: firms produce what consumers are willing to buy."],
      ["Consumers elect the government that plans production", "Elections do not decide output in a market system."],
      ["Consumers own all the firms in the economy", "Firms are owned by private owners and shareholders, not all consumers."],
      ["Consumers fix the prices of goods by law", "Prices are set by demand and supply, not by law."],
    ],
    answer: "A",
    explanation: "Consumer sovereignty means that consumers, through how they spend, decide which goods are produced and in what amounts.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A factory upstream of a farming area pours waste into a river, and farmers downstream lose crops. Which disadvantage of a market economic system does this show?",
    options: [
      ["Firms ignore external costs they impose on others", "Correct: the factory does not pay the cost its pollution causes to the farmers."],
      ["Consumers have too much choice between products", "Choice is an advantage and is not involved here."],
      ["Prices respond too slowly to changes in demand", "The case is about pollution, not price changes."],
      ["Government planners set the wrong output targets", "There are no planners in a market economic system."],
    ],
    answer: "A",
    explanation: "Markets ignore external costs: the factory's private costs do not include the damage to farmers, so it produces more than is best for society.",
    hints: ["Who pays for the damage to the crops?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "In a market economy with no state schools, many poor families do not send their children to secondary school. Which disadvantage does this best illustrate?",
    options: [
      ["Merit goods are under-consumed when sold at market prices", "Correct: education benefits society, but at market prices poorer families buy too little."],
      ["Demerit goods are over-consumed when sold at market prices", "Education is a merit good, not a demerit good."],
      ["Firms are not motivated by profit in a market economy", "Profit is the main motive in a market economy."],
      ["Competition makes school fees too low for schools to survive", "The problem is that fees are too high for poor families."],
    ],
    answer: "A",
    explanation: "Education is a merit good: its benefits to society are larger than the user sees, and poorer families cannot afford enough at market prices.",
    hints: ["Is education good or harmful for society?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why might the profit motive in a market economic system lead to **innovation**?",
    options: [
      ["Firms that develop better products or methods can keep the extra profit", "Correct: the reward for innovation goes to the innovator, so firms have an incentive to try."],
      ["Governments order firms to develop at least one new product every year", "Orders from the state are a feature of planning, not of markets."],
      ["Consumers are not allowed to buy products from abroad", "This restricts trade; it does not explain innovation."],
      ["All firms share their profits equally with their rivals", "If profits were shared, the incentive to innovate would be weak."],
    ],
    answer: "A",
    explanation: "Because owners keep their profits, a firm that finds a cheaper method or a product consumers prefer gains customers and profit: a strong incentive to innovate.",
    hints: ["Who receives the reward for a better product?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In a market economic system, most resources are privately owned.",
    answer: true,
    explanation: "True. Private ownership of land, capital and businesses is a defining feature.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A market economic system ensures that income and wealth are shared fairly.",
    answer: false,
    explanation: "False. Goods go to those who can pay, so people with more skills, property or luck receive more. Inequality is a main criticism of the market system.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Classify each feature of a market economic system.",
    template: "Wide choice of goods for consumers: {{blank:a}}. Under-provision of health care for the poor: {{blank:b}}. Quick response of supply to changes in demand: {{blank:c}}. Booms and slumps with periods of high unemployment: {{blank:d}}.",
    blanks: [
      { id: "a", accepted: ["advantage"], choices: AD },
      { id: "b", accepted: ["disadvantage"], choices: AD },
      { id: "c", accepted: ["advantage"], choices: AD },
      { id: "d", accepted: ["disadvantage"], choices: AD },
    ],
    wrong: [["advantage", "advantage", "disadvantage", "disadvantage"]],
    explanation: "Choice and responsiveness are advantages; under-provision of merit goods and instability are disadvantages.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each example to the weakness of the market system it shows.",
    pairs: [
      ["No firm builds flood barriers along a river", "Public goods are not provided"],
      ["Cigarette sales rise among teenagers", "Demerit goods are over-consumed"],
      ["One firm buys up all its rivals and raises prices", "Monopoly power"],
      ["A rich family can afford private surgery but a poor family cannot", "Inequality of income and wealth"],
    ],
    explanation: "Each example matches one of the market system's disadvantages: missing public goods, over-consumed demerit goods, monopoly power and inequality.",
  });
  {
    const price = 30, income = 90, share = (price / income) * 100;
    b.num({
      d: 3, skill: "APPLICATION", kind: "pct", value: share, calculator: true,
      stem: `In a fictional country with no state health service, a course of treatment costs ${money(price)}. Rudo's household earns ${money(income)} a month. What percentage of the household's monthly income would the treatment cost? Give your answer to one decimal place.`,
      wrong: [(income / price) * 100, income - price],
      explanation: `${fmt(price)} ÷ ${fmt(income)} × 100 = ${pct(share, 1)}. A household spending a third of its income on one treatment may go without, which shows how a market system allocates by ability to pay rather than by need. Dividing income by price (${pct((income / price) * 100, 0)}) puts the fraction upside down.`,
      hints: ["Percentage = part ÷ whole × 100."],
    });
  }
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain how competition in a market economic system can benefit consumers.",
    points: [
      "Firms compete for customers, so they must keep prices low and quality high or lose sales to rivals.",
      "Consumers therefore get lower prices, better quality or more choice.",
    ],
    explanation: "Competition gives firms a reason to be efficient and to please customers.",
    modelAnswer: "When many firms sell the same product, a firm that charges too much or sells poor quality loses customers to its rivals. Firms therefore cut costs and improve products, so consumers pay lower prices and get better goods.",
    hints: ["What happens to a firm whose prices are higher than its rivals'?"],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse why a market economic system may lead to growing inequality of income.",
    points: [
      "Goods and incomes go to those who own valuable resources or skills (rewards follow ability to pay and productivity).",
      "Owners of property and capital earn rent, interest and profit, which they can reinvest to earn more.",
      "People without skills, property or work (the sick, elderly, unemployed) earn little and get no automatic support.",
      "So the gap widens over time, as richer families can also buy better education and health for their children.",
    ],
    explanation: "Market rewards depend on what people own and sell, and the advantages of wealth build up over time.",
    modelAnswer: "In a market system people earn according to the resources they own. Those with scarce skills earn high wages, and owners of land and capital receive rent, interest and profit, which they can reinvest. People without skills or property, or who cannot work, earn little and receive no automatic help. Richer families can also pay for better education for their children, so the gap tends to grow from one generation to the next.",
    hints: ["Where does income come from in a market system?", "Why might the gap grow over time?"],
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: "A fictional country has a market economic system. Its government provides only defence and the police. Private firms supply food, clothing, schools, clinics and electricity. A few large families own most of the land and factories.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "Which good is the market **least** likely to provide in this country?",
        options: [
          ["Street lighting in public roads", "Correct: a public good that cannot be charged for."],
          ["Food sold in supermarkets", "Food is a private good sold for profit."],
          ["Clothing sold by retailers", "Clothing is a private good sold for profit."],
          ["Electricity sold to households", "Electricity can be metered and charged for, so firms can sell it."],
        ],
        answer: "A",
        explanation: "Street lighting is non-excludable: non-payers benefit too, so firms cannot make a profit from it.",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Explain one advantage consumers may gain from private firms supplying food and clothing.",
        points: [
          "Identifies an advantage (choice, low prices, quality, quick response to demand).",
          "Explains why (competition between firms, profit motive, consumer sovereignty).",
        ],
        modelAnswer: "Consumers have a wide choice, because many firms compete to sell food and clothing; to win customers they must offer good quality at low prices.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain why leaving schools and clinics to private firms may cause problems.",
        points: [
          "Education and health care are merit goods with benefits to society beyond the user.",
          "At market prices, poorer families cannot afford enough of them.",
          "So the population may be less healthy and skilled, harming the whole economy (and increasing inequality).",
        ],
        modelAnswer: "Schools and clinics provide merit goods whose benefits go beyond the person using them. If they are sold at market prices, poorer families will buy too little education and health care. The country will then have a less healthy, less skilled workforce, which harms everyone.",
      }),
      P.manual({
        label: "(d)", marks: 6,
        stem: "Discuss whether this country should keep its market economic system.",
        points: [
          "Explains an advantage of keeping the market system (efficiency, choice, innovation).",
          "Develops it with reference to private goods such as food and clothing.",
          "Explains a disadvantage (missing public goods, under-provided merit goods).",
          "Explains a second disadvantage (inequality from concentrated ownership, monopoly power).",
          "Considers a middle way: keep markets for private goods but add state provision or regulation (a mixed economy).",
          "Reaches a justified conclusion.",
        ],
        levels: LV6,
        modelAnswer: "The market system gives consumers choice and makes firms efficient, because competition and profit reward firms that make what people want at low cost; for food and clothing this works well. However, the market will not provide public goods such as street lighting, and leaving schools and clinics to private firms means poor families get too little education and health care. With a few families owning most land and factories, inequality is likely to grow and these owners may gain monopoly power. The country should keep markets for ordinary goods but move towards a mixed economy, with the state providing public goods, funding basic education and health care and controlling monopolies.",
      }),
    ],
    explanation: "Markets work well for private goods in competitive markets, but fail with public goods, merit goods, inequality and monopoly. This suggests a mixed system.",
    hints: ["Which goods can firms charge for?", "Weigh the advantages against the failures before concluding."],
  });
  b.struct({
    d: 3, skill: "UNDERSTANDING", examStyle: true,
    stem: "Mobile phone services in a fictional country were opened to private firms ten years ago. Since then several firms have competed, call charges have fallen and new services such as mobile money have appeared.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "Define the market economic system.",
        points: [
          "Resources are mainly privately owned.",
          "Resources are allocated by the price mechanism (decisions of consumers and producers), with limited government.",
        ],
        modelAnswer: "An economic system in which resources are mainly privately owned and the price mechanism allocates them, with only a small role for government.",
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain **two** advantages of the market system shown by the mobile phone industry.",
        points: [
          "Advantage 1 identified: competition lowered prices (or efficiency).",
          "Advantage 1 explained: firms cut charges to win customers from rivals.",
          "Advantage 2 identified: innovation (new services such as mobile money).",
          "Advantage 2 explained: firms that offer new services earn more profit, an incentive to innovate.",
        ],
        modelAnswer: "First, competition lowered prices: with several firms competing, each had to cut call charges to keep its customers. Second, the profit motive encouraged innovation: firms developed services such as mobile money because those that offered something new could earn extra profit.",
      }),
    ],
    explanation: "The case shows two market advantages: competition (lower prices) and innovation driven by profit.",
    hints: ["Why did charges fall?", "Why did new services appear?"],
  });

  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which task is the government still expected to carry out in a market economic system?",
    options: [
      ["Enforcing contracts and property rights", "Correct: markets need laws that protect owners and make agreements binding."],
      ["Setting output targets for each private firm", "Output targets are a feature of planning."],
      ["Fixing the prices of all goods and services", "Prices are set by demand and supply in a market system."],
      ["Owning the factories that produce clothing", "Factories are privately owned in a market system."],
    ],
    answer: "A",
    explanation: "Even a market system needs a limited state: defence, law and order, and the enforcement of contracts and property rights.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In a market economic system, harmful goods such as cigarettes tend to be over-consumed.",
    answer: true,
    explanation: "True. Demerit goods are produced whenever they are profitable, and consumers may underestimate the harm, so more is consumed than is good for society.",
  });

  b.card("DEFINITION", "Define the **market economic system**.", "Resources are mainly privately owned and the price mechanism allocates them, with limited government.");
  b.card("CONCEPT", "Give three advantages of a market economic system.", "Choice; efficiency through competition; incentives to innovate (also quick response to demand, no planning bureaucracy).");
  b.card("CONCEPT", "Give three disadvantages of a market economic system.", "Inequality; public goods not provided; merit goods under-consumed (also demerit goods over-consumed, external costs, monopoly, instability).");
  b.card("CONCEPT", "Why does the market not provide public goods?", "People who do not pay cannot be excluded, so firms cannot make a profit from them.");
  b.card("DEFINITION", "What is **market failure**?", "When the market, left alone, does not allocate resources efficiently or fairly.");
  b.card("CONCEPT", "How does the profit motive encourage efficiency?", "Firms that cut costs earn more profit; wasteful firms make losses and close.");
  b.card("FACT", "For which goods does the market system work best?", "Ordinary private goods in competitive markets, such as food and clothing.");
  b.card("CONCEPT", "Who receives goods in a market economic system?", "Those who are willing and able to pay, so allocation follows income, not need.");
});
