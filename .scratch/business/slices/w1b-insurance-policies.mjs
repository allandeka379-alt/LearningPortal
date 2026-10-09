// W1b: types of insurance policy for businesses.
import { concept, P } from "../lib.mjs";

concept("bus.insurance.insurance-policies", { file: "insurance/insurance-policies", keyPrefix: "insurance.insurance-policies" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which policy covers an employer against theft of money by a dishonest cashier?",
    options: [
      ["Fidelity guarantee", "Correct: fidelity guarantee covers losses from employees' dishonesty."],
      ["Public liability", "Public liability covers injury or damage to members of the public."],
      ["Goods in transit", "Goods in transit covers goods while being transported."],
      ["Employer's liability", "Employer's liability covers injury to employees at work."],
    ],
    answer: "A",
    explanation: "**Fidelity guarantee** insurance protects an employer against fraud or theft by employees.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A customer slips on a wet floor in a supermarket and is injured. Which policy covers the supermarket's liability?",
    options: [
      ["Public liability", "Correct: it covers injury to members of the public on the premises."],
      ["Employer's liability", "That covers employees, not customers."],
      ["Fidelity guarantee", "That covers employee dishonesty."],
      ["Burglary insurance", "That covers break-ins and theft."],
    ],
    answer: "A",
    explanation: "**Public liability** covers the business's legal liability to customers, visitors and passers-by.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which motor policy is the minimum required by law for vehicles used on public roads in Zimbabwe?",
    options: [
      ["Third party", "Correct: third-party cover protects other road users and is compulsory."],
      ["Comprehensive", "Comprehensive cover is wider but not the legal minimum."],
      ["Goods in transit", "This covers goods carried, not the vehicle's liability to others."],
      ["Fidelity guarantee", "This covers employee dishonesty."],
    ],
    answer: "A",
    explanation: "Third-party motor insurance covers the driver's liability for injury to others and damage to their property; it is the compulsory minimum.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which type of marine insurance covers the ship itself?",
    options: [
      ["Hull insurance", "Correct: hull insurance covers the vessel."],
      ["Cargo insurance", "Cargo insurance covers the goods on board."],
      ["Freight insurance", "Freight insurance covers the shipowner's loss of freight charges."],
      ["Fidelity guarantee", "This is not marine insurance."],
    ],
    answer: "A",
    explanation: "Marine insurance: **hull** (the ship), **cargo** (the goods), **freight** (the freight charges) and the shipowner's **liability**.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A factory is closed for three months after a fire. Which policy covers its lost profit and continuing expenses during the closure?",
    options: [
      ["Consequential loss (business interruption)", "Correct: it covers lost profit and standing costs after an insured event."],
      ["Public liability for injured visitors", "That covers injury to the public."],
      ["Goods in transit insurance on the stock", "That covers goods while transported."],
      ["Term assurance", "That is life assurance."],
    ],
    answer: "A",
    hints: ["The building damage is covered by fire insurance; what about lost profit?"],
    explanation: "A fire policy pays for physical damage; **consequential loss** cover pays for profit lost and expenses that continue while the business cannot trade.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A wholesaler delivers goods in its own lorries to shops all over Zimbabwe. Which pair of policies is most important for these deliveries?",
    options: [
      ["Motor insurance and goods in transit", "Correct: one covers the lorries and liability, the other the goods carried."],
      ["Marine cargo and hull insurance", "The goods travel by road, not by sea."],
      ["Fidelity guarantee and life assurance", "Neither covers the vehicles or the goods on the road."],
      ["Medical aid and funeral assurance", "These are personal covers, not delivery risks."],
    ],
    answer: "A",
    hints: ["Two things are at risk: the vehicle and the load."],
    explanation: "**Motor insurance** covers the lorries and liability to other road users; **goods in transit** covers the stock while it is carried.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Who does **cargo** insurance mainly protect?",
    options: [
      ["The owner of the goods being shipped", "Correct: cargo insurance covers the goods, so the importer or exporter is protected."],
      ["The ship's crew against injury", "Crew injuries are covered by employers' liability, not cargo insurance."],
      ["The port authority against damage to quays", "That is covered by the shipowner's liability insurance."],
      ["The shipowner against loss of the vessel", "That is hull insurance."],
    ],
    answer: "A",
    hints: ["Cargo means the goods carried."],
    explanation: "Cargo insurance protects the importer or exporter who owns the goods.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Employer's liability insurance covers injury to employees caused by their work.",
    answer: true,
    explanation: "True. It covers the employer's legal liability to workers injured or made ill by their work.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Fidelity guarantee insurance covers a shop against theft by burglars who break in at night.",
    answer: false,
    explanation: "False. Fidelity guarantee covers dishonesty by **employees**. Break-ins by outsiders are covered by burglary and theft insurance.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each risk with the policy that covers it.",
    pairs: [
      ["Daily takings robbed on the way to the bank", "Cash in transit"],
      ["Stock destroyed by a fire in the warehouse", "Fire insurance"],
      ["A worker's hand injured by a machine", "Employer's liability"],
      ["Imported goods lost when a ship sinks", "Marine cargo insurance"],
    ],
    explanation: "Match the risk to who or what is harmed: money in transit, property, employees, goods at sea.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentence.",
    template: "A motor policy that also covers accidental damage to the insured's own vehicle is called a {{blank:a}} policy.",
    blanks: [{ id: "a", accepted: ["comprehensive"], wrong: "third party" }],
    explanation: "**Comprehensive** cover adds damage to one's own vehicle to third-party, fire and theft cover.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the policy that covers a business against losses when credit customers fail to pay.",
    accepted: ["bad debts insurance", "bad debt insurance", "credit insurance", "bad debts", "trade credit insurance"],
    wrong: ["fidelity guarantee", "public liability"],
    explanation: "**Bad debts (credit) insurance** covers losses from customers who do not pay.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "UNDERSTANDING",
    stem: "Distinguish between public liability insurance and employer's liability insurance.",
    points: [
      "Public liability: covers injury or damage to members of the public.",
      "Example: customers, visitors or passers-by on the premises or affected by the business.",
      "Employer's liability: covers injury or illness of employees caused by their work.",
      "Example: a worker injured by a machine or a fall at work.",
    ],
    hints: ["Who is injured in each case?"],
    modelAnswer: "Public liability covers the business's liability to members of the public, such as a customer who slips in a shop. Employer's liability covers its liability to its own workers injured at work, such as a worker hurt by a machine.",
    explanation: "The difference is who is injured: the public or employees.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "EVALUATION",
    stem: "Explain **two** factors a business should consider when deciding which risks to insure.",
    points: [
      "Legal requirements, e.g. third-party motor cover is compulsory.",
      "So the business must buy it whatever the cost.",
      "Size and likelihood of the possible loss compared with the premium.",
      "Losses that could ruin the business should be insured even if unlikely; small losses may be borne.",
    ],
    hints: ["Think about the law and about how big a loss could be."],
    modelAnswer: "First, the law: third-party motor insurance is compulsory, so it must be bought. Second, the size and likelihood of the loss compared with the premium: a fire that could destroy the business should always be insured, while small, rare losses may be cheaper to bear.",
    explanation: "Other factors: nature of the business, cost of premiums, requirements of lenders.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, secs: 900,
    stem: "Tendai runs a hardware store in Chinhoyi. He employs eight workers, two of whom are cashiers. Customers walk freely around the store, and he delivers heavy goods to building sites in his own lorry. He banks the takings every afternoon.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Identify **four** insurance policies that Tendai should take out.",
        points: ["Fire insurance (building and stock).", "Public liability (customers in the store).", "Fidelity guarantee (cashiers).", "Motor insurance / goods in transit / cash in transit / burglary / employer's liability (any one more)."],
        modelAnswer: "Fire insurance, public liability, fidelity guarantee and cash in transit.",
      }),
      P.manual({
        label: "(b)", marks: 6,
        stem: "For **three** of the policies you identified, explain why Tendai needs it.",
        points: [
          "Policy 1 named with the risk in the case.",
          "Consequence avoided (e.g. fire would destroy stock and building, ending the business).",
          "Policy 2 named with the risk in the case.",
          "Consequence avoided (e.g. injured customer claims large compensation).",
          "Policy 3 named with the risk in the case.",
          "Consequence avoided (e.g. cashiers could steal takings; robbery on the way to the bank).",
        ],
        modelAnswer: "Fire insurance: the store holds a large stock of goods, and a fire could destroy the stock and building and end the business. Public liability: customers walk around among heavy goods and could be injured, and a claim for compensation could be very large. Fidelity guarantee: two cashiers handle cash every day, and the policy covers any money they steal.",
      }),
    ],
    hints: ["Look for each risk in the case: building, customers, cashiers, lorry, banking."],
    explanation: "Policies should match the case: fire (property), public liability (customers), fidelity guarantee (cashiers), motor and goods in transit (lorry and deliveries), cash in transit (banking), employer's liability (workers).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "Chipo exports dried fruit from Mutare to buyers overseas by road to a sea port and then by ship. Her business is small, and premiums take a large share of her profit. She is thinking of cancelling her marine cargo insurance to save money.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "State **two** risks that marine cargo insurance covers for Chipo.",
        points: ["Loss of the fruit if the ship sinks or cargo is lost overboard.", "Damage (e.g. by sea water) or theft of the cargo during the voyage / at the port."],
        modelAnswer: "Loss of the fruit if the ship sinks; damage to the fruit by sea water during the voyage.",
      }),
      P.manual({
        label: "(b)", marks: 8,
        stem: "Evaluate whether Chipo should cancel her marine cargo insurance.",
        points: [
          "Saves premiums, raising profit in years without loss.",
          "But a single lost consignment could cost far more than years of premiums.",
          "A small business may not survive such a loss.",
          "Buyers and banks financing exports may require insurance.",
          "Losses at sea, though rare, are large and outside her control.",
          "Alternatives: compare insurers via a broker, insure only the sea leg, increase the excess.",
          "Weighs the saving against the risk.",
          "Justified recommendation.",
        ],
        modelAnswer: "Cancelling would save the premium and raise Chipo's profit in years without a loss. But losses at sea, though rare, are large and outside her control: one lost consignment could cost more than many years of premiums, and a small business might not survive it. Her buyers or her bank may also require cargo insurance. Instead of cancelling, she could ask a broker to find cheaper cover or accept a higher excess. She should keep the insurance, because the possible loss is too large for a small business to bear.",
      }),
    ],
    hints: ["(b) Compare the size of the premium with the size of a possible loss."],
    explanation: "Insure risks whose losses would ruin the business, even if they are unlikely; reduce premiums in other ways rather than going uninsured.",
  });
  b.card("DEFINITION", "**Fidelity guarantee** insurance?", "Covers an employer against loss caused by the dishonesty of employees.");
  b.card("DEFINITION", "**Public liability** insurance?", "Covers a business's liability for injury or damage to members of the public.");
  b.card("DEFINITION", "**Employer's liability** insurance?", "Covers an employer's liability for injury or illness of employees caused by their work.");
  b.card("FACT", "Three kinds of motor policy?", "Third party (legal minimum); third party, fire and theft; comprehensive.");
  b.card("FACT", "Four kinds of marine insurance?", "Hull (ship), cargo (goods), freight (freight charges), shipowner's liability.");
  b.card("DEFINITION", "**Goods in transit** insurance?", "Covers goods while carried by road, rail or air against theft, accident and damage.");
  b.card("DEFINITION", "**Consequential loss** insurance?", "Covers lost profit and continuing expenses while a business is closed after an insured event such as a fire.");
  b.card("FACT", "Factors in deciding which risks to insure?", "Legal requirements, size and likelihood of loss, premium cost, nature of the business, lenders' requirements.");
  b.card("DEFINITION", "**Cash in transit** insurance?", "Covers money carried to or from the bank against robbery.");
});
