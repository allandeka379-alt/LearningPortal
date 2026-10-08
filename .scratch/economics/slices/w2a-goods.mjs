// W2a: econ.market-failure.goods — market failure; public goods (free riders), merit and demerit goods. No diagrams.
import { concept, P, table, money, check, CAM, ZIM } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.market-failure.goods", { file: "market-failure/goods", keyPrefix: "market-failure.goods" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by **market failure**?",
    options: [
      ["The market allocates resources inefficiently compared with what is best for society", "Correct: too much, too little or none of a good is produced."],
      ["A firm makes a loss and has to close down because buyers prefer its rivals", "One firm closing is part of a working market, not market failure."],
      ["Prices rise because demand is greater than supply", "Rising prices in a shortage are the price mechanism working."],
      ["A market where the government sets all the prices", "That describes a planned system, not market failure."],
    ],
    answer: "A",
    explanation: "Market failure occurs when the free market misallocates resources: over-production, under-production or non-provision.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "A good is **non-excludable** when",
    options: [
      ["people who do not pay cannot be stopped from benefiting from it.", "Correct: this creates the free-rider problem."],
      ["one person's use does not reduce the amount left for others.", "This describes non-rivalry."],
      ["it is provided free of charge by the government.", "Free provision is a policy choice, not a feature of the good."],
      ["consumers underestimate the benefit of using it.", "Underestimated benefits describe a merit good."],
    ],
    answer: "A",
    explanation: "Non-excludable: non-payers cannot be prevented from enjoying the good. Non-rival: use by one does not reduce availability to others.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of these is the best example of a **public good**?",
    options: [
      ["A lighthouse that warns all passing ships", "Correct: non-rival and non-excludable."],
      ["A place at a private secondary school", "School places are rival and excludable: a merit good."],
      ["A bag of fertiliser bought by a farmer", "Fertiliser is a private good."],
      ["A ticket for a football match", "Non-payers can be excluded at the gate."],
    ],
    answer: "A",
    explanation: "A lighthouse's warning reaches every ship (non-rival) and cannot be withheld from ships that have not paid (non-excludable).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why does a free market tend to under-consume merit goods such as education?",
    options: [
      ["Consumers underestimate the benefits, and some benefits go to others", "Correct: information failure and external benefits."],
      ["Firms cannot stop non-payers from using them", "That is the free-rider problem of public goods; schools can exclude."],
      ["They are harmful, so consumers avoid them", "Harmful goods are demerit goods, which are over-consumed."],
      ["They are non-rival, so producers cannot charge a price", "School places are rival and can be sold."],
    ],
    answer: "A",
    explanation: "People base decisions on the private benefits they see; they underestimate long-run benefits and ignore benefits to others, so demand is too low.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which pair correctly matches a good with the result of leaving it to a free market?",
    options: [
      ["Alcohol: over-consumed", "Correct: a demerit good, consumed more than is best for society."],
      ["Vaccinations: over-consumed", "Vaccinations are merit goods, under-consumed."],
      ["National defence: over-provided", "A public good is not provided at all by a market."],
      ["Cigarettes: under-consumed", "Cigarettes are demerit goods, over-consumed."],
    ],
    answer: "A",
    explanation: "Demerit goods are over-consumed; merit goods are under-consumed; public goods are not provided.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why would a private firm be unlikely to supply national defence?",
    options: [
      ["Citizens who did not pay could not be excluded, so few would pay", "Correct: non-excludability leads to free riding and no revenue."],
      ["Defence is a demerit good, so demand would be too high", "Defence is a public good, not a demerit good."],
      ["One more citizen protected would raise the firm's costs sharply", "Defence is non-rival: protecting one more person costs almost nothing."],
      ["Citizens would over-estimate how much defence is worth", "The problem is that they will not pay, not that they over-value it."],
    ],
    answer: "A",
    hints: ["Can the firm protect only those who pay?"],
    explanation: "Defence protects everyone in the country whether they pay or not, so each person has an incentive to free ride, and a firm could not earn enough revenue.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A road is free to use and usually empty, but becomes crowded at rush hour. Which statement is correct?",
    options: [
      ["It is a quasi-public good: non-rival when empty but rival when congested", "Correct: congestion makes one user's use reduce the benefit to others."],
      ["It is a pure public good at all times of day, because nobody pays to use it", "At rush hour one more car slows others down, so it is rival."],
      ["It is a demerit good because it is over-used", "Over-use at rush hour does not make the road harmful to its users."],
      ["It is a private good because each car uses road space", "Users are not excluded and do not pay, so it is not a private good."],
    ],
    answer: "A",
    hints: ["Does an extra car reduce the benefit to others when the road is empty? At rush hour?"],
    explanation: "Some goods are only partly public: a road is non-rival when empty but rival when congested, and tolls can make it excludable.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION", applies: CAM,
    stem: "Which reason, by itself, would justify a government making education **compulsory** rather than only subsidising it?",
    options: [
      ["Even at a low price, some parents would underestimate its benefits and keep children at home", "Correct: compulsion tackles information failure that a lower price alone may not overcome."],
      ["Education is non-rival, so the cost of teaching one more pupil is zero", "Classroom places are rival; extra pupils need teachers and space."],
      ["Private schools charge fees that some parents cannot afford to pay each term", "This supports a subsidy or free provision, not compulsion."],
      ["Education is a demerit good that people consume too much of", "Education is a merit good, under-consumed."],
    ],
    answer: "A",
    hints: ["What problem remains even if school is free?"],
    explanation: "A subsidy deals with cost; compulsion deals with people who would still not choose enough education because they underestimate its value.",
  });
  // Free-rider calculation.
  const hh = 80, val = 35, cost = 2200;
  const totalVal = hh * val;
  check("tv", totalVal, 2800);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: totalVal - cost,
    stem: `A borehole fitted with a public tap would serve all ${hh} households in a fictional village; no household can be stopped from using it. Each household values the borehole at US\\$${val} a year, and it costs US\\$${cost.toLocaleString("en-GB")} a year to run. Calculate the net gain to the village each year if the borehole is provided.`,
    wrong: [totalVal, cost],
    hints: ["Total value = number of households × value per household.", "Net gain = total value − cost."],
    explanation: `1. Total value = ${hh} × ${val} = ${money(totalVal)} a year.\n2. Net gain = ${money(totalVal)} − ${money(cost)} = **${money(totalVal - cost)}** a year.\n3. The borehole is worth providing, yet a private firm may not supply it: households cannot be excluded from the tap, so many would free ride rather than pay.`,
  });
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: 31 * 42, daily: true,
    stem: "A firm offers to light a car park used by 70 drivers if each pays US\\$42 a year. Because no driver can be kept out of the lit car park, only 31 drivers pay. How much revenue does the firm collect each year?",
    wrong: [70 * 42, 39 * 42],
    explanation: `Revenue = 31 × 42 = **${money(31 * 42)}**; the 39 drivers who do not pay still benefit from the light (free riders), so revenue is far below the ${money(70 * 42)} needed.`,
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A demerit good is over-consumed in a free market.",
    answer: true,
    explanation: "True. Consumers underestimate its harm to themselves and others.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Education is a public good because governments often provide it.",
    answer: false,
    explanation: "False. Education is a merit good: school places are rival and pupils can be excluded. Who provides a good does not decide whether it is public.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each good with its type.",
    pairs: [
      ["Street lighting", "Public good"],
      ["Childhood vaccination", "Merit good"],
      ["Cigarettes", "Demerit good"],
      ["A pair of shoes", "Private good"],
    ],
    explanation: "Street lighting: non-rival, non-excludable. Vaccination: under-consumed with external benefits. Cigarettes: over-consumed. Shoes: rival and excludable.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "In a free market, merit goods are {{blank:a}}, demerit goods are {{blank:b}} and public goods are {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["under-consumed"], choices: ["under-consumed", "over-consumed", "not provided"] },
      { id: "b", accepted: ["over-consumed"], choices: ["under-consumed", "over-consumed", "not provided"] },
      { id: "c", accepted: ["not provided"], choices: ["under-consumed", "over-consumed", "not provided"] },
    ],
    wrong: [["over-consumed", "under-consumed", "under-consumed"]],
    explanation: "Merit: too little; demerit: too much; public: none at all (free riders).",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain the **two** characteristics of a public good, using an example.",
    points: [
      "Non-rival: one person's use does not reduce the amount available to others.",
      "Example applied to non-rivalry (for example another person under a street light does not reduce the light).",
      "Non-excludable: people who do not pay cannot be prevented from benefiting.",
      "Example applied to non-excludability (for example a non-payer still benefits from street lighting / defence).",
    ],
    modelAnswer: "A public good is non-rival: when one person uses it, there is no less for anyone else, as when another pedestrian walks under a street light. It is also non-excludable: people who do not pay cannot be stopped from benefiting, because once the light is on everyone on the street can see by it.",
    hints: ["Two features, each with an example."],
    explanation: "One mark for each feature and one for each applied example.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why a demerit good such as alcohol is over-consumed in a free market.",
    points: [
      "Consumers underestimate the harm to their own health (imperfect information / short-term view).",
      "So they buy more than they would with full information.",
      "Consumption harms others (accidents, violence, health-care costs) that drinkers do not take into account.",
      "So the quantity consumed is greater than the level that is best for society.",
    ],
    modelAnswer: "Drinkers tend to underestimate the long-term damage alcohol does to their own health, so they buy more than they would if they were fully informed. Heavy drinking also harms other people, through road accidents, violence and the cost of treating illness in public hospitals, but drinkers do not consider these effects. As a result more alcohol is consumed than is best for society.",
    hints: ["Think about information and about effects on other people."],
    explanation: "Credit: information failure and external costs, each linked to over-consumption.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 6, applies: ZIM,
    stem: "Suggest and explain **three** ways a government could increase the number of children who complete secondary school.",
    points: [
      "Measure 1 (for example abolish or reduce school fees / subsidise schools).",
      "Explained: lowers the cost to families, so more can afford to keep children in school.",
      "Measure 2 (for example information campaigns on the value of education).",
      "Explained: corrects parents' underestimate of the benefits (information failure).",
      "Measure 3 (for example compulsory attendance laws / free school meals / bursaries for poor pupils).",
      "Explained: compulsion or extra incentives raise attendance even where parents still undervalue school.",
    ],
    modelAnswer: "The government could reduce or abolish school fees, or give bursaries to poor pupils, so that cost no longer keeps children at home. It could run campaigns showing parents how much more school leavers earn, correcting their underestimate of the benefits. It could also make attendance compulsory to a certain age, or provide free school meals, which give families an extra reason to send children to school every day.",
    hints: ["Think about cost, information and rules."],
    explanation: "Each measure: identify (1) and explain how it raises consumption of the merit good (1).",
  });

  // Structured 1: a public good with a small data table.
  const rows = [["Traders who would benefit", 120], ["Value of the shelter to each trader per year (US\\$)", 48], ["Annual cost of building and maintaining the shelter (US\\$)", 4500], ["Traders who agreed to pay US\\$40 each", 52]];
  const T = table(["Item", "Value"], rows);
  const tv = 120 * 48, collected = 52 * 40;
  check("tv2", tv, 5760);
  check("coll", collected, 2080);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 12,
    stem: `Traders at a fictional open-air market want a large shade roof built over the main walkway, which anyone at the market could stand under. A private builder offered to build and maintain it if each trader paid US\\$40 a year.\n\n${T}`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: tv, stem: "Calculate the total value of the shelter to the traders each year.", wrong: [48], explanation: `120 × 48 = ${money(tv)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: collected, stem: "Calculate how much the builder would collect each year from the traders who agreed to pay.", wrong: [120 * 40], explanation: `52 × 40 = ${money(collected)}, less than the cost of ${money(4500)}.` }),
      P.manual({
        label: "(c)", marks: 2,
        stem: "Using your answers, explain why the shelter is worth building but the builder will not build it.",
        points: [
          `The total value (${money(tv)}) is greater than the cost (${money(4500)}), so society gains.`,
          `Revenue (${money(collected)}) is below the cost because non-payers cannot be excluded (free riders), so the builder would make a loss.`,
        ],
        modelAnswer: `The shelter is worth ${money(tv)} a year to the traders but costs only ${money(4500)}, so it is worth building. But because nobody can be kept out from under it, most traders free ride: only ${money(collected)} would be collected, so the builder would make a loss and will not build it.`,
        explanation: "Value exceeds cost, but revenue falls short because of free riding.",
      }),
      P.manual({
        label: "(d)", marks: 6, levels: LV(6),
        stem: "Discuss whether the town council should build the shelter and pay for it from market fees charged to all traders.",
        points: [
          "For: the shelter is a public good that the market will not provide; its value exceeds its cost.",
          "For: charging all traders through a compulsory fee removes free riding; benefits (more customers, less spoiled produce) spread to all.",
          "Against: some traders value it less than others / some may not want it, yet all must pay; poorer traders may struggle with higher fees.",
          "Against: the council may build it inefficiently or at a higher cost; the council's money has an opportunity cost.",
          "Against: the council may not know traders' true valuations (people may overstate or understate them).",
          "Justified conclusion.",
        ],
        modelAnswer: `Yes, on balance. The shelter is a public good: everyone at the market benefits and no one can be excluded, so the builder will not supply it even though it is worth ${money(tv)} a year against a cost of ${money(4500)}. A fee charged to every trader stops free riding and spreads the cost fairly across those who benefit. However, some traders, such as those at the edge of the market, may gain little but still pay, and higher fees hurt the poorest traders. The council might also build it less efficiently than a private firm, and the money could have been used elsewhere. Because the gain is clear and the market will not act, the council should build it, perhaps contracting a private builder to keep costs down.`,
        explanation: "Weigh the public-good case against fairness, valuation and efficiency problems; conclude.",
      }),
    ],
    hints: ["Total value = number of traders × value each.", "Can the builder exclude traders who do not pay?"],
    explanation: `The shelter is worth ${money(tv)} against a cost of ${money(4500)}, but only ${money(collected)} would be paid voluntarily: a public good with a free-rider problem, which the council can solve by direct provision funded by fees.`,
  });

  // Structured 2: merit good, discuss.
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, marks: 8,
    stem: "In a fictional country, private clinics charge for childhood vaccinations. A survey finds that many parents in rural areas do not vaccinate their children, saying the clinics are too far away, the fee is too high, or that their children are healthy and do not need it.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "Vaccinations in this case are best described as",
        options: [
          ["a merit good that is under-consumed.", "Correct: benefits are underestimated and spread to others."],
          ["a public good that is not provided.", "Clinics do provide vaccinations; parents can be charged."],
          ["a demerit good that is over-consumed.", "Vaccinations are beneficial and under-consumed."],
          ["a private good with no market failure.", "Under-consumption with external benefits is a market failure."],
        ],
        answer: "A",
        explanation: "Vaccinations are merit goods: under-consumed in a free market.",
      }),
      P.manual({
        label: "(b)", marks: 1,
        stem: "Identify the reason in the survey that shows imperfect information.",
        points: ["Parents saying their children are healthy and do not need vaccination (they underestimate the benefit)."],
        modelAnswer: "Parents who say their children are healthy and do not need it underestimate the benefit of vaccination.",
        explanation: "Underestimating the benefit is an information failure.",
      }),
      P.manual({
        label: "(c)", marks: 6, levels: LV(6),
        stem: "Discuss whether the government should provide vaccinations free of charge.",
        points: [
          "For: removes the cost barrier, so more poor households vaccinate; consumption rises towards the socially best level.",
          "For: external benefits: fewer outbreaks protect unvaccinated people too; lower future health-care costs.",
          "Against: cost to the government (opportunity cost); free provision alone does not fix distance or information problems.",
          "Against: may be inefficient or crowd out private clinics; waste if over-ordered.",
          "Alternatives / complements: mobile clinics, information campaigns, making vaccination a condition of school entry.",
          "Justified conclusion.",
        ],
        modelAnswer: "Free vaccinations would remove the fee that keeps poor families away, so more children would be protected, and because vaccinated children do not pass diseases on, the whole community gains and future hospital costs fall. However, the programme costs money that could be used elsewhere, and a free service does not solve the other problems in the survey: clinics are far away and some parents think vaccination is unnecessary. The government should provide vaccinations free, but also use mobile clinics and information campaigns, or link vaccination to school entry, so that the policy reaches the families who need it.",
        explanation: "Free provision tackles cost but not distance or information; combine policies and conclude.",
      }),
    ],
    hints: ["Which survey reason is about cost, which about access, and which about information?"],
    explanation: "Vaccinations are a merit good under-consumed because of cost, access and information failure; free provision helps most when combined with other measures.",
  });

  b.card("DEFINITION", "Define **market failure**.", "When the free market allocates resources inefficiently: too much, too little or none of a good compared with the best level for society.");
  b.card("DEFINITION", "What are the two features of a **public good**?", "Non-rival (use by one does not reduce availability to others) and non-excludable (non-payers cannot be stopped from benefiting).");
  b.card("DEFINITION", "What is the **free-rider problem**?", "People benefit from a non-excludable good without paying, so firms cannot earn revenue and the good is not provided by the market.");
  b.card("DEFINITION", "Define a **merit good**.", "A good more beneficial than consumers realise (with benefits to others), so it is under-consumed in a free market: for example education, vaccinations.");
  b.card("DEFINITION", "Define a **demerit good**.", "A good more harmful than consumers realise (with harm to others), so it is over-consumed in a free market: for example cigarettes, alcohol.");
  b.card("FACT", "Give three examples of public goods.", "Street lighting, national defence, lighthouses, flood defences.");
  b.card("CONCEPT", "Why is education not a public good?", "School places are rival and pupils can be excluded; it is a merit good.");
  b.card("CONCEPT", "What is a quasi-public good?", "A good with some public-good features, such as a road that is non-rival when empty but rival when congested and can be tolled.");
  b.card("CONCEPT", "Which policies match public, merit and demerit goods?", "Public: direct provision. Merit: free or subsidised provision, information, compulsion. Demerit: taxes, regulation, information.");
});
