// Slice W3b: farm records.
import { concept, P, mean, round, check, table, agricultureLevels } from "../lib.mjs";

// Num: cash book.
const cbOpen = 75, cbRec = [130, 48], cbPay = [110, 26];
const cbClose = cbOpen + cbRec[0] + cbRec[1] - cbPay[0] - cbPay[1];
check(cbClose === 117, "cash book");
// Num: labour cost 4 workers x 7 h x US$0.80.
const lab = round(4 * 7 * 0.8, 2);
check(Math.abs(lab - 22.4) < 1e-9, "labour");
// Structured: cash book with balances to complete.
const CB = [["1 June", "Opening balance", null, null], ["4 June", "Sale of cabbages", 66, null], ["9 June", "Seedlings", null, 18], ["15 June", "Sale of tomatoes", 54, null], ["20 June", "Fertiliser", null, 37]];
let bal = 140;
const balances = [140];
for (const [, , r, p] of CB.slice(1)) { bal += (r ?? 0) - (p ?? 0); balances.push(bal); }
check(balances.join() === "140,206,188,242,205", "cb balances");
const CB_TABLE = table(["Date", "Details", "Receipts (US\\$)", "Payments (US\\$)", "Balance (US\\$)"], CB.map(([d, t, r, p], i) => [d, t, r ?? "", p ?? "", i === 0 ? 140 : i === 4 ? "?" : balances[i]]));
// Structured: rabbit project weights.
const W = [1.9, 2.1, 2.0, 2.4, 2.1];
const wMean = mean(W);
check(Math.abs(wMean - 2.1) < 1e-9, "weights");
const W_TABLE = table(["Rabbit", "Mass at 12 weeks (kg)"], W.map((m, i) => [`R${i + 1}`, m.toFixed(1)]));

concept("agri.business.farm-records", { file: "business/farm-records", keyPrefix: "business.farm-records" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is a **financial** record?",
    options: [
      ["A cash book", "Correct: it records money received and paid."],
      ["A livestock register", "This records animals and events: a physical record."],
      ["A rainfall chart", "This records weather: a physical record."],
      ["A labour attendance list", "Days worked are physical; wages paid would be financial."],
    ],
    answer: "A",
    explanation: "Financial records deal with money: receipts, invoices, the cash book.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is a **physical** record?",
    options: [
      ["A record of eggs collected each day", "Correct: it records quantities, not money."],
      ["A receipt for feed bought", "Receipts are financial records."],
      ["An invoice from the seed supplier", "Invoices are financial records."],
      ["A record of money paid for vaccines", "Money paid is a financial record."],
    ],
    answer: "A",
    explanation: "Physical records record quantities, events and activities.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is a farm **inventory**?",
    options: [
      ["A list of everything the farm owns, with values", "Correct: assets on a given date."],
      ["A daily account of farm work and weather", "This is a farm diary."],
      ["A list of the money paid out each week", "This is part of the cash book."],
      ["A plan of next season's crops with their expected costs", "This is a budget or farm plan."],
    ],
    answer: "A",
    explanation: "An inventory lists land, buildings, machinery, livestock and stores with quantities and values on a date.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the main purpose of a farm **diary**?",
    options: [
      ["To record daily events and operations as they happen", "Correct."],
      ["To record the value of the farm's assets once a year", "This is an inventory."],
      ["To show whether an enterprise made a profit", "This is a profit and loss account."],
      ["To list the names of the farm's customers", "A diary is a record of events."],
    ],
    answer: "A",
    explanation: "A diary records weather, operations, problems and visitors with dates.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", daily: true,
    stem: "How do good records help a farmer obtain a loan?",
    options: [
      ["They show the lender the farm is well run and can repay", "Correct."],
      ["They replace the need for any security", "Lenders may still want security."],
      ["They let the farmer set the interest rate", "The lender sets the rate."],
      ["They prove to the lender that the farm has no costs at all", "Every farm has costs."],
    ],
    hints: ["What does a bank want to know before lending?"],
    answer: "A",
    explanation: "Records of production, income and costs give evidence of the farm's performance and ability to repay.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A dairy farmer's records show one cow's milk falling sharply over three days while the others are steady. What does this record most help the farmer to do?",
    options: [
      ["Notice a possible health problem early", "Correct: e.g. mastitis or another illness."],
      ["Calculate the value of the farm's land", "Milk records do not value land."],
      ["Pay the workers the right wages", "Labour records do that."],
      ["Decide the price of milk at market", "The farmer does not set market price from this."],
    ],
    answer: "A",
    hints: ["Why might only one cow drop?"],
    explanation: "Production records reveal changes quickly, so the cow can be examined and treated early.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A farmer wants to know which of two maize varieties paid better on her farm last season. Which records does she need?",
    options: [
      ["Crop records of yield, inputs and costs per field", "Correct: yield and cost for each variety."],
      ["The farm diary of rainfall and temperature only", "Rainfall alone cannot compare the varieties."],
      ["The inventory of farm machinery and buildings", "Machinery does not tell her the varieties' results."],
      ["The livestock register and vaccination record", "These are about animals."],
    ],
    answer: "A",
    hints: ["Paying better depends on output and costs."],
    explanation: "She needs each variety's yield and the inputs and costs used on it, then compares income minus costs.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The closing balance in a cash book is always the same as the profit of the farm.",
    answer: false,
    explanation: "False. The cash balance is money in hand; profit also depends on stock values and costs still owed.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each record with an entry that would be found in it.",
    pairs: [
      ["Livestock record", "Cow 14 served by the bull on 3 May"],
      ["Labour record", "Two workers, 8 hours, weeding field B"],
      ["Crop record", "Field A planted with sugar beans on 2 December"],
      ["Cash book", "Received US\\$40 for 20 trays of eggs"],
      ["Farm diary", "Hail storm damaged the vegetables in the afternoon"],
    ],
    explanation: "Each record has its own type of entry.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the formula in words.",
    template: "Closing balance = opening balance + {{blank:a}} − {{blank:b}}",
    blanks: [
      { id: "a", accepted: ["receipts", "money received", "income received", "cash received"] },
      { id: "b", accepted: ["payments", "money paid", "cash paid", "payments made", "expenditure"] },
    ],
    explanation: "Opening balance plus receipts minus payments.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the record that lists all the assets of a farm, with their quantities and values, on a given date.",
    accepted: ["inventory", "an inventory", "farm inventory", "stock list", "valuation"],
    keywords: { any: ["inventor"] },
    explanation: "An **inventory**.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A garden club's cash book starts the month with US\\$75. It receives US\\$130 and US\\$48 and pays out US\\$110 and US\\$26. Calculate the closing balance.",
    value: cbClose, prefix: "US$", wrong: [cbRec[0] + cbRec[1] - cbPay[0] - cbPay[1], cbOpen + cbRec[0] + cbRec[1]],
    explanation: `75 + 130 + 48 − 110 − 26 = US\\$${cbClose}. Leaving out the opening balance gives US\\$42.`,
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "A labour record shows 4 workers each working 7 hours harvesting tomatoes. Assume the wage is US\\$0.80 per hour. Calculate the labour cost of the job.",
    value: lab, prefix: "US$", answer: "22.40", wrong: [round(4 * 0.8, 2), round(7 * 0.8, 2)],
    hints: ["Total hours = workers × hours each."],
    explanation: `Total hours = 4 × 7 = 28; 28 × US\\$0.80 = US\\$${lab.toFixed(2)}.`,
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why a farmer should keep farm records.",
    hints: ["Give the reason, then how the record helps."],
    points: [
      "To measure performance / profit or loss of each enterprise.",
      "So the farmer can compare enterprises and choose the most profitable / plan and budget next season.",
      "To detect problems such as disease, poor feeding or theft early.",
      "Because a fall in production or a missing animal shows up in production and stock records / records also support loan applications.",
    ],
    modelAnswer: "Records show the output, costs and profit of each enterprise, so the farmer can compare them and plan the next season. They also reveal problems early: a fall in eggs or a missing animal shows up in the production and stock records, so disease, poor feeding or theft can be dealt with.",
    explanation: "Reason plus how it helps, twice.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Distinguish between physical and financial records.",
    points: [
      "Physical records record quantities, events and activities (e.g. eggs collected, planting dates, livestock register).",
      "Financial records record money received and paid (e.g. receipts, invoices, cash book).",
    ],
    modelAnswer: "Physical records show quantities and events, such as eggs collected or planting dates, while financial records show money received and paid out, such as receipts and the cash book.",
    explanation: "Quantities and events against money.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, marks: 8,
    stem: `Part of the cash book of a school vegetable project near Mutare is shown.\n\n${CB_TABLE}`,
    hints: ["Balance = previous balance + receipts − payments."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the balance on 20 June.",
        value: balances[4], prefix: "US$", wrong: [balances[3] + 37, balances[4] - 140],
        explanation: `242 − 37 = US\\$${balances[4]}.`,
      }),
      P.num({
        label: "(b)", marks: 1, stem: "Calculate the total receipts for the period (not including the opening balance).",
        value: 66 + 54, prefix: "US$", wrong: [66 + 54 + 140, 54],
        explanation: "66 + 54 = US\\$120.",
      }),
      P.mcq({
        label: "(c)", stem: "Which document should the project keep as proof of the US\\$37 paid for fertiliser?",
        options: [
          ["A receipt from the supplier", "Correct: proof of payment."],
          ["An entry in the farm diary", "A diary records events, not proof of payment."],
          ["The inventory of tools", "This lists assets."],
          ["A rainfall record", "Not related to payments."],
        ],
        answer: "A",
        explanation: "Receipts prove payments and support the cash book.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "The treasurer counts only US\\$185 in the cash box on 20 June. Suggest **two** possible reasons.",
        points: ["A payment was made but not recorded / a receipt was lost.", "Money was lost or stolen / an arithmetic or entry error was made."],
        explanation: "Unrecorded payments, loss, errors.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Name **two** physical records the project should also keep, and say what each would show.",
        points: ["Crop or production record: what was planted, when, and the yield of each vegetable.", "Diary / labour / input record: operations, work done, or seed and fertiliser used with dates."],
        explanation: "Physical records alongside the cash book.",
      }),
    ],
    explanation: "Complete a cash book and link financial and physical records.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 12,
    stem: `Form 2 pupils near Hwange keep five rabbits for a project. Their livestock record shows the masses at 12 weeks.\n\n${W_TABLE}`,
    hints: ["Mean = total ÷ number of rabbits.", "Think of what records the club needs to judge the project."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the mean mass of the rabbits at 12 weeks, in kg.",
        value: wMean, unit: "kg", tol: 0.05, answer: "2.1", wrong: [2.4, round(W.reduce((s, m) => s + m, 0), 1)],
        explanation: `(1.9 + 2.1 + 2.0 + 2.4 + 2.1) ÷ 5 = ${round(W.reduce((s, m) => s + m, 0), 1)} ÷ 5 = ${wMean.toFixed(1)} kg.`,
      }),
      P.short({
        label: "(b)", stem: "Which rabbit was heaviest?",
        accepted: ["R4", "rabbit R4", "r4", "rabbit 4"],
        explanation: "R4 at 2.4 kg.",
      }),
      P.mcq({
        label: "(c)", stem: "Which kind of record is the table of masses?",
        options: [
          ["A physical livestock record", "Correct: it records masses, not money."],
          ["A financial record of income", "No money is recorded."],
          ["An inventory valuation", "It does not value the animals."],
          ["A labour record", "It does not record work done."],
        ],
        answer: "A",
        explanation: "Masses are quantities: a physical livestock (production) record.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "List **three** other items the livestock record for each rabbit should contain.",
        points: ["Identity and date of birth / sex.", "Parents and breeding (mating dates, litter size).", "Health: vaccinations, treatments, illness and deaths / sale."],
        explanation: "Identity, breeding, health.",
      }),
      P.manual({
        label: "(e)", marks: 4, stem: "Explain how the pupils' records can be used to judge whether the project was successful.",
        points: [
          "Production records (masses, litters, deaths) show how well the rabbits grew and bred.",
          "Financial records (receipts, cash book) show income and costs.",
          "A profit and loss account can be prepared from these to show profit or loss.",
          "Comparing with targets or with last year shows what to improve (e.g. feeding, if growth is poor).",
        ],
        levels: agricultureLevels(4),
        explanation: "Physical and financial records together judge success.",
      }),
    ],
    explanation: "Use livestock records in a school project and explain how records judge success.",
  });

  b.card("DEFINITION", "Physical record", "Records quantities, events and activities: diary, inventory, crop, livestock, production and labour records.");
  b.card("DEFINITION", "Financial record", "Records money: receipts, invoices, cash book, petty cash.");
  b.card("DEFINITION", "Inventory", "List of all farm assets with quantities and values on a given date.");
  b.card("FORMULA", "Cash book balance", "Closing balance = opening balance + receipts − payments.");
  b.card("CONCEPT", "Why keep farm records?", "Measure performance, plan and budget, make decisions, detect problems and theft, obtain credit, legal and tax needs, breeding and health.");
  b.card("FACT", "What does a livestock record contain?", "Identity, birth date, parents, weights, services and births, vaccinations and treatments, deaths and sales.");
  b.card("FACT", "What does a crop record contain?", "Field, crop, variety, planting date, seed rate, fertiliser and chemicals with dates and rates, yield.");
  b.card("CONCEPT", "Qualities of good records", "Accurate, written at the time, simple, complete, consistent units, kept safely and up to date.");
});
