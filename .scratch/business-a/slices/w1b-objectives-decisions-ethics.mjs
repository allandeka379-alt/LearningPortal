// W1b: objectives.decisions-ethics
import { concept, P, chk, money, ZIM } from "../lib.mjs";
import { mc } from "../tables/w1b-lib.mjs";

concept("abus.objectives.decisions-ethics", { file: "objectives/decisions-ethics", keyPrefix: "objectives.decisions-ethics" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "In the acronym SMART, the letter **M** stands for",
    ok: ["measurable", "Correct: the objective must contain a number or other measure."],
    bad: [["motivating", "Motivation is a benefit of SMART objectives, not the letter M."], ["managerial", "SMART has no managerial letter."], ["monthly", "An objective may cover any time period; M is not monthly."]],
    explanation: "SMART objectives are specific, measurable, achievable, realistic and time-limited.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which objective is **SMART**?",
    ok: ["Raise tuck-shop sales by 10% over the next 12 months", "Correct: specific, measurable and time-limited, with a realistic size."],
    bad: [["Make the tuck shop the best one in the whole country", "No measure and no time limit are given."], ["Sell a lot more bread and sweets than before", "It has no figure and no deadline."], ["Increase sales as quickly as possible, for ever", "It has no measure, no deadline and cannot be achieved."]],
    explanation: "A SMART objective has a clear aim, a measure, a realistic size and a deadline.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "In rational decision-making, what comes **immediately after** setting the objective?",
    ok: ["Gathering information about the current situation", "Correct: managers need facts before they can list options."],
    bad: [["Reviewing the final result of the decision made", "Review is the last stage, after the decision has been carried out."], ["Choosing the final option that will be implemented", "A choice can be made only after the options have been identified."], ["Printing the final report on the whole decision", "Reporting follows the decision and is not the second stage."]],
    explanation: "The stages run: objective, information, options, analysis and choice, implementation, review.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional furniture firm in Mutare sets a yearly sales target of US\\$300,000 and tells each of its three branches to reach US\\$100,000. Which statement is most likely to be correct?",
    ok: ["It is measurable, but equal branch targets may be unfair if branches differ in size", "Correct: the figure is measurable, but equal targets ignore local conditions."],
    bad: [["The target is not measurable because it covers a whole year of trading", "A yearly figure is measurable; it also has a time limit."], ["The target cannot be divided up between the three branches of the firm", "Targets are usually divided between departments or branches."], ["The target is a budget because it contains a dollar figure in it", "A dollar figure in a target does not make it a budget; a budget is a financial plan."]],
    hints: ["Think of whether three branches in different towns would all sell the same amount."],
    explanation: "The target is measurable and time-limited, but equal targets may not be realistic for every branch.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "A fictional bakery owner tells staff only that the firm's aim is \"to do better\". What is the most likely result?",
    ok: ["Staff do not know what to aim for, so effort is uncoordinated", "Correct: an unclear objective gives no direction or measure."],
    bad: [["Staff become more motivated because they are free to choose their own targets", "Without clear targets effort is uncoordinated; freedom of this kind does not by itself motivate."], ["Managers can easily review the result because the aim is simple", "A vague aim is the hardest to review as it contains no measure."], ["The firm avoids all conflict between departments", "Unclear aims often lead to conflict between departments."]],
    hints: ["Ask what workers would need to know to act on the aim."],
    explanation: "Vague objectives give no direction, no target and no way to review performance.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which is a possible **benefit** to a firm of behaving ethically?",
    ok: ["It may win the loyalty of customers and employees", "Correct: trust increases repeat purchases."],
    bad: [["It guarantees higher profit in every single year", "Ethical behaviour often adds costs and can reduce profit in the short run."], ["It removes the need for any kind of record keeping", "Ethics does not remove record keeping."], ["It prevents all competitors from entering the market", "Competitors may enter regardless of how ethical a firm is."]],
    hints: ["Which option is a possible gain rather than a guarantee?"],
    explanation: "Ethical behaviour can build trust and reputation, although it may add cost.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", applies: ZIM,
    stem: "A small firm wants to build a new factory but cannot borrow the money. Which constraint on its objectives is shown?",
    options: [["Finance", "Correct: the firm lacks the funds to pursue the objective."], ["Law", "No law is mentioned as the barrier."], ["Competition", "Rivals are not mentioned in the case."], ["Stakeholders", "No stakeholder opposes the plan; the problem is money."]],
    answer: "A",
    explanation: "Unable to borrow, the firm is limited by lack of finance.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", applies: ZIM,
    stem: "A fictional miller in Gweru pays maize farmers promptly and fairly, even when she could delay payment for a month, because she believes that trading should respect the people involved. Which value is she showing?",
    options: [["Unhu/ubuntu values", "Correct: respect and fairness towards others in business."], ["Profit maximisation", "Delaying payment would be closer to profit maximisation."], ["Market leadership", "The case says nothing about her market position."], ["Cost cutting", "Prompt payment does not cut costs."]],
    answer: "A",
    hints: ["Which value is about respect and fairness in dealings with people?"],
    explanation: "Fair, prompt dealing with suppliers is an application of unhu/ubuntu.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Business ethics concern behaviour that goes beyond simply obeying the law.",
    answer: true,
    explanation: "True. The law sets minimum standards; ethics are the moral principles that guide behaviour above that minimum, such as honesty and fairness.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "A SMART objective can have a deadline but does not need to be measurable.",
    answer: false,
    explanation: "False. Measurable and time-limited are both parts of SMART; an objective that cannot be measured cannot be reviewed.",
    hints: ["Which letter of SMART refers to numbers?"],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each letter of SMART to its meaning.",
    pairs: [["Specific", "States exactly what is to be achieved"], ["Measurable", "Contains a figure by which success can be judged"], ["Realistic", "Fits the resources and the market"], ["Time-limited", "Has a date by which it must be achieved"]],
    explanation: "Each letter tests a different feature of a good objective.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "A {{blank:a}} is a measurable level of performance to be reached by a date, while a {{blank:b}} is a financial plan that sets the money available or expected.",
    blanks: [
      { id: "a", accepted: ["target"], choices: ["target", "budget", "mission"] },
      { id: "b", accepted: ["budget"], choices: ["target", "budget", "mission"] },
    ],
    explanation: "Targets are measures of performance; budgets are financial plans that support them.",
  });

  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "State **one** stage of decision-making that comes after the choice of the option has been made.",
    accepted: ["implementation", "implement the decision", "implement", "review", "reviewing the result", "evaluation", "review the decision"],
    explanation: "After the choice the decision is implemented and then reviewed against the objective.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "State **one** example of unethical behaviour by a business.",
    accepted: ["false advertising", "dishonest advertising", "polluting the environment", "paying workers unfairly", "selling unsafe goods", "child labour", "bribery", "misleading customers", "selling out-of-date goods", "exploiting workers"],
    explanation: "Dishonest advertising, pollution, unfair pay, unsafe goods and bribery are all unethical.",
  });

  {
    const last = 240000, rise = 15;
    const target = (last * (100 + rise)) / 100;
    chk(target, 276000, 1e-6);
    b.num({
      d: 2, skill: "APPLICATION", daily: true,
      stem: `A fictional hardware shop sold goods worth ${money(last)} last year. Its SMART objective is to raise sales by ${rise}% this year. What is the sales target for this year?`,
      kind: "money", value: target, wrong: [last * rise / 100, last + rise],
      explanation: `${rise}% of ${last} = 36,000. Target = 240,000 + 36,000 = US\\$276,000. Giving only the increase (US\\$36,000) is a common slip.`,
    });
  }
  {
    const units = 20000, profitPer = 0.5, extra = 0.08;
    const newProfit = units * (profitPer - extra);
    chk(newProfit, 8400, 1e-6);
    b.calc({
      d: 3, skill: "APPLICATION",
      stem: `A fictional firm sells ${units.toLocaleString("en-GB")} units a year and earns a profit of US\\$0.50 on each. It decides to pay its workers a fair wage that adds ${money(extra)} to the cost of each unit and does not raise its price. Calculate its yearly profit after the change.`,
      kind: "money", value: newProfit, wrong: [units * profitPer, units * extra, units * (profitPer + extra)],
      hints: ["Find the new profit on each unit first."],
      explanation: `New profit per unit = 0.50 − 0.08 = US\\$0.42. Yearly profit = 20,000 × 0.42 = US\\$8,400. The profit before the change was US\\$10,000, so the ethical policy costs US\\$1,600 a year.`,
    });
  }

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain what is meant by a SMART objective.",
    points: ["An objective that is specific, measurable, achievable, realistic and time-limited", "It gives a clear target by which success can be judged"],
    modelAnswer: "A SMART objective is specific, measurable, achievable, realistic and time-limited, so it gives a clear target and a deadline by which success can be judged.",
    explanation: "The five features and the purpose.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Tendai, a fictional owner of a bakery in Chinhoyi, wants to \"sell more bread\". Rewrite this as a SMART objective and explain **one** benefit to the staff.",
    points: ["A specific objective with a figure, for example raise bread sales by 15%", "A time limit, for example by the end of the financial year", "Staff know exactly what they are aiming for", "Application: bakers and delivery drivers can plan how much to produce and deliver"],
    modelAnswer: "Increase bread sales by 15% by 31 December. Staff would know exactly what the bakery is aiming for, so bakers can plan production and drivers can plan deliveries.",
    hints: ["Add a number and a deadline, then say how staff use it."],
    explanation: "A rewritten objective with a figure and date, and a benefit applied to the case.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse why a firm that makes its objectives known to all employees is more likely to achieve them.",
    points: ["Employees know what they must achieve", "They can plan their work and set priorities", "Knowing the targets can motivate employees who feel involved", "Managers can review results against the targets and take action"],
    modelAnswer: "If employees know the objectives they know what to aim for and can plan their work. Knowing targets makes them feel involved, which motivates them. Managers can then compare results with the targets and take action where performance falls short.",
    hints: ["Follow the chain from knowing the objective to results."],
    explanation: "A chain from communication to achievement.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 5,
    stem: "Assess whether a firm should always behave ethically, even when this reduces its profit.",
    points: ["Ethical behaviour builds reputation and customer loyalty", "It avoids fines, legal action and boycotts", "It may increase costs and cut short-term profit", "Competitors who cut corners may win sales for a time", "Judgement with a reason, for example that ethics protect long-term survival"],
    modelAnswer: "Ethical behaviour builds reputation and loyalty and avoids fines and boycotts. It may add costs and reduce profit, and less ethical rivals may win sales in the short run. However, a firm that loses its customers' trust may not survive, so it should behave ethically even at some cost to profit, provided the cost is not so high that the firm cannot continue.",
    hints: ["Compare the short-term cost with the long-term gain and conclude."],
    explanation: "Both sides, with a reasoned judgement.",
  });

  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "A fictional business: Mhofu Mushrooms (Mutare) sold mushrooms worth US\\$54,000 last year. The owner, Farai, sets the objective \"to increase sales by 25% by 31 December\" and plans to hire a salesperson. His bank refuses a loan for a second growing shed, and a rival has just cut its prices.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the sales target for this year.", kind: "money", value: (54000 * 125) / 100, wrong: [54000 * 0.25, 54000 + 25], explanation: "25% of 54,000 = 13,500. Target = 54,000 + 13,500 = US\\$67,500." }),
      P.manual({ label: "(b)", marks: 2, stem: "State **two** features of the objective that make it SMART.", points: ["Measurable: a 25% increase", "Time-limited: by 31 December"], modelAnswer: "It is measurable because it states a 25% increase, and time-limited because it gives a date of 31 December.", explanation: "One mark each, using the objective." }),
      P.manual({ label: "(c)", marks: 3, stem: "Identify and explain **one** constraint on Farai's objective.", points: ["Finance: the bank has refused a loan", "Without a second shed, output cannot rise", "So the 25% target may be unrealistic"], modelAnswer: "Finance is a constraint because the bank has refused a loan for a second growing shed. Without the shed output cannot rise, so a 25% sales target may be unrealistic.", hints: ["Finance, law, competition, stakeholders or resources: which does the case show?"], explanation: "A constraint, shown in the case, with its effect." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest **one** way in which Farai could make the objective easier to achieve.", points: ["Make it more realistic, such as a smaller increase or a longer time", "Application: set quarterly targets so that he can monitor progress and respond to the rival"], modelAnswer: "He could set a smaller increase, such as 15%, or give himself longer, so that the target matches the limits on his shed and the rival's price cut.", explanation: "A realistic change, linked to the case." }),
    ],
    hints: ["Use the figures and the facts about the bank and the rival."],
    explanation: "The sales target is calculated, SMART features are identified and the constraint on finance is analysed.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "A fictional business: Muzvare Fabrics (Bulawayo) buys cotton from small farmers. The manager, Thandeka, learns that a supplier of dyes will sell dye at half price if the firm agrees that the supplier may release waste dye into the local stream. The supplier says every other textile firm does the same, and Muzvare's profits have fallen for two years. Thandeka's own beliefs, and the village elders who use the stream, are against the deal.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Explain why the supplier's offer raises an ethical issue.", points: ["Dumping waste dye in the stream harms the environment", "The elders and community use the water, so people could be harmed", "Muzvare would share responsibility by benefiting from the cheap dye"], modelAnswer: "Releasing waste dye into the stream pollutes the water that the community uses, which could harm health. Muzvare would share the responsibility because it benefits from the cheaper dye.", explanation: "The harm to the environment and community and Muzvare's part in it." }),
      P.manual({ label: "(b)", marks: 3, stem: "Analyse **one** possible benefit to Muzvare of refusing the offer.", points: ["Refusing keeps the firm's reputation with customers and the community", "Application: elders and local customers may continue to buy and support the firm", "Avoids fines or legal action for pollution"], modelAnswer: "Refusing protects the firm's reputation in the community. Local people and customers will continue to buy from a firm that respects the stream, and the firm avoids fines for pollution.", hints: ["Think about reputation, law and customers."], explanation: "A benefit linked to the case." }),
      P.manual({ label: "(c)", marks: 8, stem: "Evaluate whether Thandeka should accept the offer.", points: ["For: halves the dye cost, helping profit that has fallen for two years", "For: all rivals do the same, so Muzvare may be at a cost disadvantage if it refuses", "Against: pollution harms the community and breaks unhu/ubuntu", "Against: risk of legal action, fines and a damaged reputation", "Alternative: find other dyes, or invest in waste treatment, perhaps sharing the cost with other firms", ["A reasoned recommendation", 2], ["A condition or time-frame for the judgement", 1]], modelAnswer: "Accepting would halve the dye cost, which is valuable when profits have fallen for two years, and rivals already do the same. But pollution harms the community, risks fines and damages the firm's name, and it breaks the values of unhu. Thandeka should refuse the offer and look for other dyes or shared waste treatment. The deal might be reconsidered only if the supplier treats its waste so that no harm is done, because the long-term cost of lost trust is greater than the saving.", hints: ["Weigh cost saving against harm and reputation, then recommend with a condition."], explanation: "Both sides, alternatives and a reasoned recommendation.", levels: [[1, 1, 3, "Lists points for and against with little use of the case."], [2, 4, 6, "Applies the case and weighs both sides."], [3, 7, 8, "A justified recommendation with a condition."]] }),
    ],
    hints: ["Use the case; the community is also a stakeholder."],
    explanation: "The ethical issue is explained, a benefit is analysed and the decision is evaluated.",
  });

  b.card("DEFINITION", "SMART objective", "Specific, Measurable, Achievable, Realistic, Time-limited.");
  b.card("CONCEPT", "Stages of decision-making", "Set objective, gather information, identify options, analyse and choose, implement, review against the objective.");
  b.card("DEFINITION", "Target and budget", "A target is a measurable level of performance by a date. A budget is a financial plan that supports it.");
  b.card("CONCEPT", "Why communicate objectives", "Workers know what to aim for, can plan and are motivated. Secret or unclear objectives cause confusion and conflict.");
  b.card("FACT", "Constraints on objectives", "Finance, law, competition, stakeholders and resources.", undefined, { applies: ZIM });
  b.card("DEFINITION", "Business ethics", "Moral principles guiding a firm's behaviour, such as honesty, fair dealing, fair treatment of workers and care for the environment.");
  b.card("CONCEPT", "Costs and benefits of ethical behaviour", "Benefits: reputation, loyalty, fewer legal problems. Costs: higher costs and possible loss of sales to less ethical rivals in the short run.");
  b.card("DEFINITION", "Unhu/ubuntu/vumunhu", "A person becomes fully human through relationships with others; in business it means respect, honesty, fairness and care for the community.", undefined, { applies: ZIM });
});
