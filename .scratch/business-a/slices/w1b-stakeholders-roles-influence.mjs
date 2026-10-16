// W1b: stakeholders.roles-influence
import { concept, P, chk, money, pctChange } from "../lib.mjs";
import { mc } from "../tables/w1b-lib.mjs";

concept("abus.stakeholders.roles-influence", { file: "stakeholders/roles-influence", keyPrefix: "stakeholders.roles-influence" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "A **stakeholder** in a business is best defined as",
    ok: ["any person or group that has an interest in the business", "Correct: it covers anyone affected by the business or able to affect it."],
    bad: [["only the people who own the shares in the business concerned", "Shareholders are one kind of stakeholder, not the whole definition."], ["only the people who are paid a regular wage by the firm", "Employees are one stakeholder group; customers and the community are others."], ["only the customers who regularly buy goods from the business", "Customers are one stakeholder group among many."]],
    explanation: "A stakeholder is any individual or group affected by, or able to affect, the business.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of these is an **internal** stakeholder of a business?",
    ok: ["A worker employed in the firm's factory", "Correct: employees are part of the organisation."],
    bad: [["A bank that has lent money to the firm", "Lenders are external stakeholders."], ["A supplier who delivers raw materials", "Suppliers are external to the firm."], ["A pressure group campaigning about pollution", "Pressure groups are outside the firm."]],
    explanation: "Owners, managers and employees are internal stakeholders; all others are external.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the main interest of **lenders** such as banks in a business?",
    ok: ["Repayment of the loan together with interest", "Correct: the bank wants its money back and the agreed interest."],
    bad: [["A share of the profit in the form of dividends", "Dividends go to shareholders, not lenders."], ["Lower prices for the goods the firm sells", "Prices matter to customers, not to lenders."], ["A voice in choosing the board of directors", "Lenders do not vote for directors; shareholders do."]],
    explanation: "Lenders seek repayment and interest.",
  });
  mc(b, {
    d: 2, skill: "APPLICATION",
    stem: "Residents near a fictional quarry in Masvingo complain about dust and noise. Which type of stakeholder are they?",
    ok: ["External stakeholders from the local community", "Correct: they are outside the firm and affected by its operation."],
    bad: [["Internal stakeholders who help to run the quarry", "Residents do not work for or own the quarry."], ["Owners with a right to a share of the profit", "Residents have no ownership of the quarry."], ["Suppliers who deliver materials to the quarry", "They are not described as supplying anything."]],
    explanation: "Local residents are external stakeholders affected by the firm's operations.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional firm closes its branch in Mutare to cut costs. Which stakeholder gains the **most clearly** from the decision?",
    ok: ["The shareholders, because lower costs may raise their profit", "Correct: lower costs help profit and dividends."],
    bad: [["The workers at the branch, because they lose their jobs", "Workers who lose their jobs are harmed by the closure."], ["The customers of the branch, because they lose a nearby shop", "Customers lose a convenient shop, which is a harm."], ["The local community, because spending in the area falls", "Lower local spending is a harm to the community."]],
    hints: ["Which group benefits when costs fall?"],
    explanation: "Cutting costs helps profit and so benefits shareholders; the other groups lose.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "A fictional bakery is the only buyer of flour from a small mill, and the mill has no other customers. Which statement about the relative power of the stakeholders is most likely correct?",
    ok: ["The bakery has more power over the mill than the mill has over it", "Correct: the mill depends entirely on one customer."],
    bad: [["The mill has more power over the bakery because it makes the flour", "The mill cannot easily sell to others, so it depends on the bakery."], ["Neither has any power over the other, because both are external stakeholders", "Dependence gives power; external stakeholders can be very powerful."], ["The mill and the bakery have exactly equal power over each other", "Equal power is unlikely when one depends wholly on the other."]],
    hints: ["Ask which firm could easily find an alternative."],
    explanation: "The side with the alternatives has the greater power; the mill has none.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which situation is the clearest example of a **conflict** between stakeholders' aims?",
    ok: ["Shareholders want higher dividends and workers want higher pay from one profit", "Correct: both groups want a larger share of the same profit."],
    bad: [["Customers and owners both want the firm to remain in business for many years", "Both want the same thing, so there is no conflict."], ["Suppliers and managers both want orders to be delivered to customers on time", "Both want smooth deliveries; there is no conflict."], ["Lenders and the bank manager both want the loan to be repaid on time", "They share the same aim."]],
    hints: ["Look for two groups wanting a bigger share of the same thing."],
    explanation: "Conflict arises when the aims of two groups cannot both be fully met.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which is the **most convincing** judgement on whether a firm should put shareholders' interests above all others?",
    ok: ["No, because unhappy workers, customers or neighbours can reduce the shareholders' profit", "Correct: it links other stakeholders' reactions to the shareholders' own aim."],
    bad: [["Yes, because shareholders own the firm and so nobody else really matters at all", "Others can affect the firm's survival and profit, so they matter."], ["No, because shareholders have no real interest in the firm's profit or dividends", "Shareholders are chiefly interested in profit."], ["Yes, because other groups never react to the firm's decisions in any way", "Workers, customers and others do react, as strikes and boycotts show."]],
    hints: ["Choose the answer that gives a reason connected to the firm's results."],
    explanation: "A convincing judgement shows that ignoring other stakeholders can damage the profit that shareholders want.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Customers, suppliers and the government are external stakeholders.",
    answer: true,
    explanation: "True. They are outside the organisation but have an interest in it or can influence it.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "A stakeholder with a strong interest in a decision always has the most influence over it.",
    answer: false,
    explanation: "False. Influence depends on power, organisation, alternatives and legal rights, not on interest alone; local residents may care a great deal but have little power.",
    hints: ["Think about residents who object to a factory but cannot stop it."],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each stakeholder to its main interest.",
    pairs: [["Shareholders", "Dividends and growth in the value of their shares"], ["Employees", "Pay, job security and safe working conditions"], ["Customers", "Quality goods at a fair price"], ["Government", "Tax revenue and compliance with the law"]],
    explanation: "Each stakeholder group has a distinct main interest.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "Managers are {{blank:a}} to the owners of the business, which means they must explain and justify their {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["accountable"], choices: ["accountable", "unrelated", "superior"] },
      { id: "b", accepted: ["decisions"], choices: ["decisions", "holidays", "hobbies"] },
    ],
    explanation: "Accountability means being obliged to explain and justify decisions and results.",
  });

  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "State **one** way in which a pressure group might influence a business.",
    accepted: ["campaign", "protest", "boycott", "publicity", "petition", "lobbying the government", "lobby the council", "bad publicity", "media campaign", "demonstration"],
    explanation: "Pressure groups campaign, protest, call for boycotts and publicise the firm's behaviour.",
  });

  {
    const profit = 60000, pct = 35;
    const div = (profit * pct) / 100;
    chk(div, 21000, 1e-6);
    b.num({
      d: 2, skill: "APPLICATION", daily: true,
      stem: `A fictional company earned a profit of ${money(profit)}. Its board decides to pay ${pct}% of the profit to shareholders as dividends. How much will shareholders receive in total?`,
      kind: "money", value: div, wrong: [profit - div, profit * pct],
      explanation: `35% of 60,000 = 60,000 × 35 ÷ 100 = US\\$21,000. The remaining US\\$39,000 is left for other uses, which is the wrong answer if you take the balance.`,
    });
  }
  {
    const pool = 9000, workers = 15, wageOld = 80000, wageNew = 86400;
    const each = pool / workers;
    chk(each, 600, 1e-9);
    const rise = pctChange(wageOld, wageNew);
    chk(rise, 8, 1e-9);
    b.calc({
      d: 3, skill: "APPLICATION",
      stem: `A fictional workshop in Bulawayo shares a bonus pool of ${money(pool)} equally among its ${workers} workers. How much does each worker receive?`,
      kind: "money", value: each, wrong: [pool * workers, pool / (workers + 1)],
      hints: ["Divide the pool by the number of workers."],
      explanation: `Each worker receives 9,000 ÷ 15 = US\\$600.`,
    });
    b.num({
      d: 3, skill: "APPLICATION",
      stem: `After a union negotiation, the yearly wage bill of a fictional firm rises from ${money(wageOld)} to ${money(wageNew)}. Calculate the percentage increase to one decimal place.`,
      kind: "pct", value: rise, wrong: [(wageNew - wageOld) / wageNew * 100, (wageNew / wageOld) * 100],
      hints: ["Percentage change is the increase divided by the original figure."],
      explanation: `The increase is 86,400 − 80,000 = 6,400. 6,400 ÷ 80,000 × 100 = 8.0%. Dividing by the new figure gives 7.4%.`,
    });
  }

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Distinguish between an internal and an external stakeholder.",
    points: ["An internal stakeholder is part of the organisation, such as owners, managers and employees", "An external stakeholder is outside it, such as customers, suppliers, lenders, government and the community"],
    modelAnswer: "Internal stakeholders belong to the organisation, such as owners, managers and workers. External stakeholders are outside it, such as customers, suppliers, banks and the community.",
    explanation: "One mark for each type, with examples.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Rudo owns a fictional chicken farm in Chinhoyi and plans to double output. Explain how this decision could affect **two** stakeholders.",
    points: ["Workers: more jobs and overtime", "Application: more staff are needed to look after the extra birds", "Neighbours or the community: more smell, noise and waste", "Application: residents may complain or demand action from the council"],
    modelAnswer: "Workers may gain more jobs and overtime because more staff are needed for the extra birds. Neighbours may suffer more smell, noise and waste, so they might complain to the council or campaign against the farm.",
    hints: ["Choose two groups and say whether each gains or loses."],
    explanation: "Two stakeholders, each with a developed effect.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse why conflict may arise between shareholders and workers after a profitable year.",
    points: ["Shareholders want a high share of the profit as dividends", "Workers want higher pay or a bonus from the same profit", "Each pound or dollar paid to one group reduces what is left for the other", "Unresolved conflict can lower morale or cause strikes, harming future profit"],
    modelAnswer: "Shareholders expect dividends and workers expect higher pay, but both are paid from the same profit, so more for one means less for the other. If workers feel they are treated unfairly, morale falls or they strike, which reduces future profit for everyone.",
    hints: ["Follow what happens to the same profit when each group asks for more."],
    explanation: "The source of conflict and its consequence.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 5,
    stem: "Assess whether the community or the bank is the more influential stakeholder when a fictional factory plans to expand.",
    points: ["The bank can refuse or call in a loan, which stops the expansion", "The community can protest, complain to the council and damage the firm's reputation", "The bank has legal rights and financial power; the community has fewer formal powers", "The community's influence increases if it is organised or supported by the council", "Judgement with a reason or condition"],
    modelAnswer: "The bank can refuse finance, which would stop the expansion at once, and it has legal rights to repayment. The community has less formal power but can protest and complain to the council, which could delay or stop the plan. On balance the bank is more influential, unless the community is well organised and the council supports it.",
    hints: ["Compare power and rights, then state what the judgement depends on."],
    explanation: "Both groups compared, with a conditional judgement.",
  });

  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "A fictional business: Zambezi Cement (Victoria Falls) made a profit of US\\$90,000. The board proposes to pay 50% as dividends, 20% as a bonus to its 30 workers and keep the rest. The workers' union says the bonus is too small. Residents downstream complain about dust from the plant.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the total paid as dividends.", kind: "money", value: (90000 * 50) / 100, wrong: [90000 * 20 / 100, 90000 * 30 / 100], explanation: "50% of 90,000 = US\\$45,000." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the bonus received by each worker if the bonus is shared equally.", kind: "money", value: ((90000 * 20) / 100) / 30, wrong: [(90000 * 20) / 100, 90000 / 30], explanation: "The bonus pool is 20% of 90,000 = US\\$18,000. Each worker receives 18,000 ÷ 30 = US\\$600." }),
      P.manual({ label: "(c)", marks: 3, stem: "Identify **one** internal and **one** external stakeholder in the case and state an interest of each.", points: ["Internal stakeholder with an interest (workers: bonus; shareholders: dividends)", "External stakeholder with an interest (residents: less dust; government: tax)", "Both stakeholders correctly classified and their interests linked to the case"], modelAnswer: "The workers are internal stakeholders and want a larger bonus. The residents are external stakeholders and want less dust from the plant.", explanation: "One mark for each stakeholder and interest, one for correct classification." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest **one** way in which the board could reduce the conflict with the union.", points: ["Consult or negotiate with the union about the bonus", "Application: raise the bonus by reducing the share kept or dividends slightly"], modelAnswer: "The board could meet the union and negotiate, perhaps raising the bonus a little by reducing the amount kept in the business.", explanation: "A method, applied to the case." }),
    ],
    hints: ["Use percentages of the profit for the first two parts."],
    explanation: "The shares of the profit are calculated and stakeholder interests and conflict are discussed.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "A fictional business: Tendai runs Hwange Coal Supplies, which employs 120 workers and sells coal to a power plant that takes 60% of its output. The bank that financed new trucks wants its loan repaid in two years. An environmental group wants the firm to reduce dust and has asked customers to boycott it. The power plant says it will take less coal if prices rise.",
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Analyse the power of **one** stakeholder over the firm.", points: ["The power plant buys 60% of output", "It could reduce orders if prices rise", "The firm's income would fall sharply", "The firm could find it hard to replace such a large customer"], modelAnswer: "The power plant buys 60% of the firm's coal, so it controls most of the firm's income. If prices rise it can reduce orders, and the firm might struggle to find another large customer.", hints: ["Choose one group and say what it can do to the firm."], explanation: "The source of power and its effect." }),
      P.manual({ label: "(b)", marks: 4, stem: "Explain how the aims of the bank and the environmental group may conflict with those of the workers.", points: ["The bank wants quick repayment, which may mean cost cutting", "Cost cutting may mean fewer jobs or lower pay", "The group wants dust reduced, which costs money", "Extra cost may reduce the funds for repayments or wages"], modelAnswer: "The bank wants repayment within two years, which may require cuts in costs and fewer jobs. The environmental group wants the dust to be reduced, which costs money and may further reduce what is available for wages and repayments.", explanation: "Two conflicts, with the reasons." }),
      P.manual({ label: "(c)", marks: 6, stem: "Evaluate which stakeholder Tendai should give priority to.", points: ["The power plant: most important customer and source of income", "The bank: legal right to repayment, can threaten the firm", "The workers: skilled labour needed but easier to replace than the main customer", "The environmental group: can harm reputation but least formal power", "Judgement that ranks the groups", "A condition or time-frame for the judgement"], modelAnswer: "The power plant buys 60% of output, so losing it would end the firm's income, which makes it the most important. The bank also has a legal right to repayment and can force action. The workers matter but are easier to replace, and the environmental group has the least formal power, although its boycott could damage the firm's reputation. Tendai should give priority to the power plant and the bank, while taking low-cost steps to reduce the dust so that the group's pressure does not grow, and he should review the position if more customers join the boycott.", hints: ["Rank the groups by power, then add a condition."], explanation: "The groups are ranked with reasons and a condition." }),
    ],
    hints: ["Quote the case, such as 60% of output."],
    explanation: "Power is analysed, conflicts explained and priorities evaluated.",
  });

  b.card("DEFINITION", "Stakeholder", "An individual or group with an interest in a business that is affected by it or can affect it.");
  b.card("CONCEPT", "Internal and external stakeholders", "Internal: owners, managers, employees. External: customers, suppliers, lenders, government, the community and pressure groups.");
  b.card("FACT", "Main interests of stakeholders", "Shareholders: profit and dividends. Workers: pay and security. Customers: quality and price. Lenders: repayment. Government: tax and law. Community: jobs and environment.");
  b.card("DEFINITION", "Accountability", "The obligation of managers and directors to explain and justify their decisions and results to those with a legitimate interest.");
  b.card("CONCEPT", "Stakeholder conflict", "Conflict arises when aims differ, for example dividends against pay, or low prices against high profit. It can be reduced by communication, consultation and compromise.");
  b.card("FACT", "What gives a stakeholder influence", "Power over the business, interest in the decision, organisation, lack of alternatives for the firm and legal rights.");
  b.card("CONCEPT", "Shareholder and stakeholder views", "Shareholder view: the firm exists to earn a return for its owners. Stakeholder view: it must balance the interests of everyone affected.");
  b.card("CONCEPT", "How stakeholders react to decisions", "Owners sell shares or vote out directors; workers strike or leave; customers switch; suppliers tighten terms; the community protests; pressure groups campaign.");
});
