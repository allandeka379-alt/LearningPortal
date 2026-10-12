// Slice w3a: acs.enterprise.e-business (ZIMSEC only, Form 5). Money in US dollars; calculators are allowed.
import { concept, P, chk, same, mdTable } from "../lib.mjs";
import { mc, pm } from "../tables/w3a-q.mjs";

// Break-even for the questions: price 15, variable cost 9, fixed costs 420 a month
const price = 15;
const vc = 9;
const fixed = 420;
const contrib = price - vc;
const be = fixed / contrib;
chk(be, 70);
const profit100 = 100 * contrib - fixed;
chk(profit100, 180);
const profit40 = 40 * contrib - fixed;
chk(profit40, -180);
// Second business: price 20, variable 12, fixed 480 -> break-even 60? use different: fixed 640 -> 80
const be2 = 640 / (20 - 12);
chk(be2, 80);
// Cash flow
const cfIn = [900, 650, 1100];
const cfOut = [720, 810, 950];
let cash = 560;
const cfRows = cfIn.map((i, k) => {
  const open = cash;
  cash = open + i - cfOut[k];
  return { m: ["April", "May", "June"][k], open, in: i, out: cfOut[k], net: i - cfOut[k], close: cash };
});
same(cfRows.map((r) => r.close), [740, 580, 730]);
const cfMd = mdTable(["Month", "Opening cash", "Cash in", "Cash out", "Closing cash"], cfRows.map((r) => [r.m, `US\\$${r.open}`, `US\\$${r.in}`, `US\\$${r.out}`, "?"]));
// Mobile money fee 2% of 45
const fee = Math.round(45 * 2) / 100;
chk(fee, 0.9);
const fee2 = Math.round(130 * 2) / 100;
chk(fee2, 2.6);

concept("acs.enterprise.e-business", { file: "enterprise/e-business", keyPrefix: "enterprise.e-business" }, (b) => {
  mc(b, 1, "RECALL", "What does B2B stand for?",
    ["Business to business", "Correct."],
    [["Bank to bank", "B2B is a model of selling, not a banking term."], ["Buyer to buyer", "That would be C2C, one consumer selling to another."], ["Browser to browser software", "B2B is not about web browsers."]],
    "B2B is selling from one business to another.");
  mc(b, 2, "APPLICATION", "A supplier sells computer parts to repair shops through its web site. Which e-commerce model is this?",
    ["B2B", "Correct: a business sells to businesses."],
    [["B2C", "B2C sells to individual consumers."], ["C2C", "C2C is between two individuals."], ["E-learning", "E-learning is not a selling model."]],
    "Selling to businesses is B2B.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What is the difference between e-business and e-commerce?",
    ["E-commerce is the buying and selling part of e-business, which covers all business activities done electronically", "Correct."],
    [["They mean exactly the same thing", "E-business is wider."], ["E-commerce covers only the paying of staff and the keeping of the accounts of a business", "E-commerce is about buying and selling."], ["E-business needs no internet at all", "E-business uses electronic networks."]],
    "E-commerce is one part of e-business.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which is a benefit of e-commerce to a small business?",
    ["It can reach customers in other towns without opening shops there", "Correct."],
    [["It removes the need for any delivery", "Goods still have to be delivered."], ["It makes all customers trust the business", "Trust has to be earned."], ["It works even when there is no electricity or mobile network at all", "It depends on both."]],
    "Wider market with low cost.", { daily: true });
  mc(b, 3, "ANALYSIS", "A seller receives a message that says a customer has paid by mobile money, but she has not received a confirmation from the mobile money service. What should she do?",
    ["Wait until the payment is confirmed by the service before sending the goods", "Correct."],
    [["Send the goods at once, because the message says that the customer has paid", "The message may be a fake."], ["Ask the customer to send the PIN", "Never ask for a PIN."], ["Delete the order and the customer's details", "This does not solve the problem."]],
    "Always check a payment with the payment service.", { hints: ["Where should the proof of payment come from?"] });
  mc(b, 3, "UNDERSTANDING", "In a business, which of these is a fixed cost?",
    ["Monthly rent for a work space", "Correct: it does not change with the number of items sold."],
    [["The cloth used for each item made", "Materials change with the number of items."], ["Delivery paid for each item sold", "Delivery changes with the number of items."], ["A commission paid on each sale", "Commission changes with sales."]],
    "Fixed costs stay the same whatever the number of units sold.", { hints: ["Does the cost change if more units are sold?"] });
  mc(b, 3, "ANALYSIS", "A business has a profit on paper for the month but runs out of money to pay its supplier. What is the most likely cause?",
    ["Customers bought on credit and have not yet paid, so cash has not come in", "Correct: profit and cash flow are different."],
    [["Revenue is always equal to cash flow", "They can differ."], ["Fixed costs are always zero", "Fixed costs are not zero."], ["Break-even has been reached, so cash can never run out of money in the business", "Reaching break-even does not guarantee cash."]],
    "Profit is not the same as cash.", { hints: ["When does the cash arrive?"] });
  mc(b, 4, "EVALUATION", "Which advice is best for a small online seller who is worried about fraud?",
    ["Confirm payments through the payment service, use secure checkout and never ask for PINs or card numbers in chat", "Correct."],
    [["Accept screenshots of payments as proof", "Screenshots can be faked."], ["Ask customers to send their card details and PINs by message so that payments can be checked", "This puts their data at risk."], ["Only sell to people who ask politely", "Politeness does not prove payment."]],
    "Verify payments with the service and keep details safe.", { hints: ["Where does reliable proof of payment come from?"] });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A business that has reached its break-even point makes neither a profit nor a loss.", answer: true, explanation: "True. At break-even, revenue equals total costs." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term to its meaning.",
    pairs: [["Revenue", "Money received from sales"], ["Fixed cost", "A cost that stays the same whatever the number of units sold"], ["Variable cost", "A cost that changes with the number of units sold"], ["Profit", "Revenue minus all costs"], ["Cash flow", "The movement of money into and out of a business"]],
    explanation: "Basic financial terms." });
  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences about e-commerce.", hints: ["Think about who sells to whom."],
    template: "A business selling to individual customers is {{blank:a}}. An individual selling a used phone to another individual is {{blank:b}}. Paying with a phone account is called {{blank:c}} money.",
    blanks: [
      { id: "a", accepted: ["B2C"], choices: ["B2C", "B2B", "C2C", "G2G"] },
      { id: "b", accepted: ["C2C"], choices: ["C2C", "B2B", "B2C", "B2G"] },
      { id: "c", accepted: ["mobile"], choices: ["mobile", "paper", "barter", "cheque"] },
    ], explanation: "B2C, C2C, mobile money." });
  b.short({ d: 2, skill: "RECALL", stem: "Name the cost that stays the same however many units are sold, such as monthly rent.",
    accepted: ["fixed cost", "fixed costs", "a fixed cost", "fixed"], normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["variable cost"], explanation: "A fixed cost." });
  b.num({ d: 3, skill: "APPLICATION", unit: "US$", hints: ["Contribution = price − variable cost, profit = units × contribution − fixed costs."],
    stem: `A seller sells an item for US\\$${price}. The variable cost of each item is US\\$${vc} and the fixed costs are US\\$${fixed} a month. Calculate the profit when 100 items are sold.`,
    value: profit100, wrong: [100 * price - fixed, 600], workedSolution: `1. Contribution = ${price} − ${vc} = US\\$${contrib}.\n2. Profit = 100 × ${contrib} − ${fixed} = ${100 * contrib} − ${fixed} = US\\$${profit100}.`, explanation: `100 × ${contrib} − ${fixed} = ${profit100}.` });
  b.num({ d: 3, skill: "APPLICATION", hints: ["Break-even units = fixed costs ÷ contribution per unit."],
    stem: `For the same item (price US\\$${price}, variable cost US\\$${vc}, fixed costs US\\$${fixed} a month), calculate the number of items that must be sold to break even.`,
    value: be, wrong: [fixed / price, fixed / vc], workedSolution: `1. Contribution = ${price} − ${vc} = ${contrib}.\n2. Break-even = ${fixed} ÷ ${contrib} = ${be} items.`, explanation: `${fixed} ÷ ${contrib} = ${be}.` });
  b.num({ d: 3, skill: "APPLICATION", unit: "US$", hints: ["Fee = amount × 2 ÷ 100."],
    stem: "A mobile money agent charges 2% of the amount sent. A customer sends US\\$45 to a supplier. Calculate the fee, in US dollars.",
    value: fee, wrong: [2, 9], workedSolution: "1. 45 × 2 ÷ 100 = US\\$0.90.", explanation: "2% of 45 = 0.90." });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3, hints: ["Name the model and describe who sells to whom."],
    stem: "Describe the e-commerce models B2C and B2B, with an example of each. [3]",
    points: ["B2C: a business sells to individual consumers", "B2B: a business sells to other businesses", "An example of each, such as an online clothes shop (B2C) and a supplier of computer parts to repair shops (B2B)"],
    modelAnswer: "B2C is when a business sells to individual consumers, for example an online clothes shop. B2B is when a business sells to other businesses, for example a supplier of computer parts to repair shops.",
    explanation: "Two models with examples." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Two benefits and two risks, each linked to a small business."],
    stem: "Explain two benefits and two risks of e-commerce for a small business. [4]",
    points: ["Benefit: a wider market, because customers in other towns can be reached", "Benefit: lower costs, because no expensive shop or large staff is needed", "Risk: fraud or fake payments, so payments must be checked", "Risk: dependence on the internet, mobile network and electricity, or problems with delivery"],
    modelAnswer: "It gives a wider market because customers in other towns can be reached, and it lowers costs because no expensive shop or large staff is needed. The risks are fraud or fake payments, and dependence on the internet, mobile network and electricity or problems with delivery.",
    explanation: "Two benefits and two risks." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Mobile money, cards, bank transfer, cash on delivery."],
    stem: "Compare mobile money and card payments for a small online shop in Zimbabwe. [4]",
    points: ["Mobile money needs no bank account and is widely used by customers", "Mobile money may charge fees and needs the network to be working", "Card payments suit customers who have bank accounts and give a secure online checkout through a gateway", "Fewer customers have cards, and the seller must use a secure gateway and trust it"],
    modelAnswer: "Mobile money needs no bank account and is widely used, but fees may apply and the network must be working. Card payments suit customers with bank accounts and use a secure gateway, but fewer customers have cards.",
    explanation: "Strengths and weaknesses of both." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 4, hints: ["Explain how cash flow can differ from profit."],
    stem: "Explain why a business can make a profit in a month and still have a cash problem. [4]",
    points: ["Profit is revenue minus costs, counting sales even if customers have not yet paid", "Cash flow records only the money that has actually come in and gone out", "Customers who pay late mean that cash comes in later than the sale", "Stock bought in advance or bills that are due early take cash out before it comes in, so cash can run out"],
    modelAnswer: "Profit counts sales even if customers have not paid, while cash flow records only the money that has come in and gone out. If customers pay late, or stock and bills must be paid before the sales money arrives, the business can run out of cash although it makes a profit.",
    explanation: "Timing of cash." });
  b.struct({ d: 4, skill: "APPLICATION", examStyle: true, hints: ["Break-even = fixed ÷ (price − variable cost)."],
    explanation: "Contribution US\\$8, break-even 80 items.",
    stem: "A web designer in Bulawayo sells a website template for US\\$20. Each template costs US\\$12 to customise and send. Her fixed costs are US\\$640 a month.",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the contribution from selling one template, in US dollars.", unit: "US$", value: 8, wrong: [20, 12], workedSolution: "1. 20 − 12 = US\\$8.", explanation: "20 − 12 = 8." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the break-even number of templates sold in a month.", value: be2, wrong: [32, 640 / 12], workedSolution: "1. 640 ÷ 8 = 80 templates.", explanation: "640 ÷ 8 = 80." }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the profit when 110 templates are sold in a month.", unit: "US$", value: 110 * 8 - 640, wrong: [110 * 20 - 640, 880], workedSolution: "1. Contribution = 110 × 8 = US\\$880.\n2. Profit = 880 − 640 = US\\$240.", explanation: "880 − 640 = 240." }),
      P.manual({ label: "(d)", marks: 3, stem: "Suggest three ways in which she could lower her break-even point.", points: ["Increase the price of a template (if customers will still buy)", "Lower the variable cost of each template, for example by using ready-made parts", "Lower the fixed costs, for example by working from home or choosing a cheaper internet plan"], modelAnswer: "Increase the price if customers will still buy, lower the variable cost of each template, and lower the fixed costs, for example by working from home.", explanation: "Higher contribution or lower fixed costs." }),
    ] });
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Closing cash = opening cash + cash in − cash out."],
    explanation: `Closing cash is US\\$${cfRows[0].close} in April, US\\$${cfRows[1].close} in May and US\\$${cfRows[2].close} in June.`,
    stem: `A small online shop starts April with US\\$560 in cash. Its cash in and cash out for three months are shown.\n\n${cfMd}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the closing cash for April, in US dollars.", unit: "US$", value: cfRows[0].close, wrong: [cfRows[0].open, cfRows[0].in], workedSolution: `1. ${cfRows[0].open} + ${cfRows[0].in} − ${cfRows[0].out} = US\\$${cfRows[0].close}.`, explanation: `${cfRows[0].open} + ${cfRows[0].in} − ${cfRows[0].out} = ${cfRows[0].close}.` }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the closing cash for May, in US dollars.", unit: "US$", value: cfRows[1].close, wrong: [cfRows[1].open, cfRows[1].in], workedSolution: `1. ${cfRows[1].open} + ${cfRows[1].in} − ${cfRows[1].out} = US\\$${cfRows[1].close}.`, explanation: `${cfRows[1].open} + ${cfRows[1].in} − ${cfRows[1].out} = ${cfRows[1].close}.` }),
      P.num({ label: "(c)", marks: 1, stem: "Calculate the closing cash for June, in US dollars.", unit: "US$", value: cfRows[2].close, wrong: [cfRows[2].open, cfRows[2].in], workedSolution: `1. ${cfRows[2].open} + ${cfRows[2].in} − ${cfRows[2].out} = US\\$${cfRows[2].close}.`, explanation: `${cfRows[2].open} + ${cfRows[2].in} − ${cfRows[2].out} = ${cfRows[2].close}.` }),
      P.manual({ label: "(d)", marks: 3, stem: "Cash fell during May. Suggest three actions the owner could take to improve cash flow.", points: ["Ask customers for part or full payment before the goods are sent", "Delay or reduce spending on stock and other costs that are not urgent", "Negotiate longer payment terms with suppliers or keep a cash reserve"], modelAnswer: "Ask customers to pay before the goods are sent, delay or reduce spending that is not urgent, and negotiate longer payment terms with suppliers.", explanation: "Cash in earlier, cash out later." }),
    ] });
  b.struct({ d: 3, skill: "ANALYSIS", examStyle: true, hints: ["Match the model to who sells to whom."],
    explanation: "Selling to individuals is B2C and selling to businesses is B2B; mobile money suits small payments.",
    stem: "A farm shop near Masvingo plans to sell eggs online. It will sell small trays to households and large crates to restaurants and a hotel.",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name the model used when selling trays to households.", accepted: ["B2C", "business to consumer"], normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["B2B"], explanation: "A business selling to individuals is B2C." }),
      P.short({ label: "(b)", marks: 1, stem: "Name the model used when selling crates to restaurants.", accepted: ["B2B", "business to business"], normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["C2C"], explanation: "Selling to businesses is B2B." }),
      P.manual({ label: "(c)", marks: 2, stem: "Suggest a suitable payment method for households and justify it.", points: ["Mobile money", "It needs no bank account, is widely used and suits small payments"], modelAnswer: "Mobile money, because it needs no bank account, is widely used and suits small payments.", explanation: "Mobile money." }),
      P.manual({ label: "(d)", marks: 2, stem: "State two risks to the shop of selling eggs online.", points: ["Eggs may break or go bad during delivery", "Fake payments or customers who do not pay"], modelAnswer: "Eggs may break or go bad during delivery, and some payments may be fake or customers may not pay.", explanation: "Delivery and payment risks." }),
    ] });
  b.card("DEFINITION", "E-business and e-commerce", "E-business: all business activities done electronically. E-commerce: buying and selling over the internet or other networks; one part of e-business.");
  b.card("CONCEPT", "E-commerce models", "B2C: business to consumer. B2B: business to business. C2C: consumer to consumer.");
  b.card("CONCEPT", "Payment systems", "Mobile money, cards through a secure gateway, bank transfer and cash on delivery; confirm payments with the service and never ask for PINs.");
  b.card("FORMULA", "Profit", "Profit = revenue − (fixed costs + variable costs); revenue = price × units sold.");
  b.card("FORMULA", "Break-even units", "Break-even = fixed costs ÷ (price − variable cost per unit).");
  b.card("FORMULA", "Closing cash", "Closing cash = opening cash + cash in − cash out; it becomes the next month's opening cash.");
  b.card("CONCEPT", "Profit against cash flow", "A business can have a profit on paper but little cash if customers pay late or stock must be paid for first.");
  b.card("CONCEPT", "Benefits and risks of e-commerce", "Benefits: wider market, lower costs, records. Risks: fraud, delivery problems, dependence on networks and power, data protection.");
});
