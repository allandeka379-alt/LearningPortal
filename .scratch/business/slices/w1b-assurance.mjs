// W1b: assurance policies, medical aid, NSSA and export credit guarantee insurance.
import { concept, P } from "../lib.mjs";

concept("bus.insurance.assurance-social-security", { file: "insurance/assurance-social-security", keyPrefix: "insurance.assurance-social-security" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which assurance policy pays only if the assured dies within a fixed period?",
    options: [
      ["Term assurance", "Correct: nothing is paid if the assured survives the term."],
      ["Endowment assurance", "Endowment pays at the end of the term or on earlier death."],
      ["Whole life assurance", "Whole life pays on death whenever it happens."],
      ["Medical aid", "Medical aid pays medical bills, not a death benefit."],
    ],
    answer: "A",
    explanation: "**Term assurance** covers a fixed term only; it is the cheapest because it has no saving element.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which policy combines life cover with saving and pays a lump sum at the end of an agreed period?",
    options: [
      ["Endowment assurance", "Correct: it pays at maturity, or earlier to beneficiaries if the assured dies."],
      ["Term assurance", "Term assurance pays nothing if the assured survives."],
      ["Funeral assurance", "Funeral assurance pays funeral costs on death."],
      ["Public liability", "Public liability is a business insurance policy."],
    ],
    answer: "A",
    explanation: "**Endowment assurance** is used to save for school fees, a house or retirement while protecting dependants.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why was the National Social Security Authority (NSSA) formed?",
    options: [
      ["To provide social security for all employees", "Correct: pensions and compensation for workers, funded by compulsory contributions."],
      ["To sell car insurance to the public", "NSSA is not a motor insurer."],
      ["To guarantee bank deposits", "NSSA does not guarantee bank deposits."],
      ["To insure exporters against bad debts", "That is the role of export credit guarantee insurance."],
    ],
    answer: "A",
    explanation: "NSSA was set up to give all employees, not only those with private pension schemes, protection against loss of income in old age, invalidity, injury at work and death.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Who pays contributions to NSSA?",
    options: [
      ["Employers and employees", "Correct: both make compulsory contributions from wages."],
      ["Only the government", "Contributions come from employers and employees."],
      ["Only self-chosen volunteers", "Contributions are compulsory for employees and employers."],
      ["Only retired workers", "Retired workers receive pensions; contributions are made during employment."],
    ],
    answer: "A",
    explanation: "NSSA schemes are funded by **compulsory contributions** from employers and employees.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A Zimbabwean exporter sells machinery on credit to a buyer abroad and fears the buyer may never pay. Which cover is designed for this risk?",
    options: [
      ["Export credit guarantee insurance", "Correct: it covers commercial and political risks of non-payment by foreign buyers."],
      ["Marine cargo insurance", "Cargo insurance covers loss or damage to the goods, not non-payment."],
      ["Fidelity guarantee", "Fidelity guarantee covers dishonest employees."],
      ["Endowment assurance", "Endowment is life assurance with saving."],
    ],
    answer: "A",
    hints: ["The goods are fine; the problem is payment."],
    explanation: "**Export credit guarantee insurance** protects exporters when foreign buyers do not pay, because of insolvency, refusal or political events.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which is a **political** risk covered by export credit insurance?",
    options: [
      ["The buyer's government stops money being sent abroad", "Correct: government action in the buyer's country is a political risk."],
      ["The buyer goes bankrupt", "Insolvency of the buyer is a commercial risk."],
      ["The goods are damaged by sea water on the voyage", "That is a marine cargo risk."],
      ["An employee of the exporter steals the export documents", "That is employee dishonesty."],
    ],
    answer: "A",
    hints: ["Political risks come from governments and wars, not from the buyer's own business."],
    explanation: "Commercial risks come from the buyer (insolvency, refusal to pay); political risks from governments and events (war, restrictions on sending money).",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Farai takes a bank loan for 8 years and wants the cheapest cover that will repay the loan if he dies before it is cleared. Which policy should he choose?",
    options: [
      ["Term assurance for 8 years", "Correct: cheap cover for the life of the loan only."],
      ["Whole life assurance", "Whole life lasts for life and costs more than he needs."],
      ["Endowment assurance", "Endowment includes saving, so its premiums are highest."],
      ["Medical aid", "Medical aid pays medical bills, not a sum on death."],
    ],
    answer: "A",
    hints: ["He needs cover only while the loan exists."],
    explanation: "Term assurance has no saving element, so it is the cheapest way to cover a fixed period such as a loan.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Medical aid societies pay all or part of their members' medical bills in return for monthly contributions.",
    answer: true,
    explanation: "True. Cover depends on the plan chosen.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A whole life policy pays out only if the assured dies before the age of 60.",
    answer: false,
    explanation: "False. Whole life pays on death **whenever** it happens. A policy limited to a period is term assurance.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each policy with when it pays.",
    pairs: [
      ["Whole life", "On death, whenever it happens"],
      ["Endowment", "At the end of the term, or on earlier death"],
      ["Term", "Only on death within the term"],
      ["Funeral", "On the death of a covered family member, towards funeral costs"],
    ],
    explanation: "When the policy pays is the key difference between assurance policies.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentence.",
    template: "The amount paid to a policyholder who cancels a whole life or endowment policy early is called its {{blank:a}} value.",
    blanks: [{ id: "a", accepted: ["surrender"], wrong: "market" }],
    explanation: "The **surrender value** is usually less than the premiums paid.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the term for the person named in a life policy to receive the sum assured.",
    accepted: ["beneficiary", "the beneficiary", "beneficiaries", "nominee"],
    wrong: ["insurer", "broker"],
    explanation: "The **beneficiary** receives the sum assured, for example the assured's spouse or children.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "UNDERSTANDING",
    stem: "Describe **four** benefits that NSSA provides to workers and their families.",
    points: [
      "Retirement (old age) pension.",
      "Invalidity pension for workers unable to work.",
      "Survivors' benefits to the spouse and children of a member who dies / funeral grant.",
      "Workers' compensation for injury or disease caused by work / accident prevention.",
    ],
    hints: ["Think about old age, illness, death and injury at work."],
    modelAnswer: "A retirement pension in old age; an invalidity pension for a worker who can no longer work; survivors' pensions and a funeral grant when a member dies; and compensation for injuries or diseases caused by work.",
    explanation: "NSSA provides pensions and workers' compensation, and promotes safety at work.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "ANALYSIS",
    stem: "Explain **two** benefits of assurance to the economy as a whole.",
    points: [
      "Assurers invest premiums in shares, property and government securities.",
      "So businesses and government get capital for investment.",
      "Families are protected from poverty after a death.",
      "So fewer people depend on the state or relatives; encourages saving.",
    ],
    hints: ["What do assurers do with the premiums they collect?"],
    modelAnswer: "Assurance companies invest the premiums they collect in shares, property and government stock, which provides capital for businesses and government projects. Assurance also protects families from poverty when a breadwinner dies, so fewer people need help from the state.",
    explanation: "Assurance mobilises savings for investment and provides social protection.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 840,
    stem: "Nyasha, aged 32, is a nurse in Bulawayo with two children aged 4 and 7. She wants to protect her children if she dies, and to have money for their university fees in about 12 years.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which single policy best meets both of Nyasha's aims?",
        options: [["A 12-year endowment policy", "Correct: it pays at maturity for fees, or earlier if she dies."], ["A 12-year term policy", "Term pays only on death, so there is no lump sum for fees if she lives."], ["Fidelity guarantee", "This covers employee dishonesty."], ["Public liability", "This is a business liability policy."]],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain how the policy you chose meets each of her aims.",
        points: [
          "If she survives 12 years, the policy matures and pays a lump sum.",
          "Which can pay the university fees.",
          "If she dies before then, the sum assured is paid to her beneficiaries.",
          "So the children are protected.",
        ],
        modelAnswer: "If Nyasha lives for 12 years, the endowment matures and pays a lump sum that she can use for university fees. If she dies sooner, the sum assured is paid to her children as beneficiaries, so they are protected.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Nyasha's friend says she would do better to buy cheap term assurance and save the difference in a bank. Discuss this advice.",
        points: [
          "Term assurance gives the same death cover for much lower premiums.",
          "The difference could be saved or invested; she controls her savings and can withdraw them.",
          "But she must have the discipline to save regularly.",
          "Bank interest may be low / savings may lose value to inflation; endowment may earn bonuses.",
          "Endowment surrender value is low if she stops early; term pays nothing if she survives.",
          "Justified conclusion.",
        ],
        modelAnswer: "Term assurance would protect her children if she died for much lower premiums, and she could save the difference in a bank, where she controls the money and can withdraw it in an emergency. However, this needs discipline: she may be tempted to spend the savings, and bank interest may be low compared with the bonuses on a with-profits endowment. On the other hand, an endowment gives a poor surrender value if she has to stop early. If Nyasha is a disciplined saver, the friend's advice is sensible; if not, the endowment's compulsory saving is safer.",
      }),
    ],
    hints: ["(a) She wants both protection and a lump sum.", "(c) Compare cost, discipline and flexibility."],
    explanation: "(a) Endowment. (b) Maturity value for fees; death benefit for the children. (c) 'Buy term and save the rest' is cheaper and flexible but depends on saving discipline.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "Sipho's company in Harare makes leather bags. A buyer in another country has offered a large order, but wants 120 days' credit. Sipho's bank will lend him money to buy materials only if the sale is insured.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Explain **two** risks Sipho faces in selling on credit to a foreign buyer.",
        points: [
          "Commercial risk: buyer becomes insolvent or refuses to pay.",
          "Sipho would lose the value of the goods and could not repay his loan.",
          "Political risk: war or government restrictions stop payment reaching Zimbabwe.",
          "Payment delayed or lost, causing cash-flow problems.",
        ],
        modelAnswer: "The buyer might go out of business or simply refuse to pay, so Sipho would lose the value of the bags and still owe the bank. Government action or unrest in the buyer's country could also stop the money being sent to Zimbabwe, leaving Sipho short of cash.",
      }),
      P.manual({
        label: "(b)", marks: 6,
        stem: "Evaluate whether Sipho should take out export credit guarantee insurance for this order.",
        points: [
          "Covers commercial and political risks of non-payment.",
          "Allows him to offer the 120 days' credit and win the large order.",
          "Bank will lend only if the sale is insured: makes the order possible.",
          "Cost: premium reduces profit on the order.",
          "Cover may not be 100% of the value / conditions apply.",
          "Justified conclusion.",
        ],
        modelAnswer: "Export credit insurance would protect Sipho if the buyer failed to pay, whether for commercial or political reasons, and it would let him offer the long credit the buyer wants. Most importantly, his bank will lend only if the sale is insured, so without it he could not take the order at all. The premium reduces his profit, and the cover may not pay the full value. Because the order is large and a bad debt could ruin a small company, he should take out the insurance and include its cost in his price.",
      }),
    ],
    hints: ["(b) What happens to the order if he cannot borrow?"],
    explanation: "Export credit guarantee insurance covers non-payment by foreign buyers and makes banks willing to finance exports.",
  });
  b.card("DEFINITION", "**Whole life** assurance?", "Premiums for life; the sum assured is paid on death whenever it happens.");
  b.card("DEFINITION", "**Endowment** assurance?", "Pays the sum assured at the end of a fixed term, or earlier on death; combines protection and saving.");
  b.card("DEFINITION", "**Term** assurance?", "Pays only if the assured dies within a fixed term; cheapest, no saving element.");
  b.card("DEFINITION", "**Funeral** assurance?", "Pays a fixed sum or provides funeral services on the death of a covered person.");
  b.card("FACT", "Benefits of assurance?", "Protects dependants, encourages saving, security for loans, retirement income, covers funeral and medical costs, invests in the economy.");
  b.card("FACT", "Why was NSSA formed?", "To give all employees social security: pensions in old age, invalidity cover, compensation for injury at work and support for families after death.");
  b.card("FACT", "What does NSSA provide?", "Retirement, invalidity and survivors' pensions; funeral grant; workers' compensation; accident prevention.");
  b.card("DEFINITION", "**Export credit guarantee** insurance?", "Protects exporters against non-payment by foreign buyers for commercial and political reasons.");
  b.card("CONCEPT", "Commercial versus political risks in exporting?", "Commercial: buyer insolvent or refuses to pay. Political: war, government restrictions on payments.");
});
