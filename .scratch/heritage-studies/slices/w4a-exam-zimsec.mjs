// W4a exam-format items: ZIMSEC Heritage Studies Paper 2 Section A (ZIM_P2A, 10 marks: 2 + 3 + 5) x4 and Section B
// essays (ZIM_P2B, 20 marks: 8 + 12) x3. Part marks are our convention (reviewer to check against recent papers).
// Section A: courts; the electoral system; the informal sector; food preservation. Section B: why a home-grown
// constitution replaced Lancaster House; factors inhibiting production; indigenous conservation, how effective.
import { concept, P, source, levels, EXAM, checkExam } from "../lib.mjs";

const A = EXAM.ZIM_P2A;
const B = EXAM.ZIM_P2B;
const a = { skill: A.skill, secs: A.secs, examStyle: true, paper: "Paper 2" };
const bb = { skill: B.skill, secs: B.secs, examStyle: true, paper: "Paper 2" };

concept("her.constitution.laws-courts", { file: "exam/w4a-zimsec", keyPrefix: "exam.w4a-zimsec" }, (b) => {
  // ---------------------------------------------------------------- Section A 1: the courts.
  b.struct({
    ...a, d: 3,
    concepts: ["her.constitution.laws-courts"],
    stem: "This question is about the courts of Zimbabwe.",
    parts: checkExam(A, [
      P.fib({
        label: "(a)",
        stem: "Complete the statements.",
        template: "The courts of Zimbabwe are listed in section {{blank:a}} of the Constitution. The highest court on constitutional matters is the {{blank:b}}.",
        blanks: [
          { id: "a", accepted: ["162"], choices: ["162", "81", "56", "238"] },
          { id: "b", accepted: ["Constitutional Court"], choices: ["Constitutional Court", "High Court", "Labour Court", "Administrative Court"] },
        ],
        explanation: "Section 162 lists the courts; the Constitutional Court is the highest court on constitutional matters.",
      }),
      P.match({
        label: "(b)",
        stem: "Identify the court that would deal with each case.",
        pairs: [
          ["a worker claims she was unfairly dismissed", "the Labour Court"],
          ["a youth is charged with stealing a bicycle", "a magistrates court"],
          ["a local dispute under custom in a rural area", "a customary law court"],
        ],
        extraRight: ["the Administrative Court"],
        explanation: "Employment disputes go to the Labour Court; everyday crimes to magistrates courts; local customary disputes to customary law courts.",
      }),
      P.manual({
        label: "(c)", marks: 5,
        stem: "Explain why independent courts are important for the rule of law in Zimbabwe.",
        points: [
          "Courts can set aside laws or actions that are inconsistent with the Constitution",
          "so the government and officials are kept within the law",
          "Everyone is equal before the law (section 56) and gets a fair hearing",
          "so citizens trust the courts and settle disputes peacefully instead of by violence",
          "Independent courts decide cases on the law, not on pressure from the powerful / protect rights in the Declaration of Rights",
        ],
        modelAnswer: "Independent courts can set aside any law or action that is inconsistent with the Constitution, so the government and officials are kept within the law. They treat everyone as equal before the law and give each person a fair hearing, so citizens trust them and settle disputes peacefully rather than by violence. Because they are independent, judges decide cases according to the law and not according to pressure from powerful people, which protects the rights in the Declaration of Rights.",
        explanation: "Two developed points (2 marks each) and one further point.",
      }),
    ]),
    hints: ["In (c), think about the government, ordinary citizens and pressure from the powerful."],
    explanation: "Paper 2 Section A item on the courts and the rule of law.",
  });

  // ---------------------------------------------------------------- Section A 2: the electoral system.
  b.struct({
    ...a, d: 3,
    concepts: ["her.constitution.electoral-system"],
    stem: "This question is about the electoral system of Zimbabwe.",
    parts: checkExam(A, [
      P.fib({
        label: "(a)",
        stem: "Complete the statements.",
        template: "Citizens may vote from the age of {{blank:a}}. Harmonised elections are held every {{blank:b}} years.",
        blanks: [
          { id: "a", accepted: ["18"], choices: ["18", "16", "21", "25"] },
          { id: "b", accepted: ["five"], choices: ["five", "four", "six", "seven"] },
        ],
        explanation: "The voting age is 18, and harmonised elections are held every five years.",
      }),
      P.fib({
        label: "(b)",
        stem: "Identify **three** functions of the Zimbabwe Electoral Commission by completing the statements.",
        template: "ZEC registers {{blank:a}}. It draws the boundaries of constituencies and {{blank:b}}. After voting, it announces the {{blank:c}}.",
        blanks: [
          { id: "a", accepted: ["voters"], choices: ["voters", "judges", "chiefs", "companies"] },
          { id: "b", accepted: ["wards"], choices: ["wards", "provinces", "farms", "schools"] },
          { id: "c", accepted: ["results"], choices: ["results", "budget", "verdicts", "by-laws"] },
        ],
        explanation: "ZEC registers voters, delimits constituencies and wards, runs elections and referendums, and announces results.",
      }),
      P.manual({
        label: "(c)", marks: 5,
        stem: "Explain **two** features of a free and fair election.",
        points: [
          "Secret ballot",
          "so no one can know how a person voted, and voters cannot be threatened or bribed",
          "Independent electoral commission / freedom to campaign without violence or intimidation",
          "so all candidates compete on equal terms and voters choose freely",
          "Any further developed point (e.g. transparent counting watched by agents and observers, so results can be trusted)",
        ],
        modelAnswer: "A free and fair election uses a secret ballot, so no one can know how a person voted and voters cannot be threatened or bribed. It is run by an independent commission that applies the rules equally, and candidates can campaign freely without violence or intimidation, so voters hear every candidate and choose freely. Counting is also done openly in front of party agents and observers, so the results can be trusted.",
        explanation: "Two developed features (2 marks each) and one further point.",
      }),
    ]),
    hints: ["In (c), for each feature say why it matters."],
    explanation: "Paper 2 Section A item on the electoral system.",
  });

  // ---------------------------------------------------------------- Section A 3: the informal sector.
  b.struct({
    ...a, d: 3,
    concepts: ["her.production.informal-sector"],
    stem: source("Source A", "a report in a fictional community newspaper, Mutare, 2026",
      "Along the main road, vendors sell vegetables, airtime and second-hand clothes. Behind the market, young men weld gates and repair cars in an open yard. None of them have contracts or pensions, and most started with a little money borrowed from relatives. When it rains, the welders stop work, and council officers sometimes take vendors' goods.") +
      "\n\nRead Source A and answer the questions.",
    parts: checkExam(A, [
      P.mcq({
        label: "(a)", marks: 2,
        stem: "To which sector do the activities in the source belong?",
        options: [
          ["the informal sector", "Correct: small, mostly unregistered, with no contracts."],
          ["the formal sector", "Formal businesses are registered and give contracts."],
          ["the public sector", "These are private activities, not government."],
          ["the primary sector", "Vending and repairs are not extraction."],
        ],
        answer: "A",
        explanation: "Small scale, little capital and no contracts or pensions are features of the informal sector.",
      }),
      P.fib({
        label: "(b)",
        stem: "Identify **three** problems faced by the workers in the source by completing the statements.",
        template: "The workers have no contracts or {{blank:a}}. They started with little {{blank:b}}, borrowed from relatives. The welders stop work when it rains because they have no {{blank:c}}.",
        blanks: [
          { id: "a", accepted: ["pensions"], choices: ["pensions", "customers", "skills", "tools"] },
          { id: "b", accepted: ["capital"], choices: ["capital", "land", "competition", "electricity"] },
          { id: "c", accepted: ["shelter"], choices: ["shelter", "customers", "licences", "pensions"] },
        ],
        explanation: "The source shows insecurity (no contracts or pensions), lack of capital and lack of premises; goods are also confiscated.",
      }),
      P.manual({
        label: "(c)", marks: 5,
        stem: "Explain how the council and the government could help the informal sector in this town.",
        points: [
          "Council builds covered markets / workspaces with water and toilets",
          "so traders and welders can work in all weather and pavements stay clear",
          "Simpler, affordable licences and dialogue with traders' associations",
          "so traders register, goods are not confiscated and the council earns income",
          "Government / microfinance provides small loans or training (business and technical skills)",
        ],
        modelAnswer: "The council could build covered markets and workspaces with water and toilets, so vendors and welders can work in all weather and the road stays clear. It could offer simple, affordable licences and meet the traders' association regularly, so traders register, goods are no longer confiscated and the council earns income for services. The government and microfinance institutions could also provide small loans and business training, so the workers can buy better tools and stock.",
        explanation: "Two developed solutions (2 marks each) and one further point.",
      }),
    ]),
    hints: ["In (c), link each solution to a problem in the source."],
    explanation: "Paper 2 Section A item on the informal sector, built on a short source.",
  });

  // ---------------------------------------------------------------- Section A 4: food preservation.
  b.struct({
    ...a, d: 3,
    concepts: ["her.production.food-storage"],
    stem: "This question is about the storage and preservation of food.",
    parts: checkExam(A, [
      P.match({
        label: "(a)",
        stem: "Match each indigenous food (Shona / Ndebele) with what it is.",
        pairs: [
          ["madora / amacimbi", "mopane worms"],
          ["mufushwa / umfushwa", "dried leafy vegetables"],
        ],
        extraRight: ["peanut butter"],
        explanation: "Madora / amacimbi are mopane worms; mufushwa / umfushwa are dried vegetables; peanut butter is dovi / idobi.",
      }),
      P.fib({
        label: "(b)",
        stem: "Complete the statements.",
        template: "A traditional granary is called dura in Shona and {{blank:a}} in Ndebele. Fish can be preserved without electricity by {{blank:b}}. In towns, chicken is often preserved by {{blank:c}}.",
        blanks: [
          { id: "a", accepted: ["ingqolobane"], choices: ["ingqolobane", "idobi", "umfushwa", "amacimbi"] },
          { id: "b", accepted: ["smoking"], choices: ["smoking", "freezing", "canning", "refrigeration"] },
          { id: "c", accepted: ["freezing"], choices: ["freezing", "smoking", "salting", "sun-drying"] },
        ],
        explanation: "Dura / ingqolobane is the granary; smoking needs no electricity; freezing is a contemporary method.",
      }),
      P.manual({
        label: "(c)", marks: 5,
        stem: "Describe how indigenous methods kept grain safe in storage.",
        points: [
          "Granaries (dura / ingqolobane) were raised on stones or poles",
          "keeping grain dry and away from rats and termites",
          "Grain was sealed in clay pots or dry pits / granaries had sealed or thatched lids",
          "so damp, insects and thieves were kept out",
          "Ash or certain leaves were mixed with grain to discourage weevils / grain was dried well before storing",
        ],
        modelAnswer: "Grain was kept in granaries (dura / ingqolobane) raised on stones or poles, which kept it dry and away from rats and termites. Seed and grain were also sealed in clay pots or dry pits, so damp, insects and thieves were kept out. Families dried the grain well before storing it and mixed ash or certain leaves with it to discourage weevils.",
        explanation: "Two developed methods (2 marks each) and one further point.",
      }),
    ]),
    hints: ["In (c), think about the granary, containers and pest control."],
    explanation: "Paper 2 Section A item on indigenous food storage and preservation.",
  });

  // ---------------------------------------------------------------- Section B 1: from Lancaster House to a home-grown constitution.
  b.struct({
    ...bb, d: 4,
    concepts: ["her.constitution.lancaster-to-2013"],
    stem: "This question is about the Lancaster House constitution and the move to a home-grown constitution.",
    parts: checkExam(B, [
      P.manual({
        label: "(a)", marks: 8,
        stem: "Describe the main provisions of the Lancaster House constitution of 1979.",
        points: [
          ["Reserved seats: 20 of the 100 House of Assembly seats for whites, for seven years", 2],
          ["Property protected: land acquired only on a willing-buyer willing-seller basis with compensation, for ten years", 2],
          ["A Declaration of Rights protecting civil and political rights / entrenched clauses", 2],
          ["Westminster-style system: ceremonial President, Prime Minister, Senate and House of Assembly", 2],
        ],
        modelAnswer: "The Lancaster House constitution, agreed on 21 December 1979, reserved 20 of the 100 seats in the House of Assembly for white voters for seven years. It protected private property, so land could be acquired only on a willing-buyer willing-seller basis with compensation for ten years. It contained a Declaration of Rights that protected civil and political rights, and some clauses were entrenched so that they could not easily be changed. It set up a Westminster-style system, with a ceremonial President as head of state, a Prime Minister as head of government and a Parliament of two houses, the Senate and the House of Assembly.",
        explanation: "Four provisions, each identified and described (2 marks each).",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE",
        stem: "\"The Lancaster House constitution had to be replaced because it was not made by Zimbabweans.\" Discuss.",
        points: [
          ["Agree: negotiated in London under British chairmanship as a ceasefire compromise; not people-driven", 3],
          ["Other reasons: many amendments (executive presidency 1987 and others) weakened confidence; land clauses; demands for stronger rights, limits on power, devolution", 3],
          ["Balance: it brought independence, majority rule and a Declaration of Rights; the 2000 draft was rejected, showing people wanted a process they trusted, not just any home-made text", 3],
          ["Supported conclusion", 3],
        ],
        levels: levels(12),
        modelAnswer: "Foreign drafting was an important reason for replacing the Lancaster House constitution. It was negotiated in London in 1979 under British chairmanship, as a compromise that made a ceasefire possible. Its reserved seats and property clauses were concessions to the white minority. Many Zimbabweans felt that a constitution made in this way did not express the values and wishes of an independent nation.\n\nHowever, there were other reasons too. The constitution was amended many times after 1980, including the creation of the executive presidency in 1987, and critics said these changes were made by governments of the day without wide consultation. The land clauses had slowed redistribution in the first decade. Churches, unions, women's groups and other organisations demanded stronger rights, limits on executive power and more participation.\n\nIt is also fair to recognise that the Lancaster House constitution brought independence and majority rule and contained a Declaration of Rights. The rejection of a draft in the referendum of February 2000 shows that citizens did not want just any constitution written in Zimbabwe; they wanted one made through a process they trusted. The 2013 Constitution, approved in a referendum, met this demand more fully.\n\nIn conclusion, the fact that it was not made by Zimbabweans was a central reason, but it combined with the many amendments and demands for reform. Zimbabweans wanted a constitution that was both home-grown and people-driven.",
        explanation: "Levels of response: the top level weighs foreign drafting against other reasons, recognises the constitution's achievements and reaches a supported conclusion.",
      }),
    ]),
    hints: ["In (b), consider at least two reasons besides foreign drafting."],
    explanation: "Paper 2 Section B essay on the move from the Lancaster House constitution to a home-grown constitution.",
  });

  // ---------------------------------------------------------------- Section B 2: factors inhibiting production.
  b.struct({
    ...bb, d: 4,
    concepts: ["her.production.inhibiting-factors", "her.production.factors"],
    stem: "This question is about production in Zimbabwe.",
    parts: checkExam(B, [
      P.manual({
        label: "(a)", marks: 8,
        stem: "Explain how **four** factors inhibit production in Zimbabwe.",
        points: [
          ["Lack of capital: no collateral, high interest, so firms and farmers cannot buy inputs or machines", 2],
          ["Power shortages: linked to low Kariba levels and ageing plants; machines stop and generator costs rise", 2],
          ["Skills shortages / brain drain: skilled workers emigrate, so services and output fall and training costs are lost", 2],
          ["Any other factor explained (drought, outdated technology, water shortages, restrictive procedures, poor infrastructure, sanctions or restrictive measures with the debate noted)", 2],
        ],
        modelAnswer: "Lack of capital holds back many businesses and farmers, because banks ask for collateral and charge high interest, so they cannot buy inputs or replace machines. Power shortages, linked to low water levels at Kariba and ageing thermal units, stop production lines and irrigation and force firms to pay for diesel. Brain drain means that many engineers, artisans and health workers have left the country, so output and services suffer and the cost of their training is lost. Drought reduces harvests directly and cuts the raw materials available to food factories.",
        explanation: "Four factors, each identified and explained (2 marks each).",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE",
        stem: "\"Sanctions are the main factor inhibiting production in Zimbabwe.\" To what extent do you agree?",
        points: [
          ["View that they are the main factor: government and SADC position; limited access to loans, credit and investment; foreign firms and banks cautious", 3],
          ["Opposing view: imposing countries call them targeted restrictive measures on individuals and companies; problems caused mainly by policies and governance; effects hard to separate", 3],
          ["Other factors: power and water shortages, drought, lack of capital, brain drain, outdated technology, procedures, infrastructure, instability", 3],
          ["Supported conclusion, using neutral language", 3],
        ],
        levels: levels(12),
        modelAnswer: "The Zimbabwean government argues that sanctions are a major cause of low production. From the early 2000s, the United States, the European Union and some other Western countries imposed measures, and the government says these limited the country's access to international loans, credit and investment and made foreign banks and companies cautious about doing business. SADC has supported this view and marks 25 October as Anti-Sanctions Day.\n\nThe countries that imposed the measures disagree. They describe them as targeted restrictive measures, such as travel bans and asset freezes on particular individuals and companies, not on ordinary citizens, and argue that economic difficulties came mainly from policies and governance. Many researchers say that the measures and other problems interacted, so their exact effect is hard to measure.\n\nOther factors clearly inhibit production as well. Power shortages, linked to drought at Kariba and ageing plants, stop factories and irrigation. Repeated droughts reduce harvests. Many businesses lack capital, and brain drain has removed skilled workers. Outdated machinery, slow procedures, poor roads and economic instability add to the problem.\n\nIn my view, sanctions or restrictive measures are one important factor, especially in limiting access to finance, but the evidence does not show that they are the single main factor. Production is held back by several factors acting together, so a solution would need re-engagement, investment, reliable power and water, and skills.",
        explanation: "Levels of response: the top level presents the different views on sanctions fairly, weighs them against other factors and reaches a supported conclusion.",
      }),
    ]),
    hints: ["In (b), present both views on sanctions before weighing other factors."],
    explanation: "Paper 2 Section B essay on factors inhibiting production, including a contested factor.",
  });

  // ---------------------------------------------------------------- Section B 3: indigenous conservation.
  b.struct({
    ...bb, d: 4,
    concepts: ["her.production.indigenous-conservation"],
    stem: "This question is about indigenous methods of conserving natural resources.",
    parts: checkExam(B, [
      P.manual({
        label: "(a)", marks: 8,
        stem: "Describe **four** indigenous methods of conserving natural resources.",
        points: [
          ["Taboos (zviera): e.g. not cutting certain trees or killing pregnant animals; belief that breaking them brings misfortune", 2],
          ["Totems: clan members did not kill or eat their totem animal, protecting different species", 2],
          ["Sacred places: hills, forests, pools and springs where cutting, hunting and farming were forbidden", 2],
          ["Chiefs' rules / seasonal restrictions / fruit trees left standing / fallowing, described", 2],
        ],
        modelAnswer: "Taboos (zviera) forbade actions such as cutting certain trees or killing pregnant animals, and people believed that breaking them would bring misfortune such as drought. Totems protected wildlife, because members of each clan would not kill or eat their totem animal. Sacred places such as hills, forests, pools and springs were set aside for ancestral spirits, so no one could cut trees, hunt or farm there. Chiefs and headmen made rules on grazing and tree cutting and fined offenders, and hunting and fishing were forbidden in breeding seasons.",
        explanation: "Four methods, each named and described (2 marks each).",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE",
        stem: "How effective are indigenous methods of conservation in Zimbabwe today?",
        points: [
          ["Effective: sacred forests and springs often well preserved; taboos and totems still respected in many communities; chiefs still control grazing and tree cutting", 3],
          ["Less effective: population growth, poverty, firewood and tobacco curing, gold panning, poaching; changing beliefs and urbanisation; rules unwritten", 3],
          ["Comparison / combination: modern laws and agencies (EMA, Parks) and community-based schemes; IKS combined with science", 3],
          ["Supported judgement", 3],
        ],
        levels: levels(12),
        modelAnswer: "Indigenous methods are still effective in many places. Sacred forests, hills and springs are often among the best-preserved parts of a district, because people continue to respect them. Many families still avoid killing their totem animal and follow taboos on cutting fruit trees. In communal areas, chiefs and headmen still allocate land, control grazing and fine people who cut trees without permission, and the Constitution recognises their role.\n\nHowever, these methods are weaker than in the past. The population has grown, and poverty pushes people to cut trees for firewood and sale, clear land for fields or pan for gold in riverbeds. Some people, especially in towns, no longer share the beliefs on which taboos depend, and newcomers in resettlement areas may not know local rules, which are not written down. Large-scale threats such as organised poaching and pollution cannot be stopped by belief alone.\n\nModern laws and agencies, such as EMA and the Parks and Wildlife Management Authority, deal with these larger threats, but they work best with community support. Community-based schemes and environmental education that include indigenous knowledge show that the two approaches can strengthen each other.\n\nIn conclusion, indigenous methods remain partly effective: they protect particular sites and species where communities still hold the beliefs and respect their leaders. On their own they are not enough for today's pressures, but combined with modern laws, science and education they remain valuable.",
        explanation: "Levels of response: the top level weighs where indigenous methods still work against where they have weakened and reaches a supported judgement.",
      }),
    ]),
    hints: ["In (b), give evidence of success and of weakness, then judge."],
    explanation: "Paper 2 Section B essay on the effectiveness of indigenous conservation today.",
  });
});
