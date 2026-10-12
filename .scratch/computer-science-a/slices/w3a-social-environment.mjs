// Slice w3a: acs.ethics.social-environment (ZIMSEC only, Form 5). Calculators are allowed.
import { concept, P, chk, round } from "../lib.mjs";
import { mc, pm } from "../tables/w3a-q.mjs";

const mons = 24;
const kw = 0.03;
const hrs = 16;
const perDay = mons * kw * hrs;
chk(perDay, 11.52, 1e-9);
const perWeek = round(perDay * 5, 2);
chk(perWeek, 57.6, 1e-9);
const tariff = 0.1;
const costWeek = round(perWeek * tariff, 2);
chk(costWeek, 5.76, 1e-9);
const devices = 55;
const each = 6;
const mass = devices * each;
chk(mass, 330);
const rec = mass * 0.7;
chk(rec, 231, 1e-9);
const disp = mass - rec;
chk(disp, 99, 1e-9);
const d2 = 35;
const e2 = 8;
const mass2 = d2 * e2;
chk(mass2, 280);
const rec2 = mass2 * 0.6;
chk(rec2, 168, 1e-9);
const disp2 = mass2 - rec2;
chk(disp2, 112, 1e-9);
const hall = 12 * 0.2 * 5; // 12 computers, 0.2 kW, 5 hours
chk(hall, 12, 1e-9);

concept("acs.ethics.social-environment", { file: "ethics/social-environment", keyPrefix: "ethics.social-environment" }, (b) => {
  mc(b, 1, "RECALL", "What are the 3Rs of e-waste management?",
    ["Reduce, reuse and recycle", "Correct."],
    [["Repair, replace and remove", "These are not the 3Rs."], ["Record, restore and retire", "These are not the 3Rs."], ["Read, write and run", "These are not the 3Rs."]],
    "Reduce, reuse, recycle.");
  mc(b, 2, "UNDERSTANDING", "Which is a danger of social media?",
    ["False stories can spread quickly before they are corrected", "Correct: this is misinformation."],
    [["Photographs cannot be shared", "Sharing photographs is one of its main uses."], ["Messages take several days to arrive", "Messages are normally delivered at once."], ["Users cannot make contact with friends or family at all, however they try", "Contact with friends is a benefit."]],
    "Misinformation is a major danger.", { daily: true });
  mc(b, 2, "APPLICATION", "A school gives a working computer to a rural clinic after wiping the disk. Which of the 3Rs is this?",
    ["Reuse", "Correct: the computer is used again."],
    [["Recycle", "The computer is not broken down for materials."], ["Reduce", "The school has not reduced what it buys."], ["Dispose", "The computer is not thrown away."]],
    "Donating working equipment is reuse.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Why is it harmful to burn or dump old computers and batteries?",
    ["They contain toxic materials that can pollute soil, water and air", "Correct."],
    [["They become faster when burned", "Burning does not make them faster."], ["They cannot be recycled afterwards because burning destroys the metal", "The problem is pollution, not recycling."], ["They stop the internet working", "Disposal has no effect on the internet."]],
    "Toxic substances can harm people and animals.", { daily: true });
  mc(b, 3, "APPLICATION", "A school switches off the computers every evening. Which of the 3Rs does this follow, and what is the main effect?",
    ["Reduce, because less electricity is used", "Correct."],
    [["Reuse, because the computers are used again tomorrow", "Reuse concerns using an item again after it would be discarded."], ["Recycle, because the energy is collected", "Energy is not recycled by switching off."], ["None, because it affects only the computers", "Using less energy reduces the school's impact."]],
    "Using less energy is an example of reducing.", { hints: ["What is being used less?"] });
  mc(b, 3, "UNDERSTANDING", "What is the role of the Environmental Management Agency (EMA)?",
    ["To enforce environmental law and promote proper waste management", "Correct."],
    [["To sell computers to schools", "EMA does not trade in computers."], ["To provide mobile network services", "That is the role of network operators."], ["To write the school computer syllabus and set its national examinations", "That is the role of the examination and curriculum bodies."]],
    "EMA enforces environmental law.", { hints: ["Is EMA a business, a regulator or a school?"] });
  mc(b, 3, "ANALYSIS", "Before a school gives old computers to a recycler, what must it do to protect privacy?",
    ["Erase the data from the disks or destroy the disks", "Correct."],
    [["Remove the keyboards", "A keyboard holds no stored data."], ["Fully charge the batteries of every computer in the room", "Charging does not protect privacy."], ["Paint the cases", "Paint does not affect the data."]],
    "Data must be removed before equipment leaves the school.", { hints: ["Where does a computer keep personal data?"] });
  mc(b, 4, "EVALUATION", "A student says that social media is entirely harmful and should be banned in schools. Which reply is the best balanced judgement?",
    ["It has benefits such as communication and study groups as well as dangers, so rules and education on safe use are better than a complete ban", "Correct."],
    [["The student is right, because social media has no benefits for learners and only ever causes harm to schools", "It has several benefits."], ["There are no dangers, so no rules are needed", "There are real dangers."], ["Only teachers can use it safely", "This ignores the reasons for the dangers and the benefits for learners."]],
    "A balanced answer weighs benefits and dangers.", { hints: ["Does the reply look at both sides?"] });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Recycling and reuse mean the same thing.", answer: false, explanation: "False. Reuse means using an item again, perhaps after repair; recycling breaks it down so that its materials can make new things." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each action to the R it illustrates.",
    pairs: [["Buying a longer-lasting laptop instead of a cheap one that breaks quickly", "Reduce"], ["Repairing a broken screen and using the laptop again", "Reuse"], ["Taking a broken laptop to an authorised collector that separates its metals and plastics", "Recycle"], ["Switching off projectors when not in use", "Reduce"]],
    explanation: "Using less is reduce; using again is reuse; breaking down for materials is recycle." });
  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.", hints: ["The first is about waste, the second about spreading false stories."],
    template: "Discarded electrical and electronic equipment is called {{blank:a}}. False information that spreads quickly on social media is called {{blank:b}}. A false statement that harms a person's reputation is {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["e-waste"], choices: ["e-waste", "malware", "spam", "freeware"] },
      { id: "b", accepted: ["misinformation"], choices: ["misinformation", "encryption", "validation", "compression"] },
      { id: "c", accepted: ["defamation"], choices: ["defamation", "piracy", "validation", "patent"] },
    ], explanation: "E-waste, misinformation, defamation." });
  b.short({ d: 2, skill: "RECALL", stem: "State the unit in which the energy used by an electrical device is normally measured when power is in kilowatts and time is in hours.",
    accepted: ["kwh", "kilowatt-hour", "kilowatt hour", "kilowatt-hours", "kilowatt hours"], normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["kw"], explanation: "Kilowatt-hour (kWh)." });
  b.num({ d: 3, skill: "APPLICATION", hints: ["Energy = power × time."],
    stem: "A projector has a power of 0.2 kW. A school uses 12 projectors for 5 hours. Calculate the total energy used in kWh.",
    value: hall, wrong: [0.2 * 5, 12 * 5], workedSolution: "1. Power of 12 projectors = 12 × 0.2 = 2.4 kW.\n2. Energy = 2.4 × 5 = 12 kWh.", explanation: "12 × 0.2 × 5 = 12 kWh." });
  b.num({ d: 3, skill: "APPLICATION", hints: ["Total mass = number × mass of one device; then take 70% of it."],
    stem: `A school replaces ${devices} devices, each of mass ${each} kg. A recycler recovers 70% of the mass. Calculate the mass recovered in kg.`,
    value: rec, wrong: [mass, disp], workedSolution: `1. Total mass = ${devices} × ${each} = ${mass} kg.\n2. Recovered = ${mass} × 0.70 = ${rec} kg.`, explanation: `${mass} × 0.7 = ${rec} kg.` });
  b.num({ d: 3, skill: "APPLICATION", unit: "US$", hints: ["Multiply the weekly energy by the cost of each kWh."],
    stem: `A laboratory wastes ${perWeek} kWh each week. Electricity costs US\\$${tariff.toFixed(2)} per kWh. Calculate the cost of the wasted energy for one week.`,
    value: costWeek, wrong: [perWeek, round(perWeek / tariff, 1)], workedSolution: `1. Cost = ${perWeek} × ${tariff} = US\\$${costWeek}.`, explanation: `${perWeek} × ${tariff} = ${costWeek}.` });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 4, hints: ["Two benefits and two dangers."],
    stem: "State two benefits and two dangers of social media for learners. [4]",
    points: ["Benefit: quick communication or study groups and sharing notes", "Benefit: information and a place to share ideas or build a small business", "Danger: cyberbullying or harassment", "Danger: misinformation, loss of privacy or addiction that reduces study time"],
    modelAnswer: "Benefits: learners can communicate quickly and form study groups to share notes. Dangers: cyberbullying and misinformation or loss of privacy.",
    explanation: "Any two benefits and two dangers." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Energy, materials, waste and toxic substances."],
    stem: "Explain two ways in which the use of computers affects the environment. [4]",
    points: ["Computers and servers use electricity, much of which comes from burning fuel, which adds to pollution", "Equipment left on when it is not needed wastes energy and money", "Old equipment becomes e-waste in large amounts", "It contains toxic materials such as lead and mercury that can pollute soil and water if dumped or burned"],
    modelAnswer: "Computers use electricity, often from burning fuel, so energy use adds to pollution, and equipment left on wastes it. Old equipment becomes e-waste that contains toxic materials such as lead and mercury, which can pollute soil and water if dumped or burned.",
    explanation: "Energy use and e-waste." });
  b.manualShort({ d: 3, skill: "APPLICATION", marks: 3, hints: ["Name each R and give an action."],
    stem: "A school has 30 old computers. Describe how the 3Rs could be applied to them. [3]",
    points: ["Reduce: buy fewer and more durable machines in the future or avoid replacing machines that still work", "Reuse: repair or upgrade working machines and donate them after wiping the data", "Recycle: send broken machines to an authorised recycler"],
    modelAnswer: "Reduce by buying fewer, more durable machines in future; reuse by repairing or upgrading working machines or donating them after wiping the data; recycle by sending the broken machines to an authorised recycler.",
    explanation: "Reduce, reuse, recycle applied." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 4, hints: ["Give a balanced view of benefits and dangers and reach a conclusion."],
    stem: "A school is deciding whether learners may use social media groups to share notes. Discuss. [4]",
    points: ["Benefit: quick sharing of notes, help with homework and links with other schools", "Danger: bullying, misinformation or off-topic distraction in the group", "Control: rules, teacher supervision, privacy settings and a way to report problems", "Conclusion: allow supervised, rule-based use, because the benefits can be kept and the dangers reduced"],
    modelAnswer: "Social media groups let learners share notes quickly and help each other, but they can lead to bullying, misinformation and distraction. With rules, supervision, privacy settings and a way to report problems, the benefits can be kept and the dangers reduced, so supervised use is sensible.",
    explanation: "Both sides and a conclusion." });
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Energy = power × time; cost = energy × price."],
    explanation: `The monitors use ${perDay} kWh per day, ${perWeek} kWh per week, costing US\\$${costWeek}.`,
    stem: `A computer laboratory in Gweru has ${mons} monitors. Each uses ${kw} kW on standby. They are left on standby for ${hrs} hours each weekday, 5 days a week. Electricity costs US\\$${tariff.toFixed(2)} per kWh.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the energy used by the monitors on standby in one day.", value: perDay, wrong: [mons * kw, mons * hrs], workedSolution: `1. ${mons} × ${kw} × ${hrs} = ${perDay} kWh.`, explanation: `${mons} × ${kw} × ${hrs} = ${perDay}.` }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the energy used in one week (5 weekdays).", value: perWeek, wrong: [perDay, perDay * 7], workedSolution: `1. ${perDay} × 5 = ${perWeek} kWh.`, explanation: `${perDay} × 5 = ${perWeek}.` }),
      P.num({ label: "(c)", marks: 1, stem: "Calculate the cost of this energy for one week.", unit: "US$", value: costWeek, wrong: [perWeek, round(perWeek / tariff, 1)], workedSolution: `1. ${perWeek} × ${tariff} = US\\$${costWeek}.`, explanation: `${perWeek} × ${tariff} = ${costWeek}.` }),
      P.manual({ label: "(d)", marks: 2, stem: "State two ways to reduce the energy wasted.", points: ["Switch off the monitors at the end of each day, or use a timer or a power strip", "Set the monitors and computers to sleep or switch off automatically after a short idle time"], modelAnswer: "Switch off the monitors at the end of each day with a power strip, and set the computers to sleep automatically after a short idle time.", explanation: "Reduce wasted energy." }),
    ] });
  b.struct({ d: 4, skill: "APPLICATION", examStyle: true, hints: ["Total mass = number × mass of one device; recovered = 60% of total."],
    explanation: `The total mass is ${mass2} kg, ${rec2} kg is recovered and ${disp2} kg needs safe disposal.`,
    stem: `A district office in Masvingo replaces ${d2} devices, each of mass ${e2} kg. An authorised recycler recovers 60% of the mass.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the total mass of the devices, in kg.", value: mass2, wrong: [d2 + e2, 35], workedSolution: `1. ${d2} × ${e2} = ${mass2} kg.`, explanation: `${mass2} kg.` }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the mass of material that is not recovered and must be disposed of safely, in kg.", value: disp2, wrong: [rec2, mass2], workedSolution: `1. Recovered = ${mass2} × 0.60 = ${rec2} kg.\n2. Not recovered = ${mass2} − ${rec2} = ${disp2} kg.`, explanation: `${mass2} − ${rec2} = ${disp2}.` }),
      P.manual({ label: "(c)", marks: 3, stem: "Describe three steps the office should follow when disposing of the devices responsibly.", points: ["Erase the data from the disks or destroy the disks to protect privacy", "Use an authorised collection or recycling service and never burn or dump the devices", "Donate working devices for reuse and keep a record of what was disposed of and how"], modelAnswer: "Erase the data or destroy the disks, use an authorised recycler and never burn or dump the devices, and donate working devices for reuse while keeping a record of the disposal.", explanation: "Responsible disposal." }),
    ] });
  b.struct({ d: 3, skill: "UNDERSTANDING", examStyle: true, hints: ["Link each point to the organisation named."],
    explanation: "Social media helps sales and communication but has risks of misinformation and abuse; the shop needs rules and settings.",
    stem: "Rudo sells handmade bags in Bulawayo and advertises them on a social media page that also lets customers comment.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "State two benefits of using social media for her business.", points: ["She can reach many customers cheaply, including in other towns", "Customers can ask questions and she can answer quickly"], modelAnswer: "She can reach many customers cheaply, including in other towns, and customers can ask questions and she can answer quickly.", explanation: "Enterprise benefits." }),
      P.manual({ label: "(b)", marks: 2, stem: "Describe two dangers to the business.", points: ["False or insulting comments could damage the business's reputation (defamation)", "Customers' details or payments could be stolen through scams or fake accounts"], modelAnswer: "False or insulting comments could damage the business's reputation, and customers' details or payments could be stolen through scams or fake accounts.", explanation: "Reputation and fraud." }),
      P.manual({ label: "(c)", marks: 2, stem: "Suggest two ways in which Rudo can use the page responsibly.", points: ["Check the facts in posts, do not post customers' details or pictures without permission", "Use privacy settings, remove abusive comments and report scams"], modelAnswer: "She should check facts and not post customers' details without permission, and she should use privacy settings, remove abusive comments and report scams.", explanation: "Responsible use." }),
    ] });
  b.card("DEFINITION", "E-waste", "Discarded electrical and electronic equipment such as computers, phones, monitors and batteries.");
  b.card("DEFINITION", "The 3Rs", "Reduce (use less), reuse (use again, repair, donate) and recycle (break down so the materials make new things).");
  b.card("CONCEPT", "Benefits of social media", "Quick communication, enterprise, education and study groups, community information.");
  b.card("CONCEPT", "Dangers of social media", "Misinformation, cyberbullying, loss of privacy, addiction, defamation, scams.");
  b.card("CONCEPT", "Environmental effects of computing", "Energy use, raw materials, large amounts of e-waste and toxic materials such as lead and mercury.");
  b.card("FORMULA", "Energy used", "Energy (kWh) = power (kW) × time (hours); cost = energy × price per kWh.");
  b.card("FACT", "Role of EMA", "The Environmental Management Agency enforces environmental law and promotes proper waste management (described in outline).");
  b.card("CONCEPT", "Responsible disposal", "Erase data, use authorised collection or recycling, never burn or dump equipment, donate working items and keep records.");
});
