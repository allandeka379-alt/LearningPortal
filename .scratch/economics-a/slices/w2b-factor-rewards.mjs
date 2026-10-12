// W2b: rewards to the factors of production; functional and personal distribution (both boards, AS / Form 5).
import { concept, P, chk, table, pieAngles, pctChange } from "../lib.mjs";
import { mc, LV8 } from "../tables/w2b-kit.mjs";

concept("aecon.distribution.factor-rewards", { file: "distribution/factor-rewards", keyPrefix: "distribution.factor-rewards" }, (b) => {
  mc(b, [1, "RECALL"], "The reward to the factor of production land is",
    ["rent", "Correct: rent is the payment for the use of land."],
    [["wages", "Wages reward labour."], ["interest", "Interest rewards capital."], ["profit", "Profit rewards enterprise."]],
    "Rent rewards land, wages labour, interest capital and profit enterprise.");

  mc(b, [1, "RECALL"], "The reward to enterprise is",
    ["profit", "Correct: the reward for organising production and bearing risk."],
    [["rent", "That is the reward to land."], ["interest", "That is the reward to capital."], ["wages", "That is the reward to labour."]],
    "Profit is the reward to the entrepreneur.");

  mc(b, [2, "UNDERSTANDING"], "The functional distribution of income shows",
    ["how income is divided between wages, rent, interest and profit", "Correct: it divides income by factor."],
    [["how national income is divided between rich and poor households", "That is the personal distribution."],
     ["how national income is divided between the regions", "That is a regional distribution."],
     ["how government spending is divided between ministries", "That is not a distribution of income."]],
    "The functional distribution divides national income between the factors of production.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "The personal distribution of income is concerned with",
    ["the shares of income received by individuals or households", "Correct: it ranks people, not factors."],
    [["the shares of income received by each factor of production", "That is the functional distribution."],
     ["the share of income paid in taxation", "That concerns the tax system."],
     ["the shares of income spent on consumption and saving", "That is the use of income, not its distribution."]],
    "Personal distribution shows how income is shared among households.");

  mc(b, [3, "ANALYSIS"], "The demand for farmland is a derived demand because it depends on",
    ["the demand for the crops grown on it", "Correct: demand for the factor is derived from demand for the product."],
    [["the supply of land in other districts", "Supply is a separate force."],
     ["the amount of tax paid by landowners", "Tax does not define derived demand."],
     ["the wage of farm workers on the land", "Wages affect cost but do not define derived demand."]],
    "A factor is demanded for what it helps to produce, so its demand depends on demand for the product.", { hints: ["Why do farmers want land at all?"] });

  mc(b, [3, "ANALYSIS"], "The wage bill of a fictional country rises by 5% while its national income rises by 8%. Labour's share of national income",
    ["falls", "Correct: income grew faster than the wage bill."],
    [["rises", "The wage bill grew more slowly than income."], ["stays the same", "A change in the two growth rates changes the share."], ["cannot be known without the wage rate", "The share depends only on the two totals."]],
    "A share rises only if the part grows faster than the whole; here it grows more slowly, so the share falls.", { hints: ["Compare the growth rates of the part and the whole."] });

  mc(b, [3, "APPLICATION"], "The supply of farmland in a district is fixed. If demand for the land rises, in the short run",
    ["rent rises, with the quantity of land unchanged", "Correct: the whole adjustment falls on rent."],
    [["rent falls and the quantity of land rises", "Rent rises when demand rises."],
     ["rent is unchanged and the quantity of land rises", "Supply is fixed, so quantity cannot rise."],
     ["rent rises and the quantity of land rises", "The quantity of land is fixed."]],
    "With fixed supply, a rise in demand raises the rent but not the quantity.", { hints: ["What does a vertical supply curve imply?"] });

  mc(b, [4, "ANALYSIS"], "Which statement about profit is correct?",
    ["It is a residual and can be negative", "Correct: it is what remains after other factors are paid."],
    [["It is fixed by contract before production starts", "Wages, rent and interest are contracted; profit is not."],
     ["It is always equal to the wage bill", "There is no such rule."],
     ["It is the same as interest on borrowed money", "Interest is the reward to capital, not to enterprise."]],
    "Profit is what remains after rent, wages and interest are paid, and can be a loss.", { hints: ["Which factor reward is not agreed in advance?"] });

  {
    const profit = 640 - 350 - 45 - 70;
    chk(profit, 175, 0);
    b.num({ d: 2, skill: "APPLICATION", daily: true, kind: "plain", value: profit, unit: "US$ thousand",
      stem: "A fictional farm sells its crop for US\\$640 thousand. It pays US\\$350 thousand in wages, US\\$45 thousand in rent and US\\$70 thousand in interest. Calculate the profit, in US\\$ thousand.",
      wrong: [265, 110, 1105],
      explanation: "Profit is the residual: 640 − 350 − 45 − 70 = US\\$175 thousand." });
  }
  {
    const parts = [9360, 1440, 2160, 5040];
    chk(parts.reduce((a, c) => a + c, 0), 18000, 0);
    b.calc({ d: 3, skill: "APPLICATION", calculator: true, kind: "plain", value: pieAngles(parts)[3], dp: 1, hints: ["Share of the total × 360."],
      stem: "A fictional national income of US\\$18,000 million is divided into wages US\\$9,360 million, rent US\\$1,440 million, interest US\\$2,160 million and profit US\\$5,040 million. What angle (in degrees, to one decimal place) would profit have on a pie chart?",
      wrong: [28, 187.2, 64.8],
      explanation: "1. Profit share = 5,040 ÷ 18,000 = 0.28 (28%).\n2. Angle = 0.28 × 360 = 100.8 degrees.\n3. Using 28 gives the percentage, not the angle." });
  }
  {
    const r = pctChange(45, 54);
    chk(r, 20, 1e-9);
    b.num({ d: 2, skill: "APPLICATION", kind: "pct", value: r, dp: 1,
      stem: "The rent on a hectare of fictional farmland rises from US\\$45 to US\\$54 a year. Calculate the percentage change in rent.",
      wrong: [16.7, 9, 120],
      explanation: "(54 − 45) ÷ 45 × 100 = +20%. Dividing by the new value gives 16.7%." });
  }

  b.tf({ d: 1, skill: "RECALL", stem: "The reward to labour is called interest.", answer: false,
    explanation: "False. Labour receives wages (and salaries); interest rewards capital." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "One household can receive income from several factor rewards at the same time.", answer: true,
    explanation: "True. A household may receive wages, rent on property and interest on savings, which is why the personal distribution differs from the functional one." });

  b.match({ d: 1, skill: "RECALL", stem: "Match each factor of production with its reward.",
    pairs: [["Land", "Rent"], ["Labour", "Wages"], ["Capital", "Interest"], ["Enterprise", "Profit"]],
    explanation: "Each factor of production earns a distinct reward." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Choose the correct terms.",
    template: "The division of national income between wages, rent, interest and profit is the {{blank:a}} distribution; the division between households is the {{blank:b}} distribution.",
    blanks: [{ id: "a", accepted: ["functional"], choices: ["functional", "personal", "regional"] }, { id: "b", accepted: ["personal"], choices: ["functional", "personal", "regional"] }],
    explanation: "Functional is by factor; personal is by household." });

  b.short({ d: 2, skill: "RECALL", daily: true, stem: "What term describes the minimum profit needed to keep an entrepreneur in a business?",
    accepted: ["normal profit", "normal"], wrong: ["supernormal profit"],
    explanation: "Normal profit is the minimum reward that keeps the entrepreneur in the business." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 3, stem: "Distinguish between the functional and the personal distribution of income.",
    points: ["The functional distribution divides national income between the factors of production.", "The personal distribution divides income between individuals or households.", "A household may receive several factor rewards, so the two are not the same."],
    modelAnswer: "The functional distribution shows how national income is shared between wages, rent, interest and profit. The personal distribution shows how it is shared among households. A household may receive several factor rewards, so the two views differ.",
    explanation: "One mark for each distinguishing idea." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Name each reason and say how it raises or lowers a reward."],
    stem: "Explain **two** reasons why the rewards received by different people differ.",
    points: ["Reason 1 identified (for example, differences in skills).", "Reason 1 explained: scarce skills have a high marginal product and are in short supply, so they earn more.", "Reason 2 identified (for example, ownership of property or capital).", "Reason 2 explained: owners receive rent, interest or profit in addition to wages."],
    modelAnswer: "People differ in skills and qualifications: scarce skills are valuable to employers and few workers have them, so they earn higher wages. People also differ in the property they own: those with land, savings or a business receive rent, interest or profit as well as wages, so their total income is higher.",
    explanation: "Two reasons, each identified and explained." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4, hints: ["Think about what a fixed supply means."],
    stem: "Analyse why a rise in the price of maize is likely to raise the rent on farmland.",
    points: ["The demand for land is derived from the demand for the crops grown on it.", "A higher price of maize makes each hectare more valuable to farmers.", "Farmers compete for land, so demand shifts right.", "Supply of land is fixed (inelastic), so the rise in demand raises rent rather than quantity."],
    modelAnswer: "Demand for land is derived from the demand for what it produces. A higher maize price makes each hectare more profitable, so farmers compete for land and demand shifts to the right. Because the supply of land is fixed, the quantity cannot rise, so the competition bids the rent up.",
    explanation: "Derived demand, profitability, competition and fixed supply." });

  {
    const f = [7800, 900, 1800, 4500];
    const tbl = table(["Reward", "Income (US\\$ million)"], [["Wages", 7800], ["Rent", 900], ["Interest", 1800], ["Profit", 4500], ["**National income**", "**15,000**"]]);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["Share = part ÷ total × 100.", "Angle = share of 360."],
      stem: `**Income by factor in a fictional country (illustrative data)**\n\n${tbl}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "pct", value: (7800 / 15000) * 100, dp: 1, stem: "Calculate the share of national income received as wages, to one decimal place.", wrong: [30, 5.2, 48], explanation: "7,800 ÷ 15,000 × 100 = 52.0%." }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: (1800 / 15000) * 360, sf: 3, stem: "Calculate the angle for interest on a pie chart, in degrees.", wrong: [12, 43.2, 180], explanation: "1,800 ÷ 15,000 = 0.12; 0.12 × 360 = 43.2 degrees." }),
        P.mcq({ label: "(c)", marks: 1, stem: "The table shows", options: [["the personal distribution of income", "It does not rank households."], ["the functional distribution", "Correct: income is divided by factor reward."], ["the regional distribution of income", "No regions are shown."], ["the distribution of wealth", "It shows income, not assets."]], answer: "B", explanation: "The division by reward is the functional distribution." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain **one** reason why labour's share of national income might fall over time even if the wage bill rises.",
          points: ["Labour's share is the wage bill divided by national income.", "If national income grows faster than the wage bill, the share falls.", "For example, profit or other incomes may rise more quickly than wages."],
          modelAnswer: "Labour's share equals the wage bill divided by national income. If national income grows faster than the wage bill, for example because profits rise rapidly, labour's share falls even though total wages are higher." }),
      ],
      explanation: "Wages 52.0% of national income; interest takes 43.2 degrees; the table is the functional distribution." });
  }
  {
    const q = [6, 10, 15, 24, 45];
    chk(q.reduce((a, c) => a + c, 0), 100, 0);
    const tbl = table(["Household fifth (poorest first)", "Share of income (%)"], q.map((v, i) => [["Poorest 20%", "Second 20%", "Middle 20%", "Fourth 20%", "Richest 20%"][i], v]));
    b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, hints: ["Add the shares of the poorest two fifths.", "Equal shares would be 20% each."],
      stem: `**Income shares in a fictional economy (illustrative data)**\n\n${tbl}`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "pct", value: 16, dp: 0, stem: "Calculate the share of income received by the poorest 40% of households, in %.", wrong: [10, 6, 30], explanation: "6 + 10 = 16%." }),
        P.num({ label: "(b)", marks: 2, kind: "times", value: 7.5, dp: 1, stem: "How many times larger is the share of the richest fifth than the share of the poorest fifth?", wrong: [39, 0.13, 4.5], explanation: "45 ÷ 6 = 7.5 times." }),
        P.num({ label: "(c)", marks: 1, kind: "plain", value: 25, unit: "percentage points", stem: "By how many percentage points does the richest fifth's share exceed an equal share of 20%?", wrong: [45, 5, 39], explanation: "45 − 20 = 25 percentage points." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain **one** reason why the richest fifth of households receive a larger share of income.",
          points: ["They may own more property, land or capital, so receive rent, interest and profit.", "They may have scarce skills and qualifications that earn high wages.", "They have greater access to education and credit, which raises income further."],
          modelAnswer: "The richest households are more likely to own land, shares or businesses, so they receive rent, interest and profit in addition to wages. They are also more likely to have scarce skills and good education, which attract high wages." }),
        P.manual({ label: "(e)", marks: 3, stem: "Analyse why the functional distribution of income may not show how unequal incomes are.",
          points: ["It divides income between factors, not between people.", "Within each factor there may be large differences (high and low wages, for example).", "Households receive several rewards, so the factor shares do not rank households."],
          modelAnswer: "The functional distribution divides income between wages, rent, interest and profit rather than between people. Within wages, a manager and a cleaner are treated alike, and households may receive several rewards at once, so it does not show how unequal households are." }),
        P.manual({ label: "(f)", marks: 2, stem: "Suggest **one** policy that could reduce inequality in the personal distribution.",
          points: ["A named policy (progressive taxation, transfers, education, minimum wage).", "How it works: reduces the income of the rich or raises the income of the poor."],
          modelAnswer: "Progressive taxation takes a larger share of high incomes, and the revenue can fund transfers and education for poorer households, narrowing the gap." }),
      ],
      explanation: "Poorest 40% receive 16%; the richest fifth receive 7.5 times the poorest fifth; reasons and a policy." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Give market and non-market reasons.", "Reach a judgement."],
    stem: "Assess whether market forces are the main reason why incomes differ between people.",
    points: ["Demand and supply set wages: scarce, productive skills earn more.", "Risk-taking and enterprise explain high profits.", "Returns to property (rent, interest) depend on what people own.", "Inheritance and unequal ownership are not market forces.", "Discrimination and unequal access to education or credit.", "Trade unions and monopoly power raise some rewards above market levels.", "Government policy (tax and transfers) changes final incomes.", "A justified judgement."],
    levels: LV8,
    modelAnswer: "Market forces explain a large part of income differences: scarce and productive skills command high wages, entrepreneurs who take risks can earn high profits, and owners of property receive rent and interest. But markets work on top of an unequal starting point. People inherit wealth or access to good education and credit, so the market reward depends on what they already own. Discrimination, union and monopoly power also raise some rewards above competitive levels, and taxes and transfers change final incomes. Overall, market forces are the main direct reason for different factor rewards, but unequal ownership and access, which are not market outcomes, are important reasons why incomes differ so widely.",
    wordLimit: { min: 100, max: 300 },
    explanation: "Weigh market explanations against ownership, power and policy, then judge." });

  b.card("CONCEPT", "What are the **four factor rewards**?", "Rent (land), wages (labour), interest (capital), profit (enterprise).");
  b.card("DEFINITION", "Define the **functional distribution of income**.", "The division of national income between the factors of production (wages, rent, interest, profit).");
  b.card("DEFINITION", "Define the **personal distribution of income**.", "The division of national income between individuals or households.");
  b.card("CONCEPT", "Why is **profit a residual**?", "It is what is left after rent, wages and interest are paid, so it is uncertain and can be negative.");
  b.card("DEFINITION", "What is **normal profit**?", "The minimum reward needed to keep the entrepreneur in the business; anything above it is supernormal (abnormal) profit.");
  b.card("CONCEPT", "Why is the demand for a factor a **derived demand**?", "It depends on the demand for the goods the factor helps to produce.");
  b.card("FORMULA", "How do you calculate a factor's **share** of national income?", "Factor income ÷ national income × 100.");
  b.card("CONCEPT", "What happens to rent if the demand for land rises and its supply is fixed?", "Rent rises; the quantity of land stays the same.");
  b.card("CONCEPT", "Give **three** reasons why rewards differ between people.", "Differences in ownership of property, skills, risk-taking, market power and unequal access to education or credit.");
});
