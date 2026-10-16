// W1b: ict.role-in-business (ZIMSEC Business Studies only)
import { concept, P, chk, money } from "../lib.mjs";
import { mc } from "../tables/w1b-lib.mjs";

concept("abus.ict.role-in-business", { file: "ict/role-in-business", keyPrefix: "ict.role-in-business" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of these is an item of computer **hardware**?",
    ok: ["A barcode scanner", "Correct: it is physical equipment."],
    bad: [["A spreadsheet program", "A program is software, not hardware."], ["A payroll package", "A package is software."], ["A computer virus", "A virus is harmful software, not hardware."]],
    explanation: "Hardware is the physical equipment; programs are software.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "A network that links computers inside one office building is called a",
    ok: ["local area network", "Correct: it covers a small area such as a building."],
    bad: [["worldwide web page", "A web page is a document on the internet, not a network."], ["mobile-money account", "That is a payment account, not a network."], ["wide-area printer", "No such term describes a network of computers."]],
    explanation: "A local area network connects computers in a limited area such as a building.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is a **benefit** of using ICT in the accounting department?",
    ok: ["Calculations are done quickly and accurately", "Correct: software reduces errors and saves time."],
    bad: [["The department no longer needs any staff skills", "Staff still need skills to use the system."], ["The business no longer has to keep records", "ICT keeps records electronically; it does not remove the need for them."], ["The risk of fraud disappears completely", "ICT creates new forms of fraud risk."]],
    explanation: "ICT improves speed and accuracy in accounting, but needs skills and security.",
  });
  mc(b, {
    d: 2, skill: "APPLICATION",
    stem: "A fictional shop in Mutare uses mobile money to receive payments from customers. In which functional area is ICT mainly used here?",
    ok: ["Finance", "Correct: receiving payment is a financial function."],
    bad: [["Human resources", "Payments from customers are not an HR matter."], ["Operations", "Payments are not part of production."], ["Recruitment", "Recruitment is a part of human resources."]],
    explanation: "Receiving and recording payment belongs to finance.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional bakery in Gweru keeps its customer orders on one computer with no backup. Which is the **greatest** risk?",
    ok: ["Loss of all the orders if the computer fails or is stolen", "Correct: without a backup, records cannot be restored."],
    bad: [["Workers will be paid more than the amount due", "The case concerns orders, not payroll."], ["Customers will receive better service than usual", "A failure would harm service rather than improve it."], ["The bakery will pay less tax than it should", "The case is not about tax."]],
    hints: ["What is missing from the arrangement?"],
    explanation: "A single copy of data is at risk of loss; a backup stored elsewhere protects it.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Why might the introduction of a new computer system lead to **resistance** from staff?",
    ok: ["Staff may fear losing their jobs or being unable to learn it", "Correct: fear of redundancy and new skills cause resistance."],
    bad: [["Staff are always happy to learn something that is completely new to them", "Many staff worry about change; the claim is too general."], ["The system will remove the need for any managers in the business", "Managers are still needed to run the business."], ["The system reduces the amount of work that staff must do", "A reduction in work is a possible benefit, not a cause of resistance."]],
    hints: ["Think about how workers feel about change."],
    explanation: "Fear of job loss and of being unable to cope are common causes of resistance.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which is the best example of a measure to protect business data?",
    ok: ["Keeping backup copies of files in another place", "Correct: a backup allows restoration after loss or damage."],
    bad: [["Sharing the main password with every customer who asks", "Sharing passwords reduces security."], ["Storing all records on a single unlocked laptop", "A single unprotected device increases risk."], ["Switching off the antivirus program in order to save time", "Switching off protection increases risk."]],
    hints: ["Which option reduces the risk of loss or misuse?"],
    explanation: "Backups, passwords, antivirus and access control protect data.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which is the **best-supported** judgement on whether a very small trader should buy an accounting package?",
    ok: ["It depends on the cost, the trader's skills and how many transactions there are", "Correct: it names the conditions that decide the choice."],
    bad: [["Yes, because ICT is always the cheapest method for every business", "Costs and skills vary; ICT is not always cheapest."], ["No, because a package never saves time for any business", "A package often saves time when there are many transactions."], ["Yes, because the trader will no longer need any records", "Records are still needed; only the way they are kept changes."]],
    hints: ["Choose the answer that gives conditions for the decision."],
    explanation: "A reasoned judgement considers cost, skills and volume of work.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A business that uses ICT may become dependent on electricity and on a working network.",
    answer: true,
    explanation: "True. Power cuts and network failures can halt ICT-based operations, which is why backups and alternatives are needed.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "Once a business has installed antivirus software, it no longer needs to worry about data security.",
    answer: false,
    explanation: "False. Security also needs passwords, backups, access control, staff training and updates; antivirus software is only one measure.",
    hints: ["Think about people as well as software."],
  });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each use of ICT to the functional area.",
    pairs: [["Stock control with barcode scanners", "Operations"], ["Payroll processing and employee records", "Human resources"], ["Customer database used to target advertising", "Marketing"], ["Accounting software producing financial statements", "Finance"]],
    explanation: "ICT supports every functional area in a different way.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "{{blank:a}} is the physical equipment of a computer system, while {{blank:b}} is the set of programs that tells it what to do.",
    blanks: [
      { id: "a", accepted: ["Hardware"], choices: ["Hardware", "Software", "Network"] },
      { id: "b", accepted: ["software"], choices: ["hardware", "software", "network"] },
    ],
    explanation: "Hardware is physical; software is the programs.",
  });

  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "State **one** way in which a business can protect its computer data from loss.",
    accepted: ["backup", "make backups", "back up files", "store copies elsewhere", "cloud storage", "keep copies of files", "regular backups"],
    explanation: "Regular backups kept in a separate place protect data from loss.",
  });

  {
    const rate = 6, before = 16, after = 4;
    const saving = (before - after) * rate * 12;
    chk(saving, 864, 1e-9);
    b.num({
      d: 2, skill: "APPLICATION", daily: true,
      stem: `A fictional shop pays a clerk ${money(rate)} an hour. Using a barcode scanner reduces the monthly stock count from ${before} hours to ${after} hours. How much does the shop save in clerk's pay in a year?`,
      kind: "money", value: saving, wrong: [(before - after) * rate, before * rate * 12],
      explanation: `Hours saved a month = 16 − 4 = 12. Yearly saving = 12 × 6 × 12 = US\\$864. Forgetting to multiply by 12 months gives US\\$72.`,
    });
  }
  {
    const cost = 1200, save = 150;
    const months = cost / save;
    chk(months, 8, 1e-9);
    b.calc({
      d: 3, skill: "APPLICATION",
      stem: `A fictional bakery buys a computer and software for ${money(cost)}. They save the bakery ${money(save)} a month in clerical costs. After how many months have the savings repaid the cost? (Give a whole number.)`,
      kind: "months", value: months, wrong: [cost * save, cost / (save * 12)],
      hints: ["Divide the cost by the monthly saving."],
      explanation: `1,200 ÷ 150 = 8 months.`,
    });
  }
  {
    const orders = 40, mins = 6, newMins = 2;
    const hoursSaved = (orders * (mins - newMins) * 22) / 60;
    chk(hoursSaved, 58.666666667, 1e-6);
    b.num({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: `A fictional office in Bulawayo processes ${orders} supplier orders a day by hand, taking ${mins} minutes each. A new ordering program cuts this to ${newMins} minutes each. The office works 22 days a month. How many hours of staff time are saved in a month? Give your answer to one decimal place.`,
      kind: "hours", value: hoursSaved, wrong: [orders * (mins - newMins) * 22, (orders * (mins - newMins)) / 60],
      hints: ["Minutes saved per order, then per day, then per month, then convert to hours."],
      explanation: `Minutes saved per order = 6 − 2 = 4. Per day = 40 × 4 = 160 minutes. Per month = 160 × 22 = 3,520 minutes = 3,520 ÷ 60 = 58.7 hours. Leaving the answer in minutes (3,520) is a common slip.`,
    });
  }

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Describe how ICT can help the marketing department of a business.",
    points: ["A customer database allows promotion to be targeted at the right people", "A website or social media can advertise and sell to a wider market"],
    modelAnswer: "A customer database lets marketing target promotions at the right people, and a website or social media advertises and sells to a wider market.",
    explanation: "Two uses of ICT in marketing.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Tendai runs a fictional chain of three shops in Harare and Mutare. Explain **two** ways in which a computer network could help him.",
    points: ["Stock records can be shared between the shops", "Application: he can see which shop has low stock and transfer goods", "Sales figures can be sent to the head office at once", "Application: he can compare the performance of each shop daily and act quickly"],
    modelAnswer: "A network lets the shops share stock records, so Tendai can see which shop is running low and transfer goods. It also sends sales figures to the head office at once, so he can compare the shops every day and act quickly.",
    hints: ["Think about information shared between the shops."],
    explanation: "Two network benefits, each applied.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse how the use of ICT could affect the workers in a fictional printing firm.",
    points: ["Routine tasks are automated, so some jobs may go", "Remaining staff need training in new skills", "New jobs may appear in IT support and design", "Workers may resist if they fear job loss, reducing morale"],
    modelAnswer: "Routine tasks are automated, so some jobs may disappear. Remaining staff need training, and new jobs may appear in IT support and design. Workers who fear for their jobs may resist the change, which lowers morale.",
    hints: ["Think about jobs lost, jobs changed and jobs created."],
    explanation: "Effects on jobs, skills and morale.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 5,
    stem: "Discuss whether a small business should invest in ICT.",
    points: ["Advantages: speed, accuracy, lower costs of routine work and wider markets", "Disadvantages: cost of equipment and training", "Risks: security, dependence on power and the internet", "The benefit depends on the size of the business and the amount of routine work", "Judgement with a reason or condition"],
    modelAnswer: "ICT gives speed and accuracy, saves routine work and can widen the market. It costs money for equipment and training and brings risks over security and power. A small business should invest in the ICT that fits its needs, such as accounting software and mobile payments, provided that the saving in time and the extra sales exceed the cost and it takes basic security measures.",
    hints: ["Weigh benefits against costs and risks, and add a condition."],
    explanation: "Both sides and a conditional judgement.",
  });

  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "A fictional business: Nyasha Printing (Gweru) has two clerks who each spend 40 hours a month typing invoices by hand. They are paid US\\$4 an hour. New invoicing software costs US\\$30 a month and reduces the time needed to 10 hours a month for both clerks together. A computer and printer cost US\\$720.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the yearly cost of the clerks' time spent on invoices by hand.", kind: "money", value: 2 * 40 * 4 * 12, wrong: [2 * 40 * 4, 40 * 4 * 12], explanation: "2 clerks × 40 hours × US\\$4 × 12 months = US\\$3,840." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the yearly cost with the software (clerks' time plus software).", kind: "money", value: 10 * 4 * 12 + 30 * 12, wrong: [10 * 4 * 12, 30 * 12], explanation: "Clerks' time = 10 hours × US\\$4 × 12 = US\\$480. Software = 30 × 12 = US\\$360. Total = US\\$840." }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the number of years it takes for the yearly saving to repay the cost of the computer and printer. Give your answer to two decimal places.", kind: "years", value: 720 / (3840 - 840), wrong: [3000 / 720, 720 / 3840], explanation: "Yearly saving = 3,840 − 840 = US\\$3,000. Payback = 720 ÷ 3,000 = 0.24 years." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain **one** risk of relying on the new system and how it could be reduced.", points: ["Risk: loss of invoices if the computer fails or data is lost", "Reduce with regular backups kept in a separate place", "Or protect with passwords and antivirus software"], modelAnswer: "If the computer fails the invoices could be lost. Regular backups kept in another place reduce this risk, and passwords and antivirus software protect the files from misuse.", explanation: "A risk, a remedy and a further protection." }),
    ],
    hints: ["Work in yearly figures."],
    explanation: "Costs are computed by hand and by software, the payback is found and a risk is analysed.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "A fictional business: Lupane Farm Supplies sells seed and fertiliser to farmers across a large rural area. The owner wants to start taking orders by mobile phone and keep customer records on a computer. Internet and electricity are unreliable in some areas, and several older workers say they do not know how to use computers. A rival is already using a mobile ordering system.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Explain **one** way in which mobile ordering could help the business.", points: ["Farmers can order without travelling to the shop", "Application: this widens the market across the rural area", "Orders are recorded accurately, reducing errors"], modelAnswer: "Farmers can order without travelling long distances, which widens the market across the rural area. Orders are recorded accurately, so there are fewer mistakes.", explanation: "A benefit, applied, with a result." }),
      P.manual({ label: "(b)", marks: 3, stem: "Analyse **one** problem that the business may face when introducing the system.", points: ["Unreliable internet and electricity may interrupt the system", "Orders may be lost or delayed", "Customers may lose confidence in the service"], modelAnswer: "The internet and electricity are unreliable in some areas, so the system may fail. Orders may be lost or delayed, and customers may lose confidence in the service.", hints: ["Use the facts in the case."], explanation: "A problem from the case and its effect." }),
      P.manual({ label: "(c)", marks: 8, stem: "Evaluate whether the business should introduce the new system now.", points: ["For: rival already has one, so the business may lose customers if it waits", "For: wider market and fewer errors", "Against: unreliable power and internet, cost, and staff skills", "Staff: training needed for older workers", "Option: start in the areas with the best connection and keep a paper back-up", ["A reasoned recommendation", 2], ["A condition or time-frame", 1]], modelAnswer: "The rival already has a mobile system, so waiting could cost customers, and a system widens the market and reduces errors. But unreliable power and internet, the cost, and older workers' lack of skills are real problems. The business should introduce the system in stages, starting in areas with good connection and keeping paper orders as a back-up, with training for staff. It should expand once the system has proved reliable for a few months.", hints: ["Weigh the rival and the benefits against the problems, then recommend with a condition."], explanation: "Benefits and problems weighed, with a staged recommendation.", levels: [[1, 1, 3, "Lists points with little reference to the case."], [2, 4, 6, "Applies the case and weighs both sides."], [3, 7, 8, "A justified recommendation with a condition."]] }),
    ],
    hints: ["Use the rival, the power supply and the staff skills in your answer."],
    explanation: "A benefit and a problem are analysed and the decision on timing is evaluated.",
  });

  b.card("DEFINITION", "ICT", "Information and communication technology: computers, software, networks, telecommunications and the internet used to collect, store, process, send and receive information.");
  b.card("DEFINITION", "Hardware and software", "Hardware is the physical equipment of a computer system; software is the programs that tell it what to do.");
  b.card("FACT", "ICT resources", "Hardware, software, networks, the internet and mobile technology.");
  b.card("CONCEPT", "ICT in functional areas", "Finance: accounting packages and online payment. Marketing: databases and websites. HR: records and payroll. Operations: stock control and design. Communication: email and messaging.");
  b.card("FACT", "Advantages of ICT", "Speed, accuracy, lower cost of routine work, better information, wider markets and instant communication.");
  b.card("FACT", "Disadvantages of ICT", "Cost, skills and training, security risks, dependence on power and networks, and job effects.");
  b.card("CONCEPT", "Data protection and security", "Passwords and access levels, backups kept away from the computer, antivirus and firewalls, encryption, control of who sees records and staff training.");
  b.card("CONCEPT", "Why staff resist new ICT", "Fear of job loss, lack of skills, discomfort with change and doubts about the benefits.");
});
