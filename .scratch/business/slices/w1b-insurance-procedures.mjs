// W1b: insurance procedures, documents and people.
import { concept, P } from "../lib.mjs";

concept("bus.insurance.procedures-documents", { file: "insurance/procedures-documents", keyPrefix: "insurance.procedures-documents" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which document does a person complete to apply for insurance?",
    options: [
      ["Proposal form", "Correct: the proposal form gives the insurer the material facts about the risk."],
      ["Cover note", "A cover note is issued by the insurer after the proposal is accepted."],
      ["Insurance claim form", "A claim form is completed after a loss."],
      ["Policy", "The policy is the contract issued by the insurer."],
    ],
    answer: "A",
    explanation: "The **proposal form** is the application. It must be completed in utmost good faith because it is the basis of the contract.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the purpose of a **cover note**?",
    options: [
      ["It gives temporary cover until the policy is issued", "Correct: the insured is protected immediately while the policy is prepared."],
      ["It describes all the policies an insurer offers", "That is a prospectus."],
      ["It records the details of a loss", "That is a claim form."],
      ["It reminds the insured to renew the policy", "That is a renewal notice."],
    ],
    answer: "A",
    explanation: "A **cover note** is temporary proof of insurance, issued once the proposal is accepted and the premium paid.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which person assesses a risk, decides whether to accept it and fixes its premium?",
    options: [
      ["Underwriter", "Correct: the underwriter accepts or rejects each risk and sets the premium."],
      ["Broker", "A broker advises clients and arranges cover; the insurer's underwriter accepts the risk."],
      ["Loss adjuster", "A loss adjuster investigates and values claims."],
      ["Policyholder", "The policyholder is the insured person."],
    ],
    answer: "A",
    explanation: "The **underwriter** decides on each risk, using premium rates calculated by actuaries.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How does an insurance broker differ from an insurance agent?",
    options: [
      ["A broker is independent and deals with many insurers", "Correct: an agent represents one insurer."],
      ["A broker works for only one insurer", "That describes an agent."],
      ["A broker sets premium rates using statistics on past losses", "That is the actuary's job."],
      ["A broker pays claims from his own funds", "Claims are paid by the insurer."],
    ],
    answer: "A",
    explanation: "A **broker** is an independent expert who compares many insurers for the client; an **agent** sells one insurer's policies.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "After a fire, Farai fills in a form describing what happened and the value of the stock destroyed. What is this document?",
    options: [
      ["A claim form", "Correct: the claim form gives details of the loss and the amount claimed."],
      ["A proposal form", "The proposal form is completed when applying for cover."],
      ["A renewal notice", "A renewal notice is sent by the insurer before cover ends."],
      ["A prospectus", "A prospectus describes the insurer's policies."],
    ],
    answer: "A",
    hints: ["The loss has already happened."],
    explanation: "The **claim form** starts the claims procedure, followed by assessment and settlement.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which is the correct order when taking out a policy?",
    options: [
      ["Prospectus, proposal form, premium paid, cover note, policy", "Correct: information, application, payment, temporary cover, full contract."],
      ["Proposal form, policy, prospectus, cover note, premium paid", "The prospectus is read before applying, and the policy comes last."],
      ["Cover note, prospectus, policy, proposal form, premium paid", "A cover note cannot come before the application is accepted."],
      ["Policy, premium paid, proposal form, prospectus, cover note", "The policy is the final document, not the first."],
    ],
    answer: "A",
    hints: ["Information first; the full contract last."],
    explanation: "Read the prospectus → complete the proposal form → the insurer accepts and the premium is paid → cover note → policy.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What is the main role of an actuary?",
    options: [
      ["Calculating premium rates from statistics on losses", "Correct: actuaries use probability and statistics to set rates."],
      ["Inspecting damage after a claim", "That is the loss adjuster's role."],
      ["Selling policies door to door", "That is done by agents."],
      ["Advising clients which insurer and policy to choose", "That is the broker's role."],
    ],
    answer: "A",
    hints: ["Actuaries are mathematicians."],
    explanation: "**Actuaries** analyse data on how often and how badly losses happen and calculate the premium rates insurers need.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The policy is the formal written contract of insurance.",
    answer: true,
    explanation: "True. It states the risks covered, the sum insured, the premium, the period, the conditions and the exclusions.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A cover note is issued after a claim has been settled.",
    answer: false,
    explanation: "False. A cover note is issued when the proposal is accepted, giving temporary cover until the policy arrives.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each document with its purpose.",
    pairs: [
      ["Prospectus", "Describes an insurer's policies and terms"],
      ["Proposal form", "Gives the insurer the material facts about the risk"],
      ["Renewal notice", "Reminds the insured to pay to continue cover"],
      ["Claim form", "Gives details of a loss and the amount claimed"],
    ],
    explanation: "Each document belongs to a stage: information (prospectus), application (proposal form), continuing cover (renewal notice), loss (claim form).",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each person with his or her role in insurance.",
    pairs: [
      ["Broker", "Independent adviser who arranges cover with many insurers"],
      ["Underwriter", "Accepts the risk and fixes its premium"],
      ["Actuary", "Calculates premium rates from statistics"],
      ["Loss adjuster", "Investigates and values a claim for the insurer"],
    ],
    explanation: "Brokers advise clients; underwriters accept risks; actuaries calculate rates; loss adjusters value claims.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentence.",
    template: "After agreeing a settlement, the insured may sign a {{blank:a}} form to accept the payment in full settlement of the claim.",
    blanks: [{ id: "a", accepted: ["discharge", "settlement"], wrong: "proposal" }],
    explanation: "A **discharge** (settlement) form records that the insured accepts the payment in full settlement.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "UNDERSTANDING",
    stem: "Outline the procedure for making an insurance claim after a burglary.",
    points: [
      "Report the burglary to the police and notify the insurer promptly.",
      "Complete a claim form with details and supporting evidence (police report, invoices).",
      "A loss adjuster inspects and values the loss.",
      "Settlement: cash, repair or replacement (discharge form signed).",
    ],
    hints: ["Police and insurer first; payment last."],
    modelAnswer: "Report the burglary to the police and tell the insurer at once. Complete a claim form, attaching the police report and invoices for the stolen goods. The insurer's loss adjuster inspects and values the loss. The insurer then settles the claim by paying cash or replacing the goods, and the insured signs a discharge form.",
    explanation: "Claims: report, notify, claim form with evidence, assessment, settlement.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "APPLICATION",
    stem: "Explain **two** benefits to a small business owner of using an insurance broker.",
    points: [
      "Broker compares many insurers.",
      "So the owner gets suitable cover at a good price and saves time.",
      "Broker explains terms and exclusions / helps with claims.",
      "So the owner avoids buying the wrong cover and is supported when claiming.",
    ],
    hints: ["Think about choice and expert help."],
    modelAnswer: "A broker compares policies from many insurers, so the owner gets suitable cover at a good price without spending time contacting each insurer. The broker also explains the terms and exclusions and helps with claims, so the owner is less likely to buy unsuitable cover and gets support when a loss happens.",
    explanation: "Brokers offer independent advice, choice, time saving and help with claims.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 840,
    stem: "Rudo has bought a lorry to deliver vegetables from farms in Mutoko to Harare. She has never bought insurance before and visits an insurance broker in Harare.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which document will the broker give Rudo so that she can read about the policies available?",
        options: [["A prospectus", "Correct: it describes policies, cover and terms."], ["A claim form", "Claim forms are used after a loss."], ["A cover note", "A cover note is issued after acceptance."], ["A discharge form", "A discharge form is signed at settlement."]],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Describe the steps Rudo must follow, after choosing a policy, until she receives her policy document.",
        points: [
          "Complete and sign the proposal form, disclosing all material facts.",
          "Underwriter assesses the risk and fixes the premium.",
          "Rudo pays the premium.",
          "Cover note issued, then the policy.",
        ],
        modelAnswer: "Rudo completes and signs the proposal form, giving full and honest details of the lorry and how it is used. The insurer's underwriter assesses the risk and fixes the premium, which Rudo pays. She receives a cover note at once, and the policy follows.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Discuss whether Rudo should buy her insurance through the broker or directly from an insurance company's agent.",
        points: [
          "Broker: independent, compares many insurers, finds the best cover and price.",
          "Broker: explains terms, helps with claims; good for a first-time buyer.",
          "Broker: may favour insurers paying higher commission / may cost more if fees charged.",
          "Agent: knows one insurer's products well; may be quicker and convenient.",
          "Agent: offers only one insurer's policies, so less choice.",
          "Justified conclusion for Rudo.",
        ],
        modelAnswer: "A broker can compare policies from many insurers, so Rudo is more likely to get suitable cover at a good price, and the broker can explain the terms and help her with claims, which is valuable because she has never bought insurance before. However, a broker might favour insurers that pay higher commission. An agent knows one insurer's policies well and may be quick, but offers no choice. As a first-time buyer with a valuable lorry, Rudo should use the broker, provided she asks for more than one quotation.",
      }),
    ],
    hints: ["(b) Proposal, underwriting, premium, cover note, policy.", "(c) Compare choice and advice with convenience."],
    explanation: "(a) Prospectus. (b) Proposal form, underwriting, premium, cover note, policy. (c) A broker's independent advice suits a first-time buyer.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 840,
    stem: "Sipho's grocery shop is damaged by a flood. He reports it to his insurer two months later, after he has thrown away the damaged stock. He has lost the receipts for the stock.",
    parts: [
      P.manual({
        label: "(a)", marks: 3,
        stem: "State **three** things Sipho should have done to make his claim succeed.",
        points: ["Notify the insurer promptly.", "Keep the damaged stock / photographs for inspection by the loss adjuster.", "Keep receipts or invoices as evidence of value / prevent further loss."],
        modelAnswer: "He should have told the insurer at once, kept the damaged stock or photographs so the adjuster could inspect it, and kept receipts or invoices to prove its value.",
      }),
      P.manual({
        label: "(b)", marks: 6,
        stem: "Discuss how likely Sipho is to receive full compensation.",
        points: [
          "Late notice may breach policy conditions, giving the insurer grounds to refuse.",
          "Without the stock, the adjuster cannot inspect or value the loss.",
          "Without receipts, Sipho cannot prove the value; indemnity pays only proven loss.",
          "Mitigating evidence: bank records, supplier statements, photographs, stock records.",
          "Insurer may pay part of the claim.",
          "Reasoned conclusion: full compensation unlikely.",
        ],
        modelAnswer: "Sipho reported the flood two months late, which may break a condition of his policy and give the insurer grounds to refuse. Because he threw away the stock, the loss adjuster cannot inspect or value it, and without receipts he cannot prove what it was worth; under indemnity the insurer pays only a proven loss. He may be able to use supplier statements, bank records or photographs as evidence, so the insurer might pay part of the claim. Full compensation is unlikely.",
      }),
    ],
    hints: ["(b) What evidence does an insurer need before paying?"],
    explanation: "A successful claim needs prompt notice, evidence of the loss and its value, and the chance for the insurer to inspect it.",
  });
  b.card("DEFINITION", "What is a **proposal form**?", "The application for insurance, giving all material facts; the basis of the contract.");
  b.card("DEFINITION", "What is a **cover note**?", "A temporary document giving cover until the policy is issued.");
  b.card("DEFINITION", "What is a **prospectus**?", "A booklet or web page describing an insurer's policies, cover, conditions and rates.");
  b.card("DEFINITION", "What is the **policy**?", "The formal contract: risks covered, sum insured, premium, period, conditions and exclusions.");
  b.card("FACT", "Steps in taking out insurance?", "Prospectus → proposal form → underwriting and premium → cover note → policy → renewal.");
  b.card("FACT", "Steps in making a claim?", "Report and notify → claim form with evidence → assessment by a loss adjuster → settlement (discharge form).");
  b.card("CONCEPT", "Broker versus agent?", "Broker: independent, many insurers, advises client. Agent: sells for one insurer.");
  b.card("CONCEPT", "Underwriter versus actuary?", "Actuary calculates premium rates from statistics; underwriter decides on each individual risk and its premium.");
  b.card("DEFINITION", "Loss adjuster and loss assessor?", "Both investigate and value a loss: the adjuster acts for the insurer, the assessor for the insured.");
});
