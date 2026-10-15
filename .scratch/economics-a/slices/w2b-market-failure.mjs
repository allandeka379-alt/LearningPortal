// W2b: market failure (both boards: ZIMSEC Form 5; Cambridge AS Level). Free-preview lesson.
import { concept, P, ZIM, CAM, chk, table, pctChange, monopolyLinear } from "../lib.mjs";
import { mc, LV8 } from "../tables/w2b-kit.mjs";

concept("aecon.intervention.market-failure", { file: "intervention/market-failure", keyPrefix: "intervention.market-failure" }, (b) => {
  mc(b, [1, "RECALL"], "Market failure occurs when",
    ["the free market leads to a misallocation of resources", "Correct: the outcome does not maximise the welfare of society."],
    [["a firm makes a loss and has to close down for good", "A firm's failure is not market failure."],
     ["the government fixes the price of a good below the market level", "That is government intervention, not market failure."],
     ["demand for a product falls to zero", "That is a change in demand, not a misallocation."]],
    "Market failure is a misallocation of resources by the free market.");

  mc(b, [1, "RECALL"], "A good that is non-excludable and non-rivalrous is called a",
    ["public good", "Correct: the definition of a public good."],
    [["merit good", "Merit goods are under-consumed but can be excluded and are rivalrous."],
     ["demerit good", "Demerit goods are harmful and over-consumed."],
     ["private good", "Private goods are excludable and rivalrous."]],
    "Non-excludable and non-rivalrous: a public good.");

  mc(b, [2, "UNDERSTANDING"], "Why will a private firm not supply a street light that benefits a whole neighbourhood?",
    ["It cannot stop non-payers from using it, so people free-ride", "Correct: non-excludability."],
    [["Street lights are rivalrous in use, so one household's use blocks others", "Using a light does not stop others from using it."],
     ["Nobody in the neighbourhood would benefit from the light", "Households would gain from it; the problem is payment."],
     ["Street lights are demerit goods", "They are not harmful."]],
    "Non-excludability makes it impossible to charge, so the free-rider problem prevents private supply.");

  mc(b, [2, "UNDERSTANDING"], "A merit good is likely to be under-consumed in a free market mainly because",
    ["consumers underestimate the benefits to themselves and to others", "Correct: imperfect information and positive externalities."],
    [["the government has banned its sale in most shops, markets and cities", "A ban does not describe a merit good."],
     ["it is a public good that cannot be sold", "A merit good can be sold."],
     ["consumers overestimate the harm it does to themselves", "That describes a demerit good in reverse."]],
    "Merit goods are under-consumed because consumers undervalue their benefits.");

  mc(b, [2, "UNDERSTANDING"], "A person who buys fire insurance begins to take less care to prevent fires. This is an example of",
    ["moral hazard", "Correct: behaviour changes once someone else bears the cost of the risk."],
    [["a negative externality", "The cost is not imposed on an uninvolved third party."],
     ["the free-rider problem", "Nobody is using a good without paying for it."],
     ["a positive externality", "No benefit spills over to others."]],
    "Moral hazard is riskier behaviour after the risk is insured.", { daily: true });

  mc(b, [3, "ANALYSIS"], "A seller of a second-hand vehicle knows its faults, but the buyer does not. This is most likely to cause market failure because it is a case of",
    ["asymmetric information", "Correct: the seller knows more than the buyer."],
    [["a public good", "A vehicle is excludable and rivalrous."],
     ["common property", "The vehicle is privately owned."],
     ["factor immobility", "Resources are not stuck in one use."]],
    "Unequal knowledge between buyer and seller is asymmetric information.", { hints: ["Who has more information?"] });

  mc(b, [3, "ANALYSIS"], "Villagers each graze as many cattle as they can on open common land and the grass is gradually destroyed. Which source of market failure does this illustrate?",
    ["Common property resources being over-used", "Correct: nobody owns the land, so each user ignores the cost of depletion."],
    [["A public good being under-provided", "The problem is over-use, not under-provision."],
     ["Monopoly power", "There is no single seller."],
     ["Asymmetric information", "The problem is not a lack of knowledge."]],
    "Open-access resources are over-used because the cost of depletion is shared.", { hints: ["Who bears the cost of the lost grass?"], applies: ZIM });

  mc(b, [3, "ANALYSIS"], "Why are the prices of agricultural products such as maize often volatile?",
    ["Demand and supply are inelastic and supply varies with the weather", "Correct: small shifts in supply cause large price changes."],
    [["Demand and supply are both highly elastic, so prices hardly ever move", "Elastic curves would damp price changes."],
     ["Supply is perfectly elastic in the short run", "Supply is fixed by the harvest."],
     ["Farmers can change output immediately when prices change", "Growing takes a full season."]],
    "With inelastic demand and supply, a shift in supply causes a large change in price.", { hints: ["How does the price change when demand is inelastic and supply shifts?"] });

  mc(b, [4, "EVALUATION"], "Which of the following is the strongest reason for a government to provide street lighting itself rather than leave it to the market?",
    ["The benefit to society exceeds the cost but no private firm can charge for it", "Correct: a public good would not be provided."],
    [["Street lights are cheap to build", "Cost alone is not a reason."],
     ["Private firms never make a profit on any public project", "Many do; the issue is that they cannot charge here."],
     ["Households would like to receive their street lighting free of charge from the council", "Wanting something free is not market failure."]],
    "The presence of free riders means that a beneficial good would not be supplied by the market.", { hints: ["What stops a firm from earning revenue?"] });

  {
    const m = monopolyLinear({ a: 90, b: 0.05, c: 30 });
    chk(m.monopoly.quantity, 600, 1e-9); chk(m.monopoly.price, 60, 1e-9); chk(m.competitive.quantity, 1200, 1e-9); chk(m.welfareLoss, 9000, 1e-9);
    b.calc({ d: 4, skill: "APPLICATION", calculator: true, kind: "money", value: m.welfareLoss, hints: ["Welfare loss = half × lost output × gap between price and marginal cost."],
      stem: "A monopolist faces demand P = 90 − 0.05Q and a constant marginal cost of US\\$30 (P in US\\$, Q in units). Competitive output would be 1,200 units. Calculate the welfare loss caused by monopoly, in US\\$.",
      wrong: [18000, 36000, 4500],
      explanation: "1. MR = 90 − 0.1Q = 30, so monopoly output Q = 600.\n2. Price = 90 − 0.05 × 600 = US\\$60, which is US\\$30 above MC.\n3. Output is 1,200 − 600 = 600 units below the competitive level.\n4. Welfare loss = ½ × 600 × 30 = US\\$9,000. Using the full rectangle (600 × 30 = 18,000) is the monopoly's extra profit, a transfer, not the welfare loss." });
    const cost = 100, v = 30, n = 4;
    chk(n * v - cost, 20, 0);
    const pr = 160 - 0.02 * 4000;
    chk(pr, 80, 1e-9); chk(pctChange(6000, 4000) / pctChange(40, 80), -1 / 3, 1e-9);
    b.num({ d: 3, skill: "APPLICATION", daily: true, kind: "money", value: pr, hints: ["Substitute the quantity into the demand curve."],
      stem: "Maize demand is P = 160 − 0.02Q (P in US\\$ per tonne, Q in tonnes). A drought cuts the harvest from 6,000 tonnes to 4,000 tonnes. What is the new price per tonne, in US\\$?",
      wrong: [40, 120, 160],
      explanation: "P = 160 − 0.02 × 4,000 = 160 − 80 = US\\$80 per tonne (the good-harvest price was US\\$40)." });
    b.calc({ d: 4, skill: "ANALYSIS", calculator: true, kind: "money", value: 320000 - 240000, hints: ["Revenue = price × quantity, in each year."],
      stem: "Maize demand is P = 160 − 0.02Q. In a good year farmers sell 6,000 tonnes and in a drought year 4,000 tonnes. Calculate the change in farmers' total revenue in the drought year compared with the good year, in US\\$ (positive for a rise).",
      wrong: [-80000, 240000, 320000],
      explanation: "Good year: price US\\$40, revenue 40 × 6,000 = US\\$240,000. Drought year: price US\\$80, revenue 80 × 4,000 = US\\$320,000. Change = +US\\$80,000. Demand is inelastic, so the rise in price outweighs the fall in quantity." });
  }

  b.tf({ d: 3, skill: "UNDERSTANDING", hints: ["Efficiency is about allocation; what is about distribution?"], stem: "A market can be allocatively efficient and still leave some people unable to afford basic goods.", answer: true,
    explanation: "True. Efficiency concerns the allocation of resources, not the distribution of income; inequality is a separate argument for intervention." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each situation with the source of market failure.",
    pairs: [["A factory pollutes a river used by villagers", "Negative externality"], ["Nobody pays for a lighthouse that every ship uses", "Free-rider problem"], ["A firm is the only supplier and restricts output", "Monopoly power"], ["A patient cannot judge the quality of a treatment", "Asymmetric information"]],
    explanation: "Each situation matches a different source of market failure." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "A market is allocatively efficient when price equals {{blank:a}}. A {{blank:b}} good is under-consumed because consumers undervalue its benefits.",
    blanks: [{ id: "a", accepted: ["marginal cost"], choices: ["marginal cost", "average cost", "marginal revenue"] }, { id: "b", accepted: ["merit"], choices: ["merit", "demerit", "public"] }],
    explanation: "Allocative efficiency is P = MC; merit goods are under-consumed." });

  b.short({ d: 2, skill: "RECALL", stem: "What name is given to people who enjoy the benefit of a good without paying for it?",
    accepted: ["free riders", "free-riders", "free rider", "free-rider"], wrong: ["consumers"],
    explanation: "Free riders benefit without paying, which is why public goods are under-provided by the market." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Define market failure.",
    points: ["The free market fails to allocate resources efficiently (misallocation of resources).", "The outcome does not maximise the welfare of society."],
    modelAnswer: "Market failure occurs when the free market misallocates resources, so that output is not at the level that maximises the welfare of society.",
    explanation: "One mark for misallocation, one for welfare of society." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Use the ideas of non-excludability and free riders."],
    stem: "Explain why public goods are not supplied by the free market.",
    points: ["A public good is non-excludable: non-payers cannot be kept from using it.", "It is non-rivalrous: one person's use does not reduce another's.", "People have an incentive to free-ride instead of paying.", "Firms cannot earn revenue, so they do not supply it, even though the benefit may exceed the cost."],
    modelAnswer: "Public goods are non-excludable and non-rivalrous. Because non-payers cannot be kept from using them, people have an incentive to free-ride rather than pay. Firms cannot earn revenue, so they do not supply the good, even though the benefit to society may exceed the cost.",
    explanation: "Non-excludability, free riding and lack of revenue." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 5, hints: ["Use inelastic demand and supply."],
    stem: "Analyse why the incomes of maize farmers can be unstable from year to year.",
    points: ["Supply depends on the weather and varies from year to year.", "Supply is inelastic in the short run: farmers cannot change output once the crop is planted.", "Demand for food is inelastic.", "A small change in supply therefore causes a large change in price.", "Revenue rises or falls sharply (a good harvest can cut income), so incomes are unstable."],
    modelAnswer: "Maize supply varies with the weather and cannot be adjusted within the season, so it is inelastic in the short run. Demand for food is also inelastic. A small shift in supply therefore causes a large change in price, and since a good harvest can bring a lower price and income than a poor one, farmers' incomes are unstable.",
    explanation: "Supply shocks combined with inelastic demand cause large price swings." });

  {
    const t1 = table(["Household", "Value of the siren (US\\$)"], [["A", "30"], ["B", "30"], ["C", "30"], ["D", "30"], ["Total", "120"]], { align: ["l", "r"] });
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["Add the values of all households.", "Is it excludable?"],
      stem: `**A flood-warning siren (illustrative data)**\n\nA siren in a fictional village would cost US\\$100 to install. Households value it as follows.\n\n${t1}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: 20, stem: "Calculate the net benefit to the village of installing the siren, in US\\$.", wrong: [120, 100, 30], explanation: "Total benefit 120 minus cost 100 = US\\$20." }),
        P.manual({ label: "(b)", marks: 3, stem: "Explain why a private firm would be unwilling to install the siren.",
          points: ["The siren is non-excludable: households cannot be stopped from hearing it.", "Households have an incentive to free-ride and not pay.", "The firm cannot earn revenue to cover the US\\$100 cost."],
          modelAnswer: "Everyone in the village can hear the siren whether or not they pay, so it is non-excludable. Each household has an incentive to free-ride, so the firm cannot collect enough revenue to cover the US\\$100 cost and does not provide it." }),
        P.manual({ label: "(c)", marks: 3, stem: "Suggest how the siren could be provided, and give one disadvantage.",
          points: ["The government (or local council) provides it and pays through taxes.", "Taxation forces everyone to pay, removing the free-rider problem.", "A disadvantage: the cost may exceed the benefit if the government lacks information on how households value it (or taxation has costs)."],
          modelAnswer: "The local government could install it and pay from taxes, which makes everyone contribute and removes the free-rider problem. A disadvantage is that the government may not know how much households value the siren, so it may spend more than the benefit." }),
      ],
      explanation: "Net benefit US\\$20; non-excludability and free riders prevent private supply; government provision is a solution with information problems." });
  }
  {
    const t2 = table(["Year", "Harvest (tonnes)", "Price (US\\$ per tonne)", "Revenue (US\\$)"], [["Good", "6,000", "40", "240,000"], ["Drought", "4,000", "80", "320,000"]], { align: ["l", "r", "r", "r"] });
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, calculator: true, hints: ["Use percentage changes with the original value as the base.", "Consider who gains and who loses."],
      stem: `**A maize market (illustrative data)**\n\nIn a fictional district the harvest is fixed in the short run. Demand is P = 160 − 0.02Q.\n\n${t2}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "pct", value: -100 / 3, dp: 1, stem: "Calculate the percentage change in the quantity sold between the good year and the drought year, to one decimal place (include the minus sign).", wrong: [-50, 50, 33.3], explanation: "(4,000 − 6,000) ÷ 6,000 × 100 = −33.3%." }),
        P.num({ label: "(b)", marks: 2, kind: "elasticity", value: -1 / 3, dp: 2, stem: "Calculate the price elasticity of demand between the two points, to two decimal places (include the minus sign).", wrong: [-3, -0.5, 0.33], explanation: "%ΔQ = −33.3%; %ΔP = (80 − 40) ÷ 40 × 100 = +100%. PED = −33.3 ÷ 100 = −0.33, inelastic." }),
        P.manual({ label: "(c)", marks: 4, stem: "Explain why farmers' revenue is higher in the drought year.",
          points: ["Demand is inelastic (PED −0.33).", "The percentage rise in price (100%) is larger than the percentage fall in quantity (33.3%).", "So price × quantity rises, from US\\$240,000 to US\\$320,000.", "But individual farmers whose crops failed may have less to sell and lose income."],
          modelAnswer: "Demand is inelastic: the price rises by 100% while the quantity falls by only 33.3%. Price times quantity therefore rises, from US\\$240,000 to US\\$320,000. Individual farmers whose own crop failed may still lose income, since they have little to sell." }),
        P.manual({ label: "(d)", marks: 4, stem: "Evaluate whether the government should intervene to stabilise the price of maize.",
          points: ["Stable prices help farmers plan and invest and stabilise incomes.", "Consumers (and the poor) benefit from lower food price swings.", "Intervention costs money (buffer stocks, storage) and may be poorly targeted.", "Judgement: depends on the size of the swings and the cost and effectiveness of the scheme."],
          modelAnswer: "Stable prices would help farmers to plan and invest, and protect poor consumers from sharp price rises. But schemes such as buffer stocks cost money to run and store, and may be wasteful or poorly targeted. Intervention is justified if the swings are large and the scheme is affordable and well run; otherwise the cost may outweigh the gain." }),
      ],
      explanation: "Quantity falls 33.3%, price rises 100%, PED −0.33; revenue rises by US\\$80,000; intervention has benefits and costs." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Give reasons for and against.", "Reach a judgement."],
    stem: "Assess whether market failure justifies government intervention in the market for health care.",
    points: ["Health care is a merit good: consumers may undervalue it and it creates positive externalities (for example vaccination).", "Information asymmetry: patients cannot judge the quality of treatment.", "Inequality: the poor may not be able to afford care.", "Moral hazard and insurance problems.", "Intervention (provision, subsidy, regulation) can correct failures.", "Government failure: cost, waste and poor targeting.", "Limited funds and opportunity cost.", "A justified judgement."],
    levels: LV8,
    modelAnswer: "Health care is a merit good: consumers may undervalue it and it creates positive externalities, for example when vaccination reduces the spread of disease. Patients cannot judge the quality of treatment, so information is asymmetric, and many poor people could not afford care in a free market. These failures justify intervention such as public provision, subsidies and regulation. However, governments have limited funds, face an opportunity cost and may waste resources or target them poorly. Overall, market failure is strong in health care, so some intervention is justified; the right form depends on its cost and how well the government can run it.",
    wordLimit: { min: 100, max: 300 },
    explanation: "Weigh the market failures against government failure and the cost of intervention." });

  b.card("DEFINITION", "Define **market failure**.", "A situation in which the free market misallocates resources, so output is not at the level that maximises the welfare of society.");
  b.card("DEFINITION", "What is the **free-rider problem**?", "People can use a non-excludable good without paying, so firms cannot charge and the good is under-provided.");
  b.card("DEFINITION", "Define **asymmetric information**.", "One party to a transaction has more or better information than the other.");
  b.card("DEFINITION", "Define **moral hazard**.", "Taking more risk because someone else (such as an insurer) bears the cost.");
  b.card("CONCEPT", "List **five** sources of market failure.", "Public goods, externalities, merit and demerit goods, information failure, monopoly power (also immobility, common property, inequality).");
  b.card("CONCEPT", "Why is a monopoly a source of market failure?", "It restricts output and sets price above marginal cost, so P > MC and there is a welfare loss.");
  b.card("CONCEPT", "Why are primary product prices volatile?", "Demand and supply are inelastic in the short run and supply varies with the weather, so small shifts cause large price changes.");
  b.card("CONCEPT", "What is the **tragedy of the commons**?", "Over-use of a resource that nobody owns, because each user ignores the cost to others.", "ZIMSEC detail", { applies: ZIM });
  b.card("CONCEPT", "Why can government intervention fail?", "Limited information, cost, interest groups and unintended effects (government failure).");
});
