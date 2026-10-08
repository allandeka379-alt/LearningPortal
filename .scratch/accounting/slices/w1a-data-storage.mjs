// W1a: acc.technology.data-storage (Cambridge only)
import { concept, P, money, fmt, check } from "../lib.mjs";

const row = (c) => `| ${c.join(" | ")} |`;

concept("acc.technology.data-storage", { file: "technology/data-storage", keyPrefix: "technology.data-storage" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **back-up** of accounting data?",
    options: [
      ["An extra copy kept separately so data can be restored", "Correct: a back-up protects against loss of the original."],
      ["The first copy of a document entered in the books", "That is the original entry, not a back-up."],
      ["A password used to protect a spreadsheet", "A password protects access; it does not copy data."],
      ["A summary of the ledger balances at a date", "That describes a trial balance."],
    ],
    answer: "A",
    explanation: "A back-up is an extra copy kept in a different place, so that records can be restored after loss or damage.",
  });

  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is an **advantage** of cloud storage for accounting records?",
    options: [
      ["Records survive a fire at the business premises", "Correct: the data are held off the premises by the provider."],
      ["It works without any internet connection", "Cloud storage needs internet access."],
      ["It has no ongoing cost to the business", "Most cloud services charge a monthly or yearly fee."],
      ["It cannot be reached by hackers", "Weak passwords can let hackers in."],
    ],
    answer: "A",
    explanation: "Cloud storage keeps copies away from the premises and can be reached from anywhere, but needs internet, costs fees and must be protected by strong passwords.",
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is a **disadvantage** of storing accounting records only on a USB flash drive?",
    options: [
      ["It can easily be lost, stolen or damaged", "Correct: a small single device is a single point of failure."],
      ["It needs an internet connection to open files", "A flash drive works offline."],
      ["It can hold only a few pages of data", "Flash drives hold very large amounts of data."],
      ["Its files cannot be searched on a computer", "Digital files can be searched quickly."],
    ],
    answer: "A",
    explanation: "Devices are cheap and large, but a single device can fail, be lost or carry a virus. Keep at least one back-up elsewhere.",
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why must a business store its accounting records safely for several years?",
    options: [
      ["To provide evidence to the tax authority if asked", "Correct: tax officers may inspect records of earlier years."],
      ["Because old records are added to this year's profit", "Earlier years' records are not added to this year's profit."],
      ["Because records can never be destroyed by law", "Records may be disposed of after the period required."],
      ["To increase the value of the business's assets", "Records are not assets in the statement of financial position."],
    ],
    answer: "A",
    explanation: "Records are evidence for tax, disputes and audits, and they allow comparisons over time.",
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which practice makes digital storage **more sustainable**?",
    options: [
      ["Wiping and recycling old devices responsibly", "Correct: this limits electronic waste and protects data."],
      ["Printing every email invoice for the files", "Printing everything increases paper and ink use."],
      ["Keeping every record forever on many devices", "Keeping data longer than needed uses more energy and devices."],
      ["Throwing old hard drives away with the rubbish", "This creates e-waste and risks a data leak."],
    ],
    answer: "A",
    explanation: "Sustainable storage limits paper, energy and electronic waste, while keeping records safe for as long as they are needed.",
  });

  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Tendai keeps his accounting files on his office computer and a back-up on a USB drive in the desk drawer of the same office. What is the main weakness?",
    options: [
      ["Both copies could be lost in one fire or theft", "Correct: a back-up must be kept in a separate place."],
      ["USB drives cannot store accounting files", "They can store any digital file."],
      ["The computer needs internet to open the files", "Local files open without internet."],
      ["Two copies use too much electricity", "The energy used is tiny; location is the problem."],
    ],
    answer: "A",
    explanation: "A copy in the same place is lost with the original. Keep the back-up at home, in a safe elsewhere, or in the cloud.",
    hints: ["What happens to both copies if the office burns down?"],
  });

  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A cashier in a supermarket can open the wages file and change her own pay rate. Which risk of poor data storage does this show?",
    options: [
      ["Unauthorised access leading to fraud", "Correct: access should be limited to staff who need it."],
      ["Loss of data through device failure", "Nothing has been lost; the file was changed."],
      ["Damage to records by fire or flood", "No physical damage is involved."],
      ["Higher costs of cloud subscriptions", "Cost is not the issue here."],
    ],
    answer: "A",
    explanation: "Passwords and access levels stop staff opening records they do not need, reducing the risk of fraud and leaks.",
    hints: ["Should a cashier be able to open wage records at all?"],
  });

  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which is an example of a digital application used for accounting records?",
    options: [
      ["Downloading monthly statements from online banking", "Correct: they are digital source documents."],
      ["Writing receipts in a carbon-copy receipt book", "This is a manual record."],
      ["Filing paper invoices in a box file", "This is manual storage."],
      ["Adding a cash book column with a pencil", "This is a manual method."],
    ],
    answer: "A",
    explanation: "Digital applications include accounting software, spreadsheets, emailed invoices, photographed receipts, online banking and point-of-sale systems.",
  });

  {
    const months = 24, fee = 8, drive = 95;
    const cloud = months * fee;
    check("c", cloud - drive, 97);
    b.num({
      d: 2, skill: "APPLICATION", kind: "money", value: cloud - drive, daily: true,
      stem: `A cloud service costs ${money(fee)} a month. An external hard drive costs ${money(drive)} and will last at least two years. How much **more** does the cloud service cost over two years?`,
      wrong: [cloud, fee * 12 - drive],
      explanation: `Cloud: ${fee} × ${months} = ${money(cloud)}. Difference: ${fmt(cloud)} − ${fmt(drive)} = ${money(cloud - drive)}. Using one year only gives ${money(fee * 12 - drive)}, which is wrong because the comparison is over two years.`,
    });
  }

  {
    const cab = 240, paperMonth = 11, months = 36, scanner = 165, cloudMonth = 5;
    const paper = cab + paperMonth * months, digital = scanner + cloudMonth * months;
    const saving = paper - digital;
    check("s", saving, paper - digital);
    b.calc({
      d: 3, skill: "APPLICATION", kind: "money", value: saving, calculator: true,
      stem: `Thandeka compares two ways of storing her records for three years. Paper: a fireproof cabinet at ${money(cab)} plus paper, ink and files at ${money(paperMonth)} a month. Digital: a scanner at ${money(scanner)} plus a cloud service at ${money(cloudMonth)} a month. Calculate how much cheaper the digital option is over the three years.`,
      wrong: [r(paperMonth * months - cloudMonth * months), cab - scanner],
      explanation: `1. Paper: ${fmt(cab)} + (${paperMonth} × ${months}) = ${money(paper)}.\n2. Digital: ${fmt(scanner)} + (${cloudMonth} × ${months}) = ${money(digital)}.\n3. Saving: ${fmt(paper)} − ${fmt(digital)} = ${money(saving)}.\n\nComparing only the monthly costs (${money(paperMonth * months - cloudMonth * months)}) ignores the one-off purchases.`,
      hints: ["Three years is 36 months.", "Include the one-off costs and the monthly costs."],
    });
  }

  b.tf({
    d: 1, skill: "RECALL",
    stem: "Cloud storage needs an internet connection to reach the data.",
    answer: true,
    explanation: "True. This is a disadvantage where connections are slow or unreliable.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Storing records digitally has no effect on the environment.",
    answer: false,
    explanation: "False. Devices and data centres use electricity and water, and old devices become electronic waste. Digital storage does save paper.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A back-up is only useful if the business checks that the data can actually be restored from it.",
    answer: true,
    explanation: "True. A back-up that is out of date or cannot be opened gives false security.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each storage method with a disadvantage.",
    pairs: [
      ["Paper files in the office", "Damaged by water, fire and insects"],
      ["External hard drive", "Can fail mechanically or be stolen"],
      ["Cloud service", "Needs internet and charges ongoing fees"],
      ["Email archive of invoices", "Not designed as the main record and may be deleted"],
    ],
    explanation: "Every method has weaknesses, which is why businesses combine methods.",
  });

  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "To protect records from a fire at the premises, a {{blank:a}} should be kept in a {{blank:b}} place, and access to files should be controlled with {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["back-up", "backup", "back up", "copy"] },
      { id: "b", accepted: ["different", "separate", "another"] },
      { id: "c", accepted: ["passwords", "password", "access levels"] },
    ],
    wrong: [["copy", "same", "keys"]],
    explanation: "Back-ups in a separate place protect against loss; passwords and access levels protect against unauthorised access.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "State **two** risks to a business of not storing its accounting records safely.",
    points: [
      "One risk: loss of data (fire, flood, theft, device failure, virus) / unauthorised access / fraud / tax penalties / loss of reputation.",
      "A second, different risk.",
    ],
    modelAnswer: "The records could be destroyed in a fire, so the business cannot prove what customers owe; and staff could see or change confidential data such as wages.",
    explanation: "Any two of: loss, unauthorised access, fraud, penalties, damage to reputation.",
  });

  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "Farai runs a hardware business in Gweru with power cuts most days and a slow internet connection. He stores all records on one office computer. Compare **cloud storage** and **an external hard drive kept at home** as a back-up, and advise him which to use.",
    points: [
      "Cloud: copies are off the premises and updated automatically / reached from anywhere.",
      "Cloud: needs internet (slow connection) and ongoing fees; hacking risk.",
      "External drive: cheap one-off cost and works without internet.",
      "External drive: must be updated by hand and carried home; can fail or be lost.",
      "A recommendation.",
      "The recommendation is justified using his situation (power cuts / slow internet favour the drive, or a combination).",
    ],
    modelAnswer: "Cloud storage keeps copies away from the shop and backs up automatically, but with slow internet the uploads may fail and he would pay monthly fees. An external drive is cheap and works offline, but Farai must remember to update it and take it home, and it can fail. With slow internet and frequent power cuts, I advise the external drive, updated every day the power is on and kept at home, adding a cloud copy of the most important files when the connection allows.",
    explanation: "Compare both methods on the same features, then advise with reasons from the case.",
    hints: ["His internet is slow: how does that affect the cloud option?"],
  });

  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 720,
    stem: "Chipo runs a clinic in Mutare. Patient invoices are emailed, receipts are photographed on a phone, and the ledger is kept in a spreadsheet on one laptop. Paper copies of everything are kept in cardboard boxes on the storeroom floor.",
    parts: [
      P.mcq({ label: "(a)", stem: "Which of Chipo's practices is an example of a digital source document?", options: [["Photographing receipts on a phone", "Correct: the photograph is a digital record of the receipt."], ["Keeping boxes of paper copies", "This is manual storage."], ["Keeping the boxes on the floor", "This is a storage practice, not a document."], ["Adding totals with a calculator", "This is a manual calculation."]], answer: "A", explanation: "Emailed invoices and photographed receipts are digital source documents." }),
      P.manual({ label: "(b)", marks: 4, stem: "Identify **two** risks in the way Chipo stores her records and explain the consequence of each.", points: ["Only one laptop holds the ledger (no back-up)…", "…so if it is stolen or fails, the ledger is lost and statements cannot be prepared.", "Boxes on the floor can be damaged by water or insects…", "…so evidence for tax or disputes may be destroyed."], modelAnswer: "The ledger is only on one laptop, so if it is stolen or breaks she loses her records and cannot prepare statements or chase unpaid invoices. The paper boxes on the floor could be ruined by a flood or insects, leaving her without evidence if the tax authority asks for it." }),
      P.manual({ label: "(c)", marks: 3, stem: "Suggest **three** improvements Chipo could make.", points: ["Back up the spreadsheet regularly to a separate place (cloud or a drive kept elsewhere).", "Protect the laptop and files with passwords (patients' data are confidential).", "Store essential paper records off the floor in a lockable, waterproof container, and stop printing documents that are already stored digitally (sustainability)."], modelAnswer: "Back up the spreadsheet weekly to the cloud or a drive kept at home; password-protect the laptop because patient data are confidential; keep only essential paper copies, in a lockable waterproof box off the floor." }),
    ],
    explanation: "Safe storage needs back-ups in a separate place, access controls and protection from physical damage.",
    hints: ["Look for single copies and physical dangers."],
  });

  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, calculator: true, secs: 780,
    stem: `Sipho's transport business must choose a storage method for three years.\n\n${row(["Option", "One-off cost US\\$", "Monthly cost US\\$"])}\n${row(["---", "---:", "---:"])}\n${row(["X: Two external drives", fmt(2 * 85), "0"])}\n${row(["Y: Cloud service", "0", "7"])}`,
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "money", value: 7 * 36, stem: "Calculate the total cost of option Y over three years.", wrong: [7 * 12], explanation: `7 × 36 = ${money(7 * 36)}.` }),
      P.num({ label: "(b)", marks: 1, kind: "money", value: 7 * 36 - 170, stem: "Calculate how much cheaper option X is over the three years.", wrong: [7 * 36 - 85], explanation: `${fmt(7 * 36)} − (2 × 85 = 170) = ${money(7 * 36 - 170)}.` }),
      P.manual({ label: "(c)", marks: 4, stem: "Sipho's drivers send fuel receipts from different towns every day. Evaluate the two options and recommend one.", points: ["X is cheaper and works without internet.", "X must be updated by hand; receipts from drivers away from the office are not captured until they return.", "Y lets drivers upload receipts from anywhere and backs up automatically, despite the extra cost and the need for internet.", `Justified recommendation (e.g. Y, because drivers are in different towns and the extra ${money(7 * 36 - 170)} over three years is small).`], modelAnswer: `Option X costs ${money(7 * 36 - 170)} less and works offline, but it only holds what is copied onto it at the office. Because drivers send receipts every day from different towns, option Y lets them upload receipts at once and keeps an automatic copy away from the office. I recommend option Y: the extra cost is small compared with the risk of lost receipts.` }),
    ],
    explanation: `Option Y costs ${money(7 * 36)}; X is ${money(7 * 36 - 170)} cheaper, but cost is only one factor.`,
    hints: ["Three years is 36 months.", "Think about where the data are created."],
  });

  b.card("DEFINITION", "Back-up", "An extra copy of data kept in a separate place so that records can be restored after loss or damage.");
  b.card("DEFINITION", "Cloud storage", "Data held on a provider's servers and reached over the internet, usually for a fee.");
  b.card("FACT", "Advantages of cloud storage", "Off-site copies; automatic back-up; access from anywhere; easy sharing with an accountant.");
  b.card("FACT", "Disadvantages of cloud storage", "Needs internet; ongoing fees; depends on the provider; hacking risk with weak passwords.");
  b.card("FACT", "Advantages and disadvantages of storage devices", "Cheap, large and offline; but can fail, be lost or stolen, or carry viruses.");
  b.card("FACT", "Risks of unsafe storage", "Loss of data, unauthorised access, fraud, tax penalties, damage to reputation.");
  b.card("CONCEPT", "Sustainable storage", "Limit paper, energy and e-waste: print only what is needed, keep records only as long as required, recycle devices after wiping them.");
  b.card("CONCEPT", "Why keep accounting records for years?", "Evidence for tax and disputes, comparison over time, and knowing who owes and is owed.");
});

function r(v) {
  return Math.round(v * 100) / 100;
}
