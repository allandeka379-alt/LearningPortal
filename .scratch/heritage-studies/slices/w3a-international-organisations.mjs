// W3a: Zimbabwe in international organisations (her.governance.international-organisations).
// The Commonwealth is mentioned in neutral outline only (joined 1980, withdrew 2003); its current status is not stated.
import { concept, P, source, table, levels } from "../lib.mjs";

concept("her.governance.international-organisations", { file: "governance/international-organisations", keyPrefix: "governance.international-organisations" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On what date was the **United Nations** founded?",
    options: [
      ["24 October 1945", "Correct: UN Day."],
      ["25 May 1963", "This is when the OAU was founded."],
      ["18 April 1980", "This is when Zimbabwe became independent and soon joined the UN."],
      ["11 November 1965", "This is the date of UDI."],
    ],
    answer: "A",
    explanation: "The UN was founded on 24 October 1945.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which UN agency works mainly for **children**?",
    options: [
      ["UNICEF", "Correct."],
      ["UNESCO", "UNESCO deals with education, science and culture."],
      ["WFP", "WFP deals with food."],
      ["WHO", "WHO deals with health."],
    ],
    answer: "A",
    explanation: "UNICEF: the United Nations Children's Fund.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which UN agency lists sites such as **Great Zimbabwe** as World Heritage Sites?",
    options: [
      ["UNESCO", "Correct."],
      ["UNICEF", "UNICEF works for children."],
      ["WFP", "WFP provides food aid."],
      ["WHO", "WHO deals with health."],
    ],
    answer: "A",
    explanation: "UNESCO (education, science and culture) runs the World Heritage list.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What was the main idea of **non-alignment**?",
    options: [
      ["Not joining either bloc in the Cold War", "Correct."],
      ["Joining the Western bloc led by the USA", "That is alignment, not non-alignment."],
      ["Joining the Eastern bloc led by the Soviet Union", "That is also alignment."],
      ["Forming one government for all of Africa", "That was not NAM's aim."],
    ],
    answer: "A",
    explanation: "NAM members stayed independent of the rival power blocs.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which UN organ has **five permanent members** with a veto?",
    options: [
      ["The Security Council", "Correct."],
      ["The General Assembly", "All members have one vote each; there is no veto."],
      ["The International Court of Justice", "This is a court of judges."],
      ["The Secretariat", "This is the administration, led by the Secretary-General."],
    ],
    answer: "A",
    explanation: "China, France, Russia, the United Kingdom and the United States hold permanent seats with a veto.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "After a drought near Gwanda, families receive maize meal, beans and cooking oil from a UN agency. Which agency is this **most likely** to be?",
    options: [
      ["WFP", "Correct: the World Food Programme."],
      ["UNESCO", "UNESCO deals with education and culture."],
      ["WHO", "WHO deals with health."],
      ["The International Court of Justice", "The court settles disputes between states."],
    ],
    hints: ["Which agency deals with food?"],
    answer: "A",
    explanation: "WFP provides food aid in droughts and disasters.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why do many African states call for **reform of the Security Council**?",
    options: [
      ["Africa has no permanent seat on the Council", "Correct: yet many issues before it concern Africa."],
      ["The Council has too many African permanent members already", "Africa has no permanent members."],
      ["The Council never meets to discuss peace and security", "It meets regularly."],
      ["The General Assembly has a veto that blocks the Council", "The General Assembly has no veto."],
    ],
    hints: ["Who are the permanent members?"],
    answer: "A",
    explanation: "Africa has elected seats only, so many African states argue for permanent representation.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement **best** describes the relationship between UN agencies and the government of Zimbabwe?",
    options: [
      ["Agencies support national programmes but do not replace the government", "Correct."],
      ["Agencies govern the provinces where they have offices", "Agencies do not govern."],
      ["The government must obey every request made by an agency", "Agencies work by agreement."],
      ["Agencies may only work in countries with no government", "Agencies work with governments."],
    ],
    hints: ["Who is responsible for national services?"],
    answer: "A",
    explanation: "Agencies work with and through national institutions.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Harare hosted the summit of the Non-Aligned Movement in 1986.",
    answer: true,
    explanation: "True.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The UN applied sanctions to Rhodesia after UDI.",
    answer: true,
    explanation: "True. The UN supported the right of colonial peoples to self-determination.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each UN agency with an example of its work in Zimbabwe.",
    pairs: [
      ["UNICEF", "Immunising children and supporting child protection"],
      ["UNESCO", "Listing Mana Pools as a World Heritage Site"],
      ["WHO", "Supporting cholera and malaria control"],
      ["WFP", "Food aid after Cyclone Idai"],
    ],
    explanation: "Each agency works in its own field.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "The UN is led by the Secretary-{{blank:a}}. The International Court of Justice sits in {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["General"], choices: ["General", "President", "Chairman", "Speaker"] },
      { id: "b", accepted: ["The Hague"], choices: ["The Hague", "Geneva", "New York", "Addis Ababa"] },
    ],
    explanation: "The Secretary-General leads the Secretariat; the ICJ sits in The Hague.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "In which year was the Non-Aligned Movement founded?",
    accepted: ["1961"],
    wrong: ["1945"],
    explanation: "NAM was founded in **1961** in Belgrade.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "State **four** aims of the United Nations.",
    points: ["Maintain international peace and security", "Develop friendly relations among nations", "Solve economic, social and humanitarian problems through cooperation", "Promote human rights / be a centre for coordinating nations' actions"],
    modelAnswer: "To keep world peace and security, to develop friendly relations among nations, to cooperate in solving economic, social and humanitarian problems, and to promote human rights.",
    explanation: "One mark per aim.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** benefits Zimbabwe gains from membership of the UN.",
    points: [
      "Humanitarian help",
      "Developed: e.g. WFP food aid after droughts and Cyclone Idai",
      "Health and child-welfare programmes / World Heritage recognition / a voice in world affairs",
      "Developed: e.g. UNICEF immunisation; UNESCO listing attracts tourists",
    ],
    modelAnswer: "Zimbabwe receives humanitarian help, for example food aid from WFP after droughts and Cyclone Idai. It also benefits from health and child-welfare programmes, such as UNICEF's support for immunisation, which protects children from disease.",
    hints: ["Give the benefit and an example."],
    explanation: "Two marks per developed benefit.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain **three** reasons why newly independent countries joined the Non-Aligned Movement.",
    points: [
      "To keep their independence", "Developed: avoid being controlled by either Cold War bloc",
      "To oppose colonialism and apartheid", "Developed: support liberation in southern Africa and elsewhere",
      "To gain a stronger collective voice / economic cooperation", "Developed: together they could press for fairer trade and development",
    ],
    modelAnswer: "Newly independent countries wanted to keep their independence and avoid being controlled by either Cold War bloc. They also wanted to oppose colonialism and apartheid, supporting liberation movements such as those in southern Africa. Together they had a stronger voice, which they used to press for fairer trade and more development.",
    hints: ["Think about independence, liberation and a shared voice."],
    explanation: "Two marks per developed reason.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: source("Source A", "a poster (described in words) of the kind displayed at a district hospital", `The poster shows a nurse vaccinating a baby held by her mother. Along the top are the words "Every child, every vaccine". At the bottom are the logos of the Ministry of Health and Child Care and of two UN agencies, one for children and one for health. A line of small print says that the vaccines are free at all public clinics.`, { described: true }),
    parts: [
      P.mcq({
        label: "(a)", stem: "Which two UN agencies are **most likely** shown on the poster?",
        options: [
          ["UNICEF and WHO", "Correct: children and health."],
          ["UNESCO and WFP", "These deal with culture and food."],
          ["WFP and UNICEF", "WFP deals with food, not health."],
          ["UNESCO and WHO", "UNESCO deals with education and culture."],
        ],
        answer: "A",
        explanation: "UNICEF works for children and WHO for health.",
      }),
      P.tf({
        label: "(b)",
        stem: "The poster suggests that UN agencies work together with the national government.",
        answer: true,
        explanation: "True: the Ministry's logo appears beside the agencies'.",
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain **two** reasons why child immunisation is important to Zimbabwe.",
        points: [
          "Protects children from deadly diseases",
          "Developed: fewer child deaths and disabilities",
          "Prevents outbreaks / saves money",
          "Developed: protects the whole community; treating disease costs more than preventing it",
        ],
        modelAnswer: "Immunisation protects children from serious diseases such as measles and polio, reducing child deaths and disability. It also prevents outbreaks that could spread through the community, and preventing disease costs far less than treating it.",
      }),
    ],
    hints: ["Think about the logos and the message."],
    explanation: "Reading a described poster about UN cooperation in health.",
  });
  b.struct({
    d: 4, skill: "EVALUATION",
    stem: "Answer the questions on Zimbabwe and the United Nations.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe **two** main organs of the United Nations.",
        points: [
          "General Assembly: all members, one vote each",
          "discusses world issues and approves the budget",
          "Security Council: 15 members, five permanent with a veto",
          "responsible for peace and security",
        ],
        modelAnswer: "The General Assembly includes all member states, each with one vote; it discusses world issues and approves the UN budget. The Security Council has 15 members, five of them permanent with a veto, and is responsible for international peace and security.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Zimbabwe gains more from the UN than it gives.\" How far do you agree?",
        points: [
          ["For: food aid, immunisation, disease control, World Heritage status, a voice in world affairs", 2],
          ["Against / balance: Zimbabwe pays contributions, contributes to peacekeeping, must implement conventions and report", 2],
          ["Limits: influence over major decisions is limited by the veto; programmes depend on donor funding", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "Zimbabwe gains a great deal from the UN. WFP has provided food aid after droughts and Cyclone Idai, UNICEF and WHO support immunisation and disease control, and UNESCO's World Heritage listing of sites such as Great Zimbabwe brings recognition and tourism. Zimbabwe also has a voice in the General Assembly.\n\nZimbabwe also gives. It pays its contributions, has contributed to peacekeeping and must implement and report on conventions such as the Convention on the Rights of the Child. Its influence over major decisions is limited, because the permanent members hold a veto.\n\nI largely agree: the practical benefits in health, food security and heritage are greater than the costs, even though Zimbabwe's influence is limited.",
      }),
    ],
    hints: ["Weigh benefits against obligations."],
    explanation: "Describing UN organs and evaluating Zimbabwe's membership.",
  });

  b.card("FACT", "When was the UN founded?", "24 October 1945 (UN Day).");
  b.card("FACT", "When did Zimbabwe join the UN?", "1980, soon after independence.");
  b.card("FACT", "Four UN agencies active in Zimbabwe?", "UNICEF (children), UNESCO (education, culture), WHO (health), WFP (food).");
  b.card("FACT", "When was NAM founded, and when did Harare host its summit?", "Founded 1961; Harare summit 1986.");
  b.card("DEFINITION", "Non-alignment", "Not joining either bloc in the Cold War.");
  b.card("DEFINITION", "Veto", "The power of a permanent Security Council member to block a decision.");
  b.card("FACT", "Five permanent members of the Security Council?", "China, France, Russia, the United Kingdom and the United States.");
  b.card("CONCEPT", "Two obligations of UN membership?", "Pay contributions; respect the UN Charter and implement ratified conventions.");
  b.card("FACT", "Zimbabwe and the Commonwealth?", "Joined at independence in 1980; withdrew in 2003.");
});
