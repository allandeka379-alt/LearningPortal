// W1b: business and professional ethics in accounting.
import { concept, P, money, statement, check, sum, r2, ZIM, CAM } from "../lib.mjs";

concept("acc.ethics.professional-ethics", { file: "ethics/professional-ethics", keyPrefix: "ethics.professional-ethics" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which ethical principle requires an accountant to be honest and straightforward in all business relationships?",
    options: [
      ["Integrity", "Correct: integrity means honesty and straightforwardness."],
      ["Confidentiality", "Confidentiality is about not disclosing information without permission."],
      ["Objectivity", "Objectivity is about avoiding bias and conflicts of interest."],
      ["Competence", "Competence is about having up-to-date knowledge and skills."],
    ],
    answer: "A",
    explanation: "**Integrity**: being honest and straightforward, never knowingly associated with false or misleading information.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "An accountant refuses to tell a friend how much profit a client's business made. Which principle is she following?",
    options: [
      ["Confidentiality", "Correct: client information is not disclosed without permission."],
      ["Integrity", "Integrity is about honesty; the key issue here is keeping information private."],
      ["Objectivity", "Objectivity is about avoiding bias."],
      ["Compliance", "Compliance is about obeying laws and regulations."],
    ],
    answer: "A",
    explanation: "**Confidentiality**: information gained at work is not shared without permission (unless there is a legal duty to disclose).",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Tendai, an accounts clerk, is asked to decide whether to give credit to a business owned by his brother. Which principle is most at risk?",
    options: [
      ["Objectivity", "Correct: a family link is a conflict of interest that could bias his judgement."],
      ["Confidentiality", "No information is being disclosed."],
      ["Competence", "Nothing suggests he lacks the skill to assess credit."],
      ["Integrity", "He has not been dishonest; the risk is bias from the conflict of interest."],
    ],
    answer: "A",
    explanation: "A conflict of interest threatens **objectivity**. Tendai should declare the link and let someone else make the decision.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", applies: CAM,
    stem: "Chipo is asked to prepare a club's accounts using rules she has never studied, and she does not seek help. Which principle is she in danger of breaching?",
    options: [
      ["Professional competence and due care", "Correct: she should only do work she is competent to do, with care."],
      ["Confidentiality of client information", "No information is being disclosed."],
      ["Objectivity and freedom from bias", "There is no bias or conflict of interest."],
      ["Professional behaviour", "Professional behaviour is about obeying laws and not discrediting the profession; the issue here is skill."],
    ],
    answer: "A",
    explanation: "**Professional competence and due care**: keep skills up to date, and do not take on work beyond your ability without training or help.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", applies: ZIM,
    stem: "A bookkeeper makes sure that the business keeps proper records and pays the correct tax as the law requires. Which ZIMSEC ethical principle is this?",
    options: [
      ["Compliance", "Correct: compliance means following the laws and regulations that apply."],
      ["Confidentiality", "Confidentiality is about keeping information private."],
      ["Objectivity", "Objectivity is about avoiding bias."],
      ["Competence", "Competence is about knowledge and skill."],
    ],
    answer: "A",
    explanation: "**Compliance** (ZIMSEC): obeying tax law, company law and accounting rules.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A supplier offers a purchasing clerk a free mobile phone if she continues to order from them. What is the most ethical response?",
    options: [
      ["Refuse the gift and report the offer to her manager", "Correct: accepting would threaten her objectivity; reporting protects the business."],
      ["Accept the phone, as it does not cost the business anything", "The gift could bias her choice of supplier, which may cost the business more."],
      ["Accept the phone but tell nobody", "Hiding it makes the conflict of interest worse."],
      ["Order more goods to thank the supplier", "Orders should be based on price and quality, not gifts."],
    ],
    answer: "A",
    hints: ["Would the gift affect her future decisions?"],
    explanation: "Gifts that could influence decisions threaten **objectivity** and **integrity**. The ethical action is to refuse and report.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "An owner tells his bookkeeper to record a sale made on 3 January 2026 as a sale on 31 December 2025, to show a higher profit to the bank. Which principle would the bookkeeper breach by doing so?",
    options: [
      ["Integrity", "Correct: the records would be deliberately misleading."],
      ["Confidentiality", "No information is being disclosed."],
      ["Competence", "The bookkeeper knows how to record it correctly; the issue is honesty."],
      ["Materiality", "Materiality is an accounting concept, not an ethical principle."],
    ],
    answer: "A",
    hints: ["Is anything false being recorded?"],
    explanation: "Recording a sale in the wrong year to mislead a lender breaches **integrity** (and the realisation concept). The bookkeeper should refuse.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", applies: ZIM,
    stem: "Which value is central to the philosophy of Unhu/Ubuntu/Vumunhu in business?",
    options: [
      ["Fairness and responsibility towards other people and the community", "Correct: \"I am because we are\" stresses respect and care for others."],
      ["Making the highest possible profit at any cost", "Unhu puts people and fairness before profit at any cost."],
      ["Keeping all business information secret from everyone", "Confidentiality is a principle, but it is not the heart of Unhu."],
      ["Paying the lowest possible tax by any means", "Avoiding tax dishonestly harms the community, against Unhu."],
    ],
    answer: "A",
    explanation: "**Unhu/Ubuntu/Vumunhu** values honesty, respect, fairness and responsibility to the community; in business this means fair treatment of customers, workers and the state.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION", applies: CAM,
    stem: "Why does an ethical framework matter to a bank deciding whether to lend to a business?",
    options: [
      ["The bank relies on financial statements it cannot check itself", "Correct: honest accounts let the bank judge whether the loan can be repaid."],
      ["It guarantees that the business will make a profit", "Ethics make figures reliable; they do not guarantee profit."],
      ["It means the bank does not need to see the accounts", "The bank still needs the accounts; ethics make them trustworthy."],
      ["It allows the accountant to share the client's secrets with the bank", "Confidentiality still applies without the client's permission."],
    ],
    answer: "A",
    hints: ["What does the bank use to judge a loan application?"],
    explanation: "Lenders rely on accounts prepared with integrity and objectivity. False figures could lead to a loan that cannot be repaid.",
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "Business ethics means only doing what the law requires.",
    answer: false,
    explanation: "False. Ethics goes beyond the law: it is about doing what is right and fair, even where the law is silent.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "An accountant who has a conflict of interest should declare it to the employer or client.",
    answer: true,
    explanation: "True. Declaring the conflict protects objectivity; the decision can then be made by someone else.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "The confidentiality principle allows an accountant to hide a client's fraud from the authorities when the law requires it to be reported.",
    answer: false,
    hints: ["Does confidentiality override a legal duty?"],
    explanation: "False. Confidentiality does not apply where there is a legal duty to disclose.",
  });

  b.match({
    d: 2, skill: "APPLICATION", applies: CAM,
    stem: "Match each situation with the principle it threatens.",
    pairs: [
      ["Telling a neighbour how much a client earns", "Confidentiality"],
      ["Recording invented sales to impress a lender", "Integrity"],
      ["Approving a loan to a company owned by your sister", "Objectivity"],
      ["Preparing tax returns without learning the new rules", "Professional competence and due care"],
      ["Helping a client hide income from the tax authority", "Professional behaviour"],
    ],
    explanation: "Each case threatens one of Cambridge's five fundamental principles.",
  });
  b.match({
    d: 2, skill: "APPLICATION", applies: ZIM,
    stem: "Match each ZIMSEC principle with its meaning.",
    pairs: [
      ["Professionalism", "Behaving and working in a way that brings credit to the job"],
      ["Compliance", "Obeying the laws and rules that apply"],
      ["Competence", "Having the knowledge and skill to do the work properly"],
      ["Objectivity", "Making judgements without bias"],
    ],
    explanation: "These are among the professional ethics listed in the ZIMSEC syllabus.",
  });

  b.fib({
    d: 2,
    stem: "Choose the correct principle.",
    template: "Refusing a supplier's gift that could influence your orders protects your {{blank:a}}. Keeping a client's profit figures private protects {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["objectivity"], choices: ["objectivity", "confidentiality", "competence"] },
      { id: "b", accepted: ["confidentiality"], choices: ["confidentiality", "objectivity", "competence"] },
    ],
    explanation: "Gifts threaten objectivity; disclosure threatens confidentiality.",
  });

  // Numerical: understated profit from unethical request
  const u = { reported: 7840, omitted: 1960, privateBills: 515 };
  const honest = r2(u.reported + u.omitted + u.privateBills);
  b.calc({
    d: 3, kind: "money", value: honest, wrong: [r2(u.reported + u.omitted), r2(u.reported - u.omitted - u.privateBills)],
    stem: `A tuck shop owner in Masvingo asked her bookkeeper to leave out cash sales of ${money(u.omitted)} and to record ${money(u.privateBills)} of her private bills as business expenses. The profit reported was ${money(u.reported)}. Calculate the profit that should have been reported.`,
    hints: ["Both actions made the profit lower than it really was."],
    explanation: `Add back the omitted sales and remove the private bills from expenses: $7,840 + 1,960 + 515 = ${honest.toLocaleString("en-GB")}$. Forgetting the private bills gives ${money(r2(u.reported + u.omitted))}.`,
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why accountants need an ethical framework.",
    points: ["Users (owners, banks, government) rely on financial information they cannot check, so it must be trustworthy", "Accountants face pressure / conflicts of interest; the framework gives clear principles to resist them and protects the public and the profession's reputation"],
    modelAnswer: "Banks, owners and the government make decisions using figures they cannot check, so the people preparing them must be trustworthy. Accountants are often pressured to change figures; a framework of principles tells them what is acceptable and protects the public and the profession.",
    hints: ["Who relies on the figures, and what pressures exist?"],
    explanation: "Trust and pressure are the two key ideas.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 2, applies: ZIM,
    stem: "Give **two** ways a small business owner can show Unhu/Ubuntu/Vumunhu in day-to-day business transactions.",
    points: ["Treating customers fairly: honest prices, correct change, no selling of expired goods", "Paying workers, suppliers and taxes fairly and on time / supporting the community"],
    modelAnswer: "By charging fair prices and giving correct change and honest information about goods, and by paying workers, suppliers and taxes properly and on time.",
    hints: ["Think about customers, workers and the community."],
    explanation: "Unhu is shown through fairness and respect in ordinary transactions.",
  });

  // Practice structured 1 (ZIM): applying ethics in a case
  const z = { reported: 14260, cashSales: 2750, wife: 1200 };
  const zHonest = r2(z.reported + z.wife);
  check("zHonest", zHonest, 15460);
  b.struct({
    d: 4, examStyle: true, skill: "APPLICATION", applies: ZIM, calculator: true,
    stem: `Farai owns a hardware shop in Chinhoyi. His bookkeeper, Thandeka, prepared a net profit of ${money(z.reported)} for the year ended 31 December 2025. Farai then asked her to:\n\n1. leave out cash sales of ${money(z.cashSales)} "so that the tax will be lower";\n2. continue recording his wife's monthly allowance, ${money(z.wife)} for the year, as wages;\n3. tell him the salaries of the staff at a rival shop, which she also keeps books for.`,
    parts: [
      P.match({
        label: "(a)", stem: "Match each request with the principle it breaches.",
        pairs: ["Request 1", "Request 2", "Request 3"],
        right: ["Compliance", "Integrity", "Confidentiality", "Competence"],
        rightIndex: [0, 1, 2],
        explanation: "Hiding sales from tax breaks the law (compliance); false wages make the records dishonest (integrity); the rival's salaries are confidential.",
      }),
      P.num({
        label: "(b)", marks: 2, kind: "money", value: zHonest, wrong: [r2(z.reported - z.cashSales), z.reported],
        stem: "Thandeka's profit of US\\$14,260 correctly includes the cash sales but records the wife's allowance as wages. Calculate the net profit that should be reported.",
        explanation: `The allowance is drawings, not a business expense, so it is removed from wages and profit rises: $14,260 + 1,200 = ${zHonest.toLocaleString("en-GB")}$. Leaving out the cash sales as Farai asked would give a false ${money(r2(z.reported - z.cashSales))}.`,
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Advise Thandeka how she should respond to Farai.",
        points: ["Refuse to leave out sales / explain it is illegal and dishonest", "Treat the allowance as drawings, not wages (business entity)", "Refuse to disclose the rival's information; if Farai insists, consider ending the engagement"],
        modelAnswer: "Thandeka should politely refuse each request, explaining that leaving out sales breaks tax law and her integrity, that his wife's allowance is drawings, and that she cannot share another client's information. If Farai insists on false records she should stop working for him.",
        explanation: "Give a clear course of action linked to the principles.",
      }),
      P.manual({
        label: "(d)", marks: 2,
        stem: "Explain how Farai's requests go against Unhu/Ubuntu/Vumunhu.",
        points: ["Unhu values honesty and responsibility to the community", "Under-paying tax takes money from public services; using a rival's secrets is unfair to others"],
        modelAnswer: "Unhu stresses honesty and care for others. Avoiding tax deprives the community of services, and using a rival's confidential information is unfair to that business and its staff.",
        explanation: "Link the requests to the community and fairness.",
      }),
    ],
    hints: ["Identify the pressure in each request.", "Leaving out sales lowers profit; so does charging private payments as wages."],
    explanation: "This item applies ZIMSEC's professional ethics and Unhu to a business case.",
  });

  // Practice structured 2 (CAM): stakeholders and principles
  const s = { draftProfit: 21500, fakeSales: 3800, unrecordedDebt: 950 };
  const sTrue = r2(s.draftProfit - s.fakeSales - s.unrecordedDebt);
  const sStmt = statement("Corrected profit for the year ended 31 December 2025", [
    ["Profit reported to the bank", null, s.draftProfit],
    ["Less: invented sales", s.fakeSales, null],
    ["Less: irrecoverable debt not written off", s.unrecordedDebt, null],
    [null, null, -r2(s.fakeSales + s.unrecordedDebt)],
    ["**Corrected profit**", null, sTrue],
  ], { checks: [["t", sTrue, 16750]] });
  b.struct({
    d: 5, examStyle: true, skill: "EVALUATION", applies: CAM, calculator: true,
    stem: `Tatenda manages a building supplies company in Bulawayo and is applying for a bank loan. The accounts he sent to the bank show a profit of ${money(s.draftProfit)} for the year ended 31 December 2025. The company's accountant, Rudo, discovers that:\n\n- sales of ${money(s.fakeSales)} were invented by Tatenda;\n- a customer who owes ${money(s.unrecordedDebt)} has been declared bankrupt, but the debt was not written off.`,
    parts: [
      P.num({
        label: "(a)", marks: 3, kind: "money", value: sTrue, wrong: [r2(s.draftProfit - s.fakeSales), r2(s.draftProfit + s.fakeSales + s.unrecordedDebt)],
        stem: "Calculate the corrected profit for the year.",
        explanation: `$21,500 - 3,800 - 950 = ${sTrue.toLocaleString("en-GB")}$.`,
        workedSolution: sStmt,
      }),
      P.mcq({
        label: "(b)", stem: "Which fundamental principle did Tatenda breach by inventing sales?",
        options: [["Integrity", "Correct: the figures are deliberately false."], ["Confidentiality", "Nothing private was disclosed."], ["Professional competence and due care", "The problem is dishonesty, not lack of skill."], ["Objectivity", "The figures are not merely biased; they are invented."]],
        answer: "A",
        explanation: "Knowingly giving false information breaches integrity.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain the possible effects of the false accounts on **three** different stakeholders.",
        points: ["Bank: lends on an overstated profit and may not be repaid", "Suppliers / employees: rely on a business that is weaker than it looks; risk of unpaid debts or lost jobs", "Government / owners: wrong tax or wrong decisions; the company's reputation suffers if discovered"],
        modelAnswer: "The bank may lend money that cannot be repaid. Suppliers may give credit, and employees may stay, believing the business is stronger than it is. The owners and the government receive a misleading picture, and if discovered the company's reputation is damaged.",
        explanation: "Name the stakeholder and the effect on it.",
      }),
      P.manual({
        label: "(d)", marks: 3,
        stem: "Evaluate what Rudo should do.",
        points: ["Raise the matter with Tatenda / the owners and insist the accounts are corrected (integrity, professional behaviour)", "Not hide the problem out of loyalty or fear (objectivity)", "Conclusion: if the false accounts are not withdrawn she should report through proper channels / decline to be associated with them"],
        modelAnswer: "Rudo must not stay silent. She should explain to Tatenda, and if necessary to the owners, that the accounts are false and must be corrected before the bank relies on them. If they refuse, she should not be associated with the accounts and should report the matter through the proper channels, even if this puts her job at risk.",
        explanation: "Evaluation needs a justified recommendation.",
      }),
    ],
    hints: ["Invented sales and an unrecorded bad debt both overstate profit.", "Who relies on these accounts?"],
    explanation: "Ethical principles protect the users of financial statements.",
  });

  b.card("DEFINITION", "**Business ethics**", "Moral principles guiding a business to act rightly and fairly towards customers, suppliers, employees, government and society, not just legally.");
  b.card("FACT", "Cambridge's five fundamental ethical principles", "Integrity; objectivity; professional competence and due care; confidentiality; professional behaviour.", undefined, { applies: CAM });
  b.card("FACT", "ZIMSEC professional ethics", "Professionalism, integrity, confidentiality, competence, objectivity and compliance; linked to Unhu/Ubuntu/Vumunhu.", undefined, { applies: ZIM });
  b.card("DEFINITION", "**Integrity**", "Being honest and straightforward; never associated with false or misleading information.");
  b.card("DEFINITION", "**Objectivity**", "Not allowing bias, conflicts of interest or pressure to affect professional judgement.");
  b.card("DEFINITION", "**Confidentiality**", "Not disclosing information without permission or a legal duty, and not using it for personal gain.");
  b.card("CONCEPT", "Why an ethical framework?", "Users rely on figures they cannot check; accountants face pressure and conflicts of interest; it protects the public and the profession.");
  b.card("CONCEPT", "**Unhu/Ubuntu/Vumunhu** in business", "\"I am because we are\": honesty, respect, fairness and responsibility to the community.", undefined, { applies: ZIM });
});
