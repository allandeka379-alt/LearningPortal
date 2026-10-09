// W4b: Human trafficking (her.global.human-trafficking). No graphic detail.
// Reviewer note: Zimbabwe's Trafficking in Persons Act [Chapter 9:25] is dated 2014 here; please confirm.
import { concept, P, source, levels } from "../lib.mjs";

concept("her.global.human-trafficking", { file: "global/human-trafficking", keyPrefix: "global.human-trafficking" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **human trafficking**?",
    options: [
      ["moving or holding people by force or deception in order to exploit them", "Correct: the purpose is exploitation."],
      ["helping a willing person to cross a border illegally in return for a fee", "This is people smuggling."],
      ["moving to another country legally with a work permit", "This is safe, legal migration."],
      ["the movement of goods across borders without paying duty", "This is goods smuggling."],
    ],
    answer: "A",
    explanation: "Trafficking uses force, threats or deception to move or hold people for exploitation.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Forcing a person to work as a maid with no pay and no freedom to leave is called",
    options: [
      ["domestic servitude", "Correct: forced work inside a household."],
      ["voluntary work", "Voluntary work is freely chosen."],
      ["an apprenticeship", "An apprenticeship is paid training by agreement."],
      ["safe migration", "Safe migration is legal, informed movement."],
    ],
    answer: "A",
    explanation: "Domestic servitude is a form of trafficking in which a person is forced to work in a household.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is the **key** difference between trafficking and smuggling?",
    options: [
      ["Trafficking exploits the person; smuggling only moves a willing person across a border", "Correct: exploitation and consent are the key differences."],
      ["Smuggling always involves children", "Smuggling can involve anyone."],
      ["Trafficking always crosses an international border, but smuggling can happen inside one country", "It is the other way round: trafficking can happen inside one country; smuggling always crosses a border."],
      ["Smuggling is legal but trafficking is illegal", "Both are crimes."],
    ],
    answer: "A",
    explanation: "Smuggling is an agreed illegal border crossing; trafficking is about exploitation, with or without a border.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a common **warning sign** of a trafficking job offer?",
    options: [
      ["the agent wants to keep the worker's passport", "Correct: taking documents traps the victim."],
      ["the company gives a written contract to read first", "A written contract is a good sign."],
      ["the job is advertised by a registered agency", "Registration is a safeguard."],
      ["the worker may phone home whenever they like", "Freedom to contact family is a good sign."],
    ],
    answer: "A",
    explanation: "Traffickers take documents so victims cannot leave or seek help.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "The main international agreement against human trafficking, adopted in 2000, is commonly known as the",
    options: [
      ["Palermo Protocol", "Correct: the UN Trafficking in Persons Protocol, signed in Palermo."],
      ["Maputo Protocol", "The Maputo Protocol (2003) is on the rights of women in Africa."],
      ["Paris Agreement", "The Paris Agreement (2015) is on climate change."],
      ["Lancaster House Agreement", "Lancaster House (1979) led to Zimbabwe's independence."],
    ],
    answer: "A",
    explanation: "The Palermo Protocol of 2000 defines trafficking and commits countries to prevent it, protect victims and punish traffickers.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Chipo agreed to travel abroad for a hotel job. On arrival her phone is taken and she must work without pay to repay a \"transport debt\". What has happened to her?",
    options: [
      ["She has become a victim of trafficking", "Correct: she is held and exploited through debt."],
      ["She has simply been smuggled", "Smuggling ends on arrival; she is being exploited."],
      ["She is a voluntary worker", "She is not free and not paid."],
      ["She has migrated safely", "She was deceived and is trapped."],
    ],
    answer: "A",
    hints: ["Does agreeing to travel mean agreeing to be exploited?"],
    explanation: "Agreeing to travel is not agreeing to exploitation. Debt bondage and loss of freedom make her a trafficking victim.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which action is the **safest** first step for a young person offered a job abroad?",
    options: [
      ["check that the agency is registered and ask for a written contract", "Correct: verifying protects against false offers."],
      ["accept at once and leave before the offer is given to somebody else", "Pressure to leave quickly is a warning sign."],
      ["hand the passport to the agent for safekeeping", "Never give away your documents."],
      ["keep the plan secret from the family", "Secrecy helps traffickers."],
    ],
    answer: "A",
    hints: ["What would a genuine employer be happy to provide?"],
    explanation: "Genuine employers give contracts and use registered agencies; secrecy, haste and taking documents are warning signs.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why are laws alone **not** enough to end human trafficking?",
    options: [
      ["Many cases are never reported, and poverty keeps people vulnerable", "Correct: laws depend on reporting and do not remove the causes."],
      ["Trafficking is not a crime under Zimbabwean law", "Zimbabwe has a Trafficking in Persons Act."],
      ["Laws make trafficking more profitable for criminals", "Laws raise the risk for traffickers."],
      ["Victims of trafficking never need help from the police", "Victims often need police protection."],
    ],
    answer: "A",
    hints: ["What must happen before a trafficker can be prosecuted?"],
    explanation: "Laws work only when cases are reported and enforced, and they do not remove causes such as poverty.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Human trafficking can take place inside one country without crossing any border.",
    answer: true,
    explanation: "True. Trafficking is about exploitation; it can happen within a country.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A trafficked person who first agreed to travel is to blame for what happened to them.",
    answer: false,
    explanation: "False. Agreeing to travel is not agreeing to be exploited; trafficked people are victims of crime.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each situation with the form of trafficking it describes.",
    pairs: [
      ["men forced to work on a building site for no pay under threat", "forced labour"],
      ["a girl kept in a house as a maid, not allowed out", "domestic servitude"],
      ["children moved to a city and made to beg for a gang", "child trafficking"],
      ["a person deceived into giving up a kidney for sale", "organ removal"],
    ],
    explanation: "Each situation matches one of the forms of trafficking named in the syllabus.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "The UN World Day against Trafficking in Persons is held on 30 {{blank:a}}. Victims of abuse can report to the police {{blank:b}} Unit.",
    blanks: [
      { id: "a", accepted: ["July"], choices: ["July", "April", "December", "May"] },
      { id: "b", accepted: ["Victim Friendly"], choices: ["Victim Friendly", "Traffic", "Support", "Border"] },
    ],
    explanation: "30 July is World Day against Trafficking in Persons; the police Victim Friendly Unit helps victims of abuse.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State the **three** parts of human trafficking (the act, the means and the purpose), giving an example of each.",
    points: [
      "Act: e.g. recruiting, transporting, holding or receiving a person",
      "Means: e.g. threats, force, deception, debt, taking documents",
      "Purpose: exploitation, e.g. forced labour, sexual exploitation, domestic servitude",
    ],
    modelAnswer: "The act is what is done, such as recruiting or transporting a person. The means is how it is done, such as deception through a false job offer. The purpose is exploitation, such as forced labour.",
    explanation: "One mark for each part with a correct example.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Explain **three** causes of human trafficking.",
    points: [
      "Identifies poverty / unemployment",
      "Develops: people accept risky offers to support their families",
      "Identifies false job or study offers / lack of information",
      "Develops: people do not know how to check offers or the warning signs",
      "Identifies demand for cheap labour / conflict / family breakdown / weak enforcement",
      "Develops: e.g. criminals profit from cheap labour; orphans or displaced people lack protection",
    ],
    modelAnswer: "Poverty and unemployment make young people willing to accept risky job offers so that they can support their families. Many people lack information, so they cannot recognise a false offer or check whether an agency is genuine. There is also demand for cheap labour, so criminals can make large profits from exploiting people.",
    hints: ["Think of what makes victims vulnerable and what makes traffickers profit."],
    explanation: "One mark for each cause and one for its development.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Suggest **two** ways a community could protect its young people from trafficking, and explain how each would help.",
    points: [
      "Suggests awareness meetings/drama in schools, churches and community gatherings",
      "Explains that young people learn the warning signs and how to check offers",
      "Suggests a way to check and report (e.g. check agencies with the authorities, report suspicious adverts to the police) / skills and job projects",
      "Explains how it stops traffickers or reduces vulnerability",
    ],
    modelAnswer: "The community could hold awareness meetings and dramas at schools and churches, so young people learn the warning signs of false job offers. It could also agree that anyone offered work abroad first shows the offer to a trusted adult and reports suspicious adverts to the police, so traffickers are exposed before anyone is harmed.",
    hints: ["Knowledge and action."],
    explanation: "One mark for each suitable way and one for its explanation.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true,
    stem: source("Source A", "an advert of the kind shared on social media (invented for this question; it does not refer to any real company)",
      "URGENT! 20 young women and men needed for hotel and farm work abroad. Salary US\\$900 a month. No qualifications or experience needed. Free transport and accommodation. No contract needed: just bring your passport and pay a US\\$50 processing fee to our agent. Leave this Friday. Tell no one, places are limited!") +
      "\n\nRead Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "Which detail in the advert is the **strongest** warning that it may be a trap?",
        options: [
          ["no contract needed and the passport handed over", "Correct: no contract and giving up documents are serious warning signs."],
          ["hotel work is mentioned", "Hotel work itself is ordinary."],
          ["the work is abroad", "Many genuine jobs are abroad."],
          ["women and men are both invited to apply", "This alone is not a warning sign."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** other warning signs in the advert.",
        points: ["Pressure to leave very quickly / secrecy (\"tell no one\")", "A fee paid to an agent / very high pay for no qualifications"],
        modelAnswer: "The advert says to leave on Friday and tell no one, and it asks for a fee to be paid to an agent; the pay is also very high for work needing no qualifications.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain what a young person who sees this advert should do.",
        points: [
          "Not pay or hand over documents",
          "Show the advert to a trusted adult and check whether the agency/company is genuine",
          "Report the advert to the police (e.g. the Victim Friendly Unit) to protect others",
        ],
        modelAnswer: "The young person should not pay the fee or hand over their passport. They should show the advert to a trusted adult and check whether the agency is registered and the company real. They should report the advert to the police so that others are protected.",
      }),
    ],
    hints: ["In (a), which detail would trap a person once abroad?"],
    explanation: "A source-based practice item on recognising and responding to a false job offer.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "This question is about the effects of human trafficking and the response to it.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe **two** effects of human trafficking on victims.",
        points: [
          "Effect 1, e.g. physical harm, illness, injury",
          "Described",
          "Effect 2, e.g. trauma, loss of freedom and documents, no pay/debt, stigma on return",
          "Described",
        ],
        modelAnswer: "Victims suffer physical harm and illness from dangerous work, long hours and poor food. They also suffer deep trauma and fear, because they lose their freedom and documents and cannot contact their families.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE",
        stem: "\"Awareness is the most effective way to prevent human trafficking.\" How far do you agree?",
        points: [
          ["Strengths of awareness: people recognise warning signs, check offers, report; cheap; reaches schools, churches, media", 3],
          ["Limits of awareness: poverty still pushes people to take risks; some victims are children or deceived by relatives", 3],
          ["Other measures: laws and prosecution (Trafficking in Persons Act), border cooperation, safe migration, reducing poverty, support for survivors", 3],
          ["Supported judgement", 3],
        ],
        levels: levels(12),
        modelAnswer: "Awareness is very important. When young people and parents know the warning signs (no contract, a fee, haste, secrecy, taking documents), they can check offers and refuse them. Awareness is cheap and reaches many people through schools, churches, radio and social media, and it also encourages people to report suspicious adverts.\n\nHowever, awareness has limits. A person who knows the risks may still accept a risky offer because their family is hungry. Children cannot protect themselves, and some victims are deceived by people they trust, even relatives.\n\nOther measures are therefore needed. The Trafficking in Persons Act makes trafficking a serious crime, and prosecutions deter criminals. Border officers and cooperation with SADC neighbours help identify victims. Safe migration through registered agencies gives people a legal route. Jobs and skills training reduce the poverty that traffickers exploit, and support for survivors helps them rebuild their lives without stigma.\n\nI agree only partly. Awareness is the first and cheapest line of defence, but it works best together with enforcement, safe migration and efforts to reduce poverty.",
      }),
    ],
    hints: ["In (b), ask whether knowing the danger is enough when a family is poor."],
    explanation: "A practice evaluative item on effects of and responses to human trafficking.",
  });

  b.card("DEFINITION", "Human trafficking", "Recruiting, moving or holding people by force, threats or deception in order to exploit them.");
  b.card("DEFINITION", "People smuggling", "Helping a willing person to cross a border illegally, usually for payment.");
  b.card("DEFINITION", "Domestic servitude", "Forcing a person to work in a household with no freedom and little or no pay.");
  b.card("DEFINITION", "Safe migration", "Moving legally with full information, valid documents, a real contract and contacts at home.");
  b.card("FACT", "What is the main international agreement against trafficking?", "The UN Trafficking in Persons (Palermo) Protocol, 2000.");
  b.card("FACT", "When is the World Day against Trafficking in Persons?", "30 July.");
  b.card("CONCEPT", "Name four warning signs of a false job offer.", "No contract, a fee to an agent, pressure to leave quickly, secrecy, the agent keeps your passport, pay too good to be true.");
  b.card("CONCEPT", "Give three differences between trafficking and smuggling.", "Consent (none vs agreed); border (not needed vs always); after the journey (exploitation continues vs relationship ends).");
  b.card("CONCEPT", "Why is a trafficked person a victim even if they agreed to travel?", "They agreed to a job, not to exploitation; they were deceived, controlled or forced.");
});
