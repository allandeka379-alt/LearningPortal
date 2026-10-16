// W2b: organisation.structure-types
import { concept, P, chk, money, ZIM, CAM } from "../lib.mjs";
import { mc, pmc } from "../tables/w2b-lib.mjs";

concept("abus.organisation.structure-types", { file: "organisation/structure-types", keyPrefix: "organisation.structure-types" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "In a **functional** structure, employees are grouped by",
    ok: ["The type of work they do", "Correct: departments such as production, marketing and finance."],
    bad: [["The region in which they live", "That describes a geographic structure."], ["The product they sell", "That describes a product-based structure."], ["Their length of service", "Length of service is not the basis of any standard structure."]],
    explanation: "Functional structures group staff by function: production, marketing, finance and so on.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "In a **matrix** structure, a team member normally",
    ok: ["Reports to two managers", "Correct: one functional manager and one project manager."],
    bad: [["Reports to nobody", "Every member has at least one manager."], ["Reports to the customer", "Reporting is within the business."], ["Reports only to the owner", "Reporting is to a functional and a project manager."]],
    explanation: "A matrix structure has two reporting lines, function and project.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which structure divides a business into units that each serve a region or country?",
    ok: ["Geographic", "Correct: each unit serves a region."],
    bad: [["Functional", "Functional structures group staff by task."], ["Matrix", "Matrix structures use two reporting lines."], ["Tall hierarchy", "A tall hierarchy has many levels."]],
    explanation: "A geographic structure is divided by region or country.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is a typical **disadvantage of a product-based structure**?",
    ok: ["Functions are duplicated in each division", "Correct: each division needs its own production, marketing and finance staff."],
    bad: [["Staff report to two managers", "That is a feature of a matrix structure."], ["No one knows the products", "Divisions develop good knowledge of their products."], ["It cannot be used by large businesses with many products", "It is often used by large, diversified firms."]],
    explanation: "Each division repeats functions such as marketing and finance, raising costs.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional construction firm in Bulawayo assigns engineers to different building projects while they remain in the engineering department. The firm is using a",
    ok: ["Matrix structure", "Correct: engineers have a functional boss and a project boss."],
    bad: [["Simple functional structure", "A purely functional structure has no project reporting lines."], ["Geographic structure", "Staff are not grouped by region."], ["Flat structure with no managers", "The firm has department heads and project managers."]],
    explanation: "Staff in departments who are assigned to projects are in a matrix.",
    hints: ["How many bosses does an engineer have?"],
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional company in Harare sells soft drinks and bottled water. It creates one division for soft drinks and another for water, each with its own marketing and production staff. This is a",
    ok: ["Product-based structure", "Correct: divisions are formed around products."],
    bad: [["Geographic structure by region", "The divisions are based on products, not regions."], ["Matrix structure", "Staff report to one divisional manager, not two."], ["Functional structure", "Staff are grouped by product, not by task alone."]],
    explanation: "Dividing the business into product divisions is a product-based (divisional) structure.",
    hints: ["What is the basis for the division?"],
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which is the most likely effect of **delayering**?",
    ok: ["Wider spans of control and quicker communication", "Correct: removing levels flattens the structure."],
    bad: [["Narrower spans of control and many more managers", "Delayering removes managers and widens spans."], ["A longer chain of command", "Delayering shortens the chain."], ["Higher management costs in every case", "Fewer managers normally lowers cost."]],
    explanation: "Delayering removes levels, so spans widen and messages pass through fewer people.",
    hints: ["What is removed in delayering?"],
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A fictional bank with branches in four countries finds that decisions on loans are slow and ignore local customs. Which change is most likely to help?",
    ok: ["A geographic structure with local decision making", "Correct: local units understand local customers and decide more quickly."],
    bad: [["A taller hierarchy with more approval levels at head office", "More levels would slow decisions further."], ["A single head office decision for every loan", "Centralised decisions are the cause of the problem."], ["Removing all managers in each country", "Managers are needed to make local decisions."]],
    explanation: "A geographic structure gives local knowledge and faster local decisions.",
    hints: ["Which structure puts decisions near the customer?"],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A functional structure is usually well suited to a small business with a single product.",
    answer: true,
    explanation: "True. It is simple, uses specialists and has clear responsibilities, and the single product avoids duplication problems.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "A matrix structure removes the possibility of conflict over who is the employee's boss.",
    answer: false,
    explanation: "False. Because employees report to two managers, a matrix structure can cause conflict over priorities unless roles are clearly defined.",
    hints: ["How many bosses does an employee have?"],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each structure to the business it suits best.",
    pairs: [["Functional", "A small bakery with one range of products"], ["Matrix", "A consultancy running several projects at once"], ["Product-based", "A group selling cosmetics, food and clothing"], ["Geographic", "A chain of shops across several countries"], ["Flat hierarchy", "A small design studio of skilled staff"]],
    explanation: "Each structure suits the business described.",
  });

  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "Removing levels of management is called {{blank:a}}, which usually makes spans of control {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["delayering"], choices: ["delayering", "delegation", "diversification"] },
      { id: "b", accepted: ["wider"], choices: ["wider", "narrower"] },
    ],
    explanation: "Delayering removes layers and widens spans of control.",
  });

  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the process of removing one or more levels of management from an organisation.",
    accepted: ["delayering", "de-layering", "delayer", "flattening", "flattening the structure"],
    explanation: "Delayering removes levels of management.",
  });

  const managersRemoved = 6;
  const monthly = 1200;
  const saving = managersRemoved * monthly * 12;
  chk(saving, 86400);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: saving, calculator: true, daily: true, wrong: [managersRemoved * monthly, monthly * 12],
    stem: "A fictional company in Gweru removes a layer of 6 middle managers, each paid US\\$1,200 a month. Calculate the annual saving in salaries (ignoring all other costs).",
    hints: ["Number of managers x monthly pay x 12 months."],
    explanation: "6 x US\\$1,200 = US\\$7,200 a month; x 12 = US\\$86,400 a year. US\\$7,200 is only one month; US\\$14,400 is one manager's annual salary.",
  });
  const redundancy = 3000;
  const payback = (managersRemoved * redundancy) / (managersRemoved * monthly);
  chk(payback, 2.5);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "plain", unit: "months", value: payback, dp: 1, calculator: true, wrong: [managersRemoved * redundancy, 6],
    stem: "In the same company, each of the 6 managers is given a payment of US\\$3,000 on leaving. How many months of salary savings are needed to recover the total payments (to one decimal place)?",
    hints: ["Total payments, then divide by the monthly saving."],
    explanation: "Total payments = 6 x US\\$3,000 = US\\$18,000. Monthly saving = 6 x US\\$1,200 = US\\$7,200. Months = 18,000 / 7,200 = 2.5 months. After this the saving is a gain, although fewer managers may overload the remaining staff.",
    workedSolution: "1. Total payments = 6 x US\\$3,000 = US\\$18,000.\n2. Monthly saving = 6 x US\\$1,200 = US\\$7,200.\n3. Months = 18,000 / 7,200 = 2.5.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain what is meant by a matrix structure.",
    points: ["A structure in which employees report to two managers", "A functional manager and a project or product manager", "Teams are formed across functions for particular projects"],
    modelAnswer: "A matrix structure is one in which employees report to two managers, a functional manager and a project or product manager. Teams are formed across the functions for particular projects.",
    hints: ["Say how many managers an employee has."],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional furniture company in Mutare is expanding into three more towns. Explain **two** reasons why it might adopt a geographic structure.",
    points: ["Local managers understand local customers", "Application: each town may prefer different furniture styles and prices", "Decisions can be made more quickly locally", "Application: a town manager can agree a delivery or discount without waiting for head office"],
    modelAnswer: "Local managers understand local customers, since each town may prefer different furniture styles and prices. Decisions can also be made more quickly, because a town manager can agree a delivery or discount without waiting for head office.",
    hints: ["Think about knowledge and speed."],
    explanation: "Two reasons, each applied to the furniture company.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse why a matrix structure may cause conflict within a business.",
    points: ["Employees report to two managers", "The two managers may give conflicting priorities", "Employees are unsure whose instructions to follow", "Delays and frustration reduce productivity"],
    modelAnswer: "Employees report to two managers, who may give conflicting priorities. Employees are unsure whose instructions to follow, and the delays and frustration reduce productivity.",
    hints: ["Think about two bosses."],
    explanation: "Two bosses, conflicting priorities, uncertainty, lower productivity.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "Assess whether a fictional growing business in Harare selling hardware, paint and building materials should change from a functional to a product-based structure.",
    points: ["Divisions would know their own products and customers", "Each division is accountable for its profit, which improves control", "Application: the paint division could respond quickly to new colours", "Duplicated functions raise costs", "Divisions may compete for resources or lose shared purchasing power", "Judgement with a reason: worthwhile once the range and sales are large enough to justify the cost"],
    modelAnswer: "Divisions would know their own products and customers and each would be accountable for its own profit, so the paint division could respond quickly to new colours. But duplicated functions raise cost and divisions may compete for resources. It is worthwhile once the range and sales are large enough to justify the extra cost.",
    hints: ["Give a benefit, a cost and a judgement."],
    explanation: "One point per mark; the judgement needs a reason.",
  });

  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "A fictional business: Sipho's Engineering in Bulawayo has a functional structure with production, sales and finance departments. It now makes three product ranges: water pumps, solar heaters and gates. The sales manager says that he cannot keep up with all three ranges and that customers wait a long time for quotations.",
    parts: [
      pmc(P, { label: "(a)", marks: 1, stem: "Which structure would give each product range its own production and sales staff?", ok: ["Product-based", "Correct: a division for each product range."], bad: [["Matrix", "A matrix uses two reporting lines."], ["Geographic", "A geographic structure is based on region."], ["Flat hierarchy", "A flat hierarchy is about levels, not products."]], explanation: "Separate divisions for each range are a product-based structure." }),
      P.manual({ label: "(b)", marks: 4, stem: "Explain **two** advantages to Sipho's Engineering of changing to this structure.", points: ["Each division focuses on its own product range and customers", "Application: pumps staff would become experts in water customers", "Quotations are produced faster because sales staff know the range", "Application: the heater division can reply to customers without waiting for the sales manager"], modelAnswer: "Each division focuses on its own product range and customers, so pumps staff become experts on water customers. Quotations are produced faster, because the sales staff in each division know the range and do not wait for one sales manager.", hints: ["Think about focus and speed."], explanation: "Two advantages applied to the case." }),
      P.manual({ label: "(c)", marks: 4, stem: "Analyse **one** disadvantage of the change.", points: ["Each division needs its own sales and finance staff", "Application: three sets of staff raise the salary bill for a small firm", "Divisions may compete for resources", "Application: the pumps division may try to take the workshop machines needed by the gates division"], modelAnswer: "Each division needs its own sales and finance staff, so three sets of staff raise the salary bill for a small firm. Divisions may also compete for resources, for example the pumps division may try to take workshop machines needed by the gates division.", hints: ["Think about duplication and competition."], explanation: "Duplication and competition for resources." }),
    ],
    hints: ["Think about what the sales manager's complaint tells you."],
    explanation: "Product-based structure gives focus and speed, at the cost of duplication.",
  });

  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "A fictional business: Chipo's Mining Services in Gaborone has 400 employees and a tall structure with eight levels. Decisions take weeks. The directors plan to remove two levels, widen spans of control from 4 to 7 and let site managers approve spending up to US\\$5,000. Some managers fear that they will lose their jobs, and the union has asked for consultation.",
    parts: [
      P.manual({ label: "(a)", marks: 6, stem: "Analyse the likely benefits of the proposed changes to the business.", points: [["Fewer levels shorten the chain of command, so decisions are faster", 2], ["Wider spans reduce the number of managers, so salary costs fall", 2], ["Site managers can approve spending quickly, so projects are not delayed", 1], ["More responsibility may motivate managers who remain", 1]], modelAnswer: "Fewer levels shorten the chain of command, so decisions are faster. Wider spans reduce the number of managers and so salary costs fall. Site managers can approve spending quickly, so projects are not delayed, and the extra responsibility may motivate those who remain.", hints: ["Use speed, cost and motivation."], explanation: "Speed, cost and motivation." }),
      P.manual({ label: "(b)", marks: 9, stem: "Evaluate whether the directors should go ahead with the changes as planned.", points: [["Benefits: speed, lower cost, motivation of those who remain", 2], ["Risk: managers made redundant may lose morale; remaining managers may be overloaded by wider spans", 2], ["Risk: site managers may take poor spending decisions without training", 2], ["The union's request for consultation means that poor communication may lead to conflict or industrial action", 1], ["Alternative: phase the changes and train managers first", 1], ["Judgement with a reason", 1]], levels: [[3, 7, 9, "Weighs benefits and risks with application to the mining firm; justified recommendation with a condition"], [2, 4, 6, "Explains benefits and risks with some application; judgement weak"], [1, 1, 3, "Describes delayering with little application"]], modelAnswer: "The changes should speed up decisions, lower salary costs and motivate the managers who remain. However, managers who lose their jobs or see colleagues go may lose morale, and managers with wider spans may be overloaded. Site managers may also take poor spending decisions if they are not trained, and a lack of consultation could lead to conflict with the union. The directors should go ahead but phase the changes, consult the union and train site managers first. This keeps the benefits while reducing the risk of disruption.", hints: ["Weigh the benefits against the risks of overload, poor decisions and conflict."], explanation: "Compare benefits and risks, then recommend a phased approach." }),
    ],
    hints: ["Think about speed, cost, workload and staff reaction."],
    explanation: "Go ahead in phases, with consultation and training.",
  });

  b.card("DEFINITION", "Functional structure", "Staff grouped by the work they do (production, marketing, finance, HR); simple and specialist but may be slow across departments.");
  b.card("DEFINITION", "Matrix structure", "Staff report to a functional manager and a project manager; flexible and good for projects but may cause conflict.");
  b.card("DEFINITION", "Product-based structure", "Divisions for product groups, each with its own functions; gives focus but duplicates costs.");
  b.card("DEFINITION", "Geographic structure", "Units for regions or countries; local knowledge and quick local decisions but duplication and weaker central control.");
  b.card("CONCEPT", "Tall versus flat", "Tall: many levels, narrow spans, close supervision, slow communication. Flat: few levels, wide spans, faster communication, more delegation.");
  b.card("DEFINITION", "Delayering", "Removing levels of management from the hierarchy; widens spans, cuts cost, speeds communication, may overload managers.");
  b.card("FACT", "Reasons for changing structure", "Growth, new strategy or products, technology, cost reduction, competition and poor performance.");
  b.card("FACT", "ZIMSEC term: divisional", "ZIMSEC uses divisional for structures divided by product or region; Cambridge names product-based and geographic separately.", undefined, { applies: ZIM });
  b.card("CONCEPT", "Choosing a structure", "Match the structure to size, product range, locations and objectives; review it as the business changes.");
});
