// W3a: trade unions (Cambridge 0264 only).
import { concept, P } from "../lib.mjs";

concept("bus.people.trade-unions", { file: "people/trade-unions", keyPrefix: "people.trade-unions" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a trade union?",
    options: [
      ["An organisation of workers that protects their pay and conditions", "Correct: it acts for employees."],
      ["An organisation of businesses in the same industry or trade", "That is a trade association."],
      ["A government department that inspects factories", "Inspectors are public officials."],
      ["A group of countries that trade freely", "That is a trading bloc."],
    ],
    answer: "A",
    explanation: "A **trade union** represents workers to protect and improve their pay, conditions and job security.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is collective bargaining?",
    options: [
      ["Negotiation between a union and an employer on behalf of all members", "Correct: workers bargain as a group."],
      ["Each worker agreeing pay and conditions individually with the manager", "That is individual bargaining."],
      ["Customers negotiating discounts with shops", "That is about customers, not employees."],
      ["Businesses buying stock in bulk together", "That is bulk buying."],
    ],
    answer: "A",
    explanation: "In **collective bargaining** the union negotiates for all its members together.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why does a union usually have more bargaining power than a single worker?",
    options: [
      ["It speaks for many workers at once", "Correct: an employer cannot easily replace all of them."],
      ["It owns shares in the business", "Unions do not normally own the business."],
      ["It sets the business's prices", "Prices are set by managers."],
      ["It employs the workers itself", "The business employs the workers."],
    ],
    answer: "A",
    explanation: "Strength in numbers: an employer can ignore one worker but not the whole workforce.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a cost to an employee of joining a trade union?",
    options: [
      ["Paying a membership subscription", "Correct: members pay regular fees."],
      ["Losing the right to a contract of employment", "Members still have contracts."],
      ["Being unable to receive legal advice", "Unions provide legal advice."],
      ["Being paid below the minimum wage", "Union membership does not reduce legal pay."],
    ],
    answer: "A",
    explanation: "Members pay a **subscription** and may lose pay during strikes.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A union member is called to a disciplinary hearing. How can the union help her?",
    options: [
      ["A union representative can attend and support her", "Correct: representation at hearings is a key benefit."],
      ["The union can take over paying her wages permanently", "Unions do not replace wages."],
      ["The union can dismiss the manager", "Unions have no power to dismiss managers."],
      ["The union can cancel the hearing", "Hearings are run by the employer."],
    ],
    answer: "A",
    explanation: "Union officials or shop stewards represent members in disputes so they are treated fairly.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "How might a trade union benefit a business that employs its members?",
    options: [
      ["Managers negotiate with one body instead of many individuals", "Correct: this saves time and gives clear communication."],
      ["Wages are always lower", "Unions usually push wages up."],
      ["Strikes become more frequent", "That would not benefit the business."],
      ["Changes are always accepted by workers without any discussion", "Unions negotiate over change."],
    ],
    answer: "A",
    hints: ["Think about how managers communicate with a large workforce."],
    explanation: "Unions give managers a single channel for negotiation and can help agree changes.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which is the most likely drawback of a strike for union members?",
    options: [
      ["They lose pay for the days they do not work", "Correct: strikers are usually not paid."],
      ["They lose their union membership", "Striking does not end membership."],
      ["Their working conditions automatically improve", "That would be a benefit, and is not automatic."],
      ["They must pay the employer's legal costs", "This is not a normal result of a strike."],
    ],
    answer: "A",
    hints: ["What happens to wages when workers stop work?"],
    explanation: "Striking workers usually lose wages, and long strikes can threaten the business and jobs.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Trade unions represent employees, while trade associations represent businesses.",
    answer: true,
    explanation: "True. Do not confuse the two.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The main activity of most trade unions is organising strikes.",
    answer: false,
    explanation: "False. Most union work is negotiation, advice and representation; strikes are a last resort.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Shop steward", "Elected worker who represents members in a workplace"],
      ["Collective bargaining", "Negotiation for all members together"],
      ["Industrial action", "Pressure on an employer such as a strike or go-slow"],
      ["Subscription", "Regular fee paid by union members"],
    ],
    explanation: "These terms describe how unions are organised and how they act.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Workers refusing to work during a dispute is called a {{blank:a}}, which is a form of industrial {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["strike"], choices: ["strike", "redundancy", "subscription"] },
      { id: "b", accepted: ["action"], choices: ["action", "bargaining", "relations"] },
    ],
    explanation: "Strikes, go-slows and overtime bans are industrial action.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the process in which a union negotiates with an employer on behalf of all its members.",
    accepted: ["collective bargaining"],
    wrong: ["industrial action"],
    explanation: "**Collective bargaining** is negotiation as a group.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "ANALYSIS",
    stem: "Explain **two** benefits to an employee of joining a trade union.",
    points: [
      "Collective bargaining / strength in numbers.",
      "So higher pay or better conditions than one worker could win.",
      "Representation / legal advice in disputes or dismissal.",
      "So the member is treated fairly / has protection.",
    ],
    hints: ["Think about pay negotiations and individual problems."],
    modelAnswer: "The union bargains for all its members together, so it can win higher pay and better conditions than a single worker could. It also represents members at disciplinary hearings and gives legal advice, so they are treated fairly.",
    explanation: "Bargaining power, representation, advice, safety and job security.",
  });
  b.manualShort({
    d: 4, marks: 6, skill: "EVALUATION",
    stem: "A new employee at a mine is deciding whether to join the mineworkers' union. Discuss whether she should join.",
    points: [
      "For: collective bargaining for pay and conditions.",
      "For: pressure for safety in a dangerous industry.",
      "For: representation and legal advice if injured or dismissed.",
      "Against: subscription reduces take-home pay.",
      "Against: may lose pay in strikes / must follow majority decisions.",
      "Justified conclusion.",
    ],
    hints: ["Mining is a dangerous industry: how does that affect the decision?"],
    modelAnswer: "Joining would give her the benefit of collective bargaining for pay and conditions, and in mining, a dangerous industry, the union presses for safety equipment and training. If she were injured or unfairly dismissed, the union would give legal advice and represent her. Against this, she must pay a subscription and could lose pay during a strike, and she would have to follow decisions she may not agree with. Because safety and job security matter so much in mining, the benefits outweigh the costs, so she should join.",
    explanation: "Weigh protection and bargaining power against subscriptions and strike losses.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 840,
    stem: "Workers at a fictional cement factory near Bulawayo belong to a trade union. The factory wants to bring in new machines that will make 30 jobs redundant. The union has asked for a meeting and says it may call a strike if there is no agreement.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "What is the meeting between the union and the managers an example of?",
        options: [["Collective bargaining", "Correct: negotiation for all members."], ["Induction", "Induction is for new employees."], ["Delegation", "Delegation passes authority within management."], ["Recruitment of new staff", "No vacancy is being filled."]],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Explain how the union could help the 30 workers who may lose their jobs.",
        points: [
          "Negotiate fewer redundancies / alternatives (retraining, natural wastage, voluntary redundancy).",
          "Negotiate higher redundancy payments.",
          "Ensure fair selection criteria / legal advice.",
        ],
        modelAnswer: "The union could negotiate for retraining and voluntary redundancy so fewer workers are forced out, press for higher redundancy payments, and make sure selection is fair, giving legal advice to members who are affected.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Discuss whether the factory's managers should agree to the union's demands to avoid a strike.",
        points: [
          "Strike would stop production and lose orders / revenue.",
          "Agreeing may raise costs (payments, retraining) and delay the machines.",
          "Machines bring lower long-run costs; some delay may be worth it.",
          "Good relations with the union help future changes / motivation of remaining staff.",
          "Compromise possible (phased introduction, retraining some as operators).",
          "Justified conclusion.",
        ],
        modelAnswer: "A strike would stop cement production and could lose customers to rivals, so avoiding one matters. Agreeing to all the union's demands could raise costs through higher payments and retraining and delay the savings from the machines. However, the machines will cut costs for many years, so a short delay and some extra cost are affordable, and good relations with the union will make future changes easier and keep the remaining workers motivated. The managers should negotiate a compromise: introduce the machines in stages, retrain some workers as operators and offer voluntary redundancy first.",
      }),
    ],
    hints: ["(c) What would a strike cost compared with the union's demands?"],
    explanation: "Unions bargain to protect jobs; managers weigh the cost of agreement against the cost of a strike.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "Rudo is a nurse at a private hospital in Harare. She and her colleagues are unhappy about long night shifts and a shortage of protective equipment. Some nurses want to join a union; others fear that the hospital's owners will see union members as troublemakers and that strikes would harm patients.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "Define **trade union**.",
        points: ["An organisation of workers.", "That protects and improves members' pay, conditions and job security."],
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain **two** ways a union could help the nurses with their problems.",
        points: [
          "Negotiate shift patterns / hours through collective bargaining.",
          "Stronger than individual complaints, so owners more likely to agree.",
          "Press for protective equipment under health and safety rules.",
          "Represent / advise nurses who raise safety concerns.",
        ],
        modelAnswer: "The union could negotiate shorter night shifts for all nurses together, which carries more weight than individual complaints. It could also press the hospital to supply protective equipment, using health and safety rules, and represent any nurse who is treated badly for raising concerns.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Evaluate whether the nurses should join a union.",
        points: [
          "Benefits: collective bargaining over shifts; safety equipment; representation.",
          "Costs: subscriptions; fear of owners' reaction.",
          "Strikes may harm patients; but strikes are a last resort and unions mostly negotiate.",
          "Legal protection against unfair treatment for union membership / raising concerns.",
          "Alternative: raise concerns directly with managers first.",
          "Justified conclusion.",
        ],
        modelAnswer: "Joining would give the nurses collective bargaining power over shifts and protective equipment, and representation if anyone is treated unfairly. They would pay subscriptions, and some fear the owners' reaction, but most union work is negotiation, not strikes, and nurses' unions can choose action that protects patients. Raising concerns directly with managers is an option, but individual complaints have not worked. Because their safety and the patients' safety are at risk, the nurses should join, using negotiation first and treating strikes only as a last resort.",
      }),
    ],
    hints: ["(c) Is a strike the only thing a union does?"],
    explanation: "Union membership gives bargaining power and protection; fears about strikes can be weighed against the risks of unsafe conditions.",
  });
  b.card("DEFINITION", "What is a **trade union**?", "An organisation of workers that acts to protect and improve their pay, conditions and job security.");
  b.card("DEFINITION", "What is **collective bargaining**?", "Negotiation between a union, for all its members, and an employer over pay and conditions.");
  b.card("DEFINITION", "What is **industrial action**?", "Pressure on an employer during a dispute: strike, go-slow, overtime ban.");
  b.card("CONCEPT", "Benefits to employees of union membership?", "Strength in numbers, higher pay and better conditions, representation, legal advice, safety, job security.");
  b.card("CONCEPT", "Drawbacks to employees of union membership?", "Subscriptions, lost pay during strikes, must follow majority decisions.");
  b.card("CONCEPT", "Trade union or trade association?", "A trade union represents employees; a trade association represents businesses in one industry.");
  b.card("CONCEPT", "Effects of unions on a business?", "One body to negotiate with and help with change; but higher wage costs and possible strikes or resistance.");
  b.card("DEFINITION", "What is a **shop steward**?", "An employee elected by union members in a workplace to represent them to managers.");
});
