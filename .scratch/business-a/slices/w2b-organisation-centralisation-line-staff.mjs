// W2b: organisation.centralisation-line-staff
import { concept, P, chk, ZIM } from "../lib.mjs";
import { mc, pmc } from "../tables/w2b-lib.mjs";

concept("abus.organisation.centralisation-line-staff", { file: "organisation/centralisation-line-staff", keyPrefix: "organisation.centralisation-line-staff" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "In a **centralised** business, most important decisions are made",
    ok: ["At the top of the organisation", "Correct: head office or senior managers decide."],
    bad: [["By each customer who buys goods", "Customers do not make the business's decisions."], ["At the lowest levels", "That is decentralisation."], ["By the government", "Government does not run the business's decisions."]],
    explanation: "Centralisation means decision making is concentrated at the top.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of the following is a **staff function** in a business?",
    ok: ["Human resources", "Correct: it supports and advises the line functions."],
    bad: [["Production planning", "Production is a line function."], ["Sales", "Sales is a line function."], ["Distribution", "Distribution is a line function."]],
    explanation: "Staff functions such as human resources, finance and IT support the line functions.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is an **advantage of decentralisation**?",
    ok: ["Decisions are made faster at local level", "Correct: managers close to customers can act without waiting for head office."],
    bad: [["Policies are identical in every single branch", "Consistency is an advantage of centralisation."], ["Senior managers make every decision", "That is centralisation."], ["Fewer skilled local managers are needed", "Decentralisation needs capable local managers."]],
    explanation: "Decentralisation gives speed, local knowledge and motivation; consistency is easier under centralisation.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A **line manager** differs from a staff manager because the line manager",
    ok: ["Has authority over subordinates directly involved in the main activity", "Correct: line managers command those who produce or sell."],
    bad: [["Only gives advice and has no subordinates at all in any part of the business", "That describes a staff specialist."], ["Is never responsible for output or for the results of the team", "Line managers are responsible for output."], ["Works only in the head office and never at a branch", "Line managers work at all locations."]],
    explanation: "Line managers direct the people who produce or sell; staff managers advise and support.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional bakery chain in Bulawayo allows each shop manager to set the prices of cakes sold in that shop. This is an example of",
    ok: ["Decentralisation", "Correct: pricing decisions are passed to local managers."],
    bad: [["Centralisation", "Centralisation would leave prices to head office."], ["A staff function", "Pricing by managers is not a support function."], ["An informal organisation", "This is a formal arrangement of authority."]],
    explanation: "Allowing shop managers to decide prices is decentralisation.",
    hints: ["Who makes the price decision?"],
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "In a fictional hotel in Victoria Falls, the accountant advises the restaurant manager to cut food costs, but the restaurant manager ignores the advice. The conflict arises mainly because the accountant",
    ok: ["Advises but has no direct authority over the restaurant manager", "Correct: staff managers advise; line managers decide."],
    bad: [["Is a line manager with command authority", "An accountant is a staff specialist."], ["Is not employed by the hotel", "The accountant is a hotel employee."], ["Has more subordinates than the restaurant manager", "The number of subordinates is not the cause."]],
    explanation: "Staff specialists advise but cannot command line managers, so advice can be ignored.",
    hints: ["Who has authority over the restaurant?"],
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "An informal group at work can be useful to management because it may",
    ok: ["Improve morale and pass information quickly", "Correct: social groups meet social needs and spread information."],
    bad: [["Appear on the official organisational chart of the firm", "Informal groups are not on the formal chart."], ["Replace the need for any managers", "Informal groups do not replace management."], ["Set the company's objectives", "Objectives are set by the owners and managers."]],
    explanation: "Informal groups can help morale and communication, though they can also resist change.",
    hints: ["What are the benefits of friendships at work?"],
    applies: ZIM,
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Which factor would most strongly favour **decentralisation** for a fictional clothing company with shops in six countries?",
    ok: ["Customer tastes and laws differ in each country", "Correct: local knowledge is essential to meet local needs."],
    bad: [["All shops sell exactly the same standard goods everywhere", "Identical products would favour centralisation."], ["Local managers are new and untrained", "Untrained local managers would favour more central control."], ["Every decision carries a very high risk", "Highly risky decisions favour centralisation."]],
    explanation: "Varied local markets and laws call for local decisions.",
    hints: ["When is local knowledge most valuable?"],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Staff functions in a business are less important than line functions because they do not produce or sell.",
    answer: false,
    explanation: "False. Staff functions support and advise the line, and the business may suffer if they are weak. They are different, not less important.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "Most businesses combine centralised and decentralised decision making.",
    answer: true,
    explanation: "True. They usually centralise matters such as finance and standards, and decentralise local matters such as service and local prices.",
    hints: ["Do firms choose only one approach?"],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term to its description.",
    pairs: [["Centralisation", "Important decisions are taken at the top"], ["Decentralisation", "Decision-making authority is passed to lower levels"], ["Line function", "Directly produces or sells the goods and services"], ["Staff function", "Supports and advises the line functions"], ["Informal organisation", "Relationships and groups outside the official structure"]],
    explanation: "Each term matches one description.",
  });

  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "Production and sales are {{blank:a}} functions, whereas human resources and finance are {{blank:b}} functions.",
    blanks: [
      { id: "a", accepted: ["line"], choices: ["line", "staff"] },
      { id: "b", accepted: ["staff"], choices: ["line", "staff"] },
    ],
    explanation: "Production and sales are line functions; human resources and finance are staff functions.",
  });

  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the type of organisation that consists of the relationships and groups that form among employees outside the official structure.",
    accepted: ["informal organisation", "informal organization", "informal", "informal groups", "informal group"],
    explanation: "The informal organisation is the network of personal relationships at work.",
    applies: ZIM,
  });

  const lineStaff = 54;
  const staffStaff = 6;
  const share = (staffStaff / (lineStaff + staffStaff)) * 100;
  chk(share, 10);
  b.num({
    d: 2, skill: "APPLICATION", kind: "pct", value: share, calculator: true, daily: true, wrong: [(staffStaff / lineStaff) * 100, 54],
    stem: "A fictional company in Harare has 60 employees: 54 work in line functions and 6 in staff functions (finance, HR and IT). What percentage of all employees work in staff functions? (One decimal place.)",
    hints: ["Staff employees divided by total employees, times 100."],
    explanation: "6 / 60 x 100 = 10.0%. Dividing by the 54 line employees gives 11.1%, which is the wrong base.",
  });
  const pay = 1000;
  const cost = staffStaff * pay * 12;
  const perLine = cost / lineStaff;
  chk(cost, 72000);
  b.calc({
    d: 3, skill: "ANALYSIS", kind: "money", value: perLine, calculator: true, wrong: [cost, pay * 12 / lineStaff],
    stem: "Each of the 6 staff employees in the company above is paid US\\$1,000 a month. Calculate the annual staff-function salary cost per line employee, to the nearest cent.",
    hints: ["Find the annual salary bill of the staff functions, then divide by the line employees."],
    explanation: "Annual salary bill = 6 x US\\$1,000 x 12 = US\\$72,000. Per line employee = 72,000 / 54 = US\\$1,333.33. Giving US\\$72,000 forgets to divide.",
    workedSolution: "1. Annual salary bill = 6 x US\\$1,000 x 12 = US\\$72,000.\n2. Per line employee = US\\$72,000 / 54 = US\\$1,333.33.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain the difference between a line function and a staff function.",
    points: ["A line function is directly involved in producing or selling", "A staff function supports and advises the line functions", "Line managers command their subordinates, whereas staff specialists mainly advise"],
    modelAnswer: "A line function is directly involved in producing or selling the goods or services. A staff function supports and advises the line functions. Line managers command their subordinates, whereas staff specialists mainly advise.",
    hints: ["Direct involvement versus support."],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional chain of shops in Masvingo lets branch managers decide how many staff to hire. Explain **two** advantages of this decentralised approach.",
    points: ["Branch managers know their own workload", "Application: a branch with a busy market day can hire casual staff quickly", "Decisions are taken quickly without head-office approval", "Application: customers are served sooner and fewer sales are lost"],
    modelAnswer: "Branch managers know their own workload, so a branch with a busy market day can hire casual staff quickly. Decisions are also taken without waiting for head office, so customers are served sooner and fewer sales are lost.",
    hints: ["Think about local knowledge and speed."],
    explanation: "Two advantages, each applied to the chain.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse why conflict may arise between line and staff managers.",
    points: ["Line managers and staff specialists have different objectives", "Staff managers advise but have no authority to enforce their advice", "Line managers may see staff as inexperienced or interfering", "Unresolved conflict leads to delay, resentment and poor decisions"],
    modelAnswer: "Line managers and staff specialists have different objectives, for example output against standards. Staff managers advise but cannot enforce their advice, and line managers may see them as inexperienced or interfering. Unresolved conflict leads to delay, resentment and poor decisions.",
    hints: ["Think about objectives and authority."],
    explanation: "Objectives, authority, attitudes and consequences.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "Assess whether a fictional company with 12 branches across Zimbabwe should decentralise the setting of local prices.",
    points: ["Branch managers know local competition and customers' income", "Prices can be changed quickly to win sales", "Application: a rural branch can match a rival's price without waiting", "Risk: inconsistent prices may confuse customers and damage the brand", "Risk: a branch may cut margins too far and reduce profit", "Judgement with a reason: decentralise within a minimum margin set by head office"],
    modelAnswer: "Branch managers know local competition and customers' incomes, so prices can be changed quickly to win sales, for example a rural branch can match a rival without waiting. But inconsistent prices may confuse customers and damage the brand, and a branch may cut margins too far. Prices should be decentralised within a minimum margin set by head office.",
    hints: ["Give a benefit, a risk and a judgement."],
    explanation: "One point per mark; the judgement needs a reason.",
  });

  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "A fictional business: Tendai's Foods is a food manufacturer in Gweru with a production department, a sales department, a finance department and a human resources department. The HR manager has introduced a new health and safety rule requiring protective clothing on the factory floor. The production manager complains that the clothing is hot and slows work, and some workers ignore the rule.",
    parts: [
      P.match({ label: "(a)", marks: 4, stem: "Classify each department as a line or a staff function.", pairs: [["Production", "Line"], ["Sales", "Line"], ["Finance", "Staff"], ["Human resources", "Staff"]], explanation: "Production and sales produce and sell; finance and HR support and advise." }),
      P.manual({ label: "(b)", marks: 3, stem: "Explain **one** reason for the conflict between the HR manager and the production manager.", points: ["The HR manager aims for safety, while the production manager aims for output", "The HR manager has no direct authority over the production workers", "Application: the production manager was not consulted before the rule was made"], modelAnswer: "The HR manager aims for safety, while the production manager aims for output. The HR manager has no direct authority over the production workers, and the production manager was not consulted before the rule was made.", hints: ["Think about objectives and authority."], explanation: "Different objectives and limited authority." }),
      P.manual({ label: "(c)", marks: 2, stem: "Suggest **one** way of reducing this conflict.", points: ["Involve the production manager in designing the rule", "Application: choose lighter protective clothing that still meets safety needs"], modelAnswer: "Involve the production manager in designing the rule, for example by choosing lighter protective clothing that still meets safety needs.", hints: ["Think about consultation."], explanation: "Consultation reduces conflict." }),
    ],
    hints: ["Think about who produces, who supports and who has authority."],
    explanation: "Production and sales are line; finance and HR are staff; conflict arises from objectives and authority.",
  });

  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "A fictional business: Nyasha's Groceries has head office in Harare and 20 supermarkets across Zimbabwe. Head office approves every order from suppliers and all staffing decisions. Supermarket managers say that shelves are often empty while they wait for approval, and the best managers are leaving. Head-office managers fear that if decisions are decentralised, branches will overspend and prices will vary.",
    parts: [
      P.manual({ label: "(a)", marks: 6, stem: "Analyse the problems that centralisation is causing for the supermarkets.", points: [["Orders are delayed, so shelves are empty", 2], ["Sales are lost and customers may shop elsewhere", 1], ["Managers have little authority, so they are demotivated", 1], ["The best managers leave, increasing recruitment and training cost", 2]], modelAnswer: "Orders are delayed while managers wait for approval, so shelves are empty. Sales are lost and customers may shop elsewhere. Managers have little authority, so they are demotivated, and the best managers leave, which increases recruitment and training costs.", hints: ["Link the delay to sales and to the managers."], explanation: "Delay, lost sales, low motivation, turnover." }),
      P.manual({ label: "(b)", marks: 9, stem: "Evaluate whether Nyasha should decentralise ordering and staffing decisions to supermarket managers.", points: [["Benefits: faster ordering, fewer empty shelves, motivated managers", 2], ["Local knowledge: managers know what sells in their area", 1], ["Risks: overspending, inconsistent prices and standards, poor decisions", 2], ["Controls: budgets, order limits, reporting and head-office review", 2], ["Training for managers and gradual change", 1], ["Judgement with a reason", 1]], levels: [[3, 7, 9, "Weighs benefits and risks with application to the supermarket chain; justified recommendation with a condition"], [2, 4, 6, "Explains benefits and risks with some application; judgement weak"], [1, 1, 3, "Describes centralisation or decentralisation with little application"]], modelAnswer: "Decentralising ordering would mean faster ordering and fewer empty shelves, and managers would be more motivated and would use their local knowledge of what sells. The risks are overspending, inconsistent prices and poor decisions. These can be controlled by budgets, order limits, regular reports and head-office review, and by training managers and changing gradually. On balance Nyasha should decentralise ordering within budgets and order limits, while keeping pricing and finance central, because the present delays are costing sales and good managers.", hints: ["Weigh speed and motivation against control."], explanation: "Compare benefits and risks, then recommend with controls." }),
    ],
    hints: ["Think about what could be decentralised safely."],
    explanation: "Decentralise ordering within limits and keep pricing and finance central.",
  });

  b.card("DEFINITION", "Centralisation", "Most important decisions are taken at the top of the organisation; gives control and consistency but is slow for local issues.");
  b.card("DEFINITION", "Decentralisation", "Decision-making authority is passed to lower levels; gives speed, local knowledge and motivation but may reduce consistency.");
  b.card("DEFINITION", "Line function", "Directly produces or sells the goods or services (production, sales, distribution); line managers command subordinates.");
  b.card("DEFINITION", "Staff function", "Supports and advises the line (HR, finance, legal, IT); staff managers advise but do not normally command line managers.");
  b.card("FACT", "Causes of line and staff conflict", "Different objectives, staff advice not enforceable, lack of experience or consultation, competition for budget.");
  b.card("CONCEPT", "Balancing centralisation", "Centralise finance, branding and standards; decentralise local prices, service and staffing; depends on size, spread, skills, risk and need for consistency.");
  b.card("DEFINITION", "Informal organisation", "Personal relationships and groups among employees outside the official structure; has norms, leaders and the grapevine.", undefined, { applies: ZIM });
  b.card("FACT", "Informal groups: pros and cons", "Pros: morale, quick information, teamwork. Cons: rumours, resistance to change, low output norms, exclusion.", undefined, { applies: ZIM });
  b.card("CONCEPT", "Working with informal groups", "Use informal leaders to explain change, listen to the grapevine, avoid breaking up helpful groups.", undefined, { applies: ZIM });
});
