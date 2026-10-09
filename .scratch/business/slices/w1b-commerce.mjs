// W1b exam-format items, ZIMSEC Commerce: Paper 2 Section A (7 marks) and Section B essays (20 marks).
// Mark splits of essay parts are ours (the syllabus does not print them).
import { concept, P, COM, money, check } from "../lib.mjs";

const L8 = [
  [3, 6, 8, "Well-developed explanation of a range of relevant points, applied with examples."],
  [2, 3, 5, "Some explanation of relevant points; limited development or examples."],
  [1, 1, 2, "Points identified or listed with little or no explanation."],
];
const L10 = [
  [3, 8, 10, "A range of relevant points, each explained and illustrated with examples."],
  [2, 4, 7, "Relevant points with some explanation; development uneven."],
  [1, 1, 3, "Points listed or described with little explanation."],
];
const L12 = [
  [3, 9, 12, "Balanced discussion of both sides, developed with examples, and a justified conclusion."],
  [2, 5, 8, "Some discussion, mostly one-sided or not fully developed; weak or unsupported conclusion."],
  [1, 1, 4, "Simple points with little explanation and no judgement."],
];

// 7-mark structured: contribution.
const ins1 = 18000;
const ins2 = 27000;
const loss7 = 9000;
const share1 = (ins1 / (ins1 + ins2)) * loss7; // 3600
const share2 = (ins2 / (ins1 + ins2)) * loss7; // 5400
check("7-mark contribution", share1 + share2, loss7);

concept("bus.insurance.principles", { file: "exam/w1b-commerce", keyPrefix: "exam.w1b-commerce", applies: COM }, (b) => {
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 480, paper: "Paper 2", calculator: true,
    concepts: ["bus.insurance.principles"],
    stem: `Thandeka owns a clothing shop in Gweru. She insured her stock against burglary with Insurer A for ${money(ins1)} and with Insurer B for ${money(ins2)}. Burglars stole stock worth ${money(loss7)}. Two weeks later the police recovered some of the stolen clothes.`,
    parts: [
      P.short({
        label: "(a)", marks: 1,
        stem: "State the principle of insurance that requires the two insurers to share Thandeka's loss.",
        accepted: ["contribution", "principle of contribution", "the principle of contribution"],
        wrong: ["subrogation"],
      }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the amount Insurer B should pay.", kind: "money", value: share2, wrong: [loss7 / 2, loss7] }),
      P.manual({
        label: "(c)", marks: 2,
        stem: "Explain why Thandeka cannot receive the full value of her loss from each insurer.",
        points: ["Indemnity: she must be restored to her position before the loss, not make a profit.", `Two full payments would give her ${money(2 * loss7)} for a ${money(loss7)} loss.`],
        modelAnswer: `Under indemnity she can recover only her actual loss of ${money(loss7)}; full payments from both insurers would give her twice that, a profit from the burglary.`,
      }),
      P.manual({
        label: "(d)", marks: 2,
        stem: "Explain who owns the recovered clothes if the insurers have already paid Thandeka in full.",
        points: ["The insurers (in proportion to what they paid).", "Subrogation: after paying, insurers take over the insured's rights to the property (salvage)."],
        modelAnswer: "The insurers own them: under subrogation, once they have paid her in full, they take over her rights to the recovered goods.",
      }),
    ],
    hints: ["(b) Insurer B's share = its sum insured ÷ total sum insured × loss.", "(d) Which principle applies after a claim is paid?"],
    explanation: `(a) Contribution. (b) ${ins2.toLocaleString("en-GB")} ÷ ${(ins1 + ins2).toLocaleString("en-GB")} × ${loss7.toLocaleString("en-GB")} = ${money(share2)} (A pays ${money(share1)}). (c) Indemnity: no profit from a loss. (d) Subrogation passes salvage to the insurers.`,
    workedSolution: `1. Total sum insured = ${ins1.toLocaleString("en-GB")} + ${ins2.toLocaleString("en-GB")} = ${(ins1 + ins2).toLocaleString("en-GB")}.\n2. B pays ${ins2.toLocaleString("en-GB")} ÷ ${(ins1 + ins2).toLocaleString("en-GB")} × ${loss7.toLocaleString("en-GB")} = ${share2.toLocaleString("en-GB")}.\n3. Check: A pays ${share1.toLocaleString("en-GB")}; ${share1.toLocaleString("en-GB")} + ${share2.toLocaleString("en-GB")} = ${loss7.toLocaleString("en-GB")}.`,
  });

  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 1500, paper: "Paper 2",
    concepts: ["bus.insurance.principles", "bus.insurance.insurance-policies"],
    stem: "Insurance makes it possible for businesses to trade with confidence.",
    parts: [
      P.manual({
        label: "(a)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 450 },
        stem: "Explain the principles of insurance. Use examples to illustrate your answer.",
        points: [
          ["Utmost good faith: disclose all material facts; non-disclosure allows the insurer to refuse a claim (with example).", 2],
          ["Insurable interest: the insured must suffer a financial loss; prevents gambling on others' losses (with example).", 2],
          ["Indemnity: restored to the position before the loss, no profit; not applicable to life assurance (with example).", 2],
          ["Proximate cause: the dominant cause of the loss must be an insured risk (with example).", 2],
          ["Subrogation and contribution as corollaries of indemnity, explained.", 2],
        ],
        levels: L10,
        modelAnswer: "**Utmost good faith** requires both parties to disclose all material facts honestly. A shop owner who hides that petrol is stored on the premises may have a fire claim refused. **Insurable interest** means the insured must lose money if the event happens: a trader can insure her own stock but not her neighbour's, which stops people gambling on others' misfortunes. **Indemnity** restores the insured to the same financial position as before the loss, no better: goods insured for US\\$5,000 but worth US\\$3,000 are compensated at US\\$3,000. It does not apply to life assurance, where the sum assured is paid. **Proximate cause** means the insurer pays only if the dominant cause of the loss is an insured risk: water damage caused by firefighters is paid under a fire policy because the fire was the proximate cause. Two principles follow from indemnity. **Subrogation** gives the insurer, once it has paid, the insured's rights to salvage and to claim from anyone responsible. **Contribution** makes insurers that cover the same property share the loss in proportion to the sums insured, so the insured cannot be paid twice.",
      }),
      P.manual({
        label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 450 },
        stem: "A transport company carries goods for customers across Zimbabwe in its fleet of lorries. Discuss the types of insurance it should take out.",
        points: [
          ["Motor insurance: third party is compulsory; comprehensive protects the valuable lorries.", 2],
          ["Goods in transit: covers customers' goods lost, stolen or damaged on the road.", 2],
          ["Employer's liability / fidelity guarantee: drivers injured at work; dishonest drivers or clerks.", 2],
          ["Fire and burglary for depots and workshops; public liability for accidents involving the public.", 2],
          ["Judgement: which covers are essential (legal requirement, size of possible loss) and which are optional, with reasons.", 2],
        ],
        levels: L10,
        modelAnswer: "The company must have **motor insurance**: third-party cover is required by law, and because its lorries are its main assets, comprehensive cover is sensible so that a crash does not leave it without vehicles. **Goods in transit** insurance is essential because it carries other people's goods; if a load is stolen or damaged, customers will claim from the company. **Employer's liability** covers drivers and mechanics injured at work, and **fidelity guarantee** protects it if drivers or clerks steal goods or cash. Its depot and workshop need **fire** and **burglary** cover, and **public liability** covers members of the public injured at its premises. The most important are motor and goods in transit insurance, because one is required by law and both cover losses large enough to ruin the business; the others depend on the size of the depot and the number of staff, but are usually worth their premiums.",
      }),
    ],
    hints: ["(a) Name, explain and illustrate each principle.", "(b) Link each policy to a risk the transport company faces, then say which matter most."],
    explanation: "(a) Six principles: utmost good faith, insurable interest, indemnity, proximate cause, subrogation and contribution. (b) Motor and goods in transit cover are essential for a haulier; employer's liability, fidelity guarantee, fire, burglary and public liability complete its protection.",
  });

  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1500, paper: "Paper 2",
    concepts: ["bus.consumer.rights", "bus.consumer.organisations", "bus.consumer.legal-protection"],
    stem: "Consumers are often exploited by producers and traders.",
    parts: [
      P.manual({
        label: "(a)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 },
        stem: "Describe **four** ways in which consumers may be exploited.",
        points: [
          ["Short weights and measures, with example (tampered scales, underweight packets).", 2],
          ["False or misleading descriptions and advertising, with example.", 2],
          ["Unsafe, expired or counterfeit goods, with example.", 2],
          ["Overpricing / hidden charges / unfair credit terms, with example.", 2],
        ],
        levels: L8,
        modelAnswer: "Consumers may be given **short measures**: a trader uses tampered scales or sells a bag labelled 5 kg that holds only 4 kg. Goods may carry **false descriptions** or misleading adverts, such as \"pure honey\" that is mixed with syrup or a \"sale\" price that was never reduced. Traders may sell **unsafe, expired or counterfeit goods**, such as medicines past their expiry date or fake batteries that leak. Finally, consumers may be **overcharged**, for example when prices are raised sharply during a shortage, or when hire purchase agreements hide extra charges.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", wordLimit: { max: 550 },
        stem: "Discuss how effective government action and consumer protection bodies are in protecting consumers in Zimbabwe.",
        points: [
          ["Government laws (weights and measures, descriptions, safety, labelling, price controls) make exploitation an offence.", 2],
          ["Enforcement through inspectors, police and courts deters offenders; standards set by SAZ.", 2],
          ["Consumer council: education, complaints, price monitoring, representation.", 2],
          ["Limitations: few inspectors, informal traders hard to trace, low awareness, offices in towns, limited enforcement powers.", 2],
          ["Role of self-protection by consumers as a complement.", 2],
          ["Justified conclusion on overall effectiveness.", 2],
        ],
        levels: L12,
        modelAnswer: "Government protects consumers by passing laws that make short measures, false descriptions, unsafe goods and poor labelling offences, and by controlling the prices of some essential goods. Inspectors test scales and check food premises, and offenders can be fined or prosecuted, which deters many traders. The Standards Association of Zimbabwe sets standards and certifies products, so consumers can choose tested goods. The consumer council educates consumers, handles complaints, publishes price surveys and speaks for consumers to government. However, these measures are only as good as their enforcement: there are too few inspectors to visit every market, informal traders move and rarely give receipts, and many rural consumers do not know where to complain or cannot reach offices in town. The consumer council can negotiate but often cannot force a trader to pay. Protection therefore depends also on consumers checking goods, keeping receipts and reporting offences. Overall, government and consumer bodies give consumers in formal shops reasonable protection, but they are much less effective in the informal sector and rural areas, where education and self-protection matter most.",
      }),
    ],
    hints: ["(a) Name each practice and give an example.", "(b) Explain what government and consumer bodies do, then their limits, then judge."],
    explanation: "(a) Exploitation: short measures, false descriptions, unsafe or expired goods, overpricing. (b) Laws, enforcement, standards and consumer bodies protect consumers, but limited enforcement and awareness reduce their effectiveness, especially in informal trade.",
  });
});
